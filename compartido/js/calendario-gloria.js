/* ==========================================================
   Academia de Gloria Valentina
   calendario-gloria.js
   Calendario personal reutilizable por año natural
   Enero a diciembre
   ========================================================== */

(() => {
  const ANIO = Number(document.body.dataset.anio);

  if (!Number.isInteger(ANIO)) {
    console.error("Calendario de Gloria: falta data-anio en <body>.");
    return;
  }

  const CLAVE = `academiaGloriaCalendario${ANIO}`;

  const MESES = [
    [0, "Enero"],
    [1, "Febrero"],
    [2, "Marzo"],
    [3, "Abril"],
    [4, "Mayo"],
    [5, "Junio"],
    [6, "Julio"],
    [7, "Agosto"],
    [8, "Septiembre"],
    [9, "Octubre"],
    [10, "Noviembre"],
    [11, "Diciembre"]
  ];

  const DIAS = ["L", "M", "X", "J", "V", "S", "D"];
  const $ = (id) => document.getElementById(id);

  let filtroActual = "todos";
  let mesSeleccionado = "todos";

  function leerEventos() {
    try {
      return JSON.parse(localStorage.getItem(CLAVE)) || [];
    } catch {
      return [];
    }
  }

  function guardarEventos(eventos) {
    localStorage.setItem(CLAVE, JSON.stringify(eventos));
  }

  function crearId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function escapar(texto = "") {
    return texto.replace(/[&<>"']/g, (caracter) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[caracter]);
  }

  function primerDiaLunes(anio, mes) {
    const dia = new Date(anio, mes, 1).getDay();
    return dia === 0 ? 6 : dia - 1;
  }

  function diasEnMes(anio, mes) {
    return new Date(anio, mes + 1, 0).getDate();
  }

  function fechaISO(anio, mes, dia) {
    return `${anio}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
  }

  function formatearFecha(fecha) {
    return new Date(`${fecha}T12:00:00`).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function renderCalendario() {
    const contenedor = $("gloriaMeses");
    const eventos = leerEventos();
    const hoy = new Date().toISOString().slice(0, 10);

    contenedor.innerHTML = "";

    MESES.forEach(([mes, nombre]) => {
      const articulo = document.createElement("article");
      articulo.className = "gloria-mes";
      articulo.dataset.mes = String(mes);

      let celdas = DIAS
        .map((dia) => `<div class="gloria-dia-semana">${dia}</div>`)
        .join("");

      celdas += '<div class="gloria-dia vacio"></div>'.repeat(
        primerDiaLunes(ANIO, mes)
      );

      for (let dia = 1; dia <= diasEnMes(ANIO, mes); dia++) {
        const fecha = fechaISO(ANIO, mes, dia);
        const eventosDia = eventos.filter((evento) => evento.fecha === fecha);
        const clases = ["gloria-dia"];

        if (fecha === hoy) clases.push("hoy");
        if (eventosDia.length) clases.push("tiene-evento");

        const iconos = eventosDia
          .slice(0, 2)
          .map((evento) => escapar(evento.icono || "⭐"))
          .join("");

        celdas += `
          <button
            type="button"
            class="${clases.join(" ")}"
            data-fecha="${fecha}"
            title="${eventosDia.length ? `${eventosDia.length} evento(s)` : "Añadir evento"}"
          >
            <span class="gloria-dia-numero">${dia}</span>
            ${iconos ? `<span class="gloria-dia-iconos">${iconos}</span>` : ""}
          </button>
        `;
      }

      articulo.innerHTML = `
        <div class="gloria-mes__titulo">
          <span>${nombre}</span>
          <small>${ANIO}</small>
        </div>
        <div class="gloria-mes__dias">${celdas}</div>
      `;

      contenedor.appendChild(articulo);
    });

    contenedor.querySelectorAll("[data-fecha]").forEach((boton) => {
      boton.addEventListener("click", () => {
        abrirModal(null, boton.dataset.fecha);
      });
    });

    aplicarFiltroMes();
  }

  function eventosFiltrados() {
    let eventos = leerEventos().sort((a, b) => a.fecha.localeCompare(b.fecha));

    if (filtroActual !== "todos") {
      eventos = eventos.filter((evento) => evento.categoria === filtroActual);
    }

    if (mesSeleccionado !== "todos") {
      eventos = eventos.filter(
        (evento) =>
          Number(evento.fecha.slice(5, 7)) - 1 === Number(mesSeleccionado)
      );
    }

    return eventos;
  }

  function renderEventos() {
    const contenedor = $("gloriaEventos");
    const eventos = eventosFiltrados();

    contenedor.innerHTML = "";

    if (!eventos.length) {
      contenedor.innerHTML = `
        <div class="gloria-vacio">
          <div style="font-size:48px">✨</div>
          No hay eventos en esta selección.
        </div>
      `;
      actualizarResumen();
      return;
    }

    eventos.forEach((evento) => {
      const tarjeta = document.createElement("article");
      tarjeta.className = `gloria-evento ${evento.completado ? "completado" : ""}`;

      tarjeta.innerHTML = `
        <div class="gloria-evento-icono">${escapar(evento.icono || "⭐")}</div>

        <div class="gloria-evento-contenido">
          <span class="gloria-evento-categoria">${escapar(evento.categoria)}</span>
          <h3>${escapar(evento.titulo)}</h3>
          <p>${formatearFecha(evento.fecha)}</p>
          ${evento.nota ? `<p>${escapar(evento.nota)}</p>` : ""}
        </div>

        <div class="gloria-evento-acciones">
          <button class="gloria-icon-btn" data-completar="${evento.id}" title="Completar">✅</button>
          <button class="gloria-icon-btn" data-editar="${evento.id}" title="Editar">✏️</button>
          <button class="gloria-icon-btn" data-eliminar="${evento.id}" title="Eliminar">🗑️</button>
        </div>
      `;

      contenedor.appendChild(tarjeta);
    });

    contenedor.querySelectorAll("[data-editar]").forEach((boton) => {
      boton.onclick = () => {
        const evento = leerEventos().find(
          (item) => item.id === boton.dataset.editar
        );
        abrirModal(evento);
      };
    });

    contenedor.querySelectorAll("[data-eliminar]").forEach((boton) => {
      boton.onclick = () => eliminarEvento(boton.dataset.eliminar);
    });

    contenedor.querySelectorAll("[data-completar]").forEach((boton) => {
      boton.onclick = () => alternarCompletado(boton.dataset.completar);
    });

    actualizarResumen();
  }

  function actualizarResumen() {
    const eventos = leerEventos();

    $("totalEventos").textContent = eventos.length;
    $("eventosCompletados").textContent = eventos.filter(
      (evento) => evento.completado
    ).length;
    $("eventosViajes").textContent = eventos.filter(
      (evento) => evento.categoria === "Viaje"
    ).length;
    $("eventosLogros").textContent = eventos.filter(
      (evento) => evento.categoria === "Logro"
    ).length;

    const hoy = new Date().toISOString().slice(0, 10);

    const siguiente = eventos
      .filter((evento) => evento.fecha >= hoy)
      .sort((a, b) => a.fecha.localeCompare(b.fecha))[0];

    $("proximoEvento").textContent = siguiente
      ? `${siguiente.icono || "⭐"} ${siguiente.titulo}`
      : "Añade tu primer evento";
  }

  function abrirModal(evento = null, fecha = "") {
    $("eventoId").value = evento?.id || "";
    $("eventoTitulo").value = evento?.titulo || "";
    $("eventoFecha").value =
      evento?.fecha || fecha || `${ANIO}-01-01`;
    $("eventoCategoria").value = evento?.categoria || "Especial";
    $("eventoIcono").value = evento?.icono || "⭐";
    $("eventoNota").value = evento?.nota || "";
    $("modalTitulo").textContent = evento ? "Editar evento" : "Nuevo evento";

    $("modalEvento").classList.add("abierto");
    $("modalEvento").setAttribute("aria-hidden", "false");
    $("eventoTitulo").focus();
  }

  function cerrarModal() {
    $("modalEvento").classList.remove("abierto");
    $("modalEvento").setAttribute("aria-hidden", "true");
  }

  function guardarEvento(eventoFormulario) {
    eventoFormulario.preventDefault();

    const eventos = leerEventos();
    const id = $("eventoId").value || crearId();

    const nuevo = {
      id,
      titulo: $("eventoTitulo").value.trim(),
      fecha: $("eventoFecha").value,
      categoria: $("eventoCategoria").value,
      icono: $("eventoIcono").value.trim() || "⭐",
      nota: $("eventoNota").value.trim(),
      completado:
        eventos.find((evento) => evento.id === id)?.completado || false
    };

    if (!nuevo.titulo || !nuevo.fecha) {
      alert("Escribe el título y la fecha.");
      return;
    }

    const indice = eventos.findIndex((evento) => evento.id === id);

    if (indice >= 0) {
      eventos[indice] = nuevo;
    } else {
      eventos.push(nuevo);
    }

    guardarEventos(eventos);
    cerrarModal();
    refrescar();
  }

  function eliminarEvento(id) {
    if (!confirm("¿Quieres eliminar este evento?")) return;

    guardarEventos(
      leerEventos().filter((evento) => evento.id !== id)
    );

    refrescar();
  }

  function alternarCompletado(id) {
    const eventos = leerEventos();
    const evento = eventos.find((item) => item.id === id);

    if (evento) {
      evento.completado = !evento.completado;
    }

    guardarEventos(eventos);
    refrescar();
  }

  function exportarCalendario() {
    const archivo = new Blob(
      [JSON.stringify(leerEventos(), null, 2)],
      { type: "application/json" }
    );

    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = `calendario-gloria-${ANIO}.json`;
    enlace.click();

    URL.revokeObjectURL(enlace.href);
  }

  async function importarCalendario(archivo) {
    try {
      const datos = JSON.parse(await archivo.text());

      if (!Array.isArray(datos)) {
        throw new Error();
      }

      guardarEventos(datos);
      refrescar();
      alert("Calendario importado correctamente ✨");
    } catch {
      alert("El archivo no es válido.");
    }
  }

  function aplicarFiltroMes() {
    document.querySelectorAll(".gloria-mes").forEach((mes) => {
      mes.hidden =
        mesSeleccionado !== "todos" &&
        mes.dataset.mes !== mesSeleccionado;
    });
  }

  function refrescar() {
    renderCalendario();
    renderEventos();
  }

  document.addEventListener("DOMContentLoaded", () => {
    $("nuevoEvento").onclick = () => abrirModal();
    $("cerrarModal").onclick = cerrarModal;
    $("cancelarModal").onclick = cerrarModal;
    $("formEvento").onsubmit = guardarEvento;
    $("exportarCalendario").onclick = exportarCalendario;

    $("importarCalendario").onchange = (evento) => {
      const archivo = evento.target.files[0];

      if (archivo) {
        importarCalendario(archivo);
      }

      evento.target.value = "";
    };

    $("selectorMes").onchange = (evento) => {
      mesSeleccionado = evento.target.value;
      aplicarFiltroMes();
      renderEventos();
    };

    document.querySelectorAll("[data-filtro]").forEach((boton) => {
      boton.onclick = () => {
        document
          .querySelectorAll("[data-filtro]")
          .forEach((item) => item.classList.remove("activo"));

        boton.classList.add("activo");
        filtroActual = boton.dataset.filtro;
        renderEventos();
      };
    });

    $("modalEvento").addEventListener("click", (evento) => {
      if (evento.target === $("modalEvento")) {
        cerrarModal();
      }
    });

    refrescar();
  });
})();
