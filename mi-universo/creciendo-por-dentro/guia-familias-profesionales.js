import { auth } from "../../compartido/firebase/firebase-config.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";

const main = document.getElementById("guideMain");
const toggleAll = document.getElementById("toggleAllSeeds");

function esRolAlumno(contexto) {
  return Array.isArray(contexto?.roles)
    ? contexto.roles.some(rol => String(rol?.roleId || "").trim().toLowerCase() === "alumno")
    : true;
}

async function initializeGuide() {
  await auth.authStateReady();

  if (!auth.currentUser) {
    window.location.replace("/academia-gloria/login.html");
    return;
  }

  const contexto = await ContextoUsuario.inicializar();

  if (esRolAlumno(contexto)) {
    window.location.replace("./index.html");
    return;
  }

  main?.classList.remove("hidden");
}

function updateToggleLabel() {
  if (!toggleAll) return;
  const details = [...document.querySelectorAll(".guide-seed")];
  const allOpen = details.length > 0 && details.every(item => item.open);
  toggleAll.textContent = allOpen ? "Cerrar todas" : "Abrir todas";
}

toggleAll?.addEventListener("click", () => {
  const details = [...document.querySelectorAll(".guide-seed")];
  const allOpen = details.length > 0 && details.every(item => item.open);
  details.forEach(item => { item.open = !allOpen; });
  updateToggleLabel();
});

document.querySelectorAll(".guide-seed").forEach(item => {
  item.addEventListener("toggle", updateToggleLabel);
});

initializeGuide().catch(error => {
  console.error("[GuiaSemillas] No se pudo validar el acceso.", error);
  window.location.replace("./index.html");
});
