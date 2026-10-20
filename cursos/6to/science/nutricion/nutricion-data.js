export const NUTRICION_META = Object.freeze({
  "actividadId": "6-science-nutricion",
  "tituloActividad": "Nutrición",
  "version": "1.0",
  "cursoReferencia": "6.º de Primaria",
  "materia": "Science",
  "tema": "Nutrición",
  "cierreFirmes": "hoy conectaste los alimentos y los sistemas que participan en la nutrición."
});

export const BLOQUES_RESULTADO = Object.freeze([
  {
    "id": "alimentacion",
    "icono": "🥗",
    "titulo": "Alimentos y nutrición",
    "descripcion": "Reconocer grupos de alimentos y la participación de cuatro sistemas."
  },
  {
    "id": "digestivo",
    "icono": "🍽️",
    "titulo": "Sistema digestivo",
    "descripcion": "Seguir la digestión y localizar la absorción de nutrientes."
  },
  {
    "id": "respiratorio",
    "icono": "🫁",
    "titulo": "Sistema respiratorio",
    "descripcion": "Seguir el aire y comprender el intercambio de gases."
  },
  {
    "id": "circulatorio",
    "icono": "🫀",
    "titulo": "Sistema circulatorio",
    "descripcion": "Relacionar corazón, vasos y transporte de sustancias."
  },
  {
    "id": "excrecion",
    "icono": "💧",
    "titulo": "Eliminación de desechos",
    "descripcion": "Distinguir la formación de orina de la eliminación de heces."
  }
]);

export const PRACTICA_NUTRICION = Object.freeze([
  {
    "id": "practica-nutricion",
    "bloqueId": "alimentacion",
    "conceptoId": "nutricion",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Cuatro sistemas colaboran",
    "enunciado": "El cuerpo obtiene nutrientes, incorpora oxígeno, transporta sustancias y elimina desechos.",
    "pregunta": "¿Qué conjunto participa en la nutrición?",
    "opciones": [
      {
        "id": "0",
        "texto": "Digestivo, respiratorio, circulatorio y excretor"
      },
      {
        "id": "1",
        "texto": "Solo el sistema digestivo"
      },
      {
        "id": "2",
        "texto": "Solo los sistemas respiratorio y circulatorio"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "Los cuatro sistemas colaboran: obtener, incorporar, transportar y eliminar.",
    "pista": "Piensa en obtener nutrientes, incorporar oxígeno, repartir sustancias y eliminar desechos."
  },
  {
    "id": "practica-grupos-alimentos",
    "bloqueId": "alimentacion",
    "conceptoId": "grupos-alimentos",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Reconocer los alimentos",
    "enunciado": "En la imagen aparecen pan, arroz, pasta y patatas.",
    "pregunta": "¿Qué nombre tiene su grupo en la pirámide?",
    "opciones": [
      {
        "id": "0",
        "texto": "Carbohidratos"
      },
      {
        "id": "1",
        "texto": "Lácteos"
      },
      {
        "id": "2",
        "texto": "Verduras"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "La base de la imagen lleva la etiqueta Carbohidratos e incluye estos ejemplos.",
    "pista": "Mira los rótulos de la pirámide y busca pan, arroz, pasta y patatas."
  },
  {
    "id": "practica-inicio-digestion",
    "bloqueId": "digestivo",
    "conceptoId": "inicio-digestion",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "La digestión comienza",
    "enunciado": "Masticas un trozo de comida y lo mezclas con saliva antes de tragar.",
    "pregunta": "¿Dónde comienza este proceso?",
    "opciones": [
      {
        "id": "0",
        "texto": "En la boca"
      },
      {
        "id": "1",
        "texto": "En el intestino grueso"
      },
      {
        "id": "2",
        "texto": "En los riñones"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "La digestión empieza en la boca: los dientes mastican y la saliva se mezcla con los alimentos.",
    "pista": "Antes de tragar ya masticas y mezclas los alimentos con saliva."
  },
  {
    "id": "practica-absorcion",
    "bloqueId": "digestivo",
    "conceptoId": "absorcion",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Los nutrientes pasan a la sangre",
    "enunciado": "La comida sale del estómago y continúa su recorrido.",
    "pregunta": "¿Dónde se absorben los nutrientes y pasan a la sangre?",
    "opciones": [
      {
        "id": "0",
        "texto": "En el intestino delgado"
      },
      {
        "id": "1",
        "texto": "En el recto"
      },
      {
        "id": "2",
        "texto": "En la tráquea"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "El intestino delgado absorbe los nutrientes. Después, la sangre puede transportarlos.",
    "pista": "Recuerda qué intestino permite que los nutrientes lleguen a la sangre."
  },
  {
    "id": "practica-recorrido-aire",
    "bloqueId": "respiratorio",
    "conceptoId": "recorrido-aire",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "El camino del aire",
    "enunciado": "El aire entra por la nariz o la boca.",
    "pregunta": "¿Qué recorrido sigue después hacia el lugar del intercambio de gases?",
    "opciones": [
      {
        "id": "0",
        "texto": "Tráquea → bronquios → bronquiolos → alvéolos"
      },
      {
        "id": "1",
        "texto": "Esófago → estómago → intestino"
      },
      {
        "id": "2",
        "texto": "Uréteres → vejiga → uretra"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "El aire recorre la tráquea y las ramificaciones de los bronquios hasta los alvéolos.",
    "pista": "Sigue las ramificaciones desde el tubo principal hasta los pequeños sacos."
  },
  {
    "id": "practica-intercambio-gases",
    "bloqueId": "respiratorio",
    "conceptoId": "intercambio-gases",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Intercambio en los pulmones",
    "enunciado": "En los pequeños sacos llamados alvéolos se intercambian gases con la sangre.",
    "pregunta": "¿Qué gas del aire pasa a la sangre?",
    "opciones": [
      {
        "id": "0",
        "texto": "Oxígeno"
      },
      {
        "id": "1",
        "texto": "Solo dióxido de carbono"
      },
      {
        "id": "2",
        "texto": "Bilis"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "En los alvéolos, el oxígeno del aire pasa a la sangre y puede llegar al cuerpo.",
    "pista": "Es el gas que la sangre recoge en los pulmones para llevarlo al cuerpo."
  },
  {
    "id": "practica-corazon",
    "bloqueId": "circulatorio",
    "conceptoId": "corazon",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "El corazón impulsa la sangre",
    "enunciado": "La sangre necesita moverse hacia los pulmones y hacia el resto del cuerpo.",
    "pregunta": "¿Qué órgano actúa como una bomba?",
    "opciones": [
      {
        "id": "0",
        "texto": "El corazón"
      },
      {
        "id": "1",
        "texto": "El estómago"
      },
      {
        "id": "2",
        "texto": "La vejiga"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "El corazón impulsa la sangre. Así puede llegar a los pulmones y al resto del cuerpo.",
    "pista": "Busca el órgano que impulsa, no el que digiere o almacena."
  },
  {
    "id": "practica-vasos-recorrido",
    "bloqueId": "circulatorio",
    "conceptoId": "vasos-recorrido",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Una red de transporte",
    "enunciado": "La sangre sale del corazón por arterias, recorre pequeños vasos y vuelve por venas.",
    "pregunta": "¿Qué vasos conectan las arterias y las venas?",
    "opciones": [
      {
        "id": "0",
        "texto": "Los capilares"
      },
      {
        "id": "1",
        "texto": "Los bronquios"
      },
      {
        "id": "2",
        "texto": "Los uréteres"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "Los capilares son vasos muy pequeños que conectan la red de arterias y venas.",
    "pista": "Son vasos diminutos que conectan la red."
  },
  {
    "id": "practica-orina",
    "bloqueId": "excrecion",
    "conceptoId": "orina",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "El recorrido de la orina",
    "enunciado": "La sangre pasa por órganos que la filtran y forman la orina.",
    "pregunta": "¿Qué órganos realizan esa función?",
    "opciones": [
      {
        "id": "0",
        "texto": "Los riñones"
      },
      {
        "id": "1",
        "texto": "Los pulmones"
      },
      {
        "id": "2",
        "texto": "Los intestinos"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "Los riñones filtran la sangre y forman orina con agua sobrante y sustancias de desecho.",
    "pista": "Recuerda los dos órganos que filtran la sangre."
  },
  {
    "id": "practica-heces",
    "bloqueId": "excrecion",
    "conceptoId": "heces",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "El recorrido de los restos alimentarios",
    "enunciado": "Los restos de alimentos que no se han digerido continúan por el intestino grueso.",
    "pregunta": "¿Qué recupera allí el cuerpo en buena parte?",
    "opciones": [
      {
        "id": "0",
        "texto": "Agua"
      },
      {
        "id": "1",
        "texto": "Aire"
      },
      {
        "id": "2",
        "texto": "Bilis nueva"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "En el intestino grueso se recupera agua y los restos se van transformando en heces.",
    "pista": "Al recuperar este líquido, los restos se vuelven más sólidos."
  }
]);

export const FAMILIAS_PRUEBA_NUTRICION = Object.freeze([
  {
    "id": "familia-nutricion",
    "bloqueId": "alimentacion",
    "variantes": [
      {
        "id": "nutricion-nutricion-1",
        "bloqueId": "alimentacion",
        "conceptoId": "nutricion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Cuatro sistemas colaboran",
        "enunciado": "El cuerpo obtiene nutrientes, incorpora oxígeno, transporta sustancias y elimina desechos.",
        "pregunta": "¿Qué conjunto participa en la nutrición?",
        "opciones": [
          {
            "id": "0",
            "texto": "Digestivo, respiratorio, circulatorio y excretor"
          },
          {
            "id": "1",
            "texto": "Solo el sistema digestivo"
          },
          {
            "id": "2",
            "texto": "Solo los sistemas respiratorio y circulatorio"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "Los cuatro sistemas colaboran: obtener, incorporar, transportar y eliminar."
      },
      {
        "id": "nutricion-nutricion-2",
        "bloqueId": "alimentacion",
        "conceptoId": "nutricion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Cuatro sistemas colaboran",
        "enunciado": "Después de comer, los nutrientes pasan a la sangre y llegan a distintas partes del cuerpo.",
        "pregunta": "¿Por qué la nutrición no depende solo del sistema digestivo?",
        "opciones": [
          {
            "id": "0",
            "texto": "Porque los alimentos llegan directamente a los pulmones"
          },
          {
            "id": "1",
            "texto": "También necesitamos oxígeno, transporte y eliminación de desechos"
          },
          {
            "id": "2",
            "texto": "Porque el corazón transforma la comida en nutrientes"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "La nutrición conecta la digestión con la respiración, la circulación y la eliminación de desechos."
      }
    ]
  },
  {
    "id": "familia-grupos-alimentos",
    "bloqueId": "alimentacion",
    "variantes": [
      {
        "id": "nutricion-grupos-alimentos-1",
        "bloqueId": "alimentacion",
        "conceptoId": "grupos-alimentos",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Reconocer los alimentos",
        "enunciado": "En la imagen aparecen pan, arroz, pasta y patatas.",
        "pregunta": "¿Qué nombre tiene su grupo en la pirámide?",
        "opciones": [
          {
            "id": "0",
            "texto": "Carbohidratos"
          },
          {
            "id": "1",
            "texto": "Lácteos"
          },
          {
            "id": "2",
            "texto": "Verduras"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "La base de la imagen lleva la etiqueta Carbohidratos e incluye estos ejemplos."
      },
      {
        "id": "nutricion-grupos-alimentos-2",
        "bloqueId": "alimentacion",
        "conceptoId": "grupos-alimentos",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Reconocer los alimentos",
        "enunciado": "En el grupo rotulado Proteínas vemos pescado, huevos, legumbres y carne.",
        "pregunta": "¿Qué pareja pertenece a ese grupo de la imagen?",
        "opciones": [
          {
            "id": "0",
            "texto": "Leche y yogur"
          },
          {
            "id": "1",
            "texto": "Pescado y huevos"
          },
          {
            "id": "2",
            "texto": "Manzana y naranja"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "Pescado y huevos aparecen en el grupo Proteínas. Leche y yogur están en Lácteos; manzana y naranja, en Frutas."
      }
    ]
  },
  {
    "id": "familia-inicio-digestion",
    "bloqueId": "digestivo",
    "variantes": [
      {
        "id": "nutricion-inicio-digestion-1",
        "bloqueId": "digestivo",
        "conceptoId": "inicio-digestion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "La digestión comienza",
        "enunciado": "Masticas un trozo de comida y lo mezclas con saliva antes de tragar.",
        "pregunta": "¿Dónde comienza este proceso?",
        "opciones": [
          {
            "id": "0",
            "texto": "En la boca"
          },
          {
            "id": "1",
            "texto": "En el intestino grueso"
          },
          {
            "id": "2",
            "texto": "En los riñones"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "La digestión empieza en la boca: los dientes mastican y la saliva se mezcla con los alimentos."
      },
      {
        "id": "nutricion-inicio-digestion-2",
        "bloqueId": "digestivo",
        "conceptoId": "inicio-digestion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "La digestión comienza",
        "enunciado": "La comida ya ha pasado por el esófago.",
        "pregunta": "¿Dónde se mezcla con los jugos gástricos?",
        "opciones": [
          {
            "id": "0",
            "texto": "En la vejiga"
          },
          {
            "id": "1",
            "texto": "En el estómago"
          },
          {
            "id": "2",
            "texto": "En los pulmones"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "El esófago lleva la comida al estómago, donde se mezcla con los jugos gástricos."
      }
    ]
  },
  {
    "id": "familia-absorcion",
    "bloqueId": "digestivo",
    "variantes": [
      {
        "id": "nutricion-absorcion-1",
        "bloqueId": "digestivo",
        "conceptoId": "absorcion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Los nutrientes pasan a la sangre",
        "enunciado": "La comida sale del estómago y continúa su recorrido.",
        "pregunta": "¿Dónde se absorben los nutrientes y pasan a la sangre?",
        "opciones": [
          {
            "id": "0",
            "texto": "En el intestino delgado"
          },
          {
            "id": "1",
            "texto": "En el recto"
          },
          {
            "id": "2",
            "texto": "En la tráquea"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "El intestino delgado absorbe los nutrientes. Después, la sangre puede transportarlos."
      },
      {
        "id": "nutricion-absorcion-2",
        "bloqueId": "digestivo",
        "conceptoId": "absorcion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Los nutrientes pasan a la sangre",
        "enunciado": "El hígado produce bilis, que llega al intestino delgado.",
        "pregunta": "¿A qué ayuda la bilis?",
        "opciones": [
          {
            "id": "0",
            "texto": "A guardar la orina"
          },
          {
            "id": "1",
            "texto": "A digerir las grasas"
          },
          {
            "id": "2",
            "texto": "A llevar el aire a los pulmones"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "La bilis producida por el hígado ayuda a digerir las grasas en el intestino delgado."
      }
    ]
  },
  {
    "id": "familia-recorrido-aire",
    "bloqueId": "respiratorio",
    "variantes": [
      {
        "id": "nutricion-recorrido-aire-1",
        "bloqueId": "respiratorio",
        "conceptoId": "recorrido-aire",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "El camino del aire",
        "enunciado": "El aire entra por la nariz o la boca.",
        "pregunta": "¿Qué recorrido sigue después hacia el lugar del intercambio de gases?",
        "opciones": [
          {
            "id": "0",
            "texto": "Tráquea → bronquios → bronquiolos → alvéolos"
          },
          {
            "id": "1",
            "texto": "Esófago → estómago → intestino"
          },
          {
            "id": "2",
            "texto": "Uréteres → vejiga → uretra"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "El aire recorre la tráquea y las ramificaciones de los bronquios hasta los alvéolos."
      },
      {
        "id": "nutricion-recorrido-aire-2",
        "bloqueId": "respiratorio",
        "conceptoId": "recorrido-aire",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "El camino del aire",
        "enunciado": "Los bronquios se ramifican en tubos más pequeños dentro de los pulmones.",
        "pregunta": "¿Cómo se llaman esos tubos pequeños?",
        "opciones": [
          {
            "id": "0",
            "texto": "Uréteres"
          },
          {
            "id": "1",
            "texto": "Bronquiolos"
          },
          {
            "id": "2",
            "texto": "Capilares digestivos"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "Los bronquiolos son las ramificaciones pequeñas de los bronquios; al final se encuentran los alvéolos."
      }
    ]
  },
  {
    "id": "familia-intercambio-gases",
    "bloqueId": "respiratorio",
    "variantes": [
      {
        "id": "nutricion-intercambio-gases-1",
        "bloqueId": "respiratorio",
        "conceptoId": "intercambio-gases",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Intercambio en los pulmones",
        "enunciado": "En los pequeños sacos llamados alvéolos se intercambian gases con la sangre.",
        "pregunta": "¿Qué gas del aire pasa a la sangre?",
        "opciones": [
          {
            "id": "0",
            "texto": "Oxígeno"
          },
          {
            "id": "1",
            "texto": "Solo dióxido de carbono"
          },
          {
            "id": "2",
            "texto": "Bilis"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "En los alvéolos, el oxígeno del aire pasa a la sangre y puede llegar al cuerpo."
      },
      {
        "id": "nutricion-intercambio-gases-2",
        "bloqueId": "respiratorio",
        "conceptoId": "intercambio-gases",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Intercambio en los pulmones",
        "enunciado": "La sangre llega a los pulmones con dióxido de carbono procedente del cuerpo.",
        "pregunta": "¿Qué hace el sistema respiratorio con ese gas?",
        "opciones": [
          {
            "id": "0",
            "texto": "Lo transforma en alimento"
          },
          {
            "id": "1",
            "texto": "Lo libera al exterior al expulsar el aire"
          },
          {
            "id": "2",
            "texto": "Lo guarda en la vejiga"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "El dióxido de carbono pasa al aire de los alvéolos y se expulsa al respirar."
      }
    ]
  },
  {
    "id": "familia-corazon",
    "bloqueId": "circulatorio",
    "variantes": [
      {
        "id": "nutricion-corazon-1",
        "bloqueId": "circulatorio",
        "conceptoId": "corazon",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "El corazón impulsa la sangre",
        "enunciado": "La sangre necesita moverse hacia los pulmones y hacia el resto del cuerpo.",
        "pregunta": "¿Qué órgano actúa como una bomba?",
        "opciones": [
          {
            "id": "0",
            "texto": "El corazón"
          },
          {
            "id": "1",
            "texto": "El estómago"
          },
          {
            "id": "2",
            "texto": "La vejiga"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "El corazón impulsa la sangre. Así puede llegar a los pulmones y al resto del cuerpo."
      },
      {
        "id": "nutricion-corazon-2",
        "bloqueId": "circulatorio",
        "conceptoId": "corazon",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "El corazón impulsa la sangre",
        "enunciado": "El corazón tiene cuatro cavidades: dos superiores y dos inferiores.",
        "pregunta": "¿Qué nombres corresponden a las superiores y a las inferiores?",
        "opciones": [
          {
            "id": "0",
            "texto": "Ventrículos arriba y aurículas abajo"
          },
          {
            "id": "1",
            "texto": "Aurículas arriba y ventrículos abajo"
          },
          {
            "id": "2",
            "texto": "Bronquios arriba y bronquiolos abajo"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "Las dos cavidades superiores son aurículas y las dos inferiores son ventrículos."
      }
    ]
  },
  {
    "id": "familia-vasos-recorrido",
    "bloqueId": "circulatorio",
    "variantes": [
      {
        "id": "nutricion-vasos-recorrido-1",
        "bloqueId": "circulatorio",
        "conceptoId": "vasos-recorrido",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Una red de transporte",
        "enunciado": "La sangre sale del corazón por arterias, recorre pequeños vasos y vuelve por venas.",
        "pregunta": "¿Qué vasos conectan las arterias y las venas?",
        "opciones": [
          {
            "id": "0",
            "texto": "Los capilares"
          },
          {
            "id": "1",
            "texto": "Los bronquios"
          },
          {
            "id": "2",
            "texto": "Los uréteres"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "Los capilares son vasos muy pequeños que conectan la red de arterias y venas."
      },
      {
        "id": "nutricion-vasos-recorrido-2",
        "bloqueId": "circulatorio",
        "conceptoId": "vasos-recorrido",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Una red de transporte",
        "enunciado": "La sangre incorpora oxígeno en los pulmones antes de distribuirlo por el cuerpo.",
        "pregunta": "¿Qué recorrido conecta esos lugares?",
        "opciones": [
          {
            "id": "0",
            "texto": "Pulmones → vejiga → boca → cuerpo"
          },
          {
            "id": "1",
            "texto": "Corazón → pulmones → corazón → cuerpo → corazón"
          },
          {
            "id": "2",
            "texto": "Corazón → estómago → tráquea → corazón"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "La sangre vuelve de los pulmones al corazón; desde allí se impulsa al cuerpo y después regresa."
      }
    ]
  },
  {
    "id": "familia-orina",
    "bloqueId": "excrecion",
    "variantes": [
      {
        "id": "nutricion-orina-1",
        "bloqueId": "excrecion",
        "conceptoId": "orina",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "El recorrido de la orina",
        "enunciado": "La sangre pasa por órganos que la filtran y forman la orina.",
        "pregunta": "¿Qué órganos realizan esa función?",
        "opciones": [
          {
            "id": "0",
            "texto": "Los riñones"
          },
          {
            "id": "1",
            "texto": "Los pulmones"
          },
          {
            "id": "2",
            "texto": "Los intestinos"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "Los riñones filtran la sangre y forman orina con agua sobrante y sustancias de desecho."
      },
      {
        "id": "nutricion-orina-2",
        "bloqueId": "excrecion",
        "conceptoId": "orina",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "El recorrido de la orina",
        "enunciado": "La orina se forma en los riñones, se almacena y después sale del cuerpo.",
        "pregunta": "¿Qué recorrido sigue?",
        "opciones": [
          {
            "id": "0",
            "texto": "Riñones → uretra → estómago → vejiga"
          },
          {
            "id": "1",
            "texto": "Riñones → uréteres → vejiga → uretra"
          },
          {
            "id": "2",
            "texto": "Boca → esófago → riñones → pulmones"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "Los uréteres llevan la orina a la vejiga; la uretra permite expulsarla al exterior."
      }
    ]
  },
  {
    "id": "familia-heces",
    "bloqueId": "excrecion",
    "variantes": [
      {
        "id": "nutricion-heces-1",
        "bloqueId": "excrecion",
        "conceptoId": "heces",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "El recorrido de los restos alimentarios",
        "enunciado": "Los restos de alimentos que no se han digerido continúan por el intestino grueso.",
        "pregunta": "¿Qué recupera allí el cuerpo en buena parte?",
        "opciones": [
          {
            "id": "0",
            "texto": "Agua"
          },
          {
            "id": "1",
            "texto": "Aire"
          },
          {
            "id": "2",
            "texto": "Bilis nueva"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "En el intestino grueso se recupera agua y los restos se van transformando en heces."
      },
      {
        "id": "nutricion-heces-2",
        "bloqueId": "excrecion",
        "conceptoId": "heces",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "El recorrido de los restos alimentarios",
        "enunciado": "Las heces ya se han formado y van a salir del cuerpo.",
        "pregunta": "¿Dónde se almacenan y por dónde se expulsan?",
        "opciones": [
          {
            "id": "0",
            "texto": "Se almacenan en la vejiga y salen por la uretra"
          },
          {
            "id": "1",
            "texto": "Se almacenan en el recto y salen por el ano"
          },
          {
            "id": "2",
            "texto": "Se almacenan en los pulmones y salen por la nariz"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "El recto almacena las heces hasta su salida por el ano. La vejiga y la uretra pertenecen al recorrido de la orina."
      }
    ]
  }
]);

