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


// Separación por documento: banco, contenido, sesión e integraciones independientes.
const documents = [
  {id:'el-verbo',title:'El verbo · Repaso de 5.º',count:4,blocks:['base','indicativo'],models:11},
  {id:'indicativo-subjuntivo',title:'Indicativo y subjuntivo',count:2,blocks:['modos'],models:1},
  {id:'subjuntivo-imperativo',title:'Subjuntivo e imperativo',count:6,blocks:['subjuntivo','imperativo'],models:19}
];
async function completarDocumento(page,d,wrong=false) {
  const families=await page.evaluate(async id=>(await import('/cursos/6to/lengua/'+id+'/verbos-data.js')).FAMILIAS_PRUEBA_VERBOS,d.id);
  await page.click('[data-pestana="prueba"]');await page.click('#botonIniciarPrueba');
  for (let i=0;i<d.count;i++) {
    await page.waitForSelector('#pruebaOpciones .option');
    const e=await page.locator('#pruebaContenido .challenge__enunciado').innerText();
    const q=await page.locator('#pruebaContenido .challenge__pregunta').innerText();
    const v=families.flatMap(f=>f.variantes).find(v=>v.enunciado===e&&v.pregunta===q);
    assert.ok(v);assert.ok(d.blocks.includes(v.bloqueId));
    const answer=wrong?v.opciones.find(o=>o.id!==v.respuestaCorrecta).id:v.respuestaCorrecta;
    await page.click('#pruebaOpciones [data-opcion="'+answer+'"]');
    await page.click('#botonResponderPrueba');await page.click('#botonResponderPrueba');
  }
  await page.waitForFunction(()=>!document.querySelector('#cierrePrueba').hidden&&!document.querySelector('#estadoGuardado').textContent.includes('Guardando'));
}
const docSessions=[];
for (const d of documents) {
  const l=await entorno('alumno'),page=l.p;
  await page.goto(base+'/cursos/6to/lengua/');await page.waitForSelector('[data-tema-id="'+d.id+'"]');
  await page.locator('[data-tema-id="'+d.id+'"]').click();
  await page.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Sesión de aprendizaje');
  assert.match(page.url(),new RegExp('/'+d.id+'/.*volver='));
  assert.equal(await page.locator('h1').innerText(),d.title);await page.waitForSelector('[data-nav-volver]');assert.ok((await page.locator('[data-nav-volver]').getAttribute('href')).includes('/cursos/6to/lengua/'));
  for (const width of [1280,768,390,320]) {await page.setViewportSize({width,height:1000});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),d.id+' overflow '+width);}
  await page.setViewportSize({width:390,height:1000});
  if(process.env.QA_IMAGES)await page.screenshot({path:process.env.QA_IMAGES+'-'+d.id+'.png',fullPage:true});
  await page.click('[data-pestana="material"]');assert.equal(await page.locator('[data-panel="material"] details').count(),d.models);
  if(d.id==='el-verbo')assert.equal(await page.locator('[data-panel="material"]').getByText('🌱 Cantar en subjuntivo · 6.º').count(),0);
  if(d.id==='subjuntivo-imperativo')assert.ok(!(await page.locator('[data-panel="material"]').innerText()).includes('parece evidente que'));
  if(d.id==='indicativo-subjuntivo')assert.ok((await page.locator('[data-panel="material"]').innerText()).includes('parece evidente que'));
  if(d.id==='indicativo-subjuntivo')assert.equal(await page.locator('[data-panel="material"]').getByText('Futuro perfecto · poco usado').count(),0);
  const data=await page.evaluate(async id=>{const m=await import('/cursos/6to/lengua/'+id+'/verbos-data.js');return {meta:m.VERBOS_META,blocks:m.BLOQUES_RESULTADO,practice:m.PRACTICA_VERBOS,families:m.FAMILIAS_PRUEBA_VERBOS};},d.id);
  assert.equal(data.meta.actividadId,'6-lengua-'+d.id);assert.equal(data.meta.materia,'Lengua');
  assert.deepEqual(data.blocks.map(b=>b.id),d.blocks);assert.equal(data.practice.length,d.count);assert.equal(data.families.length,d.count);
  assert.ok(data.practice.every(q=>d.blocks.includes(q.bloqueId)));
  await page.click('[data-pestana="practica"]');await page.click('#botonPista');
  for(let i=0;i<data.practice.length;i++){await page.click('#practicaOpciones [data-opcion="'+data.practice[i].respuestaCorrecta+'"]');await page.click('#botonComprobar');if(i<d.count-1)await page.click('#botonSiguiente');}
  assert.equal(await page.evaluate(()=>window.qaWrites||0),0);
  await completarDocumento(page,d,true);
  let db=await page.evaluate(()=>JSON.parse(localStorage.qaDB));let rows=Object.entries(db).filter(([p,v])=>p.includes('/sesionesAcademicas/')&&v.actividadId===data.meta.actividadId);
  assert.equal(rows.length,1);assert.equal(rows[0][1].respuestas.length,d.count);assert.deepEqual(rows[0][1].resumen.porBloque.map(b=>b.bloqueId),d.blocks);
  await page.goto(base+'/cursos/6to/lengua/'+d.id+'/');await page.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Sesión de aprendizaje');await completarDocumento(page,d,true);
  db=await page.evaluate(()=>JSON.parse(localStorage.qaDB));rows=Object.entries(db).filter(([p,v])=>p.includes('/sesionesAcademicas/')&&v.actividadId===data.meta.actividadId);
  assert.equal(rows.length,2);const variants=rows[0][1].variantes.map(v=>v.varianteId);assert.ok(rows[1][1].variantes.every(v=>!variants.includes(v.varianteId)));docSessions.push(...rows);
  await page.goto(base+'/mi-universo/mis-tareas/resultado-academico.html?sesionId='+rows[0][0].split('/').at(-1));await page.waitForSelector('#tituloActividad');assert.match(await page.locator('body').innerText(),new RegExp(d.title.replace('·','\\u00b7')));assert.equal(await page.evaluate(()=>window.qaWrites||0),0);
  await page.evaluate(id=>{const db=JSON.parse(localStorage.qaDB);db['usuarios/alumno/tareas/mision-documento']={titulo:'Repasar documento',tipo:'repaso_academico',modulo:'libre',estado:'pendiente',visibleParaAlumno:true,cursoReferencia:'6.º',materia:'Lengua',tema:id,recursoAcademicoUrl:'../../cursos/6to/lengua/'+id+'/',criterioCumplimiento:{tipo:'cantidad',modulo:'libre',evidenciaTipo:'sesion_academica',cantidadObjetivo:1},progreso:{cantidadActual:0,cantidadObjetivo:1}};localStorage.qaDB=JSON.stringify(db);},d.id);
  await page.goto(base+'/cursos/6to/lengua/'+d.id+'/?misionId=mision-documento');await page.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Sesión de aprendizaje');await completarDocumento(page,d);
  db=await page.evaluate(()=>JSON.parse(localStorage.qaDB));assert.equal(db['usuarios/alumno/tareas/mision-documento'].estado,'pendiente_validacion');assert.ok(Object.entries(db).some(([p,v])=>p.includes('/evidencias/')&&v.misionId==='mision-documento'&&v.sesionId));
  assert.deepEqual(l.errors,[]);await l.c.close();
  const pro=await entorno('consulta');await pro.p.goto(base+'/cursos/6to/lengua/'+d.id+'/?modo=aprendizaje');await pro.p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Vista previa');assert.ok(await pro.p.locator('#botonModo').isDisabled());await completarDocumento(pro.p,d);assert.equal(await pro.p.evaluate(()=>window.qaWrites||0),0);assert.deepEqual(pro.errors,[]);await pro.c.close();
}
const fd=await entorno('gestion');await fd.p.goto(base+'/cursos/6to/lengua/');await fd.p.waitForSelector('[data-tema-id="el-verbo"]');await fd.p.evaluate(rows=>{localStorage.qaDB=JSON.stringify({...JSON.parse(localStorage.qaDB),...Object.fromEntries(rows)});},docSessions);
await fd.p.goto(base+'/mi-universo/mis-tareas/');await fd.p.waitForSelector('[data-tab="refuerzos"]');await fd.p.click('[data-tab="refuerzos"]');
await fd.p.waitForFunction(()=>document.querySelector('#grupoRefuerzoAcademico')?.textContent.includes('Indicativo y subjuntivo'));
for(const d of documents)assert.ok((await fd.p.locator('#grupoRefuerzoAcademico').textContent()).includes(d.title));
await fd.p.click('[data-tab="crear"]');await fd.p.selectOption('#tipo','repaso_academico');await fd.p.selectOption('#cursoReferencia','6');await fd.p.waitForFunction(()=>Array.from(document.querySelector('#materiaCatalogoAcademico').options).some(o=>o.text==='Lengua'));await fd.p.selectOption('#materiaCatalogoAcademico',{label:'Lengua'});
await fd.p.waitForFunction(()=>Array.from(document.querySelector('#temaCatalogoAcademico').options).some(o=>o.text==='El verbo · Repaso de 5.º'));
for(const d of documents)assert.ok((await fd.p.locator('#temaCatalogoAcademico').innerText()).includes(d.title));assert.ok(!(await fd.p.locator('#temaCatalogoAcademico').innerText()).includes('Verbos · Indicativo, subjuntivo e imperativo'));
await fd.p.goto(base+'/mi-universo/consulta-educativa/');await fd.p.waitForSelector('#analisisResultado .analisis-seccion');for(const d of documents)assert.ok((await fd.p.locator('#analisisResultado').innerText()).includes(d.title));assert.deepEqual(fd.errors,[]);await fd.c.close();
console.log('OK: tres documentos separados, 4/2/6 retos, contenido acotado, sesiones/variantes independientes, Misiones, histórico, profesional sin escrituras, catálogo, refuerzos, Análisis y responsive.');

const learner=await entorno('alumno');const p=learner.p;
await p.goto(base+'/cursos/6to/');await p.locator('a[href="./lengua/"]').click();await p.waitForSelector('[data-tema-id="el-verbo"]');assert.equal(await p.locator('.portal-tema').count(),4);assert.equal(await p.locator('[data-tema-id="verbos"]').count(),0);
await p.locator('a[href*="%C3%A1reas/lengua"]').waitFor({state:'visible'});await p.locator('[data-tema-id="el-verbo"]').click();await p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Sesión de aprendizaje');assert.match(p.url(),/volver=/);await p.goto(base+'/cursos/6to/lengua/verbos/');await p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Sesión de aprendizaje');
for(const width of [1280,768,390,320]){await p.setViewportSize({width,height:1000});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow '+width);}
await p.setViewportSize({width:1280,height:1000});if(process.env.QA_IMAGES)await p.screenshot({path:process.env.QA_IMAGES+'-mapa.png',fullPage:true});
await p.click('[data-pestana="material"]');assert.equal(await p.locator('[data-panel="material"] details').count(),29);assert.match(await p.locator('[data-panel="material"]').textContent(),/hubiéremos partido/);if(process.env.QA_IMAGES)await p.screenshot({path:process.env.QA_IMAGES+'-material.png',fullPage:true});
await p.click('[data-pestana="claves"]');assert.match(await p.locator('#claveSubjuntivo').innerText(),/no significa siempre/);if(process.env.QA_IMAGES)await p.screenshot({path:process.env.QA_IMAGES+'-claves.png',fullPage:true});
await p.click('[data-pestana="practica"]');await p.click('#botonPista');assert.ok(await p.locator('#pistaPractica').isVisible());
const practice=await p.evaluate(async()=> (await import('/cursos/6to/lengua/verbos/verbos-data.js')).PRACTICA_VERBOS);
for(let i=0;i<practice.length;i++){await p.click('#practicaOpciones [data-opcion="'+practice[i].respuestaCorrecta+'"]');await p.click('#botonComprobar');assert.ok(await p.locator('#botonSiguiente').isVisible());if(i<practice.length-1)await p.click('#botonSiguiente');}
assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
async function completar(page,wrong=false){await page.click('[data-pestana="prueba"]');await page.click('#botonIniciarPrueba');await page.waitForSelector('#pruebaOpciones .option');const families=await page.evaluate(async()=> (await import('/cursos/6to/lengua/verbos/verbos-data.js')).FAMILIAS_PRUEBA_VERBOS);for(let i=0;i<families.length;i++){const enun=await page.locator('#pruebaContenido .challenge__enunciado').innerText();const q=await page.locator('#pruebaContenido .challenge__pregunta').innerText();const v=families.flatMap(x=>x.variantes).find(x=>x.enunciado===enun&&x.pregunta===q);assert.ok(v);const answer=wrong&&v.bloqueId==='modos'?v.opciones.find(x=>x.id!==v.respuestaCorrecta).id:v.respuestaCorrecta;await page.click('#pruebaOpciones [data-opcion="'+answer+'"]');await page.click('#botonResponderPrueba');assert.ok(await page.locator('#explicacionPrueba').isVisible());await page.click('#botonResponderPrueba');}await page.waitForFunction(()=>!document.querySelector('#cierrePrueba').hidden&& !document.querySelector('#estadoGuardado').textContent.includes('Guardando'));}
await completar(p,true);assert.match(await p.locator('#estadoGuardado').innerText(),/Sesión guardada/);let db=await p.evaluate(()=>JSON.parse(localStorage.qaDB));let sessions=Object.entries(db).filter(([path,v])=>path.includes('/sesionesAcademicas/')&&v.actividadId==='6-lengua-verbos-modos');assert.equal(sessions.length,1);assert.equal(sessions[0][1].contrato,'sesion-academica-v1');assert.equal(sessions[0][1].respuestas.length,12);assert.equal(sessions[0][1].resumen.porBloque.length,5);assert.ok(sessions[0][1].retroalimentacion.bloquesAReforzar.includes('modos'));
const id=sessions[0][0].split('/').at(-1);const writes=await p.evaluate(()=>window.qaWrites);await p.goto(base+'/mi-universo/mis-tareas/resultado-academico.html?sesionId='+id);await p.waitForSelector('#tituloActividad');assert.match(await p.locator('body').innerText(),/subjuntivo/i);assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
await p.goto(base+'/cursos/6to/lengua/verbos/');await p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Sesión de aprendizaje');await completar(p,true);db=await p.evaluate(()=>JSON.parse(localStorage.qaDB));sessions=Object.entries(db).filter(([path,v])=>path.includes('/sesionesAcademicas/')&&v.actividadId==='6-lengua-verbos-modos');assert.equal(sessions.length,2);const ids0=sessions[0][1].variantes.map(x=>x.varianteId);assert.ok(sessions[1][1].variantes.every(x=>!ids0.includes(x.varianteId)));
// Misión existente: la sesión usa la API/evidencia reales y pasa a revisión familiar.
await p.evaluate(()=>{const d=JSON.parse(localStorage.qaDB);d['usuarios/alumno/tareas/mision-verbo']={titulo:'Repasar verbos',tipo:'repaso_academico',modulo:'libre',estado:'pendiente',visibleParaAlumno:true,cursoReferencia:'6.º',materia:'Lengua',tema:'Verbos',recursoAcademicoUrl:'../../cursos/6to/lengua/verbos/',criterioCumplimiento:{tipo:'cantidad',modulo:'libre',evidenciaTipo:'sesion_academica',cantidadObjetivo:1},progreso:{cantidadActual:0,cantidadObjetivo:1}};localStorage.qaDB=JSON.stringify(d);});
await p.goto(base+'/cursos/6to/lengua/verbos/?misionId=mision-verbo');await p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Sesión de aprendizaje');await completar(p);db=await p.evaluate(()=>JSON.parse(localStorage.qaDB));assert.equal(db['usuarios/alumno/tareas/mision-verbo'].estado,'pendiente_validacion');assert.ok(Object.entries(db).some(([path,v])=>path.includes('/evidencias/')&&v.sesionId&&v.misionId==='mision-verbo'));
const professional=await entorno('consulta');await professional.p.goto(base+'/cursos/6to/lengua/verbos/?modo=aprendizaje');await professional.p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Vista previa');assert.ok(await professional.p.locator('#botonModo').isDisabled());assert.equal(await professional.p.evaluate(()=>window.qaWrites||0),0);assert.deepEqual(professional.errors,[]);await professional.c.close();
const family=await entorno('gestion');await family.p.goto(base+'/cursos/6to/lengua/verbos/?modo=vista_previa');await family.p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Vista previa');await completar(family.p);assert.equal(await family.p.evaluate(()=>window.qaWrites||0),0);assert.match(await family.p.locator('#estadoGuardado').innerText(),/Vista previa/);
// Regresión del contenido de Lengüizonas: 8 familias originales y la misma prueba.
await family.p.goto(base+'/cursos/6to/zonas/lenguizonas/gramatica-verbos/?modo=vista_previa');await family.p.waitForFunction(()=>document.querySelector('#tituloModo').textContent==='Vista previa');await family.p.click('[data-pestana="prueba"]');await family.p.click('#botonIniciarPrueba');await family.p.waitForSelector('#pruebaOpciones .option');const old=await family.p.evaluate(async()=> (await import('/cursos/6to/zonas/lenguizonas/gramatica-verbos/gramatica-verbos-data.js')).FAMILIAS_PRUEBA_VERBOS);assert.equal(old.length,8);for(let i=0;i<8;i++){const e=await family.p.locator('#pruebaContenido .challenge__enunciado').innerText();const q=await family.p.locator('#pruebaContenido .challenge__pregunta').innerText();const v=old.flatMap(x=>x.variantes).find(x=>x.enunciado===e&&x.pregunta===q);await family.p.click('#pruebaOpciones [data-opcion="'+v.respuestaCorrecta+'"]');await family.p.click('#botonResponderPrueba');await family.p.click('#botonResponderPrueba');}assert.match(await family.p.locator('#resultadoPruebaResumen').innerText(),/8 de 8/);assert.equal(await family.p.evaluate(()=>window.qaWrites||0),0);
await family.p.evaluate(db=>{localStorage.qaDB=JSON.stringify({...JSON.parse(localStorage.qaDB),...db});},Object.fromEntries(sessions));await family.p.goto(base+'/mi-universo/mis-tareas/');await family.p.waitForSelector('[data-tab="refuerzos"]');await family.p.click('[data-tab="refuerzos"]');await family.p.waitForFunction(()=>document.querySelector('#grupoRefuerzoAcademico')?.textContent.includes('Elegir el modo'));
await family.p.click('[data-tab="crear"]');await family.p.selectOption('#tipo','repaso_academico');await family.p.selectOption('#cursoReferencia','6');await family.p.waitForFunction(()=>Array.from(document.querySelector('#materiaCatalogoAcademico').options).some(o=>o.text==='Lengua'));await family.p.selectOption('#materiaCatalogoAcademico',{label:'Lengua'});await family.p.waitForFunction(()=>Array.from(document.querySelector('#temaCatalogoAcademico').options).some(o=>o.text.includes('Indicativo')));assert.match(await family.p.locator('#temaCatalogoAcademico').innerText(),/Indicativo/);
// El reporte reutilizado consume las sesiones nuevas sin motor adicional.
await family.p.goto(base+'/mi-universo/consulta-educativa/');await family.p.waitForSelector('#analisisResultado .analisis-seccion');assert.match(await family.p.locator('#analisisResultado').innerText(),/Verbos/);
assert.deepEqual(learner.errors,[]);assert.deepEqual(family.errors,[]);await learner.c.close();await family.c.close();await b.close();console.log('OK: curso→Lengua→Verbos, material/modelos, práctica sin escritura, aprendizaje/sesión/variantes, Misión/evidencia/revisión, histórico, preview sin escrituras, motor anterior 8 preguntas intacto, catálogo de Misiones, refuerzo y Análisis; responsive. Firebase simulado, no certifica producción.');})().catch(e=>{console.error(e);process.exit(1)});
