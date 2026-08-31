/* Academia Gloria Valentina · Gestión de Misiones · Preparación de Misión libre */

import "./filtros-misiones.js";

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

  sincronizarTrasFormulario();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
