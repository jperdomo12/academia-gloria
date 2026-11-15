/* Real UI and navigation; controlled identity/SDK and speech. */
const {chromium}=require("playwright");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {crearEntorno}=require("./helpers/semillas-browser.cjs");
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:["--no-sandbox","--disable-dev-shm-usage"]});
  try{
    const {p,errors}=await crearEntorno(b,"alumno");
    if(process.env.QA_FONT_CSS) await p.route("https://fonts.googleapis.com/**",r=>r.fulfill({body:fs.readFileSync(process.env.QA_FONT_CSS,"utf8"),contentType:"text/css"}));
    await p.addInitScript(()=>{
      window.qaSpoken=[];
      window.SpeechSynthesisUtterance=class extends EventTarget{constructor(text){super();this.text=text;}};
      Object.defineProperty(window,"speechSynthesis",{value:{speak(u){qaSpoken.push(u.text);},cancel(){}}});
    });
    await p.goto(process.env.BASE_URL+"/cursos/6to/english/preparacion-noviembre/");
    await p.waitForFunction(()=>document.querySelector("#grupoVocab").options.length===7);
    await p.locator('[data-tab="vocab"]').click();
    const grupo=p.locator("#grupoVocab");
    assert.deepEqual(await grupo.locator("option").evaluateAll(es=>es.map(e=>e.value)),["body","body-picture","halloween","colours","numbers","school-objects","school-places"]);
    const bank=await p.evaluate(async()=> (await import("./preparacion-data.js")).ENGLISH_PREP_DATA.groups);
    const labels=(await p.locator("#pictureLabels text").allTextContents());
    assert.equal(new Set(labels).size,16);
    assert.ok(labels.every(label=>bank[0].words.some(w=>w.en.split(" / ")[0]===label)));
    const tarjetas=[];
    for(let i=0;i<3;i++){
      tarjetas.push(...await p.locator("#tarjetasVocab strong").allTextContents());
      if(i<2)await p.locator("#siguienteVocab").click();
    }
    assert.deepEqual(tarjetas,bank[0].words.map(w=>w.en));
    await p.locator("#tarjetasVocab [data-audio]").first().click();
    assert.equal(await p.evaluate(()=>qaSpoken.at(-1)),tarjetas[24]);
    await grupo.selectOption("body-picture");
    await p.locator("#bodyPicture").waitFor();
    assert.equal(await p.locator("#vocabTarjetas").isHidden(),true);
    assert.equal(await p.locator("#pictureCount").innerText(),"31");
    await p.locator(".picture-equivalent summary").click();
    assert.equal(await p.locator("#pictureWords li:visible").count(),16);
    for(const width of [320,390,768,1280,1440]){
      await p.setViewportSize({width,height:900});
      await p.evaluate(()=>document.fonts.ready);
      assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      assert.ok(await p.locator("#pictureLabels text").evaluateAll(es=>es.every(e=>{const b=e.getBBox();return b.x>=0 && b.x+b.width<=600;})));
      if(process.env.QA_IMAGES)await p.locator(".picture-figure").screenshot({path:process.env.QA_IMAGES+"/picture-"+width+".png"});
    }
    await p.setViewportSize({width:320,height:900});
    await p.locator("#ampliarPicture").focus();
    await p.keyboard.press("Enter");
    const viewport=p.locator("#pictureViewport");
    assert.ok(await viewport.evaluate(e=>e.scrollWidth>e.clientWidth&&e.tabIndex===0));
    assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await viewport.focus();
    await p.keyboard.press("ArrowRight");
    await p.waitForFunction(()=>document.querySelector("#pictureViewport").scrollLeft>0);
    await p.locator("#ampliarPicture").click();
    assert.equal(await viewport.evaluate(e=>e.scrollLeft),0);
    await p.locator("#retoGrupo").click();
    await p.locator("#retoPanel").waitFor();
    assert.equal(await p.locator("#retoProgreso").getAttribute("aria-valuemax"),"8");
    const enunciado=await p.locator("#retoEnunciado").innerText();
    assert.ok(bank[0].words.some(w=>enunciado.includes(w.en)),enunciado);
    await p.locator("#salirReto").click();
    await p.locator("#bodyPicture").waitFor();
    await p.locator("#volverTarjetas").click();
    assert.equal(await grupo.inputValue(),"body");
    assert.equal(await p.locator("#paginaVocab").innerText(),"Página 3 de 3");
    for(const group of bank.slice(1)){
      await grupo.selectOption(group.id);
      assert.equal(await p.locator("#bodyPicture").isHidden(),true);
      assert.deepEqual(await p.locator("#tarjetasVocab strong").allTextContents(),group.words.slice(0,12).map(w=>w.en));
    }
    assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
    assert.deepEqual(errors,[]);
    console.log("OK: 16 etiquetas, seis grupos, 31 tarjetas/audio, ampliación por teclado, reto de ocho de Body Parts, cinco anchos y cero escrituras.");
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
