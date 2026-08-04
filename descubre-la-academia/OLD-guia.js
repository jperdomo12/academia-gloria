import { auth } from "../compartido/firebase/firebase-config.js";
import { iniciarPanelUsuario } from "../compartido/js/panel-usuario.js";

const $ = id => document.getElementById(id);
let slides = [];
let currentIndex = 0;

function obtenerBaseAcademia() {
  return window.location.hostname.endsWith("github.io")
    ? "/academia-gloria"
    : "";
}

function safeReturnUrl(){
  const baseAcademia = obtenerBaseAcademia();
  const fallback = baseAcademia || "/";
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("volver");

  if(!requested) return fallback;

  try{
    const url = new URL(requested, window.location.origin);
    if(url.origin !== window.location.origin) return fallback;

    let path = `${url.pathname}${url.search}${url.hash}`;

    if(!baseAcademia && path.startsWith("/academia-gloria/")){
      path = path.replace(/^\/academia-gloria/, "") || "/";
    }

    if(baseAcademia && !path.startsWith(`${baseAcademia}/`) && path !== baseAcademia){
      path = `${baseAcademia}${path.startsWith("/") ? path : `/${path}`}`;
    }

    return path || fallback;
  }catch{
    return fallback;
  }
}

const returnUrl = safeReturnUrl();

async function initializeUserPanel(){
  try{
    await auth.authStateReady();

    if(auth.currentUser){
      await iniciarPanelUsuario({
        contenedor:"[data-panel-usuario]",
        loginUrl:"/academia-gloria/login.html",
        mostrarPerfil:false
      });
    }else{
      document.querySelector("[data-panel-usuario]")?.remove();
    }
  }catch(error){
    console.warn("No fue posible iniciar el Panel de Usuario.", error);
    document.querySelector("[data-panel-usuario]")?.remove();
  }
}

async function loadSlides(){
  const response = await fetch("./contenido.json", {cache:"no-store"});
  if(!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.json();
  if(!Array.isArray(data) || data.length === 0){
    throw new Error("La guía no contiene secciones.");
  }

  slides = data;
}

function esc(value=""){
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[c]);
}

function renderVisual(slide){
  if(slide.visualType === "macaws"){
    return `<div class="guide-macaws" aria-hidden="true">
      <img class="guide-macaw one" src="../assets/identidad/guacamayas/guacamaya-azul-posada-01.png" alt="">
      <img class="guide-macaw two" src="../assets/identidad/guacamayas/guacamaya-azul-posada-02.png" alt="">
    </div>`;
  }

  if(slide.visualType === "icon"){
    return `<div class="guide-main-icon" aria-hidden="true">${esc(slide.icon)}</div>`;
  }

  if(slide.visualType === "image"){
    return `<img class="guide-image" src="${esc(slide.image)}" alt="${esc(slide.imageAlt || "")}">`;
  }

  return "";
}

function renderItems(slide){
  if(!Array.isArray(slide.items)) return "";

  return `<div class="guide-grid">${slide.items.map(item => `
    <div class="guide-item">
      <strong>${esc(item.icon)} ${esc(item.title)}</strong>
      <span>${esc(item.text)}</span>
    </div>`).join("")}</div>`;
}

function renderFlow(slide){
  if(!Array.isArray(slide.flow)) return "";

  return `<div class="guide-flow">${slide.flow.map((item,index) => `
    <span class="guide-flow__item">${esc(item)}</span>
    ${index < slide.flow.length - 1 ? '<span class="guide-flow__arrow">→</span>' : ""}
  `).join("")}</div>`;
}

function renderNetwork(slide){
  if(!Array.isArray(slide.roles)) return "";

  return `<div class="guide-network">${slide.roles.map(role => `
    <div class="guide-role ${role.includes("El alumno") ? "center" : ""}">
      ${esc(role)}
    </div>`).join("")}</div>`;
}

function renderDots(){
  const container = $("dotNavigation");
  container.innerHTML = "";

  slides.forEach((slide,index) => {
    const button = document.createElement("button");
    button.className = `guide-dot ${index === currentIndex ? "active" : ""}`;
    button.type = "button";
    button.setAttribute("aria-label", `Ir a ${slide.title}`);
    button.onclick = () => {
      currentIndex = index;
      render();
    };
    container.appendChild(button);
  });
}

function render(){
  const slide = slides[currentIndex];
  const center = slide.layout === "center" ? "guide-card--center" : "";

  $("slideContent").innerHTML = `
    <section class="guide-card ${center}" style="
      --accent:${esc(slide.accent || "#7c3aed")};
      --accent-soft:${esc(slide.accentSoft || "#ddd6fe")};
      --card-bg:${esc(slide.background || "linear-gradient(145deg,#fff,#faf5ff)")};
    ">
      <div class="guide-copy">
        <div class="guide-eyebrow">${esc(slide.eyebrow || "")}</div>
        <h1 id="guideTitle" class="guide-title">${esc(slide.title)}</h1>
        <p class="guide-subtitle">${esc(slide.subtitle || "")}</p>
        <p class="guide-text">${esc(slide.text || "")}</p>
        ${renderItems(slide)}
        ${renderFlow(slide)}
        ${renderNetwork(slide)}
        ${slide.highlight ? `<div class="guide-highlight">${esc(slide.highlight)}</div>` : ""}
      </div>
      ${slide.layout !== "center" ? `<div class="guide-visual">${renderVisual(slide)}</div>` : ""}
    </section>`;

  $("slideCounter").textContent = `${currentIndex + 1} de ${slides.length}`;
  $("progressBar").style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
  $("previousButton").disabled = currentIndex === 0;

  const isLast = currentIndex === slides.length - 1;
  $("nextButton").textContent = isLast
    ? slide.finalButton || "🌈 Volver a la Academia"
    : "Siguiente →";

  renderDots();
  $("slideContent").focus({preventScroll:true});
}

function goBack(){
  window.location.href = returnUrl;
}

$("backButton").onclick = goBack;

$("previousButton").onclick = () => {
  if(currentIndex === 0) return;
  currentIndex -= 1;
  render();
};

$("nextButton").onclick = () => {
  if(currentIndex === slides.length - 1){
    goBack();
    return;
  }

  currentIndex += 1;
  render();
};

document.addEventListener("keydown", event => {
  if(event.key === "ArrowRight") $("nextButton").click();
  if(event.key === "ArrowLeft" && currentIndex > 0) $("previousButton").click();
  if(event.key === "Escape") goBack();
});

try{
  await Promise.all([initializeUserPanel(), loadSlides()]);
  render();
}catch(error){
  console.error(error);
  $("slideContent").innerHTML = `
    <section class="guide-card guide-card--center">
      <div class="guide-copy">
        <div class="guide-main-icon">🦜</div>
        <h1 class="guide-title">No pudimos abrir la guía</h1>
        <p class="guide-text">Revisa que contenido.json esté en la misma carpeta.</p>
        <div class="guide-highlight">La Academia sigue aquí. Puedes volver e intentarlo nuevamente.</div>
      </div>
    </section>`;

  $("previousButton").disabled = true;
  $("nextButton").textContent = "← Volver";
  $("nextButton").onclick = goBack;
}