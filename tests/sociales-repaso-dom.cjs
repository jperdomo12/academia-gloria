// DOM de prueba (LinkeDOM 0.18.12). Ejecuta el motor real; no valida layout, navegador ni voz nativa.
// QA_DOM_MODULE puede apuntar a una instalación fuera del repositorio. No se añade al producto.
const {parseHTML}=require(process.env.QA_DOM_MODULE||'linkedom');
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const path=require('node:path'),{pathToFileURL}=require('node:url');
const settle=()=>new Promise(r=>setImmediate(r));
const root='cursos/6to/sociales/';
async function fixture(html,{propia=true,logueado=true,voz=true,preview=false,misionId="",guardar=null}={}){
 const {document,window}=parseHTML(html);const saves=[],spoken=[],redirects=[];let recent=0,timers=0,focused=null,cancels=0;
 // Interfaces de selección y foco no implementadas por LinkeDOM: se simulan, sin afirmar validación nativa.
 Object.defineProperty(document,'activeElement',{get:()=>focused});window.HTMLElement.prototype.focus=function(){focused=this;};window.HTMLElement.prototype.scrollIntoView=function(){};
 document.querySelectorAll('select').forEach(select=>Object.defineProperty(select,'value',{get(){return this.querySelector('option[selected]')?.value||this.querySelector('option')?.value||'';},set(v){this.querySelectorAll('option').forEach(o=>o.toggleAttribute('selected',o.value===String(v)));}}));
 const win={location:{search:(preview?'?modo=vista_previa':'?modo=aprendizaje')+(misionId?'&misionId='+misionId:''),replace:v=>redirects.push(v)},matchMedia:()=>({matches:true}),scrollTo(){},addEventListener(){}};
 const env={document,window:win,URL,URLSearchParams,console,auth:{currentUser:logueado?{uid:'qa'}:null,authStateReady:async()=>{}},
  ContextoUsuario:{inicializar:async()=>({esPersonaPropia:propia,usuario:{userId:'actor'},personaActiva:{personaId:'persona',curso:'6.º',nombre:'Alumno de prueba'}}),esAdministrador:async()=>false},
  crearTiempoActivo:()=>{timers++;return{reiniciar(){},detener(){},obtenerResultado:()=>({duracionActivaSegundos:2})};},
  mostrarCelebracion(){},obtenerVariantesRecientes:async()=>{recent++;return new Set();},
  guardarSesionAcademica:async s=>{saves.push(s);if(guardar)return guardar(s);return{guardado:s.modo==='aprendizaje',sesionId:'qa-sesion',misionId:s.misionId,evidenciaMision:{registrada:true}};},MODOS_SESION_ACADEMICA:{APRENDIZAJE:'aprendizaje',VISTA_PREVIA:'vista_previa'},
  disponible:()=>voz,detener:()=>{cancels++;},escuchar:(text,options)=>{spoken.push({text,...options});return true;}};
 const source=fs.readFileSync('compartido/js/motor-practica-verbal.js','utf8').replace(/^import[\s\S]*?;\n/gm,'').replaceAll('export ','').replaceAll('import.meta.url',JSON.stringify('https://academia.invalid/compartido/js/motor-practica-verbal.js'));
 const init=vm.runInNewContext(source+';iniciarTemaVerbal',env);
 const $=id=>document.getElementById(id),click=id=>$(id).click(),option=id=>document.querySelector('#practicaOpciones [data-opcion="'+id+'"]').click();
 return{document,init,$,click,option,saves,spoken,redirects,window,get recent(){return recent;},get timers(){return timers;},get cancels(){return cancels;}};
}
module.exports={fixture,settle};
if(require.main===module)(async()=>{
 const {BLOQUES_REPASO:bloques,PREGUNTAS_REPASO:bank}=await import(pathToFileURL(path.resolve(root+'preparacion-primera-evaluacion/repaso-data.js')));
 const html=fs.readFileSync(root+'preparacion-primera-evaluacion/index.html','utf8');
 const config={meta:{},bloques,practica:bank,familias:[],soloPractica:true};
 async function repaso(propia){
  const f=await fixture(html,{propia});const api=await f.init(config);const {document:d,$,click,option}=f;
  d.querySelectorAll('[data-iniciar-repaso]').forEach(b=>b.disabled=false);
  assert.equal($('practicaContenido').children.length,0); // Las soluciones ni siquiera se renderizan antes de empezar.
  function start(bloque){d.querySelector('[data-iniciar-repaso="'+bloque+'"]').click();}
  start('todas');
  for(let i=0;i<18;i++){
   const p=bank[i];assert.equal(d.querySelector('#practicaContenido h3').textContent,p.titulo);assert.equal(d.querySelectorAll('#practicaOpciones .option').length,4);
   assert.equal($('mensajePractica').textContent,'');assert.equal(d.querySelectorAll('.option.correcta').length,0);
   assert.equal($('barraPractica').parentElement.getAttribute('aria-valuenow'),String(i));
   if(i===0){option(p.opciones.find(o=>o.id!==p.respuestaCorrecta).id);click('botonComprobar');assert.equal($('botonSiguiente').hidden,true);assert.equal($('barraPractica').parentElement.getAttribute('aria-valuenow'),'0');}
   if(i===1){click('botonPista');assert.equal($('pistaPractica').hidden,false);}
   if(i===2){$('marcarDuda').checked=true;$('marcarDuda').dispatchEvent(new f.window.Event('change'));}
   if(i===0){click('practicaEscuchar');assert.match(f.spoken.at(-1).text,/Opción 4:/);for(const b of d.querySelectorAll('#practicaOpciones .option'))assert.ok(f.spoken.at(-1).text.includes(b.textContent));}
   option(p.respuestaCorrecta);click('botonComprobar');assert.equal($('botonSiguiente').hidden,false);assert.ok($('mensajePractica').textContent.includes(p.explicacion));
   assert.equal($('barraPractica').parentElement.getAttribute('aria-valuenow'),String(i+1));assert.equal(d.activeElement,$('botonSiguiente'));click('botonSiguiente');
  }
  assert.equal(d.querySelector('[data-panel="cierre"]').hidden,false);assert.equal($('listaDudasRepaso').children.length,3);assert.equal($('botonRepasarDudas').hidden,false);
  click('botonRepasarDudas');for(const p of bank.slice(0,3)){assert.equal(d.querySelector('#practicaContenido h3').textContent,p.titulo);option(p.respuestaCorrecta);click('botonComprobar');click('botonSiguiente');}
  assert.equal($('listaDudasRepaso').children.length,0);assert.equal($('botonRepasarDudas').hidden,true);
  for(const bloque of bloques){start(bloque.id);for(const p of bank.filter(p=>p.bloqueId===bloque.id)){option(p.respuestaCorrecta);click('botonComprobar');click('botonSiguiente');}assert.ok($('resumenRepaso').textContent.includes(bloque.cantidad+' preguntas'));}
  api.activarPestana('prueba');assert.equal(d.querySelector('[data-panel="cierre"]').hidden,false);
  assert.equal(f.saves.length,0);assert.equal(f.recent,0);assert.equal(f.timers,0);
 }
 await repaso(true);await repaso(false);
 const anon=await fixture(html,{logueado:false});await assert.rejects(anon.init(config),/Sesión no disponible/);assert.match(anon.redirects[0],/login\.html/);assert.equal(anon.saves.length,0);
 const sinVoz=await fixture(html,{voz:false});await sinVoz.init(config);sinVoz.document.querySelector('[data-iniciar-repaso="todas"]').disabled=false;sinVoz.document.querySelector('[data-iniciar-repaso="todas"]').click();sinVoz.click('practicaEscuchar');assert.equal(sinVoz.$('practicaEscuchar').disabled,true);
 // Regresión de los tres Temas con sus bancos reales: práctica y Prueba originales + guardado/previsualización.
 for(const tema of ['impuestos','dinero-ahorro-inversion','publicidad']){
  const data=await import(pathToFileURL(path.resolve(root+tema+'/datos.js')));
  for(const preview of [false,true]){
   const f=await fixture(fs.readFileSync(root+tema+'/index.html','utf8'),{preview});await f.init({meta:data.META,bloques:data.BLOQUES_RESULTADO,practica:data.PRACTICA,familias:data.FAMILIAS_PRUEBA});
   f.document.querySelector('[data-pestana="practica"]').click();
   for(const p of data.PRACTICA){f.option(p.respuestaCorrecta);f.click('botonComprobar');assert.equal(f.$('botonSiguiente').hidden,false);f.click('botonSiguiente');}
   assert.equal(f.document.querySelector('[data-panel="prueba"]').hidden,false);f.click('botonIniciarPrueba');await settle();
   for(let i=0;i<data.FAMILIAS_PRUEBA.length;i++){
    const en=f.document.querySelector('#pruebaContenido .challenge__enunciado').textContent,q=f.document.querySelector('#pruebaContenido .challenge__pregunta').textContent;
    const p=data.FAMILIAS_PRUEBA.flatMap(x=>x.variantes).find(v=>v.enunciado===en&&v.pregunta===q);assert.ok(p);
    f.document.querySelector('#pruebaOpciones [data-opcion="'+p.respuestaCorrecta+'"]').click();f.click('botonResponderPrueba');f.click('botonResponderPrueba');await settle();
   }
   assert.equal(f.saves.length,1);assert.equal(f.saves[0].modo,preview?'vista_previa':'aprendizaje');assert.equal(f.saves[0].resumen.totalCorrectas,data.FAMILIAS_PRUEBA.length);assert.equal(f.saves[0].respuestas.length,data.FAMILIAS_PRUEBA.length);
   assert.equal(f.recent,preview?0:1);assert.equal(f.timers,1);f.click('botonVolverRepaso');assert.equal(f.document.querySelector('[data-panel="claves"]').hidden,false);
  }
 }
 console.log('PASS DOM simulado: 18 preguntas + dudas + 3 bloques, alumno/consulta, cero guardados/temporizador/consulta de sesiones del repaso, anónimo, voz controlada/fallback; práctica/Prueba y contrato de guardado de los 3 Temas (aprendizaje/vista previa) sin regresión. No valida render ni navegador real.');
})().catch(e=>{console.error(e);process.exitCode=1;});
