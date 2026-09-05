# 📚 Documentación Oficial
## 🌈 Academia Gloria Valentina

> **¿Primera vez en el proyecto?** Empieza por `docs/FOUNDATION.md`: explica por qué existe la Academia y qué principios humanos no deben perderse al evolucionarla.

> **💬 ¿Vas a iniciar un nuevo chat?** Usa `docs/ai/AI_CHAT_BOOTSTRAP.md` → **📋 PROMPT RÁPIDO · NUEVO CHAT**. Esa es la única copia oficial del prompt; este README solo la referencia.

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/README.md` |
| **Versión** | 1.5 |
| **Estado** | Activo |
| **Fecha** | 22/08/2026 |
| **Última actualización** | 05/09/2026 |
| **Propietario** | Arquitectura Documental |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Portal de entrada, navegación y orientación de la documentación oficial de la Academia Gloria Valentina |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Fundamenta:** propósito humano y principios que gobiernan toda la Academia. |
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** arquitectura, dominios, propiedad y ciclo de vida del conocimiento. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** cómo crear, estructurar, versionar y mantener documentación oficial. |
| `docs/project/PROJECT_MAP.md` | **Orienta:** dónde vive cada parte del repositorio y qué fuente es propietaria. |
| `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` | **Fundamenta:** identidad y principios del producto/proyecto. |
| `docs/ai/AI_COLLABORATION_GUIDE.md` | **Complementa:** modelo general de colaboración con IA. |
| `docs/ai/AI_CHAT_BOOTSTRAP.md` | **Complementa:** incorporación rápida de una nueva IA y conserva el prompt oficial para iniciar un nuevo chat. |
| `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` | **Continúa:** conserva el punto operativo vigente para retomar rápidamente el trabajo en otro chat. |
| `docs/project/PROJECT_ROLES.md` | **Complementa:** roles, responsabilidades y autoridad. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna:** creación e incorporación de Temas Académicos, evidencia y expansión curricular. |
| `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` | **Implementa/documenta:** consumo de evidencias para análisis y fortalecimiento. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.5 | 05/09/2026 | Product Owner + AI Collaborator | Añade un acceso visible **Iniciar un nuevo chat** que referencia el `📋 PROMPT RÁPIDO · NUEVO CHAT` de `AI_CHAT_BOOTSTRAP.md`, manteniendo una sola copia oficial y evitando duplicar el prompt en este portal. Actualiza además la ruta recomendada de continuidad para priorizar recuperación directa desde GitHub cuando esté conectado. |
| 1.4 | 03/09/2026 | Product Owner + AI Collaborator | Incorpora la plantilla viva oficial de HandOff a la navegación documental y la ruta para retomar trabajo entre chats, manteniendo separado el contexto operativo reciente del bootstrap general de incorporación de IA. |
| 1.3 | 03/09/2026 | Product Owner + AI Collaborator | Sincroniza el portal con la estructura documental real. Incorpora `manuales/`, `specifications/` y `tech/`, corrige la responsabilidad de `models/`, añade `PROJECT_MAP.md` como mapa operativo y amplía la ruta para nuevos Temas de 6.º con evidencia y Análisis Educativo. Registra la jornada de sincronización documental P0 del 03Sep2026. |
| 1.2 | 22/08/2026 | Product Owner + AI Collaborator | Incorpora el estándar activo de Contenidos Académicos y Material Escolar y una ruta específica para diseñar o incorporar un Tema Académico. |
| 1.1 | 04/08/2026 | Product Owner + AI Collaborator | Actualización integral para reflejar la arquitectura documental vigente. Incorpora `ai/`, `product/` y `history/`, actualiza la ruta de lectura, elimina referencias obsoletas, adopta la estructura de `DOCUMENTATION_STANDARD.md` y conserva los principios documentales y convenciones resumidas de la versión anterior. |
| 1.0 | 27/07/2026 | Equipo del proyecto | Primera versión del índice y orientación general de la documentación. |

---

## 🎯 1. Propósito

Ser el **punto único de entrada** a la documentación oficial de la Academia Gloria Valentina.

Este documento permite:

- comprender cómo está organizada `docs/`;
- localizar rápidamente las fuentes oficiales;
- conocer una ruta de lectura proporcional a la tarea;
- distinguir documentación activa de histórica;
- orientar a personas e IA sin depender de conversaciones anteriores;
- y evitar que una nueva necesidad termine documentada en el lugar equivocado.

---

## 📐 2. Alcance

Este README describe la estructura documental de alto nivel y facilita su navegación.

No sustituye:

- `DOCUMENTATION_ARCHITECTURE.md`, que gobierna la arquitectura documental;
- `DOCUMENTATION_STANDARD.md`, que gobierna construcción y mantenimiento;
- `PROJECT_MAP.md`, que mapea el repositorio físico y propietarios;
- ni los documentos propietarios de cada dominio.

---

## 🧭 3. Principios documentales rápidos

### 3.1 Una verdad importante, un propietario

Cada conocimiento estable debe tener una fuente propietaria reconocible.

Otros documentos pueden enlazarla o resumirla, pero no mantener una segunda definición normativa que evolucione de forma independiente.

### 3.2 Una pregunta principal por documento

Un documento debe tener responsabilidad clara y delimitada.

### 3.3 Actualizar antes que crear

Antes de crear un archivo nuevo:

1. buscar el conocimiento existente;
2. identificar su propietario;
3. comprobar si el propietario puede evolucionar;
4. crear solo cuando exista una pregunta distinta y un hueco real.

### 3.4 Producto real antes que afirmación documental

Cuando un documento declara una capacidad como implementada debe haberse contrastado con las fuentes reales suficientes: código, comportamiento, datos o entregas fusionadas según corresponda.

### 3.5 Conversación no es SSOT

Un chat puede originar un acuerdo, pero el conocimiento estable debe consolidarse en su fuente propietaria:

```text
Conversación / desarrollo
→ acuerdo validado
→ identificar propietario
→ consolidar conocimiento estable
→ historial de versión
```

### 3.6 Evolucionar, no desechar

Preservar lo válido, actualizar lo desfasado y eliminar solo duplicidad/obsolescencia confirmada.

---

## 🗂️ 4. Estructura documental actual

```text
docs/
├── README.md
├── FOUNDATION.md
├── DOCUMENTATION_ARCHITECTURE.md
├── DOCUMENTATION_STANDARD.md
├── CARTA_A_GLORIA.md
│
├── ai/              Colaboración e incorporación de IA
├── history/         Documentación histórica/sustituida
├── manuales/        Guías operativas para uso/administración
├── models/          Modelos conceptuales
├── product/         Arquitectura, identidad y diseños de producto
├── project/         Gobierno, planificación, releases y operación
├── specifications/  Especificaciones funcionales de capacidades
├── standards/       Reglas y estándares reutilizables
├── tech/            Referencias y auditorías técnicas
└── vision/          Visión estratégica y evoluciones conceptuales
```

---

## 📚 5. Responsabilidad por dominio

| Carpeta | Responsabilidad |
|---|---|
| `ai/` | Modelo de colaboración con IA y protocolos de incorporación. |
| `history/` | Documentos sustituidos/históricos; no son fuente activa cuando existe sucesor. |
| `manuales/` | Procedimientos operativos orientados a uso o administración. |
| `models/` | Representación conceptual de entidades, relaciones y comportamiento; evita convertirse en segunda norma. |
| `product/` | Arquitectura de experiencia, identidad, personajes y diseños de producto. |
| `project/` | Gobierno, planificación, roles, decisiones, releases, workflow, continuidad y mapa del proyecto. |
| `specifications/` | Comportamiento funcional específico y verificable de capacidades/módulos. |
| `standards/` | Reglas normativas reutilizables y contratos transversales. |
| `tech/` | Auditorías, transiciones y decisiones técnicas específicas que no pertenecen a un estándar funcional. |
| `vision/` | Visiones y modelos futuros/estratégicos que no deben confundirse con implementación actual. |

---

## 🛣️ 6. Rutas recomendadas de lectura

### 6.1 Comprender la esencia del proyecto

1. `docs/FOUNDATION.md`
2. `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md`
3. `docs/vision/01_PRINCIPIOS_PEDAGOGICOS.md`

### 6.2 Comprender la documentación

1. `docs/DOCUMENTATION_ARCHITECTURE.md`
2. `docs/DOCUMENTATION_STANDARD.md`
3. `docs/project/PROJECT_MAP.md`

### 6.3 Incorporar una nueva IA o retomar el proyecto

**Si GitHub está conectado**, la ruta preferida es:

1. abrir `docs/ai/AI_CHAT_BOOTSTRAP.md`;
2. copiar el bloque **📋 PROMPT RÁPIDO · NUEVO CHAT**;
3. pegarlo en el chat nuevo;
4. el nuevo chat recupera desde `main` el HandOff vigente y las fuentes propietarias necesarias.

**Si GitHub no está disponible**, empezar por:

1. `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` — proporcionar la última versión disponible;
2. `AGENTS.md`;
3. `docs/ai/AI_CHAT_BOOTSTRAP.md`;
4. `docs/ai/AI_COLLABORATION_GUIDE.md`;
5. `docs/project/PROJECT_ROLES.md`;
6. los documentos propietarios de la tarea concreta.

El prompt no se duplica en este README: su única copia oficial vive en `docs/ai/AI_CHAT_BOOTSTRAP.md`.

### 6.4 Comprender cómo se desarrolla producto

1. `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md`
2. `docs/project/ROADMAP.md`
3. `docs/project/RELEASE_NOTES.md`
4. especificación/estándar del bloque que se vaya a tocar.

### 6.5 Comprender la experiencia del producto

1. `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
2. `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md`
3. el estándar/especificación del módulo concreto.

### 6.6 Incorporar un nuevo Tema Académico de 6.º

Ruta mínima recomendada:

1. `AGENTS.md`
2. `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`
3. `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md`
4. `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
5. `docs/project/PROJECT_MAP.md`
6. especificación del módulo/Misiones cuando aplique;
7. `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` para confirmar que la evidencia producida será reutilizable.

Entrada normal suficiente para la familia:

```text
material oficial del colegio
+ curso
+ materia
+ nombre del Tema
+ notas opcionales
```

La AI Collaborator debe resolver la ubicación `Curso → Asignatura → Tema`, estructura técnica, reutilización, evidencia, histórico, análisis y fortalecimiento aplicando los estándares vigentes.

### 6.7 Trabajar con Misiones

1. `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`
2. `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md`
3. `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md` si interviene consulta de evidencia;
4. `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` si intervienen análisis/refuerzos.

### 6.8 Recompensas / Reconocimientos

1. `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md`
2. `docs/standards/STD-SEGUIMIENTO_Y_MOTIVACION.md`
3. estándares de Misiones/evidencias cuando el reconocimiento dependa de actividad real.

---

## 🔎 7. Principios de navegación documental

### Fuente oficial antes que conversación

Cuando existe fuente activa, prevalece sobre:

- conversaciones;
- borradores;
- copias;
- documentación histórica.

### Documento propietario antes que duplicación

Antes de añadir una regla, identificar quién debe poseerla.

### Documentación activa antes que histórica

`docs/history/` conserva contexto; no gobierna cuando existe sucesor activo.

### Lectura proporcional

No es necesario leer todo `docs/` para cada tarea. Leer:

- reglas generales necesarias;
- propietario del dominio;
- fuentes directamente relacionadas.

---

## 📊 8. Estado documental al 05/09/2026

### Base consolidada

- arquitectura documental;
- estándar documental v1.2;
- Foundation/ADN;
- colaboración con IA;
- workflow;
- roles del proyecto;
- arquitectura de experiencia;
- identidad visual;
- estándar académico de 6.º y material escolar;
- plantilla viva de HandOff para continuidad entre chats;
- Bootstrap con prompt oficial único de nuevo chat.

### Fuentes propietarias relevantes

- `SPEC-ANALISIS_EDUCATIVO.md` — V1 implementada y contrato de consumo de evidencias;
- `STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` v1.3 — incorporación curricular mínima + evidencia obligatoria para nuevos Temas de 6.º;
- `ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` — continuidad operativa y punto vigente mantenible entre chats;
- `AI_CHAT_BOOTSTRAP.md` — incorporación de IA + única copia oficial del prompt rápido de nuevo chat.

### Jornada documental P0/P1/P2

La jornada de sincronización documental quedó cerrada el 04/09/2026. A partir de ese punto se actualizan únicamente las fuentes afectadas por decisiones nuevas o cambios reales de estado.

---

## 🗃️ 9. `docs/history/`

Contiene documentos que:

- fueron sustituidos;
- dejaron de ser fuente oficial;
- representan una fotografía histórica;
- o se conservan por trazabilidad.

Cuando sea posible, un histórico debe indicar:

- estado;
- motivo de sustitución;
- fecha;
- documento vigente sucesor.

No forma parte de la ruta normal de lectura.

---

## ✅ 10. Convenciones resumidas

Las reglas completas viven en `DOCUMENTATION_STANDARD.md`.

Recordatorio rápido:

- metadatos coherentes;
- 🕘 historial obligatorio y preservado;
- estado canónico;
- nombre estable para documentos activos;
- una pregunta principal;
- propietario claro;
- referencias a fuentes relacionadas;
- distinguir `Implementado / En desarrollo / Propuesto / Visión futura`;
- no usar copias `final`, `nuevo`, `corregido` como estrategia de versionado;
- iconos pueden mejorar escaneabilidad, pero **el texto es normativo**;
- antes de declarar “Implementado”, contrastar producto real;
- actualizar solo las fuentes afectadas.

---

## 🔄 11. Mantenimiento

Actualizar este README cuando:

- cambie la estructura de `docs/`;
- aparezca/elimine una familia documental;
- cambie de forma significativa la ruta de lectura;
- se incorpore una fuente propietaria de alto impacto que deba ser visible desde el portal;
- cambie el procedimiento general de incorporación de IA, continuidad entre chats o contenido académico.

No requiere actualización por cada cambio interno de un documento.

---

## 📌 12. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| README-001 | `docs/README.md` es el portal único de entrada a la documentación oficial. | Aprobada |
| README-002 | La estructura visible debe reflejar todas las familias documentales activas reales. | Aprobada |
| README-003 | `history/` es dominio no activo y queda fuera de la ruta normal de lectura. | Aprobada |
| README-004 | Utilizar rutas de lectura proporcionales en lugar de exigir leer todo `docs/`. | Aprobada |
| README-005 | Este README funciona como mapa y no duplica normativa de propietarios. | Aprobada |
| README-006 | Mantener un resumen operativo de principios sin sustituir `DOCUMENTATION_STANDARD.md`. | Aprobada |
| README-007 | Evolucionar documentos mediante cambios mínimos y preservar conocimiento válido. | Aprobada |
| README-008 | Mantener una ruta específica para incorporación de Temas Académicos. | Aprobada |
| README-009 | Los nuevos Temas de 6.º deben considerar desde su incorporación evidencia reutilizable por Análisis Educativo/fortalecimiento. | Aprobada |
| README-010 | `PROJECT_MAP.md` forma parte de la ruta de orientación para localizar propietarios físicos/documentales. | Aprobada |
| README-011 | La plantilla viva de HandOff es la entrada operativa preferida para recuperar continuidad reciente. | Aprobada |
| README-012 | `AI_CHAT_BOOTSTRAP.md` conserva la única copia oficial del prompt rápido de nuevo chat; este portal únicamente la enlaza. | Aprobada |

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Activo |
| **Versión activa** | 1.5 |
| **Última sincronización** | 05/09/2026 |
| **Portal documental** | `docs/README.md` |
| **Prompt oficial de nuevo chat** | `ai/AI_CHAT_BOOTSTRAP.md` → `📋 PROMPT RÁPIDO · NUEVO CHAT` |
| **Gobierno de estructura** | `DOCUMENTATION_ARCHITECTURE.md` |
| **Gobierno de calidad/formato** | `DOCUMENTATION_STANDARD.md` |
| **Mapa físico/propietarios** | `project/PROJECT_MAP.md` |
| **Continuidad entre chats** | `project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` |
| **Principio** | Leer proporcionalmente, localizar propietario, reutilizar y consolidar solo conocimiento estable. |

**Impacto:** Navegación · Arquitectura Documental · Onboarding · Continuidad · Trazabilidad · Incorporación Académica