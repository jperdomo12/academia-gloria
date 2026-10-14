export const TEMAS_LENGUA = Object.freeze([
  Object.freeze({
    id:"verbos", ruta:"./verbos/", icono:"🔤",
    titulo:"Verbos · Indicativo, subjuntivo e imperativo",
    descripcion:"Conecta el repaso de 5.º con los modos y tiempos de 6.º: significado, formas y uso en contexto.",
    pistas:Object.freeze(["Repaso de 5.º", "Indicativo", "Subjuntivo", "Imperativo"]),
    estado:"Tema de 6.º", acento:"#d87968", acentoSuave:"#fff1ec", acentoTexto:"#9c584d",
    accion:"Entrar al tema →", conservarRetorno:true
  }),
  Object.freeze({
    id:"gramatica-verbos-lenguizonas", ruta:"../zonas/lenguizonas/gramatica-verbos/", icono:"✏️",
    titulo:"Gramática · Repasamos los verbos",
    descripcion:"La ficha de Lengüizonas ya incorporada: forma, número, persona y contexto.",
    pistas:Object.freeze(["Lengüizonas", "Simple y compuesta", "Persona y número"]),
    estado:"Repaso de Lengüizonas", acento:"#d87968", acentoSuave:"#fff1ec", acentoTexto:"#9c584d",
    accion:"Repasar →", conservarRetorno:true
  })
]);
