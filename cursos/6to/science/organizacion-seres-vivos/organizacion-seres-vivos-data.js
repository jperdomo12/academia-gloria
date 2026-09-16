export const SCIENCE_META = Object.freeze({
  actividadId: "6-science-organizacion-seres-vivos",
  tituloActividad: "Organización de los seres vivos",
  version: "1.0",
  cursoReferencia: "6.º de Primaria",
  materia: "Science",
  tema: "Organización de los seres vivos"
});

export const BLOQUES_RESULTADO = Object.freeze([
  Object.freeze({
    id: "vida-procesos",
    icono: "🌍",
    titulo: "Vida y procesos vitales",
    descripcion: "Biodiversidad, condiciones para la vida e interacción, nutrición y reproducción."
  }),
  Object.freeze({
    id: "celulas-organismos",
    icono: "🔬",
    titulo: "Células y organismos",
    descripcion: "Partes de la célula y diferencia entre organismos unicelulares y pluricelulares."
  }),
  Object.freeze({
    id: "organizacion-pluricelular",
    icono: "🧩",
    titulo: "Niveles de organización",
    descripcion: "Relación entre célula, tejido, órgano, sistema y cuerpo humano."
  }),
  Object.freeze({
    id: "sistemas-procesos",
    icono: "🫀",
    titulo: "Sistemas y procesos vitales",
    descripcion: "Cómo varios sistemas del cuerpo participan en nutrición, interacción y reproducción."
  })
]);

export const FICHAS_SCIENCE = Object.freeze([
  Object.freeze({ icono:"🌎", pregunta:"¿Qué es la biodiversidad?", respuesta:"La enorme variedad de seres vivos que existe en nuestro planeta." }),
  Object.freeze({ icono:"👀", pregunta:"¿Qué ocurre en la interacción?", respuesta:"Los seres vivos detectan información de su entorno y reaccionan a ella." }),
  Object.freeze({ icono:"⚡", pregunta:"¿Para qué sirve la nutrición?", respuesta:"Permite tomar nutrientes del entorno para obtener energía, crecer y desarrollarse." }),
  Object.freeze({ icono:"🌱", pregunta:"¿Qué permite la reproducción?", respuesta:"Crear nuevos miembros de la propia especie." }),
  Object.freeze({ icono:"🔬", pregunta:"¿Qué es una célula?", respuesta:"Es la unidad básica de la vida. Las células realizan los procesos vitales básicos." }),
  Object.freeze({ icono:"🧫", pregunta:"¿Qué partes aparecen señaladas en la célula del material?", respuesta:"Membrana, citoplasma, núcleo y nucléolo." }),
  Object.freeze({ icono:"1️⃣", pregunta:"¿Qué es un organismo unicelular?", respuesta:"Un ser vivo formado por una sola célula, como las bacterias o las levaduras." }),
  Object.freeze({ icono:"🔢", pregunta:"¿Qué es un organismo pluricelular?", respuesta:"Un ser vivo formado por muchas células, como los árboles, las mariposas o los seres humanos." }),
  Object.freeze({ icono:"🧵", pregunta:"¿Qué es un tejido?", respuesta:"Un conjunto de células que se unen y realizan una función específica." }),
  Object.freeze({ icono:"🫀", pregunta:"¿Qué es un órgano?", respuesta:"Una estructura formada por diferentes tejidos. El corazón es un ejemplo." }),
  Object.freeze({ icono:"🔗", pregunta:"¿Qué es un sistema?", respuesta:"Un grupo de órganos que trabajan juntos para realizar una función." }),
  Object.freeze({ icono:"🪜", pregunta:"¿Cuál es el orden de organización?", respuesta:"Célula → tejido → órgano → sistema → cuerpo humano." })
]);

export const PRACTICA_SCIENCE = Object.freeze([
  Object.freeze({
    id:"practica-biodiversidad", titulo:"Una palabra importante",
    enunciado:"En la Tierra hay una enorme variedad de seres vivos, desde bacterias microscópicas hasta ballenas y árboles.",
    pregunta:"¿Cómo llama el material del colegio a esa enorme variedad?", bloqueId:"vida-procesos",
    pista:"Busca una palabra que significa variedad de seres vivos.", respuestaCorrecta:"biodiversidad",
    explicacion:"Biodiversidad es el nombre que recibe la enorme variedad de seres vivos del planeta.",
    opciones:Object.freeze([
      Object.freeze({id:"biodiversidad",texto:"Biodiversidad"}), Object.freeze({id:"atmosfera",texto:"Atmósfera"}), Object.freeze({id:"nutricion",texto:"Nutrición"})
    ])
  }),
  Object.freeze({
    id:"practica-interaccion", titulo:"Detectar y reaccionar",
    enunciado:"Una planta orienta su crecimiento para recibir más luz solar.", pregunta:"¿Qué proceso vital representa este ejemplo?", bloqueId:"vida-procesos",
    pista:"El ser vivo recibe información del entorno y responde a ella.", respuestaCorrecta:"interaccion",
    explicacion:"La interacción permite detectar información del entorno y reaccionar de distintas maneras.",
    opciones:Object.freeze([
      Object.freeze({id:"interaccion",texto:"Interacción"}), Object.freeze({id:"nutricion",texto:"Nutrición"}), Object.freeze({id:"reproduccion",texto:"Reproducción"})
    ])
  }),
  Object.freeze({
    id:"practica-celula-partes", titulo:"Dentro de la célula",
    enunciado:"El esquema del material señala membrana, citoplasma, núcleo y nucléolo.", pregunta:"¿Cuál de estas opciones contiene solo partes que aparecen señaladas?", bloqueId:"celulas-organismos",
    pista:"Piensa en las cuatro etiquetas del dibujo de la célula.", respuestaCorrecta:"partes",
    explicacion:"El material identifica membrana, citoplasma, núcleo y nucléolo.",
    opciones:Object.freeze([
      Object.freeze({id:"partes",texto:"Membrana, citoplasma, núcleo y nucléolo"}), Object.freeze({id:"sistemas",texto:"Corazón, sangre, vasos y pulmones"}), Object.freeze({id:"niveles",texto:"Tejido, órgano, sistema y cuerpo"})
    ])
  }),
  Object.freeze({
    id:"practica-unicelular", titulo:"Una sola célula",
    enunciado:"Las bacterias y las levaduras están formadas por una sola célula.", pregunta:"¿Cómo se llaman estos organismos?", bloqueId:"celulas-organismos",
    pista:"Uni- significa uno.", respuestaCorrecta:"unicelulares",
    explicacion:"Los organismos formados por una sola célula son unicelulares.",
    opciones:Object.freeze([
      Object.freeze({id:"unicelulares",texto:"Unicelulares"}), Object.freeze({id:"pluricelulares",texto:"Pluricelulares"}), Object.freeze({id:"sistemas",texto:"Sistemas"})
    ])
  }),
  Object.freeze({
    id:"practica-orden", titulo:"Del pequeño al conjunto",
    enunciado:"En un organismo pluricelular, las estructuras se organizan en niveles.", pregunta:"¿Cuál es el orden que presenta el material?", bloqueId:"organizacion-pluricelular",
    pista:"Empieza por la unidad básica de la vida.", respuestaCorrecta:"orden",
    explicacion:"El orden es célula → tejido → órgano → sistema → cuerpo humano.",
    opciones:Object.freeze([
      Object.freeze({id:"orden",texto:"Célula → tejido → órgano → sistema → cuerpo humano"}), Object.freeze({id:"orden2",texto:"Tejido → célula → sistema → órgano → cuerpo humano"}), Object.freeze({id:"orden3",texto:"Órgano → tejido → célula → cuerpo humano → sistema"})
    ])
  }),
  Object.freeze({
    id:"practica-organo", titulo:"Tejidos que trabajan juntos",
    enunciado:"El corazón contiene distintos tejidos, como tejido muscular y tejido fibroso.", pregunta:"Según el material, ¿qué nivel de organización es el corazón?", bloqueId:"organizacion-pluricelular",
    pista:"Está formado por diferentes tejidos.", respuestaCorrecta:"organo",
    explicacion:"Un órgano está formado por diferentes tejidos; el corazón es el ejemplo del material.",
    opciones:Object.freeze([
      Object.freeze({id:"organo",texto:"Órgano"}), Object.freeze({id:"tejido",texto:"Tejido"}), Object.freeze({id:"celula",texto:"Célula"})
    ])
  }),
  Object.freeze({
    id:"practica-nutricion-sistemas", titulo:"Nutrición en el cuerpo",
    enunciado:"Varios sistemas participan en la nutrición: digestivo, respiratorio, circulatorio y excretor.", pregunta:"¿Qué hace el sistema circulatorio según el material?", bloqueId:"sistemas-procesos",
    pista:"Piensa en cómo llegan los nutrientes a todo el cuerpo.", respuestaCorrecta:"reparte",
    explicacion:"El sistema circulatorio reparte los nutrientes a todas las partes del cuerpo.",
    opciones:Object.freeze([
      Object.freeze({id:"reparte",texto:"Reparte los nutrientes por el cuerpo"}), Object.freeze({id:"absorbe",texto:"Absorbe el oxígeno del aire"}), Object.freeze({id:"elimina",texto:"Elimina lo que el cuerpo no necesita"})
    ])
  }),
  Object.freeze({
    id:"practica-interaccion-sistemas", titulo:"Responder al mundo",
    enunciado:"Los órganos de los sentidos, los nervios y el cerebro forman el sistema nervioso.", pregunta:"¿Qué función destaca el material para el sistema nervioso?", bloqueId:"sistemas-procesos",
    pista:"La interacción empieza recibiendo información.", respuestaCorrecta:"detecta",
    explicacion:"El sistema nervioso detecta información; después los sistemas muscular y óseo permiten reaccionar.",
    opciones:Object.freeze([
      Object.freeze({id:"detecta",texto:"Detecta información"}), Object.freeze({id:"digiere",texto:"Utiliza alimentos y bebidas"}), Object.freeze({id:"reproduce",texto:"Produce nuevos miembros por sí solo"})
    ])
  })
]);

function opcion(id, texto) { return Object.freeze({ id, texto }); }
function variante(config) { return Object.freeze({ ...config, tipoEvidencia:"seleccion_simple", opciones:Object.freeze(config.opciones) }); }

export const FAMILIAS_PRUEBA_SCIENCE = Object.freeze([
  Object.freeze({ id:"familia-biodiversidad", variantes:Object.freeze([
    variante({id:"test-biodiversidad-a",bloqueId:"vida-procesos",conceptoId:"biodiversidad",titulo:"Biodiversidad",enunciado:"En nuestro planeta existen más de dos millones de especies conocidas y todavía quedan muchas por descubrir.",pregunta:"¿Qué concepto describe esa enorme variedad de seres vivos?",respuestaCorrecta:"a",opciones:[opcion("a","Biodiversidad"),opcion("b","Interacción"),opcion("c","Atmósfera")]}),
    variante({id:"test-biodiversidad-b",bloqueId:"vida-procesos",conceptoId:"biodiversidad",titulo:"Biodiversidad",enunciado:"Bacterias microscópicas, árboles y ballenas forman parte de la gran variedad de vida de la Tierra.",pregunta:"¿Cómo llama el material a esa variedad?",respuestaCorrecta:"b",opciones:[opcion("a","Nutrición"),opcion("b","Biodiversidad"),opcion("c","Reproducción")]})
  ])}),
  Object.freeze({ id:"familia-procesos-vitales", variantes:Object.freeze([
    variante({id:"test-procesos-a",bloqueId:"vida-procesos",conceptoId:"procesos-vitales",titulo:"Procesos vitales",enunciado:"Un ser vivo detecta información de su entorno y cambia su comportamiento como respuesta.",pregunta:"¿Qué proceso vital está realizando?",respuestaCorrecta:"c",opciones:[opcion("a","Nutrición"),opcion("b","Reproducción"),opcion("c","Interacción")]}),
    variante({id:"test-procesos-b",bloqueId:"vida-procesos",conceptoId:"procesos-vitales",titulo:"Procesos vitales",enunciado:"Un martín pescador come un pez y obtiene nutrientes que le dan energía.",pregunta:"¿Qué proceso vital representa el ejemplo?",respuestaCorrecta:"a",opciones:[opcion("a","Nutrición"),opcion("b","Interacción"),opcion("c","Reproducción")]})
  ])}),
  Object.freeze({ id:"familia-celula-partes", variantes:Object.freeze([
    variante({id:"test-celula-a",bloqueId:"celulas-organismos",conceptoId:"celula-partes",titulo:"La célula",enunciado:"El material muestra un esquema de una célula con cuatro etiquetas.",pregunta:"¿Cuál de estas partes aparece señalada en ese esquema?",respuestaCorrecta:"b",opciones:[opcion("a","Tejido"),opcion("b","Citoplasma"),opcion("c","Sistema")]}),
    variante({id:"test-celula-b",bloqueId:"celulas-organismos",conceptoId:"celula-partes",titulo:"La célula",enunciado:"Las células son muy pequeñas y necesitamos un microscopio para verlas.",pregunta:"¿Cómo las presenta el material dentro de los seres vivos?",respuestaCorrecta:"a",opciones:[opcion("a","Como unidades básicas de la vida"),opcion("b","Como órganos completos"),opcion("c","Como sistemas del cuerpo")]})
  ])}),
  Object.freeze({ id:"familia-unicelular-pluricelular", variantes:Object.freeze([
    variante({id:"test-organismos-a",bloqueId:"celulas-organismos",conceptoId:"unicelular-pluricelular",titulo:"Unicelulares y pluricelulares",enunciado:"Una levadura está formada por una sola célula.",pregunta:"¿Cómo se clasifica según el material?",respuestaCorrecta:"c",opciones:[opcion("a","Tejido"),opcion("b","Pluricelular"),opcion("c","Unicelular")]}),
    variante({id:"test-organismos-b",bloqueId:"celulas-organismos",conceptoId:"unicelular-pluricelular",titulo:"Unicelulares y pluricelulares",enunciado:"Un ser humano está formado por muchas células.",pregunta:"¿Cómo se clasifica?",respuestaCorrecta:"b",opciones:[opcion("a","Unicelular"),opcion("b","Pluricelular"),opcion("c","Microscópico")]})
  ])}),
  Object.freeze({ id:"familia-niveles-orden", variantes:Object.freeze([
    variante({id:"test-niveles-a",bloqueId:"organizacion-pluricelular",conceptoId:"niveles-organizacion",titulo:"Niveles de organización",enunciado:"En los organismos pluricelulares, las estructuras se organizan desde unidades pequeñas hasta conjuntos mayores.",pregunta:"¿Cuál es el orden correcto?",respuestaCorrecta:"a",opciones:[opcion("a","Célula → tejido → órgano → sistema → cuerpo humano"),opcion("b","Tejido → órgano → célula → sistema → cuerpo humano"),opcion("c","Célula → sistema → tejido → órgano → cuerpo humano")]}),
    variante({id:"test-niveles-b",bloqueId:"organizacion-pluricelular",conceptoId:"niveles-organizacion",titulo:"Niveles de organización",enunciado:"Varias células musculares largas y finas se unen para trabajar juntas.",pregunta:"¿Qué forman?",respuestaCorrecta:"c",opciones:[opcion("a","Un sistema"),opcion("b","Un cuerpo humano"),opcion("c","Un tejido")]})
  ])}),
  Object.freeze({ id:"familia-organo-sistema", variantes:Object.freeze([
    variante({id:"test-organo-sistema-a",bloqueId:"organizacion-pluricelular",conceptoId:"organo-sistema",titulo:"Órganos y sistemas",enunciado:"El corazón está formado por distintos tejidos, entre ellos tejido muscular y tejido fibroso.",pregunta:"¿Qué es el corazón en esta organización?",respuestaCorrecta:"b",opciones:[opcion("a","Una célula"),opcion("b","Un órgano"),opcion("c","Un tejido")]}),
    variante({id:"test-organo-sistema-b",bloqueId:"organizacion-pluricelular",conceptoId:"organo-sistema",titulo:"Órganos y sistemas",enunciado:"Varios órganos trabajan juntos para realizar una función.",pregunta:"¿Qué nivel forman?",respuestaCorrecta:"a",opciones:[opcion("a","Un sistema"),opcion("b","Una célula"),opcion("c","Un tejido")]})
  ])}),
  Object.freeze({ id:"familia-sistemas-nutricion", variantes:Object.freeze([
    variante({id:"test-sistemas-nutricion-a",bloqueId:"sistemas-procesos",conceptoId:"sistemas-nutricion",titulo:"Sistemas y nutrición",enunciado:"Durante la nutrición, varios sistemas absorben, utilizan, transportan o eliminan sustancias.",pregunta:"¿Qué sistema absorbe oxígeno según el material?",respuestaCorrecta:"b",opciones:[opcion("a","Circulatorio"),opcion("b","Respiratorio"),opcion("c","Excretor")]}),
    variante({id:"test-sistemas-nutricion-b",bloqueId:"sistemas-procesos",conceptoId:"sistemas-nutricion",titulo:"Sistemas y nutrición",enunciado:"El cuerpo necesita eliminar lo que no necesita después de utilizar las sustancias necesarias para vivir.",pregunta:"¿Qué sistema realiza esa función en el material?",respuestaCorrecta:"c",opciones:[opcion("a","Digestivo"),opcion("b","Circulatorio"),opcion("c","Excretor")]})
  ])}),
  Object.freeze({ id:"familia-sistemas-interaccion-reproduccion", variantes:Object.freeze([
    variante({id:"test-sistemas-interaccion-a",bloqueId:"sistemas-procesos",conceptoId:"sistemas-interaccion-reproduccion",titulo:"Interacción y sistemas",enunciado:"Los órganos de los sentidos, los nervios y el cerebro participan en detectar información del mundo.",pregunta:"¿Qué sistema forman según el material?",respuestaCorrecta:"a",opciones:[opcion("a","Sistema nervioso"),opcion("b","Sistema excretor"),opcion("c","Sistema digestivo")]}),
    variante({id:"test-sistemas-reproduccion-b",bloqueId:"sistemas-procesos",conceptoId:"sistemas-interaccion-reproduccion",titulo:"Reproducción y sistemas",enunciado:"El material explica que las células masculinas y femeninas se combinan y se convierten lentamente en un embrión y después en un feto.",pregunta:"¿Qué aparato permite este proceso vital?",respuestaCorrecta:"b",opciones:[opcion("a","Aparato digestivo"),opcion("b","Aparato reproductor"),opcion("c","Sistema circulatorio")]})
  ])})
]);

export const EXPLICACIONES_PRUEBA_SCIENCE = Object.freeze({
  "test-biodiversidad-a":"El material define biodiversidad como la enorme variedad de seres vivos de nuestro planeta.",
  "test-biodiversidad-b":"Biodiversidad es el término usado para la variedad de seres vivos, desde los microscópicos hasta los enormes.",
  "test-procesos-a":"Interacción es detectar información del entorno y reaccionar ante ella.",
  "test-procesos-b":"Nutrición es tomar nutrientes del entorno para obtener energía, crecer y desarrollarse.",
  "test-celula-a":"Citoplasma es una de las cuatro partes señaladas en el esquema, junto con membrana, núcleo y nucléolo.",
  "test-celula-b":"El material presenta las células como unidades básicas de la vida y explica que realizan los procesos vitales básicos.",
  "test-organismos-a":"Una levadura tiene una sola célula, por eso es un organismo unicelular.",
  "test-organismos-b":"Los seres humanos tienen muchas células, por eso son organismos pluricelulares.",
  "test-niveles-a":"El material presenta la secuencia célula → tejido → órgano → sistema → cuerpo humano.",
  "test-niveles-b":"Las células se unen para formar tejidos; cada tejido realiza una función específica.",
  "test-organo-sistema-a":"El corazón es un órgano porque está formado por diferentes tejidos.",
  "test-organo-sistema-b":"Los sistemas son grupos de órganos que trabajan juntos para realizar una función.",
  "test-sistemas-nutricion-a":"El sistema respiratorio absorbe oxígeno.",
  "test-sistemas-nutricion-b":"El sistema excretor elimina del cuerpo lo que no necesitamos.",
  "test-sistemas-interaccion-a":"Los órganos de los sentidos, los nervios y el cerebro forman el sistema nervioso, que detecta información.",
  "test-sistemas-reproduccion-b":"El aparato reproductor permite la reproducción; el material describe la secuencia desde la combinación de células hasta embrión, feto y bebé."
});
