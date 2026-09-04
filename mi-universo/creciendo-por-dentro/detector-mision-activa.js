/* Academia Gloria Valentina · Creciendo por Dentro
 * Evita que una Semilla asociada a una Misión activa se practique libremente
 * por error. Practicar libremente sigue siendo una opción válida.
 */

import { Academia } from "../../compartido/api/academia.js";
import { auth } from "../../compartido/firebase/firebase-config.js";

const ESTADOS_ACTIVOS = new Set([
  "pendiente",
  "asignada",
  "en_curso",
  "necesita_ayuda"
]);

function texto(valor = "") {
  return String(valor ?? "").trim();
}

function idsSemillas(tarea = {}) {
  const filtros = tarea.criterioCumplimiento?.filtros || {};
  return Array.isArray(filtros.semillasIds)
    ? filtros.semillasIds.map(texto).filter(Boolean)
    : [];
}

function esMisionActivaSemillas(tarea = {}) {
  const criterio = tarea.criterioCumplimiento || {};
  const progreso = tarea.progreso || {};
  const objetivo = Math.max(1, Number(criterio.cantidadObjetivo || 1));
  const actual = Math.max(0, Number(progreso.cantidadActual || 0));

  return Boolean(
    tarea.id &&
    tarea.visibleParaAlumno !== false &&
    tarea.modulo === "creciendo-por-dentro" &&
    criterio.evidenciaTipo === "semilla_completada" &&
    ESTADOS_ACTIVOS.has(texto(tarea.estado)) &&
    actual < objetivo
  );
}

function incluyeSemilla(tarea, semillaId) {
  const permitidas = idsSemillas(tarea);
  return !permitidas.length || permitidas.includes(texto(semillaId));
}

function tituloMision(tarea = {}) {
  return texto(
    tarea.presentacionAlumno?.tituloMision ||
    tarea.titulo ||
    "Misión de Creciendo por Dentro"
  );
}

function abrirMision(tarea) {
  const destino = new URL(window.location.href);
  destino.search = "";
  destino.hash = "";
  destino.searchParams.set("misionId", texto(tarea.id));
  window.location.assign(destino.href);
}

function instalarAviso(misiones) {
  document.addEventListener("click", event => {
    const boton = event.target?.closest?.("[data-start-seed]");
    if (!boton) return;

    if (new URLSearchParams(window.location.search).get("misionId")) return;

    const candidatas = misiones.filter(tarea =>
      incluyeSemilla(tarea, boton.dataset.startSeed)
    );

    if (!candidatas.length) return;

    if (candidatas.length > 1) {
      const irACamino = window.confirm(
        `🌟 Esta Semilla forma parte de ${candidatas.length} Misiones pendientes.\n\n` +
        "Para que la práctica cuente en la Misión correcta, entra desde Mi Camino.\n\n" +
        "Aceptar: ir a Mi Camino.\n" +
        "Cancelar: practicar libremente."
      );

      if (!irACamino) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(new URL("../mi-camino/", window.location.href).href);
      return;
    }

    const tarea = candidatas[0];
    const continuarMision = window.confirm(
      "🌟 Esta Semilla forma parte de una Misión que tienes pendiente.\n\n" +
      `“${tituloMision(tarea)}”\n\n` +
      "Aceptar: continuar la Misión para que esta práctica cuente.\n" +
      "Cancelar: practicar libremente."
    );

    if (!continuarMision) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    abrirMision(tarea);
  }, true);
}

async function iniciar() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("misionId")) return;

  try {
    await auth.authStateReady();
    if (!auth.currentUser) return;

    const tareas = await Academia.tareas.leer();
    instalarAviso(tareas.filter(esMisionActivaSemillas));
  } catch (error) {
    console.debug(
      "[CreciendoPorDentro] No se pudo comprobar si hay Misiones activas de Semillas.",
      error
    );
  }
}

iniciar();
