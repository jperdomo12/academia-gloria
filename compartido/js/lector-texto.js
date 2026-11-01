/* ==========================================================
   Academia Gloria Valentina
   Lector de texto compartido
   Versión 1.2

   Capacidad transversal basada en Web Speech API.
   El módulo consumidor decide QUÉ texto debe escucharse.
   ========================================================== */

function motorDisponible() {
  return (
    typeof window !== "undefined" &&
    typeof window.speechSynthesis?.speak === "function" &&
    typeof window.speechSynthesis?.cancel === "function" &&
    typeof SpeechSynthesisUtterance !== "undefined"
  );
}

function idiomaSeguro(valor = "es-ES") {
  const idioma = String(valor || "").trim();

  if (!idioma) return "es-ES";
  if (/^es(?:-|$)/i.test(idioma)) return "es-ES";
  if (/^en(?:-|$)/i.test(idioma)) return "en-GB";

  return idioma;
}

function numeroSeguro(valor, minimo, maximo, alternativo) {
  const numero = Number(valor);
  if (!Number.isFinite(numero)) return alternativo;
  return Math.min(maximo, Math.max(minimo, numero));
}

function disponible() {
  return motorDisponible();
}

function detener() {
  if (!motorDisponible()) return false;
  window.speechSynthesis.cancel();
  return true;
}

function escuchar(
  texto,
  {
    idioma = "es-ES",
    velocidad = 0.84,
    tono = 1,
    volumen = 1,
    voz = null,
    alIniciar = null,
    alLimite = null,
    alFinalizar = null,
    alError = null
  } = {}
) {
  const contenido = String(texto || "").replace(/\s+/g, " ").trim();

  if (!contenido || !motorDisponible()) {
    return false;
  }

  detener();

  const lectura = new SpeechSynthesisUtterance(contenido);
  lectura.lang = voz?.lang || idiomaSeguro(idioma);
  if (voz) lectura.voice = voz;
  lectura.rate = numeroSeguro(velocidad, 0.5, 2, 0.84);
  lectura.pitch = numeroSeguro(tono, 0, 2, 1);
  lectura.volume = numeroSeguro(volumen, 0, 1, 1);

  if (typeof alIniciar === "function") lectura.addEventListener("start", alIniciar, { once: true });
  if (typeof alLimite === "function") lectura.addEventListener("boundary", alLimite);

  if (typeof alFinalizar === "function") {
    lectura.addEventListener("end", alFinalizar, { once: true });
  }

  if (typeof alError === "function") {
    lectura.addEventListener("error", alError, { once: true });
  }

  window.speechSynthesis.speak(lectura);
  return true;
}

export const LectorTexto = Object.freeze({
  disponible,
  escuchar,
  detener
});

export { disponible, escuchar, detener };
