import { auth } from "../../../../compartido/firebase/firebase-config.js";
import { ContextoUsuario } from "../../../../compartido/js/contexto-usuario.js";
import { escuchar, detener, disponible } from "../../../../compartido/js/lector-texto.js";
import { ENGLISH_PREP_DATA as DATA } from "./preparacion-data.js";

const $ = id => document.getElementById(id);
const TABS=["mapa","vocab","grammar","reading","practica"];
const PER_PAGE=12;
const state={
  tab:"mapa", groupId:"body", page:0, readingId:"read-halloween",
  challenge:null, done:0, current:0, solved:false, mistakes:0, hints:0, hintUsed:false,
  sourceTab:"practica", lastMode:"mixto", lastGroup:null, lastReading:null
};

function shuffle(items){
  const arr=[...items];
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
  return arr;
}
function getGroup(id){return DATA.groups.find(g=>g.id===id)||DATA.groups[0];}
function getReading(id){return DATA.readings.find(r=>r.id===id)||DATA.readings[0];}
function node(tag,text,classes=""){
  const n=document.createElement(tag);
  if(text!==undefined&&text!==null)n.textContent=String(text);
  if(classes)n.className=classes;
  return n;
}
function speak(text){
  if(!disponible())return;
  escuchar(String(text),{idioma:"en-GB",velocidad:0.78});
}
function focusTitle(selector){
  const heading=document.querySelector(selector);
  if(heading){heading.setAttribute("tabindex","-1");heading.focus({preventScroll:true});}
}
function showTab(tab){
  if(!TABS.includes(tab))return;
  detener();
  state.tab=tab;
  $("retoPanel").hidden=true;$("cierrePanel").hidden=true;
  document.querySelectorAll("[data-panel]").forEach(panel=>{panel.hidden=panel.dataset.panel!==tab;});
  document.querySelectorAll("[data-tab]").forEach(button=>{
    const active=button.dataset.tab===tab;
    button.setAttribute("aria-current",active?"page":"false");
  });
  focusTitle('[data-panel="'+tab+'"] h2');
  window.scrollTo({top:0,behavior:"auto"});
}
function initialise(){
  const groups=$("grupoVocab"),readings=$("lecturaSelect");
  for(const group of DATA.groups){
    const option=node("option",group.icon+" "+group.title);
    option.value=group.id;
    groups.append(option);
  }
  groups.value=state.groupId;
  for(const reading of DATA.readings){
    const option=node("option",reading.icon+" "+reading.title);option.value=reading.id;readings.append(option);
  }
  readings.value=state.readingId;
  showVocab();showGrammar();showReading();
  if(!disponible()){
    $("escucharGrupo").disabled=true;$("escucharLectura").disabled=true;$("escucharContexto").disabled=true;
  }
}
function showVocab(){
  const group=getGroup(state.groupId);
  const pageMax=Math.max(1,Math.ceil(group.words.length/PER_PAGE));
  state.page=Math.min(Math.max(0,state.page),pageMax-1);
  $("grupoMeta").textContent=group.icon+" "+group.title+" · páginas del PDF: "+group.pages+(group.priority==="alta"?" · prioridad para Reading":" · repaso");
  $("grupoCuenta").textContent=group.words.length+" palabras";
  const wrapper=$("tarjetasVocab");
  wrapper.replaceChildren();
  group.words.slice(state.page*PER_PAGE,state.page*PER_PAGE+PER_PAGE).forEach(word=>{
    const card=node("article",null,"vocab-card");
    const emoji=node("span",word.emoji,"vocab-emoji");emoji.setAttribute("aria-hidden","true");
    const en=node("strong",word.en,"vocab-en");en.lang="en-GB";
    const es=node("span",word.es,"vocab-es");
    const audio=node("button","🔊 Escuchar","btn-audio");
    audio.type="button";audio.disabled=!disponible();
    audio.dataset.audio=word.en;
    audio.setAttribute("aria-label","Escuchar en inglés "+word.en);
    card.append(emoji,en,es,audio);wrapper.append(card);
  });
  $("paginaVocab").textContent="Página "+(state.page+1)+" de "+pageMax;
  $("anteriorVocab").disabled=state.page===0;
  $("siguienteVocab").disabled=state.page===pageMax-1;
}
function showGrammar(){
  const wrapper=$("reglasGrammar");
  wrapper.replaceChildren();
  for(const rule of DATA.toBe){
    const article=node("article",null,"regla");
    article.append(node("h3",rule.title),node("p",rule.explain));
    const ul=node("ul");
    rule.examples.forEach(([english,spanish])=>{
      const li=node("li");
      const en=node("strong",english);en.lang="en-GB";
      const es=node("span",spanish);
      const btn=node("button","🔊 Escuchar","btn-audio");btn.type="button";
      btn.dataset.audio=english;btn.disabled=!disponible();
      btn.setAttribute("aria-label","Escuchar "+english);
      li.append(en,es,btn);ul.append(li);
    });
    article.append(ul);wrapper.append(article);
  }
}
function showReading(){
  const reading=getReading(state.readingId);
  $("lecturaIcono").textContent=reading.icon;
  $("lecturaTitulo").textContent=reading.title;
  $("lecturaParrafos").replaceChildren();
  reading.paras.forEach(paragraph=>$("lecturaParrafos").append(node("p",paragraph)));
  $("lecturaFuente").textContent=reading.source;
}
function wordQuestion(word,group){
  const distractors=shuffle(group.words.filter(w=>w.en!==word.en && w.es!==word.es)).slice(0,3);
  const choices=shuffle([word,...distractors]);
  return {
    kind:"vocab",groupId:group.id,
    stem:"What does “"+word.en+"” mean?",
    icon:group.icon,
    options:choices.map(w=>w.es),
    correct:choices.findIndex(w=>w.en===word.en),
    clue:"Recuerda el significado de “"+word.en+"”. Puedes visitar las tarjetas y volver después.",
    explain:"“"+word.en+"” significa “"+word.es+"”."
  };
}
function grammarQuestion(q){
  const [stem,options,correct,explain]=q;
  return {
    kind:"grammar",stem,icon:"💬",
    options:[...options],correct,
    clue:"Comprueba el pronombre. I → am; he/she/it → is; you/we/they → are. Para preguntar cambia el orden.",
    explain
  };
}
function readingQuestions(reading){
  return reading.questions.map(([stem,options,correct,explain])=>({
    kind:"reading",readingId:reading.id,stem,icon:reading.icon,
    options:[...options],correct,
    clue:"Regresa a la lectura "+reading.title+" y encuentra la frase que responde a la pregunta.",
    explain
  }));
}
function mixedVocab(count){
  const high=DATA.groups.filter(g=>g.priority==="alta");
  const body=getGroup("body"),halloween=getGroup("halloween");
  const others=DATA.groups.filter(g=>g.priority!=="alta");
  const chosen=[
    ...shuffle(body.words).slice(0,Math.min(2,count)).map(w=>wordQuestion(w,body)),
    ...shuffle(halloween.words).slice(0,Math.min(2,Math.max(0,count-2))).map(w=>wordQuestion(w,halloween))
  ];
  const extra=shuffle(others).flatMap(g=>shuffle(g.words).slice(0,2).map(w=>wordQuestion(w,g)));
  return shuffle([...chosen,...extra.slice(0,Math.max(0,count-chosen.length))]).slice(0,count);
}
function buildQuestions(mode,groupId=null,readingId=null){
  if(mode==="vocab"){
    if(groupId){
      const group=getGroup(groupId);
      return shuffle(group.words).slice(0,Math.min(8,group.words.length)).map(w=>wordQuestion(w,group));
    }
    return mixedVocab(8);
  }
  if(mode==="grammar")return shuffle(DATA.grammarQuestions).slice(0,8).map(grammarQuestion);
  if(mode==="reading")return readingQuestions(getReading(readingId||state.readingId));
  if(mode==="mixto"){
    const reading=getReading(readingId||shuffle(DATA.readings)[0].id);
    return [...readingQuestions(reading),...shuffle(DATA.grammarQuestions).slice(0,5).map(grammarQuestion),...mixedVocab(3)];
  }
  throw new Error("Recorrido no reconocido: "+mode);
}
function startChallenge(mode,groupId=null,readingId=null){
  detener();
  state.sourceTab=state.tab;
  state.lastMode=mode;state.lastGroup=groupId;state.lastReading=readingId;
  state.challenge=buildQuestions(mode,groupId,readingId);
  state.current=0;state.done=0;state.solved=false;state.mistakes=0;state.hints=0;state.hintUsed=false;
  document.querySelectorAll("[data-panel]").forEach(panel=>{panel.hidden=true;});
  $("retoPanel").hidden=false;$("cierrePanel").hidden=true;
  $("retoEtiqueta").textContent=mode==="vocab"?"🃏 Vocabulary · short challenge":mode==="grammar"?"💬 Grammar · To be":mode==="reading"?"📖 Reading comprehension":"🌟 Reading + Grammar · mini ensayo";
  $("retoTitulo").textContent=mode==="vocab"?"Reconozco palabras":mode==="grammar"?"Construyo frases":mode==="reading"?"Comprendo mi lectura":"Me preparo para el 17 de noviembre";
  $("retoProgreso").setAttribute("aria-valuemax",String(state.challenge.length));
  presentQuestion();
  focusTitle("#retoTitulo");
  window.scrollTo({top:0,behavior:"auto"});
}
function showContext(q){
  const holder=$("contextoReto");
  holder.hidden=q.kind!=="reading";
  if(holder.hidden)return;
  const reading=getReading(q.readingId);
  const text=$("contextoTexto");text.replaceChildren();
  text.append(node("h3",reading.title));
  reading.paras.forEach(par=>$("contextoTexto").append(node("p",par)));
}
function presentQuestion(){
  const q=state.challenge[state.current];
  state.solved=false;state.hintUsed=false;
  $("retoPaso").textContent="Pregunta "+(state.current+1)+" de "+state.challenge.length+". Lee la frase completa antes de elegir.";
  $("barraReto").style.width=(100*state.current/state.challenge.length)+"%";
  $("retoProgreso").setAttribute("aria-valuenow",String(state.current));
  $("retoEnunciado").textContent=q.stem;
  $("retoEnunciado").lang=q.kind==="vocab"||q.kind==="grammar"||q.kind==="reading"?"en-GB":"es-ES";
  $("retoIcono").textContent=q.icon;
  showContext(q);
  const choices=$("retoOpciones");choices.replaceChildren();
  q.options.forEach((option,i)=>{
    const label=node("label",null,"opcion");
    const input=document.createElement("input");
    input.type="radio";input.name="opcionReto";input.value=String(i);
    const span=node("span",option);span.lang=q.kind==="vocab"?"es-ES":"en-GB";
    label.append(input,span);choices.append(label);
  });
  $("retoFeedback").textContent="";$("retoFeedback").className="feedback";
  $("pistaTexto").hidden=true;$("pistaTexto").textContent="";
  $("retoPista").hidden=false;$("retoComprobar").hidden=false;$("retoContinuar").hidden=true;
  $("retoEnunciado").setAttribute("tabindex","-1");
  $("retoEnunciado").focus({preventScroll:true});
}
function checkAnswer(event){
  event.preventDefault();
  if(state.solved||!state.challenge)return;
  const picked=$('retoOpciones').querySelector('input[name="opcionReto"]:checked');
  const feedback=$("retoFeedback");
  if(!picked){feedback.textContent="Elige una respuesta antes de comprobar. Puedes releer o pedir una pista.";feedback.className="feedback revisar";return;}
  const q=state.challenge[state.current];
  if(Number(picked.value)!==q.correct){
    state.mistakes++;
    feedback.textContent="Esta opción no encaja todavía. Vuelve a leer la frase o el texto y prueba otra vez.";
    feedback.className="feedback revisar";
    return;
  }
  state.solved=true;state.done++;
  feedback.textContent="¡Bien pensado! "+q.explain;feedback.className="feedback ok";
  $("retoPista").hidden=true;$("retoComprobar").hidden=true;$("retoContinuar").hidden=false;
  $("retoOpciones").querySelectorAll("input").forEach(input=>input.disabled=true);
  $("retoContinuar").focus();
}
function nextQuestion(){
  if(!state.solved)return;
  if(state.current+1<state.challenge.length){state.current++;presentQuestion();return;}
  $("retoPanel").hidden=true;$("cierrePanel").hidden=false;
  $("cierreTexto").textContent="Has revisado "+state.challenge.length+" preguntas."+
    (state.hints>0?" Usaste "+state.hints+" pista"+(state.hints===1?"":"s")+", ¡una buena manera de aprender!":" Recuerda que puedes pedir pistas cuando quieras.")+
    " También puedes volver a hacer el recorrido con otras palabras o frases.";
  focusTitle("#cierreTitulo");
  window.scrollTo({top:0,behavior:"auto"});
}
function validation(){
  const all=DATA.groups.flatMap(g=>g.words.map(w=>({word:w,group:g.id})));
  if(DATA.groups.length!==6 || DATA.readings.length!==3 || DATA.grammarQuestions.length<12 ||
    DATA.groups.some(g=>g.words.length<10) || DATA.readings.some(r=>r.questions.length!==4))throw new Error("El banco escolar está incompleto.");
  for(const r of DATA.readings){
    if(r.paras.length<2||new Set(r.questions.map(q=>q[0])).size!==r.questions.length)throw new Error("Lectura incompleta "+r.id);
    for(const [stem,options,correct,explain] of r.questions){
      if(!stem||!Array.isArray(options)||correct<0||correct>=options.length||!explain)throw new Error("Pregunta inválida");
    }
  }
  if(new Set(all.map(e=>e.group+" "+e.word.en)).size!==all.length)throw new Error("Vocabulario duplicado");
  if(DATA.grammarQuestions.some(([stem,options,correct])=>!stem||correct<0||correct>=options.length))throw new Error("Grammar incompleta.");
}
document.querySelectorAll("[data-tab]").forEach(button=>button.addEventListener("click",()=>showTab(button.dataset.tab)));
document.querySelectorAll("[data-ir]").forEach(button=>button.addEventListener("click",()=>showTab(button.dataset.ir)));
$("grupoVocab").addEventListener("change",event=>{state.groupId=event.target.value;state.page=0;showVocab();});
$("anteriorVocab").addEventListener("click",()=>{state.page--;showVocab();});
$("siguienteVocab").addEventListener("click",()=>{state.page++;showVocab();});
$("tarjetasVocab").addEventListener("click",event=>{
  const btn=event.target.closest("[data-audio]");
  if(btn)speak(btn.dataset.audio);
});
$("reglasGrammar").addEventListener("click",event=>{
  const btn=event.target.closest("[data-audio]");
  if(btn)speak(btn.dataset.audio);
});
$("escucharGrupo").addEventListener("click",()=>{
  const group=getGroup(state.groupId);
  speak(group.words.slice(state.page*PER_PAGE,state.page*PER_PAGE+5).map(w=>w.en).join(". "));
});
$("retoGrupo").addEventListener("click",()=>startChallenge("vocab",state.groupId));
$("retoGrammar").addEventListener("click",()=>startChallenge("grammar"));
$("lecturaSelect").addEventListener("change",event=>{state.readingId=event.target.value;showReading();});
$("escucharLectura").addEventListener("click",()=>speak(getReading(state.readingId).paras.join(" ")));
$("preguntasLectura").addEventListener("click",()=>startChallenge("reading",null,state.readingId));
document.querySelectorAll("[data-reto]").forEach(btn=>btn.addEventListener("click",()=>startChallenge(btn.dataset.reto)));
$("escucharContexto").addEventListener("click",()=>{
  const q=state.challenge?.[state.current];
  if(q?.kind==="reading")speak(getReading(q.readingId).paras.join(" "));
});
$("retoForm").addEventListener("submit",checkAnswer);
$("retoContinuar").addEventListener("click",nextQuestion);
$("retoPista").addEventListener("click",()=>{
  const q=state.challenge?.[state.current];
  if(!q||state.solved)return;
  $("pistaTexto").textContent="💡 "+q.clue;$("pistaTexto").hidden=false;
  if(!state.hintUsed){state.hints++;state.hintUsed=true;}
});
$("salirReto").addEventListener("click",()=>showTab(state.sourceTab));
$("repetirReto").addEventListener("click",()=>startChallenge(state.lastMode,state.lastGroup,state.lastReading));
$("irMapa").addEventListener("click",()=>showTab("mapa"));
document.addEventListener("visibilitychange",()=>{if(document.hidden)detener();});
window.addEventListener("pagehide",detener);

try{
  await auth.authStateReady();
  if(!auth.currentUser){window.location.replace(new URL("../../../../login.html",import.meta.url).href);}
  else{
    await ContextoUsuario.inicializar();
    validation();
    initialise();
  }
}catch(error){
  console.error("English preparation:",error);
  const errorMessage=node("p","No se pudo preparar el contenido de English. Vuelve a entrar desde el portal de Inglés.","observacion");
  document.querySelector('[data-panel="mapa"]').prepend(errorMessage);
  document.querySelectorAll("button").forEach(btn=>btn.disabled=true);
}
