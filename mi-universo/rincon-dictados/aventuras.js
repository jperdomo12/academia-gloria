/* Textos originales. Cada fragmento conserva una unidad de sentido.
   Las pausas y los signos se dictan; nunca se muestran durante la escritura. */
export const AVENTURAS = [
  {
    id: 'carta-secreta', version: '1', titulo: 'La carta secreta', nivel: 1,
    categoria: 'Misterios', icono: '✉️', color: 'lavanda',
    descripcion: 'Una carta en la ventana. ¿Quién la habrá dejado?',
    objetivo: 'Mayúscula inicial y punto.',
    frases: [
      ['La gata Luna', 'mira por la ventana.'],
      ['Una carta azul', 'descansa sobre la mesa.'],
      ['Dentro hay', 'un pequeño mapa.']
    ]
  },
  {
    id: 'shakira-escenario', version: '1', titulo: 'Una aventura con Shakira', nivel: 1,
    categoria: 'Música', icono: '🎤', color: 'menta',
    descripcion: 'Imagina que escuchas a Shakira y la música inspira tu dibujo.',
    objetivo: 'Mayúsculas, tildes en música y alegría, y punto.',
    frases: [
      ['Shakira sale', 'al escenario.'],
      ['La música empieza', 'y yo sigo', 'el ritmo.'],
      ['Después canto', 'con alegría', 'y dibujo una estrella.']
    ]
  },
  {
    id: 'viaje-mar', version: '1', titulo: 'La maleta del mar', nivel: 2,
    categoria: 'Viajes', icono: '🧳', color: 'cielo',
    descripcion: 'La playa espera y todavía queda algo por preparar.',
    objetivo: 'Palabras con b y v; mayúsculas y puntos.',
    frases: [
      ['El viernes', 'viajamos a la playa', 'con una maleta verde.'],
      ['Dentro llevamos', 'un bañador', 'y un libro de aventuras.'],
      ['Mi hermana busca', 'su sombrero favorito', 'antes de subir', 'al autobús.']
    ]
  },
  {
    id: 'huerto-azotea', version: '1', titulo: 'El huerto de la azotea', nivel: 2,
    categoria: 'Naturaleza', icono: '🌱', color: 'melocoton',
    descripcion: 'Algo nuevo ha brotado entre las macetas.',
    objetivo: 'Palabras con h y tildes en palabras frecuentes.',
    frases: [
      ['Hoy subimos', 'a la azotea', 'para cuidar el huerto.'],
      ['Una hoja pequeña', 'ha crecido', 'junto a los tomates.'],
      ['Mi hermano', 'humedece la tierra', 'con cuidado.'],
      ['Después dibujamos', 'la planta', 'en nuestro cuaderno.']
    ]
  },
  {
    id: 'teatro-luces', version: '1', titulo: 'Luces tras el telón', nivel: 3,
    categoria: 'Música', icono: '🎭', color: 'rosa',
    descripcion: 'El escenario está listo para una sorpresa compartida.',
    objetivo: 'Tildes, comas en enumeraciones y signos de interrogación.',
    frases: [
      ['El sábado', 'visitamos un teatro', 'del barrio.'],
      ['Sobre el escenario', 'había una guitarra,', 'un violín', 'y un pequeño tambor.'],
      ['¿Quién iba a tocar', 'aquellos instrumentos?'],
      ['De pronto', 'apareció una mujer', 'con un sombrero brillante.'],
      ['Nos invitó', 'a seguir el ritmo', 'con las manos', 'y toda la sala', 'se llenó de música.']
    ]
  },
  {
    id: 'mapa-estrellas', version: '1', titulo: 'Un mapa de estrellas', nivel: 3,
    categoria: 'Viajes', icono: '🔭', color: 'noche',
    descripcion: 'Una excursión nocturna para mirar el cielo de otra manera.',
    objetivo: 'Tildes, coma y signos de exclamación.',
    frases: [
      ['Al caer la tarde,', 'preparamos una mochila', 'para observar las estrellas.'],
      ['Llevábamos agua,', 'una linterna', 'y un mapa del cielo.'],
      ['Desde la colina', 'vimos una luz', 'que se movía', 'muy despacio.'],
      ['¡Era un satélite!'],
      ['Mi amiga', 'lo señaló emocionada', 'mientras yo buscaba', 'la luna', 'entre las nubes.'],
      ['Aquella noche', 'descubrimos algo nuevo', 'sin viajar muy lejos.']
    ]
  }
];
export const porId = id => AVENTURAS.find(aventura => aventura.id === id);
