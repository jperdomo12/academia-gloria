/* Academia Gloria Valentina · Gestión de Misiones · Listado estándar */

import { Academia } from "../../compartido/api/academia.js";

const TAMANO_PAGINA = 5;

const TIPOS_OPERATIVOS = Object.freeze({
  actividad_modulo: Object.freeze({
    etiqueta: "🌈 Misión de Mi Aventura",
    orden: 1
  }),
  repaso_academico: Object.freeze({
    etiqueta: "🎓 Misión de Cursos",
    orden: 2
  }),
  tarea_libre: Object.freeze({
    etiqueta: "✏️ Misión libre",
    orden: 3
  })
});

const TIPOS_LEGACY = Object.freeze({
  tiempo_practica: "Tiempo de práctica",
  cantidad_actividades: "Cantidad de actividades",
  tarea_combinada: "Misión combinada"
});

const MODULOS = Object.freeze({
  "rincon-lectura": Object.freeze({ etiqueta: "Mi Rincón de Lectura", icono: "📖" }),
  detectives: Object.freeze({ etiqueta: "Detectives de Problemas", icono: "🔎" }),
  "creciendo-por-dentro": Object.freeze({ etiqueta: "Creciendo por Dentro", icono: "🌱" }),
  biblioteca: Object.freeze({ etiqueta: "Biblioteca Encantada", icono: "📚" })
});

const $ = id => document.getElementById(id);

let tareas = [];
let tareasPorId = new Map();
let paginaActual = 1;
let filtroTipoActual = "";
let filtroTemaActual = "";
let timerRefresco = null;
let leyendo = false;

function texto(valor = "") {
  return String(valor ?? "").replace(/\s+/g, " ").trim();
}

function normalizar(valor = "") {
  return texto(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-ES");
}

function cargarEstilos() {
  if (document.querySelector('link[data-listado-misiones-css="true"]')) return;

  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./listado-misiones.css", import.meta.url).href;
  enlace.dataset.listadoMisionesCss = "true";
  document.head.appendChild(enlace);
}

function tipoOperativo(tarea = {}) {
  const tipo = texto(tarea.tipo);

  if (tipo === "repaso_academico") return "repaso_academico";
  if (tipo === "tarea_libre") return "tarea_libre";

  /* Los tipos antiguos asociados a un módulo siguen siendo compatibles,
     pero se agrupan visualmente bajo Misión de Mi Aventura. */
  return "actividad_modulo";
}

function configurarTiposPreparacion() {
  const select = $("tipo");
  if (!select) return;

  const valorActual = texto(select.value);
  const editando = Boolean(texto($("tareaId")?.value));

  Object.entries(TIPOS_OPERATIVOS)
    .sort(([, a], [, b]) => a.orden - b.orden)
    .forEach(([valor, definicion]) => {
      const opcion = select.querySelector(`option[value="${CSS.escape(valor)}"]`);
      if (!opcion) return;
      opcion.textContent = definicion.etiqueta;
      opcion.hidden = false;
      opcion.disabled = false;
      opcion.removeAttribute("data-tipo-anterior");
      select.appendChild(opcion);
    });

  Object.entries(TIPOS_LEGACY).forEach(([valor, etiqueta]) => {
    const opcion = select.querySelector(`option[value="${CSS.escape(valor)}"]`);
    if (!opcion) return;

    const conservar = editando && valorActual === valor;
    opcion.hidden = !conservar;
    opcion.disabled = !conservar;
    opcion.dataset.tipoAnterior = "true";
    opcion.textContent = conservar
      ? `⚠️ ${etiqueta} · tipo anterior`
      : etiqueta;

    if (conservar) select.appendChild(opcion);
  });

  if ([...select.options].some(opcion => opcion.value === valorActual)) {
    select.value = valorActual;
  }
}

function programarTiposPreparacion() {
  window.setTimeout(configurarTiposPreparacion, 0);
  window.setTimeout(configurarTiposPreparacion, 100);
}

function idDeTarjeta(card) {
  return texto(card.querySelector("[data-id]")?.dataset.id);
}

function tarjetasRegistradas() {
  return [...document.querySelectorAll("#listaTareas > .tarea-card")];
}

function tareaDeTarjeta(card) {
  return tareasPorId.get(idDeTarjeta(card)) || null;
}

function valorTema(clase, valor) {
  return `${clase}:${normalizar(valor)}`;
}

function opcionesTemaDeTarea(tarea = {}) {
  const opciones = [];
  const tipo = tipoOperativo(tarea);

  if (tipo === "repaso_academico") {
    const materia = texto(tarea.materia);
    const tema = texto(tarea.tema);

    if (materia) {
      opciones.push({
        valor: valorTema("materia", materia),
        etiqueta: `📚 ${materia}`,
        grupo: "Materias",
        ordenGrupo: 1
      });
    }

    if (tema) {
      opciones.push({
        valor: valorTema("tema", tema),
        etiqueta: `🎯 ${tema}`,
        grupo: "Temas de Cursos",
        ordenGrupo: 2
      });
    }

    return opciones;
  }

  if (tipo === "actividad_modulo") {
    const modulo = texto(tarea.modulo);
    const definicion = MODULOS[modulo];

    if (definicion) {
      opciones.push({
        valor: `modulo:${modulo}`,
        etiqueta: `${definicion.icono} ${definicion.etiqueta}`,
        grupo: "Mi Aventura",
        ordenGrupo: 3
      });
    }
  }

  return opciones;
}

function tareaCoincideTema(tarea = {}, filtro = filtroTemaActual) {
  if (!filtro) return true;
  return opcionesTemaDeTarea(tarea).some(opcion => opcion.valor === filtro);
}

function tareaCoincideTipo(tarea = {}) {
  return !filtroTipoActual || tipoOperativo(tarea) === filtroTipoActual;
}

function crearBarraFiltros() {
  const filtrosEstado = document.querySelector("#panelLista .filtros");
  const cabecera = filtrosEstado?.closest(".cabecera-seccion");

  if (!filtrosEstado || !cabecera || $("filtrosListadoMisiones")) return;

  const barra = document.createElement("div");
  barra.id = "filtrosListadoMisiones";
  barra.className = "filtros-listado-misiones";

  const grupoEstado = document.createElement("div");
  grupoEstado.className = "filtro-listado-misiones filtro-listado-misiones--estado";
  grupoEstado.innerHTML = '<span class="filtro-listado-misiones__etiqueta">Estado</span>';
  grupoEstado.appendChild(filtrosEstado);

  const grupoTipo = document.createElement("label");
  grupoTipo.className = "filtro-listado-misiones";
  grupoTipo.innerHTML = `
    <span class="filtro-listado-misiones__etiqueta">Tipo</span>
    <select id="filtroTipoMision" aria-label="Filtrar Misiones por tipo">
      <option value=""></option>
      <option value="actividad_modulo">${TIPOS_OPERATIVOS.actividad_modulo.etiqueta}</option>
      <option value="repaso_academico">${TIPOS_OPERATIVOS.repaso_academico.etiqueta}</option>
      <option value="tarea_libre">${TIPOS_OPERATIVOS.tarea_libre.etiqueta}</option>
    </select>
  `;

  const grupoTema = document.createElement("label");
  grupoTema.className = "filtro-listado-misiones filtro-listado-misiones--tema";
  grupoTema.innerHTML = `
    <span class="filtro-listado-misiones__etiqueta">🔎 Tema</span>
    <select id="filtroTemaMision" aria-label="Filtrar Misiones por tema o área">
      <option value=""></option>
    </select>
  `;

  barra.append(grupoEstado, grupoTipo, grupoTema);
  cabecera.insertAdjacentElement("afterend", barra);

  $("filtroTipoMision")?.addEventListener("change", event => {
    filtroTipoActual = texto(event.target.value);
    paginaActual = 1;
    actualizarOpcionesTema();
    aplicarListado();
  });

  $("filtroTemaMision")?.addEventListener("change", event => {
    filtroTemaActual = texto(event.target.value);
    paginaActual = 1;
    aplicarListado();
  });
}

function crearPaginador() {
  const lista = $("listaTareas");
  if (!lista || $("paginacionTareas")) return;

  const estado = document.createElement("div");
  estado.id = "estadoListadoMisiones";
  estado.className = "estado-carga hidden";
  estado.setAttribute("aria-live", "polite");
  lista.insertAdjacentElement("beforebegin", estado);

  const paginador = document.createElement("nav");
  paginador.id = "paginacionTareas";
  paginador.className = "paginacion-gestion-misiones";
  paginador.setAttribute("aria-label", "Paginación de Misiones registradas");
  lista.insertAdjacentElement("afterend", paginador);
}

function tareasDelEstadoActual() {
  return tarjetasRegistradas()
    .map(tareaDeTarjeta)
    .filter(Boolean);
}

function actualizarOpcionesTema() {
  const select = $("filtroTemaMision");
  if (!select) return;

  const anterior = filtroTemaActual;
  const unicas = new Map();

  tareasDelEstadoActual()
    .filter(tarea => !filtroTipoActual || tipoOperativo(tarea) === filtroTipoActual)
    .flatMap(opcionesTemaDeTarea)
    .forEach(opcion => {
      if (!unicas.has(opcion.valor)) unicas.set(opcion.valor, opcion);
    });

  const grupos = new Map();
  [...unicas.values()]
    .sort((a, b) =>
      a.ordenGrupo - b.ordenGrupo ||
      a.etiqueta.localeCompare(b.etiqueta, "es", { sensitivity: "base" })
    )
    .forEach(opcion => {
      const items = grupos.get(opcion.grupo) || [];
      items.push(opcion);
      grupos.set(opcion.grupo, items);
    });

  select.innerHTML = "";
  select.appendChild(new Option("", ""));

  grupos.forEach((items, nombreGrupo) => {
    const grupo = document.createElement("optgroup");
    grupo.label = nombreGrupo;

    items.forEach(item => {
      grupo.appendChild(new Option(item.etiqueta, item.valor));
    });

    select.appendChild(grupo);
  });

  const conserva = [...select.options].some(opcion => opcion.value === anterior);
  filtroTemaActual = conserva ? anterior : "";
  select.value = filtroTemaActual;
}

function pluralMision(total) {
  return total === 1 ? "Misión" : "Misiones";
}

function renderPaginacion(total) {
  const contenedor = $("paginacionTareas");
  if (!contenedor) return;

  if (!total) {
    contenedor.innerHTML = "";
    return;
  }

  const totalPaginas = Math.max(1, Math.ceil(total / TAMANO_PAGINA));
  paginaActual = Math.min(Math.max(1, paginaActual), totalPaginas);
  const inicio = (paginaActual - 1) * TAMANO_PAGINA;
  const fin = Math.min(inicio + TAMANO_PAGINA, total);

  contenedor.innerHTML = `
    <button type="button" data-pagina-delta="-1" ${paginaActual <= 1 ? "disabled" : ""}>
      ← Anterior
    </button>
    <strong>${inicio + 1}–${fin} de ${total} ${pluralMision(total)} · Página ${paginaActual} de ${totalPaginas}</strong>
    <button type="button" data-pagina-delta="1" ${paginaActual >= totalPaginas ? "disabled" : ""}>
      Siguiente →
    </button>
  `;

  contenedor.querySelectorAll("[data-pagina-delta]").forEach(button => {
    button.addEventListener("click", () => {
      paginaActual += Number(button.dataset.paginaDelta || 0);
      aplicarListado();
      $("panelLista")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function aplicarListado() {
  const cards = tarjetasRegistradas();
  const estado = $("estadoListadoMisiones");

  if (!cards.length) {
    renderPaginacion(0);
    estado?.classList.add("hidden");
    return;
  }

  const coincidentes = cards.filter(card => {
    const tarea = tareaDeTarjeta(card);
    if (!tarea) return !filtroTipoActual && !filtroTemaActual;
    return tareaCoincideTipo(tarea) && tareaCoincideTema(tarea);
  });

  const total = coincidentes.length;
  const totalPaginas = Math.max(1, Math.ceil(total / TAMANO_PAGINA));
  paginaActual = Math.min(Math.max(1, paginaActual), totalPaginas);

  const inicio = (paginaActual - 1) * TAMANO_PAGINA;
  const visibles = new Set(coincidentes.slice(inicio, inicio + TAMANO_PAGINA));

  cards.forEach(card => {
    card.hidden = !visibles.has(card);
  });

  renderPaginacion(total);

  if (estado) {
    const sinResultados = cards.length > 0 && total === 0;
    estado.classList.toggle("hidden", !sinResultados);
    estado.textContent = sinResultados
      ? "No hay Misiones que coincidan con los filtros seleccionados dentro de este Estado."
      : "";
  }
}

async function refrescarDatos() {
  if (leyendo) return;
  leyendo = true;

  try {
    tareas = await Academia.tareas.leer();
    tareasPorId = new Map(
      tareas
        .map(tarea => [texto(tarea.id), tarea])
        .filter(([id]) => id)
    );

    actualizarOpcionesTema();
    aplicarListado();
  } catch (error) {
    console.warn("No se pudieron preparar los filtros de Misiones.", error);
    const estado = $("estadoListadoMisiones");
    if (estado) {
      estado.classList.remove("hidden");
      estado.textContent =
        `No se pudieron actualizar los filtros. Razón: ${error.message || "Error no identificado"}`;
    }
  } finally {
    leyendo = false;
  }
}

function programarRefresco({ reiniciarPagina = false } = {}) {
  if (reiniciarPagina) paginaActual = 1;
  window.clearTimeout(timerRefresco);
  timerRefresco = window.setTimeout(refrescarDatos, 80);
}

function observarListado() {
  const lista = $("listaTareas");
  if (!lista) return;

  new MutationObserver(() => {
    programarRefresco();
  }).observe(lista, { childList: true });

  document.querySelectorAll("#panelLista [data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      paginaActual = 1;
      window.setTimeout(() => {
        actualizarOpcionesTema();
        aplicarListado();
      }, 0);
    });
  });
}

function preservarTiposHistoricos() {
  document.addEventListener("click", event => {
    if (event.target.closest?.('[data-action="edit"],[data-action="view"],[data-tab="crear"]')) {
      programarTiposPreparacion();
    }
  });

  $("formTarea")?.addEventListener("reset", programarTiposPreparacion);
}

async function iniciar() {
  cargarEstilos();
  configurarTiposPreparacion();
  crearBarraFiltros();
  crearPaginador();
  observarListado();
  preservarTiposHistoricos();
  await refrescarDatos();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
