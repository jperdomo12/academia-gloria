/* Academia Gloria Valentina · Gestión de Misiones · Filtros y paginación */

import { Academia } from "../../compartido/api/academia.js";

const TAMANO_PAGINA = 5;
const TIPOS_LEGACY = new Set([
  "tiempo_practica",
  "cantidad_actividades",
  "tarea_combinada"
]);

const ETIQUETAS_TIPO = Object.freeze({
  actividad_modulo: "Actividad de un módulo",
  tarea_libre: "Misión libre",
  repaso_academico: "Repaso académico",
  tiempo_practica: "Tiempo de práctica",
  cantidad_actividades: "Cantidad de actividades",
  tarea_combinada: "Misión combinada"
});

const ETIQUETAS_MODULO = Object.freeze({
  "rincon-lectura": "Mi Rincón de Lectura",
  detectives: "Detectives de Problemas",
  "creciendo-por-dentro": "Creciendo por Dentro",
  biblioteca: "Biblioteca Encantada",
  academico: "Mis Cursos",
  libre: "Actividad fuera de la Academia"
});

const $ = id => document.getElementById(id);

let tareasPorId = new Map();
let pagina = 1;
let timerAplicar = null;
let leyendo = false;

function escapar(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cargarEstilos() {
  if (document.querySelector('link[data-filtros-misiones-css="true"]')) return;

  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./filtros-misiones.css", import.meta.url).href;
  enlace.dataset.filtrosMisionesCss = "true";
  document.head.appendChild(enlace);
}

function moduloFiltro(tarea = {}) {
  return tarea.tipo === "repaso_academico"
    ? "academico"
    : String(tarea.modulo || "libre");
}

function idDesdeCard(card) {
  return String(card.querySelector("[data-id]")?.dataset.id || "").trim();
}

function cardsRegistradas() {
  return [...document.querySelectorAll("#listaTareas > .tarea-card")];
}

function valorFiltro(id) {
  return String($(id)?.value || "todas");
}

function actualizarOpciones(select, valores, etiquetas, etiquetaTodas) {
  if (!select) return;

  const actual = select.value || "todas";
  select.innerHTML = `<option value="todas">${escapar(etiquetaTodas)}</option>`;

  [...valores]
    .sort((a, b) => String(etiquetas[a] || a).localeCompare(String(etiquetas[b] || b), "es"))
    .forEach(valor => {
      const option = document.createElement("option");
      option.value = valor;
      option.textContent = etiquetas[valor] || valor;
      select.appendChild(option);
    });

  select.value = [...select.options].some(option => option.value === actual)
    ? actual
    : "todas";
}

function poblarFiltros() {
  const tipos = new Set();
  const modulos = new Set();

  tareasPorId.forEach(tarea => {
    if (tarea.tipo) tipos.add(String(tarea.tipo));
    modulos.add(moduloFiltro(tarea));
  });

  actualizarOpciones($("filtroTipoMision"), tipos, ETIQUETAS_TIPO, "Todos los tipos");
  actualizarOpciones($("filtroModuloMision"), modulos, ETIQUETAS_MODULO, "Todos los módulos");
}

function tarjetaCoincide(card) {
  const tarea = tareasPorId.get(idDesdeCard(card));
  if (!tarea) return true;

  const tipo = valorFiltro("filtroTipoMision");
  const modulo = valorFiltro("filtroModuloMision");

  return (
    (tipo === "todas" || String(tarea.tipo || "") === tipo) &&
    (modulo === "todas" || moduloFiltro(tarea) === modulo)
  );
}

function renderPaginacion(total) {
  const contenedor = $("paginacionMisionesRegistradas");
  const vacio = $("estadoFiltrosMisiones");
  if (!contenedor || !vacio) return;

  if (!total) {
    contenedor.innerHTML = "";
    vacio.classList.remove("hidden");
    vacio.textContent = cardsRegistradas().length
      ? "No hay Misiones que coincidan con Tipo de Misión y Módulo seleccionados."
      : "";
    if (!vacio.textContent) vacio.classList.add("hidden");
    return;
  }

  vacio.classList.add("hidden");
  vacio.textContent = "";

  const paginas = Math.max(1, Math.ceil(total / TAMANO_PAGINA));
  pagina = Math.min(Math.max(1, pagina), paginas);

  contenedor.innerHTML = `
    <button type="button" class="paginacion-misiones__boton" data-pagina-misiones="-1" ${pagina <= 1 ? "disabled" : ""}>
      ← Anterior
    </button>
    <span class="paginacion-misiones__contador">Página ${pagina} de ${paginas} · ${total} ${total === 1 ? "Misión" : "Misiones"}</span>
    <button type="button" class="paginacion-misiones__boton" data-pagina-misiones="1" ${pagina >= paginas ? "disabled" : ""}>
      Siguiente →
    </button>
  `;

  contenedor.querySelectorAll("[data-pagina-misiones]").forEach(button => {
    button.addEventListener("click", () => {
      pagina += Number(button.dataset.paginaMisiones || 0);
      aplicarFiltrosYPaginacion();
      $("panelLista")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function aplicarFiltrosYPaginacion() {
  const cards = cardsRegistradas();
  const candidatas = cards.filter(tarjetaCoincide);
  const paginas = Math.max(1, Math.ceil(candidatas.length / TAMANO_PAGINA));
  pagina = Math.min(Math.max(1, pagina), paginas);

  const inicio = (pagina - 1) * TAMANO_PAGINA;
  const visibles = new Set(candidatas.slice(inicio, inicio + TAMANO_PAGINA));

  cards.forEach(card => {
    card.hidden = !visibles.has(card);
  });

  renderPaginacion(candidatas.length);
}

function crearControles() {
  if ($("filtrosAvanzadosMisiones")) return;

  const filtrosEstado = document.querySelector("#panelLista .filtros");
  if (!filtrosEstado) return;

  const bloque = document.createElement("div");
  bloque.id = "filtrosAvanzadosMisiones";
  bloque.className = "filtros-avanzados-misiones";
  bloque.innerHTML = `
    <label>
      <span>Tipo de Misión:</span>
      <select id="filtroTipoMision" aria-label="Filtrar por tipo de Misión">
        <option value="todas">Todos los tipos</option>
      </select>
    </label>
    <label>
      <span>Módulo:</span>
      <select id="filtroModuloMision" aria-label="Filtrar por módulo">
        <option value="todas">Todos los módulos</option>
      </select>
    </label>
  `;

  filtrosEstado.insertAdjacentElement("afterend", bloque);

  const estado = document.createElement("div");
  estado.id = "estadoFiltrosMisiones";
  estado.className = "estado-carga hidden";
  $("listaTareas")?.insertAdjacentElement("beforebegin", estado);

  const paginacion = document.createElement("nav");
  paginacion.id = "paginacionMisionesRegistradas";
  paginacion.className = "paginacion-misiones";
  paginacion.setAttribute("aria-label", "Paginación de Misiones registradas");
  $("listaTareas")?.insertAdjacentElement("afterend", paginacion);

  [$("filtroTipoMision"), $("filtroModuloMision")].forEach(select => {
    select?.addEventListener("change", () => {
      pagina = 1;
      aplicarFiltrosYPaginacion();
    });
  });

  document.querySelectorAll("#panelLista [data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      pagina = 1;
    });
  });
}

function configurarTiposDisponibles() {
  const select = $("tipo");
  if (!select) return;

  const editando = Boolean(String($("tareaId")?.value || "").trim());
  const actual = String(select.value || "");

  [...select.options].forEach(option => {
    if (!TIPOS_LEGACY.has(option.value)) return;
    const conservarActual = editando && option.value === actual;
    option.hidden = !conservarActual;
    option.disabled = !conservarActual;
  });
}

function programarConfiguracionTipos() {
  window.setTimeout(configurarTiposDisponibles, 0);
  window.setTimeout(configurarTiposDisponibles, 100);
}

async function refrescarDatos() {
  if (leyendo) return;
  leyendo = true;

  try {
    const tareas = await Academia.tareas.leer();
    tareasPorId = new Map(tareas.map(tarea => [String(tarea.id), tarea]));
    poblarFiltros();
    aplicarFiltrosYPaginacion();
  } catch (error) {
    console.warn("No se pudieron preparar los filtros de Misiones.", error);
    const estado = $("estadoFiltrosMisiones");
    if (estado) {
      estado.classList.remove("hidden");
      estado.textContent = `No se pudieron actualizar los filtros. Razón: ${error.message || "Error no identificado"}`;
    }
  } finally {
    leyendo = false;
  }
}

function programarRefresco() {
  window.clearTimeout(timerAplicar);
  timerAplicar = window.setTimeout(() => refrescarDatos(), 80);
}

function iniciar() {
  cargarEstilos();
  crearControles();
  configurarTiposDisponibles();

  const lista = $("listaTareas");
  if (lista) {
    new MutationObserver(programarRefresco).observe(lista, {
      childList: true,
      subtree: true
    });
  }

  $("formTarea")?.addEventListener("reset", programarConfiguracionTipos);
  document.addEventListener("click", event => {
    if (event.target.closest?.('[data-action="edit"],[data-action="view"],[data-tab="crear"]')) {
      programarConfiguracionTipos();
    }
  });

  refrescarDatos();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
