// Adaptación al recurso real. La identidad y los objetivos viven junto al motor existente.
export {RECORRIDOS_MISION,criterioPreparacion} from '../../cursos/6to/mates/preparacion-problemas/recorridos.js';
export function esPreparacionMates(datos={}){
  try{const ruta=new URL(datos.recursoUrl||'','https://academia.invalid/').pathname.replace(/index\.html$/,'').replace(/\/?$/,'/');
    return String(datos.cursoReferencia)==='6'&&/matem[áa]ticas/i.test(datos.materia||'')&&ruta.endsWith('/cursos/6to/mates/preparacion-problemas/');
  }catch{return false;}
}
