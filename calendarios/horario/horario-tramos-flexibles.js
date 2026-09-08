/*
 * Academia Gloria Valentina
 * Horario de clases · edición de tramos exactos
 *
 * Complementa el editor V1 para que cada nuevo bloque se cree con la hora
 * exacta indicada por el usuario, sin asumir duraciones fijas de 60 minutos.
 */

const $ = id => document.getElementById(id);

function minutos(valor = "00:00") {
  const [hora, minuto] = String(valor).split(":").map(Number);
  return (hora * 60) + minuto;
}

function sumarMinutos(valor = "09:00", cantidad = 60) {
  const total = Math.min((23 * 60) + 59, minutos(valor) + cantidad);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function mostrarError(mensaje) {
  const elemento = $("mensajeHorario");
  if (!elemento) return;

  elemento.textContent = mensaje;
  elemento.className = "horario-mensaje horario-mensaje--error";
  elemento.hidden = false;

  window.setTimeout(() => {
    elemento.hidden = true;
  }, 4200);
}

function tramosExistentes() {
  return [...document.querySelectorAll("#editorTramos .editor-tramo")]
    .map(fila => {
      const inicio = fila.querySelector("[data-tramo-inicio]")?.value || "";
      const fin = fila.querySelector("[data-tramo-fin]")?.value || "";
      return inicio && fin ? { inicio, fin } : null;
    })
    .filter(Boolean);
}

function seSolapa(inicio, fin) {
  const inicioMin = minutos(inicio);
  const finMin = minutos(fin);

  return tramosExistentes().some(tramo =>
    inicioMin < minutos(tramo.fin) && finMin > minutos(tramo.inicio)
  );
}

function validarNuevoTramo(inicio, fin) {
  if (!inicio || !fin) {
    return "Indica la hora exacta de inicio y fin del tramo.";
  }

  if (minutos(fin) <= minutos(inicio)) {
    return "La hora de fin debe ser posterior a la hora de inicio.";
  }

  if (seSolapa(inicio, fin)) {
    return "Ese tramo se solapa con otro ya creado. Ajusta la hora de inicio o fin.";
  }

  return "";
}

function aplicarHoraExactaAlUltimoTramo(inicio, fin) {
  const filas = [...document.querySelectorAll("#editorTramos .editor-tramo")];
  const ultima = filas.at(-1);
  if (!ultima) return;

  const campoInicio = ultima.querySelector("[data-tramo-inicio]");
  const campoFin = ultima.querySelector("[data-tramo-fin]");
  if (!campoInicio || !campoFin) return;

  campoInicio.value = inicio;
  campoInicio.dispatchEvent(new Event("change", { bubbles: true }));

  campoFin.value = fin;
  campoFin.dispatchEvent(new Event("change", { bubbles: true }));
}

function prepararSiguienteTramo(finAnterior) {
  const inicio = $("nuevoTramoInicio");
  const fin = $("nuevoTramoFin");
  if (!inicio || !fin) return;

  inicio.value = finAnterior;
  fin.value = sumarMinutos(finAnterior, 60);
}

function iniciarTramosFlexibles() {
  const boton = $("agregarTramo");
  const campoInicio = $("nuevoTramoInicio");
  const campoFin = $("nuevoTramoFin");

  if (!boton || !campoInicio || !campoFin) return;

  let tramoPendiente = null;

  /*
   * Captura: valida antes de que el editor base cree el nuevo bloque.
   * Si es válido, dejamos continuar el comportamiento existente.
   */
  boton.addEventListener("click", evento => {
    const inicio = campoInicio.value;
    const fin = campoFin.value;
    const error = validarNuevoTramo(inicio, fin);

    if (error) {
      evento.preventDefault();
      evento.stopImmediatePropagation();
      mostrarError(error);
      tramoPendiente = null;
      return;
    }

    tramoPendiente = { inicio, fin };
  }, true);

  /*
   * Burbuja: el editor base ya creó el bloque y sus celdas. Sustituimos
   * inmediatamente la sugerencia automática por las horas exactas elegidas.
   */
  boton.addEventListener("click", () => {
    if (!tramoPendiente) return;

    aplicarHoraExactaAlUltimoTramo(
      tramoPendiente.inicio,
      tramoPendiente.fin
    );
    prepararSiguienteTramo(tramoPendiente.fin);
    tramoPendiente = null;
  });
}

iniciarTramosFlexibles();
