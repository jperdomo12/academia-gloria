const $ = id => document.getElementById(id);
let slides = [];
let currentIndex = 0;

const GUACAMAYA_POSADA = "../assets/identidad/guacamayas/guacamaya-azul-posada-01.png";
const GUACAMAYA_VOLANDO = "../assets/identidad/guacamayas/guacamaya-azul-posada-02.png";

function decorarAcademiaDeUnVistazo(){
  const hero = document.querySelector(".overview-hero");
  if(!hero || hero.querySelector(".overview-girl")) return;

  const copy = hero.firstElementChild;
  if(copy) copy.classList.add("overview-hero-copy");

  if(!document.getElementById("overviewGirlStyles")){
    const style = document.createElement("style");
    style.id = "overviewGirlStyles";
    style.textContent = `
      .overview-hero{
        grid-template-columns:minmax(145px,.34fr) minmax(0,1fr) auto;
      }
      .overview-hero-copy{
        text-align:center;
      }
      .overview-girl{
        min-width:0;
        display:flex;
        align-items:flex-end;
        justify-content:center;
        align-self:stretch;
      }
      .overview-girl svg{
        width:min(182px,100%);
        height:auto;
        align-self:end;
        filter:drop-shadow(0 12px 18px rgba(15,23,42,.14));
      }
      @media(max-width:1100px){
        .overview-hero{
          grid-template-columns:125px minmax(0,1fr) auto;
          gap:16px;
        }
        .overview-girl svg{width:138px}
      }
      @media(max-width:820px){
        .overview-hero{grid-template-columns:1fr}
        .overview-girl{align-self:auto}
        .overview-girl svg{width:150px}
      }
      @media(max-width:520px){
        .overview-girl svg{width:132px}
      }
    `;
    document.head.appendChild(style);
  }

  const girl = document.createElement("div");
  girl.className = "overview-girl";
  girl.setAttribute("aria-hidden", "true");
  girl.innerHTML = `
    <svg viewBox="0 0 240 190" xmlns="http://www.w3.org/2000/svg" focusable="false">
      <defs>
        <linearGradient id="gloriaShirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#c084fc"/>
          <stop offset="1" stop-color="#7c3aed"/>
        </linearGradient>
      </defs>
      <g opacity=".9">
        <ellipse cx="196" cy="48" rx="10" ry="29" fill="#cde6a7" transform="rotate(-14 196 48)"/>
        <ellipse cx="214" cy="53" rx="10" ry="31" fill="#9fd17f" transform="rotate(25 214 53)"/>
        <ellipse cx="228" cy="68" rx="8" ry="24" fill="#83bd73" transform="rotate(42 228 68)"/>
      </g>
      <g>
        <rect x="148" y="96" width="83" height="21" rx="6" fill="#f5b942" transform="rotate(-3 189 106)"/>
        <rect x="152" y="117" width="79" height="20" rx="6" fill="#ec5b87" transform="rotate(2 191 127)"/>
        <rect x="149" y="137" width="82" height="20" rx="6" fill="#34b6c8" transform="rotate(-2 190 147)"/>
        <rect x="155" y="157" width="76" height="20" rx="6" fill="#f4a83f"/>
        <text x="166" y="111" font-family="Outfit,Arial,sans-serif" font-size="10.5" font-weight="900" fill="#6d4b00">EXPLORA</text>
        <text x="166" y="132" font-family="Outfit,Arial,sans-serif" font-size="10.5" font-weight="900" fill="#fff">APRENDE</text>
        <text x="169" y="152" font-family="Outfit,Arial,sans-serif" font-size="10.5" font-weight="900" fill="#fff">CRECE</text>
        <text x="173" y="172" font-family="Outfit,Arial,sans-serif" font-size="10.5" font-weight="900" fill="#7c4b10">SUEÑA</text>
      </g>
      <g>
        <path d="M19 170C10 141 15 91 30 61 45 31 70 17 99 18c36 1 62 22 70 55 8 33 2 72-9 99z" fill="#241515"/>
        <path d="M34 155C22 133 23 97 36 71 45 52 59 39 77 31 61 58 55 91 62 122c4 17 10 31 19 43z" fill="#392220"/>
        <path d="M152 158c14-21 16-52 8-79-6-20-18-35-35-45 14 25 19 54 13 84-4 17-9 30-18 44z" fill="#392220"/>
        <ellipse cx="96" cy="83" rx="49" ry="52" fill="#d69a68"/>
        <path d="M50 80c5-35 25-55 50-57 30-2 51 17 58 48-15-14-31-19-48-16-17 3-31 13-42 28-7 8-14 8-18-3z" fill="#1f1212"/>
        <path d="M60 61c12-25 32-38 56-34 15 3 28 11 36 23-17-8-34-8-49-2-15 6-28 16-43 13z" fill="#34201f"/>
        <ellipse cx="78" cy="83" rx="8" ry="10" fill="#211414"/>
        <ellipse cx="116" cy="83" rx="8" ry="10" fill="#211414"/>
        <circle cx="81" cy="79" r="3" fill="#fff"/>
        <circle cx="119" cy="79" r="3" fill="#fff"/>
        <ellipse cx="65" cy="100" rx="9" ry="6" fill="#ef7f7a" opacity=".7"/>
        <ellipse cx="129" cy="100" rx="9" ry="6" fill="#ef7f7a" opacity=".7"/>
        <path d="M88 104c6 6 13 6 19 0" fill="none" stroke="#8a3f3a" stroke-width="3" stroke-linecap="round"/>
        <path d="M58 169c5-27 18-41 39-41 22 0 37 15 41 41z" fill="url(#gloriaShirt)"/>
        <path d="M61 156c-9-14-8-28 3-39" fill="none" stroke="#d69a68" stroke-width="12" stroke-linecap="round"/>
        <path d="M132 156c9-14 8-28-3-39" fill="none" stroke="#d69a68" stroke-width="12" stroke-linecap="round"/>
        <circle cx="65" cy="114" r="8" fill="#d69a68"/>
        <circle cx="128" cy="114" r="8" fill="#d69a68"/>
      </g>
      <path d="M20 42c-6-7-12-11-16-7-4 4 0 10 6 12 5 3 10 6 10 6s5-3 10-6c6-2 10-8 6-12-4-4-10 0-16 7z" fill="#fb7185"/>
    </svg>`;

  hero.insertBefore(girl, copy || null);
}

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
      <img class="guide-macaw one" src="${GUACAMAYA_POSADA}" alt="">
      <img class="guide-macaw two" src="${GUACAMAYA_VOLANDO}" alt="">
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

decorarAcademiaDeUnVistazo();

try{
  await loadSlides();
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