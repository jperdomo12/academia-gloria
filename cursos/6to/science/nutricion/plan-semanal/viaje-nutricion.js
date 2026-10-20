import { mostrarDocumento } from "../../../plan-semanal/documento.js?v=3";

// Selecciones objetivas; las correcciones libres se comparan con el modelo, sin calificación automática.
const documento = {
  "lectura": [
    "La nutrición es el estudio de los alimentos y de cómo actúan en nuestro cuerpo. Para crecer, moverse y mantenerse sanos, los seres humanos necesitan una variedad de alimentos, como frutas, verduras, productos lácteos y cereales. Sin embargo, la nutrición no se limita a comer. Se trata de un proceso complejo en el que intervienen cuatro sistemas del cuerpo: el sistema digestivo, el sistema respiratorio, el sistema circulatorio y el sistema excretor.",
    "En primer lugar, el proceso comienza cuando comemos. El sistema digestivo extrae los nutrientes de los alimentos. La digestión empieza en la boca, donde los dientes trituran la comida y la mezclan con la saliva. Al tragar, los alimentos bajan por el esófago hasta el estómago, donde se mezclan con los jugos gástricos. A continuación, en el intestino delgado, los alimentos se mezclan con la bilis procedente del hígado para descomponer las grasas. Es en el intestino delgado donde se absorben los nutrientes y pasan a la sangre.",
    "Al mismo tiempo, el sistema respiratorio absorbe oxígeno del aire a través de la nariz y la boca. El aire desciende por la tráquea hasta los pulmones, pasando por los bronquios y los bronquiolos hasta llegar a unos pequeños sacos llamados alvéolos. En los alvéolos, el oxígeno pasa a la sangre.",
    "Aquí es donde el sistema circulatorio desempeña su papel fundamental. El corazón, un órgano con cuatro cavidades (dos aurículas y dos ventrículos), actúa como una bomba. Bombea sangre oxigenada a través de las arterias para suministrar nutrientes y oxígeno a todo el cuerpo. A continuación, las venas transportan la sangre que contiene dióxido de carbono de vuelta al corazón.",
    "Por último, nuestro cuerpo necesita eliminar los residuos. El sistema excretor elimina las sustancias de desecho y el exceso de agua. Los riñones filtran la sangre para producir orina, que se almacena en la vejiga y se expulsa a través de la uretra. Además, los alimentos no digeridos que se encuentran en el intestino grueso forman residuos sólidos denominados heces, que se expulsan a través del ano."
  ],
  "bloques": [
    {
      "id": "vf",
      "titulo": "1 · Verdadero o Falso",
      "instruccion": "Marca Verdadero o Falso. Si eliges Falso, escribe cómo corregirías la frase. Después comprueba tus respuestas.",
      "items": [
        {
          "enunciado": "La nutrición se refiere únicamente a los alimentos que ingerimos y no incluye los líquidos ni el aire.",
          "explicacion": "La nutrición no consiste solo en comer: también necesitamos agua y oxígeno; participan cuatro sistemas.",
          "respuestaCorrecta": 1
        },
        {
          "enunciado": "Los cuatro sistemas implicados en la nutrición son el digestivo, el respiratorio, el circulatorio y el excretor.",
          "explicacion": "Los cuatro sistemas trabajan juntos para obtener, transportar y eliminar sustancias.",
          "respuestaCorrecta": 0
        },
        {
          "enunciado": "La digestión comienza en el estómago, cuando los alimentos se mezclan con los jugos gástricos.",
          "explicacion": "La digestión comienza en la boca, al masticar y mezclar los alimentos con la saliva.",
          "respuestaCorrecta": 1
        },
        {
          "enunciado": "El intestino delgado transforma los alimentos no digeridos en heces sólidas.",
          "explicacion": "Los restos no digeridos forman heces en el intestino grueso; el delgado absorbe los nutrientes.",
          "respuestaCorrecta": 1
        },
        {
          "enunciado": "Los nutrientes pasan a la sangre a través de las paredes del intestino delgado.",
          "explicacion": "En el intestino delgado se absorben los nutrientes.",
          "respuestaCorrecta": 0
        },
        {
          "enunciado": "La tráquea conecta la boca y la nariz con los dos bronquios.",
          "explicacion": "El aire pasa por la tráquea y después por los bronquios hacia los pulmones.",
          "respuestaCorrecta": 0
        },
        {
          "enunciado": "Los pulmones absorben dióxido de carbono y liberan oxígeno al aire.",
          "explicacion": "En los pulmones el oxígeno del aire pasa a la sangre y el dióxido de carbono se expulsa al aire.",
          "respuestaCorrecta": 1
        },
        {
          "enunciado": "El corazón tiene cuatro cavidades: dos cavidades superiores (aurículas) y dos cavidades inferiores (ventrículos).",
          "explicacion": "Dos aurículas y dos ventrículos: cuatro cavidades en total.",
          "respuestaCorrecta": 0
        },
        {
          "enunciado": "Los capilares conectan las arterias con las venas.",
          "explicacion": "Los capilares son vasos muy finos entre las arterias y las venas. Es una aclaración de apoyo de Academia; no está explicada en esta lectura.",
          "respuestaCorrecta": 0
        },
        {
          "enunciado": "Los riñones filtran la sangre, eliminando el exceso de agua y los desechos para formar la orina.",
          "explicacion": "La orina se forma al filtrar la sangre en los riñones.",
          "respuestaCorrecta": 0
        }
      ],
      "tipo": "verdadero-falso",
      "opciones": [
        "Verdadero",
        "Falso"
      ]
    },
    {
      "id": "abc",
      "titulo": "2 · Elige A, B o C",
      "instruccion": "Elige una opción (A, B o C) en cada pregunta. Después comprueba tus respuestas.",
      "items": [
        {
          "enunciado": "¿Dónde comienza la digestión?",
          "opciones": [
            "En el estómago",
            "En la boca",
            "En el intestino delgado"
          ],
          "explicacion": "Los dientes y la saliva empiezan el proceso en la boca.",
          "respuestaCorrecta": 1
        },
        {
          "enunciado": "¿Cuál es el órgano que produce bilis?",
          "opciones": [
            "El estómago",
            "El hígado",
            "El intestino grueso"
          ],
          "explicacion": "La bilis procede del hígado y ayuda a descomponer las grasas.",
          "respuestaCorrecta": 1
        },
        {
          "enunciado": "¿Cuál es la función principal del intestino delgado?",
          "opciones": [
            "Absorber los nutrientes y pasarlos a la sangre.",
            "Masticar la comida con los dientes.",
            "Almacenar la orina antes de expulsarla."
          ],
          "explicacion": "Los nutrientes se absorben en el intestino delgado.",
          "respuestaCorrecta": 0
        },
        {
          "enunciado": "¿Dónde se hace el intercambio de oxígeno y dióxido de carbono?",
          "opciones": [
            "En la tráquea",
            "En el esófago",
            "En los alvéolos"
          ],
          "explicacion": "Los alvéolos permiten el intercambio de gases entre el aire y la sangre.",
          "respuestaCorrecta": 2
        },
        {
          "enunciado": "¿Cuántas cámaras tiene el corazón humano?",
          "opciones": [
            "2 cámaras",
            "4 cámaras",
            "3 cámaras"
          ],
          "explicacion": "Tiene dos aurículas y dos ventrículos.",
          "respuestaCorrecta": 1
        },
        {
          "enunciado": "¿Cuál es el vaso sanguíneo que lleva la sangre oxigenada del corazón al resto del cuerpo?",
          "opciones": [
            "Arterias",
            "Venas",
            "Capilares"
          ],
          "explicacion": "En este recorrido al resto del cuerpo, las arterias llevan la sangre desde el corazón. No todas las arterias llevan siempre sangre oxigenada.",
          "respuestaCorrecta": 0
        },
        {
          "enunciado": "¿Cuál es la función de los riñones en el sistema urinario?",
          "opciones": [
            "Bombear la sangre a los pulmones.",
            "Filtrar la sangre para formar la orina.",
            "Producir jugos gástricos para digerir la comida."
          ],
          "explicacion": "Los riñones filtran desechos y exceso de agua de la sangre.",
          "respuestaCorrecta": 1
        },
        {
          "enunciado": "¿Qué pasa con la comida que no se digiere en el intestino grueso?",
          "opciones": [
            "Se absorbe la mayoría del agua y se transforma en heces.",
            "Se absorbe el oxígeno para la sangre.",
            "Se convierte en bilis para ayudar al hígado."
          ],
          "explicacion": "En el intestino grueso se absorbe agua de los restos no digeridos y se forman las heces.",
          "respuestaCorrecta": 0
        }
      ],
      "tipo": "opcion-multiple"
    },
    {
      "id": "conectar",
      "titulo": "3 · Conecta parte y sistema",
      "instruccion": "Elige el sistema que corresponde a cada parte del cuerpo. Después comprueba las conexiones.",
      "items": [
        {
          "enunciado": "Tráquea",
          "respuestaCorrecta": 1
        },
        {
          "enunciado": "Riñones",
          "respuestaCorrecta": 3
        },
        {
          "enunciado": "Esófago",
          "respuestaCorrecta": 0
        },
        {
          "enunciado": "Arterias",
          "respuestaCorrecta": 2
        },
        {
          "enunciado": "Intestino delgado",
          "respuestaCorrecta": 0
        },
        {
          "enunciado": "Alvéolo",
          "respuestaCorrecta": 1
        },
        {
          "enunciado": "Vejiga",
          "respuestaCorrecta": 3
        },
        {
          "enunciado": "Venas",
          "respuestaCorrecta": 2
        }
      ],
      "tipo": "relacionar",
      "opciones": [
        "Sistema digestivo",
        "Sistema respiratorio",
        "Sistema circulatorio",
        "Sistema excretor"
      ]
    }
  ]
};

mostrarDocumento("science-nutricion-2026-10-19", documento);
