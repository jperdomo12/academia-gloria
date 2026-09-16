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
  ENGLISH_META,
  BLOQUES_RESULTADO,
  FICHAS_ENGLISH,
  PRACTICA_ENGLISH,
  FAMILIAS_PRUEBA_ENGLISH
} from "./present-simple-vs-present-continuous-data.js";

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
  contexto.personaActiva?.nombreVisible || contexto.personaActiva?.nombre || "Exploradora"
).trim();
const cursoActivo = String(contexto.personaActiva?.curso || "").toLowerCase();
const pareceSexto = /(^|\D)6(?:\D|$)|sexto/.test(cursoActivo);
const puedeRegistrar = Boolean(contexto.esPersonaPropia || esAdministrador);
const parametros = new URLSearchParams(window.location.search);

let modo = contexto.esPersonaPropia && pareceSexto
  ? MODOS_SESION_ACADEMICA.APRENDIZAJE
  : MODOS_SESION_ACADEMICA.VISTA_PREVIA;

if (["vista_previa", "preview"].includes(parametros.get("modo"))) modo = MODOS_SESION_ACADEMICA.VISTA_PREVIA;
if (parametros.get("modo") === "aprendizaje" && puedeRegistrar) modo = MODOS_SESION_ACADEMICA.APRENDIZAJE;

const estado = {
  pestana:"resumen",
  practicaIndice:0,
  practicaSeleccion:null,
  practicaResuelta:false,
  practicaIntentos:new Map(),
  practicaPistas:new Set(),
  pruebaIniciada:false,
  pruebaFinalizada:false,
  pruebaIndice:0,
  pruebaSeleccion:null,
  pruebaRespuestaConfirmada:false,
  preguntasPrueba:[],
  respuestas:[],
  ordenOpciones:new Map(),
  inicioIso:null,
  guardado:null,
  tiempo:crearTiempoActivo({ inactividadMs:180000 })
};

function escaparHTML(valor = "") {
  return String(valor).replace(/[&<>"']/g, caracter => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
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
    panel.hidden = panel.dataset.panel !== nombre;
  });
  window.scrollTo({ top:0, behavior:"smooth" });
}

document.querySelectorAll("[data-pestana]").forEach(boton => {
  boton.addEventListener("click", () => activarPestana(boton.dataset.pestana));
});

function actualizarModo() {
  const aprendizaje = modo === MODOS_SESION_ACADEMICA.APRENDIZAJE;
  $("iconoModo").textContent = aprendizaje ? "🎓" : "👀";
  $("tituloModo").textContent = aprendizaje ? "Sesión de aprendizaje" : "Vista previa";
  $("descripcionModo").textContent = aprendizaje
    ? `Trabajamos sobre ${nombreAlumno}. Solo la prueba final guardará evidencia académica.`
    : "Puedes estudiar, escuchar, usar fichas y practicar. Nada se guardará como evidencia de aprendizaje.";

  if (estado.pruebaIniciada) {
    $("botonModo").disabled = true;
    $("botonModo").textContent = "Modo fijado al comenzar la prueba";
  } else if (aprendizaje) {
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
  $("fichasContenido").innerHTML = FICHAS_ENGLISH.map((ficha, indice) => `
    <article class="flashcard" tabindex="0" role="button" aria-label="Girar ficha ${indice + 1}">
      <div class="flashcard__inner">
        <div class="flashcard__face">
          <div class="flashcard__icon" aria-hidden="true">${escaparHTML(ficha.icono)}</div>
          <h3>${escaparHTML(ficha.pregunta)}</h3>
          <p class="flashcard__hint">Think first · tap to check</p>
        </div>
        <div class="flashcard__face flashcard__face--back">
          <div class="flashcard__icon" aria-hidden="true">💬</div>
          <p>${escaparHTML(ficha.respuesta)}</p>
          <p class="flashcard__hint">Tap to go back</p>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".flashcard").forEach(ficha => {
    const girar = () => ficha.classList.toggle("girada");
    ficha.addEventListener("click", girar);
    ficha.addEventListener("keydown", evento => {
      if (["Enter", " "].includes(evento.key)) {
        evento.preventDefault();
        girar();
      }
    });
  });
}

function htmlReto(item, opciones, prefijo) {
  return `
    <h3>${escaparHTML(item.titulo)}</h3>
    <div class="challenge-sentence">${escaparHTML(item.enunciado)}</div>
    <p class="challenge-question">${escaparHTML(item.pregunta)}</p>
    <div class="english-actions" style="margin-top:0">
      <button id="${prefijo}Escuchar" class="listen-btn" type="button">🔊 Listen</button>
    </div>
    <div class="options" id="${prefijo}Opciones">
      ${opciones.map(opcion => `<button class="option" type="button" data-opcion="${escaparHTML(opcion.id)}">${escaparHTML(opcion.texto)}</button>`).join("")}
    </div>
  `;
}

function renderPractica() {
  detenerLecturaActual();
  const reto = PRACTICA_ENGLISH[estado.practicaIndice];
  const porcentaje = ((estado.practicaIndice + 1) / PRACTICA_ENGLISH.length) * 100;
  $("barraPractica").style.width = `${porcentaje}%`;
  $("estadoPractica").textContent = `Reto ${estado.practicaIndice + 1} de ${PRACTICA_ENGLISH.length}`;
  $("practicaContenido").innerHTML = htmlReto(reto, barajar(reto.opciones), "practica");
  $("mensajePractica").textContent = "";
  $("mensajePractica").className = "message";
  $("pistaPractica").hidden = true;
  $("pistaPractica").textContent = "";
  $("botonPista").hidden = false;
  $("botonPista").textContent = "💡 Ver una pista";
  $("botonComprobar").hidden = false;
  $("botonComprobar").disabled = true;
  $("botonSiguiente").hidden = true;
  estado.practicaSeleccion = null;
  estado.practicaResuelta = false;

  document.querySelectorAll("#practicaOpciones .option").forEach(boton => {
    boton.addEventListener("click", () => {
      if (estado.practicaResuelta) return;
      estado.practicaSeleccion = boton.dataset.opcion;
      document.querySelectorAll("#practicaOpciones .option").forEach(item => item.classList.remove("seleccionada", "incorrecta"));
      boton.classList.add("seleccionada");
      $("botonComprobar").disabled = false;
    });
  });

  $("practicaEscuchar")?.addEventListener("click", () => iniciarLectura($("practicaEscuchar"), `${reto.enunciado}. ${reto.pregunta}`));
}

$("botonPista").addEventListener("click", () => {
  const reto = PRACTICA_ENGLISH[estado.practicaIndice];
  estado.practicaPistas.add(reto.id);
  $("pistaPractica").textContent = reto.pista;
  $("pistaPractica").hidden = false;
  $("botonPista").textContent = "💡 Pista mostrada";
});

$("botonComprobar").addEventListener("click", () => {
  const reto = PRACTICA_ENGLISH[estado.practicaIndice];
  estado.practicaIntentos.set(reto.id, (estado.practicaIntentos.get(reto.id) || 0) + 1);
  const correcta = estado.practicaSeleccion === reto.respuestaCorrecta;
  const botonElegido = document.querySelector(`#practicaOpciones [data-opcion="${estado.practicaSeleccion}"]`);

  if (correcta) {
    estado.practicaResuelta = true;
    botonElegido?.classList.add("correcta");
    $("mensajePractica").textContent = `✓ Good. ${reto.explicacion}`;
    $("mensajePractica").className = "message bien";
    $("botonComprobar").hidden = true;
    $("botonPista").hidden = true;
    $("botonSiguiente").hidden = false;
    $("botonSiguiente").textContent = estado.practicaIndice === PRACTICA_ENGLISH.length - 1 ? "Ir a la prueba →" : "Siguiente reto →";
  } else {
    botonElegido?.classList.add("incorrecta");
    $("mensajePractica").textContent = "Not yet. Look at the meaning first, then check the structure. You can use the hint.";
    $("mensajePractica").className = "message revisar";
  }
});

$("botonSiguiente").addEventListener("click", () => {
  if (estado.practicaIndice < PRACTICA_ENGLISH.length - 1) {
    estado.practicaIndice += 1;
    renderPractica();
  } else {
    activarPestana("prueba");
  }
});

function opcionesPrueba(pregunta) {
  if (!estado.ordenOpciones.has(pregunta.id)) estado.ordenOpciones.set(pregunta.id, barajar(pregunta.opciones));
  return estado.ordenOpciones.get(pregunta.id);
}

async function prepararPreguntasPrueba() {
  let recientes = new Set();
  if (modo === MODOS_SESION_ACADEMICA.APRENDIZAJE) {
    try {
      recientes = await obtenerVariantesRecientes({ actividadId:ENGLISH_META.actividadId, maximoSesiones:3 });
    } catch (error) {
      console.warn("No se pudo consultar el historial de variantes de English.", error);
    }
  }
  estado.preguntasPrueba = FAMILIAS_PRUEBA_ENGLISH.map(familia => {
    const noRecientes = familia.variantes.filter(variante => !recientes.has(variante.id));
    return elegirUna(noRecientes.length ? noRecientes : familia.variantes);
  });
}

async function iniciarPrueba() {
  detenerLecturaActual();
  const boton = $("botonIniciarPrueba");
  boton.disabled = true;
  boton.textContent = "Preparing questions…";
  await prepararPreguntasPrueba();

  estado.pruebaIniciada = true;
  estado.pruebaFinalizada = false;
  estado.pruebaIndice = 0;
  estado.pruebaSeleccion = null;
  estado.pruebaRespuestaConfirmada = false;
  estado.respuestas = [];
  estado.ordenOpciones.clear();
  estado.inicioIso = new Date().toISOString();
  estado.tiempo.reiniciar("test-present-simple-vs-present-continuous");
  actualizarModo();
  actualizarBloqueoPestanas();
  $("inicioPrueba").hidden = true;
  $("cierrePrueba").hidden = true;
  $("pruebaActiva").hidden = false;
  boton.disabled = false;
  boton.textContent = "🇬🇧 Empezar mi prueba";
  renderPreguntaPrueba();
}

function renderPreguntaPrueba() {
  detenerLecturaActual();
  const pregunta = estado.preguntasPrueba[estado.pruebaIndice];
  const porcentaje = ((estado.pruebaIndice + 1) / estado.preguntasPrueba.length) * 100;
  $("barraPrueba").style.width = `${porcentaje}%`;
  $("estadoPrueba").textContent = `Pregunta ${estado.pruebaIndice + 1} de ${estado.preguntasPrueba.length}`;
  $("bloquePrueba").textContent = bloqueResultado(pregunta.bloqueId)?.titulo || "English";
  $("pruebaContenido").innerHTML = `${htmlReto(pregunta, opcionesPrueba(pregunta), "prueba")}<div id="explicacionPrueba" class="test-explanation" role="status" hidden></div>`;
  $("botonResponderPrueba").disabled = true;
  $("botonResponderPrueba").textContent = "Comprobar respuesta →";
  estado.pruebaSeleccion = null;
  estado.pruebaRespuestaConfirmada = false;

  document.querySelectorAll("#pruebaOpciones .option").forEach(boton => {
    boton.addEventListener("click", () => {
      if (estado.pruebaRespuestaConfirmada) return;
      estado.pruebaSeleccion = boton.dataset.opcion;
      document.querySelectorAll("#pruebaOpciones .option").forEach(item => item.classList.remove("seleccionada"));
      boton.classList.add("seleccionada");
      $("botonResponderPrueba").disabled = false;
    });
  });
  $("pruebaEscuchar")?.addEventListener("click", () => iniciarLectura($("pruebaEscuchar"), `${pregunta.enunciado}. ${pregunta.pregunta}`));
}

function mostrarExplicacionPrueba(pregunta, correcta) {
  const seleccion = estado.pruebaSeleccion;
  const respuestaElegida = textoOpcion(pregunta, seleccion);
  const respuestaCorrecta = textoOpcion(pregunta, pregunta.respuestaCorrecta);
  const contenedor = $("explicacionPrueba");

  document.querySelectorAll("#pruebaOpciones .option").forEach(boton => {
    boton.disabled = true;
    boton.classList.remove("seleccionada");
    if (boton.dataset.opcion === pregunta.respuestaCorrecta) boton.classList.add("correcta");
    if (!correcta && boton.dataset.opcion === seleccion) boton.classList.add("incorrecta");
  });

  contenedor.hidden = false;
  contenedor.innerHTML = `
    <strong>${correcta ? "✓ Good choice." : "🌿 Let’s review it."}</strong>
    <div style="margin-top:8px"><b>Your answer:</b> ${escaparHTML(respuestaElegida)}</div>
    ${correcta ? "" : `<div style="margin-top:4px"><b>Correct answer:</b> ${escaparHTML(respuestaCorrecta)}</div>`}
    <div style="margin-top:8px"><b>Why:</b> ${escaparHTML(pregunta.explicacion)}</div>`;
}

$("botonIniciarPrueba").addEventListener("click", iniciarPrueba);

$("botonResponderPrueba").addEventListener("click", async () => {
  const pregunta = estado.preguntasPrueba[estado.pruebaIndice];
  if (!estado.pruebaRespuestaConfirmada) {
    if (!estado.pruebaSeleccion) return;
    const correcta = estado.pruebaSeleccion === pregunta.respuestaCorrecta;
    estado.respuestas.push({
      preguntaId:pregunta.id,
      bloqueId:pregunta.bloqueId,
      conceptoId:pregunta.conceptoId,
      tipoEvidencia:pregunta.tipoEvidencia,
      titulo:pregunta.titulo,
      enunciado:pregunta.enunciado,
      pregunta:pregunta.pregunta,
      respuesta:estado.pruebaSeleccion,
      respuestaTexto:textoOpcion(pregunta, estado.pruebaSeleccion),
      respuestaCorrecta:pregunta.respuestaCorrecta,
      respuestaCorrectaTexto:textoOpcion(pregunta, pregunta.respuestaCorrecta),
      explicacion:pregunta.explicacion,
      correcta
    });
    estado.pruebaRespuestaConfirmada = true;
    mostrarExplicacionPrueba(pregunta, correcta);
    $("botonResponderPrueba").textContent = estado.pruebaIndice < estado.preguntasPrueba.length - 1 ? "Siguiente pregunta →" : "Ver resultado →";
    return;
  }

  if (estado.pruebaIndice < estado.preguntasPrueba.length - 1) {
    estado.pruebaIndice += 1;
    renderPreguntaPrueba();
  } else {
    await finalizarPrueba();
  }
});

function construirMapaResultados() {
  return BLOQUES_RESULTADO.map(bloque => {
    const respuestas = estado.respuestas.filter(item => item.bloqueId === bloque.id);
    const correctas = respuestas.filter(item => item.correcta).length;
    const total = respuestas.length;
    let estadoId = "reforzar";
    let tituloEstado = "Conviene reforzar";
    let textoEstado = "Vuelve a la comparación y practica otra variante de este bloque.";
    if (total && correctas === total) {
      estadoId = "solido";
      tituloEstado = "Se vio firme hoy";
      textoEstado = "Las respuestas de hoy muestran una buena conexión entre significado y estructura.";
    } else if (correctas > 0) {
      estadoId = "camino";
      tituloEstado = "En camino";
      textoEstado = "Parte de la idea está presente; unas variantes más ayudarán a consolidarla.";
    }
    return { ...bloque, correctas, total, estado:estadoId, tituloEstado, textoEstado };
  });
}

function renderMapaResultados(mapa) {
  $("mapaResultados").innerHTML = mapa.map(item => `
    <article class="result-card ${escaparHTML(item.estado)}">
      <div class="result-card__head"><div class="result-card__icon">${escaparHTML(item.icono)}</div><div>
        <h3>${escaparHTML(item.titulo)} · ${escaparHTML(item.tituloEstado)}</h3>
        <p>${item.correctas} de ${item.total} correctas. ${escaparHTML(item.textoEstado)}</p>
      </div></div>
    </article>`).join("");
}

function renderResultadoNumerico(totalCorrectas, totalPreguntas) {
  const porcentaje = totalPreguntas ? Math.round((totalCorrectas / totalPreguntas) * 100) : 0;
  $("resultadoPruebaResumen").innerHTML = `
    <div class="results-score"><strong>${totalCorrectas} de ${totalPreguntas}</strong><span>${porcentaje} %</span></div>
    <p>Este resultado describe esta prueba de hoy. No es una calificación escolar: el mapa ayuda a decidir qué conviene volver a practicar.</p>`;
  $("revisionPrueba").innerHTML = `
    <div><div class="english-eyebrow">Review</div><h3>Qué pasó en cada pregunta</h3></div>
    ${estado.respuestas.map((respuesta, indice) => `
      <article class="result-card ${respuesta.correcta ? "solido" : "reforzar"}">
        <div class="result-card__head"><div class="result-card__icon">${respuesta.correcta ? "✓" : "🌿"}</div><div>
          <h3>${indice + 1}. ${escaparHTML(respuesta.titulo)}</h3>
          <p><b>Your answer:</b> ${escaparHTML(respuesta.respuestaTexto)}</p>
          ${respuesta.correcta ? "" : `<p><b>Correct answer:</b> ${escaparHTML(respuesta.respuestaCorrectaTexto)}</p>`}
          <p><b>Why:</b> ${escaparHTML(respuesta.explicacion)}</p>
        </div></div>
      </article>`).join("")}`;
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
    $("textoCierre").textContent = `${nombreAlumno}, ya tenemos una fotografía útil: algunas ideas están claras y otras conviene volver a comparar con calma.`;
  } else if (enCamino.length) {
    $("textoCierre").textContent = `${nombreAlumno}, la diferencia entre los dos tiempos está apareciendo. Unas variantes más ayudarán a fijarla.`;
  } else {
    $("textoCierre").textContent = `${nombreAlumno}, hoy se vio firme la diferencia entre Present Simple y Present Continuous dentro del material trabajado.`;
  }

  $("estadoGuardado").textContent = modo === MODOS_SESION_ACADEMICA.APRENDIZAJE ? "Guardando esta sesión…" : "Vista previa: este resultado no se guardará como aprendizaje.";
  const tiempo = estado.tiempo.obtenerResultado();
  try {
    estado.guardado = await guardarSesionAcademica({
      modo,
      actividadId:ENGLISH_META.actividadId,
      tituloActividad:ENGLISH_META.tituloActividad,
      versionActividad:ENGLISH_META.version,
      cursoReferencia:ENGLISH_META.cursoReferencia,
      materia:ENGLISH_META.materia,
      tema:ENGLISH_META.tema,
      origen:"curso",
      inicioCliente:estado.inicioIso,
      finCliente:new Date().toISOString(),
      ...tiempo,
      conceptosTrabajados:estado.preguntasPrueba.map(item => item.conceptoId),
      variantes:estado.preguntasPrueba.map(item => ({ varianteId:item.id, bloqueId:item.bloqueId, conceptoId:item.conceptoId })),
      respuestas:estado.respuestas,
      resumen:{
        temaCompleto:true,
        totalPreguntas:estado.respuestas.length,
        totalCorrectas,
        porcentaje:estado.respuestas.length ? Math.round((totalCorrectas / estado.respuestas.length) * 100) : 0,
        porBloque:mapa.map(item => ({ bloqueId:item.id, correctas:item.correctas, total:item.total, estado:item.estado }))
      },
      retroalimentacion:{
        bloquesFirmes:mapa.filter(item => item.estado === "solido").map(item => item.id),
        bloquesEnCamino:mapa.filter(item => item.estado === "camino").map(item => item.id),
        bloquesAReforzar:mapa.filter(item => item.estado === "reforzar").map(item => item.id),
        mensajeVisible:"Resultado y mapa formativo de la sesión; no constituyen una calificación escolar."
      }
    });
    $("estadoGuardado").textContent = estado.guardado?.guardado ? "✓ Sesión guardada en tu historial de aprendizaje." : "Vista previa: el resultado no se guardó como aprendizaje.";
  } catch (error) {
    console.error("No se pudo guardar la sesión de Present Simple vs Present Continuous.", error);
    $("estadoGuardado").textContent = "No se pudo guardar esta sesión. Puedes volver a intentarlo más tarde.";
  }

  if (typeof mostrarCelebracion === "function") {
    mostrarCelebracion({ titulo:"Great work!", mensaje:"Ya sabemos qué partes de Present Simple vs Present Continuous seguir practicando." });
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
  activarPestana("compara");
});

let botonLeyendo = null;
function detenerLecturaActual() {
  detener();
  if (botonLeyendo) {
    botonLeyendo.textContent = botonLeyendo.dataset.textoOriginal || "🔊 Listen";
    botonLeyendo = null;
  }
}

function textoLimpioContenedor(contenedor) {
  const copia = contenedor.cloneNode(true);
  copia.querySelectorAll("button").forEach(boton => boton.remove());
  return String(copia.textContent || "").replace(/\s+/g, " ").trim();
}

function iniciarLectura(boton, texto) {
  if (!disponible()) {
    boton.disabled = true;
    boton.textContent = "🔇 Audio unavailable";
    return;
  }
  if (botonLeyendo === boton) {
    detenerLecturaActual();
    return;
  }
  detenerLecturaActual();
  boton.dataset.textoOriginal ||= boton.textContent;
  botonLeyendo = boton;
  boton.textContent = "⏹ Stop";
  const iniciado = escuchar(texto, {
    idioma:"en-GB",
    velocidad:.72,
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

renderFichas();
renderPractica();
actualizarModo();
actualizarBloqueoPestanas();
