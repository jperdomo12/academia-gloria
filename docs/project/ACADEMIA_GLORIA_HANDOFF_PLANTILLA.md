# 🔄 Academia Gloria Valentina · HandOff
## Plantilla viva de continuidad

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` |
| **Versión** | 1.6 |
| **Estado** | Activo · Fase de uso prioritario 2026–2027 |
| **Fecha de origen** | 03/09/2026 |
| **Última actualización** | 05/09/2026 |
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
| `docs/project/ROADMAP.md` | **Complementa:** evolución planificada y prioridades de producto. |
| `docs/project/DECISION_LOG.md` | **Complementa:** decisiones transversales estables. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Complementa:** ciclo operativo de construcción y cierre. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna:** incorporación curricular de 6.º a partir de material escolar real. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.6 | 05/09/2026 | Product Owner + AI Collaborator | Sustituye el concepto de “congelación funcional” por **Fase de uso prioritario**. Mantiene en espera el crecimiento funcional general para concentrarse durante varias semanas en uso real, motivación y utilidad efectiva; deja activo el carril de incorporación curricular de 6.º por una sola instrucción; formaliza reporte y resolución rápida de issues reales; añade el arranque preferido de nuevos chats desde GitHub y registra PR #7 como antecedente histórico cerrado sin merge. |
| 1.5 | 04/09/2026 | Product Owner + AI Collaborator | Registró PR #74 aprobado y fusionado, cerró la incidencia visual de Guacamayas y actualizó el baseline funcional. El término “congelación” utilizado en esta versión queda reinterpretado por v1.6 como una decisión de foco de gestión, no como inmovilidad del producto. |
| 1.4 | 04/09/2026 | Product Owner + AI Collaborator | Cerró P0/P1/P2, registró PR #71 aprobado, PR #72 descartado y consolidó pendientes de continuidad. |
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

## 🧭 2. Cómo iniciar o continuar un chat

### 2.1 Procedimiento preferido cuando GitHub está conectado

Abrir un nuevo chat y escribir:

```text
Continuamos el proyecto Academia Gloria Valentina.
Revisa en el repositorio jperdomo12/academia-gloria, rama main, el último
`docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` y sigue el protocolo de
`docs/ai/AI_CHAT_BOOTSTRAP.md`.

Verifica el estado actual en las fuentes propietarias antes de actuar.
No me pidas contexto que ya esté documentado.

Si el trabajo es incorporación de material escolar real de 6.º, aplica obligatoriamente
`docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` y todos los
estándares relacionados que correspondan.

Pregunta solo si falta información que pueda cambiar materialmente:
- qué debe aprender Gloria;
- el procedimiento exigido por el colegio;
- el nivel de dificultad;
- cómo la van a evaluar;
- una respuesta que deba coincidir exactamente con el material;
- o una decisión arquitectónica nueva no resuelta.

Al terminar la incorporación inicial, dime brevemente que estás listo para continuar.
```

Con GitHub conectado **no es necesario adjuntar manualmente este HandOff** si el nuevo chat puede leerlo directamente del repositorio.

### 2.2 Si GitHub no está disponible

1. proporcionar o adjuntar el último HandOff;
2. indicar brevemente que se continúa desde ese HandOff;
3. proporcionar únicamente las fuentes que el nuevo chat no pueda consultar;
4. no reconstruir conversaciones anteriores si el estado puede resolverse con HandOff + fuentes oficiales.

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

## 🌿 4. Fase de uso prioritario · desde 05/09/2026

La Academia **no está congelada**. El Product Owner ha decidido concentrar durante varias semanas la capacidad del proyecto en **usar bien lo que ya existe**, comprobar que Gloria lo utilice con motivación y que resulte de ayuda efectiva durante el inicio del curso 2026–2027.

La gestión durante esta fase se resume así:

```text
USAR LO EXISTENTE
        +
ALIMENTAR 6.º CON MATERIAL REAL DEL COLEGIO
        +
OBSERVAR UTILIDAD Y MOTIVACIÓN
        +
RESOLVER RÁPIDO LOS ISSUES REALES
        ↓
DECIDIR MÁS ADELANTE QUÉ NUEVAS FUNCIONES MERECEN CRECER
```

### 4.1 Qué queda temporalmente en espera

Durante esta fase no se priorizan por iniciativa propia:

- nuevas funcionalidades generales;
- mejoras visuales no motivadas por uso real;
- refactors preventivos;
- ampliaciones de motores;
- cambios de navegación;
- cambios de Recompensas;
- nuevas preferencias o configuraciones no urgentes.

Esto es una **regla de foco**, no una prohibición rígida de evolucionar.

### 4.2 Carril operativo activo · incorporación curricular de 6.º

La incorporación de Temas reales de 6.º **sí permanece activa** y no requiere “descongelar” el producto.

Entrada mínima suficiente:

```text
material del colegio
+ 6.º
+ materia
+ tema
+ notas opcionales
+ “Incorporar a la Academia”
```

Ejemplo:

```text
6.º · Lengua · Acentuación. Incorporar a la Academia.
```

Eso debe ser suficiente para iniciar el trabajo completo.

El propietario normativo es:

`docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`

La AI Collaborator debe aplicar **todos los estándares vigentes que correspondan**, sin delegar al Product Owner rutas, estructura técnica, evidencia, integración, navegación, Persona Activa, Vista previa, histórico, PR o merge.

Solo debe interrumpir cuando falte información que pueda cambiar materialmente:

1. qué debe aprender Gloria;
2. el procedimiento exigido por el colegio;
3. el nivel de dificultad;
4. cómo la van a evaluar;
5. una respuesta que deba coincidir exactamente con el material;
6. una decisión arquitectónica nueva no resuelta.

Cuando no exista uno de esos bloqueos, el flujo esperado es:

```text
material
→ análisis
→ construcción completa
→ validación interna
→ YA PUEDES PROBAR
→ observaciones opcionales / Aprobado
→ auditoría final
→ documentación aplicable
→ PR
→ revisión remota
→ merge a main
→ cierre
```

### 4.3 Carril operativo activo · issues de uso real

Todo issue observado durante el uso real debe **reportarse y verificarse**.

Flujo por defecto:

```text
issue observado
→ reproducir / verificar
→ identificar impacto y propietario
→ corregir con el cambio mínimo suficiente
→ validar
→ cerrar
```

Se resolverá con especial rapidez cuando afecte:

- aprendizaje;
- motivación o posibilidad real de continuar una actividad;
- acceso o navegación necesaria;
- pérdida, corrupción o asociación incorrecta de datos;
- Persona Activa / permisos;
- evidencia o progreso;
- bloqueo del uso escolar.

Un issue real puede justificar una corrección durante esta fase. **No debe convertirse automáticamente en una nueva iniciativa arquitectónica.**

### 4.4 Baseline funcional estable de referencia

```text
main
d893e977d2c5f122b97c7efecef1f665a1988f38
```

Este baseline funcional incorpora:

- **PR #71**, mejora aprobada de Creciendo por Dentro;
- **PR #74**, ajuste visual mínimo aprobado de `Mis Guacamayas`.

El HEAD documental de `main` puede ser posterior sin cambiar este baseline funcional.

Antecedentes:

- **PR #72**: cerrado sin merge; no reutilizar su enfoque de observador externo para Guacamayas.
- **PR #7**: cerrado el 05/09/2026 sin merge como **PR histórico/obsoleto**; cualquier necesidad futura de ese dominio debe partir de `main` vigente.

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

## ✅ 6. Capacidades cerradas antes de la fase de uso prioritario

### Misiones y acompañamiento

- ✅ Creación/preparación de Misiones · Repaso Académico.
- ✅ Comportamiento de Misión libre corregido.
- ✅ Gestión de Misiones V1.
- ✅ Lógica de sugerencias de refuerzo.
- ✅ Reporte de Análisis Educativo V1.
- ✅ Limpieza de datos/evidencias de prueba.
- ✅ Eliminación controlada de Misiones completadas.

### Motivación y crecimiento

- ✅ Recompensas / Reconocimientos V1.
- ✅ `Mis Guacamayas` como historial especializado plegado por defecto en PR #74.
- ✅ `Historia de crecimiento` conserva su lógica e indicador de apertura/cierre.

Principios vigentes: actividad/progreso real, sin rankings, sin comparación con otros y sin pérdida de recompensas.

### Calendarios y curso

- ✅ Recordatorios de Calendario al ingreso: evento del día + evento del día siguiente / un día antes.
- ✅ Portal 6.º de Primaria y Matemáticas preparado para crecimiento por Temas.
- ✅ Contrato de incorporación curricular de una sola instrucción.

### Otros

- ✅ Mi Baúl V1.
- ✅ Plantilla oficial de HandOff.
- ✅ Documentación P0/P1/P2 sincronizada.

---

## 🌱 7. Incidencias recientes revisadas y cerradas

### 7.1 Creciendo por Dentro · Misión / práctica libre

Se verificó mediante una Misión de prueba real:

```text
Misión Creciendo por Dentro
→ completar Semilla desde la Misión
→ guardar sesión
→ registrar evidencia
→ objetivo alcanzado
→ ⏳ Esperando a mi familia
```

**PR #71**, probado y aprobado, añade advertencia cuando una Semilla abierta libremente pertenece a una Misión activa y permite continuar la Misión o practicar libremente de forma consciente.

### 7.2 Mi Camino · Guacamaya repetida visualmente

✅ **Cerrado · PR #74 · 04/09/2026**

No existía duplicación de datos; una misma Guacamaya podía aparecer en distintos contextos visuales.

Solución aprobada:

- `Último reconocimiento` permanece sin cambios;
- `🦜 Mis Guacamayas` es historial especializado plegado inicialmente;
- `🌈 Historia de crecimiento` conserva su lógica;
- los bloques se alinean al ancho de referencia;
- no se modificaron datos, Firestore, Misiones ni creación de Recompensas.

Lección: para ajustes menores, modificar el componente propietario con el cambio mínimo; no crear capas externas que observen y reescriban el DOM.

---

## ⏳ 8. Backlog en espera por foco de uso

Estos puntos **siguen vigentes**, pero no se priorizan durante las primeras semanas salvo que el uso real los convierta en una necesidad más urgente.

### 8.1 Velocidad de voz por Persona

**Estado:** ⏳ En espera por foco de uso.

Objetivo futuro:

- preferencia propia de la Persona;
- administrable por adulto/administrador;
- interfaz simple: `Normal / Pausada / Muy pausada`;
- valores técnicos internos, no expuestos al alumno.

### 8.2 Mi Universo · comprensión de preguntas

**Estado:** ⏳ En espera para análisis futuro.

Objetivo pedagógico: ayudar a Gloria a adquirir consistencia en leer, identificar qué se pregunta y responder.

### 8.3 Actividades sugeridas para Gloria desde email

**Estado:** ⏳ En espera para análisis futuro.

Al retomarlo, evitar una pantalla o sistema paralelo por actividad; estudiar integración natural con capacidades existentes.

### 8.4 Creciendo por Dentro · proceso de incorporación de nuevas Semillas

**Estado:** 🟡 Incidencia de proceso / deuda técnica conocida.

Regla para una futura incorporación:

```text
Semilla funcional con icono genérico
→ prueba funcional
→ AI Collaborator indica nombre/ruta de imagen
→ Product Owner crea/publica imagen
→ sustitución
→ prueba visual breve
```

No ampliar nuevas Semillas con el proceso anterior si sigue resultando costoso.

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
- Los nuevos Temas de 6.º deben aplicar el modo de incorporación curricular de una sola instrucción y producir la evidencia académica exigida por el estándar.
- Issues reales de uso se reportan, verifican y corrigen con prioridad proporcional a su impacto.

---

## 🌿 10. Rama / trabajo actual

| Campo | Valor actual |
|---|---|
| **Base canónica** | `main` |
| **Baseline funcional de referencia** | `d893e977d2c5f122b97c7efecef1f665a1988f38` |
| **Estado operativo** | 🌿 Fase de uso prioritario |
| **Crecimiento funcional general** | ⏸️ En espera por foco de uso |
| **Carril curricular 6.º** | ✅ Activo con material escolar real |
| **Issues de uso real** | ✅ Reportar y resolver con rapidez |
| **Prioridad** | Uso motivado + ayuda efectiva + crecimiento curricular real |

---

## ▶️ 11. Siguiente paso exacto durante el curso

### Cuando llegue material escolar

La familia debe poder limitarse a:

```text
6.º · Materia · Tema. Incorporar a la Academia.
+ material del colegio
+ notas opcionales
```

La AI Collaborator realiza el resto aplicando las fuentes propietarias y todos los estándares correspondientes.

### Cuando aparezca un issue

La familia lo reporta de forma natural, idealmente con captura o pasos si los tiene. La AI Collaborator verifica antes de asumir la causa y propone/aplica la corrección mínima suficiente.

### Nuevas funcionalidades generales

Esperar varias semanas de uso real antes de volver a priorizarlas, salvo necesidad clara surgida del colegio, de Gloria o de la familia.

---

# 🟣 Última actualización / On going — 05/09/2026

## Qué acabamos de cerrar

- Jornada documental P0 + P1 + P2.
- PR #71 aprobado y fusionado.
- PR #72 descartado y no fusionado.
- PR #74 aprobado y fusionado.
- PR #7 cerrado sin merge como antecedente histórico/obsoleto.
- Mi Baúl V1 cerrado.
- Mecanismo oficial de HandOff activo.

## Qué estamos trabajando ahora

> **🌿 Fase de uso prioritario del curso 2026–2027.**

Prioridad inmediata:

1. que Gloria use la Academia de forma motivada;
2. comprobar que resulte de ayuda efectiva;
3. incorporar con rapidez Temas reales de 6.º a partir del material del colegio;
4. reportar y resolver rápidamente los issues que aparezcan con el uso;
5. posponer crecimiento funcional general durante varias semanas salvo necesidad real.

No existe una nueva funcionalidad general `On going`.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 1.6 |
| **Estado operativo** | 🌿 Fase de uso prioritario desde 05/09/2026 |
| **Baseline funcional de referencia** | `d893e977d2c5f122b97c7efecef1f665a1988f38` |
| **Crecimiento curricular 6.º** | ✅ Activo durante la fase |
| **Issues reales** | ✅ Reportar → verificar → corregir con rapidez |
| **Crecimiento funcional general** | ⏸️ En espera por foco de uso, no prohibido |
| **Mecanismo de continuidad** | GitHub `main` + último HandOff + Bootstrap + verificación dirigida de fuentes |
| **Autoridad sobre estado implementado** | Repositorio y fuentes propietarias verificadas |