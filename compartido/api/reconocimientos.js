/* Academia Gloria Valentina · Recompensas A1/A2 · Reconocimientos humanos y Guacamayas */

import { db, auth } from "../firebase/firebase-config.js";
import { ContextoUsuario } from "../js/contexto-usuario.js";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const CATEGORIAS = new Set([
  "perseverancia",
  "autonomia",
  "curiosidad",
  "pensamiento",
  "equipo",
  "crecimiento",
  "progreso",
  "otro"
]);

export const CATALOGO_GUACAMAYAS = Object.freeze({
  valiente: Object.freeze({
    nombre: "Guacamaya Valiente",
    categoria: "perseverancia",
    descripcion: "Recuperarse tras una dificultad real y volver a intentarlo."
  }),
  alas_propias: Object.freeze({
    nombre: "Guacamaya Alas Propias",
    categoria: "autonomia",
    descripcion: "Un hito de autonomía, independencia o responsabilidad creciente."
  }),
  curiosa: Object.freeze({
    nombre: "Guacamaya Curiosa",
    categoria: "curiosidad",
    descripcion: "Querer descubrir, leer o aprender algo con iniciativa y significado."
  }),
  pensadora: Object.freeze({
    nombre: "Guacamaya Pensadora",
    categoria: "pensamiento",
    descripcion: "Analizar, revisar un error o probar una estrategia de forma significativa."
  }),
  equipo: Object.freeze({
    nombre: "Guacamaya de Equipo",
    categoria: "equipo",
    descripcion: "Cooperar de verdad con la familia, aportando cada uno una parte distinta."
  }),
  crecimiento: Object.freeze({
    nombre: "Guacamaya de Crecimiento",
    categoria: "crecimiento",
    descripcion: "Reconocer un descubrimiento importante sobre sí misma o una habilidad para la vida."
  })
});

function texto(valor = "") {
  return String(valor ?? "").replace(/\s+/g, " ").trim();
}

function actorActual() {
  const uid = texto(auth.currentUser?.uid);
  if (!uid) throw new Error("No hay ningún usuario autenticado.");
  return uid;
}

async function userIdPersonaActiva() {
  const userId = texto(await ContextoUsuario.obtenerUserIdPersonaActiva());
  if (!userId) {
    throw new Error("No se pudo resolver el Usuario asociado a la Persona Activa.");
  }
  return userId;
}

function coleccionReconocimientos(userId) {
  return collection(db, "usuarios", userId, "reconocimientos");
}

function idReconocimientoMision(misionId) {
  const id = texto(misionId);
  if (!id) throw new Error("Falta el identificador de la Misión.");
  return `mision__${id}`;
}

function referenciaReconocimientoMision(userId, misionId) {
  return doc(
    db,
    "usuarios",
    userId,
    "reconocimientos",
    idReconocimientoMision(misionId)
  );
}

function referenciaMision(userId, misionId) {
  const id = texto(misionId);
  if (!id) throw new Error("Falta el identificador de la Misión.");
  return doc(db, "usuarios", userId, "tareas", id);
}

function fechaMs(valor) {
  if (!valor) return 0;
  if (typeof valor?.toMillis === "function") return valor.toMillis();
  if (typeof valor?.toDate === "function") return valor.toDate().getTime();
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? 0 : fecha.getTime();
}

function normalizarDocumento(snapshot) {
  return snapshot.exists()
    ? { id: snapshot.id, ...snapshot.data() }
    : null;
}

function ordenarMasRecientes(items = []) {
  return [...items].sort((a, b) => {
    const fechaB = fechaMs(b.fechaReconocimiento || b.updatedAt || b.createdAt);
    const fechaA = fechaMs(a.fechaReconocimiento || a.updatedAt || a.createdAt);
    return fechaB - fechaA;
  });
}

function fechaHechoMision(mision = {}) {
  return (
    mision.statusChangedAt ||
    mision.progreso?.completadaEn ||
    mision.updatedAt ||
    mision.actualizadaEn ||
    mision.createdAt ||
    mision.creadaEn ||
    serverTimestamp()
  );
}

function guacamayaValida(tipo = "") {
  const clave = texto(tipo);
  return clave && CATALOGO_GUACAMAYAS[clave]
    ? { clave, ...CATALOGO_GUACAMAYAS[clave] }
    : null;
}

async function leerMisionDirecta(userId, misionId) {
  return normalizarDocumento(
    await getDoc(referenciaMision(userId, misionId))
  );
}

async function leerReconocimientosUsuario(userId) {
  const snapshot = await getDocs(coleccionReconocimientos(userId));
  return ordenarMasRecientes(
    snapshot.docs.map(item => ({ id: item.id, ...item.data() }))
  );
}

async function validarUnicidadGuacamaya(userId, guacamayaTipo, reconocimientoId) {
  if (!guacamayaTipo) return;

  const existente = (await leerReconocimientosUsuario(userId)).find(item =>
    item.id !== reconocimientoId &&
    item.estado === "activo" &&
    item.tipo === "guacamaya" &&
    texto(item.guacamayaTipo) === guacamayaTipo
  );

  if (existente) {
    const definicion = guacamayaValida(guacamayaTipo);
    throw new Error(
      `${definicion?.nombre || "Esta Guacamaya"} ya forma parte de Mi Camino. ` +
      "Una misma Guacamaya se concede una sola vez."
    );
  }
}

export async function leerReconocimientoMision(misionId) {
  const userId = await userIdPersonaActiva();
  return normalizarDocumento(
    await getDoc(referenciaReconocimientoMision(userId, misionId))
  );
}

export async function guardarReconocimientoMision({
  misionId,
  categoria,
  mensaje,
  guacamayaTipo = ""
} = {}) {
  const userId = await userIdPersonaActiva();
  const actorUserId = actorActual();
  const idMision = texto(misionId);
  const mensajeNormalizado = texto(mensaje);

  if (!idMision) throw new Error("Falta el identificador de la Misión.");
  if (!mensajeNormalizado) {
    throw new Error("Escribe un mensaje que explique qué quieres reconocer.");
  }

  const mision = await leerMisionDirecta(userId, idMision);
  if (!mision) throw new Error("La Misión ya no existe.");
  if (mision.estado !== "completada") {
    throw new Error("Solo se pueden reconocer Misiones completadas.");
  }
  if (mision.esDatoPrueba === true) {
    throw new Error(
      "Esta Misión está marcada como dato de prueba. Quita primero la marca de prueba si corresponde a una actividad real."
    );
  }

  const referencia = referenciaReconocimientoMision(userId, idMision);
  const existente = normalizarDocumento(await getDoc(referencia));

  if (existente && existente.origen !== "humano") {
    throw new Error(
      "Esta Misión ya tiene un reconocimiento de otro origen que no puede editarse desde este formulario."
    );
  }

  const guacamayaSolicitada = texto(guacamayaTipo);
  const guacamayaExistente = texto(existente?.guacamayaTipo);
  const guacamayaEfectiva = guacamayaSolicitada || guacamayaExistente;
  const definicionGuacamaya = guacamayaEfectiva
    ? guacamayaValida(guacamayaEfectiva)
    : null;

  if (guacamayaEfectiva && !definicionGuacamaya) {
    throw new Error("La Guacamaya seleccionada no pertenece al catálogo activo.");
  }

  const categoriaNormalizada = definicionGuacamaya
    ? definicionGuacamaya.categoria
    : texto(categoria).toLowerCase();

  if (!CATEGORIAS.has(categoriaNormalizada)) {
    throw new Error("La categoría de reconocimiento no es válida.");
  }

  if (definicionGuacamaya) {
    await validarUnicidadGuacamaya(userId, definicionGuacamaya.clave, referencia.id);
  }

  const datos = {
    schemaVersion: 1,
    userIdPersona: userId,
    tipo: definicionGuacamaya ? "guacamaya" : "reconocimiento",
    categoria: categoriaNormalizada,
    titulo: texto(mision.titulo) || "Misión completada",
    mensaje: mensajeNormalizado,
    origen: "humano",
    fuentePrincipal: {
      tipo: "mision",
      id: idMision,
      misionId: idMision,
      modulo: texto(mision.modulo)
    },
    fuenteEliminada: false,
    estado: "activo",
    visibleAlumno: true,
    fechaHecho: existente?.fechaHecho || fechaHechoMision(mision),
    fechaReconocimiento: existente?.fechaReconocimiento || serverTimestamp(),
    createdAt: existente?.createdAt || serverTimestamp(),
    createdBy: existente?.createdBy || actorUserId,
    updatedAt: serverTimestamp(),
    updatedBy: actorUserId
  };

  if (definicionGuacamaya) {
    datos.guacamayaTipo = definicionGuacamaya.clave;
    datos.guacamayaNombre = definicionGuacamaya.nombre;
    datos.guacamayaDescripcion = definicionGuacamaya.descripcion;
    datos.fechaGuacamaya = existente?.fechaGuacamaya || serverTimestamp();
  }

  await setDoc(referencia, datos, { merge: false });

  return {
    id: referencia.id,
    ...datos,
    mision
  };
}

export async function leerReconocimientos() {
  const userId = await userIdPersonaActiva();
  return leerReconocimientosUsuario(userId);
}

export function observarReconocimientos(callback, onError = console.error) {
  if (typeof callback !== "function") {
    throw new Error("Se necesita una función callback.");
  }

  let cancelarSnapshot = null;
  let cancelado = false;

  (async () => {
    try {
      const userId = await userIdPersonaActiva();
      if (cancelado) return;

      cancelarSnapshot = onSnapshot(
        coleccionReconocimientos(userId),
        snapshot => {
          callback(
            ordenarMasRecientes(
              snapshot.docs.map(item => ({ id: item.id, ...item.data() }))
            )
          );
        },
        onError
      );
    } catch (error) {
      onError(error);
    }
  })();

  return () => {
    cancelado = true;
    if (typeof cancelarSnapshot === "function") cancelarSnapshot();
  };
}

export async function eliminarReconocimiento(reconocimientoId) {
  const userId = await userIdPersonaActiva();
  const id = texto(reconocimientoId);
  if (!id) throw new Error("Falta el identificador del reconocimiento.");
  await deleteDoc(doc(db, "usuarios", userId, "reconocimientos", id));
}

export async function eliminarReconocimientoMision(misionId) {
  const userId = await userIdPersonaActiva();
  await deleteDoc(referenciaReconocimientoMision(userId, misionId));
}

export async function conservarReconocimientoMisionComoHistorico(
  misionId,
  { misionSnapshot = null } = {}
) {
  const userId = await userIdPersonaActiva();
  const actorUserId = actorActual();
  const referencia = referenciaReconocimientoMision(userId, misionId);
  const actual = normalizarDocumento(await getDoc(referencia));

  if (!actual) return null;
  if (actual.origen !== "humano") {
    throw new Error(
      "Solo los reconocimientos humanos pueden conservarse sin su Misión fuente."
    );
  }

  const mision = misionSnapshot || await leerMisionDirecta(userId, misionId);
  const fuenteSnapshot = {
    titulo: texto(mision?.titulo || actual.titulo) || "Misión eliminada",
    modulo: texto(mision?.modulo || actual.fuentePrincipal?.modulo),
    fechaHecho: actual.fechaHecho || fechaHechoMision(mision || {})
  };
  const { id: _idDerivado, ...datosActuales } = actual;

  await setDoc(
    referencia,
    {
      ...datosActuales,
      fuenteEliminada: true,
      fuenteSnapshot,
      updatedAt: serverTimestamp(),
      updatedBy: actorUserId
    },
    { merge: false }
  );

  return { ...datosActuales, id: referencia.id, fuenteEliminada: true, fuenteSnapshot };
}

export const Reconocimientos = Object.freeze({
  catalogoGuacamayas: CATALOGO_GUACAMAYAS,
  guardarMision: guardarReconocimientoMision,
  leerPorMision: leerReconocimientoMision,
  leerTodos: leerReconocimientos,
  observar: observarReconocimientos,
  eliminar: eliminarReconocimiento,
  eliminarPorMision: eliminarReconocimientoMision,
  conservarMisionComoHistorico: conservarReconocimientoMisionComoHistorico
});
