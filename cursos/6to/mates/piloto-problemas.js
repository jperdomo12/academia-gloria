/* ==========================================================
   Academia Gloria Valentina
   Piloto 6.º SIGNATURE · Entender antes de calcular

   Este archivo valida, de forma deliberadamente acotada:
   - experiencia progresiva por etapas;
   - Vista previa vs Sesión de aprendizaje;
   - variantes para reducir memorización de respuestas;
   - práctica -> comprobación -> transferencia;
   - registro de intentos y pistas;
   - feedback sin convertir una respuesta correcta en "dominio".
   ========================================================== */

import { ContextoUsuario } from "../../../compartido/js/contexto-usuario.js";
import { SesionesAcademicas } from "../../../compartido/api/sesiones-academicas.js";

const TEMA = Object.freeze({
  curso: "6.º de Primaria",
  materia: "Matemáticas",
  temaId: "mates-problemas-entender-antes-calcular",
  temaTitulo: "Entender antes de calcular",
  actividadId: "piloto-signature-v1"
});

const VARIANTES = Object.freeze({
  practicaA: [
    {
      id: "reparto-libros",
      familiaId: "division-como-reparto",
      conceptoId: "identificar-relacion-division",
      problema: "Una biblioteca tiene 360 libros y quiere colocarlos por igual en 6 estanterías. ¿Cuántos libros habrá en cada estantería?",
      pregunta: "Antes de calcular, ¿qué relación describe mejor el problema?",
      opciones: [
        ["sumar", "Sumar 360 + 6"],
        ["division", "Repartir 360 en 6 grupos iguales"],
        ["multiplicacion", "Multiplicar 360 × 6"],
        ["resta", "Restar 6 a 360 una sola vez"]
      ],
      correcta: "division",
      pistas: [
        "Fíjate en las palabras «por igual». ¿La cantidad aumenta o se reparte?",
        "Formar 6 grupos iguales a partir de 360 corresponde a una división."
      ]
    },
    {
      id: "reparto-cromos",
      familiaId: "division-como-reparto",
      conceptoId: "identificar-relacion-division",
      problema: "Hay 144 cromos para repartir por igual entre 8 niños. ¿Cuántos cromos recibe cada niño?",
      pregunta: "¿Qué está ocurriendo con las cantidades?",
      opciones: [
        ["multiplicacion", "Repetimos 144 ocho veces"],
        ["division", "Formamos 8 grupos iguales con 144 cromos"],
        ["resta", "Quitamos 8 cromos una vez"],
        ["suma", "Juntamos 144 y 8"]
      ],
      correcta: "division",
      pistas: [
        "La expresión «por igual» es importante. Piensa en grupos.",
        "Sabemos el total y cuántos grupos queremos formar."
      ]
    },
    {
      id: "reparto-botellas",
      familiaId: "division-como-reparto",
      conceptoId: "identificar-relacion-division",
      problema: "Un almacén coloca 96 botellas por igual en 12 cajas. ¿Cuántas botellas van en cada caja?",
      pregunta: "¿Qué relación matemática representa la situación?",
      opciones: [
        ["division", "Repartir 96 entre 12 grupos iguales"],
        ["suma", "Sumar 96 + 12"],
        ["multiplicacion", "Hacer 12 grupos de 96"],
        ["resta", "Restar 12 una vez"]
      ],
      correcta: "division",
      pistas: [
        "Imagina las 12 cajas vacías y reparte las botellas de forma equilibrada.",
        "Cuando conoces el total y el número de grupos iguales, piensa en dividir."
      ]
    },
    {
      id: "reparto-mesas",
      familiaId: "division-como-reparto",
      conceptoId: "identificar-relacion-division",
      problema: "En el comedor hay 168 vasos. Cada mesa debe recibir 6 vasos. ¿Para cuántas mesas alcanzan?",
      pregunta: "¿Qué necesitas averiguar antes de operar?",
      opciones: [
        ["division", "Cuántos grupos de 6 caben en 168"],
        ["multiplicacion", "Cuántas veces puedo repetir 168"],
        ["suma", "El total de 168 + 6"],
        ["resta", "Lo que queda al quitar 6 una vez"]
      ],
      correcta: "division",
      pistas: [
        "Cada mesa forma un grupo de 6 vasos.",
        "La pregunta es cuántos grupos de 6 podemos formar con 168."
      ]
    }
  ],

  practicaB: [
    {
      id: "vueltas-carrera",
      familiaId: "multiplicacion-repeticion",
      conceptoId: "identificar-relacion-multiplicacion",
      problema: "En una carrera solidaria cada vuelta mide 250 metros. Marta completa 8 vueltas. ¿Qué distancia recorre en total?",
      pregunta: "¿Qué operación representa mejor la situación?",
      opciones: [
        ["multiplicacion", "250 × 8"],
        ["division", "250 ÷ 8"],
        ["resta", "250 - 8"],
        ["suma", "250 + 8"]
      ],
      correcta: "multiplicacion"
    },
    {
      id: "entradas-cine",
      familiaId: "multiplicacion-repeticion",
      conceptoId: "identificar-relacion-multiplicacion",
      problema: "Una entrada de cine cuesta 9 €. Un grupo compra 7 entradas iguales. ¿Cuánto pagan en total?",
      pregunta: "¿Qué operación recoge mejor la relación?",
      opciones: [
        ["suma", "9 + 7"],
        ["division", "9 ÷ 7"],
        ["multiplicacion", "9 × 7"],
        ["resta", "9 - 7"]
      ],
      correcta: "multiplicacion"
    },
    {
      id: "botellas-agua",
      familiaId: "multiplicacion-repeticion",
      conceptoId: "identificar-relacion-multiplicacion",
      problema: "Para una actividad preparan 6 cajas con 24 botellas de agua en cada caja. ¿Cuántas botellas hay en total?",
      pregunta: "¿Qué relación debes usar?",
      opciones: [
        ["division", "24 ÷ 6"],
        ["multiplicacion", "24 × 6"],
        ["resta", "24 - 6"],
        ["suma", "24 + 6"]
      ],
      correcta: "multiplicacion"
    },
    {
      id: "filas-sillas",
      familiaId: "multiplicacion-repeticion",
      conceptoId: "identificar-relacion-multiplicacion",
      problema: "En el salón colocan 12 filas con 18 sillas en cada fila. ¿Cuántas sillas colocan?",
      pregunta: "¿Qué operación muestra la repetición de grupos iguales?",
      opciones: [
        ["multiplicacion", "18 × 12"],
        ["division", "18 ÷ 12"],
        ["resta", "18 - 12"],
        ["suma", "18 + 12"]
      ],
      correcta: "multiplicacion"
    }
  ],

  comprobar: [
    {
      id: "museo-cambio",
      familiaId: "problema-dos-pasos",
      conceptoId: "planificar-dos-operaciones",
      problema: "Un museo vende entradas a 12 €. Una familia compra 5 entradas y paga con 70 €. ¿Cuánto dinero le devuelven?",
      pregunta: "¿Qué plan de dos pasos es correcto?",
      opciones: [
        ["a", "70 ÷ 5 y después sumar 12"],
        ["b", "12 × 5 para saber el coste; después 70 - coste"],
        ["c", "70 - 12 y después multiplicar por 5"]
      ],
      correcta: "b"
    },
    {
      id: "merienda-cambio",
      familiaId: "problema-dos-pasos",
      conceptoId: "planificar-dos-operaciones",
      problema: "Para una merienda compran 4 zumos a 3 € cada uno. Pagan con 20 €. ¿Cuánto dinero sobra?",
      pregunta: "¿Qué plan permite resolver el problema sin saltarse pasos?",
      opciones: [
        ["a", "3 × 4 para saber el coste; después 20 - coste"],
        ["b", "20 ÷ 4 y después sumar 3"],
        ["c", "20 - 3 y después multiplicar por 4"]
      ],
      correcta: "a"
    },
    {
      id: "cuadernos-cambio",
      familiaId: "problema-dos-pasos",
      conceptoId: "planificar-dos-operaciones",
      problema: "Cada cuaderno cuesta 6 €. Daniel compra 3 y entrega 25 €. ¿Cuánto cambio recibe?",
      pregunta: "Elige el plan que respeta lo que ocurre en la situación.",
      opciones: [
        ["a", "25 - 6 y después multiplicar por 3"],
        ["b", "6 × 3 para calcular el coste; después 25 - coste"],
        ["c", "25 ÷ 3 y después restar 6"]
      ],
      correcta: "b"
    }
  ],

  transferir: [
    {
      id: "viaje-tramos",
      familiaId: "transferencia-relacion-operacion",
      conceptoId: "transferir-estrategia-problemas",
      problema: "Un viaje tiene 420 km. La familia quiere dividirlo en 6 tramos iguales. ¿Cuántos kilómetros tendrá cada tramo?",
      pregunta: "Sin copiar un ejemplo anterior: ¿qué operación representa la situación?",
      opciones: [
        ["suma", "420 + 6"],
        ["multiplicacion", "420 × 6"],
        ["division", "420 ÷ 6"],
        ["resta", "420 - 6"]
      ],
      correcta: "division",
      respuestaNumerica: 70,
      unidad: "km"
    },
    {
      id: "equipos-alumnos",
      familiaId: "transferencia-relacion-operacion",
      conceptoId: "transferir-estrategia-problemas",
      problema: "En una actividad participan 156 alumnos. Se forman equipos de 12 alumnos. ¿Cuántos equipos completos se pueden formar?",
      pregunta: "¿Qué operación te permite saber cuántos grupos de 12 caben en 156?",
      opciones: [
        ["division", "156 ÷ 12"],
        ["suma", "156 + 12"],
        ["multiplicacion", "156 × 12"],
        ["resta", "156 - 12"]
      ],
      correcta: "division",
      respuestaNumerica: 13,
      unidad: "equipos"
    },
    {
      id: "cajas-lapices",
      familiaId: "transferencia-relacion-operacion",
      conceptoId: "transferir-estrategia-problemas",
      problema: "El colegio recibe 15 cajas con 32 lápices en cada una. ¿Cuántos lápices recibe en total?",
      pregunta: "¿Qué operación representa mejor los 15 grupos iguales?",
      opciones: [
        ["resta", "32 - 15"],
        ["division", "32 ÷ 15"],
        ["multiplicacion", "32 × 15"],
        ["suma", "32 + 15"]
      ],
      correcta: "multiplicacion",
      respuestaNumerica: 480,
      unidad: "lápices"
    }
  ]
});

const estado = {
  contexto: null,
  modo: "vista_previa",
  puedeRegistrar: false,
  iniciadaEn: null,
  etapa: 0,
  variantes: {},
  preguntas: new Map(),
  guardado: null
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function barajar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function elegirVariante(familia, clave) {
  const almacenamiento = `academia.piloto6.ultima.${clave}`;
  let ultima = "";
  try {
    ultima = sessionStorage.getItem(almacenamiento) || "";
  } catch {
    // El piloto funciona aunque sessionStorage no esté disponible.
  }

  const candidatas = familia.filter(item => item.id !== ultima);
  const bolsa = candidatas.length ? candidatas : familia;
  const elegida = bolsa[Math.floor(Math.random() * bolsa.length)];

  try {
    sessionStorage.setItem(almacenamiento, elegida.id);
  } catch {
    // Sin persistencia local simplemente se mantiene la aleatoriedad de carga.
  }

  return elegida;
}

function prepararVariantes() {
  estado.variantes = {
    practicaA: elegirVariante(VARIANTES.practicaA, "practicaA"),
    practicaB: elegirVariante(VARIANTES.practicaB, "practicaB"),
    comprobar: elegirVariante(VARIANTES.comprobar, "comprobar"),
    transferir: elegirVariante(VARIANTES.transferir, "transferir")
  };
}

function crearEstadoPregunta(clave, variante, fase) {
  const actual = {
    clave,
    variante,
    fase,
    iniciadaEn: Date.now(),
    intentos: 0,
    pistas: new Set(),
    correcta: false,
    respuesta: "",
    operacionCorrecta: false,
    intentosOperacion: 0,
    intentosResultado: 0
  };

  estado.preguntas.set(clave, actual);
  return actual;
}

function estadoPregunta(clave, variante, fase) {
  return estado.preguntas.get(clave) || crearEstadoPregunta(clave, variante, fase);
}

function renderIconos() {
  if (window.lucide?.createIcons) window.lucide.createIcons();
}

function nombrePersona() {
  return String(
    estado.contexto?.personaActiva?.nombreVisible ||
    estado.contexto?.personaActiva?.nombre ||
    ""
  ).trim();
}

function actualizarModoUI() {
  const aprendizaje = estado.modo === "aprendizaje";
  const btnAprender = $("#mode-learning");
  const btnPreview = $("#mode-preview");
  const status = $("#mode-status");

  btnAprender?.classList.toggle("selected", aprendizaje);
  btnPreview?.classList.toggle("selected", !aprendizaje);

  if (status) {
    const persona = nombrePersona();
    status.innerHTML = aprendizaje
      ? `<strong>Sesión de aprendizaje.</strong> ${persona ? `El progreso de ${persona}` : "El progreso"} se guardará al terminar.`
      : `<strong>Vista previa.</strong> Puedes explorar, equivocarte y repetir. Nada de esta sesión se guardará como progreso.`;
  }
}

function seleccionarModo(modo) {
  if (estado.iniciadaEn) return;
  if (modo === "aprendizaje" && !estado.puedeRegistrar) return;
  estado.modo = modo;
  actualizarModoUI();
}

async function inicializarContexto() {
  const btnAprender = $("#mode-learning");
  const btnPreview = $("#mode-preview");
  const notaAprender = $("#mode-learning-note");

  try {
    const contexto = await ContextoUsuario.inicializar();
    estado.contexto = contexto;

    const esAdmin = await ContextoUsuario.esAdministrador();
    estado.puedeRegistrar = Boolean(contexto.esPersonaPropia || esAdmin);

    const tieneContextoAcademico = Boolean(
      String(contexto.personaActiva?.curso || "").trim()
    );

    estado.modo =
      contexto.esPersonaPropia && tieneContextoAcademico
        ? "aprendizaje"
        : "vista_previa";

    if (btnAprender) btnAprender.disabled = !estado.puedeRegistrar;

    if (notaAprender && !estado.puedeRegistrar) {
      notaAprender.textContent =
        "Para proteger el historial del alumno, esta cuenta relacionada explora en Vista previa.";
    }

    const persona = nombrePersona();
    const heroPersona = $("#hero-persona");
    const welcomeTitle = $("#welcome-title");

    if (heroPersona && persona) {
      heroPersona.textContent = estado.modo === "aprendizaje"
        ? `Preparado para ${persona}`
        : `Explorando la experiencia de ${persona}`;
    }

    if (welcomeTitle) {
      welcomeTitle.textContent = persona
        ? `${persona}, hoy vamos a descubrir una estrategia que podrás reutilizar.`
        : "Hoy vamos a descubrir una estrategia que podrás reutilizar.";
    }
  } catch (error) {
    console.warn("[Piloto 6.º] Contexto no disponible; se utiliza Vista previa.", error);
    estado.contexto = null;
    estado.puedeRegistrar = false;
    estado.modo = "vista_previa";
    if (btnAprender) btnAprender.disabled = true;
    if (notaAprender) {
      notaAprender.textContent =
        "Inicia sesión como alumno para registrar una Sesión de aprendizaje.";
    }
  }

  btnAprender?.addEventListener("click", () => seleccionarModo("aprendizaje"));
  btnPreview?.addEventListener("click", () => seleccionarModo("vista_previa"));
  actualizarModoUI();
}

function mostrarEtapa(numero) {
  estado.etapa = numero;

  $$("[data-stage]").forEach(panel => {
    const activa = Number(panel.dataset.stage) === numero;
    panel.hidden = !activa;
    panel.classList.toggle("active", activa);
  });

  $$("[data-route-stage]").forEach(item => {
    const etapa = Number(item.dataset.routeStage);
    item.classList.toggle("current", etapa === numero);
    item.classList.toggle("done", etapa < numero);
  });

  const progreso = $("#route-progress-fill");
  if (progreso) {
    const max = 5;
    progreso.style.width = `${Math.max(0, Math.min(100, (numero / max) * 100))}%`;
  }

  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth"
  });

  if (numero === 5) {
    prepararCierre();
  }
}

function bloquearModo() {
  const btnAprender = $("#mode-learning");
  const btnPreview = $("#mode-preview");
  if (btnAprender) btnAprender.disabled = true;
  if (btnPreview) btnPreview.disabled = true;
  $("#mode-card")?.classList.add("locked");
}

function comenzar() {
  if (estado.iniciadaEn) return;
  estado.iniciadaEn = new Date();
  bloquearModo();
  mostrarEtapa(1);
}

function feedback(elemento, tipo, html) {
  if (!elemento) return;
  elemento.className = `feedback show ${tipo}`;
  elemento.innerHTML = html;
}

function registrarRespuestaSimple(pregunta, respuesta) {
  pregunta.correcta = true;
  pregunta.respuesta = String(respuesta);
}

function respuestaPersistible(pregunta) {
  const tiempoSegundos = Math.max(
    1,
    Math.round((Date.now() - pregunta.iniciadaEn) / 1000)
  );

  const esTransferencia = pregunta.clave === "transferir";
  const correctaPrimerIntento = esTransferencia
    ? pregunta.correcta &&
      pregunta.intentosOperacion === 1 &&
      pregunta.intentosResultado === 1
    : pregunta.correcta && pregunta.intentos === 1;

  return {
    preguntaId: pregunta.clave,
    familiaId: pregunta.variante.familiaId,
    conceptoId: pregunta.variante.conceptoId,
    varianteId: pregunta.variante.id,
    fase: pregunta.fase,
    formato: esTransferencia ? "seleccion_y_respuesta" : "seleccion",
    respuesta: pregunta.respuesta,
    correcta: pregunta.correcta,
    intentos: pregunta.intentos,
    pistasUsadas: pregunta.pistas.size,
    correctaPrimerIntento,
    resolucionAutonoma:
      correctaPrimerIntento && pregunta.pistas.size === 0,
    tiempoSegundos
  };
}

function renderPreguntaSeleccion({
  clave,
  variante,
  fase,
  problemSelector,
  questionSelector,
  optionsSelector,
  feedbackSelector,
  onCorrect,
  mensajeCorrecto,
  mensajeIncorrecto
}) {
  const pregunta = estadoPregunta(clave, variante, fase);
  const problema = $(problemSelector);
  const enunciado = $(questionSelector);
  const opciones = $(optionsSelector);
  const cajaFeedback = $(feedbackSelector);

  if (problema) problema.textContent = variante.problema;
  if (enunciado) enunciado.textContent = variante.pregunta;
  if (!opciones) return;

  opciones.innerHTML = "";

  barajar(variante.opciones).forEach(([valor, etiqueta]) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "choice";
    boton.dataset.value = valor;
    boton.textContent = etiqueta;

    boton.addEventListener("click", () => {
      if (pregunta.correcta) return;

      pregunta.intentos += 1;
      pregunta.respuesta = valor;
      const correcto = valor === variante.correcta;

      opciones.querySelectorAll(".choice").forEach(item => {
        item.classList.remove("ok", "bad");
      });

      boton.classList.add(correcto ? "ok" : "bad");

      if (correcto) {
        registrarRespuestaSimple(pregunta, valor);
        feedback(
          cajaFeedback,
          "positive",
          mensajeCorrecto ||
            "<strong>Bien razonado.</strong> Identificaste la relación antes de operar."
        );
        opciones.querySelectorAll(".choice").forEach(item => {
          item.disabled = true;
        });
        onCorrect?.(pregunta);
      } else {
        feedback(
          cajaFeedback,
          "gentle",
          mensajeIncorrecto ||
            "<strong>Buena oportunidad para revisar.</strong> Vuelve a la pregunta y piensa qué ocurre con las cantidades."
        );
      }
    });

    opciones.appendChild(boton);
  });
}

function renderPracticaA() {
  const variante = estado.variantes.practicaA;
  const pregunta = estadoPregunta("practica-a", variante, "practicar");

  renderPreguntaSeleccion({
    clave: "practica-a",
    variante,
    fase: "practicar",
    problemSelector: "#practice-a-problem",
    questionSelector: "#practice-a-question",
    optionsSelector: "#practice-a-options",
    feedbackSelector: "#practice-a-feedback",
    onCorrect: revisarPracticaCompleta
  });

  $$("[data-hint]").forEach(boton => {
    boton.addEventListener("click", () => {
      if (pregunta.correcta) return;
      const indice = Number(boton.dataset.hint) - 1;
      const objetivo = $(`#practice-hint-${indice + 1}`);
      if (!objetivo || !variante.pistas[indice]) return;

      pregunta.pistas.add(indice + 1);
      objetivo.textContent = variante.pistas[indice];
      objetivo.hidden = false;
      boton.setAttribute("aria-expanded", "true");
    });
  });
}

function renderPracticaB() {
  renderPreguntaSeleccion({
    clave: "practica-b",
    variante: estado.variantes.practicaB,
    fase: "practicar",
    problemSelector: "#practice-b-problem",
    questionSelector: "#practice-b-question",
    optionsSelector: "#practice-b-options",
    feedbackSelector: "#practice-b-feedback",
    onCorrect: revisarPracticaCompleta,
    mensajeCorrecto:
      "<strong>Muy bien.</strong> Esta vez identificaste la relación con menos apoyo."
  });
}

function revisarPracticaCompleta() {
  const completa =
    estado.preguntas.get("practica-a")?.correcta &&
    estado.preguntas.get("practica-b")?.correcta;

  const boton = $("#practice-next");
  if (boton) boton.disabled = !completa;
}

function renderComprobacion() {
  renderPreguntaSeleccion({
    clave: "comprobar",
    variante: estado.variantes.comprobar,
    fase: "comprobar",
    problemSelector: "#check-problem",
    questionSelector: "#check-question",
    optionsSelector: "#check-options",
    feedbackSelector: "#check-feedback",
    onCorrect: () => {
      const boton = $("#check-next");
      if (boton) boton.disabled = false;
    },
    mensajeCorrecto:
      "<strong>Plan correcto.</strong> Primero averiguaste el coste y después comparaste con el dinero disponible.",
    mensajeIncorrecto:
      "<strong>No pasa nada.</strong> Separa la situación en dos preguntas pequeñas: ¿cuánto cuesta todo? y ¿qué ocurre después?"
  });
}

function renderTransferencia() {
  const variante = estado.variantes.transferir;
  const pregunta = estadoPregunta("transferir", variante, "transferir");
  const problema = $("#transfer-problem");
  const enunciado = $("#transfer-question");
  const opciones = $("#transfer-options");
  const cajaFeedback = $("#transfer-feedback");
  const bloqueResultado = $("#transfer-result-block");
  const entrada = $("#transfer-answer");
  const unidad = $("#transfer-unit");
  const comprobarResultado = $("#transfer-check-answer");
  const apoyo = $("#transfer-support");

  if (problema) problema.textContent = variante.problema;
  if (enunciado) enunciado.textContent = variante.pregunta;
  if (unidad) unidad.textContent = variante.unidad;
  if (!opciones) return;

  opciones.innerHTML = "";

  barajar(variante.opciones).forEach(([valor, etiqueta]) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "choice";
    boton.textContent = etiqueta;

    boton.addEventListener("click", () => {
      if (pregunta.operacionCorrecta) return;
      pregunta.intentos += 1;
      pregunta.intentosOperacion += 1;
      pregunta.respuesta = valor;
      const correcto = valor === variante.correcta;

      opciones.querySelectorAll(".choice").forEach(item => {
        item.classList.remove("ok", "bad");
      });
      boton.classList.add(correcto ? "ok" : "bad");

      if (correcto) {
        pregunta.operacionCorrecta = true;
        opciones.querySelectorAll(".choice").forEach(item => {
          item.disabled = true;
        });
        feedback(
          cajaFeedback,
          "positive",
          "<strong>La relación encaja.</strong> Ahora resuelve la operación y comprueba si el resultado tiene sentido."
        );
        if (bloqueResultado) bloqueResultado.hidden = false;
        entrada?.focus();
      } else {
        feedback(
          cajaFeedback,
          "gentle",
          "<strong>Vuelve a la situación.</strong> ¿Estás formando grupos, repitiendo grupos, juntando o comparando cantidades?"
        );
      }
    });

    opciones.appendChild(boton);
  });

  const verificarResultado = () => {
    if (!pregunta.operacionCorrecta || pregunta.correcta) return;

    pregunta.intentos += 1;
    pregunta.intentosResultado += 1;
    const valor = Number(String(entrada?.value || "").replace(",", "."));

    if (Number.isFinite(valor) && valor === variante.respuestaNumerica) {
      pregunta.correcta = true;
      pregunta.respuesta = `${variante.correcta} | ${valor}`;
      if (entrada) entrada.disabled = true;
      if (comprobarResultado) comprobarResultado.disabled = true;
      if (apoyo) apoyo.hidden = true;
      feedback(
        cajaFeedback,
        "positive",
        "<strong>¡Transferencia conseguida!</strong> Era un contexto nuevo y aplicaste la misma estrategia: entender primero y calcular después."
      );
      const boton = $("#transfer-next");
      if (boton) boton.disabled = false;
    } else {
      feedback(
        cajaFeedback,
        "gentle",
        "<strong>La estrategia ya está.</strong> Revisa únicamente el cálculo; no necesitas cambiar de operación."
      );
      if (pregunta.intentosResultado >= 2 && apoyo) {
        apoyo.hidden = false;
      }
    }
  };

  comprobarResultado?.addEventListener("click", verificarResultado);
  entrada?.addEventListener("keydown", evento => {
    if (evento.key === "Enter") {
      evento.preventDefault();
      verificarResultado();
    }
  });

  apoyo?.addEventListener("click", () => {
    if (pregunta.correcta) return;
    pregunta.pistas.add(1);
    feedback(
      cajaFeedback,
      "support",
      "<strong>Apoyo de estrategia:</strong> vuelve a las cuatro preguntas: ¿qué sé?, ¿qué me piden?, ¿cómo se relaciona?, ¿tiene sentido? No cambies una operación que ya identificaste correctamente."
    );
  });
}

function respuestasCompletadas() {
  return ["practica-a", "practica-b", "comprobar", "transferir"]
    .map(clave => estado.preguntas.get(clave))
    .filter(Boolean)
    .map(respuestaPersistible);
}

function construirResumen(respuestas) {
  const correctas = respuestas.filter(item => item.correcta).length;
  const autonomas = respuestas.filter(item => item.resolucionAutonoma).length;
  const pistasUsadas = respuestas.reduce((total, item) => total + item.pistasUsadas, 0);
  const intentosTotales = respuestas.reduce((total, item) => total + item.intentos, 0);
  const transferencia = respuestas.find(item => item.fase === "transferir");
  const comprobacion = respuestas.find(item => item.fase === "comprobar");

  return {
    preguntasRespondidas: respuestas.length,
    correctas,
    autonomas,
    pistasUsadas,
    intentosTotales,
    transferenciaCorrecta: Boolean(transferencia?.correcta),
    comprobacionCorrecta: Boolean(comprobacion?.correcta)
  };
}

function construirObservaciones(respuestas, resumen) {
  const observaciones = [];
  const practicaA = respuestas.find(item => item.preguntaId === "practica-a");
  const transferencia = respuestas.find(item => item.fase === "transferir");

  if (transferencia?.resolucionAutonoma) {
    observaciones.push(
      "Aplicó la estrategia en un contexto nuevo sin pistas y al primer intento."
    );
  } else if (transferencia?.correcta) {
    observaciones.push(
      "Aplicó la estrategia en un contexto nuevo después de revisar su razonamiento."
    );
  }

  if (
    practicaA?.pistasUsadas > 0 &&
    transferencia?.correcta &&
    transferencia?.pistasUsadas === 0
  ) {
    observaciones.push(
      "El apoyo inicial dio paso a una resolución posterior con mayor autonomía."
    );
  }

  if (resumen.autonomas >= 3) {
    observaciones.push(
      "Mostró autonomía consistente en varias fases de la experiencia."
    );
  }

  if (resumen.intentosTotales > Math.max(6, respuestas.length * 2)) {
    observaciones.push(
      "Conviene ofrecer otra variante en otra sesión para consolidar la estrategia sin presión."
    );
  }

  if (!observaciones.length) {
    observaciones.push(
      "Completó la ruta y dispone de una nueva oportunidad para consolidarla con variantes diferentes."
    );
  }

  return observaciones;
}

function pintarCierre(respuestas, resumen, observaciones) {
  const transferencia = respuestas.find(item => item.fase === "transferir");
  const titulo = $("#summary-title");
  const mensaje = $("#summary-message");

  if (titulo) {
    titulo.textContent = transferencia?.resolucionAutonoma
      ? "¡Estrategia desbloqueada!"
      : "¡Buen trabajo! Ya tienes una ruta para seguir.";
  }

  if (mensaje) {
    mensaje.textContent = transferencia?.correcta
      ? "No repetiste una respuesta de memoria: resolviste un contexto nuevo usando la estrategia que acababas de practicar."
      : "Terminaste la experiencia. La próxima variante nos dará otra oportunidad para comprobar cómo evoluciona la estrategia.";
  }

  const total = $("#summary-questions");
  const autonomia = $("#summary-autonomy");
  const pistas = $("#summary-hints");

  if (total) total.textContent = String(resumen.preguntasRespondidas);
  if (autonomia) autonomia.textContent = String(resumen.autonomas);
  if (pistas) pistas.textContent = String(resumen.pistasUsadas);

  const lista = $("#summary-observations");
  if (lista) {
    lista.innerHTML = "";
    observaciones.forEach(textoObservacion => {
      const item = document.createElement("li");
      item.textContent = textoObservacion;
      lista.appendChild(item);
    });
  }
}

async function guardarCierre(respuestas, resumen, observaciones) {
  const estadoGuardado = $("#save-status");

  if (estado.modo === "vista_previa") {
    if (estadoGuardado) {
      estadoGuardado.className = "save-state preview";
      estadoGuardado.innerHTML =
        "👀 <strong>Vista previa:</strong> esta experiencia no ha modificado ningún historial académico.";
    }
    estado.guardado = { guardada: false, modo: "vista_previa" };
    return;
  }

  if (estado.guardado) return;

  if (estadoGuardado) {
    estadoGuardado.className = "save-state saving";
    estadoGuardado.textContent = "Guardando la sesión de aprendizaje…";
  }

  const finalizadaEn = new Date();
  const parametros = new URLSearchParams(window.location.search);

  try {
    const resultado = await SesionesAcademicas.guardar({
      modo: estado.modo,
      curso: TEMA.curso,
      materia: TEMA.materia,
      temaId: TEMA.temaId,
      temaTitulo: TEMA.temaTitulo,
      actividadId: TEMA.actividadId,
      tipoExperiencia: "tema_academico",
      origen: "mis-cursos",
      misionId: parametros.get("misionId") || "",
      inicioCliente: estado.iniciadaEn?.toISOString() || "",
      finCliente: finalizadaEn.toISOString(),
      duracionSegundos: estado.iniciadaEn
        ? Math.round((finalizadaEn.getTime() - estado.iniciadaEn.getTime()) / 1000)
        : 0,
      respuestas,
      resumen,
      observaciones
    });

    estado.guardado = resultado;

    if (estadoGuardado) {
      estadoGuardado.className = "save-state saved";
      estadoGuardado.innerHTML = resultado.guardada
        ? "✓ <strong>Sesión guardada.</strong> La Academia recordará lo útil de esta experiencia para observar evolución, no para etiquetar."
        : "👀 Vista previa completada sin guardar progreso.";
    }
  } catch (error) {
    console.error("[Piloto 6.º] No se pudo guardar la sesión.", error);
    if (estadoGuardado) {
      estadoGuardado.className = "save-state error";
      estadoGuardado.innerHTML =
        "⚠️ <strong>La experiencia se completó, pero no pudimos guardar la sesión.</strong> Tu trabajo no se pierde como aprendizaje; revisaremos la conexión antes de usar este dato.";
    }
  }
}

async function prepararCierre() {
  const respuestas = respuestasCompletadas();
  const resumen = construirResumen(respuestas);
  const observaciones = construirObservaciones(respuestas, resumen);
  pintarCierre(respuestas, resumen, observaciones);
  await guardarCierre(respuestas, resumen, observaciones);
}

function conectarNavegacion() {
  $("#start-experience")?.addEventListener("click", comenzar);
  $("#understand-next")?.addEventListener("click", () => mostrarEtapa(2));
  $("#practice-next")?.addEventListener("click", () => mostrarEtapa(3));
  $("#check-next")?.addEventListener("click", () => mostrarEtapa(4));
  $("#transfer-next")?.addEventListener("click", () => mostrarEtapa(5));
  $("#try-another")?.addEventListener("click", () => window.location.reload());
}

async function iniciarPiloto() {
  prepararVariantes();
  conectarNavegacion();
  renderPracticaA();
  renderPracticaB();
  renderComprobacion();
  renderTransferencia();
  await inicializarContexto();
  mostrarEtapa(0);
  renderIconos();
}

iniciarPiloto().catch(error => {
  console.error("[Piloto 6.º] Error de inicialización.", error);
  const aviso = $("#pilot-error");
  if (aviso) {
    aviso.hidden = false;
    aviso.textContent =
      "No pudimos iniciar toda la experiencia. Recarga la página y, si continúa, revisaremos el piloto antes de utilizarlo.";
  }
});
