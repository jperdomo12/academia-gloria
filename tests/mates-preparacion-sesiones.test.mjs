// node --experimental-vm-modules --test tests/mates-preparacion-sesiones.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {crearAcademiaQA} from './helpers/academia-formativa-vm.mjs';
import {META_PREPARACION as meta,crearRegistroPreparacion,criterioPreparacion} from '../cursos/6to/mates/preparacion-problemas/recorridos.js';
const banco=JSON.parse(fs.readFileSync('cursos/6to/mates/preparacion-problemas/problemas.json','utf8'));
const source=fs.readFileSync('cursos/6to/mates/preparacion-problemas/preparacion.js','utf8');
const fases=vm.runInNewContext(source.slice(source.indexOf('function eleccion('),source.indexOf('function mostrarPanel('))+';fases');
export function payload(recorridoId,{bloqueId=1,vueltaId='vuelta-qa-123456789',id=`intento-${recorridoId}-${bloqueId}-123456789`,misionId='',apoyos=false}={}){
 const problemas=recorridoId==='ensayo'?banco.ensayos.filter(p=>p.bloque===bloqueId):recorridoId==='gaudem'?banco.gaudem:banco.calentamiento;
 const intento={id,recorridoId,bloqueId,vueltaId,identidad:{personaId:'persona-alumno',actorUserId:'alumno'},inicioCliente:'2026-11-24T10:00:00Z',fases:new Map()};
 for(const [j,p]of problemas.entries())for(const[i,f]of fases(p).entries()){
  const respuesta=f.tipo==='opcion'?f.correcta:f.valor,respuestaTexto=f.tipo==='opcion'?f.opciones[f.correcta]:String(f.valor),primero=apoyos&&j===0&&i===0;
  intento.fases.set(`${p.id}:${i}`,{intentos:[...(primero?[{respuesta:-1,respuestaTexto:'Otra idea',correcta:false}]:[]),{respuesta,respuestaTexto,correcta:true}],pistas:primero?[{texto:f.pista,antesDeIntento:1}]:[]});
 }
 return crearRegistroPreparacion({intento,problemas,fasesDe:fases,finCliente:'2026-11-24T10:10:00Z',misionId});
}
function tarea(id,recorridoId){return{id,tipo:'repaso_academico',titulo:recorridoId,alumnoId:'alumno',modulo:'libre',estado:'en_curso',requiereRevision:true,criterioCumplimiento:criterioPreparacion(recorridoId),progreso:{cantidadActual:0,evidenciaIds:[]}};}
async function entorno(){const e=await crearAcademiaQA();for(const[id,r]of [['A','gaudem'],['B','ensayo']])e.datos.set(`usuarios/alumno/tareas/${id}`,tarea(id,r));return e;}

test('Tres registros formativos auténticos, dos objetivos de Misión, sin notas',()=>{
 for(const r of ['comprendo','gaudem','ensayo']){const d=payload(r,{apoyos:true});assert.equal(d.resumen.unidadesCompletadas,r==='comprendo'?4:5);assert.equal(d.resumen.porcentaje,undefined);assert.equal(d.resumen.erroresIniciales,1);assert.equal(d.respuestas[0].historialIntentos.length,2);assert.equal(d.respuestas[0].correcta,false);assert.equal(d.respuestas[0].respuestaFinal.correcta,true);assert.ok(d.respuestas.every(x=>x.explicacion&&x.enunciado&&x.pregunta));}
 assert.throws(()=>criterioPreparacion('comprendo'),/dos recorridos/);
});
test('Gaudem completo cumple A y no B; dos Misiones independientes al mismo recurso',async()=>{
 const e=await entorno();await e.sesiones.guardarSesionAcademica(payload('gaudem',{misionId:'A'}));assert.equal((await e.api.tareas.obtener('A')).estado,'pendiente_validacion');assert.equal((await e.api.tareas.obtener('B')).progreso.cantidadActual,0);
 const otro=await e.sesiones.guardarSesionAcademica(payload('gaudem',{misionId:'B',id:'intento-gaudem-otro-123456789'}));assert.equal(otro.guardado,true);assert.equal(otro.evidenciaMision.registrada,false);assert.equal((await e.api.tareas.obtener('B')).progreso.cantidadActual,0);
});
test('Bloques 1 y 2 distintos de misma vuelta: avance 1/2 y revisión solo en 2/2',async()=>{
 const e=await entorno();const uno=await e.sesiones.guardarSesionAcademica(payload('ensayo',{misionId:'B'}));assert.equal(uno.evidenciaMision.registrada,true);let t=await e.api.tareas.obtener('B');assert.equal(t.estado,'en_curso');assert.equal(t.progreso.cantidadActual,1);assert.equal(t.progreso.avancePorVuelta.vueltaId,'vuelta-qa-123456789');
 await assert.rejects(e.api.tareas.cambiarEstado('B','pendiente_validacion'),/Completa y guarda/);
 await e.sesiones.guardarSesionAcademica(payload('ensayo',{misionId:'B',bloqueId:2}));t=await e.api.tareas.obtener('B');assert.equal(t.estado,'pendiente_validacion');assert.equal(t.progreso.cantidadActual,2);assert.deepEqual(Array.from(t.progreso.avancePorVuelta.bloquesCompletados),[1,2]);assert.equal((await e.api.tareas.leerEvidencias('B')).length,2);
});
test('Repetir bloque 1 con otra sesión, otra vuelta, otro plan o Paso 2 no cierra B',async()=>{
 const e=await entorno();await e.sesiones.guardarSesionAcademica(payload('ensayo',{misionId:'B'}));
 for(const d of [payload('ensayo',{misionId:'B',id:'repetir-bloque-123456789'}),payload('ensayo',{misionId:'B',bloqueId:2,vueltaId:'otra-vuelta-123456789'}),{...payload('ensayo',{misionId:'B',bloqueId:2,id:'plan-anterior-123456789'}),resumen:{...payload('ensayo',{bloqueId:2}).resumen,versionPlan:'20x4',bloquesPorVuelta:4,totalProblemasVuelta:20}}]){const r=await e.sesiones.guardarSesionAcademica(d);assert.equal(r.guardado,true);assert.equal(r.evidenciaMision.registrada,false);}
 assert.equal((await e.api.tareas.obtener('B')).progreso.cantidadActual,1);assert.equal((await e.api.tareas.leerEvidencias('B')).length,1);
 const a=await e.sesiones.guardarSesionAcademica(payload('ensayo',{misionId:'A',bloqueId:2,id:'ensayo-no-gaudem-123456789'}));assert.equal(a.evidenciaMision.registrada,false);
});
test('Reenvío concurrente y respuesta perdida tras commit no duplican sesiones ni crédito',async()=>{
 const e=await entorno(),d=payload('ensayo',{misionId:'B'});e.fallarDespuesCommit();await assert.rejects(e.sesiones.guardarSesionAcademica(d),/Respuesta perdida/);await Promise.all([e.sesiones.guardarSesionAcademica(d),e.sesiones.guardarSesionAcademica(d)]);assert.equal([...e.datos.keys()].filter(k=>k.includes('/sesionesAcademicas/')).length,1);assert.equal((await e.api.tareas.obtener('B')).progreso.cantidadActual,1);assert.equal((await e.api.tareas.leerEvidencias('B')).length,1);
});
test('Vista previa, parcial, identidad y consulta no escriben; lectura conserva snapshots históricos',async()=>{
 const e=await entorno(),d=payload('gaudem'),before=e.writes.length;await e.sesiones.guardarSesionAcademica({...d,modo:'vista_previa'});assert.equal(e.writes.length,before);
 await assert.rejects(e.sesiones.guardarSesionAcademica({...d,respuestas:d.respuestas.slice(1)}),/completo/);await assert.rejects(e.sesiones.guardarSesionAcademica({...d,personaIdEsperada:'otra'}),/identidad/);
 const r=await e.sesiones.guardarSesionAcademica(d),num=e.writes.length,leida=await e.sesiones.leerSesionAcademica(r.sesionId);assert.equal(e.writes.length,num);assert.equal(leida.resumen.problemas[0].enunciado,banco.gaudem[0].enunciado);
 e.datos.set('usuarios/alumno/sesionesAcademicas/legacy20',{actividadId:meta.actividadId,resumen:{totalProblemasVuelta:20,bloquesPorVuelta:4,versionPlan:'20x4'},respuestas:[{enunciado:'Contenido histórico original',respuesta:168}]});const old=await e.sesiones.leerSesionAcademica('legacy20');assert.equal(old.resumen.totalProblemasVuelta,20);assert.equal(old.respuestas[0].respuesta,168);
});
test('Sesión guardada y fallo de enlace se distinguen; reintentar enlaza sin duplicar',async()=>{
 const e=await entorno();e.fallarProximaEvidencia();const d=payload('ensayo',{misionId:'B'}),r=await e.sesiones.guardarSesionAcademica(d);assert.equal(r.guardado,true);assert.equal(r.evidenciaMision.registrada,false);assert.equal((await e.api.tareas.obtener('B')).progreso.cantidadActual,0);
 const retry=await e.sesiones.guardarSesionAcademica(d);assert.equal(retry.evidenciaMision.registrada,true);assert.equal((await e.api.tareas.obtener('B')).progreso.cantidadActual,1);assert.equal([...e.datos.keys()].filter(k=>k.includes('/sesionesAcademicas/')).length,1);
});
test('Crear y editar dos Misiones independientes usa criterios de 1 y 2 evidencias',async()=>{
 const e=await crearAcademiaQA();const a=await e.api.tareas.crear({...tarea('','gaudem'),cursoReferencia:'6',materia:'Matemáticas',tema:meta.tema,destinoUrl:'/cursos/6to/mates/preparacion-problemas/'}),b=await e.api.tareas.crear({...tarea('','ensayo'),cursoReferencia:'6',materia:'Matemáticas',tema:meta.tema,destinoUrl:'/cursos/6to/mates/preparacion-problemas/'});
 assert.notEqual(a,b);const tareas=await e.api.tareas.leer();assert.equal(tareas.length,2);assert.deepEqual(Array.from(tareas,t=>t.criterioCumplimiento.cantidadObjetivo).sort(),[1,2]);
});
