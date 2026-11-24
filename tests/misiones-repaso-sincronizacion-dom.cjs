// Catálogo, handlers, textos, vista previa y serialización REALES sobre DOM simulado.
// No sustituye visibilidad computada, controles nativos ni Firestore desplegado.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),cp=require('node:child_process'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const {parseHTML,DOMParser}=require(process.env.QA_DOM_MODULE||'linkedom');
const settle=()=>new Promise(r=>setImmediate(r));
async function fixture({baseline=false,produccion=false,restaurar=null,consulta=false}={}){
 const leer=p=>baseline?cp.execFileSync('git',['show','dd96be11b10ee5be8e048e67ae5ea99fea2a89a9:'+p],{encoding:'utf8'}):fs.readFileSync(p,'utf8');
 const {document,window:w}=parseHTML(leer('mi-universo/mis-tareas/index.html')),$=id=>document.getElementById(id);
 Object.defineProperty(w.HTMLSelectElement.prototype,'value',{configurable:true,get(){return this.querySelector('option[selected]')?.value||this.querySelector('option')?.value||'';},set(v){this.querySelectorAll('option').forEach(o=>o.toggleAttribute('selected',o.value===String(v)));}});
 w.HTMLElement.prototype.focus=function(){};
 for(const select of document.querySelectorAll('select')){select.setCustomValidity=function(v){this.error=v;};select.reportValidity=function(){return !this.error;};}
 function Option(t,v){const o=document.createElement('option');o.textContent=t;o.value=v;return o;}
 const mates=await import('../mi-universo/mis-tareas/repaso-mates-formativo.js'),sociales=await import('../mi-universo/mis-tareas/repaso-sociales-formativo.js');
 $('tipo').value='repaso_academico';$('cursoReferencia').value='6';$('modulo').value='libre';$('materia').value='Matemáticas';$('tema').value='';$('recursoAcademicoUrl').value='';$('objetivo').value='';$('criterio').value='';$('titulo').value='';$('descripcionMision').value='';$('tareaId').value='';$('visibleParaAlumno').checked=false;
 if(restaurar){$('tema').value=restaurar.tema;$('materia').value=restaurar.materia;$('recursoAcademicoUrl').value=restaurar.url;$('titulo').value=restaurar.titulo||restaurar.tema;$('criterio').value=restaurar.criterio||'';$('descripcionMision').value=restaurar.descripcion||'';}
 const source=leer('mi-universo/mis-tareas/mis-tareas.js');
 const env=vm.createContext({$,document,Option,...mates,...sociales,formularioSoloLectura:consulta,descripcionMisionPersonalizada:false,esRepasoAcademicoFormulario:()=>$('tipo').value==='repaso_academico',cursoAcademicoTexto:v=>v+'.º de Primaria',queueMicrotask,
 esMisionDictado:()=>false,dictadoEnEdicion:()=>null,DESTINOS:{},misionesOrdenables:()=>[],ordenMision:()=>1,tareas:[]});
 const vista=source.slice(source.indexOf('function actualizarVistaPrevia()'),source.indexOf('function cambiarVista('));
 const formulario=source.slice(source.indexOf('function datosAcademicosFormulario('),source.indexOf('function actualizarTipoMision('));
 const recoger=source.slice(source.indexOf('function recogerFormulario()'),source.indexOf('function configurarFormulario()'));
 const api=vm.runInContext(vista+formulario+recoger+';({actualizarRecorridoMates,actualizarRecorridoSociales,aplicarTextosAutomaticosAcademicos,recogerFormulario'+(baseline?'':',conectarSincronizacionAcademica,crearTextosAcademicos,referencias:textosAutomaticosAcademicos')+'})',env);
 if(restaurar){api.actualizarRecorridoMates({restaurarId:restaurar.recorrido});api.actualizarRecorridoSociales({restaurarId:restaurar.recorrido});if(!baseline){Object.assign(api.referencias,api.crearTextosAcademicos());env.presentacion={descripcionMision:restaurar.descripcion||''};env.tarea={tipo:'repaso_academico',modulo:'libre'};vm.runInContext(source.slice(source.indexOf('  const descripcionGuardada ='),source.indexOf('  actualizarResumenCriterioDetectives();',source.indexOf('  const descripcionGuardada ='))),env);}}
 if(baseline){const a=source.indexOf('  $("recorridoMates").addEventListener("change"'),b=source.indexOf('  $("modulo").addEventListener("change"',a);vm.runInContext(source.slice(a,b),env);}else api.conectarSincronizacionAcademica();
 if(consulta)$('formTarea').classList.add('modo-consulta');
 const base=produccion?'https://jperdomo12.github.io/academia-gloria':'https://academia.invalid',local=u=>path.resolve('.'+new URL(u).pathname.replace(/^\/academia-gloria(?=\/)/,''));
 const catalogo=leer('mi-universo/mis-tareas/catalogo-repaso-academico.js').replaceAll('import.meta.url',JSON.stringify(base+'/mi-universo/mis-tareas/catalogo-repaso-academico.js')).replace('await import(moduloUrl.href)','await importarCatalogoQA(moduloUrl.href)');
 let peticiones=0,eventos=0,retardo=null;document.addEventListener('change',()=>{if(++eventos>200)throw Error('Bucle de eventos');});
 vm.runInNewContext(catalogo,{document,window:{location:new URL(base+'/mi-universo/mis-tareas/index.html'),setTimeout},Event:w.Event,DOMParser,URL,console,
 fetch:async u=>{peticiones++;if(retardo)await retardo(String(u));let f=local(u);if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');return{ok:fs.existsSync(f),status:200,text:async()=>fs.readFileSync(f,'utf8')};},importarCatalogoQA:async u=>import(pathToFileURL(local(u)).href)});
 async function hasta(fn){for(let i=0;i<400;i++){if(fn()){await settle();return;}await new Promise(r=>setTimeout(r,5));}throw Error('No cargó catálogo: '+$('materia').value+'/'+$('tema').value);}
 await hasta(()=>$('temaCatalogoAcademico')?.querySelector('option[value="'+(restaurar?.tema||'Me preparo para los problemas')+'"]'));
 const change=(id,value)=>{$(id).value=value;$(id).dispatchEvent(new w.Event('change',{bubbles:true}));};
 const tema=async titulo=>{change('temaCatalogoAcademico',titulo);await settle();};
 const materia=async nombre=>{change('materiaCatalogoAcademico',nombre);await hasta(()=>$('temaCatalogoAcademico').disabled===false&&$('materia').value===nombre);};
 const visibles=()=>['campoRecorridoMates','campoRecorridoSociales'].filter(id=>!$(id).hidden);
 return{$,document,api,env,change,tema,materia,hasta,visibles,setRetardo:f=>retardo=f,get peticiones(){return peticiones;},get eventos(){return eventos;}};
}
module.exports={fixture};
if(require.main===module)(async()=>{
 const preparacion='Me preparo para los problemas',puente='Puente de 5.º a 6.º',repaso='Me preparo para Sociales · Primera evaluación';
 if(process.env.QA_REPRODUCIR_BASE){const before=await fixture({baseline:true});await before.tema(preparacion);await before.tema(puente);assert.match(before.$('resumenAcademico').textContent,/Mi ficha de Gaudem/);console.log('REPRODUCIDO main dd96be1: Puente conserva Gaudem en resumen; label display:grid carece de regla hidden del formulario.');}
 for(const produccion of [false,true]){
  const f=await fixture({produccion});await f.tema(preparacion);assert.deepEqual(f.visibles(),['campoRecorridoMates']);f.change('recorridoMates','ensayo');await settle();assert.equal(f.api.recogerFormulario().criterioCumplimiento.cantidadObjetivo,2);assert.match(f.$('criterio').value,/dos bloques distintos/);
  await f.tema(puente);assert.deepEqual(f.visibles(),[]);assert.doesNotMatch(f.$('resumenAcademico').textContent,/Gaudem|Sociales/);assert.match(f.$('titulo').value,/Puente/);assert.equal(f.$('previewTitulo').textContent,f.$('titulo').value);assert.match(f.$('objetivo').value,/Puente/);assert.doesNotMatch(f.$('criterio').value,/Gaudem|bloques/);assert.equal(Object.keys(f.api.recogerFormulario().criterioCumplimiento.filtros).length,0);assert.match(f.$('recursoAcademicoUrl').value,/puente-5to-6to.html/);
  await f.tema(preparacion);assert.deepEqual(f.visibles(),['campoRecorridoMates']);assert.equal(f.$('recorridoMates').value,'gaudem');assert.equal(f.api.recogerFormulario().criterioCumplimiento.filtros.recorridoId,'gaudem');
  await f.materia('Sociales');await f.tema(repaso);assert.deepEqual(f.visibles(),['campoRecorridoSociales']);f.change('recorridoSociales','dinero');await settle();assert.equal(f.api.recogerFormulario().criterioCumplimiento.filtros.recorridoId,'dinero');await f.tema('Los impuestos');assert.deepEqual(f.visibles(),[]);assert.doesNotMatch(f.$('resumenAcademico').textContent,/repaso|Gaudem/);assert.equal(Object.keys(f.api.recogerFormulario().criterioCumplimiento.filtros).length,0);
  await f.tema(repaso);f.change('cursoReferencia','5');await settle();assert.deepEqual(f.visibles(),[]);assert.doesNotMatch(f.$('resumenAcademico').textContent,/Gaudem|Sociales/);f.change('cursoReferencia','6');await f.hasta(()=>f.$('materiaCatalogoAcademico').disabled===false);await f.materia('Matemáticas');await f.tema(preparacion);
  f.$('criterio').value='Mi indicación personalizada';f.$('objetivo').value='Mi objetivo personalizado';await f.tema(puente);assert.equal(f.$('criterio').value,'Mi indicación personalizada');assert.equal(f.$('objetivo').value,'Mi objetivo personalizado');assert.ok(f.peticiones<100&&f.eventos<200);
 }
 for(const [materia,tema,recorrido,url]of [['Matemáticas',preparacion,'ensayo','../../cursos/6to/mates/preparacion-problemas/'],['Sociales',repaso,'dinero','../../cursos/6to/sociales/preparacion-primera-evaluacion/']]){
  const f=await fixture({restaurar:{materia,tema,recorrido,url}});assert.equal(f.$(materia==='Sociales'?'recorridoSociales':'recorridoMates').value,recorrido);assert.equal(f.api.recogerFormulario().criterioCumplimiento.filtros.recorridoId,recorrido);
  const c=await fixture({consulta:true,restaurar:{materia,tema,recorrido,url,titulo:'Título guardado',criterio:'Criterio histórico'}});assert.equal(c.$('titulo').value,'Título guardado');assert.equal(c.$('criterio').value,'Criterio histórico');assert.equal(c.$(materia==='Sociales'?'recorridoSociales':'recorridoMates').disabled,true);
 }
 const f=await fixture();let soltar;const bloqueo=new Promise(r=>soltar=r);f.setRetardo(u=>u.includes('/6to/mates/index.html')?bloqueo:Promise.resolve());f.change('materiaCatalogoAcademico','Matemáticas');await settle();await f.materia('Sociales');await f.tema(repaso);soltar();await settle();await settle();assert.deepEqual(f.visibles(),['campoRecorridoSociales']);assert.equal(f.$('tema').value,repaso);
 await f.tema('__manual__');assert.deepEqual(f.visibles(),[]);assert.equal(f.$('recursoAcademicoUrl').value,'');
 for(const [descripcion,esperada]of [[`Vamos a repasar ${preparacion} de Matemáticas con calma.`,false],['Mi descripción personalizada',true]]){
  const editada=await fixture({restaurar:{materia:'Matemáticas',tema:preparacion,recorrido:'ensayo',url:'../../cursos/6to/mates/preparacion-problemas/',descripcion}});await editada.tema(puente);if(esperada)assert.equal(editada.$('descripcionMision').value,descripcion);else assert.match(editada.$('descripcionMision').value,/Puente/);assert.equal(editada.$('previewDescripcion').textContent,editada.$('descripcionMision').value);
 }
 const carreras=await fixture();let liberarCurso;const cursoPendiente=new Promise(r=>liberarCurso=r);carreras.setRetardo(u=>u.includes('/5to/index.html')?cursoPendiente:Promise.resolve());carreras.change('cursoReferencia','5');carreras.change('cursoReferencia','6');await carreras.hasta(()=>carreras.$('materiaCatalogoAcademico').disabled===false);await carreras.materia('Sociales');await carreras.tema(repaso);liberarCurso();await settle();await settle();assert.equal(carreras.$('cursoReferencia').value,'6');assert.deepEqual(carreras.visibles(),['campoRecorridoSociales']);
 const ediciones=await fixture();let primera=true,entro=false,liberarEdicion;const edicionPendiente=new Promise(r=>liberarEdicion=r);ediciones.setRetardo(u=>{if(primera&&u.includes('/6to/index.html')){primera=false;entro=true;return edicionPendiente;}return Promise.resolve();});
 const boton=ediciones.document.createElement('button');boton.dataset.action='edit';ediciones.document.body.append(boton);
 function restaurarActual(materia,tema,url,recorrido){ediciones.$('materia').value=materia;ediciones.$('tema').value=tema;ediciones.$('recursoAcademicoUrl').value=url;ediciones.api.actualizarRecorridoMates({restaurarId:recorrido});ediciones.api.actualizarRecorridoSociales({restaurarId:recorrido});Object.assign(ediciones.api.referencias,ediciones.api.crearTextosAcademicos());}
 restaurarActual('Matemáticas',preparacion,'../../cursos/6to/mates/preparacion-problemas/','ensayo');boton.click();await ediciones.hasta(()=>entro);
 restaurarActual('Sociales',repaso,'../../cursos/6to/sociales/preparacion-primera-evaluacion/','publicidad');boton.click();await ediciones.hasta(()=>ediciones.$('temaCatalogoAcademico').value===repaso);liberarEdicion();await settle();await settle();assert.deepEqual(ediciones.visibles(),['campoRecorridoSociales']);assert.equal(ediciones.$('recorridoSociales').value,'publicidad');assert.equal(ediciones.api.recogerFormulario().criterioCumplimiento.filtros.recorridoId,'publicidad');
 console.log('PASS DOM: transiciones local/Pages, criterio real de Gaudem/ensayo/Sociales/ordinarios, resumen/título/objetivo/preview, curso/materia, edición/restauración, consulta, textos personalizados, carga tardía descartada y manual sin filtros ajenos.');
})().catch(e=>{console.error(e);process.exitCode=1;});
