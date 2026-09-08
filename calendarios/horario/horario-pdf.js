/* ==========================================================
   Academia Gloria Valentina
   Mi horario de clases · PDF de una sola página

   Genera un PDF A4 apaisado real a partir del horario visible.
   No depende del tamaño/orientación elegidos en el diálogo de
   impresión del navegador, por lo que evita la paginación en
   2/3 hojas observada en validación real.
   ========================================================== */

const DEPENDENCIAS_PDF = Object.freeze([
  {
    global: "html2canvas",
    src: "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
  },
  {
    global: "jspdf",
    src: "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
  }
]);

function cargarScript({ global, src }) {
  if (window[global]) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existente = document.querySelector(`script[data-horario-pdf="${global}"]`);
    if (existente) {
      existente.addEventListener("load", resolve, { once:true });
      existente.addEventListener("error", reject, { once:true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.horarioPdf = global;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`No se pudo cargar ${global}.`));
    document.head.appendChild(script);
  });
}

async function cargarDependenciasPdf() {
  for (const dependencia of DEPENDENCIAS_PDF) {
    await cargarScript(dependencia);
  }
}

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

function quitarEstadoTemporal(clon) {
  clon.querySelectorAll(".dia-hoy").forEach(elemento => elemento.classList.remove("dia-hoy"));
  clon.querySelectorAll(".clase-horario__ahora").forEach(elemento => elemento.remove());
  clon.querySelectorAll("th").forEach(elemento => {
    elemento.textContent = elemento.textContent.replace("⭐", "").trim();
  });
}

function crearEscenarioPdf() {
  const posterOriginal = document.querySelector(".horario-bloque--tabla .horario-poster");
  const tablaOriginal = document.querySelector(".horario-bloque--tabla .horario-tabla-wrap");

  if (!posterOriginal || !tablaOriginal) {
    throw new Error("No encontramos el calendario listo para generar el PDF.");
  }

  const escenario = document.createElement("section");
  escenario.className = "horario-pdf-stage";

  const filas = tablaOriginal.querySelectorAll("tbody tr").length;
  if (filas >= 14) escenario.classList.add("horario-pdf-stage--muy-compacto");
  else if (filas >= 10) escenario.classList.add("horario-pdf-stage--compacto");

  const poster = posterOriginal.cloneNode(true);
  const tabla = tablaOriginal.cloneNode(true);
  quitarEstadoTemporal(tabla);

  escenario.append(poster, tabla);
  document.body.appendChild(escenario);
  return escenario;
}

function siguienteFrame() {
  return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

function mostrarEstadoEnVentana(ventana, texto) {
  if (!ventana || ventana.closed) return;
  ventana.document.open();
  ventana.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Horario escolar</title><style>body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#faf7ff;color:#3f3560}div{text-align:center;padding:30px}strong{display:block;font-size:1.35rem;margin-bottom:8px}</style></head><body><div><strong>🌈 ${texto}</strong><span>Estamos preparando una sola página lista para guardar o imprimir.</span></div></body></html>`);
  ventana.document.close();
}

export async function generarPdfHorario() {
  const ventanaPdf = window.open("", "_blank");
  mostrarEstadoEnVentana(ventanaPdf, "Preparando tu horario…");

  let escenario = null;
  let urlPdf = null;

  try {
    await cargarDependenciasPdf();
    if (document.fonts?.ready) await document.fonts.ready;

    escenario = crearEscenarioPdf();
    await siguienteFrame();

    const canvas = await window.html2canvas(escenario, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: 1500,
      scrollX: 0,
      scrollY: 0
    });

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
      compress: true
    });

    const anchoPagina = pdf.internal.pageSize.getWidth();
    const altoPagina = pdf.internal.pageSize.getHeight();
    const margen = 6;
    const anchoMaximo = anchoPagina - margen * 2;
    const altoMaximo = altoPagina - margen * 2;
    const proporcion = canvas.width / canvas.height;

    let ancho = anchoMaximo;
    let alto = ancho / proporcion;

    if (alto > altoMaximo) {
      alto = altoMaximo;
      ancho = alto * proporcion;
    }

    const x = (anchoPagina - ancho) / 2;
    const y = (altoPagina - alto) / 2;
    const imagen = canvas.toDataURL("image/jpeg", 0.96);

    pdf.addImage(imagen, "JPEG", x, y, ancho, alto, undefined, "FAST");
    pdf.setProperties({
      title: document.title,
      subject: "Horario escolar · Academia Gloria Valentina",
      creator: "Academia Gloria Valentina"
    });

    const blob = pdf.output("blob");
    urlPdf = URL.createObjectURL(blob);

    if (ventanaPdf && !ventanaPdf.closed) {
      ventanaPdf.location.replace(urlPdf);
    } else {
      pdf.save(nombrePdf());
    }

    window.setTimeout(() => {
      if (urlPdf) URL.revokeObjectURL(urlPdf);
    }, 120000);
  } catch (error) {
    console.error("No se pudo generar el PDF del horario:", error);
    if (ventanaPdf && !ventanaPdf.closed) ventanaPdf.close();
    window.alert("No pudimos preparar el PDF del horario. Inténtalo de nuevo en unos segundos.");
    throw error;
  } finally {
    escenario?.remove();
  }
}
