// Adaptación del formulario de Misiones al catálogo real del recurso temporal.
import {META_REPASO, RECORRIDOS_REPASO} from '../../cursos/6to/sociales/preparacion-primera-evaluacion/repaso-data.js';
export {RECORRIDOS_REPASO};
export function esRepasoSocialesFormativo(datos={}) {
  try {
    const ruta=new URL(datos.recursoUrl||'', 'https://academia.invalid/').pathname.replace(/index\.html$/,'').replace(/\/?$/,'/');
    return String(datos.cursoReferencia)==='6' && /sociales/i.test(datos.materia||'') && ruta.endsWith('/'+META_REPASO.rutaActividad);
  } catch {return false;}
}
export function criterioRepasoSociales(recorridoId) {
  if(!RECORRIDOS_REPASO.some(r=>r.id===recorridoId))throw new Error('Selecciona un recorrido válido de Sociales.');
  return {tipo:'cantidad',modulo:'libre',evidenciaTipo:'sesion_academica',cantidadObjetivo:1,filtros:{actividadId:META_REPASO.actividadId,recorridoId,recorridoCompleto:true}};
}
