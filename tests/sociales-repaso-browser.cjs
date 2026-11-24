// Motor y navegación reales; identidad/SDK/salida de voz controlados. No hay datos reales.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const {crearEntorno}=require('./helpers/semillas-browser.cjs');
const base=process.env.BASE_URL,route='/cursos/6to/sociales/preparacion-primera-evaluacion/';
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']});try{
 for(const role of ['alumno','consulta','gestion']){
  const {p,c,errors}=await crearEntorno(b,role);
  await p.addInitScript(()=>{window.qaAudio=[];window.SpeechSynthesisUtterance=class extends EventTarget{constructor(text){super();this.text=text;}};Object.defineProperty(window,'speechSynthesis',{value:{speak(u){qaAudio.push({text:u.text,lang:u.lang});},cancel(){}}});});
  await p.goto(base+'/cursos/6to/sociales/');assert.equal(await p.locator('[data-tema-id]').count(),3);
  await p.locator('a.portal-recurso-oficial[href="./preparacion-primera-evaluacion/"]').click();await p.locator('[data-iniciar-repaso="todas"]:enabled').waitFor();
  const banco=await p.evaluate(async()=>{const d=await import('./repaso-data.js');return{preguntas:d.PREGUNTAS_REPASO,bloques:d.BLOQUES_REPASO};});
  const storage=()=>p.evaluate(()=>JSON.stringify({local:{...localStorage},session:{...sessionStorage}})),antes=await storage();
  for(const width of [320,390,768,1024,1440]){
   await p.setViewportSize({width,height:1000});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   if(process.env.QA_IMAGES)await p.screenshot({path:process.env.QA_IMAGES+'/sociales-inicio-'+role+'-'+width+'.png',fullPage:true});
  }
  await p.locator('[data-iniciar-repaso="todas"]').focus();await p.keyboard.press('Enter');
  for(let i=0;i<18;i++){
   const item=banco.preguntas[i];assert.equal(await p.locator('#practicaContenido h3').innerText(),item.titulo);assert.equal(await p.locator('#practicaOpciones .option').count(),4);
   assert.equal(await p.locator('#mensajePractica').innerText(),'');assert.equal(await p.locator('#practicaOpciones .correcta').count(),0);
   assert.equal(await p.locator('.progress').getAttribute('aria-valuenow'),String(i));
   if(i===0){await p.locator('#practicaOpciones [data-opcion="'+item.opciones.find(o=>o.id!==item.respuestaCorrecta).id+'"]').click();await p.locator('#botonComprobar').click();assert.ok(await p.locator('#botonSiguiente').isHidden());
    await p.locator('#practicaEscuchar').click();assert.match(await p.evaluate(()=>qaAudio.at(-1).text),/Opción 4/);
    for(const width of [320,390,768,1024,1440]){await p.setViewportSize({width,height:1000});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));if(process.env.QA_IMAGES)await p.screenshot({path:process.env.QA_IMAGES+'/sociales-pregunta-'+role+'-'+width+'.png',fullPage:true});}
   }
   if(i===1)await p.locator('#botonPista').click();if(i===2)await p.locator('#marcarDuda').check();
   await p.locator('#practicaOpciones [data-opcion="'+item.respuestaCorrecta+'"]').click();await p.locator('#botonComprobar').click();assert.equal(await p.locator('#botonSiguiente').evaluate(e=>document.activeElement===e),true);
   await p.locator('#botonSiguiente').click();
  }
  assert.equal(await p.locator('#listaDudasRepaso li').count(),3);await p.locator('#botonRepasarDudas').click();
  for(const item of banco.preguntas.slice(0,3)){await p.locator('#practicaOpciones [data-opcion="'+item.respuestaCorrecta+'"]').click();await p.locator('#botonComprobar').click();await p.locator('#botonSiguiente').click();}
  assert.equal(await p.locator('#listaDudasRepaso li').count(),0);assert.ok(await p.locator('#botonRepasarDudas').isHidden());
  for(const bloque of banco.bloques){await p.locator('[data-panel="cierre"] [data-pestana="mapa"]').click();await p.locator('[data-iniciar-repaso="'+bloque.id+'"]').click();
   for(const item of banco.preguntas.filter(p=>p.bloqueId===bloque.id)){await p.locator('#practicaOpciones [data-opcion="'+item.respuestaCorrecta+'"]').click();await p.locator('#botonComprobar').click();await p.locator('#botonSiguiente').click();}
   assert.match(await p.locator('#resumenRepaso').innerText(),new RegExp(bloque.cantidad+' preguntas'));
  }
  await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await p.locator('#barraPractica').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
  assert.equal(await p.evaluate(()=>window.qaWrites||0),0);assert.equal(await storage(),antes);assert.deepEqual(errors,[]);
  const popupPromise=p.waitForEvent('popup');await p.getByRole('link',{name:'Los impuestos'}).click();const popup=await popupPromise;assert.ok(popup.url().includes('/impuestos/'));await popup.close();
  await p.locator('[data-nav-volver]').first().click();await p.waitForURL(/\/sociales\/(?:index\.html)?(?:\?|$)/);await c.close();
 }
 console.log('PASS navegador: 18 preguntas, tres bloques, errores/pistas/duda manual y repaso final, audio controlado, tres accesos, cero escrituras, navegación/retorno/refuerzo, cinco anchos, teclado/foco/reduced motion.');
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
