/******************************************************************************
 * Academia Gloria Valentina
 * Archivo: compartido/js/contexto-usuario.js
 * Contexto central de Usuario, Persona Activa y nivel de acceso
 * Versión: 0.4
 *
 * FASE 1.5
 * - Activa el nuevo modelo USER -> PERSON -> USER_ROLE -> ROLE.
 * - Mantiene compatibilidad con usuarios legacy que todavía no tengan personaId.
 * - Persona Activa propia se resuelve desde PERSON.
 * - idioma, zonaHoraria, colegio, curso y cursoEscolar se obtienen
 *   prioritariamente desde PERSON.
 * - USER conserva temporalmente esos campos solo como fallback legacy.
 * - Las subcolecciones funcionales continúan bajo usuarios/{uid}.
 ******************************************************************************/

import { auth, db } from "../firebase/firebase-config.js";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


const NIVEL = Object.freeze({
  consulta: 10,
  gestion: 20,
  administracion: 30
});

const CLAVE_PERSONA_ACTIVA = "academia.personaActivaId";

let contextoCache = null;
let promesaInicializacion = null;


/* ==========================================================================
   Utilidades
   ========================================================================== */

function texto(valor, alternativo = "") {
  const resultado = String(valor ?? "").trim();
  return resultado || alternativo;
}

function nivelSeguro(valor, alternativo = "consulta") {
  const candidato = texto(valor).toLowerCase();
  return Object.prototype.hasOwnProperty.call(NIVEL, candidato)
    ? candidato
    : alternativo;
}

function nivelMasRestrictivo(a, b) {
  const nivelA = nivelSeguro(a);
  const nivelB = nivelSeguro(b);
  return NIVEL[nivelA] <= NIVEL[nivelB] ? nivelA : nivelB;
}

function nivelMasAlto(niveles = []) {
  return niveles.reduce((mejor, actual) => {
    const candidato = nivelSeguro(actual);
    return NIVEL[candidato] > NIVEL[mejor] ? candidato : mejor;
  }, "consulta");
}

function esperarAutenticacion() {
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

async function leerDocumentoSeguro(...ruta) {
  try {
    const resultado = await getDoc(doc(db, ...ruta));
    return resultado.exists()
      ? { id: resultado.id, ...resultado.data() }
      : null;
  } catch (error) {
    /*
     * En Fase 0 las nuevas colecciones pueden no existir todavía
     * o las reglas actuales pueden no permitir su lectura.
     * Eso NO debe romper la Academia.
     */
    console.debug(
      `[ContextoUsuario] No se pudo leer ${ruta.join("/")}. Se usa compatibilidad legacy.`,
      error
    );
    return null;
  }
}


/* ==========================================================================
   USER
   ========================================================================== */

function normalizarUsuario(usuarioAuth, documentoUsuario) {
  const legacy = documentoUsuario || {};

  return Object.freeze({
    userId: usuarioAuth.uid,
    uid: usuarioAuth.uid,

    login: texto(
      legacy.login,
      texto(usuarioAuth.email, usuarioAuth.uid)
    ),

    personaId: texto(
      legacy.personaId,
      usuarioAuth.uid
    ),

    activo: legacy.activo !== false,

    /* Campo histórico: se conserva solo para diagnóstico/transición. */
    estadoLegacy: legacy.estado ?? null,

    emailAuth: texto(usuarioAuth.email)
  });
}


/* ==========================================================================
   PERSON
   ========================================================================== */

function personaDesdeLegacy(usuario, documentoUsuario) {
  const datos = documentoUsuario || {};

  const nombre = texto(
    datos.nombre,
    texto(datos.nombreVisible, "Explorador")
  );

  return Object.freeze({
    personaId: usuario.personaId,
    id: usuario.personaId,

    nombre,
    apellidos: texto(datos.apellidos),

    nombreVisible: texto(
      datos.nombreVisible,
      nombre
    ),

    fechaNacimiento: datos.fechaNacimiento ?? null,
    email: datos.email ?? usuario.emailAuth ?? null,
    avatar: texto(datos.avatar, "🌟"),

    activo: datos.activo !== false,

    /* Compatibilidad temporal con campos del perfil actual. */
    idioma: texto(datos.idioma, "es"),
    curso: texto(datos.curso),
    cursoEscolar: texto(datos.cursoEscolar),
    colegio: texto(datos.colegio),
    zonaHoraria: texto(datos.zonaHoraria, "Europe/Madrid"),

    origen: "legacy"
  });
}

function normalizarPersona(documentoPersona, fallback) {
  if (!documentoPersona) return fallback;

  return Object.freeze({
    ...fallback,
    ...documentoPersona,

    personaId: documentoPersona.id || fallback.personaId,
    id: documentoPersona.id || fallback.personaId,

    nombre: texto(documentoPersona.nombre, fallback.nombre),
    apellidos: texto(documentoPersona.apellidos, fallback.apellidos),

    nombreVisible: texto(
      documentoPersona.nombreVisible,
      documentoPersona.nombre || fallback.nombreVisible
    ),

    avatar: texto(documentoPersona.avatar, fallback.avatar),
    activo: documentoPersona.activo !== false,

    /*
     * Fase 1.5 · Paso 5
     * PERSON es ya la fuente oficial de estos datos.
     * El valor de USER permanece únicamente como fallback durante
     * la transición y podrá eliminarse después de la prueba funcional.
     */
    idioma: texto(documentoPersona.idioma, fallback.idioma || "es"),
    zonaHoraria: texto(
      documentoPersona.zonaHoraria,
      fallback.zonaHoraria || "Europe/Madrid"
    ),

    /*
     * Datos académicos actuales.
     * PERSON es ya la fuente prioritaria; USER se mantiene solo como
     * fallback temporal hasta completar la prueba funcional.
     */
    colegio: texto(documentoPersona.colegio, fallback.colegio),
    curso: texto(documentoPersona.curso, fallback.curso),
    cursoEscolar: texto(
      documentoPersona.cursoEscolar,
      fallback.cursoEscolar
    ),

    origen: "personas"
  });
}


/* ==========================================================================
   ROLE / USER_ROLE
   ========================================================================== */

async function leerRolesUsuario(userId, { modeloNuevoActivo = false } = {}) {
  try {
    /*
     * Fase 1.5:
     * usuarioRoles utiliza directamente el UID como ID de documento.
     * Esto evita consultas e índices innecesarios mientras cada USER
     * tenga un único Rol efectivo.
     */
    const asignacion = await leerDocumentoSeguro("usuarioRoles", userId);

    if (!asignacion || asignacion.activo === false) {
      if (modeloNuevoActivo) {
        throw new Error(
          "El Usuario tiene PERSON configurada pero no dispone de un USER_ROLE activo."
        );
      }

      return Object.freeze([
        Object.freeze({
          roleId: "gestion",
          nombre: "Gestión",
          nivelAcceso: "gestion",
          origen: "fallback"
        })
      ]);
    }

    const roleId = texto(asignacion.roleId);

    if (!roleId) {
      throw new Error("USER_ROLE no contiene roleId.");
    }

    const rol = await leerDocumentoSeguro("roles", roleId);

    if (!rol) {
      throw new Error(`No existe el ROLE '${roleId}'.`);
    }

    if (rol.activo === false) {
      throw new Error(`El ROLE '${roleId}' está inactivo.`);
    }

    return Object.freeze([
      Object.freeze({
        roleId,
        nombre: texto(rol.nombre, roleId),
        nivelAcceso: nivelSeguro(rol.nivelAcceso, "consulta"),
        origen: "roles"
      })
    ]);
  } catch (error) {
    if (modeloNuevoActivo) {
      throw error;
    }

    console.debug(
      "[ContextoUsuario] USER_ROLE todavía no disponible. Se usa gestión legacy.",
      error
    );

    return Object.freeze([
      Object.freeze({
        roleId: "gestion",
        nombre: "Gestión",
        nivelAcceso: "gestion",
        origen: "fallback"
      })
    ]);
  }
}


/* ==========================================================================
   PERSON_RELATION
   ========================================================================== */

async function buscarRelacion(sourcePersonId, targetPersonId) {
  if (!sourcePersonId || !targetPersonId) return null;
  if (sourcePersonId === targetPersonId) return null;

  try {
    const consulta = query(
      collection(db, "personaRelaciones"),
      where("sourcePersonId", "==", sourcePersonId),
      where("targetPersonId", "==", targetPersonId),
      where("activo", "==", true)
    );

    const resultado = await getDocs(consulta);

    if (resultado.empty) return null;

    const documento = resultado.docs[0];

    return Object.freeze({
      relationId: documento.id,
      ...documento.data(),
      nivelAcceso: nivelSeguro(documento.data().nivelAcceso, "consulta")
    });
  } catch (error) {
    console.debug(
      "[ContextoUsuario] PERSON_RELATION todavía no disponible.",
      error
    );
    return null;
  }
}


/* ==========================================================================
   Persona Activa
   ========================================================================== */

function leerPersonaActivaGuardada() {
  try {
    return texto(sessionStorage.getItem(CLAVE_PERSONA_ACTIVA));
  } catch {
    return "";
  }
}

function guardarPersonaActiva(personaId) {
  try {
    sessionStorage.setItem(CLAVE_PERSONA_ACTIVA, personaId);
  } catch {
    // sessionStorage puede no estar disponible en algún contexto restringido.
  }
}

async function resolverPersonaActiva({
  usuario,
  personaUsuario,
  roles
}) {
  const solicitada = leerPersonaActivaGuardada();

  /*
   * Fase 0:
   * si no hay selección o se selecciona la Persona propia, trabajar
   * exactamente como hasta ahora.
   */
  if (!solicitada || solicitada === personaUsuario.personaId) {
    guardarPersonaActiva(personaUsuario.personaId);

    return {
      personaActiva: personaUsuario,
      relacion: null,
      nivelAcceso: nivelMasAlto(
        roles.map(rol => rol.nivelAcceso)
      )
    };
  }

  const relacion = await buscarRelacion(
    personaUsuario.personaId,
    solicitada
  );

  /*
   * Nunca aceptar una Persona Activa ajena sin relación válida.
   */
  if (!relacion) {
    guardarPersonaActiva(personaUsuario.personaId);

    return {
      personaActiva: personaUsuario,
      relacion: null,
      nivelAcceso: nivelMasAlto(
        roles.map(rol => rol.nivelAcceso)
      )
    };
  }

  const documentoPersona = await leerDocumentoSeguro(
    "personas",
    solicitada
  );

  if (!documentoPersona) {
    guardarPersonaActiva(personaUsuario.personaId);

    return {
      personaActiva: personaUsuario,
      relacion: null,
      nivelAcceso: nivelMasAlto(
        roles.map(rol => rol.nivelAcceso)
      )
    };
  }

  const nivelRol = nivelMasAlto(
    roles.map(rol => rol.nivelAcceso)
  );

  return {
    personaActiva: normalizarPersona(
      documentoPersona,
      Object.freeze({
        personaId: solicitada,
        id: solicitada,
        nombre: "Persona",
        apellidos: "",
        nombreVisible: "Persona",
        fechaNacimiento: null,
        email: null,
        avatar: "🌟",
        activo: true,
        idioma: "es",
        curso: "",
        cursoEscolar: "",
        colegio: "",
        zonaHoraria: "Europe/Madrid",
        origen: "personas"
      })
    ),

    relacion,

    nivelAcceso: nivelMasRestrictivo(
      nivelRol,
      relacion.nivelAcceso
    )
  };
}


/* ==========================================================================
   Inicialización
   ========================================================================== */

async function construirContexto() {
  const usuarioAuth = await esperarAutenticacion();

  if (!usuarioAuth) {
    throw new Error("No hay ningún usuario autenticado.");
  }

  const documentoUsuario = await leerDocumentoSeguro(
    "usuarios",
    usuarioAuth.uid
  );

  const usuario = normalizarUsuario(
    usuarioAuth,
    documentoUsuario
  );

  const personaLegacy = personaDesdeLegacy(
    usuario,
    documentoUsuario
  );

  const tienePersonaIdNuevo =
    Boolean(documentoUsuario?.personaId) &&
    usuario.personaId !== usuario.uid;

  const documentoPersona = await leerDocumentoSeguro(
    "personas",
    usuario.personaId
  );

  /*
   * Cuando USER ya declara un personaId del nuevo modelo, PERSON debe existir.
   * No ocultamos errores de configuración con fallback silencioso.
   */
  if (tienePersonaIdNuevo && !documentoPersona) {
    throw new Error(
      `El Usuario ${usuario.userId} referencia la Persona ` +
      `'${usuario.personaId}', pero esa PERSON no existe o no es accesible.`
    );
  }

  const personaUsuario = normalizarPersona(
    documentoPersona,
    personaLegacy
  );

  const roles = await leerRolesUsuario(
    usuario.userId,
    { modeloNuevoActivo: Boolean(documentoPersona && tienePersonaIdNuevo) }
  );

  const {
    personaActiva,
    relacion,
    nivelAcceso
  } = await resolverPersonaActiva({
    usuario,
    personaUsuario,
    roles
  });

  return Object.freeze({
    usuario,
    personaUsuario,
    personaActiva,
    roles,
    relacion,
    nivelAcceso,

    esPersonaPropia:
      personaUsuario.personaId === personaActiva.personaId,

    compatibilidadLegacy:
      personaUsuario.origen === "legacy" ||
      roles.some(rol => rol.origen === "fallback")
  });
}

async function inicializar({ forzarRecarga = false } = {}) {
  if (forzarRecarga) {
    contextoCache = null;
    promesaInicializacion = null;
  }

  if (contextoCache) return contextoCache;
  if (promesaInicializacion) return promesaInicializacion;

  promesaInicializacion = construirContexto();

  try {
    contextoCache = await promesaInicializacion;
    return contextoCache;
  } finally {
    promesaInicializacion = null;
  }
}

function limpiarCache() {
  contextoCache = null;
  promesaInicializacion = null;
}


/* ==========================================================================
   API pública
   ========================================================================== */

async function obtenerUsuario() {
  return (await inicializar()).usuario;
}

async function obtenerPersona() {
  return (await inicializar()).personaUsuario;
}

async function obtenerPersonaActiva() {
  return (await inicializar()).personaActiva;
}

async function obtenerRoles() {
  return (await inicializar()).roles;
}

async function obtenerRolPrincipal() {
  const roles = await obtenerRoles();
  return roles[0] || null;
}

async function obtenerNivelAcceso() {
  return (await inicializar()).nivelAcceso;
}

async function puedeConsultar() {
  const nivel = await obtenerNivelAcceso();
  return NIVEL[nivel] >= NIVEL.consulta;
}

async function puedeGestionar() {
  const nivel = await obtenerNivelAcceso();
  return NIVEL[nivel] >= NIVEL.gestion;
}

async function esAdministrador() {
  const nivel = await obtenerNivelAcceso();
  return NIVEL[nivel] >= NIVEL.administracion;
}

/**
 * Selecciona otra Persona Activa.
 *
 * La validación definitiva se realiza al reconstruir el contexto:
 * una Persona ajena solo se acepta si existe PERSON_RELATION activa.
 */
async function seleccionarPersonaActiva(personaId) {
  const id = texto(personaId);

  if (!id) {
    throw new Error("Falta el identificador de la Persona.");
  }

  guardarPersonaActiva(id);
  limpiarCache();

  const contexto = await inicializar({ forzarRecarga: true });

  if (contexto.personaActiva.personaId !== id) {
    throw new Error(
      "El usuario no tiene autorización para utilizar esa Persona Activa."
    );
  }

  return contexto.personaActiva;
}

async function volverAPersonaPropia() {
  const contexto = await inicializar();
  guardarPersonaActiva(contexto.personaUsuario.personaId);
  limpiarCache();
  return (await inicializar({ forzarRecarga: true })).personaActiva;
}


export const ContextoUsuario = Object.freeze({
  NIVEL,

  inicializar,
  limpiarCache,

  obtenerUsuario,
  obtenerPersona,
  obtenerPersonaActiva,
  obtenerRoles,
  obtenerRolPrincipal,
  obtenerNivelAcceso,

  puedeConsultar,
  puedeGestionar,
  esAdministrador,

  seleccionarPersonaActiva,
  volverAPersonaPropia
});


export {
  inicializar,
  limpiarCache,

  obtenerUsuario,
  obtenerPersona,
  obtenerPersonaActiva,
  obtenerRoles,
  obtenerRolPrincipal,
  obtenerNivelAcceso,

  puedeConsultar,
  puedeGestionar,
  esAdministrador,

  seleccionarPersonaActiva,
  volverAPersonaPropia
};
