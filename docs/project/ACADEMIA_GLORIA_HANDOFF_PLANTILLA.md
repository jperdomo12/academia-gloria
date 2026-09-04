# 🔄 Academia Gloria Valentina · HandOff
## Plantilla viva de continuidad

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` |
| **Versión** | 1.4 |
| **Estado** | Activo · Academia funcionalmente congelada |
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
| `docs/project/ROADMAP.md` | **Complementa:** evolución planificada del producto y backlog congelado. |
| `docs/project/DECISION_LOG.md` | **Complementa:** decisiones transversales estables. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Complementa:** ciclo operativo de construcción y cierre. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.4 | 04/09/2026 | Product Owner + AI Collaborator | Cierra P0/P1/P2, registra el baseline estable `main` tras PR #71, descarta PR #72 sin merge, formaliza congelación funcional y consolida pendientes para retomar después del inicio de clases, incluida la mejora del proceso de incorporación de nuevas Semillas. |
| 1.3 | 04/09/2026 | Product Owner + AI Collaborator | Cierre de revisión P2 en 32/32 documentos. |
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

## 🧊 4. Estado de congelación funcional

Desde el **04/09/2026**, por decisión del Product Owner, la Academia queda **funcionalmente congelada** para priorizar el inicio del curso escolar y el uso real del producto.

Mientras permanezca congelada:

- no iniciar mejoras visuales ni funcionales;
- no refactorizar código por iniciativa propia;
- no ampliar motores, Misiones, Recompensas o navegación;
- no retomar pendientes salvo instrucción expresa del Product Owner;
- sí se permite corregir un problema crítico de seguridad, pérdida/corrupción de datos o bloqueo del uso real, previa verificación;
- la documentación puede actualizarse para preservar continuidad.

### Baseline estable de congelación

```text
main
4db6c734556e7fdc702bd0b78b228173d64ac036
```

Este commit incluye la mejora aprobada de Creciendo por Dentro del **PR #71**.

El **PR #72** fue cerrado **sin merge** y su rama fue restablecida al mismo commit de `main`. No reutilizar ese enfoque al retomar el ajuste de Guacamayas.

---

## ✅ 5. Estado documental

| Bloque | Estado |
|---|---|
| P0 | ✅ Cerrado |
| P1 | ✅ 15/15 cerrados |
| P2 | ✅ 32/32 cerrados |
| Jornada documental P0 + P1 + P2 | ✅ Cerrada · 04/09/2026 |

`docs/DOCUMENTATION_STANDARD.md` continúa gobernando cualquier evolución documental futura.

---

## ✅ 6. Funcionalidades cerradas antes de la congelación

### Misiones y acompañamiento

- ✅ Creación/preparación de Misiones · Repaso Académico.
  - Curso de referencia + Materia cargan Temas disponibles.
  - Tema es lista de valores.
  - Tema completa automáticamente la URL cuando existe catálogo compatible.
  - El administrador no necesita conocer/copiar rutas técnicas.
- ✅ Comportamiento de Misión libre corregido.
- ✅ Gestión de Misiones V1.
  - filtro por tipo;
  - bloques/paginación de 5;
  - alumno sin acceso a Gestión de Misiones.
- ✅ Lógica de sugerencias de refuerzo.
- ✅ Reporte de Análisis Educativo V1.
- ✅ Limpieza de datos/evidencias de prueba.
- ✅ Eliminación controlada de Misiones completadas.

### Motivación y crecimiento

- ✅ Recompensas / Reconocimientos V1.
  - 🦜 Guacamayas;
  - 🏅 Récord personal;
  - ✨ Reconocimientos de Lía;
  - 🤝 Retos cooperativos cuando aplique.
- Principios vigentes: actividad/progreso real, sin rankings, sin comparación con otros y sin pérdida de recompensas.

### Calendarios y curso

- ✅ Recordatorios de Calendario al ingreso con comportamiento vigente de **evento del día + evento del día siguiente / un día antes**.
- ✅ Portal 6.º de Primaria y Matemáticas preparado para crecimiento por Temas.

### Otros

- ✅ Mi Baúl V1.
- ✅ Plantilla oficial de HandOff.
- ✅ Documentación P0/P1/P2 sincronizada.

---

## 🌱 7. Creciendo por Dentro · incidencia revisada y cerrada

Se verificó mediante una Misión de prueba real que:

```text
Misión Creciendo por Dentro
→ completar Semilla desde la Misión
→ guardar sesión
→ registrar evidencia
→ objetivo alcanzado
→ ⏳ Esperando a mi familia
```

El flujo funcionó correctamente.

La situación observada durante una sesión con la psicóloga probablemente correspondió a realizar la misma Semilla como **práctica libre**, sin entrar desde la Misión; por tanto la práctica se guardó, pero no avanzó aquella Misión.

### Mejora aprobada y ya integrada

PR #71 añade una advertencia cuando una Semilla abierta libremente pertenece a una Misión activa:

- continuar la Misión para que la práctica cuente; o
- practicar libremente de forma consciente.

Esta mejora fue probada y aprobada antes del merge.

---

## ⏳ 8. Backlog congelado

### 8.1 Velocidad de voz por Persona

**Estado:** ⏳ Pendiente.

Objetivo futuro:

- preferencia propia de la Persona;
- administrable por adulto/administrador;
- interfaz simple: `Normal / Pausada / Muy pausada`;
- valores técnicos internos, no expuestos al alumno.

No implementar durante la congelación.

### 8.2 Mi Universo · comprensión de preguntas

**Estado:** ⏳ Pendiente para análisis futuro.

Objetivo pedagógico: ayudar a Gloria a adquirir consistencia en **leer, identificar qué se pregunta y responder**, utilizando ejercicios deliberadamente claros y preguntas donde la respuesta pueda estar contenida en el propio enunciado como entrenamiento de comprensión.

Ejemplos de origen anotados por el Product Owner:

- “¿De qué color es el caballo blanco de Bolívar?”
- adivinanzas sencillas donde la clave está explícita o casi explícita en el enunciado.

No diseñar todavía el producto; retomar cuando vuelva a existir capacidad de desarrollo.

### 8.3 Actividades sugeridas para Gloria desde email

**Estado:** ⏳ Pendiente para análisis futuro.

La fuente ya revisada propone actividades relacionadas con lenguaje, narración, opinión propia, instrucciones, autonomía y expresión. Al retomarlo, evitar crear un sistema paralelo o una pantalla por actividad; estudiar integración con Mi Universo, Misiones y Creciendo por Dentro.

### 8.4 Mi Camino · duplicación visual de Guacamaya

**Estado:** 🟡 Conocido · deliberadamente pospuesto.

Síntoma:

- aparece repetida una Guacamaya, por ejemplo `🦜 Guacamaya Valiente · Algo que conseguí esta semana`;
- al Product Owner le gusta más la presentación del segundo bloque;
- si ese segundo bloque actúa como historial, debería aparecer inicialmente comprimido.

Antecedente importante:

- el intento del PR #72 no alcanzó una solución estable;
- provocó incluso un bloqueo de la página en una iteración de prueba;
- el PR fue cerrado sin merge y la rama restablecida a `main`.

**Regla al retomarlo:** reanalizar desde cero el componente existente de Recompensas y resolver con el cambio mínimo posible; no reutilizar el parche/observador del PR #72.

### 8.5 Creciendo por Dentro · proceso de incorporación de nuevas Semillas

**Estado:** 🟡 Incidencia de proceso / deuda técnica · deliberadamente pospuesta.

Observación del Product Owner:

- incorporar solo dos Semillas resultó un trabajo excesivamente arduo para el valor añadido;
- no conviene seguir ampliando el catálogo con el mismo proceso;
- antes de añadir nuevas Semillas debe simplificarse el flujo de incorporación.

**Regla acordada para la próxima oportunidad:**

1. construir primero la Semilla funcional con **un icono genérico, sencillo y reutilizable**;
2. no generar ni integrar la imagen definitiva durante esa primera iteración;
3. una vez estable la Semilla, la AI Collaborator debe indicar al Product Owner **el nombre exacto y la ruta del archivo de imagen asociado**;
4. el Product Owner crea/publica la imagen definitiva;
5. después se sustituye el icono provisional por la imagen y se realiza una prueba visual corta;
6. mantener separadas la validación funcional de la Semilla y la validación de su recurso gráfico.

**Criterio:** si este proceso no puede hacerse simple y repetible, no ampliar nuevas Semillas hasta replantear el mecanismo de incorporación.

---

## 🌿 9. Reglas que no deben perderse

- `docs/DOCUMENTATION_STANDARD.md` gobierna la documentación.
- GitHub `main` es la base canónica integrada.
- Reutilizar antes de crear.
- No crear arquitectura paralela para resolver una mejora menor.
- Persona Activa debe persistir durante navegación interna.
- Vista previa no persiste sesión/evidencia/progreso.
- Históricos y `Ver trabajo` son de solo lectura.
- Misión se completa automáticamente solo cuando existe evidencia fiable; en caso contrario, cierre manual + confirmación + revisión familiar.
- Recompensas reconocen esfuerzo, autonomía, constancia, crecimiento y cooperación; no perfección.
- Datos `🧪` no deben contaminar análisis educativos ni reconocimientos reales.
- Firestore Rules versionadas en GitHub no equivalen a Rules desplegadas en Firebase.

---

## 🌿 10. Rama / trabajo actual

| Campo | Valor actual |
|---|---|
| **Base canónica** | `main` |
| **Baseline funcional** | `4db6c734556e7fdc702bd0b78b228173d64ac036` |
| **Estado** | 🧊 Academia funcionalmente congelada |
| **Desarrollo funcional activo** | Ninguno |
| **Prioridad operativa** | Uso real de la Academia durante el inicio de clases |
| **Próximo cambio funcional** | Solo cuando el Product Owner descongele explícitamente el proyecto |

---

## ▶️ 11. Siguiente paso exacto al retomar desarrollo

No existe un desarrollo `On going` durante la congelación.

Cuando el Product Owner decida retomar:

1. partir del `main` vigente;
2. revisar este HandOff y `ROADMAP.md`;
3. confirmar si la primera prioridad sigue siendo **Velocidad de voz por Persona** o si el uso escolar real produjo una necesidad más urgente;
4. tratar la duplicación de Guacamaya como mejora menor independiente y solo después de un análisis nuevo del componente actual;
5. no añadir nuevas Semillas con el proceso anterior: aplicar primero el flujo `icono genérico → Semilla funcional → nombre/ruta de imagen → imagen del Product Owner → prueba visual`;
6. construir una sola iniciativa por vez y validar antes de abrir la siguiente.

---

# 🟣 Última actualización / On going — 04/09/2026

## Qué acabamos de cerrar

- Jornada documental P0 + P1 + P2.
- Verificación del flujo Creciendo por Dentro → Esperando a mi familia.
- PR #71 aprobado y fusionado.
- PR #72 descartado completamente y no fusionado.
- Academia devuelta a un baseline estable.
- Backlog de continuidad actualizado, incluida la mejora del proceso para nuevas Semillas.

## Qué estamos trabajando ahora

> **Nada funcional. Academia congelada.**

La prioridad inmediata es el uso real durante el inicio del curso escolar.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 1.4 |
| **Estado del producto** | 🧊 Congelado funcionalmente desde 04/09/2026 |
| **Baseline funcional al congelar** | `4db6c734556e7fdc702bd0b78b228173d64ac036` |
| **Mecanismo de continuidad** | Último HandOff + instrucción breve + verificación dirigida de fuentes |
| **Autoridad sobre estado implementado** | Repositorio y fuentes propietarias verificadas |
