/* Catálogo de Temas reales · Matemáticas · 6.º de Primaria */

export const TEMAS_MATEMATICAS = Object.freeze([
  Object.freeze({
    id: "fracciones",
    orden: 10,
    titulo: "Fracciones",
    icono: "🍕",
    ruta: "./fracciones/",
    conservarRetorno: true,
    estado: "Tema real de 6.º",
    descripcion: "De las partes iguales y las equivalencias a las operaciones y los problemas de varios pasos.",
    pistas: Object.freeze([
      "🔁 Equivalencias",
      "🧩 m.c.m.",
      "✖️ y ➗ Operaciones",
      "🧠 Problemas"
    ]),
    recursos: Object.freeze([
      "Resumen",
      "Teoría",
      "Fichas",
      "Práctica",
      "Prueba"
    ]),
    accion: "Entrar →",
    acento: "#d87968",
    acentoSuave: "#fff0e9",
    acentoTexto: "#a85748"
  }),
  Object.freeze({
    id: "numeros-hasta-100000", orden: 20, titulo: "Números hasta 100 000", icono: "🔢",
    ruta: "./numeros-hasta-100000/", conservarRetorno: true, estado: "Tema real de 6.º",
    descripcion: "Construye números, descubre qué cifra manda, avanza con saltos y redondea mirando las distancias.",
    pistas: Object.freeze(["🧱 Construyo", "🔍 Comparo", "🚀 Salto", "🧲 Aproximo"]),
    recursos: Object.freeze(["Resumen", "Teoría", "Fichas", "Práctica", "Prueba"]),
    accion: "Descubrir →", acento: "#617333", acentoSuave: "#f0f4df", acentoTexto: "#415527"
  }),
  Object.freeze({
    id: "potencias", orden: 30, titulo: "Potencias", icono: "🔢",
    ruta: "./potencias/", conservarRetorno: true, estado: "Tema real de 6.º",
    descripcion: "Descubre qué significan la base y el exponente. Conecta potencia, multiplicación, lectura y valor.",
    pistas: Object.freeze(["🔍 Base y exponente", "🔁 Cambios de forma", "🚀 Potencias de 10"]),
    recursos: Object.freeze(["Resumen", "Teoría", "Fichas", "Práctica", "Prueba", "Material del Plan Semanal"]),
    accion: "Descubrir →", acento: "#218176", acentoSuave: "#e4f7f1", acentoTexto: "#155d58"
  })
]);
