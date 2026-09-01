/* Academia Gloria Valentina · Recompensas A1/A2 · Mi Camino */

import { Reconocimientos } from "../../compartido/api/reconocimientos.js";

const PASO_HISTORIA = 5;

let instalada = false;
let detenerObservacion = null;
let reconocimientosActuales = [];
let cantidadHistoriaVisible = PASO_HISTORIA;

function texto(valor = "") {
  return String(valor ?? "").replace(/\s+/g, " ").trim();
}

function escapar(valor = "") {
  return String(valor ?? "").replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caracter]);
}

function fechaJs(valor) {
  if (!valor) return null;
  if (typeof valor?.toDate === "function") return valor.toDate();
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}

function formatearFecha(valor) {
  const fecha = fechaJs(valor);
  if (!fecha) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(fecha);
}

function cargarEstilos() {
  if (document.querySelector('link[data-reconocimientos-camino-css="true"]')) return;
  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./reconocimientos-camino.css", import.meta.url).href;
  enlace.dataset.reconocimientosCaminoCss = "true";
  document.head.appendChild(enlace);
}

function localizarBloqueCrecimiento() {
  const titulo = [...document.querySelectorAll(".seccion-titulo h2")]
    .find(item => texto(item.textContent) === "Así voy creciendo");
  if (!titulo) return null;

  const cabecera = titulo.closest(".seccion-titulo");
  if (!cabecera) return null;

  let siguiente = cabecera.nextElementSibling;
  while (siguiente && !siguiente.matches(".crecimiento--arbol")) {
    siguiente = siguiente.nextElementSibling;
  }

  return siguiente || null;
}

function asegurarHost() {
  let host = document.getElementById("recompensasA1Camino");
  if (host) return host;

  const crecimiento = localizarBloqueCrecimiento();
  if (!crecimiento?.parentElement) return null;

  host = document.createElement("section");
  host.id = "recompensasA1Camino";
  host.className = "recompensas-a1";
  host.setAttribute("aria-label", "Reconocimientos de Mi Camino");
  crecimiento.parentElement.insertBefore(host, crecimiento);
  return host;
}

function reconocimientoVisible(item = {}) {
  return item.estado === "activo" && item.visibleAlumno !== false;
}

function origenVisible(item = {}) {
  if (item.tipo === "record_personal") return "🏅 Nueva mejor marca";
  if (item.tipo === "guacamaya") return `🦜 ${texto(item.guacamayaNombre) || "Un hito especial"}`;
  if (item.origen === "humano") return "💛 Mi familia reconoce";
  return "✨ Lía observó";
}

function iconoVisible(item = {}) {
  if (item.tipo === "record_personal") return "🏅";
  if (item.tipo === "guacamaya") return "🦜";
  return item.origen === "humano" ? "💛" : "✨";
}

function metaFuente(item = {}) {
  if (item.fuenteEliminada === true) {
    return texto(item.fuenteSnapshot?.titulo) || texto(item.titulo) || "Momento de mi camino";
  }
  return texto(item.titulo) || "Momento de mi camino";
}

function urlFuente(item, fuente) {
  if (item.fuenteEliminada === true) return "";
  const misionId = texto(item.fuentePrincipal?.misionId);
  if (!misionId) return "";

  const volver = `${window.location.pathname}${window.location.search}`;
  const parametros = new URLSearchParams({
    misionId,
    fuente,
    desde: "reconocimiento",
    volver
  });

  return `../mis-tareas/?${parametros.toString()}`;
}

function accionesFuente(item = {}) {
  const verMision = urlFuente(item, "detalle");
  const verTrabajo = urlFuente(item, "trabajo");
  if (!verMision && !verTrabajo) return "";

  return `
    <div class="recompensas-a1__fuentes">
      ${verMision ? `<a href="${escapar(verMision)}">👁️ Ver misión</a>` : ""}
      ${verTrabajo ? `<a href="${escapar(verTrabajo)}">📖 Ver trabajo realizado</a>` : ""}
    </div>
  `;
}

function renderItemHistoria(item) {
  return `
    <article class="recompensas-a1__item">
      <span class="recompensas-a1__item-icono" aria-hidden="true">${iconoVisible(item)}</span>
      <div>
        <strong>${escapar(metaFuente(item))}</strong>
        <p>${escapar(item.mensaje || "")}</p>
        <small>${escapar(origenVisible(item))} · ${escapar(formatearFecha(item.fechaReconocimiento))}</small>
        ${accionesFuente(item)}
      </div>
    </article>
  `;
}

function renderGuacamayas(items = []) {
  const guacamayas = items.filter(item => item.tipo === "guacamaya");

  if (!guacamayas.length) {
    return `
      <section class="recompensas-a2__guacamayas recompensas-a2__guacamayas--vacio">
        <div>
          <span class="recompensas-a2__titulo">🦜 Mis Guacamayas</span>
          <p>Las Guacamayas aparecen en momentos especiales de tu camino. No tienes que buscarlas: llegan cuando algo importante merece ser recordado.</p>
        </div>
      </section>
    `;
  }

  return `
    <section class="recompensas-a2__guacamayas">
      <div class="recompensas-a2__guacamayas-cabecera">
        <span class="recompensas-a2__titulo">🦜 Mis Guacamayas</span>
        <small>Hitos especiales que ya forman parte de tu historia.</small>
      </div>
      <div class="recompensas-a2__guacamayas-lista">
        ${guacamayas.map(item => `
          <article class="recompensas-a2__guacamaya">
            <span class="recompensas-a2__guacamaya-icono" aria-hidden="true">🦜</span>
            <div>
              <strong>${escapar(texto(item.guacamayaNombre) || "Guacamaya")}</strong>
              <p>${escapar(item.mensaje || item.guacamayaDescripcion || "")}</p>
              <small>📅 ${escapar(formatearFecha(item.fechaGuacamaya || item.fechaReconocimiento))}</small>
              ${accionesFuente(item)}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function render(items = [], { reiniciarPaginacion = false } = {}) {
  const host = asegurarHost();
  if (!host) return;

  const historiaAbierta = Boolean(
    host.querySelector(".recompensas-a1__historia")?.open
  );

  reconocimientosActuales = items.filter(reconocimientoVisible);
  if (reiniciarPaginacion) cantidadHistoriaVisible = PASO_HISTORIA;

  const ultimo = reconocimientosActuales[0] || null;

  if (!ultimo) {
    host.innerHTML = `
      <div class="recompensas-a1__vacio">
        💛 Mi Camino también guardará momentos que Lía o mi familia quieran reconocer.
        No tienes que conseguir premios: aquí iremos recordando lo importante que vas construyendo.
      </div>
      ${renderGuacamayas([])}
    `;
    return;
  }

  const visiblesHistoria = reconocimientosActuales.slice(0, cantidadHistoriaVisible);
  const restantes = Math.max(0, reconocimientosActuales.length - visiblesHistoria.length);
  const siguientePaso = Math.min(PASO_HISTORIA, restantes);
  const historia = visiblesHistoria.map(renderItemHistoria).join("");

  host.innerHTML = `
    <article class="recompensas-a1__ultimo">
      <div class="recompensas-a1__icono" aria-hidden="true">${iconoVisible(ultimo)}</div>
      <div>
        <span class="recompensas-a1__eyebrow">${escapar(origenVisible(ultimo))}</span>
        <h3>${escapar(metaFuente(ultimo))}</h3>
        <p class="recompensas-a1__mensaje">${escapar(ultimo.mensaje || "")}</p>
        <div class="recompensas-a1__meta">
          <span>📅 ${escapar(formatearFecha(ultimo.fechaReconocimiento))}</span>
          ${ultimo.fuenteEliminada ? "<span>🌈 Conservado en mi historia</span>" : ""}
        </div>
        ${accionesFuente(ultimo)}
      </div>
    </article>

    ${renderGuacamayas(reconocimientosActuales)}

    <details class="recompensas-a1__historia" ${historiaAbierta ? "open" : ""}>
      <summary>🌈 Ver mi historia de crecimiento</summary>
      <div class="recompensas-a1__lista">
        ${historia}
        ${restantes > 0 ? `
          <div class="recompensas-a1__mas">
            <button type="button" data-ver-mas-historia>
              Ver ${siguientePaso} más ↓
            </button>
          </div>
        ` : ""}
      </div>
    </details>
  `;

  host.querySelector("[data-ver-mas-historia]")?.addEventListener("click", () => {
    cantidadHistoriaVisible += PASO_HISTORIA;
    render(reconocimientosActuales);
  });
}

export function instalarReconocimientosCamino() {
  if (instalada) return;
  instalada = true;
  cargarEstilos();
  asegurarHost();

  detenerObservacion = Reconocimientos.observar(
    items => render(items, { reiniciarPaginacion: true }),
    error => {
      console.debug("No se pudieron cargar los reconocimientos de Mi Camino.", error);
      render([], { reiniciarPaginacion: true });
    }
  );

  window.addEventListener("beforeunload", () => detenerObservacion?.(), { once: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", instalarReconocimientosCamino, { once: true });
} else {
  instalarReconocimientosCamino();
}
