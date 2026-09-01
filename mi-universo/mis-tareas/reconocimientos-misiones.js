/* Academia Gloria Valentina · Recompensas A1/A2 · Reconocimiento humano de Misiones */

import { Academia } from "../../compartido/api/academia.js";
import {
  CATALOGO_GUACAMAYAS,
  Reconocimientos
} from "../../compartido/api/reconocimientos.js";

let tareasPorId = new Map();
let reconocimientosPorMision = new Map();
let guacamayasPorTipo = new Map();
let instalada = false;
let decoracionPendiente = false;
let detenerReconocimientos = null;
let detenerTareas = null;
let fuenteUrlAtendida = false;

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
  if (tareasPorId.has(id)) return tareasPorId.get(id);

  try {
    const tarea = await Academia.tareas.obtener(id);
    if (tarea) tareasPorId.set(id, tarea);
    return tarea || null;
  } catch (error) {
    console.debug("No se pudo resolver la Misión para Recompensas.", error);
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

function opcionesGuacamayas() {
  return Object.entries(CATALOGO_GUACAMAYAS)
    .map(([clave, item]) => `<option value="${clave}">🦜 ${item.nombre.replace("Guacamaya ", "")}</option>`)
    .join("");
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

      <section class="reconocimiento-guacamaya" data-bloque-guacamaya>
        <label class="reconocimiento-guacamaya__activar">
          <input type="checkbox" data-reconocimiento-guacamaya>
          <span>
            <strong>🦜 Este momento merece una Guacamaya</strong>
            <small>Úsala solo para un hito especialmente significativo. Cada Guacamaya aparece una sola vez en Mi Camino.</small>
          </span>
        </label>
        <div class="reconocimiento-guacamaya__detalle hidden" data-guacamaya-detalle>
          <label>
            ¿Cuál representa mejor este hito?
            <select data-guacamaya-tipo>${opcionesGuacamayas()}</select>
          </label>
          <p data-guacamaya-descripcion></p>
        </div>
      </section>

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

  const activar = dialogo.querySelector("[data-reconocimiento-guacamaya]");
  const tipo = dialogo.querySelector("[data-guacamaya-tipo]");
  activar?.addEventListener("change", () => actualizarPanelGuacamaya(dialogo));
  tipo?.addEventListener("change", () => actualizarPanelGuacamaya(dialogo));

  return dialogo;
}

function actualizarPanelGuacamaya(dialogo) {
  const activar = dialogo.querySelector("[data-reconocimiento-guacamaya]");
  const detalle = dialogo.querySelector("[data-guacamaya-detalle]");
  const tipo = dialogo.querySelector("[data-guacamaya-tipo]");
  const descripcion = dialogo.querySelector("[data-guacamaya-descripcion]");
  const categoria = dialogo.querySelector("[data-reconocimiento-categoria]");
  const definicion = CATALOGO_GUACAMAYAS[tipo?.value];

  detalle?.classList.toggle("hidden", !activar?.checked);
  if (descripcion) descripcion.textContent = definicion?.descripcion || "";
  if (activar?.checked && definicion && categoria) {
    categoria.value = definicion.categoria;
    categoria.disabled = true;
  } else if (categoria) {
    categoria.disabled = false;
  }
}

function prepararOpcionesGuacamayas(dialogo, existente) {
  const select = dialogo.querySelector("[data-guacamaya-tipo]");
  const activar = dialogo.querySelector("[data-reconocimiento-guacamaya]");
  if (!select || !activar) return;

  const actual = texto(existente?.guacamayaTipo);
  [...select.options].forEach(option => {
    const ocupada = guacamayasPorTipo.get(option.value);
    option.disabled = Boolean(ocupada && option.value !== actual);
    const definicion = CATALOGO_GUACAMAYAS[option.value];
    option.textContent = ocupada && option.value !== actual
      ? `🦜 ${definicion.nombre.replace("Guacamaya ", "")} · ya forma parte de Mi Camino`
      : `🦜 ${definicion.nombre.replace("Guacamaya ", "")}`;
  });

  const disponibles = [...select.options].filter(option => !option.disabled);
  if (!actual && !disponibles.length) {
    activar.checked = false;
    activar.disabled = true;
    activar.title = "Las seis Guacamayas ya forman parte de Mi Camino.";
  } else {
    activar.title = "";
  }
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
  const activarGuacamaya = dialogo.querySelector("[data-reconocimiento-guacamaya]");
  const guacamayaTipo = dialogo.querySelector("[data-guacamaya-tipo]");

  activarGuacamaya.disabled = false;
  prepararOpcionesGuacamayas(dialogo, existente);

  dialogo.dataset.misionId = texto(misionId);
  titulo.textContent = existente?.tipo === "guacamaya"
    ? "Editar Guacamaya"
    : existente
      ? "Editar reconocimiento"
      : "Añadir reconocimiento";
  fuente.textContent = `Misión: ${texto(tarea.titulo) || "Misión completada"}`;
  categoria.disabled = false;
  categoria.value = texto(existente?.categoria) || categoriaSugerida(tarea);
  mensaje.value = texto(existente?.mensaje) || mensajeSugerido(tarea);
  error.textContent = "";

  const yaEsGuacamaya = existente?.tipo === "guacamaya";
  activarGuacamaya.checked = yaEsGuacamaya;
  if (yaEsGuacamaya) activarGuacamaya.disabled = true;

  if (yaEsGuacamaya && existente.guacamayaTipo) {
    guacamayaTipo.value = existente.guacamayaTipo;
  } else {
    const preferida = texto(tarea.modulo) === "creciendo-por-dentro"
      ? "crecimiento"
      : "";
    const opcionPreferida = preferida
      ? [...guacamayaTipo.options].find(option => option.value === preferida && !option.disabled)
      : null;
    const primeraDisponible = opcionPreferida || [...guacamayaTipo.options].find(option => !option.disabled);
    if (primeraDisponible) guacamayaTipo.value = primeraDisponible.value;
  }

  actualizarPanelGuacamaya(dialogo);
  guardar.textContent = yaEsGuacamaya
    ? "🦜 Guardar cambios"
    : existente
      ? "💛 Guardar cambios"
      : "💛 Guardar reconocimiento";
  guardar.disabled = false;

  form.onsubmit = async event => {
    event.preventDefault();
    error.textContent = "";
    guardar.disabled = true;
    const textoOriginal = guardar.textContent;
    guardar.textContent = "Guardando…";

    try {
      const deseaGuacamaya = activarGuacamaya.checked;
      const seleccion = deseaGuacamaya ? texto(guacamayaTipo.value) : "";
      const eraGuacamaya = existente?.tipo === "guacamaya";

      if (deseaGuacamaya && !seleccion) {
        throw new Error("No hay una Guacamaya disponible para seleccionar.");
      }

      if (deseaGuacamaya && !eraGuacamaya) {
        const definicion = CATALOGO_GUACAMAYAS[seleccion];
        const confirmado = window.confirm(
          `🦜 ${definicion?.nombre || "Guacamaya"}\n\n` +
          "Una Guacamaya representa un hito especial y se obtiene una sola vez.\n\n" +
          "¿Confirmas que este momento merece formar parte permanente de Mi Camino?"
        );
        if (!confirmado) {
          guardar.disabled = false;
          guardar.textContent = textoOriginal;
          return;
        }
      }

      if (
        eraGuacamaya &&
        seleccion &&
        seleccion !== texto(existente.guacamayaTipo)
      ) {
        const definicion = CATALOGO_GUACAMAYAS[seleccion];
        const corregir = window.confirm(
          `⚠️ Corrección de Guacamaya\n\n` +
          `Vas a cambiar este hito a ${definicion?.nombre || "otra Guacamaya"}.\n` +
          "Hazlo solo para corregir una clasificación administrativa.\n\n" +
          "¿Confirmas la corrección?"
        );
        if (!corregir) {
          guardar.disabled = false;
          guardar.textContent = textoOriginal;
          return;
        }
      }

      const resultado = await Reconocimientos.guardarMision({
        misionId: dialogo.dataset.misionId,
        categoria: categoria.value,
        mensaje: mensaje.value,
        guacamayaTipo: seleccion
      });
      dialogo.close();
      window.alert(
        resultado.tipo === "guacamaya"
          ? `🦜 ${resultado.guacamayaNombre} ya forma parte de Mi Camino.`
          : existente
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

function decorarTarjeta(tarjeta) {
  if (!esCompletada(tarjeta)) {
    tarjeta.querySelector("[data-reconocer-mision]")?.remove();
    return;
  }

  const id = misionIdTarjeta(tarjeta);
  if (!id) return;

  const tarea = tareasPorId.get(id);
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

  const reconocimiento = reconocimientosPorMision.get(id);
  const reconocido = Boolean(reconocimiento);
  boton.dataset.reconocerMision = id;
  boton.classList.toggle("reconocida", reconocido);
  boton.classList.toggle("guacamaya", reconocimiento?.tipo === "guacamaya");
  boton.textContent = reconocimiento?.tipo === "guacamaya"
    ? "🦜 Editar Guacamaya"
    : reconocido
      ? "💛 Editar reconocimiento"
      : "🌟 Añadir reconocimiento";
}

function programarDecoracion() {
  if (decoracionPendiente) return;
  decoracionPendiente = true;

  window.requestAnimationFrame(() => {
    decoracionPendiente = false;
    document.querySelectorAll("#listaTareas .tarea-card").forEach(decorarTarjeta);
    atenderFuenteDesdeUrl();
  });
}

function limpiarParametrosFuente() {
  const url = new URL(window.location.href);
  url.searchParams.delete("misionId");
  url.searchParams.delete("fuente");
  url.searchParams.delete("desde");
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function atenderFuenteDesdeUrl() {
  if (fuenteUrlAtendida) return;
  const parametros = new URLSearchParams(window.location.search);
  if (parametros.get("desde") !== "reconocimiento") return;

  const misionId = texto(parametros.get("misionId"));
  const fuente = texto(parametros.get("fuente"));
  if (!misionId) return;

  const filtroCompletadas = document.querySelector('[data-filter="completadas"]');
  if (filtroCompletadas && !document.querySelector(`[data-id="${CSS.escape(misionId)}"]`)) {
    filtroCompletadas.click();
    window.requestAnimationFrame(programarDecoracion);
    return;
  }

  const boton = document.querySelector(
    fuente === "trabajo"
      ? `button[data-action="evidence"][data-id="${CSS.escape(misionId)}"]`
      : `button[data-action="view"][data-id="${CSS.escape(misionId)}"]`
  );
  if (!boton) return;

  fuenteUrlAtendida = true;
  if (fuente === "trabajo") {
    boton.closest(".tarea-card")?.setAttribute("open", "");
  }
  boton.click();
  if (fuente === "trabajo") {
    boton.closest(".tarea-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
    limpiarParametrosFuente();
  }
}

export function instalarReconocimientosMisiones() {
  if (instalada) return;
  instalada = true;
  cargarEstilos();

  const lista = document.getElementById("listaTareas");
  if (!lista) return;

  const observador = new MutationObserver(() => programarDecoracion());
  observador.observe(lista, { childList: true, subtree: true });

  detenerTareas = Academia.tareas.observar(
    items => {
      tareasPorId = new Map(items.map(item => [texto(item.id), item]));
      programarDecoracion();
    },
    error => console.debug("No se pudieron observar las Misiones para Recompensas.", error)
  );

  detenerReconocimientos = Reconocimientos.observar(
    items => {
      reconocimientosPorMision = new Map(
        items
          .filter(item => item.estado === "activo" && item.fuentePrincipal?.misionId)
          .map(item => [texto(item.fuentePrincipal.misionId), item])
      );
      guacamayasPorTipo = new Map(
        items
          .filter(item => item.estado === "activo" && item.tipo === "guacamaya" && item.guacamayaTipo)
          .map(item => [texto(item.guacamayaTipo), item])
      );
      programarDecoracion();
    },
    error => console.debug("No se pudieron observar los reconocimientos.", error)
  );

  programarDecoracion();

  window.addEventListener("beforeunload", () => {
    observador.disconnect();
    detenerTareas?.();
    detenerReconocimientos?.();
  }, { once: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", instalarReconocimientosMisiones, { once: true });
} else {
  instalarReconocimientosMisiones();
}
