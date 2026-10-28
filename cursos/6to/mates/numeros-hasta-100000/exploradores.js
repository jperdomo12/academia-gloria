import {
  POSICIONES,
  formato as f,
  cifras,
  descomponer,
  primeraDiferencia,
  vecinos,
  leerNumero,
  leerEntrada,
  salto,
} from "./numeros-modelo.js";
import { tableroHTML, rectaHTML, compararHTML } from "./numeros-visuales.js";
import { detener } from "../../../../compartido/js/lector-texto.js";
const $ = (s) => document.querySelector(s);
const nombres = { 10: "DECENA", 100: "CENTENA", 1000: "MILLAR" };
export function iniciarExploradores() {
  const host = $("#experienciaActiva");
  let actual = "construyo",
    numero = 59725,
    a = 63398,
    b = 62431,
    indice = -1,
    origen = 97000,
    historia = [97000],
    pendiente = null,
    redondo = 2508,
    unidad = 1000,
    ayuda = 0,
    aproximado = false;
  function inicio(titulo, idea, instruccion) {
    return `<article class="experiencia"><h3 id="experienciaTitulo" tabindex="-1">${titulo}</h3><p class="idea" id="ideaVoz">${idea}</p><button class="btn" type="button" data-escuchar-contenedor="#ideaVoz">🔊 Escuchar idea</button><p class="instruccion">${instruccion}</p>`;
  }
  function mensaje(texto) {
    $("#mensajeExplorador").textContent = texto;
  }
  function dato(valor) {
    const n = leerEntrada(valor);
    return n !== null && n >= 0 && n <= 100000 ? n : null;
  }
  function construirVista() {
    host.innerHTML =
      inicio(
        "🧱 Construye el número",
        "Una cifra cambia de valor según su posición. En cincuenta y nueve mil setecientos veinticinco, el siete ocupa las centenas y vale setecientos.",
        "Toca + o − en una columna. Cada botón añade o quita el valor de esa posición. Mira qué cambia.",
      ) +
      `<div class="acciones-locales"><form id="cambiarNumero"><label>Elige otro número<input id="numeroConstruyo" inputmode="numeric" maxlength="7" value="${numero}" aria-describedby="limiteTablero"></label><button class="btn" type="submit">Ver en el tablero</button></form><button class="btn" type="button" id="numeroLimite">Ver 100 000</button></div><p class="procedencia" id="limiteTablero">De 0 a 100 000. Puedes escribir espacios entre los millares.</p><div id="tableroConstruyo">${tableroHTML(numero, { editable: true })}</div><div id="numeroCompuesto" class="numero-grande">${f(numero)}</div><p class="lectura-numero" id="lecturaConstruyo">${leerNumero(numero)}</p><div class="descomposicion" id="descompConstruyo"></div><details class="otra-forma"><summary>¿Y si lo agrupo en millares?</summary><p id="agruparMillares"></p></details><p class="mensaje-local" id="mensajeExplorador" role="status">¿Cuánto crees que cambia el número al tocar una centena?</p></article>`;
    function actualizar() {
      const foco = document.activeElement?.closest("[data-digito]");
      const selector = foco
        ? `[data-digito="${foco.dataset.digito}"][data-cambio="${foco.dataset.cambio}"]`
        : null;
      $("#tableroConstruyo").innerHTML = tableroHTML(numero, {
        editable: true,
      });
      $("#numeroCompuesto").textContent = f(numero);
      $("#lecturaConstruyo").textContent = leerNumero(numero);
      $("#numeroConstruyo").value = numero;
      $("#agruparMillares").textContent =
        numero < 1000
          ? `${f(numero)} no completa un millar; se representa con centenas, decenas y unidades.`
          : `${f(numero)} = ${Math.floor(numero / 1000)} × 1 000 + ${f(numero % 1000)}. Una decena de millar equivale a diez unidades de millar.`;
      $("#descompConstruyo").innerHTML = (
        descomponer(numero).length ? descomponer(numero) : [0]
      )
        .map((v) => `<span>${f(v)}</span>`)
        .join(" + ");
      host
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
      if (selector) {
        const siguiente = host.querySelector(selector);
        (siguiente && !siguiente.disabled
          ? siguiente
          : $("#numeroConstruyo")
        ).focus({ preventScroll: true });
      }
    }
    host.querySelector("#tableroConstruyo").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-digito]");
      if (!btn) return;
      detener();
      const i = Number(btn.dataset.digito),
        paso = Number(btn.dataset.cambio) * POSICIONES[i].unidad,
        nuevo = salto(numero, paso);
      if (nuevo === null) return;
      numero = nuevo;
      actualizar();
      mensaje(
        `Has ${paso > 0 ? "añadido" : "quitado"} ${f(Math.abs(paso))}. Ahora tienes ${f(numero)}. Mira su descomposición.`,
      );
    });
    $("#cambiarNumero").addEventListener("submit", (e) => {
      e.preventDefault();
      const n = dato($("#numeroConstruyo").value);
      if (n === null) {
        mensaje(
          "Escribe un número entero entre 0 y 100 000. Por ejemplo: 59 725.",
        );
        return;
      }
      detener();
      numero = n;
      actualizar();
      mensaje(
        "Cada columna representa una parte del mismo número. Comprueba cómo se lee.",
      );
    });
    $("#numeroLimite").addEventListener("click", () => {
      detener();
      numero = 100000;
      actualizar();
      mensaje(
        "Cien mil equivale a diez decenas de millar. Para volver, escribe un número menor.",
      );
    });
    actualizar();
  }
  function comparoVista() {
    indice = -1;
    host.innerHTML =
      inicio(
        "🔍 Detective de números",
        "Para comparar miramos desde la izquierda. La primera posición diferente decide. Si todas las cifras son iguales, los números también lo son.",
        "Pulsa Buscar la siguiente pista. La investigación se detiene cuando aparece la primera diferencia.",
      ) +
      `<form id="cambiarComparacion" class="acciones-locales"><label>Número A<input id="numeroA" inputmode="numeric" maxlength="7" value="${a}"></label><label>Número B<input id="numeroB" inputmode="numeric" maxlength="7" value="${b}"></label><button class="btn" type="submit">Investigar</button></form><div id="cifrasComparo"></div><button class="btn principal" type="button" id="pistaComparar">🔎 Buscar la siguiente pista</button><p id="mensajeExplorador" class="mensaje-local" role="status">Empieza por las decenas de millar.</p><div id="rectaComparo"></div></article>`;
    function pintar() {
      $("#cifrasComparo").innerHTML = compararHTML(a, b, indice);
      const min = Math.max(0, Math.floor((Math.min(a, b) - 100) / 1000) * 1000),
        max = Math.min(100000, Math.ceil((Math.max(a, b) + 100) / 1000) * 1000);
      $("#rectaComparo").innerHTML = rectaHTML({ min, max, puntos: [a, b] });
      $("#pistaComparar").disabled = false;
    }
    $("#cambiarComparacion").addEventListener("submit", (e) => {
      e.preventDefault();
      const na = dato($("#numeroA").value),
        nb = dato($("#numeroB").value);
      if (na === null || nb === null) {
        mensaje("Revisa los dos números: deben ser enteros entre 0 y 100 000.");
        return;
      }
      detener();
      a = na;
      b = nb;
      indice = -1;
      pintar();
      mensaje(
        "Busca desde la izquierda. Una sola diferencia puede ser suficiente.",
      );
    });
    $("#pistaComparar").addEventListener("click", () => {
      const diferencia = primeraDiferencia(a, b);
      indice++;
      if (diferencia === -2) {
        mensaje(
          `100 000 tiene más cifras que ${f(Math.min(a, b))}: es el mayor.`,
        );
        $("#pistaComparar").disabled = true;
        return;
      }
      $("#cifrasComparo").innerHTML = compararHTML(a, b, indice);
      if (diferencia === -1 && indice === 4) {
        mensaje("Las cinco cifras coinciden: los números son iguales.");
        $("#pistaComparar").disabled = true;
      } else if (indice === diferencia) {
        mensaje(
          `✨ ¡Aquí está la pista! En ${POSICIONES[indice].nombre}, ${cifras(a)[indice]} ${a > b ? ">" : "<"} ${cifras(b)[indice]}. ${f(Math.max(a, b))} es mayor. No necesitas mirar las siguientes.`,
        );
        $("#pistaComparar").disabled = true;
        $("#cifrasComparo").classList.add("resuelto");
      } else
        mensaje(
          `${POSICIONES[indice].id}: ${cifras(a)[indice]} = ${cifras(b)[indice]}. Son iguales; mira ahora ${POSICIONES[indice + 1].nombre}.`,
        );
    });
    pintar();
  }
  function saltoVista() {
    pendiente = null;
    host.innerHTML =
      inicio(
        "🚀 Saltos numéricos",
        "Un salto de cien cambia las centenas. Un salto de mil cambia los millares. A veces se completa un grupo de diez y también cambia una posición superior.",
        "Elige un salto, imagina dónde acabarás y después compruébalo. Puedes escribir tu idea antes de ver el resultado.",
      ) +
      `<form id="cambiarOrigen" class="acciones-locales"><label>Empiezo en<input id="origenSalto" inputmode="numeric" maxlength="7" value="${origen}"></label><button type="submit" class="btn">Cambiar salida</button></form><div class="numero-grande" id="numeroSalto">${f(origen)}</div><div class="opciones-respuesta" aria-label="Elegir salto">${[100, -100, 1000, -1000].map((p) => `<button type="button" data-salto="${p}" aria-pressed="false">${p > 0 ? "+" : "−"}${f(Math.abs(p))}</button>`).join("")}</div><div id="anticiparSalto" hidden><label class="respuesta-numero">¿Dónde crees que llegarás? (opcional)<input id="prediccionSalto" inputmode="numeric" maxlength="7"></label><button type="button" id="verSalto" class="btn principal">Ver el salto →</button></div><p id="mensajeExplorador" class="mensaje-local" role="status">Puedes avanzar o retroceder. El camino se mantiene entre 0 y 100 000.</p><div id="caminoSalto"></div><div id="posicionesSalto"></div></article>`;
    function pintar() {
      $("#numeroSalto").textContent = f(origen);
      $("#origenSalto").value = origen;
      host.querySelectorAll("[data-salto]").forEach((btn) => {
        btn.disabled = salto(origen, Number(btn.dataset.salto)) === null;
        btn.setAttribute(
          "aria-pressed",
          String(Number(btn.dataset.salto) === pendiente),
        );
      });
      const min = Math.max(
          0,
          Math.floor((Math.min(...historia) - 1000) / 1000) * 1000,
        ),
        max = Math.min(
          100000,
          Math.ceil((Math.max(...historia) + 1000) / 1000) * 1000,
        );
      $("#caminoSalto").innerHTML =
        `<div class="trayecto">${historia.map((n) => `<span>${f(n)}</span>`).join(" → ")}</div>` +
        rectaHTML({ min, max, puntos: [origen] });
      $("#posicionesSalto").innerHTML = tableroHTML(origen);
    }
    $("#cambiarOrigen").addEventListener("submit", (e) => {
      e.preventDefault();
      const n = dato($("#origenSalto").value);
      if (n === null) {
        mensaje("Escribe un entero entre 0 y 100 000 para empezar el camino.");
        return;
      }
      detener();
      origen = n;
      historia = [n];
      pendiente = null;
      $("#anticiparSalto").hidden = true;
      pintar();
      mensaje("Elige un salto y anticipa el cambio.");
    });
    host.querySelectorAll("[data-salto]").forEach((btn) =>
      btn.addEventListener("click", () => {
        pendiente = Number(btn.dataset.salto);
        $("#anticiparSalto").hidden = false;
        $("#prediccionSalto").value = "";
        pintar();
        mensaje(
          `Antes de verlo: ¿qué cambiará si haces ${pendiente > 0 ? "+" : "−"}${f(Math.abs(pendiente))}?`,
        );
      }),
    );
    $("#verSalto").addEventListener("click", () => {
      if (pendiente === null) return;
      detener();
      const anterior = origen,
        nuevo = salto(origen, pendiente);
      if (nuevo === null) return;
      const pred = dato($("#prediccionSalto").value);
      origen = nuevo;
      historia = [...historia, origen].slice(-5);
      const cambios = POSICIONES.filter(
        (p, i) => cifras(anterior)[i] !== cifras(origen)[i],
      ).map((p) => p.id);
      pendiente = null;
      $("#anticiparSalto").hidden = true;
      pintar();
      mensaje(
        `${pred === origen ? "🚀 Salto perfecto. " : ""}${f(anterior)} → ${f(origen)}. ${origen === 100000 ? "Llegas a cien mil: 10 decenas de millar." : anterior === 100000 ? "Vuelves a las cinco posiciones del tablero. Mira cómo se reparte el nuevo número." : "Han cambiado " + cambios.join(" y ") + ". Las demás posiciones se mantienen."}`,
      );
    });
    pintar();
  }
  function aproximoVista() {
    ayuda = 0;
    aproximado = false;
    host.innerHTML =
      inicio(
        "🧲 El imán del redondeo",
        "Redondear es encontrar el vecino más cercano. Primero buscamos entre qué dos valores está el número, localizamos la mitad y comparamos las distancias. Si está justo en la mitad, elegimos el valor superior.",
        "Elige decena, centena o millar. Mira la recta y decide hacia qué vecino atraerías el número.",
      ) +
      `<form id="cambiarRedondeo" class="acciones-locales"><label>Número<input id="numeroRedondeo" inputmode="numeric" maxlength="7" value="${redondo}"></label><label>Redondeamos a<select id="unidadRedondeo"><option value="10">Decena</option><option value="100">Centena</option><option value="1000">Millar</option></select></label><button class="btn" type="submit">Explorar</button><button class="btn" type="button" id="casoMitad">Probar un punto medio</button></form><p class="salto-destacado" id="unidadVisible"></p><div class="numero-grande" id="numeroAproximo"></div><div id="rectaRedondeo"></div><div class="opciones-respuesta" id="vecinosRedondeo"></div><button class="btn" type="button" id="pistaRedondeo">💡 Una pista</button><div id="ayudaRedondeo" class="ayuda-local" hidden></div><div id="distanciasRedondeo" class="distancias" hidden></div><p id="mensajeExplorador" class="mensaje-local" role="status">Busca cuál de los dos vecinos está más cerca.</p></article>`;
    function limites() {
      const v = vecinos(redondo, unidad);
      return v.exacto && redondo > 0
        ? {
            ...v,
            inferior: redondo - unidad,
            superior: redondo,
            medio: redondo - unidad / 2,
          }
        : v;
    }
    function pintar() {
      const v = limites();
      $("#unidadRedondeo").value = unidad;
      $("#numeroRedondeo").value = redondo;
      $("#numeroAproximo").textContent = f(redondo);
      $("#unidadVisible").textContent =
        `Redondeamos ${unidad === 1000 ? "al MILLAR" : "a la " + nombres[unidad]}`;
      $("#rectaRedondeo").innerHTML = rectaHTML({
        min: v.inferior,
        max: v.superior,
        medio: v.medio,
        puntos:
          aproximado && v.resultado !== redondo
            ? [redondo, v.resultado]
            : [redondo],
      });
      $("#vecinosRedondeo").innerHTML = [v.inferior, v.superior]
        .map(
          (n) => `<button type="button" data-vecino="${n}">🧲 ${f(n)}</button>`,
        )
        .join("");
      $("#pistaRedondeo").textContent =
        ayuda < 3 ? "💡 Una pista" : "Ver explicación";
      $("#ayudaRedondeo").hidden = ayuda === 0;
      $("#ayudaRedondeo").textContent =
        ayuda === 1
          ? `Tus vecinos son ${f(v.inferior)} y ${f(v.superior)}.`
          : ayuda === 2
            ? `El punto medio es ${f(v.medio)}. ¿En qué lado está ${f(redondo)}?`
            : `Hasta ${f(v.inferior)} hay ${f(redondo - v.inferior)}; hasta ${f(v.superior)} hay ${f(v.superior - redondo)}. Compara esas distancias.`;
      $("#distanciasRedondeo").hidden = !aproximado;
      $("#distanciasRedondeo").innerHTML =
        `<div class="distancia">Hasta ${f(v.inferior)}<b>${f(redondo - v.inferior)} de distancia</b></div><div class="distancia">Hasta ${f(v.superior)}<b>${f(v.superior - redondo)} de distancia</b></div>`;
    }
    function reiniciar() {
      ayuda = 0;
      aproximado = false;
      pintar();
      mensaje("Mira dónde está el número. Si dudas, pide una pista.");
    }
    $("#cambiarRedondeo").addEventListener("submit", (e) => {
      e.preventDefault();
      const n = dato($("#numeroRedondeo").value);
      if (n === null) {
        mensaje("Escribe un entero entre 0 y 100 000.");
        return;
      }
      detener();
      redondo = n;
      unidad = Number($("#unidadRedondeo").value);
      reiniciar();
    });
    $("#casoMitad").addEventListener("click", () => {
      detener();
      unidad = Number($("#unidadRedondeo").value);
      redondo = Math.floor(2508 / unidad) * unidad + unidad / 2;
      reiniciar();
      mensaje(
        "Este número está exactamente en la mitad. ¿Qué convención utilizamos?",
      );
    });
    $("#vecinosRedondeo").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-vecino]");
      if (!btn) return;
      const v = limites();
      if (Number(btn.dataset.vecino) !== v.resultado) {
        mensaje(
          "Compara la distancia a los dos vecinos. Puedes pedir una pista y volver a intentar.",
        );
        return;
      }
      aproximado = true;
      pintar();
      $("#rectaRedondeo").classList.add("resuelto");
      mensaje(
        `🧲 ¡Encontraste el vecino más cercano! ${f(redondo)} ≈ ${f(v.resultado)}. ${redondo === v.resultado ? "Ya era un múltiplo exacto." : redondo === v.medio ? "Está justo en la mitad: elegimos el valor superior." : "La distancia hasta ese vecino es menor."}`,
      );
    });
    $("#pistaRedondeo").addEventListener("click", () => {
      ayuda++;
      pintar();
      if (ayuda > 3) {
        const v = limites();
        mensaje(
          `${f(redondo)} ≈ ${f(v.resultado)}. ${redondo === v.medio ? "En la mitad, usamos el superior." : "Ese es el múltiplo más cercano."}`,
        );
      }
    });
    pintar();
  }
  function elegir(nombre, foco = false) {
    detener();
    actual = nombre;
    document
      .querySelectorAll("[data-experiencia]")
      .forEach((btn) =>
        btn.setAttribute(
          "aria-pressed",
          String(btn.dataset.experiencia === actual),
        ),
      );
    ({
      construyo: construirVista,
      comparo: comparoVista,
      salto: saltoVista,
      aproximo: aproximoVista,
    })[actual]();
    if (foco) $("#experienciaTitulo").focus({ preventScroll: true });
  }
  document
    .querySelectorAll("[data-experiencia]")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        elegir(btn.dataset.experiencia, true),
      ),
    );
  document.querySelectorAll("[data-experiencia-ir]").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.querySelector('[data-pestana="claves"]').click();
      elegir(btn.dataset.experienciaIr, true);
    }),
  );
  elegir("construyo");
}
