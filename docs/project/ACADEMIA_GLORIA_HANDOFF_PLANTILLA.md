# 🔄 Academia Gloria Valentina · HandOff
## Plantilla viva de continuidad

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` |
| **Versión** | 1.2 |
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
| 1.2 | 04/09/2026 | Product Owner + AI Collaborator | P2. Registra PR #68 fusionado, cierre de P2-21 a P2-30, actualización/archivo de referencias técnicas y visiones, y deja P2-31/P2-32 como último tramo documental pendiente después de la aprobación del lote actual. |
| 1.1 | 04/09/2026 | Product Owner + AI Collaborator | Sincronizó el HandOff con P0/P1 cerrados y P2 en ejecución por lotes, eliminando pendientes funcionales históricos como `On going`. |
| 1.0 | 03/09/2026 | Product Owner + AI Collaborator | Activó la plantilla como mecanismo oficial de continuidad. |

---

## 🎯 1. Propósito

Permitir continuar la Academia Gloria Valentina en otro chat de forma rápida y segura, conservando únicamente el **contexto operativo reciente** que todavía no se deduce con facilidad de las fuentes oficiales.

> **El HandOff orienta; las fuentes propietarias y el producto real gobiernan.**

No sustituye código, estándares, especificaciones, ramas, PR ni comportamiento validado.

---

## 🧭 2. Cómo utilizarlo

Procedimiento normal:

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
| P2 | 🟡 En curso · **30/32 revisados** |
| P2-01 a P2-10 | ✅ Fusionados · PR #67 |
| P2-11 a P2-20 | ✅ Fusionados · PR #68 · merge `2995f4dc93495f92b2b0e69c6bee98267f784202` |
| P2-21 a P2-30 | ✅ 10/10 revisados · rama `docs/p2-batch-21-30` · pendiente PR/aprobación |
| P2-31 a P2-32 | ⏭️ Tramo final después de cerrar el lote 21-30 |

En P2, revisar no implica modificar; una fuente ya vigente puede cerrarse sin cambios.

---

## 📚 7. Resultado del lote P2-21 a P2-30

- `TECH-DATOS-BASE-FIRESTORE-FASE1.md` → histórico; referencia vigente trasladada a transición de Usuarios/Firestore.
- `TECH-USUARIOS_FIRESTORE_Y_TRANSICION.md` → v0.4 activo como referencia técnica de transición.
- `01_PRINCIPIOS_PEDAGOGICOS.md` → original histórico; `FOUNDATION.md` y ADN gobiernan hoy el fundamento.
- `02_VISION_DEL_RINCON_DE_LECTURA.md` → v1.1 visión activa, no contrato funcional.
- `03_PERFIL_INTELIGENTE_DEL_USUARIO.md` → v1.1 visión estratégica sin perfil psicológico automático.
- `04_MEMORIA_INTELIGENTE_DE_LA_ACADEMIA.md` → v1.1 visión estratégica basada en fuentes propietarias, no memoria central paralela.
- `05_MANIFIESTO_DE_AVENTURAS_MATEMATICAS.md` → v1.1 manifiesto activo; mundos conceptuales separados del estado implementado.
- `06_IDENTIDAD_VISUAL_DE_LA_ACADEMIA.md` → original histórico; `PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` gobierna actualmente.
- `07_IDENTIDAD_GUACAMAYAS.md` → v1.1 visión fundacional; retirada colisión histórica `STD-008`.
- `08_MI_CAMINO.md` → v1.1 visión activa alineada con Mi Camino / Gestión de Misiones / Persona Activa / Reconocimientos.

Los documentos originales trasladados a `history/` mantienen punteros de compatibilidad en sus rutas anteriores para no romper referencias mientras concluye la sincronización.

---

## 🌿 8. Reglas que no deben perderse

- `docs/DOCUMENTATION_STANDARD.md` gobierna la jornada documental.
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
| **Rama activa** | `docs/p2-batch-21-30` |
| **Objetivo** | Cerrar el lote P2-21 a P2-30 mediante un único PR documental |
| **Estado** | 10/10 documentos revisados |
| **Siguiente tras aprobación/merge** | P2-31 y P2-32 |

---

## 🚨 10. Advertencias

- No interpretar una visión como contrato físico de implementación.
- No reutilizar como norma activa documentos trasladados a `docs/history/`.
- Los punteros de compatibilidad no son nuevas fuentes normativas.
- No crear un Perfil o Memoria central que replique datos propietarios existentes.
- No confundir Mi Camino con Gestión de Misiones.
- La Guacamaya como símbolo, representación visual y Reconocimiento tiene propietarios distintos y coordinados.

---

## ▶️ 11. Siguiente paso exacto

1. comparar `docs/p2-batch-21-30` contra `main`;
2. abrir un único PR del lote;
3. solicitar la aprobación única del Product Owner;
4. fusionar después de aprobación y verificación final;
5. revisar **P2-31 `MODELO-USUARIOS_ALUMNOS_Y_ROLES.md`**;
6. revisar **P2-32 `docs/vision/README.md`**;
7. cerrar P2 completo.

---

# 🟣 Última actualización / On going — 04/09/2026

## Qué acabamos de cerrar

- P2-11 a P2-20 fusionados mediante PR #68.
- P2-21 a P2-30 revisados: **10/10**.

## Qué estamos trabajando ahora

> **Preparación y aprobación del PR de P2-21 a P2-30.**

Rama:

```text
docs/p2-batch-21-30
```

Después del merge quedarán únicamente **P2-31 y P2-32**.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 1.2 |
| **Mecanismo de continuidad** | Último HandOff + instrucción breve + verificación dirigida de fuentes |
| **Autoridad sobre estado implementado** | Repositorio y fuentes propietarias verificadas |
