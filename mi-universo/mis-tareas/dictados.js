/* Observaciones de Dictado: selecciona evidencia y prepara el formulario común.
 * La creación, edición y visibilidad pertenecen a Gestión de Misiones.
 */
import { Academia } from '../../compartido/api/academia.js';
import { ContextoUsuario } from '../../compartido/js/contexto-usuario.js';
import { leerSesionesAcademicas } from '../../compartido/js/sesiones-academicas.js';
import { agruparPanelRefuerzos } from './grupos-refuerzos.js';
import { esMisionDictado, reales, objetivos, prepararMision, fechaDictado } from '../rincon-dictados/seguimiento.js';

const $ = id => document.getElementById(id);
const escapar = valor => String(valor ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));
let sesiones = [];
let identidad = '';
let ocupado = false;
agruparPanelRefuerzos();

async function permiso() {
  const contexto = await ContextoUsuario.inicializar({ forzarRecarga: true });
  if (!['gestion', 'administracion'].includes(contexto.nivelAcceso)) {
    throw Error('Este espacio requiere acceso de gestión familiar.');
  }
  const clave = contexto.usuario.userId + ':' + contexto.personaActiva.personaId;
  if (identidad && clave !== identidad) throw Error('Ha cambiado la Persona Activa. Recarga la página.');
  identidad = clave;
}

async function cargar() {
  if (ocupado) return;
  ocupado = true;
  const intentoElegido = $('dictadoIntento').value;
  const elegidas = [...$('dictadoObjetivos').querySelectorAll('input:checked')].map(input => input.value);
  $('actualizarDictados').disabled = true;
  $('dictadoIntento').disabled = true;
  $('crearRefuerzoDictado').disabled = true;
  $('dictadoEstado').textContent = 'Consultando los dictados revisados…';
  try {
    await permiso();
    const [resultados, tareas] = await Promise.all([
      leerSesionesAcademicas({ actividadId: 'rincon-dictados', maximo: 200 }),
      Academia.tareas.leer()
    ]);
    sesiones = reales(resultados, tareas).sort((a, b) => fechaDictado(b) - fechaDictado(a));
    mostrarPreparadas(tareas);
    const recientes = new Map();
    sesiones.forEach(s => {
      const texto = s.resumen.dictado.textoOriginal;
      if (!recientes.has(texto)) recientes.set(texto, s);
    });
    $('dictadoIntento').innerHTML = '<option value="">Elige un intento reciente</option>' +
      [...recientes.values()].filter(s => objetivos(s).length).map(s =>
        `<option value="${escapar(s.id)}">${escapar(s.tituloActividad)} · ${s.resumen.dictado.porcentaje} % · ${escapar(new Date(fechaDictado(s)).toLocaleDateString('es-ES'))}</option>`
      ).join('');
    $('dictadoIntento').value = intentoElegido;
    mostrarObjetivos(elegidas);
    $('dictadoEstado').textContent = sesiones.length
      ? 'Revisa las diferencias del intento original. Son señales declaradas, no un diagnóstico.'
      : 'Todavía no hay dictados reales revisados. Puedes preparar una aventura desde Nueva Misión.';
  } catch (error) {
    $('dictadoEstado').textContent = error.message;
    $('dictadoMisionesEstado').textContent = `No pudimos consultar las Misiones: ${error.message}`;
    $('listaMisionesDictado').innerHTML = '';
    sesiones = [];
    $('dictadoIntento').innerHTML = '<option value="">Actualiza para elegir</option>';
    mostrarObjetivos();
  } finally {
    ocupado = false;
    $('actualizarDictados').disabled = false;
    $('dictadoIntento').disabled = false;
    $('crearRefuerzoDictado').disabled = false;
  }
}

$('actualizarDictados').onclick = cargar;
$('actualizarMisionesDictado').onclick = cargar;
function mostrarObjetivos(elegidas = []) {
  const sesion = sesiones.find(s => s.id === $('dictadoIntento').value);
  $('dictadoObjetivos').innerHTML = sesion ? objetivos(sesion).map(o =>
    `<label class="dictado-objetivo"><input type="checkbox" value="${escapar(o.clave)}" ${elegidas.includes(o.clave) ? 'checked' : ''}> ${o.tipo === 'frase' ? 'Frase' : 'Palabra'}: ${escapar(o.texto)}</label>`
  ).join('') : '';
}
$('dictadoIntento').onchange = () => mostrarObjetivos();
$('crearRefuerzoDictado').onclick = async () => {
  if (ocupado) return;
  try {
    await permiso();
    const sesion = sesiones.find(s => s.id === $('dictadoIntento').value);
    if (!sesion) throw Error('Elige un intento para revisar sus diferencias.');
    const seleccion = [...$('dictadoObjetivos').querySelectorAll('input:checked')].map(x => x.value);
    const propuesta = prepararMision('', sesion, seleccion);
    document.dispatchEvent(new CustomEvent('academia:preparar-dictado', { detail: propuesta }));
  } catch (error) { $('dictadoEstado').textContent = error.message; }
};
function mostrarPreparadas(tareas) {
  $('dictadoMisionesEstado').textContent = '';
  const preparadas = tareas.filter(tarea => esMisionDictado(tarea) &&
    tarea.evidencia.configuracion?.sesionOrigenId &&
    !['completada', 'cancelada'].includes(tarea.estado));
  const lista = $('listaMisionesDictado');
  lista.innerHTML = preparadas.length ? preparadas.map(tarea => `
    <article class="mision-refuerzo-detectives">
      <div class="mision-refuerzo-detectives__cabecera">
        <div><h4>✏️ ${escapar(tarea.titulo)}</h4>
          <div class="refuerzo-detectives__meta">
            <span>${(tarea.evidencia.configuracion.objetivos || []).length} objetivos de práctica</span>
            <span>${tarea.visibleParaAlumno === false ? '🔒 Aún no visible' : '👁️ Visible en Mi Camino'}</span>
          </div></div>
        <span class="mision-refuerzo-detectives__estado">${escapar(tarea.estado)}</span>
      </div>
      <p>${escapar(tarea.descripcion)}</p>
      <ul>${objetivos(sesiones.find(s => s.id === tarea.evidencia.configuracion.sesionOrigenId) || {})
        .filter(o => tarea.evidencia.configuracion.objetivos?.includes(o.clave))
        .map(o => `<li>${o.tipo === 'frase' ? 'Frase' : 'Palabra'}: ${escapar(o.texto)}</li>`).join('')}</ul>
      <button class="btn secundaria" type="button" data-editar-dictado="${escapar(tarea.id)}">✏️ Revisar Misión</button>
      <label class="mision-refuerzo-detectives__visibilidad">
        <input type="checkbox" data-visibilidad-dictado="${escapar(tarea.id)}" ${tarea.visibleParaAlumno !== false ? 'checked' : ''}>
        <span>Mostrar en Mi Camino</span>
      </label>
    </article>`).join('') : '<div class="refuerzo-vacio">No hay Misiones de refuerzo de Dictado pendientes de gestión.</div>';
  lista.querySelectorAll('[data-editar-dictado]').forEach(boton => {
    boton.onclick = () => document.dispatchEvent(new CustomEvent('academia:editar-mision', {
      detail: { id: boton.dataset.editarDictado }
    }));
  });
  lista.querySelectorAll('[data-visibilidad-dictado]').forEach(control => {
    control.onchange = async () => {
      control.disabled = true;
      const visible = control.checked;
      try {
        await permiso();
        const actuales = await Academia.tareas.leer();
        const tarea = actuales.find(t => t.id === control.dataset.visibilidadDictado);
        if (!tarea || !esMisionDictado(tarea) || ['completada', 'cancelada'].includes(tarea.estado)) {
          throw Error('Esta Misión ya no está disponible para gestión. Actualiza la consulta.');
        }
        const ordenes = actuales.filter(t => t.visibleParaAlumno !== false &&
          !['completada', 'pendiente_validacion', 'completada_pendiente_validacion', 'cancelada'].includes(t.estado))
          .map(t => Number(t.ordenMision)).filter(n => Number.isFinite(n) && n > 0 && n < 9999);
        await Academia.tareas.actualizar(tarea.id, {
          visibleParaAlumno: visible,
          ordenMision: visible ? (ordenes.length ? Math.max(...ordenes) : 0) + 1 : 9999
        });
        mostrarPreparadas(await Academia.tareas.leer());
      } catch (error) {
        control.checked = !visible;
        $('dictadoMisionesEstado').textContent = `No pudimos cambiar la visibilidad: ${error.message}`;
      } finally { control.disabled = false; }
    };
  });
}

let abierto = false;
new MutationObserver(() => {
  const visible = !$('panelRefuerzos').classList.contains('hidden');
  if (visible && !abierto) cargar();
  abierto = visible;
}).observe($('panelRefuerzos'), { attributes: true, attributeFilter: ['class'] });
