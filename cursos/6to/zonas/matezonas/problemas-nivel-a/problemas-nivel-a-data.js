export const PROBLEMAS_META = Object.freeze({
  actividadId:"6-matematicas-matezonas-problemas-nivel-a",
  tituloActividad:"Problemas y operaciones · Nivel A",
  version:"1.0",
  cursoReferencia:"6.º de Primaria",
  materia:"Matemáticas",
  tema:"Problemas y operaciones · Nivel A"
});

export const BLOQUES_RESULTADO = Object.freeze([
  Object.freeze({
    id:"comprender",
    icono:"👀",
    titulo:"Comprender el problema",
    descripcion:"Distinguir datos, pregunta y unidades antes de calcular."
  }),
  Object.freeze({
    id:"planificar",
    icono:"🧭",
    titulo:"Planificar los pasos",
    descripcion:"Elegir las operaciones necesarias y ponerlas en el orden correcto."
  }),
  Object.freeze({
    id:"calcular",
    icono:"✏️",
    titulo:"Calcular paso a paso",
    descripcion:"Resolver cada operación con control de resultados intermedios."
  }),
  Object.freeze({
    id:"comprobar",
    icono:"✅",
    titulo:"Comprobar y responder",
    descripcion:"Verificar si el resultado tiene sentido y escribirlo con su unidad."
  })
]);

function opcion(id,texto){ return Object.freeze({id,texto}); }
function reto(config){ return Object.freeze({...config,opciones:Object.freeze(config.opciones)}); }
function variante(config){ return Object.freeze({...config,tipoEvidencia:"seleccion_simple",opciones:Object.freeze(config.opciones)}); }

export const PROBLEMAS_FUENTE = Object.freeze([
  Object.freeze({
    id:"biblioteca",
    titulo:"La biblioteca",
    pregunta:"¿Cuántos libros se colocaron en cada estantería?",
    pasos:Object.freeze([
      "12 × 45 = 540 libros recibidos",
      "540 − 50 = 490 libros en buen estado",
      "490 ÷ 10 = 49 libros por estantería"
    ]),
    resultado:"49 libros por estantería"
  }),
  Object.freeze({
    id:"baloncesto",
    titulo:"El equipo de baloncesto",
    pregunta:"¿A cuánto asciende el valor de cada cuota mensual?",
    pasos:Object.freeze([
      "15 × 35 = 525 € antes del descuento",
      "525 − 60 = 465 € después del descuento",
      "465 ÷ 3 = 155 € por cuota"
    ]),
    resultado:"155 € por cuota mensual"
  }),
  Object.freeze({
    id:"agricultor",
    titulo:"El agricultor",
    pregunta:"¿Cuánto dinero obtendrá por la venta de todas las bolsas?",
    pasos:Object.freeze([
      "450 + 350 = 800 kg recolectados",
      "800 − 80 = 720 kg para vender",
      "720 ÷ 5 = 144 bolsas",
      "144 × 4 = 576 €"
    ]),
    resultado:"576 €"
  })
]);

export const PRACTICA_PROBLEMAS = Object.freeze([
  reto({
    id:"practica-biblio-datos",
    titulo:"¿Qué calculo primero?",
    enunciado:"La biblioteca recibe 12 cajas con 45 libros cada una.",
    pregunta:"¿Qué operación permite saber cuántos libros recibió en total?",
    bloqueId:"comprender",
    pista:"Hay el mismo número de libros en cada caja.",
    respuestaCorrecta:"multiplicar",
    explicacion:"12 grupos de 45 se representan con 12 × 45.",
    opciones:[
      opcion("sumar","12 + 45"),
      opcion("multiplicar","12 × 45"),
      opcion("dividir","45 ÷ 12")
    ]
  }),
  reto({
    id:"practica-biblio-plan",
    titulo:"Pon los pasos en orden",
    enunciado:"Después de calcular los 540 libros, se separan 50 y el resto se reparte en 10 estanterías.",
    pregunta:"¿Qué secuencia de operaciones corresponde?",
    bloqueId:"planificar",
    pista:"Primero retiras los libros dañados; después repartes.",
    respuestaCorrecta:"restar-dividir",
    explicacion:"Primero 540 − 50 y después el resultado ÷ 10.",
    opciones:[
      opcion("restar-dividir","restar → dividir"),
      opcion("dividir-restar","dividir → restar"),
      opcion("sumar-dividir","sumar → dividir")
    ]
  }),
  reto({
    id:"practica-biblio-final",
    titulo:"Completa la biblioteca",
    enunciado:"540 − 50 = 490 libros. Se reparten por igual en 10 estanterías.",
    pregunta:"¿Cuántos libros van en cada estantería?",
    bloqueId:"calcular",
    pista:"Repartir por igual pide una división.",
    respuestaCorrecta:"49",
    explicacion:"490 ÷ 10 = 49.",
    opciones:[opcion("49","49"),opcion("54","54"),opcion("59","59")]
  }),
  reto({
    id:"practica-basket-plan",
    titulo:"Compra con descuento y cuotas",
    enunciado:"15 equipaciones cuestan 35 € cada una. Después se descuentan 60 € y el total se divide en 3 cuotas.",
    pregunta:"¿Qué orden de operaciones representa el problema?",
    bloqueId:"planificar",
    pista:"Primero calcula el precio de todas las equipaciones.",
    respuestaCorrecta:"m-r-d",
    explicacion:"multiplicar → restar → dividir.",
    opciones:[
      opcion("m-r-d","multiplicar → restar → dividir"),
      opcion("m-d-r","multiplicar → dividir → restar"),
      opcion("s-r-d","sumar → restar → dividir")
    ]
  }),
  reto({
    id:"practica-basket-final",
    titulo:"Valor de la cuota",
    enunciado:"15 × 35 = 525 €. Tras el descuento quedan 465 €. Se divide en 3 cuotas.",
    pregunta:"¿Cuánto vale cada cuota?",
    bloqueId:"calcular",
    pista:"465 ÷ 3.",
    respuestaCorrecta:"155",
    explicacion:"465 ÷ 3 = 155 €.",
    opciones:[opcion("155","155 €"),opcion("175","175 €"),opcion("135","135 €")]
  }),
  reto({
    id:"practica-agri-pasos",
    titulo:"De la cosecha a las bolsas",
    enunciado:"450 kg por la mañana y 350 kg por la tarde. Se guardan 80 kg y el resto va en bolsas de 5 kg.",
    pregunta:"¿Cuántas bolsas se preparan?",
    bloqueId:"calcular",
    pista:"Suma la cosecha, resta lo que se guarda y divide entre 5.",
    respuestaCorrecta:"144",
    explicacion:"450 + 350 = 800; 800 − 80 = 720; 720 ÷ 5 = 144 bolsas.",
    opciones:[opcion("144","144 bolsas"),opcion("160","160 bolsas"),opcion("136","136 bolsas")]
  }),
  reto({
    id:"practica-agri-dinero",
    titulo:"Dinero por la venta",
    enunciado:"Se prepararon 144 bolsas y cada una se vende a 4 €.",
    pregunta:"¿Cuánto dinero se obtiene?",
    bloqueId:"calcular",
    pista:"Multiplica número de bolsas por precio de cada bolsa.",
    respuestaCorrecta:"576",
    explicacion:"144 × 4 = 576 €.",
    opciones:[opcion("576","576 €"),opcion("560","560 €"),opcion("584","584 €")]
  }),
  reto({
    id:"practica-unidad",
    titulo:"La respuesta completa",
    enunciado:"El cálculo final de la biblioteca da 49.",
    pregunta:"¿Cuál es la respuesta más completa a la pregunta del problema?",
    bloqueId:"comprobar",
    pista:"La pregunta pide libros en cada estantería.",
    respuestaCorrecta:"libros-estanteria",
    explicacion:"El número necesita su unidad y su contexto: 49 libros por estantería.",
    opciones:[
      opcion("solo","49"),
      opcion("libros","49 libros"),
      opcion("libros-estanteria","49 libros por estantería")
    ]
  })
]);

export const FAMILIAS_PRUEBA_PROBLEMAS = Object.freeze([
  Object.freeze({id:"familia-comprender-datos",variantes:Object.freeze([
    variante({
      id:"test-datos-biblioteca",bloqueId:"comprender",conceptoId:"identificar-datos",
      titulo:"Datos útiles",enunciado:"12 cajas con 45 libros cada una; 50 se separan; el resto va a 10 estanterías.",
      pregunta:"¿Qué dato indica cuántos libros hay en cada caja?",
      respuestaCorrecta:"b",explicacion:"El enunciado dice 45 libros en cada caja.",
      opciones:[opcion("a","12"),opcion("b","45"),opcion("c","50")]
    }),
    variante({
      id:"test-datos-basket",bloqueId:"comprender",conceptoId:"identificar-datos",
      titulo:"Datos útiles",enunciado:"Hay 15 jugadores; cada equipación cuesta 35 €; descuento total 60 €; 3 cuotas.",
      pregunta:"¿Qué dato representa el precio de una equipación?",
      respuestaCorrecta:"a",explicacion:"Cada equipación completa cuesta 35 €.",
      opciones:[opcion("a","35 €"),opcion("b","60 €"),opcion("c","3 €")]
    })
  ])}),
  Object.freeze({id:"familia-comprender-pregunta",variantes:Object.freeze([
    variante({
      id:"test-pregunta-biblioteca",bloqueId:"comprender",conceptoId:"identificar-pregunta",
      titulo:"¿Qué pide?",enunciado:"El problema de la biblioteca termina preguntando por el reparto.",
      pregunta:"¿Qué debes encontrar al final?",
      respuestaCorrecta:"c",explicacion:"La pregunta pide libros colocados en cada estantería.",
      opciones:[opcion("a","Cajas recibidas"),opcion("b","Libros dañados"),opcion("c","Libros por estantería")]
    }),
    variante({
      id:"test-pregunta-agricultor",bloqueId:"comprender",conceptoId:"identificar-pregunta",
      titulo:"¿Qué pide?",enunciado:"El agricultor vende todas las bolsas preparadas.",
      pregunta:"¿Qué resultado final solicita el problema?",
      respuestaCorrecta:"b",explicacion:"Pregunta cuánto dinero obtendrá por la venta.",
      opciones:[opcion("a","Kilogramos totales"),opcion("b","Dinero obtenido"),opcion("c","Número de manzanas")]
    })
  ])}),
  Object.freeze({id:"familia-planificar-secuencia",variantes:Object.freeze([
    variante({
      id:"test-secuencia-basket",bloqueId:"planificar",conceptoId:"orden-operaciones-problema",
      titulo:"Orden de pasos",enunciado:"Precio de 15 equipaciones, descuento total y reparto en 3 cuotas.",
      pregunta:"¿Cuál es la secuencia correcta?",
      respuestaCorrecta:"a",explicacion:"Primero multiplicar, luego restar el descuento y finalmente dividir en cuotas.",
      opciones:[opcion("a","× → − → ÷"),opcion("b","÷ → × → −"),opcion("c","− → ÷ → ×")]
    }),
    variante({
      id:"test-secuencia-agricultor",bloqueId:"planificar",conceptoId:"orden-operaciones-problema",
      titulo:"Orden de pasos",enunciado:"Cosecha de mañana y tarde, reserva familiar, bolsas de 5 kg y precio por bolsa.",
      pregunta:"¿Qué secuencia encaja con el problema?",
      respuestaCorrecta:"c",explicacion:"Se suma la cosecha, se resta la reserva, se divide para saber bolsas y se multiplica por el precio.",
      opciones:[opcion("a","× → + → ÷ → −"),opcion("b","+ → ÷ → − → ×"),opcion("c","+ → − → ÷ → ×")]
    })
  ])}),
  Object.freeze({id:"familia-planificar-operacion",variantes:Object.freeze([
    variante({
      id:"test-operacion-reparto",bloqueId:"planificar",conceptoId:"elegir-operacion",
      titulo:"Elegir operación",enunciado:"490 libros deben repartirse equitativamente en 10 estanterías.",
      pregunta:"¿Qué operación corresponde?",
      respuestaCorrecta:"b",explicacion:"Un reparto equitativo se resuelve con una división.",
      opciones:[opcion("a","490 × 10"),opcion("b","490 ÷ 10"),opcion("c","490 − 10")]
    }),
    variante({
      id:"test-operacion-venta",bloqueId:"planificar",conceptoId:"elegir-operacion",
      titulo:"Elegir operación",enunciado:"Hay 144 bolsas y cada una se vende a 4 €.",
      pregunta:"¿Qué operación calcula el dinero total?",
      respuestaCorrecta:"a",explicacion:"144 grupos de 4 € se calculan con 144 × 4.",
      opciones:[opcion("a","144 × 4"),opcion("b","144 ÷ 4"),opcion("c","144 − 4")]
    })
  ])}),
  Object.freeze({id:"familia-calcular-intermedio",variantes:Object.freeze([
    variante({
      id:"test-intermedio-biblioteca",bloqueId:"calcular",conceptoId:"resultado-intermedio",
      titulo:"Resultado intermedio",enunciado:"12 × 45 = 540. Se separan 50 libros.",
      pregunta:"¿Cuántos quedan para repartir?",
      respuestaCorrecta:"c",explicacion:"540 − 50 = 490.",
      opciones:[opcion("a","590"),opcion("b","500"),opcion("c","490")]
    }),
    variante({
      id:"test-intermedio-basket",bloqueId:"calcular",conceptoId:"resultado-intermedio",
      titulo:"Resultado intermedio",enunciado:"15 × 35 = 525 €. Se aplica un descuento total de 60 €.",
      pregunta:"¿Cuál es el coste después del descuento?",
      respuestaCorrecta:"b",explicacion:"525 − 60 = 465 €.",
      opciones:[opcion("a","485 €"),opcion("b","465 €"),opcion("c","585 €")]
    })
  ])}),
  Object.freeze({id:"familia-calcular-final",variantes:Object.freeze([
    variante({
      id:"test-final-biblioteca",bloqueId:"calcular",conceptoId:"resultado-final",
      titulo:"Resultado final",enunciado:"Quedan 490 libros para repartir entre 10 estanterías.",
      pregunta:"¿Cuántos libros van en cada una?",
      respuestaCorrecta:"a",explicacion:"490 ÷ 10 = 49.",
      opciones:[opcion("a","49"),opcion("b","50"),opcion("c","59")]
    }),
    variante({
      id:"test-final-basket",bloqueId:"calcular",conceptoId:"resultado-final",
      titulo:"Resultado final",enunciado:"Después del descuento quedan 465 € y se pagan en 3 cuotas.",
      pregunta:"¿Cuánto vale cada cuota?",
      respuestaCorrecta:"c",explicacion:"465 ÷ 3 = 155 €.",
      opciones:[opcion("a","145 €"),opcion("b","165 €"),opcion("c","155 €")]
    })
  ])}),
  Object.freeze({id:"familia-comprobar-unidad",variantes:Object.freeze([
    variante({
      id:"test-unidad-basket",bloqueId:"comprobar",conceptoId:"respuesta-con-unidad",
      titulo:"Respuesta completa",enunciado:"El cálculo final del problema del equipo da 155.",
      pregunta:"¿Cuál expresa mejor la respuesta?",
      respuestaCorrecta:"b",explicacion:"La pregunta pide el valor de cada cuota mensual.",
      opciones:[opcion("a","155 jugadores"),opcion("b","155 € por cuota mensual"),opcion("c","155 equipaciones")]
    }),
    variante({
      id:"test-unidad-agricultor",bloqueId:"comprobar",conceptoId:"respuesta-con-unidad",
      titulo:"Respuesta completa",enunciado:"La venta de todas las bolsas produce 576.",
      pregunta:"¿Qué respuesta tiene la unidad correcta?",
      respuestaCorrecta:"a",explicacion:"La pregunta pide dinero obtenido, por eso la unidad es euros.",
      opciones:[opcion("a","576 €"),opcion("b","576 kg"),opcion("c","576 bolsas")]
    })
  ])}),
  Object.freeze({id:"familia-comprobar-sentido",variantes:Object.freeze([
    variante({
      id:"test-sentido-biblio",bloqueId:"comprobar",conceptoId:"comprobar-sentido",
      titulo:"¿Tiene sentido?",enunciado:"Después de retirar 50 libros de 540, alguien obtiene 590 libros para repartir.",
      pregunta:"¿Qué indica esta comprobación?",
      respuestaCorrecta:"c",explicacion:"Al retirar libros el total debe disminuir, no aumentar.",
      opciones:[opcion("a","El resultado es correcto"),opcion("b","Faltó multiplicar por 10"),opcion("c","Hay un error: retirar 50 debe reducir el total")]
    }),
    variante({
      id:"test-sentido-cuotas",bloqueId:"comprobar",conceptoId:"comprobar-sentido",
      titulo:"¿Tiene sentido?",enunciado:"El coste final es 465 € y se divide en 3 cuotas iguales. Alguien escribe 465 € por cuota.",
      pregunta:"¿Qué ocurre?",
      respuestaCorrecta:"b",explicacion:"Cada cuota debe ser menor que el total porque el total se reparte entre tres.",
      opciones:[opcion("a","Es correcto porque hay 3 cuotas"),opcion("b","Es incorrecto: faltó dividir entre 3"),opcion("c","Es incorrecto: había que sumar 3")]
    })
  ])})
]);

export const SOLUCIONES_FUENTE = Object.freeze({
  biblioteca:Object.freeze({
    recibido:540,
    paraRepartir:490,
    porEstanteria:49
  }),
  baloncesto:Object.freeze({
    antesDescuento:525,
    despuesDescuento:465,
    cuota:155
  }),
  agricultor:Object.freeze({
    cosechaTotal:800,
    paraVender:720,
    bolsas:144,
    dinero:576
  })
});
