import { iniciarTemaVerbal } from "../../../../compartido/js/motor-practica-verbal.js";
import { BLOQUES_REPASO, PREGUNTAS_REPASO, META_REPASO } from "./repaso-data.js";

// Mismo motor: registro formativo optativo por configuración, sin Prueba adicional.
await iniciarTemaVerbal({
  meta:META_REPASO, bloques:BLOQUES_REPASO, practica:PREGUNTAS_REPASO, familias:[],
  campoSemantico:"Sociales", soloPractica:true, registroFormativo:true
});
document.querySelectorAll("[data-iniciar-repaso]").forEach(boton=>boton.disabled=false);
