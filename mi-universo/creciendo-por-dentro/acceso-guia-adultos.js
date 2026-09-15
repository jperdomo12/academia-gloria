import { auth } from "../../compartido/firebase/firebase-config.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";

async function configurarAccesoGuia() {
  const enlace = document.getElementById("adultGuideLink");
  if (!enlace) return;

  await auth.authStateReady();
  if (!auth.currentUser) return;

  try {
    const contexto = await ContextoUsuario.inicializar();
    const esAlumno = Array.isArray(contexto?.roles)
      && contexto.roles.some(rol => String(rol?.roleId || "").trim().toLowerCase() === "alumno");

    enlace.classList.toggle("hidden", esAlumno);
  } catch (error) {
    console.warn("[CreciendoPorDentro] No se pudo resolver acceso a la guía para adultos.", error);
    enlace.classList.add("hidden");
  }
}

configurarAccesoGuia();
