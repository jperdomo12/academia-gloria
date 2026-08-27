import { auth } from "../../../compartido/firebase/firebase-config.js";
import { ContextoUsuario } from "../../../compartido/js/contexto-usuario.js";
import { crearTiempoActivo } from "../../../compartido/js/tiempo-activo.js";
import { mostrarCelebracion } from "../../../compartido/js/celebracion.js";
import {
  guardarSesionAcademica,
  MODOS_SESION_ACADEMICA
} from "../../../compartido/js/sesiones-academicas.js";
import { escuchar, detener, disponible } from "../../../compartido/js/lector-texto.js";
import {
  PUENTE_META,
  BLOQUES_PUENTE,
  FICHAS_PUENTE,
  PRACTICA_PUENTE,
  PRUEBA_PUENTE
} from "./puente-5to-6to-data.js";

const $ = id => document.getElementById(id);
const rutaLogin = new URL("../../../login.html", import.meta.url).href;

const EXPLICACIONES_PRUEBA_PUENTE = Object.freeze({
  "diag-suma": "Al sumar 2847 + 1356 obtenemos 4203.",
  "diag-resta": "5000 − 1768 = 3232. Podemos comprobarlo sumando 3232 + 1768 y recuperando 5000.",
  "diag-multiplicacion": "37 × 24 puede separarse en 37 × 20 = 740 y 37 × 4 = 148. Al sumar 740 + 148 obtenemos 888.",
  "diag-division": "864 ÷ 8 = 108. La comprobación es 108 × 8 = 864.",
  "diag-jerarquia": "Primero resolvemos la multiplicación: 6 × 4 = 24. Después sumamos 18 + 24 = 42.",
  "diag-fraccion-cantidad": "Para hallar 2/3 de 15, dividimos 15 entre 3 y obtenemos 5. Después tomamos 2 partes: 5 × 2 = 10.",
  "diag-equivalentes": "1/2 y 2/4 representan la misma cantidad: dos de cuatro partes equivalen a una de dos partes.",
  "diag-suma-igual-denominador": "Como las partes tienen el mismo denominador, conservamos el 9 y sumamos 4 + 3. El resultado es 7/9.",
  "diag-relacion-porcentaje": "La mitad puede escribirse de tres formas equivalentes: 1/2, 0,5 y 50 por ciento.",
  "diag-datos-relevantes": "Queremos contar botellas. Necesitamos 5 mesas y 4 botellas por mesa; los 3 carteles no cambian esa cantidad.",
  "diag-problema-dos-pasos": "Primero 18 + 7 = 25. Después 25 − 5 = 20. Lucía termina con 20 cromos.",
  "diag-medidas": "Un metro tiene 100 centímetros. Por eso 3,4 metros × 100 = 340 centímetros.",
  "diag-perimetro": "El perímetro recorre todo el contorno: 8 + 5 + 8 + 5 = 26 centímetros.",
  "diag-area-triangulo": "El área de un triángulo es base × altura ÷ 2. Entonces 10 × 6 ÷ 2 = 30 centímetros cuadrados.",
  "diag-triangulo": "Un triángulo con dos lados iguales es isósceles. Aquí los lados de 5 cm y 5 cm son iguales."
});

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

let modo =
  contexto.esPersonaPropia && pareceSexto
    ? MODOS_SESION_ACADEMICA.APRENDIZAJE
    : MODOS_SESION_ACADEMICA.VISTA_PREVIA;

if (parametros.get("modo") === "vista_previa") {
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
  pruebaIniciada: false,
  pruebaFinalizada: false,
  pruebaIndice: 0,
  pruebaSeleccion: null,
  pruebaRespuestaConfirmada: false,
  respuestas: [],
  ordenOpcionesPrueba: new Map(),
  inicioIso: null,
  tiempo: crearTiempoActivo({ inactividadMs: 180000 }),
  guardado: null
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
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function bloquePorId(id) {
  return BLOQUES_PUENTE.find(bloque => bloque.id === id);
}

function textoOpcion(pregunta, opcionId) {
  return pregunta?.opciones?.find(opcion => opcion.id === opcionId)?.texto || "";
}

function explicacionPrueba(pregunta) {
  return EXPLICACIONES_PRUEBA_PUENTE[pregunta?.id] ||
    "Revisa qué pide la pregunta y aplica la herramienta correspondiente paso a paso.";
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
    panel.classList.toggle("activa", activo);
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
    ? `El repaso trabaja sobre ${nombreAlumno}. Solo la prueba final podrá guardar una evidencia útil.`
    : "Puedes explorar, estudiar y practicar libremente. Nada se guardará como evidencia de aprendizaje.";

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

function renderResumen() {
  $("tarjetasResumen").innerHTML = BLOQUES_PUENTE.map(bloque => `
    <article class="bloque-resumen" data-resumen-bloque="${escaparHTML(bloque.id)}">
      <div class="bloque-resumen__icono" aria-hidden="true">${escaparHTML(bloque.icono)}</div>
      <h3>${escaparHTML(bloque.titulo)}</h3>
      <p>${escaparHTML(bloque.resumen)}</p>
      <ul>${bloque.puntos.map(punto => `<li>${escaparHTML(punto)}</li>`).join("")}</ul>
      <div class="teoria-acciones">
        <button class="boton-escuchar" type="button" data-escuchar-resumen="${escaparHTML(bloque.id)}">🔊 Escuchar esta base</button>
      </div>
    </article>
  `).join("");
}

function renderTeoria() {
  $("teoriaContenido").innerHTML = BLOQUES_PUENTE.map(bloque => `
    <article class="teoria-bloque">
      <div class="teoria-bloque__cabecera">
        <div class="teoria-bloque__icono" aria-hidden="true">${escaparHTML(bloque.icono)}</div>
        <h3>${escaparHTML(bloque.titulo)}</h3>
      </div>
      <div class="teoria-bloque__cuerpo texto-escuchable">
        ${bloque.teoria.map(parrafo => `<p>${escaparHTML(parrafo)}</p>`).join("")}
        <div class="ejemplo-clave">${escaparHTML(bloque.ejemplo)}</div>
        <div class="teoria-acciones">
          <button class="boton-escuchar" type="button" data-escuchar-bloque="${escaparHTML(bloque.id)}">🔊 Escuchar este bloque</button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderFichas() {
  $("fichasContenido").innerHTML = FICHAS_PUENTE.map((ficha, indice) => `
    <article class="ficha" tabindex="0" role="button" aria-label="Girar ficha ${indice + 1}">
      <div class="ficha__interior">
        <div class="ficha__cara">
          <div class="ficha__icono" aria-hidden="true">${escaparHTML(ficha.icono)}</div>
          <h3>${escaparHTML(ficha.pregunta)}</h3>
          <button class="boton-escuchar" type="button" data-escuchar-ficha="${indice}" data-cara-ficha="pregunta">🔊 Escuchar pregunta</button>
          <p class="ficha__pista">Piensa primero · toca para comprobar</p>
        </div>
        <div class="ficha__cara ficha__cara--trasera">
          <div class="ficha__icono" aria-hidden="true">🌿</div>
          <p>${escaparHTML(ficha.respuesta)}</p>
          <button class="boton-escuchar" type="button" data-escuchar-ficha="${indice}" data-cara-ficha="respuesta">🔊 Escuchar respuesta</button>
          <p class="ficha__pista">Toca para volver</p>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".ficha").forEach(ficha => {
    const girar = () => {
      detenerLecturaActual();
      ficha.classList.toggle("girada");
    };
    ficha.addEventListener("click", girar);
    ficha.addEventListener("keydown", evento => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        girar();
      }
    });
  });

  document.querySelectorAll("[data-escuchar-ficha]").forEach(boton => {
    boton.addEventListener("click", evento => {
      evento.stopPropagation();
      const indice = Number(boton.dataset.escucharFicha);
      const ficha = FICHAS_PUENTE[indice];
      if (!ficha) return;
      const texto = boton.dataset.caraFicha === "respuesta" ? ficha.respuesta : ficha.pregunta;
      iniciarLectura(boton, textoParaVoz(texto));
    });
  });
}

function ordenarOpcionesPrueba(pregunta) {
  if (!estado.ordenOpcionesPrueba.has(pregunta.id)) {
    estado.ordenOpcionesPrueba.set(pregunta.id, barajar(pregunta.opciones));
  }
  return estado.ordenOpcionesPrueba.get(pregunta.id);
}

function htmlReto(item, opciones, prefijo) {
  return `
    <h3 class="reto-titulo">${escaparHTML(item.titulo)}</h3>
    <div class="reto-enunciado">${escaparHTML(item.enunciado)}</div>
    <p class="reto-pregunta">${escaparHTML(item.pregunta)}</p>
    <div class="teoria-acciones">
      <button id="${prefijo}Escuchar" class="boton-escuchar" type="button">🔊 Escuchar reto</button>
    </div>
    <div class="opciones" id="${prefijo}Opciones">
      ${opciones.map(opcion => `
        <button class="opcion" type="button" data-opcion="${escaparHTML(opcion.id)}">${escaparHTML(opcion.texto)}</button>
      `).join("")}
    </div>
  `;
}

function htmlEscuchaSelector(selector, etiqueta) {
  return `<div class="teoria-acciones"><button class="boton-escuchar" type="button" data-escuchar-selector="${escaparHTML(selector)}">🔊 ${escaparHTML(etiqueta)}</button></div>`;
}

function renderPractica() {
  detenerLecturaActual();
  const reto = PRACTICA_PUENTE[estado.practicaIndice];
  const porcentaje = ((estado.practicaIndice + 1) / PRACTICA_PUENTE.length) * 100;
  $("barraPractica").style.width = `${porcentaje}%`;
  $("estadoPractica").textContent = `Reto ${estado.practicaIndice + 1} de ${PRACTICA_PUENTE.length} · ${bloquePorId(reto.bloqueId)?.titulo || "Matemáticas"}`;
  $("practicaContenido").innerHTML = htmlReto(reto, barajar(reto.opciones), "practica");
  $("respuestaPractica").textContent = "";
  $("respuestaPractica").className = "respuesta-mensaje";
  $("pistaPractica").hidden = true;
  $("pistaPractica").textContent = "";
  $("botonPistaPractica").hidden = false;
  $("botonPistaPractica").textContent = "💡 Ver una pista";
  $("botonComprobarPractica").hidden = false;
  $("botonComprobarPractica").disabled = true;
  $("botonSiguientePractica").hidden = true;
  estado.practicaSeleccion = null;
  estado.practicaResuelta = false;

  document.querySelectorAll("#practicaOpciones .opcion").forEach(boton => {
    boton.addEventListener("click", () => {
      if (estado.practicaResuelta) return;
      estado.practicaSeleccion = boton.dataset.opcion;
      document.querySelectorAll("#practicaOpciones .opcion").forEach(item => item.classList.remove("seleccionada", "incorrecta"));
      boton.classList.add("seleccionada");
      $("botonComprobarPractica").disabled = false;
    });
  });

  $("practicaEscuchar")?.addEventListener("click", () => {
    iniciarLectura(
      $("practicaEscuchar"),
      textoParaVoz(`${reto.enunciado}. ${reto.pregunta}`)
    );
  });
}

$("botonPistaPractica").addEventListener("click", () => {
  const reto = PRACTICA_PUENTE[estado.practicaIndice];
  $("pistaPractica").innerHTML = `<span class="texto-pista-practica">${escaparHTML(reto.pista)}</span>${htmlEscuchaSelector("#pistaPractica .texto-pista-practica", "Escuchar pista")}`;
  $("pistaPractica").hidden = false;
  $("botonPistaPractica").textContent = "💡 Pista mostrada";
});

$("botonComprobarPractica").addEventListener("click", () => {
  const reto = PRACTICA_PUENTE[estado.practicaIndice];
  const correcta = estado.practicaSeleccion === reto.respuestaCorrecta;
  const botonElegido = document.querySelector(`#practicaOpciones [data-opcion="${estado.practicaSeleccion}"]`);

  if (correcta) {
    estado.practicaResuelta = true;
    botonElegido?.classList.add("correcta");
    $("respuestaPractica").innerHTML = `<span class="texto-respuesta-practica">✓ Muy bien. ${escaparHTML(reto.explicacion)}</span>${htmlEscuchaSelector("#respuestaPractica .texto-respuesta-practica", "Escuchar explicación")}`;
    $("respuestaPractica").className = "respuesta-mensaje bien";
    $("botonComprobarPractica").hidden = true;
    $("botonPistaPractica").hidden = true;
    $("botonSiguientePractica").hidden = false;
    $("botonSiguientePractica").textContent = estado.practicaIndice === PRACTICA_PUENTE.length - 1
      ? "Ir a la prueba →"
      : "Siguiente reto →";
  } else {
    botonElegido?.classList.add("incorrecta");
    $("respuestaPractica").innerHTML = `<span class="texto-respuesta-practica">Todavía no. Revisa la relación y vuelve a intentarlo; puedes usar la pista si la necesitas.</span>${htmlEscuchaSelector("#respuestaPractica .texto-respuesta-practica", "Escuchar indicación")}`;
    $("respuestaPractica").className = "respuesta-mensaje revisar";
  }
});

$("botonSiguientePractica").addEventListener("click", () => {
  if (estado.practicaIndice < PRACTICA_PUENTE.length - 1) {
    estado.practicaIndice += 1;
    renderPractica();
    return;
  }
  activarPestana("prueba");
});

function iniciarPrueba() {
  detenerLecturaActual();
  estado.pruebaIniciada = true;
  estado.pruebaFinalizada = false;
  estado.pruebaIndice = 0;
  estado.pruebaSeleccion = null;
  estado.pruebaRespuestaConfirmada = false;
  estado.respuestas = [];
  estado.ordenOpcionesPrueba.clear();
  estado.inicioIso = new Date().toISOString();
  estado.tiempo.reiniciar("prueba");
  actualizarModo();
  actualizarBloqueoPestanas();
  $("inicioPrueba").hidden = true;
  $("cierrePrueba").hidden = true;
  $("pruebaActiva").hidden = false;
  renderPreguntaPrueba();
}

function renderPreguntaPrueba() {
  detenerLecturaActual();
  const pregunta = PRUEBA_PUENTE[estado.pruebaIndice];
  const porcentaje = ((estado.pruebaIndice + 1) / PRUEBA_PUENTE.length) * 100;
  $("barraPrueba").style.width = `${porcentaje}%`;
  $("estadoPrueba").textContent = `Pregunta ${estado.pruebaIndice + 1} de ${PRUEBA_PUENTE.length}`;
  $("bloquePrueba").textContent = bloquePorId(pregunta.bloqueId)?.titulo || "Matemáticas";
  $("pruebaContenido").innerHTML = `${htmlReto(pregunta, ordenarOpcionesPrueba(pregunta), "prueba")}
    <div id="explicacionPrueba" class="pista-caja" role="status" hidden></div>`;
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
    iniciarLectura(
      $("pruebaEscuchar"),
      textoParaVoz(`${pregunta.enunciado}. ${pregunta.pregunta}`)
    );
  });
}

function mostrarExplicacionPrueba(pregunta, correcta) {
  const seleccion = estado.pruebaSeleccion;
  const respuestaElegida = textoOpcion(pregunta, seleccion);
  const respuestaCorrecta = textoOpcion(pregunta, pregunta.respuestaCorrecta);
  const explicacion = explicacionPrueba(pregunta);
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
    <div class="texto-explicacion-prueba">
      <strong>${correcta ? "✓ Buena elección." : "🌿 Vamos a revisarla."}</strong>
      <div style="margin-top:8px"><b>Tu respuesta:</b> ${escaparHTML(respuestaElegida)}</div>
      ${correcta ? "" : `<div style="margin-top:4px"><b>Respuesta correcta:</b> ${escaparHTML(respuestaCorrecta)}</div>`}
      <div style="margin-top:8px;line-height:1.55"><b>Por qué:</b> ${escaparHTML(explicacion)}</div>
    </div>
    ${htmlEscuchaSelector("#explicacionPrueba .texto-explicacion-prueba", "Escuchar explicación")}
  `;
}

$("botonIniciarPrueba").addEventListener("click", iniciarPrueba);

$("botonResponderPrueba").addEventListener("click", async () => {
  const pregunta = PRUEBA_PUENTE[estado.pruebaIndice];

  if (!estado.pruebaRespuestaConfirmada) {
    if (!estado.pruebaSeleccion) return;

    const correcta = estado.pruebaSeleccion === pregunta.respuestaCorrecta;
    const explicacion = explicacionPrueba(pregunta);

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
    $("botonResponderPrueba").textContent = estado.pruebaIndice < PRUEBA_PUENTE.length - 1
      ? "Siguiente pregunta →"
      : "Ver resultado →";
    return;
  }

  if (estado.pruebaIndice < PRUEBA_PUENTE.length - 1) {
    estado.pruebaIndice += 1;
    renderPreguntaPrueba();
    return;
  }

  await finalizarPrueba();
});

function construirMapaResultados() {
  return BLOQUES_PUENTE.map(bloque => {
    const respuestas = estado.respuestas.filter(item => item.bloqueId === bloque.id);
    const correctas = respuestas.filter(item => item.correcta).length;
    const proporcion = respuestas.length ? correctas / respuestas.length : 0;
    let estadoId = "reforzar";
    let tituloEstado = "Conviene reforzar";
    let textoEstado = "Este bloque merece volver a verse con apoyo y práctica antes de aumentar la dificultad.";

    if (proporcion >= 0.8) {
      estadoId = "solido";
      tituloEstado = "Base sólida hoy";
      textoEstado = "Las respuestas de hoy muestran una base preparada para seguir construyendo.";
    } else if (proporcion >= 0.55) {
      estadoId = "camino";
      tituloEstado = "En camino";
      textoEstado = "La idea principal está presente y conviene consolidarla con algunas variantes más.";
    }

    return {
      bloqueId: bloque.id,
      titulo: bloque.titulo,
      icono: bloque.icono,
      correctas,
      total: respuestas.length,
      estado: estadoId,
      tituloEstado,
      textoEstado
    };
  });
}

function renderMapaResultados(mapa) {
  $("mapaResultados").innerHTML = mapa.map(item => `
    <article class="resultado-bloque estado-${escaparHTML(item.estado)}">
      <div class="resultado-bloque__cabecera">
        <div class="resultado-bloque__icono" aria-hidden="true">${escaparHTML(item.icono)}</div>
        <div>
          <h3>${escaparHTML(item.titulo)} · ${escaparHTML(item.tituloEstado)}</h3>
          <p>${escaparHTML(item.textoEstado)}</p>
        </div>
      </div>
    </article>
  `).join("");
}

function renderResultadoNumerico(totalCorrectas, totalPreguntas) {
  $("resultadoPuenteResumen")?.remove();
  $("revisionPuente")?.remove();

  const porcentaje = totalPreguntas ? Math.round((totalCorrectas / totalPreguntas) * 100) : 0;
  const resumen = document.createElement("section");
  resumen.id = "resultadoPuenteResumen";
  resumen.className = "regla-clave";
  resumen.style.marginTop = "22px";
  resumen.style.textAlign = "left";
  resumen.innerHTML = `
    <div class="regla-clave__icono" aria-hidden="true">📊</div>
    <div style="flex:1">
      <div id="resultadoPuenteTexto">
        <strong>Resultado de la prueba</strong>
        <div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:12px;margin-top:6px">
          <span style="font-size:2rem;font-weight:950;color:#526039">${totalCorrectas} de ${totalPreguntas}</span>
          <span style="font-size:1.35rem;font-weight:900;color:#66538f">${porcentaje} %</span>
        </div>
        <p style="margin-top:6px">Es el resultado de este punto de partida de hoy, no una calificación escolar. El mapa ayuda a elegir qué reforzar antes de aumentar la dificultad.</p>
      </div>
      ${htmlEscuchaSelector("#resultadoPuenteTexto", "Escuchar resultado")}
    </div>`;

  const revision = document.createElement("details");
  revision.id = "revisionPuente";
  revision.style.marginTop = "20px";
  revision.style.textAlign = "left";
  revision.innerHTML = `
    <summary style="cursor:pointer;font-weight:900;color:#526039;padding:12px 4px">🧾 Revisar mis ${totalPreguntas} respuestas</summary>
    <div style="display:grid;gap:10px;margin-top:10px">
      ${estado.respuestas.map((respuesta, indice) => `
        <article class="resultado-bloque estado-${respuesta.correcta ? "solido" : "reforzar"}">
          <div class="resultado-bloque__cabecera">
            <div class="resultado-bloque__icono" aria-hidden="true">${respuesta.correcta ? "✓" : "🌿"}</div>
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

  const solidos = mapa.filter(item => item.estado === "solido");
  const enCamino = mapa.filter(item => item.estado === "camino");
  const reforzar = mapa.filter(item => item.estado === "reforzar");

  if (reforzar.length) {
    $("textoCierrePrueba").textContent = `${nombreAlumno}, ya tenemos una fotografía útil: hay bases que están contigo y otras que conviene reforzar antes de aumentar la dificultad.`;
  } else if (enCamino.length) {
    $("textoCierrePrueba").textContent = `${nombreAlumno}, las bases principales están presentes. Algunas necesitan un poco más de práctica para quedar firmes antes de seguir avanzando.`;
  } else {
    $("textoCierrePrueba").textContent = `${nombreAlumno}, la fotografía de hoy muestra una base bastante preparada. Seguiremos comprobándola con situaciones nuevas mientras avanza 6.º.`;
  }

  $("estadoGuardado").textContent = modo === MODOS_SESION_ACADEMICA.APRENDIZAJE
    ? "Guardando tu punto de partida…"
    : "Vista previa: este resultado no se guardará como aprendizaje.";

  const tiempo = estado.tiempo.obtenerResultado();

  try {
    estado.guardado = await guardarSesionAcademica({
      modo,
      actividadId: PUENTE_META.actividadId,
      tituloActividad: PUENTE_META.tituloActividad,
      versionActividad: PUENTE_META.version,
      cursoReferencia: PUENTE_META.cursoReferencia,
      materia: PUENTE_META.materia,
      tema: PUENTE_META.tema,
      origen: "curso",
      inicioCliente: estado.inicioIso,
      finCliente: new Date().toISOString(),
      ...tiempo,
      conceptosTrabajados: PRUEBA_PUENTE.map(item => item.conceptoId),
      variantes: PRUEBA_PUENTE.map(item => ({
        varianteId: item.id,
        bloqueId: item.bloqueId,
        conceptoId: item.conceptoId
      })),
      respuestas: estado.respuestas,
      resumen: {
        diagnosticoTransicion: true,
        totalPreguntas: estado.respuestas.length,
        totalCorrectas,
        porcentaje: estado.respuestas.length ? Math.round((totalCorrectas / estado.respuestas.length) * 100) : 0,
        porBloque: mapa.map(item => ({
          bloqueId: item.bloqueId,
          correctas: item.correctas,
          total: item.total,
          estado: item.estado
        }))
      },
      retroalimentacion: {
        bloquesSolidos: solidos.map(item => item.bloqueId),
        bloquesEnCamino: enCamino.map(item => item.bloqueId),
        bloquesAReforzar: reforzar.map(item => item.bloqueId),
        mensajeVisible: "Resultado y fotografía de punto de partida; no son una etiqueta ni una calificación escolar."
      }
    });

    $("estadoGuardado").textContent = estado.guardado?.guardado
      ? "✓ Punto de partida guardado en tu historial de aprendizaje."
      : "Vista previa: el resultado no se guardó como aprendizaje.";
  } catch (error) {
    console.error("No se pudo guardar el punto de partida.", error);
    $("estadoGuardado").textContent = "No se pudo guardar el punto de partida. Puedes volver a intentarlo más tarde.";
  }

  if (typeof mostrarCelebracion === "function") {
    mostrarCelebracion({
      titulo: "¡Puente recorrido!",
      mensaje: "Ya tenemos una fotografía útil para elegir el siguiente paso."
    });
  }

  if (modo === MODOS_SESION_ACADEMICA.APRENDIZAJE) {
    $("botonRepetirPrueba").textContent = "📖 Volver a repasar";
  } else {
    $("botonRepetirPrueba").textContent = "🔄 Hacer otra prueba";
  }
}

$("botonRepetirPrueba").addEventListener("click", () => {
  estado.pruebaRespuestaConfirmada = false;

  if (modo === MODOS_SESION_ACADEMICA.APRENDIZAJE) {
    estado.pruebaIniciada = false;
    estado.pruebaFinalizada = false;
    actualizarModo();
    actualizarBloqueoPestanas();
    activarPestana("resumen");
    return;
  }

  estado.pruebaIniciada = false;
  estado.pruebaFinalizada = false;
  actualizarModo();
  actualizarBloqueoPestanas();
  $("inicioPrueba").hidden = false;
  $("cierrePrueba").hidden = true;
  $("pruebaActiva").hidden = true;
});

let botonLeyendo = null;

function textoParaVoz(texto = "") {
  return String(texto)
    .replace(/cm²/gi, " centímetros cuadrados ")
    .replace(/m²/gi, " metros cuadrados ")
    .replace(/(\d+)²/g, "$1 al cuadrado")
    .replace(/(\d+)³/g, "$1 al cubo")
    .replace(/(\d+)\s*\/\s*(\d+)/g, "$1 sobre $2")
    .replaceAll("×", " por ")
    .replaceAll("÷", " dividido entre ")
    .replaceAll("−", " menos ")
    .replaceAll("+", " más ")
    .replaceAll("=", " es igual a ")
    .replaceAll("%", " por ciento ");
}

function detenerLecturaActual() {
  detener();
  if (botonLeyendo) {
    botonLeyendo.textContent = botonLeyendo.dataset.textoOriginal || "🔊 Escuchar";
    botonLeyendo = null;
  }
}

function textoLimpioElemento(elemento) {
  const copia = elemento.cloneNode(true);
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
    idioma: "es-ES",
    velocidad: .84,
    tono: 1,
    alFinalizar: detenerLecturaActual,
    alError: detenerLecturaActual
  });

  if (!iniciado) detenerLecturaActual();
}

function prepararEscuchasVisualesTeoria() {
  document.querySelectorAll("#panel-teoria > .rejilla-bloques .mapa-visual").forEach((tarjeta, indice) => {
    if (tarjeta.querySelector("[data-escuchar-visual]")) return;
    const acciones = document.createElement("div");
    acciones.className = "teoria-acciones";
    acciones.innerHTML = `<button class="boton-escuchar" type="button" data-escuchar-visual="${indice}">🔊 Escuchar mapa</button>`;
    tarjeta.append(acciones);
  });
}

function prepararEscuchaIntroduccion() {
  const entrada = document.querySelector(".tema-hero__principal .tema-entrada");
  if (!entrada || document.querySelector("[data-escuchar-introduccion]")) return;
  const acciones = document.createElement("div");
  acciones.className = "teoria-acciones";
  acciones.style.justifyContent = "flex-start";
  acciones.innerHTML = `<button class="boton-escuchar" type="button" data-escuchar-introduccion>🔊 Escuchar introducción</button>`;
  entrada.after(acciones);
}

document.addEventListener("click", evento => {
  const botonSelector = evento.target.closest("[data-escuchar-selector]");
  if (botonSelector) {
    const elemento = document.querySelector(botonSelector.dataset.escucharSelector);
    if (elemento) iniciarLectura(botonSelector, textoLimpioElemento(elemento));
    return;
  }

  const botonIntroduccion = evento.target.closest("[data-escuchar-introduccion]");
  if (botonIntroduccion) {
    const entrada = document.querySelector(".tema-hero__principal .tema-entrada");
    if (entrada) iniciarLectura(botonIntroduccion, textoLimpioElemento(entrada));
    return;
  }

  const botonResumen = evento.target.closest("[data-escuchar-resumen]");
  if (botonResumen) {
    const tarjeta = botonResumen.closest("[data-resumen-bloque]");
    if (tarjeta) iniciarLectura(botonResumen, textoLimpioElemento(tarjeta));
    return;
  }

  const botonVisual = evento.target.closest("[data-escuchar-visual]");
  if (botonVisual) {
    const tarjeta = botonVisual.closest(".mapa-visual");
    if (tarjeta) iniciarLectura(botonVisual, textoLimpioElemento(tarjeta));
    return;
  }

  const botonBloque = evento.target.closest("[data-escuchar-bloque]");
  if (botonBloque) {
    const bloque = botonBloque.closest(".teoria-bloque")?.querySelector(".texto-escuchable");
    if (bloque) iniciarLectura(botonBloque, textoLimpioElemento(bloque));
  }
});

window.addEventListener("beforeunload", detenerLecturaActual, { once:true });

const textoInicioPrueba = document.querySelector("#inicioPrueba > p:not(.tema-sobrelinea)");
if (textoInicioPrueba) {
  textoInicioPrueba.textContent = "Son preguntas nuevas de las cuatro bases de 5.º. No incluimos todavía el contenido nuevo de 6.º y no hay pistas durante la prueba. Después de cada respuesta verás una explicación breve; al final verás tu resultado total y un mapa para elegir el siguiente paso.";
}

renderResumen();
renderTeoria();
renderFichas();
renderPractica();
prepararEscuchasVisualesTeoria();
prepararEscuchaIntroduccion();
actualizarModo();
actualizarBloqueoPestanas();
