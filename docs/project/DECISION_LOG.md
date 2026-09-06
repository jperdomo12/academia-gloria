# 📘 Decision Log
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/DECISION_LOG.md` |
| **Versión** | 1.2 |
| **Estado** | Activo |
| **Última actualización** | 06/09/2026 |
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
| `docs/specifications/SPEC-BITACORA_ACOMPANAMIENTO.md` | **Propietario de dominio:** comportamiento funcional de Bitácora de Acompañamiento V1. |

---

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.2 | 06/09/2026 | Product Owner + AI Collaborator | Registra dos decisiones transversales surgidas después de la sincronización P1: Fase de uso prioritario (DECISION-023) y colaboración humana separada de evidencia/IA mediante una Bitácora con visibilidad explícita (DECISION-024). Actualiza asuntos abiertos para retirar pendientes ya cerrados y reflejar el foco real posterior a PR #83/#85. |
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

| Decisión | Nombre | Vigencia al 06/09/2026 | Nota |
|---|---|---|---|
| DECISION-001 | Creación de la Arquitectura 2.0 | **Evolucionada** | La separación por dominios sigue vigente, pero la estructura actual es más amplia y está gobernada por `PROJECT_MAP.md` y la arquitectura documental/producto actuales. |
| DECISION-002 | Mantener la URL principal | **Vigente** | `index.html` continúa siendo la entrada principal de la Academia. |
| DECISION-003 | Separación por cursos | **Vigente / evolucionada** | La separación por curso continúa; 6.º evoluciona con jerarquía `Curso → Asignatura → Tema`. |
| DECISION-004 | Crear carpeta docs | **Vigente** | `docs/` continúa siendo el sistema documental oficial. |
| DECISION-005 | Separación de documentación | **Evolucionada** | `standards/` y `project/` permanecen, pero hoy existen dominios adicionales oficiales (`ai/`, `product/`, `models/`, `specifications/`, `manuales/`, `tech/`, `history/`, `vision/`). |
| DECISION-006 | Assets centralizados | **Vigente / evolucionada** | Se mantiene la reutilización y centralización, sin imponer que todo recurso deba responder a la estructura inicial exacta. |
| DECISION-007 | Componentes reutilizables | **Vigente** | Reutilizar antes de crear continúa como principio transversal. |
| DECISION-008 | Migración segura | **Vigente como principio** | Los cambios de estructura deben preservar la solución existente hasta validar la sustitución. |
| DECISION-009 | Página Certificada | **Evolucionada** | La idea de certificación se integra hoy en Quality Gates, validación funcional y pruebas de regresión proporcionales. |
| DECISION-010 | Portal de Curso | **Vigente / evolucionada** | 6.º ya dispone de portal y navegación escalable por asignaturas/Temas. |
| DECISION-011 | La Academia como Ecosistema | **Vigente** | Continúa siendo una definición estratégica del producto. |
| DECISION-012 | Prioridad absoluta: Gloria | **Vigente y permanente** | Debe interpretarse junto con Foundation/ADN y con el principio de no etiquetar ni convertir señales aisladas en rasgos personales. |
| DECISION-013 | Calendario Gloria a Cloud Firestore | **Vigente / evolucionada** | Firestore y la identidad/Persona Activa son hoy una base transversal, no solo del Calendario. |
| DECISION-014 | Git como control oficial de versiones | **Vigente** | GitHub `main` es la referencia canónica de código y documentación fusionados. |
| DECISION-015 | Catálogo de Assets desacoplado | **Pospuesta** | No existe necesidad observada que justifique reabrirla. |

---

# 4. Decisiones originales · DECISION-001…015

> Las siguientes entradas se conservan como memoria de la etapa en que fueron adoptadas. La tabla anterior indica cómo deben interpretarse hoy cuando su formulación original haya evolucionado.

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

Separar claramente contenido, recursos, documentación y reutilización.

### Impacto

Muy alto. Esta decisión condicionó la evolución posterior y fue ampliada por las arquitecturas y mapas actuales.

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

Mantener siempre `index.html` en la raíz.

### Justificación

Es el punto natural de entrada a la Academia y sigue las convenciones de GitHub Pages.

### Impacto

Medio.

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

Cada curso evoluciona independientemente, evita mezclar contenidos y facilita ampliaciones.

### Impacto

Muy alto.

---

# DECISION-004

## Nombre

Crear carpeta docs

### Estado

✅ Aprobada

### Decisión

Toda la documentación oficial del proyecto se organiza bajo `docs/`, con las excepciones operativas expresamente definidas por las fuentes vigentes.

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

> **Evolución:** esta decisión fue ampliada posteriormente. La estructura vigente se define en `DOCUMENTATION_ARCHITECTURE.md` y `docs/README.md`.

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

Eliminar duplicidades y favorecer reutilización.

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

### Justificación

Reducir mantenimiento y aumentar consistencia.

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

Toda página migrada debía superar un proceso de certificación que incluía navegación, responsive, juegos, audio, vídeos, impresión, ADN y Guía ULTRA PRO.

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

Inicialmente el proyecto nació como una colección de páginas HTML y evolucionó hacia una metodología educativa completa.

### Decisión

Considerar oficialmente la Academia como un ecosistema de aprendizaje, no como una simple página web.

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

Todas las decisiones futuras deberán responder primero:

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

El Calendario almacenaba información en `localStorage`, impidiendo sincronización entre dispositivos.

### Decisión

Migrar a Cloud Firestore mediante `AcademiaAPI` y Firebase Authentication.

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

Sincronización, identidad, eliminación de dependencia local y base para módulos futuros.

### Impacto

Estratégico. Abrió la evolución Cloud que posteriormente incorporó identidad multi-persona y Persona Activa.

---

# DECISION-014

## Nombre

Adopción de Git como sistema oficial de control de versiones

**Fecha**

Julio 2026

### Estado

✅ Aprobada

### Decisión

Se adopta Git como sistema oficial de control de versiones de la Academia. Los hitos importantes se consolidan en GitHub siguiendo el workflow vigente.

### Justificación

Historial fiable, recuperación, trazabilidad y preparación para crecimiento.

### Impacto

Estratégico.

---

# DECISION-015

## Nombre

Catálogo de Assets desacoplado

### Estado

⏸️ Pospuesta

### Contexto

Se evaluó un catálogo `config/assets.json` + Asset Resolver.

### Conclusión

El beneficio no compensaba la complejidad añadida. Se mantienen nombres descriptivos y referencias directas cuando son suficientes.

### Revisión futura

Reevaluar solo si la cantidad de recursos compartidos o necesidad de asignación dinámica lo justifica.

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

La Academia dejó de operar exclusivamente bajo `usuario autenticado = alumno cuyos datos se están gestionando`.

### Decisión

La **Persona Activa** es el contexto funcional que determina de quién son los datos y sobre quién se ejecuta una capacidad cuando el flujo lo requiere.

Debe:

- persistir durante la navegación;
- diferenciarse del UID autenticado;
- ser respetada por Misiones, evidencias, sesiones, reconocimientos y capacidades relacionadas;
- combinarse con niveles `consulta`, `gestion`, `administracion`;
- no depender solo de ocultar botones.

### Justificación

Evitar atribución incorrecta y permitir acompañamiento familiar/profesional sin duplicar pantallas.

### Impacto

Estratégico y transversal.

---

# DECISION-017

## Nombre

Separar Misión, ejecución, evidencia e histórico sin crear subsistemas paralelos

**Fecha**

29/08–02/09/2026

**Estado**

✅ Aprobada

### Decisión

```text
Misión
→ intención / asignación

Sesión o resultado del motor
→ ejecución real

Evidencia
→ vínculo auditable

Vista histórica / Ver trabajo
→ consulta de solo lectura
```

Reglas:

- reutilizar resultados existentes;
- relacionar con identificadores explícitos;
- Vista previa no escribe;
- histórico solo lectura;
- `Ver trabajo` reutiliza visores;
- cierre automático solo con señal verificable; si no, finalización manual y revisión familiar.

### Justificación

Trazabilidad, reutilización y prevención de resultados duplicados/falsos cierres.

### Impacto

Muy alto.

---

# DECISION-018

## Nombre

Evidencia → observación prudente → propuesta → revisión humana

**Fecha**

30/08–03/09/2026

**Estado**

✅ Aprobada

### Decisión

```text
Evidencia real
↓
Datos observables
↓
Observación / tendencia prudente
↓
Propuesta
↓
Revisión humana
↓
Misión / acción cuando aporta valor
↓
Nueva evidencia
```

Reglas:

- completar no equivale a dominar;
- señal aislada no se convierte en característica personal;
- Análisis Educativo no etiqueta;
- no inventar métricas;
- automatización solo con señales suficientemente fiables;
- familia conserva control sobre acciones visibles.

### Justificación

Convertir datos en acompañamiento sin sobreinterpretación.

### Impacto

Estratégico.

---

# DECISION-019

## Nombre

Expansión curricular por Curso → Asignatura → Tema con intervención mínima

**Fecha**

30/08–03/09/2026

**Estado**

✅ Aprobada

### Decisión

La estructura curricular normal es:

```text
Curso → Asignatura → Tema
```

Entrada familiar normal:

```text
material oficial + curso + materia + Tema + notas opcionales
```

La Academia/AI Collaborator resuelve análisis, ubicación, diseño, integración, evidencia, validación y cierre.

Todo nuevo Tema de 6.º debe producir evidencia estructurada cuando corresponda.

### Justificación

Reducir trabajo manual, mantener coherencia escolar y construir base escalable.

### Impacto

Estratégico.

---

# DECISION-020

## Nombre

Motivación y Reconocimientos no transaccionales, basados en progreso real

**Fecha**

01–03/09/2026

**Estado**

✅ Aprobada

### Decisión

Priorizar esfuerzo, autonomía, constancia, crecimiento, cooperación, uso constructivo de ayuda y progreso personal.

No adoptar como núcleo rankings, monedas, puntos acumulativos, premios por clic/login, checklists de colección, pérdida por rachas ni elogio centrado en perfección.

Reconocimientos automáticos de Lía solo con fuente real suficiente; datos `🧪` excluidos; Guacamayas como hitos especiales con control humano según diseño vigente.

### Justificación

Apoyar motivación intrínseca sin dependencia de premios/comparación.

### Impacto

Estratégico.

---

# DECISION-021

## Nombre

Los datos de prueba validan funcionalidad, pero no cuentan como historia real del alumno

**Fecha**

31/08–02/09/2026

**Estado**

✅ Aprobada

### Decisión

Una Misión/dato `🧪` puede usar el flujo real para probar, pero no cuenta como logro/evidencia educativa real en métricas, constancia o Recompensas.

La eliminación exige vínculo exacto y seguro; ante ambigüedad se bloquea el borrado automático.

### Justificación

Permitir pruebas realistas sin alterar la historia educativa.

### Impacto

Muy alto.

---

# DECISION-022

## Nombre

Continuidad entre chats mediante HandOff vivo + verificación contra fuentes oficiales

**Fecha**

03/09/2026

**Estado**

✅ Aprobada

### Decisión

Continuar mediante HandOff + instrucción breve, verificando siempre `main` y fuentes propietarias antes de modificar o declarar estados.

El HandOff conserva el punto operativo reciente, no sustituye SSOT.

### Justificación

Retomar rápido sin convertir conversación/resumen en segunda fuente de verdad.

### Impacto

Alto.

---

# DECISION-023

## Nombre

Fase de uso prioritario antes de ampliar funcionalidad general

**Fecha**

05/09/2026

**Estado**

✅ Aprobada

### Contexto

La Academia alcanzó una base funcional amplia justo al comenzar el curso 2026–2027. Continuar abriendo funcionalidades generales sin observar uso real podía aumentar complejidad antes de saber qué ayudaba de verdad a Gloria.

### Decisión

Durante varias semanas priorizar:

```text
usar lo existente
+ incorporar material real de 6.º
+ observar utilidad y motivación
+ resolver issues reales rápidamente
```

El crecimiento funcional general queda en espera por **foco de uso**, no congelado ni prohibido.

Una necesidad real del colegio, Gloria, familia o profesionales puede justificar una excepción acotada. La excepción se construye, valida y cierra sin reabrir automáticamente todo el backlog.

### Justificación

Aprender del uso real, proteger simplicidad y dirigir esfuerzo hacia lo que aporta valor inmediato.

### Impacto

Estratégico en Roadmap, workflow operativo y priorización.

---

# DECISION-024

## Nombre

Colaboración humana separada de evidencia/IA y con visibilidad explícita

**Fecha**

06/09/2026

**Estado**

✅ Aprobada

### Contexto

El inicio del curso requiere colaboración de familia y profesionales autorizados. Era necesario compartir observaciones y recomendaciones sin convertir notas humanas en métricas, chat, diagnóstico o automatización educativa.

### Decisión

Materializar inicialmente el Dominio de Colaboración mediante **Bitácora de Acompañamiento V1** sobre Persona Activa.

Reglas transversales:

- autoría humana trazable;
- destino y visibilidad son conceptos separados;
- una entrada dirigida al alumno no se vuelve visible automáticamente para él;
- una respuesta hereda la visibilidad de su entrada;
- V1 admite 0 o 1 respuesta, no chat/hilos;
- alumno solo lee lo expresamente compartido y no publica/responde en V1;
- aportaciones humanas no se convierten automáticamente en Misiones, evidencias, Análisis Educativo, Recompensas o inferencias de IA;
- permisos reales se validan en módulo/API/Firestore, no solo en menú.

La primera implementación fue validada y fusionada mediante PR #83 y la navegación de un solo nivel se corrigió con PR #85.

### Justificación

Permitir colaboración útil desde el inicio del curso preservando privacidad, trazabilidad y fronteras entre opinión humana, evidencia y automatización.

### Impacto

Estratégico en Colaboración, Persona Activa, privacidad, profesionales y futuras integraciones con IA/evidencia.

---

# 6. Asuntos abiertos que todavía NO son decisiones

Un elemento pendiente del Roadmap no debe presentarse como decisión aprobada antes de resolverlo.

Al 06/09/2026 permanecen, entre otros:

- uso real de la Academia durante la Fase de uso prioritario y revisión futura del foco;
- expansión curricular progresiva de 6.º según material real del colegio;
- velocidad de voz por Persona, todavía en espera;
- apoyo específico para comprensión de preguntas, todavía en análisis futuro;
- actividades sugeridas a partir de necesidades externas, evitando un sistema paralelo;
- mejora del proceso de incorporación de nuevas Semillas antes de ampliar catálogo;
- evaluación de ChatGPT Work con un caso real de material escolar;
- futuras ampliaciones de Bitácora/colaboración profesional solo si V1 demuestra una necesidad concreta no cubierta;
- futuras fases de Motivación todavía no implementadas, únicamente cuando exista evidencia de valor;
- pruebas/regresión técnica adicional del núcleo cuando el riesgo o crecimiento lo requieran;
- nuevas capas de arquitectura/infraestructura solo ante necesidad real observada.

No se mantienen como pendientes genéricos “Arquitectura 3.0”, “Gamificación”, “Sistema de logros” o “Academia 6.º” porque esas formulaciones ya fueron sustituidas o concretadas por decisiones y producto posteriores.

---

# 7. Regla ante divergencias entre decisión, documentación y código

Cuando exista una divergencia:

1. identificar **quién es el propietario** del conocimiento;
2. contrastar la decisión con producto real, código, datos y documentos vigentes suficientes;
3. determinar si se trata de documentación desactualizada, implementación incompleta/defectuosa, decisión evolucionada o cambio no consolidado;
4. corregir la fuente realmente desfasada;
5. registrar una nueva decisión/evolución cuando cambie un principio transversal.

> Una decisión aprobada no se ignora porque el código sea distinto; pero tampoco se modifica código vigente automáticamente si la decisión ya fue superada y el registro no se actualizó.

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
| **Versión activa** | 1.2 |
| **Fecha de sincronización** | 06/09/2026 |
| **Aprobado por** | Product Owner |
| **Sustituye** | `DECISION_LOG.md` v1.1 |
| **Sustituido por** | — |

**Impacto:** Gobierno del Producto · Trazabilidad · Arquitectura · Continuidad · SSOT · Foco de Uso · Colaboración