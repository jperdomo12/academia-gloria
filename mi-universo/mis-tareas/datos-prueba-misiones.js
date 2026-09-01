/* Academia Gloria Valentina · Marca de Misiones para datos de prueba */

import { db } from "../../compartido/firebase/firebase-config.js";
import { Academia } from "../../compartido/api/academia.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";
import {
  doc,
  serverTimestamp,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

let instalada = false;
let tareasPorId = new Map();
let soloPruebas = false;
let detenerObservacion = null;
let decoracionPendiente = false;

function texto(valor = "") {
  return String(valor ?? "").trim();
}

function esDatoPrueba(tarea = {}) {
  return tarea.esDatoPrueba === true;
}

function cargarEstilos() {
  if (document.getElementById("estilosDatosPruebaMisiones")) return;

  const estilos = document.createElement("style");
  estilos.id = "estilosDatosPruebaMisiones";
  estilos.textContent = `
    .mision-prueba-badge {
      display: inline-flex;
      align-items: center;
      gap: .3rem;
      margin-left: .55rem;
      padding: .2rem .55rem;
      border-radius: 999px;
      background: #fff4d6;
      border: 1px solid #f2cf77;
      color: #805a00;
      font-size: .73rem;
      font-weight: 800;
      vertical-align: middle;
      white-space: nowrap;
    }

    .accion-dato-prueba {
      border-color: #e0bd5a !important;
      background: #fff9e8 !important;
      color: #6f5208 !important;
    }

    .accion-dato-prueba.marcada {
      background: #fff1bf !important;
    }

    .estado-datos-prueba {
      margin-top: 1rem;
    }
  `;
  document.head.appendChild(estilos);
}

function idTarjeta(tarjeta) {
  return texto(tarjeta?.querySelector("[data-id]")?.dataset?.id);
}

function asegurarEstadoPruebas() {
  const lista = document.getElementById("listaTareas");
  if (!lista?.parentElement) return null;

  let estado = document.getElementById("estadoDatosPrueba");
  if (!estado) {
    estado = document.createElement("div");
    estado.id = "estadoDatosPrueba";
    estado.className = "estado-carga estado-datos-prueba hidden";
    estado.textContent = "No hay Misiones marcadas como 🧪 Datos de prueba.";
    lista.parentElement.insertBefore(estado, lista);
  }
  return estado;
}

function aplicarFiltroPruebas() {
  const tarjetas = [...document.querySelectorAll("#listaTareas .tarea-card")];
  const estado = asegurarEstadoPruebas();

  if (!soloPruebas) {
    tarjetas.forEach(tarjeta => {
      if (tarjeta.hidden) tarjeta.hidden = false;
    });
    estado?.classList.add("hidden");
    return;
  }

  let visibles = 0;
  tarjetas.forEach(tarjeta => {
    const tarea = tareasPorId.get(idTarjeta(tarjeta));
    const mostrar = esDatoPrueba(tarea);
    if (tarjeta.hidden === mostrar) tarjeta.hidden = !mostrar;
    if (mostrar) visibles += 1;
  });

  estado?.classList.toggle("hidden", visibles > 0);
}

function actualizarFiltroPruebas() {
  const boton = document.querySelector("[data-filtro-datos-prueba]");
  if (!boton) return;
  const cantidad = [...tareasPorId.values()].filter(esDatoPrueba).length;
  const etiqueta = `🧪 Pruebas${cantidad ? ` (${cantidad})` : ""}`;
  if (boton.textContent !== etiqueta) boton.textContent = etiqueta;
}

function asegurarFiltroPruebas() {
  const filtros = document.querySelector("#panelLista .filtros");
  if (!filtros) return;

  let boton = filtros.querySelector("[data-filtro-datos-prueba]");
  if (!boton) {
    boton = document.createElement("button");
    boton.type = "button";
    boton.className = "filtro";
    boton.dataset.filtroDatosPrueba = "true";
    boton.textContent = "🧪 Pruebas";
    filtros.appendChild(boton);

    boton.addEventListener("click", () => {
      const todas = filtros.querySelector('[data-filter="todas"]');
      todas?.click();

      window.setTimeout(() => {
        soloPruebas = true;
        filtros.querySelectorAll("[data-filter]").forEach(item => {
          item.classList.remove("active");
        });
        boton.classList.add("active");
        aplicarFiltroPruebas();
      }, 0);
    });

    filtros.addEventListener("click", event => {
      const normal = event.target?.closest?.("[data-filter]");
      if (!normal) return;
      soloPruebas = false;
      boton.classList.remove("active");
      window.setTimeout(aplicarFiltroPruebas, 0);
    }, true);
  }

  actualizarFiltroPruebas();
}

async function cambiarMarca(misionId, boton) {
  const id = texto(misionId);
  const tarea = tareasPorId.get(id);
  if (!id || !tarea || boton?.disabled) return;

  const nuevaMarca = !esDatoPrueba(tarea);
  if (nuevaMarca) {
    const confirmado = window.confirm(
      "¿Marcar esta Misión como 🧪 Datos de prueba?\n\n" +
      "La marca servirá para identificarla fácilmente y eliminarla después con todos sus datos exclusivos."
    );
    if (!confirmado) return;
  }

  if (boton) {
    boton.disabled = true;
    boton.textContent = nuevaMarca ? "🧪 Marcando…" : "Quitando marca…";
  }

  try {
    const contexto = await ContextoUsuario.inicializar();
    const userId = texto(contexto.userIdPersonaActiva);
    if (!userId) throw new Error("No se pudo resolver el alumno activo.");

    const actorUserId = texto(
      contexto.usuario?.userId ||
      contexto.usuario?.uid ||
      contexto.userId ||
      contexto.uid
    );

    const cambios = {
      esDatoPrueba: nuevaMarca,
      updatedAt: serverTimestamp()
    };
    if (actorUserId) cambios.updatedBy = actorUserId;

    await updateDoc(
      doc(db, "usuarios", userId, "tareas", id),
      cambios
    );

    tareasPorId.set(id, {
      ...tarea,
      esDatoPrueba: nuevaMarca
    });
    programarDecoracion();
  } catch (error) {
    console.error("No se pudo actualizar la marca de prueba.", error);
    window.alert(
      `No se pudo actualizar la marca de prueba.\n${error.message || "Error no identificado"}`
    );
    if (boton) boton.disabled = false;
  }
}

function decorarTarjetas() {
  document.querySelectorAll("#listaTareas .tarea-card").forEach(tarjeta => {
    const id = idTarjeta(tarjeta);
    const tarea = tareasPorId.get(id);
    if (!id || !tarea) return;

    const titulo = tarjeta.querySelector(".tarea-card__resumen-principal h3");
    let badge = tarjeta.querySelector("[data-badge-datos-prueba]");

    if (esDatoPrueba(tarea)) {
      if (!badge && titulo) {
        badge = document.createElement("span");
        badge.className = "mision-prueba-badge";
        badge.dataset.badgeDatosPrueba = "true";
        badge.textContent = "🧪 Prueba";
        titulo.appendChild(badge);
      }
    } else {
      badge?.remove();
    }

    const acciones = tarjeta.querySelector(".tarea-acciones");
    if (!acciones) return;

    let boton = acciones.querySelector("[data-marcar-datos-prueba]");
    if (!boton) {
      boton = document.createElement("button");
      boton.type = "button";
      boton.className = "btn accion-dato-prueba";
      boton.dataset.marcarDatosPrueba = id;
      const eliminar = acciones.querySelector('[data-action="delete"]');
      acciones.insertBefore(boton, eliminar || null);
      boton.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        cambiarMarca(boton.dataset.marcarDatosPrueba, boton);
      });
    }

    boton.dataset.marcarDatosPrueba = id;
    boton.classList.toggle("marcada", esDatoPrueba(tarea));
    const etiqueta = esDatoPrueba(tarea)
      ? "🧪 Quitar marca de prueba"
      : "🧪 Marcar como prueba";
    if (boton.textContent !== etiqueta) boton.textContent = etiqueta;
    boton.disabled = false;
  });
}

function decorarSelectorLimpieza() {
  const selector = document.getElementById("limpiezaMision");
  if (!selector) return;

  [...selector.options].forEach(opcion => {
    const id = texto(opcion.value);
    if (!id) return;

    if (!opcion.dataset.textoSinMarcaPrueba) {
      opcion.dataset.textoSinMarcaPrueba = opcion.textContent.replace(/^🧪\s*/, "");
    }

    const base = opcion.dataset.textoSinMarcaPrueba;
    const etiqueta = esDatoPrueba(tareasPorId.get(id))
      ? `🧪 ${base}`
      : base;
    if (opcion.textContent !== etiqueta) opcion.textContent = etiqueta;
  });
}

function programarDecoracion() {
  if (decoracionPendiente) return;
  decoracionPendiente = true;

  window.requestAnimationFrame(() => {
    decoracionPendiente = false;
    asegurarFiltroPruebas();
    decorarTarjetas();
    decorarSelectorLimpieza();
    aplicarFiltroPruebas();
  });
}

export function instalarMarcaDatosPrueba() {
  if (instalada) return;
  instalada = true;
  cargarEstilos();

  const observadorDom = new MutationObserver(programarDecoracion);
  observadorDom.observe(document.body, {
    childList: true,
    subtree: true
  });

  detenerObservacion = Academia.tareas.observar(
    nuevasTareas => {
      tareasPorId = new Map(
        nuevasTareas.map(tarea => [texto(tarea.id), tarea])
      );
      programarDecoracion();
    },
    error => console.debug("No se pudo observar la marca de datos de prueba.", error)
  );

  programarDecoracion();

  window.addEventListener("beforeunload", () => {
    detenerObservacion?.();
    observadorDom.disconnect();
  }, { once: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", instalarMarcaDatosPrueba, { once: true });
} else {
  instalarMarcaDatosPrueba();
}
