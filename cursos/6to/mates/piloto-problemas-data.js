/*
 * Academia Gloria Valentina · 6.º de Primaria
 * Piloto SIGNATURE · Entender antes de calcular
 * Banco controlado de variantes académicas.
 *
 * El contenido variable vive aquí para probar el patrón Motor + Contenido
 * sin convertir todavía el piloto en un framework general.
 */

export const PILOTO_META = Object.freeze({
  actividadId: "6-mates-entender-antes-calcular",
  version: "0.4",
  cursoReferencia: "6.º de Primaria",
  materia: "Matemáticas",
  tema: "Comprensión y resolución de problemas",
  titulo: "Entender antes de calcular",
  conceptos: Object.freeze([
    "identificar_datos_relevantes",
    "identificar_pregunta",
    "identificar_relacion_matematica",
    "comprobar_sentido",
    "transferir_estrategia"
  ])
});

export const EJEMPLO_ANCLA = Object.freeze({
  titulo: "Cuadernos para las mesas",
  enunciado:
    "En el aula preparan 5 mesas. En cada mesa colocan 6 cuadernos. ¿Cuántos cuadernos colocan en total?",
  datos: "Hay 5 mesas y en cada una colocan 6 cuadernos.",
  pregunta: "Necesitamos averiguar cuántos cuadernos hay entre todas las mesas.",
  relacion: "La misma cantidad, 6 cuadernos, se repite 5 veces.",
  operacion: "Multiplicar representa esa repetición: 5 × 6.",
  calculo: "5 × 6 = 30.",
  comprobacion:
    "Cinco grupos de 6 forman 30. También podemos comprobarlo como 6 + 6 + 6 + 6 + 6 = 30."
});

const datos = [
  {
    id: "datos-lapices-01",
    fase: "datos",
    conceptoId: "identificar_datos_relevantes",
    entrada: true,
    titulo: "La caja de lápices",
    enunciado:
      "En una caja había 18 lápices. La profesora añade 7 lápices más. La caja es verde. ¿Cuántos lápices hay ahora?",
    pregunta: "¿Qué datos necesitas para responder?",
    opciones: [
      { id: "correcta", texto: "18 lápices y los 7 que se añaden.", correcta: true },
      { id: "color", texto: "Los 7 lápices y que la caja es verde.", correcta: false },
      { id: "solo18", texto: "Solo los 18 lápices que había al principio.", correcta: false }
    ],
    pistas: [
      "Busca las cantidades que cambian el número de lápices. El color de la caja no cambia el total."
    ],
    feedbackCorrecto:
      "Muy bien. Separaste los datos que sirven de un detalle que no cambia la respuesta."
  },
  {
    id: "datos-pegatinas-02",
    fase: "datos",
    conceptoId: "identificar_datos_relevantes",
    titulo: "Pegatinas del álbum",
    enunciado:
      "Gloria tiene 32 pegatinas y regala 9 a una amiga. El álbum tiene una portada violeta. ¿Cuántas pegatinas le quedan?",
    pregunta: "¿Qué información necesitas para resolverlo?",
    opciones: [
      { id: "correcta", texto: "Las 32 pegatinas y las 9 que regaló.", correcta: true },
      { id: "portada", texto: "Las 9 pegatinas y el color de la portada.", correcta: false },
      { id: "solo32", texto: "Solo las 32 pegatinas iniciales.", correcta: false }
    ],
    pistas: [
      "Pregúntate qué cantidades afectan a cuántas pegatinas quedan."
    ],
    feedbackCorrecto:
      "Exacto. Elegiste los datos que realmente cambian la cantidad."
  },
  {
    id: "datos-bandejas-03",
    fase: "datos",
    conceptoId: "identificar_datos_relevantes",
    titulo: "Bocadillos para la salida",
    enunciado:
      "Preparan 6 bandejas con 4 bocadillos en cada una. La salida comienza a las 10:00. ¿Cuántos bocadillos preparan?",
    pregunta: "¿Qué datos son necesarios?",
    opciones: [
      { id: "correcta", texto: "6 bandejas y 4 bocadillos por bandeja.", correcta: true },
      { id: "hora", texto: "4 bocadillos y la hora de salida.", correcta: false },
      { id: "solo6", texto: "Solo que hay 6 bandejas.", correcta: false }
    ],
    pistas: [
      "La hora puede ser útil para organizar la salida, pero no para contar los bocadillos."
    ],
    feedbackCorrecto:
      "Bien. Identificaste las dos cantidades que forman los grupos."
  },
  {
    id: "datos-equipos-04",
    fase: "datos",
    conceptoId: "identificar_datos_relevantes",
    titulo: "Equipos de deporte",
    enunciado:
      "Hay 48 alumnos para formar 8 equipos iguales. Los petos son azules. ¿Cuántos alumnos habrá en cada equipo?",
    pregunta: "¿Qué datos necesitas?",
    opciones: [
      { id: "correcta", texto: "48 alumnos y 8 equipos iguales.", correcta: true },
      { id: "petos", texto: "8 equipos y el color de los petos.", correcta: false },
      { id: "solo48", texto: "Solo que participan 48 alumnos.", correcta: false }
    ],
    pistas: [
      "Para saber cuánto corresponde a cada equipo necesitas el total y el número de equipos."
    ],
    feedbackCorrecto:
      "Exacto. El color no afecta al reparto; el total y los grupos sí."
  }
];

const pregunta = [
  {
    id: "pregunta-libros-01",
    fase: "pregunta",
    conceptoId: "identificar_pregunta",
    entrada: true,
    titulo: "Libros en la estantería",
    enunciado:
      "En una estantería había 25 libros y colocan 6 libros más. ¿Cuántos libros hay ahora?",
    pregunta: "¿Qué necesitamos averiguar?",
    opciones: [
      { id: "correcta", texto: "Cuántos libros hay ahora en total.", correcta: true },
      { id: "inicial", texto: "Cuántos libros había antes de añadir los nuevos.", correcta: false },
      { id: "nuevos", texto: "De qué tema son los 6 libros nuevos.", correcta: false }
    ],
    pistas: [
      "Mira la última pregunta del problema: quiere conocer la situación después del cambio."
    ],
    feedbackCorrecto:
      "Eso es. Antes de calcular dejaste claro cuál es la meta del problema."
  },
  {
    id: "pregunta-cromos-02",
    fase: "pregunta",
    conceptoId: "identificar_pregunta",
    titulo: "Cromos compartidos",
    enunciado:
      "Lucas tenía 40 cromos y entrega 12 a su primo. ¿Cuántos cromos conserva?",
    pregunta: "¿Cuál es la pregunta matemática?",
    opciones: [
      { id: "correcta", texto: "Cuántos cromos le quedan después de entregar 12.", correcta: true },
      { id: "primo", texto: "Cuántos cromos tenía el primo antes.", correcta: false },
      { id: "total", texto: "Cuántos cromos existen entre todos los álbumes.", correcta: false }
    ],
    pistas: [
      "La respuesta debe decir algo sobre los cromos que conserva Lucas."
    ],
    feedbackCorrecto:
      "Muy bien. Identificaste exactamente qué cantidad debe aparecer en la respuesta."
  },
  {
    id: "pregunta-mesas-03",
    fase: "pregunta",
    conceptoId: "identificar_pregunta",
    titulo: "Mesas del comedor",
    enunciado:
      "Hay 7 mesas y en cada mesa se sientan 4 personas. ¿Cuántas personas pueden sentarse en total?",
    pregunta: "¿Qué queremos conocer?",
    opciones: [
      { id: "correcta", texto: "El total de personas en las 7 mesas.", correcta: true },
      { id: "mesas", texto: "Cuántas mesas hay, porque ese dato ya no se conoce.", correcta: false },
      { id: "cada", texto: "Cuántas personas hay en una sola mesa.", correcta: false }
    ],
    pistas: [
      "La palabra «total» en la pregunta te ayuda, pero comprueba qué cantidades deben reunirse."
    ],
    feedbackCorrecto:
      "Exacto. La meta es conocer todas las personas, no solo un grupo."
  },
  {
    id: "pregunta-reparto-04",
    fase: "pregunta",
    conceptoId: "identificar_pregunta",
    titulo: "Botellas para los grupos",
    enunciado:
      "Se reparten 42 botellas por igual entre 6 grupos. ¿Cuántas botellas recibe cada grupo?",
    pregunta: "¿Qué dato falta encontrar?",
    opciones: [
      { id: "correcta", texto: "Cuántas botellas corresponden a cada grupo.", correcta: true },
      { id: "total", texto: "Cuántas botellas hay en total.", correcta: false },
      { id: "grupos", texto: "Cuántos grupos participan.", correcta: false }
    ],
    pistas: [
      "El total y el número de grupos ya aparecen. Falta saber cuánto recibe uno."
    ],
    feedbackCorrecto:
      "Bien. Viste que la pregunta busca la cantidad de cada grupo."
  }
];

const relacion = [
  {
    id: "relacion-bandejas-01",
    fase: "relacion",
    conceptoId: "identificar_relacion_matematica",
    entrada: true,
    titulo: "Fruta para la merienda",
    enunciado:
      "Hay 4 bandejas y en cada una colocan 5 piezas de fruta. ¿Cuántas piezas hay en total?",
    pregunta: "¿Qué operación representa mejor la historia?",
    operacionCorrecta: "multiplicar",
    pista:
      "La misma cantidad, 5, aparece en cada una de las 4 bandejas. Piensa en grupos iguales.",
    feedbackCorrecto:
      "Muy bien. Reconociste una cantidad que se repite en grupos iguales."
  },
  {
    id: "relacion-prestamo-02",
    fase: "relacion",
    conceptoId: "identificar_relacion_matematica",
    titulo: "Libros prestados",
    enunciado:
      "La biblioteca tenía 36 libros de aventuras y presta 8. ¿Cuántos quedan?",
    pregunta: "¿Qué operación representa el cambio?",
    operacionCorrecta: "restar",
    pista:
      "La cantidad inicial disminuye porque algunos libros dejan de estar disponibles.",
    feedbackCorrecto:
      "Exacto. La historia describe una cantidad que disminuye."
  },
  {
    id: "relacion-reparto-03",
    fase: "relacion",
    conceptoId: "identificar_relacion_matematica",
    titulo: "Equipos iguales",
    enunciado:
      "Hay 48 alumnos y se forman 8 equipos con la misma cantidad. ¿Cuántos alumnos van en cada equipo?",
    pregunta: "¿Qué operación ayuda a encontrar lo que recibe cada grupo?",
    operacionCorrecta: "dividir",
    pista:
      "Existe un total y queremos repartirlo entre 8 grupos iguales.",
    feedbackCorrecto:
      "Bien razonado. Reconociste un reparto en grupos iguales."
  },
  {
    id: "relacion-llegan-04",
    fase: "relacion",
    conceptoId: "identificar_relacion_matematica",
    titulo: "Más entradas",
    enunciado:
      "Ya se han vendido 23 entradas y después se venden 9 más. ¿Cuántas se han vendido ahora?",
    pregunta: "¿Qué operación representa mejor lo que ocurre?",
    operacionCorrecta: "sumar",
    pista:
      "La cantidad aumenta porque llegan nuevas entradas al total que ya existía.",
    feedbackCorrecto:
      "Exacto. La historia junta una cantidad que ya había con otra que llega."
  }
];

const comprobacion = [
  {
    id: "comprobar-naranjas-01",
    fase: "comprobacion",
    conceptoId: "comprobar_sentido",
    entrada: true,
    titulo: "¿Encaja la respuesta?",
    enunciado:
      "Hay 3 bolsas con 6 naranjas en cada una. Una alumna dice que hay 18 naranjas en total.",
    pregunta: "¿Qué comprobación explica mejor que 18 tiene sentido?",
    opciones: [
      { id: "correcta", texto: "Sí: 6 + 6 + 6 = 18, que son tres grupos de 6.", correcta: true },
      { id: "resta", texto: "Sí: 18 − 6 = 12, y por eso siempre debe ser 18.", correcta: false },
      { id: "azar", texto: "Sí, porque 18 parece un número razonable aunque no lo comprobemos.", correcta: false }
    ],
    pista:
      "Una buena comprobación debe volver a la historia: tres grupos con seis elementos en cada uno.",
    feedbackCorrecto:
      "Exacto. No aceptaste el número porque sí: lo conectaste otra vez con la historia."
  },
  {
    id: "comprobar-cambio-02",
    fase: "comprobacion",
    conceptoId: "comprobar_sentido",
    titulo: "El cambio de una compra",
    enunciado:
      "Un cuaderno cuesta 7 €. Pagas con 10 €. Alguien dice que el cambio es 17 €.",
    pregunta: "¿Qué explicación comprueba mejor si la respuesta tiene sentido?",
    opciones: [
      { id: "correcta", texto: "No: el cambio debe ser menor que 10 €; 10 − 7 = 3 €.", correcta: true },
      { id: "sumar", texto: "Sí: 10 + 7 = 17, así que 17 € es el cambio.", correcta: false },
      { id: "azar", texto: "Sí, porque 17 usa los dos números del problema.", correcta: false }
    ],
    pista:
      "Después de pagar, el dinero que vuelve no puede ser mayor que el dinero entregado.",
    feedbackCorrecto:
      "Muy bien. Usaste el sentido de la situación y una cuenta para comprobar."
  },
  {
    id: "comprobar-reparto-03",
    fase: "comprobacion",
    conceptoId: "comprobar_sentido",
    titulo: "Reparto de fichas",
    enunciado:
      "Se reparten 48 fichas entre 8 personas. Una alumna responde que cada persona recibe 6.",
    pregunta: "¿Cómo puedes comprobar esa respuesta?",
    opciones: [
      { id: "correcta", texto: "Multiplico 8 × 6 y obtengo 48; reconstruyo el total.", correcta: true },
      { id: "sumar", texto: "Sumo 48 + 8 y compruebo que el resultado sea mayor.", correcta: false },
      { id: "restar", texto: "Resto 8 − 6 y, como da 2, la respuesta queda comprobada.", correcta: false }
    ],
    pista:
      "Si 8 personas reciben 6 cada una, juntas deberían reconstruir las 48 fichas.",
    feedbackCorrecto:
      "Exacto. Usaste la operación relacionada para comprobar el reparto."
  },
  {
    id: "comprobar-suma-04",
    fase: "comprobacion",
    conceptoId: "comprobar_sentido",
    titulo: "Personas en dos salas",
    enunciado:
      "En una sala hay 26 personas y en otra 15. Una alumna responde que hay 41 personas en total.",
    pregunta: "¿Qué comprobación tiene más sentido?",
    opciones: [
      { id: "correcta", texto: "41 es mayor que 26 y que 15; además 26 + 15 = 41.", correcta: true },
      { id: "menor", texto: "La respuesta debería ser menor que 15 porque juntamos dos salas.", correcta: false },
      { id: "division", texto: "Divido 41 entre 26 para comprobar que aparecen las dos salas.", correcta: false }
    ],
    pista:
      "Cuando juntamos dos cantidades positivas, el total debe ser mayor que cada una por separado.",
    feedbackCorrecto:
      "Muy bien. Comprobaste el cálculo y también si el tamaño de la respuesta encaja."
  }
];

const transferencia = [
  {
    id: "transfer-libros-01",
    fase: "transferencia",
    conceptoId: "transferir_estrategia",
    entrada: true,
    titulo: "Ahora la estrategia es tuya",
    enunciado:
      "En una mesa había 35 libros. Se prestan 8. ¿Cuántos libros quedan en la mesa?",
    preguntaOperacion:
      "Sin buscar una palabra mágica: ¿qué operación representa lo que ocurre?",
    operacionCorrecta: "restar",
    resultadoCorrecto: 27,
    pista:
      "Empieza con una cantidad y una parte deja de estar en la mesa. Después revisa la cuenta.",
    feedbackCorrecto:
      "Has aplicado la estrategia completa en una historia nueva: entendiste, elegiste y calculaste."
  },
  {
    id: "transfer-cajas-02",
    fase: "transferencia",
    conceptoId: "transferir_estrategia",
    titulo: "Ahora la estrategia es tuya",
    enunciado:
      "Hay 6 cajas con 7 rotuladores en cada una. ¿Cuántos rotuladores hay en total?",
    preguntaOperacion:
      "¿Qué operación representa mejor los grupos iguales?",
    operacionCorrecta: "multiplicar",
    resultadoCorrecto: 42,
    pista:
      "La misma cantidad, 7, se repite en cada una de las 6 cajas.",
    feedbackCorrecto:
      "Muy bien. Cambió la historia y mantuviste la idea de grupos iguales."
  },
  {
    id: "transfer-equipos-03",
    fase: "transferencia",
    conceptoId: "transferir_estrategia",
    titulo: "Ahora la estrategia es tuya",
    enunciado:
      "Se reparten 48 alumnos por igual entre 8 equipos. ¿Cuántos alumnos habrá en cada equipo?",
    preguntaOperacion:
      "¿Qué operación permite encontrar lo que corresponde a cada equipo?",
    operacionCorrecta: "dividir",
    resultadoCorrecto: 6,
    pista:
      "Tienes un total de 48 y quieres saber cuánto corresponde a cada uno de 8 grupos iguales.",
    feedbackCorrecto:
      "Excelente. Reconociste un reparto y resolviste una división con números manejables."
  },
  {
    id: "transfer-botellas-04",
    fase: "transferencia",
    conceptoId: "transferir_estrategia",
    titulo: "Ahora la estrategia es tuya",
    enunciado:
      "Hay 72 botellas y se colocan por igual en 9 cajas. ¿Cuántas botellas van en cada caja?",
    preguntaOperacion:
      "¿Qué operación representa esta organización?",
    operacionCorrecta: "dividir",
    resultadoCorrecto: 8,
    pista:
      "Buscamos cuánto corresponde a cada una de 9 cajas iguales.",
    feedbackCorrecto:
      "Muy bien. Usaste la estrategia para resolver un reparto en un contexto diferente."
  }
];

export const BANCO_PILOTO = Object.freeze({
  datos: Object.freeze(datos),
  pregunta: Object.freeze(pregunta),
  relacion: Object.freeze(relacion),
  comprobacion: Object.freeze(comprobacion),
  transferencia: Object.freeze(transferencia)
});

export const OPERACIONES = Object.freeze([
  Object.freeze({ id: "sumar", simbolo: "+", nombre: "Sumar" }),
  Object.freeze({ id: "restar", simbolo: "−", nombre: "Restar" }),
  Object.freeze({ id: "multiplicar", simbolo: "×", nombre: "Multiplicar" }),
  Object.freeze({ id: "dividir", simbolo: "÷", nombre: "Dividir" })
]);
