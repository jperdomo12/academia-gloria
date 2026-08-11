/******************************************************************************
 * Academia Gloria Valentina
 * Archivo: compartido/js/perfil-usuario.js
 * Servicio oficial para consultar el perfil del Usuario / Persona Activa.
 * Versión: 1.2
 *
 * FASE 1.5
 * - USER resuelve identidad técnica y acceso.
 * - PERSON es la fuente de nombre, avatar, email y datos personales.
 * - Los campos funcionales todavía no migrados permanecen temporalmente
 *   disponibles mediante la compatibilidad de ContextoUsuario.
 ******************************************************************************/

import { auth } from "../firebase/firebase-config.js";
import { ContextoUsuario } from "./contexto-usuario.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


let perfilCache = null;
let uidCache = null;
let promesaPerfil = null;


/* ==========================================================================
   Autenticación
   ========================================================================== */

function esperarEstadoAutenticacion() {
  if (auth.currentUser) return Promise.resolve(auth.currentUser);

  return new Promise((resolve, reject) => {
    const cancelar = onAuthStateChanged(
      auth,
      usuario => {
        cancelar();
        resolve(usuario);
      },
      error => {
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


/* ==========================================================================
   Perfil
   ========================================================================== */

function crearPerfilDesdeContexto(contexto) {
  const usuario = contexto.usuario;
  const persona = contexto.personaActiva;
  const rolPrincipal = contexto.roles?.[0] || null;

  return {
    /*
     * id / uid permanecen como UID por compatibilidad con consumidores
     * existentes. personaId identifica la Persona real del nuevo modelo.
     */
    id: usuario.userId,
    uid: usuario.userId,
    userId: usuario.userId,
    personaId: persona.personaId,

    login: usuario.login,

    /* Datos personales: fuente oficial PERSON. */
    nombre: String(persona.nombre || "Explorador").trim(),
    apellidos: String(persona.apellidos || "").trim(),
    nombreVisible: String(
      persona.nombreVisible ||
      persona.nombre ||
      "Explorador"
    ).trim(),
    avatar: String(persona.avatar || "🌟").trim(),
    email: persona.email ?? null,
    fechaNacimiento: persona.fechaNacimiento ?? null,
    activo: persona.activo !== false && usuario.activo !== false,

    /*
     * Datos funcionales todavía legacy.
     * ContextoUsuario los conserva temporalmente desde usuarios/{uid}
     * mientras se decide su ubicación definitiva.
     */
    idioma: String(persona.idioma || "es").trim(),
    curso: String(persona.curso || "").trim(),
    cursoEscolar: String(persona.cursoEscolar || "").trim(),
    colegio: String(persona.colegio || "").trim(),
    calendarioSlug: String(persona.calendarioSlug || "").trim(),
    zonaHoraria: String(
      persona.zonaHoraria || "Europe/Madrid"
    ).trim(),

    /* Rol real del nuevo modelo. */
    tipoUsuario: rolPrincipal?.roleId || "alumno",
    roleId: rolPrincipal?.roleId || "alumno",
    nivelAcceso: contexto.nivelAcceso,

    perfilIncompleto: false,
    origenPerfil: persona.origen || "personas"
  };
}

async function obtenerPerfil({ forzarRecarga = false } = {}) {
  const usuarioAuth = await obtenerUsuarioAutenticado();

  if (!usuarioAuth) {
    throw new Error("No hay ningún usuario autenticado.");
  }

  if (uidCache !== usuarioAuth.uid) {
    limpiarCache();
    uidCache = usuarioAuth.uid;
  }

  if (!forzarRecarga && perfilCache) {
    return perfilCache;
  }

  if (!forzarRecarga && promesaPerfil) {
    return promesaPerfil;
  }

  promesaPerfil = (async () => {
    const contexto = await ContextoUsuario.inicializar({
      forzarRecarga
    });

    const perfil = crearPerfilDesdeContexto(contexto);

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
  ContextoUsuario.limpiarCache();
  return obtenerPerfil({ forzarRecarga: true });
}

function limpiarCache() {
  perfilCache = null;
  promesaPerfil = null;
  uidCache = null;
  ContextoUsuario.limpiarCache();
}


/* ==========================================================================
   API de conveniencia
   ========================================================================== */

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

/*
 * LEGACY TRANSITORIO.
 * Se mantiene porque todavía puede existir código consumidor.
 * No forma parte del modelo objetivo.
 */
async function obtenerCalendarioSlug() {
  return (await obtenerPerfil()).calendarioSlug || "";
}

async function obtenerTipoUsuario() {
  return (await obtenerPerfil()).roleId || "alumno";
}

async function obtenerPersonaId() {
  return (await obtenerPerfil()).personaId;
}

async function obtenerNivelAcceso() {
  return (await obtenerPerfil()).nivelAcceso;
}

async function obtenerIniciales() {
  const nombre = await obtenerNombreVisible();

  return nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(parte => parte.charAt(0).toUpperCase())
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


/* ==========================================================================
   Sesión
   ========================================================================== */

async function cerrarSesion() {
  limpiarCache();

  try {
    sessionStorage.removeItem("academia.personaActivaId");
  } catch {
    // Sin impacto si sessionStorage no está disponible.
  }

  await signOut(auth);
}

function observarSesion(callback = () => {}) {
  return onAuthStateChanged(auth, usuario => {
    if (!usuario || usuario.uid !== uidCache) {
      limpiarCache();
    }

    callback(usuario);
  });
}


/* ==========================================================================
   Exportación
   ========================================================================== */

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
  obtenerCalendarioSlug,
  obtenerTipoUsuario,
  obtenerPersonaId,
  obtenerNivelAcceso,
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
  obtenerCalendarioSlug,
  obtenerTipoUsuario,
  obtenerPersonaId,
  obtenerNivelAcceso,
  obtenerIniciales,
  obtenerSaludo,

  cerrarSesion,
  observarSesion
};
