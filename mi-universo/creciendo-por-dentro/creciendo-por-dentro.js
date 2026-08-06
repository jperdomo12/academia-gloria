import { Academia } from "../../compartido/api/academia.js";
import { auth } from "../../compartido/firebase/firebase-config.js";
import { mostrarCelebracion } from "../../compartido/js/celebracion.js";

const $ = id => document.getElementById(id);
const params = new URLSearchParams(window.location.search);
const MAX_RECORDING_SECONDS = 90;
const SEED_IMAGE_BASE =
  "../../assets/imagenes/creciendo-por-dentro/semillas/";

function seedImageUrl(seed) {
  const resource = String(seed?.recursos?.imagen || "").trim();
  if (!resource) return "";

  if (
    resource.startsWith("/") ||
    resource.startsWith("http://") ||
    resource.startsWith("https://")
  ) {
    return resource;
  }

  return `${SEED_IMAGE_BASE}${resource}`;
}

function imageMarkup(seed, className = "") {
  const source = seedImageUrl(seed);
  if (!source) return "";

  return `
    <figure class="seed-illustration ${className}">
      <img
        src="${escapeHtml(source)}"
        alt="${escapeHtml(
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

let catalogo = { familias: [], semillas: [] };
let perfil = null;
let misionId = params.get("misionId");
let misionActiva = null;
let semilla = null;
let stepIndex = -2;
let respuestas = {};
let inicioSesion = null;
let mediaRecorder = null;
let audioChunks = [];
let audioData = "";
let audioMimeType = "audio/webm";
let audioDuration = 0;
let recordingStartedAt = 0;
let recordingTimer = null;
let recordingAttempts = 0;
let recognition = null;
let transcript = "";
let activeFamily = "todas";
let sesiones = [];

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
  ["catalogPanel","experiencePanel","historyPanel"].forEach(panelId => {
    $(panelId).classList.toggle("hidden", panelId !== id);
  });
  window.scrollTo({ top:0, behavior:"smooth" });
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

function filteredSeeds() {
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
                 alt="${escapeHtml(item.situacion?.texto || item.titulo)}"
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
  respuestas = {};
  stepIndex = -2;
  inicioSesion = new Date();
  audioData = "";
  audioDuration = 0;
  transcript = "";
  recordingAttempts = 0;
  stopRecorderTracks();
}

function startSeed(seedId) {
  semilla = catalogo.semillas.find(item => item.id === seedId);
  if (!semilla) return;
  resetExperience();
  showPanel("experiencePanel");
  renderExperience();
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
  renderProgress();
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
          <button type="button" class="option ${selected.includes(option.id) ? "selected" : ""}" data-answer="${escapeHtml(option.id)}">
            ${option.icono ? `<span class="option__icon">${escapeHtml(option.icono)}</span>` : ""}
            ${escapeHtml(option.texto)}
          </button>`).join("")}
      </div>
      ${step.otraRespuesta ? `
        <div class="other">
          <label><strong>También puedo decirlo con mis palabras:</strong></label>
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

function renderComposer() {
  const response = builtResponse();
  respuestas.respuestaConstruida = response;
  $("experienceContent").innerHTML = `
    <section>
      <div class="eyebrow">Juntamos tus ideas</div>
      <h2>Esta es tu frase</h2>
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

function configureRecognition() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) return;
  recognition = new Recognition();
  recognition.lang = "es-ES";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = event => {
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
  if (status) status.textContent = message || (audioData ? "Tu grabación está lista. Puedes escucharla o repetir." : "Cuando estés preparada, pulsa Grabar.");
  const next = $("finishRecording");
  if (next) next.disabled = !audioData;
}

async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    updateRecorderUI("Este navegador no permite grabar. Puedes continuar sin grabación.");
    $("continueWithoutRecording")?.classList.remove("hidden");
    return;
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio:true });
  const preferred = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
    ? "audio/webm;codecs=opus" : "audio/webm";
  audioChunks = [];
  mediaRecorder = new MediaRecorder(stream, { mimeType:preferred });
  audioMimeType = mediaRecorder.mimeType || preferred;
  recordingStartedAt = Date.now();
  recordingAttempts++;
  transcript = "";
  if ($("transcript")) $("transcript").value = "";
  mediaRecorder.ondataavailable = event => { if (event.data.size) audioChunks.push(event.data); };
  mediaRecorder.onstop = () => {
    audioDuration = Math.max(1, Math.round((Date.now() - recordingStartedAt) / 1000));
    const blob = new Blob(audioChunks, { type:audioMimeType });
    const reader = new FileReader();
    reader.onloadend = () => { audioData = String(reader.result || ""); updateRecorderUI(); };
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
  audioData = "";
  audioDuration = 0;
  transcript = "";
  if ($("transcript")) $("transcript").value = "";
  updateRecorderUI("La grabación fue eliminada. Puedes volver a intentarlo.");
}

function renderRecorder() {
  $("experienceContent").innerHTML = `
    <section>
      <div class="eyebrow">Tu voz</div>
      <h2>Practica tu frase</h2>
      <div class="recording">
        <div class="recorder">
          <p><strong>No tiene que salir perfecta.</strong> Puedes escuchar, grabar y repetir.</p>
          <div id="recordingTime" class="recorder__time">00:00</div>
          <div class="actions">
            <button id="startRecording" class="btn btn--violet" type="button">🎤 Grabar</button>
            <button id="stopRecording" class="btn btn--light" type="button" disabled>⏹️ Detener</button>
            <button id="clearRecording" class="btn btn--danger" type="button">🗑️ Borrar</button>
          </div>
          <audio id="audioPlayer" class="hidden" controls></audio>
          <div id="recordingStatus" class="status">Cuando estés preparada, pulsa Grabar.</div>
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
        <button id="continueWithoutRecording" class="btn btn--light hidden" type="button">Continuar sin grabar</button>
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

async function saveSession({ withoutRecording = false } = {}) {
  const button = $("finishRecording") || $("continueWithoutRecording");
  if (button) button.disabled = true;
  try {
    const finalTranscript = String($("transcript")?.value || transcript || "").trim();
    const sessionId = await Academia.semillas.guardarSesion({
      semillaId:semilla.id,
      titulo:semilla.titulo,
      familia:semilla.familia,
      tipoSituacion:semilla.tipoSituacion,
      nivelApoyo:semilla.nivelApoyo,
      fechaInicio:inicioSesion?.toISOString() || "",
      duracion:Math.max(0, Math.round((Date.now() - inicioSesion.getTime()) / 1000)),
      intentos:recordingAttempts,
      respuestaConstruida:respuestas.respuestaConstruida || builtResponse(),
      audioData:withoutRecording ? "" : audioData,
      mimeType:audioMimeType,
      duracionAudio:withoutRecording ? 0 : audioDuration,
      transcripcion:finalTranscript,
      respuestas,
      analisisEducativo:basicAnalysis(),
      observacionFamilia:"",
      misionId:misionId || ""
    });

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
          nivelApoyo:Number(semilla.nivelApoyo || 1)
        },
        resultado:{
          intentos:recordingAttempts,
          duracionAudio:withoutRecording ? 0 : audioDuration,
          grabacionConfirmada:!withoutRecording && Boolean(audioData)
        },
        destinoRevision:`../creciendo-por-dentro/?vista=historial&sesionId=${encodeURIComponent(sessionId)}`
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
      mensaje:"Hoy has practicado cómo expresar lo que sientes.",
      duracion:2800,
      mostrarGuacamayas:true
    });
  } catch (error) {
    console.error(error);
    updateRecorderUI(`No pudimos guardar la práctica: ${error.message}`);
    if (button) button.disabled = false;
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
      <div class="actions" style="justify-content:center">
        <button id="repeatSeed" class="btn btn--violet" type="button">🔁 Practicar otra vez</button>
        <button id="finishSeed" class="btn btn--primary" type="button">🌿 Volver a mis Semillas</button>
        <button id="viewHistoryAfter" class="btn btn--light" type="button">📚 Ver mi jardín</button>
      </div>
    </section>`;
  $("repeatSeed").onclick = () => startSeed(semilla.id);
  $("finishSeed").onclick = () => { showPanel("catalogPanel"); renderCatalog(); };
  $("viewHistoryAfter").onclick = showHistory;
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
  sesiones = await Academia.semillas.leerSesiones();
}

function formatDate(value) {
  if (!value) return "Fecha no disponible";
  const date = typeof value.toDate === "function" ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? "Fecha no disponible" :
    new Intl.DateTimeFormat("es-ES",{ dateStyle:"medium", timeStyle:"short" }).format(date);
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
        <div class="history-card__meta">${escapeHtml(formatDate(item.actualizadaEn || item.creadaEn))} · ${Number(item.intentos || 0)} intento(s)</div>
        ${item.audioData ? `<audio controls src="${item.audioData}"></audio>` : "<p>Práctica guardada sin audio.</p>"}
        <details>
          <summary><strong>Ver detalles</strong></summary>
          <p><strong>Mi frase:</strong> ${escapeHtml(item.respuestaConstruida || "")}</p>
          <p><strong>Transcripción:</strong> ${escapeHtml(item.transcripcion || "Sin transcripción.")}</p>
          <p><strong>Observación:</strong> ${escapeHtml(item.observacionFamilia || "Sin observación familiar.")}</p>
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
  perfil = await Academia.usuario.leerPerfil();
  await Promise.all([loadCatalog(), loadMission(), loadSavedSessions()]);
  configureRecognition();
  renderFilters();
  renderCatalog();
  $("liaMessage").textContent =
    `Hola, ${String(perfil?.nombre || "exploradora").trim()} 😊 Puedes pensar, hablar y volver a intentarlo.`;
  if (params.get("vista") === "historial") await showHistory();
}

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
