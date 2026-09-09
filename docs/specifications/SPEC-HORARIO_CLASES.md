# 🗓️ Especificación de Mi horario de clases
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-HORARIO_CLASES.md` |
| **Versión** | 1.0 |
| **Estado** | Activo |
| **Fecha** | 08/09/2026 |
| **Última actualización** | 09/09/2026 |
| **Propietario** | Organización escolar personal |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Horario semanal actual de la Persona Activa, sus materias/bloques, cabecera escolar, consulta rápida y presentación PDF |

## 🔗 Documentos relacionados

| Documento / fuente | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Fundamenta:** autonomía, claridad, motivación y utilidad real para el alumno. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna conceptualmente:** experiencias centradas en necesidades reales y Persona Activa. |
| `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` | **Gobierna visualmente:** experiencia alegre, cercana, clara y no saturada. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** USER/PERSON, Persona Activa, relaciones y niveles efectivos. |
| `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md` | **Gobierna técnicamente:** UX, reutilización, navegación, seguridad y datos. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Gobierna:** ciclo de implementación, validación, PR, aprobación y cierre. |
| `compartido/modelos/horario-clases.js` | **Implementa:** contrato y validación del horario V1. |
| `compartido/api/horario-clases.js` | **Implementa:** persistencia del horario actual de Persona Activa. |
| `calendarios/horario/` | **Implementa:** experiencia de consulta, edición, presentación y PDF. |
| `compartido/firebase/FireStore Rules.txt` | **Implementa:** autorización canónica del proyecto. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 09/09/2026 | Product Owner + AI Collaborator | Activa la V1 después de la validación completa del Product Owner. Sincroniza el producto final posterior a PR #96–#107 y correcciones de navegación #109/#110: tramos libres, planner visual, PDF nativo A4 de una página, acceso rápido `Ver mi horario`, vista `solo`, materias ordenadas y estados de carga/vacío corregidos. |
| 1.0-rc3 | 08/09/2026 | Product Owner + AI Collaborator | Consolidó la cabecera-póster V3 y la intención de salida PDF solo calendario, todavía en validación. |
| 1.0-rc2 | 08/09/2026 | Product Owner + AI Collaborator | Incorporó planner visual, iconografía contextual e impresión. |
| 1.0-rc1 | 08/09/2026 | Product Owner + AI Collaborator | Primera especificación funcional de Mi horario de clases V1. |

---

## 🎯 1. Propósito

**Mi horario de clases** permite que cada alumno conserve y consulte en la Academia su semana escolar actual de una forma más atractiva, rápida y personal que una tabla administrativa.

La pregunta principal que responde es:

> **¿Qué clases tengo hoy y cómo se organiza mi semana?**

La experiencia debe ayudar a la autonomía cotidiana y, al mismo tiempo, convertirse en un motivo natural para querer abrir la Academia.

---

## 📐 2. Alcance V1

### 2.1 Incluido

- un único **horario actual** por alumno / Persona Activa;
- acceso desde `Calendarios`;
- acceso rápido **🗓️ Ver mi horario** desde la cabecera de `Explora más` cuando la Persona Activa ya tiene un horario guardado;
- vista de consulta rápida `?vista=solo`, que reutiliza los mismos datos y deja visible básicamente cabecera-póster + cuadrícula;
- cabecera con:
  - Alumn@;
  - Colegio;
  - Curso;
  - Tutor/a;
  - Período escolar;
- días lectivos de lunes a viernes;
- tramos horarios configurables por alumno, con inicio y fin exactos y duración libre;
- materias o bloques configurables por alumno;
- bloques no académicos válidos, por ejemplo `Recreo`, `Comedor` o `Tutoría`;
- color visual estable para cada materia/bloque;
- iconografía contextual de apoyo para materias/bloques reconocibles, sin convertirla en dato persistente;
- asignación de una materia/bloque a cada celda de día + tramo;
- modo normal de **consulta** separado del modo ocasional de **edición**;
- resaltado automático del día actual;
- indicación contextual de clase actual o próxima clase cuando corresponde;
- adaptación móvil en formato legible por días;
- espacio libre de notas;
- generación de **PDF A4 apaisado de una sola página** con únicamente cabecera-póster + cuadrícula semanal;
- Persona Activa y persistencia multiusuario;
- actualización del mismo horario cuando cambian sus datos.

### 2.2 Fuera de alcance V1

No incluye:

- histórico de horarios anteriores;
- más de un horario simultáneo por alumno;
- importación automática desde el colegio;
- plantillas globales por colegio/curso;
- profesor por asignatura;
- aula por asignatura;
- deberes o tareas dentro de cada celda;
- calendario de exámenes dentro del horario;
- rotaciones de semanas A/B;
- horarios de sábado/domingo;
- recompensas por consultar el horario;
- notificaciones específicas del horario;
- sincronización con calendarios externos.

Estas capacidades solo se incorporarán si el uso real las justifica.

---

## 👤 3. Propiedad y Persona Activa

El horario pertenece conceptualmente a la **Persona Activa**.

La persistencia V1 reutiliza la arquitectura física vigente de subcolecciones por USER:

```text
Persona Activa
      ↓
USER físico asociado
      ↓
usuarios/{userId}/horarioClases/actual
```

Reglas:

1. nunca resolver el horario por nombre, colegio o URL;
2. utilizar `ContextoUsuario` para resolver Persona Activa y USER físico;
3. la Persona propia puede consultar y mantener su horario;
4. una Persona relacionada puede consultar o gestionar únicamente según su nivel efectivo y el contrato de Rules;
5. Administración conserva las capacidades transversales que correspondan.

---

## 🧾 4. Contrato funcional de datos

El documento funcional V1 contiene:

```text
schemaVersion
personaId

periodoEscolar
colegio
curso
tutor

materias[]
  id
  nombre
  colorId

tramos[]
  id
  inicio
  fin

celdas
  {tramoId}
    lunes
    martes
    miercoles
    jueves
    viernes

notas

createdAt
createdBy
createdByNombre
updatedAt
updatedBy
updatedByNombre
```

`celdas` guarda el `materiaId` asignado o cadena vacía cuando ese espacio queda libre.

La iconografía contextual, la cabecera-póster, las franjas especiales, la vista `solo` y el PDF son **presentación derivada**; no amplían ni sustituyen el contrato persistido.

---

## 🎨 5. Materias y bloques

Las materias disponibles **pertenecen al horario actual de cada alumno**.

No existe un catálogo global V1.

Cada elemento contiene:

```text
id
nombre
colorId
```

Reglas:

- máximo 30 materias/bloques;
- nombre obligatorio;
- nombres no repetidos dentro del mismo horario;
- el color se asigna desde una paleta visual consistente de la Academia;
- una materia conserva el mismo color en toda la semana;
- son válidos tanto contenidos académicos como bloques organizativos reales del alumno;
- la interfaz puede acompañar nombres reconocibles con un icono contextual, manteniendo siempre el texto como fuente principal y accesible;
- en los desplegables del editor, `— Libre —` permanece primero y el resto de materias se presenta en **orden alfabético ascendente en español**.

Ejemplos:

```text
Matemáticas
Lengua
Inglés
Ciencias
Educación Física
Música
Recreo
Comedor
Tutoría
```

---

## ⏰ 6. Tramos horarios

Los tramos son configurables porque cada colegio puede utilizar horarios distintos.

Cada tramo contiene:

```text
id
inicio
fin
```

Reglas V1:

- formato `HH:MM`;
- inicio y fin definidos explícitamente por el usuario;
- duración libre: no existe una duración fija de 60 minutos;
- fin posterior a inicio;
- no solapar tramos;
- máximo 18 tramos;
- presentación ordenada cronológicamente.

La V1 no obliga a que los tramos sean consecutivos. Son válidos, por ejemplo, `11:00–11:50` o `12:05–12:55`.

---

## 🗓️ 7. Semana

La semana utiliza:

```text
Hora | Lunes | Martes | Miércoles | Jueves | Viernes
```

En escritorio/tablet amplia se presenta como cuadrícula semanal.

En móvil estrecho se transforma en tarjetas por día para evitar reducir las celdas hasta hacerlas ilegibles.

El día actual se resalta automáticamente.

Cuando la hora local se encuentra dentro de un tramo del día actual, la clase correspondiente puede identificarse como **AHORA**.

Cuando `Patio/Recreo` o `Comedor` ocupan el mismo tramo en los cinco días, la presentación puede convertir esas cinco celdas en una **franja visual común**, sin modificar los datos guardados.

---

## 💜 8. Experiencia de consulta y lenguaje visual

El modo normal es **consultar**, no editar.

Debe priorizar:

- nombre del alumno;
- contexto del curso escolar;
- qué toca hoy;
- lectura rápida de toda la semana;
- colores reconocibles;
- notas útiles.

La página debe sentirse personal, bella y motivadora sin perder claridad. Su referencia emocional es un **planner escolar personal**, no una hoja de cálculo.

La evolución visual `V3` toma como referencia una pieza familiar de horario escolar del curso anterior aportada por el Product Owner: título central muy reconocible, composición geométrica de color, materias acompañadas por ilustraciones y franjas destacadas para momentos comunes de la jornada. La Academia **reinterpreta** esos principios en lugar de copiar el diseño literalmente.

Principios visuales V1:

- una **cabecera-póster** identifica el horario como objeto personal del alumno;
- color vivo pero suave y equilibrado;
- los días comparten una familia visual consistente y pueden incorporar acentos distintos;
- cada materia/bloque se presenta como una pieza visual reconocible, con texto protagonista e icono/ilustración de apoyo;
- `Patio/Recreo` y `Comedor` pueden utilizar franjas cromáticas especiales cuando corresponda;
- la hora debe distinguirse con rapidez sin dominar la tabla;
- iconos o emojis son apoyo de reconocimiento, nunca sustituyen el nombre de la materia;
- se evitan decoraciones que reduzcan legibilidad o aumenten innecesariamente la altura del horario;
- escritorio, móvil y PDF deben conservar una misma identidad.

No debe parecer una hoja de cálculo ni un formulario permanente.

### 8.1 Estados de carga y horario vacío

La interfaz distingue:

```text
cargando
→ sin horario
→ horario existente
```

Reglas:

- `Preparando tu horario…` es únicamente un estado transitorio de lectura;
- si no existe horario, se muestra la invitación a crearlo;
- si existe horario, no se muestran los bloques de carga ni de creación;
- la presentación no debe anular visualmente el atributo `hidden` decidido por la lógica funcional.

### 8.2 Vista rápida `solo`

Cuando se abre desde el acceso rápido de Inicio:

```text
calendarios/horario/?vista=solo
```

se reutiliza el mismo horario guardado y se ocultan los bloques auxiliares no necesarios para consulta rápida.

No existe una segunda copia ni un segundo modelo de horario.

---

## ✏️ 9. Experiencia de edición

La edición es una acción explícita.

Secuencia V1:

```text
1. Cabecera
2. Mis materias y bloques
3. Mis horas
4. Mi semana
5. Mis notas
```

Reglas:

- los cambios permanecen en borrador hasta `Guardar horario`;
- cancelar no modifica el horario persistido;
- cada celda selecciona una materia/bloque ya definida;
- eliminar una materia del borrador limpia sus asignaciones dentro del mismo borrador;
- eliminar un tramo elimina sus celdas del borrador;
- antes de guardar debe existir al menos una materia, un tramo y una asignación semanal;
- el modelo valida tramos y datos antes de persistir.

---

## 📝 10. Notas y PDF

La V1 incluye un único espacio de texto libre para recordatorios asociados al horario completo.

Ejemplos:

```text
Educación Física: traer camiseta.
Los viernes vamos a la biblioteca.
El miércoles hay actividad especial.
```

Máximo V1: 2500 caracteres.

Las notas no se interpretan como Misiones, eventos, evidencias ni Recompensas.

La acción **Imprimir / Guardar PDF** genera directamente un **PDF A4 apaisado de exactamente una página**:

- usa el horario ya guardado, sin crear una copia persistente;
- incluye la cabecera-póster con alumno, colegio, curso y período cuando estén disponibles;
- incluye la cuadrícula semanal completa;
- excluye navegación, resumen de hoy, fichas auxiliares, leyenda de materias, notas, botones de edición y demás contenido de la página;
- conserva la identidad cromática útil del horario;
- ajusta densidad visual según el número de tramos;
- se genera con APIs nativas del navegador mediante Canvas y construcción PDF, sin dependencia de CDN externos;
- se abre en una nueva pestaña/visor del navegador y utiliza descarga como fallback si la apertura es bloqueada.

El PDF es una representación derivada del horario actual. No modifica Firestore ni genera histórico.

---

## 🔐 11. Acceso y seguridad

La interfaz no constituye la frontera de seguridad.

Contrato para `usuarios/{userId}/horarioClases/actual`:

- propietario: leer y escribir;
- administración: leer y escribir;
- relación autorizada con consulta: leer;
- relación con gestión efectiva: escribir;
- otros: sin acceso.

El ID funcional V1 permitido es `actual`.

El despliegue real de Firestore Rules debe verificarse separadamente del cambio de archivo canónico en Git.

Las mejoras posteriores de presentación, PDF, ordenación, acceso rápido y navegación no requirieron nuevas Rules porque no modificaron el contrato persistido ni los permisos.

---

## ✅ 12. Criterios de aceptación V1

La V1 se considera funcionalmente válida cuando:

1. el acceso aparece dentro de Calendarios;
2. una Persona sin horario ve un estado inicial atractivo y comprensible;
3. una Persona con horario no ve los bloques de carga/creación una vez resuelta la lectura;
4. puede crear materias/bloques propios;
5. puede crear tramos horarios reales con minutos y duraciones arbitrarias;
6. puede asignar materias de lunes a viernes;
7. puede guardar y volver a abrir el mismo horario;
8. puede editarlo sin crear históricos o duplicados;
9. el alumno, colegio, curso, tutor/a y período se ven claramente;
10. cada materia conserva un color consistente;
11. el día actual se distingue;
12. escritorio y móvil siguen siendo legibles;
13. cancelar edición no guarda cambios;
14. Persona Activa determina el horario consultado;
15. `Patio/Recreo` y `Comedor` pueden destacar visualmente sin alterar el dato persistido;
16. el PDF produce únicamente la cabecera del horario y la cuadrícula semanal, en una página A4 apaisada;
17. el resultado se siente claramente más atractivo que una tabla administrativa convencional y conserva la identidad visual de la Academia;
18. la presentación puede evolucionar sin exigir reingresar ni migrar el horario ya guardado;
19. las materias del editor se muestran alfabéticamente, manteniendo `Libre` primero;
20. cuando existe horario, Inicio puede mostrar `Ver mi horario` y abrir la vista `solo` sin duplicar datos;
21. el flujo `Main → Calendario → Horario → Volver → Calendario → Volver` regresa al llamador original y no forma un ciclo Calendario ↔ Horario.

---

## ✅ 13. Estado actual

La V1 fue probada y aprobada por el Product Owner el 08/09/2026 y sus ajustes finales quedaron validados después de uso real.

Trazabilidad principal:

- **PR #96** · Mi horario de clases V1;
- **PR #97** · tramos horarios de duración libre;
- **PR #98–#104** · evolución visual y PDF;
- **PR #105/#106** · estados de carga/horario vacío;
- **PR #107** · acceso rápido, vista `solo` y materias ordenadas;
- **PR #109/#110** · corrección del retorno contextual Calendario ↔ Horario.

La especificación pasa a **`1.0 · Activo`**.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Activo |
| **Versión activa** | 1.0 |
| **Propiedad** | Un único horario actual por Persona Activa. |
| **Persistencia** | `usuarios/{userId}/horarioClases/actual`. |
| **Consulta** | Calendarios + acceso rápido desde Inicio cuando existe horario. |
| **Edición** | Materias/bloques propios + tramos libres + semana + notas. |
| **PDF** | A4 apaisado, una página, cabecera-póster + cuadrícula, generado sin CDN externos. |
| **Principio** | Un objeto escolar cotidiano, bello y útil; no una hoja de cálculo administrativa. |
