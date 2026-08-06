###############################################################################
# Academia Gloria Valentina
# SPEC-REVISION_TRABAJO_REALIZADO.md
# Especificación funcional
###############################################################################

# 📖 Ver trabajo realizado

## Especificación funcional de la revisión de actividades asociadas a Misiones

**Código documental:** `SPEC-REVISION_TRABAJO_REALIZADO`  
**Versión:** 1.1  
**Estado:** Propuesta ajustada para aprobación funcional  
**Ubicación propuesta:** `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md`  
**Primera implementación:** Aventuras Matemáticas — Detectives  
**Documentos relacionados:**

- `docs/FOUNDATION.md`
- `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`
- `docs/models/MODEL-MOTORES_DE_APRENDIZAJE.md`
- especificaciones funcionales de los módulos que produzcan evidencias

## Historial de versiones

### Versión 1.1

Incorpora las observaciones posteriores a la revisión de la versión 1.0:

- regreso a la pantalla que invocó la revisión;
- posibilidad de identificar mejoras para Mi Rincón de Lectura;
- evaluación costo/beneficio de esas mejoras;
- ampliación del propósito de la revisión para identificar fortalezas y debilidades;
- preparación de acciones para fortalecer debilidades;
- mantenimiento de la revisión como etapa propia, sin desarrollar todavía el modelo completo de Crecimiento.

### Versión 1.0

Primera definición funcional de **Ver trabajo realizado**, con Detectives como implementación inicial.

---

# 1. Propósito

Esta especificación define cómo la familia podrá consultar y comprender el trabajo realizado por el alumno dentro de una Misión.

La funcionalidad se presentará con el nombre:

> **📖 Ver trabajo realizado**

Internamente, la Academia continuará utilizando el concepto técnico de **evidencia**.

La revisión no deberá limitarse a abrir nuevamente el módulo donde se realizó la actividad. Deberá mostrar:

1. el resumen de la Misión;
2. las actividades relacionadas;
3. el detalle completo de cada actividad;
4. la información específica generada por el motor;
5. las observaciones disponibles.

El objetivo no es mostrar datos por mostrar. El objetivo es permitir que un adulto comprenda:

- qué hizo el alumno;
- cuándo lo hizo;
- cómo avanzó;
- qué intentos realizó;
- qué resultados obtuvo;
- qué apoyos utilizó;
- qué información puede resultar útil para acompañarlo;
- qué fortalezas pueden reconocerse;
- qué dificultades o debilidades necesitan atención;
- qué acciones podrían ayudar a fortalecerlas.

---

# 2. Alcance

## 2.1 Incluido

La primera versión incluirá:

- acceso desde una Misión;
- revisión limitada al trabajo perteneciente a esa Misión;
- resumen general;
- listado comprimido de actividades realizadas;
- expansión de cada actividad;
- detalle específico del módulo;
- navegación sin perder el contexto de la Misión;
- primera implementación completa en Detectives;
- reutilización posterior en otros motores.

## 2.2 No incluido

No forma parte de esta versión:

- análisis longitudinal de crecimiento;
- generación automática de nuevas Misiones;
- recomendaciones de IA;
- comparación entre alumnos;
- calificaciones globales;
- modificación de respuestas del alumno;
- edición de evidencias;
- Misiones con actividades de módulos diferentes;
- un visor universal completamente abstraído.

Estas capacidades podrán evaluarse después de validar la primera implementación.

---

# 3. Principios funcionales

## 3.1 Lenguaje cercano

La interfaz utilizará:

```text
Ver trabajo realizado
```

y no:

```text
Ver evidencias
```

“Evidencia” permanecerá como término interno del sistema.

## 3.2 Contexto de Misión

La revisión siempre deberá conservar la relación con la Misión desde la que se accede.

No deberá abrir un módulo de manera genérica.

## 3.3 Enfoque Top-Down

La información se mostrará de lo general a lo específico:

```text
Resumen de la Misión
        ↓
Actividades realizadas
        ↓
Detalle de una actividad
        ↓
Información específica del motor
```

## 3.4 Toda la información útil, progresivamente

La Academia deberá permitir consultar todo lo registrado que tenga valor para la revisión.

No deberá mostrarlo todo simultáneamente.

La información detallada se presentará mediante bloques expandibles.

## 3.5 Solo lectura

La revisión mostrará lo realizado tal como quedó registrado.

No permitirá alterar:

- respuestas;
- resultados;
- intentos;
- grabaciones;
- análisis;
- fechas;
- evidencias.

Las observaciones familiares podrán tener su propio mecanismo de edición cuando el módulo ya lo permita.

## 3.6 Sin juicio personal

La interfaz podrá mostrar resultados funcionales.

No deberá mostrar:

- etiquetas sobre la capacidad del alumno;
- comparaciones;
- clasificaciones;
- diagnósticos;
- mensajes que provoquen vergüenza;
- conclusiones no sustentadas.

La identificación de fortalezas y debilidades deberá referirse siempre a:

- una habilidad;
- una actividad;
- un patrón observable;
- una necesidad de práctica.

Nunca deberá presentarse como una valoración global de la persona.

---

# 4. Flujo general

```text
Mis Tareas / Revisión de Misión
                │
                ▼
       Ver trabajo realizado
                │
                ▼
       Resumen de la Misión
                │
                ▼
      Actividades realizadas
                │
       ┌────────┼────────┐
       ▼        ▼        ▼
 Actividad 1 Actividad 2 Actividad n
       │
       ▼
 Detalle expandido
       │
       ▼
 Información específica
```

## 4.1 Punto de entrada

El acceso aparecerá cuando la Misión tenga al menos una evidencia registrada.

Texto recomendado:

```text
📖 Ver trabajo realizado
```

## 4.2 Misión sin trabajo registrado

Cuando no existan evidencias:

```text
Todavía no hay trabajo registrado para esta Misión.
```

No deberá mostrarse una lista vacía ni un error técnico.

## 4.3 Misión con evidencias

La vista cargará únicamente las evidencias cuyo:

```text
misionId
```

coincida con la Misión revisada.

## 4.4 Regreso

La navegación deberá permitir regresar a la pantalla que invocó la revisión.

La ruta de regreso podrá corresponder a:

- detalle de la Misión;
- listado de Mis Tareas;
- Mi Camino;
- otra vista autorizada que haya abierto **Ver trabajo realizado**.

Cuando exista un parámetro contextual como:

```text
volver
```

deberá respetarse.

Si no existe una ruta de origen válida, se utilizará una ruta segura definida por la Academia.

---

# 5. Estructura de la revisión

## 5.1 Nivel 1 — Resumen de la Misión

La cabecera deberá mostrar, cuando esté disponible:

- título de la Misión;
- módulo;
- estado;
- fecha de asignación;
- fecha de finalización;
- cantidad objetivo;
- cantidad realizada;
- tiempo total aproximado;
- número de actividades;
- estado de revisión;
- descripción u objetivo;
- fortalezas observables, cuando existan;
- aspectos que conviene reforzar, cuando estén sustentados.

Ejemplo:

```text
📖 Trabajo realizado

Misión:
Practico Detectives — Nivel 1

Estado:
Completada

Actividades:
5 de 5

Tiempo total:
24 minutos

Fecha:
06/08/2026
```

## 5.2 Nivel 2 — Actividades realizadas

Las actividades se mostrarán inicialmente comprimidas.

Ejemplo:

```text
▶ El misterio del jardín
  Nivel 1 · 2 intentos · Completada

▶ La caja de lápices
  Nivel 1 · 1 intento · Completada

▶ Los libros de la biblioteca
  Nivel 1 · 3 intentos · Completada
```

Cada elemento deberá mostrar como mínimo:

- título;
- estado;
- fecha;
- información breve relevante;
- control para expandir.

## 5.3 Nivel 3 — Detalle de una actividad

Al expandir una actividad deberá mostrarse toda la información útil disponible.

La expansión no deberá llevar al alumno nuevamente al modo de ejecución.

La vista será de solo lectura.

## 5.4 Expansión independiente

El usuario podrá:

- abrir una actividad;
- cerrarla;
- abrir varias;
- cerrar todas.

La pantalla no deberá perder la posición al expandir contenido.

---

# 6. Información común

Toda actividad revisable deberá proporcionar, cuando exista:

```text
actividadId
sesionId
misionId
modulo
tipo de evidencia
título
fecha
duración
estado
intentos
resultado
atributos
destino de revisión
```

La ausencia de un dato opcional no deberá impedir mostrar los demás.

## 6.1 Identidad de la actividad

- nombre;
- icono;
- módulo;
- nivel o categoría;
- identificador interno solo cuando sea necesario para soporte.

## 6.2 Ejecución

- fecha y hora;
- duración;
- intentos;
- origen desde Misión;
- estado final.

## 6.3 Resultado

El resultado dependerá del motor.

Podrá incluir:

- completada;
- correcta;
- parcialmente completada;
- pendiente;
- número de pasos;
- respuestas;
- apoyos utilizados.

## 6.4 Observaciones

Podrán mostrarse:

- observación familiar;
- mensajes del motor;
- análisis educativo;
- elementos sugeridos para practicar.

No se generarán automáticamente nuevas conclusiones dentro de esta primera versión.

La estructura deberá quedar preparada para incorporar posteriormente:

- fortalezas identificadas;
- debilidades o aspectos a reforzar;
- acciones propuestas;
- observaciones familiares;
- validación humana de esas propuestas.

---

# 7. Primera implementación — Detectives

Detectives será la primera implementación de referencia.

El objetivo es corregir el comportamiento actual en revisión.

## 7.1 Situación actual

Actualmente:

```text
Misión completada
        ↓
Ver evidencias
        ↓
Abrir actividad
        ↓
Pantalla general de Detectives
```

Este comportamiento permite abrir el módulo, pero no permite identificar claramente qué historias pertenecen a la Misión.

## 7.2 Comportamiento requerido

El nuevo flujo será:

```text
Misión completada
        ↓
📖 Ver trabajo realizado
        ↓
Resumen
        ↓
Historias realizadas en esa Misión
        ↓
Detalle de cada historia
```

## 7.3 Lista de historias

Cada historia deberá mostrar inicialmente:

- título;
- nivel;
- tema;
- fecha;
- intentos;
- estado;
- indicador para expandir.

Ejemplo:

```text
▶ El misterio de las pegatinas
  Nivel 1 · Sumas · 2 intentos · Completada
```

## 7.4 Detalle de Detectives

Al expandir una historia se mostrará, cuando exista:

### Información general

- título;
- texto de la historia;
- nivel;
- tema;
- tipo;
- fecha;
- duración;
- intentos.

### Comprensión

- pregunta de comprensión;
- respuesta elegida;
- resultado.

### Descubrimiento

- qué debía descubrir;
- respuesta elegida;
- resultado.

### Resolución

Por cada paso:

- pregunta;
- operación;
- operandos;
- respuesta del alumno;
- respuesta esperada;
- resultado;
- número de intentos;
- apoyo visual utilizado, cuando esté registrado.

### Resumen

- pasos completados;
- operaciones;
- casos simples;
- casos compuestos;
- resultado final.

## 7.5 Datos no disponibles

Si la evidencia no contiene todo el detalle, la interfaz mostrará únicamente lo disponible.

No deberá inventar:

- respuestas;
- duración;
- pistas;
- errores;
- apoyos.

## 7.6 Historias repetidas

Si una misma historia se realizó más de una vez dentro de la Misión:

- cada sesión deberá mostrarse como una ejecución distinta;
- deberá identificarse por fecha, sesión o intento;
- no deberán fusionarse silenciosamente.

## 7.7 Navegación

La revisión podrá reutilizar:

```text
detectives/historial.html
detectives/historia.html
```

si estas vistas pueden recibir el contexto de Misión y filtrar correctamente.

También podrá implementarse directamente dentro del visor de Mis Tareas.

La decisión técnica se documentará posteriormente.

El comportamiento funcional deberá ser el mismo.

---

# 8. Reutilización en otros motores

La estructura común será:

```text
Resumen
   ↓
Lista comprimida
   ↓
Detalle expandible
```

Cada motor definirá su información específica.

## 8.1 Mi Rincón de Lectura

La implementación actual ya constituye la principal referencia de riqueza informativa.

La revisión podrá mostrar:

- lectura;
- audio;
- transcripción;
- intentos;
- análisis;
- mapa de comparación;
- palabras para crecer;
- comprensión;
- respuestas;
- reflexión;
- observación familiar;
- historial de observaciones.

La adopción de esta especificación no deberá reducir la información actual.

Durante la homogeneización podrán identificarse mejoras para Mi Rincón de Lectura.

Estas mejoras se incorporarán cuando:

- agreguen valor claro;
- no degraden la experiencia actual;
- sean coherentes con el patrón Top-Down;
- su costo y complejidad sean aceptables.

## 8.2 Creciendo por Dentro

Cuando se implemente deberá mostrar:

- Semilla;
- situación;
- respuestas de cada paso;
- frase construida;
- grabación;
- transcripción;
- intentos;
- análisis educativo;
- nivel de apoyo;
- observación familiar;
- relación con la Misión.

## 8.3 Otros módulos

Los futuros motores deberán proporcionar:

1. resumen común;
2. identidad de actividad;
3. detalle específico;
4. datos registrados;
5. navegación de regreso.

No se exigirá que todos produzcan los mismos datos.

---

# 9. Experiencia de usuario

## 9.1 Diseño visual

La pantalla deberá:

- conservar la identidad de la Academia;
- utilizar bloques claros;
- evitar tablas densas cuando no sean necesarias;
- utilizar tarjetas o paneles expandibles;
- distinguir resumen y detalle;
- ser usable en escritorio y móvil;
- incluir el favicon oficial;
- utilizar la navegación global.

## 9.2 Terminología

Textos recomendados:

```text
Ver trabajo realizado
Trabajo realizado
Actividades realizadas
Ver detalle
Ocultar detalle
Volver a la Misión
```

Evitar en la interfaz familiar:

```text
Evidencia técnica
Payload
Documento
Registro Firestore
Sesión raw
```

## 9.3 Información prioritaria

El primer nivel deberá responder rápidamente:

- ¿La Misión se completó?
- ¿Cuántas actividades realizó?
- ¿Cuánto tiempo aproximadamente dedicó?
- ¿Qué actividades fueron?
- ¿Hay algo que convenga revisar con detalle?
- ¿Qué fortalezas se observan?
- ¿Qué aspectos necesitan práctica adicional?

## 9.4 Accesibilidad

Los bloques expandibles deberán:

- funcionar con teclado;
- indicar su estado abierto o cerrado;
- usar `aria-expanded`;
- mantener contraste suficiente;
- no depender únicamente del color;
- respetar reducción de movimiento;
- permitir reproducir audio mediante controles accesibles.

## 9.5 Carga y errores

Mientras se carga:

```text
Preparando el trabajo realizado...
```

Si ocurre un error:

```text
No pudimos cargar el trabajo realizado.
Puedes volver a intentarlo.
```

El mensaje técnico podrá registrarse en consola, pero no mostrarse directamente a la familia.

---

# 10. Reglas de integración

## 10.1 Relación obligatoria

Toda actividad mostrada deberá poder relacionarse con:

```text
misionId
```

y preferiblemente con:

```text
sesionId
actividadId
```

## 10.2 Fuente de información

La revisión utilizará:

1. evidencias de la Misión;
2. sesiones detalladas del motor;
3. contenido original de la actividad, cuando sea necesario.

La evidencia permite identificar qué se realizó.

La sesión permite mostrar cómo se realizó.

El contenido permite reconstruir el contexto de la actividad.

## 10.3 Correspondencia

Ejemplo:

```text
Evidencia
actividadId: historia-014
sesionId: abc123

        ↓

Sesión Detectives
intentos, pasos, respuestas, resultado

        ↓

historias.json
título, texto, preguntas y contexto
```

## 10.4 Evidencia sin sesión

Si existe evidencia, pero no puede recuperarse la sesión:

- se mostrará la información de la evidencia;
- se indicará que el detalle completo no está disponible;
- no se bloqueará la revisión de las demás actividades.

## 10.5 Sesión sin evidencia

Una sesión sin evidencia no deberá aparecer dentro de una Misión específica.

Podrá seguir apareciendo en el historial general del módulo.

---

# 11. Criterios de aceptación

La primera implementación será aceptada cuando:

1. El botón visible diga **Ver trabajo realizado**.
2. Se acceda desde una Misión con evidencias.
3. La pantalla conserve el contexto de la Misión.
4. Se muestre un resumen general.
5. Se listen únicamente las actividades asociadas a esa Misión.
6. Las actividades aparezcan inicialmente comprimidas.
7. Cada actividad pueda expandirse.
8. El detalle no abra el modo de ejecución.
9. Detectives muestre las historias concretas realizadas.
10. Cada historia muestre los datos disponibles de su sesión.
12. Las ejecuciones repetidas se distingan.
13. La ausencia de un dato no provoque un error general.
14. La navegación permita regresar a la pantalla que invocó la revisión.
15. La pantalla funcione en escritorio y móvil.
16. La interfaz utilice la navegación y el favicon oficiales.
16. No se modifiquen las respuestas originales.
17. No se muestren conclusiones inventadas.
18. Mi Rincón de Lectura mantenga su riqueza informativa actual.
19. La estructura pueda reutilizarse posteriormente en Semillas.
20. La familia pueda comprender qué hizo el alumno sin buscar manualmente dentro del módulo.
21. La revisión permita reconocer fortalezas sustentadas en el trabajo realizado.
22. La revisión permita identificar aspectos que conviene fortalecer sin etiquetar al alumno.
23. La estructura quede preparada para proponer acciones posteriores bajo revisión humana.

---

# 12. Decisiones aprobadas y trabajo futuro

## 12.1 Decisiones aprobadas

1. La funcionalidad se llamará **Ver trabajo realizado**.
2. El término “evidencia” será interno.
3. La revisión seguirá un modelo Top-Down.
4. Primero se mostrará el resumen.
5. Después se mostrará la lista comprimida.
6. El detalle se abrirá bajo demanda.
7. Se mostrará toda la información útil disponible.
8. Detectives será la primera implementación.
9. Mi Rincón de Lectura será referencia de profundidad.
10. La aplicación del patrón podrá identificar mejoras para Mi Rincón de Lectura.
12. Creciendo por Dentro adoptará posteriormente el mismo patrón.
12. La revisión será de solo lectura.
13. La revisión conservará siempre el contexto de Misión.
14. No se construirá todavía un visor universal excesivamente abstracto.
15. La implementación real servirá para consolidar el patrón.
16. El documento no define todavía Crecimiento ni nuevas Misiones automáticas.

## 12.2 Trabajo futuro

Después de validar Detectives se evaluará:

- convertir el patrón en estándar transversal;
- homogeneizar la revisión de Lectura;
- incorporar mejoras en Mi Rincón de Lectura cuando se identifiquen y su costo/beneficio sea aceptable;
- incorporar Semillas;
- permitir observaciones familiares comunes;
- identificar fortalezas y debilidades a partir de información sustentada;
- proponer acciones para fortalecer debilidades bajo revisión humana;
- generar insumos para Crecimiento;
- integrar propuestas de IA;
- relacionar la revisión con nuevas Misiones.

El ciclo futuro previsto es:

```text
Misión
   ↓
Actividad
   ↓
Evidencia
   ↓
Revisión
   ↓
Crecimiento
   ↓
Nueva Misión
```

La presente especificación es propietaria únicamente de la etapa:

```text
Revisión
```

---

# Declaración final

**Ver trabajo realizado** deberá permitir que la familia pase de saber que una Misión fue completada a comprender cómo fue realizada.

No será un acceso genérico al módulo.

No será una lista técnica de evidencias.

Será una lectura ordenada, progresiva y comprensible del trabajo del alumno:

```text
Resumen
   ↓
Actividades
   ↓
Detalle
   ↓
Comprensión
```

Porque completar una actividad produce una evidencia.

Comprender esa evidencia permite:

- reconocer fortalezas;
- identificar debilidades o aspectos a reforzar;
- decidir acciones de acompañamiento;
- preparar futuras oportunidades de aprendizaje.

Y esa comprensión permite acompañar mejor el crecimiento.

🌱💜
