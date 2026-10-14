/* ContextoUsuario, guard, API y Análisis REALES. SDK/identidad externos simulados.
 * No utiliza datos reales ni certifica Rules desplegadas. */
const {chromium}=require('playwright');const assert=require('node:assert/strict');
const base=process.env.BASE_URL||'http://127.0.0.1:8773';
const sdk=`
const read=()=>JSON.parse(localStorage.qaDB||'{}');
const snap=(path,data)=>({id:path.split('/').at(-1),exists:()=>data!==undefined,data:()=>structuredClone(data)});
const observers=[];
export const doc=(ref,...p)=>{const path=[ref.path,...(p.length?p:['auto-'+Date.now()])].filter(Boolean).join('/');return{path,id:path.split('/').at(-1)};};
export const collection=(ref,...p)=>({path:[ref.path,...p].filter(Boolean).join('/')});
export const where=(field,op,value)=>({field,op,value});export const orderBy=(field,dir)=>({order:field,dir});export const query=(ref,...filters)=>({...ref,filters});
export const getDoc=async r=>snap(r.path,read()[r.path]);
export const getDocs=async r=>{const a=Object.entries(read()).filter(([p])=>p.startsWith(r.path+'/')&&!p.slice(r.path.length+1).includes('/')).filter(([p,v])=>(r.filters||[]).every(f=>!f.field||v[f.field]===f.value));return {docs:a.map(([p,v])=>snap(p,v)),empty:!a.length};};
const write=(r,d,merge=false)=>{window.qaWrites=(window.qaWrites||0)+1;const a=read();a[r.path]=merge?{...a[r.path],...d}:d;localStorage.qaDB=JSON.stringify(a);for(const o of observers)queueMicrotask(async()=>o.cb(await getDocs(o.ref)));};
export const setDoc=async(r,d,o)=>write(r,d,o?.merge);export const updateDoc=async(r,d)=>write(r,d,true);export const addDoc=async(r,d)=>{const id='nueva-'+Date.now();write({path:r.path+'/'+id},d);return{id};};
export const deleteDoc=async r=>{window.qaWrites=(window.qaWrites||0)+1;const a=read();delete a[r.path];localStorage.qaDB=JSON.stringify(a);};
export const serverTimestamp=()=>new Date().toISOString();export const Timestamp={now:()=>new Date().toISOString(),fromDate:d=>d.toISOString()};
export const onSnapshot=(ref,cb)=>{observers.push({ref,cb});queueMicrotask(async()=>cb(await getDocs(ref)));return()=>{};};
export const runTransaction=async(db,fn)=>fn({get:getDoc,set:setDoc,update:updateDoc});
export const increment=n=>n;export const writeBatch=()=>{const ops=[];return{delete:r=>ops.push(r),commit:async()=>{for(const r of ops)await deleteDoc(r);}};};
`;
const seed=role=>{
const actor=role==='gestion'?'familiar':'profesional',person='persona-'+actor;
const rows={
['usuarios/'+actor]:{personaId:person,activo:true,nombre:'Actor de prueba'},
'usuarios/alumno':{personaId:'persona-alumno',activo:true,nombre:'Alumno de prueba'},
['personas/'+person]:{nombre:'Actor de prueba',activo:true},'personas/persona-alumno':{nombre:'Alumno de prueba',activo:true},
['usuarioRoles/'+actor]:{roleId:role,activo:true},['roles/'+role]:{nombre:role,nivelAcceso:role,activo:true},
['personaRelaciones/'+person+'__persona-alumno']:{sourcePersonId:person,targetPersonId:'persona-alumno',activo:true,nivelAcceso:role,tipoRelacion:'profesional'},
'usuarios/alumno/tareas/mision-test':{titulo:'Misión del alumno',tipo:'actividad_modulo',modulo:'rincon-lectura',estado:'pendiente',visibleParaAlumno:false,ordenMision:1,descripcion:'Objetivo educativo',criterioCumplimiento:{tipo:'cantidad',evidenciaTipo:'lectura_completada',cantidadObjetivo:1},progreso:{cantidadActual:0,cantidadObjetivo:1}},
'usuarios/alumno/sesionesLectura/actual':{historiaId:'lectura-test',titulo:'La lectura reciente',actualizadaEn:'2026-10-13T10:00:00Z',analisisLectura:{palabrasParaCrecer:[{palabra:'extraños',estado:'pendiente',intentos:2},{palabra:'logrado',estado:'success',intentos:3}]}},
'usuarios/alumno/sesionesLectura/antigua':{historiaId:'lectura-anterior',titulo:'La lectura anterior',actualizadaEn:'2026-10-12T10:00:00Z',analisisLectura:{palabrasParaCrecer:[{palabra:'extraños',estado:'superada',intentos:1}]}}
};return {actor,rows};};
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']});
async function entorno(role,valid=true,nivelRelacion=role){const c=await b.newContext({viewport:{width:1280,height:1000}});const p=await c.newPage();p.setDefaultTimeout(15000);const errors=[];p.on('pageerror',e=>{errors.push(e.message);console.error('Browser:',e.message);});p.on('console',m=>{if(m.type()==='error')console.error(m.text());});const fixture=seed(role);if(role==='alumno'){fixture.actor='alumno';fixture.rows['usuarioRoles/alumno']={roleId:'alumno',activo:true};fixture.rows['roles/alumno']={nombre:'Alumno',nivelAcceso:'consulta',activo:true};fixture.rows['personas/persona-alumno'].curso='6.º';fixture.rows['personas/persona-alumno'].colegio='Gaudem';fixture.rows['usuarios/alumno'].curso='6.º';}if(role!=='alumno')fixture.rows['personaRelaciones/persona-'+fixture.actor+'__persona-alumno'].nivelAcceso=nivelRelacion;if(!valid)delete fixture.rows['personaRelaciones/persona-'+fixture.actor+'__persona-alumno'];await p.addInitScript(f=>{if(!localStorage.qaDB){localStorage.qaDB=JSON.stringify(f.rows);localStorage.qaActor=f.actor;}if(!sessionStorage.getItem('academia.personaActivaId'))sessionStorage.setItem('academia.personaActivaId','persona-alumno');},fixture);
await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:'',contentType:'text/css'}));await p.route('https://unpkg.com/**',r=>r.fulfill({body:'window.lucide={createIcons(){}}',contentType:'text/javascript'}));
await p.route('**/firebase-firestore.js',r=>r.fulfill({body:sdk,contentType:'text/javascript'}));await p.route('https://www.gstatic.com/**/firebase-auth.js',r=>r.fulfill({body:'export const signOut=async()=>{};export const onAuthStateChanged=(auth,cb)=>{queueMicrotask(()=>cb(auth.currentUser));return()=>{};};',contentType:'text/javascript'}));
await p.route('**/compartido/firebase/firebase-config.js',r=>r.fulfill({body:"export const db={};export const auth={authStateReady:async()=>{},get currentUser(){return {uid:localStorage.qaActor,email:'prueba@example.invalid'}}};",contentType:'text/javascript'}));
await p.route('**/compartido/firebase/firebase-auth.js',r=>r.fulfill({body:'export const observarSesion=()=>()=>{};',contentType:'text/javascript'}));await p.route('**/registro-acceso.js',r=>r.fulfill({body:'export async function registrarAccesoAcademia(){}',contentType:'text/javascript'}));await p.route('**/timeout-sesion.js',r=>r.fulfill({body:'export async function activarTimeoutSesion(){}',contentType:'text/javascript'}));
return {c,p,errors};}



const dir='/mi-universo/creciendo-por-dentro/';
const catalog=require('../mi-universo/creciendo-por-dentro/semillas.json');
const seed012=catalog.semillas.find(s=>s.id==='puedo-empezar-una-conversacion');
const learner=await entorno('alumno'),p=learner.p;
const prior={semillaId:seed012.id,titulo:seed012.titulo,familia:seed012.familia,respuestaConstruida:'¿Has entendido este ejercicio?',respuestas:{enClase:'enClase-2',fraseConversacion:'fraseConversacion-2'},audioData:'',creadaEn:'2026-10-13T10:00:00Z'};
await p.addInitScript(prior=>{const db=JSON.parse(localStorage.qaDB);db['usuarios/alumno/sesionesSemillas/anterior']=prior;localStorage.qaDB=JSON.stringify(db);},prior);
await p.addInitScript(()=>{window.qaSpoken=[];window.SpeechSynthesisUtterance=class{constructor(t){this.text=t;}};Object.defineProperty(window,'speechSynthesis',{value:{cancel(){},speak(u){qaSpoken.push(u.text);u.onend?.();}}});});
async function start(seed) {await p.goto(base+dir);await p.waitForSelector('[data-start-seed="'+seed.id+'"]');await p.click('[data-start-seed="'+seed.id+'"]');await p.click('#continueSeed');await p.click('#continueSituation');}
async function choose(seed) {
 for (const step of seed.pasos){
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
 window.MediaRecorder=class {static isTypeSupported(){return true;}constructor(stream){this.stream=stream;this.mimeType='audio/webm';}start(){this.state='recording';}stop(){this.ondataavailable?.({data:new Blob(['audio simulado'],{type:'audio/webm'})});this.onstop?.();}};
});
await p.click('#practiceResponse');await p.click('#startRecording');await p.click('#stopRecording');await p.waitForFunction(()=>!document.querySelector('#finishRecording').disabled);
await p.fill('#transcript','¿Qué tal estás?');await p.click('#finishRecording');await p.waitForSelector('#finishSeed');
const after=await p.evaluate(()=>JSON.parse(localStorage.qaDB));const recorded=Object.entries(after).filter(([path,v])=>path.includes('/sesionesSemillas/')&&v.semillaId===generic.id);assert.equal(recorded.length,1);assert.equal(recorded[0][1].respuestaConstruida,'¿Qué tal estás?');assert.match(recorded[0][1].audioData,/^data:audio\/webm;base64,/);assert.deepEqual(after['usuarios/alumno/sesionesSemillas/anterior'],prior);assert.equal(JSON.stringify(after[rows[0][0]]),snapshot);
assert.deepEqual(learner.errors,[]);await learner.c.close();await b.close();console.log('OK: resumen de siete pasos, opciones múltiples y palabras propias escapadas, frase separada, audio solo frase, Atrás actualiza, una sesión sin campos duplicados, histórico sin cambios, once Semillas previas intactas, contrato genérico y responsive. SDK/voz simulados.');
})().catch(e=>{console.error(e);process.exit(1)});
