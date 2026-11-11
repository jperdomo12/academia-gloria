import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ENGLISH_PREP_DATA as DATA } from "../cursos/6to/english/preparacion-noviembre/preparacion-data.js";

const base="../cursos/6to/english/";
const code=readFileSync(new URL(base+"preparacion-noviembre/preparacion.js",import.meta.url),"utf8");
const html=readFileSync(new URL(base+"preparacion-noviembre/index.html",import.meta.url),"utf8");
const css=readFileSync(new URL(base+"preparacion-noviembre/preparacion.css",import.meta.url),"utf8");
const portal=readFileSync(new URL(base+"index.html",import.meta.url),"utf8");
const links=readFileSync(new URL(base+"temas-english.js",import.meta.url),"utf8");

test("seis grupos de vocabulario escolar con sus páginas y categorías",()=>{
  assert.deepEqual(DATA.groups.map(g=>g.id),["body","halloween","colours","numbers","school-objects","school-places"]);
  assert.deepEqual(DATA.groups.map(g=>g.words.length),[31,20,11,37,35,14]);
  assert.equal(DATA.groups.reduce((n,g)=>n+g.words.length,0),148);
  for(const g of DATA.groups){
    assert.ok(g.pages&&g.title&&g.icon);
    assert.equal(new Set(g.words.map(w=>w.en)).size,g.words.length);
    for(const w of g.words)assert.ok(w.en && w.es && w.emoji);
  }
});
test("palabras prioritarias de body, Halloween, números y colores",()=>{
  const grupo=id=>DATA.groups.find(g=>g.id===id).words.map(w=>w.en);
  for(const x of ["eye / eyes","nose","tooth / teeth","head","hand","knee / knees","foot / feet","skeleton","tongue","skin"])
    assert.ok(grupo("body").includes(x),x);
  for(const x of ["owl","witch","mummy","cauldron","pumpkin","haunted house","trick or treat","spider web","candy"])
    assert.ok(grupo("halloween").includes(x),x);
  for(const x of ["red","yellow","blue","green","orange","brown","purple","black","white","grey","pink"])
    assert.ok(grupo("colours").includes(x),x);
  for(const x of ["one","twenty","twenty-one","thirty","forty","fifty","one hundred"])
    assert.ok(grupo("numbers").includes(x),x);
  assert.ok(!grupo("numbers").includes("fourty"),"Forty must not be misspelled");
});
test("To be incluye pronombres, afirmación, negación y pregunta con respuesta",()=>{
  assert.equal(DATA.toBe.length,4);
  assert.equal(DATA.grammarQuestions.length,18);
  const ids=DATA.toBe.map(x=>x.id);
  assert.deepEqual(ids,["be-pronoun","be-positive","be-negative","be-questions"]);
  for(const r of DATA.toBe){
    assert.ok(r.explain && r.examples.length>=3);
    assert.ok(r.examples.every(([en,es])=>en && es));
  }
  for(const [stem,choices,index,explain] of DATA.grammarQuestions){
    assert.ok(stem && explain);
    assert.ok(choices.length>=3);
    assert.ok(Number.isInteger(index) && index>=0 && index<choices.length);
    assert.equal(new Set(choices).size,choices.length);
  }
});
test("tres historias originales con cuatro preguntas válidas por historia",()=>{
  assert.deepEqual(DATA.readings.map(r=>r.id),["read-halloween","read-body","read-school"]);
  for(const reading of DATA.readings){
    assert.equal(reading.paras.length,3);
    assert.ok(reading.paras.every(p=>p.length>70));
    assert.ok(reading.source.startsWith("Elaboración original")||reading.source.startsWith("Historia original"));
    assert.equal(reading.questions.length,4);
    assert.equal(new Set(reading.questions.map(q=>q[0])).size,4);
    for(const [stem,choices,index,explain] of reading.questions){
      assert.ok(stem && explain);
      assert.ok(index>=0 && index<choices.length);
    }
  }
});
test("tres tipos de retos, voz y ayudas sin escritura de notas",()=>{
  for(const data of ['data-reto="vocab"','data-reto="grammar"','data-reto="mixto"','data-tab="reading"','id="grupoVocab"','id="lecturaSelect"','id="retoPista"'])
    assert.ok(html.includes(data),data);
  assert.ok(code.includes('compartido/js/lector-texto.js'));
  assert.ok(code.includes('escuchar('));
  assert.ok(code.includes('ContextoUsuario.inicializar()'));
  assert.ok(code.includes('function startChallenge('));
  assert.ok(code.includes('function readingQuestions('));
  assert.ok(code.includes('function mixedVocab('));
  assert.ok(code.includes('state.solved=true'));
  assert.ok(!/guardarSesionAcademica|guardarActividad|addDoc\(/.test(code));
  assert.ok(css.includes("prefers-reduced-motion"));
});
test("acceso desde el portal y reutilización de los dos Temas existentes",()=>{
  assert.ok(portal.includes('href="./preparacion-noviembre/"'));
  assert.ok(html.includes('href="../present-simple-vs-present-continuous/"'));
  assert.ok(html.includes('href="../much-many-a-lot-of/"'));
  assert.ok(links.includes("present-simple-vs-present-continuous"));
  assert.ok(links.includes("much-many-a-lot-of"));
});
