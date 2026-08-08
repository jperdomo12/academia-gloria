/****************************************************************************
 * Academia Gloria Valentina
 * Archivo: compartido/js/panel-usuario.js
 * Menú unificado del alumno · Versión 2.2
 ****************************************************************************/

import {
  obtenerPerfil,
  obtenerNombreVisible,
  obtenerAvatar,
  obtenerSaludo,
  cerrarSesion,
  observarSesion,
  estaAutenticado
} from "./perfil-usuario.js";

import {
  NAVEGACION_ACADEMIA,
  DESCUBRE_ACADEMIA
} from "../modelos/navegacion.js";

const CONFIGURACION_PREDETERMINADA = Object.freeze({
  contenedor: "[data-panel-usuario]",
  loginUrl: null,
  mostrarDescubreAcademia: true,
  mostrarEspacioPersonal: true,
  mostrarCamino: true,
  mostrarCalendario: true,
  mostrarLogros: true,
  mostrarConfiguracion: true
});

let configuracionActiva = { ...CONFIGURACION_PREDETERMINADA };
let panelRaiz = null;
let botonPrincipal = null;
let menu = null;
let manejadorDocumento = null;
let manejadorEscape = null;
let cancelarObservacionSesion = null;
let calendarioSlugActivo = "";

function obtenerBaseAcademia() {
  return window.location.hostname.endsWith("github.io")
    ? "/academia-gloria"
    : "";
}

function construirUrlAcademia(ruta = "/") {
  const base = obtenerBaseAcademia();
  const rutaNormalizada = ruta.startsWith("/") ? ruta : `/${ruta}`;
  return `${base}${rutaNormalizada}`;
}

function obtenerRutaActual() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function escaparHTML(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function crearSlugSeguro(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function crearElementoDesdeHTML(html) {
  const plantilla = document.createElement("template");
  plantilla.innerHTML = html.trim();
  return plantilla.content.firstElementChild;
}

function cerrarGrupos(excepto = null, alcance = panelRaiz) {
  alcance?.querySelectorAll("[data-menu-grupo]").forEach(grupo => {
    if (grupo === excepto) return;
    const boton = grupo.querySelector(":scope > [data-menu-grupo-boton]");
    const contenido = grupo.querySelector(":scope > [data-menu-grupo-contenido]");
    if (!boton || !contenido) return;
    boton.setAttribute("aria-expanded", "false");
    contenido.hidden = true;
  });
}

function activarAcordeon() {
  panelRaiz.querySelectorAll("[data-menu-grupo-boton]").forEach(boton => {
    boton.addEventListener("click", evento => {
      evento.stopPropagation();

      const grupo = boton.closest("[data-menu-grupo]");
      const contenido = grupo.querySelector(":scope > [data-menu-grupo-contenido]");
      const abierto = boton.getAttribute("aria-expanded") === "true";
      const contenedorHermanos = grupo.parentElement;

      cerrarGrupos(grupo, contenedorHermanos);
      boton.setAttribute("aria-expanded", String(!abierto));
      contenido.hidden = abierto;
    });
  });
}

function limpiarPosicionMenu() {
  if (!menu) return;
  for (const propiedad of ["position", "top", "bottom", "left", "right", "width", "max-height"]) {
    menu.style.removeProperty(propiedad);
  }
}

function posicionarMenuEnVentana() {
  if (!menu || !botonPrincipal) return;

  const margen = 12;
  const rect = botonPrincipal.getBoundingClientRect();
  const ancho = Math.min(350, window.innerWidth - margen * 2);
  const espacioAbajo = window.innerHeight - rect.bottom - margen;
  const espacioArriba = rect.top - margen;
  const abrirHaciaArriba = espacioAbajo < 390 && espacioArriba > espacioAbajo;
  const alturaDisponible = Math.max(220, abrirHaciaArriba ? espacioArriba - 8 : espacioAbajo - 8);

  let izquierda = rect.right - ancho;
  izquierda = Math.max(margen, Math.min(izquierda, window.innerWidth - ancho - margen));

  menu.style.position = "fixed";
  menu.style.width = `${ancho}px`;
  menu.style.left = `${izquierda}px`;
  menu.style.right = "auto";
  menu.style.maxHeight = `${alturaDisponible}px`;

  if (abrirHaciaArriba) {
    menu.style.top = "auto";
    menu.style.bottom = `${window.innerHeight - rect.top + 8}px`;
  } else {
    menu.style.bottom = "auto";
    menu.style.top = `${rect.bottom + 8}px`;
  }
}

function cerrarMenu({ devolverFoco = false } = {}) {
  if (!menu || !botonPrincipal) return;

  menu.hidden = true;
  limpiarPosicionMenu();
  cerrarGrupos();
  botonPrincipal.setAttribute("aria-expanded", "false");
  panelRaiz?.classList.remove("panel-usuario--abierto");
  if (devolverFoco) botonPrincipal.focus();
}

function abrirMenu() {
  if (!menu || !botonPrincipal) return;

  cerrarGrupos();
  menu.hidden = false;
  posicionarMenuEnVentana();
  botonPrincipal.setAttribute("aria-expanded", "true");
  panelRaiz?.classList.add("panel-usuario--abierto");
}

function alternarMenu() {
  if (!menu) return;
  menu.hidden ? abrirMenu() : cerrarMenu();
}

function renderizarEstadoCarga(contenedor) {
  contenedor.innerHTML = `
    <div class="panel-usuario panel-usuario--cargando" aria-busy="true">
      <div class="panel-usuario__avatar">✨</div>
      <div class="panel-usuario__texto">
        <strong class="panel-usuario__nombre">Academia Gloria</strong>
        <span class="panel-usuario__saludo">Preparando tu espacio...</span>
      </div>
    </div>
  `;
}

function renderEnlace(nodo, claseExtra = "") {
  if (nodo.proximo) {
    return `
      <button class="panel-usuario__opcion panel-usuario__opcion--proxima ${claseExtra}" type="button" disabled>
        <span aria-hidden="true">${escaparHTML(nodo.icono || "•")}</span>
        <span>${escaparHTML(nodo.titulo)}</span>
      </button>
    `;
  }

  return `
    <a class="panel-usuario__opcion ${claseExtra}" href="${escaparHTML(construirUrlAcademia(`/${nodo.ruta || ""}`))}">
      <span aria-hidden="true">${escaparHTML(nodo.icono || "•")}</span>
      <span>${escaparHTML(nodo.titulo)}</span>
    </a>
  `;
}

function renderGrupo(nodo, nivel = 1) {
  const hijos = Array.isArray(nodo.hijos) ? nodo.hijos : [];
  const claseNivel = nivel > 1 ? "panel-usuario__grupo--interno" : "";

  return `
    <section class="panel-usuario__grupo ${claseNivel}" data-menu-grupo>
      <button class="panel-usuario__opcion panel-usuario__grupo-boton" type="button"
              aria-expanded="false" data-menu-grupo-boton>
        <span aria-hidden="true">${escaparHTML(nodo.icono || "•")}</span>
        <span>${escaparHTML(nodo.titulo)}</span>
        <span class="panel-usuario__grupo-flecha" aria-hidden="true">⌄</span>
      </button>
      <div class="panel-usuario__subgrupo" data-menu-grupo-contenido hidden>
        ${nodo.ruta ? renderEnlace({ ...nodo, titulo: `Abrir ${nodo.titulo}`, hijos: undefined }, "panel-usuario__opcion--abrir") : ""}
        ${hijos.map(hijo => Array.isArray(hijo.hijos) && hijo.hijos.length
          ? renderGrupo(hijo, nivel + 1)
          : renderEnlace(hijo)).join("")}
      </div>
    </section>
  `;
}

function construirMenu() {
  const secciones = [];

  if (configuracionActiva.mostrarEspacioPersonal) {
    const opciones = [];
    if (configuracionActiva.mostrarCamino) {
      opciones.push({ id: "mi-camino", titulo: "Mi Camino", icono: "🌅", ruta: "mi-universo/mi-camino/" });
    }
    if (configuracionActiva.mostrarCalendario && calendarioSlugActivo) {
      opciones.push({
        id: "mi-calendario",
        titulo: "Mi Calendario",
        icono: "📅",
        ruta: `calendarios/${calendarioSlugActivo}/`
      });
    }
    if (configuracionActiva.mostrarLogros) {
      opciones.push({ id: "mis-logros", titulo: "Mis Logros", icono: "🏆", ruta: "mi-universo/mis-logros/", proximo: true });
    }
    if (configuracionActiva.mostrarConfiguracion) {
      opciones.push({ id: "configuracion", titulo: "Configuración", icono: "⚙️", ruta: "configuracion/", proximo: true });
    }

    secciones.push(renderGrupo({
      id: "espacio-personal",
      titulo: "Mi espacio personal",
      icono: "👤",
      hijos: opciones
    }));
  }

  secciones.push('<div class="panel-usuario__separador" role="separator"></div>');
  secciones.push(...NAVEGACION_ACADEMIA.map(nodo => renderGrupo(nodo)));
  secciones.push('<div class="panel-usuario__separador" role="separator"></div>');

  if (configuracionActiva.mostrarDescubreAcademia) {
    const volver = encodeURIComponent(obtenerRutaActual());
    const descubre = {
      ...DESCUBRE_ACADEMIA,
      ruta: `${DESCUBRE_ACADEMIA.ruta}?volver=${volver}`
    };
    secciones.push(renderEnlace(descubre, "panel-usuario__opcion--destacada"));
    secciones.push('<div class="panel-usuario__separador" role="separator"></div>');
  }

  secciones.push(`
    <button class="panel-usuario__opcion panel-usuario__opcion--salir" type="button" data-panel-usuario-salir>
      <span aria-hidden="true">🚪</span>
      <span>Cerrar sesión</span>
    </button>
  `);

  return secciones.join("");
}

async function construirPanel(contenedor) {
  const [perfil, nombreVisible, avatar, saludo] = await Promise.all([
    obtenerPerfil(),
    obtenerNombreVisible(),
    obtenerAvatar(),
    obtenerSaludo()
  ]);

  calendarioSlugActivo =
    crearSlugSeguro(perfil.calendarioSlug) ||
    crearSlugSeguro(nombreVisible);

  const nombreSeguro = escaparHTML(nombreVisible);
  const avatarSeguro = escaparHTML(avatar);
  const saludoSeguro = escaparHTML(saludo);
  const tipoUsuarioSeguro = escaparHTML(perfil.tipoUsuario || "alumno");

  panelRaiz = crearElementoDesdeHTML(`
    <div class="panel-usuario" data-tipo-usuario="${tipoUsuarioSeguro}">
      <button class="panel-usuario__boton" type="button" aria-haspopup="menu"
              aria-expanded="false" aria-label="Abrir el menú de ${nombreSeguro}">
        <span class="panel-usuario__avatar" aria-hidden="true">${avatarSeguro}</span>
        <span class="panel-usuario__texto">
          <strong class="panel-usuario__nombre">${nombreSeguro}</strong>
          <span class="panel-usuario__saludo">${saludoSeguro}</span>
        </span>
        <span class="panel-usuario__flecha" aria-hidden="true">⌄</span>
      </button>

      <div class="panel-usuario__menu" role="menu" hidden>
        <div class="panel-usuario__identidad">
          <span class="panel-usuario__avatar panel-usuario__avatar--menu" aria-hidden="true">${avatarSeguro}</span>
          <div>
            <strong>${nombreSeguro}</strong>
            <small>${saludoSeguro}</small>
          </div>
        </div>
        ${construirMenu()}
      </div>
    </div>
  `);

  contenedor.replaceChildren(panelRaiz);
  botonPrincipal = panelRaiz.querySelector(".panel-usuario__boton");
  menu = panelRaiz.querySelector(".panel-usuario__menu");

  activarAcordeon();

  botonPrincipal.addEventListener("click", evento => {
    evento.stopPropagation();
    alternarMenu();
  });

  panelRaiz.querySelector("[data-panel-usuario-salir]").addEventListener("click", async evento => {
    const botonSalir = evento.currentTarget;
    botonSalir.disabled = true;
    botonSalir.innerHTML = '<span aria-hidden="true">⏳</span><span>Cerrando sesión...</span>';

    try {
      await cerrarSesion();
      window.location.replace(configuracionActiva.loginUrl);
    } catch (error) {
      console.error("No se pudo cerrar la sesión.", error);
      botonSalir.disabled = false;
      botonSalir.innerHTML = '<span aria-hidden="true">🚪</span><span>Cerrar sesión</span>';
      alert("No se pudo cerrar la sesión.");
    }
  });

  manejadorDocumento = evento => {
    if (!panelRaiz.contains(evento.target)) cerrarMenu();
  };
  manejadorEscape = evento => {
    if (evento.key === "Escape" && !menu.hidden) cerrarMenu({ devolverFoco: true });
  };

  document.addEventListener("click", manejadorDocumento);
  document.addEventListener("keydown", manejadorEscape);
  window.addEventListener("resize", cerrarMenu, { passive: true });
  window.addEventListener("scroll", cerrarMenu, { passive: true });
}

function destruirPanel() {
  if (manejadorDocumento) document.removeEventListener("click", manejadorDocumento);
  if (manejadorEscape) document.removeEventListener("keydown", manejadorEscape);
  if (cancelarObservacionSesion) cancelarObservacionSesion();

  manejadorDocumento = null;
  manejadorEscape = null;
  cancelarObservacionSesion = null;
  panelRaiz = null;
  botonPrincipal = null;
  menu = null;
}

async function iniciarPanelUsuario(opciones = {}) {
  destruirPanel();

  const base = obtenerBaseAcademia();
  configuracionActiva = {
    ...CONFIGURACION_PREDETERMINADA,
    loginUrl: `${base}/login.html`,
    ...opciones
  };

  const contenedor = document.querySelector(configuracionActiva.contenedor);
  if (!contenedor) {
    console.warn(`No se encontró el contenedor del Panel de Usuario: ${configuracionActiva.contenedor}`);
    return null;
  }

  renderizarEstadoCarga(contenedor);

  // La primera renderización se realiza de forma determinista.
  // Así el menú no depende de que onAuthStateChanged vuelva a emitir
  // después de que la cabecera global haya creado su contenedor.
  try {
    const autenticado = await estaAutenticado();

    if (!autenticado) {
      window.location.replace(configuracionActiva.loginUrl);
      return contenedor;
    }

    await construirPanel(contenedor);
  } catch (error) {
    console.error("No se pudo cargar el Panel de Usuario.", error);
    contenedor.innerHTML = `
      <div class="panel-usuario panel-usuario--error">
        <div class="panel-usuario__avatar">⚠️</div>
        <div class="panel-usuario__texto">
          <strong class="panel-usuario__nombre">Recarga la página</strong>
          <span class="panel-usuario__saludo">No pudimos cargar tu perfil</span>
        </div>
      </div>
    `;
    return contenedor;
  }

  // Después de construir el panel, el observador queda únicamente
  // para reaccionar a un cierre de sesión posterior.
  cancelarObservacionSesion = observarSesion(usuario => {
    if (!usuario) {
      window.location.replace(configuracionActiva.loginUrl);
    }
  });

  return contenedor;
}

export { iniciarPanelUsuario, cerrarMenu, destruirPanel };

export const PanelUsuario = Object.freeze({
  iniciar: iniciarPanelUsuario,
  cerrarMenu,
  destruir: destruirPanel
});
