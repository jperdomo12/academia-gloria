import { Academia } from "../../compartido/api/academia.js";

const $ = id => document.getElementById(id);
const ESTADOS_CERRADOS = new Set(["completada", "cancelada"]);
let candidatos = [];
let misionesPronunciacion = [];
let cargando = false;
let sincronizacionInicialCompleta = false;
let timerDecoracion = null;

const TAMANO_PAGINA = 5;
let filtroRefuerzo = "todas";
let paginaRefuerzo = 1;
const seleccionClaves = new Set();
const frasesEditadas = new Map();
let misionEditandoId = "";
let vistaPalabras = "refuerzo";
const palabrasManuales = new Map();
let mostrarFormularioManual = false;

function escapar(valor = "") {
  return String(valor).replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caracter]);
}

function normalizarClavePalabra(valor = "") {
  return String(valor)
    .trim()
    .toLocaleLowerCase("es-ES")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}'’-]+/gu, " ")
    .trim();
}

function fechaComparable(valor) {
  if (!valor) return 0;
  if (typeof valor.toMillis === "function") return valor.toMillis();
  if (typeof valor.toDate === "function") return valor.toDate().getTime();
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? 0 : fecha.getTime();
}

function formatearFecha(valor) {
  const tiempo = fechaComparable(valor);
  if (!tiempo) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(tiempo));
}

function esMisionLectura(tarea = {}) {
  return tarea.modulo === "rincon-lectura" &&
    tarea.criterioCumplimiento?.evidenciaTipo === "lectura_completada";
}

function esMisionPronunciacion(tarea = {}) {
  return tarea.modulo === "rincon-lectura" &&
    tarea.criterioCumplimiento?.evidenciaTipo === "pronunciacion_completada" &&
    tarea.criterioCumplimiento?.filtros?.practica === "pronunciacion";
}

function fraseContienePalabra(frase = "", palabra = "") {
  const objetivo = normalizarClavePalabra(palabra);
  if (!objetivo) return false;

  return normalizarClavePalabra(frase)
    .split(/\s+/)
    .includes(objetivo);
}

function fraseDesdeTextoOriginal(texto = "", palabra = "") {
  const limpia = String(texto || "")
    .replace(/\s+/g, " ")
    .trim();

  if (!limpia) return "";

  const candidatas = limpia
    .split(/(?<=[.!?])\s+/)
    .map(frase => frase.trim())
    .filter(Boolean)
    .filter(frase => fraseContienePalabra(frase, palabra))
    .filter(frase => frase.length <= 135)
    .sort((a, b) => a.length - b.length);

  return candidatas[0] || "";
}

function fraseSugerida(itemOPalabra = "") {
  const item = typeof itemOPalabra === "object" && itemOPalabra
    ? itemOPalabra
    : { palabra: String(itemOPalabra || "") };

  const palabra = String(item.palabra || "").trim();
  if (!palabra) return "";

  const desdeLecturas = (Array.isArray(item.ocurrencias) ? item.ocurrencias : [])
    .filter(origen => origen.origenTipo === "lectura")
    .map(origen => fraseDesdeTextoOriginal(origen.textoOriginal, palabra))
    .filter(Boolean)
    .sort((a, b) => a.length - b.length);

  if (desdeLecturas.length) return desdeLecturas[0];

  return `Vamos a practicar la palabra «${palabra}».`;
}

function clasificacionCandidato(item = {}) {
  const superada = estadoSuperado(item.ultima?.estado);
  const intentos = Math.max(0, Number(item.ultima?.intentos || 0));

  if (!superada) return "no_superadas";
  if (intentos > 2) return "mas_dos_intentos";
  if (intentos === 2) return "dos_intentos";
  return "otras";
}

function candidatosFiltrados() {
  const base = candidatos.filter(item => {
    const clasificacion = clasificacionCandidato(item);
    if (vistaPalabras === "superadas") {
      return clasificacion === "otras";
    }
    return clasificacion !== "otras";
  });

  if (vistaPalabras === "superadas") return base;
  if (filtroRefuerzo === "todas") return base;
  return base.filter(item => clasificacionCandidato(item) === filtroRefuerzo);
}

function totalPaginasRefuerzo() {
  return Math.max(1, Math.ceil(candidatosFiltrados().length / TAMANO_PAGINA));
}

function candidatosPaginaActual() {
  const filtrados = candidatosFiltrados();
  const totalPaginas = totalPaginasRefuerzo();

  if (paginaRefuerzo > totalPaginas) paginaRefuerzo = totalPaginas;
  if (paginaRefuerzo < 1) paginaRefuerzo = 1;

  const inicio = (paginaRefuerzo - 1) * TAMANO_PAGINA;
  return filtrados.slice(inicio, inicio + TAMANO_PAGINA);
}

function guardarFrasesPagina() {
  document.querySelectorAll("[data-frase-palabra]").forEach(input => {
    frasesEditadas.set(
      input.dataset.frasePalabra,
      String(input.value || "").trim()
    );
  });
}

function palabrasConfiguradas(tarea = {}) {
  const palabras = tarea.evidencia?.configuracion?.palabras;
  return Array.isArray(palabras) ? palabras : [];
}

function estadoSuperado(estado = "") {
  return ["superada", "success"].includes(String(estado));
}

async function leerDatosRefuerzo() {
  const [tareas, sesiones] = await Promise.all([
    Academia.tareas.leer(),
    Academia.rinconLectura.leerSesiones()
  ]);

  const misionesLectura = tareas.filter(esMisionLectura);
  misionesPronunciacion = tareas.filter(esMisionPronunciacion);

  const sesionesPorId = new Map();
  sesiones.forEach(sesion => {
    const id = String(sesion.id || sesion.historiaId || "").trim();
    const historiaId = String(sesion.historiaId || "").trim();
    if (id) sesionesPorId.set(id, sesion);
    if (historiaId) sesionesPorId.set(historiaId, sesion);
  });

  const resultadosLectura = await Promise.allSettled(
    misionesLectura.map(async mision => ({
      mision,
      evidencias: await Academia.tareas.leerEvidencias(mision.id)
    }))
  );

  const resultadosPronunciacion = await Promise.allSettled(
    misionesPronunciacion.map(async mision => ({
      mision,
      evidencias: await Academia.tareas.leerEvidencias(mision.id)
    }))
  );

  const errores = [...resultadosLectura, ...resultadosPronunciacion]
    .filter(item => item.status === "rejected");
  const porPalabra = new Map();

  function agregarOcurrencia(clave, palabra, ocurrencia) {
    const actual = porPalabra.get(clave) || {
      clave,
      palabra,
      ocurrencias: []
    };
    if (!actual.ocurrencias.some(item => item.firma === ocurrencia.firma)) {
      actual.ocurrencias.push(ocurrencia);
    }
    porPalabra.set(clave, actual);
  }

  resultadosLectura.forEach(resultado => {
    if (resultado.status !== "fulfilled") return;
    const { mision, evidencias } = resultado.value;

    evidencias
      .filter(evidencia =>
        evidencia.modulo === "rincon-lectura" &&
        evidencia.tipo === "lectura_completada"
      )
      .forEach(evidencia => {
        const sesionId = String(
          evidencia.sesionId || evidencia.actividadId || ""
        ).trim();
        const sesion = sesionesPorId.get(sesionId);
        if (!sesion) return;

        const palabras = Array.isArray(sesion.analisisLectura?.palabrasParaCrecer)
          ? sesion.analisisLectura.palabrasParaCrecer
          : [];

        palabras.forEach(resultadoPalabra => {
          const palabra = String(resultadoPalabra?.palabra || "").trim();
          const clave = normalizarClavePalabra(palabra);
          if (!clave) return;

          const fecha = sesion.actualizadaEn || sesion.creadaEn || evidencia.ocurridaEn || null;
          const ocurrencia = {
            palabra,
            origenTipo: "lectura",
            estado: String(resultadoPalabra?.estado || "pendiente"),
            intentos: Math.max(0, Number(resultadoPalabra?.intentos || 0)),
            misionId: String(mision.id || ""),
            misionTitulo: String(mision.titulo || "Misión de lectura"),
            sesionId,
            historiaId: String(sesion.historiaId || sesionId),
            tituloLectura: String(sesion.titulo || "Lectura"),
            textoOriginal: String(sesion.textoOriginal || ""),
            fecha,
            fechaMs: Math.max(
              fechaComparable(sesion.actualizadaEn || sesion.creadaEn),
              fechaComparable(evidencia.ocurridaEn)
            ),
            firma: `lectura|${mision.id}|${sesionId}|${resultadoPalabra?.estado}|${resultadoPalabra?.intentos}`
          };
          agregarOcurrencia(clave, palabra, ocurrencia);
        });
      });
  });

  // La evolución posterior también cuenta: si una palabra ya fue reforzada,
  // el resultado de esa práctica se convierte en la señal más reciente.
  resultadosPronunciacion.forEach(resultado => {
    if (resultado.status !== "fulfilled") return;
    const { mision, evidencias } = resultado.value;

    evidencias
      .filter(evidencia =>
        evidencia.modulo === "rincon-lectura" &&
        evidencia.tipo === "pronunciacion_completada"
      )
      .forEach(evidencia => {
        const fecha = evidencia.ocurridaEn || evidencia.creadaEn || null;
        const resultados = Array.isArray(evidencia.resultado?.palabras)
          ? evidencia.resultado.palabras
          : [];

        resultados.forEach(item => {
          const palabra = String(item?.palabra || "").trim();
          const clave = normalizarClavePalabra(palabra);
          if (!clave || !porPalabra.has(clave)) return;
          const intentos = Math.max(0, Number(item.intentosPalabra || 0));
          const superada = Boolean(item.superadaPalabra);
          const ocurrencia = {
            palabra,
            origenTipo: "refuerzo",
            estado: superada ? "superada" : "en_practica",
            intentos,
            misionId: String(mision.id || ""),
            misionTitulo: String(mision.titulo || "Misión de pronunciación"),
            sesionId: String(evidencia.id || evidencia.evidenciaId || ""),
            historiaId: "",
            tituloLectura: "Refuerzo de pronunciación",
            fecha,
            fechaMs: fechaComparable(fecha),
            firma: `refuerzo|${mision.id}|${evidencia.id || evidencia.evidenciaId || ""}|${palabra}`
          };
          agregarOcurrencia(clave, palabra, ocurrencia);
        });
      });
  });

  const clavesAsignadas = new Set();
  misionesPronunciacion
    .filter(tarea => !ESTADOS_CERRADOS.has(tarea.estado))
    .forEach(tarea => {
      palabrasConfiguradas(tarea).forEach(item => {
        const clave = normalizarClavePalabra(item?.palabra);
        if (clave) clavesAsignadas.add(clave);
      });
    });

  candidatos = [...porPalabra.values()]
    .map(item => {
      const ocurrencias = [...item.ocurrencias].sort((a, b) => b.fechaMs - a.fechaMs);
      const ultima = ocurrencias[0];
      const superada = estadoSuperado(ultima?.estado);
      const intentos = Math.max(0, Number(ultima?.intentos || 0));
      const prioridad = !superada ? "alta" : intentos > 1 ? "media" : "ninguna";
      const origenes = new Set(
        ocurrencias
          .filter(origen => origen.origenTipo === "lectura")
          .map(origen => origen.misionId)
      );

      return {
        ...item,
        palabra: ultima?.palabra || item.palabra,
        ocurrencias,
        ultima,
        prioridad,
        yaAsignada: clavesAsignadas.has(item.clave),
        cantidadMisionesOrigen: origenes.size
      };
    })
    .sort((a, b) => {
      const peso = prioridad => prioridad === "alta" ? 0 : 1;
      return peso(a.prioridad) - peso(b.prioridad) ||
        b.ultima.fechaMs - a.ultima.fechaMs ||
        a.palabra.localeCompare(b.palabra, "es");
    });

  const clavesDisponibles = new Set([
    ...candidatos
      .filter(item => !item.yaAsignada)
      .map(item => item.clave),
    ...[...palabrasManuales.keys()]
  ]);

  [...seleccionClaves].forEach(clave => {
    if (!clavesDisponibles.has(clave)) seleccionClaves.delete(clave);
  });

  return {
    erroresEvidencias: errores.length,
    totalMisionesLectura: misionesLectura.length
  };
}

function actualizarResumenSeleccion() {
  const cantidad = seleccionClaves.size;

  $("resumenSeleccionRefuerzos").textContent =
    `${cantidad} ${cantidad === 1 ? "palabra seleccionada" : "palabras seleccionadas"}`;
  $("crearMisionPronunciacion").disabled = cantidad === 0;

  const boton = $("seleccionarPaginaRefuerzos");
  if (boton) {
    const disponiblesPagina = candidatosPaginaActual()
      .filter(item => !item.yaAsignada);
    const todasSeleccionadas =
      disponiblesPagina.length > 0 &&
      disponiblesPagina.every(item => seleccionClaves.has(item.clave));

    boton.textContent = todasSeleccionadas
      ? "☐ Quitar selección de esta página"
      : "☑ Seleccionar esta página";
    boton.disabled = disponiblesPagina.length === 0;
  }
}

function asegurarControlesRefuerzo() {
  const lista = $("listaRefuerzos");
  if (!lista) return;

  let controles = $("controlesRefuerzos");
  if (!controles) {
    controles = document.createElement("div");
    controles.id = "controlesRefuerzos";
    controles.className = "refuerzo-controles";
    controles.innerHTML = `
      <div class="refuerzo-controles__principal">
        <div class="refuerzo-vistas" role="group" aria-label="Vista de palabras">
          <button type="button" class="refuerzo-vista" data-vista-palabras="refuerzo">
            🌱 Para reforzar
          </button>
          <button type="button" class="refuerzo-vista" data-vista-palabras="superadas">
            ✅ Palabras superadas
          </button>
        </div>

        <div class="refuerzo-filtros" role="group" aria-label="Filtrar palabras sugeridas">
          <button type="button" class="refuerzo-filtro" data-filtro-refuerzo="todas">Todas</button>
          <button type="button" class="refuerzo-filtro" data-filtro-refuerzo="no_superadas">No superadas</button>
          <button type="button" class="refuerzo-filtro" data-filtro-refuerzo="mas_dos_intentos">Superadas en +2 intentos</button>
          <button type="button" class="refuerzo-filtro" data-filtro-refuerzo="dos_intentos">Superadas en 2 intentos</button>
        </div>
      </div>

      <div class="refuerzo-controles__acciones">
        <button
          id="agregarPalabraManual"
          class="btn secundaria"
          type="button"
        >
          ＋ Agregar palabra manualmente
        </button>

        <button
          id="seleccionarPaginaRefuerzos"
          class="btn secundaria"
          type="button"
        >
          ☑ Seleccionar esta página
        </button>

        <span id="contadorRefuerzos" class="refuerzo-contador"></span>
      </div>
    `;

    lista.parentElement.insertBefore(controles, lista);

    controles.querySelectorAll("[data-vista-palabras]").forEach(button => {
      button.addEventListener("click", () => {
        guardarFrasesPagina();
        vistaPalabras = button.dataset.vistaPalabras;
        filtroRefuerzo = "todas";
        paginaRefuerzo = 1;
        renderCandidatos();
      });
    });

    controles.querySelectorAll("[data-filtro-refuerzo]").forEach(button => {
      button.addEventListener("click", () => {
        guardarFrasesPagina();
        filtroRefuerzo = button.dataset.filtroRefuerzo;
        paginaRefuerzo = 1;
        renderCandidatos();
      });
    });

    $("agregarPalabraManual").addEventListener("click", () => {
      mostrarFormularioManual = !mostrarFormularioManual;
      renderCandidatos();
    });

    $("seleccionarPaginaRefuerzos").addEventListener("click", () => {
      guardarFrasesPagina();

      const disponibles = candidatosPaginaActual()
        .filter(item => !item.yaAsignada);
      const todasSeleccionadas =
        disponibles.length > 0 &&
        disponibles.every(item => seleccionClaves.has(item.clave));

      disponibles.forEach(item => {
        if (todasSeleccionadas) seleccionClaves.delete(item.clave);
        else seleccionClaves.add(item.clave);
      });

      renderCandidatos();
    });
  }

  controles.querySelectorAll("[data-vista-palabras]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.vistaPalabras === vistaPalabras
    );
  });

  controles.querySelectorAll("[data-filtro-refuerzo]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.filtroRefuerzo === filtroRefuerzo
    );
    button.classList.toggle("hidden", vistaPalabras === "superadas");
  });

  const botonSeleccion = $("seleccionarPaginaRefuerzos");
  if (botonSeleccion) {
    botonSeleccion.classList.toggle("hidden", vistaPalabras === "superadas");
  }
}

function asegurarPaginadorRefuerzo() {
  const acciones = $("accionesRefuerzos");
  if (!acciones) return null;

  let paginador = $("paginadorRefuerzos");
  if (!paginador) {
    paginador = document.createElement("nav");
    paginador.id = "paginadorRefuerzos";
    paginador.className = "refuerzo-paginador";
    paginador.setAttribute("aria-label", "Paginación de palabras sugeridas");

    acciones.parentElement.insertBefore(paginador, acciones);
  }

  return paginador;
}

function renderPaginadorRefuerzo() {
  const paginador = asegurarPaginadorRefuerzo();
  if (!paginador) return;

  const total = candidatosFiltrados().length;
  const paginas = totalPaginasRefuerzo();

  if (!total) {
    paginador.classList.add("hidden");
    paginador.innerHTML = "";
    return;
  }

  paginador.classList.remove("hidden");

  const botones = Array.from({ length: paginas }, (_, indice) => indice + 1)
    .map(numero => `
      <button
        type="button"
        class="refuerzo-pagina ${numero === paginaRefuerzo ? "active" : ""}"
        data-pagina-refuerzo="${numero}"
        aria-label="Página ${numero}"
        ${numero === paginaRefuerzo ? 'aria-current="page"' : ""}
      >
        ${numero}
      </button>
    `).join("");

  paginador.innerHTML = `
    <button
      type="button"
      class="refuerzo-pagina refuerzo-pagina--nav"
      data-pagina-refuerzo="${Math.max(1, paginaRefuerzo - 1)}"
      ${paginaRefuerzo <= 1 ? "disabled" : ""}
    >
      ← Anterior
    </button>

    <div class="refuerzo-paginador__numeros">${botones}</div>

    <button
      type="button"
      class="refuerzo-pagina refuerzo-pagina--nav"
      data-pagina-refuerzo="${Math.min(paginas, paginaRefuerzo + 1)}"
      ${paginaRefuerzo >= paginas ? "disabled" : ""}
    >
      Siguiente →
    </button>
  `;

  paginador.querySelectorAll("[data-pagina-refuerzo]").forEach(button => {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      guardarFrasesPagina();
      paginaRefuerzo = Number(button.dataset.paginaRefuerzo) || 1;
      renderCandidatos();
      $("tituloPalabrasSugeridas")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}


function normalizarClaveManual(valor = "") {
  return normalizarClavePalabra(valor);
}

function fraseManualSugerida(palabra = "") {
  const limpia = String(palabra || "").trim();
  return limpia ? `Vamos a practicar la palabra «${limpia}».` : "";
}

function renderFormularioPalabraManual() {
  if (!mostrarFormularioManual) return "";

  return `
    <section class="refuerzo-manual" id="formularioPalabraManual">
      <div class="refuerzo-manual__cabecera">
        <div>
          <strong>＋ Agregar palabra del día a día</strong>
          <small>
            Úsala cuando la familia detecte una palabra que conviene practicar,
            aunque todavía no haya aparecido en una lectura.
          </small>
        </div>
      </div>

      <div class="refuerzo-manual__grid">
        <label>
          <span>Palabra</span>
          <input
            id="palabraManualTexto"
            type="text"
            maxlength="60"
            placeholder="Ej.: extraordinario"
          >
        </label>

        <label>
          <span>Frase de práctica</span>
          <input
            id="palabraManualFrase"
            type="text"
            maxlength="140"
            placeholder="Se sugerirá una frase al escribir la palabra."
          >
        </label>

        <label>
          <span>Observación familiar <em>(opcional)</em></span>
          <input
            id="palabraManualObservacion"
            type="text"
            maxlength="180"
            placeholder="Ej.: La escuchamos esta semana."
          >
        </label>
      </div>

      <div class="refuerzo-manual__acciones">
        <button id="cancelarPalabraManual" class="btn secundaria" type="button">
          Cancelar
        </button>
        <button id="guardarPalabraManual" class="btn primaria" type="button">
          ＋ Añadir a la selección
        </button>
      </div>
    </section>
  `;
}

function configurarFormularioPalabraManual() {
  const root = $("formularioPalabraManual");
  if (!root) return;

  const palabraInput = $("palabraManualTexto");
  const fraseInput = $("palabraManualFrase");
  const observacionInput = $("palabraManualObservacion");

  palabraInput?.addEventListener("input", () => {
    const palabra = String(palabraInput.value || "").trim();
    const previaAuto = fraseInput.dataset.auto === "true";

    if (!fraseInput.value.trim() || previaAuto) {
      fraseInput.value = fraseManualSugerida(palabra);
      fraseInput.dataset.auto = "true";
    }
  });

  fraseInput?.addEventListener("input", () => {
    fraseInput.dataset.auto = "false";
  });

  $("cancelarPalabraManual")?.addEventListener("click", () => {
    mostrarFormularioManual = false;
    renderCandidatos();
  });

  $("guardarPalabraManual")?.addEventListener("click", () => {
    const palabra = String(palabraInput?.value || "").trim();
    const clave = normalizarClaveManual(palabra);
    const frase = String(fraseInput?.value || "").trim() || fraseManualSugerida(palabra);
    const observacion = String(observacionInput?.value || "").trim();

    if (!palabra || !clave) {
      alert(
        "No se agregó la palabra.\n" +
        "Razón: escribe una palabra válida."
      );
      return;
    }

    const existente = candidatos.find(item => item.clave === clave);
    if (existente) {
      alert(
        "No se agregó una palabra duplicada.\n" +
        "Razón: esa palabra ya existe en el historial de Rincón. " +
        "Puedes seleccionarla desde su lista."
      );
      return;
    }

    palabrasManuales.set(clave, {
      clave,
      palabra,
      frasePractica: frase,
      observacionFamilia: observacion,
      origenTipo: "familia",
      ocurrencias: [{
        origenTipo: "familia",
        misionId: "",
        misionTitulo: "",
        sesionId: "",
        historiaId: "",
        tituloLectura: "Observación familiar",
        estado: "propuesta_familia",
        intentos: 0,
        textoOriginal: "",
        fecha: new Date(),
        fechaMs: Date.now(),
        observacionFamilia: observacion
      }],
      ultima: {
        origenTipo: "familia",
        estado: "propuesta_familia",
        intentos: 0,
        tituloLectura: "Observación familiar",
        fecha: new Date(),
        fechaMs: Date.now()
      },
      prioridad: "alta",
      yaAsignada: false,
      cantidadMisionesOrigen: 0,
      manual: true
    });

    seleccionClaves.add(clave);
    frasesEditadas.set(clave, frase);
    mostrarFormularioManual = false;
    renderCandidatos();
  });
}

function candidatosPaginaConManuales() {
  const pagina = candidatosPaginaConManuales();
  if (vistaPalabras !== "refuerzo" || paginaRefuerzo !== 1) return pagina;

  const manuales = [...palabrasManuales.values()]
    .filter(item => seleccionClaves.has(item.clave));

  return [...manuales, ...pagina].slice(0, TAMANO_PAGINA);
}

function renderCandidatos(meta = {}) {
  const estado = $("estadoRefuerzos");
  const lista = $("listaRefuerzos");
  const acciones = $("accionesRefuerzos");

  asegurarControlesRefuerzo();

  const filtrados = candidatosFiltrados();
  const pagina = candidatosPaginaActual();

  if (!candidatos.length && !palabrasManuales.size) {
    estado.classList.add("hidden");
    acciones.classList.add("hidden");
    $("controlesRefuerzos")?.classList.remove("hidden");
    asegurarPaginadorRefuerzo()?.classList.add("hidden");

    lista.innerHTML =
      renderFormularioPalabraManual() +
      `
        <div class="refuerzo-vacio">
          ✨ No hay palabras que cumplan ahora los criterios de refuerzo en las Misiones de lectura revisadas.
        </div>
      `;

    configurarFormularioPalabraManual();

    if (meta.erroresEvidencias > 0) {
      lista.insertAdjacentHTML(
        "beforeend",
        `<div class="refuerzo-aviso">Algunas Misiones no pudieron revisarse (${meta.erroresEvidencias}). Vuelve a actualizar para intentarlo de nuevo.</div>`
      );
    }

    return;
  }

  estado.classList.add("hidden");
  acciones.classList.remove("hidden");
  $("controlesRefuerzos")?.classList.remove("hidden");

  if ($("contadorRefuerzos")) {
    const inicio = filtrados.length
      ? (paginaRefuerzo - 1) * TAMANO_PAGINA + 1
      : 0;
    const fin = Math.min(
      paginaRefuerzo * TAMANO_PAGINA,
      filtrados.length
    );

    const totalMostrado = filtrados.length + (
      vistaPalabras === "refuerzo" ? palabrasManuales.size : 0
    );
    const inicioMostrado = pagina.length ? (paginaRefuerzo - 1) * TAMANO_PAGINA + 1 : 0;
    const finMostrado = Math.min(
      paginaRefuerzo * TAMANO_PAGINA,
      totalMostrado
    );

    $("contadorRefuerzos").textContent =
      `${inicioMostrado}–${finMostrado} de ${totalMostrado}`;
  }

  if (!pagina.length) {
    lista.innerHTML = `
      <div class="refuerzo-vacio">
        No hay palabras en este filtro.
      </div>
    `;
    renderPaginadorRefuerzo();
    actualizarResumenSeleccion();
    return;
  }

  lista.innerHTML = renderFormularioPalabraManual() + pagina.map(item => {
    const alta = item.prioridad === "alta";
    const intentos = Number(item.ultima?.intentos || 0);
    const origenes = item.cantidadMisionesOrigen;
    const esSuperada = clasificacionCandidato(item) === "otras";
    const resultado = item.manual
      ? "👨‍👩‍👧 Añadida por la familia"
      : esSuperada
        ? `✅ Superada en ${intentos || 1} ${intentos === 1 || !intentos ? "intento" : "intentos"}`
        : alta
          ? "🌱 No superada en la señal más reciente"
          : `🟠 Superada en ${intentos} ${intentos === 1 ? "intento" : "intentos"}`;
    const origenTexto = item.manual
      ? "Observación familiar"
      : `${origenes} ${origenes === 1 ? "Misión de lectura" : "Misiones de lectura"}`;
    const frase = frasesEditadas.has(item.clave)
      ? frasesEditadas.get(item.clave)
      : item.manual
        ? String(item.frasePractica || fraseManualSugerida(item.palabra))
        : fraseSugerida(item);
    const seleccionada = seleccionClaves.has(item.clave);

    return `
      <article class="refuerzo-palabra ${
        alta ? "refuerzo-palabra--alta" : "refuerzo-palabra--media"
      } ${item.yaAsignada ? "refuerzo-palabra--asignada" : ""}">
        <input
          class="refuerzo-palabra__check"
          type="checkbox"
          aria-label="Seleccionar ${escapar(item.palabra)}"
          data-refuerzo-palabra="${escapar(item.clave)}"
          ${item.yaAsignada ? "disabled" : ""}
          ${seleccionada && !item.yaAsignada ? "checked" : ""}
        >

        <div class="refuerzo-palabra__principal">
          <strong>${escapar(item.palabra)}</strong>
          <small>
            ${escapar(origenTexto)} · última señal:
            ${escapar(formatearFecha(item.ultima?.fecha))}
          </small>
          <small>
            Última señal: ${escapar(
              item.ultima?.origenTipo === "refuerzo"
                ? "práctica de refuerzo"
                : item.ultima?.tituloLectura || "Lectura"
            )}
          </small>

          <label>
            <span class="campo-opcional">Frase breve de práctica</span>
            <input
              class="refuerzo-palabra__frase"
              type="text"
              maxlength="140"
              data-frase-palabra="${escapar(item.clave)}"
              value="${escapar(frase)}"
              ${item.yaAsignada ? "disabled" : ""}
            >
          </label>
        </div>

        <div class="refuerzo-palabra__estado">
          ${item.yaAsignada ? "✅ Ya asignada" : resultado}
          <small>
            ${
              item.yaAsignada
                ? "Incluida en una Misión de pronunciación todavía activa."
                : "Disponible para una nueva Misión."
            }
          </small>
        </div>
      </article>
    `;
  }).join("");

  configurarFormularioPalabraManual();

  lista.querySelectorAll("input[data-refuerzo-palabra]").forEach(input => {
    input.addEventListener("change", () => {
      guardarFrasesPagina();

      if (input.checked) seleccionClaves.add(input.dataset.refuerzoPalabra);
      else seleccionClaves.delete(input.dataset.refuerzoPalabra);

      actualizarResumenSeleccion();
    });
  });

  lista.querySelectorAll("[data-frase-palabra]").forEach(input => {
    input.addEventListener("input", () => {
      frasesEditadas.set(
        input.dataset.frasePalabra,
        String(input.value || "").trim()
      );
    });
  });

  if (meta.erroresEvidencias > 0) {
    lista.insertAdjacentHTML(
      "beforeend",
      `<div class="refuerzo-aviso">Se omitieron ${meta.erroresEvidencias} Misiones que no pudieron leerse por completo. Las demás sí fueron revisadas.</div>`
    );
  }

  renderPaginadorRefuerzo();
  actualizarResumenSeleccion();
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
      "No se pudo cambiar la visibilidad de la Misión.\n" +
      `Razón: ${error.message || "Error no identificado"}`
    );
  } finally {
    checkbox.disabled = false;
  }
}

function palabrasDisponiblesParaAgregar(tarea = {}) {
  const actuales = new Set(
    palabrasConfiguradas(tarea)
      .map(item => normalizarClavePalabra(item.palabra))
      .filter(Boolean)
  );

  return [
    ...candidatos,
    ...palabrasManuales.values()
  ].filter(item =>
    !item.yaAsignada &&
    !actuales.has(item.clave)
  );
}

function renderEditorMisionPronunciacion(tarea) {
  const palabras = palabrasConfiguradas(tarea);
  const disponibles = palabrasDisponiblesParaAgregar(tarea);

  return `
    <div class="mision-pronunciacion__editor" data-editor-pronunciacion="${escapar(tarea.id)}">
      <div class="mision-pronunciacion__editor-grid">
        <label>
          <span>Título</span>
          <input
            type="text"
            maxlength="120"
            data-editar-titulo="${escapar(tarea.id)}"
            value="${escapar(tarea.titulo || "")}"
          >
        </label>

        <label>
          <span>Descripción</span>
          <textarea
            rows="3"
            maxlength="500"
            data-editar-descripcion="${escapar(tarea.id)}"
          >${escapar(tarea.descripcion || "")}</textarea>
        </label>
      </div>

      <div class="mision-pronunciacion__editor-palabras">
        <strong>Palabras de la Misión</strong>

        ${palabras.map((item, indice) => `
          <div class="mision-pronunciacion__editor-palabra">
            <span>${escapar(item.palabra || "")}</span>
            <input
              type="text"
              maxlength="140"
              data-editar-frase="${escapar(tarea.id)}"
              data-editar-frase-indice="${indice}"
              value="${escapar(item.frasePractica || "")}"
              aria-label="Frase de práctica para ${escapar(item.palabra || "")}"
            >
            <label class="mision-pronunciacion__quitar">
              <input
                type="checkbox"
                data-quitar-palabra="${escapar(tarea.id)}"
                value="${indice}"
              >
              Quitar
            </label>
          </div>
        `).join("")}
      </div>

      <div class="mision-pronunciacion__agregar">
        <label>
          <span>Agregar otra palabra disponible</span>
          <select data-agregar-palabra-select="${escapar(tarea.id)}">
            <option value="">Selecciona una palabra...</option>
            ${disponibles.map(item => `
              <option value="${escapar(item.clave)}">
                ${escapar(item.palabra)}
              </option>
            `).join("")}
          </select>
        </label>

        <label>
          <span>Frase de práctica</span>
          <input
            type="text"
            maxlength="140"
            data-agregar-palabra-frase="${escapar(tarea.id)}"
            placeholder="Selecciona una palabra para generar una frase."
            disabled
          >
        </label>

        <button
          class="btn secundaria"
          type="button"
          data-agregar-palabra="${escapar(tarea.id)}"
          ${disponibles.length ? "" : "disabled"}
        >
          ＋ Agregar palabra
        </button>
      </div>

      <div class="mision-pronunciacion__editor-acciones">
        <button
          class="btn secundaria"
          type="button"
          data-cancelar-edicion-pronunciacion="${escapar(tarea.id)}"
        >
          Cancelar
        </button>

        <button
          class="btn primaria"
          type="button"
          data-guardar-edicion-pronunciacion="${escapar(tarea.id)}"
        >
          💾 Guardar cambios
        </button>
      </div>
    </div>
  `;
}


function actualizarFraseNuevaPalabraEditor(tarea) {
  const id = String(tarea?.id || "").trim();
  if (!id) return;

  const select = document.querySelector(
    `[data-agregar-palabra-select="${CSS.escape(id)}"]`
  );
  const input = document.querySelector(
    `[data-agregar-palabra-frase="${CSS.escape(id)}"]`
  );

  if (!select || !input) return;

  const clave = String(select.value || "").trim();
  const candidato = [
    ...candidatos,
    ...palabrasManuales.values()
  ].find(item => item.clave === clave);

  if (!candidato) {
    input.value = "";
    input.disabled = true;
    input.placeholder = "Selecciona una palabra para generar una frase.";
    return;
  }

  input.disabled = false;
  input.value = String(
    frasesEditadas.get(candidato.clave) ||
    candidato.frasePractica ||
    fraseSugerida(candidato)
  ).trim();
}

async function guardarEdicionMisionPronunciacion(tarea, button) {
  const id = tarea.id;
  const titulo = String(
    document.querySelector(`[data-editar-titulo="${CSS.escape(id)}"]`)?.value || ""
  ).trim();
  const descripcion = String(
    document.querySelector(`[data-editar-descripcion="${CSS.escape(id)}"]`)?.value || ""
  ).trim();

  if (!titulo) {
    alert("No se pudieron guardar los cambios.\nRazón: la Misión necesita un título.");
    return;
  }

  const actuales = palabrasConfiguradas(tarea);
  const indicesQuitar = new Set(
    [...document.querySelectorAll(
      `[data-quitar-palabra="${CSS.escape(id)}"]:checked`
    )].map(input => Number(input.value))
  );

  const frasesInputs = new Map(
    [...document.querySelectorAll(
      `[data-editar-frase="${CSS.escape(id)}"]`
    )].map(input => [
      Number(input.dataset.editarFraseIndice),
      String(input.value || "").trim()
    ])
  );

  const palabras = actuales
    .map((item, indice) => ({ item, indice }))
    .filter(({ indice }) => !indicesQuitar.has(indice))
    .map(({ item, indice }) => ({
      ...item,
      frasePractica:
        frasesInputs.get(indice) ||
        String(item.frasePractica || "").trim() ||
        fraseSugerida(item.palabra)
    }));

  if (!palabras.length) {
    alert(
      "No se pudieron guardar los cambios.\n" +
      "Razón: una Misión de pronunciación debe conservar al menos una palabra."
    );
    return;
  }

  const textoOriginal = button.textContent;
  button.disabled = true;
  button.textContent = "Guardando...";

  try {
    await Academia.tareas.actualizar(id, {
      titulo,
      descripcion,
      presentacionAlumno: {
        ...(tarea.presentacionAlumno || {}),
        tituloMision: titulo
      },
      evidencia: {
        ...(tarea.evidencia || {}),
        resumen:
          `${palabras.length} ${palabras.length === 1 ? "palabra" : "palabras"} para practicar`,
        configuracion: {
          ...(tarea.evidencia?.configuracion || {}),
          palabras
        }
      }
    });

    misionEditandoId = "";
    await cargarTodo({ silencioso: true });
  } catch (error) {
    alert(
      "No se pudieron guardar los cambios.\n" +
      `Razón: ${error.message || "Error no identificado"}`
    );
    button.disabled = false;
    button.textContent = textoOriginal;
  }
}

async function agregarPalabraAMision(tarea, button) {
  const select = document.querySelector(
    `[data-agregar-palabra-select="${CSS.escape(tarea.id)}"]`
  );
  const clave = String(select?.value || "").trim();
  if (!clave) return;

  const candidato = [
    ...candidatos,
    ...palabrasManuales.values()
  ].find(item => item.clave === clave);
  if (!candidato) {
    alert(
      "No se pudo agregar la palabra.\n" +
      "Razón: la palabra ya no está disponible para esta Misión."
    );
    return;
  }

  const fraseInput = document.querySelector(
    `[data-agregar-palabra-frase="${CSS.escape(tarea.id)}"]`
  );
  const fraseElegida = String(fraseInput?.value || "").trim();

  const actuales = palabrasConfiguradas(tarea);
  const nueva = {
    palabra: candidato.palabra,
    frasePractica:
      fraseElegida ||
      frasesEditadas.get(candidato.clave) ||
      candidato.frasePractica ||
      fraseSugerida(candidato),
    origenes: candidato.ocurrencias.map(origen => ({
      misionId: origen.misionId,
      misionTitulo: origen.misionTitulo,
      sesionId: origen.sesionId,
      historiaId: origen.historiaId,
      tituloLectura: origen.tituloLectura,
      estado: origen.estado,
      intentos: origen.intentos
    }))
  };

  button.disabled = true;

  try {
    const palabras = [...actuales, nueva];

    await Academia.tareas.actualizar(tarea.id, {
      evidencia: {
        ...(tarea.evidencia || {}),
        resumen:
          `${palabras.length} ${palabras.length === 1 ? "palabra" : "palabras"} para practicar`,
        configuracion: {
          ...(tarea.evidencia?.configuracion || {}),
          palabras
        }
      }
    });

    await cargarTodo({ silencioso: true });
    misionEditandoId = tarea.id;
    renderMisionesPronunciacion();
  } catch (error) {
    alert(
      "No se pudo agregar la palabra.\n" +
      `Razón: ${error.message || "Error no identificado"}`
    );
  } finally {
    button.disabled = false;
  }
}

function renderMisionesPronunciacion() {
  const lista = $("listaMisionesPronunciacion");
  const preparadas = misionesPronunciacion.filter(
    tarea => !ESTADOS_CERRADOS.has(tarea.estado)
  );

  if (!preparadas.length) {
    lista.innerHTML = `
      <div class="refuerzo-vacio">
        No hay Misiones de pronunciación pendientes de gestión.
      </div>
    `;
    return;
  }

  lista.innerHTML = preparadas.map(tarea => {
    const palabras = palabrasConfiguradas(tarea);
    const visible = tarea.visibleParaAlumno !== false;
    const cerrada = ["completada", "cancelada"].includes(tarea.estado);
    const editando = misionEditandoId === tarea.id;

    return `
      <article class="mision-pronunciacion" data-mision-pronunciacion="${escapar(tarea.id)}">
        <div class="mision-pronunciacion__cabecera">
          <div>
            <h4>🗣️ ${escapar(tarea.titulo || "Misión de pronunciación")}</h4>
            <div class="mision-pronunciacion__meta">
              <span>${palabras.length} ${palabras.length === 1 ? "palabra" : "palabras"}</span>
              <span>${visible ? "👁️ Visible en Mi Camino" : "🔒 Aún no visible"}</span>
            </div>
          </div>
          <span class="mision-pronunciacion__estado">${escapar(tarea.estado || "pendiente")}</span>
        </div>

        ${editando && !cerrada
          ? renderEditorMisionPronunciacion(tarea)
          : `
            <ul class="mision-pronunciacion__palabras">
              ${palabras.map(item => `
                <li>
                  <strong>${escapar(item.palabra || "")}</strong>
                  — ${escapar(item.frasePractica || "")}
                </li>
              `).join("")}
            </ul>
          `
        }

        ${cerrada ? "" : `
          <div class="mision-pronunciacion__acciones">
            ${editando ? "" : `
              <button
                class="btn secundaria"
                type="button"
                data-editar-mision-pronunciacion="${escapar(tarea.id)}"
              >
                ✏️ Editar refuerzo
              </button>
            `}

            <label class="mision-pronunciacion__visibilidad">
              <input
                type="checkbox"
                data-visibilidad-pronunciacion="${escapar(tarea.id)}"
                ${visible ? "checked" : ""}
              >
              <span>Mostrar en Mi Camino</span>
            </label>
          </div>
        `}
      </article>
    `;
  }).join("");

  lista.querySelectorAll("[data-visibilidad-pronunciacion]").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const tarea = misionesPronunciacion.find(
        item => item.id === checkbox.dataset.visibilidadPronunciacion
      );
      if (!tarea) return;
      cambiarVisibilidadMision(tarea, checkbox.checked, checkbox);
    });
  });

  lista.querySelectorAll("[data-editar-mision-pronunciacion]").forEach(button => {
    button.addEventListener("click", () => {
      misionEditandoId = button.dataset.editarMisionPronunciacion;
      renderMisionesPronunciacion();
      document.querySelector(
        `[data-editor-pronunciacion="${CSS.escape(misionEditandoId)}"]`
      )?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  lista.querySelectorAll("[data-cancelar-edicion-pronunciacion]").forEach(button => {
    button.addEventListener("click", () => {
      misionEditandoId = "";
      renderMisionesPronunciacion();
    });
  });

  lista.querySelectorAll("[data-guardar-edicion-pronunciacion]").forEach(button => {
    button.addEventListener("click", () => {
      const tarea = misionesPronunciacion.find(
        item => item.id === button.dataset.guardarEdicionPronunciacion
      );
      if (!tarea) return;
      guardarEdicionMisionPronunciacion(tarea, button);
    });
  });

  lista.querySelectorAll("[data-agregar-palabra-select]").forEach(select => {
    select.addEventListener("change", () => {
      const tarea = misionesPronunciacion.find(
        item => item.id === select.dataset.agregarPalabraSelect
      );
      if (!tarea) return;
      actualizarFraseNuevaPalabraEditor(tarea);
    });
  });

  lista.querySelectorAll("[data-agregar-palabra]").forEach(button => {
    button.addEventListener("click", () => {
      const tarea = misionesPronunciacion.find(
        item => item.id === button.dataset.agregarPalabra
      );
      if (!tarea) return;
      agregarPalabraAMision(tarea, button);
    });
  });
}
function seleccionActual() {
  guardarFrasesPagina();

  const base = [
    ...candidatos,
    ...palabrasManuales.values()
  ];

  return base
    .filter(item => seleccionClaves.has(item.clave) && !item.yaAsignada)
    .map(item => {
      const frase = String(
        frasesEditadas.get(item.clave) ||
        item.frasePractica ||
        fraseSugerida(item)
      ).trim();

      return {
        ...item,
        frasePractica: frase
      };
    });
}
async function crearMisionPronunciacion() {
  const seleccionadas = seleccionActual();
  if (!seleccionadas.length) {
    alert("No se creó la Misión.\nRazón: selecciona al menos una palabra para practicar.");
    return;
  }

  const button = $("crearMisionPronunciacion");
  const textoOriginal = button.textContent;
  button.disabled = true;
  button.textContent = "Creando Misión...";

  try {
    const palabras = seleccionadas.map(item => ({
      palabra: item.palabra,
      frasePractica: item.frasePractica,
      origenes: item.ocurrencias.map(origen => ({
        misionId: origen.misionId,
        misionTitulo: origen.misionTitulo,
        sesionId: origen.sesionId,
        historiaId: origen.historiaId,
        tituloLectura: origen.tituloLectura,
        estado: origen.estado,
        intentos: origen.intentos,
        origenTipo: origen.origenTipo || "lectura",
        observacionFamilia: String(origen.observacionFamilia || "")
      }))
    }));

    const cantidad = palabras.length;
    const titulo = cantidad === 1
      ? `Practicar «${palabras[0].palabra}»`
      : `Practicar ${cantidad} palabras para crecer`;

    await Academia.tareas.crear({
      titulo,
      descripcion:
        "Misión creada por la Academia a partir de palabras observadas en Misiones anteriores de Mi Rincón de Lectura.",
      tipo: "actividad_modulo",
      modulo: "rincon-lectura",
      destinoUrl: "../rincon-lectura/",
      objetivo: "Practicar con calma la pronunciación de todas las palabras seleccionadas.",
      criterioFinalizacion:
        "Practicar cada palabra objetivo al menos una vez. El reconocimiento de voz es orientativo y no bloquea la finalización.",
      criterioCumplimiento: {
        tipo: "cantidad",
        modulo: "rincon-lectura",
        evidenciaTipo: "pronunciacion_completada",
        cantidadObjetivo: 1,
        filtros: { practica: "pronunciacion" }
      },
      requiereRevision: true,
      tiempoEstimadoMinutos: Math.max(5, Math.ceil(cantidad * 1.5)),
      prioridad: "normal",
      estado: "pendiente",
      visibleParaAlumno: false,
      ordenMision: 9999,
      presentacionAlumno: {
        icono: "🗣️",
        tituloMision: titulo,
        descripcionMision:
          "Vamos a practicar algunas palabras que aparecieron en tus aventuras de lectura.",
        mensaje: "🦜 Escucha cada palabra, repítela con calma y avanza a tu ritmo."
      },
      progreso: { cantidadObjetivo: 1 },
      evidencia: {
        tipo: "pronunciacion_palabras",
        modulo: "rincon-lectura",
        referenciaId: null,
        resumen: `${cantidad} ${cantidad === 1 ? "palabra" : "palabras"} para practicar`,
        configuracion: {
          practica: "pronunciacion",
          idioma: "es-ES",
          palabras
        }
      }
    });

    seleccionadas.forEach(item => {
      seleccionClaves.delete(item.clave);
      frasesEditadas.delete(item.clave);
      if (item.manual) palabrasManuales.delete(item.clave);
    });

    $("estadoRefuerzos").classList.remove("hidden");
    $("estadoRefuerzos").textContent =
      "✅ Misión creada. Mostrar en Mi Camino = No. Puedes revisarla en el bloque inferior.";

    await cargarTodo({ silencioso: true });
  } catch (error) {
    alert(
      "No se pudo crear la Misión de pronunciación.\n" +
      `Razón: ${error.message || "Error no identificado"}`
    );
  } finally {
    button.textContent = textoOriginal;
    actualizarResumenSeleccion();
  }
}

function abrirPanelRefuerzos() {
  $("panelLista")?.classList.add("hidden");
  $("panelCrear")?.classList.add("hidden");
  $("panelRefuerzos")?.classList.remove("hidden");
  document.querySelectorAll("[data-tab]").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === "refuerzos");
  });
}

function configurarTabsExternos() {
  document.querySelectorAll("[data-tab]").forEach(tab => {
    tab.addEventListener("click", () => {
      window.setTimeout(() => {
        if (tab.dataset.tab === "refuerzos") {
          abrirPanelRefuerzos();
          cargarTodo();
        } else {
          $("panelRefuerzos")?.classList.add("hidden");
        }
      }, 0);
    });
  });
}

function protegerEdicionGenerica() {
  const porId = new Map(
    misionesPronunciacion.map(tarea => [tarea.id, tarea])
  );

  document.querySelectorAll("#listaTareas [data-id]").forEach(control => {
    const tarea = porId.get(control.dataset.id);
    if (!tarea) return;

    const accion = control.dataset.action;

    if (accion === "edit") {
      control.textContent = "✏️ Editar refuerzo";
      control.onclick = event => {
        event.preventDefault();
        event.stopPropagation();
        abrirPanelRefuerzos();

        cargarTodo({ silencioso: true }).then(() => {
          misionEditandoId = tarea.id;
          renderMisionesPronunciacion();

          document.querySelector(
            `[data-editor-pronunciacion="${CSS.escape(tarea.id)}"]`
          )?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        });
      };
    }

    if (
      accion === "complete" &&
      !["pendiente_validacion", "completada_pendiente_validacion"].includes(tarea.estado)
    ) {
      control.classList.add("hidden");
      control.setAttribute(
        "title",
        "Esta Misión pasa a revisión desde la práctica y su evidencia."
      );
    }

    if (
      accion === "start" &&
      tarea.visibleParaAlumno === false
    ) {
      control.classList.add("hidden");
      control.setAttribute(
        "title",
        "Activa Mostrar en Mi Camino antes de abrir la actividad."
      );
    }
  });
}
function parchearTrabajoRealizado() {
  const ids = new Set(misionesPronunciacion.map(tarea => tarea.id));

  ids.forEach(id => {
    const contenedor = document.querySelector(
      `[data-evidencias-lista="${CSS.escape(id)}"]`
    );
    if (!contenedor || contenedor.classList.contains("hidden")) return;

    contenedor.querySelectorAll(".evidencia-item__enlace").forEach(enlace => {
      const volver = encodeURIComponent(
        `${window.location.pathname}${window.location.search}`
      );
      enlace.href =
        `../rincon-lectura/?vista=pronunciacion-historial` +
        `&misionId=${encodeURIComponent(id)}` +
        `&volver=${volver}`;
      enlace.textContent = "Ver práctica";
    });
  });
}

function programarDecoracion() {
  window.clearTimeout(timerDecoracion);
  timerDecoracion = window.setTimeout(() => {
    protegerEdicionGenerica();
    parchearTrabajoRealizado();
  }, 30);
}

async function cargarTodo({ silencioso = false } = {}) {
  if (cargando) return;
  cargando = true;

  if (!silencioso) {
    $("estadoRefuerzos").classList.remove("hidden");
    $("estadoRefuerzos").textContent = "🦜 Lía está revisando las Misiones y las lecturas guardadas...";
    $("listaRefuerzos").innerHTML = "";
    $("accionesRefuerzos").classList.add("hidden");
  }

  try {
    const meta = await leerDatosRefuerzo();
    sincronizacionInicialCompleta = true;
    renderCandidatos(meta);
    renderMisionesPronunciacion();
    programarDecoracion();
  } catch (error) {
    $("estadoRefuerzos").classList.add("hidden");
    $("accionesRefuerzos").classList.add("hidden");
    $("listaRefuerzos").innerHTML = `
      <div class="refuerzo-error">
        No fue posible preparar las observaciones y refuerzos.<br>
        Razón: ${escapar(error.message || "Error no identificado")}
      </div>
    `;
  } finally {
    cargando = false;
  }
}

function inicializar() {
  configurarTabsExternos();
  $("actualizarRefuerzos")?.addEventListener("click", () => cargarTodo());
  $("crearMisionPronunciacion")?.addEventListener("click", crearMisionPronunciacion);

  const listaTareas = $("listaTareas");
  if (listaTareas) {
    new MutationObserver(() => {
      programarDecoracion();
      if (!sincronizacionInicialCompleta && !cargando) {
        window.setTimeout(() => cargarTodo({ silencioso: true }), 80);
      }
    }).observe(listaTareas, {
      childList: true,
      subtree: true
    });
  }

  // Si ya existen Misiones de pronunciación, el primer render de la lista
  // se decorará en cuanto la API protegida esté disponible.
  window.setTimeout(() => cargarTodo({ silencioso: true }), 700);
}

inicializar();
