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
  }
];
