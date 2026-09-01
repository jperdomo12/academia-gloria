/* Academia Gloria Valentina · Eliminación reforzada de Misiones completadas */

let instalada = false;
let decoracionPendiente = false;

function texto(valor = "") {
  return String(valor ?? "").trim();
}

function idTarjeta(tarjeta) {
  return texto(tarjeta?.querySelector("[data-id]")?.dataset?.id);
}

function tituloTarjeta(tarjeta) {
  return texto(
    tarjeta?.querySelector(".tarea-card__resumen-principal h3")?.childNodes?.[0]?.textContent ||
    tarjeta?.querySelector(".tarea-card__resumen-principal h3")?.textContent ||
    "Misión completada"
  );
}

function esCompletada(tarjeta) {
  return Boolean(tarjeta?.querySelector(".tarea-estado.estado-completada"));
}

function cargarEstilos() {
  if (document.getElementById("estilosEliminarCompletadas")) return;

  const estilos = document.createElement("style");
  estilos.id = "estilosEliminarCompletadas";
  estilos.textContent = `
    .accion-eliminar-completada {
      border: 1px solid #fecdd3 !important;
      background: #fff1f2 !important;
      color: #be123c !important;
    }

    .accion-eliminar-completada:hover:not(:disabled) {
      background: #ffe4e6 !important;
    }

    .accion-eliminar-completada:disabled {
      opacity: .58;
      cursor: wait;
    }
  `;
  document.head.appendChild(estilos);
}

function restaurarBoton(boton) {
  if (!boton) return;
  boton.disabled = false;
  boton.textContent = "⚠️ Eliminar misión completada";
}

async function eliminarMisionCompletada(misionId, tarjeta, boton) {
  const id = texto(misionId);
  if (!id || boton?.disabled) return;

  boton.disabled = true;
  boton.textContent = "🔎 Revisando historial…";

  try {
    const {
      ejecutarEliminacionPreparada,
      prepararEliminacionMision,
      textoResumenEliminacion
    } = await import("./eliminacion-misiones.js");

    const preparacion = await prepararEliminacionMision(id);
    const tarea = preparacion.tarea;

    if (!tarea) {
      throw new Error("La Misión ya no existe. Actualiza la lista antes de continuar.");
    }

    if (texto(tarea.estado) !== "completada") {
      throw new Error("La Misión ya no está completada. Actualiza la lista antes de continuar.");
    }

    const resumen = textoResumenEliminacion(preparacion);
    const titulo = texto(tarea.titulo) || tituloTarjeta(tarjeta);

    const primeraConfirmacion = window.confirm([
      "⚠️ ELIMINACIÓN DE UNA MISIÓN COMPLETADA",
      "",
      "Esta acción modifica el historial educativo y no se puede deshacer.",
      "",
      `Misión: ${titulo}`,
      `• ${resumen.evidencias} evidencia(s) vinculada(s) que se eliminarán`,
      `• ${resumen.sesiones} sesión(es)/registro(s) exclusivo(s) que se eliminarán`,
      `• ${resumen.conservadas} registro(s) posterior(es) o reutilizado(s) que se conservarán`,
      "",
      resumen.descripcionConservadas,
      "",
      "La Misión también será eliminada definitivamente.",
      "",
      "¿Quieres continuar con la confirmación final?"
    ].join("\n"));

    if (!primeraConfirmacion) {
      restaurarBoton(boton);
      return;
    }

    const confirmacionEscrita = window.prompt(
      "Confirmación final.\n\nEscribe ELIMINAR para borrar definitivamente esta Misión completada y todos sus datos exclusivos."
    );

    if (texto(confirmacionEscrita).toUpperCase() !== "ELIMINAR") {
      window.alert("Eliminación cancelada. No se modificó ningún dato.");
      restaurarBoton(boton);
      return;
    }

    boton.textContent = "🧹 Eliminando…";

    const resultado = await ejecutarEliminacionPreparada(preparacion, {
      eliminarMision: true
    });

    const conservadas = resultado.sesionesConservar?.length || 0;
    window.alert(
      `✅ Misión completada eliminada.\n\n` +
      `• ${resultado.evidenciasEliminadas} evidencia(s) eliminada(s)\n` +
      `• ${resultado.sesionesEliminadas} sesión(es)/registro(s) exclusivo(s) eliminado(s)` +
      (conservadas
        ? `\n• ${conservadas} registro(s) posterior(es) conservado(s) por seguridad`
        : "")
    );
  } catch (error) {
    console.error("No se pudo eliminar la Misión completada.", error);
    window.alert(
      `No se pudo completar la eliminación.\n${error.message || "Error no identificado"}`
    );
    restaurarBoton(boton);
  }
}

function decorarTarjetas() {
  document.querySelectorAll("#listaTareas > .tarea-card").forEach(tarjeta => {
    const acciones = tarjeta.querySelector(".tarea-acciones");
    if (!acciones) return;

    const existente = acciones.querySelector("[data-eliminar-completada]");

    if (!esCompletada(tarjeta)) {
      existente?.remove();
      return;
    }

    const id = idTarjeta(tarjeta);
    if (!id) return;

    if (existente) {
      existente.dataset.eliminarCompletada = id;
      return;
    }

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn accion-eliminar-completada";
    boton.dataset.eliminarCompletada = id;
    boton.textContent = "⚠️ Eliminar misión completada";

    boton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      eliminarMisionCompletada(
        boton.dataset.eliminarCompletada,
        tarjeta,
        boton
      );
    });

    acciones.appendChild(boton);
  });
}

function programarDecoracion() {
  if (decoracionPendiente) return;
  decoracionPendiente = true;

  window.requestAnimationFrame(() => {
    decoracionPendiente = false;
    decorarTarjetas();
  });
}

export function instalarEliminacionCompletadas() {
  if (instalada) return;
  instalada = true;
  cargarEstilos();

  const lista = document.getElementById("listaTareas");
  if (lista) {
    new MutationObserver(programarDecoracion).observe(lista, {
      childList: true,
      subtree: true
    });
  }

  programarDecoracion();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", instalarEliminacionCompletadas, { once: true });
} else {
  instalarEliminacionCompletadas();
}
