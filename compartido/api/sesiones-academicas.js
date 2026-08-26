/* ==========================================================
   Academia Gloria Valentina
   sesiones-academicas.js
   Persistencia mínima de sesiones académicas · Piloto 6.º SIGNATURE

   Principios:
   - La Vista previa nunca genera evidencia académica.
   - Una Sesión de aprendizaje pertenece a la Persona Activa.
   - Guardar datos no equivale a declarar dominio.
   - Se conserva información útil para observar progreso: intentos,
     apoyos, variantes y transferencia.
   ========================================================== */

import { db, auth } from "../firebase/firebase-config.js";
import { ContextoUsuario } from "../js/contexto-usuario.js";

import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const MODOS_VALIDOS = Object.freeze(["aprendizaje", "vista_previa"]);
const FASES_VALIDAS = Object.freeze([
  "practicar",
  "comprobar",
  "transferir"
]);

function texto(valor, respaldo = "") {
  const resultado = String(valor ?? "").trim();
  return resultado || respaldo;
}

function numero(valor, respaldo = 0) {
  const resultado = Number(valor);
  return Number.isFinite(resultado) ? resultado : respaldo;
}

function booleano(valor) {
  return valor === true;
}

function coleccionSesionesAcademicas(userId) {
  const id = texto(userId);
  if (!id) {
    throw new Error("Falta el Usuario asociado a la Persona Activa.");
  }

  return collection(db, "usuarios", id, "sesionesAcademicas");
}

function normalizarRespuesta(respuesta = {}) {
  const fase = FASES_VALIDAS.includes(respuesta.fase)
    ? respuesta.fase
    : "practicar";

  return {
    preguntaId: texto(respuesta.preguntaId),
    familiaId: texto(respuesta.familiaId),
    conceptoId: texto(respuesta.conceptoId),
    varianteId: texto(respuesta.varianteId),
    fase,
    formato: texto(respuesta.formato, "seleccion"),
    respuesta: texto(respuesta.respuesta),
    correcta: booleano(respuesta.correcta),
    intentos: Math.max(0, Math.trunc(numero(respuesta.intentos))),
    pistasUsadas: Math.max(0, Math.trunc(numero(respuesta.pistasUsadas))),
    correctaPrimerIntento: booleano(respuesta.correctaPrimerIntento),
    resolucionAutonoma: booleano(respuesta.resolucionAutonoma),
    tiempoSegundos: Math.max(0, Math.round(numero(respuesta.tiempoSegundos)))
  };
}

function normalizarSesion(sesion = {}, contexto) {
  const modo = MODOS_VALIDOS.includes(sesion.modo)
    ? sesion.modo
    : "vista_previa";

  const temaId = texto(sesion.temaId);
  const temaTitulo = texto(sesion.temaTitulo);
  const actividadId = texto(sesion.actividadId);

  if (!temaId || !temaTitulo || !actividadId) {
    throw new Error(
      "La sesión académica debe indicar tema, título y actividad."
    );
  }

  const respuestas = Array.isArray(sesion.respuestas)
    ? sesion.respuestas.map(normalizarRespuesta)
    : [];

  const resumenEntrada =
    sesion.resumen && typeof sesion.resumen === "object"
      ? sesion.resumen
      : {};

  return {
    schemaVersion: 1,
    modo,
    curso: texto(sesion.curso),
    materia: texto(sesion.materia),
    temaId,
    temaTitulo,
    actividadId,
    tipoExperiencia: texto(sesion.tipoExperiencia, "tema_academico"),
    origen: texto(sesion.origen, "mis-cursos"),
    misionId: texto(sesion.misionId) || null,

    personaId: texto(contexto.personaActiva?.personaId),
    alumnoUserId: texto(contexto.userIdPersonaActiva),
    actorUserId: texto(contexto.usuario?.userId, auth.currentUser?.uid),

    inicioCliente: texto(sesion.inicioCliente),
    finCliente: texto(sesion.finCliente),
    duracionSegundos: Math.max(0, Math.round(numero(sesion.duracionSegundos))),

    respuestas,

    resumen: {
      preguntasRespondidas: Math.max(
        0,
        Math.trunc(numero(resumenEntrada.preguntasRespondidas, respuestas.length))
      ),
      correctas: Math.max(0, Math.trunc(numero(resumenEntrada.correctas))),
      autonomas: Math.max(0, Math.trunc(numero(resumenEntrada.autonomas))),
      pistasUsadas: Math.max(0, Math.trunc(numero(resumenEntrada.pistasUsadas))),
      intentosTotales: Math.max(
        0,
        Math.trunc(numero(resumenEntrada.intentosTotales))
      ),
      transferenciaCorrecta: booleano(resumenEntrada.transferenciaCorrecta),
      comprobacionCorrecta: booleano(resumenEntrada.comprobacionCorrecta)
    },

    observaciones: Array.isArray(sesion.observaciones)
      ? sesion.observaciones.map(item => texto(item)).filter(Boolean).slice(0, 12)
      : []
  };
}

/**
 * Guarda una sesión académica solo cuando el modo es aprendizaje.
 *
 * La Vista previa es deliberadamente un no-op de persistencia. Esto permite
 * que familia y profesionales exploren una experiencia sin contaminar el
 * historial educativo de la Persona Activa.
 */
async function guardarSesion(sesion = {}) {
  const modo = MODOS_VALIDOS.includes(sesion.modo)
    ? sesion.modo
    : "vista_previa";

  if (modo === "vista_previa") {
    return Object.freeze({
      guardada: false,
      modo,
      motivo: "vista_previa"
    });
  }

  const contexto = await ContextoUsuario.inicializar();
  const esAdministrador = await ContextoUsuario.esAdministrador();

  /*
   * En el piloto inicial una sesión persistente se admite cuando el alumno
   * trabaja sobre su propia Persona o cuando interviene Administración.
   * Los perfiles relacionados de consulta/gestión utilizan Vista previa.
   * Esto evita alterar el progreso accidentalmente y respeta las reglas
   * Firestore vigentes sin ampliar permisos de forma prematura.
   */
  if (!contexto.esPersonaPropia && !esAdministrador) {
    throw new Error(
      "Esta cuenta puede explorar la actividad, pero no registrar una sesión académica para otra Persona."
    );
  }

  const datos = normalizarSesion(sesion, contexto);

  const referencia = await addDoc(
    coleccionSesionesAcademicas(contexto.userIdPersonaActiva),
    {
      ...datos,
      creadaEn: serverTimestamp(),
      actualizadaEn: serverTimestamp()
    }
  );

  return Object.freeze({
    guardada: true,
    modo,
    sesionId: referencia.id
  });
}

async function leerSesiones() {
  const contexto = await ContextoUsuario.inicializar();
  const resultado = await getDocs(
    query(
      coleccionSesionesAcademicas(contexto.userIdPersonaActiva),
      orderBy("creadaEn", "desc")
    )
  );

  return resultado.docs.map(documento => ({
    id: documento.id,
    ...documento.data()
  }));
}

export const SesionesAcademicas = Object.freeze({
  MODOS: Object.freeze({
    APRENDIZAJE: "aprendizaje",
    VISTA_PREVIA: "vista_previa"
  }),
  guardar: guardarSesion,
  leer: leerSesiones
});

export {
  guardarSesion,
  leerSesiones
};
