export const PUENTE_META = Object.freeze({
  actividadId: "6-mates-puente-5to-6to",
  tituloActividad: "Puente de 5.º a 6.º",
  version: "0.1",
  cursoReferencia: "6.º de Primaria",
  materia: "Matemáticas",
  tema: "Puente de 5.º a 6.º"
});

export const BLOQUES_PUENTE = Object.freeze([
  {
    id: "numeros-operaciones",
    icono: "🔢",
    titulo: "Números y operaciones",
    resumen: "Operaciones básicas, jerarquía, cálculo mental y potencias sencillas.",
    puntos: [
      "Sumar, restar, multiplicar y dividir con seguridad.",
      "Respetar el orden de las operaciones y los paréntesis.",
      "Usar estimaciones, dobles, mitades y potencias de 10."
    ],
    teoria: [
      "En una operación combinada no resolvemos todo de izquierda a derecha sin pensar. Primero atendemos a los paréntesis; después multiplicaciones y divisiones; al final sumas y restas.",
      "El cálculo mental sirve para anticipar si un resultado parece razonable. Dobles, mitades y redondeos pueden ayudar antes de hacer la cuenta exacta.",
      "Una potencia de base 10 expresa cuántas veces multiplicamos 10 por sí mismo: 10² = 100 y 10³ = 1000."
    ],
    ejemplo: "Ejemplo: 18 + 6 × 4 = 18 + 24 = 42."
  },
  {
    id: "fracciones-decimales",
    icono: "🍰",
    titulo: "Fracciones y decimales",
    resumen: "Fracciones equivalentes, fracción de una cantidad y relación con decimales y porcentajes sencillos.",
    puntos: [
      "Entender una fracción como partes iguales de un todo o de una cantidad.",
      "Reconocer fracciones equivalentes.",
      "Relacionar expresiones sencillas como 1/2, 0,5 y 50 %."
    ],
    teoria: [
      "El denominador indica en cuántas partes iguales se divide el todo. El numerador indica cuántas de esas partes tomamos.",
      "Dos fracciones son equivalentes cuando representan la misma cantidad, aunque sus números sean distintos.",
      "Para hallar una fracción de una cantidad podemos dividir primero entre el denominador y después multiplicar por el numerador."
    ],
    ejemplo: "Ejemplo: 2/3 de 15 → 15 ÷ 3 = 5 y 5 × 2 = 10."
  },
  {
    id: "problemas-medidas",
    icono: "🧠",
    titulo: "Problemas y medidas",
    resumen: "Comprender problemas de varios pasos y moverse entre unidades de longitud, capacidad y masa.",
    puntos: [
      "Separar datos útiles de información que distrae.",
      "Identificar qué se pregunta y cómo se relacionan las cantidades.",
      "Convertir unidades métricas siguiendo el valor de cada unidad."
    ],
    teoria: [
      "Antes de calcular, conviene separar tres cosas: qué sabemos, qué nos preguntan y cómo se relacionan las cantidades.",
      "Una palabra aislada no decide la operación. La situación completa es la que muestra si hay que juntar, quitar, repetir grupos, repartir, comparar u organizar varios pasos.",
      "En las unidades métricas es importante mirar de qué unidad partimos y a cuál queremos llegar. Después elegimos el factor de conversión adecuado."
    ],
    ejemplo: "Ejemplo: 3,4 m son 340 cm porque 1 m equivale a 100 cm."
  },
  {
    id: "geometria",
    icono: "📐",
    titulo: "Geometría básica",
    resumen: "Perímetros, áreas, ángulos y clasificación de triángulos.",
    puntos: [
      "Distinguir perímetro de área.",
      "Calcular áreas sencillas de rectángulos, cuadrados y triángulos.",
      "Reconocer ángulos y clasificar triángulos por sus lados."
    ],
    teoria: [
      "El perímetro mide el contorno de una figura. Para hallarlo sumamos las longitudes de sus lados.",
      "El área mide la superficie que ocupa una figura. En un rectángulo usamos base × altura. En un triángulo usamos base × altura ÷ 2.",
      "Un ángulo puede ser agudo, recto u obtuso. Un triángulo puede ser equilátero, isósceles o escaleno según la longitud de sus lados."
    ],
    ejemplo: "Ejemplo: un rectángulo de 8 cm por 5 cm tiene perímetro 26 cm y área 40 cm²."
  }
]);

export const FICHAS_PUENTE = Object.freeze([
  { icono:"🧩", pregunta:"¿Qué va primero en una operación combinada?", respuesta:"Primero los paréntesis; después multiplicaciones y divisiones; al final sumas y restas." },
  { icono:"⚡", pregunta:"¿Qué significa 10³?", respuesta:"10 × 10 × 10 = 1000." },
  { icono:"➗", pregunta:"¿Cómo puedes comprobar una división exacta?", respuesta:"Multiplica el cociente por el divisor y comprueba que recuperas el dividendo." },
  { icono:"🍰", pregunta:"¿Qué indica el denominador?", respuesta:"En cuántas partes iguales se divide el todo." },
  { icono:"🔁", pregunta:"¿Qué son fracciones equivalentes?", respuesta:"Fracciones distintas que representan la misma cantidad." },
  { icono:"💯", pregunta:"¿Qué relación sencilla conviene recordar?", respuesta:"1/2 = 0,5 = 50 %." },
  { icono:"🧭", pregunta:"¿Qué tres preguntas ayudan antes de calcular un problema?", respuesta:"¿Qué sé? ¿Qué me preguntan? ¿Cómo se relacionan las cantidades?" },
  { icono:"📏", pregunta:"¿Cuántos centímetros hay en 1 metro?", respuesta:"100 centímetros." },
  { icono:"🔲", pregunta:"¿Qué mide el perímetro?", respuesta:"La longitud del contorno de una figura." },
  { icono:"🟩", pregunta:"¿Qué mide el área?", respuesta:"La superficie que ocupa una figura." },
  { icono:"📐", pregunta:"¿Cómo se llama un ángulo mayor de 90° y menor de 180°?", respuesta:"Ángulo obtuso." },
  { icono:"🔺", pregunta:"¿Cómo se llama un triángulo con dos lados iguales?", respuesta:"Triángulo isósceles." }
]);

export const PRACTICA_PUENTE = Object.freeze([
  {
    id:"practica-operaciones",
    bloqueId:"numeros-operaciones",
    titulo:"Ordena la cuenta",
    enunciado:"Calcula: 24 + 8 × 3",
    pregunta:"¿Cuál es el resultado?",
    opciones:[
      {id:"a",texto:"96"},
      {id:"b",texto:"48"},
      {id:"c",texto:"72"}
    ],
    respuestaCorrecta:"b",
    pista:"La multiplicación se resuelve antes que la suma.",
    explicacion:"8 × 3 = 24. Después: 24 + 24 = 48."
  },
  {
    id:"practica-fracciones",
    bloqueId:"fracciones-decimales",
    titulo:"Una parte de una cantidad",
    enunciado:"Queremos calcular 3/4 de 20.",
    pregunta:"¿Cuál es el resultado?",
    opciones:[
      {id:"a",texto:"15"},
      {id:"b",texto:"12"},
      {id:"c",texto:"5"}
    ],
    respuestaCorrecta:"a",
    pista:"Divide 20 entre 4 y después toma 3 de esas partes.",
    explicacion:"20 ÷ 4 = 5. Después: 5 × 3 = 15."
  },
  {
    id:"practica-problemas",
    bloqueId:"problemas-medidas",
    titulo:"Mira la historia completa",
    enunciado:"En una estantería hay 5 cajas. Cada caja tiene 6 cuadernos. También hay 3 lápices sueltos. Queremos saber cuántos cuadernos hay.",
    pregunta:"¿Qué cálculo responde a la pregunta?",
    opciones:[
      {id:"a",texto:"5 × 6"},
      {id:"b",texto:"5 + 6 + 3"},
      {id:"c",texto:"6 ÷ 5"}
    ],
    respuestaCorrecta:"a",
    pista:"Los 3 lápices no cambian la cantidad de cuadernos.",
    explicacion:"Hay 5 grupos iguales de 6 cuadernos. La relación es 5 × 6."
  },
  {
    id:"practica-geometria",
    bloqueId:"geometria",
    titulo:"Contorno o superficie",
    enunciado:"Un rectángulo mide 7 cm de largo y 4 cm de ancho.",
    pregunta:"¿Cuál es su área?",
    opciones:[
      {id:"a",texto:"22 cm"},
      {id:"b",texto:"28 cm²"},
      {id:"c",texto:"11 cm²"}
    ],
    respuestaCorrecta:"b",
    pista:"El área del rectángulo se obtiene multiplicando base por altura.",
    explicacion:"7 × 4 = 28. Como medimos superficie, la unidad es cm²."
  }
]);

export const PRUEBA_PUENTE = Object.freeze([
  {
    id:"diag-suma",
    bloqueId:"numeros-operaciones",
    conceptoId:"suma",
    tipoEvidencia:"calculo",
    titulo:"Suma",
    enunciado:"Calcula 2847 + 1356.",
    pregunta:"¿Cuál es el resultado?",
    opciones:[{id:"a",texto:"4203"},{id:"b",texto:"4103"},{id:"c",texto:"4303"}],
    respuestaCorrecta:"a"
  },
  {
    id:"diag-resta",
    bloqueId:"numeros-operaciones",
    conceptoId:"resta",
    tipoEvidencia:"calculo",
    titulo:"Resta",
    enunciado:"Calcula 5000 − 1768.",
    pregunta:"¿Cuál es el resultado?",
    opciones:[{id:"a",texto:"3332"},{id:"b",texto:"3232"},{id:"c",texto:"3222"}],
    respuestaCorrecta:"b"
  },
  {
    id:"diag-multiplicacion",
    bloqueId:"numeros-operaciones",
    conceptoId:"multiplicacion",
    tipoEvidencia:"calculo",
    titulo:"Multiplicación",
    enunciado:"Calcula 37 × 24.",
    pregunta:"¿Cuál es el resultado?",
    opciones:[{id:"a",texto:"788"},{id:"b",texto:"888"},{id:"c",texto:"948"}],
    respuestaCorrecta:"b"
  },
  {
    id:"diag-division",
    bloqueId:"numeros-operaciones",
    conceptoId:"division",
    tipoEvidencia:"calculo",
    titulo:"División",
    enunciado:"Calcula 864 ÷ 8.",
    pregunta:"¿Cuál es el cociente?",
    opciones:[{id:"a",texto:"108"},{id:"b",texto:"118"},{id:"c",texto:"98"}],
    respuestaCorrecta:"a"
  },
  {
    id:"diag-jerarquia",
    bloqueId:"numeros-operaciones",
    conceptoId:"jerarquia_operaciones",
    tipoEvidencia:"razonamiento",
    titulo:"Jerarquía de operaciones",
    enunciado:"Calcula 18 + 6 × 4.",
    pregunta:"¿Qué resultado respeta el orden correcto?",
    opciones:[{id:"a",texto:"96"},{id:"b",texto:"42"},{id:"c",texto:"48"}],
    respuestaCorrecta:"b"
  },
  {
    id:"diag-fraccion-cantidad",
    bloqueId:"fracciones-decimales",
    conceptoId:"fraccion_de_cantidad",
    tipoEvidencia:"calculo",
    titulo:"Fracción de una cantidad",
    enunciado:"Queremos hallar 2/3 de 15.",
    pregunta:"¿Cuál es el resultado?",
    opciones:[{id:"a",texto:"5"},{id:"b",texto:"10"},{id:"c",texto:"12"}],
    respuestaCorrecta:"b"
  },
  {
    id:"diag-equivalentes",
    bloqueId:"fracciones-decimales",
    conceptoId:"fracciones_equivalentes",
    tipoEvidencia:"comprension",
    titulo:"Fracciones equivalentes",
    enunciado:"Busca una fracción que represente la misma cantidad que 1/2.",
    pregunta:"¿Cuál es equivalente?",
    opciones:[{id:"a",texto:"2/4"},{id:"b",texto:"2/3"},{id:"c",texto:"3/4"}],
    respuestaCorrecta:"a"
  },
  {
    id:"diag-relacion-porcentaje",
    bloqueId:"fracciones-decimales",
    conceptoId:"fraccion_decimal_porcentaje",
    tipoEvidencia:"comprension",
    titulo:"Tres formas de expresar lo mismo",
    enunciado:"Piensa en la mitad de una cantidad.",
    pregunta:"¿Qué grupo representa la misma cantidad?",
    opciones:[{id:"a",texto:"1/2 · 0,5 · 50 %"},{id:"b",texto:"1/2 · 0,2 · 20 %"},{id:"c",texto:"1/4 · 0,5 · 50 %"}],
    respuestaCorrecta:"a"
  },
  {
    id:"diag-datos-relevantes",
    bloqueId:"problemas-medidas",
    conceptoId:"datos_relevantes",
    tipoEvidencia:"comprension",
    titulo:"Datos que sí importan",
    enunciado:"Hay 5 mesas. En cada mesa colocan 4 botellas de agua. En la sala también hay 3 carteles. Queremos saber cuántas botellas hay.",
    pregunta:"¿Qué datos necesitas para responder?",
    opciones:[{id:"a",texto:"5 mesas y 4 botellas por mesa"},{id:"b",texto:"4 botellas y 3 carteles"},{id:"c",texto:"5 mesas y 3 carteles"}],
    respuestaCorrecta:"a"
  },
  {
    id:"diag-problema-dos-pasos",
    bloqueId:"problemas-medidas",
    conceptoId:"problema_dos_pasos",
    tipoEvidencia:"razonamiento",
    titulo:"Problema de dos pasos",
    enunciado:"Lucía tiene 18 cromos. Le regalan 7 y después entrega 5 a su hermana.",
    pregunta:"¿Cuántos cromos tiene al final?",
    opciones:[{id:"a",texto:"20"},{id:"b",texto:"30"},{id:"c",texto:"16"}],
    respuestaCorrecta:"a"
  },
  {
    id:"diag-medidas",
    bloqueId:"problemas-medidas",
    conceptoId:"conversion_medidas",
    tipoEvidencia:"calculo",
    titulo:"Unidades de longitud",
    enunciado:"Una cinta mide 3,4 metros.",
    pregunta:"¿Cuántos centímetros son?",
    opciones:[{id:"a",texto:"34 cm"},{id:"b",texto:"340 cm"},{id:"c",texto:"3400 cm"}],
    respuestaCorrecta:"b"
  },
  {
    id:"diag-perimetro",
    bloqueId:"geometria",
    conceptoId:"perimetro",
    tipoEvidencia:"calculo",
    titulo:"Perímetro",
    enunciado:"Un rectángulo mide 8 cm de largo y 5 cm de ancho.",
    pregunta:"¿Cuál es su perímetro?",
    opciones:[{id:"a",texto:"40 cm²"},{id:"b",texto:"26 cm"},{id:"c",texto:"13 cm"}],
    respuestaCorrecta:"b"
  },
  {
    id:"diag-area-triangulo",
    bloqueId:"geometria",
    conceptoId:"area_triangulo",
    tipoEvidencia:"calculo",
    titulo:"Área de un triángulo",
    enunciado:"Un triángulo tiene base de 10 cm y altura de 6 cm.",
    pregunta:"¿Cuál es su área?",
    opciones:[{id:"a",texto:"60 cm²"},{id:"b",texto:"32 cm²"},{id:"c",texto:"30 cm²"}],
    respuestaCorrecta:"c"
  },
  {
    id:"diag-triangulo",
    bloqueId:"geometria",
    conceptoId:"clasificacion_triangulos",
    tipoEvidencia:"comprension",
    titulo:"Clasificación de triángulos",
    enunciado:"Un triángulo tiene lados de 5 cm, 5 cm y 8 cm.",
    pregunta:"¿Cómo se clasifica por sus lados?",
    opciones:[{id:"a",texto:"Equilátero"},{id:"b",texto:"Isósceles"},{id:"c",texto:"Escaleno"}],
    respuestaCorrecta:"b"
  }
]);
