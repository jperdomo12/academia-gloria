import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ruta = "../cursos/6to/mates/preparacion-problemas/";
const data = JSON.parse(readFileSync(new URL(ruta+"problemas.json",import.meta.url),"utf8"));
const html = readFileSync(new URL(ruta+"index.html",import.meta.url),"utf8");
const js = readFileSync(new URL(ruta+"preparacion.js",import.meta.url),"utf8");
const portal = readFileSync(new URL("../cursos/6to/mates/index.html",import.meta.url),"utf8");
const estrategia = readFileSync(new URL("../cursos/6to/mates/piloto-problemas.html",import.meta.url),"utf8");
const resultado = p => p.tipo==="suma"?p.valores.reduce((a,b)=>a+b,0):
  p.tipo==="doble"||p.tipo==="grupos"?p.a*p.b:
  p.tipo==="comparacion"?p.a+(p.a-p.b):
  p.tipo==="reparto"?Math.floor(p.a/p.b):NaN;

test("La ficha escolar contiene exactamente cinco problemas ordenados",()=>{
  assert.equal(data.gaudem.length,5);
  assert.deepEqual(data.gaudem.map(p=>p.id),["g1","g2","g3","g4","g5"]);
  assert.deepEqual(data.gaudem.map(p=>resultado(p)),[318,55,361,270,392]);
  assert.deepEqual(data.gaudem.map(p=>p.tipo),["doble","suma","reparto","grupos","comparacion"]);
});
test("Se conserva el reparto con resto y el precio intermedio",()=>{
  const sillas=data.gaudem[2],nevera=data.gaudem[4];
  assert.equal(sillas.a%sillas.b,1);
  assert.equal(sillas.a,sillas.b*361+1);
  assert.equal(nevera.a-nevera.b,146);
  assert.equal(resultado(nevera),392);
});
test("La transferencia tiene diez variantes, dos por familia",()=>{
  assert.equal(data.ensayos.length,10);
  const familias=new Map();
  for(const p of data.ensayos){
    assert.ok(p.enunciado.length>35);
    assert.ok(Number.isSafeInteger(resultado(p)));
    familias.set(p.tipo,(familias.get(p.tipo)||0)+1);
  }
  assert.deepEqual([...familias.values()],[2,2,2,2,2]);
});
test("Calentamiento sin cálculos y pistas completas",()=>{
  assert.equal(data.calentamiento.length,4);
  for(const p of data.calentamiento){
    assert.ok(p.opciones.length>=3);
    assert.ok(p.correcta>=0&&p.correcta<p.opciones.length);
    assert.ok(p.pista&&p.explicacion);
  }
});
test("La interfaz ofrece tres recorridos y se integra sin sustituir motores",()=>{
  for(const clave of ['data-iniciar="comprendo"','data-iniciar="gaudem"','data-iniciar="ensayo"','id="escuchar"','id="pista"','id="comprobar"','id="continuar"']){
    assert.ok(html.includes(clave),clave);
  }
  assert.ok(portal.includes('href="./preparacion-problemas/"'));
  assert.ok(estrategia.includes('href="./preparacion-problemas/"'));
  assert.ok(js.includes('tipo==="comparacion"'));
  assert.ok(js.includes('tipo==="reparto"'));
  assert.ok(js.includes('ContextoUsuario.inicializar()'));
  assert.ok(js.includes('escuchar('));
  assert.equal(js.includes("guardarSesionAcademica"),false);
});
