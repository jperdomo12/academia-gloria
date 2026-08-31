/* Academia Gloria Valentina · Gestión familiar · Análisis educativo V1 */

import { Academia } from "../../compartido/api/academia.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";
import {
  obtenerHistorialDetectives,
  obtenerSesionesHistoria
} from "../../compartido/js/detectives-progreso.js";
import { leerSesionesAcademicas } from "../../compartido/js/sesiones-academicas.js";

const $ = id => document.getElementById(id);
const MAXIMO_SESIONES_ACADEMICAS = 100;

const FOCOS_DETECTIVES = Object.freeze({
  comprension: Object.freeze({ orden: 1, icono: "🧠", titulo: "Comprender qué pregunta el problema", fase: "Comprendo" }),
  descubrimiento: Object.freeze({ orden: 2, icono: "🔎", titulo: "Descubrir qué hay que averiguar", fase: "Descubro" }),
  operacion: Object.freeze({ orden: 3, icono: "➕", titulo: "Elegir la operación", fase: "Elijo la operación" }),
  operandos: Object.freeze({ orden: 4, icono: "🔢", titulo: "Elegir los datos que necesito", fase: "Elijo los datos" }),
  resultado: Object.freeze({ orden: 5, icono: "✅", titulo: "Calcular y comprobar el resultado", fase: "Resuelvo" })
});

let datos = {
  detectives: [],
  academicos: [],
  lectura: [],
  historias: new Map(),
  incidencias: []
};
let cargado = false;
let cargando = false;

function escapar(valor = "") {
  return String(valor).replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caracter]);
}

function numero(valor, alternativo = 0) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : alternativo;
}

function fechaMs(valor) {
  if (!valor) return 0;
  if (typeof valor?.toMillis === "function") return valor.toMillis();
  if (typeof valor?.toDate === "function") return valor.toDate().getTime();
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? 0 : fecha.getTime();
}

function fechaRegistro(registro = {}, motor = "") {
  if (motor === "detectives") {
    return fechaMs(registro.completadaEn || registro.actualizadaEn);
  }
  if (motor === "academicos") {
    return fechaMs(
      registro.completadaEn ||
      registro.updatedAt ||
      registro.finCliente ||
      registro.createdAt
    );
  }
  return fechaMs(registro.actualizadaEn || registro.creadaEn);
}

function formatearFecha(valor) {
  const ms = typeof valor === "number" ? valor : fechaMs(valor);
  if (!ms) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(ms));
}

function decimal(valor, maximo = 1) {
  return numero(valor).toLocaleString("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maximo
  });
}

function porcentaje(valor) {
  return `${Math.round(Math.max(0, Math.min(1, numero(valor))) * 100)} %`;
}

function plural(cantidad, singular, pluralTexto) {
  return cantidad === 1 ? singular : pluralTexto;
}

function normalizarTexto(valor = "") {
  return String(valor)
    .trim()
    .toLocaleLowerCase("es-ES")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function restarMesesSeguro(fecha, meses) {
  const origen = new Date(fecha);
  const dia = origen.getDate();
  const destino = new Date(origen);
  destino.setDate(1);
  destino.setMonth(destino.getMonth() - meses);
  const ultimoDia = new Date(
    destino.getFullYear(),
    destino.getMonth() + 1,
    0
  ).getDate();
  destino.setDate(Math.min(dia, ultimoDia));
  destino.setHours(0, 0, 0, 0);
  return destino;
}

function rangoSeleccionado() {
  const periodo = $("analisisPeriodo")?.value || "1m";
  const hasta = new Date();
  hasta.setHours(23, 59, 59, 999);

  if (periodo === "personalizado") {
    const desdeValor = $("analisisDesde")?.value;
    const hastaValor = $("analisisHasta")?.value;
    const desde = desdeValor ? new Date(`${desdeValor}T00:00:00`) : restarMesesSeguro(hasta, 1);
    const fin = hastaValor ? new Date(`${hastaValor}T23:59:59.999`) : hasta;
    return { desde: desde.getTime(), hasta: fin.getTime() };
  }

  const meses = periodo === "3m" ? 3 : periodo === "2m" ? 2 : 1;
  return {
    desde: restarMesesSeguro(hasta, meses).getTime(),
    hasta: hasta.getTime()
  };
}

function temaRegistro(registro = {}, motor = "") {
  if (motor === "detectives") {
    return String(registro.tema || `Nivel ${numero(registro.nivel, 1)}`).trim();
  }
  if (motor === "academicos") {
    return String(
      registro.tema ||
      registro.tituloActividad ||
      registro.actividadId ||
      "Actividad académica"
    ).trim();
  }
  return String(
    registro.categoria ||
    (registro.nivel ? `Nivel ${registro.nivel}` : "Lectura")
  ).trim();
}

function dentroRango(registro, motor, rango) {
  const fecha = fechaRegistro(registro, motor);
  return fecha >= rango.desde && fecha <= rango.hasta;
}

function registrosFiltrados() {
  const rango = rangoSeleccionado();
  const motor = $("analisisMotor")?.value || "todos";
  const tema = $("analisisTema")?.value || "";

  const filtrar = (lista, claveMotor) => {
    if (motor !== "todos" && motor !== claveMotor) return [];
    return lista.filter(item => {
      if (!dentroRango(item, claveMotor, rango)) return false;
      if (!tema || motor === "todos") return true;
      return normalizarTexto(temaRegistro(item, claveMotor)) === normalizarTexto(tema);
    });
  };

  return {
    rango,
    motor,
    tema,
    detectives: filtrar(datos.detectives, "detectives"),
    academicos: filtrar(datos.academicos, "academicos"),
    lectura: filtrar(datos.lectura, "lectura")
  };
}

function sumaIntentosPasos(sesion = {}, campo) {
  const pasos = Array.isArray(sesion.pasos) ? sesion.pasos : [];
  if (pasos.length) {
    return {
      intentos: pasos.reduce((total, paso) => total + Math.max(0, numero(paso?.[campo])), 0),
      base: pasos.length
    };
  }
  return {
    intentos: Math.max(0, numero(sesion?.[campo])),
    base: 1
  };
}

function medidasDetectives(sesion = {}) {
  const medidas = [];
  const agregar = (foco, intentos, base = 1) => {
    const intentosValidos = Math.max(0, numero(intentos));
    const baseValida = Math.max(1, numero(base, 1));
    if (!intentosValidos) return;
    medidas.push({
      foco,
      intentos: intentosValidos,
      base: baseValida,
      extras: Math.max(0, intentosValidos - baseValida)
    });
  };

  agregar("comprension", sesion.intentosComprension, 1);
  agregar("descubrimiento", sesion.intentosDescubrimiento, 1);
  const operacion = sumaIntentosPasos(sesion, "intentosOperacion");
  const operandos = sumaIntentosPasos(sesion, "intentosOperandos");
  const resultado = sumaIntentosPasos(sesion, "intentosResultado");
  agregar("operacion", operacion.intentos, operacion.base);
  agregar("operandos", operandos.intentos, operandos.base);
  agregar("resultado", resultado.intentos, resultado.base);
  return medidas;
}

function palabrasLectura(sesion = {}) {
  const palabras = sesion.analisisLectura?.palabrasParaCrecer;
  return Array.isArray(palabras) ? palabras : [];
}

function estadoPalabraSuperada(estado = "") {
  return ["superada", "success"].includes(String(estado));
}

function tituloHistoria(historiaId) {
  return String(
    datos.historias.get(String(historiaId || ""))?.titulo ||
    historiaId ||
    "Historia de Detectives"
  );
}

function analizarDetectives(sesiones = []) {
  const observacionesFoco = new Map();

  sesiones.forEach(sesion => {
    medidasDetectives(sesion).forEach(medida => {
      const clave = `${numero(sesion.nivel, 1)}|${medida.foco}`;
      const grupo = observacionesFoco.get(clave) || {
        clave,
        nivel: numero(sesion.nivel, 1),
        foco: medida.foco,
        observaciones: []
      };
      grupo.observaciones.push({
        historiaId: String(sesion.historiaId || ""),
        fecha: fechaRegistro(sesion, "detectives"),
        ...medida
      });
      observacionesFoco.set(clave, grupo);
    });
  });

  const fortalezas = [...observacionesFoco.values()]
    .map(grupo => {
      const sinExtras = grupo.observaciones.filter(item => item.extras === 0);
      const historias = new Set(sinExtras.map(item => item.historiaId).filter(Boolean));
      return { ...grupo, sinExtras: sinExtras.length, historiasSinExtras: historias.size };
    })
    .filter(grupo => grupo.historiasSinExtras >= 2)
    .sort((a, b) =>
      (b.sinExtras / b.observaciones.length) - (a.sinExtras / a.observaciones.length) ||
      b.historiasSinExtras - a.historiasSinExtras ||
      (FOCOS_DETECTIVES[a.foco]?.orden || 99) - (FOCOS_DETECTIVES[b.foco]?.orden || 99)
    )
    .slice(0, 3)
    .map(grupo => {
      const foco = FOCOS_DETECTIVES[grupo.foco];
      return `${foco?.icono || "🧩"} En «${foco?.fase || grupo.foco}», ${grupo.sinExtras} de ${grupo.observaciones.length} observaciones se resolvieron sin intentos adicionales, en ${grupo.historiasSinExtras} historias distintas de nivel ${grupo.nivel}.`;
    });

  const refuerzos = [...observacionesFoco.values()]
    .map(grupo => {
      const conExtras = grupo.observaciones.filter(item => item.extras > 0);
      const porHistoria = new Map();
      conExtras.forEach(item => {
        const anterior = porHistoria.get(item.historiaId);
        if (!anterior || item.fecha > anterior.fecha) porHistoria.set(item.historiaId, item);
      });
      const soportes = [...porHistoria.values()];
      return {
        ...grupo,
        soportes,
        historias: soportes.length,
        mediaExtras: soportes.length
          ? soportes.reduce((total, item) => total + item.extras, 0) / soportes.length
          : 0,
        ultima: soportes.reduce((maximo, item) => Math.max(maximo, item.fecha), 0)
      };
    })
    .filter(grupo => grupo.historias >= 2)
    .sort((a, b) =>
      b.mediaExtras - a.mediaExtras ||
      b.ultima - a.ultima ||
      (FOCOS_DETECTIVES[a.foco]?.orden || 99) - (FOCOS_DETECTIVES[b.foco]?.orden || 99)
    );

  const aspectos = refuerzos.slice(0, 4).map(grupo => {
    const foco = FOCOS_DETECTIVES[grupo.foco];
    return `${foco?.icono || "🧩"} La señal «${foco?.fase || grupo.foco}» apareció con intentos adicionales en ${grupo.historias} historias distintas de nivel ${grupo.nivel}; la media fue ${decimal(grupo.mediaExtras)} ${plural(grupo.mediaExtras, "intento adicional", "intentos adicionales")} por historia.`;
  });

  const totalExtras = sesiones.reduce(
    (total, sesion) => total + medidasDetectives(sesion).reduce((suma, item) => suma + item.extras, 0),
    0
  );
  const intentos = sesiones.length
    ? `En ${sesiones.length} ${plural(sesiones.length, "resolución", "resoluciones")} se registraron ${totalExtras} intentos adicionales en total, con una media de ${decimal(totalExtras / sesiones.length)} por resolución.`
    : "No hay resoluciones de Detectives en el período seleccionado.";

  const pistasTotal = sesiones.reduce((total, sesion) => total + Math.max(0, numero(sesion.pistasUtilizadas)), 0);
  const sesionesConPistas = sesiones.filter(sesion => numero(sesion.pistasUtilizadas) > 0).length;
  const pistas = sesiones.length
    ? pistasTotal
      ? `Se utilizaron ${pistasTotal} ${plural(pistasTotal, "pista", "pistas")} en ${sesionesConPistas} de ${sesiones.length} resoluciones. Esta señal se presenta separada de los intentos.`
      : `No se registró uso de pistas en las ${sesiones.length} resoluciones observadas.`
    : "No hay datos de pistas de Detectives en el período seleccionado.";

  const evolucion = tendenciaDetectives(sesiones);
  const mejoras = mejorasDetectives(sesiones);
  const actuaciones = refuerzos.slice(0, 3).map(grupo => {
    const foco = FOCOS_DETECTIVES[grupo.foco];
    return `Practicar con historias nuevas de nivel ${grupo.nivel} el foco «${foco?.titulo || grupo.foco}», sin pedir repetir las historias que originaron la señal.`;
  });

  return { fortalezas, aspectos, intentos, pistas, evolucion, mejoras, actuaciones };
}

function respuestasAcademicas(sesiones = []) {
  return sesiones.flatMap(sesion => {
    const respuestas = Array.isArray(sesion.respuestas) ? sesion.respuestas : [];
    return respuestas
      .filter(item => typeof item?.correcta === "boolean")
      .map(item => ({
        ...item,
        sesionId: String(sesion.id || ""),
        actividadId: String(sesion.actividadId || ""),
        tituloActividad: String(sesion.tituloActividad || sesion.tema || sesion.actividadId || "Actividad académica"),
        tema: String(sesion.tema || ""),
        fecha: fechaRegistro(sesion, "academicos"),
        bloqueId: String(item.bloqueId || "general")
      }));
  });
}

function analizarAcademicos(sesiones = []) {
  const respuestas = respuestasAcademicas(sesiones);
  const grupos = new Map();

  respuestas.forEach(respuesta => {
    const clave = `${respuesta.actividadId}|${respuesta.bloqueId}`;
    const grupo = grupos.get(clave) || {
      clave,
      actividadId: respuesta.actividadId,
      tituloActividad: respuesta.tituloActividad,
      tema: respuesta.tema,
      bloqueId: respuesta.bloqueId,
      respuestas: []
    };
    grupo.respuestas.push(respuesta);
    grupos.set(clave, grupo);
  });

  const fortalezas = [...grupos.values()]
    .map(grupo => ({
      ...grupo,
      correctas: grupo.respuestas.filter(item => item.correcta).length,
      incorrectas: grupo.respuestas.filter(item => !item.correcta).length
    }))
    .filter(grupo => grupo.correctas >= 2 && grupo.incorrectas === 0)
    .sort((a, b) => b.correctas - a.correctas)
    .slice(0, 3)
    .map(grupo =>
      `📘 En ${grupo.tituloActividad}${grupo.bloqueId !== "general" ? ` · ${grupo.bloqueId}` : ""}, se observaron ${grupo.correctas} respuestas correctas y ninguna incorrecta en el período.`
    );

  const refuerzos = [...grupos.values()]
    .map(grupo => {
      const incorrectas = grupo.respuestas.filter(item => !item.correcta);
      const sesionesConError = new Set(incorrectas.map(item => item.sesionId)).size;
      const ultimaSesionId = grupo.respuestas
        .slice()
        .sort((a, b) => b.fecha - a.fecha)[0]?.sesionId || "";
      const ultimaMantieneError = grupo.respuestas.some(
        item => item.sesionId === ultimaSesionId && !item.correcta
      );
      return {
        ...grupo,
        incorrectas: incorrectas.length,
        total: grupo.respuestas.length,
        sesionesConError,
        proporcionError: grupo.respuestas.length ? incorrectas.length / grupo.respuestas.length : 0,
        ultima: incorrectas.reduce((maximo, item) => Math.max(maximo, item.fecha), 0),
        ultimaMantieneError
      };
    })
    .filter(grupo => grupo.incorrectas >= 2 && grupo.ultimaMantieneError)
    .sort((a, b) => b.proporcionError - a.proporcionError || b.ultima - a.ultima);

  const aspectos = refuerzos.slice(0, 4).map(grupo =>
    `📘 En ${grupo.tituloActividad}${grupo.bloqueId !== "general" ? ` · ${grupo.bloqueId}` : ""}, ${grupo.incorrectas} de ${grupo.total} respuestas fueron incorrectas (${porcentaje(grupo.proporcionError)}); la sesión más reciente del período todavía muestra esa señal.`
  );

  const intentos = sesiones.length
    ? `Las pruebas académicas registran una respuesta por pregunta. En este motor no existen segundos o terceros intentos comparables, por lo que el reporte no convierte aciertos o errores en “intentos”.`
    : "No hay sesiones académicas en el período seleccionado.";

  const pistas = sesiones.length
    ? "Las pruebas académicas actuales no registran un uso de pistas comparable con Detectives; esta métrica no se infiere."
    : "No hay sesiones académicas en el período seleccionado.";

  const evolucion = tendenciaAcademica(sesiones);
  const mejoras = mejorasAcademicas(sesiones);
  const actuaciones = refuerzos.slice(0, 3).map(grupo =>
    `Preparar ejercicios nuevos de «${grupo.tema || grupo.tituloActividad}» centrados en ${grupo.bloqueId === "general" ? "el contenido observado" : grupo.bloqueId}, evitando repetir exactamente la misma prueba solo para generar más datos.`
  );

  return { fortalezas, aspectos, intentos, pistas, evolucion, mejoras, actuaciones };
}

function analizarLectura(sesiones = []) {
  const ocurrencias = sesiones.flatMap(sesion =>
    palabrasLectura(sesion).map(item => ({
      palabra: String(item?.palabra || "").trim(),
      clave: normalizarTexto(item?.palabra || ""),
      estado: String(item?.estado || "pendiente"),
      intentos: Math.max(0, numero(item?.intentos)),
      fecha: fechaRegistro(sesion, "lectura"),
      historiaId: String(sesion.historiaId || sesion.id || ""),
      titulo: String(sesion.titulo || "Lectura")
    })).filter(item => item.clave)
  );

  const superadasPrimera = ocurrencias.filter(
    item => estadoPalabraSuperada(item.estado) && item.intentos <= 1
  );
  const fortalezas = superadasPrimera.length >= 2
    ? [
        `📖 Se observaron ${superadasPrimera.length} palabras superadas a la primera en ${new Set(superadasPrimera.map(item => item.historiaId)).size} ${plural(new Set(superadasPrimera.map(item => item.historiaId)).size, "lectura", "lecturas")}.`
      ]
    : [];

  const porPalabra = new Map();
  ocurrencias.forEach(item => {
    const anterior = porPalabra.get(item.clave);
    if (!anterior || item.fecha > anterior.fecha) porPalabra.set(item.clave, item);
  });

  const candidatas = [...porPalabra.values()]
    .filter(item => !estadoPalabraSuperada(item.estado) || item.intentos > 1)
    .sort((a, b) => {
      const peso = item => estadoPalabraSuperada(item.estado) ? 1 : 0;
      return peso(a) - peso(b) || b.intentos - a.intentos || b.fecha - a.fecha;
    });

  const aspectos = candidatas.slice(0, 5).map(item =>
    !estadoPalabraSuperada(item.estado)
      ? `🗣️ «${item.palabra}» no quedó superada en la señal más reciente (${item.titulo}).`
      : `🗣️ «${item.palabra}» quedó superada en ${item.intentos} intentos en la señal más reciente (${item.titulo}).`
  );

  const conIntentos = ocurrencias.filter(item => item.intentos > 0);
  const intentos = conIntentos.length
    ? `En las palabras con dato disponible se registraron ${conIntentos.reduce((total, item) => total + item.intentos, 0)} intentos sobre ${conIntentos.length} observaciones de pronunciación.`
    : sesiones.length
      ? "Las lecturas del período no contienen intentos de pronunciación comparables registrados."
      : "No hay lecturas en el período seleccionado.";

  const pistas = sesiones.length
    ? "Mi Rincón de Lectura no registra una señal de pistas equivalente a Detectives; no se mezcla con los intentos de pronunciación."
    : "No hay lecturas en el período seleccionado.";

  const evolucion = tendenciaLectura(sesiones);
  const mejoras = [];
  const actuaciones = candidatas.slice(0, 4).map(item =>
    `Practicar «${item.palabra}» dentro de una frase nueva y breve, sin repetir necesariamente la lectura que originó la señal.`
  );

  return { fortalezas, aspectos, intentos, pistas, evolucion, mejoras, actuaciones };
}

function dividirCronologico(lista, motor) {
  const ordenadas = [...lista].sort(
    (a, b) => fechaRegistro(a, motor) - fechaRegistro(b, motor)
  );
  if (ordenadas.length < 4) return null;
  const mitad = Math.floor(ordenadas.length / 2);
  return {
    primeras: ordenadas.slice(0, mitad),
    recientes: ordenadas.slice(mitad)
  };
}

function mediaExtrasSesionDetectives(sesiones) {
  if (!sesiones.length) return 0;
  return sesiones.reduce(
    (total, sesion) => total + medidasDetectives(sesion).reduce((suma, item) => suma + item.extras, 0),
    0
  ) / sesiones.length;
}

function tendenciaDetectives(sesiones) {
  const partes = dividirCronologico(sesiones, "detectives");
  if (!partes) return "Aún no hay suficientes resoluciones comparables en el período para describir una tendencia temporal.";
  const inicial = mediaExtrasSesionDetectives(partes.primeras);
  const reciente = mediaExtrasSesionDetectives(partes.recientes);
  if (decimal(inicial) === decimal(reciente)) {
    return `En el conjunto observado, la media de intentos adicionales se mantuvo en torno a ${decimal(reciente)} por resolución entre la primera y la segunda mitad del período.`;
  }
  return reciente < inicial
    ? `En el conjunto observado, la media de intentos adicionales bajó de ${decimal(inicial)} a ${decimal(reciente)} por resolución entre la primera y la segunda mitad del período.`
    : `En el conjunto observado, la media de intentos adicionales pasó de ${decimal(inicial)} a ${decimal(reciente)} por resolución entre la primera y la segunda mitad del período. Conviene seguir observando antes de convertirlo en una conclusión estable.`;
}

function exactitudSesionAcademica(sesion = {}) {
  const respuestas = (Array.isArray(sesion.respuestas) ? sesion.respuestas : [])
    .filter(item => typeof item?.correcta === "boolean");
  if (!respuestas.length) return null;
  return respuestas.filter(item => item.correcta).length / respuestas.length;
}

function mediaExactitud(sesiones) {
  const valores = sesiones.map(exactitudSesionAcademica).filter(valor => valor !== null);
  return valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : null;
}

function tendenciaAcademica(sesiones) {
  const partes = dividirCronologico(sesiones, "academicos");
  if (!partes) return "Aún no hay suficientes sesiones académicas comparables en el período para describir una tendencia temporal.";
  const inicial = mediaExactitud(partes.primeras);
  const reciente = mediaExactitud(partes.recientes);
  if (inicial === null || reciente === null) return "No hay suficientes respuestas calificadas para comparar la evolución académica.";
  const a = Math.round(inicial * 100);
  const b = Math.round(reciente * 100);
  if (a === b) return `En el conjunto observado, la proporción media de respuestas correctas se mantuvo alrededor de ${b} % entre ambas mitades del período.`;
  return b > a
    ? `En el conjunto observado, la proporción media de respuestas correctas subió de ${a} % a ${b} % entre la primera y la segunda mitad del período.`
    : `En el conjunto observado, la proporción media de respuestas correctas pasó de ${a} % a ${b} %. Conviene observar nuevas sesiones antes de interpretarlo como una tendencia estable.`;
}

function proporcionPrimeraLectura(sesiones) {
  const palabras = sesiones.flatMap(palabrasLectura);
  const validas = palabras.filter(item => numero(item?.intentos) > 0);
  if (!validas.length) return null;
  return validas.filter(item => estadoPalabraSuperada(item?.estado) && numero(item?.intentos) <= 1).length / validas.length;
}

function tendenciaLectura(sesiones) {
  const partes = dividirCronologico(sesiones, "lectura");
  if (!partes) return "Aún no hay suficientes lecturas comparables en el período para describir una tendencia temporal.";
  const inicial = proporcionPrimeraLectura(partes.primeras);
  const reciente = proporcionPrimeraLectura(partes.recientes);
  if (inicial === null || reciente === null) return "No hay suficientes datos de intentos de pronunciación para comparar la evolución en lectura.";
  const a = Math.round(inicial * 100);
  const b = Math.round(reciente * 100);
  if (a === b) return `En el conjunto de palabras observadas, la proporción superada a la primera se mantuvo alrededor de ${b} % entre ambas mitades del período.`;
  return b > a
    ? `En el conjunto de palabras observadas, la proporción superada a la primera subió de ${a} % a ${b} % entre ambas mitades del período.`
    : `En el conjunto de palabras observadas, la proporción superada a la primera pasó de ${a} % a ${b} %. Las lecturas no son idénticas, por lo que se presenta solo como señal descriptiva.`;
}

function mejorasDetectives(sesiones) {
  const porHistoria = new Map();
  sesiones.forEach(sesion => {
    const id = String(sesion.historiaId || "").trim();
    if (!id) return;
    const lista = porHistoria.get(id) || [];
    lista.push(sesion);
    porHistoria.set(id, lista);
  });

  return [...porHistoria.entries()].flatMap(([historiaId, lista]) => {
    const ordenadas = lista.sort((a, b) => fechaRegistro(a, "detectives") - fechaRegistro(b, "detectives"));
    if (ordenadas.length < 2) return [];
    const primero = Math.max(0, numero(ordenadas[0].intentosTotales));
    const ultimo = Math.max(0, numero(ordenadas.at(-1).intentosTotales));
    if (!primero || !ultimo || ultimo >= primero) return [];
    return [`🏅 En «${tituloHistoria(historiaId)}», los intentos totales pasaron de ${primero} a ${ultimo} entre dos resoluciones comparables del período.`];
  }).slice(0, 3);
}

function mejorasAcademicas(sesiones) {
  const porActividad = new Map();
  sesiones.forEach(sesion => {
    const id = String(sesion.actividadId || "").trim();
    if (!id) return;
    const lista = porActividad.get(id) || [];
    lista.push(sesion);
    porActividad.set(id, lista);
  });

  return [...porActividad.values()].flatMap(lista => {
    const ordenadas = lista.sort((a, b) => fechaRegistro(a, "academicos") - fechaRegistro(b, "academicos"));
    if (ordenadas.length < 2) return [];
    const primera = exactitudSesionAcademica(ordenadas[0]);
    const ultima = exactitudSesionAcademica(ordenadas.at(-1));
    if (primera === null || ultima === null || ultima <= primera) return [];
    const titulo = ordenadas.at(-1).tituloActividad || ordenadas.at(-1).tema || "Actividad académica";
    return [`🏅 En «${titulo}», la proporción de respuestas correctas pasó de ${Math.round(primera * 100)} % a ${Math.round(ultima * 100)} % entre dos sesiones comparables del período.`];
  }).slice(0, 3);
}

function listaHtml(items = [], vacio) {
  if (!items.length) {
    return `<p class="analisis-vacio">${escapar(vacio)}</p>`;
  }
  return `<ul>${items.map(item => `<li>${escapar(item)}</li>`).join("")}</ul>`;
}

function seccionHtml(icono, titulo, contenido, clase = "") {
  return `
    <section class="analisis-seccion superficie ${escapar(clase)}">
      <h3><span aria-hidden="true">${icono}</span> ${escapar(titulo)}</h3>
      ${contenido}
    </section>
  `;
}

function combinarResultados(resultados, clave) {
  return resultados.flatMap(resultado => resultado?.[clave] || []);
}

function renderReporte() {
  if (!cargado) return;
  const filtrados = registrosFiltrados();
  const contenedor = $("analisisResultado");
  const estado = $("estadoAnalisisEducativo");
  if (!contenedor || !estado) return;

  const analisis = [];
  if (filtrados.detectives.length) analisis.push(analizarDetectives(filtrados.detectives));
  if (filtrados.academicos.length) analisis.push(analizarAcademicos(filtrados.academicos));
  if (filtrados.lectura.length) analisis.push(analizarLectura(filtrados.lectura));

  const total = filtrados.detectives.length + filtrados.academicos.length + filtrados.lectura.length;
  estado.classList.add("hidden");

  const rangoTexto = `${formatearFecha(filtrados.rango.desde)} – ${formatearFecha(filtrados.rango.hasta)}`;
  const resumen = `
    <div class="analisis-resumen-grid">
      <article><strong>${total}</strong><span>actividades/sesiones observadas</span></article>
      <article><strong>${filtrados.detectives.length}</strong><span>Detectives</span></article>
      <article><strong>${filtrados.academicos.length}</strong><span>Pruebas académicas</span></article>
      <article><strong>${filtrados.lectura.length}</strong><span>Rincón de Lectura</span></article>
    </div>
    <p class="analisis-periodo-resumen">Período analizado: <strong>${escapar(rangoTexto)}</strong>.</p>
  `;

  if (!total) {
    contenedor.innerHTML =
      seccionHtml("📊", "Resumen del período", resumen) +
      `<div class="analisis-sin-datos superficie">
        <strong>No hay evidencias observables con estos filtros.</strong>
        <p>Prueba otro período, otro motor o elimina el filtro de tema.</p>
      </div>`;
    return;
  }

  const fortalezas = combinarResultados(analisis, "fortalezas");
  const aspectos = combinarResultados(analisis, "aspectos");
  const mejoras = combinarResultados(analisis, "mejoras");
  const actuaciones = combinarResultados(analisis, "actuaciones");
  const evoluciones = analisis.map(item => item.evolucion).filter(Boolean);
  const intentos = analisis.map(item => item.intentos).filter(Boolean);
  const pistas = analisis.map(item => item.pistas).filter(Boolean);

  contenedor.innerHTML =
    seccionHtml("📊", "Resumen del período", resumen) +
    seccionHtml(
      "💪",
      "Fortalezas observadas",
      listaHtml(fortalezas, "Aún no hay un patrón positivo repetido suficiente para destacarlo como fortaleza observable.")
    ) +
    seccionHtml(
      "🌱",
      "Aspectos a reforzar",
      listaHtml(aspectos, "No se detectó una necesidad repetida con los criterios actuales en este período.")
    ) +
    seccionHtml(
      "📈",
      "Evolución",
      listaHtml(evoluciones, "Aún no hay suficientes observaciones comparables para describir evolución.")
    ) +
    seccionHtml(
      "🎯",
      "Intentos",
      listaHtml(intentos, "No hay datos de intentos disponibles para los motores seleccionados.")
    ) +
    seccionHtml(
      "💡",
      "Uso de pistas y ayudas",
      listaHtml(pistas, "No hay datos de pistas o ayudas disponibles para los motores seleccionados.")
    ) +
    seccionHtml(
      "🏅",
      "Mejoras personales observables",
      listaHtml(mejoras, "Aún no hay dos resultados suficientemente comparables dentro del período para destacar una mejora personal concreta.")
    ) +
    seccionHtml(
      "🧭",
      "Propuestas de actuación",
      listaHtml(
        actuaciones,
        "Mantener la práctica normal y volver a revisar cuando existan nuevas evidencias observables."
      ),
      "analisis-seccion--actuacion"
    ) +
    `<aside class="analisis-principio superficie">
      <span aria-hidden="true">🦜</span>
      <p><strong>Cómo leer este reporte:</strong> describe hechos y tendencias del período. No etiqueta al alumno ni convierte una observación aislada en una característica personal.</p>
    </aside>`;
}

function opcionesTemaDisponibles() {
  const motor = $("analisisMotor")?.value || "todos";
  const rango = rangoSeleccionado();
  if (motor === "todos") return [];
  const lista = motor === "detectives"
    ? datos.detectives
    : motor === "academicos"
      ? datos.academicos
      : datos.lectura;
  return [...new Set(
    lista
      .filter(item => dentroRango(item, motor, rango))
      .map(item => temaRegistro(item, motor))
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b, "es"));
}

function actualizarTemas({ conservar = true } = {}) {
  const select = $("analisisTema");
  if (!select) return;
  const anterior = conservar ? select.value : "";
  const motor = $("analisisMotor")?.value || "todos";
  const opciones = opcionesTemaDisponibles();
  select.disabled = motor === "todos" || !opciones.length;
  select.innerHTML = `
    <option value="">${motor === "todos" ? "Todos los temas · elige un motor para filtrar" : "Todos los temas / focos"}</option>
    ${opciones.map(valor => `<option value="${escapar(valor)}">${escapar(valor)}</option>`).join("")}
  `;
  if (anterior && opciones.includes(anterior)) select.value = anterior;
}

function ajustarCamposPeriodo() {
  const personalizado = $("analisisPeriodo")?.value === "personalizado";
  $("analisisFechasPersonalizadas")?.classList.toggle("hidden", !personalizado);
}

async function cargarHistoriasDetectives() {
  try {
    const respuesta = await fetch(
      "../aventuras-matematicas/detectives/historias.json",
      { cache: "no-store" }
    );
    if (!respuesta.ok) return new Map();
    const historias = await respuesta.json();
    return new Map(
      (Array.isArray(historias) ? historias : [])
        .filter(item => item?.id)
        .map(item => [String(item.id), item])
    );
  } catch {
    return new Map();
  }
}

async function cargarFuentes() {
  if (cargando) return;
  cargando = true;
  const estado = $("estadoAnalisisEducativo");
  const resultado = $("analisisResultado");
  if (estado) {
    estado.classList.remove("hidden");
    estado.textContent = "🦜 Lía está reuniendo las evidencias observables del período...";
  }
  if (resultado) resultado.innerHTML = "";

  const incidencias = [];
  try {
    const contexto = await ContextoUsuario.inicializar();
    const uid = String(contexto.userIdPersonaActiva || "").trim();
    if (!uid) throw new Error("No se pudo resolver el alumno activo.");

    const [historialResult, academicosResult, lecturaResult, historias] = await Promise.all([
      obtenerHistorialDetectives(uid).catch(error => {
        incidencias.push(`Detectives: ${error.message || "no disponible"}`);
        return [];
      }),
      leerSesionesAcademicas({ maximo: MAXIMO_SESIONES_ACADEMICAS }).catch(error => {
        incidencias.push(`Pruebas académicas: ${error.message || "no disponible"}`);
        return [];
      }),
      Academia.rinconLectura.leerSesiones().catch(error => {
        incidencias.push(`Rincón de Lectura: ${error.message || "no disponible"}`);
        return [];
      }),
      cargarHistoriasDetectives()
    ]);

    const sesionesResult = await Promise.allSettled(
      historialResult.map(async historia => {
        const historiaId = String(historia.historiaId || historia.id || "");
        const sesiones = await obtenerSesionesHistoria(uid, historiaId);
        return sesiones.map(sesion => ({
          ...sesion,
          historiaId: String(sesion.historiaId || historiaId),
          nivel: numero(sesion.nivel, numero(historia.nivel, 1)),
          tema: String(sesion.tema || historia.tema || ""),
          estadoActual: String(historia.estado || "")
        }));
      })
    );

    const detectives = sesionesResult.flatMap((resultadoSesion, indice) => {
      if (resultadoSesion.status === "fulfilled") return resultadoSesion.value;
      incidencias.push(
        `Detectives · ${historialResult[indice]?.historiaId || historialResult[indice]?.id || "historia"}: no se pudo leer el historial.`
      );
      return [];
    });

    datos = {
      detectives,
      academicos: academicosResult,
      lectura: lecturaResult,
      historias,
      incidencias
    };
    cargado = true;
    actualizarTemas({ conservar: false });
    renderReporte();

    if (incidencias.length && estado) {
      estado.classList.remove("hidden");
      estado.textContent = `⚠️ El reporte se generó con datos parciales. ${incidencias.length} fuente(s) o historial(es) no pudieron leerse por completo.`;
    }
  } catch (error) {
    cargado = false;
    if (estado) {
      estado.classList.remove("hidden");
      estado.textContent = `No fue posible generar el análisis. Razón: ${error.message || "Error no identificado"}`;
    }
  } finally {
    cargando = false;
  }
}

function crearEstilos() {
  if (document.querySelector('link[data-analisis-educativo-css="true"]')) return;
  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./analisis-educativo.css", import.meta.url).href;
  enlace.dataset.analisisEducativoCss = "true";
  document.head.appendChild(enlace);
}

function crearInterfaz() {
  if ($("panelAnalisisEducativo")) return;
  const nav = document.querySelector(".tabs");
  const preparar = nav?.querySelector('[data-tab="crear"]');
  if (!nav || !preparar) return;

  const tab = document.createElement("button");
  tab.className = "tab";
  tab.type = "button";
  tab.dataset.tab = "analisis";
  tab.innerHTML = "📊 Análisis educativo";
  nav.insertBefore(tab, preparar);

  const panel = document.createElement("section");
  panel.id = "panelAnalisisEducativo";
  panel.className = "panel-seccion hidden";
  panel.setAttribute("aria-labelledby", "tituloAnalisisEducativo");
  panel.innerHTML = `
    <div class="cabecera-seccion">
      <div>
        <span class="eyebrow">Evidencias y tendencias</span>
        <h2 id="tituloAnalisisEducativo">📊 Análisis educativo</h2>
        <p>Reúne datos observables para reconocer fortalezas, necesidades y evolución sin etiquetar al alumno.</p>
      </div>
    </div>

    <section class="analisis-filtros superficie" aria-label="Filtros del análisis educativo">
      <label>
        <span>Período</span>
        <select id="analisisPeriodo">
          <option value="1m" selected>Último mes</option>
          <option value="2m">Últimos 2 meses</option>
          <option value="3m">Últimos 3 meses</option>
          <option value="personalizado">Personalizado</option>
        </select>
      </label>

      <div id="analisisFechasPersonalizadas" class="analisis-fechas hidden">
        <label>
          <span>Desde</span>
          <input id="analisisDesde" type="date">
        </label>
        <label>
          <span>Hasta</span>
          <input id="analisisHasta" type="date">
        </label>
      </div>

      <label>
        <span>Motor / Área</span>
        <select id="analisisMotor">
          <option value="todos" selected>Todos</option>
          <option value="detectives">Detectives</option>
          <option value="academicos">Pruebas académicas</option>
          <option value="lectura">Rincón de Lectura</option>
        </select>
      </label>

      <label class="analisis-filtro-tema">
        <span>Tema / Foco</span>
        <select id="analisisTema" disabled>
          <option value="">Todos los temas · elige un motor para filtrar</option>
        </select>
      </label>

      <button id="actualizarAnalisisEducativo" class="btn secundaria" type="button">
        ↻ Actualizar datos
      </button>
    </section>

    <aside class="analisis-aviso superficie">
      <span aria-hidden="true">🦜</span>
      <p><strong>Reporte descriptivo.</strong> Una observación aislada no se convierte en una etiqueta. Si faltan datos comparables, el reporte lo dirá expresamente.</p>
    </aside>

    <div id="estadoAnalisisEducativo" class="estado-carga" aria-live="polite">
      Abre esta sección para generar el reporte.
    </div>
    <div id="analisisResultado" class="analisis-resultado"></div>
  `;

  const panelCrear = $("panelCrear");
  panelCrear?.parentElement?.insertBefore(panel, panelCrear);

  const ahora = new Date();
  const hoy = new Date(ahora.getTime() - ahora.getTimezoneOffset() * 60000)
    .toISOString().slice(0, 10);
  const haceMes = restarMesesSeguro(ahora, 1);
  const desde = new Date(haceMes.getTime() - haceMes.getTimezoneOffset() * 60000)
    .toISOString().slice(0, 10);
  $("analisisDesde").value = desde;
  $("analisisHasta").value = hoy;
}

function abrirAnalisis() {
  $("panelLista")?.classList.add("hidden");
  $("panelCrear")?.classList.add("hidden");
  $("panelRefuerzos")?.classList.add("hidden");
  $("panelAnalisisEducativo")?.classList.remove("hidden");
  document.querySelectorAll("[data-tab]").forEach(item => {
    item.classList.toggle("active", item.dataset.tab === "analisis");
  });
  if (!cargado && !cargando) cargarFuentes();
}

function configurarEventos() {
  document.querySelectorAll("[data-tab]").forEach(tab => {
    tab.addEventListener("click", () => {
      if (tab.dataset.tab === "analisis") {
        window.setTimeout(abrirAnalisis, 0);
      } else {
        $("panelAnalisisEducativo")?.classList.add("hidden");
      }
    });
  });

  $("analisisPeriodo")?.addEventListener("change", () => {
    ajustarCamposPeriodo();
    actualizarTemas();
    renderReporte();
  });
  $("analisisDesde")?.addEventListener("change", () => {
    actualizarTemas();
    renderReporte();
  });
  $("analisisHasta")?.addEventListener("change", () => {
    actualizarTemas();
    renderReporte();
  });
  $("analisisMotor")?.addEventListener("change", () => {
    actualizarTemas({ conservar: false });
    renderReporte();
  });
  $("analisisTema")?.addEventListener("change", renderReporte);
  $("actualizarAnalisisEducativo")?.addEventListener("click", cargarFuentes);

  if (new URLSearchParams(window.location.search).get("vista") === "analisis") {
    window.setTimeout(abrirAnalisis, 0);
  }
}

function iniciar() {
  crearEstilos();
  crearInterfaz();
  ajustarCamposPeriodo();
  configurarEventos();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
