# 🔤 Lengua 6.º · Verbos
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-LENGUA_6TO_VERBOS.md` |
| **Versión** | 1.0-rc |
| **Estado** | Candidata en rama · pendiente de validación familiar e integración |
| **Fecha** | 14/10/2026 |
| **Propietario** | Contenido curricular de Lengua · 6.º |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Incorporación de material real del colegio: continuidad de 5.º, indicativo, subjuntivo e imperativo |

## 🔗 Fuentes relacionadas

- `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` · gobierna incorporación de una sola instrucción, activación de materia, práctica, fuentes y evidencia.
- `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md`, `docs/standards/STD-LIA.md` y `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` · calidad, acompañamiento y contexto autorizado.
- `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md` · separación entre Motor, Contenido y Registro.
- `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md`, `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md` y `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` · integraciones compartidas.
- `compartido/js/sesiones-academicas.js` · contrato vigente de sesiones y evidencia de Misión.

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0-rc | 14/10/2026 | Product Owner + AI Collaborator | Material de Verbos incorporado en candidata: portal de Lengua, contenido de 5.º/6.º y motor reutilizado del repaso de Lengüizonas. No declara publicación ni validación familiar. |

## 🧭 Resumen de contenido

| Punto | Contenido |
|---|---|
| 1. Fuentes y cobertura | Relaciona cada adjunto con el contenido incorporado. |
| 2. Experiencia | Describe la secuencia de aprendizaje, consultas y comprobación. |
| 3. Fidelidad y apoyos | Distingue contenido escolar, adaptaciones y matices gramaticales. |
| 4. Reutilización e integración | Identifica archivos, navegación, sesiones y refuerzos. |
| 5. Validación y cierre | Registra candidata, comprobaciones y límites de prueba. |
| DECISIÓN | Conserva la instrucción de incorporación y aprobación pendiente. |

## 1. Fuentes y cobertura

Material recibido el 14/10/2026; no se infiere la fecha de enseñanza a partir del nombre de archivo.

| Fuente escolar | Cobertura en Academia |
|---|---|
| `5_EL VERBO(2).pdf` · 4 páginas | Infinitivo, conjugaciones -ar/-er/-ir, raíz y desinencia, formas simples/compuestas, persona/número, formas no personales, tiempo/modo, perfecto/imperfecto y los diez tiempos de cantar en indicativo. |
| `6_LI_Lengua_Indicativo y Subjuntivo(2).pdf` · 2 páginas | Comparación de afirmaciones frente a deseos/dudas/posibilidades; expresiones de las dos listas y contraste es/sea, come/coma. |
| `6_LI_LOS VERBOS_Subjuntivo e imperativo(2).docx` · 8 páginas en el render de lectura | Seis tiempos de subjuntivo; modelos completos de cantar, temer y partir; variantes -ra/-se; futuros poco habituales; presente de imperativo, ausencia de yo y ejemplos afirmativos/negativos. La clasificación visual de tiempos se adapta a preguntas estructuradas. |

Los archivos originales se leen como fuente, no se sustituyen ni se publican sus ilustraciones. El material de 5.º es continuidad dentro del tema de 6.º; no migra ni reconstruye el curso de 5.º.

## 2. Experiencia

Recorrido: **6.º → Lengua → Verbos · Indicativo, subjuntivo e imperativo**.

- **Mapa:** base y contraste entre afirmar, expresar una posibilidad y dar una indicación.
- **Claves:** explicaciones breves con el lector compartido.
- **Material:** modelos desplegables por tiempo; diez tiempos de cantar en indicativo y seis tiempos de cada modelo de subjuntivo. Se añade producción libre en cuaderno con comprobación desplegable, sin evaluación automática de esa producción.
- **Práctica:** doce retos con pista solicitada y reintentos; no genera escrituras.
- **Prueba:** doce familias, dos variantes por familia y orden de opciones variable; explicación tras responder y mapa final por cinco bloques. La repetición utiliza alternativas a variantes recientes mediante el lector de sesiones existente.

Focos: base/conjugación y formas, indicativo y tiempos, elección del modo, tiempos del subjuntivo e imperativo/órdenes negativas. La producción libre no se presenta como evidencia estructurada registrada. No hay presión temporal ni calificación escolar; completar no equivale a dominar.

## 3. Fidelidad y apoyos

Se conservan terminología y ejemplos del colegio. Academia añade organización, apoyos de comprensión y práctica formativa, sin rebajar el nivel de 6.º.

Matices necesarios para evitar generalizaciones incorrectas:

- la raíz se explica sobre verbos regulares; algunos irregulares pueden cambiarla;
- el subjuntivo no equivale siempre a irrealidad: el propio ejemplo «me alegra que haya cantado» puede valorar un hecho;
- no se presenta el presente de subjuntivo como necesariamente futuro: su interpretación depende del contexto;
- las órdenes negativas se clasifican con **no + presente de subjuntivo**, conforme al material de 5.º; las indicaciones afirmativas a usted/ustedes usan formas coincidentes con subjuntivo;
- se corrigen erratas de copia/acentuación en los modelos, sin convertirlas en preguntas con respuestas incorrectas; «me alegra que» evita el dequeísmo del ejemplo del DOCX;
- futuro simple y futuro perfecto de subjuntivo se conservan como consulta/reconocimiento poco habitual, tal como advierten los apuntes.

Contraste lingüístico complementario, sin sustituir el alcance escolar: [RAE · Indicativo o subjuntivo](https://www.rae.es/libro-estilo-lengua-espa%C3%B1ola/el-modo-indicativo-o-subjuntivo), [RAE · Conjugación española](https://www.rae.es/buen-uso-espa%C3%B1ol/conjugaci%C3%B3n-espa%C3%B1ola) y [RAE · Dequeísmo](https://www.rae.es/dpd/deque%C3%ADsmo).

## 4. Reutilización e integración

| Elemento | Archivo/patrón |
|---|---|
| Activación de Lengua | `cursos/6to/index.html` sustituye el placeholder por enlace real al portal; no activa Sociales. |
| Portal y recursos | `cursos/6to/lengua/index.html`, `temas-lengua.js` reutilizan `portal-asignatura.js`, CSS comunes, grid y visibilidad Gaudem. Área de Lengua/Lengüizonas proceden del catálogo escolar 2026–2027, se abren en otra pestaña y no generan evidencia. |
| Contenido | `cursos/6to/lengua/verbos/` mantiene HTML y datos propios; utiliza el CSS existente de Gramática verbos. |
| Motor | `compartido/js/motor-practica-verbal.js` contiene el motor existente parametrizado; el repaso de Lengüizonas lo inicia con sus datos originales. No se mantienen dos copias del motor. |
| Identidad/sesión | ContextoUsuario, tiempo activo, lector, celebración y `sesion-academica-v1` existentes. Actividad nueva `6-lengua-verbos-modos`; materia `Lengua`. |
| Misiones | Catálogo asistido descubre el portal/data-driven existente; evidencia `sesion_academica` enlaza la sesión al finalizar desde Misión y conserva revisión familiar. |
| Histórico/Análisis | Visor de resultado académico y motor de Análisis existentes consumen respuestas, variantes, conceptos y `resumen.porBloque`; no hay nuevas colecciones ni Rules. |
| Fortalecimiento | `refuerzos-academicos.js` añade la actividad y sus bloques desde los datos del tema; conserva mínimo de señales, algoritmo y aprobación familiar de Misiones. |

El repaso previo **Gramática · Repasamos los verbos** sigue en Lengüizonas con su ruta, identificador, ocho familias y contenido originales; también se enlaza desde Lengua. `volver` conserva el portal de origen. Vista previa no guarda aprendizaje; consulta profesional relacionada conserva el modo de exploración sin escritura.

## 5. Validación y cierre

Base: `main` `f1d4d5c8a8a68e307ce3292a7bac12ef66fbd5ea` (#171). Rama: `feat/lengua-verbos-modos`.

Validación técnica y de fidelidad: extracción y lectura visual de las tres fuentes, revisión de claves/modelos/banco, comprobación del motor trasladado contra su versión previa, sintaxis/imports/rutas y navegador en escritorio/tablet/móvil. El test `tests/verbos-browser.cjs` comprueba navegación, práctica, aprendizaje, vista previa, histórico, Misión/evidencia, variantes, catálogo asistido, refuerzo/Análisis y el repaso previo con identidades/SDK simulados.

El recorrido completo pasó con SDK/identidades simulados: sesión libre con doce respuestas y cinco bloques, variantes alternativas, Misión en `pendiente_validacion` con evidencia, histórico y vista previa sin escribir, ocho preguntas del repaso anterior, catálogo asistido, refuerzos tras señales suficientes y Análisis compartido. Banco auditado: doce familias, veinticuatro variantes, IDs únicos y respuestas válidas; el traslado del motor conserva el cuerpo anterior salvo login relativo y texto final configurable. Anchuras 1280/768/390/320 y modelo desplegado en móvil sin desbordamiento.

La celebración compartida conserva un fallback heredado para la ilustración roja ausente; no se modifica ese componente en esta incorporación.

Estas pruebas no certifican Firestore desplegado, cuentas reales ni audio físico. Continúa pendiente validación familiar de comprensión, utilidad y dificultad; no se declara estabilidad.

## DECISIÓN

La instrucción del Product Owner **Incorporar a la Academia** autoriza esta incorporación curricular conforme al estándar de una sola instrucción. La candidata mantiene separado el tema nuevo y reutiliza antes de crear. Aprobación familiar del resultado e integración definitiva pendientes; no se abren cambios de permisos o arquitectura paralela.
