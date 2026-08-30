# 🌈 Academia Gloria Valentina
# ROADMAP

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ROADMAP.md` |
| **Versión del documento** | 1.3 |
| **Estado** | Activo |
| **Última actualización** | 30/08/2026 |
| **Responsables** | Juan Perdomo + IA |
| **Ámbito** | Evolución funcional y prioridades de producto |

---

# Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 22/07/2026 | Juan Perdomo | Primera versión del roadmap funcional de la Academia. |
| 1.1 | 12/08/2026 | Juan Perdomo + IA | Actualiza el estado real del producto, incorpora Identidad Multi-Persona, Gestión de Usuarios, auditoría y reorganiza las prioridades inmediatas hacia cierre de núcleo, 6.º de Primaria y seguimiento basado en datos reales. |
| 1.2 | 29/08/2026 | Juan Perdomo + IA | Sincroniza el roadmap con el estado real de Misiones, Trabajo realizado y 6.º. Registra la persistencia académica como base implementada y validada en Puente/Fracciones; reconoce la persistencia existente de Detectives y mantiene como pendiente su uso para propuestas de refuerzo; mantiene como frentes activos Observaciones/Refuerzo, Creación asistida de Misiones y estructura de 6.º. Conserva sin declarar cerradas las líneas técnicas previas de Identidad, Auditoría y certificación del núcleo. |
| 1.3 | 30/08/2026 | Juan Perdomo + IA | Registra como implementadas y validadas las propuestas de refuerzo de Detectives y de pruebas académicas de 6.º. Consolida el patrón Evidencia → Observación → Propuesta → Revisión humana → Misión, mantiene la activación familiar antes de mostrar la Misión en Mi Camino y desplaza el siguiente foco funcional hacia la expansión curricular progresiva de 6.º. |

---

# 1. Propósito

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

# 2. Principios de evolución

1. **Primero utilidad real.** La Academia evoluciona para acompañar el aprendizaje y crecimiento del alumno.
2. **Uso real antes que métricas.** No construir estadísticas avanzadas sin datos suficientes.
3. **Reutilizar antes de crear.** No duplicar arquitectura, servicios, modelos o componentes existentes.
4. **Cerrar antes de ampliar.** Una fase estable debe certificarse antes de abrir una evolución de alto impacto.
5. **Datos educativos vinculados a la Persona.** La evolución multi-persona debe continuar sin duplicar pantallas por alumno.
6. **Auditoría proporcional.** Las entidades mutables relevantes deben poder identificar creación y modificación; las entidades sensibles podrán disponer además de historial completo.
7. **Evolución incremental.** Mantener compatibilidad y evitar migraciones masivas sin necesidad observada.
8. **Documentación sincronizada.** El roadmap describe futuro y prioridades; `RELEASE_NOTES.md` registra entregas reales.

---

# 3. Estado consolidado · Agosto 2026

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

## 3.3 Estado funcional actualizado al 30/08/2026

El uso y validación posteriores a v1.2 permiten actualizar las siguientes capacidades:

- **Creciendo por Dentro:** ✅ Listo.
- **Biblioteca:** ✅ Listo.
- **Trabajo realizado:** ✅ Consolidado para los motores integrados y ampliado a Repaso Académico.
- **Misiones libres:** ✅ Listo.
- **Repaso de contenidos de 5.º mediante Misiones:** ✅ Disponible sin exigir migración masiva de las páginas heredadas.
- **Persistencia de pruebas académicas:** ✅ Base implementada y validada con Puente y Fracciones.
- **Resultado académico histórico:** ✅ Implementado y validado como consulta de solo lectura.
- **Historial y sesiones de Detectives:** ✅ Base implementada en Firestore.
- **Detectives → propuestas/Misiones de refuerzo:** ✅ Base implementada y validada.
- **Pruebas académicas → propuestas/Misiones de refuerzo:** ✅ Base implementada y validada para Puente y Fracciones de 6.º.
- **Creación asistida de Misiones:** 🚧 En progreso; Mi Rincón de Lectura, Detectives y Repaso Académico ya aportan referencias reales.
- **Observaciones / Propuestas de refuerzo:** 🚧 Patrón común ya validado en tres orígenes; evolución progresiva por motor.
- **Estructura de 6.º de Primaria:** 🚧 En progreso avanzado.

La actualización de estos estados **no declara cerradas** las líneas técnicas P0 de Identidad, Auditoría y certificación del núcleo definidas a continuación. Esas líneas conservan su detalle y estado hasta una validación específica.

---

# 4. Prioridades inmediatas

## P0 · Cierre de Identidad, Usuarios y Auditoría

### Objetivo

Cerrar formalmente la evolución de identidad multi-persona antes de ampliar el producto.

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

🔜 Siguiente bloque técnico

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

🔜 Próximo

---

## P0 · Observaciones y Propuestas de Refuerzo

### Objetivo

Consolidar un patrón común para transformar evidencia útil en acompañamiento accionable sin crear un sistema diferente por módulo.

Patrón objetivo:

```text
Evidencia
   ↓
Datos observables
   ↓
Observación
   ↓
Propuesta de refuerzo
   ↓
Revisión humana
   ↓
Misión / acción
```

### Estado

🚧 Patrón base validado · evolución progresiva

### Referencias disponibles

La Academia ya dispone de tres aplicaciones reales del patrón:

- **Mi Rincón de Lectura:** palabras observadas → propuesta → Misión de pronunciación;
- **Detectives de Problemas:** señales repetidas o decisión familiar → foco → Misión de refuerzo;
- **Repaso Académico de 6.º:** mapa formativo de la prueba → bloque a reforzar → Misión académica preparada.

En los tres casos la propuesta no sustituye la decisión humana: la familia conserva el control sobre cuándo la Misión se muestra en Mi Camino.

---

## P0 · Creación asistida de Misiones

### Objetivo

Generalizar la capacidad de preparar una Misión desde una necesidad observada, manteniendo control humano sobre su creación y asignación.

Patrón deseado:

```text
Dato / observación
→ propuesta de Lía
→ revisar / ajustar
→ crear Misión
```

### Estado

🚧 Base aplicada en varios motores · evolución progresiva

---

# 5. Próxima etapa académica · Curso 2026–2027

## P1 · Academia 6.º de Primaria

### Objetivo

Preparar y ampliar la Academia para acompañar el nuevo curso escolar sin reconstruir los módulos existentes.

### Alcance inicial

```text
6.º de Primaria
├── Portal del curso
├── Asignaturas
├── Calendario académico 2026–2027
├── Misiones / Tareas
└── Contenidos incorporados según necesidad real
```

### Principio

No generar grandes volúmenes de contenido por adelantado.

La prioridad será adaptar progresivamente la Academia a:

- contenidos reales del colegio;
- necesidades observadas;
- evaluaciones;
- tareas;
- refuerzos;
- objetivos personales y educativos.

### Base ya validada

A 30/08/2026 existen como referencias estructuradas:

- portal navegable de 6.º;
- Matemáticas como primera asignatura en expansión;
- **Puente de 5.º a 6.º**;
- **Fracciones**;
- patrón Resumen → Teoría → Fichas → Práctica → Prueba cuando corresponde;
- contrato compartido `sesion-academica-v1`;
- evidencia `sesion_academica` cuando existe una Misión;
- resultado académico histórico de solo lectura;
- propuestas de refuerzo derivadas del mapa formativo de la sesión más reciente;
- preparación de Misiones académicas de refuerzo con activación familiar;
- integración con Persona Activa y `Volver` histórico;
- reglas Firestore de `sesionesAcademicas` publicadas y validadas.

### Estado

🚧 En progreso avanzado

La expansión continuará con nuevos temas de Matemáticas, **Science** y las demás asignaturas según material y necesidad real del colegio.

---

# 6. Seguimiento educativo basado en datos reales

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

✅ Base implementada.

Sus datos ya se utilizan para generar observaciones prudentes y propuestas de refuerzo sin convertir un único error en una conclusión global.

---

## P1 · Evidencias reales de Misiones / Tareas

### Objetivo

Conectar una Tarea/Misión con la experiencia educativa que realmente la completa.

### Relaciones previstas

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

Repaso Académico ya utiliza este patrón mediante `sesionId` y evidencia `sesion_academica`, sin duplicar la sesión dentro de la Misión.

---

## P1 · Mi Rincón de Lectura → refuerzo / Misiones

### Objetivo

Utilizar los datos reales del Rincón para identificar necesidades concretas y preparar acciones de práctica.

### Estado

✅ Base lista

Entre los casos ya contemplados se encuentran:

- palabras sugeridas por Lía y no superadas;
- palabras superadas después de varios intentos;
- necesidades concretas de pronunciación o práctica;
- acciones que pueden convertirse en Misiones.

---

## P1 · Detectives → observaciones / Misiones de refuerzo

### Objetivo

Utilizar fallos, intentos, pasos y resultados de Detectives para proponer acciones de refuerzo y, cuando corresponda, preparar nuevas Misiones.

### Regla

No inferir una dificultad global a partir de un único error. Las propuestas deben basarse en datos observables y expresarse como oportunidades concretas de práctica.

La primera versión implementada utiliza señales repetidas en historias distintas del mismo nivel y permite que una decisión familiar explícita de **Reforzar** actúe como señal suficiente para una historia concreta.

### Estado

✅ Base implementada y validada

---

## P1 · Pruebas académicas → propuestas de refuerzo

### Objetivo

Aprovechar la persistencia ya disponible en los Temas Académicos para transformar resultados de pruebas en propuestas de práctica específica.

Datos disponibles en las referencias actuales:

- resultado total;
- porcentaje de la prueba;
- respuestas;
- explicaciones;
- mapa formativo por bloques;
- sesión histórica;
- relación con Misión cuando existe.

### Flujo vigente

```text
Prueba persistida
→ mapa formativo
→ aspecto a reforzar
→ propuesta breve
→ revisión familiar
→ Misión de refuerzo
→ nueva oportunidad de aplicación
```

### Primera regla implementada

En **Puente de 5.º a 6.º** y **Fracciones**:

- se analiza únicamente la sesión de aprendizaje más reciente de cada actividad;
- una Vista previa no participa porque no persiste sesión académica;
- solo los bloques cuyo mapa formativo indica `reforzar` generan propuesta automática;
- un bloque `camino` se conserva como observación, pero no crea propuesta automática en esta primera versión;
- la clasificación conserva por separado la ruta donde ocurrió y el foco concreto a reforzar;
- la Misión se prepara inicialmente oculta y la familia decide cuándo mostrarla en Mi Camino;
- la nueva ejecución reutiliza el contrato normal de Repaso Académico y evidencia `sesion_academica`.

### Estado

✅ Base implementada y validada para Puente y Fracciones de 6.º

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

## P2 · Logros reales

### Objetivo

Generar hitos desde evidencias y progreso auténtico.

### Principio

Los logros no se generarán a partir de métricas ficticias ni de actividad superficial.

### Estado

⏳ Posterior a historial y evidencias

---

# 7. Colaboración familiar y profesional

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

# 8. Panel de evolución

## P3 · Información para adultos y profesionales

### Objetivo

Mostrar evolución comprensible basada en históricos reales.

### Posibles fuentes

- Misiones;
- lectura;
- Detectives;
- sesiones académicas;
- constancia;
- logros;
- observaciones autorizadas.

### Condición de entrada

Debe existir volumen suficiente de datos reales.

### Estado

🔮 Futuro

---

# 9. Inteligencia Artificial educativa

## P3 · Tutor y recomendaciones

### Objetivo

Incorporar capacidades de IA únicamente cuando existan:

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

La creación asistida basada en datos estructurados y reglas puede avanzar antes de depender de IA generativa.

---

# 10. Visión de largo alcance

La Academia continuará evolucionando como un ecosistema educativo, personal y familiar capaz de acompañar:

- distintas etapas académicas;
- distintos alumnos;
- aprendizaje;
- lectura;
- expresión;
- bienestar;
- recuerdos;
- proyectos;
- logros;
- colaboración familiar y profesional.

La visión permanece abierta, pero cada ampliación deberá demostrar valor real antes de aumentar complejidad.

---

# 11. Secuencia recomendada

```text
AHORA
────────────────────────────────────────────
P0  Consolidar el patrón común de Observaciones / Propuestas de Refuerzo
P0  Consolidar Creación asistida de Misiones
P1  Continuar incorporación progresiva de 6.º

LÍNEAS TÉCNICAS QUE CONSERVAN VIGENCIA
────────────────────────────────────────────
P0  Cerrar Identidad, Usuarios y Auditoría · en cierre
P0  Revisar auditoría de Tareas / Misiones · siguiente bloque técnico
P0  Certificar núcleo multi-persona · próximo

SIGUIENTE EXPANSIÓN CURRICULAR
────────────────────────────────────────────
P1  Nuevos temas de Matemáticas según necesidad real
P1  Science y siguientes asignaturas
P1  Calendario académico 2026–2027 cuando corresponda

DESPUÉS DE USO REAL SUFICIENTE
────────────────────────────────────────────
P2  Constancia basada en actividad real
P2  Logros reales
P3  Panel adulto / profesional
P3  Históricos de evolución
P3  IA educativa
```

---

# 12. Resumen de prioridades

| Prioridad | Iniciativa | Estado |
|---|---|---|
| Base | Creciendo por Dentro | ✅ Listo |
| Base | Biblioteca | ✅ Listo |
| Base | Trabajo realizado | ✅ Consolidado |
| Base | Misiones libres | ✅ Listo |
| Base | Repasos/Misiones con contenidos de 5.º | ✅ Disponible |
| Base | Persistencia de pruebas académicas | ✅ Implementada y validada en Puente/Fracciones |
| P0 | Cierre Gestión de Usuarios / Identidad / Auditoría | 🚧 En cierre |
| P0 | Auditoría de Tareas / Misiones | 🔜 Siguiente bloque técnico |
| P0 | Actualización documental estratégica | ✅ Actualizada al 30/08/2026 |
| P0 | Certificación del núcleo multi-persona | 🔜 Próximo |
| P0 | Observaciones / Propuestas de Refuerzo | 🚧 Patrón base validado · evolución progresiva |
| P0 | Creación asistida de Misiones | 🚧 Base aplicada · evolución progresiva |
| P1 | Academia 6.º de Primaria | 🚧 En progreso avanzado |
| P1 | Calendario 2026–2027 | ⏳ Según necesidad del curso |
| P1 | Historial mínimo de Detectives | ✅ Base implementada |
| P1 | Evidencias de Misiones / Tareas | ✅ Base implementada · evolución por motor |
| P1 | Rincón de Lectura → Misiones de refuerzo | ✅ Base lista |
| P1 | Detectives → propuestas/Misiones | ✅ Base implementada y validada |
| P1 | Pruebas académicas → propuestas/Misiones | ✅ Base implementada y validada en Puente/Fracciones |
| P2 | Constancia real | ⏳ Posterior |
| P2 | Logros reales | ⏳ Posterior |
| P3 | Panel adulto / profesional | 🔮 Futuro |
| P3 | IA educativa | 🔮 Largo plazo |

---

# 13. Recordatorios transversales

El Roadmap no es propietario de las siguientes reglas, pero las referencia como condiciones de cualquier nueva evolución:

- favicon oficial de la Academia en las páginas funcionales;
- `Volver` gobernado por el modelo compartido y su historial lógico;
- conservación de Persona Activa durante navegación interna;
- Vista previa sin persistencia educativa;
- vistas históricas de resultados en solo lectura;
- mensajes de fallo que expliquen la causa cuando sea conocida y segura de mostrar.

Las definiciones propietarias viven en:

- `docs/models/MODELO_NAVEGACION.md`;
- `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`;
- `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md`.

---

# 14. Documentos relacionados

- `docs/README.md`
- `docs/project/MASTER_PLAN.md`
- `docs/project/PROJECT_MAP.md`
- `docs/project/DECISION_LOG.md`
- `docs/project/RELEASE_NOTES.md`
- `docs/models/MODELO_NAVEGACION.md`
- `docs/models/MODELO-USUARIOS_ALUMNOS_Y_ROLES.md`
- `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`
- `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`

---

**Academia Gloria Valentina 🌈**

*El Roadmap orienta el futuro; el uso real decide qué merece construirse.*
