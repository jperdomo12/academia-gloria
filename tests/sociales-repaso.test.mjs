import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {BLOQUES_REPASO as bloques,PREGUNTAS_REPASO as preguntas} from '../cursos/6to/sociales/preparacion-primera-evaluacion/repaso-data.js';
import {TEMAS_SOCIALES} from '../cursos/6to/sociales/temas-sociales.js';
const motor=readFileSync(new URL('../compartido/js/motor-practica-verbal.js',import.meta.url),'utf8');
const helpers=runInNewContext(motor.slice(motor.indexOf('export function normalizarRespuestaVerbal'),motor.indexOf('// Motor de verbos existente')).replaceAll('export ','')+';({filtrarPracticaVerbal,dudasPracticaVerbal,esRespuestaVerbalCorrecta})');
const {filtrarPracticaVerbal:filtrar,dudasPracticaVerbal:dudas,esRespuestaVerbalCorrecta:correcta}=helpers;
const esperado=[/Mesopotamia, Egipto y China/,/vendedor/,/^Impuesto sobre la Renta de las Personas Físicas\./,/personas reales/i,/primavera/i,/basuras.*hospitales públicos/,/plan.*dinero disponible/i,/No gastar más/,/billetes y las monedas/,/carga a la cuenta bancaria/,/sobrar dinero.*ahorrar/,/Reducir gastos/,/Prestan parte.*financiación/,/riesgo.*no está garantizado/,/Destinar dinero.*beneficio/,/Informar o educar/,/empresa o institución/,/frase breve y fácil de recordar/];
test('Matriz Pilar: 18 ID en orden, grupos 6/9/3 y pares de páginas verificados',()=>{
 assert.deepEqual(preguntas.map(p=>p.id),Array.from({length:18},(_,i)=>'S'+String(i+1).padStart(2,'0')));
 assert.deepEqual(bloques.map(b=>[b.id,preguntas.filter(p=>p.bloqueId===b.id).length]),[['impuestos',6],['dinero',9],['publicidad',3]]);
 preguntas.forEach((p,i)=>assert.deepEqual(p.fuentePaginas,[3+2*i,4+2*i]));
});
test('Las 18 soluciones propias respetan la matriz escolar; cuatro alternativas únicas y una correcta',()=>{
 preguntas.forEach((p,i)=>{
  assert.equal(p.opciones.length,4);assert.equal(new Set(p.opciones.map(o=>o.id)).size,4);
  assert.equal(new Set(p.opciones.map(o=>o.texto.toLocaleLowerCase())).size,4);
  const aciertos=p.opciones.filter(o=>correcta(p,o.id));assert.equal(aciertos.length,1,p.id);assert.match(aciertos[0].texto,esperado[i],p.id);
  assert.ok(p.titulo&&p.pregunta&&p.enunciado&&p.pista&&p.ayudaError&&p.explicacion,p.id);
  assert.ok(!p.pista.includes(aciertos[0].texto),p.id+' no desvela la opción completa en la pista');
 });
});
test('Matices del contrato: IVA al vendedor/administración, primavera no universal, depósitos no íntegros, riesgo sin garantía',()=>{
 assert.match(preguntas[1].explicacion,/debe ingresarlo a la administración/);
 assert.match(preguntas[4].explicacion,/no significa que todos los impuestos/);
 assert.match(preguntas[12].explicacion,/no significa que se preste íntegramente cada euro/);
 assert.match(preguntas[13].explicacion,/se puede perder dinero/);
});
test('Filtro compartido conserva orden completo, bloques y subconjunto de dudas; sin mutar el banco',()=>{
 assert.deepEqual(Array.from(filtrar(preguntas),p=>p.id),preguntas.map(p=>p.id));
 for(const b of bloques)assert.equal(filtrar(preguntas,b.id).length,b.cantidad);
 assert.deepEqual(Array.from(filtrar(preguntas,'todas',['S15','S02']),p=>p.id),['S02','S15']);
 assert.equal(filtrar(preguntas,'publicidad',['S02']).length,0);
 const legacy=[{id:'a',focoId:'formas',bloqueId:'otro'},{id:'b',bloqueId:'formas'}];assert.equal(filtrar(legacy,'formas').length,2);
 assert.equal(preguntas.length,18);
});
test('Repaso final reúne error corregido, pista y duda manual una sola vez; una vuelta limpia los elimina',()=>{
 const intentos=new Map([['S01',2],['S02',1],['S03',4]]),pistas=new Set(['S03','S05']),marcadas=new Set(['S03','S18']);
 assert.deepEqual(Array.from(dudas(preguntas,intentos,pistas,marcadas)),['S01','S03','S05','S18']);
 assert.deepEqual(Array.from(dudas(preguntas,new Map(preguntas.map(p=>[p.id,1])),new Set(),new Set())),[]);
 assert.deepEqual(Array.from(dudas(preguntas.slice(6,15),intentos,pistas,marcadas)),[]);
});
test('Reutiliza el motor con registro formativo explícito, sin Prueba ni Tema nuevo',()=>{
 const js=readFileSync(new URL('../cursos/6to/sociales/preparacion-primera-evaluacion/repaso.js',import.meta.url),'utf8');
 const html=readFileSync(new URL('../cursos/6to/sociales/preparacion-primera-evaluacion/index.html',import.meta.url),'utf8');
 assert.match(js,/iniciarTemaVerbal/);assert.match(js,/soloPractica:true/);assert.doesNotMatch(js,/setDoc|addDoc|localStorage|sessionStorage|guardarSesion/);
 assert.doesNotMatch(html,/botonIniciarPrueba|botonResponderPrueba|\.pdf|<img/);
 assert.match(html,/no es el examen oficial/);assert.match(html,/25 de noviembre de 2026/);
 assert.deepEqual(TEMAS_SOCIALES.map(t=>t.id),['publicidad','dinero-ahorro-inversion','impuestos']);
 assert.match(motor,/async function iniciarPrueba\(\) \{\s*if\(soloPractica\)return;/);
 assert.match(js,/registroFormativo:true/);
 assert.match(motor,/if\(soloPractica && !registroFormativo\)modo=MODOS_SESION_ACADEMICA.VISTA_PREVIA/);
 assert.match(motor,/tiempo:soloPractica&&!registroFormativo\?null:crearTiempoActivo/);
});
