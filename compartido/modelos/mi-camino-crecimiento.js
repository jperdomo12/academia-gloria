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

export const NIVELES_CRECIMIENTO = Object.freeze({
  bajo: Object.freeze({ id: "bajo", nombre: "Bajo", unidades: 1 }),
  medio: Object.freeze({ id: "medio", nombre: "Medio", unidades: 2 }),
  alto: Object.freeze({ id: "alto", nombre: "Alto", unidades: 3 })
});

export const NIVEL_CRECIMIENTO_POR_DEFECTO = "medio";

const MODULOS_CONTEXTO = Object.freeze({
  detectives: Object.freeze({
    caminoId: "mi-universo",
    caminoNombre: "Mi Universo",
    areaId: "mi-universo:aventuras-matematicas",
    areaNombre: "Aventuras Matemáticas",
    temaId: "mi-universo:detectives",
    temaNombre: "Detectives de Problemas"
  }),
  "rincon-lectura": Object.freeze({
    caminoId: "mi-universo",
    caminoNombre: "Mi Universo",
    areaId: "mi-universo:rincon-lectura",
    areaNombre: "Mi Rincón de Lectura",
    temaId: "",
    temaNombre: ""
  }),
  "creciendo-por-dentro": Object.freeze({
    caminoId: "mi-universo",
    caminoNombre: "Mi Universo",
    areaId: "mi-universo:creciendo-por-dentro",
    areaNombre: "Creciendo por Dentro",
    temaId: "",
    temaNombre: ""
  }),
  biblioteca: Object.freeze({
    caminoId: "mi-universo",
    caminoNombre: "Mi Universo",
    areaId: "mi-universo:biblioteca",
    areaNombre: "Biblioteca Encantada",
    temaId: "",
    temaNombre: ""
  }),
  libre: Object.freeze({
    caminoId: "otras-misiones",
    caminoNombre: "Otras Misiones",
    areaId: "otras-misiones:actividad-externa",
    areaNombre: "Actividad fuera de la Academia",
    temaId: "",
    temaNombre: ""
  })
});

const CONTEXTOS_BASE = Object.freeze([
  MODULOS_CONTEXTO.detectives,
  MODULOS_CONTEXTO["rincon-lectura"],
  Object.freeze({
    ...MODULOS_CONTEXTO["rincon-lectura"],
    temaId: "mi-universo:rincon-lectura:pronunciacion",
    temaNombre: "Pronunciación · Palabras para Crecer"
  }),
  MODULOS_CONTEXTO["creciendo-por-dentro"],
  MODULOS_CONTEXTO.biblioteca,
  MODULOS_CONTEXTO.libre
]);

export const CONFIGURACION_CRECIMIENTO_PREDETERMINADA = Object.freeze({
  schemaVersion: 2,
  etapas: Object.freeze(
    Object.fromEntries(ETAPAS_CRECIMIENTO.map(etapa => [etapa.id, etapa.desde]))
  ),
  nivelesContexto: Object.freeze({
    areas: Object.freeze({}),
    temas: Object.freeze({})
  })
});

function numeroEntero(valor, predeterminado = 0) {
  const numero = Number(valor);
  return Number.isFinite(numero)
    ? Math.max(0, Math.round(numero))
    : predeterminado;
}

function texto(valor = "") {
  return String(valor ?? "").replace(/\s+/g, " ").trim();
}

function clave(valor = "") {
  return texto(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-ES")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizarNivelCrecimiento(valor, alternativo = "") {
  const candidato = texto(valor).toLocaleLowerCase("es-ES");
  if (Object.prototype.hasOwnProperty.call(NIVELES_CRECIMIENTO, candidato)) {
    return candidato;
  }

  const numero = Number(valor);
  if (numero === 1) return "bajo";
  if (numero === 2) return "medio";
  if (numero === 3) return "alto";

  return alternativo;
}

export function describirNivelCrecimiento(valor) {
  const nivel = normalizarNivelCrecimiento(valor, NIVEL_CRECIMIENTO_POR_DEFECTO);
  return NIVELES_CRECIMIENTO[nivel];
}

function normalizarMapaNiveles(entrada = {}) {
  if (!entrada || typeof entrada !== "object" || Array.isArray(entrada)) return {};

  return Object.fromEntries(
    Object.entries(entrada)
      .map(([id, valor]) => [texto(id), normalizarNivelCrecimiento(valor)])
      .filter(([id, nivel]) => id && nivel)
      .sort(([a], [b]) => a.localeCompare(b, "es"))
  );
}

export function normalizarConfiguracionCrecimiento(configuracion = {}) {
  const etapasEntrada = configuracion?.etapas && typeof configuracion.etapas === "object"
    ? configuracion.etapas
    : {};
  const nivelesEntrada = configuracion?.nivelesContexto &&
    typeof configuracion.nivelesContexto === "object"
      ? configuracion.nivelesContexto
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
    schemaVersion: 2,
    etapas,
    nivelesContexto: {
      areas: normalizarMapaNiveles(nivelesEntrada.areas),
      temas: normalizarMapaNiveles(nivelesEntrada.temas)
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

  [
    ["Área", config.nivelesContexto.areas],
    ["Tema", config.nivelesContexto.temas]
  ].forEach(([etiqueta, mapa]) => {
    Object.entries(mapa).forEach(([id, nivel]) => {
      if (!normalizarNivelCrecimiento(nivel)) {
        errores.push(`${etiqueta} '${id}' contiene un nivel de crecimiento no válido.`);
      }
    });
  });

  return { valida: errores.length === 0, errores, configuracion: config };
}

export function obtenerEtapasConfiguradas(configuracion = {}) {
  const config = normalizarConfiguracionCrecimiento(configuracion);
  return ETAPAS_CRECIMIENTO.map(etapa => ({
    ...etapa,
    desde: config.etapas[etapa.id]
  }));
}

function contextoAcademico(tarea = {}) {
  const curso = texto(tarea.cursoReferencia);
  const materia = texto(tarea.materia) || "Repaso académico";
  const tema = texto(tarea.tema);
  const cursoClave = clave(curso || "general");
  const materiaClave = clave(materia || "repaso-academico");
  const areaId = `curso:${cursoClave}|materia:${materiaClave}`;

  return {
    caminoId: curso ? `mis-cursos:${cursoClave}` : "mis-cursos",
    caminoNombre: curso ? `Mis Cursos ${curso}.º` : "Mis Cursos",
    areaId,
    areaNombre: materia,
    temaId: tema ? `${areaId}|tema:${clave(tema)}` : "",
    temaNombre: tema
  };
}

function contextoModulo(tarea = {}) {
  const modulo = texto(tarea.modulo) || "libre";
  const base = MODULOS_CONTEXTO[modulo] || {
    caminoId: "mi-universo",
    caminoNombre: "Mi Universo",
    areaId: `mi-universo:${clave(modulo || "actividad")}`,
    areaNombre: texto(modulo) || "Actividad",
    temaId: "",
    temaNombre: ""
  };

  if (
    modulo === "rincon-lectura" &&
    tarea.criterioCumplimiento?.evidenciaTipo === "pronunciacion_completada"
  ) {
    return {
      ...base,
      temaId: "mi-universo:rincon-lectura:pronunciacion",
      temaNombre: "Pronunciación · Palabras para Crecer"
    };
  }

  return { ...base };
}

export function obtenerContextoNivelCrecimiento(tarea = {}) {
  return tarea.tipo === "repaso_academico"
    ? contextoAcademico(tarea)
    : contextoModulo(tarea);
}

export function obtenerContextosBaseCrecimiento() {
  return CONTEXTOS_BASE.map(item => ({ ...item }));
}

function nivelPropioActividad(tarea = {}) {
  const nivelDirecto = normalizarNivelCrecimiento(
    tarea.nivelActividad ?? tarea.nivel
  );
  if (nivelDirecto) {
    return {
      nivel: nivelDirecto,
      origen: "actividad",
      detalle: "nivel propio de la actividad"
    };
  }

  const modulo = texto(tarea.modulo);
  const nivelFiltro = tarea.criterioCumplimiento?.filtros?.nivel;
  const nivelNormalizado = normalizarNivelCrecimiento(nivelFiltro);

  if (nivelNormalizado && modulo === "detectives") {
    return {
      nivel: nivelNormalizado,
      origen: "actividad",
      detalle: `Detectives · nivel ${Number(nivelFiltro)}`
    };
  }

  if (nivelNormalizado && modulo === "rincon-lectura") {
    return {
      nivel: nivelNormalizado,
      origen: "actividad",
      detalle: `Lectura · nivel ${Number(nivelFiltro)}`
    };
  }

  return null;
}

export function resolverNivelMisionCrecimiento(tarea = {}, configuracion = {}) {
  const config = normalizarConfiguracionCrecimiento(configuracion);
  const contexto = obtenerContextoNivelCrecimiento(tarea);

  const nivelMision = normalizarNivelCrecimiento(tarea.nivelCrecimiento);
  if (nivelMision) {
    return {
      ...describirNivelCrecimiento(nivelMision),
      origen: "mision",
      detalle: "ajuste específico de la Misión",
      contexto
    };
  }

  const propio = nivelPropioActividad(tarea);
  if (propio) {
    return {
      ...describirNivelCrecimiento(propio.nivel),
      origen: propio.origen,
      detalle: propio.detalle,
      contexto
    };
  }

  const nivelTema = contexto.temaId
    ? normalizarNivelCrecimiento(config.nivelesContexto.temas[contexto.temaId])
    : "";
  if (nivelTema) {
    return {
      ...describirNivelCrecimiento(nivelTema),
      origen: "tema",
      detalle: `nivel configurado para ${contexto.temaNombre || "el Tema"}`,
      contexto
    };
  }

  const nivelArea = normalizarNivelCrecimiento(
    config.nivelesContexto.areas[contexto.areaId]
  );
  if (nivelArea) {
    return {
      ...describirNivelCrecimiento(nivelArea),
      origen: "area",
      detalle: `nivel configurado para ${contexto.areaNombre || "el Área"}`,
      contexto
    };
  }

  return {
    ...describirNivelCrecimiento(NIVEL_CRECIMIENTO_POR_DEFECTO),
    origen: "predeterminado",
    detalle: "nivel predeterminado de la Academia",
    contexto
  };
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
  const cantidad = cantidadEstructurada(tarea);
  const minutos = Math.max(0, Number(tarea.tiempoEstimadoMinutos || 0) || 0);
  const estado = texto(tarea.estado);
  const esPrueba = tarea.esDatoPrueba === true;
  const visible = tarea.visibleParaAlumno !== false;
  const nivel = resolverNivelMisionCrecimiento(tarea, configuracion);

  if (esPrueba) {
    return {
      tarea,
      elegible: false,
      categoria: "prueba",
      nivel: null,
      origenNivel: "excluida",
      peso: 0,
      unidades: 0,
      cantidad,
      minutos,
      contexto: nivel.contexto,
      razon: "Dato de prueba · no aporta crecimiento"
    };
  }

  if (!visible) {
    return {
      tarea,
      elegible: false,
      categoria: "oculta",
      nivel: null,
      origenNivel: "excluida",
      peso: 0,
      unidades: 0,
      cantidad,
      minutos,
      contexto: nivel.contexto,
      razon: "Misión oculta · no aporta crecimiento"
    };
  }

  if (estado !== "completada") {
    return {
      tarea,
      elegible: false,
      categoria: "no-completada",
      nivel: nivel.id,
      nivelNombre: nivel.nombre,
      origenNivel: nivel.origen,
      detalleNivel: nivel.detalle,
      peso: 0,
      unidades: 0,
      cantidad,
      minutos,
      contexto: nivel.contexto,
      razon: `Estado ${estado || "sin estado"} · todavía no aporta crecimiento`
    };
  }

  return {
    tarea,
    elegible: true,
    categoria: "elegible",
    nivel: nivel.id,
    nivelNombre: nivel.nombre,
    origenNivel: nivel.origen,
    detalleNivel: nivel.detalle,
    peso: nivel.unidades,
    unidades: nivel.unidades,
    cantidad,
    minutos,
    contexto: nivel.contexto,
    razon: `${nivel.nombre} · ${nivel.detalle}`
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

  const distribucionNiveles = { bajo: 0, medio: 0, alto: 0 };
  elegibles.forEach(item => {
    if (item.nivel && item.nivel in distribucionNiveles) {
      distribucionNiveles[item.nivel] += 1;
    }
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
    distribucionNiveles,
    distribucionPesos: {
      1: distribucionNiveles.bajo,
      2: distribucionNiveles.medio,
      3: distribucionNiveles.alto
    }
  };
}
