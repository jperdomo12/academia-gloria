# 📖 Glosario Oficial
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/standards/STD-GLOSARIO.md` |
| **Versión** | 1.0 |
| **Estado** | Activo |
| **Fecha de origen** | 04/09/2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Terminología Transversal |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Vocabulario estable compartido entre producto, documentación, experiencia, datos y colaboración con IA |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** estructura y mantenimiento del glosario. |
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** propiedad y relación entre fuentes documentales. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna:** actores, dominios y recorrido de experiencia. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** USER, PERSON, Persona Activa, Rol, Relación y niveles de acceso. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Gobierna:** Tarea, Misión, finalización, evidencia y revisión. |
| `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` | **Especifica:** comportamiento funcional actual de Misiones. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna:** Curso, Asignatura, Tema Académico, sesión/evidencia académica y fortalecimiento curricular. |
| `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` | **Gobierna:** Análisis Educativo, observaciones y propuestas derivadas de evidencia. |
| `docs/standards/STD-SEGUIMIENTO_Y_MOTIVACION.md` | **Gobierna:** seguimiento, constancia y motivación. |
| `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` | **Gobierna:** Reconocimiento, Guacamaya y Recompensas. |
| `docs/standards/STD-LIA.md` | **Gobierna:** Lía y acompañamiento inteligente. |
| `docs/standards/STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md` | **Gobierna:** nombres e identificadores de datos. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 04/09/2026 | Product Owner + AI Collaborator | Sustituye el placeholder histórico por el primer glosario oficial. Consolida terminología transversal vigente sin duplicar reglas propietarias y explicita las distinciones críticas USER/PERSON/Persona Activa, Tarea/Misión, Sesión/Evidencia, Reconocimiento/Guacamaya, Vista previa/Histórico y datos reales/de prueba. |

---

## 🎯 1. Propósito

Mantener un vocabulario común para que familia, desarrollo, documentación e IA utilicen los mismos términos con el mismo significado básico.

El glosario responde a una pregunta:

> **¿Qué significa cada término transversal cuando aparece en la Academia?**

No sustituye a los documentos propietarios.

Si una definición breve de este glosario entra en conflicto con una regla detallada del documento propietario, **prevalece el documento propietario** y el glosario debe sincronizarse.

---

## 📐 2. Alcance y reglas de uso

El glosario incluye términos que:

- aparecen en varios módulos o documentos;
- pueden confundirse con conceptos próximos;
- tienen significado específico dentro de la Academia;
- o son necesarios para retomar el proyecto sin depender de conversaciones anteriores.

No pretende incluir:

- todos los nombres de botones;
- cada campo físico de Firestore;
- términos técnicos estándar de JavaScript/Firebase;
- contenido curricular específico;
- nombres temporales de ramas o entregas;
- definiciones clínicas o profesionales externas.

### 2.1 Regla de propiedad

Cada término indica su fuente propietaria principal cuando existe.

El glosario **resume**; el propietario **gobierna**.

### 2.2 Regla de estabilidad

Solo se incorpora un término cuando su significado ya es suficientemente estable.

No convertir ideas exploratorias en vocabulario oficial antes de una decisión real.

---

## 🧭 3. Distinciones críticas

Antes del listado alfabético, estas separaciones deben mantenerse siempre:

```text
USER ≠ PERSON ≠ PERSONA ACTIVA

TAREA / MISIÓN = dos vistas de la misma intención
no dos asignaciones paralelas por defecto

SESIÓN ≠ EVIDENCIA

RECONOCIMIENTO ≠ GUACAMAYA ≠ PUNTOS

VISTA PREVIA ≠ SESIÓN DE APRENDIZAJE

HISTÓRICO = SOLO LECTURA

DATO DE PRUEBA ≠ HECHO EDUCATIVO REAL
```

---

## 📚 4. Glosario

### A

#### **Academia Gloria Valentina**
Producto familiar y educativo que integra aprendizaje, organización, acompañamiento, evidencia, memoria y crecimiento personal en una experiencia coherente.

**Propietario:** `FOUNDATION.md` + Arquitectura de Experiencia.

#### **Actividad**
Acción o experiencia concreta que el alumno puede realizar dentro o fuera de un Motor. Puede formar parte de una Misión o realizarse libremente.

Una Actividad no implica por sí sola que exista evidencia digital.

#### **Actor autenticado / Usuario autenticado**
USER que inició sesión y ejecuta técnicamente una operación.

Es el actor que debe conservarse en campos de auditoría como `createdBy` / `updatedBy` cuando corresponda.

No es necesariamente la Persona Activa.

#### **Alumno**
Persona que vive la experiencia educativa de la Academia.

“Alumno” describe una función/experiencia; no es sinónimo automático de USER, UID ni Persona Activa ajena.

#### **Análisis Educativo**
Capacidad que consume evidencia real para producir descripciones prudentes de fortalezas observadas, aspectos a reforzar, tendencias y posibles actuaciones.

No es diagnóstico, calificación escolar ni perfil psicológico.

**Propietario:** `SPEC-ANALISIS_EDUCATIVO.md`.

#### **Asignatura / Materia**
Nivel de organización curricular dentro de un Curso, por ejemplo Matemáticas, Lengua o Science.

En distintas interfaces/documentos puede aparecer “Materia” o “Asignatura”; ambos representan el mismo nivel conceptual salvo que un contrato específico indique otra cosa.

#### **Aventuras Matemáticas**
Espacio de Mi Universo orientado al razonamiento matemático mediante mundos/experiencias como Detectives de Problemas.

No es el propietario de todo contenido curricular de Matemáticas: los Temas académicos de curso pertenecen a Mis Cursos y al estándar académico.

**Propietario:** `STD-AVENTURAS_MATEMATICAS.md`.

---

### B

#### **Mi Baúl / Baúl**
Espacio personal para conservar contenidos e ideas de valor para la Persona Activa.

No genera por sí mismo Misiones, evidencias, estadísticas ni Recompensas.

---

### C

#### **Constancia**
Continuidad de actividad significativa a lo largo de días reales.

No equivale a login, clic, tiempo de pantalla ni obligación de mantener una racha perfecta.

**Propietario:** `STD-SEGUIMIENTO_Y_MOTIVACION.md` y diseño de Motivación/Reconocimiento.

#### **Consulta**
Nivel de acceso transversal básico.

No significa “solo lectura global”: una Persona puede realizar operaciones propias de producto autorizadas por cada módulo.

**Propietario:** `STD-USUARIOS_ROLES_Y_ACCESOS.md`.

#### **Curso de referencia**
Curso escolar al que pertenece o con el que se relaciona un Tema/Repaso Académico, por ejemplo `6.º`.

Forma parte de la identidad curricular junto con Materia y Tema.

---

### D

#### **Dato de prueba / `🧪`**
Dato que recorre flujos reales para validar funcionalidad pero está marcado explícitamente para no convertirse en hecho educativo real.

Debe excluirse, cuando corresponda, de constancia, Reconocimientos, análisis y conclusiones sobre el alumno.

No se identifica por heurísticas de fecha o título.

---

### E

#### **Evidencia**
Registro resumido o referencia trazable que demuestra qué experiencia se realizó y permite llegar al resultado/sesión propietario cuando existe.

La evidencia no debe duplicar innecesariamente toda la sesión.

#### **Evidencia académica**
Resultado estructurado de una ejecución académica que conserva datos útiles de aprendizaje aunque no exista Misión.

En nuevos Temas de 6.º debe ser reutilizable por histórico, Trabajo realizado y Análisis Educativo.

**Propietario:** `STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`.

#### **Evidencia de Misión**
Evidencia vinculada a una Misión concreta.

Cuando la experiencia propietaria ya guarda una Sesión, la evidencia de Misión normalmente la referencia mediante identificador en lugar de copiarla completa.

**Propietario:** estándares/especificación de Misiones.

#### **Estado de Misión**
Situación funcional de una Misión (`pendiente`, `en_curso`, espera de validación, `completada`, `necesita_ayuda`, etc.).

Los nombres físicos y compatibilidades exactas pertenecen al estándar/especificación de Misiones.

---

### F

#### **Fortalecimiento / Refuerzo**
Nueva oportunidad de aprendizaje dirigida a una necesidad observada.

Debe ser específica y proporcional; no implica repetir un Tema completo cuando el foco está localizado.

Una propuesta de refuerzo no se convierte automáticamente en Misión sin el control humano definido por el dominio.

---

### G

#### **Gestión**
Nivel de acceso/capacidad adulta para gestionar determinadas funciones sobre Personas autorizadas cuando el módulo lo permite.

No es un CRUD universal.

**Propietario:** `STD-USUARIOS_ROLES_Y_ACCESOS.md`.

#### **Guacamaya**
Hito especial, permanente y de alto significado dentro del Sistema de Motivación y Reconocimiento.

No es moneda, nivel, punto, catálogo obligatorio ni indicador de perfección.

**Propietario:** diseño de Motivación y Reconocimiento.

---

### H

#### **Historial / Histórico**
Consulta de una ejecución o dato ya existente.

Cuando se abre una experiencia histórica, la operación debe ser de **solo lectura**: no crea una nueva sesión, no modifica respuestas y no cambia progreso.

#### **Documento histórico**
Documento preservado en `docs/history/` porque fue sustituido, dejó de gobernar o representa una fotografía anterior.

No es fuente activa cuando existe un sucesor vigente.

**Propietario:** Arquitectura Documental.

---

### I

#### **Insumo**
Información ya interpretada con suficiente prudencia para apoyar una decisión o posible acción.

En el ciclo educativo puede aparecer como:

```text
Datos → Observaciones → Insumos → Acciones
```

No toda observación debe convertirse en acción.

---

### L

#### **Lía**
Personaje Oficial de acompañamiento inteligente.

Puede orientar, ayudar gradualmente y reconocer hechos cuando la evidencia los demuestra.

No es toda la IA de la Academia, no sustituye familia/profesionales y su representación gráfica única todavía no está consolidada.

**Propietario:** `STD-LIA.md` + Identidad Visual para su representación.

---

### M

#### **Material escolar**
Fuente aportada por colegio/familia que define el alcance académico prioritario para construir o adaptar un Tema.

La Academia puede enriquecerlo, pero no sustituir silenciosamente lo que el colegio necesita que el alumno reconozca.

#### **Mi Camino**
Espacio principal del alumno para ver y vivir sus Misiones, continuidad y crecimiento de forma comprensible y motivadora.

No es la pantalla administrativa de Gestión de Misiones.

#### **Mis Cursos**
Espacio curricular organizado principalmente como:

```text
Curso → Asignatura/Materia → Tema
```

Es el hogar natural de Temas académicos de curso.

#### **Misión**
Presentación educativa/motivadora de una asignación o intención de trabajo para el alumno.

Tarea y Misión son dos vistas del mismo registro/intención, no dos entidades paralelas por defecto.

**Propietario:** `STD-MIS_TAREAS_Y_MISIONES.md`.

#### **Misión libre**
Misión sin una actividad digital obligatoria asociada.

Puede cerrarse mediante confirmación manual + revisión familiar y no debe fabricar evidencia digital inexistente.

#### **Motor de Aprendizaje**
Mecánica reutilizable que produce una experiencia de aprendizaje y, cuando corresponde, sesiones/evidencia.

El Motor no debe confundirse con un Tema o contenido curricular específico.

**Propietario conceptual:** `MODEL_MOTORES_DE_APRENDIZAJE.md`.

---

### N

#### **Nivel de acceso**
Escala transversal que limita capacidades del Usuario sobre una Persona/contexto.

Valores actuales:

```text
consulta
gestion
administracion
```

El nivel no sustituye las reglas específicas de cada módulo.

**Propietario:** `STD-USUARIOS_ROLES_Y_ACCESOS.md`.

---

### O

#### **Observación**
Interpretación descriptiva y prudente de uno o varios datos observables.

Debe distinguirse del dato bruto y de una conclusión permanente sobre la Persona.

---

### P

#### **PERSON / Persona**
Persona real representada en el modelo de identidad.

Su identificador estable es `personaId`.

No es lo mismo que USER.

**Propietario:** `STD-USUARIOS_ROLES_Y_ACCESOS.md`.

#### **PERSON_RELATION / Relación**
Vínculo autorizado entre dos Personas que puede limitar el acceso efectivo sobre otra Persona.

Una Relación no eleva por sí sola la capacidad concedida por el Rol.

#### **Persona Activa**
Persona sobre la que opera funcionalmente la experiencia en ese momento.

Puede ser la Persona propia del Usuario autenticado o una Persona relacionada autorizada.

Cambiar Persona Activa **no es impersonar** al otro Usuario: la identidad autenticada y la auditoría permanecen intactas.

#### **Progreso**
Representación de avance sustentada por actividad real y un significado claro.

No equivale automáticamente a nota, porcentaje, rapidez, tiempo conectado o comparación con otros.

#### **Propuesta de actuación / refuerzo**
Sugerencia derivada de evidencia/observación suficiente para que una Persona con autoridad humana decida si conviene actuar.

Propuesta no significa ejecución automática.

---

### R

#### **Reconocimiento**
Mensaje o hito que conserva un hecho concreto y valioso del proceso de aprendizaje o crecimiento.

Puede ser humano o, en reglas muy controladas, derivado automáticamente por Lía.

No es pago por obediencia ni punto acumulable.

#### **Recompensa**
Término de experiencia que agrupa capacidades de Motivación/Reconocimiento actualmente visibles en el producto.

No debe interpretarse como economía de puntos, tienda o premio transaccional.

#### **Repaso Académico**
Tipo de Misión vinculado a un recurso curricular mediante:

```text
Curso de referencia + Materia + Tema + recurso/actividad
```

La preparación debe reutilizar el catálogo real para evitar que la familia tenga que conocer rutas técnicas.

#### **Revisión familiar**
Intervención humana posterior a una Misión/actividad cuando el contrato exige validar, contextualizar, reabrir o reconocer el trabajo.

No todas las actividades requieren la misma revisión.

#### **ROLE / Rol**
Capacidad general asignada a un USER.

Rol y nivel de acceso están relacionados pero no son exactamente el mismo concepto.

**Propietario:** `STD-USUARIOS_ROLES_Y_ACCESOS.md`.

---

### S

#### **Sesión**
Registro de una ejecución real de una experiencia.

Puede contener respuestas, intentos, resultados, ayudas u otros datos según el Motor.

No es sinónimo de Evidencia: la Evidencia puede referenciar la Sesión.

#### **Sesión académica**
Sesión estructurada producida por un Tema/actividad académica mediante el contrato compartido vigente (`sesion-academica-v1`).

Puede existir tanto en acceso libre como desde una Misión.

---

### T

#### **Tarea**
Vista administrativa/familiar de la misma asignación que el alumno vive como Misión.

Conserva detalles de gestión que no necesariamente se muestran en Mi Camino.

#### **Tema Académico**
Unidad curricular navegable dentro de un Curso y una Materia.

Un Tema puede incluir teoría, recursos, práctica, comprobación y evidencia, pero no está obligado a usar una plantilla visual idéntica a otros Temas.

**Propietario:** `STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`.

#### **Trabajo realizado**
Forma humana de presentar a familia/alumno el trabajo/evidencia ya generado por una experiencia.

No es una nueva colección de datos: reutiliza la evidencia y la sesión propietaria.

#### **Ver trabajo**
Acción que abre el visor apropiado de Trabajo realizado cuando existe evidencia consultable.

La vista es de solo lectura y conserva contexto/retorno.

---

### U

#### **USER / Usuario**
Identidad de acceso de la Academia.

Su `userId` actual corresponde al UID de Firebase Authentication.

Puede estar asociado a una PERSON mediante `personaId`.

**Propietario:** `STD-USUARIOS_ROLES_Y_ACCESOS.md`.

---

### V

#### **Vista previa**
Modo para consultar/probar una experiencia sin producir historial educativo real.

Regla transversal cuando aplica:

> **Vista previa no guarda sesión, evidencia, progreso ni cambio de estado.**

No debe utilizarse como forma oculta de ejecutar una Misión real.

---

## 🔁 5. Sinónimos y términos preferidos

| Evitar como término ambiguo | Preferir | Motivo |
|---|---|---|
| “usuario” cuando se habla de persona real | `Persona / PERSON` | USER es identidad de acceso. |
| “usuario seleccionado” | `Persona Activa` | Describe el contexto sin sugerir impersonación. |
| “premio/puntos” para cualquier reconocimiento | `Reconocimiento` o `Guacamaya` | Preserva significado no transaccional. |
| “resultado” cuando se quiere el registro completo | `Sesión` | Resultado puede ser solo una parte de la ejecución. |
| “evidencia” como copia completa de sesión | `Evidencia → referencia a Sesión` | Evita duplicidad. |
| “solo lectura” como definición de `consulta` | `nivel consulta` | El nivel puede permitir operaciones propias del módulo. |
| “examen” para toda comprobación académica | `prueba / comprobación` | La Academia no convierte todo aprendizaje en evaluación formal. |

---

## ✅ 6. Quality Gate del vocabulario

Antes de añadir o cambiar un término oficial:

- [ ] Aparece en más de un contexto o necesita desambiguación real.
- [ ] Su significado es suficientemente estable.
- [ ] Tiene propietario documental cuando corresponde.
- [ ] La definición no duplica reglas detalladas del propietario.
- [ ] No contradice código/producto real cuando describe estado actual.
- [ ] Se diferencia explícitamente de conceptos cercanos.
- [ ] No convierte una idea futura en capacidad implementada.

---

## 🔄 7. Mantenimiento

Actualizar este glosario cuando:

- aparece un nuevo término transversal estable;
- cambia materialmente el significado de uno existente;
- se detecta una ambigüedad recurrente;
- un documento propietario sustituye terminología anterior.

No actualizarlo por cada nombre local de interfaz.

La revisión debe comenzar por el documento propietario y después sincronizar el resumen del término.

---

## 📌 8. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| GLO-001 | El glosario resume terminología; no sustituye documentos propietarios. | Aprobada |
| GLO-002 | USER, PERSON y Persona Activa son conceptos distintos. | Aprobada |
| GLO-003 | Tarea y Misión son dos vistas de la misma intención/registro por defecto. | Aprobada |
| GLO-004 | Sesión y Evidencia no son sinónimos. | Aprobada |
| GLO-005 | Reconocimiento y Guacamaya no constituyen una economía de puntos. | Aprobada |
| GLO-006 | Vista previa no produce historial real y consulta histórica es solo lectura. | Aprobada |
| GLO-007 | Datos `🧪` no se interpretan como hechos educativos reales. | Aprobada |
| GLO-008 | El glosario incorpora solo términos estables y transversales. | Aprobada |

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Activo |
| **Versión** | 1.0 |
| **Fecha** | 04/09/2026 |
| **Regla principal** | Una palabra transversal debe significar lo mismo en toda la Academia; la regla detallada vive en su documento propietario. |
