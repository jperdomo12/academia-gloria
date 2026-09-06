/**
 * Academia Gloria Valentina
 * Bitácora de Acompañamiento · V1
 */

import { protegerPagina } from "../compartido/js/auth-guard.js";
import { ContextoUsuario } from "../compartido/js/contexto-usuario.js";
import { BitacoraAcompanamiento } from "../compartido/api/bitacora-acompanamiento.js";
import {
  DESTINOS_BITACORA,
  TIPOS_BITACORA,
  VISIBILIDADES_BITACORA,
  obtenerDestinoBitacora,
  obtenerTipoBitacora,
  obtenerVisibilidadBitacora
} from "../compartido/modelos/bitacora-acompanamiento.js";

const $ = id => document.getElementById(id);

let contexto = null;
let entradas = [];
let puedeColaborar = false;
let cancelarObservacion = null;
let detalleActualId = "";
let toastTimer = null;

function texto(valor = "", alternativo = "") {
  const resultado = String(valor ?? "").trim();
  return resultado || alternativo;
}

function escapar(valor = "") {
  return String(valor ?? "").replace(
    /[&<>"']/g,
    caracter => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    })[caracter]
  );
}

function normalizarBusqueda(valor = "") {
  return String(valor ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function fechaMs(valor) {
  if (!valor) return 0;
  if (typeof valor.toMillis === "function") return valor.toMillis();
  if (typeof valor.toDate === "function") return valor.toDate().getTime();
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? 0 : fecha.getTime();
}

function formatearFecha(valor) {
  const milisegundos = fechaMs(valor);
  if (!milisegundos) return "Fecha pendiente de sincronización";

  return new Date(milisegundos).toLocaleString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

function esAdministrador() {
  return contexto?.roles?.some(rol => rol.nivelAcceso === "administracion") === true;
}

function mostrarToast(mensaje, { error = false } = {}) {
  const toast = $("bitacoraToast");
  toast.textContent = mensaje;
  toast.classList.toggle("error", error);
  toast.classList.add("visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 3200);
}

function abrirModal(id) {
  const modal = $(id);
  modal.classList.add("abierto");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function cerrarModal(id) {
  const modal = $(id);
  modal.classList.remove("abierto");
  modal.setAttribute("aria-hidden", "true");

  if (
    !$("modalEditor").classList.contains("abierto") &&
    !$("modalDetalle").classList.contains("abierto")
  ) {
    document.body.style.overflow = "";
  }
}

function opciones(catalogo) {
  return catalogo.map(item =>
    `<option value="${item.id}">${item.icono} ${escapar(item.etiqueta)}</option>`
  ).join("");
}

function poblarCatalogos() {
  $("filtroTipo").insertAdjacentHTML("beforeend", opciones(TIPOS_BITACORA));
  $("filtroDestino").insertAdjacentHTML("beforeend", opciones(DESTINOS_BITACORA));
  $("entradaTipo").innerHTML = opciones(TIPOS_BITACORA);
  $("entradaDestino").innerHTML = opciones(DESTINOS_BITACORA);
  $("entradaVisibilidad").innerHTML = opciones(VISIBILIDADES_BITACORA);
}

function actualizarCampoOtros(selectId, grupoId, inputId) {
  const activo = $(selectId).value === "otros";
  $(grupoId).hidden = !activo;
  $(inputId).required = activo;
  if (!activo) $(inputId).value = "";
}

function actualizarCamposOtros() {
  actualizarCampoOtros("entradaTipo", "grupoTipoOtros", "entradaTipoOtros");
  actualizarCampoOtros("entradaDestino", "grupoDestinoOtros", "entradaDestinoOtros");
  actualizarCampoOtros(
    "entradaVisibilidad",
    "grupoVisibilidadOtros",
    "entradaVisibilidadOtros"
  );
}

function nombreTipo(entrada) {
  const tipo = obtenerTipoBitacora(entrada.tipo);
  return entrada.tipo === "otros" && texto(entrada.tipoOtros)
    ? `Otros · ${texto(entrada.tipoOtros)}`
    : tipo.etiqueta;
}

function nombreDestino(entrada) {
  const destino = obtenerDestinoBitacora(entrada.destino);
  return entrada.destino === "otros" && texto(entrada.destinoOtros)
    ? `Otros · ${texto(entrada.destinoOtros)}`
    : destino.etiqueta;
}

function nombreVisibilidad(entrada) {
  const visibilidad = obtenerVisibilidadBitacora(entrada.visibilidad);
  return entrada.visibilidad === "otros" && texto(entrada.visibilidadOtros)
    ? `Otros · ${texto(entrada.visibilidadOtros)} (privada en V1)`
    : visibilidad.etiqueta;
}

function iconoTipo(entrada) {
  return obtenerTipoBitacora(entrada.tipo).icono;
}

function actualizarAutores() {
  const seleccionado = $("filtroAutor").value;
  const autores = [...new Map(
    entradas
      .filter(item => texto(item.createdBy))
      .map(item => [
        item.createdBy,
        texto(item.createdByNombre, "Usuario")
      ])
  ).entries()]
    .sort((a, b) => a[1].localeCompare(b[1], "es"));

  $("filtroAutor").innerHTML =
    '<option value="">Todos los autores</option>' +
    autores.map(([id, nombre]) =>
      `<option value="${escapar(id)}">${escapar(nombre)}</option>`
    ).join("");

  if (autores.some(([id]) => id === seleccionado)) {
    $("filtroAutor").value = seleccionado;
  }
}

function filtrosActivos() {
  return Boolean(
    texto($("filtroBuscar").value) ||
    texto($("filtroTipo").value) ||
    texto($("filtroDestino").value) ||
    texto($("filtroAutor").value)
  );
}

function entradasFiltradas() {
  const buscar = normalizarBusqueda($("filtroBuscar").value);
  const tipo = texto($("filtroTipo").value);
  const destino = texto($("filtroDestino").value);
  const autor = texto($("filtroAutor").value);

  return entradas
    .filter(entrada => {
      if (tipo && entrada.tipo !== tipo) return false;
      if (destino && entrada.destino !== destino) return false;
      if (autor && entrada.createdBy !== autor) return false;

      if (buscar) {
        const universo = normalizarBusqueda([
          entrada.titulo,
          entrada.mensaje,
          entrada.tipoOtros,
          entrada.destinoOtros,
          entrada.visibilidadOtros,
          entrada.createdByNombre,
          entrada.createdByRol,
          entrada.createdByRelacion,
          entrada.respuestaTexto,
          entrada.respuestaCreatedByNombre
        ].join(" "));
        if (!universo.includes(buscar)) return false;
      }

      return true;
    })
    .sort((a, b) => fechaMs(b.createdAt) - fechaMs(a.createdAt));
}

function estadoRespuesta(entrada) {
  if (texto(entrada.respuestaTexto)) {
    return '<span class="bitacora-chip bitacora-chip--respondida">✅ Respondida</span>';
  }
  if (entrada.requiereRespuesta === true) {
    return '<span class="bitacora-chip bitacora-chip--respuesta">💬 Requiere respuesta</span>';
  }
  return '<span class="bitacora-chip">ℹ️ Informativa</span>';
}

function cardEntrada(entrada) {
  const privada = ["solo-autor", "otros"].includes(entrada.visibilidad);
  const metaRol = texto(entrada.createdByRelacion, texto(entrada.createdByRol));

  return `
    <article class="bitacora-card" data-entrada-card="${escapar(entrada.id)}">
      <div class="bitacora-card__cabecera">
        <div class="bitacora-card__etiquetas">
          <span class="bitacora-chip bitacora-chip--tipo">
            ${iconoTipo(entrada)} ${escapar(nombreTipo(entrada))}
          </span>
          ${estadoRespuesta(entrada)}
          ${privada ? '<span class="bitacora-chip bitacora-chip--privada">🔒 Privada</span>' : ""}
        </div>
      </div>

      <h3>${escapar(entrada.titulo)}</h3>
      <p class="bitacora-card__mensaje">${escapar(entrada.mensaje)}</p>

      <div class="bitacora-card__meta">
        ${escapar(texto(entrada.createdByNombre, "Usuario"))}
        ${metaRol ? ` · ${escapar(metaRol)}` : ""}
        · ${escapar(formatearFecha(entrada.createdAt))}
      </div>

      <div class="bitacora-card__pie">
        <div class="bitacora-card__destinos">
          <span class="bitacora-chip">📨 ${escapar(nombreDestino(entrada))}</span>
          <span class="bitacora-chip">👁️ ${escapar(nombreVisibilidad(entrada))}</span>
        </div>
        <button class="bitacora-card__ver" type="button" data-ver="${escapar(entrada.id)}">
          Ver entrada →
        </button>
      </div>
    </article>
  `;
}

function render() {
  $("limpiarFiltros").classList.toggle("visible", filtrosActivos());
  actualizarAutores();

  const resultado = entradasFiltradas();
  $("contadorResultados").textContent =
    resultado.length === 1
      ? "1 entrada"
      : `${resultado.length} entradas`;

  if (!resultado.length) {
    $("bitacoraLista").innerHTML = `
      <div class="bitacora-vacio">
        <span class="bitacora-vacio__icono">${entradas.length ? "🔎" : "🤝"}</span>
        ${entradas.length
          ? "No hay entradas que coincidan con estos filtros."
          : puedeColaborar
            ? "Todavía no hay entradas visibles. Puedes registrar la primera aportación cuando sea útil."
            : "Todavía no hay entradas compartidas contigo."}
      </div>
    `;
    return;
  }

  $("bitacoraLista").innerHTML = resultado.map(cardEntrada).join("");
}

function aplicarContexto() {
  const nombre = texto(
    contexto?.personaActiva?.nombreVisible,
    texto(contexto?.personaActiva?.nombre, "la Persona Activa")
  );

  puedeColaborar = esAdministrador() || contexto.esPersonaPropia === false;

  $("bitacoraSubtitulo").textContent =
    `Espacio compartido de acompañamiento de ${nombre}: observaciones, recomendaciones, dudas y seguimiento con autoría y visibilidad claras.`;
  $("bitacoraContexto").textContent = `🎯 Acompañamiento de: ${nombre}`;
  $("nuevaEntrada").hidden = !puedeColaborar;

  $("bitacoraAcceso").className =
    `bitacora-acceso ${puedeColaborar ? "bitacora-acceso--colabora" : "bitacora-acceso--consulta"}`;
  $("bitacoraAcceso").textContent = puedeColaborar
    ? "✍️ Puedes registrar y responder"
    : "👁️ Solo entradas compartidas contigo";
}

function limpiarEditor() {
  $("formEntrada").reset();
  $("entradaTipo").value = "observacion";
  $("entradaDestino").value = "familia-profesionales";
  $("entradaVisibilidad").value = "adultos-profesionales";
  actualizarCamposOtros();
}

function abrirEditor() {
  if (!puedeColaborar) return;
  limpiarEditor();
  abrirModal("modalEditor");
  setTimeout(() => $("entradaTitulo").focus(), 50);
}

async function guardarEntrada(evento) {
  evento.preventDefault();
  if (!puedeColaborar) return;

  const boton = $("guardarEntrada");
  const original = boton.textContent;
  boton.disabled = true;
  boton.textContent = "Publicando…";

  try {
    await BitacoraAcompanamiento.guardar({
      tipo: $("entradaTipo").value,
      tipoOtros: $("entradaTipoOtros").value,
      titulo: $("entradaTitulo").value,
      mensaje: $("entradaMensaje").value,
      destino: $("entradaDestino").value,
      destinoOtros: $("entradaDestinoOtros").value,
      visibilidad: $("entradaVisibilidad").value,
      visibilidadOtros: $("entradaVisibilidadOtros").value,
      requiereRespuesta: $("entradaRequiereRespuesta").checked
    });

    cerrarModal("modalEditor");
    mostrarToast("Entrada publicada en la Bitácora.");
  } catch (error) {
    console.error(error);
    mostrarToast(texto(error?.message, "No se pudo publicar la entrada."), { error:true });
  } finally {
    boton.disabled = false;
    boton.textContent = original;
  }
}

function entradaPorId(id) {
  return entradas.find(item => item.id === id) || null;
}

function puedeResponderEntrada(entrada) {
  return Boolean(
    puedeColaborar &&
    entrada?.requiereRespuesta === true &&
    !texto(entrada?.respuestaTexto) &&
    entrada?.createdBy !== contexto?.usuario?.userId
  );
}

function renderDetalle(entrada) {
  const metaRol = texto(entrada.createdByRelacion, texto(entrada.createdByRol));
  const tieneRespuesta = Boolean(texto(entrada.respuestaTexto));
  const puedeResponder = puedeResponderEntrada(entrada);

  $("detalleContenido").innerHTML = `
    <div class="bitacora-detalle__etiquetas">
      <span class="bitacora-chip bitacora-chip--tipo">
        ${iconoTipo(entrada)} ${escapar(nombreTipo(entrada))}
      </span>
      ${estadoRespuesta(entrada)}
      <span class="bitacora-chip">📨 ${escapar(nombreDestino(entrada))}</span>
      <span class="bitacora-chip">👁️ ${escapar(nombreVisibilidad(entrada))}</span>
    </div>

    <h3>${escapar(entrada.titulo)}</h3>
    <p class="bitacora-detalle__mensaje">${escapar(entrada.mensaje)}</p>

    <div class="bitacora-detalle__meta">
      Escrito por <strong>${escapar(texto(entrada.createdByNombre, "Usuario"))}</strong>
      ${metaRol ? ` · ${escapar(metaRol)}` : ""}
      <br>${escapar(formatearFecha(entrada.createdAt))}
    </div>

    ${tieneRespuesta ? `
      <div class="bitacora-detalle__respuesta">
        <strong>💬 Respuesta / seguimiento</strong>
        <p>${escapar(entrada.respuestaTexto)}</p>
        <small>
          ${escapar(texto(entrada.respuestaCreatedByNombre, "Usuario"))}
          ${entrada.respuestaCreatedByRol ? ` · ${escapar(entrada.respuestaCreatedByRol)}` : ""}
          · ${escapar(formatearFecha(entrada.respuestaCreatedAt))}
        </small>
      </div>
    ` : entrada.requiereRespuesta === true && !puedeResponder ? `
      <div class="bitacora-detalle__espera">
        ⏳ Pendiente de respuesta de otra persona autorizada.
      </div>
    ` : ""}
  `;

  $("formRespuesta").hidden = !puedeResponder;
  $("respuestaTexto").value = "";
}

function abrirDetalle(id) {
  const entrada = entradaPorId(id);
  if (!entrada) return;
  detalleActualId = id;
  renderDetalle(entrada);
  abrirModal("modalDetalle");
}

async function guardarRespuesta(evento) {
  evento.preventDefault();
  const entrada = entradaPorId(detalleActualId);
  if (!entrada || !puedeResponderEntrada(entrada)) return;

  const boton = $("guardarRespuesta");
  const original = boton.textContent;
  boton.disabled = true;
  boton.textContent = "Guardando…";

  try {
    await BitacoraAcompanamiento.responder(
      detalleActualId,
      $("respuestaTexto").value
    );
    mostrarToast("Respuesta registrada.");
  } catch (error) {
    console.error(error);
    mostrarToast(texto(error?.message, "No se pudo registrar la respuesta."), { error:true });
  } finally {
    boton.disabled = false;
    boton.textContent = original;
  }
}

function limpiarFiltros() {
  $("filtroBuscar").value = "";
  $("filtroTipo").value = "";
  $("filtroDestino").value = "";
  $("filtroAutor").value = "";
  render();
}

function configurarEventos() {
  $("nuevaEntrada").addEventListener("click", abrirEditor);
  $("cerrarEditor").addEventListener("click", () => cerrarModal("modalEditor"));
  $("cancelarEditor").addEventListener("click", () => cerrarModal("modalEditor"));
  $("cerrarDetalle").addEventListener("click", () => cerrarModal("modalDetalle"));
  $("formEntrada").addEventListener("submit", guardarEntrada);
  $("formRespuesta").addEventListener("submit", guardarRespuesta);

  ["entradaTipo", "entradaDestino", "entradaVisibilidad"].forEach(id => {
    $(id).addEventListener("change", actualizarCamposOtros);
  });

  ["filtroBuscar", "filtroTipo", "filtroDestino", "filtroAutor"].forEach(id => {
    $(id).addEventListener(id === "filtroBuscar" ? "input" : "change", render);
  });

  $("limpiarFiltros").addEventListener("click", limpiarFiltros);

  $("bitacoraLista").addEventListener("click", evento => {
    const ver = evento.target.closest("[data-ver]");
    if (ver) abrirDetalle(ver.dataset.ver);
  });

  ["modalEditor", "modalDetalle"].forEach(id => {
    $(id).addEventListener("click", evento => {
      if (evento.target === $(id)) cerrarModal(id);
    });
  });

  document.addEventListener("keydown", evento => {
    if (evento.key !== "Escape") return;
    if ($("modalEditor").classList.contains("abierto")) {
      cerrarModal("modalEditor");
    } else if ($("modalDetalle").classList.contains("abierto")) {
      cerrarModal("modalDetalle");
    }
  });
}

function iniciarObservacion() {
  if (cancelarObservacion) cancelarObservacion();
  $("bitacoraSincronizacion").textContent = "☁️ Cargando Bitácora…";

  cancelarObservacion = BitacoraAcompanamiento.observar(
    datos => {
      entradas = datos;
      render();

      if (detalleActualId && $("modalDetalle").classList.contains("abierto")) {
        const actualizada = entradaPorId(detalleActualId);
        if (actualizada) {
          renderDetalle(actualizada);
        } else {
          cerrarModal("modalDetalle");
        }
      }

      $("bitacoraSincronizacion").textContent = "☁️ Bitácora sincronizada.";
    },
    error => {
      console.error(error);
      $("bitacoraSincronizacion").textContent = "⚠️ No se pudo abrir la Bitácora.";
      $("bitacoraLista").innerHTML = `
        <div class="bitacora-vacio">
          <span class="bitacora-vacio__icono">⚠️</span>
          No pudimos consultar la Bitácora. Revisa la conexión y los permisos configurados.
        </div>
      `;
    }
  );
}

async function inicializar() {
  contexto = await ContextoUsuario.inicializar();
  aplicarContexto();
  poblarCatalogos();
  limpiarEditor();
  configurarEventos();
  render();
  iniciarObservacion();
}

protegerPagina({
  loginUrl: "../login.html",
  onAuthenticated: inicializar
});
