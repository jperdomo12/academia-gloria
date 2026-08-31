/* Academia Gloria Valentina · Observaciones y Refuerzos · Académicos 6.º */

import { Academia } from "../../compartido/api/academia.js";
import { leerSesionesAcademicas } from "../../compartido/js/sesiones-academicas.js";
import "./catalogo-repaso-academico.js";
import "./mision-libre.js";

const $ = id => document.getElementById(id);
const MAXIMO_SESIONES_ANALISIS = 5;
const MINIMO_SENALES_CONFIRMACION = 2;

const ACTIVIDADES = Object.freeze([
  {
    actividadId: "6-mates-puente-5to-6to",
    titulo: "Puente de 5.º a 6.º",
    icono: "🌉",
    curso: "6.º",
    materia: "Matemáticas",
    destinoUrl: "../../cursos/6to/mates/puente-5to-6to.html",
    bloques: Object.freeze({
      "numeros-operaciones": {
        icono: "🔢",
        titulo: "Números y operaciones",
        descripcion: "Operaciones básicas, jerarquía, cálculo mental y potencias sencillas."
      },
      "fracciones-decimales": {
        icono: "🍰",
        titulo: "Fracciones y decimales",
        descripcion: "Significado de las fracciones, equivalencias y relación con decimales y porcentajes."
      },
      "problemas-medidas": {
        icono: "🧠",
        titulo: "Problemas y medidas",
        descripcion: "Comprender problemas de varios pasos y trabajar con unidades de medida."
      },
      geometria: {
        icono: "📐",
        titulo: "Geometría básica",
        descripcion: "Perímetros, áreas, ángulos y clasificación de triángulos."
      }
    })
  },
  {
    actividadId: "6-mates-fracciones",
    titulo: "Fracciones",
    icono: "🍕",
    curso: "6.º",
    materia: "Matemáticas",
    destinoUrl: "../../cursos/6to/mates/fracciones/",
    bloques: Object.freeze({
      "significado-equivalencias": {
        icono: "🍕",
        titulo: "Significado y equivalencias",
        descripcion: "Comprender qué representa una fracción y reconocer cantidades equivalentes."
      },
      "igual-denominador": {
        icono: "➕",
        titulo: "Mismo denominador",
        descripcion: "Sumar y restar fracciones cuando las partes tienen el mismo tamaño."
      },
      "comun-denominador": {
        icono: "🔁",
        titulo: "Denominador común",
        descripcion: "Usar el m.c.m. y transformar fracciones para poder compararlas y operar con ellas."
      },
      "multiplicar-dividir": {
        icono: "✖️",
        titulo: "Multiplicar y dividir",
        descripcion: "Aplicar los procedimientos de multiplicación y división de fracciones."
      },
      problemas: {
        icono: "🧠",
        titulo: "Problemas",
        descripcion: "Elegir y encadenar los pasos necesarios dentro de una situación con fracciones."
      }
    })
  }
]);

let propuestas = [];
let misionesPreparadas = [];
let cargando = false;
let sincronizacionInicialCompleta = false;
let timerProteccion = null;

function escapar(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function numero(valor, alternativo = 0) {
  const resultado = Number(valor);
  return Number.isFinite(resultado) ? resultado : alternativo;
}

function marcaTiempo(valor) {
  if (!valor) return 0;
  if (typeof valor?.toMillis === "function") return valor.toMillis();
  if (typeof valor?.toDate === "function") return valor.toDate().getTime();
  const tiempo = Date.parse(valor);
  return Number.isFinite(tiempo) ? tiempo : 0;
}

function porcentajeError(valor) {
  return Math.round(Math.max(0, Math.min(1, numero(valor))) * 100);
}

function plural(cantidad, singular, pluralTexto) {
  return cantidad === 1 ? singular : pluralTexto;
}

function estadoCerrado(tarea = {}) {
  return ["completada", "cancelada"].includes(String(tarea.estado || ""));
}

function configuracionRefuerzo(tarea = {}) {
  return tarea?.evidencia?.configuracion || {};
}

function esMisionRefuerzoAcademico(tarea = {}) {
  const cfg = configuracionRefuerzo(tarea);
  return (
    tarea.tipo === "repaso_academico" &&
    tarea.evidencia?.tipo === "refuerzo_academico" &&
    cfg.origen === "sesion_academica" &&
    Boolean(cfg.actividadId) &&
    Boolean(cfg.bloqueId)
  );
}

function clavePropuesta(actividadId, bloqueId) {
  return `${String(actividadId || "").trim()}::${String(bloqueId || "").trim()}`;
}

function actividadPorId(id) {
  return ACTIVIDADES.find(item => item.actividadId === id) || null;
}

function rutaTexto(actividad) {
  return `Mis Cursos → ${actividad.curso} → ${actividad.materia} → ${actividad.titulo}`;
}

function respuestasBloqueSesion(sesion = {}, bloqueId = "") {
  const respuestas = Array.isArray(sesion.respuestas) ? sesion.respuestas : [];
  return respuestas.filter(respuesta =>
    String(respuesta?.bloqueId || "").trim() === bloqueId &&
    typeof respuesta?.correcta === "boolean"
  );
}

function resumenBloqueSesion(sesion = {}, bloqueId = "") {
  const porBloque = Array.isArray(sesion?.resumen?.porBloque)
    ? sesion.resumen.porBloque
    : [];
  const item = porBloque.find(candidato =>
    String(candidato?.bloqueId || candidato?.id || "").trim() === bloqueId
  );

  if (!item) return null;

  const total = Math.max(0, numero(item.total));
  if (!total) return null;

  const correctas = Math.max(0, Math.min(total, numero(item.correctas)));

  return {
    estado: String(item.estado || "").trim(),
    correctas,
    total
  };
}

function cargarEstilos() {
  if (document.querySelector('link[data-refuerzos-academicos-css="true"]')) return;

  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./refuerzos-academicos.css", import.meta.url).href;
  enlace.dataset.refuerzosAcademicosCss = "true";
  document.head.appendChild(enlace);
}

function crearSeccionesBase() {
  const panel = $("panelRefuerzos");
  if (!panel || $("grupoRefuerzoAcademico")) return;

  const grupo = document.createElement("details");
  grupo.id = "grupoRefuerzoAcademico";
  grupo.className = "grupo-refuerzo superficie";
  grupo.innerHTML = `
    <summary class="grupo-refuerzo__summary">
      <span class="grupo-refuerzo__icono" aria-hidden="true">📘</span>
      <span class="grupo-refuerzo__texto">
        <strong>Mis Cursos</strong>
        <small>6.º · Matemáticas · resultados académicos</small>
      </span>
      <span class="grupo-refuerzo__flecha" aria-hidden="true">⌄</span>
    </summary>

    <div class="grupo-refuerzo__contenido">
      <details id="subgrupoMisionesAcademicas" class="subgrupo-refuerzo">
        <summary class="subgrupo-refuerzo__summary">
          <span class="subgrupo-refuerzo__icono" aria-hidden="true">📋</span>
          <strong>Misiones preparadas</strong>
          <span class="subgrupo-refuerzo__flecha" aria-hidden="true">⌄</span>
        </summary>
        <div class="subgrupo-refuerzo__contenido">
          <section class="superficie refuerzo-bloque" aria-labelledby="tituloMisionesRefuerzoAcademico">
            <div class="refuerzo-bloque__cabecera">
              <div>
                <h3 id="tituloMisionesRefuerzoAcademico">📋 Misiones académicas preparadas</h3>
                <p>Revisa el foco propuesto y decide cuándo debe aparecer la Misión en Mi Camino.</p>
              </div>
            </div>
            <div id="listaMisionesRefuerzoAcademico" class="refuerzos-academicos-lista"></div>
          </section>
        </div>
      </details>

      <details id="subgrupoSugeridasAcademicas" class="subgrupo-refuerzo">
        <summary class="subgrupo-refuerzo__summary">
          <span class="subgrupo-refuerzo__icono" aria-hidden="true">🌱</span>
          <strong>Misiones sugeridas</strong>
          <span class="subgrupo-refuerzo__flecha" aria-hidden="true">⌄</span>
        </summary>
        <div class="subgrupo-refuerzo__contenido">
          <section class="superficie refuerzo-bloque" aria-labelledby="tituloRefuerzosAcademicos">
            <div class="refuerzo-bloque__cabecera">
              <div>
                <h3 id="tituloRefuerzosAcademicos">📘 Propuestas desde pruebas académicas</h3>
                <p>
                  La Academia revisa hasta las ${MAXIMO_SESIONES_ANALISIS} sesiones de aprendizaje más recientes por actividad.
                  Una necesidad se confirma cuando el mismo bloque acumula al menos
                  ${MINIMO_SENALES_CONFIRMACION} respuestas incorrectas y la sesión más reciente todavía muestra dificultad.
                  La proporción de respuestas incorrectas determina la prioridad; la cantidad de repeticiones no la aumenta.
                </p>
              </div>
              <button id="actualizarRefuerzosAcademicos" class="btn secundaria" type="button">
                ↻ Actualizar
              </button>
            </div>

            <div id="estadoRefuerzosAcademicos" class="estado-carga" aria-live="polite">
              Abre esta sección para revisar los resultados disponibles.
            </div>
            <div id="listaRefuerzosAcademicos" class="refuerzos-academicos-lista"></div>
          </section>
        </div>
      </details>
    </div>
  `;

  panel.appendChild(grupo);

  grupo.addEventListener("toggle", () => {
    if (!grupo.open) return;
    document
      .querySelectorAll("#panelRefuerzos .grupo-refuerzo[open]")
      .forEach(otro => {
        if (otro !== grupo) otro.open = false;
      });
  });

  $("actualizarRefuerzosAcademicos")?.addEventListener("click", () => cargarTodo());
}

function construirPropuestas(sesionesPorActividad, tareas = []) {
  const activas = tareas.filter(tarea => esMisionRefuerzoAcademico(tarea) && !estadoCerrado(tarea));
  const resultado = [];

  ACTIVIDADES.forEach(actividad => {
    const sesiones = sesionesPorActividad.get(actividad.actividadId) || [];
    const sesionReciente = sesiones[0];
    if (!sesionReciente) return;

    Object.entries(actividad.bloques).forEach(([bloqueId, bloque]) => {
      const reciente = resumenBloqueSesion(sesionReciente, bloqueId);
      const respuestasRecientes = respuestasBloqueSesion(sesionReciente, bloqueId);
      const erroresRecientes = respuestasRecientes.filter(respuesta => respuesta.correcta === false);

      if (
        !reciente ||
        !["camino", "reforzar"].includes(reciente.estado) ||
        !erroresRecientes.length
      ) {
        return;
      }

      const observaciones = sesiones.flatMap(sesion => {
        const completadaEn = sesion.completadaEn || sesion.updatedAt || sesion.finCliente || null;
        return respuestasBloqueSesion(sesion, bloqueId).map(respuesta => ({
          sesionId: String(sesion.id || ""),
          completadaEn,
          preguntaId: String(respuesta.preguntaId || ""),
          conceptoId: String(respuesta.conceptoId || ""),
          correcta: respuesta.correcta === true
        }));
      });
      const senales = observaciones.filter(observacion => observacion.correcta === false);

      if (senales.length < MINIMO_SENALES_CONFIRMACION || !observaciones.length) return;

      const clave = clavePropuesta(actividad.actividadId, bloqueId);
      const yaPreparada = activas.some(tarea => {
        const cfg = configuracionRefuerzo(tarea);
        return clavePropuesta(cfg.actividadId, cfg.bloqueId) === clave;
      });
      const proporcionError = senales.length / observaciones.length;
      const ultimaSenalEn = senales.reduce(
        (ultima, senal) => Math.max(ultima, marcaTiempo(senal.completadaEn)),
        0
      );
      const sesionesConSenal = new Set(senales.map(senal => senal.sesionId)).size;

      resultado.push({
        clave,
        actividad,
        bloqueId,
        bloque,
        sesionId: String(sesionReciente.id || ""),
        estadoReciente: reciente.estado,
        correctas: reciente.correctas,
        total: reciente.total,
        senales,
        sesionesConSenal,
        proporcionError,
        ultimaSenalEn,
        yaPreparada
      });
    });
  });

  return resultado.sort((a, b) =>
    b.proporcionError - a.proporcionError ||
    b.ultimaSenalEn - a.ultimaSenalEn ||
    a.actividad.titulo.localeCompare(b.actividad.titulo, "es") ||
    a.bloque.titulo.localeCompare(b.bloque.titulo, "es")
  );
}

async function leerDatos() {
  const [tareas, ...sesiones] = await Promise.all([
    Academia.tareas.leer(),
    ...ACTIVIDADES.map(actividad =>
      leerSesionesAcademicas({
        actividadId: actividad.actividadId,
        maximo: MAXIMO_SESIONES_ANALISIS
      })
    )
  ]);

  misionesPreparadas = tareas.filter(esMisionRefuerzoAcademico);
  const sesionesPorActividad = new Map(
    ACTIVIDADES.map((actividad, indice) => [
      actividad.actividadId,
      sesiones[indice] || []
    ])
  );

  propuestas = construirPropuestas(sesionesPorActividad, tareas);

  return {
    sesionesPorActividad,
    actividadesConSesion: ACTIVIDADES.filter(
      actividad => (sesionesPorActividad.get(actividad.actividadId) || []).length
    ).length
  };
}

function textoSenal(propuesta) {
  const cantidad = propuesta.senales.length;
  const sesiones = propuesta.sesionesConSenal;
  const porcentaje = porcentajeError(propuesta.proporcionError);

  return (
    `En este bloque se observaron ${cantidad} ${plural(cantidad, "respuesta incorrecta", "respuestas incorrectas")} ` +
    `en ${sesiones} ${plural(sesiones, "sesión reciente", "sesiones recientes")}. ` +
    `Representan el ${porcentaje} % de las respuestas revisadas para este bloque. ` +
    `La sesión más reciente todavía muestra dificultad.`
  );
}

function renderPropuestas(meta = {}) {
  const estado = $("estadoRefuerzosAcademicos");
  const lista = $("listaRefuerzosAcademicos");
  if (!estado || !lista) return;

  estado.classList.add("hidden");

  if (!meta.actividadesConSesion) {
    lista.innerHTML = `
      <div class="refuerzo-vacio">
        Todavía no hay sesiones de aprendizaje guardadas de Puente de 5.º a 6.º o Fracciones.
        Las vistas previas no generan propuestas.
      </div>
    `;
    return;
  }

  if (!propuestas.length) {
    lista.innerHTML = `
      <div class="refuerzo-vacio">
        No hay bloques con una dificultad repetida y todavía vigente en la sesión más reciente.
        Una sola respuesta incorrecta no genera automáticamente una Misión de refuerzo.
      </div>
    `;
    return;
  }

  lista.innerHTML = propuestas.map(propuesta => `
    <article class="refuerzo-academico">
      <div class="refuerzo-academico__cabecera">
        <div class="refuerzo-academico__icono" aria-hidden="true">${escapar(propuesta.bloque.icono)}</div>
        <div>
          <h4>${escapar(propuesta.bloque.titulo)}</h4>
          <div class="refuerzo-academico__meta">
            <span>📘 ${escapar(propuesta.actividad.titulo)}</span>
            <span>6.º · Matemáticas</span>
            <span>🎯 ${porcentajeError(propuesta.proporcionError)} % incorrectas</span>
            <span>${propuesta.senales.length} señales observadas</span>
            <span>Última: ${propuesta.correctas} de ${propuesta.total}</span>
          </div>
        </div>
      </div>

      <div class="refuerzo-academico__ruta">
        <strong>Dónde ocurrió</strong>
        <span>${escapar(rutaTexto(propuesta.actividad))}</span>
      </div>

      <div class="refuerzo-academico__foco">
        <strong>Qué conviene reforzar</strong>
        <span>${escapar(propuesta.bloque.titulo)}</span>
      </div>

      <p class="refuerzo-academico__observacion">${escapar(textoSenal(propuesta))}</p>
      <p class="refuerzo-academico__descripcion">${escapar(propuesta.bloque.descripcion)}</p>

      <div class="refuerzo-academico__acciones">
        <small>
          La Misión se prepara oculta. Al abrirla, se repasa el tema completo poniendo
          especial atención en este foco.
        </small>
        <button
          class="btn primaria"
          type="button"
          data-crear-refuerzo-academico="${escapar(propuesta.clave)}"
          ${propuesta.yaPreparada ? "disabled" : ""}
        >
          ${propuesta.yaPreparada ? "✅ Misión ya preparada" : "✨ Preparar misión de refuerzo"}
        </button>
      </div>
    </article>
  `).join("");

  lista.querySelectorAll("[data-crear-refuerzo-academico]").forEach(button => {
    button.addEventListener("click", () => {
      const propuesta = propuestas.find(
        item => item.clave === button.dataset.crearRefuerzoAcademico
      );
      if (propuesta) crearMision(propuesta, button);
    });
  });
}

function ordenFinalVisible(tareas = []) {
  const ordenes = tareas
    .filter(tarea =>
      tarea.visibleParaAlumno !== false &&
      !["completada", "pendiente_validacion", "completada_pendiente_validacion", "cancelada"].includes(tarea.estado)
    )
    .map(tarea => Number(tarea.ordenMision))
    .filter(valor => Number.isFinite(valor) && valor > 0 && valor < 9999);

  return (ordenes.length ? Math.max(...ordenes) : 0) + 1;
}

async function cambiarVisibilidad(tarea, visible, checkbox) {
  checkbox.disabled = true;
  try {
    const tareas = await Academia.tareas.leer();
    await Academia.tareas.actualizar(tarea.id, {
      visibleParaAlumno: visible,
      ordenMision: visible ? ordenFinalVisible(tareas) : 9999
    });
    await cargarTodo({ silencioso: true });
  } catch (error) {
    checkbox.checked = !visible;
    alert(
      "No se pudo cambiar la visibilidad de la Misión académica.\n" +
      `Razón: ${error.message || "Error no identificado"}`
    );
  } finally {
    checkbox.disabled = false;
  }
}

function renderMisionesPreparadas() {
  const lista = $("listaMisionesRefuerzoAcademico");
  if (!lista) return;

  const activas = misionesPreparadas.filter(tarea => !estadoCerrado(tarea));

  if (!activas.length) {
    lista.innerHTML = `
      <div class="refuerzo-vacio">
        No hay Misiones de refuerzo académico pendientes de gestión.
      </div>
    `;
    return;
  }

  lista.innerHTML = activas.map(tarea => {
    const cfg = configuracionRefuerzo(tarea);
    const actividad = actividadPorId(cfg.actividadId);
    const bloque = actividad?.bloques?.[cfg.bloqueId] || {
      icono: "📘",
      titulo: cfg.foco || "Refuerzo académico"
    };
    const visible = tarea.visibleParaAlumno !== false;

    return `
      <article class="mision-refuerzo-academico">
        <div class="mision-refuerzo-academico__cabecera">
          <div>
            <h4>${escapar(bloque.icono)} ${escapar(tarea.titulo || bloque.titulo)}</h4>
            <div class="refuerzo-academico__meta">
              <span>${actividad ? escapar(actividad.titulo) : "Repaso académico"}</span>
              <span>${visible ? "👁️ Visible en Mi Camino" : "🔒 Aún no visible"}</span>
            </div>
          </div>
          <span class="mision-refuerzo-academico__estado">${escapar(tarea.estado || "pendiente")}</span>
        </div>

        <div class="refuerzo-academico__foco">
          <strong>Foco</strong>
          <span>${escapar(bloque.titulo)}</span>
        </div>

        <label class="mision-refuerzo-academico__visibilidad">
          <input
            type="checkbox"
            data-visibilidad-refuerzo-academico="${escapar(tarea.id)}"
            ${visible ? "checked" : ""}
          >
          <span>Mostrar en Mi Camino</span>
        </label>
      </article>
    `;
  }).join("");

  lista.querySelectorAll("[data-visibilidad-refuerzo-academico]").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const tarea = misionesPreparadas.find(
        item => item.id === checkbox.dataset.visibilidadRefuerzoAcademico
      );
      if (tarea) cambiarVisibilidad(tarea, checkbox.checked, checkbox);
    });
  });
}

async function crearMision(propuesta, button) {
  const textoOriginal = button.textContent;
  button.disabled = true;
  button.textContent = "Preparando Misión...";

  try {
    const tareas = await Academia.tareas.leer();
    const duplicada = tareas.some(tarea => {
      if (!esMisionRefuerzoAcademico(tarea) || estadoCerrado(tarea)) return false;
      const cfg = configuracionRefuerzo(tarea);
      return clavePropuesta(cfg.actividadId, cfg.bloqueId) === propuesta.clave;
    });

    if (duplicada) {
      throw new Error("ya existe una Misión activa para este mismo tema y foco");
    }

    const { actividad, bloque } = propuesta;
    const titulo = `${actividad.titulo} · ${bloque.titulo}`;

    await Academia.tareas.crear({
      titulo,
      descripcion:
        `Misión propuesta a partir de una dificultad repetida en preguntas del mismo bloque académico. ` +
        `Foco: ${bloque.titulo}.`,
      tipo: "repaso_academico",
      cursoReferencia: "6",
      materia: actividad.materia,
      tema: actividad.titulo,
      modulo: "libre",
      destinoUrl: actividad.destinoUrl,
      objetivo: `Reforzar ${bloque.titulo} dentro de ${actividad.titulo}.`,
      criterioFinalizacion:
        `Repasar ${actividad.titulo} poniendo especial atención en ${bloque.titulo} ` +
        "y completar la prueba final. La finalización describe la sesión; no exige perfección.",
      criterioCumplimiento: {
        tipo: "cantidad",
        modulo: "libre",
        evidenciaTipo: "sesion_academica",
        cantidadObjetivo: 1,
        filtros: {}
      },
      requiereRevision: true,
      tiempoEstimadoMinutos: 20,
      prioridad: "normal",
      estado: "pendiente",
      visibleParaAlumno: false,
      ordenMision: 9999,
      presentacionAlumno: {
        icono: bloque.icono,
        tituloMision: titulo,
        descripcionMision:
          `Vuelve a ${actividad.titulo} y pon especial atención en ${bloque.titulo}.`,
        mensaje:
          "📘 Repasa con calma. Puedes volver a la teoría, usar las fichas y practicar antes de comenzar la prueba."
      },
      progreso: { cantidadObjetivo: 1 },
      evidencia: {
        tipo: "refuerzo_academico",
        modulo: "libre",
        referenciaId: propuesta.sesionId,
        resumen:
          `${rutaTexto(actividad)} · Foco: ${bloque.titulo}`,
        configuracion: {
          origen: "sesion_academica",
          actividadId: actividad.actividadId,
          bloqueId: propuesta.bloqueId,
          foco: bloque.titulo,
          ruta: ["Mis Cursos", actividad.curso, actividad.materia, actividad.titulo],
          sesionOrigenId: propuesta.sesionId,
          estadoOrigen: propuesta.estadoReciente,
          correctasOrigen: propuesta.correctas,
          totalOrigen: propuesta.total,
          senalesConfirmacion: propuesta.senales.map(senal => ({
            sesionId: senal.sesionId,
            preguntaId: senal.preguntaId,
            conceptoId: senal.conceptoId
          })),
          proporcionIncorrectas: propuesta.proporcionError
        }
      }
    });

    $("estadoRefuerzosAcademicos").classList.remove("hidden");
    $("estadoRefuerzosAcademicos").textContent =
      "✅ Misión preparada. Mostrar en Mi Camino = No. Revísala en Misiones preparadas.";

    await cargarTodo({ silencioso: true });
  } catch (error) {
    alert(
      "No se pudo preparar la Misión de refuerzo académico.\n" +
      `Razón: ${error.message || "Error no identificado"}`
    );
    button.disabled = false;
    button.textContent = textoOriginal;
  }
}

function protegerAccionesGenericas() {
  const porId = new Map(misionesPreparadas.map(tarea => [tarea.id, tarea]));

  document.querySelectorAll("#listaTareas [data-id]").forEach(control => {
    const tarea = porId.get(control.dataset.id);
    if (!tarea) return;

    const accion = control.dataset.action;

    if (accion === "start") {
      const oculta = tarea.visibleParaAlumno === false;
      control.classList.toggle("hidden", oculta);
      if (oculta) {
        control.setAttribute(
          "title",
          "Activa Mostrar en Mi Camino antes de abrir la actividad."
        );
      } else {
        control.removeAttribute("title");
      }
    }

    if (
      accion === "complete" &&
      !["pendiente_validacion", "completada_pendiente_validacion"].includes(tarea.estado)
    ) {
      control.classList.add("hidden");
      control.setAttribute(
        "title",
        "Esta Misión pasa a revisión desde la prueba y su evidencia académica."
      );
    }
  });
}

function programarProteccion() {
  window.clearTimeout(timerProteccion);
  timerProteccion = window.setTimeout(protegerAccionesGenericas, 30);
}

async function cargarTodo({ silencioso = false } = {}) {
  if (cargando) return;
  cargando = true;

  const estado = $("estadoRefuerzosAcademicos");
  const lista = $("listaRefuerzosAcademicos");

  if (!silencioso && estado && lista) {
    estado.classList.remove("hidden");
    estado.textContent =
      "🦜 Lía está revisando las sesiones académicas más recientes de 6.º...";
    lista.innerHTML = "";
  }

  try {
    const meta = await leerDatos();
    sincronizacionInicialCompleta = true;
    renderMisionesPreparadas();
    renderPropuestas(meta);
    programarProteccion();
  } catch (error) {
    if (estado) estado.classList.add("hidden");
    if (lista) {
      lista.innerHTML = `
        <div class="refuerzo-error">
          No fue posible preparar las propuestas académicas.<br>
          Razón: ${escapar(error.message || "Error no identificado")}
        </div>
      `;
    }
  } finally {
    cargando = false;
  }
}

function inicializar() {
  cargarEstilos();
  crearSeccionesBase();

  document.querySelectorAll("[data-tab]").forEach(tab => {
    tab.addEventListener("click", () => {
      if (tab.dataset.tab !== "refuerzos") return;
      window.setTimeout(() => cargarTodo(), 0);
    });
  });

  const listaTareas = $("listaTareas");
  if (listaTareas) {
    new MutationObserver(() => {
      programarProteccion();
      if (!sincronizacionInicialCompleta && !cargando) {
        window.setTimeout(() => cargarTodo({ silencioso: true }), 80);
      }
    }).observe(listaTareas, {
      childList: true,
      subtree: true
    });
  }

  window.setTimeout(() => cargarTodo({ silencioso: true }), 700);
}

inicializar();
