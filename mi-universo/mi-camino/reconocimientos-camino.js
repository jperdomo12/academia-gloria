/* Academia Gloria Valentina · Recompensas A1 · Mi Camino */

import { Reconocimientos } from "../../compartido/api/reconocimientos.js";

let instalada = false;
let detenerObservacion = null;

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
  if (item.tipo === "guacamaya") return "🦜 Un hito especial";
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

function render(items = []) {
  const host = asegurarHost();
  if (!host) return;

  const visibles = items.filter(reconocimientoVisible);
  const ultimo = visibles[0] || null;

  if (!ultimo) {
    host.innerHTML = `
      <div class="recompensas-a1__vacio">
        💛 Mi Camino también guardará momentos que Lía o mi familia quieran reconocer.
        No tienes que conseguir premios: aquí iremos recordando lo importante que vas construyendo.
      </div>
    `;
    return;
  }

  const historia = visibles.map(item => `
    <article class="recompensas-a1__item">
      <span class="recompensas-a1__item-icono" aria-hidden="true">${iconoVisible(item)}</span>
      <div>
        <strong>${escapar(metaFuente(item))}</strong>
        <p>${escapar(item.mensaje || "")}</p>
        <small>${escapar(origenVisible(item))} · ${escapar(formatearFecha(item.fechaReconocimiento))}</small>
      </div>
    </article>
  `).join("");

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
      </div>
    </article>

    <details class="recompensas-a1__historia">
      <summary>🌈 Ver mi historia de crecimiento</summary>
      <div class="recompensas-a1__lista">${historia}</div>
    </details>
  `;
}

export function instalarReconocimientosCamino() {
  if (instalada) return;
  instalada = true;
  cargarEstilos();
  asegurarHost();

  detenerObservacion = Reconocimientos.observar(
    render,
    error => {
      console.debug("No se pudieron cargar los reconocimientos de Mi Camino.", error);
      render([]);
    }
  );

  window.addEventListener("beforeunload", () => detenerObservacion?.(), { once: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", instalarReconocimientosCamino, { once: true });
} else {
  instalarReconocimientosCamino();
}
