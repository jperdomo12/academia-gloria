/* Academia Gloria Valentina · Modelo compartido de crecimiento de Mi Camino */

export const ETAPAS_CRECIMIENTO = Object.freeze([
  Object.freeze({
    id: "semilla",
    nombre: "Semilla",
    icono: "🌰",
    desde: 0,
    imagenArchivo: "camino-etapa-01-semilla.png",
    titulo: "Tu camino está comenzando",
    mensaje: "Cada Misión real que completas ayuda a que tu camino empiece a crecer."
  }),
  Object.freeze({
    id: "brote",
    nombre: "Brote",
    icono: "🌱",
    desde: 30,
    imagenArchivo: "camino-etapa-02-brote.png",
    titulo: "Tu camino ya ha brotado",
    mensaje: "Ya se nota todo lo que estás construyendo. Sigue avanzando a tu ritmo."
  }),
  Object.freeze({
    id: "plantita",
    nombre: "Plantita",
    icono: "🪴",
    desde: 140,
    imagenArchivo: "camino-etapa-03-plantita.png",
    titulo: "Tu plantita sigue creciendo",
    mensaje: "Tus aventuras completadas van llenando tu camino de nuevas hojas."
  }),
  Object.freeze({
    id: "arbol-joven",
    nombre: "Árbol joven",
    icono: "🌿",
    desde: 260,
    imagenArchivo: "camino-etapa-04-arbol-joven.png",
    titulo: "Tu árbol joven gana fuerza",
    mensaje: "Todo lo que practicas y terminas va formando nuevas ramas en tu camino."
  }),
  Object.freeze({
    id: "arbol",
    nombre: "Árbol",
    icono: "🌳",
    desde: 400,
    imagenArchivo: "camino-etapa-05-arbol.png",
    titulo: "Tu árbol ya está bien formado",
    mensaje: "Tu recorrido tiene muchas experiencias y cada una forma parte de tu historia."
  }),
  Object.freeze({
    id: "arbol-con-frutos",
    nombre: "Árbol con frutos",
    icono: "🍎",
    desde: 560,
    imagenArchivo: "camino-etapa-06-arbol-con-frutos.png",
    titulo: "Tu árbol empieza a dar frutos",
    mensaje: "Todo lo que has ido construyendo ya se ve en un camino lleno de experiencias."
  }),
  Object.freeze({
    id: "arbol-lleno-de-frutos",
    nombre: "Árbol lleno de frutos",
    icono: "🍎",
    desde: 740,
    imagenArchivo: "camino-etapa-07-arbol-lleno-de-frutos.png",
    titulo: "Tu árbol está lleno de frutos",
    mensaje: "Has recorrido muchísimo. Tu árbol puede seguir acompañándote mientras continúas aprendiendo."
  })
]);

export const CONFIGURACION_CRECIMIENTO_PREDETERMINADA = Object.freeze({
  schemaVersion: 1,
  etapas: Object.freeze(
    Object.fromEntries(ETAPAS_CRECIMIENTO.map(etapa => [etapa.id, etapa.desde]))
  ),
  reglasPeso: Object.freeze({
    cantidadEstandarMin: 2,
    cantidadAmpliaMin: 5,
    minutosEstandarMin: 15,
    minutosAmpliaMin: 30,
    repasoAcademicoComoEstandar: true,
    tareaCombinadaComoAmplia: true
  })
});

function numeroEntero(valor, predeterminado = 0) {
  const numero = Number(valor);
  return Number.isFinite(numero)
    ? Math.max(0, Math.round(numero))
    : predeterminado;
}

export function normalizarConfiguracionCrecimiento(configuracion = {}) {
  const etapasEntrada = configuracion?.etapas && typeof configuracion.etapas === "object"
    ? configuracion.etapas
    : {};
  const reglasEntrada = configuracion?.reglasPeso && typeof configuracion.reglasPeso === "object"
    ? configuracion.reglasPeso
    : {};
  const base = CONFIGURACION_CRECIMIENTO_PREDETERMINADA;

  const etapas = Object.fromEntries(
    ETAPAS_CRECIMIENTO.map(etapa => [
      etapa.id,
      numeroEntero(etapasEntrada[etapa.id], base.etapas[etapa.id])
    ])
  );
  etapas.semilla = 0;

  return {
    schemaVersion: 1,
    etapas,
    reglasPeso: {
      cantidadEstandarMin: numeroEntero(
        reglasEntrada.cantidadEstandarMin,
        base.reglasPeso.cantidadEstandarMin
      ),
      cantidadAmpliaMin: numeroEntero(
        reglasEntrada.cantidadAmpliaMin,
        base.reglasPeso.cantidadAmpliaMin
      ),
      minutosEstandarMin: numeroEntero(
        reglasEntrada.minutosEstandarMin,
        base.reglasPeso.minutosEstandarMin
      ),
      minutosAmpliaMin: numeroEntero(
        reglasEntrada.minutosAmpliaMin,
        base.reglasPeso.minutosAmpliaMin
      ),
      repasoAcademicoComoEstandar:
        reglasEntrada.repasoAcademicoComoEstandar !== false,
      tareaCombinadaComoAmplia:
        reglasEntrada.tareaCombinadaComoAmplia !== false
    }
  };
}

export function validarConfiguracionCrecimiento(configuracion = {}) {
  const config = normalizarConfiguracionCrecimiento(configuracion);
  const errores = [];
  const umbrales = ETAPAS_CRECIMIENTO.map(etapa => config.etapas[etapa.id]);

  if (umbrales[0] !== 0) {
    errores.push("Semilla debe comenzar en 0 unidades.");
  }

  for (let indice = 1; indice < umbrales.length; indice += 1) {
    if (umbrales[indice] <= umbrales[indice - 1]) {
      errores.push("Los umbrales de etapas deben crecer de forma estricta.");
      break;
    }
  }

  const reglas = config.reglasPeso;
  if (reglas.cantidadEstandarMin < 1) {
    errores.push("La cantidad mínima para peso 2 debe ser al menos 1.");
  }
  if (reglas.cantidadAmpliaMin <= reglas.cantidadEstandarMin) {
    errores.push("La cantidad mínima para peso 3 debe ser mayor que la de peso 2.");
  }
  if (reglas.minutosEstandarMin < 1) {
    errores.push("Los minutos mínimos para peso 2 deben ser al menos 1.");
  }
  if (reglas.minutosAmpliaMin <= reglas.minutosEstandarMin) {
    errores.push("Los minutos mínimos para peso 3 deben ser mayores que los de peso 2.");
  }

  return { valida: errores.length === 0, errores, configuracion: config };
}

export function obtenerEtapasConfiguradas(configuracion = {}) {
  const config = normalizarConfiguracionCrecimiento(configuracion);
  return ETAPAS_CRECIMIENTO.map(etapa => ({
    ...etapa,
    desde: config.etapas[etapa.id]
  }));
}

function cantidadEstructurada(tarea = {}) {
  const criterio = tarea.criterioCumplimiento && typeof tarea.criterioCumplimiento === "object"
    ? tarea.criterioCumplimiento
    : {};
  const desdeCriterio = Math.max(
    0,
    Number(criterio.cantidadObjetivo ?? tarea.progreso?.cantidadObjetivo ?? 0) || 0
  );
  const palabras = Array.isArray(tarea.evidencia?.configuracion?.palabras)
    ? tarea.evidencia.configuracion.palabras.length
    : 0;

  return Math.max(desdeCriterio, palabras);
}

export function evaluarMisionCrecimiento(tarea = {}, configuracion = {}) {
  const config = normalizarConfiguracionCrecimiento(configuracion);
  const cantidad = cantidadEstructurada(tarea);
  const minutos = Math.max(0, Number(tarea.tiempoEstimadoMinutos || 0) || 0);
  const tipo = String(tarea.tipo || "").trim();
  const estado = String(tarea.estado || "").trim();
  const esPrueba = tarea.esDatoPrueba === true;
  const visible = tarea.visibleParaAlumno !== false;

  if (esPrueba) {
    return {
      tarea,
      elegible: false,
      categoria: "prueba",
      peso: 0,
      unidades: 0,
      cantidad,
      minutos,
      razon: "Dato de prueba · no cuenta para crecimiento"
    };
  }

  if (!visible) {
    return {
      tarea,
      elegible: false,
      categoria: "oculta",
      peso: 0,
      unidades: 0,
      cantidad,
      minutos,
      razon: "No visible para el alumno"
    };
  }

  if (estado !== "completada") {
    return {
      tarea,
      elegible: false,
      categoria: "no-completada",
      peso: 0,
      unidades: 0,
      cantidad,
      minutos,
      razon: `Estado ${estado || "sin estado"} · todavía no cuenta`
    };
  }

  const reglas = config.reglasPeso;

  if (reglas.tareaCombinadaComoAmplia && tipo === "tarea_combinada") {
    return { tarea, elegible: true, categoria: "elegible", peso: 3, unidades: 3, cantidad, minutos, razon: "Peso 3 · tarea combinada" };
  }
  if (cantidad >= reglas.cantidadAmpliaMin) {
    return { tarea, elegible: true, categoria: "elegible", peso: 3, unidades: 3, cantidad, minutos, razon: `Peso 3 · cantidad ${cantidad} ≥ ${reglas.cantidadAmpliaMin}` };
  }
  if (minutos >= reglas.minutosAmpliaMin) {
    return { tarea, elegible: true, categoria: "elegible", peso: 3, unidades: 3, cantidad, minutos, razon: `Peso 3 · ${minutos} min ≥ ${reglas.minutosAmpliaMin}` };
  }
  if (reglas.repasoAcademicoComoEstandar && tipo === "repaso_academico") {
    return { tarea, elegible: true, categoria: "elegible", peso: 2, unidades: 2, cantidad, minutos, razon: "Peso 2 · repaso académico" };
  }
  if (cantidad >= reglas.cantidadEstandarMin) {
    return { tarea, elegible: true, categoria: "elegible", peso: 2, unidades: 2, cantidad, minutos, razon: `Peso 2 · cantidad ${cantidad} ≥ ${reglas.cantidadEstandarMin}` };
  }
  if (minutos >= reglas.minutosEstandarMin) {
    return { tarea, elegible: true, categoria: "elegible", peso: 2, unidades: 2, cantidad, minutos, razon: `Peso 2 · ${minutos} min ≥ ${reglas.minutosEstandarMin}` };
  }

  return {
    tarea,
    elegible: true,
    categoria: "elegible",
    peso: 1,
    unidades: 1,
    cantidad,
    minutos,
    razon: "Peso 1 · Misión ligera"
  };
}

export function resumirCrecimiento(tareas = [], configuracion = {}) {
  const config = normalizarConfiguracionCrecimiento(configuracion);
  const etapas = obtenerEtapasConfiguradas(config);
  const evaluaciones = (Array.isArray(tareas) ? tareas : [])
    .map(tarea => evaluarMisionCrecimiento(tarea, config));
  const elegibles = evaluaciones.filter(item => item.elegible);
  const unidades = elegibles.reduce((total, item) => total + item.unidades, 0);

  let indice = 0;
  etapas.forEach((etapa, posicion) => {
    if (unidades >= etapa.desde) indice = posicion;
  });

  const etapa = etapas[indice];
  const siguiente = etapas[indice + 1] || null;
  const progreso = siguiente
    ? Math.max(0, Math.min(
        100,
        ((unidades - etapa.desde) / (siguiente.desde - etapa.desde)) * 100
      ))
    : 100;

  const distribucionPesos = { 1: 0, 2: 0, 3: 0 };
  elegibles.forEach(item => {
    distribucionPesos[item.peso] += 1;
  });

  return {
    configuracion: config,
    etapas,
    evaluaciones,
    elegibles,
    unidades,
    etapa,
    siguiente,
    indice,
    progreso,
    faltanUnidades: siguiente ? Math.max(0, siguiente.desde - unidades) : 0,
    totalMisiones: evaluaciones.length,
    misionesReales: elegibles.length,
    pruebasExcluidas: evaluaciones.filter(item => item.categoria === "prueba").length,
    ocultasExcluidas: evaluaciones.filter(item => item.categoria === "oculta").length,
    noCompletadas: evaluaciones.filter(item => item.categoria === "no-completada").length,
    distribucionPesos
  };
}
