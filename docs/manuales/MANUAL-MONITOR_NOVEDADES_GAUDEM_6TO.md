# 🔎 Manual · Monitor de novedades Gaudem 6.º
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/manuales/MANUAL-MONITOR_NOVEDADES_GAUDEM_6TO.md` |
| **Versión** | 1.5 |
| **Estado** | Activo |
| **Fecha de origen** | 17/09/2026 |
| **Última actualización** | 24/09/2026 |
| **Propietario** | Operación escolar · 6.º de Primaria |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Procedimiento local para detectar cambios en las páginas de áreas y zonas académicas del Site privado de 6.º de Gaudem desde un navegador ya autenticado |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/README.md` | **Orienta:** portal general de la documentación oficial. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna:** incorporación posterior de material escolar real a Academia cuando una novedad detectada deba convertirse en Tema o recurso académico. |
| `docs/project/PROJECT_MAP.md` | **Orienta:** ubicación y responsabilidad de los dominios del proyecto. |
| `AGENTS.md` | **Gobierna:** reglas operativas, clasificación de estado y disciplina documental. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.5 | 24/09/2026 | Product Owner + AI Collaborator | Promueve a estable la solución de doble línea base tras validación real en navegador autenticado: 18 espacios revisados, seguimiento documental activo y ausencia de falsos cambios. Conserva `gaudem6_detalle_v2` para compatibilidad histórica y `gaudem6_recursos_v3` para documentos Drive/Docs/PDF/ofimáticos. |
| 1.5-rc2b | 24/09/2026 | Product Owner + AI Collaborator | Ajusta la lectura de la segunda línea base usando primero su valor raw en `localStorage` y añade una marca visible de versión al aviso de revisión para eliminar ambigüedad durante la validación. |
| 1.5-rc2 | 24/09/2026 | Product Owner + AI Collaborator | Sustituye el candidato 1.5-rc1 descartado. Mantiene intacta la comparación histórica `gaudem6_detalle_v2` y añade una segunda línea base independiente `gaudem6_recursos_v3` para documentos Drive/Docs/PDF/ofimáticos. La nueva señal no genera diferencias hasta ser inicializada explícitamente mediante `✅ Aceptar cambios Gaudem`, evitando reinterpretar como novedades los recursos antiguos. |
| 1.4 | 22/09/2026 | Product Owner + AI Collaborator | Simplifica la salida de `🔎 Revisar Gaudem 6.º`: cuando detecta diferencias, informa únicamente qué área/zona cambió, sin listar textos ni URLs. La comparación interna detallada se conserva para mantener precisión. |
| 1.3 | 22/09/2026 | Product Owner + AI Collaborator | Completa el descubrimiento de espacios de Gaudem incorporando `english-zones`, cuya ruta no cuelga de `/zonas/`. Mantiene compatibilidad con la línea base local y clasifica Linguizonas, Matezonas y English Zones como `ZONA`. |
| 1.2 | 22/09/2026 | Product Owner + AI Collaborator | Amplía el monitor para descubrir y comparar tanto `/áreas/` como `/zonas/`, corrige la limitación que impedía detectar cambios en Linguizonas/Matezonas, preserva la línea base `gaudem6_detalle_v2`, muestra detalle inicial de espacios nuevos y adopta el bloque obligatorio **Resumen de contenido**. |
| 1.1 | 17/09/2026 | Product Owner + AI Collaborator | Explicita qué representa el Site privado `https://sites.google.com/gaudem.es/sexto/inicio` en el trabajo escolar de 6.º y su relación con Academia: es la fuente donde Gaudem publica materiales que los alumnos deben considerar para su preparación, habitualmente trabajados o explicados en clase, y esos materiales constituyen la base curricular prioritaria para desarrollar `Cursos → 6.º de Primaria` en Academia. |
| 1.0 | 17/09/2026 | Product Owner + AI Collaborator | Documenta el monitor semi-manual validado para revisar desde `Inicio` las materias de 6.º de Gaudem, conservar una línea base local, detectar cambios concretos y aceptar explícitamente un nuevo estado. Registra además como evolución pendiente la unificación de los dos marcadores actuales en uno solo. |

---

## 🧭 Resumen de contenido

| Punto | Contenido |
|---|---|
| 1. Propósito | Explica para qué existe el monitor y cómo se relaciona con la incorporación curricular de 6.º. |
| 2. Estado actual | Describe la solución operativa vigente basada en bookmarklets locales. |
| 3. Flujo normal de uso | Indica cómo revisar novedades y cuándo aceptar una nueva línea base. |
| 4. Línea base local | Explica dónde se conserva el estado conocido y cómo se recupera. |
| 5. Privacidad y seguridad | Define las garantías de ejecución local y uso de la sesión autenticada. |
| 6. Qué compara | Detalla qué espacios, textos y recursos se descubren y normalizan. |
| 7. Validación realizada | Registra las comprobaciones efectuadas sobre estabilidad y detección. |
| 8. Reconstrucción de los marcadores | Conserva el código oficial de los bookmarklets de revisión y aceptación. |
| 9. Incidencias habituales | Resume causas y acciones ante fallos o ruido de comparación. |
| 10. Evolución aprobada pendiente | Documenta la futura unificación de los dos marcadores. |
| 11. Relación con Academia | Conecta las novedades de Gaudem con el estándar curricular y el producto. |
| DECISIÓN | Resume el estado operativo y las reglas que deben preservarse. |

---

## 🎯 1. Propósito

Conservar de forma oficial y recuperable el procedimiento creado para responder a esta necesidad:

> Estando ya autenticado en el Site privado de 6.º de Gaudem, ejecutar una revisión local que indique si alguna materia contiene cambios respecto a la última línea base aceptada.

### 1.1 Fuente escolar de referencia

El punto de entrada del monitor es:

```text
https://sites.google.com/gaudem.es/sexto/inicio
```

En el contexto de 6.º de Primaria, este Site privado es el espacio que el **Colegio Gaudem** utiliza para publicar los documentos y materiales que los alumnos deben considerar para su preparación académica. La gran mayoría de estos materiales son explicados o trabajados en clase y funcionan como referencia directa del contenido que el alumno debe comprender, practicar o repasar.

Para **Academia Gloria Valentina**, estos materiales constituyen la **base curricular prioritaria** para desarrollar la zona:

```text
Cursos
→ 6.º de Primaria
→ Asignatura
→ Tema
```

Por tanto, el monitor no es únicamente una utilidad técnica de detección de cambios. Su función práctica es ayudar a descubrir de forma temprana cuándo Gaudem publica o modifica material que podría requerir revisión e incorporación a Academia.

La relación correcta es:

```text
Gaudem publica / actualiza material
→ el monitor detecta la novedad
→ se revisa el documento real
→ se determina su relevancia para Academia
→ se aplica STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR
→ se incorpora o evoluciona Curso → Asignatura → Tema cuando corresponda
```

El Site de Gaudem es la fuente escolar de referencia; **Academia no debe copiarlo mecánicamente**. La incorporación debe preservar la terminología, método, nivel y contenido del material escolar, pudiendo reorganizarlo o enriquecerlo de acuerdo con los estándares pedagógicos y de accesibilidad de Academia.

La solución actual utiliza **bookmarklets**: marcadores del navegador cuyo campo URL contiene JavaScript que se ejecuta sobre la página abierta.

No requiere:

- instalar extensiones;
- permisos de administrador del equipo;
- compartir credenciales con Academia o con un tercero;
- crear un servicio externo de monitorización;
- ni modificar el Site de Gaudem.

---

## 📌 2. Estado actual

### HECHO · solución validada

La solución operativa actual utiliza dos marcadores:

```text
🔎 Revisar Gaudem 6.º
✅ Aceptar cambios Gaudem
```

El primero compara el estado actual con una línea base local.

El segundo sustituye la línea base únicamente cuando el usuario confirma que los cambios detectados ya fueron revisados y deben considerarse el nuevo estado conocido.

### IMPORTANTE · no es una función desplegada de Academia

Este monitor **no forma parte actualmente de la aplicación web de Academia Gloria Valentina**.

Su ejecución ocurre localmente en el navegador autenticado contra:

```text
https://sites.google.com/gaudem.es/sexto/inicio
```

El repositorio conserva este manual como fuente oficial del procedimiento y del código necesario para reconstruir los marcadores si se pierden.

---

## 🧭 3. Flujo normal de uso

1. Abrir Chrome con el mismo perfil que dispone de acceso autorizado a Gaudem.
2. Entrar en:

```text
https://sites.google.com/gaudem.es/sexto/inicio
```

3. Si Google solicita autenticación, iniciar sesión normalmente.
4. Pulsar:

```text
🔎 Revisar Gaudem 6.º
```

5. Esperar unos segundos mientras se consultan las páginas de materias detectadas desde `Inicio`.
6. Interpretar el resultado:

```text
✅ Sin cambios detallados desde la línea base.
```

significa que no se detectaron diferencias.

Si aparecen cambios, el monitor muestra únicamente **en qué área o zona** se detectó la diferencia, por ejemplo:

```text
⚠️ ÁREA · SCIENCE
🆕 ZONA · MATEZONAS
```

El monitor continúa comparando internamente textos y recursos, pero no los muestra en el aviso para mantener el resultado breve y operativo.

7. Revisar la novedad real en Gaudem.
8. Solo cuando el estado nuevo deba pasar a ser la referencia conocida, pulsar:

```text
✅ Aceptar cambios Gaudem
```

---

## 💾 4. Línea base local

La comparación histórica vigente se conserva con `localStorage` bajo la clave:

```text
gaudem6_detalle_v2
```

Desde 1.5-rc2 existe además una **segunda línea base independiente** para documentos y recursos enriquecidos:

```text
gaudem6_recursos_v3
```

La segunda clave no sustituye ni reinterpreta la primera. Si todavía no existe, el monitor continúa usando la comparación histórica 1.4 y muestra `Seguimiento de documentos: pendiente de inicializar`, sin declarar como cambios los recursos antiguos que nunca estuvieron presentes en `gaudem6_detalle_v2`.

Características:

- permanece al cerrar una pestaña;
- normalmente permanece al cerrar y volver a abrir Chrome;
- permanece al apagar y volver a encender el ordenador;
- no depende de mantener conexión continua a Internet;
- pertenece al navegador/perfil donde fue creada;
- no se sincroniza automáticamente con otro navegador, perfil u ordenador.

La línea base puede perderse si se eliminan los datos locales de `sites.google.com`, se limpia el almacenamiento del navegador o se cambia a otro entorno.

Si no existe línea base, el marcador de revisión **no inventa una comparación**: muestra un aviso y termina.

Para reconstruirla, abrir `Inicio` y usar `✅ Aceptar cambios Gaudem` únicamente después de confirmar que el estado visible del Site es el que se desea tomar como referencia inicial.

---

## 🔐 5. Privacidad y seguridad

El diseño actual sigue estas reglas:

- utiliza la sesión que ya está abierta en el navegador;
- no solicita ni almacena usuario o contraseña;
- no envía la línea base a Academia;
- no envía los resultados a un servicio externo;
- consulta las páginas mediante `fetch(..., { credentials: 'include' })` dentro del navegador autenticado;
- conserva la comparación únicamente en almacenamiento local del navegador.

No se deben incorporar al código credenciales, tokens de sesión ni datos personales del alumno.

---

## 🧠 6. Qué compara

Desde `Inicio`, el monitor identifica actualmente las familias de espacios académicos relevantes:

```text
/gaudem.es/sexto/areas/
/gaudem.es/sexto/zonas/
/gaudem.es/sexto/english-zones
```

La ampliación a `/zonas/` se incorporó el 22/09/2026 después de comprobar que Gaudem publica material específico en **Linguizonas** y **Matezonas** fuera de la rama `/áreas/`. La revisión posterior del inventario de enlaces del curso confirmó además **English Zones** en la ruta independiente `/english-zones`, por lo que v1.3 la incorpora explícitamente. Las versiones anteriores no podían detectarla.

Para cada área o zona se mantienen dos señales separadas:

**Señal histórica · compatible con 1.4**

- fragmentos de texto relevantes (`h1`…`h6`, `p`, `li`, `a`, headings);
- enlaces y recursos detectables (`a`, `iframe`, `embed`, `object`);
- normalización exactamente compatible con la línea base `gaudem6_detalle_v2`.

**Señal documental enriquecida · 1.5**

- recursos de `drive.google.com` y `docs.google.com`;
- archivos reconocibles por extensión `.pdf`, `.doc/.docx`, `.ppt/.pptx`, `.xls/.xlsx`;
- referencias detectables tanto en elementos DOM como serializadas dentro del HTML de Google Sites;
- normalización que elimina parámetros técnicos conocidos pero conserva identificadores de documento como `id`.

Esta segunda señal solo se compara cuando existe `gaudem6_recursos_v3`. Por tanto, la primera ejecución del nuevo monitor **no puede convertir todos los recursos históricos en falsos cambios**.

La línea base **no se actualiza automáticamente al revisar**. Ambas líneas base cambian únicamente mediante `✅ Aceptar cambios Gaudem`.

---

## ✅ 7. Validación realizada · 17/09/2026

La solución fue comprobada de forma incremental en el navegador autenticado.

### 7.1 Descubrimiento desde Inicio

En la validación original del 17/09/2026 se detectaron y pudieron consultar correctamente:

```text
15 páginas de materias/áreas
```

El número `15` era un dato observado, **no un contrato fijo**. El 22/09/2026 se identificó que la rama escolar `/zonas/` quedaba fuera del descubrimiento, por lo que el monitor se amplió para revisar conjuntamente áreas y zonas.

La interfaz utiliza desde v1.2 la expresión **Espacios revisados** en lugar de **Materias revisadas**, porque el conjunto ya no contiene únicamente páginas de asignaturas.

### 7.2 Estabilidad de la línea base

Dos revisiones consecutivas sobre el mismo estado produjeron:

```text
✅ Sin cambios detallados desde la línea base.
```

### 7.3 Falso positivo detectado y corregido

Una primera variante interpretó como cambio un parámetro dinámico de un recurso `youtubeeducation.com/embed/...` de ARTS.

La versión `v2` corrigió este comportamiento normalizando las URLs de recursos antes de compararlas.

### 7.4 Prueba controlada de detección

Se alteró temporalmente **solo la copia local de la línea base**, retirando un texto registrado de SCIENCE.

La siguiente revisión detectó correctamente:

```text
⚠️ ÁREA · SCIENCE
```

La diferencia interna seguía siendo un texto retirado de la copia local, pero desde v1.4 el aviso solo identifica el espacio afectado.

Después se restauró la línea base original y el monitor volvió a indicar ausencia de cambios.

### 7.5 Incidencia real · documentos nuevos no detectados en Matezonas

El 24/09/2026 el Product Owner confirmó visualmente que Matezonas contenía **tres documentos nuevos** mientras el monitor 1.4 seguía indicando ausencia de cambios.

El primer candidato 1.5-rc1 amplió directamente la forma de extraer recursos sobre la línea base histórica existente. La prueba real mostró que ese enfoque era incorrecto: marcaba cambios en múltiples áreas porque comparaba una captura enriquecida contra una línea base que nunca había almacenado esos recursos.

Ese candidato fue descartado y la PR #145 se cerró sin fusionar.

La solución 1.5-rc2 utiliza dos líneas base independientes. Esto implica una limitación inevitable y explícita: los tres documentos que ya estaban publicados antes de crear `gaudem6_recursos_v3` **no pueden reconstruirse retroactivamente como “nuevos”**, porque no existe una fotografía enriquecida anterior. Se consideran una novedad conocida manualmente. Una vez revisados y aceptado el estado actual, futuras incorporaciones documentales sí podrán compararse contra la nueva línea base.

### 7.6 Validación real de estabilidad · 24/09/2026

La versión 1.5 fue validada en el navegador autenticado del Product Owner con el siguiente recorrido:

1. ejecución inicial del monitor con la línea base documental todavía no creada;
2. confirmación de que la salida mostraba `Seguimiento de documentos: pendiente de inicializar` sin falsos cambios;
3. creación explícita de ambas líneas base mediante `✅ Aceptar cambios Gaudem`;
4. verificación diagnóstica de que coexistían `gaudem6_detalle_v2` y `gaudem6_recursos_v3`;
5. nueva ejecución inmediata de `🔎 Revisar Gaudem 6.º · 1.5-rc2b`.

Resultado observado:

```text
Espacios revisados: 18
Seguimiento de documentos: activo
✅ Sin cambios desde las líneas base disponibles.
```

La validación confirma que la segunda línea base no contamina la comparación histórica ni produce falsos positivos masivos.

### 7.7 Control de errores de lectura

La versión final comprobada:

- exige ejecutarse dentro del Site de 6.º;
- avisa si falta la línea base;
- avisa si no puede localizar áreas o zonas académicas;
- avisa si no logra leer correctamente las páginas;
- no modifica la línea base ante esos errores.

Durante la validación se descartó una comprobación que buscaba cadenas de login dentro del HTML porque Google Sites podía incluir referencias técnicas de autenticación incluso con una sesión válida. La versión vigente valida el resultado real de las peticiones y que permanezcan dentro del Site esperado.

---

## 🛠️ 8. Reconstrucción de los marcadores

### 8.1 `🔎 Revisar Gaudem 6.º`

Crear un marcador del navegador con ese nombre y sustituir su URL por el siguiente código en **una sola línea**:

```javascript
javascript:(async()=>{const K='gaudem6_detalle_v2',KR='gaudem6_recursos_v3',n=s=>(s||'').replace(/\s+/g,' ').trim(),path=s=>decodeURIComponent(s).normalize('NFD').replace(/[\u0300-\u036f]/g,''),tracked=p=>p.includes('/gaudem.es/sexto/areas/')||p.includes('/gaudem.es/sexto/zonas/')||p.includes('/gaudem.es/sexto/english-zones'),kind=p=>(p.includes('/gaudem.es/sexto/zonas/')||p.includes('/gaudem.es/sexto/english-zones'))?'ZONA':'ÁREA',canon=(v,b,tag)=>{try{const u=new URL(v,b);u.hash='';if(/^(IFRAME|EMBED|OBJECT)$/.test(tag)){u.search=''}else{['authuser','usp','pli','embed_config','embedded','rm'].forEach(k=>u.searchParams.delete(k));const p=[...u.searchParams.entries()].sort((a,b)=>a[0].localeCompare(b[0]));u.search='';p.forEach(([k,v])=>u.searchParams.append(k,v))}return u.href}catch(e){return''}},canonDoc=(v,b)=>{try{const u=new URL(v,b);u.hash='';['authuser','usp','pli','embed_config','embedded','rm','resourcekey','ouid','rtpof','sd','widget','headers','chrome'].forEach(k=>u.searchParams.delete(k));const p=[...u.searchParams.entries()].sort((a,b)=>a[0].localeCompare(b[0]));u.search='';p.forEach(([k,v])=>u.searchParams.append(k,v));return u.href}catch(e){return''}},esDoc=v=>{try{const u=new URL(v);return/(^|\.)(drive|docs)\.google\.com$/i.test(u.hostname)||/\.(pdf|docx?|pptx?|xlsx?)$/i.test(u.pathname)}catch(e){return false}},docs=(h,d,b)=>{const a=[...d.querySelectorAll('a[href],iframe[src],embed[src],object[data]')].map(x=>x.getAttribute('href')||x.getAttribute('src')||x.getAttribute('data')),s=String(h||'').replace(/\\+u002f/gi,'/').replace(/\\+u003a/gi,':').replace(/\\+u003d/gi,'=').replace(/\\+u0026/gi,'&').replace(/\\+\//g,'/').replace(/&amp;/gi,'&'),r=(s.match(/https?:\/\/[^\s"'<>]+/g)||[]).map(v=>v.replace(/[),;\]}]+$/g,''));return[...new Set(a.concat(r).map(v=>canonDoc(v,b)).filter(v=>v&&esDoc(v)))].sort()};if(!location.href.startsWith('https://sites.google.com/gaudem.es/sexto/')){alert('🔎 Revisar Gaudem 6.º\n\n⚠️ No estás dentro del Site de 6.º de Gaudem.\n\nAbre:\nhttps://sites.google.com/gaudem.es/sexto/inicio\n\ny vuelve a ejecutar el marcador.');return}const old=JSON.parse(localStorage.getItem(K)||'null'),oldRRaw=localStorage.getItem(KR),oldR=oldRRaw?JSON.parse(oldRRaw):null;if(!old){alert('🔎 Revisar Gaudem 6.º\n\n⚠️ No encuentro la línea base histórica en este navegador/perfil.\n\nNo se ha realizado ninguna comparación.');return}const ms=[...new Map([...document.querySelectorAll('a[href]')].map(a=>{try{const u=new URL(a.href),p=path(u.pathname);if(u.origin===location.origin&&tracked(p))return[u.href,{u:u.href,n:n(a.innerText)||decodeURIComponent(u.pathname.split('/').pop()),k:kind(p)}]}catch(e){}}).filter(Boolean)).values()];if(!ms.length){alert('🔎 Revisar Gaudem 6.º\n\n⚠️ No puedo localizar áreas o zonas académicas.\n\nComprueba que estás en Inicio y que la sesión de Gaudem está abierta.');return}const snap={f:new Date().toLocaleString(),m:{}},rsnap={f:new Date().toLocaleString(),m:{}};let readError=false;for(const m of ms){try{const r=await fetch(m.u,{credentials:'include',redirect:'follow'});if(!r.ok){readError=true;break}const fu=new URL(r.url||m.u);if(fu.hostname!=='sites.google.com'||!path(fu.pathname).includes('/gaudem.es/sexto/')){readError=true;break}const h=await r.text(),d=new DOMParser().parseFromString(h,'text/html'),rq=docs(h,d,m.u);d.querySelectorAll('script,style,noscript,template,svg').forEach(x=>x.remove());const t=[...new Set([...d.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,a,[role="heading"]')].map(x=>n(x.textContent)).filter(x=>x.length>=3&&x.length<=300))].sort(),q=[...new Set([...d.querySelectorAll('a[href],iframe[src],embed[src],object[data]')].map(x=>{const v=x.getAttribute('href')||x.getAttribute('src')||x.getAttribute('data');return canon(v,m.u,x.tagName)}).filter(x=>x&&!x.startsWith(location.origin+'/gaudem.es/sexto/')))].sort();snap.m[m.u]={n:m.n,k:m.k,t,q};rsnap.m[m.u]={n:m.n,k:m.k,q:rq}}catch(e){readError=true;break}}if(readError){alert('🔎 Revisar Gaudem 6.º\n\n⚠️ No he podido completar la lectura de Gaudem.\n\nNo se ha modificado ninguna línea base.');return}const out=new Map(),flag=(u,x,p='⚠️')=>out.set(u,p+' '+(x.k||'ESPACIO')+' · '+x.n);for(const[u,x]of Object.entries(snap.m)){const o=old.m[u];if(!o){flag(u,x,'🆕');continue}const ot=Array.isArray(o.t)?o.t:[],oq=Array.isArray(o.q)?o.q:[],at=x.t.filter(v=>!ot.includes(v)),dt=ot.filter(v=>!x.t.includes(v)),aq=x.q.filter(v=>!oq.includes(v)),dq=oq.filter(v=>!x.q.includes(v));if(at.length||dt.length||aq.length||dq.length)flag(u,x);const ro=oldR?.m?.[u];if(ro){const orq=Array.isArray(ro.q)?ro.q:[],nr=rsnap.m[u].q;if(nr.some(v=>!orq.includes(v))||orq.some(v=>!nr.includes(v)))flag(u,x)}}for(const[u,x]of Object.entries(old.m))if(!snap.m[u])out.set(u,'❌ '+(x.k||'ESPACIO')+' · '+x.n+' (retirado)');const estadoR=oldRRaw?'activo':'pendiente de inicializar';alert('🔎 Revisar Gaudem 6.º · 1.5-rc2b\n\nEspacios revisados: '+ms.length+'\nSeguimiento de documentos: '+estadoR+'\n\n'+(out.size?'Cambios detectados en:\n\n'+[...out.values()].join('\n'):'✅ Sin cambios desde las líneas base disponibles.')+'\n\nRevisión: '+snap.f);})();
```

Cuando todavía no exista `gaudem6_recursos_v3`, el monitor indicará:

```text
Seguimiento de documentos: pendiente de inicializar
```

En ese estado la comparación histórica sigue funcionando, pero la señal documental enriquecida todavía no participa.

### 8.2 `✅ Aceptar cambios Gaudem`

Usar este marcador **solo después de revisar las novedades conocidas**. Desde 1.5-rc2 actualiza de forma explícita ambas líneas base:

- `gaudem6_detalle_v2`;
- `gaudem6_recursos_v3`.

URL:

```javascript
javascript:(async()=>{if(!confirm('¿Aceptar el estado ACTUAL de Gaudem como nueva línea base?\n\nEsto actualizará también el seguimiento específico de documentos. Hazlo solo después de revisar las novedades conocidas.'))return;const K='gaudem6_detalle_v2',KR='gaudem6_recursos_v3',n=s=>(s||'').replace(/\s+/g,' ').trim(),path=s=>decodeURIComponent(s).normalize('NFD').replace(/[\u0300-\u036f]/g,''),tracked=p=>p.includes('/gaudem.es/sexto/areas/')||p.includes('/gaudem.es/sexto/zonas/')||p.includes('/gaudem.es/sexto/english-zones'),kind=p=>(p.includes('/gaudem.es/sexto/zonas/')||p.includes('/gaudem.es/sexto/english-zones'))?'ZONA':'ÁREA',canon=(v,b,tag)=>{try{const u=new URL(v,b);u.hash='';if(/^(IFRAME|EMBED|OBJECT)$/.test(tag)){u.search=''}else{['authuser','usp','pli','embed_config','embedded','rm'].forEach(k=>u.searchParams.delete(k));const p=[...u.searchParams.entries()].sort((a,b)=>a[0].localeCompare(b[0]));u.search='';p.forEach(([k,v])=>u.searchParams.append(k,v))}return u.href}catch(e){return''}},canonDoc=(v,b)=>{try{const u=new URL(v,b);u.hash='';['authuser','usp','pli','embed_config','embedded','rm','resourcekey','ouid','rtpof','sd','widget','headers','chrome'].forEach(k=>u.searchParams.delete(k));const p=[...u.searchParams.entries()].sort((a,b)=>a[0].localeCompare(b[0]));u.search='';p.forEach(([k,v])=>u.searchParams.append(k,v));return u.href}catch(e){return''}},esDoc=v=>{try{const u=new URL(v);return/(^|\.)(drive|docs)\.google\.com$/i.test(u.hostname)||/\.(pdf|docx?|pptx?|xlsx?)$/i.test(u.pathname)}catch(e){return false}},docs=(h,d,b)=>{const a=[...d.querySelectorAll('a[href],iframe[src],embed[src],object[data]')].map(x=>x.getAttribute('href')||x.getAttribute('src')||x.getAttribute('data')),s=String(h||'').replace(/\\+u002f/gi,'/').replace(/\\+u003a/gi,':').replace(/\\+u003d/gi,'=').replace(/\\+u0026/gi,'&').replace(/\\+\//g,'/').replace(/&amp;/gi,'&'),r=(s.match(/https?:\/\/[^\s"'<>]+/g)||[]).map(v=>v.replace(/[),;\]}]+$/g,''));return[...new Set(a.concat(r).map(v=>canonDoc(v,b)).filter(v=>v&&esDoc(v)))].sort()};if(!location.href.startsWith('https://sites.google.com/gaudem.es/sexto/')){alert('✅ Aceptar cambios Gaudem\n\n⚠️ No estás dentro del Site de 6.º de Gaudem.');return}const ms=[...new Map([...document.querySelectorAll('a[href]')].map(a=>{try{const u=new URL(a.href),p=path(u.pathname);if(u.origin===location.origin&&tracked(p))return[u.href,{u:u.href,n:n(a.innerText)||decodeURIComponent(u.pathname.split('/').pop()),k:kind(p)}]}catch(e){}}).filter(Boolean)).values()];if(!ms.length){alert('No encontré áreas o zonas académicas.\n\nEjecuta este comando desde la página Inicio de 6.º.');return}const snap={f:new Date().toLocaleString(),m:{}},rsnap={f:new Date().toLocaleString(),m:{}};let readError=false;for(const m of ms){try{const r=await fetch(m.u,{credentials:'include',redirect:'follow'});if(!r.ok){readError=true;break}const fu=new URL(r.url||m.u);if(fu.hostname!=='sites.google.com'||!path(fu.pathname).includes('/gaudem.es/sexto/')){readError=true;break}const h=await r.text(),d=new DOMParser().parseFromString(h,'text/html'),rq=docs(h,d,m.u);d.querySelectorAll('script,style,noscript,template,svg').forEach(x=>x.remove());const t=[...new Set([...d.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,a,[role="heading"]')].map(x=>n(x.textContent)).filter(x=>x.length>=3&&x.length<=300))].sort(),q=[...new Set([...d.querySelectorAll('a[href],iframe[src],embed[src],object[data]')].map(x=>{const v=x.getAttribute('href')||x.getAttribute('src')||x.getAttribute('data');return canon(v,m.u,x.tagName)}).filter(x=>x&&!x.startsWith(location.origin+'/gaudem.es/sexto/')))].sort();snap.m[m.u]={n:m.n,k:m.k,t,q};rsnap.m[m.u]={n:m.n,k:m.k,q:rq}}catch(e){readError=true;break}}if(readError){alert('✅ Aceptar cambios Gaudem\n\n⚠️ No he podido completar la lectura de Gaudem.\n\nNo se ha modificado ninguna línea base.');return}localStorage.setItem(K,JSON.stringify(snap));localStorage.setItem(KR,JSON.stringify(rsnap));const T=Object.values(snap.m).reduce((a,x)=>a+x.t.length,0),Q=Object.values(snap.m).reduce((a,x)=>a+x.q.length,0),R=Object.values(rsnap.m).reduce((a,x)=>a+x.q.length,0);alert('✅ Nueva línea base aceptada.\n\nEspacios: '+ms.length+'\nFragmentos de texto: '+T+'\nRecursos históricos: '+Q+'\nDocumentos monitorizados: '+R+'\n\nFecha: '+snap.f);})();
```

---

## 🧯 9. Incidencias habituales

### El monitor dice que no encuentra la línea base

Causas probables:

- otro perfil de Chrome;
- otro navegador;
- otro ordenador;
- limpieza de datos locales del Site.

Acción:

1. confirmar que el estado actual de Gaudem es una referencia válida;
2. desde `Inicio`, ejecutar `✅ Aceptar cambios Gaudem` para reconstruir la línea base;
3. ejecutar después `🔎 Revisar Gaudem 6.º` para comprobar estabilidad.

### El monitor no puede localizar áreas o zonas

Comprobar:

- que se está en `https://sites.google.com/gaudem.es/sexto/inicio`;
- que la sesión autorizada de Gaudem continúa abierta;
- que el Site no haya cambiado sustancialmente su estructura.

### El monitor no puede completar la lectura

Puede existir:

- problema temporal de conexión;
- sesión caducada;
- cambio técnico del Site.

La versión vigente no modifica la línea base ante este error.

### Aparece un cambio que parece irrelevante

No aceptarlo inmediatamente.

Primero revisar la materia real. Si se confirma que es solo ruido técnico, ajustar la normalización del monitor y volver a validar antes de mover la línea base.

---

## 🚧 10. Evolución aprobada pendiente · un solo marcador

### DECISIÓN

La dirección funcional deseada es evolucionar el mecanismo para que el uso normal requiera **un único marcador**, manteniendo el mismo principio de control explícito sobre la línea base.

### PENDIENTE

No está implementado todavía.

La evolución prevista deberá permitir que `🔎 Revisar Gaudem 6.º` resuelva también la gestión de la línea base:

```text
Ejecutar marcador
   ↓
¿Existe línea base?
   ├─ NO → ofrecer Crear línea base
   └─ SÍ → revisar materias
              ↓
        ¿Hay cambios?
          ├─ NO → informar Sin cambios
          └─ SÍ → mostrar cambios
                    ↓
             ofrecer dos acciones
             [Mantener pendientes]
             [Aceptar como nueva línea base]
```

Reglas para esa evolución:

- no aceptar cambios automáticamente;
- no perder una novedad por ejecutar dos veces el monitor;
- conservar controles de sesión/conexión;
- preservar compatibilidad con la línea base `gaudem6_detalle_v2` cuando sea razonable;
- mantener la ejecución local y sin credenciales embebidas;
- validar de nuevo estabilidad, detección controlada y restauración antes de sustituir los dos marcadores actuales.

Hasta que esa evolución se implemente y valide, los **dos marcadores actuales siguen siendo la solución operativa oficial**.

---

## 🧩 11. Relación con Academia

El Site privado de 6.º de Gaudem es la **fuente escolar de referencia** para los materiales que alimentan el desarrollo curricular de `Cursos → 6.º de Primaria` en Academia. Los documentos publicados allí reflejan el material que el colegio pide considerar para la preparación del alumno y, en su gran mayoría, son explicados o trabajados durante las clases.

Esto convierte el monitor en el primer eslabón de un flujo de incorporación curricular, pero una novedad detectada **no implica automáticamente** que deba publicarse en Academia.

El flujo correcto es:

```text
Novedad detectada en Gaudem
→ revisar el material escolar real
→ determinar si es relevante para Academia
→ obtener/proporcionar la fuente cuando corresponda
→ aplicar STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR
→ incorporar Curso → Asignatura → Tema o recurso según corresponda
```

El monitor ayuda a **descubrir cambios**; el estándar curricular gobierna qué se hace después con el material.

---

## ✅ 12. Cierre

La solución actual queda documentada como una utilidad operativa local, validada el 17/09/2026 y recuperable desde GitHub.

La fuente de verdad de su procedimiento es este manual. Los marcadores del navegador son su instancia local de ejecución.