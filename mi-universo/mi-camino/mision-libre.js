/* Academia Gloria Valentina · Mi Camino · Flujo de Misión libre */

import { Academia } from "../../compartido/api/academia.js";

const SELECTOR_LISTAS = "#listaHoy, #listaRevision, #listaPasadas";
const RUTA_FALLBACK_LIBRE = new URL("../", window.location.href).pathname;

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

function crearBotonAccion(original, id, enCurso) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = `${original?.className || "mision__accion"} mision__accion--libre`;
  boton.dataset.misionLibre = id;
  boton.dataset.accionLibre = enCurso ? "terminar" : "iniciar";
  boton.textContent = enCurso
    ? "✅ Ya terminé esta misión"
    : "Comenzar misión →";
  return boton;
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
  const boton = crearBotonAccion(accionOriginal, id, estadoEnCurso(article));
  accionOriginal?.replaceWith(boton);

  enlace.replaceWith(article);
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
    .querySelectorAll?.(".mision--revision, .mision--completada")
    .forEach(protegerTrabajoNoDigital);
}

async function cambiarEstado(id, estado, boton, mensajeError) {
  const textoOriginal = boton.textContent;
  boton.disabled = true;
  boton.textContent = estado === "en_curso" ? "Iniciando..." : "Guardando...";

  try {
    await Academia.tareas.cambiarEstado(id, estado);
  } catch (error) {
    console.error(mensajeError, error);
    boton.disabled = false;
    boton.textContent = textoOriginal;
    window.alert(
      `${mensajeError}\nRazón: ${error.message || "Error no identificado"}`
    );
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
      "Al confirmar, la enviarás a tu familia para revisión."
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

function observarListas() {
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", observarListas, { once: true });
} else {
  observarListas();
}
