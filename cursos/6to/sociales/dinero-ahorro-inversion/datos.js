export const META = Object.freeze({
  "actividadId": "6-sociales-dinero-ahorro-inversion",
  "tituloActividad": "El dinero, el ahorro y la inversión",
  "version": "1.0",
  "cursoReferencia": "6.º de Primaria",
  "materia": "Sociales",
  "tema": "El dinero, el ahorro y la inversión",
  "cierreFirmes": "hoy conectaste las ideas de El dinero, el ahorro y la inversión."
});

export const BLOQUES_RESULTADO = Object.freeze([
  {
    "id": "pagos",
    "icono": "💳",
    "titulo": "Dinero y pagos",
    "descripcion": "Distinguir efectivo, tarjeta y medios electrónicos."
  },
  {
    "id": "presupuesto",
    "icono": "⚖️",
    "titulo": "Ingresos y presupuesto",
    "descripcion": "Comparar entradas/salidas y las tres situaciones."
  },
  {
    "id": "ahorro",
    "icono": "🫙",
    "titulo": "Ahorrar para después",
    "descripcion": "Reconocer reserva, margen y objetivos futuros."
  },
  {
    "id": "inversion",
    "icono": "🌱",
    "titulo": "Inversión y riesgo",
    "descripcion": "Distinguir inversor, beneficio posible y pérdidas."
  }
]);

export const PRACTICA = Object.freeze([
  {
    "conceptoId": "medio-pago",
    "enunciado": "Cambias dinero por un libro en una tienda.",
    "pregunta": "¿Qué facilita el dinero?",
    "explicacion": "El dinero es un medio de pago aceptado que facilita intercambios.",
    "pista": "Piensa en para qué sirve al comprar.",
    "id": "dinero-ahorro-inversion-practica-1",
    "bloqueId": "pagos",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Dinero y efectivo",
    "opciones": [
      {
        "id": "0",
        "texto": "El intercambio de productos y servicios"
      },
      {
        "id": "1",
        "texto": "Garantizar beneficios de inversión"
      },
      {
        "id": "2",
        "texto": "Crear un eslogan"
      }
    ],
    "respuestaCorrecta": "0"
  },
  {
    "conceptoId": "tarjeta",
    "enunciado": "Pagas con una tarjeta bancaria y el importe se carga en la cuenta donde tienes dinero.",
    "pregunta": "¿De dónde sale el dinero según el ejemplo escolar?",
    "explicacion": "La tarjeta permite cargar el importe de la compra a la cuenta del banco; no crea dinero.",
    "pista": "La tarjeta da acceso al dinero de una cuenta.",
    "id": "dinero-ahorro-inversion-practica-2",
    "bloqueId": "pagos",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Tarjeta y pago electrónico",
    "opciones": [
      {
        "id": "0",
        "texto": "De un regalo de la tienda"
      },
      {
        "id": "1",
        "texto": "De dinero que crea la tarjeta"
      },
      {
        "id": "2",
        "texto": "De la cuenta del banco"
      }
    ],
    "respuestaCorrecta": "2"
  },
  {
    "conceptoId": "entradas-salidas",
    "enunciado": "Recibes 10 € de paga y entregas 3 € por un helado.",
    "pregunta": "¿Qué son los 10 € que recibes?",
    "explicacion": "Los ingresos son el dinero que recibes; los gastos son el dinero que entregas al comprar.",
    "pista": "Distingue entrada de salida de dinero.",
    "id": "dinero-ahorro-inversion-practica-3",
    "bloqueId": "presupuesto",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Ingresos y gastos",
    "opciones": [
      {
        "id": "0",
        "texto": "Pérdidas de inversión"
      },
      {
        "id": "1",
        "texto": "Ingresos"
      },
      {
        "id": "2",
        "texto": "Gastos"
      }
    ],
    "respuestaCorrecta": "1"
  },
  {
    "conceptoId": "igualdad",
    "enunciado": "Tienes 10 € de ingresos y 10 € de gastos.",
    "pregunta": "¿Qué situación hay?",
    "explicacion": "10 − 10 = 0. Las cuentas encajan, pero con ese presupuesto no queda margen para un imprevisto.",
    "pista": "Compara ambos números y calcula la diferencia.",
    "id": "dinero-ahorro-inversion-practica-4",
    "bloqueId": "presupuesto",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Comparo las cantidades",
    "opciones": [
      {
        "id": "0",
        "texto": "Ingresos mayores que gastos"
      },
      {
        "id": "1",
        "texto": "Ingresos iguales a gastos: no queda margen de ese dinero"
      },
      {
        "id": "2",
        "texto": "Ingresos menores que gastos"
      }
    ],
    "respuestaCorrecta": "1"
  },
  {
    "conceptoId": "definicion-ahorro",
    "enunciado": "De lo que recibes, guardas una parte para necesitarla más adelante.",
    "pregunta": "¿Qué estás haciendo?",
    "explicacion": "Ahorrar es guardar parte de los ingresos para necesidades futuras.",
    "pista": "La idea clave es reservar para después.",
    "id": "dinero-ahorro-inversion-practica-5",
    "bloqueId": "ahorro",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Guardar para después",
    "opciones": [
      {
        "id": "0",
        "texto": "Pagando IVA"
      },
      {
        "id": "1",
        "texto": "Prometiendo un beneficio"
      },
      {
        "id": "2",
        "texto": "Ahorrando"
      }
    ],
    "respuestaCorrecta": "2"
  },
  {
    "conceptoId": "superiores",
    "enunciado": "Tus ingresos son 12 € y tus gastos son 8 €.",
    "pregunta": "¿Qué podrías hacer con la diferencia de este presupuesto?",
    "explicacion": "12 − 8 = 4. Si los ingresos superan los gastos, puede reservarse una parte.",
    "pista": "Resta los gastos a los ingresos.",
    "id": "dinero-ahorro-inversion-practica-6",
    "bloqueId": "ahorro",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Margen y ahorro",
    "opciones": [
      {
        "id": "0",
        "texto": "Decir que faltan 4 €"
      },
      {
        "id": "1",
        "texto": "Reservar 4 € para el ahorro"
      },
      {
        "id": "2",
        "texto": "Guardar 12 € sin pagar los gastos"
      }
    ],
    "respuestaCorrecta": "1"
  },
  {
    "conceptoId": "definicion-inversion",
    "enunciado": "Una persona destina parte de sus ingresos a intentar conseguir un beneficio.",
    "pregunta": "¿Qué está haciendo?",
    "explicacion": "Invertir es destinar ingresos para intentar obtener un beneficio.",
    "pista": "El objetivo es intentar conseguir un beneficio.",
    "id": "dinero-ahorro-inversion-practica-7",
    "bloqueId": "inversion",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Inversión e inversor",
    "opciones": [
      {
        "id": "0",
        "texto": "Invirtiendo"
      },
      {
        "id": "1",
        "texto": "Guardando sin buscar un beneficio"
      },
      {
        "id": "2",
        "texto": "Preparando un eslogan"
      }
    ],
    "respuestaCorrecta": "0"
  },
  {
    "conceptoId": "riesgo",
    "enunciado": "Una inversión intenta conseguir un beneficio.",
    "pregunta": "¿Está asegurado que se gane dinero?",
    "explicacion": "El riesgo caracteriza a la inversión: el beneficio no está asegurado.",
    "pista": "Intentar obtener un beneficio no equivale a garantizarlo.",
    "id": "dinero-ahorro-inversion-practica-8",
    "bloqueId": "inversion",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "El riesgo importa",
    "opciones": [
      {
        "id": "0",
        "texto": "No; puede no ganarse nada e incluso perderse todo"
      },
      {
        "id": "1",
        "texto": "Solo si alguien lo promete en un anuncio"
      },
      {
        "id": "2",
        "texto": "Sí, en todas las inversiones"
      }
    ],
    "respuestaCorrecta": "0"
  }
]);

export const FAMILIAS_PRUEBA = Object.freeze([
  {
    "id": "dinero-ahorro-inversion-familia-1",
    "bloqueId": "pagos",
    "variantes": [
      {
        "conceptoId": "medio-pago",
        "enunciado": "Cambias dinero por un libro en una tienda.",
        "pregunta": "¿Qué facilita el dinero?",
        "explicacion": "El dinero es un medio de pago aceptado que facilita intercambios.",
        "pista": "Piensa en para qué sirve al comprar.",
        "id": "dinero-ahorro-inversion-medio-pago-1-1",
        "bloqueId": "pagos",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Dinero y efectivo",
        "opciones": [
          {
            "id": "0",
            "texto": "El intercambio de productos y servicios"
          },
          {
            "id": "1",
            "texto": "Garantizar beneficios de inversión"
          },
          {
            "id": "2",
            "texto": "Crear un eslogan"
          }
        ],
        "respuestaCorrecta": "0"
      },
      {
        "conceptoId": "efectivo",
        "enunciado": "Pagas una compra con monedas y un billete.",
        "pregunta": "¿Qué medio utilizas?",
        "explicacion": "El efectivo está formado por billetes y monedas.",
        "pista": "Observa qué tienes físicamente en la mano.",
        "id": "dinero-ahorro-inversion-efectivo-1-2",
        "bloqueId": "pagos",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Dinero y efectivo",
        "opciones": [
          {
            "id": "0",
            "texto": "Dinero efectivo"
          },
          {
            "id": "1",
            "texto": "Solo un presupuesto"
          },
          {
            "id": "2",
            "texto": "Una tarjeta bancaria"
          }
        ],
        "respuestaCorrecta": "0"
      }
    ]
  },
  {
    "id": "dinero-ahorro-inversion-familia-2",
    "bloqueId": "pagos",
    "variantes": [
      {
        "conceptoId": "tarjeta",
        "enunciado": "Pagas con una tarjeta bancaria y el importe se carga en la cuenta donde tienes dinero.",
        "pregunta": "¿De dónde sale el dinero según el ejemplo escolar?",
        "explicacion": "La tarjeta permite cargar el importe de la compra a la cuenta del banco; no crea dinero.",
        "pista": "La tarjeta da acceso al dinero de una cuenta.",
        "id": "dinero-ahorro-inversion-tarjeta-2-1",
        "bloqueId": "pagos",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Tarjeta y pago electrónico",
        "opciones": [
          {
            "id": "0",
            "texto": "De un regalo de la tienda"
          },
          {
            "id": "1",
            "texto": "De dinero que crea la tarjeta"
          },
          {
            "id": "2",
            "texto": "De la cuenta del banco"
          }
        ],
        "respuestaCorrecta": "2"
      },
      {
        "conceptoId": "electronico",
        "enunciado": "Una persona utiliza un medio de pago de Internet para comprar un servicio.",
        "pregunta": "¿Qué tipo de pago describe?",
        "explicacion": "Los medios de pago electrónico pueden utilizarse en Internet.",
        "pista": "Fíjate en el uso de tecnología para pagar.",
        "id": "dinero-ahorro-inversion-electronico-2-2",
        "bloqueId": "pagos",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Tarjeta y pago electrónico",
        "opciones": [
          {
            "id": "0",
            "texto": "Un eslogan"
          },
          {
            "id": "1",
            "texto": "Efectivo en monedas"
          },
          {
            "id": "2",
            "texto": "Un medio de pago electrónico"
          }
        ],
        "respuestaCorrecta": "2"
      }
    ]
  },
  {
    "id": "dinero-ahorro-inversion-familia-3",
    "bloqueId": "presupuesto",
    "variantes": [
      {
        "conceptoId": "entradas-salidas",
        "enunciado": "Recibes 10 € de paga y entregas 3 € por un helado.",
        "pregunta": "¿Qué son los 10 € que recibes?",
        "explicacion": "Los ingresos son el dinero que recibes; los gastos son el dinero que entregas al comprar.",
        "pista": "Distingue entrada de salida de dinero.",
        "id": "dinero-ahorro-inversion-entradas-salidas-3-1",
        "bloqueId": "presupuesto",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Ingresos y gastos",
        "opciones": [
          {
            "id": "0",
            "texto": "Pérdidas de inversión"
          },
          {
            "id": "1",
            "texto": "Ingresos"
          },
          {
            "id": "2",
            "texto": "Gastos"
          }
        ],
        "respuestaCorrecta": "1"
      },
      {
        "conceptoId": "presupuesto-plan",
        "enunciado": "Antes de comprar, anotas cuánto dinero recibes y cuánto necesitas gastar.",
        "pregunta": "¿Qué estás preparando?",
        "explicacion": "El presupuesto permite planear los gastos a partir del dinero con el que cuentas.",
        "pista": "Es un plan de ingresos y gastos.",
        "id": "dinero-ahorro-inversion-presupuesto-plan-3-2",
        "bloqueId": "presupuesto",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Ingresos y gastos",
        "opciones": [
          {
            "id": "0",
            "texto": "Un anuncio"
          },
          {
            "id": "1",
            "texto": "Un presupuesto"
          },
          {
            "id": "2",
            "texto": "Un impuesto"
          }
        ],
        "respuestaCorrecta": "1"
      }
    ]
  },
  {
    "id": "dinero-ahorro-inversion-familia-4",
    "bloqueId": "presupuesto",
    "variantes": [
      {
        "conceptoId": "igualdad",
        "enunciado": "Tienes 10 € de ingresos y 10 € de gastos.",
        "pregunta": "¿Qué situación hay?",
        "explicacion": "10 − 10 = 0. Las cuentas encajan, pero con ese presupuesto no queda margen para un imprevisto.",
        "pista": "Compara ambos números y calcula la diferencia.",
        "id": "dinero-ahorro-inversion-igualdad-4-1",
        "bloqueId": "presupuesto",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Comparo las cantidades",
        "opciones": [
          {
            "id": "0",
            "texto": "Ingresos mayores que gastos"
          },
          {
            "id": "1",
            "texto": "Ingresos iguales a gastos: no queda margen de ese dinero"
          },
          {
            "id": "2",
            "texto": "Ingresos menores que gastos"
          }
        ],
        "respuestaCorrecta": "1"
      },
      {
        "conceptoId": "diferencias",
        "enunciado": "Tienes 8 € de ingresos y quieres gastar 12 €.",
        "pregunta": "¿Qué muestra el presupuesto?",
        "explicacion": "12 € de gastos son más que los 8 € disponibles: faltan 4 € para ese plan.",
        "pista": "No se puede cubrir 12 con solo 8.",
        "id": "dinero-ahorro-inversion-diferencias-4-2",
        "bloqueId": "presupuesto",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Comparo las cantidades",
        "opciones": [
          {
            "id": "0",
            "texto": "Los gastos superan los ingresos en 4 €"
          },
          {
            "id": "1",
            "texto": "Ingresos y gastos son iguales"
          },
          {
            "id": "2",
            "texto": "Sobran 4 € para ahorrar"
          }
        ],
        "respuestaCorrecta": "0"
      }
    ]
  },
  {
    "id": "dinero-ahorro-inversion-familia-5",
    "bloqueId": "ahorro",
    "variantes": [
      {
        "conceptoId": "definicion-ahorro",
        "enunciado": "De lo que recibes, guardas una parte para necesitarla más adelante.",
        "pregunta": "¿Qué estás haciendo?",
        "explicacion": "Ahorrar es guardar parte de los ingresos para necesidades futuras.",
        "pista": "La idea clave es reservar para después.",
        "id": "dinero-ahorro-inversion-definicion-ahorro-5-1",
        "bloqueId": "ahorro",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Guardar para después",
        "opciones": [
          {
            "id": "0",
            "texto": "Pagando IVA"
          },
          {
            "id": "1",
            "texto": "Prometiendo un beneficio"
          },
          {
            "id": "2",
            "texto": "Ahorrando"
          }
        ],
        "respuestaCorrecta": "2"
      },
      {
        "conceptoId": "objetivo-ahorro",
        "enunciado": "Guardas dinero para un viaje que quieres hacer en el futuro.",
        "pregunta": "¿Qué finalidad tiene ese ahorro?",
        "explicacion": "El material presenta el ahorro como una reserva para objetivos o necesidades futuras.",
        "pista": "Piensa en cuándo vas a utilizar lo guardado.",
        "id": "dinero-ahorro-inversion-objetivo-ahorro-5-2",
        "bloqueId": "ahorro",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Guardar para después",
        "opciones": [
          {
            "id": "0",
            "texto": "Gastar todo ahora"
          },
          {
            "id": "1",
            "texto": "Atender una necesidad o un objetivo futuro"
          },
          {
            "id": "2",
            "texto": "Asegurar siempre una ganancia"
          }
        ],
        "respuestaCorrecta": "1"
      }
    ]
  },
  {
    "id": "dinero-ahorro-inversion-familia-6",
    "bloqueId": "ahorro",
    "variantes": [
      {
        "conceptoId": "superiores",
        "enunciado": "Tus ingresos son 12 € y tus gastos son 8 €.",
        "pregunta": "¿Qué podrías hacer con la diferencia de este presupuesto?",
        "explicacion": "12 − 8 = 4. Si los ingresos superan los gastos, puede reservarse una parte.",
        "pista": "Resta los gastos a los ingresos.",
        "id": "dinero-ahorro-inversion-superiores-6-1",
        "bloqueId": "ahorro",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Margen y ahorro",
        "opciones": [
          {
            "id": "0",
            "texto": "Decir que faltan 4 €"
          },
          {
            "id": "1",
            "texto": "Reservar 4 € para el ahorro"
          },
          {
            "id": "2",
            "texto": "Guardar 12 € sin pagar los gastos"
          }
        ],
        "respuestaCorrecta": "1"
      },
      {
        "conceptoId": "bancos",
        "enunciado": "El recuadro del colegio explica que los bancos pueden prestar dinero de los ahorros depositados.",
        "pregunta": "Según esa explicación, ¿permanece todo ese dinero guardado físicamente allí?",
        "explicacion": "Como curiosidad escolar, el material explica que los bancos pueden prestar dinero depositado; no lo presenta como una recomendación.",
        "pista": "Recuerda la función descrita en el recuadro.",
        "id": "dinero-ahorro-inversion-bancos-6-2",
        "bloqueId": "ahorro",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Margen y ahorro",
        "opciones": [
          {
            "id": "0",
            "texto": "Sí, siempre sin utilizarse"
          },
          {
            "id": "1",
            "texto": "No; el banco puede prestarlo a empresas o particulares"
          },
          {
            "id": "2",
            "texto": "Se convierte automáticamente en un impuesto"
          }
        ],
        "respuestaCorrecta": "1"
      }
    ]
  },
  {
    "id": "dinero-ahorro-inversion-familia-7",
    "bloqueId": "inversion",
    "variantes": [
      {
        "conceptoId": "definicion-inversion",
        "enunciado": "Una persona destina parte de sus ingresos a intentar conseguir un beneficio.",
        "pregunta": "¿Qué está haciendo?",
        "explicacion": "Invertir es destinar ingresos para intentar obtener un beneficio.",
        "pista": "El objetivo es intentar conseguir un beneficio.",
        "id": "dinero-ahorro-inversion-definicion-inversion-7-1",
        "bloqueId": "inversion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Inversión e inversor",
        "opciones": [
          {
            "id": "0",
            "texto": "Invirtiendo"
          },
          {
            "id": "1",
            "texto": "Guardando sin buscar un beneficio"
          },
          {
            "id": "2",
            "texto": "Preparando un eslogan"
          }
        ],
        "respuestaCorrecta": "0"
      },
      {
        "conceptoId": "inversor",
        "enunciado": "Una empresa realiza una actividad de inversión.",
        "pregunta": "¿Cómo se llama quien realiza esa actividad?",
        "explicacion": "La persona o empresa que realiza una inversión se denomina inversor.",
        "pista": "Puede ser una persona o una empresa.",
        "id": "dinero-ahorro-inversion-inversor-7-2",
        "bloqueId": "inversion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Inversión e inversor",
        "opciones": [
          {
            "id": "0",
            "texto": "Inversor"
          },
          {
            "id": "1",
            "texto": "Eslogan"
          },
          {
            "id": "2",
            "texto": "Destinatario"
          }
        ],
        "respuestaCorrecta": "0"
      }
    ]
  },
  {
    "id": "dinero-ahorro-inversion-familia-8",
    "bloqueId": "inversion",
    "variantes": [
      {
        "conceptoId": "riesgo",
        "enunciado": "Una inversión intenta conseguir un beneficio.",
        "pregunta": "¿Está asegurado que se gane dinero?",
        "explicacion": "El riesgo caracteriza a la inversión: el beneficio no está asegurado.",
        "pista": "Intentar obtener un beneficio no equivale a garantizarlo.",
        "id": "dinero-ahorro-inversion-riesgo-8-1",
        "bloqueId": "inversion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "El riesgo importa",
        "opciones": [
          {
            "id": "0",
            "texto": "No; puede no ganarse nada e incluso perderse todo"
          },
          {
            "id": "1",
            "texto": "Solo si alguien lo promete en un anuncio"
          },
          {
            "id": "2",
            "texto": "Sí, en todas las inversiones"
          }
        ],
        "respuestaCorrecta": "0"
      },
      {
        "conceptoId": "ahorrar-invertir",
        "enunciado": "Guardar dinero para una necesidad futura e intentar obtener un beneficio con riesgo son dos acciones.",
        "pregunta": "¿Son lo mismo?",
        "explicacion": "Ahorrar reserva ingresos; invertir intenta un beneficio que puede no llegar y puede implicar pérdidas.",
        "pista": "Compara para qué se destina el dinero y qué puede ocurrir.",
        "id": "dinero-ahorro-inversion-ahorrar-invertir-8-2",
        "bloqueId": "inversion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "El riesgo importa",
        "opciones": [
          {
            "id": "0",
            "texto": "Solo cambia el nombre de las monedas"
          },
          {
            "id": "1",
            "texto": "Sí, siempre significan exactamente lo mismo"
          },
          {
            "id": "2",
            "texto": "No: ahorrar e invertir tienen objetivos y riesgos diferentes"
          }
        ],
        "respuestaCorrecta": "2"
      }
    ]
  }
]);

