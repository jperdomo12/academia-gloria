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
| **Responsables** | Product Owner + Desarrollo + IA colaboradora |
| **Ámbito** | Ciclo operativo de recepción, construcción, revisión, integración, validación y aprendizaje de cambios en la Academia |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/ai/AI_COLLABORATION_GUIDE.md` | **Gobierna:** define cómo colaboran las personas, la documentación y la IA. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** establece la estructura, trazabilidad y Quality Gate documental. |
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** define dónde vive cada conocimiento y quién lo mantiene. |
| `docs/ADN_ACADEMIA_GLORIA_VALENTINA.md` | **Gobierna:** define la identidad y los principios que toda evolución debe respetar. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna:** define la arquitectura conceptual de la experiencia. |
| `docs/project/RELEASE_NOTES.md` | **Complementa:** registra las entregas y cambios relevantes del producto. |
| `docs/project/PROJECT_ROLES.md` | **Complementará:** identificará quién desempeña actualmente cada rol. |
| `docs/ai/AI_DEVELOPMENT_BOOTSTRAP.md` | **Implementará:** permitirá que una nueva IA se incorpore rápidamente al desarrollo. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 24/08/2026 | Product Owner + Desarrollo + IA colaboradora | Incorpora el workflow validado con Codex Cloud, ramas y Pull Requests; formaliza el baseline, la revisión humana previa al merge, la sincronización y cierre; y sustituye `OLD-*` por Git como mecanismo normal de historial técnico. |
| 1.0 | 04/08/2026 | Product Owner + AI Collaborator | Primera versión oficial del flujo de desarrollo de la Academia Gloria Valentina. Define el ciclo de vida de los cambios, desde la identificación de una necesidad hasta la validación, integración y publicación del producto, incluyendo la colaboración con IA, la gestión documental y las buenas prácticas para mantener un desarrollo incremental, consistente y sostenible. |

## Propósito

Definir el proceso operativo mediante el cual una necesidad, corrección o mejora se convierte en un cambio aprobado, integrado, ejecutable, validado y disponible dentro de la Academia Gloria Valentina.

Este documento no enseña a utilizar Git, VS Code o una tecnología concreta. Define **cómo evoluciona un cambio dentro del producto** y es el propietario documental de ese proceso operativo.

## Alcance

Aplica a entregables como:

- HTML;
- CSS;
- JavaScript;
- imágenes;
- archivos de configuración;
- documentación;
- y otros recursos incorporados al repositorio.

Quedan fuera de su alcance:

- la arquitectura detallada de cada solución;
- reglas funcionales específicas;
- formación sobre herramientas;
- y procesos de despliegue masivo que todavía no existen.

## Estado actual del producto

La Academia se encuentra actualmente en una fase de **uso controlado y evolución guiada**.

Características de esta fase:

- existen módulos funcionales ya utilizados;
- la principal usuaria real es Gloria;
- la familia participa en la creación, seguimiento y validación de experiencias;
- el producto todavía no está sometido a uso intensivo;
- no existe todavía una operación masiva ni una base amplia de usuarios;
- y muchas decisiones se validan mediante observación directa y uso familiar.

Esta situación permite iterar con rapidez, observar el resultado real, corregir antes de escalar y consolidar arquitectura, documentación y experiencia progresivamente.

También implica que una validación positiva con Gloria es una evidencia valiosa, pero no sustituye futuras pruebas de escalabilidad, concurrencia, diversidad de usuarios, seguridad operativa, rendimiento intensivo y soporte en producción.

> **El workflow actual está diseñado para una etapa de uso controlado. Deberá evolucionar cuando el producto alcance uso intensivo o incorpore nuevos usuarios y colaboradores.**

## Principios

### Principio de control

> **Codex prepara cambios; el Product Owner valida; main solo recibe cambios aprobados.**

Codex es una herramienta de ingeniería sobre el repositorio. No sustituye la decisión de producto, la revisión humana, la prueba local ni la aprobación del Product Owner. Codex no queda autorizado a integrar directamente cambios en `main`.

### Cambios pequeños y verificables

Preferir cambios acotados, reversibles, fáciles de probar y con valor observable.

### Producto siempre ejecutable

El repositorio debe mantenerse utilizable durante la evolución.

### Comprender antes de modificar

Antes de cambiar un archivo se debe entender qué función cumple, qué otros recursos utiliza y qué documento gobierna el comportamiento afectado.

### Construir para aprender

La primera versión puede ser suficiente para validar una idea sin intentar resolver todo el futuro.

### Producto ejecutable

> **Un entregable no termina cuando ha sido generado; termina cuando puede integrarse, ejecutarse, validarse y aportar valor.**

### Validación proporcional

El nivel de revisión depende del impacto del cambio. Una tarea exclusivamente documental no requiere Live Server; la revisión de contenido y del diff puede ser suficiente.

## Herramientas operativas actuales

Esta sección delimita responsabilidades y no constituye un manual de uso.

| Herramienta | Papel operativo |
|---|---|
| **ChatGPT** | Análisis funcional, producto, arquitectura, pedagogía, decisiones, alcance y preparación de encargos técnicos. |
| **Codex Cloud** | Análisis del repositorio, implementación en rama, validaciones técnicas, revisión del diff y preparación de Pull Requests. |
| **GitHub** | Repositorio remoto canónico; mantiene `main`, ramas, Pull Requests, historial e integración. |
| **GitHub Desktop** | Sincronización local, cambio de ramas, revisión de commits, Fetch/Pull e interacción con Git sin necesidad de línea de comandos. |
| **Visual Studio Code** | Revisión y edición local, inspección de archivos y acceso a consola y herramientas de desarrollo. |
| **Live Server** | Ejecución local de HTML mediante `VS Code → Open with Live Server`. |
| **Firebase** | Servicios reales de Authentication y Firestore utilizados por la aplicación. El repositorio por sí solo no permite a Codex certificar su estado desplegado. |

## Workflow oficial

```text
NECESIDAD / OBSERVACIÓN
        ↓
COMPRENSIÓN Y ALCANCE
        ↓
BASELINE main LIMPIO Y SINCRONIZADO
        ↓
CONSTRUCCIÓN EN RAMA
        ↓
VALIDACIÓN TÉCNICA POR CODEX / DESARROLLO
        ↓
PULL REQUEST
        ↓
REVISIÓN DE DIFF Y ARCHIVOS
        ↓
VALIDACIÓN LOCAL
VS CODE + LIVE SERVER CUANDO APLIQUE
        ↓
APROBACIÓN DEL PRODUCT OWNER
        ↓
MERGE A main
        ↓
FETCH / PULL DE main EN LOCAL
        ↓
VERIFICACIÓN FINAL
        ↓
ELIMINACIÓN DE RAMA DE TRABAJO
        ↓
VALIDACIÓN CON USO REAL CUANDO CORRESPONDA
        ↓
APRENDIZAJE / NUEVA EVOLUCIÓN
```

## 1. Necesidad u observación

El cambio puede originarse por una idea, una mejora, un bug, una observación de Gloria, una necesidad familiar, una revisión arquitectónica o una deuda técnica.

Debe describirse primero el problema y no únicamente la solución imaginada.

## 2. Comprensión y alcance

Antes de construir se confirma:

- objetivo;
- archivo o módulo afectado;
- comportamiento actual;
- resultado esperado;
- documentos propietarios;
- impacto;
- y forma de validación.

Cuando exista suficiente claridad se construye. No se prolonga el análisis sin valor nuevo.

## 3. Baseline y `main`

`main` representa la versión oficial integrada. Antes de iniciar una tarea con Codex debe existir un baseline identificable, limpio y basado en el `main` aprobado. El estado aprobado local debe estar sincronizado con GitHub y debe evitarse comenzar cuando existan cambios locales relevantes todavía no integrados.

El commit baseline se registra cuando la relevancia o el riesgo de la tarea lo amerite. Codex puede utilizar internamente una rama o un worktree propios, pero el baseline funcional de referencia sigue siendo el `main` aprobado.

## 4. Construcción en rama

Cada cambio significativo realizado con Codex se desarrolla en una rama separada nacida del baseline aprobado. Durante la construcción y la prueba, `main` permanece intacto.

La rama:

- es temporal;
- contiene únicamente el alcance acordado;
- no mezcla cambios de otras tareas;
- permite realizar ajustes iterativos sin afectar `main`;
- y puede eliminarse después del merge y de verificar el resultado.

Codex o Desarrollo deben identificar los archivos nuevos, modificados o eliminados, sus dependencias, las validaciones aplicables y cualquier supuesto relevante.

## 5. Validación técnica y ajustes

Codex o Desarrollo ejecutan validaciones proporcionales al cambio y revisan el diff antes de preparar la entrega. Cuando aparecen observaciones, el ciclo continúa dentro de la misma rama y del alcance acordado:

```text
PRUEBA
  ↓
OBSERVACIÓN
  ↓
AJUSTE
  ↓
NUEVA PRUEBA
```

Las validaciones ejecutadas, sus resultados y cualquier limitación deben quedar declarados. No se afirma que algo fue probado si no lo fue.

## 6. Pull Request y revisión

La Pull Request es el Quality Gate de revisión previo a integrar un cambio.

> **CREAR PR ≠ MERGE. Crear una Pull Request no aprueba el cambio ni autoriza su integración en `main`.**

La PR permite revisar:

- archivos nuevos, modificados y eliminados;
- líneas añadidas y eliminadas;
- commits;
- resumen de la tarea;
- validaciones realizadas;
- y correspondencia entre el diff y el alcance aprobado.

Antes del merge, la revisión humana debe confirmar que solo se incluyen cambios autorizados y que no existen alteraciones accidentales o ajenas al objetivo.

## 7. Validación local

Cuando existe código ejecutable, la validación funcional humana se realiza sobre la rama local mediante VS Code y Live Server:

- abrir la rama local;
- ejecutar el HTML con `VS Code → Open with Live Server`;
- revisar la consola;
- verificar navegación, enlaces y carga de recursos;
- validar el comportamiento afectado y que no se rompan capacidades conocidas;
- revisar escritorio y, cuando afecte la experiencia táctil, iPad;
- y confirmar que las rutas no dependen de `file://`.

Para cambios exclusivamente documentales, la revisión del contenido, estructura y diff puede ser suficiente.

La validación automática de Codex **no sustituye** las pruebas contra Firebase real, la revisión del comportamiento visual ni el uso humano cuando sean necesarios. Codex tampoco puede certificar el estado desplegado de Firebase únicamente desde el repositorio.

## 8. Aprobación, merge y cierre técnico

Solo después de la revisión y aprobación humana del Product Owner se integra la PR:

```text
PR
  ↓
CONFIRM MERGE
  ↓
main
```

Crear la PR y aprobar el merge son actos distintos. Codex prepara los cambios y la Pull Request; no hace merge directo a `main`.

Después del merge, mediante GitHub Desktop:

1. cambiar a `main`;
2. realizar `Fetch origin`;
3. realizar `Pull origin` si corresponde;
4. verificar el estado local;
5. comprobar el resultado integrado;
6. y eliminar la rama remota o local de trabajo cuando ya no sea necesaria.

## 9. Historial técnico y respaldos temporales

Git, las ramas y los commits constituyen el historial técnico. Los archivos `OLD-*` **no deben mantenerse dentro del repositorio activo como mecanismo normal de trabajo, versionado o respaldo**.

Durante una transición, o cuando el Product Owner desee protección adicional, puede realizarse una copia física local temporal. Si se utiliza:

- debe quedar fuera del repositorio versionado;
- debe ubicarse preferiblemente en un área local de respaldo;
- no debe entrar en commits;
- no debe confundirse con código vigente;
- y debe retirarse cuando deje de ser necesaria.

El directorio externo existente puede seguir utilizándose para esa protección opcional:

```text
C:\Users\jpperdomo\JP\Personales\Gloria\GitHub\RESPALDOS-academia-gloria
```

## 10. Validación técnica y validación mediante uso real

El workflow distingue dos estados de validación:

### A. Validación técnica o funcional previa al merge

Confirma de forma proporcional que el cambio cumple su alcance, mantiene contratos y rutas, puede ejecutarse cuando corresponda y está listo para revisión y aprobación.

### B. Validación mediante uso real posterior

Cuando corresponda, Gloria prueba el cambio después de su integración. Se observa si comprende el flujo, lo completa, necesita ayuda, mantiene motivación, encuentra errores y obtiene el resultado educativo o de vida diaria esperado.

La experiencia de Gloria es la principal evidencia actual porque el producto está en uso controlado. No debe interpretarse como validación universal para todos los alumnos.

Un cambio puede estar **técnicamente integrado y validado** y, al mismo tiempo, **pendiente de validación mediante uso real**. Esa situación debe registrarse de forma explícita.

## 11. Aprendizaje y nueva evolución

Las observaciones relevantes se convierten en bugs, mejoras, decisiones, nuevas especificaciones o actualizaciones documentales. Cada nueva evolución vuelve a comenzar desde un baseline aprobado e identificable.

## Definición de Terminado

Un cambio puede considerarse terminado, según lo que corresponda a su alcance, cuando:

- [ ] el alcance acordado fue construido;
- [ ] se utilizó una rama separada cuando procedía;
- [ ] se ejecutaron y declararon las validaciones técnicas aplicables;
- [ ] la PR y su diff fueron revisados;
- [ ] la prueba local fue superada cuando existía código ejecutable;
- [ ] el Product Owner aprobó la integración;
- [ ] el merge a `main` fue realizado;
- [ ] el `main` local fue sincronizado y verificado;
- [ ] la rama fue cerrada o eliminada cuando dejó de ser necesaria;
- [ ] la documentación fue actualizada cuando correspondía;
- [ ] no quedan `OLD-*` ni respaldos temporales dentro del repositorio activo;
- [ ] y la validación mediante uso real fue realizada o quedó registrada como pendiente.

Cuando la prueba con Gloria quede pendiente, el cambio puede estar **técnicamente completado**, pero todavía **pendiente de validación con uso real**.

## Escalado y evolución futura

El proceso deberá revisarse cuando ocurra alguno de estos eventos:

- más alumnos utilizan la Academia;
- existe uso intensivo;
- participan varios desarrolladores;
- aparece despliegue automatizado;
- se incorporan entornos separados;
- se requiere rollback formal;
- existen datos compartidos;
- o las pruebas manuales dejan de ser suficientes.

Codex, las ramas y las Pull Requests ya fueron validados mediante una primera entrega controlada y forman parte del workflow actual. En fases futuras podrían incorporarse pruebas automatizadas amplias, CI/CD, entornos formales separados de prueba y producción, telemetría, monitoreo, rollback automatizado y gestión formal de incidencias.

Estas capacidades futuras no deben implementarse antes de que su beneficio justifique el coste.

## Antipatrones

Evitar:

- trabajar directamente sobre `main` con Codex;
- hacer merge sin revisar el diff y los archivos;
- iniciar una tarea con Codex desde un baseline desactualizado o con cambios relevantes no integrados;
- mezclar cambios no relacionados en una rama, PR o commit;
- considerar que crear una PR significa aprobar o hacer merge;
- asumir que una validación automática sustituye la prueba funcional, visual, contra Firebase real o de uso humano;
- mantener ramas terminadas indefinidamente sin razón;
- almacenar `OLD-*` dentro del árbol activo como práctica normal;
- copiar archivos sin revisar la ruta;
- considerar terminado un archivo solo porque fue generado;
- probar código ejecutable únicamente mediante `file://`;
- ignorar errores de consola;
- introducir referencias directas nuevas a assets que deben resolverse mediante catálogo;
- modificar documentación por cada ajuste menor;
- y retrasar una corrección clara mediante análisis repetitivo.

## Checklist operativo resumido

### Antes de construir

- [ ] Objetivo y alcance claros.
- [ ] Archivos y rutas identificados.
- [ ] Documento propietario revisado.
- [ ] `main` aprobado, limpio y sincronizado.
- [ ] Commit baseline registrado cuando lo amerita.
- [ ] Rama separada preparada para el cambio.

### Antes de solicitar aprobación

- [ ] Validaciones técnicas proporcionales ejecutadas.
- [ ] Diff y lista de archivos revisados.
- [ ] PR preparada sin cambios ajenos al alcance.
- [ ] Live Server, consola, recursos y navegación revisados cuando aplica.
- [ ] Para documentación, contenido y estructura revisados.
- [ ] Estado de pruebas con Firebase real o limitaciones declarado cuando aplica.

### Antes del merge

- [ ] La PR fue revisada; crearla no se considera aprobación.
- [ ] El alcance coincide con lo aprobado.
- [ ] La validación local aplicable fue superada.
- [ ] El Product Owner aprobó el cambio.

### Antes de cerrar

- [ ] Merge realizado por el flujo aprobado.
- [ ] `main` local sincronizado mediante Fetch/Pull y resultado comprobado.
- [ ] Rama cerrada o eliminada cuando procede.
- [ ] No existen `OLD-*` ni respaldos temporales en el repositorio activo.
- [ ] Estado de validación mediante uso real registrado.
- [ ] Observaciones pendientes y próxima acción identificadas.

## Decisiones adoptadas

De acuerdo con `DOCUMENTATION_STANDARD.md`, el estado de estas decisiones se normaliza como aprobado porque el workflow y su versión 1.1 cuentan con aprobación del Product Owner.

| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| PDW-001 | Formalizar el proceso actual como workflow oficial de desarrollo del producto. | Aprobada | Desarrollo · Gobierno |
| PDW-002 | Reconocer que la Academia se encuentra en fase de uso controlado, no intensivo ni masivo. | Aprobada | Calidad · Escalabilidad |
| PDW-003 | Garantizar compatibilidad con VS Code Live Server para los HTML actuales. | Aprobada | Ejecución local |
| PDW-004 | Retirar `OLD-*` del repositorio activo como mecanismo normal de versionado o respaldo y utilizar Git como historial técnico. | Aprobada | Recuperación · Orden |
| PDW-005 | Separar validación técnica de validación mediante uso real. | Aprobada | Calidad · Producto |
| PDW-006 | Mantener el workflow proporcional a la etapa actual y evolucionarlo cuando el producto escale. | Aprobada | Coste · Evolución Responsable |
| PDW-007 | Considerar terminado un cambio solo cuando esté integrado, ejecutable y validado según su alcance. | Aprobada | Producto Ejecutable |
| PDW-008 | Evitar nuevas referencias directas a assets cuando exista un mecanismo semántico aprobado. | Aprobada | Identidad · Mantenibilidad |
| PDW-009 | Incorporar Codex como herramienta de ingeniería controlada, sin sustituir la decisión, revisión, prueba ni aprobación humanas. | Aprobada | Desarrollo · Autoridad |
| PDW-010 | Utilizar ramas separadas para aislar cambios significativos antes de `main`. | Aprobada | Integridad · Trazabilidad |
| PDW-011 | Utilizar Pull Requests como Quality Gate previo al merge. | Aprobada | Calidad · Revisión |
| PDW-012 | Exigir aprobación humana del Product Owner antes de integrar cambios en `main`. | Aprobada | Gobierno · Autoridad |
| PDW-013 | Mantener VS Code y Live Server como validación local cuando aplique. | Aprobada | Validación Funcional |
| PDW-014 | Mantener GitHub Desktop como herramienta operativa local actual. | Aprobada | Operación Local |

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 1.1 |
| **Fecha de aprobación** | 24/08/2026 |
| **Aprobado por** | Product Owner |
| **Sustituye** | `PRODUCT_DEVELOPMENT_WORKFLOW.md` v1.0 |
| **Sustituido por** | — |

**Impacto:** Desarrollo · Colaboración con IA · Arquitectura · Documentación · Calidad · Evolución del Producto
