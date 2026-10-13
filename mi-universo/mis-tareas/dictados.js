/* Observaciones de Dictado: selecciona evidencia y prepara el formulario común.
 * La creación, edición y visibilidad pertenecen a Gestión de Misiones.
 */
import { Academia } from '../../compartido/api/academia.js';
import { ContextoUsuario } from '../../compartido/js/contexto-usuario.js';
import { leerSesionesAcademicas } from '../../compartido/js/sesiones-academicas.js';
import { reales, objetivos, prepararMision, fechaDictado } from '../rincon-dictados/seguimiento.js';

const $ = id => document.getElementById(id);
const escapar = valor => String(valor ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));
let sesiones = [];
let identidad = '';
let ocupado = false;

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
  } finally {
    ocupado = false;
    $('actualizarDictados').disabled = false;
    $('dictadoIntento').disabled = false;
    $('crearRefuerzoDictado').disabled = false;
  }
}

$('actualizarDictados').onclick = cargar;
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
let abierto = false;
new MutationObserver(() => {
  const visible = !$('panelRefuerzos').classList.contains('hidden');
  if (visible && !abierto) cargar();
  abierto = visible;
}).observe($('panelRefuerzos'), { attributes: true, attributeFilter: ['class'] });
