# Documentación Oficial


## Antes de comenzar...

Si quieres comprender el propósito y la filosofía de la Academia Gloria Valentina, te recomendamos comenzar leyendo:

📖 `docs/FOUNDATION.md`

Este documento explica la visión, los principios y la razón de ser del proyecto.
##


## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/README.md` |
| **Versión** | 1.2 |
| **Estado** | Activo |
| **Fecha** | 22/08/2026 |
| **Última actualización** | 22/08/2026 |
| **Propietario** | Arquitectura Documental |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Portal de entrada, navegación y orientación de la documentación oficial de la Academia Gloria Valentina |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** define la arquitectura, dominios, propiedad y ciclo de vida del conocimiento. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** define cómo se crean, estructuran, versionan y mantienen los documentos oficiales. |
| `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` | **Fundamenta:** define propósito, identidad y principios del producto. |
| `docs/ai/AI_COLLABORATION_GUIDE.md` | **Complementa:** define el modelo general de colaboración con IA. |
| `docs/ai/AI_CHAT_BOOTSTRAP.md` | **Complementa:** define la incorporación rápida de una nueva IA al proyecto. |
| `docs/project/PROJECT_ROLES.md` | **Complementa:** define roles, responsabilidades y autoridad. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Estándar relevante:** gobierna la creación, adaptación, incorporación y validación de Temas Académicos. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 27/07/2026 | Equipo del proyecto | Primera versión del índice y orientación general de la documentación. |
| 1.1 | 04/08/2026 | Product Owner + AI Collaborator | Actualización integral para reflejar la arquitectura documental vigente. Incorpora `ai/`, `product/` y `history/`, actualiza la ruta de lectura, elimina referencias obsoletas, adopta la estructura de `DOCUMENTATION_STANDARD.md` y conserva los principios documentales y convenciones resumidas de la versión anterior. |
| 1.2 | 22/08/2026 | Product Owner + AI Collaborator | Incorpora el estándar activo de Contenidos Académicos y Material Escolar y una ruta específica para diseñar o incorporar un Tema Académico. |

## 1. Propósito

Ser el **punto único de entrada** a la documentación oficial de la Academia Gloria Valentina.

Este documento permite:

- comprender cómo está organizada `docs/`;
- localizar rápidamente las fuentes oficiales;
- conocer la ruta recomendada de lectura;
- distinguir documentación activa de histórica;
- y orientar a personas e IA sin depender de conversaciones anteriores.

## 2. Alcance

Este README describe la estructura documental de alto nivel y facilita su navegación.

No sustituye:

- `DOCUMENTATION_ARCHITECTURE.md`, que gobierna la arquitectura documental;
- `DOCUMENTATION_STANDARD.md`, que gobierna la construcción y mantenimiento de documentos;
- ni los documentos propietarios de cada dominio.

## 3. Principios documentales

### 3.1 Fuente única de verdad — SSOT

Cada conocimiento importante debe tener un único documento propietario.

Los demás documentos pueden enlazarlo, resumirlo brevemente o explicar su relación con otros componentes, pero no deben mantener una segunda definición completa que pueda evolucionar de forma independiente.

> **Una verdad importante, un propietario documental.**

### 3.2 Una pregunta principal por documento

Cada documento debe responder principalmente a una pregunta y mantener una responsabilidad claramente delimitada.

### 3.3 Actualizar antes que crear

Antes de crear un documento nuevo debe comprobarse:

1. si el conocimiento ya tiene propietario;
2. si puede actualizarse un documento existente;
3. si el nuevo documento responde a una pregunta realmente distinta;
4. y si aporta valor suficiente para justificar su mantenimiento.

### 3.4 La documentación acompaña al producto

La documentación debe preservar conocimiento, facilitar decisiones y acompañar el desarrollo sin convertirse en un bloqueador.

Cuando el análisis deja de aportar decisiones nuevas, se construye, se valida y después se consolida el conocimiento estable.

### 3.5 Evolucionar, no desechar

Los documentos existentes deben evolucionarse con cambios mínimos sobre la versión aprobada:

- conservar lo que sigue siendo válido;
- actualizar lo que quedó desfasado;
- mover lo que pertenece a otro propietario;
- y eliminar únicamente duplicidades u obsolescencia confirmada.

## 4. Estructura documental

```text
docs/
├── ai/            Colaboración e incorporación de IA
├── history/       Documentos históricos o sustituidos
├── models/        Modelos funcionales y especificaciones
├── product/       Arquitectura e identidad del producto
├── project/       Gobierno, planificación y operación
├── standards/     Estándares funcionales y técnicos
├── vision/        Visión estratégica y evolución
├── DOCUMENTATION_ARCHITECTURE.md
├── DOCUMENTATION_STANDARD.md
└── README.md
```

## 5. Descripción de dominios

| Carpeta | Responsabilidad |
|---|---|
| `ai/` | Modelo de colaboración con IA y protocolos de incorporación. |
| `history/` | Documentos sustituidos o históricos. No constituyen fuente oficial activa. |
| `models/` | Modelos conceptuales y especificaciones funcionales del producto. |
| `product/` | Arquitectura de experiencia, identidad y otros elementos estructurales del producto. |
| `project/` | Gobierno, ADN, planificación, workflow, roles, decisiones y evolución del proyecto. |
| `standards/` | Estándares reutilizables y reglas transversales. |
| `vision/` | Visiones de producto, módulos y evolución futura. |

## 6. Ruta recomendada de lectura

### 6.1 Comprender el proyecto

1. `docs/DOCUMENTATION_ARCHITECTURE.md`
2. `docs/DOCUMENTATION_STANDARD.md`
3. `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md`

### 6.2 Comprender la colaboración

4. `docs/ai/AI_COLLABORATION_GUIDE.md`
5. `docs/ai/AI_CHAT_BOOTSTRAP.md`
6. `docs/project/PROJECT_ROLES.md`

### 6.3 Comprender cómo se construye

7. `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md`

### 6.4 Comprender el producto

8. `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
9. `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md`

### 6.5 Profundizar en un dominio

Consultar únicamente los documentos relevantes dentro de:

- `models/`;
- `standards/`;
- `vision/`;
- y cualquier documento propietario identificado por la arquitectura.

No es necesario leer todo el repositorio documental para realizar una tarea concreta.

### 6.6 Diseñar o incorporar un Tema Académico

1. `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`
2. `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md`
3. `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
4. La especificación del módulo o de Misiones, cuando corresponda.

## 7. Principios de navegación

### 7.1 Fuente oficial antes que conversación

Cuando exista una fuente oficial, prevalece sobre:

- conversaciones anteriores;
- borradores;
- copias;
- documentos históricos.

### 7.2 Documento propietario antes que duplicación

Antes de crear conocimiento nuevo debe identificarse dónde vive oficialmente.

### 7.3 Documentación activa antes que histórica

Los documentos de `history/` se conservan por trazabilidad.

No deben utilizarse como fuente vigente cuando exista un documento activo que los sustituya.

### 7.4 Lectura proporcional

Cada colaborador debe consultar:

- el núcleo mínimo necesario;
- el documento propietario;
- y las fuentes directamente relacionadas con su tarea.

## 8. Estado general

### 8.1 Base fundacional

La arquitectura fundacional incluye actualmente:

- arquitectura documental;
- estándar documental;
- ADN;
- arquitectura de experiencia;
- identidad visual y personajes;
- colaboración con IA;
- bootstrap de IA;
- workflow de desarrollo;
- y roles del proyecto.

### 8.2 Documentación en consolidación

Continúan evolucionando progresivamente:

- modelos;
- estándares heredados;
- visiones;
- planificación;
- documentos históricos;
- y documentación específica de módulos.

La consolidación documental no debe bloquear la evolución del producto.

### 8.3 Panorama ejecutivo

| Área | Estado |
|---|---|
| Arquitectura y gobierno documental | Consolidado |
| Documentos fundacionales | Consolidado |
| Colaboración con IA y workflow | Consolidado |
| Modelos y especificaciones | En revisión progresiva |
| Estándares heredados | En revisión progresiva |
| Visiones de módulos | En clasificación |
| Documentos históricos | Organizados en `history/` |
| Arquitectura de recursos e identidad técnica | Pendiente de evolución con el producto |


## 9. Carpeta `history/`

`docs/history/` contiene documentos que:

- fueron sustituidos;
- dejaron de ser fuente oficial;
- representan una fotografía histórica;
- o se conservan por trazabilidad.

Un documento histórico debe indicar, cuando sea posible:

- su estado;
- motivo de sustitución;
- fecha;
- y documento vigente que lo reemplaza.

Los documentos de `history/` no forman parte de la ruta normal de lectura.

## 10. Convenciones documentales resumidas

Las reglas completas se mantienen en `docs/DOCUMENTATION_STANDARD.md`.

Como orientación rápida:

- todo documento oficial debe incluir metadatos, historial y estado;
- los documentos aprobados mantienen un nombre estable y la versión dentro de su cabecera;
- deben utilizarse rutas claras y referencias al documento propietario;
- no deben crearse copias denominadas `final`, `nuevo`, `corregido` o equivalentes;
- los documentos oficiales deben construirse desde el inicio con la estructura aplicable del estándar;
- y deben entregarse completos como archivos listos para revisión.

No todos los cambios del producto requieren actualizar toda la documentación. Solo se actualizan las fuentes afectadas.

## 11. Mantenimiento

Este README debe actualizarse cuando:

- cambie la estructura de `docs/`;
- se incorpore o elimine un dominio documental;
- cambie significativamente la ruta recomendada de lectura;
- o aparezca una nueva fuente fundacional.

Los cambios internos de un documento que no afecten la navegación general no requieren actualizar este README.

## Decisiones adoptadas

| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| README-001 | Establecer `docs/README.md` como portal único de entrada a la documentación. | Aprobado | Navegación · Onboarding |
| README-002 | Incorporar formalmente `ai/`, `product/` y `history/` a la estructura visible. | Aprobado | Arquitectura Documental |
| README-003 | Definir `history/` como dominio no activo y fuera de la ruta normal de lectura. | Aprobado | Trazabilidad |
| README-004 | Utilizar una ruta de lectura progresiva en lugar de exigir lectura completa de `docs/`. | Aprobado | Eficacia |
| README-005 | Mantener este README como mapa, evitando duplicar el contenido de los documentos propietarios. | Aprobado | SSOT · Mantenibilidad |
| README-006 | Conservar un resumen operativo de los principios documentales sin sustituir a `DOCUMENTATION_STANDARD.md`. | Aprobado | Continuidad · Eficacia |
| README-007 | Evolucionar documentos existentes mediante cambios mínimos sobre la versión vigente. | Aprobado | Preservación del conocimiento |
| README-008 | Incorporar una ruta específica y el estándar propietario para diseñar o incorporar Temas Académicos. | Aprobado | Navegación · Aprendizaje Académico |

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Aprobado |
| **Versión activa** | 1.2 |
| **Fecha de aprobación** | 22/08/2026 |
| **Aprobado por** | Product Owner |
| **Sustituye** | Versión anterior de `docs/README.md` |
| **Sustituido por** | — |

**Impacto:** Navegación · Arquitectura Documental · Onboarding · Trazabilidad
