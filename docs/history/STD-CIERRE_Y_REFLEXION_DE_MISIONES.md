# 🗃️ Cierre, Reflexión y Evidencias de las Misiones — archivo histórico
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta histórica** | `docs/history/STD-CIERRE_Y_REFLEXION_DE_MISIONES.md` |
| **Código histórico** | STD-012 |
| **Versión original** | 1.0 |
| **Estado** | Histórico |
| **Fecha de archivo** | 04/09/2026 |
| **Motivo** | Propuesta funcional de julio/agosto que no llegó a consolidarse como contrato activo y quedó superada por el modelo real de Misiones, evidencias, revisión familiar, Análisis Educativo y Reconocimientos. |
| **Fuentes vigentes sucesoras** | `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`, `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md`, `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md`, `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` y `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` según el aspecto consultado. |

> **Nota histórica:** el contenido original se conserva a continuación como fotografía de una propuesta de diseño. No constituye una fuente normativa vigente y no debe utilizarse para inferir que existen `ejecuciones`, un formulario de cierre independiente, un Árbol de Mi Camino, un Panel de Evolución o una API `Academia.tareas.ejecuciones` tal como aquí se propusieron.

---

# CONTENIDO ORIGINAL PRESERVADO

# STD-012_CIERRE_Y_REFLEXION_DE_MISIONES_v1.0

# Academia Gloria Valentina

## Estándar de Diseño

# Cierre, Reflexión y Evidencias de las Misiones

**Código:** STD-012  
**Versión:** 1.0  
**Estado:** Propuesta funcional para validación  
**Documentos relacionados:** `STD-009_SEGUIMIENTO_Y_MOTIVACION_v1.0.md`, `STD-011_MIS_TAREAS_Y_MISIONES_v1.0.md` y `09_MIS_TAREAS_v1.0.md`.

---

# 1. Objetivo

Definir el proceso mediante el cual una misión deja de ser únicamente una actividad completada y se convierte en una fuente de información útil para el seguimiento, la motivación y el crecimiento del alumno.

El cierre debe permitir registrar:

- qué se esperaba;
- qué ocurrió realmente;
- cómo realizó la actividad;
- qué apoyo necesitó;
- qué evidencias quedaron;
- qué conviene hacer después.

---

# 2. Principio central

Completar una misión no significa solamente marcar una casilla.

Significa detenerse un momento para comprender:

> ¿Qué hizo Gloria, cómo lo hizo y qué nos enseña esta experiencia?

La Academia debe conservar esa información sin convertir el aprendizaje en una evaluación rígida.

---

# 3. Conceptos

## 3.1 Tarea

Es la definición formal de una actividad.

Ejemplo:

> Realizar 5 retos de nivel 1 en Detectives de Problemas.

## 3.2 Misión

Es la forma motivadora en que la tarea se presenta a Gloria.

Ejemplo:

> 🧩 Resuelve cinco misterios matemáticos con calma y sigue las pistas de Lía.

## 3.3 Ejecución

Es cada ocasión concreta en la que Gloria realiza una tarea o misión.

Una misma tarea puede tener una o varias ejecuciones.

```text
Tarea: practicar lectura pausada

Ejecución 1: 12 de julio
Ejecución 2: 18 de julio
Ejecución 3: 25 de julio
```

## 3.4 Cierre de misión

Es el registro final de una ejecución.

Incluye:

- resultado;
- cantidad prevista;
- cantidad realizada;
- nivel;
- duración;
- ayuda;
- observaciones;
- evidencias;
- recomendación siguiente.

---

# 4. Filosofía

El cierre no debe centrarse únicamente en aciertos, errores, velocidad o cumplimiento exacto.

También debe reconocer:

- iniciativa;
- curiosidad;
- esfuerzo;
- repetición voluntaria;
- autonomía;
- disfrute;
- petición de ayuda;
- deseo de continuar;
- superación de lo esperado.

---

# 5. Flujo general

```text
Adulto crea una tarea
        ↓
La tarea se muestra como misión
        ↓
Gloria realiza la actividad
        ↓
El módulo registra evidencias
        ↓
La misión se marca como completada
        ↓
Se abre el cierre de la misión
        ↓
La familia registra el resultado real
        ↓
La Academia actualiza seguimiento, logros y recomendaciones
```

---

# 6. Estados relacionados con el cierre

## Estados de tarea

- `pendiente`
- `en_curso`
- `completada_pendiente_cierre`
- `completada`
- `necesita_ayuda`
- `vencida`
- `cancelada`

## Presentación para Gloria

| Estado interno | Presentación |
|---|---|
| pendiente | 🌱 Preparada |
| en_curso | ▶️ En aventura |
| completada_pendiente_cierre | ✨ Esperando celebración |
| completada | ✅ Conseguida |
| necesita_ayuda | 🤝 Necesito ayuda |
| vencida | 🌿 Podemos retomarla |

---

# 7. ¿Cuándo debe aparecer el cierre?

El cierre puede abrirse cuando:

1. un módulo informa que la actividad terminó;
2. un adulto pulsa **Marcar como completada**;
3. Gloria pulsa **Ya lo hice** en una tarea libre;
4. se registra una evidencia válida;
5. un adulto decide cerrar una actividad realizada fuera de la Academia.

---

# 8. Pantalla de cierre

Título recomendado:

```text
🌟 ¿Cómo fue esta aventura?
```

Texto introductorio:

> Guardemos lo más importante de esta experiencia para acompañar el crecimiento de Gloria.

---

# 9. Resultado general

Campo:

```text
¿Qué ocurrió?
```

Opciones iniciales:

- Se consiguió según lo previsto.
- Hizo más de lo esperado.
- Se consiguió parcialmente.
- Necesitó ayuda.
- Conviene repetirla.
- La terminaremos otro día.
- No se realizó.

Valores internos sugeridos:

```text
segun_lo_previsto
mas_de_lo_esperado
parcial
necesito_ayuda
repetir
continuar_otro_dia
no_realizada
```

---

# 10. Cantidad prevista y cantidad realizada

Cuando la tarea tenga una meta cuantificable, el cierre debe permitir comparar:

```text
Cantidad prevista: 5 retos
Cantidad realizada: 10 retos
```

Modelo sugerido:

```javascript
{
  unidad: "retos",
  cantidadPrevista: 5,
  cantidadRealizada: 10
}
```

La unidad puede ser: retos, historias, minutos, páginas, ejercicios, palabras, grabaciones, sesiones, actividades u otra.

---

# 11. Nivel previsto y nivel realizado

Cuando aplique:

```text
Nivel previsto: Nivel 1
Nivel realizado: Nivel 1
```

Campos:

```javascript
{
  nivelPrevisto: "1",
  nivelRealizado: "1"
}
```

El nivel nunca debe interpretarse de forma aislada. Debe analizarse junto con cantidad, ayuda, esfuerzo, precisión, disfrute y autonomía.

---

# 12. Duración

Campos:

```text
Tiempo estimado: 15 minutos
Tiempo real: 24 minutos
```

La duración no debe utilizarse para penalizar. Puede ayudar a detectar concentración prolongada, cansancio, necesidad de pausas, exceso de dificultad o entusiasmo por continuar.

---

# 13. Grado de ayuda

Campo:

```text
¿Cuánta ayuda necesitó?
```

Opciones:

- Ninguna.
- Una pequeña orientación.
- Varias ayudas.
- Acompañamiento continuo.
- No se pudo determinar.

Valores internos:

```text
ninguna
pequena
varias
continua
no_determinado
```

---

# 14. Autonomía e iniciativa

Campo opcional:

```text
¿Qué comportamiento observaste?
```

Opciones múltiples:

- Comenzó por iniciativa propia.
- Quiso continuar después de terminar.
- Repitió voluntariamente.
- Se corrigió por sí misma.
- Escuchó o revisó su trabajo.
- Pidió ayuda adecuadamente.
- Mantuvo la atención.
- Necesitó varios recordatorios.
- Mostró frustración.
- Disfrutó especialmente la actividad.

---

# 15. Observación familiar

Campo libre:

```text
Observaciones del adulto
```

Ejemplo:

> Aunque se le asignaron cinco retos, Gloria quiso continuar y realizó diez. Todos fueron de nivel 1. Se mantuvo motivada, leyó las consignas con calma y necesitó poca ayuda.

Las observaciones deben ser concretas, respetuosas, basadas en conductas observables y útiles para comparar futuras ejecuciones.

Se deben evitar etiquetas personales, juicios generales, comparaciones con otros niños y comentarios punitivos.

---

# 16. Evidencias

Una ejecución puede estar vinculada a una o varias evidencias.

Ejemplos:

- sesión de lectura;
- grabación;
- transcripción;
- análisis de palabras;
- caso de Detectives;
- libro registrado;
- imagen de una tarea en papel;
- nota del adulto;
- duración;
- número de intentos.

Modelo:

```javascript
{
  tipo: "detectives_sesion",
  modulo: "detectives",
  referenciaId: "sesion-abc123",
  resumen: "10 retos de nivel 1 completados.",
  creadaEn: "serverTimestamp"
}
```

La ejecución debe guardar referencias, no duplicar todo el contenido de cada módulo.

---

# 17. Recomendación para la siguiente misión

Campo:

```text
¿Qué conviene hacer después?
```

Opciones:

- Mantener el mismo nivel.
- Probar un nivel superior.
- Reducir dificultad.
- Repetir con menos cantidad.
- Repetir con más cantidad.
- Cambiar de actividad.
- Trabajar un aspecto concreto.
- No asignar una nueva misión todavía.

Valores internos:

```text
mantener_nivel
subir_nivel
bajar_nivel
repetir_menos
repetir_mas
cambiar_actividad
trabajar_aspecto
sin_nueva_mision
```

Debe existir también un campo **Comentario para la siguiente misión**.

Ejemplo:

> En la próxima sesión, proponer cinco retos de nivel 2 y permitir volver a nivel 1 si necesita confianza.

---

# 18. Cierre para Gloria

Gloria no debe ver el formulario técnico. Debe recibir un cierre amable y motivador.

Ejemplo:

```text
🌟 ¡Misión conseguida!

Hoy completaste 10 retos,
aunque la aventura proponía 5.

Tu curiosidad hizo crecer tu camino.
```

Si necesitó ayuda:

```text
🤝 Pedir ayuda también forma parte de aprender.

Hoy seguiste adelante acompañada
y completaste tu aventura.
```

Si debe continuar otro día:

```text
🌿 Esta aventura todavía está creciendo.

Podemos continuarla cuando estés preparada.
```

---

# 19. Relación con Mis Logros

Los cierres servirán como insumo para generar logros.

| Condición | Posible logro |
|---|---|
| Primera misión cerrada | 🌟 Primera misión |
| Realizó más de lo previsto | 🚀 Fui más allá |
| Repitió voluntariamente | 🌱 Volví a intentarlo |
| Pidió ayuda | 🤝 Sé pedir ayuda |
| Completó actividades de varios módulos | 🌈 Exploradora de mundos |
| Mantuvo constancia varias semanas | 🔥 Mi camino continúa |

No todos los cierres deben generar un logro. Los logros representan hitos, no cada actividad realizada.

---

# 20. Relación con Mi Constancia

La constancia debe alimentarse mediante ejecuciones significativas.

Un día podrá contar como activo cuando exista al menos uno de estos eventos:

- misión completada;
- sesión guardada;
- tarea libre validada;
- intento registrado;
- actividad continuada;
- cierre de misión registrado.

Un simple inicio de sesión no debería contar como constancia educativa.

---

# 21. Relación con el Árbol de Mi Camino

El árbol podrá crecer mediante señales derivadas del cierre:

- completar una misión;
- hacer más de lo previsto;
- repetir voluntariamente;
- pedir ayuda;
- probar un nivel nuevo;
- mantener constancia;
- completar distintos tipos de actividad.

El alumno verá crecimiento visual. Los valores técnicos permanecerán ocultos.

---

# 22. Relación con el Panel de Evolución

El Panel de Evolución podrá utilizar los cierres para responder:

- ¿Qué actividades motivan más a Gloria?
- ¿Cuándo suele hacer más de lo esperado?
- ¿Qué nivel completa con mayor autonomía?
- ¿En qué actividades necesita más ayuda?
- ¿Cuándo conviene subir o mantener dificultad?
- ¿Qué estrategias familiares funcionan mejor?
- ¿Cómo evoluciona su autonomía?
- ¿Cómo cambia su duración y concentración?

---

# 23. Modelo de datos propuesto

Colección:

```text
usuarios/{uid}/tareas/{tareaId}/ejecuciones/{ejecucionId}
```

Estructura:

```javascript
{
  tareaId: "tarea-123",
  alumnoId: "uid-alumno",

  inicioEn: "serverTimestamp",
  finalizacionEn: "serverTimestamp",
  estadoCierre: "cerrado",
  resultadoGeneral: "mas_de_lo_esperado",

  cantidad: {
    unidad: "retos",
    prevista: 5,
    realizada: 10
  },

  nivel: {
    previsto: "1",
    realizado: "1"
  },

  tiempo: {
    estimadoMinutos: 15,
    realMinutos: 28
  },

  ayuda: "pequena",

  comportamientos: [
    "quiso_continuar",
    "mantuvo_atencion",
    "disfruto_actividad"
  ],

  observacionAdulto:
    "Aunque se le asignaron cinco retos, realizó diez.",

  evidencias: [
    {
      tipo: "detectives_sesion",
      modulo: "detectives",
      referenciaId: "sesion-abc123",
      resumen: "10 retos de nivel 1."
    }
  ],

  recomendacion: {
    tipo: "subir_nivel",
    comentario:
      "Proponer cinco retos de nivel 2 en la próxima misión."
  },

  registradaPor: {
    uid: "uid-adulto",
    rol: "familia",
    nombreVisible: "Familia"
  },

  creadaEn: "serverTimestamp",
  actualizadaEn: "serverTimestamp"
}
```

---

# 24. Relación entre tarea y ejecución

La tarea conserva la definición. La ejecución conserva lo ocurrido.

```text
TAREA
“Realizar 5 retos de nivel 1”
        ↓
EJECUCIÓN
“Realizó 10 retos de nivel 1”
```

No se debe sobrescribir la definición original de la tarea con el resultado real.

---

# 25. Repetición de una tarea

Una tarea podrá generar varias ejecuciones.

```text
Tarea: Realizar retos de Detectives

Ejecución 1
5 retos · Nivel 1 · poca ayuda

Ejecución 2
10 retos · Nivel 1 · sin ayuda

Ejecución 3
5 retos · Nivel 2 · ayuda moderada
```

Esto permitirá observar evolución longitudinal.

---

# 26. Edición del cierre

El cierre podrá actualizarse.

Debe conservarse un historial mínimo de cambios:

- cierre creado;
- observación actualizada;
- cantidad corregida;
- recomendación modificada;
- evidencia añadida.

Nunca debe perderse silenciosamente la información anterior.

---

# 27. Reapertura

Una tarea completada podrá volver a estado `en_curso`.

Al reabrirse:

- la ejecución anterior permanece guardada;
- se crea una nueva ejecución cuando vuelva a realizarse;
- no se borra el cierre anterior;
- la misión puede volver a aparecer en Mi Camino.

---

# 28. Reglas funcionales

1. Una tarea completada no desaparece.
2. Cada ejecución conserva su propio cierre.
3. El resultado real no modifica la meta original.
4. Las observaciones deben poder actualizarse.
5. Las evidencias se guardan como referencias.
6. Pedir ayuda se considera una conducta positiva.
7. Hacer más cantidad no implica automáticamente subir de nivel.
8. Subir de nivel debe considerar autonomía, comprensión y bienestar.
9. El cierre debe ser breve y fácil de registrar.
10. Gloria debe recibir motivación, no un informe técnico.
11. Los adultos deben poder consultar cierres anteriores.
12. Las recomendaciones no deben aplicarse automáticamente en la versión inicial.

---

# 29. Alcance del MVP

La primera versión incluirá:

- apertura del cierre al completar una tarea;
- resultado general;
- cantidad prevista y realizada;
- nivel previsto y realizado;
- tiempo real;
- grado de ayuda;
- observación familiar;
- recomendación siguiente;
- guardar una ejecución;
- consultar cierres anteriores;
- editar el cierre;
- reapertura sin borrar el historial.

No incluirá todavía:

- recomendaciones automáticas;
- generación automática de logros;
- análisis inteligente;
- comparación gráfica avanzada;
- acceso para profesionales externos;
- creación automática de la siguiente misión.

---

# 30. Pantalla inicial propuesta

```text
🌟 ¿Cómo fue esta aventura?

Resultado
[ Hizo más de lo esperado ▼ ]

Cantidad prevista
[ 5 ] [ retos ▼ ]

Cantidad realizada
[ 10 ] [ retos ▼ ]

Nivel previsto
[ Nivel 1 ▼ ]

Nivel realizado
[ Nivel 1 ▼ ]

Ayuda
[ Una pequeña orientación ▼ ]

Observaciones
[ Aunque se le asignaron cinco retos... ]

Siguiente paso
[ Probar un nivel superior ▼ ]

Comentario
[ Proponer cinco retos de nivel 2... ]

[ Guardar cierre ]
```

---

# 31. Criterios de aceptación

El MVP estará completo cuando:

- una tarea completada permita abrir su cierre;
- se pueda registrar el resultado real;
- se pueda comparar previsto y realizado;
- se pueda registrar nivel y ayuda;
- se pueda añadir una observación;
- se pueda registrar una recomendación;
- el cierre quede asociado a una ejecución;
- se puedan consultar cierres anteriores;
- una tarea reabierta no pierda su ejecución anterior;
- Mi Camino pueda mostrar una felicitación basada en el cierre.

---

# 32. Ejemplo completo

## Tarea

```text
Realizar 5 retos de nivel 1
en Detectives de Problemas.
```

## Resultado real

```text
Realizó 10 retos de nivel 1.
```

## Cierre

```text
Resultado:
Hizo más de lo esperado.

Cantidad:
Prevista: 5 retos
Realizada: 10 retos

Nivel:
Previsto: Nivel 1
Realizado: Nivel 1

Ayuda:
Una pequeña orientación.

Observación:
Gloria quiso continuar después de completar los cinco retos.
Se mantuvo motivada y realizó diez en total.

Siguiente paso:
Probar cinco retos de nivel 2.

Comentario:
Permitir regresar al nivel 1 si necesita recuperar confianza.
```

## Mensaje para Gloria

```text
🚀 ¡Fuiste más allá!

La misión proponía 5 retos
y tú decidiste completar 10.

Tu curiosidad hizo crecer tu camino.
```

---

# 33. Próximos productos

## Producto 1

Diseño visual del formulario:

```text
mi-universo/mis-tareas/cierre.html
```

o un panel modal dentro de Mis Tareas.

## Producto 2

Modelo Firebase:

```text
usuarios/{uid}/tareas/{tareaId}/ejecuciones/
```

## Producto 3

API:

```text
Academia.tareas.ejecuciones
```

Operaciones:

- crear;
- leer;
- actualizar;
- observar;
- añadirEvidencia;
- reabrir.

## Producto 4

Integración inicial con Detectives de Problemas.

## Producto 5

Integración con Mi Rincón de Lectura.

---

# Resumen

La tarea define lo que se propone.

La misión presenta esa tarea de forma motivadora.

La ejecución registra cada ocasión concreta.

El cierre explica qué ocurrió realmente.

Las evidencias muestran el trabajo realizado.

La recomendación ayuda a decidir el siguiente paso.

Los cierres alimentarán Logros, Constancia, el Árbol de Mi Camino y el futuro Panel de Evolución.
