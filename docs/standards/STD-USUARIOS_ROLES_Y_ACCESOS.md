# 👥 Usuarios, Roles y Accesos
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` |
| **Versión** | 1.1 |
| **Estado** | Activo |
| **Fecha de origen** | 10/08/2026 |
| **Última actualización** | 05/09/2026 |
| **Propietario** | Identidad, Accesos y Seguridad |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Identidad USER/PERSON, Roles, niveles de acceso, Relaciones, Persona Activa, Gestión de Usuarios, auditoría básica, compatibilidad y seguridad transversal |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Gobierna:** dignidad, privacidad, autonomía y acompañamiento humano. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna/complementa:** experiencia multi-actor, Persona Activa y separación entre alumno, gestión y administración. |
| `docs/vision/MODELO-USUARIOS_ALUMNOS_Y_ROLES.md` | **Fundamenta:** visión conceptual original de identidad multi-persona; no sustituye este estándar operativo. |
| `docs/models/MODELO_ROLES.md` | **Modela:** roles funcionales; debe interpretarse junto con este estándar y revisarse cuando corresponda. |
| `docs/models/MODELO_NAVEGACION.md` | **Complementa:** navegación y requisitos de acceso por ubicación. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Implementa/aplica:** separación `consulta` / `gestion` en Mi Camino y Gestión de Misiones. |
| `compartido/js/contexto-usuario.js` | **Implementa:** resolución actual de USER, PERSON, ROLE, USER_ROLE, PERSON_RELATION, Persona Activa y nivel efectivo. |
| `compartido/modelos/navegacion.js` | **Implementa:** requisitos mínimos actuales de navegación, entre ellos `gestion` y `administracion`. |
| `administracion/usuarios/` | **Implementa:** Gestión de Usuarios actual. |
| `compartido/api/academia.js` | **Implementa:** operaciones coordinadas de Gestión de Usuarios y acceso a datos por Persona Activa. |
| `compartido/js/registro-acceso.js` | **Implementa:** observación del último acceso del USER y ubicación aproximada con minimización de datos. |
| `compartido/firebase/FireStore Rules.txt` | **Implementa:** fuente canónica de reglas Firestore del proyecto. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 05/09/2026 | Product Owner + AI Collaborator | Incorpora la V1 de observación de **Último acceso a la Academia** en Gestión de Usuarios. Define que el dato pertenece al USER autenticado, diferencia acceso observado de login técnico Firebase, formaliza ubicación aproximada ciudad/región/país, minimización de datos, ausencia de GPS/IP persistida y comportamiento no bloqueante. |
| 1.0 | 04/09/2026 | Product Owner + AI Collaborator | Aprobación del Product Owner y activación de la sincronización P1 de Usuarios, Roles y Accesos. |
| 1.0-rc1 | 04/09/2026 | Product Owner + AI Collaborator | Sincronización P1 con el producto real. Corrige la interpretación antigua de `consulta` como CRUD global de solo lectura; formaliza acceso por capacidad y Persona Activa; actualiza el rol del alumno frente a Gestión de Misiones; reconoce Gestión de Usuarios como implementada; documenta que Firebase Authentication continúa siendo el único paso manual de alta; mantiene un único Rol efectivo por Usuario; actualiza auditoría, compatibilidad legacy y Quality Gate; adopta la estructura documental vigente. |
| 0.3 | 12/08/2026 | Equipo del proyecto | Definió Auditoría Fase A para Gestión de Usuarios y bloque Registro de solo consulta. |
| 0.2 | 12/08/2026 | Equipo del proyecto | Consolidó Persona Activa, acceso profesional, login funcional y reglas para Gestión de Usuarios. |
| 0.1 | 10/08/2026 | Equipo del proyecto | Primera versión derivada del modelo de Usuarios, Alumnos y Roles. |

---

## 🎯 1. Propósito

Definir las reglas transversales que permiten saber:

- **quién está autenticado**;
- **qué Persona representa ese Usuario**;
- **sobre qué Persona se está trabajando**;
- **qué relación existe entre ambas Personas**;
- **qué nivel de acceso resulta efectivo**;
- y **qué operaciones permite cada capacidad del producto**.

La identidad no debe reducirse a un UID, un correo o una pantalla.

El modelo separa deliberadamente:

```text
USER
identidad de acceso

PERSON
persona real y propietaria de contexto/datos

ROLE / USER_ROLE
capacidad general del Usuario

PERSON_RELATION
relación y límite sobre otra Persona

PERSONA ACTIVA
contexto funcional actual
```

---

## 📐 2. Alcance y fronteras

Este estándar gobierna:

- `PERSON` y `USER`;
- identificadores estables;
- Roles y `USER_ROLE`;
- niveles `consulta`, `gestion`, `administracion`;
- `PERSON_RELATION`;
- Persona Activa;
- acceso efectivo;
- operaciones propias frente a operaciones de gestión;
- Gestión de Usuarios;
- login funcional;
- auditoría básica;
- observación administrativa del último acceso;
- compatibilidad con `usuarios/{uid}/...`;
- seguridad transversal.

No define:

- permisos particulares completos de cada módulo;
- campos físicos exhaustivos de Firestore;
- reglas pedagógicas;
- diseño visual del panel;
- impersonación;
- permisos granulares por operación;
- un backend futuro de administración de Firebase Authentication.

Cada módulo mantiene su contrato funcional y de seguridad siempre dentro de estas reglas transversales.

---

## 🧭 3. Principios no negociables

1. **PERSON representa a una persona real; USER representa una identidad de acceso.**
2. **Los datos personales/educativos pertenecen conceptualmente a la Persona, aunque parte de la persistencia continúe físicamente bajo `usuarios/{uid}` por compatibilidad.**
3. **Usuario autenticado y Persona Activa nunca se confunden.**
4. **Persona Activa ajena requiere una Relación activa válida o privilegio administrativo expresamente autorizado.**
5. **Una Relación puede restringir, pero no elevar por sí sola, la capacidad concedida por el Rol.**
6. **El nivel de acceso no es un CRUD universal de toda la Academia.**
7. **`consulta` no significa que el alumno sea incapaz de escribir sus propios datos educativos.**
8. **Las operaciones propias del alumno se autorizan según el contrato del módulo y propiedad de los datos.**
9. **`gestion` habilita capacidades adultas/de gestión únicamente donde el módulo las define y sobre Personas autorizadas.**
10. **`administracion` protege identidad, Roles, Relaciones, configuración y otras capacidades administrativas.**
11. **Ocultar botones o rutas no sustituye la seguridad real.**
12. **UI, API, contexto y Firestore Rules deben ser coherentes.**
13. **No se inventa auditoría o identidad histórica para documentos legacy.**
14. **La compatibilidad legacy no debe ocultar una inconsistencia crítica cuando el modelo nuevo ya está activo.**
15. **Se añade granularidad únicamente cuando existe una necesidad real.**
16. **La observación de acceso debe recopilar únicamente la información necesaria y no convertirse en seguimiento físico preciso del alumno.**

---

## 👤 4. PERSON

`PERSON` representa a la persona real.

Identificador estable:

```text
personaId
```

Reglas:

- obligatorio y único cuando existe PERSON del modelo nuevo;
- interno;
- estable;
- no depende de nombre, correo, login o UID visible al usuario;
- una Persona puede existir conceptualmente sin disponer todavía de USER;
- los datos personales y académicos propios de la Persona deben tender a vivir o referenciarse mediante `personaId`.

Datos actuales habituales de PERSON incluyen, según disponibilidad:

```text
nombre
apellidos
nombreVisible
fechaNacimiento
email
avatar
idioma
zonaHoraria
colegio
curso
cursoEscolar
activo
```

No todos son obligatorios.

---

## 🔐 5. USER

`USER` representa la identidad de acceso de la Academia.

Actualmente conserva, entre otros:

```text
userId
login
personaId
activo
```

### 5.1 `userId`

La implementación actual utiliza el UID de Firebase Authentication como identificador físico del USER.

Debe considerarse estable.

### 5.2 `personaId`

Asocia el USER a su Persona.

Regla vigente:

> cuando un USER declara un `personaId` del modelo nuevo, la PERSON correspondiente debe existir; una inconsistencia no debe ocultarse con fallback legacy silencioso.

### 5.3 Un USER por PERSON en la implementación vigente

El contexto actual espera como máximo un USER activo asociado a una Persona cuando necesita resolver las subcolecciones legacy bajo:

```text
usuarios/{uid}/...
```

Si una Persona relacionada tiene cero o más de un USER activo en ese contexto, la resolución debe detenerse en lugar de elegir uno arbitrariamente.

### 5.4 Último acceso observado

El **Último acceso a la Academia** es información operativa del USER autenticado, no de la Persona Activa.

Semántica vigente:

```text
Último acceso a la Academia
=
última entrada autenticada observada por la aplicación
```

No equivale necesariamente al último `signIn` de Firebase Authentication, porque la sesión técnica puede permanecer persistida entre visitas.

La V1 registra el dato bajo el USER técnico y mantiene separados:

- identidad autenticada;
- Persona Activa;
- actividad educativa;
- observación administrativa de acceso.

El último acceso **no es evidencia académica**, no completa Misiones y no genera Recompensas.

---

## 🎭 6. ROLE y USER_ROLE

### 6.1 Conceptos

`ROLE` describe una capacidad general.

`USER_ROLE` asigna el Rol al Usuario.

Actualmente:

```text
usuarioRoles/{userId}
```

utiliza el UID como ID del documento y cada Usuario dispone de **un único Rol efectivo**.

El modelo puede evolucionar en el futuro si aparece una necesidad real de múltiples Roles simultáneos, sin duplicar `roles[]` dentro de USER.

### 6.2 Roles existentes

El catálogo puede incluir Roles como:

- `alumno`;
- `consulta`;
- `gestion`;
- `administracion`.

El nombre del Rol y su `nivelAcceso` son conceptos relacionados pero distintos.

### 6.3 Rol de alumno

El alumno debe acceder a su experiencia educativa normal sin adquirir por ello capacidad adulta de Gestión.

Por tanto:

- puede consultar y operar sus experiencias propias cuando el módulo lo permite;
- puede generar sesiones, evidencias o contenido propio conforme al contrato de cada Motor;
- puede finalizar manualmente una Misión cuando corresponda;
- **no debe acceder a Gestión de Misiones**;
- **no debe acceder a Gestión de Usuarios**;
- no se concede capacidad `gestion` solo porque necesite escribir sus propios datos educativos.

Esta regla sustituye la interpretación histórica que equiparaba el rol `alumno` con `nivelAcceso = gestion`.

---

## 🪜 7. Niveles de acceso

La escala transversal actual es:

```text
consulta        10
gestion         20
administracion  30
```

### 7.1 `consulta`

Permite acceder a la experiencia normal que corresponda al Usuario/Persona y a los módulos autorizados.

**No debe interpretarse como “solo lectura global”.**

Una Persona en contexto propio puede realizar escrituras de producto autorizadas por el módulo y Firestore Rules.

Ejemplo vigente:

```text
Mi Baúl
propietario de la Persona Activa → puede crear/editar/eliminar
persona relacionada con consulta → solo consulta
persona relacionada con gestion/administracion → puede gestionar si el contrato lo permite
```

### 7.2 `gestion`

Habilita capacidades de gestión adulta cuando:

- el módulo requiere `gestion`;
- la Persona objetivo está autorizada;
- la Relación no reduce el nivel;
- API y reglas de datos permiten la operación.

Ejemplo actual:

```text
Gestión de Misiones
nivel mínimo = gestion
```

### 7.3 `administracion`

Habilita capacidades administrativas sensibles.

Ejemplo actual:

```text
Administración
→ Gestión de Usuarios
nivel mínimo = administracion
```

No todo Usuario con `gestion` puede administrar seguridad, Usuarios o Roles.

---

## 🔗 8. PERSON_RELATION

Las relaciones entre Personas se representan mediante `PERSON_RELATION`.

Estructura conceptual vigente:

```text
relationId
sourcePersonId
targetPersonId
tipoRelacion
nivelAcceso
activo
```

`tipoRelacion` describe la relación humana o profesional.

Ejemplos posibles:

- familiar;
- tutor;
- psicólogo;
- logopeda;
- otro profesional autorizado.

El tipo de relación **no sustituye al Rol**.

### 8.1 Regla de límite

Para una Persona relacionada:

```text
nivel efectivo = más restrictivo entre nivel del Rol y nivel de la Relación
```

Ejemplo:

```text
Rol del Usuario: gestion
Relación con Persona Activa: consulta
→ nivel efectivo: consulta
```

Una Relación no eleva por sí sola el nivel general del Rol.

---

## 🎯 9. Persona Activa

Persona Activa es el contexto funcional sobre el que opera la Academia.

### 9.1 Persona propia

Si no existe selección válida de otra Persona:

```text
Persona Activa = Persona propia del Usuario autenticado
```

### 9.2 Persona relacionada

Una Persona ajena solo puede convertirse en Persona Activa si:

- existe PERSON;
- existe una `PERSON_RELATION` activa válida desde la Persona propia;
- la aplicación puede resolver correctamente su contexto.

Si falla la validación, se vuelve a la Persona propia.

### 9.3 Persistencia de contexto

La implementación actual conserva la selección en `sessionStorage` y reconstruye el contexto al inicializar.

Eso es un detalle de implementación, no una identidad nueva.

### 9.4 No es impersonación

Cambiar Persona Activa no cambia:

- Firebase Authentication;
- USER autenticado;
- Persona propia del Usuario;
- autor real de una acción.

La auditoría debe atribuir la acción al Usuario real que la ejecutó.

---

## ⚖️ 10. Acceso efectivo

El acceso efectivo considera:

```text
Usuario autenticado
+ USER_ROLE / ROLE
+ Persona propia
+ Persona Activa
+ PERSON_RELATION cuando existe
+ contrato del módulo
+ propiedad de los datos
+ Firestore Rules
```

### 10.1 Contexto propio

Sobre la Persona propia, el nivel base proviene del Rol efectivo.

Pero las operaciones permitidas siguen dependiendo del contrato de cada capacidad.

### 10.2 Contexto relacionado

Sobre otra Persona:

```text
nivel efectivo = min(nivelRol, nivelRelacion)
```

### 10.3 Regla crítica

> **El nivel de acceso determina el techo de gestión, pero no reemplaza las reglas de propiedad y comportamiento del módulo.**

Esto evita dos errores opuestos:

- conceder gestión adulta al alumno para permitirle guardar su propio trabajo;
- bloquear toda escritura educativa del alumno por tener nivel `consulta`.

---

## 🧩 11. Acceso por capacidad

El producto actual utiliza requisitos mínimos donde corresponde.

Ejemplos verificados:

| Capacidad | Regla de acceso |
|---|---|
| Mi Camino y experiencias normales | Contexto autenticado + reglas del módulo |
| Mi Baúl propio | Propietario puede editar; relación requiere `gestion`/`administracion` para editar |
| Gestión de Misiones | `gestion` o superior |
| Administración | `administracion` |
| Gestión de Usuarios | `administracion` |

No debe construirse una matriz universal de CRUD que intente describir todos los módulos desde este estándar.

Cada nueva capacidad sensible declara su requisito mínimo y lo aplica en UI, API y datos.

---

## 🪪 12. Login funcional y Firebase Authentication

La Academia separa:

```text
login funcional
≠
UID Firebase Authentication
```

El acceso funcional utiliza la relación entre:

```text
accesosLogin/{login}
→ userId / authEmail
→ Firebase Authentication
→ usuarios/{uid}
```

Reglas:

- el login funcional debe ser único;
- cambiar login no debe cambiar `userId`, `personaId`, Rol, Relaciones ni propiedad histórica;
- `accesosLogin` es infraestructura de acceso y debe mantenerse coherente con USER y Firebase Authentication;
- no se debe exponer una enumeración pública de logins.

---

## 🛡️ 13. Gestión de Usuarios · estado actual

Gestión de Usuarios **ya está implementada** en:

```text
administracion/usuarios/
```

La pantalla exige administración antes de habilitar la zona funcional.

### 13.1 Capacidades actuales

La implementación permite actualmente:

- listar Usuarios y Personas;
- buscar;
- preparar un nuevo Usuario a partir de un UID de Firebase ya existente;
- editar datos personales;
- editar login funcional;
- asignar un Rol del catálogo;
- activar/inactivar el Usuario en la Academia;
- crear o actualizar una Relación opcional hacia otra Persona;
- asignar `consulta` o `gestion` sobre esa Relación;
- mostrar incidencias de consistencia;
- mostrar auditoría básica disponible;
- mostrar **Último acceso a la Academia**;
- mostrar **Ubicación aproximada del último acceso** cuando está disponible.

### 13.2 Firebase Authentication continúa manual

La creación de la cuenta de Firebase Authentication **no está automatizada por la Academia**.

Flujo actual:

```text
Administrador
→ Firebase Console / Authentication
→ crear cuenta manualmente
→ copiar UID y correo Authentication
→ Gestión de Usuarios
→ Academia coordina PERSON, USER, USER_ROLE, acceso funcional y Relación
```

La UI lo declara como **único paso manual**.

No se debe documentar todavía un backend de Firebase Admin SDK como si estuviera implementado.

### 13.3 No hay borrado físico normal

La gestión actual utiliza activación/inactivación como operación normal.

La eliminación física de identidad no debe introducirse sin análisis de dependencias, trazabilidad y seguridad.

---

## ✅ 14. Consistencia de identidad

Gestión de Usuarios trata la identidad como un conjunto coherente.

Debe detectar o impedir, según corresponda:

```text
USER sin PERSON
USER_ROLE sin USER
USER_ROLE con ROLE inexistente o inactivo
PERSON_RELATION con Persona inexistente
login duplicado
accesosLogin incoherente
Usuario activo con componentes obligatorios ausentes
```

Cuando el modelo nuevo está activo, una inconsistencia crítica debe mostrarse o detener la operación; no ocultarse mediante fallback legacy.

---

## 🕘 15. Auditoría básica y observación de acceso

### 15.1 Auditoría básica

La Fase A de auditoría utiliza, donde la entidad lo soporta:

```text
createdAt
createdBy
updatedAt
updatedBy
```

La Gestión de Usuarios muestra un bloque de solo consulta:

```text
Creado
Creado por
Última actualización
Actualizado por
```

Reglas:

- el autor es el USER autenticado real, no la Persona Activa;
- no se inventan valores históricos en documentos legacy;
- la interfaz puede resolver el UID del autor a un nombre visible sin duplicar innecesariamente el nombre en la persistencia;
- no se afirma que exista un historial universal e inmutable de cada cambio.

Una Fase B de auditoría de eventos completos requerirá diseño explícito si llega a ser necesaria.

### 15.2 Observación del último acceso V1

La observación vigente persiste únicamente el último estado conocido, no un historial de localizaciones.

Contrato actual:

```text
usuarios/{uid}/accesosAcademia/ultimo
  ultimoAccesoAcademia
  ubicacionAproximada
```

Reglas:

- fecha/hora se registra con `serverTimestamp()`;
- el registro de fecha/hora debe completarse aunque la consulta de ubicación falle;
- la consulta de ubicación no debe bloquear navegación ni uso de la Academia;
- ubicación se limita a ciudad, región, país y código de país cuando están disponibles;
- la IP pública **no se persiste**;
- no se persisten coordenadas, ISP ni código postal;
- no se solicita geolocalización GPS del navegador;
- la ubicación por IP es aproximada y no debe presentarse como dirección física exacta;
- la información se consulta desde Gestión de Usuarios, protegida por `administracion`;
- no se utiliza este dato para evaluación académica, Misiones, Recompensas ni inferencias sobre conducta del alumno.

---

## 🧬 16. Compatibilidad legacy

La transición de identidad es incremental.

El código actual mantiene compatibilidad con información histórica en:

```text
usuarios/{uid}
usuarios/{uid}/...
```

### 16.1 Fallback permitido

El fallback existe para Usuarios que todavía no han activado completamente el modelo nuevo.

### 16.2 Fallback no permitido

Cuando USER ya referencia una PERSON del modelo nuevo:

- PERSON debe existir;
- USER_ROLE activo debe resolverse;
- no debe esconderse un error de configuración mediante valores legacy arbitrarios.

### 16.3 Subcolecciones educativas

Muchas fuentes educativas continúan físicamente bajo el USER asociado a la Persona Activa.

La Academia resuelve ese USER mediante `personaId` durante la transición.

Migrar toda la persistencia a rutas por Persona no es requisito de esta versión y solo debe hacerse con beneficio y plan de compatibilidad claros.

---

## 🔒 17. Seguridad

Toda operación sensible debe sostenerse en varias capas coherentes:

```text
navegación / UI
→ contexto y permisos
→ API
→ Firestore Rules
```

Reglas:

- una ruta oculta no es una autorización;
- una validación JavaScript no sustituye Firestore;
- el cliente no contiene credenciales administrativas;
- la Persona Activa no convierte al Usuario en propietario de datos ajenos;
- la escritura sobre otra Persona requiere el permiso del módulo y nivel efectivo suficiente;
- Administración se mantiene fuera de la experiencia normal del alumno;
- la observación de acceso aplica minimización de datos y no conserva la IP pública;
- no se incorporará localización física precisa/GPS sin una decisión explícita de producto, privacidad y seguridad.

La fuente canónica de reglas Firestore del repositorio es:

```text
compartido/firebase/FireStore Rules.txt
```

Una modificación en GitHub no equivale por sí sola a despliegue de Firebase Rules.

---

## 🚫 18. Supuestos retirados de v0.3

La v1.0 deja de tratar como reglas vigentes estas afirmaciones antiguas:

1. **“`alumno` tiene `nivelAcceso = gestion`.”**  
   El alumno no necesita Gestión para escribir su propio trabajo. Gestión de Misiones requiere `gestion` y debe quedar fuera de su acceso normal.

2. **“`consulta` implica READ y prohíbe CREATE/UPDATE/DELETE en toda la Academia.”**  
   `consulta` limita gestión; las operaciones propias dependen del contrato y propiedad de cada módulo.

3. **“Gestión de Usuarios es el siguiente producto funcional prioritario.”**  
   La capacidad ya existe y está operativa en `administracion/usuarios/`.

4. **“El alta integral crea la cuenta de Firebase Authentication desde la Academia.”**  
   Actualmente la cuenta se crea manualmente y Gestión de Usuarios coordina el resto de la identidad.

5. **“Existe o debe existir ya un timeout global configurable.”**  
   No se documenta como capacidad implementada mientras no exista contrato/producto real verificado. Puede reconsiderarse si surge una necesidad de seguridad concreta.

6. **“Un único CRUD global describe el acceso.”**  
   El modelo vigente combina nivel, Persona Activa, Relación, propiedad y reglas específicas del módulo.

---

## ✅ 19. Quality Gate

Antes de crear o modificar una capacidad relacionada con identidad/acceso:

### Identidad

- [ ] USER y PERSON mantienen responsabilidades separadas.
- [ ] `userId` y `personaId` estables no se sustituyen por nombre/email/login.
- [ ] La Persona propietaria del dato está identificada correctamente.

### Persona Activa

- [ ] Se conserva durante navegación y operaciones.
- [ ] Persona ajena requiere Relación válida.
- [ ] La autoría real sigue siendo del USER autenticado.
- [ ] El retorno a Persona propia funciona ante contexto inválido.

### Acceso

- [ ] Se distingue operación propia de operación de gestión.
- [ ] No se concede `gestion` al alumno solo para permitir su actividad normal.
- [ ] Gestión de Misiones requiere `gestion` o superior.
- [ ] Administración requiere `administracion`.
- [ ] La Relación nunca eleva el Rol.

### Seguridad

- [ ] UI, API y Firestore Rules son coherentes.
- [ ] Una ruta directa no permite saltarse permisos.
- [ ] No hay credenciales administrativas en cliente.
- [ ] Una inconsistencia del modelo nuevo no se oculta con fallback legacy.

### Gestión de Usuarios

- [ ] Firebase Authentication se trata según la capacidad real existente.
- [ ] login funcional permanece desacoplado del UID.
- [ ] Rol y Relación se validan contra catálogos/Personas existentes.
- [ ] activar/inactivar conserva trazabilidad.
- [ ] auditoría no inventa datos legacy.
- [ ] último acceso se atribuye al USER autenticado, no a Persona Activa.
- [ ] fecha/hora no depende del servicio externo de ubicación.
- [ ] ubicación es aproximada y no bloqueante.
- [ ] no se persisten IP, GPS, coordenadas, ISP ni código postal.

---

## 🔄 20. Evolución

La arquitectura mantiene estable el núcleo:

```text
PERSON
USER
ROLE
USER_ROLE
PERSON_RELATION
Persona Activa
```

Posibles evoluciones —no compromisos automáticos—:

- backend seguro para automatizar creación/desactivación de Firebase Authentication;
- varios Roles simultáneos si aparece un caso real;
- ámbitos más granulares por Relación;
- permisos profesionales más específicos;
- auditoría de eventos ampliada;
- migración adicional desde rutas físicas por USER hacia propiedad directa por Persona;
- políticas de sesión si existe una necesidad concreta;
- mayor detalle de localización solo si existe una necesidad real y una decisión explícita de privacidad/seguridad.

Toda evolución debe justificar beneficio, riesgo, compatibilidad y coste de mantenimiento.

---

## 📌 21. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| URA-001 | Separar PERSON y USER como entidades con responsabilidades distintas. | Aprobada · implementada |
| URA-002 | Mantener un USER efectivo asociado a una Persona en la implementación vigente. | Aprobada · implementada |
| URA-003 | Mantener un único Rol efectivo por USER mientras no exista necesidad real de múltiples Roles. | Aprobada · implementada |
| URA-004 | Calcular el nivel sobre otra Persona como el más restrictivo entre Rol y Relación. | Aprobada · implementada |
| URA-005 | Persona Activa cambia contexto, no identidad ni autoría. | Aprobada · implementada |
| URA-006 | `consulta` no es un CRUD global de solo lectura; las operaciones propias dependen del módulo y propiedad. | Aprobada |
| URA-007 | Gestión de Misiones requiere `gestion` o superior; el alumno no recibe gestión solo para operar su experiencia normal. | Aprobada · implementada |
| URA-008 | Gestión de Usuarios requiere `administracion`. | Aprobada · implementada |
| URA-009 | Firebase Authentication continúa como paso manual en el alta actual; la Academia coordina el resto de la identidad. | Aprobada · implementada |
| URA-010 | Fallback legacy no debe ocultar inconsistencias cuando el modelo nuevo ya está activo. | Aprobada · implementada |
| URA-011 | La seguridad real requiere coherencia entre UI, API y Firestore Rules. | Aprobada |
| URA-012 | Registrar el último acceso observado del USER con fecha/hora y ubicación aproximada minimizada; sin persistir IP ni usar GPS en V1. | Aprobada · implementada · PR #78 |

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 1.1 |
| **Fecha de aprobación** | 05/09/2026 |
| **Aprobado por** | Product Owner |
| **Sustituye** | `STD-USUARIOS_ROLES_Y_ACCESOS.md` v1.0 |
| **Principio central** | Identidad autenticada, Persona Activa y permiso efectivo son conceptos distintos; el acceso se determina por contexto, Relación, propiedad y contrato de cada capacidad. La observación administrativa de acceso debe aplicar minimización de datos. |

**Impacto:** Identidad · Persona Activa · Roles · Relaciones · Mi Camino · Gestión de Misiones · Gestión de Usuarios · Seguridad · Firestore · Multi-persona