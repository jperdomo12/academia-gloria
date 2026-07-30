/**
 * Detectives de Problemas · Persistencia Firestore
 * Integrado con Academia de Gloria y Firebase Web SDK 12.16.0.
 * Fuente central: compartido/firebase/firebase-config.js
 */
import { db } from "../firebase/firebase-config.js";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  writeBatch
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const ROOT_COLLECTION = "usuarios";
const PROGRESS_COLLECTION = "detectivesHistorias";
const SESSION_COLLECTION = "sesiones";

function requireUid(uid){
  const value = String(uid || "").trim();
  if(!value) throw new Error("Se requiere un usuario autenticado.");
  return value;
}

function progressRef(uid,historiaId){
  return doc(db,ROOT_COLLECTION,requireUid(uid),PROGRESS_COLLECTION,String(historiaId));
}

function sessionsRef(uid,historiaId){
  return collection(progressRef(uid,historiaId),SESSION_COLLECTION);
}

function timestampToISO(value){
  if(!value) return null;
  if(typeof value.toDate === "function") return value.toDate().toISOString();
  if(value instanceof Date) return value.toISOString();
  return String(value);
}

function normalizeProgress(snapshot){
  const data = snapshot.data();
  return {
    id:snapshot.id,
    ...data,
    primeraResolucion:timestampToISO(data.primeraResolucion),
    ultimaResolucion:timestampToISO(data.ultimaResolucion)
  };
}

function normalizeSession(snapshot){
  const data = snapshot.data();
  return {
    id:snapshot.id,
    ...data,
    completadaEn:timestampToISO(data.completadaEn)
  };
}

export async function registrarResolucionDetective(uid,registro){
  requireUid(uid);
  if(!registro?.historiaId) throw new Error("La resolución no contiene historiaId.");

  const historiaId = String(registro.historiaId);
  const summaryRef = progressRef(uid,historiaId);
  const sessionRef = doc(sessionsRef(uid,historiaId));
  const attempts = Number(registro.intentosTotales || 0);

  await runTransaction(db,async transaction => {
    const currentSnapshot = await transaction.get(summaryRef);
    const current = currentSnapshot.exists() ? currentSnapshot.data() : null;
    const previousBest = Number(current?.mejorIntentos || 0);
    const bestAttempts = previousBest > 0 ? Math.min(previousBest,attempts || previousBest) : attempts;

    const summary = {
      historiaId,
      nivel:Number(registro.nivel || 0),
      tema:String(registro.tema || ""),
      tipo:String(registro.tipo || "simple"),
      primeraResolucion:current?.primeraResolucion || serverTimestamp(),
      ultimaResolucion:serverTimestamp(),
      vecesCompletada:increment(1),
      mejorIntentos:bestAttempts || null,
      ultimoIntentos:attempts,
      pistasUltimaSesion:Number(registro.pistasUtilizadas || 0),
      operacionCorrecta:String(registro.operacionCorrecta || ""),
      ultimosOperandosIndicados:Array.isArray(registro.operandosIndicados)
        ? registro.operandosIndicados.map(Number)
        : [],
      ultimoResultadoIndicado:Number(registro.resultadoIndicado),
      estado:String(registro.estado || "en_practica"),
      actualizadaEn:serverTimestamp()
    };

    if(currentSnapshot.exists()) transaction.update(summaryRef,summary);
    else transaction.set(summaryRef,summary);

    transaction.set(sessionRef,{
      historiaId,
      nivel:Number(registro.nivel || 0),
      tema:String(registro.tema || ""),
      tipo:String(registro.tipo || "simple"),
      intentosTotales:attempts,
      intentosComprension:Number(registro.intentosComprension || 0),
      intentosDescubrimiento:Number(registro.intentosDescubrimiento || 0),
      intentosOperacion:Number(registro.intentosOperacion || 0),
      intentosOperandos:Number(registro.intentosOperandos || 0),
      intentosResultado:Number(registro.intentosResultado || 0),
      pistasUtilizadas:Number(registro.pistasUtilizadas || 0),
      operacionIndicada:String(registro.operacionIndicada || ""),
      operacionCorrecta:String(registro.operacionCorrecta || ""),
      operandosIndicados:Array.isArray(registro.operandosIndicados)
        ? registro.operandosIndicados.map(Number)
        : [],
      operandosCorrectos:Array.isArray(registro.operandosCorrectos)
        ? registro.operandosCorrectos.map(Number)
        : [],
      resultadoIndicado:Number(registro.resultadoIndicado),
      resultadoCorrecto:Number(registro.resultadoCorrecto),
      pasos:Array.isArray(registro.pasos) ? registro.pasos : [],
      completadaEn:serverTimestamp()
    });
  });

  return {historiaId,guardado:true};
}

export async function obtenerHistorialDetectives(uid){
  const ref = collection(db,ROOT_COLLECTION,requireUid(uid),PROGRESS_COLLECTION);
  const snapshot = await getDocs(query(ref,orderBy("ultimaResolucion","desc")));
  return snapshot.docs.map(normalizeProgress);
}

export async function obtenerProgresoHistoria(uid,historiaId){
  const snapshot = await getDoc(progressRef(uid,historiaId));
  return snapshot.exists() ? normalizeProgress(snapshot) : null;
}

export async function obtenerSesionesHistoria(uid,historiaId){
  const snapshot = await getDocs(query(sessionsRef(uid,historiaId),orderBy("completadaEn","desc")));
  return snapshot.docs.map(normalizeSession);
}

async function borrarSubcoleccionSesiones(uid,historiaId){
  const snapshot = await getDocs(sessionsRef(uid,historiaId));
  const chunks = [];
  for(let index=0; index<snapshot.docs.length; index+=400){
    chunks.push(snapshot.docs.slice(index,index+400));
  }
  for(const chunk of chunks){
    const batch = writeBatch(db);
    chunk.forEach(item => batch.delete(item.ref));
    await batch.commit();
  }
}

export async function reiniciarProgresoHistoria(uid,historiaId){
  await borrarSubcoleccionSesiones(uid,historiaId);
  await deleteDoc(progressRef(uid,historiaId));
}

export async function eliminarSesionHistoria(uid,historiaId,sesionId){
  await deleteDoc(doc(sessionsRef(uid,historiaId),String(sesionId)));
}

export async function eliminarHistorialDetectives(uid){
  const history = await obtenerHistorialDetectives(uid);
  for(const item of history){
    await reiniciarProgresoHistoria(uid,item.historiaId || item.id);
  }
}

export async function marcarEstadoHistoria(uid,historiaId,estado){
  const allowed = new Set(["en_practica","reforzar","dominada"]);
  if(!allowed.has(estado)) throw new Error("Estado de aprendizaje no válido.");
  await setDoc(progressRef(uid,historiaId),{
    estado,
    actualizadaEn:serverTimestamp()
  },{merge:true});
}
