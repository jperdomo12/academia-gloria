# 🌈 Academia Gloria Valentina
# ROADMAP

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ROADMAP.md` |
| **Versión del documento** | 1.2 |
| **Estado** | Activo |
| **Última actualización** | 28/08/2026 |
| **Responsables** | Juan Perdomo + IA |
| **Ámbito** | Evolución funcional y prioridades de producto |

---

# Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 22/07/2026 | Juan Perdomo | Primera versión del roadmap funcional de la Academia. |
| 1.1 | 12/08/2026 | Juan Perdomo + IA | Actualiza el estado real del producto, incorpora Identidad Multi-Persona, Gestión de Usuarios, auditoría y reorganiza las prioridades inmediatas hacia cierre de núcleo, 6.º de Primaria y seguimiento basado en datos reales. |
| 1.2 | 28/08/2026 | Juan Perdomo + IA | Actualiza la dirección de 6.º: patrón de temas, Puente 5.º→6.º, Fracciones como primer tema real, Vista previa/Sesión de aprendizaje, evidencia académica y primera integración prevista con Misiones de repaso académico. |

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
9. **Aprendizaje antes que interfaz.** En 6.º, una pantalla solo se considera valiosa si ayuda a comprender, practicar, evaluar o decidir el siguiente paso.
10. **Menos ambigüedad, no menos conocimiento.** Las adaptaciones TEL reducirán carga innecesaria sin rebajar el contenido académico.

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
- navegación `Volver` multinivel sin ciclos;
- Mi Camino;
- Mis Tareas / Misiones;
- Biblioteca Encantada;
- Mi Rincón de Lectura;
- Detectives de Problemas;
- Creciendo por Dentro;
- calendarios personales y académicos;
- identidad y contexto multi-persona;
- lector de texto compartido;
- contrato genérico de sesiones académicas para experiencias de 6.º;
- cierre automático de sesión por inactividad.

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

## 3.3 Experiencia de producto 6.º ya iniciada

Durante agosto de 2026 se inició la nueva dirección de 6.º con:

- portal de 6.º;
- Matemáticas 6.º;
- microherramienta transversal **Sentido de las operaciones**;
- piloto de resolución de problemas;
- dos modos de ejecución: **Sesión de aprendizaje** y **Vista previa / Explorar**;
- persistencia académica genérica solo en Sesión de aprendizaje;
- lector contextual compartido;
- principio de variantes controladas para evitar responder por memoria.

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

Establecer un punto técnico estable antes de ampliar significativamente 6.º de Primaria.

### Núcleo a certificar

```text
Login
ContextoUsuario
Persona propia
Persona Activa
Panel de usuario
Navegación
Volver multinivel
API Academia
Permisos
Firestore Rules
Gestión de Usuarios
Rutas local / GitHub Pages
Logout
Timeout de sesión
```

### Resultado esperado

Una lista corta y reutilizable de pruebas de regresión.

### Estado

🚧 Parcialmente certificado durante los bloques de agosto; mantener regresión antes de cada ampliación importante.

---

# 5. Próxima etapa académica · Curso 2026–2027

## P1 · Academia 6.º de Primaria

### Objetivo

Preparar la Academia para acompañar el nuevo curso escolar sin reconstruir los módulos existentes y sin copiar mecánicamente la experiencia de 5.º.

### Alcance

```text
6.º de Primaria
├── Portal del curso
├── Asignaturas
│   ├── Matemáticas
│   ├── Lengua
│   ├── Sociales
│   ├── Science
│   └── Inglés
├── Calendario académico 2026–2027
├── Misiones / Tareas
└── Contenidos incorporados según necesidad real
```

**Science** conserva su nombre oficial de asignatura; la interfaz general permanece en español.

### Principio de producto

6.º debe sentirse **maduro + mágico**.

La prioridad será adaptar progresivamente la Academia a:

- contenidos reales del colegio;
- materiales escolares reales;
- necesidades observadas;
- evaluaciones;
- tareas;
- refuerzos;
- objetivos personales y educativos;
- evidencia real de aprendizaje.

No generar grandes volúmenes de contenido por adelantado.

### Patrón de tema aprobado

Para los temas donde demuestre ser útil:

```text
Resumen → Teoría → Fichas → Práctica → Prueba
```

Criterios asociados:

- ayudas visuales abundantes y funcionales;
- textos cortos y progresivos;
- audio contextual cuando reduzca carga de lectura;
- práctica con pistas, ayudas y reintentos;
- prueba sin pistas;
- explicación de la respuesta seleccionada, sea correcta o incorrecta;
- resultado numérico de la prueba + mapa formativo;
- variantes controladas para reducir memorización de pantalla;
- no confundir resultado de una sesión con calificación escolar.

### Modos de ejecución

```text
🎓 Sesión de aprendizaje
👀 Vista previa / Explorar
```

- **Sesión de aprendizaje:** puede producir evidencia académica útil.
- **Vista previa:** totalmente interactiva, pero no debe contaminar historial, progreso ni evidencia del alumno.

### Estado

🚧 En desarrollo activo

---

## P1 · Puente 5.º → 6.º de Matemáticas

### Objetivo

Obtener una fotografía inicial de bases relevantes de 5.º antes de aumentar la dificultad de 6.º.

### Bases actuales

1. operaciones y jerarquía;
2. fracciones y equivalencias básicas;
3. resolución de problemas;
4. perímetro y área.

### Regla pedagógica

El Puente solo debe medir conocimientos de transición ya esperables. **No debe convertir en fallo contenidos nuevos de 6.º que todavía no hayan sido enseñados.**

### Experiencia validada en rama de producto

- `Resumen → Teoría → Fichas → Práctica → Prueba`;
- ayudas visuales reales;
- escuchas en introducción, resumen, teoría, fichas, práctica, explicaciones y cierre;
- explicación de cada respuesta de prueba;
- resultado total `X/N + porcentaje`;
- revisión de respuestas;
- mapa por bloques;
- persistencia solo en Sesión de aprendizaje.

### Estado

🚧 Producto aprobado funcionalmente en rama; pendiente cierre técnico, PR y publicación en `main`.

---

## P1 · Fracciones · primer tema real de Matemáticas 6.º

### Objetivo

Convertir Fracciones en el primer tema académico completo que valide el nuevo patrón de 6.º.

### Contenido inicial

1. significado de una fracción;
2. numerador y denominador;
3. fracciones equivalentes;
4. amplificación y simplificación;
5. suma/resta con igual denominador;
6. denominador común mediante m.c.m.;
7. suma con distinto denominador;
8. multiplicación de fracciones;
9. división de fracciones;
10. problemas de varios pasos.

### Experiencia validada en rama de producto

- apoyos mediante barras, porciones, equivalencias y modelos visuales;
- explicación antes de fórmula cuando sea posible;
- fichas de memoria breve;
- práctica progresiva con ayudas;
- prueba con familias y variantes controladas;
- explicación inmediata de cada respuesta seleccionada;
- resultado `X/10 + porcentaje`;
- revisión final;
- mapa formativo por bloques;
- lector a ritmo reducido para este tema;
- Vista previa sin persistencia;
- Sesión de aprendizaje con evidencia académica.

### Decisión de alcance

**Operaciones combinadas con fracciones** no se incorporarán solo por aparecer mencionadas en el material. Se añadirán cuando exista suficiente desarrollo académico para definir procedimiento, ejemplos y nivel de dificultad.

### Estado

🚧 Producto aprobado funcionalmente en rama; pendiente cierre técnico, PR y publicación en `main`.

---

# 6. Seguimiento educativo basado en datos reales

## P1 · Historial mínimo de Detectives

### Objetivo

Conservar sesiones reales y permitir consultar evolución sin convertir todavía el módulo en un sistema estadístico complejo.

### Incluye progresivamente

- sesión;
- nivel;
- casos trabajados;
- respuestas;
- resultados;
- fecha;
- referencia a misión cuando corresponda.

### Estado

🟡 Base de historial existente; continuar validación con uso real.

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

🚧 Integración existente en módulos específicos; pendiente ampliar de forma coherente a las sesiones académicas genéricas de 6.º.

---

## P1 · Sesiones académicas de 6.º

### Base implementada

Existe un contrato compartido para registrar sesiones académicas útiles en:

```text
usuarios/{personaActiva}/sesionesAcademicas/{sesionId}
```

El contrato distingue Vista previa de Sesión de aprendizaje y permite conservar resultados, respuestas, variantes y retroalimentación útil.

### Siguiente validación

Realizar la primera ejecución real de Puente / Fracciones como Sesión de aprendizaje y comprobar que la evidencia resultante sea útil para familia y profesionales.

### Estado

🟡 Base implementada · validación real pendiente

---

## P1 · Integración de 6.º con Misiones de repaso académico

### Decisión

Los contenidos académicos de 6.º deben asignarse mediante el sistema actual de **Gestión de Misiones**, evitando crear un subsistema paralelo.

Primera configuración prevista:

```text
Tipo: Repaso académico
Curso: 6.º de Primaria
Materia: Matemáticas
Tema: Puente 5.º → 6.º o Fracciones
Recurso: URL estable publicada en main
```

### Límite actual

`repaso_academico` ya puede organizar la Misión y abrir un recurso académico por URL, pero **todavía no enlaza automáticamente una sesión genérica de `sesionesAcademicas` como evidencia específica de esa Misión**.

La primera Misión real servirá para validar el flujo existente antes de decidir cómo realizar esa unión. La solución futura debe reutilizar Misiones + `sesionesAcademicas`, no duplicar datos.

### Estado

🔜 Inmediatamente después de publicar Puente + Fracciones en `main`

---

## P2 · Constancia basada en actividad significativa

### Objetivo

Medir continuidad educativa real, no accesos o logins.

### Fuentes futuras

- lectura;
- Detectives;
- Misiones;
- Creciendo por Dentro;
- sesiones académicas de 6.º;
- otras experiencias educativas reales.

### Estado

⏳ Después de disponer de datos suficientes

---

## P2 · Logros reales

### Objetivo

Generar hitos desde evidencias y progreso auténtico.

### Principio

Los logros no se generarán a partir de métricas ficticias ni de actividad superficial.

Las futuras guacamayas/recompensas deberán reconocer esfuerzo, persistencia, autonomía, crecimiento o finalización sin castigo, comparación pública ni economía competitiva de puntos.

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
- vistas adultas/profesionales basadas en información autorizada;
- lectura comprensible de evidencia académica real de 6.º.

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
- análisis de evolución;
- selección futura de refuerzos o recuperación espaciada basada en evidencia real.

### Estado

🔮 Largo plazo

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

En la transición hacia ESO, la Academia deberá ofrecer evidencia útil, pero **no declarar por sí sola que un alumno está “listo para ESO”**; esa valoración corresponde a familia y profesionales apoyados en información real.

---

# 11. Secuencia recomendada

```text
AGOSTO 2026
────────────────────────────────────────────
P0  Mantener cierre/certificación del núcleo
P1  Cerrar Puente 5.º → 6.º
P1  Cerrar Fracciones como primer tema real de 6.º
P1  PR + merge + publicación estable
P1  Crear primera Misión de repaso académico de 6.º
P1  Primera Sesión de aprendizaje real
P1  Validar evidencia y decidir refuerzos

SEPTIEMBRE 2026
────────────────────────────────────────────
P1  Continuar Matemáticas 6.º con contenidos reales del colegio
P1  Calendario académico 2026–2027
P1  Ampliar integración Misiones ↔ sesiones académicas si el uso real la justifica
P1  Priorizar refuerzos según evidencia del Puente

SEPTIEMBRE / OCTUBRE 2026
────────────────────────────────────────────
P1  Consolidar históricos y evidencias educativas
P2  Introducir progresivamente variación, transferencia y retención
P2  Constancia basada en actividad real

DESPUÉS DE USO REAL SUFICIENTE
────────────────────────────────────────────
P2  Intercalar / Recordar
P2  Logros reales
P3  Panel adulto / profesional
P3  Históricos de evolución
P3  IA educativa
```

---

# 12. Resumen de prioridades

| Prioridad | Iniciativa | Estado |
|---|---|---|
| P0 | Cierre Gestión de Usuarios | 🚧 En cierre |
| P0 | Auditoría de Tareas / Misiones | 🔜 Siguiente bloque técnico |
| P0 | Certificación del núcleo multi-persona | 🚧 Parcial / regresión continua |
| P1 | Academia 6.º de Primaria | 🚧 En desarrollo activo |
| P1 | Puente 5.º → 6.º | ✅ Aprobado en rama · pendiente merge |
| P1 | Fracciones 6.º | ✅ Aprobado en rama · pendiente merge |
| P1 | Primera Misión académica 6.º | 🔜 Después del merge |
| P1 | Primera evidencia real Puente/Fracciones | 🔜 Siguiente validación |
| P1 | Calendario 2026–2027 | ⏳ Preparación |
| P1 | Historial / evidencias educativas | 🟡 Base existente · evolución |
| P2 | Constancia real | ⏳ Posterior |
| P2 | Intercalar / Recordar | ⏳ Después de evidencia suficiente |
| P2 | Logros reales | ⏳ Posterior |
| P3 | Panel adulto / profesional | 🔮 Futuro |
| P3 | IA educativa | 🔮 Largo plazo |

---

# 13. Documentos relacionados

- `docs/README.md`
- `docs/project/MASTER_PLAN.md`
- `docs/project/PROJECT_MAP.md`
- `docs/project/DECISION_LOG.md`
- `docs/project/RELEASE_NOTES.md`
- `docs/models/MODELO-USUARIOS_ALUMNOS_Y_ROLES.md`
- `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md`
- `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`
- `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`

---

**Academia Gloria Valentina 🌈**

*El Roadmap orienta el futuro; el uso real decide qué merece construirse.*
