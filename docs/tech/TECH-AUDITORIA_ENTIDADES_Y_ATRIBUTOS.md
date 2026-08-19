# TECH-AUDITORIA_ENTIDADES_Y_ATRIBUTOS.md

# Academia Gloria Valentina
## Auditoría técnica de entidades y atributos persistidos

**Versión:** 1.1  
**Fecha base:** 2026-08-13  
**Estado:** Activo como inventario técnico de referencia  
**Ruta canónica:** `docs/tech/TECH-AUDITORIA_ENTIDADES_Y_ATRIBUTOS.md`

---

## Historial del documento

| Versión | Fecha | Responsables | Cambios |
|---|---|---|---|
| 1.0 | 2026-08-13 | Product Owner + AI Collaborator | Consolidación inicial del inventario técnico derivado del repositorio actual y de la auditoría preliminar de nomenclatura. |
| 1.1 | 2026-08-13 | Product Owner + AI Collaborator | Adopta prefijo `TECH-` y actualiza la ruta canónica sin alterar el alcance ni la autoridad del documento. |

---

## 1. Propósito

Mantener una fotografía técnica verificable de las entidades persistidas, sus atributos y las principales variantes de nomenclatura existentes en la Academia.

Este documento **no define el estándar**. Su propietario normativo es:

```text
docs/standards/STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md
```

La auditoría permite medir el grado de adopción del estándar y estimar el impacto de futuras normalizaciones.

---

## 2. Contexto

La Academia nació como una solución puntual orientada al material escolar de 5.º de Primaria y evolucionó gradualmente hacia un producto con múltiples módulos, persistencia, usuarios, roles, relaciones, evidencias y seguimiento educativo.

La nomenclatura actual refleja esa evolución incremental. Existen atributos en español, en inglés y combinaciones de ambas convenciones.

La finalidad de esta auditoría es hacer visible esa realidad sin bloquear el desarrollo ni exigir una migración inmediata.

---

## 3. Alcance de la auditoría base

Repositorio revisado: versión proporcionada el 13/08/2026.

Se priorizaron estructuras activas y fuentes de persistencia actuales. No se utilizaron históricos como fuente de verdad para definir el estado vigente.

Entidades principales detectadas en la auditoría inicial:

```text
SISTEMA_PRUEBA
EVENTO
LIBRO
BIBLIOTECA_AUDIO
SESION_LECTURA
SESION_SEMILLA
TAREA_MISION
EVIDENCIA
DETECTIVES_HISTORIA
DETECTIVES_SESION
PERSON
USER
ROLE
USER_ROLE
ACCESO_LOGIN
PERSON_RELATION
```

La auditoría preliminar identificó aproximadamente 156 nombres de atributos distintos y confirmó que la mezcla ES/EN es transversal.

---

## 4. Principales variantes detectadas

| Concepto | Variantes observadas | Prioridad de normalización |
|---|---|---|
| Creación | `creadoEn`, `creadaEn`, `createdAt`, `fechaAlta` | Alta |
| Actualización | `actualizadoEn`, `actualizadaEn`, `updatedAt`, `observacionActualizadaEn` | Alta |
| Actor de creación | `creadaPorUid`, `createdBy` | Alta |
| Actor de actualización | `updatedBy` y ausencia del dato en distintas entidades educativas | Alta |
| Usuario | `uid`, `userId`, `alumnoId`, `creadaPorUid`, `asignadaPorUid` | Media |
| Persona | `personaId`, `sourcePersonId`, `targetPersonId` | Media |
| Estado | `estado`, `readingStatus`, `activo`, `completado`, `contabilizada` | Revisar por semántica |
| Biblioteca | `title`, `author`, `readingStatus`, `favoriteCharacter`, etc. | Alta cuando se intervenga |
| Audio Biblioteca | `audioData`, `mimeType`, `duration`, `transcript`, etc. | Alta cuando se intervenga |

No todos los nombres agrupados representan exactamente el mismo concepto; la tabla identifica áreas de revisión, no sustituciones automáticas.

---

## 5. Criterio de mantenimiento

Este documento se actualiza cuando ocurra alguno de estos casos:

1. se incorpore una entidad persistida nueva relevante;
2. se cambie sustancialmente el modelo de una entidad;
3. se normalice un módulo existente;
4. una auditoría de datos detecte una nueva variante relevante;
5. se planifique una migración que necesite estimación de impacto.

No es necesario actualizarlo por cada atributo transitorio o detalle de interfaz.

---

## 6. Relación con el estándar

La comparación se realiza contra:

```text
STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md
```

Clasificación recomendada para futuras revisiones:

```text
Conforme
Legacy aceptado
Pendiente de normalización
Excepción justificada
```

---

## 7. Estrategia de normalización

### Nivel 1 · Nuevo desarrollo

Aplicar el estándar inmediatamente.

### Nivel 2 · Módulo intervenido

Revisar y normalizar los atributos afectados cuando el coste sea proporcional.

### Nivel 3 · Migración global

Solo realizarla con decisión específica, análisis de impacto, estrategia de datos y validación de reglas/consultas.

---

## 8. Coste y beneficio estimados

| Estrategia | Coste | Beneficio | Decisión actual |
|---|---:|---:|---|
| Aplicar estándar a atributos nuevos | Muy bajo | Alto | ✅ Aplicar |
| Normalizar al intervenir un módulo | Bajo/medio | Medio/alto | ✅ Evaluar siempre |
| Migración global de toda la Academia | Alto | Medio/alto a largo plazo; bajo funcional inmediato | ⏸️ No ejecutar ahora |

---

## 9. Primera normalización prioritaria

Tareas / Misiones es el primer dominio que aplicará el nuevo estándar durante su evolución de auditoría y trazabilidad.

Objetivo de convergencia:

```text
createdAt
createdBy
updatedAt
updatedBy
estado
statusChangedAt
statusChangedBy
```

más los hitos funcionales propios del dominio.

---

## 10. Nota sobre Firestore real

El inventario se deriva principalmente del código y estructuras del repositorio actual.

Antes de una migración destructiva de una entidad existente debe contrastarse con Firestore real para detectar campos históricos o datos que ya no aparezcan en el código.

Esta comprobación no es necesaria para aplicar el estándar a desarrollo nuevo.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| Estado | Activo como inventario técnico |
| Fecha base | 13/08/2026 |
| Responsables | Product Owner + AI Collaborator |
| Documento normativo | `docs/standards/STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md` |
| Uso | Evidencia técnica, impacto y seguimiento de normalización |
| Fuente normativa | No |
