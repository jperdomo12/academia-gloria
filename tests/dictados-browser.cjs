/* Ejecutar con Playwright instalado y el repositorio servido en BASE_URL.
   Firebase/voz se simulan: no escribe datos reales ni verifica audio físico. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.BASE_URL || 'http://127.0.0.1:8765';
(async()=>{
  const browser=await chromium.launch({headless:true, ...(process.env.CHROMIUM_EXECUTABLE ? {executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']} : {})});
  const page=await browser.newPage({viewport:{width:1280,height:1000}});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:'',contentType:'text/css'}));
  await page.route('**/compartido/js/lector-texto.js',r=>r.fulfill({contentType:'text/javascript',body:`let timer;export const LectorTexto={disponible:()=>true,detener:()=>clearTimeout(timer),escuchar:(texto,o)=>{window.ultimaVoz=texto;window.ultimaVelocidad=o.velocidad;if(window.fallarVoz){queueMicrotask(()=>o.alError());return true;}timer=setTimeout(()=>o.alFinalizar?.(),window.vozLarga?1000:100);return true;}};`}));
  await page.goto(base+'/mi-universo/rincon-dictados/?modo=vista_previa');
  await page.waitForSelector('[data-aventura]:not(:disabled)');
  assert.equal(await page.locator('[data-aventura]').count(),6);
  await page.screenshot({path:'/tmp/dictados-catalogo.png',fullPage:true});
  await page.selectOption('#nivel','2');assert.equal(await page.locator('[data-aventura]').count(),2);
  await page.selectOption('#nivel','todos');await page.click('[data-aventura="carta-secreta"]');
  assert.equal(await page.locator('#pantalla').innerText().then(t=>t.includes('La gata Luna')),false);
  await page.selectOption('#velocidad','0.5');
  await page.evaluate(()=>window.vozLarga=true);
  await page.click('#empezarDictado');
  for(const rate of ['1','0.75','0.5']){
    await page.selectOption('#velocidad',rate);
    assert.equal(await page.evaluate(()=>window.ultimaVelocidad),Number(rate));
    assert.ok(await page.locator('#siguienteFragmento').isDisabled());
  }
  await page.evaluate(()=>window.vozLarga=false);await page.waitForTimeout(1050);
  assert.equal(await page.locator('#siguienteFragmento').isEnabled(),true);
  for(let i=0;i<6;i++){
    assert.equal(await page.locator('#pantalla').innerText().then(t=>t.includes('La gata Luna')),false);
    await page.click('#siguienteFragmento');await page.waitForTimeout(140);
  }
  await page.click('#iniciarRevision');
  assert.equal(await page.locator('.palabra.correcta').count(),0);
  await page.click('[data-palabra="0"]');await page.click('button[value="duda"]');
  await page.check('input[name="puntuacion"][value="correcta"]');await page.click('#confirmarFrase');
  await page.click('#fraseIgual');await page.click('#fraseIgual');
  assert.equal(await page.locator('.porcentaje').count(),0);assert.match(await page.locator('#mensaje').innerText(),/duda/);
  await page.click('[data-palabra="0"]');await page.click('button[value="revisar"]');
  await page.click('#confirmarFrase');await page.click('#confirmarFrase');await page.click('#confirmarFrase');
  assert.equal(await page.locator('.porcentaje').innerText(),'95%');
  await page.click('[data-practica="0:0"]');await page.check('[data-corregida="0:0"]');
  assert.equal(await page.locator('.porcentaje').innerText(),'95%');
  await page.selectOption('#acompanamiento','acompanada');
  await page.screenshot({path:'/tmp/dictados-resultado.png',fullPage:true});
  await page.click('#guardar');assert.match(await page.locator('#mensaje').innerText(),/No se ha guardado/);
  assert.equal(await page.evaluate(()=>Object.keys(localStorage).filter(k=>k.startsWith('academia.dictados')).length),0);

  // Sesión simulada y servicio de datos simulado, con dos personas independientes.
  await page.route('**/compartido/js/navegacion.js',r=>r.fulfill({contentType:'text/javascript',body:''}));
  await page.route('**/compartido/componentes/navegacion-global.js',r=>r.fulfill({contentType:'text/javascript',body:''}));
  await page.route('**/compartido/js/panel-usuario.js',r=>r.fulfill({contentType:'text/javascript',body:'export async function iniciarPanelUsuario(){}'}));
  await page.route('**/compartido/js/perfil-usuario.js',r=>r.fulfill({contentType:'text/javascript',body:'export const PerfilUsuario={obtenerUID:async()=>"actor"};'}));
  await page.route('**/compartido/js/contexto-usuario.js',r=>r.fulfill({contentType:'text/javascript',body:`export const ContextoUsuario={inicializar:async()=>({usuario:{userId:'actor'},personaActiva:{personaId:localStorage.getItem('test-persona')||'p1',nombreVisible:'Persona de prueba'},nivelAcceso:window.soloConsulta?'consulta':'gestion',esPersonaPropia:false})};`}));
  await page.route('**/compartido/js/sesiones-academicas.js',r=>r.fulfill({contentType:'text/javascript',body:`export async function guardarSesionAcademica(r){window.envios=(window.envios||0)+1;if(window.fallarGuardado)throw new Error('Error de conexión simulado');localStorage.setItem('test-sesion',JSON.stringify({...r,id:r.intentoId}));return {guardado:true};}export async function leerSesionesAcademicas(){const s=JSON.parse(localStorage.getItem('test-sesion')||'null');return s?[s]:[];}export async function leerSesionAcademica(){return null;}`}));
  await page.goto(base+'/mi-universo/rincon-dictados/');await page.click('[data-aventura="shakira-escenario"]');
  await page.click('#empezarDictado');await page.waitForTimeout(130);await page.click('#siguienteFragmento');await page.waitForTimeout(130);await page.click('#descansar');
  await page.reload();await page.click('#reanudar');assert.match(await page.locator('.contador').innerText(),/FRAGMENTO 2/);assert.ok(await page.locator('#siguienteFragmento').isDisabled());
  await page.evaluate(()=>window.fallarVoz=true);await page.click('[data-escuchar="fragmento"]');await page.waitForTimeout(50);assert.ok(await page.locator('#siguienteFragmento').isDisabled());
  await page.evaluate(()=>window.fallarVoz=false);
  await page.evaluate(()=>localStorage.setItem('test-persona','p2'));await page.reload();assert.ok(await page.locator('#borrador').isHidden());
  await page.evaluate(()=>localStorage.setItem('test-persona','p1'));await page.reload();await page.click('#reanudar');
  await page.click('[data-escuchar="fragmento"]');await page.waitForTimeout(140);
  while(await page.locator('#siguienteFragmento').count()){await page.click('#siguienteFragmento');await page.waitForTimeout(140);}
  await page.click('#iniciarRevision');while(await page.locator('#fraseIgual').count())await page.click('#fraseIgual');
  await page.selectOption('#acompanamiento','sola');
  await page.evaluate(()=>window.fallarGuardado=true);await page.click('#guardar');await page.waitForTimeout(50);assert.match(await page.locator('#mensaje').innerText(),/Error de conexión/);assert.ok(await page.locator('#guardar').isEnabled());
  await page.evaluate(()=>window.fallarGuardado=false);await page.click('#guardar');await page.waitForTimeout(50);assert.ok(await page.locator('#guardar').isDisabled());
  assert.equal(await page.evaluate(()=>Object.keys(localStorage).filter(k=>k.startsWith('academia.dictados')).length),0);
  await page.click('#verHistorial');await page.click('[data-historico="0"]');assert.match(await page.locator('#detalle').innerText(),/SOLO LECTURA/);assert.equal(await page.locator('#detalle input').count(),0);
  await page.setViewportSize({width:390,height:844});await page.click('#verCatalogo');
  await page.waitForTimeout(3100);
  await page.screenshot({path:'/tmp/dictados-movil.png',fullPage:true});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.addInitScript(()=>window.soloConsulta=true);await page.reload();assert.ok(await page.locator('[data-aventura]').first().isDisabled());

  // Un resultado menor que la meta se reconoce y puede terminarse.
  await page.goto(base+'/mi-universo/rincon-dictados/?modo=vista_previa');
  await page.click('[data-aventura="carta-secreta"]');await page.click('#empezarDictado');await page.waitForTimeout(140);
  while(await page.locator('#siguienteFragmento').count()){await page.click('#siguienteFragmento');await page.waitForTimeout(140);}
  await page.click('#iniciarRevision');
  while(await page.locator('#confirmarFrase').count()){
    const n=await page.locator('[data-palabra]').count();
    for(let i=0;i<n;i++){await page.click(`[data-palabra="${i}"]`);await page.click('button[value="omitida"]');}
    await page.check('input[name="puntuacion"][value="revisar"]');await page.fill('#extras','2');
    await page.click('#confirmarFrase');
  }
  assert.equal(await page.locator('.porcentaje').innerText(),'0%');
  await page.selectOption('#acompanamiento','acompanada');await page.click('#guardar');
  assert.match(await page.locator('#mensaje').innerText(),/No se ha guardado/);
  assert.deepEqual(errors,[]);
  console.log('OK: catálogo, voz controlada/errores, revisión/dudas, resultado, práctica, vista previa sin persistencia, borrador/reanudación/aislamiento, guardado/reintento, historial y consulta, móvil sin desbordamiento.');
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
