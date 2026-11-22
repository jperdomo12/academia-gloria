import { iniciarTemaVerbal } from "../../../../compartido/js/motor-practica-verbal.js";
import { PAST_META, BLOQUES_RESULTADO, PRACTICA, FAMILIAS_PRUEBA, FICHAS, ESCENAS, LECTURAS } from "./past-data.js";
const $=id=>document.getElementById(id);
let escena=0,invertida=false,motor=null;
function pintarEscena(){
  motor?.detenerLectura();
  const s=ESCENAS[escena];
  $("escenaTitulo").textContent=s.titulo;
  $("escenaFrase").textContent=invertida?s.invertida:s.frase;
  $("escenaDescripcion").textContent=s.descripcion;
  $("invertirClausulas").setAttribute("aria-pressed",String(invertida));
  $("lineaTiempo").dataset.mode=s.id;
  $("lineaTiempo").setAttribute("aria-label",s.pistas.join(". "));
  $("lineaTiempo").replaceChildren(...s.pistas.map((p,i)=>{
    const row=document.createElement("div");row.className="time-row";
    const label=document.createElement("span");label.className="time-label";label.textContent=p;
    const track=document.createElement("div");track.className="time-track";track.setAttribute("aria-hidden","true");
    const mark=document.createElement("span");mark.className=s.tipos[i]==="tramo"?"time-process":"time-event";
    track.append(mark);row.append(label,track);return row;
  }));
  $("escenasOpciones").querySelectorAll("button").forEach((b,i)=>b.setAttribute("aria-pressed",String(i===escena)));
}
ESCENAS.forEach((s,i)=>{const b=document.createElement("button");b.type="button";b.textContent=s.titulo;b.addEventListener("click",()=>{escena=i;invertida=false;pintarEscena();});$("escenasOpciones").append(b);});
$("invertirClausulas").addEventListener("click",()=>{invertida=!invertida;pintarEscena();});
pintarEscena();
FICHAS.forEach(f=>{
  const d=document.createElement("details"),summary=document.createElement("summary");summary.textContent=f.titulo;d.append(summary);
  for(const [key,cls] of [["estructura","formula"],["ejemplo","card-example"],["ayuda",""]]){const p=document.createElement("p");p.textContent=f[key];p.className=cls;if(key==="ejemplo"){p.lang="en";p.id="ficha-"+f.id;}d.append(p);}
  const b=document.createElement("button");b.type="button";b.className="listen-btn";b.textContent="🔊 Escuchar ejemplo";b.dataset.escucharContenedor="#ficha-"+f.id;b.dataset.idioma="en-GB";d.append(b);$("fichasContenido").append(d);
});
const etiquetas=["Past Simple","Past Continuous","Past Simple · negative"];
const formas=[["landed",0],["was drawing",1],["did not pick",2],["was measuring",1]];
const textoIdentificar=document.createElement("p");textoIdentificar.className="reading-context";textoIdentificar.lang="en";
// La lectura es la misma fuente: no mantenemos otra transcripción para la clasificación.
for(const fragmento of LECTURAS[0].texto.split(/(landed|was drawing|did not pick|was measuring)/g)){
 const indice=formas.findIndex(([f])=>f===fragmento);
 if(indice<0)textoIdentificar.append(document.createTextNode(fragmento));
 else {const span=document.createElement("span");span.textContent=fragmento;span.dataset.forma=String(indice);textoIdentificar.append(span);}
}
$("identificarContenido").append(textoIdentificar);
formas.forEach(([frase,correcta],i)=>{
 const row=document.createElement("div");row.className="identify-row";
 const label=document.createElement("label");label.htmlFor="identify-"+i;label.textContent=frase;label.lang="en";
 const select=document.createElement("select");select.id=label.htmlFor;
 const initial=new Option("Elige una etiqueta","");select.add(initial);etiquetas.forEach((t,j)=>select.add(new Option(t,String(j))));
 select.addEventListener("change",()=>{
 const marca=textoIdentificar.querySelector('[data-forma="'+i+'"]');marca.className=select.value===String(correcta)?"marked-form marked-"+correcta:"";marca.setAttribute("aria-label",frase+(select.value===String(correcta)?": "+etiquetas[correcta]:""));
 $("identificarMensaje").textContent=select.value===String(correcta)?"✓ "+frase+": "+etiquetas[correcta]+". Mira el auxiliar y la forma verbal.":"Revisa la forma completa. El color no decide: comprueba auxiliar y verbo.";});
 row.append(label,select);$("identificarContenido").append(row);
});
const rap=$("enlaceRap"),volver=new URL(location.href);volver.hash="fichas";rap.href=new URL(rap.getAttribute("href"),location.href).href+"?volver="+encodeURIComponent(volver.pathname+volver.search+volver.hash);
motor=await iniciarTemaVerbal({meta:PAST_META,bloques:BLOQUES_RESULTADO,practica:PRACTICA,familias:FAMILIAS_PRUEBA,campoSemantico:"las acciones pasadas",segmentoPrueba:"test-past-simple-vs-past-continuous",opcionesCelebracion:{mostrarGuacamayas:false},pestanaInicial:"resumen",pestanaRepaso:"compara"});
$("explorarEscenas").addEventListener("click",()=>motor.activarPestana("compara"));
if(location.hash==="#fichas")motor.activarPestana("fichas");
