/* ContextoUsuario, guard, API y Análisis REALES. SDK/identidad externos simulados.
 * No utiliza datos reales ni certifica Rules desplegadas. */
const {chromium}=require('playwright');const assert=require('node:assert/strict');
const base=process.env.BASE_URL||'http://127.0.0.1:8774';
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
await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:process.env.QA_FONT_CSS ? require('fs').readFileSync(process.env.QA_FONT_CSS,'utf8') : '',contentType:'text/css'}));
if(process.env.QA_FONT_CSS){const css=require('fs').readFileSync(process.env.QA_FONT_CSS,'utf8');const urls=[...new Set([...css.matchAll(/url\(([^)]+)\)/g)].map(m=>m[1]))];for(let i=0;i<urls.length;i++)await p.route(urls[i],r=>r.fulfill({body:require('fs').readFileSync(require('path').join(require('path').dirname(process.env.QA_FONT_CSS),'plan-font-'+i+'.ttf')),contentType:'font/ttf'}));}await p.route('https://unpkg.com/**',r=>r.fulfill({body:'window.lucide={createIcons(){}}',contentType:'text/javascript'}));
await p.route('**/firebase-firestore.js',r=>r.fulfill({body:sdk,contentType:'text/javascript'}));await p.route('https://www.gstatic.com/**/firebase-auth.js',r=>r.fulfill({body:'export const signOut=async()=>{};export const onAuthStateChanged=(auth,cb)=>{queueMicrotask(()=>cb(auth.currentUser));return()=>{};};',contentType:'text/javascript'}));
await p.route('**/compartido/firebase/firebase-config.js',r=>r.fulfill({body:"export const db={};export const auth={authStateReady:async()=>{},get currentUser(){return {uid:localStorage.qaActor,email:'prueba@example.invalid'}}};",contentType:'text/javascript'}));
await p.route('**/compartido/firebase/firebase-auth.js',r=>r.fulfill({body:'export const observarSesion=()=>()=>{};',contentType:'text/javascript'}));await p.route('**/registro-acceso.js',r=>r.fulfill({body:'export async function registrarAccesoAcademia(){}',contentType:'text/javascript'}));await p.route('**/timeout-sesion.js',r=>r.fulfill({body:'export async function activarTimeoutSesion(){}',contentType:'text/javascript'}));
if(process.env.QA_RAP_FONTS){
 const fs=require('fs');const path=require('path');
 await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:fs.readFileSync(process.env.QA_RAP_FONTS,'utf8'),contentType:'text/css'}));
 await p.route('https://qa-fonts.local/**',r=>{const u=new URL(r.request().url());return r.fulfill({body:fs.readFileSync('/tmp/rap-qa/node_modules/@fontsource/'+u.pathname.slice(1)),contentType:'font/woff2'});});
}
return {c,p,errors};}



const portal='/cursos/6to/plan-semanal/';
const ficha=portal+'english-irregular-verbs-rap/';
for(const role of ['alumno','gestion','consulta']){
 const {p,c,errors}=await entorno(role);
 await p.clock.install({time:new Date('2026-10-27T12:00:00Z')});
 await p.goto(base+portal);await p.waitForSelector('.plan-tarjeta');
 const before=await p.evaluate(()=>JSON.parse(localStorage.qaDB));
 assert.equal(await p.locator('.plan-tarjeta').count(),2);
 assert.match(await p.locator('.plan-fecha').first().innerText(),/26.*octubre.*2.*noviembre.*2026/);
 assert.match(await p.locator('.plan-tarjeta').filter({hasText:'RAP'}).innerText(),/English.*Irregular Verbs RAP.*RAP \+ vídeo \+ entrega.*10 de noviembre/s);
 assert.equal(await p.locator('details.plan-semana[open]').count(),0);
 await p.locator('.plan-tarjeta').filter({hasText:'RAP'}).click();await p.waitForSelector('#fragmentoActual');
 const fragments=await p.evaluate(async()=> (await import('/cursos/6to/plan-semanal/english-irregular-verbs-rap/rap-data.js')).FRAGMENTOS_RAP);
 assert.equal(fragments.length,14);assert.equal(fragments.flatMap(f=>f.lineas).length,94);
 assert.equal(await p.locator('.rap-pasos a').count(),6);
 assert.equal(await p.locator('time[datetime="2026-11-10"]').count(),2);
 assert.equal(await p.locator('.rap-filename').textContent(),'6A/B/C_WP_NAMES_RAP');
 assert.match(await p.locator('#graba').innerText(),/Solo.*En pareja.*En trío.*otras clases de 6.º/s);
 const links=await p.locator('#escucha a[target="_blank"], #entrega a[target="_blank"]').evaluateAll(es=>es.map(e=>({href:e.href,rel:e.rel})));
 assert.deepEqual(links.map(l=>l.href),['https://www.youtube.com/watch?v=NTspOI05mJw','https://drive.google.com/drive/folders/1dY48TjXgDmaUv2bhEAxd00VgoOYspnJ-?usp=drive_link']);assert.ok(links.every(l=>l.rel.includes('noopener')&&l.rel.includes('noreferrer')));
 for(const link of await p.locator('#escucha a[target="_blank"], #entrega a[target="_blank"]').all()){
  // Verify actual popup creation and destination. External authentication/playback are checked separately.
  await c.route('https://www.youtube.com/**',r=>r.fulfill({body:'Official destination',contentType:'text/html'}));
  await c.route('https://drive.google.com/**',r=>r.fulfill({body:'Official destination',contentType:'text/html'}));
  const [popup]=await Promise.all([p.waitForEvent('popup'),link.click()]);await popup.waitForLoadState();assert.equal(popup.url(),await link.getAttribute('href'));await popup.close();
 }
 await p.locator('.rap-ocultar').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('.rap-ocultar').getAttribute('aria-pressed'),'true');assert.ok((await p.locator('[data-forma]').allTextContents()).every(t=>t==='···'));
 await p.locator('.rap-ocultar').click();
 const all=[];let trios=0;
 for(let i=0;i<fragments.length;i++){
  await p.locator('#fragmentoActual').selectOption(String(i));
  const rendered=await p.locator('#letraFragmento .rap-linea').evaluateAll(es=>es.map(e=>{
   const clone=e.cloneNode(true);clone.querySelectorAll('.rap-trio').forEach(t=>{const f=[...t.querySelectorAll('.rap-forma')].map(e=>e.textContent);t.replaceWith(document.createTextNode(f[0]+' ('+f[1]+', '+f[2]+')'));});return clone.textContent;
  }));assert.deepEqual(rendered,fragments[i].lineas);all.push(...rendered);trios+=await p.locator('#letraFragmento .rap-trio').count();
  if(role==='alumno')for(const width of [1440,1024,768,390,320]){await p.setViewportSize({width,height:1000});await p.clock.runFor(30);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow fragment '+i+' '+width);assert.ok(await p.locator('#letraFragmento .rap-trio').evaluateAll(es=>es.every(e=>e.getBoundingClientRect().width<=e.parentElement.getBoundingClientRect().width)),'clipped trio '+i+' '+width);}
 }
 assert.match(all.join(' '),/I sneak \(snuck, snuck up\)/);assert.match(all.join(' '),/I get \(got, gotten\)/);assert.equal(trios,67);
 assert.ok(await p.getByRole('button',{name:'Siguiente →',exact:true}).isDisabled());
 await p.getByRole('button',{name:'← Anterior',exact:true}).click();assert.equal(await p.locator('#fragmentoActual').inputValue(),'12');
 await p.locator('#fragmentoActual').focus();await p.keyboard.press('Home');assert.equal(await p.locator('#fragmentoActual').inputValue(),'0');
 await p.locator('.rap-ocultar').click();await p.reload();await p.waitForSelector('#fragmentoActual');assert.equal(await p.locator('.rap-ocultar').getAttribute('aria-pressed'),'false');assert.equal(await p.locator('#fragmentoActual').inputValue(),'0');
 if(role==='alumno'&&process.env.QA_IMAGES){for(const width of [1440,1024,390,320]){await p.setViewportSize({width,height:1000});await p.clock.runFor(30);await p.screenshot({path:process.env.QA_IMAGES+'-rap-'+width+'.png',fullPage:true});}}
 // RAP Team adds an isolated rehearsal layer to the original five school steps.
 assert.deepEqual(await p.locator('.rap-pasos a').evaluateAll(es=>es.map(e=>e.getAttribute('href'))),['#escucha','#practica','#aprende','#rap-team','#graba','#entrega']);
 const sectionOrder=await p.locator('main > section').evaluateAll(es=>es.map(e=>e.id));assert.ok(sectionOrder.indexOf('aprende')<sectionOrder.indexOf('rap-team')&&sectionOrder.indexOf('rap-team')<sectionOrder.indexOf('graba'));
 const sourceTrios=await p.evaluate(async()=>{const {FRAGMENTOS_RAP}=await import('/cursos/6to/plan-semanal/english-irregular-verbs-rap/rap-data.js');const {extraerTrios}=await import('/cursos/6to/plan-semanal/trios.js');return extraerTrios(FRAGMENTOS_RAP);});assert.equal(sourceTrios.length,67);
 await p.locator('[href="#rap-team"]').click();await p.locator('[data-team-modo="trio"]').click();
 assert.equal(await p.locator('.team-voz').count(),3);assert.deepEqual(await p.locator('.team-voz h3').allTextContents(),['Voz A','Voz B','Voz C']);assert.doesNotMatch(await p.locator('#rap-team').innerText(),/Gloria|protagonista|puntos|ranking|nota|aprobado/);
 await p.evaluate(()=>{window.qaTeamStorage=[];const set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){qaTeamStorage.push(k);return set.call(this,k,v);};window.qaTeamMedia=0;for(const name of ['AudioContext','MediaRecorder','SpeechRecognition','webkitSpeechRecognition'])window[name]=class{constructor(){window.qaTeamMedia++;throw Error('RAP Team must not request media');}};if(navigator.mediaDevices)navigator.mediaDevices.getUserMedia=async()=>{window.qaTeamMedia++;throw Error('media forbidden');};});
 const roles=[];for(let i=0;i<3;i++){roles.push(await p.locator('.team-papel').allTextContents());await p.locator('#teamRotar').click();}
 for(let voz=0;voz<3;voz++)assert.deepEqual(new Set(roles.map(r=>r[voz])),new Set(['Base','Past','Participle']));
 assert.deepEqual(await p.locator('.team-forma').allTextContents(),sourceTrios[0].formas);
 await p.locator('#teamOtroTrio').click();assert.deepEqual(await p.locator('.team-forma').allTextContents(),[sourceTrios[1].formas[1],sourceTrios[1].formas[2],sourceTrios[1].formas[0]]);
 await p.locator('#teamSeleccionResumen').click();await p.locator('#teamFragmento').selectOption('0');await p.locator('#teamTrio').selectOption('0');await p.locator('#teamSeleccionResumen').click();
 const mode=async name=>{await p.locator('[data-team-modo="'+name+'"]').click();assert.equal(await p.locator('.team-panel:visible').count(),1);};
 const snap=async name=>{if(!process.env.QA_IMAGES||role!=='alumno')return;for(const width of [1440,390]){await p.setViewportSize({width,height:1000});await p.clock.runFor(50);await p.locator('#rap-team').screenshot({path:process.env.QA_IMAGES+'-team-'+name+'-'+width+'.png'});}};
 await snap('trio');await p.locator('#teamRotar').click();await snap('rotacion');
 await mode('ritmo');assert.equal(await p.locator('.team-pulso.is-active').count(),0);assert.ok(await p.locator('#teamPulsoParar').isDisabled());
 for(let i=0;i<4;i++){await p.locator('#teamPulsoManual').click();assert.equal(await p.locator('.team-pulso.is-active').getAttribute('data-pulso'),String(i));}
 await p.locator('#teamPulsoInicio').click();assert.equal(await p.locator('.team-pulso.is-active').getAttribute('data-pulso'),'0');await p.clock.runFor(900);assert.equal(await p.locator('.team-pulso.is-active').getAttribute('data-pulso'),'1');await p.locator('#teamPulsoParar').click();await p.clock.runFor(2000);assert.equal(await p.locator('.team-pulso.is-active').count(),0);await p.locator('#teamPulsoManual').click();await snap('ritmo');
 await p.locator('#teamPulsoInicio').click();await mode('respuesta');await p.clock.runFor(1000);assert.equal(await p.locator('.team-pulso.is-active').count(),0);
 await p.locator('#teamCuenta').click();assert.equal(await p.locator('#teamLlamada').innerText(),'3');await p.clock.runFor(1000);assert.equal(await p.locator('#teamLlamada').innerText(),'2');await p.locator('#teamCuentaParar').click();await p.clock.runFor(3000);assert.equal(await p.locator('#teamLlamada').innerText(),'¿Preparadas?');assert.ok(await p.locator('#teamComprobar').isDisabled());
 await p.locator('#teamCuenta').click();await p.clock.runFor(2000);assert.equal(await p.locator('#teamLlamada').innerText(),'1');if(process.env.QA_IMAGES&&role==='alumno')await p.locator('#teamLlamada').screenshot({path:process.env.QA_IMAGES+'-team-cuenta.png'});await p.clock.runFor(1000);assert.match(await p.locator('#teamLlamada').innerText(),/take/i);assert.ok(await p.locator('#teamSolucion').isHidden());await p.locator('#teamComprobar').click();assert.equal(await p.locator('#teamSolucion').innerText(),sourceTrios[0].formas.join(' → '));await snap('respuesta');await p.locator('#teamRespuestaSiguiente').click();assert.ok(await p.locator('#teamSolucion').isHidden());
 await mode('random');assert.ok(await p.locator('#teamRevelar').isDisabled());let previous=null;
 for(let i=0;i<12;i++){await p.locator('#teamSorpresa').click();assert.deepEqual((await p.locator('#teamAzar strong').allTextContents()).slice(1),['?','?']);await p.locator('#teamRevelar').click();const forms=await p.locator('#teamAzar strong').allTextContents();assert.ok(sourceTrios.some(t=>JSON.stringify(t.formas)===JSON.stringify(forms)));assert.notEqual(JSON.stringify(forms),previous);previous=JSON.stringify(forms);}
 await snap('random');await p.locator('#teamSorpresa').click();await snap('sorpresa');
 await mode('retos');const retoAntes=await p.locator('#teamReto').innerText();await p.locator('#teamNuevoReto').click();assert.notEqual(await p.locator('#teamReto').innerText(),retoAntes);await snap('retos');
 await mode('ensayo');assert.equal(await p.locator('.team-guia li').count(),7);assert.equal(await p.locator('#teamVideo').getAttribute('href'),links[0].href);assert.ok(await p.locator('#teamCelebracion').isHidden());await snap('ensayo');await p.locator('#teamReady').click();assert.match(await p.locator('#teamCelebracion').innerText(),/RAP TEAM READY/);assert.doesNotMatch(await p.locator('#teamCelebracion').innerText(),/entregado|terminado|dominado|aprobado/);await snap('ready');
 if(role==='alumno'){
  for(const width of [1440,1024,768,390,320]){await p.setViewportSize({width,height:1000});for(const id of ['trio','ritmo','respuesta','random','retos','ensayo']){await mode(id);await p.clock.runFor(40);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Team overflow '+id+' '+width);const buttons=await p.locator('#rap-team button:visible').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().height));assert.ok(buttons.every(h=>h>=44),'touch target '+width);if(id==='trio'){const b=await p.locator('.team-voz').evaluateAll(es=>es.map(e=>{const b=e.getBoundingClientRect();return {width:b.width,height:b.height,top:b.top};}));assert.ok(b.every(v=>Math.abs(v.width-b[0].width)<1&&v.height===b[0].height&&v.top===b[0].top));assert.ok(await p.locator('.team-forma').evaluateAll(es=>es.every(e=>e.scrollWidth<=e.clientWidth)));}}}
  // Every school form fits the three equal voices and random cells, including snuck up/forgotten.
  await mode('trio');await p.locator('#teamSeleccionResumen').click();for(let f=0;f<14;f++){await p.locator('#teamFragmento').selectOption(String(f));const options=await p.locator('#teamTrio option').evaluateAll(es=>es.map(e=>e.value));for(const value of options){await p.locator('#teamTrio').selectOption(value);assert.ok(await p.locator('.team-forma').evaluateAll(es=>es.every(e=>e.scrollWidth<=e.clientWidth)));assert.equal(await p.locator('#teamLinea').textContent(),sourceTrios[Number(value)].linea);}}
  await p.emulateMedia({reducedMotion:'reduce'});await mode('trio');await p.locator('#teamRotar').click();assert.equal(await p.locator('.team-voces').evaluate(e=>getComputedStyle(e).animationName),'none');await mode('ensayo');await p.locator('#teamReady').click();assert.equal(await p.locator('#teamCelebracion').evaluate(e=>getComputedStyle(e).animationName),'none');
  await mode('ritmo');await p.locator('#teamPulsoManual').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('.team-pulso.is-active').count(),1);assert.equal(await p.locator('.team-pulso.is-active').evaluate(e=>getComputedStyle(e).transform),'none');await p.locator('#teamPulsoInicio').click();await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});await p.clock.runFor(2000);assert.equal(await p.locator('.team-pulso.is-active').count(),0);await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));});
 }
 if(role==='alumno'){await validarAyudas(p);await validarStudio(p);}
 assert.equal(await p.evaluate(()=>qaTeamMedia),0);assert.deepEqual(await p.evaluate(()=>qaTeamStorage.filter(k=>!["academia.personaActivaId","academia.personaActivaUserId","academia.navegacion.historial.v1"].includes(k))),[]);await p.reload();await p.waitForSelector('#teamRotar');assert.deepEqual(await p.locator('.team-papel').allTextContents(),['Base','Past','Participle']);assert.deepEqual(await p.locator('.team-forma').allTextContents(),sourceTrios[0].formas);assert.ok(await p.locator('#teamCelebracion').isHidden());assert.equal(await p.locator('.team-pulso.is-active').count(),0);
 assert.equal(await p.evaluate(()=>window.qaWrites||0),0);assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.qaDB)),before);
 await p.locator('[data-nav-volver]').click();await p.waitForSelector('.plan-tarjeta');assert.equal(new URL(p.url()).pathname.replace(/index.html$/,''),portal);
 await p.goto(base+ficha);await p.waitForSelector('#fragmentoActual');await p.locator('.rap-pasos a[href="#entrega"]').click();await p.locator('[data-nav-volver]').click();await p.waitForSelector('.plan-tarjeta');assert.equal(new URL(p.url()).pathname.replace(/index.html$/,''),portal);
 await p.goto(base+'/cursos/6to/english/');await p.waitForSelector('.portal-tema');assert.equal(await p.locator('.portal-tema').count(),2);assert.doesNotMatch((await p.locator('.portal-tema').allTextContents()).join(' '),/Irregular/);
 assert.deepEqual(errors,[]);await c.close();
}
await b.close();console.log('OK: RAP Team A–F, igualdad/rotación, fuente única, azar/revelado, pulso/contador/cancelación, retos/ensayo/celebración, cero medios/persistencia, recarga, reduced-motion/teclado y responsive; RAP, 94 líneas/67 tríos/14 fragmentos fieles, enlaces/nuevas pestañas, nombre/fecha/grupo, teclado, ocultar/mostrar/recarga, calendario/portal, Volver, English sin nuevo Tema y 0 escrituras educativas en 3 roles; responsive 320–1440. Identidad/SDK y aperturas externas simulados.');
})().catch(e=>{console.error(e);process.exit(1)});


// Contract tests use a controlled Web Speech API. Actual native audio is audited separately.
async function validarAyudas(p){
 await p.addInitScript(()=>{
  window.qaSpeech=[];window.qaCancels=0;window.qaVoices=[{name:'Español',lang:'es-ES'},{name:'English US',lang:'en-US'},{name:'English GB',lang:'en-GB'}];
  window.SpeechSynthesisUtterance=class extends EventTarget{constructor(text){super();this.text=text;}};
  const api=new EventTarget();api.getVoices=()=>qaVoices;api.speak=u=>{qaSpeech.push(u);};api.cancel=()=>{qaCancels++;window.qaCancelTras=qaSpeech.length;};
  Object.defineProperty(window,'speechSynthesis',{configurable:true,value:api});
 });
 await p.reload();await p.waitForSelector('#teamEmpezar');
 await p.evaluate(()=>{window.qaTeamStorage=[];const set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){qaTeamStorage.push(k);return set.call(this,k,v);};window.qaTeamMedia=0;for(const name of ['AudioContext','MediaRecorder','SpeechRecognition','webkitSpeechRecognition'])window[name]=class{constructor(){window.qaTeamMedia++;throw Error('RAP Team must not request media');}};if(navigator.mediaDevices)navigator.mediaDevices.getUserMedia=async()=>{window.qaTeamMedia++;throw Error('media forbidden');};});
 assert.ok(await p.locator('#teamComo').getAttribute('open')!==null);assert.equal(await p.locator('.team-modo-texto small').count(),6);assert.equal(await p.evaluate(()=>qaSpeech.length),0);
 await p.locator('#teamEmpezar').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('#teamComo').getAttribute('open'),null);assert.equal(await p.evaluate(()=>document.activeElement.className),'team-voces');
 const datos=await p.evaluate(async()=>{const{FRAGMENTOS_RAP:f}=await import('/cursos/6to/plan-semanal/english-irregular-verbs-rap/rap-data.js');const{extraerTrios}=await import('/cursos/6to/plan-semanal/trios.js');const{SIGNIFICADOS_RAP:s,FAMILIAS_RAP:g}=await import('/cursos/6to/plan-semanal/english-irregular-verbs-rap/rap-ayudas-data.js');return {f,t:extraerTrios(f),s,g};});
 assert.equal(Object.keys(datos.s).length,67);assert.deepEqual(new Set(Object.keys(datos.s)),new Set(datos.t.map(t=>t.formas[0].toLowerCase())));assert.equal(datos.g.length,14);assert.equal(datos.g.filter(g=>g.indices).length,9);
 for(let f=0;f<14;f++){const g=datos.g[f],ts=datos.t.filter(t=>t.fragmentoIndice===f);if(g.indices){assert.ok(g.indices.length>=3);assert.ok(g.indices.every(i=>ts[i]));}assert.ok(g.nota);}
 const play=async selector=>{const n=await p.evaluate(()=>qaSpeech.length);await p.locator(selector).click();assert.equal(await p.evaluate(()=>qaSpeech.length),n+1);const u=await p.evaluate(()=>{const u=qaSpeech.at(-1);return{text:u.text,rate:u.rate,lang:u.lang,voice:u.voice.name};});assert.equal(u.lang,'en-GB');assert.equal(u.voice,'English GB');assert.ok(await p.evaluate(()=>qaCancelTras<qaSpeech.length),'una escucha nueva no se cancela por bubbling');return u;};
 const finish=()=>p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('end')));
 assert.equal((await play('.team-card-audio[data-voz-indice="0"]')).text,'take');await finish();assert.match(await p.locator('#teamVozEstado').innerText(),/terminada/);
 await p.locator('#teamRotar').click();assert.equal((await play('.team-card-audio[data-voz-indice="0"]')).text,'took');await finish();
 assert.equal((await play('[data-team-audio="trio"]')).text,'take. took. taken');await finish();
 await p.locator('#teamVelocidad').selectOption('despacio');assert.equal((await play('[data-team-audio="trio"]')).rate,.8);await finish();await p.locator('#teamVelocidad').selectOption('normal');
 assert.equal(await p.locator('#teamLinea').count(),1);assert.equal(await p.locator('#teamLinea').textContent(),datos.t[0].linea);assert.ok(await p.locator('#teamFrase').isVisible());
 await p.locator('[data-team-modo="ritmo"]').click();assert.ok(await p.locator('#teamFrase').isVisible());assert.equal(await p.locator('#teamLinea').textContent(),datos.t[0].linea);await p.locator('[data-team-modo="trio"]').click();
 const frase=await play('[data-team-audio="linea"]');assert.match(frase.text,/take, took, taken/);assert.doesNotMatch(frase.text,/[()]/);await finish();
 assert.equal(await p.locator('#teamSignificado').getAttribute('open'),null);await p.locator('#teamSignificado summary').click();assert.match(await p.locator('#teamGlosa').innerText(),/tomar|coger/);
 assert.equal(await p.locator('#teamFamilia').getAttribute('open'),null);await p.locator('#teamFamilia summary').click();assert.equal(await p.locator('#teamPalabrasFamilia').innerText(),'take · shake · Wake');
 await p.locator('[data-team-paso="1"]').click();assert.deepEqual(await p.locator('#teamCadena p').allTextContents(),datos.t.slice(0,3).map(t=>t.formas.join(' → ')));assert.match((await play('[data-team-audio="cadena"]')).text,/take, took, taken.*shake, shook, shaken.*Wake, woke, woken/);await finish();
 await p.locator('[data-team-paso="2"]').click();assert.deepEqual(await p.locator('#teamFragmentoLetra p').allTextContents(),datos.f[0].lineas);await play('[data-team-audio="fragmento"]');await finish();
 const imagen=async nombre=>{if(process.env.QA_IMAGES)await p.locator('#rap-team').screenshot({path:process.env.QA_IMAGES+'-ayudas-'+nombre+'.png'});};
 for(const width of [1440,1024,768,390,320]){
  await p.setViewportSize({width,height:1000});await p.locator('[data-team-modo="trio"]').click();if(await p.locator('#teamSignificado').getAttribute('open')===null)await p.locator('#teamSignificado summary').click();if(await p.locator('#teamFamilia').getAttribute('open')===null)await p.locator('#teamFamilia summary').click();await p.locator('[data-team-paso="2"]').click();await p.clock.runFor(40);
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'ayudas overflow '+width);
  assert.ok(await p.locator('#rap-team button:visible,#rap-team summary:visible,#rap-team select:visible').evaluateAll(es=>es.every(e=>e.getBoundingClientRect().height>=44)),'help targets '+width);
  if([1440,390,320].includes(width))await imagen('rap-'+width);
 }
 // Stop and stale completion, actual context changes, and deferred voice availability.
 await play('[data-team-audio="fragmento"]');await p.locator('#teamVozParar').click();assert.match(await p.locator('#teamVozEstado').innerText(),/detenida/);await finish();assert.match(await p.locator('#teamVozEstado').innerText(),/detenida/);
 for(const action of ['material','modo','oculta','salir']){
  await p.locator('[data-team-modo="trio"]').click();await play('[data-team-audio="trio"]');const n=await p.evaluate(()=>qaCancels);
  if(action==='material')await p.locator('#teamOtroTrio').click();
  if(action==='modo')await p.locator('[data-team-modo="ritmo"]').click();
  if(action==='oculta')await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));Object.defineProperty(document,'hidden',{configurable:true,value:false});});
  if(action==='salir')await p.evaluate(()=>window.dispatchEvent(new Event('pagehide')));
  assert.ok(await p.evaluate(()=>qaCancels)>n,action+' cancels');assert.ok(await p.locator('#teamVozParar').isDisabled());
 }
 await p.locator('[data-team-modo="respuesta"]').click();assert.ok(await p.locator('.team-learning').isHidden());await p.locator('#teamCuenta').click();await p.clock.runFor(3000);assert.ok(await p.locator('.team-learning').isVisible());assert.ok(await p.locator('[data-team-audio="trio"]').isHidden());assert.equal(await p.locator('[data-forma-indice]:visible').count(),1);assert.ok(await p.locator('#teamFrase').isHidden());assert.equal(await p.locator('#teamLinea').textContent(),'');await p.locator('#teamComprobar').click();assert.ok(await p.locator('[data-team-audio="trio"]').isVisible());assert.ok(await p.locator('#teamFrase').isVisible());assert.ok((await p.locator('#teamLinea').textContent()).length>0);
 await p.locator('[data-team-modo="random"]').click();await p.locator('#teamSorpresa').click();assert.ok(await p.locator('[data-team-audio="trio"]').isHidden());assert.ok(await p.locator('#teamFrase').isHidden());assert.equal(await p.locator('#teamLinea').textContent(),'');await p.locator('#teamRevelar').click();assert.ok(await p.locator('[data-team-audio="trio"]').isVisible());assert.ok(await p.locator('#teamFrase').isVisible());
 await p.locator('[data-team-modo="trio"]').click();await p.evaluate(()=>{qaVoices=[{name:'Español',lang:'es-ES'}];speechSynthesis.dispatchEvent(new Event('voiceschanged'));});assert.ok(await p.locator('.team-card-audio').first().isDisabled());assert.match(await p.locator('#teamVozEstado').innerText(),/No hay una voz inglesa/);await p.locator('#teamOtroTrio').click();await p.locator('#teamSignificado summary').click();assert.ok((await p.locator('#teamGlosa').innerText()).length>0);await imagen('sin-voz');
 await p.evaluate(()=>{qaVoices=[{name:'English US',lang:'en-US'}];speechSynthesis.dispatchEvent(new Event('voiceschanged'));});await p.locator('.team-card-audio').first().click();assert.equal(await p.evaluate(()=>qaSpeech.at(-1).lang),'en-US');await p.evaluate(()=>{const e=new Event('error');e.error='synthesis-failed';qaSpeech.at(-1).dispatchEvent(e);});assert.match(await p.locator('#teamVozEstado').innerText(),/No se pudo reproducir/);
 // Optional voice argument does not change existing Spanish/default callers.
 const compat=await p.evaluate(async()=>{const{LectorTexto}=await import('/compartido/js/lector-texto.js?v=2');LectorTexto.escuchar('El viaje de la nutrición');const u=qaSpeech.at(-1);return{lang:u.lang,rate:u.rate,voice:u.voice??null};});assert.deepEqual(compat,{lang:'es-ES',rate:.84,voice:null});
 await p.locator('#teamComo summary').click();assert.ok(await p.locator('#teamEmpezar').isVisible());await imagen('entrada');
 console.log('OK ayudas: onboarding, 67 glosas/14 clasificaciones, audio mock en-GB/en-US, velocidad/cancelación/error/no voz, significado, 9 grupos y progresión de fuente, revelado sin adelantar respuesta, 320–1440/teclado/targets, compatibilidad LectorTexto español.');
}

// Audio de contrato controlado: comprueba programación/cancelación, no escucha humana.
async function validarStudio(p) {
 await p.addInitScript(()=>{
  window.qaAudio={creados:0,inicios:[],paradas:0,resume:0,suspend:0,ganancias:[]};window.qaSpeech=[];window.qaCancels=0;window.qaTeamMedia=0;window.qaTeamStorage=[];
  const set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){qaTeamStorage.push(k);return set.call(this,k,v);};
  window.SpeechSynthesisUtterance=class extends EventTarget{constructor(text){super();this.text=text;}};
  const speech=new EventTarget();speech.getVoices=()=>[{name:'English GB',lang:'en-GB'}];speech.speak=u=>qaSpeech.push(u);speech.cancel=()=>qaCancels++;Object.defineProperty(window,'speechSynthesis',{configurable:true,value:speech});
  const node=()=>({connect(){},disconnect(){},start(t){qaAudio.inicios.push(t);},stop(){qaAudio.paradas++;},frequency:{value:0,setValueAtTime(){},exponentialRampToValueAtTime(){}},gain:{setValueAtTime(v){qaAudio.ganancias.push(v);},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){},setTargetAtTime(v){qaAudio.ganancias.push(v);}}});
  window.AudioContext=class{constructor(){qaAudio.creados++;this.state='suspended';this.sampleRate=44100;this.destination={};}get currentTime(){return performance.now()/1000;}async resume(){qaAudio.resume++;if(window.qaAudioFalla)throw Error('audio unavailable');this.state='running';}async suspend(){qaAudio.suspend++;this.state='suspended';}createGain(){return node();}createOscillator(){return node();}createBufferSource(){return node();}createBiquadFilter(){return node();}createDynamicsCompressor(){return {...node(),threshold:{},knee:{},ratio:{},attack:{},release:{}};}createBuffer(c,l){return{getChannelData:()=>new Float32Array(l)};}};
  for(const name of ['MediaRecorder','SpeechRecognition','webkitSpeechRecognition'])window[name]=class{constructor(){qaTeamMedia++;throw Error('forbidden');}};
  if(navigator.mediaDevices)navigator.mediaDevices.getUserMedia=async()=>{qaTeamMedia++;throw Error('forbidden');};
 });
 await p.reload();await p.waitForSelector('[data-studio-parte]');await p.clock.install({time:new Date('2026-10-31T12:00:00Z')});
 const datos=await p.evaluate(async()=>{const{FRAGMENTOS_RAP:f}=await import('/cursos/6to/plan-semanal/english-irregular-verbs-rap/rap-data.js');const{crearPartesRap,pistaLineaRap}=await import('/cursos/6to/plan-semanal/english-irregular-verbs-rap/rap-studio-data.js');return{f,partes:crearPartesRap(f),pistas:crearPartesRap(f).map(p=>p.lineas.map(pistaLineaRap))};});
 assert.deepEqual(datos.partes.map(x=>x.trios.length),[15,31,21]);assert.deepEqual(datos.partes.flatMap(x=>x.lineas),datos.f.flatMap(f=>f.lineas));
 assert.deepEqual(datos.partes.map(p=>p.inicio),['The microphone I take (took, taken).','Shoot (shot, shot)—','Never quit (quit, quit).']);
 assert.deepEqual(datos.partes.map(p=>p.final),['Begin (began, begun).','When I spit (spat, spat),','Now I go (went, gone).']);
 assert.equal(datos.partes.flatMap(p=>p.trios).length,67);assert.equal(await p.locator('.studio-conteo').allTextContents().then(x=>x.join('/')),'15 tríos/31 tríos/21 tríos');
 assert.equal(await p.evaluate(()=>qaAudio.creados),0);assert.equal(await p.evaluate(()=>qaSpeech.length),0);assert.ok(await p.locator('#studioEnsayo').isHidden());
 await p.locator('[data-team-modo="ensayo"]').click();await p.locator('#team-ensayo a[href="#graba"]').click();assert.equal(new URL(p.url()).hash,'#graba');
 const elegir=async i=>{await p.locator('[data-studio-parte="'+i+'"]').click();assert.equal(await p.locator('#studioParteTitulo').evaluate(e=>document.activeElement===e),true);};
 const texto=()=>p.locator('#studioLetra .rap-linea').evaluateAll(es=>es.map(e=>{const c=e.cloneNode(true);c.querySelectorAll('.rap-trio').forEach(t=>{const f=[...t.querySelectorAll('.rap-forma')].map(e=>e.textContent);t.replaceWith(document.createTextNode(`${f[0]} (${f[1]}, ${f[2]})`));});return c.textContent;}));
 for(let i=0;i<3;i++){
  await elegir(i);assert.deepEqual(await texto(),datos.partes[i].lineas);assert.equal(await p.locator('#studioInicioToma').textContent(),datos.partes[i].inicio);assert.equal(await p.locator('#studioFinalToma').textContent(),datos.partes[i].final);
  assert.equal(await p.locator('#studioVideo').getAttribute('href'),'https://www.youtube.com/watch?v=NTspOI05mJw');
  await p.locator('[data-studio-apoyo="pistas"]').click();assert.deepEqual(await p.locator('#studioLetra .rap-linea').allTextContents(),datos.pistas[i]);
  await p.locator('[data-studio-apoyo="sin"]').click();assert.equal(await p.locator('#studioLetra .rap-linea').count(),0);assert.doesNotMatch(await p.locator('#studioLetra').innerText(),/puntos|dominio|porcentaje/);
  await p.getByRole('button',{name:'👀 Recuperar texto completo',exact:true}).click();assert.deepEqual(await texto(),datos.partes[i].lineas);assert.equal(await p.locator('[data-studio-apoyo="completo"]').getAttribute('aria-pressed'),'true');
  const desde=await p.evaluate(()=>qaSpeech.length);await p.locator('#studioParteAudio').click();
  for(let n=0;n<datos.partes[i].lineas.length;n++){
   const esperado=datos.partes[i].lineas[n].replace(/([A-Za-z]+) \(([^,]+), ([^)]+)\)/g,'$1, $2, $3');
   assert.equal(await p.evaluate(()=>qaSpeech.at(-1).text),esperado);
   await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('end')));
  }
  assert.equal(await p.evaluate(()=>qaSpeech.length),desde+datos.partes[i].lineas.length);assert.ok(await p.locator('#studioVozParar').isDisabled());
  await p.locator('[data-studio-apoyo="sin"]').click();await p.locator('#studioParteAudio').click();const cancelN=await p.evaluate(()=>qaSpeech.length);await p.locator('#studioVozParar').click();await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('end')));assert.equal(await p.evaluate(()=>qaSpeech.length),cancelN);await p.locator('[data-studio-apoyo="completo"]').click();

 }
 await p.evaluate(()=>qaSpeech=[]);
 await p.locator('#studioRelevos summary').click();
 for(let i=0;i<2;i++){
  assert.match(await p.locator('.studio-relevo').nth(i).innerText(),i===0?/Begin.*Shoot/s:/spit.*Never\s+quit/s);
  await p.locator('[data-studio-relevo="'+i+'"]').click();assert.equal(await p.locator('[data-studio-cuenta="'+i+'"]').innerText(),'3');await p.clock.runFor(1000);assert.equal(await p.locator('[data-studio-cuenta="'+i+'"]').innerText(),'2');await p.clock.runFor(2000);assert.equal(await p.locator('[data-studio-cuenta="'+i+'"]').innerText(),`¡Entra Parte ${i+2}!`);
 }
 await p.locator('[data-studio-relevo="0"]').click();await p.locator('#studioCuentaParar').click();await p.clock.runFor(4000);assert.equal(await p.locator('[data-studio-cuenta="0"]').innerText(),'');
 // Reusing Team's forms/glosses/rhymes opens the right first trio, not a second bank.
 await p.locator('#studioTeam').click();assert.deepEqual(await p.locator('.team-forma').allTextContents(),datos.partes[2].trios[0].formas);assert.equal(await p.locator('[data-team-modo="trio"]').getAttribute('aria-pressed'),'true');
 await elegir(0);
 const start=async()=>{await p.locator('#studioBeatInicio').click();await p.clock.runFor(100);assert.ok(await p.locator('#studioBeatParar').isEnabled());};
 await start();assert.equal(await p.evaluate(()=>qaAudio.creados),1);assert.match(await p.locator('#studioPulsoTexto').innerText(),/Entrada 1/);
 await p.clock.runFor(750);assert.match(await p.locator('#studioPulsoTexto').innerText(),/Entrada 2/);
 await p.clock.runFor(750);assert.match(await p.locator('#studioPulsoTexto').innerText(),/Entrada 3/);
 await p.clock.runFor(750);assert.match(await p.locator('#studioPulsoTexto').innerText(),/Entrada 4/);
 await p.clock.runFor(750);assert.match(await p.locator('#studioPulsoTexto').innerText(),/Pulso 1/);assert.ok(await p.evaluate(()=>qaAudio.inicios.length)>4);
 await p.locator('#studioVolumen').fill('100');assert.equal(await p.evaluate(()=>qaAudio.ganancias.at(-1)),1);await p.locator('#studioVolumen').fill('0');assert.equal(await p.evaluate(()=>qaAudio.ganancias.at(-1)),0);
 await p.locator('#studioBeatParar').click();const n=await p.evaluate(()=>qaAudio.inicios.length);await p.clock.runFor(2000);assert.equal(await p.evaluate(()=>qaAudio.inicios.length),n);assert.equal(await p.locator('.studio-pulsos .is-active').count(),0);assert.ok(await p.evaluate(()=>qaAudio.paradas)>0);
 await start();assert.equal(await p.evaluate(()=>qaAudio.creados),1);await elegir(1);assert.ok(await p.locator('#studioBeatParar').isDisabled());
 // Full-part queue is cancelled on error, part/section change, including late end.
 for(const accion of ['error','parte','seccion']){
  await p.locator('#studioParteAudio').click();const n=await p.evaluate(()=>qaSpeech.length);
  if(accion==='error')await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('error')));
  if(accion==='parte')await elegir(1);
  if(accion==='seccion')await p.locator('.rap-pasos a[href="#entrega"]').click();
  await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('end')));assert.equal(await p.evaluate(()=>qaSpeech.length),n,accion+' cancels whole part');if(await p.locator('#studioBeatParar').isEnabled())await p.locator('#studioBeatParar').click();
 }
 await p.evaluate(()=>qaSpeech=[]);
 // Explicit full-part accompaniment works in both orders with independent stops.
 await elegir(0);await p.locator('#studioParteAudio').click();assert.match(await p.locator('#studioBeatInicio').innerText(),/Añadir beat a la lectura/);
 const cantidad=await p.evaluate(()=>qaSpeech.length);await start();assert.ok(await p.locator('#studioVozParar').isEnabled());await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('end')));assert.equal(await p.evaluate(()=>qaSpeech.length),cantidad+1);assert.ok(await p.locator('#studioBeatParar').isEnabled());
 await p.locator('#studioBeatParar').click();assert.ok(await p.locator('#studioVozParar').isEnabled());await p.locator('#studioVozParar').click();
 await start();await p.locator('#studioParteAudio').click();assert.ok(await p.locator('#studioBeatParar').isEnabled());assert.ok(await p.locator('#studioVozParar').isEnabled());
 await p.locator('#studioVozParar').click();assert.ok(await p.locator('#studioBeatParar').isEnabled());const detenido=await p.evaluate(()=>qaSpeech.length);await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('end')));assert.equal(await p.evaluate(()=>qaSpeech.length),detenido);
 await p.locator('#studioParteAudio').click();for(let i=0;i<16;i++)await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('end')));assert.ok(await p.locator('#studioVozParar').isDisabled());assert.ok(await p.locator('#studioBeatParar').isEnabled());await p.locator('#studioBeatParar').click();
 for(const accion of ['parte','seccion','oculta','salir']){
  await elegir(0);await p.locator('#studioParteAudio').click();await start();const n=await p.evaluate(()=>qaSpeech.length);
  if(accion==='parte')await elegir(1);
  if(accion==='seccion')await p.locator('.rap-pasos a[href="#entrega"]').click();
  if(accion==='oculta')await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));Object.defineProperty(document,'hidden',{configurable:true,value:false});});
  if(accion==='salir')await p.evaluate(()=>window.dispatchEvent(new Event('pagehide')));
  await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('end')));assert.equal(await p.evaluate(()=>qaSpeech.length),n);assert.ok(await p.locator('#studioVozParar').isDisabled());assert.ok(await p.locator('#studioBeatParar').isDisabled());
 }
 await elegir(1);await p.evaluate(()=>qaSpeech=[]);
 // Mutual exclusion with pronunciation, including the shared Team voice.
 await start();await p.locator('[data-studio-audio]').first().click();assert.ok(await p.locator('#studioBeatParar').isDisabled());assert.equal(await p.evaluate(()=>qaSpeech.length),1);assert.match(await p.evaluate(()=>qaSpeech.at(-1).text),/Shoot, shot, shot/);
 const cancels=await p.evaluate(()=>qaCancels);await start();assert.ok(await p.evaluate(()=>qaCancels)>cancels);assert.ok(await p.locator('#studioVozParar').isDisabled());
 await p.evaluate(()=>document.dispatchEvent(new Event('rap:antes-voz')));assert.ok(await p.locator('#studioBeatParar').isDisabled());
 for(const action of ['oculta','salir','seccion','fuera']){
  await start();if(action==='oculta')await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));Object.defineProperty(document,'hidden',{configurable:true,value:false});});
  if(action==='salir')await p.evaluate(()=>window.dispatchEvent(new Event('pagehide')));
  if(action==='seccion')await p.locator('.rap-pasos a[href="#entrega"]').click();
  if(action==='fuera'){await p.locator('#escucha').scrollIntoViewIfNeeded();await p.waitForTimeout(200);}
  await p.clock.runFor(200);assert.ok(await p.locator('#studioBeatParar').isDisabled(),action);const before=await p.evaluate(()=>qaAudio.inicios.length);await p.clock.runFor(1000);assert.equal(await p.evaluate(()=>qaAudio.inicios.length),before);
 }
 // Stop during an unresolved resume: late resolution cannot restart the beat.
 await p.evaluate(()=>{const proto=AudioContext.prototype;window.qaResumeOriginal=proto.resume;proto.resume=function(){return new Promise(r=>{window.qaResumeLate=()=>{this.state='running';r();};});};});
 await p.locator('#studioBeatInicio').click();await p.waitForFunction(()=>!!window.qaResumeLate);await p.locator('#studioBeatParar').click();const lateN=await p.evaluate(()=>qaAudio.inicios.length);await p.evaluate(()=>{qaResumeLate();AudioContext.prototype.resume=qaResumeOriginal;});await p.clock.runFor(1000);assert.equal(await p.evaluate(()=>qaAudio.inicios.length),lateN);assert.ok(await p.locator('#studioBeatParar').isDisabled());
 // Relay can use the beat's pulse; a recording countdown stops the beat first.
 await elegir(0);await p.locator('#studioRelevos summary').click();await start();await p.locator('[data-studio-relevo="0"]').click();await p.clock.runFor(2300);assert.match(await p.locator('[data-studio-cuenta="0"]').innerText(),/Entra Parte 2/);
 await p.locator('#studioToma summary').click();await p.locator('#studioCuentaToma').click();assert.ok(await p.locator('#studioBeatParar').isDisabled());await p.clock.runFor(3000);assert.match(await p.locator('#studioTomaEstado').innerText(),/Empieza tu toma externa/);await p.locator('#studioCuentaToma').click();await p.locator('#studioTomaParar').click();await p.clock.runFor(4000);assert.equal(await p.locator('#studioTomaEstado').innerText(),'');
 // Fallback is useful with either a missing API or an engine that rejects resume.
 await p.addInitScript(()=>{if(sessionStorage.qaAudioAusente){window.AudioContext=undefined;window.webkitAudioContext=undefined;}window.qaAudioFalla=!!sessionStorage.qaAudioFalla;});
 for(const fallo of ['qaAudioFalla','qaAudioAusente']){
  await p.evaluate(k=>{sessionStorage[k]='1';},fallo);await p.reload();await p.waitForSelector('[data-studio-parte]');await elegir(0);assert.equal(await p.evaluate(()=>qaAudio.creados),0);await start();assert.match(await p.locator('#studioBeatEstado').innerText(),/Audio no disponible|pulso visual/);assert.match(await p.locator('#studioPulsoTexto').innerText(),/Entrada/);assert.ok(await p.locator('#studioVolumen').isDisabled());await p.locator('#studioBeatParar').click();await p.evaluate(k=>sessionStorage.removeItem(k),fallo);
 }
 await p.reload();await p.waitForSelector('[data-studio-parte]');assert.ok(await p.locator('#studioEnsayo').isHidden());assert.equal(await p.evaluate(()=>qaAudio.creados),0);
 // Female preference, explicit device selection and event-driven karaoke.
 const instalarVoces=vs=>p.evaluate(vs=>{speechSynthesis.getVoices=()=>vs;speechSynthesis.dispatchEvent(new Event('voiceschanged'));},vs);
 const voces=[{name:'Microsoft George',lang:'en-GB',voiceURI:'george'},{name:'Microsoft Sonia Online (Natural)',lang:'en-GB',voiceURI:'sonia'},{name:'Microsoft Aria',lang:'en-US',voiceURI:'aria'},{name:'Español',lang:'es-ES',voiceURI:'es'}];
 await instalarVoces(voces);await elegir(0);assert.equal(await p.locator('#studioVozSeleccion').inputValue(),'sonia');assert.match(await p.locator('#studioVozPreferida').innerText(),/femenina seleccionada/);assert.equal(await p.locator('#studioVozSeleccion option').count(),3);
 await p.locator('#studioParteAudio').click();assert.equal(await p.evaluate(()=>qaSpeech.at(-1).voice.name),voces[1].name);assert.equal(await p.evaluate(()=>qaSpeech.at(-1).rate),1.12);
 assert.equal(await p.locator('#studioLineaActual').innerText(),'');
 await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('start')));assert.equal(await p.locator('#studioLineaActual').innerText(),'The microphone I take, took, taken.');assert.equal(await p.locator('#studioLineaActual mark').count(),0);
 await p.evaluate(()=>{const u=qaSpeech.at(-1);window.qaAnterior=u;u.dispatchEvent(Object.assign(new Event('boundary'),{name:'word',charIndex:u.text.indexOf('take')}));});assert.equal(await p.locator('#studioLineaActual mark').innerText(),'take');
 await p.clock.runFor(1200);assert.equal(await p.locator('#studioLineaActual mark').innerText(),'take'); // no guessed timing
 await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('end')));assert.equal(await p.locator('#studioLineaActual').innerText(),'');await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('start')));assert.match(await p.locator('#studioLineaActual').innerText(),/^You shake/);
 await p.evaluate(()=>qaAnterior.dispatchEvent(Object.assign(new Event('boundary'),{name:'word',charIndex:0})));assert.match(await p.locator('#studioLineaActual').innerText(),/^You shake/);assert.equal(await p.locator('#studioLineaActual mark').count(),0);
 await p.locator('#studioVozParar').click();assert.ok(await p.locator('#studioSeguimiento').isHidden());await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(Object.assign(new Event('boundary'),{name:'word',charIndex:0})));assert.equal(await p.locator('#studioLineaActual').innerText(),'');
 await p.locator('#studioVozSeleccion').selectOption('aria');await p.locator('#studioLectura').selectOption('normal');await p.locator('#studioParteAudio').click();assert.equal(await p.evaluate(()=>qaSpeech.at(-1).voice.name),'Microsoft Aria');assert.equal(await p.evaluate(()=>qaSpeech.at(-1).rate),1);
 await p.locator('#studioVozSeleccion').selectOption('george');assert.ok(await p.locator('#studioVozParar').isDisabled());assert.ok(await p.locator('#studioSeguimiento').isHidden());
 await p.locator('#studioParteAudio').click();await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('start')));assert.equal(await p.locator('#studioLineaActual mark').count(),0);assert.ok((await p.locator('#studioLineaActual').innerText()).length>0); // provider without word events still follows real lines
 await instalarVoces([{name:'English GB QA',lang:'en-GB',voiceURI:'qa'}]);assert.ok(await p.locator('#studioVozParar').isDisabled());assert.match(await p.locator('#studioVozPreferida').innerText(),/no identifica/);await p.locator('#studioParteAudio').click();assert.equal(await p.evaluate(()=>qaSpeech.at(-1).voice.name),'English GB QA');await p.locator('#studioVozParar').click();
 await instalarVoces(voces);await p.locator('#studioLectura').selectOption('agil');await p.locator('[data-studio-apoyo="sin"]').click();assert.ok(!(await p.locator('#studioSeguir').isChecked()));await p.locator('#studioParteAudio').click();await p.evaluate(()=>qaSpeech.at(-1).dispatchEvent(new Event('start')));assert.ok(await p.locator('#studioSeguimiento').isHidden());await p.locator('#studioSeguir').check();assert.ok(await p.locator('#studioSeguimiento').isVisible());await p.locator('#studioVozParar').click();await instalarVoces([{name:'English GB',lang:'en-GB'}]);
 // All modes/relays/controls fit and remain keyboard operable at the required widths.
 for(const width of [1440,1024,768,390,320]){
  await p.setViewportSize({width,height:1000});await elegir(1);await p.locator('#studioRelevos summary').click();await p.locator('#studioToma summary').click();
  for(const apoyo of ['completo','pistas','sin']){await p.locator('[data-studio-apoyo="'+apoyo+'"]').click();assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Studio overflow '+width+' '+apoyo);assert.ok(await p.locator('#rapStudio button:visible,#rapStudio summary:visible,#rapStudio a:visible,#rapStudio input:visible,#rapStudio select:visible').evaluateAll(es=>es.every(e=>e.getBoundingClientRect().height>=44)),'Studio targets '+width);}
  await p.locator('[data-studio-apoyo="completo"]').click();if(process.env.QA_IMAGES){await p.locator('#rapStudio').screenshot({path:process.env.QA_IMAGES+'-studio-'+width+'.png'});}
 }
 await p.emulateMedia({reducedMotion:'reduce'});await p.locator('[data-studio-apoyo="sin"]').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('[data-studio-apoyo="sin"]').getAttribute('aria-pressed'),'true');assert.ok(await p.locator('[data-studio-apoyo="sin"]').evaluate(e=>getComputedStyle(e).outlineStyle!=='none'));
 await start();assert.ok(await p.locator('.studio-pulsos .is-active').evaluate(e=>getComputedStyle(e).transform==='none'));await p.locator('#studioBeatParar').click();
 assert.equal(await p.evaluate(()=>qaTeamMedia),0);assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
 // After identity setup, this session has no local/session/educational writes by Studio.
 const writes=await p.evaluate(()=>qaTeamStorage);assert.ok(writes.every(k=>['academia.personaActivaId','academia.personaActivaUserId','academia.navegacion.historial.v1'].includes(k)),JSON.stringify(writes));
 assert.doesNotMatch(await p.locator('#rapStudio').innerText(),/Gloria|Anaís|Lidia|ranking|puntuación|dominio|%/);
 console.log('OK Studio: 15/31/21=67, fuente íntegra y fronteras, tres apoyos, relevos/cuentas, beat mock/scheduler/parada/cancelación/resume tardío, acompañamiento explícito/paradas independientes y exclusión de pronunciación individual, fallback API/engine, no autoplay/medios/escrituras, vuelta a Team, teclado/reduced-motion y cinco anchos. No certifica escucha humana ni timestamps.');
}
