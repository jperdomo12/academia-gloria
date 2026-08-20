/**
 * Academia Gloria Valentina
 * Cabecera global de navegación · v2.1 estable
 *
 * Estructura:
 * LOGO · PANTALLA ACTUAL · PANEL DEL ALUMNO
 *
 * El menú global independiente se elimina. El panel del alumno se traslada
 * automáticamente a la zona derecha de la cabecera y concentra la navegación.
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
      <a class="nav-global__marca" href="${urlAcademia("")}" aria-label="Ir al inicio de la Academia">
        <span aria-hidden="true">🌈</span>
        <span>Academia</span>
      </a>

      <div class="nav-global__ubicacion" aria-label="Pantalla actual">
        <span aria-hidden="true">${escaparHTML(actual?.icono || "🌈")}</span>
        <span>${escaparHTML(document.body?.dataset?.pageTitle || actual?.titulo || document.title || "Academia")}</span>
      </div>

      <div class="nav-global__usuario" data-nav-panel-usuario aria-label="Menú del alumno"></div>
    </div>
  `;

  document.body.prepend(cabecera);
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
