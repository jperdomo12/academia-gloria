/* ========================================================================
   Academia Gloria Valentina · 6.º de Primaria
   Catálogo reutilizable de Temas para portales de asignatura
   ======================================================================== */

function texto(valor = "") {
  return String(valor ?? "").replace(/\s+/g, " ").trim();
}

function normalizar(valor = "") {
  return texto(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-ES");
}

function crearElemento(etiqueta, clase = "", contenido = "") {
  const elemento = document.createElement(etiqueta);
  if (clase) elemento.className = clase;
  if (contenido) elemento.textContent = contenido;
  return elemento;
}

function recursosTexto(recursos = []) {
  const total = recursos.length;
  if (!total) return "";
  return `${total} ${total === 1 ? "recurso" : "recursos"}`;
}

function crearTarjetaTema(tema = {}) {
  const enlace = document.createElement("a");
  enlace.className = "portal-tema";
  enlace.href = texto(tema.ruta, "#");
  enlace.dataset.temaId = texto(tema.id);
  enlace.style.setProperty("--tema-acento", texto(tema.acento, "#b39fcf"));
  enlace.style.setProperty("--tema-acento-suave", texto(tema.acentoSuave, "#f3eefb"));
  enlace.style.setProperty("--tema-acento-texto", texto(tema.acentoTexto, "#66538f"));
  if (tema.conservarRetorno) enlace.setAttribute("data-conservar-retorno", "");

  const arriba = crearElemento("div", "portal-tema__arriba");
  const icono = crearElemento("div", "portal-tema__icono", texto(tema.icono, "📘"));
  icono.setAttribute("aria-hidden", "true");
  const estado = crearElemento("span", "portal-tema__estado", texto(tema.estado, "Tema de 6.º"));
  arriba.append(icono, estado);

  const titulo = crearElemento("h3", "", texto(tema.titulo, "Tema"));
  const descripcion = crearElemento("p", "portal-tema__descripcion", texto(tema.descripcion));

  const pistas = crearElemento("div", "portal-tema__pistas");
  (Array.isArray(tema.pistas) ? tema.pistas : []).slice(0, 4).forEach(pista => {
    pistas.appendChild(crearElemento("span", "portal-tema__pista", texto(pista)));
  });

  const pie = crearElemento("div", "portal-tema__pie");
  pie.append(
    crearElemento("span", "portal-tema__recursos", recursosTexto(tema.recursos)),
    crearElemento("span", "portal-tema__entrar", texto(tema.accion, "Entrar →"))
  );

  enlace.append(arriba, titulo, descripcion, pistas, pie);
  return enlace;
}

function crearMensajeCrecimiento(mensaje = {}) {
  const bloque = crearElemento("article", "portal-catalogo__crecimiento");
  const icono = crearElemento("div", "portal-catalogo__crecimiento-icono", texto(mensaje.icono, "🌱"));
  icono.setAttribute("aria-hidden", "true");
  const contenido = crearElemento("div");
  contenido.append(
    crearElemento("h3", "", texto(mensaje.titulo, "Este espacio crecerá con el curso")),
    crearElemento(
      "p",
      "",
      texto(
        mensaje.texto,
        "Los próximos Temas aparecerán aquí cuando trabajemos con el material real del colegio."
      )
    )
  );
  bloque.append(icono, contenido);
  return bloque;
}

function crearEstadoVacio() {
  return crearElemento(
    "div",
    "portal-catalogo__vacio",
    "No encuentro un Tema con ese nombre. Prueba con otra palabra."
  );
}

export function montarCatalogoTemas({
  temas = [],
  contenedorId = "temasAsignatura",
  contadorId = "contadorTemas",
  busquedaId = "buscarTema",
  umbralBusqueda = 5,
  crecimiento = null
} = {}) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  const catalogo = (Array.isArray(temas) ? temas : [])
    .filter(tema => tema && tema.visible !== false)
    .sort((a, b) => Number(a.orden ?? 999) - Number(b.orden ?? 999));

  const contador = document.getElementById(contadorId);
  const busqueda = document.getElementById(busquedaId);
  const bloqueBusqueda = busqueda?.closest?.("[data-busqueda-temas]");

  function actualizarContador(totalVisible = catalogo.length) {
    if (!contador) return;
    const total = catalogo.length;
    contador.textContent = totalVisible === total
      ? `${total} ${total === 1 ? "Tema activo" : "Temas activos"}`
      : `${totalVisible} de ${total} Temas`;
  }

  function render(filtro = "") {
    const termino = normalizar(filtro);
    const visibles = catalogo.filter(tema => {
      if (!termino) return true;
      const indice = [
        tema.titulo,
        tema.descripcion,
        ...(Array.isArray(tema.pistas) ? tema.pistas : [])
      ].map(normalizar).join(" ");
      return indice.includes(termino);
    });

    contenedor.innerHTML = "";
    visibles.forEach(tema => contenedor.appendChild(crearTarjetaTema(tema)));

    if (!termino && crecimiento && catalogo.length === 1) {
      contenedor.appendChild(crearMensajeCrecimiento(crecimiento));
    }

    if (!visibles.length) contenedor.appendChild(crearEstadoVacio());
    actualizarContador(visibles.length);
  }

  if (bloqueBusqueda) {
    bloqueBusqueda.hidden = catalogo.length < umbralBusqueda;
  }

  busqueda?.addEventListener("input", event => render(event.target.value));
  render();
}
