/**
 * Academia Gloria Valentina
 * Cabecera global de navegación · v2.3 estable
 *
 * Estructura estable:
 * NAVEGACIÓN IZQUIERDA · PANTALLA ACTUAL · PANEL DEL ALUMNO
 *
 * Pantallas sin data-nav-back:
 * ACADEMIA · PANTALLA ACTUAL · MENÚ DESPLEGABLE.
 *
 * Pantallas con data-nav-back:
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

function rutaAlternativaVolver() {
  return String(document.body?.dataset?.navBack || "").trim();
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

function htmlNavegacionIzquierda() {
  const rutaAlternativa = rutaAlternativaVolver();

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

function configurarVolverContextual(cabecera) {
  const boton = cabecera.querySelector("[data-nav-volver]");
  if (!boton) return;

  const rutaAlternativa =
    boton.dataset.rutaAlternativa ||
    rutaAlternativaVolver() ||
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

  const rutaActual = rutaRelativaActual();
  const actual = buscarNodo(UBICACIONES_ACADEMIA, rutaActual);

  const cabecera = document.createElement("nav");
  cabecera.className = "nav-global";
  cabecera.setAttribute("aria-label", "Cabecera principal de la Academia");

  cabecera.innerHTML = `
    <div class="nav-global__barra">
      ${htmlNavegacionIzquierda()}

      <div class="nav-global__ubicacion" aria-label="Pantalla actual">
        <span aria-hidden="true">${escaparHTML(iconoPantalla(actual))}</span>
        <span>${escaparHTML(tituloPantalla(actual))}</span>
      </div>

      <div class="nav-global__usuario" data-nav-panel-usuario aria-label="Menú del alumno"></div>
    </div>
  `;

  document.body.prepend(cabecera);
  configurarVolverContextual(cabecera);
  await trasladarPanelUsuario(cabecera);
}

function iniciarNavegacionGlobal() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", crearCabecera, { once: true });
  } else {
    crearCabecera();
  }
}

iniciarNavegacionGlobal();
