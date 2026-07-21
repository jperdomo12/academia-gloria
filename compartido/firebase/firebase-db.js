/* Academia de Gloria Valentina | firebase-db.js */

import { db } from "./firebase-config.js";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

export async function probarConexionFirestore() {
  const referencia = doc(db, "sistema", "prueba-conexion");

  await setDoc(
    referencia,
    {
      aplicacion: "Academia de Gloria",
      estado: "conectada",
      actualizadoEn: serverTimestamp()
    },
    { merge: true }
  );

  const resultado = await getDoc(referencia);

  if (!resultado.exists()) {
    throw new Error("Firestore no devolvió el documento de prueba.");
  }

  return {
    id: resultado.id,
    ...resultado.data()
  };
}
