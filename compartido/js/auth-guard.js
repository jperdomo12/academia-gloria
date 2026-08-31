/******************************************************************************
 * Academia Gloria Valentina
 * Archivo: compartido/js/auth-guard.js
 * Protección de páginas autenticadas
 * Versión: 1.3
 *
 * Ajustes:
 * - Espera a que Firebase termine de restaurar la sesión antes de decidir
 *   si debe redirigir al login.
 * - Activa el timeout global de sesión configurado por inactividad.
 * - Respeta nivelMinimo declarado en el modelo central de navegación antes
 *   de mostrar o inicializar una pantalla restringida.
 ******************************************************************************/

import { auth } from "../firebase/firebase-config.js";
import { observarSesion } from "../firebase/firebase-auth.js";
import { UBICACIONES_ACADEMIA } from "../modelos/navegacion.js";
import { activarTimeoutSesion } from "./timeout-sesion.js";

const NIVELES_ACCESO = Object.freeze({
  consulta: 10,
  gestion: 20,
  administracion: 30
});

function obtenerBaseAcademia() {
  return window.location.hostname.endsWith("github.io")
    ? "/academia-gloria"
    : "";
}

function normalizarRuta(ruta = "") {
  return String(ruta)
    .replace(/^\/+/, "")
    .replace(/index\.html$/, "")
    .replace(/\/+$/, "");
}

function rutaActualRelativa() {
  const base = obtenerBaseAcademia();
  let ruta = window.location.pathname;

  if (base && ruta.startsWith(base)) {
    ruta = ruta.slice(base.length);
  }

  return normalizarRuta(ruta);
}

function buscarNodo(arbol, rutaActual) {
  for (const nodo of arbol || []) {
    if (nodo.ruta && normalizarRuta(nodo.ruta) === rutaActual) {
      return nodo;
    }

    if (Array.isArray(nodo.hijos)) {
      const encontrado = buscarNodo(nodo.hijos, rutaActual);
      if (encontrado) return encontrado;
    }
  }

  return null;
}

function construirRutaAcademia(ruta = "") {
  const base = obtenerBaseAcademia();
  const relativa = normalizarRuta(ruta);
  const prefijo = base ? `${base}/` : "/";
  return `${prefijo}${relativa}`;
}

async function obtenerDestinoPorAccesoInsuficiente() {
  const actual = buscarNodo(
    UBICACIONES_ACADEMIA,
    rutaActualRelativa()
  );

  const nivelMinimo = String(actual?.nivelMinimo || "")
    .trim()
    .toLowerCase();

  if (!Object.prototype.hasOwnProperty.call(NIVELES_ACCESO, nivelMinimo)) {
    return "";
  }

  const { ContextoUsuario } = await import("./contexto-usuario.js");
  const nivelActual = String(
    await ContextoUsuario.obtenerNivelAcceso()
  ).trim().toLowerCase();

  if (
    (NIVELES_ACCESO[nivelActual] || 0) >=
    NIVELES_ACCESO[nivelMinimo]
  ) {
    return "";
  }

  return construirRutaAcademia(actual?.volver || "");
}

export async function protegerPagina({
  loginUrl = "/academia-gloria/login.html",
  onAuthenticated = null
} = {}) {
  document.documentElement.style.visibility = "hidden";

  /*
   * Muy importante:
   * al cargar una nueva página Firebase puede necesitar unos instantes para
   * restaurar la sesión persistida. No debemos redirigir mientras ese estado
   * inicial todavía se está resolviendo.
   */
  await auth.authStateReady();

  const usuarioInicial = auth.currentUser;

  if (!usuarioInicial) {
    window.location.replace(loginUrl);
    return null;
  }

  try {
    const destinoSinAcceso = await obtenerDestinoPorAccesoInsuficiente();

    if (destinoSinAcceso) {
      window.location.replace(destinoSinAcceso);
      return null;
    }
  } catch (error) {
    console.error("No se pudo verificar el nivel de acceso de la página.", error);
    window.location.replace(construirRutaAcademia(""));
    return null;
  }

  await activarTimeoutSesion({ loginUrl });
  document.documentElement.style.visibility = "visible";

  if (typeof onAuthenticated === "function") {
    await onAuthenticated(usuarioInicial);
  }

  /*
   * Después de haber resuelto correctamente el estado inicial, sí observamos
   * cambios reales de sesión (por ejemplo, un cierre de sesión posterior).
   */
  return observarSesion((usuario) => {
    if (!usuario) {
      window.location.replace(loginUrl);
    }
  });
}
