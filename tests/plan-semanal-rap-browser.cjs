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
 assert.equal(await p.locator('.rap-pasos a').count(),5);
 assert.equal(await p.locator('time[datetime="2026-11-10"]').count(),2);
 assert.equal(await p.locator('.rap-filename').textContent(),'6A/B/C_WP_NAMES_RAP');
 assert.match(await p.locator('#graba').innerText(),/Solo.*En pareja.*En trío.*otras clases de 6.º/s);
 const links=await p.locator('a[target="_blank"]').evaluateAll(es=>es.map(e=>({href:e.href,rel:e.rel})));
 assert.deepEqual(links.map(l=>l.href),['https://www.youtube.com/watch?v=NTspOI05mJw','https://drive.google.com/drive/folders/1dY48TjXgDmaUv2bhEAxd00VgoOYspnJ-?usp=drive_link']);assert.ok(links.every(l=>l.rel.includes('noopener')&&l.rel.includes('noreferrer')));
 for(const link of await p.locator('a[target="_blank"]').all()){
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
  const rendered=await p.locator('.rap-linea').evaluateAll(es=>es.map(e=>{
   const clone=e.cloneNode(true);clone.querySelectorAll('.rap-trio').forEach(t=>{const f=[...t.querySelectorAll('.rap-forma')].map(e=>e.textContent);t.replaceWith(document.createTextNode(f[0]+' ('+f[1]+', '+f[2]+')'));});return clone.textContent;
  }));assert.deepEqual(rendered,fragments[i].lineas);all.push(...rendered);trios+=await p.locator('.rap-trio').count();
  if(role==='alumno')for(const width of [1440,1024,768,390,320]){await p.setViewportSize({width,height:1000});await p.clock.runFor(30);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow fragment '+i+' '+width);assert.ok(await p.locator('.rap-trio').evaluateAll(es=>es.every(e=>e.getBoundingClientRect().width<=e.parentElement.getBoundingClientRect().width)),'clipped trio '+i+' '+width);}
 }
 assert.match(all.join(' '),/I sneak \(snuck, snuck up\)/);assert.match(all.join(' '),/I get \(got, gotten\)/);assert.equal(trios,67);
 assert.ok(await p.getByRole('button',{name:'Siguiente →',exact:true}).isDisabled());
 await p.getByRole('button',{name:'← Anterior',exact:true}).click();assert.equal(await p.locator('#fragmentoActual').inputValue(),'12');
 await p.locator('#fragmentoActual').focus();await p.keyboard.press('Home');assert.equal(await p.locator('#fragmentoActual').inputValue(),'0');
 await p.locator('.rap-ocultar').click();await p.reload();await p.waitForSelector('#fragmentoActual');assert.equal(await p.locator('.rap-ocultar').getAttribute('aria-pressed'),'false');assert.equal(await p.locator('#fragmentoActual').inputValue(),'0');
 if(role==='alumno'&&process.env.QA_IMAGES){for(const width of [1440,1024,390,320]){await p.setViewportSize({width,height:1000});await p.clock.runFor(30);await p.screenshot({path:process.env.QA_IMAGES+'-rap-'+width+'.png',fullPage:true});}}
 assert.equal(await p.evaluate(()=>window.qaWrites||0),0);assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.qaDB)),before);
 await p.locator('[data-nav-volver]').click();await p.waitForSelector('.plan-tarjeta');assert.equal(new URL(p.url()).pathname.replace(/index.html$/,''),portal);
 await p.goto(base+ficha);await p.waitForSelector('#fragmentoActual');await p.locator('.rap-pasos a[href="#entrega"]').click();await p.locator('[data-nav-volver]').click();await p.waitForSelector('.plan-tarjeta');assert.equal(new URL(p.url()).pathname.replace(/index.html$/,''),portal);
 await p.goto(base+'/cursos/6to/english/');await p.waitForSelector('.portal-tema');assert.equal(await p.locator('.portal-tema').count(),2);assert.doesNotMatch((await p.locator('.portal-tema').allTextContents()).join(' '),/Irregular/);
 assert.deepEqual(errors,[]);await c.close();
}
await b.close();console.log('OK: RAP, 94 líneas/67 tríos/14 fragmentos fieles, enlaces/nuevas pestañas, nombre/fecha/grupo, teclado, ocultar/mostrar/recarga, calendario/portal, Volver, English sin nuevo Tema y 0 escrituras educativas en 3 roles; responsive 320–1440. Identidad/SDK y aperturas externas simulados.');
})().catch(e=>{console.error(e);process.exit(1)});
