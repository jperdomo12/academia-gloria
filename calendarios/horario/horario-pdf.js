/* ==========================================================
   Academia Gloria Valentina
   Mi horario de clases · PDF de una sola página

   Genera un PDF A4 apaisado real con APIs nativas del navegador.
   No usa CDN, html2canvas ni jsPDF: así evita bloqueos externos
   y garantiza exactamente una página.
   ========================================================== */

const CANVAS_ANCHO = 1684;
const CANVAS_ALTO = 1191;
const PDF_ANCHO_PT = 841.89;
const PDF_ALTO_PT = 595.28;
const DIAS_COLORES = [
  { fondo:"#fde7ec", tinta:"#9f1239" },
  { fondo:"#eee7ff", tinta:"#5b21b6" },
  { fondo:"#fff3cf", tinta:"#8a5800" },
  { fondo:"#ddf7eb", tinta:"#10623f" },
  { fondo:"#dff3fb", tinta:"#075985" }
];

function limpiarNombreArchivo(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function nombrePdf() {
  const alumno = document.getElementById("datoAlumno")?.textContent?.trim() || "alumno";
  const periodo = document.getElementById("datoPeriodo")?.textContent?.trim() || "actual";
  return `Horario-${limpiarNombreArchivo(alumno)}-${limpiarNombreArchivo(periodo)}.pdf`;
}

function textoDato(id, alternativo = "") {
  const valor = document.getElementById(id)?.textContent?.trim() || "";
  return valor === "—" ? alternativo : (valor || alternativo);
}

function colorCss(elemento, variable, fallback) {
  if (!elemento) return fallback;
  const valor = getComputedStyle(elemento).getPropertyValue(variable).trim();
  return valor || fallback;
}

function redondeado(ctx, x, y, ancho, alto, radio) {
  const r = Math.min(radio, ancho / 2, alto / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + ancho, y, x + ancho, y + alto, r);
  ctx.arcTo(x + ancho, y + alto, x, y + alto, r);
  ctx.arcTo(x, y + alto, x, y, r);
  ctx.arcTo(x, y, x + ancho, y, r);
  ctx.closePath();
}

function pintarCaja(ctx, x, y, ancho, alto, fondo, borde = null, radio = 18, grosor = 2) {
  ctx.save();
  redondeado(ctx, x, y, ancho, alto, radio);
  ctx.fillStyle = fondo;
  ctx.fill();
  if (borde) {
    ctx.strokeStyle = borde;
    ctx.lineWidth = grosor;
    ctx.stroke();
  }
  ctx.restore();
}

function recortarTexto(ctx, texto, anchoMaximo) {
  const valor = String(texto || "");
  if (ctx.measureText(valor).width <= anchoMaximo) return valor;
  let salida = valor;
  while (salida.length > 1 && ctx.measureText(`${salida}…`).width > anchoMaximo) {
    salida = salida.slice(0, -1);
  }
  return `${salida}…`;
}

function envolverTexto(ctx, texto, anchoMaximo, maxLineas = 2) {
  const palabras = String(texto || "").trim().split(/\s+/).filter(Boolean);
  if (!palabras.length) return [];

  const lineas = [];
  let actual = "";

  for (const palabra of palabras) {
    const prueba = actual ? `${actual} ${palabra}` : palabra;
    if (ctx.measureText(prueba).width <= anchoMaximo) {
      actual = prueba;
      continue;
    }

    if (actual) lineas.push(actual);
    actual = palabra;

    if (lineas.length === maxLineas - 1) break;
  }

  if (lineas.length < maxLineas && actual) lineas.push(actual);

  const consumidas = lineas.join(" ").split(/\s+/).length;
  if (consumidas < palabras.length && lineas.length) {
    lineas[lineas.length - 1] = recortarTexto(
      ctx,
      `${lineas[lineas.length - 1]} ${palabras.slice(consumidas).join(" ")}`,
      anchoMaximo
    );
  }

  return lineas.slice(0, maxLineas);
}

function obtenerDatosTabla() {
  const tabla = document.querySelector(".horario-bloque--tabla .horario-tabla");
  if (!tabla) throw new Error("No encontramos el calendario listo para generar el PDF.");

  const encabezados = [...tabla.querySelectorAll("thead th")]
    .map(th => th.textContent.replace("⭐", "").trim());

  const filas = [...tabla.querySelectorAll("tbody tr")].map(fila => {
    const celdas = [...fila.children];
    const hora = celdas[0];
    const inicio = hora?.querySelector("strong")?.textContent?.trim() || "";
    const fin = hora?.querySelector("small")?.textContent?.trim() || "";

    if (fila.classList.contains("horario-fila-franja")) {
      const franja = celdas[1];
      return {
        inicio,
        fin,
        especial: true,
        tipo: fila.dataset.tipoFranja || "patio",
        nombre: franja?.querySelector("strong")?.textContent?.replace(/\s+/g, " ").trim()
          || franja?.textContent?.replace(/\s+/g, " ").trim()
          || ""
      };
    }

    return {
      inicio,
      fin,
      especial: false,
      clases: celdas.slice(1).map(celda => {
        const clase = celda.querySelector(".clase-horario");
        if (!clase || clase.classList.contains("clase-horario--vacia")) {
          return { vacia:true };
        }

        return {
          vacia:false,
          nombre: clase.querySelector(".clase-horario__nombre")?.textContent?.trim()
            || clase.textContent?.replace("AHORA", "").trim()
            || "",
          icono: clase.querySelector(".clase-horario__icono")?.textContent?.trim() || "✨",
          fondo: colorCss(clase, "--materia-fondo", "#f4efff"),
          borde: colorCss(clase, "--materia-borde", "#d8ccff"),
          tinta: colorCss(clase, "--materia-tinta", "#3f3560")
        };
      })
    };
  });

  return { encabezados, filas };
}

function dibujarPoster(ctx) {
  const margen = 34;
  const x = margen;
  const y = 28;
  const ancho = CANVAS_ANCHO - margen * 2;
  const alto = 190;

  const gradiente = ctx.createLinearGradient(x, y, x + ancho, y + alto);
  gradiente.addColorStop(0, "#ded6f3");
  gradiente.addColorStop(.5, "#eaddec");
  gradiente.addColorStop(1, "#dcebf1");
  pintarCaja(ctx, x, y, ancho, alto, gradiente, "#d8cfe4", 30, 3);

  ctx.save();
  redondeado(ctx, x, y, ancho, alto, 30);
  ctx.clip();

  ctx.fillStyle = "#f43f5e";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 185, y);
  ctx.lineTo(x + 135, y + alto);
  ctx.lineTo(x, y + alto);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#8b5cf6";
  ctx.beginPath();
  ctx.ellipse(x + 195, y + alto + 24, 160, 58, .18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f5b700";
  ctx.beginPath();
  ctx.moveTo(x + ancho - 175, y);
  ctx.lineTo(x + ancho, y);
  ctx.lineTo(x + ancho, y + alto);
  ctx.lineTo(x + ancho - 95, y + alto);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#22c7c9";
  ctx.beginPath();
  ctx.ellipse(x + ancho - 190, y + alto + 28, 125, 48, -.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.font = '44px "Segoe UI Emoji", sans-serif';
  ctx.fillStyle = "#ffffff";
  ctx.fillText("🌈", x + 45, y + 61);
  ctx.font = '800 22px Outfit, Arial, sans-serif';
  ctx.fillText("ACADEMIA GLORIA", x + 44, y + 112);
  ctx.fillText("VALENTINA", x + 44, y + 139);

  const centroX = x + ancho / 2;
  ctx.textAlign = "center";
  ctx.fillStyle = "#7c3aed";
  ctx.font = '900 19px Outfit, Arial, sans-serif';
  ctx.fillText("MI SEMANA · MI ESPACIO", centroX, y + 39);
  ctx.fillStyle = "#252836";
  ctx.font = '900 66px Outfit, Arial, sans-serif';
  ctx.fillText("HORARIO ESCOLAR", centroX, y + 94);
  ctx.fillStyle = "#3b3f51";
  ctx.font = '850 34px Outfit, Arial, sans-serif';
  ctx.fillText(textoDato("datoAlumno", "Mi horario"), centroX, y + 151);

  const metaX = x + ancho - 315;
  const metaAncho = 235;
  const meta = [
    `🏫 ${textoDato("datoColegio", "Mi colegio")}`,
    `🎒 ${textoDato("datoCurso", "Mi curso")}`,
    `📅 ${textoDato("datoPeriodo", "Curso escolar")}`
  ];

  ctx.textAlign = "center";
  ctx.font = '800 18px Outfit, Arial, sans-serif';
  meta.forEach((texto, indice) => {
    const py = y + 28 + indice * 49;
    pintarCaja(ctx, metaX, py, metaAncho, 38, "rgba(255,255,255,.93)", "rgba(255,255,255,.98)", 20, 1);
    ctx.fillStyle = "#40404a";
    ctx.fillText(recortarTexto(ctx, texto, metaAncho - 22), metaX + metaAncho / 2, py + 20);
  });
}

function dibujarTabla(ctx, datos) {
  const margen = 34;
  const x = margen;
  const y = 242;
  const ancho = CANVAS_ANCHO - margen * 2;
  const altoDisponible = CANVAS_ALTO - y - 32;
  const gap = 7;
  const anchoHora = 142;
  const anchoDia = (ancho - anchoHora - gap * 5) / 5;
  const altoCabecera = 58;
  const totalFilas = Math.max(1, datos.filas.length);
  const altoFila = Math.max(44, Math.min(88,
    (altoDisponible - altoCabecera - gap * totalFilas) / totalFilas
  ));

  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  pintarCaja(ctx, x, y, anchoHora, altoCabecera, "#704a69", null, 15);
  ctx.fillStyle = "#ffffff";
  ctx.font = '900 24px Outfit, Arial, sans-serif';
  ctx.fillText(datos.encabezados[0] || "Hora", x + anchoHora / 2, y + altoCabecera / 2);

  for (let i = 0; i < 5; i += 1) {
    const cx = x + anchoHora + gap + i * (anchoDia + gap);
    const color = DIAS_COLORES[i];
    pintarCaja(ctx, cx, y, anchoDia, altoCabecera, color.fondo, null, 15);
    ctx.fillStyle = color.tinta;
    ctx.font = '900 24px Outfit, Arial, sans-serif';
    ctx.fillText(datos.encabezados[i + 1] || "", cx + anchoDia / 2, y + altoCabecera / 2);
  }

  let filaY = y + altoCabecera + gap;

  datos.filas.forEach(fila => {
    pintarCaja(ctx, x, filaY, anchoHora, altoFila, "#f7edf3", "#ead9e4", 14, 1.5);
    ctx.fillStyle = "#553c50";
    ctx.textAlign = "center";
    ctx.font = '900 20px Outfit, Arial, sans-serif';
    ctx.fillText(fila.inicio, x + anchoHora / 2, filaY + altoFila * .38);
    ctx.fillStyle = "#8a647f";
    ctx.font = '800 17px Outfit, Arial, sans-serif';
    ctx.fillText(fila.fin, x + anchoHora / 2, filaY + altoFila * .68);

    const diasX = x + anchoHora + gap;
    const diasAncho = ancho - anchoHora - gap;

    if (fila.especial) {
      const patio = fila.tipo === "patio";
      const fondo = patio ? "#ccef43" : "#ff9f3f";
      const borde = patio ? "#a9d52a" : "#f27f1b";
      const tinta = patio ? "#2e681f" : "#713900";
      pintarCaja(ctx, diasX, filaY, diasAncho, altoFila, fondo, borde, 14, 2);
      ctx.fillStyle = tinta;
      ctx.font = '950 23px Outfit, Arial, sans-serif';
      const icono = patio ? "🌤️" : "🍽️";
      const nombre = String(fila.nombre || (patio ? "PATIO" : "COMEDOR")).replace(/\s+/g, " ");
      ctx.fillText(`${icono}  ${nombre}  ${icono}`, diasX + diasAncho / 2, filaY + altoFila / 2);
    } else {
      fila.clases.forEach((clase, indice) => {
        const cx = diasX + indice * (anchoDia + gap);

        if (clase.vacia) {
          pintarCaja(ctx, cx, filaY, anchoDia, altoFila, "#fffdfd", "#eadfe6", 14, 1);
          return;
        }

        pintarCaja(ctx, cx, filaY, anchoDia, altoFila, clase.fondo, clase.borde, 14, 2);
        ctx.fillStyle = clase.tinta;
        ctx.textAlign = "left";
        const iconoAncho = 48;
        const textoX = cx + 14;
        const textoAncho = anchoDia - iconoAncho - 34;
        const tamano = altoFila < 55 ? 17 : (altoFila < 72 ? 19 : 21);
        ctx.font = `900 ${tamano}px Outfit, Arial, sans-serif`;
        const lineas = envolverTexto(ctx, clase.nombre, textoAncho, 2);
        const salto = tamano + 3;
        const centroTextoY = filaY + altoFila / 2;
        const inicioY = centroTextoY - ((lineas.length - 1) * salto) / 2;
        lineas.forEach((linea, li) => ctx.fillText(linea, textoX, inicioY + li * salto));

        const ix = cx + anchoDia - 38;
        const iy = filaY + altoFila / 2;
        ctx.textAlign = "center";
        ctx.font = `${Math.max(20, Math.min(30, altoFila * .38))}px "Segoe UI Emoji", sans-serif`;
        ctx.fillText(clase.icono || "✨", ix, iy);
      });
    }

    filaY += altoFila + gap;
  });
}

function crearCanvasHorario() {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_ANCHO;
  canvas.height = CANVAS_ALTO;
  const ctx = canvas.getContext("2d", { alpha:false });
  if (!ctx) throw new Error("No se pudo preparar el lienzo del horario.");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  dibujarPoster(ctx);
  dibujarTabla(ctx, obtenerDatosTabla());
  return canvas;
}

function canvasAJpeg(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async blob => {
      if (!blob) {
        reject(new Error("No se pudo convertir el horario a imagen."));
        return;
      }
      resolve(new Uint8Array(await blob.arrayBuffer()));
    }, "image/jpeg", .95);
  });
}

function construirPdfUnaPagina(jpeg, anchoImagen, altoImagen) {
  const encoder = new TextEncoder();
  const partes = [];
  const offsets = new Array(6).fill(0);
  let longitud = 0;

  const agregarBytes = bytes => {
    partes.push(bytes);
    longitud += bytes.length;
  };

  const agregarTexto = texto => agregarBytes(encoder.encode(texto));
  const iniciarObjeto = numero => {
    offsets[numero] = longitud;
    agregarTexto(`${numero} 0 obj\n`);
  };

  agregarTexto("%PDF-1.4\n% Academia Gloria Valentina\n");

  iniciarObjeto(1);
  agregarTexto("<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

  iniciarObjeto(2);
  agregarTexto("<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");

  iniciarObjeto(3);
  agregarTexto(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PDF_ANCHO_PT} ${PDF_ALTO_PT}] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`);

  iniciarObjeto(4);
  agregarTexto(`<< /Type /XObject /Subtype /Image /Width ${anchoImagen} /Height ${altoImagen} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);
  agregarBytes(jpeg);
  agregarTexto("\nendstream\nendobj\n");

  const contenido = `q\n${PDF_ANCHO_PT} 0 0 ${PDF_ALTO_PT} 0 0 cm\n/Im1 Do\nQ\n`;
  const contenidoBytes = encoder.encode(contenido);
  iniciarObjeto(5);
  agregarTexto(`<< /Length ${contenidoBytes.length} >>\nstream\n`);
  agregarBytes(contenidoBytes);
  agregarTexto("endstream\nendobj\n");

  const inicioXref = longitud;
  agregarTexto("xref\n0 6\n0000000000 65535 f \n");
  for (let i = 1; i <= 5; i += 1) {
    agregarTexto(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  }
  agregarTexto(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${inicioXref}\n%%EOF`);

  return new Blob(partes, { type:"application/pdf" });
}

function mostrarEstadoEnVentana(ventana, texto) {
  if (!ventana || ventana.closed) return;
  ventana.document.open();
  ventana.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Horario escolar</title><style>body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#faf7ff;color:#3f3560}div{text-align:center;padding:30px}strong{display:block;font-size:1.35rem;margin-bottom:8px}</style></head><body><div><strong>🌈 ${texto}</strong><span>Estamos preparando una sola página lista para guardar o imprimir.</span></div></body></html>`);
  ventana.document.close();
}

function descargarComoFallback(blob) {
  const enlace = document.createElement("a");
  const url = URL.createObjectURL(blob);
  enlace.href = url;
  enlace.download = nombrePdf();
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30000);
}

export async function generarPdfHorario() {
  const ventanaPdf = window.open("", "_blank");
  mostrarEstadoEnVentana(ventanaPdf, "Preparando tu horario…");

  let urlPdf = null;

  try {
    if (document.fonts?.ready) await document.fonts.ready;

    const canvas = crearCanvasHorario();
    const jpeg = await canvasAJpeg(canvas);
    const blob = construirPdfUnaPagina(jpeg, canvas.width, canvas.height);
    urlPdf = URL.createObjectURL(blob);

    if (ventanaPdf && !ventanaPdf.closed) {
      ventanaPdf.location.replace(urlPdf);
    } else {
      descargarComoFallback(blob);
    }

    window.setTimeout(() => {
      if (urlPdf) URL.revokeObjectURL(urlPdf);
    }, 600000);
  } catch (error) {
    console.error("No se pudo generar el PDF del horario:", error);
    if (ventanaPdf && !ventanaPdf.closed) ventanaPdf.close();
    window.alert("No pudimos preparar el PDF del horario. Inténtalo de nuevo en unos segundos.");
    throw error;
  }
}
