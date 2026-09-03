/**
 * Academia Gloria Valentina
 * Mi Baúl · V1
 *
 * Consulta compartida por Persona Activa.
 * Propietario/gestión pueden crear, editar, eliminar y marcar favoritos.
 */

import { protegerPagina } from "../compartido/js/auth-guard.js";
import { ContextoUsuario } from "../compartido/js/contexto-usuario.js";
import { Baul } from "../compartido/api/baul.js";
import {
  MAX_ADJUNTO_BAUL_BYTES,
  TEMAS_BAUL,
  TIPOS_BAUL,
  obtenerTemaBaul,
  obtenerTipoBaul
} from "../compartido/modelos/baul.js";

const $ = id => document.getElementById(id);

let contexto = null;
let elementos = [];
let puedeEditar = false;
let cancelarObservacion = null;
let detalleActualId = "";
let quitarAdjuntoActual = false;
let favoritosActivos = false;
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

  return new Date(milisegundos).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function formatearTamano(bytes = 0) {
  const valor = Number(bytes || 0);
  if (!Number.isFinite(valor) || valor <= 0) return "";
  return valor < 1024
    ? `${valor} B`
    : `${Math.round(valor / 1024)} KB`;
}

function mostrarToast(mensaje, { error = false } = {}) {
  const toast = $("baulToast");
  toast.textContent = mensaje;
  toast.classList.toggle("error", error);
  toast.classList.add("visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("visible");
  }, 3200);
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

function poblarCatalogos() {
  $("filtroTipo").insertAdjacentHTML(
    "beforeend",
    TIPOS_BAUL.map(tipo =>
      `<option value="${tipo.id}">${tipo.icono} ${escapar(tipo.etiqueta)}</option>`
    ).join("")
  );

  $("elementoTipo").innerHTML = TIPOS_BAUL.map(tipo =>
    `<option value="${tipo.id}">${tipo.icono} ${escapar(tipo.etiqueta)}</option>`
  ).join("");

  $("filtroTema").insertAdjacentHTML(
    "beforeend",
    TEMAS_BAUL.map(tema =>
      `<option value="${tema.id}">${escapar(tema.etiqueta)}</option>`
    ).join("")
  );

  $("selectorTemas").innerHTML = TEMAS_BAUL.map(tema => `
    <label class="baul-tema-check">
      <input type="checkbox" value="${tema.id}" data-tema-editor>
      <span>${escapar(tema.etiqueta)}</span>
    </label>
  `).join("");
}

function filtrosActivos() {
  return Boolean(
    texto($("filtroBuscar").value) ||
    texto($("filtroTipo").value) ||
    texto($("filtroTema").value) ||
    favoritosActivos ||
    $("filtroOrden").value !== "recientes"
  );
}

function actualizarEstadoFiltros() {
  $("limpiarFiltros").classList.toggle("visible", filtrosActivos());
  $("filtroFavoritos").classList.toggle("activo", favoritosActivos);
  $("filtroFavoritos").setAttribute(
    "aria-pressed",
    favoritosActivos ? "true" : "false"
  );
  $("filtroFavoritos").textContent = favoritosActivos
    ? "♥ Favoritos"
    : "♡ Favoritos";
}

function elementosFiltrados() {
  const buscar = normalizarBusqueda($("filtroBuscar").value);
  const tipo = texto($("filtroTipo").value);
  const tema = texto($("filtroTema").value);
  const orden = $("filtroOrden").value;

  const resultado = elementos.filter(elemento => {
    if (tipo && elemento.tipo !== tipo) return false;
    if (tema && !Array.isArray(elemento.temas)) return false;
    if (tema && !elemento.temas.includes(tema)) return false;
    if (favoritosActivos && elemento.favorito !== true) return false;

    if (buscar) {
      const temas = (elemento.temas || [])
        .map(id => obtenerTemaBaul(id)?.etiqueta || id)
        .join(" ");

      const universo = normalizarBusqueda([
        elemento.titulo,
        elemento.descripcion,
        elemento.mensajeAlumno,
        elemento.enlace,
        temas
      ].join(" "));

      if (!universo.includes(buscar)) return false;
    }

    return true;
  });

  resultado.sort((a, b) => {
    const fechaA = fechaMs(a.createdAt);
    const fechaB = fechaMs(b.createdAt);
    return orden === "antiguos"
      ? fechaA - fechaB
      : fechaB - fechaA;
  });

  return resultado;
}

function renderTemas(temas = []) {
  if (!Array.isArray(temas) || !temas.length) return "";

  return `
    <div class="baul-temas">
      ${temas.map(id => {
        const tema = obtenerTemaBaul(id);
        return tema
          ? `<span class="baul-tema">${escapar(tema.etiqueta)}</span>`
          : "";
      }).join("")}
    </div>
  `;
}

function cardElemento(elemento) {
  const tipo = obtenerTipoBaul(elemento.tipo);
  const favorito = elemento.favorito === true;
  const recursos = [
    elemento.enlace ? `<span class="baul-recurso">🔗 Enlace</span>` : "",
    elemento.tieneAdjunto ? `<span class="baul-recurso">📎 Adjunto</span>` : ""
  ].filter(Boolean).join("");

  const nombreActor = texto(elemento.createdByNombre, "Usuario");
  const meta = `Guardado por ${escapar(nombreActor)} · ${escapar(formatearFecha(elemento.createdAt))}`;

  return `
    <article class="baul-card" data-elemento-card="${elemento.id}">
      <div class="baul-card__cabecera">
        <span class="baul-tipo">
          <span aria-hidden="true">${tipo.icono}</span>
          ${escapar(tipo.etiqueta)}
        </span>

        <button
          type="button"
          class="baul-corazon ${favorito ? "activo" : ""}"
          data-favorito="${elemento.id}"
          aria-pressed="${favorito ? "true" : "false"}"
          aria-label="${favorito ? "Quitar de favoritos" : "Marcar como favorito"}"
          title="${puedeEditar ? (favorito ? "Quitar de favoritos" : "Marcar como favorito") : "Favorito del Baúl"}"
          ${puedeEditar ? "" : "disabled"}>
          ${favorito ? "♥" : "♡"}
        </button>
      </div>

      <h3>${escapar(elemento.titulo)}</h3>
      <p class="baul-card__descripcion">${escapar(elemento.descripcion)}</p>

      ${elemento.mensajeAlumno
        ? `<p class="baul-card__mensaje">💌 ${escapar(elemento.mensajeAlumno)}</p>`
        : ""}

      ${renderTemas(elemento.temas)}

      ${recursos
        ? `<div class="baul-card__recursos">${recursos}</div>`
        : ""}

      <div class="baul-card__pie">
        <span class="baul-card__meta">${meta}</span>
        <button
          type="button"
          class="baul-card__ver"
          data-ver="${elemento.id}">
          Ver →
        </button>
      </div>
    </article>
  `;
}

function render() {
  actualizarEstadoFiltros();

  const resultado = elementosFiltrados();
  $("contadorResultados").textContent =
    resultado.length === 1
      ? "1 cosa encontrada"
      : `${resultado.length} cosas encontradas`;

  if (!resultado.length) {
    $("baulGrid").innerHTML = `
      <div class="baul-vacio">
        <span class="baul-vacio__icono">${elementos.length ? "🔎" : "🧰"}</span>
        ${
          elementos.length
            ? "No encontramos nada con estos filtros."
            : puedeEditar
              ? "Tu Baúl está vacío. Cuando quieras, guarda aquí la primera cosa que merezca la pena conservar."
              : "Todavía no hay nada guardado en este Baúl."
        }
      </div>
    `;
    return;
  }

  $("baulGrid").innerHTML = resultado.map(cardElemento).join("");
}

function aplicarContexto() {
  const nombre = texto(
    contexto?.personaActiva?.nombreVisible,
    texto(contexto?.personaActiva?.nombre, "el alumno")
  );

  $("baulSubtitulo").textContent =
    `${nombre}, aquí podemos guardar vídeos, artículos, ideas, mensajes, enlaces y documentos que merezca la pena conservar para ti.`;

  $("nombreAlumnoEditor").textContent = nombre;

  puedeEditar =
    contexto.esPersonaPropia ||
    ["gestion", "administracion"].includes(contexto.nivelAcceso);

  $("nuevoElemento").hidden = !puedeEditar;
  $("baulAcceso").className =
    `baul-acceso ${puedeEditar ? "baul-acceso--gestion" : "baul-acceso--consulta"}`;

  $("baulAcceso").textContent = puedeEditar
    ? "✏️ Puedes guardar y actualizar"
    : "👁️ Acceso de consulta";
}

function limpiarEditor() {
  $("formBaul").reset();
  $("elementoId").value = "";
  $("elementoTipo").value = TIPOS_BAUL[0].id;
  $("elementoFavorito").checked = false;
  document.querySelectorAll("[data-tema-editor]").forEach(input => {
    input.checked = false;
  });
  $("elementoAdjunto").value = "";
  $("adjuntoActual").classList.remove("visible");
  quitarAdjuntoActual = false;
}

function abrirEditor(elemento = null) {
  if (!puedeEditar) return;

  limpiarEditor();

  if (elemento) {
    $("editorTitulo").textContent = "Editar elemento del Baúl";
    $("elementoId").value = elemento.id;
    $("elementoTitulo").value = texto(elemento.titulo);
    $("elementoTipo").value = texto(elemento.tipo, TIPOS_BAUL[0].id);
    $("elementoDescripcion").value = texto(elemento.descripcion);
    $("elementoMensaje").value = texto(elemento.mensajeAlumno);
    $("elementoEnlace").value = texto(elemento.enlace);
    $("elementoFavorito").checked = elemento.favorito === true;

    document.querySelectorAll("[data-tema-editor]").forEach(input => {
      input.checked = Array.isArray(elemento.temas) &&
        elemento.temas.includes(input.value);
    });

    if (elemento.tieneAdjunto) {
      $("adjuntoActualTexto").textContent =
        `📎 ${texto(elemento.adjuntoNombre, "Documento adjunto")} ${formatearTamano(elemento.adjuntoTamano)}`;
      $("adjuntoActual").classList.add("visible");
    }
  } else {
    $("editorTitulo").textContent = "Guardar algo en el Baúl";
  }

  abrirModal("modalEditor");
  setTimeout(() => $("elementoTitulo").focus(), 50);
}

function elementoPorId(id) {
  return elementos.find(item => item.id === id) || null;
}

function renderDetalle(elemento) {
  const tipo = obtenerTipoBaul(elemento.tipo);
  const favorito = elemento.favorito === true;
  const nombreActor = texto(elemento.createdByNombre, "Usuario");
  const actualizadoPor = texto(elemento.updatedByNombre);

  const accionesRecurso = [
    elemento.enlace
      ? `<a class="baul-boton baul-boton--secundario" href="${escapar(elemento.enlace)}" target="_blank" rel="noopener noreferrer">🔗 Abrir enlace</a>`
      : "",
    elemento.tieneAdjunto
      ? `<button class="baul-boton baul-boton--secundario" type="button" data-abrir-adjunto="${elemento.id}">📎 Abrir adjunto</button>`
      : ""
  ].filter(Boolean).join("");

  $("detalleTitulo").textContent = "Detalle del Baúl";
  $("detalleContenido").innerHTML = `
    <div class="baul-detalle__cabecera">
      <span class="baul-tipo">${tipo.icono} ${escapar(tipo.etiqueta)}</span>
      <span class="baul-corazon ${favorito ? "activo" : ""}" aria-label="${favorito ? "Favorito" : "No favorito"}">
        ${favorito ? "♥" : "♡"}
      </span>
    </div>

    <h3>${escapar(elemento.titulo)}</h3>
    ${renderTemas(elemento.temas)}

    <p class="baul-detalle__texto">${escapar(elemento.descripcion)}</p>

    ${elemento.mensajeAlumno
      ? `<div class="baul-detalle__mensaje">💌 ${escapar(elemento.mensajeAlumno)}</div>`
      : ""}

    <div class="baul-detalle__meta">
      Guardado por ${escapar(nombreActor)} · ${escapar(formatearFecha(elemento.createdAt))}
      ${
        actualizadoPor
          ? `<br>Última actualización por ${escapar(actualizadoPor)} · ${escapar(formatearFecha(elemento.updatedAt))}`
          : ""
      }
      ${
        elemento.tieneAdjunto
          ? `<br>Adjunto: ${escapar(texto(elemento.adjuntoNombre, "Documento"))} ${escapar(formatearTamano(elemento.adjuntoTamano))}`
          : ""
      }
    </div>

    <div class="baul-detalle__acciones">
      ${accionesRecurso}
      ${
        puedeEditar
          ? `
            <button class="baul-boton baul-boton--secundario" type="button" data-editar-detalle="${elemento.id}">✏️ Editar</button>
            <button class="baul-boton baul-boton--peligro" type="button" data-eliminar-detalle="${elemento.id}">🗑️ Eliminar</button>
          `
          : ""
      }
    </div>
  `;
}

function abrirDetalle(id) {
  const elemento = elementoPorId(id);
  if (!elemento) return;
  detalleActualId = id;
  renderDetalle(elemento);
  abrirModal("modalDetalle");
}

function leerArchivoComoDataUrl(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(String(lector.result || ""));
    lector.onerror = () => reject(
      lector.error || new Error("No se pudo leer el documento adjunto.")
    );
    lector.readAsDataURL(archivo);
  });
}

async function prepararAdjuntoSeleccionado() {
  const archivo = $("elementoAdjunto").files?.[0];
  if (!archivo) return null;

  if (archivo.size > MAX_ADJUNTO_BAUL_BYTES) {
    throw new Error(
      `El adjunto supera el máximo de ${Math.round(MAX_ADJUNTO_BAUL_BYTES / 1024)} KB.`
    );
  }

  return {
    nombre: archivo.name,
    mimeType: archivo.type,
    tamano: archivo.size,
    dataUrl: await leerArchivoComoDataUrl(archivo)
  };
}

function temasEditor() {
  return [...document.querySelectorAll("[data-tema-editor]:checked")]
    .map(input => input.value);
}

async function guardarDesdeFormulario(evento) {
  evento.preventDefault();
  if (!puedeEditar) return;

  const boton = $("guardarElemento");
  boton.disabled = true;
  const textoOriginal = boton.textContent;
  boton.textContent = "Guardando…";

  try {
    const datos = {
      titulo: $("elementoTitulo").value,
      tipo: $("elementoTipo").value,
      temas: temasEditor(),
      descripcion: $("elementoDescripcion").value,
      mensajeAlumno: $("elementoMensaje").value,
      enlace: $("elementoEnlace").value,
      favorito: $("elementoFavorito").checked
    };

    const adjunto = await prepararAdjuntoSeleccionado();
    const id = texto($("elementoId").value);

    if (id) {
      await Baul.actualizar(id, datos, {
        adjunto,
        eliminarAdjunto: quitarAdjuntoActual && !adjunto
      });
      mostrarToast("Elemento actualizado en el Baúl.");
    } else {
      await Baul.guardar(datos, adjunto);
      mostrarToast("Guardado en el Baúl.");
    }

    cerrarModal("modalEditor");
  } catch (error) {
    console.error(error);
    mostrarToast(
      texto(error?.message, "No se pudo guardar el elemento."),
      { error: true }
    );
  } finally {
    boton.disabled = false;
    boton.textContent = textoOriginal;
  }
}

async function alternarFavorito(id) {
  if (!puedeEditar) return;

  const elemento = elementoPorId(id);
  if (!elemento) return;

  try {
    await Baul.establecerFavorito(id, elemento.favorito !== true);
  } catch (error) {
    console.error(error);
    mostrarToast(
      texto(error?.message, "No se pudo actualizar el favorito."),
      { error: true }
    );
  }
}

async function eliminarElemento(id) {
  if (!puedeEditar) return;

  const elemento = elementoPorId(id);
  if (!elemento) return;

  if (!confirm(`¿Quieres eliminar “${elemento.titulo}” del Baúl?`)) {
    return;
  }

  try {
    await Baul.eliminar(id);
    cerrarModal("modalDetalle");
    mostrarToast("Elemento eliminado del Baúl.");
  } catch (error) {
    console.error(error);
    mostrarToast(
      texto(error?.message, "No se pudo eliminar el elemento."),
      { error: true }
    );
  }
}

async function abrirAdjunto(id) {
  try {
    const adjunto = await Baul.leerAdjunto(id);
    if (!adjunto?.dataUrl) {
      throw new Error("El documento adjunto ya no está disponible.");
    }

    const respuesta = await fetch(adjunto.dataUrl);
    const blob = await respuesta.blob();
    const url = URL.createObjectURL(blob);
    const ventana = window.open(url, "_blank");
    if (ventana) ventana.opener = null;

    if (!ventana) {
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = texto(adjunto.nombre, "adjunto");
      enlace.click();
    }

    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (error) {
    console.error(error);
    mostrarToast(
      texto(error?.message, "No se pudo abrir el documento adjunto."),
      { error: true }
    );
  }
}

function limpiarFiltros() {
  $("filtroBuscar").value = "";
  $("filtroTipo").value = "";
  $("filtroTema").value = "";
  $("filtroOrden").value = "recientes";
  favoritosActivos = false;
  render();
}

function configurarEventos() {
  $("nuevoElemento").addEventListener("click", () => abrirEditor());
  $("cerrarEditor").addEventListener("click", () => cerrarModal("modalEditor"));
  $("cancelarEditor").addEventListener("click", () => cerrarModal("modalEditor"));
  $("cerrarDetalle").addEventListener("click", () => cerrarModal("modalDetalle"));
  $("formBaul").addEventListener("submit", guardarDesdeFormulario);

  $("quitarAdjunto").addEventListener("click", () => {
    quitarAdjuntoActual = true;
    $("elementoAdjunto").value = "";
    $("adjuntoActualTexto").textContent = "El adjunto actual se quitará al guardar.";
    $("adjuntoActual").classList.add("visible");
  });

  $("elementoAdjunto").addEventListener("change", () => {
    const archivo = $("elementoAdjunto").files?.[0];
    if (!archivo) return;

    if (archivo.size > MAX_ADJUNTO_BAUL_BYTES) {
      $("elementoAdjunto").value = "";
      mostrarToast(
        `El adjunto supera el máximo de ${Math.round(MAX_ADJUNTO_BAUL_BYTES / 1024)} KB.`,
        { error: true }
      );
      return;
    }

    quitarAdjuntoActual = false;
  });

  ["filtroBuscar", "filtroTipo", "filtroTema", "filtroOrden"].forEach(id => {
    $(id).addEventListener(
      id === "filtroBuscar" ? "input" : "change",
      render
    );
  });

  $("filtroFavoritos").addEventListener("click", () => {
    favoritosActivos = !favoritosActivos;
    render();
  });

  $("limpiarFiltros").addEventListener("click", limpiarFiltros);

  $("baulGrid").addEventListener("click", evento => {
    const favorito = evento.target.closest("[data-favorito]");
    if (favorito) {
      alternarFavorito(favorito.dataset.favorito);
      return;
    }

    const ver = evento.target.closest("[data-ver]");
    if (ver) {
      abrirDetalle(ver.dataset.ver);
    }
  });

  $("detalleContenido").addEventListener("click", evento => {
    const adjunto = evento.target.closest("[data-abrir-adjunto]");
    if (adjunto) {
      abrirAdjunto(adjunto.dataset.abrirAdjunto);
      return;
    }

    const editar = evento.target.closest("[data-editar-detalle]");
    if (editar) {
      const elemento = elementoPorId(editar.dataset.editarDetalle);
      cerrarModal("modalDetalle");
      abrirEditor(elemento);
      return;
    }

    const eliminar = evento.target.closest("[data-eliminar-detalle]");
    if (eliminar) {
      eliminarElemento(eliminar.dataset.eliminarDetalle);
    }
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

  $("baulSincronizacion").textContent = "☁️ Cargando tu Baúl…";

  cancelarObservacion = Baul.observar(
    datos => {
      elementos = datos;
      render();

      if (detalleActualId && $("modalDetalle").classList.contains("abierto")) {
        const actualizado = elementoPorId(detalleActualId);
        if (actualizado) {
          renderDetalle(actualizado);
        } else {
          cerrarModal("modalDetalle");
        }
      }

      $("baulSincronizacion").textContent =
        "☁️ Baúl sincronizado con Firestore.";
    },
    error => {
      console.error(error);
      $("baulSincronizacion").textContent =
        "⚠️ No se pudo conectar con el Baúl.";
      $("baulGrid").innerHTML = `
        <div class="baul-vacio">
          <span class="baul-vacio__icono">⚠️</span>
          No pudimos abrir este Baúl. Revisa la conexión o los permisos.
        </div>
      `;
    }
  );
}

async function inicializar() {
  contexto = await ContextoUsuario.inicializar();
  aplicarContexto();
  poblarCatalogos();
  configurarEventos();
  render();
  iniciarObservacion();
}

protegerPagina({
  loginUrl: "../login.html",
  onAuthenticated: inicializar
});
