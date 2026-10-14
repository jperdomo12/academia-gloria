import { VERBOS_META, BLOQUES_RESULTADO, PRACTICA_VERBOS, FAMILIAS_PRUEBA_VERBOS } from "./verbos-data.js";

// La actividad integrada anterior conserva IDs, banco y registros para compatibilidad.
// Los nuevos Temas seleccionan únicamente los bloques de su documento escolar.
const definirTema = ({ id, titulo, fuente, descripcion, bloques }) => {
  const pertenece = reto => bloques.includes(reto.bloqueId);
  return Object.freeze({
    id, titulo, fuente, descripcion, ruta: `./${id}/`,
    meta: Object.freeze({ ...VERBOS_META, actividadId: `6-lengua-${id}`, tituloActividad: titulo,
      tema: titulo, cierreFirmes: "hoy las ideas de este documento se vieron firmes." }),
    bloques: Object.freeze(BLOQUES_RESULTADO.filter(b => bloques.includes(b.id))),
    practica: Object.freeze(PRACTICA_VERBOS.filter(pertenece)),
    familias: Object.freeze(FAMILIAS_PRUEBA_VERBOS.filter(f => f.variantes.every(pertenece)))
  });
};

export const TEMAS_VERBOS_DOCUMENTOS = Object.freeze([
  definirTema({
    id: "el-verbo",
    titulo: "El verbo · Repaso de 5.º",
    fuente: "El verbo · material de 5.º",
    descripcion: "Recupera la base: concepto de verbo, formas verbales, persona, número, tiempo y modo.",
    bloques: ["base", "indicativo"]
  }),
  definirTema({
    id: "indicativo-subjuntivo",
    titulo: "Indicativo y subjuntivo",
    fuente: "Indicativo y subjuntivo · material de 6.º",
    descripcion: "Compara afirmaciones, deseos, dudas y posibilidades. Elige el modo según la frase.",
    bloques: ["modos"]
  }),
  definirTema({
    id: "subjuntivo-imperativo",
    titulo: "Subjuntivo e imperativo",
    fuente: "Los verbos · Subjuntivo e imperativo · material de 6.º",
    descripcion: "Consulta los tiempos y las conjugaciones del subjuntivo. Practica indicaciones afirmativas y negativas.",
    bloques: ["subjuntivo", "imperativo"]
  }),
]);
