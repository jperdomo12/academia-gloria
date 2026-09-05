/******************************************************************************
 * Academia Gloria Valentina
 * Archivo: compartido/js/registro-acceso.js
 * Registro operativo del último acceso del Usuario a la Academia.
 * Versión: 1.0
 *
 * V1
 * - Registra una sola vez por sesión de pestaña/navegador y login real.
 * - Guarda fecha/hora inmediatamente con serverTimestamp de Firestore.
 * - Resuelve después, sin bloquear, ubicación aproximada por IP.
 * - NO persiste la IP pública, coordenadas, código postal, ISP ni otros datos.
 * - La geolocalización puede quedar "No disponible" sin perder el acceso.
 ******************************************************************************/

import { db } from "../firebase/firebase-config.js";

import {
  doc,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const PREFIJO_CLAVE_SESION = "academia.acceso.registrado.v1";
const URL_GEOLOCALIZACION = "https://whatismyip.technology/api/me";
const TIMEOUT_GEOLOCALIZACION_MS = 3500;

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
     * Por diseño V1 se ignoran por completo: la Academia persiste únicamente
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

export async function registrarAccesoAcademia(usuario) {
  const uid = texto(usuario?.uid);

  if (!uid || accesoYaRegistrado(usuario)) {
    return false;
  }

  const referencia = doc(db, "usuarios", uid, "accesosAcademia", "ultimo");

  /*
   * Marcamos antes de iniciar la escritura para evitar duplicados si otra
   * página protegida se abre mientras este registro sigue en curso.
   */
  marcarAccesoRegistrado(usuario);

  try {
    await setDoc(
      referencia,
      { ultimoAccesoAcademia: serverTimestamp() },
      { merge: true }
    );
  } catch (error) {
    desmarcarAcceso(usuario);
    throw error;
  }

  /*
   * La ubicación es complementaria. Nunca condiciona la fecha/hora de acceso.
   */
  const ubicacionAproximada = await obtenerUbicacionAproximada();

  try {
    await setDoc(
      referencia,
      { ubicacionAproximada },
      { merge: true }
    );
  } catch (error) {
    console.debug(
      "[RegistroAcceso] El acceso quedó registrado, pero no su ubicación.",
      error
    );
  }

  return true;
}
