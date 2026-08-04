/**
 * Academia Gloria Valentina
 * Sistema Global de Navegación · v1.2
 *
 * RC3:
 * - El nombre de un nodo con hijos navega a su página.
 * - La flecha es el único control para expandir o comprimir.
 * - Las ramas de la página actual se abren automáticamente.
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

function contenidoNodo(nodo) {
  return `
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
  `;
}

function renderHoja(nodo, rutaActual) {
  const esActual =
    Boolean(nodo.ruta) &&
    rutaNormalizada(nodo.ruta) === rutaActual;

  if (!nodo.ruta) return "";

  return `
    <a
      class="nav-global__enlace ${esActual ? "nav-global__enlace--actual" : ""}"
      href="${urlAcademia(nodo.ruta)}"
      ${esActual ? 'aria-current="page"' : ""}
    >
      ${contenidoNodo(nodo)}
    </a>
  `;
}

function renderRama(nodo, rutaActual, nivel) {
  const ramaActual = contieneRuta(nodo, rutaActual);
  const esActual =
    Boolean(nodo.ruta) &&
    rutaNormalizada(nodo.ruta) === rutaActual;
  const idPanel = `nav-rama-${escaparHTML(nodo.id)}`;

  return `
    <section
      class="nav-global__rama ${nivel > 1 ? "nav-global__rama--interna" : ""}"
      data-nav-rama
      data-nav-id="${escaparHTML(nodo.id)}"
      data-abierta="${ramaActual ? "true" : "false"}"
    >
      <div class="nav-global__rama-cabecera">
        ${
          nodo.ruta
            ? `
              <a
                class="nav-global__enlace nav-global__enlace--rama ${
                  esActual ? "nav-global__enlace--actual" : ""
                }"
                href="${urlAcademia(nodo.ruta)}"
                ${esActual ? 'aria-current="page"' : ""}
              >
                ${contenidoNodo(nodo)}
              </a>
            `
            : `
              <div class="nav-global__enlace nav-global__enlace--rama nav-global__enlace--sin-ruta">
                ${contenidoNodo(nodo)}
              </div>
            `
        }

        <button
          class="nav-global__expandir"
          type="button"
          aria-expanded="${ramaActual ? "true" : "false"}"
          aria-controls="${idPanel}"
          aria-label="${
            ramaActual ? "Comprimir" : "Expandir"
          } ${escaparHTML(nodo.titulo)}"
          title="${
            ramaActual ? "Comprimir" : "Expandir"
          } ${escaparHTML(nodo.titulo)}"
        >
          <span aria-hidden="true">⌄</span>
        </button>
      </div>

      <div
        id="${idPanel}"
        class="nav-global__subnivel"
        ${ramaActual ? "" : "hidden"}
      >
        ${nodo.hijos
          .map(hijo => renderNodo(hijo, rutaActual, nivel + 1))
          .join("")}
      </div>
    </section>
  `;
}

function renderNodo(nodo, rutaActual, nivel = 1) {
  const tieneHijos =
    Array.isArray(nodo.hijos) && nodo.hijos.length > 0;

  return tieneHijos
    ? renderRama(nodo, rutaActual, nivel)
    : renderHoja(nodo, rutaActual);
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
          <strong>Academia Gloria Valentina</strong>
          <small>¿A dónde quieres ir?</small>
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

  function establecerMenuAbierto(abierto) {
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

  function establecerRamaAbierta(rama, abierta) {
    const control = rama.querySelector(":scope > .nav-global__rama-cabecera .nav-global__expandir");
    const contenido = rama.querySelector(":scope > .nav-global__subnivel");

    rama.dataset.abierta = String(abierta);
    control.setAttribute("aria-expanded", String(abierta));
    control.setAttribute(
      "aria-label",
      `${abierta ? "Comprimir" : "Expandir"} ${
        rama.querySelector(":scope > .nav-global__rama-cabecera strong")
          ?.textContent || "sección"
      }`
    );
    contenido.hidden = !abierta;
  }

  boton.addEventListener("click", () => {
    establecerMenuAbierto(
      boton.getAttribute("aria-expanded") !== "true"
    );
  });

  cerrar.addEventListener("click", () => establecerMenuAbierto(false));
  fondo.addEventListener("click", () => establecerMenuAbierto(false));

  contenedor
    .querySelectorAll(".nav-global__expandir")
    .forEach(control => {
      control.addEventListener("click", evento => {
        evento.preventDefault();
        evento.stopPropagation();

        const rama = control.closest("[data-nav-rama]");
        const abierta = control.getAttribute("aria-expanded") === "true";
        establecerRamaAbierta(rama, !abierta);
      });
    });

  contenedor.addEventListener("keydown", evento => {
    if (evento.key === "Escape" && panel.hidden === false) {
      establecerMenuAbierto(false);
    }
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
