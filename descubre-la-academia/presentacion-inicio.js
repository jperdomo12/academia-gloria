/* ==========================================================
   Academia Gloria Valentina
   Presentación de "Descubre la Academia" en Inicio

   Mantiene el bloque principal como punto de entrada para
   conocer el proyecto e informa allí mismo de que existe una
   Guía rápida de uso para quien entra por primera vez.
   También aprovecha el ancho disponible de los bloques
   Descubre la Academia y Mi Camino sin alterar sus visuales.
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
  `;

  document.head.appendChild(estilos);
}

export function prepararPresentacionDescubreInicio() {
  const descubre = document.querySelector(".descubre-academia");
  if (!descubre) return;

  asegurarAjusteDeAncho();

  const etiqueta = descubre.querySelector(".etiqueta-estado");
  if (etiqueta) {
    etiqueta.textContent = "Conoce la Academia";
  }

  const descripcion = descubre.querySelector("p");
  if (descripcion) {
    descripcion.innerHTML = `
      Conoce en pocos minutos qué es este proyecto, sus dos grandes caminos y
      nuestra forma de aprender. <strong>Si es tu primera vez, dentro encontrarás
      una Guía rápida de uso</strong> para orientarte y empezar a explorar con confianza.
    `;
  }
}
