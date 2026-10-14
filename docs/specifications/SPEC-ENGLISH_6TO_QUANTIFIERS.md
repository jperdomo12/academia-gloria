# 🧺 English 6.º · Much / Many – A lot of / Lots of
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-ENGLISH_6TO_QUANTIFIERS.md` |
| **Versión** | 1.0-rc |
| **Estado** | Candidata en rama · pendiente de revisión e integración |
| **Fecha** | 14/10/2026 |
| **Propietario** | Contenido curricular de English · 6.º |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Un único Tema con explicación escolar y práctica de English Zones / Grammar zone |

## 🔗 Fuentes relacionadas

- `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` · modo de incorporación, fidelidad, evidencia y regla de enriquecimiento §6.4.1/CA-031.
- `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md`, `docs/standards/STD-LIA.md` y `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` · calidad, apoyo y autorización.
- `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md` · separación de Motor, Contenido, Registro e Integración.
- `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md`, `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` y `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md` · recorridos existentes.
- `compartido/js/motor-practica-verbal.js` y `compartido/js/sesiones-academicas.js` · motor parametrizado y contrato de sesión reutilizados.

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0-rc | 14/10/2026 | Product Owner + AI Collaborator | Integra dos fuentes del colegio en candidata de un único Tema de English; origen English Zones/Grammar zone visible, motor y persistencia reutilizados. |

## 🧭 Resumen de contenido

| Punto | Contenido |
|---|---|
| 1. Fuentes y alcance | Relaciona explicación, práctica y contenido integrado. |
| 2. Fidelidad | Evita convertir preferencias de uso en prohibiciones o falsas correcciones. |
| 3. Experiencia | Describe aprendizaje, práctica, producción libre y prueba. |
| 4. Reutilización y origen | Define destino único, accesos, sesiones y refuerzos. |
| 5. Validación | Conserva pruebas, límites y estado de incorporación. |
| DECISIÓN | Registra la instrucción de desarrollo y regla aprobada. |

## 1. Fuentes y alcance

| Fuente recibida | Cobertura |
|---|---|
| `6_IB_Much, many, lots of(1).pdf` · 1 página | Explicación principal: much + no contable, many + contable plural, preferencia negativa/pregunta, a lot of/lots of en afirmativas y con ambos tipos de nombre; ejemplos del colegio. |
| `Grammar zone(1).pdf` · 2 páginas, English Zones | Clasificación de diez nombres, ocho frases para completar, cuatro correcciones y producción extra de diez frases en cuaderno. Permite consultar apuntes; conserva instrucciones de colores, títulos y tabla con regla. |

El título **Grammar zone** es procedencia y tipo de práctica; no constituye un segundo Tema ni una materia nueva. Las imágenes/documentos originales se leen como fuente; no se republican los binarios. «Coffe» se presenta con la grafía coffee.

## 2. Fidelidad

Se enseña la pauta de los apuntes sin convertirla en una prohibición absoluta. Much/many aparecen sobre todo en negativas/preguntas; a lot of/lots of es la elección habitual en afirmativas. Many también puede aparecer en afirmativas; a lot of/lots of puede aparecer en negativas/preguntas.

La frase **I don't have a lot of free time** ya es gramatical. En la cuarta corrección del colegio el error de concordancia cuantificador/nombre es **many coffee**. Academia conserva la primera parte y corrige la segunda. Money, traffic, coffee, time y sugar se clasifican según los sentidos de esta actividad, sin enseñar que nunca puedan tener otros usos.

Las preguntas de respuesta única tienen opciones inequívocas o indican expresamente que se elija la preferencia de los apuntes. No se ofrece como distractor incorrecto otra respuesta gramaticalmente válida. A lot of y lots of se presentan como equivalentes.

Contraste complementario de uso: [Cambridge · Much/many/a lot of/lots of](https://dictionary.cambridge.org/grammar/british-grammar/much-many-with-a-noun) y [British Council · Much and many](https://learnenglishkids.britishcouncil.org/grammar-vocabulary/grammar-practice/much-many). El material del colegio conserva la prioridad de alcance.

## 3. Experiencia

- Mapa: tipo de nombre → intención de la frase → cuantificador.
- Claves: explicaciones en español y ejemplos con escucha en inglés (`en-GB`).
- Grammar zone: las cuatro actividades del colegio integradas, con comprobaciones desplegables después del intento.
- Práctica: veintidós retos (diez nombres, ocho huecos, cuatro correcciones), pista solicitada y reintentos; no escribe aprendizaje.
- Prueba: ocho familias y dieciséis variantes, dos familias por bloque; variantes recientes evitadas cuando existe alternativa. Explicación tras responder y mapa final.
- Producción: diez frases libres en cuaderno, revisión con acompañante; no se califican automáticamente ni se presentan como guardadas.

Bloques de evidencia: `nouns`, `much-many`, `a-lot-of`, `correction`. No hay presión temporal ni calificación escolar. La escucha de retos usa únicamente el enunciado inglés; la instrucción permanece visible en español.

## 4. Reutilización y origen

Destino único: `cursos/6to/english/much-many-a-lot-of/`. Actividad única: `6-english-much-many-a-lot-of`. Materia persistida: `English`; título académico idéntico desde ambos accesos.

`temas-english.js` es el catálogo propietario del Tema. `cursos/6to/zonas/english-zones/temas-english-zones.js` filtra/referencia ese catálogo; el portal de Zona y el catálogo asistido de Misiones consumen esa misma referencia y abren el mismo destino con retorno contextual a la Zona. English Zones pasa de Preparando a Activa por material real. El selector de Misiones puede presentar el origen English Zones conforme al patrón vigente; la evidencia sigue siendo de English.

Los títulos de los retos/respuestas conservan **Grammar zone** como procedencia de la práctica y los snapshots del resultado preservan ese título. No se añade persistencia paralela ni una segunda colección/actividad. Si llega una actividad posterior de Zonas sobre el mismo contenido, se enriquece este Tema (§6.4.1 del estándar curricular).

Reutiliza el motor compartido incorporado con Verbos: datos, IDs y plantilla de práctica/prueba. Solo se añaden idioma/texto de lectura opcionales por reto/botón y campo semántico para mensajes; los valores por defecto mantienen el comportamiento de Lengua. Las explicaciones y bancos del repaso anterior permanecen intactos. El CSS existente de Gramática se reutiliza con tres acentos de English; no se crea otro sistema visual.

ContextoUsuario, lector, tiempo activo, celebración, `sesion-academica-v1`, evidencia de Misión, visor histórico y Análisis se conservan. El catálogo de refuerzos añade la actividad/bloques desde los datos del Tema y mantiene algoritmo, señales mínimas y gestión familiar. Sin nuevas Rules, roles o colecciones.

## 5. Validación

Base `main`: `61a44ede841b2ce7f6789e78ee80ee682a353e1e` (#173). Rama `feat/english-quantifiers`.

Validación realizada en `tests/quantifiers-browser.cjs`: cobertura de ambos PDF y banco revisado, acceso desde English y English Zones al mismo ID/destino, retorno a origen, lectura `en-GB`, práctica sin escritura, aprendizaje de ocho respuestas/cuatro bloques, variantes alternativas, vista previa profesional/familiar sin escritura, histórico, Misión en revisión con evidencia, catálogo asistido y Análisis/refuerzos. Banco auditado: veintidós prácticas, ocho familias/dieciséis variantes e IDs/opciones válidos; se comprueba la negativa válida del ejercicio 3. Anchuras 1280/768/390/320 y revisión visual escritorio/móvil sin desbordamiento. Regresión de Verbos mediante su test de navegador. Pruebas con SDK e identidades simulados; cuentas/Rules/audio físico y utilidad con Gloria requieren prueba real. No se declara publicado ni estable antes de integración.

## DECISIÓN

El Product Owner declara **LISTO PARA DESARROLLO** e instruye **Incorporar a la Academia** el 14/10/2026. Aprueba que explicación y actividad de Zona sobre el mismo contenido enriquecen un único Tema. La incorporación sigue el cierre curricular vigente, con candidata pendiente de aprobación/integración; no se amplían permisos ni alcance académico.
