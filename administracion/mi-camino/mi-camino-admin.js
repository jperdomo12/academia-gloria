import { TEMAS_MATEMATICAS } from "../../cursos/6to/mates/temas-matematicas.js";
import { Academia } from "../../compartido/api/academia.js";
import {
  guardarConfiguracionMiCamino,
  leerConfiguracionMiCamino
} from "../../compartido/api/mi-camino-config.js";
import { auth, db } from "../../compartido/firebase/firebase-config.js";
import { protegerPagina } from "../../compartido/js/auth-guard.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";
import {
  ETAPAS_CRECIMIENTO,
  CONFIGURACION_CRECIMIENTO_PREDETERMINADA,
  NIVELES_CRECIMIENTO,
  normalizarConfiguracionCrecimiento,
  normalizarNivelCrecimiento,
  obtenerContextoNivelCrecimiento,
  obtenerContextosBaseCrecimiento,
  resumirCrecimiento,
  validarConfiguracionCrecimiento
} from "../../compartido/modelos/mi-camino-crecimiento.js";
import {
  collection,
  deleteField,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const $ = selector => document.querySelector(selector);
const TAMANO_PAGINA = 5;

const estadoAcceso = $("#estadoAcceso");
const zonaAdministracion = $("#zonaAdministracion");
const selectPersona = $("#selectPersona");
const tablaMisiones = $("#tablaMisiones");
const tablaNivelesContexto = $("#tablaNivelesContexto");
const sinMisiones = $("#sinMisiones");
const paginacionMisiones = $("#paginacionMisiones");
const formConfiguracion = $("#formConfiguracion");
const camposEtapas = $("#camposEtapas");
const errorConfiguracion = $("#errorConfiguracion");
const avisoVistaPrevia = $("#avisoVistaPrevia");

let usuarios = [];
let tareas = [];
let paginaActual = 1;
let configuracionGuardada = normalizarConfiguracionCrecimiento(
  CONFIGURACION_CRECIMIENTO_PREDETERMINADA
);
let configuracionVista = configuracionGuardada;
let auditoriaConfiguracion = null;
let configuracionPersistida = false;
let schemaPersistido = 0;
let resumenActual = resumirCrecimiento([], configuracionVista);

function escaparHTML(valor = "") {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function nombrePersona(persona = {}) {
  return persona.nombreVisible ||
    [persona.nombre, persona.apellidos].filter(Boolean).join(" ") ||
    "Persona sin nombre";
}

function personaSeleccionada() {
  return usuarios.find(item => item.userId === selectPersona.value) || null;
}

function nombrePersonaSeleccionada() {
  const seleccion = personaSeleccionada();
  return seleccion ? nombrePersona(seleccion.persona || {}) : "la Persona seleccionada";
}

function nombreUsuarioPorUid(uid = "") {
  if (!uid) return "—";
  const usuario = usuarios.find(item => item.userId === uid);
  return usuario ? nombrePersona(usuario.persona || {}) : "Usuario autorizado";
}

function fechaRegistro(valor) {
  if (!valor) return "—";
  const fecha = typeof valor?.toDate === "function" ? valor.toDate() : new Date(valor);
  if (Number.isNaN(fecha.getTime())) return "—";
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(fecha);
}

function textoEstado(estado = "") {
  return ({
    pendiente: "Pendiente",
    asignada: "Asignada",
    en_curso: "En curso",
    necesita_ayuda: "Necesita ayuda",
    vencida: "Vencida",
    pendiente_validacion: "Pendiente de validación",
    completada_pendiente_validacion: "Pendiente de validación",
    completada: "Completada",
    cancelada: "Cancelada"
  })[estado] || estado || "Sin estado";
}

function claseCategoria(item) {
  if (item.categoria === "prueba") return "badge badge--prueba";
  if (item.categoria === "oculta") return "badge badge--oculta";
  if (item.categoria === "no-completada") return "badge badge--pendiente";
  return "badge badge--ok";
}

function claseNivel(nivel) {
  return nivel ? `badge badge--${nivel}` : "badge badge--oculta";
}

function configuracionesIguales(a, b) {
  return JSON.stringify(normalizarConfiguracionCrecimiento(a)) ===
    JSON.stringify(normalizarConfiguracionCrecimiento(b));
}

function construirCamposEtapas() {
  camposEtapas.innerHTML = ETAPAS_CRECIMIENTO.map((etapa, indice) => `
    <label data-etapa-contenedor="${escaparHTML(etapa.id)}">
      <span>${etapa.icono} ${escaparHTML(etapa.nombre)}</span>
      <input
        type="number"
        min="0"
        step="1"
        data-etapa="${escaparHTML(etapa.id)}"
        ${indice === 0 ? "disabled" : "required"}
      >
      <small>${indice === 0 ? "Inicio fijo" : "unidades desde aquí"}</small>
    </label>
  `).join("");
}

function cargarFormulario(configuracion) {
  configuracionVista = normalizarConfiguracionCrecimiento(configuracion);

  ETAPAS_CRECIMIENTO.forEach(etapa => {
    const input = formConfiguracion.querySelector(`[data-etapa="${etapa.id}"]`);
    if (input) input.value = String(configuracionVista.etapas[etapa.id]);
  });

  renderNivelesContexto();
}

function configuracionDesdeFormulario() {
  const etapas = {};
  ETAPAS_CRECIMIENTO.forEach(etapa => {
    const input = formConfiguracion.querySelector(`[data-etapa="${etapa.id}"]`);
    etapas[etapa.id] = Number(input?.value || 0);
  });
  etapas.semilla = 0;

  return {
    schemaVersion: 2,
    etapas,
    nivelesContexto: {
      areas: { ...configuracionVista.nivelesContexto.areas },
      temas: { ...configuracionVista.nivelesContexto.temas }
    }
  };
}

function mostrarErrorConfiguracion(mensajes = []) {
  const lista = Array.isArray(mensajes) ? mensajes : [mensajes];
  const utiles = lista.filter(Boolean);
  errorConfiguracion.hidden = utiles.length === 0;
  errorConfiguracion.textContent = utiles.join(" ");
}

function actualizarAuditoriaConfiguracion() {
  const creada = auditoriaConfiguracion?.createdAt;
  const creadaPor = auditoriaConfiguracion?.createdBy;
  const actualizada = auditoriaConfiguracion?.updatedAt;
  const actualizadaPor = auditoriaConfiguracion?.updatedBy;

  $("#configCreada").textContent = configuracionPersistida
    ? `Creada: ${fechaRegistro(creada)} · ${nombreUsuarioPorUid(creadaPor)}`
    : "Creada: valores predeterminados del producto";
  $("#configActualizada").textContent = configuracionPersistida
    ? `Última modificación: ${fechaRegistro(actualizada)} · ${nombreUsuarioPorUid(actualizadaPor)}`
    : "Última modificación: todavía no existe configuración persistida";

  if (!configuracionPersistida) {
    $("#estadoConfiguracion").textContent = "Se están usando los valores predeterminados del producto.";
  } else if (schemaPersistido === 1) {
    $("#estadoConfiguracion").textContent =
      "Configuración anterior compatible: los umbrales se conservan y el nuevo modelo de niveles solo se persistirá al guardar.";
  } else {
    $("#estadoConfiguracion").textContent = "Configuración de niveles guardada en Firestore.";
  }
}

function claveContexto(contexto = {}) {
  return `${contexto.areaId || ""}::${contexto.temaId || ""}`;
}

function contextosCatalogoAcademico() {
  const baseMatematicas6 = {
    tipo: "repaso_academico",
    cursoReferencia: "6",
    materia: "Matemáticas",
    tema: ""
  };

  return [
    obtenerContextoNivelCrecimiento(baseMatematicas6),
    ...TEMAS_MATEMATICAS.map(tema =>
      obtenerContextoNivelCrecimiento({
        ...baseMatematicas6,
        tema: tema.titulo
      })
    )
  ];
}

function contextosDisponibles() {
  const mapa = new Map();
  const agregar = contexto => {
    if (!contexto?.areaId) return;
    const id = claveContexto(contexto);
    if (!mapa.has(id)) mapa.set(id, { ...contexto });
  };

  obtenerContextosBaseCrecimiento().forEach(agregar);
  contextosCatalogoAcademico().forEach(agregar);
  tareas.forEach(tarea => agregar(obtenerContextoNivelCrecimiento(tarea)));

  return [...mapa.values()].sort((a, b) =>
    String(a.caminoNombre).localeCompare(String(b.caminoNombre), "es") ||
    String(a.areaNombre).localeCompare(String(b.areaNombre), "es") ||
    String(a.temaNombre).localeCompare(String(b.temaNombre), "es")
  );
}

function opcionesNivelArea(valor = "") {
  const actual = normalizarNivelCrecimiento(valor);
  return `
    <option value="" ${!actual ? "selected" : ""}>Medio · predeterminado</option>
    ${Object.values(NIVELES_CRECIMIENTO).map(nivel => `
      <option value="${nivel.id}" ${actual === nivel.id ? "selected" : ""}>
        ${nivel.nombre} · ${nivel.unidades} ${nivel.unidades === 1 ? "unidad" : "unidades"}
      </option>
    `).join("")}
  `;
}

function opcionesNivelTema(valor = "") {
  const actual = normalizarNivelCrecimiento(valor);
  return `
    <option value="" ${!actual ? "selected" : ""}>Hereda del Área</option>
    ${Object.values(NIVELES_CRECIMIENTO).map(nivel => `
      <option value="${nivel.id}" ${actual === nivel.id ? "selected" : ""}>
        ${nivel.nombre} · ${nivel.unidades} ${nivel.unidades === 1 ? "unidad" : "unidades"}
      </option>
    `).join("")}
  `;
}

function renderNivelesContexto() {
  const contextos = contextosDisponibles();

  tablaNivelesContexto.innerHTML = contextos.map(contexto => {
    const nivelArea = configuracionVista.nivelesContexto.areas[contexto.areaId] || "";
    const nivelTema = contexto.temaId
      ? configuracionVista.nivelesContexto.temas[contexto.temaId] || ""
      : "";

    return `
      <tr>
        <td><strong>${escaparHTML(contexto.caminoNombre)}</strong></td>
        <td>
          <strong>${escaparHTML(contexto.areaNombre)}</strong>
          <small>${escaparHTML(contexto.areaId)}</small>
        </td>
        <td>
          <select data-nivel-contexto="area" data-contexto-id="${escaparHTML(contexto.areaId)}" aria-label="Nivel de ${escaparHTML(contexto.areaNombre)}">
            ${opcionesNivelArea(nivelArea)}
          </select>
        </td>
        <td>
          ${contexto.temaId
            ? `<strong>${escaparHTML(contexto.temaNombre)}</strong><small>${escaparHTML(contexto.temaId)}</small>`
            : '<span class="sin-tema">— Hereda directamente del Área —</span>'}
        </td>
        <td>
          ${contexto.temaId
            ? `<select data-nivel-contexto="tema" data-contexto-id="${escaparHTML(contexto.temaId)}" aria-label="Nivel de ${escaparHTML(contexto.temaNombre)}">${opcionesNivelTema(nivelTema)}</select>`
            : '<span class="sin-tema">No aplica</span>'}
        </td>
      </tr>
    `;
  }).join("");
}

function actualizarTitulosPersona() {
  const nombre = nombrePersonaSeleccionada();
  $("#tituloResumen").textContent = `Resumen de crecimiento de ${nombre}`;
  $("#tituloAuditoria").textContent = `Contribución de cada Misión de ${nombre}`;
}

function renderResumen(configuracion = configuracionVista) {
  resumenActual = resumirCrecimiento(tareas, configuracion);
  const resumen = resumenActual;
  const nombre = nombrePersonaSeleccionada();

  actualizarTitulosPersona();
  $("#textoResumen").textContent =
    `${resumen.misionesReales} Misiones completadas, visibles y reales aportan ${resumen.unidades} unidades al crecimiento de ${nombre}.`;
  $("#resEtapa").textContent = `${resumen.etapa.icono} ${resumen.etapa.nombre}`;
  $("#resProgreso").textContent = resumen.siguiente
    ? `${Math.round(resumen.progreso)}% del tramo · faltan ${resumen.faltanUnidades} unidades para ${resumen.siguiente.nombre}`
    : "Etapa visual máxima actual";
  $("#resTotal").textContent = resumen.totalMisiones;
  $("#resElegibles").textContent = resumen.misionesReales;
  $("#resUnidades").textContent = resumen.unidades;
  $("#resPruebas").textContent = resumen.pruebasExcluidas;
  $("#resOcultas").textContent = resumen.ocultasExcluidas;
  $("#resNoCompletadas").textContent = resumen.noCompletadas;
  $("#resNiveles").textContent =
    `${resumen.distribucionNiveles.bajo} · ${resumen.distribucionNiveles.medio} · ${resumen.distribucionNiveles.alto}`;

  ETAPAS_CRECIMIENTO.forEach(etapa => {
    formConfiguracion
      .querySelector(`[data-etapa-contenedor="${etapa.id}"]`)
      ?.classList.toggle("actual-preview", etapa.id === resumen.etapa.id);
  });

  $("#textoAuditoria").textContent =
    "Cada fila muestra el nivel que la Academia resuelve para esa Misión y el aporte que produce cuando cumple las condiciones de crecimiento.";

  renderTabla();
}

function coincideFiltro(item, filtro) {
  if (filtro === "todas") return true;
  if (filtro === "elegible") return item.elegible;
  if (["prueba", "oculta", "no-completada"].includes(filtro)) return item.categoria === filtro;
  if (filtro.startsWith("nivel-")) return item.nivel === filtro.replace("nivel-", "");
  return true;
}

function pluralMision(total) {
  return total === 1 ? "Misión" : "Misiones";
}

function renderPaginacion(total) {
  if (!paginacionMisiones) return;
  if (!total) {
    paginacionMisiones.innerHTML = "";
    return;
  }

  const totalPaginas = Math.max(1, Math.ceil(total / TAMANO_PAGINA));
  paginaActual = Math.min(Math.max(1, paginaActual), totalPaginas);
  const inicio = (paginaActual - 1) * TAMANO_PAGINA;
  const fin = Math.min(inicio + TAMANO_PAGINA, total);

  paginacionMisiones.innerHTML = `
    <button type="button" data-pagina-delta="-1" ${paginaActual <= 1 ? "disabled" : ""}>← Anterior</button>
    <strong>${inicio + 1}–${fin} de ${total} ${pluralMision(total)} · Página ${paginaActual} de ${totalPaginas}</strong>
    <button type="button" data-pagina-delta="1" ${paginaActual >= totalPaginas ? "disabled" : ""}>Siguiente →</button>
  `;

  paginacionMisiones.querySelectorAll("[data-pagina-delta]").forEach(button => {
    button.addEventListener("click", () => {
      paginaActual += Number(button.dataset.paginaDelta || 0);
      renderTabla();
      document.querySelector(".auditoria-misiones")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function contextoAuditoria(item) {
  const contexto = item.contexto || {};
  return [contexto.caminoNombre, contexto.areaNombre, contexto.temaNombre]
    .filter(Boolean)
    .join(" · ");
}

function selectNivelEspecifico(tarea = {}, item = {}) {
  const explicito = normalizarNivelCrecimiento(tarea.nivelCrecimiento);
  const automatico = item.nivelNombre ? `Automático · ${item.nivelNombre}` : "Automático";
  return `
    <select class="nivel-especifico" data-nivel-mision="${escaparHTML(tarea.id || "")}" aria-label="Nivel específico de la Misión">
      <option value="" ${!explicito ? "selected" : ""}>${escaparHTML(automatico)}</option>
      ${Object.values(NIVELES_CRECIMIENTO).map(nivel => `
        <option value="${nivel.id}" ${explicito === nivel.id ? "selected" : ""}>${nivel.nombre} · ${nivel.unidades}</option>
      `).join("")}
    </select>
  `;
}

function renderTabla() {
  const filtro = $("#filtroMision").value;
  const busqueda = String($("#buscarMision").value || "").trim().toLowerCase();
  const items = resumenActual.evaluaciones
    .filter(item => coincideFiltro(item, filtro))
    .filter(item => {
      if (!busqueda) return true;
      const tarea = item.tarea || {};
      return [
        tarea.titulo,
        tarea.presentacionAlumno?.tituloMision,
        tarea.tipo,
        tarea.modulo,
        tarea.materia,
        tarea.tema,
        textoEstado(tarea.estado),
        item.nivelNombre,
        item.detalleNivel,
        contextoAuditoria(item)
      ].join(" ").toLowerCase().includes(busqueda);
    })
    .sort((a, b) => {
      if (a.elegible !== b.elegible) return a.elegible ? -1 : 1;
      if (a.unidades !== b.unidades) return b.unidades - a.unidades;
      return String(a.tarea?.titulo || "").localeCompare(String(b.tarea?.titulo || ""), "es");
    });

  const totalPaginas = Math.max(1, Math.ceil(items.length / TAMANO_PAGINA));
  paginaActual = Math.min(Math.max(1, paginaActual), totalPaginas);
  const inicio = (paginaActual - 1) * TAMANO_PAGINA;
  const itemsPagina = items.slice(inicio, inicio + TAMANO_PAGINA);

  tablaMisiones.innerHTML = itemsPagina.map(item => {
    const tarea = item.tarea || {};
    const titulo = tarea.presentacionAlumno?.tituloMision || tarea.titulo || "Misión sin título";
    const contexto = contextoAuditoria(item) || "Contexto no disponible";
    const estadoEtiqueta = item.categoria === "prueba"
      ? "🧪 Prueba"
      : item.categoria === "oculta"
        ? "Oculta"
        : textoEstado(tarea.estado);
    const razon = item.elegible ? item.detalleNivel : item.razon;

    return `
      <tr>
        <td>
          <strong>${escaparHTML(titulo)}</strong>
          <small>${escaparHTML(tarea.id || "")}</small>
        </td>
        <td><span class="${claseCategoria(item)}">${escaparHTML(estadoEtiqueta)}</span></td>
        <td>${escaparHTML(contexto)}</td>
        <td>${item.nivel ? `<span class="${claseNivel(item.nivel)}">${escaparHTML(item.nivelNombre)}</span>` : "—"}</td>
        <td><span class="aporte ${item.unidades ? "" : "aporte--cero"}">${item.unidades}</span></td>
        <td>${selectNivelEspecifico(tarea, item)}</td>
        <td>${escaparHTML(razon || "—")}</td>
      </tr>
    `;
  }).join("");

  sinMisiones.hidden = items.length > 0;
  renderPaginacion(items.length);
}

async function cargarMisiones(userId) {
  tareas = [];
  paginaActual = 1;
  renderNivelesContexto();
  renderResumen();
  if (!userId) return;

  const resultado = await getDocs(collection(db, "usuarios", userId, "tareas"));
  tareas = resultado.docs.map(documento => ({ id: documento.id, ...documento.data() }));
  renderNivelesContexto();
  renderResumen();
}

function poblarPersonas() {
  const candidatos = usuarios
    .filter(usuario => usuario.userId && usuario.persona)
    .sort((a, b) => nombrePersona(a.persona).localeCompare(nombrePersona(b.persona), "es"));

  selectPersona.innerHTML = candidatos.map(usuario => {
    const rol = usuario.rol?.nombre || usuario.asignacion?.roleId || "sin rol";
    return `<option value="${escaparHTML(usuario.userId)}">${escaparHTML(nombrePersona(usuario.persona))} · ${escaparHTML(rol)}</option>`;
  }).join("");

  const alumno = candidatos.find(usuario =>
    usuario.asignacion?.roleId === "alumno" ||
    String(usuario.rol?.nombre || "").toLowerCase().includes("alumno")
  );
  if (alumno) selectPersona.value = alumno.userId;
}

function aplicarVistaPrevia() {
  const validacion = validarConfiguracionCrecimiento(configuracionDesdeFormulario());
  if (!validacion.valida) {
    mostrarErrorConfiguracion(validacion.errores);
    return false;
  }

  mostrarErrorConfiguracion([]);
  configuracionVista = validacion.configuracion;
  avisoVistaPrevia.hidden = configuracionesIguales(configuracionVista, configuracionGuardada);
  renderResumen(configuracionVista);
  return true;
}

function restaurarGuardado() {
  cargarFormulario(configuracionGuardada);
  mostrarErrorConfiguracion([]);
  avisoVistaPrevia.hidden = true;
  renderResumen(configuracionVista);
}

async function guardarConfiguracion(evento) {
  evento.preventDefault();
  if (!aplicarVistaPrevia()) return;

  const resumenPreview = resumirCrecimiento(tareas, configuracionVista);
  const confirmado = window.confirm(
    "¿Guardar esta configuración global de Mi Camino?\n\n" +
    `Vista previa de ${nombrePersonaSeleccionada()}: ${resumenPreview.etapa.nombre}, ${resumenPreview.unidades} unidades.\n\n` +
    "Los niveles automáticos y la etapa visible pueden recalcularse para todas las Personas."
  );
  if (!confirmado) return;

  const boton = $("#btnGuardar");
  boton.disabled = true;
  const textoBoton = boton.textContent;
  boton.textContent = "Guardando…";

  try {
    const resultado = await guardarConfiguracionMiCamino(configuracionVista);
    configuracionGuardada = resultado.configuracion;
    configuracionVista = resultado.configuracion;
    auditoriaConfiguracion = resultado.auditoria;
    configuracionPersistida = resultado.existe;
    schemaPersistido = resultado.schemaPersistido;
    cargarFormulario(configuracionGuardada);
    avisoVistaPrevia.hidden = true;
    actualizarAuditoriaConfiguracion();
    renderResumen();
  } catch (error) {
    console.error("No se pudo guardar la configuración de Mi Camino.", error);
    mostrarErrorConfiguracion(
      `No se pudo guardar la configuración: ${error.message || "error no identificado"}`
    );
  } finally {
    boton.disabled = false;
    boton.textContent = textoBoton;
  }
}

async function cargarConfiguracion() {
  try {
    const resultado = await leerConfiguracionMiCamino();
    configuracionGuardada = resultado.configuracion;
    configuracionVista = resultado.configuracion;
    auditoriaConfiguracion = resultado.auditoria;
    configuracionPersistida = resultado.existe;
    schemaPersistido = resultado.schemaPersistido;
  } catch (error) {
    console.warn(
      "No se pudo leer la configuración persistida de Mi Camino; se usarán los valores predeterminados.",
      error
    );
    configuracionGuardada = normalizarConfiguracionCrecimiento(
      CONFIGURACION_CRECIMIENTO_PREDETERMINADA
    );
    configuracionVista = configuracionGuardada;
    auditoriaConfiguracion = null;
    configuracionPersistida = false;
    schemaPersistido = 0;
  }

  cargarFormulario(configuracionGuardada);
  actualizarAuditoriaConfiguracion();
}

async function guardarNivelEspecificoMision(misionId, nivelSolicitado, control) {
  const tarea = tareas.find(item => item.id === misionId);
  const userId = selectPersona.value;
  if (!tarea || !userId) return;

  const anterior = normalizarNivelCrecimiento(tarea.nivelCrecimiento);
  const siguiente = normalizarNivelCrecimiento(nivelSolicitado);
  if (anterior === siguiente) return;

  const etiqueta = siguiente
    ? `${NIVELES_CRECIMIENTO[siguiente].nombre} (${NIVELES_CRECIMIENTO[siguiente].unidades})`
    : "Automático";
  const titulo = tarea.presentacionAlumno?.tituloMision || tarea.titulo || "esta Misión";

  if (!window.confirm(`¿Cambiar el nivel específico de “${titulo}” a ${etiqueta}?`)) {
    renderTabla();
    return;
  }

  control.disabled = true;
  try {
    await auth.authStateReady();
    if (!auth.currentUser) throw new Error("No hay sesión autenticada.");

    await updateDoc(doc(db, "usuarios", userId, "tareas", misionId), {
      nivelCrecimiento: siguiente || deleteField(),
      updatedAt: serverTimestamp(),
      updatedBy: auth.currentUser.uid
    });

    await cargarMisiones(userId);
  } catch (error) {
    console.error("No se pudo actualizar el nivel específico de la Misión.", error);
    window.alert(`No se pudo actualizar el nivel de la Misión.\n${error.message}`);
    renderTabla();
  } finally {
    control.disabled = false;
  }
}

async function recargarTodo() {
  const seleccionAnterior = selectPersona.value;
  usuarios = await Academia.administracion.usuarios.listar();
  poblarPersonas();

  if (seleccionAnterior && usuarios.some(item => item.userId === seleccionAnterior)) {
    selectPersona.value = seleccionAnterior;
  }

  await cargarConfiguracion();
  await cargarMisiones(selectPersona.value);
}

async function iniciar() {
  await protegerPagina({ loginUrl: "../../login.html" });

  const esAdmin = await ContextoUsuario.esAdministrador();
  if (!esAdmin) {
    estadoAcceso.textContent = "No tienes permisos de administración para acceder a esta pantalla.";
    estadoAcceso.className = "mensaje mensaje--error";
    return;
  }

  estadoAcceso.textContent = "Administración autorizada.";
  estadoAcceso.className = "mensaje mensaje--ok";
  zonaAdministracion.hidden = false;

  construirCamposEtapas();

  try {
    await recargarTodo();
  } catch (error) {
    console.error(error);
    estadoAcceso.textContent = `No se pudo cargar Administración · Mi Camino: ${error.message}`;
    estadoAcceso.className = "mensaje mensaje--error";
  }
}

selectPersona.addEventListener("change", () => {
  paginaActual = 1;
  cargarMisiones(selectPersona.value).catch(error => {
    console.error(error);
    estadoAcceso.textContent = `No se pudieron cargar las Misiones: ${error.message}`;
    estadoAcceso.className = "mensaje mensaje--error";
  });
});

$("#btnRecargar").addEventListener("click", () => {
  recargarTodo().catch(error => window.alert(error.message));
});

$("#buscarMision").addEventListener("input", () => {
  paginaActual = 1;
  renderTabla();
});

$("#filtroMision").addEventListener("change", () => {
  paginaActual = 1;
  renderTabla();
});

tablaNivelesContexto.addEventListener("change", event => {
  const control = event.target.closest("[data-nivel-contexto]");
  if (!control) return;

  const tipo = control.dataset.nivelContexto;
  const id = control.dataset.contextoId;
  const nivel = normalizarNivelCrecimiento(control.value);
  const siguiente = normalizarConfiguracionCrecimiento(configuracionDesdeFormulario());
  const mapa = tipo === "tema"
    ? siguiente.nivelesContexto.temas
    : siguiente.nivelesContexto.areas;

  if (nivel) mapa[id] = nivel;
  else delete mapa[id];

  configuracionVista = siguiente;
  renderNivelesContexto();
  aplicarVistaPrevia();
});

tablaMisiones.addEventListener("change", event => {
  const control = event.target.closest("[data-nivel-mision]");
  if (!control) return;
  guardarNivelEspecificoMision(
    control.dataset.nivelMision,
    control.value,
    control
  );
});

formConfiguracion.addEventListener("input", event => {
  if (event.target.matches("[data-etapa]")) aplicarVistaPrevia();
});
formConfiguracion.addEventListener("submit", guardarConfiguracion);
$("#btnRestaurar").addEventListener("click", restaurarGuardado);

iniciar();
