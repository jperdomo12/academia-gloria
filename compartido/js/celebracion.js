/**
 * Academia Gloria Valentina · Celebración reutilizable
 * Versión 1.1
 *
 * Las imágenes se resuelven respecto a este módulo mediante import.meta.url,
 * por lo que funcionan tanto con Live Server como con GitHub Pages.
 */

const DEFAULTS = Object.freeze({
  titulo: "¡Lo lograste!",
  mensaje: "Cada pequeño paso cuenta.",
  duracion: 2800,
  mostrarGuacamayas: true
});

const GUACAMAYA_AZUL = new URL(
  "../../assets/identidad/guacamayas/guacamaya-azul-posada-01.png",
  import.meta.url
).href;

const GUACAMAYA_ROJA = new URL(
  "../../assets/identidad/guacamayas/guacamaya-roja-posada-01.png",
  import.meta.url
).href;

let temporizadorCierre = null;

function escaparHTML(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function crearParticulas(cantidad = 34) {
  const simbolos = ["✨", "⭐", "🎉", "🌈", "💫"];

  return Array.from({ length: cantidad }, (_, indice) => {
    const izquierda = Math.round(Math.random() * 100);
    const retraso = (Math.random() * 0.7).toFixed(2);
    const duracion = (1.8 + Math.random() * 1.4).toFixed(2);
    const desplazamiento = Math.round(-45 + Math.random() * 90);

    return `
      <span
        class="celebracion__particula"
        aria-hidden="true"
        style="
          --izquierda:${izquierda}%;
          --retraso:${retraso}s;
          --duracion:${duracion}s;
          --desplazamiento:${desplazamiento}px;
        "
      >${simbolos[indice % simbolos.length]}</span>
    `;
  }).join("");
}

function activarFallbackImagen(imagen, emoji) {
  imagen.addEventListener("error", () => {
    const reemplazo = document.createElement("span");
    reemplazo.className = "celebracion__guacamaya-fallback";
    reemplazo.setAttribute("aria-hidden", "true");
    reemplazo.textContent = emoji;
    imagen.replaceWith(reemplazo);
  }, { once: true });
}

function cerrarCelebracion() {
  const existente = document.getElementById("academiaCelebracion");
  if (!existente) return;

  existente.classList.add("celebracion--saliendo");
  window.setTimeout(() => existente.remove(), 260);

  if (temporizadorCierre) {
    window.clearTimeout(temporizadorCierre);
    temporizadorCierre = null;
  }
}

export function mostrarCelebracion(opciones = {}) {
  cerrarCelebracion();

  const configuracion = {
    ...DEFAULTS,
    ...opciones
  };

  const contenedor = document.createElement("section");
  contenedor.id = "academiaCelebracion";
  contenedor.className = "celebracion";
  contenedor.setAttribute("role", "status");
  contenedor.setAttribute("aria-live", "polite");

  contenedor.innerHTML = `
    <div class="celebracion__particulas">
      ${crearParticulas()}
    </div>

    <div class="celebracion__tarjeta">
      ${
        configuracion.mostrarGuacamayas
          ? `
            <div class="celebracion__guacamayas" aria-hidden="true">
              <img
                data-guacamaya="azul"
                src="${GUACAMAYA_AZUL}"
                alt=""
              >
              <img
                data-guacamaya="roja"
                src="${GUACAMAYA_ROJA}"
                alt=""
              >
            </div>
          `
          : `<div class="celebracion__icono" aria-hidden="true">🎉</div>`
      }

      <h2>${escaparHTML(configuracion.titulo)}</h2>
      <p>${escaparHTML(configuracion.mensaje)}</p>
    </div>
  `;

  document.body.appendChild(contenedor);

  const azul = contenedor.querySelector('[data-guacamaya="azul"]');
  const roja = contenedor.querySelector('[data-guacamaya="roja"]');

  if (azul) activarFallbackImagen(azul, "🦜");
  if (roja) activarFallbackImagen(roja, "🦜");

  temporizadorCierre = window.setTimeout(
    cerrarCelebracion,
    Math.max(1200, Number(configuracion.duracion) || DEFAULTS.duracion)
  );

  return {
    cerrar: cerrarCelebracion
  };
}
