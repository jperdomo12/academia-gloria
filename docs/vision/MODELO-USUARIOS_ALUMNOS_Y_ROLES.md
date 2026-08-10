# MODELO-USUARIOS_ALUMNOS_Y_ROLES.md

**Academia Gloria Valentina**  
**Modelo conceptual de Personas, Usuarios y Roles**  
**Versión:** 0.4  
**Estado:** Modelo conceptual consolidado y cerrado

---

## Historial del Documento

| Versión | Fecha | Descripción |
|---|---|---|
| 0.1 | 2026-08 | Modelo inicial |
| 0.2 | 2026-08 | Consolidación de Persona, Usuario, Roles y Relaciones |
| 0.3 | 2026-08 | Incorporación de USER_ROLE, PERSON_RELATION, login e ID interno |
| 0.4 | 2026-08-10 | Simplificación final de entidades, accesos iniciales y configuración global de sesión |

---

# 1. Propósito

Este documento define el modelo conceptual de identidad, personas, usuarios, roles, relaciones, ámbitos de acceso y propiedad de los datos dentro de la Academia Gloria Valentina.

Su objetivo es permitir que la Academia evolucione desde una experiencia inicialmente construida alrededor de Gloria hacia una plataforma capaz de acompañar a múltiples personas, incluyendo alumnos, familiares, tutores, psicólogos, logopedas, psicoterapeutas, otros profesionales y administradores.

Este documento describe **qué conceptos existen y cómo se relacionan**.

No define todavía:

- reglas técnicas definitivas de autorización;
- reglas Firestore finales;
- claims de Firebase;
- pantallas concretas de administración;
- flujos detallados de alta y baja;
- invitaciones;
- recuperación de cuentas;
- especificaciones funcionales detalladas de permisos;
- estrategia técnica completa de migración.

Estas decisiones deberán formalizarse posteriormente en los documentos normativos, funcionales o técnicos que correspondan.

---

# 2. Principios del modelo

## 2.1 La Academia es multi-persona y multi-alumno

La Academia nació alrededor de Gloria, pero Gloria no constituye una configuración fija del producto.

Cada persona que actúe como alumno deberá poder disponer progresivamente de su propio:

- perfil;
- Mi Camino;
- Misiones;
- biblioteca;
- calendario;
- historial;
- progreso;
- preferencias;
- logros;
- experiencias;
- acompañamiento contextual.

La misma aplicación deberá poder servir a diferentes alumnos sin duplicar pantallas, HTML o módulos por persona.

## 2.2 Los datos pertenecen a la Persona

Una pantalla no es propietaria de la información que presenta.

Los datos personales y educativos pertenecen conceptualmente a la Persona sobre la cual se registran.

```text
Persona
   ├── Perfil
   ├── Camino
   ├── Misiones
   ├── Calendario
   ├── Biblioteca
   ├── Historial de Lectura
   ├── Historial de Matemáticas
   ├── Historial de Creciendo por Dentro
   └── ...
```

## 2.3 Persona y Usuario no son sinónimos

No toda Persona relacionada con la Academia necesita disponer de una cuenta de acceso.

La Academia distinguirá conceptualmente:

```text
Persona
Usuario
Rol
Relación
Ámbito
```

Una Persona puede existir sin Usuario.

## 2.4 Usuario no equivale a email

El Usuario representa una identidad de acceso.

Su identificador conceptual no deberá depender de un email.

El email podrá ser uno de los datos de autenticación o contacto, pero puede cambiar, puede no existir y no deberá definir la identidad educativa.

## 2.5 Los Roles pertenecen al Usuario

Un Usuario podrá tener uno o varios Roles.

Ejemplo:

```text
Usuario: Juan
Roles:
  - familia
  - alumno
```

## 2.6 El acceso a otra Persona se expresa mediante una Relación

Los permisos sobre otra Persona no deberán deducirse únicamente del Rol.

El acceso efectivo dependerá de:

```text
Usuario + Roles + Relación con Persona + Nivel de acceso + Ámbitos autorizados
```

## 2.7 Consulta significa solo lectura

Un Usuario cuyo acceso efectivo sea `consulta` podrá leer la información autorizada, pero no crear, modificar ni eliminar datos.

Esta restricción deberá aplicarse en la capa de seguridad de datos y no únicamente ocultando controles en la interfaz.

```text
READ    → permitido
CREATE  → denegado
UPDATE  → denegado
DELETE  → denegado
```

## 2.8 La privacidad se diseña por defecto

La Academia trabaja con información educativa y, en determinados módulos, con información personal especialmente sensible.

Tener relación con una Persona no significa disponer automáticamente de acceso a toda su información.

---

# 3. Entidades conceptuales principales

## 3.1 Persona

Representa a una persona real relacionada con la Academia.

Puede existir aunque todavía no posea una cuenta propia de acceso.

Atributos orientativos:

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

## 3.2 Usuario

Representa una identidad capaz de autenticarse en la Academia.

Conceptualmente podrá contener:

```text
userId
login
personaId
estado
```

`userId` es el identificador interno, obligatorio, único e inmutable. En la implementación inicial podrá coincidir con el UID de Firebase Authentication.

`login` es el identificador externo de acceso: obligatorio, único y modificable. Los mecanismos concretos de autenticación no deberán provocar la creación de Usuarios diferentes para una misma Persona.

El `email` pertenece conceptualmente a `PERSON` como dato de contacto. Es opcional: una Persona puede no disponer de email y aun así existir en la Academia.

El modelo conceptual de `USER` no almacena `roles[]`, preferencias de acceso ni datos de autenticación duplicados. Los Roles se resuelven mediante `USER_ROLE` y la autenticación corresponde al servicio técnico de autenticación.

## 3.3 Rol

El Rol es un dato administrable que define el nivel general de acceso de un Usuario.

El modelo queda preparado para incorporar en el futuro Roles funcionales como familia, tutor, psicólogo, logopeda, psicoterapeuta u otros, pero la implementación inicial será deliberadamente sencilla.

Roles iniciales:

```text
administracion
gestion
consulta
```

Significado inicial:

```text
administracion
  Acceso completo, incluida la administración de Usuarios, Roles y configuración.

gestion
  Consulta y gestión funcional de la información autorizada.

consulta
  Acceso exclusivamente de lectura.
```

Un Usuario podrá tener uno o varios Roles mediante `USER_ROLE`.

Los Roles serán datos definidos y administrados por la Academia. En el futuro podrán incorporar mayor granularidad únicamente cuando exista una necesidad real.


## 3.4 Relación Persona–Persona

Las relaciones humanas, familiares o profesionales se representan mediante `PERSON_RELATION`.

Una Persona puede relacionarse con varias Personas y una Persona puede recibir relaciones desde varias Personas.

La relación es conceptualmente muchos-a-muchos y existe independientemente del Usuario, login o mecanismo de autenticación.

## 3.5 Ámbito

Representa un grupo funcional de información o capacidades.

Ejemplos:

```text
perfil
mi-camino
misiones
biblioteca
calendario
lectura
matematicas
creciendo-por-dentro
escritura
cursos
progreso-academico
evaluaciones
configuracion
administracion
```

---

# 4. Cardinalidades principales

```text
PERSONA 1 ───── 0..1 USUARIO
USUARIO  1 ───── exactamente 1 PERSONA
USUARIO  N ───── N ROLES mediante USER_ROLE
PERSONA  N ───── N PERSONAS mediante PERSON_RELATION
```

Esto significa:

- una Persona puede existir sin Usuario;
- una Persona tendrá como máximo un Usuario de la Academia;
- un Usuario siempre representa a una sola Persona;
- un Usuario puede tener varios Roles mediante `USER_ROLE`;
- una Persona puede relacionarse con varias Personas mediante `PERSON_RELATION`;
- varios mecanismos de autenticación no crean Usuarios adicionales.

---

# 5. La Persona con rol de Alumno

Alumno no se modela como una entidad obligatoria separada entre Persona y Usuario.

Cuando dispone de Usuario y participa directamente en la Academia:

```text
Persona Gloria
   └── Usuario Gloria
          └── rol: alumno
```

Si todavía no tiene cuenta:

```text
Persona Niño A
   ├── Perfil
   ├── Misiones
   ├── Calendario
   ├── Historiales
   └── Usuario: ninguno
```

Los datos educativos continúan perteneciendo a la Persona.

---

# 6. Persona activa

La **Persona Activa** representa a la Persona cuyo contexto está siendo utilizado en ese momento por la aplicación.

Cuando esa Persona tiene rol educativo de alumno, podrá presentarse en la interfaz como Alumno Activo.

Ejemplo:

```text
Usuario autenticado: Padre
Persona activa: Gloria
```

Entonces Mi Camino, Calendario, Misiones, Biblioteca e Historial mostrarán los datos de Gloria.

Cuando el Usuario autenticado actúa sobre sí mismo como alumno:

```text
Usuario autenticado = Gloria
Persona activa = Gloria
```

---

# 7. Roles iniciales

## 7.1 Alumno

Representa al Usuario que utiliza la Academia como estudiante.

## 7.2 Familia

Representa padres, madres y otros familiares.

El parentesco concreto no necesita convertirse en un Rol diferente.

Ejemplos:

```text
rol: familia
tipoRelacion: padre
```

```text
rol: familia
tipoRelacion: abuelo
nivelAcceso: consulta
```

## 7.3 Tutor

Orientado principalmente al ámbito académico.

## 7.4 Psicólogo

Orientado principalmente a Mi Camino, Mis Aventuras y Creciendo por Dentro.

## 7.5 Logopeda

Orientado a lectura, escritura, lenguaje, comunicación, grabaciones y transcripciones cuando proceda.

## 7.6 Psicoterapeuta

Requerirá ámbitos explícitos y no recibirá acceso automático a todos los datos.

## 7.7 Otro

Para otros profesionales o acompañantes no especializados todavía.

## 7.8 Administrador

Capacidad transversal de administración técnica y funcional.

---

# 8. Rol y Relación no son lo mismo

El Rol pertenece al Usuario.

La Relación determina sobre qué Persona puede actuar y de qué manera.

```text
Usuario: Juan
Roles:
  - familia
  - alumno

Relación con Gloria:
  tipoRelacion: padre
  nivelAcceso: gestion
  ambitos:
    - perfil
    - mi-camino
    - misiones
    - biblioteca
    - calendario
    - lectura
    - matematicas
    - creciendo-por-dentro
```

El Rol no se replica por cada Persona relacionada.

---

# 9. Niveles de acceso

Valores conceptuales iniciales:

```text
consulta
gestion
administracion
```

Ejemplo:

```text
Familiar lejano
  nivelAcceso: consulta
```

```text
Padre o madre responsable
  nivelAcceso: gestion
```

El nivel de acceso estará limitado además por los ámbitos autorizados.

---

# 10. Modelo conceptual de Relación

```text
relacionId
usuarioId
personaIdObjetivo
tipoRelacion
nivelAcceso
ambitos[]
estado
createdAt
createdBy
updatedAt
updatedBy
```

---

# 11. Datos propios de la Persona

## 11.1 Perfil

Cada Persona podrá disponer de un perfil propio.

```text
nombre
nombreCompleto
nombreVisible
avatar
fechaNacimiento
cursoActual
colegio
idioma
preferencias
configuracionPersonal
```

El modelo deberá evitar dependencias de nombres físicos de carpetas por Persona.

`calendarioSlug` no forma parte del modelo conceptual objetivo.

Su eliminación física de la base de datos y del código actual se realizará únicamente cuando deje de existir cualquier dependencia técnica.

## 11.2 Mi Camino y Misiones

Cuando la Persona actúe como alumno, tendrá su propio camino, misiones, progreso, evidencias y observaciones relacionadas.

## 11.3 Mi Biblioteca

El catálogo podrá ser compartido. El registro personal pertenece a la Persona.

## 11.4 Calendario

Cada Persona podrá disponer de su propio calendario personal. Los calendarios oficiales o del colegio seguirán siendo fuentes compartidas.

---

# 12. Historiales educativos

## 12.1 Rincón de Lectura

El historial pertenece a la Persona.

## 12.2 Aventuras Matemáticas

El historial pertenece a la Persona.

## 12.3 Creciendo por Dentro

Cada sesión de Semilla pertenece a la Persona y podrá necesitar niveles de privacidad más específicos.

## 12.4 Rincón de Escritura

Seguirá conceptualmente el mismo principio cuando alcance suficiente madurez funcional.

---

# 13. Mis Cursos

El módulo actual de 5.º de Primaria no será reconstruido únicamente para generar histórico.

Cuando se desarrolle 6.º de Primaria podrá evaluarse la persistencia de evaluaciones, exámenes realizados, resultados, progreso, actividades e hitos académicos cuando exista beneficio real.

---

# 14. Datos compartidos y datos propios

## 14.1 Datos compartidos

Ejemplos:

```text
catalogos de actividades
semillas.json
historias base
contenido curricular
calendarios oficiales
recursos educativos
configuracion institucional
identidad visual
```

## 14.2 Datos propios de una Persona

Ejemplos:

```text
perfil
eventos personales
misiones
progreso
sesiones
grabaciones
respuestas
historiales
biblioteca personal
observaciones
evidencias
```

---

# 15. Modelo conceptual de identidad y relaciones

```text
                         ┌──────────────┐
                         │   PERSONA    │
                         └──────┬───────┘
                                │
                        puede tener 0..N
                                │
                         ┌──────▼───────┐
                         │   USUARIO    │
                         └──────┬───────┘
                                │
                           tiene Roles[]
                                │
                           RELACIONES
                                │
                         ┌──────▼───────┐
                         │   PERSONA    │
                         │  OBJETIVO    │
                         └──────────────┘
```

---

# 16. Modelo conceptual objetivo de datos

```text
personas/
   {personaId}
      perfil
      calendario
      misiones
      biblioteca
      historiales
      configuracion

usuarios/
   {usuarioId}
      personaId
      roles[]
      preferenciasDeAcceso

relaciones/
   {relacionId}
      usuarioId
      personaIdObjetivo
      tipoRelacion
      nivelAcceso
      ambitos[]
      estado
```

Lo importante es la separación conceptual:

```text
Persona ≠ Usuario ≠ Rol ≠ Relación
```

---

# 17. Compatibilidad con Firestore actual

Actualmente una parte importante de los datos utiliza:

```text
usuarios/{uid}/...
```

Ejemplos existentes:

```text
usuarios/{uid}/eventos
usuarios/{uid}/tareas
usuarios/{uid}/evidencias
usuarios/{uid}/sesionesLectura
usuarios/{uid}/sesionesSemillas
usuarios/{uid}/biblioteca
```

Este modelo no exige una migración inmediata.

---

# 18. calendarioSlug

`calendarioSlug` no pertenece al modelo conceptual objetivo.

Sin embargo, actualmente todavía existen referencias técnicas en el código.

Por tanto:

```text
Modelo conceptual nuevo → no utilizar calendarioSlug
Código actual           → mantener mientras exista dependencia
Migración técnica       → eliminar referencias
Base de datos           → eliminar el campo cuando ya no sea utilizado
```

No deberá eliminarse manualmente de Firestore antes de completar la transición técnica correspondiente.

---

# 19. Auditoría básica

Toda entidad mutable relevante debería tender a incluir:

```text
createdAt
createdBy
updatedAt
updatedBy
```

Ejemplo conceptual:

```text
createdAt: timestamp
createdBy:
  usuarioId
  personaId
  rol

updatedAt: timestamp
updatedBy:
  usuarioId
  personaId
  rol
```

---

# 20. Auditoría histórica

Los campos anteriores no sustituyen un historial completo.

Entidades especialmente relevantes podrán necesitar además:

```text
historial
eventosDeAuditoria
registroDeCambios
```

Esto será especialmente importante para Misiones, Relaciones, Roles, permisos, observaciones, perfiles, validaciones, estados e información sensible.

---

# 21. Elementos ya preparados para la evolución

El modelo actual de Misiones ya incorpora conceptos como:

```text
alumnoId
creadaPorUid
asignadaPorUid
```

Estos campos constituyen una base útil para separar progresivamente quién recibe, quién crea y quién asigna una misión.

---

# 22. Estrategia conceptual de transición

La transición será incremental.

Gloria deberá seguir funcionando durante toda la transición.

Orden conceptual recomendado:

```text
1. Identidad / Persona
2. Usuario y Roles
3. Relaciones Usuario–Persona
4. Contexto de Persona Activa
5. Misiones / Mi Camino
6. Calendario
7. Biblioteca
8. Rincón de Lectura
9. Aventuras Matemáticas
10. Creciendo por Dentro
11. Otros módulos
```

---

# 23. Pantallas únicas

El modelo objetivo elimina la necesidad conceptual de carpetas o HTML específicos por persona.

```text
Pantalla + Persona Activa = Experiencia personalizada
```

---

# 24. Navegación según rol y relación

El menú podrá adaptarse según:

```text
roles
persona activa
relacion
nivel de acceso
ambitos autorizados
```

---

# 25. Perfil y configuración

Deberá distinguirse entre:

```text
Perfil de Persona
Perfil / preferencias de Usuario
Configuración de la aplicación
```

No deberán mezclarse ambos conceptos.

---

# 26. Privacidad y datos sensibles

Especial atención a:

```text
grabaciones
transcripciones
respuestas personales
observaciones familiares
informacion psicologica
informacion educativa sensible
```

La existencia de un dato no implica que todos los Usuarios relacionados deban poder verlo.

---

# 27. Casos conceptuales

## 27.1 Gloria entra en la Academia

```text
Persona: Gloria
Usuario: Gloria
Roles:
  - alumno
Persona activa: Gloria
```

## 27.2 Padre entra en la Academia

```text
Persona: Juan
Usuario: Juan
Roles:
  - familia
  - alumno

Relación:
  personaObjetivo: Gloria
  tipoRelacion: padre
  nivelAcceso: gestion
```

## 27.3 Familiar lejano

```text
Usuario: Familiar X
Rol:
  - familia

Relación:
  personaObjetivo: Gloria
  tipoRelacion: familiar
  nivelAcceso: consulta
```

## 27.4 Tutor

```text
Usuario: Tutor
Rol:
  - tutor

Relación:
  personaObjetivo: Gloria
  nivelAcceso: consulta
  ambitos:
    - cursos
    - progreso-academico
    - calendario-academico
```

## 27.5 Psicólogo

```text
Usuario: Psicólogo
Rol:
  - psicologo

Relación:
  personaObjetivo: Gloria
  nivelAcceso: consulta
  ambitos:
    - mi-camino
    - misiones
    - creciendo-por-dentro
```

## 27.6 Niño sin cuenta propia

```text
Persona: Niño A
Usuario: ninguno
```

Puede tener perfil, misiones, calendario e historiales.

---

# 28. Decisiones conceptuales consolidadas

1. `PERSON` es la entidad principal de identidad humana.
2. `USER` representa la identidad de acceso a la Academia.
3. Una Persona puede existir sin Usuario.
4. Una Persona tendrá 0..1 Usuario.
5. Un Usuario pertenece exactamente a una Persona.
6. `personaId` es interno, obligatorio, único e inmutable.
7. `userId` es interno, obligatorio, único e inmutable.
8. `login` es externo, obligatorio, único y modificable.
9. El email pertenece a `PERSON` y es opcional.
10. El email no define la identidad interna del Usuario.
11. Varios mecanismos de autenticación no crean varios Usuarios.
12. Un Usuario puede tener varios Roles mediante `USER_ROLE`.
13. Los Roles son datos administrables.
14. La implementación inicial utilizará `administracion`, `gestion` y `consulta`.
15. `consulta` permite exclusivamente lectura.
16. `gestion` permite consulta y gestión funcional autorizada.
17. `administracion` permite acceso completo, incluida la administración.
18. La seguridad de solo consulta deberá aplicarse también en la capa de datos.
19. La granularidad de Roles podrá crecer únicamente cuando exista necesidad real.
20. `PERSON_RELATION` representa relaciones Persona–Persona.
21. Las relaciones humanas no dependen del login ni del estado del Usuario.
22. Persona Activa representa contexto, no impersonación.
23. Una futura impersonación de soporte será explícita y auditada si alguna vez se implementa.
24. Los datos educativos pertenecen a la Persona.
25. Las pantallas tenderán a ser únicas y reutilizables.
26. `calendarioSlug` no pertenece al modelo conceptual objetivo.
27. `calendarioSlug` no se eliminará de Firestore mientras exista dependencia técnica.
28. Las entidades mutables relevantes tenderán a incluir `createdAt`, `createdBy`, `updatedAt` y `updatedBy`.
29. Las entidades sensibles podrán incorporar historial completo de auditoría cuando aporte valor.
30. La transición desde `usuarios/{uid}` será incremental.
31. Gloria deberá continuar funcionando durante toda la transición.
32. El núcleo de identidad se compone de cinco entidades: `PERSON`, `USER`, `ROLE`, `USER_ROLE` y `PERSON_RELATION`.
33. El timeout de sesión será una configuración global de la Academia.
34. No se introducirá complejidad de seguridad o permisos que no responda a una necesidad real.

---

# 28.1 Modelo básico y evolución

La estrategia será implementar desde el inicio las bases estructurales definitivas y posponer únicamente capacidades avanzadas que todavía no sean necesarias.

| Capacidad | Inicial | Evolución si aporta valor |
|---|:---:|:---:|
| PERSON | Sí | Sí |
| USER | Sí | Sí |
| ROLE | Sí | Sí |
| USER_ROLE | Sí | Sí |
| PERSON_RELATION | Sí | Sí |
| `userId` + `login` | Sí | Sí |
| administración / gestión / consulta | Sí | Sí |
| Persona Activa | Sí | Sí |
| Auditoría created/updated | Sí | Sí |
| Mayor granularidad de Roles | No | Opcional |
| Historial completo de auditoría | No inicialmente | Donde aporte valor |
| Impersonación para soporte | No | Opcional |

No se construirá un modelo provisional destinado a ser reemplazado. Se implementará un núcleo pequeño, sencillo y estructuralmente preparado para crecer.

---

# 28.2 Timeout global de sesión

La Academia podrá definir un tiempo máximo global de inactividad de sesión.

No se configurará por Usuario ni por Rol.

El valor pertenecerá a la configuración general de la Academia, por ejemplo:

```text
sessionTimeoutMinutes: 30
```

El archivo o mecanismo físico donde se almacene este valor se decidirá en el diseño técnico.

El objetivo es mantener una política sencilla y centralizada, sin introducir complejidad adicional ahora ni prever granularidad innecesaria para el futuro.

---

# 29. Fuera de alcance de este modelo

Quedan para productos posteriores:

- reglas Firestore definitivas;
- autorización técnica;
- claims de Firebase;
- alta y baja de Usuarios;
- invitaciones;
- recuperación de cuenta;
- gestión visual de Relaciones;
- selector final de Persona Activa;
- pantallas específicas para adultos;
- modelo detallado de privacidad;
- auditoría técnica;
- migración física de colecciones;
- eliminación o anonimización de datos;
- especificación funcional de permisos;
- administración completa;
- política de retención de datos.

---

# 30. Próximos productos derivados

```text
MODELO-USUARIOS_ALUMNOS_Y_ROLES v0.4
              │
              ▼
STD / reglas de identidad, roles y acceso
              │
              ▼
Modelo técnico Firestore objetivo
              │
              ▼
Contexto de Persona Activa
              │
              ▼
Plan de transición incremental
              │
              ▼
Migración de módulos
```

El siguiente producto no deberá ser una migración masiva.

Primero deberá definirse cómo se representa y resuelve técnicamente la Persona Activa y cómo un Usuario se relaciona con una o varias Personas sin romper la estructura existente.

---

# 31. Visión final

La Academia no deberá preguntarse:

> “¿Qué página pertenece a Gloria?”

Deberá preguntarse:

> “¿Qué Persona está activa y qué experiencia necesita mostrarle esta pantalla?”

Para un Usuario adulto tampoco deberá preguntarse únicamente:

> “¿Qué Rol tiene?”

sino:

> “¿Con qué Persona está relacionado, con qué nivel de acceso y para qué ámbitos?”

El objetivo es que cada alumno encuentre en la Academia un espacio propio, mientras familiares, tutores y profesionales puedan acompañarlo desde responsabilidades distintas, con acceso únicamente a aquello que realmente necesitan.

---

**Fin de MODELO-USUARIOS_ALUMNOS_Y_ROLES.md · v0.4**
