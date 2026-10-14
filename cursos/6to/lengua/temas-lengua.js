import { TEMAS_VERBOS_DOCUMENTOS } from "./verbos/temas-por-documento.js";

export const TEMAS_LENGUA = Object.freeze([
  ...TEMAS_VERBOS_DOCUMENTOS.map(tema => Object.freeze({
    id: tema.id, ruta: tema.ruta, icono: "🔤", titulo: tema.titulo,
    descripcion: tema.descripcion,
    pistas: Object.freeze(tema.bloques.map(b => b.titulo)),
    estado: tema.id === "el-verbo" ? "Continuidad de 5.º" : "Tema de 6.º",
    acento: "#d87968", acentoSuave: "#fff1ec", acentoTexto: "#9c584d",
    accion: "Entrar al tema →", conservarRetorno: true
  })),
  Object.freeze({
    id:"gramatica-verbos-lenguizonas", ruta:"../zonas/lenguizonas/gramatica-verbos/", icono:"✏️",
    titulo:"Gramática · Repasamos los verbos",
    descripcion:"La ficha de Lengüizonas ya incorporada: forma, número, persona y contexto.",
    pistas:Object.freeze(["Lengüizonas", "Simple y compuesta", "Persona y número"]),
    estado:"Repaso de Lengüizonas", acento:"#d87968", acentoSuave:"#fff1ec", acentoTexto:"#9c584d",
    accion:"Repasar →", conservarRetorno:true
  })
]);
