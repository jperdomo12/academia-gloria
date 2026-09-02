import { Academia } from "../../compartido/api/academia.js";
import { auth, db } from "../../compartido/firebase/firebase-config.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const $ = id => document.getElementById(id);
const parametros = new URLSearchParams(window.location.search);
const misionId = String(parametros.get("misionId") || "").trim();
let userIdPersonaActivaPromise = null;

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
  if (typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    const fechaLocal = new Date(`${valor}T12:00:00`);
    return Number.isNaN(fechaLocal.getTime()) ? null : fechaLocal;
  }
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}

function fechaTexto(valor) {
  const fecha = fechaJs(valor);
  if (!fecha) return "Fecha no disponible";

  const soloFecha = typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor);
  return new Intl.DateTimeFormat(
    "es-ES",
    soloFecha
      ? { dateStyle:"medium" }
      : { dateStyle:"medium", timeStyle:"short" }
  ).format(fecha);
}

function duracionTexto(segundos = 0) {
  const total = Math.max(0, Math.round(Number(segundos) || 0));
  if (!total) return "—";
  const minutos = Math.floor(total / 60);
  const resto = total % 60;
  if (!minutos) return `${resto} s`;
  return resto ? `${minutos} min ${resto} s` : `${minutos} min`;
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
  return evidencia.ocurridaEn || evidencia.aplicadaEn || evidencia.creadaEn || null;
}

function fechaSesion(sesion = {}) {
  return sesion.completadaEn || sesion.actualizadaEn || sesion.updatedAt || sesion.creadaEn || sesion.createdAt || null;
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
  const filas = Object.entries(datos || {}).filter(([clave, valor]) =>
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
  const modulo = MODULOS[texto(evidencia.modulo)] || {
    nombre:texto(evidencia.modulo) || "Actividad",
    icono:"🗂️"
  };

  return `
    <details class="evidencia-card">
      <summary class="evidencia-card__cabecera" style="cursor:pointer">
        <div class="evidencia-card__titulo">
          <span class="trabajo-sobrelinea">${escapar(modulo.icono)} ${escapar(modulo.nombre)}</span>
          <h3>${escapar(titulo || "Actividad guardada")}</h3>
          <p>${escapar(subtitulo || fecha)}</p>
        </div>
        <div class="evidencia-card__badges">
          <span class="evidencia-badge">✅ Actividad guardada</span>
          <span class="evidencia-badge">Ver detalle ↓</span>
        </div>
      </summary>
      <div class="evidencia-card__cuerpo">
        ${contenido || '<div class="trabajo-vacio">El registro existe, pero no contiene más detalle visualizable.</div>'}
      </div>
    </details>
  `;
}

function progresoMision(tarea = {}) {
  const criterio = tarea.criterioCumplimiento || {};
  const progreso = tarea.progreso || {};
  const actual = Number(progreso.cantidadActual || 0);
  const objetivo = Number(criterio.cantidadObjetivo ?? progreso.cantidadObjetivo ?? 0);
  return { actual, objetivo };
}

function indicadoresResultado(tarea = {}) {
  const resultado = tarea.resultado && typeof tarea.resultado === "object"
    ? tarea.resultado
    : {};
  return [
    resultado.masDeLoEsperado ? "🚀 Hizo más de lo esperado" : "",
    resultado.necesitoAyuda ? "🤝 Necesitó ayuda" : "",
    resultado.convieneRepetir ? "🌱 Conviene volver a practicar" : ""
  ].filter(Boolean);
}

function esEstadoCompletado(estado = "") {
  return [
    "pendiente_validacion",
    "completada_pendiente_validacion",
    "completada"
  ].includes(texto(estado));
}

function renderMision(tarea, perfil, evidencias) {
  const presentacion = tarea.presentacionAlumno || {};
  const resultado = tarea.resultado && typeof tarea.resultado === "object"
    ? tarea.resultado
    : {};
  const modulo = MODULOS[tarea.modulo] || { nombre:tarea.modulo || "Misión", icono:"🌟" };
  const { actual, objetivo } = progresoMision(tarea);
  const repasoSinResultadoDigital = tarea.tipo === "repaso_academico" && !evidencias.length;

  $("tituloMision").textContent = presentacion.tituloMision || tarea.titulo || "Misión";
  $("descripcionMision").textContent = presentacion.descripcionMision || tarea.descripcion || "";
  $("nombrePersona").textContent = perfil?.nombreVisible || perfil?.nombre || "Alumno";
  $("progresoMision").textContent = repasoSinResultadoDigital
    ? (esEstadoCompletado(tarea.estado)
        ? "Misión completada · sin resultado digital"
        : "Sin resultado digital guardado")
    : objetivo > 0
      ? `${actual} de ${objetivo} actividades registradas`
      : `${evidencias.length} ${evidencias.length === 1 ? "actividad guardada" : "actividades guardadas"}`;

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
  const observaciones = texto(resultado.observaciones);
  const finalizacion = resultado.fechaFinalizacion || tarea.progreso?.completadaEn;
  const indicadores = indicadoresResultado(tarea);

  if (objetivoTexto) datos.push({ titulo:"🎯 Objetivo", valor:objetivoTexto, ancho:true });
  if (criterioFinal) datos.push({ titulo:"✅ Criterio de finalización", valor:criterioFinal, ancho:true });
  if (mensajeLia) datos.push({ titulo:"🦜 Mensaje de Lía", valor:mensajeLia, ancho:true });
  if (observaciones) datos.push({ titulo:"💛 Observaciones del resultado", valor:observaciones, ancho:true });
  if (indicadores.length) datos.push({ titulo:"🌱 Indicadores del resultado", valor:indicadores.join(" · "), ancho:true });
  if (tarea.fechaInicio) datos.push({ titulo:"Fecha de inicio", valor:fechaTexto(tarea.fechaInicio) });
  if (tarea.fechaLimite) datos.push({ titulo:"Fecha límite", valor:fechaTexto(tarea.fechaLimite) });
  if (tarea.progreso?.iniciadaEn) datos.push({ titulo:"Comenzada", valor:fechaTexto(tarea.progreso.iniciadaEn) });
  if (finalizacion) datos.push({ titulo:"Finalizada", valor:fechaTexto(finalizacion) });

  $("datosMision").innerHTML = datos.length
    ? datos.map(item => `
        <article class="trabajo-dato ${item.ancho ? "trabajo-dato--ancho" : ""}">
          <strong>${escapar(item.titulo)}</strong>
          <p>${escapar(item.valor)}</p>
        </article>
      `).join("")
    : '<div class="trabajo-vacio trabajo-dato--ancho">La Misión no necesita información adicional para interpretar su trabajo.</div>';
}

async function obtenerUserIdPersonaActiva() {
  if (!userIdPersonaActivaPromise) {
    userIdPersonaActivaPromise = ContextoUsuario.obtenerUserIdPersonaActiva();
  }
  const userId = await userIdPersonaActivaPromise;
  if (!userId) throw new Error("No se pudo resolver la Persona Activa.");
  return userId;
}

async function leerDocumentoSesion(coleccion, sesionId) {
  const id = texto(sesionId);
  if (!id) return null;

  const userId = await obtenerUserIdPersonaActiva();
  const resultado = await getDoc(doc(db, "usuarios", userId, coleccion, id));
  return resultado.exists() ? { id:resultado.id, ...resultado.data() } : null;
}

async function leerSesionesReferenciadas(
  evidencias,
  coleccion,
  leerCompatibilidad
) {
  const ids = [...new Set(
    evidencias.map(item => texto(item.sesionId)).filter(Boolean)
  )];

  const exactas = await Promise.all(ids.map(async id => {
    try {
      return await leerDocumentoSesion(coleccion, id);
    } catch (error) {
      console.debug(`No se pudo leer la sesión exacta ${coleccion}/${id}.`, error);
      return null;
    }
  }));

  const porId = new Map(
    exactas.filter(Boolean).map(item => [String(item.id), item])
  );

  const necesitaCompatibilidad = evidencias.some(evidencia => {
    const id = texto(evidencia.sesionId);
    return !id || !porId.has(id);
  });

  if (!necesitaCompatibilidad) return [...porId.values()];

  try {
    const historicas = await leerCompatibilidad();
    historicas.forEach(item => {
      const id = texto(item.id);
      if (id && !porId.has(id)) porId.set(id, item);
    });
  } catch (error) {
    console.debug(`No se pudo cargar la compatibilidad histórica de ${coleccion}.`, error);
  }

  return [...porId.values()];
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

function seleccionarSesion(sesiones = [], evidencia = {}, obtenerActividadId = () => "") {
  const sesionId = texto(evidencia.sesionId);
  if (sesionId) {
    const exacta = sesiones.find(item => String(item.id) === sesionId);
    if (exacta) return exacta;
  }

  const actividadId = texto(evidencia.actividadId);
  if (!actividadId) return null;

  const candidatas = sesiones.filter(item => texto(obtenerActividadId(item)) === actividadId);
  if (!candidatas.length) return null;
  if (candidatas.length === 1) return candidatas[0];

  const fechaEvidencia = fechaJs(valorFechaEvidencia(evidencia));
  if (!fechaEvidencia) return candidatas[0];

  return [...candidatas].sort((a,b) => {
    const fechaA = fechaJs(fechaSesion(a));
    const fechaB = fechaJs(fechaSesion(b));
    const distanciaA = fechaA ? Math.abs(fechaA.getTime() - fechaEvidencia.getTime()) : Number.MAX_SAFE_INTEGER;
    const distanciaB = fechaB ? Math.abs(fechaB.getTime() - fechaEvidencia.getTime()) : Number.MAX_SAFE_INTEGER;
    return distanciaA - distanciaB;
  })[0] || null;
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
        const opciones = Array.isArray(respuesta.opcionesElegidas)
          ? respuesta.opcionesElegidas
              .map(id => respuestaLecturaTexto(historia, preguntaId, id))
              .filter(Boolean)
          : [];
        const tieneCorrecta = Object.prototype.hasOwnProperty.call(respuesta,"correcta");
        return `
          <article class="evidencia-respuesta">
            <strong>${escapar(textoPregunta)}</strong>
            <span>${escapar(textoRespuesta || "Sin respuesta guardada")}</span>
            ${opciones.length ? `<span>Opciones elegidas: ${escapar(opciones.join(" → "))}</span>` : ""}
            <small>
              ${Number(respuesta.intentos || 0) ? `${Number(respuesta.intentos)} intento(s)` : "Respuesta guardada"}
              ${tieneCorrecta ? (respuesta.correcta ? " · ✅ correcta" : " · 🌱 para revisar") : " · 💬 respuesta abierta"}
            </small>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function normalizarComparacion(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-ES")
    .replace(/[^\p{L}\p{N}'’]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizarConOriginal(valor = "") {
  return String(valor)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(original => ({ original, normalizada:normalizarComparacion(original) }));
}

function construirComparacionPalabras(textoOriginal, textoReconocido) {
  const esperado = tokenizarConOriginal(textoOriginal);
  const reconocido = tokenizarConOriginal(textoReconocido);
  const filas = esperado.length + 1;
  const columnas = reconocido.length + 1;
  const dp = Array.from({ length:filas }, () => new Array(columnas).fill(0));

  for (let i = esperado.length - 1; i >= 0; i -= 1) {
    for (let j = reconocido.length - 1; j >= 0; j -= 1) {
      dp[i][j] = esperado[i].normalizada === reconocido[j].normalizada
        ? dp[i + 1][j + 1] + 1
        : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const resultado = [];
  let i = 0;
  let j = 0;

  while (i < esperado.length && j < reconocido.length) {
    if (esperado[i].normalizada === reconocido[j].normalizada) {
      resultado.push({ tipo:"coincide", esperado:esperado[i].original, reconocido:reconocido[j].original });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      resultado.push({ tipo:"falta", esperado:esperado[i].original, reconocido:"" });
      i += 1;
    } else {
      resultado.push({ tipo:"diferente", esperado:"", reconocido:reconocido[j].original });
      j += 1;
    }
  }

  while (i < esperado.length) {
    resultado.push({ tipo:"falta", esperado:esperado[i].original, reconocido:"" });
    i += 1;
  }
  while (j < reconocido.length) {
    resultado.push({ tipo:"diferente", esperado:"", reconocido:reconocido[j].original });
    j += 1;
  }

  return resultado;
}

function mapaPalabrasHtml(textoOriginal, textoReconocido) {
  return construirComparacionPalabras(textoOriginal, textoReconocido)
    .map(item => {
      if (item.tipo === "coincide") {
        return `<span class="lectura-palabra lectura-palabra--coincide" title="Palabra reconocida">${escapar(item.esperado)}</span>`;
      }
      if (item.tipo === "falta") {
        return `<span class="lectura-palabra lectura-palabra--falta" title="Palabra del texto que no apareció en la transcripción">${escapar(item.esperado)}</span>`;
      }
      return `<span class="lectura-palabra lectura-palabra--diferente" title="Palabra diferente reconocida por Lía">+ ${escapar(item.reconocido)}</span>`;
    })
    .join(" ");
}

function comparacionLecturaHtml(sesion = {}) {
  const original = texto(sesion.textoOriginal);
  const reconocido = texto(sesion.transcripcion);
  if (!original && !reconocido) return "";

  const mapa = original && reconocido
    ? `
      <div class="lectura-leyenda" aria-label="Leyenda del mapa de palabras">
        <span><i class="lectura-palabra lectura-palabra--coincide">Verde</i> aparece en ambos textos</span>
        <span><i class="lectura-palabra lectura-palabra--falta">Amarillo</i> no apareció en la transcripción</span>
        <span><i class="lectura-palabra lectura-palabra--diferente">Azul</i> palabra diferente reconocida</span>
      </div>
      <div class="lectura-mapa-palabras">${mapaPalabrasHtml(original, reconocido)}</div>
    `
    : "";

  return `
    ${mapa}
    <div class="lectura-comparacion-textos">
      <article>
        <strong>📖 Texto original</strong>
        <p>${escapar(original || "No quedó guardado el texto original.")}</p>
      </article>
      <article>
        <strong>🦜 Lo que entendió Lía</strong>
        <p>${escapar(reconocido || "No quedó guardada una transcripción.")}</p>
      </article>
    </div>
  `;
}

function palabrasParaCrecerHtml(analisis = {}) {
  const palabras = Array.isArray(analisis.palabrasParaCrecer)
    ? analisis.palabrasParaCrecer
    : [];
  if (!palabras.length) return "";

  const etiquetaEstado = estado => ({
    superada:"✅ Superada",
    success:"✅ Superada",
    en_practica:"🌱 En práctica",
    practice:"🌱 En práctica",
    reintentar:"🔁 Para repetir",
    retry:"🔁 Para repetir",
    pendiente:"⏳ Pendiente",
    listening:"🎙️ En proceso"
  })[estado] || "⏳ Pendiente";

  return `
    <div class="lectura-palabras-crecer">
      ${palabras.map((palabra,index) => {
        const inicial = texto(
          palabra.palabraReconocidaInicialmente ||
          palabra.palabraReconocidaEnLectura
        );
        const ultima = texto(palabra.ultimaPalabraReconocida);
        const intentos = Math.max(0, Number(palabra.intentos || 0));
        const estado = texto(palabra.estado) || "pendiente";
        return `
          <article class="lectura-palabra-crecer">
            <span class="lectura-palabra-crecer__numero">${index + 1}</span>
            <div>
              <strong>${escapar(palabra.palabra || "Palabra")}</strong>
              <small>${inicial
                ? `En la lectura, Lía entendió «${escapar(inicial)}».`
                : "No apareció con claridad en la transcripción inicial."}</small>
              ${ultima && ultima !== inicial
                ? `<small>Último intento reconocido: «${escapar(ultima)}».</small>`
                : ""}
            </div>
            <div class="lectura-palabra-crecer__estado">
              <span>${escapar(etiquetaEstado(estado))}</span>
              <small>${intentos} ${intentos === 1 ? "intento" : "intentos"}</small>
            </div>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function historialObservacionesHtml(sesion = {}) {
  const historial = Array.isArray(sesion.historialObservacionesFamilia)
    ? sesion.historialObservacionesFamilia
    : [];
  if (!historial.length) return "";

  return `
    <details class="lectura-observaciones-historial">
      <summary>📅 Ver historial de observaciones</summary>
      <div>
        ${[...historial].reverse().map(item => `
          <article>
            <small>${escapar(fechaTexto(item.fecha))}</small>
            <p>${escapar(item.texto || "")}</p>
          </article>
        `).join("")}
      </div>
    </details>
  `;
}

function tarjetaLectura(evidencia, sesion, historia) {
  if (evidencia.tipo === "pronunciacion_completada") {
    return tarjetaHtml({
      evidencia,
      titulo:evidencia.resultado?.titulo || "Refuerzo de pronunciación",
      subtitulo:fechaTexto(valorFechaEvidencia(evidencia)),
      contenido:
        bloque("🗣️ Práctica de pronunciación", detallePronunciacionHtml(evidencia), "evidencia-bloque--resultado") +
        bloque("🗂️ Datos de la actividad", listaDatosHtml(evidencia.atributos || {}))
    });
  }

  const analisis = sesion?.analisisLectura && typeof sesion.analisisLectura === "object"
    ? sesion.analisisLectura
    : {};
  const titulo = sesion?.titulo || historia?.titulo || evidencia.resultado?.titulo || evidencia.actividadId || "Lectura";
  const coincidencia = Number(analisis.coincidencia || 0);
  const coincidentes = Number(analisis.palabrasCoincidentes || 0);
  const palabrasTexto = Number(analisis.palabrasTexto || 0);
  const ppm = Number(analisis.palabrasPorMinuto || 0);
  const intentos = Number(sesion?.intentos || evidencia.resultado?.intentos || 0);
  const tieneAnalisis = coincidencia || coincidentes || palabrasTexto || ppm || intentos;
  const metricas = tieneAnalisis
    ? `
      <div class="evidencia-grid">
        <div class="evidencia-metrica"><strong>${coincidencia}%</strong><span>coincidencia</span></div>
        <div class="evidencia-metrica"><strong>${coincidentes || "—"}</strong><span>palabras coincidentes</span></div>
        <div class="evidencia-metrica"><strong>${palabrasTexto || "—"}</strong><span>palabras del texto</span></div>
        <div class="evidencia-metrica"><strong>${intentos || "—"}</strong><span>intentos</span></div>
        <div class="evidencia-metrica"><strong>${ppm || "—"}</strong><span>palabras/minuto</span></div>
      </div>
      ${texto(analisis.mensaje) ? `<p class="lectura-analisis-mensaje">${escapar(analisis.mensaje)}</p>` : ""}
    `
    : "";
  const comprension = respuestasLecturaHtml(sesion || {}, historia);
  const comparacion = sesion ? comparacionLecturaHtml(sesion) : "";
  const palabrasCrecer = palabrasParaCrecerHtml(analisis);
  const observacionActual = texto(sesion?.observacionFamilia);
  const historialObservaciones = sesion ? historialObservacionesHtml(sesion) : "";
  const subtitulo = [
    fechaTexto(valorFechaEvidencia(evidencia)),
    Number(sesion?.duracion || 0) > 0 ? duracionTexto(sesion.duracion) : ""
  ].filter(Boolean).join(" · ");

  const contenido = [
    metricas ? bloque("🔎 Análisis guardado de la lectura", metricas, "evidencia-bloque--resultado") : "",
    comparacion ? bloque("🎨 Texto original, mapa y comparación", comparacion) : "",
    palabrasCrecer ? bloque("🦜 Palabras que Lía sugirió repetir", palabrasCrecer, "evidencia-bloque--resultado") : "",
    sesion?.audioData ? bloque("🎙️ Grabación", audioHtml(sesion.audioData, sesion.duracion), "evidencia-bloque--audio") : "",
    comprension ? bloque("🧠 Comprensión", comprension) : "",
    texto(sesion?.reflexion) ? bloque("🌟 Reflexión", `<p>${escapar(sesion.reflexion)}</p>`) : "",
    texto(sesion?.fraseDelDia) ? bloque("🌈 Frase del día", `<p>${escapar(sesion.fraseDelDia)}</p>`) : "",
    observacionActual || historialObservaciones
      ? bloque(
          "👨‍👩‍👧 Observación familiar",
          `${observacionActual ? `<p>${escapar(observacionActual)}</p>` : ""}${historialObservaciones}`,
          "evidencia-bloque--familia"
        )
      : "",
    !sesion ? bloque("🗂️ Registro disponible", listaDatosHtml(evidencia.resultado || {})) : ""
  ].filter(Boolean).join("");

  return tarjetaHtml({ evidencia, titulo, subtitulo, contenido });
}

async function renderLectura(evidencias) {
  /*
   * Las evidencias de pronunciación ya contienen todo su resultado y no
   * necesitan abrir una sesión de lectura. Excluirlas evita que una evidencia
   * sin sesionId active innecesariamente la compatibilidad que recorre todo el
   * historial de Rincón de Lectura.
   */
  const evidenciasConSesion = evidencias.filter(
    evidencia => texto(evidencia.tipo) !== "pronunciacion_completada"
  );

  const [sesiones, historias] = await Promise.all([
    leerSesionesReferenciadas(
      evidenciasConSesion,
      "sesionesLectura",
      () => Academia.rinconLectura.leerSesiones()
    ),
    historiasLectura()
  ]);

  return evidencias.map(evidencia => {
    const esPronunciacion = texto(evidencia.tipo) === "pronunciacion_completada";
    const sesion = esPronunciacion
      ? null
      : seleccionarSesion(
          sesiones,
          evidencia,
          item => item.historiaId || item.id
        );
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
        .map(([clave,valor]) => ({
          titulo:clave,
          seleccion:Array.isArray(valor) ? valor : [valor],
          propia:texto(respuestas[`${clave}__other`])
        }));

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
    !sesion ? bloque("🗂️ Registro disponible", listaDatosHtml(evidencia.resultado || {})) : ""
  ].filter(Boolean).join("");

  return tarjetaHtml({ evidencia, titulo, subtitulo:fechaTexto(valorFechaEvidencia(evidencia)), contenido });
}

async function renderSemillas(evidencias) {
  const [sesiones, catalogo] = await Promise.all([
    leerSesionesReferenciadas(
      evidencias,
      "sesionesSemillas",
      () => Academia.semillas.leerSesiones()
    ),
    catalogoSemillas()
  ]);

  return evidencias.map(evidencia => {
    const sesion = seleccionarSesion(
      sesiones,
      evidencia,
      item => item.semillaId
    );
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
    !libro ? bloque("🗂️ Registro disponible", listaDatosHtml(evidencia.resultado || {})) : ""
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
  const atributos = listaDatosHtml(evidencia.atributos || {});
  const resultado = listaDatosHtml(evidencia.resultado || {}, { excluir:["audioData"] });
  const contenido = [
    atributos ? bloque("🏷️ Datos de la actividad", atributos) : "",
    resultado ? bloque("✅ Resultado", resultado, "evidencia-bloque--resultado") : ""
  ].filter(Boolean).join("");

  return tarjetaHtml({ evidencia, titulo, subtitulo:fechaTexto(valorFechaEvidencia(evidencia)), contenido });
}

async function renderTrabajo(tarea, evidencias) {
  if (!evidencias.length) {
    if (tarea.tipo === "repaso_academico") {
      return `
        <div class="trabajo-vacio">
          <strong>📘 Esta Misión no genera un resultado digital guardado.</strong><br>
          La actividad se realizó fuera del motor de ejercicios de la Academia. Aquí se conserva la Misión,
          su estado y la información de cierre disponible, sin inventar una evidencia que no existe.
        </div>
      `;
    }
    return '<div class="trabajo-vacio">Todavía no hay trabajo registrado para esta Misión.</div>';
  }

  if (tarea.modulo === "rincon-lectura") return renderLectura(evidencias);
  if (tarea.modulo === "creciendo-por-dentro") return renderSemillas(evidencias);
  if (tarea.modulo === "biblioteca") return renderBiblioteca(evidencias);

  return evidencias.map(renderEvidenciaGenerica).join("");
}

function mostrarError(mensaje) {
  $("estadoCarga").hidden = true;
  $("contenidoTrabajo").hidden = true;
  $("estadoError").hidden = false;
  $("textoError").textContent = mensaje;
}

async function iniciar() {
  try {
    await auth.authStateReady();
    if (!auth.currentUser) {
      const volver = encodeURIComponent(
        `${window.location.pathname}${window.location.search}${window.location.hash}`
      );
      window.location.replace(`../../login.html?volver=${volver}`);
      return;
    }

    if (!misionId) {
      mostrarError("No encontramos la Misión que querías consultar. Regresa e inténtalo de nuevo.");
      return;
    }

    const [tarea, evidencias, perfil] = await Promise.all([
      Academia.tareas.obtener(misionId),
      Academia.tareas.leerEvidencias(misionId),
      Academia.usuario.leerPerfil()
    ]);

    if (!tarea) {
      mostrarError("No encontramos esta Misión para la Persona Activa.");
      return;
    }

    const ordenadas = ordenarEvidencias(evidencias);
    renderMision(tarea, perfil, ordenadas);

    if (!ordenadas.length && tarea.tipo === "repaso_academico") {
      $("contadorEvidencias").textContent = "Sin resultado digital";
      $("textoEvidencias").textContent =
        "Esta actividad no genera una sesión académica guardada. La Misión se conserva como contexto de lo realizado.";
    } else {
      $("contadorEvidencias").textContent =
        `${ordenadas.length} ${ordenadas.length === 1 ? "actividad" : "actividades"}`;
      $("textoEvidencias").textContent = ordenadas.length
        ? "Cada actividad pertenece a esta Misión y conserva su resultado histórico. Abre solo la que quieras revisar."
        : "Todavía no hay trabajo registrado para esta Misión.";
    }

    /*
     * La cabecera de la Misión ya está disponible: se muestra de inmediato y
     * el detalle rico se completa después. Así una lectura grande de Firestore
     * no mantiene toda la pantalla bloqueada mientras se reconstruye el trabajo.
     */
    $("estadoCarga").hidden = true;
    $("estadoError").hidden = true;
    $("contenidoTrabajo").hidden = false;
    $("listaEvidencias").innerHTML = ordenadas.length
      ? '<div class="trabajo-vacio">🦜 Preparando el detalle del trabajo guardado…</div>'
      : "";

    $("listaEvidencias").innerHTML = await renderTrabajo(tarea, ordenadas);
  } catch (error) {
    console.error("No se pudo cargar Trabajo realizado.", error);
    mostrarError(
      "No pudimos recuperar el trabajo guardado. Revisa la conexión o los permisos de la Persona Activa."
    );
  }
}

iniciar();
