/* Academia Gloria Valentina · Sesiones Académicas · piloto 6.º */

import { db } from "../firebase/firebase-config.js";
import { ContextoUsuario } from "./contexto-usuario.js";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const COLECCION = "sesionesAcademicas";
const APRENDIZAJE = "aprendizaje";
const VISTA_PREVIA = "vista_previa";

function texto(valor, alternativo = "") {
  const resultado = String(valor ?? "").trim();
  return resultado || alternativo;
}

function numero(valor, alternativo = 0) {
  const resultado = Number(valor);
  return Number.isFinite(resultado) ? resultado : alternativo;
}

function limpiar(valor) {
  if (valor === undefined) return null;
  if (Array.isArray(valor)) return valor.filter(v => v !== undefined).map(limpiar);
  if (valor && typeof valor === "object" && !(valor instanceof Date)) {
    return Object.fromEntries(
      Object.entries(valor)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, limpiar(v)])
    );
  }
  return valor;
}

function coleccionSesiones(userId) {
  return collection(db, "usuarios", userId, COLECCION);
}

function fechaOrden(valor) {
  if (!valor) return 0;
  if (typeof valor.toMillis === "function") return valor.toMillis();
  const t = Date.parse(valor);
  return Number.isFinite(t) ? t : 0;
}

export async function guardarSesionAcademica(registro = {}) {
  if (texto(registro.modo) === VISTA_PREVIA) {
    return { guardado: false, modo: VISTA_PREVIA, motivo: "vista_previa" };
  }

  const contexto = await ContextoUsuario.inicializar();
  const actividadId = texto(registro.actividadId);
  const cursoReferencia = texto(registro.cursoReferencia);
  const materia = texto(registro.materia);
  const tema = texto(registro.tema);

  if (!actividadId || !cursoReferencia || !materia || !tema) {
    throw new Error("La sesión requiere actividad, curso, materia y tema.");
  }

  const referencia = doc(coleccionSesiones(contexto.userIdPersonaActiva));
  const datos = limpiar({
    contrato: "sesion-academica-v1",
    modo: APRENDIZAJE,
    personaId: contexto.personaActiva.personaId,
    alumnoUserId: contexto.userIdPersonaActiva,
    actorUserId: contexto.usuario.userId,
    actividadId,
    tituloActividad: texto(registro.tituloActividad),
    versionActividad: texto(registro.versionActividad),
    cursoReferencia,
    materia,
    tema,
    origen: texto(registro.origen, "curso"),
    misionId: texto(registro.misionId) || null,
    inicioCliente: texto(registro.inicioCliente) || null,
    finCliente: texto(registro.finCliente) || null,
    tiempoActivoSegundos: Math.max(0, numero(registro.tiempoActivoSegundos)),
    tiempoActivoPorSegmento: registro.tiempoActivoPorSegmento || {},
    conceptosTrabajados: Array.isArray(registro.conceptosTrabajados)
      ? registro.conceptosTrabajados.map(v => texto(v)).filter(Boolean)
      : [],
    variantes: Array.isArray(registro.variantes) ? registro.variantes : [],
    respuestas: Array.isArray(registro.respuestas) ? registro.respuestas : [],
    resumen: registro.resumen && typeof registro.resumen === "object"
      ? registro.resumen
      : {},
    retroalimentacion:
      registro.retroalimentacion && typeof registro.retroalimentacion === "object"
        ? registro.retroalimentacion
        : {},
    createdBy: contexto.usuario.userId,
    updatedBy: contexto.usuario.userId
  });

  await setDoc(referencia, {
    ...datos,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    completadaEn: serverTimestamp()
  });

  return {
    guardado: true,
    modo: APRENDIZAJE,
    sesionId: referencia.id,
    personaId: contexto.personaActiva.personaId,
    alumnoUserId: contexto.userIdPersonaActiva
  };
}

export async function leerSesionesAcademicas({ actividadId = "", maximo = 20 } = {}) {
  const contexto = await ContextoUsuario.inicializar();
  const resultado = await getDocs(coleccionSesiones(contexto.userIdPersonaActiva));
  const filtro = texto(actividadId);
  const limite = Math.max(1, Math.min(100, numero(maximo, 20)));

  return resultado.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(item => !filtro || item.actividadId === filtro)
    .sort((a, b) => fechaOrden(b.completadaEn || b.updatedAt) - fechaOrden(a.completadaEn || a.updatedAt))
    .slice(0, limite);
}

export async function obtenerVariantesRecientes({ actividadId, maximoSesiones = 4 } = {}) {
  const sesiones = await leerSesionesAcademicas({
    actividadId,
    maximo: maximoSesiones
  });

  return new Set(
    sesiones.flatMap(sesion =>
      Array.isArray(sesion.variantes)
        ? sesion.variantes.map(v => texto(v?.varianteId || v?.id)).filter(Boolean)
        : []
    )
  );
}

export const MODOS_SESION_ACADEMICA = Object.freeze({
  APRENDIZAJE,
  VISTA_PREVIA
});
