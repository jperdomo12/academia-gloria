# Product Development Workflow
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` |
| **Versión** | 1.0-rc1 |
| **Estado** | Candidato para aprobación |
| **Fecha** | 04/08/2026 |
| **Última actualización** | 04/08/2026 |
| **Propietario** | Gobierno del Desarrollo del Producto |
| **Responsables** | Product Owner + Desarrollo + IA colaboradora |
| **Ámbito** | Ciclo operativo de recepción, integración, validación, consolidación y aprendizaje de cambios en la Academia |

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
| 1.0 | 04/08/2026 | Product Owner + AI Collaborator | Primera versión oficial del flujo de desarrollo de la Academia Gloria Valentina. Define el ciclo de vida de los cambios, desde la identificación de una necesidad hasta la validación, integración y publicación del producto, incluyendo la colaboración con IA, la gestión documental y las buenas prácticas para mantener un desarrollo incremental, consistente y sostenible. |

## Propósito

Definir el proceso operativo mediante el cual una necesidad, corrección o mejora se convierte en un cambio integrado, ejecutable, validado y disponible dentro de la Academia Gloria Valentina.

Este documento no enseña a utilizar Git, VS Code o una tecnología concreta.

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

El nivel de revisión depende del impacto del cambio.

## Workflow oficial

```text
NECESIDAD U OBSERVACIÓN
        ↓
COMPRENSIÓN Y ALCANCE
        ↓
CONSTRUCCIÓN DEL ENTREGABLE
        ↓
INTEGRACIÓN LOCAL
        ↓
VALIDACIÓN TÉCNICA
        ↓
AJUSTES ITERATIVOS
        ↓
CONSOLIDACIÓN
        ↓
COMMIT Y SINCRONIZACIÓN
        ↓
VALIDACIÓN CON USO REAL
        ↓
APRENDIZAJE Y NUEVA EVOLUCIÓN
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

## 3. Construcción del entregable

La IA o el responsable de desarrollo entrega los archivos completos necesarios.

El entregable debe indicar archivos nuevos, archivos modificados, ubicación prevista, dependencias, pasos especiales y criterios de validación.

## 4. Integración local

El repositorio local actual se mantiene en:

```text
C:\Users\jpperdomo\JP\Personales\Gloria\GitHub\academia-gloria
```

Al recibir un archivo:

1. confirmar su ruta correcta;
2. verificar si ya existe;
3. conservar temporalmente la versión anterior cuando resulte prudente;
4. copiar el nuevo archivo;
5. y revisar que las rutas internas sigan siendo válidas.

### Respaldo temporal

Actualmente puede utilizarse:

```text
OLD-<nombre-archivo>
```

La copia temporal debe eliminarse o trasladarse después de validar el cambio.

Los respaldos externos pueden conservarse en:

```text
C:\Users\jpperdomo\JP\Personales\Gloria\GitHub\RESPALDOS-academia-gloria
```

Git continúa siendo el historial técnico oficial. Los archivos `OLD-*` son una protección operativa temporal, no un sistema de versionado.

## 5. Validación técnica

Los HTML deben poder utilizarse correctamente mediante:

```text
VS Code → Open with Live Server
```

Checklist mínimo:

- [ ] la página abre correctamente;
- [ ] no aparecen errores relevantes en consola;
- [ ] CSS y JavaScript cargan;
- [ ] imágenes, iconos y otros recursos cargan;
- [ ] navegación y enlaces principales funcionan;
- [ ] no se rompen funcionalidades existentes;
- [ ] el comportamiento básico es correcto en escritorio;
- [ ] se prueba en iPad cuando el cambio afecta la experiencia táctil;
- [ ] las rutas funcionan bajo Live Server y no dependen de abrir el archivo mediante `file://`.

## 6. Ajustes iterativos

Cuando aparecen observaciones:

```text
PRUEBA
  ↓
OBSERVACIÓN
  ↓
AJUSTE CON IA
  ↓
NUEVA PRUEBA
```

Los ajustes deben mantenerse dentro del alcance acordado.

## 7. Consolidación

Cuando el resultado es satisfactorio:

- se conserva el archivo definitivo;
- se eliminan copias temporales innecesarias;
- se trasladan respaldos externos cuando corresponda;
- se revisa que no queden recursos huérfanos;
- y se actualiza documentación si el cambio modifica conocimiento relevante.

## 8. Commit y sincronización

Mediante GitHub Desktop:

1. revisar los cambios;
2. confirmar que solo se incluyen archivos relacionados;
3. preparar el commit;
4. realizar el commit;
5. sincronizar con GitHub mediante `Push origin`.

La IA puede proponer el **Summary**, la **Description** y la lista de archivos modificados. El responsable humano revisa y ejecuta el commit.

## 9. Validación con uso real

Cuando corresponda, Gloria prueba el cambio.

Esta validación puede realizarse después del commit y no necesariamente el mismo día.

Se observa:

- si comprende qué debe hacer;
- si completa el flujo;
- si necesita ayuda externa;
- si la experiencia la motiva;
- si aparecen errores;
- y si el resultado cumple el objetivo educativo o de vida diaria.

La experiencia de Gloria es la principal evidencia actual porque el producto está en uso controlado. No debe interpretarse como validación universal para todos los alumnos.

## 10. Aprendizaje y nueva evolución

Las observaciones relevantes se convierten en bugs, mejoras, decisiones, nuevas especificaciones o actualizaciones documentales.

## Definición de Terminado

Un cambio puede considerarse terminado cuando:

- [ ] el alcance acordado fue construido;
- [ ] está integrado en el repositorio correcto;
- [ ] puede ejecutarse mediante el entorno local previsto;
- [ ] supera la validación técnica proporcional;
- [ ] no rompe capacidades conocidas;
- [ ] se eliminaron respaldos temporales innecesarios;
- [ ] se realizó commit y sincronización;
- [ ] la documentación fue actualizada cuando correspondía;
- [ ] y la validación con uso real quedó realizada o registrada como pendiente.

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

En una fase futura podrían incorporarse ramas de desarrollo, Pull Requests, revisión por pares, pruebas automatizadas, integración continua, entornos de prueba y producción, telemetría, monitoreo y gestión formal de incidencias.

Estas capacidades no deben implementarse antes de que su beneficio justifique el coste.

## Antipatrones

Evitar:

- copiar archivos sin revisar la ruta;
- sobrescribir sin posibilidad razonable de recuperación;
- mantener `OLD-*` indefinidamente;
- hacer commits con cambios no relacionados;
- considerar terminado un archivo solo porque fue generado;
- probar únicamente mediante `file://`;
- ignorar errores de consola;
- introducir referencias directas nuevas a assets que deben resolverse mediante catálogo;
- modificar documentación por cada ajuste menor;
- y retrasar una corrección clara mediante análisis repetitivo.

## Checklist operativo resumido

### Antes de integrar

- [ ] Objetivo claro.
- [ ] Archivo y ruta identificados.
- [ ] Documento propietario revisado.
- [ ] Respaldo temporal decidido.

### Antes del commit

- [ ] Live Server funciona.
- [ ] Consola revisada.
- [ ] Recursos cargan.
- [ ] Navegación funciona.
- [ ] No hay archivos temporales innecesarios.
- [ ] Documentación actualizada si aplica.
- [ ] Summary y Description preparados.

### Antes de cerrar

- [ ] Commit realizado.
- [ ] Push realizado.
- [ ] Estado de validación con Gloria registrado.
- [ ] Observaciones pendientes identificadas.
- [ ] Próxima acción clara.

## Decisiones adoptadas

| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| PDW-001 | Formalizar el proceso actual como workflow oficial de desarrollo del producto. | Propuesta | Desarrollo · Gobierno |
| PDW-002 | Reconocer que la Academia se encuentra en fase de uso controlado, no intensivo ni masivo. | Propuesta | Calidad · Escalabilidad |
| PDW-003 | Garantizar compatibilidad con VS Code Live Server para los HTML actuales. | Propuesta | Ejecución local |
| PDW-004 | Permitir `OLD-*` como respaldo temporal, sin sustituir el historial de Git. | Propuesta | Recuperación · Orden |
| PDW-005 | Separar validación técnica de validación mediante uso real. | Propuesta | Calidad · Producto |
| PDW-006 | Mantener el workflow proporcional a la etapa actual y evolucionarlo cuando el producto escale. | Propuesta | Coste · Evolución Responsable |
| PDW-007 | Considerar terminado un cambio solo cuando esté integrado, ejecutable y validado según su alcance. | Propuesta | Producto Ejecutable |
| PDW-008 | Evitar nuevas referencias directas a assets cuando exista un mecanismo semántico aprobado. | Propuesta | Identidad · Mantenibilidad |


## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Aprobado |
| **Versión activa** | 1.0 |
| **Fecha de aprobación** | 04/08/2026 |
| **Aprobado por** | Product Owner |
| **Sustituye** | — |
| **Sustituido por** | — |

**Impacto:** Desarrollo · Colaboración con IA · Arquitectura · Documentación · Calidad · Evolución del Producto
