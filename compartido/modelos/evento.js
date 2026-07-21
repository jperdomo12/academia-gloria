export function crearEvento(datos = {}) {
  const titulo = String(datos.titulo || "").trim();
  const fecha = String(datos.fecha || "").trim();

  if (!titulo) {
    throw new Error("El evento necesita un título.");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    throw new Error("La fecha no es válida.");
  }

  return {
    titulo,
    fecha,
    anio: Number(datos.anio || fecha.slice(0, 4)),
    categoria: String(datos.categoria || "Especial"),
    icono: String(datos.icono || "⭐"),
    nota: String(datos.nota || "").trim(),
    completado: Boolean(datos.completado)
  };
}
