/* Selección del Product Owner. Rutas relativas a este catálogo, no al navegador. */
export const MATERIALES_PLAN = Object.freeze([
  {
    id: "science-nutricion-2026-10-19",
    inicio: "2026-10-19",
    fin: "2026-10-26",
    materia: "Science",
    tema: "Nutrición",
    temaId: "6-science-nutricion",
    icono: "🔬",
    titulo: "El viaje de la nutrición",
    descripcion: "Lectura + tres actividades en cuaderno",
    fuente: "6_PS_ANS_Nutrición.pdf",
    procedencia: "Material del colegio · Plan Semanal",
    ruta: "../science/nutricion/plan-semanal/",
    rutaTema: "../science/nutricion/"
  }
]);

export function urlMaterial(ruta) {
  return new URL(ruta, import.meta.url).href;
}

export function fechaMadrid(instante = new Date()) {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(instante);
  const valor = tipo => partes.find(p => p.type === tipo).value;
  return `${valor("year")}-${valor("month")}-${valor("day")}`;
}

export function etiquetaSemana({ inicio, fin }) {
  const fecha = valor => new Date(`${valor}T12:00:00Z`);
  const formato = new Intl.DateTimeFormat("es-ES", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
  });
  return formato.formatRange(fecha(inicio), fecha(fin));
}

export function organizarSemanas(materiales, hoy = fechaMadrid()) {
  const grupos = new Map();
  for (const material of materiales) {
    const clave = `${material.inicio}/${material.fin}`;
    if (!grupos.has(clave)) grupos.set(clave, { inicio: material.inicio, fin: material.fin, materiales: [] });
    grupos.get(clave).materiales.push(material);
  }
  const semanas = [...grupos.values()].sort((a, b) => b.inicio.localeCompare(a.inicio) || b.fin.localeCompare(a.fin));
  return {
    actuales: semanas.filter(s => s.inicio <= hoy && s.fin >= hoy),
    anteriores: semanas.filter(s => s.fin < hoy),
    proximas: semanas.filter(s => s.inicio > hoy).reverse()
  };
}
