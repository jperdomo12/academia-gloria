# 🔎 Manual · Monitor de novedades Gaudem 6.º
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/manuales/MANUAL-MONITOR_NOVEDADES_GAUDEM_6TO.md` |
| **Versión** | 1.7-rc1 |
| **Estado** | 1.7-rc1 · validada operativamente en navegador familiar · incidencia cerrada |
| **Fecha de origen** | 17/09/2026 |
| **Última actualización** | 17/10/2026 |
| **Propietario** | Operación escolar · 6.º de Primaria |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Procedimiento local para detectar cambios en las páginas de áreas y zonas académicas del Site privado de 6.º de Gaudem desde un navegador ya autenticado |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/README.md` | **Orienta:** portal general de la documentación oficial. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna:** incorporación posterior de material escolar real a Academia cuando una novedad detectada deba convertirse en Tema o recurso académico. |
| `docs/project/PROJECT_MAP.md` | **Orienta:** ubicación y responsabilidad de los dominios del proyecto. |
| `herramientas/monitor-gaudem/monitor.mjs` | **Implementa:** fuente única compartida de ambos marcadores; genera las dos URLs autónomas de este manual con `node herramientas/monitor-gaudem/monitor.mjs --manual`. No se descarga desde Gaudem. |
| `tests/monitor-gaudem-browser.cjs` | **Verifica:** compatibilidad con v1.6, separación del menú, novedades y disciplina de escritura sobre fixtures locales. |
| `AGENTS.md` | **Gobierna:** reglas operativas, clasificación de estado y disciplina documental. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.7-rc1 · cierre | 17/10/2026 | Product Owner + AI Collaborator | Cierra #181 integrada en 9c1597af…: aceptación real a las 00:39:04 y revisión posterior a las 00:39:47 sin cambios, 19 espacios y documentos activos. Conserva identificador de los marcadores instalados, mismas dos claves y pendientes ajenos al monitor. |
| 1.7-rc1 · validación | 17/10/2026 | Product Owner + AI Collaborator | Revisión autenticada repetida: 19 espacios, solo Música y nuevo Instrumentos Legendarios; 17 páginas sin diferencias, Música texto +1 -0/recursos +0 -1 y docs +0 -0 en las 18 comparaciones. PR #181 aprobada. Aceptación real y revisión posterior pendientes; no declara estabilidad completa. |
| 1.7-rc1 | 16/10/2026 | Product Owner + AI Collaborator | Candidata autorizada tras ruido del menú global: distingue navegación/contenido, conserva descubrimiento y doble línea base, adapta la comparación v1.6 solo en memoria y prepara procedencia de contenido para aceptación explícita. Fuente compartida y marcadores autónomos generados; prueba con líneas base reales pendiente. |
| 1.6 | 02/10/2026 | Product Owner + AI Collaborator | Añade al aviso de ausencia de cambios la fecha y hora local registradas en cada línea base disponible; si la línea base documental aún no existe, lo indica expresamente. |
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

### HECHO · 1.7-rc1 validada operativamente; incidencia cerrada

La solución operativa actual utiliza dos marcadores:

```text
🔎 Revisar Gaudem 6.º
✅ Aceptar cambios Gaudem
```

El primero compara el estado actual con una línea base local.

El segundo sustituye la línea base únicamente cuando el usuario confirma que los cambios detectados ya fueron revisados y deben considerarse el nuevo estado conocido.

### Versión operativa 1.7-rc1 · cierre de la incidencia del 16/10/2026

La decisión aprobada mantiene los dos marcadores y las dos líneas base; corrige el ruido provocado por la navegación global. PR #181 integrada en `main` `9c1597af17415b7ccbd09e9dc7bd7ed1eea99810`. El ciclo real Revisar → Aceptar → Revisar quedó comprobado el 17/10/2026. El merge del repositorio no actualiza los marcadores que ya existen en Chrome.

El uso normal conserva únicamente **Revisar** (§8.1) y **Aceptar cambios** (§8.2), ambos generados desde la misma fuente. Los marcadores temporales de diagnóstico pueden eliminarse sin afectar a las líneas base. Se mantiene el identificador visible **1.7-rc1** de los marcadores realmente validados; este cierre documental no cambia su código ni requiere reinstalarlos.

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
✅ Sin cambios desde las líneas base disponibles.
Líneas base:
Histórica: <fecha y hora local>
Documentos: <fecha y hora local o pendiente de inicializar>
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

La segunda clave no sustituye ni reinterpreta la primera. Si todavía no existe, el monitor continúa usando la señal histórica compatible (con separación de navegación en 1.7-rc1) y muestra `Seguimiento de documentos: pendiente de inicializar`, sin declarar como cambios los recursos antiguos que nunca estuvieron presentes en `gaudem6_detalle_v2`.

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

Para cada espacio se conservan dos señales y dos claves:

**Señal histórica · `gaudem6_detalle_v2`**

- conserva normalizadores, fragmentos y recursos históricos `t`/`q` para compatibilidad;
- v1.7 separa los elementos `nav` / `[role="navigation"]` del contenido propio, sin eliminar la cabecera académica de la página;
- el descubrimiento se hace **antes** sobre todos los enlaces de Inicio: excluir el menú de la comparación no impide descubrir páginas nuevas ni detectar retiradas;
- al leer una base v1.6 sin procedencia, la comparación se adapta **solo en memoria**: se reconocen fragmentos de navegación actuales y una proyección del menú anterior a partir de enlaces/nombres de espacios añadidos, renombrados o retirados; no se ignoran diferencias por aparecer en muchas páginas;
- el contenido DOM de la página nunca se limpia por palabras como «Instrumentos Legendarios»: se excluyen contenedores de navegación identificados, preservando cambios propios;
- cuando se acepte explícitamente una captura v1.7 validada, cada entrada conserva `t`/`q` y añade `c:{t,q}` de contenido propio **dentro de la misma clave**. Las revisiones futuras comparan esa procedencia exacta y dejan de necesitar la adaptación heredada. No se crea una tercera línea base.

La base histórica anterior solo guardó conjuntos de textos/URLs, no el DOM ni la procedencia de cada fragmento. No permite reconstruir de forma universal toda navegación pasada. La adaptación se limita a la navegación identificada y los espacios conocidos; por eso es obligatoria la prueba sobre la base real pendiente. Si una etiqueta idéntica estaba tanto en menú como en contenido, la antigua captura no permite distinguir sus dos apariciones; la procedencia `c` evita esa ambigüedad después de una aceptación explícita, sin reinterpretar ni escribir ahora los datos antiguos.

**Señal documental enriquecida · `gaudem6_recursos_v3`**

- mantiene la extracción v1.5 de Drive, Docs y PDF/ofimática, en elementos DOM y HTML serializado;
- mantiene normalización de parámetros e identificadores documentales;
- solo se compara si ya existe esa línea base; si falta, informa pendiente de inicializar sin inventar novedades documentales;
- la v1.7 no modifica su algoritmo para resolver ruido de textos del menú.

**Controles conservados**

La revisión no escribe ni borra `localStorage`. Solo Aceptar, tras confirmación explícita y lectura completa, actualiza las dos claves. Cancelar o fallar la lectura no acepta nada. Si no se identifica navegación semántica, Revisar muestra advertencia y Aceptar rechaza la captura ambigua. No se solicita aceptar para «hacer desaparecer» una incidencia.

La salida principal sigue indicando únicamente espacios afectados y fechas. La candidata añade en la consola local una tabla de diagnóstico con cuentas de texto, recursos históricos y documentos por espacio; no envía datos a ningún servicio.

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

### 7.8 Incidencia del 16/10/2026 y cierre real del 17/10/2026

**Observación familiar, sin aceptar líneas base:** 19 espacios revisados; 18 con `texto +4 -3`, `docs +0 -0`, debidos al menú global tras añadir Música → Instrumentos Legendarios. La página nueva está vacía de material académico visible. En Música también se observó una retirada del enlace antiguo de STOMP. La señal documental no produjo cambios falsos.

**Prueba técnica controlada completada:** Chromium y DOMParser reales sobre HTML sintético, en un origen de prueba interceptado de Sites, sin acceso al Site ni almacenamiento reales. La base heredada se crea ejecutando literalmente los marcadores v1.6 conservados como fixture de regresión desde `main` `7e3dcaa1…`. Reproduce 18 falsos avisos y las cuentas exactas `+4 -3`; v1.7-rc1 obtiene:

| Caso controlado | Resultado |
|---|---|
| Solo menú ampliado: 18 → 19 espacios | Únicamente página nueva Instrumentos Legendarios; 18 comparaciones `texto +0 -0`, `docs +0 -0`. |
| Además, retirada de STOMP | Nuevo espacio + cambio de recursos solo en Música; resto sin contaminación; documentos `+0 -0`. |
| Segunda revisión idéntica | Mismo resultado; la novedad continúa pendiente; ambas claves idénticas byte a byte. |
| Texto propio o documento nuevo serializado | Detecta la página afectada y conserva la señal documental. |
| Espacio retirado | Detecta la retirada sin convertir el menú en cambios de otras páginas. |
| Revisar, cancelar Aceptar, error de lectura/redirección o falta de navegación | Cero escrituras; la captura ambigua no se acepta. |
| Aceptar confirmado (solo fixture) | Actualiza únicamente las dos claves; siguiente revisión estable. |
| Base ya aceptada por v1.7 | Cambio solo de menú no modifica contenido; quitar un título propio coincidente con el menú sí se detecta. |
| Falta línea base documental o histórica | Conserva avisos y no inicializa datos al revisar. |

**Validación real completada · 17/10/2026 (Europe/Madrid):** el Product Owner ejecutó Revisar 1.7-rc1 repetidamente en su navegador autenticado sobre las líneas base pendientes, sin ejecutar Aceptar. Las capturas muestran 19 espacios, seguimiento documental activo y únicamente Música e Instrumentos Legendarios (nuevo), sin advertencia de navegación. El aviso repetido conserva las mismas novedades (captura de revisión 00:15:07).

La tabla compartida contiene 18 comparaciones heredadas: 17 páginas con texto/recursos/docs `+0 -0`; Música con texto `+1 -0`, recursos `+0 -1` y docs `+0 -0`. La retirada de recursos es compatible con el enlace antiguo de STOMP diagnosticado; no se aportó en esta prueba el detalle de URL para volver a identificarlo. Instrumentos Legendarios se detecta aparte como nuevo, aunque vacío. No se infiere que ese espacio tenga ya material académico.

La ausencia de escrituras y la conservación byte a byte de las dos claves se verificaron en pruebas automatizadas; las capturas reales no son una inspección directa de localStorage. En esa primera fase aún no se había ejecutado Aceptar 1.7-rc1; el ciclo posterior se registra a continuación. PR #181 aprobada explícitamente por el Product Owner e integrada en `9c1597af17415b7ccbd09e9dc7bd7ed1eea99810`.

**Incidencia de instalación observada durante el cierre:** una lectura local de diagnóstico mostró dos bases fechadas a las 00:31:45, 19 espacios e Instrumentos Legendarios ya guardado, pero cero páginas con `c`. Ese estado era compatible con una aceptación en formato anterior; no demuestra por sí solo qué marcador se ejecutó ni permite atribuir toda la incidencia a una causa única. Se sustituyó la URL completa de Aceptar por la versión 1.7-rc1, sin pedir ediciones manuales de parámetros.

**Ciclo real completado · 17/10/2026, Europe/Madrid:**

| Evidencia aportada por el Product Owner | Resultado |
|---|---|
| Aviso `Nueva línea base aceptada · 1.7-rc1`, 00:39:04 | 19 espacios, 660 fragmentos de texto, 6 recursos históricos y 135 documentos monitorizados. |
| Revisar 1.7-rc1, 00:39:47 | 19 espacios; seguimiento documental activo; `Sin cambios desde las líneas base disponibles`. |
| Fechas mostradas tras la revisión | Histórica y documental: `17/10/2026, 0:39:04`. |

**Estado final:** incidencia cerrada y ciclo operativo validado en el navegador familiar. No quedan pruebas inmediatas ni reinstalaciones pendientes de este frente. Se mantiene el identificador 1.7-rc1 del código probado, sin promover una versión de código distinta ni prometer inmunidad a futuros cambios de Google Sites. Sigue pendiente, como observación futura de uso normal, una incorporación documental real posterior a la base v3; su detección controlada ya tiene cobertura técnica. No se abre la evolución a un único marcador.

#### Protocolo de regresión · completado en esta incidencia

1. Mantener el mismo perfil de Chrome y las líneas base pendientes. Abrir Inicio de 6.º con la sesión autorizada.
2. Copiar únicamente la URL de §8.1 a un marcador de prueba `🔎 Revisar Gaudem 6.º · 1.7-rc1`. Mantener el marcador anterior disponible para comparar.
3. Ejecutar y comprobar que el aviso muestra **1.7-rc1**, 19 espacios si el Site no cambió y seguimiento documental activo.
4. Verificar Instrumentos Legendarios como nuevo espacio. Las 18 páginas no deben marcarse por el menú. Música puede conservar un aviso propio por la retirada de STOMP: no ocultar una diferencia real.
5. Revisar la tabla local de la consola: documentos `+0 -0` cuando no hay incorporaciones; el resto de páginas sin diferencias propias. Si aparece advertencia de navegación o siguen los avisos masivos, detener la prueba y compartir el resultado; **no aceptar**.
6. Ejecutar una segunda vez: debe conservar exactamente las mismas novedades pendientes y las mismas fechas de líneas base. No se ha movido la referencia.
7. Compartir el resultado para registrar validación. Actualizar/usar el Aceptar de §8.2 solo después de validar la corrección y revisar las novedades; no forma parte de esta primera prueba.

---

## 🛠️ 8. Reconstrucción de los marcadores

### 8.1 `🔎 Revisar Gaudem 6.º`

**Marcador operativo 1.7-rc1 validado.** Para reconstruirlo, copiar la URL siguiente en **una sola línea**. Está codificada para preservar saltos de línea y caracteres del código; el navegador la ejecuta localmente, sin cargar scripts externos:

```javascript
javascript:void%20(async%20function%20ejecutarMonitor(aceptar%20%3D%20false)%20%7B%0A%20%20const%20version%20%3D%20'1.7-rc1'%3B%0A%20%20const%20titulo%20%3D%20aceptar%20%3F%20'%E2%9C%85%20Aceptar%20cambios%20Gaudem'%20%3A%20%60%F0%9F%94%8E%20Revisar%20Gaudem%206.%C2%BA%20%C2%B7%20%24%7Bversion%7D%60%3B%0A%20%20const%20K%20%3D%20'gaudem6_detalle_v2'%2C%20KR%20%3D%20'gaudem6_recursos_v3'%3B%0A%20%20const%20normalizar%20%3D%20s%20%3D%3E%20(s%20%7C%7C%20'').replace(%2F%5Cs%2B%2Fg%2C%20'%20').trim()%3B%0A%20%20const%20path%20%3D%20s%20%3D%3E%20decodeURIComponent(s).normalize('NFD').replace(%2F%5B%5Cu0300-%5Cu036f%5D%2Fg%2C%20'')%3B%0A%20%20const%20tracked%20%3D%20p%20%3D%3E%20p.includes('%2Fgaudem.es%2Fsexto%2Fareas%2F')%20%7C%7C%20p.includes('%2Fgaudem.es%2Fsexto%2Fzonas%2F')%20%7C%7C%20p.includes('%2Fgaudem.es%2Fsexto%2Fenglish-zones')%3B%0A%20%20const%20kind%20%3D%20p%20%3D%3E%20p.includes('%2Fgaudem.es%2Fsexto%2Fzonas%2F')%20%7C%7C%20p.includes('%2Fgaudem.es%2Fsexto%2Fenglish-zones')%20%3F%20'ZONA'%20%3A%20'%C3%81REA'%3B%0A%20%20const%20textosSelector%20%3D%20'h1%2Ch2%2Ch3%2Ch4%2Ch5%2Ch6%2Cp%2Cli%2Ca%2C%5Brole%3D%22heading%22%5D'%3B%0A%20%20const%20recursosSelector%20%3D%20'a%5Bhref%5D%2Ciframe%5Bsrc%5D%2Cembed%5Bsrc%5D%2Cobject%5Bdata%5D'%3B%0A%20%20const%20navSelector%20%3D%20'nav%2C%5Brole%3D%22navigation%22%5D'%3B%0A%20%20const%20unicos%20%3D%20a%20%3D%3E%20%5B...new%20Set(a)%5D.sort()%3B%0A%20%20const%20urlElemento%20%3D%20x%20%3D%3E%20x.getAttribute('href')%20%7C%7C%20x.getAttribute('src')%20%7C%7C%20x.getAttribute('data')%3B%0A%20%20const%20canon%20%3D%20(v%2C%20b%2C%20tag)%20%3D%3E%20%7B%0A%20%20%20%20try%20%7B%0A%20%20%20%20%20%20const%20u%20%3D%20new%20URL(v%2C%20b)%3B%20u.hash%20%3D%20''%3B%0A%20%20%20%20%20%20if%20(%2F%5E(IFRAME%7CEMBED%7COBJECT)%24%2F.test(tag))%20u.search%20%3D%20''%3B%0A%20%20%20%20%20%20else%20%7B%0A%20%20%20%20%20%20%20%20%5B'authuser'%2C%20'usp'%2C%20'pli'%2C%20'embed_config'%2C%20'embedded'%2C%20'rm'%5D.forEach(k%20%3D%3E%20u.searchParams.delete(k))%3B%0A%20%20%20%20%20%20%20%20const%20p%20%3D%20%5B...u.searchParams.entries()%5D.sort((a%2C%20b)%20%3D%3E%20a%5B0%5D.localeCompare(b%5B0%5D))%3B%0A%20%20%20%20%20%20%20%20u.search%20%3D%20''%3B%20p.forEach((%5Bk%2C%20v%5D)%20%3D%3E%20u.searchParams.append(k%2C%20v))%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20return%20u.href%3B%0A%20%20%20%20%7D%20catch%20%7B%20return%20''%3B%20%7D%0A%20%20%7D%3B%0A%20%20const%20canonDoc%20%3D%20(v%2C%20b)%20%3D%3E%20%7B%0A%20%20%20%20try%20%7B%0A%20%20%20%20%20%20const%20u%20%3D%20new%20URL(v%2C%20b)%3B%20u.hash%20%3D%20''%3B%0A%20%20%20%20%20%20%5B'authuser'%2C%20'usp'%2C%20'pli'%2C%20'embed_config'%2C%20'embedded'%2C%20'rm'%2C%20'resourcekey'%2C%20'ouid'%2C%20'rtpof'%2C%20'sd'%2C%20'widget'%2C%20'headers'%2C%20'chrome'%5D.forEach(k%20%3D%3E%20u.searchParams.delete(k))%3B%0A%20%20%20%20%20%20const%20p%20%3D%20%5B...u.searchParams.entries()%5D.sort((a%2C%20b)%20%3D%3E%20a%5B0%5D.localeCompare(b%5B0%5D))%3B%0A%20%20%20%20%20%20u.search%20%3D%20''%3B%20p.forEach((%5Bk%2C%20v%5D)%20%3D%3E%20u.searchParams.append(k%2C%20v))%3B%0A%20%20%20%20%20%20return%20u.href%3B%0A%20%20%20%20%7D%20catch%20%7B%20return%20''%3B%20%7D%0A%20%20%7D%3B%0A%20%20const%20esDoc%20%3D%20v%20%3D%3E%20%7B%0A%20%20%20%20try%20%7B%0A%20%20%20%20%20%20const%20u%20%3D%20new%20URL(v)%3B%0A%20%20%20%20%20%20return%20%2F(%5E%7C%5C.)(drive%7Cdocs)%5C.google%5C.com%24%2Fi.test(u.hostname)%20%7C%7C%20%2F%5C.(pdf%7Cdocx%3F%7Cpptx%3F%7Cxlsx%3F)%24%2Fi.test(u.pathname)%3B%0A%20%20%20%20%7D%20catch%20%7B%20return%20false%3B%20%7D%0A%20%20%7D%3B%0A%20%20%2F%2F%20Se%C3%B1al%20documental%20v1.5%20conservada%2C%20incluido%20el%20HTML%20serializado%20y%20sus%20par%C3%A1metros.%0A%20%20const%20documentos%20%3D%20(h%2C%20d%2C%20b)%20%3D%3E%20%7B%0A%20%20%20%20const%20a%20%3D%20%5B...d.querySelectorAll(recursosSelector)%5D.map(urlElemento)%3B%0A%20%20%20%20const%20s%20%3D%20String(h%20%7C%7C%20'').replace(%2F%5C%5C%2Bu002f%2Fgi%2C%20'%2F').replace(%2F%5C%5C%2Bu003a%2Fgi%2C%20'%3A').replace(%2F%5C%5C%2Bu003d%2Fgi%2C%20'%3D').replace(%2F%5C%5C%2Bu0026%2Fgi%2C%20'%26').replace(%2F%5C%5C%2B%5C%2F%2Fg%2C%20'%2F').replace(%2F%26amp%3B%2Fgi%2C%20'%26')%3B%0A%20%20%20%20const%20r%20%3D%20(s.match(%2Fhttps%3F%3A%5C%2F%5C%2F%5B%5E%5Cs%22'%3C%3E%5D%2B%2Fg)%20%7C%7C%20%5B%5D).map(v%20%3D%3E%20v.replace(%2F%5B)%2C%3B%5C%5D%7D%5D%2B%24%2Fg%2C%20''))%3B%0A%20%20%20%20return%20unicos(a.concat(r).map(v%20%3D%3E%20canonDoc(v%2C%20b)).filter(v%20%3D%3E%20v%20%26%26%20esDoc(v)))%3B%0A%20%20%7D%3B%0A%20%20const%20extraer%20%3D%20(d%2C%20b)%20%3D%3E%20(%7B%0A%20%20%20%20t%3A%20unicos(%5B...d.querySelectorAll(textosSelector)%5D.map(x%20%3D%3E%20normalizar(x.textContent)).filter(x%20%3D%3E%20x.length%20%3E%3D%203%20%26%26%20x.length%20%3C%3D%20300))%2C%0A%20%20%20%20q%3A%20unicos(%5B...d.querySelectorAll(recursosSelector)%5D.map(x%20%3D%3E%20canon(urlElemento(x)%2C%20b%2C%20x.tagName)).filter(x%20%3D%3E%20x%20%26%26%20!x.startsWith(location.origin%20%2B%20'%2Fgaudem.es%2Fsexto%2F')))%0A%20%20%7D)%3B%0A%20%20const%20diferencia%20%3D%20(antes%2C%20ahora)%20%3D%3E%20%7B%0A%20%20%20%20const%20anterior%20%3D%20Array.isArray(antes)%20%3F%20antes%20%3A%20%5B%5D%3B%0A%20%20%20%20return%20%7B%20agregados%3A%20ahora.filter(v%20%3D%3E%20!anterior.includes(v))%2C%20retirados%3A%20anterior.filter(v%20%3D%3E%20!ahora.includes(v))%20%7D%3B%0A%20%20%7D%3B%0A%20%20try%20%7B%0A%20%20%20%20if%20(!location.href.startsWith('https%3A%2F%2Fsites.google.com%2Fgaudem.es%2Fsexto%2F'))%20%7B%0A%20%20%20%20%20%20alert(titulo%20%2B%20'%5Cn%5Cn%E2%9A%A0%EF%B8%8F%20No%20est%C3%A1s%20dentro%20del%20Site%20de%206.%C2%BA%20de%20Gaudem.%5Cn%5CnAbre%20https%3A%2F%2Fsites.google.com%2Fgaudem.es%2Fsexto%2Finicio')%3B%0A%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%20%20%20%20const%20oldRaw%20%3D%20localStorage.getItem(K)%2C%20oldRRaw%20%3D%20localStorage.getItem(KR)%3B%0A%20%20%20%20const%20old%20%3D%20oldRaw%20%3F%20JSON.parse(oldRaw)%20%3A%20null%2C%20oldR%20%3D%20oldRRaw%20%3F%20JSON.parse(oldRRaw)%20%3A%20null%3B%0A%20%20%20%20if%20(!aceptar%20%26%26%20!old%3F.m)%20%7B%0A%20%20%20%20%20%20alert(titulo%20%2B%20'%5Cn%5Cn%E2%9A%A0%EF%B8%8F%20No%20encuentro%20la%20l%C3%ADnea%20base%20hist%C3%B3rica%20en%20este%20navegador%2Fperfil.%5Cn%5CnNo%20se%20ha%20realizado%20ninguna%20comparaci%C3%B3n.')%3B%0A%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%20%20%20%20if%20(aceptar%20%26%26%20!confirm('%C2%BFAceptar%20el%20estado%20ACTUAL%20de%20Gaudem%20como%20nueva%20l%C3%ADnea%20base%3F%5Cn%5CnEsto%20actualizar%C3%A1%20ambas%20l%C3%ADneas%20base.%20Hazlo%20solo%20despu%C3%A9s%20de%20revisar%20las%20novedades%20y%20validar%20el%20monitor.'))%20return%3B%0A%20%20%20%20%2F%2F%20Descubrir%20antes%20de%20excluir%20navegaci%C3%B3n%3A%20las%20p%C3%A1ginas%20nuevas%20siguen%20apareciendo.%0A%20%20%20%20const%20ms%20%3D%20%5B...new%20Map(%5B...document.querySelectorAll('a%5Bhref%5D')%5D.map(a%20%3D%3E%20%7B%0A%20%20%20%20%20%20try%20%7B%0A%20%20%20%20%20%20%20%20const%20u%20%3D%20new%20URL(a.href)%2C%20p%20%3D%20path(u.pathname)%3B%0A%20%20%20%20%20%20%20%20if%20(u.origin%20%3D%3D%3D%20location.origin%20%26%26%20tracked(p))%20return%20%5Bu.href%2C%20%7B%20u%3A%20u.href%2C%20n%3A%20normalizar(a.innerText)%20%7C%7C%20decodeURIComponent(u.pathname.split('%2F').pop())%2C%20k%3A%20kind(p)%20%7D%5D%3B%0A%20%20%20%20%20%20%7D%20catch%20%7B%7D%0A%20%20%20%20%7D).filter(Boolean)).values()%5D%3B%0A%20%20%20%20if%20(!ms.length)%20%7B%0A%20%20%20%20%20%20alert(titulo%20%2B%20'%5Cn%5Cn%E2%9A%A0%EF%B8%8F%20No%20puedo%20localizar%20%C3%A1reas%20o%20zonas%20acad%C3%A9micas.%20Comprueba%20Inicio%20y%20la%20sesi%C3%B3n%20de%20Gaudem.')%3B%0A%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%20%20%20%20const%20nombresCambiados%20%3D%20%5B%5D%3B%0A%20%20%20%20for%20(const%20m%20of%20ms)%20if%20(!old%3F.m%3F.%5Bm.u%5D%20%7C%7C%20old.m%5Bm.u%5D.n%20!%3D%3D%20m.n)%20%7B%0A%20%20%20%20%20%20nombresCambiados.push(m.n%2C%20old%3F.m%3F.%5Bm.u%5D%3F.n%20%7C%7C%20'')%3B%0A%20%20%20%20%7D%0A%20%20%20%20for%20(const%20%5Bu%2C%20m%5D%20of%20Object.entries(old%3F.m%20%7C%7C%20%7B%7D))%20if%20(!ms.some(x%20%3D%3E%20x.u%20%3D%3D%3D%20u))%20nombresCambiados.push(m.n)%3B%0A%20%20%20%20const%20etiquetas%20%3D%20unicos(nombresCambiados.map(normalizar).filter(Boolean)).sort((a%2C%20b)%20%3D%3E%20b.length%20-%20a.length)%3B%0A%20%20%20%20const%20sinEtiquetasCambiadas%20%3D%20valor%20%3D%3E%20normalizar(etiquetas.reduce((texto%2C%20etiqueta)%20%3D%3E%20texto.split(etiqueta).join('')%2C%20valor))%3B%0A%20%20%20%20const%20snap%20%3D%20%7B%20f%3A%20new%20Date().toLocaleString()%2C%20m%3A%20%7B%7D%20%7D%2C%20rsnap%20%3D%20%7B%20f%3A%20new%20Date().toLocaleString()%2C%20m%3A%20%7B%7D%20%7D%3B%0A%20%20%20%20const%20navegacion%20%3D%20new%20Map()%2C%20sinNavegacion%20%3D%20%5B%5D%3B%0A%20%20%20%20for%20(const%20m%20of%20ms)%20%7B%0A%20%20%20%20%20%20const%20r%20%3D%20await%20fetch(m.u%2C%20%7B%20credentials%3A%20'include'%2C%20redirect%3A%20'follow'%20%7D)%3B%0A%20%20%20%20%20%20if%20(!r.ok)%20throw%20new%20Error('lectura%20incompleta')%3B%0A%20%20%20%20%20%20const%20fu%20%3D%20new%20URL(r.url%20%7C%7C%20m.u)%3B%0A%20%20%20%20%20%20if%20(fu.hostname%20!%3D%3D%20'sites.google.com'%20%7C%7C%20!path(fu.pathname).includes('%2Fgaudem.es%2Fsexto%2F'))%20throw%20new%20Error('sesi%C3%B3n%20o%20destino%20no%20v%C3%A1lido')%3B%0A%20%20%20%20%20%20const%20h%20%3D%20await%20r.text()%2C%20d%20%3D%20new%20DOMParser().parseFromString(h%2C%20'text%2Fhtml')%3B%0A%20%20%20%20%20%20const%20rq%20%3D%20documentos(h%2C%20d%2C%20m.u)%3B%0A%20%20%20%20%20%20d.querySelectorAll('script%2Cstyle%2Cnoscript%2Ctemplate%2Csvg').forEach(x%20%3D%3E%20x.remove())%3B%0A%20%20%20%20%20%20const%20historico%20%3D%20extraer(d%2C%20m.u)%2C%20nav%20%3D%20document.createElement('div')%2C%20anterior%20%3D%20document.createElement('div')%3B%0A%20%20%20%20%20%20const%20roots%20%3D%20%5B...d.querySelectorAll(navSelector)%5D.filter(x%20%3D%3E%20!x.parentElement%3F.closest(navSelector))%3B%0A%20%20%20%20%20%20if%20(!roots.length)%20sinNavegacion.push(m.n)%3B%0A%20%20%20%20%20%20for%20(const%20root%20of%20roots)%20%7B%0A%20%20%20%20%20%20%20%20nav.append(root.cloneNode(true))%3B%0A%20%20%20%20%20%20%20%20const%20copia%20%3D%20root.cloneNode(true)%3B%0A%20%20%20%20%20%20%20%20%2F%2F%20Proyecci%C3%B3n%20de%20la%20navegaci%C3%B3n%20anterior%20para%20bases%20v1.6%20sin%20procedencia.%0A%20%20%20%20%20%20%20%20%2F%2F%20Solo%20se%20retiran%20enlaces%20de%20espacios%20nuevos%3B%20nunca%20texto%20del%20contenido.%0A%20%20%20%20%20%20%20%20if%20(old%3F.m)%20for%20(const%20a%20of%20copia.querySelectorAll('a%5Bhref%5D'))%20%7B%0A%20%20%20%20%20%20%20%20%20%20try%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20u%20%3D%20new%20URL(a.getAttribute('href')%2C%20m.u)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(u.origin%20%3D%3D%3D%20location.origin%20%26%26%20tracked(path(u.pathname)))%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20previo%20%3D%20old.m%5Bu.href%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(!previo)%20a.remove()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20else%20if%20(previo.n)%20a.textContent%20%3D%20previo.n%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%20catch%20%7B%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20anterior.append(copia)%3B%0A%20%20%20%20%20%20%20%20root.remove()%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20const%20actualNav%20%3D%20extraer(nav%2C%20m.u)%2C%20anteriorNav%20%3D%20extraer(anterior%2C%20m.u)%3B%0A%20%20%20%20%20%20navegacion.set(m.u%2C%20%7B%20t%3A%20unicos(actualNav.t.concat(anteriorNav.t))%2C%20q%3A%20unicos(actualNav.q.concat(anteriorNav.q))%20%7D)%3B%0A%20%20%20%20%20%20%2F%2F%20t%2Fq%20conservan%20compatibilidad%3B%20c%20preserva%20procedencia%20al%20aceptar%2C%20en%20la%20misma%20clave.%0A%20%20%20%20%20%20snap.m%5Bm.u%5D%20%3D%20%7B%20n%3A%20m.n%2C%20k%3A%20m.k%2C%20...historico%2C%20c%3A%20extraer(d%2C%20m.u)%20%7D%3B%0A%20%20%20%20%20%20rsnap.m%5Bm.u%5D%20%3D%20%7B%20n%3A%20m.n%2C%20k%3A%20m.k%2C%20q%3A%20rq%20%7D%3B%0A%20%20%20%20%7D%0A%20%20%20%20%2F%2F%20Si%20Sites%20dej%C3%B3%20de%20identificar%20su%20navegaci%C3%B3n%2C%20no%20aceptar%20una%20captura%20ambigua.%0A%20%20%20%20if%20(aceptar%20%26%26%20sinNavegacion.length)%20throw%20new%20Error('no%20se%20pudo%20aislar%20la%20navegaci%C3%B3n')%3B%0A%20%20%20%20if%20(aceptar)%20%7B%0A%20%20%20%20%20%20try%20%7B%0A%20%20%20%20%20%20%20%20localStorage.setItem(K%2C%20JSON.stringify(snap))%3B%0A%20%20%20%20%20%20%20%20localStorage.setItem(KR%2C%20JSON.stringify(rsnap))%3B%0A%20%20%20%20%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20%20%20%20%20for%20(const%20%5Bkey%2C%20raw%5D%20of%20%5B%5BK%2C%20oldRaw%5D%2C%20%5BKR%2C%20oldRRaw%5D%5D)%20%7B%0A%20%20%20%20%20%20%20%20%20%20if%20(raw%20%3D%3D%3D%20null)%20localStorage.removeItem(key)%3B%20else%20localStorage.setItem(key%2C%20raw)%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20throw%20error%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20const%20T%20%3D%20Object.values(snap.m).reduce((a%2C%20x)%20%3D%3E%20a%20%2B%20x.t.length%2C%200)%3B%0A%20%20%20%20%20%20const%20Q%20%3D%20Object.values(snap.m).reduce((a%2C%20x)%20%3D%3E%20a%20%2B%20x.q.length%2C%200)%3B%0A%20%20%20%20%20%20const%20R%20%3D%20Object.values(rsnap.m).reduce((a%2C%20x)%20%3D%3E%20a%20%2B%20x.q.length%2C%200)%3B%0A%20%20%20%20%20%20alert('%E2%9C%85%20Nueva%20l%C3%ADnea%20base%20aceptada%20%C2%B7%20'%20%2B%20version%20%2B%20'%5Cn%5CnEspacios%3A%20'%20%2B%20ms.length%20%2B%20'%5CnFragmentos%20de%20texto%3A%20'%20%2B%20T%20%2B%20'%5CnRecursos%20hist%C3%B3ricos%3A%20'%20%2B%20Q%20%2B%20'%5CnDocumentos%20monitorizados%3A%20'%20%2B%20R%20%2B%20'%5Cn%5CnFecha%3A%20'%20%2B%20snap.f)%3B%0A%20%20%20%20%20%20return%20%7B%20aceptada%3A%20true%2C%20espacios%3A%20ms.length%20%7D%3B%0A%20%20%20%20%7D%0A%20%20%20%20const%20out%20%3D%20new%20Map()%2C%20diagnostico%20%3D%20%5B%5D%3B%0A%20%20%20%20const%20flag%20%3D%20(u%2C%20x%2C%20p%20%3D%20'%E2%9A%A0%EF%B8%8F')%20%3D%3E%20out.set(u%2C%20p%20%2B%20'%20'%20%2B%20(x.k%20%7C%7C%20'ESPACIO')%20%2B%20'%20%C2%B7%20'%20%2B%20x.n)%3B%0A%20%20%20%20for%20(const%20%5Bu%2C%20x%5D%20of%20Object.entries(snap.m))%20%7B%0A%20%20%20%20%20%20const%20o%20%3D%20old.m%5Bu%5D%3B%0A%20%20%20%20%20%20if%20(!o)%20%7B%20flag(u%2C%20x%2C%20'%F0%9F%86%95')%3B%20continue%3B%20%7D%0A%20%20%20%20%20%20const%20nav%20%3D%20navegacion.get(u)%3B%0A%20%20%20%20%20%20%2F%2F%20Compatibilidad%20en%20memoria%3A%20no%20reescribir%20ni%20reinicializar%20la%20base%20heredada.%0A%20%20%20%20%20%20const%20firmasNav%20%3D%20new%20Set(nav.t.map(sinEtiquetasCambiadas).filter(Boolean))%3B%0A%20%20%20%20%20%20const%20esTextoNav%20%3D%20v%20%3D%3E%20nav.t.includes(v)%20%7C%7C%20etiquetas.includes(v)%20%7C%7C%20(sinEtiquetasCambiadas(v)%20%26%26%20firmasNav.has(sinEtiquetasCambiadas(v)))%3B%0A%20%20%20%20%20%20const%20base%20%3D%20o.c%20%7C%7C%20%7B%0A%20%20%20%20%20%20%20%20t%3A%20(Array.isArray(o.t)%20%3F%20o.t%20%3A%20%5B%5D).filter(v%20%3D%3E%20!esTextoNav(v)%20%7C%7C%20x.c.t.includes(v))%2C%0A%20%20%20%20%20%20%20%20q%3A%20(Array.isArray(o.q)%20%3F%20o.q%20%3A%20%5B%5D).filter(v%20%3D%3E%20!nav.q.includes(v)%20%7C%7C%20x.c.q.includes(v))%0A%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%20%20const%20t%20%3D%20diferencia(base.t%2C%20x.c.t)%2C%20q%20%3D%20diferencia(base.q%2C%20x.c.q)%3B%0A%20%20%20%20%20%20if%20(t.agregados.length%20%7C%7C%20t.retirados.length%20%7C%7C%20q.agregados.length%20%7C%7C%20q.retirados.length)%20flag(u%2C%20x)%3B%0A%20%20%20%20%20%20const%20ro%20%3D%20oldR%3F.m%3F.%5Bu%5D%2C%20docs%20%3D%20ro%20%3F%20diferencia(ro.q%2C%20rsnap.m%5Bu%5D.q)%20%3A%20null%3B%0A%20%20%20%20%20%20if%20(docs%20%26%26%20(docs.agregados.length%20%7C%7C%20docs.retirados.length))%20flag(u%2C%20x)%3B%0A%20%20%20%20%20%20diagnostico.push(%7B%20espacio%3A%20x.n%2C%20base%3A%20o.c%20%3F%20'contenido%20propio'%20%3A%20'compatibilidad%20v1.6'%2C%20texto%3A%20%60%2B%24%7Bt.agregados.length%7D%20-%24%7Bt.retirados.length%7D%60%2C%20recursos%3A%20%60%2B%24%7Bq.agregados.length%7D%20-%24%7Bq.retirados.length%7D%60%2C%20docs%3A%20docs%20%3F%20%60%2B%24%7Bdocs.agregados.length%7D%20-%24%7Bdocs.retirados.length%7D%60%20%3A%20'pendiente%20de%20inicializar'%20%7D)%3B%0A%20%20%20%20%7D%0A%20%20%20%20for%20(const%20%5Bu%2C%20x%5D%20of%20Object.entries(old.m))%20if%20(!snap.m%5Bu%5D)%20out.set(u%2C%20'%E2%9D%8C%20'%20%2B%20(x.k%20%7C%7C%20'ESPACIO')%20%2B%20'%20%C2%B7%20'%20%2B%20x.n%20%2B%20'%20(retirado)')%3B%0A%20%20%20%20const%20cambios%20%3D%20%5B...out.values()%5D%3B%0A%20%20%20%20console.table(diagnostico)%3B%0A%20%20%20%20const%20aviso%20%3D%20sinNavegacion.length%20%3F%20'%5Cn%5Cn%E2%9A%A0%EF%B8%8F%20No%20se%20identific%C3%B3%20navegaci%C3%B3n%20en%3A%20'%20%2B%20sinNavegacion.join('%2C%20')%20%2B%20'.%20No%20aceptes%20la%20l%C3%ADnea%20base%3B%20revisa%20la%20estructura.'%20%3A%20''%3B%0A%20%20%20%20alert(titulo%20%2B%20'%5Cn%5CnEspacios%20revisados%3A%20'%20%2B%20ms.length%20%2B%20'%5CnSeguimiento%20de%20documentos%3A%20'%20%2B%20(oldRRaw%20%3F%20'activo'%20%3A%20'pendiente%20de%20inicializar')%20%2B%20'%5Cn%5Cn'%20%2B%20(cambios.length%20%3F%20'Cambios%20detectados%20en%3A%5Cn%5Cn'%20%2B%20cambios.join('%5Cn')%20%3A%20'%E2%9C%85%20Sin%20cambios%20desde%20las%20l%C3%ADneas%20base%20disponibles.%5Cn%5CnL%C3%ADneas%20base%3A%5CnHist%C3%B3rica%3A%20'%20%2B%20(old.f%20%7C%7C%20'fecha%2Fhora%20no%20disponible')%20%2B%20'%5CnDocumentos%3A%20'%20%2B%20(oldR%20%3F%20oldR.f%20%7C%7C%20'fecha%2Fhora%20no%20disponible'%20%3A%20'pendiente%20de%20inicializar'))%20%2B%20aviso%20%2B%20'%5Cn%5CnRevisi%C3%B3n%3A%20'%20%2B%20snap.f)%3B%0A%20%20%20%20return%20%7B%20espacios%3A%20ms.length%2C%20cambios%2C%20diagnostico%2C%20sinNavegacion%20%7D%3B%0A%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20alert(titulo%20%2B%20'%5Cn%5Cn%E2%9A%A0%EF%B8%8F%20No%20he%20podido%20completar%20la%20lectura%20o%20actualizaci%C3%B3n%20de%20Gaudem.%5Cn%5CnNo%20se%20ha%20aceptado%20una%20nueva%20l%C3%ADnea%20base.%20Revisa%20la%20sesi%C3%B3n%2C%20la%20conexi%C3%B3n%20y%20el%20almacenamiento.')%3B%0A%20%20%20%20console.warn('%5BMonitor%20Gaudem%5D'%2C%20error.message)%3B%0A%20%20%20%20return%20%7B%20error%3A%20true%20%7D%3B%0A%20%20%7D%0A%7D)(false)%3B
```

Cuando todavía no exista `gaudem6_recursos_v3`, el monitor indicará:

```text
Seguimiento de documentos: pendiente de inicializar
```

En ese estado la comparación histórica sigue funcionando, pero la señal documental enriquecida todavía no participa.

### 8.2 `✅ Aceptar cambios Gaudem`

**Marcador operativo 1.7-rc1 validado.** Ejecutarlo únicamente cuando las novedades detectadas ya se hayan revisado y se quieran aceptar como referencia conocida. Actualiza de forma explícita las mismas dos líneas base:

- `gaudem6_detalle_v2`;
- `gaudem6_recursos_v3`.

URL:

```javascript
javascript:void%20(async%20function%20ejecutarMonitor(aceptar%20%3D%20false)%20%7B%0A%20%20const%20version%20%3D%20'1.7-rc1'%3B%0A%20%20const%20titulo%20%3D%20aceptar%20%3F%20'%E2%9C%85%20Aceptar%20cambios%20Gaudem'%20%3A%20%60%F0%9F%94%8E%20Revisar%20Gaudem%206.%C2%BA%20%C2%B7%20%24%7Bversion%7D%60%3B%0A%20%20const%20K%20%3D%20'gaudem6_detalle_v2'%2C%20KR%20%3D%20'gaudem6_recursos_v3'%3B%0A%20%20const%20normalizar%20%3D%20s%20%3D%3E%20(s%20%7C%7C%20'').replace(%2F%5Cs%2B%2Fg%2C%20'%20').trim()%3B%0A%20%20const%20path%20%3D%20s%20%3D%3E%20decodeURIComponent(s).normalize('NFD').replace(%2F%5B%5Cu0300-%5Cu036f%5D%2Fg%2C%20'')%3B%0A%20%20const%20tracked%20%3D%20p%20%3D%3E%20p.includes('%2Fgaudem.es%2Fsexto%2Fareas%2F')%20%7C%7C%20p.includes('%2Fgaudem.es%2Fsexto%2Fzonas%2F')%20%7C%7C%20p.includes('%2Fgaudem.es%2Fsexto%2Fenglish-zones')%3B%0A%20%20const%20kind%20%3D%20p%20%3D%3E%20p.includes('%2Fgaudem.es%2Fsexto%2Fzonas%2F')%20%7C%7C%20p.includes('%2Fgaudem.es%2Fsexto%2Fenglish-zones')%20%3F%20'ZONA'%20%3A%20'%C3%81REA'%3B%0A%20%20const%20textosSelector%20%3D%20'h1%2Ch2%2Ch3%2Ch4%2Ch5%2Ch6%2Cp%2Cli%2Ca%2C%5Brole%3D%22heading%22%5D'%3B%0A%20%20const%20recursosSelector%20%3D%20'a%5Bhref%5D%2Ciframe%5Bsrc%5D%2Cembed%5Bsrc%5D%2Cobject%5Bdata%5D'%3B%0A%20%20const%20navSelector%20%3D%20'nav%2C%5Brole%3D%22navigation%22%5D'%3B%0A%20%20const%20unicos%20%3D%20a%20%3D%3E%20%5B...new%20Set(a)%5D.sort()%3B%0A%20%20const%20urlElemento%20%3D%20x%20%3D%3E%20x.getAttribute('href')%20%7C%7C%20x.getAttribute('src')%20%7C%7C%20x.getAttribute('data')%3B%0A%20%20const%20canon%20%3D%20(v%2C%20b%2C%20tag)%20%3D%3E%20%7B%0A%20%20%20%20try%20%7B%0A%20%20%20%20%20%20const%20u%20%3D%20new%20URL(v%2C%20b)%3B%20u.hash%20%3D%20''%3B%0A%20%20%20%20%20%20if%20(%2F%5E(IFRAME%7CEMBED%7COBJECT)%24%2F.test(tag))%20u.search%20%3D%20''%3B%0A%20%20%20%20%20%20else%20%7B%0A%20%20%20%20%20%20%20%20%5B'authuser'%2C%20'usp'%2C%20'pli'%2C%20'embed_config'%2C%20'embedded'%2C%20'rm'%5D.forEach(k%20%3D%3E%20u.searchParams.delete(k))%3B%0A%20%20%20%20%20%20%20%20const%20p%20%3D%20%5B...u.searchParams.entries()%5D.sort((a%2C%20b)%20%3D%3E%20a%5B0%5D.localeCompare(b%5B0%5D))%3B%0A%20%20%20%20%20%20%20%20u.search%20%3D%20''%3B%20p.forEach((%5Bk%2C%20v%5D)%20%3D%3E%20u.searchParams.append(k%2C%20v))%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20return%20u.href%3B%0A%20%20%20%20%7D%20catch%20%7B%20return%20''%3B%20%7D%0A%20%20%7D%3B%0A%20%20const%20canonDoc%20%3D%20(v%2C%20b)%20%3D%3E%20%7B%0A%20%20%20%20try%20%7B%0A%20%20%20%20%20%20const%20u%20%3D%20new%20URL(v%2C%20b)%3B%20u.hash%20%3D%20''%3B%0A%20%20%20%20%20%20%5B'authuser'%2C%20'usp'%2C%20'pli'%2C%20'embed_config'%2C%20'embedded'%2C%20'rm'%2C%20'resourcekey'%2C%20'ouid'%2C%20'rtpof'%2C%20'sd'%2C%20'widget'%2C%20'headers'%2C%20'chrome'%5D.forEach(k%20%3D%3E%20u.searchParams.delete(k))%3B%0A%20%20%20%20%20%20const%20p%20%3D%20%5B...u.searchParams.entries()%5D.sort((a%2C%20b)%20%3D%3E%20a%5B0%5D.localeCompare(b%5B0%5D))%3B%0A%20%20%20%20%20%20u.search%20%3D%20''%3B%20p.forEach((%5Bk%2C%20v%5D)%20%3D%3E%20u.searchParams.append(k%2C%20v))%3B%0A%20%20%20%20%20%20return%20u.href%3B%0A%20%20%20%20%7D%20catch%20%7B%20return%20''%3B%20%7D%0A%20%20%7D%3B%0A%20%20const%20esDoc%20%3D%20v%20%3D%3E%20%7B%0A%20%20%20%20try%20%7B%0A%20%20%20%20%20%20const%20u%20%3D%20new%20URL(v)%3B%0A%20%20%20%20%20%20return%20%2F(%5E%7C%5C.)(drive%7Cdocs)%5C.google%5C.com%24%2Fi.test(u.hostname)%20%7C%7C%20%2F%5C.(pdf%7Cdocx%3F%7Cpptx%3F%7Cxlsx%3F)%24%2Fi.test(u.pathname)%3B%0A%20%20%20%20%7D%20catch%20%7B%20return%20false%3B%20%7D%0A%20%20%7D%3B%0A%20%20%2F%2F%20Se%C3%B1al%20documental%20v1.5%20conservada%2C%20incluido%20el%20HTML%20serializado%20y%20sus%20par%C3%A1metros.%0A%20%20const%20documentos%20%3D%20(h%2C%20d%2C%20b)%20%3D%3E%20%7B%0A%20%20%20%20const%20a%20%3D%20%5B...d.querySelectorAll(recursosSelector)%5D.map(urlElemento)%3B%0A%20%20%20%20const%20s%20%3D%20String(h%20%7C%7C%20'').replace(%2F%5C%5C%2Bu002f%2Fgi%2C%20'%2F').replace(%2F%5C%5C%2Bu003a%2Fgi%2C%20'%3A').replace(%2F%5C%5C%2Bu003d%2Fgi%2C%20'%3D').replace(%2F%5C%5C%2Bu0026%2Fgi%2C%20'%26').replace(%2F%5C%5C%2B%5C%2F%2Fg%2C%20'%2F').replace(%2F%26amp%3B%2Fgi%2C%20'%26')%3B%0A%20%20%20%20const%20r%20%3D%20(s.match(%2Fhttps%3F%3A%5C%2F%5C%2F%5B%5E%5Cs%22'%3C%3E%5D%2B%2Fg)%20%7C%7C%20%5B%5D).map(v%20%3D%3E%20v.replace(%2F%5B)%2C%3B%5C%5D%7D%5D%2B%24%2Fg%2C%20''))%3B%0A%20%20%20%20return%20unicos(a.concat(r).map(v%20%3D%3E%20canonDoc(v%2C%20b)).filter(v%20%3D%3E%20v%20%26%26%20esDoc(v)))%3B%0A%20%20%7D%3B%0A%20%20const%20extraer%20%3D%20(d%2C%20b)%20%3D%3E%20(%7B%0A%20%20%20%20t%3A%20unicos(%5B...d.querySelectorAll(textosSelector)%5D.map(x%20%3D%3E%20normalizar(x.textContent)).filter(x%20%3D%3E%20x.length%20%3E%3D%203%20%26%26%20x.length%20%3C%3D%20300))%2C%0A%20%20%20%20q%3A%20unicos(%5B...d.querySelectorAll(recursosSelector)%5D.map(x%20%3D%3E%20canon(urlElemento(x)%2C%20b%2C%20x.tagName)).filter(x%20%3D%3E%20x%20%26%26%20!x.startsWith(location.origin%20%2B%20'%2Fgaudem.es%2Fsexto%2F')))%0A%20%20%7D)%3B%0A%20%20const%20diferencia%20%3D%20(antes%2C%20ahora)%20%3D%3E%20%7B%0A%20%20%20%20const%20anterior%20%3D%20Array.isArray(antes)%20%3F%20antes%20%3A%20%5B%5D%3B%0A%20%20%20%20return%20%7B%20agregados%3A%20ahora.filter(v%20%3D%3E%20!anterior.includes(v))%2C%20retirados%3A%20anterior.filter(v%20%3D%3E%20!ahora.includes(v))%20%7D%3B%0A%20%20%7D%3B%0A%20%20try%20%7B%0A%20%20%20%20if%20(!location.href.startsWith('https%3A%2F%2Fsites.google.com%2Fgaudem.es%2Fsexto%2F'))%20%7B%0A%20%20%20%20%20%20alert(titulo%20%2B%20'%5Cn%5Cn%E2%9A%A0%EF%B8%8F%20No%20est%C3%A1s%20dentro%20del%20Site%20de%206.%C2%BA%20de%20Gaudem.%5Cn%5CnAbre%20https%3A%2F%2Fsites.google.com%2Fgaudem.es%2Fsexto%2Finicio')%3B%0A%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%20%20%20%20const%20oldRaw%20%3D%20localStorage.getItem(K)%2C%20oldRRaw%20%3D%20localStorage.getItem(KR)%3B%0A%20%20%20%20const%20old%20%3D%20oldRaw%20%3F%20JSON.parse(oldRaw)%20%3A%20null%2C%20oldR%20%3D%20oldRRaw%20%3F%20JSON.parse(oldRRaw)%20%3A%20null%3B%0A%20%20%20%20if%20(!aceptar%20%26%26%20!old%3F.m)%20%7B%0A%20%20%20%20%20%20alert(titulo%20%2B%20'%5Cn%5Cn%E2%9A%A0%EF%B8%8F%20No%20encuentro%20la%20l%C3%ADnea%20base%20hist%C3%B3rica%20en%20este%20navegador%2Fperfil.%5Cn%5CnNo%20se%20ha%20realizado%20ninguna%20comparaci%C3%B3n.')%3B%0A%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%20%20%20%20if%20(aceptar%20%26%26%20!confirm('%C2%BFAceptar%20el%20estado%20ACTUAL%20de%20Gaudem%20como%20nueva%20l%C3%ADnea%20base%3F%5Cn%5CnEsto%20actualizar%C3%A1%20ambas%20l%C3%ADneas%20base.%20Hazlo%20solo%20despu%C3%A9s%20de%20revisar%20las%20novedades%20y%20validar%20el%20monitor.'))%20return%3B%0A%20%20%20%20%2F%2F%20Descubrir%20antes%20de%20excluir%20navegaci%C3%B3n%3A%20las%20p%C3%A1ginas%20nuevas%20siguen%20apareciendo.%0A%20%20%20%20const%20ms%20%3D%20%5B...new%20Map(%5B...document.querySelectorAll('a%5Bhref%5D')%5D.map(a%20%3D%3E%20%7B%0A%20%20%20%20%20%20try%20%7B%0A%20%20%20%20%20%20%20%20const%20u%20%3D%20new%20URL(a.href)%2C%20p%20%3D%20path(u.pathname)%3B%0A%20%20%20%20%20%20%20%20if%20(u.origin%20%3D%3D%3D%20location.origin%20%26%26%20tracked(p))%20return%20%5Bu.href%2C%20%7B%20u%3A%20u.href%2C%20n%3A%20normalizar(a.innerText)%20%7C%7C%20decodeURIComponent(u.pathname.split('%2F').pop())%2C%20k%3A%20kind(p)%20%7D%5D%3B%0A%20%20%20%20%20%20%7D%20catch%20%7B%7D%0A%20%20%20%20%7D).filter(Boolean)).values()%5D%3B%0A%20%20%20%20if%20(!ms.length)%20%7B%0A%20%20%20%20%20%20alert(titulo%20%2B%20'%5Cn%5Cn%E2%9A%A0%EF%B8%8F%20No%20puedo%20localizar%20%C3%A1reas%20o%20zonas%20acad%C3%A9micas.%20Comprueba%20Inicio%20y%20la%20sesi%C3%B3n%20de%20Gaudem.')%3B%0A%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%20%20%20%20const%20nombresCambiados%20%3D%20%5B%5D%3B%0A%20%20%20%20for%20(const%20m%20of%20ms)%20if%20(!old%3F.m%3F.%5Bm.u%5D%20%7C%7C%20old.m%5Bm.u%5D.n%20!%3D%3D%20m.n)%20%7B%0A%20%20%20%20%20%20nombresCambiados.push(m.n%2C%20old%3F.m%3F.%5Bm.u%5D%3F.n%20%7C%7C%20'')%3B%0A%20%20%20%20%7D%0A%20%20%20%20for%20(const%20%5Bu%2C%20m%5D%20of%20Object.entries(old%3F.m%20%7C%7C%20%7B%7D))%20if%20(!ms.some(x%20%3D%3E%20x.u%20%3D%3D%3D%20u))%20nombresCambiados.push(m.n)%3B%0A%20%20%20%20const%20etiquetas%20%3D%20unicos(nombresCambiados.map(normalizar).filter(Boolean)).sort((a%2C%20b)%20%3D%3E%20b.length%20-%20a.length)%3B%0A%20%20%20%20const%20sinEtiquetasCambiadas%20%3D%20valor%20%3D%3E%20normalizar(etiquetas.reduce((texto%2C%20etiqueta)%20%3D%3E%20texto.split(etiqueta).join('')%2C%20valor))%3B%0A%20%20%20%20const%20snap%20%3D%20%7B%20f%3A%20new%20Date().toLocaleString()%2C%20m%3A%20%7B%7D%20%7D%2C%20rsnap%20%3D%20%7B%20f%3A%20new%20Date().toLocaleString()%2C%20m%3A%20%7B%7D%20%7D%3B%0A%20%20%20%20const%20navegacion%20%3D%20new%20Map()%2C%20sinNavegacion%20%3D%20%5B%5D%3B%0A%20%20%20%20for%20(const%20m%20of%20ms)%20%7B%0A%20%20%20%20%20%20const%20r%20%3D%20await%20fetch(m.u%2C%20%7B%20credentials%3A%20'include'%2C%20redirect%3A%20'follow'%20%7D)%3B%0A%20%20%20%20%20%20if%20(!r.ok)%20throw%20new%20Error('lectura%20incompleta')%3B%0A%20%20%20%20%20%20const%20fu%20%3D%20new%20URL(r.url%20%7C%7C%20m.u)%3B%0A%20%20%20%20%20%20if%20(fu.hostname%20!%3D%3D%20'sites.google.com'%20%7C%7C%20!path(fu.pathname).includes('%2Fgaudem.es%2Fsexto%2F'))%20throw%20new%20Error('sesi%C3%B3n%20o%20destino%20no%20v%C3%A1lido')%3B%0A%20%20%20%20%20%20const%20h%20%3D%20await%20r.text()%2C%20d%20%3D%20new%20DOMParser().parseFromString(h%2C%20'text%2Fhtml')%3B%0A%20%20%20%20%20%20const%20rq%20%3D%20documentos(h%2C%20d%2C%20m.u)%3B%0A%20%20%20%20%20%20d.querySelectorAll('script%2Cstyle%2Cnoscript%2Ctemplate%2Csvg').forEach(x%20%3D%3E%20x.remove())%3B%0A%20%20%20%20%20%20const%20historico%20%3D%20extraer(d%2C%20m.u)%2C%20nav%20%3D%20document.createElement('div')%2C%20anterior%20%3D%20document.createElement('div')%3B%0A%20%20%20%20%20%20const%20roots%20%3D%20%5B...d.querySelectorAll(navSelector)%5D.filter(x%20%3D%3E%20!x.parentElement%3F.closest(navSelector))%3B%0A%20%20%20%20%20%20if%20(!roots.length)%20sinNavegacion.push(m.n)%3B%0A%20%20%20%20%20%20for%20(const%20root%20of%20roots)%20%7B%0A%20%20%20%20%20%20%20%20nav.append(root.cloneNode(true))%3B%0A%20%20%20%20%20%20%20%20const%20copia%20%3D%20root.cloneNode(true)%3B%0A%20%20%20%20%20%20%20%20%2F%2F%20Proyecci%C3%B3n%20de%20la%20navegaci%C3%B3n%20anterior%20para%20bases%20v1.6%20sin%20procedencia.%0A%20%20%20%20%20%20%20%20%2F%2F%20Solo%20se%20retiran%20enlaces%20de%20espacios%20nuevos%3B%20nunca%20texto%20del%20contenido.%0A%20%20%20%20%20%20%20%20if%20(old%3F.m)%20for%20(const%20a%20of%20copia.querySelectorAll('a%5Bhref%5D'))%20%7B%0A%20%20%20%20%20%20%20%20%20%20try%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20u%20%3D%20new%20URL(a.getAttribute('href')%2C%20m.u)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(u.origin%20%3D%3D%3D%20location.origin%20%26%26%20tracked(path(u.pathname)))%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20const%20previo%20%3D%20old.m%5Bu.href%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(!previo)%20a.remove()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20else%20if%20(previo.n)%20a.textContent%20%3D%20previo.n%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%20catch%20%7B%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20anterior.append(copia)%3B%0A%20%20%20%20%20%20%20%20root.remove()%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20const%20actualNav%20%3D%20extraer(nav%2C%20m.u)%2C%20anteriorNav%20%3D%20extraer(anterior%2C%20m.u)%3B%0A%20%20%20%20%20%20navegacion.set(m.u%2C%20%7B%20t%3A%20unicos(actualNav.t.concat(anteriorNav.t))%2C%20q%3A%20unicos(actualNav.q.concat(anteriorNav.q))%20%7D)%3B%0A%20%20%20%20%20%20%2F%2F%20t%2Fq%20conservan%20compatibilidad%3B%20c%20preserva%20procedencia%20al%20aceptar%2C%20en%20la%20misma%20clave.%0A%20%20%20%20%20%20snap.m%5Bm.u%5D%20%3D%20%7B%20n%3A%20m.n%2C%20k%3A%20m.k%2C%20...historico%2C%20c%3A%20extraer(d%2C%20m.u)%20%7D%3B%0A%20%20%20%20%20%20rsnap.m%5Bm.u%5D%20%3D%20%7B%20n%3A%20m.n%2C%20k%3A%20m.k%2C%20q%3A%20rq%20%7D%3B%0A%20%20%20%20%7D%0A%20%20%20%20%2F%2F%20Si%20Sites%20dej%C3%B3%20de%20identificar%20su%20navegaci%C3%B3n%2C%20no%20aceptar%20una%20captura%20ambigua.%0A%20%20%20%20if%20(aceptar%20%26%26%20sinNavegacion.length)%20throw%20new%20Error('no%20se%20pudo%20aislar%20la%20navegaci%C3%B3n')%3B%0A%20%20%20%20if%20(aceptar)%20%7B%0A%20%20%20%20%20%20try%20%7B%0A%20%20%20%20%20%20%20%20localStorage.setItem(K%2C%20JSON.stringify(snap))%3B%0A%20%20%20%20%20%20%20%20localStorage.setItem(KR%2C%20JSON.stringify(rsnap))%3B%0A%20%20%20%20%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20%20%20%20%20for%20(const%20%5Bkey%2C%20raw%5D%20of%20%5B%5BK%2C%20oldRaw%5D%2C%20%5BKR%2C%20oldRRaw%5D%5D)%20%7B%0A%20%20%20%20%20%20%20%20%20%20if%20(raw%20%3D%3D%3D%20null)%20localStorage.removeItem(key)%3B%20else%20localStorage.setItem(key%2C%20raw)%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20throw%20error%3B%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20const%20T%20%3D%20Object.values(snap.m).reduce((a%2C%20x)%20%3D%3E%20a%20%2B%20x.t.length%2C%200)%3B%0A%20%20%20%20%20%20const%20Q%20%3D%20Object.values(snap.m).reduce((a%2C%20x)%20%3D%3E%20a%20%2B%20x.q.length%2C%200)%3B%0A%20%20%20%20%20%20const%20R%20%3D%20Object.values(rsnap.m).reduce((a%2C%20x)%20%3D%3E%20a%20%2B%20x.q.length%2C%200)%3B%0A%20%20%20%20%20%20alert('%E2%9C%85%20Nueva%20l%C3%ADnea%20base%20aceptada%20%C2%B7%20'%20%2B%20version%20%2B%20'%5Cn%5CnEspacios%3A%20'%20%2B%20ms.length%20%2B%20'%5CnFragmentos%20de%20texto%3A%20'%20%2B%20T%20%2B%20'%5CnRecursos%20hist%C3%B3ricos%3A%20'%20%2B%20Q%20%2B%20'%5CnDocumentos%20monitorizados%3A%20'%20%2B%20R%20%2B%20'%5Cn%5CnFecha%3A%20'%20%2B%20snap.f)%3B%0A%20%20%20%20%20%20return%20%7B%20aceptada%3A%20true%2C%20espacios%3A%20ms.length%20%7D%3B%0A%20%20%20%20%7D%0A%20%20%20%20const%20out%20%3D%20new%20Map()%2C%20diagnostico%20%3D%20%5B%5D%3B%0A%20%20%20%20const%20flag%20%3D%20(u%2C%20x%2C%20p%20%3D%20'%E2%9A%A0%EF%B8%8F')%20%3D%3E%20out.set(u%2C%20p%20%2B%20'%20'%20%2B%20(x.k%20%7C%7C%20'ESPACIO')%20%2B%20'%20%C2%B7%20'%20%2B%20x.n)%3B%0A%20%20%20%20for%20(const%20%5Bu%2C%20x%5D%20of%20Object.entries(snap.m))%20%7B%0A%20%20%20%20%20%20const%20o%20%3D%20old.m%5Bu%5D%3B%0A%20%20%20%20%20%20if%20(!o)%20%7B%20flag(u%2C%20x%2C%20'%F0%9F%86%95')%3B%20continue%3B%20%7D%0A%20%20%20%20%20%20const%20nav%20%3D%20navegacion.get(u)%3B%0A%20%20%20%20%20%20%2F%2F%20Compatibilidad%20en%20memoria%3A%20no%20reescribir%20ni%20reinicializar%20la%20base%20heredada.%0A%20%20%20%20%20%20const%20firmasNav%20%3D%20new%20Set(nav.t.map(sinEtiquetasCambiadas).filter(Boolean))%3B%0A%20%20%20%20%20%20const%20esTextoNav%20%3D%20v%20%3D%3E%20nav.t.includes(v)%20%7C%7C%20etiquetas.includes(v)%20%7C%7C%20(sinEtiquetasCambiadas(v)%20%26%26%20firmasNav.has(sinEtiquetasCambiadas(v)))%3B%0A%20%20%20%20%20%20const%20base%20%3D%20o.c%20%7C%7C%20%7B%0A%20%20%20%20%20%20%20%20t%3A%20(Array.isArray(o.t)%20%3F%20o.t%20%3A%20%5B%5D).filter(v%20%3D%3E%20!esTextoNav(v)%20%7C%7C%20x.c.t.includes(v))%2C%0A%20%20%20%20%20%20%20%20q%3A%20(Array.isArray(o.q)%20%3F%20o.q%20%3A%20%5B%5D).filter(v%20%3D%3E%20!nav.q.includes(v)%20%7C%7C%20x.c.q.includes(v))%0A%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%20%20const%20t%20%3D%20diferencia(base.t%2C%20x.c.t)%2C%20q%20%3D%20diferencia(base.q%2C%20x.c.q)%3B%0A%20%20%20%20%20%20if%20(t.agregados.length%20%7C%7C%20t.retirados.length%20%7C%7C%20q.agregados.length%20%7C%7C%20q.retirados.length)%20flag(u%2C%20x)%3B%0A%20%20%20%20%20%20const%20ro%20%3D%20oldR%3F.m%3F.%5Bu%5D%2C%20docs%20%3D%20ro%20%3F%20diferencia(ro.q%2C%20rsnap.m%5Bu%5D.q)%20%3A%20null%3B%0A%20%20%20%20%20%20if%20(docs%20%26%26%20(docs.agregados.length%20%7C%7C%20docs.retirados.length))%20flag(u%2C%20x)%3B%0A%20%20%20%20%20%20diagnostico.push(%7B%20espacio%3A%20x.n%2C%20base%3A%20o.c%20%3F%20'contenido%20propio'%20%3A%20'compatibilidad%20v1.6'%2C%20texto%3A%20%60%2B%24%7Bt.agregados.length%7D%20-%24%7Bt.retirados.length%7D%60%2C%20recursos%3A%20%60%2B%24%7Bq.agregados.length%7D%20-%24%7Bq.retirados.length%7D%60%2C%20docs%3A%20docs%20%3F%20%60%2B%24%7Bdocs.agregados.length%7D%20-%24%7Bdocs.retirados.length%7D%60%20%3A%20'pendiente%20de%20inicializar'%20%7D)%3B%0A%20%20%20%20%7D%0A%20%20%20%20for%20(const%20%5Bu%2C%20x%5D%20of%20Object.entries(old.m))%20if%20(!snap.m%5Bu%5D)%20out.set(u%2C%20'%E2%9D%8C%20'%20%2B%20(x.k%20%7C%7C%20'ESPACIO')%20%2B%20'%20%C2%B7%20'%20%2B%20x.n%20%2B%20'%20(retirado)')%3B%0A%20%20%20%20const%20cambios%20%3D%20%5B...out.values()%5D%3B%0A%20%20%20%20console.table(diagnostico)%3B%0A%20%20%20%20const%20aviso%20%3D%20sinNavegacion.length%20%3F%20'%5Cn%5Cn%E2%9A%A0%EF%B8%8F%20No%20se%20identific%C3%B3%20navegaci%C3%B3n%20en%3A%20'%20%2B%20sinNavegacion.join('%2C%20')%20%2B%20'.%20No%20aceptes%20la%20l%C3%ADnea%20base%3B%20revisa%20la%20estructura.'%20%3A%20''%3B%0A%20%20%20%20alert(titulo%20%2B%20'%5Cn%5CnEspacios%20revisados%3A%20'%20%2B%20ms.length%20%2B%20'%5CnSeguimiento%20de%20documentos%3A%20'%20%2B%20(oldRRaw%20%3F%20'activo'%20%3A%20'pendiente%20de%20inicializar')%20%2B%20'%5Cn%5Cn'%20%2B%20(cambios.length%20%3F%20'Cambios%20detectados%20en%3A%5Cn%5Cn'%20%2B%20cambios.join('%5Cn')%20%3A%20'%E2%9C%85%20Sin%20cambios%20desde%20las%20l%C3%ADneas%20base%20disponibles.%5Cn%5CnL%C3%ADneas%20base%3A%5CnHist%C3%B3rica%3A%20'%20%2B%20(old.f%20%7C%7C%20'fecha%2Fhora%20no%20disponible')%20%2B%20'%5CnDocumentos%3A%20'%20%2B%20(oldR%20%3F%20oldR.f%20%7C%7C%20'fecha%2Fhora%20no%20disponible'%20%3A%20'pendiente%20de%20inicializar'))%20%2B%20aviso%20%2B%20'%5Cn%5CnRevisi%C3%B3n%3A%20'%20%2B%20snap.f)%3B%0A%20%20%20%20return%20%7B%20espacios%3A%20ms.length%2C%20cambios%2C%20diagnostico%2C%20sinNavegacion%20%7D%3B%0A%20%20%7D%20catch%20(error)%20%7B%0A%20%20%20%20alert(titulo%20%2B%20'%5Cn%5Cn%E2%9A%A0%EF%B8%8F%20No%20he%20podido%20completar%20la%20lectura%20o%20actualizaci%C3%B3n%20de%20Gaudem.%5Cn%5CnNo%20se%20ha%20aceptado%20una%20nueva%20l%C3%ADnea%20base.%20Revisa%20la%20sesi%C3%B3n%2C%20la%20conexi%C3%B3n%20y%20el%20almacenamiento.')%3B%0A%20%20%20%20console.warn('%5BMonitor%20Gaudem%5D'%2C%20error.message)%3B%0A%20%20%20%20return%20%7B%20error%3A%20true%20%7D%3B%0A%20%20%7D%0A%7D)(true)%3B
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

### Se aceptó, pero Revisar sigue mostrando las mismas novedades

Comprobar que los dos marcadores tienen el código vigente. El botón `Aceptar` del aviso de resultados solo cierra ese aviso; no ejecuta el marcador **Aceptar cambios Gaudem**. El aviso de guardado de la versión instalada debe indicar `Nueva línea base aceptada · 1.7-rc1`.

Sustituir la URL completa del marcador desactualizado desde §8; no pedir al usuario que busque y cambie un `false` dentro del código. No diagnosticar una causa única solo a partir de un aviso de diferencias. Tras la aceptación explícita, comprobar con Revisar las fechas y el resultado. No borrar ni reinicializar datos para resolver una mezcla de marcadores.

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

La solución sigue siendo una utilidad operativa local recuperable desde GitHub. PR #181 aprobada e integrada en `main` `9c1597af17415b7ccbd09e9dc7bd7ed1eea99810`. Pruebas técnicas y ciclo real Revisar → Aceptar → Revisar completados el 17/10/2026: nueva referencia explícita a las 00:39:04 y revisión sin cambios a las 00:39:47. Incidencia cerrada; conservar solo los dos marcadores operativos 1.7-rc1. No se requiere ninguna otra acción del Product Owner para este cierre.

La fuente de verdad de su procedimiento es este manual. Los marcadores del navegador son su instancia local de ejecución.