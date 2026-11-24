import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {META_REPASO as meta, PREGUNTAS_REPASO as banco, RECORRIDOS_REPASO as recorridos} from '../cursos/6to/sociales/preparacion-primera-evaluacion/repaso-data.js';
import {esRepasoSocialesFormativo,criterioRepasoSociales} from '../mi-universo/mis-tareas/repaso-sociales-formativo.js';
const source=fs.readFileSync(new URL('../compartido/js/sesiones-academicas.js',import.meta.url),'utf8');
const motor=fs.readFileSync(new URL('../compartido/js/motor-practica-verbal.js',import.meta.url),'utf8');
const construir=vm.runInNewContext(motor.slice(motor.indexOf('export function normalizarRespuestaVerbal'),motor.indexOf('// Motor de verbos existente')).replaceAll('export ','')+';construirRegistroFormativo');
function registro(recorridoId='todas',{apoyos=false}={}){
 const preguntas=banco.filter(p=>recorridos.find(r=>r.id===recorridoId).ids.includes(p.id));
 const historial=new Map(preguntas.map((p,i)=>[p.id,[...(apoyos&&i===0?[{respuesta:'incorrecta',respuestaTexto:'Otra opción',correcta:false}]:[]),{respuesta:p.respuestaCorrecta,respuestaTexto:p.opciones.find(o=>o.id===p.respuestaCorrecta).texto,correcta:true}]]));
 const pistas=new Map(apoyos?[[preguntas[0].id,[{texto:preguntas[0].pista,nivel:1,antesDeIntento:1}]]]:[]),dudas=new Set(apoyos?[preguntas[0].id]:[]);
 return construir({meta,recorridoId,preguntas,historial,pistas,dudas,intentoId:'intento-formativo-123456',inicioCliente:'2026-11-24T10:00:00Z',finCliente:'2026-11-24T10:05:00Z',identidad:{personaId:'persona',actorUserId:'actor'}});
}
async function entorno(tarea=null,{fallarEnlace=false}={}){
  const evidencias=[];const datos=new Map();let ids=0;let inicializaciones=0;
  const identidad={usuario:{userId:'actor'},personaActiva:{personaId:'persona'},userIdPersonaActiva:'alumno'};
  const db={};const contexto=vm.createContext({console,URL,Date});
  // Firestore puede devolver mapas con sus claves en otro orden.
  const ordenar=v=>Array.isArray(v)?v.map(ordenar):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,ordenar(v[k])])):v;
  const snap=ref=>({exists:()=>datos.has(ref.path),data:()=>ordenar(datos.get(ref.path))});
  const sdk={collection:(_, ...p)=>({path:p.join('/')}),doc:(ref,...p)=>({id:p.at(-1)||'nuevo',path:[ref.path||'',...p.length?p:[`aleatorio-${++ids}`]].filter(Boolean).join('/')}),
    getDoc:async ref=>snap(ref),getDocs:async()=>({docs:[...datos.entries()].map(([path,d])=>({id:path.split('/').at(-1),data:()=>d}))}),serverTimestamp:()=> '2026-10-12T10:00:00Z',setDoc:async(ref,d)=>datos.set(ref.path,d),
    runTransaction:async(_,fn)=>fn({get:async ref=>snap(ref),set:(ref,d)=>datos.set(ref.path,d)})};
  const m=new vm.SourceTextModule(source,{context:contexto,identifier:'file:///sesiones-academicas.js',initializeImportMeta:meta=>meta.url='https://academia.invalid/compartido/js/sesiones-academicas.js',importModuleDynamically:async(spec)=>{
    if (spec.includes('seguimiento.js')) {
      const mod = new vm.SyntheticModule(Object.keys(seguimiento), function(){
        for (const [key,value] of Object.entries(seguimiento)) this.setExport(key,value);
      },{context:contexto});
      await mod.link(()=>{});await mod.evaluate();return mod;
    }
    const api=new vm.SyntheticModule(['Academia'],function(){this.setExport('Academia',{tareas:{obtener:async()=>tarea,registrarEvidencia:async e=>{if(fallarEnlace)throw new Error("red no disponible");evidencias.push(e);return {aplicada:true}}}})},{context:contexto});await api.link(()=>{});await api.evaluate();return api;}});
  await m.link(async spec=>{const values=spec.includes('firebase-config')?{db}:spec.includes('contexto-usuario')?{ContextoUsuario:{inicializar:async()=>{inicializaciones++;return identidad;},exigirEscrituraEducativa:async()=>{inicializaciones++;return identidad;}}}:sdk;
    return new vm.SyntheticModule(Object.keys(values),function(){for(const[k,v]of Object.entries(values))this.setExport(k,v);},{context:contexto});});
  await m.evaluate();return{api:m.namespace,datos,evidencias,identidad,inicializaciones:()=>inicializaciones};
}

for(const r of recorridos)test(`Sesión ${r.id}: cobertura ${r.cantidad}, primer intento y apoyos sin 100% ficticio`,()=>{
 const d=registro(r.id,{apoyos:true});assert.equal(d.respuestas.length,r.cantidad);assert.equal(d.resumen.preguntasCompletadas,r.cantidad);assert.equal(d.resumen.totalCorrectas,r.cantidad-1);assert.equal(d.resumen.porcentaje,undefined);
 assert.equal(d.resumen.conPistas,1);assert.equal(d.resumen.conReintentos,1);assert.equal(d.resumen.erroresIniciales,1);assert.equal(d.resumen.dudasMarcadas,1);
 assert.equal(d.respuestas[0].primeraRespuesta.correcta,false);assert.equal(d.respuestas[0].respuestaFinal.correcta,true);assert.equal(d.respuestas[0].correcta,false);assert.equal(d.respuestas[0].historialIntentos.length,2);
});
test('Selector y criterio usan los cuatro recorridos reales y URL local/Pages',()=>{
 for(const prefix of ['','/academia-gloria'])assert.equal(esRepasoSocialesFormativo({cursoReferencia:'6',materia:'Sociales',recursoUrl:prefix+'/'+meta.rutaActividad}),true);
 assert.equal(esRepasoSocialesFormativo({cursoReferencia:'6',materia:'Sociales',recursoUrl:'/cursos/6to/sociales/impuestos/'}),false);
 for(const r of recorridos){const c=criterioRepasoSociales(r.id);assert.equal(c.filtros.recorridoId,r.id);assert.equal(c.filtros.actividadId,meta.actividadId);assert.equal(c.filtros.recorridoCompleto,true);}
 assert.throws(()=>criterioRepasoSociales('retirado'),/Selecciona/);
});
test('Servicio rechaza parcial, repetición de preguntas y cambio de Persona Activa; preview no consulta ni escribe',async()=>{
 const e=await entorno();const d=registro();
 await assert.rejects(e.api.guardarSesionAcademica({...d,respuestas:d.respuestas.slice(1)}),/completo/);
 await assert.rejects(e.api.guardarSesionAcademica({...d,respuestas:d.respuestas.map(()=>d.respuestas[0])}),/completo/);
 await assert.rejects(e.api.guardarSesionAcademica({...d,personaIdEsperada:'otra'}),/identidad/);
 const r=await e.api.guardarSesionAcademica({...d,modo:'vista_previa'});assert.equal(r.guardado,false);assert.equal(e.datos.size,0);
});
for(const r of recorridos)test(`Servicio ${r.id}: una sesión inmutable y evidencia exacta al reenviar`,async()=>{
 const tarea={tipo:'repaso_academico',criterioCumplimiento:criterioRepasoSociales(r.id)};const e=await entorno(tarea),d={...registro(r.id),misionId:'m1',vincularMision:true};
 const a=await e.api.guardarSesionAcademica(d),b=await e.api.guardarSesionAcademica(d);assert.equal(a.sesionId,b.sesionId);assert.equal(e.datos.size,1);assert.equal(a.evidenciaMision.registrada,true);
 assert.equal(e.evidencias[0].atributos.recorridoId,r.id);assert.equal(e.evidencias[0].atributos.recorridoCompleto,true);assert.equal(e.evidencias[0].atributos.actividadId,meta.actividadId);
 assert.match(e.evidencias[0].destinoRevision,/sesionId=/);
});
test('Bloque incorrecto y Misión legacy sin recorrido: sesión sí, crédito no',async()=>{
 for(const criterio of [criterioRepasoSociales('todas'),{tipo:'cantidad',filtros:{}}]){const e=await entorno({tipo:'repaso_academico',criterioCumplimiento:criterio});const r=await e.api.guardarSesionAcademica({...registro('publicidad'),misionId:'m1',vincularMision:true});assert.equal(r.guardado,true);assert.equal(r.evidenciaMision.registrada,false);assert.equal(e.evidencias.length,0);}
});
test('Fallo al enlazar conserva sesión, informa fallo y permite reintento sin duplicar',async()=>{
 const e=await entorno({tipo:'repaso_academico',criterioCumplimiento:criterioRepasoSociales('todas')},{fallarEnlace:true}),d={...registro(),misionId:'m1',vincularMision:true};
 const r=await e.api.guardarSesionAcademica(d);assert.equal(r.guardado,true);assert.equal(r.evidenciaMision.registrada,false);assert.equal(r.evidenciaMision.motivo,'error_registro_evidencia');await e.api.guardarSesionAcademica(d);assert.equal(e.datos.size,1);
});

const apiSource=fs.readFileSync(new URL('../compartido/api/academia.js',import.meta.url),'utf8');
function apiMisiones(criterio) {
 const datos=new Map([['tarea',{tipo:'repaso_academico',alumnoId:'alumno',estado:'en_curso',requiereRevision:true,criterioCumplimiento:criterio,progreso:{cantidadActual:0,evidenciaIds:[]}}]]);
 const snap=ref=>({exists:()=>datos.has(ref),data:()=>datos.get(ref)});
 const update=(ref,cambios)=>{const d=datos.get(ref);for(const[k,v]of Object.entries(cambios)){if(k.startsWith('progreso.'))d.progreso[k.slice(9)]=v;else d[k]=v;}};
 const env={db:{},console,textoSeguro:v=>String(v||'').trim(),exigirEscrituraEducativa:async()=>{},obtenerUIDPersonaActiva:async()=>'alumno',obtenerUID:()=>'actor',documentoTarea:()=>'tarea',documentoEvidencia:id=>'evidencia/'+id,
 normalizarEstadoTarea:v=>v,normalizarCriterioCumplimiento:v=>v,normalizarProgresoTarea:(v,c)=>({cantidadActual:0,cantidadObjetivo:c.cantidadObjetivo,evidenciaIds:[],...v}),serverTimestamp:()=>1,getDoc:async ref=>snap(ref),updateDoc:async(ref,d)=>update(ref,d),
 runTransaction:async(_,fn)=>fn({get:async ref=>snap(ref),set:(ref,d)=>datos.set(ref,d),update})};
 const start=apiSource.indexOf('function requiereEvidenciaFormativa('),end=apiSource.indexOf('async function leerEvidenciasMision(');
 const api=vm.runInNewContext(apiSource.slice(apiSource.indexOf('async function actualizarTarea('),start)+apiSource.slice(start,end)+';({registrarEvidenciaMision,cambiarEstadoTarea,actualizarTarea,requiereEvidenciaFormativa})',env);
 return{...api,datos,tarea:()=>datos.get('tarea')};
}
for(const r of recorridos)test(`API real ${r.id}: rechaza otro recorrido/parcial/actividad, cuenta una vez y exige evidencia para cerrar`,async()=>{
 const c=criterioRepasoSociales(r.id),e=apiMisiones(c),atributos={...c.filtros};
 const evidencia={misionId:'m1',modulo:'libre',tipo:'sesion_academica',actividadId:meta.actividadId,sesionId:'sesion-estable',atributos};
 await assert.rejects(e.cambiarEstadoTarea('m1','pendiente_validacion'),/Completa y guarda/);
 for(const variacion of [{recorridoId:'otro'},{recorridoCompleto:false},{actividadId:'otra'}])await assert.rejects(e.registrarEvidenciaMision({...evidencia,atributos:{...atributos,...variacion}}),/no cumple/);
 assert.equal(e.tarea().progreso.cantidadActual,0);assert.equal(e.datos.size,1);
 const a=await e.registrarEvidenciaMision(evidencia);assert.equal(a.aplicada,true);assert.equal(e.tarea().estado,'pendiente_validacion');assert.equal(e.tarea().progreso.cantidadActual,1);assert.equal(e.datos.size,2);
 const b=await e.registrarEvidenciaMision(evidencia);assert.equal(b.duplicada,true);assert.equal(e.tarea().progreso.evidenciaIds.length,1);assert.equal(e.datos.size,2);
 await e.cambiarEstadoTarea('m1','completada');assert.equal(e.tarea().estado,'completada');
});
test('Cierre manual legacy conserva contrato anterior',async()=>{const e=apiMisiones({cantidadObjetivo:1,filtros:{}});await e.cambiarEstadoTarea('m1','pendiente_validacion');assert.equal(e.tarea().estado,'pendiente_validacion');});

test('Gestión API: impide cierre sin evidencia y cambiar el recorrido iniciado; permite edición pendiente',async()=>{
 const e=apiMisiones(criterioRepasoSociales('impuestos'));
 await assert.rejects(e.actualizarTarea('m1',{estado:'pendiente_validacion'}),/Completa y guarda/);
 await assert.rejects(e.actualizarTarea('m1',{criterioCumplimiento:criterioRepasoSociales('dinero')}),/no puede cambiarse/);
 e.tarea().estado='pendiente';await e.actualizarTarea('m1',{criterioCumplimiento:criterioRepasoSociales('dinero')});assert.equal(e.tarea().criterioCumplimiento.filtros.recorridoId,'dinero');
});
