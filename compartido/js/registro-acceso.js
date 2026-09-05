/******************************************************************************
 * Academia Gloria Valentina
 * Archivo: compartido/js/registro-acceso.js
 * Registro operativo del último acceso del Usuario a la Academia.
 * Versión: 1.1
 *
 * V1.1
 * - Registra una sola vez por sesión de pestaña/navegador y login real.
 * - Guarda fecha/hora inmediatamente con serverTimestamp de Firestore.
 * - Conserva un historial limitado a los 10 accesos más recientes.
 * - Resuelve después, sin bloquear, ubicación aproximada por IP.
 * - NO persiste la IP pública, coordenadas, código postal, ISP ni otros datos.
 * - La geolocalización puede quedar "No disponible" sin perder el acceso.
 ******************************************************************************/

import { db } from "../firebase/firebase-config.js";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const PREFIJO_CLAVE_SESION = "academia.acceso.registrado.v2";
const URL_GEOLOCALIZACION = "https://whatismyip.technology/api/me";
const TIMEOUT_GEOLOCALIZACION_MS = 3500;
const MAX_HISTORIAL_ACCESOS = 10;

function texto(valor = "") {
  return String(valor ?? "").trim();
}

function claveSesion(uid) {
  return `${PREFIJO_CLAVE_SESION}:${uid}`;
}

function identificadorLogin(usuario) {
  return texto(usuario?.metadata?.lastSignInTime) || "sesion-autenticada";
}

function accesoYaRegistrado(usuario) {
  const uid = texto(usuario?.uid);
  if (!uid) return false;

  try {
    return sessionStorage.getItem(claveSesion(uid)) === identificadorLogin(usuario);
  } catch {
    return false;
  }
}

function marcarAccesoRegistrado(usuario) {
  const uid = texto(usuario?.uid);
  if (!uid) return;

  try {
    sessionStorage.setItem(claveSesion(uid), identificadorLogin(usuario));
  } catch {
    // El registro en Firestore sigue siendo válido aunque sessionStorage falle.
  }
}

function desmarcarAcceso(usuario) {
  const uid = texto(usuario?.uid);
  if (!uid) return;

  try {
    if (sessionStorage.getItem(claveSesion(uid)) === identificadorLogin(usuario)) {
      sessionStorage.removeItem(claveSesion(uid));
    }
  } catch {
    // Sin impacto: solo habilita reintento dentro de la misma pestaña.
  }
}

function ubicacionNoDisponible() {
  return {
    disponible: false,
    ciudad: "",
    region: "",
    pais: "",
    codigoPais: "",
    origen: "ip"
  };
}

async function obtenerUbicacionAproximada() {
  const controlador = new AbortController();
  const temporizador = window.setTimeout(
    () => controlador.abort(),
    TIMEOUT_GEOLOCALIZACION_MS
  );

  try {
    const respuesta = await fetch(URL_GEOLOCALIZACION, {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "omit",
      referrerPolicy: "no-referrer",
      signal: controlador.signal,
      cache: "no-store"
    });

    if (!respuesta.ok) {
      throw new Error(`Servicio de ubicación no disponible (${respuesta.status}).`);
    }

    const datos = await respuesta.json();

    /*
     * El servicio devuelve también la IP y otros datos de red.
     * Por diseño se ignoran por completo: la Academia persiste únicamente
     * ciudad, región y país aproximados.
     */
    const ciudad = texto(datos?.city);
    const region = texto(datos?.region);
    const pais = texto(datos?.country);
    const codigoPais = texto(datos?.countryCode).toUpperCase();

    if (!ciudad && !region && !pais) {
      return ubicacionNoDisponible();
    }

    return {
      disponible: true,
      ciudad,
      region,
      pais,
      codigoPais,
      origen: "ip"
    };
  } catch (error) {
    console.debug(
      "[RegistroAcceso] No se pudo obtener la ubicación aproximada.",
      error
    );
    return ubicacionNoDisponible();
  } finally {
    window.clearTimeout(temporizador);
  }
}

async function recortarHistorialAccesos(uid) {
  try {
    const consulta = query(
      collection(db, "usuarios", uid, "accesosAcademia"),
      orderBy("fechaAcceso", "desc")
    );
    const resultado = await getDocs(consulta);
    const excedentes = resultado.docs.slice(MAX_HISTORIAL_ACCESOS);

    if (excedentes.length) {
      await Promise.all(excedentes.map(item => deleteDoc(item.ref)));
    }
  } catch (error) {
    console.debug(
      "[RegistroAcceso] No se pudo aplicar la retención de 10 accesos.",
      error
    );
  }
}

export async function registrarAccesoAcademia(usuario) {
  const uid = texto(usuario?.uid);

  if (!uid || accesoYaRegistrado(usuario)) {
    return false;
  }

  const coleccionAccesos = collection(db, "usuarios", uid, "accesosAcademia");
  const referenciaUltimo = doc(coleccionAccesos, "ultimo");
  const referenciaHistorial = doc(coleccionAccesos);
  let historialCreado = false;

  /*
   * Marcamos antes de iniciar la escritura para evitar duplicados si otra
   * página protegida se abre mientras este registro sigue en curso.
   */
  marcarAccesoRegistrado(usuario);

  try {
    await setDoc(
      referenciaUltimo,
      { ultimoAccesoAcademia: serverTimestamp() },
      { merge: true }
    );
  } catch (error) {
    desmarcarAcceso(usuario);
    throw error;
  }

  /*
   * El historial conserva el instante del acceso independientemente de que la
   * ubicación tarde o falle. Cada documento representa una entrada observada.
   */
  try {
    await setDoc(referenciaHistorial, {
      fechaAcceso: serverTimestamp(),
      ubicacionAproximada: ubicacionNoDisponible()
    });
    historialCreado = true;
  } catch (error) {
    console.debug(
      "[RegistroAcceso] El último acceso quedó registrado, pero no su historial.",
      error
    );
  }

  /*
   * La ubicación es complementaria. Nunca condiciona la fecha/hora de acceso.
   */
  const ubicacionAproximada = await obtenerUbicacionAproximada();

  try {
    await setDoc(
      referenciaUltimo,
      { ubicacionAproximada },
      { merge: true }
    );
  } catch (error) {
    console.debug(
      "[RegistroAcceso] El acceso quedó registrado, pero no su ubicación actual.",
      error
    );
  }

  if (historialCreado) {
    try {
      await setDoc(
        referenciaHistorial,
        { ubicacionAproximada },
        { merge: true }
      );
    } catch (error) {
      console.debug(
        "[RegistroAcceso] No se pudo completar la ubicación del historial.",
        error
      );
    }

    await recortarHistorialAccesos(uid);
  }

  return true;
}
