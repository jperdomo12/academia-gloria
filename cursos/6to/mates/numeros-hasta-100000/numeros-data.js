/* Contenido de Academia vinculado a los cuatro núcleos del material impreso. No contiene respuestas manuscritas. */
export const NUMEROS_META = Object.freeze({
  actividadId: "6-mates-numeros-hasta-100000",
  tituloActividad: "Números hasta 100 000",
  version: "1.0",
  cursoReferencia: "6.º de Primaria",
  materia: "Matemáticas",
  tema: "Números hasta 100 000",
  cierreFirmes:
    "hoy construiste, comparaste, seguiste series y aproximaste números con ideas bien conectadas.",
});

export const BLOQUES_RESULTADO = Object.freeze([
  {
    id: "valor-posicional",
    icono: "🧱",
    titulo: "Construyo",
    descripcion:
      "Leer, escribir, representar y descomponer con DM, UM, C, D y U.",
  },
  {
    id: "comparacion-orden",
    icono: "🔍",
    titulo: "Comparo",
    descripcion: "Buscar la primera diferencia, ordenar y localizar números.",
  },
  {
    id: "series",
    icono: "🚀",
    titulo: "Salto",
    descripcion: "Comprender cambios de 100 y 1 000 y continuar series.",
  },
  {
    id: "redondeo",
    icono: "🧲",
    titulo: "Aproximo",
    descripcion: "Encontrar vecinos, punto medio y distancia al redondear.",
  },
]);

export const FICHAS_NUMEROS = Object.freeze([
  {
    icono: "🧱",
    pregunta: "¿Qué vale una cifra?",
    respuesta:
      "Su cifra multiplicada por el valor de su posición. En 59 725, el 7 vale 700.",
  },
  {
    icono: "🔍",
    pregunta: "¿Dónde está la pista al comparar?",
    respuesta:
      "Mira desde la izquierda. La primera cifra diferente decide. Si todas coinciden, son iguales.",
  },
  {
    icono: "↗",
    pregunta: "¿Ascendente o descendente?",
    respuesta: "Ascendente: de menor a mayor. Descendente: de mayor a menor.",
  },
  {
    icono: "🚀",
    pregunta: "¿Qué cambia al sumar 100 o 1 000?",
    respuesta:
      "Empieza por centenas o millares. Si se completa un grupo de diez, también cambia la posición superior.",
  },
  {
    icono: "🧲",
    pregunta: "¿Cómo redondeo sin adivinar?",
    respuesta:
      "Encuentro los dos vecinos, busco el punto medio y comparo distancias.",
  },
  {
    icono: "⚖️",
    pregunta: "¿Y si cae en la mitad?",
    respuesta:
      "Si la distancia a los dos vecinos es la misma, aproximamos al valor superior.",
  },
]);

export const FAMILIAS_PRUEBA_NUMEROS = Object.freeze([
  {
    id: "valor",
    variantes: [
      {
        id: "num-valor-1",
        bloqueId: "valor-posicional",
        conceptoId: "valor-cifra",
        tipoEvidencia: "seleccion_simple",
        titulo: "Una cifra, un valor",
        enunciado: "Observa 59 725.",
        pregunta: "¿Cuánto vale la cifra 7 en la posición de centenas?",
        opciones: [
          {
            id: "0",
            texto: "700",
          },
          {
            id: "1",
            texto: "7",
          },
          {
            id: "2",
            texto: "70",
          },
          {
            id: "3",
            texto: "100",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "La cifra ocupa centenas: 7 × 100 = 700.",
      },
      {
        id: "num-valor-2",
        bloqueId: "valor-posicional",
        conceptoId: "valor-cifra",
        tipoEvidencia: "seleccion_simple",
        titulo: "Una cifra, un valor",
        enunciado: "Observa 52 379.",
        pregunta:
          "¿Cuánto vale la cifra 5 en la posición de decenas de millar?",
        opciones: [
          {
            id: "0",
            texto: "50 000",
          },
          {
            id: "1",
            texto: "5",
          },
          {
            id: "2",
            texto: "5 000",
          },
          {
            id: "3",
            texto: "10 000",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "La cifra ocupa decenas de millar: 5 × 10 000 = 50 000.",
      },
      {
        id: "num-valor-3",
        bloqueId: "valor-posicional",
        conceptoId: "valor-cifra",
        tipoEvidencia: "seleccion_simple",
        titulo: "Una cifra, un valor",
        enunciado: "Observa 35 729.",
        pregunta:
          "¿Cuánto vale la cifra 5 en la posición de unidades de millar?",
        opciones: [
          {
            id: "0",
            texto: "5 000",
          },
          {
            id: "1",
            texto: "5",
          },
          {
            id: "2",
            texto: "500",
          },
          {
            id: "3",
            texto: "1 000",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "La cifra ocupa unidades de millar: 5 × 1 000 = 5 000.",
      },
      {
        id: "num-valor-4",
        bloqueId: "valor-posicional",
        conceptoId: "valor-cifra",
        tipoEvidencia: "seleccion_simple",
        titulo: "Una cifra, un valor",
        enunciado: "Observa 68 001.",
        pregunta: "¿Cuánto vale la cifra 1 en la posición de unidades?",
        opciones: [
          {
            id: "0",
            texto: "1",
          },
          {
            id: "1",
            texto: "10",
          },
          {
            id: "2",
            texto: "100",
          },
          {
            id: "3",
            texto: "1 000",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "La cifra ocupa unidades: 1 × 1 = 1.",
      },
    ],
  },
  {
    id: "lectura",
    variantes: [
      {
        id: "num-lectura-1",
        bloqueId: "valor-posicional",
        conceptoId: "lectura-escritura",
        tipoEvidencia: "seleccion_simple",
        titulo: "De palabras a cifras",
        enunciado: "Veinticinco mil seiscientos doce.",
        pregunta: "¿Qué número está escrito?",
        opciones: [
          {
            id: "0",
            texto: "25 612",
          },
          {
            id: "1",
            texto: "25 712",
          },
          {
            id: "2",
            texto: "24 612",
          },
          {
            id: "3",
            texto: "25 622",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "Los millares y las últimas tres posiciones forman 25 612.",
      },
      {
        id: "num-lectura-2",
        bloqueId: "valor-posicional",
        conceptoId: "lectura-escritura",
        tipoEvidencia: "seleccion_simple",
        titulo: "De palabras a cifras",
        enunciado: "Sesenta y ocho mil uno.",
        pregunta: "¿Qué número está escrito?",
        opciones: [
          {
            id: "0",
            texto: "68 001",
          },
          {
            id: "1",
            texto: "68 101",
          },
          {
            id: "2",
            texto: "67 001",
          },
          {
            id: "3",
            texto: "68 011",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "Los millares y las últimas tres posiciones forman 68 001.",
      },
      {
        id: "num-lectura-3",
        bloqueId: "valor-posicional",
        conceptoId: "lectura-escritura",
        tipoEvidencia: "seleccion_simple",
        titulo: "De palabras a cifras",
        enunciado: "Cincuenta y dos mil trescientos sesenta y cinco.",
        pregunta: "¿Qué número está escrito?",
        opciones: [
          {
            id: "0",
            texto: "52 365",
          },
          {
            id: "1",
            texto: "52 465",
          },
          {
            id: "2",
            texto: "51 365",
          },
          {
            id: "3",
            texto: "52 375",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "Los millares y las últimas tres posiciones forman 52 365.",
      },
      {
        id: "num-lectura-4",
        bloqueId: "valor-posicional",
        conceptoId: "lectura-escritura",
        tipoEvidencia: "seleccion_simple",
        titulo: "De palabras a cifras",
        enunciado: "Setenta y ocho mil doscientos cincuenta.",
        pregunta: "¿Qué número está escrito?",
        opciones: [
          {
            id: "0",
            texto: "78 250",
          },
          {
            id: "1",
            texto: "78 350",
          },
          {
            id: "2",
            texto: "77 250",
          },
          {
            id: "3",
            texto: "78 260",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "Los millares y las últimas tres posiciones forman 78 250.",
      },
    ],
  },
  {
    id: "descomposicion",
    variantes: [
      {
        id: "num-descomposicion-1",
        bloqueId: "valor-posicional",
        conceptoId: "descomposicion",
        tipoEvidencia: "seleccion_simple",
        titulo: "Cada parte cuenta",
        enunciado: "El número es 59 725.",
        pregunta: "¿Cuál es su descomposición?",
        opciones: [
          {
            id: "0",
            texto: "50 000 + 9 000 + 700 + 20 + 5",
          },
          {
            id: "1",
            texto: "5 000 + 9 000 + 700 + 20 + 5",
          },
          {
            id: "2",
            texto: "50 000 × 9 000 + 700 + 20 + 5",
          },
          {
            id: "3",
            texto: "58 725 + 10",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "Cada sumando expresa el valor de una posición. 50 000 + 9 000 + 700 + 20 + 5 = 59 725.",
      },
      {
        id: "num-descomposicion-2",
        bloqueId: "valor-posicional",
        conceptoId: "descomposicion",
        tipoEvidencia: "seleccion_simple",
        titulo: "Cada parte cuenta",
        enunciado: "El número es 68 001.",
        pregunta: "¿Cuál es su descomposición?",
        opciones: [
          {
            id: "0",
            texto: "60 000 + 8 000 + 1",
          },
          {
            id: "1",
            texto: "60 000 + 800 + 1",
          },
          {
            id: "2",
            texto: "60 000 × 8 000 + 1",
          },
          {
            id: "3",
            texto: "67 001 + 10",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "Cada sumando expresa el valor de una posición. 60 000 + 8 000 + 1 = 68 001.",
      },
      {
        id: "num-descomposicion-3",
        bloqueId: "valor-posicional",
        conceptoId: "descomposicion",
        tipoEvidencia: "seleccion_simple",
        titulo: "Cada parte cuenta",
        enunciado: "El número es 25 306.",
        pregunta: "¿Cuál es su descomposición?",
        opciones: [
          {
            id: "0",
            texto: "20 000 + 5 000 + 300 + 6",
          },
          {
            id: "1",
            texto: "20 000 + 5 000 + 30 + 6",
          },
          {
            id: "2",
            texto: "20 000 × 5 000 + 300 + 6",
          },
          {
            id: "3",
            texto: "24 306 + 10",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "Cada sumando expresa el valor de una posición. 20 000 + 5 000 + 300 + 6 = 25 306.",
      },
      {
        id: "num-descomposicion-4",
        bloqueId: "valor-posicional",
        conceptoId: "descomposicion",
        tipoEvidencia: "seleccion_simple",
        titulo: "Cada parte cuenta",
        enunciado: "El número es 100 000.",
        pregunta: "¿Cuál es su descomposición?",
        opciones: [
          {
            id: "0",
            texto: "10 × 10 000",
          },
          {
            id: "1",
            texto: "10 × 1 000",
          },
          {
            id: "2",
            texto: "99 000 + 10",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "Cada sumando expresa el valor de una posición. 10 × 10 000 = 100 000.",
      },
    ],
  },
  {
    id: "primera-diferencia",
    variantes: [
      {
        id: "num-primera-diferencia-1",
        bloqueId: "comparacion-orden",
        conceptoId: "primera-diferencia",
        tipoEvidencia: "seleccion_simple",
        titulo: "La pista que decide",
        enunciado: "63 398 y 62 431.",
        pregunta: "¿Qué posición decide cuál es mayor?",
        opciones: [
          {
            id: "0",
            texto: "unidades de millar",
          },
          {
            id: "1",
            texto: "unidades",
          },
          {
            id: "2",
            texto: "centenas",
          },
          {
            id: "3",
            texto: "decenas",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "Las DM son iguales (6). En UM, 3 > 2: 63 398 es mayor.",
      },
      {
        id: "num-primera-diferencia-2",
        bloqueId: "comparacion-orden",
        conceptoId: "primera-diferencia",
        tipoEvidencia: "seleccion_simple",
        titulo: "La pista que decide",
        enunciado: "39 802 y 38 920.",
        pregunta: "¿Qué posición decide cuál es mayor?",
        opciones: [
          {
            id: "0",
            texto: "unidades de millar",
          },
          {
            id: "1",
            texto: "unidades",
          },
          {
            id: "2",
            texto: "centenas",
          },
          {
            id: "3",
            texto: "decenas",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "Las DM son iguales (3). En UM, 9 > 8.",
      },
      {
        id: "num-primera-diferencia-3",
        bloqueId: "comparacion-orden",
        conceptoId: "primera-diferencia",
        tipoEvidencia: "seleccion_simple",
        titulo: "La pista que decide",
        enunciado: "78 546 y 78 000.",
        pregunta: "¿Qué posición decide cuál es mayor?",
        opciones: [
          {
            id: "0",
            texto: "centenas",
          },
          {
            id: "1",
            texto: "unidades",
          },
          {
            id: "2",
            texto: "decenas de millar",
          },
          {
            id: "3",
            texto: "decenas",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "DM y UM coinciden; en C aparece la primera diferencia: 5 > 0.",
      },
      {
        id: "num-primera-diferencia-4",
        bloqueId: "comparacion-orden",
        conceptoId: "primera-diferencia",
        tipoEvidencia: "seleccion_simple",
        titulo: "La pista que decide",
        enunciado: "25 000 y 32 000.",
        pregunta: "¿Qué posición decide cuál es mayor?",
        opciones: [
          {
            id: "0",
            texto: "decenas de millar",
          },
          {
            id: "1",
            texto: "unidades",
          },
          {
            id: "2",
            texto: "centenas",
          },
          {
            id: "3",
            texto: "decenas",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "La primera posición ya es distinta: 2 < 3.",
      },
    ],
  },
  {
    id: "orden",
    variantes: [
      {
        id: "num-orden-1",
        bloqueId: "comparacion-orden",
        conceptoId: "orden",
        tipoEvidencia: "seleccion_simple",
        titulo: "Ponlos en orden",
        enunciado: "Ordena de mayor a menor: 70 070, 77 007, 70 770.",
        pregunta: "¿Qué orden corresponde?",
        opciones: [
          {
            id: "0",
            texto: "77 007 → 70 770 → 70 070",
          },
          {
            id: "1",
            texto: "70 070 → 70 770 → 77 007",
          },
          {
            id: "2",
            texto: "70 070 → 77 007 → 70 770",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "Ascendente va de menor a mayor; descendente, de mayor a menor. Compara desde la izquierda.",
      },
      {
        id: "num-orden-2",
        bloqueId: "comparacion-orden",
        conceptoId: "orden",
        tipoEvidencia: "seleccion_simple",
        titulo: "Ponlos en orden",
        enunciado: "Ordena de menor a mayor: 67 431, 54 213, 51 234, 32 421.",
        pregunta: "¿Qué orden corresponde?",
        opciones: [
          {
            id: "0",
            texto: "32 421 → 51 234 → 54 213 → 67 431",
          },
          {
            id: "1",
            texto: "67 431 → 54 213 → 51 234 → 32 421",
          },
          {
            id: "2",
            texto: "54 213 → 51 234 → 32 421 → 67 431",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "Ascendente va de menor a mayor; descendente, de mayor a menor. Compara desde la izquierda.",
      },
      {
        id: "num-orden-3",
        bloqueId: "comparacion-orden",
        conceptoId: "orden",
        tipoEvidencia: "seleccion_simple",
        titulo: "Ponlos en orden",
        enunciado: "Ordena de menor a mayor: 78 546, 78 000, 78 046.",
        pregunta: "¿Qué orden corresponde?",
        opciones: [
          {
            id: "0",
            texto: "78 000 → 78 046 → 78 546",
          },
          {
            id: "1",
            texto: "78 546 → 78 046 → 78 000",
          },
          {
            id: "2",
            texto: "78 546 → 78 000 → 78 046",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "Ascendente va de menor a mayor; descendente, de mayor a menor. Compara desde la izquierda.",
      },
      {
        id: "num-orden-4",
        bloqueId: "comparacion-orden",
        conceptoId: "orden",
        tipoEvidencia: "seleccion_simple",
        titulo: "Ponlos en orden",
        enunciado: "Ordena de mayor a menor: 63 398, 62 431, 63 098.",
        pregunta: "¿Qué orden corresponde?",
        opciones: [
          {
            id: "0",
            texto: "63 398 → 63 098 → 62 431",
          },
          {
            id: "1",
            texto: "62 431 → 63 098 → 63 398",
          },
          {
            id: "2",
            texto: "63 398 → 62 431 → 63 098",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "Ascendente va de menor a mayor; descendente, de mayor a menor. Compara desde la izquierda.",
      },
    ],
  },
  {
    id: "recta",
    variantes: [
      {
        id: "num-recta-1",
        bloqueId: "comparacion-orden",
        conceptoId: "localizacion-recta",
        tipoEvidencia: "seleccion_simple",
        titulo: "Encuentra su lugar",
        enunciado: "62 431 está en una recta de 62 000 a 64 000.",
        pregunta: "¿Dónde lo situarías?",
        opciones: [
          {
            id: "0",
            texto: "Entre 62 000 y 62 500",
          },
          {
            id: "1",
            texto: "Entre 63 000 y 63 500",
          },
          {
            id: "2",
            texto: "Entre 63 500 y 64 000",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "62 431 supera 62 000 en 431; aún no llega a 62 500.",
      },
      {
        id: "num-recta-2",
        bloqueId: "comparacion-orden",
        conceptoId: "localizacion-recta",
        tipoEvidencia: "seleccion_simple",
        titulo: "Encuentra su lugar",
        enunciado: "63 398 está en una recta de 62 000 a 64 000.",
        pregunta: "¿Dónde lo situarías?",
        opciones: [
          {
            id: "0",
            texto: "Entre 63 000 y 63 500",
          },
          {
            id: "1",
            texto: "Entre 62 000 y 62 500",
          },
          {
            id: "2",
            texto: "Entre 63 500 y 64 000",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "63 398 es mayor que 63 000 y menor que 63 500.",
      },
      {
        id: "num-recta-3",
        bloqueId: "comparacion-orden",
        conceptoId: "localizacion-recta",
        tipoEvidencia: "seleccion_simple",
        titulo: "Encuentra su lugar",
        enunciado: "25 000 está en una recta de 0 a 40 000.",
        pregunta: "¿Dónde lo situarías?",
        opciones: [
          {
            id: "0",
            texto: "Entre 20 000 y 30 000",
          },
          {
            id: "1",
            texto: "Entre 0 y 10 000",
          },
          {
            id: "2",
            texto: "Entre 30 000 y 40 000",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "25 000 está justo en el punto medio entre 20 000 y 30 000.",
      },
      {
        id: "num-recta-4",
        bloqueId: "comparacion-orden",
        conceptoId: "localizacion-recta",
        tipoEvidencia: "seleccion_simple",
        titulo: "Encuentra su lugar",
        enunciado: "32 000 está en una recta de 0 a 40 000.",
        pregunta: "¿Dónde lo situarías?",
        opciones: [
          {
            id: "0",
            texto: "Entre 30 000 y 40 000",
          },
          {
            id: "1",
            texto: "Entre 10 000 y 20 000",
          },
          {
            id: "2",
            texto: "Entre 20 000 y 30 000",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "32 000 supera 30 000 y no llega a 40 000.",
      },
    ],
  },
  {
    id: "cien",
    variantes: [
      {
        id: "num-cien-1",
        bloqueId: "series",
        conceptoId: "saltos-100",
        tipoEvidencia: "seleccion_simple",
        titulo: "Un salto de cien",
        enunciado: "Partes de 53 600 y haces −100.",
        pregunta: "¿Dónde llegas?",
        opciones: [
          {
            id: "0",
            texto: "53 500",
          },
          {
            id: "1",
            texto: "52 600",
          },
          {
            id: "2",
            texto: "53 700",
          },
          {
            id: "3",
            texto: "53 590",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "53 600 − 100 = 53 500. Revisa las centenas y si hay un cambio de millar.",
      },
      {
        id: "num-cien-2",
        bloqueId: "series",
        conceptoId: "saltos-100",
        tipoEvidencia: "seleccion_simple",
        titulo: "Un salto de cien",
        enunciado: "Partes de 43 550 y haces +100.",
        pregunta: "¿Dónde llegas?",
        opciones: [
          {
            id: "0",
            texto: "43 650",
          },
          {
            id: "1",
            texto: "44 550",
          },
          {
            id: "2",
            texto: "43 450",
          },
          {
            id: "3",
            texto: "43 560",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "43 550 + 100 = 43 650. Revisa las centenas y si hay un cambio de millar.",
      },
      {
        id: "num-cien-3",
        bloqueId: "series",
        conceptoId: "saltos-100",
        tipoEvidencia: "seleccion_simple",
        titulo: "Un salto de cien",
        enunciado: "Partes de 16 950 y haces +100.",
        pregunta: "¿Dónde llegas?",
        opciones: [
          {
            id: "0",
            texto: "17 050",
          },
          {
            id: "1",
            texto: "17 950",
          },
          {
            id: "2",
            texto: "16 850",
          },
          {
            id: "3",
            texto: "16 960",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "16 950 + 100 = 17 050. Revisa las centenas y si hay un cambio de millar.",
      },
      {
        id: "num-cien-4",
        bloqueId: "series",
        conceptoId: "saltos-100",
        tipoEvidencia: "seleccion_simple",
        titulo: "Un salto de cien",
        enunciado: "Partes de 35 980 y haces +100.",
        pregunta: "¿Dónde llegas?",
        opciones: [
          {
            id: "0",
            texto: "36 080",
          },
          {
            id: "1",
            texto: "36 980",
          },
          {
            id: "2",
            texto: "35 880",
          },
          {
            id: "3",
            texto: "35 990",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "35 980 + 100 = 36 080. Revisa las centenas y si hay un cambio de millar.",
      },
    ],
  },
  {
    id: "mil",
    variantes: [
      {
        id: "num-mil-1",
        bloqueId: "series",
        conceptoId: "saltos-1000",
        tipoEvidencia: "seleccion_simple",
        titulo: "Un salto de mil",
        enunciado: "Partes de 97 000 y haces +1 000.",
        pregunta: "¿Dónde llegas?",
        opciones: [
          {
            id: "0",
            texto: "98 000",
          },
          {
            id: "1",
            texto: "97 100",
          },
          {
            id: "2",
            texto: "96 000",
          },
          {
            id: "3",
            texto: "97 010",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "97 000 + 1 000 = 98 000. Las tres últimas cifras conservan su valor.",
      },
      {
        id: "num-mil-2",
        bloqueId: "series",
        conceptoId: "saltos-1000",
        tipoEvidencia: "seleccion_simple",
        titulo: "Un salto de mil",
        enunciado: "Partes de 34 829 y haces −1 000.",
        pregunta: "¿Dónde llegas?",
        opciones: [
          {
            id: "0",
            texto: "33 829",
          },
          {
            id: "1",
            texto: "34 729",
          },
          {
            id: "2",
            texto: "35 829",
          },
          {
            id: "3",
            texto: "34 819",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "34 829 − 1 000 = 33 829. Las tres últimas cifras conservan su valor.",
      },
      {
        id: "num-mil-3",
        bloqueId: "series",
        conceptoId: "saltos-1000",
        tipoEvidencia: "seleccion_simple",
        titulo: "Un salto de mil",
        enunciado: "Partes de 70 211 y haces −1 000.",
        pregunta: "¿Dónde llegas?",
        opciones: [
          {
            id: "0",
            texto: "69 211",
          },
          {
            id: "1",
            texto: "70 111",
          },
          {
            id: "2",
            texto: "71 211",
          },
          {
            id: "3",
            texto: "70 201",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "70 211 − 1 000 = 69 211. Las tres últimas cifras conservan su valor.",
      },
      {
        id: "num-mil-4",
        bloqueId: "series",
        conceptoId: "saltos-1000",
        tipoEvidencia: "seleccion_simple",
        titulo: "Un salto de mil",
        enunciado: "Partes de 99 000 y haces +1 000.",
        pregunta: "¿Dónde llegas?",
        opciones: [
          {
            id: "0",
            texto: "100 000",
          },
          {
            id: "1",
            texto: "99 100",
          },
          {
            id: "2",
            texto: "98 000",
          },
          {
            id: "3",
            texto: "99 010",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "99 000 + 1 000 = 100 000. Las tres últimas cifras conservan su valor.",
      },
    ],
  },
  {
    id: "serie",
    variantes: [
      {
        id: "num-serie-1",
        bloqueId: "series",
        conceptoId: "series",
        tipoEvidencia: "seleccion_simple",
        titulo: "Descubre el salto",
        enunciado: "Serie: 90 000 → 91 000 → 92 000 → …",
        pregunta: "¿Qué número sigue?",
        opciones: [
          {
            id: "0",
            texto: "93 000",
          },
          {
            id: "1",
            texto: "91 000",
          },
          {
            id: "2",
            texto: "92 100",
          },
          {
            id: "3",
            texto: "94 000",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "Cada paso cambia 1 000 más. Repite el mismo salto.",
      },
      {
        id: "num-serie-2",
        bloqueId: "series",
        conceptoId: "series",
        tipoEvidencia: "seleccion_simple",
        titulo: "Descubre el salto",
        enunciado: "Serie: 53 900 → 53 800 → 53 700 → …",
        pregunta: "¿Qué número sigue?",
        opciones: [
          {
            id: "0",
            texto: "53 600",
          },
          {
            id: "1",
            texto: "53 800",
          },
          {
            id: "2",
            texto: "53 690",
          },
          {
            id: "3",
            texto: "53 500",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "Cada paso cambia 100 menos. Repite el mismo salto.",
      },
      {
        id: "num-serie-3",
        bloqueId: "series",
        conceptoId: "series",
        tipoEvidencia: "seleccion_simple",
        titulo: "Descubre el salto",
        enunciado: "Serie: 32 000 → 33 000 → 34 000 → …",
        pregunta: "¿Qué número sigue?",
        opciones: [
          {
            id: "0",
            texto: "35 000",
          },
          {
            id: "1",
            texto: "33 000",
          },
          {
            id: "2",
            texto: "34 100",
          },
          {
            id: "3",
            texto: "36 000",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "Cada paso cambia 1 000 más. Repite el mismo salto.",
      },
      {
        id: "num-serie-4",
        bloqueId: "series",
        conceptoId: "series",
        tipoEvidencia: "seleccion_simple",
        titulo: "Descubre el salto",
        enunciado: "Serie: 9 900 → 10 000 → 10 100 → …",
        pregunta: "¿Qué número sigue?",
        opciones: [
          {
            id: "0",
            texto: "10 200",
          },
          {
            id: "1",
            texto: "10 000",
          },
          {
            id: "2",
            texto: "10 110",
          },
          {
            id: "3",
            texto: "10 300",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "Cada paso cambia 100 más. Repite el mismo salto.",
      },
    ],
  },
  {
    id: "redondeo-10",
    variantes: [
      {
        id: "num-redondeo-10-1",
        bloqueId: "redondeo",
        conceptoId: "redondeo-10",
        tipoEvidencia: "seleccion_simple",
        titulo: "El vecino más cercano",
        enunciado: "Redondea 4 218 a la decena más cercana.",
        pregunta: "¿Cuál es la aproximación?",
        opciones: [
          {
            id: "0",
            texto: "4 220",
          },
          {
            id: "1",
            texto: "4 210",
          },
          {
            id: "2",
            texto: "4 230",
          },
          {
            id: "3",
            texto: "4 200",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "4 218 está entre 4 210 y 4 220. Está más cerca de 4 220.",
      },
      {
        id: "num-redondeo-10-2",
        bloqueId: "redondeo",
        conceptoId: "redondeo-10",
        tipoEvidencia: "seleccion_simple",
        titulo: "El vecino más cercano",
        enunciado: "Redondea 3 255 a la decena más cercana.",
        pregunta: "¿Cuál es la aproximación?",
        opciones: [
          {
            id: "0",
            texto: "3 260",
          },
          {
            id: "1",
            texto: "3 250",
          },
          {
            id: "2",
            texto: "3 270",
          },
          {
            id: "3",
            texto: "3 240",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "3 255 está entre 3 250 y 3 260. Está justo en la mitad: usamos el valor superior.",
      },
      {
        id: "num-redondeo-10-3",
        bloqueId: "redondeo",
        conceptoId: "redondeo-10",
        tipoEvidencia: "seleccion_simple",
        titulo: "El vecino más cercano",
        enunciado: "Redondea 2 139 a la decena más cercana.",
        pregunta: "¿Cuál es la aproximación?",
        opciones: [
          {
            id: "0",
            texto: "2 140",
          },
          {
            id: "1",
            texto: "2 130",
          },
          {
            id: "2",
            texto: "2 150",
          },
          {
            id: "3",
            texto: "2 120",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "2 139 está entre 2 130 y 2 140. Está más cerca de 2 140.",
      },
      {
        id: "num-redondeo-10-4",
        bloqueId: "redondeo",
        conceptoId: "redondeo-10",
        tipoEvidencia: "seleccion_simple",
        titulo: "El vecino más cercano",
        enunciado: "Redondea 99 985 a la decena más cercana.",
        pregunta: "¿Cuál es la aproximación?",
        opciones: [
          {
            id: "0",
            texto: "99 990",
          },
          {
            id: "1",
            texto: "99 980",
          },
          {
            id: "2",
            texto: "100 000",
          },
          {
            id: "3",
            texto: "99 970",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "99 985 está entre 99 980 y 99 990. Está justo en la mitad: usamos el valor superior.",
      },
    ],
  },
  {
    id: "redondeo-100",
    variantes: [
      {
        id: "num-redondeo-100-1",
        bloqueId: "redondeo",
        conceptoId: "redondeo-100",
        tipoEvidencia: "seleccion_simple",
        titulo: "El vecino más cercano",
        enunciado: "Redondea 4 218 a la centena más cercana.",
        pregunta: "¿Cuál es la aproximación?",
        opciones: [
          {
            id: "0",
            texto: "4 200",
          },
          {
            id: "1",
            texto: "4 300",
          },
          {
            id: "2",
            texto: "4 100",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "4 218 está entre 4 200 y 4 300. Está más cerca de 4 200.",
      },
      {
        id: "num-redondeo-100-2",
        bloqueId: "redondeo",
        conceptoId: "redondeo-100",
        tipoEvidencia: "seleccion_simple",
        titulo: "El vecino más cercano",
        enunciado: "Redondea 3 255 a la centena más cercana.",
        pregunta: "¿Cuál es la aproximación?",
        opciones: [
          {
            id: "0",
            texto: "3 300",
          },
          {
            id: "1",
            texto: "3 200",
          },
          {
            id: "2",
            texto: "3 400",
          },
          {
            id: "3",
            texto: "3 100",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "3 255 está entre 3 200 y 3 300. Está más cerca de 3 300.",
      },
      {
        id: "num-redondeo-100-3",
        bloqueId: "redondeo",
        conceptoId: "redondeo-100",
        tipoEvidencia: "seleccion_simple",
        titulo: "El vecino más cercano",
        enunciado: "Redondea 1 250 a la centena más cercana.",
        pregunta: "¿Cuál es la aproximación?",
        opciones: [
          {
            id: "0",
            texto: "1 300",
          },
          {
            id: "1",
            texto: "1 200",
          },
          {
            id: "2",
            texto: "1 400",
          },
          {
            id: "3",
            texto: "1 100",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "1 250 está entre 1 200 y 1 300. Está justo en la mitad: usamos el valor superior.",
      },
      {
        id: "num-redondeo-100-4",
        bloqueId: "redondeo",
        conceptoId: "redondeo-100",
        tipoEvidencia: "seleccion_simple",
        titulo: "El vecino más cercano",
        enunciado: "Redondea 9 985 a la centena más cercana.",
        pregunta: "¿Cuál es la aproximación?",
        opciones: [
          {
            id: "0",
            texto: "10 000",
          },
          {
            id: "1",
            texto: "9 900",
          },
          {
            id: "2",
            texto: "10 100",
          },
          {
            id: "3",
            texto: "9 800",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "9 985 está entre 9 900 y 10 000. Está más cerca de 10 000.",
      },
    ],
  },
  {
    id: "redondeo-1000",
    variantes: [
      {
        id: "num-redondeo-1000-1",
        bloqueId: "redondeo",
        conceptoId: "redondeo-1000",
        tipoEvidencia: "seleccion_simple",
        titulo: "El vecino más cercano",
        enunciado: "Redondea 2 078 al millar más cercano.",
        pregunta: "¿Cuál es la aproximación?",
        opciones: [
          {
            id: "0",
            texto: "2 000",
          },
          {
            id: "1",
            texto: "3 000",
          },
          {
            id: "2",
            texto: "1 000",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "2 078 está entre 2 000 y 3 000. Está más cerca de 2 000.",
      },
      {
        id: "num-redondeo-1000-2",
        bloqueId: "redondeo",
        conceptoId: "redondeo-1000",
        tipoEvidencia: "seleccion_simple",
        titulo: "El vecino más cercano",
        enunciado: "Redondea 2 508 al millar más cercano.",
        pregunta: "¿Cuál es la aproximación?",
        opciones: [
          {
            id: "0",
            texto: "3 000",
          },
          {
            id: "1",
            texto: "2 000",
          },
          {
            id: "2",
            texto: "4 000",
          },
          {
            id: "3",
            texto: "1 000",
          },
        ],
        respuestaCorrecta: "0",
        explicacion: "2 508 está entre 2 000 y 3 000. Está más cerca de 3 000.",
      },
      {
        id: "num-redondeo-1000-3",
        bloqueId: "redondeo",
        conceptoId: "redondeo-1000",
        tipoEvidencia: "seleccion_simple",
        titulo: "El vecino más cercano",
        enunciado: "Redondea 2 500 al millar más cercano.",
        pregunta: "¿Cuál es la aproximación?",
        opciones: [
          {
            id: "0",
            texto: "3 000",
          },
          {
            id: "1",
            texto: "2 000",
          },
          {
            id: "2",
            texto: "4 000",
          },
          {
            id: "3",
            texto: "1 000",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "2 500 está entre 2 000 y 3 000. Está justo en la mitad: usamos el valor superior.",
      },
      {
        id: "num-redondeo-1000-4",
        bloqueId: "redondeo",
        conceptoId: "redondeo-1000",
        tipoEvidencia: "seleccion_simple",
        titulo: "El vecino más cercano",
        enunciado: "Redondea 9 985 al millar más cercano.",
        pregunta: "¿Cuál es la aproximación?",
        opciones: [
          {
            id: "0",
            texto: "10 000",
          },
          {
            id: "1",
            texto: "9 000",
          },
          {
            id: "2",
            texto: "11 000",
          },
          {
            id: "3",
            texto: "8 000",
          },
        ],
        respuestaCorrecta: "0",
        explicacion:
          "9 985 está entre 9 000 y 10 000. Está más cerca de 10 000.",
      },
    ],
  },
]);
