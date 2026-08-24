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
| **Ámbito** | Ciclo operativo de recepción, construcción, integración, validación y aprendizaje de cambios en la Academia |

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
| 1.1 | 24/08/2026 | Product Owner + Desarrollo + IA colaboradora | Incorpora Codex como herramienta opcional de ingeniería, formaliza el control proporcional mediante flujo corto y flujo controlado, actualiza el estado actual del producto, retira `OLD-*` del repositorio como práctica normal y consolida el uso de Git como historial técnico. |
| 1.0 | 04/08/2026 | Product Owner + AI Collaborator | Primera versión oficial del flujo de desarrollo de la Academia Gloria Valentina. Define el ciclo de vida de los cambios, desde la identificación de una necesidad hasta la validación, integración y publicación del producto, incluyendo la colaboración con IA, la gestión documental y las buenas prácticas para mantener un desarrollo incremental, consistente y sostenible. |

## Propósito

Definir el proceso operativo mediante el cual una necesidad, corrección o mejora se convierte en un cambio integrado, ejecutable, validado y disponible dentro de la Academia Gloria Valentina.

Este documento no enseña a utilizar Git, VS Code, Codex ni una tecnología concreta.

Define **cómo evoluciona un cambio dentro del producto**.

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
- y procesos de operación o despliegue masivo que todavía no existen.

## Estado actual del producto

La Academia se encuentra actualmente en **construcción activa**, con **uso real familiar y controlado**.

Características de esta fase:

- existen módulos funcionales ya utilizados;
- Gloria utiliza dinámicamente el producto y aporta evidencia real de uso;
- la familia participa en la creación, seguimiento y validación de experiencias;
- el producto todavía no ha sido liberado para uso general o compartido con terceros;
- no existe todavía una operación intensiva ni una base amplia de usuarios;
- y muchas decisiones se validan mediante observación directa y uso familiar.

Esta situación permite iterar con rapidez, observar el resultado real, corregir antes de escalar y consolidar arquitectura, documentación y experiencia progresivamente.

El objetivo operativo actual es equilibrar:

> **velocidad de aprendizaje + seguridad razonable + reversibilidad**

La validación positiva con Gloria es una evidencia valiosa, pero no sustituye futuras pruebas de escalabilidad, concurrencia, diversidad de usuarios, seguridad operativa, rendimiento intensivo y soporte en producción.

> **El workflow actual está diseñado para una etapa de construcción activa y uso controlado. Deberá evolucionar cuando el producto alcance uso compartido, intensivo o incorpore nuevos usuarios y colaboradores.**

## Principios

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

### Control proporcional

> **El nivel de control del cambio debe ser proporcional a su impacto, riesgo y alcance técnico.**

No todos los cambios requieren el mismo proceso.

Regla operativa:

- **Bajo impacto → flujo corto.**
- **Impacto técnico relevante → flujo controlado con Codex, rama y Pull Request.**
- **Duda técnica → Codex puede utilizarse solo para análisis antes de decidir la ruta.**

### Codex es opcional

> **Codex no es obligatorio para todos los cambios.**

Cuando Codex participa:

> **Codex prepara cambios; el Product Owner valida; `main` solo recibe cambios aprobados.**

Codex no sustituye:

- la decisión de producto;
- la revisión humana;
- la prueba local;
- la aprobación del Product Owner;
- ni la validación contra servicios reales cuando corresponda.

La referencia operativa actual es que el flujo controlado con Codex represente aproximadamente un **20–30 %** de los cambios, como orientación y no como cuota fija. El criterio real es siempre el impacto y riesgo técnico.

## Herramientas operativas actuales

Esta sección delimita responsabilidades y no constituye un manual de uso.

| Herramienta | Papel operativo |
|---|---|
| **ChatGPT** | Análisis funcional, producto, arquitectura, pedagogía, decisiones, alcance y preparación de cambios o encargos técnicos. |
| **Codex Cloud** | Análisis del repositorio, revisión de dependencias e implementación controlada cuando el impacto técnico lo justifica. |
| **GitHub** | Repositorio remoto canónico; mantiene `main`, historial, ramas y Pull Requests cuando se utilizan. |
| **GitHub Desktop** | Sincronización local, commits, push, fetch/pull, cambio de ramas y revisión básica de evolución. |
| **Visual Studio Code** | Revisión y edición local, inspección de archivos y validación técnica. |
| **Live Server** | Ejecución local de HTML mediante `VS Code → Open with Live Server`. |
| **Firebase** | Servicios reales de Authentication y Firestore utilizados por la aplicación. El repositorio por sí solo no certifica el estado desplegado. |

## Workflow oficial

El workflow tiene **dos rutas válidas**.

La selección de ruta se realiza según impacto, riesgo y alcance técnico. ChatGPT o Arquitectura pueden recomendar el uso de Codex, pero el Product Owner mantiene la decisión final.

---

## RUTA A — FLUJO CORTO

### Cuándo aplica

Es la ruta normal para cambios:

- pequeños;
- localizados;
- fáciles de comprender;
- fácilmente reversibles;
- con dependencias conocidas;
- de bajo riesgo técnico.

### Flujo

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
        ↓
APRENDIZAJE / NUEVA EVOLUCIÓN
```

Este flujo puede utilizarse para ajustes de contenido, documentación menor, correcciones visuales o funcionales claramente localizadas y otros cambios cuyo impacto sea conocido y bajo.

No requiere rama ni Pull Request salvo que aparezca nueva evidencia de riesgo durante el trabajo.

---

## RUTA B — FLUJO CONTROLADO CON CODEX

### Cuándo aplica

Se recomienda cuando exista uno o varios de estos factores:

- impacto transversal;
- varios archivos o módulos relacionados;
- dependencias difíciles de determinar;
- cambios en servicios compartidos;
- Firebase, Firestore o reglas;
- usuarios, identidad o accesos;
- navegación compartida;
- misiones, evidencias o datos;
- nueva funcionalidad relevante;
- refactor;
- arquitectura;
- o riesgo técnico suficiente para justificar aislamiento y revisión adicional.

### Flujo

```text
NECESIDAD / OBSERVACIÓN
        ↓
COMPRENSIÓN Y ALCANCE
        ↓
BASELINE main LIMPIO Y SINCRONIZADO
        ↓
CONSTRUCCIÓN EN RAMA
        ↓
CODEX / DESARROLLO
        ↓
VALIDACIÓN TÉCNICA
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
USO REAL CUANDO CORRESPONDA
        ↓
APRENDIZAJE / NUEVA EVOLUCIÓN
```

> **CREAR PR ≠ MERGE.**

Crear una Pull Request no aprueba el cambio ni autoriza su integración en `main`.

Codex no está autorizado a realizar merge directo a `main`.

## Codex solo para análisis

Codex también puede utilizarse sin implementar cambios.

Ejemplos:

- análisis de dependencias;
- identificación de archivos afectados;
- revisión de impacto;
- auditoría técnica;
- revisión de riesgos.

Después del análisis puede decidirse continuar mediante Ruta A o Ruta B.

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
- riesgo;
- dependencias conocidas;
- y forma de validación.

Cuando exista suficiente claridad se construye. No se prolonga el análisis sin valor nuevo.

En este punto se selecciona Ruta A o Ruta B.

## 3. Construcción del entregable

La IA o el responsable de desarrollo entrega o modifica únicamente los archivos necesarios.

El entregable debe indicar, cuando corresponda:

- archivos nuevos;
- archivos modificados;
- ubicación prevista;
- dependencias;
- pasos especiales;
- criterios de validación;
- y limitaciones conocidas.

## 4. Integración local

El repositorio local actual se mantiene en:

```text
C:\Users\jpperdomo\JP\Personales\Gloria\GitHub\academia-gloria
```

En Ruta A, el cambio se integra directamente sobre el estado local aprobado de `main`.

En Ruta B, se trabaja sobre la rama de la tarea.

En ambos casos deben revisarse las rutas internas y las dependencias afectadas.

### Respaldos temporales

Git constituye el historial técnico oficial.

Los archivos `OLD-*` **no deben mantenerse dentro del repositorio activo como práctica normal de respaldo o versionado**.

Si el Product Owner desea una protección física adicional, puede conservar una copia temporal fuera del repositorio, por ejemplo en:

```text
C:\Users\jpperdomo\JP\Personales\Gloria\GitHub\RESPALDOS-academia-gloria
```

Estas copias:

- son opcionales;
- no deben incluirse en commits;
- no sustituyen Git;
- y no deben confundirse con código vigente.

## 5. Validación técnica y funcional

La validación es proporcional al cambio.

Para HTML o cambios funcionales que afecten interfaz:

```text
VS Code → Open with Live Server
```

Checklist aplicable:

- [ ] la página abre correctamente;
- [ ] no aparecen errores relevantes en consola;
- [ ] CSS y JavaScript cargan;
- [ ] imágenes, iconos y otros recursos cargan;
- [ ] navegación y enlaces principales funcionan;
- [ ] no se rompen funcionalidades existentes;
- [ ] el comportamiento básico es correcto en escritorio;
- [ ] se prueba en iPad cuando el cambio afecta la experiencia táctil;
- [ ] las rutas funcionan bajo Live Server y no dependen de abrir el archivo mediante `file://`.

Para cambios exclusivamente documentales, la revisión del contenido y del diff puede ser suficiente.

Las validaciones automáticas de Codex no sustituyen pruebas visuales, humanas o contra Firebase real cuando sean necesarias.

## 6. Ajustes iterativos

Cuando aparecen observaciones:

```text
PRUEBA
  ↓
OBSERVACIÓN
  ↓
AJUSTE
  ↓
NUEVA PRUEBA
```

Los ajustes deben mantenerse dentro del alcance acordado.

Si durante un flujo corto aparece nueva complejidad, puede escalarse a Ruta B.

## 7. Consolidación

Cuando el resultado es satisfactorio:

- se conserva el archivo definitivo;
- se revisa que no queden recursos huérfanos;
- se eliminan temporales innecesarios;
- se actualiza documentación cuando el cambio modifica conocimiento relevante;
- y se confirma que la ruta utilizada fue suficiente para el riesgo real.

## 8. Commit, sincronización y merge

### Ruta A

Mediante GitHub Desktop:

1. revisar los cambios;
2. confirmar que solo se incluyen archivos relacionados;
3. preparar el commit;
4. realizar el commit;
5. sincronizar mediante `Push origin`.

### Ruta B

Antes de integrar:

1. revisar la Pull Request;
2. confirmar que el diff coincide con el alcance;
3. realizar validación local cuando aplique;
4. obtener aprobación del Product Owner;
5. hacer merge a `main`;
6. volver a `main` en GitHub Desktop;
7. realizar `Fetch origin`;
8. realizar `Pull origin` si corresponde;
9. verificar el resultado;
10. eliminar la rama cuando ya no sea necesaria.

La IA puede proponer Summary, Description y lista de archivos modificados. El responsable humano revisa y aprueba.

## 9. Validación con uso real

Cuando corresponda, Gloria prueba el cambio.

Esta validación puede realizarse después del commit o merge y no necesariamente el mismo día.

Se observa:

- si comprende qué debe hacer;
- si completa el flujo;
- si necesita ayuda externa;
- si la experiencia la motiva;
- si aparecen errores;
- y si el resultado cumple el objetivo educativo o de vida diaria.

La experiencia de Gloria es la principal evidencia actual porque el producto está en uso familiar controlado. No debe interpretarse como validación universal para todos los alumnos.

## 10. Aprendizaje y nueva evolución

Las observaciones relevantes se convierten en bugs, mejoras, decisiones, nuevas especificaciones o actualizaciones documentales.

## Definición de Terminado

Un cambio puede considerarse terminado cuando, según su impacto y ruta:

- [ ] el alcance acordado fue construido;
- [ ] está integrado en el repositorio correcto;
- [ ] supera la validación técnica proporcional;
- [ ] no rompe capacidades conocidas;
- [ ] se realizó commit y sincronización;
- [ ] si se utilizó Ruta B, la PR fue revisada y aprobada antes del merge;
- [ ] si se utilizó Ruta B, `main` quedó sincronizado y verificado después del merge;
- [ ] la documentación fue actualizada cuando correspondía;
- [ ] no quedaron respaldos `OLD-*` dentro del repositorio;
- [ ] y la validación con uso real quedó realizada o registrada como pendiente cuando aplica.

Cuando la prueba con Gloria quede pendiente, el cambio puede estar **técnicamente completado**, pero todavía **pendiente de validación con uso real**.

## Escalado del workflow

El proceso deberá revisarse cuando ocurra alguno de estos eventos:

- más alumnos utilizan la Academia;
- existe uso intensivo;
- participan varios desarrolladores;
- aparece despliegue automatizado;
- se incorporan entornos separados;
- se requiere rollback formal;
- existen datos compartidos;
- o las pruebas manuales dejan de ser suficientes.

Las ramas y Pull Requests ya forman parte del workflow cuando el riesgo lo justifica.

En una fase futura podrían incorporarse:

- pruebas automatizadas amplias;
- integración continua;
- despliegue continuo;
- entornos formales de prueba y producción;
- telemetría;
- monitoreo;
- rollback automatizado;
- revisión por pares formal;
- y gestión estructurada de incidencias.

Estas capacidades no deben implementarse antes de que su beneficio justifique el coste.

## Antipatrones

Evitar:

- copiar archivos sin revisar la ruta;
- sobrescribir sin posibilidad razonable de recuperación;
- mantener `OLD-*` dentro del repositorio como práctica habitual;
- hacer commits con cambios no relacionados;
- considerar terminado un archivo solo porque fue generado;
- probar únicamente mediante `file://`;
- ignorar errores de consola;
- introducir referencias directas nuevas a assets que deben resolverse mediante catálogo;
- modificar documentación por cada ajuste menor;
- retrasar una corrección clara mediante análisis repetitivo;
- utilizar el flujo completo de Codex para cambios triviales cuando no reduce riesgo real;
- convertir herramientas de control en burocracia sin beneficio proporcional;
- utilizar el flujo corto para cambios transversales o de riesgo significativo solo por rapidez;
- hacer merge de una PR sin revisar el diff;
- asumir que crear una PR equivale a aprobarla.

## Checklist operativo resumido

### Antes de construir

- [ ] Objetivo claro.
- [ ] Archivo o módulo identificado.
- [ ] Documento propietario revisado.
- [ ] Impacto y riesgo entendidos.
- [ ] Ruta A o Ruta B seleccionada.

### Antes de integrar

- [ ] Validación proporcional realizada.
- [ ] Consola revisada cuando aplica.
- [ ] Recursos y navegación comprobados cuando aplica.
- [ ] No hay archivos temporales innecesarios.
- [ ] No hay `OLD-*` dentro del repositorio.
- [ ] Documentación actualizada si aplica.

### Si se utilizó Ruta B

- [ ] Baseline identificado.
- [ ] Rama aislada.
- [ ] PR creada.
- [ ] Diff revisado.
- [ ] `CREAR PR ≠ MERGE` respetado.
- [ ] Aprobación humana obtenida.
- [ ] Merge realizado.
- [ ] `main` local sincronizado.
- [ ] Rama eliminada cuando procede.

### Antes de cerrar

- [ ] Commit realizado.
- [ ] Push realizado o `main` sincronizado después del merge.
- [ ] Estado de validación con Gloria registrado cuando aplica.
- [ ] Observaciones pendientes identificadas.
- [ ] Próxima acción clara.

## Decisiones adoptadas

| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| PDW-001 | Formalizar el proceso actual como workflow oficial de desarrollo del producto. | Aprobada | Desarrollo · Gobierno |
| PDW-002 | Reconocer que la Academia se encuentra en construcción activa y uso familiar controlado, todavía no liberada para uso general. | Aprobada | Calidad · Escalabilidad |
| PDW-003 | Garantizar compatibilidad con VS Code Live Server para los HTML actuales. | Aprobada | Ejecución local |
| PDW-004 | Retirar `OLD-*` del repositorio como práctica normal; cualquier copia adicional será externa y opcional. | Aprobada | Recuperación · Orden |
| PDW-005 | Separar validación técnica de validación mediante uso real. | Aprobada | Calidad · Producto |
| PDW-006 | Mantener el workflow proporcional a la etapa actual y evolucionarlo cuando el producto escale. | Aprobada | Coste · Evolución Responsable |
| PDW-007 | Considerar terminado un cambio solo cuando esté integrado, ejecutable y validado según su alcance. | Aprobada | Producto Ejecutable |
| PDW-008 | Evitar nuevas referencias directas a assets cuando exista un mecanismo semántico aprobado. | Aprobada | Identidad · Mantenibilidad |
| PDW-009 | Utilizar flujo corto para cambios de bajo impacto y flujo controlado con Codex, rama y PR cuando el riesgo técnico justifique controles adicionales. | Aprobada | Desarrollo · Calidad |
| PDW-010 | Codex puede utilizarse solo para análisis técnico sin obligar a implementar mediante rama y Pull Request. | Aprobada | Desarrollo · Eficiencia |
| PDW-011 | Codex no es obligatorio para todos los cambios; el Product Owner mantiene la decisión final sobre la ruta de trabajo. | Aprobada | Gobierno · Eficiencia |

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
