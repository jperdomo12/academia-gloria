// Motor de Dale al coco, navegación, ContextoUsuario y sesiones reales; SDK/identidad/voz controlados.
const{chromium}=require('playwright');const assert=require('node:assert/strict');const fs=require('node:fs');const{crearEntorno}=require('./helpers/semillas-browser.cjs');
const base=process.env.BASE_URL,topic='/cursos/6to/zonas/matezonas/dale-al-coco-zonas-1/';
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']});try{
 const{p,c,errors}=await crearEntorno(browser,'alumno');
 const consoleErrors=[];p.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});
 if(process.env.QA_FONT_CSS)await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:fs.readFileSync(process.env.QA_FONT_CSS,'utf8'),contentType:'text/css'}));
 await p.addInitScript(()=>{window.qaAudio=[];window.SpeechSynthesisUtterance=class extends EventTarget{constructor(text){super();this.text=text;}};Object.defineProperty(window,'speechSynthesis',{value:{speak(u){qaAudio.push({text:u.text,lang:u.lang});},cancel(){}}});});
 await p.goto(base+'/cursos/6to/zonas/matezonas/');await p.locator('[data-tema-id="dale-al-coco-zonas-1"]').click();
 await p.waitForFunction(()=>document.querySelector('#tituloModo')?.textContent==='Sesión de aprendizaje');
 assert.ok(new URL(p.url()).searchParams.get('volver').includes('/matezonas/'));
 const bank=await p.evaluate(async()=>{const m=await import('./dale-al-coco-zonas-1-data.js');return {OPERACIONES_MATEZONA:m.OPERACIONES_MATEZONA,PRACTICA_COCO:m.PRACTICA_COCO,FAMILIAS_PRUEBA_COCO:m.FAMILIAS_PRUEBA_COCO};});
 await p.locator('[data-pestana="material"]').click();assert.equal(await p.locator('[data-panel="material"] > .examples > article').count(),4);
 await p.locator('#practicarOperaciones summary').focus();await p.keyboard.press('Enter');await p.locator('#opFamilia').waitFor();
 const storage=()=>p.evaluate(()=>JSON.stringify({local:{...localStorage},session:{...sessionStorage}}));const before=await storage();
 for(let f=0;f<7;f++){
  await p.selectOption('#opFamilia',String(f));
  for(let v=0;v<3;v++){
   if(v>0)await p.locator('#opVariante').click();
   const item=bank.OPERACIONES_MATEZONA[f].variantes[v];
   assert.equal(await p.locator('#opExplicacion').isHidden(),true);assert.equal(await p.locator('#opExplicacion').innerText(),'');
   assert.match(await p.locator('#opOrigen').innerText(),new RegExp(v===0?'colegio':'original de Academia'));
   if(f===6){assert.equal(await p.locator('#opExpresion sup').innerText(),String(item.expresion[0].potencia[1]));assert.match(await p.locator('#opExpresion').getAttribute('aria-label'),/elevado a/);}
   if(v===0&&[1,4,5,6].includes(f)){
    for(const width of [320,390,768,1024,1440]){
     await p.setViewportSize({width,height:1000});await p.evaluate(()=>document.fonts.ready);
     assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow familia '+f+' / '+width);
     if(process.env.QA_IMAGES)await p.locator('.operaciones-matezona').screenshot({path:process.env.QA_IMAGES+'/operacion-'+f+'-'+width+'.png'});
    }
    await p.setViewportSize({width:390,height:1000});await p.locator('#opEscuchar').click();const spoken=await p.evaluate(()=>qaAudio.at(-1));assert.equal(spoken.lang,'es-ES');
    if(f===6)assert.match(spoken.text,/10 elevado a 4 más 202/);
   }
   // Respuesta incompleta/errónea no resuelve ni muestra la solución.
   await p.locator('#opComprobar').click();assert.ok(await p.locator('#opMensaje.revisar').isVisible());
   for(const key of Object.keys(item.respuestas))await p.locator('#op-'+key).fill('0');
   await p.locator('#opComprobar').click();assert.match(await p.locator('#opMensaje').innerText(),/Todavía no coincide/);assert.ok(await p.locator('#opExplicacion').isHidden());
   await p.locator('#opPista').click();assert.ok(await p.locator('#opTextoPista').isVisible());
   if(f===1&&v===0){
    await p.locator('#op-cociente').fill('688');await p.locator('#op-resto').fill('0');await p.locator('#opComprobar').click();assert.match(await p.locator('#opMensaje').innerText(),/Todavía no coincide/);
    await p.locator('#op-cociente').fill('688,46');await p.locator('#opComprobar').click();assert.match(await p.locator('#opMensaje').innerText(),/sin.*|decimales/);
   }
   for(const [key,value] of Object.entries(item.respuestas)){
    const format=v===0?String(value):Number(value).toLocaleString('es-ES').replaceAll('.',v===1?'.':' ');
    await p.locator('#op-'+key).fill(format);
   }
   await p.locator('#opCampos input').last().press('Enter');assert.ok(await p.locator('#opMensaje.bien').isVisible(),item.id);
   assert.equal(await p.locator('#opExplicacion li').count(),item.pasos.length);assert.equal(await p.locator('#opRepetir').evaluate(e=>document.activeElement===e),true);
   assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
  }
  await p.locator('#opVariante').click();assert.match(await p.locator('#opOrigen').innerText(),/1 de 2/);
  await p.locator('#opFicha').click();assert.match(await p.locator('#opOrigen').innerText(),/colegio/);assert.ok(await p.locator('#opExplicacion').isHidden());
 }
 await p.locator('#op-resultado').fill('0');await p.locator('#opComprobar').click();
 await p.locator('#opVerPasos').click();assert.ok(await p.locator('#opExplicacion').isVisible());
 await p.locator('#opRepetir').click();assert.ok(await p.locator('#opExplicacion').isHidden());assert.equal(await p.locator('#op-resultado').inputValue(),'');
 assert.equal(await storage(),before);
 // La práctica y prueba existentes conservan sus ocho retos, respuestas, sesión y variantes.
 await p.locator('[data-pestana="practica"]').click();
 for(let i=0;i<8;i++){const q=bank.PRACTICA_COCO[i];await p.locator('#practicaOpciones [data-opcion="'+q.respuestaCorrecta+'"]').click();await p.locator('#botonComprobar').click();assert.ok(await p.locator('#botonSiguiente').isVisible());if(i<7)await p.locator('#botonSiguiente').click();}
 assert.equal(await p.evaluate(()=>window.qaWrites||0),0);assert.deepEqual(consoleErrors,[]);
 async function complete(page){
  await page.locator('[data-pestana="prueba"]').click();await page.locator('#botonIniciarPrueba').click();
  for(let i=0;i<8;i++){
   await page.locator('#pruebaOpciones .option').first().waitFor();
   const en=await page.locator('#pruebaContenido .challenge__enunciado').innerText(),q=await page.locator('#pruebaContenido .challenge__pregunta').innerText();
   const item=bank.FAMILIAS_PRUEBA_COCO.flatMap(f=>f.variantes).find(v=>v.enunciado===en&&v.pregunta===q);assert.ok(item);
   await page.locator('#pruebaOpciones [data-opcion="'+item.respuestaCorrecta+'"]').click();await page.locator('#botonResponderPrueba').click();await page.locator('#botonResponderPrueba').click();
  }
  await page.waitForFunction(()=>!document.querySelector('#cierrePrueba').hidden&&!document.querySelector('#estadoGuardado').textContent.includes('Guardando'));
  assert.match(await page.locator('#resultadoPruebaResumen').innerText(),/8 de 8/);
 }
 await complete(p);assert.match(await p.locator('#estadoGuardado').innerText(),/Sesión guardada/);
 const sessions=await p.evaluate(()=>Object.entries(JSON.parse(localStorage.qaDB)).filter(([path,v])=>path.includes('/sesionesAcademicas/')&&v.actividadId==='6-matematicas-matezonas-dale-al-coco-zonas-1'));
 assert.equal(sessions.length,1);assert.equal(sessions[0][1].respuestas.length,8);assert.equal(sessions[0][1].resumen.porBloque.length,4);
 await p.goto(base+'/mi-universo/mis-tareas/resultado-academico.html?sesionId='+sessions[0][0].split('/').at(-1));await p.locator('#tituloActividad').waitFor();assert.match(await p.locator('body').innerText(),/Dale al coco/);
 for(const role of ['consulta','gestion']){
  const related=await crearEntorno(browser,role);await related.p.goto(base+topic+'?modo=aprendizaje');await related.p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Vista previa');
  assert.equal(await related.p.locator('#botonModo').isDisabled(),true);
  await related.p.locator('[data-pestana="material"]').click();await related.p.locator('#practicarOperaciones summary').click();await related.p.selectOption('#opFamilia','6');await related.p.locator('#op-resultado').fill('10.202');await related.p.locator('#opComprobar').click();assert.ok(await related.p.locator('#opMensaje.bien').isVisible());
  await complete(related.p);assert.equal(await related.p.evaluate(()=>window.qaWrites||0),0);assert.deepEqual(related.errors,[]);await related.c.close();
 }
 await p.goto(base+topic+'?volver='+encodeURIComponent('/cursos/6to/zonas/matezonas/'));await p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Sesión de aprendizaje');
 await p.emulateMedia({reducedMotion:'reduce'});await p.locator('[data-pestana="material"]').click();await p.locator('#practicarOperaciones summary').click();await p.setViewportSize({width:320,height:1000});assert.equal(await p.locator('#barraPractica').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
 await p.locator('[data-nav-volver]').first().click();await p.waitForURL(/\/matezonas\/(?:index\.html)?(?:\?|$)/);
 assert.deepEqual(errors,[]);await c.close();
 console.log('PASS: 21 operaciones, reintento/pista/sin solución previa, miles y cociente/resto, superíndice/audio controlado, cinco anchos/teclado/foco/reduced motion, cero escrituras opcionales, ocho prácticas/prueba/sesión/histórico previos, Vista previa relacionada y retorno a Matezonas.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
