/**
 * Academia Gloria Valentina
 * Modelo central de navegación · v1.2
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
    hijos: [
      {
        id: "rincon-lectura",
        titulo: "Mi Rincón de Lectura",
        icono: "📖",
        ruta: "mi-universo/rincon-lectura/"
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
        hijos: [
          {
            id: "detectives",
            titulo: "Detectives",
            icono: "🕵️",
            ruta: "mi-universo/aventuras-matematicas/detectives/"
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
        ruta: "mi-universo/mis-tareas/"
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
