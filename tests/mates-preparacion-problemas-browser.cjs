// UI, Motor, contexto y lector reales; SDK/identidad y salida de voz controlados.
const {chromium}=require("playwright");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {crearEntorno}=require("./helpers/semillas-browser.cjs");
const bank=JSON.parse(fs.readFileSync("cursos/6to/mates/preparacion-problemas/problemas.json","utf8"));
const path="/cursos/6to/mates/preparacion-problemas/";
const opciones={doble:[0,1],suma:[1,0],reparto:[0,1],grupos:[1,2],comparacion:[1,1]};
const valores=p=>p.tipo==="suma"?[p.valores.reduce((s,n)=>s+n,0)]:p.tipo==="doble"?[p.a*2]:p.tipo==="grupos"?[p.a*p.b]:p.tipo==="reparto"?[Math.floor(p.a/p.b),p.a%p.b]:
  [p.relacion==="mas"?p.a+p.b:p.a-p.b,p.preguntaFinal==="restante"?p.presupuesto-(p.a+p.b):p.a+(p.relacion==="mas"?p.a+p.b:p.a-p.b)];
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:["--no-sandbox","--disable-dev-shm-usage"]});
  try{
    const {p,c,errors}=await crearEntorno(b,"alumno");
    p.on("console",m=>{if(m.type()==="error")errors.push(m.text());});
    if(process.env.QA_FONT_CSS)await p.route("https://fonts.googleapis.com/**",r=>r.fulfill({body:fs.readFileSync(process.env.QA_FONT_CSS,"utf8"),contentType:"text/css"}));
    await p.addInitScript(()=>{
      window.qaSpoken=[];
      window.SpeechSynthesisUtterance=class extends EventTarget{constructor(text){super();this.text=text;}};
      Object.defineProperty(window,"speechSynthesis",{value:{speak(u){qaSpoken.push(u.text);},cancel(){},getVoices(){return [];}}});
    });
    await Promise.all([p.waitForResponse(r=>r.url().endsWith("problemas.json")),p.goto(process.env.BASE_URL+path)]);
    await p.waitForFunction(()=>document.querySelector('[data-iniciar="ensayo"]')&&!document.querySelector('[data-iniciar="ensayo"]').disabled);
    // Esperar a que el banco haya terminado de cargar, no solo al HTML.

    assert.match(await p.locator(".portada").innerText(),/26 de noviembre/i);
    const storage=()=>p.evaluate(()=>JSON.stringify({local:{...localStorage},session:{...sessionStorage}}));
    const before=await storage();
    const accesoOperaciones=p.getByRole("link",{name:"Ir a Matezona de operaciones"});
    assert.equal(await accesoOperaciones.getAttribute("target"),"academia-matezona-operaciones");
    assert.equal(await accesoOperaciones.getAttribute("rel"),"opener");
    assert.match(await accesoOperaciones.getAttribute("href"),/zonas\/matezonas\/dale-al-coco-zonas-1\//);
    // Solo se simula el destino de la ventana auxiliar; la navegación de origen es real.
    await c.route("**/zonas/matezonas/dale-al-coco-zonas-1/**",r=>r.fulfill({contentType:"text/html",body:'<!doctype html><html lang="es"><title>Destino de navegación controlado</title><p>Matezonas · destino simulado para comprobar apertura y Persona Activa.</p></html>'}));

    async function shot(name){if(process.env.QA_IMAGES)await p.locator("#actividad").screenshot({path:process.env.QA_IMAGES+"/"+name+".png"});}
    async function progreso(total,bloque,indice){
      assert.equal(await p.locator("#contadorVuelta").innerText(),total+" de 20 problemas completados");
      assert.equal(await p.locator("#totalVuelta").getAttribute("aria-valuenow"),String(total));
      assert.equal(await p.locator("#bloqueActual").innerText(),"Bloque "+bloque+" de 4");
      assert.match(await p.locator("#pasoActual").innerText(),new RegExp("Problema "+indice+" de 5"));
    }
    async function resolver(problem,{total=null,bloque=1,indice=1,visual=false,pausa=false}={}){
      const respuestas=problem.pregunta?[problem.correcta]:[...opciones[problem.tipo],...valores(problem)];
      if(total!==null)await progreso(total,bloque,indice);
      for(let fase=0;fase<respuestas.length;fase++){
        const numeric=!problem.pregunta&&fase>=2;
        if(visual&&fase===0){
          // Ni el diagrama ni la pista inicial revelan los resultados.
          if(problem.tipo==="comparacion")for(const n of valores(problem))assert.ok(!(await p.locator("#relacionVisual").innerText()).includes(n+" €"));
          for(const width of [320,390,768,1024,1280,1440]){
            await p.setViewportSize({width,height:950});await p.evaluate(()=>document.fonts.ready);
            assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),problem.id+" overflow "+width);
            await shot(problem.id+"-"+width);
          }
          await p.setViewportSize({width:1280,height:950});
          await p.locator("#escuchar").click();assert.ok((await p.evaluate(()=>qaSpoken.at(-1))).startsWith(problem.enunciado));
          await p.locator("#pista").click();assert.ok(await p.locator("#notaPista").isVisible());
          if(total!==null)await progreso(total,bloque,indice);
          // Error sin incremento ni bloqueo.
          await p.locator('input[name="respuesta"]').nth((respuestas[fase]+1)%3).check();
          await p.locator("#comprobar").click();assert.match(await p.locator("#mensaje").innerText(),/Todavía no encaja/);
          if(total!==null)await progreso(total,bloque,indice);
        }
        if(numeric)await p.locator("#numero").fill(String(respuestas[fase]));
        else await p.locator('input[name="respuesta"]').nth(respuestas[fase]).check();
        if(problem.id==="e5d"&&fase===3){
          for(const mal of [123,37,200-123-86]){
            await p.locator("#numero").fill(String(mal));await p.locator("#comprobar").click();
            assert.ok(await p.locator("#comprobar").isVisible());await progreso(total,bloque,indice);
          }
          await p.locator("#numero").fill("77");
        }
        await p.locator("#comprobar").click();
        assert.match(await p.locator("#mensaje").innerText(),/¡Bien razonado!/);
        assert.equal(await p.locator("#continuar").evaluate(e=>e===document.activeElement),true);
        if(total!==null)await progreso(total+(fase===respuestas.length-1?1:0),bloque,indice);
        if(pausa&&fase===1){
          const texto=await p.locator("#textoEnunciado").innerText();
          await p.locator("#volverInicio").click();
          assert.equal(await p.locator("#tituloInicio").evaluate(e=>e===document.activeElement),true);
          // Abrir operaciones deja intacta la visita y su punto de pausa.
          const urlOrigen=p.url();const sesionOrigen=await storage();
          await accesoOperaciones.focus();
          const [auxiliar]=await Promise.all([p.waitForEvent("popup"),p.keyboard.press("Enter")]);
          await auxiliar.waitForLoadState();assert.match(auxiliar.url(),/zonas\/matezonas\/dale-al-coco-zonas-1\//);
          assert.equal(await auxiliar.evaluate(()=>sessionStorage.getItem("academia.personaActivaId")),await p.evaluate(()=>sessionStorage.getItem("academia.personaActivaId")));
          assert.equal(p.url(),urlOrigen);assert.equal(await storage(),sesionOrigen);await auxiliar.close();await p.bringToFront();
          // Visitar otra ruta y reanudar la fase resuelta, sin generar otro plan.
          await p.locator('[data-iniciar="comprendo"]').click();await p.locator("#volverInicio").click();
          await p.locator('[data-iniciar="ensayo"]').click();
          assert.equal(await p.locator("#textoEnunciado").innerText(),texto);
          assert.ok(await p.locator("#continuar").isVisible());
          assert.equal(await p.locator('input[name="respuesta"]:checked').inputValue(),String(respuestas[fase]));
          await progreso(total,bloque,indice);
        }
        await p.locator("#continuar").click();
      }
    }
    // Cuatro microactividades y cinco escolares conservan su recorrido.
    await p.locator('[data-iniciar="comprendo"]').click();
    for(const problem of bank.calentamiento)await resolver(problem);
    assert.ok(await p.locator("#cierre").isVisible());await p.locator("#otraRuta").click();
    await p.locator('[data-iniciar="gaudem"]').click();
    for(const problem of bank.gaudem)await resolver(problem,{visual:problem.id==="g5"});
    assert.match(await p.locator("#resumenCierre").innerText(),/cinco problemas/);await p.locator("#otraRuta").click();
    const vueltas=[];
    for(let vuelta=0;vuelta<2;vuelta++){
      const vistos=[];
      if(vuelta===0)await p.locator('[data-iniciar="ensayo"]').click();
      for(let bloque=1;bloque<=4;bloque++){
        const familias=new Set();
        for(let indice=1;indice<=5;indice++){
          const texto=await p.locator("#textoEnunciado").innerText();
          const problem=bank.ensayos.find(x=>x.enunciado===texto);assert.ok(problem,texto);
          assert.ok(!vistos.includes(problem.id));vistos.push(problem.id);familias.add(problem.tipo);
          await resolver(problem,{total:(bloque-1)*5+indice-1,bloque,indice,visual:vuelta===0&&(problem.tipo==="comparacion"||problem.id==="e1c"),pausa:vuelta===0&&bloque===1&&indice===1});
        }
        assert.equal(familias.size,5);assert.ok(await p.locator("#cierre").isVisible());
        assert.match(await p.locator("#resumenCierre").innerText(),new RegExp(bloque*5+" de 20"));
        if(bloque<4){
          assert.equal(await p.locator("#repetir").innerText(),"Continuar con el bloque siguiente");
          await p.locator("#otraRuta").click();await p.locator('[data-iniciar="ensayo"]').click();
          assert.ok(await p.locator("#cierre").isVisible());
          await p.locator("#repetir").focus();await p.keyboard.press("Enter");
        }
      }
      assert.equal(new Set(vistos).size,20);vueltas.push(vistos);
      assert.equal(await p.locator("#repetir").innerText(),"Empezar otra vuelta");
      if(vuelta===0)await p.locator("#repetir").click();
    }
    assert.notDeepEqual(vueltas[0],vueltas[1]);
    for(const width of [320,390,768,1024,1280,1440]){
      await p.setViewportSize({width,height:950});
      assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),"cierre "+width);
      if(process.env.QA_IMAGES)await p.locator("#cierre").screenshot({path:process.env.QA_IMAGES+"/cierre-"+width+".png"});
      await p.locator("#otraRuta").click();
      assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),"inicio "+width);
      if(process.env.QA_IMAGES)await p.locator("#inicio").screenshot({path:process.env.QA_IMAGES+"/inicio-"+width+".png"});
      await p.locator('[data-iniciar="ensayo"]').click();assert.ok(await p.locator("#cierre").isVisible());
    }
    assert.equal(await storage(),before);assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
    // Nueva vuelta solo al finalizar las cuatro; recarga reinicia la visita.
    await Promise.all([p.waitForResponse(r=>r.url().endsWith("problemas.json")),p.reload()]);
    await p.locator('[data-iniciar="ensayo"]').click();await progreso(0,1,1);
    await p.emulateMedia({reducedMotion:"reduce"});
    assert.equal(await p.locator("#barraProgreso").evaluate(e=>getComputedStyle(e).transitionDuration),"0s");
    assert.deepEqual(errors,[]);
    await c.close();
    // Consulta relacionada reutiliza Persona Activa sin escrituras educativas.
    const relacionado=await crearEntorno(b,"consulta");
    await Promise.all([relacionado.p.waitForResponse(r=>r.url().endsWith("problemas.json")),relacionado.p.goto(process.env.BASE_URL+path)]);
    await relacionado.p.locator('[data-iniciar="ensayo"]').click();
    assert.ok(await relacionado.p.locator("#actividad").isVisible());
    assert.equal(await relacionado.p.evaluate(()=>window.qaWrites||0),0);
    assert.deepEqual(relacionado.errors,[]);await relacionado.c.close();
    console.log("PASS: 4 microactividades, 5 Gaudem, 2 vueltas de 20, comparación +/− y restante, errores/pistas/audio, pausa/reanudación, progreso, 6 anchos, teclado/foco/reduced motion, consulta y cero escrituras.");
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
