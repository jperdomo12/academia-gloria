# 🔄 Academia Gloria Valentina · HandOff
## Plantilla viva de continuidad

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` |
| **Versión** | 1.1 |
| **Estado** | Activo |
| **Fecha de origen** | 03/09/2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Gobierno y Continuidad del Proyecto |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Continuidad operativa entre chats, personas o IA sin reconstruir conversaciones anteriores |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/ai/AI_CHAT_BOOTSTRAP.md` | **Complementa:** incorporación rápida de un nuevo chat o IA. |
| `docs/ai/AI_COLLABORATION_GUIDE.md` | **Gobierna:** modelo de colaboración Personas + Documentación + IA. |
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** ubicación y responsabilidad del HandOff. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** estructura, mantenimiento, estados y trazabilidad documental. |
| `docs/README.md` | **Orienta:** punto de entrada documental. |
| `docs/project/ROADMAP.md` | **Complementa:** evolución planificada del producto. |
| `docs/project/DECISION_LOG.md` | **Complementa:** decisiones transversales estables. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Complementa:** ciclo operativo de construcción y cierre. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 04/09/2026 | Product Owner + AI Collaborator | P2. Sincroniza el HandOff vivo con el estado real: P0 y P1 cerrados, P2 en ejecución por lotes, elimina como `On going` los ajustes funcionales antiguos que ya no deben gobernar la continuidad sin nueva verificación y refuerza la regla de confirmar repositorio antes de reabrirlos. |
| 1.0 | 03/09/2026 | Product Owner + AI Collaborator | Activa la plantilla como mecanismo oficial de continuidad y formaliza último HandOff + instrucción breve. |

---

## 🎯 1. Propósito

Permitir continuar la Academia Gloria Valentina en otro chat de forma rápida y segura, conservando únicamente el **contexto operativo reciente** que todavía no se deduce con facilidad de las fuentes oficiales.

Debe responder:

> **Si este chat termina ahora, ¿qué necesita saber el siguiente para continuar correctamente desde el punto vigente?**

El HandOff no sustituye documentación propietaria, código, ramas, PR ni comportamiento validado.

---

## 🧭 2. Cómo utilizarlo

Procedimiento normal:

1. proporcionar el último HandOff disponible;
2. abrir el nuevo chat;
3. escribir una instrucción breve, por ejemplo:

```text
Continuamos Academia Gloria Valentina de acuerdo con el HandOff adjunto.
Revísalo y continúa desde el estado vigente, verificando en repositorio lo necesario antes de modificar.
```

No es necesario reconstruir el historial completo ni adjuntar múltiples fuentes si el repositorio puede resolver el contexto.

---

## ⚖️ 3. Regla de autoridad

> **El HandOff orienta; las fuentes propietarias y el producto real gobiernan.**

Antes de modificar o afirmar un estado, verificar según corresponda:

- `main` y rama/PR vigente;
- documento propietario;
- código afectado;
- especificaciones/estándares;
- comportamiento validado.

Si el HandOff y el repositorio discrepan sobre el estado implementado, prevalece la evidencia verificada del repositorio y debe actualizarse el HandOff cuando el desfase afecte la continuidad.

---

## 🔁 4. Regla de mantenimiento

Actualizar de forma proporcional cuando:

- se cierre un bloque relevante;
- cambie la prioridad inmediata;
- se abra/cierre una rama o PR importante;
- cambie el siguiente paso exacto;
- una decisión afecte la continuidad;
- o antes de cerrar un chat largo.

No convertir este documento en bitácora exhaustiva ni copiar contenido que ya tenga propietario.

---

## 🧩 5. Contexto mínimo

### Producto

Academia Gloria Valentina es un producto educativo familiar vivo, centrado inicialmente en Gloria y diseñado para evolucionar mediante uso real, acompañamiento y reutilización de patrones validados.

### Forma de trabajo

- Product Owner: dirección, prioridad y aceptación.
- AI Collaborator: análisis, construcción, revisión y continuidad.
- Reutilizar antes de crear.
- Evitar fuentes paralelas.
- Cuando el alcance está claro, construir sin interacciones innecesarias.
- GitHub `main` es la base canónica del producto integrado.

---

## ✅ 6. Estado documental reciente

| Bloque | Estado |
|---|---|
| P0 · sincronización documental prioritaria | ✅ Cerrado |
| P1 · revisión de arquitectura/estándares | ✅ 15/15 cerrados |
| P2 · comprobación dirigida | 🟡 En curso · 20/32 revisados |
| P2-01 a P2-10 | ✅ Revisados y fusionados · PR #67 |
| P2-11 a P2-20 | ✅ Revisados · PR #68 pendiente de aprobación/merge |
| P2-21 a P2-30 | ⏭️ Siguiente lote después de cerrar PR #68 |

En P2, **revisar no implica modificar**. Cada documento puede cerrarse sin cambio cuando ya está vigente.

---

## 🌿 7. Reglas que no deben perderse

- `docs/DOCUMENTATION_STANDARD.md` gobierna la jornada documental.
- Verificar antes de crear, reescribir o declarar algo obsoleto.
- Evolucionar una fuente antes de crear otra paralela.
- Un documento de visión puede describir futuro; uno que describe presente debe coincidir con producto real.
- Los documentos históricos se preservan explícitamente cuando dejan de gobernar.
- Persona Activa, Misiones/evidencia, navegación compartida, Recompensas y demás dominios conservan sus documentos propietarios; el HandOff no los redefine.
- No reabrir trabajo funcional antiguo únicamente porque aparezca en un HandOff anterior; verificar primero su estado actual.

---

## 🌿 8. Rama / trabajo actual

| Campo | Valor actual |
|---|---|
| **Base canónica** | `main` |
| **Rama activa** | `docs/p2-batch-11-20` |
| **PR** | #68 · `Docs P2: revisar documentos 11 a 20` |
| **Estado** | 10/10 documentos revisados; pendiente de aprobación del Product Owner |
| **Siguiente tras cierre** | P2-21 a P2-30 |

---

## 🚨 9. Advertencias

- No interpretar un pendiente histórico como pendiente actual sin comprobarlo.
- No utilizar este documento como inventario exhaustivo de funcionalidades.
- No presentar una propuesta, piloto o auditoría histórica como contrato activo.
- Si un documento P2 está vigente, cerrarlo sin cambios artificiales.

---

## ▶️ 10. Siguiente paso exacto

1. Obtener aprobación del Product Owner para **PR #68**.
2. Verificar que el diff final y la rama siguen limpios/mergeables.
3. Fusionar PR #68 a `main` sin solicitar una segunda aprobación redundante.
4. Continuar con **P2-21 a P2-30**.

---

# 🟣 Última actualización / On going — 04/09/2026

## Qué acabamos de cerrar

- Jornada P1: **15/15**.
- P2-01 a P2-10: fusionados mediante PR #67.
- P2-11 a P2-20: **10/10 revisados**, con PR #68 abierto.

## Qué estamos esperando ahora

> **Aprobación única del Product Owner para fusionar PR #68.**

Rama:

```text
docs/p2-batch-11-20
```

PR:

```text
#68 · Docs P2: revisar documentos 11 a 20
```

Después del merge, el siguiente bloque será P2-21 a P2-30.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 1.1 |
| **Mecanismo de continuidad** | Último HandOff + instrucción breve + verificación dirigida de fuentes |
| **Autoridad sobre estado implementado** | Repositorio y fuentes propietarias verificadas |
