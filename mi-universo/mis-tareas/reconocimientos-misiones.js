/* Academia Gloria Valentina · Recompensas A1 · Reconocimiento humano de Misiones */

import { Academia } from "../../compartido/api/academia.js";
import { Reconocimientos } from "../../compartido/api/reconocimientos.js";

const tareasCache = new Map();
let reconocimientosPorMision = new Map();
let instalada = false;
let decoracionPendiente = false;
let detenerReconocimientos = null;

const CATEGORIAS = Object.freeze([
  ["perseverancia", "💪 Perseverancia / volver a intentarlo"],
  ["autonomia", "🪽 Autonomía / hacer más por sí misma"],
  ["curiosidad", "🔎 Curiosidad / querer descubrir"],
  ["pensamiento", "🧠 Pensamiento / estrategia"],
  ["equipo", "🤝 Trabajo en equipo"],
  ["crecimiento", "🌱 Crecimiento personal"],
  ["progreso", "📈 Progreso personal"],
  ["otro", "✨ Otro reconocimiento"]
]);

function texto(valor = "") {
  return String(valor ?? "").replace(/\s+/g, " ").trim();
}

function cargarEstilos() {
  if (document.querySelector('link[data-reconocimientos-misiones-css="true"]')) return;
  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./reconocimientos-misiones.css", import.meta.url).href;
  enlace.dataset.reconocimientosMisionesCss = "true";
  document.head.appendChild(enlace);
}

function misionIdTarjeta(tarjeta) {
  return texto(tarjeta?.querySelector("[data-id]")?.dataset?.id);
}

function esCompletada(tarjeta) {
  return Boolean(tarjeta?.querySelector(".tarea-estado.estado-completada"));
}

async function obtenerTarea(misionId) {
  const id = texto(misionId);
  if (!id) return null;
  if (tareasCache.has(id)) return tareasCache.get(id);

  try {
    const tarea = await Academia.tareas.obtener(id);
    tareasCache.set(id, tarea || null);
    return tarea || null;
  } catch (error) {
    console.debug("No se pudo resolver la Misión para Recompensas A1.", error);
    return null;
  }
}

function mensajeSugerido(tarea = {}) {
  const titulo = texto(tarea.titulo).toLocaleLowerCase("es-ES");
  if (titulo.includes("algo que conseguí esta semana") || titulo.includes("algo que consegui esta semana")) {
    return "Te detuviste a pensar en algo que has conseguido y supiste reconocer tu propio esfuerzo. Eso también es crecer.";
  }

  return "Quiero guardar este momento porque muestra algo importante de tu esfuerzo y de todo lo que vas construyendo.";
}

function categoriaSugerida(tarea = {}) {
  if (texto(tarea.modulo) === "creciendo-por-dentro") return "crecimiento";
  return "otro";
}

function asegurarDialogo() {
  let dialogo = document.getElementById("dialogoReconocimientoMision");
  if (dialogo) return dialogo;

  dialogo = document.createElement("dialog");
  dialogo.id = "dialogoReconocimientoMision";
  dialogo.className = "reconocimiento-dialogo";
  dialogo.innerHTML = `
    <form method="dialog" class="reconocimiento-dialogo__form" data-form-reconocimiento>
      <div class="reconocimiento-dialogo__cabecera">
        <div>
          <span class="eyebrow">💛 Reconocimiento familiar</span>
          <h2 data-reconocimiento-titulo>Añadir reconocimiento</h2>
          <p>Guarda un hecho real que quieras hacer visible en Mi Camino.</p>
        </div>
        <button class="reconocimiento-dialogo__cerrar" type="button" data-cerrar-reconocimiento aria-label="Cerrar">✕</button>
      </div>

      <div class="reconocimiento-dialogo__fuente" data-reconocimiento-fuente></div>

      <label>
        ¿Qué quieres reconocer?
        <select data-reconocimiento-categoria>
          ${CATEGORIAS.map(([valor, etiqueta]) => `<option value="${valor}">${etiqueta}</option>`).join("")}
        </select>
      </label>

      <label>
        Mensaje para Gloria
        <textarea maxlength="420" data-reconocimiento-mensaje></textarea>
        <span class="reconocimiento-dialogo__ayuda">Cuenta qué ocurrió y por qué te pareció importante.</span>
      </label>

      <div class="reconocimiento-dialogo__error" data-reconocimiento-error></div>

      <div class="reconocimiento-dialogo__acciones">
        <button class="btn secundaria" type="button" data-cancelar-reconocimiento>Cancelar</button>
        <button class="btn primaria" type="submit" data-guardar-reconocimiento>💛 Guardar reconocimiento</button>
      </div>
    </form>
  `;

  document.body.appendChild(dialogo);

  dialogo.querySelector("[data-cerrar-reconocimiento]")?.addEventListener("click", () => dialogo.close());
  dialogo.querySelector("[data-cancelar-reconocimiento]")?.addEventListener("click", () => dialogo.close());

  dialogo.addEventListener("click", event => {
    if (event.target === dialogo) dialogo.close();
  });

  return dialogo;
}

async function abrirReconocimiento(misionId) {
  const tarea = await obtenerTarea(misionId);
  if (!tarea) {
    window.alert("No se pudo localizar la Misión seleccionada.");
    return;
  }
  if (tarea.estado !== "completada") {
    window.alert("Solo las Misiones completadas pueden recibir este reconocimiento.");
    return;
  }
  if (tarea.esDatoPrueba === true) {
    window.alert(
      "Esta Misión está marcada como 🧪 Dato de prueba.\n\n" +
      "Las pruebas no pueden generar Recompensas. Si la Misión era real, quita primero la marca de prueba."
    );
    return;
  }

  const dialogo = asegurarDialogo();
  const existente = reconocimientosPorMision.get(texto(misionId)) || null;
  const categoria = dialogo.querySelector("[data-reconocimiento-categoria]");
  const mensaje = dialogo.querySelector("[data-reconocimiento-mensaje]");
  const titulo = dialogo.querySelector("[data-reconocimiento-titulo]");
  const fuente = dialogo.querySelector("[data-reconocimiento-fuente]");
  const error = dialogo.querySelector("[data-reconocimiento-error]");
  const guardar = dialogo.querySelector("[data-guardar-reconocimiento]");
  const form = dialogo.querySelector("[data-form-reconocimiento]");

  dialogo.dataset.misionId = texto(misionId);
  titulo.textContent = existente ? "Editar reconocimiento" : "Añadir reconocimiento";
  fuente.textContent = `Misión: ${texto(tarea.titulo) || "Misión completada"}`;
  categoria.value = texto(existente?.categoria) || categoriaSugerida(tarea);
  mensaje.value = texto(existente?.mensaje) || mensajeSugerido(tarea);
  error.textContent = "";
  guardar.textContent = existente ? "💛 Guardar cambios" : "💛 Guardar reconocimiento";
  guardar.disabled = false;

  form.onsubmit = async event => {
    event.preventDefault();
    error.textContent = "";
    guardar.disabled = true;
    const textoOriginal = guardar.textContent;
    guardar.textContent = "Guardando…";

    try {
      await Reconocimientos.guardarMision({
        misionId: dialogo.dataset.misionId,
        categoria: categoria.value,
        mensaje: mensaje.value
      });
      dialogo.close();
      window.alert(
        existente
          ? "💛 El reconocimiento se actualizó correctamente."
          : "💛 Reconocimiento guardado. Ya forma parte de Mi Camino."
      );
    } catch (guardarError) {
      console.error("No se pudo guardar el reconocimiento.", guardarError);
      error.textContent = guardarError.message || "No se pudo guardar el reconocimiento.";
      guardar.disabled = false;
      guardar.textContent = textoOriginal;
    }
  };

  dialogo.showModal();
  window.setTimeout(() => mensaje.focus(), 40);
}

async function decorarTarjeta(tarjeta) {
  if (!esCompletada(tarjeta)) {
    tarjeta.querySelector("[data-reconocer-mision]")?.remove();
    return;
  }

  const id = misionIdTarjeta(tarjeta);
  if (!id) return;

  const tarea = await obtenerTarea(id);
  if (!tarea || tarea.estado !== "completada" || tarea.esDatoPrueba === true) {
    tarjeta.querySelector("[data-reconocer-mision]")?.remove();
    return;
  }

  const acciones = tarjeta.querySelector(".tarea-acciones");
  if (!acciones) return;

  let boton = acciones.querySelector("[data-reconocer-mision]");
  if (!boton) {
    boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn accion-reconocimiento-mision";
    boton.dataset.reconocerMision = id;

    const eliminarCompletada = acciones.querySelector("[data-eliminar-completada]");
    acciones.insertBefore(boton, eliminarCompletada || null);

    boton.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      abrirReconocimiento(boton.dataset.reconocerMision);
    });
  }

  const reconocido = reconocimientosPorMision.has(id);
  boton.dataset.reconocerMision = id;
  boton.classList.toggle("reconocida", reconocido);
  boton.textContent = reconocido
    ? "💛 Editar reconocimiento"
    : "🌟 Añadir reconocimiento";
}

function programarDecoracion() {
  if (decoracionPendiente) return;
  decoracionPendiente = true;

  window.requestAnimationFrame(() => {
    decoracionPendiente = false;
    document.querySelectorAll("#listaTareas .tarea-card").forEach(tarjeta => {
      decorarTarjeta(tarjeta);
    });
  });
}

export function instalarReconocimientosMisiones() {
  if (instalada) return;
  instalada = true;
  cargarEstilos();

  const lista = document.getElementById("listaTareas");
  if (!lista) return;

  const observador = new MutationObserver(() => programarDecoracion());
  observador.observe(lista, { childList: true, subtree: true });

  detenerReconocimientos = Reconocimientos.observar(
    items => {
      reconocimientosPorMision = new Map(
        items
          .filter(item => item.estado === "activo" && item.fuentePrincipal?.misionId)
          .map(item => [texto(item.fuentePrincipal.misionId), item])
      );
      programarDecoracion();
    },
    error => console.debug("No se pudieron observar los reconocimientos.", error)
  );

  programarDecoracion();

  window.addEventListener("beforeunload", () => {
    observador.disconnect();
    detenerReconocimientos?.();
  }, { once: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", instalarReconocimientosMisiones, { once: true });
} else {
  instalarReconocimientosMisiones();
}
