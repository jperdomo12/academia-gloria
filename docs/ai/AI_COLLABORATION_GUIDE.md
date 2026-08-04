# AI Collaboration Guide
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/ai/AI_COLLABORATION_GUIDE.md` |
| **Versión** | 1.0-rc1 |
| **Estado** | Candidato para aprobación |
| **Fecha** | 03/08/2026 |
| **Última actualización** | 03/08/2026 |
| **Propietario** | Gobierno de Colaboración con IA |
| **Responsables** | Arquitectura del Producto + Arquitectura colaborativa con IA |
| **Ámbito** | Incorporación, colaboración, análisis, decisión, documentación, construcción, revisión y transferencia de conocimiento entre personas e IA |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** define dónde vive cada conocimiento, sus propietarios y su ciclo de vida. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** establece la estructura, trazabilidad, estados, versionado y Quality Gate de los entregables documentales. |
| `docs/ADN_ACADEMIA_GLORIA_VALENTINA.md` | **Gobierna:** define la identidad, los valores y los principios que toda colaboración debe respetar. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna:** define cómo se organiza conceptualmente la experiencia del producto. |
| `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` | **Gobierna:** define el lenguaje visual y emocional, los Personajes Oficiales y la evolución de los assets de identidad. |
| `docs/project/RELEASE_NOTES.md` | **Complementa:** registra la evolución publicada del producto. |
| `docs/project/DECISION_LOG.md` | **Complementa:** registra decisiones transversales cuando exista y corresponda. |
| `docs/project/PROJECT_ROLES.md` | **Complementará:** mantendrá la asignación vigente entre roles y personas. |
| `docs/standards/STD-GLOSARIO.md` | **Complementa:** proporciona terminología oficial cuando exista una definición aplicable. |
| `docs/models/` | **Implementa:** contiene modelos y especificaciones que materializan decisiones de producto. |

## Historial de versiones


| Versión | Fecha       | Responsables                   | Cambios                                                                                                                                                                                                               |
| ------- | ----------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1.0** | Agosto 2026 | Arquitectura del Producto + IA | Publicación oficial tras superar la Auditoría de Conformidad contra `DOCUMENTATION_STANDARD v1.0`. Se declara como modelo oficial de colaboración entre Personas, Documentación e IA de la Academia Gloria Valentina. |


## Índice

1. Propósito
2. Alcance
3. Pregunta principal
4. Declaración fundamental
5. Objetivos
6. Modelo de autoridad
7. Principios de colaboración
8. Incorporación de una nueva IA
9. Contexto mínimo obligatorio
10. Identificación del documento propietario
11. Ciclo oficial de colaboración
12. Equilibrio entre análisis y construcción
13. Tipos de trabajo y modos de colaboración
14. Especialización de chats
15. Gestión del conocimiento
16. Hechos, inferencias, propuestas y decisiones
17. Construcción de entregables
18. Desarrollo e implementación
19. Validación y Quality Gate
20. Transferencia entre chats e IA
21. Comunicación efectiva
22. Comportamientos esperados
23. Antipatrones
24. Gestión de incertidumbre y desacuerdo
25. Seguridad, privacidad y uso responsable
26. Mantenimiento del modelo
27. Checklist operativo
28. Declaración de colaboración

---

## 1. Propósito

Definir el modelo oficial de colaboración entre:

- las personas que gobiernan y construyen la Academia;
- la documentación oficial;
- y las herramientas de Inteligencia Artificial que participan en su análisis, diseño, desarrollo y evolución.

Este documento busca que una nueva IA pueda incorporarse al trabajo de la Academia **en pocos minutos**, comprender cómo se toman decisiones y empezar a aportar valor sin depender de meses de conversaciones anteriores.

No enseña a utilizar una herramienta concreta.

Enseña a colaborar correctamente dentro del producto.

---

## 2. Alcance

Este documento se aplica a toda colaboración con IA relacionada con:

- arquitectura;
- producto;
- experiencia;
- documentación;
- análisis funcional;
- diseño;
- desarrollo;
- pruebas;
- contenido;
- identidad visual;
- mantenimiento;
- auditorías;
- y evolución del producto.

Quedan fuera de su alcance:

- instrucciones técnicas específicas de un proveedor de IA;
- configuración detallada de modelos;
- credenciales;
- prompts privados de infraestructura;
- procedimientos operativos que pertenezcan a una herramienta concreta;
- y reglas funcionales propietarias de otros documentos.

Cuando exista una regla específica de un dominio, este documento deberá referenciarla y no duplicarla.

---

## 3. Pregunta principal

> **¿Cómo deben colaborar las personas, la documentación y la IA para construir y evolucionar la Academia con rapidez, calidad, coherencia y trazabilidad?**

---

## 4. Declaración fundamental

> **La IA colabora con el producto; no dirige el producto.**

La IA puede:

- analizar;
- cuestionar;
- proponer;
- comparar;
- redactar;
- construir;
- validar;
- detectar riesgos;
- y acelerar el trabajo.

La IA no sustituye:

- la autoridad del Product Owner;
- el criterio de Arquitectura del Producto;
- la responsabilidad de quienes aprueban;
- ni la experiencia real del alumno y su familia.

```text
PRODUCT OWNER
     │ define prioridades y decide
     ▼
ARQUITECTURA DEL PRODUCTO
     │ protege coherencia y principios
     ▼
DOCUMENTACIÓN OFICIAL
     │ preserva conocimiento y decisiones
     ▼
PERSONAS + IA
     │ analizan, construyen y validan
     ▼
PRODUCTO REAL
     │ aporta evidencia y aprendizaje
     └───────────────────────────────┐
                                     ▼
                               NUEVA EVOLUCIÓN
```

---

## 5. Objetivos

Este modelo persigue:

1. reducir el tiempo de incorporación de una nueva IA;
2. evitar que cada chat reinvente el producto;
3. preservar las decisiones relevantes fuera de las conversaciones;
4. acelerar el análisis sin prolongarlo innecesariamente;
5. mejorar la calidad de los entregables;
6. separar claramente propuesta, decisión e implementación;
7. facilitar la especialización de chats;
8. permitir continuidad entre personas, herramientas y momentos;
9. reducir retrabajo;
10. y mantener el ADN durante la evolución.

---

## 6. Modelo de autoridad

### 6.1 Product Owner

El Product Owner:

- mantiene la visión y prioridades;
- decide el alcance;
- acepta o rechaza propuestas;
- aprueba entregables;
- y conserva la decisión final sobre el producto.

### 6.2 Arquitectura del Producto

Arquitectura del Producto:

- protege el ADN;
- define límites conceptuales;
- identifica dominios;
- evalúa impacto y dependencias;
- y evita decisiones locales que dañen la coherencia global.

### 6.3 Documento propietario

El documento propietario:

- conserva la definición oficial de un conocimiento;
- registra sus decisiones;
- gobierna documentos dependientes;
- y evita duplicidades.

### 6.4 IA colaboradora

La IA:

- trabaja con las fuentes disponibles;
- identifica la autoridad aplicable;
- presenta alternativas;
- declara incertidumbres;
- construye lo aprobado;
- y ayuda a validar el resultado.

### 6.5 Producto real

El comportamiento real del producto, su código, datos, interfaces y uso efectivo aportan evidencia.

Cuando la documentación describe el presente, debe contrastarse con esa realidad.

### 6.6 Alumno y familia

La experiencia real del alumno y la familia tiene un valor especial.

Una teoría de diseño no debe prevalecer automáticamente sobre evidencia clara de uso.

---

## 7. Principios de colaboración

### 7.1 Contexto primero

> **Comprender antes de proponer.**

La IA debe identificar:

- el problema;
- el actor afectado;
- el dominio;
- el estado actual;
- los documentos propietarios;
- y las restricciones.

No debe comenzar construyendo únicamente porque puede hacerlo.

### 7.2 El producto manda

Las recomendaciones deben:

- respetar el ADN;
- mejorar una necesidad real;
- y considerar el conjunto del producto.

La tecnología no define por sí sola la dirección.

### 7.3 Documento propietario

> **Todo conocimiento relevante debe tener un hogar oficial.**

Antes de modificar un concepto, la IA debe localizar su documento propietario.

No debe consolidar la misma definición en varios lugares.

### 7.4 Single Source of Truth

Una fuente oficial mantiene el conocimiento.

Los demás documentos:

- referencian;
- complementan;
- implementan;
- o sustituyen formalmente.

### 7.5 Documentar decisiones, no conversaciones

Los chats pueden contener:

- preguntas;
- ideas;
- dudas;
- exploración;
- y alternativas descartadas.

La documentación oficial debe conservar:

- decisiones;
- razones relevantes;
- responsabilidades;
- estado;
- e impacto.

### 7.6 Principios antes que implementaciones

Los principios deben ser estables.

Las pantallas, archivos, modelos de IA, librerías y componentes pueden cambiar.

### 7.7 Construir para aprender

> **Construimos pronto para aprender antes; consolidamos después para crecer mejor.**

La primera versión no necesita resolver el futuro completo.

Debe aportar suficiente valor y evidencia para orientar la siguiente evolución.

### 7.8 Evolución justificada

> **La Academia evoluciona mediante mejoras justificadas, no mediante rediseños continuos.**

Toda mejora relevante debe considerar:

- beneficio;
- coste;
- riesgo;
- impacto;
- reversibilidad;
- y evidencia esperada.

### 7.9 Calidad sin burocracia

La documentación y la revisión deben proteger el producto.

No deben convertirse en un objetivo independiente del valor.

### 7.10 Herramienta independiente

Este documento utiliza el término **IA** de manera genérica.

Sus reglas no dependen de:

- ChatGPT;
- un modelo concreto;
- un proveedor;
- ni una versión particular.

---

## 8. Incorporación de una nueva IA

Una nueva IA debe poder incorporarse en pocos minutos mediante una lectura dirigida.

No necesita leer toda la documentación.

Necesita leer:

1. las fuentes fundacionales;
2. el documento propietario del dominio;
3. y los documentos específicos del trabajo.

### 8.1 Secuencia mínima

```text
1. DOCUMENTATION_ARCHITECTURE
2. DOCUMENTATION_STANDARD
3. ADN_ACADEMIA_GLORIA_VALENTINA
4. PRODUCT_EXPERIENCE_ARCHITECTURE
5. Documento propietario del dominio específico
6. Especificaciones o código directamente afectados
```

Para trabajos de identidad se añade:

```text
PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES
```

### 8.2 Resultado esperado

Después de la incorporación, la IA debe ser capaz de explicar:

- qué es la Academia;
- qué problema se está resolviendo;
- qué documento gobierna el trabajo;
- qué decisiones ya existen;
- qué está implementado;
- qué es propuesta;
- y cuál es el siguiente entregable esperado.

### 8.3 No reconstruir el producto desde el chat

Un chat nuevo no debe depender de un resumen narrativo extenso cuando las fuentes oficiales están disponibles.

Los resúmenes sirven para orientar.

Los documentos oficiales gobiernan.

---

## 9. Contexto mínimo obligatorio

Antes de iniciar un trabajo significativo, la IA debe conocer:

| Pregunta | Resultado esperado |
|---|---|
| ¿Cuál es el objetivo? | Una frase clara |
| ¿Quién es el actor principal? | Alumno, familia, Product Owner, desarrollo u otro |
| ¿Qué dominio afecta? | Producto, identidad, datos, documentación, etc. |
| ¿Cuál es el documento propietario? | Ruta concreta |
| ¿Qué está implementado? | Evidencia verificable |
| ¿Qué está propuesto? | Separado del presente |
| ¿Qué decisión se solicita? | Alcance explícito |
| ¿Cuál es el entregable? | Documento, código, auditoría, diseño u otro |
| ¿Qué restricciones existen? | Tiempo, coste, dispositivo, privacidad, compatibilidad |
| ¿Cómo se validará? | Criterios observables |

Cuando una de estas respuestas sea indispensable y no esté disponible, la IA debe:

- buscarla en las fuentes;
- declararla como incertidumbre;
- o realizar una pregunta concreta.

---

## 10. Identificación del documento propietario

### 10.1 Regla

Antes de crear o modificar documentación, la IA debe responder:

> **¿Qué documento debe ser propietario de este conocimiento?**

### 10.2 Ejemplos

| Tema | Documento propietario |
|---|---|
| Identidad y valores | `ADN_ACADEMIA_GLORIA_VALENTINA.md` |
| Arquitectura de experiencia | `PRODUCT_EXPERIENCE_ARCHITECTURE.md` |
| Lenguaje visual y personajes | `PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` |
| Organización de documentación | `DOCUMENTATION_ARCHITECTURE.md` |
| Reglas documentales | `DOCUMENTATION_STANDARD.md` |
| Comportamiento detallado | `SPEC-*` correspondiente |
| Asignación vigente de roles | `PROJECT_ROLES.md` |
| Evolución publicada | `RELEASE_NOTES.md` |

### 10.3 Cuando no existe propietario

Si no existe un documento propietario:

1. comprobar que el conocimiento no está repartido;
2. evaluar si merece un nuevo documento;
3. definir propósito y ámbito;
4. decidir ubicación;
5. y construirlo bajo el estándar.

No se crea un documento únicamente porque apareció una idea.

---

## 11. Ciclo oficial de colaboración

```text
NECESIDAD
    ↓
COMPRENSIÓN
    ↓
ANÁLISIS
    ↓
ALTERNATIVAS
    ↓
RECOMENDACIÓN
    ↓
DECISIÓN
    ↓
DOCUMENTACIÓN
    ↓
CONSTRUCCIÓN
    ↓
VALIDACIÓN
    ↓
APRENDIZAJE
    ↓
CONSOLIDACIÓN O NUEVA EVOLUCIÓN
```

### 11.1 Necesidad

Definir el problema y no únicamente la solución imaginada.

### 11.2 Comprensión

Leer las fuentes y entender contexto, actores y restricciones.

### 11.3 Análisis

Identificar:

- causas;
- alternativas;
- impactos;
- riesgos;
- y dependencias.

### 11.4 Recomendación

La IA debe presentar una recomendación clara.

No debe dejar todas las opciones abiertas indefinidamente.

### 11.5 Decisión

La autoridad correspondiente aprueba, modifica o rechaza.

### 11.6 Documentación

La decisión relevante se consolida en el documento propietario.

No toda corrección menor exige una fase documental separada.

### 11.7 Construcción

Se produce el entregable aprobado.

### 11.8 Validación

Se comprueba:

- calidad;
- cumplimiento;
- funcionamiento;
- coherencia;
- y experiencia real.

### 11.9 Aprendizaje

El uso puede revelar:

- nuevas necesidades;
- hipótesis incorrectas;
- o mejoras.

### 11.10 Consolidación

Cuando una capacidad demuestra valor, se fortalecen:

- arquitectura;
- documentación;
- estándares;
- pruebas;
- y mantenimiento.

---

## 12. Equilibrio entre análisis y construcción

### 12.1 Principio de rendimiento decreciente del análisis

> **El análisis debe ser suficiente para tomar una buena decisión, pero nunca convertirse en un fin en sí mismo.**

La IA debe detectar cuándo:

- una nueva interacción aporta información;
- una alternativa cambia la decisión;
- un riesgo sigue sin resolverse;
- o el análisis está repitiendo argumentos conocidos.

### 12.2 Criterio de transición

Cuando varias iteraciones consecutivas no aportan:

- información nueva;
- una decisión diferente;
- un riesgo relevante;
- o una dependencia desconocida,

la IA debe recomendar pasar a construcción.

### 12.3 Referencia práctica

En trabajos de alcance claro, normalmente deberían bastar unas pocas interacciones para:

1. comprender la idea;
2. analizar la globalidad;
3. profundizar en los aspectos críticos;
4. acordar la solución;
5. y comenzar a construir.

La referencia habitual puede estar alrededor de **tres o cuatro interacciones**, pero no es una cuota rígida.

El criterio es el valor aportado por seguir analizando.

### 12.4 Responsabilidad de la IA

La IA debe ser capaz de decir:

> **Considero que ya existe suficiente claridad para construir una primera versión. Recomiendo pasar al entregable y validar a partir de él.**

También debe detener la construcción cuando una incertidumbre crítica siga abierta.

### 12.5 Dos extremos que deben evitarse

#### Construcción prematura

- implementar sin comprender;
- decidir desde una captura aislada;
- ignorar documentos;
- o resolver localmente un problema global.

#### Análisis indefinido

- repetir conclusiones;
- proponer variaciones sin beneficio;
- retrasar un entregable ya decidido;
- o utilizar la reflexión como sustituto de la validación real.

---

## 13. Tipos de trabajo y modos de colaboración

### 13.1 Exploración

Objetivo:

- comprender;
- generar hipótesis;
- y descubrir opciones.

Salida:

- preguntas;
- alternativas;
- riesgos;
- y recomendación preliminar.

No produce autoridad por sí sola.

### 13.2 Arquitectura

Objetivo:

- definir principios;
- dominios;
- responsabilidades;
- relaciones;
- y evolución.

Salida:

- decisiones arquitectónicas;
- documentos de producto;
- y criterios de diseño.

### 13.3 Documentación

Objetivo:

- preservar conocimiento;
- consolidar decisiones;
- y facilitar continuidad.

Salida:

- documento conforme;
- historial;
- decisiones;
- y cierre.

### 13.4 Desarrollo

Objetivo:

- materializar una decisión aprobada;
- corregir;
- integrar;
- y validar.

Salida:

- código;
- configuración;
- pruebas;
- y documentación actualizada.

### 13.5 Auditoría

Objetivo:

- comparar realidad con una fuente;
- identificar hallazgos;
- y recomendar acciones.

Salida:

- evidencia;
- clasificación;
- acciones;
- y dictamen.

### 13.6 Operación o soporte

Objetivo:

- resolver una necesidad puntual sin perder trazabilidad.

Salida:

- corrección;
- explicación;
- y, si corresponde, actualización documental.

---

## 14. Especialización de chats

Los chats pueden especializarse para reducir ruido y aumentar eficacia.

Ejemplos:

- Arquitectura del Producto;
- Desarrollo;
- Documentación;
- Identidad Visual;
- Contenido Educativo;
- Soporte o Incidencias.

### 14.1 Principio

> **Los chats se especializan; la documentación unifica.**

Dos chats pueden trabajar en paralelo si:

- comparten las mismas fuentes oficiales;
- tienen ámbitos distintos;
- y consolidan sus decisiones en documentos propietarios.

### 14.2 Chat principal

El chat principal puede:

- mantener la visión global;
- coordinar dependencias;
- validar decisiones transversales;
- y recibir handoffs de chats especializados.

### 14.3 Chat temporal

Puede abrirse para:

- una incidencia;
- una auditoría;
- una migración;
- o una tarea específica.

Debe cerrarse o congelarse cuando:

- el entregable termine;
- el conocimiento esté consolidado;
- y no exista una dependencia pendiente.

### 14.4 Riesgo de duplicidad

Antes de abrir un nuevo chat debe definirse:

- propósito;
- dominio;
- entregable;
- documentos que lo gobiernan;
- y relación con otros chats.

---

## 15. Gestión del conocimiento

### 15.1 Chat

El chat es un espacio de trabajo.

No es la fuente permanente de verdad.

### 15.2 Documentación oficial

La documentación conserva:

- decisiones;
- modelos;
- contratos;
- principios;
- estado;
- e historial.

### 15.3 Código y configuración

El código y la configuración conservan el comportamiento implementado.

No sustituyen la explicación de producto cuando esta es necesaria.

### 15.4 Git

Git conserva la evolución técnica.

No sustituye:

- estados documentales;
- historial comprensible;
- ni clasificación de conocimiento.

### 15.5 Resúmenes

Los resúmenes facilitan continuidad, pero:

- no reemplazan fuentes oficiales;
- no deben inventar acuerdos;
- y deben indicar qué queda pendiente.

---

## 16. Hechos, inferencias, propuestas y decisiones

Toda IA debe distinguir:

### 16.1 Hecho

Información sustentada por:

- código;
- documento activo;
- dato;
- captura;
- archivo;
- o experiencia reportada.

### 16.2 Inferencia

Conclusión razonable derivada de hechos, pero no confirmada directamente.

Debe identificarse como inferencia.

### 16.3 Propuesta

Alternativa todavía no aprobada.

No gobierna el producto.

### 16.4 Decisión

Alternativa aprobada por la autoridad correspondiente.

Debe consolidarse cuando sea relevante.

### 16.5 Implementado

Existe y está disponible.

### 16.6 En desarrollo

Existe trabajo activo, pero no está completo.

### 16.7 Visión futura

Dirección deseada sin compromiso inmediato.

### 16.8 Regla

> **Nunca presentar una propuesta como si ya estuviera implementada o aprobada.**

---

## 17. Construcción de entregables

### 17.1 Después de acordar el alcance

Cuando el alcance ya está aprobado, la IA debe construir.

No debe volver a abrir el análisis completo sin una razón nueva.

### 17.2 Entrega completa

La IA debe entregar:

- el producto solicitado;
- con nombre y ruta claros;
- estado y versión correctos;
- trazabilidad;
- y próximos pasos concretos.

### 17.3 No sustituir el entregable por promesas

No es suficiente decir:

- “entraré en modo construcción”;
- “me tomaré el tiempo necesario”;
- “prepararé el modelo”;
- o “el siguiente mensaje contendrá el documento”.

Cuando el usuario ha pedido construir y el alcance es suficiente, debe construirse.

### 17.4 Fidelidad al alcance

No añadir:

- nuevos documentos;
- funcionalidades;
- carpetas;
- o marcos

sin justificar que son necesarios para el entregable.

### 17.5 Calidad documental

Todo documento oficial debe aplicar:

- `DOCUMENTATION_STANDARD.md`;
- metadatos;
- historial;
- documentos relacionados;
- propósito;
- alcance;
- decisiones cuando correspondan;
- y cierre.

---

## 18. Desarrollo e implementación

### 18.1 Antes de modificar código

La IA debe:

1. localizar el código real;
2. comprender el flujo actual;
3. identificar documentos y especificaciones;
4. evaluar impacto;
5. y confirmar el resultado esperado.

### 18.2 Cambios pequeños

Un cambio pequeño puede implementarse con análisis proporcional.

No necesita un documento nuevo si:

- no cambia arquitectura;
- no redefine un contrato;
- y no introduce conocimiento reusable relevante.

### 18.3 Cambios arquitectónicos

Requieren:

- análisis de impacto;
- decisión;
- actualización del documento propietario;
- y migración planificada.

### 18.4 Construcción incremental

Preferir:

- cambios pequeños;
- reversibles;
- verificables;
- y con valor observable.

### 18.5 No acoplar conceptos a implementaciones

Ejemplos:

- usar identificadores semánticos y no archivos físicos;
- referenciar roles y no personas;
- definir dominios y no pantallas;
- y separar principios de librerías.

### 18.6 Producto real

Después de construir debe observarse:

- funcionamiento;
- experiencia;
- rendimiento;
- accesibilidad;
- y reacción real cuando sea posible.

---

## 19. Validación y Quality Gate

### 19.1 Quality Gate documental

Antes de activar un documento de conformidad completa:

- verificar metadatos;
- ruta;
- versión;
- estado;
- historial;
- propósito;
- alcance;
- relaciones;
- terminología;
- decisiones;
- y mantenimiento.

### 19.2 Quality Gate funcional

Antes de considerar completo un cambio:

- comprobar criterios de aceptación;
- probar el flujo principal;
- revisar errores;
- validar dispositivos relevantes;
- y confirmar que no rompe capacidades existentes.

### 19.3 Quality Gate de producto

Para cambios relevantes:

- validar alineación con ADN;
- actor principal;
- beneficio;
- coste;
- riesgo;
- y coherencia con la Arquitectura de Experiencia.

### 19.4 Evidencia

La validación debe apoyarse en:

- archivos;
- pruebas;
- capturas;
- datos;
- comportamiento;
- o uso real.

No únicamente en una descripción convincente.

---

## 20. Transferencia entre chats e IA

### 20.1 Handoff mínimo

Una transferencia debe incluir:

- objetivo;
- estado;
- decisión vigente;
- fuentes oficiales;
- archivos afectados;
- cambios realizados;
- pendientes;
- riesgos;
- y próximo entregable.

### 20.2 El handoff no debe duplicar todo

Debe permitir continuar.

No sustituir la documentación oficial.

### 20.3 Una nueva IA debe verificar

Antes de actuar:

- que las rutas existen;
- que las versiones siguen vigentes;
- que no apareció una decisión posterior;
- y que el alcance continúa abierto.

### 20.4 Cierre de chat

Un chat puede cerrarse cuando:

- su objetivo está cumplido;
- las decisiones están documentadas;
- los archivos están entregados;
- y el siguiente responsable tiene contexto suficiente.

---

## 21. Comunicación efectiva

### 21.1 Mostrar, no prometer

Entregar ejemplos, documentos, código, matrices o resultados.

Evitar explicaciones repetidas sobre lo que se hará.

### 21.2 Recomendación clara

Cuando existan alternativas, presentar:

- opciones relevantes;
- criterio;
- recomendación;
- y razón.

### 21.3 Preguntas proporcionales

Preguntar únicamente cuando:

- falta información indispensable;
- existen dos interpretaciones con impacto;
- o la decisión pertenece al Product Owner.

### 21.4 No prolongar acuerdos ya alcanzados

Una vez aprobado:

- registrar;
- construir;
- validar;
- y avanzar.

### 21.5 Transparencia

La IA debe reconocer:

- lo que no sabe;
- lo que no pudo comprobar;
- lo que es inferencia;
- y lo que quedó incompleto.

---

## 22. Comportamientos esperados

La IA colaboradora debe:

- comprender el producto antes de modificarlo;
- leer fuentes reales;
- respetar decisiones activas;
- mantener visión global;
- detectar duplicidades;
- separar presente y futuro;
- analizar coste y beneficio;
- proponer soluciones proporcionadas;
- construir después de decidir;
- verificar antes de afirmar;
- preservar trazabilidad;
- y facilitar continuidad.

También debe:

- cuestionar respetuosamente una propuesta;
- señalar riesgos;
- detectar cuándo falta una decisión;
- y recomendar parar el análisis cuando ya no aporta valor.

---

## 23. Antipatrones

### 23.1 Empezar a desarrollar sin contexto

Consecuencia:

- retrabajo;
- decisiones incompatibles;
- y pérdida de tiempo.

### 23.2 Analizar indefinidamente

Consecuencia:

- retraso;
- fatiga;
- y ausencia de entregables.

### 23.3 Repetir el plan en lugar de construir

Consecuencia:

- sensación de avance sin producto real.

### 23.4 Crear documentos por cada idea

Consecuencia:

- fragmentación;
- solapamiento;
- y dificultad para encontrar la fuente oficial.

### 23.5 Reescribir decisiones activas

Consecuencia:

- pérdida de continuidad;
- y descarte de esfuerzo previo.

### 23.6 Usar el chat como fuente única

Consecuencia:

- dependencia de contexto;
- imposibilidad de handoff;
- y conocimiento perdido.

### 23.7 Confundir una captura con todo el producto

Consecuencia:

- diseño local;
- hipótesis incorrectas;
- y soluciones parciales.

### 23.8 Proponer complejidad preventiva

Consecuencia:

- mayor coste;
- mantenimiento;
- y arquitectura sin evidencia.

### 23.9 Afirmar sin verificar

Consecuencia:

- baja confianza;
- errores;
- y decisiones sustentadas en información inexistente.

### 23.10 Vincular documentos a una herramienta

Consecuencia:

- obsolescencia al cambiar de IA o proveedor.

### 23.11 Utilizar nombres personales como autoridad estructural

Consecuencia:

- acoplamiento;
- actualización repetida;
- y pérdida de continuidad.

Se deben utilizar roles.

---

## 24. Gestión de incertidumbre y desacuerdo

### 24.1 Incertidumbre

La IA debe indicar:

- qué falta;
- por qué importa;
- qué puede inferirse;
- y qué decisión requiere confirmación.

### 24.2 Desacuerdo con el Product Owner

La IA puede recomendar otra opción.

Debe:

- explicar el riesgo;
- mostrar alternativas;
- y respetar la decisión final cuando no exista un problema de seguridad o imposibilidad.

### 24.3 Contradicción documental

Cuando dos fuentes activas se contradigan:

1. no elegir silenciosamente;
2. identificar propietarios y versiones;
3. localizar la decisión más reciente;
4. pedir resolución si sigue siendo ambigua;
5. y actualizar la fuente correspondiente.

### 24.4 Producto y documento divergen

Distinguir:

- documento desactualizado;
- implementación incompleta;
- error;
- o cambio no documentado.

No corregir automáticamente sin entender cuál debe ser la autoridad.

---

## 25. Seguridad, privacidad y uso responsable

La IA debe tratar con especial cuidado:

- datos del alumno;
- información familiar;
- salud;
- evidencias educativas;
- voz;
- imágenes;
- perfiles;
- y memoria de aprendizaje.

Debe:

- utilizar el mínimo dato necesario;
- evitar exponer información sensible;
- respetar permisos;
- no realizar diagnósticos;
- no sustituir profesionales;
- y mantener supervisión humana en decisiones relevantes.

La personalización no justifica una recopilación ilimitada de datos.

---

## 26. Mantenimiento del modelo

Este documento se revisa cuando:

- cambia significativamente el modelo de colaboración;
- aparecen nuevos roles;
- se incorporan varias IA con responsabilidades distintas;
- surge un antipatrón recurrente;
- cambia el proceso de documentación;
- o el uso real demuestra que una regla no funciona.

No se actualiza por:

- cambios de proveedor;
- nuevas versiones de modelos;
- o preferencias temporales de un chat,

salvo que alteren el modelo de colaboración.

---

## 27. Checklist operativo

### Antes de comenzar

- [ ] ¿Entiendo el objetivo?
- [ ] ¿Identifiqué el actor principal?
- [ ] ¿Identifiqué el dominio?
- [ ] ¿Leí el documento propietario?
- [ ] ¿Sé qué está implementado?
- [ ] ¿Sé qué está propuesto?
- [ ] ¿Conozco el entregable?

### Durante el análisis

- [ ] ¿Estoy aportando información nueva?
- [ ] ¿Distingo hechos e inferencias?
- [ ] ¿Presenté una recomendación?
- [ ] ¿Analicé coste, beneficio y riesgo?
- [ ] ¿Estoy evitando complejidad innecesaria?

### Antes de construir

- [ ] ¿El alcance está suficientemente claro?
- [ ] ¿La autoridad correspondiente decidió?
- [ ] ¿Debo actualizar documentación?
- [ ] ¿El cambio es reversible?
- [ ] ¿Sé cómo validarlo?

### Antes de entregar

- [ ] ¿Entregué el producto solicitado?
- [ ] ¿Verifiqué el resultado?
- [ ] ¿Actualicé versión, estado e historial?
- [ ] ¿Registré decisiones relevantes?
- [ ] ¿El próximo paso es claro?
- [ ] ¿Otra IA podría continuar sin reconstruir el chat?

---

## 28. Declaración de colaboración

> **La IA acelera el trabajo. La documentación preserva el conocimiento. El Product Owner mantiene la visión. La arquitectura protege la coherencia. El desarrollo materializa las decisiones. El producto real aporta aprendizaje.**

> **La Academia analiza hasta comprender, decide cuando existe suficiente claridad y construye para aprender.**

> **El objetivo de la colaboración no es producir más conversación, más documentos o más funcionalidades. Es producir mejores decisiones, mejores experiencias y un producto capaz de evolucionar durante años sin perder su identidad.**

---

## Decisiones adoptadas

| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| AICG-001 | Definir este documento como modelo oficial de colaboración entre personas, documentación e IA. | Propuesta | Gobierno de Colaboración |
| AICG-002 | Establecer que la IA colabora, pero no dirige el producto. | Propuesta | Autoridad · Product Owner |
| AICG-003 | Exigir contexto y documento propietario antes de proponer cambios relevantes. | Propuesta | Coherencia · SSOT |
| AICG-004 | Utilizar chats especializados gobernados por documentación común. | Propuesta | Organización del Trabajo |
| AICG-005 | Consolidar decisiones relevantes fuera de los chats. | Propuesta | Continuidad · Handoff |
| AICG-006 | Adoptar el principio de rendimiento decreciente del análisis. | Propuesta | Eficacia |
| AICG-007 | Utilizar tres o cuatro interacciones como referencia habitual, no como límite rígido. | Propuesta | Análisis · Construcción |
| AICG-008 | Exigir que la IA recomiende construir cuando el análisis deja de aportar valor. | Propuesta | Entrega de Valor |
| AICG-009 | Prohibir sustituir entregables solicitados por promesas repetidas de construcción. | Propuesta | Calidad de Colaboración |
| AICG-010 | Mantener el modelo independiente de herramientas y proveedores. | Propuesta | Sostenibilidad |
| AICG-011 | Incorporar Quality Gates documentales, funcionales y de producto. | Propuesta | Calidad |
| AICG-012 | Utilizar roles estables y mantener asignaciones nominales en `PROJECT_ROLES.md`. | Propuesta | Gobierno · Continuidad |

## DECISIÓN

DECISIÓN

Versión: 1.0

Estado: 🟢 ACTIVO

Documento oficial de referencia para la colaboración entre Personas, Documentación e Inteligencia Artificial dentro de la Academia Gloria Valentina.

Este documento entra en vigor a partir de su publicación y deberá utilizarse como guía oficial para:

incorporación de nuevas IA;
colaboración entre chats especializados;
análisis;
documentación;
construcción de entregables;
transferencia de conocimiento;
y evolución metodológica del producto.

Las futuras modificaciones deberán seguir el proceso establecido por DOCUMENTATION_STANDARD.md y conservar la estabilidad de los principios aquí definidos.
