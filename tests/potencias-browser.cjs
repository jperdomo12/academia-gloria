/* Navegador real y código de producto; identidad y SDK externos simulados. */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const { crearEntorno } = require("./helpers/semillas-browser.cjs");
const base = process.env.BASE_URL || "http://127.0.0.1:8765";
const topic = "/cursos/6to/mates/potencias/";
const db = p => p.evaluate(() => JSON.parse(localStorage.qaDB));

(async () => {
  const browser = await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:["--no-sandbox","--disable-dev-shm-usage"]});
  try {
    const {p,errors} = await crearEntorno(browser,"alumno");
    await p.emulateMedia({reducedMotion:"reduce"});
    await p.goto(base+"/cursos/6to/mates/");
    for (const id of ["fracciones","numeros-hasta-100000","potencias"])
      await p.locator(`[data-tema-id="${id}"]`).waitFor();
    await p.locator('[data-tema-id="potencias"]').click();
    await p.waitForURL("**/potencias/**");
    const tab = name => p.locator(`[data-pestana="${name}"]`);
    await tab("claves").click();
    await p.locator("#panel-claves").getByText("Una potencia especial").click();
    await p.locator("#panel-claves").getByText(/Por eso 7⁰ = 1/).waitFor();
    await tab("material").click();
    await p.locator("#fichasPotencias summary").first().click();
    await p.getByText("El 6. Es la base.").waitFor();
    await tab("practica").click();
    await p.locator("#practicaOpciones [data-opcion='1']").click();
    await p.locator("#botonComprobar").click();
    await p.getByText(/Todavía no/).waitFor();
    await p.locator("#botonPista").click();
    await p.getByText("La base es el factor que se repite.",{exact:true}).waitFor();
    await p.locator("#practicaOpciones [data-opcion='0']").click();
    await p.locator("#botonComprobar").click();
    await p.locator("#botonSiguiente").waitFor();
    await p.locator("[data-nav-volver]").first().click();
    await p.waitForURL(/\/mates\/(index\.html)?(?:\?|$)/);

    await p.clock.setFixedTime(new Date("2026-11-03T12:00:00Z"));
    await p.goto(base+"/cursos/6to/plan-semanal/");
    const weekly = p.locator(".plan-tarjeta",{hasText:"Potencias · ANS"});
    await weekly.waitFor();
    assert.match(await p.locator("section.plan-semana .plan-fecha").innerText(), /2.*9.*noviembre.*2026/);
    await p.locator("details.plan-semana").evaluateAll(es=>es.forEach(e=>e.open=true));
    await p.getByRole("link",{name:/Irregular Verbs RAP/}).waitFor();
    await p.getByRole("link",{name:/El viaje de la nutrición/}).waitFor();
    await weekly.click();
    await p.locator("#panel-plan-semanal").waitFor();
    assert.equal(new URL(p.url()).hash,"#plan-semanal");
    assert.equal(await p.locator("[data-ejercicio]").count(),9);
    const open = async n => {
      const e=p.locator(`[data-ejercicio="${n}"]`);
      await e.locator(":scope > summary").click();
      return e;
    };
    const row=e=>e.locator("form:visible");
    const fill=async(e,values)=>{
      const fields=row(e).locator("input:not([type=checkbox]):enabled,textarea,select");
      for(let i=0;i<values.length;i++) {
        const f=fields.nth(i);
        if(await f.evaluate(x=>x.tagName)==="SELECT") await f.selectOption(values[i]);
        else await f.fill(values[i]);
      }
      await row(e).locator("[type=submit]").click();
      const abierta=await e.getAttribute("data-ejercicio")==="2";
      const mensaje=row(e).locator("[role=status]");
      assert.equal(await mensaje.getAttribute("data-correcta"),abierta ? null : "true");
      if(abierta) assert.match(await mensaje.innerText(),/Revisa tu idea/);
    };
    const solve = async(n,values,labels) => {
      const e=await open(n);
      assert.equal(await e.locator("form").count(),values.length);
      if(labels) assert.deepEqual(await e.locator("form h3").allTextContents(),labels);
      if(n===8) assert.deepEqual(await e.locator(".dato-ans b").allTextContents(),["2⁴","Siete elevado a nueve","6 × 6 × 6 × 6","Cinco al cubo","10 × 10"]);
      for(let j=0;j<values.length;j++){
        if(n===3 && j===2){
          const ayuda=row(e).locator("details.ayuda-ans");
          assert.equal(await ayuda.getAttribute("open"),null);
          await ayuda.locator("summary").click();
          await ayuda.getByText(/Por eso 7⁰ = 1/).waitFor();
        }
        await fill(e,values[j]);
        if(j<values.length-1)await e.getByRole("button",{name:/Siguiente apartado/}).click();
      }
      await e.locator("summary").first().click();
    };
    await solve(1,[["Base","El dos se repite","Exponente","Hay siete factores"]],["2⁷"]);
    await solve(2,[["El mismo factor aparece varias veces","3²"]]);
    await solve(3,[["2x2x2x2","16"],["5*5","25"],["sin factores","1"],["3×3×3×3×3","243"],["6×6×6","216"],[Array(8).fill(10).join("x"),"100 000 000"]],["2⁴","5²","7⁰","3⁵","6³","10⁸"]);
    await solve(4,[["8^6"],["6²"],["4^8"],["5³"]],["8 × 8 × 8 × 8 × 8 × 8","6 × 6","4 × 4 × 4 × 4 × 4 × 4 × 4 × 4","5 × 5 × 5"]);
    await solve(5,[["ocho elevado a seis"],["seis al cuadrado"],["cuatro elevado a 8"],["5 al cubo"]]);
    await solve(6,[["no"],["si","12^3"],["no"],["si","3²"],["si","9^4"],["no"]],["5 + 5","12 × 12 × 12","8 - 8 - 8 - 8","3 × 3","9 × 9 × 9 × 9","10 + 10 + 10"]);
    const matching=await open(7);
    for (const [i,answers] of [[0,[2]],[1,[0,3]],[2,[1]]]) {
      const current=row(matching);
      if(i===1){
        await current.locator('input[value="0"]').check();
        await current.locator("[type=submit]").click();
        assert.equal(await current.locator("[role=status]").getAttribute("data-correcta"),"false");
      }
      for (const answer of answers) await current.locator(`input[value="${answer}"]`).check();
      await current.locator("[type=submit]").click();
      assert.equal(await current.locator("[role=status]").getAttribute("data-correcta"),"true");
      if(i<2)await matching.getByRole("button",{name:/Siguiente apartado/}).click();
    }
    await matching.locator("summary").click();
    await solve(8,[["2x2x2x2","dos elevado a cuatro"],["7^9",Array(9).fill(7).join("x")],["6^4","seis elevado a cuatro"],["5^3","5x5x5"],["10²","diez elevado a dos"]]);
    await solve(9,[["1000","4000"],["100","1200"],["100000","4500000"],["10000000000","10000000000"],["10000","50000"],["1000000000","2000000000"]],["4 × 10³","12 × 10²","45 × 10⁵","1 × 10¹⁰","5 × 10⁴","2 × 10⁹"]);
    assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
    for(const width of [320,390,768,1024,1440]) {
      await p.setViewportSize({width,height:850});
      for(const panel of ["mapa","claves","material","practica","prueba","plan-semanal"]){
        await tab(panel).focus();
        await p.keyboard.press("Enter");
        await p.locator(`[data-panel="${panel}"]`).waitFor();
        assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${panel}: ${width}`);
        if(process.env.QA_IMAGES && ["mapa","plan-semanal"].includes(panel))
          await p.screenshot({path:`${process.env.QA_IMAGES}/${panel}-${width}.png`});
      }
    }
    await p.locator("[data-nav-volver]").first().click();
    await p.waitForURL(/\/plan-semanal\/(index\.html)?(?:\?|$)/);
    await p.evaluate(()=>{
      const d=JSON.parse(localStorage.qaDB);
      d["usuarios/alumno/tareas/mision-potencias"]={
        titulo:"Potencias",tipo:"repaso_academico",modulo:"libre",estado:"pendiente",visibleParaAlumno:true,
        cursoReferencia:"6.º",materia:"Matemáticas",tema:"Potencias",recursoAcademicoUrl:"../../cursos/6to/mates/potencias/",
        criterioCumplimiento:{tipo:"cantidad",modulo:"libre",evidenciaTipo:"sesion_academica",cantidadObjetivo:1},
        progreso:{cantidadActual:0,cantidadObjetivo:1}
      };
      localStorage.qaDB=JSON.stringify(d);
    });
    await p.goto(base+topic+"?misionId=mision-potencias");
    await p.waitForFunction(()=>document.querySelector("#tituloModo").textContent==="Sesión de aprendizaje");
    await tab("prueba").click();
    await p.locator("#botonIniciarPrueba").click();
    for(let i=0;i<9;i++){
      await p.locator(`#pruebaOpciones [data-opcion="${i<2 ? 1 : 0}"]`).click();
      await p.locator("#botonResponderPrueba").click();
      await p.locator("#explicacionPrueba").waitFor();
      await p.locator("#botonResponderPrueba").click();
    }
    await p.waitForFunction(()=>JSON.parse(localStorage.qaDB)["usuarios/alumno/tareas/mision-potencias"].estado==="pendiente_validacion");
    const rows=await db(p);
    const sesiones=Object.entries(rows).filter(([k,v])=>k.includes("/sesionesAcademicas/")&&v.actividadId==="6-mates-potencias");
    assert.equal(sesiones.length,1);
    assert.equal(sesiones[0][1].respuestas.length,9);
    assert.ok(Object.entries(rows).some(([k,v])=>k.includes("/evidencias/")&&v.misionId==="mision-potencias"));
    await p.goto(base+"/mi-universo/mis-tareas/trabajo-realizado.html?misionId=mision-potencias");
    await p.waitForFunction(()=>document.querySelector("#listaEvidencias")?.textContent.includes("Potencias"));
    await p.goto(base+"/mi-universo/mis-tareas/resultado-academico.html?sesionId="+sesiones[0][0].split("/").at(-1));
    await p.waitForFunction(()=>document.querySelector("#tituloActividad")?.textContent.includes("Potencias"));
    const familiar=await crearEntorno(browser,"gestion");
    await familiar.p.goto(base+"/mi-universo/mis-tareas/");
    await familiar.p.evaluate(entries => {
      localStorage.qaDB=JSON.stringify({...JSON.parse(localStorage.qaDB),...Object.fromEntries(entries)});
    },sesiones);
    await familiar.p.reload();
    await familiar.p.locator('[data-tab="refuerzos"]').click();
    await familiar.p.waitForFunction(()=>document.querySelector("#grupoRefuerzoAcademico")?.textContent.includes("Potencias"));
    await familiar.p.locator('[data-tab="crear"]').click();
    await familiar.p.selectOption("#tipo","repaso_academico");
    await familiar.p.selectOption("#cursoReferencia","6");
    await familiar.p.waitForFunction(()=>[...document.querySelector("#materiaCatalogoAcademico").options].some(o=>o.text==="Matemáticas"));
    await familiar.p.selectOption("#materiaCatalogoAcademico",{label:"Matemáticas"});
    await familiar.p.waitForFunction(()=>[...document.querySelector("#temaCatalogoAcademico").options].some(o=>o.text==="Potencias"));
    await familiar.p.selectOption("#temaCatalogoAcademico",{label:"Potencias"});
    assert.match(await familiar.p.locator("#recursoAcademicoUrl").inputValue(),/mates\/potencias\//);
    await familiar.p.goto(base+"/mi-universo/consulta-educativa/");
    await familiar.p.waitForFunction(()=>document.querySelector("#analisisResultado")?.textContent.includes("Potencias"));
    assert.deepEqual(familiar.errors,[]);
    assert.deepEqual(errors,[]);
    console.log("OK Potencias: nueve ejercicios y subapartados, equivalencia múltiple, lectura flexible, práctica y reintento, retorno, cinco anchos y teclado, sesión/evidencia/Misión y resultado.");
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
