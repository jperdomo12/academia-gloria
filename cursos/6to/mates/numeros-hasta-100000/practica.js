import { crearPractica, NIVELES } from "./practica-data.js";
import {
  formato as f,
  cifras,
  POSICIONES,
  vecinos,
  leerEntrada,
  salto,
  primeraDiferencia,
} from "./numeros-modelo.js";
import { tableroHTML, rectaHTML, compararHTML } from "./numeros-visuales.js";
import { detener } from "../../../../compartido/js/lector-texto.js";
export function iniciarPractica() {
  const host = document.querySelector("#practicaNumeros");
  const $ = (s) => host.querySelector(s);
  let nivel = 0,
    lista = crearPractica(0),
    indice = 0,
    seleccion = null,
    numero = 0,
    orden = [],
    pistas = 0,
    resuelto = false;
  const reto = () => lista[indice];
  const iguales = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  function pintarEntrada() {
    const r = reto(),
      d = r.datos;
    let html = "";
    if (r.tipo === "construir")
      html = `<div id="practicaTablero">${tableroHTML(numero, { editable: true, prefijo: "practica-cifra", resaltar: pistas >= 2 ? primeraDiferencia(numero, reto().respuesta) : -1 })}</div><p id="practicaNumero" class="numero-grande">${f(numero)}</p>`;
    if (r.tipo === "numero") {
      if (d.columna !== undefined)
        html = tableroHTML(d.n, { resaltar: pistas >= 2 ? d.columna : -1 });
      if (d.inicio !== undefined)
        html = `<div class="trayecto"><span>${f(d.inicio)}</span><b>${d.paso > 0 ? "+" : "−"}${f(Math.abs(d.paso))}</b><span>¿…?</span></div>`;
      html +=
        '<label class="respuesta-numero">Tu número<input id="respuestaNumero" inputmode="numeric" maxlength="7" autocomplete="off"></label>';
    }
    if (["comparar", "posicion"].includes(r.tipo)) {
      html = compararHTML(d.a, d.b);
      html += `<div class="opciones-respuesta" aria-label="Tu respuesta">${(r.tipo === "comparar" ? ["<", "=", ">"] : POSICIONES.map((p) => p.id)).map((v) => `<button type="button" data-respuesta="${v}" aria-pressed="false">${v === "<" ? "A es menor que B" : v === ">" ? "A es mayor que B" : v === "=" ? "Son iguales" : v}</button>`).join("")}</div>`;
    }
    if (["ordenar", "intruso"].includes(r.tipo))
      html = `<div class="opciones-respuesta" aria-label="Números del reto">${d.numeros.map((v) => `<button type="button" data-respuesta="${v}" aria-pressed="false">${f(v)}</button>`).join("")}</div>${r.tipo === "ordenar" ? '<div id="ordenElegido" class="orden-elegido" aria-live="polite">Tu camino aparecerá aquí.</div><button type="button" class="btn" id="borrarOrden">↩ Volver a elegir</button>' : ""}`;
    if (r.tipo === "localizar")
      html = `<div id="rectaPractica">${rectaHTML({ min: d.min, max: d.max, puntos: [d.min] })}</div><label class="respuesta-numero">Mueve A sobre la recta<input id="posicionRecta" type="range" min="${d.min}" max="${d.max}" step="10" value="${d.min}"></label><p id="valorRecta" aria-live="polite">A · ${f(d.min)}</p>`;
    if (r.tipo === "salto")
      html = `<div class="trayecto"><span>${f(d.inicio)}</span><span>¿Qué salto?</span><span>${f(d.meta)}</span></div><div class="opciones-respuesta" aria-label="Elige un salto">${[100, -100, 1000, -1000].map((v) => `<button type="button" data-respuesta="${v}" aria-pressed="false">${v > 0 ? "+" : "−"}${f(Math.abs(v))}</button>`).join("")}</div>`;
    if (r.tipo === "redondear") {
      const v = vecinos(d.n, d.unidad);
      html = `<p class="numero-grande">${f(d.n)}</p>${rectaHTML({ min: v.inferior, max: v.superior, puntos: [d.n], medio: pistas >= 2 ? v.medio : null })}<div class="opciones-respuesta" aria-label="Elige el vecino más cercano">${[v.inferior, v.superior].map((n) => `<button type="button" data-respuesta="${n}" aria-pressed="false">🧲 ${f(n)}</button>`).join("")}</div>`;
    }
    $("#entradaPractica").innerHTML = html;
    if (r.tipo === "construir") actualizarTablero();
  }
  function actualizarTablero() {
    $("#practicaNumero").textContent = f(numero);
    $("#practicaTablero")
      .querySelectorAll("[data-digito]")
      .forEach(
        (btn) =>
          (btn.disabled =
            salto(
              numero,
              Number(btn.dataset.cambio) *
                POSICIONES[btn.dataset.digito].unidad,
            ) === null),
      );
  }
  function pintar() {
    detener();
    seleccion = null;
    numero = 0;
    orden = [];
    pistas = 0;
    resuelto = false;
    host.innerHTML = `<div class="progreso-practica"><b>${NIVELES[nivel]}</b><span>Reto ${indice + 1} de ${lista.length}</span></div><h3 id="preguntaPractica" tabindex="-1">${reto().pregunta}</h3><button class="btn" type="button" data-escuchar-contenedor="#preguntaPractica">🔊 Escuchar reto</button><div id="entradaPractica"></div><div class="acciones-practica"><button type="button" class="btn" id="ayudaPractica">💡 Una pista</button><button type="button" class="btn principal" id="comprobarPractica">Comprobar</button><button type="button" class="btn principal" id="siguientePractica" hidden>Siguiente reto →</button></div><div id="pistaNumero" class="ayuda-local" hidden></div><div id="mensajeNumero" class="mensaje-local" role="status">Prueba tu idea. Si no sale, puedes volver a intentarlo.</div><div id="solucionNumero" class="solucion-paso" hidden></div>`;
    pintarEntrada();
    $("#comprobarPractica").addEventListener("click", comprobar);
    $("#ayudaPractica").addEventListener("click", () => {
      if (pistas < 3) {
        $("#pistaNumero").hidden = false;
        $("#pistaNumero").textContent = reto().pistas[pistas];
        pistas++;
        if (pistas === 3)
          $("#ayudaPractica").textContent = "Ver solución explicada";
        if (pistas === 2 && reto().tipo === "construir") {
          pintarEntrada();
          const col = primeraDiferencia(numero, reto().respuesta);
          if (col >= 0)
            $("#pistaNumero").textContent =
              "Fíjate ahora en la columna de " + POSICIONES[col].nombre + ".";
        }
        if (
          pistas === 2 &&
          reto().tipo === "numero" &&
          reto().datos.columna !== undefined
        ) {
          const n = $("#respuestaNumero").value;
          pintarEntrada();
          $("#respuestaNumero").value = n;
        }
        if (pistas === 2 && reto().tipo === "redondear") {
          $("#entradaPractica .recta").outerHTML = rectaHTML({
            min: vecinos(reto().datos.n, reto().datos.unidad).inferior,
            max: vecinos(reto().datos.n, reto().datos.unidad).superior,
            puntos: [reto().datos.n],
            medio: vecinos(reto().datos.n, reto().datos.unidad).medio,
          });
        }
      } else {
        const r = reto();
        $("#solucionNumero").hidden = false;
        $("#solucionNumero").textContent =
          `Una solución es ${Array.isArray(r.respuesta) ? r.respuesta.map(f).join(" → ") : typeof r.respuesta === "number" ? f(r.respuesta) : r.respuesta}. ${r.explicacion} Vuelve al reto y compruébalo tú.`;
      }
    });
    $("#siguientePractica").addEventListener("click", () => {
      if (indice < lista.length - 1) {
        indice++;
        pintar();
        $("#preguntaPractica").focus({ preventScroll: true });
      } else terminar();
    });
  }
  host.addEventListener("click", (e) => {
    const boton = e.target.closest(
      "[data-respuesta],[data-digito],#borrarOrden",
    );
    if (!boton || resuelto) return;
    const r = reto();
    if (boton.id === "borrarOrden") {
      orden = [];
      host.querySelectorAll("[data-respuesta]").forEach((b) => {
        b.disabled = false;
        b.setAttribute("aria-pressed", "false");
      });
      $("#ordenElegido").textContent = "Tu camino aparecerá aquí.";
      return;
    }
    if (boton.matches("[data-digito]")) {
      const nuevo = salto(
        numero,
        Number(boton.dataset.cambio) * POSICIONES[boton.dataset.digito].unidad,
      );
      if (nuevo === null) return;
      numero = nuevo;
      const anterior = boton.dataset.digito,
        cambio = boton.dataset.cambio;
      $("#practicaTablero").innerHTML = tableroHTML(numero, {
        editable: true,
        prefijo: "practica-cifra",
        resaltar:
          pistas >= 2 ? primeraDiferencia(numero, reto().respuesta) : -1,
      });
      actualizarTablero();
      const foco = $(`[data-digito="${anterior}"][data-cambio="${cambio}"]`);
      if (foco && !foco.disabled) foco.focus({ preventScroll: true });
      return;
    }
    if (r.tipo === "ordenar") {
      orden.push(Number(boton.dataset.respuesta));
      boton.disabled = true;
      boton.setAttribute("aria-pressed", "true");
      $("#ordenElegido").textContent = orden.map(f).join(" → ");
    } else {
      seleccion = ["comparar", "posicion"].includes(r.tipo)
        ? boton.dataset.respuesta
        : Number(boton.dataset.respuesta);
      host
        .querySelectorAll("[data-respuesta]")
        .forEach((b) => b.setAttribute("aria-pressed", String(b === boton)));
    }
  });
  host.addEventListener("input", (e) => {
    if (e.target.id === "posicionRecta") {
      seleccion = Number(e.target.value);
      $("#valorRecta").textContent = "A · " + f(seleccion);
      $("#rectaPractica").innerHTML = rectaHTML({
        min: reto().datos.min,
        max: reto().datos.max,
        puntos: [seleccion],
      });
    }
  });
  host.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.id === "respuestaNumero") {
      e.preventDefault();
      comprobar();
    }
  });
  function comprobar() {
    if (resuelto) return;
    const r = reto();
    let valor = seleccion;
    if (r.tipo === "construir") valor = numero;
    if (r.tipo === "numero") valor = leerEntrada($("#respuestaNumero").value);
    if (r.tipo === "ordenar") valor = orden;
    if (
      valor === null ||
      (Array.isArray(valor) && valor.length < r.respuesta.length)
    ) {
      $("#mensajeNumero").textContent =
        "Completa tu respuesta antes de comprobarla.";
      return;
    }
    const correcto =
      r.tipo === "localizar"
        ? Math.abs(valor - r.respuesta) <= 80
        : iguales(valor, r.respuesta);
    if (correcto) {
      resuelto = true;
      $("#mensajeNumero").textContent =
        `${r.bloque === "series" ? "🚀 Salto perfecto." : r.bloque === "redondeo" ? "🧲 Encontraste el vecino más cercano." : "✨ ¡Lo descubriste!"} ${r.explicacion}`;
      $("#mensajeNumero").classList.add("resuelto");
      $("#comprobarPractica").hidden = true;
      $("#siguientePractica").hidden = false;
      $("#siguientePractica").textContent =
        indice === lista.length - 1
          ? "Terminar esta ronda →"
          : "Siguiente reto →";
      $("#ayudaPractica").hidden = true;
      host
        .querySelectorAll("#entradaPractica button,#entradaPractica input")
        .forEach((e) => (e.disabled = true));
    } else {
      $("#mensajeNumero").textContent =
        "🌱 Puedes volver a probar. " + r.pistas[Math.min(pistas, 1)];
      if (r.tipo === "ordenar")
        $("#mensajeNumero").textContent +=
          " Pulsa Volver a elegir para reconstruir el camino.";
    }
  }
  function terminar() {
    detener();
    host.innerHTML = `<div class="test-end"><h3>🌿 Recorriste las cuatro ideas</h3><p>Construiste, comparaste, saltaste y aproximaste. Puedes repetir, elegir otra ronda o ir a la Prueba cuando quieras.</p><button class="btn" id="repetirRonda" type="button">Otra vez, a mi ritmo</button><button class="btn principal" data-ir="prueba" type="button">Ir a la Prueba →</button></div>`;
    $("#repetirRonda").addEventListener("click", () => {
      indice = 0;
      pintar();
    });
  }
  document.querySelectorAll("[data-nivel]").forEach((b) =>
    b.addEventListener("click", () => {
      nivel = Number(b.dataset.nivel);
      lista = crearPractica(nivel);
      indice = 0;
      document
        .querySelectorAll("[data-nivel]")
        .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      pintar();
    }),
  );
  pintar();
}
