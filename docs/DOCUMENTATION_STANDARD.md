# Estándar de Documentación
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/DOCUMENTATION_STANDARD.md` |
| **Versión** | 1.1 |
| **Estado** | Activo |
| **Fecha** | 04/08/2026 |
| **Última actualización** | 04/08/2026 |
| **Propietario** | Arquitectura Documental |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Creación, revisión, aprobación, versionado y mantenimiento de documentación oficial |

## Documentos relacionados

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

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 04/08/2026 | Product Owner + AI Collaborator | Versión oficial. Consolida la metodología documental: evolución incremental de documentos, revisión obligatoria de la fuente existente, estructura desde el inicio, entrega completa de archivos y normalización de la sección `DECISIÓN`. |
| 1.0 | 03/08/2026 | Arquitectura del Producto | Primera versión activa, validada mediante documentos reales. Incorpora roles estables, Quality Gate documental y nombre canónico estable para documentos activos. |
| 1.0-rc1 | 03/08/2026 | Juan Perdomo + IA | Primera propuesta del estándar documental del producto. Define conformidad, estructura, metadatos, relaciones, estados, versionado, decisiones, nombres, revisión, aprobación y adopción incremental. |

---

## 1. Propósito

Este estándar define **cómo deben crearse, redactarse, relacionarse, aprobarse, versionarse y mantenerse los documentos oficiales de Academia Gloria Valentina**.

No es únicamente una guía de Markdown. Es el contrato mínimo que permite que la documentación:

- sea comprensible y localizable;
- tenga propietario y alcance claros;
- preserve decisiones y evolución;
- evite duplicidades;
- se mantenga alineada con el producto;
- pueda ser utilizada por personas y herramientas de IA;
- crezca sin convertirse en burocracia.

> Un documento oficial no es solo contenido escrito: es conocimiento con propósito, propiedad, estado y trazabilidad.

---

## 2. Alcance

Este estándar se aplica a:

- documentos nuevos incorporados a `docs/`;
- documentos existentes cuando sean revisados o evolucionados;
- documentos externos que se integren como fuente oficial del producto;
- estándares `STD-*`, futuras especificaciones `SPEC-*`, modelos, visiones, arquitecturas y documentos de gobierno.

No se exige su aplicación completa a:

- notas temporales;
- borradores personales no incorporados al repositorio;
- contenido educativo dirigido directamente al alumno;
- archivos generados automáticamente;
- documentos históricos que no estén siendo revisados.

Cuando uno de estos elementos pase a ser documentación oficial, deberá adaptarse al estándar.

---

## 3. Principios del estándar

### 3.1. Claridad antes que formalismo

La estructura debe ayudar a comprender. Ninguna sección se añade solo para completar una plantilla.

### 3.2. Una pregunta principal

Todo documento debe declarar qué pregunta responde y evitar asumir responsabilidades de otros documentos.

### 3.3. Fuente única de verdad

El documento debe identificar su relación con las fuentes propietarias y no duplicar definiciones completas.

### 3.4. Trazabilidad proporcional

Los cambios relevantes deben reconstruirse. Los cambios ortográficos o de formato no requieren el mismo nivel de detalle que una decisión de arquitectura.

### 3.5. Conformidad incremental

Los documentos nuevos cumplen el estándar desde su nacimiento. Los existentes se adaptan cuando vuelven a estar activos o mediante una jornada planificada.

### 3.6. Producto real como referencia

Cuando un documento describe el estado actual, debe validarse contra el código, datos, reglas y comportamiento desplegado.

### 3.7. Lenguaje humano e interpretable por IA

Los documentos deben ser claros, explícitos y estructurados, evitando depender de conocimiento tácito, conversaciones perdidas o referencias ambiguas.

### 3.8. Revisar y evolucionar antes que reescribir

Antes de crear o actualizar un documento debe revisarse la fuente existente completa.

Un documento aprobado se evoluciona mediante el menor conjunto de cambios que permita reflejar la nueva realidad.

La reescritura integral solo se justifica cuando cambia su responsabilidad principal, su estructura dejó de ser adecuada, contiene contradicciones imposibles de resolver incrementalmente o una decisión arquitectónica explícita aprueba su sustitución.

### 3.9. La documentación facilita; no bloquea

La documentación debe reducir incertidumbre, preservar conocimiento y facilitar la construcción.

Cuando el conocimiento existente sea suficiente para desarrollar con seguridad y coherencia, la ausencia de documentación adicional no debe impedir avanzar.

### 3.10. Estructura desde el inicio

Todo documento oficial debe nacer desde su primera versión con la estructura aplicable de este estándar.

La estructura precede al contenido; no se añade al final como corrección formal.

### 3.11. Entregables completos

Los documentos oficiales se entregan completos, autocontenidos, en un único archivo y listos para revisión.

No deben fragmentarse en varias respuestas salvo solicitud expresa o limitación técnica insalvable.

---

## 4. Niveles de conformidad

Para facilitar la adopción progresiva se establecen tres niveles.

### 4.1. Conformidad mínima

Obligatoria para cualquier documento oficial nuevo:

- título;
- propósito o introducción clara;
- versión;
- estado;
- fecha o última actualización;
- propietario o responsable;
- historial de versiones;
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
- regla de mantenimiento o revisión.

### 4.3. Conformidad histórica

Aplicable a documentos cerrados, sustituidos o históricos:

- estado histórico o sustituido;
- fecha de cierre o sustitución;
- motivo;
- referencia al documento vigente, cuando exista;
- preservación del contenido original salvo correcciones indispensables.

---

## 5. Cabecera documental

### 5.1. Orden recomendado

Los documentos de conformidad completa comenzarán con:

1. título;
2. subtítulo o producto;
3. tabla de metadatos;
4. documentos relacionados;
5. historial de versiones;
6. propósito;
7. alcance.

Este orden permite comprender desde el inicio qué documento se está leyendo, si está vigente, quién lo gobierna y con qué fuentes se relaciona.

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

Ejemplo:

```text
Propietario: Arquitectura Documental
Responsables: Juan Perdomo + Arquitectura colaborativa con IA
```

La propiedad no debe depender innecesariamente de una herramienta o versión concreta de IA.


### 5.4. Roles estables y asignaciones nominales

Los documentos estructurales y de producto expresarán responsabilidades mediante roles o dominios estables.

Ejemplo:

```text
Propietario: Arquitectura del Producto
Aprobación final: Product Owner
```

No se repetirá innecesariamente el nombre de la persona que ocupa un rol en múltiples documentos.

La asignación vigente entre roles y personas deberá mantenerse en una fuente operativa única, por ejemplo:

```text
docs/project/PROJECT_ROLES.md
```

Los responsables de elaboración pueden incluir personas o agentes cuando resulte útil para la trazabilidad, pero la autoridad del documento debe depender del rol y no de una persona concreta.


---

## 6. Documentos relacionados y dependencias

### 6.1. Ubicación

La sección `Documentos relacionados` debe aparecer al inicio, después de los metadatos, en documentos de conformidad completa y en cualquier documento cuya interpretación dependa de otras fuentes.

### 6.2. Contenido

Debe indicar la relación, no solo enumerar archivos.

```markdown
| Documento | Relación |
|---|---|
| `DOCUMENTATION_ARCHITECTURE.md` | Define dónde encaja este estándar. |
| `GLOSARIO.md` | Proporciona la terminología oficial. |
```

### 6.3. Tipos de relación

Cuando aporte claridad pueden utilizarse:

- **Depende de:** fuente necesaria para interpretar el documento.
- **Complementa:** desarrolla una perspectiva diferente.
- **Gobierna:** establece reglas que este documento debe cumplir.
- **Implementa:** materializa una visión, modelo o estándar.
- **Sustituye a:** asume la responsabilidad de una fuente anterior.
- **Sustituido por:** identifica la fuente vigente.

No es obligatorio crear subsecciones separadas si una tabla única resulta más clara.

---

## 7. Estados documentales

Solo se utilizarán los siguientes estados oficiales.

### 7.1. Borrador

Contenido inicial sujeto a cambios importantes. No gobierna el producto.

### 7.2. Candidato para aprobación

Documento completo preparado para revisión arquitectónica y decisión.

Puede identificarse mediante una versión `-rcN`, por ejemplo:

```text
1.0-rc1
```

### 7.3. Activo

Documento aprobado y vigente como fuente oficial.

### 7.4. En revisión

Documento activo en proceso de actualización. La versión activa anterior mantiene autoridad hasta la aprobación de la nueva, salvo declaración explícita.

### 7.5. Sustituido

Otro documento o versión asumió formalmente su responsabilidad. Debe indicar cuál.

### 7.6. Histórico

No gobierna el producto actual, pero conserva valor de contexto, trazabilidad o aprendizaje.

### 7.7. Obsoleto

No representa el producto y no conserva valor operativo suficiente. Antes de eliminarlo debe confirmarse que no contiene conocimiento único.

### 7.8. Estados no permitidos

No deben inventarse variantes ambiguas como:

- terminado;
- casi final;
- estable por ahora;
- pendiente parcial;
- aprobado provisionalmente.

Cuando sea necesario añadir contexto, se explica en el contenido sin crear otro estado.

---

## 8. Versionado

### 8.1. Formato

Se utilizará:

```text
MAYOR.MENOR
```

Y para candidatos:

```text
MAYOR.MENOR-rcN
```

Ejemplos:

- `1.0-rc1`
- `1.0`
- `1.1`
- `2.0`

### 8.2. Cambio mayor

Incrementa `MAYOR` cuando:

- cambia la responsabilidad del documento;
- se modifica sustancialmente su estructura o alcance;
- se redefine una regla o contrato central;
- la nueva versión puede afectar a múltiples documentos o componentes.

### 8.3. Cambio menor

Incrementa `MENOR` cuando:

- se amplía contenido sin romper su contrato;
- se añade una regla compatible;
- se aclara una sección relevante;
- se actualiza para reflejar una evolución consolidada.

### 8.4. Correcciones menores

No se exige un tercer número para correcciones ortográficas, enlaces o formato sin impacto en el conocimiento. Estas pueden registrarse dentro de la misma versión si no alteran decisiones ni significado.

Cuando una corrección cambie el sentido, deberá generar una nueva versión menor.

### 8.5. Versión del documento y versión del producto

Son independientes.

Un documento `1.0` puede describir el producto `2.3`. Ambos datos deben identificarse por separado cuando sea relevante.


### 8.6. Nombre temporal y nombre canónico

Durante elaboración o intercambio pueden utilizarse nombres que hagan visible el candidato:

```text
PRODUCT_DOCUMENT_v1.0-rc1.md
PRODUCT_DOCUMENT_v1.0-rc2.md
```

Una vez aprobado e incorporado como fuente oficial, el documento activo utilizará su nombre canónico estable:

```text
PRODUCT_DOCUMENT.md
```

La versión y el estado viven dentro del documento y en Git.

Esta regla general no modifica convenciones específicas aprobadas para familias como `STD-*`.


---

## 9. Historial de versiones

### 9.1. Obligación

Todo documento oficial nuevo debe incluir historial desde su primera versión candidata o activa.

### 9.2. Estructura mínima

```markdown
| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 03/08/2026 | Juan Perdomo + IA | Primera versión aprobada. |
```

### 9.3. Nivel de detalle

El historial debe explicar cambios de conocimiento, alcance, decisión o responsabilidad.

No necesita enumerar cada corrección tipográfica.

### 9.4. Documentos existentes

Cuando un documento antiguo se adapte al estándar:

- se conserva el historial existente;
- no se inventan versiones históricas desconocidas;
- puede añadirse una entrada que indique `Adopción del estándar documental`;
- las fechas desconocidas se declaran como tales, no se estiman silenciosamente.

### 9.5. Evolución de documentos aprobados

Al evolucionar un documento aprobado:

1. se utiliza la versión activa como base;
2. se conserva el contenido todavía válido;
3. se identifican los cambios estrictamente necesarios;
4. se mantiene íntegro el historial anterior;
5. se añade la nueva versión al inicio del historial;
6. y se comprueba que no se haya perdido conocimiento único.

No debe sustituirse silenciosamente un documento completo por un resumen.

---

## 10. Estructura del contenido

### 10.1. Secciones recomendadas

Un documento de conformidad completa utilizará, cuando sean pertinentes:

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
11. Decisión de cierre del entregable, cuando aplique.

No todas las secciones son obligatorias para todos los tipos. La estructura debe adaptarse a la pregunta principal.

### 10.2. Índice

Se recomienda cuando:

- el documento sea extenso;
- tenga más de diez secciones principales;
- sea una referencia recurrente;
- facilite claramente la navegación.

No es obligatorio en documentos breves.

### 10.3. Encabezados

- Un único `#` para el título.
- `##` para secciones principales.
- `###` y `####` para niveles internos.
- Evitar saltos de nivel.
- Utilizar títulos descriptivos, no genéricos como `Otros` o `Varios`.

### 10.4. Párrafos y listas

- Párrafos breves y directos.
- Listas cuando mejoren la exploración.
- Tablas para comparar elementos estructurados.
- Bloques de código solo para rutas, ejemplos, estructuras o contratos.
- Evitar grandes bloques de texto sin jerarquía.

### 10.5. Construcción y entrega

Antes de redactar:

1. revisar el documento existente o confirmar que no existe;
2. identificar el documento propietario;
3. aplicar desde el inicio la estructura pertinente;
4. construir el contenido completo;
5. validar integridad y trazabilidad;
6. entregar el archivo listo para revisión.

La respuesta conversacional no sustituye al archivo cuando el entregable solicitado es un documento oficial.

### 10.6. Lenguaje

La documentación oficial se redacta principalmente en español.

Se conservarán términos técnicos en inglés cuando sean nombres establecidos, por ejemplo:

- Single Source of Truth;
- roadmap;
- handoff;
- release notes;
- commit.

La primera aparición puede incluir explicación en español si mejora la comprensión.

---

## 11. Convenciones de nombres y rutas

### 11.1. Principios

Los nombres deben ser:

- descriptivos;
- estables;
- coherentes con el tipo documental;
- fáciles de localizar;
- independientes de una fecha salvo que la fecha sea parte del propósito.

### 11.2. Convención general

Para documentos estructurales se recomienda mayúsculas y guion bajo:

```text
DOCUMENTATION_ARCHITECTURE.md
ADN_ACADEMIA_GLORIA_VALENTINA.md
MODELO_MISIONES.md
```

### 11.3. Estándares

```text
STD-NNN_NOMBRE_DESCRIPTIVO_vM.m.md
```

Ejemplo:

```text
STD-010_LIA_2_0_v1.1.md
```

El número identifica el estándar; la versión del nombre debe mantenerse sincronizada con la versión interna durante la transición. A futuro podrá evaluarse eliminar la versión del nombre para reducir renombrados, pero no se cambia esta convención sin una decisión específica.

### 11.4. Especificaciones futuras

Convención candidata:

```text
SPEC-NNN_NOMBRE_DESCRIPTIVO_vM.m.md
```

No se utilizará formalmente hasta que se apruebe la primera especificación y su necesidad sea real.

### 11.5. Rutas oficiales

Todo documento de conformidad completa declara su ruta canónica. Los enlaces internos usarán rutas relativas cuando sea práctico y se mantendrán sincronizados al renombrar archivos.

### 11.6. Renombrados

Un renombrado exige:

1. actualizar enlaces internos;
2. actualizar `docs/README.md`;
3. actualizar documentos relacionados críticos;
4. preservar la trazabilidad en Git;
5. indicar el cambio en el historial del documento.

---

## 12. Terminología y referencias

### 12.1. Terminología oficial

Debe utilizarse el vocabulario del producto y consultar `docs/standards/STD-GLOSARIO.md` cuando exista un término definido.

### 12.2. Nombres del producto

Utilizar:

> **Academia Gloria Valentina**

Las referencias abreviadas como `la Academia` son válidas después de la primera mención.

### 12.3. Personas, roles y personajes

Deben diferenciarse:

- personas reales;
- roles del producto;
- alumnos;
- herramientas de IA;
- Personajes Oficiales de la Academia.

La terminología definitiva de personajes se consolidará en el ADN y documentos específicos de identidad.

### 12.4. Afirmaciones de estado

Distinguir claramente:

- **Implementado:** existe y está disponible.
- **En desarrollo:** existe trabajo activo, pero no está completo.
- **Propuesto:** idea todavía no aprobada.
- **Visión futura:** dirección deseada sin compromiso inmediato.

No presentar una visión como funcionalidad existente.

---

## 13. Decisiones adoptadas

### 13.1. Cuándo incluirlas

La sección es obligatoria cuando el documento:

- consolida arquitectura;
- establece un estándar;
- aprueba un modelo crítico;
- define un contrato funcional;
- resuelve una controversia relevante;
- sustituye una decisión anterior.

Puede omitirse en guías informativas, inventarios o documentos que no adopten decisiones.

### 13.2. Ubicación

Se ubica cerca del final, antes de la decisión de cierre del entregable.

### 13.3. Formato

```markdown
| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| DD-001 | Aplicar el estándar a documentos nuevos desde su aprobación. | Aprobada | Gobierno documental |
```

### 13.4. Identificadores

El prefijo puede reflejar el documento:

- `DA-*`: Arquitectura Documental.
- `DD-*`: Estándar de Documentación.
- `ADN-*`: ADN del producto.
- `STD010-*`: decisiones propias de un estándar específico.

La numeración es local al documento, salvo que la decisión se registre también en `DECISION_LOG.md`.

### 13.5. Relación con `DECISION_LOG.md`

Una decisión vive en el documento propietario. También se registra en `DECISION_LOG.md` cuando:

- afecta a varios dominios;
- tiene impacto arquitectónico transversal;
- sustituye una decisión relevante;
- necesita localizarse cronológicamente desde el gobierno del producto.

El log enlaza la decisión; no duplica toda su explicación.

---

## 14. Decisión de cierre del entregable

### 14.1. Propósito

La sección `DECISIÓN` permite identificar de forma inmediata el estado administrativo, la versión activa o propuesta, la fecha de aprobación, la autoridad que aprueba y la relación con versiones anteriores.

### 14.2. Uso

Es obligatoria en documentos fundacionales, arquitecturas, estándares, modelos críticos, especificaciones y entregables sujetos a aprobación formal.

Puede omitirse en inventarios, notas operativas o documentos históricos cuando no aporte valor.

### 14.3. Formato normalizado

```markdown
## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Borrador · Candidato para aprobación · Aprobado · Activo · Sustituido · Histórico |
| **Versión activa o propuesta** | 1.0 |
| **Fecha de aprobación** | DD/MM/AAAA o — |
| **Aprobado por** | Product Owner o — |
| **Sustituye** | Documento o versión anterior, o — |
| **Sustituido por** | Documento o versión vigente, o — |

**Impacto:** ...
```

### 14.4. Coherencia obligatoria

La cabecera, el historial y la sección `DECISIÓN` deben expresar el mismo estado y versión.

No deben coexistir en un mismo documento una cabecera candidata y una decisión aprobada.

### 14.5. Diferencia con el estado documental

El estado documental indica vigencia y madurez. La sección `DECISIÓN` registra el resultado administrativo y la relación con versiones anteriores.

---

## 15. Revisión y aprobación

### 15.1. Revisión mínima

Antes de aprobar se valida:

- propósito y pregunta principal;
- propietario;
- exactitud;
- coherencia con el producto;
- ausencia de duplicidad;
- documentos relacionados;
- terminología;
- enlaces y rutas;
- estado y versión;
- historial;
- decisiones adoptadas, cuando proceda.

### 15.2. Auditoría de conformidad documental

Antes de pasar a estado `Activo`, todo documento de conformidad completa deberá superar una revisión explícita contra este estándar.

La revisión verificará, como mínimo:

- metadatos;
- propósito y alcance;
- documentos relacionados;
- terminología;
- historial;
- decisiones;
- rutas;
- versión;
- estado;
- y mantenimiento.

Según la criticidad, puede documentarse mediante:

- checklist completado;
- revisión arquitectónica;
- informe breve;
- o auditoría formal.

No se exige crear un documento de auditoría independiente para cada entrega.

La finalidad es asegurar conformidad, no añadir burocracia.


### 15.3. Aprobación

La aprobación la realizan los arquitectos del producto.

El Product Owner mantiene la decisión final como responsable de producto.

La persona que desempeña actualmente cada rol se identifica en `docs/project/PROJECT_ROLES.md`.

La aprobación debe quedar visible en:

- estado `Activo`;
- versión sin sufijo `-rc`;
- historial de versiones;
- decisión de cierre cuando corresponda.

### 15.4. Rechazo o devolución

Un candidato puede volver a `Borrador` o generar `rc2` cuando necesite cambios relevantes.

No se publica como activo únicamente por haber sido entregado.

---

## 16. Mantenimiento y revisión

### 16.1. Eventos de revisión

Un documento se revisa cuando:

- cambia el conocimiento que gobierna;
- aparece una contradicción;
- se modifica una decisión dependiente;
- el producto implementado diverge;
- se renombra o mueve una fuente relacionada;
- se prepara una versión relevante del producto;
- vuelve a estar activo en una fase de trabajo.

### 16.2. No establecer revisiones artificiales

No se exige una revisión periódica fija para todos los documentos.

Puede definirse una periodicidad para documentos que cambien frecuentemente, pero la revisión debe responder a valor real.

### 16.3. Documentos antiguos

Se actualizarán progresivamente al ser utilizados, salvo prioridad crítica o jornada de actualización documental.

### 16.4. Jornada de actualización documental

Debe planificarse con:

- alcance;
- inventario;
- prioridad;
- criterios de validación;
- resultado esperado;
- límite temporal.

No se debe intentar modernizar todo el repositorio sin priorización.

---

## 17. Sustitución, histórico y eliminación

### 17.1. Sustitución

Un documento sustituido debe indicar:

- estado `Sustituido`;
- fecha;
- motivo;
- documento que asumió la responsabilidad.

### 17.2. Histórico

Un documento histórico conserva valor, pero no debe interpretarse como norma vigente.

Los documentos históricos o sustituidos pueden trasladarse a `docs/history/` conforme a `DOCUMENTATION_ARCHITECTURE.md`.

La carpeta `history/` no es una papelera: cada documento debe conservar contexto, estado y sustituto vigente cuando exista.

### 17.3. Eliminación

Solo se elimina cuando:

- no contiene conocimiento único;
- no aporta contexto histórico;
- no es necesario para trazabilidad;
- su eliminación no rompe enlaces o continuidad.

Git preserva el historial técnico, pero no sustituye una clasificación documental clara.

---

## 18. Uso de IA en documentación

### 18.1. Principios

Una IA puede analizar, proponer, redactar, validar y actualizar documentos, pero debe:

- trabajar con las fuentes reales disponibles;
- respetar el documento propietario;
- no inventar decisiones;
- señalar incertidumbres;
- distinguir hechos, inferencias y propuestas;
- preservar terminología y contexto;
- construir solo después de acordar el alcance.

### 18.2. Conversaciones

Los chats son espacios de trabajo, no fuentes permanentes de verdad.

Toda decisión relevante debe consolidarse en:

- el documento propietario;
- `DECISION_LOG.md`, cuando sea transversal;
- el historial de la versión correspondiente.

### 18.3. Handoff

Cuando el trabajo pase a otra IA o conversación, el entregable debe permitir continuar sin depender de memoria implícita.

### 18.4. Señal de construcción

Cuando el Product Owner solicite construir y exista claridad suficiente, la IA debe entregar el producto solicitado.

No debe responder con nuevas explicaciones del proceso, promesas de construcción o análisis repetidos.

### 18.5. Revisión de archivos reales

Cuando exista un archivo previo, la IA debe leerlo antes de modificarlo.

No debe reconstruirlo a partir de resúmenes, memoria conversacional o una interpretación parcial.

---

## 19. Plantillas

### 19.1. Plantilla mínima

```markdown
# Título

| Campo | Valor |
|---|---|
| **Versión** | 1.0 |
| **Estado** | Borrador |
| **Última actualización** | DD/MM/AAAA |
| **Propietario** | ... |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | DD/MM/AAAA | ... | Primera versión. |

## Propósito

...
```

### 19.2. Plantilla completa

```markdown
# Título
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

## Documentos relacionados

| Documento | Relación |
|---|---|
| `...` | ... |

---

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0-rc1 | DD/MM/AAAA | ... | Primera propuesta. |

---

## 1. Propósito

...

## 2. Alcance

...

## 3. Contenido

...

## Decisiones adoptadas

| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| XX-001 | ... | Aprobada | ... |

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | 🟡 Candidato para aprobación |
| **Versión propuesta** | 1.0 |
| **Fecha de aprobación** | — |
| **Aprobado por** | — |
| **Sustituye** | — |
| **Sustituido por** | — |

**Impacto:** ...
```

### 19.3. Adaptación por tipo

Las plantillas son una base, no una obligación de crear secciones vacías. Cada tipo documental debe conservar su propósito y claridad.

---

## 20. Lista de comprobación

Antes de entregar un documento oficial:

### Identidad

- [ ] Tiene título y pregunta principal clara.
- [ ] Declara versión, estado, fecha y propietario.
- [ ] Declara ruta y ámbito cuando corresponde.

### Arquitectura

- [ ] Tiene un único propósito principal.
- [ ] No duplica otro documento propietario.
- [ ] Está ubicado en el dominio correcto.
- [ ] Incluye documentos relacionados.

### Contenido

- [ ] Refleja correctamente el producto o identifica claramente la visión futura.
- [ ] Utiliza terminología oficial.
- [ ] Distingue hechos, propuestas y decisiones.
- [ ] Es comprensible para una nueva persona o IA.

### Trazabilidad

- [ ] Incluye historial.
- [ ] Registra decisiones relevantes.
- [ ] Identifica sustituciones y dependencias.
- [ ] Los enlaces y rutas son válidos.

### Aprobación

- [ ] Fue revisado por los roles responsables.
- [ ] Su estado y versión coinciden en cabecera, historial y `DECISIÓN`.
- [ ] El documento fue entregado completo como archivo.
- [ ] Si evolucionó una versión existente, se preservó todo el conocimiento todavía válido.
- [ ] El siguiente paso está claro cuando forma parte de un entregable.

---

## 21. Criterios de calidad

Un documento cumple este estándar cuando:

- puede entenderse sin reconstruir conversaciones anteriores;
- permite localizar sus fuentes y dependencias;
- deja claro si describe presente, propuesta o visión;
- posee un responsable y una vigencia identificables;
- registra cambios relevantes sin burocracia excesiva;
- ayuda a tomar decisiones o construir el producto;
- puede mantenerse de forma sostenible.

---

## 22. Adopción

Tras la aprobación de la versión 1.1:

1. todo documento nuevo aplicará este estándar desde el inicio;
2. todo documento aprobado se evolucionará desde su versión vigente;
3. los documentos oficiales se entregarán completos como archivos;
4. `README.md` y `DOCUMENTATION_ARCHITECTURE.md` mantendrán sincronizada la estructura;
5. los documentos heredados se alinearán progresivamente al ser revisados;
6. la consolidación documental no bloqueará el desarrollo del producto.

---

## Decisiones adoptadas

| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| DD-001 | Tratar este documento como estándar de conocimiento de producto, no solo de formato Markdown. | Aprobada | Gobierno documental |
| DD-002 | Ubicar `Documentos relacionados` al inicio de los documentos de conformidad completa. | Aprobada | Navegabilidad y SSOT |
| DD-003 | Separar estado documental de decisión de cierre del entregable. | Aprobada | Claridad de gobierno |
| DD-004 | Utilizar adopción incremental: documentos nuevos de inmediato y existentes al ser revisados. | Aprobada | Sostenibilidad |
| DD-005 | Usar versionado `MAYOR.MENOR` y sufijo `-rcN` para candidatos. | Aprobada | Trazabilidad |
| DD-006 | No inventar historial previo al adaptar documentos antiguos. | Aprobada | Integridad histórica |
| DD-007 | Mantener la versión en nombres `STD-*` durante la transición y evaluar su simplificación solo mediante decisión futura. | Aprobada | Compatibilidad del repositorio |
| DD-008 | Incorporar una lista de comprobación de conformidad antes de aprobar documentos oficiales. | Aprobada | Calidad documental |
| DD-009 | Utilizar roles estables en documentos estructurales y mantener asignaciones nominales en `PROJECT_ROLES.md`. | Aprobada | Continuidad y gobierno |
| DD-010 | Exigir una revisión de conformidad antes de activar documentos de conformidad completa. | Aprobada | Quality Gate documental |
| DD-011 | Utilizar un nombre canónico estable para documentos activos, salvo convenciones específicas. | Aprobada | Rutas · Git · Enlaces |
| DD-012 | Revisar el documento existente completo antes de crear o actualizar una fuente oficial. | Aprobada | Preservación del conocimiento |
| DD-013 | Evolucionar documentos aprobados mediante el menor conjunto de cambios necesario. | Aprobada | Continuidad · Eficacia |
| DD-014 | Construir documentos oficiales con la estructura estándar desde el inicio. | Aprobada | Calidad Documental |
| DD-015 | Entregar documentos oficiales completos como archivos listos para revisión. | Aprobada | Flujo de Trabajo |
| DD-016 | Establecer que la documentación facilita el producto y no debe bloquearlo. | Aprobada | Entrega de Valor |
| DD-017 | Normalizar la sección `DECISIÓN` y exigir coherencia con cabecera e historial. | Aprobada | Gobierno · Trazabilidad |
| DD-018 | Cuando exista claridad y el Product Owner solicite construir, entregar el producto sin repetir el proceso. | Aprobada | Colaboración con IA |

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Aprobado |
| **Versión activa** | 1.1 |
| **Fecha de aprobación** | 04/08/2026 |
| **Aprobado por** | Product Owner |
| **Sustituye** | `DOCUMENTATION_STANDARD.md` v1.0 |
| **Sustituido por** | — |

**Impacto:** Documentación Oficial · Gobierno del Conocimiento · Calidad Documental · Continuidad del Producto · Colaboración con IA
