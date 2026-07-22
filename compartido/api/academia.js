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
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
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
  eventos: Object.freeze({
    guardar: guardarEvento,
    leer: leerEventos,
    observar: observarEventos,
    actualizar: actualizarEvento,
    eliminar: eliminarEvento
  })
});
