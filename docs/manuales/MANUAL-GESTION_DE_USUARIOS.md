# 👥 Manual · Gestión de Usuarios
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/manuales/MANUAL-GESTION_DE_USUARIOS.md` |
| **Versión** | 1.0 |
| **Estado** | Activo |
| **Fecha de origen** | 12/08/2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Administración · Gestión de Usuarios |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Procedimiento operativo para crear, editar, revisar y mantener Usuarios desde la capacidad Administración → Gestión de Usuarios |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** identidad USER/PERSON, Roles, Relaciones, Persona Activa y niveles de acceso. |
| `docs/standards/STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md` | **Gobierna:** identificadores y auditoría. |
| `docs/models/MODELO_ROLES.md` | **Modela:** actores y roles funcionales. |
| `administracion/usuarios/` | **Implementa:** pantalla actual de Gestión de Usuarios. |
| `compartido/api/academia.js` | **Implementa:** operaciones coordinadas de alta/edición. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 04/09/2026 | Product Owner + AI Collaborator | P2. Activa el manual conforme al producto vigente. Mantiene Firebase Authentication como único paso manual, conserva la generación `per_###`, actualiza lenguaje USER/PERSON/ROLE/PERSON_RELATION, niveles de Relación, auditoría y resolución de incidencias. |
| 0.3 | 12/08/2026 | Juan Perdomo + IA | Normaliza el historial al formato documental estándar. |
| 0.2 | 12/08/2026 | Juan Perdomo + IA | Incorpora historial de versiones. |
| 0.1 | 12/08/2026 | Juan Perdomo + IA | Primera versión del manual operativo. |

---

## 🎯 1. Objetivo

Explicar cómo administrar Usuarios desde:

```text
Administración → Gestión de Usuarios
```

La pantalla requiere nivel:

```text
administracion
```

La capacidad está diseñada para un volumen pequeño/controlado de Usuarios y evita crear manualmente en Firestore las estructuras que la Academia ya puede mantener de forma coordinada.

---

## 🧩 2. Qué administra la Academia

Gestión de Usuarios coordina los conceptos actuales:

```text
PERSON
USER
USER_ROLE
PERSON_RELATION
accesosLogin
```

La creación de la cuenta en **Firebase Authentication** continúa siendo manual.

> **Regla operativa:** cuando la pantalla puede realizar una operación, no crear ni editar manualmente los documentos equivalentes en Firestore.

---

## ➕ 3. Crear un Usuario

### Paso 1 · Firebase Authentication

En Firebase Console:

```text
Authentication → Usuarios → Agregar usuario
```

Indicar:

```text
correo
contraseña inicial
```

Después copiar el:

```text
UID
```

Ese UID será el `userId` técnico del USER.

### Paso 2 · Abrir Gestión de Usuarios

Entrar en la Academia con un Usuario administrador y abrir:

```text
Administración → Gestión de Usuarios
```

Pulsar:

```text
＋ Nuevo usuario
```

### Paso 3 · Firebase Authentication

Completar:

```text
UID Firebase
Correo Authentication
```

El correo debe coincidir exactamente con la cuenta creada en Firebase Authentication.

### Paso 4 · Persona

Completar como mínimo:

```text
Nombre
```

Y, cuando corresponda:

```text
Apellidos
Nombre visible
Correo personal
Avatar
Fecha de nacimiento
Idioma
Zona horaria
Colegio
Curso
Curso escolar
```

Los datos académicos/personales opcionales se guardan solo cuando se indican.

### Paso 5 · Acceso a la Academia

Completar:

```text
Login funcional
Rol
```

El selector de Rol utiliza el catálogo vigente y muestra también su nivel de acceso.

### Paso 6 · Acceso a otra Persona · opcional

Solo cuando el Usuario necesita trabajar con otra Persona relacionada, completar:

```text
Persona destino
Tipo de relación
Nivel sobre esa Persona
```

Los niveles disponibles actualmente para una Relación desde esta pantalla son:

```text
consulta
gestion
```

Si no necesita relación:

```text
Sin relación
```

### Paso 7 · Guardar

Pulsar:

```text
Guardar usuario
```

La Academia crea/actualiza coordinadamente las estructuras necesarias de identidad y acceso en Firestore.

---

## 🆔 4. Identificadores

### 4.1 UID Firebase / `userId`

Proviene de Firebase Authentication.

No debe modificarse después del alta desde la pantalla.

### 4.2 `personaId`

La Academia genera automáticamente el siguiente identificador disponible usando la convención:

```text
per_001
per_002
per_003
...
```

El `personaId` es interno, estable e independiente de nombre, correo y login.

### 4.3 Login funcional

Es el nombre de acceso funcional de la Academia y se registra mediante `accesosLogin`.

Ejemplo:

```text
jperdomo
```

No debe confundirse con el correo de Firebase Authentication.

---

## ✏️ 5. Editar un Usuario

En la lista pulsar:

```text
Editar
```

La pantalla permite mantener, según corresponda:

- datos de PERSON;
- correo de Authentication registrado en la Academia;
- login funcional;
- Rol;
- Relación con otra Persona;
- nivel de la Relación;
- estado activo/inactivo.

El UID existente se muestra como identificador técnico y no debe cambiarse.

---

## ⏸️ 6. Activar o desactivar

El control:

```text
Usuario activo en la Academia
```

activa o desactiva funcionalmente al USER en la Academia.

Cuando se necesita conservar integridad/historial, desactivar es preferible a borrar manualmente sus documentos.

La cuenta de Firebase Authentication continúa administrándose por separado en Firebase Console.

---

## 🔗 7. Relación y nivel de acceso

Una `PERSON_RELATION` permite trabajar con otra Persona autorizada.

Ejemplo conceptual:

```text
Profesional / familiar
        ↓ relación válida
Gloria
```

La Relación puede limitar la capacidad efectiva, pero no elevar por sí sola el nivel concedido por el Rol del Usuario.

La escala transversal completa del producto es:

```text
consulta < gestion < administracion
```

Sin embargo, el selector de **nivel sobre otra Persona** ofrece actualmente `consulta` y `gestion`; `administracion` pertenece al Rol/capacidad administrativa y no se concede mediante esa Relación ordinaria.

---

## 🧾 8. Registro de auditoría

El bloque:

```text
5. Registro
```

es de **solo consulta**.

Muestra, cuando existe información real:

```text
Creado
Creado por
Última actualización
Actualizado por
```

Los registros legacy pueden mostrar:

```text
—
```

cuando no existe auditoría histórica. No se inventan fechas ni autores.

---

## ✅ 9. Comprobar consistencia

La tabla muestra un indicador de consistencia.

Resultado esperado:

```text
Correcta
```

Si aparecen incidencias, revisar el detalle antes de modificar o eliminar información.

Ejemplos:

```text
USER sin PERSON
USER sin ROLE
login sin correspondencia
Relación con Persona inexistente
```

No ocultar una inconsistencia con un cambio manual sin comprender su origen.

---

## 🔄 10. Actualizar

El botón:

```text
↻ Actualizar
```

vuelve a leer los datos actuales y refresca la tabla.

No modifica información.

Es útil después de:

- crear o editar un Usuario;
- realizar una corrección excepcional controlada;
- comprobar un cambio reciente.

---

## 🛠️ 11. Qué sigue siendo manual

Para un alta nueva, el flujo normal es:

```text
1. Crear cuenta en Firebase Authentication
2. Copiar UID
3. Completar el alta desde Gestión de Usuarios
```

**Firebase Authentication es el único paso manual normal del alta actual.**

No crear por separado `PERSON`, `USER`, `USER_ROLE`, `PERSON_RELATION` o `accesosLogin` cuando Gestión de Usuarios puede hacerlo.

---

## 🚨 12. Problemas frecuentes

### El Usuario no puede entrar

Comprobar:

```text
Firebase Authentication
accesosLogin/{login}
usuarios/{UID}
usuarioRoles/{UID}
personas/{personaId}
```

`accesosLogin.authEmail` debe coincidir con el correo de Firebase Authentication.

### Aparece “Usuario inconsistente”

No eliminar inmediatamente.

Revisar el detalle y localizar qué referencia falta o no coincide.

### Entra, pero no puede acceder a otra Persona

Comprobar:

```text
PERSON_RELATION
Rol
nivelAcceso
activo
```

También verificar que la Relación esté activa y apunte a la Persona correcta.

### Cambié algo excepcionalmente en Firebase y no aparece

Pulsar:

```text
↻ Actualizar
```

### El nuevo Usuario no aparece con el Rol esperado

Comprobar el catálogo de `roles` y la asignación `usuarioRoles/{UID}` antes de crear correcciones paralelas.

---

## 🛡️ 13. Regla operativa final

Antes de tocar manualmente datos de identidad en Firestore:

> **Comprobar primero si Gestión de Usuarios puede realizar la operación.**

La edición manual directa debe quedar como excepción controlada y con comprensión del impacto sobre USER, PERSON, ROLE, login y Relaciones.

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Activo |
| **Versión** | 1.0 |
| **Acceso requerido** | `administracion` |
| **Paso manual normal** | Crear la cuenta en Firebase Authentication y copiar UID. |
| **Resto del alta** | Gestionado desde la Academia. |
