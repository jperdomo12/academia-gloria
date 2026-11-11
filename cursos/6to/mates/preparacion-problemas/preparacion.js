import { auth } from "../../../../compartido/firebase/firebase-config.js";
import { ContextoUsuario } from "../../../../compartido/js/contexto-usuario.js";
import { escuchar, detener, disponible } from "../../../../compartido/js/lector-texto.js";

const $ = id => document.getElementById(id);
const el = {
  inicio:$("inicio"),actividad:$("actividad"),cierre:$("cierre"),
  titulo:$("tituloActividad"),etiqueta:$("modoEtiqueta"),paso:$("pasoActual"),
  barra:$("barraProgreso"),progreso:$("progreso"),enunciado:$("textoEnunciado"),
  pregunta:$("pregunta"),opciones:$("opciones"),entrada:$("entradaNumero"),numero:$("numero"),
  formulario:$("formRespuesta"),mensaje:$("mensaje"),pista:$("pista"),notaPista:$("notaPista"),
  comprobar:$("comprobar"),continuar:$("continuar"),escuchar:$("escuchar"),
  resumen:$("resumenCierre")
};
let banco = null;
const estado = { modo:null, problemas:[], indice:0, fase:0, resuelto:false, intentos:0, pistas:0, pasoConPista:false };
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
    if(p.tipo==="comparacion"&&p.a<=p.b)throw new Error("La comparación debe tener un segundo precio positivo.");
  }
  for(const f of b.calentamiento){
    if(!f.enunciado||!f.pregunta||!Number.isInteger(f.correcta)||f.correcta<0||f.correcta>=f.opciones.length)
      throw new Error("Actividad de comprensión incompleta.");
  }
  if(new Set(b.ensayos.map(p=>p.tipo)).size!==5)throw new Error("Faltan familias de ensayo.");
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
    ],0,"Imagina dos grupos iguales al precio de referencia.","El doble son dos veces la cantidad de referencia."),
    eleccion("¿Cómo se calcula el doble?",["Dividir entre dos","Multiplicar por dos","Sumar solamente dos"],1,
      "El doble no es sumar dos: son dos veces la cantidad.","Multiplicamos la cantidad de referencia por dos."),
    numero("¿Cuál es el precio doble, en euros?",p.a*2,"Suma "+p.a+" + "+p.a+".",p.a+" × 2 = "+(p.a*2)+" €.")
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
      numero("¿Cuántas "+p.unidad+" recibe cada grupo?",cociente,
        "Reparte "+p.a+" entre "+p.b+" grupos completos.",p.a+" ÷ "+p.b+" = "+cociente+" y sobra "+resto+"."),
      numero("¿Cuántas "+p.unidad+" sobran?",resto,
        "Calcula "+p.a+" − ("+cociente+" × "+p.b+").",
        cociente+" × "+p.b+" = "+(cociente*p.b)+". Sobran "+resto+".")
    ];
  }
  if(p.tipo==="grupos"){
    const total=p.a*p.b;
    return [
      eleccion("¿Qué significa «cada una»?",["Que solo un grupo tiene esa cantidad.","Que cada grupo contiene la misma cantidad.","Que debemos restar esa cantidad."],1,
        "Piensa en grupos con cantidades iguales.","La cantidad se repite en todos los grupos."),
      eleccion("¿Qué operación representa grupos iguales?",["Dividir","Restar","Multiplicar"],2,
        "Repetir una cantidad muchas veces puede expresarse como una multiplicación.","Multiplicamos el número de grupos por la cantidad de cada grupo."),
      numero("¿Cuál es el total, en "+p.unidad+"?",total,
        "Multiplica "+p.a+" × "+p.b+".",p.a+" × "+p.b+" = "+total+" "+p.unidad+".")
    ];
  }
  if(p.tipo==="comparacion"){
    const otro=p.a-p.b,total=p.a+otro;
    return [
      eleccion("¿Qué significa que el segundo artículo cueste «menos que» el primero?",[
        "Que el segundo cuesta "+p.b+" exactamente.",
        "Que "+p.b+" es la diferencia entre los dos precios.",
        "Que ambos cuestan lo mismo."
      ],1,"Compara dos precios: la diferencia no es necesariamente el precio del segundo.",
        "Los "+p.b+" € indican cuánto más barato es el segundo artículo."),
      eleccion("¿Qué pasos necesitamos para responder cuánto cuestan juntos?",[
        "Sumar la diferencia al primer precio y terminar.",
        "Calcular el segundo precio y luego sumar los dos.",
        "Restar los dos precios conocidos."
      ],1,"No sabemos todavía cuánto cuesta el segundo artículo.","Primero averiguamos el precio que falta. Después sumamos."),
      numero("¿Cuánto cuesta el segundo artículo, en euros?",otro,
        "Resta "+p.a+" − "+p.b+".",p.a+" − "+p.b+" = "+otro+" €. Aún falta responder cuánto cuestan juntos."),
      numero("¿Cuánto cuestan ambos artículos en total, en euros?",total,
        "Suma "+p.a+" + "+otro+".",p.a+" + "+otro+" = "+total+" €. Ahora sí es el total.")
    ];
  }
  throw new Error("Tipo no reconocido: "+p.tipo);
}

function mostrarPanel(nombre){
  ["inicio","actividad","cierre"].forEach(id=>{el[id].hidden=(id!==nombre);});
  detener();
  const destino=nombre==="actividad"?el.titulo:nombre==="cierre"?$("tituloCierre"):null;
  if(destino)destino.focus({preventScroll:true});
  window.scrollTo({top:0,behavior:"instant"});
}
function grupoEnsayo(){
  return tipos.map(tipo=>{
    const opciones=banco.ensayos.filter(p=>p.tipo===tipo);
    return opciones[Math.floor(Math.random()*opciones.length)];
  });
}
function iniciar(modo){
  if(!banco)return;
  estado.modo=modo;
  estado.problemas=modo==="comprendo"?banco.calentamiento:modo==="gaudem"?banco.gaudem:grupoEnsayo();
  estado.indice=0;estado.fase=0;estado.resuelto=false;estado.intentos=0;estado.pistas=0;estado.pasoConPista=false;
  mostrarPanel("actividad");
  presentar();
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
function presentar(){
  const p=estado.problemas[estado.indice],fs=fases(p),f=fs[estado.fase];
  estado.resuelto=false;estado.intentos=0;estado.pasoConPista=false;
  el.etiqueta.textContent=leyenda[estado.modo];
  el.titulo.textContent=p.titulo;
  el.paso.textContent="Problema "+(estado.indice+1)+" de "+estado.problemas.length+" · Paso "+(estado.fase+1)+" de "+fs.length;
  el.enunciado.textContent=p.enunciado;
  el.pregunta.textContent=f.pregunta;
  el.barra.style.width=(100*estado.indice/estado.problemas.length)+"%";
  el.progreso.setAttribute("aria-valuemax",String(estado.problemas.length));
  el.progreso.setAttribute("aria-valuenow",String(estado.indice));
  el.mensaje.textContent="";el.mensaje.className="mensaje";
  el.notaPista.textContent="";el.notaPista.hidden=true;
  el.pista.hidden=false;el.comprobar.hidden=false;el.continuar.hidden=true;
  el.entrada.hidden=(f.tipo!=="numero");
  el.opciones.hidden=(f.tipo==="numero");
  limpiar(el.opciones);
  if(f.tipo==="opcion")f.opciones.forEach((opcion,i)=>el.opciones.append(crearOpcion(opcion,i)));
  else el.numero.value="";
  el.escuchar.disabled=!disponible();
  el.titulo.focus({preventScroll:true});
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
  estado.resuelto=true;
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
  const frase=estado.modo==="comprendo"?"Exploraste cuatro ideas matemáticas sin correr a hacer cuentas.":estado.modo==="gaudem"?"Recorriste los cinco problemas de la ficha del colegio.": "Resolviste cinco situaciones originales: las mismas relaciones, con datos diferentes.";
  el.resumen.textContent=frase+(estado.pistas?" Pediste "+estado.pistas+" pista"+(estado.pistas===1?"":"s")+" para seguir aprendiendo.":" Avanzaste sin pedir pistas, pero siempre puedes utilizarlas cuando las necesites.");
  mostrarPanel("cierre");
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
el.numero.addEventListener("input",()=>{el.numero.disabled=false;});
el.continuar.addEventListener("keydown",event=>{if(event.key==="Enter")event.preventDefault();});
document.querySelectorAll("[data-iniciar]").forEach(btn=>btn.addEventListener("click",()=>iniciar(btn.dataset.iniciar)));
$("volverInicio").addEventListener("click",()=>mostrarPanel("inicio"));
$("otraRuta").addEventListener("click",()=>mostrarPanel("inicio"));
$("repetir").addEventListener("click",()=>iniciar(estado.modo));
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
