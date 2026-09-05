/******************************************************************************
 * Academia Gloria Valentina
 * Archivo: compartido/js/registro-acceso.js
 * Registro operativo del último acceso del Usuario a la Academia.
 * Versión: 1.0
 *
 * V1
 * - Registra una sola vez por sesión de pestaña/navegador.
 * - Guarda fecha/hora con serverTimestamp de Firestore.
 * - Obtiene ubicación aproximada por IP (ciudad/región/país).
 * - NO persiste la IP pública, coordenadas, código postal, ISP ni otros datos.
 * - La geolocalización es no bloqueante y puede quedar "No disponible".
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

function accesoYaRegistrado(uid) {
  try {
    return sessionStorage.getItem(claveSesion(uid)) === "1";
  } catch {
    return false;
  }
}

function marcarAccesoRegistrado(uid) {
  try {
    sessionStorage.setItem(claveSesion(uid), "1");
  } catch {
    // El registro en Firestore sigue siendo válido aunque sessionStorage falle.
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

  if (!uid || accesoYaRegistrado(uid)) {
    return false;
  }

  const ubicacionAproximada = await obtenerUbicacionAproximada();

  await setDoc(
    doc(db, "usuarios", uid, "accesosAcademia", "ultimo"),
    {
      ultimoAccesoAcademia: serverTimestamp(),
      ubicacionAproximada
    },
    { merge: true }
  );

  marcarAccesoRegistrado(uid);
  return true;
}
