/* Academia Gloria Valentina · Mi Camino · Crecimiento visual real */

import { observarTareasCamino } from "./tareas-camino.js";
import { observarConfiguracionMiCamino } from "../../compartido/api/mi-camino-config.js";
import {
  CONFIGURACION_CRECIMIENTO_PREDETERMINADA,
  resumirCrecimiento
} from "../../compartido/modelos/mi-camino-crecimiento.js";

let detenerObservacionTareas = null;
let detenerObservacionConfiguracion = null;
let tareasActuales = [];
let configuracionActual = CONFIGURACION_CRECIMIENTO_PREDETERMINADA;

function cargarEstilos() {
  if (document.querySelector('link[data-crecimiento-camino-css="true"]')) return;

  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./crecimiento-camino.css", import.meta.url).href;
  enlace.dataset.crecimientoCaminoCss = "true";
  document.head.appendChild(enlace);
}

function mensajeProximoPaso(resumen) {
  const { siguiente, progreso } = resumen;

  if (!siguiente) {
    return "Tu árbol está lleno de frutos y tu camino puede seguir creciendo contigo.";
  }

  if (progreso >= 85) {
    return `¡Ya estás muy cerca de ${siguiente.nombre}!`;
  }

  if (progreso >= 60) {
    return `Vas acercándote a ${siguiente.nombre}.`;
  }

  return `Cada Misión real te acerca a ${siguiente.nombre}.`;
}

function asegurarBloqueProgreso(contenido) {
  let bloque = contenido.querySelector("[data-crecimiento-progreso]");
  if (bloque) return bloque;

  bloque = document.createElement("div");
  bloque.className = "crecimiento-arbol__progreso";
  bloque.dataset.crecimientoProgreso = "true";
  bloque.innerHTML = `
    <div class="crecimiento-arbol__progreso-meta">
      <span data-crecimiento-misiones></span>
      <strong data-crecimiento-siguiente></strong>
    </div>
    <div
      class="crecimiento-arbol__barra"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow="0"
    >
      <span data-crecimiento-barra></span>
    </div>
    <small>
      Las Misiones de prueba no cuentan. El ritmo de cada persona puede ser diferente.
    </small>
  `;

  const etapas = contenido.querySelector(".crecimiento-arbol__etapas");
  if (etapas) contenido.insertBefore(bloque, etapas);
  else contenido.appendChild(bloque);

  return bloque;
}

function renderEtapas(contenedor, resumen) {
  contenedor.innerHTML = resumen.etapas.map((etapa, indice) => `
    <span
      class="${indice === resumen.indice ? "actual" : ""} ${indice < resumen.indice ? "superada" : ""}"
      ${indice === resumen.indice ? 'aria-current="step"' : ""}
    >
      ${etapa.icono} ${etapa.nombre}
    </span>
  `).join("");
}

function renderCrecimiento() {
  const seccion = document.querySelector(".crecimiento--arbol");
  if (!seccion) return;

  const visual = seccion.querySelector(".crecimiento-arbol__visual");
  const contenido = seccion.querySelector(".crecimiento-arbol__contenido");
  const eyebrow = contenido?.querySelector(".crecimiento-arbol__eyebrow");
  const titulo = contenido?.querySelector("h3");
  const mensaje = contenido?.querySelector("p");
  const etapas = contenido?.querySelector(".crecimiento-arbol__etapas");

  if (!visual || !contenido || !eyebrow || !titulo || !mensaje || !etapas) {
    return;
  }

  const resumen = resumirCrecimiento(tareasActuales, configuracionActual);
  const { etapa } = resumen;

  seccion.dataset.etapaCrecimiento = etapa.id;
  seccion.setAttribute("aria-label", `Etapa actual de Mi Camino: ${etapa.nombre}`);

  visual.innerHTML = "";
  visual.removeAttribute("aria-hidden");

  const imagen = document.createElement("img");
  imagen.className = "crecimiento-arbol__imagen";
  imagen.src = new URL(
    `../../assets/imagenes/mi-camino/crecimiento/${etapa.imagenArchivo}`,
    import.meta.url
  ).href;
  imagen.alt = `Ilustración de la etapa ${etapa.nombre}`;
  imagen.loading = "eager";
  imagen.addEventListener("error", () => {
    visual.innerHTML = `<span class="crecimiento-arbol__fallback" aria-hidden="true">${etapa.icono}</span>`;
  }, { once: true });
  visual.appendChild(imagen);

  eyebrow.textContent = `Etapa actual · ${etapa.icono} ${etapa.nombre}`;
  titulo.textContent = etapa.titulo;
  mensaje.textContent = etapa.mensaje;

  renderEtapas(etapas, resumen);

  const progreso = asegurarBloqueProgreso(contenido);
  const misiones = progreso.querySelector("[data-crecimiento-misiones]");
  const siguiente = progreso.querySelector("[data-crecimiento-siguiente]");
  const barra = progreso.querySelector("[data-crecimiento-barra]");
  const barraContenedor = progreso.querySelector(".crecimiento-arbol__barra");

  if (misiones) {
    misiones.textContent =
      `✅ ${resumen.misionesReales} ${resumen.misionesReales === 1 ? "Misión real completada" : "Misiones reales completadas"}`;
  }

  if (siguiente) siguiente.textContent = mensajeProximoPaso(resumen);
  if (barra) barra.style.width = `${resumen.progreso.toFixed(1)}%`;
  if (barraContenedor) {
    barraContenedor.setAttribute("aria-valuenow", String(Math.round(resumen.progreso)));
    barraContenedor.setAttribute(
      "aria-label",
      resumen.siguiente
        ? `Progreso hacia ${resumen.siguiente.nombre}`
        : "Etapa visual máxima actual alcanzada"
    );
  }
}

function iniciar() {
  cargarEstilos();

  detenerObservacionTareas?.();
  detenerObservacionConfiguracion?.();

  detenerObservacionTareas = observarTareasCamino(
    tareas => {
      tareasActuales = Array.isArray(tareas) ? tareas : [];
      renderCrecimiento();
    },
    error => {
      console.warn("No se pudo actualizar el crecimiento de Mi Camino.", error);
    }
  );

  detenerObservacionConfiguracion = observarConfiguracionMiCamino(
    resultado => {
      configuracionActual = resultado.configuracion;
      renderCrecimiento();
    },
    error => {
      console.debug(
        "Mi Camino continuará con su configuración predeterminada hasta que la configuración global esté disponible.",
        error
      );
    }
  );

  window.addEventListener("beforeunload", () => {
    detenerObservacionTareas?.();
    detenerObservacionConfiguracion?.();
  }, { once: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
