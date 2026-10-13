# 👤 Consulta educativa por alumno
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-CONSULTA_EDUCATIVA_POR_ALUMNO.md` |
| **Versión** | 1.2 |
| **Estado** | APROBADA · IMPLEMENTADA EN MAIN · VALIDACIÓN REAL PENDIENTE |
| **Fecha** | 13/10/2026 |
| **Propietario** | Experiencia multi-actor / consulta educativa |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Consulta de información educativa de una Persona Activa autorizada por familiares y profesionales relacionados |

## 🔗 Documentos relacionados

- `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` · gobierna identidad, Roles, Relaciones, Persona Activa y nivel efectivo.
- `docs/tech/TECH-USUARIOS_FIRESTORE_Y_TRANSICION.md` · describe la implementación técnica actual de USER/PERSON/ROLE/PERSON_RELATION.
- `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` · gobierna el contenido y significado del Análisis Educativo.
- `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` · gobierna Gestión de Misiones y sus capacidades de gestión.
- `compartido/js/contexto-usuario.js` · implementa la resolución actual de Persona Activa y nivel efectivo.

---

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.2 | 13/10/2026 | Product Owner + AI Collaborator | Añade acceso directo desde las tarjetas de Mi Universo, solicitado por Juan tras revisar #168. Reutiliza diseño y destino de Consulta educativa; no modifica permisos ni motor. |
| 1.1 | 13/10/2026 | Product Owner + AI Collaborator | PR #168 aprobada por Juan e integrada en main 5518d4d455e9f9420b3a2fc371b6efad0bd09aa1. Consulta educativa disponible para validación real; no declara estabilidad ni verifica Rules desplegadas. |
| 1.1-rc | 13/10/2026 | Product Owner + AI Collaborator | Candidata en rama: entrada de consulta con motor compartido, históricos de solo lectura, protección de mutaciones y redacción aprobada; pendiente de revisión e integración. |
| 1.0 | 13/10/2026 | Product Owner + AI Collaborator | Decisión funcional aprobada para desarrollo; no implementada. |

## 🎯 1. Necesidad

Un profesional autorizado puede tener acceso legítimo a una alumna —por ejemplo, una tutora de comunicación y lenguaje— pero actualmente algunas vistas educativas relevantes permanecen dentro de espacios cuya entrada exige capacidad de `gestion`.

Esto provoca una incoherencia funcional: la Persona relacionada está autorizada para acompañar al alumno, pero no necesariamente puede consultar toda la información educativa que necesita para ese acompañamiento.

La decisión aprobada busca simplificar el modelo desde la perspectiva del producto.

---

## ✅ 2. Regla funcional aprobada

> **Si un Usuario tiene acceso autorizado a un alumno mediante una relación válida, puede consultar toda la información educativa de ese alumno disponible en Academia, siempre dentro del alcance de esa relación y de la seguridad vigente.**

La regla se interpreta como **consulta educativa completa**, no como permiso administrativo completo.

### Incluye, cuando exista para esa Persona Activa

- Análisis Educativo;
- historial y evidencias educativas;
- resultados de Rincón de Lectura;
- resultados de Rincón del Dictado;
- Detectives;
- actividades académicas y pruebas;
- Misiones y su estado;
- Observaciones y refuerzos;
- trabajo realizado;
- progreso educativo;
- Creciendo por Dentro cuando forme parte de la información educativa consultable del alumno;
- otras vistas educativas equivalentes que se incorporen posteriormente.

La lista es funcional y no pretende imponer una arquitectura técnica concreta.

---

## 🔒 3. Consulta no equivale a administración

La autorización para consultar toda la información educativa del alumno **no concede automáticamente** capacidades para:

- crear, editar, eliminar o activar Misiones;
- modificar configuración del alumno;
- gestionar Usuarios, Roles o Relaciones;
- borrar datos o evidencias;
- ejecutar herramientas administrativas o de limpieza;
- alterar seguridad o permisos;
- modificar información familiar o administrativa que no sea necesaria para la consulta educativa.

Por tanto:

```text
acceso autorizado al alumno
→ consulta educativa completa

capacidad de gestion / administracion
→ acciones adicionales según contrato del módulo
```

La implementación no debe resolver esta necesidad concediendo `gestion` completo a un profesional si solo necesita consultar información educativa.

---

## 👤 4. Persona Activa y seguridad

La consulta debe seguir utilizando el modelo vigente:

```text
USER autenticado
→ PERSON propia
→ PERSON_RELATION válida
→ Persona Activa autorizada
→ nivel efectivo
→ capacidad de consulta educativa
```

Reglas:

1. la Persona Activa debe estar autorizada por una Relación válida o por privilegio administrativo existente;
2. cambiar Persona Activa no cambia la identidad del USER autenticado;
3. la autoría/auditoría continúa perteneciendo al USER real;
4. ocultar o mostrar una vista en UI no sustituye controles de API ni Firestore Rules;
5. la implementación debe reutilizar `ContextoUsuario` y el modelo actual antes de crear otro resolver o sistema de permisos;
6. una Relación continúa pudiendo limitar el acceso efectivo según `STD-USUARIOS_ROLES_Y_ACCESOS.md`.

Esta especificación define la **experiencia funcional de consulta educativa**; no sustituye el estándar transversal de seguridad.

---

## 📊 5. Primera aplicación obligatoria · Análisis Educativo

El primer caso que origina esta decisión es **Análisis Educativo**.

Un profesional autorizado sobre la Persona Activa debe poder abrir y consultar el reporte aunque no tenga capacidad para administrar Misiones.

Por tanto, Desarrollo debe evitar que el acceso de lectura al Análisis Educativo dependa únicamente de poder entrar a toda la Gestión de Misiones.

La solución concreta puede reutilizar la vista actual o presentar un acceso directo/controlado, pero debe cumplir:

- misma información educativa para la misma Persona Activa;
- modo de solo consulta para quien no tenga gestión;
- sin botones/acciones administrativas no autorizadas;
- sin duplicar el motor de Análisis Educativo;
- sin crear una segunda fuente de datos o una variante funcional divergente.

---

## ✍️ 6. Mejora aprobada de redacción · Rincón de Lectura

Durante la revisión del bloque `🌱 Aspectos a reforzar` se aprobó sustituir lenguaje técnico como:

> `«extraños» no quedó superada en la señal más reciente (Título de la lectura).`

por una formulación más clara para familias y profesionales:

> **«extraños» conviene seguir practicándola. En la última lectura registrada, _<Título de la lectura>_, todavía necesitó apoyo.**

Cuando la palabra sí haya quedado superada pero haya requerido varios intentos, utilizar una formulación diferenciada, por ejemplo:

> **«extraños» quedó superada, aunque necesitó varios intentos en la última lectura registrada, _<Título de la lectura>_.**

### Regla

Este cambio es **solo de presentación**.

No modifica:

- cómo se elige la señal más reciente por palabra;
- qué estados cuentan como `superada`/`success`;
- la prioridad de palabras;
- los intentos registrados;
- la procedencia de la lectura;
- ni la lógica educativa de `SPEC-ANALISIS_EDUCATIVO.md`.

Al implementar, Desarrollo debe sincronizar también la documentación propietaria de Análisis Educativo para que el texto final no quede definido únicamente en esta especificación.

---

## ♻️ 7. Principios de implementación

Desarrollo debe:

- reutilizar el modelo existente de USER / PERSON / ROLE / PERSON_RELATION / Persona Activa;
- reutilizar el motor actual de Análisis Educativo;
- separar capacidad de **consulta educativa** de capacidad de **gestión administrativa**;
- aplicar cambio mínimo suficiente;
- no duplicar pantallas, motores ni persistencia si no existe una necesidad real;
- mantener coherencia entre UI, API y Firestore Rules;
- revisar el impacto real en navegación antes de introducir rutas nuevas;
- no ampliar permisos más allá de la Persona Activa autorizada.

---

## 🚫 8. Fuera de alcance

Esta decisión no aprueba por sí sola:

- edición educativa por profesionales;
- escritura de observaciones profesionales nuevas;
- mensajería con profesionales;
- acceso a varios alumnos sin Relación explícita;
- exportación masiva de información;
- nuevos Roles universales;
- múltiples USER_ROLE simultáneos;
- un sistema granular universal de permisos por campo;
- acceso administrativo a Gestión de Usuarios.

Cualquiera de estas necesidades requiere análisis separado.

---

## ✅ 9. Criterios de aceptación

La implementación estará funcionalmente alineada cuando:

1. un Usuario con Relación válida hacia Gloria pueda seleccionar/operar sobre Gloria como Persona Activa conforme al modelo existente;
2. pueda consultar el Análisis Educativo de Gloria aunque no disponga de capacidades administrativas de Gestión de Misiones;
3. la información mostrada sea la misma que corresponde a esa Persona Activa, sin duplicar lógica;
4. no pueda ejecutar acciones de gestión para las que no esté autorizado;
5. el acceso no se extienda a otras Personas sin Relación válida;
6. UI, API y reglas de seguridad permanezcan coherentes;
7. el bloque de Lectura en `Aspectos a reforzar` utilice la nueva redacción aprobada;
8. la lógica de selección y priorización de palabras del Análisis Educativo permanezca sin cambios;
9. las fuentes propietarias afectadas queden sincronizadas al cerrar el desarrollo.

---

## 🧪 10. Validación

Validar como mínimo con dos perfiles:

### Familiar con gestión

Debe conservar las capacidades actuales de gestión y consulta.

### Profesional autorizado con consulta sobre Gloria

Debe poder:

- acceder a la información educativa de Gloria;
- abrir Análisis Educativo;
- leer resultados/evidencias autorizadas;

pero no adquirir por ello capacidades administrativas no concedidas.

La prueba real con Lidia será una validación especialmente útil del recorrido de consulta.

---

## DECISIÓN

**13/10/2026 · Product Owner:** aprobada la regla funcional:

> **Acceso autorizado a un alumno → consulta de toda su información educativa disponible en Academia.**

La consulta no equivale a gestión o administración.

También queda aprobada la nueva redacción de señales de pronunciación del bloque `Aspectos a reforzar` del Análisis Educativo.

Estado:

> **APROBADA · IMPLEMENTADA EN MAIN · VALIDACIÓN REAL PENDIENTE**


## 🛠️ Implementación y trazabilidad · 13/10/2026

Base de desarrollo: `main` `1105e5f94df3709d57532348b184d87710fff242` (#167). Rama: `feat/consulta-educativa-alumno`. PR #168 aprobada por Juan e integrada en `main` `5518d4d455e9f9420b3a2fc371b6efad0bd09aa1`; publicada por Pages #773 (`success`). Entrada verificada HTTP 200; validación real de cuentas/Rules pendiente.

| Regla aprobada | Implementación reutilizada |
|---|---|
| Consulta sin entrar en Gestión de Misiones | `mi-universo/consulta-educativa/` y nodo `consulta-educativa` de `compartido/modelos/navegacion.js`, nivel mínimo `consulta`; Gestión conserva `gestion`. |
| Una identidad y autorización | `ContextoUsuario` resuelve relación activa, Persona Activa, UID físico y nivel efectivo; se comprueba antes/después de cargar y antes de abrir trabajo. La ausencia/revocación de relación oculta el contenido. |
| Un único Análisis Educativo | `mi-universo/mis-tareas/analisis-educativo.js` se monta en ambos recorridos; conserva fuentes, límites, filtros y cálculo. |
| Misiones, observaciones, progreso y trabajo | `Academia.tareas.leer`, `leerSesionesAcademicas({ todas: true })`, `abrirTrabajoRealizado` y visores existentes; no hay segunda colección ni motor. |
| Históricos sin gestión | Lectura presenta observaciones sin editor/borrado; Semillas abre historial; Detectives consulta UID de Persona Activa y omite escrituras; Dictado reutiliza su historial de consulta. |
| Consulta no concede escritura | `ContextoUsuario.exigirEscrituraEducativa` usa propiedad y nivel efectivo existentes. APIs de Misiones exigen gestión; sesiones/evidencias propias conservan el recorrido del alumno. |
| Presentación de palabras | Solo cambian las dos redacciones de Lectura en `analizarLectura`; selección, prioridad, intentos y estados permanecen intactos. |

### Validación de la implementación

`tests/consulta-educativa-browser.cjs` ejecuta ContextoUsuario, Panel, API, motor y páginas reales con identidades y transporte Firebase simulados: familiar conserva creación; profesional relacionado consulta el mismo reporte sin gestión; nueve mutaciones directas se rechazan antes de escribir; relación ausente y revocada bloquean contenido; rol gestión limitado por relación consulta no puede crear. Comprueba redacción, señal reciente y anchuras 1280/768/390/320.

Regresión: `dictados-modelo.test.mjs`, `dictados-seguimiento.test.mjs`, `dictados-sesiones.test.mjs` y `dictados-misiones-browser.cjs`. Las Rules propietarias `compartido/firebase/FireStore Rules.txt` ya admiten lectura educativa relacionada y requieren gestión para modificar datos ajenos; no se cambian Rules ni colecciones.

**Pendiente:** comprobación real con Lidia/Gloria y familiar. Las pruebas simuladas no verifican las Rules desplegadas, las cuentas reales ni la persistencia de producción.


### Acceso directo desde Mi Universo

Además del menú compartido, `mi-universo/index.html` presenta la tarjeta **Consulta educativa** en Mis mundos. Abre `consulta-educativa/`, con el mismo contexto de Persona Activa y la misma comprobación de relación/permisos del destino. Reutiliza las tarjetas existentes sin CSS, lógica o autorización adicional.
