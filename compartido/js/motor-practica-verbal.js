import { auth } from "../firebase/firebase-config.js";
import { ContextoUsuario } from "./contexto-usuario.js";
import { crearTiempoActivo } from "./tiempo-activo.js";
import { mostrarCelebracion } from "./celebracion.js";
import {
  guardarSesionAcademica,
  obtenerVariantesRecientes,
  MODOS_SESION_ACADEMICA
} from "./sesiones-academicas.js";
import { escuchar, detener, disponible } from "./lector-texto.js";

// Normalización acotada: no elimina auxiliares ni palabras, ni admite tiempos incorrectos.
export function normalizarRespuestaVerbal(valor="") {
  return String(valor).trim().toLowerCase().replace(/[’‘´`]/g,"'")
    .replace(/\bdidn't\b/g,"did not").replace(/\bwasn't\b/g,"was not").replace(/\bweren't\b/g,"were not")
    .replace(/[.!?]+$/g,"").replace(/\s*\/\s*/g," / ").replace(/\s+/g," ").trim();
}
export function esRespuestaVerbalCorrecta(item,respuesta) {
  return item.formato==="texto"
    ? (item.respuestasValidas || [item.respuestaCorrecta]).some(v=>normalizarRespuestaVerbal(v)===normalizarRespuestaVerbal(respuesta))
    : respuesta===item.respuestaCorrecta;
}

// Filtro y dudas del mismo recorrido de práctica; sin sesiones ni estado persistente.
export function filtrarPracticaVerbal(practica,filtro="todas",ids=null) {
  const permitidas=ids===null?null:new Set(ids);
  return practica.filter(p=>(!filtro||filtro==="todas"||(p.focoId||p.bloqueId)===filtro)&&(!permitidas||permitidas.has(p.id)));
}
export function dudasPracticaVerbal(practica,intentos,pistas,marcadas) {
  return practica.filter(p=>(intentos.get(p.id)||0)>1||pistas.has(p.id)||marcadas.has(p.id)).map(p=>p.id);
}

// Sesión formativa del mismo motor: solo se construye con cobertura completa y respuestas reales.
export function construirRegistroFormativo({meta,recorridoId,preguntas,historial,pistas,dudas,intentoId,inicioCliente,finCliente,identidad,misionId="",tiempo={}}) {
  const recorrido=meta.recorridos?.find(r=>r.id===recorridoId);
  if(!recorrido||preguntas.length!==recorrido.cantidad||new Set(preguntas.map(p=>p.id)).size!==recorrido.cantidad||recorrido.ids.some(id=>!preguntas.some(p=>p.id===id)))throw new Error("El recorrido no está completo.");
  if(!identidad.personaId||!identidad.actorUserId)throw new Error("No se pudo fijar la identidad del intento. Vuelve a abrir la actividad.");
  const respuestas=preguntas.map(p=>{
    const elecciones=historial.get(p.id)||[],ayudas=pistas.get(p.id)||[];
    const primera=elecciones[0],final=elecciones.at(-1);
    if(!primera||!final||!esRespuestaVerbalCorrecta(p,final.respuesta))throw new Error("Faltan preguntas resueltas en este recorrido.");
    const sinApoyos=primera.correcta===true&&ayudas.length===0;
    return {preguntaId:p.id,bloqueId:p.bloqueId,conceptoId:p.conceptoId||p.id,tipoEvidencia:"practica_formativa",titulo:p.titulo,enunciado:p.enunciado,pregunta:p.pregunta,
      respuesta:final.respuesta,respuestaTexto:final.respuestaTexto,respuestaCorrecta:p.respuestaCorrecta,respuestaCorrectaTexto:p.opciones?.find(o=>o.id===p.respuestaCorrecta)?.texto||p.respuestaCorrecta,
      correcta:sinApoyos,correctaPrimerIntento:primera.correcta===true,resuelta:true,errorInicial:primera.correcta!==true,
      primeraRespuesta:{...primera},respuestaFinal:{...final},intentos:elecciones.length,historialIntentos:elecciones.map(e=>({...e})),pistasUtilizadas:ayudas.map(a=>({...a})),duda:dudas.has(p.id),
      requiereRefuerzo:!sinApoyos||dudas.has(p.id),explicacion:p.explicacion||""};
  });
  const contar=(xs,fn)=>xs.filter(fn).length;
  const porBloque=[...new Set(respuestas.map(r=>r.bloqueId))].map(bloqueId=>{const xs=respuestas.filter(r=>r.bloqueId===bloqueId);return {bloqueId,total:xs.length,completadas:xs.length,correctas:contar(xs,r=>r.correcta),correctasPrimerIntento:contar(xs,r=>r.correctaPrimerIntento),conPistas:contar(xs,r=>r.pistasUtilizadas.length),conReintentos:contar(xs,r=>r.intentos>1),dudas:contar(xs,r=>r.duda),estado:xs.some(r=>r.requiereRefuerzo)?"reforzar":"solido"};});
  return {modo:"aprendizaje",actividadId:meta.actividadId,tituloActividad:meta.tituloActividad,versionActividad:meta.version,cursoReferencia:meta.cursoReferencia,materia:meta.materia,tema:meta.tema,
    intentoId,personaIdEsperada:identidad.personaId,actorUserIdEsperado:identidad.actorUserId,misionId,vincularMision:Boolean(misionId),inicioCliente,finCliente,...tiempo,
    conceptosTrabajados:respuestas.map(r=>r.conceptoId),variantes:respuestas.map(r=>({varianteId:r.preguntaId,bloqueId:r.bloqueId,conceptoId:r.conceptoId})),respuestas,
    resumen:{tipoEvaluacion:"practica_formativa",completa:true,recorridoId:recorrido.id,recorridoTitulo:recorrido.titulo,rutaActividad:meta.rutaActividad,totalPreguntas:recorrido.cantidad,preguntasCompletadas:respuestas.length,
      totalCorrectas:contar(respuestas,r=>r.correcta),correctasPrimerIntento:contar(respuestas,r=>r.correctaPrimerIntento),conPistas:contar(respuestas,r=>r.pistasUtilizadas.length),conReintentos:contar(respuestas,r=>r.intentos>1),erroresIniciales:contar(respuestas,r=>r.errorInicial),dudasMarcadas:contar(respuestas,r=>r.duda),criterioCorrecta:"primer_intento_sin_pistas",porBloque},
    retroalimentacion:{bloquesAReforzar:porBloque.filter(b=>b.estado==="reforzar").map(b=>b.bloqueId),mensajeVisible:"Práctica formativa: recorrido realizado y apoyos utilizados. No es una nota ni un porcentaje de dominio."}};
}

// Motor de verbos existente, parametrizado para reutilizarlo con contenidos distintos.
export async function iniciarTemaVerbal({ meta: VERBOS_META, bloques: BLOQUES_RESULTADO, practica: PRACTICA_VERBOS = [], segmentoPrueba = "prueba-gramatica-verbos", opcionesCelebracion = {}, familias: FAMILIAS_PRUEBA_VERBOS, campoSemantico = "los verbos", pestanaInicial = "mapa", pestanaRepaso = "claves", soloPractica = false, registroFormativo = false }) {
const $ = id => document.getElementById(id);
const rutaLogin = new URL("../../login.html", import.meta.url).href;

await auth.authStateReady();
if (!auth.currentUser) {
  window.location.replace(rutaLogin);
  throw new Error("Sesión no disponible.");
}

const contexto = await ContextoUsuario.inicializar();
const esAdministrador = await ContextoUsuario.esAdministrador();
const nombreAlumno = String(
  contexto.personaActiva?.nombreVisible ||
  contexto.personaActiva?.nombre ||
  "Exploradora"
).trim();
const cursoActivo = String(contexto.personaActiva?.curso || "").toLowerCase();
const pareceSexto = /(^|\D)6(?:\D|$)|sexto/.test(cursoActivo);
const puedeRegistrar = Boolean(contexto.esPersonaPropia || esAdministrador);
const parametros = new URLSearchParams(window.location.search);

let modo = contexto.esPersonaPropia && pareceSexto
  ? MODOS_SESION_ACADEMICA.APRENDIZAJE
  : MODOS_SESION_ACADEMICA.VISTA_PREVIA;

if (["vista_previa","preview"].includes(parametros.get("modo"))) {
  modo = MODOS_SESION_ACADEMICA.VISTA_PREVIA;
}
if (parametros.get("modo") === "aprendizaje" && puedeRegistrar) {
  modo = MODOS_SESION_ACADEMICA.APRENDIZAJE;
}

if(soloPractica && !registroFormativo)modo=MODOS_SESION_ACADEMICA.VISTA_PREVIA;

const estado = {
  pestana:pestanaInicial,
  practicaNivelPista:0,
  repasoIds:null,
  formativa:null,
  rondaDudas:false,
  practicaDudas:new Set(),
  practicaIndice:0,
  practicaSeleccion:null,
  practicaResuelta:false,
  practicaIntentos:new Map(),
  practicaPistas:new Set(),
  pruebaIniciada:false,
  pruebaFinalizada:false,
  pruebaIndice:0,
  pruebaSeleccion:null,
  pruebaRespuestaConfirmada:false,
  preguntasPrueba:[],
  respuestas:[],
  ordenOpciones:new Map(),
  inicioIso:null,
  guardado:null,
  tiempo:soloPractica&&!registroFormativo?null:crearTiempoActivo({inactividadMs:180000})
};

function escaparHTML(valor="") {
  return String(valor).replace(/[&<>"']/g, caracter => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[caracter]);
}

function barajar(elementos) {
  const copia=[...elementos];
  for (let i=copia.length-1;i>0;i-=1) {
    const j=Math.floor(Math.random()*(i+1));
    [copia[i],copia[j]]=[copia[j],copia[i]];
  }
  return copia;
}

function elegirUna(elementos) {
  return elementos[Math.floor(Math.random()*elementos.length)];
}

function bloqueResultado(id) {
  return BLOQUES_RESULTADO.find(item=>item.id===id);
}

function textoOpcion(pregunta,opcionId) {
  return pregunta?.formato==="texto" ? String(opcionId || "") : pregunta?.opciones?.find(opcion=>opcion.id===opcionId)?.texto || "";
}

function pruebaEnCurso() {
  return estado.pruebaIniciada && !estado.pruebaFinalizada;
}

function actualizarBloqueoPestanas() {
  document.querySelectorAll("[data-pestana]").forEach(boton=>{
    boton.disabled=pruebaEnCurso() && boton.dataset.pestana!=="prueba";
  });
}

function activarPestana(nombre) {
  if (soloPractica && nombre==="prueba") return;
  if (pruebaEnCurso() && nombre!=="prueba") return;
  detenerLecturaActual();
  if(registroFormativo&&nombre==="mapa"&&estado.formativa?.enCurso){estado.formativa.enCurso=false;estado.tiempo.detener();actualizarModo();}
  estado.pestana=nombre;
  document.querySelectorAll("[data-pestana]").forEach(boton=>{
    boton.classList.toggle("activa",boton.dataset.pestana===nombre);
    boton.setAttribute("aria-pressed",String(boton.dataset.pestana===nombre));
  });
  document.querySelectorAll("[data-panel]").forEach(panel=>{
    panel.hidden=panel.dataset.panel!==nombre;
  });
  if(soloPractica)document.querySelector(`[data-panel="${nombre}"] h2`)?.focus({preventScroll:true});
  window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
  if(soloPractica)document.querySelector(`[data-panel="${nombre}"]`)?.scrollIntoView({block:"start"});
}

document.querySelectorAll("[data-pestana]").forEach(boton=>{
  boton.addEventListener("click",()=>activarPestana(boton.dataset.pestana));
});

function actualizarModo() {
  if(soloPractica&&!registroFormativo)return;
  const aprendizaje=modo===MODOS_SESION_ACADEMICA.APRENDIZAJE;
  $("iconoModo").textContent=aprendizaje ? "🎓":"👀";
  $("tituloModo").textContent=aprendizaje ? "Sesión de aprendizaje":"Vista previa";
  $("descripcionModo").textContent=registroFormativo
    ? (aprendizaje?"Al completar un recorrido se guardará su trabajo y los apoyos utilizados, sin nota ni Prueba adicional.":"Vista previa: puedes practicar, sin registrar sesiones ni evidencias.")
    : aprendizaje
    ? `Trabajamos sobre ${nombreAlumno}. Solo la prueba final guardará evidencia académica.`
    : "Puedes explorar y practicar. Nada se guardará como evidencia de aprendizaje.";

  if (estado.pruebaIniciada || (registroFormativo&&estado.formativa?.enCurso)) {
    $("botonModo").disabled=true;
    $("botonModo").textContent=registroFormativo?"Modo fijado durante este recorrido":"Modo fijado al comenzar la prueba";
  } else if (aprendizaje) {
    $("botonModo").disabled=false;
    $("botonModo").textContent="Cambiar a Vista previa";
  } else if (puedeRegistrar) {
    $("botonModo").disabled=false;
    $("botonModo").textContent="Usar como sesión de aprendizaje";
  } else {
    $("botonModo").disabled=true;
    $("botonModo").textContent="Este acceso solo explora";
  }
}

$("botonModo")?.addEventListener("click",()=>{
  if (estado.pruebaIniciada || estado.formativa?.enCurso) return;
  modo=modo===MODOS_SESION_ACADEMICA.APRENDIZAJE
    ? MODOS_SESION_ACADEMICA.VISTA_PREVIA
    : MODOS_SESION_ACADEMICA.APRENDIZAJE;
  actualizarModo();
});

function htmlReto(item,opciones,prefijo) {
  return `
    <h3 tabindex="-1">${escaparHTML(item.titulo)}</h3>
    ${item.contextoLectura ? `<div class="reading-context" lang="en">${escaparHTML(item.contextoLectura)}</div>` : ""}
    ${item.situacion ? `<p class="contexto-situacion">${escaparHTML(item.situacion)}</p>` : ""}
    <div class="challenge__enunciado"${item.idiomaLectura==="en-GB"?' lang="en"':""}>${escaparHTML(item.enunciado)}</div>
    <p class="challenge__pregunta">${escaparHTML(item.pregunta)}</p>
    <div class="actions" style="margin-top:0;margin-bottom:10px">
      <button id="${prefijo}Escuchar" class="btn btn--soft" type="button">🔊 Escuchar reto</button>
    </div>
    ${item.formato==="texto" ? `
      <div class="respuesta-escrita">
        <label for="${prefijo}Respuesta">${escaparHTML(item.etiquetaRespuesta || "Escribe tu respuesta en inglés")}</label>
        <input id="${prefijo}Respuesta" type="text" autocomplete="off" autocapitalize="sentences" spellcheck="false" maxlength="300" aria-describedby="${prefijo}NotaRespuesta">
        <p id="${prefijo}NotaRespuesta">Puedes usar formas completas o contracciones correctas.</p>
      </div>` : `<div class="options" id="${prefijo}Opciones">
      ${opciones.map(opcion=>`<button class="option" type="button" data-opcion="${escaparHTML(opcion.id)}" aria-pressed="false">${escaparHTML(opcion.texto)}</button>`).join("")}
    </div>`}

  `;
}

function practicasDisponibles() {
  return filtrarPracticaVerbal(PRACTICA_VERBOS,$("filtroPractica")?.value,estado.repasoIds);
}
function progresoRepaso(resuelta=false) {
  if(!soloPractica)return;
  const total=practicasDisponibles().length,completadas=estado.practicaIndice+(resuelta?1:0);
  $("barraPractica").style.width=`${total?completadas/total*100:0}%`;
  const barra=$("barraPractica").parentElement;
  barra.setAttribute("aria-valuemax",String(total));barra.setAttribute("aria-valuenow",String(completadas));
  $("estadoPractica").textContent=`Pregunta ${estado.practicaIndice+1} de ${total} · ${completadas} completadas`;
}
function empezarRepaso(filtro="todas",ids=null) {
  if(!soloPractica)return;
  estado.rondaDudas=ids!==null;
  if(registroFormativo&&!estado.rondaDudas){
    const recorrido=VERBOS_META.recorridos?.find(r=>r.id===filtro);
    if(!recorrido)throw new Error("Recorrido no disponible.");
    estado.formativa={intentoId:globalThis.crypto?.randomUUID?.()||`repaso-${Date.now()}-${Math.random().toString(36).slice(2)}`,identidad:{personaId:contexto.personaActiva?.personaId,actorUserId:contexto.usuario?.userId},misionId:parametros.get("misionId")||"",recorridoId:filtro,inicioCliente:new Date().toISOString(),enCurso:true,completa:false,historial:new Map(),pistas:new Map(),payload:null,promesa:null,resultado:null};
    estado.tiempo.reiniciar(`repaso-${filtro}`);actualizarModo();
    $("estadoGuardadoRepaso").textContent="";$("reintentarGuardadoRepaso").hidden=true;$("verSesionRepaso").hidden=true;
  }
  $("filtroPractica").value=filtro;estado.repasoIds=ids;
  estado.practicaIndice=0;estado.practicaIntentos.clear();estado.practicaPistas.clear();estado.practicaDudas.clear();
  activarPestana("practica");renderPractica();
}
function terminarRepaso() {
  const preguntas=practicasDisponibles();
  const dudas=dudasPracticaVerbal(preguntas,estado.practicaIntentos,estado.practicaPistas,estado.practicaDudas);
  $("resumenRepaso").textContent=`Has recorrido ${preguntas.length} preguntas. ${dudas.length?`${dudas.length} ideas quedan para repasar con calma.`:"Puedes volver a estas ideas cuando quieras."} ${registroFormativo?"Es una práctica formativa, sin nota.":"No es una nota ni se guarda."}`;
  if(registroFormativo&&estado.rondaDudas)$("resumenRepaso").textContent=`Has vuelto a ${preguntas.length} ideas con dudas. Este repaso no genera otra sesión ni modifica el recorrido ya guardado.`;
  $("listaDudasRepaso").replaceChildren(...preguntas.filter(p=>dudas.includes(p.id)).map(p=>{const li=document.createElement("li");li.textContent=p.titulo;return li;}));
  $("botonRepasarDudas").hidden=!dudas.length;
  $("botonRepasarDudas").onclick=()=>empezarRepaso("todas",dudas);
  if(registroFormativo&&!estado.rondaDudas){
    const intento=estado.formativa;intento.enCurso=false;estado.tiempo.detener();actualizarModo();
    if(modo===MODOS_SESION_ACADEMICA.APRENDIZAJE&&!intento.payload){
      try{intento.payload=construirRegistroFormativo({meta:VERBOS_META,recorridoId:intento.recorridoId,preguntas,historial:intento.historial,pistas:intento.pistas,dudas:estado.practicaDudas,
        intentoId:intento.intentoId,inicioCliente:intento.inicioCliente,finCliente:new Date().toISOString(),identidad:intento.identidad,misionId:intento.misionId,tiempo:estado.tiempo.obtenerResultado()});intento.completa=true;}
      catch(error){$("estadoGuardadoRepaso").textContent=error.message;}
    }
    if(modo===MODOS_SESION_ACADEMICA.VISTA_PREVIA)$("estadoGuardadoRepaso").textContent="Vista previa: este recorrido no se guarda ni completa Misiones.";
    else if(intento.payload)guardarRepaso(intento);
  }
  activarPestana("cierre");$("tituloCierreRepaso").focus({preventScroll:true});
}
async function guardarRepaso(intento) {
  if(!registroFormativo||modo!==MODOS_SESION_ACADEMICA.APRENDIZAJE||!intento.payload||!intento.completa||intento.promesa)return;
  if(intento.resultado?.guardado&&(!intento.resultado.misionId||intento.resultado.evidenciaMision?.registrada))return;
  $("estadoGuardadoRepaso").textContent="Guardando el recorrido completo…";$("reintentarGuardadoRepaso").hidden=true;
  intento.promesa=guardarSesionAcademica(intento.payload);
  try{
    const r=await intento.promesa;intento.resultado=r;
    if(estado.formativa!==intento)return;
    const enlaceFallido=r.misionId&&!r.evidenciaMision?.registrada;
    $("estadoGuardadoRepaso").textContent=r.guardado?(enlaceFallido?"Sesión guardada. No se ha completado la Misión: "+(r.evidenciaMision.error||r.evidenciaMision.motivo||"no se pudo enlazar la evidencia."):r.misionId?"Recorrido y evidencia guardados. La Misión queda para revisión familiar.":"Recorrido completo guardado en tu historial de aprendizaje."):"Vista previa: no se guardó ninguna sesión.";
    $("reintentarGuardadoRepaso").hidden=!(enlaceFallido&&r.evidenciaMision?.motivo==="error_registro_evidencia");
    if(r.guardado){const url=new URL("../../mi-universo/mis-tareas/resultado-academico.html",import.meta.url);url.searchParams.set("sesionId",r.sesionId);if(r.misionId)url.searchParams.set("misionId",r.misionId);$("verSesionRepaso").href=url.href;$("verSesionRepaso").hidden=false;}
  }catch(error){if(estado.formativa===intento){$("estadoGuardadoRepaso").textContent="No se ha confirmado el guardado. "+error.message;$("reintentarGuardadoRepaso").hidden=false;}}
  finally{intento.promesa=null;}
}
$("reintentarGuardadoRepaso")?.addEventListener("click",()=>{if(estado.formativa)guardarRepaso(estado.formativa);});
if(soloPractica){
  document.querySelectorAll("[data-iniciar-repaso]").forEach(b=>b.addEventListener("click",()=>empezarRepaso(b.dataset.iniciarRepaso)));
  $("marcarDuda").addEventListener("change",()=>{const id=practicasDisponibles()[estado.practicaIndice].id;if($("marcarDuda").checked)estado.practicaDudas.add(id);else estado.practicaDudas.delete(id);});
}
$("filtroPractica")?.addEventListener("change",()=>{estado.practicaIndice=0;renderPractica();});
$("botonAnteriorPractica")?.addEventListener("click",()=>{if(estado.practicaIndice>0){estado.practicaIndice--;renderPractica();}});
function conectarTexto(prefijo,botonId,actualizar,bloqueada) {
  const input=$(prefijo+"Respuesta");
  if(!input)return;
  input.addEventListener("input",()=>{
    if(bloqueada())return;
    actualizar(input.value.trim());
    $(botonId).disabled=!input.value.trim();
  });
  input.addEventListener("keydown",evento=>{if(evento.key==="Enter"){evento.preventDefault();if(!$(botonId).disabled && !bloqueada())$(botonId).click();}});
}

function renderPractica() {
  detenerLecturaActual();
  const reto=practicasDisponibles()[estado.practicaIndice];
  const porcentaje=((estado.practicaIndice+1)/practicasDisponibles().length)*100;
  $("barraPractica").style.width=`${porcentaje}%`;
  $("estadoPractica").textContent=`Reto ${estado.practicaIndice+1} de ${practicasDisponibles().length}`;
  $("practicaContenido").innerHTML=htmlReto(reto,barajar(reto.opciones || []),"practica");
  $("pistaPractica").hidden=true;
  $("pistaPractica").textContent="";
  $("mensajePractica").textContent="";
  $("mensajePractica").className="message";
  $("botonPista").hidden=false;
  $("botonPista").textContent="💡 Ver una pista";
  $("botonComprobar").hidden=false;
  $("botonComprobar").disabled=true;
  $("botonSiguiente").hidden=true;
  estado.practicaSeleccion=null;
  estado.practicaResuelta=false;
  estado.practicaNivelPista=0;
  if(soloPractica){
    $("marcarDuda").checked=estado.practicaDudas.has(reto.id);
    const bloque=bloqueResultado(reto.bloqueId);$("bloqueRepaso").textContent=`${bloque?.icono||""} ${bloque?.titulo||"Repaso"}`;
    progresoRepaso();
  }
  if($("botonAnteriorPractica"))$("botonAnteriorPractica").disabled=estado.practicaIndice===0;
  conectarTexto("practica","botonComprobar",v=>{estado.practicaSeleccion=v;},()=>estado.practicaResuelta);
  $("practicaContenido").querySelector("h3")?.focus({preventScroll:true});
  if(soloPractica)document.querySelector('[data-panel="practica"]')?.scrollIntoView({block:"start"});

  document.querySelectorAll("#practicaOpciones .option").forEach(boton=>{
    boton.addEventListener("click",()=>{
      if (estado.practicaResuelta) return;
      estado.practicaSeleccion=boton.dataset.opcion;
      document.querySelectorAll("#practicaOpciones .option").forEach(item=>{
        item.classList.remove("seleccionada","incorrecta");
        item.setAttribute("aria-pressed","false");
      });
      boton.classList.add("seleccionada");
      boton.setAttribute("aria-pressed","true");
      $("botonComprobar").disabled=false;
    });
  });

  $("practicaEscuchar")?.addEventListener("click",()=>{
    const texto=reto.textoLectura || `${reto.enunciado}. ${reto.pregunta}`;
    const opciones=soloPractica?Array.from(document.querySelectorAll("#practicaOpciones .option"),(b,i)=>`Opción ${i+1}: ${b.textContent}`).join(". "):"";
    iniciarLectura($("practicaEscuchar"),soloPractica?`${texto}. ${opciones}`:texto,reto.idiomaLectura || "es-ES");
  });
}

$("botonPista")?.addEventListener("click",()=>{
  const reto=practicasDisponibles()[estado.practicaIndice];
  estado.practicaPistas.add(reto.id);
  const pistas=reto.pistas || [reto.pista];
  $("pistaPractica").textContent=pistas[Math.min(estado.practicaNivelPista,pistas.length-1)];
  if(registroFormativo&&!estado.rondaDudas&&estado.formativa?.enCurso){const registro=estado.formativa.pistas.get(reto.id)||[];registro.push({texto:$("pistaPractica").textContent,nivel:Math.min(estado.practicaNivelPista,pistas.length-1)+1,antesDeIntento:(estado.formativa.historial.get(reto.id)||[]).length,ocurridaEn:new Date().toISOString()});estado.formativa.pistas.set(reto.id,registro);}
  estado.practicaNivelPista++;
  $("pistaPractica").hidden=false;
  $("botonPista").textContent=estado.practicaNivelPista<pistas.length?"💡 Otra pista":"💡 Pista mostrada";
});

$("botonComprobar")?.addEventListener("click",()=>{
  if(estado.practicaResuelta)return;
  const reto=practicasDisponibles()[estado.practicaIndice];
  const intentos=(estado.practicaIntentos.get(reto.id)||0)+1;
  estado.practicaIntentos.set(reto.id,intentos);
  const correcta=esRespuestaVerbalCorrecta(reto,estado.practicaSeleccion);
  if(registroFormativo&&!estado.rondaDudas&&estado.formativa?.enCurso){const elecciones=estado.formativa.historial.get(reto.id)||[];elecciones.push({respuesta:estado.practicaSeleccion,respuestaTexto:textoOpcion(reto,estado.practicaSeleccion),correcta,ocurridaEn:new Date().toISOString()});estado.formativa.historial.set(reto.id,elecciones);}
  const botonElegido=Array.from(document.querySelectorAll("#practicaOpciones .option")).find(b=>b.dataset.opcion===estado.practicaSeleccion);

  if (correcta) {
    estado.practicaResuelta=true;
    botonElegido?.classList.add("correcta");
    $("mensajePractica").textContent=`✓ Muy bien. ${reto.explicacion}`;
    $("mensajePractica").className="message bien";
    $("botonComprobar").hidden=true;
    $("botonPista").hidden=true;
    $("botonSiguiente").hidden=false;
    if($("practicaRespuesta"))$("practicaRespuesta").disabled=true;
    $("botonSiguiente").focus();
    progresoRepaso(true);
    $("botonSiguiente").textContent=estado.practicaIndice===practicasDisponibles().length-1
      ? (soloPractica?"Terminar este repaso →":"Ir a la prueba →")
      : "Siguiente reto →";
  } else {
    botonElegido?.classList.add("incorrecta");
    $("mensajePractica").textContent=reto.ayudaError || "Todavía no. Vuelve a mirar qué te está preguntando el ejercicio y prueba otra vez.";
    $("mensajePractica").className="message revisar";
  }
});

$("botonSiguiente")?.addEventListener("click",()=>{
  if (estado.practicaIndice<practicasDisponibles().length-1) {
    estado.practicaIndice+=1;
    renderPractica();
  } else {
    if(soloPractica)terminarRepaso();else activarPestana("prueba");
  }
});

function opcionesPrueba(pregunta) {
  if (!estado.ordenOpciones.has(pregunta.id)) {
    estado.ordenOpciones.set(pregunta.id,barajar(pregunta.opciones || []));
  }
  return estado.ordenOpciones.get(pregunta.id);
}

async function prepararPreguntasPrueba() {
  let recientes=new Set();
  if (modo===MODOS_SESION_ACADEMICA.APRENDIZAJE) {
    try {
      recientes=await obtenerVariantesRecientes({
        actividadId:VERBOS_META.actividadId,
        maximoSesiones:3
      });
    } catch (error) {
      console.warn("No se pudo consultar el historial de variantes de Gramática verbos.",error);
    }
  }

  estado.preguntasPrueba=FAMILIAS_PRUEBA_VERBOS.map(familia=>{
    const noRecientes=familia.variantes.filter(variante=>!recientes.has(variante.id));
    return elegirUna(noRecientes.length ? noRecientes : familia.variantes);
  });
}

async function iniciarPrueba() {
  if(soloPractica)return;
  detenerLecturaActual();
  const boton=$("botonIniciarPrueba");
  boton.disabled=true;
  const textoInicio=boton.textContent;
  boton.textContent="Preparando preguntas…";
  await prepararPreguntasPrueba();

  estado.pruebaIniciada=true;
  estado.pruebaFinalizada=false;
  estado.pruebaIndice=0;
  estado.pruebaSeleccion=null;
  estado.pruebaRespuestaConfirmada=false;
  estado.respuestas=[];
  estado.ordenOpciones.clear();
  estado.inicioIso=new Date().toISOString();
  estado.tiempo.reiniciar(segmentoPrueba);

  $("inicioPrueba").hidden=true;
  $("cierrePrueba").hidden=true;
  $("pruebaActiva").hidden=false;
  boton.disabled=false;
  boton.textContent=textoInicio;
  actualizarModo();
  actualizarBloqueoPestanas();
  renderPreguntaPrueba();
}

function renderPreguntaPrueba() {
  detenerLecturaActual();
  const pregunta=estado.preguntasPrueba[estado.pruebaIndice];
  const porcentaje=((estado.pruebaIndice+1)/estado.preguntasPrueba.length)*100;
  $("barraPrueba").style.width=`${porcentaje}%`;
  $("estadoPrueba").textContent=`Pregunta ${estado.pruebaIndice+1} de ${estado.preguntasPrueba.length}`;
  $("bloquePrueba").textContent=bloqueResultado(pregunta.bloqueId)?.titulo || "Verbos";
  $("pruebaContenido").innerHTML=htmlReto(pregunta,opcionesPrueba(pregunta),"prueba");
  $("explicacionPrueba").hidden=true;
  $("explicacionPrueba").innerHTML="";
  $("botonResponderPrueba").disabled=true;
  $("botonResponderPrueba").textContent="Comprobar respuesta →";
  estado.pruebaSeleccion=null;
  estado.pruebaRespuestaConfirmada=false;
  conectarTexto("prueba","botonResponderPrueba",v=>{estado.pruebaSeleccion=v;},()=>estado.pruebaRespuestaConfirmada);
  $("pruebaContenido").querySelector("h3")?.focus({preventScroll:true});

  document.querySelectorAll("#pruebaOpciones .option").forEach(boton=>{
    boton.addEventListener("click",()=>{
      if (estado.pruebaRespuestaConfirmada) return;
      estado.pruebaSeleccion=boton.dataset.opcion;
      document.querySelectorAll("#pruebaOpciones .option").forEach(item=>{item.classList.remove("seleccionada");item.setAttribute("aria-pressed","false");});
      boton.classList.add("seleccionada");
      boton.setAttribute("aria-pressed","true");
      $("botonResponderPrueba").disabled=false;
    });
  });

  $("pruebaEscuchar")?.addEventListener("click",()=>{
    iniciarLectura($("pruebaEscuchar"),pregunta.textoLectura || `${pregunta.enunciado}. ${pregunta.pregunta}`,pregunta.idiomaLectura || "es-ES");
  });
}

function mostrarExplicacionPrueba(pregunta,correcta) {
  if($("pruebaRespuesta"))$("pruebaRespuesta").disabled=true;
  document.querySelectorAll("#pruebaOpciones .option").forEach(boton=>{
    boton.disabled=true;
    boton.classList.remove("seleccionada");
    if (boton.dataset.opcion===pregunta.respuestaCorrecta) boton.classList.add("correcta");
    if (!correcta && boton.dataset.opcion===estado.pruebaSeleccion) boton.classList.add("incorrecta");
  });

  const elegida=textoOpcion(pregunta,estado.pruebaSeleccion);
  const correctaTexto=textoOpcion(pregunta,pregunta.respuestaCorrecta);
  $("explicacionPrueba").hidden=false;
  $("explicacionPrueba").innerHTML=`
    <strong>${correcta ? "✓ Buena elección.":"🌿 Vamos a revisarla."}</strong>
    <div style="margin-top:7px"><b>Tu respuesta:</b> ${escaparHTML(elegida)}</div>
    ${correcta ? "" : `<div style="margin-top:4px"><b>Respuesta correcta:</b> ${escaparHTML(correctaTexto)}</div>`}
    <div style="margin-top:7px"><b>Por qué:</b> ${escaparHTML(pregunta.explicacion||"")}</div>
  `;
}

$("botonIniciarPrueba")?.addEventListener("click",iniciarPrueba);

$("botonResponderPrueba")?.addEventListener("click",async()=>{
  const pregunta=estado.preguntasPrueba[estado.pruebaIndice];

  if (!estado.pruebaRespuestaConfirmada) {
    if (!estado.pruebaSeleccion) return;
    const correcta=esRespuestaVerbalCorrecta(pregunta,estado.pruebaSeleccion);
    estado.respuestas.push({
      preguntaId:pregunta.id,
      bloqueId:pregunta.bloqueId,
      conceptoId:pregunta.conceptoId,
      tipoEvidencia:pregunta.tipoEvidencia,
      titulo:pregunta.titulo,
      enunciado:pregunta.enunciado,
      pregunta:pregunta.pregunta,
      respuesta:estado.pruebaSeleccion,
      respuestaTexto:textoOpcion(pregunta,estado.pruebaSeleccion),
      respuestaCorrecta:pregunta.respuestaCorrecta,
      respuestaCorrectaTexto:textoOpcion(pregunta,pregunta.respuestaCorrecta),
      explicacion:pregunta.explicacion||"",
      correcta
    });
    estado.pruebaRespuestaConfirmada=true;
    mostrarExplicacionPrueba(pregunta,correcta);
    $("botonResponderPrueba").textContent=estado.pruebaIndice<estado.preguntasPrueba.length-1
      ? "Siguiente pregunta →"
      : "Ver resultado →";
    return;
  }

  if (estado.pruebaIndice<estado.preguntasPrueba.length-1) {
    estado.pruebaIndice+=1;
    renderPreguntaPrueba();
  } else {
    await finalizarPrueba();
  }
});

function construirMapaResultados() {
  return BLOQUES_RESULTADO.map(bloque=>{
    const respuestas=estado.respuestas.filter(item=>item.bloqueId===bloque.id);
    const correctas=respuestas.filter(item=>item.correcta).length;
    const total=respuestas.length;
    let estadoId="reforzar";
    let tituloEstado="Conviene reforzar";
    let textoEstado="Vuelve a esta idea y practica otra variante.";

    if (total && correctas===total) {
      estadoId="solido";
      tituloEstado="Se vio firme hoy";
      textoEstado="Las respuestas de hoy muestran una idea bien conectada.";
    } else if (correctas>0) {
      estadoId="camino";
      tituloEstado="En camino";
      textoEstado="Parte de la idea está presente; unas variantes más ayudarán a consolidarla.";
    }

    return {...bloque,correctas,total,estado:estadoId,tituloEstado,textoEstado};
  });
}

function renderMapaResultados(mapa) {
  $("mapaResultados").innerHTML=mapa.map(item=>`
    <article class="result ${escaparHTML(item.estado)}">
      <h3>${escaparHTML(item.icono)} ${escaparHTML(item.titulo)} · ${escaparHTML(item.tituloEstado)}</h3>
      <p>${item.correctas} de ${item.total} correctas. ${escaparHTML(item.textoEstado)}</p>
    </article>
  `).join("");
}

async function finalizarPrueba() {
  detenerLecturaActual();
  estado.pruebaFinalizada=true;
  estado.tiempo.detener();
  actualizarBloqueoPestanas();
  $("pruebaActiva").hidden=true;
  $("cierrePrueba").hidden=false;

  const mapa=construirMapaResultados();
  const totalCorrectas=estado.respuestas.filter(item=>item.correcta).length;
  const total=estado.respuestas.length;
  const porcentaje=total ? Math.round((totalCorrectas/total)*100):0;

  $("resultadoPruebaResumen").innerHTML=`
    <div class="score"><strong>${totalCorrectas} de ${total}</strong><span>${porcentaje} %</span></div>
    <p>Este resultado describe esta sesión. No es una calificación escolar.</p>
  `;
  renderMapaResultados(mapa);

  const reforzar=mapa.filter(item=>item.estado==="reforzar");
  const enCamino=mapa.filter(item=>item.estado==="camino");

  if (reforzar.length) {
    $("textoCierre").textContent=`${nombreAlumno}, ya tenemos una fotografía útil de las ideas sobre ${campoSemantico} que conviene volver a practicar con calma.`;
  } else if (enCamino.length) {
    $("textoCierre").textContent=`${nombreAlumno}, las ideas principales están apareciendo. Unas variantes más ayudarán a hacerlas más firmes.`;
  } else {
    $("textoCierre").textContent=`${nombreAlumno}, ${VERBOS_META.cierreFirmes || "hoy forma, número, persona y contexto se vieron firmes."}`;
  }

  $("estadoGuardado").textContent=modo===MODOS_SESION_ACADEMICA.APRENDIZAJE
    ? "Guardando esta sesión…"
    : "Vista previa: este resultado no se guardará como aprendizaje.";

  const tiempo=estado.tiempo.obtenerResultado();

  try {
    estado.guardado=await guardarSesionAcademica({
      modo,
      actividadId:VERBOS_META.actividadId,
      tituloActividad:VERBOS_META.tituloActividad,
      versionActividad:VERBOS_META.version,
      cursoReferencia:VERBOS_META.cursoReferencia,
      materia:VERBOS_META.materia,
      tema:VERBOS_META.tema,
      origen:"curso",
      inicioCliente:estado.inicioIso,
      finCliente:new Date().toISOString(),
      ...tiempo,
      conceptosTrabajados:estado.preguntasPrueba.map(item=>item.conceptoId),
      variantes:estado.preguntasPrueba.map(item=>({
        varianteId:item.id,
        bloqueId:item.bloqueId,
        conceptoId:item.conceptoId
      })),
      respuestas:estado.respuestas,
      resumen:{
        temaCompleto:true,
        totalPreguntas:total,
        totalCorrectas,
        porcentaje,
        porBloque:mapa.map(item=>({
          bloqueId:item.id,
          correctas:item.correctas,
          total:item.total,
          estado:item.estado
        }))
      },
      retroalimentacion:{
        bloquesFirmes:mapa.filter(item=>item.estado==="solido").map(item=>item.id),
        bloquesEnCamino:mapa.filter(item=>item.estado==="camino").map(item=>item.id),
        bloquesAReforzar:mapa.filter(item=>item.estado==="reforzar").map(item=>item.id),
        mensajeVisible:"Resultado y mapa formativo de la sesión; no constituyen una calificación escolar."
      }
    });

    $("estadoGuardado").textContent=estado.guardado?.guardado
      ? "✓ Sesión guardada en tu historial de aprendizaje."
      : "Vista previa: el resultado no se guardó como aprendizaje.";
  } catch (error) {
    console.error("No se pudo guardar la sesión de Gramática verbos.",error);
    $("estadoGuardado").textContent="No se pudo guardar esta sesión. Puedes volver a intentarlo más tarde.";
  }

  if (typeof mostrarCelebracion==="function") {
    mostrarCelebracion({
      titulo:"¡Repaso recorrido!",
      mensaje:`Ya sabemos qué ideas sobre ${campoSemantico} seguir fortaleciendo.`,
      ...opcionesCelebracion
    });
  }
}

$("botonVolverRepaso")?.addEventListener("click",()=>{
  estado.pruebaIniciada=false;
  estado.pruebaFinalizada=false;
  estado.pruebaRespuestaConfirmada=false;
  actualizarModo();
  actualizarBloqueoPestanas();
  $("inicioPrueba").hidden=false;
  $("pruebaActiva").hidden=true;
  $("cierrePrueba").hidden=true;
  activarPestana(pestanaRepaso);
});

let botonLeyendo=null;

function detenerLecturaActual() {
  detener();
  if (botonLeyendo) {
    botonLeyendo.textContent=botonLeyendo.dataset.textoOriginal || "🔊 Escuchar";
    botonLeyendo=null;
  }
}

function textoLimpioContenedor(contenedor) {
  const copia=contenedor.cloneNode(true);
  copia.querySelectorAll("button").forEach(boton=>boton.remove());
  return String(copia.textContent||"").replace(/\s+/g," ").trim();
}

function iniciarLectura(boton,texto,idioma="es-ES") {
  if (!disponible()) {
    boton.disabled=true;
    boton.textContent="🔇 Escucha no disponible";
    return;
  }

  if (botonLeyendo===boton) {
    detenerLecturaActual();
    return;
  }

  detenerLecturaActual();
  boton.dataset.textoOriginal ||= boton.textContent;
  botonLeyendo=boton;
  boton.textContent="⏹ Detener lectura";

  const iniciado=escuchar(texto,{
    idioma,
    velocidad:.70,
    tono:1,
    alFinalizar:detenerLecturaActual,
    alError:detenerLecturaActual
  });
  if (!iniciado) detenerLecturaActual();
}

document.addEventListener("click",evento=>{
  const boton=evento.target.closest("[data-escuchar-contenedor]");
  if (!boton) return;
  const contenedor=document.querySelector(boton.dataset.escucharContenedor);
  if (contenedor) iniciarLectura(boton,textoLimpioContenedor(contenedor),boton.dataset.idioma || "es-ES");
});

window.addEventListener("beforeunload",detenerLecturaActual,{once:true});
document.addEventListener("visibilitychange",()=>{if(document.hidden)detenerLecturaActual();});
window.addEventListener("pagehide",detenerLecturaActual);

if (!soloPractica && practicasDisponibles().length) renderPractica();
actualizarModo();
actualizarBloqueoPestanas();
if(pestanaInicial!=="mapa")activarPestana(pestanaInicial);
return {activarPestana,detenerLectura:detenerLecturaActual};

}
