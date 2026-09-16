export const ENGLISH_META = Object.freeze({
  actividadId:"6-english-present-simple-vs-present-continuous",
  tituloActividad:"Present Simple vs Present Continuous",
  version:"1.0",
  cursoReferencia:"6.º de Primaria",
  materia:"English",
  tema:"Present Simple vs Present Continuous"
});

export const BLOQUES_RESULTADO = Object.freeze([
  Object.freeze({
    id:"simple-uso-tiempo",
    icono:"🔁",
    titulo:"Present Simple · use & time expressions",
    descripcion:"Routines, timetables, permanent situations, general truths y expresiones como every day o adverbs of frequency."
  }),
  Object.freeze({
    id:"simple-estructuras",
    icono:"🧱",
    titulo:"Present Simple · structures",
    descripcion:"Affirmative, negative, interrogative y short answers con do / does."
  }),
  Object.freeze({
    id:"continuous-uso-tiempo",
    icono:"⏱️",
    titulo:"Present Continuous · use & time expressions",
    descripcion:"Acciones que están ocurriendo en ese mismo momento y expresiones como right now o at the moment."
  }),
  Object.freeze({
    id:"continuous-estructuras",
    icono:"⚙️",
    titulo:"Present Continuous · structures",
    descripcion:"Affirmative, negative e interrogative con am / are / is + verb (ing)."
  })
]);

export const FICHAS_ENGLISH = Object.freeze([
  Object.freeze({icono:"🔁",pregunta:"When do we use Present Simple?",respuesta:"For routines, timetables, permanent situations or general truths."}),
  Object.freeze({icono:"✅",pregunta:"Present Simple affirmative",respuesta:"Subject + verb + complements. Example from the material: I run every day."}),
  Object.freeze({icono:"🚫",pregunta:"Present Simple negative",respuesta:"Subject + don’t / doesn’t + verb + complements."}),
  Object.freeze({icono:"❓",pregunta:"Present Simple question",respuesta:"Do / Does + subject + verb + complements?"}),
  Object.freeze({icono:"💬",pregunta:"Present Simple short answers",respuesta:"Yes, ___ do / does. No, ___ don’t / doesn’t."}),
  Object.freeze({icono:"📅",pregunta:"Present Simple time clues",respuesta:"Every day/month/year, in the morning/afternoon/evening, once/twice/three times, at night, on Monday, in July, today; always, usually, often, sometimes, never."}),
  Object.freeze({icono:"⏱️",pregunta:"When do we use Present Continuous?",respuesta:"For events that are happening at that very moment."}),
  Object.freeze({icono:"✅",pregunta:"Present Continuous affirmative",respuesta:"Subject + am / are / is + verb (ing) + complements."}),
  Object.freeze({icono:"🚫",pregunta:"Present Continuous negative",respuesta:"Subject + am / are / is + not + verb (ing) + complements."}),
  Object.freeze({icono:"❓",pregunta:"Present Continuous question",respuesta:"Am / Are / Is + subject + verb (ing) + complements?"}),
  Object.freeze({icono:"🕐",pregunta:"Present Continuous time clues",respuesta:"Right now, just now, at the moment, now, at present, at this moment."}),
  Object.freeze({icono:"🔎",pregunta:"First question before choosing a tense",respuesta:"Is the sentence about a routine/general situation, or about something happening now?"})
]);

function opcion(id,texto){return Object.freeze({id,texto});}
function reto(config){return Object.freeze({...config,opciones:Object.freeze(config.opciones)});}
function variante(config){return Object.freeze({...config,tipoEvidencia:"seleccion_simple",opciones:Object.freeze(config.opciones)});}

export const PRACTICA_ENGLISH = Object.freeze([
  reto({
    id:"practice-simple-use",titulo:"Routine or now?",enunciado:"I run every day.",pregunta:"Which tense matches the use described in the school material?",bloqueId:"simple-uso-tiempo",pista:"Every day points to a routine.",respuestaCorrecta:"simple",explicacion:"Present Simple is used for routines, and every day is listed as a time expression for it.",
    opciones:[opcion("simple","Present Simple"),opcion("continuous","Present Continuous")]
  }),
  reto({
    id:"practice-simple-negative",titulo:"Build the negative",enunciado:"She ___ live in Málaga.",pregunta:"Choose the form used in the school material.",bloqueId:"simple-estructuras",pista:"With she, the material uses doesn’t + verb.",respuestaCorrecta:"doesnt",explicacion:"The school material gives: She doesn’t live in Málaga.",
    opciones:[opcion("doesnt","doesn’t"),opcion("isnt","isn’t"),opcion("dont","don’t")]
  }),
  reto({
    id:"practice-simple-question",titulo:"Ask with Present Simple",enunciado:"___ she work today?",pregunta:"Choose the auxiliary from the material.",bloqueId:"simple-estructuras",pista:"The question structure begins with Do / Does.",respuestaCorrecta:"does",explicacion:"The material gives the structure Do / Does + subject + verb + complements?",opciones:[opcion("does","Does"),opcion("is","Is"),opcion("do","Do")]
  }),
  reto({
    id:"practice-simple-time",titulo:"Find the clue",enunciado:"always · at the moment · every month",pregunta:"Which expression is an adverb of frequency listed for Present Simple?",bloqueId:"simple-uso-tiempo",pista:"It tells how often something happens.",respuestaCorrecta:"always",explicacion:"Always appears in the school material under Adverbs of Frequency for Present Simple.",opciones:[opcion("always","always"),opcion("moment","at the moment"),opcion("now","right now")]
  }),
  reto({
    id:"practice-continuous-use",titulo:"Something happening now",enunciado:"She is working at this school.",pregunta:"Which tense structure is shown?",bloqueId:"continuous-uso-tiempo",pista:"Look for is + verb (ing).",respuestaCorrecta:"continuous",explicacion:"The school material presents this sentence as a Present Continuous affirmative example.",opciones:[opcion("simple","Present Simple"),opcion("continuous","Present Continuous")]
  }),
  reto({
    id:"practice-continuous-negative",titulo:"Build the negative",enunciado:"I ___ running right now.",pregunta:"Choose the form that matches the school material.",bloqueId:"continuous-estructuras",pista:"Present Continuous negative uses am / are / is + not.",respuestaCorrecta:"amnot",explicacion:"The material gives: I am not running right now.",opciones:[opcion("amnot","am not"),opcion("dont","don’t"),opcion("doesnt","doesn’t")]
  }),
  reto({
    id:"practice-continuous-question",titulo:"Ask about now",enunciado:"___ you reading the book?",pregunta:"Choose the correct first word from the material.",bloqueId:"continuous-estructuras",pista:"The interrogative begins with Am / Are / Is.",respuestaCorrecta:"are",explicacion:"The school material gives: Are you reading the book?",opciones:[opcion("are","Are"),opcion("do","Do"),opcion("does","Does")]
  }),
  reto({
    id:"practice-continuous-time",titulo:"Time expression",enunciado:"every day · at the moment · usually",pregunta:"Which expression is listed for Present Continuous?",bloqueId:"continuous-uso-tiempo",pista:"It points directly to what is happening now.",respuestaCorrecta:"moment",explicacion:"At the moment is listed among the Present Continuous time expressions.",opciones:[opcion("day","every day"),opcion("moment","at the moment"),opcion("usually","usually")]
  })
]);

export const FAMILIAS_PRUEBA_ENGLISH = Object.freeze([
  Object.freeze({id:"family-simple-use",variantes:Object.freeze([
    variante({id:"test-simple-use-a",bloqueId:"simple-uso-tiempo",conceptoId:"present-simple-use",titulo:"Present Simple · use",enunciado:"A sentence describes something a person does every day.",pregunta:"Which use from the school material does this match?",respuestaCorrecta:"a",explicacion:"Present Simple is used to talk about routines.",opciones:[opcion("a","A routine"),opcion("b","An event happening at that very moment"),opcion("c","Only a question")]}),
    variante({id:"test-simple-use-b",bloqueId:"simple-uso-tiempo",conceptoId:"present-simple-use",titulo:"Present Simple · use",enunciado:"A sentence states a general truth.",pregunta:"Which tense does the school material connect with this use?",respuestaCorrecta:"b",explicacion:"General truths are listed as a use of Present Simple.",opciones:[opcion("a","Present Continuous"),opcion("b","Present Simple"),opcion("c","Neither tense")]} )
  ])}),
  Object.freeze({id:"family-simple-time",variantes:Object.freeze([
    variante({id:"test-simple-time-a",bloqueId:"simple-uso-tiempo",conceptoId:"present-simple-time",titulo:"Present Simple · time expressions",enunciado:"Choose the expression that the school material lists with Present Simple.",pregunta:"Which one belongs there?",respuestaCorrecta:"c",explicacion:"Every month appears in the Present Simple time expressions.",opciones:[opcion("a","right now"),opcion("b","at the moment"),opcion("c","every month")]}),
    variante({id:"test-simple-time-b",bloqueId:"simple-uso-tiempo",conceptoId:"present-simple-time",titulo:"Present Simple · frequency",enunciado:"The school material lists several adverbs of frequency.",pregunta:"Which one is in that list?",respuestaCorrecta:"a",explicacion:"Usually is one of the adverbs of frequency listed for Present Simple.",opciones:[opcion("a","usually"),opcion("b","at present"),opcion("c","just now")]} )
  ])}),
  Object.freeze({id:"family-simple-negative",variantes:Object.freeze([
    variante({id:"test-simple-negative-a",bloqueId:"simple-estructuras",conceptoId:"present-simple-negative",titulo:"Present Simple · negative",enunciado:"She ___ live in Málaga.",pregunta:"Which option follows the structure shown in the material?",respuestaCorrecta:"b",explicacion:"The material gives: She doesn’t live in Málaga.",opciones:[opcion("a","isn’t"),opcion("b","doesn’t"),opcion("c","aren’t")]}),
    variante({id:"test-simple-negative-b",bloqueId:"simple-estructuras",conceptoId:"present-simple-negative",titulo:"Present Simple · negative",enunciado:"I ___ live in Málaga.",pregunta:"Which option matches the school example?",respuestaCorrecta:"a",explicacion:"The material gives: I don’t live in Málaga.",opciones:[opcion("a","don’t"),opcion("b","doesn’t"),opcion("c","am not")]} )
  ])}),
  Object.freeze({id:"family-simple-question",variantes:Object.freeze([
    variante({id:"test-simple-question-a",bloqueId:"simple-estructuras",conceptoId:"present-simple-question",titulo:"Present Simple · question",enunciado:"___ you work today?",pregunta:"Choose the first word from the school example.",respuestaCorrecta:"a",explicacion:"The material gives: Do you work today?",opciones:[opcion("a","Do"),opcion("b","Are"),opcion("c","Does")]}),
    variante({id:"test-simple-question-b",bloqueId:"simple-estructuras",conceptoId:"present-simple-question",titulo:"Present Simple · question",enunciado:"___ she work today?",pregunta:"Choose the first word from the school example.",respuestaCorrecta:"c",explicacion:"The material gives: Does she work today?",opciones:[opcion("a","Is"),opcion("b","Do"),opcion("c","Does")]} )
  ])}),
  Object.freeze({id:"family-continuous-use",variantes:Object.freeze([
    variante({id:"test-continuous-use-a",bloqueId:"continuous-uso-tiempo",conceptoId:"present-continuous-use",titulo:"Present Continuous · use",enunciado:"An event is happening at that very moment.",pregunta:"Which tense does the school material use for this?",respuestaCorrecta:"b",explicacion:"The material says Present Continuous is used for events happening at that very moment.",opciones:[opcion("a","Present Simple"),opcion("b","Present Continuous"),opcion("c","A short answer")]}),
    variante({id:"test-continuous-use-b",bloqueId:"continuous-uso-tiempo",conceptoId:"present-continuous-use",titulo:"Present Continuous · use",enunciado:"The clue is right now.",pregunta:"Which tense is this expression listed with?",respuestaCorrecta:"a",explicacion:"Right now is listed among the Present Continuous time expressions.",opciones:[opcion("a","Present Continuous"),opcion("b","Present Simple"),opcion("c","Both lists in the material")]} )
  ])}),
  Object.freeze({id:"family-continuous-time",variantes:Object.freeze([
    variante({id:"test-continuous-time-a",bloqueId:"continuous-uso-tiempo",conceptoId:"present-continuous-time",titulo:"Present Continuous · time expressions",enunciado:"Choose the expression that belongs to the Present Continuous list.",pregunta:"Which one is correct?",respuestaCorrecta:"c",explicacion:"At this moment appears in the Present Continuous time expressions.",opciones:[opcion("a","every year"),opcion("b","on Monday"),opcion("c","at this moment")]}),
    variante({id:"test-continuous-time-b",bloqueId:"continuous-uso-tiempo",conceptoId:"present-continuous-time",titulo:"Present Continuous · time expressions",enunciado:"The school list includes several ways to point to the current moment.",pregunta:"Which one appears there?",respuestaCorrecta:"b",explicacion:"At present is listed for Present Continuous.",opciones:[opcion("a","never"),opcion("b","at present"),opcion("c","twice a month")]} )
  ])}),
  Object.freeze({id:"family-continuous-negative",variantes:Object.freeze([
    variante({id:"test-continuous-negative-a",bloqueId:"continuous-estructuras",conceptoId:"present-continuous-negative",titulo:"Present Continuous · negative",enunciado:"I ___ running right now.",pregunta:"Which form matches the school example?",respuestaCorrecta:"a",explicacion:"The material gives: I am not running right now.",opciones:[opcion("a","am not"),opcion("b","don’t"),opcion("c","doesn’t")]}),
    variante({id:"test-continuous-negative-b",bloqueId:"continuous-estructuras",conceptoId:"present-continuous-negative",titulo:"Present Continuous · negative",enunciado:"She ___ running right now.",pregunta:"Which form matches the school example?",respuestaCorrecta:"c",explicacion:"The material gives: She isn’t running right now.",opciones:[opcion("a","doesn’t"),opcion("b","don’t"),opcion("c","isn’t")]} )
  ])}),
  Object.freeze({id:"family-continuous-question",variantes:Object.freeze([
    variante({id:"test-continuous-question-a",bloqueId:"continuous-estructuras",conceptoId:"present-continuous-question",titulo:"Present Continuous · question",enunciado:"___ you reading the book?",pregunta:"Choose the first word from the school example.",respuestaCorrecta:"b",explicacion:"The material gives: Are you reading the book?",opciones:[opcion("a","Do"),opcion("b","Are"),opcion("c","Does")]}),
    variante({id:"test-continuous-question-b",bloqueId:"continuous-estructuras",conceptoId:"present-continuous-question",titulo:"Present Continuous · question",enunciado:"___ she reading the book?",pregunta:"Choose the first word from the school example.",respuestaCorrecta:"a",explicacion:"The material gives: Is she reading the book?",opciones:[opcion("a","Is"),opcion("b","Does"),opcion("c","Do")]} )
  ])})
]);
