/* Academia Gloria Valentina · Recordatorios de calendario al ingresar */

import { Academia } from "../api/academia.js";
import { ContextoUsuario } from "./contexto-usuario.js";

const CLAVE_SESION = "academia.recordatoriosCalendario.v1";
const ID_DIALOGO = "recordatoriosCalendarioIngreso";

function texto(valor = "") {
  return String(valor ?? "").replace(/\s+/g, " ").trim();
}

function fechaLocalISO(fecha = new Date()) {
  return [
    fecha.getFullYear(),
    String(fecha.getMonth() + 1).padStart(2, "0"),
    String(fecha.getDate()).padStart(2, "0")
  ].join("-");
}

function mananaDesde(fecha) {
  return new Date(
    fecha.getFullYear(),
    fecha.getMonth(),
    fecha.getDate() + 1,
    12,
    0,
    0,
    0
  );
}

function claveVista(userId, fechaISO) {
  return `${CLAVE_SESION}:${texto(userId)}:${fechaISO}`;
}

function yaMostrado(clave) {
  try {
    return window.sessionStorage.getItem(clave) === "1";
  } catch {
    return false;
  }
}

function marcarMostrado(clave) {
  try {
    window.sessionStorage.setItem(clave, "1");
  } catch {
    /* sessionStorage puede estar bloqueado; el recordatorio sigue funcionando. */
  }
}

function esperarEstilos(enlace) {
  if (enlace.sheet) return Promise.resolve(enlace);

  return new Promise((resolve, reject) => {
    const limpiar = () => {
      enlace.removeEventListener("load", cargado);
      enlace.removeEventListener("error", error);
    };

    const cargado = () => {
      limpiar();
      resolve(enlace);
    };

    const error = () => {
      limpiar();
      reject(new Error("No se pudieron cargar los estilos de recordatorios."));
    };

    enlace.addEventListener("load", cargado, { once: true });
    enlace.addEventListener("error", error, { once: true });
  });
}

async function asegurarEstilos() {
  const existente = document.querySelector(
    'link[data-recordatorios-calendario="true"]'
  );
  if (existente) {
    await esperarEstilos(existente);
    return;
  }

  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("../css/recordatorios-calendario.css", import.meta.url).href;
  enlace.dataset.recordatoriosCalendario = "true";

  const carga = esperarEstilos(enlace);
  document.head.appendChild(enlace);
  await carga;
}

async function leerEventosHoyYManana(hoy, manana) {
  const anos = [...new Set([hoy.getFullYear(), manana.getFullYear()])];
  const porAno = await Promise.all(anos.map(anio => Academia.eventos.leer(anio)));
  const eventos = porAno.flat();
  const hoyISO = fechaLocalISO(hoy);
  const mananaISO = fechaLocalISO(manana);

  const ordenar = lista => [...lista].sort((a, b) =>
    texto(a.titulo).localeCompare(texto(b.titulo), "es", { sensitivity: "base" })
  );

  return {
    hoy: ordenar(eventos.filter(evento => texto(evento.fecha) === hoyISO)),
    manana: ordenar(eventos.filter(evento => texto(evento.fecha) === mananaISO))
  };
}

function crearEvento(evento) {
  const item = document.createElement("article");
  item.className = "recordatorio-calendario__evento";

  const icono = document.createElement("span");
  icono.className = "recordatorio-calendario__evento-icono";
  icono.setAttribute("aria-hidden", "true");
  icono.textContent = texto(evento.icono) || "⭐";

  const contenido = document.createElement("div");

  const titulo = document.createElement("strong");
  titulo.textContent = texto(evento.titulo) || "Evento";
  contenido.appendChild(titulo);

  const categoria = texto(evento.categoria);
  const nota = texto(evento.nota);
  if (categoria || nota) {
    const detalle = document.createElement("p");
    detalle.textContent = [categoria, nota].filter(Boolean).join(" · ");
    contenido.appendChild(detalle);
  }

  item.append(icono, contenido);
  return item;
}

function crearSeccion(etiqueta, icono, eventos, variante) {
  if (!eventos.length) return null;

  const seccion = document.createElement("section");
  seccion.className = `recordatorio-calendario__seccion recordatorio-calendario__seccion--${variante}`;

  const titulo = document.createElement("h3");
  titulo.innerHTML = `<span aria-hidden="true">${icono}</span> ${etiqueta}`;

  const lista = document.createElement("div");
  lista.className = "recordatorio-calendario__eventos";
  eventos.forEach(evento => lista.appendChild(crearEvento(evento)));

  seccion.append(titulo, lista);
  return seccion;
}

function crearDialogo({ nombre, eventosHoy, eventosManana }) {
  document.getElementById(ID_DIALOGO)?.remove();

  const dialogo = document.createElement("dialog");
  dialogo.id = ID_DIALOGO;
  dialogo.className = "recordatorio-calendario";
  dialogo.setAttribute("aria-labelledby", "recordatorioCalendarioTitulo");

  const cabecera = document.createElement("header");
  cabecera.className = "recordatorio-calendario__cabecera";
  cabecera.innerHTML = `
    <div class="recordatorio-calendario__simbolo" aria-hidden="true">📅</div>
    <div>
      <span>UN PEQUEÑO RECORDATORIO</span>
      <h2 id="recordatorioCalendarioTitulo"></h2>
      <p>Estas son las cosas importantes que tienes hoy y mañana.</p>
    </div>
  `;
  cabecera.querySelector("h2").textContent = `¡${nombre}, tienes cosas importantes!`;

  const cerrar = document.createElement("button");
  cerrar.type = "button";
  cerrar.className = "recordatorio-calendario__cerrar";
  cerrar.setAttribute("aria-label", "Cerrar recordatorio");
  cerrar.textContent = "×";
  cabecera.appendChild(cerrar);

  const cuerpo = document.createElement("div");
  cuerpo.className = "recordatorio-calendario__cuerpo";

  const hoy = crearSeccion("HOY", "📅", eventosHoy, "hoy");
  const manana = crearSeccion("MAÑANA", "⏰", eventosManana, "manana");
  if (hoy) cuerpo.appendChild(hoy);
  if (manana) cuerpo.appendChild(manana);

  const acciones = document.createElement("footer");
  acciones.className = "recordatorio-calendario__acciones";

  const entendido = document.createElement("button");
  entendido.type = "button";
  entendido.className = "recordatorio-calendario__boton recordatorio-calendario__boton--principal";
  entendido.textContent = "Entendido 😊";

  const verCalendario = document.createElement("a");
  verCalendario.className = "recordatorio-calendario__boton recordatorio-calendario__boton--secundario";
  verCalendario.href = new URL("calendarios/", document.baseURI).href;
  verCalendario.textContent = "📅 Ver mi calendario";

  acciones.append(entendido, verCalendario);
  dialogo.append(cabecera, cuerpo, acciones);
  document.body.appendChild(dialogo);

  const cerrarDialogo = () => {
    if (dialogo.open) dialogo.close();
  };

  cerrar.addEventListener("click", cerrarDialogo);
  entendido.addEventListener("click", cerrarDialogo);
  dialogo.addEventListener("click", event => {
    if (event.target === dialogo) cerrarDialogo();
  });
  dialogo.addEventListener("close", () => dialogo.remove(), { once: true });

  return { dialogo, entendido };
}

export async function iniciarRecordatoriosCalendarioIngreso() {
  try {
    const contexto = await ContextoUsuario.inicializar();
    const userId = texto(contexto.userIdPersonaActiva);
    if (!userId) return false;

    const ahora = new Date();
    const hoy = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate(),
      12,
      0,
      0,
      0
    );
    const manana = mananaDesde(hoy);
    const hoyISO = fechaLocalISO(hoy);
    const clave = claveVista(userId, hoyISO);

    if (yaMostrado(clave)) return false;

    const { hoy: eventosHoy, manana: eventosManana } =
      await leerEventosHoyYManana(hoy, manana);

    if (!eventosHoy.length && !eventosManana.length) return false;

    await asegurarEstilos();

    const persona = contexto.personaActiva || {};
    const nombre = texto(persona.nombreVisible || persona.nombre) || "Gloria";
    const { dialogo, entendido } = crearDialogo({
      nombre,
      eventosHoy,
      eventosManana
    });

    marcarMostrado(clave);
    dialogo.showModal();
    window.requestAnimationFrame(() => entendido.focus());
    return true;
  } catch (error) {
    console.debug(
      "No se pudieron preparar los recordatorios del calendario al ingresar.",
      error
    );
    return false;
  }
}
