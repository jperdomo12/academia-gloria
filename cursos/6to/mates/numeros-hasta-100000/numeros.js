import { iniciarTemaVerbal } from "../../../../compartido/js/motor-practica-verbal.js?v=2";
import {
  NUMEROS_META,
  BLOQUES_RESULTADO,
  FICHAS_NUMEROS,
  FAMILIAS_PRUEBA_NUMEROS,
} from "./numeros-data.js";
import { iniciarExploradores } from "./exploradores.js";
import { iniciarPractica } from "./practica.js";

// Solo la Prueba persiste mediante el contrato académico vigente. La práctica propia es efímera.
await iniciarTemaVerbal({
  meta: NUMEROS_META,
  bloques: BLOQUES_RESULTADO,
  familias: FAMILIAS_PRUEBA_NUMEROS,
  segmentoPrueba: "prueba-numeros-hasta-100000",
  opcionesCelebracion: { mostrarGuacamayas: false, duracion: 1800 },
  campoSemantico: "los números hasta cien mil",
});
iniciarExploradores();
iniciarPractica();
const fichas = document.querySelector("#fichasNumeros");
FICHAS_NUMEROS.forEach((f) => {
  const boton = document.createElement("button");
  boton.className = "ficha-numero";
  boton.type = "button";
  boton.setAttribute("aria-pressed", "false");
  const icono = document.createElement("span");
  icono.className = "icono-ficha";
  icono.textContent = f.icono;
  icono.setAttribute("aria-hidden", "true");
  const titulo = document.createElement("b");
  titulo.textContent = f.pregunta;
  const texto = document.createElement("span");
  texto.textContent = f.respuesta;
  texto.hidden = true;
  const pista = document.createElement("small");
  pista.textContent = "Piensa primero · toca para comprobar";
  boton.append(icono, titulo, texto, pista);
  boton.addEventListener("click", () => {
    texto.hidden = !texto.hidden;
    boton.setAttribute("aria-pressed", String(!texto.hidden));
    pista.textContent = texto.hidden
      ? "Piensa primero · toca para comprobar"
      : "Toca para cerrar la respuesta";
  });
  fichas.append(boton);
});
document.addEventListener("click", (e) => {
  const ir = e.target.closest("[data-ir]");
  if (ir) document.querySelector(`[data-pestana="${ir.dataset.ir}"]`)?.click();
});
const tabs = [...document.querySelectorAll("[data-pestana]")];
tabs.forEach((b) => {
  b.setAttribute("aria-pressed", String(b.classList.contains("activa")));
  b.addEventListener("click", () => {
    document.body.classList.toggle(
      "numeros-en-trabajo",
      b.dataset.pestana !== "mapa",
    );
    tabs.forEach((t) =>
      t.setAttribute("aria-pressed", String(t.classList.contains("activa"))),
    );
  });
});
