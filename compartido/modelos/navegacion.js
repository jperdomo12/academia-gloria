/**
 * Academia Gloria Valentina
 * Modelo central de navegación · v1.9
 *
 * Este archivo contiene únicamente datos.
 * No contiene HTML, CSS ni comportamiento visual.
 *
 * NAVEGACION_ACADEMIA define las opciones visibles del menú.
 * UBICACIONES_AUXILIARES añade metadatos de cabecera para pantallas
 * funcionales que no deben convertirse en nuevas opciones del menú.
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
        ruta: "mi-universo/biblioteca/",
        volver: "mi-universo/",
        cabeceraGlobal: true,
        limpiarNavegacionLegada: true
      },
      {
        id: "escritora",
        titulo: "Mi Rincón de Escritura",
        icono: "✍️",
        ruta: "mi-universo/escritora/",
        volver: "mi-universo/",
        cabeceraGlobal: true,
        limpiarNavegacionLegada: true
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
            ruta: "mi-universo/aventuras-matematicas/detectives/historial.html",
            volver: "mi-universo/aventuras-matematicas/detectives/",
            cabeceraGlobal: true,
            limpiarNavegacionLegada: true
          }
        ]
      },
      {
        id: "creciendo-por-dentro",
        titulo: "Creciendo por Dentro",
        icono: "🌱",
        ruta: "mi-universo/creciendo-por-dentro/",
        volver: "mi-universo/",
        cabeceraGlobal: true,
        limpiarNavegacionLegada: true
      },
      {
        id: "gestion-misiones",
        titulo: "Gestión de Misiones",
        icono: "⚙️",
        ruta: "mi-universo/mis-tareas/",
        volver: "mi-universo/mi-camino/",
        nivelMinimo: "gestion",
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
        ruta: "cursos/6to/"
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
        ruta: "calendarios/",
        volver: "",
        cabeceraGlobal: true,
        limpiarNavegacionLegada: true
      },
      {
        id: "baul",
        titulo: "Mi Baúl",
        icono: "🧰",
        ruta: "baul/",
        volver: "",
        cabeceraGlobal: true,
        limpiarNavegacionLegada: true
      },
      {
        id: "adicionales",
        titulo: "Adicionales",
        icono: "✨",
        ruta: "adicionales/",
        volver: "",
        cabeceraGlobal: true,
        limpiarNavegacionLegada: true
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

/*
 * Ubicaciones funcionales de cabecera que no son nuevas opciones del menú.
 * Mantenerlas fuera de NAVEGACION_ACADEMIA evita duplicar el árbol visible.
 */
const UBICACIONES_AUXILIARES = Object.freeze([
  {
    id: "detalle-detectives",
    titulo: "Detalle de historia",
    icono: "🕵️",
    ruta: "mi-universo/aventuras-matematicas/detectives/historia.html",
    volver: "mi-universo/aventuras-matematicas/detectives/historial.html",
    cabeceraGlobal: true,
    limpiarNavegacionLegada: true
  },
  {
    id: "trabajo-realizado-detectives",
    titulo: "Trabajo realizado",
    icono: "📖",
    ruta: "mi-universo/aventuras-matematicas/detectives/trabajo-realizado.html",
    volver: "mi-universo/mis-tareas/",
    cabeceraGlobal: true,
    limpiarNavegacionLegada: true
  },
  {
    id: "calendarios-colegio",
    titulo: "Calendarios del Colegio",
    icono: "🏫",
    ruta: "calendarios/escolar/",
    volver: "calendarios/",
    cabeceraGlobal: true,
    limpiarNavegacionLegada: true
  },
  {
    id: "calendario-escolar-2025-2026",
    titulo: "Calendario Escolar 2025-2026",
    icono: "🗓️",
    ruta: "calendarios/escolar/2025-2026.html",
    volver: "calendarios/escolar/",
    cabeceraGlobal: true,
    limpiarNavegacionLegada: true
  },
  {
    id: "adicionales-musica",
    titulo: "Música Motivadora",
    icono: "🎵",
    ruta: "adicionales/musica/",
    volver: "adicionales/",
    cabeceraGlobal: true,
    limpiarNavegacionLegada: true
  },
  {
    id: "adicionales-juegos",
    titulo: "Juegos",
    icono: "🎮",
    ruta: "adicionales/juegos/",
    volver: "adicionales/",
    cabeceraGlobal: true,
    limpiarNavegacionLegada: true
  },
  {
    id: "adicionales-lecturas",
    titulo: "Lecturas",
    icono: "📚",
    ruta: "adicionales/lecturas/",
    volver: "adicionales/",
    cabeceraGlobal: true,
    limpiarNavegacionLegada: true
  },
  {
    id: "lectura-destello-unico",
    titulo: "El Destello Único de Gloria",
    icono: "📖",
    ruta: "adicionales/lecturas/el_destello_unico_de_gloria.html",
    volver: "adicionales/lecturas/",
    cabeceraGlobal: true,
    limpiarNavegacionLegada: true
  },
  {
    id: "lectura-historias-burgos",
    titulo: "El Camino de las Historias en Burgos",
    icono: "🏰",
    ruta: "adicionales/lecturas/el_camino_de_las_historias_en_burgos.html",
    volver: "adicionales/lecturas/",
    cabeceraGlobal: true,
    limpiarNavegacionLegada: true
  }
]);

export const UBICACIONES_ACADEMIA = Object.freeze([
  {
    id: "academia",
    titulo: "Inicio",
    icono: "🌈",
    ruta: ""
  },
  DESCUBRE_ACADEMIA,
  ...NAVEGACION_ACADEMIA,
  ...UBICACIONES_AUXILIARES
]);
