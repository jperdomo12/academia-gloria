import { AVENTURAS, porId } from './aventuras.js';
import { ACTIVIDAD_ID, META, nuevaSesion, textoCompleto, fragmentosDe, palabrasFrase,
  palabraSinSignos, vozFragmento, resultado, validarBorrador, crearRegistro } from './modelo.js';
import { LectorTexto } from '../../compartido/js/lector-texto.js';
import { mostrarCelebracion } from '../../compartido/js/celebracion.js';

const $ = id => document.getElementById(id);
const html = valor => String(valor ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const parametros = new URLSearchParams(location.search);
const preview = parametros.get('modo') === 'vista_previa';
let identidad = null, servicios = null, aventura = null, sesion = null, claveBorrador = '';
let borradorDisponible = null, historial = [], guardando = false, guardada = false, listo = false;
let hablando = false, turnoVoz = 0, escuchado = false, palabraActiva = null, escrituraLocalFallo = false;
let lecturaActual = null, faseMostrada = null;
const etiquetaEstado = { correcta:'✓ Igual', revisar:'✎ Corregir', omitida:'＋ Faltó', duda:'? Duda' };

function mensaje(texto = '', error = false) {
  $('mensaje').textContent = texto;
  $('mensaje').className = error ? 'error' : '';
}
function enfocar(id) { $(id)?.focus({ preventScroll: true }); }
function cambiarSeccion(id) {
  ['catalogo','actividad','historial'].forEach(nombre => $(nombre).hidden = nombre !== id);
  $('verCatalogo').setAttribute('aria-pressed', String(id === 'catalogo'));
  $('verHistorial').setAttribute('aria-pressed', String(id === 'historial'));
}
function uuid() {
  return crypto.randomUUID ? crypto.randomUUID() : `dictado-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function conservar() {
  if (preview || !identidad?.puedeGuardar || !sesion || guardada || !claveBorrador) return false;
  try {
    localStorage.setItem(claveBorrador, JSON.stringify(sesion));
    borradorDisponible = JSON.parse(JSON.stringify(sesion));
    escrituraLocalFallo = false;
    return true;
  } catch {
    escrituraLocalFallo = true;
    mensaje('El navegador no permite guardar el borrador. Mantén esta página abierta hasta guardar el resultado en la Academia.', true);
    return false;
  }
}
function recuperar() {
  if (!claveBorrador) return;
  try {
    const valor = JSON.parse(localStorage.getItem(claveBorrador) || 'null');
    if (valor && validarBorrador(porId(valor.aventuraId), valor)) {
      valor.velocidad = ({'0.84':'0.75','0.65':'0.5'})[valor.velocidad] || valor.velocidad;
      borradorDisponible = valor;
    }
    else if (valor) mensaje('El borrador anterior no es compatible con esta versión. Puedes empezar otra aventura.');
  } catch { mensaje('No pudimos recuperar el borrador de este navegador.', true); }
}
function controlesVoz() {
  $('pararVoz').disabled = !hablando;
  document.querySelectorAll('[data-escuchar]').forEach(b => b.disabled = hablando || !LectorTexto.disponible());
  const siguiente = $('siguienteFragmento');
  if (siguiente) siguiente.disabled = hablando || !escuchado;
  if ($('empezarDictado')) $('empezarDictado').disabled = hablando || !LectorTexto.disponible();
}
function detener() {
  turnoVoz += 1;
  LectorTexto.detener();
  hablando = false;
  lecturaActual = null;
  $('estadoVoz').textContent = 'Voz detenida. Puedes volver a escuchar.';
  controlesVoz();
}
function escuchar(texto, alTerminar = null) {
  detener();
  const turno = turnoVoz;
  hablando = true;
  lecturaActual = {texto, alTerminar};
  $('estadoVoz').textContent = 'Lía está leyendo…';
  controlesVoz();
  const ok = LectorTexto.escuchar(texto, {
    idioma:'es-ES', velocidad:Number(sesion?.velocidad || '0.75'),
    alFinalizar: () => {
      if (turno !== turnoVoz) return;
      hablando = false;
      lecturaActual = null;
      $('estadoVoz').textContent = 'Ahora escribe con calma. Te espero.';
      alTerminar?.();
      controlesVoz();
    },
    alError: () => {
      if (turno !== turnoVoz) return;
      hablando = false;
      lecturaActual = null;
      $('estadoVoz').textContent = 'No se pudo completar la lectura.';
      mensaje('No pudimos reproducir la voz. Comprueba el sonido y pulsa Escuchar otra vez.', true);
      controlesVoz();
    }
  });
  if (!ok) {
    hablando = false;
    mensaje('Este navegador no tiene una voz disponible. Abre el dictado en un navegador con lectura en voz alta.', true);
    controlesVoz();
  }
}
function catalogo() {
  cambiarSeccion('catalogo');
  const nivel = $('nivel').value;
  $('aventuras').innerHTML = AVENTURAS.filter(a => nivel === 'todos' || String(a.nivel) === nivel).map(a => `
    <article class="aventura"><div class="portada ${a.color}" aria-hidden="true"><span>${a.icono}</span></div>
    <div class="aventura-cuerpo"><div class="datos"><span>NIVEL ${a.nivel} · ${html(a.categoria)}</span><span>${a.frases.flatMap(palabrasFrase).length} palabras</span></div>
    <h3>${html(a.titulo)}</h3><p>${html(a.descripcion)}</p><p class="objetivo">🎯 ${html(a.objetivo)}</p>
    <button data-aventura="${a.id}" ${listo ? '' : 'disabled'}>Elegir aventura →</button></div></article>`).join('');
  $('borrador').hidden = !borradorDisponible;
  if (borradorDisponible) $('borrador').innerHTML = `<strong>Te espera un borrador: ${html(porId(borradorDisponible.aventuraId).titulo)}</strong>
    <p>Guardado en este navegador, para esta persona. Todavía no es un resultado del historial.</p><button id="reanudar">Continuar mi aventura</button><button id="descartar" class="suave">Descartar borrador</button>`;
}
function empezar(id) {
  if (!listo || guardando) return;
  if (borradorDisponible && !confirm('Hay una aventura sin terminar. ¿Quieres reemplazar su borrador por una nueva?')) return;
  detener(); aventura = porId(id); guardada = false; escuchado = false;
  sesion = nuevaSesion(aventura, uuid());
  mensaje(); conservar(); render();
}
function descansar() {
  if (!sesion || guardando) return;
  detener();
  const ok = conservar();
  if (preview) { borradorDisponible = sesion; mensaje('Pausa de vista previa: puedes continuar mientras esta página siga abierta. No se guardan datos.'); }
  else if (ok) mensaje('Borrador guardado en este navegador. Cuando regreses, pulsa «Continuar mi aventura».');
  else if (!guardada && !confirm('No se pudo guardar el borrador. ¿Quieres salir de la actividad igualmente?')) return;
  catalogo(); enfocar('tituloCatalogo');
}
function render() {
  cambiarSeccion('actividad');
  $('tituloActividad').textContent = aventura.titulo;
  const etapas = { preparar:0, dictar:1, terminar:1, revisar:2, resultado:3 };
  const indice = etapas[sesion.fase];
  $('etapa').textContent = `NIVEL ${aventura.nivel} · ${['ME PREPARO','ESCUCHO Y ESCRIBO','REVISO MI CUADERNO','DESCUBRO MI RESULTADO'][indice]}`;
  document.querySelectorAll('.pasos span').forEach((el,i) => { el.classList.toggle('actual', i === indice); if(i===indice) el.setAttribute('aria-current','step'); else el.removeAttribute('aria-current'); });
  $('velocidad').value = sesion.velocidad;
  $('voz').hidden = ['revisar','resultado'].includes(sesion.fase);
  $('descansar').hidden = guardada;
  $('pantalla').innerHTML = ({preparar:prepararHtml,dictar:dictarHtml,terminar:terminarHtml,revisar:revisarHtml,resultado:resultadoHtml}[sesion.fase])();
  controlesVoz(); enfocar('tituloActividad');
  if (faseMostrada !== sesion.fase) $('actividad').scrollIntoView({block:'start'});
  faseMostrada = sesion.fase;
}
function prepararHtml() {
  return `<div class="escena"><div class="escena-icono" aria-hidden="true">${aventura.icono}</div><h3>Una aventura empieza en tu cuaderno</h3>
    <p>${html(aventura.descripcion)}</p><div class="preparativos"><span>✏️ Lápiz</span><span>📓 Papel o cuaderno</span><span>🔊 Sonido</span></div>
    <p>Escucha primero la historia si quieres. Después la escribirás en pequeños fragmentos. El texto será una sorpresa hasta la revisión.</p>
    <div class="acciones"><button data-escuchar="prueba">🔊 Probar la voz</button><button data-escuchar="historia">🎧 Escuchar la historia</button></div>
    <div class="acciones"><button id="empezarDictado" class="primario">Tengo lápiz y papel. ¡Empezamos!</button></div>
    <p class="ayuda">Escuchar otra vez y elegir una voz pausada no resta puntos.</p></div>`;
}
function dictarHtml() {
  const total = fragmentosDe(aventura).length;
  return `<div class="escena"><p class="contador">FRAGMENTO ${sesion.fragmento+1} DE ${total}</p><progress class="progreso" max="${total}" value="${sesion.fragmento}" aria-label="Fragmentos escritos"></progress>
    <div class="escena-icono" aria-hidden="true">✍️</div><h3>Escucha y escribe a tu ritmo</h3>
    <p>Escucha este fragmento y escríbelo en tu cuaderno. Después pulsa el botón morado para pasar al siguiente. Al llegar al último, podrás terminar y comparar.</p>
    <div class="acciones"><button data-escuchar="fragmento">🔊 Escuchar otra vez</button><button id="siguienteFragmento" class="primario" disabled>${sesion.fragmento === total-1 ? 'Terminé de escribir el dictado →' : 'Ya escribí este fragmento → Siguiente'}</button></div>
    ${sesion.fragmento ? '<button id="anteriorFragmento" class="suave">← Escuchar el fragmento anterior</button>' : ''}</div>`;
}
function terminarHtml() {
  return `<div class="escena"><div class="escena-icono" aria-hidden="true">📓</div><h3>¡Terminaste de escribir!</h3><p>Ahora vamos a comparar tu cuaderno con el texto original, una frase cada vez.</p>
    <div class="acciones"><button id="iniciarRevision" class="primario">Comparar con mi cuaderno →</button></div>
    <p class="ayuda">Si quieres comprobar antes que no te falta nada, puedes escuchar la historia completa. El texto sigue oculto hasta que pulses Comparar.</p>
    <div class="acciones"><button data-escuchar="final">🎧 Escuchar la historia completa</button><button id="revisarDespues">Descansar y revisar después</button></div></div>`;
}
function revisarHtml() {
  const f = sesion.revision[sesion.frase];
  const palabras = palabrasFrase(aventura.frases[sesion.frase]);
  return `<p class="contador">FRASE ${sesion.frase+1} DE ${aventura.frases.length}</p>
    <p>Compara con lo que escribiste <strong>antes de corregir</strong>. Toca las palabras diferentes, las que faltan o las que te generan dudas. Revisa también los signos y las palabras añadidas. Después confirma esta frase.</p>
    <div class="frase-revision" aria-label="Texto de referencia">${palabras.map((p,i) => `<button class="palabra ${f.palabras[i] || ''}" data-palabra="${i}" aria-label="${html(p)}: ${etiquetaEstado[f.palabras[i]] || 'sin revisar'}">${html(p)}${f.palabras[i] ? `<small>${etiquetaEstado[f.palabras[i]]}</small>` : ''}</button>`).join(' ')}</div>
    <p class="leyenda">Letras, tildes y mayúsculas cuentan. Una palabra se cuenta una sola vez, aunque tenga varios cambios.</p>
    <div class="revision-extra"><fieldset><legend>Los signos de esta frase</legend>${[['correcta','Están iguales'],['revisar','Hay algo que corregir'],['duda','Tengo una duda']].map(([v,t])=>`<label><input type="radio" name="puntuacion" value="${v}" ${f.puntuacion===v?'checked':''}>${t}</label>`).join('')}</fieldset>
    <fieldset><legend>Palabras añadidas</legend><label>¿Escribiste alguna palabra de más? <input id="extras" type="number" min="0" max="99" step="1" value="${f.extras}" aria-label="Cantidad de palabras añadidas"></label><small>Se registran aparte del porcentaje.</small></fieldset></div>
    <div class="acciones"><button id="fraseIgual">✓ Toda la frase está igual</button><button id="confirmarFrase" class="primario">${sesion.frase === aventura.frases.length-1 ? 'Terminé de comparar → Ver mi autoevaluación' : 'Confirmar esta frase → Siguiente'}</button></div>
    <p class="ayuda">Al confirmar, las palabras sin marcar pasarán a «Igual». Las dudas seguirán pendientes. «Toda la frase está igual» también confirma sus signos y que no añadiste palabras.</p>
    <div class="acciones">${sesion.frase ? '<button id="fraseAnterior" class="suave">← Frase anterior</button>':''}<button id="pendienteRevision" class="suave">Continuar la revisión después</button></div>`;
}
function resultadoHtml() {
  const r = resultado(aventura,sesion);
  const cambios = sesion.revision.flatMap((f,fi) => f.palabras.map((estado,pi) => ({estado,fi,pi,palabra:palabraSinSignos(palabrasFrase(aventura.frases[fi])[pi])}))).filter(p=>['revisar','omitida'].includes(p.estado));
  return `<div class="resultado-cabecera"><div class="porcentaje">${r.porcentaje}%</div><div><p class="etiqueta">MI AUTOEVALUACIÓN</p><h3>${r.porcentaje>=META?'¡Has alcanzado tu primera meta!':'Ya sabes por dónde seguir'}</h3><p><strong>${r.correctas} de ${r.total} palabras del texto</strong> escritas correctamente según tu revisión.</p><p>Meta familiar inicial: ${META} %. Terminar y revisar también cuentan.</p></div></div>
    <p class="ayuda">Este es el porcentaje que resulta de tus marcas. No tienes que escribir una nota: la Academia hace el cálculo, pero no ha leído tu cuaderno. Signos y palabras añadidas no están incluidos en este porcentaje.</p>
    <p>✎ Frases con signos por corregir: <strong>${r.puntuacionRevisar}</strong> · Palabras añadidas: <strong>${r.extras}</strong>.</p>
    <h3>Un pequeño paso para crecer</h3><p>${cambios.length?'Elige hasta tres palabras para practicar. Escríbelas bien en tu cuaderno y marca cuando las hayas corregido.':'Puedes repasar los signos o releer tu trabajo con calma.'}</p>
    <div class="practica">${cambios.map(p=>{const clave=`${p.fi}:${p.pi}`;return `<button data-practica="${clave}" aria-pressed="${sesion.practica.includes(clave)}" ${guardada?'disabled':''}>${html(p.palabra)}</button>`;}).join('')}</div>
    ${sesion.practica.map(clave=>{const [fi,pi]=clave.split(':').map(Number);return `<label style="display:block;padding:8px"><input type="checkbox" data-corregida="${clave}" ${sesion.correcciones.includes(clave)?'checked':''} ${guardada?'disabled':''}>Ya corregí «${html(palabraSinSignos(palabrasFrase(aventura.frases[fi])[pi]))}» en mi cuaderno.</label>`;}).join('')}
    <p class="ayuda">Las correcciones se guardan como aprendizaje posterior. El porcentaje del dictado original se conserva.</p>
    <label>¿Cómo revisaste? <select id="acompanamiento" ${guardada?'disabled':''}><option value="">Elige una opción</option><option value="sola" ${sesion.acompanamiento==='sola'?'selected':''}>A solas</option><option value="acompanada" ${sesion.acompanamiento==='acompanada'?'selected':''}>Con ayuda de alguien</option></select></label>
    <div class="acciones"><button id="guardar" class="primario" ${guardada||guardando?'disabled':''}>${guardada?'✓ Aventura guardada':preview?'🎉 Terminar vista previa':'💾 Guardar mi aventura'}</button>
    ${!guardada ? '<button id="volverRevision" class="suave">Volver a comprobar mi revisión</button>':''}<button id="otraAventura">${guardada ? 'Cerrar y volver a mis aventuras' : 'Elegir otra aventura'}</button></div>`;
}
function avanzarRevision() {
  conservar(); detener();
  if (sesion.frase < aventura.frases.length-1) { sesion.frase++; render(); conservar(); return; }
  const r = resultado(aventura,sesion);
  if (!r.completa) {
    sesion.frase = sesion.revision.findIndex(f=>f.palabras.some(e=>!e||e==='duda') || !['correcta','revisar'].includes(f.puntuacion));
    mensaje('Queda una duda o una parte sin revisar. Puedes resolverla con ayuda o continuar después.');
    render(); conservar(); return;
  }
  sesion.fase='resultado'; mensaje(); render(); conservar();
}
async function guardar() {
  if (guardando || guardada) return;
  try {
    const registro = crearRegistro(aventura,sesion,identidad || {});
    if (preview) {
      guardada = true; render();
      mensaje('Vista previa terminada. No se ha guardado ninguna sesión.');
      mostrarCelebracion({mostrarGuacamayas:false,titulo:'¡Has recorrido tu aventura!',mensaje:'Escuchar, escribir y revisar: cada paso cuenta.'});
      return;
    }
    guardando = true; $('guardar').disabled=true; $('guardar').textContent='Guardando…';
    const actual = await servicios.contexto.inicializar({forzarRecarga:true});
    if (actual.personaActiva.personaId !== identidad.personaId || actual.usuario.userId !== identidad.actorUserId) throw new Error('La persona o la cuenta ha cambiado. Vuelve a entrar antes de guardar.');
    if (!(actual.esPersonaPropia || ['gestion','administracion'].includes(actual.nivelAcceso))) throw new Error('Este acceso permite consultar, pero no guardar dictados.');
    await servicios.guardar(registro);
    guardada = true; borradorDisponible = null;
    // Un fallo de limpieza local no convierte un guardado remoto correcto en error.
    try { localStorage.removeItem(claveBorrador); } catch { /* El intento remoto conserva un ID estable. */ }
    mensaje('Tu aventura está guardada en el historial de la Academia.');
    mostrarCelebracion({mostrarGuacamayas:false,titulo:'¡Aventura guardada!',mensaje:'Has escrito, revisado y aprendido algo nuevo.'});
  } catch (error) {
    mensaje(error.message || 'No se pudo guardar. Tu revisión sigue aquí; puedes reintentarlo.',true);
  } finally { guardando=false; render(); }
}
function fechaSesion(s) {
  const d = s.createdAt?.toDate?.() || new Date(s.finCliente || s.inicioCliente);
  return Number.isNaN(d.getTime())?'Fecha no disponible':d.toLocaleString('es-ES',{dateStyle:'medium',timeStyle:'short'});
}
async function verHistorial(sesionId = '') {
  if (guardando) return;
  detener(); conservar(); cambiarSeccion('historial'); enfocar('tituloHistorial'); $('detalle').innerHTML='';
  if (preview) { $('sesiones').textContent='En vista previa puedes probar todas las aventuras. El historial real solo está disponible en tu sesión de la Academia.'; return; }
  $('sesiones').textContent='Abriendo tu cuaderno…';
  try {
    historial = await servicios.leer({actividadId:ACTIVIDAD_ID,maximo:100});
    $('sesiones').innerHTML = historial.length ? historial.map((s,i)=>{
      const d=s.resumen?.dictado;
      if (!d) return '';
      return `<article class="historia"><div><h3>${html(s.tituloActividad)}</h3><p>Nivel ${Number(d.nivel)} · ${Number(d.porcentaje)} % · ${d.acompanamiento==='acompanada'?'Revisión acompañada':'Autoevaluación a solas'}</p><small>${html(fechaSesion(s))}</small></div><button data-historico="${i}">Ver mi trabajo</button></article>`;
    }).join(''):'Todavía no hay dictados guardados. Tu primera aventura te espera.';
    if (sesionId) {
      let s=historial.find(item=>item.id===sesionId);
      if(!s) s=await servicios.leerUna(sesionId);
      if(s?.actividadId===ACTIVIDAD_ID && s.resumen?.dictado) detalle(s);
      else mensaje('No encontramos ese dictado para la Persona Activa.',true);
    }
  } catch { $('sesiones').innerHTML='<p>No pudimos cargar el historial. Comprueba la conexión y tus permisos.</p><button id="reintentarHistorial">Reintentar</button>'; }
}
function detalle(s) {
  const d=s.resumen.dictado;
  $('detalle').innerHTML=`<article class="detalle"><p class="etiqueta">TRABAJO GUARDADO · SOLO LECTURA</p><h3 tabindex="-1" id="tituloDetalle">${html(s.tituloActividad)} · ${Number(d.porcentaje)} %</h3>
    <p>${Number(d.correctas)} de ${Number(d.total)} palabras del texto, según la revisión ${d.acompanamiento==='acompanada'?'acompañada':'a solas'}. Meta: ${Number(d.meta)} %.</p>
    <p>Frases con signos por corregir: ${Number(d.puntuacionRevisar)} · Palabras añadidas: ${Number(d.extras)}.</p>
    ${(d.frases||[]).map((f,fi)=>`<div class="historico-frase">${palabrasFrase([f]).map((p,pi)=>`<span class="${html(d.revision?.[fi]?.palabras?.[pi]||'')}">${html(p)} <small>${html(etiquetaEstado[d.revision?.[fi]?.palabras?.[pi]]||'')}</small></span>`).join(' ')}<p class="ayuda">Signos: ${d.revision?.[fi]?.puntuacion==='correcta'?'iguales':'por corregir'}.</p></div>`).join('')}
    <p>Palabras practicadas y corregidas después: ${(d.correcciones||[]).map(clave=>{const [fi,pi]=clave.split(':').map(Number);return html(palabraSinSignos(palabrasFrase([d.frases[fi]])[pi]));}).join(', ')||'Ninguna registrada'}.</p>
    <p class="ayuda">Las correcciones posteriores no cambian el resultado original.</p>
    ${identidad?.puedeGuardar && porId(d.aventuraId)?`<button data-aventura="${html(d.aventuraId)}">Hacer un nuevo intento</button>`:''}</article>`;
  enfocar('tituloDetalle'); $('detalle').scrollIntoView({block:'start',behavior:'smooth'});
}

$('nivel').addEventListener('change',catalogo);
$('pararVoz').addEventListener('click',detener);
$('velocidad').addEventListener('change',()=>{
  if (!sesion || guardando) return;
  const repetir = hablando ? lecturaActual : null;
  sesion.velocidad = $('velocidad').value;
  detener(); conservar();
  const etiqueta = $('velocidad').selectedOptions[0].textContent;
  if (repetir) {
    escuchar(repetir.texto, repetir.alTerminar);
    mensaje(`Voz ${etiqueta.toLowerCase()}: volvemos a escuchar desde el comienzo de esta lectura.`);
  } else {
    $('estadoVoz').textContent = `Voz ${etiqueta.toLowerCase()} seleccionada. Pulsa Escuchar otra vez o Probar la voz.`;
  }
});
$('verCatalogo').addEventListener('click',()=>{if(guardando)return; detener();conservar();catalogo();enfocar('tituloCatalogo');});
$('verHistorial').addEventListener('click',()=>verHistorial());
$('descansar').addEventListener('click',descansar);
$('palabraDialogo').addEventListener('close',()=>{
  const valor=$('palabraDialogo').returnValue;
  if(palabraActiva!==null && ['correcta','revisar','omitida','duda'].includes(valor)) {
    sesion.revision[sesion.frase].palabras[palabraActiva]=valor; conservar(); render();
    document.querySelector(`[data-palabra="${palabraActiva}"]`)?.focus();
  }
  palabraActiva=null;
});
document.addEventListener('change',evento=>{
  if(!sesion || guardada || guardando)return;
  const el=evento.target;
  if(el.name==='puntuacion') sesion.revision[sesion.frase].puntuacion=el.value;
  if(el.id==='extras') { const n=Number(el.value);sesion.revision[sesion.frase].extras=Number.isInteger(n)?Math.max(0,Math.min(99,n)):0;el.value=sesion.revision[sesion.frase].extras; }
  if(el.id==='acompanamiento')sesion.acompanamiento=el.value;
  if(el.dataset.corregida){const k=el.dataset.corregida;sesion.correcciones=el.checked?[...new Set([...sesion.correcciones,k])]:sesion.correcciones.filter(x=>x!==k);}
  conservar();
});
document.addEventListener('click',async evento=>{
  const b=evento.target.closest('button');
  if(!b || b.disabled || guardando)return;
  if(b.dataset.aventura){empezar(b.dataset.aventura);return;}
  if(b.dataset.historico){detalle(historial[Number(b.dataset.historico)]);return;}
  if(b.id==='reintentarHistorial'){verHistorial();return;}
  if(b.id==='reanudar') {
    detener();sesion=JSON.parse(JSON.stringify(borradorDisponible));aventura=porId(sesion.aventuraId);guardada=false;escuchado=false;
    if(sesion.fase==='resultado'&&!resultado(aventura,sesion).completa)sesion.fase='revisar';
    mensaje('Continúa donde lo dejaste. Si estabas escribiendo, escucha de nuevo el fragmento.');render();return;
  }
  if(b.id==='descartar') {
    if(!confirm('¿Descartar este borrador? Los resultados del historial se conservarán.'))return;
    try{localStorage.removeItem(claveBorrador);}catch{mensaje('No se pudo borrar el borrador.',true);return;}
    borradorDisponible=null;sesion=null;catalogo();return;
  }
  if(!sesion)return;
  if(b.dataset.escuchar) {
    const tipo=b.dataset.escuchar;
    if(tipo==='fragmento') escuchar(vozFragmento(fragmentosDe(aventura)[sesion.fragmento]),()=>{escuchado=true;});
    else if(tipo==='prueba') escuchar('Escucho con calma y escribo a mi ritmo.');
    else escuchar(textoCompleto(aventura));
    return;
  }
  if(b.id==='empezarDictado') {
    sesion.fase='dictar';escuchado=false;render();conservar();
    escuchar(vozFragmento(fragmentosDe(aventura)[sesion.fragmento]),()=>{escuchado=true;});return;
  }
  if(b.id==='siguienteFragmento'||b.id==='anteriorFragmento') {
    if(b.id==='siguienteFragmento'&&(!escuchado||hablando))return;
    detener();escuchado=false;
    if(b.id==='anteriorFragmento')sesion.fragmento--;
    else if(sesion.fragmento===fragmentosDe(aventura).length-1){sesion.fase='terminar';render();conservar();return;}
    else sesion.fragmento++;
    render();conservar();escuchar(vozFragmento(fragmentosDe(aventura)[sesion.fragmento]),()=>{escuchado=true;});return;
  }
  if(['revisarDespues','pendienteRevision'].includes(b.id)){descansar();return;}
  if(b.id==='iniciarRevision'){detener();sesion.fase='revisar';sesion.vistoModelo=true;render();conservar();return;}
  if(b.dataset.palabra!==undefined) {
    palabraActiva=Number(b.dataset.palabra);$('palabraElegida').textContent=palabrasFrase(aventura.frases[sesion.frase])[palabraActiva];$('palabraDialogo').returnValue='cancelar';$('palabraDialogo').showModal();return;
  }
  if(b.id==='fraseIgual'||b.id==='confirmarFrase') {
    const f=sesion.revision[sesion.frase];
    if(b.id==='fraseIgual') {
      if((f.palabras.some(e=>e&&e!=='correcta')||f.extras||f.puntuacion==='revisar'||f.puntuacion==='duda')&&!confirm('Habías marcado diferencias. ¿Confirmas que toda la frase original estaba igual?'))return;
      f.palabras.fill('correcta');f.puntuacion='correcta';f.extras=0;
    } else {
      if(!f.puntuacion){mensaje('Revisa también los signos de esta frase antes de continuar.');return;}
      f.palabras=f.palabras.map(e=>e||'correcta');
    }
    avanzarRevision();return;
  }
  if(b.id==='fraseAnterior'){sesion.frase--;render();conservar();return;}
  if(b.id==='volverRevision'){sesion.fase='revisar';sesion.frase=0;sesion.practica=[];sesion.correcciones=[];render();conservar();return;}
  if(b.dataset.practica) {
    const k=b.dataset.practica;
    if(sesion.practica.includes(k)){sesion.practica=sesion.practica.filter(x=>x!==k);sesion.correcciones=sesion.correcciones.filter(x=>x!==k);}
    else if(sesion.practica.length<3)sesion.practica.push(k);
    else{mensaje('Elige hasta tres palabras para practicar con calma.');return;}
    conservar();render();return;
  }
  if(b.id==='guardar'){await guardar();return;}
  if(b.id==='otraAventura'){detener();conservar();catalogo();}
});
window.addEventListener('pagehide',()=>{conservar();detener();});
window.addEventListener('beforeunload',evento=>{conservar();if(guardando || (escrituraLocalFallo&&sesion&&!guardada)){evento.preventDefault();evento.returnValue='';}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){conservar();detener();}});

async function iniciar() {
  catalogo();
  if(preview) {
    $('modo').hidden=false;$('modo').textContent='Vista previa · Prueba libre sin guardar borradores, resultados ni progreso.';
    listo=true;$('persona').textContent='Tu aventura, a tu ritmo';catalogo();
    if(!LectorTexto.disponible())mensaje('La voz no está disponible en este navegador. Abre esta vista previa en un navegador con lectura en voz alta.',true);
    return;
  }
  try {
    const [{ContextoUsuario},{PerfilUsuario},api,{iniciarPanelUsuario}] = await Promise.all([
      import('../../compartido/js/contexto-usuario.js'),import('../../compartido/js/perfil-usuario.js'),
      import('../../compartido/js/sesiones-academicas.js'),import('../../compartido/js/panel-usuario.js')
    ]);
    await PerfilUsuario.obtenerUID();
    const ctx=await ContextoUsuario.inicializar();
    identidad={personaId:ctx.personaActiva.personaId,actorUserId:ctx.usuario.userId,puedeGuardar:ctx.esPersonaPropia||['gestion','administracion'].includes(ctx.nivelAcceso)};
    servicios={contexto:ContextoUsuario,guardar:api.guardarSesionAcademica,leer:api.leerSesionesAcademicas,leerUna:api.leerSesionAcademica};
    $('persona').textContent=`El rincón de ${ctx.personaActiva.nombreVisible||ctx.personaActiva.nombre||'tu Persona Activa'}`;
    await iniciarPanelUsuario({contenedor:'[data-panel-usuario]',loginUrl:new URL('../../login.html',location.href).pathname,mostrarPerfil:false});
    claveBorrador=`academia.dictados.v1.${identidad.actorUserId}.${identidad.personaId}`;
    listo=identidad.puedeGuardar;
    if(listo)recuperar();
    else{$('modo').hidden=false;$('modo').textContent='Acceso de consulta: puedes leer el historial. Para practicar sin guardar, abre la vista previa.';}
    catalogo();
    if(parametros.get('sesionId'))await verHistorial(parametros.get('sesionId'));
    if(!LectorTexto.disponible())mensaje('La voz no está disponible en este navegador. Puedes consultar el historial; para un dictado usa un navegador con lectura en voz alta.',true);
  } catch(error) {
    $('modo').hidden=false;
    $('modo').innerHTML=`No pudimos abrir tu sesión. <a href="../../login.html">Entrar en la Academia</a> o <a href="?modo=vista_previa">probar sin guardar</a>.`;
    mensaje('Revisa tu conexión e inicia sesión para guardar tus aventuras.',true);
    console.error('[Dictados] Inicio:',error);
  }
}
iniciar();
