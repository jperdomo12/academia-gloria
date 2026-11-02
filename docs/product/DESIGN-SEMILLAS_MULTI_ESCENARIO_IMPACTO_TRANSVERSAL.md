# 🌱 Semillas multi-escenario · Impacto transversal
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/product/DESIGN-SEMILLAS_MULTI_ESCENARIO_IMPACTO_TRANSVERSAL.md` |
| **Versión** | 1.0 |
| **Estado** | Análisis transversal aprobado · decisiones vigentes |
| **Última actualización** | 02/11/2026 |
| **Propietario** | Producto · Creciendo por Dentro / Gestión de Misiones |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Impacto del modelo Semilla = habilidad / Escenario = situación sobre Misiones, Mi Camino, evidencia, histórico, catálogo, guías, observaciones/refuerzos y Análisis Educativo |

## Documentos relacionados

- `docs/specifications/SPEC-CRECIENDO_POR_DENTRO_MULTI_ESCENARIO.md`
- `docs/product/DESIGN-MISIONES_SEMILLAS_MULTI_ESCENARIO.md`
- `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md`
- `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`
- `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md`
- `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md`

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
| Crear Misiones | **AJUSTE APROBADO**: escenario opcional cuando la Misión apunta a una sola Semilla multi-escenario concreta. |
| Mi Camino | **AJUSTE APROBADO**: si la Misión fija escenario, abrir directamente ese escenario; si no, conservar elección libre. |
| Evidencia de Misión | **AJUSTE APROBADO**: añadir `escenarioId` y `escenarioTitulo` cuando exista escenario efectivo. |
| Trabajo Realizado | **YA ABSORBIDO** por Fase A; conservar presentación contextual. |
| Jardín / Histórico | **YA ABSORBIDO** por Fase A; conservar compatibilidad histórica. |
| Catálogo de Semillas | **SIN CAMBIO AHORA**; no mostrar contador de situaciones todavía. |
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

La evidencia `semilla_completada` debe incorporar también, cuando exista:

- `escenarioId`;
- `escenarioTitulo`.

Cuando la Misión fija escenario, el criterio de cumplimiento debe validar simultáneamente:

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

No mostrar por ahora indicadores como `3 situaciones` en la tarjeta de una Semilla.

La existencia de varios escenarios se descubre al entrar en la Semilla. Esta decisión puede reevaluarse cuando varias Semillas del catálogo sean multi-escenario y exista evidencia real de que el indicador aporta claridad.

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

## 10. Cierre del Paso 2

**DECISIÓN:** la revisión transversal del modelo multi-escenario queda cerrada.

No existe un impacto que bloquee su expansión a nuevas Semillas.

Próximos pasos:

1. implementar escenario opcional en Misiones conforme a `DESIGN-MISIONES_SEMILLAS_MULTI_ESCENARIO.md` y este documento;
2. validar ejecución, evidencia, histórico y compatibilidad;
3. después retomar la expansión curada de escenarios a otras Semillas candidatas.
