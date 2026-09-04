# 🚀 Release Notes
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/RELEASE_NOTES.md` |
| **Versión del documento** | 1.2 |
| **Estado** | Activo |
| **Fecha** | 03/08/2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Gobierno del Producto |
| **Responsables** | Juan Perdomo + Arquitectura colaborativa con IA |
| **Ámbito** | Versionado, publicación y trazabilidad de entregas de Academia Gloria Valentina |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/DOCUMENTATION_ARCHITECTURE.md` | Define el dominio, la propiedad y el ciclo de vida de este documento. |
| `docs/DOCUMENTATION_STANDARD.md` | Gobierna su estructura, metadatos, estados, historial y mantenimiento. |
| `docs/project/DECISION_LOG.md` | Conserva decisiones transversales de producto cuando corresponda. |
| `docs/project/ROADMAP.md` | Orienta la evolución prevista del producto sin sustituir el historial de entregas. |

## 🕘 Historial de versiones del documento

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.2 | 04/09/2026 | Juan Perdomo + AI Collaborator | Registra el PR #74 como entrega visual validada y fusionada sin nueva versión de producto: `Mis Guacamayas` plegado por defecto, flechas consistentes y alineación de los tres bloques de reconocimientos. |
| 1.1 | 03/09/2026 | Juan Perdomo + IA | Sincroniza el documento con las entregas reales fusionadas entre 29Ago y 03Sep2026. Distingue releases formales de GitHub, versiones históricas internas y bloques de producto validados todavía sin nueva versión asignada. Registra Gestión de Misiones, evidencias académicas, refuerzos, Análisis Educativo, limpieza de pruebas, Recompensas/Reconocimientos, `Ver trabajo`, recordatorios de calendario y los nuevos portales de 6.º. Corrige la inconsistencia de estado documental de la versión anterior. |
| 1.0-rc1 | 03/08/2026 | Juan Perdomo + IA | Primera consolidación formal. Incorpora metadatos, política de versionado, estado de release, estructura común y preserva el contenido existente de `v2.3-RC6`. |

---

## 🎯 1. Propósito

Este documento registra las versiones publicadas, candidatas y entregas funcionales validadas de **Academia Gloria Valentina** y permite conocer:

- qué versiones formales del producto fueron publicadas;
- qué versiones internas quedaron registradas históricamente;
- qué capacidades reales fueron entregadas y fusionadas aunque todavía no exista una nueva versión de producto asignada;
- qué módulos fueron afectados;
- qué decisiones de producto se materializaron, cuando corresponda;
- cómo ha evolucionado el producto a lo largo del tiempo.

`RELEASE_NOTES.md` describe la evolución **real** del producto. No sustituye al roadmap, al registro de decisiones ni a la documentación técnica o funcional propietaria.

---

## 📦 2. Política de versionado y trazabilidad

La Academia utiliza un esquema inspirado en versionado semántico:

```text
MAYOR.MENOR.PARCHE
```

Cuando una versión todavía está en validación puede utilizar un sufijo de candidato:

```text
MAYOR.MENOR.PARCHE-RC<N>
```

Ejemplos:

- `3.0.0`
- `3.1.0`
- `3.1.1`
- `3.2.0-RC1`

### 2.1 Versión mayor

Se incrementa cuando existe un cambio significativo en la identidad, arquitectura, experiencia principal o alcance del producto.

### 2.2 Versión menor

Se incrementa cuando se incorpora una funcionalidad, módulo o evolución relevante compatible con la versión mayor vigente.

### 2.3 Versión de parche

Se incrementa cuando se publican correcciones, ajustes visuales, mejoras de contenido o cambios internos que no alteran de forma relevante la experiencia o arquitectura principal.

### 2.4 Release Candidate

Una versión `RC` es una entrega candidata a convertirse en estable. Puede utilizarse en validación real antes de su publicación definitiva.

### 2.5 Una fusión a `main` no asigna automáticamente una versión

> **PR fusionado ≠ nueva versión de producto.**

Una capacidad puede estar terminada, validada y fusionada en `main` sin que el Product Owner haya decidido todavía publicar una nueva versión numerada.

En ese caso se registra en este documento como **entrega validada sin nueva versión asignada**.

No se inferirá una versión como `2.4`, `2.5` o `3.0` únicamente por cantidad, tamaño o importancia de los PRs fusionados.

La asignación de una nueva versión de producto requiere una decisión explícita del Product Owner.

### 2.6 Tres niveles de trazabilidad

Se distinguen:

1. **Release formal publicada:** existe una publicación/tag formal en GitHub o mecanismo equivalente adoptado por el proyecto.
2. **Versión histórica interna:** versión registrada documentalmente aunque no exista una GitHub Release equivalente.
3. **Entrega validada sin nueva versión asignada:** bloque funcional fusionado y disponible en `main`, pendiente de agruparse bajo una futura versión formal si el Product Owner lo decide.

> La versión del producto y la versión de este documento son independientes.

---

## 🏷️ 3. Estados de una release

| Estado | Significado |
|---|---|
| **En desarrollo** | La versión todavía está siendo construida. |
| **Release Candidate** | La versión está completa y en validación. |
| **Activa** | La versión fue aprobada como entrega vigente. |
| **Sustituida** | Una versión posterior asumió su vigencia. |
| **Retirada** | La versión dejó de utilizarse por una causa explícita. |

Para una entrega aún sin versión de producto se utilizará la expresión:

> **Validada y fusionada · sin nueva versión asignada**

Esto describe su estado sin inventar versionado.

---

# ✅ 4. Entregas validadas posteriores a `v2.3-RC6`

## 4.1 Estado general

| Campo | Valor |
|---|---|
| **Período cubierto** | 29/08/2026 – 04/09/2026 |
| **Estado** | Validado y fusionado en `main` |
| **Nueva versión de producto** | No asignada todavía |
| **Criterio** | Se registran capacidades reales y cerradas; no pendientes ni trabajo exploratorio |

Estas entregas representan una evolución funcional importante de la Academia, pero **no constituyen por sí mismas una nueva versión numerada** hasta que el Product Owner lo determine.

---

## 4.2 04Sep2026 · Mi Camino: historial plegable de Guacamayas

**PR #74 · `Fix: plegar Mis Guacamayas sin tocar la lógica`**

### Entregado

- `🦜 Mis Guacamayas` se presenta como historial especializado mediante `<details>` nativo;
- el historial comienza cerrado por defecto;
- al abrirlo muestra las mismas Guacamayas ya existentes;
- el estado abierto se conserva durante re-renderizados del módulo;
- `🌈 Historia de crecimiento` mantiene su comportamiento y recibe una flecha visual consistente de apertura/cierre;
- Último reconocimiento, Mis Guacamayas e Historia de crecimiento se alinean al ancho de referencia de Constancia/Crecimiento (`max-width: 1320px`).

### Alcance técnico

- solo se modificaron `reconocimientos-camino.js` y `reconocimientos-camino.css`;
- no se modificaron datos, Firestore, creación de Guacamayas, Misiones, navegación ni `mision-libre.js`;
- no se añadió `MutationObserver` ni script auxiliar.

### Validación

El Product Owner probó el ajuste localmente, indicó que quedó **muy bien**, solicitó únicamente igualar la flecha de Historia de crecimiento y aprobó la versión final antes del merge.

### Antecedente preservado

El PR #72 fue descartado sin merge. El cierre de PR #74 confirma el criterio de resolver mejoras menores directamente en el componente propietario y con el cambio mínimo posible.

---

## 4.3 03Sep2026 · 6.º de Primaria: portales y estándar de tarjetas

**PR #49 · `6.º: nuevos portales y estándar de tarjetas`**

### Entregado

- nueva portada visual de **6.º de Primaria**;
- bloque destacado **Así aprendemos en 6.º** antes de las asignaturas;
- etapas:
  - 👀 Comprender;
  - ✏️ Practicar;
  - 🔎 Comprobar;
  - 🌱 Recordar y usar;
- portal de **Matemáticas 6.º** preparado para crecer con muchos Temas;
- jerarquía visible `6.º → Matemáticas → Tema`;
- Fracciones conservado como Tema real sin rediseñar su arquitectura interna;
- recursos de apoyo separados del catálogo curricular;
- catálogo reutilizable de Temas y buscador preparado para activarse cuando el volumen lo requiera;
- patrón de cuadrícula adoptado como referencia de la Academia:

```text
3 columnas · escritorio
2 columnas · tablet
2 columnas · móvil normal/ancho
1 columna   · solo pantallas muy estrechas
```

### Validación

Portada de 6.º y portal de Matemáticas aprobados funcional y visualmente por el usuario antes de la fusión.

---

## 4.4 02Sep2026 · Calendario: recordatorios al ingresar

**PR #48 · `Calendario: recordatorios al ingresar en la Academia`**

### Entregado

- revisión automática del calendario de la Persona Activa al entrar en la Academia;
- recordatorios de eventos de **HOY** y **MAÑANA**;
- una única ventana por Persona Activa y día durante la misma sesión;
- ausencia de ventana cuando no existen recordatorios;
- acceso directo a Mi Calendario;
- fallo del recordatorio aislado para no bloquear la portada.

### Validación

Comportamiento funcional aprobado por el usuario.

---

## 4.5 01–02Sep2026 · Recompensas / Sistema de Motivación y Reconocimiento V1

**PRs #40, #41, #42, #43, #44, #46 y #47**

### Diseño fundacional

Se consolidó un modelo de motivación basado en progreso y actividad reales, con cuatro mecanismos conceptuales:

- ✨ Reconocimiento;
- 🏅 Récord Personal;
- 🦜 Guacamaya;
- 🤝 Reto cooperativo.

Principios:

- no rankings;
- no comparación entre alumnos;
- no puntos/monedas como objetivo central;
- no pérdida de recompensas;
- no recompensas por clic o login;
- datos `🧪` excluidos de logros reales;
- protección frente a sobre-recompensa.

### Reconocimiento humano y Guacamayas

- reconocimiento humano sobre Misiones completadas reales;
- visualización en **Mi Camino → Así voy creciendo**;
- seis categorías iniciales de Guacamaya;
- una categoría de Guacamaya se concede como máximo una vez por Persona;
- confirmación humana para elevar un reconocimiento a Guacamaya;
- preservación histórica controlada cuando desaparece la Misión fuente.

### Reconocimientos automáticos de Lía · Detectives

Primera automatización segura basada en señales de sesiones reales:

- usar una pista y continuar;
- persistencia ante intentos adicionales;
- máximo un reconocimiento automático por sesión;
- límites de frecuencia;
- sin backfill histórico;
- exclusión estricta de datos de prueba.

### Constancia y transparencia motivacional

- reconocimiento por alcanzar 7 días consecutivos de actividad significativa;
- se reutiliza la misma fuente de **Mi constancia**;
- guía `🌈 ¿Qué cosas celebra la Academia?`;
- explicación visual adaptada al alumno;
- Guacamayas presentadas como hitos especiales, no como checklist transaccional.

### Integración con Gestión de Misiones

- marca `🏅 Recompensa` en Misiones reconocidas;
- filtro específico compatible con Estado, Tipo/Tema y datos `🧪`;
- corrección posterior del filtro para funcionar independientemente de la página del paginador.

---

## 4.6 02Sep2026 · Acceso unificado `👁️ Ver trabajo`

**PR #45 · `Acceso de consulta · Ver trabajo`**

### Entregado

Un único contrato de consulta para revisar trabajo realizado desde Mi Camino y Gestión de Misiones.

Incluye:

- modo `consulta`;
- Persona Activa;
- retorno al origen;
- reutilización de visores especializados de Detectives y Resultado Académico;
- visor general de solo lectura para otros motores;
- lectura rica de Rincón de Lectura;
- acceso a actividades de 5.º sin evidencia estructurada;
- acceso a resultados académicos de 6.º;
- Misiones libres;
- protección contra escrituras durante consulta.

### Validación funcional

Se validaron explícitamente:

- Detectives;
- Rincón de Lectura;
- Creciendo por Dentro;
- Biblioteca;
- 5.º de Primaria sin evidencia;
- 6.º de Primaria con resultado académico;
- Misión libre.

---

## 4.7 31Ago–01Sep2026 · Análisis Educativo y calidad de datos

**PRs #35, #36 y #37**

### Análisis Educativo V1

Se incorporó un reporte familiar basado en evidencias reales con:

- período 1/2/3 meses o personalizado Desde/Hasta;
- Motor / Área;
- Tema / Foco;
- fortalezas observadas;
- aspectos a reforzar;
- evolución;
- intentos;
- pistas/ayudas cuando existen;
- mejoras personales;
- propuestas de actuación.

Fuentes V1:

- Detectives;
- Pruebas Académicas;
- Rincón de Lectura.

Principio central:

> Una observación aislada no se convierte en una etiqueta sobre el alumno.

### Limpieza de datos de prueba

Se añadieron herramientas para identificar y eliminar de forma controlada evidencias/sesiones creadas únicamente durante pruebas funcionales, evitando contaminar estadísticas educativas.

La eliminación exige vínculos exactos y bloquea casos ambiguos.

### Eliminación completa y controlada de Misiones

- eliminación de registros exclusivos de la Misión antes de eliminar evidencias/Misión;
- soporte para Detectives, sesiones académicas, Creciendo por Dentro y otros casos seguros;
- acción específica para eliminar Misiones completadas;
- inventario previo de lo que será eliminado/conservado;
- confirmación reforzada escribiendo `ELIMINAR`;
- marca y filtro `🧪 Prueba`.

---

## 4.8 31Ago2026 · Gestión de Misiones consolidada

**PRs #24, #25, #29, #31, #34, #38 y #39**

### Misiones libres y finalización manual

- contrato coherente para Misión libre sin actividad asociada;
- confirmación de finalización por el alumno;
- paso posterior a revisión familiar;
- conservación de navegación cuando existe actividad asociada.

### Listado y filtros

- simplificación de tipos operativos para nuevas Misiones;
- compatibilidad de edición con tipos heredados;
- filtros por Estado, Tipo y Tema/Área;
- paginación en bloques de 5;
- mejoras posteriores de filtros de pronunciación.

### Restricción de acceso

- Gestión de Misiones requiere nivel mínimo `gestion`;
- un alumno con `consulta` no ve la opción en el menú;
- acceso directo no autorizado redirige a Mi Camino;
- aviso visible `🔒 Usuario no autorizado`.

### Correcciones de navegación/interfaz

- `Volver` correcto al consultar una Misión completada;
- prevención de Panel de Usuario heredado duplicado en Rincón de Lectura.

---

## 4.9 30–31Ago2026 · Refuerzos basados en evidencias

**PRs #20, #21, #32, #33 y #34**

### Detectives

- propuestas de refuerzo derivadas de sesiones reales;
- necesidad confirmada cuando la misma dificultad aparece en al menos dos historias distintas del mismo nivel;
- repetición confirma la señal;
- intensidad/prioridad determinada por intentos adicionales medios;
- recencia como desempate;
- pistas separadas de intentos en esta versión;
- Misión preparada inicialmente oculta, bajo control familiar.

### Pruebas Académicas

- reutilización de sesiones académicas existentes;
- análisis por bloque académico;
- al menos dos errores para confirmar una señal;
- la sesión más reciente debe mantener la dificultad;
- prioridad por proporción de error y luego recencia;
- no se inventan intentos adicionales donde el motor no los registra;
- Misiones de refuerzo reutilizan el contrato académico existente.

### Rincón de Lectura

- refinamiento de filtros de palabras por estado e intentos;
- preparación de Misiones de pronunciación desde señales reales.

---

## 4.10 29–30Ago2026 · Repaso Académico y expansión curricular asistida

**PRs #16, #17, #21, #22 y #23**

### Misiones de Repaso Académico

- integración de pruebas de Puente y Fracciones con Misiones;
- `sesion-academica-v1` como fuente histórica;
- evidencia de Misión `sesion_academica` por referencia mediante `sesionId`;
- paso automático a revisión familiar tras una prueba válida;
- visor histórico de solo lectura;
- Persona Activa y navegación histórica de `Volver`;
- compatibilidad con Misiones creadas antes de existir persistencia.

### Incorporación curricular de mínima intervención

Se formalizó como entrada suficiente:

```text
material escolar
+ curso
+ materia
+ tema
+ “Incorporar a la Academia”
```

El proceso interno cubre análisis, diseño, implementación, integración, validación y auditoría antes de devolver `YA PUEDES PROBAR`.

### Preparación asistida de Repaso Académico

- Curso carga materias navegables reales;
- Materia carga Temas/actividades reales;
- Tema completa automáticamente la ruta;
- se conserva salida manual para contenido heredado/no catalogado;
- no se mantiene un catálogo curricular duplicado.

---

## 4.11 30–31Ago2026 · Creciendo por Dentro

**PRs #18, #19 y #27**

### Nuevas Semillas

- 🌟 Algo que conseguí esta semana;
- 🔎 Lo que descubrí de mí;
- actualización de ilustraciones asociadas.

### Protección frente a pérdida de grabaciones

Se corrigió un caso real en el que un audio grande podía impedir guardar toda la práctica:

- compresión/configuración de grabación más segura;
- si el audio excede el límite, respuestas y sesión se guardan sin perder el trabajo;
- reintento sin audio cuando procede;
- evidencia indica si la grabación fue incorporada;
- mensajes comprensibles para el alumno;
- conservación local opcional del audio excepcional.

---

# 🏷️ 5. Releases formales publicadas

## Academia Gloria · `2.0`

| Campo | Valor |
|---|---|
| **Tipo** | GitHub Release formal |
| **Estado** | Activa históricamente como release publicada |
| **Fecha de publicación** | 20/07/2026 |
| **Nombre publicado** | Academia Gloria Versión 2.0 |

### Resumen publicado

- nueva arquitectura;
- nueva documentación;
- nuevo framework;
- nuevo Design System.

A 04/09/2026, esta es la única GitHub Release formal encontrada en el repositorio.

---

# 🗃️ 6. Versión histórica interna preservada

## Academia Gloria Valentina · `v2.3-RC6`

| Campo | Valor |
|---|---|
| **Nombre** | Nuevas lecturas y nuevos casos de Detectives |
| **Estado de la release** | Release Candidate histórica interna |
| **Fecha** | 01/08/2026 |

### Resumen

Esta entrega amplía **Mi Rincón de Lectura** y **Detectives**, incorporando nuevas historias y mejoras en el soporte visual de un caso existente.

### Mi Rincón de Lectura

Se incorporan seis lecturas nuevas en español:

- 3 de nivel 1;
- 2 de nivel 2;
- 1 de nivel 3.

Las historias trabajan:

- organización;
- escucha;
- confianza;
- autonomía;
- regulación emocional;
- empatía;
- distintos puntos de vista.

### Detectives

- Se corrige el soporte visual de `DP-0203 · Excursión al bosque`.
- La primera parte muestra niños distribuidos en grupos.
- La segunda parte muestra grupos y botellas.
- Se incorporan:
  - 6 historias nuevas de nivel 1;
  - 3 historias nuevas de nivel 2.

### Decisiones de producto incorporadas

No se registraron decisiones transversales de producto dentro de la fuente original de esta release.

Cuando una entrega materialice decisiones relevantes, esta sección deberá identificarlas y enlazarlas con `DECISION_LOG.md` si tienen impacto transversal.

> Este bloque se conserva como registro histórico. No se afirma que `v2.3-RC6` corresponda a una GitHub Release formal publicada.

---

## 🧩 7. Estructura para futuras releases

Cada nueva release deberá utilizar, como mínimo, la siguiente estructura:

```markdown
## Academia Gloria Valentina · vX.Y.Z

| Campo | Valor |
|---|---|
| Nombre | ... |
| Estado de la release | ... |
| Fecha | ... |

### Resumen

### Cambios por módulo

### Correcciones

### Decisiones de producto incorporadas
```

Las secciones sin contenido pueden omitirse cuando no aporten valor.

Cuando todavía **no exista versión de producto asignada**, utilizar:

```markdown
## Entrega validada · AAAA-MM-DD

Estado: Validada y fusionada · sin nueva versión asignada

### Capacidades entregadas
...
```

---

## 🔄 8. Reglas de mantenimiento

1. La release o entrega validada más reciente se mantiene en la parte superior del historial operativo.
2. El contenido de una release publicada no debe reescribirse para reflejar decisiones posteriores.
3. Las correcciones editoriales pueden aplicarse sin alterar el significado histórico.
4. Toda release formal debe indicar versión, nombre, estado y fecha.
5. Las decisiones de producto solo se registran cuando realmente fueron materializadas por esa entrega.
6. El roadmap describe el futuro; este documento registra entregas reales o candidatas.
7. La publicación de una nueva versión debe actualizar el estado de la versión anterior cuando corresponda.
8. Un PR fusionado no genera automáticamente una nueva versión de producto.
9. No se inventará una versión para llenar un vacío documental.
10. Las entregas validadas pueden agruparse por bloque funcional cuando enumerar cada commit o PR reduzca legibilidad.
11. Los PRs sirven como trazabilidad técnica; las especificaciones/estándares siguen siendo propietarios del comportamiento funcional.
12. Cuando se publique una nueva release formal, las entregas sin versión que pertenezcan a ella podrán referenciarse desde esa release sin borrar su historial previo.

---

## 📌 9. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| REL-001 | Mantener `RELEASE_NOTES.md` en `docs/project/`. | Aprobada |
| REL-002 | No tratar este documento como un estándar `STD-*`. | Aprobada |
| REL-003 | Diferenciar la versión del producto de la versión documental. | Aprobada |
| REL-004 | Utilizar un esquema inspirado en versionado semántico con soporte para candidatos `RC`. | Aprobada |
| REL-005 | Registrar decisiones de producto únicamente en la release que realmente las materializa. | Aprobada |
| REL-006 | No asignar una nueva versión de producto automáticamente por fusionar PRs a `main`. | Aprobada |
| REL-007 | Registrar entregas validadas sin versión cuando el producto haya evolucionado pero el Product Owner todavía no haya definido una release formal. | Aprobada |
| REL-008 | Diferenciar GitHub Releases formales de versiones históricas internas. | Aprobada |
| REL-009 | La versión formal del producto requiere decisión explícita del Product Owner. | Aprobada |

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado documental** | Activo |
| **Última sincronización** | 04/09/2026 |
| **Release formal comprobada** | `2.0` · publicada 20/07/2026 |
| **Versión histórica interna preservada** | `v2.3-RC6` · 01/08/2026 |
| **Entregas posteriores** | Validadas y fusionadas; todavía sin nueva versión de producto asignada |
| **Regla principal** | No inventar versionado; primero registrar lo realmente entregado y asignar una release solo por decisión explícita del Product Owner. |