import { Academia } from "../../compartido/api/academia.js";
import { auth } from "../../compartido/firebase/firebase-config.js";
import { HISTORIAS } from "./historias.js";

const $ = id => document.getElementById(id);
const MAX_RECORDING_SECONDS = 60;

let historia = HISTORIAS[0];
let perfil = null;
let activeCategory = "Todas";
let activeLanguage = "all";
let mediaRecorder = null;
let audioChunks = [];
let audioData = "";
let audioMimeType = "audio/webm";
let audioDuration = 0;
let recordingStartedAt = 0;
let recordingTimer = null;
let recordingInterval = null;
let recognition = null;
let finalTranscript = "";

function displayName(value = "") {
  return String(value).trim() || "Explorador";
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function formatDuration(seconds = 0) {
  const value = Math.max(0, Math.round(seconds));
  const minutes = String(Math.floor(value / 60)).padStart(2, "0");
  const remaining = String(value % 60).padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function setStep(stepName) {
  document.querySelectorAll(".step").forEach(step => {
    step.classList.toggle("active", step.dataset.step === stepName);
  });
}

function showPanel(panelId, stepName = "welcome") {
  document.querySelectorAll(".panel").forEach(panel => panel.classList.add("hidden"));
  $(panelId).classList.remove("hidden");
  setStep(stepName);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetSessionData() {
  audioData = "";
  audioDuration = 0;
  finalTranscript = "";
  $("transcript").value = "";
  updateAudioControls();
}

function storiesByLanguage() {
  return activeLanguage === "all"
    ? HISTORIAS
    : HISTORIAS.filter(item => item.idioma === activeLanguage);
}

function renderCategoryFilters() {
  const categories = [
    "Todas",
    ...new Set(storiesByLanguage().map(item => item.categoria))
  ];

  if (
    activeCategory !== "Todas" &&
    !categories.includes(activeCategory)
  ) {
    activeCategory = "Todas";
  }

  $("categoryFilters").innerHTML = categories.map(category => `
    <button type="button"
      class="filter-chip ${category === activeCategory ? "active" : ""}"
      data-category="${escapeHtml(category)}">
      ${category === "Todas" ? "🌈 Todas" : escapeHtml(category)}
    </button>
  `).join("");

  $("categoryFilters").querySelectorAll(".filter-chip").forEach(button => {
    button.onclick = () => {
      activeCategory = button.dataset.category;
      renderCategoryFilters();
      renderStoryCatalog();
    };
  });
}

function renderStoryCatalog() {
  const languageStories = storiesByLanguage();
  const stories = activeCategory === "Todas"
    ? languageStories
    : languageStories.filter(item => item.categoria === activeCategory);

  $("storyCatalog").innerHTML = stories.map(item => `
    <button type="button"
      class="story-card ${item.id === historia.id ? "selected" : ""}"
      data-story-id="${escapeHtml(item.id)}">
      <div class="story-card-icon">${item.portada || "📖"}</div>
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:center">
        <span style="color:#7c3aed;font-weight:900">${escapeHtml(item.categoria)}</span>
        <span style="font-size:13px;font-weight:900;color:#0369a1">
          ${item.idioma === "en-GB" ? "🇬🇧 English" : "🇪🇸 Español"}
        </span>
      </div>
      <h3 style="font-size:22px;margin:7px 0">${escapeHtml(item.titulo)}</h3>
      <p style="color:#64748b;font-weight:650">${escapeHtml(item.subtitulo)}</p>
      <div style="font-weight:900;color:#0284c7">Nivel ${item.nivel} · ${escapeHtml(item.tiempoEstimado)}</div>
    </button>
  `).join("");

  $("storyCatalog").querySelectorAll(".story-card").forEach(card => {
    card.onclick = () => {
      const selected = HISTORIAS.find(item => item.id === card.dataset.storyId);
      if (!selected) return;
      historia = selected;
      resetSessionData();
      renderStoryCatalog();
      renderSelectedStory();
    };
  });
}

function renderSelectedStory() {
  $("storyPreviewIcon").textContent = historia.portada || "📖";
  $("storyPreviewTitle").textContent = historia.titulo;
  $("storyPreviewSubtitle").textContent = historia.subtitulo;
  $("storyMeta").textContent =
    `Nivel ${historia.nivel} · ${historia.categoria} · ` +
    `${historia.idiomaEtiqueta || historia.idioma} · ${historia.tiempoEstimado}`;

  $("storyTitle").textContent = historia.titulo;
  $("storySubtitle").textContent = historia.subtitulo;

  const scene = historia.escena || {};
  $("sceneSky").textContent = scene.cielo || "✨";
  $("sceneCharacter").textContent = scene.personaje || historia.portada || "📖";
  $("sceneCompanion").textContent = scene.companera || "🌟";

  const sceneClass = scene.fondo || "noche";
  const sceneBackgrounds = {
    noche: "linear-gradient(180deg,#312e81,#4338ca 56%,#14532d 57%,#166534)",
    amanecer: "linear-gradient(180deg,#fbbf24,#fde68a 56%,#86efac 57%,#16a34a)",
    laboratorio: "linear-gradient(180deg,#dbeafe,#bfdbfe 56%,#cbd5e1 57%,#64748b)"
  };

  $("storyScene").style.background =
    sceneBackgrounds[sceneClass] || sceneBackgrounds.noche;
  $("storyText").innerHTML = historia.parrafos.map(parrafo => `
    <article class="paragraph">
      <div class="paragraph-icon">${parrafo.icono}</div>
      <div>${escapeHtml(parrafo.texto)}</div>
    </article>
  `).join("");

  $("reflectionText").textContent = historia.reflexion;
  $("dailyPhrase").textContent = `“${historia.fraseDelDia}”`;
  renderQuestions();
}

function renderQuestions() {
  $("questionsContainer").innerHTML = historia.preguntas.map((pregunta, index) => {
    if (pregunta.tipo === "opcion") {
      return `
        <section class="question">
          <h3>${index + 1}. ${escapeHtml(pregunta.texto)}</h3>
          <div class="options">
            ${pregunta.opciones.map(opcion => `
              <label class="option">
                <input type="radio" name="${escapeHtml(pregunta.id)}" value="${escapeHtml(opcion)}">
                <span>${escapeHtml(opcion)}</span>
              </label>
            `).join("")}
          </div>
          <div id="feedback-${escapeHtml(pregunta.id)}" class="feedback hidden"></div>
        </section>`;
    }

    return `
      <section class="question">
        <h3>${index + 1}. ${escapeHtml(pregunta.texto)}</h3>
        <textarea id="answer-${escapeHtml(pregunta.id)}" placeholder="Escribe lo que piensas..."></textarea>
      </section>`;
  }).join("");

  historia.preguntas.filter(p => p.tipo === "opcion").forEach(pregunta => {
    document.querySelectorAll(`input[name="${pregunta.id}"]`).forEach(input => {
      input.onchange = () => {
        const feedback = $(`feedback-${pregunta.id}`);
        const correct = input.value === pregunta.correcta;
        feedback.classList.remove("hidden", "correct", "retry");
        feedback.classList.add(correct ? "correct" : "retry");
        feedback.textContent = correct
          ? "✅ ¡Muy bien! Encontraste la respuesta."
          : `💡 Casi. ${pregunta.ayuda || "Vuelve a leer esa parte con calma."}`;
      };
    });
  });
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("No se pudo preparar el audio."));
    reader.readAsDataURL(blob);
  });
}

function updateRecordingDashboard(seconds = 0, isRecording = false) {
  const safeSeconds = Math.min(MAX_RECORDING_SECONDS, Math.max(0, seconds));
  $("recordLight").classList.toggle("active", isRecording);
  $("recordProgressBar").style.width =
    `${(safeSeconds / MAX_RECORDING_SECONDS) * 100}%`;
  $("recordTimer").textContent =
    `${formatDuration(safeSeconds)} / ${formatDuration(MAX_RECORDING_SECONDS)}`;
}

function updateAudioControls() {
  const hasAudio = Boolean(audioData);
  $("playButton").disabled = !hasAudio;
  $("clearButton").disabled = !hasAudio;
  $("goQuestions").disabled = !hasAudio;
  $("audioPreview").classList.toggle("hidden", !hasAudio);

  if (hasAudio) {
    $("audioPreview").src = audioData;
    $("voiceStatus").textContent = `Grabación lista · ${formatDuration(audioDuration)}`;
    updateRecordingDashboard(audioDuration, false);
  } else {
    $("audioPreview").removeAttribute("src");
    $("voiceStatus").textContent = "Sin grabación.";
    updateRecordingDashboard(0, false);
  }
}

function configureSpeechRecognition() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!Recognition) {
    $("speechSupport").textContent =
      "La transcripción automática no está disponible en este navegador.";
    return;
  }

  $("speechSupport").textContent = "Transcripción automática disponible en español.";
  recognition = new Recognition();
  recognition.lang = historia.idioma || "es-ES";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = event => {
    let interim = "";
    let complete = finalTranscript;

    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const text = event.results[index][0].transcript;
      if (event.results[index].isFinal) complete += `${text} `;
      else interim += text;
    }

    finalTranscript = complete.trim();
    $("transcript").value =
      [finalTranscript, interim].filter(Boolean).join(" ").trim();
  };

  recognition.onerror = event => {
    console.warn("SpeechRecognition:", event.error);
    if (event.error !== "no-speech" && event.error !== "aborted") {
      $("speechSupport").textContent =
        "No se pudo completar la transcripción automática.";
    }
  };
}

function startRecognition() {
  if (!recognition) return;
  finalTranscript = "";
  $("transcript").value = "";
  try { recognition.start(); } catch (error) { console.warn(error); }
}

function stopRecognition() {
  if (!recognition) return;
  try { recognition.stop(); } catch (error) { console.warn(error); }
}

$("recordButton").onclick = async () => {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    alert("Este navegador no permite grabar audio.");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunks = [];
    audioData = "";
    audioDuration = 0;
    updateAudioControls();

    const preferredType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? "audio/webm;codecs=opus"
      : "audio/webm";

    mediaRecorder = new MediaRecorder(stream, {
      mimeType: preferredType,
      audioBitsPerSecond: 32000
    });

    audioMimeType = mediaRecorder.mimeType || preferredType;
    recordingStartedAt = Date.now();

    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      clearTimeout(recordingTimer);
      clearInterval(recordingInterval);
      stopRecognition();
      stream.getTracks().forEach(track => track.stop());

      const blob = new Blob(audioChunks, { type: audioMimeType });
      audioDuration = Math.min(
        MAX_RECORDING_SECONDS,
        (Date.now() - recordingStartedAt) / 1000
      );
      audioData = await blobToDataUrl(blob);

      $("recordButton").disabled = false;
      $("stopButton").disabled = true;
      updateAudioControls();
    };

    if (recognition) {
      recognition.lang = historia.idioma || "es-ES";
    }

    mediaRecorder.start(250);
    startRecognition();

    $("recordButton").disabled = true;
    $("stopButton").disabled = false;
    $("voiceStatus").textContent = "Grabando... lee con calma 🎙️";
    updateRecordingDashboard(0, true);

    recordingInterval = setInterval(() => {
      updateRecordingDashboard((Date.now() - recordingStartedAt) / 1000, true);
    }, 200);

    recordingTimer = setTimeout(() => {
      if (mediaRecorder?.state === "recording") mediaRecorder.stop();
    }, MAX_RECORDING_SECONDS * 1000);
  } catch (error) {
    console.error(error);
    alert("No se pudo utilizar el micrófono. Revisa el permiso del navegador.");
  }
};

$("stopButton").onclick = () => {
  if (mediaRecorder?.state === "recording") mediaRecorder.stop();
};

$("playButton").onclick = () => {
  if (audioData) $("audioPreview").play();
};

$("clearButton").onclick = resetSessionData;

$("startAdventure").onclick = () => {
  renderSelectedStory();
  showPanel("readingPanel", "reading");
};

$("goQuestions").onclick = () => showPanel("questionsPanel", "questions");

function collectAnswers() {
  const answers = {};

  historia.preguntas.forEach(pregunta => {
    if (pregunta.tipo === "opcion") {
      const selected = document.querySelector(`input[name="${pregunta.id}"]:checked`);
      answers[pregunta.id] = {
        respuesta: selected?.value || "",
        correcta: selected?.value === pregunta.correcta
      };
    } else {
      answers[pregunta.id] = {
        respuesta: $(`answer-${pregunta.id}`)?.value.trim() || ""
      };
    }
  });

  return answers;
}

$("saveSession").onclick = async () => {
  if (!audioData) {
    alert("Primero realiza una grabación.");
    return;
  }

  const button = $("saveSession");

  try {
    button.disabled = true;
    button.textContent = "Guardando...";

    await Academia.rinconLectura.guardarSesion({
      historiaId: historia.id,
      titulo: historia.titulo,
      nivel: historia.nivel,
      categoria: historia.categoria,
      valores: historia.valores,
      textoOriginal: historia.parrafos.map(p => p.texto).join(" "),
      audioData,
      mimeType: audioMimeType,
      duracion: audioDuration,
      transcripcion: $("transcript").value.trim(),
      respuestas: collectAnswers(),
      reflexion: historia.reflexion,
      fraseDelDia: historia.fraseDelDia,
      idioma: historia.idioma || "es-ES"
    });

    $("celebrationTitle").textContent =
      `¡Fantástico, ${displayName(perfil?.nombre)}!`;
    showPanel("celebrationPanel", "celebration");
  } catch (error) {
    console.error(error);
    alert(`No se pudo guardar la sesión.\n${error.message}`);
  } finally {
    button.disabled = false;
    button.textContent = "💾 Guardar mi aventura";
  }
};

$("restartSession").onclick = () => {
  resetSessionData();
  renderQuestions();
  showPanel("welcomePanel", "welcome");
};

$("showHistoryButton").onclick = async () => {
  showPanel("historyPanel", "welcome");
  await loadReadingHistory();
};

$("backToCatalog").onclick = () => showPanel("welcomePanel", "welcome");

document.querySelectorAll(".backToSelection").forEach(button => {
  button.onclick = () => {
    showPanel("welcomePanel", "welcome");
  };
});

function formatFirestoreDate(value) {
  if (!value) return "Fecha no disponible";
  const date = typeof value.toDate === "function" ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return "Fecha no disponible";

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}


function questionTextById(storyId, questionId) {
  const story = HISTORIAS.find(item => item.id === storyId);
  const question = story?.preguntas?.find(item => item.id === questionId);
  return question?.texto || questionId;
}

function calculateCorrectAnswers(session) {
  const answers = session.respuestas || {};
  const closedAnswers = Object.values(answers).filter(value =>
    value &&
    typeof value === "object" &&
    Object.prototype.hasOwnProperty.call(value, "correcta")
  );

  return {
    correct: closedAnswers.filter(value => value.correcta).length,
    total: closedAnswers.length
  };
}

function renderSavedAnswers(session) {
  const answers = session.respuestas || {};
  const rows = Object.entries(answers);

  if (!rows.length) {
    return "<p>Sin respuestas guardadas.</p>";
  }

  return `
    <div class="answers-list">
      ${rows.map(([questionId, value]) => {
        const response = typeof value === "object"
          ? String(value.respuesta || "")
          : String(value || "");

        const hasCorrectFlag =
          typeof value === "object" &&
          Object.prototype.hasOwnProperty.call(value, "correcta");

        const status = hasCorrectFlag
          ? `<span class="answer-status ${value.correcta ? "ok" : "review"}">
              ${value.correcta ? "✅ Correcta" : "💡 Para revisar"}
            </span>`
          : "";

        return `
          <div class="answer-row">
            <strong>${escapeHtml(questionTextById(session.historiaId, questionId))}</strong>
            <div>${escapeHtml(response || "Sin respuesta.")}</div>
            ${status}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

async function loadReadingHistory() {
  $("historyStatus").classList.remove("hidden");
  $("historyStatus").textContent = "Cargando tus lecturas...";
  $("readingHistory").innerHTML = "";

  try {
    const sessions = await Academia.rinconLectura.leerSesiones();

    if (!sessions.length) {
      $("historyStatus").textContent =
        "Todavía no hay lecturas guardadas. Tu primera aventura está esperando 🌟";
      return;
    }

    $("historyStatus").classList.add("hidden");
    $("readingHistory").innerHTML = sessions.map(session => `
      ${(() => {
        const score = calculateCorrectAnswers(session);
        return `
      <article class="history-card">
        <div style="display:flex;justify-content:space-between;gap:10px;align-items:start">
          <div>
            <span style="font-weight:900;color:#7c3aed">
              ${escapeHtml(session.categoria || "Lectura")}
            </span>
            <h3 style="margin:5px 0">${escapeHtml(session.titulo || "Historia")}</h3>
          </div>
          <span class="feedback correct" style="margin:0">
            ${formatDuration(session.duracion || 0)}
          </span>
        </div>

        <p style="color:#64748b;font-weight:650">
          📅 ${escapeHtml(formatFirestoreDate(session.actualizadaEn || session.creadaEn))}
        </p>

        <div style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0">
          <span class="answer-status ok">🎤 Grabación guardada</span>
          ${score.total
            ? `<span class="answer-status ${score.correct === score.total ? "ok" : "review"}">
                 🧠 Comprensión ${score.correct}/${score.total}
               </span>`
            : ""
          }
          <span class="answer-status ok">
            🌍 ${session.idioma === "en-GB" ? "English" : "Español"}
          </span>
        </div>

        ${session.audioData
          ? `<audio controls src="${session.audioData}"></audio>`
          : "<p>Sin audio guardado.</p>"
        }

        <details style="margin-top:12px">
          <summary style="cursor:pointer;font-weight:900;color:#0284c7">
            📝 Ver transcripción y respuestas
          </summary>
          <div style="margin-top:10px">
            <strong>Lo que entendió la Academia</strong>
            <p>${escapeHtml(session.transcripcion || "Sin transcripción.")}</p>
            <strong>Respuestas</strong>
            ${renderSavedAnswers(session)}
          </div>
        </details>

        <button
          type="button"
          class="btn delete-session"
          data-delete-story="${escapeHtml(session.id)}"
          data-delete-title="${escapeHtml(session.titulo || "esta aventura")}"
        >
          🗑️ Eliminar
        </button>
      </article>`;
      })()}
    `).join("");

    $("readingHistory")
      .querySelectorAll("[data-delete-story]")
      .forEach(button => {
        button.onclick = async () => {
          const storyId = button.dataset.deleteStory;
          const title = button.dataset.deleteTitle;

          const confirmed = confirm(
            `¿Quieres eliminar la grabación y las respuestas de "${title}"?`
          );

          if (!confirmed) return;

          try {
            button.disabled = true;
            button.textContent = "Eliminando...";
            await Academia.rinconLectura.eliminarSesion(storyId);
            await loadReadingHistory();
          } catch (deleteError) {
            console.error(deleteError);
            alert(
              `No se pudo eliminar la aventura guardada.
${deleteError.message}`
            );
            button.disabled = false;
            button.textContent = "🗑️ Eliminar";
          }
        };
      });
  } catch (error) {
    console.error(error);
    $("historyStatus").textContent =
      `No se pudieron cargar las lecturas.\n${error.message}`;
  }
}


$("languageFilter").onchange = () => {
  activeLanguage = $("languageFilter").value;
  activeCategory = "Todas";

  const available = storiesByLanguage();

  if (
    available.length &&
    !available.some(item => item.id === historia.id)
  ) {
    historia = available[0];
    resetSessionData();
    renderSelectedStory();
  }

  renderCategoryFilters();
  renderStoryCatalog();
};

async function initialize() {
  await auth.authStateReady();

  if (!auth.currentUser) {
    window.location.replace("/academia-gloria/login.html");
    return;
  }

  perfil = await Academia.usuario.leerPerfil();

  const nombre = displayName(perfil.nombre);
  $("userAvatar").textContent = perfil.avatar || "🦉";
  $("welcomeText").textContent =
    `Hola, ${nombre} 😊 Hoy Lía ha preparado varias historias para ti. ` +
    "Elige la que más te llame la atención y recuerda: tu voz merece ser escuchada.";

  renderCategoryFilters();
  renderStoryCatalog();
  renderSelectedStory();
  configureSpeechRecognition();
  updateAudioControls();
}

initialize();
