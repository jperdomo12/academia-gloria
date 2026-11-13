/* Navegación, contexto y UI reales; identidad, SDK y voz controlados. */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { crearEntorno } = require("./helpers/semillas-browser.cjs");
const base = process.env.BASE_URL || "http://127.0.0.1:8765";
const portal = "/cursos/6to/lengua/";
const prep = portal + "preparacion-noviembre/";

(async () => {
  const b = await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:["--no-sandbox","--disable-dev-shm-usage"]});
  try {
    const { p, errors } = await crearEntorno(b,"alumno");
    await p.route("https://cdn.tailwindcss.com/**",r=>r.fulfill({body:"",contentType:"text/javascript"}));
    if(process.env.QA_FONT_CSS) await p.route("https://fonts.googleapis.com/**",r=>r.fulfill({body:fs.readFileSync(process.env.QA_FONT_CSS,"utf8"),contentType:"text/css"}));
    await p.addInitScript(()=>{
      window.qaSpoken=[];
      window.SpeechSynthesisUtterance=class extends EventTarget {constructor(text){super();this.text=text;}};
      Object.defineProperty(window,"speechSynthesis",{value:{
        speak(u){qaSpoken.push(u.text);window.qaUtterance=u;},
        cancel(){window.qaCancelled=(window.qaCancelled||0)+1;}
      },configurable:true});
    });
    await p.emulateMedia({reducedMotion:"reduce"});
    await p.goto(base+portal);
    await p.locator('[data-tema-id="el-verbo"]').waitFor();
    assert.equal(await p.locator("[data-tema-id]").count(),4);
    await p.getByRole("link",{name:"Elegir qué preparar →"}).click();
    await p.locator("#recorridos").waitFor();
    assert.deepEqual(await p.locator(".examenes time").evaluateAll(es=>es.map(e=>e.dateTime)),["2026-11-16","2026-11-18"]);
    const persona=await p.evaluate(()=>sessionStorage.getItem("academia.personaActivaId"));
    const before=await p.evaluate(()=>localStorage.qaDB);
    const elegir=async id=>{
      const tarjeta=p.locator(`.examenes a[href="#${id}"]`);
      await tarjeta.focus();
      await p.keyboard.press("Enter");
      await p.locator("#"+id).waitFor();
      await p.waitForFunction(()=>document.activeElement.tagName==="H2");
      assert.equal(await p.locator("[data-recorrido]:visible").count(),1);
    };
    await elegir("expresion");
    assert.equal(await p.locator("#expresion .pasos > li").count(),4);
    await p.getByText("Si escribo un diálogo",{exact:true}).click();
    await p.getByText(/Ordena las intervenciones/).waitFor();
    await p.locator("#expresion input").first().check();
    await elegir("comprension");
    assert.equal(await p.locator(".ficha .pasos > li").count(),4);
    assert.equal(await p.locator("#ejemplos").isHidden(),true);
    await p.locator("#escuchar").click();
    assert.match(await p.evaluate(()=>qaSpoken.at(-1)),/El banco del patio/);
    await p.evaluate(()=>qaUtterance.dispatchEvent(new Event("error")));
    await p.getByText(/No se pudo leer en voz alta/).waitFor();
    await p.locator("#escuchar").click();
    await p.locator("#escuchar").click();
    assert.match(await p.locator("#escuchar").innerText(),/Escuchar/);
    await p.locator("#repasoPreguntas button[type=submit]").click();
    await p.getByText("Elige una respuesta antes de comprobar.").waitFor();
    await p.locator("#repasoPreguntas summary").click();
    await p.getByText("Relee el primer párrafo.").waitFor();
    await p.locator('#repasoPreguntas input[value="0"]').check();
    await p.locator("#repasoPreguntas button[type=submit]").click();
    await p.getByText(/Aún no.*Puedes volver/).waitFor();
    for(const [id,claves] of [["encuentro",[1,2,0]],["repasoPreguntas",[1,0,2,1,0,2]]]){
      for(const clave of claves){
        await p.locator(`#${id} input[value="${clave}"]`).check();
        await p.locator(`#${id} button[type=submit]`).click();
        await p.locator(`#${id} [data-siguiente]`).click();
      }
      await p.locator(`#${id}`).getByRole("button",{name:"Volver a practicar"}).click();
    }
    await p.locator("#tablaPractica button").click();
    assert.equal(await p.locator('#tablaPractica [aria-invalid="true"]').count(),6);
    for(const [i,valor] of ["moviendo","movido","regar","regado","dibujar","dibujando"].entries())
      await p.locator("#tablaPractica input").nth(i).fill(valor);
    await p.locator("#tablaPractica button").click();
    await p.getByText(/Las tres filas están completas/).waitFor();
    assert.equal(await p.locator("#tablaPractica .encontrada").count(),3);
    assert.deepEqual(await p.locator("#tablaPractica th").allTextContents(),["Infinitivo","Gerundio","Participio"]);
    await p.locator("#mostrarEjemplos").click();
    await p.getByText(/he mirado, hemos aprendido, habían compartido/).waitFor();
    for(const width of [320,390,1280,1440]){
      await p.setViewportSize({width,height:900});
      await p.evaluate(()=>document.fonts.ready);
      for(const id of ["expresion","comprension"]){
        await elegir(id);
        assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${id} ${width}`);
      }
      if(process.env.QA_IMAGES) await p.locator("#tablaPractica").screenshot({path:`${process.env.QA_IMAGES}/tabla-${width}.png`});
    }
    assert.equal(await p.locator("#expresion input").first().isChecked(),true);
    assert.equal(await p.evaluate(()=>localStorage.qaDB),before);
    assert.equal(await p.evaluate(()=>window.qaWrites||0),0);
    const links=await p.locator("[data-recurso]").evaluateAll(es=>es.map(e=>({id:e.closest("[data-recorrido]").id,path:new URL(e.href).pathname})));
    assert.equal(new Set(links.map(e=>e.path)).size,9);
    for(const {id,path} of [...new Map(links.map(e=>[e.path,e])).values()]){
      await elegir(id);
      await p.locator("[data-recurso]").filter({visible:true}).evaluateAll((es,path)=>{
        const a=es.find(e=>new URL(e.href).pathname===path);
        if(!a)throw Error("No se encuentra "+path);
        a.click();
      },path);
      await p.waitForURL(url=>url.pathname===path);
      assert.match(new URL(p.url()).searchParams.get("volver"),new RegExp(prep+"#"+id+"$"));
      await p.locator("[data-nav-volver]").first().click();
      await p.waitForURL(url=>url.pathname===prep && url.hash==="#"+id);
      await p.locator("#"+id).waitFor();
      assert.equal(await p.evaluate(()=>sessionStorage.getItem("academia.personaActivaId")),persona);
    }
    await p.locator("[data-nav-volver]").first().click();
    await p.waitForURL(url=>url.pathname===portal || url.pathname===portal+"index.html");
    assert.deepEqual(errors,[]);
    const adulto=await crearEntorno(b,"consulta");
    await adulto.p.addInitScript(()=>Object.defineProperty(window,"speechSynthesis",{value:undefined,configurable:true}));
    await adulto.p.goto(base+prep+"?modo=vista_previa#comprension");
    await adulto.p.getByText(/La lectura en voz alta no está disponible/).waitFor();
    assert.ok(await adulto.p.locator("#escuchar").isDisabled());
    await adulto.p.locator("#mostrarEjemplos").click();
    assert.equal(await adulto.p.evaluate(()=>window.qaWrites||0),0);
    assert.deepEqual(adulto.errors,[]);
    console.log("OK Lengua: dos exámenes, cuatro tareas, 9 destinos y retornos, texto original, tabla, voz/error, reintentos, teclado/foco, 320/390/1280/1440 y cero escrituras.");
  } finally {await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
