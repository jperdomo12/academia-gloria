# 🌱 Creciendo por Dentro · Semillas multi-escenario
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-CRECIENDO_POR_DENTRO_MULTI_ESCENARIO.md` |
| **Versión** | 1.0 |
| **Estado** | Fase A aprobada para desarrollo · piloto `Yo sí puedo` · no implementada |
| **Última actualización** | 02/11/2026 |
| **Propietario** | Producto · Creciendo por Dentro / Motor de Semillas |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Separar la habilidad estable de una Semilla de sus situaciones concretas de práctica y pilotar múltiples escenarios curados en `Yo sí puedo` |

## Documentos relacionados

| Documento / fuente | Relación |
|---|---|
| `docs/specifications/SPEC-CRECIENDO_POR_DENTRO.md` | **Gobierna:** comportamiento funcional general del módulo y del Motor de Semillas. |
| `docs/standards/STD-CRECIENDO_POR_DENTRO_SEMILLAS.md` | **Gobierna:** diseño pedagógico, creación e incorporación de Semillas. |
| `docs/product/DESIGN-MOTOR_SEMILLAS-v1.0.md` | **Diseña:** separación catálogo → Motor → sesión → evidencia. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Gobierna:** implementación, pruebas, PR, publicación y cierre. |
| `mi-universo/creciendo-por-dentro/semillas.json` | **Implementa hoy:** Semillas data-driven de escenario único. |
| `mi-universo/creciendo-por-dentro/creciendo-por-dentro.js` | **Implementa hoy:** selección, recorrido, composición, grabación, sesión e histórico. |

---

## 1. Origen de la necesidad

En el uso familiar se identifica una limitación del modelo actual: una misma habilidad puede necesitar practicarse en **situaciones distintas**, pero hoy cada Semilla incorpora dentro de un único objeto tanto la habilidad como una situación concreta y los pasos/opciones adaptados a ella.

Ejemplo real:

`Yo sí puedo` trabaja la habilidad de **reconocer fortalezas, valorar avances, hablarse de forma amable y elegir un siguiente paso**, pero su situación activa es `Mi trabajo también vale`, centrada en un dibujo y en la comparación con el trabajo de otra compañera.

La necesidad aprobada es poder reutilizar **la misma Semilla / misma habilidad** en más de una situación de práctica sin crear Semillas duplicadas artificialmente.

Principio:

> **Semilla = habilidad estable que quiero practicar.**  
> **Escenario = situación concreta en la que practico esa habilidad.**

---

## 2. Decisión de producto · Fase A

Se aprueba una primera evolución controlada del Motor de Semillas:

### Fase A · escenarios curados

- pilotar el modelo únicamente con la Semilla `Yo sí puedo`;
- permitir que una Semilla pueda declarar varios `escenarios` curados;
- cada escenario puede tener su propia situación, pasos y opciones contextualizadas;
- la habilidad, identidad de Semilla y cierre pedagógico permanecen comunes cuando tenga sentido;
- las Semillas que no declaren escenarios continúan funcionando exactamente como hoy;
- no se genera contenido dinámico;
- no se solicita al alumno que escriba un escenario libre en esta fase;
- no se usa IA generativa para producir pasos u opciones durante la sesión.

La Fase A debe permitir aprender del uso real antes de diseñar las fases siguientes.

---

## 3. Qué pertenece a la Semilla y qué pertenece al Escenario

### 3.1 Nivel Semilla · estable

La Semilla conserva normalmente:

- `id`;
- `titulo`;
- `subtitulo`;
- `familia`;
- habilidad / propósito principal;
- `emociones` orientativas cuando procedan;
- `nivelApoyo` base;
- `duracionEstimada` base;
- `activo` / `recomendada`;
- identidad visual de catálogo;
- bienvenida general cuando sea transversal;
- `plantillaRespuesta` si puede mantenerse común;
- cierre y mensaje clave;
- metadatos generales de acompañamiento.

### 3.2 Nivel Escenario · contextual

Un escenario puede definir:

- `id` estable dentro de la Semilla;
- `titulo`;
- descripción breve para elegirlo;
- `tipoSituacion` efectivo;
- `situacion`;
- `pasos`;
- opciones específicas de esos pasos;
- ayudas de Lía específicas cuando aporten valor;
- recurso visual propio opcional;
- otros overrides mínimos justificados por la situación.

No se deben duplicar en cada escenario propiedades comunes de la Semilla si no cambian.

---

## 4. Contrato de datos propuesto

Una Semilla sin escenarios conserva el contrato actual.

Una Semilla multi-escenario puede evolucionar conceptualmente a:

```json
{
  "id": "yo-si-puedo",
  "titulo": "Yo sí puedo",
  "subtitulo": "Reconozco mis fortalezas y valoro cada pequeño avance.",
  "familia": "autoestima",
  "bienvenida": { "...": "común" },
  "plantillaRespuesta": "He conseguido {logro}. Usé {fortaleza}. Puedo decirme: {fraseAmable}. Mi siguiente pequeño paso será {siguientePaso}.",
  "cierre": { "...": "común" },
  "escenarioPredeterminadoId": "mi-trabajo-tambien-vale",
  "escenarios": [
    {
      "id": "mi-trabajo-tambien-vale",
      "titulo": "Mi trabajo también vale",
      "tipoSituacion": "personal",
      "situacion": { "...": "..." },
      "pasos": [ "..." ]
    }
  ]
}
```

Los nombres físicos finales pueden ajustarse en Desarrollo si existe una convención mejor, pero deben conservar este significado y no introducir una segunda estructura paralela del Motor.

---

## 5. UX aprobada

### 5.1 Catálogo

`Yo sí puedo` sigue apareciendo como **una sola Semilla** en el catálogo.

No deben aparecer tres tarjetas independientes que simulen tres Semillas distintas.

### 5.2 Entrada a una Semilla multi-escenario

Al pulsar `Yo sí puedo`, antes del recorrido guiado se muestra una selección breve equivalente a:

> **¿Con qué situación quieres practicar hoy?**

Cada escenario debe mostrar:

- título;
- una frase breve que permita reconocerlo;
- acción clara `Practicar`.

No convertir la selección en un cuestionario largo.

### 5.3 Recorrido posterior

Después de elegir un escenario:

```text
Semilla
↓
Elegir escenario
↓
Bienvenida
↓
Situación del escenario
↓
Pasos/opciones del escenario
↓
Construcción
↓
Práctica oral opcional
↓
Guardar sesión
↓
Cierre común de la Semilla
```

El alumno puede volver a cambiar de escenario antes de guardar una sesión sin consecuencias punitivas.

### 5.4 Repetición

Al finalizar una Semilla multi-escenario deben existir recorridos claros para:

- `🔁 Practicar este escenario otra vez`;
- `🌱 Probar otra situación`.

No es obligatorio usar exactamente esos textos si la UX final encuentra una formulación más simple.

---

## 6. Piloto aprobado · `Yo sí puedo`

Habilidad estable:

> **Reconocer lo que he conseguido, identificar fortalezas utilizadas, hablarme de forma amable y elegir un siguiente pequeño paso.**

Se aprueban tres escenarios curados para la Fase A.

### 6.1 Escenario 1 · Mi trabajo también vale

**ID propuesto:** `mi-trabajo-tambien-vale`

Este es el escenario vigente y debe conservar su contenido pedagógico actual:

> Has terminado un dibujo. Al mirar el de otra compañera, piensas que el suyo es mejor y empiezas a dudar del tuyo.

Mantener sus pasos actuales:

1. `logro` · ¿Qué has conseguido?
2. `fortaleza` · ¿Qué fortaleza utilizaste?
3. `fraseAmable` · ¿Qué podrías decirte con cariño?
4. `siguientePaso` · ¿Qué pequeño paso quieres dar ahora?

Sus opciones actuales no deben reescribirse sin una razón pedagógica nueva.

### 6.2 Escenario 2 · Algo del cole me está costando

**ID propuesto:** `algo-del-cole-me-cuesta`

**Situación:**

> Estás haciendo una actividad del cole. Ves que otras personas avanzan más rápido y empiezas a pensar que quizá tú no puedes hacerlo tan bien.

Mantiene los mismos cuatro propósitos de paso, con opciones contextualizadas.

#### `logro` · ¿Qué has conseguido?

Opciones iniciales:

- Empecé aunque me costaba.
- Seguí intentándolo.
- Entendí una parte que antes no entendía.
- Pedí ayuda cuando la necesité.
- `Con mis palabras` mediante el mecanismo vigente `otraRespuesta`.

#### `fortaleza` · ¿Qué fortaleza utilizaste?

Opciones iniciales:

- Esfuerzo.
- Paciencia.
- Atención.
- Perseverancia.
- Valentía para preguntar.
- respuesta propia.

#### `fraseAmable` · ¿Qué podrías decirte con cariño?

Opciones iniciales:

- No tengo que hacerlo al mismo ritmo que los demás.
- Puedo aprender paso a paso.
- Que algo me cueste no significa que no pueda aprenderlo.
- Pedir ayuda también es una forma de aprender.
- respuesta propia.

#### `siguientePaso` · ¿Qué pequeño paso quieres dar ahora?

Opciones iniciales:

- Empezar por una parte pequeña.
- Preguntar una duda concreta.
- Practicar un poco más otro día.
- Recordar algo que ahora entiendo mejor que antes.
- respuesta propia.

### 6.3 Escenario 3 · Estoy aprendiendo algo nuevo

**ID propuesto:** `estoy-aprendiendo-algo-nuevo`

**Situación:**

> Estás aprendiendo una actividad nueva. Al ver a alguien que ya la hace mejor, dudas de si tú también podrás conseguirlo.

Mantiene los mismos cuatro propósitos de paso.

#### `logro` · ¿Qué has conseguido?

Opciones iniciales:

- Me animé a probar.
- Aprendí una parte nueva.
- Repetí aunque no salió a la primera.
- Pedí una explicación o un ejemplo.
- respuesta propia.

#### `fortaleza` · ¿Qué fortaleza utilizaste?

Opciones iniciales:

- Curiosidad.
- Paciencia.
- Esfuerzo.
- Constancia.
- Valentía para intentarlo.
- respuesta propia.

#### `fraseAmable` · ¿Qué podrías decirte con cariño?

Opciones iniciales:

- Nadie aprende algo nuevo de golpe.
- Estoy empezando y puedo mejorar con práctica.
- No necesito hacerlo igual que otra persona.
- Cada intento me ayuda a aprender.
- respuesta propia.

#### `siguientePaso` · ¿Qué pequeño paso quieres dar ahora?

Opciones iniciales:

- Practicar una parte pequeña.
- Pedir que me enseñen un paso.
- Volver a intentarlo otro día.
- Fijarme en algo que ya me sale mejor que al principio.
- respuesta propia.

---

## 7. Imágenes y presentación visual

La Semilla conserva una identidad visual común en el catálogo.

Para la pantalla de situación:

- un escenario puede declarar un recurso visual propio;
- si no existe, puede utilizarse una representación simple y coherente que no contradiga la situación;
- no debe mostrarse automáticamente una ilustración específica del dibujo dentro de un escenario escolar o de aprendizaje general si genera confusión;
- antes de reutilizar la imagen actual de `Yo sí puedo` en los tres escenarios, Desarrollo debe revisarla en contexto real.

No generar tres imágenes nuevas como requisito técnico obligatorio de la Fase A si una solución visual más simple y coherente es suficiente.

---

## 8. Persistencia e histórico

El modelo actual guarda la sesión principalmente identificada por `semillaId` y reconstruye respuestas desde el catálogo vigente. Una Semilla con varios escenarios necesita trazabilidad adicional.

### 8.1 Nuevos datos mínimos de sesión

Para una sesión de Semilla multi-escenario guardar al menos:

```text
semillaId
escenarioId
escenarioTitulo
```

`tipoSituacion` debe representar la situación efectiva del escenario seleccionado.

No duplicar en la sesión toda la definición editorial del escenario.

### 8.2 Identificadores estables

Una vez publicado un `escenarioId`, debe tratarse como identificador estable para el histórico.

Los IDs de pasos y opciones también deben conservar estabilidad razonable para que sesiones anteriores sigan siendo interpretables.

### 8.3 Compatibilidad con sesiones anteriores

Las sesiones históricas de `Yo sí puedo` creadas antes de la Fase A no tienen `escenarioId`.

Regla de compatibilidad:

```text
semillaId = yo-si-puedo
+ escenarioId ausente
→ resolver para visualización histórica con escenarioPredeterminadoId
  = mi-trabajo-tambien-vale
```

No migrar ni reescribir documentos históricos solo para añadir el campo.

### 8.4 Histórico visible

El histórico debe poder mostrar, cuando exista:

> **Escenario:** Mi trabajo también vale

además del título de la Semilla.

Las respuestas deben reconstruirse contra los `pasos` del escenario usado, no contra otro escenario actualmente seleccionado.

---

## 9. Estado `Practicada`

La tarjeta de catálogo puede seguir considerando `Yo sí puedo` como `Practicada` si existe al menos una sesión de esa Semilla.

Dentro del selector de escenarios, cuando sea simple y útil, puede indicarse qué escenarios ya fueron practicados utilizando `semillaId + escenarioId`.

No crear porcentaje de dominio ni obligación de completar todos los escenarios.

---

## 10. Misiones

La Fase A mantiene las Misiones por `semillaId`.

Una Misión que permita `yo-si-puedo` permite elegir cualquiera de sus escenarios disponibles, salvo decisión funcional posterior.

No introducir todavía:

- `escenarioIds` dentro de criterios de Misión;
- finalización por escenario específico;
- cantidad obligatoria de escenarios distintos.

Esas capacidades solo se añadirán si aparece una necesidad real.

---

## 11. Compatibilidad general

La implementación debe ser **aditiva**.

### Semilla actual sin `escenarios`

```text
catálogo
→ bienvenida
→ situación
→ pasos
→ resto del flujo vigente
```

### Semilla con `escenarios`

```text
catálogo
→ selector de escenario
→ bienvenida
→ situación/pasos del escenario
→ resto del flujo vigente
```

No migrar las demás Semillas a `escenarios` únicamente por uniformidad técnica.

Solo evolucionar una Semilla cuando una necesidad real demuestre que varios escenarios aportan valor.

---

## 12. Regla para decidir entre nueva Semilla y nuevo Escenario

Pregunta principal:

> **¿Estamos practicando exactamente la misma habilidad principal en otra situación?**

Si **sí**, puede ser un nuevo escenario.

Si cambia la habilidad principal, normalmente corresponde una nueva Semilla.

Ejemplo:

```text
Yo sí puedo + dibujo
Yo sí puedo + actividad escolar
Yo sí puedo + aprendizaje nuevo
```

pueden compartir Semilla porque mantienen el mismo propósito de reconocer avances y fortalezas.

Una situación de exclusión social, conflicto, miedo o petición de ayuda no debe convertirse automáticamente en escenario de `Yo sí puedo` si la habilidad principal que necesita practicar es otra.

---

## 13. Incorporación futura de nuevos escenarios · decisión de dirección, no Fase A

Después de validar la Fase A, la siguiente evolución natural podrá permitir solicitar un nuevo escenario para una Semilla existente mediante un proceso equivalente al de creación de nuevas Semillas:

```text
necesidad real
→ identificar Semilla/habilidad propietaria
→ comprobar que sigue siendo la misma habilidad
→ diseñar escenario, pasos y opciones
→ revisar seguridad/coherencia
→ incorporar como contenido data-driven
→ probar y publicar
```

La familia/Product Owner debería poder expresar la necesidad en lenguaje natural, por ejemplo:

> “Quiero añadir a `Yo sí puedo` un escenario para cuando le cuesta una actividad de natación.”

La AI Collaborator asumiría el análisis, diseño, incorporación y documentación, igual que hoy ocurre con una nueva Semilla.

Esta capacidad será **editorial/curada**, no generación dinámica dentro de la sesión.

No se implementa en la Fase A salvo la arquitectura mínima necesaria para que añadir escenarios posteriormente sea sencillo.

---

## 14. Generación dinámica por el usuario · fase posterior

Queda expresamente fuera de la Fase A permitir:

```text
usuario describe cualquier situación
→ Academia genera automáticamente escenario/pasos/opciones
```

Antes de aprobar esa capacidad deben haberse madurado al menos:

- el modelo multi-escenario curado;
- la experiencia de añadir escenarios editoriales;
- límites de privacidad;
- seguridad emocional;
- validación de que la situación corresponde realmente a la habilidad de la Semilla;
- control de calidad de opciones y ayudas;
- tratamiento de hechos frente a interpretaciones;
- persistencia o no de escenarios personalizados;
- revisión familiar/profesional cuando corresponda.

No anticipar una solución técnica antes de tener evidencia de las Fases A y siguientes.

---

## 15. Criterios de aceptación · Fase A

La implementación será candidata cuando:

1. `Yo sí puedo` sigue siendo una sola Semilla en el catálogo;
2. al abrirla aparecen tres escenarios claros y comprensibles;
3. el escenario original del dibujo conserva su contenido vigente;
4. los otros dos escenarios mantienen la misma habilidad principal con opciones contextualizadas;
5. cambiar de escenario cambia también situación, pasos y opciones correspondientes;
6. bienvenida, composición, práctica oral, cierre y navegación reutilizan el Motor existente;
7. `plantillaRespuesta` común funciona con los mismos IDs de paso en los tres escenarios;
8. las demás Semillas siguen funcionando sin cambios de datos obligatorios;
9. una sesión nueva de `Yo sí puedo` guarda `escenarioId` y `escenarioTitulo`;
10. `tipoSituacion` guardado corresponde al escenario efectivo;
11. el histórico muestra el escenario correcto y reconstruye sus respuestas correctamente;
12. sesiones antiguas de `Yo sí puedo` sin `escenarioId` siguen siendo legibles mediante el escenario predeterminado;
13. repetir el mismo escenario y elegir otro escenario son recorridos claros;
14. Misiones continúan filtrando por `semillaId` sin cambios obligatorios;
15. no se añade IA generativa, contenido dinámico ni texto libre de escenario;
16. no se crean colecciones Firestore paralelas ni persistencia propia de escenarios;
17. no se rompe Persona Activa, consulta relacionada, audio/transcripción ni evidencia `semilla_completada`;
18. se valida desktop y móvil, teclado, foco y ausencia de desbordamiento;
19. se revisa visualmente que la imagen no contradiga el escenario activo;
20. se prueba con Gloria antes de declarar estable el modelo multi-escenario.

---

## 16. Validación esperada en Desarrollo

Desarrollo debe verificar al menos:

- carga de catálogo con Semillas antiguas y una multi-escenario;
- selector de los tres escenarios;
- conservación exacta del escenario original;
- respuestas propias y selección simple/múltiple en cada escenario;
- composición final común;
- grabación/transcripción opcionales sin regresión;
- guardado de `escenarioId`/`escenarioTitulo`;
- histórico nuevo y compatibilidad histórica anterior;
- estado `Practicada`;
- acceso libre y desde Misión;
- Persona Activa propia y consulta relacionada;
- cero cambios de Rules salvo necesidad real demostrada;
- responsive y revisión visual.

---

## 17. Decisión

**FASE A APROBADA PARA DESARROLLO.**

Se aprueba evolucionar el Motor de Semillas para soportar **Semillas con varios escenarios curados**, manteniendo compatibilidad con el contrato actual de escenario único.

El piloto se limita a `Yo sí puedo` con tres escenarios:

1. `Mi trabajo también vale`;
2. `Algo del cole me está costando`;
3. `Estoy aprendiendo algo nuevo`.

La finalidad es validar que una misma habilidad puede practicarse en situaciones distintas sin duplicar Semillas.

Como dirección posterior, se prevé un proceso curado para **solicitar un nuevo escenario de una Semilla existente**, equivalente conceptualmente al flujo actual de solicitar una nueva Semilla. La generación dinámica de escenarios a partir de una solicitud libre del usuario queda fuera del alcance y solo se reconsiderará después de madurar las fases previas.
