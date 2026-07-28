import { protegerPagina } from "../../compartido/js/auth-guard.js";
import { iniciarPanelUsuario } from "../../compartido/js/panel-usuario.js";
import { Academia } from "../../compartido/api/academia.js";

const $ = (id) => document.getElementById(id);

const DESTINOS = Object.freeze({
  "rincon-lectura": "../rincon-lectura/",
  detectives: "../aventuras-matematicas/detectives/",
  biblioteca: "../biblioteca/",
  libre: ""
});

const ICONOS = Object.freeze({
  "rincon-lectura": "📖",
  detectives: "🧩",
  biblioteca: "📚",
  libre: "✏️"
});

let tareas = [];
let filtroActual = "activas";
let detenerObservacion = null;

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

function textoEstado(estado) {
  return {
    pendiente: "🌱 Preparada",
    en_curso: "▶️ En aventura",
    completada_pendiente_validacion: "✨ Por validar",
    completada: "✅ Conseguida",
    necesita_ayuda: "🤝 Necesita ayuda",
    vencida: "🌿 Retomable",
    cancelada: "Cancelada"
  }[estado] || estado;
}

function esVisibleComoMision(tarea = {}) {
  return tarea.visibleParaAlumno !== false;
}

function tareasFiltradas() {
  if (filtroActual === "todas") return tareas;

  if (filtroActual === "completadas") {
    return tareas.filter(tarea =>
      ["completada", "completada_pendiente_validacion"].includes(tarea.estado)
    );
  }

  return tareas.filter(tarea =>
    !["completada", "cancelada"].includes(tarea.estado)
  );
}

function renderTareas() {
  const lista = $("listaTareas");
  const estado = $("estadoTareas");
  const filtradas = tareasFiltradas();

  if (!filtradas.length) {
    estado.classList.remove("hidden");
    estado.textContent =
      filtroActual === "activas"
        ? "No hay tareas activas. Puedes preparar una nueva ✨"
        : "No hay tareas en este filtro.";
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
      <article class="superficie tarea-card">
        <div class="tarea-card__cabecera">
          <div>
            <div class="tarea-icono">${escapar(icono)}</div>
            <h3>${escapar(tarea.titulo || "Tarea")}</h3>
            <p>${escapar(tarea.descripcion || "")}</p>
          </div>

          <span class="tarea-estado estado-${escapar(tarea.estado)}">
            ${escapar(textoEstado(tarea.estado))}
          </span>
        </div>

        <div class="tarea-meta">
          <span>📅 ${escapar(formatearFecha(tarea.fechaLimite))}</span>
          <span>⏱️ ${Number(tarea.tiempoEstimadoMinutos || 0)} min</span>
          <span>🧭 ${escapar(tarea.modulo || "libre")}</span>
          <span class="tarea-visibilidad ${visible ? "visible" : "oculta"}">
            ${visible ? "🌈 Visible como misión" : "🔒 Solo seguimiento adulto"}
          </span>
        </div>

        ${
          visible
            ? `<div class="vista-previa-mision" style="margin-top:14px">
                 <span>${escapar(icono)}</span>
                 <div>
                   <strong>${escapar(presentacion.tituloMision || tarea.titulo || "Misión")}</strong>
                   <p>${escapar(
                     presentacion.descripcionMision ||
                     tarea.descripcion ||
                     "Lía tiene una nueva aventura esperando para ti."
                   )}</p>
                 </div>
               </div>`
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
            ${visible ? "🔒 Ocultar misión" : "🌈 Mostrar como misión"}
          </button>

          ${
            destino && tarea.estado !== "completada"
              ? `<button class="btn accion-iniciar"
                    data-action="start"
                    data-id="${escapar(tarea.id)}"
                    data-url="${escapar(destino)}">
                   ▶️ Abrir actividad
                 </button>`
              : ""
          }

          ${
            !["completada", "cancelada"].includes(tarea.estado)
              ? `<button class="btn accion-completar"
                    data-action="complete"
                    data-id="${escapar(tarea.id)}">
                   ✅ Marcar completada
                 </button>`
              : ""
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

          <button class="btn accion-eliminar"
                  data-action="delete"
                  data-id="${escapar(tarea.id)}">
            🗑️ Eliminar
          </button>
        </div>
      </article>
    `;
  }).join("");

  lista.querySelectorAll("[data-action]").forEach(button => {
    button.onclick = () => ejecutarAccion(button);
  });
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
      await Academia.tareas.actualizar(id, {
        visibleParaAlumno: !esVisibleComoMision(tarea)
      });
      return;
    }

    if (action === "start") {
      await Academia.tareas.cambiarEstado(id, "en_curso");
      window.location.href = url;
      return;
    }

    if (action === "complete") {
      await Academia.tareas.cambiarEstado(id, "completada");
      return;
    }

    if (action === "help") {
      await Academia.tareas.cambiarEstado(id, "necesita_ayuda");
      return;
    }

    if (action === "delete") {
      const confirmado = confirm(
        "¿Quieres eliminar esta tarea? Esta acción no se puede deshacer."
      );

      if (!confirmado) {
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

  $("tituloMision").required = visible;
  $("descripcionMision").required = visible;
}

function actualizarVistaPrevia() {
  const icono = $("icono").value.trim() || "🌟";
  const titulo = $("tituloMision").value.trim() || "Nueva misión";
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

function limpiarFormulario({ conservarMensaje = false } = {}) {
  $("formTarea").reset();
  $("tareaId").value = "";
  $("visibleParaAlumno").checked = true;
  $("icono").value = "📖";
  $("tituloMision").value = "Misión de lectura";
  $("descripcionMision").value =
    "Realiza esta aventura con calma y celebra cada pequeño paso.";
  $("mensajeMision").value = "";

  $("tituloFormulario").textContent = "Crear una tarea";
  $("subtituloFormulario").textContent =
    "Decide si también se mostrará a Gloria como una misión.";
  $("guardarTarea").textContent = "💾 Guardar tarea";
  $("cancelarEdicion").classList.add("hidden");
  $("formTarea").classList.remove("modo-edicion");

  if (!conservarMensaje) {
    $("mensajeFormulario").textContent = "";
    $("mensajeFormulario").className = "mensaje-formulario";
  }

  seleccionarIcono("📖");
  actualizarEstadoMision();
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
  $("observacion").value = tarea.observacionActual || "";

  $("visibleParaAlumno").checked = esVisibleComoMision(tarea);
  $("tituloMision").value =
    presentacion.tituloMision || tarea.titulo || "Nueva misión";
  $("descripcionMision").value =
    presentacion.descripcionMision ||
    tarea.descripcion ||
    "Realiza esta aventura con calma.";
  $("mensajeMision").value = presentacion.mensaje || "";

  seleccionarIcono(
    presentacion.icono || ICONOS[tarea.modulo] || "🌟"
  );

  $("tituloFormulario").textContent = "Editar tarea";
  $("subtituloFormulario").textContent =
    "Actualiza la tarea y decide si debe aparecer como misión.";
  $("guardarTarea").textContent = "💾 Guardar cambios";
  $("cancelarEdicion").classList.remove("hidden");
  $("formTarea").classList.add("modo-edicion");

  actualizarEstadoMision();
  actualizarVistaPrevia();
  cambiarVista("crear");

  window.scrollTo({
    top: $("panelCrear").offsetTop - 20,
    behavior: "smooth"
  });
}

function recogerFormulario() {
  const modulo = $("modulo").value;
  const visible = $("visibleParaAlumno").checked;

  return {
    titulo: $("titulo").value,
    descripcion: $("descripcion").value,
    tipo: $("tipo").value,
    modulo,
    destinoUrl: DESTINOS[modulo] || "",
    objetivo: $("objetivo").value,
    criterioFinalizacion: $("criterio").value,
    fechaInicio: $("fechaInicio").value,
    fechaLimite: $("fechaLimite").value,
    tiempoEstimadoMinutos: $("tiempoEstimado").value,
    prioridad: $("prioridad").value,
    visibleParaAlumno: visible,
    presentacionAlumno: {
      icono: $("icono").value,
      tituloMision: visible ? $("tituloMision").value : "",
      descripcionMision: visible ? $("descripcionMision").value : "",
      mensaje: visible ? $("mensajeMision").value : ""
    },
    observacionActual: $("observacion").value
  };
}

function configurarFormulario() {
  document.querySelectorAll("[data-icono]").forEach(button => {
    button.onclick = () => seleccionarIcono(button.dataset.icono);
  });

  [
    "icono",
    "tituloMision",
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

  $("modulo").addEventListener("change", () => {
    const modulo = $("modulo").value;
    seleccionarIcono(ICONOS[modulo] || "🌟");
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

    configurarTabs();
    configurarFiltros();
    configurarFormulario();
    limpiarFormulario();

    detenerObservacion = Academia.tareas.observar(
      nuevasTareas => {
        tareas = nuevasTareas;
        renderTareas();
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
