/* Academia Gloria Valentina · Limpieza de datos de prueba · Fase 2 controlada */

import { db } from "../../compartido/firebase/firebase-config.js";
import { Academia } from "../../compartido/api/academia.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";
import {
  eliminarSesionHistoria,
  obtenerSesionHistoria
} from "../../compartido/js/detectives-progreso.js";
import {
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const $ = id => document.getElementById(id);

function texto(valor = "") {
  return String(valor ?? "").trim();
}

function cargarEstilos() {
  if (document.querySelector('link[data-limpieza-borrado-css="true"]')) return;
  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./limpieza-datos-prueba-borrado.css", import.meta.url).href;
  enlace.dataset.limpiezaBorradoCss = "true";
  document.head.appendChild(enlace);
}

function crearInterfaz() {
  if ($("limpiezaBorradoControlado")) return;
  const detalle = $("limpiezaDetalle");
  if (!detalle?.parentElement) return;

  const bloque = document.createElement("section");
  bloque.id = "limpiezaBorradoControlado";
  bloque.className = "limpieza-borrado-controlado hidden";
  bloque.innerHTML = `
    <div class="limpieza-borrado-controlado__cabecera">
      <div>
        <span class="limpieza-borrado-controlado__etiqueta">Fase 2 · Eliminación controlada</span>
        <h4>🗑️ Eliminar una prueba confirmada</h4>
        <p>
          Esta primera versión solo permite borrar Misiones de <strong>Detectives</strong>
          cuando todas sus evidencias apuntan a sesiones exactas localizables.
        </p>
      </div>
      <span class="limpieza-borrado-controlado__seguridad">🛡️ Validación doble</span>
    </div>

    <label class="limpieza-borrado-confirmacion">
      <input id="limpiezaConfirmarPrueba" type="checkbox">
      <span>
        <strong>Confirmo que la Misión seleccionada fue creada únicamente para pruebas.</strong>
        <small>La eliminación será permanente e incluirá la Misión, sus evidencias y sus sesiones exactas de Detectives.</small>
      </span>
    </label>

    <div class="limpieza-borrado-controlado__acciones">
      <button id="limpiezaEliminarPrueba" class="btn limpieza-boton-eliminar" type="button" disabled>
        🗑️ Eliminar datos de esta prueba
      </button>
      <span id="limpiezaBorradoEstado" aria-live="polite">
        Primero revisa los vínculos de la Misión seleccionada.
      </span>
    </div>
  `;

  detalle.parentElement.insertBefore(bloque, detalle.nextSibling);

  $("limpiezaConfirmarPrueba")?.addEventListener("change", actualizarBoton);
  $("limpiezaMision")?.addEventListener("change", reiniciarBorrado);
  $("limpiezaEliminarPrueba")?.addEventListener("click", eliminarPruebaSeleccionada);

  const observador = new MutationObserver(() => {
    if (detalle.children.length) prepararBorrado();
  });
  observador.observe(detalle, { childList: true, subtree: false });
}

function reiniciarBorrado() {
  const bloque = $("limpiezaBorradoControlado");
  const confirmar = $("limpiezaConfirmarPrueba");
  const estado = $("limpiezaBorradoEstado");
  if (bloque) bloque.classList.add("hidden");
  if (confirmar) confirmar.checked = false;
  if (estado) estado.textContent = "Primero revisa los vínculos de la Misión seleccionada.";
  actualizarBoton();
}

function prepararBorrado() {
  const misionId = texto($("limpiezaMision")?.value);
  const detalle = $("limpiezaDetalle");
  const bloque = $("limpiezaBorradoControlado");
  if (!misionId || !detalle?.children.length || !bloque) return;

  bloque.classList.remove("hidden");
  const estado = $("limpiezaBorradoEstado");
  if (estado) {
    estado.textContent = "Si reconoces esta Misión como prueba, confírmalo. Antes de borrar volveremos a validar todos los vínculos contra Firestore.";
  }
  actualizarBoton();
}

function actualizarBoton() {
  const boton = $("limpiezaEliminarPrueba");
  const confirmar = $("limpiezaConfirmarPrueba");
  const misionId = texto($("limpiezaMision")?.value);
  if (boton) boton.disabled = !(confirmar?.checked && misionId);
}

async function validarGrupoDetectives(misionId) {
  const contexto = await ContextoUsuario.inicializar();
  const userId = texto(contexto.userIdPersonaActiva);
  if (!userId) throw new Error("No se pudo resolver el alumno activo.");

  const [tarea, evidencias] = await Promise.all([
    Academia.tareas.obtener(misionId),
    Academia.evidencias.leerPorMision(misionId)
  ]);

  if (!tarea) {
    throw new Error(
      "La Misión ya no existe. Esta primera fase de borrado no elimina evidencias huérfanas automáticamente."
    );
  }
  if (!evidencias.length) {
    throw new Error("La Misión no tiene evidencias vinculadas para limpiar.");
  }

  const noDetectives = evidencias.filter(evidencia =>
    texto(evidencia.modulo) !== "detectives"
  );
  if (noDetectives.length) {
    throw new Error(
      "Esta Misión contiene evidencias que no son de Detectives. Por seguridad, el borrado automático queda bloqueado."
    );
  }

  const sesionesPorClave = new Map();

  for (const evidencia of evidencias) {
    const historiaId = texto(evidencia.actividadId);
    const sesionId = texto(evidencia.sesionId);
    if (!historiaId || !sesionId) {
      throw new Error(
        "Una de las evidencias no tiene historiaId/sesionId suficientes. No se eliminará nada."
      );
    }

    const sesion = await obtenerSesionHistoria(userId, historiaId, sesionId);
    if (!sesion) {
      throw new Error(
        `No se localizó la sesión exacta ${sesionId}. No se eliminará nada.`
      );
    }

    sesionesPorClave.set(`${historiaId}::${sesionId}`, {
      historiaId,
      sesionId,
      sesion
    });
  }

  return {
    userId,
    tarea,
    evidencias,
    sesiones: [...sesionesPorClave.values()]
  };
}

async function eliminarPruebaSeleccionada() {
  const misionId = texto($("limpiezaMision")?.value);
  const boton = $("limpiezaEliminarPrueba");
  const confirmar = $("limpiezaConfirmarPrueba");
  const estado = $("limpiezaBorradoEstado");

  if (!misionId || !confirmar?.checked || !boton) return;

  boton.disabled = true;
  if (estado) estado.textContent = "🔎 Validando nuevamente la Misión y sus sesiones exactas…";

  let validacion;
  try {
    validacion = await validarGrupoDetectives(misionId);
  } catch (error) {
    if (estado) {
      estado.textContent = `⛔ Borrado bloqueado: ${error.message || "No fue posible validar los datos."}`;
    }
    actualizarBoton();
    return;
  }

  const titulo = texto(validacion.tarea.titulo) || "Misión sin título";
  const mensaje =
    `Vas a eliminar permanentemente:\n\n` +
    `• Misión: ${titulo}\n` +
    `• ${validacion.evidencias.length} evidencia(s)\n` +
    `• ${validacion.sesiones.length} sesión(es) exacta(s) de Detectives\n\n` +
    `Las estadísticas de Detectives se recalcularán después de retirar estas sesiones.\n\n` +
    `¿Confirmas que todo corresponde a una prueba?`;

  if (!window.confirm(mensaje)) {
    if (estado) estado.textContent = "Eliminación cancelada. No se modificó ningún dato.";
    actualizarBoton();
    return;
  }

  let sesionesEliminadas = 0;
  let evidenciasEliminadas = 0;

  try {
    if (estado) estado.textContent = "🧹 Eliminando sesiones de prueba y recalculando Detectives…";

    for (const sesion of validacion.sesiones) {
      await eliminarSesionHistoria(
        validacion.userId,
        sesion.historiaId,
        sesion.sesionId
      );
      sesionesEliminadas += 1;
    }

    if (estado) estado.textContent = "🧹 Eliminando evidencias de la Misión de prueba…";
    for (const evidencia of validacion.evidencias) {
      await deleteDoc(
        doc(
          db,
          "usuarios",
          validacion.userId,
          "evidencias",
          evidencia.id
        )
      );
      evidenciasEliminadas += 1;
    }

    if (estado) estado.textContent = "🧹 Eliminando la Misión de prueba…";
    await Academia.tareas.eliminar(misionId);

    confirmar.checked = false;
    boton.disabled = true;
    if (estado) {
      estado.textContent =
        `✅ Prueba eliminada: ${sesionesEliminadas} sesión(es), ${evidenciasEliminadas} evidencia(s) y la Misión. Actualizando inventario…`;
    }

    window.setTimeout(() => {
      $("limpiezaActualizar")?.click();
      reiniciarBorrado();
    }, 700);
  } catch (error) {
    if (estado) {
      estado.textContent =
        `⚠️ La limpieza quedó incompleta (${sesionesEliminadas} sesión(es) y ${evidenciasEliminadas} evidencia(s) eliminadas). ` +
        `Actualiza el inventario antes de continuar. Razón: ${error.message || "Error no identificado"}`;
    }
    boton.disabled = true;
  }
}

function iniciar() {
  cargarEstilos();
  window.setTimeout(crearInterfaz, 0);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
