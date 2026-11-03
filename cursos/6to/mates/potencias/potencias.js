import { iniciarTemaVerbal } from "../../../../compartido/js/motor-practica-verbal.js?v=2";
import { POTENCIAS_META, BLOQUES_POTENCIAS, FAMILIAS_POTENCIAS, PRACTICA_POTENCIAS } from "./potencias-data.js";
import { iniciarFichaANS } from "./ficha-ans.js";

const $ = selector => document.querySelector(selector);
$("#mapaPotencias").innerHTML = BLOQUES_POTENCIAS.map(b =>
  `<article class="leccion"><h3>${b.icono} ${b.titulo}</h3><p>${b.descripcion}</p></article>`
).join("");
const fichas = [
  ["En 6⁴, ¿qué número se repite?", "El 6. Es la base."],
  ["En 9², ¿cuántos factores iguales aparecen?", "Dos. El 2 es el exponente."],
  ["¿Qué producto representa 2³?", "2 × 2 × 2 = 8."],
  ["¿Cómo escribes 5 × 5 × 5 × 5?", "5⁴: cinco elevado a cuatro."],
  ["¿Cómo puedes leer 6³?", "Seis al cubo o seis elevado a tres."],
  ["¿Cuánto vale 10⁴?", "10 × 10 × 10 × 10 = 10 000."]
];
$("#fichasPotencias").innerHTML = fichas.map(([pregunta,respuesta]) =>
  `<details class="leccion"><summary>${pregunta}</summary><p>${respuesta}</p></details>`
).join("");
iniciarFichaANS($("#ejerciciosANS"));
await iniciarTemaVerbal({
  meta:POTENCIAS_META, bloques:BLOQUES_POTENCIAS, familias:FAMILIAS_POTENCIAS, practica:PRACTICA_POTENCIAS,
  segmentoPrueba:"prueba-potencias", campoSemantico:"las potencias",
  opcionesCelebracion:{mostrarGuacamayas:false,duracion:1800}
});
document.querySelectorAll("[data-ir]").forEach(b => b.addEventListener("click", () => {
  const tab = $(`[data-pestana="${b.dataset.ir}"]`);
  tab.click();
  tab.focus();
}));
if (location.hash === "#plan-semanal") {
  $('[data-pestana="plan-semanal"]').click();
  const titulo = $("#panel-plan-semanal h2");
  titulo.tabIndex = -1;
  titulo.focus({preventScroll:true});
  $("#panel-plan-semanal").scrollIntoView({behavior:"instant",block:"start"});
}
