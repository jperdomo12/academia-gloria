import test from 'node:test';
import assert from 'node:assert/strict';
import { AVENTURAS } from '../mi-universo/rincon-dictados/aventuras.js';
import { nuevaSesion, palabrasFrase, resultado, vozFragmento, crearRegistro, validarBorrador } from '../mi-universo/rincon-dictados/modelo.js';
const id='intento-dictado-12345678';
const identidad={personaId:'persona-test',actorUserId:'actor-test'};
function revisada(a){const s=nuevaSesion(a,id);s.revision.forEach(f=>{f.palabras.fill('correcta');f.puntuacion='correcta';});s.acompanamiento='sola';return s;}
test('seis aventuras originales: dos por nivel, longitudes y fragmentos coherentes',()=>{
  assert.equal(new Set(AVENTURAS.map(a=>a.id)).size,6);
  for(const n of [1,2,3])assert.equal(AVENTURAS.filter(a=>a.nivel===n).length,2);
  for(const a of AVENTURAS){const n=a.frases.flatMap(palabrasFrase).length;const [min,max]=({1:[15,25],2:[30,45],3:[50,70]})[a.nivel];assert.ok(n>=min&&n<=max);assert.ok(a.frases.flat().every(f=>f.trim()===f&&f.length>0));}
});
test('no hay nota antes de revisar ni con dudas; cero real y cien real',()=>{
  const a=AVENTURAS[0],s=nuevaSesion(a,id);
  assert.equal(resultado(a,s).porcentaje,null);
  assert.throws(()=>crearRegistro(a,s,identidad));
  for(const f of s.revision){f.palabras.fill('revisar');f.puntuacion='correcta';}
  assert.equal(resultado(a,s).porcentaje,0);
  s.revision[0].palabras[0]='duda';assert.equal(resultado(a,s).porcentaje,null);
  const r=revisada(a);assert.equal(resultado(a,r).porcentaje,100);
  r.revision[0].puntuacion='duda';assert.equal(resultado(a,r).porcentaje,null);
});
test('una palabra cuenta una vez; omitidas cuentan; signos/añadidas separados; práctica no infla nota',()=>{
  const a=AVENTURAS[0],s=revisada(a);s.revision[0].palabras[0]='revisar';s.revision[0].palabras[1]='omitida';s.revision[0].puntuacion='revisar';s.revision[0].extras=2;
  assert.equal(resultado(a,s).porcentaje,89);assert.equal(resultado(a,s).correctas,17);
  s.practica=['0:0'];s.correcciones=['0:0'];assert.equal(resultado(a,s).porcentaje,89);
  const r=crearRegistro(a,s,identidad);assert.equal(r.resumen.tipoEvaluacion,'autoevaluacion');assert.equal(r.resumen.dictado.extras,2);assert.equal(r.vincularMision,false);assert.equal(r.intentoId,id);assert.equal(r.resumen.porcentaje,undefined);
});
test('el texto mantiene tildes y mayúsculas, y la voz dicta signos',()=>{
  assert.deepEqual(palabrasFrase(['¡Era un satélite!']),['¡Era','un','satélite!']);
  assert.equal(vozFragmento('El sábado.'),'El sábado. Punto.');
  assert.match(vozFragmento('¿Quién viene?'),/Abrimos interrogación.*Quién.*Cerramos interrogación/);
  assert.match(vozFragmento('agua,'),/Coma/);
});
test('borradores verifican versión, índices y estructura antes de restaurar',()=>{
  const a=AVENTURAS[0],s=nuevaSesion(a,id);assert.ok(validarBorrador(a,s));
  assert.equal(validarBorrador(a,{...s,versionAventura:'vieja'}),false);
  assert.equal(validarBorrador(a,{...s,fragmento:999}),false);
  assert.equal(validarBorrador(a,{...s,revision:[]}),false);
});
test('el registro se serializa sin arrays directamente anidados, incompatibles con Firestore',()=>{
  function comprobar(v){
    if(Array.isArray(v)){assert.ok(v.every(x=>!Array.isArray(x)));v.forEach(comprobar);}
    else if(v&&typeof v==='object')Object.values(v).forEach(comprobar);
  }
  for(const a of AVENTURAS){const r=crearRegistro(a,revisada(a),identidad);comprobar(r);assert.ok(r.resumen.dictado.frases.every(f=>typeof f==='string'));}
});
