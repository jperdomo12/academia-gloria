import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { HISTORIAS as BASE } from "../mi-universo/rincon-lectura/historias-base.js";
import { HISTORIAS_INTERESES_NIVEL_1 } from "../mi-universo/rincon-lectura/historias-intereses-nivel1.js";
import { HISTORIAS_NUEVAS_2026 as NUEVAS } from "../mi-universo/rincon-lectura/historias-nuevas-2026.js";

const esperadas = [
  ["el-plan-del-sabado",1,8,5,1541,4],
  ["el-cuadro-que-tuvo-tres-intentos",2,9,5,2323,4],
  ["tres-preguntas-para-elena",2,9,5,2345,4],
  ["la-cancion-del-segundo-intento",3,11,6,3322,5],
  ["el-menu-que-nos-da-energia",3,11,6,3301,4],
  ["los-treinta-euros-de-clara",3,11,6,3355,5]
];

test("seis historias con reparto 1/2/3, fuente y contenido completo", () => {
  assert.equal(NUEVAS.length,6);
  for (const [i,s] of NUEVAS.entries()) {
    const [id,nivel,parrafos,preguntas,caracteres,visuales] = esperadas[i];
    assert.equal(s.id,id);
    assert.equal(s.nivel,nivel);
    assert.equal(s.parrafos.length,parrafos);
    assert.equal(s.preguntas.length,preguntas);
    assert.equal(s.parrafos.map(p => p.texto).join("").length,caracteres);
    assert.equal(s.apoyoVisual.items.length,visuales);
    assert.ok(s.subtitulo && s.reflexion && s.fraseDelDia);
    assert.ok(s.parrafos.every(p=>p.texto && p.icono));
    assert.ok(s.idioma==="es-ES" && s.categoria && s.escena);
  }
  assert.deepEqual([1,2,3].map(n=>NUEVAS.filter(h=>h.nivel===n).length),[1,2,3]);
});

test("IDs únicos frente al catálogo anterior y respuestas válidas", () => {
  const todas=[...BASE,...HISTORIAS_INTERESES_NIVEL_1,...NUEVAS];
  assert.equal(todas.length,33);
  assert.equal(new Set(todas.map(h=>h.id)).size,33);
  const q=NUEVAS.flatMap(h=>h.preguntas);
  assert.equal(q.length,33);
  assert.equal(q.filter(x=>x.tipo==="opcion").length,21);
  assert.equal(q.filter(x=>x.tipo==="texto").length,12);
  for (const h of NUEVAS) {
    assert.equal(new Set(h.preguntas.map(x=>x.id)).size,h.preguntas.length);
    for (const x of h.preguntas) {
      assert.ok(x.texto && x.ayuda);
      if (x.tipo==="opcion") {
        assert.equal(x.opciones.length,3);
        assert.equal(new Set(x.opciones).size,3);
        assert.ok(x.opciones.includes(x.correcta));
      } else assert.equal(x.correcta,undefined);
    }
  }
});

test("integración sin duplicar motor y sin cambiar historias existentes",()=>{
  const fichero=readFileSync(new URL("../mi-universo/rincon-lectura/historias.js",import.meta.url),"utf8");
  assert.match(fichero,/import \{ HISTORIAS_NUEVAS_2026 \} from "\.\/historias-nuevas-2026\.js"/);
  assert.match(fichero,/\.\.\.HISTORIAS_BASE/);
  assert.match(fichero,/\.\.\.HISTORIAS_INTERESES_NIVEL_1/);
  assert.match(fichero,/\.\.\.HISTORIAS_NUEVAS_2026/);
});

test("Science y Sociales enlazan ideas escolares, sin prometer garantías",()=>{
  const ciencia=NUEVAS.find(h=>h.id==="el-menu-que-nos-da-energia").parrafos.map(p=>p.texto).join(" ").toLowerCase();
  for(const s of ["pirámide","carbohidratos","verduras","frutas","lácteos","proteínas","grasas"])assert.ok(ciencia.includes(s),s);
  const finanzas=NUEVAS.find(h=>h.id==="los-treinta-euros-de-clara").parrafos.map(p=>p.texto).join(" ").toLowerCase();
  for(const s of ["ahorrar","invertir","treinta euros","riesgo"])assert.ok(finanzas.includes(s),s);
  assert.match(finanzas,/no.*garant|no.*segur|perder/);
});
