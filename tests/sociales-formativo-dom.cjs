// Motor real + DOM simulado; no sustituye Firestore Rules ni revisión visual en navegador.
const fs=require('node:fs'),assert=require('node:assert/strict');
const {fixture,settle}=require('./sociales-repaso-dom.cjs');
(async()=>{
 const {META_REPASO:meta,BLOQUES_REPASO:bloques,PREGUNTAS_REPASO:banco,RECORRIDOS_REPASO:recorridos}=await import('../cursos/6to/sociales/preparacion-primera-evaluacion/repaso-data.js');
 const html=fs.readFileSync('cursos/6to/sociales/preparacion-primera-evaluacion/index.html','utf8'),config={meta,bloques,practica:banco,familias:[],soloPractica:true,registroFormativo:true};
 async function iniciar(opciones={}){
  const f=await fixture(html,opciones);await f.init(config);f.document.querySelectorAll('[data-iniciar-repaso]').forEach(b=>b.disabled=false);
  f.start=id=>f.document.querySelector('[data-iniciar-repaso="'+id+'"]').click();
  f.resolver=(p,ayudas=false)=>{if(ayudas){f.click('botonPista');f.option(p.opciones.find(o=>o.id!==p.respuestaCorrecta).id);f.click('botonComprobar');f.$('marcarDuda').checked=true;f.$('marcarDuda').dispatchEvent(new f.window.Event('change'));}f.option(p.respuestaCorrecta);f.click('botonComprobar');f.click('botonComprobar');f.click('botonSiguiente');};return f;
 }
 for(const r of recorridos){
  const f=await iniciar({misionId:'mision-qa'});f.start(r.id);assert.equal(f.$('botonModo').disabled,true);
  const preguntas=banco.filter(p=>r.ids.includes(p.id));for(const [i,p]of preguntas.entries()){assert.equal(f.saves.length,0);f.resolver(p,i===0);}
  await settle();assert.equal(f.saves.length,1);const d=f.saves[0];assert.equal(d.misionId,'mision-qa');assert.equal(d.resumen.recorridoId,r.id);assert.equal(d.resumen.totalCorrectas,r.cantidad-1);assert.equal(d.respuestas[0].historialIntentos.length,2);assert.equal(d.respuestas[0].pistasUtilizadas.length,1);assert.equal(d.resumen.porcentaje,undefined);assert.equal(d.personaIdEsperada,'persona');assert.equal(f.$('verSesionRepaso').hidden,false);
  f.click('botonSiguiente');await settle();assert.equal(f.saves.length,1); // cierre duplicado
  f.click('botonRepasarDudas');f.resolver(preguntas[0]);await settle();assert.equal(f.saves.length,1);assert.match(f.$('resumenRepaso').textContent,/no genera otra sesión/);
 }
 for(const opciones of [{preview:true},{propia:false}]){const f=await iniciar(opciones);f.start('publicidad');for(const p of banco.slice(15))f.resolver(p);await settle();assert.equal(f.saves.length,0);assert.match(f.$('estadoGuardadoRepaso').textContent,/Vista previa/);}
 const parcial=await iniciar();parcial.start('todas');parcial.resolver(banco[0]);parcial.document.querySelector('[data-panel="practica"] [data-pestana="mapa"]').click();await settle();assert.equal(parcial.saves.length,0);
 let n=0;const retry=await iniciar({guardar:async d=>{if(++n===1)throw new Error('sin conexión');return{guardado:true,sesionId:'qa',misionId:null};}});retry.start('publicidad');for(const p of banco.slice(15))retry.resolver(p);await settle();assert.equal(retry.$('reintentarGuardadoRepaso').hidden,false);retry.click('reintentarGuardadoRepaso');await settle();assert.equal(retry.saves.length,2);assert.strictEqual(retry.saves[0],retry.saves[1]);assert.equal(retry.$('reintentarGuardadoRepaso').hidden,true);
 const errorEnlace=await iniciar({misionId:'m1',guardar:async()=>({guardado:true,sesionId:'qa',misionId:'m1',evidenciaMision:{registrada:false,motivo:'error_registro_evidencia',error:'red'}})});errorEnlace.start('publicidad');for(const p of banco.slice(15))errorEnlace.resolver(p);await settle();assert.match(errorEnlace.$('estadoGuardadoRepaso').textContent,/Sesión guardada.*No se ha completado/);assert.equal(errorEnlace.$('verSesionRepaso').hidden,false);assert.equal(errorEnlace.$('reintentarGuardadoRepaso').hidden,false);
 console.log('PASS DOM simulado formativo: 4 recorridos, inicial/final/pistas/dudas, doble cierre, repaso sin duplicados, preview/consulta, parcial sin guardar, retry inmutable y fallo de enlace honesto.');
})().catch(e=>{console.error(e);process.exitCode=1;});
