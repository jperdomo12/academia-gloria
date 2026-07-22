/* Academia de Gloria Valentina | sesion.js */

import {
  cerrarSesion,
  observarSesion
} from "../firebase/firebase-auth.js";

export function activarBotonSalir({
  selector = "[data-cerrar-sesion]",
  loginUrl = "/academia-gloria/login.html"
} = {}) {
  const boton = document.querySelector(selector);
  if (!boton) return;

  boton.addEventListener("click", async () => {
    boton.disabled = true;

    try {
      await cerrarSesion();
      window.location.replace(loginUrl);
    } catch (error) {
      console.error(error);
      boton.disabled = false;
      alert("No se pudo cerrar la sesión.");
    }
  });
}

export function mostrarUsuario({
  selector = "[data-usuario-email]"
} = {}) {
  const elemento = document.querySelector(selector);
  if (!elemento) return;

  return observarSesion((usuario) => {
    elemento.textContent = usuario?.email || "";
  });
}
