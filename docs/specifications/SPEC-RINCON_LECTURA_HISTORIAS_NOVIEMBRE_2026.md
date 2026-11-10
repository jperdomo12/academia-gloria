# Rincón de Lectura · Seis historias originales · Noviembre 2026
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-RINCON_LECTURA_HISTORIAS_NOVIEMBRE_2026.md` |
| **Versión** | 1.0 |
| **Estado** | Contenido aprobado e implementado para revisión familiar en vivo; no declarado estable |
| **Última actualización** | 10/11/2026 |
| **Propietario** | Rincón de Lectura · Mi Universo |
| **Responsables** | Product Owner, Anaís y AI Collaborator |
| **Ámbito** | Seis lecturas adicionales de niveles 1, 2 y 3 |

## Documentos relacionados

- `docs/FOUNDATION.md`: propósito y acompañamiento de Academia.
- `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`: fidelidad y distinción entre contenido escolar y complemento.
- `docs/specifications/SPEC-SCIENCE_6TO_NUTRICION.md`: pirámide escolar y seis grupos de alimentos.
- `docs/specifications/SPEC-SOCIALES_6TO_PUBLICIDAD_DINERO_IMPUESTOS.md`: presupuesto, ahorro, inversión y riesgo.
- `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md`: proceso de publicación y verificación.
- `mi-universo/rincon-lectura/historias.js`: catálogo propietario.

## Historial de versiones

| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 10/11/2026 | Seis historias originales aprobadas por la familia; integradas en el catálogo, con preguntas, pistas, reflexiones y apoyos visuales. Validación en vivo pendiente. |

---

## 🧭 Resumen de contenido

| Sección | Contenido |
|---|---|
| 1 | Decisión, objetivo y procedencia |
| 2 | Catálogo y distribución por niveles |
| 3 | Contrato de contenido y calidad narrativa |
| 4 | Referencias a Science y Sociales |
| 5 | Implementación y pruebas |
| 6 | Cierre y observación con Gloria |

## 1. Decisión y propósito

El Product Owner y Anaís autorizan el **10/11/2026** incorporar las seis historias tras revisar satisfactoriamente el borrador. La lectura detallada de la experiencia se hará **en vivo con Gloria**, y no es condición para preparar la publicación técnica.

Las historias son originales de Academia, para una audiencia aproximada de 10–12 años. Su doble objetivo es la comprensión lectora y la aplicación de ideas de autonomía, socialización, perseverancia, confianza, nutrición y uso responsable del dinero.

**Fuente de contenido validada por la familia:** `Academia_6_nuevas_lecturas_BORRADOR_2026-11-10.docx`, documento de trabajo privado aportado en la conversación. No se publica el DOCX ni se introduce documentación privada de Gloria en el repositorio público. El código conserva el contenido narrativo aprobado.

Las historias no sustituyen el currículo individualizado de Gloria ni implican que todas las lecturas sean materiales escolares exigidos por el colegio.

## 2. Catálogo aprobado

| Nivel | ID estable | Título | Foco |
|---|---|---|---|
| 1 | `el-plan-del-sabado` | El plan del sábado | Proponer y acordar planes, escuchar preferencias, aceptar una negativa temporal |
| 2 | `el-cuadro-que-tuvo-tres-intentos` | El cuadro que tuvo tres intentos | Arte, frustración, práctica y mejora |
| 2 | `tres-preguntas-para-elena` | Tres preguntas para Elena | Entrevistar respetuosamente a una adulta conocida en un entorno escolar y hablar en público |
| 3 | `la-cancion-del-segundo-intento` | La canción del segundo intento | Música, aceptación de resultados, perseverancia y colaboración |
| 3 | `el-menu-que-nos-da-energia` | El menú que nos da energía | Pirámide alimenticia, variedad y decisiones compartidas |
| 3 | `los-treinta-euros-de-clara` | Los treinta euros de Clara | Presupuesto, prioridades, ahorro e inversión con riesgo |

Reparto de nuevas historias: **1 × nivel 1, 2 × nivel 2, 3 × nivel 3**.

El catálogo previo contenía 27 lecturas. Tras la ampliación se esperan **33 lecturas** sin IDs duplicados.

## 3. Contrato y experiencia

Reutilizar exclusivamente el motor actual de Rincón de Lectura. Para cada historia:

- título, subtítulo, nivel, categoría, idioma, tiempo estimado, valores y escena visual;
- narrativa en párrafos cortos y con iconos;
- preguntas de opción y respuesta abierta; la respuesta abierta no se califica automáticamente por coincidencia literal;
- respuesta correcta y pista para las preguntas de elección;
- reflexión y frase del día;
- apoyo visual con tarjetas del modelo `apoyoVisual.items`.

**Cobertura literal aprobada:** 59 párrafos narrativos, 33 preguntas (21 de opción y 12 abiertas), seis reflexiones y seis frases finales. Se respetan texto, preguntas, opciones y respuestas del borrador; la representación visual se adapta al contrato del motor.

Niveles 2 y 3 aumentan la profundidad de inferencia y reflexión, no solo la longitud. Los apoyos se ofrecen sin infantilizar, y las respuestas personales pueden ser diferentes entre lectores.

## 4. Conexión con asignaturas y precauciones

### Science · Nutrición
La lectura conserva la pirámide escolar vigente de seis grupos dispuestos en cuatro alturas:
- base: carbohidratos;
- verduras y frutas;
- lácteos y proteínas;
- punta: grasas.

No se extrapolan raciones ni frecuencias a partir del tamaño de los niveles. Se fomenta variedad sin culpabilizar alimentos, personas o elecciones ocasionales.

### Sociales · Dinero, ahorro e inversión
La lectura de Clara distingue dinero disponible, gastos, presupuesto, ahorro para un objetivo y la inversión como actividad con resultados inciertos. No recomienda productos financieros ni promete ganancias.

### Desarrollo socioemocional
- La perseverancia no garantiza éxito ni exige ocultar tristeza o frustración.
- Socializar incluye expresar una preferencia, escuchar límites y tolerar respuestas distintas.
- La entrevista a una persona adulta ocurre en un entorno escolar supervisado, sin fomentar contactos con desconocidos.

## 5. Implementación y controles

Archivos de producto:
- `mi-universo/rincon-lectura/historias-nuevas-2026.js`: contenido nuevo.
- `mi-universo/rincon-lectura/historias.js`: registro del nuevo módulo tras las historias anteriores.

Prueba automatizada:
- `tests/rincon-lectura-ampliacion.test.mjs`: distribución, integridad, claves, unicidad, importación y conceptos Science/Sociales.

No modificar motor `rincon-lectura.js`, grabación, reconocimiento, historial, permisos ni API educativa. No crear nuevos campos de persistencia ni migraciones.

Comprobación reproducible prevista desde la raíz:
`node --test tests/rincon-lectura-ampliacion.test.mjs`

Al publicar, verificar el catálogo completo, filtros de nivel y categoría, apertura, preguntas, apoyos visuales, lectura de voz, historial y retorno. Las pruebas técnicas no sustituyen la experiencia real con la familia.

## 6. Cierre y observación real

**Completado:** selección familiar, redacción, revisión general positiva, construcción de seis lecturas y registro de pruebas.

**Pendiente:** revisión detallada con Gloria, incluida la comprensión de los textos y la adecuación real de la longitud de niveles 2/3, ayudas, voces, preguntas, sensibilidad socioemocional y navegación en su dispositivo.

Las observaciones de uso con Gloria pueden justificar ajustes posteriores. No declarar estable ni afirmar dominio de conocimientos a partir de una única lectura.

## DECISIÓN

**Aprobación funcional:** sí (Product Owner y Anaís, 10/11/2026).  
**Integración:** realizada mediante módulo de contenido y catálogo existente.  
**Prueba familiar en vivo:** pendiente.  
**Cambios de arquitectura o persistencia:** ninguno.
