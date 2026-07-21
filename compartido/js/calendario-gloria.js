/* Academia de Gloria Valentina | Calendario personal v1.0 */

(() => {
  const CLAVE = "academiaGloriaCalendario2025_2026";
  const MESES = [
    [2025,8,"Septiembre"],[2025,9,"Octubre"],[2025,10,"Noviembre"],
    [2025,11,"Diciembre"],[2026,0,"Enero"],[2026,1,"Febrero"],
    [2026,2,"Marzo"],[2026,3,"Abril"],[2026,4,"Mayo"],[2026,5,"Junio"]
  ];
  const DIAS = ["L","M","X","J","V","S","D"];

  const $ = id => document.getElementById(id);
  let filtroActual = "todos";

  function leerEventos(){
    try { return JSON.parse(localStorage.getItem(CLAVE)) || []; }
    catch { return []; }
  }

  function guardarEventos(eventos){
    localStorage.setItem(CLAVE, JSON.stringify(eventos));
  }

  function idNuevo(){
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function escapar(texto=""){
    return texto.replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    })[c]);
  }

  function primerDiaLunes(anio, mes){
    const d = new Date(anio, mes, 1).getDay();
    return d === 0 ? 6 : d - 1;
  }

  function diasEnMes(anio, mes){
    return new Date(anio, mes + 1, 0).getDate();
  }

  function iso(anio, mes, dia){
    return `${anio}-${String(mes+1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`;
  }

  function renderCalendario(){
    const cont = $("gloriaMeses");
    const eventos = leerEventos();
    const hoy = new Date().toISOString().slice(0,10);
    cont.innerHTML = "";

    MESES.forEach(([anio, mes, nombre]) => {
      const articulo = document.createElement("article");
      articulo.className = "gloria-mes";

      let celdas = DIAS.map(d => `<div class="gloria-dia-semana">${d}</div>`).join("");
      const vacios = primerDiaLunes(anio, mes);
      celdas += '<div class="gloria-dia vacio"></div>'.repeat(vacios);

      for(let dia=1; dia<=diasEnMes(anio, mes); dia++){
        const fecha = iso(anio, mes, dia);
        const tiene = eventos.some(e => e.fecha === fecha);
        const clases = ["gloria-dia"];
        if(fecha === hoy) clases.push("hoy");
        if(tiene) clases.push("tiene-evento");

        celdas += `<button type="button" class="${clases.join(" ")}" data-fecha="${fecha}" title="Añadir o ver eventos">${dia}</button>`;
      }

      articulo.innerHTML = `
        <div class="gloria-mes__titulo">${nombre} ${anio}</div>
        <div class="gloria-mes__dias">${celdas}</div>
      `;
      cont.appendChild(articulo);
    });

    cont.querySelectorAll("[data-fecha]").forEach(btn => {
      btn.addEventListener("click", () => abrirModal(null, btn.dataset.fecha));
    });
  }

  function renderEventos(){
    const cont = $("gloriaEventos");
    let eventos = leerEventos().sort((a,b) => a.fecha.localeCompare(b.fecha));

    if(filtroActual !== "todos"){
      eventos = eventos.filter(e => e.categoria === filtroActual);
    }

    cont.innerHTML = "";

    if(!eventos.length){
      cont.innerHTML = `<div class="gloria-vacio">Todavía no hay eventos en esta categoría ✨</div>`;
      actualizarResumen();
      return;
    }

    eventos.forEach(evento => {
      const tarjeta = document.createElement("article");
      tarjeta.className = `gloria-evento ${evento.completado ? "completado" : ""}`;

      tarjeta.innerHTML = `
        <div class="gloria-evento-icono">${escapar(evento.icono || "⭐")}</div>
        <div>
          <h3>${escapar(evento.titulo)}</h3>
          <p>${formatearFecha(evento.fecha)} · ${escapar(evento.categoria)}</p>
          ${evento.nota ? `<p>${escapar(evento.nota)}</p>` : ""}
        </div>
        <div class="gloria-evento-acciones">
          <button class="gloria-icon-btn" data-completar="${evento.id}" title="Marcar como completado">✅</button>
          <button class="gloria-icon-btn" data-editar="${evento.id}" title="Editar">✏️</button>
          <button class="gloria-icon-btn" data-eliminar="${evento.id}" title="Eliminar">🗑️</button>
        </div>
      `;
      cont.appendChild(tarjeta);
    });

    cont.querySelectorAll("[data-editar]").forEach(b => {
      b.onclick = () => {
        const evento = leerEventos().find(e => e.id === b.dataset.editar);
        abrirModal(evento);
      };
    });

    cont.querySelectorAll("[data-eliminar]").forEach(b => {
      b.onclick = () => eliminarEvento(b.dataset.eliminar);
    });

    cont.querySelectorAll("[data-completar]").forEach(b => {
      b.onclick = () => alternarCompletado(b.dataset.completar);
    });

    actualizarResumen();
  }

  function formatearFecha(fecha){
    return new Date(`${fecha}T12:00:00`).toLocaleDateString("es-ES", {
      day:"numeric", month:"long", year:"numeric"
    });
  }

  function actualizarResumen(){
    const eventos = leerEventos();
    $("totalEventos").textContent = eventos.length;
    $("eventosCompletados").textContent = eventos.filter(e => e.completado).length;
    $("eventosViajes").textContent = eventos.filter(e => e.categoria === "Viaje").length;
    $("eventosLogros").textContent = eventos.filter(e => e.categoria === "Logro").length;
  }

  function abrirModal(evento=null, fecha=""){
    $("eventoId").value = evento?.id || "";
    $("eventoTitulo").value = evento?.titulo || "";
    $("eventoFecha").value = evento?.fecha || fecha || new Date().toISOString().slice(0,10);
    $("eventoCategoria").value = evento?.categoria || "Especial";
    $("eventoIcono").value = evento?.icono || "⭐";
    $("eventoNota").value = evento?.nota || "";
    $("modalTitulo").textContent = evento ? "Editar evento" : "Nuevo evento";
    $("modalEvento").classList.add("abierto");
    $("eventoTitulo").focus();
  }

  function cerrarModal(){
    $("modalEvento").classList.remove("abierto");
  }

  function guardarEvento(ev){
    ev.preventDefault();
    const eventos = leerEventos();
    const id = $("eventoId").value || idNuevo();

    const nuevo = {
      id,
      titulo: $("eventoTitulo").value.trim(),
      fecha: $("eventoFecha").value,
      categoria: $("eventoCategoria").value,
      icono: $("eventoIcono").value.trim() || "⭐",
      nota: $("eventoNota").value.trim(),
      completado: eventos.find(e => e.id === id)?.completado || false
    };

    if(!nuevo.titulo || !nuevo.fecha){
      alert("Escribe el título y la fecha.");
      return;
    }

    const idx = eventos.findIndex(e => e.id === id);
    if(idx >= 0) eventos[idx] = nuevo;
    else eventos.push(nuevo);

    guardarEventos(eventos);
    cerrarModal();
    refrescar();
  }

  function eliminarEvento(id){
    if(!confirm("¿Quieres eliminar este evento?")) return;
    guardarEventos(leerEventos().filter(e => e.id !== id));
    refrescar();
  }

  function alternarCompletado(id){
    const eventos = leerEventos();
    const evento = eventos.find(e => e.id === id);
    if(evento) evento.completado = !evento.completado;
    guardarEventos(eventos);
    refrescar();
  }

  function exportar(){
    const blob = new Blob([JSON.stringify(leerEventos(), null, 2)], {type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "calendario-gloria-2025-2026.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function importar(archivo){
    try{
      const datos = JSON.parse(await archivo.text());
      if(!Array.isArray(datos)) throw new Error();
      guardarEventos(datos);
      refrescar();
      alert("Calendario importado correctamente ✨");
    }catch{
      alert("El archivo no es válido.");
    }
  }

  function refrescar(){
    renderCalendario();
    renderEventos();
  }

  document.addEventListener("DOMContentLoaded", () => {
    $("nuevoEvento").onclick = () => abrirModal();
    $("cerrarModal").onclick = cerrarModal;
    $("cancelarModal").onclick = cerrarModal;
    $("formEvento").onsubmit = guardarEvento;
    $("exportarCalendario").onclick = exportar;
    $("importarCalendario").onchange = e => {
      const archivo = e.target.files[0];
      if(archivo) importar(archivo);
      e.target.value = "";
    };

    document.querySelectorAll("[data-filtro]").forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll("[data-filtro]").forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");
        filtroActual = btn.dataset.filtro;
        renderEventos();
      };
    });

    $("modalEvento").addEventListener("click", e => {
      if(e.target === $("modalEvento")) cerrarModal();
    });

    refrescar();
  });
})();
