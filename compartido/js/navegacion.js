/* ==========================================================
   Academia Gloria Valentina
   Navegación común
   Versión 2.2
   ========================================================== */

window.Academia = window.Academia || {};

(function configurarNavegacionAcademia() {
  "use strict";

  const SELECTOR_VOLVER = "[data-accion-volver]";
  const SELECTOR_VOLVER_MODULO = "[data-volver-modulo]";
  const SELECTOR_INICIO = "[data-accion-inicio]";
  const SELECTOR_CONSERVAR_RETORNO = "[data-conservar-retorno]";

  function obtenerBaseAcademia() {
    return window.location.hostname.endsWith("github.io")
      ? "/academia-gloria"
      : "";
  }

  function obtenerRutaActual() {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
  }

  function normalizarRutaInterna(valor) {
    if (!valor) return null;

    try {
      const destino = new URL(valor, window.location.origin);
      const baseAcademia = obtenerBaseAcademia();

      if (destino.origin !== window.location.origin) {
        return null;
      }

      if (
        baseAcademia &&
        !destino.pathname.startsWith(`${baseAcademia}/`)
      ) {
        return null;
      }

      if (
        !baseAcademia &&
        destino.pathname.startsWith("/academia-gloria/")
      ) {
        destino.pathname =
          destino.pathname.replace(/^\/academia-gloria/, "") || "/";
      }

      return `${destino.pathname}${destino.search}${destino.hash}`;
    } catch (error) {
      console.warn("Ruta de navegación no válida.", error);
      return null;
    }
  }

  function esPaginaActual(ruta) {
    const rutaSegura = normalizarRutaInterna(ruta);

    if (!rutaSegura) return false;

    try {
      const destino = new URL(rutaSegura, window.location.origin);

      return (
        destino.pathname === window.location.pathname &&
        destino.search === window.location.search
      );
    } catch {
      return false;
    }
  }

  function esLogin(ruta) {
    if (!ruta) return false;

    try {
      const destino = new URL(ruta, window.location.origin);
      return destino.pathname.endsWith("/login.html");
    } catch {
      return false;
    }
  }

  function obtenerRutaInicio() {
    return `${obtenerBaseAcademia()}/mi-universo/`;
  }

  function irAInicio() {
    window.location.href = obtenerRutaInicio();
  }

  function obtenerRutaRetorno(rutaAlternativa = "./") {
    const parametros = new URLSearchParams(window.location.search);
    const volver = normalizarRutaInterna(parametros.get("volver"));

    if (volver && !esPaginaActual(volver)) {
      return volver;
    }

    const referencia = normalizarRutaInterna(document.referrer);

    if (
      referencia &&
      !esPaginaActual(referencia) &&
      !esLogin(referencia)
    ) {
      return referencia;
    }

    return (
      normalizarRutaInterna(rutaAlternativa) ||
      obtenerRutaInicio()
    );
  }

  function construirUrlConRetorno(
    url,
    rutaRetorno = obtenerRutaActual()
  ) {
    try {
      const destino = new URL(url, window.location.href);
      const retornoSeguro = normalizarRutaInterna(rutaRetorno);

      if (destino.origin !== window.location.origin) {
        return url;
      }

      if (retornoSeguro) {
        destino.searchParams.set("volver", retornoSeguro);
      }

      return `${destino.pathname}${destino.search}${destino.hash}`;
    } catch (error) {
      console.warn("No se pudo construir el enlace con retorno.", error);
      return url;
    }
  }

  function obtenerElementos(selectorOElementos) {
    if (typeof selectorOElementos === "string") {
      return document.querySelectorAll(selectorOElementos);
    }

    if (selectorOElementos instanceof Element) {
      return [selectorOElementos];
    }

    return selectorOElementos || [];
  }

  function configurarBotonInicio(selector = SELECTOR_INICIO) {
    const elementos = obtenerElementos(selector);
    const destino = obtenerRutaInicio();

    elementos.forEach((elemento) => {
      if (!elemento) return;

      if (elemento.tagName === "A") {
        elemento.href = destino;
        return;
      }

      if (elemento.dataset.navegacionInicioConfigurada === "true") {
        return;
      }

      elemento.dataset.navegacionInicioConfigurada = "true";

      elemento.addEventListener("click", irAInicio);
    });
  }

  function configurarBotonVolver(
    selector = SELECTOR_VOLVER,
    rutaAlternativa = "./"
  ) {
    const elementos = obtenerElementos(selector);
    const destino = obtenerRutaRetorno(rutaAlternativa);

    elementos.forEach((elemento) => {
      if (!elemento) return;

      if (elemento.tagName === "A") {
        elemento.href = destino;
        return;
      }

      if (elemento.dataset.navegacionVolverConfigurada === "true") {
        return;
      }

      elemento.dataset.navegacionVolverConfigurada = "true";

      elemento.addEventListener("click", () => {
        window.location.href = destino;
      });
    });
  }

  function prepararEnlaces(
    selector = SELECTOR_CONSERVAR_RETORNO
  ) {
    document.querySelectorAll(selector).forEach((enlace) => {
      if (enlace.dataset.retornoPreparado === "true") {
        return;
      }

      const href = enlace.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      enlace.href = construirUrlConRetorno(href);
      enlace.dataset.retornoPreparado = "true";
    });
  }

  function abrirModulo(url, opciones = {}) {
    const {
      conservarRetorno = true,
      rutaRetorno = obtenerRutaActual()
    } = opciones;

    const destino = conservarRetorno
      ? construirUrlConRetorno(url, rutaRetorno)
      : normalizarRutaInterna(url);

    if (!destino) {
      throw new Error(
        "Solo se permiten destinos internos de la Academia."
      );
    }

    window.location.href = destino;
  }

  function volver(rutaAlternativa = "./") {
    window.location.href = obtenerRutaRetorno(rutaAlternativa);
  }

  Academia.navegacion = Object.freeze({
    volver,
    irAInicio,
    abrirModulo,
    prepararEnlaces,
    configurarBotonVolver,
    configurarBotonInicio,
    construirUrlConRetorno,
    obtenerRutaRetorno,
    obtenerRutaInicio,
    obtenerRutaActual,
    obtenerBaseAcademia
  });

  /* Compatibilidad con versiones anteriores. */
  Academia.volver = volver;

  function inicializarNavegacionDeclarativa() {
    document
      .querySelectorAll(SELECTOR_VOLVER)
      .forEach((boton) => {
        configurarBotonVolver(
          boton,
          boton.dataset.rutaAlternativa || "./"
        );
      });

    document
      .querySelectorAll(SELECTOR_VOLVER_MODULO)
      .forEach((boton) => {
        configurarBotonVolver(
          boton,
          boton.dataset.rutaAlternativa || "../index.html"
        );
      });

    configurarBotonInicio();
    prepararEnlaces();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      inicializarNavegacionDeclarativa,
      { once: true }
    );
  } else {
    inicializarNavegacionDeclarativa();
  }
})();
