/* Matemáticas del Tema. Enteros no negativos hasta 100 000; sin estado ni persistencia. */
export const POSICIONES = Object.freeze([
  { id: "DM", nombre: "decenas de millar", unidad: 10000 },
  { id: "UM", nombre: "unidades de millar", unidad: 1000 },
  { id: "C", nombre: "centenas", unidad: 100 },
  { id: "D", nombre: "decenas", unidad: 10 },
  { id: "U", nombre: "unidades", unidad: 1 },
]);
export const formato = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
export const cifras = (n) =>
  POSICIONES.map((p) => Math.floor(n / p.unidad) % 10);
export const construir = (digitos) =>
  digitos.reduce((s, n, i) => s + Number(n) * POSICIONES[i].unidad, 0);
export const descomponer = (n) =>
  n === 100000
    ? [100000]
    : cifras(n)
        .map((d, i) => d * POSICIONES[i].unidad)
        .filter(Boolean);
export const primeraDiferencia = (a, b) =>
  a === b
    ? -1
    : a === 100000 || b === 100000
      ? -2
      : cifras(a).findIndex((n, i) => n !== cifras(b)[i]);
export function vecinos(n, unidad) {
  const inferior = Math.floor(n / unidad) * unidad;
  return {
    inferior,
    superior: inferior + unidad,
    medio: inferior + unidad / 2,
    distanciaInferior: n - inferior,
    distanciaSuperior: inferior + unidad - n,
    resultado: Math.round(n / unidad) * unidad,
    exacto: n % unidad === 0,
  };
}
export function leerNumero(n) {
  const cortos = [
    "cero",
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
    "diez",
    "once",
    "doce",
    "trece",
    "catorce",
    "quince",
    "dieciséis",
    "diecisiete",
    "dieciocho",
    "diecinueve",
    "veinte",
    "veintiuno",
    "veintidós",
    "veintitrés",
    "veinticuatro",
    "veinticinco",
    "veintiséis",
    "veintisiete",
    "veintiocho",
    "veintinueve",
  ];
  const decenas = [
    "",
    "",
    "",
    "treinta",
    "cuarenta",
    "cincuenta",
    "sesenta",
    "setenta",
    "ochenta",
    "noventa",
  ];
  const centenas = [
    "",
    "ciento",
    "doscientos",
    "trescientos",
    "cuatrocientos",
    "quinientos",
    "seiscientos",
    "setecientos",
    "ochocientos",
    "novecientos",
  ];
  if (!Number.isInteger(n) || n < 0 || n > 100000)
    throw new RangeError("Número fuera del Tema");
  if (n < 30) return cortos[n];
  if (n < 100)
    return decenas[Math.floor(n / 10)] + (n % 10 ? " y " + cortos[n % 10] : "");
  if (n === 100) return "cien";
  if (n < 1000)
    return (
      centenas[Math.floor(n / 100)] + (n % 100 ? " " + leerNumero(n % 100) : "")
    );
  if (n === 100000) return "cien mil";
  const miles = Math.floor(n / 1000),
    resto = n % 1000;
  const nombre =
    miles === 1
      ? "mil"
      : leerNumero(miles)
          .replace(/veintiuno$/, "veintiún")
          .replace(/ y uno$/, " y un") + " mil";
  return nombre + (resto ? " " + leerNumero(resto) : "");
}
export function salto(n, paso) {
  const siguiente = n + paso;
  return siguiente >= 0 && siguiente <= 100000 ? siguiente : null;
}
export const leerEntrada = (valor) =>
  /^\d{1,6}$/.test(String(valor).replace(/[\s\u00a0\u202f]/g, ""))
    ? Number(String(valor).replace(/[\s\u00a0\u202f]/g, ""))
    : null;
