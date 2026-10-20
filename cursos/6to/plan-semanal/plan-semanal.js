import { MATERIALES_PLAN, urlMaterial, etiquetaSemana, organizarSemanas } from "./materiales.js";

function elemento(etiqueta, clase, texto) {
  const nodo = document.createElement(etiqueta);
  if (clase) nodo.className = clase;
  if (texto) nodo.textContent = texto;
  return nodo;
}

function tarjeta(material) {
  const enlace = elemento("a", "curso6-asignatura curso6-asignatura--activa plan-tarjeta");
  enlace.href = urlMaterial(material.ruta);
  enlace.append(
    elemento("span", "curso6-chip", `${material.icono || "📄"} ${[material.materia, material.tema].filter(Boolean).join(" · ") || "Material del colegio"}`),
    elemento("h3", "", material.titulo),
    elemento("p", "curso6-asignatura__texto", material.descripcion),
    elemento("p", "plan-procedencia", material.procedencia),
    elemento("span", "curso6-asignatura__accion", "Abrir actividad →")
  );
  return enlace;
}

function semana(datos, prefijo, plegada = false) {
  const bloque = elemento(plegada ? "details" : "section", "curso6-seccion plan-semana");
  const cabecera = elemento(plegada ? "summary" : "h2", "plan-fecha", `${prefijo}${etiquetaSemana(datos)}`);
  bloque.append(cabecera);
  const rejilla = elemento("div", "academia-grid-tarjetas curso6-asignaturas");
  datos.materiales.forEach(material => rejilla.append(tarjeta(material)));
  bloque.append(rejilla);
  return bloque;
}

const portal = document.querySelector("#semanasPlan");
if (portal) {
  const { actuales, anteriores, proximas } = organizarSemanas(MATERIALES_PLAN);
  portal.replaceChildren();
  actuales.forEach(s => portal.append(semana(s, "Semana · ")));
  // Si no hay material actual, no etiquetar una semana pasada como «Esta semana».
  if (!actuales.length) {
    portal.append(elemento("p", "plan-aviso", "No hay material seleccionado para esta semana. Puedes consultar las semanas disponibles."));
  }
  proximas.forEach(s => portal.append(semana(s, "Próxima semana · ", true)));
  if (anteriores.length) {
    portal.append(elemento("h2", "plan-anteriores", "Semanas anteriores"));
    anteriores.forEach(s => portal.append(semana(s, "", true)));
  }
  if (!MATERIALES_PLAN.length) portal.append(elemento("p", "plan-aviso", "El material aparecerá aquí cuando esté seleccionado."));
}

const asociados = document.querySelector("[data-plan-tema]");
if (asociados) {
  const materiales = MATERIALES_PLAN.filter(m => m.temaId === asociados.dataset.planTema)
    .sort((a, b) => b.inicio.localeCompare(a.inicio));
  for (const material of materiales) {
    const linea = elemento("p");
    const enlace = elemento("a", "", `${material.titulo} →`);
    enlace.href = urlMaterial(material.ruta);
    linea.append(elemento("span", "", `${etiquetaSemana(material)} · `), enlace);
    asociados.append(linea);
  }
}
