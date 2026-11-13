import { auth } from "../../../../compartido/firebase/firebase-config.js";
import { ContextoUsuario } from "../../../../compartido/js/contexto-usuario.js";
import { disponible, escuchar, detener } from "../../../../compartido/js/lector-texto.js";

const $ = id => document.getElementById(id);
const recorridos = ["expresion", "comprension"];
const encuentro = [
  ["«Leo quiso mover el banco». ¿Qué infinitivo encuentras?", ["quiso","mover","banco"], 1, "Busca la acción que Leo quería realizar.", "Mover nombra la acción sin indicar persona, número ni tiempo."],
  ["«Vio a su compañera regando una planta». ¿Qué gerundio encuentras?", ["vio","planta","regando"], 2, "Busca la acción que estaba haciendo la compañera.", "Regando indica una acción en desarrollo y acaba en -ando."],
  ["«Alguien había dibujado un pequeño plano». ¿Qué participio encuentras?", ["dibujado","había","pequeño"], 0, "Fíjate en la palabra que acompaña a «había».", "Dibujado es el participio. «Había dibujado» es la forma compuesta."]
];
const repaso = [
  ["¿Qué encontró Leo debajo del banco?", ["Un plano suelto","Un sobre con una nota","Una planta"], 1, "Relee el primer párrafo.", "El plano estaba dibujado en la nota que encontró dentro del sobre."],
  ["En el texto, ¿qué significa «aprovechar la sombra»?", ["Usar la sombra para estar más a gusto","Mover la sombra de sitio","Cubrir el plano"], 0, "Piensa en dónde decidieron sentarse.", "Se colocaron cerca de la jardinera para estar a la sombra sin mover el banco."],
  ["¿Por qué colocaron una silla junto a la jardinera?", ["Para regar mejor","Para que nadie leyera el plano","Para sentarse a la sombra sin tapar la entrada"], 2, "Relaciona la decisión con la última frase.", "La silla les permite usar la sombra y mantener libre el paso."],
  ["«Encontró un sobre mojado». ¿Qué palabra nombra lo que encontró?", ["mojado","sobre","encontró"], 1, "Busca la palabra a la que acompaña «un».", "Sobre es el sustantivo: nombra el objeto encontrado."],
  ["«Había dibujado un pequeño plano». ¿Qué adjetivo describe el plano?", ["pequeño","plano","dibujado"], 0, "Pregúntate cómo era el plano.", "Pequeño describe el tamaño del plano."],
  ["¿Qué palabras forman juntas un tiempo compuesto?", ["regando una planta","quiso mover","había preparado"], 2, "Busca haber conjugado seguido de un participio.", "«Había preparado» une el auxiliar había con el participio preparado."]
];

// Preguntas formativas de esta página: controles nativos, estado solo en memoria.
function montarPreguntas(host, preguntas, prefijo) {
  let indice = 0;
  function mostrar(enfocar = false) {
    const [pregunta, opciones, clave, pista, explicacion] = preguntas[indice];
    host.innerHTML = `<form class="pregunta"><p class="ceja">Pregunta ${indice + 1} de ${preguntas.length}</p>
      <fieldset><legend tabindex="-1">${pregunta}</legend>
      ${opciones.map((op,i) => `<label><input type="radio" name="${prefijo}" value="${i}"> ${op}</label>`).join("")}
      </fieldset><details><summary>Ver una pista</summary><p>${pista}</p></details>
      <div class="acciones"><button type="submit">Comprobar</button><button type="button" data-siguiente hidden>${indice === preguntas.length - 1 ? "Terminar repaso" : "Siguiente pregunta"}</button></div>
      <p role="status" class="respuesta"></p></form>`;
    const form = host.querySelector("form");
    const siguiente = form.querySelector("[data-siguiente]");
    const respuesta = form.querySelector("[role=status]");
    form.addEventListener("submit", e => {
      e.preventDefault();
      const elegida = new FormData(form).get(prefijo);
      if (elegida === null) { respuesta.textContent = "Elige una respuesta antes de comprobar."; return; }
      if (Number(elegida) !== clave) { respuesta.textContent = "Aún no. " + pista + " Puedes volver a intentarlo."; return; }
      respuesta.textContent = explicacion;
      form.querySelector("fieldset").disabled = true;
      form.querySelector('[type="submit"]').hidden = true;
      siguiente.hidden = false;
      siguiente.focus();
    });
    siguiente.addEventListener("click", () => {
      if (++indice < preguntas.length) { mostrar(true); return; }
      host.innerHTML = '<p role="status">Has terminado este repaso. Puedes volver al texto o repetir las preguntas.</p><button type="button">Volver a practicar</button>';
      const repetir = host.querySelector("button");
      repetir.onclick = () => { indice = 0; mostrar(true); };
      repetir.focus();
    });
    if (enfocar) host.querySelector("legend").focus();
  }
  mostrar();
}

function montarTabla() {
  const filas = [
    {formas:["mover","moviendo","movido"], encontrada:0},
    {formas:["regar","regando","regado"], encontrada:1},
    {formas:["dibujar","dibujando","dibujado"], encontrada:2}
  ];
  const columnas = ["Infinitivo", "Gerundio", "Participio"];
  $("filasPractica").innerHTML = filas.map(({formas,encontrada},i) =>
    `<tr>${formas.map((forma,j) => j === encontrada
      ? `<td class="encontrada"><strong>${forma}</strong><small>Encontrada</small></td>`
      : `<td><label><span class="sr-only">Fila ${i+1} · ${columnas[j]} · </span>Por completar
          <input type="text" maxlength="30" autocomplete="off" spellcheck="false" data-fila="${i}" data-columna="${j}"></label></td>`).join("")}</tr>`
  ).join("");
  const form = $("tablaPractica");
  form.addEventListener("input", e => {
    e.target.removeAttribute("aria-invalid");
    $("estadoTabla").textContent = "";
  });
  form.addEventListener("submit", e => {
    e.preventDefault();
    const pendientes = [];
    for (const input of form.querySelectorAll("input")) {
      const i = Number(input.dataset.fila), j = Number(input.dataset.columna);
      const coincide = input.value.trim().toLocaleLowerCase("es") === filas[i].formas[j];
      input.setAttribute("aria-invalid", String(!coincide));
      if (!coincide) pendientes.push(`fila ${i+1}, ${columnas[j].toLowerCase()}`);
    }
    $("estadoTabla").textContent = pendientes.length
      ? `Revisa: ${pendientes.join("; ")}. Parte del verbo de la fila y comprueba la terminación.`
      : "Las tres filas están completas. Cada una recoge las tres formas no personales del mismo verbo.";
  });
}

function mostrarRecorrido() {
  const id = location.hash.slice(1);
  if (id && !recorridos.includes(id)) return;
  detenerVoz();
  for (const nombre of recorridos) {
    $(nombre).hidden = nombre !== id;
    const enlace = document.querySelector(`.examenes a[href="#${nombre}"]`);
    if (nombre === id) enlace.setAttribute("aria-current","location");
    else enlace.removeAttribute("aria-current");
  }
  if (!id) return;
  const titulo = $(id).querySelector("h2");
  titulo.focus({preventScroll:true});
  $(id).scrollIntoView({block:"start"});
}

let leyendo = false;
let turnoVoz = 0;
function detenerVoz() {
  turnoVoz++;
  leyendo = false;
  $("escuchar").textContent = "Escuchar lectura";
  detener();
}
function iniciar() {
  // El retorno incluye el examen elegido y conserva la Persona Activa.
  const nav = window.Academia.navegacion;
  for (const enlace of document.querySelectorAll("[data-recurso]")) {
    const ruta = enlace.getAttribute("href");
    enlace.addEventListener("click", () => {
      enlace.href = nav.construirUrlConRetorno(ruta);
    });
    enlace.addEventListener("contextmenu", () => {
      enlace.href = nav.construirUrlConRetorno(ruta);
    });
    enlace.href = nav.construirUrlConRetorno(ruta);
  }
  montarPreguntas($("encuentro"), encuentro, "forma");
  montarPreguntas($("repasoPreguntas"), repaso, "repaso");
  montarTabla();
  $("mostrarEjemplos").addEventListener("click", () => {
    const mostrar = $("ejemplos").hidden;
    $("ejemplos").hidden = !mostrar;
    $("mostrarEjemplos").setAttribute("aria-expanded", String(mostrar));
    $("mostrarEjemplos").textContent = mostrar ? "Ocultar ejemplos" : "Ya lo intenté · Ver ejemplos";
  });
  $("escuchar").disabled = !disponible();
  if (!disponible()) $("estadoVoz").textContent = "La lectura en voz alta no está disponible. Puedes leer el texto en pantalla.";
  $("escuchar").addEventListener("click", () => {
    if (leyendo) { detenerVoz(); return; }
    const turno = ++turnoVoz;
    const finalizar = (error = false) => {
      if (turno !== turnoVoz) return;
      detenerVoz();
      if (error) $("estadoVoz").textContent = "No se pudo leer en voz alta. Puedes intentarlo otra vez o leer en pantalla.";
    };
    $("estadoVoz").textContent = "";
    try {
      leyendo = escuchar($("lectura").textContent, {idioma:"es-ES", alFinalizar:()=>finalizar(), alError:()=>finalizar(true)});
      if (!leyendo) finalizar(true);
      else $("escuchar").textContent = "Detener lectura";
    } catch { finalizar(true); }
  });
  for (const enlace of document.querySelectorAll("[data-releer]")) enlace.addEventListener("click", e => {
    e.preventDefault();
    $("lectura").tabIndex = -1;
    $("lectura").focus();
  });
  for (const tarjeta of document.querySelectorAll(".examenes a")) tarjeta.addEventListener("click", e => {
    if (tarjeta.hash === location.hash) { e.preventDefault(); mostrarRecorrido(); }
  });
  window.addEventListener("hashchange", mostrarRecorrido);
  window.addEventListener("pagehide", detenerVoz);
  document.addEventListener("visibilitychange", () => { if (document.hidden) detenerVoz(); });
  $("recorridos").hidden = false;
  $("estadoPreparacion").hidden = true;
  mostrarRecorrido();
}

try {
  await auth.authStateReady();
  if (!auth.currentUser) location.replace(new URL("../../../../login.html", import.meta.url));
  else {
    await ContextoUsuario.inicializar();
    iniciar();
  }
} catch (error) {
  console.error("Preparación de Lengua:", error);
  $("estadoPreparacion").textContent = "No se pudo abrir la preparación. Vuelve a intentarlo desde el portal de Lengua.";
}
