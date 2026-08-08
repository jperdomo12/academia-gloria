/* ==========================================================
   Academia Gloria Valentina
   calendario-personal.js · v2.7
   Calendario único, multiusuario y multi-año
   ========================================================== */

import { Academia } from "../api/academia.js";
import { auth } from "../firebase/firebase-config.js";
import { obtenerPerfil } from "./perfil-usuario.js";

(() => {
  const MESES = [
    [0,"Enero"],[1,"Febrero"],[2,"Marzo"],[3,"Abril"],
    [4,"Mayo"],[5,"Junio"],[6,"Julio"],[7,"Agosto"],
    [8,"Septiembre"],[9,"Octubre"],[10,"Noviembre"],[11,"Diciembre"]
  ];
  const DIAS = ["L","M","X","J","V","S","D"];
  const $ = id => document.getElementById(id);

  const hoy = new Date();
  hoy.setHours(0,0,0,0);

  const ANIO_ACTUAL = hoy.getFullYear();
  const ANIO_MAXIMO = ANIO_ACTUAL + 5;

  const fechaMaxima = new Date(
    ANIO_MAXIMO,
    11,
    31
  );
  fechaMaxima.setHours(23,59,59,999);

  let anioSeleccionado = ANIO_ACTUAL;
  let filtroActual = "todos";
  let mesSeleccionado = "todos";
  let eventos = [];
  let cancelarObservacion = null;
  let perfilActual = null;

  function escapar(texto=""){
    return String(texto).replace(/[&<>"']/g, caracter => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    })[caracter]);
  }

  function fechaLocalISO(fecha=new Date()){
    return `${fecha.getFullYear()}-${String(fecha.getMonth()+1).padStart(2,"0")}-${String(fecha.getDate()).padStart(2,"0")}`;
  }

  function fechaDesdeISO(fecha=""){
    return new Date(`${fecha}T12:00:00`);
  }

  function fechaISO(anio,mes,dia){
    return `${anio}-${String(mes+1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`;
  }

  function primerDiaLunes(anio,mes){
    const dia = new Date(anio,mes,1).getDay();
    return dia === 0 ? 6 : dia - 1;
  }

  function diasEnMes(anio,mes){
    return new Date(anio,mes+1,0).getDate();
  }

  function formatearFecha(fecha){
    return fechaDesdeISO(fecha).toLocaleDateString("es-ES",{
      day:"numeric",month:"long",year:"numeric"
    });
  }

  function fechaDentroRango(fechaISOValor){
    const fecha = fechaDesdeISO(fechaISOValor);
    const inicio = new Date(ANIO_ACTUAL,0,1);
    inicio.setHours(0,0,0,0);
    return fecha >= inicio && fecha <= fechaMaxima;
  }

  function eventosDeFecha(fecha){
    return eventos
      .filter(evento => evento.fecha === fecha)
      .sort((a,b)=>String(a.titulo||"").localeCompare(String(b.titulo||""),"es"));
  }

  function mensajeEventosDia(lista,cuando){
    if (!lista.length) {
      return cuando === "hoy"
        ? "Hoy no tienes eventos registrados. Disfruta tu día 😊"
        : "Mañana no tienes eventos registrados.";
    }
    if (lista.length === 1) {
      return `${lista[0].icono || "⭐"} ${lista[0].titulo}`;
    }
    return `${lista.length} eventos: ${lista.slice(0,3)
      .map(e=>`${e.icono || "⭐"} ${e.titulo}`).join(" · ")}`;
  }

  function actualizarRecordatorios(){
    const ahora = new Date();
    const manana = new Date(
      ahora.getFullYear(),ahora.getMonth(),ahora.getDate()+1
    );

    $("mensajeHoy").textContent =
      anioSeleccionado === ahora.getFullYear()
        ? mensajeEventosDia(eventosDeFecha(fechaLocalISO(ahora)),"hoy")
        : "Los recordatorios de hoy aparecen al volver al año actual.";

    $("mensajeManana").textContent =
      anioSeleccionado === manana.getFullYear()
        ? mensajeEventosDia(eventosDeFecha(fechaLocalISO(manana)),"mañana")
        : "Los recordatorios de mañana aparecen al volver al año actual.";

    const hoyISO = fechaLocalISO();
    const siguiente = eventos
      .filter(evento => evento.fecha >= hoyISO)
      .sort((a,b)=>a.fecha.localeCompare(b.fecha))[0];

    const destino = $("mensajeProximoEvento");
    if (destino) {
      destino.textContent = siguiente
        ? `${siguiente.icono || "⭐"} ${siguiente.titulo} · ${formatearFecha(siguiente.fecha)}`
        : "Sin eventos próximos.";
    }
  }

  function seleccionarIcono(icono="⭐"){
    $("eventoIcono").value = icono;
    document.querySelectorAll("[data-icono]").forEach(boton=>{
      boton.classList.toggle("seleccionado",boton.dataset.icono === icono);
    });
  }

  function renderCalendario(){
    const contenedor = $("gloriaMeses");
    const hoyISO = fechaLocalISO();
    contenedor.innerHTML = "";

    MESES.forEach(([mes,nombre])=>{
      const articulo = document.createElement("article");
      articulo.className = "gloria-mes";
      articulo.dataset.mes = String(mes);

      let celdas = DIAS
        .map(dia=>`<div class="gloria-dia-semana">${dia}</div>`)
        .join("");

      celdas += '<div class="gloria-dia vacio"></div>'.repeat(
        primerDiaLunes(anioSeleccionado,mes)
      );

      for (let dia=1; dia<=diasEnMes(anioSeleccionado,mes); dia++){
        const fecha = fechaISO(anioSeleccionado,mes,dia);
        const eventosDia = eventosDeFecha(fecha);
        const clases = ["gloria-dia"];

        if (fecha === hoyISO) clases.push("hoy");
        if (eventosDia.length) clases.push("tiene-evento");
        if (!fechaDentroRango(fecha)) clases.push("fuera-rango");

        const iconos = eventosDia
          .slice(0,2)
          .map(evento=>escapar(evento.icono || "⭐"))
          .join("");

        celdas += `
          <button
            type="button"
            class="${clases.join(" ")}"
            data-fecha="${fecha}"
            ${fechaDentroRango(fecha) ? "" : "disabled"}
            title="${eventosDia.length ? `${eventosDia.length} evento(s)` : fechaDentroRango(fecha) ? "Añadir evento" : "Fuera del rango disponible"}"
          >
            <span class="gloria-dia-numero">${dia}</span>
            ${iconos ? `<span class="gloria-dia-iconos">${iconos}</span>` : ""}
          </button>
        `;
      }

      articulo.innerHTML = `
        <div class="gloria-mes__titulo">
          <span>${nombre}</span>
          <small>${anioSeleccionado}</small>
        </div>
        <div class="gloria-mes__dias">${celdas}</div>
      `;
      contenedor.appendChild(articulo);
    });

    contenedor.querySelectorAll("[data-fecha]:not(:disabled)").forEach(boton=>{
      boton.addEventListener("click",()=>abrirModal(null,boton.dataset.fecha));
    });

    aplicarFiltroMes();
  }

  function eventosFiltrados(){
    let resultado = [...eventos].sort((a,b)=>a.fecha.localeCompare(b.fecha));

    if (filtroActual !== "todos") {
      resultado = resultado.filter(evento=>evento.categoria === filtroActual);
    }

    if (mesSeleccionado !== "todos") {
      resultado = resultado.filter(evento =>
        Number(evento.fecha.slice(5,7))-1 === Number(mesSeleccionado)
      );
    }

    return resultado;
  }

  function renderEventos(){
    const contenedor = $("gloriaEventos");
    const resultado = eventosFiltrados();
    contenedor.innerHTML = "";

    if (!resultado.length) {
      contenedor.innerHTML = `
        <div class="gloria-vacio">
          <div style="font-size:48px">✨</div>
          No hay eventos en esta selección.
        </div>`;
      actualizarResumen();
      return;
    }

    resultado.forEach(evento=>{
      const tarjeta = document.createElement("article");
      tarjeta.className =
        `gloria-evento ${evento.completado ? "completado" : ""}`;

      tarjeta.innerHTML = `
        <div class="gloria-evento-icono">${escapar(evento.icono || "⭐")}</div>
        <div class="gloria-evento-contenido">
          <span class="gloria-evento-categoria">${escapar(evento.categoria || "Especial")}</span>
          <h3>${escapar(evento.titulo)}</h3>
          <p>${formatearFecha(evento.fecha)}</p>
          ${evento.nota ? `<p>${escapar(evento.nota)}</p>` : ""}
        </div>
        <div class="gloria-evento-acciones">
          <button class="gloria-icon-btn" data-completar="${evento.id}" title="Completar">✅</button>
          <button class="gloria-icon-btn" data-editar="${evento.id}" title="Editar">✏️</button>
          <button class="gloria-icon-btn" data-eliminar="${evento.id}" title="Eliminar">🗑️</button>
        </div>`;

      contenedor.appendChild(tarjeta);
    });

    contenedor.querySelectorAll("[data-editar]").forEach(boton=>{
      boton.onclick = ()=>{
        const evento = eventos.find(item=>item.id === boton.dataset.editar);
        abrirModal(evento);
      };
    });

    contenedor.querySelectorAll("[data-eliminar]").forEach(boton=>{
      boton.onclick = ()=>eliminarEvento(boton.dataset.eliminar);
    });

    contenedor.querySelectorAll("[data-completar]").forEach(boton=>{
      boton.onclick = ()=>alternarCompletado(boton.dataset.completar);
    });

    actualizarResumen();
  }

  function actualizarResumen(){
    $("totalEventos").textContent = eventos.length;
    $("eventosCompletados").textContent =
      eventos.filter(e=>e.completado).length;
    $("eventosViajes").textContent =
      eventos.filter(e=>e.categoria === "Viaje").length;
    $("eventosLogros").textContent =
      eventos.filter(e=>e.categoria === "Logro").length;


  }

  function limitesInput(){
    const min = `${ANIO_ACTUAL}-01-01`;
    const max = fechaLocalISO(fechaMaxima);
    $("eventoFecha").min = min;
    $("eventoFecha").max = max;
  }

  function abrirModal(evento=null,fecha=""){
    const sugerida = evento?.fecha || fecha ||
      (
        anioSeleccionado === ANIO_ACTUAL
          ? fechaLocalISO()
          : `${anioSeleccionado}-01-01`
      );

    if (!evento && !fechaDentroRango(sugerida)) {
      alert("Esa fecha está fuera del rango disponible del calendario.");
      return;
    }

    $("eventoId").value = evento?.id || "";
    $("eventoTitulo").value = evento?.titulo || "";
    $("eventoFecha").value = sugerida;
    $("eventoCategoria").value = evento?.categoria || "Especial";
    seleccionarIcono(evento?.icono || "⭐");
    $("eventoNota").value = evento?.nota || "";
    $("modalTitulo").textContent = evento ? "Editar evento" : "Nuevo evento";

    $("modalEvento").classList.add("abierto");
    $("modalEvento").setAttribute("aria-hidden","false");
    $("eventoTitulo").focus();
  }

  function cerrarModal(){
    $("modalEvento").classList.remove("abierto");
    $("modalEvento").setAttribute("aria-hidden","true");
  }

  async function guardarEvento(ev){
    ev.preventDefault();

    const id = $("eventoId").value;
    const fecha = $("eventoFecha").value;

    if (!fechaDentroRango(fecha)) {
      alert("La fecha debe estar dentro del rango disponible del calendario.");
      return;
    }

    const anioEvento = Number(fecha.slice(0,4));
    const nuevo = {
      titulo:$("eventoTitulo").value.trim(),
      fecha,
      categoria:$("eventoCategoria").value,
      icono:$("eventoIcono").value.trim() || "⭐",
      nota:$("eventoNota").value.trim(),
      completado:eventos.find(e=>e.id === id)?.completado || false,
      anio:anioEvento
    };

    if (!nuevo.titulo || !nuevo.fecha) {
      alert("Escribe el título y la fecha.");
      return;
    }

    try {
      if (id) {
        await Academia.eventos.actualizar(id,nuevo);
      } else {
        await Academia.eventos.guardar(nuevo);
      }

      cerrarModal();

      if (anioEvento !== anioSeleccionado) {
        await cambiarAnio(anioEvento);
      }
    } catch(error) {
      console.error(error);
      alert(`No se pudo guardar el evento.\n${error.message}`);
    }
  }

  async function eliminarEvento(id){
    if (!confirm("¿Quieres eliminar este evento?")) return;
    try {
      await Academia.eventos.eliminar(id);
    } catch(error) {
      console.error(error);
      alert(`No se pudo eliminar el evento.\n${error.message}`);
    }
  }

  async function alternarCompletado(id){
    const evento = eventos.find(item=>item.id === id);
    if (!evento) return;

    try {
      await Academia.eventos.actualizar(id,{
        ...evento,
        completado:!evento.completado,
        anio:Number(evento.fecha.slice(0,4))
      });
    } catch(error) {
      console.error(error);
      alert(`No se pudo actualizar el evento.\n${error.message}`);
    }
  }

  function exportarCalendario(){
    const archivo = new Blob(
      [JSON.stringify(eventos,null,2)],
      {type:"application/json"}
    );
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(archivo);

    const slug = String(
      perfilActual?.nombreVisible || perfilActual?.nombre || "usuario"
    )
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g,"-")
      .replace(/^-+|-+$/g,"");

    enlace.download = `calendario-${slug || "usuario"}-${anioSeleccionado}.json`;
    enlace.click();
    URL.revokeObjectURL(enlace.href);
  }

  async function importarCalendario(archivo){
    try {
      const datos = JSON.parse(await archivo.text());
      if (!Array.isArray(datos)) {
        throw new Error("El archivo no contiene una lista de eventos.");
      }

      const validos = datos.filter(evento=>{
        const fecha = String(evento.fecha || "");
        return fecha.startsWith(`${anioSeleccionado}-`) &&
          fechaDentroRango(fecha);
      });

      if (!validos.length) {
        throw new Error(
          `No hay eventos válidos para ${anioSeleccionado} dentro del rango disponible.`
        );
      }

      if (!confirm(`Se importarán ${validos.length} evento(s). ¿Continuar?`)) {
        return;
      }

      for (const evento of validos) {
        await Academia.eventos.guardar({
          ...evento,
          id:undefined,
          anio:Number(evento.fecha.slice(0,4))
        });
      }

      alert("Calendario importado correctamente ✨");
    } catch(error) {
      console.error(error);
      alert(`El archivo no es válido.\n${error.message}`);
    }
  }

  function aplicarFiltroMes(){
    document.querySelectorAll(".gloria-mes").forEach(mes=>{
      mes.hidden =
        mesSeleccionado !== "todos" &&
        mes.dataset.mes !== mesSeleccionado;
    });
  }

  function renderCabecera(){
    $("tituloAnio").textContent = anioSeleccionado;
    $("tituloEventos").textContent = `Mis eventos de ${anioSeleccionado}`;
    $("selectorAnio").value = String(anioSeleccionado);

    $("anioAnterior").disabled = anioSeleccionado <= ANIO_ACTUAL;
    $("anioSiguiente").disabled = anioSeleccionado >= ANIO_MAXIMO;

    const nombre = perfilActual?.nombreVisible || perfilActual?.nombre || "";
    $("saludoCalendario").textContent = nombre
      ? `${nombre}, aquí puedes organizar tus días, planes y momentos importantes.`
      : "Tus días, tus planes y tus momentos importantes.";

    $("heroTitulo").textContent =
      anioSeleccionado === ANIO_ACTUAL
        ? "Tu año está en marcha ✨"
        : "Un nuevo año para soñar ✨";

    $("heroTexto").textContent =
      anioSeleccionado === ANIO_ACTUAL
        ? "Mira lo que viene y guarda los momentos que hacen especial este año."
        : `Puedes planificar y guardar momentos importantes de ${anioSeleccionado}.`;

    $("limiteCalendario").textContent =
      `Disponible hasta diciembre de ${ANIO_MAXIMO}`;
  }

  function refrescar(){
    renderCabecera();
    renderCalendario();
    renderEventos();
    actualizarRecordatorios();
  }

  function iniciarSincronizacion(){
    if (cancelarObservacion) {
      cancelarObservacion();
      cancelarObservacion = null;
    }

    const aviso = document.querySelector(".aviso-local");
    if (aviso) aviso.textContent =
      `☁️ Cargando eventos de ${anioSeleccionado}...`;

    cancelarObservacion = Academia.eventos.observar(
      anioSeleccionado,
      eventosFirestore=>{
        eventos = eventosFirestore;
        refrescar();
        if (aviso) {
          aviso.textContent =
            "☁️ Calendario sincronizado con Firestore. Tus eventos están disponibles en todos tus dispositivos.";
        }
      },
      error=>{
        console.error(error);
        if (aviso) {
          aviso.textContent =
            "⚠️ No se pudo conectar con Firestore. Revisa la conexión o los permisos.";
        }
      }
    );
  }

  async function cambiarAnio(anio){
    const nuevo = Number(anio);
    if (
      !Number.isInteger(nuevo) ||
      nuevo < ANIO_ACTUAL ||
      nuevo > ANIO_MAXIMO
    ) return;

    anioSeleccionado = nuevo;
    mesSeleccionado = "todos";
    $("selectorMes").value = "todos";
    eventos = [];
    renderCabecera();
    iniciarSincronizacion();
  }

  function configurarSelectorAnios(){
    const selector = $("selectorAnio");
    selector.innerHTML = "";

    for (let anio=ANIO_ACTUAL; anio<=ANIO_MAXIMO; anio++) {
      const option = document.createElement("option");
      option.value = String(anio);
      option.textContent = String(anio);
      selector.appendChild(option);
    }

    selector.value = String(anioSeleccionado);
  }

  document.addEventListener("DOMContentLoaded",async()=>{
    await auth.authStateReady();

    if (!auth.currentUser) {
      window.location.replace("/academia-gloria/login.html");
      return;
    }

    perfilActual = await obtenerPerfil();
    configurarSelectorAnios();
    limitesInput();

    $("nuevoEvento").onclick = ()=>abrirModal();
    $("cerrarModal").onclick = cerrarModal;
    $("cancelarModal").onclick = cerrarModal;
    $("formEvento").onsubmit = guardarEvento;
    $("exportarCalendario").onclick = exportarCalendario;

    $("importarCalendario").onchange = evento=>{
      const archivo = evento.target.files[0];
      if (archivo) importarCalendario(archivo);
      evento.target.value = "";
    };

    $("selectorMes").onchange = evento=>{
      mesSeleccionado = evento.target.value;
      aplicarFiltroMes();
      renderEventos();
    };

    $("selectorAnio").onchange = evento=>{
      cambiarAnio(evento.target.value);
    };

    $("anioAnterior").onclick = ()=>cambiarAnio(anioSeleccionado-1);
    $("anioSiguiente").onclick = ()=>cambiarAnio(anioSeleccionado+1);

    document.querySelectorAll("[data-filtro]").forEach(boton=>{
      boton.onclick = ()=>{
        document.querySelectorAll("[data-filtro]").forEach(item=>
          item.classList.remove("activo")
        );
        boton.classList.add("activo");
        filtroActual = boton.dataset.filtro;
        renderEventos();
      };
    });

    document.querySelectorAll("[data-icono]").forEach(boton=>{
      boton.onclick = ()=>seleccionarIcono(boton.dataset.icono);
    });

    $("eventoCategoria").onchange = ()=>{
      const mapa = {
        Cole:"🏫",Viaje:"✈️",Lectura:"📚",Logro:"🏆",
        Cumpleaños:"🎂",Examen:"📝",Festivo:"🎉",Médico:"🩺",
        Tarea:"📚",Actividad:"🎭",Especial:"⭐"
      };
      seleccionarIcono(mapa[$("eventoCategoria").value] || "⭐");
    };

    $("modalEvento").addEventListener("click",evento=>{
      if (evento.target === $("modalEvento")) cerrarModal();
    });

    renderCabecera();
    iniciarSincronizacion();
  });

  window.addEventListener("beforeunload",()=>{
    if (cancelarObservacion) cancelarObservacion();
  });
})();
