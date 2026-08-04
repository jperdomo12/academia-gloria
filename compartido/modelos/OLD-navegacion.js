/**
 * Academia Gloria Valentina
 * Modelo central de navegación · v1.0
 *
 * Este archivo contiene únicamente datos.
 * No contiene HTML, CSS ni comportamiento visual.
 */

export const NAVEGACION_ACADEMIA = Object.freeze([
  {
    id: "academia",
    titulo: "Academia",
    icono: "🏠",
    ruta: "",
    descripcion: "Página principal"
  },
  {
    id: "mi-camino",
    titulo: "Mi Camino",
    icono: "🧭",
    ruta: "mi-universo/mi-camino/",
    descripcion: "Misiones y seguimiento"
  },
  {
    id: "mi-universo",
    titulo: "Mi Universo",
    icono: "🌈",
    ruta: "mi-universo/",
    descripcion: "Leer, crear, descubrir y practicar",
    hijos: [
      {
        id: "biblioteca",
        titulo: "Biblioteca Encantada",
        icono: "📚",
        ruta: "mi-universo/biblioteca/"
      },
      {
        id: "rincon-lectura",
        titulo: "Mi Rincón de Lectura",
        icono: "📖",
        ruta: "mi-universo/rincon-lectura/"
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
            ruta:
              "mi-universo/aventuras-matematicas/detectives/historial.html"
          }
        ]
      }
    ]
  },
  {
    id: "mis-cursos",
    titulo: "Mis Cursos",
    icono: "🎓",
    descripcion: "Cursos y materias",
    hijos: [
      {
        id: "quinto",
        titulo: "5.º de Primaria",
        icono: "🎒",
        ruta: "cursos/5to/",
        hijos: [
          {
            id: "quinto-matematicas",
            titulo: "Matemáticas",
            icono: "➗",
            ruta: "cursos/5to/mates/"
          },
          {
            id: "quinto-lengua",
            titulo: "Lengua",
            icono: "📝",
            ruta: "cursos/5to/lengua/"
          },
          {
            id: "quinto-ciencias",
            titulo: "Ciencias",
            icono: "🔬",
            ruta: "cursos/5to/ciencias/"
          },
          {
            id: "quinto-sociales",
            titulo: "Sociales",
            icono: "🌍",
            ruta: "cursos/5to/sociales/"
          },
          {
            id: "quinto-ingles",
            titulo: "Inglés",
            icono: "🇬🇧",
            ruta: "cursos/5to/ingles/"
          }
        ]
      }
    ]
  }
]);
