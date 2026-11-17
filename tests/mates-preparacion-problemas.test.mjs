import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { runInNewContext } from "node:vm";

const ruta = "../cursos/6to/mates/preparacion-problemas/";
const data = JSON.parse(readFileSync(new URL(ruta+"problemas.json",import.meta.url),"utf8"));
const html = readFileSync(new URL(ruta+"index.html",import.meta.url),"utf8");
const js = readFileSync(new URL(ruta+"preparacion.js",import.meta.url),"utf8");
// Ejecuta las funciones puras reales del motor, sin Firebase/DOM ni una segunda implementación.
const motor=runInNewContext(`const tipos=["doble","suma","reparto","grupos","comparacion"];
${js.slice(js.indexOf("function validarBanco("),js.indexOf("function mostrarPanel("))}
${js.slice(js.indexOf("function mezclar("),js.indexOf("function guardarPuntoEnsayo("))}
({validarBanco,fases,crearPlanEnsayo})`);
const numeric=p=>Array.from(motor.fases(p)).filter(f=>f.tipo==="numero").map(f=>f.valor);
const expected={g1:[318],g2:[55],g3:[361,1],g4:[270],g5:[146,392],
 e1a:[168],e1b:[250],e1c:[292],e1d:[76],e2a:[45],e2b:[49],e2c:[72],e2d:[96],
 e3a:[235,2],e3b:[250,2],e3c:[224,5],e3d:[123,4],e4a:[224],e4b:[288],e4c:[414],e4d:[224],
 e5a:[250,575],e5b:[290,670],e5c:[430,780],e5d:[123,77]};

test("Banco válido: 4 microactividades + 5 Gaudem + 20 originales, cuatro por familia",()=>{
  motor.validarBanco(data);
  assert.equal(data.calentamiento.length,4);assert.equal(data.gaudem.length,5);assert.equal(data.ensayos.length,20);
  assert.equal(new Set(data.ensayos.map(p=>p.id)).size,20);
  for(const tipo of ["doble","suma","reparto","grupos","comparacion"])assert.equal(data.ensayos.filter(p=>p.tipo===tipo).length,4);
});
test("Se preserva íntegro el contenido anterior a la ampliación (main 345f080)",()=>{
  const contenido=[data.calentamiento,data.gaudem,data.ensayos.slice(0,10)];
  assert.equal(createHash("sha256").update(JSON.stringify(contenido)).digest("hex"),"adbaf84ca2a1b7ef982dfe04c8765498ad57002f438845b84a638ac4ad67fa39");
  assert.deepEqual(data.gaudem.map(p=>p.id),["g1","g2","g3","g4","g5"]);
});
test("Las fases de los cinco Gaudem conservan preguntas, pistas y explicaciones",()=>{
  assert.equal(createHash("sha256").update(JSON.stringify(data.gaudem.map(p=>motor.fases(p)))).digest("hex"),"00a8b9dfca6b42506b267a83e9b312d58d6f08a40af33f9d6c3293d7d66f796e");
});
test("Las fases del motor producen las 25 claves aritméticas independientes",()=>{
  for(const p of [...data.gaudem,...data.ensayos]){
    assert.deepEqual(numeric(p),expected[p.id],p.id);
    for(const f of motor.fases(p))assert.ok(f.pregunta&&f.pista&&f.explicacion,p.id);
    if(p.tipo==="reparto")assert.ok(p.a%p.b>0&&p.a%p.b<p.b);
  }
});
test("Comparación retrocompatible: relación y pregunta final son independientes",()=>{
  const p={tipo:"comparacion",a:10,b:2,unidad:"€"};
  assert.deepEqual(numeric(p),[8,18]);
  assert.deepEqual(numeric({...p,relacion:"mas"}),[12,22]);
  assert.deepEqual(numeric({...p,relacion:"mas",preguntaFinal:"restante",presupuesto:20}),[12,8]);
  const sara=data.ensayos.find(p=>p.id==="e5d"),fs=Array.from(motor.fases(sara));
  assert.match(fs[1].opciones[fs[1].correcta],/restarlo del dinero disponible/);
  assert.match(fs[2].explicacion,/Aún falta responder cuánto dinero queda/);
  assert.match(fs[3].pregunta,/solamente el segundo artículo/);
  assert.equal(fs[3].valor,77);assert.notEqual(fs[3].valor,200-123-86);
});
test("Doble de libros adapta pregunta, pista y explicación sin euros",()=>{
  const fs=Array.from(motor.fases(data.ensayos.find(p=>p.id==="e1c")));
  assert.match(fs[2].pregunta,/libros/);assert.match(fs[2].explicacion,/292 libros/);
  for(const f of fs)assert.doesNotMatch([f.pregunta,f.pista,f.explicacion].join(" "),/euros|€|precio/);
});
test("Plan equilibrado y variable: 200 vueltas de cuatro bloques sin repetición",()=>{
  let seed=418;
  const azar=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;};
  const ordenes=new Set();
  for(let vuelta=0;vuelta<200;vuelta++){
    const plan=Array.from(motor.crearPlanEnsayo(data.ensayos,azar),b=>Array.from(b));
    assert.equal(plan.length,4);
    for(const bloque of plan){assert.equal(bloque.length,5);assert.equal(new Set(bloque.map(p=>p.tipo)).size,5);}
    assert.equal(new Set(plan.flat().map(p=>p.id)).size,20);
    ordenes.add(plan.flat().map(p=>p.id).join(","));
  }
  assert.ok(ordenes.size>190);
});
test("Validación rechaza contratos incompatibles, presupuesto inválido y reparto sin resto",()=>{
  for(const cambio of [{relacion:"otra"},{preguntaFinal:"otra"},{preguntaFinal:"restante",presupuesto:0},{preguntaFinal:"restante",presupuesto:100}]){
    const b=structuredClone(data);Object.assign(b.ensayos.find(p=>p.id==="e5d"),cambio);assert.throws(()=>motor.validarBanco(b));
  }
  const b=structuredClone(data);b.ensayos.find(p=>p.id==="e3c").a=1350;assert.throws(()=>motor.validarBanco(b));
});
test("Calentamiento y rutas permanecen; fecha correcta y sin persistencia nueva",()=>{
  for(const p of data.calentamiento){assert.ok(p.opciones.length>=3);assert.ok(p.correcta>=0&&p.correcta<p.opciones.length);assert.equal(motor.fases(p).length,1);}
  for(const clave of ['data-iniciar="comprendo"','data-iniciar="gaudem"','data-iniciar="ensayo"','id="escuchar"','id="pista"','id="comprobar"','id="continuar"','id="totalVuelta"'])assert.ok(html.includes(clave),clave);
  assert.match(html,/26 de noviembre/);assert.equal(data.meta.fecha,"2026-11-26");
  for(const name of ["index.html","piloto-problemas.html"]){const s=readFileSync(new URL("../cursos/6to/mates/"+name,import.meta.url),"utf8");assert.ok(s.includes('./preparacion-problemas/'));assert.doesNotMatch(s,/19 de noviembre/);}
  assert.ok(js.includes('ContextoUsuario.inicializar()'));assert.ok(js.includes('escuchar('));
  assert.doesNotMatch(js,/localStorage|sessionStorage|guardarSesionAcademica|setDoc|addDoc|indexedDB/);
});
