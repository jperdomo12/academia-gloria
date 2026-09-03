# Arquitectura Documental
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/DOCUMENTATION_ARCHITECTURE.md` |
| **Versión** | 1.2-rc1 |
| **Estado** | Candidato para aprobación |
| **Fecha de aprobación** | — |
| **Última actualización** | 03/09/2026 |
| **Propietario** | Arquitectura Documental |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Organización y gobierno del conocimiento oficial del producto |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/README.md` | Portal de entrada, inventario operativo y rutas de lectura. |
| `docs/DOCUMENTATION_STANDARD.md` | Reglas para crear, revisar, versionar y mantener documentos. |
| `docs/FOUNDATION.md` | Fundamento humano y propósito estable de la Academia. |
| `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` | Fuente fundacional de identidad, misión y principios del producto. |
| `docs/ai/AI_COLLABORATION_GUIDE.md` | Modelo oficial de colaboración entre personas, documentación e IA. |
| `docs/ai/AI_CHAT_BOOTSTRAP.md` | Protocolo de incorporación rápida de una nueva IA al proyecto. |
| `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` | Continuidad operativa entre chats y registro del punto de trabajo vigente. |
| `docs/project/PROJECT_ROLES.md` | Roles, responsabilidades, autoridad y asignación vigente. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | Ciclo operativo oficial de los cambios del producto. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | Arquitectura conceptual de la experiencia del producto. |
| `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` | Identidad visual, emocional y Personajes Oficiales. |
| `docs/project/PROJECT_MAP.md` | Organización física del repositorio y fuentes propietarias. |
| `docs/project/DECISION_LOG.md` | Registro transversal de decisiones relevantes. |
| `docs/project/ROADMAP.md` | Evolución prevista del producto. |

> Las rutas concretas se mantienen en `docs/README.md`. Si un archivo cambia de nombre o ubicación, el README debe actualizarse sin alterar innecesariamente los principios de esta arquitectura.

---

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.2-rc1 | 03/09/2026 | Product Owner + AI Collaborator | Sincroniza la arquitectura con la estructura documental real: incorpora `manuales/`, `specifications/` y `tech/`; actualiza la responsabilidad de `models/`, formaliza el HandOff operativo en `project/`, corrige la ruta canónica de `PROJECT_MAP.md` y reconoce `FOUNDATION.md` y `CARTA_A_GLORIA.md` como fuentes raíz intencionales. |
| 1.1 | 04/08/2026 | Product Owner + AI Collaborator | Evolución menor de la versión 1.0. Incorpora oficialmente los dominios `ai/`, `product/` y `history/`; actualiza documentos relacionados, responsabilidades y gobierno; y alinea la arquitectura con la estructura documental vigente. |
| 1.0 | 03/08/2026 | Juan Perdomo + IA | Primera versión aprobada. Consolida principios, tipos, dominios, propiedad, relaciones, ciclo de vida, adopción incremental y tratamiento del conocimiento histórico. |
| 1.0-rc1 | 03/08/2026 | Juan Perdomo + IA | Primera propuesta consolidada construida a partir de la documentación y estructura real del producto. |

---

## 1. Propósito

Este documento define **cómo se organiza, relaciona, gobierna y evoluciona el conocimiento oficial de Academia Gloria Valentina**.

Su función no es enumerar todos los archivos existentes ni describir detalladamente cada carpeta. Para esa consulta operativa existe `docs/README.md`.

La Arquitectura Documental establece los principios estables que permiten:

- localizar la fuente oficial de cada conocimiento;
- distinguir visión, modelo, estándar, arquitectura, planificación e historia;
- evitar duplicidades y contradicciones;
- incorporar documentos nuevos sin crear estructuras paralelas;
- preservar decisiones y aprendizaje acumulado;
- mantener alineados producto, código y documentación;
- facilitar la continuidad por parte de Juan, futuros colaboradores y herramientas de IA.

> La documentación no es un archivo del pasado. Es la memoria organizada de un producto vivo.

---

## 2. Alcance

Esta arquitectura se aplica a toda la documentación oficial de la Academia, especialmente a la contenida en `docs/`.

Incluye:

- documentos fundacionales y de identidad;
- documentos de producto y planificación;
- arquitectura funcional y técnica;
- modelos conceptuales, funcionales y de datos;
- estándares y guías de construcción;
- especificaciones de funcionalidades;
- decisiones, versiones, migraciones e incidencias;
- documentos de continuidad y transferencia de conocimiento.

No regula:

- el contenido pedagógico destinado directamente al alumno;
- los comentarios internos del código;
- archivos temporales de experimentación;
- conversaciones de trabajo que todavía no hayan producido una decisión consolidada.

Cuando una conversación produzca una decisión relevante, esta deberá trasladarse al documento propietario correspondiente o al registro de decisiones.

---

## 3. Principios arquitectónicos

### 3.1. Fuente única de verdad

Cada conocimiento relevante debe tener **un único documento propietario**.

Otros documentos pueden enlazarlo, resumirlo para aportar contexto o explicar su impacto. No deben mantener una segunda definición completa que pueda evolucionar de forma independiente.

> Una verdad importante, un propietario documental.

### 3.2. Una responsabilidad principal por documento

Cada documento debe responder principalmente a una pregunta.

Ejemplos:

- el ADN responde quiénes somos y qué principios no debemos romper;
- una visión responde qué experiencia queremos alcanzar;
- un modelo responde cómo funciona un dominio;
- un estándar responde cómo debe construirse o mantenerse;
- una especificación responde qué debe hacer una solución concreta;
- el registro de decisiones responde por qué se eligió un camino.

### 3.3. Evolucionar antes que sustituir

Antes de crear un documento nuevo se debe comprobar si:

1. el conocimiento ya tiene propietario;
2. el documento existente puede evolucionar;
3. el nuevo documento responde a una pregunta realmente distinta;
4. su valor justifica el coste futuro de mantenerlo.

La sustitución solo se justifica cuando el documento ya no puede evolucionar con claridad o cuando su responsabilidad fue definida incorrectamente.

### 3.4. Documentar la solución consolidada

La documentación acompaña al producto, pero no debe impedir su evolución.

```text
Idea o necesidad
      ↓
Análisis breve
      ↓
Decisión
      ↓
Construcción
      ↓
Validación y uso real
      ↓
Ajustes
      ↓
Consolidación documental
```

Los principios fundacionales, las decisiones arquitectónicas y los contratos que condicionan el desarrollo pueden documentarse antes de construir. Los detalles de implementación deben consolidarse después de validar la solución.

### 3.5. Coherencia con el producto real

La documentación debe contrastarse con:

- el código actual;
- la estructura real del repositorio;
- el comportamiento desplegado;
- los datos y reglas vigentes;
- las evidencias de uso de Gloria y futuros alumnos.

Un documento de visión puede describir el futuro. Un documento que declare el estado actual no puede presentar como disponible una funcionalidad todavía no implementada.

### 3.6. Trazabilidad sin burocracia

Las decisiones y cambios importantes deben poder reconstruirse sin convertir cada ajuste menor en un proceso pesado.

La trazabilidad mínima se obtiene mediante:

- versión y estado;
- fecha de actualización;
- propietario y responsables;
- historial de versiones;
- documentos relacionados;
- decisiones adoptadas cuando corresponda.

### 3.7. Simplicidad sostenible

La mejor arquitectura documental es la más sencilla que permite comprender y mantener el producto.

No se crearán carpetas, categorías, prefijos ni documentos únicamente para anticipar necesidades hipotéticas.

### 3.8. Preservación del conocimiento

La documentación histórica no se elimina por parecer antigua. Primero debe determinarse si conserva una decisión, una lección, una migración o un contexto todavía valioso.

Cuando deje de gobernar el producto, deberá marcarse o archivarse de manera explícita.

---

## 4. Las tres dimensiones de un documento

Todo documento se comprende mediante tres dimensiones independientes.

### 4.1. Tipo documental

Indica **qué función cumple** dentro del conocimiento del producto.

### 4.2. Dominio documental

Indica **a qué área pertenece** y orienta su ubicación física.

### 4.3. Estado documental

Indica **su situación de madurez o vigencia**.

Ejemplo:

```text
Tipo: Modelo funcional
Dominio: Modelos
Estado: Activo
```

La carpeta no determina por sí sola la autoridad ni la vigencia de un documento.

---

## 5. Tipos documentales

### 5.1. Fundacional

Define identidad, misión, valores y principios no negociables.

**Pregunta:** ¿Quiénes somos, para quién existimos y qué no debemos perder al evolucionar?

### 5.2. Visión

Describe la experiencia, intención pedagógica, emocional o funcional que se desea alcanzar.

**Pregunta:** ¿Qué experiencia queremos construir y por qué?

Una visión no garantiza que todo lo descrito esté implementado.

### 5.3. Arquitectura

Define estructuras, límites, responsabilidades e interacciones estables.

**Pregunta:** ¿Cómo se organiza el sistema y cómo se relacionan sus partes?

### 5.4. Planificación y gobierno de producto

Define dirección, prioridades, fases, decisiones y continuidad.

Incluye planes maestros, mapas, roadmaps y registros de decisiones.

### 5.5. Modelo

Representa conceptos, estados, reglas y relaciones de un dominio con independencia de una interfaz concreta.

**Pregunta:** ¿Cómo funciona este dominio?

### 5.6. Estándar

Establece reglas obligatorias o criterios de conformidad para diseñar, desarrollar, documentar o mantener una solución.

**Pregunta:** ¿Cómo debe hacerse y qué condiciones debe cumplir?

Los estándares específicos se identifican mediante `STD-*` cuando corresponda.

### 5.7. Guía

Ofrece orientación práctica, recomendaciones y procedimientos reutilizables.

**Pregunta:** ¿Cómo conviene realizar esta actividad?

Una guía puede admitir alternativas justificadas; un estándar establece condiciones de cumplimiento.

### 5.8. Especificación

Describe con precisión el comportamiento esperado de una funcionalidad o componente concreto.

**Pregunta:** ¿Qué debe hacer esta solución y cómo sabremos que está completa?

Las especificaciones funcionales se identifican mediante `SPEC-*` y, cuando son fuentes activas del producto, residen en `docs/specifications/`.

### 5.9. Operativo y continuidad

Permite operar, mantener o retomar el producto. Incluye procedimientos, handoffs, instrucciones de despliegue, migración o incorporación de una nueva persona o IA.

### 5.10. Histórico

Conserva lo ocurrido y su contexto: decisiones, notas de versión, migraciones, incidencias relevantes, lecciones aprendidas y documentos sustituidos con valor de referencia.

---

## 6. Dominios y organización física

La estructura física vigente es:

```text
docs/
├── README.md
├── FOUNDATION.md
├── DOCUMENTATION_ARCHITECTURE.md
├── DOCUMENTATION_STANDARD.md
├── CARTA_A_GLORIA.md
├── ai/
├── history/
├── manuales/
├── models/
├── product/
├── project/
├── specifications/
├── standards/
├── tech/
└── vision/
```

La estructura se ampliará solo cuando exista una necesidad real y sostenida que no pueda resolverse con claridad dentro de los dominios actuales.

### 6.1. Raíz de `docs/`

La raíz se reserva para fuentes de entrada o alcance transversal y para unas pocas fuentes humanas/fundacionales cuya ubicación directa facilita su descubrimiento:

- `README.md`, portal de entrada;
- `DOCUMENTATION_ARCHITECTURE.md`, arquitectura documental;
- `DOCUMENTATION_STANDARD.md`, estándar documental;
- `FOUNDATION.md`, propósito humano y principios base;
- `CARTA_A_GLORIA.md`, referencia humana directa del producto.

No debe convertirse en una colección general de archivos. Los nuevos documentos deben ubicarse en un dominio salvo decisión arquitectónica explícita.

### 6.2. `ai/`

Contiene la documentación propietaria de la colaboración con IA:

- modelo de colaboración;
- incorporación de nuevos chats o modelos;
- reglas transversales de actuación;
- protocolos generales de bootstrap.

La continuidad operativa de un trabajo concreto mediante HandOff pertenece a `project/`, porque describe el estado vigente del proyecto y no una regla general de IA.

No contiene especificaciones funcionales del producto ni documentación propia de un proveedor concreto.

### 6.3. `history/`

Contiene documentos sustituidos o históricos que conservan valor de contexto, trazabilidad o aprendizaje.

No forma parte de la ruta normal de lectura y no constituye fuente oficial vigente.

Cada documento histórico debe indicar, cuando sea posible:

- su estado;
- motivo de archivo;
- fecha;
- y documento vigente que lo sustituye.

`history/` no es una papelera documental.

### 6.4. `manuales/`

Contiene guías y procedimientos operativos orientados al uso o administración de capacidades ya existentes.

Un manual explica **cómo operar** una capacidad; no sustituye su estándar, modelo, especificación ni documentación técnica propietaria.

### 6.5. `models/`

Contiene representaciones conceptuales de entidades, estados, relaciones y comportamiento de dominio.

Los modelos explican **cómo se representa o comprende un dominio** y deben evitar convertirse en una segunda fuente normativa cuando exista un estándar o especificación propietaria.

### 6.6. `product/`

Contiene arquitectura y conocimiento estructural propio del producto:

- experiencia;
- identidad;
- recursos;
- personajes;
- diseños de producto;
- relaciones estables entre componentes o capacidades.

No contiene planificación operativa ni gobierno del proyecto.

### 6.7. `project/`

Contiene gobierno, planificación, continuidad y operación transversal del proyecto.

Aquí pertenecen documentos que responden, entre otras, a estas preguntas:

- ¿qué es el producto y cuál es su estado global?;
- ¿hacia dónde evoluciona?;
- ¿qué decisiones se han tomado?;
- ¿qué roles existen?;
- ¿cómo se ejecuta el ciclo de desarrollo?;
- ¿cómo puede continuarlo otra persona o IA?;
- ¿cuál es el punto operativo vigente para retomar el trabajo?

Por ello, los HandOff de continuidad del proyecto pertenecen a este dominio.

Un documento fundacional puede residir aquí sin que su ubicación física cambie su tipo documental.

### 6.8. `specifications/`

Contiene especificaciones funcionales de capacidades o módulos concretos.

Una especificación define **qué debe hacer una solución y cómo verificar que está completa**. Las fuentes canónicas usan nombres estables `SPEC-*` y no deben duplicar normas transversales pertenecientes a `standards/`.

### 6.9. `standards/`

Contiene estándares, guías, glosario e instrucciones generales de construcción y colaboración.

Los estándares establecen reglas reutilizables, contratos y criterios de conformidad que pueden aplicar a múltiples capacidades.

### 6.10. `tech/`

Contiene referencias, auditorías, transiciones y decisiones técnicas específicas que no constituyen por sí mismas un estándar funcional o una especificación de producto.

Debe separar con claridad fotografía técnica, transición y contrato vigente para evitar que una auditoría histórica se interprete como norma permanente.

### 6.11. `vision/`

Contiene visión pedagógica, funcional, emocional, narrativa y de experiencia.

Describe intención y futuro deseado, no necesariamente el estado implementado.

---

## 7. Autoridad y propiedad documental

### 7.1. Documento propietario

Es la fuente oficial de un conocimiento. Debe contener la definición completa, recibir las actualizaciones principales y ser enlazado por los documentos consumidores.

### 7.2. Documentos consumidores

Utilizan conocimiento definido en otro documento. Deben enlazar la fuente, resumir solo lo necesario y evitar redefinir reglas ajenas.

### 7.3. Conflictos entre documentos

Cuando dos documentos discrepen:

1. se identifica el propietario del conocimiento;
2. se contrasta con el producto real;
3. se revisan fecha, estado y alcance;
4. se corrige el documento no propietario;
5. si la decisión cambió, se registra la evolución.

No debe resolverse el conflicto creando una tercera versión.

### 7.4. Código y documentación

El código es autoridad sobre el comportamiento actualmente implementado, pero no sustituye la intención, justificación, principios pedagógicos, contratos funcionales ni visión futura.

Una divergencia deberá clasificarse como:

- documentación desactualizada;
- implementación incompleta;
- defecto del producto;
- cambio todavía no consolidado.

---

## 8. Relaciones entre documentos

La arquitectura documental es una red de responsabilidades:

```text
ADN / Fundamentos
        ↓ orientan
Visiones de producto y experiencia
        ↓ se concretan en
Arquitecturas y modelos
        ↓ se gobiernan mediante
Estándares y especificaciones
        ↓ se materializan en
Producto y código
        ↓ generan
Evidencias, decisiones, versiones y aprendizaje
        ↺ retroalimentan la evolución
```

### 8.1. `docs/README.md`

Es el portal de navegación. Presenta la estructura real, indica dónde encontrar cada información y ofrece rutas de lectura.

### 8.2. `DOCUMENTATION_ARCHITECTURE.md`

Define principios, tipos, dominios, responsabilidades, relaciones, gobierno y evolución.

### 8.3. `DOCUMENTATION_STANDARD.md`

Define estructura mínima, metadatos, estados, versionado, nombres, historial, referencias, decisiones, revisión, aprobación y plantillas.

> La Arquitectura responde **dónde encaja y qué responsabilidad tiene** un documento. El Estándar responde **cómo debe escribirse y mantenerse**.

---

## 9. Estados documentales

Los estados y su uso formal se definen en `DOCUMENTATION_STANDARD.md`.

Arquitectónicamente se reconocen:

- **Borrador:** contenido inicial sujeto a cambios importantes.
- **Candidato para aprobación:** contenido completo para revisión y decisión.
- **Activo:** aprobado y vigente como referencia oficial.
- **En revisión:** documento activo que está siendo actualizado; la versión anterior conserva autoridad hasta la aprobación de la nueva, salvo indicación expresa.
- **Sustituido:** otro documento o versión asumió formalmente su responsabilidad.
- **Histórico:** no gobierna el producto actual, pero conserva valor de contexto o aprendizaje.
- **Obsoleto:** no representa el producto y no conserva suficiente valor operativo; antes de eliminarlo debe comprobarse que no contiene conocimiento único.

---

## 10. Ciclo de vida documental

### 10.1. Nacimiento

Un documento se crea después de validar su pregunta principal, tipo, dominio, propietario, relaciones y ausencia de duplicidad.

### 10.2. Elaboración

Se construye a partir de fuentes existentes, decisiones aprobadas, producto real, terminología oficial y alcance explícito.

### 10.3. Revisión

Comprueba exactitud, ausencia de duplicidades, coherencia, concordancia con el producto, claridad de responsabilidad y cumplimiento del estándar.

### 10.4. Aprobación

Se vuelve oficial cuando los arquitectos del producto aprueban explícitamente su alcance y contenido.

### 10.5. Mantenimiento

Se revisa cuando cambia el conocimiento que gobierna, una decisión relacionada, una funcionalidad consolidada, se detecta una contradicción o vuelve a estar activo dentro de una fase de trabajo.

### 10.6. Sustitución o archivo

Puede dejar de estar activo cuando otro documento asume su responsabilidad, finaliza una migración, su contenido se integra en otra fuente o describe una arquitectura abandonada.

La sustitución debe señalar el nuevo propietario y preservar la trazabilidad.

---

## 11. Estrategia de adopción

La implantación será **incremental**.

### 11.1. Documentos nuevos

Todo documento nuevo deberá cumplir la Arquitectura y el Estándar vigentes desde su primera versión oficial.

### 11.2. Documentos existentes que se revisen

Cuando se actualicen por razones funcionales, técnicas o de producto, se aprovechará para alinearlos progresivamente.

### 11.3. Documentos existentes no revisados

No se modificarán únicamente para homogeneizar formato, salvo que generen confusión, contengan información crítica desactualizada, dupliquen una fuente oficial o formen parte de una jornada planificada.

### 11.4. Jornada de actualización documental

Podrá planificarse cuando el beneficio supere el coste y no interrumpa una prioridad mayor.

No consistirá solo en aplicar una plantilla: cada documento deberá validarse en contenido, propiedad, vigencia y relación con el producto.

---

## 12. Incorporación de nueva documentación

Antes de crear un documento, se responderá:

1. ¿Qué problema de conocimiento resuelve?
2. ¿Cuál es la pregunta principal?
3. ¿Existe ya un propietario?
4. ¿Qué tipo documental es?
5. ¿A qué dominio pertenece?
6. ¿Quién lo mantendrá?
7. ¿Qué documentos lo alimentan o consumen?
8. ¿Seguirá aportando valor después de la fase actual?

Si alguna respuesta esencial no está clara, el documento no debe crearse todavía.

---

## 13. Gobierno y responsabilidades

### 13.1. Roles responsables

El **Product Owner** y el **AI Collaborator** actúan conjuntamente en el análisis y construcción de la arquitectura del producto.

El Product Owner mantiene la propiedad, visión, priorización y decisión final sobre la Academia.

El AI Collaborator debe analizar el contexto completo, preservar decisiones, detectar duplicidades y contradicciones, proponer soluciones sostenibles, distinguir hechos de propuestas y construir una vez aprobado el alcance.

Las responsabilidades detalladas y la asignación vigente se mantienen en `docs/project/PROJECT_ROLES.md`.

### 13.2. Metodología de decisión

> **Pensar bien, decidir pronto y construir con calidad.**

Como norma práctica:

1. se presenta la idea;
2. se analiza la globalidad;
3. se revisan los detalles necesarios;
4. en no más de tres o cuatro interacciones, salvo complejidad excepcional, se acuerda el producto;
5. se construye;
6. se valida y consolida.

Cuando el análisis deje de aportar información nueva, cualquiera de los roles participantes debe promover una decisión explícita.

### 13.3. Evidencias de uso

Las observaciones del uso real del Primary Learner y futuros alumnos son una fuente relevante de evolución.

Permiten validar si la experiencia se comprende, motiva, promueve autonomía, invita a regresar y cumple su propósito.

Las decisiones derivadas de esas evidencias deben consolidarse en el documento propietario correspondiente.

---

## 14. Criterios de calidad arquitectónica

La arquitectura funciona correctamente cuando:

- puede localizarse la fuente oficial sin conocer toda la historia;
- una nueva IA distingue visión, modelo, estándar e implementación;
- una decisión importante no depende exclusivamente de un chat;
- un cambio se actualiza en un solo propietario;
- los documentos se relacionan sin duplicarse;
- la estructura crece sin reorganizaciones frecuentes;
- la documentación ayuda a construir y no se convierte en burocracia;
- el conocimiento se preserva aunque cambien personas, herramientas o chats.

---

## 15. Límites y evolución

Esta arquitectura debe revisarse cuando aparezca una clase documental recurrente, la estructura deje de ser clara, cambie el gobierno del producto, se incorporen nuevas responsabilidades o exista evidencia sostenida de que una regla genera más coste que valor.

No debe modificarse para resolver una excepción aislada.

Toda evolución conservará:

- fuente única de verdad;
- responsabilidades claras;
- simplicidad;
- trazabilidad;
- coherencia con el producto;
- crecimiento incremental.

---

## 16. Regla de cierre

> La documentación debe permitir comprender el producto sin sustituirlo, preservar su historia sin quedar atrapada en ella y orientar su crecimiento sin frenar su evolución.

---

## Decisiones adoptadas

| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| DA-001 | Mantener una estructura física de `docs/` basada en dominios claros y ampliarla solo ante una necesidad real y sostenida. | Aprobada | Organización documental |
| DA-002 | Incorporar oficialmente los dominios `docs/ai/` y `docs/product/`. | Aprobada | Especialización y propiedad documental |
| DA-003 | Formalizar `docs/history/` como dominio para documentos históricos o sustituidos, fuera de la ruta normal de lectura. | Aprobada | Preservación y trazabilidad |
| DA-004 | Ubicar `Documentos relacionados` en la cabecera de los documentos que lo requieran. | Aprobada | Navegabilidad y SSOT |
| DA-005 | Incorporar `Decisiones adoptadas` en documentos que consoliden decisiones arquitectónicas, normativas o de producto. | Aprobada | Gobierno y trazabilidad |
| DA-006 | Aplicar el estándar de forma inmediata a documentos nuevos e incrementalmente a documentos existentes revisados. | Aprobada | Adopción sostenible |
| DA-007 | Referenciar roles estables en lugar de nombres personales, manteniendo la asignación vigente en `PROJECT_ROLES.md`. | Aprobada | Continuidad y mantenibilidad |
| DA-008 | Evolucionar los documentos aprobados mediante cambios mínimos sobre la versión vigente, evitando reescrituras sin justificación. | Aprobada | Preservación del conocimiento |
| DA-009 | Reconocer `manuales/`, `specifications/` y `tech/` como dominios documentales activos con responsabilidades diferenciadas. | Propuesta v1.2 | Organización y propiedad documental |
| DA-010 | Mantener `FOUNDATION.md` y `CARTA_A_GLORIA.md` en la raíz como excepciones fundacionales intencionales, sin convertir la raíz en un dominio general. | Propuesta v1.2 | Descubrimiento y simplicidad |

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | 🟡 Candidato para aprobación |
| **Versión candidata** | 1.2-rc1 |
| **Fecha de aprobación** | — |
| **Aprobado por** | — |
| **Sustituirá al aprobarse** | `DOCUMENTATION_ARCHITECTURE.md` v1.1 |
| **Sustituido por** | — |

**Impacto:** Arquitectura Documental · Gobierno del Conocimiento · Continuidad del Producto · SSOT · Navegación
