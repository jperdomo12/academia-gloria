/**
 * Academia Gloria Valentina
 * Modelo central de navegación · v1.4
 *
 * Este archivo contiene únicamente datos.
 * No contiene HTML, CSS ni comportamiento visual.
 */

export const NAVEGACION_ACADEMIA = Object.freeze([
  {
    id: "mi-universo",
    titulo: "Mi Universo",
    icono: "🌈",
    ruta: "mi-universo/",
    volver: "",
    cabeceraGlobal: true,
    limpiarNavegacionLegada: true,
    hijos: [
      {
        id: "mi-camino",
        titulo: "Mi Camino",
        icono: "🗺️",
        ruta: "mi-universo/mi-camino/",
        volver: "mi-universo/",
        cabeceraGlobal: true,
        limpiarNavegacionLegada: true
      },
      {
        id: "rincon-lectura",
        titulo: "Mi Rincón de Lectura",
        icono: "📖",
        ruta: "mi-universo/rincon-lectura/",
        volver: "mi-universo/",
        cabeceraGlobal: true,
        limpiarNavegacionLegada: true
      },
      {
        id: "biblioteca",
        titulo: "Biblioteca Encantada",
        icono: "📚",
        ruta: "mi-universo/biblioteca/"
      },
      {
        id: "escritora",
        titulo: "Mi Rincón de Escritura",
        icono: "✍️",
        ruta: "mi-universo/escritora/"
      },
      {
        id: "aventuras-matematicas",
        titulo: "Aventuras Matemáticas",
        icono: "🧩",
        ruta: "mi-universo/aventuras-matematicas/",
        volver: "mi-universo/",
        cabeceraGlobal: true,
        limpiarNavegacionLegada: true,
        hijos: [
          {
            id: "detectives",
            titulo: "Detectives",
            icono: "🕵️",
            ruta: "mi-universo/aventuras-matematicas/detectives/",
            volver: "mi-universo/aventuras-matematicas/",
            cabeceraGlobal: true,
            limpiarNavegacionLegada: true
          },
          {
            id: "historial-detectives",
            titulo: "Historial de Detectives",
            icono: "📚",
            ruta: "mi-universo/aventuras-matematicas/detectives/historial.html"
          }
        ]
      },
      {
        id: "creciendo-por-dentro",
        titulo: "Creciendo por Dentro",
        icono: "🌱",
        ruta: "mi-universo/creciendo-por-dentro/"
      },
      {
        id: "gestion-misiones",
        titulo: "Gestión de Misiones",
        icono: "⚙️",
        ruta: "mi-universo/mis-tareas/",
        volver: "mi-universo/mi-camino/",
        cabeceraGlobal: true,
        limpiarNavegacionLegada: true
      }
    ]
  },
  {
    id: "mis-cursos",
    titulo: "Mis Cursos",
    icono: "🎓",
    hijos: [
      {
        id: "quinto",
        titulo: "5.º de Primaria",
        icono: "🎒",
        ruta: "cursos/5to/"
      },
      {
        id: "sexto",
        titulo: "6.º de Primaria",
        icono: "🚀",
        ruta: "cursos/6to/",
        proximo: true
      }
    ]
  },
  {
    id: "administracion",
    titulo: "Administración",
    icono: "🛡️",
    nivelMinimo: "administracion",
    hijos: [
      {
        id: "gestion-usuarios",
        titulo: "Gestión de Usuarios",
        icono: "👥",
        ruta: "administracion/usuarios/",
        nivelMinimo: "administracion"
      }
    ]
  },
  {
    id: "explorar-mas",
    titulo: "Explorar más",
    icono: "🧭",
    hijos: [
      {
        id: "calendarios",
        titulo: "Calendarios",
        icono: "🗓️",
        ruta: "calendarios/"
      },
      {
        id: "adicionales",
        titulo: "Adicionales",
        icono: "✨",
        ruta: "adicionales/"
      }
    ]
  }
]);

export const DESCUBRE_ACADEMIA = Object.freeze({
  id: "descubre-academia",
  titulo: "Descubre la Academia",
  icono: "🏠",
  ruta: "descubre-la-academia/"
});

export const UBICACIONES_ACADEMIA = Object.freeze([
  {
    id: "academia",
    titulo: "Inicio",
    icono: "🌈",
    ruta: ""
  },
  DESCUBRE_ACADEMIA,
  ...NAVEGACION_ACADEMIA
]);
