/******************************************************************************
 * Academia Gloria
 * Archivo: compartido/js/perfil-usuario.js
 * Servicio oficial para consultar el perfil del usuario autenticado.
 * Versión: 1.0
 ******************************************************************************/

import { auth, db } from "../firebase/firebase-config.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

let perfilCache = null;
let uidCache = null;
let promesaPerfil = null;

function esperarEstadoAutenticacion() {
  return new Promise((resolve, reject) => {
    const cancelar = onAuthStateChanged(
      auth,
      (usuario) => {
        cancelar();
        resolve(usuario);
      },
      (error) => {
        cancelar();
        reject(error);
      }
    );
  });
}

async function obtenerUsuarioAutenticado() {
  return auth.currentUser || esperarEstadoAutenticacion();
}

async function estaAutenticado() {
  return Boolean(await obtenerUsuarioAutenticado());
}

async function obtenerUID() {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario) {
    throw new Error("No hay ningún usuario autenticado.");
  }

  return usuario.uid;
}

function crearPerfilPredeterminado(usuario) {
  const nombreDesdeCorreo = String(usuario?.email || "")
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .trim();

  return {
    id: usuario.uid,
    uid: usuario.uid,
    nombre: nombreDesdeCorreo || "Explorador",
    nombreVisible: nombreDesdeCorreo || "Explorador",
    avatar: "🌟",
    idioma: "es",
    curso: "",
    cursoEscolar: "",
    colegio: "",
    zonaHoraria: "Europe/Madrid",
    tipoUsuario: "alumno",
    activo: true,
    perfilIncompleto: true
  };
}

function normalizarPerfil(perfil, usuario) {
  const base = crearPerfilPredeterminado(usuario);

  return {
    ...base,
    ...perfil,
    id: usuario.uid,
    uid: usuario.uid,
    nombre: String(perfil?.nombre || base.nombre).trim(),
    nombreVisible: String(
      perfil?.nombreVisible ||
      perfil?.nombre ||
      base.nombreVisible
    ).trim(),
    avatar: String(perfil?.avatar || base.avatar).trim(),
    idioma: String(perfil?.idioma || base.idioma).trim(),
    zonaHoraria: String(
      perfil?.zonaHoraria || base.zonaHoraria
    ).trim(),
    activo: perfil?.activo !== false
  };
}

async function obtenerPerfil({ forzarRecarga = false } = {}) {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario) {
    throw new Error("No hay ningún usuario autenticado.");
  }

  if (uidCache !== usuario.uid) {
    perfilCache = null;
    promesaPerfil = null;
    uidCache = usuario.uid;
  }

  if (!forzarRecarga && perfilCache) {
    return perfilCache;
  }

  if (!forzarRecarga && promesaPerfil) {
    return promesaPerfil;
  }

  promesaPerfil = (async () => {
    const resultado = await getDoc(
      doc(db, "usuarios", usuario.uid)
    );

    const perfil = resultado.exists()
      ? normalizarPerfil(resultado.data(), usuario)
      : crearPerfilPredeterminado(usuario);

    perfilCache = Object.freeze(perfil);
    return perfilCache;
  })();

  try {
    return await promesaPerfil;
  } finally {
    promesaPerfil = null;
  }
}

async function recargarPerfil() {
  perfilCache = null;
  promesaPerfil = null;
  return obtenerPerfil({ forzarRecarga: true });
}

function limpiarCache() {
  perfilCache = null;
  promesaPerfil = null;
  uidCache = null;
}

async function obtenerNombre() {
  return (await obtenerPerfil()).nombre;
}

async function obtenerNombreVisible() {
  const perfil = await obtenerPerfil();
  return perfil.nombreVisible || perfil.nombre || "Explorador";
}

async function obtenerAvatar() {
  return (await obtenerPerfil()).avatar || "🌟";
}

async function obtenerIdioma() {
  return (await obtenerPerfil()).idioma || "es";
}

async function obtenerCurso() {
  return (await obtenerPerfil()).curso || "";
}

async function obtenerColegio() {
  return (await obtenerPerfil()).colegio || "";
}

async function obtenerTipoUsuario() {
  return (await obtenerPerfil()).tipoUsuario || "alumno";
}

async function obtenerIniciales() {
  const nombre = await obtenerNombreVisible();

  return nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join("") || "A";
}

async function obtenerSaludo(fecha = new Date()) {
  const perfil = await obtenerPerfil();
  const zonaHoraria = perfil.zonaHoraria || "Europe/Madrid";
  let hora;

  try {
    hora = Number(
      new Intl.DateTimeFormat("es-ES", {
        hour: "2-digit",
        hour12: false,
        timeZone: zonaHoraria
      }).format(fecha)
    );
  } catch {
    hora = fecha.getHours();
  }

  if (hora < 12) return "🌞 Buenos días";
  if (hora < 20) return "☀️ Buenas tardes";
  return "🌙 Buenas noches";
}

async function cerrarSesion() {
  limpiarCache();
  await signOut(auth);
}

function observarSesion(callback = () => {}) {
  return onAuthStateChanged(auth, (usuario) => {
    if (!usuario || usuario.uid !== uidCache) {
      limpiarCache();
    }

    callback(usuario);
  });
}

export const PerfilUsuario = Object.freeze({
  estaAutenticado,
  obtenerUID,
  obtenerPerfil,
  recargarPerfil,
  limpiarCache,
  obtenerNombre,
  obtenerNombreVisible,
  obtenerAvatar,
  obtenerIdioma,
  obtenerCurso,
  obtenerColegio,
  obtenerTipoUsuario,
  obtenerIniciales,
  obtenerSaludo,
  cerrarSesion,
  observarSesion
});

export {
  estaAutenticado,
  obtenerUID,
  obtenerPerfil,
  recargarPerfil,
  limpiarCache,
  obtenerNombre,
  obtenerNombreVisible,
  obtenerAvatar,
  obtenerIdioma,
  obtenerCurso,
  obtenerColegio,
  obtenerTipoUsuario,
  obtenerIniciales,
  obtenerSaludo,
  cerrarSesion,
  observarSesion
};
