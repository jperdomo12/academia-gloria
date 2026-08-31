/* Academia Gloria Valentina · Mi Camino · Paginación estándar de Misiones */

const TAMANO_PAGINA = 5;
const SELECTORES = [
  "#paginacionHoy",
  "#paginacionRevision",
  "#paginacionPasadas"
];

function pluralMision(total) {
  return total === 1 ? "Misión" : "Misiones";
}

function normalizarContador(contenedor) {
  const contador = contenedor.querySelector(".paginacion-misiones__contador");
  if (!contador) return;

  const actual = String(contador.textContent || "").replace(/\s+/g, " ").trim();
  const match = actual.match(/^(\d+)\s*[–-]\s*(\d+)\s+de\s+(\d+)$/i);
  if (!match) return;

  const fin = Number(match[2]);
  const total = Number(match[3]);
  if (!Number.isFinite(fin) || !Number.isFinite(total) || total < 1) return;

  const pagina = Math.max(1, Math.ceil(fin / TAMANO_PAGINA));
  const totalPaginas = Math.max(1, Math.ceil(total / TAMANO_PAGINA));
  contador.textContent =
    `Página ${pagina} de ${totalPaginas} · ${total} ${pluralMision(total)}`;
}

function observar(contenedor) {
  normalizarContador(contenedor);

  new MutationObserver(() => {
    normalizarContador(contenedor);
  }).observe(contenedor, {
    childList: true,
    subtree: true
  });
}

function iniciar() {
  SELECTORES.forEach(selector => {
    const contenedor = document.querySelector(selector);
    if (contenedor) observar(contenedor);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar, { once: true });
} else {
  iniciar();
}
