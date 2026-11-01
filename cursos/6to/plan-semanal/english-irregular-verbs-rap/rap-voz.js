import { LectorTexto } from "../../../../compartido/js/lector-texto.js?v=3";

// Preferencias verificables por etiqueta de proveedor, no por pitch ni por género
// supuesto de un nombre cualquiera. Windows/Narrator y catálogo oficial Microsoft.
export const esVozFemeninaRap = v => /\bfemale\b/i.test(v.name) || (/\bmicrosoft\b/i.test(v.name) && /\b(Sonia|Libby|Hazel|Susan|Zira|Jenny|Aria|Catherine|Linda|Heera|Neerja)\b/i.test(v.name));
const idVoz = v => v.voiceURI || `${v.name}|${v.lang}`;

export function prepararVozRap(alCambiar, { velocidadInicial = 1 } = {}) {
  let voz = null, inglesas = [], preferida = '', velocidad = velocidadInicial, secuencia = 0, reproduciendo = false;
  const sintesis = window.speechSynthesis;
  const emitir = mensaje => alCambiar({ disponible: Boolean(voz) && LectorTexto.disponible(), reproduciendo, mensaje,
    voz: voz ? `${voz.name} · ${voz.lang}` : '', vozId: voz ? idVoz(voz) : '', femenina: Boolean(voz && esVozFemeninaRap(voz)),
    voces: inglesas.map(v => ({ id: idVoz(v), nombre: v.name, idioma: v.lang, femenina: esVozFemeninaRap(v) })) });
  function elegirVoz() {
    inglesas = (LectorTexto.disponible() ? (sintesis?.getVoices?.() || []) : []).filter(v => /^en(?:[-_]|$)/i.test(v.lang));
    const porIdioma = vs => vs.find(v => /^en[-_]GB$/i.test(v.lang)) || vs.find(v => /^en[-_]US$/i.test(v.lang)) || vs[0];
    voz = inglesas.find(v => idVoz(v) === preferida) || porIdioma(inglesas.filter(esVozFemeninaRap)) || porIdioma(inglesas) || null;
  }
  function revisar() {
    const anterior = voz ? idVoz(voz) : '';
    elegirVoz();
    if (reproduciendo && (!voz || idVoz(voz) !== anterior)) { secuencia++; LectorTexto.detener(); reproduciendo = false; }
    emitir(voz ? (reproduciendo ? 'Escuchando en inglés…' : 'Voz inglesa lista. Escuchad y repetid.') : 'No hay una voz inglesa disponible en este navegador. Podéis seguir practicando y escuchar el vídeo del cole.');
  }
  function detener(mensaje = '') {
    const estabaActiva = reproduciendo;
    secuencia++; LectorTexto.detener(); reproduciendo = false;
    emitir(voz ? (mensaje || (estabaActiva ? 'Escucha detenida.' : 'Voz inglesa lista. Escuchad y repetid.')) : 'No hay una voz inglesa disponible en este navegador. Podéis seguir practicando y escuchar el vídeo del cole.');
  }
  // Seguimiento solo por eventos reales del proveedor, siempre invalidado al cancelar.
  function escucharSecuencia(textos, { conBeat = false, alLinea = null, alPalabra = null } = {}) {
    elegirVoz();
    if (!voz || !LectorTexto.disponible()) { revisar(); return false; }
    const cola = textos.map(t => String(t || '').replace(/\s+/g, ' ').trim()).filter(Boolean);
    if (!cola.length) return false;
    document.dispatchEvent(new CustomEvent('rap:antes-voz', { detail: { conBeat } }));
    const token = ++secuencia;
    let posicion = 0;
    reproduciendo = true; emitir('Escuchando en inglés…');
    const terminar = mensaje => { if (token !== secuencia) return; secuencia++; reproduciendo = false; emitir(voz ? mensaje : 'No hay una voz inglesa disponible en este navegador. Podéis seguir practicando y escuchar el vídeo del cole.'); };
    function siguiente() {
      if (token !== secuencia) return false;
      const indice = posicion++, texto = cola[indice]; let empezada = false;
      const inicio = () => { if (token !== secuencia || indice !== posicion - 1 || empezada) return; empezada = true; alLinea?.({ indice, texto, total: cola.length, fase: 'inicio' }); };
      const iniciada = LectorTexto.escuchar(texto, {
        idioma: voz.lang, voz, velocidad,
        alIniciar: inicio,
        alLimite: e => { if (token !== secuencia || indice !== posicion - 1 || e.name !== 'word' || !Number.isInteger(e.charIndex) || e.charIndex < 0 || e.charIndex >= texto.length) return; inicio(); alPalabra?.({ indice, texto, charIndex: e.charIndex }); },
        alFinalizar: () => { if (token !== secuencia) return; alLinea?.({ indice, texto, total: cola.length, fase: 'fin' }); if (posicion < cola.length) siguiente(); else terminar('Escucha terminada. Ahora repetid vosotras.'); },
        alError: () => { if (indice === posicion - 1) terminar('No se pudo reproducir la voz. Podéis volver a probar o usar el vídeo del cole.'); }
      });
      if (!iniciada) terminar('No se pudo iniciar la voz. Podéis usar el vídeo del cole.');
      return iniciada;
    }
    return siguiente();
  }
  sintesis?.addEventListener?.('voiceschanged', revisar); revisar();
  return {
    escuchar: texto => escucharSecuencia([texto]), escucharSecuencia, detener,
    cambiarVelocidad(valor) { detener('Velocidad preparada para la próxima escucha.'); velocidad = valor === 'despacio' ? .8 : valor === 'agil' ? 1.12 : 1; },
    cambiarVoz(id) { detener(); preferida = inglesas.some(v => idVoz(v) === id) ? id : ''; revisar(); }
  };
}
