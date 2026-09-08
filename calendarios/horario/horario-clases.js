import { PerfilUsuario } from "../../compartido/js/perfil-usuario.js";
import { HorarioClases } from "../../compartido/api/horario-clases.js";
import {
  DIAS_HORARIO,
  PALETA_MATERIAS,
  colorMateria,
  crearHorarioClases,
  crearHorarioInicial
} from "../../compartido/modelos/horario-clases.js";

const $ = id => document.getElementById(id);
const DIA_POR_NUMERO = Object.freeze({
  1: "lunes",
  2: "martes",
  3: "miercoles",
  4: "jueves",
  5: "viernes"
});

let perfil = null;
let horario = null;
let borrador = null;
let puedeEditar = false;
let temporizadorMensaje = null;

function escaparHTML(valor = "") {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function texto(valor = "", alternativo = "—") {
  const resultado = String(valor ?? "").trim();
  return resultado || alternativo;
}

function estiloMateria(materia = {}) {
  const color = colorMateria(materia.colorId);
  return `--materia-fondo:${color.fondo};--materia-borde:${color.borde};--materia-tinta:${color.tinta}`;
}

function materiaPorId(materiaId, fuente = horario) {
  return fuente?.materias?.find(materia => materia.id === materiaId) || null;
}

function minutosHora(valor = "00:00") {
  const [hora, minuto] = String(valor).split(":").map(Number);
  return (hora * 60) + minuto;
}

function sumarMinutos(valor = "09:00", cantidad = 60) {
  const total = Math.min((23 * 60) + 59, minutosHora(valor) + cantidad);
  const hora = Math.floor(total / 60);
  const minuto = total % 60;
  return `${String(hora).padStart(2, "0")}:${String(minuto).padStart(2, "0")}`;
}

function tramoEsAhora(tramo, diaId) {
  const ahora = new Date();
  if (DIA_POR_NUMERO[ahora.getDay()] !== diaId) return false;

  const actual = (ahora.getHours() * 60) + ahora.getMinutes();
  return actual >= minutosHora(tramo.inicio) && actual < minutosHora(tramo.fin);
}

function diaActualId() {
  return DIA_POR_NUMERO[new Date().getDay()] || "";
}

function mostrarMensaje(mensaje, tipo = "exito") {
  const elemento = $("mensajeHorario");
  clearTimeout(temporizadorMensaje);
  elemento.textContent = mensaje;
  elemento.className = `horario-mensaje horario-mensaje--${tipo}`;
  elemento.hidden = false;

  temporizadorMensaje = setTimeout(() => {
    elemento.hidden = true;
  }, 4200);
}

function actualizarHero() {
  const fuente = horario || borrador || {};
  const nombre = texto(perfil?.nombreVisible || perfil?.nombre, "Explorador/a");
  $("heroNombre").textContent = nombre;
  $("heroCurso").textContent = `🎒 ${texto(fuente.curso || perfil?.curso, "Tu curso")}`;
  $("heroPeriodo").textContent = `📅 ${texto(fuente.periodoEscolar || perfil?.cursoEscolar, "Curso escolar")}`;
}

function claseDeTramo(tramo, diaId, fuente = horario) {
  const materiaId = fuente?.celdas?.[tramo.id]?.[diaId] || "";
  return materiaPorId(materiaId, fuente);
}

function htmlClase(tramo, diaId, fuente = horario) {
  const materia = claseDeTramo(tramo, diaId, fuente);

  if (!materia) {
    return '<div class="clase-horario clase-horario--vacia">—</div>';
  }

  const ahora = tramoEsAhora(tramo, diaId);
  return `
    <div class="clase-horario ${ahora ? "clase-horario--ahora" : ""}"
         style="${estiloMateria(materia)}">
      ${ahora ? '<span class="clase-horario__ahora">AHORA</span>' : ""}
      ${escaparHTML(materia.nombre)}
    </div>
  `;
}

function renderResumenHoy() {
  const contenedor = $("resumenHoy");
  const hoyId = diaActualId();

  if (!hoyId) {
    contenedor.innerHTML = `
      <div class="horario-resumen-hoy__icono">🌟</div>
      <div><small>HOY</small><strong>Fin de semana: tu horario te espera el lunes.</strong></div>
      <div class="horario-resumen-hoy__extra">Disfruta tu día 😊</div>
    `;
    return;
  }

  const dia = DIAS_HORARIO.find(item => item.id === hoyId);
  const clases = horario.tramos
    .map(tramo => ({ tramo, materia: claseDeTramo(tramo, hoyId) }))
    .filter(item => item.materia);

  if (!clases.length) {
    contenedor.innerHTML = `
      <div class="horario-resumen-hoy__icono">☀️</div>
      <div><small>${escaparHTML(dia.etiqueta.toUpperCase())}</small><strong>Hoy no tienes clases registradas.</strong></div>
      <div class="horario-resumen-hoy__extra">Un día diferente ✨</div>
    `;
    return;
  }

  const ahora = new Date();
  const minutoActual = (ahora.getHours() * 60) + ahora.getMinutes();
  const actual = clases.find(item =>
    minutoActual >= minutosHora(item.tramo.inicio)
    && minutoActual < minutosHora(item.tramo.fin)
  );

  if (actual) {
    contenedor.innerHTML = `
      <div class="horario-resumen-hoy__icono">📚</div>
      <div>
        <small>${escaparHTML(dia.etiqueta.toUpperCase())} · AHORA</small>
        <strong>${escaparHTML(actual.materia.nombre)} · hasta las ${escaparHTML(actual.tramo.fin)}</strong>
      </div>
      <div class="horario-resumen-hoy__extra">Tú puedes 💜</div>
    `;
    return;
  }

  const siguiente = clases.find(item => minutosHora(item.tramo.inicio) > minutoActual);

  if (siguiente) {
    const antesDePrimera = siguiente === clases[0];
    contenedor.innerHTML = `
      <div class="horario-resumen-hoy__icono">${antesDePrimera ? "🌞" : "👀"}</div>
      <div>
        <small>${escaparHTML(dia.etiqueta.toUpperCase())}</small>
        <strong>${antesDePrimera ? "Tu primera clase" : "Lo próximo"}: ${escaparHTML(siguiente.materia.nombre)} a las ${escaparHTML(siguiente.tramo.inicio)}</strong>
      </div>
      <div class="horario-resumen-hoy__extra">${clases.length} bloque${clases.length === 1 ? "" : "s"} hoy</div>
    `;
    return;
  }

  contenedor.innerHTML = `
    <div class="horario-resumen-hoy__icono">🎉</div>
    <div><small>${escaparHTML(dia.etiqueta.toUpperCase())}</small><strong>¡Terminaste tus clases de hoy!</strong></div>
    <div class="horario-resumen-hoy__extra">Bien hecho 🌟</div>
  `;
}

function renderDatosHorario() {
  $("datoAlumno").textContent = texto(perfil?.nombreVisible || perfil?.nombre);
  $("datoColegio").textContent = texto(horario.colegio || perfil?.colegio);
  $("datoCurso").textContent = texto(horario.curso || perfil?.curso);
  $("datoTutor").textContent = texto(horario.tutor, "Sin indicar");
  $("datoPeriodo").textContent = texto(horario.periodoEscolar || perfil?.cursoEscolar);
}

function renderLeyendaMaterias() {
  const contenedor = $("leyendaMaterias");

  if (!horario.materias.length) {
    contenedor.className = "materias-leyenda materias-leyenda--vacia";
    contenedor.textContent = "Todavía no hay materias añadidas.";
    return;
  }

  contenedor.className = "materias-leyenda";
  contenedor.innerHTML = horario.materias.map(materia => `
    <span class="materia-chip" style="${estiloMateria(materia)}">
      ${escaparHTML(materia.nombre)}
    </span>
  `).join("");
}

function renderTablaHorario() {
  const hoy = diaActualId();
  $("horarioTablaCabecera").innerHTML = `
    <tr>
      <th>Hora</th>
      ${DIAS_HORARIO.map(dia => `
        <th class="${dia.id === hoy ? "dia-hoy" : ""}">
          ${dia.id === hoy ? "⭐ " : ""}${escaparHTML(dia.etiqueta)}
        </th>
      `).join("")}
    </tr>
  `;

  $("horarioTablaCuerpo").innerHTML = horario.tramos.map(tramo => `
    <tr>
      <td class="horario-tabla__hora">
        <strong>${escaparHTML(tramo.inicio)}</strong>
        <small>${escaparHTML(tramo.fin)}</small>
      </td>
      ${DIAS_HORARIO.map(dia => `
        <td class="${dia.id === hoy ? "dia-hoy" : ""}">
          ${htmlClase(tramo, dia.id)}
        </td>
      `).join("")}
    </tr>
  `).join("");
}

function renderHorarioMovil() {
  const hoy = diaActualId();
  const contenedor = $("horarioMovil");

  contenedor.innerHTML = DIAS_HORARIO.map(dia => `
    <article class="horario-dia-card ${dia.id === hoy ? "horario-dia-card--hoy" : ""}">
      <div class="horario-dia-card__cabecera">
        <span>${dia.id === hoy ? "⭐ " : ""}${escaparHTML(dia.etiqueta)}</span>
        <small>${dia.id === hoy ? "HOY" : ""}</small>
      </div>
      <div class="horario-dia-card__filas">
        ${horario.tramos.map(tramo => `
          <div class="horario-dia-fila">
            <div class="horario-dia-fila__hora">${escaparHTML(tramo.inicio)}<br>${escaparHTML(tramo.fin)}</div>
            ${htmlClase(tramo, dia.id)}
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function renderVista() {
  if (!horario) return;

  $("estadoCarga").hidden = true;
  $("estadoVacio").hidden = true;
  $("editorHorario").hidden = true;
  $("vistaHorario").hidden = false;
  $("editarHorario").hidden = !puedeEditar;

  actualizarHero();
  renderResumenHoy();
  renderDatosHorario();
  renderLeyendaMaterias();
  renderTablaHorario();
  renderHorarioMovil();
  $("notasHorario").textContent = texto(
    horario.notas,
    "Todavía no has añadido notas. Puedes usar este espacio para recordar cosas importantes de tu semana."
  );
}

function renderVacio() {
  $("estadoCarga").hidden = true;
  $("vistaHorario").hidden = true;
  $("editorHorario").hidden = true;
  $("estadoVacio").hidden = false;
  $("crearHorario").hidden = !puedeEditar;
  actualizarHero();
}

function idMateria(nombre) {
  const base = String(nombre)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "materia";

  let candidato = base;
  let indice = 2;
  const usados = new Set((borrador?.materias || []).map(materia => materia.id));

  while (usados.has(candidato)) {
    candidato = `${base}-${indice}`;
    indice += 1;
  }

  return candidato;
}

function idTramo() {
  const usados = new Set((borrador?.tramos || []).map(tramo => tramo.id));
  let indice = borrador.tramos.length + 1;
  let candidato = `tramo-${indice}`;

  while (usados.has(candidato)) {
    indice += 1;
    candidato = `tramo-${indice}`;
  }

  return candidato;
}

function sincronizarCabeceraBorrador() {
  if (!borrador) return;
  borrador.colegio = $("editorColegio").value.trim();
  borrador.curso = $("editorCurso").value.trim();
  borrador.tutor = $("editorTutor").value.trim();
  borrador.periodoEscolar = $("editorPeriodo").value.trim();
  borrador.notas = $("editorNotas").value.trim();
}

function cargarCamposEditor() {
  $("editorAlumno").value = texto(perfil?.nombreVisible || perfil?.nombre, "");
  $("editorColegio").value = borrador.colegio || perfil?.colegio || "";
  $("editorCurso").value = borrador.curso || perfil?.curso || "";
  $("editorTutor").value = borrador.tutor || "";
  $("editorPeriodo").value = borrador.periodoEscolar || perfil?.cursoEscolar || "";
  $("editorNotas").value = borrador.notas || "";
}

function renderEditorMaterias() {
  const contenedor = $("editorMaterias");

  if (!borrador.materias.length) {
    contenedor.innerHTML = '<div class="editor-vacio">Añade tus materias o bloques para empezar a dar color a la semana. 🎨</div>';
    return;
  }

  contenedor.innerHTML = borrador.materias.map(materia => `
    <span class="editor-materia" style="${estiloMateria(materia)}">
      ${escaparHTML(materia.nombre)}
      <button type="button" data-renombrar-materia="${escaparHTML(materia.id)}" title="Renombrar ${escaparHTML(materia.nombre)}">✎</button>
      <button type="button" data-eliminar-materia="${escaparHTML(materia.id)}" title="Quitar ${escaparHTML(materia.nombre)}">×</button>
    </span>
  `).join("");

  contenedor.querySelectorAll("[data-renombrar-materia]").forEach(boton => {
    boton.addEventListener("click", () => renombrarMateria(boton.dataset.renombrarMateria));
  });

  contenedor.querySelectorAll("[data-eliminar-materia]").forEach(boton => {
    boton.addEventListener("click", () => eliminarMateria(boton.dataset.eliminarMateria));
  });
}

function agregarMateria() {
  const entrada = $("nuevaMateria");
  const nombre = entrada.value.trim();
  if (!nombre) {
    entrada.focus();
    return;
  }

  const repetida = borrador.materias.some(
    materia => materia.nombre.toLocaleLowerCase("es") === nombre.toLocaleLowerCase("es")
  );

  if (repetida) {
    mostrarMensaje("Esa materia ya está en tu lista.", "error");
    entrada.select();
    return;
  }

  borrador.materias.push({
    id: idMateria(nombre),
    nombre,
    colorId: PALETA_MATERIAS[borrador.materias.length % PALETA_MATERIAS.length].id
  });

  entrada.value = "";
  renderEditorMaterias();
  renderEditorTabla();
  entrada.focus();
}

function renombrarMateria(materiaId) {
  const materia = materiaPorId(materiaId, borrador);
  if (!materia) return;

  const nuevo = window.prompt("Nuevo nombre de la materia o bloque:", materia.nombre);
  if (nuevo === null) return;

  const nombre = nuevo.trim().slice(0, 60);
  if (!nombre) return;

  const repetida = borrador.materias.some(
    item => item.id !== materia.id
      && item.nombre.toLocaleLowerCase("es") === nombre.toLocaleLowerCase("es")
  );

  if (repetida) {
    mostrarMensaje("Ya existe otra materia con ese nombre.", "error");
    return;
  }

  materia.nombre = nombre;
  renderEditorMaterias();
  renderEditorTabla();
}

function eliminarMateria(materiaId) {
  borrador.materias = borrador.materias.filter(materia => materia.id !== materiaId);

  Object.values(borrador.celdas || {}).forEach(fila => {
    DIAS_HORARIO.forEach(dia => {
      if (fila?.[dia.id] === materiaId) fila[dia.id] = "";
    });
  });

  renderEditorMaterias();
  renderEditorTabla();
}

function renderEditorTramos() {
  const contenedor = $("editorTramos");

  if (!borrador.tramos.length) {
    contenedor.innerHTML = '<div class="editor-vacio">Todavía no hay horas. Pulsa “Añadir tramo horario” para comenzar. ⏰</div>';
    return;
  }

  contenedor.innerHTML = borrador.tramos.map((tramo, indice) => `
    <div class="editor-tramo" data-tramo="${escaparHTML(tramo.id)}">
      <span class="editor-tramo__numero">BLOQUE ${indice + 1}</span>
      <input type="time" value="${escaparHTML(tramo.inicio)}" data-tramo-inicio="${escaparHTML(tramo.id)}" aria-label="Hora de inicio del bloque ${indice + 1}">
      <span class="editor-tramo__guion">→</span>
      <input type="time" value="${escaparHTML(tramo.fin)}" data-tramo-fin="${escaparHTML(tramo.id)}" aria-label="Hora de fin del bloque ${indice + 1}">
      <button type="button" data-eliminar-tramo="${escaparHTML(tramo.id)}" title="Quitar este tramo">×</button>
    </div>
  `).join("");

  contenedor.querySelectorAll("[data-tramo-inicio]").forEach(input => {
    input.addEventListener("change", () => {
      const tramo = borrador.tramos.find(item => item.id === input.dataset.tramoInicio);
      if (tramo) tramo.inicio = input.value;
      renderEditorTabla();
    });
  });

  contenedor.querySelectorAll("[data-tramo-fin]").forEach(input => {
    input.addEventListener("change", () => {
      const tramo = borrador.tramos.find(item => item.id === input.dataset.tramoFin);
      if (tramo) tramo.fin = input.value;
      renderEditorTabla();
    });
  });

  contenedor.querySelectorAll("[data-eliminar-tramo]").forEach(boton => {
    boton.addEventListener("click", () => eliminarTramo(boton.dataset.eliminarTramo));
  });
}

function agregarTramo() {
  const anterior = borrador.tramos[borrador.tramos.length - 1];
  const inicio = anterior?.fin || "09:00";
  const fin = sumarMinutos(inicio, 60);
  const id = idTramo();

  borrador.tramos.push({ id, inicio, fin });
  borrador.celdas[id] = Object.fromEntries(DIAS_HORARIO.map(dia => [dia.id, ""]));
  renderEditorTramos();
  renderEditorTabla();
}

function eliminarTramo(tramoId) {
  borrador.tramos = borrador.tramos.filter(tramo => tramo.id !== tramoId);
  delete borrador.celdas[tramoId];
  renderEditorTramos();
  renderEditorTabla();
}

function opcionesMaterias(seleccionada = "") {
  return `
    <option value="">— Libre —</option>
    ${borrador.materias.map(materia => `
      <option value="${escaparHTML(materia.id)}" ${materia.id === seleccionada ? "selected" : ""}>
        ${escaparHTML(materia.nombre)}
      </option>
    `).join("")}
  `;
}

function renderEditorTabla() {
  const aviso = $("editorAvisoSemana");
  const wrap = document.querySelector(".editor-tabla-wrap");

  if (!borrador.materias.length || !borrador.tramos.length) {
    wrap.hidden = true;
    aviso.hidden = false;
    aviso.textContent = !borrador.materias.length && !borrador.tramos.length
      ? "Añade al menos una materia y un tramo horario para construir tu semana."
      : !borrador.materias.length
        ? "Ya tienes horas. Ahora añade tus materias o bloques."
        : "Ya tienes materias. Ahora añade tus tramos horarios.";
    return;
  }

  wrap.hidden = false;
  aviso.hidden = true;
  const hoy = diaActualId();

  $("editorTablaCabecera").innerHTML = `
    <tr>
      <th>Hora</th>
      ${DIAS_HORARIO.map(dia => `
        <th class="${dia.id === hoy ? "dia-hoy" : ""}">${escaparHTML(dia.etiqueta)}</th>
      `).join("")}
    </tr>
  `;

  $("editorTablaCuerpo").innerHTML = borrador.tramos.map(tramo => `
    <tr>
      <td class="editor-tabla__hora">${escaparHTML(tramo.inicio)}<br>${escaparHTML(tramo.fin)}</td>
      ${DIAS_HORARIO.map(dia => {
        const seleccionada = borrador.celdas?.[tramo.id]?.[dia.id] || "";
        return `
          <td class="${dia.id === hoy ? "dia-hoy" : ""}">
            <select data-celda-tramo="${escaparHTML(tramo.id)}" data-celda-dia="${dia.id}" aria-label="${escaparHTML(dia.etiqueta)} ${escaparHTML(tramo.inicio)}">
              ${opcionesMaterias(seleccionada)}
            </select>
          </td>
        `;
      }).join("")}
    </tr>
  `).join("");

  $("editorTablaCuerpo").querySelectorAll("[data-celda-tramo]").forEach(select => {
    select.addEventListener("change", () => {
      const tramoId = select.dataset.celdaTramo;
      const diaId = select.dataset.celdaDia;
      if (!borrador.celdas[tramoId]) borrador.celdas[tramoId] = {};
      borrador.celdas[tramoId][diaId] = select.value;
    });
  });
}

function abrirEditor() {
  if (!puedeEditar) return;

  borrador = horario
    ? crearHorarioClases(horario)
    : crearHorarioInicial(perfil || {});

  if (!borrador.celdas) borrador.celdas = {};

  $("estadoCarga").hidden = true;
  $("estadoVacio").hidden = true;
  $("vistaHorario").hidden = true;
  $("editorHorario").hidden = false;

  cargarCamposEditor();
  renderEditorMaterias();
  renderEditorTramos();
  renderEditorTabla();
  actualizarHero();
  $("editorHorario").scrollIntoView({ behavior: "smooth", block: "start" });
}

function cancelarEditor() {
  borrador = null;
  if (horario) renderVista();
  else renderVacio();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function tieneAlgunaClase(fuente) {
  return fuente.tramos.some(tramo =>
    DIAS_HORARIO.some(dia => Boolean(fuente.celdas?.[tramo.id]?.[dia.id]))
  );
}

async function guardarDesdeEditor(evento) {
  evento.preventDefault();
  sincronizarCabeceraBorrador();

  try {
    if (!borrador.materias.length) {
      throw new Error("Añade al menos una materia o bloque antes de guardar.");
    }
    if (!borrador.tramos.length) {
      throw new Error("Añade al menos un tramo horario antes de guardar.");
    }
    if (!tieneAlgunaClase(borrador)) {
      throw new Error("Asigna al menos una materia a tu semana antes de guardar.");
    }

    const validado = crearHorarioClases(borrador);
    const boton = $("formHorario").querySelector('button[type="submit"]');
    boton.disabled = true;
    boton.textContent = "☁️ Guardando…";

    await HorarioClases.guardar(validado);
    horario = validado;
    borrador = null;
    renderVista();
    mostrarMensaje("¡Tu horario quedó guardado! ✨", "exito");
    window.scrollTo({ top: 0, behavior: "smooth" });

    boton.disabled = false;
    boton.textContent = "💾 Guardar horario";
  } catch (error) {
    console.error("[Horario] No se pudo guardar", error);
    mostrarMensaje(error?.message || "No se pudo guardar el horario.", "error");
    const boton = $("formHorario").querySelector('button[type="submit"]');
    boton.disabled = false;
    boton.textContent = "💾 Guardar horario";
  }
}

function enlazarEventos() {
  $("crearHorario").addEventListener("click", abrirEditor);
  $("editarHorario").addEventListener("click", abrirEditor);
  $("cancelarEdicion").addEventListener("click", cancelarEditor);
  $("agregarMateria").addEventListener("click", agregarMateria);
  $("agregarTramo").addEventListener("click", agregarTramo);
  $("formHorario").addEventListener("submit", guardarDesdeEditor);

  $("nuevaMateria").addEventListener("keydown", evento => {
    if (evento.key !== "Enter") return;
    evento.preventDefault();
    agregarMateria();
  });
}

async function iniciar() {
  enlazarEventos();

  try {
    [perfil, horario, puedeEditar] = await Promise.all([
      PerfilUsuario.obtenerPerfil(),
      HorarioClases.leer(),
      HorarioClases.puedeEditar()
    ]);

    actualizarHero();

    if (horario) renderVista();
    else renderVacio();
  } catch (error) {
    console.error("[Horario] No se pudo iniciar", error);
    $("estadoCarga").hidden = false;
    $("estadoCarga").classList.remove("horario-estado--carga");
    $("estadoCarga").innerHTML = `
      <div class="horario-estado__icono">⚠️</div>
      <div>
        <h2>No pudimos abrir tu horario</h2>
        <p>${escaparHTML(error?.message || "Inténtalo de nuevo en unos instantes.")}</p>
      </div>
    `;
  }
}

iniciar();
