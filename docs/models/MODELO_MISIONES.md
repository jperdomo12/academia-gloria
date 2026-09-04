# 🗺️ Modelo conceptual de Misiones
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/models/MODELO_MISIONES.md` |
| **Versión** | 2.0 |
| **Estado** | Activo |
| **Fecha de origen** | 01/08/2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Modelo conceptual de Misiones |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Conceptos y relaciones del dominio de Tareas/Misiones, sin duplicar reglas normativas ni contratos de implementación |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Gobierna:** reglas transversales, finalización, evidencia, revisión, visibilidad y acceso. |
| `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` | **Especifica:** comportamiento funcional vigente de Gestión de Misiones y Mi Camino. |
| `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md` | **Especifica:** consulta histórica y visualización del trabajo realizado. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** USER, PERSON, Persona Activa, relaciones y niveles de acceso. |
| `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md` | **Complementa:** separación entre contenido, Motor, sesión y evidencia. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Complementa:** Curso → Asignatura → Tema y evidencia académica. |
| `compartido/api/academia.js` | **Implementa:** API compartida actual del dominio. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 2.0 | 04/09/2026 | Product Owner + AI Collaborator | P2. Reduce el documento a su responsabilidad conceptual. Retira reglas normativas, rutas Firestore, estados físicos, payloads, criterios de aceptación, roadmap y detalles de interfaz que ahora pertenecen a STD-011, SPEC-MIS_TAREAS_Y_MISIONES y al código vigente. Incorpora Persona Activa, separación sesión/evidencia, Misiones libres y Repaso Académico como especializaciones conceptuales. |
| 1.0 | 01/08/2026 | Equipo del proyecto | Modelo funcional inicial usado para orientar la primera implementación de Misiones y evidencias. Incluía además reglas y detalles de implementación que posteriormente fueron asumidos por estándares y especificaciones propietarias. |

---

## 🎯 1. Propósito

Este documento responde únicamente a:

> **¿Qué conceptos forman el dominio de Misiones y cómo se relacionan entre sí?**

No define cómo debe implementarse una pantalla, qué campos físicos debe tener Firestore ni qué transición exacta corresponde a cada estado.

Cuando se necesita una regla obligatoria o un comportamiento verificable, prevalecen los documentos propietarios enlazados arriba.

---

## 🧭 2. Idea central

Una **Tarea** y una **Misión** representan dos perspectivas de una misma intención de trabajo:

```text
FAMILIA / GESTIÓN
Tarea · asignación · organización

              ↕ misma intención

ALUMNO
Misión · experiencia comprensible y motivadora
```

No deben modelarse como dos asignaciones paralelas por defecto.

---

## 🧩 3. Conceptos principales

### 3.1 Persona / alumno

La Misión pertenece al recorrido de una Persona.

En una sesión autenticada, la **Persona Activa** determina sobre qué Persona se opera cuando existe autorización para trabajar con otra Persona relacionada.

El detalle de identidad y permisos pertenece a `STD-USUARIOS_ROLES_Y_ACCESOS.md`.

### 3.2 Misión

Representa una intención concreta de trabajo que puede contener, conceptualmente:

- propósito o descripción;
- destino o actividad asociada cuando existe;
- criterio de cumplimiento cuando es verificable;
- contexto de presentación para el alumno;
- progreso;
- estado;
- referencias a evidencia;
- contexto de gestión/revisión.

La Misión no necesita contener una copia completa del trabajo realizado.

### 3.3 Actividad o recurso

Es la experiencia que puede ejecutar el alumno.

Puede pertenecer a:

- un Motor de Aprendizaje;
- un Tema Académico;
- otro recurso real de la Academia;
- o quedar fuera de la plataforma en una Misión libre.

### 3.4 Criterio de cumplimiento

Describe conceptualmente qué tendría que ocurrir para considerar satisfecha la intención de la Misión.

Puede apoyarse en evidencia digital fiable o requerir confirmación humana.

El contrato exacto de criterios pertenece a la especificación vigente.

### 3.5 Progreso

Representa el avance de la Misión.

Puede derivarse de evidencia verificable o de decisiones humanas autorizadas según el tipo de Misión.

No es una métrica pedagógica universal ni obliga a todos los Motores a registrar los mismos datos.

### 3.6 Sesión / resultado de la experiencia

Es el registro propietario de una ejecución real de una actividad cuando el Motor o Tema lo soporta.

Puede contener respuestas, intentos, pistas, audio, reflexiones u otros datos específicos de la experiencia.

La sesión pertenece al Motor/experiencia, no a la Misión.

### 3.7 Evidencia

Es el vínculo trazable entre una Misión y el trabajo real que la sustenta.

Conceptualmente:

```text
Misión
  ↓ referencia
Evidencia
  ↓ referencia cuando existe
Sesión / resultado propietario
```

La evidencia no debe convertirse en una copia completa de la sesión solo para facilitar la consulta.

### 3.8 Revisión familiar

Es la intervención humana que permite revisar, contextualizar, validar, reabrir o acompañar una Misión cuando el contrato lo requiere.

No toda Misión necesita exactamente la misma revisión.

---

## 🔗 4. Relaciones del dominio

```text
PERSONA
  │
  └── tiene → MISIÓN
                │
                ├── puede apuntar a → ACTIVIDAD / RECURSO
                │                       │
                │                       └── produce → SESIÓN / RESULTADO
                │                                      │
                ├── se sustenta en → EVIDENCIA ────────┘
                │
                ├── mantiene → PROGRESO / ESTADO
                │
                └── puede requerir → REVISIÓN FAMILIAR
```

La Misión organiza y presenta una intención. El Motor produce la experiencia. La evidencia conecta ambas responsabilidades.

---

## 🌿 5. Especializaciones conceptuales

### 5.1 Misión con actividad digital

Tiene un destino real dentro de la Academia y puede producir una sesión/evidencia verificable.

Ejemplos actuales incluyen experiencias de Detectives, Lectura o Temas académicos cuando se ejecutan desde una Misión.

### 5.2 Misión libre

Representa una actividad que no necesita una ejecución digital propietaria.

Conceptualmente puede existir sin sesión ni evidencia digital. Su cierre se apoya en el mecanismo humano definido por el estándar/especificación.

### 5.3 Repaso Académico

Especializa una Misión vinculándola a una identidad curricular:

```text
Curso de referencia
→ Asignatura / Materia
→ Tema
→ recurso o actividad real
```

El catálogo académico es propietario de esa identidad; Misiones la referencia y no mantiene una taxonomía curricular paralela.

### 5.4 Misión de refuerzo

Puede originarse a partir de una propuesta familiar o educativa, pero una propuesta no es todavía una Misión visible.

La decisión de crear/activar la Misión pertenece al flujo humano definido por los documentos propietarios.

---

## 🔄 6. Ciclo conceptual

Sin fijar nombres físicos de estados, el ciclo general puede comprenderse como:

```text
preparada
  ↓
en realización
  ↓
trabajo suficiente o finalización declarada
  ↓
revisión cuando aplica
  ↓
cierre / historial
```

Existen además situaciones laterales como necesidad de ayuda, reanudación, vencimiento organizativo o cancelación.

Los valores de estado y transiciones exactas pertenecen a STD-011 y a la especificación vigente.

---

## 👁️ 7. Ejecución, consulta e histórico

El mismo recurso puede abrirse con propósitos diferentes:

- **ejecución:** realizar una actividad nueva;
- **consulta histórica:** observar trabajo ya realizado;
- **vista previa:** revisar/probar sin crear historial real cuando la capacidad lo permite.

Este modelo solo distingue los conceptos. Las reglas de escritura/solo lectura pertenecen a los documentos propietarios.

---

## 🌟 8. Motivación y reconocimientos

Reconocimientos, Guacamayas, constancia y otros mecanismos motivacionales pueden referenciar una Misión o su evidencia, pero **no forman parte del modelo interno de la Misión**.

Pertenecen al Sistema de Motivación y Reconocimiento y deben conservarse como dominio separado.

---

## 🧱 9. Fronteras del modelo

Este documento deliberadamente **no define**:

- nombres físicos de colecciones o campos Firestore;
- payloads JavaScript;
- listas normativas de estados;
- permisos por Rol;
- reglas de finalización;
- algoritmo de progreso;
- UI de Mi Camino o Gestión de Misiones;
- reglas de eliminación;
- Recompensas;
- ni roadmap de implementación.

Si cualquiera de esos detalles aparece aquí en el futuro, debe justificarse por su valor conceptual y no duplicar una fuente propietaria.

---

## ✅ 10. Criterios de calidad del modelo

- [ ] Explica conceptos y relaciones, no contratos duplicados.
- [ ] Distingue Misión, Actividad, Sesión y Evidencia.
- [ ] Mantiene Tarea/Misión como dos perspectivas de la misma intención.
- [ ] Reconoce Persona Activa sin redefinir permisos.
- [ ] Permite Misiones con y sin actividad digital.
- [ ] No crea una taxonomía académica paralela.
- [ ] No convierte mecanismos de Motivación en propiedades obligatorias de la Misión.

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Activo |
| **Versión** | 2.0 |
| **Responsabilidad** | Modelo conceptual del dominio de Misiones. |
| **Reglas normativas** | `STD-MIS_TAREAS_Y_MISIONES.md`. |
| **Comportamiento funcional** | `SPEC-MIS_TAREAS_Y_MISIONES.md`. |
