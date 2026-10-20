import { mostrarDocumento } from "../../../plan-semanal/documento.js";

// Contenido escolar. Correcciones y aclaraciones se muestran solo tras el intento en cuaderno.
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
      "instruccion": "Escribe V si la frase es verdadera o F si es falsa. Corrige las falsas en tu cuaderno.",
      "items": [
        {
          "enunciado": "La nutrición se refiere únicamente a los alimentos que ingerimos y no incluye los líquidos ni el aire.",
          "respuesta": "Falso",
          "explicacion": "La nutrición no consiste solo en comer: también necesitamos agua y oxígeno; participan cuatro sistemas."
        },
        {
          "enunciado": "Los cuatro sistemas implicados en la nutrición son el digestivo, el respiratorio, el circulatorio y el excretor.",
          "respuesta": "Verdadero",
          "explicacion": "Los cuatro sistemas trabajan juntos para obtener, transportar y eliminar sustancias."
        },
        {
          "enunciado": "La digestión comienza en el estómago, cuando los alimentos se mezclan con los jugos gástricos.",
          "respuesta": "Falso",
          "explicacion": "La digestión comienza en la boca, al masticar y mezclar los alimentos con la saliva."
        },
        {
          "enunciado": "El intestino delgado transforma los alimentos no digeridos en heces sólidas.",
          "respuesta": "Falso",
          "explicacion": "Los restos no digeridos forman heces en el intestino grueso; el delgado absorbe los nutrientes."
        },
        {
          "enunciado": "Los nutrientes pasan a la sangre a través de las paredes del intestino delgado.",
          "respuesta": "Verdadero",
          "explicacion": "En el intestino delgado se absorben los nutrientes."
        },
        {
          "enunciado": "La tráquea conecta la boca y la nariz con los dos bronquios.",
          "respuesta": "Verdadero",
          "explicacion": "El aire pasa por la tráquea y después por los bronquios hacia los pulmones."
        },
        {
          "enunciado": "Los pulmones absorben dióxido de carbono y liberan oxígeno al aire.",
          "respuesta": "Falso",
          "explicacion": "En los pulmones el oxígeno del aire pasa a la sangre y el dióxido de carbono se expulsa al aire."
        },
        {
          "enunciado": "El corazón tiene cuatro cavidades: dos cavidades superiores (aurículas) y dos cavidades inferiores (ventrículos).",
          "respuesta": "Verdadero",
          "explicacion": "Dos aurículas y dos ventrículos: cuatro cavidades en total."
        },
        {
          "enunciado": "Los capilares conectan las arterias con las venas.",
          "respuesta": "Verdadero",
          "explicacion": "Los capilares son vasos muy finos entre las arterias y las venas. Es una aclaración de apoyo de Academia; no está explicada en esta lectura."
        },
        {
          "enunciado": "Los riñones filtran la sangre, eliminando el exceso de agua y los desechos para formar la orina.",
          "respuesta": "Verdadero",
          "explicacion": "La orina se forma al filtrar la sangre en los riñones."
        }
      ]
    },
    {
      "id": "abc",
      "titulo": "2 · Elige A, B o C",
      "instruccion": "Rodea la opción correcta (A, B o C) en tu cuaderno.",
      "items": [
        {
          "enunciado": "¿Dónde comienza la digestión?",
          "opciones": [
            "En el estómago",
            "En la boca",
            "En el intestino delgado"
          ],
          "respuesta": "B) En la boca",
          "explicacion": "Los dientes y la saliva empiezan el proceso en la boca."
        },
        {
          "enunciado": "¿Cuál es el órgano que produce bilis?",
          "opciones": [
            "El estómago",
            "El hígado",
            "El intestino grueso"
          ],
          "respuesta": "B) El hígado",
          "explicacion": "La bilis procede del hígado y ayuda a descomponer las grasas."
        },
        {
          "enunciado": "¿Cuál es la función principal del intestino delgado?",
          "opciones": [
            "Absorber los nutrientes y pasarlos a la sangre.",
            "Masticar la comida con los dientes.",
            "Almacenar la orina antes de expulsarla."
          ],
          "respuesta": "A) Absorber los nutrientes y pasarlos a la sangre.",
          "explicacion": "Los nutrientes se absorben en el intestino delgado."
        },
        {
          "enunciado": "¿Dónde se hace el intercambio de oxígeno y dióxido de carbono?",
          "opciones": [
            "En la tráquea",
            "En el esófago",
            "En los alvéolos"
          ],
          "respuesta": "C) En los alvéolos",
          "explicacion": "Los alvéolos permiten el intercambio de gases entre el aire y la sangre."
        },
        {
          "enunciado": "¿Cuántas cámaras tiene el corazón humano?",
          "opciones": [
            "2 cámaras",
            "4 cámaras",
            "3 cámaras"
          ],
          "respuesta": "B) 4 cámaras",
          "explicacion": "Tiene dos aurículas y dos ventrículos."
        },
        {
          "enunciado": "¿Cuál es el vaso sanguíneo que lleva la sangre oxigenada del corazón al resto del cuerpo?",
          "opciones": [
            "Arterias",
            "Venas",
            "Capilares"
          ],
          "respuesta": "A) Arterias",
          "explicacion": "En este recorrido al resto del cuerpo, las arterias llevan la sangre desde el corazón. No todas las arterias llevan siempre sangre oxigenada."
        },
        {
          "enunciado": "¿Cuál es la función de los riñones en el sistema urinario?",
          "opciones": [
            "Bombear la sangre a los pulmones.",
            "Filtrar la sangre para formar la orina.",
            "Producir jugos gástricos para digerir la comida."
          ],
          "respuesta": "B) Filtrar la sangre para formar la orina.",
          "explicacion": "Los riñones filtran desechos y exceso de agua de la sangre."
        },
        {
          "enunciado": "¿Qué pasa con la comida que no se digiere en el intestino grueso?",
          "opciones": [
            "Se absorbe la mayoría del agua y se transforma en heces.",
            "Se absorbe el oxígeno para la sangre.",
            "Se convierte en bilis para ayudar al hígado."
          ],
          "respuesta": "A) Se absorbe la mayoría del agua y se transforma en heces.",
          "explicacion": "En el intestino grueso se absorbe agua de los restos no digeridos y se forman las heces."
        }
      ]
    },
    {
      "id": "conectar",
      "titulo": "3 · Conecta parte y sistema",
      "instruccion": "Conecta cada parte con su sistema: digestivo, respiratorio, circulatorio o excretor. Haz las conexiones en tu cuaderno.",
      "items": [
        {
          "enunciado": "Tráquea",
          "respuesta": "Sistema respiratorio"
        },
        {
          "enunciado": "Riñones",
          "respuesta": "Sistema excretor"
        },
        {
          "enunciado": "Esófago",
          "respuesta": "Sistema digestivo"
        },
        {
          "enunciado": "Arterias",
          "respuesta": "Sistema circulatorio"
        },
        {
          "enunciado": "Intestino delgado",
          "respuesta": "Sistema digestivo"
        },
        {
          "enunciado": "Alvéolo",
          "respuesta": "Sistema respiratorio"
        },
        {
          "enunciado": "Vejiga",
          "respuesta": "Sistema excretor"
        },
        {
          "enunciado": "Venas",
          "respuesta": "Sistema circulatorio"
        }
      ]
    }
  ]
};

mostrarDocumento("science-nutricion-2026-10-19", documento);
