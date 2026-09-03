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
  })
]);
