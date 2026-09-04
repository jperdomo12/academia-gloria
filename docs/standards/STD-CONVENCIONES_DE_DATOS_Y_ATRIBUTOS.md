# 🧱 Convenciones de Datos y Atributos
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/standards/STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md` |
| **Código** | STD-008 |
| **Versión** | 1.1 |
| **Estado** | Activo |
| **Fecha de origen** | 13/08/2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Convenciones Transversales de Datos |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Nombres, identificadores, auditoría, estados, fechas, booleanos, referencias, versionado de esquema y adopción progresiva en datos persistidos |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** estructura, trazabilidad y mantenimiento de este estándar. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** significado de PERSON, USER, Persona Activa, identidad y autoría. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Aplica:** semántica funcional del dominio de Misiones. |
| `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` | **Implementa:** contrato funcional actual de Misiones/evidencias. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Aplica:** identidad académica, sesiones y evidencia de nuevos Temas. |
| `docs/tech/AUDITORIA_ENTIDADES_Y_ATRIBUTOS.md` | **Describe:** fotografía técnica de entidades/atributos; no sustituye esta norma. |
| `compartido/api/academia.js` | **Implementa parcialmente:** convenciones actuales y compatibilidad legacy de varios dominios. |
| `compartido/js/contexto-usuario.js` | **Implementa:** resolución de USER/PERSON/Persona Activa. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 04/09/2026 | Product Owner + AI Collaborator | Sincronización P1. Mantiene `camelCase`, vocabulario funcional preferentemente en español, identificadores técnicos y auditoría transversal; aclara PERSON/USER/Persona Activa frente a campos de compatibilidad como `alumnoId`; reconoce coexistencia legacy sin autorizar nuevas variantes; elimina la antigua autorización genérica de sacrificar datos históricos de Misiones; incorpora `schemaVersion`, datos de prueba, enums, mapas, reglas de migración segura, Quality Gate y estado real de Tareas/Misiones. |
| 1.0 | 13/08/2026 | Product Owner + AI Collaborator | Primera versión. Define convención transversal para nombres, identificadores, auditoría, estados, fechas, hitos y adopción progresiva. |

---

## 🎯 1. Propósito

Definir una convención única y predecible para **nombrar y evolucionar los datos persistidos** de la Academia.

El objetivo es reducir:

- ambigüedad;
- nombres equivalentes;
- errores de identidad;
- duplicación de esquemas;
- migraciones innecesarias;
- y dificultad para reutilizar evidencia entre módulos.

Este estándar no busca uniformidad estética perfecta.

Busca que cada nuevo dato tenga un significado claro y que la consistencia aumente progresivamente sin romper el producto.

---

## 📐 2. Alcance y fronteras

Aplica a:

- nuevas entidades persistidas;
- nuevos atributos de entidades existentes;
- cambios de modelo de datos;
- Firestore;
- objetos persistidos en otros mecanismos cuando formen parte del producto;
- DTO/objetos compartidos cuando su nombre sea parte del contrato;
- evoluciones de módulos existentes cuando se normalicen sus datos.

No obliga a:

- renombrar masivamente datos históricos;
- migrar una colección solo para mejorar estética;
- modificar nombres impuestos por Firebase, Web APIs o librerías externas;
- convertir todos los campos existentes al mismo idioma en una sola intervención;
- ni inventar auditoría histórica que nunca se registró.

---

## 🧭 3. Principios no negociables

1. **Un mismo concepto debe tender a un único nombre.**
2. **Los atributos utilizan `camelCase`.**
3. **Los conceptos funcionales se expresan preferentemente en español.**
4. **Identificadores técnicos siguen la forma `<entidad>Id` cuando identifican claramente otra entidad.**
5. **La auditoría transversal utiliza `createdAt`, `createdBy`, `updatedAt`, `updatedBy`.**
6. **Autoría y propiedad no son lo mismo.** El actor autenticado puede modificar datos pertenecientes a otra Persona autorizada.
7. **Persona Activa no se deduce de nombres de campos ambiguos.**
8. **No se crean nuevas variantes legacy por comodidad.**
9. **No se migra un dato solo por estética.**
10. **No se sacrifica historial real salvo una decisión funcional explícita, limitada y aprobada para un caso concreto.**
11. **No se inventa backfill de auditoría, sesiones o identidad histórica.**
12. **Un nuevo esquema debe reutilizar contratos compartidos antes de crear otro paralelo.**
13. **La compatibilidad temporal debe ser explícita y eliminable.**
14. **Los datos de prueba deben poder identificarse cuando participan en flujos reales.**

---

## ✍️ 4. Formato general

### 4.1 Atributos

Usar `camelCase`:

```text
nombreVisible
fechaInicio
nivelAcceso
visibleParaAlumno
actividadId
createdAt
sourcePersonId
```

Evitar crear nuevas variantes como:

```text
nombre_visible
NombreVisible
NOMBRE_VISIBLE
```

### 4.2 Nombres descriptivos

Preferir un nombre explícito a una abreviatura local.

Preferir:

```text
fechaLimite
tiempoEstimadoMinutos
historialObservaciones
```

Evitar nuevos nombres como:

```text
fLim
timeEst
histObs
```

salvo abreviaturas técnicas universalmente entendidas dentro del contrato.

### 4.3 Singular y plural

- referencia a una entidad → singular: `misionId`;
- lista de entidades/valores → plural: `respuestas`, `evidencias`, `historialObservaciones`;
- mapa u objeto compuesto → nombre semántico singular: `progreso`, `resultado`, `presentacionAlumno`.

---

## 🌐 5. Idioma y vocabulario

### 5.1 Datos funcionales

Preferentemente en español:

```text
nombre
apellidos
estado
fechaInicio
fechaLimite
tipoRelacion
nivelAcceso
requiereRevision
visibleParaAlumno
observacionActual
```

### 5.2 Conceptos técnicos transversales

Pueden permanecer en inglés cuando ya existe una convención clara y transversal:

```text
createdAt
createdBy
updatedAt
updatedBy
statusChangedAt
statusChangedBy
schemaVersion
sourcePersonId
targetPersonId
```

### 5.3 Tecnología externa

Conservar nombres propios de plataforma cuando traducirlos cause ambigüedad, por ejemplo:

- UID de Firebase Authentication;
- `localStorage`;
- MIME type;
- APIs Web.

No convertir un término tecnológico en un nombre funcional si representan cosas distintas.

---

## 🆔 6. Identificadores y actores

### 6.1 Regla base

Cuando un campo referencia una entidad, utilizar una forma que deje claro **qué tipo de identidad contiene**.

Ejemplos preferidos:

```text
personaId
userId
roleId
misionId
sesionId
actividadId
evidenciaId
```

### 6.2 PERSON frente a USER

Según el modelo vigente:

```text
personaId
→ identifica PERSON, la persona real.

userId
→ identifica USER, la identidad de acceso; actualmente coincide físicamente con UID de Firebase.
```

No son intercambiables.

### 6.3 Persona Activa

Persona Activa es un **contexto funcional**, no un tipo nuevo de identificador persistente.

Un servicio puede resolver:

```text
Persona Activa
→ personaId
→ USER asociado cuando una subcolección legacy todavía vive bajo usuarios/{uid}
```

No crear campos como `personaActivaId` por defecto si el dato realmente necesita `personaId` o `userId`.

### 6.4 `alumnoId` como compatibilidad de dominio

El dominio actual de Tareas/Misiones utiliza `alumnoId` en registros existentes y en su API.

Ese nombre debe interpretarse **según el contrato propietario de Misiones**, no como sinónimo universal de `personaId`.

Reglas:

- no introducir `alumnoId` en nuevos dominios solo por copiar Misiones;
- no asumir que su valor representa siempre PERSON;
- no renombrarlo silenciosamente mientras código, reglas y datos dependan de él;
- una futura normalización debe ser explícita y coordinada con el propietario de Misiones.

### 6.5 Relaciones dirigidas

Cuando la dirección sea relevante:

```text
sourcePersonId
targetPersonId
```

No utilizar `persona1` / `persona2` cuando la dirección tenga significado funcional.

---

## 🧾 7. Auditoría transversal

Para una entidad mutable nueva y relevante, utilizar cuando corresponda:

```text
createdAt
createdBy
updatedAt
updatedBy
```

| Atributo | Semántica |
|---|---|
| `createdAt` | instante de creación |
| `createdBy` | `userId` autenticado que creó la entidad |
| `updatedAt` | instante de última modificación relevante |
| `updatedBy` | `userId` autenticado que realizó la modificación |

### 7.1 Autoría

`createdBy` / `updatedBy` identifican al **Usuario autenticado actor**.

No deben sustituirse automáticamente por el identificador de la Persona Activa.

Ejemplo:

```text
familia autenticada
→ gestiona Misión de Gloria
→ datos pertenecen/contextualizan a Gloria
→ createdBy conserva al Usuario familiar que actuó
```

### 7.2 Reglas

- `createdAt` y `createdBy` no cambian después de creación.
- `updatedAt` y `updatedBy` cambian ante modificaciones relevantes.
- en Firestore, preferir timestamp de servidor para auditoría cuando el servicio propietario ya utiliza ese patrón;
- no inventar valores para documentos legacy que nunca los tuvieron.

### 7.3 Compatibilidad legacy

Persisten módulos con nombres como:

```text
creadoEn
actualizadoEn
creadaEn
creadaPorUid
```

Su existencia no convierte esas variantes en la nueva convención.

Cuando el módulo sea intervenido:

1. evaluar coste/beneficio de normalizar;
2. mantener lectura compatible si existen datos reales;
3. evitar backfill ficticio;
4. retirar compatibilidad solo cuando sea seguro.

---

## 🔄 8. Estado y cambios de estado

El atributo funcional general es:

```text
estado
```

Los valores pertenecen a cada dominio.

Ejemplo vigente de Misiones:

```text
pendiente
en_curso
pendiente_validacion
completada
necesita_ayuda
cancelada
```

Los enums existentes pueden utilizar `snake_case` en sus **valores**. Esto no contradice que los **nombres de atributos** utilicen `camelCase`.

### 8.1 Auditoría de estado

Cuando el dominio necesita registrar quién/cuándo produjo el último cambio efectivo:

```text
statusChangedAt
statusChangedBy
```

Solo se actualizan cuando cambia realmente `estado`.

No deben utilizarse como sustituto de un historial completo cuando el producto necesite conservar todos los cambios.

---

## 📅 9. Fechas e hitos funcionales

Las fechas propias del dominio permanecen preferentemente en español:

```text
fechaInicio
fechaLimite
fechaNacimiento
fechaHecho
fechaReconocimiento
```

Los hitos dentro de un objeto funcional pueden usar formas como:

```text
iniciadaEn
completadaEn
aplicadaEn
ocurridaEn
```

Los hitos funcionales no sustituyen la auditoría transversal.

No se obliga a usar el mismo tipo físico para todas las fechas si los contratos existentes tienen necesidades distintas; el servicio propietario debe mantener un tipo estable y documentado dentro de su dominio.

---

## ☑️ 10. Booleanos

El nombre debe expresar una condición o capacidad inequívoca.

Ejemplos:

```text
activo
visibleParaAlumno
requiereRevision
convieneRepetir
necesitaAyuda
contabilizada
esDatoPrueba
```

No se exige prefijo `is` / `has` cuando el español ya resulta claro.

Preferir condiciones positivas cuando simplifiquen el contrato.

---

## 🧩 11. Objetos anidados, listas y mapas

Los objetos anidados deben tener responsabilidad clara.

Ejemplos actuales válidos:

```text
presentacionAlumno
criterioCumplimiento
progreso
resultado
fuentePrincipal
```

Reglas:

- mantener `camelCase` también dentro de objetos;
- no duplicar en el nivel raíz el mismo dato solo por comodidad;
- no esconder dentro de `metadata` genérico información que ya tiene significado funcional estable;
- listas deben contener elementos de semántica homogénea;
- mapas dinámicos necesitan una razón real para no usar campos explícitos.

---

## 🧬 12. Versionado de esquema

Cuando una estructura persistida pueda evolucionar de forma incompatible o necesite distinguir generaciones de datos, puede utilizar:

```text
schemaVersion
```

Reglas:

- no es obligatorio en toda entidad;
- debe existir cuando realmente ayude a interpretar o migrar datos;
- su significado pertenece al contrato propietario;
- cambiar la versión exige compatibilidad, migración o rechazo explícito según el caso;
- no usar la versión como sustituto de una estrategia de evolución.

---

## 🧪 13. Datos de prueba

Cuando un dato recorre el flujo real pero debe quedar excluido de análisis, constancia o Reconocimientos, utilizar el contrato propietario de prueba; actualmente se emplea, entre otros casos:

```text
esDatoPrueba
```

Regla semántica:

> **dato de prueba puede validar funcionalidad, pero no debe convertirse en hecho educativo real.**

No inferir que un dato es de prueba únicamente por fecha, título o Usuario.

---

## 🗺️ 14. Estado actual de Tareas / Misiones

Tareas/Misiones es la primera aplicación transversal consolidada de la convención de auditoría nueva.

La implementación actual utiliza, entre otros:

```text
alumnoId
titulo
descripcion
tipo
modulo
estado
visibleParaAlumno

createdAt
createdBy
updatedAt
updatedBy

statusChangedAt
statusChangedBy

progreso.iniciadaEn
progreso.completadaEn
```

La API mantiene además lectura compatible con documentos legacy que pueden usar fechas como `actualizadaEn` o `creadaEn`.

### 14.1 Regla de evolución

La v1.0 indicaba que los campos históricos de Misiones podían sacrificarse si era necesario para dejar un modelo limpio.

Esa autorización genérica queda retirada.

Regla vigente:

> **La normalización no justifica por sí sola perder historia real.**

Si una futura migración necesita eliminar o transformar datos:

- debe existir necesidad funcional/técnica concreta;
- debe delimitarse el conjunto afectado;
- debe revisarse compatibilidad;
- debe decidirse explícitamente qué historia puede perderse y por qué;
- y debe validarse con el propietario del dominio.

---

## 🧭 15. Adopción progresiva

### Nuevo desarrollo

```text
→ aplicar este estándar desde el diseño
```

### Módulo existente intervenido

```text
→ revisar convenciones
→ normalizar solo si el beneficio compensa coste/riesgo
→ conservar compatibilidad necesaria
```

### Migración global

```text
→ no aprobada por defecto
```

Una migración transversal puede afectar:

- Firestore;
- código de lectura/escritura;
- consultas e índices;
- Firestore Rules;
- datos existentes;
- modelos/contratos;
- históricos;
- `localStorage` u otras persistencias;
- compatibilidad entre versiones desplegadas.

No debe realizarse solo para que los nombres “se vean iguales”.

---

## 🛡️ 16. Migraciones y compatibilidad

Toda migración relevante debe responder:

1. ¿qué problema real resuelve?
2. ¿qué datos existen hoy?
3. ¿qué lector/escritor depende de ellos?
4. ¿qué reglas/índices se ven afectados?
5. ¿se requiere lectura dual temporal?
6. ¿cómo se valida que no se perdió historia?
7. ¿cómo se retira la compatibilidad después?

Evitar:

- migración silenciosa al abrir una pantalla;
- reinterpretar un UID histórico como `personaId` sin evidencia;
- completar `createdBy` con el Usuario actual si el actor histórico es desconocido;
- duplicar campos antiguos y nuevos indefinidamente sin plan de retirada.

---

## 📚 17. Auditoría técnica separada

La fotografía detallada de qué entidades/campos existen en un momento concreto pertenece a:

```text
docs/tech/AUDITORIA_ENTIDADES_Y_ATRIBUTOS.md
```

Este estándar define la **regla futura y transversal**.

La auditoría técnica describe la **realidad observada**.

No se duplican ambas responsabilidades.

---

## ✅ 18. Quality Gate

Antes de añadir o modificar un dato persistido:

### Semántica

- [ ] El campo representa un concepto necesario.
- [ ] No existe ya otro nombre propietario para el mismo concepto.
- [ ] El nombre deja claro si referencia PERSON, USER u otra entidad.
- [ ] No confunde Persona Activa con actor autenticado.

### Nomenclatura

- [ ] Atributo en `camelCase`.
- [ ] Concepto funcional preferentemente en español.
- [ ] Identificador usa `<entidad>Id` cuando corresponde.
- [ ] No se crea una nueva variante legacy.

### Auditoría

- [ ] Entidad mutable relevante registra auditoría transversal cuando corresponde.
- [ ] `createdBy/updatedBy` representan al Usuario actor.
- [ ] Cambio de estado actualiza `statusChanged*` solo si el dominio lo utiliza y el estado cambió.
- [ ] No se inventa auditoría histórica.

### Arquitectura

- [ ] Se reutiliza contrato compartido antes de crear esquema privado.
- [ ] Se valoró `schemaVersion` si existe evolución incompatible.
- [ ] Los datos de prueba pueden excluirse cuando el dominio lo necesita.
- [ ] Una migración preserva historia salvo decisión explícita y justificada.

---

## 📌 19. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| DAT-001 | `camelCase` como formato general de atributos. | Aprobada |
| DAT-002 | Datos funcionales preferentemente en español. | Aprobada |
| DAT-003 | Identificadores técnicos con convención `<entidad>Id`. | Aprobada |
| DAT-004 | Auditoría transversal con `createdAt`, `createdBy`, `updatedAt`, `updatedBy`. | Aprobada |
| DAT-005 | `estado` permanece como atributo funcional general. | Aprobada |
| DAT-006 | Último cambio de estado puede usar `statusChangedAt` / `statusChangedBy`. | Aprobada |
| DAT-007 | Hitos funcionales conservan nombres de dominio como `iniciadaEn` / `completadaEn`. | Aprobada |
| DAT-008 | Todo desarrollo nuevo aplica el estándar. | Aprobada |
| DAT-009 | Módulos existentes se normalizan progresivamente al ser intervenidos. | Aprobada |
| DAT-010 | No se aprueba migración masiva únicamente por uniformidad estética. | Aprobada |
| DAT-011 | La auditoría detallada se mantiene separada en `docs/tech/`. | Aprobada |
| DAT-012 | PERSON (`personaId`) y USER (`userId`) no son identificadores intercambiables. | Aprobada |
| DAT-013 | `alumnoId` se conserva como compatibilidad propietaria de Misiones, no como convención universal. | Aprobada |
| DAT-014 | No se inventa auditoría, identidad ni sesiones históricas durante una normalización. | Aprobada |
| DAT-015 | `schemaVersion` se utiliza cuando aporta valor real para evolucionar un contrato. | Aprobada |
| DAT-016 | La normalización de nombres no autoriza pérdida genérica de historia real. | Aprobada |

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Activo |
| **Versión** | 1.1 |
| **Fecha** | 04/09/2026 |
| **Regla general** | Consistencia progresiva sin migraciones estéticas ni pérdida silenciosa de historia. |
| **Identidad** | Diferenciar PERSON, USER, Persona Activa y actor autenticado. |
| **Auditoría** | `createdAt/By`, `updatedAt/By` y `statusChangedAt/By` cuando corresponde. |
| **Migración global inmediata** | No. |
