import { LectorTexto } from "../../../compartido/js/lector-texto.js";

const boton = document.getElementById("listenButton");
const contenidoEtapa = document.getElementById("stageContent");
const tituloEtapa = document.getElementById("stageTitle");

let leyendo = false;

function textoDe(elemento) {
  return String(elemento?.textContent || "").replace(/\s+/g, " ").trim();
}

function prepararMatematica(texto) {
  return String(texto || "")
    .replaceAll("×", " por ")
    .replaceAll("÷", " dividido entre ")
    .replaceAll("−", " menos ")
    .replaceAll("+", " más ")
    .replaceAll("=", " es igual a ")
    .replace(/\s+/g, " ")
    .trim();
}

function contextoActual() {
  const pista = contenidoEtapa?.querySelector(".support-box");

  if (pista) {
    return {
      etiqueta: "🔊 Escuchar pista",
      texto: textoDe(pista)
    };
  }

  const problema = contenidoEtapa?.querySelector(".problem");
  const pasosAncla = [
    ...(contenidoEtapa?.querySelectorAll(".anchor-step") || [])
  ];

  if (pasosAncla.length) {
    return {
      etiqueta: "🔊 Escuchar explicación",
      texto: [
        textoDe(tituloEtapa),
        textoDe(problema),
        ...pasosAncla.map(textoDe)
      ].filter(Boolean).join(". ")
    };
  }

  const pregunta = contenidoEtapa?.querySelector(".activity-question");

  return {
    etiqueta: "🔊 Escuchar problema",
    texto: [textoDe(problema), textoDe(pregunta)]
      .filter(Boolean)
      .join(". ")
  };
}

function actualizarBoton() {
  if (!boton) return;

  if (!LectorTexto.disponible()) {
    boton.disabled = true;
    boton.textContent = "🔇 Escuchar no disponible";
    return;
  }

  boton.disabled = false;

  if (leyendo) {
    boton.textContent = "⏹ Detener lectura";
    return;
  }

  boton.textContent = contextoActual().etiqueta;
}

function detenerLectura() {
  LectorTexto.detener();
  leyendo = false;
  actualizarBoton();
}

boton?.addEventListener("click", () => {
  if (leyendo) {
    detenerLectura();
    return;
  }

  const contexto = contextoActual();
  const texto = prepararMatematica(contexto.texto);

  if (!texto) return;

  leyendo = true;
  actualizarBoton();

  const iniciada = LectorTexto.escuchar(texto, {
    idioma: document.documentElement.lang || "es-ES",
    velocidad: 0.84,
    tono: 1,
    alFinalizar: () => {
      leyendo = false;
      actualizarBoton();
    },
    alError: () => {
      leyendo = false;
      actualizarBoton();
    }
  });

  if (!iniciada) {
    leyendo = false;
    actualizarBoton();
  }
});

if (contenidoEtapa) {
  const observador = new MutationObserver(() => {
    if (leyendo) {
      LectorTexto.detener();
      leyendo = false;
    }
    actualizarBoton();
  });

  observador.observe(contenidoEtapa, {
    childList: true,
    subtree: true,
    characterData: true
  });
}

window.addEventListener("beforeunload", () => {
  LectorTexto.detener();
});

actualizarBoton();
