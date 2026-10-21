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
await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:process.env.QA_FONT_CSS?require('fs').readFileSync(process.env.QA_FONT_CSS,'utf8'):'',contentType:'text/css'}));
if(process.env.QA_FONT_CSS){const css=require('fs').readFileSync(process.env.QA_FONT_CSS,'utf8');const urls=[...new Set([...css.matchAll(/url\(([^)]+)\)/g)].map(m=>m[1]))];for(let i=0;i<urls.length;i++)await p.route(urls[i],r=>r.fulfill({body:require('fs').readFileSync(require('path').join(require('path').dirname(process.env.QA_FONT_CSS),'sociales-font-'+i+'.ttf')),contentType:'font/ttf'}));}await p.route('https://unpkg.com/**',r=>r.fulfill({body:'window.lucide={createIcons(){}}',contentType:'text/javascript'}));
await p.route('**/firebase-firestore.js',r=>r.fulfill({body:sdk,contentType:'text/javascript'}));await p.route('https://www.gstatic.com/**/firebase-auth.js',r=>r.fulfill({body:'export const signOut=async()=>{};export const onAuthStateChanged=(auth,cb)=>{queueMicrotask(()=>cb(auth.currentUser));return()=>{};};',contentType:'text/javascript'}));
await p.route('**/compartido/firebase/firebase-config.js',r=>r.fulfill({body:"export const db={};export const auth={authStateReady:async()=>{},get currentUser(){return {uid:localStorage.qaActor,email:'prueba@example.invalid'}}};",contentType:'text/javascript'}));
await p.route('**/compartido/firebase/firebase-auth.js',r=>r.fulfill({body:'export const observarSesion=()=>()=>{};',contentType:'text/javascript'}));await p.route('**/registro-acceso.js',r=>r.fulfill({body:'export async function registrarAccesoAcademia(){}',contentType:'text/javascript'}));await p.route('**/timeout-sesion.js',r=>r.fulfill({body:'export async function activarTimeoutSesion(){}',contentType:'text/javascript'}));
return {c,p,errors};}



const slugs=['publicidad','dinero-ahorro-inversion','impuestos'];
const topic=slug=>'/cursos/6to/sociales/'+slug+'/';
const banks={};
const learner=await entorno('alumno');const p=learner.p;
await p.addInitScript(()=>{window.qaAudio=[];window.SpeechSynthesisUtterance=class extends EventTarget{constructor(text){super();this.text=text;}};Object.defineProperty(window,'speechSynthesis',{value:{cancel(){},speak(u){qaAudio.push({text:u.text,lang:u.lang});queueMicrotask(()=>u.dispatchEvent(new Event('end')));}}});});
const pendingAssets=[];p.on('response',r=>{if(r.status()>=400&&(/\/sociales\//.test(r.url())||r.url().includes('assets/imagenes/sociales/')))pendingAssets.push([r.status(),r.url()]);});
await p.goto(base+'/cursos/6to/');const courseLink=p.locator('a[href="./sociales/"]');assert.ok(await courseLink.isVisible());assert.match(await courseLink.innerText(),/Activa/i);assert.match(await p.locator('#tituloAsignaturas').locator('..').locator('..').innerText(),/Mis asignaturas/);
await courseLink.click();await p.waitForSelector('[data-tema-id="publicidad"]');assert.equal(await p.locator('.portal-tema').count(),3);assert.match(await p.locator('#contadorTemas').innerText(),/3 Temas activos/);
for(const width of [1440,768,390,320]){await p.setViewportSize({width,height:1000});await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'portal overflow '+width);if(process.env.QA_IMAGES&&[1440,390].includes(width))await p.screenshot({path:process.env.QA_IMAGES+'-portal-'+width+'.png',fullPage:true});}
assert.equal(await p.locator('.portal-recurso-oficial').count(),1);assert.match(await p.locator('.portal-recurso-oficial').getAttribute('href'),/sociales$/);
async function capture(page,name,width=1440){if(!process.env.QA_IMAGES)return;await page.setViewportSize({width,height:1000});await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await page.screenshot({path:process.env.QA_IMAGES+'-'+name+'-'+width+'.png',fullPage:true});}
async function responsive(page,tag){for(const width of [1440,1024,768,390,320]){await page.setViewportSize({width,height:1000});await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),tag+' overflow '+width);}}
async function complete(page,slug,wrong=false){
 const families=banks[slug].familias;
 await page.click('[data-pestana="prueba"]');await page.click('#botonIniciarPrueba');await page.waitForSelector('#pruebaOpciones .option');
 for(let i=0;i<families.length;i++){
  const e=await page.locator('#pruebaContenido .challenge__enunciado').innerText();const q=await page.locator('#pruebaContenido .challenge__pregunta').innerText();
  const v=families.flatMap(f=>f.variantes).find(v=>v.enunciado===e&&v.pregunta===q);assert.ok(v,'variante del banco');
  const pick=wrong&&v.bloqueId==='estrategias'?v.opciones.find(o=>o.id!==v.respuestaCorrecta).id:v.respuestaCorrecta;
  await page.click('#pruebaOpciones [data-opcion="'+pick+'"]');await page.click('#botonResponderPrueba');assert.ok(await page.locator('#explicacionPrueba').isVisible());await page.click('#botonResponderPrueba');
 }
 await page.waitForFunction(()=>!document.querySelector('#cierrePrueba').hidden&&!document.querySelector('#estadoGuardado').textContent.includes('Guardando'));
}
let firstPublicSession=null;
for(const slug of slugs){
 await p.goto(base+'/cursos/6to/sociales/');await p.waitForSelector('[data-tema-id="'+slug+'"]');await p.locator('[data-tema-id="'+slug+'"]').click();
 await p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Sesión de aprendizaje');
 assert.equal(new URL(p.url()).pathname,topic(slug));assert.match(new URL(p.url()).searchParams.get('volver'),/sociales\//);
 banks[slug]=await p.evaluate(async path=>{const d=await import(path);return {meta:d.META,bloques:d.BLOQUES_RESULTADO,practica:d.PRACTICA,familias:d.FAMILIAS_PRUEBA};},topic(slug)+'datos.js');
 await responsive(p,slug+' mapa');
 if(slug==='publicidad'){
  assert.ok(await p.locator('.ad-poster img').evaluate(e=>e.complete&&e.naturalWidth===579&&e.naturalHeight===842));
  assert.equal(await p.locator('.ad-legend li').count(),0);assert.equal(await p.locator('.ad-revelado:visible').count(),0);
  await p.selectOption('#parteAnuncio','slogan');await p.click('[data-zona-anuncio="emisor"]');assert.match(await p.locator('#respuestaAnuncio').innerText(),/Todavía no/);
  await p.click('#pistaAnuncio');assert.match(await p.locator('#respuestaAnuncio').innerText(),/frase breve/);
  await p.locator('[data-zona-anuncio="slogan"]').focus();await p.keyboard.press('Enter');assert.match(await p.locator('#respuestaAnuncio').innerText(),/Despierta/);
  for(const part of ['mensaje','destinatario','emisor']){await p.selectOption('#parteAnuncio',part);await p.click('[data-zona-anuncio="'+part+'"]');}
  assert.equal(await p.locator('.ad-legend li').count(),4);assert.equal(await p.locator('.ad-revelado:visible').count(),4);
  await p.fill('#explicacionAnuncio','Los alimentos y las palabras invitan a desayunar.');await p.click('#compararAnuncio');assert.ok(await p.locator('#modeloAnuncio').isVisible());
  await capture(p,'publicidad-identificado');await capture(p,'publicidad-identificado',390);
  await p.click('#reiniciarAnuncio');assert.equal(await p.locator('.ad-revelado:visible').count(),0);assert.ok(await p.locator('#compararAnuncio').isDisabled());
  await p.setViewportSize({width:320,height:1000});for(const pin of await p.locator('.ad-pin').all()){const bb=await pin.boundingBox();assert.ok(bb.width>=44&&bb.height>=44);}
  await p.click('[data-pestana="claves"]');await p.click('[data-escuchar-contenedor="#conceptosPublicidad"]');assert.equal(await p.evaluate(()=>qaAudio.at(-1).lang),'es-ES');assert.match(await p.evaluate(()=>qaAudio.at(-1).text),/departamento de publicidad/);
  await responsive(p,'publicidad conceptos');await capture(p,'publicidad-mensaje',390);
  await p.click('[data-pestana="material"]');assert.equal(await p.locator('.estrategia').count(),4);for(const summary of await p.locator('.estrategia summary').all())await summary.click();await responsive(p,'publicidad estrategias');await capture(p,'publicidad-estrategias');await capture(p,'publicidad-estrategias',390);
 }else if(slug==='dinero-ahorro-inversion'){
  assert.equal(await p.locator('.budget-case').count(),3);assert.deepEqual(await p.locator('.budget-relation b').allTextContents(),['=','>','<']);
  for(const [g,text] of [[10,'Ingresos = gastos'],[14,'Faltan 4'],[8,'Quedan 2']]){await p.locator('#gastoPresupuesto').evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},g);assert.match(await p.locator('#lecturaPresupuesto').innerText(),new RegExp(text));}
  await p.locator('#gastoPresupuesto').focus();await p.keyboard.press('Home');assert.equal(await p.locator('#valorGasto').innerText(),'0 €');
  await capture(p,'dinero-presupuesto');await capture(p,'dinero-presupuesto',390);
  await p.click('[data-pestana="claves"]');assert.equal(await p.locator('.payment').count(),3);await p.click('[data-escuchar-contenedor="#conceptosDinero"]');assert.equal(await p.evaluate(()=>qaAudio.at(-1).lang),'es-ES');await responsive(p,'dinero pagos');await capture(p,'dinero-pagos',390);
  await p.click('[data-pestana="material"]');assert.equal(await p.locator('.risk-branches>div').count(),3);assert.match(await p.locator('.risk-key').innerText(),/no está asegurado/);await responsive(p,'dinero ahorro inversion');await capture(p,'dinero-ahorro');await capture(p,'dinero-ahorro',390);
 }else{
  assert.equal(await p.locator('.service-node').count(),5);for(const node of await p.locator('.service-node').all()){await node.focus();await p.keyboard.press('Enter');assert.equal(await node.getAttribute('aria-pressed'),'true');}
  assert.match(await p.locator('#detalleServicio').innerText(),/Recogida de basuras/);await capture(p,'impuestos-fondo');await capture(p,'impuestos-fondo',390);
  await p.click('[data-pestana="claves"]');assert.match(await p.locator('.receipt-total').innerText(),/12 €/);assert.match(await p.locator('.school-payslip').innerText(),/Retención/);await p.click('[data-escuchar-contenedor="#conceptosImpuestos"]');assert.equal(await p.evaluate(()=>qaAudio.at(-1).lang),'es-ES');await responsive(p,'impuestos iva irpf');await capture(p,'impuestos-iva-irpf');await capture(p,'impuestos-iva-irpf',390);
  await p.click('[data-pestana="material"]');assert.match(await p.locator('.budget-connection').innerText(),/3 \+ 5 \+ 2 = 10/);const owner=p.locator('.budget-connection a');await owner.click();await p.waitForFunction(()=>document.querySelector('#tituloModo')?.textContent==='Sesión de aprendizaje');assert.equal(new URL(p.url()).pathname,topic('dinero-ahorro-inversion'));assert.match(new URL(p.url()).searchParams.get('volver'),/impuestos/);await p.locator('[data-nav-volver]').click();await p.waitForSelector('.services-map');assert.equal(new URL(p.url()).pathname,topic('impuestos'));await p.click('[data-pestana="material"]');await responsive(p,'impuestos conexion');await capture(p,'impuestos-conexion',390);
 }
 assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
 await p.click('[data-pestana="practica"]');const practice=banks[slug].practica;await p.click('#botonPista');assert.ok(await p.locator('#pistaPractica').isVisible());
 const wrong=practice[0].opciones.find(o=>o.id!==practice[0].respuestaCorrecta).id;await p.click('#practicaOpciones [data-opcion="'+wrong+'"]');await p.click('#botonComprobar');assert.match(await p.locator('#mensajePractica').innerText(),/Todavía no/);
 for(let i=0;i<practice.length;i++){await p.click('#practicaOpciones [data-opcion="'+practice[i].respuestaCorrecta+'"]');await p.click('#botonComprobar');if(i<practice.length-1)await p.click('#botonSiguiente');}
 assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
 await complete(p,slug,slug==='publicidad');assert.match(await p.locator('#estadoGuardado').innerText(),/Sesión guardada/);await responsive(p,slug+' resultado');await capture(p,slug+'-resultado',390);
 let db=await p.evaluate(()=>JSON.parse(localStorage.qaDB));const sessions=Object.entries(db).filter(([path,v])=>path.includes('/sesionesAcademicas/')&&v.actividadId===banks[slug].meta.actividadId);assert.equal(sessions.length,1);const session=sessions[0][1];assert.equal(session.materia,'Sociales');assert.equal(session.respuestas.length,banks[slug].familias.length);assert.equal(session.resumen.porBloque.length,banks[slug].bloques.length);assert.ok(session.respuestas.every(r=>r.bloqueId&&r.conceptoId&&r.explicacion));if(slug==='publicidad')firstPublicSession=session;
 await p.goto(base+'/mi-universo/mis-tareas/resultado-academico.html?sesionId='+sessions[0][0].split('/').at(-1));await p.waitForSelector('#tituloActividad');assert.match(await p.locator('body').innerText(),new RegExp(banks[slug].meta.tituloActividad));assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
}
// A second Publicidad test: variants and a repeated observable focus for reinforcement.
await p.goto(base+topic('publicidad'));await p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Sesión de aprendizaje');await complete(p,'publicidad',true);
let db=await p.evaluate(()=>JSON.parse(localStorage.qaDB));let publicSessions=Object.entries(db).filter(([path,v])=>path.includes('/sesionesAcademicas/')&&v.actividadId===banks.publicidad.meta.actividadId);assert.equal(publicSessions.length,2);assert.ok(publicSessions[1][1].variantes.every(v=>!firstPublicSession.variantes.some(f=>f.varianteId===v.varianteId)));
await p.evaluate(()=>{const d=JSON.parse(localStorage.qaDB);d['usuarios/alumno/tareas/mision-sociales']={titulo:'Los impuestos',tipo:'repaso_academico',modulo:'libre',estado:'pendiente',visibleParaAlumno:true,cursoReferencia:'6.º',materia:'Sociales',tema:'Los impuestos',recursoAcademicoUrl:'../../cursos/6to/sociales/impuestos/',criterioCumplimiento:{tipo:'cantidad',modulo:'libre',evidenciaTipo:'sesion_academica',cantidadObjetivo:1},progreso:{cantidadActual:0,cantidadObjetivo:1}};localStorage.qaDB=JSON.stringify(d);});
await p.goto(base+topic('impuestos')+'?misionId=mision-sociales');await p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Sesión de aprendizaje');await complete(p,'impuestos');db=await p.evaluate(()=>JSON.parse(localStorage.qaDB));assert.equal(db['usuarios/alumno/tareas/mision-sociales'].estado,'pendiente_validacion');assert.ok(Object.entries(db).some(([path,v])=>path.includes('/evidencias/')&&v.misionId==='mision-sociales'&&v.sesionId));
const prof=await entorno('consulta');for(const slug of slugs){await prof.p.goto(base+topic(slug)+'?modo=aprendizaje');await prof.p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Vista previa');assert.ok(await prof.p.locator('#botonModo').isDisabled());}await prof.p.goto(base+topic('publicidad'));await prof.p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Vista previa');await complete(prof.p,'publicidad');assert.equal(await prof.p.evaluate(()=>window.qaWrites||0),0);assert.deepEqual(prof.errors,[]);await prof.c.close();
const family=await entorno('gestion');await family.p.goto(base+topic('dinero-ahorro-inversion')+'?modo=vista_previa');await family.p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Vista previa');await complete(family.p,'dinero-ahorro-inversion');assert.equal(await family.p.evaluate(()=>window.qaWrites||0),0);
const sessionRows=Object.fromEntries(Object.entries(db).filter(([path])=>path.includes('/sesionesAcademicas/')));await family.p.evaluate(rows=>{localStorage.qaDB=JSON.stringify({...JSON.parse(localStorage.qaDB),...rows});},sessionRows);
await family.p.goto(base+'/mi-universo/mis-tareas/');await family.p.waitForSelector('[data-tab="refuerzos"]');await family.p.click('[data-tab="refuerzos"]');await family.p.waitForFunction(()=>document.querySelector('#grupoRefuerzoAcademico')?.textContent.includes('Estrategias publicitarias'));
await family.p.click('[data-tab="crear"]');await family.p.selectOption('#tipo','repaso_academico');await family.p.selectOption('#cursoReferencia','6');await family.p.waitForFunction(()=>Array.from(document.querySelector('#materiaCatalogoAcademico').options).some(o=>o.text==='Sociales'));await family.p.selectOption('#materiaCatalogoAcademico',{label:'Sociales'});await family.p.waitForFunction(()=>Array.from(document.querySelector('#temaCatalogoAcademico').options).some(o=>o.text.includes('Los impuestos')));const options=await family.p.locator('#temaCatalogoAcademico').innerText();for(const slug of slugs)assert.ok(options.includes(banks[slug].meta.tituloActividad));
await family.p.goto(base+'/mi-universo/consulta-educativa/');await family.p.waitForSelector('#analisisResultado .analisis-seccion');// The overview deliberately limits strengths to three groups, so inspect each Topic with the existing filter.
await family.p.selectOption('#analisisMotor','academicos');
for(const slug of slugs){
 const title=banks[slug].meta.tituloActividad;
 await family.p.selectOption('#analisisTema',{label:title});
 await family.p.waitForFunction(t=>document.querySelector('#analisisResultado').textContent.includes(t),title);
 const count=slug==='dinero-ahorro-inversion'?1:2;
 assert.equal(await family.p.locator('.analisis-resumen-grid article').filter({hasText:'Pruebas académicas'}).locator('strong').innerText(),String(count));
}

assert.deepEqual(learner.errors,[]);assert.deepEqual(family.errors,[]);assert.deepEqual(pendingAssets,[]);await learner.c.close();await family.c.close();await b.close();console.log('OK: Sociales activa/3 Temas; anuncio, presupuesto y fondo común interactivos; 26 prácticas/26 familias/52 variantes; sesiones/focos/variantes, Misión/evidencia, histórico, preview profesional/familiar, catálogo/refuerzo/Análisis y responsive. SDK/identidad/voz simulados.');
})().catch(e=>{console.error(e);process.exit(1)});
