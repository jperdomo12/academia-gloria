/* ==========================================================
   Academia Gloria Valentina
   API · Horario de clases · v1

   Patrón de propiedad:
   Persona Activa -> USER asociado -> usuarios/{userId}/horarioClases/actual
   ========================================================== */

import { db } from "../firebase/firebase-config.js";
import { ContextoUsuario } from "../js/contexto-usuario.js";
import { crearHorarioClases } from "../modelos/horario-clases.js";

import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const HORARIO_ID = "actual";

function documentoHorario(userId) {
  return doc(db, "usuarios", userId, "horarioClases", HORARIO_ID);
}

function actorDesdeContexto(contexto) {
  return {
    userId: contexto.usuario.userId,
    personaId: contexto.personaUsuario.personaId,
    nombre: String(
      contexto.personaUsuario.nombreVisible ||
      contexto.personaUsuario.nombre ||
      contexto.usuario.login ||
      "Usuario"
    ).trim()
  };
}

function puedeEditarDesdeContexto(contexto) {
  if (contexto.esPersonaPropia) return true;
  return contexto.nivelAcceso === "gestion"
    || contexto.nivelAcceso === "administracion";
}

export async function puedeEditarHorarioClases() {
  return puedeEditarDesdeContexto(await ContextoUsuario.inicializar());
}

export async function leerHorarioClases() {
  const contexto = await ContextoUsuario.inicializar();
  const resultado = await getDoc(
    documentoHorario(contexto.userIdPersonaActiva)
  );

  if (!resultado.exists()) return null;

  return {
    id: resultado.id,
    ...crearHorarioClases(resultado.data()),
    personaId: resultado.data().personaId || contexto.personaActiva.personaId,
    createdAt: resultado.data().createdAt || null,
    createdBy: resultado.data().createdBy || "",
    createdByNombre: resultado.data().createdByNombre || "",
    updatedAt: resultado.data().updatedAt || null,
    updatedBy: resultado.data().updatedBy || "",
    updatedByNombre: resultado.data().updatedByNombre || ""
  };
}

export async function guardarHorarioClases(entrada = {}) {
  const contexto = await ContextoUsuario.inicializar();

  if (!puedeEditarDesdeContexto(contexto)) {
    throw new Error("Tu nivel de acceso permite consultar este horario, pero no modificarlo.");
  }

  const horario = crearHorarioClases(entrada);
  const referencia = documentoHorario(contexto.userIdPersonaActiva);
  const existente = await getDoc(referencia);
  const actor = actorDesdeContexto(contexto);

  const datos = {
    ...horario,
    personaId: contexto.personaActiva.personaId,
    updatedAt: serverTimestamp(),
    updatedBy: actor.userId,
    updatedByNombre: actor.nombre
  };

  if (!existente.exists()) {
    datos.createdAt = serverTimestamp();
    datos.createdBy = actor.userId;
    datos.createdByNombre = actor.nombre;
  }

  await setDoc(referencia, datos, { merge: true });
  return horario;
}

export async function eliminarHorarioClases() {
  const contexto = await ContextoUsuario.inicializar();

  if (!puedeEditarDesdeContexto(contexto)) {
    throw new Error("Tu nivel de acceso no permite eliminar este horario.");
  }

  await deleteDoc(documentoHorario(contexto.userIdPersonaActiva));
}

export const HorarioClases = Object.freeze({
  leer: leerHorarioClases,
  guardar: guardarHorarioClases,
  eliminar: eliminarHorarioClases,
  puedeEditar: puedeEditarHorarioClases
});
