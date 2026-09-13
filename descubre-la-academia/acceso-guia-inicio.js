/* ==========================================================
   Academia Gloria Valentina
   Acceso compacto a la Guía rápida desde Inicio

   Visible para cualquier usuario de Academia. Se mantiene
   separado de "Descubre la Academia": uno orienta el uso y
   el otro explica el proyecto.
   ========================================================== */

function asegurarEstilos() {
  if (document.getElementById("estilos-acceso-guia-rapida-inicio")) return;

  const estilos = document.createElement("style");
  estilos.id = "estilos-acceso-guia-rapida-inicio";
  estilos.textContent = `
    .acceso-guia-rapida-inicio{
      position:relative;
      overflow:hidden;
      display:grid;
      grid-template-columns:auto minmax(0,1fr) auto;
      gap:13px;
      align-items:center;
      min-height:66px;
      margin-top:11px;
      padding:10px 16px;
      border:2px solid #ddd6fe;
      border-radius:19px;
      color:#334155;
      background:
        radial-gradient(circle at 90% 25%,rgba(56,189,248,.16),transparent 24%),
        linear-gradient(105deg,#fff7ed,#faf5ff 48%,#f0f9ff);
      box-shadow:0 7px 18px rgba(76,29,149,.06);
      text-decoration:none;
      transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease;
    }

    .acceso-guia-rapida-inicio::before{
      content:"";
      position:absolute;
      inset:0 auto 0 0;
      width:5px;
      background:linear-gradient(180deg,#0284c7,#7c3aed,#ec4899,#f59e0b);
    }

    .acceso-guia-rapida-inicio:hover,
    .acceso-guia-rapida-inicio:focus-visible{
      transform:translateY(-1px);
      border-color:#c4b5fd;
      box-shadow:0 10px 24px rgba(76,29,149,.10);
      outline:none;
    }

    .acceso-guia-rapida-inicio__icono{
      width:40px;
      height:40px;
      display:grid;
      place-items:center;
      border-radius:13px;
      background:rgba(255,255,255,.88);
      box-shadow:0 5px 14px rgba(79,70,229,.09);
      font-size:1.35rem;
    }

    .acceso-guia-rapida-inicio__texto{
      min-width:0;
      display:flex;
      align-items:baseline;
      gap:10px;
      flex-wrap:wrap;
    }

    .acceso-guia-rapida-inicio__texto strong{
      color:#5b21b6;
      font-size:1rem;
    }

    .acceso-guia-rapida-inicio__texto small{
      color:#64748b;
      font-size:.8rem;
      font-weight:700;
    }

    .acceso-guia-rapida-inicio__accion{
      color:#6d28d9;
      font-size:.84rem;
      font-weight:900;
      white-space:nowrap;
    }

    @media(max-width:620px){
      .acceso-guia-rapida-inicio{
        grid-template-columns:auto minmax(0,1fr);
      }

      .acceso-guia-rapida-inicio__texto{
        display:grid;
        gap:2px;
      }

      .acceso-guia-rapida-inicio__accion{
        grid-column:2;
      }
    }
  `;
  document.head.appendChild(estilos);
}

export function crearAccesoGuiaRapidaInicio() {
  if (document.querySelector("[data-acceso-guia-rapida-inicio]")) return;

  const descubre = document.querySelector(".descubre-academia");
  if (!descubre) return;

  const etiqueta = descubre.querySelector(".etiqueta-estado");
  if (etiqueta?.textContent?.trim() === "Guía breve y visual") {
    etiqueta.textContent = "Conoce la Academia";
  }

  asegurarEstilos();

  const enlace = document.createElement("a");
  enlace.className = "acceso-guia-rapida-inicio";
  enlace.href = "descubre-la-academia/guia-rapida.html";
  enlace.dataset.accesoGuiaRapidaInicio = "true";
  enlace.setAttribute("aria-label", "Abrir Guía rápida de uso de la Academia");
  enlace.innerHTML = `
    <span class="acceso-guia-rapida-inicio__icono" aria-hidden="true">📘</span>
    <span class="acceso-guia-rapida-inicio__texto">
      <strong>¿Primera vez aquí? · Guía rápida</strong>
      <small>Entra, oriéntate y empieza a explorar en pocos minutos.</small>
    </span>
    <span class="acceso-guia-rapida-inicio__accion">Abrir →</span>
  `;

  descubre.insertAdjacentElement("afterend", enlace);
}
