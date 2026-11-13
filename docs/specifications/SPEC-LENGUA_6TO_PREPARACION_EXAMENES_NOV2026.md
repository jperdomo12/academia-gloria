# ✍️ Lengua 6.º · Me preparo para Lengua · Exámenes noviembre 2026
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial propuesta** | `docs/specifications/SPEC-LENGUA_6TO_PREPARACION_EXAMENES_NOV2026.md` |
| **Versión** | 1.1 |
| **Estado** | Implementado en rama · pendiente de aprobación del diff y publicación |
| **Fecha** | 13/11/2026 |
| **Propietario** | Contenido curricular de Lengua · 6.º |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Recurso temporal de preparación para las dos evaluaciones de Lengua de noviembre 2026, mediante reutilización de recursos de 5.º y 6.º |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna:** fidelidad al colegio, apoyos de comprensión y reutilización curricular; no confundir refuerzo temporal con Tema permanente. |
| `docs/specifications/SPEC-LENGUA_6TO_VERBOS.md` | **Complementa:** tres Temas de Verbos 6.º ya aprobados y publicados, sin duplicarlos. |
| `docs/specifications/SPEC-ENGLISH_6TO_PREPARACION_PRUEBAS_NOV2026.md` | **Referencia de producto:** patrón de preparación temporal visible desde portal de materia. |
| `docs/specifications/SPEC-MATEMATICAS_6TO_PREPARACION_PROBLEMAS_NOV2026.md` | **Referencia metodológica:** comprensión antes de respuesta, pistas y práctica formativa sin calificación escolar. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** estado, trazabilidad, aprobación y actualización documental. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Gobierna:** desarrollo posterior, PR, validación y publicación. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 13/11/2026 | Product Owner + AI Collaborator | Implementación candidata de ambos recorridos con actividad formativa de formas no personales y reutilización de nueve destinos. No integrada ni publicada. |
| 1.0 | 13/11/2026 | Product Owner + AI Collaborator | El Product Owner aprueba continuar con la preparación de los exámenes de 16/11 y 18/11 y la incorporación funcional de la ficha escolar «Plan semanal Lengua · Adaptación significativa · Formas no personales». Se documenta cobertura trazable de cuatro actividades, reutilización del Tema de Verbos, fidelidad escolar y límites de publicación. Aprobado como especificación; el recurso aún no está implementado. |
| 1.0-rc1 | 13/11/2026 | Product Owner + AI Collaborator | Primera especificación funcional candidata. El Product Owner acepta la dirección «Me preparo para Lengua», con dos evaluaciones próximas y reutilización de contenidos existentes. Se concreta un alcance mínimo para revisión antes de desarrollo. No está implementado. |

## 🧭 Resumen de contenido

| Punto | Contenido |
|---|---|
| 1. Propósito y estado | Qué necesidad satisface y qué está aprobado frente a lo pendiente. |
| 2. Fuentes y cobertura | Temario comunicado y recursos reales verificados de Academia. |
| 3. Ubicación y navegación | Entrada desde Lengua 6.º y enlaces al resto de Academia. |
| 4. Experiencia común | Elección de examen y secuencia de apoyo al aprendizaje. |
| 5. Expresión escrita · 16/11 | Planificación, producción en papel y revisión sin corrección automática. |
| 6. Comprensión y gramática · 18/11 | Lectura, sustantivos y adjetivos; actividad escolar de formas no personales del verbo, sin duplicar los Temas. |
| 7. Integración y límites | Reutilización, accesos, persistencia y comportamiento fuera de alcance. |
| 8. Criterios de aceptación | Comprobaciones funcionales, pedagógicas y técnicas para DESA. |
| 9. Riesgos y validación | Información escolar no confirmada y pruebas familiares. |
| 10. Decisión y siguiente paso | Frontera análisis/documentación/desarrollo. |

## 1. Propósito y estado

Ayudar a Gloria a preparar desde **un único lugar** las dos evaluaciones de Lengua comunicadas en el trabajo familiar:

- **Lunes 16/11/2026:** expresión escrita; redactar un texto de un tipo trabajado en este curso o en el anterior.
- **Miércoles 18/11/2026:** comprensión lectora y gramática, con sustantivos, adjetivos y verbos.

Estas fechas y descripciones proceden de la planificación familiar abordada en análisis; **no hay aquí una hoja escolar aportada que confirme los tipos concretos de redacción, la extensión exigida, las preguntas ni el formato de evaluación**. No presentar recursos de Academia como simulacros oficiales.

**Hecho implementado:** existen portal Lengua 6.º, tres Temas de verbos publicados, recursos de 5.º y el patrón de preparación de English/Matemáticas.

**Decisión de dirección funcional:** ofrecer «Me preparo para Lengua» como recurso específico de estos exámenes, enlazando lo que ya existe.

**Implementado en rama:** acceso, recorridos y práctica complementaria; ver §11.

## 2. Fuentes y cobertura verificadas en `main`

| Tema del examen | Recurso existente | Tratamiento |
|---|---|---|
| Expresión escrita: texto comparativo | `cursos/5to/lengua/texto_comparativo.html` | Reutilizar enlace; tiene estructura, conectores, constructor y revisión. No asumir que será el tipo exigido. |
| Expresión escrita: diálogo | `cursos/5to/lengua/dialogo.html` | Reutilizar enlace; estilo directo/indirecto y escritura de diálogo. No asumir que será el tipo exigido. |
| Apoyo para oraciones | `cursos/5to/lengua/tipos_oraciones.html` | Enlace complementario, no temario confirmado. |
| Comprensión lectora | `cursos/5to/lengua/youtube_comprension.html` | Enlace complementario; una temática de comprensión, no examen 6.º. |
| Sustantivos y adjetivos | `cursos/5to/lengua/gramatica.html` | Repaso básico con ejemplos y 12 preguntas; no equivale por sí solo al nivel completo de 6.º. |
| Verbos: base y formas no personales | `cursos/6to/lengua/el-verbo/` | Reutilizar íntegramente el Tema de 6.º. |
| Verbos: indicativo y subjuntivo | `cursos/6to/lengua/indicativo-subjuntivo/` | Reutilizar íntegramente el Tema de 6.º. |
| Verbos: subjuntivo e imperativo | `cursos/6to/lengua/subjuntivo-imperativo/` | Reutilizar íntegramente el Tema de 6.º. |
| Repaso escolar de verbos | `cursos/6to/zonas/lenguizonas/gramatica-verbos/` | Enlace complementario de Lengüizonas, sin nuevo Tema o evidencia paralelos. |

### Nueva fuente escolar aprobada · Plan semanal de formas no personales

**Fuente recibida de la familia el 13/11/2026:** archivo `PS_AS_Lengua_Formas no personales.docx.pdf`, dos páginas; cabecera: «Plan semanal Lengua · Adaptación significativa · 6.º de Primaria». Contiene el texto escolar **«Caminar por el bosque al amanecer…»** y cuatro actividades. Es **material de trabajo real de Gaudem**, no una prueba oficial ni confirmación de que se reproducirá en el examen del 18/11.

| Nº en Gaudem | Consigna de la ficha (síntesis fiel) | Tratamiento propuesto |
|---|---|---|
| 1 | Leer atentamente el texto del bosque. | Recuperar el acto de leer antes de responder; referencia a la ficha escolar original proporcionada por la familia y lectura de apoyo si el texto está disponible legítimamente. |
| 2 | Buscar en el texto infinitivos, gerundios y participios. | Identificación contextual en texto, sin saltar directamente a definiciones. |
| 3 | Clasificar en tres columnas; escribir **en azul** la forma encontrada en el texto y **en negro** sus otras dos formas no personales. La ficha ofrece el ejemplo caminar → caminando → caminado. | Conservar las **tres columnas y el código visual azul/negro**; permitir también etiquetas textuales y referencia no cromática por accesibilidad. |
| 4 | Escribir **tres infinitivos**, **tres gerundios** y **tres tiempos compuestos** (haber conjugado + participio). | Producción propia en papel y ejemplos posteriores de autocorrección; no sustituir «tiempos compuestos» por tres participios sueltos. |

**Relación con la Academia existente:** `cursos/6to/lengua/el-verbo/` ya define infinitivo, gerundio, participio y formas compuestas; su banco cubre el reconocimiento básico, pero **no** la secuencia escolar de lectura → búsqueda → tabla tricolor → producción. Se prepara un apoyo específico para la evaluación, sin duplicar el Tema académico permanente.

**Procedencia y publicación:** el PDF escolar es referencia privada recibida por la familia. No subir a la web pública el escaneo, la ficha ni la transcripción íntegra del pasaje. Si no se dispone de URL escolar oficial verificada y autorización adecuada de uso, la práctica digital utilizará un texto **original de Academia** que permita aplicar las mismas cuatro destrezas, identificado como práctica complementaria; la familia conservará el PDF del colegio para trabajar sobre la fuente exacta. No inventar URL oficial ni atribuir el texto original de Academia a Gaudem.

La especificación `SPEC-LENGUA_6TO_VERBOS.md` v1.1 documenta la correspondencia con los otros tres materiales escolares publicados por Gaudem y su integración mediante PR #172 y #176. No repetir esa incorporación.

La página de Gramática de 5.º menciona biografía/autobiografía, pero **eso no acredita un recorrido propio completo de redacción de ese tipo**. Evitar prometerlo como ya implementado.

## 3. Ubicación y navegación

**Acceso:** `6.º de Primaria → Lengua → Me preparo para Lengua`, claramente diferenciado de «Mis Temas de Lengua» y de «Recursos oficiales de Lengua».

**Propuesta de destino:** `cursos/6to/lengua/preparacion-noviembre/`, tomando como referencia el recurso temporal de English; la implementación física corresponde a DESA.

**No agregar esta preparación temporal como cuarto Tema permanente** en `temas-lengua.js`, ni reetiquetar los tres Temas de verbos.

Al abrir un enlace a un recurso de 5.º o 6.º, conservar identidad/Persona Activa y ofrecer retorno comprensible a «Me preparo para Lengua» cuando sea viable con la navegación estándar. Verificar especialmente navegación entre cursos para evitar ciclos de «Volver». No modificar globalmente páginas heredadas si el objetivo se resuelve de forma acotada.

## 4. Experiencia común

Entrada única con **dos tarjetas independientes y fechadas**:

1. **16/11 · Expresión escrita** — «Preparo mis ideas, escribo y reviso».
2. **18/11 · Comprensión y gramática** — «Leo, comprendo y reconozco las palabras».

Cada tarjeta ofrece ruta corta recomendada, recursos existentes diferenciados de la práctica propia de preparación y una indicación clara de qué hacer primero.

Principios: experiencia visual y respetuosa para 11 años, instrucciones cortas, carga cognitiva progresiva, una acción principal por paso, ayuda voluntaria, sin cronómetro ni premios por rapidez y sin atribuir dominio por haber terminado.

## 5. Expresión escrita · 16/11

Objetivo: **organizar y producir en papel una redacción propia**, no solamente contestar preguntas de gramática.

Recorrido mínimo propuesto:

1. **Elijo el tipo de texto:** acceso a «Texto Comparativo» y «El Diálogo». Mostrar que son recursos existentes y **no** afirmar que alguno será el examen.
2. **Planifico:** preguntas breves sobre qué quiero contar, a quién y en qué orden; las ayudas dependen del tipo de texto. No imponer la estructura de texto comparativo a un diálogo u otro género.
3. **Escribo en mi cuaderno:** espacio libre de escritura en papel, sin teclado obligatorio ni captura de fotos.
4. **Reviso antes de entregar:** instrucciones/idea clara, orden y estructura apropiados, frases completas, coherencia, ortografía/puntuación y legibilidad.

Se puede ofrecer un ejemplo o modelo **después del intento**, sin adelantar un texto para copiar.

No simular corrección automática del texto manuscrito ni asignar nota. La familia puede revisar con Gloria.

Si llega material escolar sobre otros tipos de texto, analizarlo y enriquecer esta preparación antes que crear otro módulo. La ausencia de esa fuente **no impide** ofrecer la guía general y los enlaces útiles disponibles.

## 6. Comprensión lectora y gramática · 18/11

Objetivo: repasar los cuatro focos comunicados sin presentar una mezcla arbitraria como examen oficial.

**Comprensión lectora:**
- enlace al recurso de comprensión de 5.º;
- práctica original breve de Academia con texto adecuado a 6.º y preguntas que exijan leer el texto: recuperar información, interpretar significado y relacionar ideas; preguntas una a una, con pistas y posibilidad de releer.

**Sustantivos y adjetivos:**
- enlace a Gramática de 5.º como base;
- práctica breve de identificación **en frases y en el contexto de la lectura**, no solo definiciones aisladas;
- evitar incorporar categorías avanzadas no confirmadas como exigencia del examen.

**Verbos:**
- enlaces claros a los tres Temas ya publicados de 6.º y, como apoyo opcional, Lengüizonas;
- la práctica complementaria puede recuperar reconocimiento de formas, persona/número, formas no personales y modos según los Temas existentes, **sin copiar ni reemplazar su banco ni sus pruebas**.

### Practico con mi ficha escolar · Formas no personales

Incorporar dentro de «18/11 · Comprensión y gramática» un bloque diferenciado y **prioritario**, basado en el Plan Semanal de dos páginas recibido de Gaudem, con la misma progresión de cuatro tareas:

1. **Leo:** invitar a leer la ficha escolar del bosque, con apoyo de lectura cuando esté disponible; para la práctica digital autónoma usar un pasaje original equivalente y claramente señalado como elaborado por Academia.
2. **Encuentro:** señalar verbos en infinitivo, gerundio y participio dentro del texto; poder volver al pasaje, activar pistas voluntarias y comprobar por contexto.
3. **Completo la tabla:** tres columnas «Infinitivo | Gerundio | Participio». Distinguir visualmente la forma **encontrada** (azul) de las dos **completadas** (negro), además de indicadores textuales accesibles; conservar el ejemplo escolar «caminar, caminando, caminado» como referencia breve. Evitar que el color sea la única pista.
4. **Escribo:** guiar escritura en cuaderno de **3 infinitivos**, **3 gerundios** y **3 formas verbales compuestas** (haber conjugado + participio). La respuesta libre es revisada por Gloria/familia; ejemplos para contrastar aparecen **después** de intentar, nunca como respuesta anticipada.

Mantener la distinción entre una **forma no personal** (p. ej., participio) y una **forma compuesta** (haber conjugado + participio). No añadir automáticamente corrección de manuscritos, fotografía, notas o registros de producción. La actividad forma parte del refuerzo temporal: no exige nuevo Tema o motor y ofrece un enlace explícito al Tema existente «El verbo · Repaso de 5.º» para recuperar teoría.

Los ejercicios escolares son referencia de fidelidad, pero la implementación pública no debe aparentar que ha publicado íntegramente la ficha original si está presentando una práctica equivalente de Academia.

**Cierre formativo:** ofrecer un repaso integrado breve de comprensión y gramática, con feedback conceptual y reintentos. No incluir calificación escolar ni afirmar que replica el formato del colegio.

Evitar navegación obligatoria por todos los recursos: permitir repasar el foco concreto que Gloria necesite.

## 7. Integración y límites

- Reutilizar portal de materia, componentes visuales, navegación, autenticación/contexto, lector compartido y estilos existentes, conforme a sus contratos.
- Reutilizar **enlaces a recursos existentes**, no duplicar sus páginas, motores, bancos, catálogos, rutas ni evidencia.
- Este recurso de examen será una preparación **temporal y formativa**, como los refuerzos existentes de English y Matemáticas: **no crea nuevas colecciones Firestore, registros de calificaciones ni sesiones académicas propias**. Los Temas permanentes enlazados conservan sus sesiones/evidencia según contrato actual.
- Mantener la fuente escolar claramente diferenciada de ejemplos o textos originales de Academia. En el Plan Semanal de formas no personales, conservar las cuatro consignas y la codificación de color como criterios de diseño, sin subir el PDF ni el relato escolar completo.
- No publicar escaneos del colegio ni inventar criterios de evaluación.
- No incorporar por anticipación géneros textuales, reglas ortográficas o apartados de gramática no confirmados.
- No modificar el motor de verbos, el contenido de 5.º ni su histórico por esta incorporación.

## 8. Criterios de aceptación para DESA

1. Existe entrada visible «Me preparo para Lengua» desde el portal real de Lengua 6.º, sin interferir con «Mis Temas» ni recursos Gaudem.
2. Se distinguen claramente ambos exámenes, fecha y materia/objetivo; nunca se anuncian como simulacro oficial.
3. Los enlaces señalados en §2 abren los destinos existentes correctos y preservan Persona Activa, permisos y una navegación de retorno entendible; no crean ciclos de Volver.
4. Expresión escrita permite planificar, escribir en papel y revisar; recursos comparativo/diálogo funcionan como opciones, no como únicos tipos escolares garantizados.
5. Comprensión incluye texto original, preguntas con referencia real al texto y ayuda voluntaria; sustantivos/adjetivos se practican en frases; los verbos reutilizan los tres Temas reales.
6. La ficha escolar de formas no personales está representada por cuatro tareas verificables: lectura, identificación, tabla de infinitivo/gerundio/participio con azul/negro y producción de tres infinitivos, tres gerundios y tres tiempos compuestos. Se preservan consignas y se distingue claramente el texto escolar privado de la práctica original pública.
7. Ayudas no anticipan respuestas; no hay presión temporal, penalización por reintento ni comparación con otros alumnos.
8. No hay escrituras nuevas ni contaminación de sesiones/históricos; Vista previa no guarda resultados.
9. Comprobar teclado, foco, lectura, estados de error, móvil (320/390 px) y escritorio (1280/1440 px); regresión de navegación de 5.º, portal Lengua y los tres Temas de verbos.
10. Validar código y navegación internamente antes de solicitar prueba familiar.
11. Registrar resultados de uso real con Gloria antes de declarar estable; después de aprobación, PR/merge y verificación de Pages según workflow.

## 9. Riesgos y validación pendientes

- **Falta formato preciso de expresión escrita del colegio.** No restringir a comparativo/diálogo, porque son los recursos ya disponibles, no necesariamente el temario completo.
- **No hay modelo del examen de Lengua.** Se ha recibido una ficha de Plan Semanal «Formas no personales» con cuatro actividades y dos páginas; no confirma el examen. Todo texto nuevo será original y formativo, no reproducción íntegra del material escolar.
- **Navegación entre 6.º y 5.º.** Verificar retorno e identidad en navegador real, especialmente rutas heredadas.
- **Urgencia temporal.** Priorizar un resultado completo de mínimo alcance útil para estudiar antes del 16 y 18/11; evitar refactors o ampliación de arquitectura.
- **Uso real.** La validación automatizada no sustituye comprobación de comprensión, autonomía y voz en el dispositivo familiar.

## 10. DECISIÓN y siguiente paso

| Aspecto | Estado |
|---|---|
| Necesidad y dirección | **Aprobada por el Product Owner:** preparación centralizada «Me preparo para Lengua» para dos exámenes y ficha escolar de formas no personales; el PDF original no se publica. |
| Especificación detallada | **Aprobada para documentar oficialmente:** versión 1.0; criterios verificables y fidelidad a la nueva fuente; cualquier cambio sustantivo posterior requerirá nueva revisión. |
| Implementación | Candidata técnica en `feat/lengua-preparacion-noviembre`, pendiente de aprobación. No integrada ni publicada. |
| Arquitectura | Reutilización de portales, actividades y enlaces existentes; sin nuevas persistencias ni Temas permanentes. |
| Fuente pendiente | Tipos exactos de expresión escrita y formato de examen escolar; nueva ficha de formas no personales recibida y analizada, sin formato de examen confirmado. |
| Flujo | Aprobación funcional recibida → integración documental en `main` → desarrollo separado → validación técnica y familiar → publicación/cierre. |

**Mantenimiento:** actualizar solo al recibirse nueva información académica que cambie materialmente el alcance o cuando DESA implemente y valide, sin duplicar el conocimiento de Verbos o de los estándares existentes.

## 11. Implementación candidata y trazabilidad

Base `bc88a1c` (PR documental #252), rama `feat/lengua-preparacion-noviembre`. Acceso prioritario desde Lengua 6.º, separado del catálogo y de Gaudem. Dos tarjetas fechadas, con retorno al examen elegido mediante navegación estándar y Persona Activa. Nueve destinos existentes; sin cambios en Temas, registros, Firebase ni páginas de 5.º.

Se revisaron las dos páginas del PDF privado (texto y representación visual). La actividad mantiene las cuatro consignas: referencia al texto escolar privado y pasaje original «El banco del patio» con lector compartido; búsqueda contextual de las tres formas; ejemplo caminar/caminando/caminado y tabla editable de tres columnas, con azul para la forma encontrada, negro para las que se completan y etiquetas textuales; producción en cuaderno de tres infinitivos, tres gerundios y tres tiempos compuestos, con ejemplos bajo demanda después del intento. No se incluye el PDF, su imagen ni la transcripción del relato escolar. No se ha añadido una URL para ese documento. La ficha complementaria vive en la preparación, sin crear nuevo Tema ni entrada independiente.

El 16/11, guía para elegir, planificar, escribir y revisar en papel. El 18/11, seis preguntas formativas de comprensión y gramática, una a la vez, con relectura, ayuda opcional y reintento. Estado en memoria y sin nuevas escrituras en modo normal o Vista previa. No hay nota ni simulacro oficial. No se ha confirmado el tipo exacto de redacción ni el formato del examen.

Archivos: portal `cursos/6to/lengua/index.html`; HTML, CSS y controlador local en `cursos/6to/lengua/preparacion-noviembre/`; regresión de navegador `tests/lengua-preparacion-noviembre-browser.cjs`; esta SPEC y HandOff. Validación técnica con identidad, SDK y voz controlados; no acredita cuentas reales ni escucha en el dispositivo familiar. Pendientes aprobación del diff, integración/publicación y uso real con Gloria.

**Resultado técnico:** `tests/lengua-preparacion-noviembre-browser.cjs` superada: fechas, cuatro tareas, relectura, pistas, reintento, lector/error/no disponible, foco, teclado, nueve destinos con retorno al examen y Persona Activa, cero escrituras educativas en práctica y Vista previa, 320/390/1280/1440 px y sin excepciones JS. Tabla revisada visualmente con Outfit. En rutas heredadas hubo avisos de recursos externos no cargados en QA. La suite amplia `tests/verbos-browser.cjs` falla en la aserción de Refuerzos de la línea 103 tanto en la candidata como en `main` (`bc88a1c`), sin cambios en Refuerzos ni en los motores académicos.
