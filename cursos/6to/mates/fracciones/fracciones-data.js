export const FRACCIONES_META = Object.freeze({
  actividadId: "6-mates-fracciones",
  tituloActividad: "Fracciones",
  version: "0.2",
  cursoReferencia: "6.º de Primaria",
  materia: "Matemáticas",
  tema: "Fracciones"
});

export const BLOQUES_RESULTADO = Object.freeze([
  { id:"significado-equivalencias", icono:"🍕", titulo:"Significado y equivalencias", descripcion:"Comprender qué representa una fracción y reconocer cantidades equivalentes." },
  { id:"igual-denominador", icono:"➕", titulo:"Mismo denominador", descripcion:"Sumar y restar cuando las partes tienen el mismo tamaño." },
  { id:"comun-denominador", icono:"🔁", titulo:"Denominador común", descripcion:"Usar el m.c.m. para expresar fracciones con partes comparables." },
  { id:"multiplicar-dividir", icono:"✖️", titulo:"Multiplicar y dividir", descripcion:"Aplicar los procedimientos de multiplicación y división de fracciones." },
  { id:"problemas", icono:"🧠", titulo:"Problemas", descripcion:"Elegir y encadenar los pasos necesarios dentro de una situación real." }
]);

export const FICHAS_FRACCIONES = Object.freeze([
  { icono:"🍕", pregunta:"¿Qué representa una fracción?", respuesta:"Partes que tomamos de un total dividido en partes iguales." },
  { icono:"🔝", pregunta:"¿Qué indica el numerador?", respuesta:"Cuántas partes iguales tomamos." },
  { icono:"🔻", pregunta:"¿Qué indica el denominador?", respuesta:"En cuántas partes iguales dividimos la unidad o el total." },
  { icono:"🔁", pregunta:"¿Qué son fracciones equivalentes?", respuesta:"Fracciones con números distintos que representan la misma cantidad." },
  { icono:"↗️", pregunta:"¿Qué es amplificar una fracción?", respuesta:"Multiplicar numerador y denominador por el mismo número." },
  { icono:"↘️", pregunta:"¿Qué es simplificar una fracción?", respuesta:"Dividir numerador y denominador entre el mismo número cuando es posible." },
  { icono:"✖️", pregunta:"¿Cómo compruebo rápido si dos fracciones son equivalentes?", respuesta:"Puedo multiplicar en cruz: los dos productos deben ser iguales." },
  { icono:"➕", pregunta:"¿Cómo sumo fracciones con igual denominador?", respuesta:"Conservo el denominador y sumo los numeradores." },
  { icono:"➖", pregunta:"¿Cómo resto fracciones con igual denominador?", respuesta:"Conservo el denominador y resto los numeradores." },
  { icono:"🧩", pregunta:"¿Qué hago si los denominadores son distintos?", respuesta:"Busco un denominador común; en este tema usamos el m.c.m. de los denominadores." },
  { icono:"🪜", pregunta:"Después de hallar el m.c.m., ¿cómo ajusto una fracción?", respuesta:"Divido el nuevo denominador entre el antiguo y multiplico el numerador por ese resultado." },
  { icono:"✖️", pregunta:"¿Cómo multiplico dos fracciones?", respuesta:"Numerador por numerador y denominador por denominador; después simplifico si puedo." },
  { icono:"➗", pregunta:"¿Cómo divide este tema dos fracciones?", respuesta:"Multiplicando en cruz: a/b ÷ c/d = (a × d)/(b × c)." },
  { icono:"🧭", pregunta:"¿Qué hago antes de calcular un problema con fracciones?", respuesta:"Identifico los datos, qué se pregunta y qué relación hay entre las cantidades." }
]);

export const PRACTICA_FRACCIONES = Object.freeze([
  {
    id:"practica-representacion", bloqueId:"significado-equivalencias", conceptoId:"representacion_fraccion",
    titulo:"Mira la barra", enunciado:"La barra está dividida en 8 partes iguales y hay 3 coloreadas.", pregunta:"¿Qué fracción está representada?",
    visual:{tipo:"barra",total:8,activas:3,etiqueta:"3 de 8 partes coloreadas"},
    opciones:[{id:"a",texto:"3/8"},{id:"b",texto:"5/8"},{id:"c",texto:"3/5"}], respuestaCorrecta:"a",
    pista:"El denominador cuenta todas las partes iguales. El numerador cuenta las coloreadas.", explicacion:"Hay 8 partes iguales y tomamos 3: la fracción es 3/8."
  },
  {
    id:"practica-equivalencias", bloqueId:"significado-equivalencias", conceptoId:"fracciones_equivalentes",
    titulo:"La misma cantidad", enunciado:"Compara las dos barras. Las dos muestran exactamente la mitad.", pregunta:"¿Qué igualdad describe mejor lo que ves?",
    visual:{tipo:"equivalentes",pares:[{total:2,activas:1,texto:"1/2"},{total:4,activas:2,texto:"2/4"}]},
    opciones:[{id:"a",texto:"1/2 = 2/4"},{id:"b",texto:"1/2 = 2/3"},{id:"c",texto:"1/2 = 3/4"}], respuestaCorrecta:"a",
    pista:"No mires solo los números. Mira cuánto espacio está coloreado en cada barra.", explicacion:"1/2 y 2/4 ocupan la misma cantidad del todo, por eso son equivalentes."
  },
  {
    id:"practica-igual-denominador", bloqueId:"igual-denominador", conceptoId:"suma_igual_denominador",
    titulo:"Partes del mismo tamaño", enunciado:"Calcula 3/7 + 2/7.", pregunta:"¿Cuál es el resultado?",
    visual:{tipo:"suma-barras",total:7,primera:3,segunda:2},
    opciones:[{id:"a",texto:"5/14"},{id:"b",texto:"5/7"},{id:"c",texto:"1/7"}], respuestaCorrecta:"b",
    pista:"El tamaño de cada parte no cambia: conserva el 7 y suma 3 + 2.", explicacion:"3/7 + 2/7 = 5/7."
  },
  {
    id:"practica-mcm", bloqueId:"comun-denominador", conceptoId:"mcm_denominadores",
    titulo:"Construye un denominador común", enunciado:"Queremos sumar 1/4 + 2/3.", pregunta:"¿Cuál es el m.c.m. de 4 y 3?",
    visual:{tipo:"mcm",a:4,b:3,multiplosA:[4,8,12,16],multiplosB:[3,6,9,12]},
    opciones:[{id:"a",texto:"7"},{id:"b",texto:"12"},{id:"c",texto:"24"}], respuestaCorrecta:"b",
    pista:"Busca el primer número que aparece en las dos listas de múltiplos.", explicacion:"El primer múltiplo común de 4 y 3 es 12."
  },
  {
    id:"practica-suma-distinto", bloqueId:"comun-denominador", conceptoId:"suma_distinto_denominador",
    titulo:"Ahora sí podemos sumar", enunciado:"1/4 = 3/12 y 2/3 = 8/12.", pregunta:"¿Cuánto es 1/4 + 2/3?",
    visual:{tipo:"conversion",izquierda:"1/4",izquierdaConvertida:"3/12",derecha:"2/3",derechaConvertida:"8/12"},
    opciones:[{id:"a",texto:"3/7"},{id:"b",texto:"11/12"},{id:"c",texto:"9/12"}], respuestaCorrecta:"b",
    pista:"Una vez que las dos fracciones están en doceavos, suma 3 + 8 y conserva 12.", explicacion:"3/12 + 8/12 = 11/12."
  },
  {
    id:"practica-multiplicacion", bloqueId:"multiplicar-dividir", conceptoId:"multiplicacion_fracciones",
    titulo:"Multiplica en línea recta", enunciado:"Calcula 2/5 × 3/4.", pregunta:"¿Cuál es el resultado simplificado?",
    visual:{tipo:"producto",numeradores:[2,3],denominadores:[5,4]},
    opciones:[{id:"a",texto:"6/9"},{id:"b",texto:"6/20 = 3/10"},{id:"c",texto:"5/9"}], respuestaCorrecta:"b",
    pista:"Multiplica 2 × 3 y 5 × 4. Después simplifica 6/20 entre 2.", explicacion:"2/5 × 3/4 = 6/20 y, simplificando entre 2, queda 3/10."
  },
  {
    id:"practica-division", bloqueId:"multiplicar-dividir", conceptoId:"division_fracciones",
    titulo:"Multiplica en cruz", enunciado:"Calcula 3/5 ÷ 2/7.", pregunta:"¿Cuál es el resultado?",
    visual:{tipo:"division",primera:"3/5",segunda:"2/7",arriba:"3 × 7",abajo:"5 × 2"},
    opciones:[{id:"a",texto:"6/35"},{id:"b",texto:"21/10"},{id:"c",texto:"15/14"}], respuestaCorrecta:"b",
    pista:"Cruza: 3 × 7 va arriba y 5 × 2 va abajo.", explicacion:"3/5 ÷ 2/7 = (3 × 7)/(5 × 2) = 21/10."
  },
  {
    id:"practica-pizza", bloqueId:"problemas", conceptoId:"problema_fracciones_varios_pasos",
    titulo:"La pizza familiar", enunciado:"Gloria tiene una pizza dividida en 8 porciones iguales. A mediodía come 3/8 y por la tarde su hermano come 1/4.", pregunta:"¿Qué fracción de la pizza queda?",
    visual:{tipo:"pizza",total:8,mediodia:3,tarde:2,queda:3},
    opciones:[{id:"a",texto:"3/8"},{id:"b",texto:"5/8"},{id:"c",texto:"1/8"}], respuestaCorrecta:"a",
    pista:"Convierte 1/4 en 2/8. Se consumen 3/8 + 2/8 = 5/8. La pizza entera es 8/8.", explicacion:"8/8 − 5/8 = 3/8. Quedan 3/8 de la pizza."
  }
]);

export const FAMILIAS_PRUEBA_FRACCIONES = Object.freeze([
  {
    id:"representacion", variantes:[
      { id:"prueba-representacion-a", bloqueId:"significado-equivalencias", conceptoId:"representacion_fraccion", tipoEvidencia:"comprension", titulo:"Representar una fracción", enunciado:"Una barra tiene 5 partes iguales y 2 están coloreadas.", pregunta:"¿Qué fracción representa?", visual:{tipo:"barra",total:5,activas:2,etiqueta:"2 de 5 partes coloreadas"}, opciones:[{id:"a",texto:"2/5"},{id:"b",texto:"3/5"},{id:"c",texto:"2/3"}], respuestaCorrecta:"a" },
      { id:"prueba-representacion-b", bloqueId:"significado-equivalencias", conceptoId:"representacion_fraccion", tipoEvidencia:"comprension", titulo:"Representar una fracción", enunciado:"Una barra tiene 8 partes iguales y 5 están coloreadas.", pregunta:"¿Qué fracción representa?", visual:{tipo:"barra",total:8,activas:5,etiqueta:"5 de 8 partes coloreadas"}, opciones:[{id:"a",texto:"5/8"},{id:"b",texto:"3/8"},{id:"c",texto:"5/3"}], respuestaCorrecta:"a" }
    ]
  },
  {
    id:"equivalencia", variantes:[
      { id:"prueba-equivalencia-a", bloqueId:"significado-equivalencias", conceptoId:"fracciones_equivalentes", tipoEvidencia:"comprension", titulo:"Equivalencias", enunciado:"Busca una fracción equivalente a 3/6.", pregunta:"¿Cuál representa la misma cantidad?", opciones:[{id:"a",texto:"1/2"},{id:"b",texto:"2/3"},{id:"c",texto:"3/4"}], respuestaCorrecta:"a" },
      { id:"prueba-equivalencia-b", bloqueId:"significado-equivalencias", conceptoId:"fracciones_equivalentes", tipoEvidencia:"comprension", titulo:"Equivalencias", enunciado:"Busca una fracción equivalente a 2/8.", pregunta:"¿Cuál representa la misma cantidad?", opciones:[{id:"a",texto:"1/4"},{id:"b",texto:"2/4"},{id:"c",texto:"3/8"}], respuestaCorrecta:"a" }
    ]
  },
  {
    id:"igual-denominador", variantes:[
      { id:"prueba-igual-denominador-a", bloqueId:"igual-denominador", conceptoId:"suma_igual_denominador", tipoEvidencia:"calculo", titulo:"Suma con igual denominador", enunciado:"Calcula 2/9 + 4/9.", pregunta:"¿Cuál es el resultado?", opciones:[{id:"a",texto:"6/18"},{id:"b",texto:"6/9"},{id:"c",texto:"2/9"}], respuestaCorrecta:"b" },
      { id:"prueba-igual-denominador-b", bloqueId:"igual-denominador", conceptoId:"suma_igual_denominador", tipoEvidencia:"calculo", titulo:"Suma con igual denominador", enunciado:"Calcula 3/10 + 5/10.", pregunta:"¿Cuál es el resultado?", opciones:[{id:"a",texto:"8/20"},{id:"b",texto:"8/10"},{id:"c",texto:"2/10"}], respuestaCorrecta:"b" }
    ]
  },
  {
    id:"mcm", variantes:[
      { id:"prueba-mcm-a", bloqueId:"comun-denominador", conceptoId:"mcm_denominadores", tipoEvidencia:"procedimiento", titulo:"Mínimo común múltiplo", enunciado:"Necesitamos un denominador común para 1/4 y 1/6.", pregunta:"¿Cuál es el m.c.m. de 4 y 6?", opciones:[{id:"a",texto:"10"},{id:"b",texto:"12"},{id:"c",texto:"24"}], respuestaCorrecta:"b" },
      { id:"prueba-mcm-b", bloqueId:"comun-denominador", conceptoId:"mcm_denominadores", tipoEvidencia:"procedimiento", titulo:"Mínimo común múltiplo", enunciado:"Necesitamos un denominador común para fracciones con denominadores 3 y 5.", pregunta:"¿Cuál es el m.c.m. de 3 y 5?", opciones:[{id:"a",texto:"8"},{id:"b",texto:"15"},{id:"c",texto:"30"}], respuestaCorrecta:"b" }
    ]
  },
  {
    id:"conversion", variantes:[
      { id:"prueba-conversion-a", bloqueId:"comun-denominador", conceptoId:"conversion_denominador_comun", tipoEvidencia:"procedimiento", titulo:"Ajustar una fracción", enunciado:"Queremos escribir 1/6 con denominador 12.", pregunta:"¿Cuál es la fracción equivalente?", opciones:[{id:"a",texto:"2/12"},{id:"b",texto:"6/12"},{id:"c",texto:"1/12"}], respuestaCorrecta:"a" },
      { id:"prueba-conversion-b", bloqueId:"comun-denominador", conceptoId:"conversion_denominador_comun", tipoEvidencia:"procedimiento", titulo:"Ajustar una fracción", enunciado:"Queremos escribir 2/5 con denominador 15.", pregunta:"¿Cuál es la fracción equivalente?", opciones:[{id:"a",texto:"6/15"},{id:"b",texto:"4/15"},{id:"c",texto:"2/15"}], respuestaCorrecta:"a" }
    ]
  },
  {
    id:"suma-distinto", variantes:[
      { id:"prueba-suma-distinto-a", bloqueId:"comun-denominador", conceptoId:"suma_distinto_denominador", tipoEvidencia:"calculo", titulo:"Suma con distinto denominador", enunciado:"Calcula 1/3 + 1/4.", pregunta:"¿Cuál es el resultado?", opciones:[{id:"a",texto:"2/7"},{id:"b",texto:"7/12"},{id:"c",texto:"5/12"}], respuestaCorrecta:"b" },
      { id:"prueba-suma-distinto-b", bloqueId:"comun-denominador", conceptoId:"suma_distinto_denominador", tipoEvidencia:"calculo", titulo:"Suma con distinto denominador", enunciado:"Calcula 1/2 + 1/3.", pregunta:"¿Cuál es el resultado?", opciones:[{id:"a",texto:"2/5"},{id:"b",texto:"5/6"},{id:"c",texto:"2/6"}], respuestaCorrecta:"b" }
    ]
  },
  {
    id:"multiplicacion", variantes:[
      { id:"prueba-multiplicacion-a", bloqueId:"multiplicar-dividir", conceptoId:"multiplicacion_fracciones", tipoEvidencia:"calculo", titulo:"Multiplicación", enunciado:"Calcula 3/5 × 2/3 y simplifica.", pregunta:"¿Cuál es el resultado?", opciones:[{id:"a",texto:"2/5"},{id:"b",texto:"6/8"},{id:"c",texto:"5/6"}], respuestaCorrecta:"a" },
      { id:"prueba-multiplicacion-b", bloqueId:"multiplicar-dividir", conceptoId:"multiplicacion_fracciones", tipoEvidencia:"calculo", titulo:"Multiplicación", enunciado:"Calcula 2/7 × 3/4 y simplifica.", pregunta:"¿Cuál es el resultado?", opciones:[{id:"a",texto:"3/14"},{id:"b",texto:"5/11"},{id:"c",texto:"6/11"}], respuestaCorrecta:"a" }
    ]
  },
  {
    id:"division", variantes:[
      { id:"prueba-division-a", bloqueId:"multiplicar-dividir", conceptoId:"division_fracciones", tipoEvidencia:"calculo", titulo:"División", enunciado:"Calcula 2/3 ÷ 4/5 y simplifica.", pregunta:"¿Cuál es el resultado?", opciones:[{id:"a",texto:"8/15"},{id:"b",texto:"5/6"},{id:"c",texto:"6/20"}], respuestaCorrecta:"b" },
      { id:"prueba-division-b", bloqueId:"multiplicar-dividir", conceptoId:"division_fracciones", tipoEvidencia:"calculo", titulo:"División", enunciado:"Calcula 3/4 ÷ 2/5.", pregunta:"¿Cuál es el resultado?", opciones:[{id:"a",texto:"6/20"},{id:"b",texto:"15/8"},{id:"c",texto:"8/15"}], respuestaCorrecta:"b" }
    ]
  },
  {
    id:"problema", variantes:[
      { id:"prueba-problema-a", bloqueId:"problemas", conceptoId:"problema_fracciones_varios_pasos", tipoEvidencia:"razonamiento", titulo:"Lo que queda", enunciado:"De una botella se usa 3/10 por la mañana y 2/5 por la tarde.", pregunta:"¿Qué fracción de la botella queda?", opciones:[{id:"a",texto:"3/10"},{id:"b",texto:"7/10"},{id:"c",texto:"1/10"}], respuestaCorrecta:"a" },
      { id:"prueba-problema-b", bloqueId:"problemas", conceptoId:"problema_fracciones_varios_pasos", tipoEvidencia:"razonamiento", titulo:"Lectura de dos días", enunciado:"De un libro se lee 1/4 el primer día y 3/8 el segundo día.", pregunta:"¿Qué fracción del libro queda por leer?", opciones:[{id:"a",texto:"3/8"},{id:"b",texto:"5/8"},{id:"c",texto:"1/8"}], respuestaCorrecta:"a" }
    ]
  },
  {
    id:"simplificacion", variantes:[
      { id:"prueba-simplificacion-a", bloqueId:"significado-equivalencias", conceptoId:"simplificacion_fracciones", tipoEvidencia:"procedimiento", titulo:"Simplificar", enunciado:"Simplifica 8/12 dividiendo numerador y denominador entre 4.", pregunta:"¿Qué fracción obtienes?", opciones:[{id:"a",texto:"2/3"},{id:"b",texto:"4/8"},{id:"c",texto:"8/3"}], respuestaCorrecta:"a" },
      { id:"prueba-simplificacion-b", bloqueId:"significado-equivalencias", conceptoId:"simplificacion_fracciones", tipoEvidencia:"procedimiento", titulo:"Simplificar", enunciado:"Simplifica 9/15 dividiendo numerador y denominador entre 3.", pregunta:"¿Qué fracción obtienes?", opciones:[{id:"a",texto:"3/5"},{id:"b",texto:"6/12"},{id:"c",texto:"9/5"}], respuestaCorrecta:"a" }
    ]
  }
]);