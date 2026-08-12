/* ==========================================================
   Academia de Gloria Valentina
   academia.js
   API pública de acceso a datos
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


/**
 * Referencia a la colección:
 * usuarios/gloria/eventos
 */
function coleccionEventos() {
  return collection(
    db,
    "usuarios",
    obtenerUID(),
    "eventos"
  );
}

/**
 * Referencia a un evento concreto.
 */
function documentoEvento(id) {
  if (!id) {
    throw new Error("Falta el identificador del evento.");
  }

  return doc(
    db,
    "usuarios",
    obtenerUID(),
    "eventos",
    id
  );
}

/**
 * Crea un evento nuevo.
 */
async function guardarEvento(evento) {
  const datos = crearEvento(evento);

  const referencia = await addDoc(
    coleccionEventos(),
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

  const consulta = query(
    coleccionEventos(),
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

  const consulta = query(
    coleccionEventos(),
    where("anio", "==", anioNormalizado),
    orderBy("fecha", "asc")
  );

  return onSnapshot(
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
}

/**
 * Actualiza un evento existente.
 */
async function actualizarEvento(id, cambios) {
  const datos = crearEvento(cambios);

  await updateDoc(
    documentoEvento(id),
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
  await deleteDoc(documentoEvento(id));
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

function coleccionSesionesLectura() {
  return collection(
    db,
    "usuarios",
    obtenerUID(),
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
  const referencia = doc(
    db,
    "usuarios",
    obtenerUID(),
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
  const consulta = query(
    coleccionSesionesLectura(),
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
  const referencia = doc(
    db,
    "usuarios",
    obtenerUID(),
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

  await deleteDoc(
    doc(
      db,
      "usuarios",
      obtenerUID(),
      "sesionesLectura",
      historiaId
    )
  );
}



/* ==========================================================
   Creciendo por Dentro · Sesiones de Semillas
   usuarios/{uid}/sesionesSemillas/{sesionId}
   ========================================================== */

function coleccionSesionesSemillas() {
  return collection(
    db,
    "usuarios",
    obtenerUID(),
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

  /*
   * Cada práctica se conserva como una sesión independiente.
   * Así una misma Semilla puede repetirse sin sobrescribir el historial.
   */
  const referencia = await addDoc(
    coleccionSesionesSemillas(),
    {
      ...datos,
      creadaEn: serverTimestamp(),
      actualizadaEn: serverTimestamp()
    }
  );

  return referencia.id;
}

async function leerSesionesSemillas() {
  const consulta = query(
    coleccionSesionesSemillas(),
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

function coleccionTareas() {
  return collection(db, "usuarios", obtenerUID(), "tareas");
}

function documentoTarea(id) {
  const tareaId = textoSeguro(id);

  if (!tareaId) {
    throw new Error("Falta el identificador de la tarea.");
  }

  return doc(db, "usuarios", obtenerUID(), "tareas", tareaId);
}

function coleccionEvidencias() {
  return collection(db, "usuarios", obtenerUID(), "evidencias");
}

function documentoEvidencia(id) {
  const evidenciaId = textoSeguro(id);

  if (!evidenciaId) {
    throw new Error("Falta el identificador de la evidencia.");
  }

  return doc(db, "usuarios", obtenerUID(), "evidencias", evidenciaId);
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

function normalizarTarea(tarea = {}, { parcial = false } = {}) {
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

  const resultado = {
    alumnoId: textoSeguro(tarea.alumnoId) || uidActual,
    creadaPorUid: textoSeguro(tarea.creadaPorUid) || uidActual,
    asignadaPorUid: textoSeguro(tarea.asignadaPorUid) || uidActual,
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
    asignadaPor:
      tarea.asignadaPor && typeof tarea.asignadaPor === "object"
        ? tarea.asignadaPor
        : {
            uid: uidActual,
            rol: "familia",
            nombreVisible: "Familia"
          },
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
  const datos = normalizarTarea(tarea);

  const referencia = await addDoc(coleccionTareas(), {
    ...datos,
    creadaEn: serverTimestamp(),
    actualizadaEn: serverTimestamp()
  });

  return referencia.id;
}

async function obtenerTarea(id) {
  const resultado = await getDoc(documentoTarea(id));
  return resultado.exists() ? normalizarTareaLeida(resultado) : null;
}

async function leerTareas() {
  const consulta = query(
    coleccionTareas(),
    orderBy("actualizadaEn", "desc")
  );

  const resultado = await getDocs(consulta);
  return resultado.docs.map(normalizarTareaLeida);
}

function observarTareas(callback, onError = console.error) {
  if (typeof callback !== "function") {
    throw new Error("Se necesita una función callback.");
  }

  const consulta = query(
    coleccionTareas(),
    orderBy("actualizadaEn", "desc")
  );

  return onSnapshot(
    consulta,
    (resultado) => callback(resultado.docs.map(normalizarTareaLeida)),
    onError
  );
}

async function actualizarTarea(id, cambios = {}) {
  const permitidos = new Set([
    "alumnoId",
    "creadaPorUid",
    "asignadaPorUid",
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
    "asignadaPor",
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

  if ("criterioCumplimiento" in datos) {
    datos.criterioCumplimiento = normalizarCriterioCumplimiento(
      datos.criterioCumplimiento
    );
  }

  if ("progreso" in datos) {
    datos.progreso = normalizarProgresoTarea(
      datos.progreso,
      datos.criterioCumplimiento || {}
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

  await updateDoc(documentoTarea(id), {
    ...datos,
    actualizadaEn: serverTimestamp()
  });
}

async function cambiarEstadoTarea(id, estado, datosExtra = {}) {
  const estadoNormalizado = normalizarEstadoTarea(estado, "");

  if (!estadoNormalizado) {
    throw new Error("El estado indicado no es válido.");
  }

  const cambios = {
    estado: estadoNormalizado,
    actualizadaEn: serverTimestamp()
  };

  if (estadoNormalizado === "en_curso") {
    cambios["progreso.iniciadaEn"] = serverTimestamp();
  }

  if (
    estadoNormalizado === "completada" ||
    estadoNormalizado === "pendiente_validacion"
  ) {
    cambios["progreso.completadaEn"] = serverTimestamp();
  }

  Object.entries(datosExtra).forEach(([clave, valor]) => {
    cambios[clave] = valor;
  });

  await updateDoc(documentoTarea(id), cambios);
}

function normalizarEvidencia(evidencia = {}) {
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

  return {
    alumnoId: textoSeguro(evidencia.alumnoId) || obtenerUID(),
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

function evidenciaCumpleCriterio(evidencia, criterio) {
  if (criterio.modulo && evidencia.modulo !== criterio.modulo) return false;
  if (criterio.evidenciaTipo && evidencia.tipo !== criterio.evidenciaTipo) {
    return false;
  }

  return Object.entries(criterio.filtros || {}).every(
    ([clave, valorEsperado]) =>
      String(evidencia.atributos?.[clave] ?? "") === String(valorEsperado)
  );
}

async function registrarEvidenciaMision(evidenciaEntrada) {
  const evidencia = normalizarEvidencia(evidenciaEntrada);
  const evidenciaId = crearIdEvidencia(evidencia);
  const tareaRef = documentoTarea(evidencia.misionId);
  const evidenciaRef = documentoEvidencia(evidenciaId);

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
    const alumnoId = textoSeguro(tarea.alumnoId) || obtenerUID();

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
      throw new Error("La actividad no cumple el criterio de esta misión.");
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
      actualizadaEn: serverTimestamp()
    };

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
      actualizadaEn: serverTimestamp()
    });
  }

  return resultado;
}
async function leerEvidenciasMision(misionId) {
  const id = textoSeguro(misionId);
  if (!id) throw new Error("Falta el identificador de la misión.");

  const resultado = await getDocs(
    query(coleccionEvidencias(), where("misionId", "==", id))
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
  const referencia = documentoTarea(id);
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
    actualizadaEn: serverTimestamp()
  });
}

async function eliminarTarea(id) {
  await deleteDoc(documentoTarea(id));
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
  })
});
