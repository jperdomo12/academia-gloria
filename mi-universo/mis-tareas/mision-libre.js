/* Academia Gloria Valentina · Gestión de Misiones · Preparación de Misión libre */

const TIPO_MISION_LIBRE = "tarea_libre";
const MODULO_LIBRE = "libre";

function controles() {
  return {
    tipo: document.getElementById("tipo"),
    modulo: document.getElementById("modulo")
  };
}

function sincronizarMisionLibre() {
  const { tipo, modulo } = controles();
  if (!tipo || !modulo) return;

  const esLibre = tipo.value === TIPO_MISION_LIBRE;

  if (esLibre && modulo.value !== MODULO_LIBRE) {
    modulo.value = MODULO_LIBRE;
    modulo.dispatchEvent(new Event("change", { bubbles: true }));
  }

  /*
   * Una Misión libre no está asociada a un motor de la Academia.
   * Dejamos visible "Actividad fuera de la Academia" para que el
   * administrador entienda el contrato, pero evitamos asociaciones
   * accidentales con Lectura, Detectives, Semillas o Biblioteca.
   */
  modulo.disabled = esLibre;
  modulo.setAttribute("aria-disabled", esLibre ? "true" : "false");
  modulo.title = esLibre
    ? "Las Misiones libres se realizan sin una actividad asociada de la Academia."
    : "";
}

function sincronizarDespuesDeCarga() {
  window.setTimeout(sincronizarMisionLibre, 0);
}

function iniciar() {
  const { tipo } = controles();
  if (!tipo) return;

  tipo.addEventListener("change", sincronizarMisionLibre);

  document.getElementById("formTarea")?.addEventListener(
    "reset",
    sincronizarDespuesDeCarga
  );

  document.addEventListener("click", event => {
    if (event.target.closest?.('[data-action="edit"], [data-action="view"]')) {
      sincronizarDespuesDeCarga();
    }
  });

  sincronizarMisionLibre();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
