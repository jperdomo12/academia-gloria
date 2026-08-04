# Release Notes
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/RELEASE_NOTES.md` |
| **Versión del documento** | 1.0-rc1 |
| **Estado documental** | Candidato para aprobación |
| **Fecha** | 03/08/2026 |
| **Última actualización** | 03/08/2026 |
| **Propietario** | Gobierno del Producto |
| **Responsables** | Juan Perdomo + Arquitectura colaborativa con IA |
| **Ámbito** | Versionado, publicación y trazabilidad de entregas de Academia Gloria Valentina |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/DOCUMENTATION_ARCHITECTURE.md` | Define el dominio, la propiedad y el ciclo de vida de este documento. |
| `docs/DOCUMENTATION_STANDARD.md` | Gobierna su estructura, metadatos, estados y mantenimiento. |
| `docs/project/DECISION_LOG.md` | Conserva decisiones transversales de producto cuando corresponda. |
| `docs/project/ROADMAP.md` | Orienta la evolución prevista del producto sin sustituir el historial de releases. |

---

## Historial de versiones del documento

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0-rc1 | 03/08/2026 | Juan Perdomo + IA | Primera consolidación formal. Incorpora metadatos, política de versionado, estado de release, estructura común y preserva el contenido existente de `v2.3-RC6`. |

---

## 1. Propósito

Este documento registra las versiones publicadas o candidatas de **Academia Gloria Valentina** y permite conocer:

- qué versión del producto está vigente o en evaluación;
- qué cambios incorpora cada entrega;
- qué módulos fueron afectados;
- qué decisiones de producto se materializaron, cuando corresponda;
- cómo ha evolucionado el producto a lo largo del tiempo.

`RELEASE_NOTES.md` describe la evolución del producto. No sustituye al roadmap, al registro de decisiones ni a la documentación técnica.

---

## 2. Política de versionado del producto

La Academia utiliza un esquema inspirado en versionado semántico:

```text
MAYOR.MENOR.PARCHE
```

Cuando una versión todavía está en validación puede utilizar un sufijo de candidato:

```text
MAYOR.MENOR.PARCHE-RC<N>
```

Ejemplos:

- `3.0.0`
- `3.1.0`
- `3.1.1`
- `3.2.0-RC1`

### 2.1. Versión mayor

Se incrementa cuando existe un cambio significativo en la identidad, arquitectura, experiencia principal o alcance del producto.

### 2.2. Versión menor

Se incrementa cuando se incorpora una funcionalidad, módulo o evolución relevante compatible con la versión mayor vigente.

### 2.3. Versión de parche

Se incrementa cuando se publican correcciones, ajustes visuales, mejoras de contenido o cambios internos que no alteran de forma relevante la experiencia o arquitectura principal.

### 2.4. Release Candidate

Una versión `RC` es una entrega candidata a convertirse en estable. Puede utilizarse en validación real antes de su publicación definitiva.

> La versión del producto y la versión de este documento son independientes.

---

## 3. Estados de una release

| Estado | Significado |
|---|---|
| **En desarrollo** | La versión todavía está siendo construida. |
| **Release Candidate** | La versión está completa y en validación. |
| **Activa** | La versión fue aprobada como entrega vigente. |
| **Sustituida** | Una versión posterior asumió su vigencia. |
| **Retirada** | La versión dejó de utilizarse por una causa explícita. |

---

# Release actual registrada

## Academia Gloria Valentina · v2.3-RC6

| Campo | Valor |
|---|---|
| **Nombre** | Nuevas lecturas y nuevos casos de Detectives |
| **Estado de la release** | Release Candidate |
| **Fecha** | 01/08/2026 |

### Resumen

Esta entrega amplía **Mi Rincón de Lectura** y **Detectives**, incorporando nuevas historias y mejoras en el soporte visual de un caso existente.

### Mi Rincón de Lectura

Se incorporan seis lecturas nuevas en español:

- 3 de nivel 1;
- 2 de nivel 2;
- 1 de nivel 3.

Las historias trabajan:

- organización;
- escucha;
- confianza;
- autonomía;
- regulación emocional;
- empatía;
- distintos puntos de vista.

### Detectives

- Se corrige el soporte visual de `DP-0203 · Excursión al bosque`.
- La primera parte muestra niños distribuidos en grupos.
- La segunda parte muestra grupos y botellas.
- Se incorporan:
  - 6 historias nuevas de nivel 1;
  - 3 historias nuevas de nivel 2.

### Decisiones de producto incorporadas

No se registraron decisiones transversales de producto dentro de la fuente original de esta release.

Cuando una entrega materialice decisiones relevantes, esta sección deberá identificarlas y enlazarlas con `DECISION_LOG.md` si tienen impacto transversal.

---

## 4. Estructura para futuras releases

Cada nueva release deberá utilizar, como mínimo, la siguiente estructura:

```markdown
## Academia Gloria Valentina · vX.Y.Z

| Campo | Valor |
|---|---|
| Nombre | ... |
| Estado de la release | ... |
| Fecha | ... |

### Resumen

### Cambios por módulo

### Correcciones

### Decisiones de producto incorporadas
```

Las secciones sin contenido pueden omitirse cuando no aporten valor.

---

## 5. Reglas de mantenimiento

1. La release más reciente se mantiene en la parte superior del historial.
2. El contenido de una release publicada no debe reescribirse para reflejar decisiones posteriores.
3. Las correcciones editoriales pueden aplicarse sin alterar el significado histórico.
4. Toda release debe indicar versión, nombre, estado y fecha.
5. Las decisiones de producto solo se registran cuando realmente fueron materializadas por esa entrega.
6. El roadmap describe el futuro; este documento registra entregas reales o candidatas.
7. La publicación de una nueva versión debe actualizar el estado de la versión anterior cuando corresponda.

---

## 6. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| REL-001 | Mantener `RELEASE_NOTES.md` en `docs/project/`. | Aprobada |
| REL-002 | No tratar este documento como un estándar `STD-*`. | Aprobada |
| REL-003 | Diferenciar la versión del producto de la versión documental. | Aprobada |
| REL-004 | Utilizar un esquema inspirado en versionado semántico con soporte para candidatos `RC`. | Candidata a aprobación con este documento |
| REL-005 | Registrar decisiones de producto únicamente en la release que realmente las materializa. | Candidata a aprobación con este documento |

---

## DECISIÓN

**Estado:** 🟢 Aprobado

**Próximo paso:**
Revisión del ADN_ACADEMIA_GLORIA_VALENTINA.md

**Impacto:**
Versionado del Producto · Trazabilidad de Entregas · Gobierno del Producto
