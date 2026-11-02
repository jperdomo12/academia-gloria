/* Contenido contra fuente aprobada + Motor/API/lectores reales.
 * SDK, identidad y voz controlados; sin usuarios/datos de producción. */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { execFileSync } = require("node:child_process");
const { crearEntorno } = require("./helpers/semillas-browser.cjs");
const catalog = require("../mi-universo/creciendo-por-dentro/semillas.json");
const before = JSON.parse(
  execFileSync(
    "git",
    ["show", "78fc64b:mi-universo/creciendo-por-dentro/semillas.json"],
    { encoding: "utf8" },
  ),
);
const source = fs.readFileSync(
  "docs/product/DESIGN-SEMILLAS_MULTI_ESCENARIO_AMPLIACION_001_004_007_010_011.md",
  "utf8",
);
const numbers = ["001", "004", "007", "010", "011"];
const ids = [
  "aprendo-a-decir-lo-que-siento",
  "nos-escuchamos-y-buscamos-un-acuerdo",
  "puedo-elegir-diferente",
  "un-momento-para-mi-esta-bien",
  "puedo-aceptar-apoyo-y-seguir-siendo-capaz",
];
const defaults = [
  "el-lapiz",
  "las-dos-queremos-jugar-primero",
  "hoy-yo-prefiero-otra-cosa",
  "necesito-un-ratito-tranquilo",
  "me-ofrecen-una-pista",
];
const base = process.env.BASE_URL || "http://127.0.0.1:8826",
  dir = "/mi-universo/creciendo-por-dentro/",
  qa = process.env.QA_IMAGES;
const widths = [320, 390, 768, 1024, 1440];
async function click(p, s) {
  await p.mouse.move(0, 0);
  await p.click(s);
}
const db = (p) => p.evaluate(() => JSON.parse(localStorage.qaDB));
async function shot(p, label, selector) {
  for (const width of widths) {
    await p.setViewportSize({ width, height: 1000 });
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      label + " " + width,
    );
    if (qa) {
      await p.evaluate(() => document.fonts.ready);
      await p
        .locator(selector)
        .screenshot({ path: qa + "/" + label + "-" + width + ".png" });
    }
  }
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
(async () => {
  assert.equal(catalog.semillas.length, 12);
  assert.equal(catalog.version, "1.12");
  assert.deepEqual(
    catalog.semillas
      .filter((s) => s.escenarios)
      .map((s) => s.id)
      .sort(),
    [...ids, "yo-si-puedo"].sort(),
  );
  for (const old of before.semillas) {
    const seed = catalog.semillas.find((s) => s.id === old.id);
    if (!ids.includes(old.id)) {
      assert.deepEqual(seed, old);
      continue;
    }
    const original = seed.escenarios[0];
    assert.equal(
      seed.escenarioPredeterminadoId,
      defaults[ids.indexOf(seed.id)],
    );
    assert.equal(original.id, seed.escenarioPredeterminadoId);
    assert.deepEqual(original.situacion, old.situacion);
    assert.deepEqual(original.pasos, old.pasos);
    assert.equal(original.tipoSituacion, old.tipoSituacion);
    const common = structuredClone(seed);
    delete common.escenarios;
    delete common.escenarioPredeterminadoId;
    assert.deepEqual(common, (({ situacion, pasos, ...rest }) => rest)(old));
    const section = source.match(
      new RegExp(
        "## \\d+\\. Semilla " +
          numbers[ids.indexOf(seed.id)] +
          "\\b[\\s\\S]*?(?=\\n## |$)",
      ),
    )[0];
    const blocks = [
      ...section.matchAll(
        /### Nuevo escenario · ([^\n]+)\n([\s\S]*?)(?=\n### |\n\*\*Frontera|$)/g,
      ),
    ];
    assert.equal(blocks.length, 2);
    assert.equal(seed.escenarios.length, 3);
    for (let i = 0; i < 2; i++) {
      const [_, title, body] = blocks[i],
        sc = seed.escenarios[i + 1];
      const meta = (k) =>
        body.match(new RegExp("- \\*\\*" + k + ":\\*\\* `([^`]+)`"))[1];
      assert.equal(sc.id, meta("id"));
      assert.equal(sc.titulo, title);
      assert.equal(sc.descripcion, meta("descripción"));
      assert.equal(sc.tipoSituacion, meta("tipoSituacion"));
      assert.equal(sc.situacion.texto, meta("situación"));
      assert.equal(sc.situacion.audioTexto, meta("situación"));
      const steps = [
        ...body.matchAll(
          /^\*\*([^*\n]+)\*\*\n([\s\S]*?)(?=\n\*\*|(?![\s\S]))/gm,
        ),
      ];
      assert.equal(steps.length, sc.pasos.length);
      steps.forEach((match, index) => {
        const text = match[2];
        const options = text
          .split("\n")
          .filter(
            (l) => l.startsWith("- ") && l !== "- otra respuesta permitida",
          )
          .map((l) =>
            l
              .slice(2)
              .replace(/ · recomendada$/, "")
              .replace(/^`|`$/g, ""),
          );
        assert.deepEqual(
          sc.pasos[index].opciones.map((o) => o.texto),
          options,
        );
        assert.equal(sc.pasos[index].id, old.pasos[index].id);
        assert.equal(sc.pasos[index].tipo, old.pasos[index].tipo);
        assert.equal(sc.pasos[index].maximo, old.pasos[index].maximo);
        assert.equal(sc.pasos[index].otraRespuesta, true);
        assert.equal(
          new Set(sc.pasos[index].opciones.map((o) => o.id)).size,
          options.length,
        );
        if (seed.id === ids[0] && index === 0)
          assert.deepEqual(
            sc.pasos[index].opciones.map((o) => o.recomendada),
            [true, false, false],
          );
      });
    }
  }
  console.log(
    "OK contenido: diez escenarios idénticos a la fuente; originales/IDs/plantillas exactos, seis objetos restantes y 003 intactos.",
  );
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_EXECUTABLE,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const e = await crearEntorno(b, "alumno"),
    p = e.p;
  await fonts(p);
  await p.addInitScript(() => {
    window.qaSpoken = [];
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
  });
  await p.goto(base + dir);
  await p.waitForSelector("[data-start-seed]");
  assert.equal(await p.locator(".seed-card").count(), 12);
  assert.equal(await p.locator(".seed-scenarios").count(), 6);
  assert.deepEqual(
    await p.locator(".seed-scenarios").allTextContents(),
    Array(6).fill("🌱 3 situaciones"),
  );
  await shot(p, "catalogo", "#catalogPanel");
  // Lectura legacy sin escenario no migra ni modifica el registro, catálogo o respuestas.
  for (const sid of ids) {
    const seed = catalog.semillas.find((s) => s.id === sid),
      old = before.semillas.find((s) => s.id === sid);
    const answers = Object.fromEntries(
      old.pasos.map((s) => [
        s.id,
        s.tipo === "opcion-multiple" ? [s.opciones[0].id] : s.opciones[0].id,
      ]),
    );
    const session = {
      semillaId: sid,
      titulo: seed.titulo,
      respuestas: answers,
      respuestaConstruida: "Respuesta histórica " + seed.titulo,
      creadaEn: "2026-10-12T10:00:00Z",
    };
    const resolved = await p.evaluate(
      async ({ seed, session }) => {
        const { resolverSemillaSesion } =
          await import("./escenarios-semilla.js");
        return resolverSemillaSesion(seed, session);
      },
      { seed, session },
    );
    assert.equal(resolved.escenarioId, seed.escenarioPredeterminadoId);
    assert.deepEqual(resolved.pasos, old.pasos);
    await p.evaluate(
      ({ sid, session }) => {
        const d = JSON.parse(localStorage.qaDB);
        d["usuarios/alumno/sesionesSemillas/legacy-" + sid] = session;
        localStorage.qaDB = JSON.stringify(d);
      },
      { sid, session },
    );
  }
  const initial = await db(p);
  for (const sid of ids) {
    const seed = catalog.semillas.find((s) => s.id === sid);
    for (const sc of seed.escenarios) {
      await p.goto(base + dir);
      await p.waitForSelector('[data-start-seed="' + sid + '"]');
      await click(p, '[data-start-seed="' + sid + '"]');
      assert.equal(await p.locator("[data-start-scenario]").count(), 3);
      await shot(p, "selector-" + sc.id, "#experienceContent");
      await click(p, '[data-start-scenario="' + sc.id + '"]');
      assert.equal(await p.locator("#scenarioTitle").innerText(), sc.titulo);
      assert.equal(await p.locator("#changeScenario").isVisible(), true);
      assert.equal(
        await p.evaluate(() => document.activeElement.tagName),
        "H2",
      );
      await click(p, "#continueSeed");
      assert.equal(
        await p.locator(".scene__situation-text").innerText(),
        sc.situacion.texto,
      );
      if (sc.recursos === null)
        assert.equal(await p.locator("#experienceContent img").count(), 0);
      await shot(p, "situacion-" + sc.id, "#experienceContent");
      await click(p, "#listenSituation");
      assert.equal(await p.evaluate(() => qaSpoken.at(-1)), sc.situacion.texto);
      await click(p, "#continueSituation");
      // Primer recorrido con opciones; texto construido coincide exactamente con el contrato vigente.
      for (const step of sc.pasos) {
        assert.equal(
          await p.locator("#experienceContent h2").innerText(),
          step.titulo,
        );
        assert.deepEqual(
          await p
            .locator("[data-answer]")
            .evaluateAll((es) => es.map((e) => e.dataset.answer)),
          step.opciones.map((o) => o.id),
        );
        for (const option of step.opciones)
          assert.ok(
            (await p.locator(".options").innerText()).includes(option.texto),
          );
        await click(p, '[data-answer="' + step.opciones[0].id + '"]');
        await click(p, "#nextQuestion");
      }
      let phrase = await p.locator("#composedResponse").innerText();
      assert.ok(phrase.length > 30);
      assert.ok(!/[{}]/.test(phrase));
      if (sid === ids[1] && sc.id === "tenemos-dos-ideas-distintas") {
        assert.ok(
          phrase.startsWith("Las dos queremos Tenemos dos ideas diferentes"),
        );
        console.log("BLOQUEO EDITORIAL reproducido: " + phrase);
      }
      await click(p, "#previousComposer");
      for (let i = 1; i < sc.pasos.length; i++)
        await click(p, "#previousQuestion");
      // Segundo recorrido con palabras propias, conservando la elección registrada en cada paso.
      for (const step of sc.pasos) {
        assert.equal(await p.locator("#otherAnswer").count(), 1);
        await p.fill("#otherAnswer", "Mi respuesta <propia> " + step.id);
        await click(p, "#nextQuestion");
      }
      phrase = await p.locator("#composedResponse").innerText();
      for (const [, key] of seed.plantillaRespuesta.matchAll(/\{([^}]+)\}/g))
        assert.ok(
          phrase
            .toLowerCase()
            .includes(("Mi respuesta <propia> " + key).toLowerCase()),
        );
      assert.equal(await p.locator("#composedResponse propia").count(), 0);
      await click(p, "#listenResponse");
      assert.equal(await p.evaluate(() => qaSpoken.at(-1)), phrase);
      await click(p, "#practiceResponse");
      assert.equal(await p.locator(".recording .composer").innerText(), phrase);
      await click(p, "#continueWithoutRecording");
      await p.waitForSelector("#finishSeed");
      await p.locator("#academiaCelebracion").waitFor({ state: "detached" });
      const saved = Object.entries(await db(p)).filter(
        ([k, v]) =>
          k.includes("/sesionesSemillas/") &&
          !k.includes("/legacy-") &&
          v.semillaId === sid &&
          v.escenarioId === sc.id,
      );
      assert.equal(saved.length, 1);
      const row = saved[0][1];
      assert.equal(row.escenarioTitulo, sc.titulo);
      assert.equal(row.tipoSituacion, sc.tipoSituacion);
      assert.equal(row.respuestaConstruida, phrase);
      for (const step of sc.pasos)
        assert.equal(
          row.respuestas[step.id + "__other"],
          "Mi respuesta <propia> " + step.id,
        );
      await click(p, "#repeatSeed");
      assert.equal(await p.locator("#scenarioTitle").innerText(), sc.titulo);
      await click(p, "#changeScenario");
      assert.equal(await p.locator("[data-start-scenario]").count(), 3);
      await click(p, '[data-start-scenario="' + sc.id + '"]');
      assert.equal(await p.locator("#scenarioTitle").innerText(), sc.titulo);
      await p.goto(base + dir + "?vista=historial");
      await p.waitForSelector(".history-card");
      const card = p
        .locator(".history-card")
        .filter({ hasText: sc.titulo })
        .filter({ hasText: "Mi respuesta <propia>" })
        .first();
      assert.ok(await card.count());
      assert.ok((await card.textContent()).includes("Mi respuesta <propia>"));
      console.log("OK recorrido: " + sid + " / " + sc.id);
    }
  }
  const after = await db(p);
  for (const [k, v] of Object.entries(initial).filter(([k]) =>
    k.includes("/legacy-"),
  ))
    assert.deepEqual(after[k], v);
  await p.goto(base + dir);
  await p.waitForSelector(".seed-card");
  assert.equal(
    await p.locator(".seed-card").filter({ hasText: "✅ Practicada" }).count(),
    5,
  );
  assert.equal(await p.locator(".seed-scenarios").count(), 6);
  // Contador futuro: cuatro y una situación sin cambiar código de UI.
  const future = structuredClone(catalog);
  future.semillas[0].escenarios.push({
    ...future.semillas[0].escenarios[1],
    id: "solo-fixture-cuarta",
  });
  future.semillas.find((s) => s.id === "yo-si-puedo").escenarios.splice(1);
  await p.route("**/semillas.json", (r) => r.fulfill({ json: future }));
  await p.reload();
  await p.waitForSelector(".seed-scenarios");
  assert.equal(await p.locator(".seed-scenarios").count(), 5);
  assert.equal(
    await p
      .locator(".seed-scenarios")
      .filter({ hasText: "🌱 4 situaciones" })
      .count(),
    1,
  );
  await p.unroute("**/semillas.json");
  // Visor real de Trabajo realizado para las quince sesiones y las cinco legacy.
  const work = Object.entries(after).filter(([k]) =>
    k.includes("/sesionesSemillas/"),
  );
  await p.evaluate((work) => {
    const d = JSON.parse(localStorage.qaDB);
    d["usuarios/alumno/tareas/revision-ampliacion"] = {
      titulo: "Revisión controlada",
      tipo: "actividad_modulo",
      modulo: "creciendo-por-dentro",
      estado: "pendiente_validacion",
      visibleParaAlumno: true,
      criterioCumplimiento: {
        evidenciaTipo: "semilla_completada",
        cantidadObjetivo: 20,
      },
    };
    work.forEach(([path, s], i) => {
      d["usuarios/alumno/evidencias/revision-" + i] = {
        misionId: "revision-ampliacion",
        modulo: "creciendo-por-dentro",
        tipo: "semilla_completada",
        actividadId: s.semillaId,
        sesionId: path.split("/").at(-1),
        creadaEn: s.creadaEn,
        atributos: s.escenarioId
          ? { escenarioId: s.escenarioId, escenarioTitulo: s.escenarioTitulo }
          : {},
        resultado: { titulo: s.titulo },
      };
    });
    localStorage.qaDB = JSON.stringify(d);
  }, work);
  const beforeReview = await db(p);
  await p.goto(
    base +
      "/mi-universo/mis-tareas/trabajo-realizado.html?misionId=revision-ampliacion",
  );
  await p.waitForFunction(() =>
    document
      .querySelector("#listaEvidencias")
      ?.textContent.includes("Mi respuesta <propia>"),
  );
  const text = await p.locator("#listaEvidencias").textContent();
  for (const sid of ids) {
    const s = catalog.semillas.find((s) => s.id === sid);
    for (const sc of s.escenarios) {
      assert.ok(text.includes(sc.titulo));
      for (const step of sc.pasos)
        assert.ok(text.includes(step.opciones[0].texto));
    }
    assert.ok(text.includes("Respuesta histórica " + s.titulo));
  }
  assert.deepEqual(await db(p), beforeReview);
  // La guía es de familias/profesionales; el alumno no debe saltarse ese guard.
  const adult = await crearEntorno(b, "gestion"),
    a = adult.p;
  await fonts(a);
  await a.goto(base + dir + "guia-familias-profesionales.html");
  await a.waitForSelector(".guide-seed__number");
  await click(a, "#toggleAllSeeds");
  for (const sid of ids)
    for (const sc of catalog.semillas.find((s) => s.id === sid).escenarios)
      assert.ok((await a.locator("body").innerText()).includes(sc.titulo));
  await shot(a, "guia", "main");
  assert.deepEqual(adult.errors, []);
  await adult.c.close();
  await p.emulateMedia({ reducedMotion: "reduce" });
  await p.goto(base + dir);
  await p.waitForSelector("[data-start-seed]");
  await click(p, '[data-start-seed="' + ids[4] + '"]');
  await p.locator("[data-start-scenario]").first().focus();
  await p.keyboard.press("Enter");
  assert.equal(
    await p.locator("#scenarioTitle").innerText(),
    catalog.semillas.find((s) => s.id === ids[4]).escenarios[0].titulo,
  );
  await p.locator("#changeScenario").focus();
  await p.keyboard.press("Enter");
  assert.equal(await p.locator("[data-start-scenario]").count(), 3);
  await shot(p, "selector-reduced-motion", "#experienceContent");
  assert.deepEqual(e.errors, []);
  const paths = await p.evaluate(() => window.qaWritePaths || []);
  assert.ok(
    paths.every((k) => k.startsWith("usuarios/alumno/sesionesSemillas/")),
    JSON.stringify(paths),
  );
  await e.c.close();
  await b.close();
  console.log(
    "OK ampliación: 15 recorridos, propias/opciones/voz/guardado/Jardín, legacy intacto, seis badges y contador 4/1, teclado/foco/reduced-motion, cinco anchos y guía. BLOQUEO de plantilla 004 pendiente; no acredita calidad de esa frase ni publicación.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
