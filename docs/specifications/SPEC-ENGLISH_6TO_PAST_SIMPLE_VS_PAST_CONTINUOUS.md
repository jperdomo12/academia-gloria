# English 6.º · Past Simple vs Past Continuous
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| Ruta oficial | `docs/specifications/SPEC-ENGLISH_6TO_PAST_SIMPLE_VS_PAST_CONTINUOUS.md` |
| Versión | 1.1 |
| Estado | **Implementado y validado en rama · PR técnica pendiente de aprobación · no integrado ni publicado** |
| Última actualización | 22/11/2026 |
| Propietario | Experiencia curricular · English 6.º |
| Responsables | Product Owner + AI Collaborator |
| Ámbito | Un Tema permanente de 6.º basado en cinco documentos de Gaudem |

## Documentos relacionados

- `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` — incorporación curricular, trazabilidad y no empobrecimiento de material.
- `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md` — calidad pedagógica, visual y técnica.
- `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` — desarrollo, revisión, PR, publicación.
- `docs/ai/AI_CHAT_BOOTSTRAP.md` y `docs/ai/AI_COLLABORATION_GUIDE.md` — colaboración y continuidad.
- `cursos/6to/english/temas-english.js` — catálogo canónico.
- `cursos/6to/english/present-simple-vs-present-continuous/` — Tema actual para reutilización/regresión, no plantilla rígida.
- `docs/specifications/SPEC-ENGLISH_6TO_PREPARACION_PRUEBAS_NOV2026.md` — preparación temporal anterior, independiente.
- `docs/specifications/SPEC-PLAN_SEMANAL_ENGLISH_IRREGULAR_VERBS_RAP.md` — apoyo complementario para irregulares, no dependencia.

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---|---|---|
| 1.1 | 22/11/2026 | Product Owner + AI Collaborator | Candidata del contrato funcional v1.0: Tema único, cuatro escenas temporales, doce fichas, 44 prácticas en siete formatos y dos relatos originales, Prueba de 12 preguntas/48 variantes. Reutiliza Motor verbal con respuesta escrita opcional, sesión/evidencia, catálogo y refuerzos. Cotejo visual de los cinco PDF (18 páginas), navegador/gramática/integraciones y regresiones registrados en §9. Pendiente aprobación técnica antes de integrar/publicar y prueba familiar antes de estabilidad. |
| 1.0 | 22/11/2026 | Product Owner + AI Collaborator | Se aprueba un Tema único permanente de Past Simple vs Past Continuous con fuente de cinco PDF, 18 páginas, 112 ejercicios numerados, matriz de cobertura, corrección razonada de errores, experiencia visual, gramática, práctica diversa, Reading, Prueba y evidencia compartida. **Condición:** mantener o mejorar la calidad actual. **Solo documentación; código no implementado.** |

## 🧭 Resumen de contenido

| Sección | Contenido |
|---|---|
| 1 | Decisión, ubicación y propósito |
| 2 | Cinco fuentes Gaudem y matriz fuente → Academia |
| 3 | Aclaraciones y ambigüedades escolares |
| 4 | Contenidos y enfoque pedagógico |
| 5 | Experiencias del Tema |
| 6 | Integración técnica y restricciones |
| 7 | Quality Gate y aceptación |
| 8 | Estado y siguiente paso |
| 9 | Implementación, cotejo visual de fuentes, pruebas y límites reales |

## 1. Decisión, ubicación y propósito

**DECISIÓN:** crear un **solo Tema canónico** en `6.º de Primaria → English → Past Simple vs Past Continuous`, ubicado en `cursos/6to/english/past-simple-vs-past-continuous/` e incorporado al catálogo/portal real. No generar cuatro Temas de actividades, no duplicar `Present Simple vs Present Continuous` ni usar el recurso temporal de English de noviembre como contenedor permanente.

**Finalidad:** comprender *qué ocurrió* y *qué estaba ocurriendo* antes de elegir *Past Simple* o *Past Continuous*, y después construir estructuras, revisar errores y comprender relatos. Estrategia: **Leo/escucho → comprendo la situación → relaciono acciones y tiempo → formo la frase → compruebo**.

Las nuevas fichas se recibieron el **22/11/2026**. **No hay evidencia de que correspondan al examen de Listening/Writing del 23/11**, ni deben presentarse como modelo oficial de examen. El Tema está implementado en la rama candidata; todavía no integrado en `main` ni publicado.

## 2. Matriz fuente → Academia · cinco archivos

**Inventario total:** documento principal (6 páginas) + cuatro fichas (2, 3, 3 y 4 páginas) = **18 páginas**. Las cuatro fichas incluyen **112 ejercicios numerados** (29 + 31 + 22 + 30) y una actividad extra abierta. Algunos ejercicios tienen dos huecos o dos transformaciones: **112 no equivale al número de respuestas**.

| Archivo Gaudem | Contenido y volumen verificable | Competencia que debe conservarse/mejorarse |
|---|---|---|
| `6_IB_Past Simple vs Past Continuous.pdf` (6 p.) | p1: *was/were*; p2: *had*; p3: reglas *-ed* e irregulares; p4: *did/didn't*, estructuras y expresiones de tiempo; p5: *was/were + -ing*; p6: mezcla con *when* | Teoría comparativa, tablas por sujeto, ejemplos comprensibles, reglas de formación y comparación temporal |
| `6_ACT_Past Simple 1.pdf` (2 p.) | 10 verbos al pasado, 7 completar, 6 convertir a negativa, 6 selección = **29** | Regular/irregular, *didn't + infinitivo sin to*, *was/were*, preguntas y elección por contexto |
| `6_ACT_Past Continuous 2.pdf` (3 p.) | 10 huecos, 15 frases desde pistas, 6 frases convertidas a interrogativa **y** negativa = **31** | *Was/were + -ing*, oraciones completas, cambio de forma y concordancia de sujeto |
| `6_ACT_Past Continuous 3.pdf` (3 p.) | 7 huecos en continuous, 7 frases de dos verbos (14 huecos), 8 elecciones = **22** | Diferenciar acción en progreso de acción puntual; reconocer también dos acciones terminadas/sucesivas |
| `6_ACT_Past Simple VS Past Continuous.pdf` (4 p.) | 8 frases con dos tiempos, 12 elecciones en diálogo, 5 V/F con relato, 5 correcciones = **30**, más una actividad extra de identificación por colores | Elegir tiempos según contexto, lectura, verdadero/falso, diálogo con mezcla de presentes y pasados, revisar errores y reconocer formas |

**Los siete formatos cognitivos obligatorios para la propuesta:** conjugar; completar huecos; transformar a negativa/interrogativa; construir una oración desde palabras; elegir por contexto; leer y responder con evidencia; encontrar y corregir errores. Añadir identificación visual de verbos como actividad opcional accesible. **No reducir todo a opción múltiple**.

**Procedencia y derechos:** los cinco PDF escolares fueron aportados por la familia y revisados en este chat; **no están en el repositorio**. No subir escaneos, imágenes, textos escolares completos ni anotaciones personales a la web. En Academia, crear nuevos ejemplos, lecturas y actividades equivalentes. Si DESA no puede inspeccionar los originales, usar esta matriz y no atribuirse una comparación visual directa que no haya realizado.

### 2.1. Comparación de utilidad visual

| Soporte escolar | Equivalencia que debe ofrecer Academia |
|---|---|
| Tablas de *was/were*, *had*, afirmativa/negativa/interrogativa | Tablas legibles y accesibles por sujeto, estructura y ejemplo, con lectura opcional |
| Tabla de sufijos *-ed*, consonante + *y*, vocal + *y*, consonante duplicada | Fichas contrastadas con ejemplos y explicación de reglas ortográficas sin simplificaciones engañosas |
| Oraciones que combinan tiempos | Línea temporal que muestre **acción en curso** frente a **hecho/evento**, incluyendo sucesión o simultaneidad |
| Fichas de huecos/conversión de frases | Completar, construir, transformar, reintentar y explicar el porqué |
| Diálogo y texto narrativo | Textos propios con preguntas inequívocas y relectura/audio |
| Subrayado por tres colores (extra) | Identificación opcional de Past Simple, Past Continuous y negativas mediante etiquetas/patrones, nunca exclusivamente color |

## 3. Errores y ambigüedades escolares detectados

**Respetar la fuente no significa enseñar formulaciones erróneas.** Mantener trazabilidad y no afirmar que estas correcciones fueron aprobadas por Gaudem.

1. Documento principal **p.2**: sugiere respuesta corta con `had/hadn't` a pregunta con `Did ... have ...?`. Para material original de Academia: `Did you have a pencil? Yes, I did. / No, I didn't.`; `I had a pencil` sigue siendo afirmativa válida.
2. Principal **p.4**: el esquema `Subject + didn't verb` omite el signo de enlace; mostrar `Subject + didn't + base verb` y `Did + subject + base verb?`, nunca `didn't went`.
3. `6_ACT_Past Continuous 2.pdf`, actividad 2: aparece instrucción **Present Continuous** en una ficha titulada Past Continuous con expresiones pasadas. Marcarlo como inconsistencia de instrucción, no reproducirla.
4. `6_ACT_Past Simple VS Past Continuous.pdf`, diálogo pp.1–2: hay **formas de presente legítimas** por el contexto (`at the moment`, `tonight`). No forzar todo al pasado solo por el título.
5. Principal pp.5–6: `when` y `while` son pistas útiles en los modelos escolares, **no equivalencias absolutas** con tiempos verbales. Resolver por significado de la cláusula, acción continua/puntual o secuencial, no por palabra clave.
6. El principal alude a una **lista de irregulares que no se adjunta** con estos cinco PDF. Usar ejemplos presentes y contenido complementario explícitamente identificado; el recurso existente *Irregular Verbs RAP* no se convierte automáticamente en lista de evaluación.
7. `6_ACT_Past Simple VS Past Continuous.pdf`, lectura pp.2–3: algunas referencias relativas y detalles narrativos admiten ambigüedad; los nuevos Reading deben usar cronología inequívoca y respuestas que puedan justificarse en el texto.

## 4. Contenido pedagógico y secuencia

**Núcleo A — Past Simple:** acciones finalizadas; expresiones de tiempo escolares; *was/were*, *had*; regulares en *-ed* e irregulares (incluyendo *go/went*, *buy/bought*, *eat/ate*, *do/did*, *take/took*, *write/wrote* presentes en fuente/fichas); afirmativas, negación con `didn't + base`, preguntas con *did* y respuestas cortas. Evitar reglas ortográficas absolutas falsas.

**Núcleo B — Past Continuous:** acción en progreso en el pasado; `was/were + verb-ing`, afirmativa/negativa/interrogativa y respuestas cortas; sujetos singulares/plurales y reglas razonadas de `-ing`.

**Núcleo C — Contraste temporal:** diferenciar hecho puntual y acción en desarrollo, acciones simultáneas y acciones sucesivas que pueden ser ambas Past Simple; alternar orden de cláusulas con *when/while* sin cambiar el razonamiento.

**Núcleo D — Reading y corrección:** comprender orden de sucesos, quién hace qué, indicios temporales; verdadero/falso y explicación; identificar y reparar errores gramaticales y de selección de tiempo.

**Accesibilidad lingüística:** una idea importante por consigna; brevedad, segmentación, ejemplos contrastados, posibilidad de relectura, voz inglesa opcional, explicación breve en español cuando ayude, pistas voluntarias por etapas y reintentos sin penalizar. **No inferir diagnósticos ni asumir que las fichas están individualizadas para Gloria**; mantener apoyos aptos para la alumna y el curso. No premiar rapidez ni usar cronómetros.

## 5. Experiencia del Tema

**Un único recorrido `Resumen → Compara → Fichas → Práctica → Prueba`**, coherente con el Tema actual de Present Simple/Continuous, pero con representaciones y actividades apropiadas a este contenido.

### 5.1. Resumen

Diferencia conceptual breve: **Past Simple = finished past action**; **Past Continuous = action in progress at a past moment**. Mostrar un par de frases originales y su interpretación, no una pantalla saturada de reglas.

### 5.2. Compara · visualización temporal

Eje interactivo/textual: **tramo** para acción que estaba ocurriendo, **marca** para acción/evento puntual. Ejemplo original: `I was reading when the doorbell rang`. Invertir orden de cláusulas; incluir acciones sucesivas y simultáneas. Acompañar cada diagrama de texto descriptivo y opción `Escuchar`; no revelar automáticamente respuestas de actividades posteriores ni depender de animación o color.

### 5.3. Fichas

Secciones breves de *was/were*, *had*, *did/didn't*, regulares/irregulares, formación *-ed* e *-ing*, *when/while*, expresiones de tiempo y errores frecuentes. Reusar fichas interactivas existentes con ejemplos distintos de los problemas evaluados. Link opcional a **Irregular Verbs RAP**, sin condicionar el Tema al funcionamiento de RAP Studio.

### 5.4. Práctica variada y Reading

**Objetivo inicial de diseño para DESA**: al menos **40 situaciones originales formativas**, con cobertura equilibrada (aprox. 8 por foco) de (i) formas verbales; (ii) estructuras Past Simple; (iii) estructuras Past Continuous; (iv) elegir los dos tiempos en contexto; (v) Reading y detección/corrección. Esta orientación **no reemplaza la obligación de cubrir todos los formatos de §2**, ni exige reproducir exactamente 112 frases; ampliar contenidos originales si algún formato queda pobre.

Combinar selección, completar respuesta corta, transformar, ordenar/construir, localizar error y corregir, clasificación gramatical y **al menos dos textos/diálogos originales cortos** con preguntas de comprensión justificada. Permitir revisión sin penalización y normalizar mayúsculas/espacios/apóstrofos, **sin aceptar tiempos auxiliares o formas verbales incorrectas**. Explicar errores como `didn't went`, `was play`, `were he`; no responder solo «incorrecto».

### 5.5. Prueba integrada y evidencia

Diseño orientativo: **12 preguntas por ejecución, en cuatro dominios con tres preguntas cada uno** (Past Simple, Past Continuous, contraste, Reading/corrección), con **cuatro variantes mínimas por familia** para reintentos variados. Las preguntas deben presentar clave unívoca, explicación y contraste de interpretación.

**Reusar los contratos académicos** de `Present Simple vs Present Continuous` y `compartido/js/sesiones-academicas.js`, sin duplicar motor ni almacenamiento. La evidencia de Prueba debe servir a Trabajo realizado, Análisis Educativo, refuerzos y Misiones según contratos vigentes. Vista previa familiar/profesional no escribe sesiones; solo modo aprendizaje permitido por identidad/autorización.

## 6. Arquitectura y límites

- Ubicación única propuesta: `cursos/6to/english/past-simple-vs-past-continuous/`, registrada una vez en `temas-english.js`.
- Aprovechar presentación, navegación, login, ContextoUsuario, voz y registro de sesiones del Tema actual. Cambiar componentes compartidos **solo si es necesario y con regresiones**.
- No crear nuevo motor de examen ni escrituras Firestore/colecciones privadas por Tema. Respetar `volver`, uso por alumno y vista previa. Los parámetros de URL no conceden permisos.
- No modificar ni empobrecer los Temas de Present Simple/Continuous, Much/Many, RAP ni el recurso temporal English 17/11.
- No subir los PDF escolares ni copiar sus fichas, preguntas y relatos íntegros a un repositorio público. Mantener en código **situaciones originales** y en docs esta matriz propietaria.
- No atribuir este material a un examen fechado, no presentarlo como prueba oficial ni concluir cobertura de una lista de irregulares ausente.

## 7. Quality Gate · calidad igual o superior

**El criterio prioritario aprobado por el Product Owner es mantener o superar la calidad existente**. No basta con que la página funcione o las preguntas tengan clave.

1. **Cobertura fuente:** matriz §2 verificada por cinco documentos, 18 páginas, 112 ejercicios numerados y extra; todas las habilidades, estructuras, Reading, transformaciones y corrección están representadas en la experiencia. No convertir fichas complejas en una sola selección.
2. **Gramática:** revisar todas las afirmativas, negativas, interrogativas, respuestas cortas, regulares/irregulares, *-ed/-ing*, Past Simple/Continuous, *when/while*, y corregir las inconsistencias de §3.
3. **Transferencia:** los retos deben requerir interpretar **acción, tiempo y pregunta**, no asociar `when = Simple` ni `while = Continuous` ciegamente. Incluir dos acciones terminadas cuando proceda.
4. **Fuente visual → Academia:** comparar la función educativa de tablas, ejemplos, esquemas y lectura; el resultado debe ser al menos igual de claro, con mejora por interacción, ayudas o audio. Si DESA carece del original, registrar el límite del cotejo visual, no inventar validación.
5. **Banco:** IDs únicos, distribución por dominios, claves unívocas, variedad de variantes, corrección de respuestas escritas (incluyendo formas contraídas válidas), pistas y explicaciones revisadas; dos Reading originales con preguntas no ambiguas.
6. **UX:** una decisión por paso, reintento sin castigo, ayudas voluntarias y graduadas, sin cronómetro; inglés correcto con apoyo lingüístico opcional. Evitar infantilización.
7. **Accesibilidad:** 320/390/768/1280/1440 px, teclado/foco, zoom, contraste, etiquetas además del color, lectores de pantalla, `prefers-reduced-motion`; línea temporal y clasificación accesibles sin arrastrar.
8. **Audio:** voz compartida con parada/cambio de sección; distinguir tests simulados de escucha humana y dispositivo de Gloria. No declarar voz validada físicamente antes de prueba real.
9. **Prueba y evidencia:** revisar motor existente, ejecución y registro; permisos y roles, cero escrituras en Vista previa, navegación, Misiones, Histórico/Trabajo realizado y Análisis; sin regresión de Temas anteriores.
10. **Validación:** pruebas automáticas (bank, reglas, variantes, claves), navegador real (todas las mecánicas, pistas, error, reintento, respuesta, acceso y responsive), revisión visual y documental. No declarar **estable** antes de uso familiar con Gloria.
11. **Workflow:** ACADEMIA-DESA implementa desde `main` en rama, prepara PR con pruebas y limitaciones; no afirmar implementación/publicación antes de verificarlas. Actualizar SPEC y HandOff con estado real al cerrar.

## 8. Estado y siguiente paso

**HECHO:** cinco originales adjuntos disponibles y contrastados por Desarrollo, 18 páginas y 112 ejercicios numerados + extra. Candidata completa en [PR #263](https://github.com/jperdomo12/academia-gloria/pull/263), rama `feat/english-past-tenses`, desde `main` `f32243ec1caaef4f3e96c247d3aea57ede53c311` (PR documental #262 integrada).

**DECISIÓN (22/11/2026):** contrato funcional aprobado v1.0 conservado. No se amplía a otro Tema, preparación temporal ni examen fechado.

**IMPLEMENTADO EN RAMA:** Resumen → Compara → Fichas → Práctica → Prueba; catálogo canónico y registro para refuerzos. Sesión/evidencia y consumidores existentes reutilizados. Véase §9.

**SIGUIENTE PASO:** revisión/aprobación del Product Owner de la PR técnica; solo después revisión final, integración, Pages y verificación pública. **No integrar ni publicar sin esa aprobación.** Uso familiar con Gloria, audio en dispositivo y estabilidad de producto pendientes.

## 9. Evidencia de implementación y validación · candidata 22/11/2026

### 9.1. Cobertura y reutilización

| Habilidad de la matriz §2 | Implementación verificable |
|---|---|
| Regulares/irregulares y formación ortográfica | Fichas `ed/y/cvc/irregular/ing`; ocho `p-form-*` y familia `simple-word-forms`. Ejemplos no se anuncian como lista oficial de examen. |
| Was/were, had, did/didn’t, afirmativa/negativa/pregunta/respuestas cortas | Tabla semántica por sujeto; fichas `be/have/simple/continuous`; `p-simple-*`, `p-cont-*`; seis familias de prueba de forma/estructura. `Did … have? → Yes, … did`, sin negativa `didn't went`. |
| Construir desde pistas y transformar frases completas | `p-simple-3/4/6/8`, `p-cont-3/4/5/6`; respuestas escritas reales y equivalencias de contracción. No se sustituyen por selección. |
| Dos huecos, selección por significado, simultaneidad y sucesión | `p-mix-*`; cuatro escenas con tramo/marca y orden de cláusulas reversible; familias `contrast-event/sequence/meaning`. Contextos aclaran qué ya estaba ocurriendo para no imponer una clave discutible. |
| Relato/diálogo, V/F y evidencia textual | `The garden notebook` y `A radio story`, originales, conservados una sola vez en `LECTURAS`. Ocho preguntas `p-read-*` y dos familias de prueba reconstruyen su contexto desde `lecturaId`. El diálogo distingue pasado de presente actual legítimo. |
| Localizar/corregir errores y reconocer formas en el texto | Cuatro `p-fix-*`, familia `error-repair`, extra opcional con cuatro selectores y subrayados/patrones sobre el mismo relato, con etiquetas además del color. |

Banco: **44 prácticas** (8 formas, 8 Simple, 8 Continuous, 8 contraste, 12 Reading/revisión). **12 familias × 4 variantes = 48**; cada prueba elige una por familia: **12 preguntas, tres por dominio**. El historial compartido evita variantes de las últimas tres sesiones cuando hay alternativas. La práctica puede filtrarse por foco, releerse, escuchar, volver atrás y usar dos pistas; no exige recorrer 44 ejercicios antes de la Prueba.

`past.js` configura `motor-practica-verbal.js` y presenta escenas/fichas/identificación; no implementa otro motor de examen. La extensión compartida es aditiva: `formato:"texto"`, `respuestasValidas`, `contextoLectura`, `situacion`, `pistas` y filtro opcional. Sin esos campos se mantiene selección y configuración anterior. Normaliza mayúsculas, espacios, apóstrofos, puntuación final y contracciones `didn't/wasn't/weren't`; no borra palabras, auxiliares ni acepta un tiempo distinto. Respuesta, clave legible, corrección y concepto se guardan mediante `sesion-academica-v1`.

Catálogo `temas-english.js` y `refuerzos-academicos.js` consumen la identidad/bloques del Tema. No se cambian API, Rules, rutas históricas, colecciones, permisos ni motores temporales. Práctica y Vista previa no guardan evidencia. El parámetro `modo` no otorga acceso sobre otro alumno. La celebración usa su opción existente sin imágenes de guacamayas para evitar depender del asset rojo ausente ya observado en otras actividades.

### 9.2. Comparación visual real · PDF → Academia → referencia publicada

Se extrajo el texto y **se renderizaron e inspeccionaron las 18 páginas de los cinco adjuntos** (22/11). No se añadieron PDF ni imágenes escolares al repositorio.

| Función visual escolar | Academia y juicio del cotejo |
|---|---|
| Principal pp.1–2/4–5: tablas por sujeto, formas y auxiliares | Tabla HTML con caption/headers y fichas desplegables de altura natural, ejemplos y audio. En móvil la tabla se reorganiza por sujeto con etiquetas; conserva todas las formas y evita columnas comprimidas. Igual función con lectura progresiva. |
| Principal p.3: reglas ed/y/CVC y ejemplos | Fichas contrastadas, con regla de acento y excepciones explícitas de w/x/y; regulares e irregulares separados. Equivalente en cobertura, mejora por consulta segmentada y práctica escrita. |
| Principal p.6: tramo y hecho en línea temporal | Cuatro escenas originales, símbolos distintos de proceso/hecho, descripción textual, inversión de cláusulas y audio. Conserva relación espacial; amplía a simultaneidad, sucesión y when con proceso, sin regla automática. |
| Cuatro ACT: huecos, construcción y doble transformación | Entrada escrita en lugar de una conversión general a tarjetas/opciones; foco elegido, modelo de ayuda, corrección conceptual y reintentos. Se mantiene la producción activa. |
| ACT mixta pp.1–4: diálogo, lectura, V/F, reparación y colores | Dos textos propios de cronología inequívoca, visibles al responder; V/F con evidencia, corrección escrita y clasificación sobre el relato con patrones/etiquetas. Mejora legibilidad y accesibilidad sin copiar relatos ni escaneos. |

Se inspeccionó también la referencia **Present Simple vs Present Continuous** real en navegador (Resumen, Compara, Fichas). Se reutilizan su tipografía Outfit, paleta, cabecera, secciones y apoyos; las representaciones nuevas responden al contenido pasado. Revisión visual final de las cinco secciones en **320/390/768/1280/1440 px**, tabla móvil, escenas, fichas abiertas y relato con identificación: sin cortes ni desbordamiento. Zoom de texto **200 % a 320 px** comprobado en las cinco secciones tras corregir el mínimo de ancho de cabecera. No se equipara esto a una certificación de lector de pantalla humano.

### 9.3. Pruebas ejecutadas

- `node --test tests/english-past-tenses.test.mjs`: **6/6**. IDs/banco/focos, 12×4, siete formatos, claves/hints/contextos, claves escritas independientes, contracciones válidas y rechazo de formas erróneas, cuatro relaciones temporales y contrato compartido. Revisión individual de respuestas, pistas y explicaciones; no generador gramatical por palabra clave.
- `tests/english-past-tenses-browser.cjs`: **superado** con Chromium real, SDK/identidades y salida de voz controlados. Las **44 prácticas**, respuesta escrita y selección, mayúsculas/espacios/contracciones, error/reintento/ayudas graduadas, entrada por Enter, cuatro escenas/inversión, doce fichas y audio en-GB; **cuatro pruebas completas cubren las 48 variantes sin repetir**. Puntuación verificada (11/12 → 92 %, 12/12 → 100 %) y mapa de cuatro dominios.
- Sesiones/variantes guardadas, respuesta escrita legible en Trabajo realizado, Misión y evidencia única, estado pendiente de validación, catálogo de Gestión, refuerzos y Análisis Educativo. Consulta/familiar siguen en Vista previa aunque URL solicite aprendizaje y terminan sin escrituras; identidad sin relación válida no conserva a Gloria como Persona Activa. Práctica sin escrituras; cinco anchos, foco, teclado, reduced motion y zoom. Consola del Tema sin errores en la ejecución satisfactoria.
- Regresión `tests/quantifiers-browser.cjs`: **superada**, incluyendo 22 prácticas, Prueba, sesiones, variantes, evidencia/Misión, histórico, Vista previa, catálogo y Análisis. Se actualiza solo el número esperado de Temas del portal English (dos → tres).
- Regresión `tests/verbos-browser.cjs`: **superada**, tres Temas separados y motor legacy. Se corrigió la espera de QA de refuerzos para comprobar los tres títulos en una instantánea lista: el refresco de la lista podía vaciarla entre aserciones. El baseline `f32243e` también fue ejecutado. No se modifica contenido ni lógica de Verbos.
- Regresión `tests/potencias-browser.cjs`: **superada** (actividad escolar, equivalencias, práctica, sesión, Misión, evidencia, resultado y responsive). Sintaxis JS y `git diff --check` correctos.

**Observación previa al cambio:** las regresiones de actividades existentes registran un 404 de `assets/identidad/guacamayas/guacamaya-roja-posada-01.png` usado por celebración; también observado en `main`. Conserva su fallback y no se altera esa imagen ni se amplía el alcance a otros Temas. El nuevo Tema utiliza la opción oficial `mostrarGuacamayas:false`.

**Límites reales:** no cuentas, Firestore/Rules desplegadas ni datos de producción; SDK controlado. Audio validado como integración/texto/idioma/parada mediante voz controlada, **sin escucha humana ni dispositivo de Gloria**. Navegador Chromium, sin Safari ni pantalla física; lector de pantalla no certificado. Prueba familiar pendiente para utilidad, comprensión y autonomía. No se declara estable. **PR pendiente de aprobación; sin integración, Pages ni verificación pública de esta candidata.**
