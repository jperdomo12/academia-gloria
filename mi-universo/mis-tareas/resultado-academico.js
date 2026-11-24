import { Academia } from "../../compartido/api/academia.js";
import { auth } from "../../compartido/firebase/firebase-config.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";
import { leerSesionAcademica } from "../../compartido/js/sesiones-academicas.js";
import {
  disponible as lectorDisponible,
  escuchar,
  detener
} from "../../compartido/js/lector-texto.js";

const $ = id => document.getElementById(id);
const parametros = new URLSearchParams(window.location.search);
const sesionIdParametro = String(parametros.get("sesionId") || "").trim();
const misionId = String(parametros.get("misionId") || "").trim();
const rutaLogin = new URL("../../login.html", import.meta.url).href;

const BLOQUES_CONOCIDOS = Object.freeze({
  doble:"El doble",suma:"Reunir cantidades",reparto:"Reparto con resto",grupos:"Grupos iguales",comparacion:"Comparar cantidades",comprension:"Comprensión de la historia",
  "numeros-operaciones": "Números y operaciones",
  "fracciones-decimales": "Fracciones y decimales",
  "problemas-medidas": "Problemas y medidas",
  geometria: "Geometría básica",
  "significado-equivalencias": "Significado y equivalencias",
  "igual-denominador": "Mismo denominador",
  "comun-denominador": "Denominador común",
  "multiplicar-dividir": "Multiplicar y dividir",
  problemas: "Problemas"
});

function escaparHTML(valor = "") {
  return String(valor).replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caracter]);
}

function numero(valor, alternativo = 0) {
  const resultado = Number(valor);
  return Number.isFinite(resultado) ? resultado : alternativo;
}

function limitarPorcentaje(valor) {
  return Math.max(0, Math.min(100, Math.round(numero(valor))));
}

function textoParaVoz(valor = "") {
  return String(valor)
    .replace(/m\.c\.m\./gi, " mínimo común múltiplo ")
    .replace(/(\d+)\s*\/\s*(\d+)/g, "$1 sobre $2")
    .replaceAll("×", " por ")
    .replaceAll("÷", " dividido entre ")
    .replaceAll("−", " menos ")
    .replaceAll("+", " más ")
    .replaceAll("=", " es igual a ")
    .replace(/\s+/g, " ")
    .trim();
}

function fechaDesdeValor(valor) {
  if (!valor) return null;
  if (typeof valor?.toDate === "function") return valor.toDate();
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}

function formatearFechaHora(valor) {
  const fecha = fechaDesdeValor(valor);
  if (!fecha) return "Fecha no disponible";

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(fecha);
}

function formatearTiempo(segundos) {
  const total = Math.max(0, Math.round(numero(segundos)));
  if (!total) return "—";

  const minutos = Math.floor(total / 60);
  const resto = total % 60;

  if (!minutos) return `${resto} s`;
  if (!resto) return `${minutos} min`;
  return `${minutos} min ${resto} s`;
}

function tituloBloque(item = {}) {
  const explicito = String(item.titulo || item.nombre || "").trim();
  if (explicito) return explicito;

  const id = String(item.bloqueId || item.id || "").trim();
  if (BLOQUES_CONOCIDOS[id]) return BLOQUES_CONOCIDOS[id];

  if (!id) return "Bloque académico";

  return id
    .replace(/[-_]+/g, " ")
    .replace(/\b\p{L}/gu, letra => letra.toUpperCase());
}

function estadoBloque(item = {}) {
  const correctas = Math.max(0, numero(item.correctas));
  const total = Math.max(0, numero(item.total));
  const proporcion = total ? correctas / total : 0;
  const guardado = String(item.estado || "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");

  if (["solido", "sólido", "firme"].includes(guardado) || (!guardado && proporcion >= .8)) {
    return {
      id: "solido",
      icono: "✅",
      etiqueta: "Sólido",
      descripcion: "Este bloque quedó firme en esta sesión."
    };
  }

  if (
    ["en-camino", "camino", "avanzando"].includes(guardado) ||
    (!guardado && proporcion >= .5)
  ) {
    return {
      id: "camino",
      icono: "🌱",
      etiqueta: "En camino",
      descripcion: "Hay una buena base y conviene seguir practicando."
    };
  }

  return {
    id: "reforzar",
    icono: "🌿",
    etiqueta: "Conviene reforzar",
    descripcion: "Este bloque merece volver a verse con apoyo y práctica."
  };
}

function resumenSesion(sesion = {}) {
  const respuestas = Array.isArray(sesion.respuestas) ? sesion.respuestas : [];
  const resumen = sesion.resumen && typeof sesion.resumen === "object"
    ? sesion.resumen
    : {};

  const total = Math.max(0, numero(resumen.totalPreguntas, respuestas.length));
  const correctasCalculadas = respuestas.filter(item => item.correcta === true).length;
  const correctas = Math.max(
    0,
    Math.min(total || correctasCalculadas, numero(resumen.totalCorrectas, correctasCalculadas))
  );
  const porcentaje = total
    ? limitarPorcentaje(numero(resumen.porcentaje, (correctas / total) * 100))
    : 0;

  return { respuestas, resumen, total, correctas, porcentaje };
}

function mapaSesion(sesion = {}, respuestas = []) {
  const porBloque = Array.isArray(sesion.resumen?.porBloque)
    ? sesion.resumen.porBloque
    : [];

  if (porBloque.length) return porBloque;

  const bloques = new Map();

  respuestas.forEach(respuesta => {
    const id = String(respuesta.bloqueId || "sin-bloque");
    const actual = bloques.get(id) || {
      bloqueId: id,
      correctas: 0,
      total: 0
    };
    actual.total += 1;
    if (respuesta.correcta === true) actual.correctas += 1;
    bloques.set(id, actual);
  });

  return [...bloques.values()];
}

function renderContexto(sesion) {
  const chips = [
    sesion.cursoReferencia ? `🎓 ${sesion.cursoReferencia}` : "",
    sesion.materia ? `📚 ${sesion.materia}` : "",
    sesion.tema ? `🎯 ${sesion.tema}` : ""
  ].filter(Boolean);

  $("contextoAcademico").innerHTML = chips
    .map(item => `<span class="resultado-chip">${escaparHTML(item)}</span>`)
    .join("");
}

function renderMapa(sesion, respuestas) {
  if(sesion.resumen?.tipoEvaluacion==="practica_formativa") {
    $("mapaBloques").innerHTML=mapaSesion(sesion,respuestas).map(b=>`<article class="resultado-bloque"><h3>${escaparHTML(tituloBloque(b))}</h3><p>${numero(b.completadas)} de ${numero(b.total)} ${sesion.resumen.unidadRecorrido?"fases":"preguntas"} realizadas</p><p>${numero(b.correctas)} resueltas al primer intento sin pistas · ${numero(b.conPistas)} con pistas · ${numero(b.conReintentos)} con reintentos · ${numero(b.dudas)} dudas marcadas</p><p>${b.estado==="reforzar"?"Conviene volver a las ideas que necesitaron apoyo.":"Puedes seguir practicando cuando quieras."}</p></article>`).join("");
    return;
  }
  const mapa = mapaSesion(sesion, respuestas);

  if (!mapa.length) {
    $("mapaBloques").innerHTML = `
      <div class="resultado-vacio">
        Esta sesión no contiene todavía un mapa por bloques.
      </div>`;
    return;
  }

  $("mapaBloques").innerHTML = mapa.map(item => {
    const correctas = Math.max(0, numero(item.correctas));
    const total = Math.max(0, numero(item.total));
    const porcentaje = total
      ? limitarPorcentaje((correctas / total) * 100)
      : 0;
    const estado = estadoBloque(item);

    return `
      <article class="resultado-bloque resultado-bloque--${estado.id}">
        <div class="resultado-bloque__cabecera">
          <div>
            <h3>${escaparHTML(tituloBloque(item))}</h3>
            <p>${escaparHTML(estado.descripcion)}</p>
          </div>
          <span class="resultado-bloque__estado">
            ${estado.icono} ${escaparHTML(estado.etiqueta)}
          </span>
        </div>
        <div class="resultado-bloque__conteo">
          <span>${correctas} de ${total}</span>
          <span>·</span>
          <span>${porcentaje} %</span>
        </div>
        <div class="resultado-bloque__barra" aria-label="${porcentaje} por ciento">
          <span style="width:${porcentaje}%"></span>
        </div>
      </article>`;
  }).join("");
}

function textoEscuchaRespuesta(respuesta, indice) {
  if(respuesta.tipoEvidencia==="practica_formativa")return textoParaVoz(`Pregunta ${indice+1}. ${respuesta.enunciado} ${respuesta.pregunta}. Primera respuesta: ${respuesta.primeraRespuesta?.respuestaTexto||""}, ${respuesta.correctaPrimerIntento?"correcta":"necesitó otro intento"}. Respuesta final: ${respuesta.respuestaTexto}, resuelta. ${respuesta.intentos} intentos. ${respuesta.pistasUtilizadas?.length||0} pistas. ${respuesta.duda?"Duda marcada.":""} ${respuesta.explicacion||""}`);
  const partes = [
    `Pregunta ${indice + 1}.`,
    respuesta.titulo,
    respuesta.enunciado,
    respuesta.pregunta,
    `Respuesta seleccionada: ${respuesta.respuestaTexto || respuesta.respuesta || "sin respuesta"}.`,
    respuesta.correcta
      ? "La respuesta fue correcta."
      : `La respuesta fue incorrecta. La respuesta correcta era ${respuesta.respuestaCorrectaTexto || respuesta.respuestaCorrecta || "la indicada en el resultado"}.`,
    respuesta.explicacion ? `Explicación: ${respuesta.explicacion}` : ""
  ];

  return textoParaVoz(partes.filter(Boolean).join(" "));
}

function renderRevision(respuestas) {
  if (!respuestas.length) {
    $("revisionRespuestas").innerHTML = `
      <div class="resultado-vacio">
        Esta sesión no contiene respuestas individuales para revisar.
      </div>`;
    return;
  }

  $("revisionRespuestas").innerHTML = respuestas.map((respuesta, indice) => {
    const correcta = respuesta.correcta === true;
    const enunciado = [respuesta.enunciado, respuesta.pregunta]
      .filter(Boolean)
      .join(" · ");

    if(respuesta.tipoEvidencia==="practica_formativa")return `
      <article class="resultado-respuesta" id="respuesta-${indice}"><h3>${indice+1}. ${escaparHTML(respuesta.titulo||"Pregunta")}</h3><p>${escaparHTML(enunciado)}</p>
        <p><b>Primera respuesta:</b> ${escaparHTML(respuesta.primeraRespuesta?.respuestaTexto||"")} · ${respuesta.correctaPrimerIntento?"Correcta":"Necesitó otro intento"}</p>
        <p><b>Respuesta final:</b> ${escaparHTML(respuesta.respuestaTexto)} · Resuelta</p>
        <p>${respuesta.correcta?"Resuelta al primer intento sin pistas.":"Resuelta después de apoyos o reintentos."} ${respuesta.duda?"Duda marcada para volver a esta idea.":""}</p>
        <details><summary>Ver ${numero(respuesta.intentos)} intentos y ${respuesta.pistasUtilizadas?.length||0} pistas</summary>
          <ol>${(respuesta.historialIntentos||[]).map(i=>`<li>${escaparHTML(i.respuestaTexto)} · ${i.correcta?"Correcta":"Volver a pensar"}</li>`).join("")}</ol>
          <ul>${(respuesta.pistasUtilizadas||[]).map(i=>`<li>${escaparHTML(i.texto)} (tras ${numero(i.antesDeIntento)} intentos)</li>`).join("")}</ul>
        </details><p><b>Explicación:</b> ${escaparHTML(respuesta.explicacion||"")}</p>
        ${lectorDisponible()?`<button class="resultado-escuchar" type="button" data-escuchar-respuesta="${indice}">🔊 Escuchar explicación</button>`:""}
      </article>`;
    return `
      <article class="resultado-respuesta ${
        correcta ? "resultado-respuesta--correcta" : "resultado-respuesta--incorrecta"
      }">
        <div class="resultado-respuesta__cabecera">
          <div class="resultado-respuesta__estado" aria-hidden="true">
            ${correcta ? "✅" : "🌿"}
          </div>
          <div>
            <h3>${indice + 1}. ${escaparHTML(respuesta.titulo || "Pregunta")}</h3>
            ${enunciado
              ? `<p class="resultado-respuesta__enunciado">${escaparHTML(enunciado)}</p>`
              : ""}
          </div>
        </div>

        <div class="resultado-respuesta__datos">
          <p>
            <b>Respuesta seleccionada:</b>
            ${escaparHTML(respuesta.respuestaTexto || respuesta.respuesta || "Sin respuesta")}
            · <strong>${correcta ? "Correcta" : "Incorrecta"}</strong>
          </p>
          ${correcta
            ? ""
            : `<p><b>Respuesta correcta:</b> ${escaparHTML(
                respuesta.respuestaCorrectaTexto ||
                respuesta.respuestaCorrecta ||
                "No disponible"
              )}</p>`}
          ${respuesta.explicacion
            ? `<p><b>Explicación:</b> ${escaparHTML(respuesta.explicacion)}</p>`
            : ""}
        </div>

        ${lectorDisponible()
          ? `<div class="resultado-respuesta__acciones">
               <button
                 class="resultado-escuchar"
                 type="button"
                 data-escuchar-respuesta="${indice}"
               >🔊 Escuchar explicación</button>
             </div>`
          : ""}
      </article>`;
  }).join("");

  document.querySelectorAll("[data-escuchar-respuesta]").forEach(boton => {
    boton.addEventListener("click", () => {
      const indice = Number(boton.dataset.escucharRespuesta);
      const respuesta = respuestas[indice];
      if (!respuesta) return;
      escuchar(textoEscuchaRespuesta(respuesta, indice));
    });
  });
}

function renderResultado(sesion, contexto) {
  const { respuestas, total, correctas, porcentaje } = resumenSesion(sesion);
  const formativa=sesion.resumen?.tipoEvaluacion==="practica_formativa";
  const nombre = String(
    contexto.personaActiva?.nombreVisible ||
    contexto.personaActiva?.nombre ||
    "Alumno"
  ).trim();

  $("tituloActividad").textContent =
    sesion.tituloActividad || sesion.tema || "Resultado académico";
  $("descripcionSesion").textContent =
    `Resultado histórico de una sesión de ${sesion.materia || "aprendizaje"}. ` +
    (formativa?`Recorrido: ${sesion.resumen.recorridoTitulo}. Registro del recorrido completo, con respuestas iniciales, resolución y apoyos; sin nota.`:"La información se reconstruye exclusivamente a partir del registro guardado al finalizar la prueba.");
  $("nombreAlumno").textContent = nombre;
  $("fechaSesion").textContent = formatearFechaHora(
    sesion.completadaEn || sesion.updatedAt || sesion.finCliente
  );

  renderContexto(sesion);

  $("metricaCorrectas").textContent = `${correctas} / ${total}`;
  $("metricaPorcentaje").textContent = formativa?String(correctas):`${porcentaje} %`;
  if(formativa){
    $("metricaCorrectas").textContent=`${sesion.resumen.preguntasCompletadas} / ${total}`;
    $("etiquetaMetricaCorrectas").textContent="preguntas realizadas";
    $("etiquetaMetricaPorcentaje").textContent=sesion.resumen.unidadRecorrido?"fases al primer intento sin pistas":"al primer intento sin pistas";
    if(sesion.resumen.unidadRecorrido){
      $("metricaCorrectas").textContent=`${sesion.resumen.unidadesCompletadas} / ${sesion.resumen.totalUnidades}`;
      $("etiquetaMetricaCorrectas").textContent=sesion.resumen.unidadRecorrido==="problemas"?"problemas realizados":"microactividades realizadas";
      if(sesion.resumen.bloqueId)$("descripcionSesion").textContent+=` Bloque ${sesion.resumen.bloqueId} de ${sesion.resumen.bloquesPorVuelta}.`;
      $("problemasGuardados").hidden=false;
      $("problemasGuardados").innerHTML=`<h2>Lo que trabajaste en esta sesión</h2><ol>${(sesion.resumen.problemas||[]).map(p=>`<li><a href="#respuesta-${respuestas.findIndex(r=>r.problemaId===p.id)}">${escaparHTML(p.titulo)}</a><p>${escaparHTML(p.enunciado)}</p></li>`).join("")}</ol><p>Debajo puedes consultar cada fase: comprensión, relación, operaciones y comprobación, con sus primeras respuestas y ayudas.</p>`;
    }
  }
  $("metricaTiempo").textContent = formatearTiempo(sesion.tiempoActivoSegundos);

  renderMapa(sesion, respuestas);
  renderRevision(respuestas);

  const mensaje = String(
    sesion.retroalimentacion?.mensajeVisible || ""
  ).trim();

  if (mensaje) {
    $("mensajeFormativo").hidden = false;
    $("mensajeFormativo").querySelector("p").textContent = mensaje;
  }

  if (!lectorDisponible()) {
    $("escucharResumen").hidden = true;
  } else {
    $("escucharResumen").addEventListener("click", () => {
      if(formativa&&sesion.resumen.unidadRecorrido){escuchar(textoParaVoz(`${sesion.tituloActividad}. ${sesion.resumen.recorridoTitulo}. ${sesion.resumen.unidadesCompletadas} ${sesion.resumen.unidadRecorrido} realizados. ${total} fases completadas; ${correctas} al primer intento sin pistas. ${sesion.resumen.conPistas} con pistas y ${sesion.resumen.conReintentos} con reintentos. Sin nota.`));return;}
      if(formativa){escuchar(textoParaVoz(`${sesion.tituloActividad}. ${sesion.resumen.recorridoTitulo}. ${sesion.resumen.preguntasCompletadas} de ${total} preguntas realizadas. ${correctas} al primer intento sin pistas; ${sesion.resumen.conPistas} con pistas, ${sesion.resumen.conReintentos} con reintentos y ${sesion.resumen.dudasMarcadas} dudas marcadas. Sin nota.`));return;}
      const mapa = mapaSesion(sesion, respuestas);
      const textoMapa = mapa.map(item => {
        const estado = estadoBloque(item);
        return `${tituloBloque(item)}: ${item.correctas || 0} de ${item.total || 0}, ${estado.etiqueta}.`;
      }).join(" ");

      escuchar(
        textoParaVoz(
          `${sesion.tituloActividad || sesion.tema || "Resultado académico"}. ` +
          `${correctas} respuestas correctas de ${total}, ${porcentaje} por ciento. ` +
          textoMapa
        )
      );
    });
  }

  $("estadoCarga").hidden = true;
  $("contenidoResultado").hidden = false;
}

function mostrarError(mensaje) {
  detener();
  $("estadoCarga").hidden = true;
  $("contenidoResultado").hidden = true;
  $("estadoError").hidden = false;
  $("textoError").textContent = mensaje;
}

function esEvidenciaAcademica(evidencia = {}) {
  return (
    String(evidencia.tipo || "") === "sesion_academica" ||
    String(evidencia.origen || "") === "sesion_academica"
  );
}

async function resolverSesionId() {
  if (sesionIdParametro) return sesionIdParametro;
  if (!misionId) return "";

  const evidencias = await Academia.tareas.leerEvidencias(misionId);
  const evidencia = evidencias.find(item =>
    esEvidenciaAcademica(item) && String(item.sesionId || "").trim()
  );

  return String(evidencia?.sesionId || "").trim();
}

async function mostrarBloquesRelacionados(sesion){
  if(!misionId||!sesion.resumen?.vueltaId||Number(sesion.resumen.bloquesPorVuelta)<2)return;
  const nav=$("sesionesRecorrido");
  try{
    const evidencias=await Academia.tareas.leerEvidencias(misionId);
    const bloques=evidencias.filter(e=>e.actividadId===sesion.actividadId&&e.atributos?.vueltaId===sesion.resumen.vueltaId&&e.sesionId).sort((a,b)=>Number(a.atributos.bloqueId)-Number(b.atributos.bloqueId));
    nav.replaceChildren(...bloques.map(e=>{const a=document.createElement("a"),url=new URL(window.location.href);url.searchParams.set("sesionId",e.sesionId);a.href=url.href;a.className="resultado-chip";a.textContent=`Bloque ${e.atributos.bloqueId} de ${sesion.resumen.bloquesPorVuelta} · ${e.atributos.problemasCompletados||""} problemas`;if(e.sesionId===sesion.id||e.sesionId===sesionIdParametro)a.setAttribute("aria-current","page");return a;}));nav.hidden=!bloques.length;
  }catch(error){console.warn("No se pudo recuperar la lista de bloques de la Misión.",error);}
}

async function iniciar() {
  await auth.authStateReady();

  if (!auth.currentUser) {
    const retorno = encodeURIComponent(
      `${window.location.pathname}${window.location.search}`
    );
    window.location.replace(`${rutaLogin}?volver=${retorno}`);
    return;
  }

  try {
    const contexto = await ContextoUsuario.inicializar();
    const sesionId = await resolverSesionId();

    if (!sesionId) {
      mostrarError(
        misionId
          ? "Esta Misión no tiene una sesión académica histórica disponible. Regresa a Trabajo realizado e inténtalo de nuevo."
          : "Falta la referencia de la sesión académica. Regresa a Trabajo realizado y abre de nuevo el resultado."
      );
      return;
    }

    const sesion = await leerSesionAcademica(sesionId);

    if (!sesion) {
      mostrarError(
        "No encontramos esta sesión para la Persona Activa. Comprueba que estás viendo a la misma persona y vuelve a intentarlo."
      );
      return;
    }

    if (sesion.contrato && sesion.contrato !== "sesion-academica-v1") {
      mostrarError("El registro encontrado no corresponde a una sesión académica compatible.");
      return;
    }

    if (
      misionId &&
      sesion.misionId &&
      String(sesion.misionId) !== misionId
    ) {
      mostrarError("Esta sesión no pertenece a la Misión desde la que se abrió el resultado.");
      return;
    }

    if (sesion.actividadId === "rincon-dictados") {
      const destino = new URL("../rincon-dictados/", location.href);
      destino.searchParams.set("sesionId", sesionId);
      location.replace(destino.href);
      return;
    }

    renderResultado(sesion, contexto);
    await mostrarBloquesRelacionados(sesion);
  } catch (error) {
    console.error("No se pudo cargar el resultado académico.", error);
    mostrarError(
      "No pudimos recuperar el resultado guardado. Revisa la conexión o los permisos de la Persona Activa."
    );
  }
}

window.addEventListener("beforeunload", detener);

iniciar();
