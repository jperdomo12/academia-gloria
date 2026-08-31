/* Academia Gloria Valentina · Gestión de Misiones · Listado estándar */

const TAMANO_PAGINA = 5;
const TIPOS_ACTIVOS = new Set([
  "actividad_modulo",
  "tarea_libre",
  "repaso_academico"
]);
const TIPOS_LEGACY = new Set([
  "tiempo_practica",
  "cantidad_actividades",
  "tarea_combinada"
]);

let paginaActual = 1;
let filtroTipoActual = "todos";
let filtroTemaActual = "";
let programado = false;

function cargarEstilos() {
  if (document.querySelector('link[data-listado-misiones-css="true"]')) return;

  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./listado-misiones.css", import.meta.url).href;
  enlace.dataset.listadoMisionesCss = "true";
  document.head.appendChild(enlace);
}

function normalizarTexto(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("es-ES");
}

function ajustarTiposDisponibles() {
  const select = document.getElementById("tipo");
  if (!select) return;

  const actual = String(select.value || "");

  [...select.options].forEach(option => {
    const esLegacy = TIPOS_LEGACY.has(option.value);
    const esLegacyActual = esLegacy && option.value === actual;

    option.hidden = esLegacy && !esLegacyActual;

    if (esLegacy) {
      option.dataset.legacy = "true";
      option.title = esLegacyActual
        ? "Tipo histórico conservado para poder consultar o editar esta Misión antigua."
        : "Tipo histórico no disponible para nuevas Misiones.";
    }
  });
}

function crearBarraFiltros() {
  const filtrosEstado = document.querySelector("#panelLista .filtros");
  const cabecera = filtrosEstado?.closest(".cabecera-seccion");

  if (!filtrosEstado || !cabecera || document.getElementById("filtrosListadoMisiones")) {
    return;
  }

  const barra = document.createElement("div");
  barra.id = "filtrosListadoMisiones";
  barra.className = "filtros-listado-misiones";

  const grupoEstado = document.createElement("div");
  grupoEstado.className = "filtro-listado-misiones filtro-listado-misiones--estado";

  const etiquetaEstado = document.createElement("span");
  etiquetaEstado.className = "filtro-listado-misiones__etiqueta";
  etiquetaEstado.textContent = "Estado";

  grupoEstado.append(etiquetaEstado, filtrosEstado);

  const grupoTipo = document.createElement("label");
  grupoTipo.className = "filtro-listado-misiones";
  grupoTipo.innerHTML = `
    <span class="filtro-listado-misiones__etiqueta">Tipo</span>
    <select id="filtroTipoMision" aria-label="Filtrar Misiones por tipo">
      <option value="todos">Todos los tipos</option>
      <option value="actividad_modulo">Actividad de un módulo</option>
      <option value="tarea_libre">Misión libre</option>
      <option value="repaso_academico">Repaso académico</option>
    </select>
  `;

  const grupoTema = document.createElement("label");
  grupoTema.className = "filtro-listado-misiones filtro-listado-misiones--tema";
  grupoTema.innerHTML = `
    <span class="filtro-listado-misiones__etiqueta">🔎 Tema</span>
    <input
      id="filtroTemaMision"
      type="search"
      maxlength="80"
      autocomplete="off"
      placeholder="Buscar por tema"
      aria-label="Buscar Misiones por tema"
    >
  `;

  barra.append(grupoEstado, grupoTipo, grupoTema);
  cabecera.insertAdjacentElement("afterend", barra);

  grupoTipo.querySelector("select")?.addEventListener("change", event => {
    filtroTipoActual = event.target.value;
    paginaActual = 1;
    aplicarListado();
  });

  grupoTema.querySelector("input")?.addEventListener("input", event => {
    filtroTemaActual = normalizarTexto(event.target.value);
    paginaActual = 1;
    aplicarListado();
  });
}

function crearPaginador() {
  const lista = document.getElementById("listaTareas");
  if (!lista || document.getElementById("paginacionTareas")) return;

  const paginador = document.createElement("nav");
  paginador.id = "paginacionTareas";
  paginador.className = "paginacion-gestion-misiones";
  paginador.setAttribute("aria-label", "Paginación de Misiones registradas");
  lista.insertAdjacentElement("afterend", paginador);
}

function tipoOperativoTarjeta(card) {
  const meta = String(
    card.querySelector(".tarea-card__estado-meta")?.textContent || ""
  ).replace(/\s+/g, " ").trim();

  if (meta.includes("Repaso académico")) return "repaso_academico";
  if (meta.includes("Actividad externa")) return "tarea_libre";
  return "actividad_modulo";
}

function textoTemaTarjeta(card) {
  const partes = [
    card.querySelector(".tarea-card__resumen-principal h3")?.textContent,
    card.querySelector(".tarea-card__resumen-principal p")?.textContent,
    ...[...card.querySelectorAll(".contexto-academico span")].map(item => item.textContent)
  ].filter(Boolean);

  return normalizarTexto(partes.join(" "));
}

function tarjetasDelListado() {
  return [...document.querySelectorAll("#listaTareas > .tarea-card")];
}

function pluralMision(total) {
  return total === 1 ? "Misión" : "Misiones";
}

function renderPaginacion(total) {
  const contenedor = document.getElementById("paginacionTareas");
  if (!contenedor) return;

  if (!total) {
    contenedor.innerHTML = "";
    return;
  }

  const totalPaginas = Math.max(1, Math.ceil(total / TAMANO_PAGINA));
  paginaActual = Math.min(Math.max(1, paginaActual), totalPaginas);

  contenedor.innerHTML = `
    <button type="button" data-pagina-delta="-1" ${paginaActual <= 1 ? "disabled" : ""}>
      ← Anterior
    </button>
    <strong>Página ${paginaActual} de ${totalPaginas} · ${total} ${pluralMision(total)}</strong>
    <button type="button" data-pagina-delta="1" ${paginaActual >= totalPaginas ? "disabled" : ""}>
      Siguiente →
    </button>
  `;

  contenedor.querySelectorAll("[data-pagina-delta]").forEach(button => {
    button.addEventListener("click", () => {
      paginaActual += Number(button.dataset.paginaDelta || 0);
      aplicarListado();
      document.getElementById("panelLista")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

function aplicarListado() {
  programado = false;
  const cards = tarjetasDelListado();

  if (!cards.length) {
    renderPaginacion(0);
    return;
  }

  const coincidentes = cards.filter(card => {
    const coincideTipo =
      filtroTipoActual === "todos" ||
      tipoOperativoTarjeta(card) === filtroTipoActual;

    const coincideTema =
      !filtroTemaActual ||
      textoTemaTarjeta(card).includes(filtroTemaActual);

    return coincideTipo && coincideTema;
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

  const estado = document.getElementById("estadoTareas");
  if (estado && cards.length && !total) {
    estado.classList.remove("hidden");
    estado.textContent =
      "No hay Misiones que coincidan con el Tipo y Tema dentro del Estado seleccionado.";
  } else if (estado && total) {
    estado.classList.add("hidden");
  }
}

function programarAplicacion({ reiniciarPagina = false } = {}) {
  if (reiniciarPagina) paginaActual = 1;
  if (programado) return;
  programado = true;
  window.setTimeout(aplicarListado, 0);
}

function observarListado() {
  const lista = document.getElementById("listaTareas");
  if (!lista) return;

  new MutationObserver(() => {
    programarAplicacion();
  }).observe(lista, {
    childList: true
  });

  document.querySelectorAll("#panelLista [data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      programarAplicacion({ reiniciarPagina: true });
    });
  });
}

function preservarCompatibilidadLegacy() {
  document.addEventListener("click", event => {
    const accionEdicion = event.target.closest?.('[data-action="edit"],[data-action="view"]');
    const tabCrear = event.target.closest?.('[data-tab="crear"]');

    if (accionEdicion) {
      window.setTimeout(ajustarTiposDisponibles, 80);
      return;
    }

    if (tabCrear) {
      window.setTimeout(ajustarTiposDisponibles, 0);
    }
  });

  document.getElementById("formTarea")?.addEventListener("reset", () => {
    window.setTimeout(ajustarTiposDisponibles, 0);
  });
}

function iniciar() {
  cargarEstilos();
  ajustarTiposDisponibles();
  crearBarraFiltros();
  crearPaginador();
  observarListado();
  preservarCompatibilidadLegacy();
  programarAplicacion();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
