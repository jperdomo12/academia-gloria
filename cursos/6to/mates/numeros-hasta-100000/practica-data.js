import { formato as f, leerNumero, cifras, vecinos } from "./numeros-modelo.js";
/* Retos propios de Academia: mismos procedimientos que la fuente, sin sus respuestas personales. */
export const NIVELES = ["Calentamiento", "Entrenamiento", "Reto"];
export function crearPractica(nivel = 0) {
  const ns = [25612, 68001, 59725],
    n = ns[nivel];
  const valor = [
    { n: 59725, i: 2 },
    { n: 35729, i: 1 },
    { n: 52379, i: 0 },
  ][nivel];
  const a = [25000, 63398, 39802][nivel],
    b = [32000, 62431, 38920][nivel];
  const orden = [
    [70070, 77007, 70770],
    [67431, 54213, 51234, 32421],
    [78546, 78000, 78046, 78504],
  ][nivel];
  const inicio = [97000, 53600, 99000][nivel],
    paso = [1000, -100, 1000][nivel],
    inicioSerie = nivel === 2 ? 97000 : inicio;
  const etiqueta = (n) => ({ 10: "decena", 100: "centena", 1000: "millar" })[n];
  const dato = (
    tipo,
    bloque,
    pregunta,
    datos,
    respuesta,
    pistas,
    explicacion,
  ) => ({ tipo, bloque, pregunta, datos, respuesta, pistas, explicacion });
  const resultado = [
    dato(
      "construir",
      "valor-posicional",
      `Construye: ${leerNumero(n)}.`,
      { n },
      n,
      [
        "Empieza por los millares; después completa las tres últimas posiciones.",
        "Cada botón añade o quita una unidad de esa columna.",
        "Ejemplo distinto: 42 103 = 40 000 + 2 000 + 100 + 3.",
      ],
      `${f(n)} = ${f(Math.floor(n / 10000) * 10000)} + ${f(n % 10000)}. Cada cifra ocupa su columna.`,
    ),
    dato(
      "numero",
      "valor-posicional",
      `En ${f(valor.n)}, ¿cuánto vale el ${cifras(valor.n)[valor.i]} de las ${["decenas de millar", "unidades de millar", "centenas"][valor.i]}?`,
      { n: valor.n, columna: valor.i },
      cifras(valor.n)[valor.i] * [10000, 1000, 100, 10, 1][valor.i],
      [
        "Mira en qué columna está esa cifra.",
        "No preguntamos qué cifra es, sino cuánto representa.",
        "Ejemplo distinto: 4 centenas representan 4 × 100 = 400.",
      ],
      "Multiplica la cifra por el valor de su posición.",
    ),
    dato(
      "numero",
      "valor-posicional",
      `Completa: ${f(n)} = ${f(Math.floor(n / 1000) * 1000)} + □.`,
      { n },
      n % 1000,
      [
        "Separa los millares de las tres últimas cifras.",
        "Mira las centenas, decenas y unidades.",
        "Ejemplo distinto: 34 206 = 34 000 + 206.",
      ],
      "La parte que falta está formada por las centenas, decenas y unidades.",
    ),
    dato(
      "comparar",
      "comparacion-orden",
      `Compara A = ${f(a)} y B = ${f(b)}.`,
      { a, b },
      a > b ? ">" : "<",
      [
        "Empieza por la izquierda.",
        "Si las DM son iguales, pasa a las UM.",
        "Ejemplo distinto: 41 200 > 40 900 porque 1 millar es mayor que 0 millares.",
      ],
      "La primera cifra distinta decide; las siguientes ya no cambian la comparación.",
    ),
    dato(
      "ordenar",
      "comparacion-orden",
      `Ordena de ${nivel === 1 ? "menor a mayor" : "mayor a menor"}. Toca los números en ese orden.`,
      { numeros: orden, ascendente: nivel === 1 },
      [...orden].sort((a, b) => (nivel === 1 ? a - b : b - a)),
      [
        "Busca primero el extremo que te pide el orden.",
        "Ascendente: menor a mayor. Descendente: mayor a menor.",
        "Ejemplo distinto: 12 000 → 15 000 → 18 000 es ascendente.",
      ],
      "Compara las cifras desde la izquierda para decidir el siguiente número.",
    ),
    nivel === 0
      ? dato(
          "localizar",
          "comparacion-orden",
          "Sitúa 62 431 aproximadamente en la recta. Ajusta el marcador A.",
          { min: 62000, max: 64000, n: 62431 },
          62431,
          [
            "Busca entre qué dos marcas de 500 cae.",
            "62 431 es algo menor que 62 500.",
            "Ejemplo distinto: 62 800 se sitúa entre 62 500 y 63 000.",
          ],
          "62 431 cae entre 62 000 y 62 500, cerca de esta última marca.",
        )
      : nivel === 1
        ? dato(
            "posicion",
            "comparacion-orden",
            `¿Qué posición decide al comparar ${f(a)} y ${f(b)}?`,
            { a, b },
            "UM",
            [
              "Busca la primera cifra diferente.",
              "Las decenas de millar coinciden.",
              "Ejemplo distinto: entre 45 700 y 45 200 deciden las centenas.",
            ],
            "En UM aparece 3 frente a 2; no necesitas seguir.",
          )
        : dato(
            "intruso",
            "comparacion-orden",
            "Este camino debería ser ascendente. ¿Qué número rompe el orden?",
            { numeros: [32000, 34000, 33000, 36000] },
            33000,
            [
              "Revisa cada paso de izquierda a derecha.",
              "En un orden ascendente, el siguiente no debe bajar.",
              "Ejemplo distinto: 10, 20, 15, 40 rompe el orden en 15.",
            ],
            "33 000 baja después de 34 000; ese es el paso que rompe el orden.",
          ),
    dato(
      "numero",
      "series",
      `Desde ${f(inicio)}, haz ${paso > 0 ? "+" : "−"}${f(Math.abs(paso))}. ¿Dónde llegas?`,
      { inicio, paso },
      inicio + paso,
      [
        "Mira la posición del salto.",
        "100 cambia centenas; 1 000 cambia millares y puede alcanzar otro orden.",
        "Ejemplo distinto: 48 900 + 100 = 49 000.",
      ],
      "Suma o resta solo el salto indicado y revisa si hay un cambio de orden.",
    ),
    nivel === 2
      ? dato(
          "numero",
          "series",
          "¿Qué número es 10 más que 98 000?",
          { inicio: 98000, paso: 10 },
          98010,
          [
            "Mira las decenas.",
            "El salto ahora es de diez, no de cien ni de mil.",
            "Ejemplo distinto: 42 100 + 10 = 42 110.",
          ],
          "Diez más añade una decena; las otras posiciones conservan su valor.",
        )
      : dato(
          "salto",
          "series",
          `Elige un salto para ir de ${f([43550, 34829, 70211][nivel])} a ${f([43650, 33829, 69211][nivel])}.`,
          {
            inicio: [43550, 34829, 70211][nivel],
            meta: [43650, 33829, 69211][nivel],
          },
          [100, -1000, -1000][nivel],
          [
            "Decide primero si hay que avanzar o retroceder.",
            "Compara la distancia entre origen y meta.",
            "Ejemplo distinto: de 25 000 a 26 000 hay +1 000.",
          ],
          "El signo da la dirección y 100 o 1 000 da la distancia.",
        ),
    dato(
      "numero",
      "series",
      `Completa la serie: ${f(inicioSerie)} → ${f(inicioSerie + paso)} → ${f(inicioSerie + 2 * paso)} → □.`,
      { inicio: inicioSerie, paso },
      inicioSerie + 3 * paso,
      [
        "Compara dos números seguidos.",
        "Mantén el mismo salto en todos los pasos.",
        "Ejemplo distinto: 10 200 → 10 300 → 10 400 avanza de 100 en 100.",
      ],
      "Repite el salto de la serie una vez más.",
    ),
    ...[10, 100, 1000].map((u, i) => {
      const nums = [
          [4218, 1250, 2508],
          [3255, 3255, 2500],
          [99985, 9985, 99500],
        ],
        n = nums[nivel][i],
        v = vecinos(n, u);
      return dato(
        "redondear",
        "redondeo",
        `Redondea ${f(n)} ${u === 1000 ? "al millar" : "a la " + etiqueta(u)} más ${u === 1000 ? "cercano" : "cercana"}.`,
        { n, unidad: u },
        v.resultado,
        [
          `¿Entre qué dos ${u === 1000 ? "millares" : etiqueta(u) + "s"} está?`,
          "Encuentra el punto medio de esos vecinos.",
          `Ejemplo distinto: ${u === 10 ? "48 está más cerca de 50 que de 40" : u === 100 ? "1 260 está más cerca de 1 300 que de 1 200" : "7 200 está más cerca de 7 000 que de 8 000"}.`,
        ],
        v.distanciaInferior === v.distanciaSuperior
          ? "Está justo en la mitad: aproximamos al valor superior."
          : "Compara las dos distancias y elige el vecino más cercano.",
      );
    }),
  ];
  return resultado.map((r, i) => ({
    ...r,
    id: `practica-${nivel}-${i}`,
    nivel,
  }));
}
