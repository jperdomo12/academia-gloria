import { auth } from "../../../compartido/firebase/firebase-config.js";
import { ContextoUsuario } from "../../../compartido/js/contexto-usuario.js";
import { crearTiempoActivo } from "../../../compartido/js/tiempo-activo.js";
import { mostrarCelebracion } from "../../../compartido/js/celebracion.js";
import {
  guardarSesionAcademica,
  leerSesionesAcademicas,
  MODOS_SESION_ACADEMICA
} from "../../../compartido/js/sesiones-academicas.js";
import {
  PILOTO_META,
  EJEMPLO_ANCLA,
  BANCO_PILOTO,
  OPERACIONES
} from "./piloto-problemas-data.js";

const $ = id => document.getElementById(id);

await auth.authStateReady();
if (!auth.currentUser) {
  window.location.replace("/academia-gloria/login.html");
  throw new Error("Sesión no disponible.");
}

const contexto = await ContextoUsuario.inicializar();
const esAdministrador = await ContextoUsuario.esAdministrador();
const nombreAlumno = String(
  contexto.personaActiva?.nombreVisible ||
  contexto.personaActiva?.nombre ||
  "Explorador"
).trim();

const cursoActivo = String(contexto.personaActiva?.curso || "").toLowerCase();
const pareceSexto = /(^|\D)6(?:\D|$)|sexto/.test(cursoActivo);
const puedeRegistrar = Boolean(contexto.esPersonaPropia || esAdministrador);
const parametros = new URLSearchParams(window.location.search);

let modo =
  contexto.esPersonaPropia && pareceSexto
    ? MODOS_SESION_ACADEMICA.APRENDIZAJE
    : MODOS_SESION_ACADEMICA.VISTA_PREVIA;

if (parametros.get("modo") === "preview") {
  modo = MODOS_SESION_ACADEMICA.VISTA_PREVIA;
}
if (parametros.get("modo") === "aprendizaje" && puedeRegistrar) {
  modo = MODOS_SESION_ACADEMICA.APRENDIZAJE;
}

const state = {
  iniciado: false,
  etapa: 0,
  variantes: {},
  registros: [],
  seleccion: null,
  ordenOpciones: {},
  inicioIso: null,
  tiempo: crearTiempoActivo({ inactividadMs: 180000 }),
  finalizado: false,
  guardado: null,
  sesionAnterior: null,
  primeraSesion: true
};

const etapas = [
  {
    id: "ancla",
    ruta: "aprender",
    kicker: "Aprender · una sola historia",
    titulo: "Un problema. Toda la estrategia.",
    simbolo: "🧭"
  },
  {
    id: "datos",
    ruta: "comprender",
    kicker: "Afianzar 1 de 4 · ¿Qué sé?",
    titulo: "Separa lo que sirve de lo que distrae.",
    simbolo: "🔎"
  },
  {
    id: "pregunta",
    ruta: "comprender",
    kicker: "Afianzar 2 de 4 · ¿Qué me piden?",
    titulo: "Antes de calcular, deja clara la meta.",
    simbolo: "🎯"
  },
  {
    id: "relacion",
    ruta: "relacionar",
    kicker: "Afianzar 3 de 4 · ¿Cómo se relaciona?",
    titulo: "Elige la herramienta por la historia, no por una palabra.",
    simbolo: "🧠"
  },
  {
    id: "comprobacion",
    ruta: "comprobar",
    kicker: "Afianzar 4 de 4 · ¿Tiene sentido?",
    titulo: "Una respuesta también se puede mirar desde fuera.",
    simbolo: "✅"
  },
  {
    id: "transferencia",
    ruta: "transferir",
    kicker: "Transferir · ahora tú",
    titulo: "Una historia nueva. La misma brújula.",
    simbolo: "🚀"
  }
];

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function barajar(items) {
  const copia = [...items];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function variantesRecientes(sesiones = []) {
  return new Set(
    sesiones.flatMap(sesion =>
      Array.isArray(sesion.variantes)
        ? sesion.variantes
            .map(item => String(item?.varianteId || item?.id || "").trim())
            .filter(Boolean)
        : []
    )
  );
}

function elegirVariante(banco, recientes, usarEntrada) {
  const candidatasEntrada = usarEntrada
    ? banco.filter(item => item.entrada === true)
    : banco;
  const candidatas = candidatasEntrada.length ? candidatasEntrada : banco;
  const noRecientes = candidatas.filter(item => !recientes.has(item.id));
  const fuente = noRecientes.length ? noRecientes : candidatas;
  return fuente[Math.floor(Math.random() * fuente.length)];
}

async function prepararVariantes() {
  let sesiones = [];
  let recientes = new Set();

  state.sesionAnterior = null;
  state.primeraSesion = true;

  if (modo === MODOS_SESION_ACADEMICA.APRENDIZAJE) {
    try {
      sesiones = await leerSesionesAcademicas({
        actividadId: PILOTO_META.actividadId,
        maximo: 8
      });
      const sesionesComparables = sesiones.filter(
        sesion => String(sesion.versionActividad || "") === PILOTO_META.version
      );
      recientes = variantesRecientes(sesionesComparables);
      state.sesionAnterior = sesionesComparables[0] || null;
      state.primeraSesion = sesionesComparables.length === 0;
    } catch (error) {
      console.warn("No se pudo consultar el historial reciente.", error);
    }
  }

  const usarEntrada =
    modo === MODOS_SESION_ACADEMICA.VISTA_PREVIA ||
    state.primeraSesion;

  state.variantes = {
    datos: elegirVariante(BANCO_PILOTO.datos, recientes, usarEntrada),
    pregunta: elegirVariante(BANCO_PILOTO.pregunta, recientes, usarEntrada),
    relacion: elegirVariante(BANCO_PILOTO.relacion, recientes, usarEntrada),
    comprobacion: elegirVariante(
      BANCO_PILOTO.comprobacion,
      recientes,
      usarEntrada
    ),
    transferencia: elegirVariante(
      BANCO_PILOTO.transferencia,
      recientes,
      usarEntrada
    )
  };
  state.ordenOpciones = {};
}

function actualizarModo() {
  const aprendizaje = modo === MODOS_SESION_ACADEMICA.APRENDIZAJE;

  $("modeIcon").textContent = aprendizaje ? "🎓" : "👀";
  $("modeTitle").textContent = aprendizaje
    ? "Sesión de aprendizaje"
    : "Vista previa";
  $("modeDescription").textContent = aprendizaje
    ? `Trabajamos sobre ${nombreAlumno}. Al terminar guardaremos solo información útil para acompañar su aprendizaje.`
    : "Puedes explorar, probar y equivocarte libremente. Nada de esta sesión se guardará como aprendizaje.";

  if (state.iniciado) {
    $("modeButton").disabled = true;
    $("modeButton").textContent = "Modo fijado al comenzar";
    return;
  }

  if (aprendizaje) {
    $("modeButton").disabled = false;
    $("modeButton").textContent = "Cambiar a Vista previa";
  } else if (puedeRegistrar) {
    $("modeButton").disabled = false;
    $("modeButton").textContent = "Usar como sesión de aprendizaje";
  } else {
    $("modeButton").disabled = true;
    $("modeButton").textContent = "Este acceso solo explora";
  }
}

$("liaWelcome").textContent =
  `✨ Lía: ${nombreAlumno}, hoy primero conocerás una estrategia con una sola historia. ` +
  "Después veremos si esa forma de pensar sigue contigo cuando el problema cambie.";

$("modeButton").addEventListener("click", async () => {
  if (state.iniciado) return;

  modo =
    modo === MODOS_SESION_ACADEMICA.APRENDIZAJE
      ? MODOS_SESION_ACADEMICA.VISTA_PREVIA
      : MODOS_SESION_ACADEMICA.APRENDIZAJE;

  await prepararVariantes();
  actualizarModo();
});

function actualizarRuta(rutaActual) {
  const orden = ["aprender", "comprender", "relacionar", "comprobar", "transferir"];
  const actual = orden.indexOf(rutaActual);

  document.querySelectorAll("[data-route]").forEach(item => {
    const posicion = orden.indexOf(item.dataset.route);
    item.classList.toggle("current", posicion === actual);
    item.classList.toggle("done", posicion < actual);
  });
}

function feedback(mensaje = "", tipo = "info") {
  const box = $("feedback");
  box.textContent = mensaje;
  box.className = mensaje ? `feedback show ${tipo}` : "feedback";
}

function registro(etapaId, variante) {
  let item = state.registros.find(reg => reg.etapa === etapaId);

  if (!item) {
    item = {
      etapa: etapaId,
      fase: variante?.fase || etapaId,
      conceptoId: variante?.conceptoId || "comprender_enunciado",
      varianteId: variante?.id || etapaId,
      intentos: 0,
      pistasUtilizadas: 0,
      respuestaInicial: null,
      respuestaFinal: null,
      correctaPrimerIntento: false,
      correctaFinal: false
    };
    state.registros.push(item);
  }

  return item;
}

function marcarPista(item) {
  item.pistasUtilizadas += 1;
}

function ordenarOpciones(clave, opciones) {
  if (!state.ordenOpciones[clave]) {
    state.ordenOpciones[clave] = barajar(opciones);
  }
  return state.ordenOpciones[clave];
}

function renderAncla() {
  $("stageLead").textContent =
    "Aquí no cambiamos de ejercicio. Recorremos toda la brújula sobre la misma historia para que puedas concentrarte en el método.";

  $("stageContent").innerHTML = `
    <div class="anchor-label">⚓ PROBLEMA ANCLA · SE MANTIENE DURANTE TODA LA EXPLICACIÓN</div>
    <div class="guided-example">
      <div>
        <h3 class="activity-title">${escapeHtml(EJEMPLO_ANCLA.titulo)}</h3>
        <div class="problem">${escapeHtml(EJEMPLO_ANCLA.enunciado)}</div>
      </div>
      <div class="anchor-flow">
        <article class="anchor-step">
          <b>1</b><div><strong>¿Qué sé?</strong><p>${escapeHtml(EJEMPLO_ANCLA.datos)}</p></div>
        </article>
        <article class="anchor-step">
          <b>2</b><div><strong>¿Qué me piden?</strong><p>${escapeHtml(EJEMPLO_ANCLA.pregunta)}</p></div>
        </article>
        <article class="anchor-step">
          <b>3</b><div><strong>¿Cómo se relaciona?</strong><p>${escapeHtml(EJEMPLO_ANCLA.relacion)}</p></div>
        </article>
        <article class="anchor-step">
          <b>4</b><div><strong>Elijo y calculo</strong><p>${escapeHtml(EJEMPLO_ANCLA.operacion)} ${escapeHtml(EJEMPLO_ANCLA.calculo)}</p></div>
        </article>
        <article class="anchor-step anchor-step-check">
          <b>5</b><div><strong>¿Tiene sentido?</strong><p>${escapeHtml(EJEMPLO_ANCLA.comprobacion)}</p></div>
        </article>
      </div>
    </div>
  `;

  $("attemptNote").textContent =
    "Esta parte es explicación: no cuenta como acierto ni error.";
  $("continueButton").disabled = false;
  $("continueButton").textContent = "Ahora quiero probar →";
  $("continueButton").onclick = siguienteEtapa;
}

function renderOpciones(
  etapaId,
  variante,
  {
    lead = "Lee la historia con calma y responde solo a la pregunta de esta etapa.",
    conPistas = false,
    pistaTrasIntentos = 0
  } = {}
) {
  const item = registro(etapaId, variante);
  const opciones = ordenarOpciones(`${etapaId}:${variante.id}`, variante.opciones);
  state.seleccion = null;

  $("stageLead").textContent = lead;

  const ayudas = conPistas
    ? `<div class="support-row">${(variante.pistas || [])
        .map(
          (_, i) =>
            `<button class="support-button" type="button" data-hint="${i}">💡 Pista ${i + 1}</button>`
        )
        .join("")}</div><div id="supportBox"></div>`
    : `<div id="supportBox"></div>`;

  $("stageContent").innerHTML = `
    <h3 class="activity-title">${escapeHtml(variante.titulo)}</h3>
    <div class="problem">${escapeHtml(variante.enunciado)}</div>
    <p class="activity-question">${escapeHtml(variante.pregunta)}</p>
    <div id="choiceGrid" class="choices">
      ${opciones
        .map(
          opcion =>
            `<button class="choice" type="button" data-option="${escapeHtml(
              opcion.id
            )}">${escapeHtml(opcion.texto)}</button>`
        )
        .join("")}
    </div>
    ${ayudas}
  `;

  $("choiceGrid")
    .querySelectorAll("[data-option]")
    .forEach(button => {
      button.addEventListener("click", () => {
        state.seleccion = button.dataset.option;
        $("choiceGrid")
          .querySelectorAll(".choice")
          .forEach(el => el.classList.remove("selected", "correct", "try"));
        button.classList.add("selected");
        feedback();
        $("continueButton").disabled = false;
      });
    });

  document.querySelectorAll("[data-hint]").forEach(button => {
    button.addEventListener("click", () => {
      const indice = Number(button.dataset.hint);
      const key = `pista-${indice}`;
      item.pistasVistas ||= [];

      if (!item.pistasVistas.includes(key)) {
        item.pistasVistas.push(key);
        marcarPista(item);
      }

      $("supportBox").innerHTML = `
        <div class="support-box">💡 ${escapeHtml(variante.pistas[indice])}</div>
      `;
    });
  });

  $("continueButton").textContent = "Comprobar mi idea";
  $("continueButton").disabled = true;
  $("attemptNote").textContent = item.intentos
    ? "Ya probaste una idea. Puedes cambiarla y volver a comprobar."
    : "El objetivo es comprender esta etapa, no responder rápido.";

  $("continueButton").onclick = () => {
    if (!state.seleccion) return;

    const opcion = variante.opciones.find(op => op.id === state.seleccion);
    item.intentos += 1;

    if (item.respuestaInicial === null) {
      item.respuestaInicial = state.seleccion;
    }

    item.respuestaFinal = state.seleccion;
    item.correctaPrimerIntento =
      item.intentos === 1 && Boolean(opcion?.correcta);
    item.correctaFinal = Boolean(opcion?.correcta);

    const boton = $("choiceGrid").querySelector(
      `[data-option="${CSS.escape(state.seleccion)}"]`
    );

    $("choiceGrid")
      .querySelectorAll(".choice")
      .forEach(el => el.classList.remove("correct", "try"));

    if (!opcion?.correcta) {
      boton?.classList.add("try");
      feedback(
        "Has probado una idea. Vuelve a la historia y mira exactamente qué pregunta esta etapa.",
        "try"
      );
      $("attemptNote").textContent =
        `Intentos en este reto: ${item.intentos}. ` +
        "Puedes cambiar de idea con calma.";

      if (
        pistaTrasIntentos > 0 &&
        item.intentos >= pistaTrasIntentos &&
        !$("lateHint")
      ) {
        $("supportBox").innerHTML = `
          <button id="lateHint" class="support-button" type="button">💡 Quiero una pista breve</button>
          <div id="lateHintText"></div>
        `;

        $("lateHint").addEventListener("click", () => {
          if (!item.pistaTardiaVista) {
            item.pistaTardiaVista = true;
            marcarPista(item);
          }
          $("lateHintText").innerHTML = `
            <div class="support-box">💡 ${escapeHtml(variante.pista)}</div>
          `;
        });
      }
      return;
    }

    boton?.classList.add("correct");
    $("choiceGrid")
      .querySelectorAll(".choice")
      .forEach(el => { el.disabled = true; });
    feedback(`🌟 ${variante.feedbackCorrecto}`, "good");
    $("continueButton").textContent = "Seguir →";
    $("continueButton").onclick = siguienteEtapa;
  };
}

function renderRelacion(variante) {
  const item = registro("relacion", variante);
  const operaciones = ordenarOpciones(
    `relacion:${variante.id}:ops`,
    OPERACIONES
  );
  state.seleccion = null;

  $("stageLead").textContent =
    "Recuerda la herramienta que acabas de explorar: las palabras pueden dar pistas, pero la historia es la que decide.";

  $("stageContent").innerHTML = `
    <h3 class="activity-title">${escapeHtml(variante.titulo)}</h3>
    <div class="problem">${escapeHtml(variante.enunciado)}</div>
    <p class="activity-question">${escapeHtml(variante.pregunta)}</p>
    <div id="operationGrid" class="operations">
      ${operaciones
        .map(
          op =>
            `<button class="operation" type="button" data-operation="${op.id}">
              <span class="operation-symbol">${op.simbolo}</span>
              <span class="operation-name">${op.nombre}</span>
            </button>`
        )
        .join("")}
    </div>
    <div id="supportBox"></div>
  `;

  $("operationGrid")
    .querySelectorAll("[data-operation]")
    .forEach(button => {
      button.addEventListener("click", () => {
        state.seleccion = button.dataset.operation;
        $("operationGrid")
          .querySelectorAll(".operation")
          .forEach(el => el.classList.remove("selected", "correct", "try"));
        button.classList.add("selected");
        feedback();
        $("continueButton").disabled = false;
      });
    });

  $("continueButton").textContent = "Comprobar mi estrategia";
  $("continueButton").disabled = true;
  $("attemptNote").textContent =
    "No necesitas hacer la cuenta todavía: solo reconocer la relación.";

  $("continueButton").onclick = () => {
    if (!state.seleccion) return;

    item.intentos += 1;
    if (item.respuestaInicial === null) {
      item.respuestaInicial = state.seleccion;
    }

    item.respuestaFinal = state.seleccion;
    item.correctaPrimerIntento =
      item.intentos === 1 &&
      state.seleccion === variante.operacionCorrecta;
    item.correctaFinal =
      state.seleccion === variante.operacionCorrecta;

    const boton = $("operationGrid").querySelector(
      `[data-operation="${CSS.escape(state.seleccion)}"]`
    );

    if (!item.correctaFinal) {
      boton?.classList.add("try");
      feedback(
        "No busques una palabra concreta. Imagina qué hacen las cantidades y vuelve a elegir.",
        "try"
      );
      $("attemptNote").textContent =
        `Intentos en este reto: ${item.intentos}. Tómate tu tiempo.`;

      if (!$("relationHint")) {
        $("supportBox").innerHTML = `
          <button id="relationHint" class="support-button" type="button">💡 Quiero una pista</button>
          <div id="relationHintText"></div>
        `;
        $("relationHint").addEventListener("click", () => {
          if (!item.pistaTardiaVista) {
            item.pistaTardiaVista = true;
            marcarPista(item);
          }
          $("relationHintText").innerHTML = `
            <div class="support-box">💡 ${escapeHtml(variante.pista)}</div>
          `;
        });
      }
      return;
    }

    boton?.classList.add("correct");
    $("operationGrid")
      .querySelectorAll(".operation")
      .forEach(el => { el.disabled = true; });
    feedback(`✨ ${variante.feedbackCorrecto}`, "good");
    $("continueButton").textContent = "Seguir →";
    $("continueButton").onclick = siguienteEtapa;
  };
}

function renderTransferencia(variante) {
  const item = registro("transferencia", variante);
  const operaciones = ordenarOpciones(
    `transfer:${variante.id}:ops`,
    OPERACIONES
  );
  state.seleccion = null;

  $("stageLead").textContent =
    "Ahora recorres la brújula por tu cuenta: entiende qué ocurre, decide la operación, calcula y comprueba si tu respuesta encaja.";

  $("stageContent").innerHTML = `
    <h3 class="activity-title">${escapeHtml(variante.titulo)}</h3>
    <div class="problem">${escapeHtml(variante.enunciado)}</div>
    <p class="activity-question">${escapeHtml(variante.preguntaOperacion)}</p>
    <div id="operationGrid" class="operations">
      ${operaciones
        .map(
          op =>
            `<button class="operation" type="button" data-operation="${op.id}">
              <span class="operation-symbol">${op.simbolo}</span>
              <span class="operation-name">${op.nombre}</span>
            </button>`
        )
        .join("")}
    </div>
    <div class="transfer-grid">
      <div class="answer-field">
        <label for="transferResult">Ahora calcula el resultado</label>
        <input
          id="transferResult"
          inputmode="numeric"
          type="number"
          placeholder="Escribe tu resultado"
        >
      </div>
      <div id="supportBox"></div>
    </div>
  `;

  $("operationGrid")
    .querySelectorAll("[data-operation]")
    .forEach(button => {
      button.addEventListener("click", () => {
        state.seleccion = button.dataset.operation;
        $("operationGrid")
          .querySelectorAll(".operation")
          .forEach(el => el.classList.remove("selected", "correct", "try"));
        button.classList.add("selected");
        $("continueButton").disabled =
          $("transferResult").value.trim() === "";
      });
    });

  $("transferResult").addEventListener("input", () => {
    $("continueButton").disabled =
      !state.seleccion || $("transferResult").value.trim() === "";
  });

  $("continueButton").textContent = "Comprobar mi reto final";
  $("continueButton").disabled = true;
  $("attemptNote").textContent =
    "Aquí eliges la operación y produces el resultado. Una pista estará disponible si la necesitas.";

  $("continueButton").onclick = () => {
    const resultado = Number($("transferResult").value);
    if (!state.seleccion || !Number.isFinite(resultado)) return;

    item.intentos += 1;
    const respuesta = {
      operacion: state.seleccion,
      resultado
    };

    if (item.respuestaInicial === null) {
      item.respuestaInicial = respuesta;
    }

    item.respuestaFinal = respuesta;

    const correcta =
      state.seleccion === variante.operacionCorrecta &&
      resultado === Number(variante.resultadoCorrecto);

    item.correctaPrimerIntento = item.intentos === 1 && correcta;
    item.correctaFinal = correcta;

    if (!correcta) {
      const operacionBien =
        state.seleccion === variante.operacionCorrecta;

      feedback(
        operacionBien
          ? "La estrategia encaja. Revisa solamente la cuenta con calma."
          : "Vuelve a la historia: primero decide qué está ocurriendo y después revisa el cálculo.",
        "try"
      );

      $("attemptNote").textContent =
        `Intentos en el reto nuevo: ${item.intentos}. ` +
        "Un intento no borra lo que ya entendiste.";

      if (!$("transferHint")) {
        $("supportBox").innerHTML = `
          <button id="transferHint" class="support-button" type="button">💡 Quiero una pista</button>
          <div id="transferHintText"></div>
        `;

        $("transferHint").addEventListener("click", () => {
          if (!item.pistaTardiaVista) {
            item.pistaTardiaVista = true;
            marcarPista(item);
          }
          $("transferHintText").innerHTML = `
            <div class="support-box">💡 ${escapeHtml(variante.pista)}</div>
          `;
        });
      }
      return;
    }

    $("operationGrid")
      .querySelector(
        `[data-operation="${CSS.escape(state.seleccion)}"]`
      )
      ?.classList.add("correct");

    $("operationGrid")
      .querySelectorAll(".operation")
      .forEach(el => { el.disabled = true; });
    $("transferResult").disabled = true;

    feedback(`🌟 ${variante.feedbackCorrecto}`, "good");
    $("continueButton").textContent = "Ver lo que he conseguido 🌟";
    $("continueButton").onclick = finalizar;
  };
}

function renderEtapa() {
  const etapa = etapas[state.etapa];

  actualizarRuta(etapa.ruta);
  state.tiempo.cambiarSegmento(etapa.id);
  $("stageKicker").textContent = etapa.kicker;
  $("stageTitle").textContent = etapa.titulo;
  $("stageSymbol").textContent = etapa.simbolo;
  feedback();

  if (etapa.id === "ancla") {
    renderAncla();
  } else if (etapa.id === "datos") {
    renderOpciones("datos", state.variantes.datos, {
      conPistas: true,
      lead:
        "Este problema es nuevo. Por ahora solo buscamos los datos que realmente ayudan a responder."
    });
  } else if (etapa.id === "pregunta") {
    renderOpciones("pregunta", state.variantes.pregunta, {
      conPistas: true,
      lead:
        "Otra historia nueva. No resuelvas todavía: identifica exactamente qué cantidad necesita la respuesta."
    });
  } else if (etapa.id === "relacion") {
    renderRelacion(state.variantes.relacion);
  } else if (etapa.id === "comprobacion") {
    renderOpciones("comprobacion", state.variantes.comprobacion, {
      pistaTrasIntentos: 1,
      lead:
        "Aquí ya existe una respuesta propuesta. Tu tarea es decidir si realmente encaja con la historia."
    });
  } else if (etapa.id === "transferencia") {
    renderTransferencia(state.variantes.transferencia);
  }
}

function siguienteEtapa() {
  if (state.etapa >= etapas.length - 1) return;

  state.etapa += 1;
  state.seleccion = null;
  renderEtapa();

  window.scrollTo({
    top: Math.max(0, $("stagePanel").offsetTop - 86),
    behavior: "smooth"
  });
}

function construirRetroalimentacion() {
  const transferencia = state.registros.find(
    item => item.etapa === "transferencia"
  );
  const relacion = state.registros.find(
    item => item.etapa === "relacion"
  );
  const comprobacion = state.registros.find(
    item => item.etapa === "comprobacion"
  );

  const pistas = state.registros.reduce(
    (total, item) => total + Number(item.pistasUtilizadas || 0),
    0
  );

  const intentosExtra = state.registros.reduce(
    (total, item) =>
      total + Math.max(0, Number(item.intentos || 0) - 1),
    0
  );

  let fortaleza;
  let crecimiento;
  let siguiente;
  let senal;

  if (transferencia?.correctaPrimerIntento) {
    fortaleza =
      "Aplicaste la brújula completa en una historia nueva y llegaste al resultado al primer intento.";
    senal = "transferencia_autonoma";
  } else {
    fortaleza =
      "Seguiste revisando tu estrategia hasta resolver una historia distinta. Corregir una idea también forma parte de aprender.";
    senal = "transferencia_con_reintento";
  }

  if (pistas > 0 || intentosExtra > 1) {
    crecimiento =
      "Seguiremos buscando que cada etapa necesite un poco menos de ayuda, sin subir todavía la dificultad de todo a la vez.";
    siguiente =
      "Otra vuelta corta con historias distintas, manteniendo números manejables mientras consolidamos la estrategia.";
  } else if (!relacion?.correctaPrimerIntento) {
    crecimiento =
      "Conviene seguir practicando cómo reconocer lo que hacen las cantidades antes de elegir una operación.";
    siguiente =
      "Un nuevo problema para distinguir juntar, quitar, repetir grupos y repartir.";
  } else if (!comprobacion?.correctaPrimerIntento) {
    crecimiento =
      "Seguiremos entrenando cómo comprobar una respuesta volviendo a la historia y usando la operación relacionada.";
    siguiente =
      "Un reto breve donde primero resolvemos y después comprobamos de otra manera.";
  } else {
    crecimiento =
      "La estrategia apareció con buena autonomía en esta sesión. Ahora necesitamos comprobar que se mantiene con el tiempo.";
    siguiente =
      "Volver más adelante con nuevas variantes y, cuando corresponda, introducir una operación algo más exigente.";
  }

  return {
    fortaleza,
    crecimiento,
    siguiente,
    senal,
    pistas,
    intentosExtra
  };
}

function construirRecordPersonal(retro) {
  if (modo !== MODOS_SESION_ACADEMICA.APRENDIZAJE) {
    return null;
  }

  const anterior = state.sesionAnterior?.resumen;
  const transferenciaActual = state.registros.find(
    item => item.etapa === "transferencia"
  );

  if (!anterior) {
    return {
      tipo: "punto_partida",
      titulo: "🌱 Tu punto de partida",
      texto:
        `Hoy usaste ${retro.pistas} pista${retro.pistas === 1 ? "" : "s"} y ` +
        `${retro.intentosExtra} reintento${retro.intentosExtra === 1 ? "" : "s"} adicional${retro.intentosExtra === 1 ? "" : "es"}. ` +
        "La próxima vez podremos comparar contigo misma.",
      lia:
        "Lía: No es una nota. Es una referencia para descubrir qué va necesitando menos ayuda con el tiempo."
    };
  }

  const pistasAntes = Number(anterior.pistasUtilizadas ?? 0);
  const intentosAntes = Number(anterior.intentosAdicionales ?? 0);
  const transferenciaAntes = Boolean(
    anterior.transferenciaCorrectaPrimerIntento
  );

  if (retro.pistas < pistasAntes) {
    const diferencia = pistasAntes - retro.pistas;
    return {
      tipo: "nuevo_record_pistas",
      titulo: "🌟 Nuevo récord personal",
      texto:
        `Esta vez utilizaste ${diferencia} pista${diferencia === 1 ? "" : "s"} menos que en tu sesión anterior.`,
      lia:
        "Lía: La estrategia está necesitando un poco menos de apoyo. Eso merece que lo notes."
    };
  }

  if (retro.intentosExtra < intentosAntes) {
    const diferencia = intentosAntes - retro.intentosExtra;
    return {
      tipo: "nuevo_record_intentos",
      titulo: "🌟 Nuevo récord personal",
      texto:
        `Esta vez necesitaste ${diferencia} reintento${diferencia === 1 ? "" : "s"} menos que en tu sesión anterior.`,
      lia:
        "Lía: No se trata de correr. Hoy encontraste el camino con menos correcciones."
    };
  }

  if (
    transferenciaActual?.correctaPrimerIntento &&
    !transferenciaAntes
  ) {
    return {
      tipo: "nuevo_record_transferencia",
      titulo: "🌟 Nuevo récord personal",
      texto:
        "Hoy resolviste el reto final al primer intento; en la sesión anterior necesitaste revisar tu respuesta.",
      lia:
        "Lía: La historia cambió y aun así pudiste llevarte la estrategia contigo."
    };
  }

  return {
    tipo: "referencia_personal",
    titulo: "🌿 Tu referencia personal",
    texto:
      `Hoy: ${retro.pistas} pista${retro.pistas === 1 ? "" : "s"} y ` +
      `${retro.intentosExtra} reintento${retro.intentosExtra === 1 ? "" : "s"} adicional${retro.intentosExtra === 1 ? "" : "es"}. ` +
      "No hace falta superar una marca en cada sesión; seguiremos mirando la tendencia.",
    lia:
      "Lía: Tu comparación importante es contigo misma y a lo largo del tiempo."
  };
}

async function finalizar() {
  if (state.finalizado) return;

  state.finalizado = true;
  const tiempo = state.tiempo.detener();
  const retro = construirRetroalimentacion();
  const record = construirRecordPersonal(retro);

  $("stagePanel").classList.add("hidden");
  $("summaryPanel").classList.remove("hidden");

  actualizarRuta("transferir");
  document
    .querySelector('[data-route="transferir"]')
    ?.classList.add("done");
  document
    .querySelector('[data-route="transferir"]')
    ?.classList.remove("current");

  $("summaryLead").textContent =
    `${nombreAlumno}, primero aprendiste toda la estrategia con un solo problema. ` +
    "Después cada etapa cambió de historia y terminaste usando la brújula completa en un reto nuevo.";

  $("summaryStrength").textContent = retro.fortaleza;
  $("summaryGrow").textContent = retro.crecimiento;
  $("summaryNext").textContent = retro.siguiente;

  const badges = [
    "🧭 Pensé antes de calcular",
    "🧩 Practiqué cada etapa",
    "🚀 Llevé la estrategia a otra historia"
  ];
  if (retro.pistas > 0) {
    badges.push("💡 Pedí ayuda cuando la necesité");
  }
  if (retro.intentosExtra > 0) {
    badges.push("🌱 Volví a intentarlo");
  }
  if (record?.tipo?.startsWith("nuevo_record")) {
    badges.push("🌟 Nuevo récord personal");
  }

  $("summaryBadges").innerHTML = badges
    .map(
      texto =>
        `<span class="summary-badge">${escapeHtml(texto)}</span>`
    )
    .join("");

  if (record) {
    $("personalRecord").classList.remove("hidden");
    $("personalRecordTitle").textContent = record.titulo;
    $("personalRecordText").textContent = record.texto;
    $("personalRecordLia").textContent = record.lia;
  } else {
    $("personalRecord").classList.add("hidden");
  }

  if (modo === MODOS_SESION_ACADEMICA.VISTA_PREVIA) {
    $("saveStatus").textContent =
      "👀 Vista previa: tal como prometimos, nada de esta sesión se ha guardado como aprendizaje.";
  } else {
    $("saveStatus").textContent =
      "☁️ Guardando la sesión de aprendizaje...";

    try {
      state.guardado = await guardarSesionAcademica({
        modo,
        actividadId: PILOTO_META.actividadId,
        tituloActividad: PILOTO_META.titulo,
        versionActividad: PILOTO_META.version,
        cursoReferencia: PILOTO_META.cursoReferencia,
        materia: PILOTO_META.materia,
        tema: PILOTO_META.tema,
        origen: "curso",
        inicioCliente: state.inicioIso,
        finCliente: new Date().toISOString(),
        tiempoActivoSegundos: tiempo.tiempoActivoSegundos,
        tiempoActivoPorSegmento: tiempo.tiempoActivoPorSegmento,
        conceptosTrabajados: [...PILOTO_META.conceptos],
        variantes: Object.entries(state.variantes).map(
          ([fase, variante]) => ({
            fase,
            varianteId: variante.id,
            conceptoId: variante.conceptoId
          })
        ),
        respuestas: state.registros.map(item => ({
          etapa: item.etapa,
          fase: item.fase,
          conceptoId: item.conceptoId,
          varianteId: item.varianteId,
          intentos: Number(item.intentos || 0),
          pistasUtilizadas: Number(item.pistasUtilizadas || 0),
          respuestaInicial: item.respuestaInicial,
          respuestaFinal: item.respuestaFinal,
          correctaPrimerIntento: Boolean(
            item.correctaPrimerIntento
          ),
          correctaFinal: Boolean(item.correctaFinal)
        })),
        resumen: {
          finalizada: true,
          senalTransferencia: retro.senal,
          pistasUtilizadas: retro.pistas,
          intentosAdicionales: retro.intentosExtra,
          transferenciaCorrectaPrimerIntento: Boolean(
            state.registros.find(
              item => item.etapa === "transferencia"
            )?.correctaPrimerIntento
          ),
          recordPersonal: record?.tipo || null
        },
        retroalimentacion: {
          fortaleza: retro.fortaleza,
          oportunidad: retro.crecimiento,
          siguientePaso: retro.siguiente,
          recordPersonal: record
            ? {
                tipo: record.tipo,
                titulo: record.titulo,
                texto: record.texto
              }
            : null
        }
      });

      $("saveStatus").textContent =
        "✅ Sesión guardada. La Academia recordará lo ocurrido para acompañar mejor el siguiente paso.";
    } catch (error) {
      console.error(
        "No se pudo guardar la Sesión Académica.",
        error
      );
      $("saveStatus").textContent =
        "⚠️ Terminaste el reto, pero no pudimos guardar la sesión. " +
        "El aprendizaje realizado sigue contando; revisaremos la conexión antes de usar estos datos.";
    }
  }

  mostrarCelebracion({
    titulo: "¡Reto completado!",
    mensaje:
      "Primero aprendiste la brújula; después la llevaste contigo cuando las historias cambiaron.",
    duracion: 3000,
    mostrarGuacamayas: true
  });

  window.scrollTo({
    top: Math.max(0, $("summaryPanel").offsetTop - 86),
    behavior: "smooth"
  });
}

$("startButton").addEventListener("click", () => {
  state.iniciado = true;
  state.etapa = 0;
  state.registros = [];
  state.inicioIso = new Date().toISOString();
  state.finalizado = false;
  state.guardado = null;

  state.tiempo.reiniciar("ancla");
  $("introPanel").classList.add("hidden");
  $("stagePanel").classList.remove("hidden");

  actualizarModo();
  renderEtapa();

  window.scrollTo({
    top: Math.max(0, $("stagePanel").offsetTop - 86),
    behavior: "smooth"
  });
});

$("restartButton").addEventListener("click", async () => {
  state.iniciado = false;
  state.finalizado = false;
  state.etapa = 0;
  state.registros = [];
  state.seleccion = null;
  state.ordenOpciones = {};

  await prepararVariantes();

  $("summaryPanel").classList.add("hidden");
  $("personalRecord").classList.add("hidden");
  $("introPanel").classList.remove("hidden");

  actualizarRuta("aprender");
  actualizarModo();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

await prepararVariantes();
actualizarModo();
$("startButton").disabled = false;
