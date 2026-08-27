import { auth } from "../../../../compartido/firebase/firebase-config.js";
import { ContextoUsuario } from "../../../../compartido/js/contexto-usuario.js";
import { crearTiempoActivo } from "../../../../compartido/js/tiempo-activo.js";
import { mostrarCelebracion } from "../../../../compartido/js/celebracion.js";
import {
  guardarSesionAcademica,
  obtenerVariantesRecientes,
  MODOS_SESION_ACADEMICA
} from "../../../../compartido/js/sesiones-academicas.js";
import { escuchar, detener, disponible } from "../../../../compartido/js/lector-texto.js";
import {
  FRACCIONES_META,
  BLOQUES_RESULTADO,
  FICHAS_FRACCIONES,
  PRACTICA_FRACCIONES,
  FAMILIAS_PRUEBA_FRACCIONES,
  EXPLICACIONES_PRUEBA_FRACCIONES
} from "./fracciones-data.js";

const $ = id => document.getElementById(id);
const rutaLogin = new URL("../../../../login.html", import.meta.url).href;

await auth.authStateReady();
if (!auth.currentUser) {
  window.location.replace(rutaLogin);
  throw new Error("Sesión no disponible.");
}

const contexto = await ContextoUsuario.inicializar();
const esAdministrador = await ContextoUsuario.esAdministrador();
const nombreAlumno = String(
  contexto.personaActiva?.nombreVisible ||
  contexto.personaActiva?.nombre ||
  "Exploradora"
).trim();
const cursoActivo = String(contexto.personaActiva?.curso || "").toLowerCase();
const pareceSexto = /(^|\D)6(?:\D|$)|sexto/.test(cursoActivo);
const puedeRegistrar = Boolean(contexto.esPersonaPropia || esAdministrador);
const parametros = new URLSearchParams(window.location.search);

let modo = contexto.esPersonaPropia && pareceSexto
  ? MODOS_SESION_ACADEMICA.APRENDIZAJE
  : MODOS_SESION_ACADEMICA.VISTA_PREVIA;

if (["vista_previa", "preview"].includes(parametros.get("modo"))) {
  modo = MODOS_SESION_ACADEMICA.VISTA_PREVIA;
}
if (parametros.get("modo") === "aprendizaje" && puedeRegistrar) {
  modo = MODOS_SESION_ACADEMICA.APRENDIZAJE;
}

const estado = {
  pestana: "resumen",
  practicaIndice: 0,
  practicaSeleccion: null,
  practicaResuelta: false,
  practicaIntentos: new Map(),
  practicaPistas: new Set(),
  pruebaIniciada: false,
  pruebaFinalizada: false,
  pruebaIndice: 0,
  pruebaSeleccion: null,
  pruebaRespuestaConfirmada: false,
  preguntasPrueba: [],
  respuestas: [],
  ordenOpciones: new Map(),
  inicioIso: null,
  guardado: null,
  tiempo: crearTiempoActivo({ inactividadMs: 180000 })
};

function escaparHTML(valor = "") {
  return String(valor).replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caracter]);
}

function barajar(elementos) {
  const copia = [...elementos];
  for (let indice = copia.length - 1; indice > 0; indice -= 1) {
    const otro = Math.floor(Math.random() * (indice + 1));
    [copia[indice], copia[otro]] = [copia[otro], copia[indice]];
  }
  return copia;
}

function elegirUna(elementos) {
  return elementos[Math.floor(Math.random() * elementos.length)];
}

function bloqueResultado(id) {
  return BLOQUES_RESULTADO.find(item => item.id === id);
}

function textoOpcion(pregunta, opcionId) {
  return pregunta?.opciones?.find(opcion => opcion.id === opcionId)?.texto || "";
}

function explicacionPregunta(pregunta) {
  return EXPLICACIONES_PRUEBA_FRACCIONES[pregunta?.id] ||
    "Revisa qué representa cada cantidad y aplica el procedimiento del bloque paso a paso.";
}

function pruebaEnCurso() {
  return estado.pruebaIniciada && !estado.pruebaFinalizada;
}

function actualizarBloqueoPestanas() {
  document.querySelectorAll("[data-pestana]").forEach(boton => {
    boton.disabled = pruebaEnCurso() && boton.dataset.pestana !== "prueba";
  });
}

function activarPestana(nombre) {
  if (pruebaEnCurso() && nombre !== "prueba") return;

  detenerLecturaActual();
  estado.pestana = nombre;
  document.querySelectorAll("[data-pestana]").forEach(boton => {
    boton.classList.toggle("activa", boton.dataset.pestana === nombre);
  });
  document.querySelectorAll("[data-panel]").forEach(panel => {
    const activo = panel.dataset.panel === nombre;
    panel.hidden = !activo;
    panel.classList.toggle("activo", activo);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-pestana]").forEach(boton => {
  boton.addEventListener("click", () => activarPestana(boton.dataset.pestana));
});

function actualizarModo() {
  const aprendizaje = modo === MODOS_SESION_ACADEMICA.APRENDIZAJE;
  $("iconoModo").textContent = aprendizaje ? "🎓" : "👀";
  $("tituloModo").textContent = aprendizaje ? "Sesión de aprendizaje" : "Vista previa";
  $("descripcionModo").textContent = aprendizaje
    ? `Trabajamos sobre ${nombreAlumno}. Solo la prueba final guardará una evidencia útil.`
    : "Puedes estudiar, girar fichas y practicar libremente. Nada se guardará como evidencia de aprendizaje.";

  if (estado.pruebaIniciada) {
    $("botonModo").disabled = true;
    $("botonModo").textContent = "Modo fijado al comenzar la prueba";
    return;
  }

  if (aprendizaje) {
    $("botonModo").disabled = false;
    $("botonModo").textContent = "Cambiar a Vista previa";
  } else if (puedeRegistrar) {
    $("botonModo").disabled = false;
    $("botonModo").textContent = "Usar como sesión de aprendizaje";
  } else {
    $("botonModo").disabled = true;
    $("botonModo").textContent = "Este acceso solo explora";
  }
}

$("botonModo").addEventListener("click", () => {
  if (estado.pruebaIniciada) return;
  modo = modo === MODOS_SESION_ACADEMICA.APRENDIZAJE
    ? MODOS_SESION_ACADEMICA.VISTA_PREVIA
    : MODOS_SESION_ACADEMICA.APRENDIZAJE;
  actualizarModo();
});

function renderFichas() {
  $("fichasContenido").innerHTML = FICHAS_FRACCIONES.map((ficha, indice) => `
    <article class="ficha" tabindex="0" role="button" aria-label="Girar ficha ${indice + 1}">
      <div class="ficha__interior">
        <div class="ficha__cara">
          <div class="ficha__icono" aria-hidden="true">${escaparHTML(ficha.icono)}</div>
          <h3>${escaparHTML(ficha.pregunta)}</h3>
          <p class="ficha__pista">Piensa primero · toca para comprobar</p>
        </div>
        <div class="ficha__cara ficha__cara--trasera">
          <div class="ficha__icono" aria-hidden="true">🌿</div>
          <p>${escaparHTML(ficha.respuesta)}</p>
          <p class="ficha__pista">Toca para volver</p>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".ficha").forEach(ficha => {
    const girar = () => ficha.classList.toggle("girada");
    ficha.addEventListener("click", girar);
    ficha.addEventListener("keydown", evento => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        girar();
      }
    });
  });
}

function htmlBarra(total, activas, etiqueta = "") {
  const totalSeguro = Math.max(1, Number(total) || 1);
  const activasSeguras = Math.max(0, Math.min(totalSeguro, Number(activas) || 0));
  return `
    <div>
      <div class="barra barra--${totalSeguro}" role="img" aria-label="${escaparHTML(etiqueta || `${activasSeguras} de ${totalSeguro} partes`)}">
        ${Array.from({ length: totalSeguro }, (_, indice) => `<span class="${indice < activasSeguras ? "activa" : ""}"></span>`).join("")}
      </div>
      ${etiqueta ? `<div class="visual-etiqueta">${escaparHTML(etiqueta)}</div>` : ""}
    </div>
  `;
}

function htmlVisual(visual) {
  if (!visual?.tipo) return "";

  if (visual.tipo === "barra") {
    return `<div class="visual-reto">${htmlBarra(visual.total, visual.activas, visual.etiqueta)}</div>`;
  }

  if (visual.tipo === "equivalentes") {
    return `<div class="visual-reto equivalencias-visual">
      ${visual.pares.map(par => `<div class="equivalencia-fila"><strong>${escaparHTML(par.texto)}</strong>${htmlBarra(par.total, par.activas)}</div>`).join("")}
    </div>`;
  }

  if (visual.tipo === "suma-barras") {
    return `<div class="visual-reto equivalencias-visual">
      <div class="equivalencia-fila"><strong>${visual.primera}/${visual.total}</strong>${htmlBarra(visual.total, visual.primera)}</div>
      <div class="equivalencia-fila"><strong>${visual.segunda}/${visual.total}</strong>${htmlBarra(visual.total, visual.segunda)}</div>
    </div>`;
  }

  if (visual.tipo === "mcm") {
    return `<div class="visual-reto mcm-visual">
      <div class="mcm-columna"><strong>Múltiplos de ${visual.a}</strong><div class="multiplos">${visual.multiplosA.map(numero => `<span class="multiplo">${numero}</span>`).join("")}</div></div>
      <div class="mcm-columna"><strong>Múltiplos de ${visual.b}</strong><div class="multiplos">${visual.multiplosB.map(numero => `<span class="multiplo">${numero}</span>`).join("")}</div></div>
    </div>`;
  }

  if (visual.tipo === "conversion") {
    return `<div class="visual-reto">
      <div class="conversion-visual"><div class="conversion-fraccion"><strong>${escaparHTML(visual.izquierda)}</strong></div><div class="conversion-flecha">→</div><div class="conversion-fraccion"><strong>${escaparHTML(visual.izquierdaConvertida)}</strong></div></div>
      <div class="conversion-visual"><div class="conversion-fraccion"><strong>${escaparHTML(visual.derecha)}</strong></div><div class="conversion-flecha">→</div><div class="conversion-fraccion"><strong>${escaparHTML(visual.derechaConvertida)}</strong></div></div>
    </div>`;
  }

  if (visual.tipo === "producto") {
    return `<div class="visual-reto formula formula--lavanda"><strong>${visual.numeradores[0]}/${visual.denominadores[0]}</strong><span>×</span><strong>${visual.numeradores[1]}/${visual.denominadores[1]}</strong><span class="igual">→</span><strong>(${visual.numeradores.join(" × ")})/(${visual.denominadores.join(" × ")})</strong></div>`;
  }

  if (visual.tipo === "division") {
    return `<div class="visual-reto"><div class="cruz-visual"><div class="cruz-fraccion">${escaparHTML(visual.primera)}</div><div class="cruz-centro">÷</div><div class="cruz-fraccion">${escaparHTML(visual.segunda)}</div></div><div class="formula formula--lavanda"><strong>arriba: ${escaparHTML(visual.arriba)}</strong><span>·</span><strong>abajo: ${escaparHTML(visual.abajo)}</strong></div></div>`;
  }

  if (visual.tipo === "pizza") {
    const porciones = Array.from({ length: visual.total }, (_, indice) => {
      const numero = indice + 1;
      let clase = "";
      if (indice < visual.mediodia) clase = "mediodia";
      else if (indice < visual.mediodia + visual.tarde) clase = "tarde";
      return `<span class="pizza-porcion ${clase}">${numero}</span>`;
    }).join("");
    return `<div class="visual-reto"><div class="pizza-visual">${porciones}</div><div class="pizza-leyenda"><span class="mediodia">3/8 mediodía</span><span class="tarde">1/4 = 2/8 tarde</span></div></div>`;
  }

  return "";
}

function htmlReto(item, opciones, prefijo) {
  return `
    <h3 class="reto-titulo">${escaparHTML(item.titulo)}</h3>
    <div class="reto-enunciado">${escaparHTML(item.enunciado)}</div>
    ${htmlVisual(item.visual)}
    <p class="reto-pregunta">${escaparHTML(item.pregunta)}</p>
    <div class="acciones" style="justify-content:flex-start;margin-top:0"><button id="${prefijo}Escuchar" class="boton-escuchar" type="button">🔊 Escuchar reto</button></div>
    <div class="opciones" id="${prefijo}Opciones">
      ${opciones.map(opcion => `<button class="opcion" type="button" data-opcion="${escaparHTML(opcion.id)}">${escaparHTML(opcion.texto)}</button>`).join("")}
    </div>
  `;
}

function renderPractica() {
  detenerLecturaActual();
  const reto = PRACTICA_FRACCIONES[estado.practicaIndice];
  const porcentaje = ((estado.practicaIndice + 1) / PRACTICA_FRACCIONES.length) * 100;
  $("barraPractica").style.width = `${porcentaje}%`;
  $("estadoPractica").textContent = `Reto ${estado.practicaIndice + 1} de ${PRACTICA_FRACCIONES.length}`;
  $("practicaContenido").innerHTML = htmlReto(reto, barajar(reto.opciones), "practica");
  $("mensajePractica").textContent = "";
  $("mensajePractica").className = "mensaje";
  $("pistaPractica").hidden = true;
  $("pistaPractica").textContent = "";
  $("botonPista").hidden = false;
  $("botonPista").textContent = "💡 Ver una pista";
  $("botonComprobar").hidden = false;
  $("botonComprobar").disabled = true;
  $("botonSiguiente").hidden = true;
  estado.practicaSeleccion = null;
  estado.practicaResuelta = false;

  document.querySelectorAll("#practicaOpciones .opcion").forEach(boton => {
    boton.addEventListener("click", () => {
      if (estado.practicaResuelta) return;
      estado.practicaSeleccion = boton.dataset.opcion;
      document.querySelectorAll("#practicaOpciones .opcion").forEach(item => item.classList.remove("seleccionada", "incorrecta"));
      boton.classList.add("seleccionada");
      $("botonComprobar").disabled = false;
    });
  });

  $("practicaEscuchar")?.addEventListener("click", () => {
    iniciarLectura($("practicaEscuchar"), textoParaVoz(`${reto.enunciado}. ${reto.pregunta}`));
  });
}

$("botonPista").addEventListener("click", () => {
  const reto = PRACTICA_FRACCIONES[estado.practicaIndice];
  estado.practicaPistas.add(reto.id);
  $("pistaPractica").textContent = reto.pista;
  $("pistaPractica").hidden = false;
  $("botonPista").textContent = "💡 Pista mostrada";
});

$("botonComprobar").addEventListener("click", () => {
  const reto = PRACTICA_FRACCIONES[estado.practicaIndice];
  const intentos = (estado.practicaIntentos.get(reto.id) || 0) + 1;
  estado.practicaIntentos.set(reto.id, intentos);
  const correcta = estado.practicaSeleccion === reto.respuestaCorrecta;
  const botonElegido = document.querySelector(`#practicaOpciones [data-opcion="${estado.practicaSeleccion}"]`);

  if (correcta) {
    estado.practicaResuelta = true;
    botonElegido?.classList.add("correcta");
    $("mensajePractica").textContent = `✓ Muy bien. ${reto.explicacion}`;
    $("mensajePractica").className = "mensaje bien";
    $("botonComprobar").hidden = true;
    $("botonPista").hidden = true;
    $("botonSiguiente").hidden = false;
    $("botonSiguiente").textContent = estado.practicaIndice === PRACTICA_FRACCIONES.length - 1
      ? "Ir a la prueba →"
      : "Siguiente reto →";
  } else {
    botonElegido?.classList.add("incorrecta");
    $("mensajePractica").textContent = "Todavía no. Mira de nuevo la representación y el procedimiento; puedes pedir una pista si la necesitas.";
    $("mensajePractica").className = "mensaje revisar";
  }
});

$("botonSiguiente").addEventListener("click", () => {
  if (estado.practicaIndice < PRACTICA_FRACCIONES.length - 1) {
    estado.practicaIndice += 1;
    renderPractica();
    return;
  }
  activarPestana("prueba");
});

function opcionesPrueba(pregunta) {
  if (!estado.ordenOpciones.has(pregunta.id)) {
    estado.ordenOpciones.set(pregunta.id, barajar(pregunta.opciones));
  }
  return estado.ordenOpciones.get(pregunta.id);
}

async function prepararPreguntasPrueba() {
  let recientes = new Set();

  if (modo === MODOS_SESION_ACADEMICA.APRENDIZAJE) {
    try {
      recientes = await obtenerVariantesRecientes({
        actividadId: FRACCIONES_META.actividadId,
        maximoSesiones: 3
      });
    } catch (error) {
      console.warn("No se pudo consultar el historial de variantes de Fracciones.", error);
    }
  }

  estado.preguntasPrueba = FAMILIAS_PRUEBA_FRACCIONES.map(familia => {
    const noRecientes = familia.variantes.filter(variante => !recientes.has(variante.id));
    return elegirUna(noRecientes.length ? noRecientes : familia.variantes);
  });
}

async function iniciarPrueba() {
  detenerLecturaActual();
  const botonInicio = $("botonIniciarPrueba");
  botonInicio.disabled = true;
  botonInicio.textContent = "Preparando preguntas…";

  await prepararPreguntasPrueba();

  estado.pruebaIniciada = true;
  estado.pruebaFinalizada = false;
  estado.pruebaIndice = 0;
  estado.pruebaSeleccion = null;
  estado.pruebaRespuestaConfirmada = false;
  estado.respuestas = [];
  estado.ordenOpciones.clear();
  estado.inicioIso = new Date().toISOString();
  estado.tiempo.reiniciar("prueba-fracciones");
  actualizarModo();
  actualizarBloqueoPestanas();
  $("inicioPrueba").hidden = true;
  $("cierrePrueba").hidden = true;
  $("pruebaActiva").hidden = false;
  botonInicio.disabled = false;
  botonInicio.textContent = "🌿 Empezar mi prueba";
  renderPreguntaPrueba();
}

function renderPreguntaPrueba() {
  detenerLecturaActual();
  const pregunta = estado.preguntasPrueba[estado.pruebaIndice];
  const porcentaje = ((estado.pruebaIndice + 1) / estado.preguntasPrueba.length) * 100;
  $("barraPrueba").style.width = `${porcentaje}%`;
  $("estadoPrueba").textContent = `Pregunta ${estado.pruebaIndice + 1} de ${estado.preguntasPrueba.length}`;
  $("bloquePrueba").textContent = bloqueResultado(pregunta.bloqueId)?.titulo || "Fracciones";
  $("pruebaContenido").innerHTML = `${htmlReto(pregunta, opcionesPrueba(pregunta), "prueba")}
    <div id="explicacionPrueba" class="pista" role="status" hidden></div>`;
  $("botonResponderPrueba").disabled = true;
  $("botonResponderPrueba").textContent = "Comprobar respuesta →";
  estado.pruebaSeleccion = null;
  estado.pruebaRespuestaConfirmada = false;

  document.querySelectorAll("#pruebaOpciones .opcion").forEach(boton => {
    boton.addEventListener("click", () => {
      if (estado.pruebaRespuestaConfirmada) return;
      estado.pruebaSeleccion = boton.dataset.opcion;
      document.querySelectorAll("#pruebaOpciones .opcion").forEach(item => item.classList.remove("seleccionada"));
      boton.classList.add("seleccionada");
      $("botonResponderPrueba").disabled = false;
    });
  });

  $("pruebaEscuchar")?.addEventListener("click", () => {
    iniciarLectura($("pruebaEscuchar"), textoParaVoz(`${pregunta.enunciado}. ${pregunta.pregunta}`));
  });
}

function mostrarExplicacionPrueba(pregunta, correcta) {
  const seleccion = estado.pruebaSeleccion;
  const respuestaElegida = textoOpcion(pregunta, seleccion);
  const respuestaCorrecta = textoOpcion(pregunta, pregunta.respuestaCorrecta);
  const explicacion = explicacionPregunta(pregunta);
  const contenedor = $("explicacionPrueba");

  document.querySelectorAll("#pruebaOpciones .opcion").forEach(boton => {
    boton.disabled = true;
    boton.classList.remove("seleccionada");
    if (boton.dataset.opcion === pregunta.respuestaCorrecta) boton.classList.add("correcta");
    if (!correcta && boton.dataset.opcion === seleccion) boton.classList.add("incorrecta");
  });

  contenedor.hidden = false;
  contenedor.style.borderColor = correcta ? "#cbe5d1" : "#ead6d0";
  contenedor.style.background = correcta ? "#f5fcf6" : "#fff8f6";
  contenedor.innerHTML = `
    <strong>${correcta ? "✓ Buena elección." : "🌿 Vamos a revisarla."}</strong>
    <div style="margin-top:8px"><b>Tu respuesta:</b> ${escaparHTML(respuestaElegida)}</div>
    ${correcta ? "" : `<div style="margin-top:4px"><b>Respuesta correcta:</b> ${escaparHTML(respuestaCorrecta)}</div>`}
    <div style="margin-top:8px;line-height:1.55"><b>Por qué:</b> ${escaparHTML(explicacion)}</div>
  `;
}

$("botonIniciarPrueba").addEventListener("click", iniciarPrueba);

$("botonResponderPrueba").addEventListener("click", async () => {
  const pregunta = estado.preguntasPrueba[estado.pruebaIndice];

  if (!estado.pruebaRespuestaConfirmada) {
    if (!estado.pruebaSeleccion) return;

    const correcta = estado.pruebaSeleccion === pregunta.respuestaCorrecta;
    const explicacion = explicacionPregunta(pregunta);

    estado.respuestas.push({
      preguntaId: pregunta.id,
      bloqueId: pregunta.bloqueId,
      conceptoId: pregunta.conceptoId,
      tipoEvidencia: pregunta.tipoEvidencia,
      titulo: pregunta.titulo,
      enunciado: pregunta.enunciado,
      pregunta: pregunta.pregunta,
      respuesta: estado.pruebaSeleccion,
      respuestaTexto: textoOpcion(pregunta, estado.pruebaSeleccion),
      respuestaCorrecta: pregunta.respuestaCorrecta,
      respuestaCorrectaTexto: textoOpcion(pregunta, pregunta.respuestaCorrecta),
      explicacion,
      correcta
    });

    estado.pruebaRespuestaConfirmada = true;
    mostrarExplicacionPrueba(pregunta, correcta);
    $("botonResponderPrueba").textContent = estado.pruebaIndice < estado.preguntasPrueba.length - 1
      ? "Siguiente pregunta →"
      : "Ver resultado →";
    return;
  }

  if (estado.pruebaIndice < estado.preguntasPrueba.length - 1) {
    estado.pruebaIndice += 1;
    renderPreguntaPrueba();
    return;
  }

  await finalizarPrueba();
});

function construirMapaResultados() {
  return BLOQUES_RESULTADO.map(bloque => {
    const respuestas = estado.respuestas.filter(item => item.bloqueId === bloque.id);
    const correctas = respuestas.filter(item => item.correcta).length;
    const total = respuestas.length;
    let estadoId = "reforzar";
    let tituloEstado = "Conviene reforzar";
    let textoEstado = "Este bloque merece otra explicación visual y más práctica antes de aumentar la dificultad.";

    if (total && correctas === total) {
      estadoId = "solido";
      tituloEstado = "Se vio firme hoy";
      textoEstado = "Las respuestas de hoy muestran una base preparada para seguir usándola en situaciones nuevas.";
    } else if (correctas > 0) {
      estadoId = "camino";
      tituloEstado = "En camino";
      textoEstado = "Hay parte de la estrategia presente; unas variantes más ayudarán a consolidarla.";
    }

    return { ...bloque, correctas, total, estado: estadoId, tituloEstado, textoEstado };
  });
}

function renderMapaResultados(mapa) {
  $("mapaResultados").innerHTML = mapa.map(item => `
    <article class="resultado ${escaparHTML(item.estado)}">
      <div class="resultado__cabecera">
        <div class="resultado__icono">${escaparHTML(item.icono)}</div>
        <div><h3>${escaparHTML(item.titulo)} · ${escaparHTML(item.tituloEstado)}</h3><p>${escaparHTML(item.textoEstado)}</p></div>
      </div>
    </article>
  `).join("");
}

function renderResultadoNumerico(totalCorrectas, totalPreguntas) {
  document.getElementById("resultadoPruebaResumen")?.remove();
  document.getElementById("revisionPrueba")?.remove();

  const porcentaje = totalPreguntas ? Math.round((totalCorrectas / totalPreguntas) * 100) : 0;
  const resumen = document.createElement("section");
  resumen.id = "resultadoPruebaResumen";
  resumen.className = "regla-clave";
  resumen.style.marginTop = "22px";
  resumen.style.textAlign = "left";
  resumen.innerHTML = `
    <div class="regla-clave__icono" aria-hidden="true">📊</div>
    <div style="flex:1">
      <strong>Resultado de la prueba</strong>
      <div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:12px;margin-top:6px">
        <span style="font-size:2rem;font-weight:950;color:#526039">${totalCorrectas} de ${totalPreguntas}</span>
        <span style="font-size:1.35rem;font-weight:900;color:#66538f">${porcentaje} %</span>
      </div>
      <p style="margin-top:6px">Este resultado describe esta prueba de hoy. El mapa de abajo ayuda a ver en qué contenidos conviene seguir practicando.</p>
    </div>`;

  const revision = document.createElement("section");
  revision.id = "revisionPrueba";
  revision.style.marginTop = "22px";
  revision.style.textAlign = "left";
  revision.innerHTML = `
    <p class="sobrelinea">Revisión de respuestas</p>
    <h3 style="margin:0 0 12px;font-size:1.45rem">Qué pasó en cada pregunta</h3>
    <div style="display:grid;gap:10px">
      ${estado.respuestas.map((respuesta, indice) => `
        <article class="resultado ${respuesta.correcta ? "solido" : "reforzar"}">
          <div class="resultado__cabecera">
            <div class="resultado__icono" aria-hidden="true">${respuesta.correcta ? "✓" : "🌿"}</div>
            <div>
              <h3>${indice + 1}. ${escaparHTML(respuesta.titulo)}</h3>
              <p><b>Tu respuesta:</b> ${escaparHTML(respuesta.respuestaTexto)}</p>
              ${respuesta.correcta ? "" : `<p style="margin-top:4px"><b>Respuesta correcta:</b> ${escaparHTML(respuesta.respuestaCorrectaTexto)}</p>`}
              <p style="margin-top:6px"><b>Por qué:</b> ${escaparHTML(respuesta.explicacion)}</p>
            </div>
          </div>
        </article>`).join("")}
    </div>`;

  $("mapaResultados").before(resumen, revision);
}

async function finalizarPrueba() {
  detenerLecturaActual();
  estado.pruebaFinalizada = true;
  estado.tiempo.detener();
  actualizarBloqueoPestanas();
  $("pruebaActiva").hidden = true;
  $("cierrePrueba").hidden = false;

  const mapa = construirMapaResultados();
  const totalCorrectas = estado.respuestas.filter(item => item.correcta).length;
  renderResultadoNumerico(totalCorrectas, estado.respuestas.length);
  renderMapaResultados(mapa);

  const reforzar = mapa.filter(item => item.estado === "reforzar");
  const enCamino = mapa.filter(item => item.estado === "camino");

  if (reforzar.length) {
    $("textoCierre").textContent = `${nombreAlumno}, ya tenemos una fotografía útil: hay ideas que están contigo y otras que conviene volver a mirar con apoyo visual.`;
  } else if (enCamino.length) {
    $("textoCierre").textContent = `${nombreAlumno}, las ideas principales están apareciendo. Algunas necesitan unas variantes más para quedar firmes.`;
  } else {
    $("textoCierre").textContent = `${nombreAlumno}, hoy las bases del tema se vieron firmes. El siguiente paso será comprobarlas de nuevo en problemas y momentos distintos.`;
  }

  $("estadoGuardado").textContent = modo === MODOS_SESION_ACADEMICA.APRENDIZAJE
    ? "Guardando esta sesión…"
    : "Vista previa: este resultado no se guardará como aprendizaje.";

  const tiempo = estado.tiempo.obtenerResultado();

  try {
    estado.guardado = await guardarSesionAcademica({
      modo,
      actividadId: FRACCIONES_META.actividadId,
      tituloActividad: FRACCIONES_META.tituloActividad,
      versionActividad: FRACCIONES_META.version,
      cursoReferencia: FRACCIONES_META.cursoReferencia,
      materia: FRACCIONES_META.materia,
      tema: FRACCIONES_META.tema,
      origen: "curso",
      inicioCliente: estado.inicioIso,
      finCliente: new Date().toISOString(),
      ...tiempo,
      conceptosTrabajados: estado.preguntasPrueba.map(item => item.conceptoId),
      variantes: estado.preguntasPrueba.map(item => ({ varianteId:item.id, bloqueId:item.bloqueId, conceptoId:item.conceptoId })),
      respuestas: estado.respuestas,
      resumen: {
        temaCompleto: true,
        totalPreguntas: estado.respuestas.length,
        totalCorrectas,
        porcentaje: estado.respuestas.length ? Math.round((totalCorrectas / estado.respuestas.length) * 100) : 0,
        porBloque: mapa.map(item => ({ bloqueId:item.id, correctas:item.correctas, total:item.total, estado:item.estado }))
      },
      retroalimentacion: {
        bloquesFirmes: mapa.filter(item => item.estado === "solido").map(item => item.id),
        bloquesEnCamino: mapa.filter(item => item.estado === "camino").map(item => item.id),
        bloquesAReforzar: mapa.filter(item => item.estado === "reforzar").map(item => item.id),
        mensajeVisible: "Resultado y mapa formativo de la sesión; no constituyen una calificación escolar."
      }
    });

    $("estadoGuardado").textContent = estado.guardado?.guardado
      ? "✓ Sesión guardada en tu historial de aprendizaje."
      : "Vista previa: el resultado no se guardó como aprendizaje.";
  } catch (error) {
    console.error("No se pudo guardar la sesión de Fracciones.", error);
    $("estadoGuardado").textContent = "No se pudo guardar esta sesión. Puedes volver a intentarlo más tarde.";
  }

  if (typeof mostrarCelebracion === "function") {
    mostrarCelebracion({ titulo:"¡Tema recorrido!", mensaje:"Ya sabemos qué ideas de Fracciones seguir fortaleciendo." });
  }
}

$("botonVolverRepaso").addEventListener("click", () => {
  estado.pruebaIniciada = false;
  estado.pruebaFinalizada = false;
  estado.pruebaRespuestaConfirmada = false;
  actualizarModo();
  actualizarBloqueoPestanas();
  $("inicioPrueba").hidden = false;
  $("pruebaActiva").hidden = true;
  $("cierrePrueba").hidden = true;
  activarPestana("teoria");
});

let botonLeyendo = null;

function textoParaVoz(texto = "") {
  return String(texto)
    .replace(/m\.c\.m\./gi, " mínimo común múltiplo ")
    .replace(/(\d+)\s*\/\s*(\d+)/g, "$1 sobre $2")
    .replaceAll("×", " por ")
    .replaceAll("÷", " dividido entre ")
    .replaceAll("−", " menos ")
    .replaceAll("+", " más ")
    .replaceAll("=", " es igual a ");
}

function detenerLecturaActual() {
  detener();
  if (botonLeyendo) {
    botonLeyendo.textContent = botonLeyendo.dataset.textoOriginal || "🔊 Escuchar";
    botonLeyendo = null;
  }
}

function textoLimpioContenedor(contenedor) {
  const copia = contenedor.cloneNode(true);
  copia.querySelectorAll("button").forEach(boton => boton.remove());
  return textoParaVoz(copia.textContent || "");
}

function iniciarLectura(boton, texto) {
  if (!disponible()) {
    boton.disabled = true;
    boton.textContent = "🔇 Escucha no disponible";
    return;
  }
  if (botonLeyendo === boton) {
    detenerLecturaActual();
    return;
  }
  detenerLecturaActual();
  boton.dataset.textoOriginal ||= boton.textContent;
  botonLeyendo = boton;
  boton.textContent = "⏹ Detener lectura";
  const iniciado = escuchar(texto, {
    idioma:"es-ES",
    velocidad:.70,
    tono:1,
    alFinalizar:detenerLecturaActual,
    alError:detenerLecturaActual
  });
  if (!iniciado) detenerLecturaActual();
}

document.addEventListener("click", evento => {
  const boton = evento.target.closest("[data-escuchar-contenedor]");
  if (!boton) return;
  const contenedor = document.querySelector(boton.dataset.escucharContenedor);
  if (contenedor) iniciarLectura(boton, textoLimpioContenedor(contenedor));
});

window.addEventListener("beforeunload", detenerLecturaActual, { once:true });

const textoInicioPrueba = document.querySelector("#inicioPrueba > p:not(.sobrelinea)");
if (textoInicioPrueba) {
  textoInicioPrueba.textContent = "No hay pistas durante esta parte. Después de cada respuesta verás una explicación breve y, al final, tu resultado junto con un mapa de lo que conviene seguir practicando.";
}

renderFichas();
renderPractica();
actualizarModo();
actualizarBloqueoPestanas();
