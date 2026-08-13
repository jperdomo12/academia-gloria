# MANUAL-GESTION_DE_USUARIOS.md

**Academia Gloria Valentina**  
**Manual de usuario · Gestión de Usuarios**  
**Versión:** 0.3  
**Fecha:** 2026-08-12  
**Estado:** Uso inicial

---

# Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---|---|---|
| 0.1 | 2026-08-12 | Juan Perdomo + IA | Primera versión del manual operativo de Gestión de Usuarios. |
| 0.2 | 2026-08-12 | Juan Perdomo + IA | Se incorpora el apartado obligatorio de historial de versiones. |
| 0.3 | 2026-08-12 | Juan Perdomo + IA | Se normaliza el historial al formato documental estándar: Versión, Fecha, Responsables y Cambios. |

---

# 1. Objetivo

Este manual explica cómo administrar usuarios de la Academia desde:

```text
Administración → Gestión de Usuarios
```

Está dirigido a usuarios con nivel de acceso:

```text
administracion
```

La primera versión está pensada para un volumen pequeño de usuarios y busca reducir al mínimo las operaciones manuales en Firebase.

---

# 2. Qué se administra desde la Academia

Desde Gestión de Usuarios se mantienen de forma coordinada:

```text
PERSON
USER
USER_ROLE
PERSON_RELATION
accesosLogin
```

La creación de la cuenta en **Firebase Authentication** continúa siendo manual en esta fase.

---

# 3. Crear un usuario

## Paso 1. Crear la cuenta en Firebase Authentication

En Firebase Console:

```text
Authentication → Usuarios → Agregar usuario
```

Indicar:

```text
correo
contraseña inicial
```

Después de crear la cuenta, copiar el:

```text
UID
```

Ese UID es el identificador técnico del Usuario en la Academia.

## Paso 2. Crear el usuario desde la Academia

Entrar con un usuario administrador y abrir:

```text
Administración → Gestión de Usuarios
```

Pulsar:

```text
Nuevo usuario
```

Completar como mínimo:

```text
UID Firebase
Correo de Authentication
Nombre
Login
Rol
```

Los demás campos de Persona son opcionales y deben completarse solo cuando correspondan.

## Paso 3. Relación con otra Persona

Solo si el usuario necesita acceder a otra Persona, por ejemplo un profesional que trabaja con Gloria, completar:

```text
Persona destino
Tipo de relación
Nivel de acceso
```

Si no necesita relación, dejar:

```text
Sin relación
```

## Paso 4. Guardar

Pulsar:

```text
Guardar usuario
```

La Academia creará automáticamente las estructuras necesarias en Firestore.

---

# 4. Identificadores

## UID Firebase

Proviene de Firebase Authentication.

No debe modificarse manualmente después del alta.

## personaId

La Academia genera automáticamente identificadores con la convención:

```text
per_001
per_002
per_003
...
```

El `personaId` es interno, estable e inmutable.

## Login

Es el nombre utilizado para entrar en la Academia.

Ejemplo:

```text
jperdomo
```

El login es diferente del correo de Firebase Authentication.

---

# 5. Editar un usuario

En la lista de usuarios:

```text
Administración → Gestión de Usuarios
```

Pulsar:

```text
Editar
```

Se pueden modificar los datos permitidos de:

```text
Persona
Login
Rol
Relación
Nivel de acceso
Estado activo/inactivo
```

No modificar manualmente los identificadores técnicos.

---

# 6. Activar o desactivar

El campo:

```text
Usuario activo en la Academia
```

permite activar o desactivar funcionalmente al usuario.

La desactivación es preferible a eliminar documentos cuando se necesita conservar la integridad de los datos.

La cuenta de Firebase Authentication sigue administrándose manualmente en esta fase.

---

# 7. Relaciones y nivel de acceso

Una Relación permite que una Persona autorizada acceda a otra Persona.

Ejemplo:

```text
Azucena → Gloria
```

Niveles iniciales:

```text
consulta
gestion
```

La Relación nunca puede aumentar los privilegios concedidos por el Rol del Usuario.

---

# 8. Registro

El bloque:

```text
5. Registro
```

es de **solo consulta**.

Muestra:

```text
Creado
Creado por
Última actualización
Actualizado por
```

Estos datos se completan automáticamente cuando existe información de auditoría.

Los registros antiguos pueden mostrar:

```text
—
```

cuando no existe información histórica real. No se inventan fechas ni autores anteriores.

---

# 9. Comprobar consistencia

La lista de usuarios muestra el estado de consistencia.

El resultado esperado es:

```text
Correcta
```

Si aparece una incidencia, revisar el detalle antes de modificar o eliminar datos.

Ejemplos de inconsistencias:

```text
USER sin PERSON
USER sin ROLE
login sin correspondencia
Relación con Persona inexistente
```

No ocultar ni corregir manualmente una incidencia sin identificar primero su origen.

---

# 10. Actualizar

El botón:

```text
Actualizar
```

vuelve a leer la información actual desde Firestore y refresca la lista.

No modifica datos.

Es útil después de:

```text
crear o editar un usuario
hacer una corrección controlada en Firebase
comprobar cambios recientes
```

---

# 11. Qué sigue siendo manual

En esta primera fase gratuita:

```text
Firebase Authentication
```

continúa administrándose desde Firebase Console.

La operación manual normal para un alta nueva es únicamente:

```text
1. Crear cuenta en Firebase Authentication
2. Copiar UID
3. Completar el alta desde la Academia
```

No deberían crearse manualmente por separado los documentos de Firestore cuando Gestión de Usuarios pueda hacerlo.

---

# 12. Problemas frecuentes

## El usuario no puede entrar

Comprobar:

```text
Firebase Authentication
accesosLogin/{login}
usuarios/{UID}
usuarioRoles/{UID}
personas/{personaId}
```

El correo de `accesosLogin.authEmail` debe coincidir exactamente con el correo de Firebase Authentication.

## Aparece "Usuario inconsistente"

No eliminar inmediatamente.

Abrir el detalle y verificar qué referencia falta.

## El usuario entra pero no puede acceder a otra Persona

Comprobar:

```text
PERSON_RELATION
Rol
nivelAcceso
activo
```

## Cambié algo directamente en Firebase y no aparece

Pulsar:

```text
Actualizar
```

---

# 13. Regla operativa

Antes de crear, modificar o eliminar manualmente datos en Firestore:

> Revisar primero si la operación puede realizarse desde Gestión de Usuarios.

La administración manual de Firestore debe quedar como excepción.

---

**Fin de MANUAL-GESTION_DE_USUARIOS.md · v0.3**
