export const POTENCIAS_META = Object.freeze({
  actividadId: "6-mates-potencias", tituloActividad: "Potencias", version: "1.0",
  cursoReferencia: "6.º de Primaria", materia: "Matemáticas", tema: "Potencias",
  cierreFirmes: "hoy conectaste potencias, multiplicaciones y sus valores."
});

export const BLOQUES_POTENCIAS = Object.freeze([
  {id:"partes", icono:"🔍", titulo:"Descubro una potencia", descripcion:"Identificar la base y el exponente y explicar qué indica cada parte."},
  {id:"formas", icono:"🔁", titulo:"Cambio de forma", descripcion:"Pasar de potencia a multiplicación repetida y al revés."},
  {id:"conexiones", icono:"🧩", titulo:"Conecto representaciones", descripcion:"Leer potencias, reconocer expresiones válidas y relacionar equivalencias."},
  {id:"diez", icono:"🚀", titulo:"Potencias de 10", descripcion:"Interpretar y calcular multiplicaciones por potencias de diez."}
]);

export const potencia = (base, exponente) => base + String(exponente).replace(/\d/g, d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]);
export const producto = (base, exponente) => Array(exponente).fill(base).join(" × ");
export const formato = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const parejas = [[3,4],[4,3],[8,2],[6,4],[2,5]];
const grupos = [
  ["base","partes","¿Cuál es la base?", (b,e) => [b,e,b+e], "La base es el factor que se repite."],
  ["exponente","partes","¿Cuál es el exponente?", (b,e) => [e,b,b+e], "El exponente cuenta cuántos factores iguales aparecen."],
  ["significado","partes","¿Qué indica el exponente?", (b,e) => [`Que el ${b} aparece ${e} veces como factor`,`Que hay que multiplicar ${b} por ${e}`,`Que hay que sumar ${b} y ${e}`], "Cuenta los factores iguales, no los signos de multiplicación."],
  ["expandir","formas","¿Qué multiplicación representa?", (b,e) => [producto(b,e),producto(b,e-1),producto(e,b)], "Repite la base tantas veces como indica el exponente."],
  ["escribir","formas","¿Cómo se escribe como potencia?", (b,e) => [potencia(b,e),potencia(e,b),potencia(b,e-1)], "El número que se repite es la base; la cantidad de factores es el exponente."],
  ["lectura","conexiones","¿Cómo se lee?", (b,e) => [`${b} elevado a ${e}`,`${e} elevado a ${b}`,`${b} elevado a ${e+1}`], "Lee primero la base y luego el exponente."],
  ["reconocer","conexiones","¿Cuál es una multiplicación del mismo factor?", b => [producto(b,3),`${b} + ${b} + ${b}`,`${b} × ${b+1} × ${b}`], "Una suma o un producto de factores distintos no es esta representación."],
  ["equivalencia","conexiones","¿Qué número tiene el mismo valor?", (b,e) => [formato(b**e),formato(b*e),formato(b**(e-1))], "Multiplica los factores, uno a uno; no multipliques la base por el exponente."],
  ["diez","diez","¿Cuál es el resultado?", (b,e) => [formato(b*10**e),formato(b*10**(e-1)),formato(b*10**(e+1))], "Primero calcula la potencia de 10 y luego multiplícala por el número de delante."]
];

function reto(grupo, [b,e], sufijo) {
  const [conceptoId,bloqueId,pregunta,opciones,explicacion] = grupo;
  const enunciado = conceptoId === "escribir" ? producto(b,e)
    : conceptoId === "diez" ? `${b} × ${potencia(10,e)}`
    : conceptoId === "reconocer" ? "Observa las tres expresiones." : potencia(b,e);
  return {
    id:`potencias-${conceptoId}-${sufijo}`, bloqueId, conceptoId, tipoEvidencia:"seleccion_simple",
    titulo:BLOQUES_POTENCIAS.find(b => b.id === bloqueId).titulo, enunciado, pregunta,
    opciones:opciones(b,e).map((texto,i) => ({id:String(i),texto:String(texto)})),
    respuestaCorrecta:"0", explicacion, pista:explicacion,
    textoLectura:`${pregunta} ${conceptoId === "reconocer" ? enunciado : conceptoId === "escribir" ? Array(e).fill(b).join(" por ") : conceptoId === "diez" ? `${b} por diez elevado a ${e}` : `${b} elevado a ${e}`}`
  };
}

export const FAMILIAS_POTENCIAS = grupos.map(grupo => ({
  id:grupo[0], variantes:parejas.slice(0,4).map((par,i) => reto(grupo,par,i+1))
}));
export const PRACTICA_POTENCIAS = grupos.map(grupo => reto(grupo,parejas[4],"practica"));

export const FICHA_ANS = Object.freeze({
  expandir:[[2,4],[5,2],[7,0],[3,5],[6,3],[10,8]],
  convertir:[[8,6],[6,2],[4,8],[5,3]],
  reconocer:[
    ["5 + 5",null],["12 × 12 × 12",[12,3]],["8 - 8 - 8 - 8",null],
    ["3 × 3",[3,2]],["9 × 9 × 9 × 9",[9,4]],["10 + 10 + 10",null]
  ],
  equivalencias:{
    origen:["5⁴","4 × 5","4⁵"],
    destinos:["5 + 5 + 5 + 5","4 × 4 × 4 × 4 × 4","5 × 5 × 5 × 5","4 + 4 + 4 + 4 + 4"],
    soluciones:[[2],[0,3],[1]]
  },
  tabla:[[2,4,"potencia"],[7,9,"lectura"],[6,4,"producto"],[5,3,"lectura"],[10,2,"producto"]],
  diez:[[4,3],[12,2],[45,5],[1,10],[5,4],[2,9]]
});
