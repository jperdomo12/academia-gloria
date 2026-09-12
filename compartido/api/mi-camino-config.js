/* Academia Gloria Valentina · Configuración global de Mi Camino */

import { db, auth } from "../firebase/firebase-config.js";
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import {
  CONFIGURACION_CRECIMIENTO_PREDETERMINADA,
  normalizarConfiguracionCrecimiento,
  validarConfiguracionCrecimiento
} from "../modelos/mi-camino-crecimiento.js";

const RUTA_DOCUMENTO = Object.freeze({ coleccion: "configuracion", id: "miCamino" });

function referencia() {
  return doc(db, RUTA_DOCUMENTO.coleccion, RUTA_DOCUMENTO.id);
}

function resultadoDesdeSnapshot(snapshot) {
  const datos = snapshot.exists() ? snapshot.data() : null;
  return {
    existe: snapshot.exists(),
    schemaPersistido: Number(datos?.schemaVersion || 0),
    configuracion: normalizarConfiguracionCrecimiento(
      datos || CONFIGURACION_CRECIMIENTO_PREDETERMINADA
    ),
    auditoria: datos
      ? {
          createdAt: datos.createdAt || null,
          createdBy: datos.createdBy || "",
          updatedAt: datos.updatedAt || null,
          updatedBy: datos.updatedBy || ""
        }
      : {
          createdAt: null,
          createdBy: "",
          updatedAt: null,
          updatedBy: ""
        }
  };
}

export async function leerConfiguracionMiCamino() {
  await auth.authStateReady();
  if (!auth.currentUser) {
    throw new Error("Se necesita una sesión autenticada para leer la configuración de Mi Camino.");
  }

  return resultadoDesdeSnapshot(await getDoc(referencia()));
}

export function observarConfiguracionMiCamino(callback, onError = console.error) {
  if (typeof callback !== "function") {
    throw new Error("Se necesita una función callback para observar Mi Camino.");
  }

  let cancelarSnapshot = null;
  let cancelado = false;

  (async () => {
    try {
      await auth.authStateReady();
      if (cancelado) return;
      if (!auth.currentUser) {
        throw new Error("No hay ningún usuario autenticado.");
      }

      cancelarSnapshot = onSnapshot(
        referencia(),
        snapshot => callback(resultadoDesdeSnapshot(snapshot)),
        onError
      );
    } catch (error) {
      onError(error);
    }
  })();

  return () => {
    cancelado = true;
    cancelarSnapshot?.();
  };
}

export async function guardarConfiguracionMiCamino(configuracion) {
  await auth.authStateReady();
  const actor = auth.currentUser;
  if (!actor) {
    throw new Error("Se necesita una sesión autenticada para guardar la configuración.");
  }

  const validacion = validarConfiguracionCrecimiento(configuracion);
  if (!validacion.valida) {
    throw new Error(validacion.errores.join(" "));
  }

  const ref = referencia();
  const existente = await getDoc(ref);
  const anterior = existente.exists() ? existente.data() : null;
  const ahoraServidor = serverTimestamp();

  const datos = {
    schemaVersion: 2,
    etapas: validacion.configuracion.etapas,
    nivelesContexto: validacion.configuracion.nivelesContexto,
    createdAt: anterior?.createdAt || ahoraServidor,
    createdBy: anterior?.createdBy || actor.uid,
    updatedAt: ahoraServidor,
    updatedBy: actor.uid
  };

  await setDoc(ref, datos);
  return leerConfiguracionMiCamino();
}
