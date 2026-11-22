/* UI, sesión, API e integración reales; identidad/SDK y salida de voz controlados. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {crearEntorno}=require('./helpers/semillas-browser.cjs');
const base=process.env.BASE_URL,topic='/cursos/6to/english/past-simple-vs-past-continuous/',data=topic+'past-data.js';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
  const {p,c,errors}=await crearEntorno(browser,'alumno');
  p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  if(process.env.QA_FONT_CSS)await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:fs.readFileSync(process.env.QA_FONT_CSS,'utf8'),contentType:'text/css'}));
  await p.addInitScript(()=>{
   window.qaAudio=[];window.qaStops=0;
   window.SpeechSynthesisUtterance=class extends EventTarget{constructor(text){super();this.text=text;}};
   Object.defineProperty(window,'speechSynthesis',{value:{speak(u){qaAudio.push({text:u.text,lang:u.lang});},cancel(){qaStops++;}}});
  });
  async function shot(page,name,selector='[data-panel]:not([hidden])'){
   if(process.env.QA_IMAGES)await page.locator(selector).screenshot({path:process.env.QA_IMAGES+'/'+name+'.png'});
  }
  await p.goto(base+'/cursos/6to/english/');
  await p.locator('[data-tema-id="past-simple-vs-past-continuous"]').click();
  await p.waitForFunction(()=>document.querySelector('#tituloModo')?.textContent==='Sesión de aprendizaje');
  assert.ok(new URL(p.url()).searchParams.get('volver').includes('/english/'));
  const bank=await p.evaluate(async path=>await import(path),data);
  for(const sec of ['resumen','compara','fichas','practica','prueba']){
   await p.locator('[data-pestana="'+sec+'"]').click();
   assert.equal(await p.locator('[data-pestana="'+sec+'"]').getAttribute('aria-pressed'),'true');
   if(sec==='fichas')await p.locator('#fichasContenido details').first().locator('summary').click();
   for(const width of [320,390,768,1280,1440]){
    await p.setViewportSize({width,height:1000});await p.evaluate(()=>document.fonts.ready);
    assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),sec+' overflow '+width);
    await shot(p,sec+'-'+width);
   }
  }
  await p.setViewportSize({width:390,height:1000});
  await p.locator('[data-pestana="compara"]').click();
  for(let i=0;i<4;i++){
   await p.locator('#escenasOpciones button').nth(i).click();
   const expected=bank.ESCENAS[i];assert.equal(await p.locator('#escenaFrase').innerText(),expected.frase);
   assert.equal(await p.locator('.time-process').count(),expected.tipos.filter(t=>t==='tramo').length);
   assert.equal(await p.locator('.time-event').count(),expected.tipos.filter(t=>t==='marca').length);
   await p.locator('[data-escuchar-contenedor="#escenaFrase"]').click();
   assert.equal(await p.evaluate(()=>qaAudio.at(-1).text),expected.frase);assert.equal(await p.evaluate(()=>qaAudio.at(-1).lang),'en-GB');
   const stops=await p.evaluate(()=>qaStops);
   await p.locator('#invertirClausulas').click();assert.ok(await p.evaluate(n=>qaStops>n,stops));
   assert.equal(await p.locator('#escenaFrase').innerText(),expected.invertida);await shot(p,'escena-'+i+'-390');
  }
  await p.locator('[data-pestana="fichas"]').click();
  assert.equal(await p.locator('#fichasContenido details').count(),12);
  for(let i=0;i<12;i++){
   const d=p.locator('#fichasContenido details').nth(i);
   if(!await d.getAttribute('open')){if(!await d.evaluate(e=>e.open))await d.locator('summary').click();}
   await d.locator('button').click();assert.equal(await p.evaluate(()=>qaAudio.at(-1).lang),'en-GB');
   assert.equal(await p.evaluate(()=>qaAudio.at(-1).text),bank.FICHAS[i].ejemplo);
  }
  const rap=new URL(await p.locator('#enlaceRap').getAttribute('href'));assert.ok(rap.searchParams.get('volver').endsWith('#fichas'));
  // Las 44 actividades reales: respuesta corta, construcción, transformación, selección, lectura y reparación.
  await p.locator('[data-pestana="practica"]').click();
  const before=await p.evaluate(()=>window.qaWrites||0);
  for(let i=0;i<bank.PRACTICA.length;i++){
   const item=bank.PRACTICA[i];assert.equal(await p.locator('#practicaContenido .challenge__enunciado').innerText(),item.enunciado);
   if(i===0){
    await p.locator('#practicaRespuesta').fill('cleaning');await p.keyboard.press('Enter');assert.ok(await p.locator('#mensajePractica.revisar').isVisible());
    await p.locator('#botonPista').click();const first=await p.locator('#pistaPractica').innerText();await p.locator('#botonPista').click();assert.notEqual(await p.locator('#pistaPractica').innerText(),first);
    assert.equal(await p.evaluate(()=>window.qaWrites||0),before);
   }
   if(item.formato==='texto'){
    let value=item.respuestaCorrecta.toUpperCase().replaceAll("DIDN'T",'DID NOT').replaceAll("WASN'T",'WAS NOT').replaceAll("WEREN'T",'WERE NOT').replaceAll(' / ','/');
    await p.locator('#practicaRespuesta').fill('  '+value+'  ');
    await p.locator('#practicaRespuesta').press('Enter');
   }else await p.locator('#practicaOpciones [data-opcion="'+item.respuestaCorrecta+'"]').click(),await p.locator('#botonComprobar').click();
   assert.ok(await p.locator('#mensajePractica.bien').isVisible(),item.id);
   assert.equal(await p.locator('#botonSiguiente').evaluate(e=>document.activeElement===e),true);
   if(i===31||i===32)await shot(p,'practica-'+i+'-390');
   if(i<bank.PRACTICA.length-1)await p.locator('#botonSiguiente').click();
  }
  assert.equal(await p.evaluate(()=>window.qaWrites||0),before);
  await p.locator('#filtroPractica').selectOption('continuous');assert.match(await p.locator('#estadoPractica').innerText(),/de 8/);
  await p.locator('#botonPista').click();assert.match(await p.locator('#pistaPractica').innerText(),/Was\/were/);
  await p.locator('.extra-identificar summary').click();await p.locator('#identify-0').selectOption('1');assert.match(await p.locator('#identificarMensaje').innerText(),/Revisa/);await p.locator('#identify-0').selectOption('0');assert.match(await p.locator('#identificarMensaje').innerText(),/✓/);
  async function complete(page,wrong=-1){
   await page.locator('[data-pestana="prueba"]').click();await page.locator('#botonIniciarPrueba').click();
   await page.locator('#pruebaContenido h3').waitFor();
   const used=[];
   for(let i=0;i<12;i++){
    const en=await page.locator('#pruebaContenido .challenge__enunciado').innerText();
    const q=await page.locator('#pruebaContenido .challenge__pregunta').innerText();
    const item=bank.FAMILIAS_PRUEBA.flatMap(f=>f.variantes).find(v=>v.enunciado===en&&v.pregunta===q);assert.ok(item,en);used.push(item.id);
    if(item.formato==='texto')await page.locator('#pruebaRespuesta').fill(i===wrong?'not correct':item.respuestaCorrecta.replace("didn't",'did not'));
    else await page.locator('#pruebaOpciones [data-opcion="'+(i===wrong?item.opciones.find(o=>o.id!==item.respuestaCorrecta).id:item.respuestaCorrecta)+'"]').click();
    await page.locator('#botonResponderPrueba').click();assert.ok(await page.locator('#explicacionPrueba').isVisible());
    if(item.formato==='texto')assert.equal(await page.locator('#pruebaRespuesta').isDisabled(),true);
    await page.locator('#botonResponderPrueba').click();
   }
   await page.waitForFunction(()=>!document.querySelector('#cierrePrueba').hidden&&!document.querySelector('#estadoGuardado').textContent.includes('Guardando'));
   assert.match(await page.locator('#resultadoPruebaResumen').innerText(),new RegExp((wrong<0?'12':'11')+' de 12'));
   assert.equal(await page.locator('#mapaResultados .result').count(),4);
   return used;
  }
  const used=[];for(let round=0;round<4;round++){
   if(round>0)await p.locator('#botonVolverRepaso').click();
   used.push(...await complete(p,round===0||round===3?0:-1));
   assert.match(await p.locator('#estadoGuardado').innerText(),/Sesión guardada/);
  }
  assert.equal(new Set(used).size,48,'Cuatro vueltas agotan cuatro variantes por familia sin repetir');
  let db=await p.evaluate(()=>JSON.parse(localStorage.qaDB));
  let sessions=Object.entries(db).filter(([path,v])=>path.includes('/sesionesAcademicas/')&&v.actividadId===bank.PAST_META.actividadId);assert.equal(sessions.length,4);
  for(const [path,s] of sessions){assert.equal(s.respuestas.length,12);assert.equal(s.resumen.porBloque.length,4);assert.equal(s.materia,'English');assert.ok(s.respuestas.every(r=>r.respuestaTexto&&r.respuestaCorrectaTexto));}
  assert.equal(sessions[0][1].resumen.totalCorrectas,11);assert.equal(sessions[0][1].resumen.porcentaje,92);
  await p.goto(base+'/mi-universo/mis-tareas/resultado-academico.html?sesionId='+sessions[0][0].split('/').at(-1));
  await p.locator('#tituloActividad').waitFor();assert.match(await p.locator('body').innerText(),/Past Simple vs Past Continuous/);assert.match(await p.locator('body').innerText(),/not correct/);
  await p.evaluate(id=>{const d=JSON.parse(localStorage.qaDB);d['usuarios/alumno/tareas/mision-past']={titulo:'Practicar el pasado',tipo:'repaso_academico',modulo:'libre',estado:'pendiente',visibleParaAlumno:true,cursoReferencia:'6.º',materia:'English',tema:'Past Simple vs Past Continuous',recursoAcademicoUrl:'../../cursos/6to/english/past-simple-vs-past-continuous/',criterioCumplimiento:{tipo:'cantidad',modulo:'libre',evidenciaTipo:'sesion_academica',cantidadObjetivo:1},progreso:{cantidadActual:0,cantidadObjetivo:1}};localStorage.qaDB=JSON.stringify(d);});
  await p.goto(base+topic+'?misionId=mision-past');await p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Sesión de aprendizaje');
  await complete(p);db=await p.evaluate(()=>JSON.parse(localStorage.qaDB));assert.equal(db['usuarios/alumno/tareas/mision-past'].estado,'pendiente_validacion');assert.equal(Object.entries(db).filter(([path,v])=>path.includes('/evidencias/')&&v.misionId==='mision-past').length,1);
  for(const role of ['consulta','gestion']){
   const related=await crearEntorno(browser,role);
   await related.p.goto(base+topic+'?modo=aprendizaje');await related.p.waitForFunction(()=>document.querySelector('#tituloModo')?.textContent==='Vista previa');
   assert.equal(await related.p.locator('#botonModo').isDisabled(),true);
   await complete(related.p);assert.equal(await related.p.evaluate(()=>window.qaWrites||0),0);assert.deepEqual(related.errors,[]);
   await related.p.evaluate(rows=>{const d=JSON.parse(localStorage.qaDB);Object.assign(d,rows);localStorage.qaDB=JSON.stringify(d);},Object.fromEntries(sessions));
   if(role==='consulta'){
    await related.p.goto(base+'/mi-universo/consulta-educativa/');await related.p.locator('#analisisResultado .analisis-seccion').first().waitFor();assert.match(await related.p.locator('#analisisResultado').innerText(),/Past Simple vs Past Continuous/);
   }else{
    await related.p.goto(base+'/mi-universo/mis-tareas/');await related.p.locator('[data-tab="refuerzos"]').click();
    await related.p.waitForFunction(()=>document.querySelector('#grupoRefuerzoAcademico')?.textContent.includes('Past Simple'));
    await related.p.locator('[data-tab="crear"]').click();await related.p.selectOption('#tipo','repaso_academico');await related.p.selectOption('#cursoReferencia','6');
    await related.p.waitForFunction(()=>Array.from(document.querySelector('#materiaCatalogoAcademico').options).some(o=>o.text==='English'));
    await related.p.selectOption('#materiaCatalogoAcademico',{label:'English'});await related.p.waitForFunction(()=>document.querySelector('#temaCatalogoAcademico').textContent.includes('Past Simple vs Past Continuous'));
   }
   assert.deepEqual(related.errors,[]);await related.c.close();
  }
  const denied=await crearEntorno(browser,'consulta',false);await denied.p.goto(base+topic+'?modo=aprendizaje');
  await denied.p.waitForFunction(()=>document.querySelector('#descripcionModo')?.textContent&&!document.querySelector('#descripcionModo').textContent.includes('Preparando'));
  assert.notEqual(await denied.p.evaluate(async()=>{const {ContextoUsuario}=await import('/compartido/js/contexto-usuario.js');return (await ContextoUsuario.inicializar()).userIdPersonaActiva;}),'alumno');
  assert.equal(await denied.p.evaluate(()=>window.qaWritePaths?.some(path=>path.startsWith('usuarios/alumno/'))||false),false);await denied.c.close();
  // Referencia real actual para comparación visual y regresión de Present (motor previo independiente).
  await p.goto(base+'/cursos/6to/english/present-simple-vs-present-continuous/');await p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Sesión de aprendizaje');
  for(const sec of ['resumen','compara','fichas']){await p.locator('[data-pestana="'+sec+'"]').click();await shot(p,'present-referencia-'+sec+'-390');}
  await p.goto(base+topic+'?modo=vista_previa');await p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Vista previa');
  await p.emulateMedia({reducedMotion:'reduce'});await p.locator('[data-pestana="practica"]').click();assert.equal(await p.locator('#barraPractica').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
  await p.setViewportSize({width:320,height:1000});
  for(const sec of ['resumen','compara','fichas','practica','prueba']){
   await p.locator('[data-pestana="'+sec+'"]').click();await p.evaluate(()=>document.documentElement.style.fontSize='200%');
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'zoom 200% '+sec);await p.evaluate(()=>document.documentElement.style.fontSize='');
  }
  await p.locator('[data-pestana="practica"]').click();await p.locator('.extra-identificar summary').click();await p.locator('#identify-1').selectOption('1');
  assert.equal(await p.locator('[data-forma="1"]').getAttribute('class'),'marked-form marked-1');
  assert.deepEqual(errors,[]);await c.close();
  console.log('PASS: 44 prácticas (siete formatos), 48 variantes en cuatro pruebas, puntuación, sesión/variantes/histórico, Misión/evidencia, consulta/gestión/previa sin escrituras, catálogo/refuerzos/Análisis, cuatro escenas, fichas/audio controlado, cinco anchos, teclado/foco/zoom/reduced motion y referencia Present.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
