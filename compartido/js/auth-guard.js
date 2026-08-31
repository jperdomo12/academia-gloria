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
 * - Respeta nivelMinimo declarado en el modelo central de navegación.
 * - Si el nivel es insuficiente, redirige al destino seguro de la pantalla y
 *   muestra allí un aviso temporal de "Usuario no autorizado".
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

const CLAVE_AVISO_ACCESO = "academia.aviso.acceso-denegado.v1";
const MAX_EDAD_AVISO_MS = 15000;

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

function registrarAvisoAccesoDenegado(titulo = "esta sección") {
  try {
    sessionStorage.setItem(
      CLAVE_AVISO_ACCESO,
      JSON.stringify({
        titulo: String(titulo || "esta sección").trim(),
        creadoEn: Date.now()
      })
    );
  } catch {
    // La redirección segura sigue funcionando aunque sessionStorage no esté disponible.
  }
}

function consumirAvisoAccesoDenegado() {
  try {
    const valor = sessionStorage.getItem(CLAVE_AVISO_ACCESO);
    sessionStorage.removeItem(CLAVE_AVISO_ACCESO);

    if (!valor) return null;

    const aviso = JSON.parse(valor);
    const creadoEn = Number(aviso?.creadoEn || 0);

    if (!creadoEn || Date.now() - creadoEn > MAX_EDAD_AVISO_MS) {
      return null;
    }

    return {
      titulo: String(aviso?.titulo || "esta sección").trim()
    };
  } catch {
    return null;
  }
}

function mostrarAvisoAccesoDenegado(aviso) {
  if (!aviso) return;

  const contenedor = document.createElement("aside");
  contenedor.setAttribute("role", "status");
  contenedor.setAttribute("aria-live", "polite");
  contenedor.style.cssText = [
    "position:fixed",
    "top:20px",
    "left:50%",
    "transform:translateX(-50%)",
    "z-index:2147483647",
    "width:min(520px,calc(100% - 28px))",
    "padding:16px 48px 16px 18px",
    "border:2px solid #fbbf24",
    "border-radius:18px",
    "background:#fffbeb",
    "color:#78350f",
    "box-shadow:0 18px 45px rgba(120,53,15,.18)",
    "font-family:Outfit,system-ui,sans-serif"
  ].join(";");

  const titulo = document.createElement("strong");
  titulo.textContent = "🔒 Usuario no autorizado";
  titulo.style.cssText = "display:block;font-size:1rem;font-weight:900";

  const detalle = document.createElement("div");
  detalle.textContent = `No tienes permisos para acceder a ${aviso.titulo}.`;
  detalle.style.cssText = "margin-top:3px;font-size:.92rem;font-weight:700;line-height:1.35";

  const cerrar = document.createElement("button");
  cerrar.type = "button";
  cerrar.setAttribute("aria-label", "Cerrar aviso");
  cerrar.textContent = "×";
  cerrar.style.cssText = [
    "position:absolute",
    "top:9px",
    "right:12px",
    "width:32px",
    "height:32px",
    "border:0",
    "border-radius:10px",
    "background:transparent",
    "color:#92400e",
    "cursor:pointer",
    "font-size:1.45rem",
    "font-weight:900"
  ].join(";");

  cerrar.addEventListener("click", () => contenedor.remove());
  contenedor.append(titulo, detalle, cerrar);
  document.body?.appendChild(contenedor);

  window.setTimeout(() => {
    contenedor.remove();
  }, 5000);
}

async function obtenerRestriccionPagina() {
  const actual = buscarNodo(
    UBICACIONES_ACADEMIA,
    rutaActualRelativa()
  );

  const nivelMinimo = String(actual?.nivelMinimo || "")
    .trim()
    .toLowerCase();

  if (!Object.prototype.hasOwnProperty.call(NIVELES_ACCESO, nivelMinimo)) {
    return null;
  }

  const { ContextoUsuario } = await import("./contexto-usuario.js");
  const nivelActual = String(
    await ContextoUsuario.obtenerNivelAcceso()
  ).trim().toLowerCase();

  if (
    (NIVELES_ACCESO[nivelActual] || 0) >=
    NIVELES_ACCESO[nivelMinimo]
  ) {
    return null;
  }

  return {
    titulo: String(actual?.titulo || "esta sección").trim(),
    destino: construirRutaAcademia(actual?.volver || "")
  };
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
    const restriccion = await obtenerRestriccionPagina();

    if (restriccion) {
      registrarAvisoAccesoDenegado(restriccion.titulo);
      window.location.replace(restriccion.destino);
      return null;
    }
  } catch (error) {
    console.error("No se pudo verificar el nivel de acceso de la página.", error);
    window.location.replace(construirRutaAcademia(""));
    return null;
  }

  await activarTimeoutSesion({ loginUrl });
  document.documentElement.style.visibility = "visible";

  mostrarAvisoAccesoDenegado(
    consumirAvisoAccesoDenegado()
  );

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
