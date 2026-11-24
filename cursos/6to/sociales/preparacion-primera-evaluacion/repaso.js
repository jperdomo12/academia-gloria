import { iniciarTemaVerbal } from "../../../../compartido/js/motor-practica-verbal.js";
import { BLOQUES_REPASO, PREGUNTAS_REPASO } from "./repaso-data.js";

// Mismo recorrido de práctica de los Temas. Sin Prueba, actividad académica ni guardado.
await iniciarTemaVerbal({
  meta:{}, bloques:BLOQUES_REPASO, practica:PREGUNTAS_REPASO, familias:[],
  campoSemantico:"Sociales", soloPractica:true
});
document.querySelectorAll("[data-iniciar-repaso]").forEach(boton=>boton.disabled=false);
