/* ==========================================================
   Academia Gloria Valentina
   Mi horario de clases · presentación V2
   Iconografía contextual, decoración de días e impresión.
   ========================================================== */

const ICONOS_MATERIAS = Object.freeze([
  { claves:["matemat","mates","algebra","geometr"], icono:"➗" },
  { claves:["lengua","literatura","lectura","castell"], icono:"📖" },
  { claves:["ingles","english"], icono:"💬" },
  { claves:["science","ciencia","naturales","biologia","fisica","quimica"], icono:"🔬" },
  { claves:["sociales","historia","geografia","social"], icono:"🌍" },
  { claves:["educacion fisica","ed fisica","deporte","physical"], icono:"🏃" },
  { claves:["musica"], icono:"🎵" },
  { claves:["plastica","arte","artistica","dibujo"], icono:"🎨" },
  { claves:["tecnologia","informatica","digital","comput"], icono:"💻" },
  { claves:["religion","valores"], icono:"💛" },
  { claves:["tutoria","tutor"], icono:"💬" },
  { claves:["recreo","patio","descanso"], icono:"🌤️" },
  { claves:["comedor","almuerzo","comida"], icono:"🍽️" },
  { claves:["biblioteca"], icono:"📚" },
  { claves:["proyecto"], icono:"🚀" }
]);

const DIAS = Object.freeze([
  ["lunes","lunes"],
  ["martes","martes"],
  ["miércoles","miercoles"],
  ["miercoles","miercoles"],
  ["jueves","jueves"],
  ["viernes","viernes"]
]);

function normalizar(texto = "") {
  return String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function iconoMateria(nombre = "") {
  const clave = normalizar(nombre);
  const coincidencia = ICONOS_MATERIAS.find(grupo =>
    grupo.claves.some(fragmento => clave.includes(normalizar(fragmento)))
  );
  return coincidencia?.icono || "✨";
}

function textoMateria(elemento) {
  const copia = elemento.cloneNode(true);
  copia.querySelectorAll(".clase-horario__ahora,.clase-horario__icono").forEach(nodo => nodo.remove());
  return copia.textContent.trim();
}

function decorarClase(elemento) {
  if (!(elemento instanceof HTMLElement)) return;
  if (elemento.classList.contains("clase-horario--vacia")) return;
  if (elemento.dataset.presentacionV2 === "true") return;

  const nombre = textoMateria(elemento);
  if (!nombre) return;

  const badgeAhora = elemento.querySelector(".clase-horario__ahora");
  const icono = document.createElement("span");
  icono.className = "clase-horario__icono";
  icono.setAttribute("aria-hidden", "true");
  icono.textContent = iconoMateria(nombre);

  const nombreNodo = document.createElement("span");
  nombreNodo.className = "clase-horario__nombre";
  nombreNodo.textContent = nombre;

  [...elemento.childNodes].forEach(nodo => {
    if (nodo !== badgeAhora) nodo.remove();
  });

  if (badgeAhora) elemento.insertBefore(icono, badgeAhora);
  else elemento.appendChild(icono);
  elemento.appendChild(nombreNodo);
  elemento.dataset.presentacionV2 = "true";
}

function decorarChip(elemento) {
  if (!(elemento instanceof HTMLElement)) return;
  if (elemento.dataset.presentacionV2 === "true") return;

  const nombre = elemento.textContent.trim();
  if (!nombre) return;

  const icono = document.createElement("span");
  icono.className = "materia-chip__icono";
  icono.setAttribute("aria-hidden", "true");
  icono.textContent = iconoMateria(nombre);
  elemento.prepend(icono);
  elemento.dataset.presentacionV2 = "true";
}

function decorarDias() {
  document.querySelectorAll("#horarioTablaCabecera th").forEach(celda => {
    const texto = normalizar(celda.textContent.replace("⭐", ""));
    const dia = DIAS.find(([visible]) => normalizar(visible) === texto)?.[1];
    if (dia) celda.dataset.dia = dia;
  });

  document.querySelectorAll(".horario-dia-card").forEach(tarjeta => {
    const texto = normalizar(tarjeta.querySelector(".horario-dia-card__cabecera span")?.textContent.replace("⭐", "") || "");
    const dia = DIAS.find(([visible]) => normalizar(visible) === texto)?.[1];
    if (dia) tarjeta.dataset.dia = dia;
  });
}

function decorarHorario() {
  document.querySelectorAll(".clase-horario").forEach(decorarClase);
  document.querySelectorAll(".materia-chip").forEach(decorarChip);
  decorarDias();
}

function sincronizarCabeceraImpresion() {
  const alumno = document.getElementById("datoAlumno")?.textContent?.trim() || "Mi horario";
  const colegio = document.getElementById("datoColegio")?.textContent?.trim() || "";
  const curso = document.getElementById("datoCurso")?.textContent?.trim() || "";
  const periodo = document.getElementById("datoPeriodo")?.textContent?.trim() || "";

  const alumnoPrint = document.getElementById("printAlumno");
  const resumenPrint = document.getElementById("printResumen");
  const cursoPrint = document.getElementById("printCurso");

  if (alumnoPrint) alumnoPrint.textContent = alumno;
  if (resumenPrint) resumenPrint.textContent = [colegio, periodo].filter(Boolean).join(" · ");
  if (cursoPrint) cursoPrint.textContent = curso ? `🎒 ${curso}` : "🎒 Mi curso";
}

function configurarImpresion() {
  const boton = document.getElementById("imprimirHorario");
  if (!boton) return;

  let tituloAnterior = document.title;

  boton.addEventListener("click", () => {
    sincronizarCabeceraImpresion();
    decorarHorario();
    window.print();
  });

  window.addEventListener("beforeprint", () => {
    tituloAnterior = document.title;
    sincronizarCabeceraImpresion();
    decorarHorario();
    const alumno = document.getElementById("datoAlumno")?.textContent?.trim();
    const periodo = document.getElementById("datoPeriodo")?.textContent?.trim();
    document.title = ["Horario de clases", alumno, periodo].filter(Boolean).join(" - ");
  });

  window.addEventListener("afterprint", () => {
    document.title = tituloAnterior;
  });
}

function iniciarPresentacion() {
  decorarHorario();
  sincronizarCabeceraImpresion();
  configurarImpresion();

  const objetivo = document.getElementById("vistaHorario");
  if (!objetivo) return;

  const observer = new MutationObserver(() => {
    decorarHorario();
    sincronizarCabeceraImpresion();
  });

  observer.observe(objetivo, { childList:true, subtree:true });
}

iniciarPresentacion();
