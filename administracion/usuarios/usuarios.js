import { Academia } from "../../compartido/api/academia.js";
import { protegerPagina } from "../../compartido/js/auth-guard.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";

const $ = selector => document.querySelector(selector);

const estadoAcceso = $("#estadoAcceso");
const zonaAdministracion = $("#zonaAdministracion");
const tablaUsuarios = $("#tablaUsuarios");
const sinUsuarios = $("#sinUsuarios");
const dialogo = $("#dialogoUsuario");
const formulario = $("#formUsuario");
const errorFormulario = $("#errorFormulario");

let usuarios = [];
let catalogos = { personas: [], roles: [] };

function escaparHTML(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function nombrePersona(persona) {
  return persona?.nombreVisible ||
    [persona?.nombre, persona?.apellidos].filter(Boolean).join(" ") ||
    "";
}

function fechaParaInput(valor) {
  if (!valor) return "";
  const fecha = typeof valor.toDate === "function" ? valor.toDate() : new Date(valor);
  if (Number.isNaN(fecha.getTime())) return "";
  return fecha.toISOString().slice(0, 10);
}

function fechaRegistro(valor) {
  if (!valor) return "—";
  const fecha = typeof valor.toDate === "function" ? valor.toDate() : new Date(valor);
  if (Number.isNaN(fecha.getTime())) return "—";
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(fecha);
}

function timestampMs(valor) {
  if (!valor) return 0;
  const fecha = typeof valor.toDate === "function" ? valor.toDate() : new Date(valor);
  return Number.isNaN(fecha.getTime()) ? 0 : fecha.getTime();
}

function nombreUsuarioPorUid(uid) {
  if (!uid) return "—";
  const autor = usuarios.find(item => item.userId === uid);
  if (!autor) return uid;

  const nombre = nombrePersona(autor.persona);
  return nombre || autor.login || uid;
}

function registroAuditoria(usuario) {
  const relacion = usuario.relaciones?.find(item => item.activo !== false)
    || usuario.relaciones?.[0]
    || null;

  const entidades = [
    usuario.persona,
    usuario.asignacion,
    usuario.acceso,
    relacion
  ].filter(Boolean);

  const creadoEntidad = entidades.find(entidad => entidad.createdAt || entidad.createdBy);

  const actualizaciones = entidades
    .filter(entidad => entidad.updatedAt || entidad.updatedBy)
    .sort((a, b) => timestampMs(b.updatedAt) - timestampMs(a.updatedAt));

  const ultima = actualizaciones[0] || null;

  return {
    creado: creadoEntidad?.createdAt || usuario.fechaAlta || null,
    creadoPor: creadoEntidad?.createdBy || "",
    actualizado: ultima?.updatedAt || null,
    actualizadoPor: ultima?.updatedBy || ""
  };
}

function mostrarRegistro(usuario = null) {
  const registro = usuario
    ? registroAuditoria(usuario)
    : { creado:null, creadoPor:"", actualizado:null, actualizadoPor:"" };

  $("#registroCreado").value = fechaRegistro(registro.creado);
  $("#registroCreadoPor").value = nombreUsuarioPorUid(registro.creadoPor);
  $("#registroActualizado").value = fechaRegistro(registro.actualizado);
  $("#registroActualizadoPor").value = nombreUsuarioPorUid(registro.actualizadoPor);
}

function identidadVisible(usuario) {
  if (usuario.persona) {
    return {
      titulo: nombrePersona(usuario.persona) || "Persona sin nombre",
      detalle: usuario.persona.email || usuario.acceso?.authEmail || ""
    };
  }

  return {
    titulo: "⚠ Usuario inconsistente",
    detalle: `UID: ${usuario.userId}`
  };
}

function renderizarUsuarios(filtro = "") {
  const termino = String(filtro).trim().toLowerCase();
  const visibles = usuarios.filter(usuario => {
    if (!termino) return true;
    return [
      nombrePersona(usuario.persona),
      usuario.userId,
      usuario.login,
      usuario.acceso?.authEmail,
      usuario.rol?.nombre,
      usuario.asignacion?.roleId
    ].join(" ").toLowerCase().includes(termino);
  });

  tablaUsuarios.innerHTML = visibles.map(usuario => {
    const incidencias = usuario.incidencias || [];
    const coherente = incidencias.length === 0;
    const activo = usuario.activo !== false;
    const identidad = identidadVisible(usuario);

    return `
      <tr>
        <td>
          <strong>${escaparHTML(identidad.titulo)}</strong>
          <small>${escaparHTML(identidad.detalle)}</small>
          ${coherente ? "" : `<small class="detalle-incidencia">${escaparHTML(incidencias.join(" · "))}</small>`}
        </td>
        <td>${escaparHTML(usuario.login || "—")}</td>
        <td>${escaparHTML(usuario.rol?.nombre || usuario.asignacion?.roleId || "⚠ Sin rol")}</td>
        <td><span class="estado ${activo ? "estado--activo" : "estado--inactivo"}">${activo ? "Activo" : "Inactivo"}</span></td>
        <td>
          <span class="consistencia ${coherente ? "consistencia--ok" : "consistencia--error"}"
                title="${escaparHTML(incidencias.join(" · "))}">
            ${coherente ? "Correcta" : `${incidencias.length} incidencia(s)`}
          </span>
        </td>
        <td><button class="boton" type="button" data-editar="${escaparHTML(usuario.userId)}">Editar</button></td>
      </tr>`;
  }).join("");

  sinUsuarios.hidden = visibles.length > 0;
}

function cargarCatalogos() {
  $("#selectRol").innerHTML = catalogos.roles.map(rol =>
    `<option value="${escaparHTML(rol.id)}">${escaparHTML(rol.nombre || rol.id)} · ${escaparHTML(rol.nivelAcceso || "")}</option>`
  ).join("");

  $("#selectPersonaDestino").innerHTML =
    '<option value="">Sin relación</option>' +
    catalogos.personas.map(persona =>
      `<option value="${escaparHTML(persona.id)}">${escaparHTML(nombrePersona(persona))}</option>`
    ).join("");
}

function abrirNuevo() {
  formulario.reset();
  formulario.personaId.value = "";
  formulario.relationIdAnterior.value = "";
  formulario.userId.readOnly = false;
  formulario.activo.checked = true;
  mostrarRegistro();
  $("#tituloFormulario").textContent = "Nuevo usuario";
  errorFormulario.hidden = true;
  dialogo.showModal();
}

function abrirEdicion(userId) {
  const usuario = usuarios.find(item => item.userId === userId);
  if (!usuario) return;

  formulario.reset();
  formulario.userId.value = usuario.userId;
  formulario.userId.readOnly = true;
  formulario.personaId.value = usuario.personaId || "";
  formulario.authEmail.value = usuario.acceso?.authEmail || "";
  formulario.nombre.value = usuario.persona?.nombre || "";
  formulario.apellidos.value = usuario.persona?.apellidos || "";
  formulario.nombreVisible.value = usuario.persona?.nombreVisible || "";
  formulario.email.value = usuario.persona?.email || "";
  formulario.avatar.value = usuario.persona?.avatar || "";
  formulario.fechaNacimiento.value = fechaParaInput(usuario.persona?.fechaNacimiento);
  formulario.idioma.value = usuario.persona?.idioma || "";
  formulario.zonaHoraria.value = usuario.persona?.zonaHoraria || "";
  formulario.colegio.value = usuario.persona?.colegio || "";
  formulario.curso.value = usuario.persona?.curso || "";
  formulario.cursoEscolar.value = usuario.persona?.cursoEscolar || "";
  formulario.login.value = usuario.login || usuario.acceso?.id || "";
  formulario.roleId.value = usuario.asignacion?.roleId || "";
  formulario.activo.checked = usuario.activo !== false;

  const relacion = usuario.relaciones?.find(item => item.activo !== false) || usuario.relaciones?.[0] || null;
  formulario.relationIdAnterior.value = relacion?.id || "";
  formulario.targetPersonId.value = relacion?.targetPersonId || "";
  formulario.tipoRelacion.value = relacion?.tipoRelacion || "";
  formulario.nivelRelacion.value = relacion?.nivelAcceso || "consulta";
  mostrarRegistro(usuario);

  $("#tituloFormulario").textContent = "Editar usuario";
  errorFormulario.hidden = true;
  dialogo.showModal();
}

async function recargar() {
  [usuarios, catalogos] = await Promise.all([
    Academia.administracion.usuarios.listar(),
    Academia.administracion.usuarios.catalogos()
  ]);

  cargarCatalogos();
  renderizarUsuarios($("#buscarUsuario").value);
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

  try {
    await recargar();
  } catch (error) {
    console.error(error);
    estadoAcceso.textContent = `No se pudieron cargar los usuarios: ${error.message}`;
    estadoAcceso.className = "mensaje mensaje--error";
  }
}

$("#btnNuevoUsuario").addEventListener("click", abrirNuevo);
$("#btnCerrarDialogo").addEventListener("click", () => dialogo.close());
$("#btnCancelar").addEventListener("click", () => dialogo.close());
$("#btnRecargar").addEventListener("click", () => recargar().catch(error => alert(error.message)));
$("#buscarUsuario").addEventListener("input", evento => renderizarUsuarios(evento.target.value));

tablaUsuarios.addEventListener("click", evento => {
  const boton = evento.target.closest("[data-editar]");
  if (boton) abrirEdicion(boton.dataset.editar);
});

formulario.addEventListener("submit", async evento => {
  evento.preventDefault();
  errorFormulario.hidden = true;
  $("#btnGuardar").disabled = true;

  const datos = Object.fromEntries(new FormData(formulario).entries());
  datos.activo = formulario.activo.checked;

  try {
    await Academia.administracion.usuarios.guardar(datos);
    dialogo.close();
    ContextoUsuario.limpiarCache();
    await recargar();
  } catch (error) {
    console.error(error);
    errorFormulario.textContent = error.message || "No se pudo guardar el Usuario.";
    errorFormulario.hidden = false;
  } finally {
    $("#btnGuardar").disabled = false;
  }
});

iniciar().catch(error => {
  console.error(error);
  estadoAcceso.textContent = error.message || "No se pudo iniciar Gestión de Usuarios.";
  estadoAcceso.className = "mensaje mensaje--error";
});
