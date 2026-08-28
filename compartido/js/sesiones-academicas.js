/* Academia Gloria Valentina · Sesiones Académicas · piloto 6.º */

import { db } from "../firebase/firebase-config.js";
import { ContextoUsuario } from "./contexto-usuario.js";
import {
  collection,
  doc,
  getDoc,
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

function resolverMisionId(registro = {}) {
  const explicito = texto(registro.misionId);
  if (explicito) return explicito;

  if (typeof window === "undefined") return "";

  try {
    return texto(new URLSearchParams(window.location.search).get("misionId"));
  } catch {
    return "";
  }
}

function destinoRevisionActual(sesionId, misionId = "") {
  try {
    const destino = new URL(
      "../../mi-universo/mis-tareas/resultado-academico.html",
      import.meta.url
    );

    const sesion = texto(sesionId);
    const mision = texto(misionId);

    if (sesion) destino.searchParams.set("sesionId", sesion);
    if (mision) destino.searchParams.set("misionId", mision);

    return destino.href;
  } catch {
    return "";
  }
}

async function registrarEvidenciaMisionAcademica(datos, sesionId) {
  if (!datos.misionId) {
    return { registrada: false, motivo: "sin_mision" };
  }

  try {
    /*
     * Reutilizamos el contrato vigente de Misiones/Evidencias.
     * Repaso Académico sigue siendo una tarea/misión normal: no se crea
     * colección paralela ni se duplica la sesión académica.
     */
    const { Academia } = await import("../api/academia.js");
    const tarea = await Academia.tareas.obtener(datos.misionId);

    if (!tarea) {
      return { registrada: false, motivo: "mision_no_encontrada" };
    }

    if (tarea.tipo !== "repaso_academico") {
      return { registrada: false, motivo: "mision_no_academica" };
    }

    const criterio =
      tarea.criterioCumplimiento &&
      typeof tarea.criterioCumplimiento === "object"
        ? tarea.criterioCumplimiento
        : {};

    const moduloEvidencia = texto(
      criterio.modulo,
      texto(tarea.modulo, "libre")
    );
    const tipoEvidencia = texto(
      criterio.evidenciaTipo,
      "sesion_academica"
    );

    const resultado = await Academia.tareas.registrarEvidencia({
      misionId: datos.misionId,
      modulo: moduloEvidencia,
      tipo: tipoEvidencia,
      actividadId: datos.actividadId,
      sesionId,
      atributos: {
        cursoReferencia: datos.cursoReferencia,
        materia: datos.materia,
        tema: datos.tema
      },
      resultado: {
        titulo: datos.tituloActividad || datos.tema,
        resumen: datos.resumen || {}
      },
      destinoRevision: destinoRevisionActual(sesionId, datos.misionId),
      origen: "sesion_academica"
    });

    return {
      registrada: true,
      ...resultado
    };
  } catch (error) {
    /*
     * La sesión ya quedó guardada. Un fallo al enlazar la evidencia no debe
     * convertir ese guardado correcto en un falso error ni provocar duplicados
     * si el alumno repite la acción.
     */
    console.warn(
      "La sesión académica se guardó, pero no pudo enlazarse con la Misión.",
      error
    );

    return {
      registrada: false,
      motivo: "error_registro_evidencia",
      error: texto(
        error?.message,
        "No se pudo enlazar la evidencia con la Misión."
      )
    };
  }
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
  const misionId = resolverMisionId(registro);

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
    origen: misionId ? "mision" : texto(registro.origen, "curso"),
    misionId: misionId || null,
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

  const evidenciaMision = await registrarEvidenciaMisionAcademica(
    datos,
    referencia.id
  );

  return {
    guardado: true,
    modo: APRENDIZAJE,
    sesionId: referencia.id,
    personaId: contexto.personaActiva.personaId,
    alumnoUserId: contexto.userIdPersonaActiva,
    misionId: datos.misionId,
    evidenciaMision
  };
}

export async function leerSesionAcademica(sesionId) {
  const id = texto(sesionId);
  if (!id) return null;

  const contexto = await ContextoUsuario.inicializar();
  const referencia = doc(
    coleccionSesiones(contexto.userIdPersonaActiva),
    id
  );
  const resultado = await getDoc(referencia);

  return resultado.exists()
    ? { id: resultado.id, ...resultado.data() }
    : null;
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
