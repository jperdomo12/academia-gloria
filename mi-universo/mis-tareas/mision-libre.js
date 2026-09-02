/* Academia Gloria Valentina · Gestión de Misiones · Preparación de Misión libre */

import "./listado-misiones.js";
import { abrirTrabajoRealizado } from "../../compartido/js/trabajo-realizado.js";

const TIPO_MISION_LIBRE = "tarea_libre";
const MODULO_LIBRE = "libre";

function controles() {
  return {
    tipo: document.getElementById("tipo"),
    modulo: document.getElementById("modulo")
  };
}

function esMisionLibre() {
  return controles().tipo?.value === TIPO_MISION_LIBRE;
}

function aplicarContratoMisionLibre() {
  const { tipo, modulo } = controles();
  if (!tipo || !modulo) return;

  const libre = tipo.value === TIPO_MISION_LIBRE;

  if (libre && modulo.value !== MODULO_LIBRE) {
    modulo.value = MODULO_LIBRE;
    modulo.dispatchEvent(new Event("change", { bubbles: true }));
  }

  /*
   * Una Misión libre no está asociada a un motor de la Academia.
   * Mostramos explícitamente "Actividad fuera de la Academia" y bloqueamos
   * el selector para impedir que conserve por accidente Lectura, Detectives,
   * Semillas o Biblioteca.
   */
  modulo.disabled = libre;
  modulo.setAttribute("aria-disabled", libre ? "true" : "false");
  modulo.title = libre
    ? "Las Misiones libres se realizan sin una actividad asociada de la Academia."
    : "";
}

function sincronizarTrasFormulario() {
  /*
   * El formulario principal también escucha cambios de Tipo y Módulo.
   * Ejecutamos una segunda comprobación al final del ciclo para que el
   * contrato de Misión libre no dependa del orden de los listeners.
   */
  aplicarContratoMisionLibre();
  window.setTimeout(aplicarContratoMisionLibre, 0);
  window.setTimeout(aplicarContratoMisionLibre, 50);
}

function normalizarBotonesTrabajo(raiz = document) {
  const botones = [];

  if (raiz instanceof Element && raiz.matches('[data-action="evidence"]')) {
    botones.push(raiz);
  }

  raiz.querySelectorAll?.('[data-action="evidence"]').forEach(boton => {
    botones.push(boton);
  });

  botones.forEach(boton => {
    boton.textContent = "👁️ Ver trabajo";
    boton.setAttribute("aria-label", "Abrir trabajo realizado en modo consulta");
  });
}

async function abrirTrabajoDesdeGestion(boton) {
  const misionId = String(boton.dataset.id || "").trim();
  if (!misionId) return;

  const textoOriginal = boton.textContent;
  boton.disabled = true;
  boton.textContent = "Abriendo…";

  try {
    await abrirTrabajoRealizado(misionId, {
      volver: `${window.location.pathname}${window.location.search}${window.location.hash}`
    });
  } catch (error) {
    console.error("No se pudo abrir Trabajo realizado desde Gestión de Misiones.", error);
    window.alert(
      "No pudimos abrir el trabajo realizado en este momento.\n" +
      `Razón: ${error.message || "Error no identificado"}`
    );
  } finally {
    if (boton.isConnected) {
      boton.disabled = false;
      boton.textContent = textoOriginal;
    }
  }
}

function instalarAccesoComunTrabajo() {
  normalizarBotonesTrabajo(document);

  const lista = document.getElementById("listaTareas");
  if (lista) {
    new MutationObserver(registros => {
      registros.forEach(registro => {
        registro.addedNodes.forEach(nodo => {
          if (nodo instanceof Element) normalizarBotonesTrabajo(nodo);
        });
      });
    }).observe(lista, {
      childList: true,
      subtree: true
    });
  }

  /*
   * Captura antes del listener legacy de mis-tareas.js. El comportamiento
   * anterior de desplegar evidencias dentro de la tarjeta permanece intacto
   * en el código base, pero este producto usa un único visor reutilizable.
   */
  document.addEventListener("click", event => {
    const boton = event.target.closest?.('[data-action="evidence"]');
    if (!boton) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    abrirTrabajoDesdeGestion(boton);
  }, true);
}

function iniciar() {
  const { tipo, modulo } = controles();
  if (!tipo || !modulo) return;

  tipo.addEventListener("change", sincronizarTrasFormulario);
  tipo.addEventListener("input", sincronizarTrasFormulario);

  /* Protección adicional: si otra lógica intenta cambiar el módulo mientras
     el Tipo sigue siendo Misión libre, se restaura inmediatamente. */
  modulo.addEventListener("change", () => {
    if (esMisionLibre() && modulo.value !== MODULO_LIBRE) {
      sincronizarTrasFormulario();
    }
  });

  document.getElementById("formTarea")?.addEventListener("reset", () => {
    window.setTimeout(sincronizarTrasFormulario, 0);
  });

  document.addEventListener("click", event => {
    if (event.target.closest?.('[data-action="edit"], [data-action="view"]')) {
      window.setTimeout(sincronizarTrasFormulario, 80);
    }
  });

  instalarAccesoComunTrabajo();
  sincronizarTrasFormulario();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
