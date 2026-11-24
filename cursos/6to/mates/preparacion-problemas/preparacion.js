import { auth } from "../../../../compartido/firebase/firebase-config.js";
import { ContextoUsuario } from "../../../../compartido/js/contexto-usuario.js";
import { escuchar, detener, disponible } from "../../../../compartido/js/lector-texto.js";

import { guardarSesionAcademica } from "../../../../compartido/js/sesiones-academicas.js";
import { Academia } from "../../../../compartido/api/academia.js";
import { META_PREPARACION, crearRegistroPreparacion } from "./recorridos.js";

const parametros=new URLSearchParams(window.location.search);
const uuid=()=>globalThis.crypto?.randomUUID?.()||`intento-${Date.now()}-${Math.random().toString(36).slice(2)}`;
let contexto=null,modoSesion="vista_previa",puedeRegistrar=false,mision=null;
const $ = id => document.getElementById(id);
const el = {
  inicio:$("inicio"),actividad:$("actividad"),cierre:$("cierre"),
  titulo:$("tituloActividad"),etiqueta:$("modoEtiqueta"),paso:$("pasoActual"),
  barra:$("barraProgreso"),progreso:$("progreso"),enunciado:$("textoEnunciado"),
  pregunta:$("pregunta"),visual:$("relacionVisual"),opciones:$("opciones"),entrada:$("entradaNumero"),numero:$("numero"),
  formulario:$("formRespuesta"),mensaje:$("mensaje"),pista:$("pista"),notaPista:$("notaPista"),
  comprobar:$("comprobar"),continuar:$("continuar"),escuchar:$("escuchar"),
  resumen:$("resumenCierre")
};
let banco = null;
const estado = { modo:null, problemas:[], indice:0, fase:0, resuelto:false, intentos:0, pistas:0, pasoConPista:false, vuelta:null, puntoEnsayo:null, intento:null };
const leyenda={comprendo:"Paso 1 · Comprendo sin calcular",gaudem:"Paso 2 · Los cinco problemas de Gaudem",ensayo:"Paso 3 · Problemas nuevos"};
const tipos=["doble","suma","reparto","grupos","comparacion"];

function validarBanco(b){
  if(!b || b.gaudem?.length!==5 || b.calentamiento?.length!==4 || b.ensayos?.length!==10)
    throw new Error("El banco de problemas está incompleto.");
  const todos=[...b.gaudem,...b.ensayos];
  if(new Set(todos.map(p=>p.id)).size!==todos.length)throw new Error("Hay identificadores repetidos.");
  for(const p of todos){
    if(!tipos.includes(p.tipo) || !p.enunciado || !p.titulo)throw new Error("Problema sin tipo o texto.");
    if(p.tipo==="suma"){
      if(p.valores?.length!==3 || p.valores.some(v=>!Number.isInteger(v)||v<=0))throw new Error("Suma incompleta.");
    }else{
      if(!Number.isInteger(p.a)||!Number.isInteger(p.b)||p.b<=0||p.a<=0)throw new Error("Valores inválidos.");
    }
    if(p.tipo==="comparacion"){
      if(![undefined,"mas","menos"].includes(p.relacion)||![undefined,"total","restante"].includes(p.preguntaFinal))throw new Error("Relación o pregunta final no válida.");
      const otro=p.relacion==="mas"?p.a+p.b:p.a-p.b;
      if(otro<=0)throw new Error("La comparación debe tener un segundo precio positivo.");
      if(p.preguntaFinal==="restante"&&(!Number.isInteger(p.presupuesto)||p.presupuesto<=0||p.presupuesto<otro))throw new Error("Presupuesto insuficiente o no válido.");
    }
    if(p.tipo==="reparto"&&(p.a%p.b===0||p.a<p.b))throw new Error("El reparto debe tener cociente positivo y resto.");
    if(p.tipo==="doble"&&p.b!==2)throw new Error("El doble requiere dos grupos.");
  }
  for(const f of b.calentamiento){
    if(!f.enunciado||!f.pregunta||!Number.isInteger(f.correcta)||f.correcta<0||f.correcta>=f.opciones.length)
      throw new Error("Actividad de comprensión incompleta.");
  }
  if(b.meta.versionPlan!=="10x2-v1"||[1,2].some(i=>b.ensayos.filter(p=>p.bloque===i).length!==5))throw new Error("El plan necesita dos bloques de cinco.");
  for(const p of b.ensayos.filter(p=>p.tipo==="doble"&&p.preguntaFinal)){
    if(!["total","restante"].includes(p.preguntaFinal)||!p.grupoDoble)throw new Error("Doble encadenado incompleto.");
    if(p.preguntaFinal==="restante"&&(!Number.isInteger(p.retiradas)||p.retiradas<0||p.retiradas>p.a*2))throw new Error("Retirada no válida.");
  }
}

function eleccion(pregunta,opciones,correcta,pista,explicacion){
  return {tipo:"opcion",pregunta,opciones,correcta,pista,explicacion};
}
function numero(pregunta,valor,pista,explicacion){
  return {tipo:"numero",pregunta,valor,pista,explicacion};
}
function fases(p){
  if(p.pregunta){
    return [eleccion(p.pregunta,p.opciones,p.correcta,p.pista,p.explicacion)];
  }
  if(p.tipo==="doble"&&p.preguntaFinal){
    const resta=p.preguntaFinal==="restante",doble=p.a*2,final=resta?doble-p.retiradas:p.a+doble;
    return [
      eleccion("¿Qué pide la pregunta final?",[
        "Solo la cantidad de referencia.",
        resta?"Las plantas de pimiento que quedan después de vender.":"El total de libros de las dos secciones.",
        "Solo el doble, sin hacer nada más."
      ],1,"Vuelve a leer la última pregunta de la historia.",resta?"Buscamos lo que queda del grupo doble, no las plantas de tomate.":"Buscamos el total de ambas secciones, no solo los libros de ciencia."),
      eleccion("¿Qué pasos necesitamos para responder?",[
        "Sumar dos unidades a la referencia y terminar.",
        resta?"Calcular el doble y restarle las plantas de pimiento vendidas.":"Calcular el doble y sumarlo a los libros de aventuras.",
        resta?"Restar las plantas vendidas de las plantas de tomate.":"Calcular el doble y darlo como total de las dos secciones."
      ],1,"El doble son dos grupos iguales a la referencia. Después falta responder la pregunta final.",resta?"Primero calculamos las plantas de pimiento. Después descontamos las vendidas de ese grupo.":"Primero calculamos los libros de ciencia. Después reunimos ciencia y aventuras."),
      numero((p.unidad==="plantas"?"¿Cuántas ":"¿Cuántos ")+p.grupoDoble+" hay antes de "+(resta?"vender?":"reunir ambas secciones?"),doble,
        "Calcula "+p.a+" × 2.",p.a+" × 2 = "+doble+" "+p.grupoDoble+". Aún falta "+(resta?"descontar las plantas vendidas.":"sumar los libros de aventuras.")),
      numero(resta?"¿Cuántas plantas de pimiento quedan?":"¿Cuántos libros hay en total entre ambas secciones?",final,
        resta?"Resta "+p.retiradas+" del grupo doble que acabas de calcular.":"Suma la cantidad de aventuras a la cantidad de ciencia que acabas de calcular.",
        (resta?doble+" − "+p.retiradas:p.a+" + "+doble)+" = "+final+" "+p.unidad+". Ahora sí respondemos la pregunta final.")
    ];
  }
  if(p.tipo==="doble")return [
    eleccion("¿Qué significa «el doble» en esta historia?",[
      "La cantidad de referencia repetida dos veces.",
      "Solo dos unidades más.",
      "Una cantidad menor que la primera."
    ],0,p.unidad==="€"?"Imagina dos grupos iguales al precio de referencia.":"Imagina dos grupos iguales a la cantidad de referencia.","El doble son dos veces la cantidad de referencia."),
    eleccion("¿Cómo se calcula el doble?",["Dividir entre dos","Multiplicar por dos","Sumar solamente dos"],1,
      "El doble no es sumar dos: son dos veces la cantidad.","Multiplicamos la cantidad de referencia por dos."),
    numero(p.unidad==="€"?"¿Cuál es el precio doble, en euros?":"¿Cuántos "+p.unidad+" hay en el doble?",p.a*2,"Suma "+p.a+" + "+p.a+".",p.a+" × 2 = "+(p.a*2)+" "+p.unidad+".")
  ];
  if(p.tipo==="suma"){
    const total=p.valores.reduce((a,b)=>a+b,0);
    return [
      eleccion("¿Qué pide la pregunta?",["El precio de solo un artículo","El total de todas las compras","Cuánto pesa cada artículo"],1,
        "La pregunta menciona cuánto se gastó en las compras.","La cantidad total incluye todas las compras."),
      eleccion("¿Qué operación reúne todos los precios?",["Sumarlos","Multiplicarlos siempre","Restar el más pequeño"],0,
        "Son varios gastos que forman un total.","Sumamos los tres precios."),
      numero("¿Cuánto se ha gastado en total, en euros?",total,"Reúne "+p.valores.join(" + ")+".",p.valores.join(" + ")+" = "+total+" €.")
    ];
  }
  if(p.tipo==="reparto"){
    const cociente=Math.floor(p.a/p.b),resto=p.a%p.b;
    return [
      eleccion("¿Qué está ocurriendo en esta historia?",["Se reparte una cantidad en grupos iguales.","Se repite el total en todos los grupos.","Solo se añaden grupos al total."],0,
        "Hay una cantidad común y debe distribuirse equitativamente.","Es un reparto en partes iguales."),
      eleccion("¿Qué operación necesitas?",["Multiplicar","Dividir","Sumar"],1,
        "Tenemos el total y sabemos entre cuántos grupos repartir.","Dividimos entre el número de grupos."),
      numero((p.unidad.endsWith("os")||p.unidad.endsWith("es")?"¿Cuántos ":"¿Cuántas ")+p.unidad+" recibe cada grupo?",cociente,
        "Reparte "+p.a+" entre "+p.b+" grupos completos.",p.a+" ÷ "+p.b+" = "+cociente+" y sobra "+resto+"."),
      numero((p.unidad.endsWith("os")||p.unidad.endsWith("es")?"¿Cuántos ":"¿Cuántas ")+p.unidad+" sobran?",resto,
        "Calcula "+p.a+" − ("+cociente+" × "+p.b+").",
        cociente+" × "+p.b+" = "+(cociente*p.b)+". Sobran "+resto+".")
    ];
  }
  if(p.tipo==="grupos"){
    const total=p.a*p.b;
    return [
      eleccion(p.enunciado.includes("cada una")?"¿Qué significa «cada una»?":"¿Qué significa que cada grupo tenga la misma cantidad?",["Que solo un grupo tiene esa cantidad.","Que cada grupo contiene la misma cantidad.","Que debemos restar esa cantidad."],1,
        "Piensa en grupos con cantidades iguales.","La cantidad se repite en todos los grupos."),
      eleccion("¿Qué operación representa grupos iguales?",["Dividir","Restar","Multiplicar"],2,
        "Repetir una cantidad muchas veces puede expresarse como una multiplicación.","Multiplicamos el número de grupos por la cantidad de cada grupo."),
      numero("¿Cuál es el total, en "+p.unidad+"?",total,
        "Multiplica "+p.a+" × "+p.b+".",p.a+" × "+p.b+" = "+total+" "+p.unidad+".")
    ];
  }
  if(p.tipo==="comparacion"){
    const mas=p.relacion==="mas",restante=p.preguntaFinal==="restante";
    const signo=mas?"+":"−",otro=mas?p.a+p.b:p.a-p.b;
    const final=restante?p.presupuesto-otro:p.a+otro;
    return [
      eleccion("¿Qué significa que el segundo artículo cueste «"+(mas?"más":"menos")+" que» el primero?",[
        "Que el segundo cuesta "+p.b+" exactamente.",
        "Que "+p.b+" es la diferencia entre los dos precios.",
        "Que ambos cuestan lo mismo."
      ],1,"Compara dos precios: la diferencia no es necesariamente el precio del segundo.",
        "Los "+p.b+" € indican cuánto "+(mas?"más caro":"más barato")+" es el segundo artículo."),
      eleccion(restante?"¿Qué pasos necesitamos para saber cuánto dinero le queda?":"¿Qué pasos necesitamos para responder cuánto cuestan juntos?",[
        restante?"Restar del presupuesto los dos artículos.":mas?"Calcular solo la diferencia y terminar.":"Sumar la diferencia al primer precio y terminar.",
        restante?"Calcular el segundo precio y restarlo del dinero disponible.":"Calcular el segundo precio y luego sumar los dos.",
        restante?"Sumar el segundo precio al dinero disponible.":mas?"Sumar el primer precio y la diferencia y terminar.":"Restar los dos precios conocidos."
      ],1,restante?"Compra solamente el segundo artículo. Primero averigua su precio.":"No sabemos todavía cuánto cuesta el segundo artículo.",
        restante?"Primero averiguamos el segundo precio. Después lo restamos del presupuesto; no se compra el primer artículo.":"Primero averiguamos el precio que falta. Después sumamos."),
      numero("¿Cuánto cuesta el segundo artículo, en euros?",otro,
        (mas?"Suma ":"Resta ")+p.a+" "+signo+" "+p.b+".",
        p.a+" "+signo+" "+p.b+" = "+otro+" €. Aún falta responder "+(restante?"cuánto dinero queda.":"cuánto cuestan juntos.")),
      numero(restante?"¿Cuánto dinero le queda después de comprar solamente el segundo artículo, en euros?":"¿Cuánto cuestan ambos artículos en total, en euros?",final,
        restante?"Del presupuesto de "+p.presupuesto+" €, resta solo el segundo precio: "+otro+" €.":"Suma "+p.a+" + "+otro+".",
        restante?p.presupuesto+" − "+otro+" = "+final+" €. Es el dinero restante; el primer artículo no se compra.":p.a+" + "+otro+" = "+final+" €. Ahora sí es el total.")
    ];
  }
  throw new Error("Tipo no reconocido: "+p.tipo);
}

function mostrarPanel(nombre){
  ["inicio","actividad","cierre"].forEach(id=>{el[id].hidden=(id!==nombre);});
  detener();
  const destino=nombre==="actividad"?el.titulo:nombre==="cierre"?$("tituloCierre"):null;
  if(destino)destino.focus({preventScroll:true});
  window.scrollTo({top:0,behavior:"auto"});
}
function mezclar(lista,azar=Math.random){
  const copia=[...lista];
  for(let i=copia.length-1;i>0;i--){const j=Math.floor(azar()*(i+1));[copia[i],copia[j]]=[copia[j],copia[i]];}
  return copia;
}
function crearPlanEnsayo(ensayos,azar=Math.random){
  return [1,2].map(bloque=>mezclar(ensayos.filter(p=>p.bloque===bloque),azar));
}
function guardarPuntoEnsayo(){
  if(estado.modo==="ensayo")estado.puntoEnsayo={indice:estado.indice,fase:estado.fase,resuelto:estado.resuelto,pistas:estado.pistas};
}
function irInicio(){
  guardarPuntoEnsayo();
  mostrarPanel("inicio");
  actualizarModoSesion();
  $("tituloInicio").focus({preventScroll:true});
}
function iniciar(modo){
  if(!banco)return;
  guardarPuntoEnsayo();
  estado.modo=modo;
  estado.indice=0;estado.fase=0;estado.resuelto=false;estado.intentos=0;estado.pistas=0;estado.pasoConPista=false;
  if(modo==="ensayo"){
    if(!estado.vuelta)estado.vuelta={id:uuid(),bloques:crearPlanEnsayo(banco.ensayos),bloque:0,completados:new Set(),bloqueTerminado:false,intentos:new Map()};
    estado.problemas=estado.vuelta.bloques[estado.vuelta.bloque];
    if(estado.puntoEnsayo)Object.assign(estado,estado.puntoEnsayo);
    if(estado.vuelta.bloqueTerminado){estado.intento=estado.vuelta.intentos.get(estado.vuelta.bloque);cerrarRecorrido();return;}
  }else estado.problemas=modo==="comprendo"?banco.calentamiento:banco.gaudem;
  if(modo==="ensayo"){
    if(!estado.vuelta.intentos.has(estado.vuelta.bloque))estado.vuelta.intentos.set(estado.vuelta.bloque,nuevoIntento(modo));
    estado.intento=estado.vuelta.intentos.get(estado.vuelta.bloque);
  }else estado.intento=nuevoIntento(modo);
  const resuelto=estado.resuelto;
  mostrarPanel("actividad");
  actualizarModoSesion();
  presentar(resuelto);
}
function actualizarProgreso(){
  const ensayo=estado.modo==="ensayo",v=estado.vuelta;
  const completados=ensayo?estado.problemas.filter(p=>v.completados.has(p.id)).length:estado.indice;
  el.barra.style.width=(100*completados/estado.problemas.length)+"%";
  el.progreso.setAttribute("aria-valuemax",String(estado.problemas.length));
  el.progreso.setAttribute("aria-valuenow",String(completados));
  el.progreso.setAttribute("aria-label",ensayo?"Problemas completados en este bloque":"Problemas completados");
  $("progresoVuelta").hidden=!ensayo;
  if(ensayo){
    $("bloqueActual").textContent="Bloque "+(v.bloque+1)+" de 2";
    $("contadorVuelta").textContent=v.completados.size+" de 10 problemas completados";
    $("barraVuelta").style.width=(100*v.completados.size/10)+"%";
    $("totalVuelta").setAttribute("aria-valuenow",String(v.completados.size));
    document.querySelector('[data-iniciar="ensayo"]').textContent=v.completados.size===10?"Ver mi vuelta completada":"Continuar mi práctica";
  }
}

function preguntaActual(){return fases(estado.problemas[estado.indice])[estado.fase];}
function limpiar(elemento){elemento.replaceChildren();}
function crearOpcion(texto,i){
  const label=document.createElement("label");
  label.className="opcion";
  const radio=document.createElement("input");
  radio.type="radio";radio.name="respuesta";radio.value=String(i);
  const span=document.createElement("span");
  span.textContent=texto;
  label.append(radio,span);
  return label;
}
function representarRelacion(p){
  const destino=el.visual;
  destino.replaceChildren();
  destino.hidden=!(p.tipo==="doble"||p.tipo==="comparacion");
  if(destino.hidden)return;
  const encabezado=document.createElement("strong");
  encabezado.className="visual-titulo";encabezado.textContent="👀 Mira cómo se relacionan las cantidades";
  destino.append(encabezado);
  function agregarFila(nombre,segmentos){
    const fila=document.createElement("div");fila.className="visual-fila";
    const etiqueta=document.createElement("span");etiqueta.className="visual-etiqueta";etiqueta.textContent=nombre;
    const barra=document.createElement("div");barra.className="visual-barra";
    for(const segmento of segmentos){
      const tramo=document.createElement("span");
      tramo.className="visual-tramo "+(segmento.vacio?"visual-vacio":segmento.diferencia?"visual-diferencia":"");
      tramo.style.flexGrow=String(segmento.peso||1);
      tramo.textContent=segmento.texto;
      barra.append(tramo);
    }
    fila.append(etiqueta,barra);destino.append(fila);
  }
  if(p.tipo==="comparacion"){
    if(p.relacion==="mas"){
      agregarFila("Primer precio",[{texto:p.a+" €",peso:p.a},{texto:"",peso:p.b,vacio:true}]);
      agregarFila("Segundo precio: ¿? €",[{texto:p.a+" €",peso:p.a},{texto:"+ "+p.b+" €",peso:p.b,diferencia:true}]);
    }else{
      agregarFila("Primer precio",[{texto:p.a+" €",peso:p.a}]);
      agregarFila("Segundo precio",[{texto:"¿? €",peso:p.a-p.b},{texto:"− "+p.b+" €",peso:p.b,diferencia:true}]);
    }
    if(p.preguntaFinal==="restante"){
      const presupuesto=document.createElement("p");presupuesto.className="visual-nota";
      presupuesto.textContent="Disponible: "+p.presupuesto+" € → compra solo el segundo artículo (¿? €) → queda: ¿? €. El primer artículo es una referencia de precio, no otra compra.";
      destino.append(presupuesto);
    }
  }else if(p.tipo==="doble"){
    agregarFila("Un grupo",[{texto:p.a+" "+p.unidad,peso:1},{texto:"",peso:1,vacio:true}]);
    agregarFila("Dos grupos",[{texto:p.a+" "+p.unidad,peso:1},{texto:p.a+" "+p.unidad,peso:1}]);
    if(p.preguntaFinal){const final=document.createElement("p");final.className="visual-nota";final.textContent=p.preguntaFinal==="restante"?"Del grupo doble se venden "+p.retiradas+" plantas → quedan ¿? plantas de pimiento. No se descuentan del grupo de tomate.":"Aventuras + ciencia → ¿? libros en total. El doble es solo una parte del total.";destino.append(final);}
  }
  const nota=document.createElement("p");
  nota.className="visual-nota";
  nota.textContent=p.tipo==="comparacion"?
    "La diferencia no es el precio del segundo artículo. Primero hay que descubrirlo.":
    "El doble son dos grupos iguales. Después elegimos la operación.";
  destino.append(nota);
}

function presentar(yaResuelto=false){
  detener();
  const p=estado.problemas[estado.indice],fs=fases(p),f=fs[estado.fase];
  estado.resuelto=false;estado.intentos=0;estado.pasoConPista=false;
  el.etiqueta.textContent=leyenda[estado.modo];
  el.titulo.textContent=p.titulo;
  el.paso.textContent="Problema "+(estado.indice+1)+" de "+estado.problemas.length+" · Paso "+(estado.fase+1)+" de "+fs.length;
  el.enunciado.textContent=p.enunciado;
  representarRelacion(p);
  el.pregunta.textContent=f.pregunta;
  actualizarProgreso();
  el.mensaje.textContent="";el.mensaje.className="mensaje";
  el.notaPista.textContent="";el.notaPista.hidden=true;
  el.pista.hidden=false;el.comprobar.hidden=false;el.continuar.hidden=true;
  el.entrada.hidden=(f.tipo!=="numero");
  el.opciones.hidden=(f.tipo==="numero");
  limpiar(el.opciones);
  if(f.tipo==="opcion")f.opciones.forEach((opcion,i)=>el.opciones.append(crearOpcion(opcion,i)));
  else {el.numero.value="";el.numero.disabled=false;}
  el.escuchar.disabled=!disponible();
  if(yaResuelto)mostrarAcierto(f);
  else el.titulo.focus({preventScroll:true});
}
function mensaje(texto,clase){
  el.mensaje.textContent=texto;
  el.mensaje.className="mensaje "+clase;
}
function respuestaIntroducida(f){
  if(f.tipo==="opcion"){
    const marcado=el.opciones.querySelector('input[name="respuesta"]:checked');
    return marcado?Number(marcado.value):null;
  }
  const valor=el.numero.value.trim().replace(/\s/g,"").replace(/\./g,"");
  if(!/^[0-9]+$/.test(valor))return null;
  const numeroValor=Number(valor);
  return Number.isSafeInteger(numeroValor)?numeroValor:null;
}
function evaluar(event){
  event.preventDefault();
  if(estado.resuelto)return;
  const f=preguntaActual(),dada=respuestaIntroducida(f);
  if(dada===null){
    mensaje(f.tipo==="opcion"?"Selecciona una idea antes de comprobar.":"Escribe un número entero. No hace falta poner la unidad.","revisar");
    return;
  }
  estado.intentos++;
  const registro=registroFaseActual();
  const respuestaTexto=f.tipo==="opcion"?f.opciones[dada]:String(dada);
  const acierto=dada===(f.tipo==="opcion"?f.correcta:f.valor);
  registro.intentos.push({respuesta:dada,respuestaTexto,correcta:acierto,ocurridaEn:new Date().toISOString()});
  if(!acierto){
    mensaje("Todavía no encaja con la pregunta. Vuelve a la historia y comprueba qué cantidad representa cada número. Puedes pedir una pista.","revisar");
    return;
  }
  if(estado.modo==="ensayo"&&estado.fase===fases(estado.problemas[estado.indice]).length-1){
    estado.vuelta.completados.add(estado.problemas[estado.indice].id);
    actualizarProgreso();
  }
  mostrarAcierto(f);
}
function mostrarAcierto(f){
  estado.resuelto=true;
  if(f.tipo==="numero")el.numero.value=String(f.valor);
  else el.opciones.querySelectorAll("input").forEach(input=>{input.checked=Number(input.value)===f.correcta;});
  mensaje("¡Bien razonado! "+f.explicacion,"ok");
  el.pista.hidden=true;el.comprobar.hidden=true;el.continuar.hidden=false;
  el.opciones.querySelectorAll("input").forEach(input=>input.disabled=true);
  el.numero.disabled=true;
  el.continuar.focus();
}
function siguiente(){
  if(!estado.resuelto)return;
  const fs=fases(estado.problemas[estado.indice]);
  if(estado.fase+1<fs.length){estado.fase++;presentar();return;}
  if(estado.indice+1<estado.problemas.length){estado.indice++;estado.fase=0;presentar();return;}
  el.barra.style.width="100%";
  el.progreso.setAttribute("aria-valuenow",String(estado.problemas.length));
  if(estado.modo==="ensayo")estado.vuelta.bloqueTerminado=true;
  cerrarRecorrido();
}
function cerrarRecorrido(){
  const ensayo=estado.modo==="ensayo",v=estado.vuelta;
  const fin=ensayo&&v.completados.size===10;
  $("tituloCierre").textContent=ensayo?(fin?"¡Completaste los dos bloques!":"¡Completaste el bloque "+(v.bloque+1)+" de 2!"):"¡Terminaste tu recorrido!";
  el.resumen.textContent=ensayo?(fin?"10 de 10 problemas completados. Razonaste con dobles encadenados, comparaciones, repartos y grupos, sin repetir problemas.":v.completados.size+" de 10 problemas completados. Puedes seguir con el bloque siguiente o descansar."):
    estado.modo==="comprendo"?"Exploraste cuatro ideas matemáticas sin correr a hacer cuentas.":"Recorriste los cinco problemas de la ficha del colegio.";
  if(!ensayo)el.resumen.textContent+=estado.pistas?" Pediste "+estado.pistas+" pista"+(estado.pistas===1?"":"s")+" para seguir aprendiendo.":" Avanzaste sin pedir pistas, pero siempre puedes utilizarlas cuando las necesites.";
  $("notaDescanso").hidden=!ensayo;
  $("repetir").textContent=ensayo?(fin?"Empezar otra vuelta":"Continuar con el bloque siguiente"):"🔄 Repetir este recorrido";
  $("otraRuta").textContent=ensayo?"Descansar / volver al inicio":"Elegir otro recorrido";
  mostrarPanel("cierre");
  if(estado.intento){estado.intento.completa=true;guardarRecorrido(estado.intento);}
  actualizarModoSesion();
}
function continuarRecorrido(){
  if(estado.modo!=="ensayo"){iniciar(estado.modo);return;}
  if(!estado.vuelta.bloqueTerminado)return;
  if(estado.vuelta.completados.size===10)estado.vuelta=null;
  else {estado.vuelta.bloque++;estado.vuelta.bloqueTerminado=false;}
  estado.puntoEnsayo=null;
  estado.modo=null;
  iniciar("ensayo");
}

function nuevoIntento(recorridoId){
  return {id:uuid(),recorridoId,bloqueId:recorridoId==="ensayo"?estado.vuelta.bloque+1:null,vueltaId:recorridoId==="ensayo"?estado.vuelta.id:null,
    identidad:{personaId:contexto.personaActiva.personaId,actorUserId:contexto.usuario.userId},modo:modoSesion,
    inicioCliente:new Date().toISOString(),fases:new Map(),problemas:estado.problemas,completa:false,payload:null,promesa:null,resultado:null};
}
function registroFaseActual(){
  const key=`${estado.problemas[estado.indice].id}:${estado.fase}`,intento=estado.intento;
  if(!intento.fases.has(key))intento.fases.set(key,{intentos:[],pistas:[]});
  return intento.fases.get(key);
}
function actualizarModoSesion(){
  $("tituloModo").textContent=modoSesion==="aprendizaje"?"Sesión de aprendizaje · sin nota":"Vista previa · no se guarda";
  $("descripcionModo").textContent=modoSesion==="aprendizaje"?"Al completar un recorrido o bloque se guardarán tus respuestas, intentos y ayudas.":"Puedes explorar todas las actividades sin registrar sesiones ni completar Misiones.";
  $("botonModo").disabled=!puedeRegistrar||!el.actividad.hidden;
  $("botonModo").textContent=modoSesion==="aprendizaje"?"Cambiar a Vista previa":"Usar como sesión de aprendizaje";
}
async function guardarRecorrido(intento){
  if(!intento.completa||intento.promesa)return;
  if(intento.modo!=="aprendizaje"||modoSesion!=="aprendizaje"){$("estadoGuardado").textContent="Vista previa: este recorrido no guarda datos ni completa Misiones.";$("reintentarGuardado").hidden=true;$("verTrabajo").hidden=true;$("repetir").disabled=false;return;}
  if(intento.resultado?.guardado&&(!intento.resultado.misionId||intento.resultado.evidenciaMision?.registrada)){mostrarRegistroGuardado(intento,intento.resultado);return;}
  $("repetir").disabled=true;
  $("estadoGuardado").textContent="Guardando el trabajo realizado…";$("reintentarGuardado").hidden=true;$("verTrabajo").hidden=true;
  intento.promesa=(async()=>{
    if(!intento.payload){
      let vinculo="";
      if(parametros.get("misionId")){
        const actual=await Academia.tareas.obtener(parametros.get("misionId"));
        if(actual&&["pendiente","asignada","en_curso","necesita_ayuda"].includes(actual.estado)&&actual.criterioCumplimiento?.filtros?.actividadId===META_PREPARACION.actividadId&&actual.criterioCumplimiento.filtros.recorridoId===intento.recorridoId)vinculo=actual.id||parametros.get("misionId");
      }
      intento.payload=crearRegistroPreparacion({intento,problemas:intento.problemas,fasesDe:fases,finCliente:new Date().toISOString(),misionId:vinculo});
    }
    return guardarSesionAcademica(intento.payload);
  })();
  try{
    const r=await intento.promesa;intento.resultado=r;
    if(estado.intento!==intento)return;
    mostrarRegistroGuardado(intento,r);
  }catch(error){if(estado.intento===intento){$("estadoGuardado").textContent="No se ha confirmado el guardado: "+error.message;$("reintentarGuardado").hidden=false;}}
  finally{intento.promesa=null;}
}
function mostrarRegistroGuardado(intento,r){
  if(estado.intento!==intento)return;
  const errorEnlace=r.misionId&&!r.evidenciaMision?.registrada;
    $("estadoGuardado").textContent=errorEnlace?"Sesión guardada, pero no se aplicó a la Misión: "+(r.evidenciaMision?.error||r.evidenciaMision?.motivo||"no se pudo enlazar."):
      r.misionId?(r.evidenciaMision.objetivoAlcanzado?"Trabajo guardado. La Misión pasa a revisión familiar.":"Bloque guardado: 1 de 2. La Misión sigue en curso hasta completar el otro bloque de esta vuelta."):
      "Recorrido completo guardado como trabajo autónomo, sin nota.";
    $("reintentarGuardado").hidden=!errorEnlace;
    if(r.guardado){const url=new URL("../../../../mi-universo/mis-tareas/resultado-academico.html",import.meta.url);url.searchParams.set("sesionId",r.sesionId);if(r.misionId)url.searchParams.set("misionId",r.misionId);url.searchParams.set("volver",window.location.pathname+window.location.search);$("verTrabajo").href=url.href;$("verTrabajo").hidden=false;}
  $("repetir").disabled=!r.guardado||Boolean(errorEnlace);
}
$("reintentarGuardado").addEventListener("click",()=>{if(estado.intento)guardarRecorrido(estado.intento);});
$("botonModo").addEventListener("click",()=>{if(!puedeRegistrar||!el.actividad.hidden)return;modoSesion=modoSesion==="aprendizaje"?"vista_previa":"aprendizaje";estado.vuelta=null;estado.puntoEnsayo=null;estado.intento=null;$("reintentarGuardado").hidden=true;$("repetir").disabled=false;actualizarModoSesion();});

el.formulario.addEventListener("submit",evaluar);
el.continuar.addEventListener("click",siguiente);
el.pista.addEventListener("click",()=>{
  if(estado.resuelto)return;
  const f=preguntaActual();
  const registro=registroFaseActual();registro.pistas.push({texto:f.pista,antesDeIntento:registro.intentos.length,ocurridaEn:new Date().toISOString()});
  el.notaPista.textContent="💡 "+f.pista;el.notaPista.hidden=false;
  if(!estado.pasoConPista){estado.pistas++;estado.pasoConPista=true;}
});
el.escuchar.addEventListener("click",()=>{
  const p=estado.problemas[estado.indice],f=preguntaActual();
  escuchar(p.enunciado+" "+f.pregunta,{idioma:"es-ES",velocidad:0.82});
});
document.querySelectorAll("[data-iniciar]").forEach(btn=>btn.addEventListener("click",()=>iniciar(btn.dataset.iniciar)));
$("volverInicio").addEventListener("click",irInicio);
$("otraRuta").addEventListener("click",irInicio);
$("repetir").addEventListener("click",continuarRecorrido);
document.addEventListener("visibilitychange",()=>{if(document.hidden)detener();});
window.addEventListener("pagehide",detener);

try{
  await auth.authStateReady();
  if(!auth.currentUser){
    window.location.replace(new URL("../../../../login.html",import.meta.url).href);
  }else{
    contexto=await ContextoUsuario.inicializar();
    puedeRegistrar=Boolean(contexto.esPersonaPropia||await ContextoUsuario.esAdministrador());
    modoSesion=contexto.esPersonaPropia&&/(^|\D)6(?:\D|$)|sexto/i.test(contexto.personaActiva.curso||"")?"aprendizaje":"vista_previa";
    if(["vista_previa","preview","consulta"].includes(parametros.get("modo")))modoSesion="vista_previa";
    if(parametros.get("modo")==="aprendizaje"&&puedeRegistrar)modoSesion="aprendizaje";
    const respuesta=await fetch(new URL("./problemas.json",import.meta.url),{cache:"no-store"});
    if(!respuesta.ok)throw new Error("No se pudieron recuperar los ejercicios.");
    banco=await respuesta.json();
    validarBanco(banco);
    if(parametros.get("misionId")){
      mision=await Academia.tareas.obtener(parametros.get("misionId"));
      const filtros=mision?.criterioCumplimiento?.filtros||{};
      if(filtros.actividadId===META_PREPARACION.actividadId&&["gaudem","ensayo"].includes(filtros.recorridoId)){
        $("contextoMision").hidden=false;$("contextoMision").textContent="Misión: "+(filtros.recorridoId==="gaudem"?"Mi ficha de Gaudem · 5 problemas":"Compruebo que puedo · 10 problemas en 2 bloques")+". Los otros recorridos no cumplen esta Misión.";
        const avance=mision.progreso?.avancePorVuelta;
        if(filtros.recorridoId==="ensayo"&&avance?.versionPlan===META_PREPARACION.versionPlan&&avance.bloquesCompletados?.length===1&&[1,2].includes(avance.bloquesCompletados[0])){
          const hecho=avance.bloquesCompletados[0];
          estado.vuelta={id:avance.vueltaId,bloques:crearPlanEnsayo(banco.ensayos),bloque:hecho===1?1:0,completados:new Set(banco.ensayos.filter(p=>p.bloque===hecho).map(p=>p.id)),bloqueTerminado:false,intentos:new Map()};
          $("contextoMision").textContent+=" Ya consta un bloque completo guardado: continuaremos con el que falta. Los problemas incompletos se reinician.";
        }
      }
    }
    actualizarModoSesion();
    document.querySelectorAll("[data-iniciar]").forEach(btn=>btn.disabled=false);
    const asignado=mision?.criterioCumplimiento?.filtros?.actividadId===META_PREPARACION.actividadId?mision.criterioCumplimiento.filtros.recorridoId:null;
    if(["gaudem","ensayo"].includes(asignado))iniciar(asignado);
  }
}catch(error){
  console.error("Preparación de problemas:",error);
  const aviso=document.createElement("p");
  aviso.className="mensaje revisar";
  aviso.textContent="No pudimos preparar las actividades. Vuelve a intentarlo desde Matemáticas.";
  el.inicio.append(aviso);
  document.querySelectorAll("[data-iniciar]").forEach(btn=>{btn.disabled=true;});
}
