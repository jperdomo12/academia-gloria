/* ==========================================================
   Academia Gloria Valentina
   Navegación común
   Versión 2.5
   ========================================================== */

window.Academia = window.Academia || {};

const NAVEGACION_SCRIPT_URL = document.currentScript?.src || "";

(async function activarTimeoutSesionGlobal() {
  if (!NAVEGACION_SCRIPT_URL) return;

  try {
    const timeoutUrl = new URL(
      "./timeout-sesion.js",
      NAVEGACION_SCRIPT_URL
    );
    const { activarTimeoutSesion } = await import(timeoutUrl.href);
    const baseAcademia = window.location.hostname.endsWith("github.io")
      ? "/academia-gloria"
      : "";

    await activarTimeoutSesion({
      loginUrl: `${baseAcademia}/login.html`
    });
  } catch (error) {
    console.error("No se pudo activar el timeout global de sesión.", error);
  }
})();

(function configurarNavegacionAcademia() {
  "use strict";

  const CLAVE_HISTORIAL = "academia.navegacion.historial.v1";
  const CLAVE_RETROCESO = "academia.navegacion.retroceso.v1";
  const MAXIMO_HISTORIAL = 30;
  const BASE_PRODUCCION_ACADEMIA = new URL(
    "https://jperdomo12.github.io/academia-gloria/"
  );

  function obtenerBaseAcademia() {
    return window.location.hostname.endsWith("github.io")
      ? "/academia-gloria"
      : "";
  }

  function obtenerRutaActual() {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
  }

  function convertirDestinoAcademiaAlEntornoActual(valor) {
    if (!valor) return null;

    try {
      const destino = new URL(valor, window.location.href);

      if (destino.origin === window.location.origin) {
        return destino;
      }

      if (
        destino.origin !== BASE_PRODUCCION_ACADEMIA.origin ||
        !destino.pathname.startsWith(BASE_PRODUCCION_ACADEMIA.pathname)
      ) {
        return null;
      }

      const rutaRelativa = destino.pathname.slice(
        BASE_PRODUCCION_ACADEMIA.pathname.length
      );
      const baseActual = new URL(
        `${obtenerBaseAcademia()}/`,
        window.location.origin
      );
      const convertido = new URL(rutaRelativa, baseActual);
      convertido.search = destino.search;
      convertido.hash = destino.hash;
      return convertido;
    } catch {
      return null;
    }
  }

  function esDestinoAcademiaCanonicoFueraEntorno(valor) {
    if (!valor) return false;

    try {
      const destino = new URL(valor, window.location.href);

      return (
        destino.origin !== window.location.origin &&
        destino.origin === BASE_PRODUCCION_ACADEMIA.origin &&
        destino.pathname.startsWith(BASE_PRODUCCION_ACADEMIA.pathname)
      );
    } catch {
      return false;
    }
  }

  function normalizarRutaInterna(valor) {
    if (!valor) return null;

    try {
      const destino =
        convertirDestinoAcademiaAlEntornoActual(valor) ||
        new URL(valor, window.location.origin);
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

  function normalizarRutaHistorial(valor) {
    const ruta = normalizarRutaInterna(valor);
    if (!ruta) return null;

    try {
      const destino = new URL(ruta, window.location.origin);
      destino.searchParams.delete("volver");
      return `${destino.pathname}${destino.search}${destino.hash}`;
    } catch {
      return ruta;
    }
  }

  function rutasEquivalentes(a, b) {
    const rutaA = normalizarRutaHistorial(a);
    const rutaB = normalizarRutaHistorial(b);
    return Boolean(rutaA && rutaB && rutaA === rutaB);
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

  function leerHistorial() {
    try {
      const guardado = JSON.parse(sessionStorage.getItem(CLAVE_HISTORIAL) || "[]");
      if (!Array.isArray(guardado)) return [];

      return guardado
        .map(normalizarRutaHistorial)
        .filter(Boolean)
        .slice(-MAXIMO_HISTORIAL);
    } catch {
      return [];
    }
  }

  function guardarHistorial(historial) {
    try {
      const seguro = Array.isArray(historial)
        ? historial.map(normalizarRutaHistorial).filter(Boolean).slice(-MAXIMO_HISTORIAL)
        : [];
      sessionStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(seguro));
    } catch {
      // La navegación sigue funcionando mediante volver/referrer/fallback.
    }
  }

  function limpiarHistorial() {
    try {
      sessionStorage.removeItem(CLAVE_HISTORIAL);
      sessionStorage.removeItem(CLAVE_RETROCESO);
    } catch {
      // sessionStorage puede no estar disponible en algún contexto restringido.
    }
  }

  function marcarRetrocesoPendiente(destino) {
    const ruta = normalizarRutaHistorial(destino);
    if (!ruta) return;

    try {
      sessionStorage.setItem(CLAVE_RETROCESO, ruta);
    } catch {
      // El referrer y la ruta alternativa continúan disponibles como respaldo.
    }
  }

  function consumirRetrocesoPendiente() {
    try {
      const ruta = normalizarRutaHistorial(
        sessionStorage.getItem(CLAVE_RETROCESO)
      );
      sessionStorage.removeItem(CLAVE_RETROCESO);
      return ruta;
    } catch {
      return null;
    }
  }

  function tipoNavegacion() {
    try {
      return performance.getEntriesByType("navigation")?.[0]?.type || "navigate";
    } catch {
      return "navigate";
    }
  }

  function ultimoIndiceRuta(historial, ruta) {
    for (let indice = historial.length - 1; indice >= 0; indice -= 1) {
      if (rutasEquivalentes(historial[indice], ruta)) return indice;
    }
    return -1;
  }

  function sincronizarHistorial() {
    const actual = normalizarRutaHistorial(obtenerRutaActual());
    if (!actual) return;

    if (esLogin(actual)) {
      limpiarHistorial();
      return;
    }

    let historial = leerHistorial();
    const retroceso = consumirRetrocesoPendiente();

    if (retroceso && rutasEquivalentes(retroceso, actual)) {
      const indice = ultimoIndiceRuta(historial, actual);
      historial = indice >= 0
        ? historial.slice(0, indice + 1)
        : [...historial, actual];
      guardarHistorial(historial);
      return;
    }

    if (tipoNavegacion() === "back_forward") {
      const indice = ultimoIndiceRuta(historial, actual);
      historial = indice >= 0
        ? historial.slice(0, indice + 1)
        : [...historial, actual];
      guardarHistorial(historial);
      return;
    }

    if (rutasEquivalentes(historial.at(-1), actual)) {
      guardarHistorial(historial);
      return;
    }

    const referencia = normalizarRutaHistorial(document.referrer);

    if (
      referencia &&
      !esLogin(referencia) &&
      !rutasEquivalentes(referencia, actual) &&
      !rutasEquivalentes(historial.at(-1), referencia)
    ) {
      const indiceReferencia = ultimoIndiceRuta(historial, referencia);
      historial = indiceReferencia >= 0
        ? historial.slice(0, indiceReferencia + 1)
        : [...historial, referencia];
    }

    historial.push(actual);
    guardarHistorial(historial);
  }

  function obtenerRutaAnteriorHistorial() {
    const actual = normalizarRutaHistorial(obtenerRutaActual());
    const historial = leerHistorial();

    if (!actual || historial.length < 2) return null;

    const indiceActual = ultimoIndiceRuta(historial, actual);
    if (indiceActual <= 0) return null;

    const anterior = historial[indiceActual - 1];
    return anterior && !esLogin(anterior) ? anterior : null;
  }

  sincronizarHistorial();

  function obtenerRutaRetorno(rutaAlternativa = "./") {
    const parametros = new URLSearchParams(window.location.search);
    const volver = normalizarRutaInterna(parametros.get("volver"));

    if (volver && !esPaginaActual(volver)) {
      return volver;
    }

    const anteriorHistorial = obtenerRutaAnteriorHistorial();
    if (anteriorHistorial && !esPaginaActual(anteriorHistorial)) {
      return anteriorHistorial;
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
      const rutaDestino = normalizarRutaInterna(url);
      const retornoSeguro = normalizarRutaInterna(rutaRetorno);

      if (!rutaDestino) {
        return url;
      }

      const destino = new URL(rutaDestino, window.location.origin);

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
      }

      if (elemento.dataset.navegacionConfigurada === "true") {
        return;
      }

      elemento.dataset.navegacionConfigurada = "true";

      elemento.addEventListener("click", (evento) => {
        if (
          elemento.tagName === "A" &&
          (
            elemento.target === "_blank" ||
            evento.ctrlKey ||
            evento.metaKey ||
            evento.shiftKey ||
            evento.altKey
          )
        ) {
          return;
        }

        marcarRetrocesoPendiente(destino);

        if (elemento.tagName !== "A") {
          window.location.href = destino;
        }
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

  function prepararDestinoCanonicoDinamico(evento) {
    const origen = evento.target;
    if (!(origen instanceof Element)) return;

    const control = origen.closest("a[href], [data-url]");
    if (!control) return;

    if (control.hasAttribute("data-url")) {
      const valor = control.dataset.url;

      if (esDestinoAcademiaCanonicoFueraEntorno(valor)) {
        const ruta = normalizarRutaInterna(valor);
        if (ruta) control.dataset.url = ruta;
      }
    }

    if (control.tagName !== "A") return;

    const href = control.getAttribute("href");
    if (!esDestinoAcademiaCanonicoFueraEntorno(href)) return;

    const ruta = normalizarRutaInterna(href);
    if (!ruta) return;

    control.setAttribute(
      "href",
      construirUrlConRetorno(ruta, obtenerRutaActual())
    );
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
    const destino = obtenerRutaRetorno(rutaAlternativa);
    marcarRetrocesoPendiente(destino);
    window.location.href = destino;
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

  document.addEventListener(
    "click",
    prepararDestinoCanonicoDinamico,
    true
  );

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