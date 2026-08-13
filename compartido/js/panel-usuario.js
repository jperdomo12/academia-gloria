/******************************************************************************
 * Academia Gloria
 * Archivo: compartido/js/panel-usuario.js
 * Componente visual reutilizable del Panel de Usuario.
 * Versión: 2.4
 ******************************************************************************/

import {
  obtenerPerfil,
  obtenerSaludo,
  cerrarSesion
} from "./perfil-usuario.js";

import {
  NAVEGACION_ACADEMIA,
  DESCUBRE_ACADEMIA
} from "../modelos/navegacion.js";

import { ContextoUsuario } from "./contexto-usuario.js";
import { db } from "../firebase/firebase-config.js";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

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
  estilo.id = "panel-usuario-estilos-v15";
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

    .panel-usuario__persona-activa{
      margin:10px 8px 12px;
      padding:10px;
      border:2px solid #dbeafe;
      border-radius:16px;
      background:linear-gradient(145deg,#eff6ff,#faf5ff);
    }

    .panel-usuario__persona-activa-titulo{
      display:block;
      margin-bottom:6px;
      font-size:.72rem;
      font-weight:900;
      color:#475569;
      letter-spacing:.04em;
      text-transform:uppercase;
    }

    .panel-usuario__persona-activa-select{
      width:100%;
      min-height:42px;
      padding:8px 10px;
      border:2px solid #c4b5fd;
      border-radius:12px;
      background:#fff;
      color:#1e293b;
      font:inherit;
      font-weight:850;
      cursor:pointer;
    }

    .panel-usuario__persona-activa-select:disabled{
      cursor:wait;
      opacity:.65;
    }

    .panel-usuario__persona-activa-ayuda{
      display:block;
      margin-top:6px;
      color:#64748b;
      font-size:.68rem;
      line-height:1.35;
    }

    .panel-usuario__contexto-activo{
      display:block;
      margin-top:3px;
      color:#5b21b6;
      font-size:.72rem;
      font-weight:900;
      line-height:1.25;
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


async function leerPersonasRelacionadas(contexto) {
  const sourcePersonId = String(
    contexto?.personaUsuario?.personaId || ""
  ).trim();

  if (!sourcePersonId) return [];

  /*
   * La consulta incorpora sourcePersonId, que es exactamente la condición
   * exigida por las Rules para que un profesional vea solo sus relaciones.
   *
   * Filtramos "activo" en cliente para evitar depender de un índice compuesto.
   */
  const resultado = await getDocs(
    query(
      collection(db, "personaRelaciones"),
      where("sourcePersonId", "==", sourcePersonId)
    )
  );

  const relaciones = resultado.docs
    .map(documento => ({
      relationId: documento.id,
      ...documento.data()
    }))
    .filter(relacion => relacion.activo !== false);

  const relacionadas = [];

  for (const relacion of relaciones) {
    const targetPersonId = String(relacion.targetPersonId || "").trim();
    if (!targetPersonId || targetPersonId === sourcePersonId) continue;

    try {
      /*
       * Las Rules de PERSON permiten esta lectura únicamente cuando existe
       * PERSON_RELATION activa desde la Persona propia a la Persona destino.
       */
      const personaDoc = await getDoc(
        doc(db, "personas", targetPersonId)
      );

      if (!personaDoc.exists()) continue;

      const persona = personaDoc.data();

      relacionadas.push({
        personaId: targetPersonId,
        nombreVisible: String(
          persona.nombreVisible ||
          persona.nombre ||
          targetPersonId
        ).trim(),
        avatar: String(persona.avatar || "🌟").trim(),
        relacion
      });
    } catch (error) {
      console.warn(
        `[PanelUsuario] No se pudo leer la Persona relacionada '${targetPersonId}'.`,
        error
      );
    }
  }

  return relacionadas;
}

function construirSelectorPersonaActiva(contexto, relacionadas) {
  if (!contexto || relacionadas.length === 0) return "";

  const propia = contexto.personaUsuario;
  const activa = contexto.personaActiva || propia;

  const opciones = [
    {
      personaId: propia.personaId,
      nombreVisible: `Yo · ${propia.nombreVisible || propia.nombre || "Mi perfil"}`,
      avatar: propia.avatar || "🌟"
    },
    ...relacionadas
  ];

  return `
    <div class="panel-usuario__persona-activa">
      <label class="panel-usuario__persona-activa-titulo"
             for="panelUsuarioPersonaActiva">
        Persona activa
      </label>

      <select id="panelUsuarioPersonaActiva"
              class="panel-usuario__persona-activa-select"
              data-panel-usuario-persona-activa>
        ${opciones.map(opcion => `
          <option value="${escaparHTML(opcion.personaId)}"
                  ${opcion.personaId === activa.personaId ? "selected" : ""}>
            ${escaparHTML(`${opcion.avatar} ${opcion.nombreVisible}`)}
          </option>
        `).join("")}
      </select>

      <small class="panel-usuario__persona-activa-ayuda">
        La sesión sigue siendo tuya; aquí eliges la Persona con la que trabajas.
      </small>
    </div>
  `;
}

function iconoVisible(nodo) {
  /*
   * Único ajuste visual solicitado:
   * Gestión de Misiones representa un listado de asignaciones,
   * no una configuración del sistema.
   */
  if (String(nodo?.titulo || "").trim() === "Gestión de Misiones") {
    return "📋";
  }
  return nodo?.icono || "•";
}

function renderEnlace(nodo, claseExtra = "") {
  if (nodo.proximo) {
    return `
      <button class="panel-usuario__opcion panel-usuario__opcion--proxima ${claseExtra}"
              type="button" disabled>
        <span aria-hidden="true">${escaparHTML(iconoVisible(nodo))}</span>
        <span>${escaparHTML(nodo.titulo)}</span>
      </button>
    `;
  }

  return `
    <a class="panel-usuario__opcion ${claseExtra}"
       href="${escaparHTML(construirUrlAcademia(`/${nodo.ruta || ""}`))}">
      <span aria-hidden="true">${escaparHTML(iconoVisible(nodo))}</span>
      <span>${escaparHTML(nodo.titulo)}</span>
    </a>
  `;
}

function renderGrupo(nodo, nivel = 1) {
  const hijos = Array.isArray(nodo.hijos) ? nodo.hijos : [];
  const claseNivel = nivel > 1 ? "panel-usuario__grupo--interno" : "";

  return `
    <section class="panel-usuario__grupo ${claseNivel}" data-menu-grupo>
      <button class="panel-usuario__opcion panel-usuario__grupo-boton"
              type="button"
              aria-expanded="false"
              data-menu-grupo-boton>
        <span aria-hidden="true">${escaparHTML(iconoVisible(nodo))}</span>
        <span>${escaparHTML(nodo.titulo)}</span>
        <span class="panel-usuario__grupo-flecha" aria-hidden="true">⌄</span>
      </button>

      <div class="panel-usuario__subgrupo" data-menu-grupo-contenido hidden>
        ${
          nodo.ruta
            ? renderEnlace(
                { ...nodo, titulo: `Abrir ${nodo.titulo}`, hijos: undefined },
                "panel-usuario__opcion--abrir"
              )
            : ""
        }

        ${hijos.map(hijo =>
          Array.isArray(hijo.hijos) && hijo.hijos.length
            ? renderGrupo(hijo, nivel + 1)
            : renderEnlace(hijo)
        ).join("")}
      </div>
    </section>
  `;
}

function permiteNivel(nodo, nivelActual) {
  const orden = { consulta: 10, gestion: 20, administracion: 30 };
  const minimo = nodo?.nivelMinimo || "consulta";
  return (orden[nivelActual] || 0) >= (orden[minimo] || 0);
}

function filtrarNavegacionPorNivel(nodos, nivelActual) {
  return nodos
    .filter(nodo => permiteNivel(nodo, nivelActual))
    .map(nodo => ({
      ...nodo,
      hijos: Array.isArray(nodo.hijos)
        ? filtrarNavegacionPorNivel(nodo.hijos, nivelActual)
        : nodo.hijos
    }));
}

function construirMenu(nivelActual = "consulta") {
  const secciones = [];

  /*
   * Mi espacio personal se conserva como en la navegación validada:
   * Mi Camino, Mi Calendario, Mis Logros y Configuración.
   * No se expone "Tareas" como término de interfaz.
   */
  if (configuracionActiva.mostrarEspacioPersonal) {
    const opciones = [];

    if (configuracionActiva.mostrarCamino) {
      opciones.push({
        id: "mi-camino",
        titulo: "Mi Camino",
        icono: "🌅",
        ruta: "mi-universo/mi-camino/"
      });
    }

    opciones.push({
      id: "mi-calendario",
      titulo: "Mi Calendario",
      icono: "📅",
      ruta: "calendarios/"
    });

    opciones.push(
      {
        id: "mis-logros",
        titulo: "Mis Logros",
        icono: "🏆",
        ruta: "mi-universo/mis-logros/",
        proximo: true
      },
      {
        id: "configuracion",
        titulo: "Configuración",
        icono: "⚙️",
        ruta: "configuracion/",
        proximo: true
      }
    );

    secciones.push(renderGrupo({
      id: "espacio-personal",
      titulo: "Mi espacio personal",
      icono: "👤",
      hijos: opciones
    }));
  }

  /*
   * Mi Universo, Mis Cursos y Explorar más vuelven a proceder de la
   * fuente central NAVEGACION_ACADEMIA. El panel no inventa opciones.
   */
  secciones.push('<div class="panel-usuario__separador" role="separator"></div>');
  secciones.push(...filtrarNavegacionPorNivel(NAVEGACION_ACADEMIA, nivelActual).map(nodo => renderGrupo(nodo)));
  secciones.push('<div class="panel-usuario__separador" role="separator"></div>');

  if (configuracionActiva.mostrarDescubreAcademia) {
    const volver = encodeURIComponent(obtenerRutaActual());
    const descubre = {
      ...DESCUBRE_ACADEMIA,
      ruta: `${DESCUBRE_ACADEMIA.ruta}?volver=${volver}`
    };

    secciones.push(
      renderEnlace(descubre, "panel-usuario__opcion--destacada")
    );
    secciones.push(
      '<div class="panel-usuario__separador" role="separator"></div>'
    );
  }

  secciones.push(`
    <button class="panel-usuario__opcion panel-usuario__opcion--salir"
            type="button"
            data-panel-usuario-salir>
      <span aria-hidden="true">🚪</span>
      <span>Cerrar sesión</span>
    </button>
  `);

  return secciones.join("");
}

async function construirPanel(contenedor) {
  /*
   * Identidad del panel = Persona propia del usuario autenticado.
   * Persona Activa = contexto funcional sobre el que trabaja.
   *
   * Esto evita que al seleccionar Gloria el panel "convierta" visualmente
   * a Azucena en Gloria.
   */
  const contexto = await ContextoUsuario.inicializar();
  const perfil = await obtenerPerfil();
  const saludo = await obtenerSaludo();

  const personaUsuario = contexto.personaUsuario;
  const personaActiva = contexto.personaActiva || personaUsuario;
  const personaActivaEsPropia =
    personaActiva?.personaId === personaUsuario?.personaId;

  const indicadorPersonaActiva = personaActivaEsPropia
    ? ""
    : `<span class="panel-usuario__contexto-activo">🎯 Viendo a: ${escaparHTML(
        personaActiva.nombreVisible || personaActiva.nombre || "Persona activa"
      )}</span>`;

  const relacionadas = await leerPersonasRelacionadas(contexto);
  const selectorPersonaActiva =
    construirSelectorPersonaActiva(contexto, relacionadas);

  const nombreVisible =
    personaUsuario.nombreVisible ||
    personaUsuario.nombre ||
    perfil.nombreVisible ||
    perfil.nombre ||
    "Explorador";

  const avatar =
    personaUsuario.avatar ||
    perfil.avatar ||
    "🌟";

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
          ${indicadorPersonaActiva}
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

        ${selectorPersonaActiva}

        ${construirMenu(contexto.nivelAcceso)}
      </div>
    </div>
  `);

  contenedor.replaceChildren(panelRaiz);

  botonPrincipal = panelRaiz.querySelector(".panel-usuario__boton");
  menu = panelRaiz.querySelector(".panel-usuario__menu");


  panelRaiz.querySelectorAll("[data-menu-grupo-boton]").forEach((botonGrupo) => {
    botonGrupo.addEventListener("click", (evento) => {
      evento.stopPropagation();

      const grupo = botonGrupo.closest("[data-menu-grupo]");
      const contenido = grupo?.querySelector(":scope > [data-menu-grupo-contenido]");
      if (!grupo || !contenido) return;

      const abierto = botonGrupo.getAttribute("aria-expanded") === "true";
      const contenedorHermanos = grupo.parentElement;

      contenedorHermanos
        ?.querySelectorAll(":scope > [data-menu-grupo]")
        .forEach((otroGrupo) => {
          if (otroGrupo === grupo) return;
          const otroBoton = otroGrupo.querySelector(":scope > [data-menu-grupo-boton]");
          const otroContenido = otroGrupo.querySelector(":scope > [data-menu-grupo-contenido]");
          otroBoton?.setAttribute("aria-expanded", "false");
          if (otroContenido) otroContenido.hidden = true;
        });

      botonGrupo.setAttribute("aria-expanded", String(!abierto));
      contenido.hidden = abierto;

      requestAnimationFrame(posicionarMenuEnVentana);
    });
  });

  const selectorPersona = panelRaiz.querySelector(
    "[data-panel-usuario-persona-activa]"
  );

  selectorPersona?.addEventListener("click", evento => {
    evento.stopPropagation();
  });

  selectorPersona?.addEventListener("change", async evento => {
    evento.stopPropagation();

    const personaId = String(evento.currentTarget.value || "").trim();
    if (!personaId) return;

    selectorPersona.disabled = true;

    try {
      const contextoActual = await ContextoUsuario.inicializar();

      if (personaId === contextoActual.personaUsuario.personaId) {
        await ContextoUsuario.volverAPersonaPropia();
      } else {
        await ContextoUsuario.seleccionarPersonaActiva(personaId);
      }

      /*
       * Recarga completa intencionada:
       * la Persona Activa influye en perfil, textos, navegación y módulos.
       * Así ningún componente conserva datos del contexto anterior.
       */
      window.location.reload();
    } catch (error) {
      console.error("No se pudo cambiar la Persona Activa.", error);
      selectorPersona.disabled = false;
      alert("No se pudo cambiar la Persona Activa.");
    }
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

  /*
   * Fase multiusuario:
   * la protección y redirección de sesión pertenecen exclusivamente a
   * auth-guard.js. El Panel de Usuario no debe competir con el guard ni
   * decidir que una sesión todavía en restauración es nula.
   *
   * iniciarPanelUsuario() se invoca desde páginas ya autenticadas.
   */
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
