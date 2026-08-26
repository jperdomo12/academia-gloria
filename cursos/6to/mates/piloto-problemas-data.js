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
  version: "0.3",
  cursoReferencia: "6.º de Primaria",
  materia: "Matemáticas",
  tema: "Comprensión y resolución de problemas",
  titulo: "Entender antes de calcular",
  conceptos: Object.freeze([
    "comprender_enunciado",
    "identificar_relacion_matematica",
    "elegir_operacion",
    "planificar_dos_pasos",
    "transferir_estrategia"
  ])
});

export const EJEMPLO_GUIADO = Object.freeze({
  titulo: "Excursión del colegio",
  enunciado:
    "Para una excursión se apuntaron 84 alumnos. Los autobuses tienen 28 plazas cada uno. ¿Cuántos autobuses completos hacen falta para llevar a todos?",
  datos: "84 alumnos y 28 plazas por autobús.",
  pregunta: "Cuántos grupos de 28 necesitamos para incluir a 84 alumnos.",
  relacion: "Estamos repartiendo 84 alumnos en grupos de 28: 84 ÷ 28.",
  comprobacion: "84 ÷ 28 = 3. Tres autobuses tienen 84 plazas, así que la respuesta encaja."
});

const practicaReparto = [
  {
    id: "reparto-libros-01",
    fase: "practica",
    conceptoId: "identificar_relacion_matematica",
    titulo: "La biblioteca",
    enunciado: "Una biblioteca tiene 360 libros y quiere colocarlos por igual en 6 estanterías. ¿Cuántos libros habrá en cada estantería?",
    pregunta: "Antes de calcular, ¿qué está ocurriendo con las cantidades?",
    opciones: [
      { id: "repartir", texto: "Se reparte una cantidad en 6 grupos iguales.", correcta: true },
      { id: "aumentar", texto: "La cantidad aumenta 6 veces.", correcta: false },
      { id: "quitar", texto: "Se quitan 6 libros una sola vez.", correcta: false },
      { id: "juntar", texto: "Se juntan 360 libros con otros 6.", correcta: false }
    ],
    pistas: [
      "Fíjate en las palabras «por igual». ¿La cantidad aumenta o se distribuye?",
      "Cuando una cantidad se distribuye en grupos iguales, pensamos en una división."
    ],
    feedbackCorrecto: "Has identificado que el problema describe un reparto en partes iguales."
  },
  {
    id: "reparto-cromos-02",
    fase: "practica",
    conceptoId: "identificar_relacion_matematica",
    titulo: "Los cromos",
    enunciado: "Hay 144 cromos para repartir de la misma manera entre 8 compañeros. ¿Cuántos recibe cada uno?",
    pregunta: "¿Qué relación describe mejor la historia?",
    opciones: [
      { id: "repartir", texto: "Se distribuyen 144 cromos entre 8 grupos iguales.", correcta: true },
      { id: "repetir", texto: "Se repite 144 ocho veces.", correcta: false },
      { id: "restar", texto: "Se quitan 8 cromos una sola vez.", correcta: false },
      { id: "sumar", texto: "Se añaden 8 cromos a 144.", correcta: false }
    ],
    pistas: [
      "La expresión «de la misma manera entre 8 compañeros» nos habla de igualdad entre grupos.",
      "Pregunta: ¿cuántos recibe cada uno? Necesitamos dividir el total entre el número de compañeros."
    ],
    feedbackCorrecto: "Muy bien: has reconocido un reparto aunque cambiara el contexto."
  },
  {
    id: "reparto-botellas-03",
    fase: "practica",
    conceptoId: "identificar_relacion_matematica",
    titulo: "Las cajas",
    enunciado: "En el almacén hay 96 botellas. Se colocan por igual en 12 cajas. ¿Cuántas botellas van en cada caja?",
    pregunta: "¿Qué pasa con las 96 botellas?",
    opciones: [
      { id: "repartir", texto: "Se organizan en 12 grupos con la misma cantidad.", correcta: true },
      { id: "multiplicar", texto: "Se crean 12 copias de las 96 botellas.", correcta: false },
      { id: "sumar", texto: "Se añaden 12 botellas al total.", correcta: false },
      { id: "restar", texto: "Se retiran exactamente 12 botellas.", correcta: false }
    ],
    pistas: [
      "No busques todavía la operación. Imagina las 12 cajas vacías y reparte las botellas.",
      "Si todas las cajas reciben lo mismo, el total se divide entre el número de cajas."
    ],
    feedbackCorrecto: "Exacto. Primero entendiste la organización de las cantidades; la operación viene después."
  },
  {
    id: "reparto-equipos-04",
    fase: "practica",
    conceptoId: "identificar_relacion_matematica",
    titulo: "Los equipos",
    enunciado: "En una actividad participan 72 alumnos y se forman 9 equipos con el mismo número de alumnos. ¿Cuántos alumnos tendrá cada equipo?",
    pregunta: "¿Qué relación es la importante?",
    opciones: [
      { id: "repartir", texto: "72 alumnos se distribuyen en 9 equipos iguales.", correcta: true },
      { id: "repetir", texto: "Cada uno de los 72 alumnos crea 9 equipos.", correcta: false },
      { id: "sumar", texto: "Se añaden 9 alumnos al grupo.", correcta: false },
      { id: "quitar", texto: "Se eliminan 9 alumnos del total.", correcta: false }
    ],
    pistas: [
      "La frase «con el mismo número de alumnos» es una pista sobre cómo se organizan los grupos.",
      "Tenemos un total y queremos saber cuánto corresponde a cada uno de 9 grupos."
    ],
    feedbackCorrecto: "Bien razonado. Has visto el reparto sin depender de una historia concreta."
  }
];

const practicaAutonomia = [
  {
    id: "grupos-vueltas-01",
    fase: "autonomia",
    conceptoId: "elegir_operacion",
    titulo: "Carrera solidaria",
    enunciado: "Cada vuelta de una carrera mide 250 metros. Marta completa 8 vueltas. ¿Qué distancia recorre en total?",
    pregunta: "¿Qué operación representa mejor la situación?",
    operacionCorrecta: "multiplicar",
    feedbackCorrecto: "Cada vuelta aporta la misma distancia; has reconocido una cantidad que se repite 8 veces."
  },
  {
    id: "grupos-cajas-02",
    fase: "autonomia",
    conceptoId: "elegir_operacion",
    titulo: "Material de laboratorio",
    enunciado: "Cada caja contiene 18 tubos de ensayo. El laboratorio recibe 7 cajas iguales. ¿Cuántos tubos recibe en total?",
    pregunta: "¿Qué operación usarías primero?",
    operacionCorrecta: "multiplicar",
    feedbackCorrecto: "Perfecto: 18 se repite en cada una de las 7 cajas."
  },
  {
    id: "grupos-filas-03",
    fase: "autonomia",
    conceptoId: "elegir_operacion",
    titulo: "El teatro",
    enunciado: "El teatro tiene 16 filas y en cada fila hay 24 asientos. ¿Cuántos asientos hay en total?",
    pregunta: "¿Qué relación matemática ves?",
    operacionCorrecta: "multiplicar",
    feedbackCorrecto: "Has identificado grupos iguales: 24 asientos repetidos en 16 filas."
  },
  {
    id: "grupos-cromos-04",
    fase: "autonomia",
    conceptoId: "elegir_operacion",
    titulo: "Álbum de cromos",
    enunciado: "Una página del álbum guarda 9 cromos. Si completas 12 páginas iguales, ¿cuántos cromos has colocado?",
    pregunta: "¿Qué operación representa la historia?",
    operacionCorrecta: "multiplicar",
    feedbackCorrecto: "Muy bien. Has reconocido una misma cantidad repetida varias veces."
  }
];

const comprobacion = [
  {
    id: "dos-pasos-museo-01",
    fase: "comprobacion",
    conceptoId: "planificar_dos_pasos",
    titulo: "Entradas del museo",
    enunciado: "Un museo vende entradas a 12 €. Una familia compra 5 entradas y paga con 70 €. ¿Cuánto dinero le devuelven?",
    pregunta: "¿Qué plan de dos pasos resuelve el problema?",
    opciones: [
      { id: "plan-correcto", texto: "12 × 5 para saber el coste; después 70 − coste.", correcta: true },
      { id: "plan-a", texto: "70 ÷ 5 y después sumar 12.", correcta: false },
      { id: "plan-b", texto: "70 − 12 y después multiplicar por 5.", correcta: false }
    ],
    pista: "Primero necesitas saber cuánto cuestan todas las entradas juntas. Solo después puedes calcular el cambio.",
    feedbackCorrecto: "Has organizado el problema antes de hacer cuentas: primero coste total, después cambio."
  },
  {
    id: "dos-pasos-cine-02",
    fase: "comprobacion",
    conceptoId: "planificar_dos_pasos",
    titulo: "Tarde de cine",
    enunciado: "Cuatro entradas cuestan 9 € cada una. Pagáis con 50 €. ¿Cuánto cambio recibís?",
    pregunta: "¿Cuál es el plan correcto?",
    opciones: [
      { id: "plan-correcto", texto: "9 × 4 para calcular el coste; después 50 − coste.", correcta: true },
      { id: "plan-a", texto: "50 ÷ 4 y después restar 9.", correcta: false },
      { id: "plan-b", texto: "50 − 9 y multiplicar el resultado por 4.", correcta: false }
    ],
    pista: "La devolución depende de saber primero cuánto cuestan las cuatro entradas.",
    feedbackCorrecto: "Muy bien. Has separado la historia en dos decisiones que dependen una de otra."
  },
  {
    id: "dos-pasos-regalo-03",
    fase: "comprobacion",
    conceptoId: "planificar_dos_pasos",
    titulo: "Regalo de cumpleaños",
    enunciado: "Compras 3 cuadernos de 8 € cada uno y pagas con 30 €. ¿Cuánto dinero te queda?",
    pregunta: "¿Qué plan utilizarías?",
    opciones: [
      { id: "plan-correcto", texto: "8 × 3 para saber el gasto; después 30 − gasto.", correcta: true },
      { id: "plan-a", texto: "30 ÷ 3 y después sumar 8.", correcta: false },
      { id: "plan-b", texto: "30 − 3 y después multiplicar por 8.", correcta: false }
    ],
    pista: "Antes de calcular cuánto queda, necesitas conocer el gasto total.",
    feedbackCorrecto: "Exacto. Has construido el orden lógico de las operaciones."
  },
  {
    id: "dos-pasos-merienda-04",
    fase: "comprobacion",
    conceptoId: "planificar_dos_pasos",
    titulo: "La merienda",
    enunciado: "Compráis 6 zumos de 3 € cada uno y pagáis con 25 €. ¿Cuánto dinero sobra?",
    pregunta: "¿Qué dos pasos tienen sentido?",
    opciones: [
      { id: "plan-correcto", texto: "3 × 6 para saber el coste; después 25 − coste.", correcta: true },
      { id: "plan-a", texto: "25 ÷ 6 y después sumar 3.", correcta: false },
      { id: "plan-b", texto: "25 − 6 y después multiplicar por 3.", correcta: false }
    ],
    pista: "Separa «cuánto cuesta todo» de «cuánto sobra después de pagar».",
    feedbackCorrecto: "Perfecto. Has entendido la dependencia entre los dos pasos."
  }
];

const transferencia = [
  {
    id: "transfer-autobuses-01",
    fase: "transferencia",
    conceptoId: "transferir_estrategia",
    titulo: "Un contexto nuevo",
    enunciado: "En una salida escolar viajan 156 alumnos. En cada autobús caben exactamente 52 alumnos. Si todos los autobuses van completos, ¿cuántos autobuses se necesitan?",
    preguntaOperacion: "Sin buscar una palabra mágica: ¿qué operación usarías?",
    operacionCorrecta: "dividir",
    resultadoCorrecto: 3,
    pista: "Piensa cuántos grupos de 52 caben dentro de 156.",
    feedbackCorrecto: "Has aplicado la estrategia en un problema nuevo: primero entendiste la relación y después calculaste."
  },
  {
    id: "transfer-bandejas-02",
    fase: "transferencia",
    conceptoId: "transferir_estrategia",
    titulo: "Un contexto nuevo",
    enunciado: "La cocina prepara 168 bocadillos y coloca 24 en cada bandeja. ¿Cuántas bandejas completas necesita?",
    preguntaOperacion: "¿Qué operación representa mejor esta organización?",
    operacionCorrecta: "dividir",
    resultadoCorrecto: 7,
    pista: "Buscamos cuántos grupos de 24 podemos formar con 168.",
    feedbackCorrecto: "Muy bien. Cambió la historia, pero reconociste la misma idea matemática."
  },
  {
    id: "transfer-paquetes-03",
    fase: "transferencia",
    conceptoId: "transferir_estrategia",
    titulo: "Un contexto nuevo",
    enunciado: "Una tienda recibió 225 rotuladores y prepara paquetes de 25 rotuladores cada uno. ¿Cuántos paquetes completos puede preparar?",
    preguntaOperacion: "¿Qué estrategia usarías para encontrar el número de paquetes?",
    operacionCorrecta: "dividir",
    resultadoCorrecto: 9,
    pista: "La pregunta es cuántos grupos de 25 se forman a partir de 225.",
    feedbackCorrecto: "Excelente transferencia: identificaste grupos iguales en una situación diferente."
  },
  {
    id: "transfer-equipaje-04",
    fase: "transferencia",
    conceptoId: "transferir_estrategia",
    titulo: "Un contexto nuevo",
    enunciado: "Para un viaje se distribuyen 192 kg de material en 8 contenedores con el mismo peso. ¿Cuántos kilogramos lleva cada contenedor?",
    preguntaOperacion: "¿Qué operación permite encontrar lo que corresponde a cada contenedor?",
    operacionCorrecta: "dividir",
    resultadoCorrecto: 24,
    pista: "Tenemos un total y queremos saber cuánto corresponde a cada uno de 8 grupos iguales.",
    feedbackCorrecto: "Has llevado la estrategia a otra forma de preguntar. Esa es una señal útil de comprensión."
  }
];

export const BANCO_PILOTO = Object.freeze({
  practica: Object.freeze(practicaReparto),
  autonomia: Object.freeze(practicaAutonomia),
  comprobacion: Object.freeze(comprobacion),
  transferencia: Object.freeze(transferencia)
});

export const OPERACIONES = Object.freeze([
  Object.freeze({ id: "sumar", simbolo: "+", nombre: "Sumar" }),
  Object.freeze({ id: "restar", simbolo: "−", nombre: "Restar" }),
  Object.freeze({ id: "multiplicar", simbolo: "×", nombre: "Multiplicar" }),
  Object.freeze({ id: "dividir", simbolo: "÷", nombre: "Dividir" })
]);
