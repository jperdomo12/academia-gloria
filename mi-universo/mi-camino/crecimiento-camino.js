/* Academia Gloria Valentina · Mi Camino · Crecimiento visual real */

import { Academia } from "../../compartido/api/academia.js";

const ETAPAS = Object.freeze([
  {
    id: "semilla",
    nombre: "Semilla",
    icono: "🌰",
    desde: 0,
    imagen: "../../assets/imagenes/mi-camino/crecimiento/camino-etapa-01-semilla.png",
    titulo: "Tu camino está comenzando",
    mensaje: "Cada Misión real que completas ayuda a que tu camino empiece a crecer."
  },
  {
    id: "brote",
    nombre: "Brote",
    icono: "🌱",
    desde: 30,
    imagen: "../../assets/imagenes/mi-camino/crecimiento/camino-etapa-02-brote.png",
    titulo: "Tu camino ya ha brotado",
    mensaje: "Ya se nota todo lo que estás construyendo. Sigue avanzando a tu ritmo."
  },
  {
    id: "plantita",
    nombre: "Plantita",
    icono: "🪴",
    desde: 140,
    imagen: "../../assets/imagenes/mi-camino/crecimiento/camino-etapa-03-plantita.png",
    titulo: "Tu plantita sigue creciendo",
    mensaje: "Tus aventuras completadas van llenando tu camino de nuevas hojas."
  },
  {
    id: "arbol-joven",
    nombre: "Árbol joven",
    icono: "🌿",
    desde: 260,
    imagen: "../../assets/imagenes/mi-camino/crecimiento/camino-etapa-04-arbol-joven.png",
    titulo: "Tu árbol joven gana fuerza",
    mensaje: "Todo lo que practicas y terminas va formando nuevas ramas en tu camino."
  },
  {
    id: "arbol",
    nombre: "Árbol",
    icono: "🌳",
    desde: 400,
    imagen: "../../assets/imagenes/mi-camino/crecimiento/camino-etapa-05-arbol.png",
    titulo: "Tu árbol ya está bien formado",
    mensaje: "Tu recorrido tiene muchas experiencias y cada una forma parte de tu historia."
  },
  {
    id: "arbol-con-frutos",
    nombre: "Árbol con frutos",
    icono: "🍎",
    desde: 560,
    imagen: "../../assets/imagenes/mi-camino/crecimiento/camino-etapa-06-arbol-con-frutos.png",
    titulo: "Tu árbol empieza a dar frutos",
    mensaje: "Todo lo que has ido construyendo ya se ve en un camino lleno de experiencias."
  },
  {
    id: "arbol-lleno-de-frutos",
    nombre: "Árbol lleno de frutos",
    icono: "🍎",
    desde: 740,
    imagen: "../../assets/imagenes/mi-camino/crecimiento/camino-etapa-07-arbol-lleno-de-frutos.png",
    titulo: "Tu árbol está lleno de frutos",
    mensaje: "Has recorrido muchísimo. Tu árbol puede seguir acompañándote mientras continúas aprendiendo."
  }
]);

let detenerObservacion = null;

function cargarEstilos() {
  if (document.querySelector('link[data-crecimiento-camino-css="true"]')) return;

  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./crecimiento-camino.css", import.meta.url).href;
  enlace.dataset.crecimientoCaminoCss = "true";
  document.head.appendChild(enlace);
}

function numero(valor, predeterminado = 0) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : predeterminado;
}

function esDatoPrueba(tarea = {}) {
  return tarea.esDatoPrueba === true;
}

function esMisionRealCompletada(tarea = {}) {
  return (
    tarea.estado === "completada" &&
    tarea.visibleParaAlumno !== false &&
    !esDatoPrueba(tarea)
  );
}

function criterioCumplimiento(tarea = {}) {
  return tarea.criterioCumplimiento &&
    typeof tarea.criterioCumplimiento === "object"
      ? tarea.criterioCumplimiento
      : {};
}

function cantidadEstructurada(tarea = {}) {
  const criterio = criterioCumplimiento(tarea);
  const desdeCriterio = Math.max(
    0,
    numero(
      criterio.cantidadObjetivo ?? tarea.progreso?.cantidadObjetivo,
      0
    )
  );

  const palabras = Array.isArray(tarea.evidencia?.configuracion?.palabras)
    ? tarea.evidencia.configuracion.palabras.length
    : 0;

  return Math.max(desdeCriterio, palabras);
}

/*
 * El peso representa únicamente el alcance observable de la Misión.
 * No mide inteligencia, dificultad subjetiva ni valor personal.
 *
 * 1 = ligera
 * 2 = estándar
 * 3 = amplia
 */
function pesoCrecimiento(tarea = {}) {
  if (!esMisionRealCompletada(tarea)) return 0;

  const cantidad = cantidadEstructurada(tarea);
  const minutos = Math.max(0, numero(tarea.tiempoEstimadoMinutos, 0));
  const tipo = String(tarea.tipo || "").trim();

  if (
    tipo === "tarea_combinada" ||
    cantidad >= 5 ||
    minutos >= 30
  ) {
    return 3;
  }

  if (
    tipo === "repaso_academico" ||
    cantidad >= 2 ||
    minutos >= 15
  ) {
    return 2;
  }

  return 1;
}

function resumenCrecimiento(tareas = []) {
  const reales = tareas.filter(esMisionRealCompletada);
  const unidades = reales.reduce(
    (total, tarea) => total + pesoCrecimiento(tarea),
    0
  );

  let indice = 0;
  ETAPAS.forEach((etapa, posicion) => {
    if (unidades >= etapa.desde) indice = posicion;
  });

  const etapa = ETAPAS[indice];
  const siguiente = ETAPAS[indice + 1] || null;

  const progreso = siguiente
    ? Math.max(
        0,
        Math.min(
          100,
          ((unidades - etapa.desde) / (siguiente.desde - etapa.desde)) * 100
        )
      )
    : 100;

  return {
    etapa,
    siguiente,
    indice,
    progreso,
    misionesReales: reales.length,
    unidades
  };
}

function mensajeProximoPaso(resumen) {
  const { siguiente, progreso } = resumen;

  if (!siguiente) {
    return "Tu árbol está lleno de frutos y tu camino puede seguir creciendo contigo.";
  }

  if (progreso >= 85) {
    return `¡Ya estás muy cerca de ${siguiente.nombre}!`;
  }

  if (progreso >= 60) {
    return `Vas acercándote a ${siguiente.nombre}.`;
  }

  return `Cada Misión real te acerca a ${siguiente.nombre}.`;
}

function asegurarBloqueProgreso(contenido) {
  let bloque = contenido.querySelector("[data-crecimiento-progreso]");
  if (bloque) return bloque;

  bloque = document.createElement("div");
  bloque.className = "crecimiento-arbol__progreso";
  bloque.dataset.crecimientoProgreso = "true";
  bloque.innerHTML = `
    <div class="crecimiento-arbol__progreso-meta">
      <span data-crecimiento-misiones></span>
      <strong data-crecimiento-siguiente></strong>
    </div>
    <div
      class="crecimiento-arbol__barra"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow="0"
    >
      <span data-crecimiento-barra></span>
    </div>
    <small>
      Las Misiones de prueba no cuentan. El ritmo de cada persona puede ser diferente.
    </small>
  `;

  const etapas = contenido.querySelector(".crecimiento-arbol__etapas");
  if (etapas) contenido.insertBefore(bloque, etapas);
  else contenido.appendChild(bloque);

  return bloque;
}

function renderEtapas(contenedor, indiceActual) {
  contenedor.innerHTML = ETAPAS.map((etapa, indice) => `
    <span
      class="${indice === indiceActual ? "actual" : ""} ${indice < indiceActual ? "superada" : ""}"
      ${indice === indiceActual ? 'aria-current="step"' : ""}
    >
      ${etapa.icono} ${etapa.nombre}
    </span>
  `).join("");
}

function renderCrecimiento(tareas = []) {
  const seccion = document.querySelector(".crecimiento--arbol");
  if (!seccion) return;

  const visual = seccion.querySelector(".crecimiento-arbol__visual");
  const contenido = seccion.querySelector(".crecimiento-arbol__contenido");
  const eyebrow = contenido?.querySelector(".crecimiento-arbol__eyebrow");
  const titulo = contenido?.querySelector("h3");
  const mensaje = contenido?.querySelector("p");
  const etapas = contenido?.querySelector(".crecimiento-arbol__etapas");

  if (!visual || !contenido || !eyebrow || !titulo || !mensaje || !etapas) {
    return;
  }

  const resumen = resumenCrecimiento(tareas);
  const { etapa } = resumen;

  seccion.dataset.etapaCrecimiento = etapa.id;
  seccion.setAttribute("aria-label", `Etapa actual de Mi Camino: ${etapa.nombre}`);

  visual.innerHTML = "";
  visual.removeAttribute("aria-hidden");

  const imagen = document.createElement("img");
  imagen.className = "crecimiento-arbol__imagen";
  imagen.src = new URL(etapa.imagen, import.meta.url).href;
  imagen.alt = `Ilustración de la etapa ${etapa.nombre}`;
  imagen.loading = "eager";
  imagen.addEventListener("error", () => {
    visual.innerHTML = `<span class="crecimiento-arbol__fallback" aria-hidden="true">${etapa.icono}</span>`;
  }, { once: true });
  visual.appendChild(imagen);

  eyebrow.textContent = `Etapa actual · ${etapa.icono} ${etapa.nombre}`;
  titulo.textContent = etapa.titulo;
  mensaje.textContent = etapa.mensaje;

  renderEtapas(etapas, resumen.indice);

  const progreso = asegurarBloqueProgreso(contenido);
  const misiones = progreso.querySelector("[data-crecimiento-misiones]");
  const siguiente = progreso.querySelector("[data-crecimiento-siguiente]");
  const barra = progreso.querySelector("[data-crecimiento-barra]");
  const barraContenedor = progreso.querySelector(".crecimiento-arbol__barra");

  if (misiones) {
    misiones.textContent =
      `✅ ${resumen.misionesReales} ${resumen.misionesReales === 1 ? "Misión real completada" : "Misiones reales completadas"}`;
  }

  if (siguiente) siguiente.textContent = mensajeProximoPaso(resumen);
  if (barra) barra.style.width = `${resumen.progreso.toFixed(1)}%`;
  if (barraContenedor) {
    barraContenedor.setAttribute("aria-valuenow", String(Math.round(resumen.progreso)));
    barraContenedor.setAttribute(
      "aria-label",
      resumen.siguiente
        ? `Progreso hacia ${resumen.siguiente.nombre}`
        : "Etapa visual máxima actual alcanzada"
    );
  }
}

function iniciar() {
  cargarEstilos();

  if (detenerObservacion) detenerObservacion();

  detenerObservacion = Academia.tareas.observar(
    tareas => renderCrecimiento(Array.isArray(tareas) ? tareas : []),
    error => {
      console.warn("No se pudo actualizar el crecimiento de Mi Camino.", error);
    }
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
