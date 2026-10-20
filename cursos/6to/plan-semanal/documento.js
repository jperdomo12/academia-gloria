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
    const seccion = nodo("section", "", "curso6-superficie plan-bloque");
    seccion.id = `bloque-${bloque.id}`;
    seccion.hidden = true;
    seccion.append(nodo("h2", bloque.titulo), nodo("p", bloque.instruccion));
    if (bloque.tipo === "verdadero-falso") seccion.append(nodo("p",
      "Academia comprueba tu elección de Verdadero/Falso. Tu corrección escrita la compararás con una propuesta; no se califica automáticamente.", "plan-procedencia"));
    const formulario = nodo("form");
    formulario.noValidate = true;
    formulario.autocomplete = "off";
    const preguntas = [];
    const resultado = nodo("p", "", "plan-resultado");
    resultado.setAttribute("role", "status");
    resultado.hidden = true;
    const reiniciar = nodo("button", "Volver a intentarlo", "boton-academia");
    reiniciar.type = "button";
    reiniciar.hidden = true;
    bloque.items.forEach((item, indice) => {
      const opciones = item.opciones || bloque.opciones;
      const grupo = nodo("fieldset", "", "campo-academia plan-pregunta");
      grupo.dataset.pregunta = String(indice);
      grupo.append(nodo("legend", `${indice + 1}. ${item.enunciado}`));
      const nombre = `${bloque.id}-${indice}`;
      let controles;
      if (bloque.tipo === "relacionar") {
        const etiqueta = nodo("label", "Elige el sistema");
        const selector = nodo("select");
        selector.id = nombre;
        etiqueta.htmlFor = nombre;
        selector.required = true;
        selector.append(new Option("Elige…", ""));
        opciones.forEach((opcion, i) => selector.append(new Option(opcion, String(i))));
        grupo.append(etiqueta, selector);
        controles = [selector];
      } else {
        const lista = nodo("div", "", "plan-opciones");
        controles = opciones.map((opcion, i) => {
          const etiqueta = nodo("label", "", "plan-opcion");
          const entrada = nodo("input");
          entrada.type = "radio";
          entrada.name = nombre;
          entrada.value = String(i);
          entrada.required = true;
          etiqueta.append(entrada, nodo("span", `${bloque.tipo === "opcion-multiple" ? "ABC"[i] + ") " : ""}${opcion}`));
          lista.append(etiqueta);
          return entrada;
        });
        grupo.append(lista);
      }
      const eleccion = () => controles[0].tagName === "SELECT"
        ? controles[0].value : (controles.find(c => c.checked)?.value ?? "");
      let correccion = null;
      let zonaCorreccion = null;
      if (bloque.tipo === "verdadero-falso") {
        zonaCorreccion = nodo("div", "", "plan-correccion");
        zonaCorreccion.hidden = true;
        const etiqueta = nodo("label", "Mi propuesta para corregir la frase");
        correccion = nodo("textarea");
        correccion.id = `${nombre}-correccion`;
        correccion.rows = 3;
        etiqueta.htmlFor = correccion.id;
        zonaCorreccion.append(etiqueta, correccion);
        grupo.append(zonaCorreccion);
      }
      const respuesta = nodo("div", "", "plan-respuesta");
      respuesta.id = `${nombre}-respuesta`;
      respuesta.hidden = true;
      controles.forEach(c => c.setAttribute("aria-describedby", respuesta.id));
      if (correccion) correccion.setAttribute("aria-describedby", respuesta.id);
      function editar() {
        respuesta.hidden = true;
        resultado.hidden = true;
        reiniciar.hidden = true;
        if (zonaCorreccion) {
          zonaCorreccion.hidden = eleccion() !== "1";
          correccion.disabled = zonaCorreccion.hidden;
        }
      }
      controles.forEach(c => c.addEventListener("change", editar));
      correccion?.addEventListener("input", editar);
      if (correccion) correccion.disabled = true;
      grupo.append(respuesta);
      formulario.append(grupo);
      preguntas.push({ item, opciones, eleccion, controles, correccion, zonaCorreccion, respuesta });
    });
    const comprobar = nodo("button", "👀 Comprobar mis respuestas", "boton-academia");
    comprobar.type = "submit";
    const accionesBloque = nodo("div", "", "plan-acciones plan-comprobar");
    accionesBloque.append(comprobar, reiniciar);
    formulario.append(resultado, accionesBloque);
    formulario.addEventListener("submit", evento => {
      evento.preventDefault();
      const pendientes = preguntas.filter(p => p.eleccion() === "");
      const sinCorreccion = preguntas.filter(p => p.correccion && p.eleccion() === "1" && !p.correccion.value.trim());
      resultado.hidden = false;
      if (pendientes.length || sinCorreccion.length) {
        resultado.className = "plan-resultado plan-resultado--revisar";
        resultado.textContent = pendientes.length
          ? `Quedan ${pendientes.length} respuestas por elegir. Completa el bloque antes de comprobar.`
          : "Escribe una propuesta para las frases que has marcado como falsas antes de comprobar.";
        const primera = pendientes[0] || sinCorreccion[0];
        (pendientes.length ? primera.controles[0] : primera.correccion).focus();
        return;
      }
      let correctas = 0;
      for (const p of preguntas) {
        const correcta = Number(p.eleccion()) === p.item.respuestaCorrecta;
        if (correcta) correctas++;
        p.respuesta.className = `plan-respuesta ${correcta ? "plan-respuesta--bien" : "plan-respuesta--revisar"}`;
        p.respuesta.replaceChildren(nodo("strong", correcta ? "✓ Elección correcta." : "↻ Revisa esta elección."));
        p.respuesta.append(nodo("p", `Respuesta: ${p.opciones[p.item.respuestaCorrecta]}.`));
        if (p.item.explicacion) p.respuesta.append(nodo("p", p.item.explicacion));
        if (p.correccion && p.eleccion() === "1") p.respuesta.append(nodo("p",
          "Compara tu corrección escrita con la explicación. Puedes mejorarla con tus propias palabras."));
        p.respuesta.hidden = false;
      }
      resultado.className = "plan-resultado";
      resultado.textContent = `${correctas} de ${preguntas.length} elecciones correctas. ${correctas === preguntas.length ? "¡Buen trabajo!" : "Revisa las explicaciones con calma y vuelve a intentarlo."} Las respuestas no se guardan.`;
      reiniciar.hidden = false;
    });
    reiniciar.addEventListener("click", () => {
      formulario.reset();
      preguntas.forEach(p => {
        p.respuesta.hidden = true;
        if (p.zonaCorreccion) { p.zonaCorreccion.hidden = true; p.correccion.disabled = true; }
      });
      resultado.hidden = true;
      reiniciar.hidden = true;
      preguntas[0]?.controles[0].focus();
    });
    seccion.append(formulario);
    contenedor.append(seccion);
  }
  // Una sola sección visible; cambiar de carpeta conserva sus respuestas en memoria.
  const paneles = [...contenedor.children];
  const botones = [...document.querySelectorAll(".plan-atajos [data-panel-plan]")];
  function mostrarPanel(id) {
    const elegido = paneles.find(panel => panel.id === id) || lectura;
    paneles.forEach(panel => { panel.hidden = panel !== elegido; });
    botones.forEach(boton => {
      const activo = boton.dataset.panelPlan === elegido.id;
      boton.classList.toggle("activa", activo);
      boton.setAttribute("aria-pressed", String(activo));
    });
    if (elegido !== lectura) { LectorTexto.detener(); reiniciarVoz(); estado.textContent = ""; }
  }
  botones.forEach(boton => boton.addEventListener("click", () => {
    mostrarPanel(boton.dataset.panelPlan);
    const destino = new URL(location.href);
    destino.hash = boton.dataset.panelPlan;
    history.replaceState(history.state, "", destino);
  }));
  window.addEventListener("hashchange", () => mostrarPanel(location.hash.slice(1)));
  mostrarPanel(location.hash.slice(1));
}
