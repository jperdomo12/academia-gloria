/**
 * Academia Gloria Valentina
 * Modelo de datos · Bitácora de Acompañamiento · V1
 *
 * La Bitácora conserva aportaciones humanas sobre una Persona Activa.
 * No genera Misiones, evidencias, diagnósticos, estadísticas ni recompensas.
 */

export const TIPOS_BITACORA = Object.freeze([
  Object.freeze({ id: "observacion", icono: "👀", etiqueta: "Observación" }),
  Object.freeze({ id: "recomendacion", icono: "💡", etiqueta: "Recomendación" }),
  Object.freeze({ id: "duda", icono: "❓", etiqueta: "Duda" }),
  Object.freeze({ id: "sugerencia", icono: "🌱", etiqueta: "Sugerencia" }),
  Object.freeze({ id: "acuerdo", icono: "🤝", etiqueta: "Acuerdo" }),
  Object.freeze({ id: "seguimiento", icono: "🔄", etiqueta: "Seguimiento" }),
  Object.freeze({ id: "mensaje", icono: "💬", etiqueta: "Mensaje" }),
  Object.freeze({ id: "asunto-revisar", icono: "⚠️", etiqueta: "Asunto a revisar" }),
  Object.freeze({ id: "otros", icono: "🧩", etiqueta: "Otros" })
]);

export const DESTINOS_BITACORA = Object.freeze([
  Object.freeze({ id: "general", icono: "🌍", etiqueta: "Todos / General" }),
  Object.freeze({ id: "alumno", icono: "🎓", etiqueta: "Alumno" }),
  Object.freeze({ id: "familia", icono: "🏠", etiqueta: "Familia / Padres" }),
  Object.freeze({ id: "profesionales", icono: "👥", etiqueta: "Profesionales" }),
  Object.freeze({ id: "familia-profesionales", icono: "🤝", etiqueta: "Familia + profesionales" }),
  Object.freeze({ id: "otros", icono: "🧩", etiqueta: "Otros" })
]);

export const VISIBILIDADES_BITACORA = Object.freeze([
  Object.freeze({
    id: "solo-autor",
    icono: "🔒",
    etiqueta: "Solo autor",
    visibleParaPersonaActiva: false
  }),
  Object.freeze({
    id: "adultos-profesionales",
    icono: "👥",
    etiqueta: "Familia y profesionales",
    visibleParaPersonaActiva: false
  }),
  Object.freeze({
    id: "todos-relacionados",
    icono: "🌈",
    etiqueta: "Alumno + familia + profesionales",
    visibleParaPersonaActiva: true
  }),
  Object.freeze({
    id: "otros",
    icono: "🧩",
    etiqueta: "Otros",
    // Seguridad conservadora de V1: una visibilidad no modelada no se expone.
    visibleParaPersonaActiva: false
  })
]);

const IDS_TIPO = new Set(TIPOS_BITACORA.map(item => item.id));
const IDS_DESTINO = new Set(DESTINOS_BITACORA.map(item => item.id));
const IDS_VISIBILIDAD = new Set(VISIBILIDADES_BITACORA.map(item => item.id));

function texto(valor = "", maximo = 0) {
  const normalizado = String(valor ?? "").replace(/\r\n/g, "\n").trim();
  return maximo > 0 ? normalizado.slice(0, maximo) : normalizado;
}

function catalogoPorId(catalogo, id = "") {
  const buscado = texto(id).toLowerCase();
  return catalogo.find(item => item.id === buscado) || catalogo.at(-1);
}

function detalleOtros(valor, seleccionado, nombreCampo) {
  const detalle = texto(valor, 180);
  if (seleccionado === "otros" && !detalle) {
    throw new Error(`Especifica ${nombreCampo} cuando seleccionas “Otros”.`);
  }
  return seleccionado === "otros" ? detalle : "";
}

export function crearEntradaBitacora(datos = {}) {
  const titulo = texto(datos.titulo, 180);
  const mensaje = texto(datos.mensaje, 6000);
  const tipo = texto(datos.tipo).toLowerCase();
  const destino = texto(datos.destino).toLowerCase();
  const visibilidad = texto(datos.visibilidad).toLowerCase();

  if (!titulo) throw new Error("Escribe un título para la entrada.");
  if (!mensaje) throw new Error("Escribe el mensaje de la entrada.");
  if (!IDS_TIPO.has(tipo)) throw new Error("Selecciona un tipo válido.");
  if (!IDS_DESTINO.has(destino)) throw new Error("Selecciona un destino válido.");
  if (!IDS_VISIBILIDAD.has(visibilidad)) {
    throw new Error("Selecciona una visibilidad válida.");
  }

  const visibilidadDef = obtenerVisibilidadBitacora(visibilidad);

  return {
    schemaVersion: 1,
    tipo,
    tipoOtros: detalleOtros(datos.tipoOtros, tipo, "el tipo"),
    titulo,
    mensaje,
    destino,
    destinoOtros: detalleOtros(datos.destinoOtros, destino, "el destino"),
    visibilidad,
    visibilidadOtros: detalleOtros(
      datos.visibilidadOtros,
      visibilidad,
      "la visibilidad"
    ),
    visibleParaPersonaActiva: visibilidadDef.visibleParaPersonaActiva === true,
    requiereRespuesta: Boolean(datos.requiereRespuesta),
    estado: "abierta"
  };
}

export function crearRespuestaBitacora(valor = "") {
  const respuesta = texto(valor, 4000);
  if (!respuesta) throw new Error("Escribe una respuesta antes de guardarla.");
  return respuesta;
}

export function obtenerTipoBitacora(id = "") {
  return catalogoPorId(TIPOS_BITACORA, id);
}

export function obtenerDestinoBitacora(id = "") {
  return catalogoPorId(DESTINOS_BITACORA, id);
}

export function obtenerVisibilidadBitacora(id = "") {
  return catalogoPorId(VISIBILIDADES_BITACORA, id);
}
