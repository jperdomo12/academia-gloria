import { obtenerPerfil } from "../compartido/js/perfil-usuario.js";
import {
  formatearClaveFecha,
  obtenerMenuPorFecha,
  obtenerSiguienteMenuDesde
} from "./datos/menu.js";

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function escapar(texto = "") {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fechaDesdeClave(clave) {
  const [anio, mes, dia] = clave.split("-").map(Number);
  return new Date(anio, mes - 1, dia, 12, 0, 0, 0);
}

function textoFecha(fecha) {
  return `${DIAS[fecha.getDay()]} ${fecha.getDate()} de ${MESES[fecha.getMonth()]}`;
}

function asegurarEstilos() {
  if (document.querySelector('link[data-menu-inicio-css="true"]')) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = new URL("./tarjeta-inicio.css", import.meta.url).href;
  link.dataset.menuInicioCss = "true";
  document.head.append(link);
}

function htmlPlatos(menu) {
  const postreIcono = menu.postre.toLowerCase().includes("yogur") ? "🥛" : "🍎";
  return `
    <div class="menu-inicio__plato"><span>🥣</span><strong>${escapar(menu.primero)}</strong></div>
    <div class="menu-inicio__plato"><span>🍽️</span><strong>${escapar(menu.segundo)}</strong></div>
    <div class="menu-inicio__plato"><span>${postreIcono}</span><strong>${escapar(menu.postre)}</strong></div>
  `;
}

async function crearTarjeta() {
  if (document.querySelector("[data-menu-comedor]")) return;

  const referencia = document.querySelector(".mi-camino-principal");
  if (!referencia) return;

  asegurarEstilos();

  const perfil = await obtenerPerfil();
  const nombre = perfil.nombreVisible || perfil.nombre || "Exploradora";
  const hoy = new Date();
  hoy.setHours(12, 0, 0, 0);

  const menuHoy = obtenerMenuPorFecha(hoy);
  const siguiente = menuHoy ? null : obtenerSiguienteMenuDesde(hoy);
  const fechaMostrada = menuHoy ? hoy : (siguiente ? fechaDesdeClave(siguiente.clave) : hoy);
  const menuMostrado = menuHoy || siguiente?.menu || null;

  const enlace = document.createElement("a");
  enlace.className = "superficie bloque-enlace menu-inicio";
  enlace.href = "menu-comedor/";
  enlace.dataset.menuComedor = "true";
  enlace.setAttribute("aria-label", "Abrir Menú del Cole");

  if (menuMostrado) {
    enlace.innerHTML = `
      <div class="menu-inicio__contenido">
        <span class="menu-inicio__etiqueta">${menuHoy ? "⭐ Hoy en el comedor" : "👀 Próximo menú"}</span>
        <h2>${escapar(nombre)}, ${menuHoy ? "hoy toca… 😋" : "mira lo que viene…"}</h2>
        <p class="menu-inicio__fecha">${escapar(textoFecha(fechaMostrada))}</p>
        <span class="menu-inicio__accion">Ver el menú del cole y toda la semana →</span>
      </div>
      <div class="menu-inicio__platos">
        ${htmlPlatos(menuMostrado)}
      </div>
    `;
  } else {
    enlace.innerHTML = `
      <div class="menu-inicio__contenido">
        <span class="menu-inicio__etiqueta">🍽️ Menú del Cole</span>
        <h2>${escapar(nombre)}, tu menú vive aquí</h2>
        <p class="menu-inicio__fecha">Cuando incorporemos el nuevo PDF mensual, podrás descubrir aquí qué toca cada día.</p>
        <span class="menu-inicio__accion">Abrir Menú del Cole →</span>
      </div>
      <div class="menu-inicio__platos">
        <div class="menu-inicio__plato"><span>🥣</span><strong>Primer plato</strong></div>
        <div class="menu-inicio__plato"><span>🍽️</span><strong>Segundo plato</strong></div>
        <div class="menu-inicio__plato"><span>🍎</span><strong>Postre</strong></div>
      </div>
    `;
  }

  referencia.insertAdjacentElement("afterend", enlace);
}

crearTarjeta().catch(error => {
  console.warn("No se pudo mostrar la tarjeta del Menú del Cole.", error);
});
