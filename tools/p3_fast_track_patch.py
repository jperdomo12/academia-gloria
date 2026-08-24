from pathlib import Path
import re


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: se esperaba 1 coincidencia y se encontraron {count}")
    return text.replace(old, new, 1)


def function_segment(text, start_marker, end_marker, label):
    start = text.find(start_marker)
    if start < 0:
        raise SystemExit(f"{label}: no se encontró inicio")
    end = text.find(end_marker, start)
    if end < 0:
        raise SystemExit(f"{label}: no se encontró fin")
    return start, end, text[start:end]


def replace_segment(text, start, end, segment):
    return text[:start] + segment + text[end:]


# =============================================================
# API central
# =============================================================
api_path = Path("compartido/api/academia.js")
api = api_path.read_text(encoding="utf-8")

helpers_marker = "function normalizarCriterioCumplimiento(criterio = {}) {"
history_helpers = '''function coleccionHistorialTarea(tareaId, userId) {
  const id = textoSeguro(tareaId);
  if (!id) throw new Error("Falta el identificador de la tarea.");
  return collection(db, "usuarios", userId, "tareas", id, "historial");
}

async function registrarEventoHistorialTarea(id, evento = {}) {
  const tareaId = textoSeguro(id);
  if (!tareaId) throw new Error("Falta el identificador de la tarea.");

  const userId = await obtenerUIDPersonaActiva();
  const actorUserId = textoSeguro(evento.actorUserId) || obtenerUID();
  const referencia = await addDoc(
    coleccionHistorialTarea(tareaId, userId),
    {
      tipo: textoSeguro(evento.tipo) || "modificada",
      estadoAnterior: textoSeguro(evento.estadoAnterior) || null,
      estadoNuevo: textoSeguro(evento.estadoNuevo) || null,
      resumen: textoSeguro(evento.resumen),
      actorUserId,
      creadoEn: serverTimestamp()
    }
  );

  return referencia.id;
}

async function registrarEventoHistorialTareaSeguro(id, evento = {}) {
  try {
    return await registrarEventoHistorialTarea(id, evento);
  } catch (error) {
    console.warn("No se pudo registrar el historial de la Misión.", error);
    return null;
  }
}

async function leerHistorialTarea(id) {
  const tareaId = textoSeguro(id);
  if (!tareaId) throw new Error("Falta el identificador de la tarea.");

  const userId = await obtenerUIDPersonaActiva();
  const resultado = await getDocs(
    query(
      coleccionHistorialTarea(tareaId, userId),
      orderBy("creadoEn", "desc")
    )
  );

  return resultado.docs.map(documento => ({
    id: documento.id,
    ...documento.data()
  }));
}

'''
if "function leerHistorialTarea(id)" not in api:
    api = replace_once(
        api,
        helpers_marker,
        history_helpers + helpers_marker,
        "API helpers historial"
    )

# crearTarea
start, end, segment = function_segment(
    api,
    "async function crearTarea(tarea) {",
    "async function obtenerTarea(id) {",
    "crearTarea"
)
if "tipo: \"creada\"" not in segment:
    segment = replace_once(
        segment,
        "  return referencia.id;\n}",
        '''  await registrarEventoHistorialTareaSeguro(referencia.id, {
    tipo: "creada",
    estadoNuevo: datos.estado,
    actorUserId,
    resumen: "Misión creada."
  });

  return referencia.id;
}
''',
        "crearTarea historial"
    )
api = replace_segment(api, start, end, segment)

# actualizarTarea
start, end, segment = function_segment(
    api,
    "async function actualizarTarea(id, cambios = {}) {",
    "async function cambiarEstadoTarea(id, estado, datosExtra = {}) {",
    "actualizarTarea"
)
if "camposHistorial" not in segment:
    anchor = '''  await updateDoc(referencia, {
    ...datos,
    ...cambiosAuditoria
  });
'''
    addition = anchor + '''
  const camposHistorial = Object.keys(datos).filter(
    clave => clave !== "ordenMision"
  );

  if (camposHistorial.length) {
    await registrarEventoHistorialTareaSeguro(id, {
      tipo: "modificada",
      actorUserId,
      estadoAnterior: datosExistentes
        ? normalizarEstadoTarea(datosExistentes.estado)
        : "",
      estadoNuevo: "estado" in datos ? datos.estado : "",
      resumen: "Misión actualizada."
    });
  }
'''
    segment = replace_once(segment, anchor, addition, "actualizarTarea historial")
api = replace_segment(api, start, end, segment)

# cambiarEstadoTarea
start, end, segment = function_segment(
    api,
    "async function cambiarEstadoTarea(id, estado, datosExtra = {}) {",
    "function normalizarEvidencia(evidencia = {}, { alumnoUserId = \"\" } = {}) {",
    "cambiarEstadoTarea"
)
if "tipo: \"estado\"" not in segment:
    anchor = "  await updateDoc(referencia, cambios);\n"
    addition = anchor + '''
  if (estadoNormalizado !== estadoAnterior) {
    await registrarEventoHistorialTareaSeguro(id, {
      tipo: "estado",
      actorUserId,
      estadoAnterior,
      estadoNuevo: estadoNormalizado,
      resumen: `Estado cambiado de ${estadoAnterior} a ${estadoNormalizado}.`
    });
  }
'''
    segment = replace_once(segment, anchor, addition, "cambiarEstado historial")
api = replace_segment(api, start, end, segment)

# registrarEvidenciaMision
start, end, segment = function_segment(
    api,
    "async function registrarEvidenciaMision(evidenciaEntrada) {",
    "async function leerEvidenciasMision(misionId) {",
    "registrarEvidenciaMision"
)
if "tipo: \"evidencia\"" not in segment:
    anchor = "  return resultado;\n}"
    addition = '''  if (!resultado.duplicada) {
    await registrarEventoHistorialTareaSeguro(evidencia.misionId, {
      tipo: "evidencia",
      actorUserId,
      estadoNuevo: resultado.estado,
      resumen:
        `Actividad registrada (${resultado.cantidadActual} de ` +
        `${resultado.cantidadObjetivo}).`
    });
  }

  return resultado;
}'''
    segment = replace_once(segment, anchor, addition, "evidencia historial")
api = replace_segment(api, start, end, segment)

# guardarObservacionTarea
start, end, segment = function_segment(
    api,
    "async function guardarObservacionTarea(id, texto) {",
    "async function eliminarTarea(id) {",
    "guardarObservacionTarea"
)
if "tipo: \"observacion\"" not in segment:
    old = '''  await updateDoc(referencia, {
    observacionActual: observacion,
    historialObservaciones: nuevoHistorial,
    updatedAt: serverTimestamp(),
    updatedBy: obtenerUID()
  });
}'''
    new = '''  const actorUserId = obtenerUID();

  await updateDoc(referencia, {
    observacionActual: observacion,
    historialObservaciones: nuevoHistorial,
    updatedAt: serverTimestamp(),
    updatedBy: actorUserId
  });

  if (observacion && observacion !== actual) {
    await registrarEventoHistorialTareaSeguro(id, {
      tipo: "observacion",
      actorUserId,
      resumen: "Observación familiar actualizada."
    });
  }
}'''
    segment = replace_once(segment, old, new, "observacion historial")
api = replace_segment(api, start, end, segment)

# eliminarTarea pasa a compatibilidad de cancelación
start, end, segment = function_segment(
    api,
    "async function eliminarTarea(id) {",
    "/* ==========================================================\n   Administración de Usuarios",
    "eliminarTarea"
)
if "cambiarEstadoTarea(id, \"cancelada\")" not in segment:
    segment = '''async function eliminarTarea(id) {
  // Compatibilidad: eliminar ya no borra. Una misión nunca desaparece;
  // la operación histórica se convierte en cancelación conservada.
  return cambiarEstadoTarea(id, "cancelada");
}



'''
api = replace_segment(api, start, end, segment)

# API pública
old = '''    registrarEvidencia: registrarEvidenciaMision,
    leerEvidencias: leerEvidenciasMision,
    guardarObservacion: guardarObservacionTarea,
    eliminar: eliminarTarea
  }),'''
new = '''    registrarEvidencia: registrarEvidenciaMision,
    leerEvidencias: leerEvidenciasMision,
    leerHistorial: leerHistorialTarea,
    guardarObservacion: guardarObservacionTarea,
    cancelar: id => cambiarEstadoTarea(id, "cancelada"),
    eliminar: eliminarTarea
  }),'''
if "leerHistorial: leerHistorialTarea" not in api:
    api = replace_once(api, old, new, "API pública historial/cancelar")

api_path.write_text(api, encoding="utf-8")


# =============================================================
# UI Gestión de Misiones
# =============================================================
ui_path = Path("mi-universo/mis-tareas/mis-tareas.js")
ui = ui_path.read_text(encoding="utf-8")

ui = ui.replace('    cancelada: "Cancelada"', '    cancelada: "🚫 Cancelada"', 1)

if 'data-action="history"' not in ui:
    old = '''        ${auditoriaTareaHtml(tarea)}

        <div class="tarea-acciones">'''
    new = '''        ${auditoriaTareaHtml(tarea)}

        <details class="auditoria-mision historial-mision">
          <summary
            data-action="history"
            data-id="${escapar(tarea.id)}"
          >🕘 Historial de cambios</summary>
          <div data-historial-lista="${escapar(tarea.id)}">
            <p>Abre este bloque para consultar la trazabilidad de la Misión.</p>
          </div>
        </details>

        <div class="tarea-acciones">'''
    ui = replace_once(ui, old, new, "UI bloque historial")

# Cancelada se consulta, no se edita
ui = replace_once(
    ui,
    '''            tarea.estado === "completada"
              ? `<button class="btn accion-editar"''',
    '''            ["completada", "cancelada"].includes(tarea.estado)
              ? `<button class="btn accion-editar"''',
    "UI cancelada solo lectura"
)

# Sustituir bloque final de eliminar por cancelar/reabrir
pattern = re.compile(
    r'''\$\{\s*\n\s*tarea\.estado === "completada"\s*\n\s*\? `<span class="mision-conservada"[\s\S]*?data-action="delete"[\s\S]*?</button>`\s*\n\s*\}'''
)
match = pattern.search(ui)
if not match:
    raise SystemExit("UI cancelar/reabrir: no se encontró el bloque legado")
replacement = '''${
            tarea.estado === "completada"
              ? `<span class="mision-conservada" title="Esta misión forma parte del historial">
                   🔒 Conservada en el historial
                 </span>`
              : tarea.estado === "cancelada"
                ? `<button class="btn accion-reabrir"
                    data-action="reopen"
                    data-id="${escapar(tarea.id)}">
                   ↩️ Reabrir misión
                 </button>`
                : esEstadoEnEspera(tarea.estado)
                  ? ""
                  : `<button class="btn accion-eliminar"
                      data-action="cancel"
                      data-id="${escapar(tarea.id)}">
                     🚫 Cancelar misión
                   </button>`
          }'''
ui = ui[:match.start()] + replacement + ui[match.end():]

# Historial consultable
if "async function mostrarHistorialMision(id)" not in ui:
    marker = "async function normalizarOrdenMisiones() {"
    history_ui = '''async function mostrarHistorialMision(id) {
  const contenedor = document.querySelector(
    `[data-historial-lista="${CSS.escape(id)}"]`
  );
  if (!contenedor) return;

  contenedor.innerHTML = "<p>Cargando historial…</p>";

  try {
    const eventos = await Academia.tareas.leerHistorial(id);

    if (!eventos.length) {
      contenedor.innerHTML =
        "<p>No hay eventos detallados anteriores. Los datos de auditoría de la Misión se conservan arriba.</p>";
      return;
    }

    const etiquetas = {
      creada: "Misión creada",
      modificada: "Misión actualizada",
      estado: "Cambio de estado",
      evidencia: "Actividad registrada",
      observacion: "Observación actualizada"
    };

    contenedor.innerHTML = `<dl>${eventos.map(evento => `
      <div class="auditoria-mision__fila">
        <dt>${escapar(etiquetas[evento.tipo] || evento.tipo || "Cambio")}</dt>
        <dd>
          ${escapar(fechaEvidencia(evento.creadoEn))} ·
          ${escapar(etiquetaActor(evento.actorUserId))}
          ${evento.resumen ? ` · ${escapar(evento.resumen)}` : ""}
        </dd>
      </div>
    `).join("")}</dl>`;
  } catch (error) {
    console.error("No se pudo cargar el historial de la Misión.", error);
    contenedor.innerHTML =
      "<p>No fue posible cargar el historial en este momento.</p>";
  }
}

'''
    ui = replace_once(ui, marker, history_ui + marker, "UI función historial")

if 'if (action === "history")' not in ui:
    old = '''    if (action === "evidence") {
      await mostrarEvidenciasMision(id, button);
      button.disabled = false;
      return;
    }

    if (action === "start") {'''
    new = '''    if (action === "evidence") {
      await mostrarEvidenciasMision(id, button);
      button.disabled = false;
      return;
    }

    if (action === "history") {
      await mostrarHistorialMision(id);
      button.disabled = false;
      return;
    }

    if (action === "start") {'''
    ui = replace_once(ui, old, new, "UI handler historial")

# Handler delete -> cancel/reopen
start = ui.find('    if (action === "delete") {')
if start < 0:
    raise SystemExit("UI handler legado delete no encontrado")
end_marker = '''      await Academia.tareas.eliminar(id);
    }
  } catch (error) {'''
end = ui.find(end_marker, start)
if end < 0:
    raise SystemExit("UI fin handler delete no encontrado")
end_block = end + len('      await Academia.tareas.eliminar(id);\n    }')
new_handler = '''    if (action === "cancel") {
      const confirmado = confirm(
        "¿Cancelar esta misión?\\n\\n" +
        "La Misión dejará de aparecer entre las activas, pero se conservarán " +
        "su información, sus evidencias y su historial."
      );

      if (!confirmado) {
        button.disabled = false;
        return;
      }

      await Academia.tareas.cancelar(id);
      return;
    }

    if (action === "reopen") {
      const cantidadActual = Number(tarea.progreso?.cantidadActual || 0);
      const estadoDestino = cantidadActual > 0 ? "en_curso" : "pendiente";

      const confirmado = confirm(
        "¿Reabrir esta misión?\\n\\n" +
        "Volverá a estar disponible para continuar y conservará todo su historial."
      );

      if (!confirmado) {
        button.disabled = false;
        return;
      }

      await Academia.tareas.cambiarEstado(id, estadoDestino, {
        "progreso.completadaEn": null
      });
    }'''
ui = ui[:start] + new_handler + ui[end_block:]

if 'data-action="delete"' in ui or 'Academia.tareas.eliminar(id)' in ui:
    raise SystemExit("UI: quedaron referencias activas a eliminación dura")

ui_path.write_text(ui, encoding="utf-8")
