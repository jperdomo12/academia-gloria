/******************************************************************************
 * Academia Gloria
 * Archivo: compartido/js/panel-usuario.js
 * Componente visual reutilizable del Panel de Usuario.
 * Versión: 1.4
 ******************************************************************************/

import {
  obtenerPerfil,
  obtenerNombreVisible,
  obtenerAvatar,
  obtenerSaludo,
  cerrarSesion,
  observarSesion
} from "./perfil-usuario.js";

const CONFIGURACION_PREDETERMINADA = Object.freeze({
  contenedor: "[data-panel-usuario]",
  loginUrl: null,
  perfilUrl: null,
  mostrarPerfil: true,
  mostrarDescubreAcademia: true,
  mostrarEspacioPersonal: true,
  mostrarConfiguracion: true,
  mostrarLogros: true,
  mostrarCamino: true,
  mostrarTareas: true
});

let configuracionActiva = { ...CONFIGURACION_PREDETERMINADA };
let panelRaiz = null;
let botonPrincipal = null;
let menu = null;
let manejadorDocumento = null;
let cancelarObservacionSesion = null;

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

function asegurarEstilosPanelAvanzado() {
  if (document.getElementById("panel-usuario-estilos-v14")) return;

  const estilo = document.createElement("style");
  estilo.id = "panel-usuario-estilos-v14";
  estilo.textContent = `
    .panel-usuario__menu{
      max-height:calc(100vh - 24px);
      overflow-y:auto;
      overscroll-behavior:contain;
      scrollbar-width:thin;
      z-index:9999;
    }

    .panel-usuario__grupo-boton{
      width:100%;
      justify-content:flex-start;
    }

    .panel-usuario__grupo-flecha{
      margin-left:auto;
      transition:transform .18s ease;
    }

    .panel-usuario__grupo-boton[aria-expanded="true"] .panel-usuario__grupo-flecha{
      transform:rotate(180deg);
    }

    .panel-usuario__subgrupo{
      margin:4px 8px 8px;
      padding:7px;
      border:2px solid #ede9fe;
      border-radius:16px;
      background:linear-gradient(145deg,#faf5ff,#f8fafc);
    }

    .panel-usuario__subgrupo[hidden]{display:none!important}

    .panel-usuario__subgrupo .panel-usuario__opcion{
      min-height:48px;
      border-radius:12px;
    }

    .panel-usuario__opcion small{
      display:block;
      margin-top:2px;
      font-size:.72rem;
      opacity:.72;
    }

    @media(max-height:620px){
      .panel-usuario__identidad{padding-top:12px;padding-bottom:12px}
      .panel-usuario__opcion{min-height:46px}
    }
  `;
  document.head.appendChild(estilo);
}

function escaparHTML(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function crearElementoDesdeHTML(html) {
  const plantilla = document.createElement("template");
  plantilla.innerHTML = html.trim();
  return plantilla.content.firstElementChild;
}

function limpiarPosicionMenu() {
  if (!menu) return;
  menu.style.removeProperty("position");
  menu.style.removeProperty("top");
  menu.style.removeProperty("bottom");
  menu.style.removeProperty("left");
  menu.style.removeProperty("right");
  menu.style.removeProperty("width");
  menu.style.removeProperty("max-height");
}

function posicionarMenuEnVentana() {
  if (!menu || !botonPrincipal) return;

  const margen = 12;
  const rect = botonPrincipal.getBoundingClientRect();
  const ancho = Math.min(310, window.innerWidth - margen * 2);
  const espacioAbajo = window.innerHeight - rect.bottom - margen;
  const espacioArriba = rect.top - margen;
  const abrirHaciaArriba = espacioAbajo < 330 && espacioArriba > espacioAbajo;
  const alturaDisponible = Math.max(
    180,
    abrirHaciaArriba ? espacioArriba - 8 : espacioAbajo - 8
  );

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

function cerrarMenu() {
  if (!menu || !botonPrincipal) return;

  menu.hidden = true;
  limpiarPosicionMenu();
  botonPrincipal.setAttribute("aria-expanded", "false");
  panelRaiz?.classList.remove("panel-usuario--abierto");
}

function abrirMenu() {
  if (!menu || !botonPrincipal) return;

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
        <span class="panel-usuario__saludo">Preparando tu espacio...</span>
        <strong class="panel-usuario__nombre">Academia Gloria</strong>
      </div>
    </div>
  `;
}

function construirMenu() {
  const items = [];

  if (configuracionActiva.mostrarDescubreAcademia) {
    const volver = encodeURIComponent(obtenerRutaActual());
    const urlDescubre = `${construirUrlAcademia("/descubre-la-academia/")}?volver=${volver}`;

    items.push(`
      <a class="panel-usuario__opcion" href="${escaparHTML(urlDescubre)}">
        <span aria-hidden="true">🌈</span>
        <span>
          Descubre la Academia
          <small>Conoce este proyecto</small>
        </span>
      </a>
    `);
  }

  if (configuracionActiva.mostrarEspacioPersonal) {
    items.push(`
      <button class="panel-usuario__opcion panel-usuario__grupo-boton"
              type="button"
              aria-expanded="false"
              data-panel-usuario-grupo>
        <span aria-hidden="true">🪪</span>
        <span>
          Mi espacio personal
          <small>Perfil, camino, tareas y premios</small>
        </span>
        <span class="panel-usuario__grupo-flecha" aria-hidden="true">⌄</span>
      </button>

      <div class="panel-usuario__subgrupo" data-panel-usuario-subgrupo hidden>
        <button class="panel-usuario__opcion panel-usuario__opcion--proxima" type="button" disabled>
          <span aria-hidden="true">✨</span>
          <span>Mi Espacio<small>Próximamente</small></span>
        </button>

        <button class="panel-usuario__opcion panel-usuario__opcion--proxima" type="button" disabled>
          <span aria-hidden="true">🌱</span>
          <span>Mi Camino<small>Próximamente</small></span>
        </button>

        <button class="panel-usuario__opcion panel-usuario__opcion--proxima" type="button" disabled>
          <span aria-hidden="true">📌</span>
          <span>Mis Tareas<small>Próximamente</small></span>
        </button>

        <button class="panel-usuario__opcion panel-usuario__opcion--proxima" type="button" disabled>
          <span aria-hidden="true">🏆</span>
          <span>Mis Logros<small>Próximamente</small></span>
        </button>

        <button class="panel-usuario__opcion panel-usuario__opcion--proxima" type="button" disabled>
          <span aria-hidden="true">⚙️</span>
          <span>Configuración<small>Próximamente</small></span>
        </button>
      </div>
    `);
  }

  items.push(`
    <div class="panel-usuario__separador" role="separator"></div>
    <button class="panel-usuario__opcion panel-usuario__opcion--salir"
            type="button"
            data-panel-usuario-salir>
      <span aria-hidden="true">🚪</span>
      <span>Cerrar sesión</span>
    </button>
  `);

  return items.join("");
}

async function construirPanel(contenedor) {
  const [perfil, nombreVisible, avatar, saludo] = await Promise.all([
    obtenerPerfil(),
    obtenerNombreVisible(),
    obtenerAvatar(),
    obtenerSaludo()
  ]);

  const nombreSeguro = escaparHTML(nombreVisible);
  const avatarSeguro = escaparHTML(avatar);
  const saludoSeguro = escaparHTML(saludo);
  const tipoUsuarioSeguro = escaparHTML(perfil.tipoUsuario || "alumno");

  panelRaiz = crearElementoDesdeHTML(`
    <div class="panel-usuario"
         data-tipo-usuario="${tipoUsuarioSeguro}">
      <button class="panel-usuario__boton"
              type="button"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Abrir el panel de ${nombreSeguro}">
        <span class="panel-usuario__avatar" aria-hidden="true">${avatarSeguro}</span>

        <span class="panel-usuario__texto">
          <strong class="panel-usuario__nombre">${nombreSeguro}</strong>
          <span class="panel-usuario__saludo">${saludoSeguro}</span>
        </span>

        <span class="panel-usuario__flecha" aria-hidden="true">⌄</span>
      </button>

      <div class="panel-usuario__menu"
           role="menu"
           hidden>
        <div class="panel-usuario__identidad">
          <span class="panel-usuario__avatar panel-usuario__avatar--menu"
                aria-hidden="true">${avatarSeguro}</span>
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

  const botonGrupo = panelRaiz.querySelector("[data-panel-usuario-grupo]");
  const subgrupo = panelRaiz.querySelector("[data-panel-usuario-subgrupo]");

  botonGrupo?.addEventListener("click", (evento) => {
    evento.stopPropagation();
    const abierto = botonGrupo.getAttribute("aria-expanded") === "true";
    botonGrupo.setAttribute("aria-expanded", String(!abierto));
    subgrupo.hidden = abierto;
  });

  botonPrincipal.addEventListener("click", (evento) => {
    evento.stopPropagation();
    alternarMenu();
  });

  panelRaiz
    .querySelector("[data-panel-usuario-salir]")
    .addEventListener("click", async (evento) => {
      const botonSalir = evento.currentTarget;

      botonSalir.disabled = true;
      botonSalir.innerHTML = `
        <span aria-hidden="true">⏳</span>
        <span>Cerrando sesión...</span>
      `;

      try {
        await cerrarSesion();
        window.location.replace(configuracionActiva.loginUrl);
      } catch (error) {
        console.error("No se pudo cerrar la sesión.", error);
        botonSalir.disabled = false;
        botonSalir.innerHTML = `
          <span aria-hidden="true">🚪</span>
          <span>Cerrar sesión</span>
        `;
        alert("No se pudo cerrar la sesión.");
      }
    });

  manejadorDocumento = (evento) => {
    if (!panelRaiz.contains(evento.target)) {
      cerrarMenu();
    }
  };

  document.addEventListener("click", manejadorDocumento);
  window.addEventListener("resize", cerrarMenu, { passive: true });
  window.addEventListener("scroll", cerrarMenu, { passive: true });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      cerrarMenu();
      botonPrincipal?.focus();
    }
  });
}

function destruirPanel() {
  if (manejadorDocumento) {
    document.removeEventListener("click", manejadorDocumento);
    manejadorDocumento = null;
  }

  if (cancelarObservacionSesion) {
    cancelarObservacionSesion();
    cancelarObservacionSesion = null;
  }

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
    perfilUrl: `${base}/perfil/`,
    ...opciones
  };

  asegurarEstilosPanelAvanzado();

  const contenedor = document.querySelector(
    configuracionActiva.contenedor
  );

  if (!contenedor) {
    console.warn(
      `No se encontró el contenedor del Panel de Usuario: ${configuracionActiva.contenedor}`
    );
    return null;
  }

  renderizarEstadoCarga(contenedor);

  cancelarObservacionSesion = observarSesion(async (usuario) => {
    if (!usuario) {
      window.location.replace(configuracionActiva.loginUrl);
      return;
    }

    try {
      await construirPanel(contenedor);
    } catch (error) {
      console.error("No se pudo cargar el Panel de Usuario.", error);

      contenedor.innerHTML = `
        <div class="panel-usuario panel-usuario--error">
          <div class="panel-usuario__avatar">⚠️</div>
          <div class="panel-usuario__texto">
            <span class="panel-usuario__saludo">No pudimos cargar tu perfil</span>
            <strong class="panel-usuario__nombre">Recarga la página</strong>
          </div>
        </div>
      `;
    }
  });

  return contenedor;
}

export {
  iniciarPanelUsuario,
  cerrarMenu,
  destruirPanel
};

export const PanelUsuario = Object.freeze({
  iniciar: iniciarPanelUsuario,
  cerrarMenu,
  destruir: destruirPanel
});
