// Contenido original de Academia; cinco fuentes escolares y cobertura en la SPEC propietaria.

export const PAST_META = Object.freeze({
  "actividadId": "6-english-past-simple-vs-past-continuous",
  "tituloActividad": "Past Simple vs Past Continuous",
  "version": "1.0",
  "cursoReferencia": "6.º de Primaria",
  "materia": "English",
  "tema": "Past Simple vs Past Continuous",
  "cierreFirmes": "hoy conectaste las acciones pasadas, sus momentos y sus estructuras."
});

export const BLOQUES_RESULTADO = Object.freeze([
  {
    "id": "past-simple",
    "icono": "📍",
    "titulo": "Past Simple",
    "descripcion": "Acciones terminadas, was/were, had, did y formas verbales."
  },
  {
    "id": "past-continuous",
    "icono": "〰️",
    "titulo": "Past Continuous",
    "descripcion": "Acciones en curso, was/were + -ing y transformaciones."
  },
  {
    "id": "contraste",
    "icono": "🔀",
    "titulo": "Acciones y tiempo",
    "descripcion": "Relacionar acción en curso, hecho, simultaneidad y sucesión."
  },
  {
    "id": "reading-correction",
    "icono": "🔎",
    "titulo": "Reading y revisión",
    "descripcion": "Comprender el relato, justificar y corregir errores."
  }
]);

export const LECTURAS = Object.freeze([
  {
    "id": "garden",
    "titulo": "The garden notebook",
    "texto": "On Saturday, Ella visited the school garden. At ten o’clock, she was drawing a leaf while her friend Ben was measuring a plant. A robin landed beside them. Ella stopped drawing and took a photo. Then Ben closed his notebook and put it in his bag. They did not pick any flowers. At eleven, they left the garden together."
  },
  {
    "id": "radio",
    "titulo": "A radio story",
    "texto": "Maya: What did you do on Sunday?\nLeo: I made a radio story at home. At three o’clock, I was recording a story while my sister was drawing its cover.\nMaya: What happened next?\nLeo: Our dog barked. I paused the recording and closed the door. Then I recorded the ending.\nMaya: Are you listening to it now?\nLeo: Yes, I am. I like the ending."
  }
]);

export const FICHAS = Object.freeze([
  {
    "id": "be",
    "titulo": "Was / were",
    "estructura": "I, he, she, it → was · you, we, they → were.",
    "ejemplo": "She was at the club. Was she there? Yes, she was.",
    "ayuda": "Con be no usamos did: invertimos was/were. She wasn’t there es la negativa."
  },
  {
    "id": "have",
    "titulo": "Had / did have",
    "estructura": "Afirmativa: todos los sujetos + had. Negativa: didn’t + have.",
    "ejemplo": "I had a red pen. Did you have a pen? Yes, I did.",
    "ayuda": "No respondas Yes, I had a una pregunta con Did. Usamos Yes, I did / No, I didn’t."
  },
  {
    "id": "simple",
    "titulo": "Simple: tres formas",
    "estructura": "Sujeto + pasado · sujeto + didn’t + base · Did + sujeto + base?",
    "ejemplo": "He opened the window. He didn’t open it. Did he open it?",
    "ayuda": "El pasado lo expresa did/didn’t en preguntas y negativas; el verbo principal vuelve a la base."
  },
  {
    "id": "ed",
    "titulo": "Regular: -ed / -d",
    "estructura": "help → helped · live → lived",
    "ejemplo": "We helped a neighbour. She lived near the park.",
    "ayuda": "Si ya termina en e, añadimos solo d."
  },
  {
    "id": "y",
    "titulo": "Consonante o vocal + y",
    "estructura": "try → tried · enjoy → enjoyed",
    "ejemplo": "She tried again. They enjoyed the trip.",
    "ayuda": "Con consonante + y cambiamos y por i. Con vocal + y conservamos y."
  },
  {
    "id": "cvc",
    "titulo": "¿Duplico la consonante?",
    "estructura": "stop → stopped · plan → planned · visit → visited",
    "ejemplo": "The car stopped. We visited the tower.",
    "ayuda": "En estos verbos cortos CVC duplicamos la consonante final. En verbos de varias sílabas, si la última sílaba CVC lleva el acento, también se duplica (prefer → preferred); visit no lleva el acento al final y no duplica. No es una regla de toda palabra que termine en consonante; w, x e y no se duplican."
  },
  {
    "id": "irregular",
    "titulo": "Irregulars: cambia la forma",
    "estructura": "go → went · buy → bought · eat → ate · do → did · take → took · write → wrote · drink → drank · speak → spoke · wake up → woke up",
    "ejemplo": "We went out and bought bread.",
    "ayuda": "No añadimos ed a estos verbos. Son ejemplos de apoyo, no una lista oficial completa de evaluación."
  },
  {
    "id": "continuous",
    "titulo": "Continuous: tres formas",
    "estructura": "Sujeto + was/were + ing · was/were not + ing · Was/Were + sujeto + ing?",
    "ejemplo": "They were walking. They weren’t walking. Were they walking?",
    "ayuda": "Para una acción en curso en un momento pasado. Respuestas: Yes, they were / No, they weren’t."
  },
  {
    "id": "ing",
    "titulo": "Cómo formar -ing",
    "estructura": "read → reading · make → making · run → running · lie → lying",
    "ejemplo": "I was making a model. The dog was lying nearby.",
    "ayuda": "Generalmente añadimos ing. E final muda suele desaparecer; CVC corto duplica; ie cambia a y. Ver, por ejemplo, see → seeing: no eliminamos ambas e."
  },
  {
    "id": "time",
    "titulo": "Expresiones de tiempo",
    "estructura": "yesterday · last week · two days ago · the day before yesterday · in 2020",
    "ejemplo": "At eight yesterday, we were having breakfast. Yesterday, we had breakfast at eight.",
    "ayuda": "Las expresiones sitúan el pasado, pero la forma depende de si contamos un hecho completo o lo que estaba en curso."
  },
  {
    "id": "links",
    "titulo": "When / while",
    "estructura": "When the lights came on, we were dancing. When we were dancing, the lights came on.",
    "ejemplo": "While we were drawing, our friends were reading.",
    "ayuda": "Comprende cada cláusula: when también puede introducir el proceso. While suele introducir duración, pero no obliga a que el otro verbo sea Continuous."
  },
  {
    "id": "review",
    "titulo": "Check before choosing",
    "estructura": "¿Qué estaba ocurriendo? ¿Qué ocurrió? ¿Se cuenta una secuencia?",
    "ejemplo": "She didn’t go. She was going. Was she going?",
    "ayuda": "Revisa significado, sujeto, auxiliar y verbo. Cambiar una palabra clave no sustituye al razonamiento."
  }
]);

export const ESCENAS = Object.freeze([
  {
    "id": "event",
    "titulo": "Un hecho durante un proceso",
    "frase": "I was reading when the doorbell rang.",
    "invertida": "When the doorbell rang, I was reading.",
    "descripcion": "La lectura estaba en curso. El timbre sonó durante esa actividad. Cambiar el orden de las cláusulas no cambia cuándo pasó cada cosa.",
    "pistas": [
      "was reading · acción en curso",
      "rang · hecho puntual"
    ],
    "tipos": [
      "tramo",
      "marca"
    ],
    "inicio": [
      "reading",
      "doorbell"
    ]
  },
  {
    "id": "together",
    "titulo": "Dos procesos al mismo tiempo",
    "frase": "While I was painting, my brother was reading.",
    "invertida": "My brother was reading while I was painting.",
    "descripcion": "Los dos procesos estaban en curso a la vez. No hay aquí una interrupción puntual.",
    "pistas": [
      "was painting · proceso",
      "was reading · proceso"
    ],
    "tipos": [
      "tramo",
      "tramo"
    ],
    "inicio": [
      "painting",
      "reading"
    ]
  },
  {
    "id": "sequence",
    "titulo": "Primero una cosa, después otra",
    "frase": "When I arrived, I opened my notebook.",
    "invertida": "I opened my notebook when I arrived.",
    "descripcion": "La llegada y abrir el cuaderno se cuentan como hechos terminados y sucesivos. When no obliga a mezclar dos tiempos.",
    "pistas": [
      "arrived · primer hecho",
      "opened · hecho siguiente"
    ],
    "tipos": [
      "marca",
      "marca"
    ],
    "inicio": [
      "arrival",
      "notebook"
    ]
  },
  {
    "id": "when-process",
    "titulo": "When también puede introducir el proceso",
    "frase": "When I was walking home, I found a coin.",
    "invertida": "I found a coin when I was walking home.",
    "descripcion": "Caminar ya estaba ocurriendo cuando encontré la moneda. El significado decide: no una equivalencia automática de when con Simple.",
    "pistas": [
      "was walking · acción en curso",
      "found · hecho puntual"
    ],
    "tipos": [
      "tramo",
      "marca"
    ],
    "inicio": [
      "walking",
      "coin"
    ]
  }
]);

// Cada relato se mantiene una sola vez. El Motor recibe su contexto resuelto.
function conLectura(item){
 if(!item.lecturaId)return Object.freeze(item);
 const lectura=LECTURAS.find(r=>r.id===item.lecturaId);
 if(!lectura)throw new Error("Lectura no encontrada: "+item.lecturaId);
 return Object.freeze({...item,contextoLectura:lectura.texto,textoLectura:lectura.texto+"\n"+item.enunciado});
}

export const PRACTICA = Object.freeze([
  {
    "id": "p-form-1",
    "bloqueId": "past-simple",
    "conceptoId": "formas",
    "titulo": "Make the past form",
    "enunciado": "clean",
    "pregunta": "Escribe el Past Simple de este verbo.",
    "explicacion": "clean añade -ed: cleaned.",
    "pista": "¿Es regular o irregular? Revisa la terminación.",
    "pistas": [
      "¿Es regular o irregular? Revisa la terminación.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. ¿Es regular o irregular? Revisa la terminación.",
    "idiomaLectura": "en-GB",
    "textoLectura": "clean",
    "focoId": "formas",
    "formato": "texto",
    "habilidad": "conjugar",
    "respuestaCorrecta": "cleaned",
    "respuestasValidas": [
      "cleaned"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-form-2",
    "bloqueId": "past-simple",
    "conceptoId": "formas",
    "titulo": "Make the past form",
    "enunciado": "dance",
    "pregunta": "Escribe el Past Simple de este verbo.",
    "explicacion": "dance ya termina en e: añade solo d.",
    "pista": "¿Es regular o irregular? Revisa la terminación.",
    "pistas": [
      "¿Es regular o irregular? Revisa la terminación.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. ¿Es regular o irregular? Revisa la terminación.",
    "idiomaLectura": "en-GB",
    "textoLectura": "dance",
    "focoId": "formas",
    "formato": "texto",
    "habilidad": "conjugar",
    "respuestaCorrecta": "danced",
    "respuestasValidas": [
      "danced"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-form-3",
    "bloqueId": "past-simple",
    "conceptoId": "formas",
    "titulo": "Make the past form",
    "enunciado": "carry",
    "pregunta": "Escribe el Past Simple de este verbo.",
    "explicacion": "Consonante + y: cambia y por i antes de ed.",
    "pista": "¿Es regular o irregular? Revisa la terminación.",
    "pistas": [
      "¿Es regular o irregular? Revisa la terminación.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. ¿Es regular o irregular? Revisa la terminación.",
    "idiomaLectura": "en-GB",
    "textoLectura": "carry",
    "focoId": "formas",
    "formato": "texto",
    "habilidad": "conjugar",
    "respuestaCorrecta": "carried",
    "respuestasValidas": [
      "carried"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-form-4",
    "bloqueId": "past-simple",
    "conceptoId": "formas",
    "titulo": "Make the past form",
    "enunciado": "play",
    "pregunta": "Escribe el Past Simple de este verbo.",
    "explicacion": "Vocal + y: conserva y y añade ed.",
    "pista": "¿Es regular o irregular? Revisa la terminación.",
    "pistas": [
      "¿Es regular o irregular? Revisa la terminación.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. ¿Es regular o irregular? Revisa la terminación.",
    "idiomaLectura": "en-GB",
    "textoLectura": "play",
    "focoId": "formas",
    "formato": "texto",
    "habilidad": "conjugar",
    "respuestaCorrecta": "played",
    "respuestasValidas": [
      "played"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-form-5",
    "bloqueId": "past-simple",
    "conceptoId": "formas",
    "titulo": "Make the past form",
    "enunciado": "stop",
    "pregunta": "Escribe el Past Simple de este verbo.",
    "explicacion": "stop tiene una sílaba y final CVC; duplica p.",
    "pista": "¿Es regular o irregular? Revisa la terminación.",
    "pistas": [
      "¿Es regular o irregular? Revisa la terminación.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. ¿Es regular o irregular? Revisa la terminación.",
    "idiomaLectura": "en-GB",
    "textoLectura": "stop",
    "focoId": "formas",
    "formato": "texto",
    "habilidad": "conjugar",
    "respuestaCorrecta": "stopped",
    "respuestasValidas": [
      "stopped"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-form-6",
    "bloqueId": "past-simple",
    "conceptoId": "formas",
    "titulo": "Make the past form",
    "enunciado": "visit",
    "pregunta": "Escribe el Past Simple de este verbo.",
    "explicacion": "La última sílaba de visit no lleva el acento: no duplica t.",
    "pista": "¿Es regular o irregular? Revisa la terminación.",
    "pistas": [
      "¿Es regular o irregular? Revisa la terminación.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. ¿Es regular o irregular? Revisa la terminación.",
    "idiomaLectura": "en-GB",
    "textoLectura": "visit",
    "focoId": "formas",
    "formato": "texto",
    "habilidad": "conjugar",
    "respuestaCorrecta": "visited",
    "respuestasValidas": [
      "visited"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-form-7",
    "bloqueId": "past-simple",
    "conceptoId": "formas",
    "titulo": "Make the past form",
    "enunciado": "buy",
    "pregunta": "Escribe el Past Simple de este verbo.",
    "explicacion": "buy es irregular: su Past Simple es bought.",
    "pista": "¿Es regular o irregular? Revisa la terminación.",
    "pistas": [
      "¿Es regular o irregular? Revisa la terminación.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. ¿Es regular o irregular? Revisa la terminación.",
    "idiomaLectura": "en-GB",
    "textoLectura": "buy",
    "focoId": "formas",
    "formato": "texto",
    "habilidad": "conjugar",
    "respuestaCorrecta": "bought",
    "respuestasValidas": [
      "bought"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-form-8",
    "bloqueId": "past-simple",
    "conceptoId": "formas",
    "titulo": "Make the past form",
    "enunciado": "write",
    "pregunta": "Escribe el Past Simple de este verbo.",
    "explicacion": "write es irregular: su Past Simple es wrote.",
    "pista": "¿Es regular o irregular? Revisa la terminación.",
    "pistas": [
      "¿Es regular o irregular? Revisa la terminación.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. ¿Es regular o irregular? Revisa la terminación.",
    "idiomaLectura": "en-GB",
    "textoLectura": "write",
    "focoId": "formas",
    "formato": "texto",
    "habilidad": "conjugar",
    "respuestaCorrecta": "wrote",
    "respuestasValidas": [
      "wrote"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-simple-1",
    "bloqueId": "past-simple",
    "conceptoId": "simple",
    "titulo": "A finished visit",
    "enunciado": "Yesterday, we ___ at the aquarium. (be)",
    "pregunta": "Completa solo el hueco.",
    "explicacion": "We lleva were. Es un estado pasado; no usamos did con be.",
    "pista": "Mira el sujeto: we.",
    "pistas": [
      "Mira el sujeto: we.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Mira el sujeto: we.",
    "idiomaLectura": "en-GB",
    "textoLectura": "Yesterday, we ___ at the aquarium. (be)",
    "focoId": "simple",
    "formato": "texto",
    "habilidad": "completar",
    "respuestaCorrecta": "were",
    "respuestasValidas": [
      "were"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-simple-2",
    "bloqueId": "past-simple",
    "conceptoId": "simple",
    "titulo": "A useful tool",
    "enunciado": "Yesterday, I ___ a map in my bag. (have)",
    "pregunta": "Completa solo el hueco.",
    "explicacion": "Have pasa a had con todos los sujetos en afirmativa.",
    "pista": "Hablamos de algo que tenía ayer.",
    "pistas": [
      "Hablamos de algo que tenía ayer.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Hablamos de algo que tenía ayer.",
    "idiomaLectura": "en-GB",
    "textoLectura": "Yesterday, I ___ a map in my bag. (have)",
    "focoId": "simple",
    "formato": "texto",
    "habilidad": "completar",
    "respuestaCorrecta": "had",
    "respuestasValidas": [
      "had"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-simple-3",
    "bloqueId": "past-simple",
    "conceptoId": "simple",
    "titulo": "Make it negative",
    "enunciado": "He went to the library yesterday.",
    "pregunta": "Escribe la frase completa en negativa.",
    "explicacion": "Didn’t ya expresa pasado: go vuelve a la forma base.",
    "pista": "Después de didn’t, ¿go o went?",
    "pistas": [
      "Después de didn’t, ¿go o went?",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Después de didn’t, ¿go o went?",
    "idiomaLectura": "en-GB",
    "textoLectura": "He went to the library yesterday.",
    "focoId": "simple",
    "formato": "texto",
    "habilidad": "transformar",
    "respuestaCorrecta": "He didn't go to the library yesterday.",
    "respuestasValidas": [
      "He didn't go to the library yesterday."
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-simple-4",
    "bloqueId": "past-simple",
    "conceptoId": "simple",
    "titulo": "Ask about the trip",
    "enunciado": "They travelled by train last week.",
    "pregunta": "Escribe la pregunta completa con Did.",
    "explicacion": "Did va delante del sujeto; travel queda en forma base.",
    "pista": "Did + sujeto + verbo base.",
    "pistas": [
      "Did + sujeto + verbo base.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Did + sujeto + verbo base.",
    "idiomaLectura": "en-GB",
    "textoLectura": "They travelled by train last week.",
    "focoId": "simple",
    "formato": "texto",
    "habilidad": "transformar",
    "respuestaCorrecta": "Did they travel by train last week?",
    "respuestasValidas": [
      "Did they travel by train last week?"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-simple-5",
    "bloqueId": "past-simple",
    "conceptoId": "simple",
    "titulo": "Answer a Did question",
    "enunciado": "Did she have a ticket? Yes, she ___.",
    "pregunta": "Completa la respuesta corta.",
    "explicacion": "La pregunta usa Did: Yes, she did. No respondemos Yes, she had.",
    "pista": "Escucha el auxiliar de la pregunta.",
    "pistas": [
      "Escucha el auxiliar de la pregunta.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Escucha el auxiliar de la pregunta.",
    "idiomaLectura": "en-GB",
    "textoLectura": "Did she have a ticket? Yes, she ___.",
    "focoId": "simple",
    "formato": "texto",
    "habilidad": "completar",
    "respuestaCorrecta": "did",
    "respuestasValidas": [
      "did"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-simple-6",
    "bloqueId": "past-simple",
    "conceptoId": "simple",
    "titulo": "Build a sentence",
    "enunciado": "last night / I / cook / soup",
    "pregunta": "Escribe una afirmativa en Past Simple. Empieza por I.",
    "explicacion": "La acción terminó anoche: cooked. Orden: sujeto, verbo, complemento y tiempo.",
    "pista": "¿Qué cocinaste y cuándo?",
    "pistas": [
      "¿Qué cocinaste y cuándo?",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. ¿Qué cocinaste y cuándo?",
    "idiomaLectura": "en-GB",
    "textoLectura": "last night / I / cook / soup",
    "focoId": "simple",
    "formato": "texto",
    "habilidad": "construir",
    "respuestaCorrecta": "I cooked soup last night.",
    "respuestasValidas": [
      "I cooked soup last night."
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-simple-7",
    "bloqueId": "past-simple",
    "conceptoId": "simple",
    "titulo": "Two days ago",
    "enunciado": "She ___ her cousin two days ago.",
    "pregunta": "¿Qué forma cuenta la visita terminada?",
    "explicacion": "Visited cuenta una visita terminada dos días atrás.",
    "pista": "Localiza el momento pasado y el verbo.",
    "pistas": [
      "Localiza el momento pasado y el verbo.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Localiza el momento pasado y el verbo.",
    "idiomaLectura": "en-GB",
    "textoLectura": "She ___ her cousin two days ago.",
    "focoId": "simple",
    "habilidad": "elegir",
    "opciones": [
      {
        "id": "0",
        "texto": "visits"
      },
      {
        "id": "1",
        "texto": "visited"
      },
      {
        "id": "2",
        "texto": "is visiting"
      }
    ],
    "respuestaCorrecta": "1",
    "tipoEvidencia": "seleccion_simple"
  },
  {
    "id": "p-simple-8",
    "bloqueId": "past-simple",
    "conceptoId": "simple",
    "titulo": "Ask with be",
    "enunciado": "She was at the studio yesterday.",
    "pregunta": "Escribe la pregunta completa.",
    "explicacion": "Con be se invierte was y el sujeto; no añadimos did.",
    "pista": "Was + sujeto + complemento.",
    "pistas": [
      "Was + sujeto + complemento.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Was + sujeto + complemento.",
    "idiomaLectura": "en-GB",
    "textoLectura": "She was at the studio yesterday.",
    "focoId": "simple",
    "formato": "texto",
    "habilidad": "transformar",
    "respuestaCorrecta": "Was she at the studio yesterday?",
    "respuestasValidas": [
      "Was she at the studio yesterday?"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-cont-1",
    "bloqueId": "past-continuous",
    "conceptoId": "continuous",
    "titulo": "At a past moment",
    "enunciado": "At five yesterday, I ___ a puzzle. (do)",
    "pregunta": "Completa con Past Continuous.",
    "explicacion": "I lleva was; la acción estaba en curso a las cinco.",
    "pista": "Was/were + verbo en -ing.",
    "pistas": [
      "Was/were + verbo en -ing.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Was/were + verbo en -ing.",
    "idiomaLectura": "en-GB",
    "textoLectura": "At five yesterday, I ___ a puzzle. (do)",
    "focoId": "continuous",
    "formato": "texto",
    "habilidad": "completar",
    "respuestaCorrecta": "was doing",
    "respuestasValidas": [
      "was doing"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-cont-2",
    "bloqueId": "past-continuous",
    "conceptoId": "continuous",
    "titulo": "Two people",
    "enunciado": "At noon yesterday, they ___ sandwiches. (make)",
    "pregunta": "Completa con Past Continuous.",
    "explicacion": "They lleva were; make pierde la e final: making.",
    "pista": "Comprueba el sujeto y la e de make.",
    "pistas": [
      "Comprueba el sujeto y la e de make.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Comprueba el sujeto y la e de make.",
    "idiomaLectura": "en-GB",
    "textoLectura": "At noon yesterday, they ___ sandwiches. (make)",
    "focoId": "continuous",
    "formato": "texto",
    "habilidad": "completar",
    "respuestaCorrecta": "were making",
    "respuestasValidas": [
      "were making"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-cont-3",
    "bloqueId": "past-continuous",
    "conceptoId": "continuous",
    "titulo": "A past question",
    "enunciado": "She was painting a model at six.",
    "pregunta": "Transforma la frase en pregunta.",
    "explicacion": "Was pasa delante de she; painting permanece igual.",
    "pista": "No necesitas did: el auxiliar es was.",
    "pistas": [
      "No necesitas did: el auxiliar es was.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. No necesitas did: el auxiliar es was.",
    "idiomaLectura": "en-GB",
    "textoLectura": "She was painting a model at six.",
    "focoId": "continuous",
    "formato": "texto",
    "habilidad": "transformar",
    "respuestaCorrecta": "Was she painting a model at six?",
    "respuestasValidas": [
      "Was she painting a model at six?"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-cont-4",
    "bloqueId": "past-continuous",
    "conceptoId": "continuous",
    "titulo": "Make it negative",
    "enunciado": "We were watching the birds at eight.",
    "pregunta": "Escribe la frase completa en negativa.",
    "explicacion": "Añadimos not a were, conservando watching.",
    "pista": "We were not también puede contraerse.",
    "pistas": [
      "We were not también puede contraerse.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. We were not también puede contraerse.",
    "idiomaLectura": "en-GB",
    "textoLectura": "We were watching the birds at eight.",
    "focoId": "continuous",
    "formato": "texto",
    "habilidad": "transformar",
    "respuestaCorrecta": "We weren't watching the birds at eight.",
    "respuestasValidas": [
      "We weren't watching the birds at eight."
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-cont-5",
    "bloqueId": "past-continuous",
    "conceptoId": "continuous",
    "titulo": "Build the scene",
    "enunciado": "at nine / he / not / run",
    "pregunta": "Construye la negativa en Past Continuous. Empieza por He.",
    "explicacion": "He lleva was not; run duplica n antes de ing.",
    "pista": "Was not + running; sitúa el tiempo al final.",
    "pistas": [
      "Was not + running; sitúa el tiempo al final.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Was not + running; sitúa el tiempo al final.",
    "idiomaLectura": "en-GB",
    "textoLectura": "at nine / he / not / run",
    "focoId": "continuous",
    "formato": "texto",
    "habilidad": "construir",
    "respuestaCorrecta": "He wasn't running at nine.",
    "respuestasValidas": [
      "He wasn't running at nine."
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-cont-6",
    "bloqueId": "past-continuous",
    "conceptoId": "continuous",
    "titulo": "Ask for information",
    "enunciado": "what / you / do / at four yesterday",
    "pregunta": "Construye la pregunta en Past Continuous.",
    "explicacion": "What + were + you + doing pregunta por una acción en curso.",
    "pista": "La palabra de pregunta va antes del auxiliar.",
    "pistas": [
      "La palabra de pregunta va antes del auxiliar.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. La palabra de pregunta va antes del auxiliar.",
    "idiomaLectura": "en-GB",
    "textoLectura": "what / you / do / at four yesterday",
    "focoId": "continuous",
    "formato": "texto",
    "habilidad": "construir",
    "respuestaCorrecta": "What were you doing at four yesterday?",
    "respuestasValidas": [
      "What were you doing at four yesterday?"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-cont-7",
    "bloqueId": "past-continuous",
    "conceptoId": "continuous",
    "titulo": "A short answer",
    "enunciado": "Were they waiting outside? No, they ___.",
    "pregunta": "Completa la respuesta corta.",
    "explicacion": "Con they, la negativa corta es they were not / weren’t.",
    "pista": "La pregunta empieza por Were.",
    "pistas": [
      "La pregunta empieza por Were.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. La pregunta empieza por Were.",
    "idiomaLectura": "en-GB",
    "textoLectura": "Were they waiting outside? No, they ___.",
    "focoId": "continuous",
    "formato": "texto",
    "habilidad": "completar",
    "respuestaCorrecta": "weren't",
    "respuestasValidas": [
      "weren't"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-cont-8",
    "bloqueId": "past-continuous",
    "conceptoId": "continuous",
    "titulo": "Lying on a rug",
    "enunciado": "At seven, the cat ___ on the rug. (lie)",
    "pregunta": "Completa con Past Continuous.",
    "explicacion": "It lleva was; lie cambia ie por y antes de ing: lying.",
    "pista": "Lie → lying. Falta también el auxiliar.",
    "pistas": [
      "Lie → lying. Falta también el auxiliar.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Lie → lying. Falta también el auxiliar.",
    "idiomaLectura": "en-GB",
    "textoLectura": "At seven, the cat ___ on the rug. (lie)",
    "focoId": "continuous",
    "formato": "texto",
    "habilidad": "completar",
    "respuestaCorrecta": "was lying",
    "respuestasValidas": [
      "was lying"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-mix-1",
    "bloqueId": "contraste",
    "conceptoId": "contraste",
    "titulo": "A sound during an activity",
    "enunciado": "I ___ a comic when the bell rang. (read)",
    "pregunta": "Escribe la acción que ya estaba en curso.",
    "explicacion": "La lectura estaba en curso cuando sonó el timbre.",
    "pista": "¿Qué estaba pasando antes de oír el sonido?",
    "pistas": [
      "¿Qué estaba pasando antes de oír el sonido?",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. ¿Qué estaba pasando antes de oír el sonido?",
    "idiomaLectura": "en-GB",
    "textoLectura": "I ___ a comic when the bell rang. (read)",
    "focoId": "contraste",
    "formato": "texto",
    "habilidad": "completar",
    "respuestaCorrecta": "was reading",
    "respuestasValidas": [
      "was reading"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-mix-2",
    "bloqueId": "contraste",
    "conceptoId": "contraste",
    "titulo": "An arrival",
    "enunciado": "While we were building a den, our friend ___. (arrive)",
    "pregunta": "Escribe el hecho que ocurrió.",
    "explicacion": "La llegada ocurrió mientras la construcción estaba en curso.",
    "pista": "No elijas el tiempo solo por while: mira la acción de llegar.",
    "pistas": [
      "No elijas el tiempo solo por while: mira la acción de llegar.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. No elijas el tiempo solo por while: mira la acción de llegar.",
    "idiomaLectura": "en-GB",
    "textoLectura": "While we were building a den, our friend ___. (arrive)",
    "focoId": "contraste",
    "formato": "texto",
    "habilidad": "completar",
    "respuestaCorrecta": "arrived",
    "respuestasValidas": [
      "arrived"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-mix-3",
    "bloqueId": "contraste",
    "conceptoId": "contraste",
    "titulo": "Two finished steps",
    "enunciado": "First, I ___ the box. Then I ___ the letter. (open / read)",
    "pregunta": "Escribe las dos formas separadas por / .",
    "explicacion": "Abrir y leer se cuentan aquí como dos acciones terminadas y sucesivas.",
    "pista": "First y Then ordenan dos hechos completos.",
    "pistas": [
      "First y Then ordenan dos hechos completos.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. First y Then ordenan dos hechos completos.",
    "idiomaLectura": "en-GB",
    "textoLectura": "First, I ___ the box. Then I ___ the letter. (open / read)",
    "focoId": "contraste",
    "formato": "texto",
    "habilidad": "completar",
    "respuestaCorrecta": "opened / read",
    "respuestasValidas": [
      "opened / read"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-mix-4",
    "bloqueId": "contraste",
    "conceptoId": "contraste",
    "titulo": "At the same time",
    "enunciado": "At six, Mum ___ while I ___ the table. (cook / set)",
    "pregunta": "Las dos acciones estaban en curso a la vez. Escribe ambas formas separadas por / .",
    "explicacion": "Ambas actividades estaban en curso a las seis; set duplica t.",
    "pista": "Hay dos acciones simultáneas, no una interrupción.",
    "pistas": [
      "Hay dos acciones simultáneas, no una interrupción.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Hay dos acciones simultáneas, no una interrupción.",
    "idiomaLectura": "en-GB",
    "textoLectura": "At six, Mum ___ while I ___ the table. (cook / set)",
    "focoId": "contraste",
    "formato": "texto",
    "habilidad": "completar",
    "respuestaCorrecta": "was cooking / was setting",
    "respuestasValidas": [
      "was cooking / was setting"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-mix-5",
    "bloqueId": "contraste",
    "conceptoId": "contraste",
    "titulo": "When with an action in progress",
    "enunciado": "When I was walking to the pool, I found a key.",
    "pregunta": "¿Qué estaba en curso?",
    "explicacion": "Walking estaba en curso aunque su cláusula empiece por when.",
    "pista": "¿Qué proceso ya había comenzado cuando encontró la llave?",
    "pistas": [
      "¿Qué proceso ya había comenzado cuando encontró la llave?",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. ¿Qué proceso ya había comenzado cuando encontró la llave?",
    "idiomaLectura": "en-GB",
    "textoLectura": "When I was walking to the pool, I found a key.",
    "focoId": "contraste",
    "habilidad": "elegir",
    "opciones": [
      {
        "id": "0",
        "texto": "Walking to the pool"
      },
      {
        "id": "1",
        "texto": "Finding the key"
      },
      {
        "id": "2",
        "texto": "Nothing"
      }
    ],
    "respuestaCorrecta": "0",
    "tipoEvidencia": "seleccion_simple"
  },
  {
    "id": "p-mix-6",
    "bloqueId": "contraste",
    "conceptoId": "contraste",
    "titulo": "Choose by meaning",
    "enunciado": "While Mia was drawing, Leo was reading beside her.",
    "pregunta": "¿Qué relación describe la frase?",
    "explicacion": "Los dos procesos estaban en curso al mismo tiempo.",
    "pista": "No hay una acción puntual que interrumpa a la otra.",
    "pistas": [
      "No hay una acción puntual que interrumpa a la otra.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. No hay una acción puntual que interrumpa a la otra.",
    "idiomaLectura": "en-GB",
    "textoLectura": "While Mia was drawing, Leo was reading beside her.",
    "focoId": "contraste",
    "habilidad": "elegir",
    "opciones": [
      {
        "id": "0",
        "texto": "Dos acciones a la vez"
      },
      {
        "id": "1",
        "texto": "Una acción después de otra"
      },
      {
        "id": "2",
        "texto": "Una rutina actual"
      }
    ],
    "respuestaCorrecta": "0",
    "tipoEvidencia": "seleccion_simple"
  },
  {
    "id": "p-mix-7",
    "bloqueId": "contraste",
    "conceptoId": "contraste",
    "titulo": "The event comes first",
    "enunciado": "When the visitors arrived, we ___ the room. (decorate)",
    "pregunta": "Completa la acción que estaba en curso.",
    "explicacion": "Cambiar el orden de las cláusulas no cambia la relación temporal.",
    "pista": "El evento es la llegada; decorar ya estaba ocurriendo.",
    "pistas": [
      "El evento es la llegada; decorar ya estaba ocurriendo.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. El evento es la llegada; decorar ya estaba ocurriendo.",
    "idiomaLectura": "en-GB",
    "textoLectura": "When the visitors arrived, we ___ the room. (decorate)",
    "focoId": "contraste",
    "formato": "texto",
    "habilidad": "completar",
    "respuestaCorrecta": "were decorating",
    "respuestasValidas": [
      "were decorating"
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-mix-8",
    "bloqueId": "contraste",
    "conceptoId": "contraste",
    "titulo": "A completed sequence",
    "enunciado": "When the lesson ended, I packed my bag and left.",
    "pregunta": "¿Por qué se usan acciones en Past Simple?",
    "explicacion": "Ended, packed y left relatan hechos completos; when no decide por sí solo.",
    "pista": "Imagina el final de la clase, recoger y salir.",
    "pistas": [
      "Imagina el final de la clase, recoger y salir.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Imagina el final de la clase, recoger y salir.",
    "idiomaLectura": "en-GB",
    "textoLectura": "When the lesson ended, I packed my bag and left.",
    "focoId": "contraste",
    "habilidad": "elegir",
    "opciones": [
      {
        "id": "0",
        "texto": "Son tres hechos terminados en orden"
      },
      {
        "id": "1",
        "texto": "When obliga a usar Simple en toda frase"
      },
      {
        "id": "2",
        "texto": "Todas ocurrían ahora"
      }
    ],
    "respuestaCorrecta": "0",
    "tipoEvidencia": "seleccion_simple"
  },
  {
    "id": "p-read-1",
    "bloqueId": "reading-correction",
    "conceptoId": "reading",
    "titulo": "The garden notebook",
    "enunciado": "Who was measuring a plant at ten?",
    "pregunta": "Elige la respuesta apoyándote en el texto.",
    "explicacion": "El texto dice que Ben estaba midiendo mientras Ella dibujaba.",
    "pista": "Relee la frase que sitúa a esa persona o acción.",
    "pistas": [
      "Relee la frase que sitúa a esa persona o acción.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Relee la frase que sitúa a esa persona o acción.",
    "idiomaLectura": "en-GB",
    "focoId": "reading",
    "habilidad": "leer",
    "opciones": [
      {
        "id": "0",
        "texto": "Ben, while Ella was drawing."
      },
      {
        "id": "1",
        "texto": "Ella, after she took the photo."
      },
      {
        "id": "2",
        "texto": "The robin, before it landed."
      }
    ],
    "respuestaCorrecta": "0",
    "tipoEvidencia": "seleccion_simple",
    "lecturaId": "garden"
  },
  {
    "id": "p-read-2",
    "bloqueId": "reading-correction",
    "conceptoId": "reading",
    "titulo": "The garden notebook",
    "enunciado": "True or false: Ella took a photo before the robin landed.",
    "pregunta": "Elige la respuesta apoyándote en el texto.",
    "explicacion": "El orden es landed → stopped drawing → took a photo.",
    "pista": "Relee la frase que sitúa a esa persona o acción.",
    "pistas": [
      "Relee la frase que sitúa a esa persona o acción.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Relee la frase que sitúa a esa persona o acción.",
    "idiomaLectura": "en-GB",
    "focoId": "reading",
    "habilidad": "leer",
    "opciones": [
      {
        "id": "0",
        "texto": "False: the robin landed, then Ella stopped drawing and took a photo."
      },
      {
        "id": "1",
        "texto": "True: she took the photo first."
      },
      {
        "id": "2",
        "texto": "The text does not say who took a photo."
      }
    ],
    "respuestaCorrecta": "0",
    "tipoEvidencia": "seleccion_simple",
    "lecturaId": "garden"
  },
  {
    "id": "p-read-3",
    "bloqueId": "reading-correction",
    "conceptoId": "reading",
    "titulo": "The garden notebook",
    "enunciado": "What did Ben do after he closed his notebook?",
    "pregunta": "Elige la respuesta apoyándote en el texto.",
    "explicacion": "La oración enlaza closed his notebook con put it in his bag.",
    "pista": "Relee la frase que sitúa a esa persona o acción.",
    "pistas": [
      "Relee la frase que sitúa a esa persona o acción.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Relee la frase que sitúa a esa persona o acción.",
    "idiomaLectura": "en-GB",
    "focoId": "reading",
    "habilidad": "leer",
    "opciones": [
      {
        "id": "0",
        "texto": "He put it in his bag."
      },
      {
        "id": "1",
        "texto": "He picked flowers."
      },
      {
        "id": "2",
        "texto": "He started measuring a different plant."
      }
    ],
    "respuestaCorrecta": "0",
    "tipoEvidencia": "seleccion_simple",
    "lecturaId": "garden"
  },
  {
    "id": "p-read-4",
    "bloqueId": "reading-correction",
    "conceptoId": "reading",
    "titulo": "The garden notebook",
    "enunciado": "Did they pick flowers?",
    "pregunta": "Elige la respuesta apoyándote en el texto.",
    "explicacion": "La negativa explícita descarta que cogieran flores.",
    "pista": "Relee la frase que sitúa a esa persona o acción.",
    "pistas": [
      "Relee la frase que sitúa a esa persona o acción.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Relee la frase que sitúa a esa persona o acción.",
    "idiomaLectura": "en-GB",
    "focoId": "reading",
    "habilidad": "leer",
    "opciones": [
      {
        "id": "0",
        "texto": "No: they did not pick any flowers."
      },
      {
        "id": "1",
        "texto": "Yes: they picked a leaf."
      },
      {
        "id": "2",
        "texto": "Yes: they picked flowers at eleven."
      }
    ],
    "respuestaCorrecta": "0",
    "tipoEvidencia": "seleccion_simple",
    "lecturaId": "garden"
  },
  {
    "id": "p-read-5",
    "bloqueId": "reading-correction",
    "conceptoId": "reading",
    "titulo": "A radio story",
    "enunciado": "What was Leo doing when the dog barked?",
    "pregunta": "Elige la respuesta apoyándote en el texto.",
    "explicacion": "La grabación estaba en curso; después del ladrido la pausó.",
    "pista": "Relee la frase que sitúa a esa persona o acción.",
    "pistas": [
      "Relee la frase que sitúa a esa persona o acción.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Relee la frase que sitúa a esa persona o acción.",
    "idiomaLectura": "en-GB",
    "focoId": "reading",
    "habilidad": "leer",
    "opciones": [
      {
        "id": "0",
        "texto": "He was recording a story."
      },
      {
        "id": "1",
        "texto": "He was closing the door before recording."
      },
      {
        "id": "2",
        "texto": "He was drawing the cover."
      }
    ],
    "respuestaCorrecta": "0",
    "tipoEvidencia": "seleccion_simple",
    "lecturaId": "radio"
  },
  {
    "id": "p-read-6",
    "bloqueId": "reading-correction",
    "conceptoId": "reading",
    "titulo": "A radio story",
    "enunciado": "True or false: Leo recorded the ending before he closed the door.",
    "pregunta": "Elige la respuesta apoyándote en el texto.",
    "explicacion": "El diálogo sitúa el cierre de la puerta antes del final grabado.",
    "pista": "Relee la frase que sitúa a esa persona o acción.",
    "pistas": [
      "Relee la frase que sitúa a esa persona o acción.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Relee la frase que sitúa a esa persona o acción.",
    "idiomaLectura": "en-GB",
    "focoId": "reading",
    "habilidad": "leer",
    "opciones": [
      {
        "id": "0",
        "texto": "False: he closed the door, then recorded the ending."
      },
      {
        "id": "1",
        "texto": "True: the ending was already finished."
      },
      {
        "id": "2",
        "texto": "False: his sister closed the door."
      }
    ],
    "respuestaCorrecta": "0",
    "tipoEvidencia": "seleccion_simple",
    "lecturaId": "radio"
  },
  {
    "id": "p-read-7",
    "bloqueId": "reading-correction",
    "conceptoId": "reading",
    "titulo": "A radio story",
    "enunciado": "Who was drawing while Leo was recording?",
    "pregunta": "Elige la respuesta apoyándote en el texto.",
    "explicacion": "La hermana dibujaba la portada mientras él grababa.",
    "pista": "Relee la frase que sitúa a esa persona o acción.",
    "pistas": [
      "Relee la frase que sitúa a esa persona o acción.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Relee la frase que sitúa a esa persona o acción.",
    "idiomaLectura": "en-GB",
    "focoId": "reading",
    "habilidad": "leer",
    "opciones": [
      {
        "id": "0",
        "texto": "His sister."
      },
      {
        "id": "1",
        "texto": "Maya."
      },
      {
        "id": "2",
        "texto": "Leo."
      }
    ],
    "respuestaCorrecta": "0",
    "tipoEvidencia": "seleccion_simple",
    "lecturaId": "radio"
  },
  {
    "id": "p-read-8",
    "bloqueId": "reading-correction",
    "conceptoId": "reading",
    "titulo": "A radio story",
    "enunciado": "What is Leo doing now in the dialogue?",
    "pregunta": "Elige la respuesta apoyándote en el texto.",
    "explicacion": "La pregunta Are you listening to it now? recibe Yes, I am: el contexto actual exige presente.",
    "pista": "Relee la frase que sitúa a esa persona o acción.",
    "pistas": [
      "Relee la frase que sitúa a esa persona o acción.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Relee la frase que sitúa a esa persona o acción.",
    "idiomaLectura": "en-GB",
    "focoId": "reading",
    "habilidad": "leer",
    "opciones": [
      {
        "id": "0",
        "texto": "He is listening to the story."
      },
      {
        "id": "1",
        "texto": "He is recording the beginning."
      },
      {
        "id": "2",
        "texto": "He was listening on Sunday."
      }
    ],
    "respuestaCorrecta": "0",
    "tipoEvidencia": "seleccion_simple",
    "lecturaId": "radio"
  },
  {
    "id": "p-fix-1",
    "bloqueId": "reading-correction",
    "conceptoId": "reading",
    "titulo": "Repair the sentence",
    "enunciado": "She didn't wrote a note.",
    "pregunta": "Escribe la frase completa con el error corregido.",
    "explicacion": "Después de didn’t usamos write, sin pasado adicional.",
    "pista": "¿El auxiliar ya indica el pasado?",
    "pistas": [
      "¿El auxiliar ya indica el pasado?",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. ¿El auxiliar ya indica el pasado?",
    "idiomaLectura": "en-GB",
    "textoLectura": "She didn't wrote a note.",
    "focoId": "reading",
    "formato": "texto",
    "habilidad": "corregir",
    "respuestaCorrecta": "She didn't write a note.",
    "respuestasValidas": [
      "She didn't write a note."
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-fix-2",
    "bloqueId": "reading-correction",
    "conceptoId": "reading",
    "titulo": "Repair the sentence",
    "enunciado": "They was waiting for the tram.",
    "pregunta": "Escribe la frase completa con el error corregido.",
    "explicacion": "They necesita were; waiting es correcto.",
    "pista": "Comprueba la concordancia de they.",
    "pistas": [
      "Comprueba la concordancia de they.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Comprueba la concordancia de they.",
    "idiomaLectura": "en-GB",
    "textoLectura": "They was waiting for the tram.",
    "focoId": "reading",
    "formato": "texto",
    "habilidad": "corregir",
    "respuestaCorrecta": "They were waiting for the tram.",
    "respuestasValidas": [
      "They were waiting for the tram."
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-fix-3",
    "bloqueId": "reading-correction",
    "conceptoId": "reading",
    "titulo": "Repair the sentence",
    "enunciado": "He was play chess at five.",
    "pregunta": "Escribe la frase completa con el error corregido.",
    "explicacion": "Was necesita la forma -ing para una acción en curso.",
    "pista": "Was + ¿qué forma de play?",
    "pistas": [
      "Was + ¿qué forma de play?",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Was + ¿qué forma de play?",
    "idiomaLectura": "en-GB",
    "textoLectura": "He was play chess at five.",
    "focoId": "reading",
    "formato": "texto",
    "habilidad": "corregir",
    "respuestaCorrecta": "He was playing chess at five.",
    "respuestasValidas": [
      "He was playing chess at five."
    ],
    "tipoEvidencia": "respuesta_corta"
  },
  {
    "id": "p-fix-4",
    "bloqueId": "reading-correction",
    "conceptoId": "reading",
    "titulo": "Repair the sentence",
    "enunciado": "Were he drawing a map?",
    "pregunta": "Escribe la frase completa con el error corregido.",
    "explicacion": "He necesita was, también cuando es una pregunta.",
    "pista": "Comprueba el sujeto, no solo el orden.",
    "pistas": [
      "Comprueba el sujeto, no solo el orden.",
      "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
    ],
    "ayudaError": "Todavía no encaja. Comprueba el sujeto, no solo el orden.",
    "idiomaLectura": "en-GB",
    "textoLectura": "Were he drawing a map?",
    "focoId": "reading",
    "formato": "texto",
    "habilidad": "corregir",
    "respuestaCorrecta": "Was he drawing a map?",
    "respuestasValidas": [
      "Was he drawing a map?"
    ],
    "tipoEvidencia": "respuesta_corta"
  }
].map(conLectura));

export const FAMILIAS_PRUEBA = Object.freeze([
  {
    "id": "simple-be-have",
    "variantes": [
      {
        "id": "test-simple-be-have-1",
        "bloqueId": "past-simple",
        "conceptoId": "simple-be-have",
        "titulo": "Be and have in the past",
        "enunciado": "Last Sunday, he ___ at the planetarium. (be)",
        "pregunta": "Completa el hueco.",
        "explicacion": "He es singular: was.",
        "pista": "Describe un estado pasado.",
        "pistas": [
          "Describe un estado pasado.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Describe un estado pasado.",
        "idiomaLectura": "en-GB",
        "textoLectura": "Last Sunday, he ___ at the planetarium. (be)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "was",
        "respuestasValidas": [
          "was"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-simple-be-have-2",
        "bloqueId": "past-simple",
        "conceptoId": "simple-be-have",
        "titulo": "Be and have in the past",
        "enunciado": "Yesterday, you ___ a blue umbrella. (have)",
        "pregunta": "Completa el hueco.",
        "explicacion": "Had sirve para todos los sujetos en afirmativa.",
        "pista": "Se refiere a algo que tenías ayer.",
        "pistas": [
          "Se refiere a algo que tenías ayer.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Se refiere a algo que tenías ayer.",
        "idiomaLectura": "en-GB",
        "textoLectura": "Yesterday, you ___ a blue umbrella. (have)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "had",
        "respuestasValidas": [
          "had"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-simple-be-have-3",
        "bloqueId": "past-simple",
        "conceptoId": "simple-be-have",
        "titulo": "Be and have in the past",
        "enunciado": "Last Monday, the twins ___ in the music room. (be)",
        "pregunta": "Completa el hueco.",
        "explicacion": "The twins es plural: were.",
        "pista": "Piensa en they.",
        "pistas": [
          "Piensa en they.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Piensa en they.",
        "idiomaLectura": "en-GB",
        "textoLectura": "Last Monday, the twins ___ in the music room. (be)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "were",
        "respuestasValidas": [
          "were"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-simple-be-have-4",
        "bloqueId": "past-simple",
        "conceptoId": "simple-be-have",
        "titulo": "Be and have in the past",
        "enunciado": "Did he have a notebook? Yes, he ___.",
        "pregunta": "Completa la respuesta corta.",
        "explicacion": "La respuesta corta repite did, no had.",
        "pista": "Escucha el auxiliar de la pregunta.",
        "pistas": [
          "Escucha el auxiliar de la pregunta.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Escucha el auxiliar de la pregunta.",
        "idiomaLectura": "en-GB",
        "textoLectura": "Did he have a notebook? Yes, he ___.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "did",
        "respuestasValidas": [
          "did"
        ],
        "tipoEvidencia": "respuesta_corta"
      }
    ]
  },
  {
    "id": "simple-transform",
    "variantes": [
      {
        "id": "test-simple-transform-1",
        "bloqueId": "past-simple",
        "conceptoId": "simple-transform",
        "titulo": "A new way to say it",
        "enunciado": "She took the red bus.",
        "pregunta": "Escribe la frase completa en negativa.",
        "explicacion": "Didn’t + take; took vuelve a la forma base.",
        "pista": "El pasado lo aporta didn’t.",
        "pistas": [
          "El pasado lo aporta didn’t.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. El pasado lo aporta didn’t.",
        "idiomaLectura": "en-GB",
        "textoLectura": "She took the red bus.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "She didn't take the red bus.",
        "respuestasValidas": [
          "She didn't take the red bus."
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-simple-transform-2",
        "bloqueId": "past-simple",
        "conceptoId": "simple-transform",
        "titulo": "A new way to say it",
        "enunciado": "He ate an apple yesterday.",
        "pregunta": "Escribe la pregunta completa con Did.",
        "explicacion": "Did + he + eat.",
        "pista": "Usa el verbo base después de did.",
        "pistas": [
          "Usa el verbo base después de did.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Usa el verbo base después de did.",
        "idiomaLectura": "en-GB",
        "textoLectura": "He ate an apple yesterday.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "Did he eat an apple yesterday?",
        "respuestasValidas": [
          "Did he eat an apple yesterday?"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-simple-transform-3",
        "bloqueId": "past-simple",
        "conceptoId": "simple-transform",
        "titulo": "A new way to say it",
        "enunciado": "We did the project on Friday.",
        "pregunta": "Escribe la frase completa en negativa.",
        "explicacion": "Didn’t do, sin duplicar el pasado.",
        "pista": "El verbo principal es do.",
        "pistas": [
          "El verbo principal es do.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. El verbo principal es do.",
        "idiomaLectura": "en-GB",
        "textoLectura": "We did the project on Friday.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "We didn't do the project on Friday.",
        "respuestasValidas": [
          "We didn't do the project on Friday."
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-simple-transform-4",
        "bloqueId": "past-simple",
        "conceptoId": "simple-transform",
        "titulo": "A new way to say it",
        "enunciado": "They bought new pencils.",
        "pregunta": "Escribe la pregunta completa con Did.",
        "explicacion": "Con did, bought vuelve a buy.",
        "pista": "La pregunta empieza con Did.",
        "pistas": [
          "La pregunta empieza con Did.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. La pregunta empieza con Did.",
        "idiomaLectura": "en-GB",
        "textoLectura": "They bought new pencils.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "Did they buy new pencils?",
        "respuestasValidas": [
          "Did they buy new pencils?"
        ],
        "tipoEvidencia": "respuesta_corta"
      }
    ]
  },
  {
    "id": "simple-word-forms",
    "variantes": [
      {
        "id": "test-simple-word-forms-1",
        "bloqueId": "past-simple",
        "conceptoId": "simple-word-forms",
        "titulo": "A finished action",
        "enunciado": "Yesterday, I ___ the flowers. (water)",
        "pregunta": "Completa el hueco.",
        "explicacion": "Water añade ed.",
        "pista": "Es una acción terminada y regular.",
        "pistas": [
          "Es una acción terminada y regular.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Es una acción terminada y regular.",
        "idiomaLectura": "en-GB",
        "textoLectura": "Yesterday, I ___ the flowers. (water)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "watered",
        "respuestasValidas": [
          "watered"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-simple-word-forms-2",
        "bloqueId": "past-simple",
        "conceptoId": "simple-word-forms",
        "titulo": "A finished action",
        "enunciado": "Last week, she ___ a heavy bag. (carry)",
        "pregunta": "Completa el hueco.",
        "explicacion": "Consonante + y: carried.",
        "pista": "Fíjate en la letra antes de y.",
        "pistas": [
          "Fíjate en la letra antes de y.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Fíjate en la letra antes de y.",
        "idiomaLectura": "en-GB",
        "textoLectura": "Last week, she ___ a heavy bag. (carry)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "carried",
        "respuestasValidas": [
          "carried"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-simple-word-forms-3",
        "bloqueId": "past-simple",
        "conceptoId": "simple-word-forms",
        "titulo": "A finished action",
        "enunciado": "Yesterday, we ___ a small picnic. (plan)",
        "pregunta": "Completa el hueco.",
        "explicacion": "Plan duplica n antes de ed.",
        "pista": "Una sílaba con final CVC.",
        "pistas": [
          "Una sílaba con final CVC.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Una sílaba con final CVC.",
        "idiomaLectura": "en-GB",
        "textoLectura": "Yesterday, we ___ a small picnic. (plan)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "planned",
        "respuestasValidas": [
          "planned"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-simple-word-forms-4",
        "bloqueId": "past-simple",
        "conceptoId": "simple-word-forms",
        "titulo": "A finished action",
        "enunciado": "Last month, they ___ a new song. (write)",
        "pregunta": "Completa el hueco.",
        "explicacion": "Write es irregular: wrote.",
        "pista": "No se forma con ed.",
        "pistas": [
          "No se forma con ed.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. No se forma con ed.",
        "idiomaLectura": "en-GB",
        "textoLectura": "Last month, they ___ a new song. (write)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "wrote",
        "respuestasValidas": [
          "wrote"
        ],
        "tipoEvidencia": "respuesta_corta"
      }
    ]
  },
  {
    "id": "continuous-scene",
    "variantes": [
      {
        "id": "test-continuous-scene-1",
        "bloqueId": "past-continuous",
        "conceptoId": "continuous-scene",
        "titulo": "A scene in progress",
        "enunciado": "At two yesterday, she ___ a poster. (make)",
        "pregunta": "Completa con Past Continuous.",
        "explicacion": "She was + making; desaparece la e final.",
        "pista": "Sujeto singular y acción en curso.",
        "pistas": [
          "Sujeto singular y acción en curso.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Sujeto singular y acción en curso.",
        "idiomaLectura": "en-GB",
        "textoLectura": "At two yesterday, she ___ a poster. (make)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "was making",
        "respuestasValidas": [
          "was making"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-continuous-scene-2",
        "bloqueId": "past-continuous",
        "conceptoId": "continuous-scene",
        "titulo": "A scene in progress",
        "enunciado": "At seven last night, we ___ to music. (listen)",
        "pregunta": "Completa con Past Continuous.",
        "explicacion": "We were + listening.",
        "pista": "El sujeto equivale a we.",
        "pistas": [
          "El sujeto equivale a we.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. El sujeto equivale a we.",
        "idiomaLectura": "en-GB",
        "textoLectura": "At seven last night, we ___ to music. (listen)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "were listening",
        "respuestasValidas": [
          "were listening"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-continuous-scene-3",
        "bloqueId": "past-continuous",
        "conceptoId": "continuous-scene",
        "titulo": "A scene in progress",
        "enunciado": "At eight yesterday, I ___ a story. (write)",
        "pregunta": "Completa con Past Continuous.",
        "explicacion": "I was + writing; se elimina e.",
        "pista": "La acción ya estaba en desarrollo.",
        "pistas": [
          "La acción ya estaba en desarrollo.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. La acción ya estaba en desarrollo.",
        "idiomaLectura": "en-GB",
        "textoLectura": "At eight yesterday, I ___ a story. (write)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "was writing",
        "respuestasValidas": [
          "was writing"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-continuous-scene-4",
        "bloqueId": "past-continuous",
        "conceptoId": "continuous-scene",
        "titulo": "A scene in progress",
        "enunciado": "At four yesterday, the players ___ around the field. (run)",
        "pregunta": "Completa con Past Continuous.",
        "explicacion": "Players es plural; run duplica n.",
        "pista": "Auxiliar plural + running.",
        "pistas": [
          "Auxiliar plural + running.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Auxiliar plural + running.",
        "idiomaLectura": "en-GB",
        "textoLectura": "At four yesterday, the players ___ around the field. (run)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "were running",
        "respuestasValidas": [
          "were running"
        ],
        "tipoEvidencia": "respuesta_corta"
      }
    ]
  },
  {
    "id": "continuous-negative",
    "variantes": [
      {
        "id": "test-continuous-negative-1",
        "bloqueId": "past-continuous",
        "conceptoId": "continuous-negative",
        "titulo": "Make it negative",
        "enunciado": "They were playing a board game.",
        "pregunta": "Escribe la frase completa en negativa.",
        "explicacion": "Not va detrás de were.",
        "pista": "Conserva playing.",
        "pistas": [
          "Conserva playing.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Conserva playing.",
        "idiomaLectura": "en-GB",
        "textoLectura": "They were playing a board game.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "They weren't playing a board game.",
        "respuestasValidas": [
          "They weren't playing a board game."
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-continuous-negative-2",
        "bloqueId": "past-continuous",
        "conceptoId": "continuous-negative",
        "titulo": "Make it negative",
        "enunciado": "She was cutting a paper star.",
        "pregunta": "Escribe la frase completa en negativa.",
        "explicacion": "Was not conserva cutting.",
        "pista": "No se necesita didn’t.",
        "pistas": [
          "No se necesita didn’t.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. No se necesita didn’t.",
        "idiomaLectura": "en-GB",
        "textoLectura": "She was cutting a paper star.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "She wasn't cutting a paper star.",
        "respuestasValidas": [
          "She wasn't cutting a paper star."
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-continuous-negative-3",
        "bloqueId": "past-continuous",
        "conceptoId": "continuous-negative",
        "titulo": "Make it negative",
        "enunciado": "I was carrying the bags.",
        "pregunta": "Escribe la frase completa en negativa.",
        "explicacion": "I was not + carrying.",
        "pista": "Carrying conserva la y.",
        "pistas": [
          "Carrying conserva la y.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Carrying conserva la y.",
        "idiomaLectura": "en-GB",
        "textoLectura": "I was carrying the bags.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "I wasn't carrying the bags.",
        "respuestasValidas": [
          "I wasn't carrying the bags."
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-continuous-negative-4",
        "bloqueId": "past-continuous",
        "conceptoId": "continuous-negative",
        "titulo": "Make it negative",
        "enunciado": "We were taking a break.",
        "pregunta": "Escribe la frase completa en negativa.",
        "explicacion": "Were not + taking.",
        "pista": "Conserva el verbo en ing.",
        "pistas": [
          "Conserva el verbo en ing.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Conserva el verbo en ing.",
        "idiomaLectura": "en-GB",
        "textoLectura": "We were taking a break.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "We weren't taking a break.",
        "respuestasValidas": [
          "We weren't taking a break."
        ],
        "tipoEvidencia": "respuesta_corta"
      }
    ]
  },
  {
    "id": "continuous-question",
    "variantes": [
      {
        "id": "test-continuous-question-1",
        "bloqueId": "past-continuous",
        "conceptoId": "continuous-question",
        "titulo": "Ask about the scene",
        "enunciado": "He was feeding the fish.",
        "pregunta": "Transforma la frase en pregunta.",
        "explicacion": "Was se sitúa antes de he.",
        "pista": "No cambies feeding.",
        "pistas": [
          "No cambies feeding.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. No cambies feeding.",
        "idiomaLectura": "en-GB",
        "textoLectura": "He was feeding the fish.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "Was he feeding the fish?",
        "respuestasValidas": [
          "Was he feeding the fish?"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-continuous-question-2",
        "bloqueId": "past-continuous",
        "conceptoId": "continuous-question",
        "titulo": "Ask about the scene",
        "enunciado": "You were helping the teacher.",
        "pregunta": "Transforma la frase en pregunta.",
        "explicacion": "Were precede a you.",
        "pista": "El auxiliar se mueve al inicio.",
        "pistas": [
          "El auxiliar se mueve al inicio.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. El auxiliar se mueve al inicio.",
        "idiomaLectura": "en-GB",
        "textoLectura": "You were helping the teacher.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "Were you helping the teacher?",
        "respuestasValidas": [
          "Were you helping the teacher?"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-continuous-question-3",
        "bloqueId": "past-continuous",
        "conceptoId": "continuous-question",
        "titulo": "Ask about the scene",
        "enunciado": "what / they / paint / at noon yesterday",
        "pregunta": "Construye la pregunta en Past Continuous.",
        "explicacion": "What + were + they + painting.",
        "pista": "La palabra de pregunta va al principio.",
        "pistas": [
          "La palabra de pregunta va al principio.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. La palabra de pregunta va al principio.",
        "idiomaLectura": "en-GB",
        "textoLectura": "what / they / paint / at noon yesterday",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "What were they painting at noon yesterday?",
        "respuestasValidas": [
          "What were they painting at noon yesterday?"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-continuous-question-4",
        "bloqueId": "past-continuous",
        "conceptoId": "continuous-question",
        "titulo": "Ask about the scene",
        "enunciado": "Was she reading quietly? No, she ___.",
        "pregunta": "Completa la respuesta corta.",
        "explicacion": "No, she wasn’t / was not.",
        "pista": "La respuesta usa el auxiliar was.",
        "pistas": [
          "La respuesta usa el auxiliar was.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. La respuesta usa el auxiliar was.",
        "idiomaLectura": "en-GB",
        "textoLectura": "Was she reading quietly? No, she ___.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "wasn't",
        "respuestasValidas": [
          "wasn't"
        ],
        "tipoEvidencia": "respuesta_corta"
      }
    ]
  },
  {
    "id": "contrast-event",
    "variantes": [
      {
        "id": "test-contrast-event-1",
        "situacion": "La fabricación de la cometa ya estaba en curso cuando aterrizó el pájaro.",
        "bloqueId": "contraste",
        "conceptoId": "contrast-event",
        "titulo": "A process and an event",
        "enunciado": "We ___ a kite when a bird ___ nearby. (make / land)",
        "pregunta": "Una acción ya estaba en curso cuando ocurrió el otro hecho. Escribe ambas formas separadas por / .",
        "explicacion": "Hacer la cometa estaba en curso; aterrizar es el hecho puntual.",
        "pista": "Distingue proceso y evento.",
        "pistas": [
          "Distingue proceso y evento.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Distingue proceso y evento.",
        "idiomaLectura": "en-GB",
        "textoLectura": "We ___ a kite when a bird ___ nearby. (make / land)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "were making / landed",
        "respuestasValidas": [
          "were making / landed"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-contrast-event-2",
        "situacion": "Yo ya estaba mirando el reloj cuando llegó el autobús.",
        "bloqueId": "contraste",
        "conceptoId": "contrast-event",
        "titulo": "A process and an event",
        "enunciado": "When the bus ___, I ___ my watch. (arrive / check)",
        "pregunta": "Una acción ya estaba en curso cuando ocurrió el otro hecho. Escribe ambas formas separadas por / .",
        "explicacion": "El bus llegó durante la comprobación del reloj.",
        "pista": "El orden de las cláusulas no cambia sus papeles.",
        "pistas": [
          "El orden de las cláusulas no cambia sus papeles.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. El orden de las cláusulas no cambia sus papeles.",
        "idiomaLectura": "en-GB",
        "textoLectura": "When the bus ___, I ___ my watch. (arrive / check)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "arrived / was checking",
        "respuestasValidas": [
          "arrived / was checking"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-contrast-event-3",
        "situacion": "Nora ya estaba regando cuando estalló un globo.",
        "bloqueId": "contraste",
        "conceptoId": "contrast-event",
        "titulo": "A process and an event",
        "enunciado": "While Nora ___ the plants, a balloon ___. (water / burst)",
        "pregunta": "Una acción ya estaba en curso cuando ocurrió el otro hecho. Escribe ambas formas separadas por / .",
        "explicacion": "Regar estaba en curso; burst es el pasado de burst.",
        "pista": "Un proceso y un estallido puntual.",
        "pistas": [
          "Un proceso y un estallido puntual.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Un proceso y un estallido puntual.",
        "idiomaLectura": "en-GB",
        "textoLectura": "While Nora ___ the plants, a balloon ___. (water / burst)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "was watering / burst",
        "respuestasValidas": [
          "was watering / burst"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-contrast-event-4",
        "situacion": "Yo ya estaba limpiando cuando llamó mi amigo.",
        "bloqueId": "contraste",
        "conceptoId": "contrast-event",
        "titulo": "A process and an event",
        "enunciado": "I ___ the shelves when my friend ___. (clean / call)",
        "pregunta": "Una acción ya estaba en curso cuando ocurrió el otro hecho. Escribe ambas formas separadas por / .",
        "explicacion": "La llamada ocurrió durante la limpieza.",
        "pista": "¿Qué actividad ya estaba sucediendo?",
        "pistas": [
          "¿Qué actividad ya estaba sucediendo?",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. ¿Qué actividad ya estaba sucediendo?",
        "idiomaLectura": "en-GB",
        "textoLectura": "I ___ the shelves when my friend ___. (clean / call)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "was cleaning / called",
        "respuestasValidas": [
          "was cleaning / called"
        ],
        "tipoEvidencia": "respuesta_corta"
      }
    ]
  },
  {
    "id": "contrast-sequence",
    "variantes": [
      {
        "id": "test-contrast-sequence-1",
        "bloqueId": "contraste",
        "conceptoId": "contrast-sequence",
        "titulo": "One thing after another",
        "enunciado": "First, she ___ her coat. Then she ___ outside. (take / go)",
        "pregunta": "Son dos acciones terminadas, una después de otra. Escribe ambas formas separadas por / .",
        "explicacion": "Tomar el abrigo y salir se relatan como hechos terminados.",
        "pista": "First y then ordenan la historia.",
        "pistas": [
          "First y then ordenan la historia.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. First y then ordenan la historia.",
        "idiomaLectura": "en-GB",
        "textoLectura": "First, she ___ her coat. Then she ___ outside. (take / go)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "took / went",
        "respuestasValidas": [
          "took / went"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-contrast-sequence-2",
        "bloqueId": "contraste",
        "conceptoId": "contrast-sequence",
        "titulo": "One thing after another",
        "enunciado": "When the show ended, we ___ and then ___. (clap / leave)",
        "pregunta": "Son dos acciones terminadas, una después de otra. Escribe ambas formas separadas por / .",
        "explicacion": "Aplaudir y marcharse son dos hechos completos en orden.",
        "pista": "No hay una actividad en curso que describir.",
        "pistas": [
          "No hay una actividad en curso que describir.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. No hay una actividad en curso que describir.",
        "idiomaLectura": "en-GB",
        "textoLectura": "When the show ended, we ___ and then ___. (clap / leave)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "clapped / left",
        "respuestasValidas": [
          "clapped / left"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-contrast-sequence-3",
        "bloqueId": "contraste",
        "conceptoId": "contrast-sequence",
        "titulo": "One thing after another",
        "enunciado": "I ___ the lid and then ___ inside the box. (lift / look)",
        "pregunta": "Son dos acciones terminadas, una después de otra. Escribe ambas formas separadas por / .",
        "explicacion": "Dos acciones sucesivas y terminadas.",
        "pista": "Imagina la secuencia completa.",
        "pistas": [
          "Imagina la secuencia completa.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Imagina la secuencia completa.",
        "idiomaLectura": "en-GB",
        "textoLectura": "I ___ the lid and then ___ inside the box. (lift / look)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "lifted / looked",
        "respuestasValidas": [
          "lifted / looked"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-contrast-sequence-4",
        "bloqueId": "contraste",
        "conceptoId": "contrast-sequence",
        "titulo": "One thing after another",
        "enunciado": "After lunch, he ___ his plate and then ___ a book. (wash / read)",
        "pregunta": "Son dos acciones terminadas, una después de otra. Escribe ambas formas separadas por / .",
        "explicacion": "Wash y read cuentan dos hechos completos.",
        "pista": "El pasado escrito de read sigue siendo read.",
        "pistas": [
          "El pasado escrito de read sigue siendo read.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. El pasado escrito de read sigue siendo read.",
        "idiomaLectura": "en-GB",
        "textoLectura": "After lunch, he ___ his plate and then ___ a book. (wash / read)",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "washed / read",
        "respuestasValidas": [
          "washed / read"
        ],
        "tipoEvidencia": "respuesta_corta"
      }
    ]
  },
  {
    "id": "contrast-meaning",
    "variantes": [
      {
        "id": "test-contrast-meaning-1",
        "bloqueId": "contraste",
        "conceptoId": "contrast-meaning",
        "titulo": "Understand the relationship",
        "enunciado": "When I was skating, a friend waved to me.",
        "pregunta": "¿Qué acción ya estaba en curso?",
        "explicacion": "Skating estaba en curso aunque aparezca después de when.",
        "pista": "Mira la situación completa.",
        "pistas": [
          "Mira la situación completa.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Mira la situación completa.",
        "idiomaLectura": "en-GB",
        "textoLectura": "When I was skating, a friend waved to me.",
        "habilidad": "elegir",
        "opciones": [
          {
            "id": "0",
            "texto": "Skating"
          },
          {
            "id": "1",
            "texto": "Waving"
          },
          {
            "id": "2",
            "texto": "Both actions were present routines"
          }
        ],
        "respuestaCorrecta": "0",
        "tipoEvidencia": "seleccion_simple"
      },
      {
        "id": "test-contrast-meaning-2",
        "bloqueId": "contraste",
        "conceptoId": "contrast-meaning",
        "titulo": "Understand the relationship",
        "enunciado": "At nine, I was drawing while Dad was reading.",
        "pregunta": "¿Qué relación hay entre las acciones?",
        "explicacion": "Ambos procesos estaban en curso a las nueve.",
        "pista": "Observa at nine y los dos procesos.",
        "pistas": [
          "Observa at nine y los dos procesos.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Observa at nine y los dos procesos.",
        "idiomaLectura": "en-GB",
        "textoLectura": "At nine, I was drawing while Dad was reading.",
        "habilidad": "elegir",
        "opciones": [
          {
            "id": "0",
            "texto": "Dos acciones pasadas simultáneas"
          },
          {
            "id": "1",
            "texto": "Dos hechos sucesivos"
          },
          {
            "id": "2",
            "texto": "Un futuro plan"
          }
        ],
        "respuestaCorrecta": "0",
        "tipoEvidencia": "seleccion_simple"
      },
      {
        "id": "test-contrast-meaning-3",
        "bloqueId": "contraste",
        "conceptoId": "contrast-meaning",
        "titulo": "Understand the relationship",
        "enunciado": "While we were talking, the clock struck four.",
        "pregunta": "¿Qué hecho ocurrió durante la conversación?",
        "explicacion": "La campanada es el hecho; la conversación estaba en curso.",
        "pista": "No es necesario que struck lleve ing.",
        "pistas": [
          "No es necesario que struck lleve ing.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. No es necesario que struck lleve ing.",
        "idiomaLectura": "en-GB",
        "textoLectura": "While we were talking, the clock struck four.",
        "habilidad": "elegir",
        "opciones": [
          {
            "id": "0",
            "texto": "The clock struck four"
          },
          {
            "id": "1",
            "texto": "We started talking afterwards"
          },
          {
            "id": "2",
            "texto": "Nothing happened"
          }
        ],
        "respuestaCorrecta": "0",
        "tipoEvidencia": "seleccion_simple"
      },
      {
        "id": "test-contrast-meaning-4",
        "bloqueId": "contraste",
        "conceptoId": "contrast-meaning",
        "titulo": "Understand the relationship",
        "enunciado": "When the train stopped, we opened the doors and got off.",
        "pregunta": "¿Qué cuenta esta frase?",
        "explicacion": "Stopped, opened y got off son hitos completos y ordenados.",
        "pista": "When no impone un único patrón de dos tiempos.",
        "pistas": [
          "When no impone un único patrón de dos tiempos.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. When no impone un único patrón de dos tiempos.",
        "idiomaLectura": "en-GB",
        "textoLectura": "When the train stopped, we opened the doors and got off.",
        "habilidad": "elegir",
        "opciones": [
          {
            "id": "0",
            "texto": "Hechos terminados en secuencia"
          },
          {
            "id": "1",
            "texto": "Una rutina de hoy"
          },
          {
            "id": "2",
            "texto": "Todo estaba en curso a la vez"
          }
        ],
        "respuestaCorrecta": "0",
        "tipoEvidencia": "seleccion_simple"
      }
    ]
  },
  {
    "id": "reading-evidence",
    "variantes": [
      {
        "id": "test-reading-evidence-1",
        "bloqueId": "reading-correction",
        "conceptoId": "reading-evidence",
        "titulo": "The garden notebook",
        "enunciado": "Who was measuring a plant at ten?",
        "pregunta": "Elige la respuesta y su evidencia en el relato.",
        "explicacion": "El texto dice que Ben estaba midiendo mientras Ella dibujaba.",
        "pista": "Relee la oración correspondiente.",
        "pistas": [
          "Relee la oración correspondiente.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Relee la oración correspondiente.",
        "idiomaLectura": "en-GB",
        "habilidad": "leer",
        "opciones": [
          {
            "id": "0",
            "texto": "Ben, while Ella was drawing."
          },
          {
            "id": "1",
            "texto": "Ella, after she took the photo."
          },
          {
            "id": "2",
            "texto": "The robin, before it landed."
          }
        ],
        "respuestaCorrecta": "0",
        "tipoEvidencia": "seleccion_simple",
        "lecturaId": "garden"
      },
      {
        "id": "test-reading-evidence-2",
        "bloqueId": "reading-correction",
        "conceptoId": "reading-evidence",
        "titulo": "The garden notebook",
        "enunciado": "True or false: Ella took a photo before the robin landed.",
        "pregunta": "Elige la respuesta y su evidencia en el relato.",
        "explicacion": "El orden es landed → stopped drawing → took a photo.",
        "pista": "Relee la oración correspondiente.",
        "pistas": [
          "Relee la oración correspondiente.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Relee la oración correspondiente.",
        "idiomaLectura": "en-GB",
        "habilidad": "leer",
        "opciones": [
          {
            "id": "0",
            "texto": "False: the robin landed, then Ella stopped drawing and took a photo."
          },
          {
            "id": "1",
            "texto": "True: she took the photo first."
          },
          {
            "id": "2",
            "texto": "The text does not say who took a photo."
          }
        ],
        "respuestaCorrecta": "0",
        "tipoEvidencia": "seleccion_simple",
        "lecturaId": "garden"
      },
      {
        "id": "test-reading-evidence-3",
        "bloqueId": "reading-correction",
        "conceptoId": "reading-evidence",
        "titulo": "A radio story",
        "enunciado": "What was Leo doing when the dog barked?",
        "pregunta": "Elige la respuesta y su evidencia en el relato.",
        "explicacion": "La grabación estaba en curso; después del ladrido la pausó.",
        "pista": "Relee la oración correspondiente.",
        "pistas": [
          "Relee la oración correspondiente.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Relee la oración correspondiente.",
        "idiomaLectura": "en-GB",
        "habilidad": "leer",
        "opciones": [
          {
            "id": "0",
            "texto": "He was recording a story."
          },
          {
            "id": "1",
            "texto": "He was closing the door before recording."
          },
          {
            "id": "2",
            "texto": "He was drawing the cover."
          }
        ],
        "respuestaCorrecta": "0",
        "tipoEvidencia": "seleccion_simple",
        "lecturaId": "radio"
      },
      {
        "id": "test-reading-evidence-4",
        "bloqueId": "reading-correction",
        "conceptoId": "reading-evidence",
        "titulo": "A radio story",
        "enunciado": "True or false: Leo recorded the ending before he closed the door.",
        "pregunta": "Elige la respuesta y su evidencia en el relato.",
        "explicacion": "El diálogo sitúa el cierre de la puerta antes del final grabado.",
        "pista": "Relee la oración correspondiente.",
        "pistas": [
          "Relee la oración correspondiente.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Relee la oración correspondiente.",
        "idiomaLectura": "en-GB",
        "habilidad": "leer",
        "opciones": [
          {
            "id": "0",
            "texto": "False: he closed the door, then recorded the ending."
          },
          {
            "id": "1",
            "texto": "True: the ending was already finished."
          },
          {
            "id": "2",
            "texto": "False: his sister closed the door."
          }
        ],
        "respuestaCorrecta": "0",
        "tipoEvidencia": "seleccion_simple",
        "lecturaId": "radio"
      }
    ]
  },
  {
    "id": "reading-time",
    "variantes": [
      {
        "id": "test-reading-time-1",
        "bloqueId": "reading-correction",
        "conceptoId": "reading-time",
        "titulo": "The garden notebook",
        "enunciado": "What did Ben do after he closed his notebook?",
        "pregunta": "Elige la respuesta y su evidencia en el relato.",
        "explicacion": "La oración enlaza closed his notebook con put it in his bag.",
        "pista": "Relee la oración correspondiente.",
        "pistas": [
          "Relee la oración correspondiente.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Relee la oración correspondiente.",
        "idiomaLectura": "en-GB",
        "habilidad": "leer",
        "opciones": [
          {
            "id": "0",
            "texto": "He put it in his bag."
          },
          {
            "id": "1",
            "texto": "He picked flowers."
          },
          {
            "id": "2",
            "texto": "He started measuring a different plant."
          }
        ],
        "respuestaCorrecta": "0",
        "tipoEvidencia": "seleccion_simple",
        "lecturaId": "garden"
      },
      {
        "id": "test-reading-time-2",
        "bloqueId": "reading-correction",
        "conceptoId": "reading-time",
        "titulo": "The garden notebook",
        "enunciado": "Did they pick flowers?",
        "pregunta": "Elige la respuesta y su evidencia en el relato.",
        "explicacion": "La negativa explícita descarta que cogieran flores.",
        "pista": "Relee la oración correspondiente.",
        "pistas": [
          "Relee la oración correspondiente.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Relee la oración correspondiente.",
        "idiomaLectura": "en-GB",
        "habilidad": "leer",
        "opciones": [
          {
            "id": "0",
            "texto": "No: they did not pick any flowers."
          },
          {
            "id": "1",
            "texto": "Yes: they picked a leaf."
          },
          {
            "id": "2",
            "texto": "Yes: they picked flowers at eleven."
          }
        ],
        "respuestaCorrecta": "0",
        "tipoEvidencia": "seleccion_simple",
        "lecturaId": "garden"
      },
      {
        "id": "test-reading-time-3",
        "bloqueId": "reading-correction",
        "conceptoId": "reading-time",
        "titulo": "A radio story",
        "enunciado": "Who was drawing while Leo was recording?",
        "pregunta": "Elige la respuesta y su evidencia en el relato.",
        "explicacion": "La hermana dibujaba la portada mientras él grababa.",
        "pista": "Relee la oración correspondiente.",
        "pistas": [
          "Relee la oración correspondiente.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Relee la oración correspondiente.",
        "idiomaLectura": "en-GB",
        "habilidad": "leer",
        "opciones": [
          {
            "id": "0",
            "texto": "His sister."
          },
          {
            "id": "1",
            "texto": "Maya."
          },
          {
            "id": "2",
            "texto": "Leo."
          }
        ],
        "respuestaCorrecta": "0",
        "tipoEvidencia": "seleccion_simple",
        "lecturaId": "radio"
      },
      {
        "id": "test-reading-time-4",
        "bloqueId": "reading-correction",
        "conceptoId": "reading-time",
        "titulo": "A radio story",
        "enunciado": "What is Leo doing now in the dialogue?",
        "pregunta": "Elige la respuesta y su evidencia en el relato.",
        "explicacion": "La pregunta Are you listening to it now? recibe Yes, I am: el contexto actual exige presente.",
        "pista": "Relee la oración correspondiente.",
        "pistas": [
          "Relee la oración correspondiente.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Relee la oración correspondiente.",
        "idiomaLectura": "en-GB",
        "habilidad": "leer",
        "opciones": [
          {
            "id": "0",
            "texto": "He is listening to the story."
          },
          {
            "id": "1",
            "texto": "He is recording the beginning."
          },
          {
            "id": "2",
            "texto": "He was listening on Sunday."
          }
        ],
        "respuestaCorrecta": "0",
        "tipoEvidencia": "seleccion_simple",
        "lecturaId": "radio"
      }
    ]
  },
  {
    "id": "error-repair",
    "variantes": [
      {
        "id": "test-error-repair-1",
        "bloqueId": "reading-correction",
        "conceptoId": "error-repair",
        "titulo": "Find and repair the error",
        "enunciado": "He didn't saw the painting.",
        "pregunta": "Corrige la frase completa.",
        "explicacion": "Didn’t exige see, forma base.",
        "pista": "No se marca dos veces el pasado.",
        "pistas": [
          "No se marca dos veces el pasado.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. No se marca dos veces el pasado.",
        "idiomaLectura": "en-GB",
        "textoLectura": "He didn't saw the painting.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "He didn't see the painting.",
        "respuestasValidas": [
          "He didn't see the painting."
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-error-repair-2",
        "bloqueId": "reading-correction",
        "conceptoId": "error-repair",
        "titulo": "Find and repair the error",
        "enunciado": "We was making a cake.",
        "pregunta": "Corrige la frase completa.",
        "explicacion": "We concuerda con were.",
        "pista": "Revisa el sujeto plural.",
        "pistas": [
          "Revisa el sujeto plural.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Revisa el sujeto plural.",
        "idiomaLectura": "en-GB",
        "textoLectura": "We was making a cake.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "We were making a cake.",
        "respuestasValidas": [
          "We were making a cake."
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-error-repair-3",
        "bloqueId": "reading-correction",
        "conceptoId": "error-repair",
        "titulo": "Find and repair the error",
        "enunciado": "Was they waiting near the gate?",
        "pregunta": "Corrige la pregunta completa.",
        "explicacion": "They concuerda con were, también en preguntas.",
        "pista": "Mira el auxiliar.",
        "pistas": [
          "Mira el auxiliar.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Mira el auxiliar.",
        "idiomaLectura": "en-GB",
        "textoLectura": "Was they waiting near the gate?",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "Were they waiting near the gate?",
        "respuestasValidas": [
          "Were they waiting near the gate?"
        ],
        "tipoEvidencia": "respuesta_corta"
      },
      {
        "id": "test-error-repair-4",
        "bloqueId": "reading-correction",
        "conceptoId": "error-repair",
        "titulo": "Find and repair the error",
        "enunciado": "She was draw a tree at ten.",
        "pregunta": "Corrige la frase completa.",
        "explicacion": "Was + drawing expresa la acción en curso.",
        "pista": "Falta ing.",
        "pistas": [
          "Falta ing.",
          "Vuelve a la situación y comprueba sujeto, auxiliar y forma verbal."
        ],
        "ayudaError": "Todavía no encaja. Falta ing.",
        "idiomaLectura": "en-GB",
        "textoLectura": "She was draw a tree at ten.",
        "formato": "texto",
        "habilidad": "completar",
        "respuestaCorrecta": "She was drawing a tree at ten.",
        "respuestasValidas": [
          "She was drawing a tree at ten."
        ],
        "tipoEvidencia": "respuesta_corta"
      }
    ]
  }
].map(f=>Object.freeze({...f,variantes:Object.freeze(f.variantes.map(conLectura))})));
