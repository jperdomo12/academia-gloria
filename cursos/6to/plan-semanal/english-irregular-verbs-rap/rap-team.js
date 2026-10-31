import { extraerTrios } from "../trios.js";
import { crearApoyosRap } from "./rap-apoyos.js?v=3";

/* Estudio efímero. Una única fuente escolar; sin medios, evaluación o almacenamiento. */
export function iniciarRapTeam(host, fragmentos) {
  if (!host) return;
  const trios = extraerTrios(fragmentos);
  if (!trios.length) return;
  const voces = ['A', 'B', 'C'];
  const papeles = ['Base', 'Past', 'Participle'];
  const modos = [
    ['trio', '👭', 'Modo trío', 'Una forma por voz'], ['ritmo', '👏', 'Ritmo', 'Tres formas y una palma'], ['respuesta', '🎤', 'Call & Response', 'Mirad la base y responded'],
    ['random', '🎲', 'Random RAP', 'Un verbo sorpresa'], ['retos', '⭐', 'Retos de equipo', 'Jugad como equipo'], ['ensayo', '🎬', 'Ensayo final', 'Preparad el vídeo']
  ];
  const retos = [
    'Decid cinco tríos seguidos sin mirar. Después, mostrad las formas y comparad juntas.',
    'Cada compañera dice una forma distinta. Continuad juntas la frase del RAP.',
    'Cambiad los papeles y repetid el mismo trío: las tres practicáis las tres posiciones.',
    'Elegid un fragmento y decidlo completo sin deteneros. Podéis repetirlo todas las veces que queráis.',
    'Decid primero el trío; después, continuad juntas la frase del RAP.'
  ];
  const mic = '<svg viewBox="0 0 32 40" aria-hidden="true"><rect x="10" y="2" width="12" height="23" rx="6"/><path d="M5 18v3a11 11 0 0022 0v-3M16 32v6M9 38h14"/></svg>';
  host.innerHTML = `
    <header class="team-header"><div><p class="team-eyebrow">3 VOCES · UN EQUIPO</p><h2 id="teamTitulo">RAP TEAM</h2><p class="team-subtitle">Ensayad juntas</p><p>Repartid las formas, cambiad papeles y encontrad vuestro ritmo.</p></div><div class="team-mics" aria-hidden="true">${voces.map(v => `<span>${mic}<b>${v}</b></span>`).join('')}</div></header>
    <details id="teamComo" class="team-como" open><summary>❓ ¿Cómo usamos RAP Team?</summary><ol class="team-primeros"><li><b>1 · Repartid las formas</b><span>Elegid Voz A, B y C. Una dice Base, otra Past y otra Participle.</span></li><li><b>2 · Cambiad los papeles</b><span>Repetid el trío: las tres practicáis todas las formas.</span></li><li><b>3 · Jugad y ensayad</b><span>Probad Ritmo, Call & Response, Random RAP y Retos.</span></li><li><b>4 · Juntadlo todo</b><span>Terminad en Ensayo final con el vídeo del cole.</span></li></ol><p>En la letra, decid también las formas entre paréntesis. Los signos no se pronuncian.</p><button type="button" id="teamEmpezar">▶ Empezar por Modo trío</button></details>
    <nav class="team-modos" aria-label="Experiencias de RAP Team">${modos.map(([id, icono, titulo, ayuda]) => `<button type="button" data-team-modo="${id}" aria-controls="team-${id}" aria-pressed="false"><span aria-hidden="true">${icono}</span><span class="team-modo-texto">${titulo}<small>${ayuda}</small></span></button>`).join('')}</nav>
    <div class="team-content">
    <details class="team-seleccion"><summary id="teamSeleccionResumen">Cambiar fragmento o trío</summary><div class="team-select-fields"><label>Fragmento para ensayar<select id="teamFragmento"></select></label><label>Trío del fragmento<select id="teamTrio"></select></label></div></details>
    <section id="team-trio" class="team-panel" aria-label="Modo trío"><p class="team-instruccion">Elegid quién será Voz A, B y C. Decid Base → Past → Participle, en ese orden. Después, leed juntas la frase de abajo.</p><div class="team-voces" aria-label="Tres voces equivalentes" tabindex="-1">${voces.map((v, i) => `<article class="team-voz" data-voz="${v}"><h3>Voz ${v}</h3><span class="team-papel"></span><strong class="team-forma" lang="en"></strong><button type="button" class="team-card-audio" data-team-audio="voz" data-voz-indice="${i}">🔊 Oír</button></article>`).join('')}</div><div class="team-actions"><button type="button" id="teamRotar">🔄 Cambiar papeles</button><button type="button" id="teamOtroTrio">Otro trío →</button></div><p id="teamRolesEstado" class="team-ayuda" role="status"></p></section>
    <section id="team-ritmo" class="team-panel" aria-label="Reto de ritmo" hidden><h3>Cuatro pulsos. Un trío.</h3><p>Las tres juntas: decid una forma en cada pulso y terminad con una palma. Podéis marcarlo con manos, mesa o pies.</p><div class="team-pulsos">${[...papeles, 'Palma'].map((p, i) => `<div class="team-pulso" data-pulso="${i}"><span class="team-numero">${i + 1}</span><b>${p}</b><strong lang="en"></strong></div>`).join('')}</div><p id="teamPulsoEstado" class="team-ayuda" role="status">Pulsad Empezar o avanzad un pulso cada vez.</p><div class="team-actions"><button type="button" id="teamPulsoInicio">▶ Empezar pulso</button><button type="button" id="teamPulsoParar" disabled>■ Detener</button><button type="button" id="teamPulsoManual">Un pulso →</button></div><p class="team-referencia">Este ritmo es entrenamiento. Para preparar la grabación final, utilizad el vídeo oficial del cole como referencia de ritmo.</p></section>
    <section id="team-respuesta" class="team-panel" aria-label="Call and response" hidden><h3>Mirad la base. Responded juntas.</h3><p>Tras la cuenta atrás, decid en voz alta el pasado y el participio. Después, comprobad mirando.</p><div id="teamLlamada" class="team-llamada" role="status">¿Preparadas?</div><div class="team-actions"><button type="button" id="teamCuenta">3 · 2 · 1… ¡Vamos!</button><button type="button" id="teamCuentaParar" disabled>■ Detener cuenta</button></div><div class="team-actions"><button type="button" id="teamComprobar" disabled>👀 Comprobar</button><button type="button" id="teamRespuestaSiguiente">Siguiente →</button></div><p id="teamSolucion" class="team-solucion" lang="en" hidden></p></section>
    <section id="team-random" class="team-panel" aria-label="Random RAP" hidden><div class="team-random-intro"><span class="team-dado" aria-hidden="true">⚄</span><div><h3>¿Qué trío os tocará?</h3><p>Puede salir cualquiera de los ${trios.length} tríos del RAP. Decid juntas las dos formas que faltan. Después, pulsad Revelar para comparar.</p></div></div><button type="button" id="teamSorpresa" class="team-big-action">🎲 ¡Sorpréndenos!</button><div class="team-random-cue" id="teamAzar" lang="en" role="status"><span class="team-azar-forma"><small>Base</small><strong></strong></span><span class="team-azar-forma"><small>Past</small><strong></strong></span><span class="team-azar-forma"><small>Participle</small><strong></strong></span></div><button type="button" id="teamRevelar" disabled>👀 Revelar</button></section>
    <section id="team-retos" class="team-panel" aria-label="Retos de equipo" hidden><h3>Un pequeño reto para las tres</h3><p>Elegid cuándo probarlo y repetidlo como queráis.</p><div class="team-reto"><span aria-hidden="true">✦</span><p id="teamReto" role="status"></p></div><div class="team-actions"><button type="button" id="teamNuevoReto">⭐ Otro reto</button><button type="button" data-team-ir="trio">Probar en Modo trío →</button></div></section>
    <section id="team-ensayo" class="team-panel" aria-label="Ensayo final" hidden><h3>🎬 ¿Preparadas para ensayar?</h3><ol class="team-guia"><li>Elegid un fragmento para calentar.</li><li>Haced una ronda Base → Past → Participle.</li><li>Cambiad los papeles.</li><li>Abrid el vídeo oficial del colegio.</li><li>Ensayad el RAP juntas.</li><li>Haced una toma de prueba.</li><li>Cuando estéis conformes, preparad la toma final.</li></ol><p class="team-referencia">El vídeo del colegio es la referencia de ritmo para la grabación final.</p><div class="team-actions"><a id="teamVideo" target="_blank" rel="noopener noreferrer">▶ Vídeo oficial del cole ↗</a><button type="button" id="teamReady">🔥 ¡Listas para ensayar!</button></div><p class="team-referencia">En RAP Team repartís las formas para practicar. En RAP Studio ensayáis el tramo real que os corresponde en el vídeo.</p><div class="team-actions"><a href="#graba">🎬 Ir a RAP Studio · preparar mi parte →</a></div><div id="teamCelebracion" class="team-celebracion" role="status" hidden><strong>🔥 RAP TEAM READY!</strong><p>Tres voces, un equipo preparado para ensayar. ¡Ahora, a practicar juntas con el vídeo del cole!</p></div></section>
    </div>`;
  const $ = s => host.querySelector(s);
  let apoyos = null;
  let indice = 0, rotacion = 0, modo = 'trio', pulso = -1, ritmoActivo = false;
  let cuenta = null, respuestaLista = false, respuestaVisible = false, azarIniciado = false, azarVisible = false;
  let reto = 0, temporizador = null;
  const pararReloj = () => { clearTimeout(temporizador); temporizador = null; ritmoActivo = false; cuenta = null; };
  const textoTrio = () => trios[indice].formas.join(' → ');

  function pintarPulso() {
    host.querySelectorAll('[data-pulso]').forEach((e, i) => {
      const activo = i === pulso;
      e.classList.toggle('is-active', activo);
      e.setAttribute('aria-current', activo ? 'step' : 'false');
    });
    $('#teamPulsoInicio').disabled = ritmoActivo;
    $('#teamPulsoParar').disabled = !ritmoActivo;
    $('#teamPulsoEstado').textContent = pulso < 0 ? 'Pulsad Empezar o avanzad un pulso cada vez.' : `Ahora: ${pulso + 1} · ${pulso < 3 ? papeles[pulso] + ' · ' + trios[indice].formas[pulso] : '¡Palma!'}`;
  }
  function actualizarApoyos() {
    apoyos?.actualizar({ indice, modo, baseLista: modo === 'respuesta' ? respuestaLista : modo === 'random' ? azarIniciado : true, revelado: modo === 'respuesta' ? respuestaVisible : modo === 'random' ? azarVisible : true });
  }
  function pintarRespuesta() {
    $('#teamLlamada').textContent = cuenta !== null ? String(cuenta) : respuestaLista ? trios[indice].formas[0] + '!' : '¿Preparadas?';
    $('#teamLlamada').classList.toggle('is-calling', respuestaLista);
    $('#teamLlamada').lang = respuestaLista ? 'en' : 'es';
    $('#teamCuenta').disabled = cuenta !== null;
    $('#teamCuentaParar').disabled = cuenta === null;
    $('#teamComprobar').disabled = !respuestaLista || respuestaVisible;
    $('#teamSolucion').hidden = !respuestaVisible;
    $('#teamSolucion').textContent = respuestaVisible ? textoTrio() : '';
    actualizarApoyos();
  }
  function pintar() {
    const t = trios[indice];
    $('#teamFragmento').value = String(t.fragmentoIndice);
    $('#teamSeleccionResumen').textContent = `Fragmento ${t.fragmentoIndice + 1} · ${t.formas[0]} · Cambiar`;
    const selector = $('#teamTrio');
    if (selector.dataset.fragmento !== String(t.fragmentoIndice)) {
      selector.replaceChildren();
      trios.forEach((p, i) => {
        if (p.fragmentoIndice !== t.fragmentoIndice) return;
        const op = document.createElement('option'); op.value = String(i); op.textContent = p.formas[0]; selector.append(op);
      });
      selector.dataset.fragmento = String(t.fragmentoIndice);
    }
    selector.value = String(indice);
    host.querySelectorAll('.team-voz').forEach((e, i) => {
      const papel = (i + rotacion) % 3;
      e.querySelector('.team-papel').textContent = papeles[papel];
      e.querySelector('.team-forma').textContent = t.formas[papel];
      e.querySelector('.team-card-audio').setAttribute('aria-label', `Escuchar ${t.formas[papel]}`);
    });
    $('#teamRolesEstado').textContent = 'Orden para decir el trío: ' + papeles.map((papel, i) => `Voz ${voces[(i - rotacion + 3) % 3]} (${papel})`).join(' → ');
    host.querySelectorAll('.team-pulso strong').forEach((e, i) => { e.textContent = i < 3 ? t.formas[i] : '👏'; });
    pintarPulso(); pintarRespuesta();
    $('#teamAzar').querySelectorAll('strong').forEach((e, i) => { e.textContent = !azarIniciado ? (i ? '?' : '…') : (i === 0 || azarVisible ? t.formas[i] : '?'); });
    $('#teamRevelar').disabled = !azarIniciado || azarVisible;
    $('#teamSorpresa').textContent = azarIniciado ? '🎲 Otro' : '🎲 ¡Sorpréndenos!';
    $('#teamReto').textContent = retos[reto];
    actualizarApoyos();
  }
  function seleccionar(i) {
    apoyos?.detener(); pararReloj(); pulso = -1; respuestaLista = false; respuestaVisible = false; azarVisible = false;
    indice = i; pintar();
  }
  function elegirModo(nuevo) {
    apoyos?.detener(); pararReloj(); pulso = -1; respuestaLista = false; respuestaVisible = false;
    modo = nuevo;
    modos.forEach(([id]) => { $('#team-' + id).hidden = id !== modo; });
    host.querySelectorAll('[data-team-modo]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.teamModo === modo)));
    $('.team-seleccion').hidden = !['trio', 'ritmo', 'respuesta'].includes(modo);
    pintar();
  }
  const sinRepetir = (longitud, anterior) => (anterior + 1 + Math.floor(Math.random() * (longitud - 1))) % longitud;
  fragmentos.forEach((f, i) => {
    const op = document.createElement('option'); op.value = String(i); op.textContent = `${i + 1} · ${f.titulo}`; $('#teamFragmento').append(op);
  });
  $('#teamFragmento').addEventListener('change', e => seleccionar(trios.findIndex(t => t.fragmentoIndice === Number(e.target.value))));
  $('#teamTrio').addEventListener('change', e => seleccionar(Number(e.target.value)));
  host.querySelectorAll('[data-team-modo]').forEach(b => b.addEventListener('click', () => { $('#teamComo').open = false; elegirModo(b.dataset.teamModo); }));
  $('[data-team-ir]').addEventListener('click', () => { elegirModo('trio'); $('[data-team-modo="trio"]').focus(); });
  $('#teamRotar').addEventListener('click', () => {
    apoyos?.detener(); rotacion = (rotacion + 1) % 3; pintar();
    $('.team-voces').classList.remove('team-rotate'); void $('.team-voces').offsetWidth; $('.team-voces').classList.add('team-rotate');
  });
  $('#teamOtroTrio').addEventListener('click', () => { rotacion = (rotacion + 1) % 3; seleccionar((indice + 1) % trios.length); });
  $('#teamRespuestaSiguiente').addEventListener('click', () => seleccionar((indice + 1) % trios.length));
  $('#teamPulsoInicio').addEventListener('click', () => {
    apoyos?.detener(); pararReloj(); ritmoActivo = true; pulso = 0; pintarPulso();
    const tick = () => { pulso = (pulso + 1) % 4; pintarPulso(); temporizador = setTimeout(tick, 900); };
    temporizador = setTimeout(tick, 900);
  });
  $('#teamPulsoParar').addEventListener('click', () => { pararReloj(); pulso = -1; pintarPulso(); });
  $('#teamPulsoManual').addEventListener('click', () => { pararReloj(); pulso = (pulso + 1) % 4; pintarPulso(); });
  $('#teamCuenta').addEventListener('click', () => {
    apoyos?.detener(); pararReloj(); cuenta = 3; respuestaLista = false; respuestaVisible = false; pintarRespuesta();
    const tick = () => {
      if (cuenta > 1) { cuenta--; temporizador = setTimeout(tick, 1000); }
      else { cuenta = null; respuestaLista = true; temporizador = null; }
      pintarRespuesta();
    };
    temporizador = setTimeout(tick, 1000);
  });
  $('#teamCuentaParar').addEventListener('click', () => { pararReloj(); pintarRespuesta(); });
  $('#teamComprobar').addEventListener('click', () => { respuestaVisible = true; pintarRespuesta(); });
  $('#teamSorpresa').addEventListener('click', () => {
    const candidatos = trios.map((t, i) => ({ t, i })).filter(({ t }) => t.formas.join('|') !== trios[indice].formas.join('|'));
    const siguiente = candidatos[Math.floor(Math.random() * candidatos.length)].i;
    azarIniciado = true; seleccionar(siguiente);
    $('#teamAzar').classList.remove('team-reveal'); void $('#teamAzar').offsetWidth; $('#teamAzar').classList.add('team-reveal');
  });
  $('#teamRevelar').addEventListener('click', () => { azarVisible = true; pintar(); });
  $('#teamNuevoReto').addEventListener('click', () => { reto = sinRepetir(retos.length, reto); pintar(); });
  $('#teamVideo').href = document.querySelector('#escucha a[target="_blank"]').href;
  $('#teamReady').addEventListener('click', () => {
    const e = $('#teamCelebracion'); e.hidden = false; e.classList.remove('team-ready'); void e.offsetWidth; e.classList.add('team-ready');
  });
  function detenerTodo() { apoyos?.detener(); pararReloj(); pulso = -1; pintarPulso(); pintarRespuesta(); }
  window.addEventListener('pagehide', detenerTodo);
  document.addEventListener('visibilitychange', () => { if (document.hidden) detenerTodo(); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([e]) => { if (!e.isIntersecting) detenerTodo(); });
    observer.observe(host);
  }
  apoyos = crearApoyosRap(host, fragmentos, trios, {
    antesDeEscuchar() { pararReloj(); pulso = -1; pintarPulso(); pintarRespuesta(); },
    formaDeVoz: i => (i + rotacion) % 3
  });
  $('#teamEmpezar').addEventListener('click', () => {
    $('#teamComo').open = false; elegirModo('trio');
    $('.team-voces').focus({ preventScroll: true });
    $('#team-trio').scrollIntoView({ block: 'start', behavior: 'auto' });
  });
  elegirModo('trio');
  return { detener: detenerTodo, practicarTrio(i) { if (!trios[i]) return; elegirModo('trio'); seleccionar(i); $('.team-voces').focus({ preventScroll: true }); host.scrollIntoView({ block: 'start', behavior: 'auto' }); } };
}
