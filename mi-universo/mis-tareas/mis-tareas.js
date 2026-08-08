import { protegerPagina } from "../../compartido/js/auth-guard.js";
import { iniciarPanelUsuario } from "../../compartido/js/panel-usuario.js";
import { obtenerPerfil } from "../../compartido/js/perfil-usuario.js";
import { Academia } from "../../compartido/api/academia.js";

const $ = (id) => document.getElementById(id);

const DESTINOS = Object.freeze({
  "rincon-lectura": "../rincon-lectura/",
  detectives: "../aventuras-matematicas/detectives/",
  "creciendo-por-dentro": "../creciendo-por-dentro/",
  biblioteca: "../biblioteca/",
  libre: ""
});

const ICONOS = Object.freeze({
  "rincon-lectura": "📖",
  detectives: "🧩",
  "creciendo-por-dentro": "🌱",
  biblioteca: "📚",
  libre: "✏️"
});

let tareas = [];
const evidenciasAbiertas = new Set();
let filtroActual = "activas";
let detenerObservacion = null;
let catalogoSemillas = [];

function escapar(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatearFecha(valor) {
  if (!valor) return "Sin fecha límite";
  const fecha = new Date(`${valor}T12:00:00`);
  if (Number.isNaN(fecha.getTime())) return valor;

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(fecha);
}


function fechaHoraLocalAhora() {
  const fecha = new Date();
  const corregida = new Date(
    fecha.getTime() - fecha.getTimezoneOffset() * 60000
  );

  return corregida.toISOString().slice(0, 16);
}

function resultadoTarea(tarea = {}) {
  return tarea.resultado && typeof tarea.resultado === "object"
    ? tarea.resultado
    : {};
}

function tieneResultado(tarea = {}) {
  const resultado = resultadoTarea(tarea);

  return Boolean(
    resultado.fechaFinalizacion ||
    String(resultado.observaciones || "").trim() ||
    resultado.masDeLoEsperado ||
    resultado.necesitoAyuda ||
    resultado.convieneRepetir
  );
}

function aplicarNombreAlumno(perfil = {}) {
  const nombreCompleto = String(
    perfil.nombreCompleto ||
    perfil.nombre ||
    perfil.nombreVisible ||
    "el alumno"
  ).trim();

  document.querySelectorAll("[data-alumno-nombre]").forEach(elemento => {
    elemento.textContent = nombreCompleto;
  });
}

function textoEstado(estado) {
  return {
    pendiente: "🌱 Preparada",
    en_curso: "▶️ En aventura",
    pendiente_validacion: "⏳ Esperando a mi familia",
    completada_pendiente_validacion: "⏳ Esperando a mi familia",
    completada: "✅ Conseguida",
    necesita_ayuda: "🤝 Necesita ayuda",
    vencida: "🌿 Retomable",
    cancelada: "Cancelada"
  }[estado] || estado;
}

function esVisibleComoMision(tarea = {}) {
  return tarea.visibleParaAlumno !== false;
}

function ordenMision(tarea = {}) {
  const valor = Number(tarea.ordenMision);
  return Number.isFinite(valor) ? valor : 9999;
}

function compararMisiones(a, b) {
  const diferencia = ordenMision(a) - ordenMision(b);

  if (diferencia !== 0) return diferencia;

  const fechaA = String(a.fechaLimite || "9999-12-31");
  const fechaB = String(b.fechaLimite || "9999-12-31");

  if (fechaA !== fechaB) {
    return fechaA.localeCompare(fechaB);
  }

  return String(a.titulo || "").localeCompare(
    String(b.titulo || ""),
    "es"
  );
}

function misionesOrdenables() {
  return tareas
    .filter(tarea =>
      esVisibleComoMision(tarea) &&
      !["completada", "cancelada"].includes(tarea.estado)
    )
    .sort(compararMisiones);
}

function tareasFiltradas() {
  if (filtroActual === "todas") return tareas;

  if (filtroActual === "completadas") {
    return tareas.filter(tarea =>
      ["completada", "pendiente_validacion", "completada_pendiente_validacion"].includes(tarea.estado)
    );
  }

  return tareas
    .filter(tarea =>
      !["completada", "cancelada"].includes(tarea.estado)
    )
    .sort((a, b) => {
      const visibleA = esVisibleComoMision(a);
      const visibleB = esVisibleComoMision(b);

      if (visibleA !== visibleB) {
        return visibleA ? -1 : 1;
      }

      return compararMisiones(a, b);
    });
}

function renderTareas() {
  const lista = $("listaTareas");
  const estado = $("estadoTareas");
  const filtradas = tareasFiltradas();

  if (!filtradas.length) {
    estado.classList.remove("hidden");
    estado.textContent =
      filtroActual === "activas"
        ? "No hay Misiones activas. Puedes preparar una nueva ✨"
        : "No hay Misiones en este filtro.";
    lista.innerHTML = "";
    return;
  }

  estado.classList.add("hidden");

  lista.innerHTML = filtradas.map(tarea => {
    const presentacion = tarea.presentacionAlumno || {};
    const icono = presentacion.icono || ICONOS[tarea.modulo] || "🌟";
    const destino = tarea.destinoUrl || DESTINOS[tarea.modulo] || "";
    const visible = esVisibleComoMision(tarea);

    return `
      <details class="superficie tarea-card">
        <summary class="tarea-card__cabecera">
          <div class="tarea-card__resumen-principal">
            <div class="tarea-icono">${escapar(icono)}</div>
            <div>
              <h3>${escapar(tarea.titulo || "Misión")}</h3>
              <p>${escapar(
                tarea.descripcion ||
                presentacion.descripcionMision ||
                "Sin descripción adicional."
              )}</p>
            </div>
          </div>

          <div class="tarea-card__resumen-estado">
            <span class="tarea-estado estado-${escapar(tarea.estado)}">
              ${escapar(textoEstado(tarea.estado))}
            </span>
            <span class="tarea-card__flecha" aria-hidden="true">⌄</span>
          </div>
        </summary>

        <div class="tarea-card__detalle">
        <div class="tarea-meta">
          <span>📅 ${escapar(formatearFecha(tarea.fechaLimite))}</span>
          <span>⏱️ ${Number(tarea.tiempoEstimadoMinutos || 0)} min</span>
          <span>🧭 ${escapar(tarea.modulo || "libre")}</span>
          <span class="tarea-visibilidad ${visible ? "visible" : "oculta"}">
            ${visible ? "🌈 Visible en Mi Camino" : "🔒 Solo seguimiento familiar"}
          </span>
          ${
            visible && !["completada", "cancelada"].includes(tarea.estado)
              ? `<span class="tarea-orden">Posición ${ordenMision(tarea) === 9999 ? "automática" : ordenMision(tarea)}</span>`
              : ""
          }
        </div>

        ${
          visible
            ? `<div class="vista-previa-mision" style="margin-top:14px">
                 <span>${escapar(icono)}</span>
                 <div>
                   <strong>${escapar(tarea.titulo || presentacion.tituloMision || "Misión")}</strong>
                   <p>${escapar(
                     presentacion.descripcionMision ||
                     tarea.descripcion ||
                     "Lía tiene una nueva aventura esperando para ti."
                   )}</p>
                 </div>
               </div>`
            : ""
        }

        ${
          tieneResultado(tarea)
            ? `<div class="resultado-resumen">
                 <strong>⭐ Resultado registrado</strong>
                 <p>${escapar(
                   resultadoTarea(tarea).observaciones ||
                   "La Misión tiene información de cierre."
                 )}</p>
               </div>`
            : ""
        }

        ${
          ["pendiente_validacion", "completada", "completada_pendiente_validacion"].includes(tarea.estado)
            ? `<section class="evidencias-mision" data-evidencias-mision="${escapar(tarea.id)}">
                 <div class="evidencias-mision__cabecera">
                   <div>
                     <strong>📖 Trabajo realizado</strong>
                     <p>Consulta las actividades relacionadas y su detalle antes de cerrar la misión.</p>
                   </div>
                   <button class="btn secundaria"
                           data-action="${tarea.modulo === "detectives" ? "review" : "evidence"}"
                           data-id="${escapar(tarea.id)}">
                     ${
                       tarea.modulo === "detectives"
                         ? "📖 Ver trabajo realizado"
                         : evidenciasAbiertas.has(tarea.id)
                           ? "Ocultar trabajo realizado"
                           : "Ver trabajo realizado"
                     }
                   </button>
                 </div>
                 ${
                   tarea.modulo === "detectives"
                     ? ""
                     : `<div class="evidencias-mision__lista ${evidenciasAbiertas.has(tarea.id) ? "" : "hidden"}"
                            data-evidencias-lista="${escapar(tarea.id)}"></div>`
                 }
               </section>`
            : ""
        }

        <div class="tarea-acciones">
          <button class="btn accion-editar"
                  data-action="edit"
                  data-id="${escapar(tarea.id)}">
            ✏️ Editar
          </button>

          <button class="btn accion-visibilidad"
                  data-action="visibility"
                  data-id="${escapar(tarea.id)}">
            ${visible ? "🔒 Ocultar de Mi Camino" : "🌈 Mostrar en Mi Camino"}
          </button>

          ${
            visible && !["completada", "cancelada"].includes(tarea.estado)
              ? `<button class="btn accion-orden"
                    data-action="up"
                    data-id="${escapar(tarea.id)}"
                    title="Subir misión">
                   ⬆️ Subir
                 </button>
                 <button class="btn accion-orden"
                    data-action="down"
                    data-id="${escapar(tarea.id)}"
                    title="Bajar misión">
                   ⬇️ Bajar
                 </button>
                 <label class="mover-posicion">
                   <span>Mover a</span>
                   <select data-action="move-position"
                           data-id="${escapar(tarea.id)}"
                           aria-label="Mover misión a otra posición">
                     ${misionesOrdenables().map((_, indice) => `
                       <option value="${indice + 1}"
                         ${ordenMision(tarea) === indice + 1 ? "selected" : ""}>
                         ${indice + 1}
                       </option>
                     `).join("")}
                   </select>
                 </label>`
              : ""
          }

          ${
            destino
              ? `<button class="btn accion-iniciar"
                    data-action="${
                      tarea.modulo === "detectives" &&
                      ["pendiente_validacion", "completada_pendiente_validacion", "completada"]
                        .includes(tarea.estado)
                        ? "review"
                        : "start"
                    }"
                    data-id="${escapar(tarea.id)}"
                    data-url="${escapar(destino)}">
                   ${
                     tarea.modulo === "rincon-lectura" &&
                     ["pendiente_validacion", "completada_pendiente_validacion", "completada"]
                       .includes(tarea.estado)
                       ? "📚 Ver lecturas de la misión"
                       : tarea.modulo === "detectives" &&
                         ["pendiente_validacion", "completada_pendiente_validacion", "completada"]
                           .includes(tarea.estado)
                         ? "📖 Ver trabajo realizado"
                         : "▶️ Abrir actividad"
                   }
                 </button>`
              : ""
          }

          ${
            tarea.estado === "pendiente_validacion" ||
            tarea.estado === "completada_pendiente_validacion"
              ? `<button class="btn accion-completar"
                    data-action="complete"
                    data-id="${escapar(tarea.id)}">
                   ✅ Cerrar misión
                 </button>
                 <button class="btn accion-reabrir"
                    data-action="reopen"
                    data-id="${escapar(tarea.id)}">
                   ↩️ Reabrir misión
                 </button>`
              : !["completada", "cancelada"].includes(tarea.estado)
                ? `<button class="btn accion-completar"
                      data-action="complete"
                      data-id="${escapar(tarea.id)}">
                     ✅ Marcar completada
                   </button>`
                : `<button class="btn accion-reabrir"
                      data-action="reopen"
                      data-id="${escapar(tarea.id)}">
                     ↩️ Volver a En aventura
                   </button>`
          }

          ${
            !["completada", "cancelada"].includes(tarea.estado)
              ? `<button class="btn accion-ayuda"
                    data-action="help"
                    data-id="${escapar(tarea.id)}">
                   🤝 Necesita ayuda
                 </button>`
              : ""
          }

          ${
            ["pendiente_validacion", "completada_pendiente_validacion", "completada"]
              .includes(tarea.estado)
              ? `<span class="mision-conservada" title="Esta misión forma parte del historial">
                   🔒 Conservada en el historial
                 </span>`
              : `<button class="btn accion-eliminar"
                    data-action="delete"
                    data-id="${escapar(tarea.id)}">
                   🗑️ Eliminar
                 </button>`
          }
        </div>
        </div>
      </details>
    `;
  }).join("");

  lista.querySelectorAll("[data-action]").forEach(control => {
    if (control.tagName === "SELECT") {
      control.onchange = () => ejecutarAccion(control);
    } else {
      control.onclick = () => ejecutarAccion(control);
    }
  });
}


function fechaEvidencia(valor) {
  if (!valor) return "Fecha no disponible";
  const fecha = typeof valor.toDate === "function" ? valor.toDate() : new Date(valor);
  if (Number.isNaN(fecha.getTime())) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(fecha);
}

async function mostrarEvidenciasMision(id, button) {
  const contenedor = document.querySelector(
    `[data-evidencias-lista="${CSS.escape(id)}"]`
  );
  if (!contenedor) return;

  if (evidenciasAbiertas.has(id)) {
    evidenciasAbiertas.delete(id);
    contenedor.classList.add("hidden");
    contenedor.innerHTML = "";
    button.textContent = "Ver trabajo realizado";
    return;
  }

  evidenciasAbiertas.add(id);
  contenedor.classList.remove("hidden");
  contenedor.innerHTML =
    '<div class="evidencias-mision__cargando">Lía está preparando el trabajo realizado…</div>';
  button.textContent = "Ocultar trabajo realizado";

  try {
    const evidencias = await Academia.tareas.leerEvidencias(id);

    if (!evidencias.length) {
      contenedor.innerHTML =
        '<div class="evidencias-mision__vacia">Todavía no hay evidencias relacionadas con esta misión.</div>';
      return;
    }

    contenedor.innerHTML = evidencias.map((evidencia, indice) => {
      const intentos = Number(evidencia.resultado?.intentos || 0);
      const pistas = Number(evidencia.resultado?.pistas || 0);
      const nivel = evidencia.atributos?.nivel ?? "—";
      const titulo =
        evidencia.tituloActividad ||
        evidencia.actividadId ||
        `Actividad ${indice + 1}`;

      const parametros = new URLSearchParams({
        id: evidencia.actividadId || "",
        sesionId: evidencia.sesionId || ""
      });

      const destinoCorrecto =
        evidencia.modulo === "rincon-lectura"
          ? (
              `../rincon-lectura/?vista=historial` +
              `&misionId=${encodeURIComponent(id)}` +
              `&historiaId=${encodeURIComponent(evidencia.actividadId || "")}` +
              `&sesionId=${encodeURIComponent(evidencia.sesionId || "")}` +
              `&volver=${encodeURIComponent(
                `${window.location.pathname}${window.location.search}`
              )}`
            )
          : `../aventuras-matematicas/detectives/historia.html?${parametros.toString()}`;

      return `
        <article class="evidencia-item">
          <div class="evidencia-item__icono">✅</div>
          <div class="evidencia-item__contenido">
            <strong>${escapar(titulo)}</strong>
            <small>
              Nivel ${escapar(nivel)} · ${intentos} intentos · ${pistas} pistas
              · ${escapar(fechaEvidencia(evidencia.ocurridaEn))}
            </small>
          </div>
          <a class="btn secundaria evidencia-item__enlace"
             href="${escapar(destinoCorrecto)}">
            Ver resolución
          </a>
        </article>`;
    }).join("");
  } catch (error) {
    console.error("No se pudieron cargar las evidencias.", error);
    evidenciasAbiertas.delete(id);
    button.textContent = "Ver trabajo realizado";
    contenedor.innerHTML =
      '<div class="evidencias-mision__vacia">No fue posible cargar las evidencias. Revisa la conexión.</div>';
  }
}

async function normalizarOrdenMisiones() {
  const visibles = misionesOrdenables();

  await Promise.all(
    visibles.map((tarea, indice) =>
      Academia.tareas.actualizar(tarea.id, {
        ordenMision: indice + 1
      })
    )
  );
}

async function moverMision(id, direccion) {
  const visibles = misionesOrdenables();
  const indice = visibles.findIndex(tarea => tarea.id === id);

  if (indice === -1) return;

  const destino = direccion === "up" ? indice - 1 : indice + 1;

  if (destino < 0 || destino >= visibles.length) {
    return;
  }

  const actual = visibles[indice];
  const otra = visibles[destino];

  const ordenActual =
    ordenMision(actual) === 9999 ? indice + 1 : ordenMision(actual);

  const ordenOtra =
    ordenMision(otra) === 9999 ? destino + 1 : ordenMision(otra);

  await Promise.all([
    Academia.tareas.actualizar(actual.id, {
      ordenMision: ordenOtra
    }),
    Academia.tareas.actualizar(otra.id, {
      ordenMision: ordenActual
    })
  ]);
}


async function moverMisionAPosicion(id, posicionSolicitada) {
  const visibles = misionesOrdenables();
  const indiceActual = visibles.findIndex(tarea => tarea.id === id);
  const posicion = Math.max(
    1,
    Math.min(visibles.length, Number(posicionSolicitada) || 1)
  );
  const indiceDestino = posicion - 1;

  if (indiceActual < 0 || indiceActual === indiceDestino) return;

  const [movida] = visibles.splice(indiceActual, 1);
  visibles.splice(indiceDestino, 0, movida);

  await Promise.all(
    visibles.map((tarea, indice) =>
      Academia.tareas.actualizar(tarea.id, {
        ordenMision: indice + 1
      })
    )
  );
}

async function ejecutarAccion(button) {
  const { action, id, url } = button.dataset;
  const tarea = tareas.find(item => item.id === id);

  if (!tarea) return;

  try {
    button.disabled = true;

    if (action === "edit") {
      cargarTareaEnFormulario(tarea);
      return;
    }

    if (action === "visibility") {
      const nuevaVisibilidad = !esVisibleComoMision(tarea);

      await Academia.tareas.actualizar(id, {
        visibleParaAlumno: nuevaVisibilidad,
        ordenMision: nuevaVisibilidad
          ? misionesOrdenables().length + 1
          : ordenMision(tarea)
      });

      return;
    }

    if (action === "up" || action === "down") {
      await moverMision(id, action);
      return;
    }

    if (action === "move-position") {
      await moverMisionAPosicion(id, button.value);
      return;
    }

    if (action === "evidence") {
      await mostrarEvidenciasMision(id, button);
      return;
    }

    if (action === "review") {
      const destino = new URL(
        "../aventuras-matematicas/detectives/trabajo-realizado.html",
        window.location.href
      );

      destino.searchParams.set("misionId", id);
      destino.searchParams.set(
        "volver",
        `${window.location.pathname}${window.location.search}`
      );

      window.location.href = destino.href;
      return;
    }

    if (action === "start") {
      const destino = new URL(url, window.location.href);
      destino.searchParams.set("misionId", id);
      destino.searchParams.set(
        "volver",
        `${window.location.pathname}${window.location.search}`
      );

      if (
        tarea.modulo === "rincon-lectura" &&
        ["pendiente_validacion", "completada_pendiente_validacion", "completada"]
          .includes(tarea.estado)
      ) {
        destino.searchParams.set("vista", "historial");
      }

      // Gestión familiar solo consulta o revisa.
      // El cambio a en_curso ocurre únicamente cuando el alumno inicia
      // la misión desde Mi Camino.
      window.location.href = destino.href;
      return;
    }

    if (action === "complete") {
      const confirmado = confirm(
        "¿Confirmas que deseas cerrar esta misión?\n\n" +
        "La misión pasará al historial como conseguida. " +
        "Las evidencias de aprendizaje se conservarán."
      );

      if (!confirmado) {
        button.disabled = false;
        return;
      }

      const resultadoActual = resultadoTarea(tarea);

      await Academia.tareas.actualizar(id, {
        resultado: {
          ...resultadoActual,
          fechaFinalizacion:
            resultadoActual.fechaFinalizacion || fechaHoraLocalAhora()
        }
      });

      await Academia.tareas.cambiarEstado(id, "completada");
      alert("✅ Misión cerrada correctamente.");
      return;
    }

    if (action === "reopen") {
      await Academia.tareas.cambiarEstado(id, "en_curso", {
        "progreso.completadaEn": null
      });
      return;
    }

    if (action === "help") {
      await Academia.tareas.cambiarEstado(id, "necesita_ayuda");
      return;
    }

    if (action === "delete") {
      const estadoProtegido = [
        "pendiente_validacion",
        "completada_pendiente_validacion",
        "completada"
      ].includes(tarea.estado);

      if (estadoProtegido) {
        alert(
          "Esta misión ya fue terminada y forma parte del historial de aprendizaje. " +
          "No puede eliminarse."
        );
        button.disabled = false;
        return;
      }

      const cantidadActual = Number(tarea.progreso?.cantidadActual || 0);
      const tieneEvidencias =
        cantidadActual > 0 ||
        (Array.isArray(tarea.progreso?.evidenciaIds) &&
          tarea.progreso.evidenciaIds.length > 0);

      const mensaje = tieneEvidencias
        ? (
            `Esta misión tiene ${cantidadActual} ` +
            `${cantidadActual === 1 ? "actividad realizada" : "actividades realizadas"}.\n\n` +
            "La misión se eliminará, pero las evidencias de aprendizaje " +
            "y el historial de Detectives se conservarán.\n\n" +
            "¿Deseas continuar?"
          )
        : (
            "Esta misión todavía no tiene actividades realizadas.\n\n" +
            "¿Quieres eliminarla definitivamente?"
          );

      if (!confirm(mensaje)) {
        button.disabled = false;
        return;
      }

      await Academia.tareas.eliminar(id);
    }
  } catch (error) {
    console.error(error);
    alert(`No se pudo actualizar la tarea.\n${error.message}`);
    button.disabled = false;
  }
}

function seleccionarIcono(icono) {
  $("icono").value = icono;

  document.querySelectorAll("[data-icono]").forEach(button => {
    button.classList.toggle("active", button.dataset.icono === icono);
  });

  actualizarVistaPrevia();
}

function actualizarEstadoMision() {
  const visible = $("visibleParaAlumno").checked;

  $("camposMision").classList.toggle("hidden", !visible);
  $("avisoMisionOculta").classList.toggle("hidden", visible);

  $("tituloMision").required = false;
  $("descripcionMision").required = visible;
}

function actualizarVistaPrevia() {
  const icono = $("icono").value.trim() || "🌟";
  const titulo = $("titulo").value.trim() || "Nueva misión";
  const descripcion =
    $("descripcionMision").value.trim() ||
    $("descripcion").value.trim() ||
    "Lía tiene una nueva aventura esperando para ti.";
  const mensaje = $("mensajeMision").value.trim();

  $("previewIcono").textContent = icono;
  $("previewTitulo").textContent = titulo;
  $("previewDescripcion").textContent = descripcion;
  $("previewMensaje").textContent = mensaje;
  $("previewMensaje").classList.toggle("hidden", !mensaje);

  document.querySelectorAll("[data-icono]").forEach(button => {
    button.classList.toggle("active", button.dataset.icono === icono);
  });
}

function cambiarVista(tab) {
  document.querySelectorAll("[data-tab]").forEach(item => {
    item.classList.toggle("active", item.dataset.tab === tab);
  });

  $("panelLista").classList.toggle("hidden", tab !== "lista");
  $("panelCrear").classList.toggle("hidden", tab !== "crear");
}

function configurarTabs() {
  document.querySelectorAll("[data-tab]").forEach(button => {
    button.onclick = () => cambiarVista(button.dataset.tab);
  });

  const vista = new URLSearchParams(window.location.search).get("vista");
  if (vista === "crear") cambiarVista("crear");
}

function configurarFiltros() {
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.onclick = () => {
      filtroActual = button.dataset.filter;

      document.querySelectorAll("[data-filter]").forEach(item => {
        item.classList.toggle("active", item === button);
      });

      renderTareas();
    };
  });
}

function configurarAcordeones() {
  const acordeones = [...document.querySelectorAll("[data-acordeon]")];

  acordeones.forEach(acordeon => {
    acordeon.addEventListener("toggle", () => {
      const abiertos = acordeones
        .filter(item => item.open)
        .map(item => item.dataset.acordeon);

      sessionStorage.setItem(
        "academia.misTareas.acordeones",
        JSON.stringify(abiertos)
      );
    });
  });
}

function establecerAcordeones(modo = "crear") {
  const acordeones = [...document.querySelectorAll("[data-acordeon]")];

  if (modo === "editar") {
    acordeones.forEach(item => {
      item.open = false;
    });
    return;
  }

  const guardados = sessionStorage.getItem(
    "academia.misTareas.acordeones"
  );

  if (guardados) {
    try {
      const abiertos = new Set(JSON.parse(guardados));

      acordeones.forEach(item => {
        item.open = abiertos.has(item.dataset.acordeon);
      });

      return;
    } catch {
      // Usa el estado inicial.
    }
  }

  acordeones.forEach(item => {
    item.open = ["informacion", "mision"].includes(
      item.dataset.acordeon
    );
  });
}

function actualizarBloqueResultado(estado = "pendiente") {
  const completada = estado === "completada";
  const tieneDatos = Boolean(
    $("fechaFinalizacion").value ||
    $("observacionesResultado").value.trim() ||
    $("resultadoMasEsperado").checked ||
    $("resultadoNecesitoAyuda").checked ||
    $("resultadoConvieneRepetir").checked
  );

  $("tituloBloqueResultado").textContent = completada
    ? "Resultado de la tarea"
    : "Cuando termine la tarea";

  $("subtituloBloqueResultado").textContent = completada
    ? "Guarda brevemente qué ocurrió y qué conviene recordar."
    : "Aquí podrás guardar brevemente qué ocurrió.";

  $("estadoBloqueResultado").textContent = tieneDatos
    ? "Registrado"
    : "Opcional";

  document
    .querySelector('[data-acordeon="resultado"]')
    ?.classList.toggle("resultado-registrado", tieneDatos);
}



const textosAutomaticosDetectives = {
  titulo: "",
  descripcionMision: "",
  criterio: ""
};



const textosAutomaticosLectura = {
  descripcionMision: "",
  criterio: ""
};

function normalizarCantidadLecturas(valor, valorPredeterminado = 2) {
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return valorPredeterminado;
  return Math.min(50, Math.max(1, Math.trunc(numero)));
}

function normalizarNivelLectura(valor) {
  const texto = String(valor ?? "todos");
  return ["1", "2", "3"].includes(texto) ? Number(texto) : null;
}

function crearTextosLectura(cantidad, nivel) {
  const unidad = cantidad === 1 ? "historia" : "historias";
  const nivelTexto = nivel ? ` de nivel ${nivel}` : "";

  return {
    titulo:
      `Leer ${cantidad} ${unidad} de Mi Rincón de Lectura${nivelTexto}`,
    descripcionMision:
      `Lee ${cantidad} ${unidad} en Mi Rincón de Lectura${nivelTexto}. ` +
      "Cada aventura guardada desde esta misión contará para tu progreso.",
    criterio:
      `Guardar ${cantidad} ${cantidad === 1 ? "lectura" : "lecturas"}` +
      `${nivelTexto}.`
  };
}

function aplicarTextosAutomaticosLectura({ forzar = false } = {}) {
  if ($("modulo").value !== "rincon-lectura") return;

  const cantidad = normalizarCantidadLecturas(
    $("cantidadLecturas").value,
    2
  );
  const nivel = normalizarNivelLectura($("nivelLectura").value);
  const siguientes = crearTextosLectura(cantidad, nivel);

  $("titulo").value = siguientes.titulo;
  $("tituloMision").value = siguientes.titulo;

  [
    ["descripcionMision", "descripcionMision"],
    ["criterio", "criterio"]
  ].forEach(([id, clave]) => {
    const actual = $(id).value.trim();
    const anterior = textosAutomaticosLectura[clave];

    if (forzar || !actual || !anterior || actual === anterior) {
      $(id).value = siguientes[clave];
    }
  });

  Object.assign(textosAutomaticosLectura, siguientes);
  actualizarResumenCriterioLectura();
  actualizarVistaPrevia();
}

function reiniciarTextosAutomaticosLectura() {
  Object.keys(textosAutomaticosLectura).forEach(
    clave => textosAutomaticosLectura[clave] = ""
  );
}

function actualizarResumenCriterioLectura() {
  const resumen = $("resumenCriterioLectura");
  if (!resumen) return;

  const cantidad = normalizarCantidadLecturas(
    $("cantidadLecturas")?.value,
    2
  );
  const nivel = normalizarNivelLectura($("nivelLectura")?.value);

  resumen.textContent =
    `${cantidad} ${cantidad === 1 ? "lectura" : "lecturas"} ` +
    `${nivel ? `de nivel ${nivel}` : "de cualquier nivel"}`;
}

async function cargarCatalogoSemillas() {
  try {
    const response = await fetch("../creciendo-por-dentro/semillas.json", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("No se pudo cargar semillas.json.");
    }

    const data = await response.json();
    catalogoSemillas = Array.isArray(data.semillas)
      ? data.semillas.filter(item => item.activo !== false)
      : [];
  } catch (error) {
    console.warn("No se pudo cargar el catálogo de Semillas.", error);
    catalogoSemillas = [];
  }

  poblarSelectoresSemillas();
}

function poblarSelectoresSemillas() {
  ["semillaPrimera", "semillaSegunda"].forEach(id => {
    const select = $(id);
    if (!select) return;

    const valorActual = select.value;
    select.innerHTML = `
      <option value="">🌈 Cualquier Semilla</option>
      ${catalogoSemillas.map(item => `
        <option value="${escapar(item.id)}">
          ${escapar(item.portada?.icono || "🌱")} ${escapar(item.titulo)}
        </option>
      `).join("")}
    `;

    if ([...select.options].some(option => option.value === valorActual)) {
      select.value = valorActual;
    }
  });
}

function normalizarCantidadSemillas(valor, valorPredeterminado = 1) {
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return valorPredeterminado;
  return Math.min(20, Math.max(1, Math.trunc(numero)));
}

function semillasSeleccionadas() {
  return [
    $("semillaPrimera")?.value,
    $("semillaSegunda")?.value
  ].filter(Boolean).filter((value, index, values) =>
    values.indexOf(value) === index
  );
}

function tituloSemillaPorId(id) {
  return catalogoSemillas.find(item => item.id === id)?.titulo || "";
}

function crearTextosSemillas(cantidad, ids = []) {
  const unidad = cantidad === 1 ? "Semilla" : "Semillas";
  const titulos = ids.map(tituloSemillaPorId).filter(Boolean);

  if (cantidad === 1 && titulos.length === 1) {
    return {
      titulo: titulos[0],
      descripcionMision:
        `Completa la Semilla “${titulos[0]}” de Creciendo por Dentro. ` +
        `Lía te acompañará paso a paso.`,
      criterio: `Completar la Semilla “${titulos[0]}”.`
    };
  }

  const seleccion =
    titulos.length
      ? `: ${titulos.join(" y ")}`
      : " que prefieras";

  return {
    titulo: `Completar ${cantidad} ${unidad} de Creciendo por Dentro`,
    descripcionMision:
      `Completa ${cantidad} ${unidad.toLowerCase()} de Creciendo por Dentro${seleccion}.`,
    criterio:
      `Completar ${cantidad} ${unidad.toLowerCase()} de Creciendo por Dentro${seleccion}.`
  };
}

function aplicarTextosAutomaticosSemillas({ forzar = false } = {}) {
  if ($("modulo").value !== "creciendo-por-dentro") return;

  const cantidad = normalizarCantidadSemillas(
    $("cantidadSemillas")?.value,
    1
  );
  const textos = crearTextosSemillas(cantidad, semillasSeleccionadas());

  $("titulo").value = textos.titulo;
  $("tituloMision").value = textos.titulo;

  if (forzar || !$("descripcionMision").value.trim()) {
    $("descripcionMision").value = textos.descripcionMision;
  }

  if (forzar || !$("criterio").value.trim()) {
    $("criterio").value = textos.criterio;
  }

  actualizarVistaPrevia();
}

function actualizarResumenCriterioSemillas() {
  const resumen = $("resumenCriterioSemillas");
  if (!resumen) return;

  const cantidad = normalizarCantidadSemillas(
    $("cantidadSemillas")?.value,
    1
  );
  const ids = semillasSeleccionadas();
  const titulos = ids.map(tituloSemillaPorId).filter(Boolean);

  resumen.textContent =
    `${cantidad} ${cantidad === 1 ? "Semilla" : "Semillas"} ` +
    (
      titulos.length
        ? `seleccionada${titulos.length === 1 ? "" : "s"}: ${titulos.join(" y ")}`
        : "de libre elección"
    );
}

function tituloAutomaticoPorModulo() {
  const modulo = $("modulo").value;

  if (modulo === "creciendo-por-dentro") {
    return crearTextosSemillas(
      normalizarCantidadSemillas($("cantidadSemillas")?.value, 1),
      semillasSeleccionadas()
    ).titulo;
  }

  if (modulo === "detectives") {
    const cantidad = normalizarCantidadHistorias(
      $("cantidadHistorias").value,
      5
    );
    const nivel = normalizarNivelDetectives(
      $("nivelDetectives").value,
      1
    );
    const unidad = cantidad === 1 ? "historia" : "historias";
    return `Resolver ${cantidad} ${unidad} de Detectives de nivel ${nivel}`;
  }

  return {
    "rincon-lectura": crearTextosLectura(
      normalizarCantidadLecturas($("cantidadLecturas")?.value, 2),
      normalizarNivelLectura($("nivelLectura")?.value)
    ).titulo,
    biblioteca: "Misión de Biblioteca Encantada",
    libre: "Misión fuera de la Academia"
  }[modulo] || "Nueva misión";
}

function actualizarTituloAutomatico() {
  const titulo = tituloAutomaticoPorModulo();
  $("titulo").value = titulo;
  $("tituloMision").value = titulo;
  actualizarVistaPrevia();
}

function crearTextosDetectives(cantidad, nivel) {
  const unidad = cantidad === 1 ? "historia" : "historias";
  return {
    titulo: `Resolver ${cantidad} ${unidad} de Detectives de nivel ${nivel}`,
    descripcionMision:
      `Resuelve ${cantidad} ${unidad} de Detectives de nivel ${nivel}. ` +
      `Cada historia completada desde esta misión contará para tu progreso.`,
    criterio: `Completar ${cantidad} ${unidad} de Detectives de nivel ${nivel}.`
  };
}

function puedeActualizarTextoAutomatico(id, clave) {
  const actual = $(id).value.trim();
  const anterior = textosAutomaticosDetectives[clave];
  return !actual || !anterior || actual === anterior;
}

function aplicarTextosAutomaticosDetectives({ forzar = false } = {}) {
  if ($("modulo").value !== "detectives") return;
  const cantidad = normalizarCantidadHistorias($("cantidadHistorias").value, 5);
  const nivel = normalizarNivelDetectives($("nivelDetectives").value, 1);
  const siguientes = crearTextosDetectives(cantidad, nivel);

  $("titulo").value = siguientes.titulo;
  $("tituloMision").value = siguientes.titulo;

  [
    ["descripcionMision", "descripcionMision"],
    ["criterio", "criterio"]
  ].forEach(([id, clave]) => {
    if (forzar || puedeActualizarTextoAutomatico(id, clave)) {
      $(id).value = siguientes[clave];
    }
  });

  Object.assign(textosAutomaticosDetectives, siguientes);
  actualizarVistaPrevia();
}

function reiniciarTextosAutomaticosDetectives() {
  Object.keys(textosAutomaticosDetectives).forEach(
    clave => textosAutomaticosDetectives[clave] = ""
  );
}

function criterioCumplimientoTarea(tarea = {}) {
  return tarea.criterioCumplimiento &&
    typeof tarea.criterioCumplimiento === "object"
      ? tarea.criterioCumplimiento
      : {};
}

function normalizarCantidadHistorias(valor, valorPredeterminado = 5) {
  const numero = Number(valor);

  if (!Number.isFinite(numero)) return valorPredeterminado;

  return Math.min(50, Math.max(1, Math.trunc(numero)));
}

function normalizarNivelDetectives(valor, valorPredeterminado = 1) {
  const numero = Number(valor);
  return [1, 2, 3].includes(numero) ? numero : valorPredeterminado;
}

function actualizarResumenCriterioDetectives() {
  const cantidad = normalizarCantidadHistorias(
    $("cantidadHistorias")?.value,
    5
  );
  const nivel = normalizarNivelDetectives(
    $("nivelDetectives")?.value,
    1
  );

  const resumen = $("resumenCriterioDetectives");

  if (resumen) {
    resumen.textContent =
      `${cantidad} ${cantidad === 1 ? "historia" : "historias"} ` +
      `de Detectives de nivel ${nivel}`;
  }
}

function actualizarConfiguracionPorModulo({
  completarSugerencias = false
} = {}) {
  const modulo = $("modulo").value;
  const esDetectives = modulo === "detectives";
  const esLectura = modulo === "rincon-lectura";
  const esSemillas = modulo === "creciendo-por-dentro";

  $("configuracionDetectives")?.classList.toggle("hidden", !esDetectives);
  $("configuracionLectura")?.classList.toggle("hidden", !esLectura);
  $("configuracionSemillas")?.classList.toggle("hidden", !esSemillas);

  if (esSemillas) {
    reiniciarTextosAutomaticosDetectives();
    reiniciarTextosAutomaticosLectura();
    actualizarResumenCriterioSemillas();
    if (completarSugerencias) {
      aplicarTextosAutomaticosSemillas({ forzar: true });
    }
    return;
  }

  if (esDetectives) {
    reiniciarTextosAutomaticosLectura();
    actualizarResumenCriterioDetectives();
    if (completarSugerencias) aplicarTextosAutomaticosDetectives();
    return;
  }

  if (esLectura) {
    reiniciarTextosAutomaticosDetectives();
  reiniciarTextosAutomaticosLectura();
    actualizarResumenCriterioLectura();
    if (completarSugerencias) aplicarTextosAutomaticosLectura();
    return;
  }

  reiniciarTextosAutomaticosDetectives();
  reiniciarTextosAutomaticosLectura();
  actualizarTituloAutomatico();
}


function fechaLocalISO(desplazamientoDias = 0) {
  const fecha = new Date();
  fecha.setHours(12, 0, 0, 0);
  fecha.setDate(fecha.getDate() + desplazamientoDias);

  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

function limpiarFormulario({ conservarMensaje = false } = {}) {
  reiniciarTextosAutomaticosDetectives();
  $("formTarea").reset();
  $("tareaId").value = "";
  $("visibleParaAlumno").checked = true;
  $("icono").value = "📖";
  $("tituloMision").value = "";
  $("descripcionMision").value =
    "Realiza esta aventura con calma y celebra cada pequeño paso.";
  $("mensajeMision").value = "";
  $("cantidadHistorias").value = "5";
  $("cantidadSemillas").value = "1";
  $("semillaPrimera").value = "";
  $("semillaSegunda").value = "";
  $("cantidadLecturas").value = "2";
  $("nivelLectura").value = "todos";
  $("nivelDetectives").value = "1";
  $("fechaInicio").value = fechaLocalISO(0);
  $("fechaLimite").value = fechaLocalISO(1);
  $("fechaFinalizacion").value = "";
  $("observacionesResultado").value = "";
  $("resultadoMasEsperado").checked = false;
  $("resultadoNecesitoAyuda").checked = false;
  $("resultadoConvieneRepetir").checked = false;

  $("tituloFormulario").innerHTML =
    `Preparando una tarea para <span data-alumno-nombre>el alumno</span>`;
  $("subtituloFormulario").textContent =
    "Completa solo la información que realmente resulte útil.";
  $("guardarTarea").textContent = "💾 Guardar tarea";
  $("cancelarEdicion").classList.add("hidden");
  $("formTarea").classList.remove("modo-edicion");

  if (!conservarMensaje) {
    $("mensajeFormulario").textContent = "";
    $("mensajeFormulario").className = "mensaje-formulario";
  }

  seleccionarIcono("📖");
  actualizarEstadoMision();
  actualizarConfiguracionPorModulo({ completarSugerencias: true });
  actualizarResumenCriterioDetectives();
  actualizarResumenCriterioSemillas();
  actualizarTituloAutomatico();
  actualizarBloqueResultado("pendiente");
  establecerAcordeones("crear");
}

function cargarTareaEnFormulario(tarea) {
  const presentacion = tarea.presentacionAlumno || {};

  $("tareaId").value = tarea.id;
  $("titulo").value = tarea.titulo || "";
  $("descripcion").value = tarea.descripcion || "";
  $("tipo").value = tarea.tipo || "actividad_modulo";
  $("modulo").value = tarea.modulo || "libre";
  $("fechaInicio").value = tarea.fechaInicio || "";
  $("fechaLimite").value = tarea.fechaLimite || "";
  $("tiempoEstimado").value = Number(tarea.tiempoEstimadoMinutos || 0);
  $("prioridad").value = tarea.prioridad || "normal";
  $("objetivo").value = tarea.objetivo || "";
  $("criterio").value = tarea.criterioFinalizacion || "";

  const criterioCumplimiento = criterioCumplimientoTarea(tarea);
  $("cantidadHistorias").value = String(
    normalizarCantidadHistorias(
      criterioCumplimiento.cantidadObjetivo ??
        tarea.progreso?.cantidadObjetivo,
      5
    )
  );
  $("nivelDetectives").value = String(
    normalizarNivelDetectives(
      criterioCumplimiento.filtros?.nivel,
      1
    )
  );
  $("cantidadLecturas").value = String(
    normalizarCantidadLecturas(
      criterioCumplimiento.cantidadObjetivo ??
        tarea.progreso?.cantidadObjetivo,
      2
    )
  );
  $("nivelLectura").value =
    tarea.modulo === "rincon-lectura" &&
    criterioCumplimiento.filtros?.nivel
      ? String(criterioCumplimiento.filtros.nivel)
      : "todos";
  $("cantidadSemillas").value = String(
    normalizarCantidadSemillas(
      criterioCumplimiento.cantidadObjetivo ??
        tarea.progreso?.cantidadObjetivo,
      1
    )
  );
  const semillasIds = Array.isArray(
    criterioCumplimiento.filtros?.semillasIds
  )
    ? criterioCumplimiento.filtros.semillasIds.map(String)
    : [];
  $("semillaPrimera").value = semillasIds[0] || "";
  $("semillaSegunda").value = semillasIds[1] || "";
  $("observacion").value = tarea.observacionActual || "";

  $("visibleParaAlumno").checked = esVisibleComoMision(tarea);
  $("tituloMision").value = tarea.titulo || "";
  $("descripcionMision").value =
    presentacion.descripcionMision ||
    tarea.descripcion ||
    "Realiza esta aventura con calma.";
  $("mensajeMision").value = presentacion.mensaje || "";

  const resultado = resultadoTarea(tarea);
  $("fechaFinalizacion").value = resultado.fechaFinalizacion || "";
  $("observacionesResultado").value = resultado.observaciones || "";
  $("resultadoMasEsperado").checked = Boolean(resultado.masDeLoEsperado);
  $("resultadoNecesitoAyuda").checked = Boolean(resultado.necesitoAyuda);
  $("resultadoConvieneRepetir").checked = Boolean(resultado.convieneRepetir);

  seleccionarIcono(
    presentacion.icono || ICONOS[tarea.modulo] || "🌟"
  );

  $("tituloFormulario").textContent = "Editar tarea";
  $("subtituloFormulario").textContent =
    "Abre únicamente el bloque que necesites actualizar.";
  $("guardarTarea").textContent = "💾 Guardar cambios";
  $("cancelarEdicion").classList.remove("hidden");
  $("formTarea").classList.add("modo-edicion");

  actualizarEstadoMision();
  actualizarConfiguracionPorModulo();
  actualizarResumenCriterioDetectives();
  actualizarResumenCriterioSemillas();
  actualizarVistaPrevia();
  actualizarBloqueResultado(tarea.estado);
  establecerAcordeones("editar");
  cambiarVista("crear");

  window.scrollTo({
    top: $("panelCrear").offsetTop - 20,
    behavior: "smooth"
  });
}

function recogerFormulario() {
  const modulo = $("modulo").value;
  const visible = $("visibleParaAlumno").checked;
  const esDetectives = modulo === "detectives";
  const esLectura = modulo === "rincon-lectura";
  const esSemillas = modulo === "creciendo-por-dentro";

  const cantidadObjetivo = esDetectives
    ? normalizarCantidadHistorias($("cantidadHistorias").value, 5)
    : 0;

  const nivelDetectives = esDetectives
    ? normalizarNivelDetectives($("nivelDetectives").value, 1)
    : null;

  const cantidadLecturas = esLectura
    ? normalizarCantidadLecturas($("cantidadLecturas").value, 2)
    : 0;

  const nivelLectura = esLectura
    ? normalizarNivelLectura($("nivelLectura").value)
    : null;

  const cantidadSemillas = esSemillas
    ? normalizarCantidadSemillas($("cantidadSemillas").value, 1)
    : 0;

  const semillasIds = esSemillas
    ? semillasSeleccionadas().slice(0, cantidadSemillas)
    : [];

  return {
    titulo: $("titulo").value,
    descripcion: $("descripcion").value,
    tipo: $("tipo").value,
    modulo,
    destinoUrl: DESTINOS[modulo] || "",
    objetivo: $("objetivo").value,
    criterioFinalizacion: $("criterio").value,
    criterioCumplimiento: esDetectives
      ? {
          tipo: "cantidad",
          modulo: "detectives",
          evidenciaTipo: "historia_resuelta",
          cantidadObjetivo,
          filtros: {
            nivel: nivelDetectives
          }
        }
      : esLectura
        ? {
            tipo: "cantidad",
            modulo: "rincon-lectura",
            evidenciaTipo: "lectura_completada",
            cantidadObjetivo: cantidadLecturas,
            filtros: nivelLectura
              ? { nivel: nivelLectura }
              : {}
          }
        : esSemillas
          ? {
              tipo: "cantidad",
              modulo: "creciendo-por-dentro",
              evidenciaTipo: "semilla_completada",
              cantidadObjetivo: cantidadSemillas,
              filtros: semillasIds.length
                ? { semillasIds }
                : {}
            }
          : null,
    requiereRevision: true,
    fechaInicio: $("fechaInicio").value,
    fechaLimite: $("fechaLimite").value,
    tiempoEstimadoMinutos: $("tiempoEstimado").value,
    prioridad: $("prioridad").value,
    visibleParaAlumno: visible,
    ordenMision: visible
      ? (
          $("tareaId").value.trim()
            ? ordenMision(
                tareas.find(item => item.id === $("tareaId").value.trim())
              )
            : misionesOrdenables().length + 1
        )
      : 9999,
    presentacionAlumno: {
      icono: $("icono").value,
      tituloMision: visible ? $("titulo").value.trim() : "",
      descripcionMision: visible ? $("descripcionMision").value : "",
      mensaje: visible ? $("mensajeMision").value : ""
    },
    progreso: esDetectives
      ? {
          cantidadObjetivo
        }
      : esLectura
        ? {
            cantidadObjetivo: cantidadLecturas
          }
        : esSemillas
          ? {
              cantidadObjetivo: cantidadSemillas
            }
          : undefined,
    observacionActual: $("observacion").value,
    resultado: {
      fechaFinalizacion: $("fechaFinalizacion").value,
      observaciones: $("observacionesResultado").value,
      masDeLoEsperado: $("resultadoMasEsperado").checked,
      necesitoAyuda: $("resultadoNecesitoAyuda").checked,
      convieneRepetir: $("resultadoConvieneRepetir").checked
    }
  };
}

function configurarFormulario() {
  document.querySelectorAll("[data-icono]").forEach(button => {
    button.onclick = () => seleccionarIcono(button.dataset.icono);
  });

  [
    "icono",
    "titulo",
    "descripcionMision",
    "mensajeMision",
    "descripcion"
  ].forEach(id => {
    $(id).addEventListener("input", actualizarVistaPrevia);
  });

  $("visibleParaAlumno").addEventListener("change", () => {
    actualizarEstadoMision();
    actualizarVistaPrevia();
  });

  [
    "fechaFinalizacion",
    "observacionesResultado",
    "resultadoMasEsperado",
    "resultadoNecesitoAyuda",
    "resultadoConvieneRepetir"
  ].forEach(id => {
    $(id).addEventListener("input", () => {
      const tarea = tareas.find(
        item => item.id === $("tareaId").value.trim()
      );

      actualizarBloqueResultado(tarea?.estado || "pendiente");
    });

    $(id).addEventListener("change", () => {
      const tarea = tareas.find(
        item => item.id === $("tareaId").value.trim()
      );

      actualizarBloqueResultado(tarea?.estado || "pendiente");
    });
  });

  $("modulo").addEventListener("change", () => {
    const modulo = $("modulo").value;
    seleccionarIcono(ICONOS[modulo] || "🌟");
    actualizarConfiguracionPorModulo({
      completarSugerencias:
        modulo === "detectives" ||
        modulo === "rincon-lectura" ||
        modulo === "creciendo-por-dentro"
    });
  });

  ["cantidadHistorias", "nivelDetectives"].forEach(id => {
    $(id).addEventListener("input", () => {
      actualizarResumenCriterioDetectives();

      if ($("modulo").value === "detectives") {
        aplicarTextosAutomaticosDetectives();
      }
    });

    $(id).addEventListener("change", () => {
      actualizarResumenCriterioDetectives();

      if ($("modulo").value === "detectives") {
        aplicarTextosAutomaticosDetectives();
      }
    });
  });

  ["cantidadSemillas", "semillaPrimera", "semillaSegunda"].forEach(id => {
    $(id)?.addEventListener("input", () => {
      actualizarResumenCriterioSemillas();

      if ($("modulo").value === "creciendo-por-dentro") {
        aplicarTextosAutomaticosSemillas({ forzar: true });
      }
    });

    $(id)?.addEventListener("change", () => {
      actualizarResumenCriterioSemillas();

      if ($("modulo").value === "creciendo-por-dentro") {
        aplicarTextosAutomaticosSemillas({ forzar: true });
      }
    });
  });

  ["cantidadLecturas", "nivelLectura"].forEach(id => {
    $(id).addEventListener("input", () => {
      actualizarResumenCriterioLectura();

      if ($("modulo").value === "rincon-lectura") {
        aplicarTextosAutomaticosLectura();
      }
    });

    $(id).addEventListener("change", () => {
      actualizarResumenCriterioLectura();

      if ($("modulo").value === "rincon-lectura") {
        aplicarTextosAutomaticosLectura();
      }
    });
  });

  $("cancelarEdicion").onclick = () => {
    limpiarFormulario();
    cambiarVista("lista");
  };

  $("formTarea").addEventListener("reset", event => {
    event.preventDefault();
    limpiarFormulario();
  });

  $("formTarea").addEventListener("submit", async event => {
    event.preventDefault();

    const mensaje = $("mensajeFormulario");
    const id = $("tareaId").value.trim();
    const datos = recogerFormulario();

    if (
      datos.modulo === "detectives" &&
      (!datos.criterioCumplimiento ||
        datos.criterioCumplimiento.cantidadObjetivo < 1)
    ) {
      $("mensajeFormulario").className = "mensaje-formulario error";
      $("mensajeFormulario").textContent =
        "Indica una cantidad válida de historias para la misión.";
      $("cantidadHistorias").focus();
      return;
    }

    if (
      datos.modulo === "creciendo-por-dentro" &&
      (!datos.criterioCumplimiento ||
        datos.criterioCumplimiento.cantidadObjetivo < 1)
    ) {
      $("mensajeFormulario").className = "mensaje-formulario error";
      $("mensajeFormulario").textContent =
        "Indica una cantidad válida de Semillas para la misión.";
      $("cantidadSemillas").focus();
      return;
    }

    if (
      datos.modulo === "rincon-lectura" &&
      (!datos.criterioCumplimiento ||
        datos.criterioCumplimiento.cantidadObjetivo < 1)
    ) {
      $("mensajeFormulario").className = "mensaje-formulario error";
      $("mensajeFormulario").textContent =
        "Indica una cantidad válida de lecturas para la misión.";
      $("cantidadLecturas").focus();
      return;
    }

    try {
      mensaje.className = "mensaje-formulario";
      mensaje.textContent = id
        ? "Guardando cambios..."
        : "Guardando tarea...";

      if (id) {
        await Academia.tareas.actualizar(id, datos);
      } else {
        await Academia.tareas.crear({
          ...datos,
          estado: "pendiente"
        });
      }

      mensaje.classList.add("ok");
      mensaje.textContent = datos.visibleParaAlumno
        ? "✨ Tarea guardada y disponible como misión en Mi Camino."
        : "✅ Tarea guardada solo para seguimiento adulto.";

      limpiarFormulario({ conservarMensaje: true });

      window.setTimeout(() => cambiarVista("lista"), 850);
    } catch (error) {
      console.error(error);
      mensaje.classList.add("error");
      mensaje.textContent =
        `No se pudo guardar la tarea: ${error.message}`;
    }
  });
}

protegerPagina({
  loginUrl: "../../login.html",

  onAuthenticated: async () => {
    await iniciarPanelUsuario({
      contenedor: "[data-panel-usuario]",
      loginUrl: "../../login.html",
      mostrarEspacio: true,
      mostrarDescubreAcademia: true,
      mostrarCamino: true,
      mostrarConfiguracion: true,
      mostrarLogros: true
    });

    const perfil = await obtenerPerfil();
    aplicarNombreAlumno(perfil);

    await cargarCatalogoSemillas();

    configurarTabs();
    configurarFiltros();
    configurarFormulario();
    configurarAcordeones();
    limpiarFormulario();
    aplicarNombreAlumno(perfil);

    detenerObservacion = Academia.tareas.observar(
      async nuevasTareas => {
        tareas = nuevasTareas;
        renderTareas();

        const requiereNormalizar = misionesOrdenables().some(
          tarea => ordenMision(tarea) === 9999
        );

        if (requiereNormalizar) {
          try {
            await normalizarOrdenMisiones();
          } catch (error) {
            console.warn("No se pudo normalizar el orden de misiones.", error);
          }
        }
      },
      error => {
        console.error(error);
        $("estadoTareas").textContent =
          `No se pudieron cargar las tareas: ${error.message}`;
      }
    );
  }
});

window.addEventListener("beforeunload", () => {
  detenerObservacion?.();
});
