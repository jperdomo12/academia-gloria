/*
========================================================
Lecturas de Nivel 1 · intereses culturales y cotidianos
Academia Gloria Valentina

Contexto factual de la lectura sobre Shakira verificado el
17/09/2026: su Residencia Europea en Madrid reúne 12 conciertos
entre el 18/09/2026 y el 11/10/2026.
========================================================
*/

export const HISTORIAS_INTERESES_NIVEL_1 = [
  {
    id: "shakira-del-caribe-a-madrid",
    titulo: "Shakira: del Caribe a un escenario de Madrid",
    idioma: "es-ES",
    idiomaEtiqueta: "Español",
    subtitulo: "Una historia real sobre música, raíces y grandes escenarios",
    nivel: 1,
    categoria: "Música",
    tiempoEstimado: "4 minutos",
    portada: "🎤",
    escena: { fondo: "amanecer", cielo: "🎶", personaje: "🎤", companera: "🌴" },
    valores: ["Curiosidad", "Constancia", "Identidad", "Música"],
    parrafos: [
      { icono: "🌴", texto: "Shakira es una cantante colombiana nacida en Barranquilla, una ciudad junto al mar Caribe. Desde muy joven mostró interés por la música, el baile y la escritura de canciones." },
      { icono: "🎤", texto: "Con los años llevó su música a muchos países. Su forma de cantar y bailar mezcla influencias distintas y conserva una fuerte relación con sus raíces latinoamericanas." },
      { icono: "🌍", texto: "Sus conciertos reúnen a personas que hablan idiomas diferentes. La música consigue algo especial: muchas personas pueden compartir una emoción aunque no vivan en el mismo lugar." },
      { icono: "🏟️", texto: "En septiembre de 2026, Madrid recibe su Residencia Europea. Son doce conciertos programados en la ciudad entre septiembre y octubre, una etapa muy especial de su gira mundial." },
      { icono: "✨", texto: "La historia de Shakira recuerda que un talento puede crecer durante muchos años. Tener raíces propias y practicar con constancia puede ayudar a construir una voz reconocible y personal." }
    ],
    preguntas: [
      {
        id: "origen",
        tipo: "opcion",
        texto: "¿En qué ciudad nació Shakira?",
        opciones: ["Barranquilla", "Madrid", "Caracas"],
        correcta: "Barranquilla",
        ayuda: "Vuelve al primer párrafo y busca el nombre de la ciudad."
      },
      {
        id: "madrid",
        tipo: "opcion",
        texto: "¿Cuántos conciertos reúne su Residencia Europea en Madrid?",
        opciones: ["Doce", "Dos", "Cincuenta"],
        correcta: "Doce",
        ayuda: "Busca el número que aparece en el cuarto párrafo."
      },
      {
        id: "idea-musica",
        tipo: "opcion",
        texto: "¿Qué puede conseguir la música según la lectura?",
        opciones: ["Compartir emociones entre personas", "Cambiar el clima", "Hacer desaparecer las ciudades"],
        correcta: "Compartir emociones entre personas",
        ayuda: "La respuesta está en el tercer párrafo."
      },
      { id: "aprendizaje", tipo: "texto", texto: "¿Qué idea te parece más importante de la historia de Shakira?" },
      { id: "vida", tipo: "texto", texto: "¿Qué actividad te gustaría practicar durante mucho tiempo para mejorar?" }
    ],
    reflexion: "Un talento no aparece terminado. Crece cuando se practica y cuando una persona aprende a expresar lo que la hace única.",
    fraseDelDia: "Mis raíces y mi esfuerzo también forman parte de mi voz.",
    apoyoVisual: {
      titulo: "🎤 Cuatro pistas para recordar",
      subtitulo: "Une lugar, música, viaje y constancia.",
      items: [
        { icono: "🌴", etiqueta: "Origen", texto: "Barranquilla · Caribe colombiano", tono: "amber" },
        { icono: "🎶", etiqueta: "Pasión", texto: "Música · baile · canciones", tono: "rose" },
        { icono: "🌍", etiqueta: "Camino", texto: "Una carrera que llegó a muchos países", tono: "sky" },
        { icono: "🏟️", etiqueta: "Madrid 2026", texto: "12 conciertos · Residencia Europea", tono: "violet" }
      ],
      frase: "Barranquilla → música → mundo → Madrid 2026."
    }
  },
  {
    id: "viaje-de-una-cancion",
    titulo: "El viaje de una canción",
    idioma: "es-ES",
    idiomaEtiqueta: "Español",
    subtitulo: "Una lectura para descubrir qué hace especial a la música",
    nivel: 1,
    categoria: "Música",
    tiempoEstimado: "4 minutos",
    portada: "🎵",
    escena: { fondo: "laboratorio", cielo: "🎼", personaje: "👧", companera: "🎧" },
    valores: ["Curiosidad", "Escucha", "Creatividad", "Expresión"],
    parrafos: [
      { icono: "🎧", texto: "Nora se puso unos auriculares y escuchó una canción que conocía muy bien. Esta vez decidió prestar atención a cada parte." },
      { icono: "🥁", texto: "Primero descubrió el ritmo. Era como un pulso que ayudaba a seguir la canción con las manos o con los pies." },
      { icono: "🎶", texto: "Después se fijó en la melodía, la parte que podía tararear. También escuchó instrumentos y una voz que contaba una idea." },
      { icono: "🙂", texto: "Nora notó que la música podía cambiar su ánimo. Algunas canciones le daban energía y otras le ayudaban a estar tranquila." },
      { icono: "✨", texto: "Al terminar comprendió que una canción reúne muchas piezas. Ritmo, melodía, instrumentos y voz trabajan juntos para crear una experiencia." }
    ],
    preguntas: [
      {
        id: "ritmo",
        tipo: "opcion",
        texto: "¿Qué comparó Nora con un pulso?",
        opciones: ["El ritmo", "El silencio", "El título"],
        correcta: "El ritmo",
        ayuda: "Busca el segundo párrafo."
      },
      {
        id: "melodia",
        tipo: "opcion",
        texto: "¿Qué parte podía tararear Nora?",
        opciones: ["La melodía", "La portada", "El volumen"],
        correcta: "La melodía",
        ayuda: "Vuelve al tercer párrafo."
      },
      {
        id: "animo",
        tipo: "opcion",
        texto: "¿Qué descubrió Nora sobre la música?",
        opciones: ["Puede influir en el ánimo", "Siempre suena igual", "Solo sirve para bailar"],
        correcta: "Puede influir en el ánimo",
        ayuda: "La respuesta aparece en el cuarto párrafo."
      },
      { id: "aprendizaje", tipo: "texto", texto: "Nombra dos partes que pueden formar una canción." },
      { id: "vida", tipo: "texto", texto: "¿Qué tipo de música te ayuda a sentirte con energía o con calma?" }
    ],
    reflexion: "Escuchar con atención permite descubrir detalles que antes podían pasar desapercibidos.",
    fraseDelDia: "Cuando escucho con atención, descubro más.",
    apoyoVisual: {
      titulo: "🎵 Las piezas de una canción",
      subtitulo: "Cuatro elementos fáciles de recordar.",
      items: [
        { icono: "🥁", etiqueta: "Ritmo", texto: "El pulso que podemos seguir", tono: "amber" },
        { icono: "🎶", etiqueta: "Melodía", texto: "La parte que podemos tararear", tono: "sky" },
        { icono: "🎸", etiqueta: "Instrumentos", texto: "Crean sonidos y acompañan", tono: "green" },
        { icono: "🎤", etiqueta: "Voz", texto: "Puede contar una idea o emoción", tono: "rose" }
      ],
      frase: "Ritmo + melodía + instrumentos + voz = una canción llena de detalles."
    }
  },
  {
    id: "cuadro-que-hablaba-sin-palabras",
    titulo: "El cuadro que hablaba sin palabras",
    idioma: "es-ES",
    idiomaEtiqueta: "Español",
    subtitulo: "Una visita para descubrir cómo el arte comunica ideas",
    nivel: 1,
    categoria: "Arte",
    tiempoEstimado: "4 minutos",
    portada: "🎨",
    escena: { fondo: "museo", cielo: "🖼️", personaje: "👧", companera: "🎨" },
    valores: ["Creatividad", "Observación", "Expresión", "Curiosidad"],
    parrafos: [
      { icono: "🏛️", texto: "Clara entró en un museo y se detuvo delante de un cuadro. No tenía palabras escritas, pero parecía contar una historia." },
      { icono: "🎨", texto: "Observó los colores. Algunas zonas eran muy luminosas y otras más oscuras. Eso hacía que el cuadro cambiara de ambiente." },
      { icono: "🔺", texto: "Después miró las formas, las líneas y la posición de los objetos. Cada detalle parecía colocado con una intención." },
      { icono: "💭", texto: "Clara y su amigo imaginaron historias diferentes al mirar la misma obra. Ninguno necesitó copiar la idea del otro." },
      { icono: "✨", texto: "Al salir, Clara comprendió que el arte puede comunicar sin explicar todo. Observar, imaginar y decir lo que uno piensa también forma parte de la experiencia." }
    ],
    preguntas: [
      {
        id: "luz",
        tipo: "opcion",
        texto: "¿Qué observó Clara primero en el cuadro?",
        opciones: ["Los colores", "El precio", "La puerta"],
        correcta: "Los colores",
        ayuda: "Busca el segundo párrafo."
      },
      {
        id: "detalles",
        tipo: "opcion",
        texto: "¿Qué otros detalles miró Clara?",
        opciones: ["Formas, líneas y objetos", "Solo números", "Solo letras"],
        correcta: "Formas, líneas y objetos",
        ayuda: "La respuesta está en el tercer párrafo."
      },
      {
        id: "historias",
        tipo: "opcion",
        texto: "¿Clara y su amigo imaginaron exactamente la misma historia?",
        opciones: ["No, imaginaron historias diferentes", "Sí, dijeron lo mismo", "No miraron el cuadro"],
        correcta: "No, imaginaron historias diferentes",
        ayuda: "Vuelve al cuarto párrafo."
      },
      { id: "aprendizaje", tipo: "texto", texto: "¿Cómo puede un cuadro comunicar algo sin usar palabras?" },
      { id: "vida", tipo: "texto", texto: "Si pintaras una emoción, ¿qué colores elegirías?" }
    ],
    reflexion: "Una obra de arte puede abrir preguntas y permitir que cada persona observe desde su propia mirada.",
    fraseDelDia: "Mi manera de mirar también puede ser creativa.",
    apoyoVisual: {
      titulo: "🎨 Cómo mirar una obra",
      subtitulo: "Prueba estas cuatro pistas.",
      items: [
        { icono: "🌈", etiqueta: "Colores", texto: "Claros, oscuros, cálidos o fríos", tono: "rose" },
        { icono: "➰", etiqueta: "Líneas", texto: "Guían la mirada", tono: "sky" },
        { icono: "🔷", etiqueta: "Formas", texto: "Organizan la imagen", tono: "violet" },
        { icono: "💭", etiqueta: "Ideas", texto: "Lo que la obra te hace imaginar", tono: "amber" }
      ],
      frase: "Mirar arte también es observar, imaginar y expresar."
    }
  },
  {
    id: "madrid-con-ojos-de-exploradora",
    titulo: "Madrid con ojos de exploradora",
    idioma: "es-ES",
    idiomaEtiqueta: "Español",
    subtitulo: "Un paseo para descubrir la ciudad mirando los detalles",
    nivel: 1,
    categoria: "Madrid",
    tiempoEstimado: "4 minutos",
    portada: "🏙️",
    escena: { fondo: "mapa", cielo: "☀️", personaje: "👧", companera: "🏙️" },
    valores: ["Curiosidad", "Observación", "Cultura", "Orientación"],
    parrafos: [
      { icono: "🏙️", texto: "Madrid es la capital de España. Sus calles reúnen plazas, parques, museos, edificios antiguos y lugares muy modernos." },
      { icono: "☀️", texto: "En la Puerta del Sol, Elena observó a muchas personas caminando en distintas direcciones. Era un buen lugar para empezar a mirar la ciudad con atención." },
      { icono: "🌳", texto: "Después visitó el parque del Retiro. Allí encontró árboles, caminos, zonas de descanso y un gran estanque." },
      { icono: "🖼️", texto: "Más tarde pasó cerca de museos y edificios llenos de historia. Comprendió que una ciudad también puede leerse como si fuera un libro abierto." },
      { icono: "🔎", texto: "Al volver a casa eligió su detalle favorito del día. No era el lugar más grande, sino algo que había descubierto por prestar atención." }
    ],
    preguntas: [
      {
        id: "capital",
        tipo: "opcion",
        texto: "¿De qué país es capital Madrid?",
        opciones: ["España", "Venezuela", "Colombia"],
        correcta: "España",
        ayuda: "La respuesta aparece en la primera frase."
      },
      {
        id: "retiro",
        tipo: "opcion",
        texto: "¿Qué lugar visitó Elena después de la Puerta del Sol?",
        opciones: ["El parque del Retiro", "Una playa", "Una selva"],
        correcta: "El parque del Retiro",
        ayuda: "Busca el tercer párrafo."
      },
      {
        id: "ciudad-libro",
        tipo: "opcion",
        texto: "¿Con qué comparó Elena una ciudad?",
        opciones: ["Con un libro abierto", "Con una calculadora", "Con una caja vacía"],
        correcta: "Con un libro abierto",
        ayuda: "Vuelve al cuarto párrafo."
      },
      { id: "aprendizaje", tipo: "texto", texto: "¿Qué detalles puedes observar cuando paseas por una ciudad?" },
      { id: "vida", tipo: "texto", texto: "¿Qué lugar de Madrid te gustaría enseñar a alguien que viene por primera vez?" }
    ],
    reflexion: "Conocer una ciudad no es solo visitar lugares famosos. También es aprender a observar lo que ocurre entre ellos.",
    fraseDelDia: "Cuando miro con curiosidad, mi ciudad me cuenta historias.",
    apoyoVisual: {
      titulo: "🏙️ Cuatro formas de explorar Madrid",
      subtitulo: "Mira la ciudad como una exploradora.",
      items: [
        { icono: "☀️", etiqueta: "Plazas", texto: "Personas, caminos y puntos de encuentro", tono: "amber" },
        { icono: "🌳", etiqueta: "Parques", texto: "Naturaleza dentro de la ciudad", tono: "green" },
        { icono: "🖼️", etiqueta: "Museos", texto: "Arte, ciencia e historia", tono: "violet" },
        { icono: "🔎", etiqueta: "Detalles", texto: "Aquello que descubres al mirar con calma", tono: "sky" }
      ],
      frase: "Plazas + parques + cultura + detalles: muchas maneras de conocer Madrid."
    }
  },
  {
    id: "venezuela-entre-caribe-llanos-y-tepuyes",
    titulo: "Venezuela: entre Caribe, llanos y tepuyes",
    idioma: "es-ES",
    idiomaEtiqueta: "Español",
    subtitulo: "Un viaje corto por un país de paisajes muy diferentes",
    nivel: 1,
    categoria: "Venezuela",
    tiempoEstimado: "4 minutos",
    portada: "🇻🇪",
    escena: { fondo: "montana", cielo: "☀️", personaje: "🦜", companera: "🏞️" },
    valores: ["Curiosidad", "Identidad", "Geografía", "Diversidad"],
    parrafos: [
      { icono: "🇻🇪", texto: "Venezuela está en el norte de América del Sur y tiene costa en el mar Caribe. En un mismo país aparecen paisajes muy diferentes." },
      { icono: "🌊", texto: "En la costa hay playas e islas. Hacia el oeste aparecen montañas de los Andes, con ciudades y pueblos situados entre grandes alturas." },
      { icono: "🐎", texto: "En el centro se extienden los Llanos, enormes espacios de sabanas donde viven muchas especies de animales y se desarrollan actividades ganaderas." },
      { icono: "🏞️", texto: "Al sur aparecen selvas y tepuyes, montañas de cima plana. En esa región se encuentra el Salto Ángel, una impresionante caída de agua del Parque Nacional Canaima." },
      { icono: "🫓", texto: "La diversidad también se nota en la música, las comidas y las costumbres. Conocer un país significa mirar su naturaleza y también la vida de su gente." }
    ],
    preguntas: [
      {
        id: "mar",
        tipo: "opcion",
        texto: "¿En qué mar tiene costa Venezuela?",
        opciones: ["Mar Caribe", "Mar Rojo", "Mar Báltico"],
        correcta: "Mar Caribe",
        ayuda: "Busca la primera frase."
      },
      {
        id: "llanos",
        tipo: "opcion",
        texto: "¿Cómo se llaman las grandes sabanas del centro del país?",
        opciones: ["Los Llanos", "Los Alpes", "Los Pirineos"],
        correcta: "Los Llanos",
        ayuda: "Vuelve al tercer párrafo."
      },
      {
        id: "tepuyes",
        tipo: "opcion",
        texto: "¿Qué forma tienen los tepuyes según la lectura?",
        opciones: ["Cima plana", "Forma de rueda", "Forma de puente"],
        correcta: "Cima plana",
        ayuda: "La respuesta aparece en el cuarto párrafo."
      },
      { id: "aprendizaje", tipo: "texto", texto: "Nombra dos paisajes diferentes que aparezcan en la lectura." },
      { id: "vida", tipo: "texto", texto: "¿Qué lugar o costumbre de Venezuela te gustaría conocer mejor?" }
    ],
    reflexion: "Un país puede reunir paisajes y costumbres muy distintos, y todos ellos forman parte de su identidad.",
    fraseDelDia: "Conocer de dónde venimos también es una forma de descubrir quiénes somos.",
    apoyoVisual: {
      titulo: "🇻🇪 Un país, cuatro paisajes",
      subtitulo: "Recorre Venezuela de norte a sur.",
      items: [
        { icono: "🌊", etiqueta: "Caribe", texto: "Costa, playas e islas", tono: "sky" },
        { icono: "⛰️", etiqueta: "Andes", texto: "Montañas del oeste", tono: "violet" },
        { icono: "🐎", etiqueta: "Llanos", texto: "Grandes sabanas del centro", tono: "green" },
        { icono: "🏞️", etiqueta: "Sur", texto: "Selva, tepuyes y Canaima", tono: "amber" }
      ],
      frase: "Caribe · Andes · Llanos · tepuyes: Venezuela cambia de paisaje muchas veces."
    }
  },
  {
    id: "espana-muchos-paisajes-muchas-voces",
    titulo: "España: muchos paisajes, muchas voces",
    idioma: "es-ES",
    idiomaEtiqueta: "Español",
    subtitulo: "Una lectura para descubrir la diversidad de un país",
    nivel: 1,
    categoria: "España",
    tiempoEstimado: "4 minutos",
    portada: "🇪🇸",
    escena: { fondo: "mapa", cielo: "☀️", personaje: "🗺️", companera: "🇪🇸" },
    valores: ["Curiosidad", "Respeto", "Diversidad", "Geografía"],
    parrafos: [
      { icono: "🇪🇸", texto: "España está en el suroeste de Europa. Su territorio incluye gran parte de la península ibérica y también islas en el Mediterráneo y en el Atlántico." },
      { icono: "🏔️", texto: "Hay montañas, mesetas, valles y largas costas. Por eso el paisaje puede cambiar mucho al viajar de una región a otra." },
      { icono: "🏙️", texto: "También hay grandes ciudades y pueblos pequeños. Cada lugar conserva fiestas, comidas, edificios y costumbres propias." },
      { icono: "💬", texto: "El castellano se habla en todo el país y, en algunas comunidades, convive con otras lenguas como el catalán, el gallego o el euskera." },
      { icono: "🌈", texto: "Viajar por España permite descubrir que pertenecer a un mismo país no significa que todos los lugares sean iguales. La diversidad forma parte de su riqueza cultural." }
    ],
    preguntas: [
      {
        id: "europa",
        tipo: "opcion",
        texto: "¿En qué parte de Europa está España?",
        opciones: ["En el suroeste", "En el noreste", "Fuera de Europa"],
        correcta: "En el suroeste",
        ayuda: "Busca la primera frase."
      },
      {
        id: "paisajes",
        tipo: "opcion",
        texto: "¿Qué paisajes aparecen en la lectura?",
        opciones: ["Montañas, mesetas, valles y costas", "Solo desiertos", "Solo selvas"],
        correcta: "Montañas, mesetas, valles y costas",
        ayuda: "Vuelve al segundo párrafo."
      },
      {
        id: "lenguas",
        tipo: "opcion",
        texto: "¿Qué idea explica el cuarto párrafo?",
        opciones: ["En algunas comunidades conviven varias lenguas", "Solo se habla una lengua en toda situación", "No se habla castellano"],
        correcta: "En algunas comunidades conviven varias lenguas",
        ayuda: "Busca el párrafo que habla de las lenguas."
      },
      { id: "aprendizaje", tipo: "texto", texto: "¿Qué dos ejemplos muestran la diversidad de España?" },
      { id: "vida", tipo: "texto", texto: "¿Qué lugar de España te gustaría conocer y por qué?" }
    ],
    reflexion: "La diversidad de paisajes, costumbres y lenguas ayuda a comprender que un país puede tener muchas formas de expresarse.",
    fraseDelDia: "Conocer diferencias también me ayuda a comprender y respetar.",
    apoyoVisual: {
      titulo: "🇪🇸 Cuatro pistas de diversidad",
      subtitulo: "Un mismo país puede tener muchas formas de vivir.",
      items: [
        { icono: "🏔️", etiqueta: "Paisajes", texto: "Montañas · mesetas · valles · costas", tono: "green" },
        { icono: "🏙️", etiqueta: "Lugares", texto: "Grandes ciudades y pueblos", tono: "sky" },
        { icono: "🎉", etiqueta: "Cultura", texto: "Fiestas · comidas · costumbres", tono: "amber" },
        { icono: "💬", etiqueta: "Lenguas", texto: "Castellano y otras lenguas de España", tono: "violet" }
      ],
      frase: "Paisajes, lugares, cultura y lenguas: muchas formas de descubrir España."
    }
  }
];
