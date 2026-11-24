import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const leer=p=>fs.readFileSync('mi-universo/mis-tareas/'+p,'utf8');
test('hidden prevalece explícitamente dentro del formulario, sin cambiar display del label global',()=>{
 const css=leer('mis-tareas.css');assert.match(css,/#formTarea\s+\[hidden\]\s*\{\s*display\s*:\s*none\s*!important\s*\}/);assert.match(css,/(?:^|\n)label\s*\{\s*display\s*:\s*grid\s*;/);assert.doesNotMatch(css,/(?:^|\n)\[hidden\]\s*\{/);
});
test('HTML y cadena de import del catálogo renuevan las cuatro referencias publicadas de caché',()=>{
 const html=leer('index.html'),refuerzos=leer('refuerzos-academicos.js');
 for(const recurso of ['mis-tareas.css','mis-tareas.js','refuerzos-academicos.js'])assert.ok(html.includes(recurso+'?v=20261124-284'));
 assert.ok(refuerzos.includes('catalogo-repaso-academico.js?v=20261124-284'));
});
