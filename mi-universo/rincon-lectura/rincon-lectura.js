import { Academia } from "../../compartido/api/academia.js";
import { auth } from "../../compartido/firebase/firebase-config.js";
import { HISTORIAS } from "./historias.js";

const $ = id => document.getElementById(id);
const MAX_RECORDING_SECONDS = 120;

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
let recordingAttempts = 0;
let currentReadingAnalysis = {};

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

function resetSessionData({ resetAttempts = false } = {}) {
  if (resetAttempts) {
    recordingAttempts = 0;
  }

  currentReadingAnalysis = {};
  audioData = "";
  audioDuration = 0;
  finalTranscript = "";
  $("transcript").value = "";
  $("familyObservation").value = "";
  resetReadingComparison();
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

const LIA_MESSAGES = Object.freeze({
  ready: [
    "🦜 Estoy preparada. Lee con calma y recuerda: puedes detenerte y volver a empezar cuando quieras.",
    "🌿 No tengas prisa. Una lectura clara vale más que una lectura rápida.",
    "✨ Cada intento cuenta. Yo estaré aquí para escucharte."
  ],
  recording: [
    "🎙️ Te estoy escuchando. Haz pequeñas pausas y abre bien la boca.",
    "🦜 Vas muy bien. Continúa a tu ritmo.",
    "🌈 Respira, mira el texto y sigue con calma."
  ],
  retry: [
    "🌱 Has decidido volver a intentarlo. Eso también es aprender.",
    "💛 Qué buena decisión: escuchar, revisar y probar otra vez.",
    "🦜 Cada nuevo intento puede ayudarte a leer con más claridad."
  ]
});

function liaMessage(type, index = 0) {
  const messages = LIA_MESSAGES[type] || LIA_MESSAGES.ready;
  return messages[Math.abs(index) % messages.length];
}

function setLiaCoachMessage(message) {
  const element = $("liaCoachMessage");
  if (element) element.textContent = message;
}

function tokenizeWithOriginal(value = "") {
  return String(value)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(original => ({
      original,
      normalized: normalizeForComparison(original)
    }));
}

function buildWordComparison(expectedText, heardText) {
  const expected = tokenizeWithOriginal(expectedText);
  const heard = tokenizeWithOriginal(heardText);
  const rows = expected.length + 1;
  const cols = heard.length + 1;
  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let i = expected.length - 1; i >= 0; i -= 1) {
    for (let j = heard.length - 1; j >= 0; j -= 1) {
      dp[i][j] = expected[i].normalized === heard[j].normalized
        ? dp[i + 1][j + 1] + 1
        : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const result = [];
  let i = 0;
  let j = 0;

  while (i < expected.length && j < heard.length) {
    if (expected[i].normalized === heard[j].normalized) {
      result.push({
        type: "match",
        expected: expected[i].original,
        heard: heard[j].original
      });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      result.push({
        type: "missing",
        expected: expected[i].original,
        heard: ""
      });
      i += 1;
    } else {
      result.push({
        type: "different",
        expected: "",
        heard: heard[j].original
      });
      j += 1;
    }
  }

  while (i < expected.length) {
    result.push({
      type: "missing",
      expected: expected[i].original,
      heard: ""
    });
    i += 1;
  }

  while (j < heard.length) {
    result.push({
      type: "different",
      expected: "",
      heard: heard[j].original
    });
    j += 1;
  }

  return result;
}

function wordComparisonMapHtml(expectedText, heardText) {
  const comparison = buildWordComparison(expectedText, heardText);

  return comparison.map(item => {
    if (item.type === "match") {
      return `<span class="word-token word-token--match" title="Palabra reconocida">${escapeHtml(item.expected)}</span>`;
    }

    if (item.type === "missing") {
      return `<span class="word-token word-token--missing" title="Palabra que conviene revisar">${escapeHtml(item.expected)}</span>`;
    }

    return `<span class="word-token word-token--different" title="Palabra diferente reconocida por Lía">+ ${escapeHtml(item.heard)}</span>`;
  }).join(" ");
}

function renderWordComparisonMap(expectedText, heardText) {
  const container = $("wordComparisonMap");
  if (!container) return;
  container.innerHTML = wordComparisonMapHtml(expectedText, heardText);
}

function normalizeForComparison(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-ES")
    .replace(/[^\p{L}\p{N}'’]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeForComparison(value = "") {
  const normalized = normalizeForComparison(value);
  return normalized ? normalized.split(" ") : [];
}

function longestCommonSubsequenceLength(expected, heard) {
  const previous = new Array(heard.length + 1).fill(0);
  const current = new Array(heard.length + 1).fill(0);

  for (let i = 1; i <= expected.length; i += 1) {
    current.fill(0);

    for (let j = 1; j <= heard.length; j += 1) {
      current[j] = expected[i - 1] === heard[j - 1]
        ? previous[j - 1] + 1
        : Math.max(previous[j], current[j - 1]);
    }

    for (let j = 0; j <= heard.length; j += 1) {
      previous[j] = current[j];
    }
  }

  return previous[heard.length];
}

function expectedReadingText() {
  return historia?.parrafos?.map(parrafo => parrafo.texto).join(" ").trim() || "";
}

function comparisonFeedback(score) {
  if (score >= 90) {
    return {
      className: "excellent",
      message:
        "🌟 ¡Lía te entendió muy bien! La lectura coincide casi por completo con el texto.",
      coach:
        "🦜 ¡Qué lectura tan clara! Puedes sentirte orgullosa de este intento."
    };
  }

  if (score >= 75) {
    return {
      className: "very-good",
      message:
        "✨ Se entendió muy bien. Puedes escuchar la grabación y decidir si deseas conservarla o pulir alguna parte.",
      coach:
        "💛 Lía entendió casi todo. Escucha tu voz y decide tú misma si quieres repetir."
    };
  }

  if (score >= 55) {
    return {
      className: "good",
      message:
        "😊 Se entendió una buena parte. Una nueva lectura más pausada puede ayudar a que Lía reconozca más palabras.",
      coach:
        "🌿 Vas avanzando. Prueba con pequeñas pausas entre frases."
    };
  }

  return {
    className: "practice",
    message:
      "🌱 Esta lectura nos deja pistas para practicar. Prueba otra vez sin prisa, haciendo pequeñas pausas y moviendo bien la boca.",
    coach:
      "🦜 No pasa nada. Escuchar, descubrir y volver a intentarlo forma parte del aprendizaje."
  };
}

function resetReadingComparison() {
  const comparison = $("readingComparison");
  if (!comparison) return;

  comparison.classList.add("hidden");
  comparison.classList.remove("excellent", "very-good", "good", "practice");

  $("comparisonScore").textContent = "—";
  $("comparisonMessage").textContent = "";
  $("matchedWords").textContent = "0";
  $("expectedWords").textContent = "0";
  $("readingPace").textContent = "—";
  $("expectedTextComparison").textContent = "";
  $("heardTextComparison").textContent = "";
  $("wordComparisonMap").innerHTML = "";
  $("attemptBadge").textContent = `Intento ${Math.max(1, recordingAttempts || 1)}`;
}

function renderReadingComparison() {
  const expectedText = expectedReadingText();
  const heardText = $("transcript").value.trim();
  const expectedTokens = tokenizeForComparison(expectedText);
  const heardTokens = tokenizeForComparison(heardText);

  resetReadingComparison();

  if (!expectedTokens.length || !heardTokens.length) {
    return;
  }

  const matched = longestCommonSubsequenceLength(expectedTokens, heardTokens);
  const score = Math.max(
    0,
    Math.min(100, Math.round((matched / expectedTokens.length) * 100))
  );
  const pace = audioDuration > 0
    ? Math.round((expectedTokens.length / audioDuration) * 60)
    : 0;
  const feedback = comparisonFeedback(score);
  const comparison = $("readingComparison");

  comparison.classList.remove("hidden");
  comparison.classList.add(feedback.className);

  $("comparisonScore").textContent = `${score}%`;
  $("comparisonMessage").textContent = feedback.message;
  $("matchedWords").textContent = String(matched);
  $("expectedWords").textContent = String(expectedTokens.length);
  $("readingPace").textContent = pace ? String(pace) : "—";
  $("expectedTextComparison").textContent = expectedText;
  $("heardTextComparison").textContent = heardText;
  $("attemptBadge").textContent = `Intento ${Math.max(1, recordingAttempts)}`;
  renderWordComparisonMap(expectedText, heardText);

  currentReadingAnalysis = {
    coincidencia: score,
    palabrasCoincidentes: matched,
    palabrasTexto: expectedTokens.length,
    palabrasReconocidas: heardTokens.length,
    palabrasPorMinuto: pace,
    mensaje: feedback.message,
    nivel: feedback.className
  };

  setLiaCoachMessage(feedback.coach);
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
    $("voiceStatus").textContent =
      `Lía guardó tu lectura · ${formatDuration(audioDuration)}`;
    $("voiceSuccess")?.classList.remove("hidden");
    updateRecordingDashboard(audioDuration, false);
    renderReadingComparison();
  } else {
    $("audioPreview").removeAttribute("src");
    $("voiceStatus").textContent = "Lía está preparada para escucharte.";
    $("voiceSuccess")?.classList.add("hidden");
    resetReadingComparison();
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

  $("speechSupport").textContent = `Transcripción automática disponible en ${historia.idioma === "en-GB" ? "inglés" : "español"}. El texto quedará bloqueado.`;
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

    if (audioData) {
      renderReadingComparison();
    }
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
    finalTranscript = "";
    $("transcript").value = "";
    recordingAttempts += 1;
    resetReadingComparison();
    setLiaCoachMessage(
      recordingAttempts > 1
        ? liaMessage("retry", recordingAttempts)
        : liaMessage("recording", recordingAttempts)
    );
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

      window.setTimeout(() => {
        renderReadingComparison();
      }, 450);
    };

    if (recognition) {
      recognition.lang = historia.idioma || "es-ES";
    }

    mediaRecorder.start(250);
    startRecognition();

    $("recordButton").disabled = true;
    $("stopButton").disabled = false;
    $("voiceStatus").textContent =
      "Lía te está escuchando... lee con calma 🎙️";
    $("voiceSuccess")?.classList.add("hidden");
    resetReadingComparison();
    updateRecordingDashboard(0, true);

    let warningShown = false;

    recordingInterval = setInterval(() => {
      const elapsedSeconds = (Date.now() - recordingStartedAt) / 1000;
      updateRecordingDashboard(elapsedSeconds, true);

      if (!warningShown && elapsedSeconds >= 90) {
        warningShown = true;
        $("voiceStatus").textContent =
          "Te quedan 30 segundos. Lía sigue escuchándote; continúa con calma 🎙️";
      }
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

$("clearButton").onclick = () => {
  resetSessionData();
  setLiaCoachMessage(liaMessage("retry", recordingAttempts));
};

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
      observacionFamilia: $("familyObservation").value.trim(),
      intentos: Math.max(1, recordingAttempts),
      analisisLectura: currentReadingAnalysis,
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
  resetSessionData({ resetAttempts: true });
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

function historyAnalysisHtml(session) {
  const analysis =
    session.analisisLectura && typeof session.analisisLectura === "object"
      ? session.analisisLectura
      : {};

  const score = Number(analysis.coincidencia || 0);
  const matched = Number(analysis.palabrasCoincidentes || 0);
  const total = Number(analysis.palabrasTexto || 0);
  const pace = Number(analysis.palabrasPorMinuto || 0);
  const attempts = Math.max(1, Number(session.intentos || 1));
  const expectedText = String(session.textoOriginal || "");
  const heardText = String(session.transcripcion || "");

  if (!score && !total && !pace) {
    return `
      <div class="history-analysis history-analysis--empty">
        <strong>🔎 Análisis de lectura</strong>
        <p>Esta lectura fue guardada antes de incorporar el análisis detallado.</p>
      </div>
    `;
  }

  return `
    <section class="history-analysis">
      <div class="history-analysis__header">
        <div>
          <strong>🔎 Análisis guardado</strong>
          <small>Intentos realizados: ${attempts}</small>
        </div>
        <span class="history-analysis__score">${score}%</span>
      </div>

      <div class="history-analysis__stats">
        <div><strong>${matched}</strong><span>coincidentes</span></div>
        <div><strong>${total}</strong><span>palabras del texto</span></div>
        <div><strong>${pace || "—"}</strong><span>palabras/minuto</span></div>
      </div>

      ${analysis.mensaje
        ? `<p class="history-analysis__message">${escapeHtml(analysis.mensaje)}</p>`
        : ""
      }

      ${expectedText && heardText
        ? `
          <details class="history-analysis__details">
            <summary>🎨 Revisar mapa y comparación</summary>

            <div class="history-word-map">
              ${wordComparisonMapHtml(expectedText, heardText)}
            </div>

            <div class="history-text-pair">
              <div>
                <h4>📖 Texto original</h4>
                <p>${escapeHtml(expectedText)}</p>
              </div>
              <div>
                <h4>🦜 Lo que entendió Lía</h4>
                <p>${escapeHtml(heardText)}</p>
              </div>
            </div>
          </details>
        `
        : ""
      }
    </section>
  `;
}

function familyObservationHistoryHtml(session) {
  const history = Array.isArray(session.historialObservacionesFamilia)
    ? session.historialObservacionesFamilia
    : [];

  if (!history.length) {
    return `
      <p class="history-family-empty">
        Todavía no hay versiones anteriores de esta observación.
      </p>
    `;
  }

  return `
    <div class="history-family-timeline">
      ${[...history].reverse().map(entry => `
        <article>
          <time>${escapeHtml(formatFirestoreDate(entry.fecha))}</time>
          <p>${escapeHtml(entry.texto || "")}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function attachHistoryActions() {
  document
    .querySelectorAll("[data-save-family-observation]")
    .forEach(button => {
      button.onclick = async () => {
        const storyId = button.dataset.saveFamilyObservation;
        const textarea = document.querySelector(
          `[data-family-observation-editor="${CSS.escape(storyId)}"]`
        );

        if (!textarea) return;

        const originalText = button.textContent;

        try {
          button.disabled = true;
          button.textContent = "Guardando...";

          await Academia.rinconLectura.actualizarObservacion(
            storyId,
            textarea.value
          );

          button.textContent = "✅ Guardada";

          window.setTimeout(async () => {
            await loadReadingHistory();
          }, 650);
        } catch (error) {
          console.error(error);
          alert(`No se pudo actualizar la observación.\n${error.message}`);
          button.disabled = false;
          button.textContent = originalText;
        }
      };
    });

  document
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
            `No se pudo eliminar la aventura guardada.\n${deleteError.message}`
          );
          button.disabled = false;
          button.textContent = "🗑️ Eliminar";
        }
      };
    });
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

    $("readingHistory").innerHTML = sessions.map(session => {
      const comprehension = calculateCorrectAnswers(session);
      const observation = String(session.observacionFamilia || "");

      return `
        <article class="history-card history-card--complete">
          <header class="history-card__header">
            <div>
              <span class="history-card__category">
                ${escapeHtml(session.categoria || "Lectura")}
              </span>
              <h3>${escapeHtml(session.titulo || "Historia")}</h3>
              <p>
                📅 ${escapeHtml(
                  formatFirestoreDate(session.actualizadaEn || session.creadaEn)
                )}
              </p>
            </div>

            <span class="feedback correct history-card__duration">
              ${formatDuration(session.duracion || 0)}
            </span>
          </header>

          <div class="history-card__badges">
            <span class="answer-status ok">🎤 Grabación guardada</span>

            ${comprehension.total
              ? `<span class="answer-status ${
                  comprehension.correct === comprehension.total ? "ok" : "review"
                }">
                   🧠 Comprensión ${comprehension.correct}/${comprehension.total}
                 </span>`
              : ""
            }

            <span class="answer-status ok">
              🌍 ${session.idioma === "en-GB" ? "English" : "Español"}
            </span>

            <span class="answer-status ok">
              🔁 ${Math.max(1, Number(session.intentos || 1))} intento(s)
            </span>
          </div>

          ${session.audioData
            ? `<audio controls src="${session.audioData}"></audio>`
            : "<p>Sin audio guardado.</p>"
          }

          ${historyAnalysisHtml(session)}

          <details class="history-section">
            <summary>🧠 Revisar comprensión y respuestas</summary>
            <div class="history-section__content">
              ${renderSavedAnswers(session)}
            </div>
          </details>

          <details class="history-section" open>
            <summary>👨‍👩‍👧 Observaciones de la familia</summary>

            <div class="history-section__content">
              <p class="history-help">
                Puedes leer y actualizar la observación. Cada cambio diferente
                se conserva en el historial de esta lectura.
              </p>

              <textarea
                class="history-family-editor"
                data-family-observation-editor="${escapeHtml(session.id)}"
                placeholder="Añadir una observación de la familia..."
              >${escapeHtml(observation)}</textarea>

              <div class="history-family-actions">
                <button
                  type="button"
                  class="btn green"
                  data-save-family-observation="${escapeHtml(session.id)}"
                >
                  💾 Guardar observación
                </button>
              </div>

              <details class="history-family-versions">
                <summary>📅 Ver historial de observaciones</summary>
                ${familyObservationHistoryHtml(session)}
              </details>
            </div>
          </details>

          <details class="history-section">
            <summary>📄 Revisar todos los datos guardados</summary>

            <div class="history-section__content history-all-data">
              <h4>🦜 Transcripción</h4>
              <p>${escapeHtml(session.transcripcion || "Sin transcripción.")}</p>

              <h4>🌟 Reflexión</h4>
              <p>${escapeHtml(session.reflexion || "Sin reflexión guardada.")}</p>

              <h4>🌈 Frase del día</h4>
              <p>${escapeHtml(session.fraseDelDia || "Sin frase guardada.")}</p>

              <h4>🏷️ Valores</h4>
              <p>${escapeHtml(
                Array.isArray(session.valores) && session.valores.length
                  ? session.valores.join(", ")
                  : "Sin valores registrados."
              )}</p>
            </div>
          </details>

          <button
            type="button"
            class="btn delete-session"
            data-delete-story="${escapeHtml(session.id)}"
            data-delete-title="${escapeHtml(session.titulo || "esta aventura")}"
          >
            🗑️ Eliminar lectura guardada
          </button>
        </article>
      `;
    }).join("");

    attachHistoryActions();
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
  setLiaCoachMessage(liaMessage("ready", new Date().getDate()));
}

initialize();
