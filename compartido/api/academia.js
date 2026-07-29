/* ==========================================================
   Academia de Gloria Valentina
   academia.js
   API pública de acceso a datos
   ========================================================== */

/* import { db } from "../firebase/firebase-config.js"; */
import { db, auth } from "../firebase/firebase-config.js";
import { crearEvento } from "../modelos/evento.js";

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
  const resultado = await getDoc(
    doc(db, "usuarios", obtenerUID())
  );

  if (!resultado.exists()) {
    return {
      id: obtenerUID(),
      nombre: "Explorador",
      avatar: "🌟",
      idioma: "es"
    };
  }

  return {
    id: resultado.id,
    ...resultado.data()
  };
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
   Mis Tareas
   usuarios/{uid}/tareas/{tareaId}
   ========================================================== */

function coleccionTareas() {
  return collection(db, "usuarios", obtenerUID(), "tareas");
}

function documentoTarea(id) {
  const tareaId = String(id ?? "").trim();

  if (!tareaId) {
    throw new Error("Falta el identificador de la tarea.");
  }

  return doc(db, "usuarios", obtenerUID(), "tareas", tareaId);
}

function normalizarTarea(tarea = {}, { parcial = false } = {}) {
  const titulo = String(tarea.titulo ?? "").trim();

  if (!parcial && !titulo) {
    throw new Error("La tarea debe tener un título.");
  }

  const estadosValidos = new Set([
    "pendiente",
    "en_curso",
    "completada_pendiente_validacion",
    "completada",
    "necesita_ayuda",
    "vencida",
    "cancelada"
  ]);

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
    "biblioteca",
    "libre"
  ]);

  const numeroSeguro = (valor, respaldo = 0) => {
    const numero = Number(valor);
    return Number.isFinite(numero) ? numero : respaldo;
  };

  const resultado = {
    titulo,
    descripcion: String(tarea.descripcion ?? "").trim(),
    tipo: tiposValidos.has(tarea.tipo)
      ? tarea.tipo
      : "actividad_modulo",
    modulo: modulosValidos.has(tarea.modulo)
      ? tarea.modulo
      : "libre",
    destinoUrl: String(tarea.destinoUrl ?? "").trim(),
    objetivo: String(tarea.objetivo ?? "").trim(),
    criterioFinalizacion:
      String(tarea.criterioFinalizacion ?? "").trim(),
    fechaInicio: String(tarea.fechaInicio ?? "").trim(),
    fechaLimite: String(tarea.fechaLimite ?? "").trim(),
    tiempoEstimadoMinutos: Math.max(
      0,
      numeroSeguro(tarea.tiempoEstimadoMinutos)
    ),
    prioridad: ["baja", "normal", "alta"].includes(tarea.prioridad)
      ? tarea.prioridad
      : "normal",
    visibleParaAlumno: tarea.visibleParaAlumno !== false,
    ordenMision: Math.max(
      0,
      numeroSeguro(tarea.ordenMision, 9999)
    ),
    estado: estadosValidos.has(tarea.estado)
      ? tarea.estado
      : "pendiente",
    asignadaPor:
      tarea.asignadaPor && typeof tarea.asignadaPor === "object"
        ? tarea.asignadaPor
        : {
            uid: obtenerUID(),
            rol: "familia",
            nombreVisible: "Familia"
          },
    presentacionAlumno: {
      tituloMision: String(
        tarea.presentacionAlumno?.tituloMision ??
        tarea.titulo ??
        "Nueva misión"
      ).trim(),
      descripcionMision: String(
        tarea.presentacionAlumno?.descripcionMision ??
        tarea.descripcion ??
        ""
      ).trim(),
      mensaje: String(
        tarea.presentacionAlumno?.mensaje ?? ""
      ).trim(),
      icono: String(
        tarea.presentacionAlumno?.icono ?? "🌟"
      ).trim() || "🌟"
    },
    progreso: {
      iniciadaEn: tarea.progreso?.iniciadaEn ?? null,
      completadaEn: tarea.progreso?.completadaEn ?? null,
      tiempoRealMinutos: Math.max(
        0,
        numeroSeguro(tarea.progreso?.tiempoRealMinutos)
      ),
      intentos: Math.max(
        0,
        numeroSeguro(tarea.progreso?.intentos)
      )
    },
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
      fechaFinalizacion: String(
        tarea.resultado?.fechaFinalizacion ?? ""
      ).trim(),
      observaciones: String(
        tarea.resultado?.observaciones ?? ""
      ).trim(),
      masDeLoEsperado: Boolean(
        tarea.resultado?.masDeLoEsperado
      ),
      necesitoAyuda: Boolean(
        tarea.resultado?.necesitoAyuda
      ),
      convieneRepetir: Boolean(
        tarea.resultado?.convieneRepetir
      )
    },
    observacionActual: String(tarea.observacionActual ?? "").trim(),
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

async function crearTarea(tarea) {
  const datos = normalizarTarea(tarea);

  const referencia = await addDoc(coleccionTareas(), {
    ...datos,
    creadaEn: serverTimestamp(),
    actualizadaEn: serverTimestamp()
  });

  return referencia.id;
}

async function leerTareas() {
  const consulta = query(
    coleccionTareas(),
    orderBy("actualizadaEn", "desc")
  );

  const resultado = await getDocs(consulta);

  return resultado.docs.map((documento) => ({
    id: documento.id,
    ...documento.data()
  }));
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
    (resultado) => {
      callback(
        resultado.docs.map((documento) => ({
          id: documento.id,
          ...documento.data()
        }))
      );
    },
    onError
  );
}

async function actualizarTarea(id, cambios = {}) {
  const permitidos = new Set([
    "titulo",
    "descripcion",
    "tipo",
    "modulo",
    "destinoUrl",
    "objetivo",
    "criterioFinalizacion",
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
    datos.titulo = String(datos.titulo ?? "").trim();

    if (!datos.titulo) {
      throw new Error("La tarea debe tener un título.");
    }
  }

  if ("descripcion" in datos) {
    datos.descripcion = String(datos.descripcion ?? "").trim();
  }

  if ("visibleParaAlumno" in datos) {
    datos.visibleParaAlumno = datos.visibleParaAlumno !== false;
  }

  if ("tiempoEstimadoMinutos" in datos) {
    const minutos = Number(datos.tiempoEstimadoMinutos);
    datos.tiempoEstimadoMinutos =
      Number.isFinite(minutos) ? Math.max(0, minutos) : 0;
  }

  if ("ordenMision" in datos) {
    const orden = Number(datos.ordenMision);
    datos.ordenMision =
      Number.isFinite(orden) ? Math.max(0, orden) : 9999;
  }

  if ("resultado" in datos) {
    const resultado = datos.resultado || {};

    datos.resultado = {
      fechaFinalizacion: String(
        resultado.fechaFinalizacion ?? ""
      ).trim(),
      observaciones: String(
        resultado.observaciones ?? ""
      ).trim(),
      masDeLoEsperado: Boolean(resultado.masDeLoEsperado),
      necesitoAyuda: Boolean(resultado.necesitoAyuda),
      convieneRepetir: Boolean(resultado.convieneRepetir)
    };
  }

  if ("presentacionAlumno" in datos) {
    const presentacion = datos.presentacionAlumno || {};

    datos.presentacionAlumno = {
      icono: String(presentacion.icono ?? "🌟").trim() || "🌟",
      tituloMision: String(
        presentacion.tituloMision ?? datos.titulo ?? "Nueva misión"
      ).trim(),
      descripcionMision: String(
        presentacion.descripcionMision ?? datos.descripcion ?? ""
      ).trim(),
      mensaje: String(presentacion.mensaje ?? "").trim()
    };
  }

  await updateDoc(documentoTarea(id), {
    ...datos,
    actualizadaEn: serverTimestamp()
  });
}

async function cambiarEstadoTarea(id, estado, datosExtra = {}) {
  const estadosValidos = new Set([
    "pendiente",
    "en_curso",
    "completada_pendiente_validacion",
    "completada",
    "necesita_ayuda",
    "vencida",
    "cancelada"
  ]);

  if (!estadosValidos.has(estado)) {
    throw new Error("El estado indicado no es válido.");
  }

  const cambios = {
    estado,
    actualizadaEn: serverTimestamp()
  };

  if (estado === "en_curso") {
    cambios["progreso.iniciadaEn"] = serverTimestamp();
  }

  if (
    estado === "completada" ||
    estado === "completada_pendiente_validacion"
  ) {
    cambios["progreso.completadaEn"] = serverTimestamp();
  }

  Object.entries(datosExtra).forEach(([clave, valor]) => {
    cambios[clave] = valor;
  });

  await updateDoc(documentoTarea(id), cambios);
}

async function guardarObservacionTarea(id, texto) {
  const observacion = String(texto ?? "").trim();
  const referencia = documentoTarea(id);
  const existente = await getDoc(referencia);

  if (!existente.exists()) {
    throw new Error("No se encontró la tarea.");
  }

  const datos = existente.data();
  const historial = Array.isArray(datos.historialObservaciones)
    ? datos.historialObservaciones
    : [];

  const actual = String(datos.observacionActual ?? "").trim();

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

  tareas: Object.freeze({
    crear: crearTarea,
    leer: leerTareas,
    observar: observarTareas,
    actualizar: actualizarTarea,
    cambiarEstado: cambiarEstadoTarea,
    guardarObservacion: guardarObservacionTarea,
    eliminar: eliminarTarea
  })
});
