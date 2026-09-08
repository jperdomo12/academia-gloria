/* ==========================================================
   Academia Gloria Valentina
   Mi horario de clases · presentación V3

   Capa puramente visual:
   - sincroniza la cabecera-póster con los datos ya renderizados;
   - identifica Patio/Recreo y Comedor como franjas especiales;
   - fusiona la franja cuando el mismo bloque ocupa los cinco días;
   - prepara una impresión/PDF compacta del calendario solamente;
   - permite una vista directa de SOLO el horario;
   - ordena alfabéticamente las materias en los selectores del editor.

   No modifica ni persiste el modelo del horario.
   ========================================================== */

const VISTA_SOLO_HORARIO = new URLSearchParams(window.location.search).get("vista") === "solo";
const ORDEN_MATERIAS = new Intl.Collator("es", { sensitivity:"base", numeric:true });

function cargarAjustesVisualesV4() {
  if (document.querySelector('link[data-horario-ajustes-v4]')) return;
  const hoja = document.createElement('link');
  hoja.rel = 'stylesheet';
  hoja.href = './horario-ajustes-v4.css';
  hoja.dataset.horarioAjustesV4 = 'true';
  document.head.appendChild(hoja);
}

function activarVistaSoloHorario() {
  if (!VISTA_SOLO_HORARIO) return;

  document.body.classList.add("horario-vista-solo");
  if (document.getElementById("estilos-horario-vista-solo")) return;

  const estilos = document.createElement("style");
  estilos.id = "estilos-horario-vista-solo";
  estilos.textContent = `
    body.horario-vista-solo .horario-hero,
    body.horario-vista-solo #resumenHoy,
    body.horario-vista-solo #vistaHorario > :not(.horario-bloque--tabla),
    body.horario-vista-solo .horario-bloque--tabla > .horario-bloque__cabecera,
    body.horario-vista-solo .horario-pagina > footer{
      display:none!important;
    }

    body.horario-vista-solo .horario-pagina{
      padding-top:12px;
    }

    body.horario-vista-solo .horario-bloque--tabla{
      margin-top:0!important;
    }

    body.horario-vista-solo .horario-poster{
      margin-top:0!important;
    }

    @media(max-width:760px){
      body.horario-vista-solo .horario-bloque--tabla{
        padding:14px!important;
      }
    }
  `;
  document.head.appendChild(estilos);
}

cargarAjustesVisualesV4();
activarVistaSoloHorario();

const TIPOS_ESPECIALES = Object.freeze([
  { tipo:"patio", claves:["patio","recreo","descanso"], icono:"🌤️" },
  { tipo:"comedor", claves:["comedor","almuerzo","comida"], icono:"🍽️" }
]);

function normalizarV3(valor = "") {
  return String(valor)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function tipoEspecial(nombre = "") {
  const valor = normalizarV3(nombre);
  return TIPOS_ESPECIALES.find(grupo =>
    grupo.claves.some(clave => valor.includes(clave))
  ) || null;
}

function ponerTexto(id, valor) {
  const elemento = document.getElementById(id);
  if (!elemento) return;
  const siguiente = String(valor ?? "").trim();
  if (elemento.textContent !== siguiente) elemento.textContent = siguiente;
}

function textoDato(id, alternativo = "") {
  const valor = document.getElementById(id)?.textContent?.trim() || "";
  return valor === "—" ? alternativo : (valor || alternativo);
}

function sincronizarPoster() {
  ponerTexto("posterAlumno", textoDato("datoAlumno", "Mi horario"));
  ponerTexto("posterColegio", textoDato("datoColegio", "Mi colegio"));
  ponerTexto("posterCurso", textoDato("datoCurso", "Mi curso"));
  ponerTexto("posterPeriodo", textoDato("datoPeriodo", "Curso escolar"));
}

function nombreClase(elemento) {
  return elemento?.querySelector(".clase-horario__nombre")?.textContent?.trim()
    || elemento?.textContent?.replace("AHORA", "")?.trim()
    || "";
}

function decorarTiposEspeciales() {
  document.querySelectorAll(".clase-horario:not(.clase-horario--vacia)").forEach(elemento => {
    const especial = tipoEspecial(nombreClase(elemento));
    const siguiente = especial?.tipo || "";

    if (siguiente) {
      if (elemento.dataset.tipo !== siguiente) elemento.dataset.tipo = siguiente;
    } else if (elemento.dataset.tipo) {
      delete elemento.dataset.tipo;
    }
  });

  document.querySelectorAll(".materia-chip").forEach(elemento => {
    const nombre = elemento.textContent?.trim() || "";
    const especial = tipoEspecial(nombre);
    const siguiente = especial?.tipo || "";

    if (siguiente) {
      if (elemento.dataset.tipo !== siguiente) elemento.dataset.tipo = siguiente;
    } else if (elemento.dataset.tipo) {
      delete elemento.dataset.tipo;
    }
  });
}

function textoFranja(nombre = "") {
  const limpio = String(nombre).trim().toUpperCase();
  if (limpio.length >= 3 && limpio.length <= 8 && !limpio.includes(" ")) {
    return limpio.split("").join(" ");
  }
  return limpio;
}

function crearContenidoFranja(nombre, especial) {
  const contenedor = document.createElement("div");
  contenedor.className = "horario-franja__contenido";

  const iconoIzquierdo = document.createElement("span");
  iconoIzquierdo.setAttribute("aria-hidden", "true");
  iconoIzquierdo.textContent = especial.icono;

  const etiqueta = document.createElement("strong");
  etiqueta.textContent = textoFranja(nombre);

  const iconoDerecho = document.createElement("span");
  iconoDerecho.setAttribute("aria-hidden", "true");
  iconoDerecho.textContent = especial.icono;

  contenedor.append(iconoIzquierdo, etiqueta, iconoDerecho);
  return contenedor;
}

function fusionarFranjasComunes() {
  document.querySelectorAll("#horarioTablaCuerpo tr").forEach(fila => {
    if (fila.dataset.franjaV3 === "true") return;

    const celdasDia = [...fila.children].slice(1);
    if (celdasDia.length !== 5) return;

    const clases = celdasDia.map(celda => celda.querySelector(".clase-horario"));
    if (clases.some(clase => !clase || clase.classList.contains("clase-horario--vacia"))) return;

    const nombres = clases.map(nombreClase);
    const nombreNormalizado = normalizarV3(nombres[0]);
    if (!nombreNormalizado) return;
    if (!nombres.every(nombre => normalizarV3(nombre) === nombreNormalizado)) return;

    const especial = tipoEspecial(nombres[0]);
    if (!especial) return;

    const nuevaCelda = document.createElement("td");
    nuevaCelda.colSpan = 5;
    nuevaCelda.className = `horario-franja horario-franja--${especial.tipo}`;
    nuevaCelda.appendChild(crearContenidoFranja(nombres[0], especial));

    celdasDia.forEach(celda => celda.remove());
    fila.appendChild(nuevaCelda);
    fila.classList.add("horario-fila-franja");
    fila.dataset.franjaV3 = "true";
    fila.dataset.tipoFranja = especial.tipo;
  });
}

function ordenarOpcionesMateria(select) {
  if (!(select instanceof HTMLSelectElement)) return;

  const opciones = [...select.options];
  const libre = opciones.find(opcion => opcion.value === "") || null;
  const materias = opciones
    .filter(opcion => opcion.value !== "")
    .sort((a, b) => ORDEN_MATERIAS.compare(a.textContent.trim(), b.textContent.trim()));

  const ordenActual = opciones.map(opcion => opcion.value).join("\u0000");
  const ordenDeseado = [libre, ...materias]
    .filter(Boolean)
    .map(opcion => opcion.value)
    .join("\u0000");

  if (ordenActual === ordenDeseado) return;

  const seleccionada = select.value;
  const fragmento = document.createDocumentFragment();
  if (libre) fragmento.appendChild(libre);
  materias.forEach(opcion => fragmento.appendChild(opcion));
  select.appendChild(fragmento);
  select.value = seleccionada;
}

function ordenarListasMaterias() {
  document.querySelectorAll("#editorTablaCuerpo select").forEach(ordenarOpcionesMateria);
}

function prepararDensidadImpresion() {
  document.body.classList.remove("horario-print-compacto", "horario-print-muy-compacto");
  const filas = document.querySelectorAll("#horarioTablaCuerpo tr").length;

  if (filas > 13) {
    document.body.classList.add("horario-print-muy-compacto");
  } else if (filas > 9) {
    document.body.classList.add("horario-print-compacto");
  }
}

function limpiarDensidadImpresion() {
  document.body.classList.remove("horario-print-compacto", "horario-print-muy-compacto");
}

function actualizarPresentacionV3() {
  sincronizarPoster();
  decorarTiposEspeciales();
  fusionarFranjasComunes();
  ordenarListasMaterias();
}

function iniciarPresentacionV3() {
  actualizarPresentacionV3();

  const vista = document.getElementById("vistaHorario");
  if (vista) {
    let pendiente = false;
    const observer = new MutationObserver(() => {
      if (pendiente) return;
      pendiente = true;
      queueMicrotask(() => {
        pendiente = false;
        actualizarPresentacionV3();
      });
    });

    observer.observe(vista, { childList:true, subtree:true, characterData:true });
  }

  const editor = document.getElementById("editorHorario");
  if (editor) {
    let pendienteEditor = false;
    const observerEditor = new MutationObserver(() => {
      if (pendienteEditor) return;
      pendienteEditor = true;
      queueMicrotask(() => {
        pendienteEditor = false;
        ordenarListasMaterias();
      });
    });

    observerEditor.observe(editor, { childList:true, subtree:true });
  }

  window.addEventListener("beforeprint", () => {
    actualizarPresentacionV3();
    prepararDensidadImpresion();
  });

  window.addEventListener("afterprint", limpiarDensidadImpresion);
}

iniciarPresentacionV3();
