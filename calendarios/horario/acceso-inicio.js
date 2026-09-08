/* ==========================================================
   Academia Gloria Valentina
   Acceso rápido al horario desde la portada

   Se muestra únicamente cuando la Persona Activa ya tiene
   un horario guardado. Abre una vista de consulta reducida:
   póster + horario, sin editor ni bloques auxiliares.
   ========================================================== */

import { HorarioClases } from "../../compartido/api/horario-clases.js";

function normalizar(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function buscarEncabezadoExplorar() {
  return [...document.querySelectorAll(".encabezado-seccion")].find(encabezado =>
    normalizar(encabezado.querySelector("h2")?.textContent) === "explora mas"
  ) || null;
}

function asegurarEstilos() {
  if (document.getElementById("estilos-acceso-horario-inicio")) return;

  const estilos = document.createElement("style");
  estilos.id = "estilos-acceso-horario-inicio";
  estilos.textContent = `
    .encabezado-seccion[data-horario-acceso="true"]{
      flex-wrap:wrap;
    }

    .acceso-horario-inicio{
      margin-left:auto;
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:8px;
      min-height:44px;
      padding:10px 15px;
      border:2px solid rgba(124,58,237,.16);
      border-radius:16px;
      color:#fff;
      background:linear-gradient(135deg,#7c3aed,#0ea5e9);
      box-shadow:0 12px 25px rgba(91,33,182,.18);
      text-decoration:none;
      font-weight:900;
      white-space:nowrap;
      transition:transform .18s ease,box-shadow .18s ease;
    }

    .acceso-horario-inicio:hover{
      transform:translateY(-2px);
      box-shadow:0 15px 30px rgba(91,33,182,.23);
    }

    .acceso-horario-inicio span[aria-hidden="true"]{
      font-size:1.08rem;
    }

    @media(max-width:720px){
      .acceso-horario-inicio{
        width:100%;
        margin-left:0;
      }
    }
  `;
  document.head.appendChild(estilos);
}

export async function crearAccesoHorarioInicio() {
  if (document.querySelector("[data-acceso-horario-inicio]")) return;

  const encabezado = buscarEncabezadoExplorar();
  if (!encabezado) return;

  const horario = await HorarioClases.leer();
  if (!horario) return;

  asegurarEstilos();
  encabezado.dataset.horarioAcceso = "true";

  const enlace = document.createElement("a");
  enlace.className = "acceso-horario-inicio";
  enlace.href = "calendarios/horario/?vista=solo";
  enlace.dataset.accesoHorarioInicio = "true";
  enlace.setAttribute("aria-label", "Abrir únicamente mi horario escolar");
  enlace.innerHTML = '<span aria-hidden="true">🗓️</span> Ver mi horario';

  encabezado.appendChild(enlace);
}
