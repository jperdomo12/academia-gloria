# TECH-USUARIOS_FIRESTORE_Y_TRANSICION.md

**Academia Gloria Valentina**  
**Diseño técnico Firestore de Personas, Usuarios, Roles y Relaciones**  
**Versión:** 0.1  
**Estado:** Propuesta técnica inicial

---

## Historial del Documento

| Versión | Fecha | Descripción |
|---|---|---|
| 0.1 | 2026-08-10 | Primera definición técnica derivada del modelo y estándar de Usuarios, Roles y Accesos |

---

# 1. Propósito

Este documento traduce a un diseño técnico inicial los conceptos definidos en:

```text
docs/vision/MODELO-USUARIOS_ALUMNOS_Y_ROLES.md
STD-USUARIOS_ROLES_Y_ACCESOS.md
```

Su objetivo es establecer:

- colecciones Firestore objetivo;
- identificadores;
- referencias entre entidades;
- datos mínimos;
- acceso efectivo;
- Persona Activa;
- auditoría;
- configuración global de sesión;
- compatibilidad con la estructura actual;
- transición incremental sin romper la Academia existente.

No pretende construir todavía una plataforma completa de administración de usuarios.

---

# 2. Principio técnico principal

La arquitectura objetivo separa:

```text
PERSON
USER
ROLE
USER_ROLE
PERSON_RELATION
```

de los datos funcionales de cada Persona.

El sistema actual utiliza ampliamente:

```text
usuarios/{uid}/...
```

La transición será progresiva.

La primera implementación NO moverá de forma masiva las subcolecciones existentes.

---

# 3. Colecciones objetivo

Se proponen cinco colecciones principales:

```text
personas
usuarios
roles
usuarioRoles
personaRelaciones
```

y una colección/configuración global:

```text
configuracion
```

---

# 4. PERSON → personas/{personaId}

## 4.1 Documento

```javascript
personas/{personaId}
{
  nombre: "Gloria",
  apellidos: "...",
  nombreVisible: "Gloria Valentina",
  fechaNacimiento: "...",
  email: null,
  avatar: "...",
  estado: "activo",

  createdAt: Timestamp,
  createdBy: "userId",
  updatedAt: Timestamp,
  updatedBy: "userId"
}
```

## 4.2 Reglas

`personaId`:

- se genera una sola vez;
- no utiliza email;
- no utiliza login;
- no depende del nombre;
- no cambia.

`email`:

- es opcional;
- pertenece a la Persona;
- no se utiliza como clave.

---

# 5. USER → usuarios/{userId}

## 5.1 Documento objetivo

```javascript
usuarios/{userId}
{
  login: "gvpp",
  personaId: "personaGloria",
  estado: "activo",

  createdAt: Timestamp,
  createdBy: "userId",
  updatedAt: Timestamp,
  updatedBy: "userId"
}
```

## 5.2 Identificador

En la primera implementación:

```text
userId = Firebase Authentication uid
```

Esto evita una capa adicional de traducción.

No obstante:

```text
login != userId
```

`login` será un identificador externo único y modificable.

---

# 6. ROLE → roles/{roleId}

Primera configuración:

```text
administracion
gestion
consulta
```

Ejemplo:

```javascript
roles/consulta
{
  nombre: "Consulta",
  nivelAcceso: "consulta",
  activo: true,
  descripcion: "Acceso exclusivamente de lectura.",

  createdAt: Timestamp,
  createdBy: "userId",
  updatedAt: Timestamp,
  updatedBy: "userId"
}
```

Ejemplo:

```javascript
roles/gestion
{
  nombre: "Gestión",
  nivelAcceso: "gestion",
  activo: true
}
```

Ejemplo:

```javascript
roles/administracion
{
  nombre: "Administración",
  nivelAcceso: "administracion",
  activo: true
}
```

No se implementará inicialmente una tabla detallada de permisos.

---

# 7. USER_ROLE → usuarioRoles/{userId_roleId}

La asociación entre Usuario y Rol se almacenará de forma explícita.

Ejemplo de ID:

```text
{userId}_{roleId}
```

Documento:

```javascript
usuarioRoles/{userId_roleId}
{
  userId: "firebaseUid",
  roleId: "gestion",
  estado: "activo",

  createdAt: Timestamp,
  createdBy: "adminUid",
  updatedAt: Timestamp,
  updatedBy: "adminUid"
}
```

Ventaja:

- consulta sencilla;
- no duplica `roles[]` dentro del Usuario;
- permite auditoría;
- permite ampliar Roles sin modificar USER.

---

# 8. PERSON_RELATION → personaRelaciones/{relationId}

Documento:

```javascript
personaRelaciones/{relationId}
{
  sourcePersonId: "personaJuan",
  targetPersonId: "personaGloria",
  tipoRelacion: "padre",
  nivelAcceso: "gestion",
  estado: "activo",

  createdAt: Timestamp,
  createdBy: "adminUid",
  updatedAt: Timestamp,
  updatedBy: "adminUid"
}
```

Ejemplos:

```text
Juan   → Gloria   padre
Anais  → Gloria   madre
Tutor  → Gloria   tutor
Psic.  → Gloria   psicologo
```

En la primera implementación no es obligatorio utilizar:

```text
ambitosOverride[]
```

Se incorporará únicamente si aparece un caso real que lo necesite.

---

# 9. Persona Activa

La Persona Activa no necesita inicialmente una colección independiente.

Se resolverá durante la sesión.

Conceptualmente:

```javascript
contextoSesion = {
  userId,
  personaUsuarioId,
  personaActivaId,
  nivelAcceso
}
```

Para un alumno accediendo a sí mismo:

```text
personaUsuarioId = personaActivaId
```

Para un padre consultando a Gloria:

```text
personaUsuarioId = personaJuan
personaActivaId  = personaGloria
```

La identidad autenticada nunca cambia.

---

# 10. Resolución inicial del acceso

Proceso conceptual:

```text
Firebase Auth UID
       │
       ▼
usuarios/{uid}
       │
       ├── personaId
       │
       ▼
usuarioRoles
       │
       ▼
nivel del Rol
       │
       ▼
si Persona Activa != Persona propia
       │
       ▼
buscar PERSON_RELATION
       │
       ▼
nivel efectivo
```

Regla:

```text
nivel efectivo = nivel más restrictivo
                 entre Rol y Relación
```

Ejemplo:

```text
Rol = gestion
Relación = consulta

Resultado = consulta
```

---

# 11. Jerarquía inicial de niveles

Para simplificar comprobaciones:

```text
consulta        = 10
gestion         = 20
administracion  = 30
```

Estos números son internos.

La interfaz seguirá utilizando los nombres.

Ejemplo:

```javascript
const NIVEL = {
  consulta: 10,
  gestion: 20,
  administracion: 30
};
```

Esto permite comprobaciones simples:

```javascript
nivelActual >= NIVEL.gestion
```

---

# 12. Solo lectura

Un Usuario con acceso efectivo:

```text
consulta
```

podrá realizar:

```text
get
list
query
```

y no podrá realizar:

```text
create
update
delete
```

La interfaz deberá ocultar/desactivar acciones de edición.

Firestore deberá impedirlas igualmente.

---

# 13. Configuración global

Se propone:

```text
configuracion/academia
```

Documento:

```javascript
{
  sessionTimeoutMinutes: 30,

  updatedAt: Timestamp,
  updatedBy: "userId"
}
```

El valor podrá modificarse sin alterar módulos funcionales.

No se implementarán timeouts diferentes por Usuario o Rol.

---

# 14. Auditoría

Todas las nuevas entidades mutables relevantes utilizarán:

```text
createdAt
createdBy
updatedAt
updatedBy
```

Para la primera versión:

```text
createdBy = userId
updatedBy = userId
```

No se duplicará inicialmente un objeto completo con Persona y Rol.

Esos datos podrán resolverse a partir del Usuario si fuera necesario.

---

# 15. Situación actual

Actualmente el documento:

```text
usuarios/{uid}
```

cumple simultáneamente varias funciones:

- usuario autenticado;
- perfil personal;
- propietario de datos;
- contexto del alumno.

Además existen subcolecciones como:

```text
usuarios/{uid}/eventos
usuarios/{uid}/tareas
usuarios/{uid}/evidencias
usuarios/{uid}/sesionesLectura
usuarios/{uid}/sesionesSemillas
usuarios/{uid}/biblioteca
```

No se modificarán todas simultáneamente.

---

# 16. Estrategia de transición

La transición se divide en fases pequeñas.

## Fase 0 — Preparación

Sin modificar comportamiento funcional:

1. Crear los tres Roles.
2. Crear PERSON para Gloria.
3. Adaptar el documento USER de Gloria para incluir:
   - `personaId`;
   - `login`;
   - `estado`.
4. Crear USER_ROLE para Gloria.
5. Crear configuración global.

Resultado:

```text
La Academia sigue funcionando como hoy.
```

---

## Fase 1 — Servicio de contexto

Crear un servicio central:

```text
contexto-usuario.js
```

Responsabilidades:

- obtener USER autenticado;
- resolver PERSON;
- obtener Roles;
- resolver Persona Activa;
- calcular nivel de acceso;
- responder capacidades básicas.

Interfaz conceptual:

```javascript
ContextoUsuario.inicializar()
ContextoUsuario.obtenerUsuario()
ContextoUsuario.obtenerPersona()
ContextoUsuario.obtenerPersonaActiva()
ContextoUsuario.obtenerNivelAcceso()
ContextoUsuario.puedeConsultar()
ContextoUsuario.puedeGestionar()
ContextoUsuario.esAdministrador()
```

Los módulos no deberán consultar directamente Roles o Relaciones.

---

## Fase 2 — Primer Usuario adulto

Crear una Persona y Usuario adulto real.

Ejemplo:

```text
Juan
```

Crear:

```text
PERSON Juan
USER Juan
USER_ROLE Juan → gestion
PERSON_RELATION Juan → Gloria → padre → gestion
```

Agregar selector/contexto de Persona Activa únicamente para este Usuario adulto.

Esta será la primera prueba real multi-persona.

---

## Fase 3 — Validar CONSULTA

Crear un Usuario de prueba:

```text
rol = consulta
```

Relacionarlo con Gloria:

```text
nivelAcceso = consulta
```

Validar:

- puede entrar;
- puede navegar;
- puede consultar datos;
- no puede crear;
- no puede editar;
- no puede eliminar;
- Firestore rechaza escritura manual.

Esta prueba deberá realizarse antes de ampliar Roles.

---

## Fase 4 — Adaptar módulos por prioridad

Orden recomendado:

```text
1. Perfil / panel de usuario
2. Mi Camino / Misiones
3. Calendario
4. Biblioteca
5. Rincón de Lectura
6. Aventuras Matemáticas
7. Creciendo por Dentro
```

Cada módulo deberá comenzar a obtener:

```text
personaActivaId
```

desde ContextoUsuario.

---

## Fase 5 — Propiedad de datos por Persona

Solo después de validar el modelo multi-persona se decidirá si los datos funcionales migran físicamente desde:

```text
usuarios/{uid}/...
```

hacia una organización del tipo:

```text
personas/{personaId}/...
```

No se toma todavía esa decisión como obligatoria.

El servicio de datos podrá ocultar la ubicación física.

---

# 17. Estrategia de compatibilidad

Durante la transición podrá utilizarse:

```javascript
function resolverPropietarioDatos(contexto) {
  if (moduloMigrado) {
    return contexto.personaActivaId;
  }

  return contexto.uidLegacy;
}
```

La implementación real podrá ser diferente.

El principio es:

> La pantalla no debe conocer si un módulo todavía usa UID o ya usa personaId.

Esta responsabilidad corresponde a la capa de datos.

---

# 18. Qué NO hacer

No se deberá:

- migrar todas las colecciones simultáneamente;
- cambiar todas las URLs;
- crear HTML por Persona;
- usar email como ID;
- usar login como clave de datos educativos;
- duplicar Roles dentro de USER;
- implementar docenas de permisos;
- incorporar impersonación ahora;
- borrar `calendarioSlug` antes de retirar sus dependencias;
- modificar Firestore sin posibilidad de compatibilidad con Gloria.

---

# 19. Modelo inicial mínimo real

Para comenzar a implementar son suficientes:

```text
personas/{personaGloria}
usuarios/{uidGloria}
roles/administracion
roles/gestion
roles/consulta
usuarioRoles/{uidGloria_role}
configuracion/academia
```

`personaRelaciones` será necesario cuando incorporemos el primer adulto relacionado.

Por tanto, la infraestructura puede introducirse sin cambiar inicialmente ninguna experiencia de Gloria.

---

# 20. Prueba mínima de aceptación

La primera prueba técnica completa deberá demostrar:

```text
1. Gloria inicia sesión.
2. Firebase devuelve su UID.
3. USER resuelve personaId.
4. USER_ROLE resuelve su Rol.
5. ContextoUsuario establece Persona Activa = Gloria.
6. La Academia abre normalmente.
7. Los módulos actuales siguen funcionando.
```

Segunda prueba:

```text
1. Juan inicia sesión.
2. USER resuelve Persona Juan.
3. USER_ROLE resuelve gestion.
4. PERSON_RELATION autoriza Juan → Gloria.
5. Juan selecciona Gloria.
6. Persona Activa = Gloria.
7. Juan consulta/gestiona datos de Gloria.
8. Auditoría registra a Juan.
```

Tercera prueba:

```text
1. Usuario Consulta inicia sesión.
2. Selecciona Persona autorizada.
3. Puede leer.
4. No puede escribir.
5. Firestore bloquea cualquier escritura.
```

---

# 21. Producto de implementación recomendado

La primera entrega de código deberá limitarse a:

```text
A. Datos base
   PERSON
   USER
   ROLE
   USER_ROLE
   configuracion

B. Servicio
   contexto-usuario.js

C. Compatibilidad
   Gloria continúa funcionando

D. Prueba
   resolución de Persona y Rol
```

No se incluirá todavía:

```text
panel administrativo completo
migración de históricos
permisos por módulo
impersonación
profesionales
```

---

# 22. Resultado esperado

Al finalizar esta primera etapa, la Academia habrá dejado de depender conceptualmente de:

```text
usuario autenticado = alumno = propietario de todos los datos
```

y dispondrá de la base:

```text
Usuario autenticado
        │
        ▼
      Persona
        │
        ▼
       Rol
        │
        ▼
 Persona Activa
```

sin haber tenido que reconstruir los módulos existentes.

---

**Fin de TECH-USUARIOS_FIRESTORE_Y_TRANSICION.md · v0.1**
