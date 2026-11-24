// Issue #271 · redacción original, cotejada con las 18 soluciones del repaso escolar.
export const BLOQUES_REPASO = Object.freeze([
  {
    "id": "impuestos",
    "titulo": "Impuestos",
    "icono": "🏛️",
    "ruta": "../impuestos/",
    "cantidad": 6
  },
  {
    "id": "dinero",
    "titulo": "Dinero, ahorro e inversión",
    "icono": "🪙",
    "ruta": "../dinero-ahorro-inversion/",
    "cantidad": 9
  },
  {
    "id": "publicidad",
    "titulo": "Publicidad",
    "icono": "📣",
    "ruta": "../publicidad/",
    "cantidad": 3
  }
]);
export const PREGUNTAS_REPASO = Object.freeze([
  {
    "id": "S01",
    "bloqueId": "impuestos",
    "titulo": "Las primeras leyes",
    "enunciado": "Los impuestos tienen una historia muy larga.",
    "pregunta": "Según el repaso del colegio, ¿dónde surgieron leyes sobre impuestos hace más de 5.000 años?",
    "opciones": [
      {
        "id": "a",
        "texto": "En Grecia, Roma y Macedonia."
      },
      {
        "id": "b",
        "texto": "En Mesopotamia, Egipto y China."
      },
      {
        "id": "c",
        "texto": "En los reinos europeos de la Edad Media."
      },
      {
        "id": "d",
        "texto": "En las ciudades industriales del siglo XIX."
      }
    ],
    "respuestaCorrecta": "b",
    "pista": "Piensa en civilizaciones antiguas de Oriente y del valle del Nilo.",
    "explicacion": "El repaso sitúa esas primeras leyes en Mesopotamia, Egipto y China. Los impuestos existían mucho antes de nuestra época.",
    "ayudaError": "Busca la opción que reúne las tres civilizaciones del repaso; no una etapa más reciente.",
    "fuentePaginas": [
      3,
      4
    ]
  },
  {
    "id": "S02",
    "bloqueId": "impuestos",
    "titulo": "El recorrido del IVA",
    "enunciado": "En una tienda, el cliente paga un producto cuyo precio incluye IVA.",
    "pregunta": "¿Quién cobra ese IVA al cliente y después debe ingresarlo a la administración?",
    "opciones": [
      {
        "id": "a",
        "texto": "El banco que custodia la cuenta del cliente."
      },
      {
        "id": "b",
        "texto": "El cliente, pagando otra vez el mismo IVA."
      },
      {
        "id": "c",
        "texto": "La persona que transporta el producto."
      },
      {
        "id": "d",
        "texto": "El vendedor que realiza la venta."
      }
    ],
    "respuestaCorrecta": "d",
    "pista": "Separa dos acciones: cobrar en la tienda y recibir el impuesto en la administración.",
    "explicacion": "El vendedor cobra el IVA al cliente y debe ingresarlo a la administración. No es un dinero extra que pueda quedarse como beneficio.",
    "ayudaError": "Distingue quién cobra al vender de quién recibe finalmente el impuesto.",
    "fuentePaginas": [
      5,
      6
    ]
  },
  {
    "id": "S03",
    "bloqueId": "impuestos",
    "titulo": "Comprendo una sigla",
    "enunciado": "Las letras IRPF resumen el nombre de un impuesto.",
    "pregunta": "¿Qué significa IRPF?",
    "opciones": [
      {
        "id": "a",
        "texto": "Impuesto sobre la Renta de las Personas Físicas."
      },
      {
        "id": "b",
        "texto": "Impuesto sobre el Registro de Productos Fabricados."
      },
      {
        "id": "c",
        "texto": "Índice de Recursos Públicos de las Familias."
      },
      {
        "id": "d",
        "texto": "Impuesto sobre los Recibos de los Pagos Fijos."
      }
    ],
    "respuestaCorrecta": "a",
    "pista": "Recuerda que este impuesto se relaciona con la renta de las personas.",
    "explicacion": "IRPF significa Impuesto sobre la Renta de las Personas Físicas. Renta se refiere aquí a ingresos de las personas.",
    "ayudaError": "Relaciona cada letra con el nombre completo, sin confundir renta con productos o recibos.",
    "fuentePaginas": [
      7,
      8
    ]
  },
  {
    "id": "S04",
    "bloqueId": "impuestos",
    "titulo": "Personas físicas",
    "enunciado": "El IRPF utiliza la expresión «personas físicas».",
    "pregunta": "¿A quiénes se refiere?",
    "opciones": [
      {
        "id": "a",
        "texto": "Solo a quienes trabajan haciendo ejercicio físico."
      },
      {
        "id": "b",
        "texto": "A las empresas que venden productos."
      },
      {
        "id": "c",
        "texto": "A personas reales, como familiares y vecinos."
      },
      {
        "id": "d",
        "texto": "Solo a quienes trabajan para el Estado."
      }
    ],
    "respuestaCorrecta": "c",
    "pista": "La palabra «físicas» distingue a las personas de las organizaciones.",
    "explicacion": "Las personas físicas somos personas reales. El concepto no depende de hacer ejercicio ni de una profesión concreta.",
    "ayudaError": "No lo relaciones con una actividad física o un único trabajo: piensa en qué es una persona.",
    "fuentePaginas": [
      9,
      10
    ]
  },
  {
    "id": "S05",
    "bloqueId": "impuestos",
    "titulo": "La campaña de la Renta",
    "enunciado": "El repaso habla de revisar los ingresos y las retenciones en la campaña de la Renta.",
    "pregunta": "¿En qué época habitual del año sitúa esta revisión?",
    "opciones": [
      {
        "id": "a",
        "texto": "En otoño, al comenzar el curso."
      },
      {
        "id": "b",
        "texto": "En primavera."
      },
      {
        "id": "c",
        "texto": "Solo en la última noche del año."
      },
      {
        "id": "d",
        "texto": "Siempre en enero."
      }
    ],
    "respuestaCorrecta": "b",
    "pista": "Piensa en una estación posterior al invierno.",
    "explicacion": "La respuesta escolar es primavera, como referencia habitual de la campaña de la Renta. Esto no significa que todos los impuestos se revisen o paguen entonces.",
    "ayudaError": "La pregunta se refiere a la campaña de la Renta, no al calendario de todos los impuestos.",
    "fuentePaginas": [
      11,
      12
    ]
  },
  {
    "id": "S06",
    "bloqueId": "impuestos",
    "titulo": "Lo que compartimos",
    "enunciado": "Los impuestos permiten financiar servicios que usamos en comunidad.",
    "pregunta": "¿Qué pareja reúne servicios públicos financiados con impuestos?",
    "opciones": [
      {
        "id": "a",
        "texto": "La recogida de basuras y los hospitales públicos."
      },
      {
        "id": "b",
        "texto": "Una tienda de juguetes y un cine comercial."
      },
      {
        "id": "c",
        "texto": "Un gimnasio privado y una tienda de ropa."
      },
      {
        "id": "d",
        "texto": "Una plataforma de series y un restaurante."
      }
    ],
    "respuestaCorrecta": "a",
    "pista": "Busca servicios de la comunidad, no compras personales a empresas.",
    "explicacion": "La recogida de basuras y los hospitales públicos son ejemplos de servicios públicos financiados con impuestos.",
    "ayudaError": "Distingue un servicio público de algo que pagas para comprarlo o contratarlo por tu cuenta.",
    "fuentePaginas": [
      13,
      14
    ]
  },
  {
    "id": "S07",
    "bloqueId": "dinero",
    "titulo": "Planifico mi dinero",
    "enunciado": "Antes de gastar, preparo un presupuesto.",
    "pregunta": "¿Qué es un presupuesto?",
    "opciones": [
      {
        "id": "a",
        "texto": "Una lista que solo cuenta lo que ya he comprado."
      },
      {
        "id": "b",
        "texto": "Una promesa de que mi dinero aumentará."
      },
      {
        "id": "c",
        "texto": "Un plan del dinero disponible y de lo que voy a gastar."
      },
      {
        "id": "d",
        "texto": "El precio de un único producto en una tienda."
      }
    ],
    "respuestaCorrecta": "c",
    "pista": "Un presupuesto mira lo que tengo y lo que pienso hacer después.",
    "explicacion": "Un presupuesto es un plan: organiza el dinero disponible y los gastos previstos. Ayuda a decidir antes de gastar.",
    "ayudaError": "No basta con conocer un precio o recordar compras: busca la opción que permite planificar.",
    "fuentePaginas": [
      15,
      16
    ]
  },
  {
    "id": "S08",
    "bloqueId": "dinero",
    "titulo": "La regla del presupuesto",
    "enunciado": "Estoy decidiendo cómo repartir el dinero del que dispongo.",
    "pregunta": "¿Qué regla destaca el repaso?",
    "opciones": [
      {
        "id": "a",
        "texto": "Gastar primero y revisar después lo que queda."
      },
      {
        "id": "b",
        "texto": "Contar siempre con un préstamo para cualquier gasto."
      },
      {
        "id": "c",
        "texto": "Gastar todo para que el presupuesto esté completo."
      },
      {
        "id": "d",
        "texto": "No gastar más dinero del que tengo."
      }
    ],
    "respuestaCorrecta": "d",
    "pista": "Compara el dinero disponible con el que saldría al pagar.",
    "explicacion": "La regla escolar es no gastar más de lo que tienes. El presupuesto ayuda a ajustar los gastos al dinero disponible.",
    "ayudaError": "Un plan necesita respetar el límite del dinero disponible, no suponer que aparecerá dinero extra.",
    "fuentePaginas": [
      17,
      18
    ]
  },
  {
    "id": "S09",
    "bloqueId": "dinero",
    "titulo": "Reconozco el efectivo",
    "enunciado": "Podemos utilizar distintas formas de dinero y de pago.",
    "pregunta": "¿Cuál de estas opciones es dinero en efectivo?",
    "opciones": [
      {
        "id": "a",
        "texto": "Una tarjeta bancaria."
      },
      {
        "id": "b",
        "texto": "Los billetes y las monedas."
      },
      {
        "id": "c",
        "texto": "Una transferencia bancaria."
      },
      {
        "id": "d",
        "texto": "Una aplicación de pago móvil."
      }
    ],
    "respuestaCorrecta": "b",
    "pista": "Piensa en el dinero que puedes contar y entregar directamente con la mano.",
    "explicacion": "Los billetes y las monedas son dinero en efectivo. Las tarjetas y las transferencias son otros medios de pago.",
    "ayudaError": "Distingue el dinero físico de los medios que permiten mover dinero de una cuenta.",
    "fuentePaginas": [
      19,
      20
    ]
  },
  {
    "id": "S10",
    "bloqueId": "dinero",
    "titulo": "Pago con tarjeta",
    "enunciado": "En el ejemplo del repaso, una compra se paga con una tarjeta vinculada a una cuenta bancaria.",
    "pregunta": "¿Qué sucede con el importe de esa compra?",
    "opciones": [
      {
        "id": "a",
        "texto": "La tarjeta crea ese dinero sin usar la cuenta."
      },
      {
        "id": "b",
        "texto": "El vendedor entrega el mismo importe como regalo."
      },
      {
        "id": "c",
        "texto": "El importe se carga a la cuenta bancaria."
      },
      {
        "id": "d",
        "texto": "El importe queda sin pagar porque no se usan monedas."
      }
    ],
    "respuestaCorrecta": "c",
    "pista": "Que no entregues billetes no significa que la compra sea gratuita.",
    "explicacion": "El importe se carga en la cuenta bancaria. La tarjeta permite pagar sin entregar efectivo, pero se utiliza dinero.",
    "ayudaError": "Busca de dónde sale el dinero: pagar con tarjeta también supone un pago.",
    "fuentePaginas": [
      21,
      22
    ]
  },
  {
    "id": "S11",
    "bloqueId": "dinero",
    "titulo": "Ingresos mayores que gastos",
    "enunciado": "En mi presupuesto entra más dinero del que sale.",
    "pregunta": "¿Qué ocurre en esta situación?",
    "opciones": [
      {
        "id": "a",
        "texto": "Puede sobrar dinero que puedo apartar para ahorrar."
      },
      {
        "id": "b",
        "texto": "He gastado más de lo que ingresé."
      },
      {
        "id": "c",
        "texto": "Tengo que pedir prestado necesariamente."
      },
      {
        "id": "d",
        "texto": "Los ingresos y los gastos son exactamente iguales."
      }
    ],
    "respuestaCorrecta": "a",
    "pista": "Si entra más de lo que sale, ¿queda una parte disponible?",
    "explicacion": "Cuando los ingresos superan los gastos, queda una diferencia disponible. Se puede destinar parte de ella al ahorro.",
    "ayudaError": "Relee «entra más de lo que sale»: no es la misma situación que gastar de más o quedar a cero.",
    "fuentePaginas": [
      23,
      24
    ]
  },
  {
    "id": "S12",
    "bloqueId": "dinero",
    "titulo": "Gastos mayores que ingresos",
    "enunciado": "En mi presupuesto sale más dinero del que entra.",
    "pregunta": "¿Qué propone el repaso para ajustar esta situación?",
    "opciones": [
      {
        "id": "a",
        "texto": "Continuar gastando igual, sin revisar nada."
      },
      {
        "id": "b",
        "texto": "Suponer que el banco aumentará el saldo."
      },
      {
        "id": "c",
        "texto": "Añadir primero compras que no necesito."
      },
      {
        "id": "d",
        "texto": "Reducir gastos y prescindir de los innecesarios."
      }
    ],
    "respuestaCorrecta": "d",
    "pista": "Busca una decisión que reduzca el dinero que sale.",
    "explicacion": "Si los gastos superan los ingresos, conviene revisar el presupuesto y reducir gastos innecesarios para ajustarlo.",
    "ayudaError": "Compara las opciones: ¿cuál ayuda realmente a que salga menos dinero?",
    "fuentePaginas": [
      25,
      26
    ]
  },
  {
    "id": "S13",
    "bloqueId": "dinero",
    "titulo": "Los bancos y los depósitos",
    "enunciado": "Las personas pueden depositar sus ahorros en un banco.",
    "pregunta": "¿Qué función de los bancos explica el repaso?",
    "opciones": [
      {
        "id": "a",
        "texto": "Devuelven cada depósito convertido en un regalo."
      },
      {
        "id": "b",
        "texto": "Prestan parte del dinero a empresas o personas que necesitan financiación."
      },
      {
        "id": "c",
        "texto": "Guardan todo el dinero sin que pueda tener ningún otro uso."
      },
      {
        "id": "d",
        "texto": "Transforman automáticamente cada depósito en una compra."
      }
    ],
    "respuestaCorrecta": "b",
    "pista": "Piensa cómo puede recibir financiación alguien que necesita dinero.",
    "explicacion": "Los bancos conceden préstamos a empresas y particulares. Parte del dinero recibido en depósitos contribuye a esa actividad; no significa que se preste íntegramente cada euro depositado.",
    "ayudaError": "Busca la opción que relaciona el banco con la financiación, sin afirmar que todo el dinero queda inmóvil.",
    "fuentePaginas": [
      27,
      28
    ]
  },
  {
    "id": "S14",
    "bloqueId": "dinero",
    "titulo": "Ahorro e inversión",
    "enunciado": "Ahorrar e invertir no significan lo mismo.",
    "pregunta": "¿Qué característica de la inversión destaca el repaso?",
    "opciones": [
      {
        "id": "a",
        "texto": "Siempre devuelve el doble del dinero."
      },
      {
        "id": "b",
        "texto": "No puede producir ninguna pérdida."
      },
      {
        "id": "c",
        "texto": "Existe riesgo y el beneficio no está garantizado."
      },
      {
        "id": "d",
        "texto": "Garantiza un beneficio solo por esperar."
      }
    ],
    "respuestaCorrecta": "c",
    "pista": "Fíjate en las opciones que prometen seguridad absoluta.",
    "explicacion": "En una inversión se intenta obtener un beneficio, pero existe riesgo: se puede perder dinero y el beneficio no está garantizado.",
    "ayudaError": "Una promesa de ganancia segura no explica la característica de la inversión que se pregunta.",
    "fuentePaginas": [
      29,
      30
    ]
  },
  {
    "id": "S15",
    "bloqueId": "dinero",
    "titulo": "Qué significa invertir",
    "enunciado": "Una persona decide dedicar una parte de su dinero a una inversión.",
    "pregunta": "¿Qué está intentando hacer?",
    "opciones": [
      {
        "id": "a",
        "texto": "Destinar dinero para intentar conseguir un beneficio."
      },
      {
        "id": "b",
        "texto": "Guardar billetes sin destinarlos a ninguna actividad."
      },
      {
        "id": "c",
        "texto": "Pagar únicamente los gastos cotidianos."
      },
      {
        "id": "d",
        "texto": "Entregar un impuesto obligatorio al Estado."
      }
    ],
    "respuestaCorrecta": "a",
    "pista": "Distingue guardar dinero de destinarlo a algo buscando un resultado.",
    "explicacion": "Invertir es destinar parte del dinero para intentar obtener un beneficio. «Intentar» es importante: ese beneficio puede no llegar.",
    "ayudaError": "Identifica la finalidad: buscar un beneficio, sin confundirlo con ahorrar o pagar un gasto.",
    "fuentePaginas": [
      31,
      32
    ]
  },
  {
    "id": "S16",
    "bloqueId": "publicidad",
    "titulo": "Más que vender",
    "enunciado": "La publicidad también puede tener una función distinta de aumentar las ventas.",
    "pregunta": "¿Cuál es esa función?",
    "opciones": [
      {
        "id": "a",
        "texto": "Sustituir los servicios públicos."
      },
      {
        "id": "b",
        "texto": "Cobrar directamente los impuestos."
      },
      {
        "id": "c",
        "texto": "Decidir el saldo de una cuenta bancaria."
      },
      {
        "id": "d",
        "texto": "Informar o educar sobre comportamientos beneficiosos."
      }
    ],
    "respuestaCorrecta": "d",
    "pista": "Piensa en una campaña que anima a cuidar un espacio común.",
    "explicacion": "La publicidad puede informar y educar: por ejemplo, una campaña que invita a no tirar basura. No toda publicidad busca vender un producto.",
    "ayudaError": "Busca para qué comunica una campaña, no otras actividades de empresas o instituciones.",
    "fuentePaginas": [
      33,
      34
    ]
  },
  {
    "id": "S17",
    "bloqueId": "publicidad",
    "titulo": "Quién comunica",
    "enunciado": "Un anuncio transmite una idea a un público.",
    "pregunta": "¿Quién es el emisor del mensaje publicitario?",
    "opciones": [
      {
        "id": "a",
        "texto": "El público al que va dirigido el anuncio."
      },
      {
        "id": "b",
        "texto": "La empresa o institución que lo comunica."
      },
      {
        "id": "c",
        "texto": "La frase breve que aparece en el anuncio."
      },
      {
        "id": "d",
        "texto": "El canal utilizado para difundir el anuncio."
      }
    ],
    "respuestaCorrecta": "b",
    "pista": "Distingue quién habla, quién recibe y por dónde llega el mensaje.",
    "explicacion": "El emisor es la empresa o institución que comunica. El destinatario recibe el mensaje; el medio lo difunde y el eslogan es una frase del anuncio.",
    "ayudaError": "Revisa qué papel tiene cada elemento: la pregunta pide quién comunica.",
    "fuentePaginas": [
      35,
      36
    ]
  },
  {
    "id": "S18",
    "bloqueId": "publicidad",
    "titulo": "Una frase que se recuerda",
    "enunciado": "Un anuncio puede resumir su idea en un eslogan.",
    "pregunta": "¿Qué es un eslogan?",
    "opciones": [
      {
        "id": "a",
        "texto": "Una lista completa de precios y condiciones."
      },
      {
        "id": "b",
        "texto": "El lugar donde se coloca un cartel."
      },
      {
        "id": "c",
        "texto": "Una frase breve y fácil de recordar que resume la idea."
      },
      {
        "id": "d",
        "texto": "El nombre de todas las personas que ven el anuncio."
      }
    ],
    "respuestaCorrecta": "c",
    "pista": "Piensa en algo que puedes recordar y repetir después de ver el anuncio.",
    "explicacion": "El eslogan es una frase breve y fácil de recordar que resume la idea o el producto anunciado. Forma parte del mensaje.",
    "ayudaError": "Distingue una frase que resume una idea de un precio, un lugar o un público.",
    "fuentePaginas": [
      37,
      38
    ]
  }
]);
