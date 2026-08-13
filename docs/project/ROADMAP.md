# 🌈 Academia Gloria Valentina
# ROADMAP

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ROADMAP.md` |
| **Versión del documento** | 1.1 |
| **Estado** | Activo |
| **Última actualización** | 12/08/2026 |
| **Responsables** | Juan Perdomo + IA |
| **Ámbito** | Evolución funcional y prioridades de producto |

---

# Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 22/07/2026 | Juan Perdomo | Primera versión del roadmap funcional de la Academia. |
| 1.1 | 12/08/2026 | Juan Perdomo + IA | Actualiza el estado real del producto, incorpora Identidad Multi-Persona, Gestión de Usuarios, auditoría y reorganiza las prioridades inmediatas hacia cierre de núcleo, 6.º de Primaria y seguimiento basado en datos reales. |

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

Establecer un punto técnico estable antes de comenzar 6.º de Primaria.

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

# 5. Próxima etapa académica · Curso 2026–2027

## P1 · Academia 6.º de Primaria

### Objetivo

Preparar la Academia para acompañar el nuevo curso escolar sin reconstruir los módulos existentes.

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

### Estado

🔜 Prioridad alta después del cierre del núcleo

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

⏳ Pendiente prioritario

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

⏳ Pendiente prioritario

---

## P2 · Constancia basada en actividad significativa

### Objetivo

Medir continuidad educativa real, no accesos o logins.

### Fuentes futuras

- lectura;
- Detectives;
- Misiones;
- Creciendo por Dentro;
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
AGOSTO 2026
────────────────────────────────────────────
P0  Cerrar Gestión de Usuarios
P0  Revisar auditoría de Tareas / Misiones
P0  Actualizar documentación estratégica
P0  Certificar núcleo multi-persona

FIN DE AGOSTO / SEPTIEMBRE 2026
────────────────────────────────────────────
P1  Preparar Academia 6.º de Primaria
P1  Calendario académico 2026–2027
P1  Incorporación progresiva de contenidos reales

SEPTIEMBRE / OCTUBRE 2026
────────────────────────────────────────────
P1  Historial mínimo de Detectives
P1  Evidencias reales de Misiones / Tareas
P2  Constancia basada en actividad real

DESPUÉS DE USO REAL SUFICIENTE
────────────────────────────────────────────
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
| P0 | Auditoría de Tareas / Misiones | 🔜 Siguiente |
| P0 | Actualización documental estratégica | 🔜 Próximo |
| P0 | Certificación del núcleo multi-persona | 🔜 Próximo |
| P1 | Academia 6.º de Primaria | ⏳ Preparación |
| P1 | Calendario 2026–2027 | ⏳ Preparación |
| P1 | Historial mínimo de Detectives | ⏳ Pendiente |
| P1 | Evidencias de Misiones / Tareas | ⏳ Pendiente |
| P2 | Constancia real | ⏳ Posterior |
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
- `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`

---

**Academia Gloria Valentina 🌈**

*El Roadmap orienta el futuro; el uso real decide qué merece construirse.*
