/* Interpretación única de las formas escritas en la fuente escolar; nunca normaliza variantes. */
export function segmentarLinea(texto) {
  const partes = [];
  let desde = 0;
  for (const m of texto.matchAll(/([A-Za-z]+) \(([^,]+), ([^)]+)\)/g)) {
    if (m.index > desde) partes.push({ texto: texto.slice(desde, m.index) });
    partes.push({ formas: m.slice(1, 4) });
    desde = m.index + m[0].length;
  }
  if (desde < texto.length) partes.push({ texto: texto.slice(desde) });
  return partes;
}

export function extraerTrios(fragmentos) {
  return fragmentos.flatMap((fragmento, fragmentoIndice) => fragmento.lineas.flatMap((linea, lineaIndice) =>
    segmentarLinea(linea).filter(p => p.formas).map(({ formas }) => ({ formas, linea, fragmentoIndice, lineaIndice }))
  ));
}
