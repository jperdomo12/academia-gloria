/* Academia Gloria Valentina · Gestión familiar · Limpieza de datos de prueba · Fase 1 */

import { db } from "../../compartido/firebase/firebase-config.js";
import { Academia } from "../../compartido/api/academia.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";
import { obtenerSesionHistoria } from "../../compartido/js/detectives-progreso.js";
import { leerSesionAcademica } from "../../compartido/js/sesiones-academicas.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const $ = id => document.getElementById(id);
const CINCO_MINUTOS = 5 * 60 * 1000;

const MODULOS = Object.freeze({
  detectives: { icono: "🧩", titulo: "Detectives" },
  academicos: { icono: "📘", titulo: "Pruebas académicas" },
  lectura: { icono: "📖", titulo: "Rincón de Lectura" },
  otro: { icono: "📎", titulo: "Otra evidencia" }
});

let inventarioCargado = false;
let cargandoInventario = false;
let grupos = [];
let gruposFiltrados = [];

function escapar(valor = "") {
  return String(valor).replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caracter]);
}

function texto(valor = "") {
  return String(valor ?? "").trim();
}

function fechaMs(valor) {
  if (!valor) return 0;
  if (typeof valor?.toMillis === "function") return valor.toMillis();
  if (typeof valor?.toDate === "function") return valor.toDate().getTime();
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? 0 : fecha.getTime();
}

function fechaEvidencia(evidencia = {}) {
  return fechaMs(
    evidencia.ocurridaEn ||
    evidencia.aplicadaEn ||
    evidencia.creadaEn
  );
}

function formatearFecha(valor) {
  const ms = typeof valor === "number" ? valor : fechaMs(valor);
  if (!ms) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(ms));
}

function plural(cantidad, singular, pluralTexto) {
  return cantidad === 1 ? singular : pluralTexto;
}

function motorEvidencia(evidencia = {}) {
  const modulo = texto(evidencia.modulo);
  const tipo = texto(evidencia.tipo);
  const origen = texto(evidencia.origen);

  if (
    origen === "sesion_academica" ||
    tipo === "sesion_academica" ||
    tipo === "refuerzo_academico"
  ) {
    return "academicos";
  }
  if (modulo === "detectives") return "detectives";
  if (modulo === "rincon-lectura") return "lectura";
  return "otro";
}

function tituloEvidencia(evidencia = {}) {
  return texto(
    evidencia.resultado?.titulo ||
    evidencia.atributos?.titulo ||
    evidencia.actividadId ||
    "Evidencia"
  );
}

function estadoMision(tarea = {}) {
  const etiquetas = {
    pendiente: "Pendiente",
    asignada: "Asignada",
    en_curso: "En aventura",
    pendiente_validacion: "Pendiente de revisión",
    completada_pendiente_validacion: "Pendiente de revisión",
    completada: "Completada",
    necesita_ayuda: "Necesita ayuda",
    vencida: "Vencida",
    cancelada: "Cancelada"
  };
  return etiquetas[texto(tarea.estado)] || texto(tarea.estado) || "Sin estado";
}

function nombreModuloMision(tarea = {}) {
  const modulo = texto(tarea.modulo || tarea.criterioCumplimiento?.modulo);
  const etiquetas = {
    detectives: "Detectives",
    "rincon-lectura": "Rincón de Lectura",
    "creciendo-por-dentro": "Creciendo por Dentro",
    biblioteca: "Biblioteca Encantada",
    libre: "Actividad externa"
  };
  return etiquetas[modulo] || modulo || "Módulo no disponible";
}

function cargarEstilos() {
  if (document.querySelector('link[data-limpieza-pruebas-css="true"]')) return;
  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./limpieza-datos-prueba.css", import.meta.url).href;
  enlace.dataset.limpiezaPruebasCss = "true";
  document.head.appendChild(enlace);
}

async function leerTodasEvidencias(userId) {
  const resultado = await getDocs(
    collection(db, "usuarios", userId, "evidencias")
  );

  return resultado.docs
    .map(documento => ({ id: documento.id, ...documento.data() }))
    .sort((a, b) => fechaEvidencia(b) - fechaEvidencia(a));
}

function construirGrupos(tareas = [], evidencias = []) {
  const tareasPorId = new Map(tareas.map(tarea => [texto(tarea.id), tarea]));
  const porMision = new Map();

  evidencias.forEach(evidencia => {
    const misionId = texto(evidencia.misionId) || "__sin_mision__";
    const grupo = porMision.get(misionId) || {
      misionId,
      tarea: tareasPorId.get(misionId) || null,
      evidencias: [],
      ultimaEvidencia: 0
    };

    grupo.evidencias.push(evidencia);
    grupo.ultimaEvidencia = Math.max(
      grupo.ultimaEvidencia,
      fechaEvidencia(evidencia)
    );
    porMision.set(misionId, grupo);
  });

  return [...porMision.values()].sort((a, b) =>
    b.ultimaEvidencia - a.ultimaEvidencia
  );
}

function textoGrupo(grupo) {
  if (grupo.tarea) {
    return `${grupo.tarea.titulo || "Misión sin título"} · ${grupo.evidencias.length} ${plural(grupo.evidencias.length, "evidencia", "evidencias")}`;
  }

  return `⚠️ Misión eliminada/no disponible · ${grupo.evidencias.length} ${plural(grupo.evidencias.length, "evidencia", "evidencias")} · ${grupo.misionId}`;
}

function poblarSelector() {
  const selector = $("limpiezaMision");
  if (!selector) return;

  const valorActual = selector.value;
  selector.innerHTML = `
    <option value="">Selecciona una misión o grupo de evidencias…</option>
    ${gruposFiltrados.map(grupo => `
      <option value="${escapar(grupo.misionId)}">${escapar(textoGrupo(grupo))}</option>
    `).join("")}
  `;

  if (valorActual && gruposFiltrados.some(grupo => grupo.misionId === valorActual)) {
    selector.value = valorActual;
  }
}

function filtrarGrupos() {
  const termino = texto($("limpiezaBuscar")?.value).toLocaleLowerCase("es-ES");
  if (!termino) {
    gruposFiltrados = [...grupos];
  } else {
    gruposFiltrados = grupos.filter(grupo => {
      const bolsa = [
        grupo.misionId,
        grupo.tarea?.titulo,
        grupo.tarea?.tema,
        grupo.tarea?.materia,
        nombreModuloMision(grupo.tarea || {}),
        ...grupo.evidencias.flatMap(evidencia => [
          evidencia.modulo,
          evidencia.tipo,
          evidencia.actividadId,
          tituloEvidencia(evidencia)
        ])
      ]
        .map(valor => texto(valor).toLocaleLowerCase("es-ES"))
        .join(" ");
      return bolsa.includes(termino);
    });
  }

  poblarSelector();
  const contador = $("limpiezaResultadoBusqueda");
  if (contador) {
    contador.textContent = `${gruposFiltrados.length} de ${grupos.length} grupos visibles`;
  }
}

function renderResumenInventario() {
  const resumen = $("limpiezaInventarioResumen");
  if (!resumen) return;

  const evidencias = grupos.reduce(
    (total, grupo) => total + grupo.evidencias.length,
    0
  );
  const huerfanos = grupos.filter(grupo => !grupo.tarea).length;

  resumen.innerHTML = `
    <span><strong>${grupos.length}</strong> grupos con evidencias</span>
    <span><strong>${evidencias}</strong> evidencias registradas</span>
    <span><strong>${huerfanos}</strong> ${plural(huerfanos, "grupo sin misión disponible", "grupos sin misión disponible")}</span>
  `;
}

async function cargarInventario({ forzar = false } = {}) {
  if (cargandoInventario || (inventarioCargado && !forzar)) return;
  cargandoInventario = true;

  const estado = $("limpiezaEstado");
  const detalle = $("limpiezaDetalle");
  if (estado) {
    estado.classList.remove("hidden");
    estado.textContent = "🦜 Lía está reuniendo misiones y evidencias, sin modificar ningún dato…";
  }
  if (detalle) detalle.innerHTML = "";

  try {
    const contexto = await ContextoUsuario.inicializar();
    const userId = texto(contexto.userIdPersonaActiva);
    if (!userId) throw new Error("No se pudo resolver el alumno activo.");

    const [tareas, evidencias] = await Promise.all([
      Academia.tareas.leer(),
      leerTodasEvidencias(userId)
    ]);

    grupos = construirGrupos(tareas, evidencias);
    gruposFiltrados = [...grupos];
    inventarioCargado = true;
    renderResumenInventario();
    filtrarGrupos();

    if (estado) {
      estado.classList.remove("hidden");
      estado.textContent = grupos.length
        ? "Selecciona una misión para comprobar qué registros están realmente vinculados."
        : "No se encontraron evidencias registradas para el alumno activo.";
    }
  } catch (error) {
    if (estado) {
      estado.classList.remove("hidden");
      estado.textContent = `No fue posible preparar la vista previa. Razón: ${error.message || "Error no identificado"}`;
    }
  } finally {
    cargandoInventario = false;
  }
}

function fechaSesion(sesion = {}, motor = "") {
  if (motor === "detectives") {
    return fechaMs(sesion.completadaEn || sesion.actualizadaEn);
  }
  if (motor === "academicos") {
    return fechaMs(sesion.completadaEn || sesion.updatedAt || sesion.finCliente || sesion.createdAt);
  }
  return fechaMs(sesion.actualizadaEn || sesion.creadaEn);
}

async function resolverVinculo(evidencia, userId, lecturas) {
  const motor = motorEvidencia(evidencia);
  const sesionId = texto(evidencia.sesionId);
  const actividadId = texto(evidencia.actividadId);

  if (motor === "detectives") {
    if (!sesionId || !actividadId) {
      return {
        motor,
        sesion: null,
        impacto: false,
        exacto: false,
        estado: "Sin identificadores suficientes",
        detalle: "La evidencia no contiene historia y sesión suficientes para localizar una resolución exacta."
      };
    }

    const sesion = await obtenerSesionHistoria(userId, actividadId, sesionId);
    return {
      motor,
      sesion,
      impacto: Boolean(sesion),
      exacto: Boolean(sesion),
      estado: sesion ? "Sesión exacta localizada" : "Sesión no localizada",
      detalle: sesion
        ? "El sesionId apunta a una resolución concreta de Detectives."
        : "La evidencia existe, pero esa sesión concreta ya no está disponible."
    };
  }

  if (motor === "academicos") {
    if (!sesionId) {
      return {
        motor,
        sesion: null,
        impacto: false,
        exacto: false,
        estado: "Sin sesionId",
        detalle: "No es posible localizar una sesión académica exacta sin sesionId."
      };
    }

    const sesion = await leerSesionAcademica(sesionId);
    const misionCoincide = !sesion?.misionId || texto(sesion.misionId) === texto(evidencia.misionId);
    return {
      motor,
      sesion,
      impacto: Boolean(sesion),
      exacto: Boolean(sesion) && misionCoincide,
      revisar: Boolean(sesion) && !misionCoincide,
      estado: !sesion
        ? "Sesión no localizada"
        : misionCoincide
          ? "Sesión exacta localizada"
          : "Sesión localizada con otra misión",
      detalle: !sesion
        ? "La evidencia existe, pero esa sesión académica ya no está disponible."
        : misionCoincide
          ? "La sesión académica conserva el mismo vínculo de misión."
          : "El sesionId existe, pero el misionId guardado en la sesión no coincide; requiere revisión antes de cualquier borrado."
    };
  }

  if (motor === "lectura") {
    const sesion = lecturas.find(item =>
      texto(item.id) === sesionId ||
      texto(item.id) === actividadId ||
      texto(item.historiaId) === actividadId
    ) || null;

    if (!sesion) {
      return {
        motor,
        sesion: null,
        impacto: false,
        exacto: false,
        revisar: true,
        estado: "Registro de lectura no localizado",
        detalle: "La evidencia permanece, pero actualmente no existe un registro de esa historia en Rincón de Lectura."
      };
    }

    const evidenciaEn = fechaEvidencia(evidencia);
    const sesionEn = fechaSesion(sesion, "lectura");
    const actualizadaDespues = Boolean(
      evidenciaEn && sesionEn && sesionEn > evidenciaEn + CINCO_MINUTOS
    );

    return {
      motor,
      sesion,
      impacto: true,
      exacto: false,
      revisar: true,
      estado: actualizadaDespues
        ? "La historia fue actualizada después"
        : "Registro actual de la historia localizado",
      detalle: actualizadaDespues
        ? "Rincón de Lectura guarda un registro por historia. Este registro fue actualizado después de la evidencia seleccionada, así que podría contener una lectura posterior real y NO debe borrarse automáticamente."
        : "Rincón de Lectura guarda un registro por historia, no una sesión inmutable por misión. Hay coincidencia temporal, pero igualmente debe revisarse antes de eliminarlo."
    };
  }

  return {
    motor,
    sesion: null,
    impacto: false,
    exacto: false,
    estado: "Fuera del Análisis Educativo V1",
    detalle: "Esta evidencia no pertenece a Detectives, Pruebas académicas ni Rincón de Lectura; por ahora no se considera una fuente estadística del reporte."
  };
}

function claseVinculo(vinculo) {
  if (vinculo.exacto) return "exacto";
  if (vinculo.revisar) return "revisar";
  if (vinculo.sesion) return "encontrado";
  return "sin-vinculo";
}

function renderMision(grupo) {
  if (!grupo.tarea) {
    return `
      <aside class="limpieza-alerta limpieza-alerta--advertencia">
        <strong>⚠️ La misión original ya no está disponible.</strong>
        <p>Las evidencias siguen existiendo con el identificador <code>${escapar(grupo.misionId)}</code>. Esto confirma por qué no conviene depender únicamente de la lista actual de Misiones para limpiar datos de prueba.</p>
      </aside>
    `;
  }

  const tarea = grupo.tarea;
  return `
    <article class="limpieza-mision-resumen">
      <div>
        <span class="limpieza-etiqueta">Misión localizada</span>
        <h4>${escapar(tarea.titulo || "Misión sin título")}</h4>
        <p>${escapar(nombreModuloMision(tarea))} · ${escapar(estadoMision(tarea))}</p>
      </div>
      <code>${escapar(grupo.misionId)}</code>
    </article>
  `;
}

function renderEvidencia(evidencia, vinculo) {
  const meta = MODULOS[vinculo.motor] || MODULOS.otro;
  const fecha = fechaEvidencia(evidencia);
  const sesionFecha = vinculo.sesion ? fechaSesion(vinculo.sesion, vinculo.motor) : 0;

  return `
    <article class="limpieza-evidencia">
      <div class="limpieza-evidencia__cabecera">
        <div>
          <span class="limpieza-evidencia__motor">${meta.icono} ${escapar(meta.titulo)}</span>
          <h4>${escapar(tituloEvidencia(evidencia))}</h4>
        </div>
        <span class="limpieza-vinculo limpieza-vinculo--${claseVinculo(vinculo)}">${escapar(vinculo.estado)}</span>
      </div>

      <div class="limpieza-evidencia__datos">
        <span><b>Evidencia:</b> <code>${escapar(evidencia.id)}</code></span>
        <span><b>Actividad:</b> <code>${escapar(evidencia.actividadId || "—")}</code></span>
        <span><b>Sesión:</b> <code>${escapar(evidencia.sesionId || "—")}</code></span>
        <span><b>Registrada:</b> ${escapar(formatearFecha(fecha))}</span>
        ${sesionFecha ? `<span><b>Fecha del registro actual:</b> ${escapar(formatearFecha(sesionFecha))}</span>` : ""}
      </div>

      <p class="limpieza-evidencia__detalle">${escapar(vinculo.detalle)}</p>
      <p class="limpieza-impacto ${vinculo.impacto ? "limpieza-impacto--si" : "limpieza-impacto--no"}">
        ${vinculo.impacto
          ? "📊 Este registro sí puede influir en el Análisis Educativo actual."
          : "ℹ️ No se localizó un registro estadístico actual de los tres motores analizados."}
      </p>
    </article>
  `;
}

async function revisarGrupo() {
  const misionId = texto($("limpiezaMision")?.value);
  if (!misionId) {
    alert("Selecciona primero una misión o grupo de evidencias.");
    return;
  }

  const grupo = grupos.find(item => item.misionId === misionId);
  if (!grupo) return;

  const estado = $("limpiezaEstado");
  const detalle = $("limpiezaDetalle");
  const boton = $("limpiezaRevisar");

  if (estado) {
    estado.classList.remove("hidden");
    estado.textContent = "🔎 Comprobando vínculos con las sesiones reales…";
  }
  if (detalle) detalle.innerHTML = "";
  if (boton) boton.disabled = true;

  try {
    const contexto = await ContextoUsuario.inicializar();
    const userId = texto(contexto.userIdPersonaActiva);
    if (!userId) throw new Error("No se pudo resolver el alumno activo.");

    const necesitaLecturas = grupo.evidencias.some(
      evidencia => motorEvidencia(evidencia) === "lectura"
    );
    const lecturas = necesitaLecturas
      ? await Academia.rinconLectura.leerSesiones()
      : [];

    const resultados = await Promise.all(
      grupo.evidencias.map(async evidencia => ({
        evidencia,
        vinculo: await resolverVinculo(evidencia, userId, lecturas)
      }))
    );

    const exactos = resultados.filter(item => item.vinculo.exacto).length;
    const impactan = resultados.filter(item => item.vinculo.impacto).length;
    const revisar = resultados.filter(item => item.vinculo.revisar).length;

    if (detalle) {
      detalle.innerHTML = `
        ${renderMision(grupo)}

        <div class="limpieza-totales">
          <article><strong>${grupo.evidencias.length}</strong><span>${plural(grupo.evidencias.length, "evidencia", "evidencias")}</span></article>
          <article><strong>${impactan}</strong><span>registros que pueden afectar estadísticas</span></article>
          <article><strong>${exactos}</strong><span>vínculos exactos</span></article>
          <article><strong>${revisar}</strong><span>requieren revisión especial</span></article>
        </div>

        <div class="limpieza-evidencias-lista">
          ${resultados.map(item => renderEvidencia(item.evidencia, item.vinculo)).join("")}
        </div>

        <aside class="limpieza-alerta limpieza-alerta--segura">
          <strong>🔒 Vista previa únicamente</strong>
          <p>No se ha eliminado ni modificado ningún documento. La eliminación controlada solo se habilita para Misiones de Detectives que vuelvan a superar una validación exacta inmediatamente antes del borrado.</p>
        </aside>
      `;
    }

    if (estado) estado.classList.add("hidden");
  } catch (error) {
    if (estado) {
      estado.classList.remove("hidden");
      estado.textContent = `No fue posible comprobar los vínculos. Razón: ${error.message || "Error no identificado"}`;
    }
  } finally {
    if (boton) boton.disabled = false;
  }
}

function crearInterfaz() {
  if ($("limpiezaDatosPrueba")) return;
  const panel = $("panelAnalisisEducativo");
  if (!panel) return;

  const bloque = document.createElement("details");
  bloque.id = "limpiezaDatosPrueba";
  bloque.className = "limpieza-pruebas superficie";
  bloque.innerHTML = `
    <summary class="limpieza-pruebas__summary">
      <span class="limpieza-pruebas__icono" aria-hidden="true">🧹</span>
      <span>
        <strong>Limpieza de datos de prueba</strong>
        <small>Identificar primero · eliminar solo vínculos exactos confirmados</small>
      </span>
      <span class="limpieza-solo-lectura">🛡️ Controlado</span>
      <span class="limpieza-pruebas__flecha" aria-hidden="true">⌄</span>
    </summary>

    <div class="limpieza-pruebas__contenido">
      <aside class="limpieza-alerta limpieza-alerta--informacion">
        <strong>Primero identificamos; después decidimos.</strong>
        <p>La vista previa busca también evidencias cuya Misión ya fue eliminada. El borrado automático inicial queda limitado a Misiones existentes de Detectives con sesiones exactas.</p>
      </aside>

      <div id="limpiezaInventarioResumen" class="limpieza-inventario-resumen"></div>

      <div class="limpieza-controles">
        <label>
          <span>Buscar</span>
          <input id="limpiezaBuscar" type="search" placeholder="Título, módulo, actividad o identificador">
          <small id="limpiezaResultadoBusqueda"></small>
        </label>

        <label class="limpieza-selector-mision">
          <span>Misión / grupo de evidencias</span>
          <select id="limpiezaMision">
            <option value="">Cargando evidencias…</option>
          </select>
        </label>

        <button id="limpiezaRevisar" class="btn primaria" type="button">
          🔎 Revisar vínculos
        </button>

        <button id="limpiezaActualizar" class="btn secundaria" type="button">
          ↻ Actualizar inventario
        </button>
      </div>

      <div id="limpiezaEstado" class="estado-carga" aria-live="polite">
        Abre esta herramienta para cargar el inventario de evidencias.
      </div>
      <div id="limpiezaDetalle" class="limpieza-detalle"></div>
    </div>
  `;

  panel.appendChild(bloque);

  bloque.addEventListener("toggle", () => {
    if (bloque.open) cargarInventario();
  });
  $("limpiezaBuscar")?.addEventListener("input", filtrarGrupos);
  $("limpiezaRevisar")?.addEventListener("click", revisarGrupo);
  $("limpiezaActualizar")?.addEventListener("click", () => cargarInventario({ forzar: true }));
}

function iniciar() {
  cargarEstilos();
  crearInterfaz();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}

import "./limpieza-datos-prueba-borrado.js";
