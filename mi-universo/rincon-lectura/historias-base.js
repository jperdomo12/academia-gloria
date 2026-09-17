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
,
{
  "id": "brujula-de-europa",
  "titulo": "La brújula de Europa",
  "idioma": "es-ES",
  "idiomaEtiqueta": "Español",
  "subtitulo": "Una aventura para recordar dónde está Europa",
  "nivel": 2,
  "categoria": "Geografía",
  "tiempoEstimado": "5 minutos",
  "portada": "🧭",
  "escena": {
    "fondo": "mapa",
    "cielo": "🧭",
    "personaje": "👧",
    "companera": "🗺️"
  },
  "valores": [
    "Curiosidad",
    "Orientación espacial",
    "Atención"
  ],
  "parrafos": [
    {
      "icono": "🗺️",
      "texto": "Nora abrió un gran mapa en la mesa y colocó una brújula en el centro. Su reto era encontrar los cuatro límites principales de Europa sin memorizar una lista de golpe."
    },
    {
      "icono": "⬆️",
      "texto": "Miró hacia el norte y encontró el océano Glacial Ártico. Después bajó la mirada hacia el sur, donde el mar Mediterráneo parecía una larga franja azul."
    },
    {
      "icono": "⬅️",
      "texto": "Al oeste escribió «océano Atlántico». Al este colocó dos tarjetas: «Montes Urales» y «mar Caspio»."
    },
    {
      "icono": "🧭",
      "texto": "Nora giró la brújula varias veces y repitió los límites siguiendo siempre el mismo orden: norte, sur, oeste y este."
    },
    {
      "icono": "🌍",
      "texto": "Al final comprendió que orientarse en un mapa era más fácil cuando relacionaba cada lugar con una dirección y una imagen."
    }
  ],
  "preguntas": [
    {
      "id": "norte",
      "tipo": "opcion",
      "texto": "¿Qué límite encontró Nora al norte?",
      "opciones": [
        "Océano Glacial Ártico",
        "Mar Mediterráneo",
        "Océano Atlántico"
      ],
      "correcta": "Océano Glacial Ártico",
      "ayuda": "Vuelve al segundo párrafo y busca la dirección norte."
    },
    {
      "id": "oeste",
      "tipo": "opcion",
      "texto": "¿Qué escribió al oeste?",
      "opciones": [
        "Océano Atlántico",
        "Montes Urales",
        "Mar Caspio"
      ],
      "correcta": "Océano Atlántico",
      "ayuda": "Busca el párrafo que empieza hablando del oeste."
    },
    {
      "id": "este",
      "tipo": "opcion",
      "texto": "¿Qué dos referencias colocó al este?",
      "opciones": [
        "Montes Urales y mar Caspio",
        "Pirineos y Alpes",
        "Ártico y Mediterráneo"
      ],
      "correcta": "Montes Urales y mar Caspio",
      "ayuda": "Mira las dos tarjetas del tercer párrafo."
    },
    {
      "id": "estrategia",
      "tipo": "texto",
      "texto": "¿Qué estrategia utilizó Nora para recordar los límites de Europa?"
    },
    {
      "id": "mapa",
      "tipo": "texto",
      "texto": "Si dibujaras tu propia brújula de Europa, ¿qué pondrías arriba, abajo, a la izquierda y a la derecha?"
    }
  ],
  "reflexion": "Un mapa se recuerda mejor cuando relacionamos nombres, direcciones e imágenes.",
  "fraseDelDia": "Puedo orientarme paso a paso.",
  "apoyoVisual": {
    "titulo": "🧭 Brújula visual de Europa",
    "subtitulo": "Relaciona cada dirección con su límite.",
    "items": [
      {
        "icono": "⬆️",
        "etiqueta": "Norte",
        "texto": "Océano Glacial Ártico",
        "tono": "sky"
      },
      {
        "icono": "⬇️",
        "etiqueta": "Sur",
        "texto": "Mar Mediterráneo",
        "tono": "amber"
      },
      {
        "icono": "⬅️",
        "etiqueta": "Oeste",
        "texto": "Océano Atlántico",
        "tono": "blue"
      },
      {
        "icono": "➡️",
        "etiqueta": "Este",
        "texto": "Montes Urales · mar Caspio",
        "tono": "violet"
      }
    ],
    "frase": "Norte Ártico · Sur Mediterráneo · Oeste Atlántico · Este Urales y Caspio."
  }
},
{
  "id": "montanas-que-cambian-de-forma",
  "titulo": "Las montañas que cambian de forma",
  "idioma": "es-ES",
  "idiomaEtiqueta": "Español",
  "subtitulo": "Un viaje por el relieve del norte y del sur de Europa",
  "nivel": 2,
  "categoria": "Geografía",
  "tiempoEstimado": "5 minutos",
  "portada": "⛰️",
  "escena": {
    "fondo": "montana",
    "cielo": "☀️",
    "personaje": "🥾",
    "companera": "⛰️"
  },
  "valores": [
    "Observación",
    "Comparación",
    "Curiosidad"
  ],
  "parrafos": [
    {
      "icono": "🥾",
      "texto": "Leo recorrió una maqueta de Europa con su dedo. Primero llegó a las montañas del norte y notó que parecían más bajas y redondeadas."
    },
    {
      "icono": "🪨",
      "texto": "La guía señaló los Montes Escandinavos y los Montes Urales como ejemplos de esas montañas del norte."
    },
    {
      "icono": "⛰️",
      "texto": "Después Leo viajó hacia el sur del mapa. Allí encontró montañas más elevadas: Pirineos, Alpes, Cárpatos, Balcanes y Cáucaso."
    },
    {
      "icono": "🔎",
      "texto": "Leo comparó las dos zonas y escribió una pista sencilla: «norte, más bajo y redondeado; sur, más alto»."
    },
    {
      "icono": "🌍",
      "texto": "Al terminar, entendió que comparar formas y alturas podía ayudarle a recordar el relieve sin aprender nombres aislados."
    }
  ],
  "preguntas": [
    {
      "id": "norte",
      "tipo": "opcion",
      "texto": "¿Cómo eran las montañas del norte en la maqueta?",
      "opciones": [
        "Más bajas y redondeadas",
        "Más altas y puntiagudas",
        "Completamente planas"
      ],
      "correcta": "Más bajas y redondeadas",
      "ayuda": "Busca la descripción del primer párrafo."
    },
    {
      "id": "ejemplos-norte",
      "tipo": "opcion",
      "texto": "¿Qué ejemplos aparecen en el norte?",
      "opciones": [
        "Montes Escandinavos y Urales",
        "Pirineos y Alpes",
        "Cárpatos y Balcanes"
      ],
      "correcta": "Montes Escandinavos y Urales",
      "ayuda": "Vuelve al segundo párrafo."
    },
    {
      "id": "sur",
      "tipo": "opcion",
      "texto": "¿Qué descubrió Leo en el sur?",
      "opciones": [
        "Montañas más elevadas",
        "Solo llanuras",
        "Ninguna montaña"
      ],
      "correcta": "Montañas más elevadas",
      "ayuda": "Lee el tercer párrafo."
    },
    {
      "id": "comparacion",
      "tipo": "texto",
      "texto": "Explica con tus palabras una diferencia entre las montañas del norte y las del sur."
    },
    {
      "id": "memoria",
      "tipo": "texto",
      "texto": "¿Qué imagen o frase usarías para recordar esa diferencia?"
    }
  ],
  "reflexion": "Comparar dos ideas ayuda a ver lo que cambia y lo que permanece.",
  "fraseDelDia": "Comparar me ayuda a comprender.",
  "apoyoVisual": {
    "titulo": "⛰️ Norte y sur: compáralos",
    "subtitulo": "Dos imágenes mentales para recordar el relieve.",
    "items": [
      {
        "icono": "🌿",
        "etiqueta": "Norte",
        "texto": "Montañas de poca altura y formas redondeadas",
        "tono": "green"
      },
      {
        "icono": "🪨",
        "etiqueta": "Ejemplos",
        "texto": "Montes Escandinavos · Montes Urales",
        "tono": "sky"
      },
      {
        "icono": "🏔️",
        "etiqueta": "Sur",
        "texto": "Montañas más elevadas",
        "tono": "amber"
      },
      {
        "icono": "📍",
        "etiqueta": "Ejemplos",
        "texto": "Pirineos · Alpes · Cárpatos · Balcanes · Cáucaso",
        "tono": "violet"
      }
    ],
    "frase": "Norte: más bajo y redondeado. Sur: más elevado."
  }
},
{
  "id": "llanura-del-centro",
  "titulo": "La gran llanura del centro",
  "idioma": "es-ES",
  "idiomaEtiqueta": "Español",
  "subtitulo": "Una historia para descubrir dónde se extienden las llanuras europeas",
  "nivel": 2,
  "categoria": "Geografía",
  "tiempoEstimado": "5 minutos",
  "portada": "🟩",
  "escena": {
    "fondo": "mapa",
    "cielo": "🌤️",
    "personaje": "🚲",
    "companera": "🟩"
  },
  "valores": [
    "Curiosidad",
    "Atención",
    "Organización visual"
  ],
  "parrafos": [
    {
      "icono": "🚲",
      "texto": "En un mapa imaginario, Vera viajaba en bicicleta desde el oeste hacia el este de Europa. De pronto, el terreno dejó de parecer montañoso y se volvió mucho más amplio."
    },
    {
      "icono": "🟩",
      "texto": "Su profesor le explicó que las grandes llanuras europeas se extienden sobre todo por el centro y el este del continente."
    },
    {
      "icono": "🗺️",
      "texto": "En la ruta aparecieron dos nombres importantes: Gran Llanura Europea y Llanura de Europa Oriental."
    },
    {
      "icono": "🪨",
      "texto": "Vera también encontró macizos como el Macizo Central, los Vosgos y la Selva Negra, que rompían la idea de que todo era completamente plano."
    },
    {
      "icono": "💡",
      "texto": "Al final dibujó una gran franja verde en el centro y el este del mapa. Esa imagen le ayudó a ordenar la información."
    }
  ],
  "preguntas": [
    {
      "id": "zona",
      "tipo": "opcion",
      "texto": "¿Dónde se extienden sobre todo las grandes llanuras?",
      "opciones": [
        "Centro y este de Europa",
        "Solo en el norte",
        "Solo junto al Mediterráneo"
      ],
      "correcta": "Centro y este de Europa",
      "ayuda": "Busca la explicación del profesor."
    },
    {
      "id": "nombres",
      "tipo": "opcion",
      "texto": "¿Qué dos llanuras importantes aparecen?",
      "opciones": [
        "Gran Llanura Europea y Llanura de Europa Oriental",
        "Pirineos y Alpes",
        "Urales y Cáucaso"
      ],
      "correcta": "Gran Llanura Europea y Llanura de Europa Oriental",
      "ayuda": "Vuelve al tercer párrafo."
    },
    {
      "id": "macizos",
      "tipo": "opcion",
      "texto": "¿Qué descubrió Vera además de las llanuras?",
      "opciones": [
        "Macizos",
        "Volcanes en todas partes",
        "Desiertos"
      ],
      "correcta": "Macizos",
      "ayuda": "Lee el cuarto párrafo."
    },
    {
      "id": "dibujo",
      "tipo": "texto",
      "texto": "¿Por qué crees que Vera dibujó una franja verde en el mapa?"
    },
    {
      "id": "resumen",
      "tipo": "texto",
      "texto": "Resume en una frase dónde situarías las grandes llanuras de Europa."
    }
  ],
  "reflexion": "Convertir una idea en una imagen sencilla puede hacerla más fácil de recordar.",
  "fraseDelDia": "Puedo transformar información en un mapa mental.",
  "apoyoVisual": {
    "titulo": "🗺️ Mapa mental de las llanuras",
    "subtitulo": "Piensa en una gran franja que cruza el centro y el este.",
    "items": [
      {
        "icono": "🟩",
        "etiqueta": "Zona principal",
        "texto": "Centro y este de Europa",
        "tono": "green"
      },
      {
        "icono": "🌾",
        "etiqueta": "Llanura",
        "texto": "Gran Llanura Europea",
        "tono": "amber"
      },
      {
        "icono": "🌿",
        "etiqueta": "Llanura",
        "texto": "Llanura de Europa Oriental",
        "tono": "sky"
      },
      {
        "icono": "🪨",
        "etiqueta": "Macizos",
        "texto": "Macizo Central · Vosgos · Selva Negra",
        "tono": "violet"
      }
    ],
    "frase": "Centro y este: grandes llanuras; dentro del relieve también aparecen macizos."
  }
},
{
  "id": "puerta-de-1492",
  "titulo": "La puerta de 1492",
  "idioma": "es-ES",
  "idiomaEtiqueta": "Español",
  "subtitulo": "Un paseo por el comienzo de la Edad Moderna",
  "nivel": 2,
  "categoria": "Historia",
  "tiempoEstimado": "5 minutos",
  "portada": "🕰️",
  "escena": {
    "fondo": "museo",
    "cielo": "1492",
    "personaje": "👧",
    "companera": "🚢"
  },
  "valores": [
    "Curiosidad histórica",
    "Secuenciación",
    "Atención"
  ],
  "parrafos": [
    {
      "icono": "🏛️",
      "texto": "En un museo, Alba encontró una puerta con el número 1492. La guía le explicó que, en su tema de Sociales, esa fecha marca el comienzo de la Edad Moderna."
    },
    {
      "icono": "👑",
      "texto": "En la primera sala aparecían los Reyes Católicos, Castilla y Aragón, y la conquista de Granada en 1492."
    },
    {
      "icono": "🚢",
      "texto": "En la sala siguiente había barcos y mapas. Allí Alba recordó que Colón llegó a América en 1492 y que después comenzaron grandes cambios."
    },
    {
      "icono": "🎨",
      "texto": "Más adelante encontró salas dedicadas al imperio, a las crisis, a la sociedad, a la literatura y al arte."
    },
    {
      "icono": "🇫🇷",
      "texto": "La última puerta tenía otra fecha: 1789. La guía explicó que la Edad Moderna termina con la Revolución Francesa."
    }
  ],
  "preguntas": [
    {
      "id": "inicio",
      "tipo": "opcion",
      "texto": "¿Qué fecha marcaba la primera puerta?",
      "opciones": [
        "1492",
        "1789",
        "476"
      ],
      "correcta": "1492",
      "ayuda": "La fecha aparece en el primer párrafo."
    },
    {
      "id": "america",
      "tipo": "opcion",
      "texto": "¿Qué recordó Alba en la sala de barcos y mapas?",
      "opciones": [
        "Que Colón llegó a América en 1492",
        "Que empezó la Revolución Francesa",
        "Que Europa está en el hemisferio sur"
      ],
      "correcta": "Que Colón llegó a América en 1492",
      "ayuda": "Vuelve al tercer párrafo."
    },
    {
      "id": "final",
      "tipo": "opcion",
      "texto": "¿Con qué acontecimiento termina la Edad Moderna en el tema?",
      "opciones": [
        "Revolución Francesa",
        "Conquista de Granada",
        "Construcción del museo"
      ],
      "correcta": "Revolución Francesa",
      "ayuda": "Busca la última puerta."
    },
    {
      "id": "salas",
      "tipo": "texto",
      "texto": "¿Qué temas encontró Alba entre la primera y la última puerta?"
    },
    {
      "id": "linea",
      "tipo": "texto",
      "texto": "Escribe una línea del tiempo muy corta con 1492 al inicio y 1789 al final."
    }
  ],
  "reflexion": "Una línea del tiempo ayuda a colocar los hechos en orden y a entender un periodo completo.",
  "fraseDelDia": "Las fechas son puertas que ayudan a ordenar la historia.",
  "apoyoVisual": {
    "titulo": "🕰️ Dos fechas que enmarcan el tema",
    "subtitulo": "Úsalas como puertas de entrada y salida.",
    "items": [
      {
        "icono": "🚪",
        "etiqueta": "1492",
        "texto": "Comienzo de la Edad Moderna",
        "tono": "amber"
      },
      {
        "icono": "👑",
        "etiqueta": "1492",
        "texto": "Reyes Católicos · Granada",
        "tono": "violet"
      },
      {
        "icono": "🚢",
        "etiqueta": "1492",
        "texto": "Colón llega a América",
        "tono": "blue"
      },
      {
        "icono": "🇫🇷",
        "etiqueta": "1789",
        "texto": "Revolución Francesa · final del periodo",
        "tono": "rose"
      }
    ],
    "frase": "1492 abre la Edad Moderna; 1789 la cierra en este tema de Sociales."
  }
},
{
  "id": "taller-del-siglo-de-oro",
  "titulo": "El taller de las palabras y los colores",
  "idioma": "es-ES",
  "idiomaEtiqueta": "Español",
  "subtitulo": "Una visita a la cultura de la Edad Moderna",
  "nivel": 2,
  "categoria": "Historia",
  "tiempoEstimado": "5 minutos",
  "portada": "🎨",
  "escena": {
    "fondo": "biblioteca",
    "cielo": "📚",
    "personaje": "👦",
    "companera": "🎨"
  },
  "valores": [
    "Curiosidad",
    "Creatividad",
    "Cultura"
  ],
  "parrafos": [
    {
      "icono": "📚",
      "texto": "Hugo entró en una sala del museo llena de libros, cuadros y pequeñas maquetas de edificios. El cartel decía: «Cultura en la Edad Moderna»."
    },
    {
      "icono": "✒️",
      "texto": "La guía explicó que la literatura tuvo mucha importancia y que el Siglo de Oro dejó escritores y obras muy recordadas."
    },
    {
      "icono": "🎨",
      "texto": "Después señaló pinturas y explicó que el arte también fue una parte destacada de aquel periodo."
    },
    {
      "icono": "🏛️",
      "texto": "Hugo entendió que estudiar historia no era recordar solo guerras y reyes: también significaba observar cómo escribían, pintaban y construían las personas."
    },
    {
      "icono": "💡",
      "texto": "Antes de salir, eligió una palabra para resumir la sala: «huella». La cultura era una forma de descubrir qué dejó una época para el futuro."
    }
  ],
  "preguntas": [
    {
      "id": "sala",
      "tipo": "opcion",
      "texto": "¿Qué había en la sala del museo?",
      "opciones": [
        "Libros, cuadros y maquetas",
        "Solo mapas",
        "Solo monedas"
      ],
      "correcta": "Libros, cuadros y maquetas",
      "ayuda": "Busca la descripción del primer párrafo."
    },
    {
      "id": "literatura",
      "tipo": "opcion",
      "texto": "¿Qué expresión aparece relacionada con la literatura?",
      "opciones": [
        "Siglo de Oro",
        "Gran Llanura",
        "Océano Atlántico"
      ],
      "correcta": "Siglo de Oro",
      "ayuda": "Vuelve al segundo párrafo."
    },
    {
      "id": "idea",
      "tipo": "opcion",
      "texto": "¿Qué comprendió Hugo sobre estudiar historia?",
      "opciones": [
        "También incluye cultura y arte",
        "Solo consiste en memorizar fechas",
        "No tiene relación con las personas"
      ],
      "correcta": "También incluye cultura y arte",
      "ayuda": "Lee el cuarto párrafo."
    },
    {
      "id": "huella",
      "tipo": "texto",
      "texto": "¿Por qué Hugo eligió la palabra «huella» para resumir la sala?"
    },
    {
      "id": "cultura",
      "tipo": "texto",
      "texto": "¿Qué parte de la cultura te ayudaría más a recordar una época: literatura, pintura o arquitectura? ¿Por qué?"
    }
  ],
  "reflexion": "La cultura cuenta una parte de la historia que no siempre aparece en una lista de fechas.",
  "fraseDelDia": "El arte y las palabras también cuentan la historia.",
  "apoyoVisual": {
    "titulo": "🎨 Cultura de la Edad Moderna",
    "subtitulo": "Una época también se recuerda por lo que crea.",
    "items": [
      {
        "icono": "📚",
        "etiqueta": "Literatura",
        "texto": "Siglo de Oro y obras muy recordadas",
        "tono": "amber"
      },
      {
        "icono": "🎨",
        "etiqueta": "Arte",
        "texto": "Pintura y creación artística",
        "tono": "rose"
      },
      {
        "icono": "🏛️",
        "etiqueta": "Edificios",
        "texto": "Arquitectura y espacios de la época",
        "tono": "sky"
      },
      {
        "icono": "✨",
        "etiqueta": "Idea clave",
        "texto": "La cultura deja huellas del pasado",
        "tono": "violet"
      }
    ],
    "frase": "Historia también es literatura, arte y cultura."
  }
},
{
  "id": "linea-del-tiempo-perdida",
  "titulo": "La línea del tiempo perdida",
  "idioma": "es-ES",
  "idiomaEtiqueta": "Español",
  "subtitulo": "Un reto para reconstruir la Edad Moderna con pistas",
  "nivel": 3,
  "categoria": "Historia",
  "tiempoEstimado": "6 minutos",
  "portada": "📜",
  "escena": {
    "fondo": "museo",
    "cielo": "🕰️",
    "personaje": "👧",
    "companera": "📜"
  },
  "valores": [
    "Pensamiento crítico",
    "Secuenciación",
    "Curiosidad histórica"
  ],
  "parrafos": [
    {
      "icono": "📜",
      "texto": "En el archivo del museo, Inés encontró una línea del tiempo sin fechas. Solo quedaban dos sobres: uno con un barco y otro con una bandera francesa."
    },
    {
      "icono": "🚢",
      "texto": "En el primer sobre leyó que Colón llegó a América en 1492. También aparecían los Reyes Católicos y la conquista de Granada en ese mismo año."
    },
    {
      "icono": "🌍",
      "texto": "Entre los dos sobres había tarjetas sobre el crecimiento del imperio hispánico, las crisis posteriores y una sociedad dividida entre privilegiados y no privilegiados."
    },
    {
      "icono": "🎨",
      "texto": "Otras tarjetas hablaban de literatura y arte. Inés comprendió que un periodo histórico no se explica con un solo acontecimiento, sino con cambios políticos, sociales y culturales."
    },
    {
      "icono": "🇫🇷",
      "texto": "El último sobre tenía la fecha 1789 y la Revolución Francesa. Inés colocó 1492 al principio y 1789 al final, y dejó las demás pistas entre ambas."
    }
  ],
  "preguntas": [
    {
      "id": "primera",
      "tipo": "opcion",
      "texto": "¿Qué fecha colocó Inés al principio?",
      "opciones": [
        "1492",
        "1789",
        "2000"
      ],
      "correcta": "1492",
      "ayuda": "Busca la fecha del primer sobre."
    },
    {
      "id": "medio",
      "tipo": "opcion",
      "texto": "¿Qué tipo de cambios encontró entre las dos fechas?",
      "opciones": [
        "Políticos, sociales y culturales",
        "Solo cambios de clima",
        "Solo cambios de mapas"
      ],
      "correcta": "Políticos, sociales y culturales",
      "ayuda": "La respuesta se deduce de los párrafos tercero y cuarto."
    },
    {
      "id": "ultima",
      "tipo": "opcion",
      "texto": "¿Qué acontecimiento aparecía en el último sobre?",
      "opciones": [
        "Revolución Francesa",
        "Llegada de Colón a América",
        "Conquista de Granada"
      ],
      "correcta": "Revolución Francesa",
      "ayuda": "Vuelve al último párrafo."
    },
    {
      "id": "inferencia",
      "tipo": "texto",
      "texto": "¿Por qué una línea del tiempo necesita algo más que dos fechas para explicar bien un periodo?"
    },
    {
      "id": "sintesis",
      "tipo": "texto",
      "texto": "Escribe una frase que conecte 1492, los cambios de la Edad Moderna y 1789."
    }
  ],
  "reflexion": "Las fechas ordenan la historia, pero comprenderla exige conectar hechos, personas, sociedad y cultura.",
  "fraseDelDia": "Ordenar es el primer paso; conectar es comprender.",
  "apoyoVisual": {
    "titulo": "📜 Reconstrucción visual",
    "subtitulo": "Piensa en la Edad Moderna como un camino entre dos fechas.",
    "items": [
      {
        "icono": "🚢",
        "etiqueta": "1492",
        "texto": "Inicio del periodo · Colón llega a América",
        "tono": "blue"
      },
      {
        "icono": "🌍",
        "etiqueta": "Durante",
        "texto": "Imperio y cambios políticos",
        "tono": "violet"
      },
      {
        "icono": "🏛️",
        "etiqueta": "Durante",
        "texto": "Sociedad · literatura · arte",
        "tono": "amber"
      },
      {
        "icono": "🇫🇷",
        "etiqueta": "1789",
        "texto": "Revolución Francesa · final",
        "tono": "rose"
      }
    ],
    "frase": "1492 → transformaciones políticas, sociales y culturales → 1789."
  }
},
{
  "id": "consejo-de-las-cuatro-fronteras",
  "titulo": "El consejo de las cuatro fronteras",
  "idioma": "es-ES",
  "idiomaEtiqueta": "Español",
  "subtitulo": "Una historia para razonar con la posición de Europa",
  "nivel": 3,
  "categoria": "Geografía",
  "tiempoEstimado": "6 minutos",
  "portada": "🌍",
  "escena": {
    "fondo": "mapa",
    "cielo": "🧭",
    "personaje": "🗺️",
    "companera": "🌊"
  },
  "valores": [
    "Razonamiento espacial",
    "Atención",
    "Pensamiento crítico"
  ],
  "parrafos": [
    {
      "icono": "🌍",
      "texto": "En una clase de mapas, cuatro tarjetas discutían sobre quién debía ocupar cada borde de Europa. Cada una tenía una pista diferente."
    },
    {
      "icono": "❄️",
      "texto": "La tarjeta del océano Glacial Ártico decía que debía ir arriba, porque marca el límite del norte. El Mediterráneo respondió que su lugar estaba al sur."
    },
    {
      "icono": "🌊",
      "texto": "El Atlántico se colocó al oeste. En el lado oriental trabajaron juntos los Montes Urales y el mar Caspio."
    },
    {
      "icono": "🧭",
      "texto": "La profesora cambió la orientación del papel para comprobar si la clase había memorizado posiciones o comprendido las direcciones. Los alumnos tuvieron que buscar de nuevo el norte antes de responder."
    },
    {
      "icono": "💡",
      "texto": "Así descubrieron que orientarse no consiste en aprender dónde está una palabra en una hoja, sino en relacionarla con norte, sur, este y oeste."
    }
  ],
  "preguntas": [
    {
      "id": "norte",
      "tipo": "opcion",
      "texto": "¿Qué tarjeta representa el límite norte?",
      "opciones": [
        "Océano Glacial Ártico",
        "Mar Mediterráneo",
        "Océano Atlántico"
      ],
      "correcta": "Océano Glacial Ártico",
      "ayuda": "Busca quién dijo que debía ir arriba."
    },
    {
      "id": "oriental",
      "tipo": "opcion",
      "texto": "¿Qué referencias trabajan juntas en el este?",
      "opciones": [
        "Montes Urales y mar Caspio",
        "Atlántico y Mediterráneo",
        "Pirineos y Alpes"
      ],
      "correcta": "Montes Urales y mar Caspio",
      "ayuda": "Lee el tercer párrafo."
    },
    {
      "id": "papel",
      "tipo": "opcion",
      "texto": "¿Por qué la profesora giró el papel?",
      "opciones": [
        "Para comprobar si comprendían las direcciones",
        "Para esconder el mapa",
        "Para borrar los nombres"
      ],
      "correcta": "Para comprobar si comprendían las direcciones",
      "ayuda": "La razón aparece en el cuarto párrafo."
    },
    {
      "id": "inferencia",
      "tipo": "texto",
      "texto": "¿Qué diferencia hay entre memorizar una posición en la hoja y comprender una dirección geográfica?"
    },
    {
      "id": "aplicacion",
      "tipo": "texto",
      "texto": "Si el mapa cambiara de tamaño, ¿qué referencias seguirían indicando los límites de Europa?"
    }
  ],
  "reflexion": "Comprender una dirección permite orientarse aunque cambie el dibujo del mapa.",
  "fraseDelDia": "No memorizo una esquina: comprendo una dirección.",
  "apoyoVisual": {
    "titulo": "🧭 Relaciones espaciales",
    "subtitulo": "Las direcciones no cambian aunque cambie el tamaño del mapa.",
    "items": [
      {
        "icono": "❄️",
        "etiqueta": "Norte",
        "texto": "Océano Glacial Ártico",
        "tono": "sky"
      },
      {
        "icono": "☀️",
        "etiqueta": "Sur",
        "texto": "Mar Mediterráneo",
        "tono": "amber"
      },
      {
        "icono": "🌊",
        "etiqueta": "Oeste",
        "texto": "Océano Atlántico",
        "tono": "blue"
      },
      {
        "icono": "⛰️",
        "etiqueta": "Este",
        "texto": "Montes Urales · mar Caspio",
        "tono": "violet"
      }
    ],
    "frase": "La clave no es la esquina de la hoja: es la orientación."
  }
},
{
  "id": "ruta-hacia-el-elbrus",
  "titulo": "La ruta hacia el Elbrús",
  "idioma": "es-ES",
  "idiomaEtiqueta": "Español",
  "subtitulo": "Una expedición para comparar las montañas de Europa",
  "nivel": 3,
  "categoria": "Geografía",
  "tiempoEstimado": "6 minutos",
  "portada": "🏔️",
  "escena": {
    "fondo": "montana",
    "cielo": "☁️",
    "personaje": "🥾",
    "companera": "🏔️"
  },
  "valores": [
    "Comparación",
    "Curiosidad científica",
    "Razonamiento"
  ],
  "parrafos": [
    {
      "icono": "🥾",
      "texto": "Samira recibió una misión: recorrer con un lápiz las principales zonas montañosas de Europa y encontrar el pico más alto indicado en su material."
    },
    {
      "icono": "🌿",
      "texto": "Comenzó por el norte. Allí las montañas son de poca altura, no superan los 2.000 metros en el resumen de clase y suelen tener formas redondeadas."
    },
    {
      "icono": "⛰️",
      "texto": "Después viajó al sur del mapa, donde aparecen cordilleras más elevadas como Pirineos, Alpes, Cárpatos, Balcanes y Cáucaso."
    },
    {
      "icono": "🏔️",
      "texto": "En el Cáucaso encontró el Elbrús, señalado como el pico más alto con 5.642 metros. Esa cifra le ayudó a distinguirlo de las montañas del norte."
    },
    {
      "icono": "🧠",
      "texto": "Samira terminó su misión escribiendo dos ideas: «norte, menor altura y formas redondeadas»; «sur, montañas más elevadas». Los nombres quedaron unidos a una comparación."
    }
  ],
  "preguntas": [
    {
      "id": "norte",
      "tipo": "opcion",
      "texto": "¿Qué característica se asocia a las montañas del norte?",
      "opciones": [
        "Poca altura y formas redondeadas",
        "Son siempre las más altas",
        "No existen montañas"
      ],
      "correcta": "Poca altura y formas redondeadas",
      "ayuda": "Busca el segundo párrafo."
    },
    {
      "id": "sur",
      "tipo": "opcion",
      "texto": "¿Qué conjunto aparece entre las montañas del sur?",
      "opciones": [
        "Pirineos, Alpes, Cárpatos, Balcanes y Cáucaso",
        "Urales y Escandinavos solamente",
        "Gran Llanura Europea"
      ],
      "correcta": "Pirineos, Alpes, Cárpatos, Balcanes y Cáucaso",
      "ayuda": "Vuelve al tercer párrafo."
    },
    {
      "id": "elbrus",
      "tipo": "opcion",
      "texto": "¿Qué dato ayudó a Samira a identificar el Elbrús?",
      "opciones": [
        "5.642 metros",
        "1492",
        "1789"
      ],
      "correcta": "5.642 metros",
      "ayuda": "El dato aparece en el cuarto párrafo."
    },
    {
      "id": "inferencia",
      "tipo": "texto",
      "texto": "¿Por qué comparar norte y sur puede ayudar más que memorizar una lista de montañas?"
    },
    {
      "id": "resumen",
      "tipo": "texto",
      "texto": "Resume el contraste entre las montañas del norte y las del sur en dos frases."
    }
  ],
  "reflexion": "Una cifra o un nombre se recuerda mejor cuando entendemos qué lo hace diferente.",
  "fraseDelDia": "Comparar convierte una lista en una idea.",
  "apoyoVisual": {
    "titulo": "🏔️ Perfil del relieve",
    "subtitulo": "Lee de izquierda a derecha: norte y sur no se comportan igual.",
    "items": [
      {
        "icono": "🌿",
        "etiqueta": "Norte",
        "texto": "Poca altura · formas redondeadas",
        "tono": "green"
      },
      {
        "icono": "🧭",
        "etiqueta": "Norte",
        "texto": "Escandinavos · Urales",
        "tono": "sky"
      },
      {
        "icono": "⛰️",
        "etiqueta": "Sur",
        "texto": "Cordilleras más elevadas",
        "tono": "amber"
      },
      {
        "icono": "🏔️",
        "etiqueta": "Elbrús",
        "texto": "5.642 m · Cáucaso",
        "tono": "violet"
      }
    ],
    "frase": "Elbrús: 5.642 m. Úsalo como referencia para recordar las montañas más elevadas."
  }
},
{
  "id": "dos-voces-de-la-edad-moderna",
  "titulo": "Dos voces de la Edad Moderna",
  "idioma": "es-ES",
  "idiomaEtiqueta": "Español",
  "subtitulo": "Una lectura para comprender que una sociedad puede tener grupos diferentes",
  "nivel": 3,
  "categoria": "Historia",
  "tiempoEstimado": "6 minutos",
  "portada": "🏛️",
  "escena": {
    "fondo": "castillo",
    "cielo": "👑",
    "personaje": "👧",
    "companera": "🏛️"
  },
  "valores": [
    "Empatía histórica",
    "Comparación",
    "Pensamiento crítico"
  ],
  "parrafos": [
    {
      "icono": "🏛️",
      "texto": "En una exposición, Lucía encontró dos diarios ficticios preparados por el museo para explicar la sociedad de la Edad Moderna desde perspectivas distintas."
    },
    {
      "icono": "👑",
      "texto": "El primero representaba a los grupos privilegiados, como la nobleza y el clero. El segundo mostraba la vida de grupos no privilegiados, entre ellos burgueses y campesinos."
    },
    {
      "icono": "🔎",
      "texto": "Lucía observó que los dos diarios hablaban de la misma época, pero no contaban las mismas experiencias. Comprendió que pertenecer a grupos distintos podía cambiar la forma de vivir una sociedad."
    },
    {
      "icono": "📚",
      "texto": "En otra sala aparecían literatura y arte. Lucía vio que la cultura también formaba parte de aquel periodo y que no todo podía resumirse en reyes o guerras."
    },
    {
      "icono": "💭",
      "texto": "Al salir escribió una conclusión: para comprender una época conviene mirar su organización social y también las obras, ideas y expresiones culturales que dejó."
    }
  ],
  "preguntas": [
    {
      "id": "privilegiados",
      "tipo": "opcion",
      "texto": "¿Qué grupos aparecen como privilegiados?",
      "opciones": [
        "Nobleza y clero",
        "Burgueses y campesinos",
        "Marineros y cartógrafos"
      ],
      "correcta": "Nobleza y clero",
      "ayuda": "Busca el segundo párrafo."
    },
    {
      "id": "no-privilegiados",
      "tipo": "opcion",
      "texto": "¿Qué grupos aparecen entre los no privilegiados?",
      "opciones": [
        "Burgueses y campesinos",
        "Nobleza y clero",
        "Reyes y artistas"
      ],
      "correcta": "Burgueses y campesinos",
      "ayuda": "La respuesta está en el mismo párrafo."
    },
    {
      "id": "museo",
      "tipo": "opcion",
      "texto": "¿Qué añadió la segunda sala a la explicación de la época?",
      "opciones": [
        "Literatura y arte",
        "Solo montañas",
        "Solo océanos"
      ],
      "correcta": "Literatura y arte",
      "ayuda": "Vuelve al cuarto párrafo."
    },
    {
      "id": "inferencia",
      "tipo": "texto",
      "texto": "¿Por qué dos personas de grupos sociales distintos podían describir la misma época de manera diferente?"
    },
    {
      "id": "historia",
      "tipo": "texto",
      "texto": "¿Qué dos tipos de información considera Lucía importantes para comprender una época?"
    }
  ],
  "reflexion": "Comprender el pasado también significa preguntarse cómo lo vivían personas de grupos diferentes.",
  "fraseDelDia": "Una época puede tener muchas voces.",
  "apoyoVisual": {
    "titulo": "🏛️ Sociedad y cultura",
    "subtitulo": "Dos dimensiones para mirar la Edad Moderna.",
    "items": [
      {
        "icono": "👑",
        "etiqueta": "Privilegiados",
        "texto": "Nobleza · clero",
        "tono": "amber"
      },
      {
        "icono": "👥",
        "etiqueta": "No privilegiados",
        "texto": "Burgueses · campesinos",
        "tono": "green"
      },
      {
        "icono": "📚",
        "etiqueta": "Cultura",
        "texto": "Literatura",
        "tono": "sky"
      },
      {
        "icono": "🎨",
        "etiqueta": "Cultura",
        "texto": "Arte",
        "tono": "rose"
      }
    ],
    "frase": "Para comprender una sociedad, mira quiénes la forman y qué cultura produce."
  }
},
{
  "id": "mapa-del-imperio-y-la-crisis",
  "titulo": "El mapa que primero creció y después cambió",
  "idioma": "es-ES",
  "idiomaEtiqueta": "Español",
  "subtitulo": "Una historia para relacionar el imperio hispánico con sus cambios",
  "nivel": 3,
  "categoria": "Historia",
  "tiempoEstimado": "6 minutos",
  "portada": "🌍",
  "escena": {
    "fondo": "museo",
    "cielo": "🌍",
    "personaje": "🧑",
    "companera": "🗺️"
  },
  "valores": [
    "Causa y cambio",
    "Pensamiento histórico",
    "Síntesis"
  ],
  "parrafos": [
    {
      "icono": "🗺️",
      "texto": "En una sala oscura, Mateo vio un mapa iluminado del imperio hispánico. Al tocar un botón aparecieron territorios en Europa, América, África y Asia."
    },
    {
      "icono": "🌍",
      "texto": "El guía explicó que durante la Edad Moderna España llegó a tener muchos territorios. El mapa parecía crecer y conectaba lugares muy alejados."
    },
    {
      "icono": "⚔️",
      "texto": "Al pulsar un segundo botón, algunas zonas desaparecieron. La exposición hablaba de guerras, crisis y pérdida de territorios con el paso del tiempo."
    },
    {
      "icono": "📉",
      "texto": "Mateo comprendió que «imperio» no significaba una situación fija. Un territorio podía expandirse en un momento y fragmentarse o debilitarse después."
    },
    {
      "icono": "🎨",
      "texto": "Antes de salir, otra pantalla recordó que, al mismo tiempo, la literatura y el arte dejaron una huella importante. El periodo reunía crecimiento, dificultades y cultura."
    }
  ],
  "preguntas": [
    {
      "id": "territorios",
      "tipo": "opcion",
      "texto": "¿En qué zonas aparecían territorios del imperio en el mapa?",
      "opciones": [
        "Europa, América, África y Asia",
        "Solo Europa",
        "Solo América"
      ],
      "correcta": "Europa, América, África y Asia",
      "ayuda": "Busca el primer párrafo."
    },
    {
      "id": "segundo",
      "tipo": "opcion",
      "texto": "¿Qué mostró el segundo botón?",
      "opciones": [
        "Pérdida de territorios y crisis",
        "Más océanos",
        "Un mapa sin cambios"
      ],
      "correcta": "Pérdida de territorios y crisis",
      "ayuda": "Vuelve al tercer párrafo."
    },
    {
      "id": "idea",
      "tipo": "opcion",
      "texto": "¿Qué comprendió Mateo sobre un imperio?",
      "opciones": [
        "Puede cambiar con el tiempo",
        "Siempre permanece igual",
        "Solo existe en los mapas"
      ],
      "correcta": "Puede cambiar con el tiempo",
      "ayuda": "La idea aparece en el cuarto párrafo."
    },
    {
      "id": "inferencia",
      "tipo": "texto",
      "texto": "¿Por qué el mapa que cambia ayuda a entender mejor la idea de crisis?"
    },
    {
      "id": "sintesis",
      "tipo": "texto",
      "texto": "Resume el periodo usando estas tres ideas: expansión, crisis y cultura."
    }
  ],
  "reflexion": "La historia muestra procesos: las situaciones crecen, cambian, se debilitan y dejan huellas.",
  "fraseDelDia": "Entender el cambio es más útil que memorizar una foto fija.",
  "apoyoVisual": {
    "titulo": "🌍 Un proceso, no una foto fija",
    "subtitulo": "Ordena las ideas como una secuencia.",
    "items": [
      {
        "icono": "🌍",
        "etiqueta": "Expansión",
        "texto": "Territorios en varios continentes",
        "tono": "blue"
      },
      {
        "icono": "⚔️",
        "etiqueta": "Dificultades",
        "texto": "Guerras y crisis",
        "tono": "rose"
      },
      {
        "icono": "📉",
        "etiqueta": "Cambio",
        "texto": "Pérdida y fragmentación de territorios",
        "tono": "amber"
      },
      {
        "icono": "🎨",
        "etiqueta": "Huella",
        "texto": "Literatura y arte",
        "tono": "violet"
      }
    ],
    "frase": "Expansión → crisis y cambios → una importante huella cultural."
  }
}
];
