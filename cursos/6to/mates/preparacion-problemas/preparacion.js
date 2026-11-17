import { auth } from "../../../../compartido/firebase/firebase-config.js";
import { ContextoUsuario } from "../../../../compartido/js/contexto-usuario.js";
import { escuchar, detener, disponible } from "../../../../compartido/js/lector-texto.js";

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
const estado = { modo:null, problemas:[], indice:0, fase:0, resuelto:false, intentos:0, pistas:0, pasoConPista:false, vuelta:null, puntoEnsayo:null };
const leyenda={comprendo:"Paso 1 · Comprendo sin calcular",gaudem:"Paso 2 · Los cinco problemas de Gaudem",ensayo:"Paso 3 · Problemas nuevos"};
const tipos=["doble","suma","reparto","grupos","comparacion"];

function validarBanco(b){
  if(!b || b.gaudem?.length!==5 || b.calentamiento?.length!==4 || b.ensayos?.length!==20)
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
  if(tipos.some(tipo=>b.ensayos.filter(p=>p.tipo===tipo).length!==4))throw new Error("Cada familia necesita cuatro variantes.");
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
  const familias=tipos.map(tipo=>mezclar(ensayos.filter(p=>p.tipo===tipo),azar));
  return Array.from({length:4},(_,i)=>mezclar(familias.map(f=>f[i]),azar));
}
function guardarPuntoEnsayo(){
  if(estado.modo==="ensayo")estado.puntoEnsayo={indice:estado.indice,fase:estado.fase,resuelto:estado.resuelto,pistas:estado.pistas};
}
function irInicio(){
  guardarPuntoEnsayo();
  mostrarPanel("inicio");
  $("tituloInicio").focus({preventScroll:true});
}
function iniciar(modo){
  if(!banco)return;
  guardarPuntoEnsayo();
  estado.modo=modo;
  estado.indice=0;estado.fase=0;estado.resuelto=false;estado.intentos=0;estado.pistas=0;estado.pasoConPista=false;
  if(modo==="ensayo"){
    if(!estado.vuelta)estado.vuelta={bloques:crearPlanEnsayo(banco.ensayos),bloque:0,completados:new Set(),bloqueTerminado:false};
    estado.problemas=estado.vuelta.bloques[estado.vuelta.bloque];
    if(estado.puntoEnsayo)Object.assign(estado,estado.puntoEnsayo);
    if(estado.vuelta.bloqueTerminado){cerrarRecorrido();return;}
  }else estado.problemas=modo==="comprendo"?banco.calentamiento:banco.gaudem;
  const resuelto=estado.resuelto;
  mostrarPanel("actividad");
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
    $("bloqueActual").textContent="Bloque "+(v.bloque+1)+" de 4";
    $("contadorVuelta").textContent=v.completados.size+" de 20 problemas completados";
    $("barraVuelta").style.width=(100*v.completados.size/20)+"%";
    $("totalVuelta").setAttribute("aria-valuenow",String(v.completados.size));
    document.querySelector('[data-iniciar="ensayo"]').textContent=v.completados.size===20?"Ver mi vuelta completada":"Continuar mi práctica";
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
  const acierto=dada===(f.tipo==="opcion"?f.correcta:f.valor);
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
  const fin=ensayo&&v.completados.size===20;
  $("tituloCierre").textContent=ensayo?(fin?"¡Completaste los cuatro bloques!":"¡Completaste el bloque "+(v.bloque+1)+" de 4!"):"¡Terminaste tu recorrido!";
  el.resumen.textContent=ensayo?(fin?"20 de 20 problemas completados. Practicaste las cinco familias en cuatro bloques, sin repetir problemas.":v.completados.size+" de 20 problemas completados. Puedes seguir con el bloque siguiente o descansar."):
    estado.modo==="comprendo"?"Exploraste cuatro ideas matemáticas sin correr a hacer cuentas.":"Recorriste los cinco problemas de la ficha del colegio.";
  if(!ensayo)el.resumen.textContent+=estado.pistas?" Pediste "+estado.pistas+" pista"+(estado.pistas===1?"":"s")+" para seguir aprendiendo.":" Avanzaste sin pedir pistas, pero siempre puedes utilizarlas cuando las necesites.";
  $("notaDescanso").hidden=!ensayo;
  $("repetir").textContent=ensayo?(fin?"Empezar otra vuelta":"Continuar con el bloque siguiente"):"🔄 Repetir este recorrido";
  $("otraRuta").textContent=ensayo?"Descansar / volver al inicio":"Elegir otro recorrido";
  mostrarPanel("cierre");
}
function continuarRecorrido(){
  if(estado.modo!=="ensayo"){iniciar(estado.modo);return;}
  if(!estado.vuelta.bloqueTerminado)return;
  if(estado.vuelta.completados.size===20)estado.vuelta=null;
  else {estado.vuelta.bloque++;estado.vuelta.bloqueTerminado=false;}
  estado.puntoEnsayo=null;
  estado.modo=null;
  iniciar("ensayo");
}

el.formulario.addEventListener("submit",evaluar);
el.continuar.addEventListener("click",siguiente);
el.pista.addEventListener("click",()=>{
  if(estado.resuelto)return;
  const f=preguntaActual();
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
    await ContextoUsuario.inicializar();
    const respuesta=await fetch(new URL("./problemas.json",import.meta.url),{cache:"no-store"});
    if(!respuesta.ok)throw new Error("No se pudieron recuperar los ejercicios.");
    banco=await respuesta.json();
    validarBanco(banco);
  }
}catch(error){
  console.error("Preparación de problemas:",error);
  const aviso=document.createElement("p");
  aviso.className="mensaje revisar";
  aviso.textContent="No pudimos preparar las actividades. Vuelve a intentarlo desde Matemáticas.";
  el.inicio.append(aviso);
  document.querySelectorAll("[data-iniciar]").forEach(btn=>{btn.disabled=true;});
}
