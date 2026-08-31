/* Academia Gloria Valentina · Gestión de Misiones · Filtro y paginación */

import { Academia } from "../../compartido/api/academia.js";

const TAMANO_PAGINA = 5;
const TIPOS_VIGENTES = Object.freeze({
  actividad_modulo: "Actividad de un módulo",
  tarea_libre: "Misión libre",
  repaso_academico: "Repaso académico"
});
const TIPOS_ANTERIORES = Object.freeze({
  tiempo_practica: "Tiempo de práctica",
  cantidad_actividades: "Cantidad de actividades",
  tarea_combinada: "Misión combinada"
});

let tareas = [];
let tareasPorId = new Map();
let filtroTipo = "todas";
let paginaActual = 1;
let timerRecarga = null;

const $ = id => document.getElementById(id);

function etiquetaTipo(tipo = "") {
  return TIPOS_VIGENTES[tipo] || TIPOS_ANTERIORES[tipo] || tipo || "Sin tipo";
}

function cargarEstilos() {
  if (document.querySelector('link[data-listado-misiones-css="true"]')) return;
  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./listado-misiones.css", import.meta.url).href;
  enlace.dataset.listadoMisionesCss = "true";
  document.head.appendChild(enlace);
}

function configurarTiposPreparacion() {
  const select = $("tipo");
  if (!select) return;

  Object.keys(TIPOS_ANTERIORES).forEach(tipo => {
    const opcion = select.querySelector(`option[value="${CSS.escape(tipo)}"]`);
    if (!opcion) return;
    opcion.hidden = true;
    opcion.disabled = true;
    opcion.dataset.tipoAnterior = "true";
  });

  select.addEventListener("change", () => {
    select.querySelectorAll("[data-tipo-anterior]").forEach(opcion => {
      if (opcion.value !== select.value) {
        opcion.hidden = true;
        opcion.disabled = true;
      }
    });
  });
}

function habilitarTipoAnteriorParaEdicion(id) {
  const tarea = tareasPorId.get(String(id || ""));
  const tipo = String(tarea?.tipo || "");
  if (!TIPOS_ANTERIORES[tipo]) return;

  const select = $("tipo");
  const opcion = select?.querySelector(`option[value="${CSS.escape(tipo)}"]`);
  if (!opcion) return;

  opcion.hidden = false;
  opcion.disabled = false;
  opcion.textContent = `${TIPOS_ANTERIORES[tipo]} · tipo anterior`;
}

function asegurarControles() {
  const lista = $("listaTareas");
  if (!lista || $("herramientasListadoMisiones")) return;

  const herramientas = document.createElement("div");
  herramientas.id = "herramientasListadoMisiones";
  herramientas.className = "listado-misiones__herramientas";
  herramientas.innerHTML = `
    <label class="listado-misiones__filtro-tipo">
      <span>Tipo de misión</span>
      <select id="filtroTipoMision" aria-label="Filtrar por tipo de misión">
        <option value="todas">Todos los tipos</option>
      </select>
    </label>
    <span id="contadorListadoMisiones" class="listado-misiones__contador"></span>
  `;

  lista.insertAdjacentElement("beforebegin", herramientas);

  const paginador = document.createElement("nav");
  paginador.id = "paginadorListadoMisiones";
  paginador.className = "listado-misiones__paginador";
  paginador.setAttribute("aria-label", "Paginación de Misiones registradas");
  lista.insertAdjacentElement("afterend", paginador);

  $("filtroTipoMision")?.addEventListener("change", event => {
    filtroTipo = event.target.value || "todas";
    paginaActual = 1;
    aplicarListado();
  });
}

function actualizarOpcionesFiltro() {
  const select = $("filtroTipoMision");
  if (!select) return;

  const presentes = new Set(tareas.map(tarea => String(tarea.tipo || "")).filter(Boolean));
  const opciones = [
    '<option value="todas">Todos los tipos</option>',
    ...Object.entries(TIPOS_VIGENTES).map(([valor, etiqueta]) =>
      `<option value="${valor}">${etiqueta}</option>`
    ),
    ...Object.entries(TIPOS_ANTERIORES)
      .filter(([valor]) => presentes.has(valor))
      .map(([valor, etiqueta]) =>
        `<option value="${valor}">${etiqueta} · anterior</option>`
      )
  ];

  select.innerHTML = opciones.join("");
  select.value = [...select.options].some(opcion => opcion.value === filtroTipo)
    ? filtroTipo
    : "todas";
  filtroTipo = select.value;
}

function idDeTarjeta(tarjeta) {
  return String(tarjeta.querySelector("[data-id]")?.dataset.id || "").trim();
}

function tarjetasVisiblesPorTipo() {
  const lista = $("listaTareas");
  if (!lista) return [];

  return [...lista.querySelectorAll(":scope > .tarea-card")].filter(tarjeta => {
    const tarea = tareasPorId.get(idDeTarjeta(tarjeta));
    if (!tarea || filtroTipo === "todas") return true;
    return String(tarea.tipo || "") === filtroTipo;
  });
}

function renderPaginador(total) {
  const paginador = $("paginadorListadoMisiones");
  const contador = $("contadorListadoMisiones");
  if (!paginador || !contador) return;

  if (!total) {
    contador.textContent = "0 Misiones";
    paginador.innerHTML = "";
    return;
  }

  const totalPaginas = Math.max(1, Math.ceil(total / TAMANO_PAGINA));
  paginaActual = Math.min(Math.max(1, paginaActual), totalPaginas);
  const inicio = (paginaActual - 1) * TAMANO_PAGINA;
  const fin = Math.min(inicio + TAMANO_PAGINA, total);

  contador.textContent = `${inicio + 1}–${fin} de ${total}`;

  if (totalPaginas <= 1) {
    paginador.innerHTML = "";
    return;
  }

  paginador.innerHTML = `
    <button type="button" data-listado-pagina="-1" ${paginaActual <= 1 ? "disabled" : ""}>← Anterior</button>
    <span>Página ${paginaActual} de ${totalPaginas}</span>
    <button type="button" data-listado-pagina="1" ${paginaActual >= totalPaginas ? "disabled" : ""}>Siguiente →</button>
  `;

  paginador.querySelectorAll("[data-listado-pagina]").forEach(button => {
    button.addEventListener("click", () => {
      paginaActual += Number(button.dataset.listadoPagina || 0);
      aplicarListado();
      $("herramientasListadoMisiones")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function aplicarListado() {
  const lista = $("listaTareas");
  if (!lista) return;

  const todasLasTarjetas = [...lista.querySelectorAll(":scope > .tarea-card")];
  const candidatas = tarjetasVisiblesPorTipo();
  const candidatasSet = new Set(candidatas);
  const totalPaginas = Math.max(1, Math.ceil(candidatas.length / TAMANO_PAGINA));
  paginaActual = Math.min(Math.max(1, paginaActual), totalPaginas);
  const inicio = (paginaActual - 1) * TAMANO_PAGINA;
  const pagina = new Set(candidatas.slice(inicio, inicio + TAMANO_PAGINA));

  todasLasTarjetas.forEach(tarjeta => {
    tarjeta.hidden = !candidatasSet.has(tarjeta) || !pagina.has(tarjeta);
  });

  let vacio = $("estadoListadoTipoMisiones");
  if (!vacio) {
    vacio = document.createElement("div");
    vacio.id = "estadoListadoTipoMisiones";
    vacio.className = "estado-carga listado-misiones__vacio hidden";
    lista.insertAdjacentElement("beforebegin", vacio);
  }

  const sinResultados = todasLasTarjetas.length > 0 && candidatas.length === 0;
  vacio.classList.toggle("hidden", !sinResultados);
  vacio.textContent = sinResultados
    ? `No hay Misiones de tipo «${etiquetaTipo(filtroTipo)}» en el estado seleccionado.`
    : "";

  renderPaginador(candidatas.length);
}

async function cargarTareas() {
  try {
    tareas = await Academia.tareas.leer();
    tareasPorId = new Map(tareas.map(tarea => [String(tarea.id || ""), tarea]));
    actualizarOpcionesFiltro();
    aplicarListado();
  } catch (error) {
    console.warn("No se pudo actualizar el filtro de tipos de Misiones.", error);
    const contador = $("contadorListadoMisiones");
    if (contador) {
      contador.textContent = `No se pudo actualizar el listado. Razón: ${error.message || "Error no identificado"}`;
    }
  }
}

function programarRecarga() {
  window.clearTimeout(timerRecarga);
  timerRecarga = window.setTimeout(() => cargarTareas(), 80);
}

function observarListado() {
  const lista = $("listaTareas");
  if (!lista) return;

  new MutationObserver(() => {
    programarRecarga();
  }).observe(lista, { childList: true });

  document.addEventListener("click", event => {
    const estado = event.target.closest?.("[data-filter]");
    if (estado) {
      paginaActual = 1;
      window.setTimeout(aplicarListado, 0);
    }
  }, true);

  document.addEventListener("click", event => {
    const control = event.target.closest?.('[data-action="edit"], [data-action="view"]');
    if (control) habilitarTipoAnteriorParaEdicion(control.dataset.id);
  }, true);
}

async function iniciar() {
  cargarEstilos();
  configurarTiposPreparacion();
  asegurarControles();
  observarListado();
  await cargarTareas();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
