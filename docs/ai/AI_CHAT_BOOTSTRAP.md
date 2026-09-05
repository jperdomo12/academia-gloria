# AI Chat Bootstrap
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/ai/AI_CHAT_BOOTSTRAP.md` |
| **Versión** | 1.4 |
| **Estado** | Activo |
| **Fecha** | 04/08/2026 |
| **Última actualización** | 05/09/2026 |
| **Propietario** | Gobierno de Colaboración con IA |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Incorporación rápida y controlada de una nueva IA a cualquier área de trabajo de la Academia Gloria Valentina |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** define dónde vive cada conocimiento, su propietario y su ciclo de vida. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** estructura, trazabilidad, versionado y Quality Gate documental. |
| `docs/README.md` | **Orienta:** punto de entrada y mapa operativo de documentación oficial. |
| `docs/FOUNDATION.md` | **Gobierna:** origen, propósito, identidad y principios fundacionales. |
| `docs/ai/AI_COLLABORATION_GUIDE.md` | **Gobierna:** colaboración entre personas, documentación e IA. |
| `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` | **Complementa:** punto operativo reciente y continuidad entre chats. |
| `docs/project/ROADMAP.md` | **Complementa:** prioridades y fase operativa actual. |
| `docs/project/PROJECT_ROLES.md` | **Gobierna:** roles, autoridad y colaboración. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Complementa:** ciclo operativo de cambios de producto. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Complementa:** arquitectura conceptual de experiencia. |
| `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` | **Complementa:** identidad visual, emocional y Personajes Oficiales. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna:** incorporación de nuevos Temas académicos desde material escolar real. |
| `docs/models/` | **Modela:** modelos conceptuales oficiales. |
| `docs/specifications/` | **Especifica:** comportamiento funcional verificable. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.4 | 05/09/2026 | Product Owner + AI Collaborator | Declara y destaca al inicio el **📋 PROMPT RÁPIDO · NUEVO CHAT** como única copia oficial para iniciar una nueva conversación cuando GitHub está conectado. Evita crear archivos paralelos de prompts y mantiene HandOff + Bootstrap + fuentes propietarias como mecanismo de recuperación de contexto. |
| 1.3 | 05/09/2026 | Product Owner + AI Collaborator | Añade arranque preferido de nuevos chats directamente desde GitHub `main`, formaliza el modo curricular de 6.º como carril operativo activo durante la fase de uso prioritario, obliga a cargar `STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` para ese tipo de trabajo, incorpora la regla de seis bloqueos materiales como únicos motivos normales de interrupción y deja explícito que issues reales del uso deben reportarse/verificarse/resolverse con rapidez. |
| 1.2 | 03/09/2026 | Product Owner + AI Collaborator | Vinculó el bootstrap con la plantilla viva oficial de HandOff y formalizó el procedimiento preferido para continuar un chat existente: último HandOff + instrucción breve + verificación dirigida. |
| 1.1 | 13/08/2026 | Product Owner + AI Collaborator | Incorporó un texto reutilizable para iniciar nuevos chats y alineó el onboarding con las fuentes oficiales. |
| 1.0 | 04/08/2026 | Product Owner + AI Collaborator | Primera versión oficial del protocolo de incorporación de una nueva IA. |

---

# 📋 PROMPT RÁPIDO · NUEVO CHAT

> **Esta es la única copia oficial del prompt de inicio.** No crear `PROMPT.txt`, `NUEVO_CHAT.md` ni otra copia paralela. Si el texto necesita evolucionar, se actualiza aquí.

### ✅ Prompt oficial · cuando GitHub está conectado

**Copiar y pegar en un chat nuevo:**

```text
Continuamos el proyecto Academia Gloria Valentina.

Revisa en el repositorio jperdomo12/academia-gloria, rama main:
1. el último `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md`;
2. este `docs/ai/AI_CHAT_BOOTSTRAP.md`;
3. las fuentes propietarias necesarias antes de actuar.

No reconstruyas conversaciones anteriores y no me pidas contexto que ya esté
consolidado en documentación, código o repositorio.

La Academia se encuentra en fase de uso prioritario: durante varias semanas
priorizamos usar muy bien lo existente, que Gloria lo use de manera motivada y
que sea de ayuda efectiva. El crecimiento funcional general queda en espera por
foco de uso, pero siguen activos:
- la incorporación rápida de Temas reales de 6.º a partir del material del colegio;
- el reporte, verificación y resolución rápida de issues reales que aparezcan con el uso.

Si el trabajo es curricular de 6.º, aplica obligatoriamente
`docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`
y todos los estándares relacionados que correspondan.

En incorporación curricular, pregunta solo si falta información que pueda cambiar
materialmente:
- qué debe aprender Gloria;
- el procedimiento exigido por el colegio;
- el nivel de dificultad;
- cómo la van a evaluar;
- una respuesta que deba coincidir exactamente con el material;
- o una decisión arquitectónica nueva no resuelta.

Al comenzar, indícame brevemente que revisaste el contexto y que estás listo.
```

Con GitHub conectado, este texto debe ser suficiente para recuperar el contexto operativo sin adjuntar manualmente el HandOff.

## 🚀 Otras formas de iniciar un nuevo chat

### Opción B · Continuar con HandOff adjunto

Si el nuevo chat no puede consultar GitHub, adjuntar el último HandOff y escribir:

```text
Continuamos Academia Gloria Valentina de acuerdo con el HandOff adjunto.
Revísalo, aplica las fuentes oficiales que correspondan y dime si estás listo para continuar.
No me pidas información que ya esté consolidada en el HandOff o en los documentos proporcionados.
```

### Opción C · Incorporación general sin HandOff reciente

```text
Actúa como AI Collaborator de la Academia Gloria Valentina.

Este chat continúa trabajo sobre un producto ya existente.
No reconstruyas el proyecto desde cero y no asumas que una conversación anterior
es fuente de verdad.

Antes de proponer o modificar:
1. Revisa README.md.
2. Revisa docs/README.md.
3. Revisa docs/FOUNDATION.md.
4. Revisa docs/DOCUMENTATION_ARCHITECTURE.md.
5. Revisa docs/DOCUMENTATION_STANDARD.md.
6. Revisa docs/ai/AI_COLLABORATION_GUIDE.md.
7. Identifica el documento propietario del dominio.
8. Revisa código, archivos y documentación directamente afectados.

Distingue siempre entre Hecho, Inferencia, Propuesta, Decisión e Implementado.
Reutiliza antes de crear.
No presentes visión futura como implementada.
Cuando exista claridad suficiente y yo indique “adelante”, construye sin reabrir
innecesariamente el análisis.

Al comenzar, indícame brevemente:
- qué fuentes revisaste;
- objetivo actual;
- documento propietario;
- estado implementado relevante;
- y dudas críticas, si existen.
```

---

## Índice

1. Propósito
2. Alcance
3. Resultado esperado
4. Principios del bootstrap
5. Estado operativo actual
6. Niveles de incorporación
7. Lectura mínima obligatoria
8. Identificación del trabajo
9. Reglas antes de construir
10. Reglas documentales
11. Reglas para entregables
12. Reglas según el tipo de chat
13. Confirmación de preparación
14. Prompt operativo de inicio
15. HandOff y cierre
16. Antipatrones
17. Mantenimiento
18. Decisiones adoptadas
19. Declaración de incorporación

---

## 1. Propósito

Permitir que una nueva IA pueda incorporarse a la Academia Gloria Valentina en pocos minutos y colaborar correctamente **sin depender del historial completo de conversaciones anteriores**.

Este documento no resume toda la arquitectura ni sustituye a `AI_COLLABORATION_GUIDE.md`.

Su función es ofrecer un protocolo breve y repetible para:

- localizar fuentes oficiales;
- recuperar el estado operativo actual;
- comprender el objetivo;
- identificar propietario documental;
- distinguir presente de futuro;
- saber cuándo preguntar;
- construir cuando existe claridad;
- y producir entregables coherentes con el producto.

---

## 2. Alcance

Puede utilizarse para iniciar chats de:

- desarrollo;
- arquitectura;
- documentación;
- auditoría;
- identidad visual;
- análisis funcional;
- contenido;
- incorporación curricular de 6.º;
- bugs/issues y observaciones;
- soporte;
- y otras áreas de colaboración con IA.

No contiene instrucciones específicas de un proveedor o modelo.

---

## 3. Resultado esperado

Después del bootstrap, la IA debe poder responder:

1. ¿Qué es la Academia Gloria Valentina?
2. ¿Cuál es el objetivo concreto del chat?
3. ¿Qué rol desempeña la IA?
4. ¿Qué documentos gobiernan el trabajo?
5. ¿Qué está implementado?
6. ¿Qué está propuesto o en espera?
7. ¿Cuál es el estado operativo actual?
8. ¿Qué entregable se espera?
9. ¿Qué restricciones existen?
10. ¿Cómo se validará?
11. ¿Existe claridad suficiente para comenzar?

El bootstrap está completado cuando la IA puede colaborar sin reconstruir meses de conversaciones ni reinventar decisiones existentes.

---

## 4. Principios del bootstrap

### 4.1 Contexto primero

> **Comprender antes de proponer o modificar.**

La IA empieza por fuentes oficiales, no por una solución imaginada.

### 4.2 Lectura dirigida

No es necesario leer toda la documentación.

Leer:

- HandOff reciente cuando exista;
- núcleo mínimo;
- documento propietario del dominio;
- especificaciones/estándares aplicables;
- código y archivos afectados.

### 4.3 Documento propietario

> **Una verdad importante, un propietario.**

Antes de crear o modificar conocimiento estable, identificar dónde vive oficialmente.

### 4.4 Construcción cuando existe claridad suficiente

El análisis debe conducir a decisión o producto.

Cuando nuevas interacciones ya no aportan información material, construir.

### 4.5 La documentación facilita; no bloquea

> **El producto es el objetivo. La documentación es un facilitador, nunca un bloqueador.**

La ausencia de documentación adicional no impide un cambio cuando el conocimiento existente es suficiente, el alcance está claro y el riesgo es proporcional.

### 4.6 Revisar antes de crear

Antes de crear un documento, componente o servicio nuevo:

- buscar lo existente;
- comprobar si un propietario actual puede evolucionar;
- evitar duplicidad;
- crear solo ante un vacío real.

### 4.7 Producto ejecutable

Un entregable termina cuando puede integrarse, ejecutarse, validarse y aportar valor.

### 4.8 Autoridad humana

El Product Owner mantiene dirección, prioridad, aceptación y decisión final.

---

## 5. Estado operativo actual

Desde el **05/09/2026**, la Academia está en **🌿 Fase de uso prioritario**.

Objetivo durante varias semanas:

```text
usar muy bien lo existente
+ Gloria motivada
+ ayuda efectiva
+ material real de 6.º incorporado rápidamente
+ issues reales resueltos
```

### 5.1 En espera por foco de uso

No priorizar por iniciativa propia:

- nuevas funcionalidades generales;
- mejoras visuales no motivadas por uso real;
- refactors preventivos;
- ampliaciones de motores;
- cambios generales de navegación/configuración.

### 5.2 Activo durante la fase

- incorporación curricular de Temas reales de 6.º;
- validación con uso real;
- resolución de bugs/issues observados;
- mantenimiento documental de continuidad.

No interpretar esta fase como una prohibición rígida de cambio.

---

## 6. Niveles de incorporación

### 6.1 Nivel 1 — Comprender el proyecto

Revisar:

- `README.md`;
- `docs/README.md`;
- `docs/FOUNDATION.md`;
- `docs/DOCUMENTATION_ARCHITECTURE.md`;
- `docs/DOCUMENTATION_STANDARD.md`;
- `docs/ai/AI_COLLABORATION_GUIDE.md`;
- `docs/project/PROJECT_ROLES.md`;
- y primero el último HandOff si se continúa trabajo reciente.

Resultado: comprender producto, documentación, colaboración y autoridad.

### 6.2 Nivel 2 — Comprender el dominio

Identificar y revisar:

- documento propietario;
- documentos complementarios;
- decisiones activas;
- estándares/especificaciones aplicables.

| Tema | Documento principal |
|---|---|
| Incorporación curricular de 6.º | `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` |
| Experiencia | `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` |
| Identidad visual/personajes | `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` |
| Desarrollo | `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` |
| Roles | `docs/project/PROJECT_ROLES.md` |
| Modelos conceptuales | `docs/models/` |
| Especificaciones funcionales | `docs/specifications/` |
| Documentación | `docs/DOCUMENTATION_STANDARD.md` |

### 6.3 Nivel 3 — Comprender la tarea

Antes de construir, conocer:

- objetivo;
- alcance;
- estado actual;
- archivos afectados;
- restricciones;
- criterios de aceptación;
- forma de validación.

No pedir al usuario datos que pueden resolverse desde fuentes disponibles.

---

## 7. Lectura mínima obligatoria

Secuencia general:

```text
0. HandOff reciente, cuando exista
1. README.md
2. docs/README.md
3. docs/FOUNDATION.md
4. docs/DOCUMENTATION_ARCHITECTURE.md
5. docs/DOCUMENTATION_STANDARD.md
6. docs/ai/AI_COLLABORATION_GUIDE.md
7. Documento propietario del dominio
8. Especificaciones/estándares/código afectados
```

Para desarrollo añadir:

`docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md`

Para identidad visual añadir:

`docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md`

Para **cualquier incorporación de Tema nuevo de 6.º** añadir obligatoriamente:

`docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`

La IA no debe afirmar que leyó una fuente que no tuvo disponible.

---

## 8. Identificación del trabajo

| Campo | Pregunta |
|---|---|
| **Objetivo** | ¿Qué resultado se busca? |
| **Tipo de trabajo** | ¿Desarrollo, contenido, issue, documentación, auditoría u otro? |
| **Actor principal** | ¿A quién afecta? |
| **Documento propietario** | ¿Qué fuente gobierna? |
| **Estado actual** | ¿Qué existe hoy? |
| **Entregable** | ¿Qué producto concreto se espera? |
| **Restricciones** | ¿Qué límites deben respetarse? |
| **Validación** | ¿Cómo sabremos que funciona? |

Cuando un campo indispensable no pueda resolverse leyendo las fuentes, hacer una pregunta concreta.

---

## 9. Reglas antes de construir

La IA debe:

1. localizar material/implementación real;
2. revisar documento propietario;
3. identificar decisiones existentes;
4. distinguir presente, propuesta y futuro;
5. revisar reutilización posible;
6. evaluar impacto;
7. confirmar entregable;
8. construir cuando exista claridad suficiente.

### 9.1 Pocas interacciones, mucho producto

No existe cuota rígida de preguntas.

Preguntar solo cuando una respuesta pueda cambiar una decisión material, resolver riesgo o aportar información no disponible.

### 9.2 Señal de construcción

Expresiones como `adelante`, `construye`, `a por ello`, `aprobado` o equivalentes deben mover el trabajo a la fase correspondiente cuando el alcance esté claro.

No responder con una nueva explicación del proceso en lugar del producto solicitado.

### 9.3 Incertidumbre crítica general

Detener construcción solo cuando:

- falta decisión imprescindible;
- existe riesgo significativo;
- hay dos interpretaciones incompatibles;
- no se dispone del material necesario.

### 9.4 Regla específica de no interrupción para 6.º

En incorporación curricular, una instrucción como:

```text
6.º · Lengua · Acentuación. Incorporar a la Academia.
```

+ material escolar debe considerarse suficiente.

Solo preguntar si falta información que pueda cambiar materialmente:

1. **qué debe aprender Gloria**;
2. **el procedimiento exigido por el colegio**;
3. **el nivel de dificultad**;
4. **cómo la van a evaluar**;
5. **una respuesta que deba coincidir exactamente con el material**;
6. **una decisión arquitectónica nueva no resuelta**.

No preguntar por rutas, archivos, estructura técnica, evidencias, Persona Activa, navegación, Vista previa, histórico, PR, merge ni decisiones ya gobernadas por fuentes vigentes.

---

## 10. Reglas documentales

### 10.1 Revisar lo existente

Antes de crear documentación:

- buscar propietario;
- revisar duplicidades;
- comprobar arquitectura documental;
- actualizar antes que crear cuando sea posible.

### 10.2 Construcción estructurada

Todo documento oficial debe nacer con la estructura aplicable de `DOCUMENTATION_STANDARD.md`, incluyendo metadatos e historial cuando corresponda.

### 10.3 Documentación proporcional

Una corrección pequeña no necesita un documento nuevo.

Actualizar documentación cuando el cambio:

- crea conocimiento reusable;
- modifica arquitectura;
- altera contrato;
- cambia decisión;
- o afecta una fuente oficial.

### 10.4 No bloquear

Cuando la documentación disponible permite construir con seguridad:

- construir;
- validar;
- consolidar después el conocimiento nuevo cuando corresponda.

---

## 11. Reglas para entregables

Los entregables deben ser:

- completos;
- verificables;
- listos para integrar;
- coherentes con arquitectura;
- proporcionales al alcance.

Cuando aplique, indicar:

- archivos/rutas;
- decisiones;
- validación;
- limitaciones;
- siguiente acción.

### 11.1 Archivos y código

Cuando se solicite un archivo o código real, entregar el artefacto real; no sustituirlo por una promesa.

### 11.2 Cambios existentes

Antes de modificar:

- revisar archivo real;
- comprender dependencias;
- preservar comportamiento no afectado;
- evitar reescrituras innecesarias.

### 11.3 Cierre

Al terminar, indicar brevemente qué se entregó, estado y siguiente acción.

---

## 12. Reglas según el tipo de chat

### 12.1 Chat de desarrollo

Priorizar archivos reales, cambios pequeños, reutilización, producto ejecutable, compatibilidad y pruebas.

Revisar `PRODUCT_DEVELOPMENT_WORKFLOW.md`.

### 12.2 Chat de documentación

Priorizar propietario, ausencia de duplicidades, historial, decisiones y entrega completa.

### 12.3 Chat de arquitectura

Priorizar visión global, alternativas, coste/beneficio, dependencias y evolución sostenible. No prolongar análisis sin rendimiento.

### 12.4 Chat de auditoría

Comparar evidencia con fuentes, clasificar hallazgos y emitir dictamen. No rediseñar salvo que el alcance lo incluya.

### 12.5 Chat de bugs / issues

Debe:

1. reproducir o verificar el problema;
2. identificar impacto y propietario;
3. revisar archivos reales;
4. aplicar/proponer corrección acotada;
5. validar;
6. facilitar cierre.

Durante la fase de uso prioritario, un issue real **no se pospone automáticamente**. Dar prioridad proporcional, especialmente si afecta aprendizaje, motivación, acceso, datos, Persona Activa, evidencia/progreso o uso escolar.

No convertir cada issue en una iniciativa arquitectónica.

### 12.6 Chat de identidad visual

Revisar propietario de identidad y assets reales. Evitar recursos nuevos si existe una solución vigente reutilizable.

### 12.7 Chat curricular de 6.º

Este es un modo operativo prioritario durante el curso 2026–2027.

Entrada ideal:

```text
material del colegio
+ “6.º · Materia · Tema. Incorporar a la Academia.”
+ notas opcionales
```

Obligatorio:

- aplicar `STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`;
- aplicar todos los estándares relacionados;
- analizar completamente el material en el alcance necesario;
- respetar la fuente escolar;
- reutilizar antes de crear;
- diseñar TEL-friendly sin bajar nivel ni infantilizar;
- generar evidencia académica estructurada según contrato vigente;
- integrar histórico/análisis/fortalecimiento cuando corresponda;
- validar rutas, Persona Activa, Vista previa, navegación y comportamiento;
- auditar diff;
- devolver como primera revisión familiar un Tema suficientemente completo.

Primera devolución esperada:

```text
YA PUEDES PROBAR
```

con ruta y únicamente los puntos útiles de validación.

Después de `Aprobado`:

```text
auditoría final
→ documentación aplicable
→ PR
→ revisión remota
→ merge a main
→ cierre
```

---

## 13. Confirmación de preparación

La IA debe poder confirmar internamente:

### Proyecto

- [ ] Comprendo propósito, documentación, colaboración y autoridad.

### Dominio

- [ ] Identifiqué propietario y fuentes aplicables.
- [ ] Distingo implementado, propuesta y futuro.

### Tarea

- [ ] Comprendo objetivo, alcance, restricciones, archivos y validación.

Para incorporación curricular:

- [ ] Revisé el estándar curricular.
- [ ] Tengo material + curso/materia/tema suficientes.
- [ ] No existe uno de los seis bloqueos materiales.

Resultado breve posible:

```text
BOOTSTRAP COMPLETADO
✓ Contexto comprendido
✓ Fuentes propietarias identificadas
✓ Estado operativo comprendido
✓ Listo para colaborar
```

No es necesario publicar checklist completo en cada conversación.

---

## 14. Prompt operativo de inicio

Cuando exista GitHub conectado, usar preferentemente el **📋 PROMPT RÁPIDO · NUEVO CHAT** al inicio de este documento.

Sin HandOff reciente, usar:

```text
Actúa como AI Collaborator de Academia Gloria Valentina.

Revisa fuentes oficiales, identifica propietario, verifica estado real y comprende
objetivo/alcance antes de modificar.
Reutiliza antes de crear.
Distingue Hecho, Inferencia, Propuesta, Decisión e Implementado.
No pidas información ya disponible.
Cuando exista claridad suficiente y yo solicite construir, entrega sin reabrir
innecesariamente el análisis.

Confirma brevemente fuentes revisadas, objetivo, propietario, estado relevante y
si existe alguna duda crítica.
```

---

## 15. HandOff y cierre

Fuente oficial de continuidad:

`docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md`

Un HandOff útil conserva:

- qué se cerró;
- qué está activo;
- estado operativo;
- decisiones recientes;
- rama/PR relevante;
- riesgos/advertencias;
- siguiente paso exacto.

No copia todo el chat ni toda la documentación.

Antes de actuar al retomar, contrastar cuando corresponda:

- `main`;
- rama/PR;
- documento propietario;
- código afectado;
- estado validado.

Si HandOff y repositorio discrepan, prevalece la fuente real verificada.

---

## 16. Antipatrones

Evitar:

- desarrollar sin contexto;
- reconstruir conversaciones pudiendo leer HandOff/repositorio;
- pedir información ya documentada;
- analizar indefinidamente;
- repetir plan en vez de construir;
- crear documento por cada idea;
- duplicar conocimiento;
- crear copias paralelas del prompt oficial;
- presentar futuro como implementado;
- crear complejidad preventiva;
- convertir bugs pequeños en rediseños;
- crear arquitectura paralela sin revisar lo existente;
- tratar la fase de uso prioritario como prohibición absoluta de corregir problemas;
- frenar incorporación curricular de 6.º con preguntas técnicas o administrativas ya resueltas.

---

## 17. Mantenimiento

Revisar este documento cuando:

- cambie conjunto mínimo de fuentes;
- cambie modelo de colaboración;
- cambie mecanismo de HandOff;
- cambie estado operativo del producto;
- cambie el prompt oficial de inicio;
- aparezcan antipatrones recurrentes;
- o deje de permitir incorporación rápida.

No actualizar solo porque cambie proveedor/modelo de IA.

---

## 18. Decisiones adoptadas

| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| ACB-001 | Definir un bootstrap único para cualquier área de soporte de IA. | Vigente | Incorporación · Reutilización |
| ACB-002 | Mantener el bootstrap basado en referencias, no duplicación. | Vigente | SSOT · Mantenibilidad |
| ACB-003 | Organizar incorporación en proyecto, dominio y tarea. | Vigente | Eficacia |
| ACB-004 | Identificar propietario antes de modificar conocimiento. | Vigente | Gobierno Documental |
| ACB-005 | La documentación facilita y no bloquea. | Vigente | Entrega de Valor |
| ACB-006 | Revisar documentación existente antes de crear otra. | Vigente | Duplicidades |
| ACB-007 | Documentos oficiales nacen conforme a `DOCUMENTATION_STANDARD.md`. | Vigente | Calidad |
| ACB-008 | Entregar productos completos y verificables. | Vigente | Calidad |
| ACB-009 | Interacciones necesarias y suficientes marcan transición a construcción. | Vigente | Eficacia |
| ACB-010 | Construir cuando Product Owner lo solicita y existe claridad suficiente. | Vigente | Colaboración |
| ACB-011 | Mantener prompt operativo reutilizable sin sustituir fuentes. | Vigente | Onboarding |
| ACB-012 | Bootstrap independiente de proveedor/modelo. | Vigente | Longevidad |
| ACB-013 | HandOff es mecanismo preferido de continuidad. | Vigente | Continuidad |
| ACB-014 | Con GitHub conectado, nuevo chat puede recuperar directamente HandOff + Bootstrap desde `main`. | Aprobada · 05/09/2026 | Continuidad · Menor intervención |
| ACB-015 | Chat curricular de 6.º debe cargar siempre el estándar curricular y aceptar material + materia + tema como entrada suficiente. | Aprobada · 05/09/2026 | Curso 2026–2027 · Velocidad |
| ACB-016 | En incorporación curricular solo se interrumpe ante los seis bloqueos materiales definidos. | Aprobada · 05/09/2026 | Menor intervención · Fidelidad |
| ACB-017 | Issues reales del uso se reportan, verifican y resuelven con rapidez proporcional a impacto. | Aprobada · 05/09/2026 | Calidad · Operación |
| ACB-018 | `AI_CHAT_BOOTSTRAP.md` conserva la única copia oficial del prompt rápido de nuevo chat; otras fuentes solo deben enlazarla. | Aprobada · 05/09/2026 | SSOT · Continuidad |

---

## 19. Declaración de incorporación

> **Una nueva IA no necesita reconstruir la historia completa de la Academia. Necesita acceder a las fuentes correctas, comprender la tarea y respetar el modelo de colaboración.**

> **La documentación orienta. El HandOff ubica el punto operativo. El repositorio verifica. El Product Owner mantiene la dirección. Y cuando existe claridad suficiente, se construye.**

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Aprobado |
| **Versión activa** | 1.4 |
| **Fecha de aprobación inicial** | 04/08/2026 |
| **Última actualización aprobada** | 05/09/2026 |
| **Aprobado por** | Product Owner |
| **Prompt oficial de nuevo chat** | `📋 PROMPT RÁPIDO · NUEVO CHAT` en este documento |
| **HandOff oficial** | `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` |
| **Modo operativo actual** | 🌿 Fase de uso prioritario |
| **Carril curricular 6.º** | 📚 Activo |
| **Issues reales** | 🛠️ Reportar y resolver con rapidez |
| **Sustituye** | — |
| **Sustituido por** | — |

**Impacto:** Incorporación de IA · Colaboración · Documentación · Desarrollo · Arquitectura · Continuidad · Curso 2026–2027