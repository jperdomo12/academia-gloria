/******************************************************************************
 * Academia Gloria
 * Archivo: compartido/js/panel-usuario.js
 * Componente visual reutilizable del Panel de Usuario.
 * Versión: 1.0
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
  loginUrl: "/academia-gloria/login.html",
  perfilUrl: "/academia-gloria/perfil/",
  mostrarPerfil: true,
  mostrarConfiguracion: true,
  mostrarLogros: true
});

let configuracionActiva = { ...CONFIGURACION_PREDETERMINADA };
let panelRaiz = null;
let botonPrincipal = null;
let menu = null;
let manejadorDocumento = null;
let cancelarObservacionSesion = null;

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

function cerrarMenu() {
  if (!menu || !botonPrincipal) return;

  menu.hidden = true;
  botonPrincipal.setAttribute("aria-expanded", "false");
  panelRaiz?.classList.remove("panel-usuario--abierto");
}

function abrirMenu() {
  if (!menu || !botonPrincipal) return;

  menu.hidden = false;
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

  if (configuracionActiva.mostrarPerfil) {
    items.push(`
      <a class="panel-usuario__opcion" href="${escaparHTML(configuracionActiva.perfilUrl)}">
        <span aria-hidden="true">👤</span>
        <span>Mi Perfil</span>
      </a>
    `);
  }

  if (configuracionActiva.mostrarConfiguracion) {
    items.push(`
      <button class="panel-usuario__opcion panel-usuario__opcion--proxima" type="button" disabled>
        <span aria-hidden="true">⚙️</span>
        <span>
          Configuración
          <small>Próximamente</small>
        </span>
      </button>
    `);
  }

  if (configuracionActiva.mostrarLogros) {
    items.push(`
      <button class="panel-usuario__opcion panel-usuario__opcion--proxima" type="button" disabled>
        <span aria-hidden="true">🏆</span>
        <span>
          Mis Logros
          <small>Próximamente</small>
        </span>
      </button>
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
              aria-label="Abrir menú de ${nombreSeguro}">
        <span class="panel-usuario__avatar" aria-hidden="true">${avatarSeguro}</span>

        <span class="panel-usuario__texto">
          <span class="panel-usuario__saludo">${saludoSeguro}</span>
          <strong class="panel-usuario__nombre">${nombreSeguro}</strong>
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

  configuracionActiva = {
    ...CONFIGURACION_PREDETERMINADA,
    ...opciones
  };

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
