/* Academia Gloria Valentina · Acceso común a Trabajo realizado
 *
 * Contrato funcional:
 * - un único acceso "Ver trabajo" desde cualquier caller;
 * - el caller aporta la Misión y la ruta de retorno;
 * - la Persona Activa se resuelve dentro de las APIs/visores existentes;
 * - todo acceso se abre en modo de consulta y nunca debe crear evidencia;
 * - se conserva un visor especializado solo cuando aporta una lectura
 *   histórica más rica sin duplicar el contrato de acceso.
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

function tieneSesionAcademica(evidencias = []) {
  return evidencias.some(evidencia =>
    texto(evidencia.tipo) === "sesion_academica" ||
    texto(evidencia.origen) === "sesion_academica"
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

  /*
   * Detectives ya dispone de un visor de Misión completo que reconstruye el
   * proceso matemático historia por historia. Se conserva como visor rico,
   * pero recibe el mismo contrato modo=consulta + misionId + volver.
   */
  if (texto(mision.modulo) === "detectives") {
    return completarConsulta(
      urlAcademia("mi-universo/aventuras-matematicas/detectives/trabajo-realizado.html"),
      id,
      volver
    );
  }

  const evidencias = await Academia.tareas.leerEvidencias(id);

  /*
   * Un Repaso académico solo utiliza el visor de Resultado académico cuando
   * existe realmente una sesión académica histórica. Algunas actividades
   * externas (por ejemplo, ciertos repasos de 5.º) completan la Misión pero no
   * generan evidencia digital; esas Misiones se muestran en el visor general,
   * igual que cualquier Misión sin resultado digital guardado.
   */
  if (tieneSesionAcademica(evidencias)) {
    return completarConsulta(
      urlAcademia("mi-universo/mis-tareas/resultado-academico.html"),
      id,
      volver
    );
  }

  /*
   * Visor canónico para Lectura, Pronunciación, Semillas, Biblioteca,
   * Repasos sin sesión digital y cualquier evidencia futura que no requiera
   * todavía un visor especializado. La selección se realiza por Misión
   * completa, nunca escogiendo arbitrariamente la primera evidencia.
   */
  return completarConsulta(
    urlAcademia("mi-universo/mis-tareas/trabajo-realizado.html"),
    id,
    volver
  );
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
