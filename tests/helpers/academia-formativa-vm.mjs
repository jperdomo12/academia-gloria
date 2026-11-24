// Servicios reales de sesiones y Misiones con SDK/identidad controlados, no Rules desplegadas.
import fs from 'node:fs';
import vm from 'node:vm';
export async function crearAcademiaQA({datos=new Map(),propia=true,gestion=true}={}){
 const writes=[],identidad={esPersonaPropia:propia,usuario:{userId:'alumno'},personaActiva:{personaId:'persona-alumno',curso:'6.º',nombre:'Alumno QA'},userIdPersonaActiva:'alumno'};
 let falloDespuesDeCommit=false,falloEnlace=false,cola=Promise.resolve();
 const ref=(base,...parts)=>{const p=[base?.path||'',...parts].filter(Boolean).join('/');return{path:p,id:p.split('/').at(-1)};};
 const snap=r=>({id:r.id,exists:()=>datos.has(r.path),data:()=>structuredClone(datos.get(r.path))});
 const set=(r,d,merge=false)=>{writes.push(r.path);datos.set(r.path,merge?{...datos.get(r.path),...structuredClone(d)}:structuredClone(d));};
 const update=(r,d)=>{writes.push(r.path);const next=structuredClone(datos.get(r.path)||{});for(const[k,v]of Object.entries(d)){const parts=k.split('.');let at=next;for(const p of parts.slice(0,-1))at=at[p]??={};at[parts.at(-1)]=structuredClone(v);}datos.set(r.path,next);};
 const sdk={collection:(base,...p)=>ref(base,...p),doc:(base,...p)=>ref(base,...p.length?p:['aleatorio-'+writes.length]),getDoc:async r=>snap(r),
 getDocs:async r=>({docs:[...datos.keys()].filter(k=>k.startsWith(r.path+'/')&&!k.slice(r.path.length+1).includes('/')).filter(k=>(r.filters||[]).filter(f=>f?.field).every(f=>datos.get(k)?.[f.field]===f.value)).map(k=>snap(ref({path:k})))}),
 query:(r,...filters)=>({...r,filters}),where:(field,op,value)=>({field,op,value}),orderBy:()=>null,serverTimestamp:()=>new Date().toISOString(),setDoc:async(r,d)=>set(r,d),updateDoc:async(r,d)=>update(r,d),
 addDoc:async(r,d)=>{const x=ref(r,'nuevo-'+writes.length);set(x,d);return x;},deleteDoc:async r=>datos.delete(r.path),onSnapshot:()=>()=>{},Timestamp:{fromDate:d=>d},
 runTransaction:async(_,fn)=>{const actual=cola.then(async()=>{const pending=[];const r=await fn({get:async r=>snap(r),set:(...a)=>pending.push({path:a[0].path,apply:()=>set(...a)}),update:(...a)=>pending.push({path:a[0].path,apply:()=>update(...a)})});if(falloEnlace&&pending.some(p=>p.path.includes('/evidencias/'))){falloEnlace=false;throw Error('Enlace no confirmado por red');}pending.forEach(p=>p.apply());if(falloDespuesDeCommit){falloDespuesDeCommit=false;throw Error('Respuesta perdida después de commit');}return r;});cola=actual.catch(()=>{});return actual;}};
 const contexto={inicializar:async()=>identidad,exigirEscrituraEducativa:async opciones=>{if(!propia||opciones?.requiereGestion&&!gestion)throw Error('Sin permiso de escritura educativa');return identidad;},obtenerUserIdPersonaActiva:async()=>'alumno',esAdministrador:async()=>false};
 const ctx=vm.createContext({console,URL,URLSearchParams,Date,structuredClone});
 async function sintetico(values){const m=new vm.SyntheticModule(Object.keys(values),function(){for(const[k,v]of Object.entries(values))this.setExport(k,v);},{context:ctx});await m.link(()=>{});await m.evaluate();return m;}
 const cache=new Map();
 async function cargar(ruta){if(cache.has(ruta))return cache.get(ruta);const source=fs.readFileSync(ruta,'utf8');const m=new vm.SourceTextModule(source,{context:ctx,identifier:ruta,initializeImportMeta:meta=>meta.url='https://academia.invalid/'+ruta,
 importModuleDynamically:async spec=>spec.includes('contexto-usuario')?sintetico({ContextoUsuario:contexto}):spec.includes('api/academia')?cargar('compartido/api/academia.js'):Promise.reject(Error('Import inesperado '+spec))});cache.set(ruta,m);
 await m.link(async spec=>spec.includes('firebase-config')?sintetico({db:{},auth:{currentUser:{uid:'alumno'}}}):spec.includes('contexto-usuario')?sintetico({ContextoUsuario:contexto}):spec.includes('perfil-usuario')?sintetico({PerfilUsuario:{}}):spec.includes('modelos/evento')?sintetico({crearEvento:()=>{}}):sintetico(sdk));await m.evaluate();return m;}
 const api=(await cargar('compartido/api/academia.js')).namespace.Academia;
 const sesiones=(await cargar('compartido/js/sesiones-academicas.js')).namespace;
 return{api,sesiones,datos,writes,identidad,contexto,fallarDespuesCommit:()=>falloDespuesDeCommit=true,
 fallarProximaEvidencia:()=>falloEnlace=true};
}
