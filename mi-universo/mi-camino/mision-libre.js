/* Academia Gloria Valentina · Mi Camino · Finalización manual de Misiones */

import "./reconocimientos-camino.js";
import { Academia } from "../../compartido/api/academia.js";

const SELECTOR_LISTAS = "#listaHoy, #listaRevision, #listaPasadas";
const RUTA_FALLBACK_LIBRE = new URL("../", window.location.href).pathname;

function cargarEstilosFinalizacionManual() {
  if (document.querySelector('link[data-finalizacion-manual-css="true"]')) return;

  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./mision-finalizacion-manual.css", import.meta.url).href;
  enlace.dataset.finalizacionManualCss = "true";
  document.head.appendChild(enlace);
}

function texto(valor = "") {
  return String(valor || "").replace(/\s+/g, " ").trim();
}

function esEnlaceLibreSinActividad(enlace) {
  if (!(enlace instanceof HTMLAnchorElement)) return false;
  if (!enlace.matches("a.mision[data-iniciar-mision]")) return false;

  const meta = texto(enlace.querySelector(".mision__meta")?.textContent);
  if (!meta.includes("Otras aventuras")) return false;

  try {
    const destino = new URL(enlace.href, window.location.href);
    return destino.pathname === RUTA_FALLBACK_LIBRE;
  } catch {
    return false;
  }
}

function estadoEnCurso(card) {
  const estado = texto(card.querySelector(".mision__estado-bloque strong")?.textContent);
  return (
    estado.includes("Estoy haciendo") ||
    estado.includes("Con ayuda") ||
    estado.includes("Puedo retomarla")
  );
}

function crearAccionManual(original, id, enCurso) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.dataset.misionLibre = id;
  boton.dataset.accionLibre = enCurso ? "terminar" : "iniciar";

  if (!enCurso) {
    boton.className = `${original?.className || "mision__accion"} mision__accion--libre`;
    boton.textContent = "Comenzar misión →";
    return boton;
  }

  boton.className = "mision__accion mision__accion--finalizacion-manual";
  boton.textContent = "✅ Ya terminé";

  const cierre = document.createElement("div");
  cierre.className = "mision__cierre-manual";

  const ayuda = document.createElement("span");
  ayuda.className = "mision__cierre-manual-texto";
  ayuda.textContent = "Cuando termines esta misión, indícalo aquí.";

  cierre.append(ayuda, boton);
  return cierre;
}

function convertirMisionActiva(enlace) {
  if (!esEnlaceLibreSinActividad(enlace)) return;

  const id = texto(enlace.dataset.iniciarMision);
  if (!id) return;

  const article = document.createElement("article");
  article.className = `${enlace.className} mision--libre`;
  article.dataset.misionLibreCard = id;
  article.innerHTML = enlace.innerHTML;

  const accionOriginal = article.querySelector(".mision__accion");
  const accion = crearAccionManual(accionOriginal, id, estadoEnCurso(article));
  accionOriginal?.replaceWith(accion);

  enlace.replaceWith(article);
}

function normalizarCierreAcademico(cierre) {
  if (!(cierre instanceof HTMLElement)) return;
  if (cierre.classList.contains("mision__cierre-manual")) return;

  const ayuda = cierre.querySelector(".mision__finalizacion-pregunta");
  const boton = cierre.querySelector("[data-terminar-repaso]");
  if (!boton) return;

  cierre.className = "mision__cierre-manual";

  if (ayuda) {
    ayuda.className = "mision__cierre-manual-texto";
    ayuda.textContent = "Cuando termines esta misión, indícalo aquí.";
  }

  boton.className = "mision__accion mision__accion--finalizacion-manual";
  boton.textContent = "✅ Ya terminé";
}

function esCardLibreSinEvidencia(card) {
  if (!(card instanceof HTMLElement)) return false;
  const meta = texto(card.querySelector(".mision__meta")?.textContent);
  return meta.includes("Otras aventuras");
}

function protegerTrabajoNoDigital(card) {
  if (!esCardLibreSinEvidencia(card)) return;

  const boton = card.querySelector("[data-ver-trabajo]");
  if (!boton) return;

  const espera = card.classList.contains("mision--revision");
  const estado = document.createElement("span");
  estado.className = "mision__accion mision__accion--libre-estado";
  estado.textContent = espera
    ? "⏳ En revisión familiar"
    : "✅ Misión conseguida";
  boton.replaceWith(estado);
}

function aplicarProtecciones(contenedor = document) {
  contenedor
    .querySelectorAll?.("a.mision[data-iniciar-mision]")
    .forEach(convertirMisionActiva);

  contenedor
    .querySelectorAll?.(".mision--academica .mision__finalizacion")
    .forEach(normalizarCierreAcademico);

  contenedor
    .querySelectorAll?.(".mision--revision, .mision--completada")
    .forEach(protegerTrabajoNoDigital);
}

async function cambiarEstado(id, estado, boton, mensajeError) {
  const textoOriginal = boton.textContent;
  boton.disabled = true;
  boton.textContent = estado === "en_curso" ? "Iniciando..." : "Guardando...";

  try {
    await Academia.tareas.cambiarEstado(id, estado);
    return true;
  } catch (error) {
    console.error(mensajeError, error);
    boton.disabled = false;
    boton.textContent = textoOriginal;
    window.alert(
      `${mensajeError}\nRazón: ${error.message || "Error no identificado"}`
    );
    return false;
  }
}

async function ejecutarAccionLibre(boton) {
  const id = texto(boton.dataset.misionLibre);
  const accion = boton.dataset.accionLibre;
  if (!id) return;

  if (accion === "iniciar") {
    await cambiarEstado(
      id,
      "en_curso",
      boton,
      "No se pudo iniciar la Misión libre."
    );
    return;
  }

  if (accion === "terminar") {
    const confirmado = window.confirm(
      "¿Terminaste esta misión?\n\n" +
      "Si confirmas, la enviaremos a tu familia para su revisión."
    );
    if (!confirmado) return;

    await cambiarEstado(
      id,
      "pendiente_validacion",
      boton,
      "No se pudo enviar la Misión libre a revisión."
    );
  }
}

async function ejecutarCierreAcademico(boton) {
  const id = texto(boton.dataset.terminarRepaso);
  if (!id) return;

  const confirmado = window.confirm(
    "¿Terminaste esta misión?\n\n" +
    "Si confirmas, la enviaremos a tu familia para su revisión."
  );
  if (!confirmado) return;

  await cambiarEstado(
    id,
    "pendiente_validacion",
    boton,
    "No se pudo enviar la Misión a revisión."
  );
}

function observarListas() {
  cargarEstilosFinalizacionManual();

  document.querySelectorAll(SELECTOR_LISTAS).forEach(lista => {
    aplicarProtecciones(lista);

    new MutationObserver(() => {
      aplicarProtecciones(lista);
    }).observe(lista, {
      childList: true,
      subtree: true
    });
  });
}

document.addEventListener("click", event => {
  const boton = event.target.closest?.("[data-mision-libre]");
  if (!boton) return;
  event.preventDefault();
  ejecutarAccionLibre(boton);
});

document.addEventListener("click", event => {
  const boton = event.target.closest?.("[data-terminar-repaso]");
  if (!boton) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  ejecutarCierreAcademico(boton);
}, true);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", observarListas, { once: true });
} else {
  observarListas();
}
