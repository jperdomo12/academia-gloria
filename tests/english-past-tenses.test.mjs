import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {PAST_META,BLOQUES_RESULTADO,PRACTICA,FAMILIAS_PRUEBA,FICHAS,LECTURAS,ESCENAS} from '../cursos/6to/english/past-simple-vs-past-continuous/past-data.js';
import {TEMAS_ENGLISH} from '../cursos/6to/english/temas-english.js';
const source=readFileSync(new URL('../compartido/js/motor-practica-verbal.js',import.meta.url),'utf8');
const {normalizarRespuestaVerbal:n,esRespuestaVerbalCorrecta:ok}=runInNewContext(source.slice(source.indexOf('export function normalizarRespuestaVerbal'),source.indexOf('// Motor de verbos existente')).replaceAll('export ', '')+';({normalizarRespuestaVerbal,esRespuestaVerbalCorrecta})');
const variants=FAMILIAS_PRUEBA.flatMap(f=>f.variantes),all=[...PRACTICA,...variants];
test('Un Tema canónico; 44 prácticas, 12 familias por 4 variantes, 4 dominios',()=>{
 assert.equal(TEMAS_ENGLISH.filter(t=>t.id==='past-simple-vs-past-continuous').length,1);
 assert.equal(PAST_META.actividadId,'6-english-past-simple-vs-past-continuous');
 assert.equal(PRACTICA.length,44);assert.equal(FAMILIAS_PRUEBA.length,12);assert.equal(variants.length,48);
 assert.equal(new Set(all.map(v=>v.id)).size,92);
 for(const b of BLOQUES_RESULTADO)assert.equal(FAMILIAS_PRUEBA.filter(f=>f.variantes.every(v=>v.bloqueId===b.id)).length,3);
 for(const f of FAMILIAS_PRUEBA)assert.equal(f.variantes.length,4);
 for(const [foco,count] of Object.entries({formas:8,simple:8,continuous:8,contraste:8,reading:12}))assert.equal(PRACTICA.filter(p=>p.focoId===foco).length,count);
});
test('Todos los retos tienen clave, pista y explicación; siete formatos y lectura con evidencia',()=>{
 assert.deepEqual([...new Set(PRACTICA.map(p=>p.habilidad))].sort(),['completar','conjugar','construir','corregir','elegir','leer','transformar']);
 for(const item of all){
  assert.ok(item.pista&&item.explicacion&&item.pregunta&&item.textoLectura,item.id);
  assert.ok(BLOQUES_RESULTADO.some(b=>b.id===item.bloqueId));
  assert.equal(ok(item,item.respuestaCorrecta),true,item.id);
  if(item.formato==='texto'){assert.ok(item.respuestasValidas.length);assert.ok(!item.respuestasValidas.some(a=>/did(?:n't| not) (went|wrote|saw|ate|took|bought)|\bwere he\b|\bwas they\b|\bwas play\b/i.test(a)),item.id);}
  else{assert.equal(item.opciones.filter(o=>o.id===item.respuestaCorrecta).length,1);assert.equal(new Set(item.opciones.map(o=>n(o.texto))).size,item.opciones.length);}
  if(item.habilidad==='leer'){assert.ok(item.contextoLectura);assert.ok(LECTURAS.some(r=>r.texto===item.contextoLectura));}
 }
 assert.equal(LECTURAS.length,2);assert.equal(PRACTICA.filter(p=>p.habilidad==='leer').length,8);
});
test('Normalización admite formas equivalentes, no auxiliares ni tiempos incorrectos',()=>{
 const item={formato:'texto',respuestaCorrecta:"She didn't go to the park."};
 for(const s of ["  SHE didn’t  go to the park! ","She did not go to the park", "She didn´t go to the park."])assert.equal(ok(item,s),true,s);
 for(const s of ["She didn't went to the park.","She went to the park.","She was going to the park.","She didnt go to the park.","She didn't go park."])assert.equal(ok(item,s),false,s);
 assert.equal(n("weren’t"),n('were not'));assert.equal(n("wasn't"),n('was not'));
 assert.equal(ok({respuestaCorrecta:'0'},'0'),true);assert.equal(ok({respuestaCorrecta:'0'},' 0 '),false,'Selección legacy conserva comparación exacta');
});
// Claves escritas de prueba, revisadas de forma independiente del render y del corrector.
const expected=[['was','had','were','did'],["She didn't take the red bus.",'Did he eat an apple yesterday?',"We didn't do the project on Friday.",'Did they buy new pencils?'],['watered','carried','planned','wrote'],['was making','were listening','was writing','were running'],["They weren't playing a board game.","She wasn't cutting a paper star.","I wasn't carrying the bags.","We weren't taking a break."],['Was he feeding the fish?','Were you helping the teacher?','What were they painting at noon yesterday?',"wasn't"],['were making / landed','arrived / was checking','was watering / burst','was cleaning / called'],['took / went','clapped / left','lifted / looked','washed / read']];
test('Claves gramaticales revisadas de las ocho familias escritas de forma/estructura/contraste',()=>{
 expected.forEach((answers,i)=>assert.deepEqual(FAMILIAS_PRUEBA[i].variantes.map(v=>v.respuestaCorrecta),answers));
 assert.deepEqual(FAMILIAS_PRUEBA.at(-1).variantes.map(v=>v.respuestaCorrecta),["He didn't see the painting.",'We were making a cake.','Were they waiting near the gate?','She was drawing a tree at ten.']);
});
test('When no determina la forma: proceso, evento, simultaneidad y sucesión',()=>{
 assert.deepEqual(ESCENAS.map(s=>s.tipos),[['tramo','marca'],['tramo','tramo'],['marca','marca'],['tramo','marca']]);
 assert.match(ESCENAS.at(-1).frase,/When I was walking/);
 assert.ok(FAMILIAS_PRUEBA.find(f=>f.id==='contrast-sequence').variantes.every(v=>v.pregunta.includes('terminadas')));
 assert.ok(FAMILIAS_PRUEBA.find(f=>f.id==='contrast-event').variantes.every(v=>v.pregunta.includes('en curso')));
 const have=FICHAS.find(f=>f.id==='have');assert.match(have.ejemplo,/Yes, I did/);assert.match(have.estructura,/didn’t \+ have/);
 assert.match(FICHAS.find(f=>f.id==='cvc').ayuda,/acento/);
});
test('Contrato académico y actividades previas preservados; no persistencia paralela ni PDF publicados',()=>{
 const page=readFileSync(new URL('../cursos/6to/english/past-simple-vs-past-continuous/past.js',import.meta.url),'utf8');
 assert.match(page,/iniciarTemaVerbal/);assert.match(source,/guardarSesionAcademica/);assert.doesNotMatch(page,/setDoc|addDoc|localStorage|sessionStorage|getUserMedia/);
 for(const sec of ['resumen','compara','fichas','practica','prueba'])assert.ok(readFileSync(new URL('../cursos/6to/english/past-simple-vs-past-continuous/index.html',import.meta.url),'utf8').includes('data-panel="'+sec+'"'));
});
