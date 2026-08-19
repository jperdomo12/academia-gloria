# TECH-USUARIOS_FIRESTORE_Y_TRANSICION.md

**Academia Gloria Valentina**  
**Diseño técnico Firestore de Personas, Usuarios, Roles, Relaciones y Gestión de Usuarios**  
**Versión:** 0.3  
**Fecha:** 2026-08-13  
**Estado:** Implementación vigente consolidada

---

## Historial del Documento

| Versión | Fecha | Responsables | Cambios |
|---|---|---|---|
| 0.1 | 2026-08-10 | Product Owner + AI Collaborator | Primera propuesta técnica. |
| 0.2 | 2026-08-12 | Product Owner + AI Collaborator | Alinea el documento con la implementación real Multi-Persona, Gestión de Usuarios gratuita y Auditoría Fase A. |
| 0.3 | 2026-08-13 | Product Owner + AI Collaborator | Actualiza referencias documentales al prefijo `TECH-` y explicita la relación con el estándar transversal de atributos. |

---

# 1. Propósito

Este documento describe la implementación técnica vigente de:

```text
PERSON
USER
ROLE
USER_ROLE
PERSON_RELATION
accesosLogin
```

y su uso por Gestión de Usuarios.

La fuente conceptual es `MODELO-USUARIOS_ALUMNOS_Y_ROLES.md`; las reglas obligatorias están en `STD-USUARIOS_ROLES_Y_ACCESOS.md`; la estructura física vigente se contrasta con `TECH-DATOS-BASE-FIRESTORE-FASE1.md`. Las convenciones transversales de nuevos atributos se rigen por `docs/standards/STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md`.

---

# 2. Principios técnicos vigentes

- `userId = UID Firebase Authentication`.
- `personaId` es interno, estable e inmutable.
- Convención de Persona: `per_001`, `per_002`, `per_003`, ...
- `login` es funcional, único y modificable.
- `USER` no duplica datos de PERSON ni de Firebase Authentication.
- `USER_ROLE` usa el UID como ID del documento.
- `PERSON_RELATION` relaciona Personas, no Usuarios.
- La creación de Firebase Authentication continúa siendo manual en la versión gratuita/Spark.
- El resto del alta se realiza desde Gestión de Usuarios mediante Firestore.
- Firestore Rules constituye la barrera de seguridad definitiva.

---

# 3. Colecciones

```text
personas
usuarios
roles
usuarioRoles
personaRelaciones
accesosLogin
```

---

# 4. PERSON → personas/{personaId}

Ejemplo:

```javascript
personas/per_001 {
  activo: true,
  nombre: "Gloria Valentina",
  apellidos: "Perdomo Pelayo",
  nombreVisible: "Gloria Valentina",
  email: "...",
  avatar: "🌈",
  fechaNacimiento: Timestamp,
  idioma: "es",
  zonaHoraria: "Europe/Madrid",
  colegio: "Colegio Gaudem",
  curso: "6º Primaria",
  cursoEscolar: "2026-2027",

  createdAt: Timestamp,   // si fue creada bajo Auditoría Fase A
  createdBy: "adminUid",
  updatedAt: Timestamp,
  updatedBy: "adminUid"
}
```

Los campos académicos y de contacto son opcionales según la Persona.

La edición se realiza con `merge` para conservar atributos existentes que la pantalla todavía no gestione.

---

# 5. USER → usuarios/{userId}

Esquema vigente y deliberadamente mínimo:

```javascript
usuarios/{uid} {
  activo: true,
  personaId: "per_001",
  login: "gloria",
  fechaAlta: Timestamp
}
```

No se almacenan aquí:

```text
authEmail
createdAt
createdBy
updatedAt
updatedBy
nombre
avatar
rol
```

`fechaAlta` es la fecha propia de alta del Usuario.

---

# 6. ROLE → roles/{roleId}

Roles vigentes:

```text
alumno
administracion
gestion
consulta
```

Ejemplo:

```javascript
roles/administracion {
  nombre: "Administración",
  nivelAcceso: "administracion",
  activo: true
}
```

Gestión de Usuarios v0.x asigna Roles existentes; no administra todavía el catálogo ROLE.

---

# 7. USER_ROLE → usuarioRoles/{userId}

```javascript
usuarioRoles/{uid} {
  userId: "{uid}",
  roleId: "administracion",
  activo: true,

  createdAt: Timestamp,
  createdBy: "adminUid",
  updatedAt: Timestamp,
  updatedBy: "adminUid"
}
```

El ID del documento es directamente el UID Firebase.

---

# 8. accesosLogin → accesosLogin/{login}

Permite resolver el login funcional antes de la autenticación:

```javascript
accesosLogin/jperdomo {
  userId: "{uid}",
  authEmail: "correo-auth@example.com",
  activo: true,

  createdAt: Timestamp,
  createdBy: "adminUid",
  updatedAt: Timestamp,
  updatedBy: "adminUid"
}
```

`authEmail` pertenece a este mecanismo técnico y a Firebase Authentication; no se duplica en USER.

Si cambia el login, se crea la nueva clave funcional y se retira la anterior conservando, cuando exista, la información original de creación.

---

# 9. PERSON_RELATION → personaRelaciones/{sourcePersonId__targetPersonId}

```javascript
personaRelaciones/per_002__per_001 {
  sourcePersonId: "per_002",
  targetPersonId: "per_001",
  tipoRelacion: "psicologo",
  nivelAcceso: "gestion",
  activo: true,

  createdAt: Timestamp,
  createdBy: "adminUid",
  updatedAt: Timestamp,
  updatedBy: "adminUid"
}
```

Una Relación nunca eleva el nivel concedido por el Rol.

---

# 10. Persona Activa

La sesión mantiene separados:

```text
Usuario autenticado
Persona propia
Persona Activa
nivel efectivo
```

Cambiar Persona Activa no cambia la identidad autenticada ni el autor de auditoría.

---

# 11. Gestión de Usuarios gratuita

Firebase Authentication se crea manualmente en Firebase Console.

Desde la Academia, un administrador mantiene de forma coordinada:

```text
usuarios/{uid}
personas/{personaId}
usuarioRoles/{uid}
accesosLogin/{login}
personaRelaciones/{source__target}
```

Las operaciones se ejecutan mediante transacción Firestore cuando corresponde.

---

# 12. Auditoría Fase A

Se auditan:

```text
PERSON
USER_ROLE
PERSON_RELATION
accesosLogin
```

Campos estándar:

```text
createdAt
createdBy
updatedAt
updatedBy
```

Reglas técnicas:

1. `createdAt/createdBy` se asignan únicamente cuando la entidad se crea realmente.
2. `updatedAt/updatedBy` se asignan en cada guardado administrativo.
3. El autor es siempre el UID del Usuario administrador autenticado.
4. Los registros legacy no reciben una creación ficticia si ese dato histórico no existe.
5. USER conserva su esquema mínimo y queda fuera de estos cuatro campos.
6. No se implementa todavía historial completo de eventos.

---

# 13. Bloque Registro

Gestión de Usuarios muestra un bloque de solo consulta:

```text
5. Registro
```

con:

```text
Creado
Creado por
Última actualización
Actualizado por
```

La interfaz puede resolver un UID a `nombreVisible` para presentación. Firestore conserva únicamente el UID como autor.

Para registros legacy, `USER.fechaAlta` puede mostrarse como fecha de alta/creación cuando no exista `createdAt`; esto no genera ni altera datos históricos en Firestore.

---

# 14. Seguridad

La administración se reconoce mediante:

```text
usuarioRoles/{request.auth.uid}
        ↓
roles/{roleId}.nivelAcceso == "administracion"
```

Las Rules permiten al administrador mantener las colecciones administrativas y conservan las restricciones de los demás usuarios.

---

# 15. Fuera de alcance actual

```text
Cloud Functions
Firebase Admin SDK
Blaze
historial completo de auditoría (Fase B)
permisos granulares por módulo
impersonación
administración del catálogo ROLE
```

---

**Fin de TECH-USUARIOS_FIRESTORE_Y_TRANSICION.md · v0.3**
