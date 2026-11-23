import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {COCO_META,BLOQUES_RESULTADO,PRACTICA_COCO,FAMILIAS_PRUEBA_COCO,OPERACIONES_MATEZONA,leerEnteroOperacion,formatearNumeroOperacion,textoOperacion} from '../cursos/6to/zonas/matezonas/dale-al-coco-zonas-1/dale-al-coco-zonas-1-data.js';
const familias=OPERACIONES_MATEZONA;
// Comprobación independiente de las claves de datos; el producto no evalúa código ni expresiones libres.
function valor(n){return typeof n==='number'?n:n.potencia?n.potencia[0]**n.potencia[1]:n.producto?n.producto.map(valor).reduce((a,b)=>a*b,1):calcular(n.grupo);}
function calcular(ex){const xs=ex.map(x=>typeof x==='string'?x:valor(x));for(let i=1;i<xs.length;)if(xs[i]==='×'||xs[i]===':'){xs.splice(i-1,3,xs[i]==='×'?xs[i-1]*xs[i+1]:xs[i-1]/xs[i+1]);}else i+=2;let n=xs[0];for(let i=1;i<xs.length;i+=2)n=xs[i]==='+'?n+xs[i+1]:n-xs[i+1];return n;}
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
test('El banco y contrato originales permanecen íntegros, incluida la Prueba de ocho',()=>{
 assert.equal(hash([COCO_META,BLOQUES_RESULTADO,PRACTICA_COCO,FAMILIAS_PRUEBA_COCO]),'f32bf3ae424bfd6c09c0a1ee0a3e866b1f60d7bfa0117a174c301d21d87cf656');
 assert.equal(PRACTICA_COCO.length,8);assert.equal(FAMILIAS_PRUEBA_COCO.length,8);
});
test('Las siete operaciones escolares coinciden con Issue #266',()=>{
 assert.deepEqual(familias.map(f=>f.variantes[0].respuestas),[{resultado:778923},{cociente:688,resto:18},{resultado:27268196},{resultado:635892},{resultado:7},{resultado:40},{resultado:10202}]);
 assert.deepEqual(familias.slice(0,6).map(f=>f.variantes[0].expresion),[
  [755672,'+',45,'+',23206],[26850,':',39],[406988,'×',67],[678658,'−',42766],
  [{producto:[2,5]},'+',{producto:[3,7]},'−',{producto:[6,4]}],
  [{producto:[2,{grupo:[5,'+',45]}]},'−',{producto:[4,{grupo:[9,'+',6]}]}]
 ]);
 assert.deepEqual(familias[6].variantes[0].expresion,[{potencia:[10,4]},'+',202]);
 assert.equal(formatearNumeroOperacion(27268196),'27.268.196');
 assert.equal(textoOperacion(familias[6].variantes[0].expresion),'10 elevado a 4 más 202');
 assert.equal(textoOperacion(familias[4].variantes[0].expresion),'2 por 5 más 3 por 7 menos 6 por 4');
});
test('Veintiuna claves verificadas: siete familias y catorce variantes originales',()=>{
 assert.equal(familias.length,7);assert.equal(new Set(familias.flatMap(f=>f.variantes.map(v=>v.id))).size,21);
 for(const f of familias){assert.equal(f.variantes.length,3);assert.ok(f.pista&&f.error&&f.plan.length);for(const [i,v] of f.variantes.entries()){
  assert.equal(v.origen,i===0?'Gaudem':'Academia');assert.ok(v.pasos.length>=2);
  if(f.id==='division'){const [a,,b]=v.expresion;assert.equal(v.respuestas.cociente,Math.floor(a/b));assert.equal(v.respuestas.resto,a%b);assert.ok(v.respuestas.resto>0&&v.respuestas.resto<b);assert.equal(a,b*v.respuestas.cociente+v.respuestas.resto);}
  else assert.equal(v.respuestas.resultado,calcular(v.expresion),v.id);
 }}
});
test('Entrada entera: miles españoles válidos sin confundir decimales ni formatos rotos',()=>{
 for(const x of ['27268196','27.268.196','27 268 196',' 27\u00a0268\u00a0196 ','27\u202f268\u202f196'])assert.equal(leerEnteroOperacion(x),27268196,x);
 for(const x of ['','   ','688,46','7.5','27.268 196','27,268,196','2e7','+7','-7','12.34','7.0000','NaN','Infinity','9007199254740992'])assert.equal(leerEnteroOperacion(x),null,x);
 assert.equal(leerEnteroOperacion('0'),0);assert.equal(leerEnteroOperacion('688'),688);assert.equal(leerEnteroOperacion('18'),18);
});
test('No se añade otra persistencia ni se enlaza a preparación de examen',()=>{
 const js=readFileSync(new URL('../cursos/6to/zonas/matezonas/dale-al-coco-zonas-1/dale-al-coco-zonas-1.js',import.meta.url),'utf8').split('// Enriquecimiento de Material (#266).')[1];
 assert.ok(js);assert.doesNotMatch(js,/guardarSesion|setDoc|addDoc|localStorage|sessionStorage|eval\(|new Function|getUserMedia/);
 const html=readFileSync(new URL('../cursos/6to/zonas/matezonas/dale-al-coco-zonas-1/index.html',import.meta.url),'utf8');
 assert.match(html,/Matezona de operaciones · Gaudem/);assert.doesNotMatch(html,/6_MZ_Operaciones\.pdf|26\/11|examen del 26/);
});

test('La lógica previa de práctica/prueba/permisos/voz y guardado permanece idéntica a main',()=>{
 const fuente=readFileSync(new URL('../cursos/6to/zonas/matezonas/dale-al-coco-zonas-1/dale-al-coco-zonas-1.js',import.meta.url),'utf8');
 const previa=fuente.split('// Enriquecimiento de Material (#266).')[0].replace('  FAMILIAS_PRUEBA_COCO,\n  OPERACIONES_MATEZONA, leerEnteroOperacion, formatearNumeroOperacion, textoOperacion\n','  FAMILIAS_PRUEBA_COCO\n').trimEnd()+'\n';
 assert.equal(createHash('sha256').update(previa).digest('hex'),'75012c1e66eb2269fde12a0a234eaf5d27b4df132a298a4591617c3824667c0e');
});
