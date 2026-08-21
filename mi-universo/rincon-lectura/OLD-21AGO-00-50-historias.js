/*
========================================================
Las historias de la Academia no fueron escritas
únicamente para enseñar a leer.
Fueron escritas para ayudar a que un niño
descubra todo lo que puede llegar a ser.
========================================================
*/

export const HISTORIAS = [
  {
    id: "estrella-que-tenia-miedo",
    titulo: "La estrella que tenía miedo de brillar",
    idioma: "es-ES",
    idiomaEtiqueta: "Español",
    subtitulo: "Una historia sobre encontrar la propia voz",
    nivel: 1,
    categoria: "Confianza",
    tiempoEstimado: "4 minutos",
    portada: "🌟",
    escena: { fondo: "noche", cielo: "🌙", personaje: "⭐", companera: "🦉" },
    valores: ["Autoestima", "Valentía", "Amistad", "Expresión oral"],
    parrafos: [
      { icono: "🌌", texto: "En un rincón tranquilo del cielo vivía Estela, una estrella pequeña y brillante. Cada noche miraba cómo las demás estrellas iluminaban el bosque." },
      { icono: "⭐", texto: "Estela también quería brillar, pero sentía vergüenza. Pensaba que su luz era demasiado pequeña y que nadie la miraría." },
      { icono: "🦉", texto: "Una noche, una lechuza llamada Lía levantó la mirada y le dijo: «No necesitas brillar como las demás. Tu luz es especial porque es tuya»." },
      { icono: "✨", texto: "Estela respiró despacio y dejó salir un pequeño destello. Después otro. Y otro más. Su luz llegó hasta un sendero oscuro y ayudó a una niña a encontrar el camino de regreso a casa." },
      { icono: "💛", texto: "Entonces Estela comprendió que una luz no tiene que ser enorme para ser importante. Desde aquella noche, cuando sentía vergüenza, recordaba que su voz y su luz también merecían ser vistas." }
    ],
    preguntas: [
      {
        id: "motivo",
        tipo: "opcion",
        texto: "¿Por qué Estela no quería brillar?",
        opciones: ["Porque tenía sueño", "Porque sentía vergüenza", "Porque no le gustaba el cielo"],
        correcta: "Porque sentía vergüenza",
        ayuda: "Vuelve al segundo párrafo y busca cómo se sentía Estela."
      },
      {
        id: "ayuda",
        tipo: "opcion",
        texto: "¿Quién ayudó a Estela a confiar en sí misma?",
        opciones: ["Una niña", "La lechuza Lía", "Otra estrella"],
        correcta: "La lechuza Lía",
        ayuda: "Busca quién levantó la mirada y habló con Estela."
      },
      {
        id: "resultado",
        tipo: "opcion",
        texto: "¿Qué consiguió hacer la luz de Estela?",
        opciones: ["Ayudó a una niña a encontrar el camino", "Apagó todas las estrellas", "Hizo que saliera el sol"],
        correcta: "Ayudó a una niña a encontrar el camino",
        ayuda: "Recuerda lo que ocurrió cuando Estela dejó salir sus destellos."
      },
      { id: "aprendizaje", tipo: "texto", texto: "¿Qué aprendió Estela al final de la historia?" },
      { id: "vida", tipo: "texto", texto: "¿En qué momento te gustaría recordar que tu voz también es importante?" }
    ],
    reflexion: "Sentir vergüenza no significa que no puedas hacerlo. A veces la valentía empieza diciendo una sola palabra.",
    fraseDelDia: "Mi voz también merece ser escuchada."
  },
  {
    id: "puente-de-las-palabras",
    titulo: "El puente de las palabras",
    idioma: "es-ES",
    idiomaEtiqueta: "Español",
    subtitulo: "Una historia para atreverse a conversar",
    nivel: 1,
    categoria: "Conversación",
    tiempoEstimado: "4 minutos",
    portada: "🌉",
    escena: { fondo: "amanecer", cielo: "☀️", personaje: "👧", companera: "👭" },
    valores: ["Amistad", "Conversación", "Confianza"],
    parrafos: [
      { icono: "🏫", texto: "Mara quería hablar con dos niñas nuevas del colegio, pero cada vez que se acercaba sentía que las palabras se escondían." },
      { icono: "💭", texto: "Pensaba que debía decir algo perfecto. Por eso esperaba, esperaba y al final no decía nada." },
      { icono: "🌉", texto: "Su abuelo le explicó que una conversación es como un puente: no se construye de una vez, sino palabra a palabra." },
      { icono: "💬", texto: "Al día siguiente Mara respiró y dijo: «Hola, ¿queréis jugar conmigo?». Las niñas sonrieron y dejaron un espacio para ella." },
      { icono: "😊", texto: "Mara descubrió que no necesitaba una frase perfecta. Solo necesitaba una primera palabra valiente." }
    ],
    preguntas: [
      {
        id: "problema",
        tipo: "opcion",
        texto: "¿Qué le ocurría a Mara cuando quería hablar?",
        opciones: ["Las palabras parecían esconderse", "No podía escuchar", "Se olvidaba del colegio"],
        correcta: "Las palabras parecían esconderse",
        ayuda: "Busca cómo se sentía Mara al acercarse a las niñas."
      },
      {
        id: "consejo",
        tipo: "opcion",
        texto: "¿Con qué comparó el abuelo una conversación?",
        opciones: ["Con una montaña", "Con un puente", "Con una bicicleta"],
        correcta: "Con un puente",
        ayuda: "Recuerda la explicación del abuelo."
      },
      {
        id: "inicio",
        tipo: "opcion",
        texto: "¿Qué frase utilizó Mara para empezar?",
        opciones: ["Hola, ¿queréis jugar conmigo?", "No quiero hablar", "Mañana será otro día"],
        correcta: "Hola, ¿queréis jugar conmigo?",
        ayuda: "Busca la frase entre comillas."
      },
      { id: "aprendizaje", tipo: "texto", texto: "¿Qué aprendió Mara sobre las conversaciones?" },
      { id: "vida", tipo: "texto", texto: "¿Qué frase sencilla podrías usar tú para comenzar una conversación?" }
    ],
    reflexion: "Para conversar no necesitas decir algo perfecto. Un saludo y una pregunta sencilla pueden construir el primer tramo del puente.",
    fraseDelDia: "Puedo empezar con una sola palabra."
  },
  {
    id: "robot-que-decia-todavia",
    titulo: "El robot que aprendió a decir «todavía»",
    idioma: "es-ES",
    idiomaEtiqueta: "Español",
    subtitulo: "Una historia sobre intentarlo de nuevo",
    nivel: 2,
    categoria: "Perseverancia",
    tiempoEstimado: "5 minutos",
    portada: "🤖",
    escena: { fondo: "laboratorio", cielo: "⚙️", personaje: "🤖", companera: "👩‍🔬" },
    valores: ["Perseverancia", "Aprendizaje", "Motivación"],
    parrafos: [
      { icono: "🤖", texto: "Tiko era un pequeño robot que quería aprender a dibujar círculos. El primero parecía una patata y el segundo, una nube torcida." },
      { icono: "😞", texto: "Cada vez que fallaba decía: «No puedo hacerlo». Entonces guardaba el lápiz y apagaba sus luces." },
      { icono: "👩‍🔬", texto: "La inventora que lo había construido le enseñó una palabra nueva: «todavía». No puedo hacerlo... todavía." },
      { icono: "✏️", texto: "Tiko volvió a intentarlo. Dibujó muchos círculos extraños, pero cada uno era un poco más redondo que el anterior." },
      { icono: "🌟", texto: "Al final no hizo un círculo perfecto, pero sí uno del que se sintió orgulloso. Comprendió que aprender significa avanzar, no acertar a la primera." }
    ],
    preguntas: [
      {
        id: "objetivo",
        tipo: "opcion",
        texto: "¿Qué quería aprender Tiko?",
        opciones: ["A dibujar círculos", "A cocinar", "A volar"],
        correcta: "A dibujar círculos",
        ayuda: "Busca la primera frase de la historia."
      },
      {
        id: "palabra",
        tipo: "opcion",
        texto: "¿Qué palabra nueva aprendió Tiko?",
        opciones: ["Nunca", "Todavía", "Imposible"],
        correcta: "Todavía",
        ayuda: "La inventora le enseñó una palabra que cambiaba el sentido de «no puedo»."
      },
      {
        id: "final",
        tipo: "opcion",
        texto: "¿Qué comprendió Tiko al final?",
        opciones: ["Que aprender significa avanzar", "Que debía dejar de dibujar", "Que solo vale lo perfecto"],
        correcta: "Que aprender significa avanzar",
        ayuda: "Vuelve al último párrafo."
      },
      { id: "aprendizaje", tipo: "texto", texto: "¿Por qué la palabra «todavía» puede ayudarnos?" },
      { id: "vida", tipo: "texto", texto: "Completa esta frase: «Todavía no me sale..., pero puedo aprender»." }
    ],
    reflexion: "Decir «todavía» deja una puerta abierta. No significa que algo sea fácil; significa que puedes seguir aprendiendo.",
    fraseDelDia: "Todavía no me sale, pero sí puedo aprender."
  }
,
  {
    id: "little-lion-finds-his-voice",
    titulo: "The little lion who found his voice",
    idioma: "en-GB",
    idiomaEtiqueta: "English",
    subtitulo: "A story about speaking with confidence",
    nivel: 1,
    categoria: "Confidence",
    tiempoEstimado: "4 minutes",
    portada: "🦁",
    escena: { fondo: "amanecer", cielo: "☀️", personaje: "🦁", companera: "🦜" },
    valores: ["Confidence", "Courage", "Conversation"],
    parrafos: [
      { icono: "🌿", texto: "Leo was a young lion who loved listening to the sounds of the forest. He could hear birds, monkeys and the wind in the trees." },
      { icono: "🦁", texto: "But when Leo wanted to speak, his voice became very small. He worried that the other animals would laugh." },
      { icono: "🦜", texto: "One morning, a colourful parrot said, «Your voice does not need to be loud. It only needs to be yours»." },
      { icono: "💬", texto: "Leo took a slow breath and said, «Hello». A rabbit smiled. Then Leo asked, «Would you like to play?»." },
      { icono: "🌟", texto: "That day, Leo learned that confidence can begin with one simple word." }
    ],
    preguntas: [
      {
        id: "feeling",
        tipo: "opcion",
        texto: "Why was Leo afraid to speak?",
        opciones: ["He was tired", "He worried others would laugh", "He did not like the forest"],
        correcta: "He worried others would laugh",
        ayuda: "Read the second paragraph again."
      },
      {
        id: "helper",
        tipo: "opcion",
        texto: "Who helped Leo?",
        opciones: ["A parrot", "A tiger", "A monkey"],
        correcta: "A parrot",
        ayuda: "Look for the colourful animal."
      },
      {
        id: "first-word",
        tipo: "opcion",
        texto: "What was Leo's first word?",
        opciones: ["Goodbye", "Hello", "Please"],
        correcta: "Hello",
        ayuda: "Find the word between quotation marks."
      },
      { id: "learning", tipo: "texto", texto: "What did Leo learn?" },
      { id: "life", tipo: "texto", texto: "What simple English phrase could you use to start a conversation?" }
    ],
    reflexion: "You do not need a perfect sentence to begin. One friendly word can open a conversation.",
    fraseDelDia: "My voice is important."
  },
  {
    id: "mia-and-the-brave-question",
    titulo: "Mia and the brave question",
    idioma: "en-GB",
    idiomaEtiqueta: "English",
    subtitulo: "A story about asking when we need help",
    nivel: 1,
    categoria: "Courage",
    tiempoEstimado: "4 minutes",
    portada: "🙋‍♀️",
    escena: { fondo: "laboratorio", cielo: "📚", personaje: "👧", companera: "👩‍🏫" },
    valores: ["Courage", "Learning", "Self-confidence"],
    parrafos: [
      { icono: "🏫", texto: "Mia was learning a new game in class, but she did not understand one of the rules." },
      { icono: "🤔", texto: "She looked around. Everyone else seemed ready, so Mia felt embarrassed to ask." },
      { icono: "💡", texto: "Then she remembered something her mother often said: asking a question is a clever way to learn." },
      { icono: "🙋‍♀️", texto: "Mia raised her hand and asked, «Can you explain that again, please?»." },
      { icono: "😊", texto: "The teacher smiled and explained the rule. Two other children said they had the same question. Mia felt proud that she had been brave enough to ask." }
    ],
    preguntas: [
      {
        id: "problem",
        tipo: "opcion",
        texto: "What did Mia not understand?",
        opciones: ["A rule", "A song", "A picture"],
        correcta: "A rule",
        ayuda: "Read the first paragraph again."
      },
      {
        id: "memory",
        tipo: "opcion",
        texto: "What did Mia remember?",
        opciones: ["Questions help us learn", "She should go home", "The game was finished"],
        correcta: "Questions help us learn",
        ayuda: "Look for what her mother often said."
      },
      {
        id: "result",
        tipo: "opcion",
        texto: "How did Mia feel at the end?",
        opciones: ["Proud", "Angry", "Bored"],
        correcta: "Proud",
        ayuda: "Read the last sentence."
      },
      { id: "learning", tipo: "texto", texto: "Why can asking a question be brave?" },
      { id: "life", tipo: "texto", texto: "Write one English question you can use when you need help." }
    ],
    reflexion: "Asking for help is not a weakness. It is a smart and brave step towards learning.",
    fraseDelDia: "I am brave enough to ask."
  },
{
    "id": "mochila-de-los-pequenos-pasos",
    "titulo": "La mochila de los pequeños pasos",
    "idioma": "es-ES",
    "idiomaEtiqueta": "Español",
    "subtitulo": "Una historia sobre organizarse sin agobiarse",
    "nivel": 1,
    "categoria": "Organización",
    "tiempoEstimado": "4 minutos",
    "portada": "🎒",
    "escena": {
      "fondo": "colegio",
      "cielo": "☀️",
      "personaje": "👧",
      "companera": "🐦"
    },
    "valores": [
      "Organización",
      "Calma",
      "Autonomía"
    ],
    "parrafos": [
      {
        "icono": "🎒",
        "texto": "Clara miró su mochila y pensó que tenía demasiadas cosas por hacer: guardar los libros, preparar el estuche y terminar un dibujo."
      },
      {
        "icono": "😟",
        "texto": "Quiso hacerlo todo al mismo tiempo y empezó a sentirse nerviosa. No sabía por dónde comenzar."
      },
      {
        "icono": "🐦",
        "texto": "Un pajarito se posó en la ventana y fue llevando ramitas a su nido, una por una. Clara lo observó y tuvo una idea."
      },
      {
        "icono": "✅",
        "texto": "Primero guardó los libros, después preparó el estuche y al final terminó el dibujo. Cada pequeño paso hacía que la mochila se sintiera más ligera."
      },
      {
        "icono": "🌟",
        "texto": "Clara comprendió que no necesitaba resolverlo todo de golpe. Cuando dividía una tarea en pasos, podía avanzar con más calma."
      }
    ],
    "preguntas": [
      {
        "id": "problema",
        "tipo": "opcion",
        "texto": "¿Por qué Clara se sintió nerviosa?",
        "opciones": [
          "Porque quería hacerlo todo al mismo tiempo",
          "Porque perdió la mochila",
          "Porque no tenía libros"
        ],
        "correcta": "Porque quería hacerlo todo al mismo tiempo",
        "ayuda": "Busca qué intentó hacer Clara al principio."
      },
      {
        "id": "idea",
        "tipo": "opcion",
        "texto": "¿Qué le dio una idea a Clara?",
        "opciones": [
          "Un pajarito construyendo su nido",
          "Una canción",
          "Una bicicleta"
        ],
        "correcta": "Un pajarito construyendo su nido",
        "ayuda": "Recuerda qué vio en la ventana."
      },
      {
        "id": "orden",
        "tipo": "opcion",
        "texto": "¿Qué hizo primero?",
        "opciones": [
          "Guardó los libros",
          "Terminó el dibujo",
          "Salió a jugar"
        ],
        "correcta": "Guardó los libros",
        "ayuda": "Vuelve al cuarto párrafo."
      },
      {
        "id": "aprendizaje",
        "tipo": "texto",
        "texto": "¿Qué aprendió Clara sobre las tareas grandes?"
      },
      {
        "id": "vida",
        "tipo": "texto",
        "texto": "Escribe una tarea que puedas dividir en pequeños pasos."
      }
    ],
    "reflexion": "Cuando algo parece grande, puedes convertirlo en varios pasos pequeños. Cada paso cuenta.",
    "fraseDelDia": "Paso a paso puedo avanzar."
  },
  {
    "id": "nube-que-escuchaba",
    "titulo": "La nube que aprendió a escuchar",
    "idioma": "es-ES",
    "idiomaEtiqueta": "Español",
    "subtitulo": "Una historia sobre escuchar antes de responder",
    "nivel": 1,
    "categoria": "Conversación",
    "tiempoEstimado": "4 minutos",
    "portada": "☁️",
    "escena": {
      "fondo": "cielo",
      "cielo": "🌤️",
      "personaje": "☁️",
      "companera": "🌳"
    },
    "valores": [
      "Escucha",
      "Respeto",
      "Amistad"
    ],
    "parrafos": [
      {
        "icono": "☁️",
        "texto": "Nuba era una nube alegre que hablaba sin parar. Siempre tenía una historia, una idea o una pregunta."
      },
      {
        "icono": "🌳",
        "texto": "Un día, el viejo árbol quiso contarle que una de sus ramas estaba triste, pero Nuba lo interrumpió varias veces."
      },
      {
        "icono": "🤫",
        "texto": "El viento le susurró: «Escuchar también es una forma de cuidar». Nuba decidió quedarse en silencio un momento."
      },
      {
        "icono": "👂",
        "texto": "Entonces oyó toda la historia del árbol. Comprendió cómo se sentía y dejó caer una lluvia suave sobre la rama seca."
      },
      {
        "icono": "💚",
        "texto": "Desde aquel día, Nuba siguió contando historias, pero aprendió a dejar espacio para las palabras de los demás."
      }
    ],
    "preguntas": [
      {
        "id": "costumbre",
        "tipo": "opcion",
        "texto": "¿Qué hacía Nuba con frecuencia?",
        "opciones": [
          "Hablaba sin parar",
          "Dormía todo el día",
          "Se escondía"
        ],
        "correcta": "Hablaba sin parar",
        "ayuda": "Busca cómo era Nuba al comienzo."
      },
      {
        "id": "problema",
        "tipo": "opcion",
        "texto": "¿Qué hizo cuando el árbol intentó hablar?",
        "opciones": [
          "Lo interrumpió",
          "Lo abrazó",
          "Se fue"
        ],
        "correcta": "Lo interrumpió",
        "ayuda": "Lee el segundo párrafo."
      },
      {
        "id": "consejo",
        "tipo": "opcion",
        "texto": "¿Qué le enseñó el viento?",
        "opciones": [
          "Escuchar también es cuidar",
          "Las nubes no hablan",
          "La lluvia siempre molesta"
        ],
        "correcta": "Escuchar también es cuidar",
        "ayuda": "Busca la frase entre comillas."
      },
      {
        "id": "aprendizaje",
        "tipo": "texto",
        "texto": "¿Por qué escuchar ayudó a Nuba a comprender al árbol?"
      },
      {
        "id": "vida",
        "tipo": "texto",
        "texto": "¿Qué puedes hacer para demostrar que estás escuchando a alguien?"
      }
    ],
    "reflexion": "Escuchar con atención ayuda a comprender lo que otra persona piensa y siente.",
    "fraseDelDia": "Escuchar también es cuidar."
  },
  {
    "id": "farol-de-las-preguntas",
    "titulo": "El farol de las preguntas",
    "idioma": "es-ES",
    "idiomaEtiqueta": "Español",
    "subtitulo": "Una historia sobre pedir ayuda con confianza",
    "nivel": 1,
    "categoria": "Confianza",
    "tiempoEstimado": "4 minutos",
    "portada": "🏮",
    "escena": {
      "fondo": "noche",
      "cielo": "🌙",
      "personaje": "👦",
      "companera": "👵"
    },
    "valores": [
      "Confianza",
      "Aprendizaje",
      "Valentía"
    ],
    "parrafos": [
      {
        "icono": "📘",
        "texto": "Tomás intentaba resolver una actividad, pero había una palabra que no entendía."
      },
      {
        "icono": "😕",
        "texto": "Pensó en quedarse callado porque le daba vergüenza preguntar delante de los demás."
      },
      {
        "icono": "🏮",
        "texto": "Su abuela le había dicho que cada pregunta es como encender un farol en un camino oscuro."
      },
      {
        "icono": "🙋",
        "texto": "Tomás levantó la mano y preguntó qué significaba aquella palabra. La maestra se la explicó con un ejemplo sencillo."
      },
      {
        "icono": "✨",
        "texto": "La actividad dejó de parecer difícil. Tomás descubrió que preguntar no apagaba su inteligencia: la ayudaba a brillar."
      }
    ],
    "preguntas": [
      {
        "id": "dificultad",
        "tipo": "opcion",
        "texto": "¿Qué no entendía Tomás?",
        "opciones": [
          "Una palabra",
          "Un dibujo",
          "Una canción"
        ],
        "correcta": "Una palabra",
        "ayuda": "Lee el primer párrafo."
      },
      {
        "id": "sentimiento",
        "tipo": "opcion",
        "texto": "¿Por qué no quería preguntar?",
        "opciones": [
          "Sentía vergüenza",
          "Tenía sueño",
          "Ya sabía la respuesta"
        ],
        "correcta": "Sentía vergüenza",
        "ayuda": "Busca cómo se sentía."
      },
      {
        "id": "comparacion",
        "tipo": "opcion",
        "texto": "¿Con qué comparaba la abuela una pregunta?",
        "opciones": [
          "Con un farol",
          "Con una puerta cerrada",
          "Con una tormenta"
        ],
        "correcta": "Con un farol",
        "ayuda": "Recuerda la enseñanza de la abuela."
      },
      {
        "id": "aprendizaje",
        "tipo": "texto",
        "texto": "¿Qué descubrió Tomás al preguntar?"
      },
      {
        "id": "vida",
        "tipo": "texto",
        "texto": "Escribe una pregunta que podrías hacer cuando no entiendes algo."
      }
    ],
    "reflexion": "Pedir una explicación es una forma inteligente y valiente de seguir aprendiendo.",
    "fraseDelDia": "Mis preguntas iluminan mi aprendizaje."
  },
  {
    "id": "jardin-de-las-decisiones",
    "titulo": "El jardín de las decisiones",
    "idioma": "es-ES",
    "idiomaEtiqueta": "Español",
    "subtitulo": "Una historia sobre pensar antes de elegir",
    "nivel": 2,
    "categoria": "Autonomía",
    "tiempoEstimado": "5 minutos",
    "portada": "🌷",
    "escena": {
      "fondo": "jardin",
      "cielo": "☀️",
      "personaje": "👧",
      "companera": "🦋"
    },
    "valores": [
      "Autonomía",
      "Responsabilidad",
      "Reflexión"
    ],
    "parrafos": [
      {
        "icono": "🌱",
        "texto": "Elena recibió tres semillas y un pequeño espacio en el jardín. Podía plantarlas donde quisiera, pero cada lugar tenía ventajas y dificultades."
      },
      {
        "icono": "☀️",
        "texto": "La zona soleada daba mucha luz, aunque la tierra se secaba pronto. Cerca del árbol había sombra, pero también raíces grandes."
      },
      {
        "icono": "🦋",
        "texto": "Una mariposa le aconsejó observar antes de decidir. Elena tocó la tierra, miró el recorrido del sol y preguntó cuánto crecía cada planta."
      },
      {
        "icono": "💧",
        "texto": "Finalmente eligió una zona con luz por la mañana y sombra por la tarde. También preparó un pequeño canal para conservar el agua."
      },
      {
        "icono": "🌷",
        "texto": "Semanas después brotaron las tres plantas. Elena comprendió que una buena decisión no siempre es la más rápida, sino la que considera la información disponible."
      }
    ],
    "preguntas": [
      {
        "id": "reto",
        "tipo": "opcion",
        "texto": "¿Qué debía decidir Elena?",
        "opciones": [
          "Dónde plantar las semillas",
          "Qué libro leer",
          "A qué hora dormir"
        ],
        "correcta": "Dónde plantar las semillas",
        "ayuda": "Busca el reto del primer párrafo."
      },
      {
        "id": "observacion",
        "tipo": "opcion",
        "texto": "¿Qué hizo antes de elegir?",
        "opciones": [
          "Observó la tierra y la luz",
          "Plantó sin mirar",
          "Regaló las semillas"
        ],
        "correcta": "Observó la tierra y la luz",
        "ayuda": "Lee el tercer párrafo."
      },
      {
        "id": "eleccion",
        "tipo": "opcion",
        "texto": "¿Qué lugar escogió?",
        "opciones": [
          "Luz por la mañana y sombra por la tarde",
          "Oscuridad todo el día",
          "Dentro de una caja"
        ],
        "correcta": "Luz por la mañana y sombra por la tarde",
        "ayuda": "Vuelve al cuarto párrafo."
      },
      {
        "id": "aprendizaje",
        "tipo": "texto",
        "texto": "¿Qué características tiene una buena decisión según la historia?"
      },
      {
        "id": "vida",
        "tipo": "texto",
        "texto": "Describe una decisión en la que te convenga observar y pensar antes de actuar."
      }
    ],
    "reflexion": "Tomarse un momento para observar, preguntar y comparar ayuda a elegir con más seguridad.",
    "fraseDelDia": "Puedo pensar antes de elegir."
  },
  {
    "id": "orquesta-de-las-emociones",
    "titulo": "La orquesta de las emociones",
    "idioma": "es-ES",
    "idiomaEtiqueta": "Español",
    "subtitulo": "Una historia sobre reconocer y regular lo que sentimos",
    "nivel": 2,
    "categoria": "Emociones",
    "tiempoEstimado": "5 minutos",
    "portada": "🎻",
    "escena": {
      "fondo": "teatro",
      "cielo": "🎵",
      "personaje": "👧",
      "companera": "🎼"
    },
    "valores": [
      "Autoconocimiento",
      "Calma",
      "Expresión emocional"
    ],
    "parrafos": [
      {
        "icono": "🎻",
        "texto": "Alicia imaginaba que sus emociones formaban una orquesta. La alegría tocaba una flauta ligera y la tristeza, un violonchelo profundo."
      },
      {
        "icono": "🥁",
        "texto": "Cuando se enfadaba, el tambor sonaba tan fuerte que parecía cubrir todos los demás instrumentos."
      },
      {
        "icono": "🎼",
        "texto": "Su profesora de música le explicó que dirigir una orquesta no significa silenciar instrumentos, sino ayudar a que cada uno encuentre su momento y su volumen."
      },
      {
        "icono": "🌬️",
        "texto": "La siguiente vez que se enfadó, Alicia respiró lentamente, nombró lo que sentía y pidió unos minutos antes de responder."
      },
      {
        "icono": "🎶",
        "texto": "El tambor seguía allí, pero ya no dominaba toda la canción. Alicia aprendió que podía escuchar sus emociones sin dejar que una sola decidiera por ella."
      }
    ],
    "preguntas": [
      {
        "id": "metafora",
        "tipo": "opcion",
        "texto": "¿Con qué comparaba Alicia sus emociones?",
        "opciones": [
          "Con una orquesta",
          "Con una carrera",
          "Con una biblioteca"
        ],
        "correcta": "Con una orquesta",
        "ayuda": "Lee el primer párrafo."
      },
      {
        "id": "enfado",
        "tipo": "opcion",
        "texto": "¿Qué instrumento representaba el enfado?",
        "opciones": [
          "El tambor",
          "La flauta",
          "El violonchelo"
        ],
        "correcta": "El tambor",
        "ayuda": "Busca el instrumento que sonaba muy fuerte."
      },
      {
        "id": "estrategia",
        "tipo": "opcion",
        "texto": "¿Qué hizo Alicia para regularse?",
        "opciones": [
          "Respiró, nombró lo que sentía y pidió tiempo",
          "Gritó más fuerte",
          "Ignoró todo"
        ],
        "correcta": "Respiró, nombró lo que sentía y pidió tiempo",
        "ayuda": "Vuelve al cuarto párrafo."
      },
      {
        "id": "aprendizaje",
        "tipo": "texto",
        "texto": "¿Qué significa escuchar una emoción sin dejar que decida por ti?"
      },
      {
        "id": "vida",
        "tipo": "texto",
        "texto": "¿Qué estrategia puedes usar cuando una emoción se siente muy fuerte?"
      }
    ],
    "reflexion": "Todas las emociones pueden decirnos algo. Regularlas no es esconderlas, sino escucharlas y elegir cómo actuar.",
    "fraseDelDia": "Puedo escuchar lo que siento y elegir mi respuesta."
  },
  {
    "id": "mapa-de-las-voces",
    "titulo": "El mapa de las voces",
    "idioma": "es-ES",
    "idiomaEtiqueta": "Español",
    "subtitulo": "Una historia sobre comprender distintos puntos de vista",
    "nivel": 3,
    "categoria": "Empatía",
    "tiempoEstimado": "6 minutos",
    "portada": "🗺️",
    "escena": {
      "fondo": "pueblo",
      "cielo": "🌤️",
      "personaje": "👧",
      "companera": "🧭"
    },
    "valores": [
      "Empatía",
      "Pensamiento crítico",
      "Diálogo"
    ],
    "parrafos": [
      {
        "icono": "🗺️",
        "texto": "En el pueblo de Valleverde querían construir un nuevo parque. El ayuntamiento pidió a los vecinos que señalaran en un mapa el mejor lugar."
      },
      {
        "icono": "👧",
        "texto": "Lara eligió una plaza cercana a su casa porque podría ir caminando. Pensó que todos estarían de acuerdo con ella."
      },
      {
        "icono": "🧓",
        "texto": "Sin embargo, una vecina mayor explicó que aquella plaza tenía muchas escaleras. Un padre comentó que la zona junto a la carretera era ruidosa, y unos niños pequeños pidieron árboles que dieran sombra."
      },
      {
        "icono": "🧭",
        "texto": "Lara empezó a dibujar no solo lugares, sino también las necesidades de cada persona. Descubrió que cada opinión mostraba una parte diferente del problema."
      },
      {
        "icono": "🌳",
        "texto": "El grupo eligió finalmente un terreno accesible, tranquilo y con espacio para plantar árboles. Lara comprendió que escuchar distintos puntos de vista no debilita una idea: puede hacerla más completa y justa."
      }
    ],
    "preguntas": [
      {
        "id": "proyecto",
        "tipo": "opcion",
        "texto": "¿Qué quería construir el pueblo?",
        "opciones": [
          "Un parque",
          "Un aeropuerto",
          "Una fábrica"
        ],
        "correcta": "Un parque",
        "ayuda": "Busca el proyecto del primer párrafo."
      },
      {
        "id": "primera-eleccion",
        "tipo": "opcion",
        "texto": "¿Por qué Lara eligió la plaza cercana a su casa?",
        "opciones": [
          "Porque podía ir caminando",
          "Porque tenía una piscina",
          "Porque nadie la usaba"
        ],
        "correcta": "Porque podía ir caminando",
        "ayuda": "Lee el segundo párrafo."
      },
      {
        "id": "cambio",
        "tipo": "opcion",
        "texto": "¿Qué hizo Lara después de escuchar a los demás?",
        "opciones": [
          "Anotó sus necesidades en el mapa",
          "Rompió el mapa",
          "Ignoró las opiniones"
        ],
        "correcta": "Anotó sus necesidades en el mapa",
        "ayuda": "Vuelve al cuarto párrafo."
      },
      {
        "id": "inferencia",
        "tipo": "texto",
        "texto": "¿Por qué la primera propuesta de Lara no atendía a todas las personas?"
      },
      {
        "id": "reflexion",
        "tipo": "texto",
        "texto": "Explica cómo escuchar varios puntos de vista puede mejorar una decisión."
      }
    ],
    "reflexion": "Una situación puede verse de maneras diferentes. Escuchar otras voces nos ayuda a construir soluciones más completas.",
    "fraseDelDia": "Cada voz puede mostrar una parte del mapa."
  }
];
