export const META = Object.freeze({
  "actividadId": "6-sociales-impuestos",
  "tituloActividad": "Los impuestos",
  "version": "1.0",
  "cursoReferencia": "6.º de Primaria",
  "materia": "Sociales",
  "tema": "Los impuestos",
  "cierreFirmes": "hoy conectaste las ideas de Los impuestos."
});

export const BLOQUES_RESULTADO = Object.freeze([
  {
    "id": "aportaciones",
    "icono": "🏛️",
    "titulo": "Aportaciones al Estado",
    "descripcion": "Relacionar obligatoriedad, personas y actividad económica."
  },
  {
    "id": "servicios",
    "icono": "🏙️",
    "titulo": "Servicios públicos",
    "descripcion": "Conectar el fondo común con los servicios citados."
  },
  {
    "id": "iva",
    "icono": "🧾",
    "titulo": "IVA al comprar",
    "descripcion": "Reconocer el impuesto en el recorrido de una compra."
  },
  {
    "id": "irpf",
    "icono": "👤",
    "titulo": "IRPF y retención",
    "descripcion": "Entender renta, persona física, retención y revisión escolar."
  },
  {
    "id": "otros-tributos",
    "icono": "📜",
    "titulo": "Otros casos y responsabilidad",
    "descripcion": "Reconocer otros tributos e ideas de historia y responsabilidad."
  }
]);

export const PRACTICA = Object.freeze([
  {
    "conceptoId": "definicion",
    "enunciado": "Personas y empresas aportan dinero obligatorio al Estado.",
    "pregunta": "¿Qué describe el material?",
    "explicacion": "Los impuestos son aportaciones obligatorias con las que se contribuye, entre otras finalidades, a los servicios públicos.",
    "pista": "No son regalos voluntarios.",
    "id": "impuestos-practica-1",
    "bloqueId": "aportaciones",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Aportamos al fondo común",
    "opciones": [
      {
        "id": "0",
        "texto": "Los impuestos"
      },
      {
        "id": "1",
        "texto": "Un regalo publicitario"
      },
      {
        "id": "2",
        "texto": "Una inversión sin riesgo"
      }
    ],
    "respuestaCorrecta": "0"
  },
  {
    "conceptoId": "negocios",
    "enunciado": "El material nombra industrias, comercios, bares y empresas de servicios.",
    "pregunta": "¿También aparecen como participantes en las aportaciones?",
    "explicacion": "El colegio explica que personas y empresas contribuyen según lo que obtienen.",
    "pista": "La fuente incluye sueldos y actividades económicas.",
    "id": "impuestos-practica-2",
    "bloqueId": "aportaciones",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Personas y actividad económica",
    "opciones": [
      {
        "id": "0",
        "texto": "No, solo las familias participan"
      },
      {
        "id": "1",
        "texto": "Solo si hacen publicidad"
      },
      {
        "id": "2",
        "texto": "Sí, según los ingresos de su actividad"
      }
    ],
    "respuestaCorrecta": "2"
  },
  {
    "conceptoId": "servicios",
    "enunciado": "Un centro de salud atiende a la población y el servicio de basuras recoge residuos.",
    "pregunta": "¿Qué relación tienen con los impuestos en este Tema?",
    "explicacion": "Hospitales, atención sanitaria y recogida de basuras son servicios citados por el material.",
    "pista": "Busca la relación entre las aportaciones y el cuidado de la ciudad.",
    "id": "impuestos-practica-3",
    "bloqueId": "servicios",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Servicios que compartimos",
    "opciones": [
      {
        "id": "0",
        "texto": "Son eslóganes comerciales"
      },
      {
        "id": "1",
        "texto": "Son ejemplos de servicios públicos que ayudan a financiar"
      },
      {
        "id": "2",
        "texto": "Son formas de pagar una compra por Internet"
      }
    ],
    "respuestaCorrecta": "1"
  },
  {
    "conceptoId": "proteccion",
    "enunciado": "Una aportación al fondo común ayuda a mantener policías y bomberos.",
    "pregunta": "¿Qué servicio representa?",
    "explicacion": "La fuente destaca que policías y bomberos ayudan a proteger y atender peligros.",
    "pista": "Piensa en para qué está un cuerpo de bomberos.",
    "id": "impuestos-practica-4",
    "bloqueId": "servicios",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Protección y educación",
    "opciones": [
      {
        "id": "0",
        "texto": "Protección y atención ante peligros o incendios"
      },
      {
        "id": "1",
        "texto": "Publicidad comercial"
      },
      {
        "id": "2",
        "texto": "Una ganancia de inversión"
      }
    ],
    "respuestaCorrecta": "0"
  },
  {
    "conceptoId": "iva-nombre",
    "enunciado": "El IVA aparece asociado al precio de una compra.",
    "pregunta": "¿Qué significan sus siglas?",
    "explicacion": "IVA significa Impuesto sobre el Valor Añadido.",
    "pista": "Es un impuesto relacionado con la compra de bienes o servicios.",
    "id": "impuestos-practica-5",
    "bloqueId": "iva",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "IVA al comprar",
    "opciones": [
      {
        "id": "0",
        "texto": "Ingresos Variables del Ahorro"
      },
      {
        "id": "1",
        "texto": "Inversión de Vecinos Asociados"
      },
      {
        "id": "2",
        "texto": "Impuesto sobre el Valor Añadido"
      }
    ],
    "respuestaCorrecta": "2"
  },
  {
    "conceptoId": "iva-ejemplo",
    "enunciado": "En un ejemplo para aprender, una compra muestra 10 € antes del impuesto y 2 € de IVA.",
    "pregunta": "¿Cuánto se paga en total en ese ejemplo?",
    "explicacion": "El total del ejemplo es 10 + 2 = 12 €. Son cantidades ilustrativas, no tipos de IVA a aplicar.",
    "pista": "Suma el precio antes del impuesto y el impuesto.",
    "id": "impuestos-practica-6",
    "bloqueId": "iva",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "El precio y el impuesto",
    "opciones": [
      {
        "id": "0",
        "texto": "Solo los 2 €"
      },
      {
        "id": "1",
        "texto": "8 €"
      },
      {
        "id": "2",
        "texto": "12 €"
      }
    ],
    "respuestaCorrecta": "2"
  },
  {
    "conceptoId": "irpf-nombre",
    "enunciado": "IRPF significa Impuesto sobre la Renta de las Personas Físicas.",
    "pregunta": "¿Qué significa «personas físicas»?",
    "explicacion": "En esta expresión, personas físicas son personas, no empresas.",
    "pista": "La palabra «personas» se refiere aquí a individuos.",
    "id": "impuestos-practica-7",
    "bloqueId": "irpf",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Tres palabras para entenderlo",
    "opciones": [
      {
        "id": "0",
        "texto": "Personas de carne y hueso"
      },
      {
        "id": "1",
        "texto": "Solo grandes empresas"
      },
      {
        "id": "2",
        "texto": "Servicios de recogida"
      }
    ],
    "respuestaCorrecta": "0"
  },
  {
    "conceptoId": "retencion",
    "enunciado": "En el ejemplo de un sueldo, una parte se aparta antes de recibir el resto.",
    "pregunta": "¿Cómo se llama esa cantidad apartada?",
    "explicacion": "La fuente llama retención a la parte que se aparta automáticamente del sueldo.",
    "pista": "Se retiene una parte antes de entregar el resto.",
    "id": "impuestos-practica-8",
    "bloqueId": "irpf",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Retención y Renta",
    "opciones": [
      {
        "id": "0",
        "texto": "Retención"
      },
      {
        "id": "1",
        "texto": "Regalo"
      },
      {
        "id": "2",
        "texto": "Eslogan"
      }
    ],
    "respuestaCorrecta": "0"
  },
  {
    "conceptoId": "otros-casos",
    "enunciado": "El colegio menciona viviendas, negocios, herencias y premios de lotería.",
    "pregunta": "¿Por qué aparecen en este Tema?",
    "explicacion": "La fuente menciona otros tributos ligados a posesiones, herencias o premios; no detalla sus reglas.",
    "pista": "Todos los ejemplos aparecen al hablar de otras aportaciones.",
    "id": "impuestos-practica-9",
    "bloqueId": "otros-tributos",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Otros casos de la fuente",
    "opciones": [
      {
        "id": "0",
        "texto": "Como garantía de ahorro"
      },
      {
        "id": "1",
        "texto": "Como ejemplos de otros casos relacionados con tributos"
      },
      {
        "id": "2",
        "texto": "Como medios de difusión"
      }
    ],
    "respuestaCorrecta": "1"
  },
  {
    "conceptoId": "impago",
    "enunciado": "El material explica qué pasaría si nadie aportara y menciona consecuencias del impago.",
    "pregunta": "¿Qué idea principal transmite?",
    "explicacion": "La fuente vincula el funcionamiento de servicios comunes con las aportaciones obligatorias y advierte de sanciones.",
    "pista": "Piensa en mantener lo que comparte la sociedad.",
    "id": "impuestos-practica-10",
    "bloqueId": "otros-tributos",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Responsabilidad compartida",
    "opciones": [
      {
        "id": "0",
        "texto": "Los servicios comunes necesitan aportaciones y existen consecuencias por incumplir"
      },
      {
        "id": "1",
        "texto": "No hay ninguna consecuencia"
      },
      {
        "id": "2",
        "texto": "Todo gasto es una inversión"
      }
    ],
    "respuestaCorrecta": "0"
  }
]);

export const FAMILIAS_PRUEBA = Object.freeze([
  {
    "id": "impuestos-familia-1",
    "bloqueId": "aportaciones",
    "variantes": [
      {
        "conceptoId": "definicion",
        "enunciado": "Personas y empresas aportan dinero obligatorio al Estado.",
        "pregunta": "¿Qué describe el material?",
        "explicacion": "Los impuestos son aportaciones obligatorias con las que se contribuye, entre otras finalidades, a los servicios públicos.",
        "pista": "No son regalos voluntarios.",
        "id": "impuestos-definicion-1-1",
        "bloqueId": "aportaciones",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Aportamos al fondo común",
        "opciones": [
          {
            "id": "0",
            "texto": "Los impuestos"
          },
          {
            "id": "1",
            "texto": "Un regalo publicitario"
          },
          {
            "id": "2",
            "texto": "Una inversión sin riesgo"
          }
        ],
        "respuestaCorrecta": "0"
      },
      {
        "conceptoId": "estado",
        "enunciado": "Las aportaciones de personas y actividades económicas se reúnen para mantener servicios.",
        "pregunta": "¿Quién gestiona ese fondo común en el esquema escolar?",
        "explicacion": "El material explica la aportación al Estado y su uso para sostener servicios públicos.",
        "pista": "Sigue la flecha entre las aportaciones y los servicios.",
        "id": "impuestos-estado-1-2",
        "bloqueId": "aportaciones",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Aportamos al fondo común",
        "opciones": [
          {
            "id": "0",
            "texto": "El Estado"
          },
          {
            "id": "1",
            "texto": "Cada anuncio"
          },
          {
            "id": "2",
            "texto": "Solo una tienda"
          }
        ],
        "respuestaCorrecta": "0"
      }
    ]
  },
  {
    "id": "impuestos-familia-2",
    "bloqueId": "aportaciones",
    "variantes": [
      {
        "conceptoId": "negocios",
        "enunciado": "El material nombra industrias, comercios, bares y empresas de servicios.",
        "pregunta": "¿También aparecen como participantes en las aportaciones?",
        "explicacion": "El colegio explica que personas y empresas contribuyen según lo que obtienen.",
        "pista": "La fuente incluye sueldos y actividades económicas.",
        "id": "impuestos-negocios-2-1",
        "bloqueId": "aportaciones",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Personas y actividad económica",
        "opciones": [
          {
            "id": "0",
            "texto": "No, solo las familias participan"
          },
          {
            "id": "1",
            "texto": "Solo si hacen publicidad"
          },
          {
            "id": "2",
            "texto": "Sí, según los ingresos de su actividad"
          }
        ],
        "respuestaCorrecta": "2"
      },
      {
        "conceptoId": "finalidad",
        "enunciado": "Con las aportaciones se construyen colegios, carreteras y hospitales.",
        "pregunta": "¿Qué finalidad muestran esos ejemplos?",
        "explicacion": "El dinero común permite pagar servicios e infraestructuras para la sociedad.",
        "pista": "Piensa qué puede usar la comunidad.",
        "id": "impuestos-finalidad-2-2",
        "bloqueId": "aportaciones",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Personas y actividad económica",
        "opciones": [
          {
            "id": "0",
            "texto": "Guardar regalos de anuncios"
          },
          {
            "id": "1",
            "texto": "Financiar servicios e infraestructuras públicos"
          },
          {
            "id": "2",
            "texto": "Garantizar beneficios a un inversor"
          }
        ],
        "respuestaCorrecta": "1"
      }
    ]
  },
  {
    "id": "impuestos-familia-3",
    "bloqueId": "servicios",
    "variantes": [
      {
        "conceptoId": "servicios",
        "enunciado": "Un centro de salud atiende a la población y el servicio de basuras recoge residuos.",
        "pregunta": "¿Qué relación tienen con los impuestos en este Tema?",
        "explicacion": "Hospitales, atención sanitaria y recogida de basuras son servicios citados por el material.",
        "pista": "Busca la relación entre las aportaciones y el cuidado de la ciudad.",
        "id": "impuestos-servicios-3-1",
        "bloqueId": "servicios",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Servicios que compartimos",
        "opciones": [
          {
            "id": "0",
            "texto": "Son eslóganes comerciales"
          },
          {
            "id": "1",
            "texto": "Son ejemplos de servicios públicos que ayudan a financiar"
          },
          {
            "id": "2",
            "texto": "Son formas de pagar una compra por Internet"
          }
        ],
        "respuestaCorrecta": "1"
      },
      {
        "conceptoId": "movilidad",
        "enunciado": "El colegio menciona carreteras, autobuses y metro.",
        "pregunta": "¿Qué ayudan a hacer estos servicios e infraestructuras?",
        "explicacion": "La fuente relaciona transporte y carreteras con poder desplazarse.",
        "pista": "Los tres ejemplos tienen que ver con desplazarse.",
        "id": "impuestos-movilidad-3-2",
        "bloqueId": "servicios",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Servicios que compartimos",
        "opciones": [
          {
            "id": "0",
            "texto": "Moverse y viajar por la ciudad"
          },
          {
            "id": "1",
            "texto": "Evitar todos los gastos de una familia"
          },
          {
            "id": "2",
            "texto": "Crear dinero con una tarjeta"
          }
        ],
        "respuestaCorrecta": "0"
      }
    ]
  },
  {
    "id": "impuestos-familia-4",
    "bloqueId": "servicios",
    "variantes": [
      {
        "conceptoId": "proteccion",
        "enunciado": "Una aportación al fondo común ayuda a mantener policías y bomberos.",
        "pregunta": "¿Qué servicio representa?",
        "explicacion": "La fuente destaca que policías y bomberos ayudan a proteger y atender peligros.",
        "pista": "Piensa en para qué está un cuerpo de bomberos.",
        "id": "impuestos-proteccion-4-1",
        "bloqueId": "servicios",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Protección y educación",
        "opciones": [
          {
            "id": "0",
            "texto": "Protección y atención ante peligros o incendios"
          },
          {
            "id": "1",
            "texto": "Publicidad comercial"
          },
          {
            "id": "2",
            "texto": "Una ganancia de inversión"
          }
        ],
        "respuestaCorrecta": "0"
      },
      {
        "conceptoId": "educacion-parques",
        "enunciado": "El material habla de escuelas públicas limpias y columpios seguros.",
        "pregunta": "¿Qué pareja de servicios nombra?",
        "explicacion": "Colegios y parques aparecen como ejemplos de servicios públicos que mantener.",
        "pista": "Relaciona escuela con educación y columpios con parques.",
        "id": "impuestos-educacion-parques-4-2",
        "bloqueId": "servicios",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Protección y educación",
        "opciones": [
          {
            "id": "0",
            "texto": "Tarjetas y efectivo"
          },
          {
            "id": "1",
            "texto": "Agencias y eslóganes"
          },
          {
            "id": "2",
            "texto": "Colegios y parques"
          }
        ],
        "respuestaCorrecta": "2"
      }
    ]
  },
  {
    "id": "impuestos-familia-5",
    "bloqueId": "iva",
    "variantes": [
      {
        "conceptoId": "iva-nombre",
        "enunciado": "El IVA aparece asociado al precio de una compra.",
        "pregunta": "¿Qué significan sus siglas?",
        "explicacion": "IVA significa Impuesto sobre el Valor Añadido.",
        "pista": "Es un impuesto relacionado con la compra de bienes o servicios.",
        "id": "impuestos-iva-nombre-5-1",
        "bloqueId": "iva",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "IVA al comprar",
        "opciones": [
          {
            "id": "0",
            "texto": "Ingresos Variables del Ahorro"
          },
          {
            "id": "1",
            "texto": "Inversión de Vecinos Asociados"
          },
          {
            "id": "2",
            "texto": "Impuesto sobre el Valor Añadido"
          }
        ],
        "respuestaCorrecta": "2"
      },
      {
        "conceptoId": "iva-recorrido",
        "enunciado": "En el ejemplo escolar, la tienda cobra una cantidad de IVA al vender.",
        "pregunta": "¿Qué hace después con ese dinero del impuesto?",
        "explicacion": "La fuente explica que el vendedor recoge esa cantidad y la entrega al Gobierno.",
        "pista": "Sigue la cantidad del impuesto, no el beneficio de la tienda.",
        "id": "impuestos-iva-recorrido-5-2",
        "bloqueId": "iva",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "IVA al comprar",
        "opciones": [
          {
            "id": "0",
            "texto": "Lo convierte en ahorro del comprador"
          },
          {
            "id": "1",
            "texto": "Se lo queda como un regalo"
          },
          {
            "id": "2",
            "texto": "Lo entrega al Estado según el esquema escolar"
          }
        ],
        "respuestaCorrecta": "2"
      }
    ]
  },
  {
    "id": "impuestos-familia-6",
    "bloqueId": "iva",
    "variantes": [
      {
        "conceptoId": "iva-ejemplo",
        "enunciado": "En un ejemplo para aprender, una compra muestra 10 € antes del impuesto y 2 € de IVA.",
        "pregunta": "¿Cuánto se paga en total en ese ejemplo?",
        "explicacion": "El total del ejemplo es 10 + 2 = 12 €. Son cantidades ilustrativas, no tipos de IVA a aplicar.",
        "pista": "Suma el precio antes del impuesto y el impuesto.",
        "id": "impuestos-iva-ejemplo-6-1",
        "bloqueId": "iva",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "El precio y el impuesto",
        "opciones": [
          {
            "id": "0",
            "texto": "Solo los 2 €"
          },
          {
            "id": "1",
            "texto": "8 €"
          },
          {
            "id": "2",
            "texto": "12 €"
          }
        ],
        "respuestaCorrecta": "2"
      },
      {
        "conceptoId": "iva-irpf",
        "enunciado": "Una persona ve el IVA en el detalle de una compra.",
        "pregunta": "¿Qué situación representa aquí?",
        "explicacion": "IVA se estudia aquí con una compra; IRPF con la renta y el ejemplo del sueldo.",
        "pista": "Distingue el recibo de compra del sueldo.",
        "id": "impuestos-iva-irpf-6-2",
        "bloqueId": "iva",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "El precio y el impuesto",
        "opciones": [
          {
            "id": "0",
            "texto": "Una aportación asociada a comprar"
          },
          {
            "id": "1",
            "texto": "Una retención del sueldo"
          },
          {
            "id": "2",
            "texto": "Una inversión con beneficio garantizado"
          }
        ],
        "respuestaCorrecta": "0"
      }
    ]
  },
  {
    "id": "impuestos-familia-7",
    "bloqueId": "irpf",
    "variantes": [
      {
        "conceptoId": "irpf-nombre",
        "enunciado": "IRPF significa Impuesto sobre la Renta de las Personas Físicas.",
        "pregunta": "¿Qué significa «personas físicas»?",
        "explicacion": "En esta expresión, personas físicas son personas, no empresas.",
        "pista": "La palabra «personas» se refiere aquí a individuos.",
        "id": "impuestos-irpf-nombre-7-1",
        "bloqueId": "irpf",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Tres palabras para entenderlo",
        "opciones": [
          {
            "id": "0",
            "texto": "Personas de carne y hueso"
          },
          {
            "id": "1",
            "texto": "Solo grandes empresas"
          },
          {
            "id": "2",
            "texto": "Servicios de recogida"
          }
        ],
        "respuestaCorrecta": "0"
      },
      {
        "conceptoId": "renta",
        "enunciado": "El colegio explica que «renta» es dinero que se gana trabajando o vendiendo algo.",
        "pregunta": "¿Qué ejemplo corresponde a esa idea?",
        "explicacion": "La palabra renta se relaciona con ingresos o ganancias, al nivel que explica la fuente escolar.",
        "pista": "Busca el dinero que se gana.",
        "id": "impuestos-renta-7-2",
        "bloqueId": "irpf",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Tres palabras para entenderlo",
        "opciones": [
          {
            "id": "0",
            "texto": "Una frase de un anuncio"
          },
          {
            "id": "1",
            "texto": "La papelera de un parque"
          },
          {
            "id": "2",
            "texto": "Un ingreso por trabajo"
          }
        ],
        "respuestaCorrecta": "2"
      }
    ]
  },
  {
    "id": "impuestos-familia-8",
    "bloqueId": "irpf",
    "variantes": [
      {
        "conceptoId": "retencion",
        "enunciado": "En el ejemplo de un sueldo, una parte se aparta antes de recibir el resto.",
        "pregunta": "¿Cómo se llama esa cantidad apartada?",
        "explicacion": "La fuente llama retención a la parte que se aparta automáticamente del sueldo.",
        "pista": "Se retiene una parte antes de entregar el resto.",
        "id": "impuestos-retencion-8-1",
        "bloqueId": "irpf",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Retención y Renta",
        "opciones": [
          {
            "id": "0",
            "texto": "Retención"
          },
          {
            "id": "1",
            "texto": "Regalo"
          },
          {
            "id": "2",
            "texto": "Eslogan"
          }
        ],
        "respuestaCorrecta": "0"
      },
      {
        "conceptoId": "declaracion",
        "enunciado": "El material dice que en primavera se hacen cuentas con la Agencia Tributaria.",
        "pregunta": "¿Para qué sirve esa revisión en la explicación escolar?",
        "explicacion": "La declaración de la Renta se presenta como una revisión de las cantidades aportadas.",
        "pista": "Se comparan cantidades ya aportadas y las que corresponden.",
        "id": "impuestos-declaracion-8-2",
        "bloqueId": "irpf",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Retención y Renta",
        "opciones": [
          {
            "id": "0",
            "texto": "Para garantizar el beneficio de una inversión"
          },
          {
            "id": "1",
            "texto": "Para comprobar si se pagó de más o de menos"
          },
          {
            "id": "2",
            "texto": "Para convertir el IVA en un regalo"
          }
        ],
        "respuestaCorrecta": "1"
      }
    ]
  },
  {
    "id": "impuestos-familia-9",
    "bloqueId": "otros-tributos",
    "variantes": [
      {
        "conceptoId": "otros-casos",
        "enunciado": "El colegio menciona viviendas, negocios, herencias y premios de lotería.",
        "pregunta": "¿Por qué aparecen en este Tema?",
        "explicacion": "La fuente menciona otros tributos ligados a posesiones, herencias o premios; no detalla sus reglas.",
        "pista": "Todos los ejemplos aparecen al hablar de otras aportaciones.",
        "id": "impuestos-otros-casos-9-1",
        "bloqueId": "otros-tributos",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Otros casos de la fuente",
        "opciones": [
          {
            "id": "0",
            "texto": "Como garantía de ahorro"
          },
          {
            "id": "1",
            "texto": "Como ejemplos de otros casos relacionados con tributos"
          },
          {
            "id": "2",
            "texto": "Como medios de difusión"
          }
        ],
        "respuestaCorrecta": "1"
      },
      {
        "conceptoId": "historia",
        "enunciado": "Una curiosidad del material menciona Mesopotamia, Egipto y China hace más de 5.000 años.",
        "pregunta": "¿Qué quiere mostrar?",
        "explicacion": "Es una curiosidad histórica de la fuente sobre antiguas leyes de impuestos.",
        "pista": "La pista principal es el tiempo transcurrido.",
        "id": "impuestos-historia-9-2",
        "bloqueId": "otros-tributos",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Otros casos de la fuente",
        "opciones": [
          {
            "id": "0",
            "texto": "Que los impuestos tienen una historia muy antigua"
          },
          {
            "id": "1",
            "texto": "Que el IVA tiene siempre el mismo valor"
          },
          {
            "id": "2",
            "texto": "Que los anuncios no existían"
          }
        ],
        "respuestaCorrecta": "0"
      }
    ]
  },
  {
    "id": "impuestos-familia-10",
    "bloqueId": "otros-tributos",
    "variantes": [
      {
        "conceptoId": "impago",
        "enunciado": "El material explica qué pasaría si nadie aportara y menciona consecuencias del impago.",
        "pregunta": "¿Qué idea principal transmite?",
        "explicacion": "La fuente vincula el funcionamiento de servicios comunes con las aportaciones obligatorias y advierte de sanciones.",
        "pista": "Piensa en mantener lo que comparte la sociedad.",
        "id": "impuestos-impago-10-1",
        "bloqueId": "otros-tributos",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Responsabilidad compartida",
        "opciones": [
          {
            "id": "0",
            "texto": "Los servicios comunes necesitan aportaciones y existen consecuencias por incumplir"
          },
          {
            "id": "1",
            "texto": "No hay ninguna consecuencia"
          },
          {
            "id": "2",
            "texto": "Todo gasto es una inversión"
          }
        ],
        "respuestaCorrecta": "0"
      },
      {
        "conceptoId": "obligacion",
        "enunciado": "Una persona confunde un impuesto con un regalo voluntario.",
        "pregunta": "¿Qué hay que aclarar?",
        "explicacion": "La obligatoriedad es parte de la definición escolar de impuesto.",
        "pista": "Compara obligación con decisión voluntaria.",
        "id": "impuestos-obligacion-10-2",
        "bloqueId": "otros-tributos",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Responsabilidad compartida",
        "opciones": [
          {
            "id": "0",
            "texto": "Todos los impuestos son descuentos"
          },
          {
            "id": "1",
            "texto": "Solo se aporta si se quiere aparecer en un anuncio"
          },
          {
            "id": "2",
            "texto": "El impuesto es obligatorio; no es un regalo voluntario"
          }
        ],
        "respuestaCorrecta": "2"
      }
    ]
  }
]);

