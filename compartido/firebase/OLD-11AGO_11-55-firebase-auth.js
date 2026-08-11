/******************************************************************************
 * Academia Gloria Valentina
 * Archivo: compartido/firebase/firebase-auth.js
 * Servicio de autenticación Firebase
 * Versión: 1.1
 *
 * FASE 1.6
 * - La persona entra con un login funcional (ej. "gloria").
 * - accesosLogin/{login} resuelve la cuenta técnica de Firebase Auth.
 * - Tras autenticar, Firebase conserva el UID técnico como userId.
 ******************************************************************************/

import { auth, db } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


function normalizarLogin(valor) {
  return String(valor ?? "")
    .trim()
    .toLowerCase();
}

function crearErrorAcceso(codigo, mensaje) {
  const error = new Error(mensaje);
  error.code = codigo;
  return error;
}

/**
 * Resuelve el identificador funcional de la Academia.
 *
 * Estructura:
 * accesosLogin/{login}
 *   activo    : true
 *   authEmail : "cuenta usada por Firebase Authentication"
 *   userId    : "UID Firebase esperado"
 *
 * La colección solo admite GET desde cliente y no permite LIST.
 */
export async function resolverLogin(login) {
  const loginNormalizado = normalizarLogin(login);

  if (!loginNormalizado) {
    throw crearErrorAcceso(
      "academia/login-invalido",
      "El usuario indicado no es válido."
    );
  }

  const resultado = await getDoc(
    doc(db, "accesosLogin", loginNormalizado)
  );

  if (!resultado.exists()) {
    throw crearErrorAcceso(
      "academia/credencial-invalida",
      "Usuario o contraseña incorrectos."
    );
  }

  const datos = resultado.data();
  const authEmail = String(datos.authEmail ?? "").trim();
  const userId = String(datos.userId ?? "").trim();

  if (datos.activo === false || !authEmail || !userId) {
    throw crearErrorAcceso(
      "academia/credencial-invalida",
      "Usuario o contraseña incorrectos."
    );
  }

  return Object.freeze({
    login: loginNormalizado,
    authEmail,
    userId
  });
}

/**
 * Inicia sesión utilizando el login funcional de la Academia.
 *
 * login -> accesosLogin/{login} -> authEmail -> Firebase Authentication -> UID
 */
export async function iniciarSesion(login, password) {
  const acceso = await resolverLogin(login);

  const credencial = await signInWithEmailAndPassword(
    auth,
    acceso.authEmail,
    password
  );

  /*
   * Protección contra errores de configuración:
   * la cuenta autenticada debe corresponder al UID registrado para el login.
   */
  if (credencial.user.uid !== acceso.userId) {
    await signOut(auth);

    throw crearErrorAcceso(
      "academia/configuracion-login-invalida",
      "La configuración del usuario no coincide con Firebase Authentication."
    );
  }

  return credencial.user;
}

export async function cerrarSesion() {
  await signOut(auth);
}

export function observarSesion(callback) {
  return onAuthStateChanged(auth, callback);
}

export function usuarioActual() {
  return auth.currentUser;
}
