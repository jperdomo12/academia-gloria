/* Formulario, listado, Mi Camino, API Academia y sesiones REALES.
 * Solo identidad, SDK Firestore, dependencias externas y voz se sustituyen.
 * No prueba las Rules desplegadas ni audio físico; nunca usa Firebase real.
 */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.BASE_URL || 'http://127.0.0.1:8765';

const sdk = `
const read = () => JSON.parse(localStorage.testFirestore || '{}');
const listeners = [];
const snapshot = (path, value) => ({id:path.split('/').at(-1),exists:()=>value !== undefined,data:()=>structuredClone(value)});
function docs(ref) {
  return { docs: Object.entries(read()).filter(([p])=>p.startsWith(ref.path+'/') && !p.slice(ref.path.length+1).includes('/')).map(([p,v])=>snapshot(p,v)) };
}
function write(ref, data, update=false) {
  const all=read();const value=update?structuredClone(all[ref.path] || {}):{};
  for(const [key,v] of Object.entries(data)) {
    const parts=key.split('.');let target=value;
    for(const p of parts.slice(0,-1)) target=target[p] ||= {};
    target[parts.at(-1)]=v;
  }
  all[ref.path]=value;localStorage.testFirestore=JSON.stringify(all);
  for(const l of listeners) queueMicrotask(()=>l.callback(docs(l.ref)));
}
export const Timestamp={fromDate:d=>d.toISOString(),now:()=>new Date().toISOString()};
export const serverTimestamp=()=>new Date().toISOString();
export const collection=(db,...parts)=>({path:[db.path,...parts].filter(Boolean).join('/')});
export const doc=(ref,...parts)=>({path:[ref.path,...parts].filter(Boolean).join('/'),id:parts.at(-1)});
export const getDoc=async ref=>snapshot(ref.path,read()[ref.path]);
export const getDocs=async ref=>docs(ref);
export const setDoc=async(ref,d,opts)=>write(ref,d,opts?.merge);
export const updateDoc=async(ref,d)=>write(ref,d,true);
export const addDoc=async(ref,d)=>{const id='mision-'+(Number(localStorage.testCounter||0)+1);localStorage.testCounter=id.split('-').at(-1);write({path:ref.path+'/'+id},d);return {id};};
export const deleteDoc=async ref=>{const all=read();delete all[ref.path];localStorage.testFirestore=JSON.stringify(all);};
export const onSnapshot=(ref,callback)=>{const listener={ref,callback};listeners.push(listener);queueMicrotask(()=>callback(docs(ref)));return ()=>listeners.splice(listeners.indexOf(listener),1);};
export const query=(ref)=>ref;
export const where=()=>({});export const orderBy=()=>({});
export const runTransaction=async(db,fn)=>{
  if(localStorage.failLink==='true') {
    const test={get:async ref=>{if(ref.path.includes('/tareas/'))throw Error('Conexión de evidencia interrumpida');return getDoc(ref);},set:(r,d)=>write(r,d),update:(r,d)=>write(r,d,true)};
    return fn(test);
  }
  return fn({get:getDoc,set:(r,d)=>write(r,d),update:(r,d)=>write(r,d,true)});
};`;

(async () => {
  const browser = await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']});
  const page = await browser.newPage({viewport:{width:1280,height:1000}});
  page.setDefaultTimeout(12000);
  const errors=[];
  page.on('pageerror', e=>{errors.push(e.message);console.error('Browser:',e.message);});
  await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:'',contentType:'text/css'}));
  await page.route('https://unpkg.com/**',r=>r.fulfill({body:'window.lucide={createIcons(){}}',contentType:'text/javascript'}));
  await page.route('**/firebase-firestore.js',r=>r.fulfill({body:sdk,contentType:'text/javascript'}));
  await page.route('**/compartido/firebase/firebase-config.js',r=>r.fulfill({body:`export const db={};export const auth={authStateReady:async()=>{},get currentUser(){return {uid:localStorage.testRole==='consulta'?'alumna':'actor'}}};`,contentType:'text/javascript'}));
  await page.route('**/compartido/js/contexto-usuario.js',r=>r.fulfill({contentType:'text/javascript',body:`const ctx=()=>({usuario:{userId:localStorage.testRole==='consulta'?'alumna':'actor'},personaActiva:{personaId:'persona',nombreVisible:'Persona de prueba'},personaUsuario:{nombre:'Familia'},userIdPersonaActiva:'alumna',nivelAcceso:localStorage.testRole||'gestion',esPersonaPropia:localStorage.testRole==='consulta'});export const ContextoUsuario={inicializar:async()=>ctx(),obtenerUserIdPersonaActiva:async()=> 'alumna',esAdministrador:async()=>false};`}));
  await page.route('**/compartido/js/perfil-usuario.js',r=>r.fulfill({contentType:'text/javascript',body:`export const obtenerPerfil=async()=>({nombre:'Persona de prueba',avatar:'🦉'});export const PerfilUsuario={obtenerUID:async()=> 'alumna',obtenerPerfil};`}));
  await page.route('**/compartido/js/auth-guard.js',r=>r.fulfill({contentType:'text/javascript',body:`export async function protegerPagina({onAuthenticated}){await Promise.resolve();await onAuthenticated();}`}));
  await page.route('**/compartido/js/panel-usuario.js',r=>r.fulfill({contentType:'text/javascript',body:`export async function iniciarPanelUsuario({contenedor}){const c=document.querySelector(contenedor);if(c)c.innerHTML='<button class="panel-usuario__boton">Cuenta de prueba</button>';}`}));
  await page.route('**/timeout-sesion.js',r=>r.fulfill({body:'export async function activarTimeoutSesion(){}',contentType:'text/javascript'}));
  await page.route('**/compartido/js/lector-texto.js',r=>r.fulfill({contentType:'text/javascript',body:`let timer;export const LectorTexto={disponible:()=>true,detener:()=>clearTimeout(timer),escuchar:(t,o)=>{timer=setTimeout(()=>o.alFinalizar?.(),30);return true;}};`}));
  // Optional adult panels are outside this test's scope; standard form/list remain real.
  for(const script of ['refuerzos-detectives.js','refuerzos-academicos.js','refuerzos-pronunciacion.js','analisis-educativo.js','limpieza-datos-prueba.js','trabajo-realizado-gestion.js','reconocimientos-misiones.js','datos-prueba-misiones.js','reconocimientos-camino.js','guia-celebraciones-gloria.js','crecimiento-camino.js']) {
    await page.route('**/'+script+'*',r=>r.fulfill({body:script==='refuerzos-academicos.js'?"import './mision-libre.js';":'',contentType:'text/javascript'}));
  }
  async function stored(fragment) {
    return page.evaluate(f=>Object.entries(JSON.parse(localStorage.testFirestore||'{}')).filter(([p])=>p.includes(f)).map(([p,d])=>({...d,id:p.split('/').at(-1)})),fragment);
  }
  async function familia() {
    await page.goto(base+'/mi-universo/mis-tareas/',{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.querySelector('#dictadoAventura').options.length===6);
  }
  console.log('Probando formulario estándar');
  await familia();
  console.log('Formulario cargado');
  assert.equal(await page.locator('#tituloCrearDictado').count(),0);
  assert.equal(await page.locator('#dictadoMisiones').count(),0);
  await page.click('[data-tab="crear"]');
  await page.selectOption('#tipo','actividad_modulo');
  await page.selectOption('#modulo','rincon-dictados');
  await page.waitForFunction(()=>document.querySelector('#tipo option:checked').textContent.includes('Misión de Mi Aventura'));
  assert.ok(await page.locator('#configuracionDictado').isVisible());
  assert.ok(await page.locator('#configuracionAcademica').isHidden());
  await page.selectOption('#dictadoAventura','shakira-escenario');
  assert.match(await page.inputValue('#titulo'),/Shakira/);
  assert.match(await page.locator('#resumenCriterioDictado').innerText(),/Shakira/);
  await page.fill('#descripcionMision','Escucha a Shakira y escribe en tu cuaderno.');
  await page.click('[data-acordeon=planificacion] > summary');
  await page.fill('#fechaLimite','2030-10-14');
  await page.click('#guardarTarea');
  await page.waitForFunction(()=>JSON.parse(localStorage.testFirestore||'{}')['usuarios/alumna/tareas/mision-1']);
  let tasks=await stored('/tareas/');
  assert.equal(tasks[0].tipo,'actividad_modulo');
  assert.equal(tasks[0].modulo,'rincon-dictados'); // API normalizarTarea real.
  assert.equal(tasks[0].fechaLimite,'2030-10-14');
  assert.equal(tasks[0].presentacionAlumno.descripcionMision,'Escucha a Shakira y escribe en tu cuaderno.');
  await page.locator('.tarea-card').filter({has:page.locator('[data-action="edit"][data-id="mision-1"]')}).locator('summary').first().click();
  await page.click('[data-action="edit"][data-id="mision-1"]');
  assert.equal(await page.inputValue('#dictadoAventura'),'shakira-escenario');
  await page.click('[data-acordeon=mision] > summary');
  await page.fill('#descripcionMision','Mi aventura musical en el cuaderno.');
  await page.click('#guardarTarea');
  await page.waitForFunction(()=>JSON.parse(localStorage.testFirestore)['usuarios/alumna/tareas/mision-1'].presentacionAlumno.descripcionMision==='Mi aventura musical en el cuaderno.');
  await page.evaluate(()=>localStorage.testRole='consulta');
  await page.goto(base+'/mi-universo/mi-camino/');
  await page.waitForSelector('a[data-iniciar-mision="mision-1"]');
  assert.equal(await page.locator('[data-terminar-repaso="mision-1"]').count(),0);
  await page.click('a[data-iniciar-mision="mision-1"]');
  await page.waitForSelector('[data-aventura]:not(:disabled)');
  assert.ok(await page.locator('#misionDictado').isVisible());
  assert.equal(await page.locator('[data-aventura]').count(),1);
  assert.ok((await page.locator('[data-nav-volver]').getAttribute('href')).includes('mi-camino'));
  await page.click('#ayudaMisionDictado');
  await page.waitForFunction(()=>document.querySelector('#estadoMisionDictado').textContent.includes('Tu familia sabe'));
  async function escribir(diferencia) {
    await page.locator('[data-aventura]').click();
    await page.click('#saltarHistoria');await page.click('#empezarDictado');
    while(await page.locator('#siguienteFragmento').count()) {
      await page.locator('#siguienteFragmento').waitFor({state:'visible'});
      await page.click('#siguienteFragmento');
    }
    await page.click('#iniciarRevision');
    if(diferencia){await page.click('[data-palabra="0"]');await page.click('button[value="revisar"]');await page.check('input[name=puntuacion][value=correcta]');await page.click('#confirmarFrase');}
    while(await page.locator('#fraseIgual').count()) await page.click('#fraseIgual');
    await page.selectOption('#acompanamiento','acompanada');
  }
  await escribir(true);
  await page.evaluate(()=>localStorage.failLink='true');
  await page.click('#guardar');await page.waitForSelector('#reintentarVinculo');
  assert.equal((await stored('/sesionesAcademicas/')).length,1);
  await page.evaluate(()=>localStorage.failLink='false');
  await page.click('#reintentarVinculo');
  await page.waitForFunction(()=>document.querySelector('#estadoMisionDictado').textContent.includes('Esperando a mi familia'));
  assert.equal((await stored('/sesionesAcademicas/')).length,1);
  assert.equal((await stored('/tareas/'))[0].estado,'pendiente_validacion');
  assert.equal((await stored('/evidencias/')).length,1);
  await page.evaluate(()=>localStorage.testRole='gestion');
  await familia();
  await page.evaluate(()=>document.querySelector('#panelRefuerzos').classList.remove('hidden'));
  await page.click('#actualizarDictados');
  await page.waitForFunction(()=>document.querySelector('#dictadoIntento').options.length===2 && !document.querySelector('#dictadoIntento').disabled);
  await page.selectOption('#dictadoIntento',{index:1});
  await page.locator('#dictadoObjetivos label').filter({has:page.locator('input[value="p:0:0"]')}).click();
  await page.click('#crearRefuerzoDictado');
  assert.ok(await page.locator('#formTarea').isVisible());
  assert.equal(await page.inputValue('#tipo'),'actividad_modulo');
  assert.equal(await page.inputValue('#modulo'),'rincon-dictados');
  assert.equal(await page.isChecked('#visibleParaAlumno'),false);
  assert.match(await page.locator('#resumenCriterioDictado').innerText(),/Práctica breve/);
  await page.click('#guardarTarea');
  await page.waitForFunction(()=>JSON.parse(localStorage.testFirestore)['usuarios/alumna/tareas/mision-2']);
  assert.equal((await stored('/tareas/')).find(t=>t.id==='mision-2').visibleParaAlumno,false);
  await page.locator('.tarea-card').filter({has:page.locator('[data-action="edit"][data-id="mision-2"]')}).locator('summary').first().click();
  await page.click('[data-action="edit"][data-id="mision-2"]');
  assert.ok(await page.locator('#dictadoAventura').isDisabled());
  await page.click('[data-acordeon=mision] > summary');
  await page.click('.interruptor__control');
  assert.equal(await page.isChecked('#visibleParaAlumno'),true);
  await page.click('#guardarTarea');
  await page.waitForFunction(()=>JSON.parse(localStorage.testFirestore)['usuarios/alumna/tareas/mision-2'].visibleParaAlumno);
  await page.evaluate(()=>localStorage.testRole='consulta');
  await page.goto(base+'/mi-universo/mi-camino/');
  await page.waitForSelector('a[data-iniciar-mision="mision-2"]');
  await page.click('a[data-iniciar-mision="mision-2"]');
  await page.waitForSelector('[data-aventura]:not(:disabled)');
  // History cannot offer a different adventure under the refuerzo's context.
  await page.click('#verHistorial');await page.locator('[data-historico]').first().click();
  assert.equal(await page.locator('#detalle [data-aventura]').count(),0);
  await page.click('#verCatalogo');
  await escribir(false);await page.click('#guardar');
  await page.waitForFunction(()=>document.querySelector('#estadoMisionDictado').textContent.includes('Esperando a mi familia'));
  const sessions=await stored('/sesionesAcademicas/');
  assert.equal(sessions.length,2);assert.equal(sessions[0].resumen.dictado.porcentaje,95);
  assert.equal(sessions[1].resumen.dictado.tipoPractica,'refuerzo');
  await page.click('#verHistorial');
  assert.match(await page.locator('#sesiones').innerText(),/Práctica breve/);
  assert.match(await page.locator('#sesiones').innerText(),/Aventura completa/);
  // Compatibilidad de contratos publicados: sin migración, mismo texto asignado.
  await page.evaluate(()=>localStorage.testRole='gestion');
  await familia();
  await page.evaluate(async()=>{
    const { prepararMision } = await import('../rincon-dictados/seguimiento.js');
    const { Academia } = await import('../../compartido/api/academia.js');
    const antigua = prepararMision('carta-secreta');
    antigua.tipo='repaso_academico';antigua.modulo='libre';
    antigua.criterioCumplimiento.modulo='libre';antigua.evidencia.modulo='libre';
    antigua.estado='en_curso';antigua.visibleParaAlumno=true;
    await Academia.tareas.crear(antigua);
  });
  await page.locator('.tarea-card').filter({has:page.locator('[data-action="edit"][data-id="mision-3"]')}).locator('summary').first().click();
  await page.click('[data-action="edit"][data-id="mision-3"]');
  await page.click('[data-acordeon=informacion] > summary');
  assert.match(await page.locator('#dictadoConfiguracionAviso').innerText(),/primera versión/);
  await page.waitForTimeout(150); // Escucha también el controlador compartido de Misión libre.
  assert.ok(await page.locator('#tipo').isDisabled());
  assert.ok(await page.locator('#modulo').isDisabled());
  await page.click('#guardarTarea');
  await page.waitForFunction(()=>document.querySelector('#mensajeFormulario').textContent.includes('guardada'));
  const anterior=(await stored('/tareas/')).find(t=>t.id==='mision-3');
  assert.equal(anterior.tipo,'repaso_academico');assert.equal(anterior.modulo,'libre');
  await page.evaluate(()=>localStorage.testRole='consulta');
  await page.goto(base+'/mi-universo/mi-camino/');
  await page.waitForSelector('a[data-iniciar-mision="mision-3"]');
  assert.equal(await page.locator('[data-terminar-repaso="mision-3"]').count(),0);
  await page.click('a[data-iniciar-mision="mision-3"]');
  await page.waitForSelector('[data-aventura]:not(:disabled)');
  assert.equal(await page.locator('[data-aventura]').getAttribute('data-aventura'),'carta-secreta');
  await escribir(false);await page.click('#guardar');
  await page.waitForFunction(()=>document.querySelector('#estadoMisionDictado').textContent.includes('Esperando a mi familia'));
  assert.equal((await stored('/tareas/')).find(t=>t.id==='mision-3').modulo,'libre');

  // Regresión del formulario compartido: Lectura, módulos, Curso y Misión libre.
  await page.evaluate(()=>localStorage.testRole='gestion');
  await familia();await page.click('[data-tab="crear"]');
  for(const [modulo, panel] of [['rincon-lectura','configuracionLectura'],['detectives','configuracionDetectives'],['creciendo-por-dentro','configuracionSemillas']]) {
    await page.selectOption('#modulo',modulo);
    assert.ok(await page.locator('#'+panel).isVisible());
    assert.ok(await page.locator('#configuracionDictado').isHidden());
  }
  await page.selectOption('#tipo','repaso_academico');
  assert.ok(await page.locator('#configuracionAcademica').isVisible());
  await page.waitForTimeout(100);
  assert.ok(await page.locator('#modulo').isDisabled());
  await page.selectOption('#tipo','tarea_libre');
  await page.waitForFunction(()=>document.querySelector('#modulo').value==='libre');
  assert.ok(await page.locator('#modulo').isDisabled());
  await page.selectOption('#tipo','actividad_modulo');
  await page.selectOption('#modulo','rincon-dictados');
  assert.ok(await page.locator('#configuracionDictado').isVisible());
  await page.screenshot({path:'/tmp/dictado-formulario-estandar.png',fullPage:true});
  for(const width of [768,390,320]) {
    await page.setViewportSize({width,height:1000});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
  assert.deepEqual(errors,[]);
  await browser.close();
  console.log('OK: formulario/listado/API reales → editar → Mi Camino → ayuda → evidencia/reintento → selección familiar → formulario estándar → activar → refuerzo separado → historial.');
})().catch(error=>{console.error(error);process.exit(1)});
