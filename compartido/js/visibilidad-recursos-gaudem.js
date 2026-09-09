import { obtenerPerfil } from "./perfil-usuario.js";

function normalizarCriterio(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export function puedeVerRecursosGaudem(perfil = {}) {
  const colegio = normalizarCriterio(perfil.colegio);
  const rol = normalizarCriterio(perfil.roleId || perfil.tipoUsuario);
  const esGaudem = colegio === "gaudem" || colegio === "colegio gaudem";

  return esGaudem && rol === "alumno";
}

export async function aplicarVisibilidadRecursosGaudem(raiz = document) {
  const bloques = Array.from(raiz.querySelectorAll("[data-recursos-gaudem]"));
  if (!bloques.length) return false;

  bloques.forEach(bloque => {
    bloque.hidden = true;
    bloque.style.setProperty("display", "none", "important");
  });

  try {
    const perfil = await obtenerPerfil();
    const visible = puedeVerRecursosGaudem(perfil);

    if (!visible) return false;

    bloques.forEach(bloque => {
      bloque.hidden = false;
      bloque.style.removeProperty("display");
    });

    return true;
  } catch (error) {
    console.warn("No se pudo resolver la visibilidad de los recursos de Gaudem.", error);
    return false;
  }
}

aplicarVisibilidadRecursosGaudem().catch(error => {
  console.warn("No se pudo aplicar la visibilidad de los recursos de Gaudem.", error);
});
