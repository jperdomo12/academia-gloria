# STD-USUARIOS_ROLES_Y_ACCESOS.md

**Academia Gloria Valentina**  
**Estándar de Usuarios, Roles y Accesos**  
**Versión:** 0.1  
**Estado:** Propuesta inicial para implementación

---

## Historial del Documento

| Versión | Fecha | Descripción |
|---|---|---|
| 0.1 | 2026-08-10 | Primera versión derivada de MODELO-USUARIOS_ALUMNOS_Y_ROLES v0.4 |

---

# 1. Propósito

Este estándar define las reglas mínimas de negocio y seguridad para gestionar Personas, Usuarios, Roles, relaciones entre Personas y acceso a datos en la Academia Gloria Valentina.

Se deriva del documento:

```text
docs/vision/MODELO-USUARIOS_ALUMNOS_Y_ROLES.md
```

El modelo conceptual define qué entidades existen.

Este estándar define cómo deberán comportarse.

---

# 2. Principios obligatorios

1. `PERSON` representa a una persona real.
2. `USER` representa una identidad de acceso.
3. Una Persona puede existir sin Usuario.
4. Una Persona podrá tener como máximo un Usuario activo de la Academia.
5. Un Usuario estará asociado exactamente a una Persona.
6. Los datos educativos y personales pertenecen a `PERSON`.
7. Los Roles pertenecen a `USER` mediante `USER_ROLE`.
8. Las relaciones familiares o profesionales pertenecen a `PERSON_RELATION`.
9. El acceso a otra Persona requiere una relación autorizada o privilegio de administración.
10. La interfaz nunca será la única barrera de seguridad.
11. Las restricciones de escritura deberán aplicarse también en Firestore.
12. La implementación inicial deberá mantenerse sencilla.

---

# 3. Identificadores

## 3.1 PERSON

Toda Persona tendrá:

```text
personaId
```

Reglas:

- obligatorio;
- único;
- interno;
- inmutable;
- no dependerá del nombre, email ni login.

---

## 3.2 USER

Todo Usuario tendrá:

```text
userId
login
personaId
estado
```

### userId

Debe ser:

- obligatorio;
- único;
- interno;
- inmutable.

En la implementación inicial podrá utilizarse el UID de Firebase Authentication.

### login

Debe ser:

- obligatorio;
- único;
- modificable.

El cambio de `login` nunca deberá cambiar:

- `userId`;
- `personaId`;
- Roles;
- Relaciones;
- propiedad de datos;
- auditoría histórica.

---

# 4. Datos básicos de PERSON

Estructura conceptual mínima:

```text
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

- `email` es opcional;
- una Persona puede no disponer de email;
- `email` no es identificador;
- `nombreVisible` podrá utilizarse para personalización de interfaz;
- los datos educativos deberán referenciar `personaId`.

---

# 5. Roles

## 5.1 Roles iniciales

La primera implementación utilizará únicamente:

```text
administracion
gestion
consulta
```

No se crearán inicialmente Roles adicionales salvo necesidad real.

Los Roles serán datos administrables.

---

## 5.2 administracion

Permite:

```text
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

---

## 5.3 gestion

Permite, sobre la Persona autorizada:

```text
READ
CREATE
UPDATE
DELETE
```

únicamente dentro de los módulos y datos funcionales que correspondan.

`gestion` no implica administración de seguridad, Usuarios o Roles.

---

## 5.4 consulta

Permite:

```text
READ
```

Debe impedir:

```text
CREATE
UPDATE
DELETE
```

La restricción deberá existir en la capa de seguridad de datos.

Ocultar botones de edición no se considerará protección suficiente.

---

# 6. USER_ROLE

La relación entre Usuario y Rol se almacenará conceptualmente mediante:

```text
USER_ROLE
```

Campos mínimos:

```text
userId
roleId
estado
```

Reglas:

- un Usuario podrá tener uno o varios Roles;
- no se almacenará `roles[]` duplicado dentro de `USER`;
- la asignación y retirada de Roles deberá ser auditable.

---

# 7. PERSON_RELATION

Las relaciones humanas se almacenarán entre Personas.

Estructura conceptual:

```text
relationId
sourcePersonId
targetPersonId
tipoRelacion
nivelAcceso
estado
```

Campos opcionales futuros:

```text
ambitosOverride[]
```

Ejemplos de `tipoRelacion`:

```text
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

---

# 8. Niveles de acceso

Los niveles iniciales son:

```text
consulta
gestion
administracion
```

No se añadirá mayor granularidad hasta que exista una necesidad funcional concreta.

Una relación podrá reducir el acceso efectivo de un Usuario.

Ejemplo:

```text
Usuario:
  rol = gestion

Relación con Gloria:
  nivelAcceso = consulta
```

Resultado:

```text
acceso efectivo = consulta
```

Nunca una Relación elevará por sí sola el nivel general permitido por el Rol.

---

# 9. Cálculo conceptual de acceso efectivo

El acceso efectivo deberá considerar:

```text
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

> El acceso efectivo será el más restrictivo entre las capacidades del Rol y las restricciones aplicables de la Relación.

Administrador constituye la excepción global controlada.

---

# 10. Persona Activa

La aplicación deberá manejar un contexto denominado:

```text
Persona Activa
```

Reglas:

- un Usuario alumno que accede a sus propios datos tendrá como Persona Activa su propia Persona;
- un Usuario autorizado podrá seleccionar otra Persona relacionada;
- cambiar Persona Activa cambia el contexto de datos;
- cambiar Persona Activa no cambia la identidad autenticada.

Ejemplo:

```text
Usuario autenticado: Juan
Persona Activa: Gloria
```

La auditoría deberá continuar registrando a Juan como autor de cualquier cambio.

---

# 11. Persona Activa no es impersonación

Seleccionar otra Persona no significa actuar como su Usuario.

Siempre se conservará:

```text
usuario autenticado real
persona del usuario autenticado
persona activa
```

Una futura función de impersonación para soporte será independiente, explícita y auditable.

No forma parte de la primera implementación.

---

# 12. Propiedad de datos

Los nuevos datos personales o educativos deberán tender a almacenar:

```text
personaId
```

como identificador de propietario o destinatario.

No deberán depender conceptualmente del email, login o nombre de una carpeta.

Durante la transición podrá mantenerse compatibilidad con:

```text
usuarios/{uid}/...
```

---

# 13. Auditoría básica

Toda entidad mutable relevante deberá tender a incorporar:

```text
createdAt
createdBy
updatedAt
updatedBy
```

`createdBy` y `updatedBy` deberán identificar como mínimo al Usuario responsable.

Cuando resulte útil podrán incluir:

```text
userId
personaId
roleId
```

La auditoría deberá conservar quién realizó realmente la acción aunque exista otra Persona Activa.

---

# 14. Timeout de sesión

El timeout por inactividad será una configuración global de la Academia.

Ejemplo:

```text
sessionTimeoutMinutes: 30
```

Reglas:

- no se configurará individualmente por Usuario;
- no se configurará por Rol;
- existirá un único valor global;
- deberá residir en la configuración general de la Academia;
- su modificación no deberá requerir cambios de código funcional.

El valor definitivo se establecerá durante la implementación.

---

# 15. Configuración inicial recomendada

Para la primera implementación:

```text
ROLE
--------------------------------
administracion
gestion
consulta
```

Accesos:

| Rol | Consulta | Gestión de datos | Seguridad / Usuarios |
|---|:---:|:---:|:---:|
| administracion | Sí | Sí | Sí |
| gestion | Sí | Sí | No |
| consulta | Sí | No | No |

No se implementará inicialmente una matriz compleja por módulo.

---

# 16. Seguridad

Las reglas de seguridad deberán garantizar como mínimo:

```text
consulta:
  lectura permitida
  escritura denegada

gestion:
  lectura permitida
  escritura permitida sobre Personas autorizadas

administracion:
  acceso completo autorizado
```

La aplicación deberá validar permisos antes de mostrar acciones, pero Firestore deberá constituir la protección definitiva frente a operaciones no autorizadas.

---

# 17. Compatibilidad y transición

La implementación será incremental.

No se migrarán todos los datos existentes en una única operación.

Durante la transición:

- Gloria deberá continuar funcionando;
- las rutas actuales podrán seguir utilizándose;
- los nuevos conceptos se introducirán progresivamente;
- no se eliminará un campo o estructura antigua hasta comprobar que no existe dependencia técnica.

En particular:

```text
calendarioSlug
```

no pertenece al modelo objetivo, pero no deberá eliminarse todavía mientras exista código que lo consuma.

---

# 18. Fuera de alcance inicial

Quedan fuera de la primera implementación:

- permisos granulares por cada operación y módulo;
- Roles especializados completos;
- impersonación;
- historial universal de auditoría;
- múltiples políticas de timeout;
- múltiples Usuarios por Persona;
- administración avanzada de ámbitos;
- automatización de altas de profesionales;
- delegación compleja de seguridad.

Estas capacidades solo se incorporarán cuando exista una necesidad real.

---

# 19. Criterio de evolución

La Academia utilizará el siguiente principio:

> Empezar con reglas simples, explícitas y seguras; añadir granularidad únicamente cuando un caso real la justifique.

El núcleo:

```text
PERSON
USER
ROLE
USER_ROLE
PERSON_RELATION
```

deberá mantenerse estable durante la evolución.

---

**Fin de STD-USUARIOS_ROLES_Y_ACCESOS.md · v0.1**
