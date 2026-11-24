// Navegador nativo + formulario/CSS reales; identidad/SDK controlados, sin usuarios ni datos reales.
const {chromium}=require('playwright'),assert=require('node:assert/strict');
const {crearEntorno}=require('./helpers/semillas-browser.cjs');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
  const {p,c,errors}=await crearEntorno(b,'gestion');await p.goto(process.env.BASE_URL+'/mi-universo/mis-tareas/?vista=crear');
  await p.locator('#tipo').selectOption('repaso_academico');await p.locator('#cursoReferencia').selectOption('6');
  const seleccionarMateria=async nombre=>{await p.locator('#materiaCatalogoAcademico:not(:disabled)').selectOption({label:nombre});await p.locator('#temaCatalogoAcademico:not(:disabled)').waitFor();};
  const seleccionarTema=async titulo=>{await p.locator('#temaCatalogoAcademico').selectOption({label:titulo});await p.waitForFunction(t=>document.getElementById('tema').value===t,titulo);};
  async function visibilidad(mates,sociales){
   await p.waitForFunction(([m,s])=>document.getElementById('campoRecorridoMates').hidden===!m&&document.getElementById('campoRecorridoSociales').hidden===!s,[mates,sociales]);
   for(const [id,visible]of [['campoRecorridoMates',mates],['campoRecorridoSociales',sociales]]){assert.equal(await p.locator('#'+id).isVisible(),visible);assert.equal(await p.locator('#'+id).evaluate(n=>getComputedStyle(n).display==='none'),!visible);}
  }
  for(const width of [320,390,768,1024,1440]){
   await p.setViewportSize({width,height:1000});await seleccionarMateria('Matemáticas');await seleccionarTema('Me preparo para los problemas');await visibilidad(true,false);
   await p.locator('#recorridoMates').selectOption('ensayo');await p.waitForFunction(()=>document.getElementById('criterio').value.includes('dos bloques distintos'));
   await seleccionarTema('Puente de 5.º a 6.º');await visibilidad(false,false);assert.doesNotMatch(await p.locator('#resumenAcademico').innerText(),/Gaudem|Sociales/);assert.match(await p.locator('#previewTitulo').innerText(),/Puente/);assert.doesNotMatch(await p.locator('#criterio').inputValue(),/Gaudem|bloques/);
   assert.equal(await p.locator('#recorridoMates').evaluate(n=>n.checkValidity()),true);assert.equal(await p.locator('#recorridoSociales').evaluate(n=>n.checkValidity()),true);
   if(process.env.QA_IMAGES)await p.screenshot({path:process.env.QA_IMAGES+'/puente-'+width+'.png',fullPage:true});
   await seleccionarMateria('Sociales');await seleccionarTema('Me preparo para Sociales · Primera evaluación');await visibilidad(false,true);await seleccionarTema('Los impuestos');await visibilidad(false,false);
   await seleccionarTema('Me preparo para Sociales · Primera evaluación');await visibilidad(false,true);
   await p.locator('#cursoReferencia').selectOption('5');await visibilidad(false,false);await p.locator('#cursoReferencia').selectOption('6');
  }
  assert.deepEqual(errors,[]);assert.equal(await p.evaluate(()=>window.qaWrites||0),0);await c.close();
  console.log('PASS navegador: computed display/hidden reales, cinco anchos, recorridos mutuamente excluyentes, Puente/ordinarios, resumen/título/criterio/preview y cambio de curso sin escrituras.');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
