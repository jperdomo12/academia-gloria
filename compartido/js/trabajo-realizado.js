/* Academia Gloria Valentina · Acceso común a Trabajo realizado
 *
 * Contrato funcional:
 * - un único acceso "Ver trabajo" desde cualquier caller;
 * - el caller aporta la Misión y la ruta de retorno;
 * - la Persona Activa se resuelve dentro de las APIs/visores existentes;
 * - los visores se abren en modo de consulta y nunca deben crear evidencia;
 * - se reutiliza el visor especializado de cada módulo cuando existe.
 */

import { Academia } from "../api/academia.js";

const BASE_ACADEMIA = new URL("../../", import.meta.url);

function texto(valor = "") {
  return String(valor ?? "").trim();
}

function rutaRetornoSegura(valor = "") {
  const candidata = texto(valor) ||
    `${window.location.pathname}${window.location.search}${window.location.hash}`;

  try {
    const destino = new URL(candidata, window.location.href);
    if (destino.origin !== window.location.origin) return "";
    return `${destino.pathname}${destino.search}${destino.hash}`;
  } catch {
    return "";
  }
}

function urlAcademia(ruta) {
  return new URL(String(ruta || "").replace(/^\/+/, ""), BASE_ACADEMIA);
}

function completarConsulta(url, misionId, volver = "") {
  url.searchParams.set("misionId", misionId);
  url.searchParams.set("modo", "consulta");

  const retorno = rutaRetornoSegura(volver);
  if (retorno) url.searchParams.set("volver", retorno);

  return url.href;
}

function esRepasoAcademico(tarea = {}, evidencias = []) {
  if (texto(tarea.tipo) === "repaso_academico") return true;

  return evidencias.some(evidencia =>
    texto(evidencia.tipo) === "sesion_academica" ||
    texto(evidencia.origen) === "sesion_academica"
  );
}

function evidenciaModulo(evidencias = [], modulo = "") {
  return evidencias.find(item => texto(item.modulo) === modulo) || null;
}

function idBibliotecaDesdeEvidencia(evidencia = {}) {
  return texto(
    evidencia.actividadId ||
    evidencia.libroId ||
    evidencia.atributos?.libroId
  );
}

async function resolverUrlTrabajoRealizado(
  misionId,
  {
    tarea = null,
    volver = ""
  } = {}
) {
  const id = texto(misionId);
  if (!id) throw new Error("Falta el identificador de la Misión.");

  const mision = tarea?.id === id
    ? tarea
    : await Academia.tareas.obtener(id);

  if (!mision) {
    throw new Error("No se encontró la Misión para la Persona Activa.");
  }

  const modulo = texto(mision.modulo);

  // Las rutas por módulo no necesitan inspeccionar evidencias para abrir
  // el visor de la Misión completa.
  if (modulo === "detectives") {
    return completarConsulta(
      urlAcademia("mi-universo/aventuras-matematicas/detectives/trabajo-realizado.html"),
      id,
      volver
    );
  }

  if (modulo === "rincon-lectura") {
    const url = urlAcademia("mi-universo/rincon-lectura/");
    url.searchParams.set("vista", "historial");
    return completarConsulta(url, id, volver);
  }

  if (modulo === "creciendo-por-dentro") {
    const url = urlAcademia("mi-universo/creciendo-por-dentro/");
    url.searchParams.set("vista", "historial");
    return completarConsulta(url, id, volver);
  }

  const evidencias = await Academia.tareas.leerEvidencias(id);

  if (esRepasoAcademico(mision, evidencias)) {
    return completarConsulta(
      urlAcademia("mi-universo/mis-tareas/resultado-academico.html"),
      id,
      volver
    );
  }

  if (modulo === "biblioteca") {
    const evidencia = evidenciaModulo(evidencias, "biblioteca");
    const libroId = idBibliotecaDesdeEvidencia(evidencia || {});
    const url = urlAcademia("mi-universo/biblioteca/");
    if (libroId) url.searchParams.set("libroId", libroId);
    return completarConsulta(url, id, volver);
  }

  // Compatibilidad con motores que ya registran un destino histórico propio.
  // Se usa únicamente como último recurso; los módulos con múltiples evidencias
  // deben declarar una ruta de Misión completa arriba, no escoger una evidencia.
  const evidenciaConDestino = evidencias.find(item => texto(item.destinoRevision));
  if (evidenciaConDestino) {
    const url = new URL(evidenciaConDestino.destinoRevision, window.location.href);
    return completarConsulta(url, id, volver);
  }

  throw new Error("Esta Misión todavía no dispone de un visor de trabajo realizado.");
}

async function abrirTrabajoRealizado(misionId, opciones = {}) {
  const destino = await resolverUrlTrabajoRealizado(misionId, opciones);
  window.location.href = destino;
  return destino;
}

export {
  resolverUrlTrabajoRealizado,
  abrirTrabajoRealizado
};

export const TrabajoRealizado = Object.freeze({
  resolverUrl: resolverUrlTrabajoRealizado,
  abrir: abrirTrabajoRealizado
});
