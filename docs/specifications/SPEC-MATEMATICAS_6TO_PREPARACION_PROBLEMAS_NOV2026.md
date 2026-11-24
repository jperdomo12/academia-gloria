# Matemáticas 6.º · Preparación de problemas · noviembre 2026
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| Ruta | docs/specifications/SPEC-MATEMATICAS_6TO_PREPARACION_PROBLEMAS_NOV2026.md |
| Propietario | Contenido curricular Matemáticas · 6.º |
| Responsables | Product Owner + AI Collaborator |
| Ámbito | Refuerzo temporal de interpretación y resolución de problemas de Matemáticas de 6.º |
| Versión | 1.6 |
| Estado | Candidata #277 + #281 implementada en rama · pendiente de revisión/aprobación · no integrada ni publicada |
| Fecha | 24/11/2026 |
| Origen | Ficha escolar de cinco problemas y ampliación formativa aprobada por el Product Owner; examen confirmado el 26/11/2026 |

## Documentos relacionados

- Fuente escolar específica: Matemáticas.pdf, ficha Gaudem «Matemáticas · Problemas», una página y cinco ejercicios aportados por la familia.
- Referencia metodológica: Problemas .pdf, quince fotografías de páginas dobles del libro facilitado por Pilar; **no se reproduce el libro**.
- Fechas y temario inicialmente comunicados por Pilar: 19/11 y numeración hasta 999.999 (referencia histórica superada). **Corrección confirmada el 12/11: prueba de Matemáticas el 26/11/2026; numeración hasta 99.999.** Incluye anterior/posterior, nombre de números, redondeo, cálculo y problemas; esta SPEC cubre solo el refuerzo de problemas.
- docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md
- docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md
- docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md

## Historial

| Versión | Fecha | Responsables | Cambios |
|---|---|---|---|
| 1.6 | 24/11/2026 | Product Owner + AI Collaborator | Implementa candidata coordinada #281/#277: 10 problemas curados en 2 bloques, dos dobles encadenados, dos Misiones independientes, sesiones formativas y evidencia de dos bloques distintos de misma vuelta. Recuperación de bloque completo desde evidencia, sin guardar parciales; histórico preservado. 63/63 Node y seis suites DOM simulado; navegador bloqueado. Pendiente aprobación, no merge/Pages ni estabilidad. |
| 1.5 | 17/11/2026 | Product Owner + AI Collaborator | Product Owner aprueba #260; integrada en c1e31af39f4ba7dd4408132ecdfc38202fb97494. Pages #869 / ejecución 44143618928 completada con éxito. Seis archivos de producto públicos HTTP 200 e idénticos a la versión validada; cierre técnico. Uso real con Gloria y voz del dispositivo pendientes; no se declara estable. |
| 1.4 | 17/11/2026 | Product Owner + AI Collaborator | Implementación candidata del contrato v1.3: 20 originales, cuatro bloques sin repetición, progreso por problema completo y pausa/reanudación en memoria; relación más/menos y total/restante, unidad de libros y fecha 26/11. Nueve pruebas Node y navegador real superados; Gaudem y calentamiento conservados. Pendiente aprobación de PR; sin merge/Pages ni estabilidad familiar. |
| 1.3 | 17/11/2026 | Product Owner + AI Collaborator | Prioridad pedagógica familiar: **comprensión y razonamiento matemático transversal** mediante práctica variada y ayudas voluntarias. En 20 problemas de 4 bloques se mantienen 2 comparaciones «menos que» cuyo final es suma, y se incorporan 2 «más que»: una pide el total y otra pide el dinero restante (**operación final resta**). Motor, preguntas, diagramas y pruebas deben distinguir relación y pregunta final; se preservan cinco Gaudem, contenido anterior y calidad. Solo documentación; pendiente DESA. |
| 1.2 | 17/11/2026 | Product Owner + AI Collaborator | Product Owner aprueba subir de 10 a 20 los problemas originales del Paso 3, en cuatro bloques de cinco equilibrados (una familia por bloque), con contador global, selección sin repetición y calidad actual como mínimo. Se añaden contratos verificables, diez propuestas de enunciados originales y corrección de fecha del examen a 26/11. **Solo documentación; aún no implementado.** |
| 1.1 | 11/11/2026 | Product Owner + AI Collaborator | PR #245: experiencia y banco de problemas; PR #246: visualización de doble y comparaciones. Pages #43028910917 y #43029670985 completados con éxito. Validación familiar pendiente. |
| 1.0 | 11/11/2026 | Product Owner + AI Collaborator | Especificación aprobada y desarrollo inicial en rama. |

## 🧭 Resumen de contenido

| Punto | Contenido |
|---|---|
| 1. Decisión y ubicación | Ruta y alcance del recurso temporal. |
| 2. Metodología | Comprender antes de operar, ayudas, audio y reintentos. |
| 3. Recorridos | Comprensión, cinco problemas de Gaudem y diez originales en dos bloques; dos Misiones independientes. |
| 4. Arquitectura y contratos | Banco, motor, selección sin repetición y estado temporal del progreso. |
| 5. Experiencia y accesibilidad | Contadores, pausas, apoyos visuales y uso en móvil/escritorio. |
| 6. Fuera de alcance | Límites de la ampliación y temario independiente. |
| 7. Criterios de aceptación | Barrera explícita de calidad pedagógica, funcional y técnica. |
| 8. Estado | Diferencia entre lo publicado y lo aprobado pendiente de DESA. |

## 1. Decisión y ubicación

Ruta: 6.º de Primaria → Matemáticas → Me puede ayudar / Estrategias para problemas → Me preparo para los problemas.

Implementación: cursos/6to/mates/preparacion-problemas/.

Accesos: tarjeta propia en cursos/6to/mates/index.html y enlace desde cursos/6to/mates/piloto-problemas.html («Entender antes de calcular»).

No se modifica el motor original de «Entender antes de calcular» ni el de «Problemas y operaciones · Nivel A»; no se crea un nuevo Tema permanente paralelo. Potencias no forma parte de este refuerzo.

## 2. Metodología

**Comprendo → Relaciono → Calculo → Compruebo.**

Se comienza con una interpretación explícita del enunciado, sin efectuar cálculos. Después se identifica la operación, se resuelve y se verifica la respuesta. En comparaciones de precio hay dos cálculos: precio desconocido y respuesta final, que puede ser el total de ambos artículos o el dinero restante tras comprar únicamente el segundo. En repartos se comprueban cociente y resto.

No se premia la rapidez, no se utiliza cronómetro, existen pistas voluntarias y reintentos sin penalización. El material responde a observaciones familiares de respuestas precipitadas y dificultades posibles con relaciones «más/menos que». No permite establecer diagnósticos.

### 2.1. Prioridad familiar · comprensión y razonamiento matemático transversal

**Observación familiar del 17/11:** Gloria ha tenido dificultades para distinguir la **relación entre datos** de la **respuesta final solicitada**. En problemas como «B cuesta 2 € menos que A», ha tendido a elegir la resta por la palabra «menos», sin resolver siempre el gasto total. La familia confirma que **también necesita practicar el sentido contrario, «más que»**, incluso cuando la **operación final es una resta**, y que la prioridad verdadera es el **razonamiento en todas las familias de problemas**. Ha avanzado y necesita práctica variada y gradual. Es una observación educativa familiar, no diagnóstico ni confirmación del contenido exacto del examen.

**Ejemplos didácticos, fuera del banco activo:** Si A cuesta 10 € y B cuesta **2 € menos**, B = 8 € y, si preguntan cuánto cuestan **juntos**, total = **18 €**. Si B cuesta **2 € más**, B = 12 € y, si preguntan cuánto cuestan **juntos**, total = **22 €**. Pero si se dispone de 20 € y se compra **solo B** (12 €), el dinero que **queda** es **8 €**: la palabra «más» describe la relación inicial, y la **operación final es restar**. No enseñar la regla automática «si veo más, sumo» o «si veo menos, resto»: primero comprender qué se busca.

**Aplicación transversal a los cinco tipos:** Antes de operar, Gloria debe distinguir los datos relevantes, la relación entre cantidades, la pregunta completa, las operaciones intermedias y el resultado final con su unidad. Conservar las fases existentes **Comprendo → Relaciono → Calculo → Compruebo** y los apoyos no punitivos. Cada familia verifica una relación distinta:

- **Doble:** identificar la cantidad de referencia y distinguir el doble de añadir dos.
- **Suma:** reconocer todas las cantidades que componen el total solicitado.
- **Reparto con resto:** reconocer total, número de grupos, cociente por grupo y sobrante.
- **Grupos iguales:** distinguir cantidad de grupos de elementos por grupo.
- **Comparación «menos/más que»:** descubrir primero el valor desconocido y **después responder la pregunta real**: sumar ambos precios cuando piden el total, o restar al presupuesto el precio del artículo comprado cuando preguntan cuánto queda. No confundir diferencia/incremento con precio final ni resultado intermedio con respuesta solicitada.

**Antecedente histórico 20/4 (PR #260), sustituido por #281 en la candidata 1.6:** cuatro problemas de comparación a lo largo de los cuatro bloques, **dos «menos que»** (`e5a` y `e5b`, ya existentes, segundo precio mediante resta y **suma final** del total) y **dos «más que»** (`e5c`: segundo precio mediante suma y **suma final** del total; `e5d`: segundo precio mediante suma y **resta final** del presupuesto restante). Exactamente **una comparación por bloque**, con ambas preguntas finales representadas. El problema escolar `g5` del Paso 2 conserva su enunciado original «menos que» intacto. No es un quinto tipo de problema ni incrementa las 20 variantes.

**Calidad pedagógica:** mantener formulaciones naturales y suficientemente diversas para evitar aprendizaje mecánico de plantillas. Adaptar la formulación a la comprensión lingüística: instrucciones breves y sin ambigüedad, una idea importante por pregunta, lectura y relectura disponibles, apoyo visual que represente relaciones sin revelar resultados, y pistas opcionales que ayuden a identificar «qué sé / qué me preguntan / qué necesito calcular primero». Animar a verbalizar su estrategia, sin obligarla a respuestas orales ni penalizar errores o apoyos. Reducir dependencia de pistas mediante elección voluntaria, **sin ocultarlas ni retirarlas forzosamente**. Priorizar comprensión y transferencia sobre volumen o velocidad.

## 3. Recorridos

### 3.1 Comprendo la historia
Cuatro microactividades sin operaciones: diferencia frente a precio completo; comparación «menos que»; «el doble»; resultado intermedio frente a respuesta final.

### 3.2 Mi ficha de Gaudem
Cinco problemas con enunciados, orden y cantidades de la hoja:
1. Isa y Diana: el doble de 159 € → 318 €.
2. Compras de Mónica: 15 + 12 + 28 → 55 €.
3. 1.445 sillas entre cuatro bodas → 361 por boda y 1 sobrante.
4. 15 cajas de 18 kg → 270 kg.
5. Mesa 246 €, nevera 100 € menos → precio nevera 146 €, gasto total 392 €.

El PDF completo no se publica y este contenido no se identifica como modelo oficial del examen.

### 3.3 Compruebo que puedo · contrato aprobado #281

La candidata cambia el Paso 3 publicado de 20/4 a **10 problemas en 2 bloques de 5**, según [Issue #281](https://github.com/jperdomo12/academia-gloria/issues/281). El orden puede variar dentro de cada bloque, sin repetir IDs hasta terminar los diez. No se fuerzan cinco familias por bloque ni cuatro variantes por familia.

| Bloque | IDs y situaciones | Cálculos verificados |
|---|---|---|
| 1 | `e1e` · Los libros de la biblioteca | 146 × 2 = 292; 146 + 292 = **438 libros** |
| 1 | `e5a` · La mesa y la lámpara | 325 − 75 = 250; total **575 €** |
| 1 | `e5c` · Los instrumentos del aula | 350 + 80 = 430; total **780 €** |
| 1 | `e3a` · Los folletos | 1177 ÷ 5 = **235; resto 2** |
| 1 | `e4c` · Los asientos del teatro | 18 × 23 = **414 asientos** |
| 2 | `e1f` · Las plantas que quedan | 128 × 2 = 256; 256 − 73 = **183 plantas** |
| 2 | `e5d` · Sara compra una maleta | 86 + 37 = 123; 200 − 123 = **77 €**; solo compra la maleta |
| 2 | `e3c` · Lápices para las aulas | 1349 ÷ 6 = **224; resto 5** |
| 2 | `e3d` · Pegatinas para los grupos | 865 ÷ 7 = **123; resto 4** |
| 2 | `e4b` · Cajas de botellas | 12 × 24 = **288 botellas** |

Los dos enunciados nuevos son exactamente los aprobados en #281. No se reutilizan los IDs `e1c/e1d`: permanecen con su contenido original entre los doce `ensayosRetirados`, fuera de la planificación activa. Los ocho ensayos conservados mantienen sus datos/textos; solo se añade `bloque`. Los veinte IDs/contenidos anteriores siguen disponibles (ocho activos, doce retirados); las sesiones se consultan desde su snapshot guardado, nunca reconstruidas con el banco actual.

**Dobles encadenados:** `preguntaFinal: total` calcula primero el doble y después reúne ambos grupos; `preguntaFinal: restante`, con `retiradas`, descuenta del grupo doble, no de la referencia. `grupoDoble` identifica la magnitud intermedia. La ausencia de esos campos conserva el doble simple original de Gaudem. Comprendo/Relaciono preceden a los cálculos; el resultado intermedio se identifica como tal y no revela la respuesta final. Diagrama de dos grupos, total o retirada sin resolver por anticipado.

**Progreso:** «Bloque 1 de 2», «Problema 3 de 5», «7 de 10 problemas completados» y barras accesibles. Solo todas las fases completan un problema. Cierre por bloque: continuar o descansar. Solo al terminar los diez se ofrece otra vuelta. La práctica libre conserva el plan durante la página abierta; recargar inicia otra vuelta. En una Misión se puede recuperar el bloque completo respaldado por evidencia (§4), sin reanudar problemas parciales ni inventar resultados.

## 4. Arquitectura y contratos · #277

Reutiliza `preparacion.js`, su banco y fases; `recorridos.js` aporta metadatos/transformación de respuestas reales, no otro motor. `ContextoUsuario`, lector, sesiones, API de Misiones y visor académico existentes; no hay nuevas colecciones ni persistencia local. El recurso sigue temporal, fuera del catálogo permanente de Temas. El catálogo de Misiones ya descubre su enlace real, sin duplicación.

### 4.1 Dos Misiones al mismo recurso

[Issue #277](https://github.com/jperdomo12/academia-gloria/issues/277), decisión adicional de dos Misiones, prevalece sobre su contrato genérico anterior. Referencia reutilizada: Sociales #278, sin modificar el recurso ni su adaptación propietaria.

| Objetivo | `recorridoId` | Sesiones y evidencia necesarias |
|---|---|---|
| Mi ficha de Gaudem | `gaudem` | Una sesión con los cinco problemas y todas sus fases |
| Compruebo que puedo | `ensayo` | Dos sesiones de cinco problemas: bloques 1 y 2 distintos de la misma vuelta `10x2-v1` |

Gestión ofrece estos dos objetivos únicamente al seleccionar Repaso académico → 6.º → Matemáticas → Me preparo para los problemas. Restaura edición y título legible; controla IDs incompatibles/retirados y conserva bloqueado el criterio iniciado. No ofrece una tercera Misión de Comprendo. El Paso 1 conserva sus cuatro actividades y puede registrar autónomamente el recorrido completo, como aprobó el contrato original #277.

`actividadId: 6-mates-preparacion-problemas`, `versionActividad: 2.0`, `versionPlan: 10x2-v1`. Criterio estándar cantidad: `modulo: libre`, `evidenciaTipo: sesion_academica`, filtros de actividad/recorrido/versión. Gaudem usa `cantidadObjetivo: 1` y `recorridoCompleto: true`. Ensayo usa `cantidadObjetivo: 2`, `bloqueCompleto: true`, `bloquesPorVuelta: 2`, `totalProblemasVuelta: 10`. Cada evidencia referencia una sesión y añade `vueltaId`, `bloqueId` y cinco problemas completados.

La API existente aplica una agregación optativa por bloques: valida identidad/criterio, mismo `vueltaId`/versión y bloque todavía no contabilizado; conserva `progreso.avancePorVuelta` en la Misión, junto a IDs de evidencia y cantidad. Primer bloque deja en curso 1/2; segundo distinto envía a revisión familiar 2/2. Repetir bloque, mezclar vueltas, usar 20/4 o completar Gaudem no satisface B. Mi Camino muestra el avance y abre el recorrido asignado con `misionId` y retorno; no ofrece cierre manual para estas Misiones y la API exige su objetivo completo.

### 4.2 Sesión real, reenvíos y recuperación

`sesion-academica-v1`, mediante `guardarSesionAcademica`. Una sesión por recorrido completo (4 microactividades, 5 Gaudem o bloque de 5 ensayos); no una escritura por clic. `respuestas` conserva una entrada por fase comprobada: enunciado/pregunta, problema/concepto, primera/final, historial de intentos, errores y pistas reales con su posición. `resumen` distingue unidades/problemas de fases, guarda snapshots de problemas y recorrido/bloque/versión/vuelta. No hay nota ni porcentaje de dominio; corregir tras apoyos no se confunde con primer intento sin pistas.

Identidad y modo se fijan al iniciar; Vista previa/consulta no escriben, una URL no concede permiso. `intentoId` estable y transacción compartida evitan duplicados por doble clic/reintento o respuesta perdida tras commit. Si la sesión se guarda pero falla la evidencia, se informan ambos estados y se reenvía el mismo intento. Para proteger la continuidad, el siguiente bloque espera la confirmación de guardado/enlace; siguen disponibles descanso y reintento.

Al abrir de nuevo una Misión B con un bloque aplicado de `10x2-v1`, se retoman su `vueltaId` y el bloque pendiente desde `avancePorVuelta`, respaldado por la evidencia existente. No se fabrica una sesión, no se registra el bloque ya realizado otra vez y los problemas incompletos se reinician. En práctica libre no se promete reanudación entre visitas. Las sesiones posteriores a una Misión cerrada o de otro recorrido se guardan como trabajo autónomo, sin atribución retrospectiva.

### 4.3 Trabajo realizado e histórico

El acceso estándar resuelve la sesión de la Misión. El mismo visor muestra cinco problemas/microactividades, sus fases, respuestas/operaciones e intentos/pistas. En B ofrece enlaces a las dos sesiones de la misma vuelta, con `misionId`, `sesionId` y retorno, sin ejecutar la actividad ni escribir. Registros anteriores permanecen con sus datos/identificadores y resultados: nunca se reinterpretan 20/4 como 10/2. Los IDs retirados no se reasignan y las versiones se filtran al cumplir Misiones nuevas.

### 4.4 Estado recuperado antes de desarrollar

Se revisaron `main` `92eb11f42f0c6e7c6d32536d1606d0d69ada2454`, tres páginas de ramas remotas, PR/commits relacionados y worktrees/diffs locales. **No se localizó código de #277 ni una PR técnica recuperable**; #277 seguía abierto y el recurso en main no guardaba sesiones. Se partió de esa base, reutilizando #278 y preservando los trabajos locales ajenos. Esta constatación no atribuye una implementación inexistente ni sobrescribe supuestos cambios.

## 5. Experiencia y accesibilidad

- Una pregunta principal por paso; selección o entrada numérica con etiquetas.
- Los bloques de cinco limitan la carga cognitiva; no convertir el Paso 3 en un único bloque de diez. Mostrar dos niveles de progreso (bloque y vuelta), **etiquetados con texto** y semántica accesible, no solo con colores. En el resumen, distinguir problemas completados de intentos/pistas y no inferir dominio.
- Reposo voluntario entre bloques y retorno/reanudación mientras la página siga abierta; no penalizar descanso, errores ni pistas.
- Pistas solicitadas por Gloria, reintento, feedback conceptual y progreso visible.
- La solución numérica aparece solo después de superar comprensión y plan.
- Audio del enunciado y la pregunta a velocidad moderada.
- Teclado, foco, regiones de estado accesibles, responsive y preferencia de movimiento reducido.
- El resultado no equivale a calificación escolar ni diagnóstico.

### Apoyos visuales

Los dos focos de mayor dificultad identificados por la familia cuentan con representaciones visibles: en **comparación aditiva**, el precio inicial, la parte desconocida y la diferencia; para **doble**, un grupo y dos grupos iguales. No se muestra por adelantado el precio desconocido. Las barras de comparación son proporcionales a las cantidades conocidas; el modelo no representa sumas ni repartos mediante barras engañosas. Se mantiene voz y opción de lectura sin los diagramas.

## 6. Fuera de alcance

No incorporar el libro íntegro, la ficha como PDF público, nuevas unidades de numeración ni otros apartados del examen (numeración, redondeo y cálculo requieren sus recursos propios), analítica, notas, pruebas oficiales ni contenido avanzado no indicado. No hay persistencia de problemas parciales entre visitas, nuevos motores, selector de tamaño 8/10 ni mezcla de problemas Gaudem en los bloques originales.

El resto de la prueba necesita los recursos de Matemáticas apropiados y contraste con material individualizado de Gloria.

## 7. Criterios de aceptación

- Cinco problemas escolares, mismo orden y mismos datos.
- Respuestas verificadas: 318, 55, 361 y resto 1, 270, 146 y total 392.
- Comprensión y planificación preceden al cálculo.
- Un resultado intermedio no sustituye la respuesta final.
- Diez originales exactos de #281 en dos bloques de cinco; cálculos 438/183 y ausencia de solución final anticipada; planificación sin repetición.
- Dos Misiones independientes; evidencia de Gaudem no cuenta para B; un bloque deja 1/2 y solo dos distintos de la misma vuelta cierran B.
- Repetición de bloque, otra vuelta o versión 20/4 no acumulan crédito incorrecto.
- Sesión completa verificable, parciales sin guardar, Vista previa sin escritura, identidad/Persona Activa y permisos conservados.
- Idempotencia y recuperación de evidencia fallida; sesión guardada y fallo de enlace se comunican separadamente.
- Ver trabajo permite consultar los cinco problemas de A o ambos bloques de B, con respuestas, intentos y ayudas reales.
- Histórico 20/4 conservado sin migración ni reinterpretación; navegación y acceso a Matezona de operaciones intactos.
- Regresión técnica, navegador/responsive/accesibilidad cuando estén disponibles; no declarar una comprobación que no pudo ejecutarse.

## 8. Estado y evidencias

**Estado publicado:** Product Owner aprobó [PR #260](https://github.com/jperdomo12/academia-gloria/pull/260), integrada en `c1e31af39f4ba7dd4408132ecdfc38202fb97494`. [Pages #869](https://github.com/jperdomo12/academia-gloria/actions/runs/44143618928) completado con éxito. Veinte problemas originales en cuatro bloques de cinco, comparación más/menos con total/restante y fecha 26/11 disponibles públicamente; los cinco Gaudem y cuatro microactividades se conservan.

**Cierre técnico:** seis archivos de producto públicos HTTP 200 e idénticos al árbol validado `b3271f38f6569fb9d80c882476669f600116dc64`. Sin desarrollo, integración o publicación técnica pendiente. Se mantiene el contrato funcional aprobado v1.3; **uso real con Gloria y voz en su dispositivo pendientes** antes de declarar estabilidad.

### 8.0 Candidata actual · 24/11/2026 · #277 + #281

Implementada en rama `feat/mates-recorridos-277-281`, base `92eb11f42f0c6e7c6d32536d1606d0d69ada2454`. **No integrada ni publicada; exige aprobación expresa del Product Owner.**

Validaciones ejecutadas: **63/63 Node** (11 de banco/fases, 8 de sesiones/API reales con SDK controlado y 44 de regresión de Sociales/Dictado/English); seis suites DOM simulado (dos nuevas de Matemáticas y las cuatro de Sociales). Comprueban independencia A/B, progreso 1/2→2/2, bloque duplicado/otra vuelta/20x4, reenvío concurrente/respuesta perdida, Vista previa, parciales e identidad; ejecución completa, pausa, recarga con bloque guardado, sesión autónoma posterior y visor de ambas evidencias. Catálogo local/Pages, objetivos/edición/consulta, retornos e histórico; hash de los veinte contenidos originales y hash de todas las fases Gaudem preservados. Sintaxis/imports/diff revisados.

**Límite real:** Chromium falla antes de abrir la página (`socket() failed: Operation not permitted`). La suite de navegador fue adaptada a 10/2, pero no está superada. Visual 320/390/768/1024/1440, foco/teclado nativos, escucha del dispositivo, autenticación/Rules desplegadas y validación familiar siguen pendientes. DOM/SDK/voz controlados no equivalen a esas pruebas. No se declara estabilidad ni se publica sin aprobación. Las secciones siguientes registran exclusivamente la entrega histórica del 17/11.


### 8.1. Implementación y trazabilidad

- Diez entradas nuevas exactamente según §3.3.2; `e5c.relacion="mas"`; `e5d` además `preguntaFinal="restante"`, `presupuesto=200`. Ausencia de campos conserva menos/total.
- `fases(p)` adapta las dos operaciones, preguntas, pistas y explicaciones; no confunde los 123 € de maleta con los 77 € restantes. `representarRelacion(p)` añade incremento proporcional y presupuesto sin resultados anticipados; conserva el esquema menos y el doble, ahora con unidad real.
- `crearPlanEnsayo` mezcla una vez cuatro variantes por familia y reparte cuatro bloques; estado `vuelta`/`puntoEnsayo` exclusivamente en memoria. `Set` cuenta IDs solo al acertar la última fase, evita duplicados y conserva el punto al descansar/visitar otro recorrido. Solo el cierre de la vuelta ofrece regenerarla.
- Progreso textual y dos barras accesibles: bloque/problema y total de vuelta. Pausa voluntaria explica el límite de página abierta. Cierres de bloque permiten continuar o descansar.
- Fecha 26/11 corregida en cabecera, JSON y accesos de Matemáticas/Entender antes de calcular. Numeración confirmada hasta 99.999; su recurso no se modifica.
- Se reutilizan Motor, lector, auth, Persona Activa y navegación. Sin nuevas persistencias, colecciones, Temas, evidencias ni dependencias del producto.

### 8.2. Validación técnica y visual ejecutada · 17/11/2026

- `node --test tests/mates-preparacion-problemas.test.mjs`: **9/9**. Contrato 4+5+20; huella del contenido histórico íntegro; huella de todas las preguntas/pistas/explicaciones/fases de los cinco Gaudem idéntica a `main`; 25 claves numéricas independientes; casos 10±2, total/restante; libros sin euros; contratos inválidos; 200 vueltas equilibradas sin repetición y con orden variable.
- `tests/mates-preparacion-problemas-browser.cjs`, Chromium real con SDK/identidades y salida de voz controlados: cuatro microactividades, cinco Gaudem, **dos vueltas completas de veinte**; equilibrio/unicidad por bloque, progreso antes/después de cada fase, error/pista sin incremento, reanudación incluso tras otro recorrido y fase ya acertada, descanso entre bloques, fin/reinicio/recarga.
- Las cuatro comparaciones verificadas en UI: e5a/e5b menos, e5c más/total, e5d más/restante. En e5d se rechazan 123 (precio intermedio), 37 (diferencia) y −9 (descontar ambas compras, entrada inválida); solo 77 resuelve la pregunta final. No se muestran los resultados desconocidos en los diagramas iniciales.
- Revisión visual real de diagramas/composición y ausencia de overflow en **320/390/768/1024/1280/1440 px**, con Outfit. Conserva jerarquía, relato, preguntas, radios y controles; comparación más amplía la barra de referencia mediante un tramo de incremento, menos conserva su representación y doble de libros usa dos grupos iguales con unidad correcta. Frente al recurso previo se añaden progreso y descanso sin sustituir los apoyos pedagógicos.
- Teclado, foco tras acierto/retorno, labels del formulario, `role=status`, barras etiquetadas y `prefers-reduced-motion`; audio recibe enunciado/pregunta reales. Consulta relacionada abre el mismo recurso; cero escrituras educativas y Storage sin cambios durante los recorridos.
- Sintaxis JS y `git diff --check` correctos. Pruebas reproducibles con servidor local y `BASE_URL`, Chromium mediante `CHROMIUM_EXECUTABLE`; `QA_FONT_CSS`/`QA_IMAGES` son opciones de QA, no dependencias del producto.

**Límites reales:** autenticación/Firestore controlados, no cuentas de producción ni emulador de Rules; salida de voz controlada, no escucha humana ni proveedor del dispositivo familiar; no auditoría con lector de pantalla humano. Navegador probado es Chromium, no dispositivo físico ni Safari. Antes de estabilidad se requiere uso real con Gloria, incluida comprensión, ritmo de trabajo, ayudas y audio. Publicación y verificación pública completadas tras aprobación de PR #260; la prueba familiar y auditiva del dispositivo permanece pendiente.

### 8.3. Verificación pública posterior a la aprobación

El 17/11/2026, tras Pages #869, se compararon byte a byte contra el árbol probado:

- `cursos/6to/mates/index.html` y `cursos/6to/mates/piloto-problemas.html`.
- `cursos/6to/mates/preparacion-problemas/index.html`, `preparacion.css`, `preparacion.js` y `problemas.json`.

Los seis devuelven HTTP 200 y contenido idéntico. La revisión final confirmó que el head aprobado `eee8727ac9a4bfcc83a44b74cfdfb7205c98fc18` y el merge de #260 tienen el mismo árbol. Se conservan las pruebas de §8.2 sin atribuirles autenticación o escucha de producción.
