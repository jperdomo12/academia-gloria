# 🔄 Academia Gloria Valentina · HandOff
## Plantilla viva de continuidad

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` |
| **Versión** | 1.0-rc1 |
| **Estado** | Candidato para aprobación |
| **Fecha** | 03/09/2026 |
| **Última actualización** | 03/09/2026 |
| **Propietario** | Gobierno y Continuidad del Proyecto |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Continuidad operativa entre chats, personas o IA sin reconstruir conversaciones anteriores |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/ai/AI_CHAT_BOOTSTRAP.md` | **Complementa:** indica cómo debe incorporarse un nuevo chat o IA al proyecto. |
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** define el HandOff como conocimiento operativo y de continuidad. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** estructura, mantenimiento, versionado y trazabilidad documental. |
| `docs/README.md` | **Orienta:** punto de entrada a la documentación oficial. |
| `docs/project/ROADMAP.md` | **Complementa:** mantiene la evolución planificada del producto. |
| `docs/project/DECISION_LOG.md` | **Complementa:** conserva decisiones transversales estables. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Complementa:** define el ciclo operativo de construcción y cierre. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0-rc1 | 03/09/2026 | Product Owner + AI Collaborator | Primera plantilla viva de HandOff. Formaliza el procedimiento mínimo para continuar en un nuevo chat, la regla de mantenimiento continuo y el bloque final obligatorio `Última actualización / On going`. |

---

## 🎯 1. Propósito

Este documento permite **continuar la Academia Gloria Valentina en otro chat de forma rápida, segura y sin depender de la conversación anterior**.

Debe responder principalmente a una pregunta:

> **Si este chat deja de estar disponible ahora mismo, ¿qué necesita saber el siguiente chat para continuar correctamente desde donde quedamos?**

No pretende copiar todo el proyecto ni sustituir la documentación oficial. Su función es conservar el **contexto operativo reciente** que todavía no puede inferirse fácilmente leyendo únicamente el repositorio.

---

## 🧭 2. Cómo utilizarlo en un nuevo chat

El procedimiento normal debe mantenerse deliberadamente simple:

1. Obtener o adjuntar **la última versión disponible de este HandOff**.
2. Abrir un nuevo chat.
3. Escribir una instrucción breve, por ejemplo:

```text
Continuamos Academia Gloria Valentina de acuerdo con lo indicado en el HandOff adjunto.
Revísalo y dime si está claro para continuar.
```

Eso debe ser suficiente para iniciar la continuidad.

No es necesario adjuntar múltiples documentos ni copiar un prompt largo. El nuevo chat debe usar el HandOff para orientarse y consultar el repositorio o las fuentes oficiales cuando necesite verificar algo.

---

## ⚖️ 3. Regla de autoridad

El HandOff **orienta el punto de continuidad**, pero no sustituye al producto real ni a sus fuentes oficiales.

Antes de modificar código, documentación o declarar una capacidad como implementada, el nuevo chat debe contrastar lo necesario con:

- repositorio vigente;
- rama o PR indicado;
- documentación propietaria;
- código afectado;
- comportamiento validado;
- y otras fuentes oficiales pertinentes.

> **Si el HandOff y el repositorio discrepan sobre el estado implementado, prevalece el repositorio verificado.**

Esta regla existe para evitar reabrir trabajo ya terminado o asumir como cerrado algo que todavía no lo está.

---

## 🔁 4. Regla de mantenimiento

Este archivo debe mantenerse **vivo y proporcionalmente actualizado** durante el trabajo normal.

No hace falta modificarlo después de cada conversación. Debe actualizarse especialmente cuando ocurra alguno de estos eventos:

- se cierre un producto o bloque relevante;
- cambie la prioridad inmediata;
- se abra o cierre una rama importante;
- se cree o fusione un PR relevante;
- aparezca una decisión que afecte la continuación;
- cambie el siguiente paso exacto;
- el estado real difiera de lo indicado actualmente;
- o antes de cerrar un chat largo cuando exista riesgo de perder continuidad.

La actualización debe ser breve. El HandOff no debe convertirse en otra bitácora exhaustiva.

---

## 🧩 5. Contexto mínimo del proyecto

### Producto

**Academia Gloria Valentina** es un producto educativo familiar vivo, centrado en Gloria, con evolución progresiva basada en uso real.

### Forma de trabajo

- El Product Owner mantiene dirección, prioridad y aceptación.
- La AI Collaborator analiza, construye, revisa y ayuda a mantener continuidad.
- Se reutiliza antes de crear.
- Se evita duplicar reglas, modelos, componentes o documentación.
- Cuando el alcance está claro y el Product Owner indica `adelante`, se construye sin prolongar innecesariamente el análisis.
- La documentación facilita; no debe bloquear el producto.

### Fuente de verdad

La conversación no es SSOT. Las decisiones estables deben consolidarse en su documento propietario y el estado implementado debe verificarse contra el producto real.

---

## ✅ 6. Últimos bloques cerrados relevantes

Mantener aquí únicamente cierres recientes que ayuden a comprender la situación actual.

| Fecha | Bloque | Estado / referencia |
|---|---|---|
| 31/08/2026 | Creación/preparación de Misiones · Repaso académico | ✅ Listo |
| 31/08/2026 | Comportamiento de Misión libre | ✅ Listo |
| 31/08/2026 | Mejoras en Gestión de Misiones | ✅ Listo; el alumno no accede a Gestión de Misiones |
| 31/08/2026 | Lógica de sugerencias de refuerzo | ✅ Listo |
| 01/09/2026 | Reporte de análisis educativo | ✅ Listo |
| 02/09/2026 | Recompensas V1 | ✅ Listo |
| 03/09/2026 | Calendarios / recordatorios base | ✅ Implementado; existe ajuste abierto 3/2/1/0 |
| 03/09/2026 | 6.º de Primaria · Matemáticas | ✅ Listo |
| 03/09/2026 | Visor `Ver trabajo` | ✅ Cerrado |
| 03/09/2026 | Mi Baúl V1 | ✅ Cerrado · PR #51 fusionado a `main` |

---

## 🟠 7. Pendientes operativos actuales

Mantener solo los pendientes que condicionan el orden de trabajo inmediato.

### Ajustes / bugs

- Guacamaya duplicada en `Mi Camino`.
- Historial de `Así voy creciendo`: mantener el segundo bloque y mostrarlo inicialmente comprimido.
- Recordatorios del calendario: ampliar a **3, 2 y 1 días antes + día del evento**.

### Documentación

- La jornada documental fue priorizada como **P0 / P1 / P2**.
- **P0 está completado**.
- Siguiente bloque documental: continuar con **P1**.
- Dentro del trabajo documental permanecen `ROADMAP.md` y documentación de Recompensas según la priorización vigente.

### Posteriores

- Velocidad de voz como preferencia configurable por Persona.
- Nuevas ideas de `Mi Universo`, especialmente lectura comprensiva y comprensión consciente de preguntas.

---

## 🌿 8. Reglas/decisiones recientes que no deben perderse

- El alumno **no debe acceder a Gestión de Misiones**.
- La consulta del trabajo del alumno se resuelve mediante el visor correspondiente; ese tema está cerrado.
- Baúl toma como referencia funcional el patrón de Calendarios, manteniendo Persona Activa y permisos coherentes.
- Mi Baúl V1 quedó cerrado e integrado en `main` el 03/09/2026.
- Los HandOff anteriores guardados fuera del repositorio pueden conservarse como histórico personal, pero esta plantilla pasa a ser la referencia oficial para continuidad futura.

---

## 🌿 9. Rama / PR de trabajo actual

Actualizar siempre que exista una rama activa relevante.

| Campo | Valor actual |
|---|---|
| **Rama** | `docs/handoff-plantilla` |
| **Objetivo** | Crear y formalizar esta plantilla viva de continuidad |
| **PR** | Pendiente de creación |
| **Base** | `main` |

---

## 🚨 10. Riesgos o advertencias para el siguiente chat

- Este documento puede quedarse desactualizado si no se mantiene al cerrar bloques relevantes.
- Nunca asumir que `Pendiente` o `En progreso` continúa igual sin contrastar el repositorio cuando el trabajo pueda haberse completado después de la última actualización.
- No reabrir productos marcados como cerrados sin evidencia nueva.
- Evitar reconstruir la historia completa si el estado actual puede resolverse con este HandOff + repositorio.

---

## ▶️ 11. Siguiente paso exacto

Al retomar desde este documento:

1. revisar primero el bloque **Última actualización / On going**;
2. comprobar la rama/PR indicada si existe;
3. verificar únicamente las fuentes directamente afectadas;
4. continuar desde el siguiente paso exacto sin reconstruir bloques ya cerrados.

---

# 🟣 Última actualización / On going — 03/09/2026

## Qué acabamos de cerrar

**Mi Baúl V1** quedó completado y fusionado a `main` mediante el **PR #51**.

## Qué estamos trabajando ahora

**HandOff:** creación de `ACADEMIA_GLORIA_HANDOFF_PLANTILLA` como documento oficial vivo de continuidad del proyecto.

Rama actual:

```text
docs/handoff-plantilla
```

Objetivo inmediato:

> disponer de un único HandOff mantenible que permita abrir un nuevo chat adjuntando solamente la última versión del documento y una instrucción breve para continuar.

## Después de cerrar este bloque

Continuar con:

1. **Ajustes/bugs existentes**
   - Guacamaya duplicada.
   - Historial `Así voy creciendo` inicialmente comprimido.
   - Recordatorios de calendario 3/2/1/0.
2. **Documentación P1**.
3. Después: velocidad de voz y nuevas ideas de `Mi Universo`.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | 🟡 Candidato para aprobación |
| **Versión propuesta** | 1.0 |
| **Fecha** | 03/09/2026 |
| **Aprobación** | Pendiente de revisión del Product Owner |
| **Sustituye** | HandOff externos no canónicos como mecanismo principal de continuidad futura |
| **Sustituido por** | — |
