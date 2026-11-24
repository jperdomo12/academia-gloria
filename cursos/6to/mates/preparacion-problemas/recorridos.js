// Metadatos del recurso existente y adaptación al contrato sesion-academica-v1.
// No contiene otro banco ni implementa evaluación: recibe fases reales del motor.
export const META_PREPARACION = Object.freeze({actividadId:'6-mates-preparacion-problemas',tituloActividad:'Me preparo para los problemas',cursoReferencia:'6',materia:'Matemáticas',tema:'Me preparo para los problemas',versionActividad:'2.0',versionPlan:'10x2-v1'});
export const RECORRIDOS_MISION = Object.freeze([
  {id:'gaudem',titulo:'Mi ficha de Gaudem',cantidad:5,bloques:1},
  {id:'ensayo',titulo:'Compruebo que puedo',cantidad:10,bloques:2}
]);
export function criterioPreparacion(recorridoId){
  const r=RECORRIDOS_MISION.find(r=>r.id===recorridoId);
  if(!r)throw new Error('Elige uno de los dos recorridos de esta Misión.');
  return {tipo:'cantidad',modulo:'libre',evidenciaTipo:'sesion_academica',cantidadObjetivo:r.bloques,
    filtros:{actividadId:META_PREPARACION.actividadId,recorridoId,versionPlan:META_PREPARACION.versionPlan,
      ...(recorridoId==='ensayo'?{bloqueCompleto:true,bloquesPorVuelta:2,totalProblemasVuelta:10}:{recorridoCompleto:true})}};
}
export function crearRegistroPreparacion({intento,problemas,fasesDe,finCliente,tiempo={},misionId=''}){
  const cantidad=intento.recorridoId==='comprendo'?4:5;
  if(problemas.length!==cantidad||new Set(problemas.map(p=>p.id)).size!==cantidad)throw new Error('El recorrido está incompleto.');
  const respuestas=problemas.flatMap(p=>fasesDe(p).map((f,i)=>{
    const registro=intento.fases.get(`${p.id}:${i}`),historial=registro?.intentos||[],pistas=registro?.pistas||[];
    const primera=historial[0],final=historial.at(-1);
    if(!primera||!final?.correcta)throw new Error('Faltan fases resueltas. No se guardará un recorrido parcial.');
    return {preguntaId:`${p.id}:${i}`,problemaId:p.id,bloqueId:p.tipo||'comprension',conceptoId:`${p.tipo||'comprension'}:${i}`,tipoEvidencia:'practica_formativa',
      titulo:`${p.titulo} · Paso ${i+1}`,enunciado:p.enunciado,pregunta:f.pregunta,respuesta:final.respuesta,respuestaTexto:final.respuestaTexto,
      respuestaCorrecta:f.tipo==='opcion'?f.correcta:f.valor,respuestaCorrectaTexto:f.tipo==='opcion'?f.opciones[f.correcta]:String(f.valor),
      primeraRespuesta:{...primera},respuestaFinal:{...final},correctaPrimerIntento:primera.correcta,correcta:primera.correcta&&pistas.length===0,resuelta:true,errorInicial:!primera.correcta,
      intentos:historial.length,historialIntentos:historial.map(x=>({...x})),pistasUtilizadas:pistas.map(x=>({...x})),duda:false,requiereRefuerzo:!primera.correcta||pistas.length>0,explicacion:f.explicacion};
  }));
  if(!intento.identidad.personaId||!intento.identidad.actorUserId)throw new Error('No se pudo fijar la identidad del intento.');
  const contar=fn=>respuestas.filter(fn).length;
  const porBloque=[...new Set(respuestas.map(r=>r.bloqueId))].map(bloqueId=>{const rs=respuestas.filter(r=>r.bloqueId===bloqueId);return{bloqueId,total:rs.length,completadas:rs.length,correctas:rs.filter(r=>r.correcta).length,conPistas:rs.filter(r=>r.pistasUtilizadas.length).length,conReintentos:rs.filter(r=>r.intentos>1).length,dudas:0,estado:rs.some(r=>r.requiereRefuerzo)?'reforzar':'solido'};});
  return {...META_PREPARACION,modo:'aprendizaje',intentoId:intento.id,personaIdEsperada:intento.identidad.personaId,actorUserIdEsperado:intento.identidad.actorUserId,
    misionId,vincularMision:Boolean(misionId),inicioCliente:intento.inicioCliente,finCliente,...tiempo,
    conceptosTrabajados:[...new Set(respuestas.map(r=>r.conceptoId))],variantes:problemas.map(p=>({varianteId:p.id,bloqueId:p.tipo||'comprension'})),respuestas,
    resumen:{tipoEvaluacion:'practica_formativa',completa:true,recorridoId:intento.recorridoId,recorridoTitulo:RECORRIDOS_MISION.find(r=>r.id===intento.recorridoId)?.titulo||'Comprendo la historia',
      versionPlan:META_PREPARACION.versionPlan,unidadRecorrido:intento.recorridoId==='comprendo'?'microactividades':'problemas',totalUnidades:cantidad,unidadesCompletadas:cantidad,
      totalPreguntas:respuestas.length,preguntasCompletadas:respuestas.length,totalCorrectas:contar(r=>r.correcta),correctasPrimerIntento:contar(r=>r.correctaPrimerIntento),erroresIniciales:contar(r=>r.errorInicial),conPistas:contar(r=>r.pistasUtilizadas.length),conReintentos:contar(r=>r.intentos>1),dudasMarcadas:0,criterioCorrecta:'primer_intento_sin_pistas',porBloque,
      problemas:problemas.map(p=>({...p})),...(intento.recorridoId==='ensayo'?{alcance:'bloque',bloqueId:intento.bloqueId,vueltaId:intento.vueltaId,bloqueCompleto:true,bloquesPorVuelta:2,totalProblemasVuelta:10}: {})},
    retroalimentacion:{mensajeVisible:'Recorrido formativo realizado. Las primeras respuestas y los apoyos se conservan para comprender cómo se ha trabajado, sin nota ni porcentaje de dominio.'}};
}
