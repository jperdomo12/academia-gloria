/* Academia Gloria Valentina · Gestión de Misiones · Filtro por Recompensas */

import { Reconocimientos } from "../../compartido/api/reconocimientos.js";

let instalada = false;
let soloRecompensas = false;
let recompensasPorMision = new Set();
let detenerReconocimientos = null;
let decoracionPendiente = false;
let observadorLista = null;

function texto(valor = "") {
  return String(valor ?? "").replace(/\s+/g, " ").trim();
}

function idTarjeta(tarjeta) {
  return texto(tarjeta?.querySelector("[data-id]")?.dataset?.id);
}

function tieneRecompensa(tarjeta) {
  const id = idTarjeta(tarjeta);
  return Boolean(id && recompensasPorMision.has(id));
}

function asegurarEstadoRecompensas() {
  const lista = document.getElementById("listaTareas");
  if (!lista?.parentElement) return null;

  let estado = document.getElementById("estadoFiltroRecompensas");
  if (!estado) {
    estado = document.createElement("div");
    estado.id = "estadoFiltroRecompensas";
    estado.className = "estado-carga estado-filtro-recompensas hidden";
    estado.textContent = "No hay Misiones con 🏅 Recompensa.";
    lista.parentElement.insertBefore(estado, lista);
  }

  return estado;
}

function restaurarControlesListado() {
  const paginacion = document.getElementById("paginacionTareas");
  if (paginacion) paginacion.hidden = false;
  asegurarEstadoRecompensas()?.classList.add("hidden");
}

function salirFiltroRecompensas() {
  if (!soloRecompensas) return;

  soloRecompensas = false;
  document
    .querySelector("[data-filtro-recompensas]")
    ?.classList.remove("active");
  restaurarControlesListado();
}

function aplicarFiltroRecompensas() {
  if (!soloRecompensas) return;

  const tarjetas = [
    ...document.querySelectorAll("#listaTareas > .tarea-card")
  ];
  let visibles = 0;

  tarjetas.forEach(tarjeta => {
    const mostrar = tieneRecompensa(tarjeta);
    const ocultar = !mostrar;
    if (tarjeta.hidden !== ocultar) tarjeta.hidden = ocultar;
    if (mostrar) visibles += 1;
  });

  const paginacion = document.getElementById("paginacionTareas");
  if (paginacion) paginacion.hidden = true;

  document.getElementById("estadoListadoMisiones")?.classList.add("hidden");
  document.getElementById("estadoDatosPrueba")?.classList.add("hidden");
  asegurarEstadoRecompensas()?.classList.toggle("hidden", visibles > 0);
}

function limpiarFiltrosTipoTema() {
  ["filtroTipoMision", "filtroTemaMision"].forEach(id => {
    const control = document.getElementById(id);
    if (!control || !control.value) return;

    control.value = "";
    control.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

function actualizarFiltroRecompensas() {
  const boton = document.querySelector("[data-filtro-recompensas]");
  if (!boton) return;

  const cantidad = recompensasPorMision.size;
  const etiqueta = `🏅 Recompensa${cantidad ? ` (${cantidad})` : ""}`;
  if (boton.textContent !== etiqueta) boton.textContent = etiqueta;
}

function asegurarIntegracionFiltrosEstandar() {
  ["filtroTipoMision", "filtroTemaMision"].forEach(id => {
    const control = document.getElementById(id);
    if (!control || control.dataset.integradoRecompensas === "true") return;

    control.dataset.integradoRecompensas = "true";
    control.addEventListener("change", salirFiltroRecompensas);
  });
}

function asegurarFiltroRecompensas() {
  const filtros = document.querySelector("#panelLista .filtros");
  if (!filtros) return;

  let boton = filtros.querySelector("[data-filtro-recompensas]");

  if (!boton) {
    boton = document.createElement("button");
    boton.type = "button";
    boton.className = "filtro";
    boton.dataset.filtroRecompensas = "true";
    boton.textContent = "🏅 Recompensa";

    const pruebas = filtros.querySelector("[data-filtro-datos-prueba]");
    if (pruebas) pruebas.after(boton);
    else filtros.appendChild(boton);

    boton.addEventListener("click", () => {
      if (soloRecompensas) {
        const todas = filtros.querySelector('[data-filter="todas"]');
        todas?.click();
        return;
      }

      limpiarFiltrosTipoTema();

      /* Igual que 🧪 Pruebas: partimos de Todas para no depender de la página
         actual ni del filtro de Estado. El click también desactiva Pruebas. */
      const todas = filtros.querySelector('[data-filter="todas"]');
      todas?.click();

      window.setTimeout(() => {
        soloRecompensas = true;
        filtros.querySelectorAll("[data-filter]").forEach(item => {
          item.classList.remove("active");
        });
        filtros
          .querySelector("[data-filtro-datos-prueba]")
          ?.classList.remove("active");
        boton.classList.add("active");
        aplicarFiltroRecompensas();
      }, 30);
    });

    filtros.addEventListener(
      "click",
      event => {
        const normal = event.target?.closest?.("[data-filter]");
        const pruebas = event.target?.closest?.("[data-filtro-datos-prueba]");
        if (!normal && !pruebas) return;
        salirFiltroRecompensas();
      },
      true
    );
  }

  /* Pruebas se crea dinámicamente; mantener Recompensa inmediatamente después. */
  const pruebas = filtros.querySelector("[data-filtro-datos-prueba]");
  if (pruebas && pruebas.nextElementSibling !== boton) pruebas.after(boton);

  actualizarFiltroRecompensas();
  asegurarIntegracionFiltrosEstandar();
}

function programarDecoracion() {
  if (decoracionPendiente) return;
  decoracionPendiente = true;

  window.requestAnimationFrame(() => {
    decoracionPendiente = false;
    asegurarFiltroRecompensas();
    if (soloRecompensas) aplicarFiltroRecompensas();
  });
}

function instalar() {
  if (instalada) return;
  instalada = true;

  const observadorDom = new MutationObserver(cambios => {
    const hayCambioEstructural = cambios.some(cambio =>
      cambio.addedNodes.length > 0 || cambio.removedNodes.length > 0
    );
    if (hayCambioEstructural) programarDecoracion();
  });

  observadorDom.observe(document.body, {
    childList: true,
    subtree: true
  });

  const lista = document.getElementById("listaTareas");
  if (lista) {
    observadorLista = new MutationObserver(() => {
      if (soloRecompensas) programarDecoracion();
    });
    observadorLista.observe(lista, {
      attributes: true,
      attributeFilter: ["hidden"],
      subtree: true
    });
  }

  detenerReconocimientos = Reconocimientos.observar(
    items => {
      recompensasPorMision = new Set(
        items
          .filter(
            item =>
              item.estado === "activo" &&
              texto(item.fuentePrincipal?.misionId)
          )
          .map(item => texto(item.fuentePrincipal.misionId))
      );
      programarDecoracion();
    },
    error =>
      console.debug(
        "No se pudieron observar las Recompensas de Misiones.",
        error
      )
  );

  programarDecoracion();

  window.addEventListener(
    "beforeunload",
    () => {
      detenerReconocimientos?.();
      observadorLista?.disconnect();
      observadorDom.disconnect();
    },
    { once: true }
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", instalar, { once: true });
} else {
  instalar();
}
