import { Academia } from "../../compartido/api/academia.js";
import { auth } from "../../compartido/firebase/firebase-config.js";

const $ = id => document.getElementById(id);
const parametros = new URLSearchParams(window.location.search);
const misionId = String(parametros.get("misionId") || "").trim();

const MODULOS = Object.freeze({
  "rincon-lectura": { nombre:"Mi Rincón de Lectura", icono:"📚" },
  detectives: { nombre:"Detectives", icono:"🔎" },
  "creciendo-por-dentro": { nombre:"Creciendo por Dentro", icono:"🌱" },
  biblioteca: { nombre:"Biblioteca Encantada", icono:"📖" },
  libre: { nombre:"Otras aventuras", icono:"✨" }
});

function escapar(valor = "") {
  return String(valor ?? "").replace(/[&<>"']/g, caracter => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  })[caracter]);
}

function texto(valor = "") {
  return String(valor ?? "").trim();
}

function fechaJs(valor) {
  if (!valor) return null;
  if (typeof valor?.toDate === "function") return valor.toDate();
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}

function fechaTexto(valor) {
  const fecha = fechaJs(valor);
  if (!fecha) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle:"medium",
    timeStyle:"short"
  }).format(fecha);
}

function duracionTexto(segundos = 0) {
  const total = Math.max(0, Math.round(Number(segundos) || 0));
  const minutos = Math.floor(total / 60);
  const resto = total % 60;
  if (!minutos) return `${resto} s`;
  return `${minutos} min ${String(resto).padStart(2,"0")} s`;
}

function estadoTexto(estado = "") {
  return ({
    pendiente:"Por hacer",
    asignada:"Por hacer",
    en_curso:"En curso",
    necesita_ayuda:"Necesita ayuda",
    vencida:"Puede retomarse",
    pendiente_validacion:"Esperando revisión",
    completada_pendiente_validacion:"Esperando revisión",
    completada:"Completada"
  })[estado] || texto(estado) || "Sin estado";
}

function valorFechaEvidencia(evidencia = {}) {
  return (
    evidencia.ocurridaEn ||
    evidencia.aplicadaEn ||
    evidencia.creadaEn ||
    null
  );
}

function ordenarEvidencias(evidencias = []) {
  return [...evidencias].sort(
    (a,b) => (fechaJs(valorFechaEvidencia(b))?.getTime() || 0) -
             (fechaJs(valorFechaEvidencia(a))?.getTime() || 0)
  );
}

function valorLegible(valor) {
  if (valor === null || valor === undefined || valor === "") return "—";
  if (typeof valor === "boolean") return valor ? "Sí" : "No";
  if (typeof valor === "number") return String(valor);
  if (typeof valor === "string") return valor;
  if (Array.isArray(valor)) {
    return valor
      .map(item => typeof item === "object" ? "" : String(item ?? ""))
      .filter(Boolean)
      .join(" · ") || `${valor.length} elemento${valor.length === 1 ? "" : "s"}`;
  }
  return "Dato guardado";
}

function listaDatosHtml(datos = {}, { excluir = [] } = {}) {
  const omitidas = new Set(excluir);
  const filas = Object.entries(datos || {})
    .filter(([clave, valor]) =>
      !omitidas.has(clave) &&
      valor !== undefined &&
      valor !== null &&
      valor !== "" &&
      typeof valor !== "object"
    );

  if (!filas.length) return "";

  return `
    <dl class="evidencia-lista-datos">
      ${filas.map(([clave, valor]) => `
        <div>
          <dt>${escapar(clave.replace(/([a-z])([A-Z])/g,"$1 $2"))}</dt>
          <dd>${escapar(valorLegible(valor))}</dd>
        </div>
      `).join("")}
    </dl>
  `;
}

function bloque(titulo, contenido, clase = "") {
  if (!contenido) return "";
  return `
    <section class="evidencia-bloque ${clase}">
      <h4>${titulo}</h4>
      ${contenido}
    </section>
  `;
}

function audioHtml(audioData, duracion = 0) {
  if (!texto(audioData)) return "";
  return `
    <audio controls preload="metadata" src="${escapar(audioData)}"></audio>
    ${Number(duracion) > 0 ? `<p>Duración guardada: ${escapar(duracionTexto(duracion))}</p>` : ""}
  `;
}

function tarjetaHtml({ evidencia, titulo, subtitulo = "", contenido = "" }) {
  const fecha = fechaTexto(valorFechaEvidencia(evidencia));
  const tipo = texto(evidencia.tipo) || "evidencia";
  const modulo = MODULOS[texto(evidencia.modulo)] || { nombre:texto(evidencia.modulo) || "Módulo", icono:"🗂️" };

  return `
    <article class="evidencia-card">
      <header class="evidencia-card__cabecera">
        <div class="evidencia-card__titulo">
          <span class="trabajo-sobrelinea">${escapar(modulo.icono)} ${escapar(modulo.nombre)}</span>
          <h3>${escapar(titulo || "Actividad guardada")}</h3>
          <p>${escapar(subtitulo || fecha)}</p>
        </div>
        <div class="evidencia-card__badges">
          <span class="evidencia-badge">✅ Evidencia guardada</span>
          <span class="evidencia-badge">${escapar(tipo)}</span>
        </div>
      </header>
      <div class="evidencia-card__cuerpo">
        ${contenido || '<div class="trabajo-vacio">El registro existe, pero no contiene más detalle visualizable.</div>'}
      </div>
    </article>
  `;
}

function progresoMision(tarea = {}) {
  const criterio = tarea.criterioCumplimiento || {};
  const progreso = tarea.progreso || {};
  const actual = Number(progreso.cantidadActual || 0);
  const objetivo = Number(
    criterio.cantidadObjetivo ??
    progreso.cantidadObjetivo ??
    0
  );
  return { actual, objetivo };
}

function renderMision(tarea, perfil, evidencias) {
  const presentacion = tarea.presentacionAlumno || {};
  const modulo = MODULOS[tarea.modulo] || { nombre:tarea.modulo || "Misión", icono:"🌟" };
  const { actual, objetivo } = progresoMision(tarea);

  $("tituloMision").textContent =
    presentacion.tituloMision || tarea.titulo || "Misión";
  $("descripcionMision").textContent =
    presentacion.descripcionMision || tarea.descripcion || "";
  $("nombrePersona").textContent =
    perfil?.nombreVisible || perfil?.nombre || "Alumno";
  $("progresoMision").textContent = objetivo > 0
    ? `${actual} de ${objetivo} evidencias objetivo`
    : `${evidencias.length} ${evidencias.length === 1 ? "evidencia" : "evidencias"} guardadas`;

  $("chipsMision").innerHTML = [
    `${modulo.icono} ${modulo.nombre}`,
    `Estado: ${estadoTexto(tarea.estado)}`,
    tarea.tiempoEstimadoMinutos ? `⏱️ ${Number(tarea.tiempoEstimadoMinutos)} min estimados` : "",
    tarea.materia ? `📚 ${tarea.materia}` : "",
    tarea.tema ? `🎯 ${tarea.tema}` : ""
  ].filter(Boolean).map(item => `<span class="trabajo-chip">${escapar(item)}</span>`).join("");

  const datos = [];
  const objetivoTexto = texto(tarea.objetivo);
  const criterioFinal = texto(tarea.criterioFinalizacion);
  const mensajeLia = texto(presentacion.mensaje);

  if (objetivoTexto) datos.push({ titulo:"🎯 Objetivo", valor:objetivoTexto, ancho:true });
  if (criterioFinal) datos.push({ titulo:"✅ Criterio de finalización", valor:criterioFinal, ancho:true });
  if (mensajeLia) datos.push({ titulo:"🦜 Mensaje de Lía", valor:mensajeLia, ancho:true });
  if (tarea.fechaInicio) datos.push({ titulo:"Fecha de inicio", valor:fechaTexto(tarea.fechaInicio) });
  if (tarea.fechaLimite) datos.push({ titulo:"Fecha límite", valor:fechaTexto(tarea.fechaLimite) });
  if (tarea.progreso?.iniciadaEn) datos.push({ titulo:"Comenzada", valor:fechaTexto(tarea.progreso.iniciadaEn) });
  if (tarea.progreso?.completadaEn) datos.push({ titulo:"Terminada por el alumno", valor:fechaTexto(tarea.progreso.completadaEn) });

  $("datosMision").innerHTML = datos.length
    ? datos.map(item => `
        <article class="trabajo-dato ${item.ancho ? "trabajo-dato--ancho" : ""}">
          <strong>${escapar(item.titulo)}</strong>
          <p>${escapar(item.valor)}</p>
        </article>
      `).join("")
    : '<div class="trabajo-vacio trabajo-dato--ancho">La Misión no necesita información adicional para interpretar sus evidencias.</div>';
}

function detallePronunciacionHtml(evidencia = {}) {
  const resultado = evidencia.resultado || {};
  const palabras = Array.isArray(resultado.palabras) ? resultado.palabras : [];
  if (!palabras.length) return "";

  const reconocidas = palabras.filter(item => item.superadaPalabra).length;

  return `
    <div class="evidencia-grid">
      <div class="evidencia-metrica"><strong>${palabras.length}</strong><span>palabras practicadas</span></div>
      <div class="evidencia-metrica"><strong>${reconocidas}</strong><span>reconocidas</span></div>
      <div class="evidencia-metrica"><strong>${palabras.reduce((s,item)=>s+Number(item.intentosPalabra||0),0)}</strong><span>intentos de palabra</span></div>
    </div>
    <div class="evidencia-respuestas">
      ${palabras.map((item,index) => `
        <article class="evidencia-respuesta">
          <strong>${index + 1}. ${escapar(item.palabra || "Palabra")}</strong>
          <span>${item.ultimaPalabraReconocida
            ? `Lía entendió «${escapar(item.ultimaPalabraReconocida)}».`
            : "Sin transcripción de palabra guardada."}</span>
          <small>
            ${Number(item.intentosPalabra || 0)} intento(s) ·
            ${item.superadaPalabra ? "✅ reconocida" : "🌱 en práctica"}
          </small>
          ${Number(item.intentosFrase || 0) > 0 ? `
            <span style="margin-top:6px">Frase: ${item.ultimaFraseReconocida
              ? `«${escapar(item.ultimaFraseReconocida)}»`
              : "sin transcripción guardada"}</span>
            <small>${Number(item.intentosFrase || 0)} intento(s) de frase</small>
          ` : ""}
        </article>
      `).join("")}
    </div>
  `;
}

async function historiasLectura() {
  try {
    const modulo = await import("../rincon-lectura/historias.js");
    return new Map((modulo.HISTORIAS || []).map(item => [String(item.id), item]));
  } catch (error) {
    console.debug("No se pudo cargar el catálogo editorial de Lectura.", error);
    return new Map();
  }
}

function respuestaLecturaTexto(historia, preguntaId, respuestaId) {
  const pregunta = historia?.preguntas?.find(item => String(item.id) === String(preguntaId));
  if (!pregunta) return String(respuestaId || "");
  const opcion = pregunta.opciones?.find(item =>
    String(item.id ?? item.value ?? item.texto ?? "") === String(respuestaId ?? "")
  );
  return String(opcion?.texto || opcion?.label || respuestaId || "");
}

function respuestasLecturaHtml(sesion = {}, historia = null) {
  const respuestas = sesion.respuestas && typeof sesion.respuestas === "object"
    ? sesion.respuestas
    : {};
  const filas = Object.entries(respuestas);
  if (!filas.length) return "";

  return `
    <div class="evidencia-respuestas">
      ${filas.map(([preguntaId, valor], index) => {
        const respuesta = valor && typeof valor === "object" ? valor : { respuesta:valor };
        const pregunta = historia?.preguntas?.find(item => String(item.id) === String(preguntaId));
        const textoPregunta = pregunta?.texto || `Pregunta ${index + 1}`;
        const textoRespuesta = respuestaLecturaTexto(historia, preguntaId, respuesta.respuesta);
        const tieneCorrecta = Object.prototype.hasOwnProperty.call(respuesta,"correcta");
        return `
          <article class="evidencia-respuesta">
            <strong>${escapar(textoPregunta)}</strong>
            <span>${escapar(textoRespuesta || "Sin respuesta guardada")}</span>
            <small>
              ${Number(respuesta.intentos || 0) ? `${Number(respuesta.intentos)} intento(s)` : "Respuesta guardada"}
              ${tieneCorrecta ? (respuesta.correcta ? " · ✅ correcta" : " · 🌱 para revisar") : ""}
            </small>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function tarjetaLectura(evidencia, sesion, historia) {
  if (evidencia.tipo === "pronunciacion_completada") {
    return tarjetaHtml({
      evidencia,
      titulo:evidencia.resultado?.titulo || "Refuerzo de pronunciación",
      subtitulo:fechaTexto(valorFechaEvidencia(evidencia)),
      contenido:bloque("🗣️ Práctica de pronunciación", detallePronunciacionHtml(evidencia), "evidencia-bloque--resultado") +
        bloque("🗂️ Datos de la evidencia", listaDatosHtml(evidencia.atributos || {}))
    });
  }

  const analisis = sesion?.analisisLectura && typeof sesion.analisisLectura === "object"
    ? sesion.analisisLectura
    : {};
  const titulo = sesion?.titulo || historia?.titulo || evidencia.resultado?.titulo || evidencia.actividadId || "Lectura";
  const metricas = (Number(analisis.coincidencia || 0) || Number(analisis.palabrasTexto || 0) || Number(sesion?.intentos || 0))
    ? `
      <div class="evidencia-grid">
        <div class="evidencia-metrica"><strong>${Number(analisis.coincidencia || 0)}%</strong><span>coincidencia</span></div>
        <div class="evidencia-metrica"><strong>${Number(sesion?.intentos || evidencia.resultado?.intentos || 0) || "—"}</strong><span>intentos</span></div>
        <div class="evidencia-metrica"><strong>${Number(analisis.palabrasPorMinuto || 0) || "—"}</strong><span>palabras/minuto</span></div>
      </div>`
    : "";

  const contenido = [
    metricas ? bloque("🔎 Resultado de la lectura", metricas, "evidencia-bloque--resultado") : "",
    sesion?.audioData ? bloque("🎙️ Grabación", audioHtml(sesion.audioData, sesion.duracion), "evidencia-bloque--audio") : "",
    texto(sesion?.transcripcion) ? bloque("🦜 Lo que entendió Lía", `<p>${escapar(sesion.transcripcion)}</p>`) : "",
    respuestasLecturaHtml(sesion || {}, historia) ? bloque("🧠 Comprensión", respuestasLecturaHtml(sesion || {}, historia)) : "",
    texto(sesion?.reflexion) ? bloque("🌟 Reflexión", `<p>${escapar(sesion.reflexion)}</p>`) : "",
    texto(sesion?.fraseDelDia) ? bloque("🌈 Frase del día", `<p>${escapar(sesion.fraseDelDia)}</p>`) : "",
    texto(sesion?.observacionFamilia) ? bloque("👨‍👩‍👧 Observación familiar", `<p>${escapar(sesion.observacionFamilia)}</p>`, "evidencia-bloque--familia") : "",
    !sesion ? bloque("🗂️ Evidencia disponible", listaDatosHtml(evidencia.resultado || {})) : ""
  ].filter(Boolean).join("");

  return tarjetaHtml({ evidencia, titulo, subtitulo:fechaTexto(valorFechaEvidencia(evidencia)), contenido });
}

async function renderLectura(evidencias) {
  const [sesiones, historias] = await Promise.all([
    Academia.rinconLectura.leerSesiones(),
    historiasLectura()
  ]);

  return evidencias.map(evidencia => {
    const sesion = sesiones.find(item =>
      (evidencia.sesionId && String(item.id) === String(evidencia.sesionId)) ||
      String(item.historiaId || item.id) === String(evidencia.actividadId || "")
    ) || null;
    const historia = historias.get(String(evidencia.actividadId || sesion?.historiaId || "")) || null;
    return tarjetaLectura(evidencia, sesion, historia);
  }).join("");
}

async function catalogoSemillas() {
  try {
    const respuesta = await fetch("../creciendo-por-dentro/semillas.json", { cache:"no-store" });
    if (!respuesta.ok) return new Map();
    const datos = await respuesta.json();
    return new Map((datos.semillas || []).map(item => [String(item.id), item]));
  } catch (error) {
    console.debug("No se pudo cargar el catálogo editorial de Semillas.", error);
    return new Map();
  }
}

function respuestasSemillaHtml(sesion = {}, semilla = null) {
  const respuestas = sesion.respuestas && typeof sesion.respuestas === "object"
    ? sesion.respuestas
    : {};
  const pasos = Array.isArray(semilla?.pasos) ? semilla.pasos : [];
  if (!Object.keys(respuestas).length && !pasos.length) return "";

  const filas = pasos.length
    ? pasos.map((paso,index) => {
        const valor = respuestas[paso.id];
        const ids = Array.isArray(valor) ? valor.map(String) : valor ? [String(valor)] : [];
        const seleccion = ids.map(id =>
          paso.opciones?.find(opcion => String(opcion.id) === id)?.texto || id
        ).filter(Boolean);
        const propia = texto(respuestas[`${paso.id}__other`]);
        return { titulo:`${Number(paso.orden || index + 1)}. ${paso.titulo || "Paso"}`, seleccion, propia };
      })
    : Object.entries(respuestas)
        .filter(([clave]) => !clave.endsWith("__other"))
        .map(([clave,valor]) => ({ titulo:clave, seleccion:Array.isArray(valor) ? valor : [valor], propia:texto(respuestas[`${clave}__other`]) }));

  return `
    <div class="evidencia-respuestas">
      ${filas.map(fila => `
        <article class="evidencia-respuesta">
          <strong>${escapar(fila.titulo)}</strong>
          <span>${escapar(fila.seleccion.filter(Boolean).join(" · ") || "Sin selección guardada")}</span>
          ${fila.propia ? `<span>Con sus palabras: ${escapar(fila.propia)}</span>` : ""}
        </article>
      `).join("")}
    </div>
  `;
}

function tarjetaSemilla(evidencia, sesion, semilla) {
  const analisis = sesion?.analisisEducativo && typeof sesion.analisisEducativo === "object"
    ? sesion.analisisEducativo
    : {};
  const titulo = sesion?.titulo || semilla?.titulo || evidencia.resultado?.titulo || evidencia.actividadId || "Semilla";
  const respuestas = respuestasSemillaHtml(sesion || {}, semilla);
  const contenido = [
    respuestas ? bloque("💭 Cómo construyó su respuesta", respuestas) : "",
    texto(sesion?.respuestaConstruida) ? bloque("🗣️ Mi frase", `<p>${escapar(sesion.respuestaConstruida)}</p>`, "evidencia-bloque--resultado") : "",
    sesion?.audioData ? bloque("🎙️ Grabación", audioHtml(sesion.audioData, sesion.duracionAudio || sesion.duracion), "evidencia-bloque--audio") : "",
    texto(sesion?.transcripcion) ? bloque("🦜 Transcripción", `<p>${escapar(sesion.transcripcion)}</p>`) : "",
    Object.keys(analisis).length ? bloque("🔎 Datos de la práctica", listaDatosHtml(analisis)) : "",
    texto(sesion?.observacionFamilia) ? bloque("👨‍👩‍👧 Observación familiar", `<p>${escapar(sesion.observacionFamilia)}</p>`, "evidencia-bloque--familia") : "",
    !sesion ? bloque("🗂️ Evidencia disponible", listaDatosHtml(evidencia.resultado || {})) : ""
  ].filter(Boolean).join("");

  return tarjetaHtml({ evidencia, titulo, subtitulo:fechaTexto(valorFechaEvidencia(evidencia)), contenido });
}

async function renderSemillas(evidencias) {
  const [sesiones, catalogo] = await Promise.all([
    Academia.semillas.leerSesiones(),
    catalogoSemillas()
  ]);

  return evidencias.map(evidencia => {
    const sesion = sesiones.find(item =>
      (evidencia.sesionId && String(item.id) === String(evidencia.sesionId)) ||
      String(item.semillaId || "") === String(evidencia.actividadId || "")
    ) || null;
    const semilla = catalogo.get(String(evidencia.actividadId || sesion?.semillaId || "")) || null;
    return tarjetaSemilla(evidencia, sesion, semilla);
  }).join("");
}

function estrellas(valor = 0) {
  const cantidad = Math.max(0, Math.min(5, Number(valor) || 0));
  return cantidad ? "⭐".repeat(cantidad) : "Sin valoración";
}

function tarjetaBiblioteca(evidencia, libro, audio) {
  const titulo = libro?.title || evidencia.resultado?.titulo || "Libro compartido";
  const ficha = libro ? `
    <dl class="evidencia-lista-datos">
      <div><dt>Autor</dt><dd>${escapar(libro.author || "No indicado")}</dd></div>
      <div><dt>Estado de lectura</dt><dd>${escapar(libro.readingStatus || "No indicado")}</dd></div>
      <div><dt>Valoración</dt><dd>${escapar(estrellas(libro.rating))}</dd></div>
      <div><dt>Personaje favorito</dt><dd>${escapar(libro.favoriteCharacter || "No indicado")}</dd></div>
    </dl>` : "";

  const contenido = [
    ficha ? bloque("📖 El libro", ficha, "evidencia-bloque--resultado") : "",
    texto(libro?.favoritePart) ? bloque("💛 Parte favorita", `<p>${escapar(libro.favoritePart)}</p>`) : "",
    texto(libro?.learning) ? bloque("🌱 Lo que aprendió", `<p>${escapar(libro.learning)}</p>`) : "",
    texto(libro?.newWords) ? bloque("🗣️ Palabras nuevas", `<p>${escapar(libro.newWords)}</p>`) : "",
    texto(libro?.review) ? bloque("✍️ Reseña", `<p>${escapar(libro.review)}</p>`) : "",
    audio?.audioData ? bloque("🎙️ Explicación oral", audioHtml(audio.audioData, audio.duration), "evidencia-bloque--audio") : "",
    texto(audio?.transcript) ? bloque("🦜 Transcripción", `<p>${escapar(audio.transcript)}</p>`) : "",
    texto(audio?.familyObservation) ? bloque("👨‍👩‍👧 Observación familiar", `<p>${escapar(audio.familyObservation)}</p>`, "evidencia-bloque--familia") : "",
    !libro ? bloque("🗂️ Evidencia disponible", listaDatosHtml(evidencia.resultado || {})) : ""
  ].filter(Boolean).join("");

  return tarjetaHtml({ evidencia, titulo, subtitulo:fechaTexto(valorFechaEvidencia(evidencia)), contenido });
}

async function renderBiblioteca(evidencias) {
  const libros = await Academia.biblioteca.leer();
  const items = await Promise.all(evidencias.map(async evidencia => {
    const id = String(evidencia.actividadId || evidencia.sesionId || "");
    const libro = libros.find(item => String(item.id) === id) || null;
    let audio = null;
    if (libro?.id) {
      try {
        audio = await Academia.biblioteca.audio.leer(libro.id);
      } catch (error) {
        console.debug(`No se pudo leer el audio del libro ${libro.id}.`, error);
      }
    }
    return tarjetaBiblioteca(evidencia, libro, audio);
  }));
  return items.join("");
}

function renderEvidenciaGenerica(evidencia) {
  const titulo = evidencia.resultado?.titulo || evidencia.actividadId || "Actividad guardada";
  const contenido = [
    listaDatosHtml(evidencia.atributos || {}) ? bloque("🏷️ Atributos", listaDatosHtml(evidencia.atributos || {})) : "",
    listaDatosHtml(evidencia.resultado || {}, { excluir:["audioData"] }) ? bloque("✅ Resultado", listaDatosHtml(evidencia.resultado || {}, { excluir:["audioData"] }), "evidencia-bloque--resultado") : ""
  ].filter(Boolean).join("");
  return tarjetaHtml({ evidencia, titulo, subtitulo:fechaTexto(valorFechaEvidencia(evidencia)), contenido });
}

async function renderEvidencias(tarea, evidencias) {
  if (!evidencias.length) {
    return '<div class="trabajo-vacio">Esta Misión todavía no tiene evidencias guardadas.</div>';
  }

  if (tarea.modulo === "rincon-lectura") {
    return renderLectura(evidencias);
  }
  if (tarea.modulo === "creciendo-por-dentro") {
    return renderSemillas(evidencias);
  }
  if (tarea.modulo === "biblioteca") {
    return renderBiblioteca(evidencias);
  }

  return evidencias.map(renderEvidenciaGenerica).join("");
}

function mostrarError(error) {
  $("estadoCarga").hidden = true;
  $("contenidoTrabajo").hidden = true;
  $("estadoError").hidden = false;
  $("textoError").textContent = error?.message || "Error no identificado.";
}

async function iniciar() {
  try {
    await auth.authStateReady();
    if (!auth.currentUser) {
      window.location.replace("../../login.html");
      return;
    }

    if (!misionId) {
      throw new Error("Falta el identificador de la Misión.");
    }

    const [tarea, evidencias, perfil] = await Promise.all([
      Academia.tareas.obtener(misionId),
      Academia.tareas.leerEvidencias(misionId),
      Academia.usuario.leerPerfil()
    ]);

    if (!tarea) {
      throw new Error("No se encontró la Misión para la Persona Activa.");
    }

    const ordenadas = ordenarEvidencias(evidencias);
    renderMision(tarea, perfil, ordenadas);

    $("contadorEvidencias").textContent =
      `${ordenadas.length} ${ordenadas.length === 1 ? "evidencia" : "evidencias"}`;
    $("textoEvidencias").textContent = ordenadas.length
      ? "Cada bloque pertenece a esta Misión y conserva el resultado histórico de la actividad."
      : "La Misión existe, pero todavía no tiene evidencias guardadas.";

    $("listaEvidencias").innerHTML = await renderEvidencias(tarea, ordenadas);

    $("estadoCarga").hidden = true;
    $("estadoError").hidden = true;
    $("contenidoTrabajo").hidden = false;
  } catch (error) {
    console.error("No se pudo cargar Trabajo realizado.", error);
    mostrarError(error);
  }
}

iniciar();
