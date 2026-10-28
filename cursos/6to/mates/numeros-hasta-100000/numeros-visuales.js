import { POSICIONES, formato, cifras } from "./numeros-modelo.js";
export function tableroHTML(
  n,
  { editable = false, prefijo = "cifra", resaltar = -1 } = {},
) {
  if (n === 100000)
    return `<div class="limite"><strong>100 000</strong><span>Cien mil</span><p>10 decenas de millar = 100 000. Hemos llegado al límite de este tablero.</p></div>`;
  return `<div class="posiciones">${cifras(n)
    .map(
      (d, i) =>
        `<div class="posicion p-${i} ${i === resaltar ? "pista-activa" : ""}"><b>${POSICIONES[i].id}</b><span class="nombre-posicion">${POSICIONES[i].nombre}</span>${editable ? `<button type="button" data-digito="${i}" data-cambio="1" aria-label="Sumar una unidad de la columna ${POSICIONES[i].nombre}">+</button><output id="${prefijo}-${i}">${d}</output><button type="button" data-digito="${i}" data-cambio="-1" aria-label="Restar una unidad de la columna ${POSICIONES[i].nombre}">−</button>` : `<strong>${d}</strong>`}<span class="valor-posicion">${formato(d * POSICIONES[i].unidad)}</span></div>`,
    )
    .join(
      "",
    )}</div><dl class="leyenda-posiciones">${POSICIONES.map((p) => `<div><dt>${p.id}</dt><dd>${p.nombre}</dd></div>`).join("")}</dl>`;
}
export function rectaHTML({ min, max, puntos = [], medio = null }) {
  const x = (n) => 40 + (920 * (n - min)) / (max - min || 1);
  const ids = ["A", "B", "C"];
  return `<figure class="recta" role="img" aria-label="Recta de ${formato(min)} a ${formato(max)}. ${puntos.map((p, i) => `${ids[i]}: ${formato(p)}`).join(". ")}${medio !== null ? ". Punto medio: " + formato(medio) : ""}"><svg viewBox="0 0 1000 130" aria-hidden="true"><path d="M40 90 H960" class="eje"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${40 + i * 92} 80 v20" class="marca"/>`).join("")}${medio !== null ? `<path d="M${x(medio)} 30 V105" class="medio"/>` : ""}${puntos.map((p, i) => `<path d="M${x(p)} ${15 + i * 25} V90" class="puntero puntero-${i}"/><circle cx="${x(p)}" cy="90" r="12" class="punto punto-${i}"/><text x="${x(p)}" y="${25 + i * 25}" text-anchor="middle">${ids[i]}</text>`).join("")}</svg><div class="extremos"><b>${formato(min)}</b>${medio !== null ? `<span>Mitad<br><b>${formato(medio)}</b></span>` : ""}<b>${formato(max)}</b></div><figcaption>${puntos.map((p, i) => `<span class="etiqueta-punto">${ids[i]} · ${formato(p)}</span>`).join("")}</figcaption></figure>`;
}
export function compararHTML(a, b, indice = -1) {
  if (a === 100000 || b === 100000)
    return `<div class="pareja-numeros"><strong>${formato(a)}</strong><span>y</span><strong>${formato(b)}</strong></div>`;
  return `<div class="comparacion-tabla"><div class="comparacion-cabecera"><span>Número</span>${POSICIONES.map((p) => `<b>${p.id}</b>`).join("")}</div>${[
    a,
    b,
  ]
    .map(
      (n, i) =>
        `<div class="comparacion-fila"><span>${i ? "B" : "A"}</span>${cifras(n)
          .map(
            (d, j) =>
              `<strong class="${indice === j ? "pista-activa" : ""}">${d}</strong>`,
          )
          .join("")}</div>`,
    )
    .join("")}</div>`;
}
