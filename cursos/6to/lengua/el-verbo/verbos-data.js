import { TEMAS_VERBOS_DOCUMENTOS } from "../verbos/temas-por-documento.js";
const tema = TEMAS_VERBOS_DOCUMENTOS.find(t => t.id === "el-verbo");
export const VERBOS_META = tema.meta;
export const BLOQUES_RESULTADO = tema.bloques;
export const PRACTICA_VERBOS = tema.practica;
export const FAMILIAS_PRUEBA_VERBOS = tema.familias;
