# 🌈 Estándar de Documentación
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/DOCUMENTATION_STANDARD.md` |
| **Versión** | 1.2 |
| **Estado** | Activo |
| **Fecha** | 04/08/2026 |
| **Última actualización** | 03/09/2026 |
| **Propietario** | Arquitectura Documental |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Creación, revisión, aprobación, versionado, sincronización y mantenimiento de documentación oficial |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** define tipos, dominios, propiedad, relaciones y ciclo de vida del conocimiento. |
| `docs/README.md` | **Complementa:** actúa como portal de navegación y mapa operativo de la documentación. |
| `docs/project/PROJECT_ROLES.md` | **Gobierna:** define roles, autoridad y asignación vigente. |
| `docs/ai/AI_COLLABORATION_GUIDE.md` | **Gobierna:** establece el modelo general de colaboración con IA. |
| `docs/ai/AI_CHAT_BOOTSTRAP.md` | **Implementa:** aplica este estándar al incorporar una nueva IA o chat. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Complementa:** define el ciclo operativo de los cambios y entregables. |
| `docs/project/DECISION_LOG.md` | **Complementa:** registra decisiones transversales que no pertenecen únicamente a un documento específico. |
| `docs/standards/STD-GLOSARIO.md` | **Complementa:** mantiene la terminología oficial cuando exista contenido consolidado. |

---

## 🕘 Historial de versiones

> **El historial es obligatorio y no debe eliminarse al actualizar un documento.** Es la memoria mínima de cómo evolucionó su conocimiento.

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.2 | 03/09/2026 | Product Owner + AI Collaborator | Evoluciona el estándar para la jornada de sincronización documental de septiembre: formaliza nombres canónicos estables para `STD-*` y `SPEC-*`, incorpora sincronización explícita contra producto real, prueba de necesidad antes de crear documentos, método P0/P1/P2 para jornadas documentales, consolidación de acuerdos provenientes de conversaciones, lenguaje visual mediante iconos no normativos y refuerzo del Quality Gate e historial. |
| 1.1 | 04/08/2026 | Product Owner + AI Collaborator | Versión oficial. Consolida la metodología documental: evolución incremental de documentos, revisión obligatoria de la fuente existente, estructura desde el inicio, entrega completa de archivos y normalización de la sección `DECISIÓN`. |
| 1.0 | 03/08/2026 | Arquitectura del Producto | Primera versión activa, validada mediante documentos reales. Incorpora roles estables, Quality Gate documental y nombre canónico estable para documentos activos. |
| 1.0-rc1 | 03/08/2026 | Juan Perdomo + IA | Primera propuesta del estándar documental del producto. Define conformidad, metadatos, estados, versionado, decisiones, nombres, revisión, aprobación y adopción incremental. |

---

## 🎯 1. Propósito

Este estándar define **cómo deben crearse, redactarse, relacionarse, aprobarse, versionarse, sincronizarse y mantenerse los documentos oficiales de Academia Gloria Valentina**.

No es únicamente una guía de Markdown. Es el contrato mínimo que permite que la documentación:

- sea comprensible y localizable;
- tenga propietario y alcance claros;
- preserve decisiones y evolución;
- evite duplicidades;
- se mantenga alineada con el producto real;
- pueda ser utilizada por personas y herramientas de IA;
- y crezca sin convertirse en burocracia.

> **Un documento oficial no es solo contenido escrito: es conocimiento con propósito, propiedad, estado y trazabilidad.**

---

## 📐 2. Alcance

Este estándar se aplica a:

- documentos nuevos incorporados a `docs/`;
- documentos existentes cuando sean revisados o evolucionados;
- documentos externos que se integren como fuente oficial;
- estándares `STD-*`;
- especificaciones `SPEC-*`;
- modelos;
- visiones;
- arquitecturas;
- documentación técnica;
- manuales oficiales;
- y documentos de gobierno del proyecto.

No se exige su aplicación completa a:

- notas temporales;
- borradores personales no incorporados al repositorio;
- contenido educativo dirigido directamente al alumno;
- archivos generados automáticamente;
- documentos históricos que no estén siendo revisados.

Cuando uno de estos elementos pase a ser documentación oficial activa, deberá adaptarse al estándar.

---

## 🧭 3. Principios del estándar

### 3.1. Claridad antes que formalismo

La estructura debe ayudar a comprender. Ninguna sección se añade solo para completar una plantilla.

### 3.2. Una pregunta principal por documento

Todo documento debe responder principalmente a una pregunta y evitar asumir responsabilidades de otras fuentes.

### 3.3. Fuente única de verdad — SSOT

Cada conocimiento importante debe tener un único documento propietario.

Otros documentos pueden enlazarlo, resumirlo brevemente o explicar su relación, pero no mantener una segunda definición completa que pueda evolucionar de forma independiente.

> **Una verdad importante, un propietario documental.**

### 3.4. Trazabilidad proporcional

Los cambios relevantes deben poder reconstruirse. Correcciones ortográficas o de formato no requieren el mismo nivel de detalle que una decisión funcional o arquitectónica.

### 3.5. Conformidad incremental

Los documentos nuevos cumplen el estándar desde su nacimiento. Los existentes se adaptan cuando vuelven a estar activos o mediante una jornada documental planificada.

### 3.6. Producto real como referencia

Cuando un documento describa estado actual, debe contrastarse con las fuentes reales suficientes para verificarlo, según corresponda:

- código vigente;
- estructura del repositorio;
- reglas y contratos;
- datos o modelos persistidos;
- comportamiento validado;
- documentos propietarios relacionados.

No debe declararse `Implementado` únicamente porque una conversación o un plan diga que lo está.

### 3.7. Lenguaje humano e interpretable por IA

Los documentos deben ser claros, explícitos y estructurados, evitando depender de conocimiento tácito, conversaciones perdidas o referencias ambiguas.

### 3.8. Revisar y evolucionar antes que reescribir

Antes de crear o actualizar un documento debe revisarse la fuente existente completa.

Un documento aprobado se evoluciona mediante el **menor conjunto de cambios que permita reflejar la nueva realidad**.

La reescritura integral solo se justifica cuando cambia su responsabilidad principal, su estructura dejó de ser adecuada, contiene contradicciones imposibles de resolver incrementalmente o existe una decisión explícita de sustitución.

### 3.9. La documentación facilita; no bloquea

La documentación debe reducir incertidumbre, preservar conocimiento y facilitar la construcción.

Cuando el conocimiento existente sea suficiente para desarrollar con seguridad y coherencia, la ausencia de documentación adicional no debe impedir avanzar.

### 3.10. Estructura desde el inicio

Todo documento oficial debe nacer desde su primera versión con la estructura aplicable de este estándar.

### 3.11. Entregables completos

Los documentos oficiales se entregan completos, autocontenidos y listos para revisión. Una respuesta conversacional no sustituye al archivo cuando el producto solicitado es un documento oficial.

### 3.12. Actualizar antes que crear

Antes de proponer un documento nuevo debe comprobarse:

1. si el conocimiento ya tiene propietario;
2. si existe un documento que pueda evolucionarse;
3. si la nueva fuente responde a una pregunta realmente distinta;
4. si tendrá responsabilidad estable;
5. si su valor futuro justifica mantenerla.

Si estas condiciones no se cumplen, **no se crea un documento nuevo**.

### 3.13. Acuerdos de conversación: consolidar, no copiar

Los chats son espacios de trabajo, no fuentes permanentes de verdad.

Cuando una conversación produzca un acuerdo estable:

```text
Conversación / desarrollo
        ↓
Acuerdo validado
        ↓
Identificar propietario documental
        ↓
Consolidar solo conocimiento estable
        ↓
Historial de la nueva versión
```

No se copia la conversación completa ni se documentan decisiones accidentales de implementación como si fueran principios permanentes.

---

## ✅ 4. Niveles de conformidad

### 4.1. Conformidad mínima

Obligatoria para cualquier documento oficial nuevo:

- título;
- propósito o introducción clara;
- versión;
- estado;
- fecha o última actualización;
- propietario o responsable;
- **historial de versiones**;
- contenido estructurado;
- documentos relacionados cuando existan;
- ausencia de duplicidad conocida.

### 4.2. Conformidad completa

Obligatoria para documentos fundacionales, arquitecturas, estándares, modelos críticos y especificaciones:

- todos los elementos de conformidad mínima;
- ruta oficial;
- ámbito;
- alcance y exclusiones;
- terminología consistente;
- relaciones y dependencias;
- criterios de calidad o aceptación;
- decisiones adoptadas cuando corresponda;
- regla de mantenimiento o revisión;
- `DECISIÓN` de cierre cuando aplique.

### 4.3. Conformidad histórica

Aplicable a documentos cerrados, sustituidos o históricos:

- estado histórico o sustituido;
- fecha de cierre o sustitución;
- motivo;
- referencia al documento vigente cuando exista;
- preservación del contenido original salvo correcciones indispensables.

---

## 🪪 5. Cabecera documental

### 5.1. Orden recomendado

Los documentos de conformidad completa comenzarán con:

1. título;
2. subtítulo o producto;
3. tabla de metadatos;
4. documentos relacionados;
5. historial de versiones;
6. propósito;
7. alcance.

El historial debe permanecer **cerca del inicio** para que la evolución del documento sea visible y difícil de olvidar.

### 5.2. Metadatos obligatorios

| Campo | Obligatorio | Uso |
|---|---:|---|
| Ruta oficial | Sí, en conformidad completa | Ubicación canónica en el repositorio. |
| Versión | Sí | Identificador de evolución del documento. |
| Estado | Sí | Madurez o vigencia. |
| Fecha / última actualización | Sí | Referencia temporal. |
| Propietario | Sí | Rol o dominio responsable del conocimiento. |
| Responsables | Recomendado | Personas o agentes que elaboran y mantienen. |
| Ámbito | Sí, en conformidad completa | Límite de aplicación. |

### 5.3. Propietario y responsables

- **Propietario** identifica el rol o dominio que gobierna el conocimiento.
- **Responsables** identifica quiénes construyen, revisan o mantienen el documento.

La propiedad no debe depender innecesariamente de una herramienta o versión concreta de IA.

### 5.4. Roles estables y asignaciones nominales

Los documentos estructurales expresarán autoridad mediante roles o dominios estables. La asignación vigente entre roles y personas deberá mantenerse en una fuente operativa única, actualmente `docs/project/PROJECT_ROLES.md`.

---

## 🔗 6. Documentos relacionados y dependencias

### 6.1. Ubicación

La sección `Documentos relacionados` aparece al inicio, después de los metadatos, en documentos de conformidad completa y en cualquier fuente cuya interpretación dependa de otras.

### 6.2. Contenido

Debe indicar la relación y no limitarse a enumerar archivos.

```markdown
| Documento | Relación |
|---|---|
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** define dónde encaja este documento. |
| `docs/standards/STD-GLOSARIO.md` | **Complementa:** proporciona terminología oficial. |
```

### 6.3. Relaciones recomendadas

- **Gobierna:** establece reglas que el documento debe respetar.
- **Complementa:** desarrolla una perspectiva diferente.
- **Implementa:** materializa una visión, modelo o estándar.
- **Depende de:** fuente necesaria para interpretarlo.
- **Sustituye a:** asume responsabilidad de una fuente anterior.
- **Sustituido por:** identifica la fuente vigente.

---

## 🚦 7. Estados documentales

Los estados canónicos son:

- 📝 **Borrador**
- 🟡 **Candidato para aprobación**
- ✅ **Activo**
- 🔄 **En revisión**
- ↪️ **Sustituido**
- 🗃️ **Histórico**
- ⚠️ **Obsoleto**

> **El icono es visual; el texto es normativo.** El valor canónico es `Activo`, `Borrador`, etc. Los iconos pueden cambiar sin alterar el significado.

No deben inventarse estados ambiguos como `terminado`, `casi final`, `aprobado provisionalmente` o `estable por ahora`.

Cuando sea necesario explicar una condición adicional se utiliza una nota separada, no un nuevo estado documental.

---

## 🔢 8. Versionado

### 8.1. Formato

```text
MAYOR.MENOR
```

Para candidatos:

```text
MAYOR.MENOR-rcN
```

### 8.2. Cambio mayor

Incrementa `MAYOR` cuando cambia sustancialmente responsabilidad, alcance, estructura o contrato central.

### 8.3. Cambio menor

Incrementa `MENOR` cuando se amplía o aclara contenido de forma compatible o se sincroniza una evolución consolidada.

### 8.4. Correcciones menores

No se exige un tercer número para correcciones ortográficas, enlaces o formato sin impacto en el conocimiento.

### 8.5. Versión del documento y versión del producto

Son independientes.

### 8.6. Nombre canónico estable

La versión y el estado viven dentro del documento y en Git. El archivo activo utiliza un nombre estable y **no incorpora normalmente la versión en su nombre**.

Ejemplos:

```text
DOCUMENTATION_STANDARD.md
STD-MIS_TAREAS_Y_MISIONES.md
SPEC-REVISION_TRABAJO_REALIZADO.md
MODEL_MOTORES_DE_APRENDIZAJE.md
```

Los nombres temporales con `-rc` pueden utilizarse fuera del repositorio durante elaboración, pero una fuente oficial activa mantiene su ruta canónica estable.

---

## 🕘 9. Historial de versiones

### 9.1. Obligación

Todo documento oficial nuevo debe incluir historial desde su primera versión candidata o activa.

### 9.2. Estructura mínima

```markdown
| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 03/09/2026 | Product Owner + IA | Primera versión aprobada. |
```

### 9.3. Nivel de detalle

El historial explica cambios de conocimiento, alcance, decisión o responsabilidad. No necesita enumerar correcciones tipográficas.

### 9.4. Documentos existentes

Al adaptar una fuente antigua:

- se conserva el historial disponible;
- no se inventan versiones desconocidas;
- puede añadirse una entrada de adopción del estándar;
- las fechas desconocidas se declaran como tales.

### 9.5. Evolución de documentos aprobados

Al evolucionar un documento:

1. usar la versión activa como base;
2. conservar contenido todavía válido;
3. introducir únicamente cambios necesarios;
4. mantener íntegro el historial previo;
5. añadir la nueva versión al inicio;
6. comprobar que no se perdió conocimiento único.

> **No debe sustituirse silenciosamente un documento completo por un resumen.**

---

## 🧱 10. Estructura, legibilidad e identidad documental

### 10.1. Secciones recomendadas

Según el tipo documental pueden utilizarse:

1. Propósito.
2. Alcance.
3. Principios o contexto.
4. Definiciones.
5. Contenido principal.
6. Reglas, modelo o comportamiento.
7. Relaciones e integración.
8. Criterios de calidad o aceptación.
9. Mantenimiento y evolución.
10. Decisiones adoptadas.
11. `DECISIÓN`.

No se crean secciones vacías únicamente para cumplir una plantilla.

### 10.2. Índice

Se recomienda para documentos extensos, de referencia frecuente o con más de diez secciones principales.

### 10.3. Encabezados

- Un único `#` para el título.
- `##` para secciones principales.
- `###` y `####` para niveles internos.
- No saltar niveles.
- Utilizar títulos descriptivos.

### 10.4. Párrafos, listas y tablas

- párrafos breves;
- listas cuando mejoren exploración;
- tablas para información comparable;
- bloques de código solo para rutas, contratos, estructuras o ejemplos;
- evitar grandes paredes de texto.

### 10.5. Lenguaje

La documentación oficial se redacta principalmente en español. Se conservan términos técnicos establecidos cuando aporten precisión.

### 10.6. Identidad visual ligera

La documentación puede utilizar iconos y emojis para facilitar navegación y expresar la identidad de la Academia, especialmente en títulos de secciones.

Ejemplos recomendados:

- 🎯 Propósito
- 📐 Alcance
- 🧭 Principios
- 🔗 Documentos relacionados
- 🕘 Historial de versiones
- 📘 Reglas
- ✅ Criterios de calidad
- 🔄 Mantenimiento
- 📌 Decisiones

Reglas:

- los iconos **no sustituyen texto**;
- no alteran el significado normativo;
- deben mejorar exploración, no decorar cada línea;
- documentación técnica puede ser más sobria cuando corresponda.

---

## 🗂️ 11. Convenciones de nombres y rutas

### 11.1. Principios

Los nombres deben ser descriptivos, estables, localizables y coherentes con el tipo documental.

### 11.2. Documentos estructurales

Se recomienda mayúsculas y guion bajo cuando la familia ya esté consolidada:

```text
DOCUMENTATION_ARCHITECTURE.md
ADN_ACADEMIA_GLORIA_VALENTINA.md
MODELO_MISIONES.md
```

### 11.3. Estándares `STD-*`

Familia oficial:

```text
STD-NOMBRE_DESCRIPTIVO.md
```

Ejemplo:

```text
STD-MIS_TAREAS_Y_MISIONES.md
```

No se exige renombrar de forma masiva documentos heredados únicamente para adoptar esta convención. Se normalizan cuando sean intervenidos y el coste sea proporcional.

### 11.4. Especificaciones `SPEC-*`

La familia `SPEC-*` queda formalmente adoptada:

```text
SPEC-NOMBRE_DESCRIPTIVO.md
```

Ejemplos vigentes:

```text
SPEC-MIS_TAREAS_Y_MISIONES.md
SPEC-REVISION_TRABAJO_REALIZADO.md
```

### 11.5. Rutas oficiales

Todo documento de conformidad completa declara ruta canónica. Las referencias deben mantenerse sincronizadas cuando una fuente se mueva o renombre.

### 11.6. Renombrados

Un renombrado exige:

1. actualizar enlaces internos;
2. actualizar `docs/README.md` cuando aplique;
3. actualizar documentos relacionados críticos;
4. preservar trazabilidad en Git;
5. indicar el cambio en el historial.

---

## 🗣️ 12. Terminología y afirmaciones de estado

### 12.1. Terminología oficial

Consultar `docs/standards/STD-GLOSARIO.md` cuando exista definición aplicable.

### 12.2. Nombre del producto

Utilizar **Academia Gloria Valentina** en la primera referencia; `la Academia` es válido posteriormente.

### 12.3. Personas, roles y personajes

Deben diferenciarse claramente personas reales, roles del producto, alumnos, herramientas de IA y Personajes Oficiales.

### 12.4. Afirmaciones de estado funcional

Distinguir:

- **Implementado:** existe y está disponible/validado en el alcance declarado.
- **En desarrollo:** existe trabajo activo, pero no está completo.
- **Propuesto:** idea todavía no aprobada o no construida.
- **Visión futura:** dirección deseada sin compromiso inmediato.

No presentar una visión o propuesta como funcionalidad existente.

---

## 📌 13. Decisiones adoptadas

### 13.1. Cuándo incluirlas

La sección es obligatoria cuando el documento establece un estándar, consolida arquitectura, aprueba un modelo crítico, define un contrato funcional, resuelve una controversia relevante o sustituye una decisión anterior.

### 13.2. Formato

```markdown
| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| DD-001 | Aplicar el estándar a documentos nuevos. | Aprobada | Gobierno documental |
```

### 13.3. Relación con `DECISION_LOG.md`

Una decisión vive en su documento propietario. También se registra en `DECISION_LOG.md` cuando afecta varios dominios, tiene impacto arquitectónico transversal, sustituye una decisión relevante o necesita localizarse cronológicamente.

El log enlaza o resume; no duplica toda la explicación.

---

## ✅ 14. Decisión de cierre del entregable

La sección `DECISIÓN` identifica el resultado administrativo del documento y debe ser coherente con cabecera e historial.

Formato recomendado:

```markdown
## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Aprobado |
| **Versión activa o propuesta** | 1.0 |
| **Fecha de aprobación** | DD/MM/AAAA o — |
| **Aprobado por** | Product Owner o — |
| **Sustituye** | Documento o versión anterior, o — |
| **Sustituido por** | Documento o versión vigente, o — |

**Impacto:** ...
```

La cabecera puede declarar `Estado: Activo` mientras la decisión de cierre declara `Estado: Aprobado`; representan conceptos diferentes y deben ser compatibles.

---

## 🔍 15. Revisión y Quality Gate

### 15.1. Revisión mínima

Antes de aprobar se valida:

- propósito y pregunta principal;
- propietario;
- exactitud;
- coherencia con producto real;
- ausencia de duplicidad;
- documentos relacionados;
- terminología;
- enlaces y rutas;
- estado y versión;
- **historial de versiones**;
- decisiones adoptadas cuando proceda.

### 15.2. Auditoría de conformidad

Antes de pasar a `Activo`, todo documento de conformidad completa debe superar revisión explícita contra este estándar.

No se exige crear un informe independiente para cada caso. La finalidad es asegurar conformidad, no burocracia.

### 15.3. Aprobación

El Product Owner mantiene la decisión final. La aprobación debe quedar visible en:

- estado documental;
- versión sin `-rc`;
- historial;
- `DECISIÓN` cuando corresponda.

---

## 🔄 16. Sincronización documental con el producto real

### 16.1. Cuándo aplica

Aplica cuando:

- el producto implementado supera lo descrito;
- una capacidad marcada pendiente ya fue cerrada;
- una propuesta se convirtió en comportamiento real;
- una arquitectura o patrón validado se volvió reutilizable;
- nuevas entidades o contratos hacen incompleta una fuente técnica;
- existen rutas o relaciones documentales obsoletas.

### 16.2. Método

```text
1. Identificar el desfase
2. Leer la fuente propietaria completa
3. Contrastar producto / código / reglas / comportamiento
4. Separar hechos de acuerdos y visión
5. Actualizar solo conocimiento estable
6. Añadir historial
7. Validar rutas y relaciones
8. Ejecutar Quality Gate
```

### 16.3. Evidencia suficiente

El nivel de comprobación debe ser proporcional. Una afirmación de estado puede apoyarse en código vigente, PR integrado, datos, reglas, comportamiento validado o una combinación de fuentes según el dominio.

---

## 🧹 17. Jornadas de actualización documental

Una jornada documental debe tener:

- alcance explícito;
- inventario;
- prioridad;
- criterios de validación;
- resultado esperado;
- límite temporal.

### 17.1. Priorización recomendada

- 🔴 **P0:** documento claramente desfasado, propietario de conocimiento recién consolidado o necesario para gobernar el resto de la jornada.
- 🟠 **P1:** revisión importante pero no bloqueante; probable actualización selectiva.
- 🟡 **P2:** comprobación dirigida; puede terminar sin cambios.

### 17.2. Orden de trabajo

```text
Inventario
   ↓
Prioridad P0 / P1 / P2
   ↓
Documento propietario
   ↓
Revisión completa
   ↓
Actualizar / Mantener / Sustituir / Archivar
   ↓
Quality Gate
```

No se debe intentar modernizar todo el repositorio sin priorización.

---

## 🗃️ 18. Sustitución, histórico y eliminación

### 18.1. Sustitución

Un documento sustituido indica estado, fecha, motivo y fuente que asumió su responsabilidad.

### 18.2. Histórico

`docs/history/` preserva contexto y trazabilidad; no es una papelera ni una fuente vigente cuando existe un propietario activo.

### 18.3. Eliminación

Solo se elimina cuando no contiene conocimiento único, no aporta contexto histórico, no es necesario para trazabilidad y su eliminación no rompe continuidad.

Git preserva historial técnico, pero no sustituye una clasificación documental clara.

---

## 🤖 19. Uso de IA y conversaciones

Una IA puede analizar, proponer, redactar, validar y actualizar documentos, pero debe:

- trabajar con fuentes reales;
- respetar el documento propietario;
- no inventar decisiones;
- señalar incertidumbres;
- distinguir hechos, inferencias, propuestas y decisiones;
- preservar terminología e historial;
- construir después de acordar el alcance.

Cuando exista un archivo previo, debe leerse antes de modificarlo. No debe reconstruirse únicamente desde memoria o resúmenes.

Cuando el Product Owner solicite construir y exista claridad suficiente, la IA debe entregar el producto solicitado sin repetir innecesariamente el análisis.

---

## 🧩 20. Plantillas

### 20.1. Plantilla mínima

```markdown
# 🌈 Título

| Campo | Valor |
|---|---|
| **Versión** | 1.0 |
| **Estado** | Borrador |
| **Última actualización** | DD/MM/AAAA |
| **Propietario** | ... |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | DD/MM/AAAA | ... | Primera versión. |

## 🎯 Propósito

...
```

### 20.2. Plantilla completa

```markdown
# 🌈 Título
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/...` |
| **Versión** | 1.0-rc1 |
| **Estado** | Candidato para aprobación |
| **Fecha** | DD/MM/AAAA |
| **Última actualización** | DD/MM/AAAA |
| **Propietario** | ... |
| **Responsables** | ... |
| **Ámbito** | ... |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `...` | ... |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0-rc1 | DD/MM/AAAA | ... | Primera propuesta. |

## 🎯 1. Propósito

...

## 📐 2. Alcance

...

## 📌 Decisiones adoptadas

...

## ✅ DECISIÓN

...
```

Las plantillas son una base; cada tipo documental conserva su propósito y claridad.

---

## ☑️ 21. Lista de comprobación

### Identidad

- [ ] Tiene título y pregunta principal clara.
- [ ] Declara versión, estado, fecha y propietario.
- [ ] Declara ruta y ámbito cuando corresponde.

### Arquitectura

- [ ] Tiene un único propósito principal.
- [ ] No duplica otro documento propietario.
- [ ] Está ubicado en el dominio correcto.
- [ ] Incluye documentos relacionados.
- [ ] Si es nuevo, superó la prueba de necesidad documental.

### Contenido

- [ ] Refleja correctamente el producto o identifica explícitamente la visión futura.
- [ ] Las afirmaciones de estado fueron contrastadas con fuentes reales suficientes.
- [ ] Utiliza terminología oficial.
- [ ] Distingue hechos, propuestas y decisiones.
- [ ] Es comprensible para una nueva persona o IA.

### Trazabilidad

- [ ] **Incluye historial de versiones.**
- [ ] Conserva el historial previo si evolucionó una fuente existente.
- [ ] Registra decisiones relevantes.
- [ ] Identifica sustituciones y dependencias.
- [ ] Los enlaces y rutas son válidos.

### Aprobación

- [ ] Fue revisado por los roles responsables.
- [ ] Estado, versión, historial y `DECISIÓN` son coherentes.
- [ ] Se preservó conocimiento todavía válido.
- [ ] El siguiente paso está claro cuando forma parte de un entregable.

---

## ✅ 22. Criterios de calidad

Un documento cumple este estándar cuando:

- puede entenderse sin reconstruir conversaciones anteriores;
- permite localizar fuentes y dependencias;
- deja claro si describe presente, propuesta o visión;
- posee responsable y vigencia identificables;
- mantiene historial útil;
- refleja el producto real cuando declara estado actual;
- registra cambios relevantes sin burocracia excesiva;
- ayuda a tomar decisiones o construir el producto;
- puede mantenerse de forma sostenible.

---

## 🌱 23. Adopción

Tras la aprobación de la versión 1.2:

1. todo documento nuevo aplicará este estándar desde el inicio;
2. todo documento aprobado se evolucionará desde su versión vigente;
3. `STD-*` y `SPEC-*` utilizarán nombres canónicos estables sin versión en el nombre para nuevas fuentes y normalizaciones oportunas;
4. no se realizarán renombrados masivos solo por adoptar la convención;
5. toda afirmación de estado actual se contrastará con producto real en nivel proporcional;
6. los acuerdos estables de conversaciones se consolidarán en su propietario documental;
7. las jornadas documentales podrán priorizar mediante P0/P1/P2;
8. el historial de versiones será parte explícita del Quality Gate;
9. los iconos podrán mejorar legibilidad sin convertirse en significado normativo;
10. la consolidación documental continuará sin bloquear el desarrollo del producto.

---

## 📌 Decisiones adoptadas

| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| DD-001 | Tratar este documento como estándar de conocimiento de producto, no solo de formato Markdown. | Aprobada | Gobierno documental |
| DD-002 | Ubicar `Documentos relacionados` al inicio de los documentos de conformidad completa. | Aprobada | Navegabilidad y SSOT |
| DD-003 | Separar estado documental de decisión de cierre del entregable. | Aprobada | Claridad de gobierno |
| DD-004 | Utilizar adopción incremental: documentos nuevos de inmediato y existentes al ser revisados. | Aprobada | Sostenibilidad |
| DD-005 | Usar versionado `MAYOR.MENOR` y sufijo `-rcN` para candidatos. | Aprobada | Trazabilidad |
| DD-006 | No inventar historial previo al adaptar documentos antiguos. | Aprobada | Integridad histórica |
| DD-007 | Usar nombre canónico estable para documentos activos, incluida la familia `STD-*`; no ejecutar renombrados masivos únicamente por esta convención. | Aprobada | Rutas · Git · Enlaces |
| DD-008 | Incorporar una lista de comprobación de conformidad antes de aprobar documentos oficiales. | Aprobada | Calidad documental |
| DD-009 | Utilizar roles estables en documentos estructurales y mantener asignaciones nominales en `PROJECT_ROLES.md`. | Aprobada | Continuidad y gobierno |
| DD-010 | Exigir una revisión de conformidad antes de activar documentos de conformidad completa. | Aprobada | Quality Gate documental |
| DD-011 | Revisar el documento existente completo antes de crear o actualizar una fuente oficial. | Aprobada | Preservación del conocimiento |
| DD-012 | Evolucionar documentos aprobados mediante el menor conjunto de cambios necesario. | Aprobada | Continuidad · Eficacia |
| DD-013 | Construir documentos oficiales con la estructura estándar desde el inicio. | Aprobada | Calidad documental |
| DD-014 | Entregar documentos oficiales completos cuando el entregable solicitado sea un documento. | Aprobada | Flujo de trabajo |
| DD-015 | Establecer que la documentación facilita el producto y no debe bloquearlo. | Aprobada | Entrega de valor |
| DD-016 | Normalizar la sección `DECISIÓN` y exigir coherencia con cabecera e historial. | Aprobada | Gobierno · Trazabilidad |
| DD-017 | Cuando exista claridad y el Product Owner solicite construir, entregar el producto sin repetir innecesariamente el proceso. | Aprobada | Colaboración con IA |
| DD-018 | Adoptar formalmente `SPEC-*` como familia documental con nombre canónico estable. | Aprobada | Arquitectura documental |
| DD-019 | Exigir una prueba de necesidad antes de crear una nueva fuente oficial. | Aprobada | SSOT · Sostenibilidad |
| DD-020 | Contrastar las afirmaciones de estado actual con fuentes reales suficientes y proporcionales. | Aprobada | Exactitud documental |
| DD-021 | Consolidar acuerdos estables de conversaciones en el documento propietario, no tratar el chat como SSOT. | Aprobada | Continuidad del conocimiento |
| DD-022 | Utilizar P0/P1/P2 como método recomendado de priorización en jornadas documentales. | Aprobada | Eficacia documental |
| DD-023 | Permitir iconos para mejorar exploración, manteniendo el texto como significado normativo. | Aprobada | Legibilidad · Identidad |
| DD-024 | Reforzar el historial de versiones como elemento explícito e ineludible del Quality Gate. | Aprobada | Trazabilidad |

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Aprobado |
| **Versión activa** | 1.2 |
| **Fecha de aprobación** | 03/09/2026 |
| **Aprobado por** | Product Owner |
| **Sustituye** | `DOCUMENTATION_STANDARD.md` v1.1 |
| **Sustituido por** | — |

**Impacto:** Documentación Oficial · Gobierno del Conocimiento · Calidad Documental · Sincronización con Producto Real · Continuidad · Colaboración con IA