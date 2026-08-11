/* Academia de Gloria Valentina | firebase-auth.js */

import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

export async function iniciarSesion(email, password) {
  const credencial = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

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
