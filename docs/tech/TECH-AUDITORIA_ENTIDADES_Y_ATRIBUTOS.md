# 🔎 Auditoría técnica de Entidades y Atributos
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/tech/TECH-AUDITORIA_ENTIDADES_Y_ATRIBUTOS.md` |
| **Versión** | 1.2 |
| **Estado** | Activo como inventario técnico de referencia |
| **Fecha base inicial** | 13/08/2026 |
| **Última revisión dirigida** | 04/09/2026 |
| **Propietario** | Referencia técnica de Datos Persistidos |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Fotografía técnica de entidades, familias de atributos y deuda de normalización; no constituye norma ni esquema exhaustivo de Firestore |

## 🔗 Documentos relacionados

| Documento / fuente | Relación |
|---|---|
| `docs/standards/STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md` | **Gobierna:** convención normativa de datos y atributos. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** PERSON, USER, ROLE, relaciones y Persona Activa. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Gobierna:** semántica de Misiones/evidencia. |
| `docs/models/MODELO_MISIONES.md` | **Modela:** conceptos del dominio de Misiones. |
| `compartido/api/academia.js` | **Implementa:** persistencia compartida de múltiples dominios. |
| `compartido/api/reconocimientos.js` | **Implementa:** Reconocimientos y Guacamayas persistidos. |
| `compartido/modelos/baul.js` | **Modela/normaliza:** elementos y adjuntos de Mi Baúl. |
| `compartido/firebase/FireStore Rules.txt` | **Implementa:** fuente canónica en Git de reglas Firestore. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.2 | 04/09/2026 | Product Owner + AI Collaborator | P2. Revalida la función del documento como fotografía técnica, incorpora dominios posteriores a la base de agosto como Reconocimientos y Mi Baúl, reconoce `schemaVersion`, Persona Activa y auditoría actual, retira el conteo aproximado de 156 atributos como dato vigente y elimina la idea de que Misiones “será” la primera normalización, ya ejecutada parcialmente. |
| 1.1 | 13/08/2026 | Product Owner + AI Collaborator | Adopta prefijo `TECH-` y actualiza ruta canónica. |
| 1.0 | 13/08/2026 | Product Owner + AI Collaborator | Consolidación inicial del inventario técnico y variantes de nomenclatura. |

---

## 🎯 1. Propósito

Mantener una fotografía técnica útil de:

- entidades persistidas relevantes;
- familias de atributos;
- variantes legacy;
- puntos de normalización;
- impacto potencial de futuras migraciones.

Este documento **no define el estándar** y no debe utilizarse para inventar nuevos campos o colecciones.

La norma vigente es:

```text
docs/standards/STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md
```

---

## 📐 2. Naturaleza y límites

Esta auditoría se construye principalmente desde el **repositorio y sus contratos actuales**.

No es:

- un export completo de Firestore;
- una lista garantizada de todos los campos históricos;
- un esquema obligatorio;
- una autorización para migrar;
- una fuente funcional sobre Misiones, Usuarios u otros dominios.

Antes de una migración destructiva debe contrastarse con datos reales y reglas desplegadas.

---

## 🧩 3. Familias persistidas observadas

El repositorio contiene o referencia actualmente familias como:

```text
EVENTO
LIBRO
BIBLIOTECA_AUDIO
SESION_LECTURA
SESION_SEMILLA
TAREA / MISION
EVIDENCIA
DETECTIVES_HISTORIA
DETECTIVES_SESION
PERSON
USER
ROLE
USER_ROLE
ACCESO_LOGIN
PERSON_RELATION
RECONOCIMIENTO / GUACAMAYA
BAUL_ELEMENTO / BAUL_ADJUNTO
```

También pueden existir estructuras auxiliares, datos de prueba, compatibilidad o subcolecciones específicas de módulo.

La lista representa **familias conceptuales/técnicas observadas**, no obliga a que cada una corresponda a una colección raíz independiente.

---

## 🆕 4. Cambios relevantes desde la base 13/08

### 4.1 Identidad y Persona Activa

El modelo USER/PERSON/ROLE/PERSON_RELATION está consolidado y Persona Activa determina el contexto de múltiples operaciones.

Consecuencia para auditoría:

- `userId` y `personaId` no son sinónimos;
- autoría (`createdBy`, `updatedBy`) identifica al actor autenticado;
- propiedad/contexto puede corresponder a otra Persona autorizada;
- campos legacy como `alumnoId` deben interpretarse según su dominio propietario.

### 4.2 Misiones

Tareas/Misiones adoptó parcialmente la auditoría transversal vigente, incluyendo nombres como:

```text
createdAt
createdBy
updatedAt
updatedBy
statusChangedAt
statusChangedBy
```

Persisten campos legacy y compatibilidad; esto no autoriza una migración silenciosa.

### 4.3 Reconocimientos

El dominio operativo de Motivación persiste Reconocimientos bajo el contexto de la Persona y utiliza, entre otros:

```text
schemaVersion
userIdPersona
tipo
categoria
origen
fuentePrincipal
estado
visibleAlumno
createdAt / createdBy
updatedAt / updatedBy
```

La fuente de verdad funcional pertenece al diseño/estándar de Motivación, no a esta auditoría.

### 4.4 Mi Baúl

Mi Baúl incorpora un modelo normalizado con:

```text
schemaVersion: 1
titulo
tipo
temas
descripcion
mensajeAlumno
enlace
favorito
```

Los adjuntos incluyen metadatos y contenido validado como:

```text
schemaVersion
nombre
mimeType
tamano
dataUrl
```

El Baúl no genera Misiones, evidencias, estadísticas ni Recompensas.

---

## 🔤 5. Variantes de nomenclatura todavía observables

| Concepto | Variantes legacy / actuales | Tratamiento |
|---|---|---|
| Creación | `creadoEn`, `creadaEn`, `createdAt`, `fechaAlta` | Nuevos contratos: preferir estándar; legacy no se renombra por estética |
| Actualización | `actualizadoEn`, `actualizadaEn`, `updatedAt`, variantes específicas | Convergencia progresiva |
| Actor de creación | `creadaPorUid`, `createdBy` | Preferir `createdBy` en nuevos contratos relevantes |
| Actor de actualización | `updatedBy` o ausencia histórica | No inventar backfill |
| Usuario | `uid`, `userId`, `alumnoId`, `creadaPorUid`, `asignadaPorUid` | Interpretar por semántica; no sustituir automáticamente |
| Persona | `personaId`, `sourcePersonId`, `targetPersonId` | Mantener significado explícito |
| Estado | `estado`, `readingStatus`, `activo`, `contabilizada`, etc. | No unificar conceptos diferentes solo por nombre |
| Fechas de módulo | múltiples nombres históricos | Normalizar solo cuando el contrato se intervenga y sea seguro |

No todos los nombres de una fila representan el mismo concepto. Esta tabla marca zonas de atención.

---

## 🧱 6. Convenciones ya consolidadas para nuevo desarrollo

Según STD-008, los nuevos contratos deben tender a:

- `camelCase`;
- vocabulario funcional preferentemente en español;
- identificadores explícitos `<entidad>Id`;
- `createdAt / createdBy / updatedAt / updatedBy` cuando corresponda;
- `schemaVersion` cuando el modelo pueda requerir evolución;
- enums/estados con semántica documentada;
- datos de prueba identificables cuando entren en flujos reales;
- compatibilidad legacy explícita y eliminable;
- migraciones seguras, no estéticas.

---

## 🪜 7. Clasificación de hallazgos

Utilizar:

```text
Conforme
Legacy aceptado
Pendiente de normalización
Excepción justificada
```

Evitar la categoría implícita:

```text
"está distinto, por tanto hay que migrarlo"
```

La diferencia solo exige acción cuando afecta claridad, seguridad, reutilización, mantenimiento o una evolución concreta.

---

## 🔄 8. Estrategia de normalización

### Nivel 1 · Nuevo desarrollo

Aplicar el estándar vigente desde el inicio.

### Nivel 2 · Dominio intervenido

Revisar los campos afectados y converger cuando:

- el riesgo sea bajo;
- la compatibilidad esté controlada;
- el beneficio sea real.

### Nivel 3 · Migración global

Solo mediante decisión explícita, inventario de datos reales, plan de compatibilidad, revisión de consultas/reglas y validación posterior.

Actualmente **no existe necesidad de una migración global solo para homogeneizar nombres**.

---

## 🔥 9. Firestore real y reglas

Antes de modificar datos existentes de forma destructiva:

1. revisar código y contratos propietarios;
2. revisar `compartido/firebase/FireStore Rules.txt`;
3. verificar datos reales cuando sea necesario;
4. distinguir reglas versionadas en Git de reglas efectivamente desplegadas;
5. preparar compatibilidad/migración;
6. validar antes de retirar campos legacy.

No inferir el estado de producción únicamente desde este documento.

---

## 🛠️ 10. Mantenimiento de esta auditoría

Actualizar cuando:

- aparece una nueva familia persistida relevante;
- cambia sustancialmente un contrato de datos;
- se ejecuta una normalización con impacto transversal;
- aparece una nueva variante que aumenta deuda técnica;
- se prepara una migración.

No es necesario actualizarla por cada campo editorial o temporal.

Cuando se requiera un inventario **exhaustivo**, deberá realizarse una auditoría específica contra código + Firestore real y registrar su fecha/base exacta; no reutilizar esta fotografía como si fuera exhaustiva.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Activo como referencia técnica |
| **Versión** | 1.2 |
| **Fuente normativa** | No |
| **Norma propietaria** | `docs/standards/STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md` |
| **Uso correcto** | Evidencia técnica, deuda de normalización y preparación de impacto |
| **Uso incorrecto** | Definir esquemas nuevos o autorizar migraciones |
