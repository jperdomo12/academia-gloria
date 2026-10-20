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
return {c,p,errors};}



const portal='/cursos/6to/plan-semanal/';
const ficha='/cursos/6to/science/nutricion/plan-semanal/';
for(const role of ['alumno','gestion','consulta']) {
 const {c,p,errors}=await entorno(role);
 await p.addInitScript(()=>{
   window.qaAudio=[];window.SpeechSynthesisUtterance=class extends EventTarget{constructor(text){super();this.text=text;}};
   Object.defineProperty(window,'speechSynthesis',{value:{cancel(){},speak(u){qaAudio.push({text:u.text,lang:u.lang});queueMicrotask(()=>u.dispatchEvent(new Event('end')));}}});
 });
 await p.clock.install({time:new Date('2026-10-20T18:00:00Z')});
 await p.goto(base+'/cursos/6to/');
 await p.waitForSelector('.nav-global');
 assert.deepEqual(await p.locator('#tituloAsignaturas, #tituloZonasCole, #tituloPlanSemanal, #tituloRecursosColegio').allTextContents(),['Mis asignaturas','Zonas del cole','Plan Semanal','Recursos del colegio']);
 await p.locator('a[href="./plan-semanal/"]').click();
 await p.waitForSelector('.plan-tarjeta');
 assert.equal(await p.locator('.plan-tarjeta').count(),1);
 assert.match(await p.locator('.plan-fecha').innerText(),/Esta semana.*19.*26.*octubre.*2026/);
 assert.match(await p.locator('.plan-tarjeta').innerText(),/Science · Nutrición/);
 if(role==='alumno') {
  const fechas=await p.evaluate(async()=>{
   const {MATERIALES_PLAN,organizarSemanas,fechaMadrid}=await import('/cursos/6to/plan-semanal/materiales.js');
   const a=MATERIALES_PLAN[0];
   const older={...a,id:'anterior',inicio:'2026-10-12',fin:'2026-10-18'};
   const future={...a,id:'futuro',inicio:'2026-10-27',fin:'2026-11-02'};
   return {start:organizarSemanas([a],'2026-10-19'),end:organizarSemanas([a],'2026-10-26'),after:organizarSemanas([a],'2026-10-27'),before:organizarSemanas([a],'2026-10-18'),all:organizarSemanas([future,older,a],'2026-10-20'),midnight:fechaMadrid(new Date('2026-10-19T22:30:00Z'))};
  });
  assert.equal(fechas.start.actuales.length,1);assert.equal(fechas.end.actuales.length,1);assert.equal(fechas.after.anteriores.length,1);assert.equal(fechas.before.proximas.length,1);assert.equal(fechas.midnight,'2026-10-20');assert.equal(fechas.all.actuales.length,1);assert.equal(fechas.all.anteriores.length,1);assert.equal(fechas.all.proximas.length,1);
 }
 await p.locator('.plan-tarjeta').click();
 await p.waitForSelector('#lecturaPlan');
 assert.equal(new URL(p.url()).pathname,ficha);
 assert.match(await p.locator('.plan-cuaderno').innerText(),/Haz primero esta actividad en tu cuaderno/);
 assert.equal(await p.locator('.plan-lectura-parrafo').count(),5);
 if(process.env.QA_IMAGES&&role==='alumno'){await p.setViewportSize({width:390,height:1000});await p.clock.runFor(60);await p.screenshot({path:process.env.QA_IMAGES+'-inicio-390.png',fullPage:true});}
 assert.match(await p.locator('.plan-lectura-parrafo').last().innerText(),/riñones.*vejiga.*uretra/);
 assert.equal(await p.locator('#bloque-vf > ol > li').count(),10);
 assert.equal(await p.locator('#bloque-abc > ol > li').count(),8);
 assert.equal(await p.locator('#bloque-abc > ol > li > ul > li').count(),24);
 assert.equal(await p.locator('#bloque-conectar > ol > li').count(),8);
 await p.getByRole('button',{name:'🔊 Escuchar',exact:true}).click();
 assert.equal(await p.evaluate(()=>qaAudio.at(-1).lang),'es-ES');
 assert.match(await p.evaluate(()=>qaAudio.at(-1).text),/El viaje de la nutrición/);
 assert.doesNotMatch(await p.evaluate(()=>qaAudio.at(-1).text),/Verdadero|Compara con tu cuaderno|aclaración de apoyo/);
 for(const id of ['vf','abc','conectar']) {
  const bloque=p.locator('#bloque-'+id);
  assert.equal(await bloque.getAttribute('open'),null);
  await bloque.locator('summary').click();
  const comprobar=bloque.getByRole('button',{name:'👀 Comprobar cuando termine'});
  assert.ok(await comprobar.isDisabled());assert.ok(await bloque.locator('.plan-soluciones').isHidden());
  await bloque.locator('input').check();assert.ok(await comprobar.isEnabled());
  await comprobar.click();assert.ok(await bloque.locator('.plan-soluciones').isVisible());
  assert.equal(await bloque.locator('.plan-soluciones ol > li').count(),id==='vf'?10:8);
  await bloque.locator('input').uncheck();assert.ok(await bloque.locator('.plan-soluciones').isHidden());
  await bloque.locator('input').check();await comprobar.click();
 }
 if(role==='alumno'){
  assert.match(await p.locator('#soluciones-vf').innerText(),/Falso.*boca/s);
  assert.match(await p.locator('#soluciones-abc').innerText(),/B\) En la boca/);
  assert.match(await p.locator('#soluciones-conectar').innerText(),/Tráquea → Sistema respiratorio/);
  for(const width of [1440,1024,768,390,320]) {
   await p.setViewportSize({width,height:1000});await p.clock.runFor(60);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'ficha overflow '+width);
   if(process.env.QA_IMAGES&&[1440,390].includes(width))await p.screenshot({path:process.env.QA_IMAGES+'-documento-'+width+'.png',fullPage:true});
  }
 }
 const before=await p.evaluate(()=>JSON.parse(localStorage.qaDB));
 assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
 await p.reload();await p.waitForSelector('#lecturaPlan');
 assert.equal(await p.locator('.plan-intento input:checked').count(),0);
 // Contextual back: document -> weekly portal -> course, never a back loop.
 await p.locator('[data-nav-volver]').click();await p.waitForSelector('.plan-tarjeta');
 assert.equal(new URL(p.url()).pathname,portal);
 if(role==='alumno') {
  for(const width of [1440,768,390,320]) {
   await p.setViewportSize({width,height:1000});await p.clock.runFor(60);
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'portal overflow '+width);
   if(process.env.QA_IMAGES&&[1440,390].includes(width))await p.screenshot({path:process.env.QA_IMAGES+'-portal-'+width+'.png',fullPage:true});
  }
  // Date rollover: old material remains accessible, collapsed; never mislabeled as current.
  await p.clock.setFixedTime(new Date('2026-10-28T12:00:00Z'));await p.reload();await p.waitForSelector('.plan-tarjeta',{state:'attached'});
  assert.match(await p.locator('#semanasPlan').innerText(),/Semanas anteriores/);
  assert.equal(await p.locator('details.plan-semana').count(),1);
  assert.equal(await p.locator('details.plan-semana').getAttribute('open'),null);
  assert.doesNotMatch(await p.locator('.plan-fecha').innerText(),/Esta semana/);
  await p.clock.setFixedTime(new Date('2026-10-20T12:00:00Z'));
 }
 await p.locator('[data-nav-volver]').click();assert.equal(new URL(p.url()).pathname,'/cursos/6to/');
 await p.locator('a[href="./science/"]').click();await p.waitForSelector('[data-tema-id="nutricion"]');
 assert.equal(await p.locator('.portal-tema').count(),2);
 await p.locator('[data-tema-id="nutricion"]').click();await p.waitForSelector('[data-plan-tema] a');
 assert.equal(await p.locator('[data-plan-tema] a').count(),1);
 await p.locator('[data-plan-tema] a').click();await p.waitForSelector('#lecturaPlan');
 await p.locator('[data-nav-volver]').click();await p.waitForSelector('[data-plan-tema] a');
 assert.equal(new URL(p.url()).pathname,'/cursos/6to/science/nutricion/');
 assert.equal(await p.evaluate(()=>sessionStorage.getItem('academia.personaActivaId')),'persona-alumno');
 assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
 assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.qaDB)),before);
 assert.deepEqual(errors,[]);
 await c.close();
}
const directo=await entorno('alumno');
await directo.p.addInitScript(()=>{delete window.speechSynthesis;delete window.SpeechSynthesisUtterance;});
await directo.p.goto(base+ficha);await directo.p.waitForSelector('#lecturaPlan');
assert.ok(await directo.p.getByRole('button',{name:'🔊 Escuchar',exact:true}).isDisabled());
assert.match(await directo.p.locator('.plan-estado').innerText(),/no dispone de lectura/);
await directo.p.locator('[data-nav-volver]').click();await directo.p.waitForSelector('[data-plan-tema] a');
assert.equal(new URL(directo.p.url()).pathname.replace(/index\.html$/,''),'/cursos/6to/science/nutricion/');
assert.deepEqual(directo.errors,[]);await directo.c.close();
await b.close();console.log('OK: Plan Semanal, semana Madrid/límites/cambio de fecha, 10 V/F + 8 A/B/C + 8 conexiones, cuaderno/revelado por bloque, voz solo lectura, retorno en ambos recorridos, Persona Activa, 0 escrituras educativas y responsive 320–1440; SDK/identidades/voz simulados.');
})().catch(e=>{console.error(e);process.exit(1)});
