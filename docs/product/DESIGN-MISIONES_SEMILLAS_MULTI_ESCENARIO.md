# 🌱 Misiones · Semillas multi-escenario
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/product/DESIGN-MISIONES_SEMILLAS_MULTI_ESCENARIO.md` |
| **Versión** | 1.0 |
| **Estado** | V1 implementada · validación familiar pendiente |
| **Última actualización** | 02/11/2026 |
| **Propietario** | Producto · Gestión de Misiones + Creciendo por Dentro |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Permitir que una Misión de `Creciendo por Dentro` pueda dejar libre la elección de escenario o fijar opcionalmente un escenario concreto cuando apunta a una sola Semilla |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/specifications/SPEC-CRECIENDO_POR_DENTRO_MULTI_ESCENARIO.md` | Base del modelo Semilla = habilidad / Escenario = situación. |
| `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` | Propietario funcional del ciclo de Misiones. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | Reglas transversales de Misiones, evidencia y Persona Activa. |
| `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md` | Consulta histórica de la ejecución real. |
| `mi-universo/mis-tareas/` | Implementación actual de Gestión de Misiones. |
| `mi-universo/creciendo-por-dentro/` | Implementación actual del Motor de Semillas. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 02/11/2026 | Product Owner + AI Collaborator | V1 implementada conforme al cierre transversal: formulario derivado del catálogo, criterio opcional, ejecución fijada, evidencia y compatibilidad. Uso familiar pendiente. |
| 0.1 | 02/11/2026 | Product Owner + AI Collaborator | Decisiones funcionales aprobadas anteriores a la implementación. |

## Resumen de contenido

§1–10: decisiones aprobadas y alcance; §11: aceptación; §12–13: estado y realización técnica, enlazada a la SPEC propietaria de Misiones.

---

## 1. Origen de la decisión

La Fase A de Semillas multi-escenario permite que una misma Semilla / habilidad se practique en distintas situaciones curadas.

La familia puede necesitar dos tipos de intención al preparar una Misión:

1. **trabajar la habilidad y dejar que el alumno elija el escenario**;
2. **trabajar esa misma habilidad en una situación concreta seleccionada por la familia**.

Se aprueba conservar ambas posibilidades.

Principio:

> **Una Misión puede asignar una Semilla completa o, opcionalmente, una Semilla + escenario concreto.**

La selección de escenario es un refinamiento del objetivo de la Misión; no convierte el escenario en una nueva Semilla.

---

## 2. Decisión funcional aprobada

### 2.1 Escenario libre

Si la familia selecciona una Semilla multi-escenario y deja el escenario sin fijar:

```text
Misión
→ Semilla
→ selector de escenarios
→ el alumno elige
→ práctica
```

Ejemplo:

```text
Semilla: Yo sí puedo
Situación: Cualquier situación · Gloria elige
```

Este comportamiento conserva la libertad actual del alumno.

### 2.2 Escenario fijado por la familia

Si la familia selecciona un escenario concreto:

```text
Misión
→ Semilla
→ escenario indicado
→ práctica
```

Ejemplo:

```text
Semilla: Yo sí puedo
Situación: Algo del cole me está costando
```

El Motor debe abrir directamente ese escenario dentro del contexto de la Misión.

Durante esa ejecución no se debe ofrecer cambiar a otro escenario, porque una práctica distinta no debería satisfacer una Misión cuyo objetivo específico es otro contexto.

Fuera de la Misión, la Semilla conserva todas sus situaciones y el alumno puede elegir libremente entre ellas.

---

## 3. UX de Gestión de Misiones

Cuando:

```text
Módulo asociado = Creciendo por Dentro
+ cantidad de Semillas = 1
+ Semilla concreta seleccionada
+ esa Semilla declara escenarios
```

mostrar un control adicional equivalente a:

```text
Situación de esta Misión
[ Cualquier situación · Gloria elige ▼ ]
```

Opciones:

- `Cualquier situación · Gloria elige`;
- cada escenario activo de la Semilla seleccionada.

Reglas:

- valor predeterminado = cualquier situación;
- el selector se deriva de `semillas.json`; no mantener una lista paralela;
- si la Semilla no tiene escenarios, no mostrar el control;
- cambiar la Semilla actualiza las opciones de escenario;
- no exigir a la familia conocer IDs técnicos;
- título y descripción visibles de la Misión pueden reflejar el escenario cuando se fija, sin obligar a editar manualmente textos automáticos.

---

## 4. Alcance inicial deliberado

La primera versión se limita a:

> **una sola Semilla concreta por Misión cuando se desea fijar escenario.**

No resolver todavía una matriz como:

```text
Semilla A → escenario X
Semilla B → escenario Y
Semilla C → cualquier escenario
```

Si la Misión requiere más de una Semilla, se conserva por ahora el contrato actual por `semillasIds`, sin selección específica de escenario.

Esta restricción reduce complejidad y cubre el caso de uso principal aprobado.

---

## 5. Contrato conceptual de Misión

La Misión sigue perteneciendo al dominio general de Misiones y reutiliza `criterioCumplimiento`.

Conceptualmente:

### Misión sin escenario fijado

```json
{
  "criterioCumplimiento": {
    "modulo": "creciendo-por-dentro",
    "evidenciaTipo": "semilla_completada",
    "cantidadObjetivo": 1,
    "filtros": {
      "semillasIds": ["yo-si-puedo"]
    }
  }
}
```

### Misión con escenario fijado

El contrato final debe reutilizar los filtros existentes y añadir el identificador estable del escenario sin crear otro sistema paralelo. Conceptualmente:

```json
{
  "criterioCumplimiento": {
    "modulo": "creciendo-por-dentro",
    "evidenciaTipo": "semilla_completada",
    "cantidadObjetivo": 1,
    "filtros": {
      "semillasIds": ["yo-si-puedo"],
      "escenarioId": "algo-del-cole-me-cuesta"
    }
  }
}
```

El nombre físico final puede ajustarse en Desarrollo si el contrato vigente requiere otra representación, pero debe conservar el significado y reutilizar el mecanismo de filtros/evidencia existente.

---

## 6. Ejecución en Creciendo por Dentro

Al cargar una Misión:

1. resolver las Semillas permitidas como hoy;
2. resolver si existe filtro de escenario;
3. validar que ese escenario pertenece a la Semilla permitida;
4. si existe escenario válido, abrirlo directamente;
5. no mostrar `Cambiar situación` durante esa ejecución;
6. identificar visualmente que se trata de la situación indicada por la Misión;
7. si no existe escenario fijado, conservar el selector normal.

No cambiar el comportamiento de práctica libre fuera de Misión.

---

## 7. Evidencia y finalización

Las sesiones multi-escenario ya conservan `escenarioId` y `escenarioTitulo`.

Para que una Misión pueda exigir un escenario concreto, la evidencia `semilla_completada` debe exponer también el `escenarioId` efectivo como atributo verificable por el criterio de cumplimiento.

Regla:

- Misión sin filtro de escenario → cualquier escenario válido de la Semilla puede aportar evidencia;
- Misión con filtro de escenario → solo la evidencia del escenario requerido puede avanzar/completar esa Misión.

No fabricar ni inferir el escenario a partir del título o de `tipoSituacion`.

El identificador estable es `escenarioId`.

---

## 8. Compatibilidad

La evolución debe ser aditiva:

- Misiones antiguas sin escenario → siguen funcionando;
- Semillas sin escenarios → siguen funcionando;
- Misiones con una Semilla multi-escenario pero sin filtro de escenario → alumno elige como hoy;
- sesiones/evidencias antiguas no deben migrarse solo por esta capacidad;
- Trabajo Realizado continúa mostrando la ejecución realmente registrada;
- no crear nueva colección Firestore ni modelo paralelo de Misión.

---

## 9. Presentación para el alumno

Cuando la familia fija escenario, la UI debe comunicarlo con lenguaje sencillo y no administrativo.

Ejemplo conceptual:

> **🌱 Situación de esta Misión**  
> Algo del cole me está costando

No mostrar al alumno términos como `escenarioId`, `filtro` o `criterioCumplimiento`.

No presentar la restricción como castigo ni bloqueo.

---

## 10. Fuera de alcance de esta decisión

No se aprueba todavía:

- fijar escenarios diferentes para varias Semillas dentro de una misma Misión;
- exigir varios escenarios distintos para completar una Misión;
- porcentajes de dominio por escenario;
- recomendaciones automáticas de escenario;
- generación dinámica de escenarios;
- análisis educativo automático por frecuencia de escenario;
- transformar escenario en una entidad de Misión independiente.

---

## 11. Validación esperada cuando pase a Desarrollo

Validar al menos:

- selector solo cuando corresponde;
- valor predeterminado `Cualquier situación · Gloria elige`;
- listado derivado del catálogo real;
- Semilla sin escenarios sin cambios;
- Misión con escenario libre conserva selector del alumno;
- Misión con escenario fijado entra directamente;
- no permite cambiar de escenario dentro de esa Misión;
- práctica libre sí permite cambiar/elegir;
- evidencia contiene `escenarioId` efectivo;
- criterio de Misión distingue escenario correcto/incorrecto;
- una práctica de otro escenario no completa la Misión específica;
- edición de Misión conserva el escenario seleccionado;
- Misiones antiguas siguen funcionando;
- Persona Activa, auditoría, visibilidad, revisión familiar y Trabajo Realizado sin regresión;
- desktop/móvil, teclado/foco y revisión visual.

---

## 12. Estado

**DECISIÓN FUNCIONAL APROBADA.**

La familia podrá elegir opcionalmente el escenario de una Misión de `Creciendo por Dentro` cuando la Misión apunte a una sola Semilla concreta multi-escenario.

El valor predeterminado conservará la autonomía del alumno: **Cualquier situación · Gloria elige**.

La revisión transversal quedó cerrada y la V1 está implementada conforme a esta decisión. La aceptación de uso familiar sigue pendiente; no se declara estable el modelo multi-escenario.

## 13. Realización técnica V1

Fuente funcional canónica de la implementación y su cierre: `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md`, sección «Misiones de Semillas · situación opcional V1». Gestión deriva opciones del catálogo; criterio mínimo `semillasIds` + `escenarioId` solo cuando se fija, sin título como filtro. El Motor lee esa configuración existente al entrar desde Mi Camino, valida pertenencia y reutiliza el contexto no editable. Evidencia incluye escenario efectivo en atributos, comprobado por filtros generales. Sin cambios de colección, migración, visor, contenido o permisos.

La edición recupera la selección; la pérdida de un escenario se muestra sin reasignación y una configuración incompatible limpia la selección con aviso. Misiones iniciadas conservan el bloqueo vigente. Las Misiones múltiples y legacy no reciben requisitos de escenario. Pruebas y límites reales quedan en la SPEC, sin duplicar una segunda fuente de resultados.
