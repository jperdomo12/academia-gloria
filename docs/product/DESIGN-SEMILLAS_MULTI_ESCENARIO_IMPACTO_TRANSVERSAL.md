# 🌱 Semillas multi-escenario · Impacto transversal
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/product/DESIGN-SEMILLAS_MULTI_ESCENARIO_IMPACTO_TRANSVERSAL.md` |
| **Versión** | 1.2 |
| **Estado** | Análisis transversal aprobado · decisiones vigentes |
| **Última actualización** | 02/11/2026 |
| **Propietario** | Producto · Creciendo por Dentro / Gestión de Misiones |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Impacto del modelo Semilla = habilidad / Escenario = situación sobre Misiones, Mi Camino, evidencia, histórico, catálogo, guías, observaciones/refuerzos y Análisis Educativo |

## Documentos relacionados

- `docs/specifications/SPEC-CRECIENDO_POR_DENTRO_MULTI_ESCENARIO.md`
- `docs/product/DESIGN-MISIONES_SEMILLAS_MULTI_ESCENARIO.md`
- `docs/product/DESIGN-SEMILLAS_MULTI_ESCENARIO_AMPLIACION_001_004_007_010_011.md`
- `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md`
- `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`
- `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md`
- `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md`

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.2 | 02/11/2026 | Product Owner + AI Collaborator | Aprueba la expansión curada a 001/004/007/010/011 y activa el badge automático `🌱 N situaciones` al existir varias Semillas multi-escenario. Sustituye la decisión previa de no mostrar contador en catálogo. |
| 1.1 | 02/11/2026 | Product Owner + AI Collaborator | Sincroniza el cierre transversal con la V1 de escenario opcional implementada en Misiones/Motor/evidencia. Mantiene diferidos catálogo, análisis, automatizaciones y solicitud de escenarios. |
| 1.0 | 02/11/2026 | Product Owner + AI Collaborator | Decisiones funcionales aprobadas anteriores a la implementación. |

## Resumen de contenido

Matriz de decisiones aprobadas; comportamiento libre/fijado y límites V1; histórico ya absorbido; catálogo con badge informativo al ampliar el patrón; evoluciones diferidas; estado de implementación y fuentes propietarias.

---

## 1. Principio transversal aprobado

El nuevo modelo no convierte `escenario` en una entidad global de Academia.

> **Semilla = habilidad estable.**  
> **Escenario = contexto concreto de práctica, propiedad del Motor de Semillas.**

Los demás dominios solo deben conocer el escenario cuando aporta valor funcional real.

---

## 2. Matriz de impacto y decisiones

| Área | Decisión |
|---|---|
| Crear Misiones | **AJUSTE IMPLEMENTADO V1**: escenario opcional cuando la Misión apunta a una sola Semilla multi-escenario concreta. |
| Mi Camino | **AJUSTE IMPLEMENTADO V1**: si la Misión fija escenario, abrir directamente ese escenario; si no, conservar elección libre. |
| Evidencia de Misión | **AJUSTE IMPLEMENTADO V1**: añadir `escenarioId` y `escenarioTitulo` cuando exista escenario efectivo. |
| Trabajo Realizado | **YA ABSORBIDO** por Fase A; conservar presentación contextual. |
| Jardín / Histórico | **YA ABSORBIDO** por Fase A; conservar compatibilidad histórica. |
| Catálogo de Semillas | **AJUSTE APROBADO PARA LA AMPLIACIÓN**: mostrar badge automático `🌱 N situaciones` solo cuando existan más de un escenario. No representa progreso ni obligación de completar todos. |
| Guía de Semillas | **AJUSTE PROGRESIVO** al expandir el modelo a más Semillas. |
| Observaciones / Refuerzos | **SIN AUTOMATIZACIÓN NUEVA**; una observación puede orientar una Misión con escenario concreto, siempre bajo decisión familiar. |
| Análisis Educativo | **EVOLUCIÓN FUTURA**; escenario puede ser contexto descriptivo, nunca diagnóstico ni conclusión causal. |
| Solicitud de nuevos escenarios | **FUTURO YA DOCUMENTADO** en su diseño específico. |

---

## 3. Misiones · decisión funcional

Cuando una Misión de `Creciendo por Dentro` apunta a una sola Semilla multi-escenario concreta, la familia puede elegir:

### 3.1 Escenario libre

```text
Semilla: Yo sí puedo
Situación: Cualquier situación · Gloria elige
```

Flujo:

```text
Misión → Semilla → selector de escenarios → alumno elige → práctica
```

### 3.2 Escenario fijado

```text
Semilla: Yo sí puedo
Situación: Algo del cole me está costando
```

Flujo:

```text
Misión → Semilla → escenario fijado → práctica
```

Dentro de una Misión con escenario fijado no se ofrece cambio a otro escenario. Fuera de esa Misión se mantiene libertad completa.

### 3.3 Límite de la primera versión

La selección específica de escenario solo se habilita cuando:

- la Misión pide una sola Semilla;
- esa Semilla es multi-escenario;
- la familia ha seleccionado una Semilla concreta.

No se introduce todavía una matriz `Semilla A → escenario X / Semilla B → escenario Y` para Misiones que requieren varias Semillas.

---

## 4. Evidencia y cumplimiento

La sesión de Semillas ya conserva `escenarioId` y `escenarioTitulo` cuando corresponde.

La evidencia `semilla_completada` incorpora también, cuando existe:

- `escenarioId`;
- `escenarioTitulo`.

Cuando la Misión fija escenario, el criterio de cumplimiento valida simultáneamente:

```text
Semilla correcta
+
Escenario correcto
```

Cuando la Misión no fija escenario, cualquier escenario válido de la Semilla puede completar la Misión.

No crear colección nueva ni sistema paralelo de evidencia.

---

## 5. Trabajo Realizado e histórico

La Fase A ya resolvió:

- persistencia del escenario en sesiones nuevas;
- lectura histórica por escenario;
- compatibilidad de sesiones antiguas sin `escenarioId` mediante escenario predeterminado;
- visualización del escenario practicado.

No se requiere evolución transversal adicional ahora.

---

## 6. Catálogo y UX general

La decisión previa de no mostrar un indicador en tarjetas se revisa al aprobar la expansión a cinco Semillas adicionales.

Con seis Semillas multi-escenario, el indicador aporta descubrimiento y consistencia sin recargar el catálogo.

Se aprueba:

> `🌱 N situaciones`

Reglas:

- solo aparece cuando `escenarios.length > 1`;
- `N` se deriva del catálogo real;
- no se mantiene manualmente;
- no se muestra en Semillas tradicionales;
- no representa progreso;
- no usar `1/3`, porcentajes ni checklists;
- no insinuar que todos los escenarios deban practicarse;
- debe mantener jerarquía visual secundaria respecto al título y la acción principal.

La explicación conceptual sigue siendo:

> Algunas Semillas pueden practicarse en distintas situaciones. La habilidad sigue siendo la misma; cambia el contexto en el que se practica.

---

## 7. Guías y documentación

Al expandir el modelo a más Semillas, la guía para familias/profesionales debe explicar de forma general:

> Algunas Semillas pueden practicarse en distintas situaciones. La habilidad sigue siendo la misma; cambia el contexto en el que se practica.

Cada Semilla multi-escenario puede enumerar sus escenarios sin duplicar la explicación completa de la habilidad.

---

## 8. Observaciones y refuerzos

El escenario aporta precisión al pasar de una observación a una práctica dirigida.

Patrón futuro permitido:

```text
Observación
→ habilidad a practicar
→ Semilla existente
→ escenario opcional
→ revisión familiar
→ Misión
```

No se debe crear automáticamente una Misión visible por frecuencia de escenario ni interpretar un escenario repetido como dificultad persistente.

---

## 9. Análisis Educativo

`Creciendo por Dentro` no forma parte actualmente de las fuentes de Análisis Educativo V1.

Si se incorpora en el futuro:

- la unidad principal de análisis será la **Semilla / habilidad**;
- el escenario será únicamente **contexto de práctica**;
- podrá mostrarse distribución de prácticas por escenario;
- no se inferirá causa, dificultad, estado emocional ni problema por frecuencia de escenario.

Razones: un escenario puede haber sido elegido por el alumno, fijado por la familia en una Misión o provenir de compatibilidad histórica.

Ejemplo válido:

> En el período observado, `Yo sí puedo` se practicó principalmente en situaciones relacionadas con actividades escolares.

Ejemplo no válido:

> Gloria tiene más problemas en el colegio.

---

## 10. Expansión curada aprobada

Se aprueba ampliar el patrón a:

- 001 · `Aprendo a decir lo que siento`;
- 004 · `Nos escuchamos y buscamos un acuerdo`;
- 007 · `Puedo elegir diferente`;
- 010 · `Un momento para mí también está bien`;
- 011 · `Puedo aceptar apoyo y seguir siendo capaz`.

Cada una conserva su escenario actual y recibe dos escenarios nuevos, para tres en total.

Los contenidos, IDs, fronteras pedagógicas y criterios de validación están en:

`docs/product/DESIGN-SEMILLAS_MULTI_ESCENARIO_AMPLIACION_001_004_007_010_011.md`

La ampliación no implica que tres escenarios se conviertan en estándar obligatorio ni máximo permanente.

---

## 11. Estado y siguiente paso

La revisión transversal original permanece cerrada y la V1 de Misiones por escenario está implementada.

El siguiente paquete aprobado es:

1. incorporar los diez escenarios nuevos definidos en el diseño de ampliación;
2. activar el badge automático `🌱 N situaciones`;
3. reutilizar Motor, Misiones, evidencia e histórico ya implementados;
4. actualizar guía y documentación propietaria;
5. publicar y validar técnicamente;
6. realizar después prueba familiar ampliada con Anaís y Gloria antes de declarar estable el patrón multi-escenario.

No introducir todavía Análisis Educativo de Semillas, automatización de refuerzos, generación dinámica ni obligación de completar todos los escenarios.
