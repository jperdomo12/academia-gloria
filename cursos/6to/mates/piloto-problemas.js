import { auth } from "../../../compartido/firebase/firebase-config.js";
import { ContextoUsuario } from "../../../compartido/js/contexto-usuario.js";
import { crearTiempoActivo } from "../../../compartido/js/tiempo-activo.js";
import { mostrarCelebracion } from "../../../compartido/js/celebracion.js";
import {
  guardarSesionAcademica,
  obtenerVariantesRecientes,
  MODOS_SESION_ACADEMICA
} from "../../../compartido/js/sesiones-academicas.js";
import {
  PILOTO_META,
  EJEMPLO_GUIADO,
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
  guardado: null
};

const etapas = [
  {
    id: "comprender",
    ruta: "comprender",
    kicker: "Comprender",
    titulo: "La ruta de cuatro preguntas",
    simbolo: "🧭"
  },
  {
    id: "practica",
    ruta: "practicar",
    kicker: "Practicar · con apoyo",
    titulo: "Primero piensa. Después pide la ayuda mínima que necesites.",
    simbolo: "🔎"
  },
  {
    id: "autonomia",
    ruta: "practicar",
    kicker: "Practicar · más autonomía",
    titulo: "La historia cambia. La estrategia sigue siendo tuya.",
    simbolo: "🧠"
  },
  {
    id: "comprobacion",
    ruta: "comprobar",
    kicker: "Comprobar",
    titulo: "Organiza un problema de dos pasos antes de calcular.",
    simbolo: "🧩"
  },
  {
    id: "transferencia",
    ruta: "transferir",
    kicker: "Transferir",
    titulo: "Ahora sí: un problema nuevo y sin respuesta para memorizar.",
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

function elegirVariante(banco, recientes) {
  const disponibles = banco.filter(item => !recientes.has(item.id));
  const fuente = disponibles.length ? disponibles : banco;
  return fuente[Math.floor(Math.random() * fuente.length)];
}

async function prepararVariantes() {
  let recientes = new Set();

  if (modo === MODOS_SESION_ACADEMICA.APRENDIZAJE) {
    try {
      recientes = await obtenerVariantesRecientes({
        actividadId: PILOTO_META.actividadId,
        maximoSesiones: 4
      });
    } catch (error) {
      console.warn("No se pudieron consultar variantes recientes.", error);
    }
  }

  state.variantes = {
    practica: elegirVariante(BANCO_PILOTO.practica, recientes),
    autonomia: elegirVariante(BANCO_PILOTO.autonomia, recientes),
    comprobacion: elegirVariante(BANCO_PILOTO.comprobacion, recientes),
    transferencia: elegirVariante(BANCO_PILOTO.transferencia, recientes)
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
    ? `Trabajamos sobre ${nombreAlumno}. Al terminar se guardará solo información útil para acompañar su aprendizaje.`
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
  `✨ Lía: ${nombreAlumno}, aquí no buscamos ir rápido. ` +
  "Quiero que descubras una estrategia que puedas usar incluso cuando cambie el problema.";

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
  const orden = ["comprender", "practicar", "comprobar", "transferir"];
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
      varianteId: variante?.id || "ejemplo-guiado",
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

function renderComprender() {
  const item = registro("comprender", null);
  item.correctaFinal = true;
  item.correctaPrimerIntento = true;

  $("stageLead").textContent =
    "Primero construimos una fotografía mental del problema. No tienes que memorizar palabras mágicas.";

  $("stageContent").innerHTML = `
    <div class="guided-example">
      <div>
        <h3 class="activity-title">${escapeHtml(EJEMPLO_GUIADO.titulo)}</h3>
        <div class="problem">${escapeHtml(EJEMPLO_GUIADO.enunciado)}</div>
      </div>
      <div class="four-questions">
        <div class="question-card"><strong>1 · ¿Qué sé?</strong><p>${escapeHtml(EJEMPLO_GUIADO.datos)}</p></div>
        <div class="question-card"><strong>2 · ¿Qué me piden?</strong><p>${escapeHtml(EJEMPLO_GUIADO.pregunta)}</p></div>
        <div class="question-card"><strong>3 · ¿Cómo se relaciona?</strong><p>${escapeHtml(EJEMPLO_GUIADO.relacion)}</p></div>
        <div class="question-card"><strong>4 · ¿Tiene sentido?</strong><p>${escapeHtml(EJEMPLO_GUIADO.comprobacion)}</p></div>
      </div>
    </div>
  `;

  $("attemptNote").textContent =
    "Aquí aprendemos la estrategia. Todavía no estamos comprobando nada.";
  $("continueButton").disabled = false;
  $("continueButton").textContent = "Quiero probarla →";
  $("continueButton").onclick = siguienteEtapa;
}

function renderOpciones(
  etapaId,
  variante,
  { conPistas = false, pistaTrasIntentos = 0 } = {}
) {
  const item = registro(etapaId, variante);
  const opciones = ordenarOpciones(`${etapaId}:${variante.id}`, variante.opciones);
  state.seleccion = null;

  $("stageLead").textContent =
    etapaId === "practica"
      ? "Intenta resolver primero con tu propia estrategia. Las pistas están ahí solo si las necesitas."
      : "Esta vez la ayuda aparece después de intentarlo. Queremos observar cómo organizas el problema.";

  const ayudas = conPistas
    ? `<div class="support-row">${variante.pistas
        .map(
          (_, i) =>
            `<button class="support-button" type="button" data-hint="${i}">Pista ${i + 1}</button>`
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
    ? "Ya has probado una idea. Puedes cambiarla y volver a comprobar."
    : "Primero elige la idea que mejor representa el problema.";

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
        "Has probado una idea. Vuelve al significado de la historia y elige otra opción.",
        "try"
      );
      $("attemptNote").textContent =
        `Intentos en este reto: ${item.intentos}. ` +
        "No pasa nada: cada intento nos da información.";

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
            <div class="support-box">${escapeHtml(variante.pista)}</div>
          `;
        });
      }
      return;
    }

    boton?.classList.add("correct");
    feedback(`🌟 ${variante.feedbackCorrecto}`, "good");
    $("continueButton").textContent = "Seguir →";
    $("continueButton").onclick = siguienteEtapa;
  };
}

function renderOperacion(etapaId, variante) {
  const item = registro(etapaId, variante);
  const operaciones = ordenarOpciones(
    `${etapaId}:${variante.id}:ops`,
    OPERACIONES
  );
  state.seleccion = null;

  $("stageLead").textContent =
    "No hay una frase exacta que memorizar. Imagina lo que está ocurriendo y elige la herramienta matemática.";

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
    "Esta práctica tiene menos apoyo que la anterior.";

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
        "Vuelve a la historia: ¿la cantidad se reparte, se repite, aumenta o disminuye?",
        "try"
      );
      $("attemptNote").textContent =
        `Intentos en este reto: ${item.intentos}. Tómate tu tiempo.`;
      return;
    }

    boton?.classList.add("correct");
    feedback(`✨ ${variante.feedbackCorrecto}`, "good");
    $("continueButton").textContent = "Ir a la comprobación →";
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
    "Este problema no apareció antes. Cambiaron la historia y los números. Queremos ver si puedes llevar contigo la estrategia.";

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
    "Aquí no buscamos reconocer una respuesta: eliges la operación y produces el resultado.";

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
          ? "La estrategia es buena. Revisa la cuenta con calma y vuelve a intentarlo."
          : "Antes de calcular, vuelve a pensar qué ocurre con las cantidades. Después revisa el resultado.",
        "try"
      );

      $("attemptNote").textContent =
        `Intentos en el reto nuevo: ${item.intentos}. ` +
        "Sigue siendo aprendizaje.";

      if (item.intentos >= 2 && !$("transferHint")) {
        $("supportBox").innerHTML = `
          <button id="transferHint" class="support-button" type="button">💡 Pista</button>
          <div id="transferHintText"></div>
        `;

        $("transferHint").addEventListener("click", () => {
          if (!item.pistaTardiaVista) {
            item.pistaTardiaVista = true;
            marcarPista(item);
          }
          $("transferHintText").innerHTML = `
            <div class="support-box">${escapeHtml(variante.pista)}</div>
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

    feedback(`🌟 ${variante.feedbackCorrecto}`, "good");
    $("transferResult").disabled = true;
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
  $("stageSymbol").textContent = etapa.simolo;
  feedback();

  if (etapa.id === "comprender") {
    renderComprender();
  } else if (etapa.id === "practica") {
    renderOpciones("practica", state.variantes.practica, {
      conPistas: true
    });
  } else if (etapa.id === "autonomia") {
    renderOperacion("autonomia", state.variantes.autonomia);
  } else if (etapa.id === "comprobacion") {
    renderOpciones("comprobacion", state.variantes.comprobacion, {
      pistaTrasIntentos: 2
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
      "Aplicaste la estrategia en un problema nuevo sin necesitar una respuesta conocida. Esa es una señal útil de transferencia.";
    senal = "transferencia_autonoma";
  } else {
    fortaleza =
      "Seguiste revisando tu estrategia hasta resolver un problema diferente. Corregir también forma parte de aprender.";
    senal = "transferencia_con_reintento";
  }

  if (pistas > 0 || intentosExtra > 1) {
    crecimiento =
      "Seguiremos practicando cómo reconocer la relación entre las cantidades con cada vez menos apoyo.";
    siguiente =
      "Un reto breve con otra historia y números diferentes, buscando reducir la ayuda necesaria.";
  } else if (!comprobacion?.correctaPrimerIntento) {
    crecimiento =
      "Conviene seguir entrenando cómo ordenar los pasos antes de hacer las cuentas.";
    siguiente =
      "Otro problema de dos pasos con un contexto diferente.";
  } else {
    crecimiento =
      "La estrategia está apareciendo con buena autonomía en esta sesión. Seguiremos comprobándola en contextos distintos.";
    siguiente =
      "Continuar con un nuevo tipo de problema para comprobar que la estrategia se mantiene.";
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

async function finalizar() {
  if (state.finalizado) return;

  state.finalizado = true;
  const tiempo = state.tiempo.detener();
  const retro = construirRetroalimentacion();

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
    `${nombreAlumno}, hoy no repetiste una misma pregunta: ` +
    "trabajaste la estrategia con historias distintas y terminaste aplicándola en un reto nuevo.";

  $("summaryStrength").textContent = retro.fortaleza;
  $("summaryGrow").textContent = retro.crecimiento;
  $("summaryNext").textContent = retro.siguiente;

  const badges = [
    "🧭 Pensé antes de calcular",
    "🚀 Llegué a un contexto nuevo"
  ];
  if (retro.pistas > 0) {
    badges.push("💡 Pedí ayuda cuando la necesité");
  }
  if (retro.intentosExtra > 0) {
    badges.push("🌱 Volví a intentarlo");
  }

  $("summaryBadges").innerHTML = badges
    .map(
      texto =>
        `<span class="summary-badge">${escapeHtml(texto)}</span>`
    )
    .join("");

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
          )
        },
        retroalimentacion: {
          fortaleza: retro.fortaleza,
          oportunidad: retro.crecimiento,
          siguientePaso: retro.siguiente
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
      "Has llegado hasta un problema nuevo y lo has resuelto pensando paso a paso.",
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

  state.tiempo.reiniciar("comprender");
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
  $("introPanel").classList.remove("hidden");

  actualizarRuta("comprender");
  actualizarModo();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

await prepararVariantes();
actualizarModo();
$("startButton").disabled = false;
