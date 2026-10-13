// node --experimental-vm-modules --test tests/dictados-sesiones.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as seguimiento from '../mi-universo/rincon-dictados/seguimiento.js';
import { AVENTURAS } from '../mi-universo/rincon-dictados/aventuras.js';
import { nuevaSesion, crearRegistro } from '../mi-universo/rincon-dictados/modelo.js';
const source=fs.readFileSync(new URL('../compartido/js/sesiones-academicas.js',import.meta.url),'utf8');
async function entorno(tarea=null){
  const evidencias=[];const datos=new Map();let ids=0;let inicializaciones=0;
  const identidad={usuario:{userId:'actor'},personaActiva:{personaId:'persona'},userIdPersonaActiva:'alumno'};
  const db={};const contexto=vm.createContext({console,URL,Date});
  // Firestore puede devolver mapas con sus claves en otro orden.
  const ordenar=v=>Array.isArray(v)?v.map(ordenar):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,ordenar(v[k])])):v;
  const snap=ref=>({exists:()=>datos.has(ref.path),data:()=>ordenar(datos.get(ref.path))});
  const sdk={collection:(_, ...p)=>({path:p.join('/')}),doc:(ref,...p)=>({id:p.at(-1)||'nuevo',path:[ref.path||'',...p.length?p:[`aleatorio-${++ids}`]].filter(Boolean).join('/')}),
    getDoc:async ref=>snap(ref),getDocs:async()=>({docs:[...datos.entries()].map(([path,d])=>({id:path.split('/').at(-1),data:()=>d}))}),serverTimestamp:()=> '2026-10-12T10:00:00Z',setDoc:async(ref,d)=>datos.set(ref.path,d),
    runTransaction:async(_,fn)=>fn({get:async ref=>snap(ref),set:(ref,d)=>datos.set(ref.path,d)})};
  const m=new vm.SourceTextModule(source,{context:contexto,identifier:'file:///sesiones-academicas.js',importModuleDynamically:async(spec)=>{
    if (spec.includes('seguimiento.js')) {
      const mod = new vm.SyntheticModule(Object.keys(seguimiento), function(){
        for (const [key,value] of Object.entries(seguimiento)) this.setExport(key,value);
      },{context:contexto});
      await mod.link(()=>{});await mod.evaluate();return mod;
    }
    const api=new vm.SyntheticModule(['Academia'],function(){this.setExport('Academia',{tareas:{obtener:async()=>tarea,registrarEvidencia:async e=>{evidencias.push(e);return {aplicada:true}}}})},{context:contexto});await api.link(()=>{});await api.evaluate();return api;}});
  await m.link(async spec=>{const values=spec.includes('firebase-config')?{db}:spec.includes('contexto-usuario')?{ContextoUsuario:{inicializar:async()=>{inicializaciones++;return identidad;},exigirEscrituraEducativa:async()=>{inicializaciones++;return identidad;}}}:sdk;
    return new vm.SyntheticModule(Object.keys(values),function(){for(const[k,v]of Object.entries(values))this.setExport(k,v);},{context:contexto});});
  await m.evaluate();return{api:m.namespace,datos,evidencias,identidad,inicializaciones:()=>inicializaciones};
}
const registro={modo:'aprendizaje',actividadId:'rincon-dictados',cursoReferencia:'6to',materia:'lengua',tema:'Dictados',vincularMision:false,personaIdEsperada:'persona',actorUserIdEsperado:'actor',intentoId:'intento-123456789',resumen:{tipoEvaluacion:'autoevaluacion',dictado:{porcentaje:80}}};
test('vista previa retorna antes de cargar identidad o escribir',async()=>{const e=await entorno();const r=await e.api.guardarSesionAcademica({modo:'vista_previa'});assert.equal(r.guardado,false);assert.equal(e.inicializaciones(),0);assert.equal(e.datos.size,0);});
test('guardado con Persona Activa e intento estable; reintento no duplica ni reescribe',async()=>{const e=await entorno();await e.api.guardarSesionAcademica(registro);await e.api.guardarSesionAcademica(registro);assert.equal(e.datos.size,1);const d=[...e.datos.values()][0];assert.equal(d.personaId,'persona');assert.equal(d.alumnoUserId,'alumno');assert.equal(d.actorUserId,'actor');assert.equal(d.misionId,null);await assert.rejects(e.api.guardarSesionAcademica({...registro,resumen:{otro:true}}),/ya tiene un resultado/);assert.equal([...e.datos.values()][0].resumen.dictado.porcentaje,80);});
test('cambio de identidad e identificador no válido impiden escritura',async()=>{const e=await entorno();await assert.rejects(e.api.guardarSesionAcademica({...registro,personaIdEsperada:'otra'}),/identidad/);await assert.rejects(e.api.guardarSesionAcademica({...registro,intentoId:'../peligro'}),/identificador/);assert.equal(e.datos.size,0);});
test('consumidores anteriores conservan sesiones independientes; análisis puede excluir autoevaluación antes del límite',async()=>{const e=await entorno();const antiguo={...registro,intentoId:'',resumen:{totalPreguntas:2,totalCorrectas:1}};await e.api.guardarSesionAcademica(antiguo);await e.api.guardarSesionAcademica(antiguo);await e.api.guardarSesionAcademica(registro);assert.equal(e.datos.size,3);assert.equal((await e.api.leerSesionesAcademicas({maximo:20})).length,3);assert.equal((await e.api.leerSesionesAcademicas({excluirAutoevaluaciones:true,maximo:20})).length,2);});

function intentoRevisado() {
  const aventura = AVENTURAS[0];
  const sesion = nuevaSesion(aventura, 'intento-123456789');
  sesion.revision.forEach(frase => { frase.palabras.fill('correcta'); frase.puntuacion = 'correcta'; });
  sesion.acompanamiento = 'acompanada';
  sesion.misionId = 'mision-test';
  sesion.focoDictado = `aventura:${aventura.id}`;
  return crearRegistro(aventura, sesion, { personaId: 'persona', actorUserId: 'actor' });
}
for (const legacy of [false, true]) {
  test(`Dictado ${legacy ? 'anterior' : 'estándar'} enlaza evidencia del texto asignado sin copiar la revisión`, async () => {
    const tarea = seguimiento.prepararMision(AVENTURAS[0].id);
    if (legacy) { tarea.tipo = 'repaso_academico'; tarea.modulo = 'libre'; tarea.criterioCumplimiento.modulo = 'libre'; }
    const e = await entorno(tarea);
    const r = intentoRevisado();
    const saved = await e.api.guardarSesionAcademica(r);
    assert.equal(saved.evidenciaMision.registrada, true);
    assert.equal(e.evidencias[0].modulo, legacy ? 'libre' : 'rincon-dictados');
    assert.equal(e.evidencias[0].sesionId, r.intentoId);
    assert.equal(e.evidencias[0].resultado.resumen.dictado, undefined);
    await assert.rejects(e.api.guardarSesionAcademica({...r,misionId:'otra-mision'}),/identificador/);
  });
}
test('un foco copiado no atribuye otro texto a la Misión; el intento queda guardado sin crédito', async () => {
  const e = await entorno(seguimiento.prepararMision(AVENTURAS[0].id));
  const r = intentoRevisado();
  r.resumen.dictado.textoOriginal = 'Un texto diferente.';
  const saved = await e.api.guardarSesionAcademica(r);
  assert.equal(saved.guardado, true);
  assert.equal(saved.evidenciaMision.registrada, false);
  assert.equal(saved.evidenciaMision.motivo, 'dictado_no_asignado');
  assert.equal(e.evidencias.length, 0);
});
