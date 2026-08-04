# MODELO DE MISIONES Y EVIDENCIAS DE APRENDIZAJE

**Proyecto:** Academia Gloria Valentina  
**Versión:** 1.0  
**Fecha:** 01 de agosto de 2026  
**Estado:** Aprobado para implementación inicial

---

## 1. Propósito

Este documento define el modelo funcional mínimo para gestionar el ciclo completo de una misión:

1. El tutor crea y asigna una misión.
2. El alumno la ve en **Mi Camino**.
3. El alumno inicia la misión desde su botón.
4. El módulo relacionado registra las actividades realizadas.
5. Cada actividad genera una **Evidencia de aprendizaje**.
6. La Gestión de Misiones relaciona esas evidencias con la misión.
7. Al alcanzar el objetivo, la misión pasa a revisión.
8. El tutor revisa las evidencias y cierra, reabre o cancela la misión.

El objetivo prioritario es disponer de un flujo sencillo, trazable y útil para el uso diario de la Academia.

---

## 2. Principios

### 2.1. Lenguaje por rol

- Para el alumno: **Misión**.
- Para el tutor o la administración: **Tarea** o **Asignación**.
- En el código y Firestore puede mantenerse inicialmente el término `tarea` para evitar cambios innecesarios.

### 2.2. Independencia entre módulos y tareas

Los módulos, como Detectives, Biblioteca o Rincón de Lectura:

- registran lo que el alumno realizó;
- generan evidencias;
- no deciden directamente el estado de una misión.

La Gestión de Misiones:

- interpreta las evidencias;
- valida si cumplen el criterio;
- actualiza el progreso;
- cambia el estado de la misión.

### 2.3. Inicio explícito

Una actividad solo contará para una misión cuando el alumno acceda al módulo desde el botón:

> **Comenzar misión** o **Continuar misión**

El módulo recibirá el identificador de la misión mediante la URL:

```text
?misionId={id}
```

Una actividad realizada fuera de ese contexto será práctica libre y no avanzará ninguna misión.

### 2.4. Simplicidad para el tutor

La creación de una misión habitual debe requerir pocas decisiones:

- qué hacer;
- cuánto;
- nivel o filtro;
- fecha límite opcional.

La complejidad técnica debe quedar oculta.

---

## 3. Conceptos

## 3.1. Objetivo de aprendizaje

Representa la intención educativa de la asignación.

Ejemplo:

> Practicar la comprensión de problemas matemáticos sencillos.

En la primera versión puede almacenarse como texto. Más adelante podrá relacionarse con temas, competencias o contenidos curriculares.

## 3.2. Misión

Es la asignación completa que el alumno recibe.

Ejemplo:

> Resolver 5 historias de Detectives de nivel 1.

Una misión contiene:

- alumno asignado;
- título y descripción;
- módulo de destino;
- criterio de cumplimiento;
- progreso;
- estado;
- presentación para el alumno;
- evidencias relacionadas;
- fechas e historial.

## 3.3. Actividad realizada

Es cada acción concreta completada por el alumno.

Ejemplo:

> Resolver la historia `DP-0004`.

En una misión de cinco historias habrá cinco actividades realizadas.

No es necesario crear previamente cinco registros vacíos. Cada actividad aparece cuando se realiza y queda representada por su evidencia.

## 3.4. Evidencia de aprendizaje

Es el registro verificable de una actividad realizada.

Ejemplo:

```javascript
{
  alumnoId: "uid-alumno",
  misionId: "id-mision",
  modulo: "detectives",
  tipo: "historia_resuelta",
  actividadId: "DP-0004",
  sesionId: "id-sesion",
  atributos: {
    nivel: 1,
    tema: "merienda"
  },
  resultado: {
    intentos: 3,
    pistas: 1
  },
  ocurridaEn: serverTimestamp()
}
```

Las evidencias deben ser independientes y reutilizables posteriormente por:

- Mis Misiones;
- Mi Constancia;
- Logros;
- Estadísticas;
- informes de seguimiento.

---

## 4. Relación entre misión y evidencia

La relación será explícita.

Al iniciar una misión, Mi Camino abrirá el módulo con:

```text
misionId={id}
```

Cuando el alumno complete una actividad, la evidencia guardará ese mismo `misionId`.

La Gestión de Misiones comprobará:

1. que la misión existe;
2. que pertenece al mismo alumno;
3. que está activa;
4. que el módulo coincide;
5. que el tipo de evidencia coincide;
6. que los filtros coinciden;
7. que la evidencia no fue contabilizada antes.

Para la misión:

> Resolver 5 historias de Detectives de nivel 1

el criterio será:

```javascript
{
  tipo: "cantidad",
  modulo: "detectives",
  evidenciaTipo: "historia_resuelta",
  cantidadObjetivo: 5,
  filtros: {
    nivel: 1
  }
}
```

Una historia de nivel 2 podrá guardarse en Detectives, pero no contará para esa misión.

---

## 5. Estados

## 5.1. Estados internos

```text
creada
asignada
en_curso
pendiente_validacion
completada
necesita_ayuda
vencida
cancelada
```

Para compatibilidad con el sistema actual, la primera implementación podrá seguir creando inicialmente la tarea como `pendiente`, tratándola funcionalmente como `asignada`. La migración del nombre se realizará de forma controlada.

## 5.2. Estados visibles para el alumno

| Estado interno | Texto visible |
|---|---|
| `asignada` o `pendiente` | 🌱 Misión preparada |
| `en_curso` | 🌟 Misión en curso |
| `necesita_ayuda` | 🤝 Necesito ayuda |
| `pendiente_validacion` | 🎉 Misión terminada |
| `completada` | ✅ Misión conseguida |
| `vencida` | 🌿 Podemos retomarla |
| `cancelada` | No se muestra normalmente |

## 5.3. Flujo principal

```text
Creada
  ↓
Asignada
  ↓
En curso
  ↓
Pendiente de validación
  ↓
Completada
```

Flujos alternativos:

```text
En curso → Necesita ayuda → En curso
Pendiente de validación → En curso
Cualquier estado activo → Cancelada
```

---

## 6. Progreso

La misión conservará:

```javascript
progreso: {
  iniciadaEn: null,
  completadaEn: null,
  cantidadActual: 0,
  cantidadObjetivo: 5,
  evidenciaIds: [],
  tiempoRealMinutos: 0,
  intentos: 0
}
```

Cada evidencia válida incrementará `cantidadActual`.

Cuando:

```text
cantidadActual >= cantidadObjetivo
```

la misión cambiará automáticamente a:

```text
pendiente_validacion
```

---

## 7. Experiencia del alumno

## 7.1. En Mi Camino

La tarjeta mostrará:

```text
🧩 Resolver 5 historias de Detectives · Nivel 1

Progreso: 0 de 5

[ Comenzar misión ]
```

Cuando ya se haya iniciado:

```text
Progreso: 3 de 5

[ Continuar misión ]
```

## 7.2. Dentro del módulo

El módulo mostrará una banda visible:

```text
🌟 Misión en curso

Resolver 5 historias de Detectives de nivel 1.

Cada historia completada contará para esta misión.

Progreso: 3 de 5
```

Después de cada actividad:

```text
✅ ¡Historia registrada para tu misión!
Ya llevas 4 de 5.
```

Al finalizar:

```text
🎉 ¡Misión terminada!

Has completado las 5 historias.
Tu familia ya puede revisar y celebrar tu trabajo.
```

Si el alumno entra directamente al módulo:

```text
🌈 Práctica libre
Esta actividad no está vinculada a una misión.
```

---

## 8. Experiencia del tutor

El tutor podrá identificar las misiones en:

```text
Pendientes de validación
```

La revisión mostrará:

- título;
- alumno;
- objetivo;
- progreso;
- fechas;
- evidencias relacionadas;
- intentos y pistas;
- acceso directo a cada actividad.

Ejemplo:

```text
Misión: Resolver 5 historias de Detectives · Nivel 1
Progreso: 5 de 5

✅ Las naranjas de la cesta
   Nivel 1 · 2 intentos · 0 pistas
   [ Ver resolución ]

✅ Las galletas para compartir
   Nivel 1 · 3 intentos · 1 pista
   [ Ver resolución ]
```

Acciones disponibles:

```text
[ Cerrar misión ]
[ Reabrir ]
[ Añadir observación ]
[ Cancelar ]
```

---

## 9. Navegación hacia evidencias

Cada evidencia de Detectives conservará:

- `actividadId`;
- `sesionId`;
- `misionId`;
- `alumnoId`.

El tutor podrá navegar inicialmente a:

```text
historia.html?id={actividadId}
```

La mejora posterior permitirá:

```text
historia.html?id={actividadId}&sesionId={sesionId}
```

para resaltar la resolución exacta relacionada con la misión.

---

## 10. Firestore

## 10.1. Tareas o misiones

Se mantiene inicialmente:

```text
usuarios/{uid}/tareas/{tareaId}
```

## 10.2. Evidencias de aprendizaje

Nueva colección:

```text
usuarios/{uid}/evidencias/{evidenciaId}
```

## 10.3. Datos existentes de Detectives

Se mantiene:

```text
usuarios/{uid}/detectivesHistorias/{historiaId}
usuarios/{uid}/detectivesHistorias/{historiaId}/sesiones/{sesionId}
```

Las reglas actuales permiten leer y escribir cualquier documento o subcolección interna del propietario autenticado.

---

## 11. Preparación para varios alumnos y tutores

Aunque la primera versión utiliza el usuario autenticado como propietario, los nuevos registros deberán incluir:

```javascript
alumnoId
creadaPorUid
asignadaPorUid
```

Esto permitirá evolucionar posteriormente hacia:

- un tutor con varios alumnos;
- varios tutores para un alumno;
- permisos diferenciados;
- paneles de seguimiento.

La implementación inicial no resolverá todavía el modelo completo de autorización multiusuario.

---

## 12. Creación rápida

Para Detectives, el tutor verá únicamente:

```text
Tipo: Resolver historias de Detectives
Cantidad: 5
Nivel: 1
Fecha límite: opcional
```

El sistema generará automáticamente:

- título;
- destino;
- icono;
- criterio;
- presentación;
- estado;
- progreso inicial;
- requisito de revisión.

Mejoras posteriores:

- plantillas frecuentes;
- búsqueda de misiones anteriores;
- duplicar misión;
- favoritos;
- asignación a varios alumnos.

---

## 13. Alcance de la primera implementación

La primera entrega incluirá:

1. Crear una misión de Detectives con cantidad y nivel.
2. Mostrarla en Mi Camino.
3. Iniciarla desde Mi Camino.
4. Enviar `misionId` a Detectives.
5. Mostrar el indicador de misión en curso.
6. Registrar una evidencia por historia completada.
7. Actualizar el progreso.
8. Pasar automáticamente a `pendiente_validacion`.
9. Mostrar las evidencias al tutor.
10. Permitir revisar y cerrar la misión.
11. Navegar al detalle de cada historia.

Quedan fuera de esta primera entrega:

- motor general de objetivos complejos;
- misiones combinadas entre módulos;
- duplicación de misiones;
- plantillas avanzadas;
- permisos multiusuario completos;
- cierre automático sin revisión;
- estadísticas y logros.

---

## 14. Decisiones aprobadas

1. El alumno verá siempre **Misión**, no “Tarea”.
2. Los módulos generan **Evidencias de aprendizaje**.
3. Las evidencias permanecen independientes de las tareas.
4. La Gestión de Misiones es responsable de relacionarlas.
5. Solo cuentan las actividades iniciadas desde la misión.
6. El contexto se transmitirá mediante `misionId`.
7. Cada historia resuelta es una actividad realizada y una evidencia.
8. El nivel forma parte del criterio.
9. El estado de revisión será `pendiente_validacion`.
10. El tutor podrá navegar a las actividades relacionadas.
11. La creación debe ser rápida y sencilla.
12. La arquitectura debe permitir varios alumnos y tutores en el futuro.

---

## 15. Próximo paso

Implementar la primera versión comenzando por:

1. ampliar el modelo de datos en `academia.js`;
2. añadir cantidad y nivel al creador de tareas;
3. pasar `misionId` desde Mi Camino;
4. integrar Detectives;
5. crear evidencias;
6. actualizar progreso y revisión.
