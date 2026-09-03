/**
 * Academia Gloria Valentina
 * API · Baúl del Alumno · v1
 *
 * Patrón de propiedad:
 * Persona Activa -> USER asociado -> usuarios/{userId}/baul/{elementoId}
 *
 * El adjunto se mantiene separado para que listar el Baúl no cargue archivos.
 */

import { db } from "../firebase/firebase-config.js";
import { ContextoUsuario } from "../js/contexto-usuario.js";
import {
  crearAdjuntoBaul,
  crearElementoBaul
} from "../modelos/baul.js";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  writeBatch
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

function texto(valor = "", alternativo = "") {
  const resultado = String(valor ?? "").trim();
  return resultado || alternativo;
}

function coleccionBaul(userId) {
  return collection(db, "usuarios", userId, "baul");
}

function documentoBaul(userId, elementoId) {
  const id = texto(elementoId);
  if (!id) throw new Error("Falta el identificador del elemento del Baúl.");
  return doc(db, "usuarios", userId, "baul", id);
}

function documentoAdjunto(userId, elementoId) {
  const id = texto(elementoId);
  if (!id) throw new Error("Falta el identificador del elemento del Baúl.");
  return doc(db, "usuarios", userId, "baulAdjuntos", id);
}

function actorDesdeContexto(contexto) {
  const nombre = texto(
    contexto?.personaUsuario?.nombreVisible,
    texto(
      contexto?.personaUsuario?.nombre,
      texto(contexto?.usuario?.login, "Usuario")
    )
  );

  return {
    userId: contexto.usuario.userId,
    nombre
  };
}

function metadataAdjunto(adjunto = null) {
  if (!adjunto) {
    return {
      tieneAdjunto: false,
      adjuntoNombre: "",
      adjuntoMimeType: "",
      adjuntoTamano: 0
    };
  }

  return {
    tieneAdjunto: true,
    adjuntoNombre: adjunto.nombre,
    adjuntoMimeType: adjunto.mimeType,
    adjuntoTamano: adjunto.tamano
  };
}

export async function guardarElementoBaul(elemento = {}, adjunto = null) {
  const contexto = await ContextoUsuario.inicializar();
  const userId = contexto.userIdPersonaActiva;
  const actor = actorDesdeContexto(contexto);
  const datos = crearElementoBaul(elemento);
  const archivo = adjunto ? crearAdjuntoBaul(adjunto) : null;

  const referencia = doc(coleccionBaul(userId));
  const lote = writeBatch(db);

  lote.set(referencia, {
    ...datos,
    personaId: contexto.personaActiva.personaId,
    ...metadataAdjunto(archivo),
    createdAt: serverTimestamp(),
    createdBy: actor.userId,
    createdByNombre: actor.nombre,
    updatedAt: serverTimestamp(),
    updatedBy: actor.userId,
    updatedByNombre: actor.nombre
  });

  if (archivo) {
    lote.set(documentoAdjunto(userId, referencia.id), {
      ...archivo,
      updatedAt: serverTimestamp(),
      updatedBy: actor.userId
    });
  }

  await lote.commit();

  return referencia.id;
}

export async function leerElementosBaul() {
  const contexto = await ContextoUsuario.inicializar();
  const resultado = await getDocs(
    coleccionBaul(contexto.userIdPersonaActiva)
  );

  return resultado.docs.map(item => ({
    id: item.id,
    ...item.data()
  }));
}

export function observarElementosBaul(callback, onError = console.error) {
  if (typeof callback !== "function") {
    throw new Error("Se necesita una función callback.");
  }

  let cancelarSnapshot = null;
  let cancelado = false;

  (async () => {
    try {
      const contexto = await ContextoUsuario.inicializar();
      if (cancelado) return;

      cancelarSnapshot = onSnapshot(
        coleccionBaul(contexto.userIdPersonaActiva),
        resultado => {
          callback(
            resultado.docs.map(item => ({
              id: item.id,
              ...item.data()
            }))
          );
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

export async function actualizarElementoBaul(
  elementoId,
  cambios = {},
  { adjunto = null, eliminarAdjunto = false } = {}
) {
  const contexto = await ContextoUsuario.inicializar();
  const userId = contexto.userIdPersonaActiva;
  const actor = actorDesdeContexto(contexto);
  const referencia = documentoBaul(userId, elementoId);
  const actual = await getDoc(referencia);

  if (!actual.exists()) {
    throw new Error("Ese elemento ya no existe en el Baúl.");
  }

  const datos = crearElementoBaul(cambios);
  const archivo = adjunto ? crearAdjuntoBaul(adjunto) : null;
  const existente = actual.data();

  let adjuntoFinal = {
    tieneAdjunto: Boolean(existente.tieneAdjunto),
    adjuntoNombre: texto(existente.adjuntoNombre),
    adjuntoMimeType: texto(existente.adjuntoMimeType),
    adjuntoTamano: Number(existente.adjuntoTamano || 0)
  };

  if (archivo) {
    adjuntoFinal = metadataAdjunto(archivo);
  } else if (eliminarAdjunto) {
    adjuntoFinal = metadataAdjunto(null);
  }

  const lote = writeBatch(db);

  lote.update(referencia, {
    ...datos,
    ...adjuntoFinal,
    updatedAt: serverTimestamp(),
    updatedBy: actor.userId,
    updatedByNombre: actor.nombre
  });

  if (archivo) {
    lote.set(documentoAdjunto(userId, elementoId), {
      ...archivo,
      updatedAt: serverTimestamp(),
      updatedBy: actor.userId
    });
  } else if (eliminarAdjunto) {
    lote.delete(documentoAdjunto(userId, elementoId));
  }

  await lote.commit();
}

export async function establecerFavoritoBaul(elementoId, favorito) {
  const contexto = await ContextoUsuario.inicializar();
  const actor = actorDesdeContexto(contexto);

  await updateDoc(
    documentoBaul(contexto.userIdPersonaActiva, elementoId),
    {
      favorito: Boolean(favorito),
      updatedAt: serverTimestamp(),
      updatedBy: actor.userId,
      updatedByNombre: actor.nombre
    }
  );
}

export async function leerAdjuntoBaul(elementoId) {
  const contexto = await ContextoUsuario.inicializar();
  const resultado = await getDoc(
    documentoAdjunto(contexto.userIdPersonaActiva, elementoId)
  );

  return resultado.exists()
    ? { id: resultado.id, ...resultado.data() }
    : null;
}

export async function eliminarElementoBaul(elementoId) {
  const contexto = await ContextoUsuario.inicializar();
  const userId = contexto.userIdPersonaActiva;
  const lote = writeBatch(db);

  lote.delete(documentoAdjunto(userId, elementoId));
  lote.delete(documentoBaul(userId, elementoId));

  await lote.commit();
}

export const Baul = Object.freeze({
  guardar: guardarElementoBaul,
  leer: leerElementosBaul,
  observar: observarElementosBaul,
  actualizar: actualizarElementoBaul,
  establecerFavorito: establecerFavoritoBaul,
  leerAdjunto: leerAdjuntoBaul,
  eliminar: eliminarElementoBaul
});
