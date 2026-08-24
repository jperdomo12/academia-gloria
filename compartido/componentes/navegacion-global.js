/**
 * Academia Gloria Valentina
 * Cabecera global de navegación · v3.2
 *
 * Contrato visual:
 * ACADEMIA + VOLVER · PANTALLA ACTUAL · PANEL DE USUARIO
 *
 * Principios de integración:
 * - La cabecera es propietaria del único Panel de Usuario visible.
 * - Nunca se mueve un Panel local heredado hacia la cabecera.
 * - Los hosts locales heredados se desactivan sin tocar la lógica del módulo.
 * - La limpieza de navegación heredada solo actúa sobre retornos globales.
 * - Las acciones internas de cada módulo permanecen intactas.
 */

import { UBICACIONES_ACADEMIA } from "../modelos/navegacion.js";
import { iniciarPanelUsuario } from "../js/panel-usuario.js";

const BASE_ACADEMIA = new URL("../../", import.meta.url);
const SELECTOR_PANEL_PRINCIPAL = "#nav-panel-usuario";

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
  for (const nodo of arbol || []) {
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

function rutaAlternativaVolver(actual) {
  const declaradaEnPagina = String(
    document.body?.dataset?.navBack || ""
  ).trim();

  if (declaradaEnPagina) {
    return declaradaEnPagina;
  }

  if (actual && Object.prototype.hasOwnProperty.call(actual, "volver")) {
    return urlAcademia(actual.volver || "");
  }

  return "";
}

function escaparHTML(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

  // Fallback defensivo si una pantalla carga únicamente el componente.
  try {
    boton.href = new URL(rutaAlternativa, window.location.href).href;
  } catch {
    boton.href = rutaAlternativa;
  }
}

function buscarHojaEstilo(nombreArchivo) {
  return [...document.querySelectorAll('link[rel~="stylesheet"]')]
    .find((link) => {
      try {
        return new URL(link.href, document.baseURI).pathname
          .endsWith(`/compartido/css/${nombreArchivo}`);
      } catch {
        return false;
      }
    }) || null;
}

function esperarHojaEstilo(link) {
  if (link.sheet) return Promise.resolve(link);

  return new Promise((resolve, reject) => {
    const limpiar = () => {
      link.removeEventListener("load", cargada);
      link.removeEventListener("error", error);
    };

    const cargada = () => {
      limpiar();
      resolve(link);
    };

    const error = () => {
      limpiar();
      reject(new Error(`No se pudo cargar ${link.href}`));
    };

    link.addEventListener("load", cargada, { once: true });
    link.addEventListener("error", error, { once: true });
  });
}

function urlHojaEstilo(nombreArchivo, version) {
  return new URL(
    `../css/${nombreArchivo}?v=${encodeURIComponent(version)}`,
    import.meta.url
  ).href;
}

async function asegurarHojaEstilo(nombreArchivo, version) {
  const hrefObjetivo = urlHojaEstilo(nombreArchivo, version);
  const existente = buscarHojaEstilo(nombreArchivo);

  if (existente && existente.href === hrefObjetivo) {
    await esperarHojaEstilo(existente);
    return existente;
  }

  /*
   * Si la página enlaza una versión antigua, cargamos primero la versión
   * canónica y solo después retiramos la anterior. Así evitamos parpadeos y
   * no dependemos del estado de caché de cada HTML heredado.
   */
  const nuevo = document.createElement("link");
  nuevo.rel = "stylesheet";
  nuevo.href = hrefObjetivo;

  const carga = esperarHojaEstilo(nuevo);
  document.head.append(nuevo);
  await carga;

  if (existente?.isConnected) {
    existente.remove();
  }

  return nuevo;
}

async function asegurarEstilosCompartidos() {
  await Promise.all([
    asegurarHojaEstilo("navegacion-global.css", "7"),
    asegurarHojaEstilo("panel-usuario.css", "2")
  ]);
}

function asegurarFaviconOficial() {
  const href = urlAcademia("assets/iconos/icono-principal.png");
  const definiciones = [
    { rel: "icon", selector: 'link[rel="icon"]', type: "image/png" },
    {
      rel: "shortcut icon",
      selector: 'link[rel="shortcut icon"]',
      type: "image/png"
    },
    {
      rel: "apple-touch-icon",
      selector: 'link[rel="apple-touch-icon"]'
    }
  ];

  definiciones.forEach((definicion) => {
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

function primerBloqueVisible(main) {
  return [...(main?.children || [])]
    .find((elemento) => !elemento.hidden) || null;
}

function esRetornoGlobalLegado(elemento) {
  if (!elemento || elemento.closest(".nav-global")) return false;

  if (
    elemento.closest(
      ".topbar, .barra-superior-universo, .barra-superior-camino, " +
      ".module-backbar, .guide-topbar"
    )
  ) {
    return true;
  }

  const main = elemento.closest("main");
  if (!main) return false;

  const primero = primerBloqueVisible(main);
  if (primero?.contains(elemento)) return true;

  const cabecera = elemento.closest("header");
  return Boolean(cabecera && main.contains(cabecera));
}

function limpiarNavegacionLegada(actual) {
  const padres = new Set();

  if (!actual?.limpiarNavegacionLegada) {
    return padres;
  }

  const retornoGlobal = destinoNormalizado(rutaAlternativaVolver(actual));

  document
    .querySelectorAll("[data-volver-modulo], [data-accion-volver]")
    .forEach((elemento) => {
      if (!esRetornoGlobalLegado(elemento)) return;
      if (elemento.parentElement) padres.add(elemento.parentElement);
      elemento.remove();
    });

  document.querySelectorAll("a").forEach((enlace) => {
    if (!esRetornoGlobalLegado(enlace)) return;

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

  /*
   * Algunas pantallas históricas usan un <button> Volver con lógica propia
   * en lugar de un enlace o atributo declarativo. Solo se retira cuando está
   * inequívocamente dentro de la zona superior de navegación heredada.
   */
  document.querySelectorAll("button").forEach((boton) => {
    if (!esRetornoGlobalLegado(boton)) return;

    const texto = String(boton.textContent || "").trim().toLowerCase();
    if (!texto.includes("volver")) return;

    if (boton.parentElement) padres.add(boton.parentElement);
    boton.remove();
  });

  document.querySelectorAll('[aria-label="Sección actual"]').forEach((elemento) => {
    if (!esRetornoGlobalLegado(elemento)) return;
    if (elemento.parentElement) padres.add(elemento.parentElement);
    elemento.remove();
  });

  return padres;
}

function desactivarPanelesLocales(cabecera) {
  document.querySelectorAll("[data-panel-usuario]").forEach((contenedor) => {
    if (cabecera.contains(contenedor)) return;

    contenedor.removeAttribute("data-panel-usuario");
    contenedor.setAttribute("data-panel-usuario-legado", "inactivo");
    contenedor.replaceChildren();
    contenedor.hidden = true;
  });
}

function hijosActivos(contenedor) {
  return [...(contenedor?.children || [])].filter((hijo) => {
    if (hijo.hidden) return false;
    if (hijo.hasAttribute("data-panel-usuario-legado")) return false;
    return true;
  });
}

function normalizarContenedoresLegados(padres) {
  padres.forEach((padre) => {
    if (!padre?.isConnected) return;

    const hijos = hijosActivos(padre);

    if (!hijos.length) {
      padre.remove();
      return;
    }

    // Si solo queda una acción propia del módulo, permanece visible y
    // separada de la navegación global (por ejemplo, Gestión de Misiones).
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

async function iniciarPanelCanonico(cabecera) {
  const destino = cabecera.querySelector(SELECTOR_PANEL_PRINCIPAL);
  if (!destino) return;

  try {
    await iniciarPanelUsuario({
      contenedor: SELECTOR_PANEL_PRINCIPAL
    });
  } catch (error) {
    // La cabecera permanece funcional aunque el perfil no pueda cargarse.
    console.error("No se pudo iniciar el Panel de Usuario global.", error);
  }
}

async function crearCabecera() {
  if (document.querySelector(".nav-global")) return;

  try {
    await asegurarEstilosCompartidos();
  } catch (error) {
    // No renderizamos una cabecera parcialmente estilizada.
    console.error("No se pudieron cargar los estilos de navegación.", error);
    return;
  }

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

      <div id="nav-panel-usuario"
           class="nav-global__usuario"
           data-panel-usuario-principal
           aria-label="Menú del alumno"></div>
    </div>
  `;

  // Los hosts heredados se desactivan antes de iniciar el único Panel visible.
  desactivarPanelesLocales(cabecera);
  document.body.prepend(cabecera);
  configurarVolverContextual(cabecera, actual);

  const padresLegados = limpiarNavegacionLegada(actual);
  normalizarContenedoresLegados(padresLegados);
  await iniciarPanelCanonico(cabecera);
}

function iniciarNavegacionGlobal() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", crearCabecera, { once: true });
  } else {
    crearCabecera();
  }
}

iniciarNavegacionGlobal();
