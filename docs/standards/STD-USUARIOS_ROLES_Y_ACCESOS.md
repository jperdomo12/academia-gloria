# STD-USUARIOS_ROLES_Y_ACCESOS.md

**Academia Gloria Valentina**\
**Estándar de Usuarios, Roles y Accesos**\
**Versión:** 0.3\
**Estado:** Estándar vigente · Identidad Multi-Persona estabilizada

------------------------------------------------------------------------

## Historial del Documento

  ---------------------------------------------------------------------------------
  Versión                 Fecha                   Descripción
  ----------------------- ----------------------- ---------------------------------
  0.1                     2026-08-10              Primera versión derivada de
                                                  MODELO-USUARIOS_ALUMNOS_Y_ROLES
                                                  v0.4

  0.2                     2026-08-12              Consolida implementación real de
                                                  Persona Activa, acceso
                                                  profesional, login funcional y
                                                  reglas para Gestión de Usuarios
                                                  desde la Academia

  0.3                     2026-08-12              Define Auditoría Fase A para
                                                  Gestión de Usuarios y bloque
                                                  Registro de solo consulta
  ---------------------------------------------------------------------------------

------------------------------------------------------------------------

# 1. Propósito

Este estándar define las reglas mínimas de negocio y seguridad para
gestionar Personas, Usuarios, Roles, relaciones entre Personas y acceso
a datos en la Academia Gloria Valentina.

Se deriva del documento:

``` text
docs/vision/MODELO-USUARIOS_ALUMNOS_Y_ROLES.md
```

El modelo conceptual define qué entidades existen.

Este estándar define cómo deberán comportarse.

------------------------------------------------------------------------

# 2. Principios obligatorios

1.  `PERSON` representa a una persona real.
2.  `USER` representa una identidad de acceso.
3.  Una Persona puede existir sin Usuario.
4.  Una Persona podrá tener como máximo un Usuario activo de la
    Academia.
5.  Un Usuario estará asociado exactamente a una Persona.
6.  Los datos educativos y personales pertenecen a `PERSON`.
7.  Los Roles pertenecen a `USER` mediante `USER_ROLE`.
8.  Las relaciones familiares o profesionales pertenecen a
    `PERSON_RELATION`.
9.  El acceso a otra Persona requiere una relación autorizada o
    privilegio de administración.
10. La interfaz nunca será la única barrera de seguridad.
11. Las restricciones de escritura deberán aplicarse también en
    Firestore.
12. La implementación inicial deberá mantenerse sencilla.

------------------------------------------------------------------------

# 3. Identificadores

## 3.1 PERSON

Toda Persona tendrá:

``` text
personaId
```

Reglas:

-   obligatorio;
-   único;
-   interno;
-   inmutable;
-   no dependerá del nombre, email ni login.

------------------------------------------------------------------------

## 3.2 USER

Todo Usuario tendrá:

``` text
userId
login
personaId
estado
```

### userId

Debe ser:

-   obligatorio;
-   único;
-   interno;
-   inmutable.

En la implementación inicial podrá utilizarse el UID de Firebase
Authentication.

### login

Debe ser:

-   obligatorio;
-   único;
-   modificable.

El cambio de `login` nunca deberá cambiar:

-   `userId`;
-   `personaId`;
-   Roles;
-   Relaciones;
-   propiedad de datos;
-   auditoría histórica.

------------------------------------------------------------------------

# 4. Datos básicos de PERSON

Estructura conceptual mínima:

``` text
personaId
nombre
apellidos
nombreVisible
fechaNacimiento
email
avatar
estado
```

Reglas:

-   `email` es opcional;
-   una Persona puede no disponer de email;
-   `email` no es identificador;
-   `nombreVisible` podrá utilizarse para personalización de interfaz;
-   los datos educativos deberán referenciar `personaId`.

------------------------------------------------------------------------

# 5. Roles

## 5.1 Roles iniciales

La implementación vigente utiliza:

``` text
alumno
administracion
gestion
consulta
```

`alumno` identifica el uso funcional estándar del alumno y actualmente
tiene:

``` text
nivelAcceso = gestion
```

Rol y nivel de acceso son conceptos diferentes.

No se crearán Roles adicionales salvo necesidad real.

Los Roles serán datos administrables.

------------------------------------------------------------------------

## 5.2 administracion

Permite:

``` text
READ
CREATE
UPDATE
DELETE
ADMINISTRAR USUARIOS
ADMINISTRAR ROLES
ADMINISTRAR RELACIONES
ADMINISTRAR CONFIGURACIÓN
```

Su asignación deberá ser restringida.

------------------------------------------------------------------------

## 5.3 gestion

Permite, sobre la Persona autorizada:

``` text
READ
CREATE
UPDATE
DELETE
```

únicamente dentro de los módulos y datos funcionales que correspondan.

`gestion` no implica administración de seguridad, Usuarios o Roles.

------------------------------------------------------------------------

## 5.4 consulta

Permite:

``` text
READ
```

Debe impedir:

``` text
CREATE
UPDATE
DELETE
```

La restricción deberá existir en la capa de seguridad de datos.

Ocultar botones de edición no se considerará protección suficiente.

------------------------------------------------------------------------

# 6. USER_ROLE

La relación entre Usuario y Rol se almacenará conceptualmente mediante:

``` text
USER_ROLE
```

Campos mínimos:

``` text
userId
roleId
estado
```

Reglas:

-   conceptualmente, el modelo admite uno o varios Roles por Usuario;
-   en la implementación vigente cada Usuario tendrá un único Rol
    efectivo;
-   `usuarioRoles` utiliza actualmente el `userId` (UID Firebase) como
    ID del documento;
-   no se almacenará `roles[]` duplicado dentro de `USER`;
-   si aparece una necesidad real de múltiples Roles simultáneos, se
    evolucionará la estructura sin alterar `USER`;
-   la asignación y retirada de Roles deberá ser auditable.

------------------------------------------------------------------------

# 7. PERSON_RELATION

Las relaciones humanas se almacenarán entre Personas.

Estructura conceptual:

``` text
relationId
sourcePersonId
targetPersonId
tipoRelacion
nivelAcceso
estado
```

Campos opcionales futuros:

``` text
ambitosOverride[]
```

Ejemplos de `tipoRelacion`:

``` text
padre
madre
familiar
tutor
psicologo
logopeda
psicoterapeuta
otro
```

El `tipoRelacion` describe la relación.

No sustituye al Rol del Usuario.

------------------------------------------------------------------------

# 8. Niveles de acceso

Los niveles iniciales son:

``` text
consulta
gestion
administracion
```

No se añadirá mayor granularidad hasta que exista una necesidad
funcional concreta.

Una relación podrá reducir el acceso efectivo de un Usuario.

Ejemplo:

``` text
Usuario:
  rol = gestion

Relación con Gloria:
  nivelAcceso = consulta
```

Resultado:

``` text
acceso efectivo = consulta
```

Nunca una Relación elevará por sí sola el nivel general permitido por el
Rol.

------------------------------------------------------------------------

# 9. Cálculo conceptual de acceso efectivo

El acceso efectivo deberá considerar:

``` text
Usuario autenticado
        +
Roles activos
        +
Persona Activa
        +
PERSON_RELATION
        +
nivel de acceso
```

Regla general:

> El acceso efectivo será el más restrictivo entre las capacidades del
> Rol y las restricciones aplicables de la Relación.

Administrador constituye la excepción global controlada.

------------------------------------------------------------------------

# 10. Persona Activa

La aplicación maneja un contexto denominado:

``` text
Persona Activa
```

Reglas vigentes:

-   un Usuario que accede a sus propios datos tendrá como Persona Activa
    su propia Persona;
-   un Usuario autorizado podrá seleccionar otra Persona relacionada
    mediante `PERSON_RELATION` activa;
-   cambiar Persona Activa cambia exclusivamente el contexto funcional y
    de datos;
-   cambiar Persona Activa no cambia la identidad autenticada ni la
    identidad visual principal del Usuario;
-   el panel deberá continuar mostrando a la Persona propia del Usuario
    autenticado;
-   si la Persona solicitada no existe o no existe una Relación válida,
    se restablecerá la Persona propia;
-   el nivel efectivo sobre una Persona relacionada será el más
    restrictivo entre Rol y Relación.

Caso real validado:

``` text
Usuario autenticado: Azucena
Persona propia: Azucena
Persona Activa: Gloria
Relación: profesional → Gloria
```

La auditoría deberá continuar registrando a Azucena como autora real de
cualquier acción permitida.

------------------------------------------------------------------------

# 11. Persona Activa no es impersonación

Seleccionar otra Persona no significa actuar como su Usuario.

Siempre se conservará:

``` text
usuario autenticado real
persona del usuario autenticado
persona activa
```

Una futura función de impersonación para soporte será independiente,
explícita y auditable.

No forma parte de la primera implementación.

------------------------------------------------------------------------

# 12. Propiedad de datos

Los nuevos datos personales o educativos deberán tender a almacenar:

``` text
personaId
```

como identificador de propietario o destinatario.

No deberán depender conceptualmente del email, login o nombre de una
carpeta.

Durante la transición podrá mantenerse compatibilidad con:

``` text
usuarios/{uid}/...
```

------------------------------------------------------------------------

# 13. Auditoría básica · Fase A

La Gestión de Usuarios implementará inicialmente únicamente auditoría básica.

Entidades administrativas auditadas:

``` text
PERSON
USER_ROLE
PERSON_RELATION
accesosLogin
```

Campos:

``` text
createdAt
createdBy
updatedAt
updatedBy
```

Reglas:

- `createdAt` y `createdBy` se asignan al crear realmente la entidad desde la Academia;
- `updatedAt` y `updatedBy` se actualizan en cada modificación administrativa;
- `createdBy` y `updatedBy` almacenan el `userId` (UID Firebase) del Usuario administrador real;
- nunca se utilizará la Persona Activa como autor de una acción administrativa;
- los documentos legacy que no dispongan de `createdAt/createdBy` no inventarán retrospectivamente esos valores;
- `USER` mantiene su esquema mínimo vigente y no incorpora estos cuatro campos;
- `USER.fechaAlta` continúa siendo la fecha propia de alta del Usuario.

La pantalla Gestión de Usuarios mostrará un bloque:

``` text
5. Registro
```

de solo consulta con:

``` text
Creado
Creado por
Última actualización
Actualizado por
```

Cuando sea posible, la interfaz resolverá el UID del autor a su nombre visible sin duplicar ese nombre en Firestore.

La Fase B de historial completo de eventos queda expresamente fuera del alcance actual.


------------------------------------------------------------------------

# 14.
------------------------------------------------------------------------

# 14. Timeout de sesión

El timeout por inactividad será una configuración global de la Academia.

Ejemplo:

``` text
sessionTimeoutMinutes: 30
```

Reglas:

-   no se configurará individualmente por Usuario;
-   no se configurará por Rol;
-   existirá un único valor global;
-   deberá residir en la configuración general de la Academia;
-   su modificación no deberá requerir cambios de código funcional.

El valor definitivo se establecerá durante la implementación.

------------------------------------------------------------------------

# 15. Configuración vigente

``` text
ROLE
--------------------------------
alumno
administracion
gestion
consulta
```

Accesos:

  Rol               Consulta          Gestión de datos          Seguridad / Usuarios
  ---------------- ---------- -------------------------------- ----------------------
  alumno               Sí           Sí, sobre su Persona                 No
  administracion       Sí                    Sí                          Sí
  gestion              Sí      Sí, sobre Personas autorizadas            No
  consulta             Sí                    No                          No

No se implementará inicialmente una matriz compleja por módulo.

------------------------------------------------------------------------

# 16. Seguridad

Las reglas de seguridad deberán garantizar como mínimo:

``` text
consulta:
  lectura permitida
  escritura denegada

gestion:
  lectura permitida
  escritura permitida sobre Personas autorizadas

administracion:
  acceso completo autorizado
```

La aplicación deberá validar permisos antes de mostrar acciones, pero
Firestore deberá constituir la protección definitiva frente a
operaciones no autorizadas.

------------------------------------------------------------------------

# 17. Login funcional

El login visible de la Academia se mantiene separado del UID técnico de
Firebase Authentication.

La resolución utiliza:

``` text
accesosLogin/{login}
        ↓
identidad Firebase asociada
        ↓
Firebase Authentication
        ↓
usuarios/{uid}
```

Reglas:

-   `login` será único;
-   el login podrá modificarse sin cambiar `userId` ni `personaId`;
-   `accesosLogin` es infraestructura de acceso y deberá mantenerse
    consistente con USER y Firebase Authentication;
-   no se permitirá enumerar públicamente la colección de logins;
-   las escrituras de `accesosLogin` no se realizarán desde un cliente
    no privilegiado.

------------------------------------------------------------------------

# 18. Compatibilidad y transición

La implementación será incremental.

No se migrarán todos los datos existentes en una única operación.

Durante la transición:

-   Gloria deberá continuar funcionando;
-   las rutas actuales podrán seguir utilizándose;
-   los nuevos conceptos se introducirán progresivamente;
-   no se eliminará un campo o estructura antigua hasta comprobar que no
    existe dependencia técnica.

En particular:

``` text
calendarioSlug
```

no pertenece al modelo objetivo, pero no deberá eliminarse todavía
mientras exista código que lo consuma.

------------------------------------------------------------------------

# 19. Fuera de alcance inicial

Quedan fuera de la primera implementación:

-   permisos granulares por cada operación y módulo;
-   Roles especializados completos;
-   impersonación;
-   historial universal de auditoría;
-   múltiples políticas de timeout;
-   múltiples Usuarios por Persona;
-   administración avanzada de ámbitos;
-   delegación compleja de seguridad.

Estas capacidades solo se incorporarán cuando exista una necesidad real.

------------------------------------------------------------------------

# 20. Criterio de evolución

La Academia utilizará el siguiente principio:

> Empezar con reglas simples, explícitas y seguras; añadir granularidad
> únicamente cuando un caso real la justifique.

El núcleo:

``` text
PERSON
USER
ROLE
USER_ROLE
PERSON_RELATION
```

deberá mantenerse estable durante la evolución.

------------------------------------------------------------------------

# 21. Gestión de Usuarios desde la Academia

La administración manual distribuida entre Firebase Authentication y
varias colecciones de Firestore deja de considerarse un procedimiento
operativo aceptable.

La Academia deberá disponer de una función administrativa única para
gestionar Usuarios y sus Personas asociadas.

## 21.1 Objetivo

Una operación de alta deberá mantener de forma coordinada, según
corresponda:

``` text
Firebase Authentication
accesosLogin
usuarios
personas
usuarioRoles
personaRelaciones
```

El administrador no deberá tener que crear manualmente y por separado
estas piezas.

## 21.2 Operaciones iniciales

La primera versión deberá cubrir como mínimo:

``` text
CONSULTAR
CREAR
EDITAR
ACTIVAR / INACTIVAR
ASIGNAR ROL
GESTIONAR RELACIONES AUTORIZADAS
```

La eliminación física no será la operación normal.

Cuando sea suficiente, se utilizará:

``` text
activo = false
```

para conservar integridad y trazabilidad.

## 21.3 Alta integral

Antes de confirmar un alta deberán validarse como mínimo:

``` text
login único
Persona válida
Usuario válido
Rol existente y activo
coherencia USER.personaId → PERSON
coherencia USER_ROLE.userId → USER
coherencia USER_ROLE.roleId → ROLE
Relaciones sin referencias inexistentes
```

Para un profesional con acceso a Gloria, el resultado mínimo coherente
será:

``` text
PERSON profesional
        +
USER profesional
        +
USER_ROLE
        +
PERSON_RELATION profesional → Gloria
        +
accesosLogin
        +
cuenta Firebase Authentication
```

La operación deberá finalizar completa o informar claramente qué
componente no pudo crearse. No deberá dejar silenciosamente un Usuario
parcialmente configurado.

## 21.4 Edición

Modificar datos personales no deberá alterar los identificadores
estables:

``` text
personaId
userId
```

Modificar `login` deberá mantener sincronizados los mecanismos
necesarios para el acceso, sin modificar Persona, Rol, Relaciones ni
propiedad histórica de datos.

Cambiar un Rol o una Relación deberá recalcular el acceso efectivo en la
siguiente inicialización del contexto.

## 21.5 Relaciones

La administración deberá permitir definir explícitamente:

``` text
sourcePersonId
targetPersonId
tipoRelacion
nivelAcceso
activo
```

La interfaz deberá seleccionar Personas existentes; no deberá exigir
introducir manualmente identificadores internos cuando exista una
alternativa segura.

Una Relación nunca elevará el nivel concedido por el Rol.

## 21.6 Seguridad administrativa

Solo un Usuario con acceso efectivo:

``` text
administracion
```

podrá administrar Usuarios, Roles o Relaciones.

La creación, modificación o desactivación de cuentas de Firebase
Authentication requiere privilegios de servidor.

Por tanto:

> Las operaciones administrativas que requieran Firebase Admin SDK o
> privilegios equivalentes deberán ejecutarse mediante backend seguro;
> nunca exponiendo credenciales administrativas en el navegador.

Firestore continuará siendo la barrera definitiva para los datos.

## 21.7 Consistencia obligatoria

La Gestión de Usuarios deberá tratar la identidad como un conjunto
coherente y no como documentos independientes.

Antes de finalizar una operación se deberá comprobar que no existan,
entre otras, estas inconsistencias:

``` text
USER sin PERSON
USER_ROLE sin USER
USER_ROLE con ROLE inexistente/inactivo
PERSON_RELATION con PERSON inexistente
login duplicado
accesosLogin apuntando a una identidad incorrecta
Usuario activo con componentes obligatorios ausentes
```

Si el modelo nuevo está activo para un Usuario, la aplicación no deberá
ocultar una inconsistencia crítica mediante fallback legacy.

## 21.8 Auditoría

Las operaciones administrativas deberán registrar como mínimo:

``` text
createdAt
createdBy
updatedAt
updatedBy
```

`createdBy` y `updatedBy` identificarán al Usuario administrador real.

## 21.9 Primera entrega

La primera entrega de Gestión de Usuarios deberá priorizar:

``` text
1. listado y consulta de Usuarios/Personas
2. alta integral
3. edición básica
4. Rol
5. Relaciones y nivel de acceso
6. activar/inactivar
7. validación de consistencia
```

No se incorporarán todavía permisos granulares por módulo, impersonación
ni administración avanzada de ámbitos.

------------------------------------------------------------------------

# 22. Estado de implementación de Identidad Multi-Persona

A fecha 2026-08-12 se considera estabilizado funcionalmente:

``` text
USER → PERSON
USER → USER_ROLE → ROLE
Persona propia
Persona Activa
PERSON_RELATION
nivel efectivo Rol + Relación
login funcional separado del UID
acceso profesional de Azucena a Gloria
identidad visual del Usuario autenticado en el panel
Creciendo por Dentro utilizando Persona Activa
```

La Gestión de Usuarios definida en la sección 21 constituye el siguiente
producto funcional prioritario.

------------------------------------------------------------------------

**Fin de STD-USUARIOS_ROLES_Y_ACCESOS.md · v0.3**
