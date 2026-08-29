# 🌈 Academia Gloria Valentina
# ROADMAP

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ROADMAP.md` |
| **Versión del documento** | 1.2 |
| **Estado** | Activo |
| **Última actualización** | 29/08/2026 |
| **Responsables** | Juan Perdomo + IA |
| **Ámbito** | Evolución funcional y prioridades de producto |

---

# Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 22/07/2026 | Juan Perdomo | Primera versión del roadmap funcional de la Academia. |
| 1.1 | 12/08/2026 | Juan Perdomo + IA | Actualiza el estado real del producto, incorpora Identidad Multi-Persona, Gestión de Usuarios, auditoría y reorganiza las prioridades inmediatas hacia cierre de núcleo, 6.º de Primaria y seguimiento basado en datos reales. |
| 1.2 | 29/08/2026 | Juan Perdomo + IA | Sincroniza el roadmap con el estado real de Misiones, Trabajo realizado y 6.º: registra como listas Creciendo por Dentro, Biblioteca, Misiones libres y consolidación de Trabajo realizado; reconoce persistencia académica validada en Puente/Fracciones; mantiene en progreso Observaciones/Refuerzo, Creación asistida de Misiones y estructura de 6.º; prioriza refuerzo desde Detectives y pruebas académicas. Conserva explícitamente las líneas técnicas previas de Identidad/Auditoría/Núcleo mientras no exista validación separada de su cierre. |

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
- Persona Activa y relaciones multi-persona;
- navegación compartida con cabecera global y retorno contextual;
- Mi Camino;
- Mis Tareas / Misiones;
- Biblioteca Encantada;
- Mi Rincón de Lectura;
- Detectives de Problemas;
- Creciendo por Dentro;
- calendarios personales y académicos;
- Gestión de Usuarios;
- Firestore Rules adaptadas al modelo vigente.

## 3.2 Misiones y Trabajo realizado

Estado consolidado:

- **Creciendo por Dentro:** ✅ Listo.
- **Biblioteca:** ✅ Listo.
- **Trabajo realizado:** ✅ Consolidado para los motores integrados y ampliado a Repaso Académico.
- **Misiones libres:** ✅ Listo.
- **Repaso de contenidos de 5.º mediante Misiones:** ✅ Disponible sin exigir migración masiva de sus páginas heredadas.
- **Repaso Académico de 6.º:** ✅ integrado con sesión académica, evidencia y revisión familiar cuando el tema soporta persistencia.
- **Creación asistida de Misiones:** 🟡 En progreso; ya existe experiencia real desde Mi Rincón de Lectura, falta generalizar el patrón a nuevas fuentes de datos.
- **Observaciones / propuestas de refuerzo:** 🟡 En progreso; siguiente eje de consolidación.

## 3.3 Primera base académica estructurada de 6.º

Implementado y validado:

- portal de 6.º como destino navegable;
- Matemáticas como primera asignatura en expansión;
- **Puente de 5.º a 6.º**;
- **Fracciones**;
- patrón académico de Resumen → Teoría → Fichas → Práctica → Prueba cuando corresponde;
- persistencia mediante `sesion-academica-v1`;
- evidencia `sesion_academica` cuando la actividad se ejecuta desde una Misión;
- resultado académico histórico de solo lectura;
- integración con Persona Activa y `Volver` histórico;
- reglas Firestore de `sesionesAcademicas` publicadas y validadas.

La persistencia de pruebas/exámenes **ya no es una iniciativa pendiente de diseño**. Es una base implementada que deberá reutilizarse en los nuevos temas de 6.º cuando produzcan datos académicos útiles.

## 3.4 Líneas técnicas previas que conservan vigencia

La actualización v1.2 reorganiza las prioridades funcionales, pero **no declara cerradas** las siguientes líneas técnicas registradas en v1.1 porque su cierre no ha sido revalidado dentro de esta actualización documental:

### Cierre de Identidad, Usuarios y Auditoría

Estado heredado de v1.1:

🚧 En cierre

Incluye la validación integral de usuarios, relaciones y auditoría administrativa.

### Revisión de auditoría de Tareas / Misiones

Estado heredado de v1.1:

🔜 Siguiente bloque técnico

Debe revisar al menos:

```text
createdAt
createdBy
updatedAt
updatedBy
```

y conservar el significado funcional de:

```text
creadaPorUid
asignadaPorUid
alumnoId
```

junto con el historial de eventos de la Misión cuando corresponda.

### Certificación del núcleo multi-persona

Estado heredado de v1.1:

🔜 Próximo

El núcleo a certificar continúa incluyendo:

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

Estas líneas deberán cerrarse mediante su propia validación; no deben desaparecer del roadmap por el avance de otros productos.

---

# 4. Prioridades inmediatas

## P0 · Observaciones y Propuestas de Refuerzo

### Objetivo

Consolidar un patrón común para transformar evidencia útil en acompañamiento accionable sin crear un sistema distinto por módulo.

Flujo objetivo:

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

🚧 En progreso

### Referencia ya disponible

Mi Rincón de Lectura ya demuestra que la Academia puede utilizar resultados reales para identificar necesidades concretas y preparar acciones/Misiones.

---

## P0 · Creación asistida de Misiones

### Objetivo

Generalizar la capacidad de preparar una Misión desde una necesidad observada, manteniendo control humano sobre su creación/asignación.

La Academia debe evitar dos extremos:

- obligar al adulto a reconstruir manualmente toda la Misión;
- crear automáticamente Misiones sin revisión cuando la interpretación requiera criterio humano.

### Patrón deseado

```text
Dato / observación
→ propuesta de Lía
→ revisar / ajustar
→ crear Misión
```

### Estado

🚧 En progreso

---

## P1 · Continuar estructura de 6.º de Primaria

### Objetivo

Ampliar progresivamente el curso con contenidos reales del colegio y necesidades observadas, reutilizando la arquitectura ya validada.

### Estado

🚧 En progreso avanzado

### Principio

No generar grandes volúmenes de contenido por adelantado.

La prioridad será adaptar progresivamente la Academia a:

- contenidos reales del colegio;
- necesidades observadas;
- evaluaciones;
- tareas;
- refuerzos;
- objetivos personales y educativos.

### Base reutilizable

```text
Material escolar
→ Tema Académico
→ Aprendizaje
→ Práctica
→ Prueba / comprobación
→ Sesión
→ Evidencia cuando corresponde
→ Resultado histórico
→ Análisis
→ Refuerzo / continuidad
```

---

# 5. Seguimiento y refuerzo basado en datos reales

## P1 · Mi Rincón de Lectura → refuerzo / Misiones

### Estado

✅ Base lista

### Capacidad actual

Los datos del Rincón permiten identificar, entre otros casos:

- palabras sugeridas por Lía que no han sido superadas;
- palabras que se superaron después de varios intentos;
- necesidades concretas de pronunciación o práctica;
- acciones que pueden convertirse en Misiones.

Esta experiencia será referencia para otros motores, sin obligarlos a producir los mismos datos.

---

## P1 · Detectives → observaciones / Misiones

### Objetivo

Utilizar fallos, intentos, pasos y resultados de Detectives para proponer acciones de refuerzo y, cuando corresponda, preparar nuevas Misiones.

### Estado

⏳ Pendiente prioritario

### Regla

No inferir una dificultad global a partir de un único error. Las propuestas deben basarse en datos observables y expresarse como oportunidades concretas de práctica.

---

## P1 · Pruebas académicas → propuestas de refuerzo

### Objetivo

Aprovechar la persistencia ya disponible en los Temas Académicos para transformar resultados de pruebas en propuestas de práctica específica.

Datos ya disponibles en las referencias actuales:

- resultado total;
- porcentaje de la prueba;
- respuestas;
- explicaciones;
- mapa formativo por bloques;
- sesión histórica;
- relación con Misión cuando existe.

### Estado

⏳ Pendiente prioritario

### Próximo salto funcional

```text
Prueba persistida
→ mapa formativo
→ aspecto a reforzar
→ propuesta breve
→ revisión familiar
→ Misión de refuerzo
→ nueva oportunidad de aplicación
```

---

# 6. Compatibilidad de 5.º y evolución académica

## 6.1 Misiones de 5.º

Los recursos existentes de 5.º siguen siendo utilizables como Repaso Académico aunque no generen `sesionesAcademicas` ni evidencia estructurada.

### Estado

✅ Disponible

### Criterio

- no recrear páginas únicamente para cumplir el contrato nuevo;
- no migrar masivamente 5.º;
- mantener cierre manual de Misión donde no exista evidencia automática;
- modernizar selectivamente un tema de 5.º solo cuando vuelva a ser relevante y exista beneficio claro.

## 6.2 Misiones académicas existentes

La incorporación de persistencia no obliga a recrear las Misiones creadas previamente.

Una Misión existente puede aprovechar una ejecución futura de un recurso que ya soporte `sesion-academica-v1`.

Una actividad realizada antes de existir persistencia no generará retrospectivamente una sesión inexistente. Si se desea una nueva evaluación, se crea una nueva Misión conservando la anterior como historial.

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

## P2 · Información para adultos y profesionales

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

# 9. Constancia y logros

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

## P2 · Logros reales

### Objetivo

Generar hitos desde evidencias y progreso auténtico.

### Principio

Los logros no se generarán a partir de métricas ficticias ni de actividad superficial.

### Estado

⏳ Posterior a historial y evidencias suficientes

---

# 10. Inteligencia Artificial educativa

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

🔮 Evolución progresiva

La creación asistida basada en reglas y datos estructurados puede avanzar antes de depender de IA generativa.

---

# 11. Visión de largo alcance

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

# 12. Secuencia recomendada

```text
AHORA
────────────────────────────────────────────
P0  Consolidar Observaciones / Propuestas de Refuerzo
P0  Consolidar Creación asistida de Misiones

LÍNEAS TÉCNICAS QUE CONSERVAN VIGENCIA
────────────────────────────────────────────
P0  Cerrar Identidad, Usuarios y Auditoría · estado heredado: en cierre
P0  Revisar auditoría de Tareas / Misiones · estado heredado: siguiente bloque técnico
P0  Certificar núcleo multi-persona · estado heredado: próximo

SIGUIENTE
────────────────────────────────────────────
P1  Detectives → observaciones y Misiones de refuerzo
P1  Pruebas académicas → propuestas de refuerzo
P1  Continuar incorporación progresiva de 6.º

EN PARALELO SEGÚN NECESIDAD REAL DEL COLEGIO
────────────────────────────────────────────
P1  Nuevos temas de Matemáticas
P1  Science y siguientes asignaturas
P1  Calendario académico 2026–2027 cuando corresponda

DESPUÉS DE USO REAL SUFICIENTE
────────────────────────────────────────────
P2  Constancia basada en actividad real
P2  Logros reales
P2  Panel adulto / profesional
P3  Históricos de evolución ampliados
P3  IA educativa avanzada
```

---

# 13. Resumen de prioridades

| Prioridad | Iniciativa | Estado |
|---|---|---|
| Base | Creciendo por Dentro | ✅ Listo |
| Base | Biblioteca | ✅ Listo |
| Base | Trabajo realizado | ✅ Consolidado |
| Base | Misiones libres | ✅ Listo |
| Base | Repasos/Misiones con contenidos de 5.º | ✅ Disponible |
| Base | Persistencia de pruebas académicas | ✅ Implementada y validada en Puente/Fracciones |
| P0 | Observaciones / Propuestas de Refuerzo | 🚧 En progreso |
| P0 | Creación asistida de Misiones | 🚧 En progreso |
| P0 técnico | Cierre Identidad, Usuarios y Auditoría | 🚧 En cierre · estado heredado de v1.1 |
| P0 técnico | Auditoría de Tareas / Misiones | 🔜 Siguiente bloque técnico · estado heredado de v1.1 |
| P0 técnico | Certificación del núcleo multi-persona | 🔜 Próximo · estado heredado de v1.1 |
| P1 | Estructura 6.º de Primaria | 🚧 En progreso avanzado |
| P1 | Rincón de Lectura → Misiones de refuerzo | ✅ Base lista |
| P1 | Detectives → propuestas/Misiones | ⏳ Pendiente prioritario |
| P1 | Pruebas académicas → propuestas/Misiones | ⏳ Pendiente prioritario |
| P2 | Constancia real | ⏳ Posterior |
| P2 | Logros reales | ⏳ Posterior |
| P2 | Panel adulto / profesional | 🔮 Futuro |
| P3 | IA educativa avanzada | 🔮 Evolución futura |

---

# 14. Recordatorios transversales

El Roadmap no es propietario de las reglas técnicas/UX siguientes, pero las referencia como condiciones de cualquier nueva evolución:

- favicon oficial de la Academia en las páginas funcionales;
- `Volver` gobernado por el modelo de navegación y su historial lógico;
- conservación de Persona Activa durante navegación interna;
- Vista previa sin persistencia educativa;
- vistas históricas de resultados en solo lectura;
- mensajes de fallo que expliquen la causa cuando sea conocida y segura de mostrar.

Las definiciones propietarias viven en:

- `docs/models/MODELO_NAVEGACION.md`;
- `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`;
- `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md`.

---

# 15. Documentos relacionados

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
