import { Academia } from "../../compartido/api/academia.js";
import { mostrarCelebracion } from "../../compartido/js/celebracion.js";

const $ = id => document.getElementById(id);
let mision = null;
let misionId = "";
let palabras = [];
let resultados = new Map();
let recognitionActiva = null;
let modoSoloLectura = false;
let sesionPronunciacionId = "";


function crearSesionPronunciacionId() {
  if (window.crypto?.randomUUID) {
    return `pron-${window.crypto.randomUUID()}`;
  }

  return (
    "pron-" +
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 10)
  );
}

function escapar(valor = "") {
  return String(valor).replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caracter]);
}

function normalizar(texto = "") {
  return String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-ES")
    .replace(/[^\p{L}\p{N}'’-]+/gu, " ")
    .trim();
}

function contienePalabra(texto = "", palabra = "") {
  const objetivo = normalizar(palabra);
  if (!objetivo) return false;
  return normalizar(texto).split(/\s+/).includes(objetivo);
}

function palabrasConfiguradas(tarea = {}) {
  const lista = tarea.evidencia?.configuracion?.palabras;
  return Array.isArray(lista)
    ? lista.map(item => ({
        palabra: String(item?.palabra || "").trim(),
        frasePractica: String(item?.frasePractica || "").trim(),
        origenes: Array.isArray(item?.origenes) ? item.origenes : []
      })).filter(item => item.palabra)
    : [];
}

function resultado(index) {
  if (!resultados.has(index)) {
    resultados.set(index, {
      intentosPalabra: 0,
      ultimaPalabraReconocida: "",
      superadaPalabra: false,
      errorPalabra: "",
      intentosFrase: 0,
      ultimaFraseReconocida: "",
      superadaFrase: false,
      errorFrase: ""
    });
  }
  return resultados.get(index);
}

function hablar(texto = "") {
  const valor = String(texto).trim();
  if (!valor) return;

  if (!("speechSynthesis" in window)) {
    alert(
      "No se pudo reproducir el ejemplo.\n" +
      "Razón: este navegador no ofrece síntesis de voz."
    );
    return;
  }

  window.speechSynthesis.cancel();
  const voz = new SpeechSynthesisUtterance(valor);
  voz.lang = "es-ES";
  voz.rate = 0.8;
  window.speechSynthesis.speak(voz);
}

function reconocimientoDisponible() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function reconocer(index, tipo) {
  const item = palabras[index];
  if (!item) {
    alert("No se pudo iniciar la práctica.\nRazón: la palabra seleccionada no existe en esta Misión.");
    return;
  }

  const actual = resultado(index);
  const esFrase = tipo === "frase";
  const Recognition = reconocimientoDisponible();

  if (!Recognition) {
    if (esFrase) {
      actual.intentosFrase += 1;
      actual.errorFrase = "reconocimiento-no-disponible";
    } else {
      actual.intentosPalabra += 1;
      actual.errorPalabra = "reconocimiento-no-disponible";
    }
    render();
    alert(
      "El navegador no puede comprobar la voz, pero la práctica queda registrada.\n" +
      "Razón: el reconocimiento de voz no está disponible en este navegador."
    );
    return;
  }

  if (recognitionActiva) {
    try { recognitionActiva.abort(); } catch {}
  }

  const recognition = new Recognition();
  recognitionActiva = recognition;
  recognition.lang = "es-ES";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;

  if (esFrase) actual.intentosFrase += 1;
  else actual.intentosPalabra += 1;

  render();

  recognition.onresult = event => {
    const alternativas = Array.from(event.results?.[0] || [])
      .map(itemResultado => String(itemResultado.transcript || "").trim())
      .filter(Boolean);
    const transcript = alternativas[0] || "";
    const reconocida = alternativas.some(valor => contienePalabra(valor, item.palabra));

    if (esFrase) {
      actual.ultimaFraseReconocida = transcript;
      actual.superadaFrase = reconocida;
      actual.errorFrase = "";
    } else {
      actual.ultimaPalabraReconocida = transcript;
      actual.superadaPalabra = reconocida;
      actual.errorPalabra = "";
    }
    render();
  };

  recognition.onerror = event => {
    if (event.error === "aborted") return;

    if (esFrase) actual.errorFrase = String(event.error || "error-no-identificado");
    else actual.errorPalabra = String(event.error || "error-no-identificado");
    render();

    alert(
      "No se pudo completar este intento de voz.\n" +
      `Razón: ${event.error || "error no identificado"}. ` +
      "La práctica queda registrada y puedes continuar."
    );
  };

  recognition.onend = () => {
    if (recognitionActiva === recognition) recognitionActiva = null;
  };

  try {
    recognition.start();
  } catch (error) {
    if (esFrase) actual.errorFrase = String(error.message || "error-no-identificado");
    else actual.errorPalabra = String(error.message || "error-no-identificado");
    recognitionActiva = null;
    render();
    alert(
      "No se pudo iniciar este intento de voz.\n" +
      `Razón: ${error.message || "Error no identificado"}`
    );
  }
}

function practicadas() {
  return palabras.filter((_, index) => Number(resultado(index).intentosPalabra || 0) > 0).length;
}

function render() {
  const lista = $("pronunciationMissionList");
  const progreso = $("pronunciationMissionProgress");
  if (!lista || !progreso) return;

  const realizadas = modoSoloLectura
    ? palabras.filter((_, index) => Number(resultado(index).intentosPalabra || 0) > 0).length
    : practicadas();

  progreso.textContent = `${realizadas} de ${palabras.length} practicadas`;

  lista.innerHTML = palabras.map((item, index) => {
    const actual = resultado(index);
    const practicada = Number(actual.intentosPalabra || 0) > 0;
    const reconocida = Boolean(actual.superadaPalabra);
    const errorTecnico = String(actual.errorPalabra || "");

    return `
      <article class="pronunciation-word ${practicada ? "pronunciation-word--practiced" : ""}">
        <div class="pronunciation-word__header">
          <span class="pronunciation-word__number">${index + 1}</span>
          <div class="pronunciation-word__content">
            <h3>${escapar(item.palabra)}</h3>
            <p>${escapar(item.frasePractica || "")}</p>
          </div>
          <div class="pronunciation-word__badge">
            ${practicada ? (reconocida ? "✅ Reconocida" : "🌱 Practicada") : "⏳ Pendiente"}
            <small>${Number(actual.intentosPalabra || 0)} ${Number(actual.intentosPalabra || 0) === 1 ? "intento" : "intentos"}</small>
          </div>
        </div>

        ${modoSoloLectura ? `
          <div class="pronunciation-word__result ${reconocida ? "pronunciation-word__result--ok" : "pronunciation-word__result--practice"}">
            <strong>Palabra:</strong>
            ${actual.ultimaPalabraReconocida ? `Lía entendió «${escapar(actual.ultimaPalabraReconocida)}».` : "sin transcripción guardada."}
            ${Number(actual.intentosFrase || 0) > 0 ? `
              <br><strong>Frase:</strong>
              ${actual.ultimaFraseReconocida ? `Lía entendió «${escapar(actual.ultimaFraseReconocida)}».` : "sin transcripción guardada."}
            ` : ""}
          </div>
        ` : `
          <div class="pronunciation-word__actions">
            <button class="btn light" type="button" data-escuchar-palabra="${index}">🔊 Escuchar palabra</button>
            <button class="btn primary" type="button" data-repetir-palabra="${index}">🎤 Repetir palabra</button>
            <button class="btn light" type="button" data-escuchar-frase="${index}">🔊 Escuchar frase</button>
            <button class="btn blue" type="button" data-repetir-frase="${index}">🎤 Practicar frase</button>
          </div>

          ${practicada ? `
            <div class="pronunciation-word__result ${reconocida ? "pronunciation-word__result--ok" : "pronunciation-word__result--practice"}">
              <strong>Palabra:</strong>
              ${errorTecnico
                ? `la práctica quedó registrada. Lía no pudo comprobarla (${escapar(errorTecnico)}).`
                : actual.ultimaPalabraReconocida
                  ? `Lía entendió «${escapar(actual.ultimaPalabraReconocida)}».`
                  : "la palabra ya fue practicada."}
              ${reconocida ? " Puedes repetirla si quieres." : " El resultado del reconocimiento no bloquea la Misión."}

              ${Number(actual.intentosFrase || 0) > 0 ? `
                <br><strong>Frase:</strong>
                ${actual.errorFrase
                  ? `la práctica quedó registrada. Lía no pudo comprobarla (${escapar(actual.errorFrase)}).`
                  : actual.ultimaFraseReconocida
                    ? `Lía entendió «${escapar(actual.ultimaFraseReconocida)}».`
                    : "la frase fue practicada, pero no quedó una transcripción disponible."}
              ` : ""}
            </div>
          ` : (
            Number(actual.intentosFrase || 0) > 0
              ? `
                <div class="pronunciation-word__result pronunciation-word__result--practice">
                  <strong>Frase:</strong>
                  ${actual.errorFrase
                    ? `la práctica quedó registrada. Lía no pudo comprobarla (${escapar(actual.errorFrase)}).`
                    : actual.ultimaFraseReconocida
                      ? `Lía entendió «${escapar(actual.ultimaFraseReconocida)}».`
                      : "la frase fue practicada, pero no quedó una transcripción disponible."}
                </div>
              `
              : ""
          )}
        `}
      </article>
    `;
  }).join("");

  if (!modoSoloLectura) {
    lista.querySelectorAll("[data-escuchar-palabra]").forEach(button => {
      button.onclick = () => hablar(palabras[Number(button.dataset.escucharPalabra)]?.palabra || "");
    });
    lista.querySelectorAll("[data-repetir-palabra]").forEach(button => {
      button.onclick = () => reconocer(Number(button.dataset.repetirPalabra), "palabra");
    });
    lista.querySelectorAll("[data-escuchar-frase]").forEach(button => {
      button.onclick = () => hablar(palabras[Number(button.dataset.escucharFrase)]?.frasePractica || "");
    });
    lista.querySelectorAll("[data-repetir-frase]").forEach(button => {
      button.onclick = () => reconocer(Number(button.dataset.repetirFrase), "frase");
    });

    $("savePronunciationMission").disabled =
      !palabras.length || practicadas() < palabras.length;
  }
}

function mostrarPanel() {
  document.querySelectorAll(".panel").forEach(panel => panel.classList.add("hidden"));
  $("pronunciationMissionPanel").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function guardar() {
  if (!mision || !misionId) {
    alert("No se pudo guardar la práctica.\nRazón: no hay una Misión de pronunciación activa.");
    return;
  }

  if (practicadas() < palabras.length) {
    const faltan = palabras.length - practicadas();
    alert(
      "Todavía no se puede guardar la práctica.\n" +
      `Razón: faltan ${faltan} ${faltan === 1 ? "palabra" : "palabras"} por practicar.`
    );
    return;
  }

  const button = $("savePronunciationMission");
  const texto = button.textContent;
  button.disabled = true;
  button.textContent = "Guardando...";

  try {
    const detalle = palabras.map((item, index) => {
      const actual = resultado(index);
      return {
        palabra: item.palabra,
        frasePractica: item.frasePractica,
        intentosPalabra: Number(actual.intentosPalabra || 0),
        ultimaPalabraReconocida: String(actual.ultimaPalabraReconocida || ""),
        superadaPalabra: Boolean(actual.superadaPalabra),
        errorPalabra: String(actual.errorPalabra || ""),
        intentosFrase: Number(actual.intentosFrase || 0),
        ultimaFraseReconocida: String(actual.ultimaFraseReconocida || ""),
        superadaFrase: Boolean(actual.superadaFrase),
        errorFrase: String(actual.errorFrase || "")
      };
    });

    const reconocidas = detalle.filter(item => item.superadaPalabra).length;
    const aplicacion = await Academia.evidencias.registrarParaMision({
      misionId,
      modulo: "rincon-lectura",
      tipo: "pronunciacion_completada",
      actividadId: "refuerzo-pronunciacion",
      sesionId: sesionPronunciacionId,
      atributos: {
        practica: "pronunciacion",
        cantidadPalabras: detalle.length,
        idioma: "es-ES"
      },
      resultado: {
        titulo: "Refuerzo de pronunciación",
        cantidadPalabras: detalle.length,
        palabrasReconocidas: reconocidas,
        palabras: detalle
      },
      destinoRevision:
        `../rincon-lectura/?vista=pronunciacion-historial&misionId=${encodeURIComponent(misionId)}`
    });

    $("pronunciationMissionStatus").textContent =
      "✅ Práctica guardada. Tu familia ya puede revisarla en Trabajo realizado.";

    button.classList.add("hidden");

    mostrarCelebracion({
      titulo: "¡Práctica completada!",
      mensaje:
        `Has practicado ${detalle.length} ${detalle.length === 1 ? "palabra" : "palabras"} con calma.`,
      duracion: 3000,
      mostrarGuacamayas: true
    });

    return aplicacion;
  } catch (error) {
    button.disabled = false;
    alert(
      "No se pudo guardar la práctica.\n" +
      `Razón: ${error.message || "Error no identificado"}`
    );
  } finally {
    button.textContent = texto;
  }
}

export async function iniciarMisionPronunciacion(tarea, id) {
  mision = tarea;
  misionId = String(id || "").trim();
  modoSoloLectura = false;
  palabras = palabrasConfiguradas(tarea);
  resultados = new Map();
  sesionPronunciacionId = crearSesionPronunciacionId();

  if (!misionId) throw new Error("Falta el identificador de la Misión.");
  if (!palabras.length) throw new Error("La Misión de pronunciación no contiene palabras configuradas.");

  $("pronunciationMissionTitle").textContent =
    tarea.presentacionAlumno?.tituloMision || tarea.titulo || "Palabras para crecer";
  $("pronunciationMissionDescription").textContent =
    tarea.presentacionAlumno?.descripcionMision || tarea.descripcion || "Escucha cada palabra y repítela con calma.";
  $("pronunciationMissionStatus").textContent =
    "Practica cada palabra al menos una vez. La frase es una práctica adicional y opcional.";
  $("savePronunciationMission").classList.remove("hidden");
  $("savePronunciationMission").onclick = guardar;

  $("readingMissionBanner")?.classList.add("hidden");
  mostrarPanel();
  render();
}

export async function iniciarHistorialPronunciacion(id) {
  misionId = String(id || "").trim();
  if (!misionId) throw new Error("Falta el identificador de la Misión.");

  const evidencias = await Academia.tareas.leerEvidencias(misionId);
  const evidencia = evidencias.find(item =>
    item.modulo === "rincon-lectura" && item.tipo === "pronunciacion_completada"
  );

  if (!evidencia) {
    throw new Error("La Misión todavía no tiene una práctica de pronunciación guardada.");
  }

  const guardadas = Array.isArray(evidencia.resultado?.palabras)
    ? evidencia.resultado.palabras
    : [];

  palabras = guardadas.map(item => ({
    palabra: String(item.palabra || ""),
    frasePractica: String(item.frasePractica || ""),
    origenes: []
  }));
  resultados = new Map(
    guardadas.map((item, index) => [index, {
      intentosPalabra: Number(item.intentosPalabra || 0),
      ultimaPalabraReconocida: String(item.ultimaPalabraReconocida || ""),
      superadaPalabra: Boolean(item.superadaPalabra),
      errorPalabra: String(item.errorPalabra || ""),
      intentosFrase: Number(item.intentosFrase || 0),
      ultimaFraseReconocida: String(item.ultimaFraseReconocida || ""),
      superadaFrase: Boolean(item.superadaFrase),
      errorFrase: String(item.errorFrase || "")
    }])
  );
  modoSoloLectura = true;

  $("pronunciationMissionTitle").textContent =
    evidencia.resultado?.titulo || "Refuerzo de pronunciación";
  $("pronunciationMissionDescription").textContent =
    "Trabajo realizado en esta Misión de pronunciación.";
  $("pronunciationMissionStatus").textContent =
    "🔒 Vista de revisión. Los resultados se conservan en solo lectura.";
  $("savePronunciationMission").classList.add("hidden");
  $("readingMissionBanner")?.classList.add("hidden");

  mostrarPanel();
  render();
}
