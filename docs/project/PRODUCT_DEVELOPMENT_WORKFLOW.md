# Product Development Workflow
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` |
| **Versión** | 1.1 |
| **Estado** | Activo |
| **Fecha** | 24/08/2026 |
| **Última actualización** | 24/08/2026 |
| **Propietario** | Gobierno del Desarrollo del Producto |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Ciclo operativo de recepción, implementación, validación, integración y aprendizaje de cambios en la Academia |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/ai/AI_COLLABORATION_GUIDE.md` | **Gobierna:** define cómo colaboran las personas, la documentación y la IA. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** establece la estructura, trazabilidad y Quality Gate documental. |
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** define dónde vive cada conocimiento y quién lo mantiene. |
| `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` | **Gobierna:** define la identidad y los principios que toda evolución debe respetar. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna:** define la arquitectura conceptual de la experiencia. |
| `docs/project/RELEASE_NOTES.md` | **Complementa:** registra las entregas y cambios relevantes del producto. |
| `docs/project/PROJECT_ROLES.md` | **Complementa:** identifica responsabilidades y autoridad. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 04/08/2026 | Product Owner + AI Collaborator | Primera versión oficial del flujo de desarrollo de la Academia Gloria Valentina. |
| 1.1 | 24/08/2026 | Product Owner + AI Collaborator | Incorpora control proporcional, las rutas de flujo corto y flujo controlado con Codex, análisis técnico opcional con Codex, ramas, Pull Request, revisión humana y protección de `main`. |

## Propósito

Definir el proceso operativo mediante el cual una necesidad, corrección o mejora se convierte en un cambio integrado, ejecutable, validado y disponible dentro de la Academia Gloria Valentina.

Este documento no enseña a utilizar Git, VS Code, Codex o una tecnología concreta. Define **cómo evoluciona un cambio dentro del producto** y cómo seleccionar controles adecuados a su impacto.

## Alcance

Aplica a HTML, CSS, JavaScript, imágenes, configuración, documentación y otros recursos incorporados al repositorio.

Quedan fuera de su alcance la arquitectura detallada de cada solución, las reglas funcionales específicas, la formación sobre herramientas y los procesos de despliegue masivo que todavía no existen.

## Estado actual del producto

La Academia continúa en **construcción activa y uso familiar controlado**.

- Gloria utiliza dinámicamente el producto y aporta evidencia real, observaciones y aprendizaje.
- La familia participa en la creación, el seguimiento y la validación de experiencias.
- Existen módulos funcionales, pero el producto todavía no ha sido liberado para uso general ni compartido con terceros.
- No existe todavía una operación masiva, una base amplia de usuarios ni uso intensivo.
- La evidencia obtenida con Gloria es valiosa, pero no constituye validación universal ni sustituye futuras pruebas de escalabilidad, diversidad de usuarios, seguridad operativa, rendimiento y soporte.

El objetivo actual es equilibrar **velocidad de aprendizaje, seguridad razonable y reversibilidad**. El workflow evita aplicar anticipadamente burocracia propia de un producto masivo cuando no aporta una reducción proporcional del riesgo.

> **El workflow actual está diseñado para una etapa de construcción activa y uso controlado. Deberá escalar cuando aumenten los usuarios, el riesgo, la complejidad técnica o las necesidades de operación.**

## Principios

### Control proporcional

> **El nivel de control del cambio debe ser proporcional a su impacto, riesgo y alcance técnico.**

**Codex no es obligatorio para todos los cambios.**

- Bajo impacto → flujo corto.
- Impacto técnico relevante → flujo controlado con Codex.
- Si existe duda técnica → Codex puede utilizarse únicamente para análisis antes de decidir la ruta de implementación.

### Cambios pequeños y verificables

Preferir cambios acotados, reversibles, fáciles de probar y con valor observable.

### Producto siempre ejecutable

> **Un entregable no termina cuando ha sido generado; termina cuando puede integrarse, ejecutarse, validarse y aportar valor.**

### Comprender antes de modificar

Antes de cambiar un archivo se debe entender qué función cumple, qué recursos utiliza y qué documento gobierna el comportamiento afectado.

### Construir para aprender

La primera versión puede ser suficiente para validar una idea sin intentar resolver todo el futuro.

### Decisión y aprobación humanas

La selección entre flujo corto y flujo controlado no se automatiza. ChatGPT / Arquitectura puede recomendar incorporar Codex cuando detecte riesgo o impacto técnico; el Product Owner mantiene la decisión final.

> **Codex prepara cambios; el Product Owner valida; `main` solo recibe cambios aprobados.**

Este principio aplica cuando Codex participa y no implica que deba participar siempre. Codex no tiene autorización para hacer merge directo a `main`.

## Workflow oficial: dos rutas operativas

Después de comprender la necesidad y su alcance, el Product Owner selecciona la ruta según el impacto, el riesgo y el alcance técnico. La ruta puede reevaluarse si durante el trabajo aparecen dependencias o riesgos no previstos.

## RUTA A — FLUJO CORTO

Es aplicable a cambios pequeños, localizados, fáciles de comprender, fácilmente reversibles, con dependencias conocidas y de bajo riesgo técnico. Puede ser la ruta normal durante la etapa actual del producto.

```text
NECESIDAD / OBSERVACIÓN
        ↓
COMPRENSIÓN Y ALCANCE
        ↓
CAMBIO LOCALIZADO
        ↓
VALIDACIÓN LOCAL PROPORCIONAL
VS CODE / LIVE SERVER CUANDO APLIQUE
        ↓
APROBACIÓN
        ↓
GITHUB DESKTOP
COMMIT + PUSH
        ↓
VERIFICACIÓN
        ↓
USO REAL CUANDO CORRESPONDA
```

La aprobación humana precede a la incorporación del cambio. Esta ruta no exige rama ni Pull Request cuando esos controles no aportan una reducción real del riesgo.

## RUTA B — FLUJO CONTROLADO CON CODEX

Se utiliza cuando existe alguno de estos factores:

- impacto transversal;
- varios archivos o módulos relacionados;
- dependencias difíciles de determinar;
- cambios en servicios compartidos;
- Firebase, Firestore o reglas;
- usuarios, identidad o accesos;
- navegación compartida;
- misiones, evidencias o datos;
- nueva funcionalidad relevante;
- refactor o arquitectura;
- o riesgo técnico suficiente para justificar aislamiento y revisión adicional.

```text
BASELINE main
        ↓
RAMA
        ↓
CODEX / DESARROLLO
        ↓
VALIDACIÓN TÉCNICA
        ↓
PULL REQUEST (PR)
        ↓
REVISIÓN DEL DIFF
        ↓
VALIDACIÓN LOCAL
        ↓
APROBACIÓN DEL PRODUCT OWNER
        ↓
MERGE A main
        ↓
FETCH / PULL
        ↓
VERIFICACIÓN
        ↓
ELIMINACIÓN DE LA RAMA
        ↓
USO REAL CUANDO CORRESPONDA
```

> **CREAR PR ≠ MERGE.**

La PR presenta el cambio para revisión; no lo aprueba ni lo integra automáticamente. El Product Owner revisa el diff, valida localmente según corresponda y decide si autoriza el merge. Codex trabaja sobre la rama asignada, puede preparar commit, push y PR, pero no puede hacer merge directo a `main`.

## Codex solo como análisis

Codex también puede participar sin implementar cambios, por ejemplo para:

- analizar dependencias;
- identificar archivos afectados;
- revisar el impacto;
- o realizar una auditoría técnica.

Después de ese análisis, el Product Owner decide si la implementación utiliza el flujo corto o el flujo controlado. Usar Codex para analizar no obliga a implementar mediante rama y PR.

## Actividades comunes a ambas rutas

### 1. Necesidad, comprensión y alcance

El cambio puede originarse por una idea, una mejora, un bug, una observación de uso, una revisión arquitectónica o una deuda técnica. Primero se describe el problema y se confirman objetivo, comportamiento actual, resultado esperado, archivos o módulos afectados, documentos propietarios, dependencias, impacto y forma de validación.

### 2. Implementación

El responsable modifica únicamente los archivos necesarios, reutiliza la arquitectura vigente e informa rutas, dependencias, criterios de validación y cualquier paso especial. Los ajustes se mantienen dentro del alcance acordado.

### 3. Validación técnica proporcional

Según el nivel de impacto, se comprueba:

- [ ] que la página o función abre y se ejecuta correctamente;
- [ ] que no aparecen errores relevantes en consola;
- [ ] que CSS, JavaScript, imágenes, iconos y recursos cargan;
- [ ] que navegación, enlaces, IDs, selectores, imports, rutas y contratos afectados funcionan;
- [ ] que no se rompen capacidades conocidas;
- [ ] que el comportamiento básico funciona en escritorio y, cuando corresponda, en iPad;
- [ ] que los HTML funcionan mediante `VS Code → Open with Live Server` y no dependen de `file://`;
- [ ] y que se ejecutan las comprobaciones técnicas o automatizadas disponibles cuando correspondan.

### 4. Consolidación y Git

Antes de integrar se revisa que solo existan cambios relacionados, no queden recursos huérfanos ni respaldos temporales innecesarios y la documentación esté actualizada cuando corresponda.

En el flujo corto, el cambio aprobado puede registrarse y sincronizarse mediante GitHub Desktop con commit y push.

Si se utilizó el flujo controlado, se confirma además que:

- la rama parte del baseline correcto de `main`;
- el commit y el push pertenecen a esa rama;
- la PR describe alcance, archivos y validaciones;
- el diff fue revisado;
- la validación local y la aprobación humana están registradas antes del merge;
- después del merge se realiza fetch / pull y se verifica el resultado actualizado;
- y la rama se elimina cuando ya no sea necesaria.

### 5. Uso real y aprendizaje

Cuando corresponda, Gloria prueba el cambio. Se observa comprensión, autonomía, motivación, errores y cumplimiento del objetivo educativo o de vida diaria. Esta prueba puede ocurrir después del commit y quedar registrada como pendiente sin afirmar que ya se realizó.

Las observaciones relevantes se convierten en bugs, mejoras, decisiones, especificaciones o actualizaciones documentales.

## Definition of Done

Un cambio puede considerarse terminado cuando, según su nivel de impacto:

- [ ] el alcance acordado fue implementado;
- [ ] está integrado en el repositorio y puede ejecutarse en el entorno previsto;
- [ ] supera la validación técnica proporcional;
- [ ] no rompe capacidades conocidas;
- [ ] se eliminaron respaldos temporales innecesarios;
- [ ] se actualizó la documentación cuando correspondía;
- [ ] existe aprobación del Product Owner;
- [ ] se realizó commit y push por la ruta aplicable;
- [ ] si se utilizó flujo controlado, la rama, PR, revisión del diff, validación local, aprobación previa al merge, actualización local y verificación cumplen el proceso;
- [ ] `main` solo recibió cambios aprobados;
- [ ] y el uso real quedó realizado o registrado como pendiente cuando corresponda.

Cuando la prueba con Gloria quede pendiente, el cambio puede estar **técnicamente completado**, pero todavía **pendiente de validación con uso real**.

## Escalado del workflow

El proceso deberá revisarse cuando más alumnos utilicen la Academia, exista uso intensivo, participen varios desarrolladores, aumente el riesgo técnico u operativo, aparezcan despliegues automatizados o entornos separados, se requiera rollback formal, existan más datos compartidos o las pruebas manuales dejen de ser suficientes.

En una fase futura podrán ampliarse las pruebas automatizadas, la integración continua, los entornos de prueba y producción, la telemetría, el monitoreo y la gestión formal de incidencias. Estas capacidades no deben implementarse antes de que su beneficio justifique el coste.

## Antipatrones

Evitar:

- utilizar el flujo Codex completo para cambios triviales cuando no aporta reducción real de riesgo;
- convertir herramientas de control en burocracia sin beneficio proporcional;
- utilizar el flujo corto para un cambio transversal o de riesgo significativo solo por rapidez;
- automatizar la elección de ruta sin decisión del Product Owner;
- crear una PR y tratarla como autorización automática de merge;
- permitir que Codex haga merge directo a `main`;
- trabajar con una rama basada en un `main` desactualizado;
- hacer commits con cambios no relacionados;
- considerar terminado un archivo solo porque fue generado;
- probar únicamente mediante `file://`;
- ignorar errores de consola;
- mantener `OLD-*` indefinidamente;
- y retrasar una corrección clara mediante análisis repetitivo.

## Checklist operativo resumido

### Antes de implementar

- [ ] Necesidad, objetivo y alcance claros.
- [ ] Archivos, dependencias y documento propietario identificados según el impacto.
- [ ] Ruta A o Ruta B seleccionada por decisión humana.
- [ ] Análisis técnico con Codex realizado si existía duda y resultaba útil.
- [ ] Baseline de `main` confirmado si se utilizará flujo controlado.

### Antes del commit o de abrir la PR

- [ ] Validación local proporcional realizada.
- [ ] Consola, recursos, navegación, rutas y contratos afectados revisados cuando corresponda.
- [ ] Solo existen archivos relacionados y no quedan temporales innecesarios.
- [ ] Documentación actualizada si aplica.
- [ ] Si se utilizó flujo controlado, commit y push están en la rama correcta y la PR explica alcance y validación.

### Antes del merge, si se utilizó flujo controlado

- [ ] Diff revisado.
- [ ] Validación local completada según el impacto.
- [ ] Aprobación explícita del Product Owner.
- [ ] Confirmado que **CREAR PR ≠ MERGE** y que Codex no hará merge directo a `main`.

### Antes de cerrar

- [ ] Commit y push realizados por la ruta correspondiente.
- [ ] Si hubo merge, fetch / pull y verificación realizados.
- [ ] Rama eliminada cuando corresponda.
- [ ] Estado de uso real registrado cuando corresponda.
- [ ] Observaciones pendientes y próxima acción identificadas.

## Decisiones adoptadas

| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| PDW-001 | Formalizar el proceso actual como workflow oficial de desarrollo del producto. | Aprobada | Desarrollo · Gobierno |
| PDW-002 | Reconocer que la Academia está en construcción activa y uso familiar controlado, no liberada para uso general. | Aprobada | Calidad · Escalabilidad |
| PDW-003 | Garantizar compatibilidad con VS Code Live Server para los HTML actuales. | Aprobada | Ejecución local |
| PDW-004 | Permitir `OLD-*` como respaldo temporal, sin sustituir el historial de Git. | Aprobada | Recuperación · Orden |
| PDW-005 | Separar validación técnica de validación mediante uso real. | Aprobada | Calidad · Producto |
| PDW-006 | Mantener el workflow proporcional a la etapa actual y evolucionarlo cuando el producto escale. | Aprobada | Coste · Evolución responsable |
| PDW-007 | Considerar terminado un cambio solo cuando esté integrado, ejecutable y validado según su alcance. | Aprobada | Producto ejecutable |
| PDW-008 | Evitar nuevas referencias directas a assets cuando exista un mecanismo semántico aprobado. | Aprobada | Identidad · Mantenibilidad |
| PDW-009 | Utilizar control proporcional: el flujo corto es válido para cambios de bajo impacto y el flujo con Codex, rama y PR se utiliza cuando el impacto técnico justifica controles adicionales. | Aprobada | Desarrollo · Riesgo · Velocidad |
| PDW-010 | Codex puede utilizarse solo para análisis técnico sin que ello obligue a implementar mediante rama y PR. | Aprobada | Análisis · Decisión humana |
| PDW-011 | Cuando Codex implementa, prepara cambios en una rama y PR; el Product Owner valida y autoriza cualquier integración a `main`. | Aprobada | Control · Revisión humana |

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Aprobado |
| **Versión activa** | 1.1 |
| **Fecha de aprobación** | 24/08/2026 |
| **Aprobado por** | Product Owner |
| **Sustituye** | 1.0 |
| **Sustituido por** | — |

**Impacto:** Desarrollo · Colaboración con IA · Arquitectura · Documentación · Calidad · Evolución del Producto
