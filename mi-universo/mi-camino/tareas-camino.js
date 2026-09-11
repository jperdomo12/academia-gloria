/* Academia Gloria Valentina · Mi Camino · Fuente compartida de Misiones */

import { Academia } from "../../compartido/api/academia.js";
import { auth } from "../../compartido/firebase/firebase-config.js";

let tareasActuales = [];
let tareasCargadas = false;
let detenerFuente = null;
let iniciandoFuente = null;

const suscriptores = new Set();

function notificarTareas() {
  suscriptores.forEach(suscriptor => {
    try {
      suscriptor.callback(tareasActuales);
    } catch (error) {
      console.error("[Mi Camino] Un consumidor de Misiones falló al actualizarse.", error);
    }
  });
}

function notificarError(error) {
  suscriptores.forEach(suscriptor => {
    try {
      suscriptor.onError?.(error);
    } catch (errorConsumidor) {
      console.error(
        "[Mi Camino] Un consumidor falló al procesar un error de Misiones.",
        errorConsumidor
      );
    }
  });
}

async function asegurarFuente() {
  if (detenerFuente || iniciandoFuente || !suscriptores.size) return;

  iniciandoFuente = (async () => {
    await auth.authStateReady();

    if (!auth.currentUser || !suscriptores.size) return;

    detenerFuente = Academia.tareas.observar(
      tareas => {
        tareasActuales = Array.isArray(tareas) ? tareas : [];
        tareasCargadas = true;
        notificarTareas();
      },
      error => {
        console.warn("[Mi Camino] No se pudieron observar las Misiones.", error);
        notificarError(error);
      }
    );
  })()
    .catch(error => {
      console.warn("[Mi Camino] No se pudo iniciar la fuente compartida de Misiones.", error);
      notificarError(error);
    })
    .finally(() => {
      iniciandoFuente = null;
    });

  await iniciandoFuente;
}

export function observarTareasCamino(callback, onError = console.error) {
  if (typeof callback !== "function") {
    throw new Error("Mi Camino necesita una función callback para observar Misiones.");
  }

  const suscriptor = {
    callback,
    onError: typeof onError === "function" ? onError : console.error
  };

  suscriptores.add(suscriptor);

  if (tareasCargadas) {
    queueMicrotask(() => {
      if (suscriptores.has(suscriptor)) callback(tareasActuales);
    });
  }

  asegurarFuente();

  return () => {
    suscriptores.delete(suscriptor);

    if (!suscriptores.size && detenerFuente) {
      detenerFuente();
      detenerFuente = null;
      tareasActuales = [];
      tareasCargadas = false;
    }
  };
}
