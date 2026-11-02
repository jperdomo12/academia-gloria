/* Motor/API/Contexto y ambos lectores reales; SDK, identidad y dispositivos simulados.
 * No certifica Rules desplegadas, micrófono físico ni experiencia familiar. */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { execFileSync } = require("node:child_process");
const { crearEntorno } = require("./helpers/semillas-browser.cjs");
const catalog = require("../mi-universo/creciendo-por-dentro/semillas.json");
const original = JSON.parse(
  execFileSync(
    "git",
    ["show", "be6cfd4:mi-universo/creciendo-por-dentro/semillas.json"],
    { encoding: "utf8" },
  ),
);
const seed = catalog.semillas.find((s) => s.id === "yo-si-puedo");
const legacySeed = original.semillas.find((s) => s.id === seed.id);
const base = process.env.BASE_URL || "http://127.0.0.1:8790";
const dir = "/mi-universo/creciendo-por-dentro/";
const qa = process.env.QA_IMAGES;
const oldSession = {
  semillaId: seed.id,
  titulo: seed.titulo,
  tipoSituacion: "personal",
  respuestaConstruida: "Mi respuesta antigua",
  respuestas: Object.fromEntries(
    legacySeed.pasos.map((s) => [
      s.id,
      s.tipo === "opcion-multiple" ? [s.opciones[0].id] : s.opciones[0].id,
    ]),
  ),
  creadaEn: "2026-10-12T10:00:00Z",
};
const mission = {
  titulo: "Practico mis fortalezas",
  tipo: "actividad_modulo",
  modulo: "creciendo-por-dentro",
  estado: "pendiente",
  visibleParaAlumno: true,
  alumnoId: "alumno",
  ordenMision: 1,
  criterioCumplimiento: {
    tipo: "cantidad",
    evidenciaTipo: "semilla_completada",
    cantidadObjetivo: 1,
    filtros: { semillasIds: [seed.id] },
  },
  progreso: { cantidadActual: 0, cantidadObjetivo: 1, evidenciaIds: [] },
};
const db = (p) => p.evaluate(() => JSON.parse(localStorage.qaDB));
async function put(p, rows) {
  await p.evaluate((rows) => {
    const d = JSON.parse(localStorage.qaDB);
    Object.assign(d, rows);
    localStorage.qaDB = JSON.stringify(d);
  }, rows);
}
async function initMedia(p) {
  await p.addInitScript(() => {
    window.qaSpoken = [];
    window.qaRecognitions = [];
    window.qaStopped = 0;
    window.qaStreams = 0;
    window.SpeechSynthesisUtterance = class {
      constructor(t) {
        this.text = t;
      }
    };
    Object.defineProperty(window, "speechSynthesis", {
      value: {
        cancel() {},
        speak(u) {
          qaSpoken.push(u.text);
          u.onend?.();
        },
      },
    });
    window.SpeechRecognition = class {
      constructor() {
        qaRecognitions.push(this);
      }
      start() {}
      stop() {}
    };
    Object.defineProperty(navigator, "mediaDevices", {
      value: {
        getUserMedia: async () => {
          qaStreams++;
          return {
            getTracks: () => [
              {
                stop() {
                  qaStopped++;
                },
              },
            ],
          };
        },
      },
      configurable: true,
    });
    window.MediaRecorder = class {
      static isTypeSupported() {
        return true;
      }
      constructor(stream) {
        this.stream = stream;
        this.mimeType = "audio/webm";
        this.state = "inactive";
      }
      start() {
        this.state = "recording";
      }
      stop() {
        if (this.state !== "recording") return;
        this.state = "inactive";
        this.ondataavailable?.({
          data: new Blob(["audio simulado"], { type: "audio/webm" }),
        });
        this.onstop?.();
      }
    };
  });
}
async function overflow(p) {
  assert.ok(
    await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    "sin overflow",
  );
}
async function image(p) {
  await p.locator("#experienceContent .seed-illustration img").waitFor();
  await p.waitForFunction(
    () =>
      document.querySelector("#experienceContent .seed-illustration img")
        ?.naturalWidth > 0,
  );
  assert.match(
    await p.locator("#experienceContent img").getAttribute("src"),
    /semilla-003-yo-si-puedo.png$/,
  );
  assert.match(
    await p.locator("#experienceContent img").getAttribute("alt"),
    /espejo/,
  );
}
async function open(p, id = seed.id) {
  await p.goto(base + dir);
  await p.waitForSelector('[data-start-seed="' + id + '"]');
  await p.click('[data-start-seed="' + id + '"]');
}
async function begin(p, scenario) {
  await p.click('[data-start-scenario="' + scenario.id + '"]');
  assert.equal(await p.locator("#scenarioTitle").innerText(), scenario.titulo);
  await image(p);
  await p.click("#continueSeed");
  assert.equal(
    await p.locator(".scene__situation-text").innerText(),
    scenario.situacion.texto,
  );
  await image(p);
  if (qa) {
    for (const width of [1440, 390]) {
      await p.setViewportSize({ width, height: 1000 });
      await overflow(p);
      await p.evaluate(() => document.fonts.ready);
      await p.screenshot({
        path: qa + "/situacion-" + scenario.id + "-" + width + ".png",
        fullPage: true,
      });
    }
  }
  await p.click("#continueSituation");
}
async function answers(p, scenario) {
  for (const step of scenario.pasos) {
    assert.equal(
      await p.locator("#experienceContent h2").innerText(),
      step.titulo,
    );
    for (const o of step.opciones)
      assert.ok((await p.locator(".options").innerText()).includes(o.texto));
    await p.fill("#otherAnswer", "");
    assert.equal(await p.locator("#nextQuestion").isDisabled(), true);
    await p.click('[data-answer="' + step.opciones[0].id + '"]');
    assert.equal(
      await p
        .locator('[data-answer="' + step.opciones[0].id + '"]')
        .getAttribute("aria-pressed"),
      "true",
    );
    assert.equal(
      await p.evaluate(() => document.activeElement.dataset.answer),
      step.opciones[0].id,
    );
    if (step.tipo === "opcion-multiple") {
      for (const o of step.opciones.slice(1))
        await p.click('[data-answer="' + o.id + '"]');
      assert.equal(
        await p.locator(".option.selected").count(),
        Math.min(step.maximo, step.opciones.length),
      );
    }
    await p.fill("#otherAnswer", "Mi respuesta propia <segura> " + step.id);
    await p.click("#nextQuestion");
  }
  await p.waitForSelector("#composedResponse");
  const t = await p.locator("#composedResponse").innerText();
  for (const s of scenario.pasos) {
    assert.ok(t.includes("Mi respuesta propia <segura> " + s.id));
  }
  assert.equal(await p.locator("#composedResponse segura").count(), 0);
  return t;
}
async function save(p, withAudio = false) {
  await p.click("#practiceResponse");
  if (withAudio) {
    await p.click("#startRecording");
    await p.evaluate(() => {
      const result = [{ transcript: "He practicado mis fortalezas" }];
      result.isFinal = true;
      qaRecognitions.at(-1).onresult({ resultIndex: 0, results: [result] });
    });
    await p.click("#stopRecording");
    await p.waitForFunction(
      () => !document.querySelector("#finishRecording").disabled,
    );
    assert.equal(
      await p.locator("#transcript").inputValue(),
      "He practicado mis fortalezas",
    );
    await p.click("#finishRecording");
  } else
    await p.evaluate(() => {
      const b = document.querySelector("#continueWithoutRecording");
      b.onclick();
      b.onclick();
    });
  await p.waitForSelector("#finishSeed");
  await p.locator("#repeatSeed").waitFor();
  await p.locator("#academiaCelebracion").waitFor({ state: "detached" });
}
(async () => {
  assert.equal(catalog.semillas.length, 12);
  assert.equal(catalog.semillas.filter((s) => s.id === seed.id).length, 1);
  for (const s of original.semillas.filter((s) => s.id !== seed.id))
    assert.deepEqual(
      catalog.semillas.find((t) => t.id === s.id),
      s,
    );
  assert.deepEqual(seed.escenarios[0].situacion, legacySeed.situacion);
  assert.deepEqual(seed.escenarios[0].pasos, legacySeed.pasos);
  assert.equal(seed.plantillaRespuesta, legacySeed.plantillaRespuesta);
  assert.equal(seed.escenarios.length, 3);
  assert.deepEqual(
    seed.escenarios.map((s) => s.pasos.map((p) => p.id)),
    Array(3).fill(["logro", "fortaleza", "fraseAmable", "siguientePaso"]),
  );
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_EXECUTABLE,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const learner = await crearEntorno(b, "alumno"),
    p = learner.p;
  await initMedia(p);
  // Fuente tipográfica local para la revisión visual sin depender de Google Fonts.
  if (process.env.QA_FONT_ROOT) {
    let styles = [400, 600, 700, 800, 900]
      .map(
        (w) =>
          `@font-face{font-family:Outfit;font-style:normal;font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(process.env.QA_FONT_ROOT + "/outfit-latin-" + w + "-normal.woff2").toString("base64")})}`,
      )
      .join("");
    await p.route("https://fonts.googleapis.com/**", (r) =>
      r.fulfill({ body: styles, contentType: "text/css" }),
    );
  }
  await p.goto(base + dir);
  await p.waitForSelector('[data-start-seed="yo-si-puedo"]');
  await put(p, { "usuarios/alumno/sesionesSemillas/antigua": oldSession });
  // Pure resolver: legacy fallback, no mutations, explicit unknown never borrows another scenario.
  const result = await p.evaluate(
    async ({ seed, oldSession }) => {
      const m = await import("./escenarios-semilla.js");
      const before = JSON.stringify(seed);
      const legacy = m.resolverSemillaSesion(seed, oldSession);
      const unknown = m.resolverSemillaSesion(seed, {
        escenarioId: "retirado",
        escenarioTitulo: "Escenario retirado",
      });
      const simple = { id: "simple", pasos: [] };
      return {
        legacy: legacy.escenarioId,
        unknownPasos: unknown.pasos,
        unknownTitulo: unknown.escenarioTitulo,
        same: m.resolverEscenario(simple) === simple,
        unchanged: before === JSON.stringify(seed),
      };
    },
    { seed, oldSession },
  );
  assert.deepEqual(result, {
    legacy: seed.escenarioPredeterminadoId,
    unknownPasos: [],
    unknownTitulo: "Escenario retirado",
    same: true,
    unchanged: true,
  });
  await open(p);
  assert.equal(await p.locator("[data-start-scenario]").count(), 3);
  assert.equal(await p.evaluate(() => document.activeElement.tagName), "H2");
  for (const width of [1440, 1024, 768, 390, 320]) {
    await p.setViewportSize({ width, height: 1000 });
    await overflow(p);
    if (qa) await p.evaluate(() => document.fonts.ready);
    await p.screenshot({
      path: qa + "/selector-" + width + ".png",
      fullPage: true,
    });
  }
  await p.emulateMedia({ reducedMotion: "reduce" });
  await p.locator("[data-start-scenario]").first().focus();
  await p.keyboard.press("Enter");
  assert.equal(await p.locator("#continueSeed").count(), 1);
  await p.click("#changeScenario");
  await p.click("#returnToScenario");
  assert.equal(await p.locator("#continueSeed").count(), 1);
  // Three real flows, common composition, own words, no duplicate sessions, audio optional.
  for (let i = 0; i < 3; i++) {
    const s = seed.escenarios[i];
    await open(p);
    await begin(p, s);
    const response = await answers(p, s);
    await p.click("#listenResponse");
    assert.equal(await p.evaluate(() => qaSpoken.at(-1)), response);
    for (const width of [1440, 390, 320]) {
      await p.setViewportSize({ width, height: 1000 });
      await overflow(p);
      if (qa) await p.evaluate(() => document.fonts.ready);
      await p.screenshot({
        path: qa + "/composicion-" + i + "-" + width + ".png",
        fullPage: true,
      });
    }
    await save(p, i === 1);
    const sessions = Object.entries(await db(p)).filter(
      ([k, v]) =>
        k.includes("/sesionesSemillas/") &&
        k !== "usuarios/alumno/sesionesSemillas/antigua",
    );
    assert.equal(sessions.length, i + 1);
    const saved = sessions.find(([, v]) => v.escenarioId === s.id)[1];
    assert.equal(saved.semillaId, seed.id);
    assert.equal(saved.escenarioTitulo, s.titulo);
    assert.equal(saved.tipoSituacion, s.tipoSituacion);
    assert.equal(saved.respuestaConstruida, response);
    assert.equal(!!saved.audioData, i === 1);
    assert.equal(
      saved.transcripcion,
      i === 1 ? "He practicado mis fortalezas" : "",
    );
    assert.ok(!("escenarios" in saved));
    assert.deepEqual(
      (await db(p))["usuarios/alumno/sesionesSemillas/antigua"],
      oldSession,
    );
    await p.click("#repeatSeed");
    assert.equal(await p.locator("#scenarioTitle").innerText(), s.titulo);
    assert.equal(await p.locator("#continueSeed").count(), 1);
  }
  console.log("Tres recorridos guardados");
  // Scenario change: return retains answers, choosing another starts clean; stale dictation ignored.
  await p.click("#continueSeed");
  await p.click("#continueSituation");
  await p.fill("#otherAnswer", "Conservar esta idea");
  await p.click("#dictateOtherAnswer");
  await p.evaluate(() => (window.qaOldRecognition = qaRecognitions.at(-1)));
  await p.click("#changeScenario");
  await p.click("#returnToScenario");
  assert.equal(
    await p.locator("#otherAnswer").inputValue(),
    "Conservar esta idea",
  );
  await p.click("#changeScenario");
  await begin(p, seed.escenarios[0]);
  await p.evaluate(() => {
    const r = [{ transcript: "No mezclar esta respuesta" }];
    r.isFinal = true;
    qaOldRecognition.onresult({ resultIndex: 0, results: [r] });
  });
  assert.equal(await p.locator("#otherAnswer").inputValue(), "");
  assert.equal(await p.locator(".option.selected").count(), 0);
  // Dictation into current own answer still works.
  await p.click("#dictateOtherAnswer");
  await p.evaluate(() => {
    const r = [{ transcript: "Mi idea dictada" }];
    r.isFinal = true;
    qaRecognitions.at(-1).onresult({ resultIndex: 0, results: [r] });
  });
  assert.equal(await p.locator("#otherAnswer").inputValue(), "Mi idea dictada");
  await p.click("#stopOtherDictation");
  console.log("Dictado y cambio completados");
  // Late microphone permission cannot reopen a recording in a different scenario.
  await answers(p, seed.escenarios[0]);
  await p.click("#practiceResponse");
  await p.evaluate(() => {
    navigator.mediaDevices.getUserMedia = () =>
      new Promise((resolve) => (window.qaResolveMic = resolve));
  });
  await p.click("#startRecording");
  await p.click("#changeScenario");
  await p.evaluate(() =>
    qaResolveMic({
      getTracks: () => [
        {
          stop() {
            window.qaLateStreamStopped = true;
          },
        },
      ],
    }),
  );
  await p.waitForFunction(() => window.qaLateStreamStopped);
  assert.equal(await p.locator("[data-start-scenario]").count(), 3);
  await p.click('[data-start-scenario="' + seed.escenarios[2].id + '"]');
  assert.equal(await p.locator("#continueSeed").count(), 1);
  console.log("Permiso tardío cancelado");
  // Historical reconstruction uses scenario, including old IDs and unknown explicit scenario.
  await put(p, {
    "usuarios/alumno/sesionesSemillas/desconocida": {
      ...oldSession,
      escenarioId: "retirado",
      escenarioTitulo: "Escenario retirado",
    },
  });
  const beforeHistory = await db(p);
  await p.click("#showHistory");
  await p.waitForSelector(".history-card");
  assert.equal(await p.locator(".history-card").count(), 5);
  for (const s of seed.escenarios) {
    const card = p
      .locator(".history-card")
      .filter({ has: p.locator(".history-scenario", { hasText: s.titulo }) })
      .last();
    await card
      .locator("details")
      .first()
      .evaluate((e) => (e.open = true));
    assert.ok((await card.innerText()).includes(s.pasos[0].opciones[0].texto));
  }
  const oldCard = p
    .locator(".history-card")
    .filter({ hasText: "Mi respuesta antigua" })
    .filter({ hasText: "Mi trabajo también vale" });
  assert.equal(await oldCard.count(), 1);
  const unknown = p
    .locator(".history-card")
    .filter({ hasText: "Escenario retirado" });
  assert.equal(await unknown.locator(".history-answer").count(), 0);
  assert.deepEqual(await db(p), beforeHistory);
  await p.click("#backToCatalog");
  assert.ok(
    (
      await p.locator(".seed-card").filter({ hasText: seed.titulo }).innerText()
    ).includes("Practicada"),
  );
  await p.click('[data-start-seed="yo-si-puedo"]');
  assert.equal(await p.locator(".scenario-card .badge").count(), 3);
  assert.ok(
    Object.keys(await db(p)).filter((k) => !Object.hasOwn(beforeHistory, k))
      .length === 0,
  );
  console.log("Histórico compatible");
  // Mission stays at semillaId; accepts scenario 3 and writes one standard evidence.
  await put(p, { "usuarios/alumno/tareas/semilla-mision": mission });
  await p.goto(base + dir + "?misionId=semilla-mision");
  await p.waitForSelector("[data-start-scenario]");
  assert.equal(await p.locator("[data-start-scenario]").count(), 3);
  assert.equal(await p.locator("[data-start-seed]").count(), 1);
  await begin(p, seed.escenarios[2]);
  await answers(p, seed.escenarios[2]);
  await save(p);
  // Apartar el puntero del botón anterior antes de pulsar el nuevo cierre.
  await p.mouse.move(0, 0);
  await p.click("#tryOtherScenario");
  assert.equal(await p.locator("[data-start-scenario]").count(), 3);
  const withMission = await db(p);
  const evidences = Object.entries(withMission).filter(
    ([k, v]) => k.includes("/evidencias/") && v.misionId === "semilla-mision",
  );
  assert.equal(evidences.length, 1);
  assert.equal(evidences[0][1].tipo, "semilla_completada");
  assert.equal(evidences[0][1].actividadId, seed.id);
  assert.ok(evidences[0][1].sesionId);
  assert.equal(
    withMission["usuarios/alumno/tareas/semilla-mision"].progreso
      .cantidadActual,
    1,
  );
  assert.ok(!JSON.stringify(evidences[0][1]).includes("escenarioIds"));
  console.log("Misión y evidencia correctas");
  // Same resolver reused in Trabajo realizado; no new source of data.
  await p.goto(
    base +
      "/mi-universo/mis-tareas/trabajo-realizado.html?misionId=semilla-mision",
  );
  await p.waitForSelector("#contenidoTrabajo:not([hidden])");
  await p.waitForFunction(() =>
    document
      .querySelector("#listaEvidencias")
      .textContent.includes("Estoy aprendiendo algo nuevo"),
  );
  assert.ok(
    (await p.locator("#listaEvidencias").textContent()).includes(
      seed.escenarios[2].pasos[0].opciones[0].texto,
    ),
  );
  // Related professional can read all scenario details, cannot practice/write. Family retains management.
  for (const role of ["consulta", "gestion"]) {
    const e = await crearEntorno(b, role);
    await initMedia(e.p);
    await e.p.goto(base + dir);
    await e.p.waitForFunction(() => localStorage.qaDB);
    await put(
      e.p,
      Object.fromEntries(
        Object.entries(withMission).filter(([k]) =>
          /^usuarios\/alumno\/(sesionesSemillas|tareas|evidencias)\//.test(k),
        ),
      ),
    );
    await e.p.reload();
    if (role === "consulta") {
      await e.p.waitForSelector(".history-card");
      assert.equal(await e.p.locator("#startRecommended").isVisible(), false);
      assert.ok(
        (await e.p.locator("#historyPanel").textContent()).includes(
          seed.escenarios[2].titulo,
        ),
      );
      const denied = await e.p.evaluate(async () => {
        const { Academia } = await import("/compartido/api/academia.js?v=2");
        try {
          await Academia.semillas.guardarSesion({
            semillaId: "yo-si-puedo",
            titulo: "Prueba",
          });
          return false;
        } catch {
          return true;
        }
      });
      assert.equal(denied, true);
      assert.equal(await e.p.evaluate(() => window.qaWrites || 0), 0);
    } else {
      await e.p.waitForSelector('[data-start-seed="yo-si-puedo"]');
      await e.p.click('[data-start-seed="yo-si-puedo"]');
      await begin(e.p, seed.escenarios[1]);
      await answers(e.p, seed.escenarios[1]);
      await save(e.p);
      const d = await db(e.p);
      assert.ok(
        Object.keys(d).filter((k) =>
          k.startsWith("usuarios/alumno/sesionesSemillas/"),
        ).length >
          Object.keys(withMission).filter((k) =>
            k.startsWith("usuarios/alumno/sesionesSemillas/"),
          ).length,
      );
      assert.equal(
        Object.keys(d).filter((k) =>
          k.startsWith("usuarios/familiar/sesionesSemillas/"),
        ).length,
        0,
      );
    }
    assert.deepEqual(e.errors, []);
    await e.c.close();
  }
  const invalid = await crearEntorno(b, "consulta", false);
  await invalid.p.goto(base + dir);
  await invalid.p.waitForTimeout(400);
  const context = await invalid.p.evaluate(async () => {
    const { ContextoUsuario } = await import(
      "/compartido/js/contexto-usuario.js"
    );
    const c = await ContextoUsuario.inicializar();
    return { persona: c.personaActiva?.id, propia: c.esPersonaPropia };
  });
  assert.ok(context.persona !== "persona-alumno");
  assert.equal(context.propia, true);
  assert.equal(await invalid.p.locator(".history-card").count(), 0);
  await invalid.c.close();
  assert.ok(
    (await p.evaluate(() => window.qaWritePaths || [])).every((path) =>
      /^usuarios\/alumno\/(sesionesSemillas|evidencias|tareas)\//.test(path),
    ),
  );
  assert.deepEqual(learner.errors, []);
  await learner.c.close();
  await b.close();
  console.log(
    "OK: catálogo 12/una piloto, original exacto y once intactas; tres recorridos, respuestas propias, composición, audio/transcripción simulados, cambio/cancelación, histórico antiguo/nuevo/desconocido sin migración, Practicada, Misión/evidencia/Trabajo realizado, Persona Activa, gestión/consulta/sin relación, teclado/foco/reduced-motion, imagen y 320/390/768/1024/1440. Sin colecciones nuevas.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
