import { MATERIALES_PLAN, etiquetaSemana } from "./materiales.js";
import { LectorTexto } from "../../../compartido/js/lector-texto.js";

function nodo(tipo, texto, clase) {
  const e = document.createElement(tipo);
  if (texto) e.textContent = texto;
  if (clase) e.className = clase;
  return e;
}

export function mostrarDocumento(materialId, documento) {
  const material = MATERIALES_PLAN.find(m => m.id === materialId);
  if (!material) throw new Error("Material del Plan Semanal no registrado.");
  document.querySelector("#tituloDocumento").textContent = material.titulo;
  document.querySelector("#semanaDocumento").textContent = etiquetaSemana(material);
  const contenedor = document.querySelector("#documentoPlan");
  const lectura = nodo("section", "", "curso6-superficie plan-bloque");
  lectura.id = "lecturaPlan";
  lectura.append(nodo("h2", `📖 ${material.titulo}`));
  const acciones = nodo("div", "", "plan-acciones");
  const escuchar = nodo("button", "🔊 Escuchar", "boton-academia");
  escuchar.type = "button";
  const parar = nodo("button", "⏹ Detener", "boton-academia");
  parar.type = "button";
  const estado = nodo("p", "", "plan-estado");
  estado.setAttribute("role", "status");
  acciones.append(escuchar, parar);
  lectura.append(acciones, estado);
  documento.lectura.forEach(parrafo => lectura.append(nodo("p", parrafo, "plan-lectura-parrafo")));
  contenedor.replaceChildren(lectura);

  escuchar.disabled = !LectorTexto.disponible();
  if (escuchar.disabled) estado.textContent = "Este navegador no dispone de lectura en voz alta. Puedes leer el texto aquí.";
  const reiniciarVoz = () => { escuchar.disabled = !LectorTexto.disponible(); };
  escuchar.addEventListener("click", () => {
    estado.textContent = "Escuchando la lectura…";
    // Escucha exclusivamente la lectura, nunca las soluciones ocultas.
    const iniciada = LectorTexto.escuchar([material.titulo, ...documento.lectura].join(". "), {
      idioma: "es-ES", velocidad: 0.84,
      alFinalizar: () => { estado.textContent = "Lectura terminada."; reiniciarVoz(); },
      alError: () => { estado.textContent = "No se pudo continuar la voz. Puedes volver a escuchar o leer el texto."; reiniciarVoz(); }
    });
    escuchar.disabled = iniciada;
    if (!iniciada) estado.textContent = "No se pudo iniciar la voz en este navegador. Puedes leer el texto aquí.";
  });
  parar.addEventListener("click", () => {
    LectorTexto.detener(); reiniciarVoz(); estado.textContent = "Lectura detenida. Puedes volver a escucharla.";
  });
  window.addEventListener("pagehide", () => LectorTexto.detener());

  for (const bloque of documento.bloques) {
    const seccion = nodo("details", "", "curso6-superficie plan-bloque");
    seccion.id = `bloque-${bloque.id}`;
    const resumen = nodo("summary", bloque.titulo);
    seccion.append(resumen, nodo("p", bloque.instruccion));
    const lista = nodo("ol");
    for (const item of bloque.items) {
      const linea = nodo("li", item.enunciado);
      if (item.opciones) {
        const opciones = nodo("ul");
        item.opciones.forEach((opcion, i) => opciones.append(nodo("li", `${"ABC"[i]}) ${opcion}`)));
        linea.append(opciones);
      }
      lista.append(linea);
    }
    seccion.append(lista);
    const comprobacion = nodo("div", "", "plan-comprobar");
    const etiqueta = nodo("label", "", "plan-intento");
    const intento = nodo("input");
    intento.type = "checkbox";
    etiqueta.append(intento, nodo("span", "Ya he intentado este bloque en mi cuaderno."));
    const accionesBloque = nodo("div", "", "plan-acciones");
    const comprobar = nodo("button", "👀 Comprobar cuando termine", "boton-academia");
    comprobar.type = "button";
    comprobar.disabled = true;
    comprobar.setAttribute("aria-expanded", "false");
    const soluciones = nodo("section", "", "plan-soluciones");
    soluciones.id = `soluciones-${bloque.id}`;
    soluciones.hidden = true;
    soluciones.tabIndex = -1;
    comprobar.setAttribute("aria-controls", soluciones.id);
    soluciones.append(nodo("h3", "Compara con tu cuaderno"));
    const respuestas = nodo("ol");
    bloque.items.forEach(item => {
      const linea = nodo("li");
      linea.append(nodo("strong", item.respuesta));
      if (bloque.id === "conectar") linea.prepend(document.createTextNode(`${item.enunciado} → `));
      if (item.explicacion) linea.append(nodo("p", item.explicacion));
      respuestas.append(linea);
    });
    soluciones.append(respuestas, nodo("p", "Si algo es diferente, vuelve a la lectura y corrígelo con calma en tu cuaderno."));
    intento.addEventListener("change", () => {
      comprobar.disabled = !intento.checked;
      if (!intento.checked) {
        soluciones.hidden = true;
        comprobar.setAttribute("aria-expanded", "false");
        comprobar.textContent = "👀 Comprobar cuando termine";
      }
    });
    comprobar.addEventListener("click", () => {
      if (!intento.checked) return;
      soluciones.hidden = !soluciones.hidden;
      comprobar.setAttribute("aria-expanded", String(!soluciones.hidden));
      comprobar.textContent = soluciones.hidden ? "👀 Comprobar cuando termine" : "Ocultar respuestas";
      if (!soluciones.hidden) soluciones.focus({ preventScroll: true });
    });
    accionesBloque.append(comprobar);
    comprobacion.append(etiqueta, accionesBloque, soluciones);
    seccion.append(comprobacion);
    contenedor.append(seccion);
  }
  // Los atajos abren el bloque de destino; no hay un estado guardado ni respuestas digitales.
  function abrirDestino() {
    const id = location.hash.slice(1);
    const destino = document.getElementById(id);
    if (destino?.tagName === "DETAILS") destino.open = true;
  }
  document.querySelectorAll(".plan-atajos a").forEach(a => a.addEventListener("click", () => {
    const destino = document.querySelector(a.getAttribute("href"));
    if (destino?.tagName === "DETAILS") destino.open = true;
  }));
  window.addEventListener("hashchange", abrirDestino);
  abrirDestino();
}
