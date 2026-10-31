/* Beat propio, efímero y sin muestras externas. El reloj de audio programa percusión
 * con 100 ms de anticipación; la UI sigue ese reloj, no determina el tempo musical. */
export const TEMPO_ENSAYO = 84;
export function crearBeatRap({ alPulso, alEstado, antesDeEmpezar }) {
  const Audio = window.AudioContext || window.webkitAudioContext;
  let contexto = null,
    salida = null,
    ruido = null,
    activo = false,
    generacion = 0;
  let reloj = null,
    proximo = 0,
    paso = 0,
    entrada = 0,
    soloVisual = !Audio;
  let transicion = Promise.resolve(),
    volumen = 0.35;
  const fuentes = new Set(),
    visuales = new Set();
  const ahora = () =>
    soloVisual ? performance.now() / 1000 : contexto.currentTime;
  const informar = (mensaje) => alEstado({ activo, soloVisual, mensaje });
  const ganancia = () => volumen * 0.35;
  function limpiar() {
    clearTimeout(reloj);
    reloj = null;
    visuales.forEach(clearTimeout);
    visuales.clear();
    if (salida) salida.gain.setValueAtTime(0, contexto.currentTime);
    for (const fuente of fuentes) {
      try {
        fuente.stop();
      } catch {
        /* ya terminada */
      }
    }
    fuentes.clear();
  }
  function detener(
    mensaje = "Beat parado. Puedes seguir ensayando o volver a empezarlo.",
  ) {
    generacion++;
    activo = false;
    limpiar();
    transicion = transicion
      .then(async () => {
        if (!activo && contexto?.state === "running") await contexto.suspend();
      })
      .catch(() => {});
    alPulso(null);
    informar(mensaje);
  }
  function sonido(tipo, tiempo) {
    const c = contexto,
      g = c.createGain();
    let fuente, filtro;
    const duracion = tipo === "bombo" ? 0.2 : tipo === "caja" ? 0.12 : 0.045;
    if (tipo === "bombo" || tipo === "cuenta") {
      fuente = c.createOscillator();
      fuente.type = "sine";
      fuente.frequency.setValueAtTime(tipo === "bombo" ? 145 : 740, tiempo);
      fuente.frequency.exponentialRampToValueAtTime(
        tipo === "bombo" ? 48 : 400,
        tiempo + duracion,
      );
      fuente.connect(g);
    } else {
      fuente = c.createBufferSource();
      fuente.buffer = ruido;
      filtro = c.createBiquadFilter();
      filtro.type = "highpass";
      filtro.frequency.value = tipo === "caja" ? 1300 : 6500;
      fuente.connect(filtro);
      filtro.connect(g);
    }
    const nivel =
      tipo === "bombo"
        ? 0.65
        : tipo === "caja"
          ? 0.34
          : tipo === "cuenta"
            ? 0.28
            : 0.11;
    g.gain.setValueAtTime(0.0001, tiempo);
    g.gain.linearRampToValueAtTime(nivel, tiempo + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, tiempo + duracion);
    g.connect(salida);
    fuentes.add(fuente);
    fuente.onended = () => {
      fuentes.delete(fuente);
      fuente.disconnect();
      filtro?.disconnect();
      g.disconnect();
    };
    fuente.start(tiempo);
    fuente.stop(tiempo + duracion + 0.01);
  }
  function programar(token) {
    if (!activo || token !== generacion) return;
    if (!soloVisual && contexto.state !== "running") {
      detener("El audio se ha interrumpido. Pulsa Empezar para retomarlo.");
      return;
    }
    // No reproducir de golpe pulsos atrasados después de una interrupción del hilo.
    if (proximo < ahora() - 0.15) {
      detener("El pulso se interrumpió. Vuelve a empezar cuando quieras.");
      return;
    }
    while (proximo < ahora() + 0.1) {
      const contando = entrada < 4;
      if (!soloVisual) {
        if (contando) sonido("cuenta", proximo);
        else {
          sonido("plato", proximo);
          if (paso === 0 || paso === 4) sonido("bombo", proximo);
          if (paso === 2 || paso === 6) sonido("caja", proximo);
        }
      }
      if (contando || paso % 2 === 0) {
        const pulso = {
          fase: contando ? "entrada" : "beat",
          numero: contando ? entrada + 1 : paso / 2 + 1,
        };
        const id = setTimeout(
          () => {
            visuales.delete(id);
            if (activo && token === generacion) alPulso(pulso);
          },
          Math.max(0, (proximo - ahora()) * 1000),
        );
        visuales.add(id);
      }
      proximo += 60 / TEMPO_ENSAYO / (contando ? 1 : 2);
      if (contando) entrada++;
      else paso = (paso + 1) % 8;
    }
    reloj = setTimeout(() => programar(token), 25);
  }
  function iniciar() {
    detener();
    const token = ++generacion;
    activo = true;
    antesDeEmpezar();
    informar("Preparando cuatro pulsos de entrada…");
    transicion = transicion
      .then(async () => {
        if (token !== generacion || !activo) return;
        try {
          if (!soloVisual) {
            if (!contexto) {
              contexto = new Audio();
              salida = contexto.createGain();
              salida.connect(contexto.destination);
              ruido = contexto.createBuffer(
                1,
                Math.ceil(contexto.sampleRate * 0.25),
                contexto.sampleRate,
              );
              const datos = ruido.getChannelData(0);
              let semilla = 41;
              for (let i = 0; i < datos.length; i++) {
                semilla = (semilla * 16807) % 2147483647;
                datos[i] = (semilla / 2147483647) * 2 - 1;
              }
            }
            await contexto.resume();
            if (token !== generacion || !activo) return;
            if (contexto.state !== "running")
              throw new Error("Audio no disponible");
            salida.gain.setValueAtTime(ganancia(), contexto.currentTime);
          }
        } catch {
          if (token !== generacion || !activo) return;
          limpiar();
          soloVisual = true;
          if (contexto?.state === "running")
            await contexto.suspend().catch(() => {});
        }
        if (token !== generacion || !activo) return;
        entrada = 0;
        paso = 0;
        proximo = ahora() + 0.05;
        informar(
          soloVisual
            ? "Audio no disponible. Sigue la cuenta y el pulso visual; la letra y el vídeo siguen disponibles."
            : "Cuatro pulsos de entrada y después beat de ensayo.",
        );
        programar(token);
      })
      .catch(() => {
        if (token === generacion)
          detener(
            "No se pudo iniciar el beat. Puedes seguir con la letra y el vídeo.",
          );
      });
  }
  informar(
    soloVisual
      ? "Sin Web Audio: puedes usar la cuenta y el pulso visual."
      : "Beat opcional · parado. Empieza solo cuando tú lo pulses.",
  );
  return {
    iniciar,
    detener,
    get activo() {
      return activo;
    },
    volumen(valor) {
      volumen = Math.min(1, Math.max(0, Number(valor) || 0));
      if (salida && activo)
        salida.gain.setTargetAtTime(ganancia(), contexto.currentTime, 0.015);
    },
  };
}
