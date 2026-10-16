/* Fixtures locales: nunca lee el Site ni las líneas base reales de la familia. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const legacy = require('./fixtures/monitor-gaudem-v1.6.json');

(async () => {
  const { generarMarcador } = await import('../herramientas/monitor-gaudem/monitor.mjs');
  const K = 'gaudem6_detalle_v2', KR = 'gaudem6_recursos_v3';
  const origin = 'https://sites.google.com';
  const inicio = origin + '/gaudem.es/sexto/inicio';
  const music = origin + '/gaudem.es/sexto/%C3%A1reas/m%C3%BAsica';
  const instruments = music + '/instrumentos-legendarios';
  const stomp = 'http://www.google.com/url?q=http%3A%2F%2Fstomp.example.test';
  const spaces = Array.from({ length: 14 }, (_, i) => ({ u: origin + '/gaudem.es/sexto/%C3%A1reas/prueba-' + i, n: 'PRUEBA ' + i }));
  spaces.push({ u: music, n: 'MÚSICA' });
  for (const [ruta, nombre] of [['zonas/leng%C3%BCizonas', 'LENGÜIZONAS'], ['zonas/matezonas', 'MATEZONAS'], ['english-zones', 'ENGLISH ZONES']]) spaces.push({ u: origin + '/gaudem.es/sexto/' + ruta, n: nombre });
  const nav = (nuevo, lista = spaces) => {
    const link = s => `<a href="${s.u}">${s.n}</a>`;
    const nuevoLink = `<a href="${instruments}">INSTRUMENTOS LEGENDARIOS</a>`;
    const filas = lista.map(s => s.u === music ? `<li>Música para explorar: ${link(s)}${nuevo ? '<ul><li>' + nuevoLink + '</li></ul>' : ''}</li>` : '<li>' + link(s) + '</li>').join('');
    return `<nav aria-label="Menú global"><ul><li>Lista académica:<ul>${filas}</ul></li></ul><p>Accesos: ${lista.map(link).join(' ')} ${nuevo ? nuevoLink : ''}</p></nav>`;
  };
  const state = (nuevo, opciones = {}) => {
    const lista = opciones.lista || spaces;
    const menu = nav(nuevo, lista);
    const pages = Object.fromEntries(lista.map((s, i) => [s.u, `<html><body>${menu}<main><h1>${s.n}</h1><p>Contenido propio ${spaces.findIndex(x => x.u === s.u)}.</p><iframe src="https://drive.google.com/file/d/estable-${spaces.findIndex(x => x.u === s.u)}/preview?usp=sharing&amp;authuser=0"></iframe><a href="https://colegio.example.test/ficha-${spaces.findIndex(x => x.u === s.u)}.pdf">Ficha escolar</a>${s.u === music ? '<p>Ritmo STOMP</p>' + (opciones.stomp ? `<a href="${stomp}" aria-label="Enlace antiguo"></a>` : '') : ''}${opciones.texto && s.u === lista[0].u ? '<p>Actividad nueva del colegio.</p>' : ''}</main>${opciones.doc && s.u === lista[1].u ? '<script>const recurso="https://drive.google.com/file/d/documento-nuevo/view?usp=sharing";</script>' : ''}</body></html>`]));
    if (nuevo) pages[instruments] = `<html><body>${menu}<main><h1>INSTRUMENTOS LEGENDARIOS</h1></main></body></html>`;
    return { html: `<html><body>${menu}<main><h1>Inicio</h1></main></body></html>`, pages };
  };
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const p = await b.newPage();
  const errors = [];
  p.on('pageerror', e => errors.push(e.message));
  await p.route('https://sites.google.com/**', r => r.fulfill({ body: '<html><body></body></html>', contentType: 'text/html' }));
  await p.goto(inicio);
  await p.evaluate(() => {
    window.qa = { alerts: [], confirm: true, writes: [], calls: [] };
    window.alert = message => qa.alerts.push(message);
    window.confirm = () => qa.confirm;
    window.fetch = async (u, options) => {
      qa.calls.push({ u, options });
      if (qa.fail && u === qa.fail) return { ok: false, url: u };
      return { ok: true, url: qa.redirect || u, text: async () => qa.pages[u] };
    };
    for (const name of ['setItem', 'removeItem', 'clear']) {
      const original = Storage.prototype[name];
      Storage.prototype[name] = function (...args) { qa.writes.push([name, ...args]); return original.apply(this, args); };
    }
  });
  const install = async data => p.evaluate(data => { document.documentElement.innerHTML = data.html; qa.pages = data.pages; qa.fail = ''; qa.redirect = ''; }, data);
  const run = async code => p.evaluate(async code => {
    qa.alerts = []; qa.writes = []; qa.calls = [];
    const source = decodeURIComponent(code.slice('javascript:'.length));
    const result = await new Function(source.startsWith('void ') ? 'return ' + source.slice(5) : 'return ' + source)();
    return { result, alerts: qa.alerts, writes: qa.writes, calls: qa.calls, raw: [localStorage.getItem('gaudem6_detalle_v2'), localStorage.getItem('gaudem6_recursos_v3')] };
  }, code);
  const revisar = generarMarcador(false), aceptar = generarMarcador(true);
  const manual = fs.readFileSync(require('node:path').join(__dirname, '../docs/manuales/MANUAL-MONITOR_NOVEDADES_GAUDEM_6TO.md'), 'utf8');
  assert.ok(manual.includes(revisar)); assert.ok(manual.includes(aceptar));
  assert.ok(!revisar.includes('\n')); assert.ok(!aceptar.includes('\n'));

  // La base se crea ejecutando literalmente el marcador publicado v1.6.
  await install(state(false, { stomp: true }));
  const initial = await run(legacy.aceptar);
  assert.equal(Object.keys(JSON.parse(initial.raw[0]).m).length, 18);
  assert.equal(JSON.parse(initial.raw[0]).m[music].c, undefined);
  const baseline = initial.raw;
  assert.ok(Object.values(JSON.parse(baseline[1]).m).every(x => x.q.length >= 2));
  await install(state(true, { stomp: true }));
  const noisy = await run(legacy.revisar);
  assert.equal((noisy.alerts[0].match(/⚠️ (ÁREA|ZONA)/g) || []).length, 18);
  assert.match(noisy.alerts[0], /INSTRUMENTOS LEGENDARIOS/);
  // Comprobar también las cuentas exactas +4 -3 / docs +0 -0 descritas por la familia.
  const legacyCurrent = await run(legacy.aceptar);
  const old = JSON.parse(baseline[0]), now = JSON.parse(legacyCurrent.raw[0]);
  for (const u of Object.keys(old.m)) {
    assert.equal(now.m[u].t.filter(v => !old.m[u].t.includes(v)).length, 4, u);
    assert.equal(old.m[u].t.filter(v => !now.m[u].t.includes(v)).length, 3, u);
    assert.deepEqual(JSON.parse(legacyCurrent.raw[1]).m[u].q, JSON.parse(baseline[1]).m[u].q);
  }
  await p.evaluate(([k, kr]) => { localStorage.setItem('gaudem6_detalle_v2', k); localStorage.setItem('gaudem6_recursos_v3', kr); }, baseline);
  const clean = await run(revisar);
  assert.equal(clean.result.espacios, 19);
  assert.deepEqual(clean.result.cambios, ['🆕 ÁREA · INSTRUMENTOS LEGENDARIOS']);
  assert.equal(clean.result.sinNavegacion.length, 0);
  assert.ok(clean.result.diagnostico.every(x => x.texto === '+0 -0' && x.docs === '+0 -0' && x.recursos === '+0 -0'));
  assert.deepEqual(clean.raw, baseline); assert.deepEqual(clean.writes, []);
  const repeat = await run(revisar);
  assert.deepEqual(repeat.result, clean.result); assert.deepEqual(repeat.raw, baseline); assert.deepEqual(repeat.writes, []);
  assert.ok(clean.calls.every(x => x.options.credentials === 'include' && x.u.startsWith(origin)));

  await install(state(true)); // STOMP retirado solo de Música: no contaminar el resto.
  const withoutStomp = await run(revisar);
  assert.equal(withoutStomp.result.cambios.length, 2);
  assert.ok(withoutStomp.result.cambios.includes('⚠️ ÁREA · MÚSICA'));
  assert.ok(withoutStomp.result.diagnostico.every(x => x.docs === '+0 -0'));
  assert.deepEqual(withoutStomp.raw, baseline); assert.deepEqual(withoutStomp.writes, []);
  await install(state(true, { texto: true, doc: true }));
  const real = await run(revisar);
  assert.ok(real.result.cambios.includes('⚠️ ÁREA · PRUEBA 0'));
  assert.equal(real.result.diagnostico.find(x => x.espacio === 'PRUEBA 1').docs, '+1 -0');
  assert.deepEqual(real.writes, []);
  await install(state(true, { lista: spaces.filter(s => s.u !== spaces[2].u) }));
  const retired = await run(revisar);
  assert.deepEqual(retired.result.cambios.slice().sort(), ['⚠️ ÁREA · MÚSICA', '🆕 ÁREA · INSTRUMENTOS LEGENDARIOS', '❌ ÁREA · PRUEBA 2 (retirado)'].sort());

  await install(state(true));
  await p.evaluate(() => { qa.confirm = false; });
  const denied = await run(aceptar); assert.deepEqual(denied.raw, baseline); assert.deepEqual(denied.writes, []);
  await p.evaluate(() => { qa.confirm = true; qa.fail = Object.keys(qa.pages)[2]; });
  for (const code of [revisar, aceptar]) { const failed = await run(code); assert.equal(failed.result.error, true); assert.deepEqual(failed.writes, []); assert.deepEqual(failed.raw, baseline); }
  await p.evaluate(() => { qa.fail = ''; qa.redirect = 'https://accounts.google.com/login'; });
  const redirect = await run(revisar); assert.equal(redirect.result.error, true); assert.deepEqual(redirect.writes, []);
  await p.evaluate(() => { qa.redirect = ''; });

  // Un cambio de estructura sin navegación semántica no debe aceptarse a ciegas.
  const sinNav = state(true); sinNav.pages = Object.fromEntries(Object.entries(sinNav.pages).map(([u,h]) => [u,h.replaceAll('<nav aria-label="Menú global">','<div>').replaceAll('</nav>','</div>')]));
  await install(sinNav); const warning = await run(revisar); assert.equal(warning.result.sinNavegacion.length,19); assert.deepEqual(warning.writes,[]);
  const unsafe = await run(aceptar); assert.equal(unsafe.result.error,true); assert.deepEqual(unsafe.writes,[]); assert.deepEqual(unsafe.raw,baseline);
  await install(state(true));

  // Si falla la segunda escritura de Aceptar, restaurar las dos capturas anteriores.
  await p.evaluate(() => {
    qa.setItemOriginal = Storage.prototype.setItem;
    qa.failWrite = true;
    Storage.prototype.setItem = function(k,v) {
      if(k === 'gaudem6_recursos_v3' && qa.failWrite) {qa.failWrite = false;throw new Error('cuota simulada');}
      return qa.setItemOriginal.call(this,k,v);
    };
  });
  const quota = await run(aceptar); assert.equal(quota.result.error,true); assert.deepEqual(quota.raw,baseline);
  await p.evaluate(() => {Storage.prototype.setItem = qa.setItemOriginal;});

  // Aceptación explícita: mismas dos claves, con procedencia de contenido en v2.
  const accepted = await run(aceptar);
  assert.equal(accepted.result.aceptada, true);
  assert.deepEqual(accepted.writes.map(x => x.slice(0, 2)), [['setItem', K], ['setItem', KR]]);
  const acceptedSnapshot = JSON.parse(accepted.raw[0]);
  assert.ok(Object.values(acceptedSnapshot.m).every(x => x.c && Array.isArray(x.t) && Array.isArray(x.q)));
  const stable = await run(revisar); assert.deepEqual(stable.result.cambios, []); assert.deepEqual(stable.writes, []);
  // Cambiar navegación sin tocar contenido no altera una base ya aceptada en 1.7.
  const renamed = state(true); renamed.html = renamed.html.replaceAll('Música para explorar', 'Un menú diferente');
  renamed.pages = Object.fromEntries(Object.entries(renamed.pages).map(([u, h]) => [u, h.replaceAll('Música para explorar', 'Un menú diferente')]));
  await install(renamed); const menuChange = await run(revisar); assert.deepEqual(menuChange.result.cambios, []);
  // No ocultar un cambio propio por coincidir con una etiqueta del menú.
  renamed.pages[music] = renamed.pages[music].replace('<h1>MÚSICA</h1>', '');
  await install(renamed); const ownTitleRemoved = await run(revisar); assert.deepEqual(ownTitleRemoved.result.cambios, ['⚠️ ÁREA · MÚSICA']);

  await install(state(true));
  // Ejecutar la URL codificada real, no solo su función decodificada.
  await p.evaluate(url => { qa.alerts = []; qa.writes = []; location.href = url; }, revisar);
  await p.waitForFunction(() => qa.alerts.length > 0);
  assert.match(await p.evaluate(() => qa.alerts[0]), /1.7-rc1/); assert.deepEqual(await p.evaluate(() => qa.writes), []);
  assert.equal(p.url(), inicio);
  await p.evaluate(() => { localStorage.removeItem('gaudem6_recursos_v3'); });
  const noDocumentBase = await run(revisar); assert.ok(noDocumentBase.result.diagnostico.every(x => x.docs === 'pendiente de inicializar')); assert.deepEqual(noDocumentBase.writes, []);
  await p.evaluate(() => { localStorage.removeItem('gaudem6_detalle_v2'); });
  const noBase = await run(revisar); assert.match(noBase.alerts[0], /No encuentro la línea base/); assert.deepEqual(noBase.writes, []);
  assert.deepEqual(errors, []);
  await b.close();
  console.log('OK: base v1.6 real del marcador sobre fixtures, 18 falsos +4 -3 eliminados, página nueva vacía, STOMP solo Música, docs sin cambios y documento nuevo, repetición estable, retirados, cero escrituras al revisar, aceptar/cancelar/errores y dos claves compatibles. Prueba autenticada real pendiente.');
})().catch(error => { console.error(error); process.exit(1); });
