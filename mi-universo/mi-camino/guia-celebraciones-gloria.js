/* Academia Gloria Valentina · Mi Camino · Guía visual de celebraciones para Gloria */

let instalada = false;
let observador = null;

const TEXTO_ACCESO = "🌈 Las cosas bonitas que celebra la Academia";

function cargarEstilos() {
  if (document.querySelector('link[data-guia-celebraciones-gloria-css="true"]')) return;

  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./guia-celebraciones-gloria.css", import.meta.url).href;
  enlace.dataset.guiaCelebracionesGloriaCss = "true";
  document.head.appendChild(enlace);
}

function contenidoPaginaGloria() {
  return `
    <section
      class="guia-celebraciones__pagina guia-celebraciones__pagina--gloria"
      data-guia-celebraciones-pagina="0"
      aria-labelledby="guiaCelebracionesGloriaTitulo"
    >
      <header class="guia-gloria__hero">
        <button
          type="button"
          class="guia-gloria__cerrar"
          data-cerrar-guia-gloria
          aria-label="Cerrar"
        >×</button>

        <div class="guia-gloria__panda" aria-hidden="true">🐼</div>
        <div class="guia-gloria__bienvenida">
          <span class="guia-gloria__eyebrow">🌈 Las cosas bonitas de tu camino</span>
          <h2 id="guiaCelebracionesGloriaTitulo">Así crece mi camino</h2>
          <p><strong>Hola, Gloria.</strong> En la Academia celebramos las cosas bonitas e importantes que vas consiguiendo.</p>
          <span>Tu camino crece contigo 💛</span>
        </div>
      </header>

      <section class="guia-gloria__crecimiento" aria-labelledby="guiaGloriaCrecimientoTitulo">
        <div class="guia-gloria__seccion-titulo">
          <span aria-hidden="true">🌱</span>
          <div>
            <h3 id="guiaGloriaCrecimientoTitulo">Mi árbol crece conmigo</h3>
            <p>Cada aventura, cada intento y cada paso bonito ayudan a crecer tu camino.</p>
          </div>
        </div>

        <div class="guia-gloria__etapas" aria-label="Etapas de crecimiento">
          <article class="guia-gloria__etapa guia-gloria__etapa--semilla">
            <span aria-hidden="true">🌱</span>
            <strong>Semilla</strong>
            <small>Cuando empiezas</small>
          </article>
          <span class="guia-gloria__flecha" aria-hidden="true">→</span>
          <article class="guia-gloria__etapa guia-gloria__etapa--brote">
            <span aria-hidden="true">🌿</span>
            <strong>Brote</strong>
            <small>Cuando vas avanzando</small>
          </article>
          <span class="guia-gloria__flecha" aria-hidden="true">→</span>
          <article class="guia-gloria__etapa guia-gloria__etapa--arbol">
            <span aria-hidden="true">🌳</span>
            <strong>Árbol</strong>
            <small>Cuando tu camino crece mucho</small>
          </article>
        </div>

        <div class="guia-gloria__bosque">
          <div class="guia-gloria__bosque-dibujo" aria-hidden="true">🌳 🌲 🌳</div>
          <p><strong>Y todos tus pasos bonitos van formando tu bosque.</strong></p>
        </div>
      </section>

      <section class="guia-gloria__guacamayas" aria-labelledby="guiaGloriaGuacamayasTitulo">
        <div class="guia-gloria__seccion-titulo">
          <span aria-hidden="true">🦜</span>
          <div>
            <h3 id="guiaGloriaGuacamayasTitulo">Mis Guacamayas</h3>
            <p>Las Guacamayas llegan en momentos especiales. Son recuerdos de cosas importantes de tu camino.</p>
          </div>
        </div>

        <div class="guia-gloria__guacamayas-grid">
          <article class="guia-gloria__guacamaya guia-gloria__guacamaya--valiente">
            <span aria-hidden="true">🦜</span>
            <strong>Valiente</strong>
            <small>Cuando vuelves a intentarlo después de algo difícil.</small>
          </article>
          <article class="guia-gloria__guacamaya guia-gloria__guacamaya--alas">
            <span aria-hidden="true">🦜</span>
            <strong>Alas Propias</strong>
            <small>Cuando haces algo con más autonomía y responsabilidad.</small>
          </article>
          <article class="guia-gloria__guacamaya guia-gloria__guacamaya--curiosa">
            <span aria-hidden="true">🦜</span>
            <strong>Curiosa</strong>
            <small>Cuando quieres descubrir o aprender algo por ti misma.</small>
          </article>
          <article class="guia-gloria__guacamaya guia-gloria__guacamaya--pensadora">
            <span aria-hidden="true">🦜</span>
            <strong>Pensadora</strong>
            <small>Cuando piensas, revisas y pruebas una estrategia.</small>
          </article>
          <article class="guia-gloria__guacamaya guia-gloria__guacamaya--equipo">
            <span aria-hidden="true">🦜</span>
            <strong>de Equipo</strong>
            <small>Cuando colaboras de verdad con tu familia.</small>
          </article>
          <article class="guia-gloria__guacamaya guia-gloria__guacamaya--crecimiento">
            <span aria-hidden="true">🦜</span>
            <strong>de Crecimiento</strong>
            <small>Cuando descubres algo importante sobre ti.</small>
          </article>
        </div>
      </section>

      <footer class="guia-gloria__cierre">
        <span class="guia-gloria__panda guia-gloria__panda--pequeno" aria-hidden="true">🐼</span>
        <p><strong>No tienes que correr ni hacerlo perfecto.</strong><br>Tu camino crece paso a paso.</p>
      </footer>
    </section>
  `;
}

function mostrarPagina(dialogo, indice) {
  const paginas = [...dialogo.querySelectorAll("[data-guia-celebraciones-pagina]")];
  const puntos = [...dialogo.querySelectorAll("[data-guia-celebraciones-punto]")];
  const pagina = indice === 1 ? 1 : 0;

  paginas.forEach((elemento, posicion) => {
    const activa = posicion === pagina;
    elemento.hidden = !activa;
    elemento.setAttribute("aria-hidden", activa ? "false" : "true");
  });

  puntos.forEach((punto, posicion) => {
    const activo = posicion === pagina;
    punto.classList.toggle("activo", activo);
    punto.setAttribute("aria-current", activo ? "page" : "false");
    punto.tabIndex = activo ? 0 : -1;
  });

  dialogo.dataset.guiaPagina = String(pagina);
  dialogo.setAttribute(
    "aria-labelledby",
    pagina === 0 ? "guiaCelebracionesGloriaTitulo" : "guiaRecompensasTitulo"
  );

  dialogo.querySelector(".guia-celebraciones__viewport")?.scrollTo?.({ top: 0, behavior: "instant" });
}

function mejorarGuia() {
  if (instalada) return true;

  const acceso = document.querySelector("[data-abrir-guia-recompensas]");
  const dialogo = document.getElementById("guiaRecompensasCamino");
  const contenidoActual = dialogo?.querySelector(".recompensas-guia__contenido");

  if (!acceso || !dialogo || !contenidoActual) return false;

  cargarEstilos();
  acceso.textContent = TEXTO_ACCESO;

  if (dialogo.querySelector("[data-guia-celebraciones]")) {
    instalada = true;
    return true;
  }

  const estructura = document.createElement("div");
  estructura.className = "guia-celebraciones";
  estructura.dataset.guiaCelebraciones = "true";
  estructura.innerHTML = `
    <div class="guia-celebraciones__viewport">
      ${contenidoPaginaGloria()}
      <section
        class="guia-celebraciones__pagina guia-celebraciones__pagina--familia"
        data-guia-celebraciones-pagina="1"
        aria-label="Explicación detallada"
        hidden
      ></section>
    </div>
    <nav class="guia-celebraciones__puntos" aria-label="Páginas de la guía">
      <button
        type="button"
        class="guia-celebraciones__punto activo"
        data-guia-celebraciones-punto="0"
        aria-label="Ver página para Gloria"
        aria-current="page"
      ></button>
      <button
        type="button"
        class="guia-celebraciones__punto"
        data-guia-celebraciones-punto="1"
        aria-label="Ver explicación detallada"
        aria-current="false"
        tabindex="-1"
      ></button>
    </nav>
  `;

  const paginaFamilia = estructura.querySelector('[data-guia-celebraciones-pagina="1"]');
  paginaFamilia.appendChild(contenidoActual);

  dialogo.classList.add("recompensas-guia--dos-paginas");
  dialogo.replaceChildren(estructura);

  estructura.querySelectorAll("[data-guia-celebraciones-punto]").forEach(punto => {
    punto.addEventListener("click", () => {
      mostrarPagina(dialogo, Number(punto.dataset.guiaCelebracionesPunto || 0));
    });
  });

  estructura.querySelector("[data-cerrar-guia-gloria]")?.addEventListener("click", () => {
    dialogo.close?.();
  });

  acceso.addEventListener("click", () => {
    window.setTimeout(() => mostrarPagina(dialogo, 0), 0);
  });

  dialogo.addEventListener("keydown", evento => {
    if (evento.key !== "ArrowLeft" && evento.key !== "ArrowRight") return;
    evento.preventDefault();
    mostrarPagina(dialogo, evento.key === "ArrowRight" ? 1 : 0);
  });

  dialogo.addEventListener("close", () => mostrarPagina(dialogo, 0));

  mostrarPagina(dialogo, 0);
  instalada = true;
  observador?.disconnect();
  observador = null;
  return true;
}

function instalar() {
  if (mejorarGuia()) return;

  if (!document.body || observador) return;
  observador = new MutationObserver(() => {
    mejorarGuia();
  });
  observador.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", instalar, { once: true });
} else {
  instalar();
}
