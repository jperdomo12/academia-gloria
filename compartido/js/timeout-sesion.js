/* ==========================================================
   Academia Gloria Valentina
   Timeout global de sesión por inactividad
   Versión 1.0
   ========================================================== */

import { AcademiaConfig } from "../config/academia-config.js";
import { cerrarSesion } from "./perfil-usuario.js";

const CLAVE_GLOBAL = "__academiaTimeoutSesion";
const INTERVALO_MOVIMIENTO_MS = 1000;

function minutosConfigurados() {
  const minutos = Number(AcademiaConfig.sessionTimeoutMinutes);
  return Number.isFinite(minutos) && minutos > 0 ? minutos : 0;
}

export function activarTimeoutSesion({ loginUrl = "" } = {}) {
  const minutos = minutosConfigurados();

  if (!minutos) {
    return Object.freeze({ activo: false, minutos: 0 });
  }

  if (window[CLAVE_GLOBAL]) {
    return window[CLAVE_GLOBAL];
  }

  const limiteMs = minutos * 60 * 1000;
  const destinoLogin = loginUrl || new URL("../../login.html", import.meta.url).href;

  let ultimaActividad = Date.now();
  let ultimoMovimiento = 0;
  let temporizador = null;
  let cerrando = false;

  function programar() {
    window.clearTimeout(temporizador);

    const restante = Math.max(
      1,
      limiteMs - (Date.now() - ultimaActividad)
    );

    temporizador = window.setTimeout(verificarInactividad, restante);
  }

  function registrarActividad() {
    if (cerrando) return;
    ultimaActividad = Date.now();
    programar();
  }

  function registrarMovimiento() {
    const ahora = Date.now();
    if (ahora - ultimoMovimiento < INTERVALO_MOVIMIENTO_MS) return;
    ultimoMovimiento = ahora;
    registrarActividad();
  }

  async function verificarInactividad() {
    if (cerrando) return;

    const inactividad = Date.now() - ultimaActividad;

    if (inactividad < limiteMs) {
      programar();
      return;
    }

    cerrando = true;
    desactivar();

    try {
      await cerrarSesion();
    } catch (error) {
      console.error("No se pudo cerrar la sesión por inactividad.", error);
    } finally {
      window.location.replace(destinoLogin);
    }
  }

  function comprobarAlVolver() {
    if (document.visibilityState === "visible") {
      verificarInactividad();
    }
  }

  const eventosActividad = ["pointerdown", "keydown", "touchstart", "scroll"];

  eventosActividad.forEach(evento => {
    window.addEventListener(evento, registrarActividad, { passive: true, capture: true });
  });

  window.addEventListener("mousemove", registrarMovimiento, { passive: true });
  document.addEventListener("visibilitychange", comprobarAlVolver);

  function desactivar() {
    window.clearTimeout(temporizador);

    eventosActividad.forEach(evento => {
      window.removeEventListener(evento, registrarActividad, { capture: true });
    });

    window.removeEventListener("mousemove", registrarMovimiento);
    document.removeEventListener("visibilitychange", comprobarAlVolver);

    if (window[CLAVE_GLOBAL]) {
      delete window[CLAVE_GLOBAL];
    }
  }

  const controlador = Object.freeze({
    activo: true,
    minutos,
    reiniciar: registrarActividad,
    desactivar
  });

  window[CLAVE_GLOBAL] = controlador;
  programar();

  return controlador;
}
