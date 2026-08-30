/* Academia Gloria Valentina · Catálogo asistido para Repaso académico */

const VALOR_MANUAL = "__manual__";
const $ = id => document.getElementById(id);

const cursoSelect = $("cursoReferencia");
const tipoSelect = $("tipo");
const materiaInput = $("materia");
const temaInput = $("tema");
const recursoInput = $("recursoAcademicoUrl");
const materiasDatalist = $("materiasSugeridas");

if (cursoSelect && tipoSelect && materiaInput && temaInput && recursoInput) {
  const materiaSelect = document.createElement("select");
  materiaSelect.id = "materiaCatalogoAcademico";
  materiaSelect.setAttribute("aria-label", "Materia disponible en la Academia");

  const temaSelect = document.createElement("select");
  temaSelect.id = "temaCatalogoAcademico";
  temaSelect.setAttribute("aria-label", "Tema disponible en la Academia");

  const estadoCatalogo = document.createElement("span");
  estadoCatalogo.className = "ayuda-campo";
  estadoCatalogo.setAttribute("aria-live", "polite");

  materiaInput.insertAdjacentElement("beforebegin", materiaSelect);
  temaInput.insertAdjacentElement("beforebegin", temaSelect);
  temaInput.insertAdjacentElement("afterend", estadoCatalogo);

  materiaInput.hidden = true;
  temaInput.hidden = true;
  materiasDatalist?.setAttribute("hidden", "");

  recursoInput.type = "text";
  recursoInput.readOnly = true;
  recursoInput.placeholder = "Se completará automáticamente al elegir un tema";

  const ayudaRecurso = recursoInput.parentElement?.querySelector(".ayuda-campo");
  if (ayudaRecurso) {
    ayudaRecurso.textContent =
      "La Academia completa esta ruta automáticamente. Solo se edita en modo manual.";
  }

  let materias = [];
  let temas = [];
  let tokenCargaMaterias = 0;
  let tokenCargaTemas = 0;
  let sincronizando = false;

  function formularioSoloLectura() {
    return $("formTarea")?.classList.contains("modo-consulta") === true;
  }

  function habilitarSelect(select, habilitado) {
    select.disabled = !habilitado || formularioSoloLectura();
  }

  function textoLimpio(valor = "") {
    return String(valor).replace(/\s+/g, " ").trim();
  }

  function claveTexto(valor = "") {
    return textoLimpio(valor)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("es-ES");
  }

  function etiquetaMateria(segmento, etiquetaOriginal) {
    const porRuta = {
      mates: "Matemáticas",
      matematicas: "Matemáticas",
      lengua: "Lengua",
      sociales: "Sociales",
      ciencias: "Science",
      science: "Science",
      ingles: "Inglés"
    };

    return porRuta[claveTexto(segmento)] || textoLimpio(etiquetaOriginal) || segmento;
  }

  function dispararCampo(campo) {
    campo.dispatchEvent(new Event("input", { bubbles: true }));
    campo.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function establecerCampo(campo, valor, { notificar = true } = {}) {
    const siguiente = String(valor ?? "");
    if (campo.value === siguiente) return;
    campo.value = siguiente;
    if (notificar) dispararCampo(campo);
  }

  function establecerRecurso(valor, { manual = false } = {}) {
    recursoInput.readOnly = !manual;
    recursoInput.value = String(valor || "");
  }

  function rutaEstableAcademia(url) {
    const destino = url instanceof URL ? url : new URL(url, window.location.href);
    const marcador = "/cursos/";
    const indice = destino.pathname.indexOf(marcador);

    if (indice < 0) return destino.href;

    const rutaDesdeRaiz = destino.pathname.slice(indice + 1);
    return `../../${rutaDesdeRaiz}${destino.search}${destino.hash}`;
  }

  function opcion(valor, texto, dataset = {}) {
    const item = document.createElement("option");
    item.value = valor;
    item.textContent = texto;
    Object.entries(dataset).forEach(([clave, dato]) => {
      item.dataset[clave] = String(dato ?? "");
    });
    return item;
  }

  function prepararSelect(select, mensaje, { manual = true } = {}) {
    select.innerHTML = "";
    select.appendChild(opcion("", mensaje));
    if (manual) {
      select.appendChild(opcion(VALOR_MANUAL, "✏️ Otro valor / no catalogado"));
    }
  }

  function mostrarMateriaManual(valor = "") {
    materiaSelect.value = VALOR_MANUAL;
    materiaInput.hidden = false;
    materiaInput.removeAttribute("list");
    if (valor !== undefined) establecerCampo(materiaInput, valor, { notificar: false });
    temaSelect.hidden = true;
    temaInput.hidden = false;
    establecerRecurso(recursoInput.value, { manual: true });
    estadoCatalogo.textContent =
      "Materia no catalogada: puedes indicar el tema y el recurso manualmente.";
  }

  function ocultarMateriaManual() {
    materiaInput.hidden = true;
  }

  function mostrarTemaManual(valor = "", recurso = "") {
    temaSelect.value = VALOR_MANUAL;
    temaInput.hidden = false;
    if (valor !== undefined) establecerCampo(temaInput, valor, { notificar: false });
    establecerRecurso(recurso, { manual: true });
    estadoCatalogo.textContent =
      "Tema no catalogado: puedes escribirlo y, si existe, indicar su recurso.";
  }

  function ocultarTemaManual() {
    temaInput.hidden = true;
    establecerRecurso(recursoInput.value, { manual: false });
  }

  function cursoBaseUrl() {
    const curso = String(cursoSelect.value || "").trim();
    return curso ? new URL(`../../cursos/${curso}to/`, import.meta.url) : null;
  }

  async function leerHtml(url, descripcion) {
    const respuesta = await fetch(url, { cache: "no-store" });
    if (!respuesta.ok) {
      throw new Error(`${descripcion} (HTTP ${respuesta.status})`);
    }
    return new DOMParser().parseFromString(await respuesta.text(), "text/html");
  }

  function extraerMaterias(documento, baseCurso) {
    const basePath = baseCurso.pathname.endsWith("/")
      ? baseCurso.pathname
      : `${baseCurso.pathname}/`;
    const resultado = [];
    const vistas = new Set();

    documento.querySelectorAll("a[href]").forEach(enlace => {
      let destino;
      try {
        destino = new URL(enlace.getAttribute("href"), baseCurso);
      } catch {
        return;
      }

      if (destino.origin !== window.location.origin) return;
      if (!destino.pathname.startsWith(basePath)) return;

      const resto = destino.pathname.slice(basePath.length);
      const segmentos = resto.split("/").filter(Boolean);
      if (segmentos.length !== 1 || !destino.pathname.endsWith("/")) return;

      const segmento = segmentos[0];
      if (vistas.has(segmento)) return;

      const encabezado = enlace.querySelector("h2,h3,h4");
      const etiqueta = etiquetaMateria(segmento, encabezado?.textContent || enlace.textContent);
      if (!etiqueta) return;

      vistas.add(segmento);
      resultado.push({
        id: segmento,
        nombre: etiqueta,
        url: destino.href
      });
    });

    return resultado;
  }

  function extraerTemas(documento, baseMateria) {
    const basePath = baseMateria.pathname.endsWith("/")
      ? baseMateria.pathname
      : `${baseMateria.pathname}/`;
    const resultado = [];
    const vistas = new Set();

    documento.querySelectorAll("a[href]").forEach(enlace => {
      let destino;
      try {
        destino = new URL(enlace.getAttribute("href"), baseMateria);
      } catch {
        return;
      }

      if (destino.origin !== window.location.origin) return;
      if (!destino.pathname.startsWith(basePath)) return;
      if (destino.pathname === basePath || destino.pathname === `${basePath}index.html`) return;

      const encabezado = enlace.querySelector("h2,h3,h4");
      const titulo = textoLimpio(encabezado?.textContent || "");
      if (!titulo) return;

      const ruta = rutaEstableAcademia(destino);
      if (vistas.has(ruta)) return;

      vistas.add(ruta);
      resultado.push({ titulo, ruta, url: destino.href });
    });

    return resultado;
  }

  function encontrarMateria(valor) {
    const clave = claveTexto(valor);
    return materias.find(item =>
      claveTexto(item.nombre) === clave || claveTexto(item.id) === clave
    ) || null;
  }

  function encontrarTema(titulo, recurso = "") {
    const claveTitulo = claveTexto(titulo);
    const recursoTexto = String(recurso || "").trim();

    return temas.find(item => {
      if (claveTitulo && claveTexto(item.titulo) === claveTitulo) return true;
      if (!recursoTexto) return false;

      try {
        const absolutoGuardado = new URL(recursoTexto, window.location.href).href;
        return absolutoGuardado === item.url;
      } catch {
        return recursoTexto === item.ruta;
      }
    }) || null;
  }

  function poblarMaterias(preferida = "") {
    materiaSelect.innerHTML = "";
    materiaSelect.appendChild(opcion("", "Selecciona una materia"));

    materias.forEach(item => {
      materiaSelect.appendChild(opcion(item.nombre, item.nombre, { url: item.url, id: item.id }));
    });

    materiaSelect.appendChild(opcion(VALOR_MANUAL, "✏️ Otra materia / no catalogada"));

    const encontrada = encontrarMateria(preferida);
    if (encontrada) {
      materiaSelect.value = encontrada.nombre;
      ocultarMateriaManual();
      establecerCampo(materiaInput, encontrada.nombre, { notificar: false });
      return encontrada;
    }

    if (textoLimpio(preferida)) {
      mostrarMateriaManual(preferida);
      return null;
    }

    materiaSelect.value = "";
    materiaInput.hidden = true;
    return null;
  }

  function poblarTemas(preferido = "", recursoPreferido = "") {
    temaSelect.hidden = false;
    temaSelect.innerHTML = "";
    temaSelect.appendChild(opcion("", "Selecciona un tema"));

    temas.forEach(item => {
      temaSelect.appendChild(opcion(item.titulo, item.titulo, { ruta: item.ruta, url: item.url }));
    });

    temaSelect.appendChild(opcion(VALOR_MANUAL, "✏️ Otro tema / no catalogado"));

    const encontrado = encontrarTema(preferido, recursoPreferido);
    if (encontrado) {
      temaSelect.value = encontrado.titulo;
      ocultarTemaManual();
      establecerCampo(temaInput, encontrado.titulo, { notificar: false });
      establecerRecurso(encontrado.ruta, { manual: false });
      estadoCatalogo.textContent =
        "Tema reconocido. La ruta de la actividad se completó automáticamente.";
      return encontrado;
    }

    if (textoLimpio(preferido)) {
      mostrarTemaManual(preferido, recursoPreferido);
      return null;
    }

    temaSelect.value = "";
    temaInput.hidden = true;
    establecerRecurso("", { manual: false });
    estadoCatalogo.textContent = temas.length
      ? `${temas.length} ${temas.length === 1 ? "tema disponible" : "temas disponibles"}.`
      : "No hay temas catalogados para esta materia.";
    return null;
  }

  async function cargarTemas(materia, { temaPreferido = "", recursoPreferido = "" } = {}) {
    const token = ++tokenCargaTemas;
    temas = [];

    temaSelect.hidden = false;
    prepararSelect(temaSelect, "Cargando temas…", { manual: false });
    habilitarSelect(temaSelect, false);
    temaInput.hidden = true;
    establecerRecurso("", { manual: false });
    estadoCatalogo.textContent = "Buscando los temas disponibles en la Academia…";

    try {
      const baseMateria = new URL(materia.url);
      const documento = await leerHtml(new URL("index.html", baseMateria), "no se pudo leer la materia");
      if (token !== tokenCargaTemas) return;

      temas = extraerTemas(documento, baseMateria);
      habilitarSelect(temaSelect, true);
      poblarTemas(temaPreferido, recursoPreferido);
    } catch (error) {
      if (token !== tokenCargaTemas) return;

      prepararSelect(temaSelect, "No fue posible cargar los temas", { manual: true });
      habilitarSelect(temaSelect, true);
      mostrarTemaManual(temaPreferido, recursoPreferido);
      estadoCatalogo.textContent =
        `No se pudo cargar el catálogo de temas. Razón: ${error.message || "Error no identificado"}`;
    }
  }

  async function cargarMaterias({
    materiaPreferida = materiaInput.value,
    temaPreferido = temaInput.value,
    recursoPreferido = recursoInput.value
  } = {}) {
    const token = ++tokenCargaMaterias;
    materias = [];
    temas = [];

    prepararSelect(materiaSelect, "Cargando materias…", { manual: false });
    habilitarSelect(materiaSelect, false);
    prepararSelect(temaSelect, "Selecciona primero una materia", { manual: true });
    habilitarSelect(temaSelect, false);
    estadoCatalogo.textContent = "Buscando las materias disponibles en la Academia…";

    const baseCurso = cursoBaseUrl();
    if (!baseCurso) {
      habilitarSelect(materiaSelect, true);
      mostrarMateriaManual(materiaPreferida);
      return;
    }

    try {
      const documento = await leerHtml(new URL("index.html", baseCurso), "no se pudo leer el curso");
      if (token !== tokenCargaMaterias) return;

      materias = extraerMaterias(documento, baseCurso);
      habilitarSelect(materiaSelect, true);

      if (!materias.length) {
        prepararSelect(materiaSelect, "No hay materias catalogadas", { manual: true });
        mostrarMateriaManual(materiaPreferida);
        estadoCatalogo.textContent =
          "Este curso todavía no tiene materias navegables en la Academia. Puedes usar el modo manual.";
        return;
      }

      const materia = poblarMaterias(materiaPreferida);
      estadoCatalogo.textContent =
        `${materias.length} ${materias.length === 1 ? "materia disponible" : "materias disponibles"}.`;

      if (materia) {
        await cargarTemas(materia, { temaPreferido, recursoPreferido });
      } else if (textoLimpio(materiaPreferida)) {
        mostrarMateriaManual(materiaPreferida);
        temaInput.value = temaPreferido;
        establecerRecurso(recursoPreferido, { manual: true });
      }
    } catch (error) {
      if (token !== tokenCargaMaterias) return;

      prepararSelect(materiaSelect, "No fue posible cargar las materias", { manual: true });
      habilitarSelect(materiaSelect, true);
      mostrarMateriaManual(materiaPreferida);
      temaInput.value = temaPreferido;
      establecerRecurso(recursoPreferido, { manual: true });
      estadoCatalogo.textContent =
        `No se pudo cargar el catálogo académico. Razón: ${error.message || "Error no identificado"}`;
    }
  }

  async function sincronizarDesdeFormulario() {
    if (sincronizando) return;
    sincronizando = true;

    try {
      await cargarMaterias({
        materiaPreferida: materiaInput.value,
        temaPreferido: temaInput.value,
        recursoPreferido: recursoInput.value
      });
    } finally {
      sincronizando = false;
    }
  }

  materiaSelect.addEventListener("change", async () => {
    if (materiaSelect.value === VALOR_MANUAL) {
      establecerCampo(materiaInput, "");
      establecerCampo(temaInput, "");
      establecerRecurso("", { manual: true });
      mostrarMateriaManual("");
      return;
    }

    const materia = encontrarMateria(materiaSelect.value);
    if (!materia) {
      establecerCampo(materiaInput, "");
      establecerCampo(temaInput, "");
      establecerRecurso("", { manual: false });
      prepararSelect(temaSelect, "Selecciona primero una materia", { manual: true });
      habilitarSelect(temaSelect, false);
      temaInput.hidden = true;
      estadoCatalogo.textContent = "Selecciona una materia para ver sus temas.";
      return;
    }

    ocultarMateriaManual();
    establecerCampo(materiaInput, materia.nombre);
    establecerCampo(temaInput, "");
    establecerRecurso("", { manual: false });
    await cargarTemas(materia);
  });

  temaSelect.addEventListener("change", () => {
    if (temaSelect.value === VALOR_MANUAL) {
      establecerCampo(temaInput, "");
      mostrarTemaManual("", "");
      temaInput.focus();
      return;
    }

    if (!temaSelect.value) {
      establecerCampo(temaInput, "");
      establecerRecurso("", { manual: false });
      temaInput.hidden = true;
      estadoCatalogo.textContent = temas.length
        ? "Selecciona el tema que quieres repasar."
        : "No hay temas catalogados para esta materia.";
      return;
    }

    const tema = encontrarTema(temaSelect.value);
    if (!tema) return;

    ocultarTemaManual();
    establecerCampo(temaInput, tema.titulo);
    establecerRecurso(tema.ruta, { manual: false });
    estadoCatalogo.textContent =
      "Tema seleccionado. La ruta de la actividad se completó automáticamente.";
  });

  cursoSelect.addEventListener("change", () => {
    if (tipoSelect.value !== "repaso_academico") return;

    establecerCampo(materiaInput, "");
    establecerCampo(temaInput, "");
    establecerRecurso("", { manual: false });
    cargarMaterias({ materiaPreferida: "", temaPreferido: "", recursoPreferido: "" });
  });

  tipoSelect.addEventListener("change", () => {
    if (tipoSelect.value === "repaso_academico") {
      window.setTimeout(() => sincronizarDesdeFormulario(), 0);
    }
  });

  document.addEventListener("click", evento => {
    const control = evento.target.closest?.('[data-action="edit"],[data-action="view"]');
    if (!control) return;

    window.setTimeout(() => {
      if (tipoSelect.value === "repaso_academico") {
        sincronizarDesdeFormulario();
      }
    }, 80);
  });

  $("formTarea")?.addEventListener("reset", () => {
    window.setTimeout(() => sincronizarDesdeFormulario(), 0);
  });

  materiaInput.addEventListener("input", () => {
    if (!materiaInput.hidden) {
      temaInput.hidden = false;
      temaSelect.hidden = true;
      establecerRecurso(recursoInput.value, { manual: true });
    }
  });

  temaInput.addEventListener("input", () => {
    if (!temaInput.hidden) {
      establecerRecurso(recursoInput.value, { manual: true });
    }
  });

  prepararSelect(materiaSelect, "Selecciona una materia", { manual: true });
  prepararSelect(temaSelect, "Selecciona primero una materia", { manual: true });
  habilitarSelect(temaSelect, false);

  cargarMaterias().catch(error => {
    console.error("No se pudo inicializar el catálogo de Repaso académico.", error);
    estadoCatalogo.textContent =
      `No se pudo inicializar el catálogo académico. Razón: ${error.message || "Error no identificado"}`;
  });
}
