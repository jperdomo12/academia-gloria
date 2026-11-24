const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const {parseHTML}=require(process.env.QA_DOM_MODULE||'linkedom');
(async()=>{
 const {META_REPASO:meta,RECORRIDOS_REPASO:recorridos,PREGUNTAS_REPASO:banco}=await import('../cursos/6to/sociales/preparacion-primera-evaluacion/repaso-data.js');
 const helpers=await import('../mi-universo/mis-tareas/repaso-sociales-formativo.js');
 const {document,window}=parseHTML(fs.readFileSync('mi-universo/mis-tareas/index.html','utf8')),$=id=>document.getElementById(id);
 Object.defineProperty(window.HTMLSelectElement.prototype,'value',{configurable:true,get(){return this.querySelector('option[selected]')?.value||this.querySelector('option')?.value||'';},set(v){this.querySelectorAll('option').forEach(o=>o.toggleAttribute('selected',o.value===String(v)));}});
 for(const select of document.querySelectorAll('select')){select.setCustomValidity=function(v){this.error=v;};}
 function Option(text,value){const o=document.createElement('option');o.textContent=text;o.value=value;return o;}
 $('cursoReferencia').value='6';$('materia').value='Sociales';$('recursoAcademicoUrl').value='/academia-gloria/'+meta.rutaActividad;
 const source=fs.readFileSync('mi-universo/mis-tareas/mis-tareas.js','utf8'),start=source.indexOf('function datosAcademicosFormulario('),end=source.indexOf('function actualizarTipoMision(');
 const env=vm.createContext({$,document,Option,...helpers,RECORRIDOS_REPASO:recorridos,formularioSoloLectura:false,descripcionMisionPersonalizada:false,esRepasoAcademicoFormulario:()=>true,cursoAcademicoTexto:v=>v+'.º',actualizarVistaPrevia(){}});
 const form=vm.runInContext(source.slice(start,end)+';({actualizarRecorridoSociales,aplicarTextosAutomaticosAcademicos})',env);
 for(const r of recorridos){form.actualizarRecorridoSociales({restaurarId:r.id});assert.equal($('recorridoSociales').value,r.id);assert.equal($('recorridoSociales').options.length,4);form.aplicarTextosAutomaticosAcademicos();assert.ok($('titulo').value.includes(r.titulo));assert.ok($('criterio').value.includes(String(r.cantidad)));assert.ok(!$('criterio').value.includes('prueba final'));}
 form.actualizarRecorridoSociales({restaurarId:'retirado'});assert.match($('recorridoSociales').error,/no existe/);assert.equal($('recorridoSociales').value,'retirado');
 form.actualizarRecorridoSociales({restaurarId:''});assert.ok($('recorridoSociales').error); // Legacy requiere elección adulta explícita, sin migración silenciosa.
 form.actualizarRecorridoSociales({restaurarId:'dinero'});assert.equal($('recorridoSociales').error,'');env.formularioSoloLectura=true;form.actualizarRecorridoSociales();assert.equal($('recorridoSociales').disabled,true);
 $('recursoAcademicoUrl').value='/cursos/6to/sociales/impuestos/';form.actualizarRecorridoSociales();assert.equal($('campoRecorridoSociales').hidden,true);assert.equal($('recorridoSociales').error,'');
 // Visor real, solo renderizado: datos guardados y lectura sin ningún servicio de escritura disponible.
 const vista=parseHTML(fs.readFileSync('mi-universo/mis-tareas/resultado-academico.html','utf8')),spoken=[];
 let visor=fs.readFileSync('mi-universo/mis-tareas/resultado-academico.js','utf8').replace(/^import[\s\S]*?;\n/gm,'').replaceAll('import.meta.url',JSON.stringify('https://academia.invalid/mi-universo/mis-tareas/resultado-academico.js')).replace(/\niniciar\(\);\s*$/,'');
 const render=vm.runInNewContext(visor+';renderResultado',{document:vista.document,window:{location:{search:'?sesionId=qa'},addEventListener(){}},URL,URLSearchParams,Intl,console,lectorDisponible:()=>true,escuchar:v=>spoken.push(v),detener(){}});
 const motor=fs.readFileSync('compartido/js/motor-practica-verbal.js','utf8'),construir=vm.runInNewContext(motor.slice(motor.indexOf('export function normalizarRespuestaVerbal'),motor.indexOf('// Motor de verbos existente')).replaceAll('export ','')+';construirRegistroFormativo');
 const preguntas=banco.slice(15),historial=new Map(preguntas.map(p=>[p.id,[{respuesta:'otra',respuestaTexto:'Una idea anterior',correcta:false},{respuesta:p.respuestaCorrecta,respuestaTexto:p.opciones.find(o=>o.id===p.respuestaCorrecta).texto,correcta:true}]]));
 const sesion=construir({meta,recorridoId:'publicidad',preguntas,historial,pistas:new Map([[preguntas[0].id,[{texto:'Pista guardada <script>',antesDeIntento:1}]]]),dudas:new Set([preguntas[0].id]),intentoId:'intento-qa-1234567',identidad:{personaId:'persona',actorUserId:'actor'}});
 render(sesion,{personaActiva:{nombre:'Alumno de prueba'}});const v=id=>vista.document.getElementById(id);
 assert.equal(v('metricaCorrectas').textContent,'3 / 3');assert.equal(v('metricaPorcentaje').textContent,'0');assert.doesNotMatch(v('contenidoResultado').textContent,/%|porcentaje de esta prueba|La respuesta fue incorrecta/);
 assert.match(v('revisionRespuestas').textContent,/Primera respuesta.*Una idea anterior/);assert.match(v('revisionRespuestas').textContent,/Respuesta final/);assert.match(v('revisionRespuestas').textContent,/Duda marcada/);assert.match(v('revisionRespuestas').textContent,/Pista guardada/);assert.equal(v('revisionRespuestas').querySelectorAll('script').length,0);
 v('escucharResumen').click();assert.match(spoken[0],/Sin nota/);assert.doesNotMatch(spoken[0],/por ciento/);vista.document.querySelector('[data-escuchar-respuesta]').click();assert.match(spoken[1],/Primera respuesta.*Respuesta final/);
 console.log('PASS DOM simulado Gestión/visor: selector y títulos 4 recorridos, edición/retirado/legacy/consulta, limpieza por recurso, respuesta inicial/final/apoyos/dudas, sin porcentaje, lectura histórica y escape HTML.');
})().catch(e=>{console.error(e);process.exitCode=1;});
