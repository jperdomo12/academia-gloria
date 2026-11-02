/* Formulario, Mi Camino, Motor, API, ContextoUsuario e históricos reales.
 * Identidad, SDK y medios externos controlados; no certifica Rules desplegadas. */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { crearEntorno } = require("./helpers/semillas-browser.cjs");
const base = process.env.BASE_URL || "http://127.0.0.1:8806",
  dir = "/mi-universo/creciendo-por-dentro/";
const catalog = require("../mi-universo/creciendo-por-dentro/semillas.json"),
  seed = catalog.semillas.find((s) => s.id === "yo-si-puedo"),
  simple = catalog.semillas.find((s) => !s.escenarios);
const scenarios = seed.escenarios,
  qa = process.env.QA_IMAGES;
const db = (p) => p.evaluate(() => JSON.parse(localStorage.qaDB));
async function put(p, rows) {
  await p.evaluate((rows) => {
    const d = JSON.parse(localStorage.qaDB);
    Object.assign(d, rows);
    localStorage.qaDB = JSON.stringify(d);
  }, rows);
}
const tasks = (d) =>
  Object.entries(d).filter(([k]) => k.startsWith("usuarios/alumno/tareas/"));
async function click(p, selector) {
  await p.mouse.move(0, 0);
  await p.click(selector);
}
async function fonts(p) {
  if (!process.env.QA_FONT_ROOT) return;
  const css = [400, 600, 700, 800, 900]
    .map(
      (w) =>
        `@font-face{font-family:Outfit;font-style:normal;font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(process.env.QA_FONT_ROOT + "/outfit-latin-" + w + "-normal.woff2").toString("base64")})}`,
    )
    .join("");
  await p.route("https://fonts.googleapis.com/**", (r) =>
    r.fulfill({ body: css, contentType: "text/css" }),
  );
}
async function form(p) {
  await p.goto(base + "/mi-universo/mis-tareas/");
  await p.waitForFunction(
    () => document.querySelector("#semillaPrimera")?.options.length > 1,
  );
  await click(p, '[data-tab="crear"]');
  await p.selectOption("#tipo", "actividad_modulo");
  await p.selectOption("#modulo", "creciendo-por-dentro");
}
async function save(p) {
  await click(p, "#guardarTarea");
  await p.waitForFunction(() =>
    document
      .querySelector("#mensajeFormulario")
      .textContent.includes("Tarea guardada"),
  );
}
async function create(p, scenario = "") {
  await form(p);
  await p.selectOption("#semillaPrimera", seed.id);
  if (scenario) await p.selectOption("#escenarioSemilla", scenario);
  const before = tasks(await db(p)).map(([k]) => k);
  await save(p);
  const added = tasks(await db(p)).filter(([k]) => !before.includes(k));
  assert.equal(added.length, 1);
  return added[0][0].split("/").at(-1);
}
async function edit(p, id, view = false) {
  await p.goto(base + "/mi-universo/mis-tareas/");
  await p.waitForFunction(
    () => document.querySelector("#semillaPrimera")?.options.length > 1,
  );
  if (view) await click(p, '[data-filter="completadas"]');
  const button = p.locator(
    `[data-action="${view ? "view" : "edit"}"][data-id="${id}"]`,
  );
  const card = p.locator(".tarea-card").filter({ has: button });
  for (let page = 0; page < 10 && !(await card.isVisible()); page++) {
    const next = p.locator('[data-pagina-delta="1"]');
    assert.equal(await next.isEnabled(), true);
    await click(p, '[data-pagina-delta="1"]');
  }
  await card
    .locator("summary")
    .first()
    .evaluate((e) => (e.parentElement.open = true));
  await click(p, `[data-action="${view ? "view" : "edit"}"][data-id="${id}"]`);
  await p.waitForFunction(
    (id) => document.querySelector("#tareaId").value === id,
    id,
  );
  if (!(await p.locator("[data-acordeon=informacion]").evaluate((e) => e.open)))
    await click(p, "[data-acordeon=informacion] > summary");
}
async function snapshot(p, label, selector) {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await p.setViewportSize({ width, height: 1000 });
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      label + " " + width,
    );
    if (label === "gestion") {
      assert.equal(await p.evaluate(() => Boolean(document.querySelector("#campoEscenarioSemilla").compareDocumentPosition(document.querySelector("#semillaSegunda").closest("label")) & Node.DOCUMENT_POSITION_FOLLOWING)), true);
    }
    if (qa) {
      await p.evaluate(() => document.fonts.ready);
      await p
        .locator(selector)
        .screenshot({ path: qa + "/" + label + "-" + width + ".png" });
    }
  }
}
async function complete(p, definition) {
  await click(p, "#continueSeed");
  await click(p, "#continueSituation");
  for (const step of definition.pasos) {
    await click(p, '[data-answer="' + step.opciones[0].id + '"]');
    if (step.otraRespuesta)
      await p.fill("#otherAnswer", "Con mis palabras " + step.id);
    await click(p, "#nextQuestion");
  }
  await p.waitForSelector("#composedResponse");
  await click(p, "#practiceResponse");
  await click(p, "#continueWithoutRecording");
  await p.waitForSelector("#finishSeed");
  await p.locator("#academiaCelebracion").waitFor({ state: "detached" });
}
async function apiEvidence(p, value) {
  return p.evaluate(async (value) => {
    const { Academia } = await import("/compartido/api/academia.js?v=3");
    try {
      return {
        ok: true,
        value: await Academia.evidencias.registrarParaMision(value),
      };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }, value);
}
function evidence(
  id,
  scenario,
  activity = seed.id,
  session = "test-" + Date.now(),
) {
  return {
    misionId: id,
    modulo: "creciendo-por-dentro",
    tipo: "semilla_completada",
    actividadId: activity,
    sesionId: session,
    atributos: {
      semillasIds: [seed.id],
      ...(scenario
        ? {
            escenarioId: scenario,
            escenarioTitulo: "Título legible sin valor de identidad",
          }
        : {}),
    },
    resultado: { titulo: "Prueba controlada" },
  };
}
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_EXECUTABLE,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const adult = await crearEntorno(b, "gestion"),
    p = adult.p;
  await fonts(p);
  await p.emulateMedia({ reducedMotion: "reduce" });
  // Crear y editar libre/fijada mediante el formulario real.
  await form(p);
  assert.equal(await p.locator("#campoSegundaSemilla").isVisible(), false);
  await p.fill("#cantidadSemillas", "2");
  assert.equal(await p.locator("#campoSegundaSemilla").isVisible(), true);
  await p.selectOption("#semillaSegunda", simple.id);
  await p.fill("#cantidadSemillas", "1");
  assert.equal(await p.locator("#campoSegundaSemilla").isVisible(), false);
  assert.equal(await p.inputValue("#semillaSegunda"), simple.id);
  assert.ok(!(await p.locator("#resumenCriterioSemillas").innerText()).includes(simple.titulo));
  const beforeSingle = tasks(await db(p)).map(([key]) => key);
  await save(p);
  const singleWithoutHidden = tasks(await db(p)).find(([key]) => !beforeSingle.includes(key))[1];
  assert.deepEqual(singleWithoutHidden.criterioCumplimiento.filtros, {});
  const free = await create(p);
  let d = await db(p);
  assert.deepEqual(
    d["usuarios/alumno/tareas/" + free].criterioCumplimiento.filtros,
    { semillasIds: [seed.id] },
  );
  assert.equal(d["usuarios/alumno/tareas/" + free].titulo, seed.titulo);
  const fixed = await create(p, scenarios[1].id);
  d = await db(p);
  assert.equal(
    d["usuarios/alumno/tareas/" + fixed].criterioCumplimiento.filtros
      .escenarioId,
    scenarios[1].id,
  );
  assert.match(
    d["usuarios/alumno/tareas/" + fixed].presentacionAlumno.descripcionMision,
    /Algo del cole/,
  );
  assert.equal(d["usuarios/alumno/tareas/" + fixed].titulo, `${seed.titulo} · ${scenarios[1].titulo}`);
  assert.equal(d["usuarios/alumno/tareas/" + fixed].presentacionAlumno.tituloMision, `${seed.titulo} · ${scenarios[1].titulo}`);
  // Edición de una Misión pendiente anterior al ajuste, sin migración automática.
  await put(p, { ["usuarios/alumno/tareas/" + fixed]: { ...d["usuarios/alumno/tareas/" + fixed], titulo: seed.titulo } });
  await edit(p, free);
  assert.equal(await p.inputValue("#escenarioSemilla"), "");
  await p.selectOption("#escenarioSemilla", scenarios[2].id);
  assert.equal(await p.inputValue("#titulo"), `${seed.titulo} · ${scenarios[2].titulo}`);
  await save(p);
  await edit(p, free);
  assert.equal(await p.inputValue("#escenarioSemilla"), scenarios[2].id);
  await p.selectOption("#escenarioSemilla", "");
  assert.equal(await p.inputValue("#titulo"), seed.titulo);
  await save(p);
  assert.ok(
    !(
      "escenarioId" in
      (await db(p))["usuarios/alumno/tareas/" + free].criterioCumplimiento
        .filtros
    ),
  );
  await edit(p, fixed);
  assert.equal(await p.inputValue("#titulo"), `${seed.titulo} · ${scenarios[1].titulo}`);
  assert.equal((await db(p))["usuarios/alumno/tareas/" + fixed].titulo, seed.titulo);
  assert.equal(await p.inputValue("#semillaPrimera"), seed.id);
  assert.equal(await p.inputValue("#escenarioSemilla"), scenarios[1].id);
  assert.equal(await p.locator("#escenarioSemilla option").count(), 4);
  await p.selectOption("#escenarioSemilla", scenarios[2].id);
  await save(p);
  await edit(p, fixed);
  assert.equal(await p.inputValue("#escenarioSemilla"), scenarios[2].id);
  await p.selectOption("#escenarioSemilla", scenarios[1].id);
  await save(p);
  await edit(p, fixed);
  await snapshot(p, "gestion", "#configuracionSemillas");
  await p.locator("#escenarioSemilla").focus();
  await p.keyboard.press("Home");
  await p.keyboard.press("ArrowDown");
  await p.keyboard.press("Tab");
  assert.ok(await p.inputValue("#escenarioSemilla"));
  // Cambiar Semilla, cantidad, módulo o tipo no conserva un escenario huérfano.
  await p.selectOption("#semillaPrimera", simple.id);
  assert.equal(await p.locator("#campoEscenarioSemilla").isVisible(), false);
  assert.equal(await p.inputValue("#escenarioSemilla"), "");
  assert.match(
    await p.locator("#mensajeFormulario").innerText(),
    /quitado la situación/,
  );
  await p.selectOption("#semillaPrimera", seed.id);
  assert.equal(await p.inputValue("#escenarioSemilla"), "");
  await p.selectOption("#escenarioSemilla", scenarios[1].id);
  await p.fill("#cantidadSemillas", "2");
  assert.equal(await p.inputValue("#escenarioSemilla"), "");
  assert.equal(await p.locator("#campoEscenarioSemilla").isVisible(), false);
  await p.fill("#cantidadSemillas", "1");
  assert.equal(await p.inputValue("#escenarioSemilla"), "");
  await p.fill("#cantidadSemillas", "2");
  await p.selectOption("#semillaSegunda", simple.id);
  await save(p);
  const multi = fixed;
  await edit(p, multi);
  assert.equal(await p.locator("#campoSegundaSemilla").isVisible(), true);
  assert.equal(await p.inputValue("#semillaSegunda"), simple.id);
  assert.deepEqual(
    (await db(p))["usuarios/alumno/tareas/" + multi].criterioCumplimiento
      .filtros,
    { semillasIds: [seed.id, simple.id] },
  );
  const fixedExecution = await create(p, scenarios[1].id);
  await edit(p, fixedExecution);
  await p.selectOption("#modulo", "rincon-lectura");
  assert.equal(await p.inputValue("#escenarioSemilla"), "");
  assert.match(
    await p.locator("#mensajeFormulario").innerText(),
    /quitado la situación/,
  );
  await p.selectOption("#modulo", "creciendo-por-dentro");
  assert.equal(await p.inputValue("#escenarioSemilla"), "");
  await p.selectOption("#escenarioSemilla", scenarios[1].id);
  await p.selectOption("#semillaPrimera", "");
  assert.equal(await p.locator("#campoEscenarioSemilla").isVisible(), false);
  assert.equal(await p.inputValue("#escenarioSemilla"), "");
  console.log(
    "OK gestión: libre/fijada, edición/restauración, cambio de escenario/Semilla/módulo y múltiples.",
  );
  // Escenario desaparecido: se conserva al abrir; el adulto debe decidir antes de cambiarlo.
  const template = (await db(p))["usuarios/alumno/tareas/" + fixedExecution];
  const missing = {
    ...template,
    criterioCumplimiento: {
      ...template.criterioCumplimiento,
      filtros: { semillasIds: [seed.id], escenarioId: "no-disponible" },
    },
  };
  await put(p, {
    "usuarios/alumno/tareas/orphan": missing,
    "usuarios/alumno/tareas/orphan-exec": missing,
    "usuarios/alumno/tareas/started": { ...template, estado: "en_curso" },
    "usuarios/alumno/tareas/historical": { ...template, estado: "completada" },
  });
  await edit(p, "orphan");
  assert.equal(await p.inputValue("#escenarioSemilla"), "no-disponible");
  assert.match(
    await p.locator("#ayudaEscenarioSemilla").innerText(),
    /No se ha sustituido/,
  );
  assert.equal(
    await p.locator("#escenarioSemilla").evaluate((e) => e.checkValidity()),
    false,
  );
  const beforeUnknown = await db(p);
  await click(p, "#guardarTarea");
  assert.deepEqual(await db(p), beforeUnknown);
  await p.selectOption("#escenarioSemilla", "");
  await save(p);
  assert.ok(
    !(
      "escenarioId" in
      (await db(p))["usuarios/alumno/tareas/orphan"].criterioCumplimiento
        .filtros
    ),
  );
  await edit(p, "started");
  assert.equal(await p.locator("#escenarioSemilla").isDisabled(), true);
  assert.equal(await p.locator("#semillaPrimera").isDisabled(), true);
  assert.equal(await p.inputValue("#escenarioSemilla"), scenarios[1].id);
  // Histórico de la Misión no permite cambiar su objetivo.
  const beforeHistorical = await db(p);
  await edit(p, "historical", true);
  assert.equal(await p.locator("#escenarioSemilla").isDisabled(), true);
  assert.equal(await p.locator("#guardarTarea").isVisible(), false);
  assert.deepEqual(await db(p), beforeHistorical);
  const familyData = await db(p);
  const learner = await crearEntorno(b, "alumno"),
    l = learner.p;
  await fonts(l);
  await l.emulateMedia({ reducedMotion: "reduce" });
  await l.goto(base + dir);
  await l.waitForSelector("[data-start-seed]");
  await put(
    l,
    Object.fromEntries(
      Object.entries(familyData).filter(([k]) =>
        /^usuarios\/alumno\/(tareas|sesionesSemillas|evidencias)\//.test(k),
      ),
    ),
  );
  // Misión libre: selector y evidencia contextual real.
  await l.goto(base + dir + "?misionId=" + free);
  await l.waitForSelector("[data-start-scenario]");
  assert.equal(await l.locator("[data-start-scenario]").count(), 3);
  await click(l, '[data-start-scenario="' + scenarios[2].id + '"]');
  await complete(l, scenarios[2]);
  let ld = await db(l);
  let evs = Object.entries(ld).filter(
    ([k, v]) => k.includes("/evidencias/") && v.misionId === free,
  );
  assert.equal(evs.length, 1);
  assert.equal(evs[0][1].atributos.escenarioId, scenarios[2].id);
  assert.equal(evs[0][1].atributos.escenarioTitulo, scenarios[2].titulo);
  assert.equal(ld["usuarios/alumno/tareas/" + free].progreso.cantidadActual, 1);
  // API rechaza escenario incorrecto/ausente y Semilla incorrecta sin escribir.
  for (const ev of [
    evidence(fixedExecution, scenarios[0].id),
    evidence(fixedExecution, ""),
    evidence(fixedExecution, scenarios[1].id, simple.id),
  ]) {
    const before = await db(l);
    const result = await apiEvidence(l, ev);
    assert.equal(result.ok, false);
    assert.deepEqual(await db(l), before);
  }
  // Mi Camino conserva misionId/volver; no añade otra selección.
  await l.goto(base + "/mi-universo/mi-camino/");
  await l.waitForSelector('[data-iniciar-mision="' + fixedExecution + '"]');
  await click(l, '[data-iniciar-mision="' + fixedExecution + '"]');
  await l.waitForSelector("#continueSeed");
  assert.ok(
    new URL(l.url()).searchParams
      .get("volver")
      .includes("/mi-universo/mi-camino/"),
  );
  assert.equal(new URL(l.url()).searchParams.get("misionId"), fixedExecution);
  assert.equal(await l.locator("[data-start-scenario]").count(), 0);
  assert.equal(
    await l.locator("#scenarioTitle").innerText(),
    scenarios[1].titulo,
  );
  assert.equal(
    await l.locator("#scenarioLabel").innerText(),
    "Situación de esta Misión",
  );
  assert.equal(await l.locator("#changeScenario").isVisible(), false);
  await l.evaluate(() => document.querySelector("#changeScenario").onclick());
  assert.equal(await l.locator("#continueSeed").count(), 1);
  await snapshot(l, "ejecucion-fijada", "#scenarioContext");
  await complete(l, scenarios[1]);
  assert.equal(await l.locator("#tryOtherScenario").count(), 0);
  await click(l, "#repeatSeed");
  assert.equal(await l.locator("[data-start-scenario]").count(), 0);
  assert.equal(
    await l.locator("#scenarioTitle").innerText(),
    scenarios[1].titulo,
  );
  ld = await db(l);
  evs = Object.entries(ld).filter(
    ([k, v]) => k.includes("/evidencias/") && v.misionId === fixedExecution,
  );
  assert.equal(evs.length, 1);
  const actual = evs[0][1];
  assert.equal(actual.atributos.escenarioId, scenarios[1].id);
  assert.equal(actual.atributos.escenarioTitulo, scenarios[1].titulo);
  assert.equal(
    ld["usuarios/alumno/tareas/" + fixedExecution].progreso.cantidadActual,
    1,
  );
  assert.equal(
    ld["usuarios/alumno/tareas/" + fixedExecution].estado,
    "pendiente_validacion",
  );
  const beforeReplay = await db(l);
  const replay = await apiEvidence(l, actual);
  assert.equal(replay.ok, true);
  assert.equal(replay.value.duplicada, true);
  const afterReplay = await db(l);
  assert.equal(
    afterReplay["usuarios/alumno/tareas/" + fixedExecution].progreso
      .cantidadActual,
    1,
  );
  assert.deepEqual(
    afterReplay["usuarios/alumno/tareas/" + fixedExecution].progreso
      .evidenciaIds,
    beforeReplay["usuarios/alumno/tareas/" + fixedExecution].progreso
      .evidenciaIds,
  );
  assert.deepEqual(
    Object.entries(afterReplay).filter(
      ([k]) => k.includes("/evidencias/") || k.includes("/sesionesSemillas/"),
    ),
    Object.entries(beforeReplay).filter(
      ([k]) => k.includes("/evidencias/") || k.includes("/sesionesSemillas/"),
    ),
  );
  console.log(
    "OK ejecución/evidencia: libre, fijada desde Mi Camino, restricciones, rechazo de desvíos y no doble contabilización.",
  );
  // Ver trabajo sigue siendo el visor existente, de solo lectura y con escenario real.
  const beforeReview = await db(l);
  await l.goto(
    base +
      "/mi-universo/mis-tareas/trabajo-realizado.html?misionId=" +
      fixedExecution +
      "&volver=" +
      encodeURIComponent("/mi-universo/mi-camino/"),
  );
  await l.waitForFunction(() =>
    document
      .querySelector("#listaEvidencias")
      ?.textContent.includes("Algo del cole"),
  );
  const review = await l.locator("#listaEvidencias").textContent();
  assert.ok(review.includes("Con mis palabras logro"));
  assert.ok(review.includes("Mi frase"));
  assert.deepEqual(await db(l), beforeReview);
  await l.goto(base + dir + "?vista=historial");
  await l.waitForSelector(".history-card");
  assert.ok(
    (await l.locator("#historyPanel").textContent()).includes(
      scenarios[1].titulo,
    ),
  );
  assert.deepEqual(await db(l), beforeReview);
  await l.goto(base + dir + "?misionId=orphan-exec");
  await l.waitForFunction(() =>
    document
      .querySelector("#missionDescription")
      ?.textContent.includes("ya no está disponible"),
  );
  assert.equal(await l.locator("[data-start-scenario]").count(), 0);
  assert.equal(await l.locator("[data-start-seed]").count(), 0);
  assert.equal(await l.locator("#startRecommended").isVisible(), false);
  assert.deepEqual(await db(l), beforeReview);
  // Fuera de Misión se mantienen las tres opciones y cambio de situación.
  await l.goto(base + dir);
  await click(l, '[data-start-seed="yo-si-puedo"]');
  assert.equal(await l.locator("[data-start-scenario]").count(), 3);
  await click(l, '[data-start-scenario="' + scenarios[0].id + '"]');
  assert.equal(await l.locator("#changeScenario").isVisible(), true);
  assert.equal(
    await l.locator("#scenarioLabel").innerText(),
    "Situación elegida",
  );
  // Misión múltiple conserva selección por Semilla y criterio sin escenario.
  await l.goto(base + dir + "?misionId=" + multi);
  await l.waitForSelector("[data-start-seed]");
  assert.equal(await l.locator("[data-start-seed]").count(), 2);
  await click(l, '[data-start-seed="yo-si-puedo"]');
  await click(l, '[data-start-scenario="' + scenarios[0].id + '"]');
  await complete(l, scenarios[0]);
  assert.equal(
    (await db(l))["usuarios/alumno/tareas/" + multi].progreso.cantidadActual,
    1,
  );
  await click(l, "#finishSeed");
  await click(l, '[data-start-seed="' + simple.id + '"]');
  assert.equal(await l.locator("[data-start-scenario]").count(), 0);
  await complete(l, simple);
  assert.equal(
    (await db(l))["usuarios/alumno/tareas/" + multi].progreso.cantidadActual,
    2,
  );
  const simpleEv = Object.entries(await db(l)).find(
    ([k, v]) =>
      k.includes("/evidencias/") &&
      v.misionId === multi &&
      v.actividadId === simple.id,
  )[1];
  assert.ok(!("escenarioId" in simpleEv.atributos));
  // Contrato legacy sin escenario: no se añaden campos retrospectivos.
  const legacy = {
    ...template,
    criterioCumplimiento: {
      ...template.criterioCumplimiento,
      filtros: { semillasIds: [seed.id] },
    },
  };
  await put(l, { "usuarios/alumno/tareas/legacy": legacy });
  const accepted = await apiEvidence(
    l,
    evidence("legacy", "", seed.id, "sesion-legacy-controlada"),
  );
  assert.equal(accepted.ok, true);
  const oldEv = Object.entries(await db(l)).find(
    ([k, v]) => k.includes("/evidencias/") && v.misionId === "legacy",
  )[1];
  assert.ok(!("escenarioId" in oldEv.atributos));
  assert.ok(!("escenarioTitulo" in oldEv.atributos));
  // Consulta relacionada conserva lectura; no recibe gestión ni escritura.
  const consultation = await crearEntorno(b, "consulta"),
    r = consultation.p;
  await r.goto(base + dir);
  await r.waitForFunction(() => localStorage.qaDB);
  await put(
    r,
    Object.fromEntries(
      Object.entries(await db(l)).filter(([k]) =>
        /^usuarios\/alumno\/(tareas|sesionesSemillas|evidencias)\//.test(k),
      ),
    ),
  );
  await r.reload();
  await r.waitForSelector(".history-card");
  assert.equal(await r.locator("#startRecommended").isVisible(), false);
  const denied = await r.evaluate(async () => {
    const { Academia } = await import("/compartido/api/academia.js?v=3");
    try {
      await Academia.tareas.actualizar("legacy", { criterioCumplimiento: {} });
      return false;
    } catch {
      return true;
    }
  });
  assert.equal(denied, true);
  assert.equal(await r.evaluate(() => window.qaWrites || 0), 0);
  await r.goto(base + "/mi-universo/mis-tareas/");
  await r.waitForURL((url) => !url.pathname.includes("/mis-tareas/"));
  assert.equal(await r.evaluate(() => window.qaWrites || 0), 0);
  assert.ok(
    (await l.evaluate(() => window.qaWritePaths || [])).every((path) =>
      /^usuarios\/alumno\/(sesionesSemillas|evidencias|tareas)\//.test(path),
    ),
  );
  assert.deepEqual(adult.errors, []);
  assert.deepEqual(learner.errors, []);
  assert.deepEqual(consultation.errors, []);
  await adult.c.close();
  await learner.c.close();
  await consultation.c.close();
  await b.close();
  console.log(
    "OK: Misiones Semillas libres/fijadas, gestión/edición/huérfano/bloqueo, Mi Camino, evidencia correcta/incorrecta/legacy/idempotencia, múltiples, práctica libre, históricos/consulta/permisos, Persona Activa y responsive. Sin colecciones nuevas.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
