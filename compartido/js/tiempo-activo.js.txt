/**
 * Academia Gloria Valentina · Tiempo Activo
 *
 * Mide únicamente el tiempo real de trabajo:
 * - pausa cuando la pestaña queda oculta;
 * - pausa tras inactividad prolongada;
 * - reanuda al volver a interactuar.
 */
export function crearTiempoActivo({
  inactividadMs = 180000,
  onChange = null
} = {}){
  let iniciado = false;
  let detenido = false;
  let activo = false;
  let inicioTramo = 0;
  let acumuladoMs = 0;
  let segmentoActual = "actividad";
  const segmentosMs = {};
  let ultimaInteraccion = Date.now();

  const ahora = () => performance.now();

  function emitir(){
    if(typeof onChange === "function"){
      onChange(obtenerEstado());
    }
  }

  function acumular(){
    if(!activo) return;
    const fin = ahora();
    const delta = Math.max(0, fin - inicioTramo);
    acumuladoMs += delta;
    segmentosMs[segmentoActual] =
      Number(segmentosMs[segmentoActual] || 0) + delta;
    inicioTramo = fin;
  }

  function puedeEstarActivo(){
    return iniciado &&
      !detenido &&
      !document.hidden &&
      Date.now() - ultimaInteraccion < inactividadMs;
  }

  function reanudar(){
    if(activo || !puedeEstarActivo()) return;
    activo = true;
    inicioTramo = ahora();
    emitir();
  }

  function pausar(){
    if(!activo) return;
    acumular();
    activo = false;
    emitir();
  }

  function registrarInteraccion(){
    ultimaInteraccion = Date.now();
    if(!activo) reanudar();
  }

  function cambiarSegmento(nombre){
    const siguiente = String(nombre || "actividad");
    if(siguiente === segmentoActual) return;
    acumular();
    segmentoActual = siguiente;
    emitir();
  }

  function iniciar(nombre = "actividad"){
    if(iniciado && !detenido){
      cambiarSegmento(nombre);
      return;
    }
    iniciado = true;
    detenido = false;
    segmentoActual = String(nombre || "actividad");
    ultimaInteraccion = Date.now();
    reanudar();
  }

  function detener(){
    if(detenido) return obtenerResultado();
    pausar();
    detenido = true;
    emitir();
    return obtenerResultado();
  }

  function reiniciar(nombre = "actividad"){
    pausar();
    iniciado = false;
    detenido = false;
    activo = false;
    inicioTramo = 0;
    acumuladoMs = 0;
    segmentoActual = String(nombre || "actividad");
    Object.keys(segmentosMs).forEach(key => delete segmentosMs[key]);
    iniciar(segmentoActual);
  }

  function obtenerTotalMs(){
    if(!activo) return acumuladoMs;
    return acumuladoMs + Math.max(0, ahora() - inicioTramo);
  }

  function obtenerSegmentos(){
    const resultado = {...segmentosMs};
    if(activo){
      resultado[segmentoActual] =
        Number(resultado[segmentoActual] || 0) +
        Math.max(0, ahora() - inicioTramo);
    }
    return Object.fromEntries(
      Object.entries(resultado).map(([key,value]) => [
        key,
        Math.round(Number(value || 0) / 1000)
      ])
    );
  }

  function obtenerResultado(){
    return {
      tiempoActivoSegundos: Math.round(obtenerTotalMs() / 1000),
      tiempoActivoPorSegmento: obtenerSegmentos()
    };
  }

  function obtenerEstado(){
    return {
      iniciado,
      detenido,
      activo,
      segmentoActual,
      ...obtenerResultado()
    };
  }

  document.addEventListener("visibilitychange", () => {
    if(document.hidden) pausar();
    else registrarInteraccion();
  });

  ["pointerdown","keydown","touchstart"].forEach(eventName => {
    document.addEventListener(eventName, registrarInteraccion, {passive:true});
  });

  const monitor = window.setInterval(() => {
    if(activo && Date.now() - ultimaInteraccion >= inactividadMs){
      pausar();
    }
  }, 5000);

  window.addEventListener("pagehide", () => {
    pausar();
    window.clearInterval(monitor);
  }, {once:true});

  return Object.freeze({
    iniciar,
    pausar,
    reanudar,
    detener,
    reiniciar,
    cambiarSegmento,
    registrarInteraccion,
    obtenerEstado,
    obtenerResultado
  });
}
