# 09_MIS_TAREAS_v1.0

# Academia Gloria Valentina

## Diseño funcional del módulo Mis Tareas

**Versión:** 1.0
**Estado:** Propuesta funcional para validación
**Documento relacionado:** `STD-011_MIS_TAREAS_Y_MISIONES_v1.0.md`

---

# 1. Propósito

Definir la primera versión funcional de **Mis Tareas**, el espacio donde la familia, tutores y profesionales podrán crear actividades, asignarlas a un alumno y realizar seguimiento.

Para el alumno, cada tarea se presentará como una **misión motivadora** dentro de **Mi Camino**.

# 2. Principio central

La información se divide en dos experiencias:

## Vista del adulto

Permite crear tareas, definir objetivos, establecer fechas y tiempo estimado, asociar un módulo, revisar el estado, añadir observaciones, consultar evidencias y cerrar o reabrir una tarea.

## Vista del alumno

Muestra únicamente qué misión tiene, qué debe hacer, cuánto tiempo puede necesitar, cuándo debería completarla, el botón para comenzar, un mensaje de motivación y el reconocimiento al finalizar.

# 3. Alcance de la versión 1.0

La primera versión permitirá:

1. Crear una tarea.
2. Asociarla a un alumno.
3. Vincularla a un módulo de la Academia o dejarla como tarea libre.
4. Mostrarla como misión en Mi Camino.
5. Abrir el módulo correspondiente.
6. Cambiar su estado.
7. Registrar observaciones.
8. Guardar evidencias básicas.
9. Consultar el historial de cambios.
10. Mantener las tareas completadas disponibles para seguimiento.

No se incluirán todavía asignación automática, recomendaciones inteligentes, notificaciones, recompensas automáticas complejas, integración con profesionales externos ni reglas avanzadas de recurrencia.

# 4. Roles

## Alumno

Puede consultar sus misiones, iniciar una misión, abrir el módulo asociado, solicitar ayuda, marcar una tarea libre como realizada y ver mensajes de motivación.

No puede eliminar tareas, cambiar objetivos, modificar fechas ni editar observaciones adultas.

## Familia

Puede crear y modificar tareas, revisar evidencias, añadir observaciones, cambiar estados, validar la finalización y cancelar o reabrir una tarea.

## Tutor o profesional

En versiones posteriores podrá crear y revisar tareas autorizadas, añadir observaciones profesionales y consultar evidencias asociadas. La versión inicial puede utilizar el rol genérico **Adulto acompañante**.

# 5. Tipos de tarea

- **Actividad de módulo:** leer una historia, resolver un caso o registrar un libro.
- **Tiempo de práctica:** practicar lectura durante 10 minutos.
- **Cantidad de actividades:** resolver dos casos durante la semana.
- **Tarea libre:** escribir en papel cinco frases.
- **Tarea combinada:** leer, grabar, escuchar y guardar.

# 6. Estados

## Estados internos

- `pendiente`
- `en_curso`
- `completada_pendiente_validacion`
- `completada`
- `necesita_ayuda`
- `vencida`
- `cancelada`

## Presentación para el alumno

| Estado interno | Presentación |
|---|---|
| pendiente | 🌱 Preparada |
| en_curso | ▶️ En aventura |
| completada_pendiente_validacion | ✨ Esperando celebración |
| completada | ✅ Conseguida |
| necesita_ayuda | 🤝 Necesito ayuda |
| vencida | 🌿 Podemos retomarla |
| cancelada | No se muestra |

Una tarea vencida nunca utilizará mensajes de castigo.

# 7. Modelo de datos propuesto

Colección:

```text
usuarios/{uid}/tareas/{tareaId}
```

Estructura inicial:

```javascript
{
  alumnoId: "uid-del-alumno",
  titulo: "Leer una historia esta semana",
  descripcion: "Completar una historia de nivel 2.",
  tipo: "actividad_modulo",
  modulo: "rincon-lectura",
  destinoUrl: "/mi-universo/rincon-lectura/",
  objetivo: "Leer con calma y escuchar la grabación.",
  criterioFinalizacion: "Guardar una sesión de lectura.",
  fechaInicio: "2026-07-27",
  fechaLimite: "2026-08-02",
  tiempoEstimadoMinutos: 15,
  prioridad: "normal",
  estado: "pendiente",
  asignadaPor: {
    uid: "uid-adulto",
    rol: "familia",
    nombreVisible: "Familia"
  },
  presentacionAlumno: {
    tituloMision: "Misión de lectura",
    mensaje: "Lía tiene una nueva historia esperando para ti.",
    icono: "📖"
  },
  progreso: {
    iniciadaEn: null,
    completadaEn: null,
    tiempoRealMinutos: null,
    intentos: 0
  },
  evidencia: {
    tipo: null,
    modulo: null,
    referenciaId: null,
    resumen: null
  },
  observacionActual: "",
  historialObservaciones: [],
  creadaEn: "serverTimestamp",
  actualizadaEn: "serverTimestamp"
}
```

# 8. Historial de cambios

Subcolección recomendada:

```text
usuarios/{uid}/tareas/{tareaId}/historial/{eventoId}
```

Cada evento conservará el tipo, estado anterior, estado nuevo, usuario, rol, comentario y fecha.

Eventos iniciales:

- tarea creada;
- tarea modificada;
- misión iniciada;
- ayuda solicitada;
- evidencia recibida;
- tarea completada;
- tarea validada;
- observación añadida;
- tarea reabierta;
- tarea cancelada.

# 9. Pantalla Mis Tareas — Vista del adulto

Encabezado:

```text
📌 Mis Tareas
Organiza actividades, acompaña el progreso
y conserva evidencias del aprendizaje.
```

Acción principal:

```text
[ + Crear nueva tarea ]
```

Filtros iniciales:

- Activas
- Pendientes
- En curso
- Por validar
- Completadas
- Necesitan ayuda
- Todas

Cada tarjeta mostrará título, alumno, módulo, fecha límite, tiempo estimado, estado y botón **Revisar**.

# 10. Formulario Crear tarea

Campos esenciales:

- Alumno
- Título
- Descripción
- Tipo de tarea
- Módulo
- URL o actividad asociada
- Criterio de finalización
- Fecha de inicio
- Fecha límite
- Tiempo estimado
- Prioridad
- Icono
- Título de misión
- Mensaje motivador de Lía
- Objetivo educativo
- Indicaciones para la familia
- Observación inicial

Botones:

```text
[ Guardar borrador ]
[ Crear misión ]
[ Cancelar ]
```

# 11. Mi Camino — Vista del alumno

Mi Camino mostrará un máximo de tres misiones destacadas.

```text
📖 Misión de lectura

Lía tiene una historia esperando para ti.

⏱️ 15 minutos
📅 Antes del domingo

[ Comenzar misión → ]
```

Al pulsar:

1. la tarea pasa a `en_curso`;
2. se registra la fecha de inicio;
3. se añade un evento al historial;
4. se abre el módulo asociado.

# 12. Relación entre misión y tarea

No existirán dos registros independientes. La misión será la representación para el alumno de una misma tarea.

```text
Tarea almacenada
      ↓
Vista del adulto: información completa
      ↓
Vista del alumno: misión motivadora
```

# 13. Finalización

## Automática

Un módulo puede informar que existe una evidencia válida. Por ejemplo, una sesión guardada en Mi Rincón de Lectura puede mover la tarea a `completada_pendiente_validacion`.

## Manual por el alumno

Para tareas libres se mostrará:

```text
[ Ya lo hice ]
```

## Validación adulta

El adulto puede aprobar, pedir una pequeña mejora, reabrir o añadir una observación. La aprobación cambia el estado a `completada`.

# 14. Evidencias

La primera versión admitirá:

- referencia a una sesión de módulo;
- texto breve;
- observación familiar;
- fecha y tiempo;
- confirmación manual.

No se duplicará dentro de la tarea todo el contenido de la sesión. Se guardará una referencia.

# 15. Motivación al completar

```text
🌟 ¡Misión conseguida!

Hoy leíste, escuchaste tu voz
y decidiste cómo querías mejorar.

Tu camino continúa creciendo.
```

La motivación reconocerá acción, esfuerzo, repetición voluntaria, constancia, solicitud de ayuda y finalización.

# 16. Conexión con el Árbol

En la versión inicial, el árbol podrá crecer mediante puntos internos no visibles:

| Acción | Crecimiento |
|---|---:|
| iniciar una misión | 1 |
| completar una tarea | 3 |
| volver a intentarlo | 1 |
| pedir ayuda | 1 |
| completar distintos módulos | 2 |
| mantener constancia semanal | 3 |

El alumno verá crecimiento visual, no puntos técnicos.

# 17. Reglas funcionales

1. Una tarea completada no se elimina.
2. Una tarea puede reabrirse.
3. Las modificaciones relevantes generan historial.
4. La evidencia pertenece al alumno.
5. La misión debe comprenderse sin ayuda adulta.
6. No se mostrarán más de tres misiones prioritarias en Mi Camino.
7. Las tareas vencidas se presentan como retomables.
8. Pedir ayuda es una conducta positiva.
9. El adulto conserva la validación final en la versión inicial.
10. Los módulos pueden sugerir finalización, pero no eliminar tareas.

# 18. Primera secuencia de desarrollo

## Producto 1

Nueva versión visual de `mi-universo/mi-camino/index.html`:

1. Árbol de Mi Camino.
2. Explicación de etapas.
3. Mi aventura de hoy con misiones pulsables.
4. Mis Tareas.
5. Mis Logros.
6. Mi Constancia.
7. Sin catálogo repetido de módulos.

## Producto 2

Primera pantalla:

```text
mi-universo/mis-tareas/index.html
```

Con datos simulados: listado, filtros, detalle y formulario.

## Producto 3

API Firebase:

```text
Academia.tareas
```

Operaciones: crear, leer, observar, actualizar, cambiarEstado, añadirObservacion, registrarEvidencia y leerHistorial.

## Producto 4

Conexión inicial con Mi Rincón de Lectura.

# 19. Criterios de aceptación del MVP

El MVP estará listo cuando:

- un adulto pueda crear una tarea;
- Gloria pueda verla como misión;
- pueda iniciar la misión;
- el botón abra el módulo correcto;
- la tarea cambie a en curso;
- una sesión pueda asociarse como evidencia;
- el adulto pueda revisar y validar;
- las observaciones queden guardadas;
- el historial conserve los cambios;
- Mi Camino refleje el estado actualizado.

# 20. Ejemplo completo

## Registro adulto

```text
Título: Leer una historia esta semana
Módulo: Mi Rincón de Lectura
Objetivo: Practicar una lectura más pausada
Fecha límite: Domingo
Tiempo estimado: 15 minutos
Criterio: Guardar la grabación y las respuestas
```

## Presentación para Gloria

```text
📖 Misión de lectura

Lía tiene una historia esperando para ti.

Lee con calma, escucha tu voz
y decide si quieres volver a intentarlo.

[ Comenzar misión → ]
```

## Evidencia

```text
Historia: La guacamaya azul
Duración: 2:06
Intentos: 2
Sesión guardada: Sí
```

## Observación adulta

```text
En el segundo intento leyó más despacio
y utilizó Detener por iniciativa propia.
```

## Resultado

```text
✅ Misión conseguida
```

# 21. Próxima decisión

Antes de implementar Firebase se validará visualmente:

- el orden de Mi Camino;
- la cantidad de información mostrada a Gloria;
- el formulario de adultos;
- los estados;
- la diferencia entre misión y tarea;
- el mecanismo de validación.

# Resumen

**Mis Tareas** será el sistema formal de planificación y seguimiento.

**Las Misiones** serán la presentación motivadora de esas tareas.

**Mi Camino** mostrará qué hacer, cómo avanza el alumno y qué ha conseguido.

**Los módulos** generarán las evidencias.

**La familia** acompañará, observará y validará.
