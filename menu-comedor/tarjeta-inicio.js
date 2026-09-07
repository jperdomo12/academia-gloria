import { obtenerPerfil } from "../compartido/js/perfil-usuario.js";
import {
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
  const mes = MESES[fecha.getMonth()];
  const mesVisible = `${mes.charAt(0).toUpperCase()}${mes.slice(1)}`;
  return `${DIAS[fecha.getDay()]} ${fecha.getDate()} de ${mesVisible}`;
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
  const acompanamiento = menu.acompanamiento
    ? `<span class="menu-inicio__plato"><span aria-hidden="true">🥗</span><strong>${escapar(menu.acompanamiento)}</strong></span>`
    : "";
  const postreIcono = menu.postre.toLowerCase().includes("yogur") ? "🥛" : "🍎";

  return `
    <span class="menu-inicio__plato"><span aria-hidden="true">🍲</span><strong>${escapar(menu.primero)}</strong></span>
    <span class="menu-inicio__plato"><span aria-hidden="true">🍴</span><strong>${escapar(menu.segundo)}</strong></span>
    ${acompanamiento}
    <span class="menu-inicio__plato"><span aria-hidden="true">${postreIcono}</span><strong>${escapar(menu.postre)}</strong></span>
  `;
}

async function crearTarjeta() {
  if (document.querySelector("[data-menu-comedor]")) return;

  const referencia = document.querySelector(".hero");
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
    const fechaVisible = textoFecha(fechaMostrada);
    const titulo = menuHoy
      ? `${nombre}, hoy ${fechaVisible} toca… 😋`
      : `${nombre}, el ${fechaVisible} toca… 👀`;

    enlace.innerHTML = `
      <div class="menu-inicio__intro">
        <span class="menu-inicio__icono" aria-hidden="true">🍽️</span>
        <span class="menu-inicio__etiqueta">${menuHoy ? "⭐ Hoy en el comedor" : "👀 Próximo menú"}</span>
      </div>

      <div class="menu-inicio__contenido">
        <h2>${escapar(titulo)}</h2>
        <div class="menu-inicio__platos">
          ${htmlPlatos(menuMostrado)}
        </div>
      </div>

      <span class="menu-inicio__accion">
        Ver menú <span aria-hidden="true">→</span>
      </span>
    `;
  } else {
    enlace.innerHTML = `
      <div class="menu-inicio__intro">
        <span class="menu-inicio__icono" aria-hidden="true">🍽️</span>
        <span class="menu-inicio__etiqueta">Menú del Cole</span>
        <span class="menu-inicio__fecha">Tu menú mensual</span>
      </div>

      <div class="menu-inicio__contenido">
        <h2>${escapar(nombre)}, tu menú vive aquí</h2>
        <div class="menu-inicio__platos">
          <span class="menu-inicio__plato"><span aria-hidden="true">🍲</span><strong>Primer plato</strong></span>
          <span class="menu-inicio__plato"><span aria-hidden="true">🍴</span><strong>Segundo plato</strong></span>
          <span class="menu-inicio__plato"><span aria-hidden="true">🍎</span><strong>Postre</strong></span>
        </div>
      </div>

      <span class="menu-inicio__accion">
        Abrir menú <span aria-hidden="true">→</span>
      </span>
    `;
  }

  referencia.insertAdjacentElement("afterend", enlace);
}

crearTarjeta().catch(error => {
  console.warn("No se pudo mostrar la tarjeta del Menú del Cole.", error);
});
