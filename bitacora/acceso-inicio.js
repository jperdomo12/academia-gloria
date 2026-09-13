/* ==========================================================
   Academia Gloria Valentina
   Acceso compacto a Bitácora de Acompañamiento desde Inicio

   Se muestra únicamente cuando el USER autenticado no tiene
   rol alumno. El criterio usa el Rol real del USER; cambiar la
   Persona Activa no modifica la visibilidad de este acceso.
   ========================================================== */

import { obtenerPerfil } from "../compartido/js/perfil-usuario.js";

function normalizar(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function asegurarEstilos() {
  if (document.getElementById("estilos-acceso-bitacora-inicio")) return;

  const estilos = document.createElement("style");
  estilos.id = "estilos-acceso-bitacora-inicio";
  estilos.textContent = `
    .acceso-bitacora-inicio{
      display:grid;
      grid-template-columns:auto minmax(0,1fr) auto;
      gap:12px;
      align-items:center;
      min-height:62px;
      margin-top:12px;
      padding:10px 16px;
      border:1.5px solid #ddd6fe;
      border-radius:18px;
      color:#334155;
      background:rgba(255,255,255,.88);
      box-shadow:0 5px 14px rgba(76,29,149,.05);
      text-decoration:none;
      transition:border-color .16s ease,background .16s ease,transform .16s ease;
    }

    .acceso-bitacora-inicio:hover,
    .acceso-bitacora-inicio:focus-visible{
      transform:translateY(-1px);
      border-color:#c4b5fd;
      background:#fff;
      outline:none;
    }

    .acceso-bitacora-inicio__icono{
      width:36px;
      height:36px;
      display:grid;
      place-items:center;
      border-radius:12px;
      background:#f5f3ff;
      font-size:1.25rem;
    }

    .acceso-bitacora-inicio__texto{
      min-width:0;
      display:flex;
      align-items:baseline;
      gap:10px;
      flex-wrap:wrap;
    }

    .acceso-bitacora-inicio__texto strong{
      color:#5b21b6;
      font-size:.98rem;
    }

    .acceso-bitacora-inicio__texto small{
      color:#64748b;
      font-size:.78rem;
      font-weight:650;
    }

    .acceso-bitacora-inicio__accion{
      color:#6d28d9;
      font-size:.82rem;
      font-weight:900;
      white-space:nowrap;
    }

    @media(max-width:620px){
      .acceso-bitacora-inicio{
        grid-template-columns:auto minmax(0,1fr);
      }

      .acceso-bitacora-inicio__texto{
        display:grid;
        gap:2px;
      }

      .acceso-bitacora-inicio__accion{
        grid-column:2;
      }
    }
  `;
  document.head.appendChild(estilos);
}

export async function crearAccesoBitacoraInicio() {
  if (document.querySelector("[data-acceso-bitacora-inicio]")) return;

  const referencia = document.querySelector(".hero");
  if (!referencia) return;

  const perfil = await obtenerPerfil();
  const rol = normalizar(perfil.roleId || perfil.tipoUsuario);
  if (rol === "alumno") return;

  asegurarEstilos();

  const enlace = document.createElement("a");
  enlace.className = "acceso-bitacora-inicio";
  enlace.href = "bitacora/";
  enlace.dataset.accesoBitacoraInicio = "true";
  enlace.setAttribute("aria-label", "Abrir Bitácora de Acompañamiento");
  enlace.innerHTML = `
    <span class="acceso-bitacora-inicio__icono" aria-hidden="true">🤝</span>
    <span class="acceso-bitacora-inicio__texto">
      <strong>Bitácora de Acompañamiento</strong>
      <small>Observaciones, recomendaciones y seguimiento.</small>
    </span>
    <span class="acceso-bitacora-inicio__accion">Abrir →</span>
  `;

  referencia.insertAdjacentElement("afterend", enlace);
}
