import { segmentarLinea } from "../trios.js";
import { SIGNIFICADOS_RAP, FAMILIAS_RAP } from "./rap-ayudas-data.js";
import { prepararVozRap } from "./rap-voz.js";

export const textoParaEscuchar = linea => segmentarLinea(linea).map(p => p.formas ? p.formas.join(', ') : p.texto).join('');

/* Ayudas del trío activo: una proyección de la fuente, no otro banco de verbos o juegos. */
export function crearApoyosRap(host, fragmentos, trios, { antesDeEscuchar, formaDeVoz }) {
  const zona = document.createElement('aside');
  zona.className = 'team-learning';
  zona.setAttribute('aria-label', 'Escuchar, comprender y conectar el RAP');
  zona.innerHTML = `
    <div class="team-audio-formas" aria-label="Escuchar formas concretas">${['Base','Past','Participle'].map((p,i)=>`<button type="button" data-team-audio="forma" data-forma-indice="${i}"><small>${p}</small><span lang="en"></span></button>`).join('')}</div>
    <div id="teamFrase" class="team-coro"><h3>🎤 La frase del RAP</h3><p class="team-ayuda">Decid juntas la línea completa, incluidas las formas entre paréntesis; no pronunciéis los signos.</p><p id="teamLinea" lang="en"></p></div>
    <div class="team-audio-actions"><button type="button" data-team-audio="trio">🔊 Escuchar trío</button><button type="button" data-team-audio="linea" aria-describedby="teamLinea">🔊 Escuchar frase</button><label>Velocidad<select id="teamVelocidad"><option value="normal">Normal</option><option value="despacio">Despacio</option></select></label><button type="button" id="teamVozParar" disabled>■ Detener voz</button></div>
    <p id="teamVozEstado" class="team-ayuda" role="status"></p><p class="team-audio-nota">Escuchad y repetid. Esta voz lee las palabras; el vídeo del cole da el ritmo y la interpretación.</p>
    <details id="teamSignificado" class="team-ayuda-detalle"><summary>🇪🇸 ¿Qué significa?</summary><p id="teamGlosa"></p><p id="teamContexto" class="team-ayuda" hidden></p></details>
    <details id="teamFamilia" class="team-ayuda-detalle"><summary id="teamFamiliaTitulo">🎧 Descubre la rima</summary><h4 id="teamFamiliaTipo"></h4><div id="teamPalabrasFamilia" class="team-familia-palabras" lang="en"></div><p id="teamFamiliaNota"></p><button type="button" data-team-audio="familia">🔊 Escuchar estos sonidos</button><p class="team-audio-nota">Es un truco del RAP para recordar, no una regla de cómo cambian los verbos.</p>
    <nav class="team-progresion" aria-label="De las palabras al RAP"><button type="button" data-team-paso="0" aria-pressed="true">1 · Verbos</button><button type="button" data-team-paso="1" aria-pressed="false">2 · Cadena</button><button type="button" data-team-paso="2" aria-pressed="false">3 · RAP</button></nav>
    <div id="teamPasoVerbos"><p>Empezad con un trío. Escuchad las formas y decid una por voz. Cambiad los papeles.</p></div>
    <div id="teamPasoCadena" hidden><p>Decid estos tríos seguidos, en este orden. Podéis escucharlos primero y repetir juntas.</p><div id="teamCadena" lang="en"></div><button type="button" data-team-audio="cadena">🔊 Escuchar cadena</button></div>
    <div id="teamPasoRap" hidden><p>Ahora, unidlo a la letra original de este fragmento. Decid también las formas entre paréntesis, sin pronunciar los signos.</p><div id="teamFragmentoLetra" lang="en"></div><button type="button" data-team-audio="fragmento">🔊 Escuchar fragmento</button><p class="team-audio-nota">Después, ensayad con el vídeo oficial del colegio para seguir su ritmo.</p></div></details>`;
  host.querySelector('#team-trio').append(zona);
  const $ = s => zona.querySelector(s);
  let actual = { indice: 0, modo: 'trio', baseLista: true, revelado: true };
  let clave = '', vozEstado = { disponible: false, reproduciendo: false };
  function actualizarBotones() {
    host.querySelectorAll('[data-team-audio]').forEach(b => { b.disabled = !vozEstado.disponible; });
    $('#teamVelocidad').disabled = !vozEstado.disponible;
    $('#teamVozParar').disabled = !vozEstado.reproduciendo;
    $('#teamVozEstado').textContent = vozEstado.mensaje || '';
  }
  const voz = prepararVozRap(estado => { vozEstado = estado; actualizarBotones(); });
  const t = () => trios[actual.indice];
  const familia = () => FAMILIAS_RAP[t().fragmentoIndice];
  const delFragmento = () => trios.filter(v => v.fragmentoIndice === t().fragmentoIndice);
  const cadena = () => familia().indices ? familia().indices.map(i => delFragmento()[i]) : delFragmento();
  const sonidos = () => cadena().map(v => v.formas[familia().forma || 0]);
  function paso(indice) {
    ['#teamPasoVerbos','#teamPasoCadena','#teamPasoRap'].forEach((s,i) => { $(s).hidden = i !== indice; });
    zona.querySelectorAll('[data-team-paso]').forEach((b,i) => b.setAttribute('aria-pressed', String(i === indice)));
  }
  function textoAudio(accion, boton) {
    if (accion === 'voz') return t().formas[formaDeVoz(Number(boton.dataset.vozIndice))];
    if (accion === 'forma') return t().formas[Number(boton.dataset.formaIndice)];
    if (accion === 'base') return t().formas[0];
    if (accion === 'trio') return t().formas.join('. ');
    if (accion === 'linea') return textoParaEscuchar(t().linea);
    if (accion === 'familia') return sonidos().join('. ');
    if (accion === 'cadena') return cadena().map(v => v.formas.join(', ')).join('. ');
    if (accion === 'fragmento') return fragmentos[t().fragmentoIndice].lineas.map(textoParaEscuchar).join(' ');
    return '';
  }
  host.addEventListener('click', e => {
    const b = e.target.closest('[data-team-audio]');
    if (!b || b.disabled) return;
    antesDeEscuchar(); voz.escuchar(textoAudio(b.dataset.teamAudio, b));
  });
  $('#teamVozParar').addEventListener('click', () => voz.detener());
  $('#teamVelocidad').addEventListener('change', e => voz.cambiarVelocidad(e.target.value));
  zona.querySelectorAll('[data-team-paso]').forEach(b => b.addEventListener('click', () => { voz.detener(); paso(Number(b.dataset.teamPaso)); }));
  return {
    detener: () => voz.detener(),
    actualizar(estado) {
      actual = estado;
      const visible = ['trio','ritmo'].includes(actual.modo) || (['respuesta','random'].includes(actual.modo) && actual.baseLista);
      zona.hidden = !visible;
      if (!visible) { clave = ''; $('#teamSignificado').open = false; $('#teamFamilia').open = false; return; }
      const nuevaClave = `${actual.modo}:${actual.indice}:${actual.revelado}`;
      if (nuevaClave !== clave) {
        const cambioMaterial = clave.split(':').slice(0,2).join(':') !== nuevaClave.split(':').slice(0,2).join(':');
        if (cambioMaterial) { voz.detener(); $('#teamSignificado').open = false; $('#teamFamilia').open = false; paso(0); }
        clave = nuevaClave;
        host.querySelector('#team-' + actual.modo).append(zona);
        $('.team-audio-formas').hidden = actual.modo === 'trio';
        zona.querySelectorAll('[data-forma-indice]').forEach((b,i) => {
          b.querySelector('span').textContent = `🔊 ${t().formas[i]}`;
          b.setAttribute('aria-label', `Escuchar ${t().formas[i]}`);
          b.hidden = i > 0 && !actual.revelado;
        });
        zona.querySelectorAll('[data-team-audio="trio"],[data-team-audio="linea"]').forEach(b => { b.hidden = !actual.revelado; });
        $('#teamFrase').hidden = !actual.revelado;
        $('#teamLinea').textContent = actual.revelado ? t().linea : '';
        const significado = SIGNIFICADOS_RAP[t().formas[0].toLowerCase()];
        $('#teamGlosa').textContent = significado.significado;
        $('#teamContexto').textContent = significado.contexto || '';
        $('#teamContexto').hidden = !significado.contexto;
        $('#teamFamilia').hidden = !actual.revelado;
        $('#teamFamiliaTitulo').textContent = familia().indices ? (familia().forma === 0 && familia().tipo === 'Una vocal que suena parecida' ? '🎧 Palabras que suenan parecidas' : '🎧 Descubre la rima') : '🎧 De las palabras a la frase';
        $('#teamFamiliaTipo').textContent = familia().tipo || 'Un fragmento de sonidos variados';
        $('#teamFamiliaNota').textContent = familia().nota;
        $('#teamPalabrasFamilia').textContent = familia().indices ? sonidos().join(' · ') : '';
        $('[data-team-audio="familia"]').hidden = !familia().indices;
        $('#teamCadena').replaceChildren();
        cadena().forEach(v => { const linea = document.createElement('p'); linea.textContent = v.formas.join(' → '); $('#teamCadena').append(linea); });
        $('#teamFragmentoLetra').replaceChildren();
        fragmentos[t().fragmentoIndice].lineas.forEach(texto => { const p = document.createElement('p'); p.textContent = texto; $('#teamFragmentoLetra').append(p); });
      }
      actualizarBotones();
    }
  };
}
