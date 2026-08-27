/******************************************************************************
 * Academia Gloria Valentina
 * Archivo: compartido/js/auth-guard.js
 * Protección de páginas autenticadas
 * Versión: 1.2
 *
 * Ajustes:
 * - Espera a que Firebase termine de restaurar la sesión antes de decidir
 *   si debe redirigir al login.
 * - Activa el timeout global de sesión configurado por inactividad.
 ******************************************************************************/

import { auth } from "../firebase/firebase-config.js";
import { observarSesion } from "../firebase/firebase-auth.js";
import { activarTimeoutSesion } from "./timeout-sesion.js";

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

  activarTimeoutSesion({ loginUrl });
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
