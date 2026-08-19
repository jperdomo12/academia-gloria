/* ==========================================================
   Academia de Gloria Valentina
   academia.js
   API pública de acceso a datos
   Persona Activa · Fase 1.9: Tareas/Misiones alineadas con auditoría transversal y trazabilidad de estado.
   ========================================================== */

/* import { db } from "../firebase/firebase-config.js"; */
import { db, auth } from "../firebase/firebase-config.js";
import { crearEvento } from "../modelos/evento.js";
import { PerfilUsuario } from "../js/perfil-usuario.js";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


/**
 * 22/07/2026: cambiado desde const USUARIO_ID = "gloria"; por el UID de gvpp.2015@gmail.com


const USUARIO_ID = "PQfCOjCCl8dIhbWJa0XdhBT803C2";  */

function obtenerUID() {
    const usuario = auth.currentUser;

    if (!usuario) {
        throw new Error("No hay ningún usuario autenticado.");
    }

    return usuario.uid;
}

async function obtenerUIDPersonaActiva() {
  const { ContextoUsuario } = await import("../js/contexto-usuario.js");
  const userId = await ContextoUsuario.obtenerUserIdPersonaActiva();

  if (!userId) {
    throw new Error("No se pudo resolver el Usuario asociado a la Persona Activa.");
  }

  return userId;
}


/**
 * Referencia a la colección:
 * usuarios/gloria/eventos
 */
function coleccionEventos(userId) {
  return collection(
    db,
    "usuarios",
    userId,
    "eventos"
  );
}

/**
 * Referencia a un evento concreto.
 */
function documentoEvento(id, userId) {
  if (!id) {
    throw new Error("Falta el identificador del evento.");
  }

  return doc(
    db,
    "usuarios",
    userId,
    "eventos",
    id
  );
}

/**
 * Crea un evento nuevo.
 */
async function guardarEvento(evento) {
  const datos = crearEvento(evento);
  const userId = await obtenerUIDPersonaActiva();

  const referencia = await addDoc(
    coleccionEventos(userId),
    {
      ...datos,
      creadoEn: serverTimestamp(),
      actualizadoEn: serverTimestamp()
    }
  );

  return referencia.id;
}

/**
 * Lee los eventos de un año, ordenados por fecha.
 */
async function leerEventos(anio) {
  const anioNormalizado = Number(anio);

  if (!Number.isInteger(anioNormalizado)) {
    throw new Error("El año indicado no es válido.");
  }

  const userId = await obtenerUIDPersonaActiva();

  const consulta = query(
    coleccionEventos(userId),
    where("anio", "==", anioNormalizado),
    orderBy("fecha", "asc")
  );

  const resultado = await getDocs(consulta);

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data()
  }));
}

/**
 * Escucha en tiempo real los eventos de un año.
 * Devuelve una función para detener la escucha.
 */
function observarEventos(
  anio,
  callback,
  onError = console.error
) {
  const anioNormalizado = Number(anio);

  if (!Number.isInteger(anioNormalizado)) {
    throw new Error("El año indicado no es válido.");
  }

  if (typeof callback !== "function") {
    throw new Error("Se necesita una función callback.");
  }

  let cancelarSnapshot = null;
  let cancelado = false;

  (async () => {
    try {
      const userId = await obtenerUIDPersonaActiva();
      if (cancelado) return;

      const consulta = query(
        coleccionEventos(userId),
        where("anio", "==", anioNormalizado),
        orderBy("fecha", "asc")
      );

      cancelarSnapshot = onSnapshot(
        consulta,
        (resultado) => {
          const eventos = resultado.docs.map((documento) => ({
            id: documento.id,
            ...documento.data()
          }));

          callback(eventos);
        },
        onError
      );
    } catch (error) {
      onError(error);
    }
  })();

  return () => {
    cancelado = true;
    if (typeof cancelarSnapshot === "function") cancelarSnapshot();
  };
}

/**
 * Actualiza un evento existente.
 */
async function actualizarEvento(id, cambios) {
  const datos = crearEvento(cambios);
  const userId = await obtenerUIDPersonaActiva();

  await updateDoc(
    documentoEvento(id, userId),
    {
      ...datos,
      actualizadoEn: serverTimestamp()
    }
  );
}

/**
 * Elimina un evento.
 */
async function eliminarEvento(id) {
  const userId = await obtenerUIDPersonaActiva();
  await deleteDoc(documentoEvento(id, userId));
}






/* ==========================================================
   Biblioteca
   usuarios/{uid}/biblioteca/{libroId}
   ========================================================== */

function coleccionBiblioteca() {
  return collection(db, "usuarios", obtenerUID(), "biblioteca");
}

function documentoLibro(id) {
  if (!id) {
    throw new Error("Falta el identificador del libro.");
  }

  return doc(db, "usuarios", obtenerUID(), "biblioteca", id);
}

function normalizarLibro(libro = {}) {
  const title = String(libro.title ?? "").trim();

  if (!title) {
    throw new Error("El libro debe tener un título.");
  }

  const rating = Number(libro.rating ?? 0);

  return {
    title,
    author: String(libro.author ?? "").trim(),
    readingStatus: String(libro.readingStatus ?? "Leyendo").trim(),
    favoriteCharacter: String(libro.favoriteCharacter ?? "").trim(),
    rating: Number.isFinite(rating)
      ? Math.max(0, Math.min(5, rating))
      : 0,
    favoritePart: String(libro.favoritePart ?? "").trim(),
    learning: String(libro.learning ?? "").trim(),
    newWords: String(libro.newWords ?? "").trim(),
    review: String(libro.review ?? "").trim(),
    coverImage: String(libro.coverImage ?? "").trim(),
    hasAudio: Boolean(libro.hasAudio)
  };
}

async function guardarLibro(libro) {
  const datos = normalizarLibro(libro);

  const referencia = await addDoc(coleccionBiblioteca(), {
    ...datos,
    creadoEn: serverTimestamp(),
    actualizadoEn: serverTimestamp()
  });

  return referencia.id;
}

async function leerLibros() {
  const consulta = query(
    coleccionBiblioteca(),
    orderBy("actualizadoEn", "desc")
  );

  const resultado = await getDocs(consulta);

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data()
  }));
}

function observarLibros(callback, onError = console.error) {
  if (typeof callback !== "function") {
    throw new Error("Se necesita una función callback.");
  }

  const consulta = query(
    coleccionBiblioteca(),
    orderBy("actualizadoEn", "desc")
  );

  return onSnapshot(
    consulta,
    (resultado) => {
      const libros = resultado.docs.map((documento) => ({
        id: documento.id,
        ...documento.data()
      }));

      callback(libros);
    },
    onError
  );
}

async function actualizarLibro(id, cambios) {
  const datos = normalizarLibro(cambios);

  await updateDoc(documentoLibro(id), {
    ...datos,
    actualizadoEn: serverTimestamp()
  });
}

async function eliminarLibro(id) {
  await deleteDoc(documentoLibro(id));
}




/* ==========================================================
   Audio de Biblioteca
   usuarios/{uid}/bibliotecaAudios/{libroId}
   ========================================================== */

function documentoAudioLibro(libroId) {
  if (!libroId) {
    throw new Error("Falta el identificador del libro.");
  }

  return doc(
    db,
    "usuarios",
    obtenerUID(),
    "bibliotecaAudios",
    libroId
  );
}

async function guardarAudioLibro(libroId, audio = {}) {
  const audioData = String(audio.audioData ?? "").trim();
  const mimeType = String(audio.mimeType ?? "audio/webm").trim();
  const duration = Number(audio.duration ?? 0);
  const transcript = String(audio.transcript ?? "").trim();
  const language = String(audio.language ?? "es-ES").trim();
  const transcriptEdited = Boolean(audio.transcriptEdited);

  if (!audioData) {
    throw new Error("No hay una grabación para guardar.");
  }

  if (audioData.length > 900000) {
    throw new Error(
      "La grabación es demasiado grande. Intenta grabar menos tiempo."
    );
  }

  await setDoc(
    documentoAudioLibro(libroId),
    {
      audioData,
      mimeType,
      duration: Number.isFinite(duration) ? duration : 0,
      transcript,
      familyObservation: String(audio.familyObservation ?? "").trim(),
      language,
      transcriptEdited,
      actualizadoEn: serverTimestamp()
    },
    { merge: true }
  );

  await updateDoc(documentoLibro(libroId), {
    hasAudio: true,
    actualizadoEn: serverTimestamp()
  });
}

async function leerAudioLibro(libroId) {
  const resultado = await getDoc(documentoAudioLibro(libroId));

  if (!resultado.exists()) {
    return null;
  }

  return {
    id: resultado.id,
    ...resultado.data()
  };
}

async function eliminarAudioLibro(libroId) {
  await deleteDoc(documentoAudioLibro(libroId));

  await updateDoc(documentoLibro(libroId), {
    hasAudio: false,
    actualizadoEn: serverTimestamp()
  });
}




/* ==========================================================
   Perfil del usuario
   usuarios/{uid}
   ========================================================== */

async function leerPerfilUsuario() {
  /*
   * Fase 1.5:
   * el perfil se resuelve mediante PerfilUsuario / ContextoUsuario.
   * Los históricos y subcolecciones funcionales continúan bajo
   * usuarios/{uid}/... hasta una fase posterior.
   */
  return PerfilUsuario.obtenerPerfil();
}


/* ==========================================================
   Mi Rincón de Lectura
   usuarios/{uid}/sesionesLectura/{sesionId}
   ========================================================== */

function coleccionSesionesLectura(userId = obtenerUID()) {
  return collection(
    db,
    "usuarios",
    userId,
    "sesionesLectura"
  );
}

function normalizarSesionLectura(sesion = {}) {
  const historiaId = String(sesion.historiaId ?? "").trim();
  const titulo = String(sesion.titulo ?? "").trim();

  if (!historiaId || !titulo) {
    throw new Error("La sesión de lectura no contiene una historia válida.");
  }

  const audioData = String(sesion.audioData ?? "").trim();

  if (audioData.length > 900000) {
    throw new Error(
      "La grabación es demasiado grande. Intenta grabar menos tiempo."
    );
  }

  return {
    historiaId,
    titulo,
    nivel: Number(sesion.nivel ?? 1),
    categoria: String(sesion.categoria ?? "").trim(),
    valores: Array.isArray(sesion.valores) ? sesion.valores : [],
    textoOriginal: String(sesion.textoOriginal ?? "").trim(),
    audioData,
    mimeType: String(sesion.mimeType ?? "audio/webm").trim(),
    duracion: Number(sesion.duracion ?? 0),
    transcripcion: String(sesion.transcripcion ?? "").trim(),
    observacionFamilia: String(sesion.observacionFamilia ?? "").trim(),
    intentos: Math.max(0, Number(sesion.intentos ?? 0)),
    analisisLectura:
      sesion.analisisLectura && typeof sesion.analisisLectura === "object"
        ? sesion.analisisLectura
        : {},
    respuestas: sesion.respuestas ?? {},
    reflexion: String(sesion.reflexion ?? "").trim(),
    fraseDelDia: String(sesion.fraseDelDia ?? "").trim(),
    idioma: String(sesion.idioma ?? "es-ES").trim()
  };
}

async function guardarSesionLectura(sesion) {
  const datos = normalizarSesionLectura(sesion);
  const userId = await obtenerUIDPersonaActiva();
  const referencia = doc(
    db,
    "usuarios",
    userId,
    "sesionesLectura",
    datos.historiaId
  );

  const existente = await getDoc(referencia);

  await setDoc(
    referencia,
    {
      ...datos,
      creadaEn: existente.exists()
        ? existente.data().creadaEn
        : serverTimestamp(),
      actualizadaEn: serverTimestamp()
    },
    { merge: true }
  );

  return referencia.id;
}

async function leerSesionesLectura() {
  const userId = await obtenerUIDPersonaActiva();
  const consulta = query(
    coleccionSesionesLectura(userId),
    orderBy("actualizadaEn", "desc")
  );

  const resultado = await getDocs(consulta);

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data()
  }));
}


async function actualizarObservacionSesionLectura(
  historiaId,
  observacionFamilia
) {
  const id = String(historiaId ?? "").trim();

  if (!id) {
    throw new Error("Falta el identificador de la aventura.");
  }

  const observacion = String(observacionFamilia ?? "").trim();
  const userId = await obtenerUIDPersonaActiva();
  const referencia = doc(
    db,
    "usuarios",
    userId,
    "sesionesLectura",
    id
  );

  const existente = await getDoc(referencia);

  if (!existente.exists()) {
    throw new Error("No se encontró la lectura guardada.");
  }

  const datosActuales = existente.data();
  const historialActual = Array.isArray(datosActuales.historialObservacionesFamilia)
    ? datosActuales.historialObservacionesFamilia
    : [];

  const ultimaObservacion =
    String(datosActuales.observacionFamilia ?? "").trim();

  const historialNuevo =
    observacion && observacion !== ultimaObservacion
      ? [
          ...historialActual,
          {
            texto: observacion,
            fecha: new Date().toISOString()
          }
        ]
      : historialActual;

  await updateDoc(referencia, {
    observacionFamilia: observacion,
    historialObservacionesFamilia: historialNuevo,
    observacionActualizadaEn: serverTimestamp(),
    actualizadaEn: serverTimestamp()
  });
}


async function eliminarSesionLectura(historiaId) {
  if (!historiaId) {
    throw new Error("Falta el identificador de la aventura.");
  }

  const userId = await obtenerUIDPersonaActiva();

  await deleteDoc(
    doc(
      db,
      "usuarios",
      userId,
      "sesionesLectura",
      historiaId
    )
  );
}



/* ==========================================================
   Creciendo por Dentro · Sesiones de Semillas
   usuarios/{uid}/sesionesSemillas/{sesionId}
   ========================================================== */

function coleccionSesionesSemillas(userId) {
  const id = String(userId || "").trim();

  if (!id) {
    throw new Error("Falta el Usuario asociado a la Persona Activa.");
  }

  return collection(
    db,
    "usuarios",
    id,
    "sesionesSemillas"
  );
}

function normalizarSesionSemilla(sesion = {}) {
  const semillaId = String(sesion.semillaId ?? "").trim();
  const titulo = String(sesion.titulo ?? "").trim();

  if (!semillaId || !titulo) {
    throw new Error("La sesión de Semilla no contiene una experiencia válida.");
  }

  const audioData = String(sesion.audioData ?? "").trim();

  if (audioData.length > 900000) {
    throw new Error(
      "La grabación es demasiado grande. Intenta grabar menos tiempo."
    );
  }

  return {
    semillaId,
    titulo,
    familia: String(sesion.familia ?? "").trim(),
    tipoSituacion: String(sesion.tipoSituacion ?? "").trim(),
    nivelApoyo: Number(sesion.nivelApoyo ?? 1),
    fechaInicio: String(sesion.fechaInicio ?? "").trim(),
    duracion: Math.max(0, Number(sesion.duracion ?? 0)),
    intentos: Math.max(0, Number(sesion.intentos ?? 0)),
    respuestaConstruida: String(sesion.respuestaConstruida ?? "").trim(),
    audioData,
    mimeType: String(sesion.mimeType ?? "audio/webm").trim(),
    duracionAudio: Math.max(0, Number(sesion.duracionAudio ?? 0)),
    transcripcion: String(sesion.transcripcion ?? "").trim(),
    respuestas:
      sesion.respuestas && typeof sesion.respuestas === "object"
        ? sesion.respuestas
        : {},
    analisisEducativo:
      sesion.analisisEducativo && typeof sesion.analisisEducativo === "object"
        ? sesion.analisisEducativo
        : {},
    observacionFamilia: String(sesion.observacionFamilia ?? "").trim(),
    misionId: String(sesion.misionId ?? "").trim()
  };
}

async function guardarSesionSemilla(sesion) {
  const datos = normalizarSesionSemilla(sesion);
  const userId = await obtenerUIDPersonaActiva();

  /*
   * Cada práctica se conserva como una sesión independiente.
   * Así una misma Semilla puede repetirse sin sobrescribir el historial.
   */
  const referencia = await addDoc(
    coleccionSesionesSemillas(userId),
    {
      ...datos,
      creadaEn: serverTimestamp(),
      actualizadaEn: serverTimestamp()
    }
  );

  return referencia.id;
}

async function leerSesionesSemillas() {
  const userId = await obtenerUIDPersonaActiva();
  const consulta = query(
    coleccionSesionesSemillas(userId),
    orderBy("actualizadaEn", "desc")
  );

  const resultado = await getDocs(consulta);

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data()
  }));
}


/* ==========================================================
   Mis Tareas / Misiones
   usuarios/{uid}/tareas/{tareaId}
   usuarios/{uid}/evidencias/{evidenciaId}
   ========================================================== */

const ESTADOS_TAREA_VALIDOS = Object.freeze([
  "pendiente",
  "asignada",
  "en_curso",
  "pendiente_validacion",
  "completada",
  "necesita_ayuda",
  "vencida",
  "cancelada"
]);

const ESTADO_LEGADO_PENDIENTE_VALIDACION =
  "completada_pendiente_validacion";

function normalizarEstadoTarea(estado, respaldo = "pendiente") {
  const valor = String(estado ?? "").trim();

  if (valor === ESTADO_LEGADO_PENDIENTE_VALIDACION) {
    return "pendiente_validacion";
  }

  return ESTADOS_TAREA_VALIDOS.includes(valor) ? valor : respaldo;
}

function numeroSeguro(valor, respaldo = 0) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : respaldo;
}

function textoSeguro(valor) {
  return String(valor ?? "").trim();
}

function coleccionTareas(userId) {
  return collection(db, "usuarios", userId, "tareas");
}

function documentoTarea(id, userId) {
  const tareaId = textoSeguro(id);

  if (!tareaId) {
    throw new Error("Falta el identificador de la tarea.");
  }

  return doc(db, "usuarios", userId, "tareas", tareaId);
}

function coleccionEvidencias(userId) {
  return collection(db, "usuarios", userId, "evidencias");
}

function documentoEvidencia(id, userId) {
  const evidenciaId = textoSeguro(id);

  if (!evidenciaId) {
    throw new Error("Falta el identificador de la evidencia.");
  }

  return doc(db, "usuarios", userId, "evidencias", evidenciaId);
}

function normalizarCriterioCumplimiento(criterio = {}) {
  const filtrosEntrada =
    criterio.filtros && typeof criterio.filtros === "object"
      ? criterio.filtros
      : {};

  const filtros = Object.fromEntries(
    Object.entries(filtrosEntrada)
      .filter(([, valor]) => valor !== undefined && valor !== null && valor !== "")
      .map(([clave, valor]) => [clave, valor])
  );

  return {
    tipo: ["cantidad", "actividad", "tiempo", "evento", "combinado"].includes(
      criterio.tipo
    )
      ? criterio.tipo
      : "cantidad",
    modulo: textoSeguro(criterio.modulo),
    evidenciaTipo: textoSeguro(criterio.evidenciaTipo),
    cantidadObjetivo: Math.max(
      1,
      Math.trunc(numeroSeguro(criterio.cantidadObjetivo, 1))
    ),
    filtros
  };
}

function normalizarProgresoTarea(progreso = {}, criterio = {}) {
  const cantidadObjetivo = Math.max(
    1,
    Math.trunc(
      numeroSeguro(
        progreso.cantidadObjetivo,
        criterio.cantidadObjetivo || 1
      )
    )
  );

  const evidenciaIds = Array.isArray(progreso.evidenciaIds)
    ? [...new Set(progreso.evidenciaIds.map(textoSeguro).filter(Boolean))]
    : [];

  return {
    iniciadaEn: progreso.iniciadaEn ?? null,
    completadaEn: progreso.completadaEn ?? null,
    cantidadActual: Math.max(
      0,
      Math.trunc(numeroSeguro(progreso.cantidadActual, evidenciaIds.length))
    ),
    cantidadObjetivo,
    evidenciaIds,
    tiempoRealMinutos: Math.max(
      0,
      numeroSeguro(progreso.tiempoRealMinutos)
    ),
    intentos: Math.max(0, Math.trunc(numeroSeguro(progreso.intentos)))
  };
}

function normalizarTarea(tarea = {}, { parcial = false, alumnoUserId = "" } = {}) {
  const titulo = textoSeguro(tarea.titulo);

  if (!parcial && !titulo) {
    throw new Error("La tarea debe tener un título.");
  }

  const tiposValidos = new Set([
    "actividad_modulo",
    "tiempo_practica",
    "cantidad_actividades",
    "tarea_libre",
    "tarea_combinada"
  ]);

  const modulosValidos = new Set([
    "rincon-lectura",
    "detectives",
    "creciendo-por-dentro",
    "biblioteca",
    "libre"
  ]);

  const criterioCumplimiento = normalizarCriterioCumplimiento(
    tarea.criterioCumplimiento || {
      tipo: tarea.tipo === "cantidad_actividades" ? "cantidad" : "actividad",
      modulo: tarea.modulo,
      evidenciaTipo: "",
      cantidadObjetivo: tarea.progreso?.cantidadObjetivo || 1,
      filtros: {}
    }
  );

  const progreso = normalizarProgresoTarea(
    tarea.progreso,
    criterioCumplimiento
  );

  const uidActual = obtenerUID();
  const uidAlumno = textoSeguro(alumnoUserId) || uidActual;

  const resultado = {
    alumnoId: textoSeguro(tarea.alumnoId) || uidAlumno,
    assignedBy: textoSeguro(tarea.assignedBy) || uidActual,
    titulo,
    descripcion: textoSeguro(tarea.descripcion),
    tipo: tiposValidos.has(tarea.tipo)
      ? tarea.tipo
      : "actividad_modulo",
    modulo: modulosValidos.has(tarea.modulo)
      ? tarea.modulo
      : "libre",
    destinoUrl: textoSeguro(tarea.destinoUrl),
    objetivo: textoSeguro(tarea.objetivo),
    criterioFinalizacion: textoSeguro(tarea.criterioFinalizacion),
    criterioCumplimiento,
    requiereRevision: tarea.requiereRevision !== false,
    fechaInicio: textoSeguro(tarea.fechaInicio),
    fechaLimite: textoSeguro(tarea.fechaLimite),
    tiempoEstimadoMinutos: Math.max(
      0,
      numeroSeguro(tarea.tiempoEstimadoMinutos)
    ),
    prioridad: ["baja", "normal", "alta"].includes(tarea.prioridad)
      ? tarea.prioridad
      : "normal",
    visibleParaAlumno: tarea.visibleParaAlumno !== false,
    ordenMision: Math.max(0, numeroSeguro(tarea.ordenMision, 9999)),
    estado: normalizarEstadoTarea(tarea.estado),
    presentacionAlumno: {
      tituloMision: textoSeguro(
        tarea.presentacionAlumno?.tituloMision ??
        tarea.titulo ??
        "Nueva misión"
      ),
      descripcionMision: textoSeguro(
        tarea.presentacionAlumno?.descripcionMision ??
        tarea.descripcion ??
        ""
      ),
      mensaje: textoSeguro(tarea.presentacionAlumno?.mensaje),
      icono: textoSeguro(tarea.presentacionAlumno?.icono) || "🌟"
    },
    progreso,
    evidencia:
      tarea.evidencia && typeof tarea.evidencia === "object"
        ? tarea.evidencia
        : {
            tipo: null,
            modulo: null,
            referenciaId: null,
            resumen: null
          },
    resultado: {
      fechaFinalizacion: textoSeguro(tarea.resultado?.fechaFinalizacion),
      observaciones: textoSeguro(tarea.resultado?.observaciones),
      masDeLoEsperado: Boolean(tarea.resultado?.masDeLoEsperado),
      necesitoAyuda: Boolean(tarea.resultado?.necesitoAyuda),
      convieneRepetir: Boolean(tarea.resultado?.convieneRepetir)
    },
    observacionActual: textoSeguro(tarea.observacionActual),
    historialObservaciones: Array.isArray(tarea.historialObservaciones)
      ? tarea.historialObservaciones
      : []
  };

  if (parcial) {
    return Object.fromEntries(
      Object.entries(resultado).filter(([, valor]) => valor !== undefined)
    );
  }

  return resultado;
}

function normalizarTareaLeida(documento) {
  const datos = documento.data();
  const criterioCumplimiento = normalizarCriterioCumplimiento(
    datos.criterioCumplimiento || {}
  );

  /*
   * Compatibilidad con misiones de Creciendo por Dentro creadas antes
   * de que el módulo fuese reconocido por normalizarTarea().
   */
  const modulo =
    datos.modulo === "libre" &&
    criterioCumplimiento.modulo === "creciendo-por-dentro"
      ? "creciendo-por-dentro"
      : datos.modulo;

  return {
    id: documento.id,
    ...datos,
    modulo,
    estado: normalizarEstadoTarea(datos.estado),
    criterioCumplimiento,
    progreso: normalizarProgresoTarea(
      datos.progreso,
      criterioCumplimiento
    )
  };
}

async function crearTarea(tarea) {
  const userId = await obtenerUIDPersonaActiva();
  const datos = normalizarTarea(tarea, { alumnoUserId: userId });

  const actorUserId = obtenerUID();
  const referencia = await addDoc(coleccionTareas(userId), {
    ...datos,
    createdAt: serverTimestamp(),
    createdBy: actorUserId,
    updatedAt: serverTimestamp(),
    updatedBy: actorUserId,
    statusChangedAt: serverTimestamp(),
    statusChangedBy: actorUserId
  });

  return referencia.id;
}

async function obtenerTarea(id) {
  const userId = await obtenerUIDPersonaActiva();
  const resultado = await getDoc(documentoTarea(id, userId));
  return resultado.exists() ? normalizarTareaLeida(resultado) : null;
}

function valorFechaOrdenTarea(tarea = {}) {
  const valor =
    tarea.updatedAt ??
    tarea.actualizadaEn ??
    tarea.createdAt ??
    tarea.creadaEn ??
    null;

  if (!valor) return 0;
  if (typeof valor.toMillis === "function") return valor.toMillis();
  if (valor instanceof Date) return valor.getTime();

  const timestamp = Date.parse(valor);
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function ordenarTareasPorActualizacion(tareas = []) {
  return [...tareas].sort(
    (a, b) => valorFechaOrdenTarea(b) - valorFechaOrdenTarea(a)
  );
}

async function leerTareas() {
  const userId = await obtenerUIDPersonaActiva();

  // Compatibilidad: Firestore excluye de un orderBy los documentos que no
  // contienen el campo ordenado. Se lee la colección completa para conservar
  // misiones legacy sin updatedAt y se ordena en cliente usando la mejor fecha
  // disponible, sin inventar metadatos ausentes.
  const resultado = await getDocs(coleccionTareas(userId));
  return ordenarTareasPorActualizacion(
    resultado.docs.map(normalizarTareaLeida)
  );
}

function observarTareas(callback, onError = console.error) {
  if (typeof callback !== "function") {
    throw new Error("Se necesita una función callback.");
  }

  let cancelarSnapshot = null;
  let cancelado = false;

  (async () => {
    try {
      const userId = await obtenerUIDPersonaActiva();
      if (cancelado) return;

      cancelarSnapshot = onSnapshot(
        coleccionTareas(userId),
        (resultado) =>
          callback(
            ordenarTareasPorActualizacion(
              resultado.docs.map(normalizarTareaLeida)
            )
          ),
        onError
      );
    } catch (error) {
      onError(error);
    }
  })();

  return () => {
    cancelado = true;
    if (typeof cancelarSnapshot === "function") cancelarSnapshot();
  };
}

async function actualizarTarea(id, cambios = {}) {
  const permitidos = new Set([
    "alumnoId",
    "assignedBy",
    "titulo",
    "descripcion",
    "tipo",
    "modulo",
    "destinoUrl",
    "objetivo",
    "criterioFinalizacion",
    "criterioCumplimiento",
    "requiereRevision",
    "fechaInicio",
    "fechaLimite",
    "tiempoEstimadoMinutos",
    "prioridad",
    "estado",
    "visibleParaAlumno",
    "ordenMision",
    "presentacionAlumno",
    "progreso",
    "evidencia",
    "resultado",
    "observacionActual",
    "historialObservaciones"
  ]);

  const datos = {};

  Object.entries(cambios).forEach(([clave, valor]) => {
    if (permitidos.has(clave) && valor !== undefined) {
      datos[clave] = valor;
    }
  });

  if ("titulo" in datos) {
    datos.titulo = textoSeguro(datos.titulo);
    if (!datos.titulo) throw new Error("La tarea debe tener un título.");
  }

  ["descripcion", "objetivo", "criterioFinalizacion", "destinoUrl"].forEach(
    clave => {
      if (clave in datos) datos[clave] = textoSeguro(datos[clave]);
    }
  );

  if ("estado" in datos) {
    datos.estado = normalizarEstadoTarea(datos.estado);
  }

  if ("visibleParaAlumno" in datos) {
    datos.visibleParaAlumno = datos.visibleParaAlumno !== false;
  }

  if ("requiereRevision" in datos) {
    datos.requiereRevision = datos.requiereRevision !== false;
  }

  if ("tiempoEstimadoMinutos" in datos) {
    datos.tiempoEstimadoMinutos = Math.max(
      0,
      numeroSeguro(datos.tiempoEstimadoMinutos)
    );
  }

  if ("ordenMision" in datos) {
    datos.ordenMision = Math.max(0, numeroSeguro(datos.ordenMision, 9999));
  }

  const userId = await obtenerUIDPersonaActiva();
  const actorUserId = obtenerUID();
  const referencia = documentoTarea(id, userId);
  let datosExistentes = null;

  if ("estado" in datos || "progreso" in datos) {
    const existente = await getDoc(referencia);
    if (!existente.exists()) {
      throw new Error("No se encontró la tarea.");
    }
    datosExistentes = existente.data();
  }

  if ("criterioCumplimiento" in datos) {
    datos.criterioCumplimiento = normalizarCriterioCumplimiento(
      datos.criterioCumplimiento
    );
  }

  if ("progreso" in datos) {
    const progresoActual = normalizarProgresoTarea(
      datosExistentes?.progreso,
      datosExistentes?.criterioCumplimiento || {}
    );
    datos.progreso = normalizarProgresoTarea(
      { ...progresoActual, ...datos.progreso },
      datos.criterioCumplimiento ||
        datosExistentes?.criterioCumplimiento ||
        {}
    );
  }

  if ("resultado" in datos) {
    const resultado = datos.resultado || {};
    datos.resultado = {
      fechaFinalizacion: textoSeguro(resultado.fechaFinalizacion),
      observaciones: textoSeguro(resultado.observaciones),
      masDeLoEsperado: Boolean(resultado.masDeLoEsperado),
      necesitoAyuda: Boolean(resultado.necesitoAyuda),
      convieneRepetir: Boolean(resultado.convieneRepetir)
    };
  }

  if ("presentacionAlumno" in datos) {
    const presentacion = datos.presentacionAlumno || {};
    datos.presentacionAlumno = {
      icono: textoSeguro(presentacion.icono) || "🌟",
      tituloMision: textoSeguro(
        presentacion.tituloMision ?? datos.titulo ?? "Nueva misión"
      ),
      descripcionMision: textoSeguro(
        presentacion.descripcionMision ?? datos.descripcion ?? ""
      ),
      mensaje: textoSeguro(presentacion.mensaje)
    };
  }

  const cambiosAuditoria = {
    updatedAt: serverTimestamp(),
    updatedBy: actorUserId
  };

  if ("estado" in datos) {
    const estadoAnterior = normalizarEstadoTarea(datosExistentes?.estado);
    if (datos.estado !== estadoAnterior) {
      cambiosAuditoria.statusChangedAt = serverTimestamp();
      cambiosAuditoria.statusChangedBy = actorUserId;
    }
  }

  await updateDoc(referencia, {
    ...datos,
    ...cambiosAuditoria
  });
}

async function cambiarEstadoTarea(id, estado, datosExtra = {}) {
  const estadoNormalizado = normalizarEstadoTarea(estado, "");

  if (!estadoNormalizado) {
    throw new Error("El estado indicado no es válido.");
  }

  const userId = await obtenerUIDPersonaActiva();
  const actorUserId = obtenerUID();
  const referencia = documentoTarea(id, userId);
  const existente = await getDoc(referencia);

  if (!existente.exists()) {
    throw new Error("No se encontró la tarea.");
  }

  const tareaActual = existente.data();
  const estadoAnterior = normalizarEstadoTarea(tareaActual.estado);
  const progresoActual = normalizarProgresoTarea(
    tareaActual.progreso,
    tareaActual.criterioCumplimiento || {}
  );

  const cambios = {
    estado: estadoNormalizado,
    updatedAt: serverTimestamp(),
    updatedBy: actorUserId
  };

  if (estadoNormalizado !== estadoAnterior) {
    cambios.statusChangedAt = serverTimestamp();
    cambios.statusChangedBy = actorUserId;
  }

  if (estadoNormalizado === "en_curso" && !progresoActual.iniciadaEn) {
    cambios["progreso.iniciadaEn"] = serverTimestamp();
  }

  if (
    (estadoNormalizado === "completada" ||
      estadoNormalizado === "pendiente_validacion") &&
    !progresoActual.completadaEn
  ) {
    cambios["progreso.completadaEn"] = serverTimestamp();
  }

  Object.entries(datosExtra).forEach(([clave, valor]) => {
    cambios[clave] = valor;
  });

  await updateDoc(referencia, cambios);
}

function normalizarEvidencia(evidencia = {}, { alumnoUserId = "" } = {}) {
  const misionId = textoSeguro(evidencia.misionId || evidencia.tareaId);
  const modulo = textoSeguro(evidencia.modulo);
  const tipo = textoSeguro(evidencia.tipo);
  const actividadId = textoSeguro(evidencia.actividadId);
  const sesionId = textoSeguro(evidencia.sesionId);

  if (!misionId || !modulo || !tipo || !actividadId) {
    throw new Error(
      "La evidencia debe indicar misión, módulo, tipo y actividad."
    );
  }

  const uidAlumno = textoSeguro(alumnoUserId) || obtenerUID();

  return {
    alumnoId: textoSeguro(evidencia.alumnoId) || uidAlumno,
    misionId,
    modulo,
    tipo,
    actividadId,
    sesionId: sesionId || null,
    atributos:
      evidencia.atributos && typeof evidencia.atributos === "object"
        ? evidencia.atributos
        : {},
    resultado:
      evidencia.resultado && typeof evidencia.resultado === "object"
        ? evidencia.resultado
        : {},
    destinoRevision: textoSeguro(evidencia.destinoRevision),
    origen: textoSeguro(evidencia.origen) || "mision",
    creadaPorUid: textoSeguro(evidencia.creadaPorUid) || obtenerUID()
  };
}

function crearIdEvidencia(evidencia) {
  const base = [
    evidencia.misionId,
    evidencia.modulo,
    evidencia.sesionId || evidencia.actividadId
  ]
    .join("__")
    .replace(/[^a-zA-Z0-9_-]/g, "_");

  return base.slice(0, 240);
}

function incumplimientosEvidenciaCriterio(evidencia, criterio) {
  const incumplimientos = [];

  if (criterio.modulo && evidencia.modulo !== criterio.modulo) {
    incumplimientos.push(
      `módulo requerido: ${criterio.modulo}; recibido: ${evidencia.modulo || "sin dato"}`
    );
  }

  if (criterio.evidenciaTipo && evidencia.tipo !== criterio.evidenciaTipo) {
    incumplimientos.push(
      `tipo de evidencia requerido: ${criterio.evidenciaTipo}; recibido: ${evidencia.tipo || "sin dato"}`
    );
  }

  Object.entries(criterio.filtros || {}).forEach(([clave, valorEsperado]) => {
    const valorRecibido = evidencia.atributos?.[clave];
    if (String(valorRecibido ?? "") !== String(valorEsperado)) {
      incumplimientos.push(
        `${clave} requerido: ${valorEsperado}; recibido: ${valorRecibido ?? "sin dato"}`
      );
    }
  });

  return incumplimientos;
}

function evidenciaCumpleCriterio(evidencia, criterio) {
  return incumplimientosEvidenciaCriterio(evidencia, criterio).length === 0;
}

async function registrarEvidenciaMision(evidenciaEntrada) {
  const userId = await obtenerUIDPersonaActiva();
  const actorUserId = obtenerUID();
  const evidencia = normalizarEvidencia(
    evidenciaEntrada,
    { alumnoUserId: userId }
  );
  const evidenciaId = crearIdEvidencia(evidencia);
  const tareaRef = documentoTarea(evidencia.misionId, userId);
  const evidenciaRef = documentoEvidencia(evidenciaId, userId);

  const resultado = await runTransaction(db, async transaction => {
    const [tareaSnapshot, evidenciaSnapshot] = await Promise.all([
      transaction.get(tareaRef),
      transaction.get(evidenciaRef)
    ]);

    if (!tareaSnapshot.exists()) {
      throw new Error("No se encontró la misión relacionada.");
    }

    if (evidenciaSnapshot.exists()) {
      const tarea = tareaSnapshot.data();
      const progreso = normalizarProgresoTarea(
        tarea.progreso,
        tarea.criterioCumplimiento || {}
      );

      return {
        evidenciaId,
        duplicada: true,
        aplicada: true,
        cantidadActual: progreso.cantidadActual,
        cantidadObjetivo: progreso.cantidadObjetivo,
        estado: normalizarEstadoTarea(tarea.estado),
        objetivoAlcanzado:
          progreso.cantidadObjetivo > 0 &&
          progreso.cantidadActual >= progreso.cantidadObjetivo
      };
    }

    const tarea = tareaSnapshot.data();
    const alumnoId = textoSeguro(tarea.alumnoId) || userId;

    if (alumnoId !== evidencia.alumnoId) {
      throw new Error("La evidencia no pertenece al alumno de la misión.");
    }

    const estadoActual = normalizarEstadoTarea(tarea.estado);
    const estadosActivos = new Set([
      "pendiente",
      "asignada",
      "en_curso",
      "necesita_ayuda"
    ]);

    if (!estadosActivos.has(estadoActual)) {
      throw new Error("La misión no está activa para recibir evidencias.");
    }

    const criterio = normalizarCriterioCumplimiento(
      tarea.criterioCumplimiento || {}
    );

    if (!evidenciaCumpleCriterio(evidencia, criterio)) {
      const detalles = incumplimientosEvidenciaCriterio(evidencia, criterio);
      throw new Error(
        "La actividad no cumple el criterio de esta misión. " +
        detalles.join(" · ")
      );
    }

    const progresoActual = normalizarProgresoTarea(
      tarea.progreso,
      criterio
    );
    const evidenciaIds = [...progresoActual.evidenciaIds, evidenciaId];
    const cantidadActual = Math.min(
      criterio.cantidadObjetivo,
      progresoActual.cantidadActual + 1
    );
    const objetivoAlcanzado = cantidadActual >= criterio.cantidadObjetivo;
    const requiereRevision = tarea.requiereRevision !== false;
    const nuevoEstado = objetivoAlcanzado
      ? requiereRevision
        ? "pendiente_validacion"
        : "completada"
      : "en_curso";

    transaction.set(evidenciaRef, {
      ...evidencia,
      evidenciaId,
      contabilizada: true,
      aplicadaEn: serverTimestamp(),
      ocurridaEn: evidenciaEntrada.ocurridaEn || serverTimestamp(),
      creadaEn: serverTimestamp()
    });

    const cambiosTarea = {
      estado: nuevoEstado,
      "progreso.cantidadActual": cantidadActual,
      "progreso.cantidadObjetivo": criterio.cantidadObjetivo,
      "progreso.evidenciaIds": evidenciaIds,
      updatedAt: serverTimestamp(),
      updatedBy: actorUserId
    };

    if (nuevoEstado !== estadoActual) {
      cambiosTarea.statusChangedAt = serverTimestamp();
      cambiosTarea.statusChangedBy = actorUserId;
    }

    if (!progresoActual.iniciadaEn) {
      cambiosTarea["progreso.iniciadaEn"] = serverTimestamp();
    }

    if (objetivoAlcanzado) {
      cambiosTarea["progreso.completadaEn"] = serverTimestamp();
    }

    transaction.update(tareaRef, cambiosTarea);

    return {
      evidenciaId,
      duplicada: false,
      aplicada: true,
      cantidadActual,
      cantidadObjetivo: criterio.cantidadObjetivo,
      objetivoAlcanzado,
      estado: nuevoEstado
    };
  });

  // Refuerzo de consistencia RC3.
  if (resultado.objetivoAlcanzado) {
    await updateDoc(tareaRef, {
      estado: resultado.estado,
      "progreso.cantidadActual": resultado.cantidadActual,
      "progreso.cantidadObjetivo": resultado.cantidadObjetivo,
      "progreso.completadaEn": serverTimestamp(),
      updatedAt: serverTimestamp(),
      updatedBy: actorUserId
    });
  }

  return resultado;
}
async function leerEvidenciasMision(misionId) {
  const id = textoSeguro(misionId);
  if (!id) throw new Error("Falta el identificador de la misión.");

  const userId = await obtenerUIDPersonaActiva();
  const resultado = await getDocs(
    query(coleccionEvidencias(userId), where("misionId", "==", id))
  );

  return resultado.docs
    .map(documento => ({ id: documento.id, ...documento.data() }))
    .sort((a, b) => {
      const fechaA = a.ocurridaEn?.toMillis?.() || 0;
      const fechaB = b.ocurridaEn?.toMillis?.() || 0;
      return fechaB - fechaA;
    });
}

async function guardarObservacionTarea(id, texto) {
  const observacion = textoSeguro(texto);
  const userId = await obtenerUIDPersonaActiva();
  const referencia = documentoTarea(id, userId);
  const existente = await getDoc(referencia);

  if (!existente.exists()) {
    throw new Error("No se encontró la tarea.");
  }

  const datos = existente.data();
  const historial = Array.isArray(datos.historialObservaciones)
    ? datos.historialObservaciones
    : [];
  const actual = textoSeguro(datos.observacionActual);

  const nuevoHistorial =
    observacion && observacion !== actual
      ? [
          ...historial,
          {
            texto: observacion,
            fecha: new Date().toISOString(),
            autor: "Familia"
          }
        ]
      : historial;

  await updateDoc(referencia, {
    observacionActual: observacion,
    historialObservaciones: nuevoHistorial,
    updatedAt: serverTimestamp(),
    updatedBy: obtenerUID()
  });
}

async function eliminarTarea(id) {
  const userId = await obtenerUIDPersonaActiva();
  await deleteDoc(documentoTarea(id, userId));
}



/* ==========================================================
   Administración de Usuarios · v0.3 gratuita · Auditoría Fase A

   Firebase Authentication se crea manualmente en Firebase Console.
   Desde la Academia se mantiene de forma atómica:
   - usuarios/{uid}
   - personas/{personaId}
   - usuarioRoles/{uid}
   - accesosLogin/{login}
   - personaRelaciones/{sourcePersonId__targetPersonId}
   ========================================================== */

function textoAdmin(valor, alternativo = "") {
  const normalizado = String(valor ?? "").trim();
  return normalizado || alternativo;
}

function normalizarLoginAdmin(valor) {
  return textoAdmin(valor).toLowerCase();
}

async function siguientePersonaIdAdministracion() {
  const personas = await leerColeccionAdmin("personas");
  let maximo = 0;

  for (const persona of personas) {
    const coincidencia = /^per_(\d{3,})$/i.exec(String(persona.id || "").trim());
    if (!coincidencia) continue;
    maximo = Math.max(maximo, Number(coincidencia[1]));
  }

  return `per_${String(maximo + 1).padStart(3, "0")}`;
}

function fechaNacimientoAdministracion(valor) {
  const texto = textoAdmin(valor);
  if (!texto) return null;

  const fecha = new Date(`${texto}T12:00:00`);
  if (Number.isNaN(fecha.getTime())) {
    throw new Error("La fecha de nacimiento no es válida.");
  }

  return Timestamp.fromDate(fecha);
}

async function exigirAdministrador() {
  const { ContextoUsuario } = await import("../js/contexto-usuario.js");

  if (!(await ContextoUsuario.esAdministrador())) {
    throw new Error("Esta operación requiere nivel de administración.");
  }

  return ContextoUsuario.inicializar();
}

async function leerColeccionAdmin(nombre) {
  const resultado = await getDocs(collection(db, nombre));
  return resultado.docs.map(documento => ({
    id: documento.id,
    ...documento.data()
  }));
}

async function listarUsuariosAdministracion() {
  await exigirAdministrador();

  const [usuarios, personas, roles, usuarioRoles, accesosLogin, relaciones] =
    await Promise.all([
      leerColeccionAdmin("usuarios"),
      leerColeccionAdmin("personas"),
      leerColeccionAdmin("roles"),
      leerColeccionAdmin("usuarioRoles"),
      leerColeccionAdmin("accesosLogin"),
      leerColeccionAdmin("personaRelaciones")
    ]);

  const personasPorId = new Map(personas.map(persona => [persona.id, persona]));
  const rolesPorId = new Map(roles.map(rol => [rol.id, rol]));
  const asignacionesPorUsuario = new Map(
    usuarioRoles.map(asignacion => [asignacion.userId || asignacion.id, asignacion])
  );
  const accesosPorUsuario = new Map(
    accesosLogin.map(acceso => [acceso.userId, acceso])
  );

  return usuarios.map(usuario => {
    const userId = usuario.id;
    const persona = personasPorId.get(usuario.personaId) || null;
    const asignacion = asignacionesPorUsuario.get(userId) || null;
    const rol = asignacion ? rolesPorId.get(asignacion.roleId) || null : null;
    const acceso = accesosPorUsuario.get(userId) || null;
    const relacionesUsuario = relaciones.filter(
      relacion => relacion.sourcePersonId === usuario.personaId
    );

    const incidencias = [];
    if (!usuario.personaId) incidencias.push("USER sin personaId");
    else if (!persona) incidencias.push("PERSON inexistente");
    if (!asignacion) incidencias.push("USER_ROLE inexistente");
    else if (!rol) incidencias.push("ROLE inexistente");
    else if (rol.activo === false) incidencias.push("ROLE inactivo");
    if (!usuario.login) incidencias.push("USER sin login");
    if (!acceso) incidencias.push("accesosLogin inexistente");
    else {
      if (acceso.userId !== userId) incidencias.push("accesosLogin con UID distinto");
      if (normalizarLoginAdmin(acceso.id) !== normalizarLoginAdmin(usuario.login)) {
        incidencias.push("login USER/accesosLogin no coincide");
      }
    }

    return {
      ...usuario,
      userId,
      persona,
      asignacion,
      rol,
      acceso,
      relaciones: relacionesUsuario,
      incidencias
    };
  }).sort((a, b) => {
    const nombreA = textoAdmin(a.persona?.nombreVisible, a.persona?.nombre || a.login);
    const nombreB = textoAdmin(b.persona?.nombreVisible, b.persona?.nombre || b.login);
    return nombreA.localeCompare(nombreB, "es");
  });
}

async function leerCatalogosAdministracion() {
  await exigirAdministrador();

  const [personas, roles] = await Promise.all([
    leerColeccionAdmin("personas"),
    leerColeccionAdmin("roles")
  ]);

  return {
    personas: personas
      .filter(persona => persona.activo !== false)
      .sort((a, b) => textoAdmin(a.nombreVisible, a.nombre)
        .localeCompare(textoAdmin(b.nombreVisible, b.nombre), "es")),
    roles: roles
      .filter(rol => rol.activo !== false)
      .sort((a, b) => textoAdmin(a.nombre, a.id)
        .localeCompare(textoAdmin(b.nombre, b.id), "es"))
  };
}

function validarDatosUsuarioAdministracion(datos = {}, creando = false) {
  const userId = textoAdmin(datos.userId);
  const login = normalizarLoginAdmin(datos.login);
  const authEmail = textoAdmin(datos.authEmail).toLowerCase();
  const nombre = textoAdmin(datos.nombre);
  const roleId = textoAdmin(datos.roleId);

  if (!userId) throw new Error("Falta el UID de Firebase Authentication.");
  if (!login) throw new Error("El login funcional es obligatorio.");
  if (!authEmail || !authEmail.includes("@")) {
    throw new Error("El correo de Firebase Authentication no es válido.");
  }
  if (!nombre) throw new Error("El nombre de la Persona es obligatorio.");
  if (!roleId) throw new Error("Debe seleccionar un Rol.");

  if (creando && userId === auth.currentUser?.uid) {
    // Es válido crear/completar al propio administrador, pero se deja explícito.
    console.debug("[Administración] Se está completando el usuario administrador actual.");
  }

  return {
    userId,
    login,
    authEmail,
    nombre,
    apellidos: textoAdmin(datos.apellidos),
    nombreVisible: textoAdmin(datos.nombreVisible, nombre),
    email: textoAdmin(datos.email).toLowerCase(),
    avatar: textoAdmin(datos.avatar),
    fechaNacimiento: fechaNacimientoAdministracion(datos.fechaNacimiento),
    idioma: textoAdmin(datos.idioma),
    zonaHoraria: textoAdmin(datos.zonaHoraria),
    colegio: textoAdmin(datos.colegio),
    curso: textoAdmin(datos.curso),
    cursoEscolar: textoAdmin(datos.cursoEscolar),
    roleId,
    activo: datos.activo !== false,
    personaId: textoAdmin(datos.personaId),
    relationIdAnterior: textoAdmin(datos.relationIdAnterior),
    targetPersonId: textoAdmin(datos.targetPersonId),
    tipoRelacion: textoAdmin(datos.tipoRelacion),
    nivelRelacion: ["consulta", "gestion"].includes(textoAdmin(datos.nivelRelacion))
      ? textoAdmin(datos.nivelRelacion)
      : "consulta"
  };
}

async function guardarUsuarioAdministracion(datos = {}) {
  const contexto = await exigirAdministrador();
  const entrada = validarDatosUsuarioAdministracion(datos, !textoAdmin(datos.personaId));
  const adminUid = contexto.usuario.userId;

  const userRef = doc(db, "usuarios", entrada.userId);
  const accesoRef = doc(db, "accesosLogin", entrada.login);
  const roleRef = doc(db, "roles", entrada.roleId);

  // Convención vigente documentada: per_001, per_002, per_003...
  // Se toma el mayor ID utilizado y se propone el siguiente.
  // La transacción verifica que no exista antes de escribir.
  const personaId = entrada.personaId || await siguientePersonaIdAdministracion();
  const personRef = doc(db, "personas", personaId);
  const userRoleRef = doc(db, "usuarioRoles", entrada.userId);

  const resultado = await runTransaction(db, async transaction => {
    // Todas las lecturas se realizan antes de cualquier escritura.
    const userSnap = await transaction.get(userRef);
    const accesoSnap = await transaction.get(accesoRef);
    const roleSnap = await transaction.get(roleRef);
    const personSnap = await transaction.get(personRef);
    const userRoleSnap = await transaction.get(userRoleRef);

    if (!roleSnap.exists() || roleSnap.data().activo === false) {
      throw new Error("El Rol seleccionado no existe o está inactivo.");
    }

    const creando = !userSnap.exists();

    if (!creando && entrada.personaId && userSnap.data().personaId !== entrada.personaId) {
      throw new Error("El personaId del Usuario no coincide con la Persona editada.");
    }

    if (creando && personSnap.exists()) {
      throw new Error("El identificador interno de Persona ya existe. Reintente el alta.");
    }

    if (accesoSnap.exists() && accesoSnap.data().userId !== entrada.userId) {
      throw new Error("El login funcional ya está asignado a otro Usuario.");
    }

    const loginAnterior = normalizarLoginAdmin(userSnap.data()?.login);
    let accesoAnteriorRef = null;
    let accesoAnteriorSnap = null;

    if (loginAnterior && loginAnterior !== entrada.login) {
      accesoAnteriorRef = doc(db, "accesosLogin", loginAnterior);
      accesoAnteriorSnap = await transaction.get(accesoAnteriorRef);
    }

    let targetSnap = null;
    if (entrada.targetPersonId) {
      if (entrada.targetPersonId === personaId) {
        throw new Error("Una Persona no puede relacionarse consigo misma.");
      }
      targetSnap = await transaction.get(
        doc(db, "personas", entrada.targetPersonId)
      );
      if (!targetSnap.exists()) {
        throw new Error("La Persona destino indicada no existe.");
      }
    }

    const relationIdNuevo = entrada.targetPersonId
      ? `${personaId}__${entrada.targetPersonId}`
      : "";

    let relationNuevoRef = null;
    let relationNuevoSnap = null;

    if (relationIdNuevo) {
      relationNuevoRef = doc(db, "personaRelaciones", relationIdNuevo);
      relationNuevoSnap = await transaction.get(relationNuevoRef);
    }

    const personaCambios = {
      nombre: entrada.nombre,
      apellidos: entrada.apellidos,
      nombreVisible: entrada.nombreVisible,
      activo: entrada.activo
    };

    // PERSON se actualiza con merge para conservar atributos existentes
    // que esta pantalla todavía no administra.
    if (entrada.email) personaCambios.email = entrada.email;
    if (entrada.avatar) personaCambios.avatar = entrada.avatar;
    if (entrada.fechaNacimiento) personaCambios.fechaNacimiento = entrada.fechaNacimiento;
    if (entrada.idioma) personaCambios.idioma = entrada.idioma;
    if (entrada.zonaHoraria) personaCambios.zonaHoraria = entrada.zonaHoraria;
    if (entrada.colegio) personaCambios.colegio = entrada.colegio;
    if (entrada.curso) personaCambios.curso = entrada.curso;
    if (entrada.cursoEscolar) personaCambios.cursoEscolar = entrada.cursoEscolar;

    if (!personSnap.exists()) {
      personaCambios.createdAt = serverTimestamp();
      personaCambios.createdBy = adminUid;
    }
    personaCambios.updatedAt = serverTimestamp();
    personaCambios.updatedBy = adminUid;

    transaction.set(personRef, personaCambios, { merge: true });

    // USER vigente: exactamente activo, personaId, login y fechaAlta.
    // Se reemplaza el documento raíz para retirar campos ajenos al esquema
    // sin afectar sus subcolecciones.
    transaction.set(userRef, {
      activo: entrada.activo,
      personaId,
      login: entrada.login,
      fechaAlta: creando
        ? serverTimestamp()
        : (userSnap.data()?.fechaAlta || serverTimestamp())
    });

    const userRoleDatos = {
      userId: entrada.userId,
      roleId: entrada.roleId,
      activo: entrada.activo,
      updatedAt: serverTimestamp(),
      updatedBy: adminUid
    };
    if (!userRoleSnap.exists()) {
      userRoleDatos.createdAt = serverTimestamp();
      userRoleDatos.createdBy = adminUid;
    }
    transaction.set(userRoleRef, userRoleDatos, { merge: true });

    const accesoCreacionFuente = accesoSnap.exists()
      ? accesoSnap.data()
      : (accesoAnteriorSnap?.exists() ? accesoAnteriorSnap.data() : null);

    const accesoDatos = {
      userId: entrada.userId,
      authEmail: entrada.authEmail,
      activo: entrada.activo,
      updatedAt: serverTimestamp(),
      updatedBy: adminUid
    };

    if (accesoCreacionFuente?.createdAt) {
      accesoDatos.createdAt = accesoCreacionFuente.createdAt;
    } else {
      accesoDatos.createdAt = serverTimestamp();
    }

    if (accesoCreacionFuente?.createdBy) {
      accesoDatos.createdBy = accesoCreacionFuente.createdBy;
    } else {
      accesoDatos.createdBy = adminUid;
    }

    transaction.set(accesoRef, accesoDatos, { merge: true });

    if (accesoAnteriorRef && accesoAnteriorSnap?.exists()) {
      transaction.delete(accesoAnteriorRef);
    }

    if (
      entrada.relationIdAnterior &&
      entrada.relationIdAnterior !== relationIdNuevo
    ) {
      transaction.delete(
        doc(db, "personaRelaciones", entrada.relationIdAnterior)
      );
    }

    if (relationIdNuevo && relationNuevoRef) {
      const relacionDatos = {
        sourcePersonId: personaId,
        targetPersonId: entrada.targetPersonId,
        tipoRelacion: entrada.tipoRelacion || "autorizado",
        nivelAcceso: entrada.nivelRelacion,
        activo: entrada.activo,
        updatedAt: serverTimestamp(),
        updatedBy: adminUid
      };

      if (!relationNuevoSnap?.exists()) {
        relacionDatos.createdAt = serverTimestamp();
        relacionDatos.createdBy = adminUid;
      }

      transaction.set(relationNuevoRef, relacionDatos, { merge: true });
    }

    return { userId: entrada.userId, personaId, creando };
  });

  return resultado;
}


/**
 * API actual, compatible con la prueba existente.
 */
export const AcademiaDB = Object.freeze({
  guardarEvento,
  leerEventos,
  observarEventos,
  actualizarEvento,
  eliminarEvento
});

/**
 * API pública preparada para crecer por módulos.
 */
export const Academia = Object.freeze({
  usuario: Object.freeze({
    leerPerfil: leerPerfilUsuario
  }),

  eventos: Object.freeze({
    guardar: guardarEvento,
    leer: leerEventos,
    observar: observarEventos,
    actualizar: actualizarEvento,
    eliminar: eliminarEvento
  }),

  biblioteca: Object.freeze({
    guardar: guardarLibro,
    leer: leerLibros,
    observar: observarLibros,
    actualizar: actualizarLibro,
    eliminar: eliminarLibro,
    audio: Object.freeze({
      guardar: guardarAudioLibro,
      leer: leerAudioLibro,
      eliminar: eliminarAudioLibro
    })
  }),

  rinconLectura: Object.freeze({
    guardarSesion: guardarSesionLectura,
    leerSesiones: leerSesionesLectura,
    actualizarObservacion: actualizarObservacionSesionLectura,
    eliminarSesion: eliminarSesionLectura
  }),

  semillas: Object.freeze({
    guardarSesion: guardarSesionSemilla,
    leerSesiones: leerSesionesSemillas
  }),

  tareas: Object.freeze({
    crear: crearTarea,
    obtener: obtenerTarea,
    leer: leerTareas,
    observar: observarTareas,
    actualizar: actualizarTarea,
    cambiarEstado: cambiarEstadoTarea,
    registrarEvidencia: registrarEvidenciaMision,
    leerEvidencias: leerEvidenciasMision,
    guardarObservacion: guardarObservacionTarea,
    eliminar: eliminarTarea
  }),

  evidencias: Object.freeze({
    registrarParaMision: registrarEvidenciaMision,
    leerPorMision: leerEvidenciasMision
  }),

  administracion: Object.freeze({
    usuarios: Object.freeze({
      listar: listarUsuariosAdministracion,
      catalogos: leerCatalogosAdministracion,
      guardar: guardarUsuarioAdministracion
    })
  })
});
