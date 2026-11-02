# 🌱 Creciendo por Dentro · Semillas multi-escenario
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-CRECIENDO_POR_DENTRO_MULTI_ESCENARIO.md` |
| **Versión** | 1.7 |
| **Estado** | Fase A publicada · ampliación candidata bloqueada por composición 004 · no estable |
| **Última actualización** | 02/11/2026 |
| **Propietario** | Producto · Creciendo por Dentro / Motor de Semillas |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Separar la habilidad estable de una Semilla de sus situaciones concretas de práctica y ampliar el piloto a seis Semillas con escenarios curados |

## Documentos relacionados

| Documento / fuente | Relación |
|---|---|
| `docs/specifications/SPEC-CRECIENDO_POR_DENTRO.md` | **Gobierna:** comportamiento funcional general del módulo y del Motor de Semillas. |
| `docs/standards/STD-CRECIENDO_POR_DENTRO_SEMILLAS.md` | **Gobierna:** diseño pedagógico, creación e incorporación de Semillas. |
| `docs/product/DESIGN-MOTOR_SEMILLAS-v1.0.md` | **Diseña:** separación catálogo → Motor → sesión → evidencia. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Gobierna:** implementación, pruebas, PR, publicación y cierre. |
| `mi-universo/creciendo-por-dentro/semillas.json` | **Implementa:** catálogo data-driven y piloto curado multi-escenario. |
| `mi-universo/creciendo-por-dentro/creciendo-por-dentro.js` | **Implementa hoy:** selección, recorrido, composición, grabación, sesión e histórico. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.7 | 02/11/2026 | Product Owner + AI Collaborator | Ampliación candidata a seis Semillas con diez escenarios curados y badge informativo dinámico. Conserva plantillas e histórico; detectada incompatibilidad de composición en 004, pendiente de decisión antes de publicar. Prueba familiar ampliada pendiente. |
| 1.6 | 02/11/2026 | Product Owner + AI Collaborator | V1 de Misiones publicada mediante #231, Pages #840 success; sin integración/publicación pendiente, manteniendo validación familiar del modelo. |
| 1.5 | 02/11/2026 | Product Owner + AI Collaborator | Incorpora la V1 aprobada de Misiones: escenario opcional para una sola Semilla, ejecución contextual fijada y evidencia efectiva. Conserva Fase A e históricos sin migración. |
| 1.4 | 02/11/2026 | Product Owner + AI Collaborator | Cierra microajuste visual #227/Pages #836 success: HTML y CSS públicos idénticos a los probados; sin trabajo técnico pendiente ni cambios funcionales. |
| 1.3 | 02/11/2026 | Product Owner + AI Collaborator | Microajuste visual del escenario elegido: etiqueta, jerarquía, fondo suave y acción secundaria. Sin cambio funcional; validación visual responsive y regresión. |
| 1.2 | 02/11/2026 | Product Owner + AI Collaborator | Cierra #225: Pages #834 success, nueve archivos públicos modificados y la imagen original idénticos al árbol probado. Sin desarrollo/publicación técnica pendiente; uso con Gloria y dispositivos/identidad reales pendientes. |
| 1.1 | 02/11/2026 | Product Owner + AI Collaborator | Implementación aditiva del piloto; contrato efectivo compartido, sesión e histórico compatibles. Candidata técnica; pendiente de publicación y uso con Gloria. |
| 1.0 | 02/11/2026 | Product Owner + AI Collaborator | Fase A curada aprobada para desarrollo, con tres escenarios de Yo sí puedo. |

## Resumen de contenido

§1–7: necesidad, contrato, experiencia y contenido aprobado; §8–12: sesión, histórico, Practicada y Misiones; §13–17: evoluciones fuera de alcance, aceptación y aprobación; §18: implementación, validación y estado real.

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

- piloto inicial con `Yo sí puedo`; ampliación posterior aprobada a 001/004/007/010/011, definida en `DESIGN-SEMILLAS_MULTI_ESCENARIO_AMPLIACION_001_004_007_010_011.md`;
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

Las sesiones históricas creadas antes de convertir una Semilla a multi-escenario no tienen `escenarioId`; esta compatibilidad se aplica tanto a `Yo sí puedo` como a las cinco Semillas ampliadas.

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

## 10. Misiones · escenario opcional V1

La Fase A original mantuvo Misiones exclusivamente por `semillaId`. La revisión transversal posterior aprobó refinar opcionalmente una Misión de una sola Semilla concreta multi-escenario con `criterioCumplimiento.filtros.escenarioId`, conservando `semillasIds`. Fuente propietaria del comportamiento de Misión: `SPEC-MIS_TAREAS_Y_MISIONES.md`, sección «Misiones de Semillas · situación opcional V1».

- Sin escenario fijado (incluidas Misiones antiguas): elegir cualquiera de los escenarios curados, sin filtro ficticio.
- Con escenario: el Motor lo valida contra la única Semilla objetivo/cantidad 1, entra directamente, muestra «Situación de esta Misión» y oculta el cambio de situación. Repetir conserva el escenario; fuera de Misión permanece la libertad completa.
- Situación fijada no disponible/incompatible: detener esa ejecución y pedir revisión familiar; no elegir otra silenciosamente.
- Evidencia nueva: escenario efectivo como atributos `escenarioId` y `escenarioTitulo` cuando existe. Filtro general exige Semilla y escenario correctos; título no participa en identidad.
- No migrar sesiones/evidencias/Misiones anteriores. Sin selección por escenario para varias Semillas, cantidades de situaciones distintas, porcentajes, análisis ni automatización.

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
14. Misiones conservan selección por `semillaId` y permiten el filtro opcional V1 solo para una Semilla/cantidad 1;
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

## 18. Implementación de Fase A · 02/11/2026

### 18.1 Decisiones técnicas sin cambio funcional

- Base inicial `main` `be6cfd4` (#223), actualizada a `f4bd3fb` (#224), que añade únicamente diseño futuro sin ampliar esta fase. Rama `feat/semillas-multi-escenario`. Catálogo 1.11: doce Semillas, una piloto; los otros once objetos intactos. Original trasladado íntegramente al escenario predeterminado.
- `escenarios-semilla.js` proyecta contenido efectivo sin estado ni persistencia; se reutiliza en Motor/Jardín y `mis-tareas/trabajo-realizado-generico.js`. Identidad, bienvenida, plantilla y cierre comunes. Nuevos escenarios usan pasos/tipos/máximos/ayudas existentes y las opciones exactas aprobadas en §6.
- `tipoSituacion`: dibujo y aprendizaje nuevo = `personal`; actividad del cole = `colegio`, valor ya usado por el catálogo. No se crean criterios de Misión.
- `Academia.semillas.guardarSesion` conserva campos opcionales de escenario en la colección existente; las Semillas simples no añaden claves vacías. No hay cambios de Rules ni migración: consulta y escritura continúan mediante Persona Activa/nivel efectivo existentes.
- Compatibilidad de lectura por escenario predeterminado; ID explícito desconocido conserva título/frase guardados y omite reconstrucción de opciones ajenas.
- Selector permite regresar a la práctica actual conservando respuestas. Elegir otra reinicia la práctica, deteniendo medios y descartando callbacks anteriores. Cierre permite repetir o elegir situación. Guardado protegido frente a doble acción/cambio en curso.
- Imagen original revisada: niña ante espejo con mensajes de autoestima/aprendizaje, sin dibujo específico. Reutilizada con texto alternativo pertinente, sin nuevos binarios. Guías propietaria y web sincronizadas.

### 18.2 Validación y límites

Pruebas reproducibles: `tests/semillas-composicion-browser.cjs` y `tests/semillas-escenarios-browser.cjs`, con infraestructura externa simulada compartida en `tests/helpers/semillas-browser.cjs`. Motor, API, ContextoUsuario y lectores reales. Revisión visual renderizada y comprobación de imágenes en contexto. Resultados superados: doce Semillas (once objetos intactos y escenario original exacto), tres recorridos con respuestas propias/composición, voz/grabación/transcripción controladas, cambio y retorno sin mezclar datos, permiso de micrófono tardío cancelado, guardado y reconstrucción de histórico nuevo/antiguo/ID desconocido, Practicada, acceso libre/Misión/evidencia/Trabajo realizado, Persona Activa, familiar gestor/profesional de consulta/sin relación, teclado/foco/reduced-motion y 320/390/768/1024/1440 sin desbordamiento. Imagen original revisada en selector y situaciones desktop/móvil. Cero errores JavaScript; aviso HTTP 404 preexistente de `assets/identidad/guacamayas/guacamaya-roja-posada-01.png` en la celebración compartida, ajeno a la imagen de Semilla. Ninguna colección nueva ni escritura fuera de sesiones/evidencias/tareas existentes en las pruebas. Publicación y verificación pública completadas en §18.3.

La identidad, SDK Firestore, dictado, captura y transcripción de las pruebas son controlados: no equivalen a permisos desplegados, micrófono físico o uso autenticado real. Validar con Gloria comprensión/elección, práctica oral y consulta real antes de declarar estable. No hay generación dinámica, escenarios personales persistidos ni colecciones nuevas.

### 18.3 Cierre técnico y publicación

[PR #225](https://github.com/jperdomo12/academia-gloria/pull/225) revisada e integrada autónomamente dentro de la autorización del Product Owner. Head probado `5c294da3872e1bec2b20a4ff3bec1e2e087f8fb9`, árbol `af8a855d6ae2908f13d7c4123b70a7f971a914b9`, base `f4bd3fb958788fe910632f27842a1d34bda2f53c`, merge `f0473291df3b7f65958102a43ec02f30e57d3ed3`. Revisión final: 18 archivos previstos, árbol remoto igual al probado y PR limpia, sin checks CI configurados; suites locales superadas. Diseño futuro de solicitud de escenarios conservado íntegro, fuera de esta implementación.

[Pages #834](https://github.com/jperdomo12/academia-gloria/actions/runs/41453056775) `success`. Verificación pública HTTP 200 y bytes idénticos para nueve archivos de producto modificados (HTML, CSS, Motor, catálogo, resolver, API, guía y ambos archivos de Trabajo realizado), con los parámetros de caché reales, más la imagen original conservada: diez comprobaciones. URL de entrada: <https://jperdomo12.github.io/academia-gloria/mi-universo/creciendo-por-dentro/> → Yo sí puedo.

Sin desarrollo, integración ni publicación técnica pendiente de la Fase A. **Pendiente:** uso real con Gloria, elección/comprensión de situaciones, práctica oral/micrófono y transcripción según dispositivo, y consulta relacionada con cuenta real. La verificación pública es HTTP/bytes; la validación funcional y visual es local con identidad/servicios controlados. No equivale a certificar Rules desplegadas ni estabilidad del modelo.

### 18.4 Microajuste visual · situación elegida

Solicitud aprobada del Product Owner, desde `main` `9913637790f6ae112ae8fcce642f20e48a69bfc8`. Cambios de producto limitados a `index.html` y `creciendo-por-dentro.css`: etiqueta discreta «Situación elegida», jerarquía del título, fondo violeta/verde y sombra tenue, botón secundario de 44 px como mínimo y separación de 22 px respecto del progreso. Conserva IDs, eventos y fuente del título; no añade iconos ni otra representación del escenario. CSS versionado `?v=3`.

No cambia Motor/selector, datos, contratos de sesión, histórico, Misiones, evidencia o contenido pedagógico. Reutiliza `.btn--light`, paleta y composición flex existentes. Texto largo ajustable y foco/reduced-motion conservados.

Revisión renderizada de los tres escenarios en 320/390/768/1024/1440 y caso de título largo: jerarquía, ausencia de desbordamiento, botón evidente/pulsable y teclado/retorno correctos, cero escrituras o errores JS en la revisión visual. Regresión con las dos suites vigentes del Motor; medios/identidad/Firestore controlados. El test de escenarios aparta el puntero antes de abrir Jardín para evitar oscilación del hover preexistente al sustituir controles; no cambia sus aserciones. Aviso decorativo preexistente de celebración conservado. Publicación del ajuste completada; Fase A sigue pendiente de uso con Gloria para estabilidad.

**Cierre del microajuste:** [PR #227](https://github.com/jperdomo12/academia-gloria/pull/227), head probado `e426d3643b9e8a58524a67f273b711a12bbab8c8`, árbol `1394d4cf3aff5f05eecf08f99f190989b2323453`, merge `91ce0b4e1ffea9b8a8d529c5d3dbf5f9c259db99`. Cinco archivos previstos revisados: dos de producto, test y dos fuentes documentales. [Pages #836](https://github.com/jperdomo12/academia-gloria/actions/runs/41459267130) success; HTML y CSS `?v=3` públicos HTTP 200 y bytes idénticos al árbol revisado. Motor, catálogo y API idénticos al baseline. Sin desarrollo, integración o publicación pendiente del ajuste. Validación funcional/visual local con servicios controlados y verificación pública HTTP/bytes; uso real de Fase A con Gloria permanece pendiente.

### 18.5 Misiones con situación fijada · V1

Implementación desde `main` `5d3b5b4e62ee682378a4f6da775792690064fb50` (#230), tras cierre de revisión transversal. Gestión reutiliza catálogo, formulario, bloqueo de objetivos y filtro existentes. Motor reutiliza contexto visual y recorrido; el nuevo `scenarioLabel` distingue situación elegida frente a situación de la Misión. Evidencia propaga los dos campos efectivos; API compara el filtro escalar y comprueba Semilla real permitida.

Mi Camino y Trabajo realizado mantienen su código/contrato: contexto por `misionId`, navegación vigente y consulta del escenario real ya implementada. No se modifica `semillas.json`, sesiones previas, Rules ni imágenes. Cambian las versiones de entrada del JS del Motor/Gestión y API a fin de evitar código anterior en caché. Validación y cierre canónicos: SPEC de Misiones, sección V1. La experiencia multi-escenario sigue pendiente de uso con Gloria antes de declarar estabilidad.

**Cierre de V1 de Misiones:** #231 integrada en `c905b3743384a04370045d4b27650c635e282502`, Pages #840 success y ocho comprobaciones públicas idénticas al árbol probado. SPEC de Misiones 2.8, sección V1, registra pruebas, límites y trazabilidad canónicos. Sin trabajo técnico pendiente; uso familiar de multi-escenario sigue pendiente antes de estabilidad.

### 18.6 Ampliación curada · candidata desde main #237

Fuente exacta de los diez escenarios: `docs/product/DESIGN-SEMILLAS_MULTI_ESCENARIO_AMPLIACION_001_004_007_010_011.md`. Catálogo 1.12; seis Semillas multi-escenario (001/003/004/007/010/011), tres situaciones cada una. Las otras seis Semillas y 003 permanecen idénticas al baseline `78fc64b`; no cambia el contrato interno de 012. Plantillas y propiedades comunes conservadas. Situación y pasos originales se trasladan íntegros, incluidos IDs de opciones, al escenario predeterminado:

| Semilla | escenarioPredeterminadoId |
|---|---|
| 001 | `el-lapiz` |
| 004 | `las-dos-queremos-jugar-primero` |
| 007 | `hoy-yo-prefiero-otra-cosa` |
| 010 | `necesito-un-ratito-tranquilo` |
| 011 | `me-ofrecen-una-pista` |

El badge `🌱 N situaciones` se deriva exclusivamente de `escenarios.length`, aparece solo para N > 1 y es información discreta sin progreso/obligación. Se reutilizan selector, contexto, composición, práctica oral, sesión, Jardín, Trabajo realizado y Misiones; no hay lógica nueva por Semilla, colección, migración ni nuevo visor. Guía propietaria y presentación web sincronizadas. No se modifica lógica de permisos ni filtros/evidencia.

Ilustraciones originales revisadas: 001 muestra explícitamente el lápiz, 007 actividades de recreo y 011 un puzle. Se conservan en catálogo/originales; los escenarios nuevos de esas tres Semillas usan `recursos: null`, contrato vigente de recurso opcional, y apoyo visual simple del Motor. Las imágenes generales de acuerdo (004) y calma (010) sirven también en los nuevos contextos. Sin nuevos binarios ni rediseños.

**Bloqueo real antes de publicación:** la plantilla común vigente de 004 (`Las dos queremos {comprender}. También puedo pensar que mi amiga {perspectiva}…`) presupone fragmentos, mientras las nuevas opciones aprobadas son frases completas. Resultado reproducido: «Las dos queremos Tenemos dos ideas diferentes para hacer el mismo trabajo. También puedo pensar que mi amiga Puede pensar que su idea también puede funcionar…». La repetición también existe en el original. Se conservan literalmente tanto la plantilla como el contenido aprobado, conforme al encargo; no se corrigen silenciosamente. Debe decidirse un ajuste mínimo del encuadre de la composición antes de integrar, sin modificar respuestas, opciones, IDs, históricos o habilidad. Candidata no publicada; esto no es una segunda aprobación del alcance.

Pruebas y límites: ver §12 del diseño de ampliación. La prueba familiar ampliada con Anaís y Gloria, usando varias de las seis Semillas, sigue siendo Quality Gate para certificar, ajustar o revisar situaciones. No declarar estable.
