/* Academia Gloria Valentina · Limpieza y eliminación completa de Misiones */

import {
  ejecutarEliminacionPreparada,
  instalarEliminacionMisionCompleta,
  prepararEliminacionMision,
  textoResumenEliminacion
} from "./eliminacion-misiones.js";

const $ = id => document.getElementById(id);
let modoActual = "prueba";

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

function actualizarTextosGenerales() {
  const bloque = $("limpiezaDatosPrueba");
  if (!bloque) return;

  const subtitulo = bloque.querySelector(".limpieza-pruebas__summary small");
  if (subtitulo) {
    subtitulo.textContent = "Identificar primero · eliminar después de forma controlada";
  }

  const insignia = bloque.querySelector(".limpieza-solo-lectura");
  if (insignia) insignia.textContent = "🛡️ Controlado";

  const info = bloque.querySelector(".limpieza-alerta--informacion p");
  if (info) {
    info.textContent =
      "La herramienta permite completar eliminaciones antiguas que dejaron evidencias sin Misión. " +
      "Solo se borran sesiones que puedan atribuirse a esa Misión; cualquier actividad posterior o reutilizada se conserva.";
  }
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
        <span class="limpieza-borrado-controlado__etiqueta">Eliminación completa · Controlada</span>
        <h4 id="limpiezaBorradoTitulo">🗑️ Eliminar una prueba confirmada</h4>
        <p id="limpiezaBorradoExplicacion">
          Se eliminarán la Misión, sus evidencias y únicamente los registros que puedan atribuirse de forma segura a ella.
        </p>
      </div>
      <span class="limpieza-borrado-controlado__seguridad">🛡️ Validación doble</span>
    </div>

    <label class="limpieza-borrado-confirmacion">
      <input id="limpiezaConfirmarPrueba" type="checkbox">
      <span>
        <strong id="limpiezaConfirmarTexto">Confirmo que la Misión seleccionada fue creada únicamente para pruebas.</strong>
        <small id="limpiezaConfirmarAyuda">La eliminación será permanente.</small>
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
  $("limpiezaEliminarPrueba")?.addEventListener("click", eliminarSeleccionada);

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

  const misionAusente = Boolean(
    detalle.querySelector(".limpieza-alerta--advertencia")
  );
  modoActual = misionAusente ? "restos" : "prueba";

  bloque.classList.remove("hidden");

  const titulo = $("limpiezaBorradoTitulo");
  const explicacion = $("limpiezaBorradoExplicacion");
  const confirmarTexto = $("limpiezaConfirmarTexto");
  const confirmarAyuda = $("limpiezaConfirmarAyuda");
  const boton = $("limpiezaEliminarPrueba");
  const estado = $("limpiezaBorradoEstado");
  const confirmar = $("limpiezaConfirmarPrueba");

  if (confirmar) confirmar.checked = false;

  if (misionAusente) {
    if (titulo) titulo.textContent = "🧹 Completar eliminación de una Misión antigua";
    if (explicacion) {
      explicacion.textContent =
        "La Misión ya fue borrada anteriormente. Ahora podemos eliminar sus evidencias restantes y las sesiones que todavía puedan atribuirse exclusivamente a ella.";
    }
    if (confirmarTexto) {
      confirmarTexto.textContent =
        "Confirmo que quiero completar la eliminación de esta Misión que ya fue borrada.";
    }
    if (confirmarAyuda) {
      confirmarAyuda.textContent =
        "Una lectura de Rincón actualizada posteriormente se conservará automáticamente.";
    }
    if (boton) boton.textContent = "🧹 Completar eliminación antigua";
    if (estado) {
      estado.textContent =
        "La Misión ya no existe. Se volverán a comprobar todos los restos antes de eliminarlos.";
    }
  } else {
    if (titulo) titulo.textContent = "🗑️ Eliminar una prueba confirmada";
    if (explicacion) {
      explicacion.textContent =
        "Si reconoces esta Misión como una prueba, puedes eliminarla completamente: Misión, evidencias y registros exclusivos.";
    }
    if (confirmarTexto) {
      confirmarTexto.textContent =
        "Confirmo que la Misión seleccionada fue creada únicamente para pruebas.";
    }
    if (confirmarAyuda) {
      confirmarAyuda.textContent =
        "Los registros posteriores o reutilizados se protegerán automáticamente.";
    }
    if (boton) boton.textContent = "🗑️ Eliminar datos de esta prueba";
    if (estado) {
      estado.textContent =
        "Antes de borrar se repetirá la validación contra Firestore.";
    }
  }

  const avisoVista = detalle.querySelector(".limpieza-alerta--segura p");
  if (avisoVista) {
    avisoVista.textContent =
      "La revisión anterior no modificó datos. La eliminación solo se ejecutará después de esta confirmación y de una segunda validación inmediata.";
  }

  actualizarBoton();
}

function actualizarBoton() {
  const boton = $("limpiezaEliminarPrueba");
  const confirmar = $("limpiezaConfirmarPrueba");
  const misionId = texto($("limpiezaMision")?.value);
  if (boton) boton.disabled = !(confirmar?.checked && misionId);
}

async function eliminarSeleccionada() {
  const misionId = texto($("limpiezaMision")?.value);
  const boton = $("limpiezaEliminarPrueba");
  const confirmar = $("limpiezaConfirmarPrueba");
  const estado = $("limpiezaBorradoEstado");

  if (!misionId || !confirmar?.checked || !boton) return;

  boton.disabled = true;
  if (estado) estado.textContent = "🔎 Validando nuevamente evidencias y sesiones…";

  let preparacion;
  try {
    preparacion = await prepararEliminacionMision(
      misionId,
      { permitirMisionAusente: modoActual === "restos" }
    );

    if (modoActual === "restos" && preparacion.tarea) {
      throw new Error("La Misión vuelve a estar disponible. Actualiza el inventario antes de continuar.");
    }
    if (modoActual === "prueba" && !preparacion.tarea) {
      throw new Error("La Misión acaba de desaparecer. Actualiza el inventario antes de continuar.");
    }
  } catch (error) {
    if (estado) {
      estado.textContent = `⛔ Eliminación bloqueada: ${error.message || "No fue posible validar los datos."}`;
    }
    actualizarBoton();
    return;
  }

  const resumen = textoResumenEliminacion(preparacion);
  const tituloMision = texto(preparacion.tarea?.titulo) || `Misión eliminada ${misionId}`;
  const mensaje = [
    modoActual === "restos"
      ? "Vas a completar una eliminación antigua:"
      : "Vas a eliminar completamente una Misión de prueba:",
    "",
    `• ${tituloMision}`,
    `• ${resumen.evidencias} evidencia(s) que se eliminarán`,
    `• ${resumen.sesiones} sesión(es)/registro(s) exclusivo(s) que se eliminarán`,
    `• ${resumen.conservadas} registro(s) posterior(es) o reutilizado(s) que se conservarán`,
    "",
    resumen.descripcionConservadas,
    "",
    "¿Confirmas la eliminación?"
  ].join("\n");

  if (!window.confirm(mensaje)) {
    if (estado) estado.textContent = "Eliminación cancelada. No se modificó ningún dato.";
    actualizarBoton();
    return;
  }

  try {
    if (estado) estado.textContent = "🧹 Eliminando únicamente los datos atribuibles a esa Misión…";

    const resultado = await ejecutarEliminacionPreparada(preparacion, {
      eliminarMision: modoActual === "prueba"
    });

    confirmar.checked = false;
    boton.disabled = true;

    if (estado) {
      estado.textContent =
        `✅ Eliminación completada: ${resultado.sesionesEliminadas} sesión(es)/registro(s) y ` +
        `${resultado.evidenciasEliminadas} evidencia(s) eliminadas` +
        (resultado.misionEliminada ? ", además de la Misión." : ".") +
        " Actualizando inventario…";
    }

    window.setTimeout(() => {
      $("limpiezaActualizar")?.click();
      reiniciarBorrado();
    }, 700);
  } catch (error) {
    if (estado) {
      estado.textContent =
        `⚠️ La limpieza no pudo completarse. Actualiza el inventario antes de continuar. Razón: ${error.message || "Error no identificado"}`;
    }
    boton.disabled = true;
  }
}

function iniciar() {
  instalarEliminacionMisionCompleta();
  cargarEstilos();
  actualizarTextosGenerales();
  window.setTimeout(() => {
    actualizarTextosGenerales();
    crearInterfaz();
  }, 0);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
