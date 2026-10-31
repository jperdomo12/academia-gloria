import { extraerTrios, segmentarLinea } from "../trios.js";

// Coordenadas de la letra canónica, no una segunda transcripción ni banco de verbos.
const LIMITES = [
  { fragmento: 0, linea: 0, trios: 15 },
  { fragmento: 3, linea: 3, trios: 31 },
  { fragmento: 10, linea: 0, trios: 21 },
];
export function crearPartesRap(fragmentos) {
  const lineas = fragmentos.flatMap((f, fragmento) =>
    f.lineas.map((texto, linea) => ({ texto, fragmento, linea })),
  );
  const inicios = LIMITES.map((l) =>
    lineas.findIndex((p) => p.fragmento === l.fragmento && p.linea === l.linea),
  );
  if (inicios.some((i) => i < 0))
    throw new Error("Revisar límites de RAP Studio con la fuente escolar.");
  const partes = LIMITES.map((limite, i) => {
    const tramo = lineas.slice(inicios[i], inicios[i + 1] ?? lineas.length);
    const bloques = [];
    for (const p of tramo) {
      if (bloques.at(-1)?.fragmento !== p.fragmento)
        bloques.push({
          fragmento: p.fragmento,
          titulo: fragmentos[p.fragmento].titulo,
          lineas: [],
        });
      bloques.at(-1).lineas.push(p.texto);
    }
    const trios = extraerTrios(bloques);
    if (trios.length !== limite.trios)
      throw new Error(
        "El reparto de RAP Studio necesita revisión: la fuente ha cambiado.",
      );
    return {
      id: i + 1,
      bloques,
      lineas: tramo.map((p) => p.texto),
      trios,
      inicio: tramo[0].texto,
      final: tramo.at(-1).texto,
    };
  });
  if (partes.flatMap((p) => p.trios).length !== extraerTrios(fragmentos).length)
    throw new Error("Reparto incompleto.");
  return partes;
}

// Ancla estable: conserva bases y conectores; oculta pasado/participio. Las líneas sin
// trío conservan su primera palabra. No genera ni corrige contenido lingüístico.
export function pistaLineaRap(linea) {
  const segmentos = segmentarLinea(linea);
  if (!segmentos.some((p) => p.formas))
    return linea.trim().split(/\s+/)[0] + " …";
  return segmentos
    .map((p) => (p.formas ? `${p.formas[0]} (···, ···)` : p.texto))
    .join("");
}
