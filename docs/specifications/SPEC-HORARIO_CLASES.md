# 🗓️ Especificación de Mi horario de clases
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-HORARIO_CLASES.md` |
| **Versión** | 1.0-rc1 |
| **Estado** | En validación · V1 |
| **Fecha** | 08/09/2026 |
| **Última actualización** | 08/09/2026 |
| **Propietario** | Organización escolar personal |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Horario semanal actual de la Persona Activa, sus materias/bloques, cabecera escolar y notas |

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
| `calendarios/horario/` | **Implementa:** experiencia de consulta y edición. |
| `compartido/firebase/FireStore Rules.txt` | **Implementa:** autorización canónica del proyecto. |

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
- cabecera con:
  - Alumn@;
  - Colegio;
  - Curso;
  - Tutor/a;
  - Período escolar;
- días lectivos de lunes a viernes;
- tramos horarios configurables por alumno;
- materias o bloques configurables por alumno;
- bloques no académicos válidos, por ejemplo `Recreo`, `Comedor` o `Tutoría`;
- color visual estable para cada materia/bloque;
- asignación de una materia/bloque a cada celda de día + tramo;
- modo normal de **consulta** separado del modo ocasional de **edición**;
- resaltado automático del día actual;
- indicación contextual de clase actual o próxima clase cuando corresponde;
- adaptación móvil en formato legible por días;
- espacio libre de notas;
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
- bloque específico del horario en la portada de Inicio;
- notificaciones;
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
- son válidos tanto contenidos académicos como bloques organizativos reales del alumno.

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
- fin posterior a inicio;
- no solapar tramos;
- máximo 18 tramos;
- presentación ordenada cronológicamente.

La V1 no obliga a que los tramos sean consecutivos.

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

---

## 💜 8. Experiencia de consulta

El modo normal es **consultar**, no editar.

Debe priorizar:

- nombre del alumno;
- contexto del curso escolar;
- qué toca hoy;
- lectura rápida de toda la semana;
- colores reconocibles;
- notas útiles.

La página debe sentirse personal, bella y motivadora sin perder claridad.

No debe parecer una hoja de cálculo ni un formulario permanente.

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

## 📝 10. Notas

La V1 incluye un único espacio de texto libre para recordatorios asociados al horario completo.

Ejemplos:

```text
Educación Física: traer camiseta.
Los viernes vamos a la biblioteca.
El miércoles hay actividad especial.
```

Máximo V1: 2500 caracteres.

Las notas no se interpretan como Misiones, eventos, evidencias ni Recompensas.

---

## 🔐 11. Acceso y seguridad

La interfaz no constituye la frontera de seguridad.

Contrato previsto para `usuarios/{userId}/horarioClases/actual`:

- propietario: leer y escribir;
- administración: leer y escribir;
- relación autorizada con consulta: leer;
- relación con gestión efectiva: escribir;
- otros: sin acceso.

El ID funcional V1 permitido es `actual`.

El despliegue real de Firestore Rules debe verificarse separadamente del cambio de archivo canónico en Git.

---

## ✅ 12. Criterios de aceptación V1

La V1 se considera funcionalmente válida cuando:

1. el acceso aparece dentro de Calendarios;
2. una Persona sin horario ve un estado inicial atractivo y comprensible;
3. puede crear materias/bloques propios;
4. puede crear tramos horarios reales;
5. puede asignar materias de lunes a viernes;
6. puede guardar y volver a abrir el mismo horario;
7. puede editarlo sin crear históricos o duplicados;
8. el alumno, colegio, curso, tutor/a y período se ven claramente;
9. cada materia conserva un color consistente;
10. el día actual se distingue;
11. escritorio y móvil siguen siendo legibles;
12. cancelar edición no guarda cambios;
13. Persona Activa determina el horario consultado;
14. el resultado se siente más atractivo que una tabla administrativa convencional.

---

## 🚧 13. Estado de validación

`1.0-rc1` permanece **En validación** hasta que el Product Owner pruebe la experiencia real y la apruebe.

Después de esa validación se actualizará esta especificación a `1.0 Activo` con la PR y baseline funcional correspondientes.
