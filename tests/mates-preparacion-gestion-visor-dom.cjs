const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const {parseHTML,DOMParser}=require(process.env.QA_DOM_MODULE||'linkedom');
(async()=>{
 const contratos=await import('../mi-universo/mis-tareas/repaso-mates-formativo.js');
 const {document,window}=parseHTML(fs.readFileSync('mi-universo/mis-tareas/index.html','utf8')),$=id=>document.getElementById(id);
 Object.defineProperty(window.HTMLSelectElement.prototype,'value',{configurable:true,get(){return this.querySelector('option[selected]')?.value||this.querySelector('option')?.value||'';},set(v){this.querySelectorAll('option').forEach(o=>o.toggleAttribute('selected',o.value===String(v)));}});
 for(const select of document.querySelectorAll('select'))select.setCustomValidity=function(v){this.error=v;};
 function Option(text,value){const o=document.createElement('option');o.textContent=text;o.value=value;return o;}
 $('cursoReferencia').value='6';$('materia').value='Matemáticas';$('tipo').value='repaso_academico';$('tema').value='Me preparo para los problemas';$('recursoAcademicoUrl').value='../../cursos/6to/mates/preparacion-problemas/';
 const src=fs.readFileSync('mi-universo/mis-tareas/mis-tareas.js','utf8');
 const env=vm.createContext({$,document,Option,...contratos,formularioSoloLectura:false,descripcionMisionPersonalizada:false,esRepasoAcademicoFormulario:()=>true,cursoAcademicoTexto:v=>v+'.º',actualizarVistaPrevia(){},esRepasoSocialesFormativo:()=>false});
 const form=vm.runInContext(src.slice(src.indexOf('function datosAcademicosFormulario('),src.indexOf('function actualizarTipoMision('))+';({actualizarRecorridoMates,aplicarTextosAutomaticosAcademicos})',env);
 for(const r of ['gaudem','ensayo']){form.actualizarRecorridoMates({restaurarId:r});form.aplicarTextosAutomaticosAcademicos();assert.equal($('recorridoMates').value,r);assert.equal($('recorridoMates').options.length,2);assert.ok($('titulo').value.includes(r==='gaudem'?'Mi ficha de Gaudem':'Compruebo que puedo'));assert.ok(!$('criterio').value.includes('prueba final'));}
 form.actualizarRecorridoMates({restaurarId:'legacy-desconocido'});assert.ok($('recorridoMates').error);form.actualizarRecorridoMates({restaurarId:'gaudem'});env.formularioSoloLectura=true;form.actualizarRecorridoMates();assert.equal($('recorridoMates').disabled,true);
 $('recursoAcademicoUrl').value='/cursos/6to/mates/fracciones/';form.actualizarRecorridoMates();assert.equal($('campoRecorridoMates').hidden,true);assert.equal($('recorridoMates').error,'');
 // Resolver académico original sigue descubriendo el recurso temporal, sin catálogo duplicado.
 const path=require('node:path'),{pathToFileURL}=require('node:url');
 for(const prefix of ['', '/academia-gloria']){
  const {document:d,window:w}=parseHTML('<form id="formTarea"><select id="cursoReferencia"><option value="6">6</option></select><select id="tipo"><option value="repaso_academico">Repaso</option></select><div><input id="materia" value="Matemáticas"></div><div><input id="tema"></div><div><input id="recursoAcademicoUrl"><span class="ayuda-campo"></span></div><datalist id="materiasSugeridas"></datalist></form>');
  const local=u=>path.resolve('.'+new URL(u).pathname.replace(/^\/academia-gloria(?=\/)/,'')),base='https://academia.invalid'+prefix;
  const source=fs.readFileSync('mi-universo/mis-tareas/catalogo-repaso-academico.js','utf8').replaceAll('import.meta.url',JSON.stringify(base+'/mi-universo/mis-tareas/catalogo-repaso-academico.js')).replace('await import(moduloUrl.href)','await importarCatalogoQA(moduloUrl.href)');
  vm.runInNewContext(source,{document:d,window:{location:new URL(base+'/mi-universo/mis-tareas/index.html'),setTimeout},Event:w.Event,DOMParser,URL,console,fetch:async u=>{let f=local(u);if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');return{ok:fs.existsSync(f),status:200,text:async()=>fs.readFileSync(f,'utf8')};},importarCatalogoQA:async u=>import(pathToFileURL(local(u)).href)});
  let option;for(let i=0;i<300;i++){option=d.querySelector('#temaCatalogoAcademico option[value="Me preparo para los problemas"]');if(option)break;await new Promise(r=>setTimeout(r,10));}assert.ok(option);
  const select=d.getElementById('temaCatalogoAcademico');select.value=option.value;select.dispatchEvent(new w.Event('change'));assert.match(d.getElementById('recursoAcademicoUrl').value,/mates\/preparacion-problemas/);
 }
 // Visor común: dos sesiones reales de B, links por bloque, respuestas e histórico.
 const {fixture}=require('./mates-preparacion-sesiones-dom.cjs');const id='B',datos=new Map([['usuarios/alumno/tareas/B',{id,tipo:'repaso_academico',alumnoId:'alumno',estado:'en_curso',requiereRevision:true,criterioCumplimiento:contratos.criterioPreparacion('ensayo'),progreso:{cantidadActual:0,evidenciaIds:[]}}]]);
 const f=await fixture({misionId:id,datos});await f.resolver();f.click('repetir');await f.resolver();const evidencias=await f.api.tareas.leerEvidencias(id),sesion=await f.sesiones.leerSesionAcademica(evidencias[0].sesionId),v=parseHTML(fs.readFileSync('mi-universo/mis-tareas/resultado-academico.html','utf8'));
 const viewer=fs.readFileSync('mi-universo/mis-tareas/resultado-academico.js','utf8').replace(/^import[\s\S]*?;\n/gm,'').replaceAll('import.meta.url',JSON.stringify('https://academia.invalid/mi-universo/mis-tareas/resultado-academico.js')).replace(/\niniciar\(\);\s*$/,'');
 const before=f.writes.length;
 const api=vm.runInNewContext(viewer+';({renderResultado,mostrarBloquesRelacionados})',{document:v.document,window:{location:new URL('https://academia.invalid/mi-universo/mis-tareas/resultado-academico.html?misionId=B&sesionId='+sesion.id+'&volver=%2Fmi-camino%2F'),addEventListener(){}},URL,URLSearchParams,Intl,console,Academia:f.api,lectorDisponible:()=>false,detener(){}});
 api.renderResultado(sesion,{personaActiva:{nombre:'Alumno QA'}});await api.mostrarBloquesRelacionados(sesion);assert.equal(v.document.getElementById('metricaCorrectas').textContent,'5 / 5');assert.equal(v.document.querySelectorAll('#sesionesRecorrido a').length,2);assert.equal(v.document.querySelectorAll('#problemasGuardados li').length,5);assert.equal(v.document.querySelectorAll('#revisionRespuestas article').length,sesion.respuestas.length);assert.doesNotMatch(v.document.getElementById('contenidoResultado').textContent,/%|porcentaje de esta prueba/);assert.equal(f.writes.length,before);
 for(const a of v.document.querySelectorAll('#sesionesRecorrido a')){const u=new URL(a.getAttribute("href"));assert.equal(u.searchParams.get('misionId'),'B');assert.equal(u.searchParams.get('volver'),'/mi-camino/');assert.ok(evidencias.some(e=>e.sesionId===u.searchParams.get('sesionId')));}
 console.log('PASS DOM: catálogo local/Pages y dos objetivos, edición/retirado/consulta/limpieza; visor de 5 problemas y fases con ambos bloques enlazados, retorno y cero escrituras de consulta.');
})().catch(e=>{console.error(e);process.exitCode=1;});
