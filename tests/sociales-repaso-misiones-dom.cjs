// Catálogo asistido REAL sobre DOM simulado. No crea Misiones ni usa datos/personas reales.
const {parseHTML,DOMParser}=require(process.env.QA_DOM_MODULE||'linkedom');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const titulo='Me preparo para Sociales · Primera evaluación',ruta='../../cursos/6to/sociales/preparacion-primera-evaluacion/';
async function probar({editar=false,consulta=false,produccion=false}={}){
 const {document,window}=parseHTML('<!doctype html><form id="formTarea"><select id="cursoReferencia"><option value="6" selected>6.º</option></select><select id="tipo"><option value="repaso_academico" selected>Repaso académico</option></select><div><input id="materia" value="Sociales"></div><div><input id="tema"></div><div><input id="recursoAcademicoUrl"><span class="ayuda-campo"></span></div><datalist id="materiasSugeridas"></datalist></form>');
 // Interfaz select.value del navegador, no implementada en este DOM. No valida controles nativos.
 Object.defineProperty(window.HTMLSelectElement.prototype,'value',{configurable:true,get(){return this.querySelector('option[selected]')?.value||this.querySelector('option')?.value||'';},set(v){this.querySelectorAll('option').forEach(o=>o.toggleAttribute('selected',o.value===String(v)));}});
 const $=id=>document.getElementById(id);
 if(editar){$('tema').value=titulo;$('recursoAcademicoUrl').value=ruta;}
 if(consulta)$('formTarea').classList.add('modo-consulta');
 const base=produccion?'https://jperdomo12.github.io/academia-gloria':'https://academia.invalid';
 const local=url=>path.resolve('.'+new URL(url).pathname.replace(/^\/academia-gloria(?=\/)/,''));
 const location=new URL(base+'/mi-universo/mis-tareas/index.html');
 const fuente=fs.readFileSync('mi-universo/mis-tareas/catalogo-repaso-academico.js','utf8').replaceAll('import.meta.url',JSON.stringify(base+'/mi-universo/mis-tareas/catalogo-repaso-academico.js')).replace('await import(moduloUrl.href)','await importarCatalogoQA(moduloUrl.href)');
 vm.runInNewContext(fuente,{
  document,window:{location,setTimeout},Event:window.Event,DOMParser,URL,console,
  fetch:async url=>{let f=local(url);if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');return{ok:fs.existsSync(f),status:fs.existsSync(f)?200:404,text:async()=>fs.readFileSync(f,'utf8')};},
  importarCatalogoQA:async url=>import(pathToFileURL(local(url)).href)
 });
 const hasta=async fn=>{for(let i=0;i<300;i++){if(fn())return;await new Promise(r=>setTimeout(r,10));}throw Error('Catálogo no cargado: '+document.body.textContent);};
 await hasta(()=>$('temaCatalogoAcademico')?.querySelector('option[value="'+titulo+'"]'));
 assert.equal($('materiaCatalogoAcademico').value,'Sociales');
 const opts=Array.from($('temaCatalogoAcademico').querySelectorAll('option')).filter(o=>o.value&&!o.value.startsWith('__'));
 assert.equal(opts.length,4);assert.equal(opts.filter(o=>o.value===titulo).length,1);
 for(const t of ['La publicidad','El dinero, el ahorro y la inversión','Los impuestos'])assert.ok(opts.some(o=>o.value===t),t);
 if(!editar){$('temaCatalogoAcademico').value=titulo;$('temaCatalogoAcademico').dispatchEvent(new window.Event('change'));}
 assert.equal($('temaCatalogoAcademico').value,titulo);assert.equal($('tema').value,titulo);assert.equal($('materia').value,'Sociales');assert.equal($('recursoAcademicoUrl').value,ruta);assert.equal($('recursoAcademicoUrl').readOnly,true);
 assert.equal($('materiaCatalogoAcademico').disabled,consulta);assert.equal($('temaCatalogoAcademico').disabled,consulta);
 assert.equal($('tema').hidden,true);assert.equal($('materia').hidden,true);
 const destino=new URL($('recursoAcademicoUrl').value,location);assert.equal(destino.pathname,(produccion?'/academia-gloria':'')+'/cursos/6to/sociales/preparacion-primera-evaluacion/');assert.ok(fs.existsSync(path.join(local(destino),'index.html')));
}
(async()=>{await probar();await probar({editar:true});await probar({editar:true,consulta:true});await probar({produccion:true});await probar({editar:true,produccion:true});
 const catalogo=await import(pathToFileURL(path.resolve('cursos/6to/sociales/temas-sociales.js')).href);assert.equal(catalogo.TEMAS_SOCIALES.length,3);
 console.log('PASS DOM simulado: curso 6.º → Sociales → repaso seleccionable una sola vez, tres Temas conservados, ruta automática local/Pages correcta, restauración de edición y modo consulta no editable. Sin Misiones/datos reales ni nueva persistencia.');
})().catch(e=>{console.error(e);process.exitCode=1;});
