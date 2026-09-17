import "./portadas-paises.js";
import { HISTORIAS as HISTORIAS_BASE } from "./historias-base.js";
import { HISTORIAS_INTERESES_NIVEL_1 } from "./historias-intereses-nivel1.js";

const HISTORIAS_INTERESES_IDENTIFICADAS = HISTORIAS_INTERESES_NIVEL_1.map(historia => {
  if (historia.id === "venezuela-entre-caribe-llanos-y-tepuyes") {
    return { ...historia, titulo: `🇻🇪 ${historia.titulo}` };
  }

  if (historia.id === "espana-muchos-paisajes-muchas-voces") {
    return { ...historia, titulo: `🇪🇸 ${historia.titulo}` };
  }

  return historia;
});

export const HISTORIAS = [
  ...HISTORIAS_BASE,
  ...HISTORIAS_INTERESES_IDENTIFICADAS
];
