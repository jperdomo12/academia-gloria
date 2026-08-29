import { protegerPagina } from "../../compartido/js/auth-guard.js";
import { iniciarPanelUsuario } from "../../compartido/js/panel-usuario.js";
import { obtenerPerfil } from "../../compartido/js/perfil-usuario.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";
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

const NOMBRES_MODULO = Object.freeze({
  "rincon-lectura": "Rincón de Lectura",
  detectives: "Detectives",
  "creciendo-por-dentro": "Creciendo por Dentro",
  biblioteca: "Biblioteca Encantada",
  libre: "Actividad externa"
});

const ESTADOS_EN_ESPERA = new Set([
  "pendiente_validacion",
  "completada_pendiente_validacion"
]);

const actoresAuditoria = new Map();
let formularioSoloLectura = false;

let tareas = [];
const evidenciasAbiertas = new Set();
let filtroActual = "activas";
let detenerObservacion = null;
let catalogoSemillas = [];
let descripcionMisionPersonalizada = false;

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

function fechaDesdeValor(valor) {
  if (!valor) return null;

  if (typeof valor?.toDate === "function") {
    const fecha = valor.toDate();
    return Number.isNaN(fecha.getTime()) ? null : fecha;
  }

  if (typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    const fecha = new Date(`${valor}T12:00:00`);
    if (Number.isNaN(fecha.getTime())) return null;
    fecha.__soloFechaAcademia = true;
    return fecha;
  }

  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}

function fechaEstadoTarea(tarea = {}) {
  const estadoFinal = [
    "completada",
    "pendiente_validacion",
    "completada_pendiente_validacion"
  ].includes(tarea.estado);

  return fechaDesdeValor(
    tarea.statusChangedAt ||
    (estadoFinal ? tarea.progreso?.completadaEn : null) ||
    tarea.progreso?.iniciadaEn ||
    tarea.updatedAt ||
    tarea.actualizadaEn ||
    tarea.createdAt ||
    tarea.creadaEn ||
    tarea.fechaInicio
  );
}

function formatearFechaHoraEstado(tarea = {}) {
  const fecha = fechaEstadoTarea(tarea);
  if (!fecha) return "Fecha no disponible";

  const opciones = {
    day: "numeric",
    month: "short",
    year: "numeric"
  };

  if (!fecha.__soloFechaAcademia) {
    opciones.hour = "2-digit";
    opciones.minute = "2-digit";
  }

  return new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
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

function nombrePersona(persona = {}) {
  const nombreCompletoCalculado = [persona.nombre, persona.apellidos]
    .filter(Boolean)
    .join(" ")
    .trim();

  return String(
    persona.nombreVisible ||
    persona.nombreCompleto ||
    nombreCompletoCalculado ||
    persona.nombre ||
    ""
  ).trim();
}

function registrarActorAuditoria(identificadores = [], nombre = "") {
  const etiqueta = String(nombre || "").trim();
  if (!etiqueta) return;

  identificadores
    .map(valor => String(valor || "").trim())
    .filter(Boolean)
    .forEach(id => actoresAuditoria.set(id, etiqueta));
}

async function inicializarActoresAuditoria() {
  actoresAuditoria.clear();

  try {
    const contexto = await ContextoUsuario.inicializar();
    const nombrePropio = nombrePersona(contexto.personaUsuario);
    const nombreActivo = nombrePersona(contexto.personaActiva);

    registrarActorAuditoria(
      [
        contexto.usuario?.userId,
        contexto.usuario?.uid,
        contexto.usuario?.id,
        contexto.userId,
        contexto.uid
      ],
      nombrePropio
    );

    registrarActorAuditoria(
      [
        contexto.userIdPersonaActiva,
        contexto.usuarioPersonaActiva?.userId,
        contexto.usuarioPersonaActiva?.uid,
        contexto.usuarioPersonaActiva?.id
      ],
      nombreActivo
    );

    if (await ContextoUsuario.esAdministrador()) {
      const usuarios = await Academia.administracion.usuarios.listar();

      usuarios.forEach(item => {
        const nombre =
          nombrePersona(item.persona || {}) ||
          String(item.nombreVisible || item.nombreCompleto || item.login || "").trim();

        registrarActorAuditoria(
          [
            item.userId,
            item.uid,
            item.id,
            item.usuario?.userId,
            item.usuario?.uid,
            item.usuario?.id
          ],
          nombre
        );
      });
    }
  } catch (error) {
    console.debug("No se pudieron resolver todos los nombres para auditoría.", error);
  }
}

function etiquetaActor(userId) {
  const id = String(userId || "").trim();
  if (!id) return "No disponible";

  return actoresAuditoria.get(id) || "Usuario autorizado";
}

function formatearFechaHoraAuditoria(valor) {
  const fecha = fechaDesdeValor(valor);
  if (!fecha) return "No disponible";

  const opciones = {
    day: "numeric",
    month: "short",
    year: "numeric"
  };

  if (!fecha.__soloFechaAcademia) {
    opciones.hour = "2-digit";
    opciones.minute = "2-digit";
  }

  return new Intl.DateTimeFormat("es-ES", opciones).format(fecha);
}

function nombreModulo(modulo, tarea = {}) {
  if (tarea?.tipo === "repaso_academico") {
    return "Repaso académico";
  }

  return NOMBRES_MODULO[modulo] || String(modulo || "Actividad");
}

function esEstadoEnEspera(estado) {
  return ESTADOS_EN_ESPERA.has(estado);
}

function auditoriaTareaHtml(tarea = {}) {
  const createdAt = tarea.createdAt || tarea.creadaEn;
  const createdBy = tarea.createdBy || tarea.creadaPorUid;
  const assignedBy =
    tarea.assignedBy ||
    tarea.asignadaPorUid ||
    tarea.asignadaPor?.uid;
  const updatedAt = tarea.updatedAt || tarea.actualizadaEn;
  const updatedBy = tarea.updatedBy;
  const statusChangedAt = tarea.statusChangedAt;
  const statusChangedBy = tarea.statusChangedBy;

  const fila = (etiqueta, fecha, actor, soloActor = false) => {
    const actorId = String(actor || "").trim();
    const actorHtml = actorId
      ? `<span title="${escapar(actorId)}">${escapar(etiquetaActor(actorId))}</span>`
      : "No disponible";

    return `
      <div class="auditoria-mision__fila">
        <dt>${escapar(etiqueta)}</dt>
        <dd>${
          soloActor
            ? actorHtml
            : `${escapar(formatearFechaHoraAuditoria(fecha))} · ${actorHtml}`
        }</dd>
      </div>`;
  };

  return `
    <details class="auditoria-mision">
      <summary>🔎 Datos de auditoría</summary>
      <dl>
        ${fila("Creada", createdAt, createdBy)}
        ${fila("Asignada por", null, assignedBy, true)}
        ${fila("Última modificación", updatedAt, updatedBy)}
        ${fila("Último cambio de estado", statusChangedAt, statusChangedBy)}
      </dl>
    </details>`;
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
      ![
        "completada",
        "pendiente_validacion",
        "completada_pendiente_validacion",
        "cancelada"
      ].includes(tarea.estado)
    )
    .sort(compararMisiones);
}

function tareasFiltradas() {
  if (filtroActual === "todas") return tareas;

  if (filtroActual === "espera") {
    return tareas.filter(tarea =>
      ["pendiente_validacion", "completada_pendiente_validacion"].includes(tarea.estado)
    );
  }

  if (filtroActual === "completadas") {
    return tareas.filter(tarea => tarea.estado === "completada");
  }

  return tareas
    .filter(tarea =>
      ![
        "completada",
        "pendiente_validacion",
        "completada_pendiente_validacion",
        "cancelada"
      ].includes(tarea.estado)
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
        : filtroActual === "espera"
          ? "No hay Misiones esperando revisión."
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
            <div class="tarea-card__estado-contenido">
              <span class="tarea-estado estado-${escapar(tarea.estado)}">
                ${escapar(textoEstado(tarea.estado))}
              </span>
              <span class="tarea-card__estado-meta" title="Módulo · Último cambio de estado">
                🎯 ${escapar(nombreModulo(tarea.modulo, tarea))} · ⏳ ${escapar(formatearFechaHoraEstado(tarea))}
              </span>
            </div>
            <span class="tarea-card__flecha" aria-hidden="true">⌄</span>
          </div>
        </summary>

        <div class="tarea-card__detalle">

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

        ${contextoAcademicoHtml(tarea, "contexto-academico--preview")}

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
                     <p>Consulta las actividades relacionadas y abre el detalle cuando lo necesites.</p>
                   </div>
                   <button class="btn secundaria"
                           data-action="evidence"
                           data-id="${escapar(tarea.id)}">
                     ${
                       evidenciasAbiertas.has(tarea.id)
                         ? "Ocultar trabajo realizado"
                         : "Ver trabajo realizado"
                     }
                   </button>
                 </div>
                 <div class="evidencias-mision__lista ${evidenciasAbiertas.has(tarea.id) ? "" : "hidden"}"
                      data-evidencias-lista="${escapar(tarea.id)}"></div>
               </section>`
            : ""
        }

        ${auditoriaTareaHtml(tarea)}

        <div class="tarea-acciones">
          ${
            tarea.estado === "completada"
              ? `<button class="btn accion-editar"
                    data-action="view"
                    data-id="${escapar(tarea.id)}">
                   👁️ Ver detalles
                 </button>`
              : `<button class="btn accion-editar"
                    data-action="edit"
                    data-id="${escapar(tarea.id)}">
                   ✏️ Editar
                 </button>`
          }

          ${
            visible && ![
              "completada",
              "pendiente_validacion",
              "completada_pendiente_validacion",
              "cancelada"
            ].includes(tarea.estado)
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
            destino &&
            ![
              "pendiente_validacion",
              "completada_pendiente_validacion",
              "completada",
              "cancelada"
            ].includes(tarea.estado)
              ? `<button class="btn accion-iniciar"
                    data-action="start"
                    data-id="${escapar(tarea.id)}"
                    data-url="${escapar(destino)}">
                   ▶️ Abrir actividad
                 </button>`
              : ""
          }

          ${
            esEstadoEnEspera(tarea.estado)
              ? `<button class="btn accion-completar"
                    data-action="complete"
                    data-id="${escapar(tarea.id)}">
                   ✅ Cerrar misión
                 </button>
                 <button class="btn accion-reabrir"
                    data-action="return"
                    data-id="${escapar(tarea.id)}">
                   ↩️ Devolver a En aventura
                 </button>`
              : !["completada", "cancelada"].includes(tarea.estado)
                ? `<button class="btn accion-completar"
                      data-action="complete"
                      data-id="${escapar(tarea.id)}">
                     ✅ Marcar completada
                   </button>`
                : ""
          }

          ${
            !["completada", "cancelada"].includes(tarea.estado) &&
            !esEstadoEnEspera(tarea.estado)
              ? `<button class="btn accion-ayuda"
                    data-action="help"
                    data-id="${escapar(tarea.id)}">
                   🤝 Necesita ayuda
                 </button>`
              : ""
          }

          ${
            tarea.estado === "completada"
              ? `<span class="mision-conservada" title="Esta misión forma parte del historial">
                   🔒 Conservada en el historial
                 </span>`
              : esEstadoEnEspera(tarea.estado)
                ? ""
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

function urlResumenTrabajoDetectives(id) {
  const destino = new URL(
    "../aventuras-matematicas/detectives/trabajo-realizado.html",
    window.location.href
  );
  destino.searchParams.set("misionId", id);
  destino.searchParams.set(
    "volver",
    `${window.location.pathname}${window.location.search}`
  );
  return destino.href;
}

function urlResultadoAcademico(evidencia = {}, misionId = "") {
  const sesionId = String(evidencia.sesionId || "").trim();
  if (!sesionId) return "";

  const destino = new URL("./resultado-academico.html", window.location.href);
  destino.searchParams.set("sesionId", sesionId);
  if (misionId) destino.searchParams.set("misionId", misionId);
  destino.searchParams.set(
    "volver",
    `${window.location.pathname}${window.location.search}`
  );
  return destino.href;
}

function esEvidenciaAcademica(evidencia = {}) {
  return (
    String(evidencia.tipo || "") === "sesion_academica" ||
    String(evidencia.origen || "") === "sesion_academica"
  );
}

function urlRecursoTrabajoMision(tarea = {}) {
  const valor = String(tarea.destinoUrl || "").trim();
  if (!valor) return "";

  try {
    const url = new URL(valor, window.location.href);

    if (!["http:", "https:"].includes(url.protocol)) {
      return "";
    }

    return url.href;
  } catch {
    return "";
  }
}

function recursoTrabajoMisionHtml(tarea = {}) {
  /*
   * El recurso original NO es la evidencia: la evidencia es la sesión
   * académica guardada. Mantenemos este acceso para que la familia pueda
   * consultar el material asignado sin alterar el resultado histórico.
   */
  if (tarea.tipo !== "repaso_academico") return "";

  const url = urlRecursoTrabajoMision(tarea);
  if (!url) return "";

  const contexto = [
    tarea.cursoReferencia ? `${tarea.cursoReferencia}.º de Primaria` : "",
    String(tarea.materia || "").trim(),
    String(tarea.tema || "").trim()
  ].filter(Boolean);

  return `
    <article class="recurso-mision-trabajo">
      <div class="recurso-mision-trabajo__icono" aria-hidden="true">📘</div>

      <div class="recurso-mision-trabajo__contenido">
        <strong>Actividad de la misión</strong>
        <small>
          ${
            contexto.length
              ? escapar(contexto.join(" · "))
              : "Recurso original asignado para este repaso."
          }
        </small>
      </div>

      <a
        class="btn secundaria recurso-mision-trabajo__enlace"
        href="${escapar(url)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        🔗 Abrir actividad
      </a>
    </article>
  `;
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
    const tarea = tareas.find(item => item.id === id);
    const recursoHtml = recursoTrabajoMisionHtml(tarea);
    const evidencias = await Academia.tareas.leerEvidencias(id);

    if (!evidencias.length) {
      const mensajeSinEvidencia =
        tarea?.tipo === "repaso_academico"
          ? "Todavía no hay una sesión académica guardada para este repaso."
          : "Todavía no hay evidencias relacionadas con esta misión.";

      contenedor.innerHTML =
        recursoHtml +
        `<div class="evidencias-mision__vacia">${escapar(mensajeSinEvidencia)}</div>`;
      return;
    }

    const esDetectives = tarea?.modulo === "detectives";

    const actividadesHtml = evidencias.map((evidencia, indice) => {
      const intentos = Number(
        evidencia.resultado?.intentos ??
        evidencia.resultado?.intentosRealizados ??
        0
      );
      const pistas = Number(evidencia.resultado?.pistas || 0);
      const nivel = evidencia.atributos?.nivel ?? "—";
      const esAcademica = esEvidenciaAcademica(evidencia);
      const esBiblioteca = evidencia.modulo === "biblioteca";
      const esLectura = evidencia.modulo === "rincon-lectura";
      const esSemillas = evidencia.modulo === "creciendo-por-dentro";
      const esDetectives = evidencia.modulo === "detectives";

      const titulo =
        evidencia.resultado?.titulo ||
        evidencia.tituloActividad ||
        evidencia.actividadId ||
        `Actividad ${indice + 1}`;

      const fecha = fechaEvidencia(evidencia.ocurridaEn);
      const resumenAcademico =
        evidencia.resultado?.resumen &&
        typeof evidencia.resultado.resumen === "object"
          ? evidencia.resultado.resumen
          : {};

      const detalleActividad = esAcademica
        ? [
            Number(resumenAcademico.totalPreguntas || 0) > 0
              ? `${Number(resumenAcademico.totalCorrectas || 0)}/${Number(resumenAcademico.totalPreguntas)} correctas`
              : "",
            Number.isFinite(Number(resumenAcademico.porcentaje))
              ? `${Number(resumenAcademico.porcentaje)} %`
              : "",
            fecha
          ].filter(Boolean).join(" · ")
        : esBiblioteca
          ? [
              Number(evidencia.resultado?.duracionAudio || 0) > 0
                ? `🎙️ ${Math.round(Number(evidencia.resultado.duracionAudio))} s`
                : "",
              Number(evidencia.resultado?.palabrasReconocidas || 0) > 0
                ? `🗣️ ${Number(evidencia.resultado.palabrasReconocidas)} palabras`
                : "",
              fecha
            ].filter(Boolean).join(" · ")
          : esLectura
            ? [
                nivel !== "—" ? `Nivel ${nivel}` : "",
                Number(evidencia.resultado?.duracion || 0) > 0
                  ? `🎙️ ${Math.round(Number(evidencia.resultado.duracion))} s`
                  : "",
                Number(evidencia.resultado?.intentosComprension || 0) > 0
                  ? `🧠 ${Number(evidencia.resultado.intentosComprension)} intentos comprensión`
                  : "",
                fecha
              ].filter(Boolean).join(" · ")
            : esSemillas
              ? [
                  evidencia.atributos?.tipoSituacion
                    ? `Situación: ${evidencia.atributos.tipoSituacion}`
                    : "",
                  evidencia.atributos?.nivelApoyo
                    ? `Apoyo: nivel ${evidencia.atributos.nivelApoyo}`
                    : "",
                  intentos > 0
                    ? `${intentos} ${intentos === 1 ? "intento" : "intentos"}`
                    : "",
                  Number(evidencia.resultado?.duracionAudio || 0) > 0
                    ? `🎙️ ${Math.round(Number(evidencia.resultado.duracionAudio))} s`
                    : "",
                  fecha
                ].filter(Boolean).join(" · ")
              : esDetectives
                ? (
                    `Nivel ${nivel} · ${intentos} intentos · ${pistas} pistas` +
                    ` · ${fecha}`
                  )
                : fecha;

      const parametros = new URLSearchParams({
        id: evidencia.actividadId || "",
        sesionId: evidencia.sesionId || "",
        misionId: id,
        volver: `${window.location.pathname}${window.location.search}`
      });

      const volver = encodeURIComponent(
        `${window.location.pathname}${window.location.search}`
      );

      const destinoCorrecto = esAcademica
        ? (urlResultadoAcademico(evidencia, id) || evidencia.destinoRevision || "#")
        : evidencia.modulo === "rincon-lectura"
          ? (
              `../rincon-lectura/?vista=historial` +
              `&misionId=${encodeURIComponent(id)}` +
              `&historiaId=${encodeURIComponent(evidencia.actividadId || "")}` +
              `&sesionId=${encodeURIComponent(evidencia.sesionId || "")}` +
              `&volver=${volver}`
            )
          : evidencia.modulo === "creciendo-por-dentro"
            ? (
                `../creciendo-por-dentro/?vista=historial` +
                `&misionId=${encodeURIComponent(id)}` +
                `&sesionId=${encodeURIComponent(evidencia.sesionId || "")}` +
                `&volver=${volver}`
              )
            : evidencia.modulo === "biblioteca"
              ? (
                  `../biblioteca/?misionId=${encodeURIComponent(id)}` +
                  `&libroId=${encodeURIComponent(evidencia.actividadId || evidencia.resultado?.libroId || "")}` +
                  `&volver=${volver}`
                )
              : evidencia.modulo === "detectives"
                ? `../aventuras-matematicas/detectives/historia.html?${parametros.toString()}`
                : (evidencia.destinoRevision || "#");

      return `
        <article class="evidencia-item">
          <div class="evidencia-item__icono">✅</div>
          <div class="evidencia-item__contenido">
            <strong>${escapar(titulo)}</strong>
            <small>${escapar(detalleActividad)}</small>
          </div>
          <a class="btn secundaria evidencia-item__enlace"
             href="${escapar(destinoCorrecto)}">
            ${
               esAcademica
                 ? "Ver resultado"
                 : evidencia.modulo === "rincon-lectura"
                   ? "Ver lectura"
                   : evidencia.modulo === "creciendo-por-dentro"
                     ? "Ver práctica"
                     : evidencia.modulo === "biblioteca"
                       ? "Ver ficha"
                       : evidencia.modulo === "detectives"
                         ? "Ver resolución"
                         : "Ver detalle"
             }
          </a>
        </article>`;
    }).join("");

    const resumenCompletoHtml = esDetectives
      ? `<div class="evidencias-mision__resumen-completo">
           <a class="btn secundaria evidencias-mision__resumen-enlace"
              href="${escapar(urlResumenTrabajoDetectives(id))}">
             📊 Ver resumen completo
           </a>
         </div>`
      : "";

    contenedor.innerHTML =
      recursoHtml +
      actividadesHtml +
      resumenCompletoHtml;
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
      button.disabled = false;
      cargarTareaEnFormulario(tarea);
      return;
    }

    if (action === "view") {
      button.disabled = false;
      cargarTareaEnFormulario(tarea, { soloLectura: true });
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
      button.disabled = false;
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

    if (action === "return") {
      const confirmado = confirm(
        "¿Devolver esta misión a En aventura?\n\n" +
        "El trabajo ya realizado se conservará y el alumno podrá continuar."
      );

      if (!confirmado) {
        button.disabled = false;
        return;
      }

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

const textosAutomaticosSemillas = {
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

    if (id === "descripcionMision" && descripcionMisionPersonalizada && !forzar) {
      return;
    }

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

  [
    ["descripcionMision", "descripcionMision"],
    ["criterio", "criterio"]
  ].forEach(([id, clave]) => {
    const actual = $(id).value.trim();
    const anterior = textosAutomaticosSemillas[clave];

    if (id === "descripcionMision" && descripcionMisionPersonalizada && !forzar) {
      return;
    }

    if (forzar || !actual || !anterior || actual === anterior) {
      $(id).value = textos[clave];
    }
  });

  Object.assign(textosAutomaticosSemillas, textos);
  actualizarVistaPrevia();
}

function reiniciarTextosAutomaticosSemillas() {
  Object.keys(textosAutomaticosSemillas).forEach(
    clave => textosAutomaticosSemillas[clave] = ""
  );
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

function esRepasoAcademicoFormulario() {
  return $("tipo")?.value === "repaso_academico";
}

function cursoAcademicoTexto(valor = $("cursoReferencia")?.value) {
  const curso = String(valor || "").trim();
  return curso ? `${curso}.º de Primaria` : "Curso sin indicar";
}

function datosAcademicosFormulario() {
  return {
    cursoReferencia: String($("cursoReferencia")?.value || "").trim(),
    materia: String($("materia")?.value || "").trim(),
    tema: String($("tema")?.value || "").trim(),
    recursoUrl: String($("recursoAcademicoUrl")?.value || "").trim()
  };
}

function tituloRepasoAcademico() {
  const { materia, tema } = datosAcademicosFormulario();

  if (tema && materia) return `Repasar ${tema} · ${materia}`;
  if (tema) return `Repasar ${tema}`;
  if (materia) return `Repaso de ${materia}`;
  return "Misión de repaso académico";
}

function actualizarResumenAcademico() {
  const resumen = $("resumenAcademico");
  if (!resumen) return;

  const { cursoReferencia, materia, tema } = datosAcademicosFormulario();
  resumen.textContent = [
    cursoAcademicoTexto(cursoReferencia),
    materia || "Materia por indicar",
    tema || "Tema por indicar"
  ].join(" · ");
}

function aplicarTextosAutomaticosAcademicos({ forzar = false } = {}) {
  if (!esRepasoAcademicoFormulario()) return;

  const { materia, tema } = datosAcademicosFormulario();
  const titulo = tituloRepasoAcademico();

  $("titulo").value = titulo;
  $("tituloMision").value = titulo;

  if (forzar || !String($("descripcionMision").value || "").trim() || !descripcionMisionPersonalizada) {
    $("descripcionMision").value = tema
      ? `Vamos a repasar ${tema}${materia ? ` de ${materia}` : ""} con calma.`
      : "Vamos a repasar este tema con calma y paso a paso.";
  }

  if (forzar || !String($("objetivo").value || "").trim()) {
    $("objetivo").value = tema
      ? `Reforzar los conocimientos de ${tema}${materia ? ` en ${materia}` : ""}.`
      : "Reforzar un contenido académico antes de avanzar al siguiente curso.";
  }

  if (forzar || !String($("criterio").value || "").trim()) {
    $("criterio").value =
      "Completar la prueba final del repaso. La sesión guardada quedará como trabajo realizado y pasará a revisión familiar.";
  }

  if (forzar || !String($("mensajeMision").value || "").trim()) {
    $("mensajeMision").value =
      "📘 Repasa a tu ritmo. Lo importante es recordar, practicar y preguntar cuando algo no esté claro.";
  }

  actualizarResumenAcademico();
  actualizarVistaPrevia();
}

function actualizarTipoMision({ completarSugerencias = false } = {}) {
  const academica = esRepasoAcademicoFormulario();
  const modulo = $("modulo");
  const bloque = $("configuracionAcademica");

  bloque?.classList.toggle("hidden", !academica);
  $("formTarea")?.classList.toggle("repaso-academico-activo", academica);

  if (modulo) {
    if (academica) {
      modulo.value = "libre";
      modulo.disabled = true;
      seleccionarIcono("📘");
      if (completarSugerencias) {
        aplicarTextosAutomaticosAcademicos({ forzar: true });
      } else {
        actualizarResumenAcademico();
      }
    } else {
      modulo.disabled = false;
    }
  }
}

function contextoAcademicoHtml(tarea = {}, claseExtra = "") {
  if (tarea.tipo !== "repaso_academico") return "";

  const items = [
    tarea.cursoReferencia ? `📘 ${tarea.cursoReferencia}.º` : "",
    tarea.materia ? `📚 ${tarea.materia}` : "",
    tarea.tema ? `🎯 ${tarea.tema}` : ""
  ].filter(Boolean);

  if (!items.length) return "";

  return `
    <div class="contexto-academico ${claseExtra}">
      ${items.map(item => `<span>${escapar(item)}</span>`).join("")}
    </div>
  `;
}

function tituloAutomaticoPorModulo() {
  const modulo = $("modulo").value;

  if (esRepasoAcademicoFormulario()) {
    return tituloRepasoAcademico();
  }

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
  if (id === "descripcionMision" && descripcionMisionPersonalizada) {
    return false;
  }

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

function aplicarTextosAutomaticosBiblioteca() {
  const titulo = "Compartir un libro con Lía";
  const descripcion =
    "Elige un libro registrado en tu Biblioteca y cuéntaselo a Lía con tus propias palabras. " +
    "La Academia lo marcará como Terminado cuando guardes una grabación de al menos 15 segundos " +
    "y una transcripción de al menos 15 palabras.";

  $("titulo").value = titulo;
  $("tituloMision").value = titulo;

  if (!descripcionMisionPersonalizada) {
    $("descripcionMision").value = descripcion;
  }

  $("objetivo").value =
    "Expresar con claridad las ideas principales de un libro y fortalecer la comunicación verbal.";
  $("criterio").value =
    "Compartir un libro con una grabación de al menos 15 segundos y una transcripción de al menos 15 palabras.";
  $("mensajeMision").value =
    "🦜 Cuéntame el libro con calma y con tus propias palabras. Yo te indicaré qué falta antes de terminar.";
}

function actualizarConfiguracionPorModulo({
  completarSugerencias = false
} = {}) {
  const modulo = $("modulo").value;
  const esDetectives = modulo === "detectives";
  const esLectura = modulo === "rincon-lectura";
  const esSemillas = modulo === "creciendo-por-dentro";
  const esBiblioteca = modulo === "biblioteca";
  const esAcademica = esRepasoAcademicoFormulario();

  $("configuracionDetectives")?.classList.toggle("hidden", !esDetectives || esAcademica);
  $("configuracionLectura")?.classList.toggle("hidden", !esLectura || esAcademica);
  $("configuracionSemillas")?.classList.toggle("hidden", !esSemillas || esAcademica);

  if (esAcademica) {
    actualizarResumenAcademico();
    return;
  }

  $("configuracionDetectives")?.classList.toggle("hidden", !esDetectives);
  $("configuracionLectura")?.classList.toggle("hidden", !esLectura);
  $("configuracionSemillas")?.classList.toggle("hidden", !esSemillas);

  if (esSemillas) {
    reiniciarTextosAutomaticosDetectives();
    reiniciarTextosAutomaticosLectura();
    actualizarResumenCriterioSemillas();
    if (completarSugerencias) {
      aplicarTextosAutomaticosSemillas();
    }
    return;
  }

  if (esDetectives) {
    reiniciarTextosAutomaticosLectura();
    reiniciarTextosAutomaticosSemillas();
    actualizarResumenCriterioDetectives();
    if (completarSugerencias) aplicarTextosAutomaticosDetectives();
    return;
  }

  if (esLectura) {
    reiniciarTextosAutomaticosDetectives();
    reiniciarTextosAutomaticosSemillas();
    reiniciarTextosAutomaticosLectura();
    actualizarResumenCriterioLectura();
    if (completarSugerencias) aplicarTextosAutomaticosLectura();
    return;
  }

  if (esBiblioteca) {
    reiniciarTextosAutomaticosDetectives();
    reiniciarTextosAutomaticosLectura();
    reiniciarTextosAutomaticosSemillas();
    if (completarSugerencias) aplicarTextosAutomaticosBiblioteca();
    return;
  }

  reiniciarTextosAutomaticosDetectives();
  reiniciarTextosAutomaticosLectura();
  reiniciarTextosAutomaticosSemillas();
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

function misionYaIniciada(tarea = {}) {
  return Boolean(
    tarea &&
    !["pendiente", "asignada"].includes(String(tarea.estado || "pendiente"))
  );
}

function aplicarBloqueoCriterio(tarea = null) {
  const bloqueada = misionYaIniciada(tarea);
  const ids = [
    "tipo",
    "modulo",
    "cantidadHistorias",
    "nivelDetectives",
    "cantidadLecturas",
    "nivelLectura",
    "cantidadSemillas",
    "semillaPrimera",
    "semillaSegunda"
  ];

  ids.forEach(id => {
    const control = $(id);
    if (!control) return;
    control.disabled = bloqueada;
    control.setAttribute("aria-disabled", bloqueada ? "true" : "false");
    control.title = bloqueada
      ? "Este dato define qué actividad cumple la misión y no puede cambiarse después de iniciarla."
      : "";
  });

  $("formTarea")?.classList.toggle("criterio-bloqueado", bloqueada);
}

function inicializarReferenciasTextosAutomaticos(tarea = {}) {
  const criterio = criterioCumplimientoTarea(tarea);

  if (tarea.modulo === "rincon-lectura") {
    Object.assign(
      textosAutomaticosLectura,
      crearTextosLectura(
        normalizarCantidadLecturas(
          criterio.cantidadObjetivo ?? tarea.progreso?.cantidadObjetivo,
          2
        ),
        normalizarNivelLectura(criterio.filtros?.nivel)
      )
    );
    return;
  }

  if (tarea.modulo === "detectives") {
    Object.assign(
      textosAutomaticosDetectives,
      crearTextosDetectives(
        normalizarCantidadHistorias(
          criterio.cantidadObjetivo ?? tarea.progreso?.cantidadObjetivo,
          5
        ),
        normalizarNivelDetectives(criterio.filtros?.nivel, 1)
      )
    );
    return;
  }

  if (tarea.modulo === "creciendo-por-dentro") {
    const cantidad = normalizarCantidadSemillas(
      criterio.cantidadObjetivo ?? tarea.progreso?.cantidadObjetivo,
      1
    );
    const ids = Array.isArray(criterio.filtros?.semillasIds)
      ? criterio.filtros.semillasIds.map(String).slice(0, cantidad)
      : [];
    Object.assign(
      textosAutomaticosSemillas,
      crearTextosSemillas(cantidad, ids)
    );
  }
}

function aplicarModoSoloLecturaFormulario(activar) {
  const form = $("formTarea");
  formularioSoloLectura = Boolean(activar);
  form.classList.toggle("modo-consulta", formularioSoloLectura);

  if (formularioSoloLectura) {
    form.querySelectorAll("input, textarea, select, button").forEach(control => {
      if (control.id === "cancelarEdicion") return;
      if (!control.disabled) {
        control.dataset.bloqueadoPorConsulta = "1";
        control.disabled = true;
      }
    });

    $("guardarTarea").classList.add("hidden");
    const reset = form.querySelector('button[type="reset"]');
    reset?.classList.add("hidden");
    $("cancelarEdicion").classList.remove("hidden");
    $("cancelarEdicion").textContent = "← Volver";
    return;
  }

  form.querySelectorAll("[data-bloqueado-por-consulta]").forEach(control => {
    control.disabled = false;
    delete control.dataset.bloqueadoPorConsulta;
  });

  $("guardarTarea").classList.remove("hidden");
  const reset = form.querySelector('button[type="reset"]');
  reset?.classList.remove("hidden");
  $("cancelarEdicion").textContent = "Cancelar edición";
}

function limpiarFormulario({ conservarMensaje = false } = {}) {
  aplicarModoSoloLecturaFormulario(false);
  reiniciarTextosAutomaticosDetectives();
  reiniciarTextosAutomaticosLectura();
  reiniciarTextosAutomaticosSemillas();
  descripcionMisionPersonalizada = false;
  aplicarBloqueoCriterio(null);
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
  $("cursoReferencia").value = "5";
  $("materia").value = "";
  $("tema").value = "";
  $("recursoAcademicoUrl").value = "";
  $("modulo").disabled = false;
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
  actualizarTipoMision();
  actualizarConfiguracionPorModulo({ completarSugerencias: true });
  actualizarResumenCriterioDetectives();
  actualizarResumenCriterioSemillas();
  actualizarTituloAutomatico();
  actualizarBloqueResultado("pendiente");
  establecerAcordeones("crear");
}

function cargarTareaEnFormulario(tarea, { soloLectura = false } = {}) {
  const presentacion = tarea.presentacionAlumno || {};

  $("tareaId").value = tarea.id;
  $("titulo").value = tarea.titulo || "";
  $("descripcion").value = tarea.descripcion || "";
  $("tipo").value = tarea.tipo || "actividad_modulo";
  $("modulo").value = tarea.modulo || "libre";
  $("cursoReferencia").value = tarea.cursoReferencia || "5";
  $("materia").value = tarea.materia || "";
  $("tema").value = tarea.tema || "";
  $("recursoAcademicoUrl").value =
    tarea.tipo === "repaso_academico" ? (tarea.destinoUrl || "") : "";
  actualizarTipoMision();
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

  aplicarBloqueoCriterio(tarea);
  actualizarEstadoMision();
  actualizarConfiguracionPorModulo();
  inicializarReferenciasTextosAutomaticos(tarea);

  const descripcionGuardada = String(presentacion.descripcionMision || "").trim();
  const descripcionAutomatica = String(
    tarea.modulo === "rincon-lectura"
      ? textosAutomaticosLectura.descripcionMision
      : tarea.modulo === "detectives"
        ? textosAutomaticosDetectives.descripcionMision
        : tarea.modulo === "creciendo-por-dentro"
          ? textosAutomaticosSemillas.descripcionMision
          : ""
  ).trim();

  descripcionMisionPersonalizada = Boolean(
    descripcionGuardada &&
    (!descripcionAutomatica || descripcionGuardada !== descripcionAutomatica)
  );

  actualizarResumenCriterioDetectives();
  actualizarResumenCriterioSemillas();
  actualizarVistaPrevia();
  actualizarBloqueResultado(tarea.estado);
  establecerAcordeones("editar");

  if (soloLectura) {
    $("tituloFormulario").textContent = "Detalles de la misión";
    $("subtituloFormulario").textContent =
      "Misión conseguida y conservada como parte del historial.";
    aplicarModoSoloLecturaFormulario(true);
  } else {
    aplicarModoSoloLecturaFormulario(false);
  }

  cambiarVista("crear");

  window.scrollTo({
    top: $("panelCrear").offsetTop - 20,
    behavior: "smooth"
  });
}

function recogerFormulario() {
  const modulo = $("modulo").value;
  const visible = $("visibleParaAlumno").checked;
  const esAcademica = esRepasoAcademicoFormulario();
  const datosAcademicos = datosAcademicosFormulario();
  const esDetectives = modulo === "detectives" && !esAcademica;
  const esLectura = modulo === "rincon-lectura";
  const esSemillas = modulo === "creciendo-por-dentro";
  const esBiblioteca = modulo === "biblioteca";

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
    cursoReferencia: esAcademica ? datosAcademicos.cursoReferencia : "",
    materia: esAcademica ? datosAcademicos.materia : "",
    tema: esAcademica ? datosAcademicos.tema : "",
    modulo,
    destinoUrl: esAcademica
      ? datosAcademicos.recursoUrl
      : (DESTINOS[modulo] || ""),
    objetivo: $("objetivo").value,
    criterioFinalizacion: $("criterio").value,
    criterioCumplimiento: esAcademica
      ? {
          tipo: "cantidad",
          modulo: "libre",
          evidenciaTipo: "sesion_academica",
          cantidadObjetivo: 1,
          filtros: {}
        }
      : esDetectives
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
            : esBiblioteca
              ? {
                  tipo: "cantidad",
                  modulo: "biblioteca",
                  evidenciaTipo: "libro_compartido",
                  cantidadObjetivo: 1,
                  filtros: {}
                }
              : undefined,
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
    progreso: esAcademica
      ? {
          cantidadObjetivo: 1
        }
      : esDetectives
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
            : esBiblioteca
              ? {
                  cantidadObjetivo: 1
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
    "mensajeMision",
    "descripcion"
  ].forEach(id => {
    $(id).addEventListener("input", actualizarVistaPrevia);
  });

  $("descripcionMision").addEventListener("input", () => {
    descripcionMisionPersonalizada = true;
    actualizarVistaPrevia();
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

  $("tipo").addEventListener("change", () => {
    const eraAcademica = esRepasoAcademicoFormulario();
    actualizarTipoMision({ completarSugerencias: eraAcademica });
    actualizarConfiguracionPorModulo({
      completarSugerencias: !eraAcademica
    });
    actualizarTituloAutomatico();
  });

  ["cursoReferencia", "materia", "tema"].forEach(id => {
    $(id)?.addEventListener("input", () => {
      actualizarResumenAcademico();
      if (esRepasoAcademicoFormulario()) {
        aplicarTextosAutomaticosAcademicos();
      }
    });

    $(id)?.addEventListener("change", () => {
      actualizarResumenAcademico();
      if (esRepasoAcademicoFormulario()) {
        aplicarTextosAutomaticosAcademicos();
      }
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
        aplicarTextosAutomaticosSemillas();
      }
    });

    $(id)?.addEventListener("change", () => {
      actualizarResumenCriterioSemillas();

      if ($("modulo").value === "creciendo-por-dentro") {
        aplicarTextosAutomaticosSemillas();
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
    if (formularioSoloLectura) return;

    const mensaje = $("mensajeFormulario");
    const id = $("tareaId").value.trim();
    const datos = recogerFormulario();

    if (
      datos.tipo === "repaso_academico" &&
      (!datos.cursoReferencia || !datos.materia || !datos.tema)
    ) {
      $("mensajeFormulario").className = "mensaje-formulario error";
      $("mensajeFormulario").textContent =
        "Indica curso, materia y tema para la Misión de repaso académico.";

      if (!datos.materia) $("materia").focus();
      else if (!datos.tema) $("tema").focus();
      else $("cursoReferencia").focus();
      return;
    }

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
    await inicializarActoresAuditoria();

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
