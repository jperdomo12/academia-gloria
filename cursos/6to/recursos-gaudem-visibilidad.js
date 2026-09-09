import { obtenerPerfil } from "../../compartido/js/perfil-usuario.js";

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

export async function aplicarVisibilidadRecursosGaudem() {
  const bloques = [...document.querySelectorAll("[data-recurso-gaudem]")];
  if (!bloques.length) return;

  const perfil = await obtenerPerfil();
  const visible = puedeVerRecursosGaudem(perfil);

  bloques.forEach(bloque => {
    bloque.hidden = !visible;
  });
}

aplicarVisibilidadRecursosGaudem().catch(error => {
  console.warn("No se pudo resolver la visibilidad de los recursos oficiales de Gaudem.", error);
});
