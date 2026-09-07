import { protegerPagina } from "../compartido/js/auth-guard.js";
import { obtenerPerfil } from "../compartido/js/perfil-usuario.js";
import {
  MENUS_COMEDOR,
  formatearClaveFecha,
  obtenerMenuPorFecha,
  obtenerMenuPorClave,
  obtenerClavesDisponibles,
  obtenerSiguienteMenuDesde
} from "./datos/menu.js";

const DIAS_SEMANA = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function fechaDesdeClave(clave) {
  const [anio, mes, dia] = clave.split("-").map(Number);
  return new Date(anio, mes - 1, dia, 12, 0, 0, 0);
}

function escapar(texto = "") {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatearFechaLarga(fecha) {
  return `${DIAS_SEMANA[fecha.getDay()]} ${fecha.getDate()} de ${MESES[fecha.getMonth()]}`;
}

function formatearFechaCorta(fecha) {
  return `${fecha.getDate()} ${MESES[fecha.getMonth()].slice(0, 3)}.`;
}

function sumarDias(fecha, cantidad) {
  const copia = new Date(fecha);
  copia.setDate(copia.getDate() + cantidad);
  return copia;
}

function inicioSemana(fecha) {
  const copia = new Date(fecha);
  const dia = copia.getDay();
  const diferencia = dia === 0 ? -6 : 1 - dia;
  copia.setDate(copia.getDate() + diferencia);
  copia.setHours(12, 0, 0, 0);
  return copia;
}

function crearPlatos(menu) {
  const acompanamiento = menu.acompanamiento
    ? `<div class="plato"><span class="plato__icono">🥗</span><small>Acompañamiento</small><strong>${escapar(menu.acompanamiento)}</strong></div>`
    : "";

  return `
    <div class="platos">
      <div class="plato"><span class="plato__icono">🥣</span><small>Primer plato</small><strong>${escapar(menu.primero)}</strong></div>
      <div class="plato"><span class="plato__icono">🍽️</span><small>Segundo plato</small><strong>${escapar(menu.segundo)}</strong></div>
      ${acompanamiento}
      <div class="plato"><span class="plato__icono">${menu.postre.toLowerCase().includes("yogur") ? "🥛" : "🍎"}</span><small>Postre</small><strong>${escapar(menu.postre)}</strong></div>
    </div>`;
}

function renderHoy(fecha, menu, nombre) {
  const contenedor = document.getElementById("menuHoy");
  if (!contenedor) return;

  if (!menu) {
    const siguiente = obtenerSiguienteMenuDesde(fecha);
    contenedor.innerHTML = `
      <span class="menu-hoy__etiqueta">🌈 Hoy</span>
      <h3>${escapar(nombre)}, hoy no hay menú del cole</h3>
      <p class="menu-hoy__mensaje">Disfruta el día. Aquí tendrás preparado el próximo menú cuando vuelva el comedor.</p>
      <div class="menu-vacio">${siguiente ? `El próximo menú disponible es el ${escapar(formatearFechaLarga(fechaDesdeClave(siguiente.clave)))}.` : "Todavía no hay otro menú mensual incorporado."}</div>
    `;
    return;
  }

  contenedor.innerHTML = `
    <span class="menu-hoy__etiqueta">⭐ Hoy en el comedor</span>
    <h3>${escapar(nombre)}, hoy toca… 😋</h3>
    <p class="menu-hoy__mensaje">${escapar(formatearFechaLarga(fecha))} · Ya puedes descubrir tu comida de hoy.</p>
    ${crearPlatos(menu)}
    <span class="menu-kcal">⚡ ${menu.kcal} Kcal · dato del menú oficial</span>
  `;
}

function renderProximo(fecha) {
  const contenedor = document.getElementById("menuProximo");
  if (!contenedor) return;

  const manana = sumarDias(fecha, 1);
  const menuManana = obtenerMenuPorFecha(manana);
  const siguiente = menuManana
    ? { clave: formatearClaveFecha(manana), menu: menuManana }
    : obtenerSiguienteMenuDesde(fecha);

  if (!siguiente) {
    contenedor.innerHTML = `
      <div class="menu-proximo__icono">🗓️</div>
      <h3>Próximo menú</h3>
      <p>Este es el último menú incorporado. Cuando llegue el PDF del próximo mes, aparecerá aquí automáticamente.</p>
    `;
    return;
  }

  const fechaSiguiente = fechaDesdeClave(siguiente.clave);
  const esManana = formatearClaveFecha(fechaSiguiente) === formatearClaveFecha(manana);

  contenedor.innerHTML = `
    <div class="menu-proximo__icono">${esManana ? "👀" : "🗓️"}</div>
    <h3>${esManana ? "¿Y mañana?" : "Próximo menú"}</h3>
    <p><strong>${escapar(formatearFechaLarga(fechaSiguiente))}</strong></p>
    <p style="margin-top:10px">🥣 ${escapar(siguiente.menu.primero)}</p>
    <p style="margin-top:6px">🍽️ ${escapar(siguiente.menu.segundo)}</p>
    <p style="margin-top:6px">${siguiente.menu.postre.toLowerCase().includes("yogur") ? "🥛" : "🍎"} ${escapar(siguiente.menu.postre)}</p>
  `;
}

function renderSemana(fecha) {
  const contenedor = document.getElementById("semanaMenu");
  const titulo = document.getElementById("tituloSemana");
  if (!contenedor) return;

  const lunes = inicioSemana(fecha);
  const viernes = sumarDias(lunes, 4);
  if (titulo) titulo.textContent = `${lunes.getDate()}–${viernes.getDate()} de ${MESES[lunes.getMonth()]}`;

  contenedor.innerHTML = Array.from({ length: 5 }, (_, indice) => {
    const dia = sumarDias(lunes, indice);
    const menu = obtenerMenuPorFecha(dia);
    const esHoy = formatearClaveFecha(dia) === formatearClaveFecha(fecha);

    if (!menu) {
      return `
        <article class="dia-menu dia-menu--sin-menu ${esHoy ? "dia-menu--hoy" : ""}">
          <div class="dia-menu__cabecera"><strong>${DIAS_SEMANA[dia.getDay()]}</strong><span class="dia-menu__numero">${dia.getDate()}</span></div>
          <div class="dia-menu__plato">Sin menú incorporado para este día.</div>
        </article>`;
    }

    return `
      <article class="dia-menu ${esHoy ? "dia-menu--hoy" : ""}">
        <div class="dia-menu__cabecera"><strong>${DIAS_SEMANA[dia.getDay()]}${esHoy ? " ⭐" : ""}</strong><span class="dia-menu__numero">${dia.getDate()}</span></div>
        <div class="dia-menu__plato"><span>Primero</span>${escapar(menu.primero)}</div>
        <div class="dia-menu__plato"><span>Segundo</span>${escapar(menu.segundo)}</div>
        <div class="dia-menu__plato"><span>Postre</span>${escapar(menu.postre)}</div>
      </article>`;
  }).join("");
}

function obtenerMesParaMostrar(fecha) {
  const mesActual = formatearClaveFecha(fecha).slice(0, 7);
  if (MENUS_COMEDOR.some(menu => menu.mes === mesActual)) return mesActual;
  return MENUS_COMEDOR.at(-1)?.mes || null;
}

function renderMes(fecha) {
  const contenedor = document.getElementById("mesMenu");
  const titulo = document.getElementById("tituloMes");
  if (!contenedor) return;

  const mes = obtenerMesParaMostrar(fecha);
  if (!mes) {
    contenedor.innerHTML = '<div class="menu-vacio">Todavía no hay menús incorporados.</div>';
    return;
  }

  const [anio, numeroMes] = mes.split("-").map(Number);
  if (titulo) titulo.textContent = `${MESES[numeroMes - 1]} ${anio}`;

  const claves = obtenerClavesDisponibles().filter(clave => clave.startsWith(`${mes}-`));
  contenedor.innerHTML = claves.map(clave => {
    const dia = fechaDesdeClave(clave);
    const menu = obtenerMenuPorClave(clave);
    return `
      <article class="mes-dia">
        <div class="mes-dia__fecha"><strong>${dia.getDate()}</strong><span>${DIAS_SEMANA[dia.getDay()]}</span></div>
        <div class="mes-dia__contenido">
          <strong>🥣 ${escapar(menu.primero)}</strong>
          <p>🍽️ ${escapar(menu.segundo)}</p>
          ${menu.acompanamiento ? `<p>🥗 ${escapar(menu.acompanamiento)}</p>` : ""}
          <p>${menu.postre.toLowerCase().includes("yogur") ? "🥛" : "🍎"} ${escapar(menu.postre)}</p>
        </div>
      </article>`;
  }).join("");
}

function actualizarFuente(fecha) {
  const enlace = document.getElementById("fuenteMenuOficial");
  if (!enlace) return;
  const mes = obtenerMesParaMostrar(fecha);
  const fuente = MENUS_COMEDOR.find(menu => menu.mes === mes)?.fuente;
  if (fuente) enlace.href = fuente;
}

protegerPagina({
  loginUrl: "../login.html",
  onAuthenticated: async () => {
    const perfil = await obtenerPerfil();
    const nombre = perfil.nombreVisible || perfil.nombre || "Exploradora";
    const hoy = new Date();
    hoy.setHours(12, 0, 0, 0);

    document.querySelectorAll("[data-nombre-menu]").forEach(elemento => {
      elemento.textContent = nombre;
    });

    renderHoy(hoy, obtenerMenuPorFecha(hoy), nombre);
    renderProximo(hoy);
    renderSemana(hoy);
    renderMes(hoy);
    actualizarFuente(hoy);
  }
});
