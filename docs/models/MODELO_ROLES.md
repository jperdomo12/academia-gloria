# 🎭 Modelo conceptual de Roles
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/models/MODELO_ROLES.md` |
| **Versión** | 2.0 |
| **Estado** | Activo |
| **Fecha de origen** | 01/08/2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Modelo conceptual de actores y roles funcionales |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Relación conceptual entre actores de experiencia, USER/PERSON, Rol, Relación y Persona Activa sin duplicar permisos normativos |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** modelo operativo de USER/PERSON, ROLE, USER_ROLE, PERSON_RELATION y niveles de acceso. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Complementa:** actores y espacios de experiencia. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Aplica:** separación entre experiencia del alumno y Gestión de Misiones. |
| `docs/models/MODELO_NAVEGACION.md` | **Complementa:** visibilidad y navegación según nivel. |
| `docs/project/PROJECT_ROLES.md` | **Separa:** roles del proyecto y responsabilidades de construcción, que no son Roles de Usuario del producto. |
| `compartido/js/contexto-usuario.js` | **Implementa:** resolución actual de contexto, Rol, Relación y Persona Activa. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 2.0 | 04/09/2026 | Product Owner + AI Collaborator | P2. Sustituye el borrador inicial por un modelo conceptual alineado con USER/PERSON, Persona Activa y el estándar vigente. Reconoce Administración como capacidad implementada, incorpora profesional relacionado, separa actor de experiencia de ROLE persistido y retira permisos normativos duplicados. |
| 1.0 | 01/08/2026 | Equipo del proyecto | Borrador funcional inicial con Alumno, Tutor/Familia y Administrador futuro. |

---

## 🎯 1. Propósito

Este modelo responde a:

> **¿Qué actores participan en la experiencia y cómo se relacionan conceptualmente con la identidad y el acceso?**

No define permisos exhaustivos. Esos permisos pertenecen a `STD-USUARIOS_ROLES_Y_ACCESOS.md` y a los contratos de cada módulo.

---

## 🧭 2. Distinciones necesarias

La Academia diferencia:

```text
PERSON
persona real

USER
identidad de acceso

ROLE / USER_ROLE
capacidad general del Usuario

PERSON_RELATION
vínculo y límite sobre otra Persona

PERSONA ACTIVA
Persona sobre la que opera la experiencia

ACTOR DE EXPERIENCIA
forma humana de describir quién participa: alumno, familia, profesional, administrador
```

Un actor de experiencia **no tiene que coincidir uno a uno con un `roleId` físico**.

Por ejemplo, dos familiares pueden compartir una función humana similar y tener configuraciones de Rol/Relación distintas.

---

## 👧 3. Alumno

Es la Persona que vive la experiencia educativa.

Conceptualmente:

- aprende y practica;
- realiza actividades;
- vive las asignaciones como Misiones;
- puede pedir ayuda;
- produce sesiones/evidencias propias cuando el Motor lo permite;
- consulta su recorrido y trabajo autorizado;
- recibe acompañamiento y Reconocimientos según sus dominios propietarios.

Ser alumno **no implica capacidad adulta de gestión**.

El nivel `consulta` puede coexistir con escrituras propias del aprendizaje cuando el módulo las autoriza.

---

## 👨‍👩‍👧 4. Familia / tutor

Actor adulto que acompaña y organiza dentro de las capacidades autorizadas.

Conceptualmente puede:

- preparar y revisar Misiones;
- acompañar el trabajo;
- consultar evidencia;
- decidir sobre propuestas/refuerzos;
- aportar contexto humano;
- conceder Reconocimientos cuando el sistema lo permite.

La capacidad concreta depende del Rol y, cuando trabaja sobre otra Persona, de la Relación efectiva.

---

## 🧑‍🏫 5. Profesional relacionado

Persona externa o colaboradora —por ejemplo un profesional educativo o de acompañamiento— que puede trabajar con una Persona relacionada cuando existe autorización.

Su acceso se modela como:

```text
USER propio
→ PERSON propia
→ PERSON_RELATION hacia Persona destino
→ nivel efectivo limitado por Rol + Relación
→ Persona Activa = Persona destino
```

Cambiar Persona Activa no convierte al profesional en el Usuario de la Persona destino y no altera la autoría real de sus acciones.

---

## 🛡️ 6. Administrador

Actor autorizado para capacidades de identidad, seguridad y administración de la Academia.

Actualmente Administración y Gestión de Usuarios son capacidades implementadas.

El Administrador no debe utilizar su mayor acceso como motivo para sustituir el recorrido normal del alumno o la revisión familiar cuando no es necesario.

---

## 🎯 7. Persona Activa

Persona Activa permite que una misma sesión autenticada trabaje, cuando está autorizado, sobre:

- la Persona propia;
- o una Persona relacionada.

Ejemplo:

```text
Familia autenticada
        │
        ├── Persona propia
        │
        └── relación válida → Gloria
                              ↓
                        Persona Activa
```

La Persona Activa aporta contexto funcional; el Usuario autenticado conserva identidad, sesión y auditoría.

---

## 🪜 8. Niveles de acceso

El modelo operativo actual reconoce la escala:

```text
consulta < gestion < administracion
```

Este documento solo conserva su significado conceptual:

- **consulta:** capacidad transversal básica; no equivale a solo lectura universal;
- **gestion:** capacidad adulta/de gestión donde el módulo la define;
- **administracion:** capacidad administrativa global autorizada.

El detalle de cálculo y permisos pertenece al estándar de Usuarios, Roles y Accesos.

---

## 🔗 9. Relación conceptual entre actores

```text
PERSONA
  ↕ asociada a
USER
  ↓ recibe
ROLE / USER_ROLE
  ↓ puede relacionarse mediante
PERSON_RELATION
  ↓ limita contexto sobre otra Persona
PERSONA ACTIVA
  ↓ determina
EXPERIENCIA / DATOS SOBRE LOS QUE SE OPERA
```

El actor humano se interpreta sobre ese contexto, no únicamente a partir del nombre del Rol.

---

## 🗣️ 10. Lenguaje de experiencia

Algunos conceptos se presentan de forma distinta según el actor:

| Concepto | Alumno | Familia / gestión |
|---|---|---|
| Asignación | Misión | Tarea / Misión / asignación |
| Ejecución | Aventura / actividad | Actividad / trabajo realizado |
| Ayuda | Necesito ayuda | Necesita acompañamiento |
| Trabajo terminado | Terminé / esperando a mi familia | Pendiente de revisión cuando aplica |
| Historial | Mi trabajo / trabajo realizado | Evidencia / trabajo realizado |

La terminología exacta de cada dominio pertenece a su documento propietario.

---

## 🧱 11. Fronteras

Este modelo no define:

- documentos físicos de Roles o Relaciones;
- Firestore Rules;
- permisos detallados por operación;
- IDs concretos de Roles;
- navegación completa;
- lógica de Misiones;
- ni roles de gobierno del proyecto.

Los roles `Product Owner`, `AI Collaborator` y equivalentes pertenecen a `PROJECT_ROLES.md`, no al modelo de acceso del producto.

---

## ✅ 12. Criterios de calidad

- [ ] Actor humano y ROLE persistido no se confunden.
- [ ] Alumno no recibe Gestión solo por escribir sus datos educativos.
- [ ] Persona Activa no sustituye al Usuario autenticado.
- [ ] Una Relación limita el acceso sobre otra Persona.
- [ ] Administración se reconoce como capacidad actual, no futura.
- [ ] Los permisos normativos permanecen en su estándar propietario.

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Activo |
| **Versión** | 2.0 |
| **Responsabilidad** | Modelo conceptual de actores y roles funcionales. |
| **Permisos y seguridad** | Gobernados por `STD-USUARIOS_ROLES_Y_ACCESOS.md`. |
