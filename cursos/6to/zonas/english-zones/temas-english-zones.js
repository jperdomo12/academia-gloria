/* Origen escolar: referencias al catálogo propietario de English, sin otro Tema. */
import { TEMAS_ENGLISH } from "../../english/temas-english.js";
export const TEMAS_ENGLISH_ZONES = Object.freeze(
  TEMAS_ENGLISH.filter(t => t.id === "much-many-a-lot-of").map(t => Object.freeze({
    ...t,
    ruta:"../../english/much-many-a-lot-of/",
    estado:"English Zones · Grammar zone"
  }))
);
