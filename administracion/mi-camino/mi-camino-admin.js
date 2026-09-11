import { Academia } from "../../compartido/api/academia.js";
import {
  guardarConfiguracionMiCamino,
  leerConfiguracionMiCamino
} from "../../compartido/api/mi-camino-config.js";
import { db } from "../../compartido/firebase/firebase-config.js";
import { protegerPagina } from "../../compartido/js/auth-guard.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";
import {
  ETAPAS_CRECIMIENTO,
  CONFIGURACION_CRECIMIENTO_PREDETERMINADA,
  normalizarConfiguracionCrecimiento,
  resumirCrecimiento,
  validarConfiguracionCrecimiento
} from "../../compartido/modelos/mi-camino-crecimiento.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const $ = selector => document.querySelector(selector);

const estadoAcceso = $("#estadoAcceso");
const zonaAdministracion = $("#zonaAdministracion");
const selectPersona = $("#selectPersona");
const tablaMisiones = $("#tablaMisiones");
const sinMisiones = $("#sinMisiones");
const formConfiguracion = $("#formConfiguracion");
const camposEtapas = $("#camposEtapas");
const errorConfiguracion = $("#errorConfiguracion");
const avisoVistaPrevia = $("#avisoVistaPrevia");

let usuarios = [];
let tareas = [];
let configuracionGuardada = normalizarConfiguracionCrecimiento(
  CONFIGURACION_CRECIMIENTO_PREDETERMINADA
);
let configuracionVista = configuracionGuardada;
let auditoriaConfiguracion = null;
let configuracionPersistida = false;
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

function nombreUsuarioPorUid(uid = "") {
  if (!uid) return "—";
  const usuario = usuarios.find(item => item.userId === uid);
  return usuario ? nombrePersona(usuario.persona || {}) : uid;
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

function clasePeso(peso) {
  return `badge badge--peso${peso || 1}`;
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
  const config = normalizarConfiguracionCrecimiento(configuracion);

  ETAPAS_CRECIMIENTO.forEach(etapa => {
    const input = formConfiguracion.querySelector(`[data-etapa="${etapa.id}"]`);
    if (input) input.value = String(config.etapas[etapa.id]);
  });

  const reglas = config.reglasPeso;
  $("#cantidadEstandarMin").value = reglas.cantidadEstandarMin;
  $("#cantidadAmpliaMin").value = reglas.cantidadAmpliaMin;
  $("#minutosEstandarMin").value = reglas.minutosEstandarMin;
  $("#minutosAmpliaMin").value = reglas.minutosAmpliaMin;
  $("#repasoAcademicoComoEstandar").checked = reglas.repasoAcademicoComoEstandar;
  $("#tareaCombinadaComoAmplia").checked = reglas.tareaCombinadaComoAmplia;
}

function configuracionDesdeFormulario() {
  const etapas = {};
  ETAPAS_CRECIMIENTO.forEach(etapa => {
    const input = formConfiguracion.querySelector(`[data-etapa="${etapa.id}"]`);
    etapas[etapa.id] = Number(input?.value || 0);
  });
  etapas.semilla = 0;

  return {
    schemaVersion: 1,
    etapas,
    reglasPeso: {
      cantidadEstandarMin: Number($("#cantidadEstandarMin").value),
      cantidadAmpliaMin: Number($("#cantidadAmpliaMin").value),
      minutosEstandarMin: Number($("#minutosEstandarMin").value),
      minutosAmpliaMin: Number($("#minutosAmpliaMin").value),
      repasoAcademicoComoEstandar: $("#repasoAcademicoComoEstandar").checked,
      tareaCombinadaComoAmplia: $("#tareaCombinadaComoAmplia").checked
    }
  };
}

function mostrarErrorConfiguracion(mensajes = []) {
  const lista = Array.isArray(mensajes) ? mensajes : [mensajes];
  errorConfiguracion.hidden = lista.length === 0;
  errorConfiguracion.textContent = lista.join(" ");
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
  $("#estadoConfiguracion").textContent = configuracionPersistida
    ? "Configuración global guardada en Firestore."
    : "Se están usando los valores predeterminados del producto.";
}

function renderResumen(configuracion = configuracionVista) {
  resumenActual = resumirCrecimiento(tareas, configuracion);
  const resumen = resumenActual;

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
  $("#resPesos").textContent =
    `${resumen.distribucionPesos[1]} · ${resumen.distribucionPesos[2]} · ${resumen.distribucionPesos[3]}`;

  ETAPAS_CRECIMIENTO.forEach(etapa => {
    formConfiguracion
      .querySelector(`[data-etapa-contenedor="${etapa.id}"]`)
      ?.classList.toggle("actual-preview", etapa.id === resumen.etapa.id);
  });

  const persona = usuarios.find(item => item.userId === selectPersona.value);
  $("#textoAuditoria").textContent = persona
    ? `${nombrePersona(persona.persona || {})}: ${resumen.misionesReales} Misiones elegibles aportan ${resumen.unidades} unidades.`
    : "Selecciona una Persona para revisar sus Misiones.";

  renderTabla();
}

function coincideFiltro(item, filtro) {
  if (filtro === "todas") return true;
  if (filtro === "elegible") return item.elegible;
  if (["prueba", "oculta", "no-completada"].includes(filtro)) {
    return item.categoria === filtro;
  }
  if (filtro.startsWith("peso-")) {
    return item.elegible && item.peso === Number(filtro.slice(-1));
  }
  return true;
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
        item.razon
      ].join(" ").toLowerCase().includes(busqueda);
    })
    .sort((a, b) => {
      if (a.elegible !== b.elegible) return a.elegible ? -1 : 1;
      if (a.peso !== b.peso) return b.peso - a.peso;
      const tituloA = String(a.tarea?.titulo || a.tarea?.presentacionAlumno?.tituloMision || "");
      const tituloB = String(b.tarea?.titulo || b.tarea?.presentacionAlumno?.tituloMision || "");
      return tituloA.localeCompare(tituloB, "es");
    });

  tablaMisiones.innerHTML = items.map(item => {
    const tarea = item.tarea || {};
    const titulo = tarea.presentacionAlumno?.tituloMision || tarea.titulo || "Misión sin título";
    const detalle = [tarea.materia, tarea.tema].filter(Boolean).join(" · ");
    const tipoModulo = [tarea.tipo || "sin tipo", tarea.modulo || "sin módulo"].join(" · ");

    return `
      <tr>
        <td>
          <strong>${escaparHTML(titulo)}</strong>
          <small>${escaparHTML(detalle || tarea.id || "")}</small>
        </td>
        <td>
          <span class="${claseCategoria(item)}">${escaparHTML(textoEstado(tarea.estado))}</span>
          ${tarea.visibleParaAlumno === false ? '<small>Oculta</small>' : ""}
          ${tarea.esDatoPrueba === true ? '<small>🧪 Dato de prueba</small>' : ""}
        </td>
        <td>${escaparHTML(tipoModulo)}</td>
        <td>${escaparHTML(item.cantidad)}</td>
        <td>${escaparHTML(item.minutos)}</td>
        <td>${item.elegible ? `<span class="${clasePeso(item.peso)}">${item.peso}</span>` : "—"}</td>
        <td>${escaparHTML(item.razon)}</td>
      </tr>
    `;
  }).join("");

  sinMisiones.hidden = items.length > 0;
}

async function cargarMisiones(userId) {
  tareas = [];
  renderResumen();

  if (!userId) return;

  const resultado = await getDocs(collection(db, "usuarios", userId, "tareas"));
  tareas = resultado.docs.map(documento => ({
    id: documento.id,
    ...documento.data()
  }));
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
  configuracionVista = normalizarConfiguracionCrecimiento(configuracionGuardada);
  cargarFormulario(configuracionVista);
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
    `Vista previa actual: ${resumenPreview.etapa.nombre}, ${resumenPreview.unidades} unidades.\n\n` +
    "El cambio se aplicará a todas las Personas y puede recalcular su etapa visible."
  );
  if (!confirmado) return;

  const boton = $("#btnGuardar");
  boton.disabled = true;
  const texto = boton.textContent;
  boton.textContent = "Guardando…";

  try {
    const resultado = await guardarConfiguracionMiCamino(configuracionVista);
    configuracionGuardada = resultado.configuracion;
    configuracionVista = resultado.configuracion;
    auditoriaConfiguracion = resultado.auditoria;
    configuracionPersistida = resultado.existe;
    cargarFormulario(configuracionGuardada);
    avisoVistaPrevia.hidden = true;
    mostrarErrorConfiguracion([]);
    actualizarAuditoriaConfiguracion();
    renderResumen();
  } catch (error) {
    console.error("No se pudo guardar la configuración de Mi Camino.", error);
    mostrarErrorConfiguracion(
      `No se pudo guardar la configuración: ${error.message || "error no identificado"}`
    );
  } finally {
    boton.disabled = false;
    boton.textContent = texto;
  }
}

async function cargarConfiguracion() {
  try {
    const resultado = await leerConfiguracionMiCamino();
    configuracionGuardada = resultado.configuracion;
    configuracionVista = resultado.configuracion;
    auditoriaConfiguracion = resultado.auditoria;
    configuracionPersistida = resultado.existe;
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
    $("#estadoConfiguracion").textContent =
      "No se pudo leer Firestore. La auditoría usa temporalmente los valores predeterminados.";
  }

  cargarFormulario(configuracionGuardada);
  actualizarAuditoriaConfiguracion();
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
  cargarMisiones(selectPersona.value).catch(error => {
    console.error(error);
    estadoAcceso.textContent = `No se pudieron cargar las Misiones: ${error.message}`;
    estadoAcceso.className = "mensaje mensaje--error";
  });
});

$("#btnRecargar").addEventListener("click", () => {
  recargarTodo().catch(error => window.alert(error.message));
});

$("#buscarMision").addEventListener("input", renderTabla);
$("#filtroMision").addEventListener("change", renderTabla);
formConfiguracion.addEventListener("input", aplicarVistaPrevia);
formConfiguracion.addEventListener("change", aplicarVistaPrevia);
formConfiguracion.addEventListener("submit", guardarConfiguracion);
$("#btnRestaurar").addEventListener("click", restaurarGuardado);

iniciar();
