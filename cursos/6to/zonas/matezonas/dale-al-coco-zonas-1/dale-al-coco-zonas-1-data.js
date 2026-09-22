export const COCO_META = Object.freeze({
  actividadId:"6-matematicas-matezonas-dale-al-coco-zonas-1",
  tituloActividad:"Dale al coco · Zonas 1",
  version:"1.0",
  cursoReferencia:"6.º de Primaria",
  materia:"Matemáticas",
  tema:"Dale al coco · Zonas 1"
});

export const BLOQUES_RESULTADO = Object.freeze([
  Object.freeze({
    id:"calculo-operaciones",
    icono:"⚡",
    titulo:"Cálculo y operaciones",
    descripcion:"Multiplicaciones, divisiones y elección de resultados correctos."
  }),
  Object.freeze({
    id:"expresiones",
    icono:"🧠",
    titulo:"Construir resultados",
    descripcion:"Combinar números, operaciones y paréntesis para alcanzar una meta."
  }),
  Object.freeze({
    id:"patrones",
    icono:"🔎",
    titulo:"Series y patrones",
    descripcion:"Descubrir cómo cambia una secuencia y anticipar el siguiente número."
  }),
  Object.freeze({
    id:"logica",
    icono:"🍐",
    titulo:"Lógica numérica",
    descripcion:"Relacionar filas, columnas y símbolos para encontrar valores ocultos."
  })
]);

function opcion(id,texto){ return Object.freeze({id,texto}); }
function reto(config){ return Object.freeze({...config,opciones:Object.freeze(config.opciones)}); }
function variante(config){ return Object.freeze({...config,tipoEvidencia:"seleccion_simple",opciones:Object.freeze(config.opciones)}); }

export const PRACTICA_COCO = Object.freeze([
  reto({
    id:"practica-51x4",
    titulo:"Elige el resultado",
    enunciado:"51 × 4",
    pregunta:"¿Cuál es el resultado correcto?",
    bloqueId:"calculo-operaciones",
    pista:"50 × 4 = 200 y 1 × 4 = 4.",
    respuestaCorrecta:"204",
    explicacion:"51 × 4 = 200 + 4 = 204.",
    opciones:[opcion("114","114"),opcion("305","305"),opcion("204","204")]
  }),
  reto({
    id:"practica-29x4",
    titulo:"Multiplicar sin perder la idea",
    enunciado:"29 × 4",
    pregunta:"¿Qué opción coincide?",
    bloqueId:"calculo-operaciones",
    pista:"Puedes pensar 30 × 4 y quitar 4.",
    respuestaCorrecta:"116",
    explicacion:"30 × 4 = 120; 120 − 4 = 116.",
    opciones:[opcion("96","96"),opcion("116","116"),opcion("249","249")]
  }),
  reto({
    id:"practica-meta-45",
    titulo:"Construye 45",
    enunciado:"Usa 5, 2 y 7 una vez. Debes usar + y ×.",
    pregunta:"¿Qué expresión llega a 45?",
    bloqueId:"expresiones",
    pista:"Primero busca una suma que produzca 9.",
    respuestaCorrecta:"a",
    explicacion:"2 + 7 = 9 y 5 × 9 = 45.",
    opciones:[
      opcion("a","5 × (2 + 7)"),
      opcion("b","(5 + 2) × 7"),
      opcion("c","5 + (2 × 7)")
    ]
  }),
  reto({
    id:"practica-meta-26",
    titulo:"Construye 26",
    enunciado:"Usa 2, 5 y 18 una vez. Debes usar − y ×.",
    pregunta:"¿Qué expresión llega a 26?",
    bloqueId:"expresiones",
    pista:"Busca primero una resta que produzca 13.",
    respuestaCorrecta:"b",
    explicacion:"18 − 5 = 13 y 13 × 2 = 26.",
    opciones:[
      opcion("a","18 − (5 × 2)"),
      opcion("b","(18 − 5) × 2"),
      opcion("c","18 × 2 − 5")
    ]
  }),
  reto({
    id:"practica-serie-29",
    titulo:"La rueda que aumenta cada vez más",
    enunciado:"1, 2, 4, 7, 11, 16, 22, …",
    pregunta:"¿Qué número sigue?",
    bloqueId:"patrones",
    pista:"Los saltos son +1, +2, +3, +4, +5, +6…",
    respuestaCorrecta:"29",
    explicacion:"El siguiente salto es +7: 22 + 7 = 29.",
    opciones:[opcion("28","28"),opcion("29","29"),opcion("30","30")]
  }),
  reto({
    id:"practica-serie-23",
    titulo:"Dos saltos que se alternan",
    enunciado:"5, 8, 10, 13, 15, 18, 20, …",
    pregunta:"¿Qué número sigue?",
    bloqueId:"patrones",
    pista:"Observa que se alternan +3 y +2.",
    respuestaCorrecta:"23",
    explicacion:"Después de 18 → 20 (+2), vuelve +3: 20 + 3 = 23.",
    opciones:[opcion("21","21"),opcion("22","22"),opcion("23","23")]
  }),
  reto({
    id:"practica-frutas-naranja",
    titulo:"Empieza por la pista más fuerte",
    enunciado:"En una fila aparecen cuatro naranjas y el total es 28.",
    pregunta:"¿Cuánto vale una naranja?",
    bloqueId:"logica",
    pista:"Divide el total entre las cuatro frutas iguales.",
    respuestaCorrecta:"7",
    explicacion:"28 ÷ 4 = 7. La naranja vale 7.",
    opciones:[opcion("5","5"),opcion("7","7"),opcion("9","9")]
  }),
  reto({
    id:"practica-frutas-cerezas",
    titulo:"Usa lo que ya sabes",
    enunciado:"Dos naranjas + dos grupos de cerezas suman 32. Cada naranja vale 7.",
    pregunta:"¿Cuánto vale el grupo de cerezas?",
    bloqueId:"logica",
    pista:"Dos naranjas valen 14. ¿Cuánto queda para dos grupos de cerezas?",
    respuestaCorrecta:"9",
    explicacion:"32 − 14 = 18; 18 ÷ 2 = 9.",
    opciones:[opcion("8","8"),opcion("9","9"),opcion("10","10")]
  })
]);

export const FAMILIAS_PRUEBA_COCO = Object.freeze([
  Object.freeze({id:"familia-calculo-a",variantes:Object.freeze([
    variante({
      id:"test-17x3",bloqueId:"calculo-operaciones",conceptoId:"multiplicacion-mental",
      titulo:"Cálculo",enunciado:"17 × 3",pregunta:"Elige el resultado correcto.",
      respuestaCorrecta:"a",explicacion:"17 × 3 = 51.",
      opciones:[opcion("a","51"),opcion("b","40"),opcion("c","91")]
    }),
    variante({
      id:"test-15x3",bloqueId:"calculo-operaciones",conceptoId:"multiplicacion-mental",
      titulo:"Cálculo",enunciado:"15 × 3",pregunta:"Elige el resultado correcto.",
      respuestaCorrecta:"b",explicacion:"15 × 3 = 45.",
      opciones:[opcion("a","27"),opcion("b","45"),opcion("c","60")]
    })
  ])}),
  Object.freeze({id:"familia-calculo-b",variantes:Object.freeze([
    variante({
      id:"test-19x12",bloqueId:"calculo-operaciones",conceptoId:"multiplicacion-dos-cifras",
      titulo:"Cálculo",enunciado:"19 × 12",pregunta:"¿Qué resultado coincide?",
      respuestaCorrecta:"c",explicacion:"19 × 12 = 228.",
      opciones:[opcion("a","145"),opcion("b","368"),opcion("c","228")]
    }),
    variante({
      id:"test-27x12",bloqueId:"calculo-operaciones",conceptoId:"multiplicacion-dos-cifras",
      titulo:"Cálculo",enunciado:"27 × 12",pregunta:"¿Qué resultado coincide?",
      respuestaCorrecta:"a",explicacion:"27 × 12 = 324.",
      opciones:[opcion("a","324"),opcion("b","224"),opcion("c","124")]
    })
  ])}),
  Object.freeze({id:"familia-expresion-a",variantes:Object.freeze([
    variante({
      id:"test-meta-14",bloqueId:"expresiones",conceptoId:"construccion-expresiones",
      titulo:"Construye 14",enunciado:"Usa 8, 4 y 12 una vez, con + y ÷.",pregunta:"¿Qué expresión produce 14?",
      respuestaCorrecta:"b",explicacion:"8 ÷ 4 = 2; 12 + 2 = 14.",
      opciones:[opcion("a","(12 + 8) ÷ 4"),opcion("b","12 + (8 ÷ 4)"),opcion("c","8 + (12 ÷ 4)")]
    }),
    variante({
      id:"test-meta-3",bloqueId:"expresiones",conceptoId:"construccion-expresiones",
      titulo:"Construye 3",enunciado:"Usa 25, 4 y 7 una vez, con − y ×.",pregunta:"¿Qué expresión produce 3?",
      respuestaCorrecta:"c",explicacion:"4 × 7 = 28; 28 − 25 = 3.",
      opciones:[opcion("a","25 − (4 × 7)"),opcion("b","(25 − 4) × 7"),opcion("c","(4 × 7) − 25")]
    })
  ])}),
  Object.freeze({id:"familia-expresion-b",variantes:Object.freeze([
    variante({
      id:"test-meta-1a",bloqueId:"expresiones",conceptoId:"parentesis-operaciones",
      titulo:"Construye 1",enunciado:"Usa 7, 4 y 11 una vez, con + y ÷.",pregunta:"¿Qué expresión produce 1?",
      respuestaCorrecta:"a",explicacion:"7 + 4 = 11; 11 ÷ 11 = 1.",
      opciones:[opcion("a","(7 + 4) ÷ 11"),opcion("b","7 + (4 ÷ 11)"),opcion("c","11 ÷ 7 + 4")]
    }),
    variante({
      id:"test-meta-1b",bloqueId:"expresiones",conceptoId:"parentesis-operaciones",
      titulo:"Construye 1",enunciado:"Usa 9, 2 y 3 una vez, con − y ÷.",pregunta:"¿Qué expresión produce 1?",
      respuestaCorrecta:"b",explicacion:"9 ÷ 3 = 3; 3 − 2 = 1.",
      opciones:[opcion("a","9 ÷ (3 − 2)"),opcion("b","(9 ÷ 3) − 2"),opcion("c","(9 − 2) ÷ 3")]
    })
  ])}),
  Object.freeze({id:"familia-patron-a",variantes:Object.freeze([
    variante({
      id:"test-serie-creciente",bloqueId:"patrones",conceptoId:"serie-diferencias-crecientes",
      titulo:"Serie",enunciado:"1, 2, 4, 7, 11, 16, 22, …",pregunta:"¿Qué número sigue?",
      respuestaCorrecta:"b",explicacion:"Los saltos son +1, +2, +3, +4, +5, +6; sigue +7, así que 22 + 7 = 29.",
      opciones:[opcion("a","28"),opcion("b","29"),opcion("c","30")]
    }),
    variante({
      id:"test-serie-salto",bloqueId:"patrones",conceptoId:"serie-diferencias-crecientes",
      titulo:"Patrón de saltos",enunciado:"En la serie 1, 2, 4, 7, 11, 16, 22…",pregunta:"¿Cuál es el salto que viene después de +6?",
      respuestaCorrecta:"c",explicacion:"Los saltos aumentan de uno en uno: +1, +2, +3, +4, +5, +6, +7.",
      opciones:[opcion("a","+5"),opcion("b","+6"),opcion("c","+7")]
    })
  ])}),
  Object.freeze({id:"familia-patron-b",variantes:Object.freeze([
    variante({
      id:"test-serie-alterna",bloqueId:"patrones",conceptoId:"serie-alternada",
      titulo:"Serie alternada",enunciado:"5, 8, 10, 13, 15, 18, 20, …",pregunta:"¿Qué número sigue?",
      respuestaCorrecta:"c",explicacion:"Se alternan +3 y +2. Después de +2 toca +3: 20 + 3 = 23.",
      opciones:[opcion("a","21"),opcion("b","22"),opcion("c","23")]
    }),
    variante({
      id:"test-serie-alterna-regla",bloqueId:"patrones",conceptoId:"serie-alternada",
      titulo:"Regla de la serie",enunciado:"5 → 8 → 10 → 13 → 15 → 18 → 20",pregunta:"¿Qué regla describe mejor los saltos?",
      respuestaCorrecta:"a",explicacion:"Los incrementos se alternan: +3, +2, +3, +2…",
      opciones:[opcion("a","+3, +2, +3, +2…"),opcion("b","+2 siempre"),opcion("c","+3 siempre")]
    })
  ])}),
  Object.freeze({id:"familia-logica-a",variantes:Object.freeze([
    variante({
      id:"test-fruta-naranja",bloqueId:"logica",conceptoId:"ecuaciones-visuales",
      titulo:"Frutas",enunciado:"Cuatro naranjas suman 28.",pregunta:"¿Cuánto vale una naranja?",
      respuestaCorrecta:"b",explicacion:"28 ÷ 4 = 7.",
      opciones:[opcion("a","5"),opcion("b","7"),opcion("c","9")]
    }),
    variante({
      id:"test-fruta-cerezas",bloqueId:"logica",conceptoId:"ecuaciones-visuales",
      titulo:"Frutas",enunciado:"Dos naranjas y dos grupos de cerezas suman 32. La naranja vale 7.",pregunta:"¿Cuánto vale el grupo de cerezas?",
      respuestaCorrecta:"c",explicacion:"32 − 14 = 18; 18 ÷ 2 = 9.",
      opciones:[opcion("a","7"),opcion("b","8"),opcion("c","9")]
    })
  ])}),
  Object.freeze({id:"familia-logica-b",variantes:Object.freeze([
    variante({
      id:"test-fruta-manzana",bloqueId:"logica",conceptoId:"deduccion-filas-columnas",
      titulo:"Frutas",enunciado:"En la primera columna hay tres manzanas y tres naranjas; el total es 24. La naranja vale 7.",pregunta:"¿Cuánto vale una manzana?",
      respuestaCorrecta:"a",explicacion:"3 manzanas + 21 = 24; las tres manzanas suman 3, así que cada una vale 1.",
      opciones:[opcion("a","1"),opcion("b","3"),opcion("c","5")]
    }),
    variante({
      id:"test-fruta-pera",bloqueId:"logica",conceptoId:"deduccion-filas-columnas",
      titulo:"Frutas",enunciado:"En una fila: naranja + pera + manzana + cerezas = 22. Naranja=7, manzana=1 y cerezas=9.",pregunta:"¿Cuánto vale la pera?",
      respuestaCorrecta:"b",explicacion:"7 + pera + 1 + 9 = 22; la pera vale 5.",
      opciones:[opcion("a","4"),opcion("b","5"),opcion("c","6")]
    })
  ])})
]);

export const SOLUCIONES_MATERIAL = Object.freeze({
  multiplicaciones:Object.freeze([
    "17 × 3 = 51","19 × 12 = 228","51 × 4 = 204","24 × 4 = 96","28 × 6 = 168","32 × 6 = 192",
    "15 × 3 = 45","27 × 12 = 324","50 × 4 = 200","29 × 4 = 116","33 × 6 = 198","12 × 6 = 72"
  ]),
  expresiones:Object.freeze([
    "(7 + 4) ÷ 11 = 1",
    "5 × (2 + 7) = 45",
    "(18 − 5) × 2 = 26",
    "12 + (8 ÷ 4) = 14",
    "(4 × 7) − 25 = 3",
    "(9 ÷ 3) − 2 = 1"
  ]),
  series:Object.freeze([
    "1, 2, 4, 7, 11, 16, 22, 29",
    "5, 8, 10, 13, 15, 18, 20, 23"
  ]),
  frutas:Object.freeze({
    naranja:7,
    cerezas:9,
    manzana:1,
    pera:5,
    filas:["22","32","12","28","22","12"],
    columnas:["24","32","36","36"]
  })
});
