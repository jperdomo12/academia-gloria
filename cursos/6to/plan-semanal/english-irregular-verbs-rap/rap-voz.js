import { LectorTexto } from "../../../../compartido/js/lector-texto.js?v=2";

/* Selección/estado de la ayuda inglesa. Toda reproducción pasa por el LectorTexto existente. */
export function prepararVozRap(alCambiar) {
  let voz = null, velocidad = 1, secuencia = 0, reproduciendo = false;
  const sintesis = window.speechSynthesis;
  const emitir = mensaje => alCambiar({ disponible: Boolean(voz) && LectorTexto.disponible(), reproduciendo, mensaje, voz: voz ? `${voz.name} · ${voz.lang}` : '' });
  function elegirVoz() {
    const inglesas = (LectorTexto.disponible() ? (sintesis?.getVoices?.() || []) : []).filter(v => /^en(?:[-_]|$)/i.test(v.lang));
    voz = inglesas.find(v => /^en[-_]GB$/i.test(v.lang)) || inglesas.find(v => /^en[-_]US$/i.test(v.lang)) || inglesas[0] || null;
  }
  function revisar() {
    elegirVoz();
    if (!voz && reproduciendo) { secuencia++; LectorTexto.detener(); reproduciendo = false; }
    emitir(voz ? (reproduciendo ? 'Escuchando en inglés…' : 'Voz inglesa lista. Escuchad y repetid.') : 'No hay una voz inglesa disponible en este navegador. Podéis seguir practicando y escuchar el vídeo del cole.');
  }
  function detener(mensaje = '') {
    const estabaActiva = reproduciendo;
    secuencia++; LectorTexto.detener(); reproduciendo = false; emitir(voz ? (mensaje || (estabaActiva ? 'Escucha detenida.' : 'Voz inglesa lista. Escuchad y repetid.')) : 'No hay una voz inglesa disponible en este navegador. Podéis seguir practicando y escuchar el vídeo del cole.');
  }
  function escuchar(texto) {
    elegirVoz();
    if (!voz || !LectorTexto.disponible()) { revisar(); return false; }
    const token = ++secuencia;
    reproduciendo = true; emitir('Escuchando en inglés…');
    const terminar = mensaje => { if (token !== secuencia) return; reproduciendo = false; emitir(voz ? mensaje : 'No hay una voz inglesa disponible en este navegador. Podéis seguir practicando y escuchar el vídeo del cole.'); };
    const iniciada = LectorTexto.escuchar(texto, {
      idioma: voz.lang, voz, velocidad,
      alFinalizar: () => terminar('Escucha terminada. Ahora repetid vosotras.'),
      alError: () => terminar('No se pudo reproducir la voz. Podéis volver a probar o usar el vídeo del cole.')
    });
    if (!iniciada) terminar('No se pudo iniciar la voz. Podéis usar el vídeo del cole.');
    return iniciada;
  }
  sintesis?.addEventListener?.('voiceschanged', revisar);
  revisar();
  return {
    escuchar, detener,
    cambiarVelocidad(valor) { detener('Velocidad preparada para la próxima escucha.'); velocidad = valor === 'despacio' ? 0.8 : 1; }
  };
}
