/* Academia Gloria Valentina · Trabajo realizado · Capa de presentación
 *
 * Mantiene la terminología técnica de evidencia dentro del motor, pero la
 * interfaz utiliza el lenguaje funcional "trabajo realizado / actividades".
 * También aplica el patrón Top-Down de la especificación: cada actividad se
 * presenta inicialmente resumida y su detalle histórico se abre bajo demanda.
 *
 * Esta capa no lee ni escribe Firestore y no modifica el contenido histórico.
 */

const $ = id => document.getElementById(id);
let actualizacionPendiente = false;

function reemplazarTexto(elemento, reemplazos = []) {
  if (!elemento) return;

  let valor = String(elemento.textContent || "");
  let nuevo = valor;

  reemplazos.forEach(([patron, sustitucion]) => {
    nuevo = nuevo.replace(patron, sustitucion);
  });

  if (nuevo !== valor) elemento.textContent = nuevo;
}

function humanizarResumen() {
  reemplazarTexto($("progresoMision"), [
    [/\bevidencias objetivo\b/gi, "actividades registradas"],
    [/\b1 evidencia guardada\b/gi, "1 actividad guardada"],
    [/\b(\d+) evidencias guardadas\b/gi, "$1 actividades guardadas"]
  ]);

  reemplazarTexto($("contadorEvidencias"), [
    [/\b1 evidencia\b/gi, "1 actividad"],
    [/\b(\d+) evidencias\b/gi, "$1 actividades"]
  ]);

  const textoActividades = $("textoEvidencias");
  if (textoActividades) {
    const actual = String(textoActividades.textContent || "").trim();
    if (/todavía no tiene evidencias guardadas/i.test(actual)) {
      textoActividades.textContent =
        "Todavía no hay trabajo registrado para esta Misión.";
    }
  }

  document.querySelectorAll("#datosMision .trabajo-vacio").forEach(elemento => {
    reemplazarTexto(elemento, [
      [/interpretar sus evidencias/gi, "interpretar su trabajo"]
    ]);
  });
}

function humanizarDetalle(tarjeta) {
  tarjeta.querySelectorAll(".evidencia-bloque h4").forEach(titulo => {
    reemplazarTexto(titulo, [
      [/Datos de la evidencia/gi, "Datos de la actividad"],
      [/Evidencia disponible/gi, "Registro disponible"]
    ]);
  });

  tarjeta.querySelectorAll(".trabajo-vacio").forEach(elemento => {
    reemplazarTexto(elemento, [
      [/Esta Misión todavía no tiene evidencias guardadas\.?/gi,
        "Todavía no hay trabajo registrado para esta Misión."],
      [/\bevidencia\b/gi, "registro"]
    ]);
  });
}

function prepararBadges(resumen) {
  const contenedor = resumen.querySelector(".evidencia-card__badges");
  if (!contenedor) return;

  contenedor.innerHTML = `
    <span class="evidencia-badge">✅ Actividad guardada</span>
    <span class="evidencia-badge" data-estado-detalle>Ver detalle ↓</span>
  `;
}

function sincronizarEstadoDetalle(detalle) {
  const estado = detalle.querySelector("[data-estado-detalle]");
  if (!estado) return;
  estado.textContent = detalle.open ? "Ocultar detalle ↑" : "Ver detalle ↓";
}

function convertirTarjeta(tarjeta) {
  if (!(tarjeta instanceof HTMLElement)) return null;
  if (tarjeta.tagName !== "ARTICLE") return tarjeta;

  const cabecera = tarjeta.querySelector(":scope > .evidencia-card__cabecera");
  const cuerpo = tarjeta.querySelector(":scope > .evidencia-card__cuerpo");
  if (!cabecera || !cuerpo) return tarjeta;

  humanizarDetalle(tarjeta);

  const detalle = document.createElement("details");
  detalle.className = tarjeta.className;
  detalle.dataset.trabajoActividad = "true";

  const resumen = document.createElement("summary");
  resumen.className = cabecera.className;
  resumen.setAttribute("aria-label", "Abrir detalle de la actividad");

  while (cabecera.firstChild) resumen.appendChild(cabecera.firstChild);
  prepararBadges(resumen);

  detalle.append(resumen, cuerpo);
  detalle.addEventListener("toggle", () => sincronizarEstadoDetalle(detalle));
  sincronizarEstadoDetalle(detalle);

  tarjeta.replaceWith(detalle);
  return detalle;
}

function humanizarLista() {
  const lista = $("listaEvidencias");
  if (!lista) return;

  lista.querySelectorAll("article.evidencia-card").forEach(convertirTarjeta);

  lista.querySelectorAll("details.evidencia-card").forEach(detalle => {
    humanizarDetalle(detalle);
    sincronizarEstadoDetalle(detalle);
  });

  lista.querySelectorAll(":scope > .trabajo-vacio").forEach(elemento => {
    reemplazarTexto(elemento, [
      [/Esta Misión todavía no tiene evidencias guardadas\.?/gi,
        "Todavía no hay trabajo registrado para esta Misión."]
    ]);
  });
}

function aplicarPresentacion() {
  actualizacionPendiente = false;
  humanizarResumen();
  humanizarLista();
}

function programarActualizacion() {
  if (actualizacionPendiente) return;
  actualizacionPendiente = true;
  window.requestAnimationFrame(aplicarPresentacion);
}

function instalar() {
  aplicarPresentacion();

  const contenido = $("contenidoTrabajo");
  if (!contenido) return;

  const observador = new MutationObserver(programarActualizacion);
  observador.observe(contenido, {
    childList: true,
    subtree: true,
    characterData: true
  });

  window.addEventListener("beforeunload", () => observador.disconnect(), {
    once:true
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", instalar, { once:true });
} else {
  instalar();
}
