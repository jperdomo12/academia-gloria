/* ==========================================================
   Academia Gloria Valentina
   Navegación común
   Versión 2.2
   ========================================================== */

window.Academia = window.Academia || {};

const NAVEGACION_SCRIPT_URL = document.currentScript?.src || "";

(function configurarNavegacionAcademia() {
  "use strict";

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
      `${obtenerBaseAcademia()}/mi-universo/`
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

  function configurarBotonVolver(
    selector = "[data-accion-volver]",
    rutaAlternativa = "./"
  ) {
    const elementos =
      typeof selector === "string"
        ? document.querySelectorAll(selector)
        : selector instanceof Element
          ? [selector]
          : selector;

    if (!elementos) return;

    const destino = obtenerRutaRetorno(rutaAlternativa);

    elementos.forEach((elemento) => {
      if (!elemento) return;

      if (elemento.tagName === "A") {
        elemento.href = destino;
        return;
      }

      if (elemento.dataset.navegacionConfigurada === "true") {
        return;
      }

      elemento.dataset.navegacionConfigurada = "true";

      elemento.addEventListener("click", () => {
        window.location.href = destino;
      });
    });
  }

  function prepararEnlaces(
    selector = "[data-conservar-retorno]"
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
    abrirModulo,
    prepararEnlaces,
    configurarBotonVolver,
    construirUrlConRetorno,
    obtenerRutaRetorno,
    obtenerRutaActual,
    obtenerBaseAcademia
  });

  /* Compatibilidad con versiones anteriores. */
  Academia.volver = volver;

  function rutaModeloActual() {
    const baseAcademia = obtenerBaseAcademia();
    let ruta = window.location.pathname;

    if (baseAcademia && ruta.startsWith(baseAcademia)) {
      ruta = ruta.slice(baseAcademia.length);
    }

    return ruta
      .replace(/^\/+/, "")
      .replace(/index\.html$/, "")
      .replace(/\/+$/, "");
  }

  function buscarNodoModelo(arbol, rutaActual) {
    for (const nodo of arbol || []) {
      const rutaNodo = String(nodo.ruta || "")
        .replace(/^\/+/, "")
        .replace(/index\.html$/, "")
        .replace(/\/+$/, "");

      if (nodo.ruta && rutaNodo === rutaActual) {
        return nodo;
      }

      if (Array.isArray(nodo.hijos)) {
        const encontrado = buscarNodoModelo(nodo.hijos, rutaActual);
        if (encontrado) return encontrado;
      }
    }

    return null;
  }

  async function cargarCabeceraGlobalDeclarada() {
    if (document.querySelector(".nav-global") || !NAVEGACION_SCRIPT_URL) {
      return;
    }

    try {
      const modeloUrl = new URL(
        "../modelos/navegacion.js",
        NAVEGACION_SCRIPT_URL
      );
      const { UBICACIONES_ACADEMIA } = await import(modeloUrl.href);
      const actual = buscarNodoModelo(
        UBICACIONES_ACADEMIA,
        rutaModeloActual()
      );

      if (!actual?.cabeceraGlobal) return;

      const componenteUrl = new URL(
        "../componentes/navegacion-global.js",
        NAVEGACION_SCRIPT_URL
      );

      await import(componenteUrl.href);
    } catch (error) {
      console.error("No se pudo cargar la cabecera global declarada.", error);
    }
  }

  function inicializarNavegacionDeclarativa() {
    document
      .querySelectorAll("[data-accion-volver]")
      .forEach((boton) => {
        configurarBotonVolver(
          boton,
          boton.dataset.rutaAlternativa || "./"
        );
      });

    document
      .querySelectorAll("[data-volver-modulo]")
      .forEach((boton) => {
        configurarBotonVolver(
          boton,
          boton.dataset.rutaAlternativa || "../index.html"
        );
      });

    prepararEnlaces();
    cargarCabeceraGlobalDeclarada();
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
