/* Academia de Gloria Valentina | auth-guard.js */

import { observarSesion } from "../firebase/firebase-auth.js";

export function protegerPagina({
  loginUrl = "/academia-gloria/login.html",
  onAuthenticated = null
} = {}) {
  document.documentElement.style.visibility = "hidden";

  return observarSesion((usuario) => {
    if (!usuario) {
      window.location.replace(loginUrl);
      return;
    }

    document.documentElement.style.visibility = "visible";

    if (typeof onAuthenticated === "function") {
      onAuthenticated(usuario);
    }
  });
}
