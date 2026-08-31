# STD-011_MIS_TAREAS_Y_MISIONES_v1.1

# Academia Gloria Valentina

## Estándar de Diseño

# Sistema de Tareas, Misiones y Seguimiento

**Código:** STD-011

**Versión:** 1.1

**Estado:** Aprobado para desarrollo

**Última actualización:** Agosto 2026

---

# 1. Objetivo

Definir el modelo mediante el cual la Academia organiza las actividades que un alumno debe realizar, las presenta de forma motivadora y registra posteriormente su evolución.

El sistema debe permitir que padres, tutores y profesionales planifiquen objetivos educativos sin perder el enfoque lúdico y motivador de la Academia.

---

# 2. Filosofía

La Academia no entrega tareas.

La Academia propone aventuras.

Los adultos organizan el aprendizaje.

Gloria vive una misión.

---

# 3. Conceptos

## 3.1 Tarea

Una tarea es la definición formal de una actividad.

Está orientada al seguimiento.

Contiene toda la información necesaria para padres, tutores y profesionales.

Una tarea puede:

- estar pendiente
- estar en curso
- completarse
- necesitar ayuda
- cancelarse

---

## 3.2 Misión

Una misión es la forma en que una tarea se presenta al alumno.

Su objetivo es motivar.

Nunca debe parecer un deber escolar.

Ejemplo:

Tarea:

Leer una historia del Nivel 2.

Misión:

📖

Lía encontró una nueva historia y necesita tu ayuda para descubrir su final.

---

# 4. Flujo general

Adulto

↓

Crea una tarea

↓

La Academia genera una misión

↓

Gloria realiza la misión

↓

La Academia registra automáticamente la actividad cuando dispone de una evidencia verificable, o permite que Gloria indique manualmente que ha terminado cuando no existe un mecanismo automático fiable

↓

Mi Camino muestra el progreso

↓

El Panel de Evolución consolida toda la información

---

# 5. Tipos de tarea

## 5.1 Actividad de un módulo

Ejemplo

Resolver un caso de Detectives.

---

## 5.2 Tiempo de práctica

Ejemplo

Leer aproximadamente 10 minutos.

---

## 5.3 Cantidad

Ejemplo

Leer dos historias esta semana.

---

## 5.4 Objetivo libre

Ejemplo

Escribir en papel cinco frases sobre tus vacaciones.

Una Misión libre no debe conservar accidentalmente un módulo de la Academia. Su módulo asociado será `libre` / actividad fuera de la Academia, salvo que exista una actividad digital concreta y explícitamente asociada.

---

## 5.5 Objetivo combinado

Ejemplo

Leer una historia.

Responder las preguntas.

Contársela a Lía.

Escuchar tu grabación.

Guardar la aventura.

---

# 6. Información de una tarea

Cada tarea debe contener como mínimo:

ID

Alumno

Título

Descripción

Módulo asociado

Actividad

Fecha creación

Fecha inicio

Fecha límite

Tiempo estimado

Prioridad

Estado

Asignada por

Observaciones

Resultado

---

# 7. Estados

Pendiente

En curso

Completada

Necesita ayuda

Cancelada

Cuando una Misión requiere revisión familiar, la finalización realizada por Gloria no equivale todavía al cierre definitivo. Debe pasar primero a un estado de espera o validación familiar.

---

# 8. Vista para Gloria

Gloria nunca verá una "tarea".

Verá una misión.

Ejemplo

📖

## Misión de lectura

Lía encontró una nueva historia.

¿Quieres ayudarla?

⏱️

10 minutos

📅

Antes del domingo.

[ Comenzar misión ]

---

# 9. Vista para Padres

Los adultos visualizarán información completa.

Ejemplo

Título

Leer una historia Nivel 2

Estado

En curso

Tiempo estimado

10 minutos

Tiempo real

12 minutos

Intentos

2

Observaciones

Pendiente de revisar.

---

# 10. Finalización de Misiones

La Academia utilizará dos mecanismos de finalización: automática y manual.

La regla general es:

> Si la Academia puede verificar objetivamente que la actividad terminó, utilizará finalización automática. Si no puede verificarlo de forma fiable, utilizará finalización manual con confirmación del alumno y revisión familiar.

## 10.1 Finalización automática

Cuando un módulo informa que la actividad ha sido realizada y existe una evidencia verificable, la Academia podrá actualizar automáticamente la Misión de acuerdo con su criterio de cumplimiento.

Ejemplo

Mi Rincón de Lectura

↓

Historia guardada

↓

Criterio cumplido

↓

Misión terminada / enviada al flujo de revisión correspondiente

↓

Actualizar Mi Camino

↓

Actualizar Logros

↓

Actualizar Constancia

↓

Registrar en Panel de Evolución

No se debe mostrar un control manual redundante cuando la Academia dispone de un mecanismo automático fiable de finalización.

## 10.2 Finalización manual estándar

Se utilizará para Misiones que no producen una evidencia automática suficiente para determinar su cumplimiento, por ejemplo una actividad realizada en papel, fuera de la Academia o una futura actividad familiar que no pueda verificarse digitalmente.

En Mi Camino, mientras la Misión esté en curso, se mostrará:

**Texto de orientación:**

`Cuando termines esta misión, indícalo aquí.`

**Acción principal:**

`✅ Ya terminé`

El texto de orientación debe ser visualmente secundario. El botón debe ser claramente reconocible como la acción principal, con un estilo positivo y amable coherente con Mi Camino.

Al pulsar `✅ Ya terminé`, siempre se solicitará confirmación antes de cambiar el estado.

La confirmación estándar será conceptualmente:

**¿Terminaste esta misión?**

`Si confirmas, la enviaremos a tu familia para su revisión.`

La confirmación positiva puede expresarse como `✅ Sí, ya terminé`; la alternativa debe permitir continuar trabajando, por ejemplo `Todavía no`.

Después de confirmar:

En curso

↓

Gloria confirma que terminó

↓

Pendiente de validación / Esperando a mi familia

↓

La familia revisa

↓

Misión conseguida / completada

La confirmación de Gloria no debe fabricar una evidencia digital inexistente ni navegar a un módulo genérico como sustituto de dicha evidencia.

Una Misión manual en revisión no debe ofrecer `Ver mi trabajo` cuando no existe un trabajo digital consultable. Debe mostrar su estado de revisión familiar.

## 10.3 Criterio de selección del mecanismo

Antes de implementar el cierre de una nueva clase de Misión debe definirse cuál de los dos mecanismos corresponde.

Usar finalización automática cuando exista un criterio de cumplimiento observable y persistido por la Academia.

Usar finalización manual cuando el sistema no pueda saber con suficiente fiabilidad que la actividad terminó.

No se debe usar la finalización manual únicamente por comodidad técnica si ya existe una evidencia automática adecuada.

---

# 11. Motivación

Completar una misión nunca debe producir únicamente un mensaje de:

"Tarea completada"

Debe convertirse en una experiencia.

Ejemplo

🌟

¡Fantástico!

Hoy ayudaste a Lía a descubrir una nueva historia.

Tu árbol ha seguido creciendo.

---

# 12. Relación con Mi Camino

Mi Camino será el centro organizador del sistema.

Su estructura será:

🌳 Árbol de Mi Camino

↓

🌈 Mi aventura de hoy

↓

📌 Mis Tareas

↓

🏆 Mis Logros

↓

🔥 Mi Constancia

---

# 13. Relación con los módulos

Cada módulo puede generar tareas.

Ejemplo

Biblioteca

Leer un libro.

---

Mi Rincón de Lectura

Leer una historia.

---

Detectives

Resolver un caso.

---

Matemáticas

Completar una aventura.

---

Cursos

Finalizar una lección.

---

# 14. Seguimiento

Cada tarea conservará:

fecha creación

fecha inicio

fecha finalización

duración

número de intentos

resultado

observaciones

evidencias

---

# 15. Integración con el Diario

Toda tarea completada podrá generar automáticamente una entrada en el Diario correspondiente.

Ejemplo

Mi Diario de Lecturas.

Mi Diario Matemático.

Mi Diario de Detectives.

---

# 16. Reglas

Una tarea nunca desaparece.

Simplemente cambia de estado.

Toda modificación queda registrada.

Las observaciones podrán actualizarse.

Las versiones anteriores permanecerán disponibles.

Las Misiones sin actividad verificable no deben navegar a un módulo de la Academia únicamente para simular un flujo de ejecución o revisión.

---

# 17. Futuras versiones

## v2

Asignación automática de misiones.

---

## v3

Misiones adaptativas según evolución.

---

## v4

Recomendaciones inteligentes de Lía.

---

## v5

Sincronización con profesionales externos.

---

# Historial de versiones

- **v1.0 · Julio 2026:** definición inicial del sistema de Tareas, Misiones y Seguimiento.
- **v1.1 · Agosto 2026:** formaliza el estándar de finalización manual, la confirmación del alumno, la revisión familiar y la separación entre cierre automático y manual.

---

# Resumen

Los adultos crean tareas.

↓

La Academia las transforma en misiones.

↓

Gloria vive aventuras.

↓

La Academia registra evidencias automáticas cuando puede verificarlas; en caso contrario Gloria confirma manualmente que terminó

↓

La familia revisa cuando corresponde

↓

Mi Camino organiza el progreso.

↓

El Panel de Evolución integra toda la información.

---

Este estándar convierte las tareas tradicionales en experiencias motivadoras, manteniendo un seguimiento longitudinal completo del aprendizaje del alumno.
