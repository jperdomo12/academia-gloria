import test from "node:test";
import assert from "node:assert/strict";
import {
  cifras,
  construir,
  descomponer,
  primeraDiferencia,
  vecinos,
  leerNumero,
  leerEntrada,
  salto,
  formato,
} from "../cursos/6to/mates/numeros-hasta-100000/numeros-modelo.js";
import { crearPractica } from "../cursos/6to/mates/numeros-hasta-100000/practica-data.js";
import {
  FAMILIAS_PRUEBA_NUMEROS,
  BLOQUES_RESULTADO,
} from "../cursos/6to/mates/numeros-hasta-100000/numeros-data.js";
test("representación posicional y conservación del valor, incluidos ceros", () => {
  for (let n = 0; n < 100000; n += 37) {
    assert.equal(construir(cifras(n)), n);
    assert.equal(
      descomponer(n).reduce((a, b) => a + b, 0),
      n,
    );
  }
  assert.deepEqual(cifras(59725), [5, 9, 7, 2, 5]);
  assert.deepEqual(descomponer(68001), [60000, 8000, 1]);
  assert.deepEqual(descomponer(100000), [100000]);
  assert.equal(formato(4218), "4 218");
  assert.equal(formato(100000), "100 000");
});
test("lectura española y entrada numérica sin adivinar valores inválidos", () => {
  for (const [n, text] of [
    [0, "cero"],
    [100, "cien"],
    [101, "ciento uno"],
    [1000, "mil"],
    [21001, "veintiún mil uno"],
    [31000, "treinta y un mil"],
    [59725, "cincuenta y nueve mil setecientos veinticinco"],
    [68001, "sesenta y ocho mil uno"],
    [100000, "cien mil"],
  ])
    assert.equal(leerNumero(n), text);
  assert.equal(leerEntrada("59 725"), 59725);
  assert.equal(leerEntrada(""), null);
  assert.equal(leerEntrada("23.5"), null);
  assert.equal(leerEntrada("-1"), null);
  assert.throws(() => leerNumero(100001));
});
test("primera diferencia, igualdad y límite de seis cifras", () => {
  assert.equal(primeraDiferencia(63398, 62431), 1);
  assert.equal(primeraDiferencia(78546, 78000), 2);
  assert.equal(primeraDiferencia(25555, 25555), -1);
  assert.equal(primeraDiferencia(100000, 99999), -2);
});
test("saltos y fronteras, sin envolvimiento silencioso", () => {
  assert.equal(salto(97000, 1000), 98000);
  assert.equal(salto(53600, -100), 53500);
  assert.equal(salto(99900, 100), 100000);
  assert.equal(salto(99999, 100), null);
  assert.equal(salto(0, -100), null);
  assert.equal(salto(100000, -1000), 99000);
});
test("redondeo conserva distancias y convención de mitad", () => {
  for (const [n, u, ans] of [
    [2078, 1000, 2000],
    [2508, 1000, 3000],
    [2500, 1000, 3000],
    [4218, 10, 4220],
    [4218, 100, 4200],
    [3255, 10, 3260],
    [1250, 100, 1300],
    [9985, 1000, 10000],
    [99985, 10, 99990],
    [99500, 1000, 100000],
    [100000, 1000, 100000],
  ])
    assert.equal(vecinos(n, u).resultado, ans);
  for (const u of [10, 100, 1000])
    for (let n = 0; n <= 100000; n += 13) {
      const v = vecinos(n, u);
      assert.ok(v.resultado % u === 0);
      assert.ok(Math.abs(n - v.resultado) <= u / 2);
      if (v.distanciaInferior === v.distanciaSuperior)
        assert.equal(v.resultado, v.superior);
    }
});
test("36 retos variados y 48 variantes con respuestas únicas, rango y reparto equilibrado", () => {
  const all = [0, 1, 2].flatMap(crearPractica);
  assert.equal(all.length, 36);
  assert.equal(new Set(all.map((x) => x.id)).size, 36);
  assert.ok(new Set(all.map((x) => x.tipo)).size >= 9);
  for (const r of all) {
    assert.ok(r.pistas.length === 3 && r.explicacion);
    if (typeof r.respuesta === "number")
      assert.ok(r.respuesta >= -1000 && r.respuesta <= 100000, r.id);
    if (r.datos.inicio !== undefined && r.pregunta.includes("serie"))
      assert.ok(r.datos.inicio + 3 * r.datos.paso <= 100000);
  }
  assert.equal(FAMILIAS_PRUEBA_NUMEROS.length, 12);
  const variants = FAMILIAS_PRUEBA_NUMEROS.flatMap((f) => f.variantes);
  assert.equal(variants.length, 48);
  assert.equal(new Set(variants.map((x) => x.id)).size, 48);
  for (const r of variants) {
    assert.ok(r.opciones.some((x) => x.id === r.respuestaCorrecta));
    assert.equal(
      new Set(r.opciones.map((x) => x.texto)).size,
      r.opciones.length,
    );
    assert.ok(r.explicacion && r.conceptoId);
  }
  for (const b of BLOQUES_RESULTADO)
    assert.equal(variants.filter((v) => v.bloqueId === b.id).length, 12);
});
