// Cabecera y navegación reales; solo identidad/timeout se sustituyen. Sin Firebase real.
const {chromium}=require('playwright');const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']});const p=await b.newPage({viewport:{width:1280,height:850}});const base=process.env.BASE_URL||'http://127.0.0.1:8765';const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:'',contentType:'text/css'}));
await p.route('**/dictados.js*',r=>r.fulfill({body:'',contentType:'text/javascript'}));
await p.route('**/timeout-sesion.js',r=>r.fulfill({body:'export async function activarTimeoutSesion(){}',contentType:'text/javascript'}));
let panelLoads=0;
await p.route('**/panel-usuario.js',r=>{panelLoads++;return r.fulfill({contentType:'text/javascript',body:`export async function iniciarPanelUsuario({contenedor}){window.panelInicios=(window.panelInicios||0)+1;document.querySelector(contenedor).innerHTML='<button class="panel-usuario__boton">Cuenta de prueba</button>';}`} )});
await p.goto(base+'/mi-universo/rincon-dictados/?modo=vista_previa');await p.waitForSelector('.nav-global');assert.equal(panelLoads,0);assert.match(await p.locator('#nav-panel-usuario').innerText(),/sin sesión/);assert.ok((await p.locator('[data-nav-volver]').getAttribute('href')).endsWith('/mi-universo/index.html'));assert.equal(await p.locator('[data-panel-usuario]').count(),0);
await p.goto(base+'/mi-universo/rincon-dictados/?volver='+encodeURIComponent('/mi-universo/rincon-lectura/'));await p.waitForSelector('.panel-usuario__boton');assert.equal(await p.locator('.nav-global').count(),1);assert.equal(await p.evaluate(()=>window.panelInicios),1);assert.equal(await p.locator('[data-panel-usuario]').count(),0);assert.ok((await p.locator('[data-nav-volver]').getAttribute('href')).includes('/mi-universo/rincon-lectura/'));
assert.equal(await p.locator('.panel-usuario__boton').evaluate(e=>getComputedStyle(e).minHeight),'auto');
await p.click('[data-nav-volver]');await p.waitForURL('**/rincon-lectura/**');
for(const width of [768,390,320]){await p.setViewportSize({width,height:844});await p.goto(base+'/mi-universo/rincon-dictados/?modo=vista_previa');await p.waitForSelector('.nav-global');assert.ok(await p.locator('[data-nav-volver]').isVisible());assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
assert.deepEqual(errors,[]);await b.close();console.log('OK: cabecera canónica única, preview sin Panel/Firebase, Panel único autenticado simulado, estilos aislados, Volver contextual y móvil.');})().catch(e=>{console.error(e);process.exit(1)});
