/**
 * Academia Gloria Valentina
 * Modelo de datos · Baúl del Alumno · v1
 *
 * El Baúl conserva contenidos e ideas de valor para la Persona Activa.
 * No genera Misiones, evidencias, estadísticas ni recompensas.
 */

export const TIPOS_BAUL = Object.freeze([
  Object.freeze({ id: "video", icono: "🎬", etiqueta: "Vídeo" }),
  Object.freeze({ id: "articulo", icono: "📰", etiqueta: "Artículo" }),
  Object.freeze({ id: "audio", icono: "🎧", etiqueta: "Audio / Podcast" }),
  Object.freeze({ id: "documento", icono: "📄", etiqueta: "Documento" }),
  Object.freeze({ id: "imagen", icono: "🖼️", etiqueta: "Imagen" }),
  Object.freeze({ id: "libro", icono: "📚", etiqueta: "Libro / Lectura" }),
  Object.freeze({ id: "idea", icono: "💡", etiqueta: "Idea" }),
  Object.freeze({ id: "frase", icono: "💬", etiqueta: "Frase / Mensaje" }),
  Object.freeze({ id: "web", icono: "🌐", etiqueta: "Recurso web" }),
  Object.freeze({ id: "otro", icono: "⭐", etiqueta: "Otro" })
]);

export const TEMAS_BAUL = Object.freeze([
  Object.freeze({ id: "confianza", etiqueta: "Confianza" }),
  Object.freeze({ id: "autoestima", etiqueta: "Autoestima" }),
  Object.freeze({ id: "amistad", etiqueta: "Amistad" }),
  Object.freeze({ id: "autonomia", etiqueta: "Autonomía" }),
  Object.freeze({ id: "familia", etiqueta: "Familia" }),
  Object.freeze({ id: "aprendizaje", etiqueta: "Aprendizaje" }),
  Object.freeze({ id: "constancia", etiqueta: "Constancia" }),
  Object.freeze({ id: "organizacion", etiqueta: "Organización" }),
  Object.freeze({ id: "valores", etiqueta: "Valores" }),
  Object.freeze({ id: "suenos-proyectos", etiqueta: "Sueños / Proyectos" }),
  Object.freeze({ id: "otro", etiqueta: "Otro" })
]);

export const MAX_ADJUNTO_BAUL_BYTES = 600 * 1024;

const IDS_TIPO = new Set(TIPOS_BAUL.map(item => item.id));
const IDS_TEMA = new Set(TEMAS_BAUL.map(item => item.id));

const MIME_POR_EXTENSION = Object.freeze({
  pdf: new Set(["application/pdf"]),
  doc: new Set(["application/msword"]),
  docx: new Set([
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ]),
  rtf: new Set(["application/rtf", "text/rtf"]),
  odt: new Set(["application/vnd.oasis.opendocument.text"]),
  txt: new Set(["text/plain"]),
  jpg: new Set(["image/jpeg"]),
  jpeg: new Set(["image/jpeg"]),
  png: new Set(["image/png"]),
  webp: new Set(["image/webp"])
});

function texto(valor = "", maximo = 0) {
  const normalizado = String(valor ?? "").replace(/\r\n/g, "\n").trim();
  return maximo > 0 ? normalizado.slice(0, maximo) : normalizado;
}

function temasValidos(temas = []) {
  if (!Array.isArray(temas)) return [];
  return [...new Set(
    temas
      .map(valor => texto(valor).toLowerCase())
      .filter(valor => IDS_TEMA.has(valor))
  )];
}

function enlaceValido(valor = "") {
  const enlace = texto(valor, 2000);
  if (!enlace) return "";

  let url;
  try {
    url = new URL(enlace);
  } catch {
    throw new Error("El enlace asociado no es una URL válida.");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("El enlace debe comenzar por http:// o https://.");
  }

  return url.href;
}

function extensionArchivo(nombre = "") {
  const partes = texto(nombre).toLowerCase().split(".");
  return partes.length > 1 ? partes.pop() : "";
}

export function crearElementoBaul(datos = {}) {
  const titulo = texto(datos.titulo, 180);
  const tipo = texto(datos.tipo).toLowerCase();
  const descripcion = texto(datos.descripcion, 5000);

  if (!titulo) {
    throw new Error("Escribe un título para guardar este contenido.");
  }

  if (!IDS_TIPO.has(tipo)) {
    throw new Error("Selecciona un tipo válido.");
  }

  if (!descripcion) {
    throw new Error("Escribe una descripción o resumen.");
  }

  return {
    schemaVersion: 1,
    titulo,
    tipo,
    temas: temasValidos(datos.temas),
    descripcion,
    mensajeAlumno: texto(datos.mensajeAlumno, 4000),
    enlace: enlaceValido(datos.enlace),
    favorito: Boolean(datos.favorito)
  };
}

export function crearAdjuntoBaul(datos = {}) {
  const nombre = texto(datos.nombre, 240);
  const mimeType = texto(datos.mimeType, 160).toLowerCase();
  const tamano = Number(datos.tamano || 0);
  const dataUrl = texto(datos.dataUrl);

  if (!nombre || !dataUrl) {
    throw new Error("El documento adjunto está incompleto.");
  }

  if (!Number.isFinite(tamano) || tamano <= 0) {
    throw new Error("No se pudo determinar el tamaño del documento adjunto.");
  }

  if (tamano > MAX_ADJUNTO_BAUL_BYTES) {
    throw new Error(
      `El adjunto supera el máximo de ${Math.round(MAX_ADJUNTO_BAUL_BYTES / 1024)} KB.`
    );
  }

  const extension = extensionArchivo(nombre);
  const mimeEsperados = MIME_POR_EXTENSION[extension];

  if (!mimeEsperados || !mimeEsperados.has(mimeType)) {
    throw new Error(
      "El tipo real del archivo no coincide con una extensión permitida en el Baúl."
    );
  }

  const prefijoDataUrl = `data:${mimeType}`;
  if (
    !dataUrl.startsWith(prefijoDataUrl) ||
    dataUrl.length > 900000
  ) {
    throw new Error("El documento adjunto no puede guardarse de forma segura.");
  }

  return {
    schemaVersion: 1,
    nombre,
    mimeType,
    tamano,
    dataUrl
  };
}

export function obtenerTipoBaul(id = "") {
  return TIPOS_BAUL.find(item => item.id === String(id || "").trim()) || TIPOS_BAUL.at(-1);
}

export function obtenerTemaBaul(id = "") {
  return TEMAS_BAUL.find(item => item.id === String(id || "").trim()) || null;
}
