# 🌈 Mis Tareas y Misiones
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` |
| **Código** | STD-011 |
| **Versión** | 2.0 |
| **Estado** | Activo |
| **Fecha de origen** | Julio 2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Estándares de Gestión de Misiones |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Reglas transversales de Tareas/Misiones, acceso, visibilidad, ejecución, finalización, evidencia, revisión, histórico, refuerzo, datos de prueba y conservación |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Gobierna:** propósito humano, dignidad, autonomía y acompañamiento. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna/complementa:** posición de Misiones dentro de la experiencia global y separación entre espacios adulto/alumno. |
| `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` | **Implementa/especifica:** comportamiento funcional vigente de Gestión de Misiones y Mi Camino. |
| `docs/models/MODELO_MISIONES.md` | **Modela:** conceptos y relaciones del dominio; no sustituye este estándar ni la especificación vigente. |
| `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md` | **Especifica:** consulta histórica y visualización de trabajo/evidencia. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna/complementa:** contratos académicos, sesiones y evidencia reutilizable de Temas. |
| `docs/standards/STD-SEGUIMIENTO_Y_MOTIVACION.md` | **Gobierna/complementa:** seguimiento basado en evidencia y motivación no punitiva. |
| `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` | **Diseña:** Reconocimientos, Guacamayas y demás mecanismos de Motivación. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** roles, relaciones, Persona Activa y niveles de acceso. |
| `docs/history/STD-CIERRE_Y_REFLEXION_DE_MISIONES.md` | **Histórico:** conserva la propuesta STD-012 original como contexto; no constituye fuente normativa vigente ni redefine finalización, evidencia o revisión. |
| `compartido/api/academia.js` | **Implementa:** API compartida actual del dominio de Tareas/Misiones. |
| `mi-universo/mis-tareas/` | **Implementa:** Gestión familiar/administrativa. |
| `mi-universo/mi-camino/` | **Implementa:** presentación y ejecución para el alumno. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 2.0 | 04/09/2026 | Product Owner + AI Collaborator | Aprobación del Product Owner y activación de STD-011 v2.0 como fuente normativa transversal vigente del dominio de Misiones. |
| 2.0-rc1 | 04/09/2026 | Product Owner + AI Collaborator | Sincronización P1 con el producto real y `SPEC-MIS_TAREAS_Y_MISIONES` v2.0. Consolida Tarea/Misión como dos vistas de la misma intención, Persona Activa, acceso `gestion`, visibilidad, Repaso Académico, Misiones libres, finalización automática/manual, evidencia referenciada, histórico/preview sin escrituras, refuerzos familiares, datos de prueba y eliminación controlada. Retira obligaciones antiguas no implementadas como Diario automático, Panel de Evolución obligatorio, desaparición imposible y versionado universal de cada modificación. |
| 1.1 | Agosto 2026 | Equipo del proyecto | Formalizó finalización manual, confirmación del alumno, revisión familiar y separación entre cierre automático y manual. |
| 1.0 | Julio 2026 | Equipo del proyecto | Definición inicial del sistema de Tareas, Misiones y Seguimiento. |

---

## 🎯 1. Propósito

Este estándar responde a una pregunta principal:

> **¿Qué reglas deben mantenerse estables para que la familia pueda organizar actividades y el alumno pueda vivirlas como Misiones claras, motivadoras, seguras y trazables?**

La Academia necesita dos perspectivas sobre una misma intención:

```text
ESPACIO ADULTO
organizar · decidir · revisar · acompañar

              ↕ misma intención / mismo registro

ESPACIO DEL ALUMNO
comprender · comenzar · realizar · continuar · celebrar
```

El objetivo no es disfrazar deberes con decoración.

Es reducir complejidad para el alumno sin perder control, evidencia ni contexto para la familia.

---

## 🧭 2. Principio central

> **La familia gestiona; el alumno vive la Misión.**

Una Tarea y una Misión **no son por defecto dos entidades diferentes**.

Son dos formas de presentar y operar sobre la misma asignación:

- **Tarea / asignación:** lenguaje administrativo o técnico cuando resulta útil;
- **Misión:** lenguaje visible para el alumno.

El código y los datos pueden conservar nombres históricos como `tarea` cuando renombrarlos no aporta valor suficiente.

La interfaz del alumno debe utilizar **Misión** y evitar complejidad administrativa innecesaria.

---

## 📐 3. Alcance y fronteras

Este estándar gobierna reglas transversales sobre:

- terminología;
- Persona Activa;
- acceso y separación de espacios;
- tipos compatibles de Misión;
- visibilidad;
- inicio y contexto de ejecución;
- finalización automática y manual;
- revisión familiar;
- evidencia;
- consulta histórica;
- refuerzos y propuestas;
- datos de prueba;
- conservación y eliminación controlada;
- compatibilidad histórica;
- y límites de motivación.

No define en detalle:

- campos físicos completos de cada documento Firestore;
- HTML/CSS de cada pantalla;
- algoritmos de Análisis Educativo;
- reglas particulares de cada Motor de Aprendizaje;
- mecánica de Recompensas;
- diseño completo de cierre/reflexión;
- ni rutas técnicas que ya pertenezcan a una especificación o implementación propietaria.

La especificación funcional puede evolucionar con más detalle siempre que no contradiga estas reglas transversales.

---

## ✅ 4. Reglas no negociables

1. **Persona Activa determina sobre qué alumno se opera.**
2. **Gestión de Misiones es un espacio adulto y requiere nivel `gestion` o superior.**
3. **El alumno no accede a Gestión por menú ni por URL directa.**
4. **La UI nunca sustituye las reglas de seguridad.**
5. **Una Misión visible debe ser comprensible sin conocer detalles técnicos.**
6. **La finalización automática solo se usa cuando existe evidencia suficientemente fiable.**
7. **Sin evidencia fiable, la finalización es manual, confirmada por el alumno y revisable por la familia.**
8. **No se fabrica evidencia digital para simular que una actividad ocurrió.**
9. **Una evidencia referencia la experiencia propietaria; no copia innecesariamente toda la sesión dentro de la Misión.**
10. **Vista previa no persiste actividad, sesión, evidencia ni progreso.**
11. **Vista histórica/consulta es de solo lectura.**
12. **Una Misión libre sin actividad digital no navega a un módulo genérico como falso destino.**
13. **Las propuestas de refuerzo no se convierten automáticamente en Misiones visibles para el alumno.**
14. **Los datos de prueba se identifican y se excluyen de conclusiones/recompensas reales.**
15. **Una Misión completada se conserva normalmente como historial, pero puede eliminarse excepcionalmente mediante un proceso adulto, controlado y seguro.**
16. **Vencimiento, error o necesidad de ayuda no producen castigo, pérdida de progreso ni lenguaje punitivo.**
17. **No se fabrican retrospectivamente sesiones o evidencias que nunca existieron.**
18. **Se reutilizan navegación, contexto, API y seguridad compartidos antes de crear mecanismos paralelos.**

---

## 👤 5. Usuarios, Persona Activa y acceso

### 5.1 Alumno · nivel `consulta`

Cuando una Misión es visible y ejecutable para él, el alumno puede:

- verla en Mi Camino;
- comprender qué debe hacer;
- iniciarla o continuarla;
- abrir su actividad real cuando existe;
- utilizar finalización manual cuando corresponde;
- consultar trabajo histórico autorizado;
- recibir el acompañamiento y reconocimiento definidos por otros dominios.

No puede:

- acceder a Gestión de Misiones;
- crear o eliminar Misiones;
- cambiar objetivos o fechas administrativas;
- validar su propio cierre familiar;
- activar refuerzos ocultos;
- limpiar datos de prueba;
- concederse Reconocimientos.

### 5.2 Familia / relación con nivel `gestion`

Puede, dentro de sus permisos:

- preparar y editar Misiones;
- decidir visibilidad;
- revisar estados y evidencias;
- validar o reabrir cuando corresponda;
- preparar refuerzos;
- ejecutar herramientas adultas autorizadas de limpieza/eliminación;
- aportar contexto y Reconocimientos cuando el dominio correspondiente lo permita.

### 5.3 Administración

`administracion` dispone de las capacidades autorizadas por el modelo global de usuarios y accesos.

### 5.4 Persona Activa

Toda operación debe conservar la Persona Activa correcta durante:

- Gestión;
- Mi Camino;
- navegación a un Motor;
- consulta de trabajo;
- retorno al origen;
- análisis/refuerzo;
- acciones adultas sensibles.

No se debe inferir el alumno únicamente a partir del usuario autenticado cuando el modelo de Persona Activa ya dispone del contexto correcto.

---

## 🧩 6. Tipos de Misión y compatibilidad

La Academia mantiene compatibilidad con tipos históricos y vigentes, entre ellos:

- `actividad_modulo`;
- `tiempo_practica`;
- `cantidad_actividades`;
- `tarea_libre`;
- `tarea_combinada`;
- `repaso_academico`.

La existencia de un tipo no obliga a que todas las Misiones compartan los mismos campos, evidencia o forma de cierre.

Los contratos físicos detallados pertenecen a la especificación/modelo y a la implementación vigente.

### 6.1 Misión con actividad digital

Debe apuntar a una experiencia real de la Academia y conservar contexto suficiente para vincular ejecución y Misión cuando corresponda.

### 6.2 Misión libre

Representa una actividad que puede realizarse fuera de un Motor digital.

Si no existe una actividad real asociada:

- se muestran título, descripción e indicaciones;
- no se inventa una URL;
- no se envía al menú principal para simular ejecución;
- se utiliza finalización manual;
- no se ofrece un visor de trabajo digital inexistente.

### 6.3 Repaso Académico

Cuando el contenido está catalogado por la Academia, la preparación debe partir del contenido real:

```text
Curso de referencia
→ Materia
→ Tema real
→ recurso/actividad real
```

La familia no debe conocer ni copiar rutas técnicas que la Academia ya puede resolver.

No se mantendrá una segunda lista curricular desconectada únicamente para alimentar Misiones.

Una salida manual controlada puede conservar compatibilidad con recursos heredados todavía no catalogados.

---

## 🔄 7. Estados y ciclo de vida

El producto reconoce actualmente estados como:

- `pendiente`;
- `en_curso`;
- `pendiente_validacion`;
- `completada_pendiente_validacion` como compatibilidad histórica;
- `completada`;
- `necesita_ayuda`;
- `vencida`;
- `cancelada`.

La coexistencia de nombres históricos no autoriza una migración silenciosa de datos.

### 7.1 Presentación para el alumno

La presentación debe traducir el estado a lenguaje comprensible y no administrativo.

Conceptualmente:

| Estado | Sentido para el alumno |
|---|---|
| `pendiente` | Misión preparada |
| `en_curso` | Aventura en curso |
| espera de validación | Esperando a mi familia |
| `completada` | Misión conseguida |
| `necesita_ayuda` | Podemos pedir ayuda |
| `vencida` | Podemos retomarla |
| `cancelada` | No forma parte del recorrido activo |

### 7.2 Vencimiento

`vencida` es una señal de organización, no un castigo.

No debe producir:

- culpa;
- pérdida de Recompensas;
- pérdida de progreso ya realizado;
- mensajes de fracaso;
- ni bloqueo automático injustificado de una actividad que la familia puede decidir retomar.

---

## 👁️ 8. Visibilidad

Mi Camino muestra únicamente las Misiones que corresponden al recorrido normal del alumno.

Cuando existe el atributo de visibilidad vigente:

```text
visibleParaAlumno = false
```

la Misión queda fuera de ese recorrido hasta decisión adulta.

Reglas:

- una Misión oculta puede seguir siendo visible en Gestión;
- estar oculta no equivale a estar eliminada;
- el orden no puede hacer ejecutable accidentalmente una Misión oculta;
- una propuesta de refuerzo nace oculta por defecto;
- la familia decide cuándo incorporarla a Mi Camino.

---

## ▶️ 9. Inicio, navegación y contexto

Al comenzar una Misión con actividad real, el sistema debe:

1. conservar la Persona Activa;
2. identificar la Misión;
3. registrar el inicio cuando corresponda;
4. abrir el destino contextual correcto;
5. permitir un retorno coherente.

El identificador de Misión puede transportarse por URL u otro mecanismo compartido definido por la implementación.

Este estándar no obliga a una sintaxis técnica única mientras el contexto sea inequívoco y trazable.

### 9.1 Práctica libre

Una actividad realizada fuera del contexto de una Misión puede seguir siendo una experiencia válida de aprendizaje.

No debe adjudicarse retrospectivamente a una Misión activa únicamente porque “parece corresponder”.

### 9.2 Navegación compartida

No se debe crear un sistema privado de navegación/retorno para cada Motor si el modelo compartido ya puede resolver:

- Persona Activa;
- origen;
- destino;
- retorno;
- modo de consulta/ejecución.

---

## ✅ 10. Finalización de Misiones

Existen dos mecanismos: **automático** y **manual**.

La regla transversal es:

> **Si la Academia puede verificar objetivamente que el criterio se cumplió, utiliza finalización automática. Si no puede saberlo con suficiente fiabilidad, utiliza finalización manual con confirmación del alumno y revisión familiar.**

### 10.1 Finalización automática

Corresponde cuando un Motor produce y persiste evidencia suficiente.

Flujo conceptual:

```text
Motor realiza/finaliza experiencia
→ persiste sesión o resultado real
→ registra o referencia evidencia de la Misión
→ actualiza el estado de revisión correspondiente
→ familia puede revisar cuando el contrato lo requiere
```

No debe mostrarse `✅ Ya terminé` como segundo mecanismo redundante cuando el cierre automático ya es fiable.

### 10.2 Finalización manual

Corresponde cuando la Academia no puede verificar digitalmente la realización.

Flujo conceptual:

```text
Misión en curso
→ ✅ Ya terminé
→ confirmación explícita del alumno
→ Esperando a mi familia
→ revisión familiar
→ completada o reabierta
```

La confirmación debe dejar claro que la Misión se enviará a revisión cuando así funcione el contrato.

La alternativa debe permitir continuar trabajando sin penalización.

### 10.3 Lo que la finalización manual NO hace

No debe:

- fabricar una sesión;
- inventar una evidencia digital;
- navegar a un módulo genérico;
- marcar como “trabajo consultable” algo que no existe;
- omitir la revisión familiar cuando el contrato la exige.

### 10.4 Selección del mecanismo

La selección automática/manual se define por **capacidad de verificación**, no por comodidad de implementación.

---

## 📎 11. Evidencia

La evidencia representa o referencia algo que realmente ocurrió.

Principio:

```text
Misión
→ referencia/resumen de evidencia
→ sesión, resultado o recurso propietario
```

Evitar:

```text
Misión
→ copia completa de toda la experiencia
```

La evidencia debe:

- pertenecer a la Persona Activa correcta;
- conservar trazabilidad suficiente;
- vincularse a la Misión cuando la ejecución procede de ella;
- permitir consulta posterior cuando exista un visor autorizado;
- conservar la fuente propietaria de los datos.

No todas las Misiones producen los mismos indicadores.

No se inventarán duración, intentos, ayudas, precisión u otras métricas si el Motor no las registra.

---

## 🕰️ 12. Vista previa, histórico y “Ver trabajo”

### 12.1 Vista previa

Una Vista previa existe para validar una experiencia sin contaminar datos reales.

No persiste:

- sesión;
- evidencia;
- progreso;
- finalización;
- Recompensas;
- actividad educativa real.

### 12.2 Histórico

La consulta histórica es **solo lectura**.

No debe:

- recalcular el progreso por el hecho de abrirse;
- crear una nueva sesión;
- modificar respuestas;
- volver a conceder reconocimientos;
- cambiar el estado de la Misión.

### 12.3 Ver trabajo

`👁️ Ver trabajo` se ofrece únicamente cuando existe trabajo digital consultable.

Debe:

- conservar Persona Activa;
- conservar origen/retorno;
- reutilizar el visor especializado o general vigente;
- operar en modo de consulta;
- no persistir cambios.

Una Misión manual sin evidencia digital no debe mostrar un falso `Ver trabajo`.

El comportamiento detallado pertenece a `SPEC-REVISION_TRABAJO_REALIZADO.md`.

---

## 👨‍👩‍👧 13. Revisión familiar

Cuando una Misión pasa a espera de validación, la confirmación del alumno **no equivale todavía a cierre definitivo**.

La familia puede, según el contrato funcional vigente:

- revisar evidencia disponible;
- confirmar el cierre;
- reabrir para continuar;
- añadir observación/contexto cuando corresponda;
- realizar acciones adultas autorizadas.

La revisión debe acompañar, no convertir cada actividad en un examen familiar.

El diseño detallado de reflexión/cierre pertenece a su documento específico y no debe asumirse implementado por este estándar.

---

## 🌱 14. Observaciones, Análisis y refuerzos

Las evidencias pueden alimentar procesos separados de observación y análisis.

El patrón transversal es:

```text
Evidencia real
→ observación/análisis prudente
→ propuesta de actuación
→ decisión familiar
→ posible Misión
```

No:

```text
señal aislada
→ Misión visible automática para el alumno
```

### 14.1 Refuerzos

Una Misión preparada desde una propuesta de refuerzo debe nacer oculta mientras la familia decide su uso.

La propuesta no debe:

- etiquetar al alumno;
- castigar un error;
- fabricarse con datos de prueba;
- hacerse visible automáticamente;
- saltarse el flujo normal de ejecución/evidencia.

### 14.2 Análisis Educativo

El algoritmo y presentación pertenecen a `SPEC-ANALISIS_EDUCATIVO.md`.

Este estándar solo exige que cualquier acción derivada conserve:

- evidencia real;
- prudencia interpretativa;
- decisión humana cuando corresponda;
- Persona Activa y permisos.

---

## 🧪 15. Datos de prueba

Los registros creados para validación técnica deben poder distinguirse de la actividad educativa real.

Cuando el contrato utiliza:

```text
esDatoPrueba = true
```

ese dato no debe producir:

- Recompensas reales;
- conclusiones educativas;
- estadísticas reales contaminadas;
- decisiones automáticas sobre el alumno.

Las herramientas de limpieza deben operar con confirmación y vínculos inequívocos.

Ante una relación ambigua, es preferible detener el borrado que eliminar información real por inferencia.

---

## 🗑️ 16. Conservación y eliminación controlada

### 16.1 Regla general

Las Misiones completadas se conservan normalmente como parte del historial del alumno.

### 16.2 Excepción

Un adulto autorizado puede eliminar puntualmente una Misión —incluso completada— cuando existe una razón válida, por ejemplo:

- dato de prueba;
- registro incorrecto;
- duplicado inequívoco;
- corrección administrativa justificada.

### 16.3 Condiciones de seguridad

La eliminación debe, según corresponda:

- inventariar qué se eliminará y qué se conservará;
- identificar dependencias;
- eliminar únicamente datos exclusivos inequívocos;
- proteger sesiones/evidencias compartidas o ambiguas;
- revisar Reconocimientos vinculados;
- exigir confirmación reforzada;
- conservar trazabilidad proporcional de la acción.

No se crea un motor de borrado independiente para cada módulo si existe una capacidad transversal reutilizable.

### 16.4 Regla retirada de v1.1

Ya no es normativa la afirmación absoluta:

> “Una tarea nunca desaparece.”

La regla correcta es **conservación por defecto + eliminación excepcional controlada**.

---

## ✨ 17. Motivación y Reconocimientos

Una Misión debe ser motivadora, pero no necesita producir una Recompensa por el simple hecho de completarse.

La presentación debe:

- reconocer esfuerzo/proceso cuando exista fundamento;
- evitar lenguaje escolar punitivo;
- normalizar pedir ayuda;
- permitir retomar;
- evitar rankings y comparación con otros alumnos.

La mecánica de Reconocimientos/Recompensas pertenece a `DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` y `STD-SEGUIMIENTO_Y_MOTIVACION.md`.

Reglas de frontera:

- una Misión real completada **puede** ser fuente de Reconocimiento;
- una Misión de prueba no produce Recompensa real;
- el alumno no se concede Reconocimientos;
- eliminar una Misión fuente exige revisar dependencias del Reconocimiento;
- ninguna Recompensa debe convertirse en pago automático por obediencia.

---

## 🔐 18. Seguridad, auditoría y cambios

### 18.1 Seguridad

Toda operación sensible debe ser coherente en:

- UI;
- API;
- Firestore Rules;
- Persona Activa;
- nivel de acceso.

Ocultar un botón no equivale a proteger una operación.

### 18.2 Auditoría

Los registros deben conservar auditoría proporcional **cuando el contrato/implementación correspondiente la soporte**, especialmente para:

- creación/asignación;
- modificación relevante;
- cambios de estado;
- eliminación;
- acciones adultas sensibles.

Este estándar no afirma que exista versionado completo e inmutable de cada modificación histórica.

### 18.3 Regla retirada de v1.1

Ya no son obligaciones universales:

> “Toda modificación queda registrada.”

> “Las versiones anteriores permanecerán disponibles.”

La auditoría debe ampliarse de forma explícita y controlada donde exista necesidad real, no documentarse como implementada antes de estarlo.

---

## 🧬 19. Compatibilidad histórica

La Academia conserva actividad previa sin inventar datos que no existían.

Debe admitirse compatibilidad con:

- tipos históricos de Misión;
- alias históricos del estado de validación;
- actividades de 5.º que no generaban sesiones académicas estructuradas;
- Misiones anteriores a contratos de persistencia actuales;
- actividades sin evidencia automática.

Regla:

> **No fabricar retrospectivamente sesiones/evidencias para hacer parecer que el pasado utilizaba el contrato actual.**

Si una actividad heredada se ejecuta nuevamente después de incorporar persistencia, esa **nueva ejecución** puede utilizar el contrato vigente.

Las normalizaciones de campos/estados requieren una migración explícita, revisable y justificada.

---

## 🧱 20. Arquitectura y datos

### 20.1 Fuente única de reglas

Este documento es la fuente normativa transversal del dominio.

- `SPEC-MIS_TAREAS_Y_MISIONES.md` especifica el comportamiento concreto;
- `MODELO_MISIONES.md` describe conceptos/relaciones;
- el código implementa contratos físicos;
- otros estándares gobiernan sus propios dominios.

No debe copiarse la misma regla normativa en múltiples documentos con formulaciones divergentes.

### 20.2 Módulos/Motores

Los Motores registran su experiencia y evidencia.

No deben crear arbitrariamente nuevas Tareas/Misiones por su cuenta salvo que exista un flujo de producto autorizado.

La Gestión de Misiones interpreta el contexto de Misión y coordina el ciclo correspondiente mediante capacidades compartidas.

### 20.3 Datos mínimos

No existe una lista universal de campos que toda Misión deba completar aunque no apliquen.

Cada contrato debe conservar solo la información necesaria para:

- identificar alumno/Persona Activa;
- expresar la intención;
- controlar estado/visibilidad;
- ejecutar o describir la actividad;
- relacionar evidencia cuando exista;
- mantener trazabilidad suficiente.

Los nombres de nuevos atributos deben respetar `STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md`.

---

## 🚫 21. Supuestos retirados de versiones anteriores

La v2.0 deja explícitamente de tratar como reglas vigentes las siguientes afirmaciones antiguas:

1. **“Toda Tarea completada generará/puede generar automáticamente una entrada en un Diario.”**  
   No existe una obligación transversal de Diario automático.

2. **“El Panel de Evolución consolida necesariamente toda Misión.”**  
   El seguimiento actual utiliza evidencias, Análisis Educativo y capacidades propietarias; este estándar no obliga a un Panel concreto.

3. **“Mi Camino debe tener una estructura fija Árbol → Mis Tareas → Mis Logros → Mi Constancia.”**  
   Mi Camino puede evolucionar mientras preserve las responsabilidades del espacio del alumno.

4. **“Cada módulo puede generar tareas.”**  
   Los Motores generan experiencia/evidencia; crear una Misión requiere un flujo de producto autorizado.

5. **“Todas las Misiones conservan siempre duración, intentos y resultado.”**  
   Solo se registran métricas que realmente existen y aportan significado.

6. **“Una Tarea nunca desaparece.”**  
   Conservación es el comportamiento normal, pero existe eliminación excepcional controlada.

7. **“Toda modificación y todas sus versiones históricas están disponibles.”**  
   La auditoría real debe documentarse según capacidades implementadas.

8. **Roadmaps internos `v2/v3/v4/v5` dentro del estándar.**  
   Las evoluciones pertenecen al `ROADMAP.md` y a necesidades reales, no a promesas incrustadas en una norma transversal.

---

## ✅ 22. Quality Gate

Antes de crear o modificar una capacidad de Misiones debe comprobarse:

### Contexto y acceso

- [ ] Opera sobre la Persona Activa correcta.
- [ ] Gestión requiere `gestion` o superior.
- [ ] El alumno no dispone de bypass administrativo.
- [ ] UI, API y Firestore Rules son coherentes.

### Creación y visibilidad

- [ ] La Misión visible es comprensible para el alumno.
- [ ] Una Misión oculta no se vuelve ejecutable por accidente.
- [ ] Un refuerzo preparado nace oculto hasta decisión familiar.
- [ ] Repaso Académico reutiliza contenido real cuando existe catálogo.
- [ ] Misión libre sin destino no inventa navegación.

### Ejecución y cierre

- [ ] Conserva contexto de Misión y Persona Activa.
- [ ] Usa finalización automática solo con evidencia fiable.
- [ ] Usa manual + confirmación + revisión cuando no puede verificar.
- [ ] No muestra mecanismos redundantes de finalización.

### Evidencia e histórico

- [ ] La evidencia referencia la experiencia real sin duplicación innecesaria.
- [ ] No inventa métricas ausentes.
- [ ] Vista previa no escribe.
- [ ] Histórico/`Ver trabajo` es solo lectura.
- [ ] No fabrica evidencia histórica inexistente.

### Seguimiento y seguridad

- [ ] Datos de prueba quedan excluidos donde corresponde.
- [ ] Vencimiento/error/ayuda no se convierten en castigo.
- [ ] Eliminación completada sigue siendo excepcional, inventariada y confirmada.
- [ ] No se introduce una arquitectura paralela cuando existe capacidad compartida reutilizable.

---

## 🛣️ 23. Evolución

Este estándar no mantiene una lista artificial de “v2/v3/v4/v5”.

Las capacidades futuras se priorizan en `ROADMAP.md` y se incorporan cuando una necesidad real lo justifica.

Ejemplos posibles —no compromisos automáticos—:

- nuevos tipos de Misión;
- recurrencia avanzada;
- más Motores académicos;
- permisos profesionales más granulares;
- automatizaciones adicionales basadas en evidencia;
- auditoría ampliada.

Toda evolución debe preservar las reglas no negociables de la sección 4.

---

## 📌 24. Decisión del estándar

| Campo | Valor |
|---|---|
| **Unidad conceptual** | Tarea/Misión = dos perspectivas de una misma asignación/intención por defecto. |
| **Espacio adulto** | Gestión de Misiones · `gestion`+. |
| **Espacio alumno** | Mi Camino · Misiones visibles, claras y no administrativas. |
| **Persona** | Toda operación se realiza sobre Persona Activa autorizada. |
| **Finalización** | Automática con evidencia fiable; manual + confirmación + revisión cuando no existe. |
| **Evidencia** | Referencia experiencia real; no fabrica ni duplica sesiones completas. |
| **Vista previa / histórico** | Sin escrituras / solo lectura. |
| **Refuerzo** | Evidencia → propuesta → decisión familiar → Misión inicialmente oculta. |
| **Datos de prueba** | Identificados y excluidos de conclusiones/Recompensas reales. |
| **Conservación** | Historial por defecto; eliminación excepcional, segura y controlada. |
| **Motivación** | Sin castigo por error, ayuda o vencimiento; sin Recompensa automática por obediencia. |
| **Estado del documento** | ✅ Activo · v2.0. |

**Impacto:** Gestión de Misiones · Mi Camino · Motores de Aprendizaje · Evidencias · Revisión familiar · Refuerzos · Seguridad · Histórico · Motivación