export const ACTIVIDAD_ID = 'rincon-dictados';
export const META = 70;
export const ESTADOS = ['correcta', 'revisar', 'omitida', 'duda'];
export const textoFrase = fragmentos => fragmentos.join(' ');
export const palabrasFrase = fragmentos => textoFrase(fragmentos).split(/\s+/).filter(Boolean);
export const palabraSinSignos = palabra => palabra.replace(/^[¿¡«“"(]+|[.,;:!?»”")]+$/g, '');
export const textoCompleto = aventura => aventura.frases.map(textoFrase).join(' ');
export const fragmentosDe = aventura => aventura.frases.flat();

// La voz nombra los signos explícitamente. El texto de referencia no cambia.
export function paraDictar(texto) {
  return texto.replace(/¿/g, 'Abrimos interrogación. ')
    .replace(/¡/g, 'Abrimos exclamación. ')
    .replace(/,/g, '. Coma. ').replace(/;/g, '. Punto y coma. ')
    .replace(/:/g, '. Dos puntos. ').replace(/\?/g, '. Cerramos interrogación. ')
    .replace(/!/g, '. Cerramos exclamación. ')
    // Los puntos añadidos arriba no se vuelven a dictar.
    ;
}
export function vozFragmento(texto) {
  const puntoFinal = texto.endsWith('.');
  return paraDictar(puntoFinal ? texto.slice(0, -1) : texto) + (puntoFinal ? '. Punto.' : '');
}

export function nuevaSesion(aventura, intentoId, fecha = new Date().toISOString()) {
  return {
    version: 1, intentoId, aventuraId: aventura.id, versionAventura: aventura.version,
    fase: 'preparar', fragmento: 0, frase: 0, velocidad: '0.84', inicio: fecha,
    revision: aventura.frases.map(frase => ({
      palabras: palabrasFrase(frase).map(() => null), puntuacion: null, extras: 0
    })),
    acompanamiento: '', practica: [], correcciones: [], vistoModelo: false
  };
}

export function resultado(aventura, sesion) {
  const estados = sesion.revision.flatMap(frase => frase.palabras);
  const total = aventura.frases.reduce((n, frase) => n + palabrasFrase(frase).length, 0);
  const pendientes = estados.filter(e => !ESTADOS.includes(e) || e === 'duda').length;
  const signosPendientes = sesion.revision.some(f => !['correcta', 'revisar'].includes(f.puntuacion));
  const completa = estados.length === total && !pendientes && !signosPendientes;
  const correctas = estados.filter(e => e === 'correcta').length;
  return {
    completa, total, correctas, pendientes,
    porcentaje: completa && total ? Math.round(correctas / total * 100) : null,
    puntuacionRevisar: sesion.revision.filter(f => f.puntuacion === 'revisar').length,
    extras: sesion.revision.reduce((n, f) => n + (Number(f.extras) || 0), 0)
  };
}

export function validarBorrador(aventura, valor) {
  if (!aventura || valor?.version !== 1 || valor.versionAventura !== aventura.version
      || valor.aventuraId !== aventura.id || !/^[a-zA-Z0-9-]{12,80}$/.test(valor.intentoId || '')
      || !['preparar', 'dictar', 'terminar', 'revisar', 'resultado'].includes(valor.fase)
      || !Number.isInteger(valor.fragmento) || valor.fragmento < 0 || valor.fragmento >= fragmentosDe(aventura).length
      || !Number.isInteger(valor.frase) || valor.frase < 0 || valor.frase >= aventura.frases.length
      || !['0.65', '0.84', '1'].includes(valor.velocidad)
      || !Array.isArray(valor.revision) || valor.revision.length !== aventura.frases.length
      || !Array.isArray(valor.practica) || !Array.isArray(valor.correcciones)) return false;
  const claves = new Set(aventura.frases.flatMap((frase, fi) => palabrasFrase(frase).map((_, pi) => `${fi}:${pi}`)));
  if (valor.practica.length > 3 || !valor.practica.every(k => claves.has(k))
      || !valor.correcciones.every(k => valor.practica.includes(k))) return false;
  return valor.revision.every((f, i) => Array.isArray(f.palabras)
    && f.palabras.length === palabrasFrase(aventura.frases[i]).length
    && f.palabras.every(e => e === null || ESTADOS.includes(e))
    && [null, 'correcta', 'revisar', 'duda'].includes(f.puntuacion)
    && Number.isInteger(f.extras) && f.extras >= 0 && f.extras <= 99);
}

export function crearRegistro(aventura, sesion, identidad) {
  const r = resultado(aventura, sesion);
  if (!r.completa) throw new Error('Quedan palabras o signos por revisar. Puedes guardar un borrador.');
  if (!['sola', 'acompanada'].includes(sesion.acompanamiento)) throw new Error('Indica si revisaste a solas o con ayuda.');
  return {
    modo: 'aprendizaje', actividadId: ACTIVIDAD_ID,
    intentoId: sesion.intentoId, personaIdEsperada: identidad.personaId,
    actorUserIdEsperado: identidad.actorUserId,
    tituloActividad: aventura.titulo, versionActividad: aventura.version,
    cursoReferencia: '6to', materia: 'lengua', tema: 'Dictados', origen: 'rincon-dictados',
    misionId: '', vincularMision: false,
    inicioCliente: sesion.inicio, finCliente: new Date().toISOString(),
    conceptosTrabajados: [], respuestas: [],
    resumen: { tipoEvaluacion: 'autoevaluacion', dictado: {
      ...r, meta: META, nivel: aventura.nivel, aventuraId: aventura.id,
      acompanamiento: sesion.acompanamiento, velocidad: sesion.velocidad,
      textoOriginal: textoCompleto(aventura), frases: aventura.frases.map(textoFrase),
      revision: sesion.revision, practica: sesion.practica, correcciones: sesion.correcciones,
      vistoModelo: sesion.vistoModelo
    } },
    retroalimentacion: { mensaje: 'Revisión manual del cuaderno. El porcentaje mide palabras del texto; signos y añadidos se registran aparte.' }
  };
}
