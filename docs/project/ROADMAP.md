# 🌈 Academia Gloria Valentina
# ROADMAP

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ROADMAP.md` |
| **Versión del documento** | 1.4 |
| **Estado** | Activo |
| **Última actualización** | 03/09/2026 |
| **Responsables** | Juan Perdomo + IA |
| **Ámbito** | Evolución funcional y prioridades de producto |

---

# 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.4 | 03/09/2026 | Juan Perdomo + IA | Sincroniza el Roadmap con el estado real al 03Sep: consolida Gestión de Misiones V1, creación asistida de Repaso Académico, Misiones libres, refuerzos, Análisis Educativo V1, limpieza de datos de prueba, eliminación controlada de Misiones completadas, Recompensas/Reconocimientos V1, recordatorios de calendario y nueva base visual/navegacional de 6.º. Formaliza la expansión curricular de mínima intervención y evidencia obligatoria para nuevos Temas de 6.º. Reubica como evolución futura únicamente las ampliaciones todavía no implementadas. |
| 1.3 | 30/08/2026 | Juan Perdomo + IA | Registra como implementadas y validadas las propuestas de refuerzo de Detectives y de pruebas académicas de 6.º. Consolida el patrón Evidencia → Observación → Propuesta → Revisión humana → Misión, mantiene la activación familiar antes de mostrar la Misión en Mi Camino y desplaza el siguiente foco funcional hacia la expansión curricular progresiva de 6.º. |
| 1.2 | 29/08/2026 | Juan Perdomo + IA | Sincroniza el roadmap con el estado real de Misiones, Trabajo realizado y 6.º. Registra la persistencia académica como base implementada y validada en Puente/Fracciones; reconoce la persistencia existente de Detectives y mantiene como pendiente su uso para propuestas de refuerzo; mantiene como frentes activos Observaciones/Refuerzo, Creación asistida de Misiones y estructura de 6.º. Conserva sin declarar cerradas las líneas técnicas previas de Identidad, Auditoría y certificación del núcleo. |
| 1.1 | 12/08/2026 | Juan Perdomo + IA | Actualiza el estado real del producto, incorpora Identidad Multi-Persona, Gestión de Usuarios, auditoría y reorganiza las prioridades inmediatas hacia cierre de núcleo, 6.º de Primaria y seguimiento basado en datos reales. |
| 1.0 | 22/07/2026 | Juan Perdomo | Primera versión del roadmap funcional de la Academia. |

---

# 🎯 1. Propósito

Este documento define la evolución funcional de **Academia Gloria Valentina**.

El Roadmap:

- orienta los grandes hitos del producto;
- prioriza capacidades, no tareas técnicas aisladas;
- distingue claramente lo implementado, lo inmediato y la visión futura;
- debe actualizarse cuando el estado real del producto supere o modifique una fase prevista.

No sustituye:

- especificaciones funcionales;
- estándares;
- modelos;
- planes de implementación;
- `DECISION_LOG.md`;
- `RELEASE_NOTES.md`.

---

# 🧭 2. Principios de evolución

1. **Primero utilidad real.** La Academia evoluciona para acompañar el aprendizaje y crecimiento del alumno.
2. **Uso real antes que métricas.** No construir estadísticas avanzadas sin datos suficientes.
3. **Reutilizar antes de crear.** No duplicar arquitectura, servicios, modelos o componentes existentes.
4. **Cerrar antes de ampliar.** Una fase estable debe certificarse antes de abrir una evolución de alto impacto.
5. **Datos educativos vinculados a la Persona.** La evolución multi-persona debe continuar sin duplicar pantallas por alumno.
6. **Auditoría proporcional.** Las entidades mutables relevantes deben poder identificar creación y modificación; las entidades sensibles podrán disponer además de historial completo.
7. **Evolución incremental.** Mantener compatibilidad y evitar migraciones masivas sin necesidad observada.
8. **Documentación sincronizada.** El roadmap describe futuro y prioridades; `RELEASE_NOTES.md` registra entregas reales.
9. **Contenido académico con mínima intervención.** Un nuevo Tema de 6.º debe poder incorporarse a partir de material escolar + curso/materia/tema + notas opcionales, delegando en la AI Collaborator la ubicación, estructura e integración técnica.
10. **Evidencia desde el nacimiento.** Todo nuevo Tema de 6.º debe producir evidencia académica útil y reutilizable por revisión, análisis y fortalecimiento.

---

# ✅ 3. Estado consolidado · 03Sep2026

La Academia ya ha superado varias previsiones del roadmap original.

## 3.1 Base técnica y de producto consolidada

Estado actual:

- Firebase Authentication operativo;
- Cloud Firestore operativo;
- API `Academia` como fachada común;
- panel de usuario reutilizable;
- navegación compartida;
- Mi Camino;
- Mis Tareas / Misiones;
- Biblioteca Encantada;
- Mi Rincón de Lectura;
- Detectives de Problemas;
- Creciendo por Dentro;
- calendarios personales y académicos;
- identidad y contexto multi-persona.

## 3.2 Identidad, acceso y colaboración

Implementado durante agosto de 2026:

- `PERSON`;
- `USER`;
- `ROLE`;
- `USER_ROLE`;
- `PERSON_RELATION`;
- Persona Activa;
- acceso profesional sobre otra Persona;
- rol de Administración;
- Gestión de Usuarios desde la Academia;
- Firestore Rules adaptadas a administración;
- auditoría básica Fase A para entidades administrativas;
- primer manual operativo de Gestión de Usuarios.

Esta evolución adelanta parcialmente la antigua fase de colaboración profesional y permisos.

## 3.3 Capacidades funcionales consolidadas al 03/09/2026

- **Creciendo por Dentro:** ✅ Listo.
- **Biblioteca:** ✅ Listo.
- **Trabajo realizado:** ✅ Consolidado para los motores integrados y ampliado a Repaso Académico.
- **Misiones libres:** ✅ Comportamiento funcional corregido y validado.
- **Gestión de Misiones:** ✅ V1 consolidada con filtrado, presentación paginada por bloques y acceso restringido al espacio familiar/administrativo.
- **Repaso Académico desde Gestión de Misiones:** ✅ Curso + Materia cargan Temas reales; Tema completa automáticamente la ruta de actividad cuando existe catálogo compatible.
- **Repaso de contenidos de 5.º mediante Misiones:** ✅ Disponible sin exigir migración masiva de las páginas heredadas.
- **Persistencia de pruebas académicas:** ✅ Base implementada y validada con Puente y Fracciones.
- **Resultado académico histórico:** ✅ Implementado y validado como consulta de solo lectura.
- **Historial y sesiones de Detectives:** ✅ Base implementada en Firestore.
- **Detectives → propuestas/Misiones de refuerzo:** ✅ Base implementada y validada.
- **Pruebas académicas → propuestas/Misiones de refuerzo:** ✅ Base implementada y validada para Puente y Fracciones de 6.º.
- **Rincón de Lectura → propuestas/Misiones de pronunciación:** ✅ Base implementada.
- **Análisis Educativo V1:** ✅ Implementado con período, Motor/Área, Tema/Foco, fortalezas, aspectos a reforzar, evolución, intentos, pistas/ayudas, mejoras personales y propuestas de actuación.
- **Limpieza de evidencias/datos de prueba:** ✅ Herramientas disponibles para evitar contaminación de estadísticas educativas.
- **Eliminación controlada de Misiones completadas:** ✅ Disponible desde Gestión de Misiones para casos puntuales autorizados.
- **Recompensas / Reconocimientos V1:** ✅ Integrados principalmente en Mi Camino → Así voy creciendo, basados en actividad y progreso reales, sin ranking ni pérdida de recompensas.
- **Recordatorios de Calendario al ingreso:** ✅ Recordatorio del día y del día previo integrado.
- **Portal de 6.º + Matemáticas:** ✅ Base visual/navegacional renovada y validada.
- **Fracciones:** ✅ Tema académico real y maduro dentro de `6.º → Matemáticas → Tema`.
- **Modo de Incorporación Curricular de mínima intervención:** ✅ Aprobado documentalmente como procedimiento para nuevos Temas de 6.º.

La actualización de estos estados **no declara cerradas** las líneas técnicas P0 de Identidad, Auditoría y certificación del núcleo definidas a continuación. Esas líneas conservan su detalle y estado hasta una validación específica.

---

# 🚩 4. Prioridades inmediatas

## P0 · Sincronización documental estratégica · jornada 03Sep2026

### Objetivo

Alinear las fuentes documentales principales con el producto real y eliminar estados ya superados antes de continuar la expansión curricular.

### Alcance

Priorizar documentación propietaria y estratégica, comenzando por:

- `DOCUMENTATION_STANDARD.md`;
- `SPEC-ANALISIS_EDUCATIVO.md`;
- `ROADMAP.md`;
- `RELEASE_NOTES.md`;
- `PROJECT_MAP.md`;
- `README.md`;
- `MASTER_PLAN.md`;
- estándares, especificaciones y modelos P0 identificados en el inventario documental.

### Estado

🚧 En progreso · iniciado 03/09/2026

---

## P0 · Cierre de Identidad, Usuarios y Auditoría

### Objetivo

Cerrar formalmente la evolución de identidad multi-persona antes de ampliaciones técnicas de alto impacto.

### Incluye

1. Crear y validar un nuevo usuario real mediante el flujo completo:
   - Firebase Authentication;
   - Gestión de Usuarios;
   - PERSON;
   - USER;
   - USER_ROLE;
   - accesosLogin;
   - PERSON_RELATION cuando corresponda;
   - auditoría.

2. Validar la consistencia de los usuarios iniciales.

3. Confirmar la auditoría Fase A en las entidades administrativas.

### Estado

🚧 En cierre

---

## P0 · Revisión de auditoría de entidades educativas

### Objetivo

Alinear la auditoría de las entidades educativas relevantes con el modelo ya adoptado para identidad.

### Primera entidad prioritaria

```text
TAREA / MISIÓN
```

### Revisión mínima

Auditoría básica:

```text
createdAt
createdBy
updatedAt
updatedBy
```

Campos funcionales ya existentes que deben conservar su significado propio:

```text
creadaPorUid
asignadaPorUid
alumnoId
```

Auditoría histórica a revisar:

```text
CREADA
MODIFICADA
INICIADA
EVIDENCIA_REGISTRADA
COMPLETADA
VALIDADA
REABIERTA
CANCELADA
```

### Criterio

No migrar colecciones únicamente por motivos de auditoría.

Primero se revisará:

- estándar vigente de Mis Tareas / Misiones;
- contrato real en `Academia.tareas`;
- estructura Firestore real;
- historial existente;
- compatibilidad con Persona Activa.

### Estado

🔜 Siguiente bloque técnico después de la sincronización documental

---

## P0 · Actualización y certificación del núcleo

### Objetivo

Establecer un punto técnico estable antes de continuar ampliaciones de alto impacto.

### Núcleo a certificar

```text
Login
ContextoUsuario
Persona propia
Persona Activa
Panel de usuario
Navegación
API Academia
Permisos
Firestore Rules
Gestión de Usuarios
Rutas local / GitHub Pages
Logout
```

### Resultado esperado

Una lista corta y reutilizable de pruebas de regresión.

### Estado

🔜 Pendiente de certificación específica

---

## P0 · Observaciones, Análisis y Propuestas de Refuerzo

### Objetivo

Conservar un patrón común para transformar evidencia útil en acompañamiento accionable sin crear un sistema diferente por módulo.

Patrón vigente:

```text
Evidencia
   ↓
Datos observables
   ↓
Observación / tendencia prudente
   ↓
Propuesta de actuación o refuerzo
   ↓
Revisión humana
   ↓
Misión / acción cuando aporta valor
   ↓
Nueva evidencia
```

### Estado

✅ V1 consolidada · evolución futura guiada por evidencia real

### Aplicaciones reales

- **Mi Rincón de Lectura:** palabras observadas → propuesta → Misión de pronunciación;
- **Detectives de Problemas:** señales repetidas o decisión familiar → foco → Misión de refuerzo;
- **Repaso Académico de 6.º:** mapa formativo de la prueba → bloque a reforzar → Misión académica preparada;
- **Análisis Educativo:** varias fuentes → fortalezas/aspectos/evolución → propuestas descriptivas de actuación.

La propuesta no sustituye la decisión humana: la familia conserva el control sobre cuándo una Misión se muestra en Mi Camino.

---

## P0 · Creación asistida de Misiones

### Objetivo

Generalizar la capacidad de preparar una Misión desde referencias o necesidades reales, manteniendo control humano sobre su creación y asignación.

Patrón vigente:

```text
Dato / observación / contexto académico
→ propuesta o selección asistida
→ revisar / ajustar
→ crear Misión
```

### Estado

✅ V1 consolidada para los casos actuales · evolución progresiva al aparecer nuevos motores

La preparación de **Repaso Académico** ya evita que el administrador tenga que conocer/copiar rutas técnicas cuando el Tema pertenece al catálogo académico disponible.

---

# 📘 5. Próxima etapa académica · Curso 2026–2027

## P1 · Academia 6.º de Primaria

### Objetivo

Ampliar la Academia durante el curso real sin construir contenido ficticio por adelantado y con mínima intervención manual de la familia.

### Arquitectura de navegación

```text
Academia
→ 6.º de Primaria
→ Asignatura
→ Tema
```

### Base visual aprobada

El portal de 6.º y el portal de Matemáticas constituyen la primera referencia visual del curso:

- jerarquía visible sin necesidad de leer largos textos;
- experiencia clara, luminosa, tranquila y motivadora;
- tarjetas académicas como patrón de organización;
- cuadrícula de referencia: **3 columnas en escritorio → 2 en tablet/móvil → 1 solo en móviles muy estrechos**;
- crecimiento mediante contenido real, no mediante tarjetas ficticias;
- separación visual entre navegación curricular, apoyos y mensajes pedagógicos.

El detalle normativo debe residir en los estándares/arquitectura visual correspondientes, no en este Roadmap.

### Modo de expansión curricular aprobado

El ciclo objetivo es:

```text
Material oficial del colegio
+ curso
+ materia
+ nombre del Tema
+ notas opcionales
        ↓
AI Collaborator analiza
        ↓
Decide `Curso → Asignatura → Tema`
        ↓
Reutiliza estructura o crea la mínima necesaria
        ↓
Construye aplicando todos los estándares vigentes
        ↓
Integra evidencia, histórico, análisis y fortalecimiento
        ↓
YA PUEDES PROBAR
        ↓
Aprobación u observaciones concretas
        ↓
Cierre definitivo
```

### Regla de evidencia

Todo nuevo Tema de 6.º debe producir evidencia académica estructurada durante una ejecución normal, de modo que pueda alimentar:

- Trabajo realizado;
- Análisis Educativo;
- estadísticas/evolución;
- fortalezas y aspectos a reforzar;
- propuestas de fortalecimiento.

No se creará persistencia privada por Tema si el contrato compartido puede representar la experiencia.

### Base ya validada

A 03/09/2026 existen como referencias:

- portal renovado y navegable de 6.º;
- Matemáticas como primera asignatura en expansión;
- portal de Matemáticas preparado para crecer con muchos Temas;
- **Puente de 5.º a 6.º**;
- **Fracciones**;
- patrón Resumen → Teoría → Fichas → Práctica → Prueba cuando corresponde;
- contrato compartido `sesion-academica-v1`;
- evidencia académica en ejecución normal;
- evidencia `sesion_academica` cuando existe una Misión;
- resultado académico histórico de solo lectura;
- propuestas de refuerzo derivadas del mapa formativo;
- preparación de Misiones académicas de refuerzo con activación familiar;
- integración con Persona Activa y `Volver` histórico;
- reglas Firestore de `sesionesAcademicas` publicadas y validadas.

### Estado

🚧 Base de curso consolidada · expansión curricular progresiva

La expansión continuará con nuevos Temas reales de Matemáticas, **Science** y las demás asignaturas según material y necesidad del colegio.

---

## P1 · Preferencias personales de accesibilidad/experiencia

### Siguiente candidata concreta

**Velocidad de voz configurable por Persona**, administrable por adulto/administrador.

Interfaz conceptual:

```text
Normal
Pausada
Muy pausada
```

Los valores técnicos permanecen internos.

### Estado

⏳ Pendiente

---

# 📊 6. Seguimiento educativo basado en datos reales

## P1 · Historial mínimo de Detectives

### Objetivo

Conservar sesiones reales y permitir consultar evolución sin convertir todavía el módulo en un sistema estadístico complejo.

### Incluye

La persistencia vigente conserva, según la sesión:

- historia;
- nivel;
- tema y tipo;
- intentos totales y por etapa;
- respuestas de comprensión y descubrimiento;
- pistas utilizadas;
- operación, operandos y resultado;
- pasos;
- tiempo activo;
- fecha de finalización.

También permite consultar el historial de historias y las sesiones de una historia concreta.

### Estado

✅ Base implementada y ya consumida por refuerzo y Análisis Educativo.

---

## P1 · Evidencias reales de Misiones / Tareas

### Objetivo

Conectar una Tarea/Misión con la experiencia educativa que realmente la completa.

### Relaciones vigentes

```text
Tarea / Misión
      ↓
Sesión real
      ↓
Evidencia
      ↓
Resultado / validación
```

### Estado

✅ Base implementada y validada en los motores integrados; evolución progresiva por motor.

Repaso Académico utiliza este patrón mediante `sesionId` y evidencia `sesion_academica`, sin duplicar la sesión dentro de la Misión.

---

## P1 · Mi Rincón de Lectura → refuerzo / Misiones

### Estado

✅ Base lista

Entre los casos contemplados:

- palabras sugeridas por Lía y no superadas;
- palabras superadas después de varios intentos;
- necesidades concretas de pronunciación o práctica;
- acciones que pueden convertirse en Misiones.

---

## P1 · Detectives → observaciones / Misiones de refuerzo

### Regla

No inferir una dificultad global a partir de un único error. Las propuestas deben basarse en datos observables y expresarse como oportunidades concretas de práctica.

La primera versión utiliza señales repetidas en historias distintas del mismo nivel y permite que una decisión familiar explícita de **Reforzar** actúe como señal suficiente para una historia concreta.

### Estado

✅ Base implementada y validada

---

## P1 · Pruebas académicas → propuestas de refuerzo

### Flujo vigente

```text
Prueba persistida
→ mapa formativo
→ aspecto a reforzar
→ propuesta breve
→ revisión familiar
→ Misión de refuerzo
→ nueva oportunidad de aplicación
→ nueva evidencia
```

### Primera regla implementada

En **Puente de 5.º a 6.º** y **Fracciones**:

- se analiza la sesión de aprendizaje más reciente de cada actividad;
- una Vista previa no participa porque no persiste sesión académica;
- solo los bloques cuyo mapa formativo indica `reforzar` generan propuesta automática;
- un bloque `camino` se conserva como observación, pero no crea propuesta automática en esta primera versión;
- la clasificación conserva por separado la ruta donde ocurrió y el foco concreto a reforzar;
- la Misión se prepara inicialmente oculta y la familia decide cuándo mostrarla en Mi Camino;
- la nueva ejecución reutiliza el contrato normal de Repaso Académico y evidencia `sesion_academica`.

### Estado

✅ Base implementada y validada para Puente y Fracciones de 6.º

---

## P1 · Análisis Educativo V1

### Objetivo

Permitir a la familia revisar evidencias reales sin etiquetar al alumno.

### Fuentes actuales

- Detectives;
- Pruebas Académicas;
- Rincón de Lectura.

### Capacidades actuales

- Desde / Hasta y períodos predefinidos;
- Motor / Área;
- Tema / Foco;
- fortalezas observadas;
- aspectos a reforzar;
- evolución;
- intentos;
- pistas/ayudas cuando existen;
- mejoras personales observables;
- propuestas de actuación.

### Estado

✅ V1 implementada y documentada en `SPEC-ANALISIS_EDUCATIVO.md`.

---

## P1 · Compatibilidad de 5.º y Misiones existentes

Los recursos existentes de 5.º pueden seguir utilizándose como Repaso Académico aunque no generen `sesionesAcademicas` ni evidencia académica automática.

No se realizará una migración masiva de 5.º únicamente para adoptar la persistencia nueva. Donde no exista evidencia automática puede mantenerse el cierre manual de la Misión.

La incorporación de persistencia tampoco obliga a recrear Misiones académicas ya existentes. Una ejecución futura de un recurso que soporte el contrato vigente podrá generar su sesión/evidencia; una actividad realizada antes de existir persistencia no generará retrospectivamente datos que nunca fueron guardados.

### Estado

✅ Compatibilidad definida y validada en el modelo vigente.

---

## P2 · Constancia basada en actividad significativa

### Objetivo

Medir continuidad educativa real, no accesos o logins.

### Fuentes futuras

- lectura;
- Detectives;
- Misiones;
- Creciendo por Dentro;
- sesiones académicas;
- otras experiencias educativas reales.

### Estado

⏳ Después de disponer de datos suficientes

---

# 🏅 7. Motivación, reconocimientos y crecimiento

## Base · Recompensas / Reconocimientos V1

### Objetivo

Reconocer actividad y progreso reales sin comparación con otros y sin convertir la Academia en una economía de premios.

### Tipos iniciales

- 🦜 Guacamaya / hito significativo;
- 🏅 Récord personal;
- ✨ Reconocimiento de Lía;
- 🤝 Reto cooperativo Gloria + familia.

### Principios

- nacen de actividad/progreso real;
- no de clics ni perfección;
- no rankings;
- no comparación entre alumnos;
- no pérdida de recompensas;
- pueden reconocer mejoras concretas como utilizar una pista menos.

### Estado

✅ V1 implementada e integrada principalmente en **Mi Camino → Así voy creciendo**.

### Evolución futura

Ampliar únicamente cuando existan nuevos hitos reales y suficientes datos para justificarlo.

---

# 👨‍👩‍👧 8. Colaboración familiar y profesional

La base técnica ya existe parcialmente:

- Persona Activa;
- Relaciones;
- niveles de acceso;
- acceso profesional;
- Gestión de Usuarios.

## Evoluciones futuras

- ámbitos de acceso más granulares;
- observaciones profesionales;
- colaboración con familia, psicología, logopedia, PT o colegio;
- vistas adultas/profesionales basadas en información autorizada.

### Condición

Seguridad, privacidad y permisos deberán definirse antes de ampliar cada ámbito.

### Estado

🟡 Base implementada · evolución progresiva

---

# 📈 9. Paneles e históricos de evolución

## P3 · Información ampliada para adultos y profesionales

### Objetivo

Evolucionar desde el Análisis Educativo V1 hacia vistas longitudinales más amplias cuando exista suficiente volumen de datos reales.

### Posibles fuentes

- Misiones;
- lectura;
- Detectives;
- sesiones académicas;
- constancia;
- reconocimientos;
- observaciones autorizadas.

### Condición de entrada

Debe existir volumen suficiente de datos reales y una necesidad concreta no resuelta por el reporte V1.

### Estado

🔮 Futuro

---

# 🤖 10. Inteligencia Artificial educativa

## 10.1 AI Collaborator para incorporación curricular

La IA ya forma parte del **proceso de desarrollo** de nuevos Temas de 6.º mediante el Modo de Incorporación Curricular de mínima intervención.

No es una funcionalidad autónoma visible para el alumno: es un procedimiento gobernado por estándares para transformar material real del colegio en contenido integrado, probado y documentado.

### Estado

✅ Procedimiento aprobado · se validará mediante uso repetido con nuevos Temas reales

## 10.2 Tutor/recomendaciones de IA dentro del producto

### Objetivo

Incorporar capacidades generativas para el usuario solo cuando existan:

- datos suficientes;
- objetivos pedagógicos claros;
- supervisión familiar;
- controles de privacidad;
- límites funcionales definidos.

### Capacidades posibles

- recomendaciones;
- acompañamiento;
- resúmenes;
- ayuda contextual;
- análisis de evolución.

### Estado

🔮 Largo plazo

La creación asistida basada en datos estructurados y reglas puede avanzar antes de depender de IA generativa visible para el alumno.

---

# 🌱 11. Visión de largo alcance

La Academia continuará evolucionando como un ecosistema educativo, personal y familiar capaz de acompañar:

- distintas etapas académicas;
- distintos alumnos;
- aprendizaje;
- lectura;
- expresión;
- bienestar;
- recuerdos;
- proyectos;
- reconocimientos;
- colaboración familiar y profesional.

La visión permanece abierta, pero cada ampliación deberá demostrar valor real antes de aumentar complejidad.

---

# 🗺️ 12. Secuencia recomendada

```text
AHORA · 03Sep2026
────────────────────────────────────────────
P0  Completar sincronización documental estratégica
P1  Continuar incorporación progresiva de contenido real de 6.º
P1  Validar el Modo de Incorporación Curricular con nuevos Temas reales

LÍNEAS TÉCNICAS QUE CONSERVAN VIGENCIA
────────────────────────────────────────────
P0  Cerrar Identidad, Usuarios y Auditoría · en cierre
P0  Revisar auditoría de Tareas / Misiones · después de sincronización documental
P0  Certificar núcleo multi-persona · pendiente de certificación específica

SIGUIENTE EXPANSIÓN CURRICULAR
────────────────────────────────────────────
P1  Nuevos Temas de Matemáticas según material real
P1  Science y siguientes asignaturas
P1  Todo nuevo Tema: contenido + evidencia + análisis + fortalecimiento
P1  Calendario académico 2026–2027 según necesidad del curso

OTROS PENDIENTES CONCRETOS
────────────────────────────────────────────
P1  Preferencia de velocidad de voz por Persona
P1  Nuevas experiencias de Mi Universo guiadas por necesidades reales

DESPUÉS DE USO REAL SUFICIENTE
────────────────────────────────────────────
P2  Constancia basada en actividad real
P3  Panel adulto / profesional ampliado
P3  Históricos longitudinales avanzados
P3  IA educativa visible para el usuario
```

---

# 📋 13. Resumen de prioridades

| Prioridad | Iniciativa | Estado |
|---|---|---|
| Base | Creciendo por Dentro | ✅ Listo |
| Base | Biblioteca | ✅ Listo |
| Base | Trabajo realizado | ✅ Consolidado |
| Base | Misiones libres | ✅ Listo |
| Base | Gestión de Misiones V1 | ✅ Consolidada |
| Base | Repasos/Misiones con contenidos de 5.º | ✅ Disponible |
| Base | Persistencia de pruebas académicas | ✅ Implementada y validada en Puente/Fracciones |
| Base | Observaciones / Propuestas de Refuerzo V1 | ✅ Consolidada |
| Base | Creación asistida de Misiones V1 | ✅ Consolidada para casos actuales |
| Base | Análisis Educativo V1 | ✅ Implementado |
| Base | Recompensas / Reconocimientos V1 | ✅ Implementadas |
| Base | Recordatorios de Calendario | ✅ Implementados |
| Base | Portal 6.º + Matemáticas | ✅ Base visual validada |
| P0 | Sincronización documental 03Sep2026 | 🚧 En progreso |
| P0 | Cierre Gestión de Usuarios / Identidad / Auditoría | 🚧 En cierre |
| P0 | Auditoría de Tareas / Misiones | 🔜 Después de documentación |
| P0 | Certificación del núcleo multi-persona | 🔜 Pendiente |
| P1 | Academia 6.º de Primaria | 🚧 Expansión curricular progresiva |
| P1 | Modo de Incorporación Curricular | ✅ Aprobado · validar con nuevos Temas |
| P1 | Evidencia obligatoria en nuevos Temas de 6.º | ✅ Contrato aprobado · aplicar en cada Tema |
| P1 | Calendario 2026–2027 | ⏳ Según necesidad del curso |
| P1 | Preferencia de velocidad de voz por Persona | ⏳ Pendiente |
| P1 | Historial mínimo de Detectives | ✅ Base implementada |
| P1 | Evidencias de Misiones / Tareas | ✅ Base implementada · evolución por motor |
| P1 | Rincón de Lectura → Misiones de refuerzo | ✅ Base lista |
| P1 | Detectives → propuestas/Misiones | ✅ Base implementada y validada |
| P1 | Pruebas académicas → propuestas/Misiones | ✅ Base implementada y validada en Puente/Fracciones |
| P2 | Constancia real | ⏳ Posterior |
| P3 | Panel adulto / profesional ampliado | 🔮 Futuro |
| P3 | IA educativa visible para el usuario | 🔮 Largo plazo |

---

# 🔗 14. Recordatorios transversales

El Roadmap no es propietario de las siguientes reglas, pero las referencia como condiciones de cualquier nueva evolución:

- favicon oficial de la Academia en las páginas funcionales;
- `Volver` gobernado por el modelo compartido y su historial lógico;
- conservación de Persona Activa durante navegación interna;
- Vista previa sin persistencia educativa;
- vistas históricas de resultados en solo lectura;
- todo nuevo Tema de 6.º produce evidencia académica analizable;
- el contenido académico se incorpora con mínima intervención administrativa;
- mensajes de fallo que expliquen la causa cuando sea conocida y segura de mostrar.

Las definiciones propietarias viven principalmente en:

- `docs/models/MODELO_NAVEGACION.md`;
- `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`;
- `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md`;
- `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md`.

---

# 📚 15. Documentos relacionados

- `docs/README.md`
- `docs/project/MASTER_PLAN.md`
- `docs/project/PROJECT_MAP.md`
- `docs/project/DECISION_LOG.md`
- `docs/project/RELEASE_NOTES.md`
- `docs/models/MODELO_NAVEGACION.md`
- `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md`
- `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`
- `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`
- `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md`

---

**Academia Gloria Valentina 🌈**

*El Roadmap orienta el futuro; el uso real decide qué merece construirse.*