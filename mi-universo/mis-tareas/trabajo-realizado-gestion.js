/* Academia Gloria Valentina · Gestión de Misiones · Acceso común a Trabajo realizado */

import { abrirTrabajoRealizado } from "../../compartido/js/trabajo-realizado.js";

function normalizarBotones(raiz = document) {
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

async function abrirDesdeGestion(boton) {
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

function instalar() {
  normalizarBotones(document);

  const lista = document.getElementById("listaTareas");
  if (lista) {
    new MutationObserver(registros => {
      registros.forEach(registro => {
        registro.addedNodes.forEach(nodo => {
          if (nodo instanceof Element) normalizarBotones(nodo);
        });
      });
    }).observe(lista, {
      childList: true,
      subtree: true
    });
  }

  /*
   * El listener usa captura para sustituir únicamente la acción legacy que
   * expandía evidencias dentro de la tarjeta. El resto de Gestión de Misiones
   * permanece sin cambios.
   */
  document.addEventListener("click", event => {
    const boton = event.target.closest?.('[data-action="evidence"]');
    if (!boton) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    abrirDesdeGestion(boton);
  }, true);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", instalar, { once:true });
} else {
  instalar();
}
