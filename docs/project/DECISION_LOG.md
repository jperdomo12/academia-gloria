# 📘 Decision Log
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/DECISION_LOG.md` |
| **Versión** | 1.1 |
| **Estado** | Activo |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Gobierno del Producto |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Decisiones transversales de arquitectura, producto, experiencia y gobierno que explican por qué la Academia evoluciona de una determinada manera |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** propiedad, autoridad, dominios y ciclo de vida de la documentación. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** estructura, estados, versionado e historial de documentos oficiales. |
| `docs/FOUNDATION.md` | **Fundamenta:** propósito humano y principios estables de la Academia. |
| `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` | **Fundamenta:** identidad, misión y principios del producto. |
| `docs/project/ROADMAP.md` | **Complementa:** prioridades y evolución prevista; no convierte una intención futura en decisión aprobada. |
| `docs/project/RELEASE_NOTES.md` | **Evidencia:** entregas consolidadas del producto. |
| `docs/project/PROJECT_ROLES.md` | **Gobierna:** autoridad y responsabilidades vigentes. |
| `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` | **Complementa:** continuidad operativa reciente; no sustituye este registro de decisiones estables. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Implementa/consume:** decisiones transversales que afectan la experiencia. |
| `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` | **Propietario de dominio:** diseño detallado de Motivación y Reconocimientos. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Propietario de dominio:** reglas normativas de Misiones. |
| `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` | **Propietario de dominio:** comportamiento funcional verificable de Misiones. |

---

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 04/09/2026 | Product Owner + AI Collaborator | Aprobación del Product Owner y activación de la sincronización P1 del Decision Log. |
| 1.1-rc1 | 03/09/2026 | Product Owner + AI Collaborator | Sincronización P1. Conserva DECISION-001…015 como memoria histórica, añade una lectura explícita de su vigencia actual, incorpora decisiones transversales consolidadas durante agosto/septiembre y sustituye la antigua lista de “próximas decisiones” por asuntos abiertos que todavía no son decisiones. Corrige además la regla antigua que obligaba a modificar siempre el código ante cualquier divergencia documental. |
| 1.0 | Julio 2026 | Juan Perdomo + IA | Primera versión activa del registro de decisiones; consolida DECISION-001…015 y las primeras decisiones de arquitectura, organización, Cloud y Git. |

---

# 1. Objetivo

Este documento registra las **decisiones transversales importantes** de arquitectura, diseño, organización, experiencia y evolución tomadas durante el desarrollo de la Academia.

Su propósito no es describir cómo funciona todo el proyecto ni repetir los estándares, especificaciones o modelos de cada dominio.

Su propósito es explicar **por qué se tomaron determinadas decisiones** y permitir reconstruir su evolución aunque cambien el código, las herramientas o los chats.

Con el paso del tiempo, este documento debe permitir responder:

> ¿Qué decisiones condicionaron varias partes de la Academia, por qué se adoptaron y siguen gobernando hoy del mismo modo?

Una decisión específica de un único dominio debe permanecer en su documento propietario cuando no tenga impacto transversal suficiente para justificar una entrada aquí.

Un PR, un commit o una conversación **no se convierten automáticamente en una decisión**. Son evidencia de implementación o contexto; la decisión estable se consolida aquí solo cuando realmente gobierna más de una evolución puntual.

---

# 2. Formato y vigencia

Cada nueva decisión debe indicar, cuando aplique:

- Identificador
- Nombre
- Fecha
- Estado
- Contexto
- Decisión
- Justificación
- Impacto
- Fuentes o implementación relacionada

## 2.1 Estado de decisión

- ✅ **Aprobada:** decisión adoptada.
- ⏸️ **Pospuesta:** evaluada, pero no adoptada por ahora.
- ❌ **Descartada:** evaluada y no elegida.

## 2.2 Vigencia actual

El estado histórico de una decisión y su vigencia actual no son lo mismo.

Una decisión que fue correctamente **Aprobada** puede después quedar:

- **Vigente:** sigue gobernando sin cambio material.
- **Evolucionada:** el principio continúa, pero fue ampliado o refinado por decisiones/documentos posteriores.
- **Histórica:** explica una etapa anterior, pero ya no gobierna por sí sola la arquitectura actual.
- **Pospuesta:** continúa explícitamente no adoptada.

No se reescribe el pasado para que parezca igual al presente. Se conserva la decisión original y se explica su evolución.

---

# 3. Lectura de vigencia de DECISION-001…015

| Decisión | Nombre | Vigencia al 03/09/2026 | Nota |
|---|---|---|---|
| DECISION-001 | Creación de la Arquitectura 2.0 | **Evolucionada** | La separación por dominios sigue vigente, pero la estructura actual es más amplia y está gobernada por `PROJECT_MAP.md` y la arquitectura documental/producto actuales. |
| DECISION-002 | Mantener la URL principal | **Vigente** | `index.html` continúa siendo la entrada principal de la Academia. |
| DECISION-003 | Separación por cursos | **Vigente / evolucionada** | La separación por curso continúa; 6.º evoluciona con jerarquía `Curso → Asignatura → Tema`. |
| DECISION-004 | Crear carpeta docs | **Vigente** | `docs/` continúa siendo el sistema documental oficial. |
| DECISION-005 | Separación de documentación | **Evolucionada** | `standards/` y `project/` permanecen, pero hoy existen dominios adicionales oficiales (`ai/`, `product/`, `models/`, `specifications/`, `manuales/`, `tech/`, `history/`, `vision/`). |
| DECISION-006 | Assets centralizados | **Vigente / evolucionada** | Se mantiene la reutilización y centralización, sin imponer que todo recurso deba responder a la estructura inicial exacta. |
| DECISION-007 | Componentes reutilizables | **Vigente** | Reutilizar antes de crear continúa como principio transversal. |
| DECISION-008 | Migración segura | **Vigente como principio** | Los cambios de estructura deben preservar la solución existente hasta validar la sustitución. |
| DECISION-009 | Página Certificada | **Evolucionada** | La idea de certificación se integra hoy en Quality Gates, validación funcional y futuras pruebas de regresión del núcleo. |
| DECISION-010 | Portal de Curso | **Vigente / evolucionada** | 6.º ya dispone de portal y navegación escalable por asignaturas/Temas. |
| DECISION-011 | La Academia como Ecosistema | **Vigente** | Continúa siendo una definición estratégica del producto. |
| DECISION-012 | Prioridad absoluta: Gloria | **Vigente y permanente** | Debe interpretarse junto con Foundation/ADN y con el principio de no etiquetar ni convertir señales aisladas en rasgos personales. |
| DECISION-013 | Calendario Gloria a Cloud Firestore | **Vigente / evolucionada** | Firestore y la identidad/Persona Activa son hoy una base transversal, no solo del Calendario. |
| DECISION-014 | Git como control oficial de versiones | **Vigente** | GitHub `main` es la referencia canónica de código y documentación fusionados. |
| DECISION-015 | Catálogo de Assets desacoplado | **Pospuesta** | No existe necesidad observada que justifique reabrirla. |

---

# 4. Decisiones originales · DECISION-001…015

> Las siguientes entradas se conservan como memoria de la etapa en que fueron adoptadas. La columna de vigencia anterior indica cómo deben interpretarse hoy cuando su formulación original haya evolucionado.

# DECISION-001

## Nombre

Creación de la Arquitectura 2.0

**Fecha**

Julio 2026

**Estado**

✅ Aprobada

### Contexto

Durante el desarrollo de 5º de Primaria el proyecto creció rápidamente.

La estructura original comenzó a dificultar el mantenimiento y la incorporación de nuevos cursos.

### Decisión

Crear una nueva arquitectura basada en dominios funcionales.

```text
Academia
↓
Cursos
↓
Etapas
↓
Habilidades
↓
Adicionales
↓
Compartido
↓
Assets
↓
Docs
```

### Justificación

Separar claramente:

- contenido
- recursos
- documentación
- reutilización

### Impacto

Muy alto.

Esta decisión condicionó la evolución posterior del proyecto y fue ampliada por las arquitecturas y mapas actuales.

---

# DECISION-002

## Nombre

Mantener la URL principal

**Fecha**

Julio 2026

**Estado**

✅ Aprobada

### Contexto

Se evaluó mover el archivo `index.html` a otra carpeta.

### Decisión

Mantener siempre:

```text
index.html
```

en la raíz.

### Justificación

Es el punto natural de entrada a la Academia y sigue las convenciones de GitHub Pages.

### Impacto

Medio.

Simplifica la navegación.

---

# DECISION-003

## Nombre

Separación por cursos

### Estado

✅ Aprobada

### Decisión

Crear:

```text
cursos/
    5to/
    6to/
```

### Justificación

Cada curso evoluciona independientemente.

Evita mezclar contenidos.

Facilita futuras ampliaciones.

### Impacto

Muy alto.

---

# DECISION-004

## Nombre

Crear carpeta docs

### Estado

✅ Aprobada

### Decisión

Toda la documentación oficial del proyecto se organiza bajo:

```text
docs/
```

con las excepciones de documentación operativa de repositorio expresamente definidas por las fuentes vigentes.

### Justificación

Mantener una ubicación documental reconocible y evitar dispersión.

### Impacto

Medio.

---

# DECISION-005

## Nombre

Separación de documentación

### Estado

✅ Aprobada

### Decisión original

Dividir inicialmente la documentación en:

```text
docs/
    standards/
    project/
```

### Justificación

Separar metodología de gestión.

### Impacto

Medio.

> **Evolución:** esta decisión fue ampliada posteriormente. La estructura documental vigente se define en `DOCUMENTATION_ARCHITECTURE.md` y `docs/README.md`.

---

# DECISION-006

## Nombre

Assets centralizados

### Estado

✅ Aprobada

### Decisión

Favorecer recursos compartidos y reutilizables bajo `assets/`, evitando duplicidades innecesarias.

La estructura inicial considerada fue:

```text
assets/
    img/
    audio/
    video/
    icons/
    fonts/
```

### Justificación

Eliminar duplicidades.

Favorecer reutilización.

### Impacto

Muy alto.

---

# DECISION-007

## Nombre

Componentes reutilizables

### Estado

✅ Aprobada

### Decisión

Toda nueva página o capacidad debe revisar y reutilizar primero componentes, servicios, modelos y patrones comunes existentes.

Ejemplos iniciales:

- Hero
- Tarjeta
- Resumen
- Juego
- Test
- Canción
- Esquema

### Justificación

Reducir mantenimiento.

Aumentar consistencia.

### Impacto

Muy alto.

---

# DECISION-008

## Nombre

Migración segura

### Estado

✅ Aprobada

### Decisión

Ante una migración estructural relevante, preservar la solución vigente hasta validar la nueva.

Patrón original:

```text
Copiar
↓
Validar
↓
Certificar
↓
Eliminar
```

### Justificación

Evitar romper la Academia publicada.

### Impacto

Muy alto.

---

# DECISION-009

## Nombre

Página Certificada

### Estado

✅ Aprobada

### Decisión

Toda página migrada debía superar un proceso de certificación.

### Incluía

- Navegación
- Responsive
- Juegos
- Audio
- Vídeos
- Impresión
- ADN
- Guía ULTRA PRO

### Impacto

Muy alto.

> **Evolución:** el principio de validación continúa, pero hoy se materializa mediante Quality Gates, pruebas funcionales y auditorías proporcionales al cambio.

---

# DECISION-010

## Nombre

Portal de Curso

### Estado

✅ Aprobada

### Decisión

Cada curso dispondrá de un portal propio.

Ejemplo original:

```text
Academia
↓
5º
↓
Matemáticas
```

### Justificación

Mejorar la experiencia de navegación.

### Impacto

Muy alto.

---

# DECISION-011

## Nombre

La Academia como Ecosistema

### Estado

✅ Aprobada

### Contexto

Inicialmente el proyecto nació como una colección de páginas HTML.

Con el tiempo evolucionó hacia una metodología educativa completa.

### Decisión

Considerar oficialmente la Academia como un ecosistema de aprendizaje.

No como una simple página web.

### Justificación

Representa mejor la visión a largo plazo.

### Impacto

Estratégico.

---

# DECISION-012

## Nombre

Prioridad absoluta: Gloria

### Estado

✅ Permanente

### Decisión

Todas las decisiones futuras deberán responder primero a esta pregunta:

> ¿Esto ayuda realmente a Gloria?

Si la respuesta es NO, la decisión deberá revisarse.

### Justificación

La Academia existe para Gloria y debe crecer preservando su bienestar, aprendizaje, autonomía y experiencia humana.

### Impacto

Absoluto.

---

# DECISION-013

## Nombre

Migración del Calendario Gloria a Cloud Firestore

**Fecha**

Julio 2026

### Estado

✅ Aprobada

### Contexto

El Calendario Gloria almacenaba toda la información utilizando `localStorage`, lo que impedía la sincronización entre dispositivos y vinculaba los datos al navegador donde se habían creado.

### Decisión

Migrar el almacenamiento del calendario a Cloud Firestore mediante la API propia `AcademiaAPI`, utilizando Firebase Authentication para asociar los eventos al usuario autenticado.

Arquitectura inicial:

```text
Calendario Gloria
↓
AcademiaAPI
↓
Cloud Firestore
↓
usuarios/{uid}/eventos
```

### Justificación

- Sincronización entre dispositivos.
- Datos asociados a identidad.
- Eliminación de la dependencia de `localStorage` como almacenamiento principal.
- Base común para futuros módulos.

### Impacto

Estratégico.

Esta decisión abrió la evolución cloud que posteriormente incorporó identidad multi-persona y Persona Activa.

---

# DECISION-014

## Nombre

Adopción de Git como sistema oficial de control de versiones

**Fecha**

Julio 2026

### Estado

✅ Aprobada

### Contexto

Tras completar la infraestructura Cloud, el proyecto alcanzó un nivel de complejidad que requería un control formal de versiones.

### Decisión

Se adopta Git como sistema oficial de control de versiones de la Academia.

Los hitos importantes se registran mediante commits descriptivos y se consolidan en GitHub siguiendo el workflow vigente.

### Justificación

- Historial fiable.
- Recuperación sencilla.
- Trazabilidad.
- Preparación para el crecimiento del proyecto.

### Impacto

Estratégico.

---

# DECISION-015

## Nombre

Catálogo de Assets desacoplado

### Estado

⏸️ Pospuesta

### Contexto

Se evaluó la creación de un catálogo de assets mediante `config/assets.json` y un Asset Resolver para desacoplar los recursos físicos del código HTML.

### Conclusión

Tras analizar la arquitectura, se determinó que el beneficio obtenido no compensaba la complejidad añadida.

Se mantiene el uso de nombres descriptivos de archivos y referencias directas cuando son suficientes.

### Revisión futura

Reevaluar únicamente si la cantidad de recursos compartidos o la necesidad de asignación dinámica lo justifican.

---

# 5. Decisiones transversales consolidadas · agosto–septiembre 2026

# DECISION-016

## Nombre

Persona Activa como contexto funcional transversal

**Fecha**

Agosto–septiembre 2026

**Estado**

✅ Aprobada

### Contexto

La Academia dejó de operar exclusivamente bajo la equivalencia `usuario autenticado = alumno cuyos datos se están gestionando`. Un adulto o profesional autorizado puede acompañar o gestionar a otra Persona.

### Decisión

La **Persona Activa** es el contexto funcional que determina de quién son los datos y sobre quién se ejecuta una capacidad cuando el flujo lo requiere.

La Persona Activa debe:

- persistir durante la navegación;
- diferenciarse del UID autenticado cuando corresponda;
- ser respetada por Misiones, evidencias, sesiones, reconocimientos y capacidades relacionadas;
- combinarse con los niveles `consulta`, `gestion` y `administracion` para determinar qué acciones están disponibles;
- no depender únicamente de ocultar botones: las pantallas sensibles deben proteger también el acceso directo.

### Justificación

Evitar atribuir trabajo a la persona incorrecta y permitir acompañamiento familiar/profesional sin duplicar pantallas por alumno.

### Impacto

Estratégico y transversal.

### Implementación relacionada

Identidad multi-persona, Gestión de Usuarios, navegación compartida, Gestión de Misiones, Detectives, Recompensas y demás flujos que operan sobre otra Persona.

---

# DECISION-017

## Nombre

Separar Misión, ejecución, evidencia e histórico sin crear subsistemas paralelos

**Fecha**

29/08–02/09/2026

**Estado**

✅ Aprobada

### Contexto

Las Misiones pueden abrir motores muy distintos. Era necesario conservar qué se pidió, qué ocurrió realmente y qué puede consultarse después, sin duplicar resultados ni convertir la navegación en una nueva fuente de datos.

### Decisión

Mantener responsabilidades separadas:

```text
Misión
→ intención / asignación

Sesión o resultado del motor
→ ejecución real

Evidencia
→ vínculo auditable entre la Misión y el trabajo realizado

Vista histórica / Ver trabajo
→ consulta de solo lectura sobre fuentes ya existentes
```

Reglas asociadas:

- reutilizar las sesiones/resultados existentes del motor;
- relacionar mediante identificadores explícitos como `misionId` y `sesionId` cuando aplique;
- **Vista previa no escribe** sesiones, evidencia ni progreso;
- el histórico es **solo lectura**;
- `👁️ Ver trabajo` reutiliza visores especializados cuando existen y un visor general cuando no, sin crear un segundo sistema de evidencias;
- una Misión solo se completa automáticamente cuando existe una señal suficientemente verificable; en los demás casos se usa finalización manual con confirmación del alumno y revisión familiar.

### Justificación

Trazabilidad, reutilización, limpieza segura de datos y prevención de falsos cierres o resultados duplicados.

### Impacto

Muy alto en Misiones, motores académicos, Mi Camino, revisión familiar y análisis.

---

# DECISION-018

## Nombre

Evidencia → observación prudente → propuesta → revisión humana

**Fecha**

30/08–03/09/2026

**Estado**

✅ Aprobada

### Contexto

La Academia empezó a disponer de datos reales procedentes de Detectives, pruebas académicas y Rincón de Lectura. Era posible proponer fortalecimiento y análisis, pero una señal aislada no debía convertirse en una conclusión sobre Gloria.

### Decisión

Adoptar como patrón transversal:

```text
Evidencia real
↓
Datos observables
↓
Observación / tendencia prudente
↓
Propuesta de actuación o refuerzo
↓
Revisión humana
↓
Misión / acción cuando aporta valor
↓
Nueva evidencia
```

Reglas asociadas:

- completar una actividad **no equivale automáticamente a dominio**;
- una observación aislada no se convierte en característica personal;
- el Análisis Educativo describe evidencia y tendencias, **no etiqueta al alumno**;
- no se inventan métricas que el motor no registra;
- las propuestas automáticas deben apoyarse en repetición o señales suficientemente fiables según el motor;
- la familia conserva el control sobre cuándo una Misión sugerida se muestra en Mi Camino.

### Justificación

Convertir datos en acompañamiento útil sin sobreinterpretar el comportamiento ni automatizar decisiones educativas que requieren contexto humano.

### Impacto

Estratégico en Análisis Educativo, Observaciones y Refuerzos.

---

# DECISION-019

## Nombre

Expansión curricular por Curso → Asignatura → Tema con intervención mínima

**Fecha**

30/08–03/09/2026

**Estado**

✅ Aprobada

### Contexto

El curso 2026–2027 requiere incorporar contenido real de 6.º progresivamente. Mantener catálogos manuales paralelos o exigir a la familia rutas técnicas no escala.

### Decisión

La estructura curricular normal es:

```text
Curso
→ Asignatura
→ Tema
```

La entrada familiar suficiente para un nuevo Tema es, normalmente:

```text
material oficial del colegio
+ curso
+ materia
+ Tema
+ notas opcionales
```

La Academia/AI Collaborator resuelve después análisis, ubicación, diseño, integración técnica, evidencia, validación y cierre.

Reglas asociadas:

- reutilizar la navegación/catálogo real antes de crear un inventario curricular duplicado;
- un nuevo Tema no se convierte por defecto en un proyecto de arquitectura;
- **todo nuevo Tema de 6.º debe producir evidencia académica estructurada** reutilizable por Trabajo realizado, Análisis Educativo, evolución y fortalecimiento;
- la portada de 6.º y sus asignaturas deben poder crecer sin reconstruir la navegación con cada Tema.

### Justificación

Reducir trabajo manual, mantener coherencia con el colegio real y construir una base curricular escalable y observable.

### Impacto

Estratégico para 6.º y futuros cursos.

---

# DECISION-020

## Nombre

Motivación y Reconocimientos no transaccionales, basados en progreso real

**Fecha**

01–03/09/2026

**Estado**

✅ Aprobada

### Contexto

La Academia necesitaba reconocer avances sin convertir el aprendizaje en acumulación de puntos o comparación externa.

### Decisión

El sistema de Motivación y Reconocimiento debe priorizar señales de:

- esfuerzo;
- autonomía;
- constancia;
- crecimiento;
- cooperación;
- uso constructivo de ayuda;
- progreso personal.

No se adoptan como núcleo:

- rankings;
- monedas;
- puntos por acumular;
- premios por abrir/clicar/iniciar sesión;
- catálogos bloqueados que presionen por “completar la colección”;
- pérdida de recompensas por romper una racha;
- elogio centrado en perfección.

Los Reconocimientos automáticos de Lía solo se derivan cuando la fuente real permite sostener la afirmación con suficiente confianza. Los datos `🧪` quedan excluidos de logros, constancia y recompensas reales, y no se realiza backfill automático masivo de hitos previos.

Las Guacamayas representan hitos especiales y requieren control humano en su concesión/corrección según el diseño vigente; Mi Camino muestra las realmente obtenidas sin convertirlas en un checklist `x/6`.

### Justificación

Apoyar motivación intrínseca y crecimiento real sin dependencia de premios, comparación o afirmaciones no sustentadas por evidencia.

### Impacto

Estratégico en Mi Camino, Misiones y diseño motivacional.

---

# DECISION-021

## Nombre

Los datos de prueba validan funcionalidad, pero no cuentan como historia real del alumno

**Fecha**

31/08–02/09/2026

**Estado**

✅ Aprobada

### Contexto

Las pruebas funcionales necesitan recorrer el mismo flujo que una Misión real. Sin una separación explícita, esos datos podían contaminar estadísticas, constancia, propuestas o reconocimientos de Gloria.

### Decisión

Una Misión/dato `🧪` puede usar el flujo funcional real para probar la Academia, pero **no debe considerarse logro o evidencia educativa real de Gloria** en métricas, constancia y recompensas.

La eliminación de datos se realiza únicamente cuando el vínculo con la Misión o sesión es exacto y seguro:

- no borrar por fecha o heurística si existe riesgo de afectar actividad real;
- eliminar primero registros exclusivos de la Misión, después evidencias y finalmente la Misión;
- conservar resultados posteriores o reutilizados que no pertenezcan exclusivamente a la Misión eliminada;
- ante ambigüedad, bloquear el borrado automático y exigir revisión.

### Justificación

Permitir pruebas realistas sin alterar la historia educativa y preservar datos reales ante limpiezas administrativas.

### Impacto

Muy alto en calidad de datos, análisis, Recompensas y mantenimiento.

---

# DECISION-022

## Nombre

Continuidad entre chats mediante HandOff vivo + verificación contra fuentes oficiales

**Fecha**

03/09/2026

**Estado**

✅ Aprobada

### Contexto

La pérdida o colapso de un chat puede interrumpir trabajo complejo y obligar a reconstruir decisiones recientes.

### Decisión

El procedimiento normal para continuar en otro chat es:

```text
último HandOff disponible
+ instrucción breve para continuar
```

El HandOff debe mantener al final:

```text
Última actualización / On going — <fecha>
```

indicando qué se cerró, qué está en curso y cuál es el siguiente paso exacto.

El HandOff orienta el **punto operativo de continuidad**, pero no sustituye las fuentes propietarias ni el repositorio. Antes de modificar o declarar implementado algo relevante, el nuevo chat debe contrastar con `main` y con la documentación oficial necesaria.

### Justificación

Retomar más rápido sin convertir un resumen conversacional en una segunda fuente de verdad.

### Impacto

Alto en continuidad, resiliencia del trabajo y colaboración con IA.

---

# 6. Asuntos abiertos que todavía NO son decisiones

Esta sección reemplaza la antigua lista de “Próximas decisiones”. Un elemento pendiente del Roadmap **no debe presentarse como decisión aprobada antes de resolverlo**.

Al 03/09/2026 permanecen, entre otros, estos frentes de decisión/evolución cuando corresponda:

- cierre y certificación específica de Identidad, Usuarios y Auditoría;
- auditoría de entidades educativas, empezando por TAREA / MISIÓN;
- certificación/regresión del núcleo técnico;
- expansión curricular progresiva de 6.º según material real del curso;
- futuras fases del Sistema de Motivación todavía no implementadas (por ejemplo Récord Personal o retos cooperativos), únicamente cuando exista señal/producto suficiente para abrirlas;
- nuevas capas de arquitectura o infraestructura solo ante necesidad real observada, no por anticipación.

No se mantiene como pendiente genérico “Arquitectura 3.0”, “Gamificación”, “Sistema de logros” o “Academia 6.º” porque esas formulaciones ya fueron parcialmente sustituidas o concretadas por decisiones y producto posteriores.

---

# 7. Regla ante divergencias entre decisión, documentación y código

La regla histórica “si el código contradice una decisión, modificar siempre el código” queda sustituida por un criterio más seguro y coherente con la Arquitectura Documental vigente.

Cuando exista una divergencia:

1. identificar **quién es el propietario** del conocimiento;
2. contrastar la decisión con el producto real, el código, los datos y documentos vigentes suficientes;
3. determinar si estamos ante:
   - documentación desactualizada;
   - implementación incompleta o defectuosa;
   - decisión evolucionada;
   - cambio todavía no consolidado;
4. corregir la fuente que realmente esté desfasada;
5. registrar una nueva decisión o evolución cuando cambie un principio transversal.

> Una decisión aprobada no se ignora porque el código sea distinto; pero tampoco se modifica código vigente de forma automática si la decisión ya fue superada y el registro no se actualizó.

---

# 8. Nuestra filosofía

No construimos páginas.

Construimos experiencias.

No añadimos funciones por acumular funciones.

Creamos oportunidades para aprender, crecer y acompañar mejor.

Y cada decisión importante debe poder explicar de qué manera nos acerca a ese objetivo sin perder la esencia humana de la Academia.

🌈

---

## DECISIÓN DEL DOCUMENTO

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 1.1 |
| **Fecha de aprobación** | 04/09/2026 |
| **Aprobado por** | Product Owner |
| **Sustituye** | `DECISION_LOG.md` v1.0 |
| **Sustituido por** | — |

**Impacto:** Gobierno del Producto · Trazabilidad · Arquitectura · Continuidad · SSOT