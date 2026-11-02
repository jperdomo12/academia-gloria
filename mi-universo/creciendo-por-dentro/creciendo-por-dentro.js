import { Academia } from "../../compartido/api/academia.js?v=3";
import { tieneEscenarios, resolverEscenario, resolverSemillaSesion } from "./escenarios-semilla.js";
import { auth } from "../../compartido/firebase/firebase-config.js";
import { mostrarCelebracion } from "../../compartido/js/celebracion.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";

const $ = id => document.getElementById(id);
const params = new URLSearchParams(window.location.search);
const MAX_RECORDING_SECONDS = 90;
const AUDIO_BITS_PER_SECOND = 48000;
const MAX_AUDIO_DATA_LENGTH = 780000;
const SEED_IMAGE_BASE = new URL(
  "../../assets/imagenes/creciendo-por-dentro/semillas/",
  import.meta.url
);

function seedImageUrl(seed) {
  const resource = String(seed?.recursos?.imagen || "").trim();
  if (!resource) return "";

  if (
    resource.startsWith("http://") ||
    resource.startsWith("https://") ||
    resource.startsWith("data:") ||
    resource.startsWith("blob:")
  ) {
    return resource;
  }

  return new URL(resource, SEED_IMAGE_BASE).href;
}

function imageMarkup(seed, className = "") {
  const source = seedImageUrl(seed);
  if (!source) return "";

  return `
    <figure class="seed-illustration ${className}">
      <img
        src="${escapeHtml(source)}"
        alt="${escapeHtml(
          seed?.recursos?.textoAlternativo ||
          seed?.situacion?.texto ||
          seed?.titulo ||
          "Ilustración de la Semilla"
        )}"
        loading="eager"
      >
    </figure>
  `;
}

function activateImageFallback(container = document) {
  container.querySelectorAll(".seed-illustration img").forEach(image => {
    image.addEventListener("error", () => {
      image.closest(".seed-illustration")?.classList.add("hidden");
    }, { once:true });
  });
}

let soloConsultaRelacionada = false;
let catalogo = { familias: [], semillas: [] };
let perfil = null;
let misionId = params.get("misionId");
let misionActiva = null;
let errorEscenarioMision = "";
let semilla = null;
let semillaBase = null;
let pasoAntesEscenarios = null;
let generacionExperiencia = 0;
let guardandoSesion = false;
let stepIndex = -2;
let respuestas = {};
let inicioSesion = null;
let mediaRecorder = null;
let audioChunks = [];
let audioData = "";
let audioMimeType = "audio/webm";
let audioDuration = 0;
let audioSaveWarning = "";
let recordingStartedAt = 0;
let recordingTimer = null;
let recordingAttempts = 0;
let recognition = null;
let transcript = "";
let activeFamily = "todas";
let sesiones = [];
let contextoUsuario = null;
let esPersonaPropia = true;

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[char]);
}

function formatDuration(seconds = 0) {
  const value = Math.max(0, Math.round(Number(seconds) || 0));
  return `${String(Math.floor(value / 60)).padStart(2,"0")}:${String(value % 60).padStart(2,"0")}`;
}

function showPanel(id) {
  if (id !== "experiencePanel") { generacionExperiencia++; detenerActividad(); }
  ["catalogPanel","experiencePanel","historyPanel"].forEach(panelId => {
    $(panelId).classList.toggle("hidden", panelId !== id);
  });
  window.scrollTo({ top:0, behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(String(text || ""));
  utterance.lang = "es-ES";
  utterance.rate = 0.92;
  speechSynthesis.speak(utterance);
}

let activeDictation = null;

function startDictationInto(textarea, startButton, stopButton) {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    alert("Este navegador no permite dictar texto automáticamente.");
    return;
  }

  if (activeDictation) {
    try { activeDictation.stop(); } catch {}
    activeDictation = null;
  }

  const dictation = new Recognition();
  const generacion = generacionExperiencia;
  const baseText = textarea.value.trim();
  let finalText = "";

  dictation.lang = "es-ES";
  dictation.continuous = true;
  dictation.interimResults = true;

  activeDictation = dictation;
  startButton.disabled = true;
  stopButton.disabled = false;
  startButton.textContent = "🎙️ Escuchando...";

  dictation.onresult = event => {
    if (generacion !== generacionExperiencia) return;
    let interimText = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const spoken = String(event.results[i][0]?.transcript || "").trim();
      if (!spoken) continue;

      if (event.results[i].isFinal) {
        finalText = [finalText, spoken].filter(Boolean).join(" ").trim();
      } else {
        interimText = spoken;
      }
    }

    textarea.value = [baseText, finalText, interimText]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    textarea.dispatchEvent(new Event("input", { bubbles:true }));
  };

  dictation.onerror = event => {
    console.warn("No se pudo completar el dictado.", event.error);
  };

  dictation.onend = () => {
    if (activeDictation === dictation) {
      activeDictation = null;
    }
    startButton.disabled = false;
    stopButton.disabled = true;
    startButton.textContent = "🎤 Decirlo con mi voz";
  };

  dictation.start();
}

function stopActiveDictation() {
  if (!activeDictation) return;
  try { activeDictation.stop(); } catch {}
}

async function loadCatalog() {
  const response = await fetch("./semillas.json", { cache:"no-store" });
  if (!response.ok) throw new Error("No se pudo cargar semillas.json.");
  const data = await response.json();
  catalogo = {
    familias: Array.isArray(data.familias) ? data.familias : [],
    semillas: Array.isArray(data.semillas) ? data.semillas.filter(item => item.activo !== false) : []
  };
}

function missionAllowedIds() {
  const filters = misionActiva?.criterioCumplimiento?.filtros || {};
  return Array.isArray(filters.semillasIds) ? filters.semillasIds.map(String) : [];
}

function escenarioRequeridoMision() {
  return String(misionActiva?.criterioCumplimiento?.filtros?.escenarioId || "").trim();
}

function filteredSeeds() {
  if (errorEscenarioMision) return [];
  const allowed = missionAllowedIds();
  return catalogo.semillas.filter(item => {
    const familyMatches = activeFamily === "todas" || item.familia === activeFamily;
    const missionMatches = !allowed.length || allowed.includes(item.id);
    return familyMatches && missionMatches;
  });
}

function renderFilters() {
  const families = [{ id:"todas", nombre:"Todas", icono:"🌈" }, ...catalogo.familias];
  $("filters").innerHTML = families.map(item => `
    <button type="button" class="filter ${activeFamily === item.id ? "active" : ""}" data-family="${escapeHtml(item.id)}">
      ${escapeHtml(item.icono || "🌱")} ${escapeHtml(item.nombre)}
    </button>
  `).join("");
  $("filters").querySelectorAll("[data-family]").forEach(button => {
    button.onclick = () => {
      activeFamily = button.dataset.family;
      renderFilters();
      renderCatalog();
    };
  });
}

function sessionForSeed(seedId) {
  return sesiones.find(item => item.semillaId === seedId);
}

function renderCatalog() {
  const seeds = filteredSeeds();
  $("catalogEmpty").classList.toggle("hidden", seeds.length > 0);
  $("seedCatalog").innerHTML = seeds.map(item => {
    const saved = sessionForSeed(item.id);
    return `
      <article class="seed-card">
        ${seedImageUrl(item)
          ? `<div class="seed-card__image">
               <img
                 src="${escapeHtml(seedImageUrl(item))}"
                 alt="${escapeHtml(item.recursos?.textoAlternativo || item.situacion?.texto || item.titulo)}"
                 loading="lazy"
               >
             </div>`
          : `<div class="seed-card__icon">${escapeHtml(item.portada?.icono || "🌱")}</div>`
        }
        <div class="badges">
          <span class="badge">${escapeHtml(item.familia || "Semilla")}</span>
          <span class="badge">⏱️ ${Number(item.duracionEstimada || 5)} min</span>
          ${saved ? '<span class="badge">✅ Practicada</span>' : '<span class="badge">✨ Nueva</span>'}
        </div>
        <h3>${escapeHtml(item.titulo)}</h3>
        <p>${escapeHtml(item.subtitulo || "")}</p>
        <button type="button" class="btn btn--primary" data-start-seed="${escapeHtml(item.id)}">
          ${saved ? "🔁 Practicar otra vez" : "🌱 Empezar"}
        </button>
      </article>
    `;
  }).join("");
  activateImageFallback($("seedCatalog"));
  $("seedCatalog").querySelectorAll("[data-start-seed]").forEach(button => {
    button.onclick = () => startSeed(button.dataset.startSeed);
  });
}

function resetExperience() {
  generacionExperiencia++;
  detenerActividad();
  respuestas = {};
  stepIndex = -2;
  inicioSesion = new Date();
  audioData = "";
  audioDuration = 0;
  audioSaveWarning = "";
  transcript = "";
  recordingAttempts = 0;
  stopRecorderTracks();
}

function detenerActividad() {
  stopActiveDictation();
  if (mediaRecorder?.state === "recording") mediaRecorder.stop();
  stopRecorderTracks();
  window.speechSynthesis?.cancel();
}

function startSeed(seedId, escenarioId = null) {
  if (guardandoSesion || errorEscenarioMision) return;
  if (soloConsultaRelacionada) { showHistory(); return; }
  const base = catalogo.semillas.find(item => item.id === seedId);
  if (!base || (missionAllowedIds().length && !missionAllowedIds().includes(base.id))) return;
  const requerido = escenarioRequeridoMision();
  if (requerido && escenarioId && escenarioId !== requerido) return;
  semillaBase = base;
  semilla = tieneEscenarios(base) ? resolverEscenario(base, requerido || escenarioId) : base;
  resetExperience();
  pasoAntesEscenarios = null;
  if (tieneEscenarios(base) && !semilla) stepIndex = -3;
  showPanel("experiencePanel");
  renderExperience();
}

function cambiarEscenario() {
  if (guardandoSesion || escenarioRequeridoMision()) return;
  generacionExperiencia++;
  detenerActividad();
  pasoAntesEscenarios = stepIndex;
  stepIndex = -3;
  renderExperience();
}

function renderEscenarios() {
  const volver = semilla && pasoAntesEscenarios !== null;
  $("experienceContent").innerHTML = `
    <section class="scenario-picker">
      <div class="eyebrow">${escapeHtml(semillaBase.titulo)} · Una habilidad, distintas situaciones</div>
      <h2 tabindex="-1">¿Con qué situación quieres practicar hoy?</h2>
      <p class="question__help">${escapeHtml(semillaBase.subtitulo)}</p>
      <div class="scenario-grid">${semillaBase.escenarios.map(escenario => {
        const practicado = sesiones.some(item => item.semillaId === semillaBase.id && resolverSemillaSesion(semillaBase, item)?.escenarioId === escenario.id);
        return `<article class="scenario-card">
          ${practicado ? '<span class="badge">✅ Practicada</span>' : ''}
          <h3>${escapeHtml(escenario.titulo)}</h3><p>${escapeHtml(escenario.descripcion || escenario.situacion?.texto || '')}</p>
          <button type="button" class="btn btn--primary" data-start-scenario="${escapeHtml(escenario.id)}" aria-label="Practicar: ${escapeHtml(escenario.titulo)}">🌱 Practicar</button>
        </article>`;
      }).join('')}</div>
      <div class="actions">
        ${volver ? '<button id="returnToScenario" class="btn btn--violet" type="button">← Volver a mi práctica</button>' : ''}
        <button id="leaveScenarios" class="btn btn--light" type="button">← Volver a mis Semillas</button>
      </div>
      ${volver ? '<p class="scenario-notice">Al elegir otra situación empezarás una práctica nueva. Si prefieres, puedes volver a la que estabas haciendo.</p>' : ''}
    </section>`;
  $("experienceContent").querySelectorAll('[data-start-scenario]').forEach(b => b.onclick = () => startSeed(semillaBase.id, b.dataset.startScenario));
  if ($('returnToScenario')) $('returnToScenario').onclick = () => { stepIndex = pasoAntesEscenarios; pasoAntesEscenarios = null; renderExperience(); };
  $('leaveScenarios').onclick = () => { showPanel('catalogPanel'); renderCatalog(); };
}

function progressCount() {
  return (semilla?.pasos?.length || 0) + 4;
}

function renderProgress() {
  const total = progressCount();
  const current = Math.max(0, stepIndex + 2);
  $("stepProgress").innerHTML = Array.from({ length:total }, (_, index) =>
    `<span class="progress__item ${index < current ? "done" : index === current ? "active" : ""}"></span>`
  ).join("");
}

function renderExperience() {
  const selector = stepIndex === -3;
  $("stepProgress").hidden = selector;
  $("scenarioContext").hidden = selector || !semilla?.escenarioId;
  $("scenarioTitle").textContent = semilla?.escenarioTitulo || '';
  $("changeScenario").hidden = !semilla?.escenarioId || Boolean(escenarioRequeridoMision());
  $("scenarioLabel").textContent = escenarioRequeridoMision() ? "Situación de esta Misión" : "Situación elegida";
  if (selector) renderEscenarios();
  else { renderProgress(); renderPasoActual(); }
  const encabezado = $("experienceContent").querySelector('h2');
  if (encabezado) { encabezado.tabIndex = -1; encabezado.focus({ preventScroll:true }); }
}

function renderPasoActual() {
  if (stepIndex === -2) return renderWelcome();
  if (stepIndex === -1) return renderSituation();
  if (stepIndex < semilla.pasos.length) return renderQuestion(semilla.pasos[stepIndex]);
  if (stepIndex === semilla.pasos.length) return renderComposer();
  if (stepIndex === semilla.pasos.length + 1) return renderRecorder();
  return renderClosing();
}

function renderWelcome() {
  const data = semilla.bienvenida || {};
  $("experienceContent").innerHTML = `
    <section class="scene">
      ${imageMarkup(semilla, "seed-illustration--welcome")}
      <div class="scene__art ${seedImageUrl(semilla) ? "hidden" : ""}">🌱🦜</div>
      <div class="eyebrow">${escapeHtml(semilla.titulo)}</div>
      <h2>${escapeHtml(data.titulo || semilla.titulo)}</h2>
      <p>${escapeHtml(data.mensaje || "")}</p>
      <p><strong>Lía:</strong> ${escapeHtml(data.lia || "")}</p>
      <div class="actions" style="justify-content:center">
        <button id="continueSeed" class="btn btn--primary" type="button">Comenzar paso a paso</button>
        <button id="leaveSeed" class="btn btn--light" type="button">Ahora no</button>
      </div>
    </section>`;
  activateImageFallback($("experienceContent"));
  $("continueSeed").onclick = () => { stepIndex++; renderExperience(); };
  $("leaveSeed").onclick = () => { showPanel("catalogPanel"); renderCatalog(); };
}

function renderSituation() {
  const data = semilla.situacion || {};
  $("experienceContent").innerHTML = `
    <section class="scene">
      <div class="eyebrow">La situación</div>
      <h2>${escapeHtml(data.titulo || "")}</h2>
      ${imageMarkup(semilla, "seed-illustration--situation")}
      <div class="scene__art ${seedImageUrl(semilla) ? "hidden" : ""}">
        ${escapeHtml(data.ilustracion || "🌈")}
      </div>
      <p class="scene__situation-text">${escapeHtml(data.texto || "")}</p>
      <div class="actions" style="justify-content:center">
        <button id="listenSituation" class="btn btn--light" type="button">🔊 Escuchar</button>
        <button id="continueSituation" class="btn btn--primary" type="button">Continuar</button>
      </div>
    </section>`;
  activateImageFallback($("experienceContent"));
  $("listenSituation").onclick = () => speak(data.audioTexto || data.texto);
  $("continueSituation").onclick = () => { stepIndex++; renderExperience(); };
}

function selectedValue(step) {
  const value = respuestas[step.id];
  return Array.isArray(value) ? value : value ? [value] : [];
}

function answerText(step, id) {
  if (id === "__other") return String(respuestas[`${step.id}__other`] || "").trim();
  return step.opciones?.find(item => item.id === id)?.texto || "";
}

function renderQuestion(step) {
  const selected = selectedValue(step);
  $("experienceContent").innerHTML = `
    <section class="question">
      <div class="eyebrow">Paso ${Number(step.orden || stepIndex + 1)} de ${semilla.pasos.length}</div>
      <h2>${escapeHtml(step.titulo)}</h2>
      <p class="question__help">${escapeHtml(step.ayuda || "")}</p>
      <div class="options">
        ${(step.opciones || []).map(option => `
          <button type="button" class="option ${selected.includes(option.id) ? "selected" : ""}" data-answer="${escapeHtml(option.id)}" aria-pressed="${selected.includes(option.id)}">
            ${option.icono ? `<span class="option__icon">${escapeHtml(option.icono)}</span>` : ""}
            ${escapeHtml(option.texto)}
          </button>`).join("")}
      </div>
      ${step.otraRespuesta ? `
        <div class="other">
          <label for="otherAnswer"><strong>También puedo decirlo con mis palabras:</strong></label>
          <textarea id="otherAnswer" placeholder="Puedes escribirlo o decirlo con tu voz...">${escapeHtml(respuestas[`${step.id}__other`] || "")}</textarea>
          <div class="actions">
            <button id="dictateOtherAnswer" class="btn btn--light" type="button">🎤 Decirlo con mi voz</button>
            <button id="stopOtherDictation" class="btn btn--light" type="button" disabled>⏹️ Detener</button>
          </div>
        </div>` : ""}
      <div class="actions">
        <button id="previousQuestion" class="btn btn--light" type="button">← Atrás</button>
        <button id="nextQuestion" class="btn btn--primary" type="button" ${selected.length || respuestas[`${step.id}__other`] ? "" : "disabled"}>Continuar</button>
      </div>
    </section>`;

  $("experienceContent").querySelectorAll("[data-answer]").forEach(button => {
    button.onclick = () => {
      const id = button.dataset.answer;
      if (step.tipo === "opcion-multiple") {
        const current = selectedValue(step);
        const next = current.includes(id)
          ? current.filter(value => value !== id)
          : [...current, id].slice(0, Number(step.maximo || 99));
        respuestas[step.id] = next;
      } else {
        respuestas[step.id] = id;
      }
      renderQuestion(step);
      $("experienceContent").querySelectorAll("[data-answer]").forEach(b => { if (b.dataset.answer === id) b.focus({ preventScroll:true }); });
    };
  });

  const other = $("otherAnswer");
  if (other) {
    other.oninput = () => {
      respuestas[`${step.id}__other`] = other.value;
      $("nextQuestion").disabled = !selectedValue(step).length && !other.value.trim();
    };

    const dictateButton = $("dictateOtherAnswer");
    const stopDictationButton = $("stopOtherDictation");

    if (dictateButton && stopDictationButton) {
      dictateButton.onclick = () =>
        startDictationInto(other, dictateButton, stopDictationButton);

      stopDictationButton.onclick = stopActiveDictation;
    }
  }
  $("previousQuestion").onclick = () => { stopActiveDictation(); stepIndex--; renderExperience(); };
  $("nextQuestion").onclick = () => { stopActiveDictation(); stepIndex++; renderExperience(); };
}

function chosenText(stepId) {
  const step = semilla.pasos.find(item => item.id === stepId);
  if (!step) return "";
  const other = String(respuestas[`${stepId}__other`] || "").trim();
  if (other) return other;
  const selected = selectedValue(step);
  return selected.map(id => answerText(step, id)).filter(Boolean).join(" y ");
}

function normalizePhrase(value = "") {
  return String(value).trim().replace(/[.]+$/,"").replace(/^que\s+/i,"");
}

function builtResponse() {
  const originalIds = ["describir","expresar","solicitar","consecuencia"];
  const usesOriginalTemplate = originalIds.every(id =>
    semilla?.pasos?.some(step => step.id === id)
  );

  if (usesOriginalTemplate) {
    const d = normalizePhrase(chosenText("describir"));
    const e = normalizePhrase(chosenText("expresar")).toLowerCase();
    const s = normalizePhrase(chosenText("solicitar"))
      .replace(/^que\s+/i,"")
      .toLowerCase();
    const c = normalizePhrase(chosenText("consecuencia")).toLowerCase();

    return `Cuando ${
      d.charAt(0).toLowerCase() + d.slice(1)
    }, me siento ${e}. Me gustaría ${s}. Así ${c}.`;
  }

  if (semilla?.id === "algo-que-consegui-esta-semana") {
    return [
      `Esta semana quiero recordar esto: ${normalizePhrase(chosenText("experiencia"))}.`,
      `Me sentí: ${normalizePhrase(chosenText("sentimiento"))}.`,
      `Para avanzar hice esto: ${normalizePhrase(chosenText("comoLoHice"))}.`,
      `Hoy reconozco algo importante de mí: ${normalizePhrase(chosenText("reconozco"))}.`
    ].join(" ").replace(/\.\./g, ".");
  }

  if (semilla?.id === "lo-que-descubri-de-mi") {
    return [
      `Quiero recordar esto: ${normalizePhrase(chosenText("recordar"))}.`,
      `Descubrí algo de mí: ${normalizePhrase(chosenText("aprendi"))}.`,
      `Me sorprendió descubrir esto: ${normalizePhrase(chosenText("sorpresa"))}.`,
      `Quiero seguir practicando esto: ${normalizePhrase(chosenText("seguir"))}.`
    ].join(" ").replace(/\.\./g, ".");
  }

  const template = String(
    semilla?.plantillaRespuesta ||
    semilla?.pasos?.map(step => `{${step.id}}`).join(". ") ||
    ""
  );

  return template
    .replace(/\{([^}]+)\}/g, (_, stepId) =>
      normalizePhrase(chosenText(stepId))
    )
    .replace(/\s+/g," ")
    .replace(/\s+([.,;:!?])/g,"$1")
    .trim();
}

// Una plantilla que referencia solo un paso separa la frase de transferencia
// del resto de elecciones. Se deriva del contrato vigente, sin IDs de Semilla.
function pasoFraseFinal() {
  const referencia = String(semilla?.plantillaRespuesta || "").trim().match(/^\{([^{}]+)\}$/);
  if (!referencia || semilla?.pasos?.length < 2) return null;
  return semilla.pasos.find(step => step.id === referencia[1]) || null;
}

function resumenEleccionesHtml(pasoFrase) {
  const filas = semilla.pasos.filter(step => step.id !== pasoFrase.id).map(step => {
    const { seleccion, propia } = textosRespuestaPaso(step, respuestas);
    const contenido = [
      seleccion ? `<p>${escapeHtml(seleccion)}</p>` : "",
      propia ? `<p><strong>Con mis palabras:</strong> ${escapeHtml(propia)}</p>` : ""
    ].filter(Boolean).join("");
    if (!contenido) return "";
    return `<li><h3>${escapeHtml(step.titulo || "Mi elección")}</h3>${contenido}</li>`;
  }).filter(Boolean).join("");
  return filas ? `<ol class="composer-summary" aria-label="Mis respuestas y elecciones">${filas}</ol>` : "";
}

function renderComposer() {
  const response = builtResponse();
  const pasoFrase = pasoFraseFinal();
  respuestas.respuestaConstruida = response;
  $("experienceContent").innerHTML = `
    <section>
      <div class="eyebrow">Juntamos tus ideas</div>
      <h2>${pasoFrase ? "Estas son tus ideas" : "Esta es tu frase"}</h2>
      ${pasoFrase ? resumenEleccionesHtml(pasoFrase) : ""}
      ${pasoFrase ? `<h3 class="composer-phrase-title">${escapeHtml(pasoFrase.titulo || "Mi frase para probar")}</h3>` : ""}
      <div class="composer" id="composedResponse">${escapeHtml(response)}</div>
      <p class="question__help">Puedes escucharla, volver atrás o practicarla con tus propias palabras.</p>
      <div class="actions">
        <button id="listenResponse" class="btn btn--light" type="button">🔊 Escuchar</button>
        <button id="previousComposer" class="btn btn--light" type="button">← Cambiar algo</button>
        <button id="practiceResponse" class="btn btn--primary" type="button">🎤 Practicar con mi voz</button>
      </div>
    </section>`;
  $("listenResponse").onclick = () => speak(response);
  $("previousComposer").onclick = () => { stepIndex--; renderExperience(); };
  $("practiceResponse").onclick = () => { stepIndex++; renderExperience(); };
}

function configureRecognition(generacion = generacionExperiencia) {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) return;
  recognition = new Recognition();
  recognition.lang = "es-ES";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = event => {
    if (generacion !== generacionExperiencia) return;
    let finalText = "";
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const value = event.results[i][0].transcript;
      if (event.results[i].isFinal) finalText += value;
      else interim += value;
    }
    transcript = `${transcript} ${finalText}`.trim();
    const field = $("transcript");
    if (field) field.value = `${transcript} ${interim}`.trim();
  };
  recognition.onerror = event => console.warn("Reconocimiento de voz:", event.error);
}

function stopRecorderTracks() {
  if (mediaRecorder?.stream) mediaRecorder.stream.getTracks().forEach(track => track.stop());
  mediaRecorder = null;
  clearInterval(recordingTimer);
  recordingTimer = null;
  try { recognition?.stop(); } catch {}
}

function updateRecorderUI(message = "") {
  const time = $("recordingTime");
  const player = $("audioPlayer");
  const status = $("recordingStatus");
  if (time) time.textContent = formatDuration(audioDuration);
  if (player) {
    player.classList.toggle("hidden", !audioData);
    if (audioData) player.src = audioData;
  }
  if (status) status.textContent = message || (audioData ? "Tu grabación está lista. Puedes escucharla o repetir." : "Cuando estés preparada, puedes grabar o continuar sin grabación.");
  const next = $("finishRecording");
  if (next) next.disabled = guardandoSesion || !audioData;
}

async function startRecording() {
  if (guardandoSesion) return;
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    updateRecorderUI("Este navegador no permite grabar. Puedes continuar sin grabación.");
    $("continueWithoutRecording")?.classList.remove("hidden");
    return;
  }
  const generacion = generacionExperiencia;
  const stream = await navigator.mediaDevices.getUserMedia({ audio:true });
  if (generacion !== generacionExperiencia) { stream.getTracks().forEach(track => track.stop()); return; }
  configureRecognition(generacion);
  const preferred = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
    ? "audio/webm;codecs=opus" : "audio/webm";
  audioChunks = [];
  try {
    mediaRecorder = new MediaRecorder(stream, {
      mimeType:preferred,
      audioBitsPerSecond:AUDIO_BITS_PER_SECOND
    });
  } catch {
    mediaRecorder = new MediaRecorder(stream, { mimeType:preferred });
  }
  audioMimeType = mediaRecorder.mimeType || preferred;
  recordingStartedAt = Date.now();
  recordingAttempts++;
  transcript = "";
  audioSaveWarning = "";
  if ($("transcript")) $("transcript").value = "";
  mediaRecorder.ondataavailable = event => { if (generacion === generacionExperiencia && event.data.size) audioChunks.push(event.data); };
  mediaRecorder.onstop = () => {
    if (generacion !== generacionExperiencia) { stream.getTracks().forEach(track => track.stop()); return; }
    audioDuration = Math.max(1, Math.round((Date.now() - recordingStartedAt) / 1000));
    const blob = new Blob(audioChunks, { type:audioMimeType });
    const reader = new FileReader();
    reader.onloadend = () => {
      if (generacion !== generacionExperiencia) return;
      audioData = String(reader.result || "");
      if (audioData.length > MAX_AUDIO_DATA_LENGTH) {
        updateRecorderUI(
          "Tu grabación está completa, pero quedó demasiado grande para guardarla dentro de la Academia. Puedes guardar tu práctica: tus respuestas no se perderán y la Academia continuará sin incorporar este audio."
        );
      } else {
        updateRecorderUI();
      }
    };
    reader.readAsDataURL(blob);
    stream.getTracks().forEach(track => track.stop());
    try { recognition?.stop(); } catch {}
  };
  mediaRecorder.start();
  try { recognition?.start(); } catch {}
  $("startRecording").disabled = true;
  $("stopRecording").disabled = false;
  updateRecorderUI("Grabando... Habla con calma. Puedes repetir después.");
  recordingTimer = setInterval(() => {
    audioDuration = Math.round((Date.now() - recordingStartedAt) / 1000);
    if ($("recordingTime")) $("recordingTime").textContent = formatDuration(audioDuration);
    if (audioDuration >= MAX_RECORDING_SECONDS) stopRecording();
  }, 250);
}

function stopRecording() {
  if (mediaRecorder?.state === "recording") mediaRecorder.stop();
  clearInterval(recordingTimer);
  $("startRecording").disabled = false;
  $("stopRecording").disabled = true;
}

function clearRecording() {
  if (!audioData) {
    updateRecorderUI("Todavía no hay una grabación guardada para borrar.");
    return;
  }

  if (!window.confirm("¿Quieres borrar esta grabación y volver a intentarlo?")) {
    return;
  }

  audioData = "";
  audioDuration = 0;
  audioSaveWarning = "";
  transcript = "";
  if ($("transcript")) $("transcript").value = "";
  updateRecorderUI("La grabación fue eliminada. Puedes volver a intentarlo.");
}

function downloadCurrentRecording() {
  if (!audioData) return;
  const link = document.createElement("a");
  const extension = audioMimeType.includes("ogg") ? "ogg" : "webm";
  link.href = audioData;
  link.download = `creciendo-por-dentro-${semilla?.id || "grabacion"}.${extension}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function renderRecorder() {
  $("experienceContent").innerHTML = `
    <section>
      <div class="eyebrow">Tu voz</div>
      <h2>Practica tu frase</h2>
      <div class="recording">
        <div class="recorder">
          <p><strong>No tiene que salir perfecta.</strong> Grabar tu voz es una buena forma de practicar, pero tú decides si quieres hacerlo hoy.</p>
          <div id="recordingTime" class="recorder__time">00:00</div>
          <div class="actions">
            <button id="startRecording" class="btn btn--violet" type="button">🎤 Grabar</button>
            <button id="stopRecording" class="btn btn--light" type="button" disabled>⏹️ Detener</button>
            <button id="clearRecording" class="btn btn--danger" type="button">🗑️ Borrar</button>
          </div>
          <audio id="audioPlayer" class="hidden" controls></audio>
          <div id="recordingStatus" class="status">Cuando estés preparada, puedes grabar o continuar sin grabación.</div>
        </div>
        <div>
          <h3>La frase que practicas</h3>
          <div class="composer">${escapeHtml(respuestas.respuestaConstruida || builtResponse())}</div>
          <button id="listenBeforeRecording" class="btn btn--light" type="button">🔊 Escuchar primero</button>
          <h3>Lo que entendió la Academia</h3>
          <textarea id="transcript" class="transcript" placeholder="La transcripción aparecerá aquí...">${escapeHtml(transcript)}</textarea>
          <div class="actions">
            <button id="listenTranscript" class="btn btn--light" type="button">🔊 Escuchar lo que entendió la Academia</button>
          </div>
        </div>
      </div>
      <div class="actions">
        <button id="previousRecorder" class="btn btn--light" type="button">← Volver</button>
        <button id="finishRecording" class="btn btn--primary" type="button" disabled>Guardar mi práctica</button>
        <button id="continueWithoutRecording" class="btn btn--light" type="button">Continuar sin grabar</button>
      </div>
    </section>`;
  $("startRecording").onclick = () => startRecording().catch(error => updateRecorderUI(`No pudimos iniciar la grabación: ${error.message}`));
  $("stopRecording").onclick = stopRecording;
  $("clearRecording").onclick = clearRecording;
  $("listenBeforeRecording").onclick = () => speak(respuestas.respuestaConstruida || builtResponse());
  $("listenTranscript").onclick = () => {
    const understood = String($("transcript")?.value || "").trim();
    if (!understood) {
      updateRecorderUI("Todavía no hay una transcripción para escuchar.");
      return;
    }
    speak(understood);
  };
  $("previousRecorder").onclick = () => { stopRecorderTracks(); stepIndex--; renderExperience(); };
  $("finishRecording").onclick = () => saveSession();
  $("continueWithoutRecording").onclick = () => saveSession({ withoutRecording:true });
  updateRecorderUI();
}

function basicAnalysis() {
  const target = String(respuestas.respuestaConstruida || "");
  const heard = String($("transcript")?.value || transcript || "").trim();
  const targetWords = target.toLowerCase().match(/[a-záéíóúüñ]+/g) || [];
  const heardWords = heard.toLowerCase().match(/[a-záéíóúüñ]+/g) || [];
  const targetSet = new Set(targetWords);
  const recognized = heardWords.filter(word => targetSet.has(word));
  return {
    tipo:"practica_oral_no_diagnostica",
    palabrasObjetivo:targetWords.length,
    palabrasReconocidas:[...new Set(recognized)].length,
    transcripcionDisponible:Boolean(heard),
    mensaje:heard
      ? "Se guardó la práctica oral para poder revisar el progreso."
      : "La práctica se guardó sin transcripción automática."
  };
}

function errorEsTamanoAudio(error) {
  const mensaje = String(error?.message || error || "").toLowerCase();
  return mensaje.includes("grabación es demasiado grande") ||
    mensaje.includes("recording is too large") ||
    mensaje.includes("maximum size") ||
    mensaje.includes("too large");
}

async function saveSession({ withoutRecording = false } = {}) {
  if (guardandoSesion) return;
  guardandoSesion = true;
  const controles = ['finishRecording','continueWithoutRecording','previousRecorder','changeScenario','startRecording','clearRecording'];
  controles.forEach(id => { if ($(id)) $(id).disabled = true; });
  detenerActividad();
  try {
    const allowedSeedIds = missionAllowedIds();
    if (errorEscenarioMision || (escenarioRequeridoMision() && semilla?.escenarioId !== escenarioRequeridoMision())) {
      throw new Error("La situación realizada no corresponde a esta Misión.");
    }
    if (
      misionActiva &&
      allowedSeedIds.length &&
      !allowedSeedIds.includes(String(semilla?.id || ""))
    ) {
      throw new Error("Esta Semilla no forma parte de la misión activa.");
    }

    const finalTranscript = withoutRecording
      ? ""
      : String($("transcript")?.value || transcript || "").trim();
    const wantedAudio = !withoutRecording && Boolean(audioData);
    let audioGuardable = wantedAudio && audioData.length <= MAX_AUDIO_DATA_LENGTH;
    let audioOmitted = wantedAudio && !audioGuardable;
    audioSaveWarning = audioOmitted
      ? "Tus respuestas quedaron guardadas, pero esta grabación era demasiado grande para incorporarla a la Academia."
      : "";

    const payloadBase = {
      semillaId:semilla.id,
      ...(semilla.escenarioId ? { escenarioId:semilla.escenarioId, escenarioTitulo:semilla.escenarioTitulo } : {}),
      titulo:semilla.titulo,
      familia:semilla.familia,
      tipoSituacion:semilla.tipoSituacion,
      nivelApoyo:semilla.nivelApoyo,
      fechaInicio:inicioSesion?.toISOString() || "",
      duracion:Math.max(0, Math.round((Date.now() - inicioSesion.getTime()) / 1000)),
      intentos:recordingAttempts,
      respuestaConstruida:respuestas.respuestaConstruida || builtResponse(),
      mimeType:audioMimeType,
      transcripcion:finalTranscript,
      respuestas,
      analisisEducativo:basicAnalysis(),
      observacionFamilia:"",
      misionId:misionId || ""
    };

    let sessionId = "";
    try {
      sessionId = await Academia.semillas.guardarSesion({
        ...payloadBase,
        audioData:audioGuardable ? audioData : "",
        duracionAudio:audioGuardable ? audioDuration : 0
      });
    } catch (error) {
      if (!audioGuardable || !errorEsTamanoAudio(error)) throw error;

      console.warn(
        "[CreciendoPorDentro] El audio no pudo guardarse por tamaño. Se conserva la práctica sin audio.",
        error
      );
      audioGuardable = false;
      audioOmitted = true;
      audioSaveWarning =
        "Tus respuestas quedaron guardadas, pero esta grabación no pudo incorporarse por su tamaño.";

      sessionId = await Academia.semillas.guardarSesion({
        ...payloadBase,
        audioData:"",
        duracionAudio:0
      });
    }

    let missionResult = null;
    if (misionActiva && misionId) {
      missionResult = await Academia.evidencias.registrarParaMision({
        misionId,
        modulo:"creciendo-por-dentro",
        tipo:"semilla_completada",
        actividadId:semilla.id,
        sesionId:sessionId,
        atributos:{
          familia:semilla.familia,
          tipoSituacion:semilla.tipoSituacion,
          nivelApoyo:Number(semilla.nivelApoyo || 1),
          semillasIds:allowedSeedIds,
          ...(semilla.escenarioId ? { escenarioId:semilla.escenarioId, escenarioTitulo:semilla.escenarioTitulo } : {})
        },
        resultado:{
          titulo:semilla.titulo,
          intentos:recordingAttempts,
          duracionAudio:audioGuardable ? audioDuration : 0,
          grabacionConfirmada:audioGuardable
        },
        destinoRevision:
          `../creciendo-por-dentro/?vista=historial` +
          `&misionId=${encodeURIComponent(misionId)}` +
          `&sesionId=${encodeURIComponent(sessionId)}`
      });
      misionActiva.progreso = {
        ...(misionActiva.progreso || {}),
        cantidadActual:missionResult.cantidadActual,
        cantidadObjetivo:missionResult.cantidadObjetivo
      };
      misionActiva.estado = missionResult.estado;
      updateMissionBanner();
    }
    await loadSavedSessions();
    stepIndex = semilla.pasos.length + 2;
    renderExperience();
    mostrarCelebracion({
      titulo:missionResult?.objetivoAlcanzado ? "¡Misión terminada!" : "¡Semilla plantada!",
      mensaje:semilla.cierre?.frase || semilla.cierre?.mensaje || "Has completado una nueva práctica.",
      duracion:2800,
      mostrarGuacamayas:true
    });
  } catch (error) {
    console.error(error);
    updateRecorderUI(
      `No pudimos terminar de guardar. Tus respuestas siguen en esta pantalla: no la cierres y pide ayuda a tu familia. Motivo: ${error.message}`
    );
  } finally {
    guardandoSesion = false;
    controles.forEach(id => { if ($(id)) $(id).disabled = false; });
    if ($('finishRecording')) $('finishRecording').disabled = !audioData;
  }
}

function renderClosing() {
  const close = semilla.cierre || {};
  $("experienceContent").innerHTML = `
    <section class="closing">
      <div class="closing__growth">🌱</div>
      <div class="eyebrow">Tu jardín está creciendo</div>
      <h2>${escapeHtml(close.titulo || "Semilla completada")}</h2>
      <p class="lead">${escapeHtml(close.mensaje || "")}</p>
      <p><strong>Lía:</strong> ${escapeHtml(close.lia || "")}</p>
      <p><strong>🦜 La guacamaya celebra contigo mientras nace un nuevo brote en tu jardín.</strong></p>
      <p class="closing__phrase">“${escapeHtml(close.frase || "Yo puedo volver a intentarlo.")}”</p>
      ${audioSaveWarning ? `
        <div class="status">
          <strong>🎙️ Tu trabajo sí quedó guardado.</strong><br>
          ${escapeHtml(audioSaveWarning)} Si quieres conservar también esta grabación, guarda una copia y pide ayuda a tu familia.
        </div>
        <div class="actions" style="justify-content:center">
          <button id="downloadUnsavedRecording" class="btn btn--light" type="button">💾 Guardar copia de mi grabación</button>
        </div>` : ""}
      <div class="actions" style="justify-content:center">
        <button id="repeatSeed" class="btn btn--violet" type="button">${semilla.escenarioId ? "🔁 Practicar este escenario otra vez" : "🔁 Practicar otra vez"}</button>
        ${semilla.escenarioId && !escenarioRequeridoMision() ? '<button id="tryOtherScenario" class="btn btn--light" type="button">🌱 Probar otra situación</button>' : ""}
        <button id="finishSeed" class="btn btn--primary" type="button">🌿 Volver a mis Semillas</button>
        <button id="viewHistoryAfter" class="btn btn--light" type="button">📚 Ver mi jardín</button>
      </div>
    </section>`;
  $("repeatSeed").onclick = () => startSeed(semilla.id, semilla.escenarioId || null);
  if ($("tryOtherScenario")) $("tryOtherScenario").onclick = () => startSeed(semilla.id);
  $("finishSeed").onclick = () => { showPanel("catalogPanel"); renderCatalog(); };
  $("viewHistoryAfter").onclick = showHistory;
  if ($("downloadUnsavedRecording")) {
    $("downloadUnsavedRecording").onclick = downloadCurrentRecording;
  }
}

async function loadMission() {
  if (!misionId) return updateMissionBanner();
  try {
    const task = await Academia.tareas.obtener(misionId);
    const criterion = task?.criterioCumplimiento || {};
    if (!task || task.modulo !== "creciendo-por-dentro" || criterion.evidenciaTipo !== "semilla_completada") {
      throw new Error("La misión no corresponde a Creciendo por dentro.");
    }
    misionActiva = task;
    const requerido = escenarioRequeridoMision();
    if (requerido) {
      const ids = missionAllowedIds();
      const base = catalogo.semillas.find(item => item.id === ids[0]);
      if (Number(criterion.cantidadObjetivo) !== 1 || ids.length !== 1 || !tieneEscenarios(base) || !resolverEscenario(base, requerido)) {
        errorEscenarioMision = "Esta situación de la Misión ya no está disponible. Pide a tu familia que revise la Misión.";
      }
    }
  } catch (error) {
    console.error(error);
    misionId = null;
    misionActiva = null;
  }
  updateMissionBanner();
}

function updateMissionBanner() {
  const banner = $("missionBanner");
  if (!misionActiva) {
    banner.className = "mission mission--free";
    $("missionTitle").textContent = "🌈 Exploración libre";
    $("missionDescription").textContent = "Puedes elegir la Semilla que más te ayude hoy.";
    $("missionProgress").textContent = "Sin misión";
    $("missionHelp").classList.add("hidden");
    return;
  }
  if (errorEscenarioMision) {
    banner.className = "mission";
    $("missionTitle").textContent = "🌱 Revisar esta Misión";
    $("missionDescription").textContent = errorEscenarioMision;
    $("missionProgress").textContent = "";
    $("missionHelp").classList.add("hidden");
    $("startRecommended").hidden = true;
    return;
  }
  const criterion = misionActiva.criterioCumplimiento || {};
  const progress = misionActiva.progreso || {};
  const current = Number(progress.cantidadActual || 0);
  const target = Number(criterion.cantidadObjetivo || 1);
  const done = current >= target;
  banner.className = `mission ${done ? "mission--done" : ""}`;
  $("missionTitle").textContent = done ? "🎉 ¡Misión terminada!" : "🌟 Misión de Semillas";
  $("missionDescription").textContent =
    misionActiva.presentacionAlumno?.descripcionMision ||
    misionActiva.descripcion ||
    `Completa ${target} Semilla${target === 1 ? "" : "s"}.`;
  $("missionProgress").textContent = `${current} de ${target}`;
  $("missionHelp").classList.toggle("hidden", done);
}

async function toggleHelp() {
  if (!misionActiva || !misionId) return;
  const needHelp = misionActiva.estado !== "necesita_ayuda";
  const state = needHelp ? "necesita_ayuda" : "en_curso";
  await Academia.tareas.cambiarEstado(misionId, state);
  misionActiva.estado = state;
  $("missionHelp").textContent = needHelp ? "▶️ Ya puedo continuar" : "🤝 Necesito ayuda";
}

async function loadSavedSessions() {
  /*
   * Las sesiones se resuelven mediante Persona Activa en Academia.semillas.
   * Así el alumno conserva su historial propio y la familia/profesional
   * relacionado puede consultar el trabajo de la Persona Activa autorizada.
   */
  try {
    sesiones = await Academia.semillas.leerSesiones();
  } catch (error) {
    console.warn("[CreciendoPorDentro] No se pudo cargar el historial de Semillas.", error);
    sesiones = [];
  }

  return sesiones;
}

function formatDate(value) {
  if (!value) return "Fecha no disponible";
  const date = typeof value.toDate === "function" ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? "Fecha no disponible" :
    new Intl.DateTimeFormat("es-ES",{ dateStyle:"medium", timeStyle:"short" }).format(date);
}


function semillaDeSesion(item = {}) {
  const id = String(item.semillaId || "").trim();
  const base = catalogo.semillas.find(seed => String(seed.id) === id) || null;
  return resolverSemillaSesion(base, item);
}

function textosRespuestaPaso(step = {}, respuestasSesion = {}) {
  const valor = respuestasSesion?.[step.id];
  const seleccionados = Array.isArray(valor)
    ? valor.map(String)
    : valor
      ? [String(valor)]
      : [];

  const textosSeleccionados = seleccionados
    .map(id => step.opciones?.find(option => String(option.id) === id)?.texto || id)
    .filter(Boolean);

  const propia = String(respuestasSesion?.[`${step.id}__other`] || "").trim();

  return {
    seleccion: textosSeleccionados.join(" · "),
    propia
  };
}

function respuestasSesionHtml(item = {}) {
  const seed = semillaDeSesion(item);
  const respuestasSesion =
    item.respuestas && typeof item.respuestas === "object"
      ? item.respuestas
      : {};

  if (seed?.pasos?.length) {
    const filas = seed.pasos.map((step, index) => {
      const respuesta = textosRespuestaPaso(step, respuestasSesion);
      const contenido = [
        respuesta.seleccion
          ? `<div><strong>Respuesta:</strong> ${escapeHtml(respuesta.seleccion)}</div>`
          : "",
        respuesta.propia
          ? `<div><strong>Con sus palabras:</strong> ${escapeHtml(respuesta.propia)}</div>`
          : ""
      ].filter(Boolean).join("");

      return `
        <div class="history-answer">
          <div><strong>${Number(step.orden || index + 1)}. ${escapeHtml(step.titulo || "Paso")}</strong></div>
          ${contenido || '<div class="history-answer__empty">Sin respuesta guardada.</div>'}
        </div>`;
    }).join("");

    return `
      <section class="history-answers">
        <h4>💭 Cómo construí mi respuesta</h4>
        ${filas}
      </section>`;
  }

  return "";
}

function datosPracticaSesionHtml(item = {}) {
  const analisis =
    item.analisisEducativo && typeof item.analisisEducativo === "object"
      ? item.analisisEducativo
      : {};

  const datos = [
    item.tipoSituacion
      ? `<p><strong>🎯 Situación:</strong> ${escapeHtml(item.tipoSituacion)}</p>`
      : "",
    item.nivelApoyo
      ? `<p><strong>🤝 Nivel de apoyo:</strong> ${escapeHtml(item.nivelApoyo)}</p>`
      : "",
    analisis.tipo
      ? `<p><strong>🔎 Tipo de análisis:</strong> ${escapeHtml(analisis.tipo)}</p>`
      : "",
    Number.isFinite(Number(analisis.palabrasObjetivo))
      ? `<p><strong>🗣️ Palabras objetivo:</strong> ${Number(analisis.palabrasObjetivo)}</p>`
      : "",
    Number.isFinite(Number(analisis.palabrasReconocidas))
      ? `<p><strong>✅ Palabras reconocidas:</strong> ${Number(analisis.palabrasReconocidas)}</p>`
      : "",
    analisis.mensaje
      ? `<p><strong>💡 Observación de la Academia:</strong> ${escapeHtml(analisis.mensaje)}</p>`
      : ""
  ].filter(Boolean);

  if (!datos.length) return "";

  return `
    <details class="history-practice-data">
      <summary><strong>🔎 Datos de la práctica</strong></summary>
      <div class="history-practice-data__content">
        ${datos.join("")}
      </div>
    </details>`;
}

async function showHistory() {
  showPanel("historyPanel");
  $("historyStatus").classList.remove("hidden");
  $("historyStatus").textContent = "Cargando tu jardín...";
  try {
    await loadSavedSessions();
    const sessionFilter = params.get("sesionId");
    const list = sessionFilter ? sesiones.filter(item => item.id === sessionFilter) : sesiones;
    if (!list.length) {
      $("historyStatus").textContent = "Todavía no hay Semillas guardadas. Tu primer brote está esperando 🌱";
      $("historyList").innerHTML = "";
      return;
    }
    $("historyStatus").classList.add("hidden");
    $("historyList").innerHTML = list.map(item => `
      <article class="history-card">
        <h3>🌱 ${escapeHtml(item.titulo || "Semilla")}</h3>
        ${semillaDeSesion(item)?.escenarioTitulo ? `<p class="history-scenario"><strong>Escenario:</strong> ${escapeHtml(item.escenarioTitulo || semillaDeSesion(item).escenarioTitulo)}</p>` : ''}
        ${semillaDeSesion(item)?.escenarioNoDisponible ? '<p>No está disponible el contenido de esta situación. Tu frase guardada se conserva.</p>' : ''}
        <div class="history-card__meta">${escapeHtml(formatDate(item.actualizadaEn || item.creadaEn))} · ${Number(item.intentos || 0)} intento(s)</div>
        ${item.audioData ? `<audio controls src="${item.audioData}"></audio>` : "<p>Práctica guardada sin audio.</p>"}
        <details>
          <summary><strong>Ver detalles</strong></summary>
          ${respuestasSesionHtml(item)}
          ${datosPracticaSesionHtml(item)}
          <p><strong>🗣️ Mi frase:</strong> ${escapeHtml(item.respuestaConstruida || "")}</p>
          <p><strong>🎙️ Transcripción:</strong> ${escapeHtml(item.transcripcion || "Sin transcripción.")}</p>
          <p><strong>👨‍👩‍👧 Observación familiar:</strong> ${escapeHtml(item.observacionFamilia || "Sin observación familiar.")}</p>
        </details>
      </article>
    `).join("");
  } catch (error) {
    $("historyStatus").textContent = `No pudimos cargar el jardín: ${error.message}`;
  }
}

async function initialize() {
  await auth.authStateReady();
  if (!auth.currentUser) {
    window.location.replace("/academia-gloria/login.html");
    return;
  }

  /*
   * El catálogo es contenido editorial local (semillas.json).
   *
   * En exploración libre puede mostrarse inmediatamente.
   * Cuando la entrada viene asociada a una misión, primero resolvemos la misión
   * para no enseñar durante unos segundos Semillas que no forman parte de ella.
   */
  await loadCatalog();

  if (!misionId) {
    renderFilters();
    renderCatalog();
  } else {
    $("catalogEmpty").classList.remove("hidden");
    $("catalogEmpty").textContent = "🌱 Preparando tu misión...";
  }

  try {
    contextoUsuario = await ContextoUsuario.inicializar();
    perfil = contextoUsuario?.personaActiva || await Academia.usuario.leerPerfil();
    esPersonaPropia = contextoUsuario?.esPersonaPropia !== false;
  } catch (error) {
    console.warn("[CreciendoPorDentro] No se pudo resolver Persona Activa; se mantiene compatibilidad.", error);
    perfil = await Academia.usuario.leerPerfil();
    esPersonaPropia = true;
  }

  /*
   * La misión define qué Semillas pueden mostrarse, por lo que se resuelve antes
   * del primer render del catálogo contextual. El historial es secundario y se
   * carga después para no retrasar la entrada a la actividad.
   */
  soloConsultaRelacionada = !esPersonaPropia && !['gestion','administracion'].includes(contextoUsuario?.nivelAcceso);
  if (soloConsultaRelacionada) {
    $('startRecommended').hidden = true;
    $('startRecommended').style.display = 'none';
    await showHistory();
    return;
  }
  await loadMission();

  renderFilters();
  renderCatalog();

  $("liaMessage").textContent =
    `Hola, ${String(perfil?.nombreVisible || perfil?.nombre || "exploradora").trim()} 😊 Puedes pensar, hablar y volver a intentarlo.`;

  if (params.get("vista") === "historial") {
    await showHistory();
    return;
  }

  /*
   * Entrada contextual desde Mi Camino / Gestión de Misiones:
   * - una sola Semilla asignada  -> abrirla directamente;
   * - varias Semillas asignadas  -> mostrar únicamente esas;
   * - sin Semillas específicas   -> mantener el catálogo normal.
   */
  if (misionActiva) {
    const asignadas = filteredSeeds();

    if (missionAllowedIds().length === 1 && asignadas.length === 1) {
      startSeed(asignadas[0].id);
    }
  }

  /*
   * El historial actualiza únicamente marcas como "Practicada".
   * No condiciona qué Semillas pertenecen a la misión.
   */
  loadSavedSessions()
    .then(() => {
      if (!$("catalogPanel").classList.contains("hidden")) {
        renderCatalog();
      }
    })
    .catch(error => {
      console.warn("[CreciendoPorDentro] No se pudo actualizar el historial de Semillas.", error);
    });
}

$("changeScenario").onclick = cambiarEscenario;
$("startRecommended").onclick = () => {
  const recommended = filteredSeeds().find(item => item.recomendada) || filteredSeeds()[0];
  if (recommended) startSeed(recommended.id);
};
$("showHistory").onclick = showHistory;
$("backToCatalog").onclick = () => { showPanel("catalogPanel"); renderCatalog(); };
$("missionHelp").onclick = () => toggleHelp().catch(console.error);

initialize().catch(error => {
  console.error(error);
  $("catalogEmpty").classList.remove("hidden");
  $("catalogEmpty").textContent = `No pudimos iniciar Creciendo por dentro: ${error.message}`;
});

window.addEventListener("pagehide", detenerActividad);
