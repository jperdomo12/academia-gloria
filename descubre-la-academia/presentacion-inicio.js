/* ==========================================================
   Academia Gloria Valentina
   Presentación de bloques principales en Inicio

   Mantiene Descubre la Academia como punto de entrada para
   conocer el proyecto e informa allí mismo de la Guía rápida.
   También ajusta la presentación de Mi Camino sin alterar la
   navegación ni la lógica funcional de ninguno de los bloques.
   ========================================================== */

function asegurarAjusteDeAncho() {
  if (document.getElementById("estilos-inicio-bloques-principales")) return;

  const estilos = document.createElement("style");
  estilos.id = "estilos-inicio-bloques-principales";
  estilos.textContent = `
    .descubre-academia > div:first-child,
    .mi-camino-principal__contenido {
      min-width: 0;
    }

    .descubre-academia p,
    .mi-camino-principal p {
      max-width: none;
      width: 100%;
    }

    .descubre-academia .descubre-linea {
      display: block;
    }

    .descubre-academia .descubre-linea + .descubre-linea {
      margin-top: 3px;
    }

    .descubre-academia .descubre-guia {
      color: #0b82bd;
      font-weight: 900;
    }

    .descubre-academia .descubre-accion {
      color: #7c3aed;
      font-weight: 900;
    }
  `;

  document.head.appendChild(estilos);
}

function retirarPistasDeInteraccion() {
  document
    .querySelectorAll(
      ".descubre-academia .bloque-pista, .mi-camino-principal .bloque-pista"
    )
    .forEach(elemento => elemento.remove());
}

function reforzarMensajeMiCamino() {
  const mensaje = document.getElementById("mensajeMiCamino");
  if (!mensaje) return;

  const ajustar = () => {
    const texto = mensaje.textContent || "";
    const original = "¡todo está al día! Entra en Mi Camino";
    const reforzado = "¡todo está al día! Haz clic en este bloque y entra en Mi Camino";

    if (texto.includes(original)) {
      mensaje.textContent = texto.replace(original, reforzado);
    }
  };

  ajustar();

  const observador = new MutationObserver(ajustar);
  observador.observe(mensaje, {
    childList: true,
    characterData: true,
    subtree: true
  });
}

export function prepararPresentacionDescubreInicio() {
  const descubre = document.querySelector(".descubre-academia");
  if (!descubre) return;

  asegurarAjusteDeAncho();
  retirarPistasDeInteraccion();
  reforzarMensajeMiCamino();

  const etiqueta = descubre.querySelector(".etiqueta-estado");
  if (etiqueta) {
    etiqueta.textContent = "Conoce la Academia";
  }

  const descripcion = descubre.querySelector("p");
  if (descripcion) {
    descripcion.innerHTML = `
      <span class="descubre-linea">Conoce en pocos minutos qué es este proyecto, sus dos grandes caminos y nuestra forma de aprender.</span>
      <span class="descubre-linea">Dentro también encontrarás una <strong class="descubre-guia">Guía rápida de uso</strong> para orientarte y empezar a explorar con confianza.</span>
      <span class="descubre-linea descubre-accion">Haz clic y conoce la Academia por dentro.</span>
    `;
  }
}
