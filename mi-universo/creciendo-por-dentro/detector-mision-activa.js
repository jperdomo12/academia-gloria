/* Academia Gloria Valentina · Creciendo por Dentro
 * Detecta cuando una Semilla elegida en exploración libre forma parte de una
 * Misión activa y ofrece continuar la Misión antes de iniciar la práctica.
 */

import { Academia } from "../../compartido/api/academia.js";
import { auth } from "../../compartido/firebase/firebase-config.js";

const ESTADOS_ACTIVOS = new Set([
  "pendiente",
  "asignada",
  "en_curso",
  "necesita_ayuda"
]);

let misionesActivas = [];
let instalado = false;

function texto(valor = "") {
  return String(valor ?? "").trim();
}

function idsSemillasMision(tarea = {}) {
  const filtros = tarea.criterioCumplimiento?.filtros || {};
  return Array.isArray(filtros.semillasIds)
    ? filtros.semillasIds.map(texto).filter(Boolean)
    : [];
}

function objetivoPendiente(tarea = {}) {
  const criterio = tarea.criterioCumplimiento || {};
  const progreso = tarea.progreso || {};
  const objetivo = Math.max(1, Number(criterio.cantidadObjetivo || 1));
  const actual = Math.max(0, Number(progreso.cantidadActual || 0));
  return actual < objetivo;
}

function esMisionActivaDeSemillas(tarea = {}) {
  const criterio = tarea.criterioCumplimiento || {};

  return Boolean(
    tarea.id &&
    tarea.visibleParaAlumno !== false &&
    tarea.modulo === "creciendo-por-dentro" &&
    criterio.evidenciaTipo === "semilla_completada" &&
    ESTADOS_ACTIVOS.has(texto(tarea.estado)) &&
    objetivoPendiente(tarea)
  );
}

function misionesParaSemilla(semillaId) {
  const id = texto(semillaId);
  if (!id) return [];

  return misionesActivas.filter(tarea => {
    const permitidas = idsSemillasMision(tarea);
    return !permitidas.length || permitidas.includes(id);
  });
}

function tituloMision(tarea = {}) {
  return texto(
    tarea.presentacionAlumno?.tituloMision ||
    tarea.titulo ||
    "Misión de Creciendo por Dentro"
  );
}

function urlMision(tarea, semillaId) {
  const destino = new URL(window.location.href);
  destino.search = "";
  destino.hash = "";
  destino.searchParams.set("misionId", texto(tarea.id));
  destino.searchParams.set("semillaId", texto(semillaId));
  return destino.href;
}

function urlMiCamino() {
  return new URL("../mi-camino/", window.location.href).href;
}

function confirmarContinuacionMision(tarea, semillaId) {
  const continuar = window.confirm(
    "🌟 Esta Semilla forma parte de una Misión que tienes pendiente.\n\n" +
    `“${tituloMision(tarea)}”\n\n` +
    "Aceptar: continuar la Misión para que esta práctica cuente.\n" +
    "Cancelar: practicar libremente."
  );

  if (!continuar) return false;
  window.location.assign(urlMision(tarea, semillaId));
  return true;
}

function confirmarVariasMisiones(cantidad) {
  const continuar = window.confirm(
    `🌟 Esta Semilla forma parte de ${cantidad} Misiones pendientes.\n\n` +
    "Para que la práctica cuente en la Misión correcta, entra desde Mi Camino.\n\n" +
    "Aceptar: ir a Mi Camino.\n" +
    "Cancelar: practicar libremente."
  );

  if (!continuar) return false;
  window.location.assign(urlMiCamino());
  return true;
}

function instalarIntercepcion() {
  if (instalado) return;
  instalado = true;

  document.addEventListener("click", event => {
    const boton = event.target?.closest?.("[data-start-seed]");
    if (!boton) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("misionId")) return;

    const semillaId = texto(boton.dataset.startSeed);
    const candidatas = misionesParaSemilla(semillaId);
    if (!candidatas.length) return;

    const redirigido = candidatas.length === 1
      ? confirmarContinuacionMision(candidatas[0], semillaId)
      : confirmarVariasMisiones(candidatas.length);

    if (!redirigido) return;

    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
}

function abrirSemillaContextualSiCorresponde() {
  const params = new URLSearchParams(window.location.search);
  const misionId = texto(params.get("misionId"));
  const semillaId = texto(params.get("semillaId"));
  if (!misionId || !semillaId) return;

  let terminado = false;

  const intentar = () => {
    if (terminado) return true;

    const catalogo = document.getElementById("catalogPanel");
    if (!catalogo || catalogo.classList.contains("hidden")) return false;

    const boton = [...catalogo.querySelectorAll("[data-start-seed]")]
      .find(item => texto(item.dataset.startSeed) === semillaId);

    if (!boton) return false;

    terminado = true;
    boton.click();
    return true;
  };

  if (intentar()) return;

  const observador = new MutationObserver(() => {
    if (intentar()) observador.disconnect();
  });

  observador.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"]
  });

  window.setTimeout(() => observador.disconnect(), 5000);
}

async function cargarMisionesActivas() {
  try {
    await auth.authStateReady();
    if (!auth.currentUser) return;

    const tareas = await Academia.tareas.leer();
    misionesActivas = tareas.filter(esMisionActivaDeSemillas);
    instalarIntercepcion();
  } catch (error) {
    console.debug(
      "[CreciendoPorDentro] No se pudo comprobar si hay Misiones activas de Semillas.",
      error
    );
  }
}

abrirSemillaContextualSiCorresponde();
cargarMisionesActivas();
