/* Acordeón existente de Observaciones: compartido por Lectura, Detectives y Dictado. */
const $ = id => document.getElementById(id);
const escapar = valor => String(valor ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function crearGrupoRefuerzo({ id, icono, modulo, tema, encabezados = [] }) {
  if ($(id)) return;

  const secciones = encabezados
    .map(encabezadoId => $(encabezadoId)?.closest(".refuerzo-bloque"))
    .filter(Boolean);

  if (!secciones.length) return;

  const primera = secciones[0];
  const grupo = document.createElement("details");
  grupo.id = id;
  grupo.className = "grupo-refuerzo superficie";
  grupo.innerHTML = `
    <summary class="grupo-refuerzo__summary">
      <span class="grupo-refuerzo__icono" aria-hidden="true">${escapar(icono)}</span>
      <span class="grupo-refuerzo__texto">
        <strong>${escapar(modulo)}</strong>
        <small>${escapar(tema)}</small>
      </span>
      <span class="grupo-refuerzo__flecha" aria-hidden="true">⌄</span>
    </summary>
    <div class="grupo-refuerzo__contenido"></div>
  `;

  primera.parentElement.insertBefore(grupo, primera);
  const contenido = grupo.querySelector(".grupo-refuerzo__contenido");
  secciones.forEach(seccion => contenido.appendChild(seccion));
}

function configurarAcordeonExclusivo() {
  document.querySelectorAll("#panelRefuerzos .grupo-refuerzo").forEach(grupo => {
    if (grupo.dataset.acordeonExclusivo === "true") return;
    grupo.dataset.acordeonExclusivo = "true";

    grupo.addEventListener("toggle", () => {
      if (!grupo.open) return;
      document.querySelectorAll("#panelRefuerzos .grupo-refuerzo[open]").forEach(otro => {
        if (otro !== grupo) otro.open = false;
      });
    });
  });
}

function crearSubgrupoRefuerzo({ id, icono, titulo, encabezadoId }) {
  if ($(id)) return;

  const seccion = $(encabezadoId)?.closest(".refuerzo-bloque");
  if (!seccion) return;

  const subgrupo = document.createElement("details");
  subgrupo.id = id;
  subgrupo.className = "subgrupo-refuerzo";
  subgrupo.innerHTML = `
    <summary class="subgrupo-refuerzo__summary">
      <span class="subgrupo-refuerzo__icono" aria-hidden="true">${escapar(icono)}</span>
      <strong>${escapar(titulo)}</strong>
      <span class="subgrupo-refuerzo__flecha" aria-hidden="true">⌄</span>
    </summary>
    <div class="subgrupo-refuerzo__contenido"></div>
  `;

  seccion.parentElement.insertBefore(subgrupo, seccion);
  subgrupo.querySelector(".subgrupo-refuerzo__contenido").appendChild(seccion);
}

function configurarSubgruposRefuerzo() {
  crearSubgrupoRefuerzo({
    id: "subgrupoMisionesDetectives",
    icono: "📋",
    titulo: "Misiones preparadas",
    encabezadoId: "tituloMisionesRefuerzoDetectives"
  });

  crearSubgrupoRefuerzo({
    id: "subgrupoSugeridasDetectives",
    icono: "🌱",
    titulo: "Misiones sugeridas",
    encabezadoId: "tituloRefuerzosDetectives"
  });

  crearSubgrupoRefuerzo({
    id: "subgrupoMisionesLectura",
    icono: "📋",
    titulo: "Misiones preparadas",
    encabezadoId: "tituloMisionesPronunciacion"
  });

  crearSubgrupoRefuerzo({
    id: "subgrupoSugeridasLectura",
    icono: "🌱",
    titulo: "Misiones sugeridas",
    encabezadoId: "tituloPalabrasSugeridas"
  });
}

export function agruparPanelRefuerzos() {
  crearGrupoRefuerzo({
    id: "grupoRefuerzoDetectives",
    icono: "🧩",
    modulo: "Aventuras Matemáticas",
    tema: "Detectives de Problemas · propuestas de refuerzo",
    encabezados: [
      "tituloMisionesRefuerzoDetectives",
      "tituloRefuerzosDetectives"
    ]
  });

  crearGrupoRefuerzo({
    id: "grupoRefuerzoLectura",
    icono: "📖",
    modulo: "Mi Rincón de Lectura",
    tema: "Pronunciación · palabras sugeridas para reforzar",
    encabezados: [
      "tituloMisionesPronunciacion",
      "tituloPalabrasSugeridas"
    ]
  });

  crearGrupoRefuerzo({
    id: "grupoRefuerzoDictado",
    icono: "✏️",
    modulo: "Mi Rincón de Dictado",
    tema: "Autoevaluación · palabras y frases para practicar",
    encabezados: ["tituloMisionesDictado", "tituloDictadosFamilia"]
  });
  crearSubgrupoRefuerzo({ id: "subgrupoMisionesDictado", icono: "📋",
    titulo: "Misiones preparadas", encabezadoId: "tituloMisionesDictado" });
  crearSubgrupoRefuerzo({ id: "subgrupoSugeridasDictado", icono: "🌱",
    titulo: "Misiones sugeridas", encabezadoId: "tituloDictadosFamilia" });
  configurarSubgruposRefuerzo();
  configurarAcordeonExclusivo();
}
