# 🗺️ Especificación de Mis Tareas y Misiones
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` |
| **Versión** | 2.0 |
| **Estado** | Activo |
| **Fecha** | 2026 |
| **Última actualización** | 03/09/2026 |
| **Propietario** | Gestión de Misiones |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Comportamiento funcional de creación, presentación, ejecución, seguimiento, revisión, evidencia, refuerzo y eliminación controlada de Misiones |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Gobierna:** reglas y terminología transversal del dominio. |
| `docs/models/MODELO_MISIONES.md` | **Modela:** conceptos y relaciones sin duplicar normativa. |
| `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md` | **Implementa:** consulta de trabajo/evidencia de una Misión. |
| `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` | **Complementa:** análisis de evidencias y propuestas de actuación. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna:** Repaso Académico y sesiones/evidencias de Temas académicos. |
| `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` | **Complementa:** Reconocimientos/Recompensas vinculables a Misiones. |
| `compartido/api/academia.js` | **Implementa:** API propietaria de Tareas/Misiones. |
| `mi-universo/mis-tareas/` | **Implementa:** Gestión familiar/administrativa. |
| `mi-universo/mi-camino/` | **Implementa:** presentación y ejecución para el alumno. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 2.0 | 03/09/2026 | Product Owner + AI Collaborator | Sustituye la antigua propuesta MVP por la especificación del producto real. Documenta Gestión de Misiones V1, acceso `gestion`, filtros/paginación, Repaso Académico asistido, Misiones libres, Persona Activa, evidencia/revisión, `Ver trabajo`, refuerzos, datos de prueba, eliminación controlada, Reconocimientos y compatibilidad histórica. |
| 1.0 | 2026 | Equipo del proyecto | Primera propuesta funcional de Mis Tareas/Misiones: creación adulta, representación motivadora en Mi Camino, estados, evidencia, finalización automática/manual y validación familiar. |

---

## 🎯 1. Propósito

Mis Tareas / Misiones permiten que la familia organice y acompañe actividades sin convertir la experiencia del alumno en una lista administrativa de deberes.

La misma intención se presenta de dos formas:

```text
GESTIÓN FAMILIAR
Información completa, control, revisión y seguimiento

                ↕ mismo registro / misma intención

MI CAMINO
Misión clara, motivadora y apropiada para el alumno
```

La Misión no duplica una Tarea en otro registro independiente.

---

## 🧭 2. Principios funcionales

1. **La familia gestiona; el alumno vive la Misión.**
2. **La UI del alumno no muestra complejidad administrativa innecesaria.**
3. **Automatizar cierre solo cuando existe evidencia fiable.**
4. **Cuando no existe evidencia verificable, utilizar finalización manual + revisión familiar.**
5. **Una evidencia referencia la experiencia real; no la duplica completa dentro de la Misión.**
6. **Persona Activa determina el alumno sobre el que se opera.**
7. **Gestión de Misiones requiere acceso de gestión.**
8. **Las Misiones de refuerzo propuestas no se hacen visibles automáticamente al alumno.**
9. **Vista/consulta histórica no altera actividad, evidencia ni progreso.**
10. **Datos de prueba deben poder identificarse y excluirse de análisis/recompensas.**
11. **La eliminación es excepcional, controlada y auditable.**
12. **El alumno no se castiga por vencimiento, error o necesidad de ayuda.**

---

## 👤 3. Usuarios, Persona Activa y acceso

### Alumno · nivel `consulta`

Puede, cuando una Misión es visible para él:

- verla en Mi Camino;
- iniciarla;
- abrir la actividad asociada;
- indicar finalización manual cuando el contrato lo requiera;
- consultar trabajo disponible mediante el flujo autorizado;
- recibir mensajes/reconocimientos correspondientes.

No puede:

- acceder a Gestión de Misiones;
- crear/eliminar Misiones;
- modificar objetivos/fechas;
- validar cierre familiar;
- activar Misiones de refuerzo ocultas;
- limpiar datos de prueba;
- concederse Reconocimientos.

### Familia / relación con nivel `gestion`

Puede:

- crear y editar Misiones;
- revisar estados/evidencias;
- validar o reabrir cuando corresponda;
- gestionar visibilidad;
- preparar refuerzos;
- ejecutar herramientas controladas de limpieza/eliminación;
- añadir Reconocimientos según permisos.

### Administrador · `administracion`

Dispone de las capacidades administrativas autorizadas por el modelo global.

La interfaz no sustituye las reglas de seguridad.

---

## 🖥️ 4. Gestión de Misiones

Punto de entrada:

```text
mi-universo/mis-tareas/
```

La experiencia actual agrupa tres grandes áreas:

```text
📋 Misiones
🌱 Observaciones y refuerzos
➕ Preparar misión
```

Capacidades consolidadas:

- listado de Misiones;
- filtros;
- paginación en bloques de 5;
- detalle/auditoría;
- creación/edición;
- Repaso Académico asistido;
- refuerzos de Detectives;
- refuerzos académicos;
- refuerzos de pronunciación;
- Análisis Educativo;
- Reconocimientos/Recompensas;
- consulta de trabajo realizado;
- limpieza de datos de prueba;
- eliminación completa/controlada cuando aplica.

---

## 🧩 5. Tipos de Misión

La implementación mantiene compatibilidad con tipos existentes, entre ellos:

- `actividad_modulo`;
- `tiempo_practica`;
- `cantidad_actividades`;
- `tarea_libre`;
- `tarea_combinada`;
- `repaso_academico`.

No todos los tipos requieren la misma forma de finalización.

### 5.1 Actividad de módulo

Apunta a una experiencia digital de la Academia, por ejemplo Lectura, Detectives o Creciendo por Dentro.

### 5.2 Tiempo / cantidad

Representa un objetivo medible de práctica cuando el módulo/contrato puede darle sentido.

### 5.3 Misión libre

Representa una actividad sin motor digital obligatorio.

Regla:

> **Una Misión libre no debe navegar al menú principal como sustituto de una actividad inexistente.**

Si no existe `destinoUrl` real:

- se muestra la descripción/indicaciones;
- se utiliza finalización manual;
- el alumno confirma `✅ Ya terminé`;
- pasa a revisión familiar.

No se fabrica evidencia digital.

### 5.4 Repaso Académico

Relaciona una Misión con:

```text
cursoReferencia
+ materia
+ tema
+ recurso/actividad
```

Cuando existe catálogo real, la preparación es asistida y la familia no necesita conocer rutas técnicas.

---

## 📘 6. Preparación asistida de Repaso Académico

Flujo implementado:

```text
Tipo = Repaso Académico
↓
Curso de referencia
↓
Materia disponible
↓
Tema real disponible
↓
Ruta/recurso se completa automáticamente
```

Reglas:

1. El catálogo se deriva de contenido navegable real; no mantener una segunda lista curricular desconectada.
2. No mostrar Temas ficticios.
3. Si el recurso heredado no está catalogado, puede mantenerse una salida manual controlada.
4. El administrador no debe copiar rutas técnicas cuando el Tema ya es conocido por la Academia.
5. Nuevos Temas de 6.º deben incorporarse de forma compatible con este flujo.

---

## 🔄 7. Estados

Estados funcionales reconocidos por el producto:

- `pendiente`;
- `en_curso`;
- `pendiente_validacion` / `completada_pendiente_validacion` por compatibilidad;
- `completada`;
- `necesita_ayuda`;
- `vencida`;
- `cancelada`.

Presentación aproximada para el alumno:

| Estado | Presentación |
|---|---|
| `pendiente` | 🌱 Preparada |
| `en_curso` | ▶️ En aventura |
| espera de validación | ⏳ Esperando a mi familia |
| `completada` | ✅ Conseguida |
| `necesita_ayuda` | 🤝 Necesita ayuda / acompañamiento |
| `vencida` | 🌿 Retomable |
| `cancelada` | No se muestra como Misión activa |

La coexistencia de los dos valores de espera es una compatibilidad histórica; una futura normalización de datos debe hacerse explícitamente, no silenciosamente.

---

## ▶️ 8. Inicio y navegación

Al iniciar una Misión con actividad asociada:

```text
pendiente
→ en_curso
→ registrar inicio
→ abrir destino contextual
```

El destino debe recibir contexto suficiente cuando aplique:

- Misión;
- Persona Activa;
- modo;
- retorno/origen.

No crear un sistema de navegación privado si el modelo compartido puede resolverlo.

---

## ✅ 9. Finalización

### 9.1 Automática

Usar cuando el Motor produce evidencia verificable suficiente.

Ejemplos actuales:

- sesiones de Detectives;
- sesiones académicas;
- experiencias integradas de Lectura/Creciendo cuando su contrato lo permite.

Flujo típico:

```text
Motor finaliza
→ persiste sesión/resultado
→ registra/referencia evidencia de Misión
→ Misión pasa al estado de revisión correspondiente
→ familia puede revisar
```

### 9.2 Manual

Usar cuando la Academia no puede verificar digitalmente que la actividad se realizó.

Flujo:

```text
Misión en curso
→ ✅ Ya terminé
→ confirmación del alumno
→ Esperando a mi familia
→ revisión familiar
→ completada o reabierta
```

La finalización manual no debe crear una evidencia falsa.

### 9.3 No redundancia

Si existe una evidencia automática fiable, no añadir `Ya terminé` únicamente por comodidad técnica.

---

## 📎 10. Evidencias

La Misión puede contener una o varias referencias a experiencias realizadas.

Principio:

```text
Misión
→ evidencia resumida/referencia
→ sesión o recurso propietario
```

No:

```text
Misión
→ copia completa de toda la sesión
```

Ejemplos:

- sesión de Detectives;
- `sesion_academica` con `sesionId`;
- sesión de Lectura;
- sesión de Creciendo por Dentro;
- confirmación manual cuando no existe evidencia digital.

La evidencia pertenece al alumno/Persona Activa y debe preservar trazabilidad suficiente.

---

## 👁️ 11. Ver trabajo

Cuando existe trabajo digital consultable, la Misión puede ofrecer:

```text
👁️ Ver trabajo
```

Contrato:

- solo lectura;
- conserva Persona Activa;
- conserva origen/`volver`;
- abre visor especializado cuando existe;
- reutiliza visor general en otros casos;
- no modifica respuestas, sesión ni estado.

Una Misión manual sin trabajo digital no debe mostrar un botón de “Ver trabajo” que conduzca a una pantalla sin evidencia.

Comportamiento propietario:

```text
docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md
```

---

## 🌱 12. Observaciones y refuerzos

La sección de refuerzos reutiliza evidencias reales para preparar nuevas oportunidades de práctica.

### Detectives

Patrón V1:

```text
señal repetida en historias distintas del mismo nivel
→ prioridad por intentos adicionales
→ propuesta
→ preparar Misión
```

### Pruebas académicas

Patrón V1:

```text
sesión académica
→ bloque/foco a reforzar
→ propuesta
→ preparar Repaso Académico
```

### Pronunciación

Patrón V1:

```text
Palabras para Crecer / señales de lectura
→ selección
→ Misión de pronunciación
```

### Visibilidad

Toda Misión creada automáticamente/asistida desde una propuesta de refuerzo se prepara inicialmente con:

```text
visibleParaAlumno = false
```

La familia decide cuándo mostrarla en Mi Camino.

Una Misión oculta de refuerzo no debe poder abrirse/cerrarse saltándose su sesión/evidencia normal.

---

## 📊 13. Análisis Educativo

Gestión de Misiones integra un reporte independiente de análisis de evidencias.

No pertenece a esta especificación su algoritmo detallado.

Propietario:

```text
docs/specifications/SPEC-ANALISIS_EDUCATIVO.md
```

Relación:

```text
Evidencias
→ Análisis Educativo
→ propuesta de actuación
→ familia decide
→ posible Misión
```

Una propuesta no crea automáticamente una Misión visible.

---

## 🧪 14. Datos de prueba

Una Misión/evidencia de prueba debe poder marcarse explícitamente.

Uso:

- filtrar en Gestión;
- excluir de estadísticas/recompensas;
- identificar registros creados durante validaciones técnicas;
- permitir limpieza controlada.

La Academia dispone de herramientas de previsualización/inventario y eliminación de datos de prueba.

La limpieza debe exigir vínculos inequívocos y detenerse ante ambigüedad.

---

## 🗑️ 15. Eliminación controlada

Regla histórica general:

> Las Misiones completadas se conservan normalmente como historial.

Excepción implementada:

> Un adulto autorizado puede eliminar de forma **muy puntual y controlada** una Misión, incluso completada, cuando existe una razón válida (por ejemplo, datos de prueba o registro incorrecto).

La eliminación completa debe:

1. inventariar lo que será eliminado y conservado;
2. identificar sesiones/evidencias exclusivas de esa Misión;
3. no borrar datos compartidos o ambiguos;
4. integrar Reconocimientos vinculados cuando corresponda;
5. requerir confirmación reforzada;
6. mantener trazabilidad/auditoría proporcional.

No crear un segundo motor de borrado para cada nuevo módulo.

---

## 🏅 16. Reconocimientos / Recompensas

Una Misión completada real puede ser fuente de Reconocimiento.

Reglas básicas:

- `esDatoPrueba=true` no produce Recompensa real;
- el alumno no se concede Reconocimientos;
- Reconocimientos humanos se gestionan desde espacio autorizado;
- una Misión reconocida puede mostrar marca `🏅 Recompensa`;
- Gestión dispone de filtro para localizar Misiones relacionadas con Recompensas;
- eliminar una Misión fuente debe revisar dependencias del Reconocimiento.

El diseño propietario vive en:

```text
docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md
```

---

## 🔎 17. Filtros y paginación

La lista de Gestión debe permitir revisar Misiones sin crecer indefinidamente en una sola pantalla.

Capacidades actuales:

- Estado;
- Tipo/Tema/Área según datos disponibles;
- filtros adicionales especializados como Prueba/Recompensa cuando aplican;
- paginación en **bloques de 5**.

Regla:

> Un filtro debe aplicarse al conjunto completo de Misiones antes de paginar; no solo a la página visible.

Cambiar un filtro reajusta la paginación a un estado coherente.

---

## 🔢 18. Orden y visibilidad en Mi Camino

Las Misiones visibles pueden utilizar un orden explícito.

Principios:

- `visibleParaAlumno=false` excluye la Misión del recorrido normal del alumno;
- el orden no debe permitir que una Misión oculta se vuelva ejecutable por accidente;
- fecha límite y prioridad pueden contribuir al orden cuando no existe un orden manual específico;
- el listado familiar puede mostrar Misiones ocultas para permitir su activación.

Mi Camino es el espacio del alumno; Gestión de Misiones no debe filtrarse a él como interfaz administrativa.

---

## 🕵️ 19. Auditoría

Los registros deben conservar, cuando corresponda:

- creación;
- quién creó/asignó;
- última modificación;
- último cambio de estado;
- historial de estados/eventos cuando exista;
- actor de acciones sensibles.

Campos heredados funcionales y campos de auditoría no deben confundirse.

La ampliación de auditoría de Tareas/Misiones continúa como línea técnica específica del Roadmap; esta especificación no inventa una migración masiva.

---

## 🧩 20. Compatibilidad

La V2 mantiene compatibilidad con:

- tipos históricos de Misión;
- valores históricos de estado de validación;
- recursos de 5.º que no producen sesión académica;
- Misiones creadas antes de `sesion-academica-v1`;
- actividades sin evidencia automática.

Regla:

> No fabricar retrospectivamente sesiones/evidencias que nunca existieron.

Si una actividad antigua se ejecuta de nuevo después de incorporar persistencia, esa nueva ejecución puede usar el contrato actual.

---

## ✅ 21. Criterios de aceptación

### Acceso

- [ ] Gestión requiere nivel `gestion` o superior.
- [ ] `consulta` no accede por menú ni por URL directa.
- [ ] Opera sobre Persona Activa correcta.

### Crear/editar

- [ ] Puede preparar una Misión válida.
- [ ] Repaso Académico carga Curso/Materia/Tema real cuando el catálogo existe.
- [ ] URL se completa sin exigir conocimiento técnico.
- [ ] Misión libre sin destino no navega a un módulo genérico.

### Listado

- [ ] Filtros operan sobre todo el conjunto.
- [ ] Paginación muestra 5 por bloque.
- [ ] Cambiar filtros conserva estado coherente.

### Ejecución

- [ ] Misión visible aparece en Mi Camino.
- [ ] Inicio cambia estado y abre destino correcto cuando existe.
- [ ] Finalización automática se usa solo con evidencia fiable.
- [ ] Finalización manual exige confirmación y revisión familiar.

### Evidencia

- [ ] Se referencia la sesión/resultado sin duplicación innecesaria.
- [ ] `Ver trabajo` es solo lectura.
- [ ] Histórico conserva origen/retorno.

### Refuerzo

- [ ] Propuestas se basan en evidencias reales.
- [ ] Misión de refuerzo nace oculta.
- [ ] Familia controla visibilidad.

### Pruebas/eliminación

- [ ] Datos de prueba se identifican y excluyen donde corresponde.
- [ ] Eliminación muestra inventario y bloquea referencias ambiguas.
- [ ] Eliminación completada es una excepción autorizada, no comportamiento normal.

### Seguridad

- [ ] UI y Firestore Rules respetan permisos.
- [ ] No hay rutas de bypass para alumno.

---

## 🛠️ 22. Estado de implementación al 03/09/2026

### ✅ Implementado y validado

- Gestión familiar/administrativa de Misiones;
- restricción de acceso para alumnos;
- listado, filtros y paginación;
- tipos actuales y compatibilidad histórica;
- creación/edición;
- Misión libre con finalización manual;
- Repaso Académico asistido por catálogo real;
- integración de evidencias;
- resultado académico histórico;
- `👁️ Ver trabajo` transversal;
- refuerzos de Detectives;
- refuerzos académicos de Puente/Fracciones;
- refuerzos de pronunciación;
- Análisis Educativo V1;
- marca/filtro de datos de prueba;
- herramientas de limpieza;
- eliminación completa/controlada;
- eliminación puntual de Misión completada;
- integración inicial con Reconocimientos/Recompensas.

### 🔄 Evolución

Las siguientes ampliaciones solo deben implementarse cuando casos reales las justifiquen:

- más tipos de refuerzo;
- recurrencia avanzada;
- permisos profesionales más granulares;
- automatizaciones adicionales;
- auditoría ampliada de entidades educativas;
- nuevos Motores académicos.

---

## 📌 23. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| MIS-001 | Tarea y Misión son dos presentaciones de la misma intención/registro, no dos entidades independientes por defecto. | Aprobada |
| MIS-002 | Gestión es espacio adulto; alumno requiere solo la vista de Mi Camino. | Aprobada / implementada |
| MIS-003 | Finalización automática exige evidencia verificable. | Aprobada / implementada |
| MIS-004 | Sin evidencia fiable, usar finalización manual + revisión familiar. | Aprobada / implementada |
| MIS-005 | Evidencia de Misión referencia experiencia propietaria; no duplica toda la sesión. | Aprobada / implementada |
| MIS-006 | Repaso Académico debe resolver Tema/ruta desde catálogo real cuando sea posible. | Aprobada / implementada |
| MIS-007 | Misión libre sin actividad no navega al menú principal como falso destino. | Aprobada / implementada |
| MIS-008 | Refuerzos preparados nacen ocultos y la familia decide activación. | Aprobada / implementada |
| MIS-009 | Listados usan bloques de 5 y los filtros actúan antes de paginar. | Aprobada / implementada |
| MIS-010 | `Ver trabajo` es consulta de solo lectura y conserva origen. | Aprobada / implementada |
| MIS-011 | Datos de prueba se excluyen de análisis/recompensas y pueden limpiarse de forma controlada. | Aprobada / implementada |
| MIS-012 | Eliminar una Misión completada es una excepción puntual autorizada con confirmación/inventario. | Aprobada / implementada |
| MIS-013 | No fabricar evidencia histórica inexistente. | Aprobada |

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Vista adulta** | Gestión de Misiones · nivel `gestion`+. |
| **Vista alumno** | Mi Camino · Misiones visibles y comprensibles. |
| **Repaso Académico** | Curso/Materia/Tema/ruta asistidos desde contenido real. |
| **Finalización** | Automática con evidencia fiable; manual + revisión cuando no existe. |
| **Evidencia** | Referencia la experiencia real y habilita consulta histórica. |
| **Refuerzo** | Evidencia → propuesta → Misión oculta → decisión familiar. |
| **Histórico** | Solo lectura; no fabrica ni modifica sesiones. |
| **Eliminación** | Excepcional, inventariada, confirmada y segura. |
| **Estado** | Activo · V2 sincronizada con producto real al 03/09/2026. |