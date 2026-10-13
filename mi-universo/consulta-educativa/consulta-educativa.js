/* Entrada de consulta: mismos servicios, reporte y visores históricos. Sin escrituras. */
import { protegerPagina } from '../../compartido/js/auth-guard.js';
import { ContextoUsuario } from '../../compartido/js/contexto-usuario.js';
import { Academia } from '../../compartido/api/academia.js';
import { leerSesionesAcademicas } from '../../compartido/js/sesiones-academicas.js';
import { abrirTrabajoRealizado } from '../../compartido/js/trabajo-realizado.js';
import { iniciarAnalisisConsulta } from '../mis-tareas/analisis-educativo.js';
const $ = id => document.getElementById(id);
const escapar = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Capturar antes del guard: el resolver puede restaurar Persona propia si no hay relación.
const solicitada = sessionStorage.getItem('academia.personaActivaId') || '';
let identidad = null;
async function contextoVigente() {
  const c = await ContextoUsuario.inicializar({ forzarRecarga: true });
  if (identidad && (c.personaActiva.personaId !== identidad.personaId || c.usuario.userId !== identidad.actorUserId)) {
    $('contenidoConsulta').hidden = true;
    throw Error('La Persona Activa o su autorización cambió. Vuelve a abrir Consulta educativa.');
  }
  return c;
}
function misionesHtml(tareas) {
  return tareas.map(t => `<details class="superficie refuerzo-bloque">
    <summary><strong>${escapar(t.titulo)}</strong> · ${escapar(String(t.estado || '').replaceAll('_',' '))}</summary>
    <p>${escapar(t.presentacionAlumno?.descripcionMision || t.descripcion)}</p>
    <p><strong>Objetivo:</strong> ${escapar(t.objetivo || 'Sin objetivo adicional.')}</p>
    <p><strong>Criterio:</strong> ${escapar(t.criterioFinalizacion || 'Según la Misión.')}</p>
    <p><strong>Progreso:</strong> ${Number(t.progreso?.cantidadActual || 0)} / ${Number(t.criterioCumplimiento?.cantidadObjetivo || t.progreso?.cantidadObjetivo || 1)}</p>
    <p><strong>Planificación:</strong> ${escapar(t.fechaInicio || 'Sin inicio fijado')} · ${escapar(t.fechaLimite || 'Sin fecha límite')} · ${escapar(t.prioridad || 'normal')}</p>
    <p><strong>Visibilidad en Mi Camino:</strong> ${t.visibleParaAlumno === false ? 'Todavía no visible' : 'Visible'}</p>
    ${t.observacionActual ? `<p><strong>Observación:</strong> ${escapar(t.observacionActual)}</p>` : ''}
    ${t.resultado?.observaciones ? `<p><strong>Resultado:</strong> ${escapar(t.resultado.observaciones)}</p>` : ''}
    <button type="button" class="btn secundaria" data-trabajo-consulta="${escapar(t.id)}">👁️ Ver trabajo realizado</button>
  </details>`).join('') || '<p>Todavía no hay Misiones registradas.</p>';
}
async function iniciar(contexto) {
  if (solicitada && solicitada !== contexto.personaActiva.personaId) throw Error('No hay una relación válida con la Persona solicitada. Selecciona una Persona autorizada.');
  if (contexto.esPersonaPropia && contexto.nivelAcceso === 'consulta') throw Error('Selecciona en Persona Activa un alumno con quien tengas una relación autorizada.');
  identidad = { personaId: contexto.personaActiva.personaId, actorUserId: contexto.usuario.userId };
  $('personaConsulta').textContent = `Información educativa de ${contexto.personaActiva.nombreVisible || contexto.personaActiva.nombre || 'la Persona Activa'}`;
  $('contenidoConsulta').hidden = false;
  if (!['gestion','administracion'].includes(contexto.nivelAcceso)) $('gestionConsulta').remove();
  else $('gestionConsulta').hidden = false;
  iniciarAnalisisConsulta(contexto);
  const resultados = await Promise.allSettled([Academia.tareas.leer(), leerSesionesAcademicas({ todas: true })]);
  await contextoVigente();
  if (resultados[0].status === 'fulfilled') {
    $('misionesConsulta').innerHTML = misionesHtml(resultados[0].value);
    $('misionesConsulta').querySelectorAll('[data-trabajo-consulta]').forEach(b => {
      b.onclick = async () => {
        try { await contextoVigente(); await abrirTrabajoRealizado(b.dataset.trabajoConsulta); }
        catch (e) { $('estadoConsulta').textContent = e.message; }
      };
    });
  } else $('misionesConsulta').textContent = `No pudimos consultar las Misiones: ${resultados[0].reason.message}`;
  if (resultados[1].status === 'fulfilled') {
    $('sesionesConsulta').innerHTML = resultados[1].value.map(s => {
      const dictado = s.actividadId === 'rincon-dictados';
      const url = new URL(dictado ? '../rincon-dictados/' : '../mis-tareas/resultado-academico.html', location.href);
      url.searchParams.set('sesionId', s.id); url.searchParams.set('modo','consulta');
      url.searchParams.set('volver',location.pathname + location.search);
      return `<p><a class="btn secundaria" href="${escapar(url.href)}">${dictado ? '✏️' : '📘'} ${escapar(s.tituloActividad || s.tema || 'Actividad guardada')}</a></p>`;
    }).join('') || '<p>Todavía no hay actividades o dictados guardados.</p>';
  } else $('sesionesConsulta').textContent = `No pudimos consultar las actividades: ${resultados[1].reason.message}`;
  window.Academia?.navegacion?.prepararEnlaces();
}
protegerPagina({loginUrl:'../../login.html', onAuthenticated:async()=>{
  try { await iniciar(await contextoVigente()); }
  catch (e) { $('contenidoConsulta').hidden = true; $('estadoConsulta').textContent = e.message; }
}});
