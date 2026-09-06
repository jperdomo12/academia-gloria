/**
 * Academia Gloria Valentina
 * API · Bitácora de Acompañamiento · V1
 *
 * Patrón de propiedad:
 * Persona Activa -> USER asociado -> usuarios/{userId}/bitacoraAcompanamiento/{entradaId}
 *
 * V1 es una bitácora, no un chat:
 * - familia/profesionales autorizados publican entradas propias;
 * - una entrada puede recibir una sola respuesta estructurada;
 * - las entradas publicadas no se editan ni eliminan desde la interfaz V1.
 */

import { db } from "../firebase/firebase-config.js";
import { ContextoUsuario } from "../js/contexto-usuario.js";
import {
  crearEntradaBitacora,
  crearRespuestaBitacora
} from "../modelos/bitacora-acompanamiento.js";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const VISIBILIDADES_RESPONDIBLES = new Set([
  "adultos-profesionales",
  "todos-relacionados"
]);

function texto(valor = "", alternativo = "") {
  const resultado = String(valor ?? "").trim();
  return resultado || alternativo;
}

function esAdministradorContexto(contexto) {
  return contexto?.roles?.some(rol => rol.nivelAcceso === "administracion") === true;
}

function puedeColaborar(contexto) {
  return contexto?.esPersonaPropia === false;
}

function coleccionBitacora(userId) {
  return collection(db, "usuarios", userId, "bitacoraAcompanamiento");
}

function documentoBitacora(userId, entradaId) {
  const id = texto(entradaId);
  if (!id) throw new Error("Falta el identificador de la entrada.");
  return doc(db, "usuarios", userId, "bitacoraAcompanamiento", id);
}

function actorDesdeContexto(contexto) {
  const rol = contexto?.roles?.[0] || null;
  const relacion = contexto?.relacion || null;
  const nombre = texto(
    contexto?.personaUsuario?.nombreVisible,
    texto(
      contexto?.personaUsuario?.nombre,
      texto(contexto?.usuario?.login, "Usuario")
    )
  );

  return {
    userId: contexto.usuario.userId,
    personaId: contexto.personaUsuario.personaId,
    nombre,
    rol: texto(rol?.nombre, texto(rol?.roleId, "Usuario")),
    relacion: texto(relacion?.tipoRelacion)
  };
}

function consultasLectura(contexto) {
  const base = coleccionBitacora(contexto.userIdPersonaActiva);

  if (esAdministradorContexto(contexto)) {
    return [base];
  }

  if (contexto.esPersonaPropia) {
    return [
      query(base, where("visibleParaPersonaActiva", "==", true))
    ];
  }

  return [
    query(
      base,
      where(
        "visibilidad",
        "in",
        ["adultos-profesionales", "todos-relacionados"]
      )
    ),
    query(base, where("createdBy", "==", contexto.usuario.userId))
  ];
}

function combinarResultados(resultados = []) {
  const porId = new Map();
  resultados.flat().forEach(item => {
    if (item?.id) porId.set(item.id, item);
  });
  return [...porId.values()];
}

function documentosDesdeSnapshot(resultado) {
  return resultado.docs.map(item => ({
    id: item.id,
    ...item.data()
  }));
}

export async function guardarEntradaBitacora(entrada = {}) {
  const contexto = await ContextoUsuario.inicializar();
  if (!puedeColaborar(contexto)) {
    throw new Error(
      "Selecciona primero la Persona que quieres acompañar."
    );
  }

  const actor = actorDesdeContexto(contexto);
  const datos = crearEntradaBitacora(entrada);
  const referencia = doc(coleccionBitacora(contexto.userIdPersonaActiva));

  await setDoc(referencia, {
    ...datos,
    personaId: contexto.personaActiva.personaId,
    createdAt: serverTimestamp(),
    createdBy: actor.userId,
    createdByPersonaId: actor.personaId,
    createdByNombre: actor.nombre,
    createdByRol: actor.rol,
    createdByRelacion: actor.relacion,
    updatedAt: serverTimestamp(),
    updatedBy: actor.userId,
    updatedByNombre: actor.nombre,
    respuestaTexto: "",
    respuestaCreatedAt: null,
    respuestaCreatedBy: "",
    respuestaCreatedByPersonaId: "",
    respuestaCreatedByNombre: "",
    respuestaCreatedByRol: ""
  });

  return referencia.id;
}

export async function leerEntradasBitacora() {
  const contexto = await ContextoUsuario.inicializar();
  const resultados = await Promise.all(
    consultasLectura(contexto).map(async consulta => {
      const snapshot = await getDocs(consulta);
      return documentosDesdeSnapshot(snapshot);
    })
  );

  return combinarResultados(resultados);
}

export function observarEntradasBitacora(callback, onError = console.error) {
  if (typeof callback !== "function") {
    throw new Error("Se necesita una función callback.");
  }

  let cancelarSnapshots = [];
  let cancelado = false;

  (async () => {
    try {
      const contexto = await ContextoUsuario.inicializar();
      if (cancelado) return;

      const consultas = consultasLectura(contexto);
      const resultados = consultas.map(() => []);
      const inicializadas = consultas.map(() => false);

      cancelarSnapshots = consultas.map((consulta, indice) =>
        onSnapshot(
          consulta,
          snapshot => {
            resultados[indice] = documentosDesdeSnapshot(snapshot);
            inicializadas[indice] = true;

            // Evita mostrar una lista parcial mientras una segunda consulta
            // (por ejemplo, entradas privadas propias) todavía no respondió.
            if (inicializadas.every(Boolean)) {
              callback(combinarResultados(resultados));
            }
          },
          onError
        )
      );
    } catch (error) {
      onError(error);
    }
  })();

  return () => {
    cancelado = true;
    cancelarSnapshots.forEach(cancelar => {
      if (typeof cancelar === "function") cancelar();
    });
    cancelarSnapshots = [];
  };
}

export async function responderEntradaBitacora(entradaId, respuesta = "") {
  const contexto = await ContextoUsuario.inicializar();
  if (!puedeColaborar(contexto)) {
    throw new Error("Selecciona primero la Persona que quieres acompañar.");
  }

  const referencia = documentoBitacora(
    contexto.userIdPersonaActiva,
    entradaId
  );
  const snapshot = await getDoc(referencia);

  if (!snapshot.exists()) {
    throw new Error("La entrada ya no existe.");
  }

  const actual = snapshot.data();

  if (actual.personaId !== contexto.personaActiva.personaId) {
    throw new Error("La entrada no corresponde a la Persona Activa actual.");
  }

  if (
    !esAdministradorContexto(contexto) &&
    !VISIBILIDADES_RESPONDIBLES.has(texto(actual.visibilidad))
  ) {
    throw new Error("Esta entrada no está compartida con otras personas para responderla.");
  }

  if (actual.createdBy === contexto.usuario.userId) {
    throw new Error("La respuesta debe registrarla otra persona autorizada.");
  }

  if (actual.requiereRespuesta !== true) {
    throw new Error("Esta entrada no está marcada como pendiente de respuesta.");
  }

  if (texto(actual.respuestaTexto)) {
    throw new Error("Esta entrada ya tiene una respuesta registrada.");
  }

  const actor = actorDesdeContexto(contexto);
  const respuestaValidada = crearRespuestaBitacora(respuesta);

  await updateDoc(referencia, {
    respuestaTexto: respuestaValidada,
    respuestaCreatedAt: serverTimestamp(),
    respuestaCreatedBy: actor.userId,
    respuestaCreatedByPersonaId: actor.personaId,
    respuestaCreatedByNombre: actor.nombre,
    respuestaCreatedByRol: actor.rol,
    estado: "atendida",
    updatedAt: serverTimestamp(),
    updatedBy: actor.userId,
    updatedByNombre: actor.nombre
  });
}

export const BitacoraAcompanamiento = Object.freeze({
  guardar: guardarEntradaBitacora,
  leer: leerEntradasBitacora,
  observar: observarEntradasBitacora,
  responder: responderEntradaBitacora
});
