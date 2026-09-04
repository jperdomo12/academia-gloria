# 🔄 Academia Gloria Valentina · HandOff
## Plantilla viva de continuidad

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` |
| **Versión** | 1.3 |
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
| 1.3 | 04/09/2026 | Product Owner + AI Collaborator | Cierra la revisión P2 en 32/32 documentos. Registra la fusión de P2-21 a P2-30 mediante PR #69, archiva el modelo histórico de Usuarios/Alumnos/Roles, sincroniza el README de Visión y deja únicamente el PR final de P2 pendiente de aprobación/merge. |
| 1.2 | 04/09/2026 | Product Owner + AI Collaborator | Registró PR #68 fusionado, cierre de P2-21 a P2-30 y dejó P2-31/P2-32 como último tramo. |
| 1.1 | 04/09/2026 | Product Owner + AI Collaborator | Sincronizó el HandOff con P0/P1 cerrados y P2 en ejecución por lotes. |
| 1.0 | 03/09/2026 | Product Owner + AI Collaborator | Activó la plantilla como mecanismo oficial de continuidad. |

---

## 🎯 1. Propósito

Permitir continuar la Academia Gloria Valentina en otro chat de forma rápida y segura, conservando únicamente el **contexto operativo reciente** que todavía no se deduce con facilidad de las fuentes oficiales.

> **El HandOff orienta; las fuentes propietarias y el producto real gobiernan.**

No sustituye código, estándares, especificaciones, ramas, PR ni comportamiento validado.

---

## 🧭 2. Cómo utilizarlo

1. proporcionar el último HandOff disponible;
2. abrir un nuevo chat;
3. indicar brevemente que se continúa desde ese HandOff;
4. verificar en repositorio únicamente las fuentes necesarias antes de modificar.

No reconstruir conversaciones anteriores cuando el estado actual pueda resolverse con HandOff + repositorio.

---

## ⚖️ 3. Regla de autoridad

Antes de modificar o afirmar un estado, verificar según corresponda:

- `main` y rama/PR vigente;
- documento propietario;
- código afectado;
- estándar/especificación;
- comportamiento validado.

Si el HandOff discrepa con el repositorio verificado, prevalece el repositorio.

---

## 🔁 4. Regla de mantenimiento

Actualizar proporcionalmente cuando:

- se cierre un bloque relevante;
- cambie la prioridad inmediata;
- se abra/cierre una rama o PR importante;
- cambie el siguiente paso exacto;
- o antes de cerrar un chat largo.

No convertir el HandOff en una segunda bitácora exhaustiva.

---

## 🧩 5. Contexto mínimo

Academia Gloria Valentina es un producto educativo familiar vivo, inspirado inicialmente en Gloria y diseñado para evolucionar mediante uso real, acompañamiento y reutilización de patrones validados.

Reglas de trabajo:

- Product Owner: dirección, prioridad y aceptación;
- AI Collaborator: análisis, construcción, revisión y continuidad;
- reutilizar antes de crear;
- evitar fuentes paralelas;
- cuando el alcance está claro, construir sin interacciones innecesarias;
- GitHub `main` es la base canónica del producto integrado.

---

## ✅ 6. Estado documental

| Bloque | Estado |
|---|---|
| P0 | ✅ Cerrado |
| P1 | ✅ 15/15 cerrados |
| P2 | ✅ **32/32 revisados** · pendiente únicamente de fusionar el PR final |
| P2-01 a P2-10 | ✅ Fusionados · PR #67 |
| P2-11 a P2-20 | ✅ Fusionados · PR #68 |
| P2-21 a P2-30 | ✅ Fusionados · PR #69 · merge `60b934557afe0ad5072a8e5af30afd79e0dfcd94` |
| P2-31 a P2-32 | ✅ Revisados en rama `docs/p2-final-31-32` |

En P2, revisar no implica modificar; una fuente ya vigente puede cerrarse sin cambios.

---

## 📚 7. Cierre P2-31 y P2-32

### P2-31 · `MODELO-USUARIOS_ALUMNOS_Y_ROLES.md`

El modelo de agosto se conserva íntegramente en:

```text
docs/history/MODELO-USUARIOS_ALUMNOS_Y_ROLES.md
```

La ruta anterior queda como puntero histórico de compatibilidad.

Motivo: ya existe un modelo conceptual activo (`docs/models/MODELO_ROLES.md`) y un estándar propietario (`STD-USUARIOS_ROLES_Y_ACCESOS.md`). El documento histórico mantenía además supuestos sustituidos, entre ellos múltiples Roles efectivos por Usuario, `consulta = solo lectura` universal y ámbitos como base persistida del acceso.

### P2-32 · `docs/vision/README.md`

Se sincroniza como puerta de entrada a las Visiones:

- distingue visión de contrato funcional;
- lista visiones activas;
- identifica fuentes históricas/sustituidas;
- recuerda que la visión inspira, las fuentes propietarias gobiernan y el producto real confirma implementación.

---

## 🌿 8. Reglas que no deben perderse

- `docs/DOCUMENTATION_STANDARD.md` gobierna la documentación.
- Verificar antes de crear, reescribir o declarar algo obsoleto.
- Evolucionar una fuente antes de crear otra paralela.
- Una visión puede describir futuro; no debe fingir implementación.
- Documentos históricos no gobiernan cuando existe propietario vigente.
- Persona Activa, Misiones/evidencia, navegación, Recompensas y demás dominios conservan sus propietarios.
- Firestore Rules versionadas en GitHub no equivalen a Rules desplegadas en Firebase.
- No reabrir trabajo funcional antiguo únicamente porque aparezca en documentación histórica.

---

## 🌿 9. Rama / trabajo actual

| Campo | Valor actual |
|---|---|
| **Base canónica** | `main` |
| **Rama activa** | `docs/p2-final-31-32` |
| **Objetivo** | Cerrar definitivamente P2 |
| **Estado** | P2 32/32 revisado; preparar PR final |
| **Siguiente tras aprobación/merge** | Jornada documental P0/P1/P2 cerrada; volver al siguiente objetivo funcional/prioridad del producto |

---

## 🚨 10. Advertencias

- No interpretar una visión como contrato físico de implementación.
- No reutilizar como norma activa documentos trasladados a `docs/history/`.
- Los punteros de compatibilidad no son nuevas fuentes normativas.
- No confundir USER, PERSON, ROLE, Relación y Persona Activa.
- No reintroducir `consulta = solo lectura universal` ni múltiples Roles efectivos como reglas actuales sin una nueva decisión explícita.

---

## ▶️ 11. Siguiente paso exacto

1. comparar `docs/p2-final-31-32` contra `main`;
2. abrir el PR final de P2;
3. solicitar una única aprobación del Product Owner;
4. fusionar tras aprobación y verificación final;
5. declarar P2 cerrado y retomar el siguiente objetivo funcional del producto.

---

# 🟣 Última actualización / On going — 04/09/2026

## Qué acabamos de cerrar

- PR #69 fusionado.
- P2-31 revisado y reclasificado como histórico.
- P2-32 sincronizado.
- **P2 = 32/32 documentos revisados.**

## Qué estamos trabajando ahora

> **Preparación del PR final de P2.**

Rama:

```text
docs/p2-final-31-32
```

Después del merge, la jornada documental P0/P1/P2 quedará cerrada.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 1.3 |
| **Mecanismo de continuidad** | Último HandOff + instrucción breve + verificación dirigida de fuentes |
| **Autoridad sobre estado implementado** | Repositorio y fuentes propietarias verificadas |
