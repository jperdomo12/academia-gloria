/* Academia Gloria Valentina · Eliminación completa y controlada de Misiones */

import "./datos-prueba-misiones.js";
import { db } from "../../compartido/firebase/firebase-config.js";
import { Academia } from "../../compartido/api/academia.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";
import {
  eliminarSesionHistoria,
  obtenerSesionHistoria
} from "../../compartido/js/detectives-progreso.js";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const CINCO_MINUTOS = 5 * 60 * 1000;
const ESTADOS_PROTEGIDOS = new Set([
  "completada",
  "pendiente_validacion",
  "completada_pendiente_validacion"
]);

let interceptorInstalado = false;

function texto(valor = "") {
  return String(valor ?? "").trim();
}

function fechaMs(valor) {
  if (!valor) return 0;
  if (typeof valor?.toMillis === "function") return valor.toMillis();
  if (typeof valor?.toDate === "function") return valor.toDate().getTime();
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? 0 : fecha.getTime();
}

function fechaEvidencia(evidencia = {}) {
  return fechaMs(
    evidencia.ocurridaEn ||
    evidencia.aplicadaEn ||
    evidencia.creadaEn
  );
}

function esAcademica(evidencia = {}) {
  const origen = texto(evidencia.origen);
  const tipo = texto(evidencia.tipo);
  return (
    origen === "sesion_academica" ||
    tipo === "sesion_academica" ||
    tipo === "refuerzo_academico"
  );
}

async function leerDocumentoUsuario(userId, coleccionNombre, documentoId) {
  const id = texto(documentoId);
  if (!id) return null;

  const resultado = await getDoc(
    doc(db, "usuarios", userId, coleccionNombre, id)
  );

  return resultado.exists()
    ? { id: resultado.id, ...resultado.data() }
    : null;
}

function operacionFirestore({ motor, coleccionNombre, documentoId, detalle }) {
  return {
    clave: `${coleccionNombre}::${documentoId}`,
    tipo: "firestore",
    motor,
    coleccionNombre,
    documentoId,
    detalle
  };
}

function operacionDetectives({ historiaId, sesionId }) {
  return {
    clave: `detectives::${historiaId}::${sesionId}`,
    tipo: "detectives",
    motor: "Detectives",
    historiaId,
    sesionId,
    detalle: "Sesión exacta de Detectives; su resumen se recalculará al eliminarla."
  };
}

async function clasificarEvidencia(evidencia, userId, misionId) {
  const modulo = texto(evidencia.modulo);
  const tipo = texto(evidencia.tipo);
  const actividadId = texto(evidencia.actividadId);
  const sesionId = texto(evidencia.sesionId);

  if (modulo === "detectives") {
    if (!actividadId || !sesionId) {
      return {
        operacion: null,
        conservada: null,
        nota: "Evidencia de Detectives sin identificadores suficientes; se eliminará la evidencia, pero no se tocará ningún historial no identificable."
      };
    }

    const sesion = await obtenerSesionHistoria(userId, actividadId, sesionId);
    return sesion
      ? { operacion: operacionDetectives({ historiaId: actividadId, sesionId }), conservada: null }
      : {
          operacion: null,
          conservada: null,
          nota: "La sesión de Detectives indicada por la evidencia ya no existe."
        };
  }

  if (esAcademica(evidencia)) {
    if (!sesionId) {
      return {
        operacion: null,
        conservada: null,
        nota: "Evidencia académica sin sesionId; se eliminará la evidencia sin borrar un registro no identificable."
      };
    }

    const sesion = await leerDocumentoUsuario(userId, "sesionesAcademicas", sesionId);
    if (!sesion) {
      return { operacion: null, conservada: null, nota: "La sesión académica ya no existe." };
    }

    if (texto(sesion.misionId) && texto(sesion.misionId) !== misionId) {
      return {
        operacion: null,
        conservada: {
          motor: "Pruebas académicas",
          detalle: "La sesión académica está actualmente asociada a otra Misión y se conserva."
        }
      };
    }

    return {
      operacion: operacionFirestore({
        motor: "Pruebas académicas",
        coleccionNombre: "sesionesAcademicas",
        documentoId: sesionId,
        detalle: "Sesión académica exacta vinculada a la Misión."
      }),
      conservada: null
    };
  }

  if (modulo === "creciendo-por-dentro") {
    if (!sesionId) {
      return {
        operacion: null,
        conservada: null,
        nota: "Evidencia de Creciendo por Dentro sin sesionId; se eliminará la evidencia sin borrar un registro no identificable."
      };
    }

    const sesion = await leerDocumentoUsuario(userId, "sesionesSemillas", sesionId);
    if (!sesion) {
      return { operacion: null, conservada: null, nota: "La sesión de la Semilla ya no existe." };
    }

    if (texto(sesion.misionId) && texto(sesion.misionId) !== misionId) {
      return {
        operacion: null,
        conservada: {
          motor: "Creciendo por Dentro",
          detalle: "La sesión está actualmente asociada a otra Misión y se conserva."
        }
      };
    }

    return {
      operacion: operacionFirestore({
        motor: "Creciendo por Dentro",
        coleccionNombre: "sesionesSemillas",
        documentoId: sesionId,
        detalle: "Sesión independiente de Semilla vinculada a la Misión."
      }),
      conservada: null
    };
  }

  if (modulo === "rincon-lectura" && tipo === "pronunciacion_completada") {
    return {
      operacion: null,
      conservada: null,
      nota: "La práctica de pronunciación se conserva dentro de la propia evidencia; no existe una sesión paralela que borrar."
    };
  }

  if (modulo === "rincon-lectura" && tipo === "lectura_completada") {
    const historiaId = actividadId || sesionId;
    if (!historiaId) {
      return {
        operacion: null,
        conservada: null,
        nota: "Evidencia de lectura sin historia identificable; solo se eliminará la evidencia."
      };
    }

    const sesion = await leerDocumentoUsuario(userId, "sesionesLectura", historiaId);
    if (!sesion) {
      return { operacion: null, conservada: null, nota: "El registro de lectura ya no existe." };
    }

    const evidenciaEn = fechaEvidencia(evidencia);
    const sesionEn = fechaMs(sesion.actualizadaEn || sesion.creadaEn);
    const fueActualizadaDespues = Boolean(
      evidenciaEn && sesionEn && sesionEn > evidenciaEn + CINCO_MINUTOS
    );

    if (!evidenciaEn || fueActualizadaDespues) {
      return {
        operacion: null,
        conservada: {
          motor: "Rincón de Lectura",
          detalle: fueActualizadaDespues
            ? "La historia fue actualizada después de esta Misión; se conserva la lectura posterior y solo se elimina el vínculo antiguo."
            : "No hay fecha suficiente para demostrar que el registro actual pertenece exclusivamente a la Misión; se conserva por seguridad."
        }
      };
    }

    return {
      operacion: operacionFirestore({
        motor: "Rincón de Lectura",
        coleccionNombre: "sesionesLectura",
        documentoId: historiaId,
        detalle: "El registro actual de la historia coincide temporalmente con la evidencia y no muestra una actualización posterior."
      }),
      conservada: null
    };
  }

  return {
    operacion: null,
    conservada: sesionId
      ? {
          motor: modulo || "Otro módulo",
          detalle: "Existe un identificador de sesión de un tipo no administrado por este borrado; se conserva el registro y se elimina únicamente la evidencia de la Misión."
        }
      : null,
    nota: "Evidencia sin sesión administrada por la eliminación automática."
  };
}

async function agregarSesionesLigadasDirectamente(
  userId,
  misionId,
  operaciones,
  tarea,
  evidencias
) {
  const necesitaAcademicas =
    tarea?.tipo === "repaso_academico" ||
    evidencias.some(esAcademica);
  const necesitaSemillas =
    texto(tarea?.modulo) === "creciendo-por-dentro" ||
    evidencias.some(evidencia => texto(evidencia.modulo) === "creciendo-por-dentro");

  const colecciones = [];
  if (necesitaAcademicas) {
    colecciones.push({ nombre: "sesionesAcademicas", motor: "Pruebas académicas" });
  }
  if (necesitaSemillas) {
    colecciones.push({ nombre: "sesionesSemillas", motor: "Creciendo por Dentro" });
  }

  for (const item of colecciones) {
    const resultado = await getDocs(
      query(
        collection(db, "usuarios", userId, item.nombre),
        where("misionId", "==", misionId)
      )
    );

    resultado.docs.forEach(documento => {
      const operacion = operacionFirestore({
        motor: item.motor,
        coleccionNombre: item.nombre,
        documentoId: documento.id,
        detalle: "Sesión con misionId explícito, localizada aunque la evidencia correspondiente falte."
      });
      operaciones.set(operacion.clave, operacion);
    });
  }
}

export async function prepararEliminacionMision(
  misionIdEntrada,
  { permitirMisionAusente = false } = {}
) {
  const misionId = texto(misionIdEntrada);
  if (!misionId) throw new Error("Falta el identificador de la Misión.");

  const contexto = await ContextoUsuario.inicializar();
  const userId = texto(contexto.userIdPersonaActiva);
  if (!userId) throw new Error("No se pudo resolver el alumno activo.");

  const [tarea, evidencias] = await Promise.all([
    Academia.tareas.obtener(misionId),
    Academia.evidencias.leerPorMision(misionId)
  ]);

  if (!tarea && !permitirMisionAusente) {
    throw new Error("La Misión ya no existe. Actualiza la lista antes de continuar.");
  }

  const operaciones = new Map();
  const conservadas = [];
  const notas = [];

  for (const evidencia of evidencias) {
    const resultado = await clasificarEvidencia(evidencia, userId, misionId);
    if (resultado.operacion) {
      operaciones.set(resultado.operacion.clave, resultado.operacion);
    }
    if (resultado.conservada) conservadas.push(resultado.conservada);
    if (resultado.nota) notas.push(resultado.nota);
  }

  await agregarSesionesLigadasDirectamente(
    userId,
    misionId,
    operaciones,
    tarea,
    evidencias
  );

  return {
    userId,
    misionId,
    tarea,
    evidencias,
    sesionesEliminar: [...operaciones.values()],
    sesionesConservar: conservadas,
    notas
  };
}

async function borrarSesion(userId, operacion) {
  if (operacion.tipo === "detectives") {
    await eliminarSesionHistoria(
      userId,
      operacion.historiaId,
      operacion.sesionId
    );
    return;
  }

  await deleteDoc(
    doc(
      db,
      "usuarios",
      userId,
      operacion.coleccionNombre,
      operacion.documentoId
    )
  );
}

export async function ejecutarEliminacionPreparada(
  preparacion,
  { eliminarMision = Boolean(preparacion?.tarea) } = {}
) {
  if (!preparacion?.misionId) {
    throw new Error("No hay una eliminación preparada.");
  }

  const esperabaMision = Boolean(preparacion.tarea);
  const validacion = await prepararEliminacionMision(
    preparacion.misionId,
    { permitirMisionAusente: !esperabaMision }
  );

  if (esperabaMision && !validacion.tarea) {
    throw new Error("La Misión cambió o fue eliminada durante la validación. Actualiza antes de continuar.");
  }
  if (!esperabaMision && validacion.tarea) {
    throw new Error("La Misión volvió a existir durante la validación. Actualiza antes de continuar.");
  }

  let sesionesEliminadas = 0;
  let evidenciasEliminadas = 0;

  for (const operacion of validacion.sesionesEliminar) {
    await borrarSesion(validacion.userId, operacion);
    sesionesEliminadas += 1;
  }

  for (const evidencia of validacion.evidencias) {
    await deleteDoc(
      doc(
        db,
        "usuarios",
        validacion.userId,
        "evidencias",
        evidencia.id
      )
    );
    evidenciasEliminadas += 1;
  }

  let misionEliminada = false;
  if (eliminarMision && validacion.tarea) {
    await Academia.tareas.eliminar(validacion.misionId);
    misionEliminada = true;
  }

  return {
    ...validacion,
    sesionesEliminadas,
    evidenciasEliminadas,
    misionEliminada
  };
}

export function textoResumenEliminacion(preparacion = {}) {
  const evidencias = preparacion.evidencias?.length || 0;
  const sesiones = preparacion.sesionesEliminar?.length || 0;
  const conservadas = preparacion.sesionesConservar?.length || 0;

  return {
    evidencias,
    sesiones,
    conservadas,
    descripcionConservadas: conservadas
      ? `${conservadas} registro(s) posterior(es), reutilizado(s) o no demostrablemente exclusivo(s) se conservarán.`
      : "No se detectaron registros posteriores que deban conservarse."
  };
}

export function instalarEliminacionMisionCompleta() {
  if (interceptorInstalado) return;
  interceptorInstalado = true;

  document.addEventListener("click", async event => {
    const boton = event.target?.closest?.('button[data-action="delete"]');
    if (!boton) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const misionId = texto(boton.dataset.id);
    if (!misionId || boton.disabled) return;

    boton.disabled = true;
    const textoOriginal = boton.textContent;
    boton.textContent = "🔎 Revisando…";

    try {
      const preparacion = await prepararEliminacionMision(misionId);
      const tarea = preparacion.tarea;

      if (!tarea) {
        throw new Error("La Misión ya no está disponible.");
      }

      if (ESTADOS_PROTEGIDOS.has(texto(tarea.estado))) {
        throw new Error(
          "Esta Misión ya forma parte del historial protegido y no puede eliminarse desde esta acción."
        );
      }

      const resumen = textoResumenEliminacion(preparacion);
      const titulo = texto(tarea.titulo) || "Misión sin título";
      const mensaje = [
        "Eliminar Misión significa eliminar también todo lo que pertenezca exclusivamente a ella.",
        "",
        `Misión: ${titulo}`,
        `• ${resumen.evidencias} evidencia(s) vinculada(s)`,
        `• ${resumen.sesiones} sesión(es)/registro(s) exclusivo(s) que se eliminarán`,
        `• ${resumen.conservadas} registro(s) posterior(es) o reutilizado(s) que se conservarán`,
        "",
        "En Rincón de Lectura, una historia actualizada después se protege automáticamente.",
        "",
        "¿Quieres eliminar esta Misión definitivamente?"
      ].join("\n");

      if (!window.confirm(mensaje)) {
        boton.disabled = false;
        boton.textContent = textoOriginal;
        return;
      }

      boton.textContent = "🧹 Eliminando…";
      const resultado = await ejecutarEliminacionPreparada(preparacion, {
        eliminarMision: true
      });

      const conservadas = resultado.sesionesConservar?.length || 0;
      window.alert(
        `✅ Misión eliminada completamente.\n\n` +
        `• ${resultado.evidenciasEliminadas} evidencia(s) eliminada(s)\n` +
        `• ${resultado.sesionesEliminadas} sesión(es)/registro(s) exclusivo(s) eliminado(s)` +
        (conservadas
          ? `\n• ${conservadas} registro(s) posterior(es) conservado(s) por seguridad`
          : "")
      );
    } catch (error) {
      console.error("No se pudo completar la eliminación de la Misión.", error);
      window.alert(
        `No se pudo completar la eliminación.\n${error.message || "Error no identificado"}`
      );
      boton.disabled = false;
      boton.textContent = textoOriginal;
    }
  }, true);
}
