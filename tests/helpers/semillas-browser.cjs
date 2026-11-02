// SDK e identidad simulados; ContextoUsuario, API, Motor y lectores reales.
const sdk = `
const read=()=>JSON.parse(localStorage.qaDB||'{}');
const snap=(path,data)=>({id:path.split('/').at(-1),exists:()=>data!==undefined,data:()=>structuredClone(data)});
const observers=[];
export const doc=(ref,...p)=>{const path=[ref.path,...(p.length?p:['auto-'+Date.now()])].filter(Boolean).join('/');return{path,id:path.split('/').at(-1)};};
export const collection=(ref,...p)=>({path:[ref.path,...p].filter(Boolean).join('/')});
export const where=(field,op,value)=>({field,op,value});export const orderBy=(field,dir)=>({order:field,dir});export const query=(ref,...filters)=>({...ref,filters});
export const getDoc=async r=>snap(r.path,read()[r.path]);
export const getDocs=async r=>{const a=Object.entries(read()).filter(([p])=>p.startsWith(r.path+'/')&&!p.slice(r.path.length+1).includes('/')).filter(([p,v])=>(r.filters||[]).every(f=>!f.field||v[f.field]===f.value));return {docs:a.map(([p,v])=>snap(p,v)),empty:!a.length};};
const write=(r,d,merge=false)=>{window.qaWritePaths=(window.qaWritePaths||[]);window.qaWritePaths.push(r.path);window.qaWrites=(window.qaWrites||0)+1;const a=read();if(merge){const next=structuredClone(a[r.path]||{});for(const [key,value] of Object.entries(d)){const parts=key.split('.');let at=next;for(const part of parts.slice(0,-1))at=at[part]??={};at[parts.at(-1)]=value;}a[r.path]=next;}else a[r.path]=d;localStorage.qaDB=JSON.stringify(a);for(const o of observers)queueMicrotask(async()=>o.cb(await getDocs(o.ref)));};
export const setDoc=async(r,d,o)=>write(r,d,o?.merge);export const updateDoc=async(r,d)=>write(r,d,true);export const addDoc=async(r,d)=>{const id='nueva-'+Date.now();write({path:r.path+'/'+id},d);return{id};};
export const deleteDoc=async r=>{window.qaWrites=(window.qaWrites||0)+1;const a=read();delete a[r.path];localStorage.qaDB=JSON.stringify(a);};
export const serverTimestamp=()=>new Date().toISOString();export const Timestamp={now:()=>new Date().toISOString(),fromDate:d=>d.toISOString()};
export const onSnapshot=(ref,cb)=>{observers.push({ref,cb});queueMicrotask(async()=>cb(await getDocs(ref)));return()=>{};};
export const runTransaction=async(db,fn)=>fn({get:getDoc,set:setDoc,update:updateDoc});
export const increment=n=>n;export const writeBatch=()=>{const ops=[];return{delete:r=>ops.push(r),commit:async()=>{for(const r of ops)await deleteDoc(r);}};};
`;
const seed = (role) => {
  const actor = role === "gestion" ? "familiar" : "profesional",
    person = "persona-" + actor;
  const rows = {
    ["usuarios/" + actor]: {
      personaId: person,
      activo: true,
      nombre: "Actor de prueba",
    },
    "usuarios/alumno": {
      personaId: "persona-alumno",
      activo: true,
      nombre: "Alumno de prueba",
    },
    ["personas/" + person]: { nombre: "Actor de prueba", activo: true },
    "personas/persona-alumno": { nombre: "Alumno de prueba", activo: true },
    ["usuarioRoles/" + actor]: { roleId: role, activo: true },
    ["roles/" + role]: { nombre: role, nivelAcceso: role, activo: true },
    ["personaRelaciones/" + person + "__persona-alumno"]: {
      sourcePersonId: person,
      targetPersonId: "persona-alumno",
      activo: true,
      nivelAcceso: role,
      tipoRelacion: "profesional",
    },
    "usuarios/alumno/tareas/mision-test": {
      titulo: "Misión del alumno",
      tipo: "actividad_modulo",
      modulo: "rincon-lectura",
      estado: "pendiente",
      visibleParaAlumno: false,
      ordenMision: 1,
      descripcion: "Objetivo educativo",
      criterioCumplimiento: {
        tipo: "cantidad",
        evidenciaTipo: "lectura_completada",
        cantidadObjetivo: 1,
      },
      progreso: { cantidadActual: 0, cantidadObjetivo: 1 },
    },
    "usuarios/alumno/sesionesLectura/actual": {
      historiaId: "lectura-test",
      titulo: "La lectura reciente",
      actualizadaEn: "2026-10-13T10:00:00Z",
      analisisLectura: {
        palabrasParaCrecer: [
          { palabra: "extraños", estado: "pendiente", intentos: 2 },
          { palabra: "logrado", estado: "success", intentos: 3 },
        ],
      },
    },
    "usuarios/alumno/sesionesLectura/antigua": {
      historiaId: "lectura-anterior",
      titulo: "La lectura anterior",
      actualizadaEn: "2026-10-12T10:00:00Z",
      analisisLectura: {
        palabrasParaCrecer: [
          { palabra: "extraños", estado: "superada", intentos: 1 },
        ],
      },
    },
  };
  return { actor, rows };
};
async function crearEntorno(b, role, valid = true, nivelRelacion = role) {
  const c = await b.newContext({ viewport: { width: 1280, height: 1000 } });
  const p = await c.newPage();
  p.setDefaultTimeout(15000);
  const errors = [];
  p.on("pageerror", (e) => {
    errors.push(e.message);
    console.error("Browser:", e.message);
  });
  p.on("response", (r) => {
    if (r.status() >= 400) console.warn("HTTP " + r.status() + ": " + r.url());
  });
  p.on("console", (m) => {
    if (m.type() === "error") console.error(m.text());
  });
  const fixture = seed(role);
  if (role === "alumno") {
    fixture.actor = "alumno";
    fixture.rows["usuarioRoles/alumno"] = { roleId: "alumno", activo: true };
    fixture.rows["roles/alumno"] = {
      nombre: "Alumno",
      nivelAcceso: "consulta",
      activo: true,
    };
    fixture.rows["personas/persona-alumno"].curso = "6.º";
    fixture.rows["personas/persona-alumno"].colegio = "Gaudem";
    fixture.rows["usuarios/alumno"].curso = "6.º";
  }
  if (role !== "alumno")
    fixture.rows[
      "personaRelaciones/persona-" + fixture.actor + "__persona-alumno"
    ].nivelAcceso = nivelRelacion;
  if (!valid)
    delete fixture.rows[
      "personaRelaciones/persona-" + fixture.actor + "__persona-alumno"
    ];
  await p.addInitScript((f) => {
    if (!localStorage.qaDB) {
      localStorage.qaDB = JSON.stringify(f.rows);
      localStorage.qaActor = f.actor;
    }
    if (!sessionStorage.getItem("academia.personaActivaId"))
      sessionStorage.setItem("academia.personaActivaId", "persona-alumno");
  }, fixture);
  await p.route("https://fonts.googleapis.com/**", (r) =>
    r.fulfill({ body: "", contentType: "text/css" }),
  );
  await p.route("https://unpkg.com/**", (r) =>
    r.fulfill({
      body: "window.lucide={createIcons(){}}",
      contentType: "text/javascript",
    }),
  );
  await p.route("**/firebase-firestore.js", (r) =>
    r.fulfill({ body: sdk, contentType: "text/javascript" }),
  );
  await p.route("https://www.gstatic.com/**/firebase-auth.js", (r) =>
    r.fulfill({
      body: "export const signOut=async()=>{};export const onAuthStateChanged=(auth,cb)=>{queueMicrotask(()=>cb(auth.currentUser));return()=>{};};",
      contentType: "text/javascript",
    }),
  );
  await p.route("**/compartido/firebase/firebase-config.js", (r) =>
    r.fulfill({
      body: "export const db={};export const auth={authStateReady:async()=>{},get currentUser(){return {uid:localStorage.qaActor,email:'prueba@example.invalid'}}};",
      contentType: "text/javascript",
    }),
  );
  await p.route("**/compartido/firebase/firebase-auth.js", (r) =>
    r.fulfill({
      body: "export const observarSesion=()=>()=>{};",
      contentType: "text/javascript",
    }),
  );
  await p.route("**/registro-acceso.js", (r) =>
    r.fulfill({
      body: "export async function registrarAccesoAcademia(){}",
      contentType: "text/javascript",
    }),
  );
  await p.route("**/timeout-sesion.js", (r) =>
    r.fulfill({
      body: "export async function activarTimeoutSesion(){}",
      contentType: "text/javascript",
    }),
  );
  return { c, p, errors };
}
module.exports = { crearEntorno };
