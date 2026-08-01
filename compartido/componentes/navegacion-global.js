/**
 * Academia Gloria Valentina
 * Sistema Global de Navegación · v1.1
 */

import { NAVEGACION_ACADEMIA } from "../modelos/navegacion.js";

const BASE_ACADEMIA = new URL("../../", import.meta.url);

function urlAcademia(ruta = "") {
  return new URL(ruta, BASE_ACADEMIA).href;
}

function rutaNormalizada(ruta = "") {
  return String(ruta)
    .replace(/^\/+/, "")
    .replace(/index\.html$/, "")
    .replace(/\/+$/, "");
}

function rutaRelativaActual() {
  const base = new URL(BASE_ACADEMIA).pathname.replace(/\/$/, "");
  let actual = window.location.pathname;

  if (base && actual.startsWith(base)) {
    actual = actual.slice(base.length);
  }

  return rutaNormalizada(actual);
}

function nodoActual(arbol, rutaActual) {
  for (const nodo of arbol) {
    if (nodo.ruta && rutaNormalizada(nodo.ruta) === rutaActual) {
      return nodo;
    }

    if (Array.isArray(nodo.hijos)) {
      const encontrado = nodoActual(nodo.hijos, rutaActual);
      if (encontrado) return encontrado;
    }
  }

  return null;
}

function contieneRuta(nodo, rutaActual) {
  if (nodo.ruta && rutaNormalizada(nodo.ruta) === rutaActual) {
    return true;
  }

  return Array.isArray(nodo.hijos)
    ? nodo.hijos.some(hijo => contieneRuta(hijo, rutaActual))
    : false;
}

function escaparHTML(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function enlaceNodo(nodo, actual = false, clase = "") {
  if (!nodo.ruta) return "";

  return `
    <a
      class="nav-global__enlace ${clase} ${actual ? "nav-global__enlace--actual" : ""}"
      href="${urlAcademia(nodo.ruta)}"
      ${actual ? 'aria-current="page"' : ""}
    >
      <span class="nav-global__enlace-icono" aria-hidden="true">
        ${escaparHTML(nodo.icono || "•")}
      </span>
      <span class="nav-global__enlace-texto">
        <strong>${escaparHTML(nodo.titulo)}</strong>
        ${
          nodo.descripcion
            ? `<small>${escaparHTML(nodo.descripcion)}</small>`
            : ""
        }
      </span>
    </a>
  `;
}

function renderNodo(nodo, rutaActual, nivel = 1) {
  const tieneHijos =
    Array.isArray(nodo.hijos) && nodo.hijos.length > 0;
  const esActual =
    Boolean(nodo.ruta) &&
    rutaNormalizada(nodo.ruta) === rutaActual;
  const ramaActual = contieneRuta(nodo, rutaActual);

  if (!tieneHijos) {
    return enlaceNodo(nodo, esActual);
  }

  const claseNivel =
    nivel === 1
      ? "nav-global__nivel"
      : "nav-global__nivel nav-global__nivel--interno";

  return `
    <details
      class="${claseNivel}"
      data-nav-id="${escaparHTML(nodo.id)}"
      ${ramaActual ? "open" : ""}
    >
      <summary>
        <span class="nav-global__summary-icono" aria-hidden="true">
          ${escaparHTML(nodo.icono || "•")}
        </span>

        <span class="nav-global__summary-texto">
          <strong>${escaparHTML(nodo.titulo)}</strong>
          ${
            nodo.descripcion
              ? `<small>${escaparHTML(nodo.descripcion)}</small>`
              : ""
          }
        </span>

        ${
          nodo.ruta
            ? `
              <a
                class="nav-global__ir"
                href="${urlAcademia(nodo.ruta)}"
                aria-label="Ir a ${escaparHTML(nodo.titulo)}"
                title="Ir a ${escaparHTML(nodo.titulo)}"
              >
                Ir
              </a>
            `
            : ""
        }

        <span class="nav-global__flecha" aria-hidden="true">⌄</span>
      </summary>

      <div class="nav-global__subnivel">
        ${nodo.hijos
          .map(hijo => renderNodo(hijo, rutaActual, nivel + 1))
          .join("")}
      </div>
    </details>
  `;
}

function crearMenu() {
  if (document.querySelector(".nav-global")) return;

  const rutaActual = rutaRelativaActual();
  const actual = nodoActual(NAVEGACION_ACADEMIA, rutaActual);

  const contenedor = document.createElement("nav");
  contenedor.className = "nav-global";
  contenedor.setAttribute(
    "aria-label",
    "Navegación principal de la Academia"
  );

  contenedor.innerHTML = `
    <div class="nav-global__barra">
      <a class="nav-global__marca" href="${urlAcademia("")}">
        <span aria-hidden="true">🌈</span>
        <span>Academia</span>
      </a>

      <div class="nav-global__ubicacion" aria-label="Ubicación actual">
        <span aria-hidden="true">${escaparHTML(actual?.icono || "🌈")}</span>
        <span>${escaparHTML(actual?.titulo || "Academia")}</span>
      </div>

      <button
        class="nav-global__boton"
        type="button"
        aria-expanded="false"
        aria-controls="menuGlobalAcademia"
      >
        <span aria-hidden="true">☰</span>
        <span>Menú</span>
      </button>
    </div>

    <div id="menuGlobalAcademia" class="nav-global__panel" hidden>
      <div class="nav-global__cabecera">
        <div>
          <strong>¿A dónde quieres ir?</strong>
          <small>Elige uno de los caminos de la Academia.</small>
        </div>

        <button
          class="nav-global__cerrar"
          type="button"
          aria-label="Cerrar menú"
        >×</button>
      </div>

      <div class="nav-global__contenido">
        ${NAVEGACION_ACADEMIA
          .map(nodo => renderNodo(nodo, rutaActual))
          .join("")}
      </div>
    </div>

    <div class="nav-global__fondo" hidden></div>
  `;

  document.body.prepend(contenedor);

  const boton = contenedor.querySelector(".nav-global__boton");
  const cerrar = contenedor.querySelector(".nav-global__cerrar");
  const panel = contenedor.querySelector(".nav-global__panel");
  const fondo = contenedor.querySelector(".nav-global__fondo");

  function establecerAbierto(abierto) {
    boton.setAttribute("aria-expanded", String(abierto));
    panel.hidden = !abierto;
    fondo.hidden = !abierto;
    document.body.classList.toggle("nav-global-abierta", abierto);

    if (abierto) {
      cerrar.focus();
    } else {
      boton.focus();
    }
  }

  boton.addEventListener("click", () => {
    establecerAbierto(boton.getAttribute("aria-expanded") !== "true");
  });

  cerrar.addEventListener("click", () => establecerAbierto(false));
  fondo.addEventListener("click", () => establecerAbierto(false));

  contenedor.addEventListener("keydown", evento => {
    if (evento.key === "Escape" && panel.hidden === false) {
      establecerAbierto(false);
    }
  });

  contenedor
    .querySelectorAll(".nav-global__nivel > summary")
    .forEach(summary => {
      summary.addEventListener("click", evento => {
        if (evento.target.closest(".nav-global__ir")) {
          evento.preventDefault();
        }
      });
    });
}

function iniciarNavegacionGlobal() {
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      crearMenu,
      { once: true }
    );
  } else {
    crearMenu();
  }
}

iniciarNavegacionGlobal();
