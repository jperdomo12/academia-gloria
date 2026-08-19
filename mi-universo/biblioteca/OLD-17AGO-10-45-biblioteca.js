import { Academia } from "../../compartido/api/academia.js";
import { auth } from "../../compartido/firebase/firebase-config.js";
import { obtenerPerfil } from "../../compartido/js/perfil-usuario.js";
import { iniciarPanelUsuario } from "../../compartido/js/panel-usuario.js";

let books = [];
let currentBook = null;
let currentStatusFilter = "";
let detenerObservacion = null;

let mediaRecorder = null;
let audioChunks = [];
let recordedAudioData = "";
let recordedAudioMimeType = "audio/webm";
let recordedAudioDuration = 0;
let recordingStartedAt = 0;
let recordingTimer = null;
let recordingTicker = null;
const MAX_RECORDING_SECONDS = 90;
let speechRecognition = null;
let finalTranscript = "";
let transcriptEdited = false;
const SPEECH_LANGUAGE = "es-ES";

const parametrosPagina = new URLSearchParams(window.location.search);
let misionId = parametrosPagina.get("misionId");
let libroIdSolicitado = parametrosPagina.get("libroId");
let misionActiva = null;
let libroMisionSeleccionado = null;
let perfilActual = null;
let missionStatusFilter = "";
let missionSearchFilter = "";

const MISSION_MIN_AUDIO_SECONDS = 15;
const MISSION_MIN_WORDS = 15;

const $ = id => document.getElementById(id);


function contarPalabras(texto = "") {
  return String(texto)
    .trim()
    .split(/\s+/)
    .filter(palabra => /[\p{L}\p{N}]/u.test(palabra))
    .length;
}

function libroElegibleParaMision(book = {}) {
  return Boolean(book?.id && String(book.title || "").trim());
}

function imagenLibroHtml(book = {}) {
  return book.coverImage
    ? `<img src="${escapeHtml(book.coverImage)}" alt="Carátula de ${escapeHtml(book.title || "libro")}">`
    : "📘";
}

function renderSelectorLibrosMision() {
  const selector = $("missionBookSelector");
  const grid = $("missionBookSelectorGrid");
  const empty = $("missionBookSelectorEmpty");
  const count = $("missionBookSelectorCount");
  if (!selector || !grid || !empty || !count) return;

  const activa = Boolean(misionActiva && misionId && !libroMisionSeleccionado);
  selector.classList.toggle("hidden", !activa);
  if (!activa) return;

  const textoBuscado = String(missionSearchFilter || "").toLowerCase().trim();

  const disponibles = books
    .filter(libroElegibleParaMision)
    .filter(book => {
      const coincideEstado =
        !missionStatusFilter ||
        book.readingStatus === missionStatusFilter;

      const contenido = [
        book.title,
        book.author,
        book.favoriteCharacter,
        book.readingStatus
      ].join(" ").toLowerCase();

      const coincideTexto =
        !textoBuscado ||
        contenido.includes(textoBuscado);

      return coincideEstado && coincideTexto;
    });

  count.textContent = `${disponibles.length} ${disponibles.length === 1 ? "libro" : "libros"}`;
  empty.classList.toggle("hidden", disponibles.length > 0);
  empty.textContent = books.length
    ? "No hay libros que coincidan con este filtro."
    : "Todavía no hay libros registrados. Pide ayuda a tu familia para añadir uno primero.";

  grid.innerHTML = disponibles.map(book => `
    <button type="button" class="mission-book-choice" data-mission-book-id="${escapeHtml(book.id)}">
      <span class="mission-book-choice__cover">${imagenLibroHtml(book)}</span>
      <span>
        <strong>${escapeHtml(book.title || "Libro sin título")}</strong>
        <small>${escapeHtml(book.author || "Autor no indicado")}</small>
        <small>${escapeHtml(book.readingStatus || "Sin estado")}</small>
      </span>
    </button>
  `).join("");

  grid.querySelectorAll("[data-mission-book-id]").forEach(button => {
    button.onclick = async () => {
      const book = books.find(item => item.id === button.dataset.missionBookId);
      if (book) await seleccionarLibroParaMision(book);
    };
  });
}

function renderLibroMisionSeleccionado() {
  const panel = $("missionSelectedBook");
  if (!panel) return;

  const visible = Boolean(misionActiva && misionId && libroMisionSeleccionado);
  panel.classList.toggle("hidden", !visible);
  if (!visible) return;

  $("missionSelectedBookTitle").textContent = libroMisionSeleccionado.title || "Libro";
  $("missionSelectedBookAuthor").textContent =
    libroMisionSeleccionado.author || "Autor no indicado";
  $("missionSelectedBookCover").innerHTML = imagenLibroHtml(libroMisionSeleccionado);
}

function enfocarGrabacionBiblioteca() {
  const voiceBox = document.querySelector(".voice-box");
  if (!voiceBox) return;
  setTimeout(() => voiceBox.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
}

async function seleccionarLibroParaMision(book) {
  libroMisionSeleccionado = book;
  currentBook = book;
  await loadBook(book);
  openTab("new");
  renderSelectorLibrosMision();
  renderLibroMisionSeleccionado();
  actualizarProgresoOralMision();
  enfocarGrabacionBiblioteca();
}

async function cambiarLibroDeMision() {
  libroMisionSeleccionado = null;
  currentBook = null;
  missionStatusFilter = "";
  missionSearchFilter = "";

  document.querySelectorAll("[data-mission-status-filter]").forEach(button => {
    button.classList.toggle(
      "active",
      !button.dataset.missionStatusFilter
    );
  });

  if ($("missionBookSearch")) {
    $("missionBookSearch").value = "";
  }
  $("bookForm").reset();
  $("bookId").value = "";
  $("rating").value = "0";
  $("coverImage").value = "";
  $("coverFile").value = "";
  mostrarVistaPreviaCaratula();

  recordedAudioData = "";
  recordedAudioDuration = 0;
  finalTranscript = "";
  transcriptEdited = false;
  $("voiceTranscript").value = "";
  $("familyObservation").value = "";
  actualizarControlesAudio();

  renderLibroMisionSeleccionado();
  renderSelectorLibrosMision();
  openTab("library");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function mostrarMensajeLiaTrasGrabacion() {
  const box = $("liaMissionRecordingMessage");
  if (!box) return;

  const activa = Boolean(misionActiva && misionId);
  box.classList.toggle("hidden", !activa);
  if (!activa) return;

  const estado = criteriosMisionBiblioteca();
  box.classList.toggle("lia-mission-recording-message--success", estado.completa);

  if (estado.completa) {
    box.textContent =
      "🦜 ¡Qué bien! Ahora ya conozco un poquito mejor este libro gracias a ti.";
  } else if (!estado.cumplePalabras) {
    box.textContent =
      `🦜 Cuéntame un poco más, ${perfilActual?.nombre || "exploradora"}. ` +
      `He escuchado ${estado.palabras} de ${MISSION_MIN_WORDS} palabras.`;
  } else if (!estado.cumpleDuracion) {
    box.textContent =
      `🦜 Me está encantando escucharte. Cuéntame un poquito más hasta llegar a ${MISSION_MIN_AUDIO_SECONDS} segundos.`;
  } else {
    box.textContent =
      "🦜 Ya casi está. Revisa que el libro esté marcado como Terminado.";
  }
}

function criteriosMisionBiblioteca() {
  const transcripcion = $("voiceTranscript")?.value?.trim() || "";
  const palabras = contarPalabras(transcripcion);
  const segundos = Number(recordedAudioDuration || 0);
  const estadoTerminado = $("readingStatus")?.value === "Terminado";
  const tieneTitulo = Boolean($("title")?.value?.trim());
  const tieneAudio = Boolean(recordedAudioData);
  const tieneLibroSeleccionado =
    !misionActiva || !misionId || Boolean(libroMisionSeleccionado?.id);

  return {
    tieneTitulo,
    tieneLibroSeleccionado,
    estadoTerminado,
    tieneAudio,
    segundos,
    palabras,
    cumpleDuracion: tieneAudio && segundos >= MISSION_MIN_AUDIO_SECONDS,
    cumplePalabras: palabras >= MISSION_MIN_WORDS,
    completa:
      tieneTitulo &&
      tieneLibroSeleccionado &&
      estadoTerminado &&
      tieneAudio &&
      segundos >= MISSION_MIN_AUDIO_SECONDS &&
      palabras >= MISSION_MIN_WORDS
  };
}

function actualizarProgresoOralMision() {
  const panel = $("oralMissionProgress");
  if (!panel) return;

  const activa = Boolean(misionActiva && misionId);
  panel.classList.toggle("hidden", !activa);
  if (!activa) return;

  const estado = criteriosMisionBiblioteca();
  const duracion = Math.min(100, estado.segundos / MISSION_MIN_AUDIO_SECONDS * 100);
  const palabras = Math.min(100, estado.palabras / MISSION_MIN_WORDS * 100);
  const libro = estado.estadoTerminado ? 100 : 0;
  const total = Math.round((duracion + palabras + libro) / 3);

  $("oralMissionSeconds").textContent =
    `${Math.floor(estado.segundos)} / ${MISSION_MIN_AUDIO_SECONDS} s`;
  $("oralMissionWords").textContent =
    `${estado.palabras} / ${MISSION_MIN_WORDS}`;
  $("oralMissionBookStatus").textContent =
    estado.estadoTerminado ? "Terminado ✅" : "Debe estar terminado";
  $("oralMissionProgressBar").style.width = `${total}%`;

  panel.classList.toggle("oral-mission-progress--ready", estado.completa);
  $("oralMissionReady").textContent =
    estado.completa ? "¡Preparada! ✅" : "En preparación";

  $("oralMissionMessage").textContent =
    !estado.tieneLibroSeleccionado
      ? "Elige primero un libro ya registrado en la Biblioteca."
      : !estado.estadoTerminado
        ? "Marca el libro como Terminado cuando hayas acabado de leerlo."
        : !estado.tieneAudio
        ? "Tengo muchas ganas de conocer este libro. Cuéntamelo con calma."
        : !estado.cumpleDuracion || !estado.cumplePalabras
          ? "Me está gustando mucho lo que me cuentas. ¿Podrías contarme un poquito más?"
          : "¡Qué bien! Ya conozco un poquito mejor este libro gracias a ti.";

  const boton = $("saveBookButton");
  const aviso = $("missionSaveHint");

  if (boton) {
    boton.disabled = false;
    boton.classList.toggle("mission-save-incomplete", !estado.completa);
    boton.setAttribute("aria-disabled", String(!estado.completa));
    boton.title = estado.completa
      ? "Guardar libro y enviar la misión a revisión"
      : "Pulsa para saber qué falta antes de completar la misión";
  }

  if (aviso) {
    aviso.classList.toggle("hidden", estado.completa);
    aviso.textContent = estado.completa
      ? ""
      : "Puedes pulsar Guardar libro para que Lía te indique qué falta.";
  }
}

function progresoMisionBiblioteca() {
  const criterio = misionActiva?.criterioCumplimiento || {};
  const progreso = misionActiva?.progreso || {};
  const objetivo = Number(
    criterio.cantidadObjetivo ?? progreso.cantidadObjetivo ?? 1
  );
  const actual = Number(progreso.cantidadActual || 0);

  return {
    actual,
    objetivo,
    terminada: objetivo > 0 && actual >= objetivo
  };
}

function actualizarBandaMisionBiblioteca() {
  const banner = $("libraryMissionBanner");
  if (!banner) return;

  banner.classList.remove(
    "library-mission--free",
    "library-mission--help",
    "library-mission--done"
  );

  if (!misionActiva) {
    banner.classList.add("library-mission--free");
    $("libraryMissionTitle").textContent = "🌈 Biblioteca libre";
    $("libraryMissionDescription").textContent =
      "Guarda y comparte tus libros a tu propio ritmo.";
    $("libraryMissionProgress").textContent = "Sin misión";
    $("libraryMissionStatus").textContent = "Estado: Lectura libre";
    $("libraryMissionHelp").classList.add("hidden");
    $("oralMissionProgress")?.classList.add("hidden");
    $("missionBookSelector")?.classList.add("hidden");
    $("missionSelectedBook")?.classList.add("hidden");
    $("liaMissionRecordingMessage")?.classList.add("hidden");
    $("saveBookButton").disabled = false;
    $("missionSaveHint")?.classList.add("hidden");
    return;
  }

  const { actual, objetivo, terminada } = progresoMisionBiblioteca();
  const ayuda = misionActiva.estado === "necesita_ayuda";
  const revision = [
    "pendiente_validacion",
    "completada_pendiente_validacion"
  ].includes(misionActiva.estado);

  if (terminada || revision) banner.classList.add("library-mission--done");
  else if (ayuda) banner.classList.add("library-mission--help");

  $("libraryMissionTitle").textContent = revision
    ? "🌟 Libro compartido"
    : terminada
      ? "🎉 ¡Misión terminada!"
      : ayuda
        ? "🤝 Has pedido ayuda"
        : "📚 Misión en curso";

  $("libraryMissionDescription").textContent = revision
    ? "Tu familia ya puede escuchar y revisar cómo compartiste este libro."
    : (
        misionActiva.presentacionAlumno?.descripcionMision ||
        misionActiva.descripcion ||
        "Cuéntale a Lía un libro que hayas terminado."
      );

  $("libraryMissionProgress").textContent = `${actual} de ${objetivo}`;
  $("libraryMissionStatus").textContent = revision
    ? "Estado: Esperando revisión"
    : terminada
      ? "Estado: Terminada"
      : ayuda
        ? "Estado: He pedido ayuda"
        : "Estado: En curso";

  $("libraryMissionHelp").classList.toggle("hidden", terminada || revision);
  $("libraryMissionHelp").textContent = ayuda
    ? "▶️ Ya puedo continuar"
    : "🤝 Necesito ayuda";

  actualizarProgresoOralMision();
}

async function cargarMisionBiblioteca() {
  if (!misionId) {
    actualizarBandaMisionBiblioteca();
    return;
  }

  try {
    const tarea = await Academia.tareas.obtener(misionId);
    const criterio = tarea?.criterioCumplimiento || {};

    if (
      !tarea ||
      tarea.modulo !== "biblioteca" ||
      (criterio.modulo && criterio.modulo !== "biblioteca")
    ) {
      throw new Error("La misión no corresponde a Biblioteca Encantada.");
    }

    misionActiva = tarea;

    if (["pendiente", "asignada"].includes(tarea.estado)) {
      await Academia.tareas.cambiarEstado(misionId, "en_curso");
      misionActiva.estado = "en_curso";
    }

    actualizarBandaMisionBiblioteca();
    renderSelectorLibrosMision();
    renderLibroMisionSeleccionado();
    openTab("library");
  } catch (error) {
    console.error("No se pudo cargar la misión de Biblioteca.", error);
    alert(error.message);
    misionId = null;
    misionActiva = null;
    actualizarBandaMisionBiblioteca();
  }
}

async function alternarAyudaMisionBiblioteca() {
  if (!misionActiva || !misionId) return;

  const pedir = misionActiva.estado !== "necesita_ayuda";
  const boton = $("libraryMissionHelp");
  boton.disabled = true;

  try {
    await Academia.tareas.cambiarEstado(
      misionId,
      pedir ? "necesita_ayuda" : "en_curso"
    );
    misionActiva.estado = pedir ? "necesita_ayuda" : "en_curso";
    actualizarBandaMisionBiblioteca();
  } catch (error) {
    console.error(error);
    alert("No pudimos guardar la solicitud de ayuda.");
  } finally {
    boton.disabled = false;
  }
}

async function registrarEvidenciaBiblioteca(libro, audio) {
  if (!misionActiva || !misionId) return null;

  const estado = criteriosMisionBiblioteca();
  if (!estado.completa) {
    throw new Error(
      "La misión necesita un libro terminado, 15 segundos de audio y 15 palabras escuchadas."
    );
  }

  const criterio = misionActiva.criterioCumplimiento || {};
  const resultado = await Academia.tareas.registrarEvidencia({
    misionId,
    modulo: "biblioteca",
    tipo: criterio.evidenciaTipo || "libro_compartido",
    actividadId: libroMisionSeleccionado?.id || libro.id,
    sesionId: libroMisionSeleccionado?.id || libro.id,
    atributos: {
      readingStatus: libro.readingStatus,
      estadoLibro: libro.readingStatus,
      tieneAudio: true,
      hasAudio: true,
      duracionMinimaCumplida: true,
      palabrasMinimasCumplidas: true
    },
    resultado: {
      libroId: libro.id,
      titulo: libro.title,
      autor: libro.author || "",
      estado: libro.readingStatus,
      duracionAudio: Number(audio.duration || 0),
      palabrasReconocidas: contarPalabras(audio.transcript || ""),
      transcripcion: audio.transcript || "",
      observacionFamilia: audio.familyObservation || ""
    },
    destinoRevision:
      `mi-universo/biblioteca/?libroId=${encodeURIComponent(libro.id)}`
  });

  misionActiva.estado = resultado.estado;
  misionActiva.progreso = {
    ...(misionActiva.progreso || {}),
    cantidadActual: resultado.cantidadActual,
    cantidadObjetivo: resultado.cantidadObjetivo
  };
  actualizarBandaMisionBiblioteca();
  return resultado;
}


const fields = [
  "title","author","readingStatus","favoriteCharacter",
  "rating","favoritePart","learning","newWords","review","coverImage"
];

function bookData(){
  return {
    id: $("bookId").value,
    title: $("title").value.trim(),
    author: $("author").value.trim(),
    readingStatus: $("readingStatus").value,
    favoriteCharacter: $("favoriteCharacter").value.trim(),
    rating: Number($("rating").value) || 0,
    favoritePart: $("favoritePart").value.trim(),
    learning: $("learning").value.trim(),
    newWords: $("newWords").value.trim(),
    review: $("review").value.trim(),
    coverImage: $("coverImage").value,
    hasAudio: currentBook?.id === $("bookId").value
      ? Boolean(currentBook?.hasAudio)
      : Boolean(recordedAudioData)
  };
}


const COVER_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='210' viewBox='0 0 150 210'%3E%3Crect width='150' height='210' rx='18' fill='%23f5f3ff'/%3E%3Ctext x='75' y='115' text-anchor='middle' font-size='54'%3E%F0%9F%93%96%3C/text%3E%3C/svg%3E";

function mostrarVistaPreviaCaratula(dataUrl = "") {
  const preview = $("coverPreview");
  preview.src = dataUrl || COVER_PLACEHOLDER;
  preview.classList.toggle("empty", !dataUrl);
}

function cargarImagen(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("No se pudo leer la imagen."));
      image.src = reader.result;
    };

    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });
}

async function reducirCaratula(file) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Selecciona un archivo de imagen.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("La imagen supera los 5 MB.");
  }

  const image = await cargarImagen(file);
  const scale = Math.min(1, 420 / image.width, 600 / image.height);

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));

  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL("image/jpeg", 0.76);

  if (dataUrl.length > 700000) {
    throw new Error("La carátula sigue siendo demasiado grande.");
  }

  return dataUrl;
}

$("coverFile").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    $("statusText").textContent = "Preparando carátula...";
    const dataUrl = await reducirCaratula(file);
    $("coverImage").value = dataUrl;
    mostrarVistaPreviaCaratula(dataUrl);
    $("statusText").textContent = "Cambios sin guardar";
  } catch (error) {
    console.error(error);
    event.target.value = "";
    alert(error.message);
    $("statusText").textContent = "Sin guardar";
  }
});

$("removeCover").onclick = () => {
  $("coverFile").value = "";
  $("coverImage").value = "";
  mostrarVistaPreviaCaratula();
  $("statusText").textContent = "Cambios sin guardar";
};



function speechRecognitionSupported() {
  return Boolean(
    window.SpeechRecognition ||
    window.webkitSpeechRecognition
  );
}

function configurarReconocimientoVoz() {
  const Recognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!Recognition) {
    $("speechSupport").textContent =
      "La transcripción automática no está disponible en este navegador.";
    return;
  }

  $("speechSupport").textContent =
    "Transcripción automática disponible en español. El texto quedará bloqueado para poder comparar y volver a intentarlo.";

  speechRecognition = new Recognition();
  speechRecognition.lang = SPEECH_LANGUAGE;
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;

  speechRecognition.onresult = event => {
    let interim = "";
    let complete = finalTranscript;

    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const text = event.results[index][0].transcript;

      if (event.results[index].isFinal) {
        complete += `${text} `;
      } else {
        interim += text;
      }
    }

    finalTranscript = complete.trim();
    $("voiceTranscript").value =
      [finalTranscript, interim].filter(Boolean).join(" ").trim();
    transcriptEdited = false;
    actualizarProgresoOralMision();
  };

  speechRecognition.onerror = event => {
    console.warn("SpeechRecognition:", event.error);

    if (event.error !== "no-speech" && event.error !== "aborted") {
      $("speechSupport").textContent =
        "No se pudo completar la transcripción automática.";
    }
  };
}

function iniciarReconocimientoVoz() {
  if (!speechRecognition) return;

  finalTranscript = "";
  transcriptEdited = false;
  $("voiceTranscript").value = "";

  try {
    speechRecognition.start();
  } catch (error) {
    console.warn(error);
  }
}

function detenerReconocimientoVoz() {
  if (!speechRecognition) return;

  try {
    speechRecognition.stop();
  } catch (error) {
    console.warn(error);
  }
}

function formatDuration(seconds = 0) {
  const value = Math.max(0, Math.round(seconds));
  const minutes = String(Math.floor(value / 60)).padStart(2, "0");
  const remaining = String(value % 60).padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("No se pudo preparar el audio."));
    reader.readAsDataURL(blob);
  });
}

function actualizarPanelGrabacion(segundos = 0, grabando = false) {
  const valor = Math.min(
    MAX_RECORDING_SECONDS,
    Math.max(0, Number(segundos) || 0)
  );

  const progreso = (valor / MAX_RECORDING_SECONDS) * 100;

  $("recordTimer").textContent =
    `${formatDuration(valor)} / ${formatDuration(MAX_RECORDING_SECONDS)}`;

  $("recordProgressBar").style.width = `${progreso}%`;
  $("recordLight").classList.toggle("active", grabando);
}

function iniciarPanelGrabacion() {
  clearInterval(recordingTicker);
  actualizarPanelGrabacion(0, true);

  recordingTicker = setInterval(() => {
    const segundos = (Date.now() - recordingStartedAt) / 1000;
    actualizarPanelGrabacion(segundos, true);
  }, 200);
}

function detenerPanelGrabacion() {
  clearInterval(recordingTicker);
  recordingTicker = null;
  actualizarPanelGrabacion(recordedAudioDuration, false);
}

function actualizarControlesAudio() {
  const hasAudio = Boolean(recordedAudioData);
  $("playRecording").disabled = !hasAudio;
  $("deleteRecording").disabled = !hasAudio;
  $("voicePreview").classList.toggle("hidden", !hasAudio);

  if (hasAudio) {
    $("voicePreview").src = recordedAudioData;
    $("voiceStatus").textContent =
      `Lía guardó tu voz · ${formatDuration(recordedAudioDuration)}`;
    $("voiceSuccess").classList.add("show");
    actualizarPanelGrabacion(recordedAudioDuration, false);
  } else {
    $("voicePreview").removeAttribute("src");
    $("voiceStatus").textContent = "Lía está preparada para escucharte.";
    $("voiceSuccess").classList.remove("show");
    actualizarPanelGrabacion(0, false);
  }
}

async function cargarAudioLibro(libroId) {
  recordedAudioData = "";
  recordedAudioDuration = 0;
  recordedAudioMimeType = "audio/webm";
  actualizarControlesAudio();

  if (!libroId) return;

  const audio = await Academia.biblioteca.audio.leer(libroId);

  if (!audio) return;

  recordedAudioData = audio.audioData || "";
  recordedAudioDuration = Number(audio.duration || 0);
  recordedAudioMimeType = audio.mimeType || "audio/webm";
  finalTranscript = audio.transcript || "";
  transcriptEdited = false;
  $("voiceTranscript").value = finalTranscript;
  $("familyObservation").value = String(audio.familyObservation || "");
  actualizarControlesAudio();
  actualizarProgresoOralMision();
}

async function guardarAudioActual(libroId) {
  if (!recordedAudioData) return null;

  const audio = {
    audioData: recordedAudioData,
    mimeType: recordedAudioMimeType,
    duration: recordedAudioDuration,
    transcript: $("voiceTranscript").value.trim(),
    familyObservation: $("familyObservation").value.trim(),
    language: SPEECH_LANGUAGE,
    transcriptEdited: false
  };

  await Academia.biblioteca.audio.guardar(libroId, audio);

  if (currentBook?.id === libroId) {
    currentBook.hasAudio = true;
  }

  return audio;
}

$("startRecording").onclick = async () => {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    alert("Este navegador no permite grabar audio.");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioChunks = [];
    recordedAudioData = "";
    recordedAudioDuration = 0;
    actualizarControlesAudio();

    const preferredType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? "audio/webm;codecs=opus"
      : "audio/webm";

    mediaRecorder = new MediaRecorder(stream, {
      mimeType: preferredType,
      audioBitsPerSecond: 32000
    });

    recordedAudioMimeType = mediaRecorder.mimeType || preferredType;
    recordingStartedAt = Date.now();

    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      clearTimeout(recordingTimer);
      clearInterval(recordingTicker);
      recordingTicker = null;
      detenerReconocimientoVoz();
      stream.getTracks().forEach(track => track.stop());

      const blob = new Blob(audioChunks, {
        type: recordedAudioMimeType
      });

      recordedAudioDuration = Math.min(
        MAX_RECORDING_SECONDS,
        (Date.now() - recordingStartedAt) / 1000
      );
      recordedAudioData = await blobToDataUrl(blob);
      detenerPanelGrabacion();

      $("startRecording").disabled = false;
      $("startRecording").classList.remove("recording");
      $("stopRecording").disabled = true;
      actualizarControlesAudio();
      actualizarProgresoOralMision();
      mostrarMensajeLiaTrasGrabacion();
      $("statusText").textContent = "Cambios sin guardar";
    };

    mediaRecorder.start(250);
    iniciarReconocimientoVoz();

    $("startRecording").disabled = true;
    $("startRecording").classList.add("recording");
    $("stopRecording").disabled = false;
    $("voiceStatus").textContent = "Lía te está escuchando... habla con calma 🎙️";
    $("voiceSuccess").classList.remove("show");
    iniciarPanelGrabacion();

    recordingTimer = setTimeout(() => {
      if (mediaRecorder?.state === "recording") {
        mediaRecorder.stop();
      }
    }, MAX_RECORDING_SECONDS * 1000);
  } catch (error) {
    console.error(error);
    alert("No se pudo usar el micrófono. Revisa el permiso del navegador.");
  }
};

$("stopRecording").onclick = () => {
  if (mediaRecorder?.state === "recording") {
    mediaRecorder.stop();
  }
};

$("playRecording").onclick = () => {
  if (!recordedAudioData) return;
  $("voicePreview").play();
};

$("deleteRecording").onclick = async () => {
  if (!recordedAudioData) return;
  if (!confirm("¿Quieres borrar esta grabación?")) return;

  const libroId = $("bookId").value;

  if (libroId) {
    await Academia.biblioteca.audio.eliminar(libroId);
  }

  if (currentBook?.id === libroId) {
    currentBook.hasAudio = false;
  }

  recordedAudioData = "";
  recordedAudioDuration = 0;
  detenerPanelGrabacion();
  finalTranscript = "";
  transcriptEdited = false;
  $("voiceTranscript").value = "";
  $("familyObservation").value = "";
  actualizarControlesAudio();
  actualizarProgresoOralMision();
  $("statusText").textContent = "Cambios sin guardar";
};

    function validateBook(book){
      if(!book.title){
        alert("Escribe el título del libro 📖");
        $("title").focus();
        return false;
      }

      if (misionActiva && misionId) {
        const estado = criteriosMisionBiblioteca();

        if (!estado.tieneLibroSeleccionado) {
          alert("Elige primero un libro ya registrado en la Biblioteca.");
          openTab("library");
          renderSelectorLibrosMision();
          return false;
        }

        if (!estado.estadoTerminado) {
          $("oralMissionMessage").textContent =
            "Marca el libro como Terminado cuando hayas acabado de leerlo.";
          alert("Para completar esta misión, marca el libro como Terminado.");
          $("readingStatus").focus();
          return false;
        }

        if (!estado.tieneAudio) {
          $("liaMissionRecordingMessage").classList.remove("hidden");
          $("liaMissionRecordingMessage").classList.remove(
            "lia-mission-recording-message--success"
          );
          $("liaMissionRecordingMessage").textContent =
            `🦜 ${perfilActual?.nombre || "Exploradora"}, cuéntame este libro con tu voz para poder guardar la misión.`;
          document.querySelector(".voice-box")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          return false;
        }

        if (!estado.cumpleDuracion || !estado.cumplePalabras) {
          mostrarMensajeLiaTrasGrabacion();
          document.querySelector(".voice-box")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          return false;
        }
      }

      return true;
    }

    function openTab(name){
      document.querySelectorAll(".panel").forEach(panel=>panel.classList.add("hidden"));
      $(name).classList.remove("hidden");

      document.querySelectorAll(".tab").forEach(tab=>{
        tab.classList.toggle("active",tab.dataset.tab===name);
      });

      if(name==="library") {
        renderBooks();
        renderSelectorLibrosMision();
      }

      scrollTo({top:0,behavior:"smooth"});
    }

    document.querySelectorAll(".tab").forEach(tab=>{
      tab.onclick=()=>openTab(tab.dataset.tab);
    });

$("addBookFromLibrary").onclick = () => {
  $("newBook").click();
  openTab("new");
};

    document.querySelectorAll(".star").forEach(button=>{
      button.onclick=()=>{
        const value=Number(button.dataset.value);
        $("rating").value=value;
        updateStars(value);
        $("statusText").textContent="Cambios sin guardar";
      };
    });

    function updateStars(value){
      document.querySelectorAll(".star").forEach(button=>{
        button.classList.toggle("active",Number(button.dataset.value)<=value);
      });
    }

    fields.forEach(id=>{
      $(id).addEventListener("input",()=>{
        $("statusText").textContent="Cambios sin guardar";
        actualizarProgresoOralMision();
      });
    });

    $("readingStatus").addEventListener("change", actualizarProgresoOralMision);

    $("familyObservation").addEventListener("input",()=>{
      $("statusText").textContent="Cambios sin guardar";
    });

$("bookForm").onsubmit = async event => {
  event.preventDefault();

  const book = bookData();

  if (misionActiva && misionId && libroMisionSeleccionado?.id) {
    book.id = libroMisionSeleccionado.id;
    $("bookId").value = libroMisionSeleccionado.id;
  }

  if (!validateBook(book)) return;

  const button = event.submitter;

  try {
    if (button) button.disabled = true;
    $("statusText").textContent = "Guardando...";

    if (book.id) {
      await Academia.biblioteca.actualizar(book.id, book);
    } else {
      const id = await Academia.biblioteca.guardar(book);
      $("bookId").value = id;
      book.id = id;
    }

    const audio = await guardarAudioActual(book.id);

    if (misionActiva && misionId) {
      await registrarEvidenciaBiblioteca(book, audio || {
        duration: recordedAudioDuration,
        transcript: $("voiceTranscript").value.trim(),
        familyObservation: $("familyObservation").value.trim()
      });
    }

    $("statusText").textContent = "Guardado ✅";
    libroMisionSeleccionado = book;
    renderLibroMisionSeleccionado();
    await showBook(book);
    openTab(misionActiva ? "detail" : "library");

    alert(
      misionActiva
        ? "🦜 ¡Gracias por compartir este libro conmigo! Tu familia ya puede revisarlo."
        : "🌟 ¡Libro guardado! Lía ya lo añadió a tu Biblioteca Encantada."
    );
  } catch (error) {
    console.error(error);
    $("statusText").textContent = "No se pudo guardar";
    alert(`No se pudo guardar el libro.\n${error.message}`);
  } finally {
    if (button) button.disabled = false;
  }
};

    $("newBook").onclick=()=>{
      if (misionActiva && misionId) {
        alert("Para esta misión, elige un libro que ya haya registrado tu familia.");
        openTab("library");
        renderSelectorLibrosMision();
        return;
      }

      $("bookForm").reset();
      $("bookId").value="";
      $("rating").value="0";
      $("coverImage").value="";
      $("coverFile").value="";
      mostrarVistaPreviaCaratula();
      recordedAudioData = "";
      recordedAudioDuration = 0;
      finalTranscript = "";
      transcriptEdited = false;
      $("voiceTranscript").value = "";
      $("familyObservation").value = "";
      actualizarControlesAudio();
      actualizarProgresoOralMision();
      updateStars(0);
      $("statusText").textContent="Sin guardar";
      $("title").focus();
    };

    $("previewBook").onclick=async ()=>{
      const book = bookData();

      if (!book.title) {
        alert("Escribe el título del libro 📖");
        $("title").focus();
        return;
      }

      await showBook(book);
      openTab("detail");
    };

    function renderBooks(filter=""){
      const normalizedFilter = String(filter || "").toLowerCase().trim();

      const filteredBooks = books.filter(book=>{
        const text=[
          book.title,
          book.author,
          book.favoriteCharacter,
          book.readingStatus
        ].join(" ").toLowerCase();

        const matchesText = text.includes(normalizedFilter);
        const matchesStatus =
          !currentStatusFilter ||
          book.readingStatus === currentStatusFilter;

        return matchesText && matchesStatus;
      });

      const grid=$("bookGrid");
      grid.innerHTML="";
      $("emptyLibrary").classList.toggle("hidden", filteredBooks.length > 0);

      filteredBooks.forEach(book=>{
        const article=document.createElement("article");
        article.className="book";

        const badgeClass=
          book.readingStatus==="Terminado"?"status-finished":
          book.readingStatus==="Quiero leer"?"status-wish":"status-reading";

        article.innerHTML=`
          ${
            book.coverImage
              ? `<img class="book-cover-image" src="${book.coverImage}" alt="Carátula de ${escapeHtml(book.title)}">`
              : `<div class="cover">📘</div>`
          }
          <div style="display:flex;justify-content:space-between;gap:8px;align-items:center">
            <span class="badge ${badgeClass}">${escapeHtml(book.readingStatus)}</span>
            ${book.hasAudio ? '<span class="badge audio-badge" title="Este libro tiene una grabación">🎙️ Audio</span>' : ''}
          </div>
          <h3 style="font-size:24px;margin:10px 0 4px">${escapeHtml(book.title)}</h3>
          <p class="help">${escapeHtml(book.author||"Autor no indicado")}</p>
          <div style="font-size:22px;margin:8px 0">${"⭐".repeat(book.rating||0)}</div>
          <div class="actions">
            <button class="btn blue read">Ver</button>
            <button class="btn light edit">Editar</button>
            <button class="btn red delete">Eliminar</button>
          </div>
        `;

        article.querySelector(".read").onclick = async () => {
          await showBook(book);
          openTab("detail");
        };

        article.querySelector(".edit").onclick = async () => {
          await loadBook(book);
          openTab("new");
        };

        article.querySelector(".delete").onclick = async () => {
          if (!confirm("¿Quieres eliminar este libro?")) return;

          try {
            await Academia.biblioteca.eliminar(book.id);
          } catch (error) {
            console.error(error);
            alert(`No se pudo eliminar el libro.\n${error.message}`);
          }
        };

        grid.appendChild(article);
      });
    }

    async function loadBook(book){
      currentBook = book;
      $("bookId").value=book.id;

      fields.forEach(id=>{
        $(id).value=book[id]??"";
      });

      $("coverFile").value = "";
      mostrarVistaPreviaCaratula(book.coverImage || "");
      updateStars(book.rating||0);
      await cargarAudioLibro(book.id);
      actualizarProgresoOralMision();
      $("statusText").textContent="Guardado ✅";
    }

    async function showBook(book){
      currentBook=book;

      $("detailEmpty").classList.add("hidden");
      $("detailContent").classList.remove("hidden");

      const badgeClass=
        book.readingStatus==="Terminado"?"status-finished":
        book.readingStatus==="Quiero leer"?"status-wish":"status-reading";

      if (book.coverImage) {
        $("detailCoverImage").src = book.coverImage;
        $("detailCoverImage").classList.remove("hidden");
        $("detailCoverFallback").classList.add("hidden");
      } else {
        $("detailCoverImage").removeAttribute("src");
        $("detailCoverImage").classList.add("hidden");
        $("detailCoverFallback").classList.remove("hidden");
      }

      $("detailStatus").className="badge "+badgeClass;
      $("detailStatus").textContent=book.readingStatus;
      $("detailTitle").textContent=book.title;
      $("detailAuthor").textContent=book.author||"Autor no indicado";
      $("detailStars").textContent="⭐".repeat(book.rating||0) || "Sin valoración todavía";
      $("detailCharacter").textContent=book.favoriteCharacter||"No indicado";
      $("detailFavorite").textContent=book.favoritePart||"No indicado";
      $("detailLearning").textContent=book.learning||"No indicado";
      $("detailWords").textContent=book.newWords||"No hay palabras guardadas";
      $("detailReview").textContent=book.review||"Reseña pendiente";

      try {
        const audio = book.id
          ? await Academia.biblioteca.audio.leer(book.id)
          : null;

        if (audio?.audioData) {
          $("detailVoiceAudio").src = audio.audioData;
          $("detailVoiceDuration").textContent =
            `Duración: ${formatDuration(audio.duration || 0)}`;

          const transcript = String(audio.transcript || "").trim();

          if (transcript) {
            $("detailVoiceTranscript").textContent = transcript;
            $("detailTranscriptBox").classList.remove("hidden");
          } else {
            $("detailVoiceTranscript").textContent = "";
            $("detailTranscriptBox").classList.add("hidden");
          }

          const familyObservation =
            String(audio.familyObservation || "").trim();

          if (familyObservation) {
            $("detailFamilyObservation").textContent = familyObservation;
            $("detailFamilyObservationBox").classList.remove("hidden");
          } else {
            $("detailFamilyObservation").textContent = "";
            $("detailFamilyObservationBox").classList.add("hidden");
          }

          $("detailVoiceSection").classList.remove("hidden");
        } else {
          $("detailVoiceAudio").removeAttribute("src");
          $("detailVoiceDuration").textContent = "";
          $("detailVoiceTranscript").textContent = "";
          $("detailTranscriptBox").classList.add("hidden");
          $("detailFamilyObservation").textContent = "";
          $("detailFamilyObservationBox").classList.add("hidden");
          $("detailVoiceSection").classList.add("hidden");
        }
      } catch (error) {
        console.error(error);
        $("detailVoiceSection").classList.add("hidden");
      }
    }

    document.querySelectorAll("[data-status-filter]").forEach(button => {
      button.addEventListener("click", () => {
        currentStatusFilter = button.dataset.statusFilter || "";

        document.querySelectorAll("[data-status-filter]").forEach(item => {
          item.classList.toggle("active", item === button);
        });

        renderBooks($("searchBook").value);
      });
    });

    $("searchBook").oninput=event=>{
      renderBooks(event.target.value);
    };

function updateCount(){
  const count = books.length;
  const reading = books.filter(book => book.readingStatus === "Leyendo").length;
  const finished = books.filter(book => book.readingStatus === "Terminado").length;
  const wish = books.filter(book => book.readingStatus === "Quiero leer").length;
  const rated = books.filter(book => Number(book.rating) > 0);
  const average = rated.length
    ? rated.reduce((sum, book) => sum + Number(book.rating || 0), 0) / rated.length
    : 0;

  $("bookCount").textContent = count;
  $("statTotal").textContent = count;
  $("statReading").textContent = reading;
  $("statFinished").textContent = finished;
  $("statWish").textContent = wish;
  $("statRating").textContent = average.toFixed(1);

  $("filterCountAll").textContent = count;
  $("filterCountReading").textContent = reading;
  $("filterCountFinished").textContent = finished;
  $("filterCountWish").textContent = wish;

  let message = "Tu biblioteca empieza con un libro.";
  if(count >= 1) message = "¡Ya tienes tu primera lectura guardada! 🌱";
  if(count >= 3) message = "¡Tu estantería está creciendo! 📚";
  if(count >= 5) message = "¡Eres una gran exploradora de historias! ✨";
  if(count >= 10) message = "¡Biblioteca poderosa! 🌟";

  $("readerMessage").textContent = message;
}

    $("speakReview").onclick=()=>{
      if(!currentBook||!("speechSynthesis" in window))return;

      speechSynthesis.cancel();

      const text=[
        currentBook.title,
        currentBook.author ? "Escrito por "+currentBook.author : "",
        currentBook.review,
        currentBook.learning
      ].filter(Boolean).join(". ");

      const utterance=new SpeechSynthesisUtterance(text);
      utterance.lang="es-ES";
      utterance.rate=.9;
      speechSynthesis.speak(utterance);
    };

    $("stopSpeech").onclick=()=>{
      if("speechSynthesis" in window)speechSynthesis.cancel();
    };

    $("exportBooks").onclick=()=>{
      const blob=new Blob(
        [JSON.stringify(books, null, 2)],
        {type:"application/json"}
      );

      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="mi-biblioteca.json";
      link.click();
      URL.revokeObjectURL(link.href);
    };

$("importBooks").onchange = async event => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const imported = JSON.parse(await file.text());

    if (!Array.isArray(imported)) {
      throw new Error("El archivo no contiene una lista de libros.");
    }

    if (!confirm(`Se importarán ${imported.length} libro(s). ¿Continuar?`)) {
      return;
    }

    for (const book of imported) {
      await Academia.biblioteca.guardar({
        ...book,
        id: undefined
      });
    }

    alert("Biblioteca importada correctamente ✨");
  } catch (error) {
    console.error(error);
    alert(`El archivo no es válido.\n${error.message}`);
  }

  event.target.value = "";
};

    function escapeHtml(value=""){
      return value.replace(/[&<>"']/g,char=>({
        "&":"&amp;",
        "<":"&lt;",
        ">":"&gt;",
        '"':"&quot;",
        "'":"&#039;"
      })[char]);
    }

    renderBooks();
    updateCount();


mostrarVistaPreviaCaratula();
actualizarControlesAudio();
actualizarPanelGrabacion(0, false);
configurarReconocimientoVoz();

$("libraryMissionHelp").addEventListener("click", alternarAyudaMisionBiblioteca);
$("changeMissionBook").addEventListener("click", cambiarLibroDeMision);

document.querySelectorAll("[data-mission-status-filter]").forEach(button => {
  button.addEventListener("click", () => {
    missionStatusFilter = button.dataset.missionStatusFilter || "";

    document.querySelectorAll("[data-mission-status-filter]").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderSelectorLibrosMision();
  });
});

$("missionBookSearch").addEventListener("input", event => {
  missionSearchFilter = event.target.value || "";
  renderSelectorLibrosMision();
});

function aplicarPersonalizacionBiblioteca(perfil) {
  const nombreCompleto = String(
    perfil.nombre || perfil.nombreVisible || "Exploradora"
  ).trim();

  const nombreVisible = String(
    perfil.nombreVisible || perfil.nombre || "Exploradora"
  ).trim();

  document.querySelectorAll("[data-nombre-completo]").forEach(elemento => {
    elemento.textContent = nombreCompleto;
  });

  document.querySelectorAll("[data-nombre-visible]").forEach(elemento => {
    elemento.textContent = nombreVisible;
  });

  const mensaje = $("mensajeBiblioteca");
  if (mensaje) {
    mensaje.textContent =
      `🌟 ${nombreVisible}, cada libro que descubres abre una puerta nueva ` +
      `a tu imaginación. Sigue leyendo a tu ritmo y celebra cada página.`;
  }
}

async function iniciarBiblioteca() {
  await auth.authStateReady();

  if (!auth.currentUser) {
    window.location.replace("/academia-gloria/login.html");
    return;
  }

  const perfil = await obtenerPerfil();
  perfilActual = perfil;
  aplicarPersonalizacionBiblioteca(perfil);

  await iniciarPanelUsuario({
    contenedor: "[data-panel-usuario]",
    loginUrl: "/academia-gloria/login.html",
    mostrarPerfil: false
  });

  await cargarMisionBiblioteca();
  actualizarProgresoOralMision();

  detenerObservacion = Academia.biblioteca.observar(
    librosFirestore => {
      books = librosFirestore;
      renderBooks($("searchBook").value);
      renderSelectorLibrosMision();
      updateCount();

      if (libroIdSolicitado) {
        const solicitado = books.find(book => book.id === libroIdSolicitado);
        if (solicitado) {
          libroIdSolicitado = null;
          showBook(solicitado).then(() => openTab("detail"));
        }
      }
    },
    error => {
      console.error(error);
      alert(`No se pudo cargar la biblioteca.\n${error.message}`);
    }
  );
}

iniciarBiblioteca();

window.addEventListener("beforeunload", () => {
  if (typeof detenerObservacion === "function") {
    detenerObservacion();
  }
});
