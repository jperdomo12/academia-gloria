/* Academia Gloria Valentina · Gestión de Misiones · Filtro por Recompensas */

let instalada = false;
let filtroActivo = false;
let actualizacionPendiente = false;
let observadorLista = null;
let observadorFiltros = null;

function cargarEstilos() {
  if (document.getElementById("estilosFiltroRecompensas")) return;

  const estilos = document.createElement("style");
  estilos.id = "estilosFiltroRecompensas";
  estilos.textContent = `
    #listaTareas.filtro-recompensas-activo > .tarea-card:not(:has(.accion-reconocimiento-mision.reconocida)) {
      display: none !important;
    }

    .estado-filtro-recompensas {
      margin-top: 1rem;
    }
  `;
  document.head.appendChild(estilos);
}

function tarjetasListado() {
  return [...document.querySelectorAll("#listaTareas > .tarea-card")];
}

function tieneRecompensa(tarjeta) {
  return Boolean(
    tarjeta?.querySelector(".accion-reconocimiento-mision.reconocida")
  );
}

function tarjetasDelConjuntoActual() {
  /*
   * La marca hidden pertenece a otros filtros complementarios, actualmente
   * 🧪 Pruebas. No la modificamos: solo la respetamos para que ambos filtros
   * puedan combinarse sin sobrescribirse.
   */
  return tarjetasListado().filter(tarjeta => !tarjeta.hidden);
}

function asegurarEstadoVacio() {
  const lista = document.getElementById("listaTareas");
  if (!lista?.parentElement) return null;

  let estado = document.getElementById("estadoFiltroRecompensas");
  if (!estado) {
    estado = document.createElement("div");
    estado.id = "estadoFiltroRecompensas";
    estado.className = "estado-carga estado-filtro-recompensas hidden";
    estado.textContent = "No hay Misiones con 🏅 Recompensa en este filtro.";
    lista.parentElement.insertBefore(estado, lista);
  }
  return estado;
}

function asegurarBotonFiltro() {
  const filtros = document.querySelector("#panelLista .filtros");
  if (!filtros) return null;

  let boton = filtros.querySelector("[data-filtro-recompensas]");
  if (!boton) {
    boton = document.createElement("button");
    boton.type = "button";
    boton.className = "filtro";
    boton.dataset.filtroRecompensas = "true";
    boton.setAttribute("aria-pressed", "false");
    boton.addEventListener("click", () => {
      filtroActivo = !filtroActivo;
      programarActualizacion();
    });
  }

  /* Mantenerlo junto al filtro especial de Pruebas cuando este exista. */
  const pruebas = filtros.querySelector("[data-filtro-datos-prueba]");
  if (pruebas) {
    if (pruebas.nextElementSibling !== boton) pruebas.after(boton);
  } else if (boton.parentElement !== filtros) {
    filtros.appendChild(boton);
  }

  return boton;
}

function aplicarFiltro() {
  const lista = document.getElementById("listaTareas");
  const boton = asegurarBotonFiltro();
  if (!lista || !boton) return;

  lista.classList.toggle("filtro-recompensas-activo", filtroActivo);
  boton.classList.toggle("active", filtroActivo);
  boton.setAttribute("aria-pressed", filtroActivo ? "true" : "false");

  const actuales = tarjetasDelConjuntoActual();
  const conRecompensa = actuales.filter(tieneRecompensa);
  boton.textContent = `🏅 Recompensa (${conRecompensa.length})`;

  /*
   * Si el filtro está activo debe poder desactivarse aunque el contador quede
   * en cero por combinarlo con otro filtro. Solo se deshabilita cuando está
   * inactivo y el conjunto actual no contiene Recompensas.
   */
  boton.disabled = !filtroActivo && conRecompensa.length === 0;

  const estado = asegurarEstadoVacio();
  const listadoTieneTarjetas = tarjetasListado().length > 0;
  estado?.classList.toggle(
    "hidden",
    !(filtroActivo && listadoTieneTarjetas && conRecompensa.length === 0)
  );
}

function programarActualizacion() {
  if (actualizacionPendiente) return;
  actualizacionPendiente = true;

  window.requestAnimationFrame(() => {
    actualizacionPendiente = false;
    aplicarFiltro();
  });
}

function instalar() {
  if (instalada) return;
  instalada = true;
  cargarEstilos();

  const lista = document.getElementById("listaTareas");
  const filtros = document.querySelector("#panelLista .filtros");
  if (!lista || !filtros) return;

  /*
   * Observamos solo cambios que pueden modificar el conjunto visible o el
   * estado reconocido de una tarjeta. El guard de requestAnimationFrame evita
   * cascadas de actualizaciones y no se reescribe contenido observado.
   */
  observadorLista = new MutationObserver(programarActualizacion);
  observadorLista.observe(lista, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "hidden"]
  });

  /* Pruebas crea su filtro dinámicamente; este observador solo mantiene el
     orden visual Recompensa después de Pruebas cuando aparezca. */
  observadorFiltros = new MutationObserver(programarActualizacion);
  observadorFiltros.observe(filtros, { childList: true });

  programarActualizacion();

  window.addEventListener("beforeunload", () => {
    observadorLista?.disconnect();
    observadorFiltros?.disconnect();
  }, { once: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", instalar, { once: true });
} else {
  instalar();
}
