# STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md

# Academia Gloria Valentina
## Estándar de convenciones de datos y atributos

**Versión:** 1.0  
**Fecha:** 2026-08-13  
**Estado:** ✅ Aprobado  
**Ruta canónica:** `docs/standards/STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md`

---

## Historial del documento

| Versión | Fecha | Responsables | Cambios |
|---|---|---|---|
| 1.0 | 2026-08-13 | Product Owner + AI Collaborator | Primera versión. Define la convención transversal para nombres de atributos, identificadores, auditoría, estados, fechas, hitos y adopción progresiva. |

---

## 1. Propósito

Definir una convención única y predecible para nombrar los datos persistidos y los atributos utilizados por la Academia Gloria Valentina.

El objetivo es reducir ambigüedad, duplicidades y errores, y facilitar la evolución del producto sin exigir una migración masiva inmediata de todo lo ya construido.

---

## 2. Contexto de origen

La Academia Gloria Valentina nació inicialmente como una solución puntual para acompañar el material escolar de 5.º de Primaria de Gloria Valentina.

Con el uso real fue creciendo progresivamente en módulos, persistencia, seguimiento educativo, identidad, usuarios, relaciones, misiones, evidencias y colaboración. Esa evolución ocurrió antes de disponer de una visión integral de producto y de un modelo transversal de datos.

Como consecuencia natural de ese crecimiento incremental, el repositorio actual contiene distintas convenciones de nombres, incluyendo combinaciones de español e inglés y variantes para conceptos equivalentes.

La auditoría técnica realizada el 13/08/2026 confirmó que esta situación es transversal y no está limitada a un único módulo. El detalle se mantiene separado en `docs/tech/AUDITORIA_ENTIDADES_Y_ATRIBUTOS.md` para no mezclar evidencia de situación con reglas normativas.

---

## 3. Alcance

Este estándar aplica a:

- nuevas entidades persistidas;
- nuevos atributos de entidades existentes;
- cambios de modelo de datos;
- Firestore;
- estructuras equivalentes persistidas en otros mecanismos cuando formen parte del producto;
- evoluciones de módulos existentes cuando se decida normalizar sus datos.

No obliga a renombrar inmediatamente todos los atributos históricos o ya implementados.

---

## 4. Principios

1. Un mismo concepto debe tender a tener un único nombre en toda la Academia.
2. Los nombres deben ser descriptivos, estables y predecibles.
3. Se utilizará `camelCase` para atributos.
4. Los atributos funcionales del producto se expresan preferentemente en español.
5. Los identificadores técnicos y la auditoría transversal utilizan una convención técnica común en inglés.
6. Los términos propios de Firebase, Web APIs o tecnologías externas pueden conservar su denominación técnica cuando corresponda.
7. No se realizará una migración únicamente por estética si no existe beneficio proporcional.
8. Todo desarrollo nuevo debe aplicar este estándar desde su aprobación.
9. Los módulos existentes se normalizan de forma progresiva cuando sean intervenidos o exista una migración expresamente justificada.

---

## 5. Formato general

### 5.1 Atributos

Usar `camelCase`.

Ejemplos:

```text
nombreVisible
fechaInicio
nivelAcceso
visibleParaAlumno
createdAt
sourcePersonId
```

Evitar:

```text
nombre_visible
NombreVisible
NOMBRE_VISIBLE
```

### 5.2 Abreviaturas

Evitar abreviaturas salvo términos técnicos claramente establecidos.

No crear variantes nuevas basadas en `uid` cuando el concepto que se quiere expresar es un `userId`.

---

## 6. Idioma y vocabulario

### 6.1 Datos funcionales

Los atributos propios del dominio funcional se expresan en español.

Ejemplos:

```text
nombre
apellidos
nombreVisible
estado
fechaInicio
fechaLimite
tipoRelacion
nivelAcceso
requiereRevision
visibleParaAlumno
```

### 6.2 Identificadores técnicos

Se utiliza la forma `<entidad>Id`.

Ejemplos:

```text
userId
personaId
roleId
misionId
sesionId
actividadId
evidenciaId
```

Cuando una relación tenga dirección explícita:

```text
sourcePersonId
targetPersonId
```

### 6.3 Términos tecnológicos

Los nombres técnicos establecidos pueden permanecer en inglés cuando representan directamente un concepto de la tecnología y traducirlos generaría más ambigüedad que beneficio.

---

## 7. Auditoría transversal

Toda entidad mutable relevante debe utilizar, cuando corresponda:

```text
createdAt
createdBy
updatedAt
updatedBy
```

Semántica:

| Atributo | Significado |
|---|---|
| `createdAt` | Fecha/hora de creación de la entidad |
| `createdBy` | `userId` autenticado que creó la entidad |
| `updatedAt` | Fecha/hora de la última modificación de la entidad |
| `updatedBy` | `userId` autenticado que realizó la última modificación |

Reglas:

- `createdAt` y `createdBy` no deben cambiar después de la creación.
- `updatedAt` y `updatedBy` se actualizan ante modificaciones relevantes.
- No crear nuevas variantes como `creadaEn`, `creadoEn`, `actualizadaEn`, `actualizadoEn`, `creadaPorUid` o equivalentes.
- La auditoría transversal no sustituye hitos funcionales ni un eventual historial completo.

---

## 8. Estado

El atributo funcional general se mantiene en español:

```text
estado
```

Los valores del estado pertenecen al dominio de cada entidad.

Ejemplo para Misiones:

```text
pendiente
en_curso
pendiente_validacion
completada
necesita_ayuda
cancelada
```

Cuando sea necesario conocer específicamente cuándo y quién produjo el último cambio de estado, utilizar:

```text
statusChangedAt
statusChangedBy
```

Semántica:

- `statusChangedAt`: fecha/hora del último cambio efectivo de `estado`.
- `statusChangedBy`: `userId` del usuario autenticado que produjo el cambio.

Estos campos solo se actualizan cuando cambia efectivamente `estado`; no ante una modificación general de la entidad.

---

## 9. Fechas e hitos funcionales

Las fechas propias del dominio permanecen en español.

Ejemplos:

```text
fechaInicio
fechaLimite
fechaNacimiento
```

Los hitos funcionales pueden utilizar la convención verbal `...En` cuando expresa claramente un evento del dominio.

Ejemplos:

```text
iniciadaEn
completadaEn
aplicadaEn
ocurridaEn
```

Estos campos no sustituyen `createdAt` ni `updatedAt`.

---

## 10. Booleanos

Los booleanos deben expresar claramente una condición o capacidad.

Ejemplos:

```text
activo
visibleParaAlumno
requiereRevision
convieneRepetir
necesitaAyuda
contabilizada
```

No se exige el prefijo técnico `is` o `has` cuando el nombre en español ya es inequívoco.

---

## 11. Relaciones y actores

Los atributos que apuntan a otra entidad deben identificar claramente el tipo de destino.

Ejemplos:

```text
personaId
userId
roleId
misionId
sesionId
actividadId
```

Para actores de auditoría se utiliza directamente:

```text
createdBy
updatedBy
statusChangedBy
```

El valor representa un `userId`.

Para una asignación funcional puede utilizarse:

```text
assignedBy
```

cuando sea necesario distinguir quién asignó una entidad de quién la creó.

---

## 12. Aplicación inmediata a Tareas / Misiones

La evolución actual de Tareas / Misiones debe converger hacia:

```text
alumnoId
titulo
descripcion
tipo
modulo
estado

createdAt
createdBy
updatedAt
updatedBy

statusChangedAt
statusChangedBy

progreso.iniciadaEn
progreso.completadaEn
```

Cuando aplique una asignación explícita:

```text
assignedBy
```

Los campos históricos equivalentes podrán eliminarse o sustituirse en esta evolución porque se ha aceptado sacrificar los datos históricos actuales de Tareas / Misiones si resulta necesario para dejar un modelo limpio.

---

## 13. Adopción en lo ya implementado

### 13.1 Desde la aprobación

Todo atributo nuevo debe seguir este estándar.

**Coste:** muy bajo.  
**Beneficio:** alto, porque evita aumentar la inconsistencia existente.

### 13.2 Cuando se intervenga un módulo existente

Al modificar de forma significativa un módulo, se debe evaluar si conviene normalizar sus atributos en la misma intervención.

Ejemplos:

- Biblioteca;
- Mi Rincón de Lectura;
- Detectives de Problemas;
- Creciendo por Dentro;
- Eventos;
- Evidencias.

**Coste:** bajo o medio, dependiendo de persistencia, reglas, consultas y datos existentes.  
**Beneficio:** medio/alto en mantenibilidad y comprensión.

### 13.3 Migración global

No se aprueba actualmente una migración masiva de todas las entidades solo para uniformar nombres.

Una migración global puede afectar:

- Firestore;
- código de lectura y escritura;
- consultas e índices;
- Firestore Rules;
- datos existentes;
- modelos y contratos;
- localStorage u otros mecanismos persistentes;
- compatibilidad entre versiones.

**Coste:** alto.  
**Beneficio funcional inmediato:** bajo.  
**Beneficio técnico de largo plazo:** medio/alto.

Solo debe ejecutarse si una futura evolución hace que el beneficio supere claramente el coste y el riesgo.

---

## 14. Auditoría de situación e inventario

La auditoría detallada de entidades y atributos **no forma parte normativa de este estándar**.

Se mantiene en:

```text
docs/tech/AUDITORIA_ENTIDADES_Y_ATRIBUTOS.md
```

Razón:

- el estándar define cómo deben nombrarse los datos;
- la auditoría describe qué existe realmente en un momento determinado;
- separar ambas responsabilidades evita que una fotografía técnica convierta el estándar en un documento histórico o excesivamente voluminoso.

Este estándar conserva únicamente las conclusiones necesarias para gobernar el futuro.

---

## 15. Regla de evolución

La Academia no debe detener su evolución para alcanzar uniformidad perfecta.

La regla es:

```text
Nuevo desarrollo         → cumplir el estándar
Módulo intervenido       → evaluar normalización
Migración global         → solo con beneficio justificado
```

La consistencia debe crecer progresivamente con el producto.

---

## 16. Decisiones adoptadas

| ID | Decisión |
|---|---|
| DAT-001 | `camelCase` como formato general de atributos |
| DAT-002 | Datos funcionales preferentemente en español |
| DAT-003 | Identificadores técnicos con convención `<entidad>Id` |
| DAT-004 | Auditoría transversal con `createdAt`, `createdBy`, `updatedAt`, `updatedBy` |
| DAT-005 | `estado` permanece como atributo funcional general |
| DAT-006 | Último cambio de estado con `statusChangedAt` y `statusChangedBy` cuando sea requerido |
| DAT-007 | Hitos funcionales conservan nombres de dominio como `iniciadaEn` y `completadaEn` |
| DAT-008 | Todo desarrollo nuevo aplica el estándar desde su aprobación |
| DAT-009 | Los módulos existentes se normalizan progresivamente al ser intervenidos |
| DAT-010 | No se aprueba una migración masiva únicamente por uniformidad estética |
| DAT-011 | La auditoría detallada se mantiene separada en `docs/tech/` |

---

## DECISIÓN

| Campo | Valor |
|---|---|
| Estado | ✅ Aprobado |
| Versión activa | 1.0 |
| Fecha | 13/08/2026 |
| Responsables | Product Owner + AI Collaborator |
| Aplicación | Toda nueva evolución de datos de la Academia |
| Migración inmediata global | No |
| Primera aplicación | Tareas / Misiones |
