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

function obtenerBloquesGaudem() {
  const candidatos = document.querySelectorAll(
    "[data-recurso-gaudem], .portal-recursos-oficiales"
  );

  return [...new Set(
    [...candidatos].map(elemento => elemento.closest("section") || elemento)
  )];
}

export async function aplicarVisibilidadRecursosGaudem() {
  const bloques = obtenerBloquesGaudem();
  if (!bloques.length) return;

  bloques.forEach(bloque => {
    bloque.hidden = true;
  });

  const perfil = await obtenerPerfil();
  const visible = puedeVerRecursosGaudem(perfil);

  bloques.forEach(bloque => {
    bloque.hidden = !visible;
  });
}
