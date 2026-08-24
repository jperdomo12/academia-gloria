/**
 * Academia Gloria Valentina
 * Cabecera global de navegación · v2.5 estable
 *
 * Estructura estable:
 * NAVEGACIÓN IZQUIERDA · PANTALLA ACTUAL · PANEL DEL ALUMNO
 *
 * Pantallas sin retorno declarado:
 * ACADEMIA · PANTALLA ACTUAL · MENÚ DESPLEGABLE.
 *
 * Pantallas con data-nav-back, ?volver o retorno en el modelo central:
 * ACADEMIA + VOLVER · PANTALLA ACTUAL · MENÚ DESPLEGABLE.
 *
 * El panel del alumno permanece en la zona derecha y concentra la navegación.
 */

import { UBICACIONES_ACADEMIA } from "../modelos/navegacion.js";
import { iniciarPanelUsuario } from "../js/panel-usuario.js";

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

function buscarNodo(arbol, rutaActual) {
  for (const nodo of arbol) {
    if (nodo.ruta && rutaNormalizada(nodo.ruta) === rutaActual) {
      return nodo;
    }

    if (Array.isArray(nodo.hijos)) {
      const encontrado = buscarNodo(nodo.hijos, rutaActual);
      if (encontrado) return encontrado;
    }
  }

  return null;
}

function tituloPantalla(actual) {
  return String(
    document.body?.dataset?.pageTitle ||
    actual?.titulo ||
    document.title ||
    "Academia"
  ).trim();
}

function iconoPantalla(actual) {
  return String(
    document.body?.dataset?.pageIcon ||
    actual?.icono ||
    "🌈"
  ).trim();
}

function rutaVolverExplicita() {
  const valor = String(
    new URLSearchParams(window.location.search).get("volver") || ""
  ).trim();

  if (!valor) return "";

  try {
    const destino = new URL(valor, window.location.href);
    if (destino.origin !== window.location.origin) return "";
    return `${destino.pathname}${destino.search}${destino.hash}`;
  } catch {
    return "";
  }
}

function elementoVolverLegado() {
  return document.querySelector(
    "[data-volver-modulo], [data-accion-volver]"
  );
}

function rutaVolverLegada() {
  const elemento = elementoVolverLegado();
  if (!elemento) return "";

  const alternativa = String(
    elemento.dataset?.rutaAlternativa ||
    elemento.getAttribute?.("href") ||
    ""
  ).trim();

  return alternativa;
}

function rutaAlternativaVolver(actual) {
  const declaradaEnPagina = String(document.body?.dataset?.navBack || "").trim();

  if (declaradaEnPagina) {
    return declaradaEnPagina;
  }

  const explicita = rutaVolverExplicita();
  if (explicita) {
    return explicita;
  }

  if (actual && Object.prototype.hasOwnProperty.call(actual, "volver")) {
    return urlAcademia(actual.volver || "");
  }

  return rutaVolverLegada();
}

function htmlMarcaAcademia() {
  return `
    <a class="nav-global__marca"
       href="${urlAcademia("")}"
       aria-label="Ir al inicio de la Academia">
      <span aria-hidden="true">🌈</span>
      <span>Academia</span>
    </a>
  `;
}

function htmlBotonVolver(rutaAlternativa) {
  return `
    <a class="nav-global__volver"
       href="${escaparHTML(rutaAlternativa)}"
       data-nav-volver
       data-ruta-alternativa="${escaparHTML(rutaAlternativa)}"
       aria-label="Volver a la pantalla anterior">
      <span class="nav-global__volver-icono" aria-hidden="true">←</span>
      <span>Volver</span>
    </a>
  `;
}

function htmlNavegacionIzquierda(actual) {
  const rutaAlternativa = rutaAlternativaVolver(actual);

  if (!rutaAlternativa) {
    return `
      <div class="nav-global__izquierda">
        ${htmlMarcaAcademia()}
      </div>
    `;
  }

  return `
    <div class="nav-global__izquierda nav-global__izquierda--con-volver">
      ${htmlMarcaAcademia()}
      ${htmlBotonVolver(rutaAlternativa)}
    </div>
  `;
}

function configurarVolverContextual(cabecera, actual) {
  const boton = cabecera.querySelector("[data-nav-volver]");
  if (!boton) return;

  const rutaAlternativa =
    boton.dataset.rutaAlternativa ||
    rutaAlternativaVolver(actual) ||
    "./";

  const navegacion = window.Academia?.navegacion;

  if (typeof navegacion?.configurarBotonVolver === "function") {
    navegacion.configurarBotonVolver(boton, rutaAlternativa);
    return;
  }

  // Fallback defensivo si una página carga la cabecera sin navegación.js.
  try {
    boton.href = new URL(rutaAlternativa, window.location.href).href;
  } catch {
    boton.href = rutaAlternativa;
  }
}

function escaparHTML(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function asegurarEstilosCabecera() {
  const existe = [...document.querySelectorAll('link[rel="stylesheet"]')]
    .some(link => String(link.href || "").includes("/compartido/css/navegacion-global.css"));

  if (existe) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = new URL("../css/navegacion-global.css?v=6", import.meta.url).href;
  document.head.append(link);
}

function asegurarFaviconOficial() {
  const href = urlAcademia("assets/iconos/icono-principal.png");
  const definiciones = [
    { rel: "icon", selector: 'link[rel="icon"]', type: "image/png" },
    { rel: "shortcut icon", selector: 'link[rel="shortcut icon"]', type: "image/png" },
    { rel: "apple-touch-icon", selector: 'link[rel="apple-touch-icon"]' }
  ];

  definiciones.forEach(definicion => {
    let link = document.head.querySelector(definicion.selector);

    if (!link) {
      link = document.createElement("link");
      link.rel = definicion.rel;
      document.head.append(link);
    }

    if (definicion.type) {
      link.type = definicion.type;
    }

    link.href = href;
  });
}

function destinoNormalizado(valor) {
  if (!valor) return "";

  try {
    const url = new URL(valor, window.location.href);
    return `${url.origin}${url.pathname}`
      .replace(/index\.html$/, "")
      .replace(/\/+$/, "");
  } catch {
    return "";
  }
}

function limpiarNavegacionLegada(actual) {
  const padres = new Set();

  /*
   * data-volver-modulo y data-accion-volver son señales explícitas de retorno
   * global heredado. Si la cabecera compartida está presente, ese retorno pasa
   * a vivir en la propia cabecera incluso aunque la pantalla no esté todavía
   * declarada en el modelo central.
   */
  document
    .querySelectorAll("[data-volver-modulo], [data-accion-volver]")
    .forEach(elemento => {
      if (elemento.closest(".nav-global")) return;
      if (elemento.parentElement) padres.add(elemento.parentElement);
      elemento.remove();
    });

  if (!actual?.limpiarNavegacionLegada) {
    return padres;
  }

  const retornoGlobal = destinoNormalizado(rutaAlternativaVolver(actual));

  document.querySelectorAll("a").forEach(enlace => {
    if (enlace.closest(".nav-global")) return;

    const texto = String(enlace.textContent || "").trim().toLowerCase();
    const destino = destinoNormalizado(enlace.getAttribute("href"));

    if (
      retornoGlobal &&
      texto.includes("volver") &&
      destino === retornoGlobal
    ) {
      if (enlace.parentElement) padres.add(enlace.parentElement);
      enlace.remove();
    }
  });

  const botonVolverLegado = document.getElementById("backButton");
  if (
    botonVolverLegado &&
    !botonVolverLegado.closest(".nav-global") &&
    /^\s*←?\s*volver\s*$/i.test(String(botonVolverLegado.textContent || ""))
  ) {
    if (botonVolverLegado.parentElement) {
      padres.add(botonVolverLegado.parentElement);
    }
    botonVolverLegado.remove();
  }

  document.querySelectorAll('[aria-label="Sección actual"]').forEach(elemento => {
    if (elemento.closest(".nav-global")) return;
    if (elemento.parentElement) padres.add(elemento.parentElement);
    elemento.remove();
  });

  return padres;
}

function normalizarContenedoresLegados(padres) {
  padres.forEach(padre => {
    if (!padre?.isConnected) return;

    const hijos = [...padre.children];

    if (!hijos.length) {
      padre.remove();
      return;
    }

    // Si solo queda una acción propia del módulo, la conservamos como acción
    // local alineada a la derecha, separada de la navegación global.
    if (hijos.length === 1) {
      padre.style.display = "flex";
      padre.style.justifyContent = "flex-end";
      padre.style.alignItems = "center";
      padre.style.gridTemplateColumns = "none";
      padre.style.gap = "0";
      padre.style.marginBottom = "16px";
    }
  });
}

async function trasladarPanelUsuario(cabecera) {
  const destino = cabecera.querySelector("[data-nav-panel-usuario]");
  if (!destino) return;

  destino.id = "nav-panel-usuario";

  const candidatos = [...document.querySelectorAll("[data-panel-usuario]")];
  const origen = candidatos.find(elemento => !destino.contains(elemento));

  if (origen) {
    destino.replaceChildren(origen);
    origen.classList.add("panel-usuario--en-cabecera");
    return;
  }

  // Las páginas que todavía no declaraban un Panel de Usuario reciben aquí
  // el mismo menú unificado, sin tener que repetir inicialización en cada HTML.
  destino.setAttribute("data-panel-usuario", "");
  destino.classList.add("panel-usuario--en-cabecera");

  try {
    await iniciarPanelUsuario({
      contenedor: "#nav-panel-usuario"
    });
  } catch (error) {
    console.error("No se pudo iniciar el menú unificado del alumno.", error);
  }
}

async function crearCabecera() {
  if (document.querySelector(".nav-global")) return;

  asegurarEstilosCabecera();
  asegurarFaviconOficial();

  const rutaActual = rutaRelativaActual();
  const actual = buscarNodo(UBICACIONES_ACADEMIA, rutaActual);

  const cabecera = document.createElement("nav");
  cabecera.className = "nav-global";
  cabecera.setAttribute("aria-label", "Cabecera principal de la Academia");

  cabecera.innerHTML = `
    <div class="nav-global__barra">
      ${htmlNavegacionIzquierda(actual)}

      <div class="nav-global__ubicacion" aria-label="Pantalla actual">
        <span aria-hidden="true">${escaparHTML(iconoPantalla(actual))}</span>
        <span>${escaparHTML(tituloPantalla(actual))}</span>
      </div>

      <div class="nav-global__usuario" data-nav-panel-usuario aria-label="Menú del alumno"></div>
    </div>
  `;

  document.body.prepend(cabecera);
  configurarVolverContextual(cabecera, actual);

  const padresLegados = limpiarNavegacionLegada(actual);
  await trasladarPanelUsuario(cabecera);
  normalizarContenedoresLegados(padresLegados);
}

function iniciarNavegacionGlobal() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", crearCabecera, { once: true });
  } else {
    crearCabecera();
  }
}

iniciarNavegacionGlobal();