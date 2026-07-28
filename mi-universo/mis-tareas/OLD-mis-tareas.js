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

  if (Number.isNaN(fecha.getTime())) {
    return valor;
  }

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

function tareasFiltradas() {
  if (filtroActual === "todas") {
    return tareas;
  }

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
        ? "No hay tareas activas. Puedes crear la primera misión ✨"
        : "No hay tareas en este filtro.";
    lista.innerHTML = "";
    return;
  }

  estado.classList.add("hidden");

  lista.innerHTML = filtradas.map(tarea => {
    const presentacion = tarea.presentacionAlumno || {};
    const icono = presentacion.icono || ICONOS[tarea.modulo] || "🌟";
    const destino = tarea.destinoUrl || DESTINOS[tarea.modulo] || "";

    return `
      <article class="superficie tarea-card">
        <div class="tarea-card__cabecera">
          <div>
            <div class="tarea-icono">${escapar(icono)}</div>
            <h3>${escapar(tarea.titulo || "Tarea")}</h3>
            <p>${escapar(tarea.descripcion || presentacion.mensaje || "")}</p>
          </div>

          <span class="tarea-estado estado-${escapar(tarea.estado)}">
            ${escapar(textoEstado(tarea.estado))}
          </span>
        </div>

        <div class="tarea-meta">
          <span>📅 ${escapar(formatearFecha(tarea.fechaLimite))}</span>
          <span>⏱️ ${Number(tarea.tiempoEstimadoMinutos || 0)} min</span>
          <span>🧭 ${escapar(tarea.modulo || "libre")}</span>
        </div>

        <div class="tarea-acciones">
          ${
            destino && tarea.estado !== "completada"
              ? `<button class="btn accion-iniciar"
                    data-action="start"
                    data-id="${escapar(tarea.id)}"
                    data-url="${escapar(destino)}">
                   ▶️ Abrir misión
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
    button.onclick = async () => {
      const { action, id, url } = button.dataset;

      try {
        button.disabled = true;

        if (action === "start") {
          await Academia.tareas.cambiarEstado(id, "en_curso");
          window.location.href = url;
          return;
        }

        if (action === "complete") {
          await Academia.tareas.cambiarEstado(id, "completada");
        }

        if (action === "help") {
          await Academia.tareas.cambiarEstado(id, "necesita_ayuda");
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
    };
  });
}

function actualizarVistaPrevia() {
  $("previewIcono").textContent = $("icono").value.trim() || "🌟";
  $("previewTitulo").textContent =
    $("tituloMision").value.trim() || "Nueva misión";
  $("previewMensaje").textContent =
    $("mensajeMision").value.trim() ||
    "Lía tiene una nueva aventura esperando para ti.";
}

function configurarTabs() {
  document.querySelectorAll("[data-tab]").forEach(button => {
    button.onclick = () => {
      document.querySelectorAll("[data-tab]").forEach(item => {
        item.classList.toggle("active", item === button);
      });

      const tab = button.dataset.tab;
      $("panelLista").classList.toggle("hidden", tab !== "lista");
      $("panelCrear").classList.toggle("hidden", tab !== "crear");
    };
  });
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

function configurarFormulario() {
  ["icono", "tituloMision", "mensajeMision"].forEach(id => {
    $(id).addEventListener("input", actualizarVistaPrevia);
  });

  $("modulo").addEventListener("change", () => {
    const modulo = $("modulo").value;

    if (!$("icono").value.trim() || Object.values(ICONOS).includes($("icono").value.trim())) {
      $("icono").value = ICONOS[modulo] || "🌟";
    }

    actualizarVistaPrevia();
  });

  $("formTarea").addEventListener("reset", () => {
    window.setTimeout(actualizarVistaPrevia, 0);
  });

  $("formTarea").addEventListener("submit", async event => {
    event.preventDefault();

    const mensaje = $("mensajeFormulario");
    const modulo = $("modulo").value;

    const tarea = {
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
      estado: "pendiente",
      presentacionAlumno: {
        icono: $("icono").value,
        tituloMision: $("tituloMision").value,
        mensaje: $("mensajeMision").value
      },
      observacionActual: $("observacion").value
    };

    try {
      mensaje.className = "mensaje-formulario";
      mensaje.textContent = "Creando misión...";

      await Academia.tareas.crear(tarea);

      mensaje.classList.add("ok");
      mensaje.textContent =
        "✨ Misión creada. Ya aparece en Mi Camino.";

      $("formTarea").reset();

      window.setTimeout(() => {
        document.querySelector('[data-tab="lista"]').click();
      }, 800);
    } catch (error) {
      console.error(error);
      mensaje.classList.add("error");
      mensaje.textContent = `No se pudo crear la tarea: ${error.message}`;
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
    actualizarVistaPrevia();

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
