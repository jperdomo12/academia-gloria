/* ContextoUsuario, guard, API y Análisis REALES. SDK/identidad externos simulados.
 * No utiliza datos reales ni certifica Rules desplegadas. */
const {chromium}=require('playwright');const assert=require('node:assert/strict');
const base=process.env.BASE_URL||'http://127.0.0.1:8773';
const {crearEntorno}=require('./helpers/semillas-browser.cjs');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']});
const entorno=(...args)=>crearEntorno(b,...args);

const dir='/mi-universo/creciendo-por-dentro/';
const catalog=require('../mi-universo/creciendo-por-dentro/semillas.json');
const seed012=catalog.semillas.find(s=>s.id==='puedo-empezar-una-conversacion');
const learner=await entorno('alumno'),p=learner.p;
const prior={semillaId:seed012.id,titulo:seed012.titulo,familia:seed012.familia,respuestaConstruida:'¿Has entendido este ejercicio?',respuestas:{enClase:'enClase-2',fraseConversacion:'fraseConversacion-2'},audioData:'',creadaEn:'2026-10-13T10:00:00Z'};
await p.addInitScript(prior=>{const db=JSON.parse(localStorage.qaDB);db['usuarios/alumno/sesionesSemillas/anterior']=prior;localStorage.qaDB=JSON.stringify(db);},prior);
await p.addInitScript(()=>{window.qaSpoken=[];window.SpeechSynthesisUtterance=class{constructor(t){this.text=t;}};Object.defineProperty(window,'speechSynthesis',{value:{cancel(){},speak(u){qaSpoken.push(u.text);u.onend?.();}}});});
async function start(seed) {await p.goto(base+dir);await p.waitForSelector('[data-start-seed="'+seed.id+'"]');await p.click('[data-start-seed="'+seed.id+'"]');if(seed.escenarios)await p.click('[data-start-scenario="'+seed.escenarioPredeterminadoId+'"]');await p.click('#continueSeed');await p.click('#continueSituation');}
async function choose(seed) {
 for (const step of (seed.pasos || seed.escenarios.find(e=>e.id===seed.escenarioPredeterminadoId).pasos)){
  await p.click('[data-answer="'+step.opciones[0].id+'"]');
  if(step.tipo==='opcion-multiple'&&step.opciones.length>1)await p.click('[data-answer="'+step.opciones[1].id+'"]');
  if(step.id==='enClase')await p.fill('#otherAnswer','Mi idea <b>en clase</b> & una pregunta.');
  if(step.id==='recordarConversacion')await p.fill('#otherAnswer','También puedo escuchar.');
  if(step.id==='fraseConversacion')await p.fill('#otherAnswer','¿Quieres jugar conmigo?');
  await p.click('#nextQuestion');
 }
 await p.waitForSelector('#composedResponse');
}
await start(seed012);await choose(seed012);
assert.equal(await p.locator('.composer-summary li').count(),7);
for(const step of seed012.pasos.slice(0,-1))assert.ok((await p.locator('.composer-summary').innerText()).includes(step.titulo));
assert.equal(await p.locator('.composer-phrase-title').innerText(),'Mi frase para probar');assert.equal(await p.locator('#composedResponse').innerText(),'¿Quieres jugar conmigo?');
assert.ok((await p.locator('.composer-summary').innerText()).includes('Mi idea <b>en clase</b> & una pregunta.'));assert.equal(await p.locator('.composer-summary b').count(),0);
assert.ok((await p.locator('.composer-summary').innerText()).includes('También puedo escuchar.'));assert.ok(!(await p.locator('.composer-summary').innerText()).includes('¿Quieres jugar conmigo?'));
assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
for(const width of [1280,768,390,320]){await p.setViewportSize({width,height:1000});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
if(process.env.QA_IMAGES){await p.setViewportSize({width:390,height:1000});await p.screenshot({path:process.env.QA_IMAGES+'-mobile.png',fullPage:true});await p.setViewportSize({width:1280,height:1000});await p.screenshot({path:process.env.QA_IMAGES+'-desktop.png',fullPage:true});}
await p.click('#listenResponse');assert.equal(await p.evaluate(()=>qaSpoken.at(-1)),'¿Quieres jugar conmigo?');
// Atrás y cambio de una respuesta anterior: el resumen se deriva de respuestas actuales.
await p.click('#previousComposer');for(let i=0;i<6;i++)await p.click('#previousQuestion');
await p.fill('#otherAnswer','Ahora pregunto otra cosa.');for(let i=0;i<7;i++)await p.click('#nextQuestion');
assert.ok((await p.locator('.composer-summary').innerText()).includes('Ahora pregunto otra cosa.'));assert.ok(!(await p.locator('.composer-summary').innerText()).includes('Mi idea <b>'));
await p.click('#practiceResponse');assert.equal(await p.locator('.recording .composer').innerText(),'¿Quieres jugar conmigo?');await p.click('#listenBeforeRecording');assert.equal(await p.evaluate(()=>qaSpoken.at(-1)),'¿Quieres jugar conmigo?');
await p.click('#continueWithoutRecording');await p.waitForSelector('#finishSeed');
const db=await p.evaluate(()=>JSON.parse(localStorage.qaDB));const rows=Object.entries(db).filter(([path,v])=>path.includes('/sesionesSemillas/')&&!path.endsWith('/anterior')&&v.semillaId===seed012.id);assert.equal(rows.length,1);
assert.deepEqual(db['usuarios/alumno/sesionesSemillas/anterior'],prior);const saved=rows[0][1];assert.equal(saved.respuestaConstruida,'¿Quieres jugar conmigo?');assert.equal(saved.respuestas.enClase__other,'Ahora pregunto otra cosa.');assert.deepEqual(saved.respuestas.recordarConversacion,seed012.pasos[6].opciones.slice(0,2).map(o=>o.id));assert.equal(saved.respuestas.recordarConversacion__other,'También puedo escuchar.');assert.ok(!('resumen' in saved));assert.ok(!('resumen' in saved.respuestas));assert.equal(saved.audioData,'');
const snapshot=JSON.stringify(saved);await p.click('#finishSeed');await p.click('#showHistory');await p.waitForSelector('.history-card');assert.ok((await p.locator('#historyPanel').textContent()).includes('¿Quieres jugar conmigo?'));assert.equal(JSON.stringify((await p.evaluate(()=>JSON.parse(localStorage.qaDB)))[rows[0][0]]),snapshot);
// Ninguna de las once Semillas previas adopta la nueva presentación por accidente.
for(const seed of catalog.semillas.filter(s=>s.id!==seed012.id)){await start(seed);await choose(seed);assert.equal(await p.locator('.composer-summary').count(),0,seed.id);assert.equal(await p.locator('#experienceContent h2').innerText(),'Esta es tu frase');}
// El contrato se aplica a otro ID y otro paso; no es una condición rígida de 012.
const generic=structuredClone(seed012);generic.id='semilla-generica-prueba';generic.pasos.at(-1).id='fraseDistinta';generic.plantillaRespuesta='{fraseDistinta}';
await p.route('**/semillas.json',route=>route.fulfill({json:{...catalog,semillas:[generic]}}));await start(generic);await choose(generic);assert.equal(await p.locator('.composer-summary li').count(),7);assert.equal(await p.locator('#composedResponse').innerText(),'¿Qué tal estás?');

// Grabación opcional: también guarda exclusivamente la frase, con el contrato de audio existente.
await p.evaluate(()=>{
 Object.defineProperty(navigator,'mediaDevices',{value:{getUserMedia:async()=>({getTracks:()=>[{stop(){}}]})},configurable:true});
 window.MediaRecorder=class {static isTypeSupported(){return true;}constructor(stream){this.stream=stream;this.mimeType='audio/webm';}start(){this.state='recording';}stop(){this.state='inactive';this.ondataavailable?.({data:new Blob(['audio simulado'],{type:'audio/webm'})});this.onstop?.();}};
});
await p.click('#practiceResponse');await p.click('#startRecording');await p.click('#stopRecording');await p.waitForFunction(()=>!document.querySelector('#finishRecording').disabled);
await p.fill('#transcript','¿Qué tal estás?');await p.click('#finishRecording');await p.waitForSelector('#finishSeed');
const after=await p.evaluate(()=>JSON.parse(localStorage.qaDB));const recorded=Object.entries(after).filter(([path,v])=>path.includes('/sesionesSemillas/')&&v.semillaId===generic.id);assert.equal(recorded.length,1);assert.equal(recorded[0][1].respuestaConstruida,'¿Qué tal estás?');assert.match(recorded[0][1].audioData,/^data:audio\/webm;base64,/);assert.deepEqual(after['usuarios/alumno/sesionesSemillas/anterior'],prior);assert.equal(JSON.stringify(after[rows[0][0]]),snapshot);
assert.deepEqual(learner.errors,[]);await learner.c.close();await b.close();console.log('OK: resumen de siete pasos, opciones múltiples y palabras propias escapadas, frase separada, audio solo frase, Atrás actualiza, una sesión sin campos duplicados, histórico sin cambios, once Semillas previas intactas, contrato genérico y responsive. SDK/voz simulados.');
})().catch(e=>{console.error(e);process.exit(1)});
