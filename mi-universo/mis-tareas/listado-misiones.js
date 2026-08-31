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
let programado = false;

function cargarEstilos() {
  if (document.querySelector('link[data-listado-misiones-css="true"]')) return;

  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./listado-misiones.css", import.meta.url).href;
  enlace.dataset.listadoMisionesCss = "true";
  document.head.appendChild(enlace);
}

function ocultarTiposNoOperativos() {
  const select = document.getElementById("tipo");
  if (!select) return;

  [...select.options].forEach(option => {
    const esLegacy = TIPOS_LEGACY.has(option.value);
    option.hidden = esLegacy;
    if (esLegacy) {
      option.dataset.legacy = "true";
      option.title = "Tipo conservado solo por compatibilidad con Misiones antiguas.";
    }
  });
}

function crearFiltroTipo() {
  const filtrosEstado = document.querySelector("#panelLista .filtros");
  if (!filtrosEstado || document.getElementById("filtroTipoMision")) return;

  const grupo = document.createElement("label");
  grupo.className = "filtro-tipo-mision";
  grupo.innerHTML = `
    <span>Tipo de misión</span>
    <select id="filtroTipoMision" aria-label="Filtrar Misiones por tipo">
      <option value="todos">Todos los tipos</option>
      <option value="actividad_modulo">Actividad de un módulo</option>
      <option value="tarea_libre">Misión libre</option>
      <option value="repaso_academico">Repaso académico</option>
    </select>
  `;

  filtrosEstado.insertAdjacentElement("afterend", grupo);

  grupo.querySelector("select").addEventListener("change", event => {
    filtroTipoActual = event.target.value;
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

  const coincidentes = cards.filter(card =>
    filtroTipoActual === "todos" ||
    tipoOperativoTarjeta(card) === filtroTipoActual
  );

  const total = coincidentes.length;
  const totalPaginas = Math.max(1, Math.ceil(total / TAMANO_PAGINA));
  paginaActual = Math.min(Math.max(1, paginaActual), totalPaginas);
  const inicio = (paginaActual - 1) * TAMANO_PAGINA;
  const visibles = new Set(coincidentes.slice(inicio, inicio + TAMANO_PAGINA));

  cards.forEach(card => {
    const coincideTipo = coincidentes.includes(card);
    card.hidden = !coincideTipo || !visibles.has(card);
  });

  renderPaginacion(total);

  const estado = document.getElementById("estadoTareas");
  if (estado && cards.length && !total) {
    estado.classList.remove("hidden");
    estado.textContent = "No hay Misiones de este tipo en el filtro seleccionado.";
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

function preservarLegacyEnEdicion() {
  document.addEventListener("click", event => {
    if (!event.target.closest?.('[data-action="edit"],[data-action="view"]')) return;

    window.setTimeout(() => {
      const select = document.getElementById("tipo");
      if (!select) return;
      const actual = select.value;
      if (actual && !TIPOS_ACTIVOS.has(actual) && TIPOS_LEGACY.has(actual)) {
        const option = [...select.options].find(item => item.value === actual);
        if (option) option.hidden = false;
      }
    }, 80);
  });
}

function iniciar() {
  cargarEstilos();
  ocultarTiposNoOperativos();
  crearFiltroTipo();
  crearPaginador();
  observarListado();
  preservarLegacyEnEdicion();
  programarAplicacion();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
