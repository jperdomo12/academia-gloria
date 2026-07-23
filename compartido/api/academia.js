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
    eliminarSesion: eliminarSesionLectura
  })
});
