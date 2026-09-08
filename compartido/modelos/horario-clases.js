/* ==========================================================
   Academia Gloria Valentina
   Modelo · Horario de clases · v1
   Un único horario actual por Persona Activa.
   ========================================================== */

export const DIAS_HORARIO = Object.freeze([
  Object.freeze({ id: "lunes", etiqueta: "Lunes", corto: "Lun" }),
  Object.freeze({ id: "martes", etiqueta: "Martes", corto: "Mar" }),
  Object.freeze({ id: "miercoles", etiqueta: "Miércoles", corto: "Mié" }),
  Object.freeze({ id: "jueves", etiqueta: "Jueves", corto: "Jue" }),
  Object.freeze({ id: "viernes", etiqueta: "Viernes", corto: "Vie" })
]);

export const PALETA_MATERIAS = Object.freeze([
  Object.freeze({ id: "violeta", fondo: "#ede9fe", borde: "#c4b5fd", tinta: "#5b21b6" }),
  Object.freeze({ id: "azul", fondo: "#e0f2fe", borde: "#7dd3fc", tinta: "#075985" }),
  Object.freeze({ id: "rosa", fondo: "#fce7f3", borde: "#f9a8d4", tinta: "#9d174d" }),
  Object.freeze({ id: "verde", fondo: "#dcfce7", borde: "#86efac", tinta: "#166534" }),
  Object.freeze({ id: "amarillo", fondo: "#fef3c7", borde: "#fcd34d", tinta: "#92400e" }),
  Object.freeze({ id: "coral", fondo: "#ffedd5", borde: "#fdba74", tinta: "#9a3412" }),
  Object.freeze({ id: "turquesa", fondo: "#ccfbf1", borde: "#5eead4", tinta: "#115e59" }),
  Object.freeze({ id: "indigo", fondo: "#e0e7ff", borde: "#a5b4fc", tinta: "#3730a3" }),
  Object.freeze({ id: "lima", fondo: "#ecfccb", borde: "#bef264", tinta: "#3f6212" }),
  Object.freeze({ id: "celeste", fondo: "#cffafe", borde: "#67e8f9", tinta: "#155e75" }),
  Object.freeze({ id: "lavanda", fondo: "#f3e8ff", borde: "#d8b4fe", tinta: "#6b21a8" }),
  Object.freeze({ id: "melocoton", fondo: "#ffe4e6", borde: "#fda4af", tinta: "#9f1239" })
]);

const COLORES_VALIDOS = new Set(PALETA_MATERIAS.map(color => color.id));
const DIAS_VALIDOS = new Set(DIAS_HORARIO.map(dia => dia.id));
const MAX_MATERIAS = 30;
const MAX_TRAMOS = 18;

function texto(valor = "", maximo = 180) {
  return String(valor ?? "").trim().slice(0, maximo);
}

function idSeguro(valor = "", prefijo = "item") {
  const candidato = texto(valor, 90)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return candidato || `${prefijo}-${Math.random().toString(36).slice(2, 8)}`;
}

function horaValida(valor = "") {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(String(valor));
}

function minutos(valor = "00:00") {
  const [hora, minuto] = String(valor).split(":").map(Number);
  return (hora * 60) + minuto;
}

function normalizarMateria(materia = {}, indice = 0) {
  const nombre = texto(materia.nombre, 60);
  if (!nombre) throw new Error("Cada materia debe tener un nombre.");

  const colorId = COLORES_VALIDOS.has(materia.colorId)
    ? materia.colorId
    : PALETA_MATERIAS[indice % PALETA_MATERIAS.length].id;

  return {
    id: idSeguro(materia.id || nombre, "materia"),
    nombre,
    colorId
  };
}

function normalizarMaterias(materias = []) {
  if (!Array.isArray(materias)) {
    throw new Error("La lista de materias no es válida.");
  }

  if (materias.length > MAX_MATERIAS) {
    throw new Error(`El horario admite hasta ${MAX_MATERIAS} materias o bloques.`);
  }

  const normalizadas = materias.map(normalizarMateria);
  const nombres = new Set();
  const ids = new Set();

  normalizadas.forEach(materia => {
    const claveNombre = materia.nombre.toLocaleLowerCase("es");
    if (nombres.has(claveNombre)) {
      throw new Error(`La materia “${materia.nombre}” está repetida.`);
    }
    if (ids.has(materia.id)) {
      throw new Error("Hay dos materias con el mismo identificador.");
    }
    nombres.add(claveNombre);
    ids.add(materia.id);
  });

  return normalizadas;
}

function normalizarTramo(tramo = {}, indice = 0) {
  const inicio = texto(tramo.inicio, 5);
  const fin = texto(tramo.fin, 5);

  if (!horaValida(inicio) || !horaValida(fin)) {
    throw new Error("Cada tramo debe tener una hora de inicio y fin válidas.");
  }

  if (minutos(fin) <= minutos(inicio)) {
    throw new Error(`El tramo ${inicio}–${fin} debe terminar después de comenzar.`);
  }

  return {
    id: idSeguro(tramo.id || `tramo-${indice + 1}`, "tramo"),
    inicio,
    fin
  };
}

function normalizarTramos(tramos = []) {
  if (!Array.isArray(tramos)) {
    throw new Error("Los tramos horarios no son válidos.");
  }

  if (tramos.length > MAX_TRAMOS) {
    throw new Error(`El horario admite hasta ${MAX_TRAMOS} tramos horarios.`);
  }

  const normalizados = tramos.map(normalizarTramo)
    .sort((a, b) => minutos(a.inicio) - minutos(b.inicio));

  for (let indice = 1; indice < normalizados.length; indice += 1) {
    const anterior = normalizados[indice - 1];
    const actual = normalizados[indice];

    if (minutos(actual.inicio) < minutos(anterior.fin)) {
      throw new Error(
        `Los tramos ${anterior.inicio}–${anterior.fin} y ${actual.inicio}–${actual.fin} se solapan.`
      );
    }
  }

  return normalizados;
}

function normalizarCeldas(celdas = {}, tramos = [], materias = []) {
  const materiasValidas = new Set(materias.map(materia => materia.id));
  const resultado = {};

  tramos.forEach(tramo => {
    const filaEntrada = celdas?.[tramo.id] || {};
    const fila = {};

    DIAS_HORARIO.forEach(dia => {
      const materiaId = texto(filaEntrada?.[dia.id], 90);
      fila[dia.id] = materiaId && materiasValidas.has(materiaId)
        ? materiaId
        : "";
    });

    resultado[tramo.id] = fila;
  });

  return resultado;
}

export function crearHorarioClases(entrada = {}) {
  const materias = normalizarMaterias(entrada.materias || []);
  const tramos = normalizarTramos(entrada.tramos || []);

  return {
    schemaVersion: 1,
    periodoEscolar: texto(entrada.periodoEscolar, 30),
    colegio: texto(entrada.colegio, 120),
    curso: texto(entrada.curso, 120),
    tutor: texto(entrada.tutor, 120),
    materias,
    tramos,
    celdas: normalizarCeldas(entrada.celdas || {}, tramos, materias),
    notas: texto(entrada.notas, 2500)
  };
}

export function crearHorarioInicial(perfil = {}) {
  return crearHorarioClases({
    periodoEscolar: perfil.cursoEscolar || "",
    colegio: perfil.colegio || "",
    curso: perfil.curso || "",
    tutor: "",
    materias: [],
    tramos: [],
    celdas: {},
    notas: ""
  });
}

export function colorMateria(colorId = "violeta") {
  return PALETA_MATERIAS.find(color => color.id === colorId)
    || PALETA_MATERIAS[0];
}

export function esDiaHorario(valor = "") {
  return DIAS_VALIDOS.has(String(valor));
}
