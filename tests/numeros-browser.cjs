/* ContextoUsuario, guard, API y Análisis REALES. SDK/identidad externos simulados.
 * No utiliza datos reales ni certifica Rules desplegadas. */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const base = process.env.BASE_URL || "http://127.0.0.1:8774";
const sdk = `
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
const seed = (role) => {
  const actor = role === "gestion" ? "familiar" : "profesional",
    person = "persona-" + actor;
  const rows = {
    ["usuarios/" + actor]: {
      personaId: person,
      activo: true,
      nombre: "Actor de prueba",
    },
    "usuarios/alumno": {
      personaId: "persona-alumno",
      activo: true,
      nombre: "Alumno de prueba",
    },
    ["personas/" + person]: { nombre: "Actor de prueba", activo: true },
    "personas/persona-alumno": { nombre: "Alumno de prueba", activo: true },
    ["usuarioRoles/" + actor]: { roleId: role, activo: true },
    ["roles/" + role]: { nombre: role, nivelAcceso: role, activo: true },
    ["personaRelaciones/" + person + "__persona-alumno"]: {
      sourcePersonId: person,
      targetPersonId: "persona-alumno",
      activo: true,
      nivelAcceso: role,
      tipoRelacion: "profesional",
    },
    "usuarios/alumno/tareas/mision-test": {
      titulo: "Misión del alumno",
      tipo: "actividad_modulo",
      modulo: "rincon-lectura",
      estado: "pendiente",
      visibleParaAlumno: false,
      ordenMision: 1,
      descripcion: "Objetivo educativo",
      criterioCumplimiento: {
        tipo: "cantidad",
        evidenciaTipo: "lectura_completada",
        cantidadObjetivo: 1,
      },
      progreso: { cantidadActual: 0, cantidadObjetivo: 1 },
    },
    "usuarios/alumno/sesionesLectura/actual": {
      historiaId: "lectura-test",
      titulo: "La lectura reciente",
      actualizadaEn: "2026-10-13T10:00:00Z",
      analisisLectura: {
        palabrasParaCrecer: [
          { palabra: "extraños", estado: "pendiente", intentos: 2 },
          { palabra: "logrado", estado: "success", intentos: 3 },
        ],
      },
    },
    "usuarios/alumno/sesionesLectura/antigua": {
      historiaId: "lectura-anterior",
      titulo: "La lectura anterior",
      actualizadaEn: "2026-10-12T10:00:00Z",
      analisisLectura: {
        palabrasParaCrecer: [
          { palabra: "extraños", estado: "superada", intentos: 1 },
        ],
      },
    },
  };
  return { actor, rows };
};
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_EXECUTABLE,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  async function entorno(role, valid = true, nivelRelacion = role) {
    const c = await b.newContext({ viewport: { width: 1280, height: 1000 } });
    const p = await c.newPage();
    p.setDefaultTimeout(15000);
    const errors = [];
    p.on("pageerror", (e) => {
      errors.push(e.message);
      console.error("Browser:", e.message);
    });
    p.on("console", (m) => {
      if (m.type() === "error") console.error(m.text());
    });
    const fixture = seed(role);
    if (role === "alumno") {
      fixture.actor = "alumno";
      fixture.rows["usuarioRoles/alumno"] = { roleId: "alumno", activo: true };
      fixture.rows["roles/alumno"] = {
        nombre: "Alumno",
        nivelAcceso: "consulta",
        activo: true,
      };
      fixture.rows["personas/persona-alumno"].curso = "6.º";
      fixture.rows["personas/persona-alumno"].colegio = "Gaudem";
      fixture.rows["usuarios/alumno"].curso = "6.º";
    }
    if (role !== "alumno")
      fixture.rows[
        "personaRelaciones/persona-" + fixture.actor + "__persona-alumno"
      ].nivelAcceso = nivelRelacion;
    if (!valid)
      delete fixture.rows[
        "personaRelaciones/persona-" + fixture.actor + "__persona-alumno"
      ];
    await p.addInitScript((f) => {
      if (!localStorage.qaDB) {
        localStorage.qaDB = JSON.stringify(f.rows);
        localStorage.qaActor = f.actor;
      }
      if (!sessionStorage.getItem("academia.personaActivaId"))
        sessionStorage.setItem("academia.personaActivaId", "persona-alumno");
    }, fixture);
    await p.route("https://fonts.googleapis.com/**", (r) =>
      r.fulfill({ body: "", contentType: "text/css" }),
    );
    await p.route("https://unpkg.com/**", (r) =>
      r.fulfill({
        body: "window.lucide={createIcons(){}}",
        contentType: "text/javascript",
      }),
    );
    await p.route("**/firebase-firestore.js", (r) =>
      r.fulfill({ body: sdk, contentType: "text/javascript" }),
    );
    await p.route("https://www.gstatic.com/**/firebase-auth.js", (r) =>
      r.fulfill({
        body: "export const signOut=async()=>{};export const onAuthStateChanged=(auth,cb)=>{queueMicrotask(()=>cb(auth.currentUser));return()=>{};};",
        contentType: "text/javascript",
      }),
    );
    await p.route("**/compartido/firebase/firebase-config.js", (r) =>
      r.fulfill({
        body: "export const db={};export const auth={authStateReady:async()=>{},get currentUser(){return {uid:localStorage.qaActor,email:'prueba@example.invalid'}}};",
        contentType: "text/javascript",
      }),
    );
    await p.route("**/compartido/firebase/firebase-auth.js", (r) =>
      r.fulfill({
        body: "export const observarSesion=()=>()=>{};",
        contentType: "text/javascript",
      }),
    );
    await p.route("**/registro-acceso.js", (r) =>
      r.fulfill({
        body: "export async function registrarAccesoAcademia(){}",
        contentType: "text/javascript",
      }),
    );
    await p.route("**/timeout-sesion.js", (r) =>
      r.fulfill({
        body: "export async function activarTimeoutSesion(){}",
        contentType: "text/javascript",
      }),
    );
    if (process.env.QA_FONTS) {
      const fs = require("fs");
      await p.route("https://fonts.googleapis.com/**", (r) =>
        r.fulfill({
          body: fs.readFileSync(process.env.QA_FONTS, "utf8"),
          contentType: "text/css",
        }),
      );
      await p.route("https://numeros-qa.local/**", (r) =>
        r.fulfill({
          body: fs.readFileSync(
            "/workspace/scratch/8b0326fd0927/qa-numeros/browser/node_modules/@fontsource/" +
              new URL(r.request().url()).pathname.slice(1),
          ),
          contentType: "font/woff2",
        }),
      );
    }
    return { c, p, errors };
  }

  const topic = "/cursos/6to/mates/numeros-hasta-100000/";
  const learner = await entorno("alumno"),
    p = learner.p;
  await p.addInitScript(() => {
    window.qaAudio = [];
    window.qaCancels = 0;
    window.SpeechSynthesisUtterance = class extends EventTarget {
      constructor(text) {
        super();
        this.text = text;
      }
    };
    Object.defineProperty(window, "speechSynthesis", {
      value: {
        cancel() {
          qaCancels++;
        },
        speak(u) {
          qaAudio.push({ text: u.text, lang: u.lang });
          queueMicrotask(() => u.dispatchEvent(new Event("end")));
        },
      },
    });
  });
  await p.goto(base + "/cursos/6to/mates/");
  await p.waitForSelector('[data-tema-id="numeros-hasta-100000"]');
  assert.equal(await p.locator('[data-tema-id="fracciones"]').count(), 1);
  assert.equal(await p.locator(".portal-tema").count(), 2);
  await p.locator('[data-tema-id="numeros-hasta-100000"]').click();
  await p.waitForFunction(
    () =>
      document.querySelector("#tituloModo").textContent ===
      "Sesión de aprendizaje",
  );
  assert.equal(new URL(p.url()).pathname, topic);
  assert.ok(new URL(p.url()).searchParams.get("volver").includes("/mates/"));
  const tab = async (id) => p.locator('[data-pestana="' + id + '"]').click();
  const exp = async (id) => {
    await tab("claves");
    await p.locator('[data-experiencia="' + id + '"]').click();
  };
  const shot = async (name) => {
    if (process.env.QA_IMAGES)
      await p.screenshot({
        path: process.env.QA_IMAGES + "-" + name + ".png",
        fullPage: true,
      });
  };
  for (const w of [1440, 1024, 768, 390, 320]) {
    await p.setViewportSize({ width: w, height: 1000 });
    for (const id of ["mapa", "claves", "material", "practica", "prueba"]) {
      await tab(id);
      await p.evaluate(
        () =>
          new Promise((r) =>
            requestAnimationFrame(() => requestAnimationFrame(r)),
          ),
      );
      assert.ok(
        await p.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        "overflow " + id + " " + w,
      );
      if ([1440, 390].includes(w)) await shot(id + "-" + w);
    }
    for (const id of ["construyo", "comparo", "salto", "aproximo"]) {
      await exp(id);
      assert.ok(
        await p.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        "overflow " + id + " " + w,
      );
      assert.ok(
        await p
          .locator(
            ".numeros-shell button:visible,.numeros-shell input:visible,.numeros-shell select:visible",
          )
          .evaluateAll((es) =>
            es.every((e) => e.getBoundingClientRect().height >= 44),
          ),
        "targets " + id + " " + w,
      );
      if ([1440, 390].includes(w)) await shot(id + "-" + w);
    }
  }
  await p.setViewportSize({ width: 1280, height: 1000 });
  await exp("construyo");
  assert.equal(await p.locator("#numeroCompuesto").innerText(), "59 725");
  assert.match(
    await p.locator("#descompConstruyo").innerText(),
    /50 000.*9 000.*700.*20.*5/s,
  );
  await p
    .locator('#tableroConstruyo [data-digito="2"][data-cambio="1"]')
    .focus();
  await p.keyboard.press("Enter");
  assert.equal(await p.locator("#numeroCompuesto").innerText(), "59 825");
  assert.equal(
    await p.evaluate(() => document.activeElement.dataset.digito),
    "2",
  );
  await p.fill("#numeroConstruyo", "68001");
  await p.locator("#cambiarNumero button").click();
  assert.match(
    await p.locator("#lecturaConstruyo").innerText(),
    /sesenta y ocho mil uno/,
  );
  await p.fill("#numeroConstruyo", "100001");
  await p.locator("#cambiarNumero button").click();
  assert.match(
    await p.locator("#mensajeExplorador").innerText(),
    /entre 0 y 100 000/,
  );
  await p.locator("#numeroLimite").click();
  assert.match(
    await p.locator("#tableroConstruyo").innerText(),
    /100 000.*Cien mil/s,
  );
  await p.locator('[data-escuchar-contenedor="#ideaVoz"]').click();
  assert.equal((await p.evaluate(() => qaAudio.at(-1))).lang, "es-ES");
  await exp("comparo");
  await p.click("#pistaComparar");
  assert.match(await p.locator("#mensajeExplorador").innerText(), /6 = 6/);
  await p.click("#pistaComparar");
  assert.match(await p.locator("#mensajeExplorador").innerText(), /3 > 2/);
  assert.ok(await p.locator("#pistaComparar").isDisabled());
  await p.fill("#numeroA", "25555");
  await p.fill("#numeroB", "25555");
  await p.locator("#cambiarComparacion button").click();
  for (let i = 0; i < 5; i++) await p.click("#pistaComparar");
  assert.match(await p.locator("#mensajeExplorador").innerText(), /iguales/);
  await p.fill("#numeroA", "100000");
  await p.fill("#numeroB", "99999");
  await p.locator("#cambiarComparacion button").click();
  await p.click("#pistaComparar");
  assert.match(await p.locator("#mensajeExplorador").innerText(), /más cifras/);
  await exp("salto");
  await p.click('[data-salto="1000"]');
  assert.equal(await p.locator("#numeroSalto").innerText(), "97 000");
  await p.fill("#prediccionSalto", "98000");
  await p.click("#verSalto");
  assert.equal(await p.locator("#numeroSalto").innerText(), "98 000");
  assert.match(
    await p.locator("#mensajeExplorador").innerText(),
    /Salto perfecto/,
  );
  for (const paso of [100, -100, -1000]) {
    await p.click('[data-salto="' + paso + '"]');
    await p.click("#verSalto");
  }
  assert.equal(await p.locator("#numeroSalto").innerText(), "97 000");
  await p.fill("#origenSalto", "99900");
  await p.locator("#cambiarOrigen button").click();
  await p.click('[data-salto="100"]');
  await p.click("#verSalto");
  assert.equal(await p.locator("#numeroSalto").innerText(), "100 000");
  assert.ok(await p.locator('[data-salto="1000"]').isDisabled());
  await exp("aproximo");
  await p.click('[data-vecino="2000"]');
  assert.match(
    await p.locator("#mensajeExplorador").innerText(),
    /volver a intentar/,
  );
  await p.click("#pistaRedondeo");
  assert.match(await p.locator("#ayudaRedondeo").innerText(), /2 000.*3 000/);
  await p.click("#pistaRedondeo");
  assert.match(await p.locator("#ayudaRedondeo").innerText(), /2 500/);
  await p.click('[data-vecino="3000"]');
  assert.match(
    await p.locator("#mensajeExplorador").innerText(),
    /2 508 ≈ 3 000/,
  );
  assert.match(await p.locator("#distanciasRedondeo").innerText(), /508.*492/s);
  for (const [n, u, ans] of [
    [4218, 10, 4220],
    [4218, 100, 4200],
    [1250, 100, 1300],
    [2500, 1000, 3000],
    [9985, 1000, 10000],
    [100000, 1000, 100000],
    [0, 10, 0],
  ]) {
    await p.fill("#numeroRedondeo", String(n));
    await p.selectOption("#unidadRedondeo", String(u));
    await p.locator("#cambiarRedondeo button[type=submit]").click();
    await p.click('[data-vecino="' + ans + '"]');
    assert.match(
      await p.locator("#mensajeExplorador").innerText(),
      /Encontraste/,
    );
  }
  await p.click("#casoMitad");
  assert.match(await p.locator("#mensajeExplorador").innerText(), /mitad/);
  await tab("material");
  assert.equal(await p.locator(".ficha-numero").count(), 6);
  await p.locator(".ficha-numero").first().focus();
  await p.keyboard.press("Enter");
  assert.equal(
    await p.locator(".ficha-numero").first().getAttribute("aria-pressed"),
    "true",
  );
  await tab("practica");
  for (let nivel = 0; nivel < 3; nivel++) {
    await p.click('[data-nivel="' + nivel + '"]');
    const retos = await p.evaluate(
      async (nivel) =>
        (
          await import(
            "/cursos/6to/mates/numeros-hasta-100000/practica-data.js"
          )
        ).crearPractica(nivel),
      nivel,
    );
    for (const [i, r] of retos.entries()) {
      assert.match(
        await p.locator("#preguntaPractica").innerText(),
        new RegExp(
          r.pregunta.slice(0, 10).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        ),
      );
      if (i === 0) {
        await p.click("#comprobarPractica");
        assert.match(
          await p.locator("#mensajeNumero").innerText(),
          /volver a probar/,
        );
        for (let k = 0; k < 3; k++) await p.click("#ayudaPractica");
        assert.ok(
          (await p.locator("#entradaPractica .pista-activa").count()) > 0,
        );
        assert.ok(await p.locator("#solucionNumero").isHidden());
        await p.click("#ayudaPractica");
        assert.ok(await p.locator("#solucionNumero").isVisible());
        assert.ok(await p.locator("#siguientePractica").isHidden());
      }
      if (r.tipo === "construir") {
        for (let c = 0; c < 5; c++) {
          const d = Math.floor(r.respuesta / [10000, 1000, 100, 10, 1][c]) % 10;
          for (let k = 0; k < d; k++)
            await p.click(
              '#entradaPractica [data-digito="' + c + '"][data-cambio="1"]',
            );
        }
      } else if (r.tipo === "numero")
        await p.fill("#respuestaNumero", String(r.respuesta));
      else if (r.tipo === "ordenar")
        for (const n of r.respuesta)
          await p.click('#entradaPractica [data-respuesta="' + n + '"]');
      else if (r.tipo === "localizar") {
        await p.locator("#posicionRecta").evaluate((e, n) => {
          e.value = n;
          e.dispatchEvent(new Event("input", { bubbles: true }));
        }, 62430);
      } else
        await p
          .locator("#entradaPractica [data-respuesta]")
          .evaluateAll((es, ans) => {
            const b = es.find((e) => e.dataset.respuesta === String(ans));
            if (!b) throw Error("answer missing " + ans);
            b.click();
          }, r.respuesta);
      await p.click("#comprobarPractica");
      assert.ok(
        await p.locator("#siguientePractica").isVisible(),
        "practice " + r.id,
      );
      if (process.env.QA_IMAGES && nivel === 1 && [0, 4, 6, 9].includes(i)) {
        await p.setViewportSize({ width: 390, height: 1000 });
        await shot("practica-" + r.tipo + "-390");
        assert.ok(
          await p.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        );
        await p.setViewportSize({ width: 1280, height: 1000 });
      }
      await p.click("#siguientePractica");
    }
    assert.match(
      await p.locator("#practicaNumeros").innerText(),
      /Recorriste las cuatro ideas/,
    );
  }
  assert.equal(await p.evaluate(() => window.qaWrites || 0), 0);
  async function complete(page, wrong = false) {
    await page.click('[data-pestana="prueba"]');
    await page.click("#botonIniciarPrueba");
    for (let i = 0; i < 12; i++) {
      await page.waitForSelector("#pruebaOpciones .option");
      const correct = await page.evaluate(async () => {
        const { FAMILIAS_PRUEBA_NUMEROS } = await import(
          "/cursos/6to/mates/numeros-hasta-100000/numeros-data.js"
        );
        const text = document.querySelector(
          "#pruebaContenido .challenge__enunciado",
        ).textContent;
        return FAMILIAS_PRUEBA_NUMEROS.flatMap((f) => f.variantes).find(
          (q) => q.enunciado === text,
        ).respuestaCorrecta;
      });
      const options = page.locator("#pruebaOpciones .option");
      if (wrong)
        await options.evaluateAll(
          (es, a) => es.find((e) => e.dataset.opcion !== a).click(),
          correct,
        );
      else
        await page
          .locator('#pruebaOpciones [data-opcion="' + correct + '"]')
          .click();
      await page.click("#botonResponderPrueba");
      assert.ok(await page.locator("#explicacionPrueba").isVisible());
      await page.click("#botonResponderPrueba");
    }
    await page.waitForFunction(
      () =>
        !document.querySelector("#cierrePrueba").hidden &&
        !document
          .querySelector("#estadoGuardado")
          .textContent.includes("Guardando"),
    );
  }
  await complete(p, true);
  assert.match(
    await p.locator("#estadoGuardado").innerText(),
    /Sesión guardada/,
  );
  assert.ok(await p.locator('[data-pestana="mapa"]').isEnabled());
  await p.setViewportSize({ width: 320, height: 1000 });
  assert.ok(
    await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  );
  assert.equal(await p.locator("#academiaCelebracion img").count(), 0);
  assert.equal(
    await p
      .locator(".celebracion__particulas")
      .evaluate((e) => getComputedStyle(e).display),
    "none",
  );
  assert.ok(
    await p
      .locator("#academiaCelebracion .celebracion__tarjeta")
      .evaluate((e) => e.getBoundingClientRect().width <= innerWidth),
  );
  await shot("celebracion-320");
  await p.waitForSelector("#academiaCelebracion", { state: "detached" });
  await shot("resultado-320");
  let db = await p.evaluate(() => JSON.parse(localStorage.qaDB));
  let sesiones = Object.entries(db).filter(
    ([path, v]) =>
      path.includes("/sesionesAcademicas/") &&
      v.actividadId === "6-mates-numeros-hasta-100000",
  );
  assert.equal(sesiones.length, 1);
  const first = sesiones[0][1];
  assert.equal(first.respuestas.length, 12);
  assert.equal(first.resumen.porBloque.length, 4);
  assert.equal(first.materia, "Matemáticas");
  assert.ok(
    first.respuestas.every((r) => r.conceptoId && r.bloqueId && r.explicacion),
  );
  assert.ok(
    first.tiempoActivoPorSegmento["prueba-numeros-hasta-100000"] !== undefined,
  );
  await p.goto(
    base +
      "/mi-universo/mis-tareas/resultado-academico.html?sesionId=" +
      sesiones[0][0].split("/").at(-1),
  );
  await p.waitForSelector("#tituloActividad");
  assert.match(await p.locator("body").innerText(), /Números hasta 100 000/);
  assert.equal(await p.evaluate(() => window.qaWrites || 0), 0);
  await p.goto(base + topic);
  await p.waitForFunction(
    () =>
      document.querySelector("#tituloModo").textContent ===
      "Sesión de aprendizaje",
  );
  await complete(p, true);
  db = await p.evaluate(() => JSON.parse(localStorage.qaDB));
  sesiones = Object.entries(db).filter(
    ([path, v]) =>
      path.includes("/sesionesAcademicas/") &&
      v.actividadId === "6-mates-numeros-hasta-100000",
  );
  assert.equal(sesiones.length, 2);
  assert.ok(
    sesiones[1][1].variantes.every(
      (v) => !first.variantes.some((x) => x.varianteId === v.varianteId),
    ),
  );
  await p.evaluate(() => {
    const d = JSON.parse(localStorage.qaDB);
    d["usuarios/alumno/tareas/mision-numeros"] = {
      titulo: "Números",
      tipo: "repaso_academico",
      modulo: "libre",
      estado: "pendiente",
      visibleParaAlumno: true,
      cursoReferencia: "6.º",
      materia: "Matemáticas",
      tema: "Números hasta 100 000",
      recursoAcademicoUrl: "../../cursos/6to/mates/numeros-hasta-100000/",
      criterioCumplimiento: {
        tipo: "cantidad",
        modulo: "libre",
        evidenciaTipo: "sesion_academica",
        cantidadObjetivo: 1,
      },
      progreso: { cantidadActual: 0, cantidadObjetivo: 1 },
    };
    localStorage.qaDB = JSON.stringify(d);
  });
  await p.goto(base + topic + "?misionId=mision-numeros");
  await p.waitForFunction(
    () =>
      document.querySelector("#tituloModo").textContent ===
      "Sesión de aprendizaje",
  );
  await complete(p);
  db = await p.evaluate(() => JSON.parse(localStorage.qaDB));
  assert.equal(
    db["usuarios/alumno/tareas/mision-numeros"].estado,
    "pendiente_validacion",
  );
  assert.ok(
    Object.entries(db).some(
      ([path, v]) =>
        path.includes("/evidencias/") &&
        v.sesionId &&
        v.misionId === "mision-numeros",
    ),
  );
  for (const role of ["gestion", "consulta"]) {
    const x = await entorno(role);
    await x.p.goto(base + topic + "?modo=aprendizaje");
    await x.p.waitForFunction(
      () =>
        document.querySelector("#tituloModo").textContent === "Vista previa",
    );
    assert.ok(await x.p.locator("#botonModo").isDisabled());
    await complete(x.p);
    assert.equal(await x.p.evaluate(() => window.qaWrites || 0), 0);
    assert.deepEqual(x.errors, []);
    await x.c.close();
  }
  const family = await entorno("gestion");
  await family.p.goto(base + "/mi-universo/mis-tareas/");
  await family.p.evaluate((rows) => {
    localStorage.qaDB = JSON.stringify({
      ...JSON.parse(localStorage.qaDB),
      ...rows,
    });
  }, Object.fromEntries(sesiones));
  await family.p.reload();
  await family.p.waitForSelector('[data-tab="refuerzos"]');
  await family.p.click('[data-tab="refuerzos"]');
  await family.p.waitForFunction(() =>
    document
      .querySelector("#grupoRefuerzoAcademico")
      ?.textContent.includes("Construyo"),
  );
  await family.p.click('[data-tab="crear"]');
  await family.p.selectOption("#tipo", "repaso_academico");
  await family.p.selectOption("#cursoReferencia", "6");
  await family.p.waitForFunction(() =>
    Array.from(
      document.querySelector("#materiaCatalogoAcademico").options,
    ).some((o) => o.text === "Matemáticas"),
  );
  await family.p.selectOption("#materiaCatalogoAcademico", {
    label: "Matemáticas",
  });
  await family.p.waitForFunction(() =>
    Array.from(document.querySelector("#temaCatalogoAcademico").options).some(
      (o) => o.text.includes("Números hasta 100 000"),
    ),
  );
  assert.match(
    await family.p.locator("#temaCatalogoAcademico").innerText(),
    /Fracciones/,
  );
  await family.p.goto(base + "/mi-universo/consulta-educativa/");
  await family.p.waitForSelector("#analisisResultado .analisis-seccion");
  assert.match(
    await family.p.locator("#analisisResultado").innerText(),
    /Números hasta 100 000/,
  );
  const invalid = await entorno("consulta", false);
  await invalid.p.goto(base + topic);
  await invalid.p.waitForTimeout(600);
  assert.equal(await invalid.p.evaluate(() => window.qaWrites || 0), 0);
  assert.equal(
    await invalid.p.locator("#botonIniciarPrueba:visible").count(),
    0,
  );
  await invalid.c.close();
  // Voice is optional, and reduced motion keeps the same learning actions.
  const sinVoz = await entorno("consulta");
  await sinVoz.p.addInitScript(() =>
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: undefined,
    }),
  );
  await sinVoz.p.goto(base + topic);
  await sinVoz.p.waitForSelector("#experienciaActiva .experiencia", {
    state: "attached",
  });
  await sinVoz.p.click('[data-pestana="claves"]');
  await sinVoz.p.click('[data-escuchar-contenedor="#ideaVoz"]');
  assert.match(
    await sinVoz.p.locator('[data-escuchar-contenedor="#ideaVoz"]').innerText(),
    /no disponible/,
  );
  await sinVoz.p.click('#tableroConstruyo [data-digito="2"][data-cambio="1"]');
  assert.equal(
    await sinVoz.p.locator("#numeroCompuesto").innerText(),
    "59 825",
  );
  assert.equal(await sinVoz.p.evaluate(() => window.qaWrites || 0), 0);
  await sinVoz.c.close();
  await p.emulateMedia({ reducedMotion: "reduce" });
  await exp("comparo");
  await p.fill("#numeroA", "63398");
  await p.fill("#numeroB", "62431");
  await p.locator("#cambiarComparacion button").click();
  await p.click("#pistaComparar");
  await p.click("#pistaComparar");
  assert.equal(
    await p
      .locator("#cifrasComparo")
      .evaluate((e) => getComputedStyle(e).animationName),
    "none",
  );
  // Existing maths routes and a real Fracciones preview remain operational.
  await p.goto(base + "/cursos/6to/mates/fracciones/?modo=vista_previa");
  await p.waitForFunction(
    () => document.querySelector("#tituloModo").textContent === "Vista previa",
  );
  await p.click('[data-pestana="practica"]');
  assert.ok((await p.locator("#practicaContenido .opcion").count()) > 1);
  await p.click('[data-pestana="prueba"]');
  await p.click("#botonIniciarPrueba");
  assert.ok((await p.locator("#pruebaContenido .opcion").count()) > 1);
  for (const path of [
    "/cursos/6to/mates/puente-5to-6to.html",
    "/cursos/6to/mates/piloto-problemas.html",
  ]) {
    const response = await p.goto(base + path);
    assert.equal(response.status(), 200);
  }
  assert.deepEqual(learner.errors, []);
  assert.deepEqual(family.errors, []);
  await family.c.close();
  await learner.c.close();
  await b.close();
  console.log(
    "OK Números: cuatro experiencias y fronteras, 36 retos con reintentos/pistas, 12 preguntas/48 variantes, sesiones/variante reciente/Misión/evidencia/histórico, preview familiar/profesional sin escritura, refuerzo/catálogo/Análisis, 320–1440/teclado/voz controlada, regresión básica de Matemáticas. Identidad/SDK/audio simulados.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
