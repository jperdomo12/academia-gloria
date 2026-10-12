// Contratos de Dictado sobre sesiones y Misiones compartidas. Sin acceso a datos aquí.
import {porId} from './aventuras.js';
import {palabrasFrase, palabraSinSignos} from './modelo.js';
export const esMisionDictado = t => t?.tipo === 'repaso_academico' && t.evidencia?.tipo === 'dictado';
export const fechaDictado = s => s.completadaEn?.toMillis?.() || s.createdAt?.toMillis?.() || Date.parse(s.finCliente || s.inicioCliente) || 0;
export function reales(sesiones, tareas=[]) {
 const prueba=new Set(tareas.filter(t=>t.esDatoPrueba).map(t=>t.id));
 return sesiones.filter(s=>s.actividadId==='rincon-dictados' && s.resumen?.dictado?.completa && !s.resumen.dictado.esDatoPrueba && !prueba.has(s.misionId));
}
export function objetivos(s) {
 const d=s.resumen?.dictado;if(!d)return [];
 return d.frases.flatMap((frase,fi)=>{
  const rev=d.revision[fi];const palabras=palabrasFrase([frase]);
  const items=palabras.flatMap((p,pi)=>['revisar','omitida'].includes(rev?.palabras[pi])?[{clave:`p:${fi}:${pi}`,texto:palabraSinSignos(p),tipo:'palabra'}]:[]);
  if(items.length||rev?.puntuacion==='revisar'||rev?.extras)items.push({clave:`f:${fi}`,texto:frase,tipo:'frase'});
  return items;
 });
}
export function aventuraMision(tarea, origen) {
 if(!esMisionDictado(tarea))throw Error('Esta misión no corresponde a Dictado.');
 const c=tarea.evidencia.configuracion;
 if(!c.sesionOrigenId){const a=porId(c.aventuraId);if(!a)throw Error('La aventura de esta misión ya no está disponible.');return a;}
 if(origen?.id!==c.sesionOrigenId||!origen.resumen?.dictado)throw Error('No pudimos recuperar el intento que originó esta práctica.');
 const posibles=objetivos(origen);const claves=[...new Set(c.objetivos||[])];
 if(!claves.length||claves.length>3)throw Error('Elige entre uno y tres objetivos de práctica.');
 const elegidos=claves.map(k=>posibles.find(p=>p.clave===k));if(elegidos.some(x=>!x))throw Error('Los objetivos ya no coinciden con el intento original.');
 return {id:`refuerzo-${tarea.id}`,version:'1',nivel:origen.resumen.dictado.nivel,titulo:'Mi práctica de dictado',descripcion:'Escucha y escribe unas pocas palabras o frases de tu práctica.',icono:'✏️',categoria:'Práctica',color:'menta',objetivo:'Practicar a partir de mi revisión',frases:elegidos.map(x=>[x.texto]),sesionOrigenId:origen.id,objetivos:claves};
}
export function prepararMision(aventuraId, origen=null, seleccion=[]) {
 const a=porId(aventuraId);if(!a&&!origen)throw Error('Elige una aventura.');
 const claves=[...new Set(seleccion)].sort();
 if(origen&&(!claves.length||claves.length>3||claves.some(k=>!objetivos(origen).some(o=>o.clave===k))))throw Error('Selecciona entre uno y tres objetivos de este intento.');
 const foco=origen?`refuerzo:${origen.id}:${claves.join(',')}`:`aventura:${a.id}`;
 const titulo=origen?'Dictado · palabras y frases para practicar':`Dictado · ${a.titulo}`;
 return {titulo,descripcion:'Escuchar, escribir en papel y revisar el intento original.',tipo:'repaso_academico',modulo:'libre',cursoReferencia:'6',materia:'Lengua',tema:'Dictados',destinoUrl:'../rincon-dictados/',objetivo:'Sé qué hice bien y sé qué puedo mejorar.',criterioFinalizacion:'Guardar un dictado revisado. No se exige un porcentaje mínimo; la familia revisará el trabajo.',criterioCumplimiento:{tipo:'cantidad',modulo:'libre',evidenciaTipo:'sesion_academica',cantidadObjetivo:1,filtros:{actividadId:'rincon-dictados',focoDictado:foco}},requiereRevision:true,visibleParaAlumno:false,estado:'pendiente',ordenMision:9999,prioridad:'normal',progreso:{cantidadObjetivo:1},presentacionAlumno:{icono:'✏️',tituloMision:titulo,descripcionMision:'Prepara tu cuaderno. Escucharemos y escribiremos a tu ritmo.',mensaje:'Puedes repetir y pedir ayuda.'},evidencia:{tipo:'dictado',modulo:'libre',referenciaId:origen?.id||a.id,resumen:titulo,configuracion:{aventuraId:origen?.resumen.dictado.aventuraId||a.id,sesionOrigenId:origen?.id||'',objetivos:claves,focoDictado:foco}}};
}
export function analizarDictados(sesiones) {
 const ordenadas=[...sesiones].sort((a,b)=>fechaDictado(a)-fechaDictado(b));
 const grupos=new Map();for(const s of ordenadas){const d=s.resumen.dictado;const key=JSON.stringify([d.textoOriginal,d.acompanamiento,d.tipoPractica||'aventura']);if(!grupos.has(key))grupos.set(key,[]);grupos.get(key).push(s);}
 const evolucion=[];for(const g of grupos.values()){if(g.length<2)continue;const a=g[0],b=g.at(-1);evolucion.push(`✏️ ${b.tituloActividad}: ${a.resumen.dictado.porcentaje} % → ${b.resumen.dictado.porcentaje} % en ${g.length} intentos del mismo texto y acompañamiento. Según autoevaluación; no es una nota oficial.`);}
 const ultimaPorTexto=new Map();for(const s of ordenadas)ultimaPorTexto.set(s.resumen.dictado.textoOriginal,s);
 const pendientes=[...ultimaPorTexto.values()].filter(s=>objetivos(s).length);
 return {fortalezas:ordenadas.length?[`✏️ ${ordenadas.length} dictados escritos y revisados; la autoevaluación permite reconocer aciertos y diferencias.`]:[],aspectos:pendientes.map(s=>`✏️ ${s.tituloActividad}: ${objetivos(s).filter(x=>x.tipo==='palabra').length} palabras para revisar en el intento más reciente de ese texto. Signos y añadidas se consideran aparte.`),evolucion:evolucion.join(' ')||'Dictado: todavía no hay dos intentos del mismo texto y acompañamiento para comparar.',intentos:`Dictado: ${ordenadas.length} intentos guardados. Los ejercicios breves y las aventuras completas se mantienen separados.`,pistas:'Dictado: repetir o usar voz pausada no penaliza; no se infiere autonomía a partir de la velocidad.',mejoras:[],actuaciones:pendientes.length?['✏️ En Observaciones y refuerzos → Dictados, revisa la señal y elige hasta tres palabras o frases para una nueva Misión. Una diferencia aislada no demuestra una dificultad persistente.']:[]};
}
