export const VERBOS_META = Object.freeze({
  actividadId:"6-lengua-lenguizonas-gramatica-verbos",
  tituloActividad:"Gramática · Repasamos los verbos",
  version:"1.0",
  cursoReferencia:"6.º de Primaria",
  materia:"Lengua",
  tema:"Gramática · Repasamos los verbos"
});

export const BLOQUES_RESULTADO = Object.freeze([
  Object.freeze({
    id:"formas",
    icono:"🔗",
    titulo:"Formas simples y compuestas",
    descripcion:"Distinguir una forma verbal de una palabra de otra formada con auxiliar y participio."
  }),
  Object.freeze({
    id:"numero",
    icono:"1️⃣",
    titulo:"Número",
    descripcion:"Reconocer si la forma verbal está en singular o plural."
  }),
  Object.freeze({
    id:"persona",
    icono:"👤",
    titulo:"Persona",
    descripcion:"Identificar primera, segunda o tercera persona junto con su número."
  }),
  Object.freeze({
    id:"contexto",
    icono:"🧠",
    titulo:"Forma adecuada según el contexto",
    descripcion:"Elegir o transformar la forma verbal para que encaje con el significado de la oración."
  })
]);

function opcion(id,texto){ return Object.freeze({id,texto}); }
function reto(config){ return Object.freeze({...config,opciones:Object.freeze(config.opciones)}); }
function variante(config){ return Object.freeze({...config,tipoEvidencia:"seleccion_simple",opciones:Object.freeze(config.opciones)}); }

export const PRACTICA_VERBOS = Object.freeze([
  reto({
    id:"practica-ha-sido",
    titulo:"¿Simple o compuesta?",
    enunciado:"La patata ha sido una de las principales aportaciones de América.",
    pregunta:"¿Cómo es la forma verbal «ha sido»?",
    bloqueId:"formas",
    pista:"Observa que aparecen dos palabras verbales juntas.",
    respuestaCorrecta:"compuesta",
    explicacion:"«Ha sido» es una forma compuesta: auxiliar «ha» + participio «sido».",
    opciones:[opcion("simple","Simple"),opcion("compuesta","Compuesta")]
  }),
  reto({
    id:"practica-llego",
    titulo:"Una sola forma verbal",
    enunciado:"Esta llegó a Europa tras la conquista de Perú.",
    pregunta:"¿Cómo es la forma verbal «llegó»?",
    bloqueId:"formas",
    pista:"La forma verbal está expresada con una sola palabra.",
    respuestaCorrecta:"simple",
    explicacion:"«Llegó» es una forma verbal simple.",
    opciones:[opcion("simple","Simple"),opcion("compuesta","Compuesta")]
  }),
  reto({
    id:"practica-habia-descubierto",
    titulo:"Busca el auxiliar",
    enunciado:"Se había descubierto la patata.",
    pregunta:"¿Cómo es «había descubierto»?",
    bloqueId:"formas",
    pista:"Localiza el auxiliar y el participio.",
    respuestaCorrecta:"compuesta",
    explicacion:"«Había descubierto» es una forma compuesta.",
    opciones:[opcion("simple","Simple"),opcion("compuesta","Compuesta")]
  }),
  reto({
    id:"practica-numero-desaparecieron",
    titulo:"¿Singular o plural?",
    enunciado:"Los dinosaurios desaparecieron de la Tierra millones de años atrás.",
    pregunta:"¿En qué número está «desaparecieron»?",
    bloqueId:"numero",
    pista:"El sujeto es «los dinosaurios».",
    respuestaCorrecta:"plural",
    explicacion:"«Desaparecieron» está en plural.",
    opciones:[opcion("singular","Singular"),opcion("plural","Plural")]
  }),
  reto({
    id:"practica-numero-vienes",
    titulo:"Una persona, una forma",
    enunciado:"¿Vienes con nosotros?",
    pregunta:"¿En qué número está «vienes»?",
    bloqueId:"numero",
    pista:"La pregunta se dirige a una sola persona.",
    respuestaCorrecta:"singular",
    explicacion:"«Vienes» está en singular.",
    opciones:[opcion("singular","Singular"),opcion("plural","Plural")]
  }),
  reto({
    id:"practica-persona-desayuno",
    titulo:"Persona y número",
    enunciado:"José Luis desayunó un vaso de leche y dos tostadas.",
    pregunta:"¿Qué persona y número tiene «desayunó»?",
    bloqueId:"persona",
    pista:"La acción la realiza «José Luis».",
    respuestaCorrecta:"3s",
    explicacion:"«Desayunó» está en 3.ª persona del singular.",
    opciones:[
      opcion("1s","1.ª persona singular"),
      opcion("2s","2.ª persona singular"),
      opcion("3s","3.ª persona singular")
    ]
  }),
  reto({
    id:"practica-persona-vais",
    titulo:"Vosotras",
    enunciado:"¿A qué colegio vais vosotras?",
    pregunta:"¿Qué persona y número tiene «vais»?",
    bloqueId:"persona",
    pista:"El pronombre «vosotras» marca la persona.",
    respuestaCorrecta:"2p",
    explicacion:"«Vais» está en 2.ª persona del plural.",
    opciones:[
      opcion("2s","2.ª persona singular"),
      opcion("2p","2.ª persona plural"),
      opcion("3p","3.ª persona plural")
    ]
  }),
  reto({
    id:"practica-contexto-duchaba",
    titulo:"Dos acciones en el pasado",
    enunciado:"El teléfono sonó mientras me ________.",
    pregunta:"¿Qué forma completa mejor la oración?",
    bloqueId:"contexto",
    pista:"Una acción estaba en desarrollo cuando ocurrió otra.",
    respuestaCorrecta:"duchaba",
    explicacion:"La opción adecuada es «duchaba»: «El teléfono sonó mientras me duchaba».",
    opciones:[opcion("duche","duché"),opcion("duchaba","duchaba")]
  }),
  reto({
    id:"practica-contexto-partido",
    titulo:"Una acción anterior a otra",
    enunciado:"Cuando Mario llegó a la estación, el tren ya ________.",
    pregunta:"¿Qué forma completa mejor la oración?",
    bloqueId:"contexto",
    pista:"El tren se fue antes de que Mario llegara.",
    respuestaCorrecta:"habia-partido",
    explicacion:"La opción adecuada es «había partido».",
    opciones:[opcion("partio","partió"),opcion("habia-partido","había partido")]
  }),
  reto({
    id:"practica-transformacion",
    titulo:"Cambiar a plural",
    enunciado:"La ficha propone pasar «Leo» a plural sin cambiar de persona.",
    pregunta:"¿Qué forma corresponde?",
    bloqueId:"contexto",
    pista:"«Leo» es 1.ª persona singular; mantén la 1.ª persona y cambia a plural.",
    respuestaCorrecta:"leemos",
    explicacion:"«Leo» pasa a «leemos»: 1.ª persona del plural.",
    opciones:[opcion("leen","leen"),opcion("leemos","leemos"),opcion("leeis","leéis")]
  })
]);

export const FAMILIAS_PRUEBA_VERBOS = Object.freeze([
  Object.freeze({id:"familia-formas-a",variantes:Object.freeze([
    variante({
      id:"test-forma-ha-sido",bloqueId:"formas",conceptoId:"forma-simple-compuesta",
      titulo:"Formas verbales",enunciado:"La patata ha sido una aportación importante.",
      pregunta:"¿«Ha sido» es simple o compuesta?",
      respuestaCorrecta:"b",explicacion:"Tiene auxiliar + participio: «ha sido».",
      opciones:[opcion("a","Simple"),opcion("b","Compuesta")]
    }),
    variante({
      id:"test-forma-extendio",bloqueId:"formas",conceptoId:"forma-simple-compuesta",
      titulo:"Formas verbales",enunciado:"Su cultivo se extendió por todo el mundo.",
      pregunta:"¿«Extendió» es simple o compuesta?",
      respuestaCorrecta:"a",explicacion:"«Extendió» aparece como una sola forma verbal.",
      opciones:[opcion("a","Simple"),opcion("b","Compuesta")]
    })
  ])}),
  Object.freeze({id:"familia-formas-b",variantes:Object.freeze([
    variante({
      id:"test-forma-habia-descubierto",bloqueId:"formas",conceptoId:"auxiliar-participio",
      titulo:"Busca la forma compuesta",enunciado:"Se había descubierto la patata.",
      pregunta:"¿Qué opción describe «había descubierto»?",
      respuestaCorrecta:"c",explicacion:"Es una forma compuesta: «había» + «descubierto».",
      opciones:[opcion("a","Solo participio"),opcion("b","Forma simple"),opcion("c","Forma compuesta")]
    }),
    variante({
      id:"test-forma-sobrevivieron",bloqueId:"formas",conceptoId:"auxiliar-participio",
      titulo:"Busca la forma simple",enunciado:"Muchas familias sobrevivieron a épocas de hambre.",
      pregunta:"¿Qué tipo de forma es «sobrevivieron»?",
      respuestaCorrecta:"b",explicacion:"Es una forma simple.",
      opciones:[opcion("a","Compuesta"),opcion("b","Simple")]
    })
  ])}),
  Object.freeze({id:"familia-numero-a",variantes:Object.freeze([
    variante({
      id:"test-numero-cae",bloqueId:"numero",conceptoId:"numero-verbal",
      titulo:"Número",enunciado:"Una lluvia suave cae sobre el campo.",
      pregunta:"¿«Cae» está en singular o plural?",
      respuestaCorrecta:"a",explicacion:"«Cae» está en singular.",
      opciones:[opcion("a","Singular"),opcion("b","Plural")]
    }),
    variante({
      id:"test-numero-desaparecieron",bloqueId:"numero",conceptoId:"numero-verbal",
      titulo:"Número",enunciado:"Los dinosaurios desaparecieron de la Tierra.",
      pregunta:"¿«Desaparecieron» está en singular o plural?",
      respuestaCorrecta:"b",explicacion:"«Desaparecieron» está en plural.",
      opciones:[opcion("a","Singular"),opcion("b","Plural")]
    })
  ])}),
  Object.freeze({id:"familia-numero-b",variantes:Object.freeze([
    variante({
      id:"test-numero-estudiare",bloqueId:"numero",conceptoId:"numero-verbal",
      titulo:"Número",enunciado:"Yo estudiaré alemán durante el próximo curso.",
      pregunta:"¿«Estudiaré» está en singular o plural?",
      respuestaCorrecta:"a",explicacion:"«Estudiaré» está en singular.",
      opciones:[opcion("a","Singular"),opcion("b","Plural")]
    }),
    variante({
      id:"test-numero-vienes",bloqueId:"numero",conceptoId:"numero-verbal",
      titulo:"Número",enunciado:"¿Vienes con nosotros?",
      pregunta:"¿«Vienes» está en singular o plural?",
      respuestaCorrecta:"a",explicacion:"«Vienes» está en singular.",
      opciones:[opcion("a","Singular"),opcion("b","Plural")]
    })
  ])}),
  Object.freeze({id:"familia-persona-a",variantes:Object.freeze([
    variante({
      id:"test-persona-desayuno",bloqueId:"persona",conceptoId:"persona-numero",
      titulo:"Persona y número",enunciado:"José Luis desayunó un vaso de leche.",
      pregunta:"¿Cómo analizas «desayunó»?",
      respuestaCorrecta:"c",explicacion:"3.ª persona del singular.",
      opciones:[opcion("a","1.ª persona singular"),opcion("b","2.ª persona singular"),opcion("c","3.ª persona singular")]
    }),
    variante({
      id:"test-persona-vais",bloqueId:"persona",conceptoId:"persona-numero",
      titulo:"Persona y número",enunciado:"¿A qué colegio vais vosotras?",
      pregunta:"¿Cómo analizas «vais»?",
      respuestaCorrecta:"b",explicacion:"2.ª persona del plural.",
      opciones:[opcion("a","2.ª persona singular"),opcion("b","2.ª persona plural"),opcion("c","3.ª persona plural")]
    })
  ])}),
  Object.freeze({id:"familia-persona-b",variantes:Object.freeze([
    variante({
      id:"test-persona-estas",bloqueId:"persona",conceptoId:"persona-numero",
      titulo:"Persona y número",enunciado:"¿Estás ahí?",
      pregunta:"¿Cómo analizas «estás»?",
      respuestaCorrecta:"a",explicacion:"2.ª persona del singular.",
      opciones:[opcion("a","2.ª persona singular"),opcion("b","2.ª persona plural"),opcion("c","3.ª persona singular")]
    }),
    variante({
      id:"test-persona-estudiare",bloqueId:"persona",conceptoId:"persona-numero",
      titulo:"Persona y número",enunciado:"Yo estudiaré alemán.",
      pregunta:"¿Cómo analizas «estudiaré»?",
      respuestaCorrecta:"b",explicacion:"1.ª persona del singular.",
      opciones:[opcion("a","1.ª persona plural"),opcion("b","1.ª persona singular"),opcion("c","3.ª persona singular")]
    })
  ])}),
  Object.freeze({id:"familia-contexto-a",variantes:Object.freeze([
    variante({
      id:"test-contexto-iremos",bloqueId:"contexto",conceptoId:"forma-segun-contexto",
      titulo:"Elige la forma",enunciado:"El próximo fin de semana ________ a Córdoba.",
      pregunta:"¿Qué opción completa la oración?",
      respuestaCorrecta:"a",explicacion:"La referencia al próximo fin de semana pide «iremos».",
      opciones:[opcion("a","iremos"),opcion("b","hemos ido")]
    }),
    variante({
      id:"test-contexto-duchaba",bloqueId:"contexto",conceptoId:"forma-segun-contexto",
      titulo:"Elige la forma",enunciado:"El teléfono sonó mientras me ________.",
      pregunta:"¿Qué opción completa la oración?",
      respuestaCorrecta:"b",explicacion:"La acción estaba en desarrollo: «duchaba».",
      opciones:[opcion("a","duché"),opcion("b","duchaba")]
    })
  ])}),
  Object.freeze({id:"familia-contexto-b",variantes:Object.freeze([
    variante({
      id:"test-contexto-fuera",bloqueId:"contexto",conceptoId:"forma-segun-contexto",
      titulo:"Elige la forma",enunciado:"Si ________ millonario, tendría mi propia isla.",
      pregunta:"¿Qué opción completa la oración?",
      respuestaCorrecta:"a",explicacion:"La opción adecuada en la oración es «fuera».",
      opciones:[opcion("a","fuera"),opcion("b","sea")]
    }),
    variante({
      id:"test-contexto-habia-partido",bloqueId:"contexto",conceptoId:"forma-segun-contexto",
      titulo:"Elige la forma",enunciado:"Cuando Mario llegó a la estación, el tren ya ________.",
      pregunta:"¿Qué opción completa la oración?",
      respuestaCorrecta:"b",explicacion:"El tren se había marchado antes: «había partido».",
      opciones:[opcion("a","partió"),opcion("b","había partido")]
    })
  ])})
]);
