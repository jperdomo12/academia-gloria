import { auth } from "../../compartido/firebase/firebase-config.js";
import { Academia } from "../../compartido/api/academia.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";
import {
  obtenerHistorialDetectives,
  obtenerSesionesHistoria
} from "../../compartido/js/detectives-progreso.js";

const $ = id => document.getElementById(id);
const ESTADOS_CERRADOS = new Set(["completada", "cancelada"]);
const CANTIDAD_REFUERZO = 3;
const TAMANO_PAGINA_PROPUESTAS = 5;

const FOCOS = Object.freeze({
  comprension: Object.freeze({
    orden: 1,
    icono: "🧠",
    titulo: "Comprender qué pregunta el problema",
    fase: "Comprendo",
    objetivo: "Comprender con calma qué está preguntando cada historia antes de calcular.",
    descripcionAlumno: "Vamos a practicar cómo entender qué pregunta cada historia antes de resolverla."
  }),
  descubrimiento: Object.freeze({
    orden: 2,
    icono: "🔎",
    titulo: "Descubrir qué hay que averiguar",
    fase: "Descubro",
    objetivo: "Identificar qué información hay que averiguar antes de elegir una operación.",
    descripcionAlumno: "Vamos a practicar cómo descubrir qué tenemos que averiguar en cada historia."
  }),
  operacion: Object.freeze({
    orden: 3,
    icono: "➕",
    titulo: "Elegir la operación",
    fase: "Elijo la operación",
    objetivo: "Relacionar la historia con la operación matemática adecuada.",
    descripcionAlumno: "Vamos a practicar cómo elegir la operación que mejor representa cada historia."
  }),
  operandos: Object.freeze({
    orden: 4,
    icono: "🔢",
    titulo: "Elegir los datos que necesito",
    fase: "Elijo los datos",
    objetivo: "Reconocer las cantidades de la historia que intervienen en cada cálculo.",
    descripcionAlumno: "Vamos a practicar cómo encontrar los números que necesitamos para resolver cada historia."
  }),
  resultado: Object.freeze({
    orden: 5,
    icono: "✅",
    titulo: "Calcular y comprobar el resultado",
    fase: "Resuelvo",
    objetivo: "Realizar el cálculo y comprobar que el resultado responde a la historia.",
    descripcionAlumno: "Vamos a practicar cómo calcular y comprobar que la respuesta tiene sentido."
  }),
  general: Object.freeze({
    orden: 6,
    icono: "🧩",
    titulo: "Resolver problemas paso a paso",
    fase: "Proceso completo",
    objetivo: "Resolver nuevas historias de Detectives siguiendo con calma todos los pasos.",
    descripcionAlumno: "Vamos a resolver nuevas historias paso a paso, con calma y usando las pistas cuando hagan falta."
  })
});

let propuestas = [];
let misionesRefuerzo = [];
let cargando = false;
let historiasPorId = new Map();
let paginaPropuestas = 1;
let metaPropuestas = {};

function escapar(valor = "") {
  return String(valor).replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caracter]);
}

function numero(valor) {
  const n = Number(valor || 0);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

function marcaTiempo(valor) {
  if (!valor) return 0;
  const fecha = new Date(valor);
  const tiempo = fecha.getTime();
  return Number.isFinite(tiempo) ? tiempo : 0;
}

function textoDecimal(valor) {
  const n = numero(valor);
  return n.toLocaleString("es-ES", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 1,
    maximumFractionDigits: 1
  });
}

function plural(cantidad, singular, pluralTexto) {
  return cantidad === 1 ? singular : pluralTexto;
}

function estadoCerrado(tarea = {}) {
  return ESTADOS_CERRADOS.has(String(tarea.estado || ""));
}

function configuracionRefuerzo(tarea = {}) {
  const configuracion = tarea.evidencia?.configuracion;
  return configuracion && typeof configuracion === "object" ? configuracion : {};
}

function esMisionRefuerzoDetectives(tarea = {}) {
  const configuracion = configuracionRefuerzo(tarea);
  return tarea.modulo === "detectives" &&
    tarea.evidencia?.tipo === "refuerzo_detectives" &&
    configuracion.origen === "detectives";
}

function clavePropuesta(nivel, foco) {
  return `${Number(nivel || 0)}|${String(foco || "")}`;
}

function tituloHistoria(historiaId) {
  return String(
    historiasPorId.get(String(historiaId || ""))?.titulo ||
    historiaId ||
    "Historia de Detectives"
  );
}

async function resolverUserIdDatos() {
  await auth.authStateReady();
  if (!auth.currentUser) {
    throw new Error("la sesión de usuario ya no está disponible");
  }

  const contexto = await ContextoUsuario.inicializar();
  return String(contexto.userIdPersonaActiva || auth.currentUser.uid).trim();
}

async function cargarHistorias() {
  const respuesta = await fetch(
    "../aventuras-matematicas/detectives/historias.json",
    { cache: "no-store" }
  );

  if (!respuesta.ok) {
    throw new Error(`no se pudo leer el catálogo de Detectives (HTTP ${respuesta.status})`);
  }

  const historias = await respuesta.json();
  if (!Array.isArray(historias)) {
    throw new Error("el catálogo de Detectives no tiene el formato esperado");
  }

  historiasPorId = new Map(
    historias
      .filter(item => item?.id)
      .map(item => [String(item.id), item])
  );
}

function sumaIntentosPasos(sesion = {}, campo) {
  const pasos = Array.isArray(sesion.pasos) ? sesion.pasos : [];
  if (pasos.length) {
    return {
      intentos: pasos.reduce((total, paso) => total + numero(paso?.[campo]), 0),
      base: pasos.length
    };
  }

  return {
    intentos: numero(sesion?.[campo]),
    base: 1
  };
}

function senalesSesion(sesion = {}) {
  const senales = [];

  const agregar = (foco, intentos, base = 1) => {
    const extras = Math.max(0, numero(intentos) - Math.max(1, numero(base)));
    if (!extras) return;
    senales.push({ foco, intentos: numero(intentos), base: Math.max(1, numero(base)), extras });
  };

  agregar("comprension", sesion.intentosComprension, 1);
  agregar("descubrimiento", sesion.intentosDescubrimiento, 1);

  const operacion = sumaIntentosPasos(sesion, "intentosOperacion");
  const operandos = sumaIntentosPasos(sesion, "intentosOperandos");
  const resultado = sumaIntentosPasos(sesion, "intentosResultado");

  agregar("operacion", operacion.intentos, operacion.base);
  agregar("operandos", operandos.intentos, operandos.base);
  agregar("resultado", resultado.intentos, resultado.base);

  return senales;
}

function senalMasFuerte(senales = []) {
  return [...senales].sort((a, b) =>
    numero(b.extras) - numero(a.extras) ||
    (FOCOS[a.foco]?.orden || 99) - (FOCOS[b.foco]?.orden || 99)
  )[0] || null;
}

function crearPropuestas(registros = [], tareas = []) {
  const grupos = new Map();

  const agregar = (nivel, foco, soporte) => {
    const clave = clavePropuesta(nivel, foco);
    const grupo = grupos.get(clave) || {
      clave,
      nivel: Number(nivel || 1),
      foco,
      soportes: []
    };

    if (!grupo.soportes.some(item => item.historiaId === soporte.historiaId)) {
      grupo.soportes.push(soporte);
    }
    grupos.set(clave, grupo);
  };

  registros.forEach(registro => {
    if (registro.estado === "dominada") return;

    const senales = senalesSesion(registro.sesion);
    senales.forEach(senal => {
      agregar(registro.nivel, senal.foco, {
        historiaId: registro.historiaId,
        sesionId: registro.sesion?.id || "",
        titulo: tituloHistoria(registro.historiaId),
        extras: senal.extras,
        completadaEn: registro.sesion?.completadaEn || "",
        decisionFamilia: false
      });
    });

    if (registro.estado === "reforzar") {
      const principal = senalMasFuerte(senales);
      if (!principal) return;

      const clave = clavePropuesta(registro.nivel, principal.foco);
      const grupo = grupos.get(clave);
      const existente = grupo?.soportes.find(
        item => item.historiaId === registro.historiaId
      );

      if (existente) {
        existente.decisionFamilia = true;
      }
    }
  });

  const activas = tareas.filter(tarea => esMisionRefuerzoDetectives(tarea) && !estadoCerrado(tarea));
  const clavesActivas = new Set(
    activas.map(tarea => {
      const cfg = configuracionRefuerzo(tarea);
      return clavePropuesta(cfg.nivel, cfg.foco);
    })
  );

  return [...grupos.values()]
    .filter(grupo => grupo.soportes.length >= 2)
    .map(grupo => {
      const totalExtras = grupo.soportes.reduce(
        (total, item) => total + numero(item.extras),
        0
      );
      const promedioExtras = grupo.soportes.length
        ? totalExtras / grupo.soportes.length
        : 0;

      return {
        ...grupo,
        totalExtras,
        promedioExtras,
        ultimaSenalEn: grupo.soportes.reduce(
          (ultima, item) => Math.max(ultima, marcaTiempo(item.completadaEn)),
          0
        ),
        decisionFamilia: grupo.soportes.some(item => item.decisionFamilia),
        yaPreparada: clavesActivas.has(grupo.clave)
      };
    })
    .sort((a, b) =>
      b.promedioExtras - a.promedioExtras ||
      b.ultimaSenalEn - a.ultimaSenalEn ||
      a.nivel - b.nivel ||
      (FOCOS[a.foco]?.orden || 99) - (FOCOS[b.foco]?.orden || 99)
    );
}

async function leerDatosDetectives() {
  const userIdDatos = await resolverUserIdDatos();
  const [tareas] = await Promise.all([
    Academia.tareas.leer(),
    cargarHistorias()
  ]);

  const historial = await obtenerHistorialDetectives(userIdDatos);

  const resultados = await Promise.allSettled(
    historial.map(async resumen => {
      const historiaId = String(resumen.historiaId || resumen.id || "").trim();
      if (!historiaId) return null;
      const sesiones = await obtenerSesionesHistoria(userIdDatos, historiaId);
      if (!sesiones.length) return null;
      return {
        historiaId,
        nivel: Number(resumen.nivel || sesiones[0]?.nivel || 1),
        estado: String(resumen.estado || "en_practica"),
        sesion: sesiones[0]
      };
    })
  );

  const registros = resultados
    .filter(resultado => resultado.status === "fulfilled" && resultado.value)
    .map(resultado => resultado.value);

  const erroresSesiones = resultados.filter(resultado => resultado.status === "rejected").length;

  misionesRefuerzo = tareas.filter(esMisionRefuerzoDetectives);
  propuestas = crearPropuestas(registros, tareas);

  const paginas = totalPaginasPropuestas();
  if (paginaPropuestas > paginas) paginaPropuestas = paginas;
  if (paginaPropuestas < 1) paginaPropuestas = 1;

  return {
    totalHistorias: historial.length,
    historiasAnalizadas: registros.length,
    erroresSesiones
  };
}

function textoObservacion(propuesta) {
  const foco = FOCOS[propuesta.foco] || FOCOS.general;
  const cantidad = propuesta.soportes.length;
  const nivel = propuesta.nivel;
  const promedio = textoDecimal(propuesta.promedioExtras);

  const base =
    `La misma señal apareció en ${cantidad} ${plural(cantidad, "historia", "historias")} ` +
    `distintas de nivel ${nivel}. En la fase «${foco.fase}» necesitó una media de ${promedio} ` +
    `${plural(numero(propuesta.promedioExtras), "intento adicional", "intentos adicionales")} por historia.`;

  return propuesta.decisionFamilia
    ? `${base} Además, la familia marcó al menos una de esas historias para reforzar.`
    : base;
}

function totalPaginasPropuestas() {
  return Math.max(1, Math.ceil(propuestas.length / TAMANO_PAGINA_PROPUESTAS));
}

function propuestasPaginaActual() {
  const paginas = totalPaginasPropuestas();
  if (paginaPropuestas > paginas) paginaPropuestas = paginas;
  if (paginaPropuestas < 1) paginaPropuestas = 1;

  const inicio = (paginaPropuestas - 1) * TAMANO_PAGINA_PROPUESTAS;
  return propuestas.slice(inicio, inicio + TAMANO_PAGINA_PROPUESTAS);
}

function asegurarControlesPropuestas() {
  const lista = $("listaRefuerzosDetectives");
  if (!lista) return null;

  let controles = $("controlesRefuerzosDetectives");
  if (!controles) {
    controles = document.createElement("div");
    controles.id = "controlesRefuerzosDetectives";
    controles.className = "refuerzo-controles";
    controles.innerHTML = `
      <div class="refuerzo-controles__principal">
        <strong>Propuestas disponibles</strong>
        <small>Se muestran en bloques de ${TAMANO_PAGINA_PROPUESTAS} para facilitar la revisión.</small>
      </div>
      <div class="refuerzo-controles__acciones">
        <span id="contadorRefuerzosDetectives" class="refuerzo-contador"></span>
      </div>
    `;
    lista.parentElement.insertBefore(controles, lista);
  }

  return controles;
}

function asegurarPaginadorPropuestas() {
  const lista = $("listaRefuerzosDetectives");
  if (!lista) return null;

  let paginador = $("paginadorRefuerzosDetectives");
  if (!paginador) {
    paginador = document.createElement("nav");
    paginador.id = "paginadorRefuerzosDetectives";
    paginador.className = "refuerzo-paginador";
    paginador.setAttribute("aria-label", "Paginación de propuestas de Detectives");
    lista.insertAdjacentElement("afterend", paginador);
  }

  return paginador;
}

function actualizarContadorPropuestas() {
  const contador = $("contadorRefuerzosDetectives");
  if (!contador) return;

  if (!propuestas.length) {
    contador.textContent = "0 propuestas";
    return;
  }

  const inicio = (paginaPropuestas - 1) * TAMANO_PAGINA_PROPUESTAS + 1;
  const fin = Math.min(
    paginaPropuestas * TAMANO_PAGINA_PROPUESTAS,
    propuestas.length
  );
  contador.textContent = `${inicio}–${fin} de ${propuestas.length}`;
}

function renderPaginadorPropuestas() {
  const paginador = asegurarPaginadorPropuestas();
  if (!paginador) return;

  if (!propuestas.length || propuestas.length <= TAMANO_PAGINA_PROPUESTAS) {
    paginador.classList.add("hidden");
    paginador.innerHTML = "";
    return;
  }

  const paginas = totalPaginasPropuestas();
  paginador.classList.remove("hidden");

  const botones = Array.from({ length: paginas }, (_, indice) => indice + 1)
    .map(numeroPagina => `
      <button
        type="button"
        class="refuerzo-pagina ${numeroPagina === paginaPropuestas ? "active" : ""}"
        data-pagina-refuerzo-detectives="${numeroPagina}"
        aria-label="Página ${numeroPagina}"
        ${numeroPagina === paginaPropuestas ? 'aria-current="page"' : ""}
      >
        ${numeroPagina}
      </button>
    `).join("");

  paginador.innerHTML = `
    <button
      type="button"
      class="refuerzo-pagina refuerzo-pagina--nav"
      data-pagina-refuerzo-detectives="${Math.max(1, paginaPropuestas - 1)}"
      ${paginaPropuestas <= 1 ? "disabled" : ""}
    >
      ← Anterior
    </button>

    <div class="refuerzo-paginador__numeros">${botones}</div>

    <button
      type="button"
      class="refuerzo-pagina refuerzo-pagina--nav"
      data-pagina-refuerzo-detectives="${Math.min(paginas, paginaPropuestas + 1)}"
      ${paginaPropuestas >= paginas ? "disabled" : ""}
    >
      Siguiente →
    </button>
  `;

  paginador.querySelectorAll("[data-pagina-refuerzo-detectives]").forEach(button => {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      paginaPropuestas = Number(button.dataset.paginaRefuerzoDetectives) || 1;
      renderPropuestas(metaPropuestas);
      $("tituloRefuerzosDetectives")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

function ocultarNavegacionPropuestas() {
  $("controlesRefuerzosDetectives")?.classList.add("hidden");
  const paginador = asegurarPaginadorPropuestas();
  paginador?.classList.add("hidden");
}

function renderPropuestas(meta = {}) {
  const estado = $("estadoRefuerzosDetectives");
  const lista = $("listaRefuerzosDetectives");
  if (!estado || !lista) return;

  metaPropuestas = meta;

  if (!meta.historiasAnalizadas) {
    estado.classList.add("hidden");
    ocultarNavegacionPropuestas();
    lista.innerHTML = `
      <div class="refuerzo-vacio">
        Todavía no hay resoluciones de Detectives suficientes para preparar propuestas de refuerzo.
      </div>
    `;
    return;
  }

  if (!propuestas.length) {
    estado.classList.add("hidden");
    ocultarNavegacionPropuestas();
    lista.innerHTML = `
      <div class="refuerzo-vacio">
        No hay señales repetidas suficientes para proponer un refuerzo de Detectives ahora.
        Una sola respuesta incorrecta no se convierte automáticamente en una necesidad de refuerzo.
      </div>
    `;
    if (meta.erroresSesiones) {
      lista.insertAdjacentHTML(
        "beforeend",
        `<div class="refuerzo-aviso">No se pudieron revisar ${meta.erroresSesiones} ${plural(meta.erroresSesiones, "historia", "historias")} por completo. Las demás sí fueron analizadas.</div>`
      );
    }
    return;
  }

  estado.classList.add("hidden");
  asegurarControlesPropuestas()?.classList.remove("hidden");
  actualizarContadorPropuestas();

  const pagina = propuestasPaginaActual();

  lista.innerHTML = pagina.map(propuesta => {
    const foco = FOCOS[propuesta.foco] || FOCOS.general;
    const fuentes = propuesta.soportes.slice(0, 3);
    const restantes = Math.max(0, propuesta.soportes.length - fuentes.length);

    return `
      <article class="refuerzo-detectives ${propuesta.decisionFamilia ? "refuerzo-detectives--familia" : ""}">
        <div class="refuerzo-detectives__cabecera">
          <div class="refuerzo-detectives__icono" aria-hidden="true">${foco.icono}</div>
          <div>
            <h4>${escapar(foco.titulo)}</h4>
            <div class="refuerzo-detectives__meta">
              <span>🌱 Nivel ${propuesta.nivel}</span>
              <span>🎯 ${textoDecimal(propuesta.promedioExtras)} intentos adicionales de media</span>
              <span>${propuesta.soportes.length} ${plural(propuesta.soportes.length, "historia observada", "historias observadas")}</span>
              ${propuesta.decisionFamilia ? "<span>👨‍👩‍👧 Señal familiar</span>" : ""}
            </div>
          </div>
        </div>

        <p class="refuerzo-detectives__observacion">${escapar(textoObservacion(propuesta))}</p>

        <div class="refuerzo-detectives__fuentes">
          <strong>Trabajo que sustenta la propuesta</strong>
          <ul>
            ${fuentes.map(item => `<li>${escapar(item.titulo)}</li>`).join("")}
            ${restantes ? `<li>y ${restantes} ${plural(restantes, "historia más", "historias más")}</li>` : ""}
          </ul>
        </div>

        <div class="refuerzo-detectives__acciones">
          <small>La Misión se preparará oculta. La familia decide cuándo mostrarla en Mi Camino.</small>
          <button
            class="btn primaria"
            type="button"
            data-crear-refuerzo-detectives="${escapar(propuesta.clave)}"
            ${propuesta.yaPreparada ? "disabled" : ""}
          >
            ${propuesta.yaPreparada ? "✅ Misión ya preparada" : "✨ Preparar misión de refuerzo"}
          </button>
        </div>
      </article>
    `;
  }).join("");

  if (meta.erroresSesiones) {
    lista.insertAdjacentHTML(
      "beforeend",
      `<div class="refuerzo-aviso">No se pudieron revisar ${meta.erroresSesiones} ${plural(meta.erroresSesiones, "historia", "historias")} por completo. Las demás sí fueron analizadas.</div>`
    );
  }

  lista.querySelectorAll("[data-crear-refuerzo-detectives]").forEach(button => {
    button.addEventListener("click", () => {
      const propuesta = propuestas.find(item => item.clave === button.dataset.crearRefuerzoDetectives);
      if (!propuesta) return;
      crearMisionRefuerzo(propuesta, button);
    });
  });

  renderPaginadorPropuestas();
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

async function cambiarVisibilidadMision(tarea, visible, checkbox) {
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
      "No se pudo cambiar la visibilidad de la Misión de Detectives.\n" +
      `Razón: ${error.message || "Error no identificado"}`
    );
  } finally {
    checkbox.disabled = false;
  }
}

function renderMisionesPreparadas() {
  const lista = $("listaMisionesRefuerzoDetectives");
  if (!lista) return;

  const activas = misionesRefuerzo.filter(tarea => !estadoCerrado(tarea));
  if (!activas.length) {
    lista.innerHTML = `
      <div class="refuerzo-vacio">
        No hay Misiones de refuerzo de Detectives pendientes de gestión.
      </div>
    `;
    return;
  }

  lista.innerHTML = activas.map(tarea => {
    const cfg = configuracionRefuerzo(tarea);
    const foco = FOCOS[cfg.foco] || FOCOS.general;
    const visible = tarea.visibleParaAlumno !== false;
    const cantidad = Number(tarea.criterioCumplimiento?.cantidadObjetivo || tarea.progreso?.cantidadObjetivo || CANTIDAD_REFUERZO);

    return `
      <article class="mision-refuerzo-detectives">
        <div class="mision-refuerzo-detectives__cabecera">
          <div>
            <h4>${foco.icono} ${escapar(tarea.titulo || "Misión de refuerzo de Detectives")}</h4>
            <div class="refuerzo-detectives__meta">
              <span>🌱 Nivel ${Number(cfg.nivel || 1)}</span>
              <span>${cantidad} ${plural(cantidad, "historia", "historias")}</span>
              <span>${visible ? "👁️ Visible en Mi Camino" : "🔒 Aún no visible"}</span>
            </div>
          </div>
          <span class="mision-refuerzo-detectives__estado">${escapar(tarea.estado || "pendiente")}</span>
        </div>

        <p>${escapar(tarea.descripcion || foco.objetivo)}</p>

        <label class="mision-refuerzo-detectives__visibilidad">
          <input
            type="checkbox"
            data-visibilidad-refuerzo-detectives="${escapar(tarea.id)}"
            ${visible ? "checked" : ""}
          >
          <span>Mostrar en Mi Camino</span>
        </label>
      </article>
    `;
  }).join("");

  lista.querySelectorAll("[data-visibilidad-refuerzo-detectives]").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const tarea = misionesRefuerzo.find(item => item.id === checkbox.dataset.visibilidadRefuerzoDetectives);
      if (!tarea) return;
      cambiarVisibilidadMision(tarea, checkbox.checked, checkbox);
    });
  });
}

async function crearMisionRefuerzo(propuesta, button) {
  const foco = FOCOS[propuesta.foco] || FOCOS.general;
  const textoOriginal = button.textContent;
  button.disabled = true;
  button.textContent = "Preparando Misión...";

  try {
    const tareasActuales = await Academia.tareas.leer();
    const duplicada = tareasActuales.some(tarea => {
      if (!esMisionRefuerzoDetectives(tarea) || estadoCerrado(tarea)) return false;
      const cfg = configuracionRefuerzo(tarea);
      return clavePropuesta(cfg.nivel, cfg.foco) === propuesta.clave;
    });

    if (duplicada) {
      throw new Error("ya existe una Misión activa para este mismo foco y nivel");
    }

    const titulo = `Detectives · ${foco.titulo}`;
    const cantidad = CANTIDAD_REFUERZO;

    await Academia.tareas.crear({
      titulo,
      descripcion:
        `Misión propuesta a partir de trabajo observado en Detectives. Foco: ${foco.titulo}.`,
      tipo: "actividad_modulo",
      modulo: "detectives",
      destinoUrl: "../aventuras-matematicas/detectives/",
      objetivo: foco.objetivo,
      criterioFinalizacion:
        `Resolver ${cantidad} ${plural(cantidad, "historia", "historias")} de Detectives de nivel ${propuesta.nivel}. La finalización no exige perfección.`,
      criterioCumplimiento: {
        tipo: "cantidad",
        modulo: "detectives",
        evidenciaTipo: "historia_resuelta",
        cantidadObjetivo: cantidad,
        filtros: { nivel: propuesta.nivel }
      },
      requiereRevision: true,
      tiempoEstimadoMinutos: Math.max(10, cantidad * 5),
      prioridad: "normal",
      estado: "pendiente",
      visibleParaAlumno: false,
      ordenMision: 9999,
      presentacionAlumno: {
        icono: foco.icono,
        tituloMision: titulo,
        descripcionMision: foco.descripcionAlumno,
        mensaje: "🦜 Las palabras dan pistas; la historia decide. Avanza paso a paso y usa una pista si la necesitas."
      },
      progreso: { cantidadObjetivo: cantidad },
      evidencia: {
        tipo: "refuerzo_detectives",
        modulo: "detectives",
        referenciaId: null,
        resumen: `${cantidad} ${plural(cantidad, "historia", "historias")} · Nivel ${propuesta.nivel} · ${foco.titulo}`,
        configuracion: {
          origen: "detectives",
          foco: propuesta.foco,
          nivel: propuesta.nivel,
          cantidadHistorias: cantidad,
          decisionFamilia: propuesta.decisionFamilia,
          historiasOrigen: propuesta.soportes.map(item => ({
            historiaId: item.historiaId,
            sesionId: item.sesionId,
            titulo: item.titulo,
            intentosAdicionalesEnFoco: numero(item.extras),
            decisionFamilia: Boolean(item.decisionFamilia)
          }))
        }
      }
    });

    $("estadoRefuerzosDetectives").classList.remove("hidden");
    $("estadoRefuerzosDetectives").textContent =
      "✅ Misión preparada. Mostrar en Mi Camino = No. Revísala en el bloque de Misiones preparadas.";

    await cargarTodo({ silencioso: true });
  } catch (error) {
    alert(
      "No se pudo preparar la Misión de refuerzo de Detectives.\n" +
      `Razón: ${error.message || "Error no identificado"}`
    );
    button.disabled = false;
    button.textContent = textoOriginal;
  }
}

async function cargarTodo({ silencioso = false } = {}) {
  if (cargando) return;
  cargando = true;

  const estado = $("estadoRefuerzosDetectives");
  const lista = $("listaRefuerzosDetectives");

  if (!silencioso && estado && lista) {
    estado.classList.remove("hidden");
    estado.textContent = "🦜 Lía está revisando las últimas resoluciones de Detectives...";
    lista.innerHTML = "";
  }

  try {
    const meta = await leerDatosDetectives();
    metaPropuestas = meta;
    renderMisionesPreparadas();
    renderPropuestas(meta);
  } catch (error) {
    if (estado) estado.classList.add("hidden");
    if (lista) {
      lista.innerHTML = `
        <div class="refuerzo-error">
          No fue posible preparar las propuestas de Detectives.<br>
          Razón: ${escapar(error.message || "Error no identificado")}
        </div>
      `;
    }
  } finally {
    cargando = false;
  }
}

function crearGrupoRefuerzo({ id, icono, modulo, tema, encabezados = [] }) {
  if ($(id)) return;

  const secciones = encabezados
    .map(encabezadoId => $(encabezadoId)?.closest(".refuerzo-bloque"))
    .filter(Boolean);

  if (!secciones.length) return;

  const primera = secciones[0];
  const grupo = document.createElement("details");
  grupo.id = id;
  grupo.className = "grupo-refuerzo superficie";
  grupo.innerHTML = `
    <summary class="grupo-refuerzo__summary">
      <span class="grupo-refuerzo__icono" aria-hidden="true">${escapar(icono)}</span>
      <span class="grupo-refuerzo__texto">
        <strong>${escapar(modulo)}</strong>
        <small>${escapar(tema)}</small>
      </span>
      <span class="grupo-refuerzo__flecha" aria-hidden="true">⌄</span>
    </summary>
    <div class="grupo-refuerzo__contenido"></div>
  `;

  primera.parentElement.insertBefore(grupo, primera);
  const contenido = grupo.querySelector(".grupo-refuerzo__contenido");
  secciones.forEach(seccion => contenido.appendChild(seccion));
}

function configurarAcordeonExclusivo() {
  document.querySelectorAll("#panelRefuerzos .grupo-refuerzo").forEach(grupo => {
    if (grupo.dataset.acordeonExclusivo === "true") return;
    grupo.dataset.acordeonExclusivo = "true";

    grupo.addEventListener("toggle", () => {
      if (!grupo.open) return;
      document.querySelectorAll("#panelRefuerzos .grupo-refuerzo[open]").forEach(otro => {
        if (otro !== grupo) otro.open = false;
      });
    });
  });
}

function crearSubgrupoRefuerzo({ id, icono, titulo, encabezadoId }) {
  if ($(id)) return;

  const seccion = $(encabezadoId)?.closest(".refuerzo-bloque");
  if (!seccion) return;

  const subgrupo = document.createElement("details");
  subgrupo.id = id;
  subgrupo.className = "subgrupo-refuerzo";
  subgrupo.innerHTML = `
    <summary class="subgrupo-refuerzo__summary">
      <span class="subgrupo-refuerzo__icono" aria-hidden="true">${escapar(icono)}</span>
      <strong>${escapar(titulo)}</strong>
      <span class="subgrupo-refuerzo__flecha" aria-hidden="true">⌄</span>
    </summary>
    <div class="subgrupo-refuerzo__contenido"></div>
  `;

  seccion.parentElement.insertBefore(subgrupo, seccion);
  subgrupo.querySelector(".subgrupo-refuerzo__contenido").appendChild(seccion);
}

function configurarSubgruposRefuerzo() {
  crearSubgrupoRefuerzo({
    id: "subgrupoMisionesDetectives",
    icono: "📋",
    titulo: "Misiones preparadas",
    encabezadoId: "tituloMisionesRefuerzoDetectives"
  });

  crearSubgrupoRefuerzo({
    id: "subgrupoSugeridasDetectives",
    icono: "🌱",
    titulo: "Misiones sugeridas",
    encabezadoId: "tituloRefuerzosDetectives"
  });

  crearSubgrupoRefuerzo({
    id: "subgrupoMisionesLectura",
    icono: "📋",
    titulo: "Misiones preparadas",
    encabezadoId: "tituloMisionesPronunciacion"
  });

  crearSubgrupoRefuerzo({
    id: "subgrupoSugeridasLectura",
    icono: "🌱",
    titulo: "Misiones sugeridas",
    encabezadoId: "tituloPalabrasSugeridas"
  });
}

function agruparPanelRefuerzos() {
  crearGrupoRefuerzo({
    id: "grupoRefuerzoDetectives",
    icono: "🧩",
    modulo: "Aventuras Matemáticas",
    tema: "Detectives de Problemas · propuestas de refuerzo",
    encabezados: [
      "tituloMisionesRefuerzoDetectives",
      "tituloRefuerzosDetectives"
    ]
  });

  crearGrupoRefuerzo({
    id: "grupoRefuerzoLectura",
    icono: "📖",
    modulo: "Mi Rincón de Lectura",
    tema: "Pronunciación · palabras sugeridas para reforzar",
    encabezados: [
      "tituloMisionesPronunciacion",
      "tituloPalabrasSugeridas"
    ]
  });

  configurarSubgruposRefuerzo();
  configurarAcordeonExclusivo();
}

function actualizarTextoCriterioRefuerzo() {
  const explicacion = document.querySelector("#tituloRefuerzosDetectives + p");
  if (!explicacion) return;

  explicacion.textContent =
    "Una propuesta automática necesita que la misma dificultad aparezca en al menos dos historias distintas del mismo nivel. La repetición confirma la necesidad; la media de intentos adicionales determina su prioridad.";
}

function inicializar() {
  actualizarTextoCriterioRefuerzo();
  agruparPanelRefuerzos();
  $("actualizarRefuerzosDetectives")?.addEventListener("click", () => {
    paginaPropuestas = 1;
    cargarTodo();
  });

  document.querySelectorAll("[data-tab]").forEach(tab => {
    tab.addEventListener("click", () => {
      if (tab.dataset.tab !== "refuerzos") return;
      window.setTimeout(() => cargarTodo(), 0);
    });
  });
}

inicializar();