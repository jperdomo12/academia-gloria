# DATOS-BASE-FIRESTORE-FASE1.md

# Academia Gloria Valentina
## Datos base de identidad · Fase 1

**Versión:** 1.3  
**Fecha:** 2026-08-10  
**Estado:** Implementado y validado funcionalmente

---

## Historial del Documento

| Versión | Fecha | Descripción |
|---|---|---|
| 1.0 | 2026-08-10 | Primera definición de datos base para Fase 1 |
| 1.1 | 2026-08-10 | Incorpora `per_001`, `activo` booleano y timeout `0 = desactivado` |
| 1.2 | 2026-08-10 | Consolida implementación real: rol `alumno`, USER_ROLE por UID, `estado` legacy conservado y reglas Firestore publicadas |
| 1.3 | 2026-08-10 | Activa el nuevo modelo con Gloria, elimina redundancias de USER y retira `calendarioSlug` y estructura física legacy de calendarios |

---

# 1. Objetivo

Activar el mínimo modelo real:

```text
PERSON
USER
ROLE
USER_ROLE
```

sin migrar históricos, sin cambiar las subcolecciones actuales y sin modificar todavía los módulos funcionales de la Academia.

La estructura existente:

```text
usuarios/{uid}/...
```

se conserva durante esta fase.

---

# 2. Resultado de la Fase 1

La Fase 1 deja creadas y operativas las siguientes estructuras de primer nivel:

```text
Firestore
├── eventos
├── personas
│   └── per_001
├── roles
│   ├── administracion
│   ├── alumno
│   ├── consulta
│   └── gestion
├── sistema
├── usuarioRoles
│   └── {UID_GLORIA}
└── usuarios
    └── {UID_GLORIA}
```

`personaRelaciones` todavía no contiene datos y se incorporará en la siguiente fase.

---

# 3. Convención de Persona

Se adopta:

```text
per_001
per_002
per_003
...
```

Para Gloria:

```text
personaId = "per_001"
```

`personaId` es obligatorio, único, interno, estable, independiente del email y del nombre, e inmutable una vez asignado.

---

# 4. USER actual

Se mantiene el documento:

```text
usuarios/{UID_GLORIA}
```

El UID continúa siendo el UID generado y controlado por Firebase Authentication.

Después de la activación y limpieza de Fase 1.5, USER queda reducido a datos propios de la identidad de acceso:

```text
activo    : true
personaId : "per_001"
login     : "gloria"
fechaAlta : <timestamp>
```

Se eliminaron de USER los atributos que ya tienen otra fuente oficial:

```text
nombre
nombreVisible
avatar
estado
tipoUsuario
calendarioSlug
idioma
zonaHoraria
colegio
curso
cursoEscolar
```

## 4.1 Regla vigente

El estándar de estado es exclusivamente:

```text
activo : boolean
```

Convención:

```text
true  = activo
false = inactivo
```

`estado` queda retirado del USER de Gloria.

---

# 5. Identidad USER

El modelo queda diferenciado así:

```text
Persona
  personaId = "per_001"

Usuario
  userId = UID Firebase

Login
  login = "gloria"
```

El UID Firebase es técnico, único, estable y generado por Firebase Authentication.

El `login` es externo, único, modificable y no necesita ser un email.

---

# 6. PERSON

Se creó como colección de primer nivel:

```text
personas/per_001
```

Campos actualmente definidos para Gloria:

```text
activo          : true
apellidos       : "Perdomo Pelayo"
avatar          : "🌈"
email           : "gvpp.2015@gmail.com"
fechaNacimiento : <timestamp>
nombre          : "Gloria Valentina"
nombreVisible   : "Gloria Valentina"
idioma          : "es"
zonaHoraria     : "Europe/Madrid"
colegio         : "Colegio Gaudem"
curso           : "6º Primaria"
cursoEscolar    : "2026-2027"
```

El email pertenece a PERSON, es un dato de contacto y no funciona como identificador.

Para mantener sencillo el modelo actual, `colegio`, `curso` y `cursoEscolar` representan la situación académica vigente de la Persona. No constituyen histórico académico. Si en el futuro se requiere conservar la evolución por cursos escolares, se modelará separadamente.

---

# 7. ROLE

Se creó la colección de primer nivel:

```text
roles
```

con cuatro Roles iniciales.

## 7.1 roles/alumno

```text
nombre       : "Alumno"
nivelAcceso  : "gestion"
activo       : true
descripcion  : "Acceso funcional estándar del alumno a la Academia."
```

`alumno` es el Rol estándar asignado inicialmente a cualquier alumno.

Importante:

```text
rol         = alumno
nivelAcceso = gestion
```

Rol y nivel de acceso son conceptos diferentes.

## 7.2 roles/gestion

```text
nombre       : "Gestión"
nivelAcceso  : "gestion"
activo       : true
descripcion  : "Consulta y gestión funcional autorizada."
```

Uso inicial previsto: padres o familiares responsables.

## 7.3 roles/consulta

```text
nombre       : "Consulta"
nivelAcceso  : "consulta"
activo       : true
descripcion  : "Acceso exclusivamente de lectura."
```

Debe permitir lectura y bloquear CREATE, UPDATE y DELETE.

## 7.4 roles/administracion

```text
nombre       : "Administración"
nivelAcceso  : "administracion"
activo       : true
descripcion  : "Acceso completo a la Academia."
```

Uso previsto: superusuarios o administración de la Academia.

---

# 8. USER_ROLE de Gloria

Se creó:

```text
usuarioRoles/{UID_GLORIA}
```

Campos:

```text
activo : true
roleId : "alumno"
userId : "{UID_GLORIA}"
```

Aunque originalmente se contempló `{UID}_alumno`, el documento se implementó finalmente usando directamente `{UID}` como ID.

Se aprueba esta simplificación para Fase 1 porque actualmente cada Usuario tendrá un único Rol efectivo.

Si en el futuro se requiere asignación simultánea de múltiples Roles a un mismo Usuario, se evolucionará entonces la clave o estructura de `usuarioRoles`.

---

# 9. Nuevo estándar `activo`

Para nuevas entidades:

```text
activo : true / false
```

se adopta como estándar.

Aplica conceptualmente a PERSON, USER, ROLE, USER_ROLE y PERSON_RELATION.

Durante la transición pueden coexistir temporalmente campos legacy como:

```text
estado : true
```

pero no deberán duplicarse indefinidamente.

---

# 10. Timeout global

La configuración se mantiene centralizada en:

```text
compartido/config/academia-config.js
```

Valor aprobado:

```javascript
sessionTimeoutMinutes: 0
```

Convención:

```text
0  = timeout por inactividad desactivado
>0 = minutos máximos de inactividad
```

No se configurará por Usuario ni por Rol.

---

# 11. Firestore Security Rules

Las reglas publicadas mantienen:

```text
rules_version = '2';
```

Esto representa la versión del lenguaje de reglas de Firestore, no la versión de la Academia.

## 11.1 Regla legacy conservada

Se mantiene el comportamiento actual:

```text
usuarios/{userId}/{documento=**}
```

con lectura/escritura solo cuando:

```text
request.auth.uid == userId
```

Esto preserva eventos, tareas, evidencias, biblioteca, sesionesLectura, sesionesSemillas, detectivesHistorias y demás subcolecciones actuales.

## 11.2 PERSON

Se habilita lectura únicamente de la Persona propia.

La escritura desde cliente permanece cerrada en Fase 1.

## 11.3 ROLE

Los Roles pueden ser consultados por usuarios autenticados.

La escritura permanece cerrada desde cliente.

## 11.4 USER_ROLE

Cada Usuario solo puede consultar su propia asignación de Rol.

La escritura permanece cerrada desde cliente.

## 11.5 PERSON_RELATION

Permanece completamente cerrada en Fase 1.

Se abrirá de forma controlada cuando se incorpore el primer Usuario adulto relacionado con Gloria.

---

# 12. Reglas Firestore publicadas

Las nuevas reglas de Fase 1 fueron publicadas en Firebase Console el:

```text
10 de agosto de 2026
```

Estado:

```text
PUBLICADAS
```

La versión publicada conserva el modelo propietario existente y añade las nuevas entidades de identidad.

---

# 13. Activación real del nuevo modelo · Fase 1.5

Gloria ya ejecuta su identidad mediante:

```text
Firebase Authentication
        ↓
USER
        ↓
PERSON per_001
        ↓
USER_ROLE
        ↓
ROLE alumno
        ↓
nivelAcceso = gestion
        ↓
Persona Activa = per_001
```

Se actualizaron:

```text
compartido/js/contexto-usuario.js   → v0.4
compartido/js/perfil-usuario.js
compartido/api/academia.js
```

El contexto validado devuelve:

```text
usuario.personaId       = "per_001"
personaUsuario.personaId = "per_001"
personaActiva.personaId = "per_001"
roleId                  = "alumno"
nivelAcceso             = "gestion"
compatibilidadLegacy    = false
esPersonaPropia         = true
```

Las subcolecciones funcionales e históricos continúan bajo:

```text
usuarios/{uid}/...
```

No se migran en esta fase.

---

# 14. Limpieza legacy realizada

Se eliminaron de USER de Gloria:

```text
nombre
nombreVisible
avatar
estado
tipoUsuario
calendarioSlug
idioma
zonaHoraria
colegio
curso
cursoEscolar
```

Los datos personales y académicos actuales correspondientes se obtienen desde PERSON.

## 14.1 Calendarios

`calendarioSlug = "gloria"` fue eliminado de Firestore y se comprobó que Calendarios continúa funcionando correctamente.

También se retiraron las carpetas físicas legacy:

```text
calendarios/gloria/
calendarios/invitada/
```

La estructura vigente queda orientada al calendario compartido/escolar:

```text
calendarios/
├── escolar/
└── index.html
```

Se validó tanto el acceso desde la Academia como el acceso directo a `/calendarios/`.

El código residual relacionado con `obtenerCalendarioSlug()` deberá retirarse como limpieza técnica, ya que `calendarioSlug` dejó de formar parte del modelo de datos.

---

# 15. Prueba de aceptación de Fase 1 / 1.5

Se ejecutaron satisfactoriamente pruebas funcionales con Gloria después de activar el nuevo modelo y después de cada bloque de limpieza.

Se validaron:

```text
Login
Página principal
Calendario
Mi Camino
Mi Biblioteca
Rincón de Lectura
Creciendo por Dentro
```

No se detectaron errores de permisos Firestore asociados a la migración.

Resultado de contexto confirmado mediante consola:

```text
userId                   = UID Firebase Gloria
usuario.personaId        = "per_001"
personaUsuario.personaId = "per_001"
personaActiva.personaId  = "per_001"
roleId                   = "alumno"
nivelAcceso              = "gestion"
compatibilidadLegacy     = false
esPersonaPropia          = true
```

La Academia continuó funcionando después de retirar los atributos redundantes de USER y `calendarioSlug`.

---

# 16. Criterio de cierre

Fase 1 y su activación funcional Fase 1.5 quedan completadas:

```text
USER reducido a identidad de acceso
+
PERSON per_001 como fuente de datos de Gloria
+
ROLE alumno / gestion / consulta / administracion
+
USER_ROLE Gloria → alumno
+
firestore.rules publicado
+
ContextoUsuario activo sobre el nuevo modelo
+
compatibilidadLegacy = false
+
redundancias principales de USER eliminadas
+
calendarioSlug y carpetas de calendario por usuario eliminados
+
pruebas funcionales satisfactorias
```

---

# 17. Lo que NO se hace todavía

No se realiza todavía:

- crear Persona adulta;
- crear Usuario adulto;
- crear PERSON_RELATION;
- migrar históricos y subcolecciones actualmente bajo `usuarios/{uid}/...`;
- implementar impersonación/representación completa;
- introducir permisos granulares;
- activar timeout por inactividad;
- modelar histórico académico;
- eliminar todavía el usuario legacy `invitada` de Firebase/Firestore dentro de este documento.

La limpieza del código residual de `calendarioSlug` queda como tarea técnica inmediata y no altera el modelo de datos ya validado.

---

# 18. Siguiente fase

La siguiente fase incorporará el primer caso multi-persona real, partiendo ya de Gloria completamente operativa sobre el nuevo modelo:

```text
PERSON adulto
        +
USER adulto
        +
USER_ROLE
        +
PERSON_RELATION adulto → Gloria
        +
Persona Activa
```

Objetivo:

> Permitir que un adulto autenticado pueda acceder a Gloria desde su propia identidad, manteniendo siempre la trazabilidad de quién está realmente conectado.

Todavía no será necesario migrar los históricos de Gloria.

---

**Fin de DATOS-BASE-FIRESTORE-FASE1.md · v1.3**
