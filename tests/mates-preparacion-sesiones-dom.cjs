// Controlador real + sesiones/API reales; DOM y Firebase simulados, no validación visual/Rules.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const {parseHTML}=require(process.env.QA_DOM_MODULE||'linkedom');
async function fixture({misionId='',preview=false,propia=true,datos}={}){
 const {crearAcademiaQA}=await import('./helpers/academia-formativa-vm.mjs');const contratos=await import('../cursos/6to/mates/preparacion-problemas/recorridos.js');
 const e=await crearAcademiaQA({propia,datos}),{document,window:nativeWindow}=parseHTML(fs.readFileSync('cursos/6to/mates/preparacion-problemas/index.html','utf8'));
 let focus=null;Object.defineProperty(document,'activeElement',{get:()=>focus});nativeWindow.HTMLElement.prototype.focus=function(){focus=this;};
 const url=new URL('https://academia.invalid/cursos/6to/mates/preparacion-problemas/'+(misionId?'?misionId='+misionId:''));if(preview)url.searchParams.set('modo',preview===true?'vista_previa':preview);
 const bank=JSON.parse(fs.readFileSync('cursos/6to/mates/preparacion-problemas/problemas.json','utf8')),spoken=[];
 const env={document,console,URL,URLSearchParams,Date,Map,Set,Math,window:{location:url,scrollTo(){},addEventListener(){}},fetch:async()=>({ok:true,json:async()=>structuredClone(bank)}),auth:{currentUser:{uid:'alumno'},authStateReady:async()=>{}},ContextoUsuario:e.contexto,
 escuchar:(t,o)=>spoken.push({t,o}),detener(){},disponible:()=>true,Academia:e.api,guardarSesionAcademica:e.sesiones.guardarSesionAcademica,...contratos};
 const source=fs.readFileSync('cursos/6to/mates/preparacion-problemas/preparacion.js','utf8').replace(/^import[^;]+;\n/gm,'').replaceAll('import.meta.url',JSON.stringify(url.href+'preparacion.js'));
 const api=await vm.runInNewContext('(async()=>{'+source+';return {estado,fases,preguntaActual,iniciar,guardarRecorrido};})()',env);
 const $=id=>document.getElementById(id),start=id=>document.querySelector('[data-iniciar="'+id+'"]').click(),click=id=>$(id).click();
 function responder(dada){const f=api.preguntaActual();if(f.tipo==='numero')$('numero').value=String(dada);else{document.querySelectorAll('#opciones input').forEach(n=>{n.checked=Number(n.value)===dada;n.toggleAttribute('checked',n.checked);});} $('formRespuesta').dispatchEvent(new nativeWindow.Event('submit',{cancelable:true}));}
 async function esperar(){for(let i=0;i<100&&api.estado.intento?.promesa;i++)await new Promise(r=>setImmediate(r));assert.ok(!api.estado.intento?.promesa,'finalizó guardado');}
 async function resolver({apoyos=false,pausa=false}={}){
  const problemas=[...api.estado.problemas];for(const [j,p]of problemas.entries()){
   const fs=api.fases(p);for(let i=api.estado.fase;i<fs.length;i++){
    const f=fs[i];assert.equal($('tituloActividad').textContent,p.titulo);
    if(apoyos&&j===0&&i===0){click('pista');responder(-1);assert.equal($('continuar').hidden,true);assert.equal($('progreso').getAttribute('aria-valuenow'),'0');}
    responder(f.tipo==='numero'?f.valor:f.correcta);assert.match($('mensaje').textContent,/Bien razonado/);
    if(pausa&&j===0&&i===1){click('volverInicio');start('ensayo');assert.equal($('continuar').hidden,false);}
    click('continuar');
   }
  }
  await esperar();
 }
 return{...e,...api,document,$,start,click,responder,resolver,esperar,spoken,bank};
}
module.exports={fixture};
if(require.main===module)(async()=>{
 const {criterioPreparacion}=await import('../cursos/6to/mates/preparacion-problemas/recorridos.js');
 const seed=(id,r)=>[ `usuarios/alumno/tareas/${id}`,{id,tipo:'repaso_academico',titulo:r,alumnoId:'alumno',estado:'en_curso',requiereRevision:true,criterioCumplimiento:criterioPreparacion(r),progreso:{cantidadActual:0,evidenciaIds:[]}} ];
 const datos=new Map([seed('A','gaudem'),seed('B','ensayo')]);
 const a=await fixture({misionId:'A',datos});assert.equal(a.estado.modo,'gaudem');await a.resolver({apoyos:true});assert.equal((await a.api.tareas.obtener('A')).estado,'pendiente_validacion');assert.equal((await a.api.tareas.obtener('B')).progreso.cantidadActual,0);assert.match(a.$('estadoGuardado').textContent,/revisión familiar/);
 const b=await fixture({misionId:'B',datos});assert.equal(b.estado.modo,'ensayo');assert.equal(b.$('bloqueActual').textContent,'Bloque 1 de 2');const vuelta=b.estado.vuelta.id;
 b.click('escuchar');assert.ok(b.spoken[0].t.includes(b.estado.problemas[0].enunciado));await b.resolver({apoyos:true,pausa:true});assert.match(b.$('estadoGuardado').textContent,/1 de 2/);assert.equal((await b.api.tareas.obtener('B')).estado,'en_curso');assert.match(b.$('resumenCierre').textContent,/5 de 10/);
 b.click('continuar');await b.esperar();assert.equal((await b.api.tareas.leerEvidencias('B')).length,1);
 // Recarga: recupera solamente el bloque guardado, conserva vuelta y continúa el bloque diferente.
 const recarga=await fixture({misionId:'B',datos});assert.equal(recarga.estado.vuelta.id,vuelta);assert.equal(recarga.estado.vuelta.bloque,1);assert.equal(recarga.$('contadorVuelta').textContent,'5 de 10 problemas completados');await recarga.resolver();assert.equal((await recarga.api.tareas.obtener('B')).estado,'pendiente_validacion');assert.equal((await recarga.api.tareas.leerEvidencias('B')).length,2);assert.match(recarga.$('resumenCierre').textContent,/10 de 10/);
 // Otra vuelta posterior no se atribuye a una Misión ya cerrada.
 recarga.click('repetir');await recarga.resolver();const nuevas=[...datos.values()].filter(d=>d.contrato==='sesion-academica-v1');assert.equal(nuevas.at(-1).misionId,null);
 for(const opts of [{preview:true},{preview:'consulta'},{propia:false}]){const f=await fixture(opts);f.start('gaudem');await f.resolver();assert.equal(f.writes.length,0);assert.match(f.$('estadoGuardado').textContent,/Vista previa/);}
 const fallo=await fixture({misionId:'B',datos:new Map([seed('B','ensayo')])});fallo.fallarProximaEvidencia();await fallo.resolver();assert.match(fallo.$('estadoGuardado').textContent,/Sesión guardada, pero no se aplicó/);assert.equal(fallo.$('repetir').disabled,true);fallo.click('reintentarGuardado');await fallo.esperar();assert.equal(fallo.$('repetir').disabled,false);assert.equal((await fallo.api.tareas.leerEvidencias('B')).length,1);
 const libre=await fixture();libre.start('comprendo');await libre.resolver();assert.equal([...libre.datos.values()][0].resumen.unidadesCompletadas,4);
 const parcial=await fixture();parcial.start('gaudem');parcial.responder(0);parcial.click('continuar');parcial.click('volverInicio');assert.equal(parcial.writes.length,0);
 console.log('PASS DOM: Gaudem A, bloque B 1/2, recarga y misma vuelta 2/2, doble cierre, sesión posterior autónoma, Comprendo 4, preview/consulta cero escrituras, parcial, pistas/intentos/audio controlado y pausa.');
})().catch(e=>{console.error(e);process.exitCode=1;});
