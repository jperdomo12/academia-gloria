# Plan Semanal 6.º
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-PLAN_SEMANAL_6TO.md` |
| **Versión** | 1.6 |
| **Estado** | Publicada para validación familiar · no declarada estable |
| **Última actualización** | 20/10/2026 |
| **Propietario** | Experiencia curricular · 6.º de Primaria |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Incorporación selectiva de documentos relevantes publicados por Gaudem en Plan Semanal, organizados por semana y conectados con sus materias/Temas propietarios |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | Gobierna la incorporación de material escolar real y la reutilización de Temas existentes. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | Gobierna la organización conceptual de la experiencia. |
| `docs/specifications/SPEC-SCIENCE_6TO_NUTRICION.md` | Primera aplicación real: material complementario semanal conectado con el Tema existente de Nutrición. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | Gobierna desarrollo, validación, PR, aprobación y cierre. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.6 | 20/10/2026 | Product Owner + AI Collaborator | Ajuste de redacción solicitado: «Semana · rango» en lugar de «Esta semana · rango». Conserva prioridad y clasificación de semanas; referencia de módulo v=2 para caché. |
| 1.5 | 20/10/2026 | Product Owner + AI Collaborator | Retira los tres accesos plegables duplicados por observación visual del Product Owner. Las carpetas superiores muestran una sola sección (Lectura/V-F/A-B-C/Conectar), conservando respuestas y validación al cambiar. Sin cambios de contenido ni persistencia. |
| 1.4 | 20/10/2026 | Product Owner + AI Collaborator | Ajuste #192 integrado en 20364da3… y publicado (Pages #802 success): accesos juntos y respuestas/validación/reintentos sin guardado. Seis archivos de producto públicos de #192 idénticos a los probados; referencias v=2 en el cierre protegen caché de estilos/datos/presentador. Revisión familiar del ajuste pendiente. |
| 1.3 | 20/10/2026 | Product Owner + AI Collaborator | Observación directa del Product Owner: Plan Semanal junto a Zonas y respuestas digitales con validación en los tres bloques, sin guardar resultados. Conserva instrucción de cuaderno; corrige la limitación inicial de solo revelar soluciones. Texto libre comparado con modelo, sin calificación automática. |
| 1.2 | 20/10/2026 | Product Owner + AI Collaborator | Cierra publicación autorizada: #190 integrada en da8eb5fb…, Pages #800 success y nueve archivos públicos HTTP 200 idénticos al resultado probado. Mantiene revisión familiar de lectura/cuaderno/soluciones pendiente; sin declarar estabilidad. |
| 1.1 | 20/10/2026 | Product Owner + AI Collaborator | Primera implementación: portal selectivo por semanas y ficha paper-first dentro de Science/Nutrición. Catálogo único, lectura/voz compartida, tres bloques con comprobación tras intento y sin evidencia persistente. Validación técnica y responsive; revisión familiar pendiente. |
| 1.0 | 20/10/2026 | Product Owner + AI Collaborator | Decisión funcional aprobada: nuevo acceso transversal `Plan Semanal` en 6.º, incorporación selectiva mediante una sola instrucción, organización por semanas y conexión con el Tema propietario cuando corresponda. Registra `6_PS_ANS_Nutrición.pdf` como primera aplicación, semana escolar del 19 al 26 de octubre de 2026. |

---

## 1. Propósito

`Plan Semanal` permite incorporar a Academia una **selección de materiales relevantes** que el Colegio Gaudem publica semanalmente para 6.º de Primaria.

No pretende copiar ni republicar automáticamente toda la carpeta oficial del colegio.

El principio es:

> **Gaudem publica muchos documentos; el Product Owner selecciona cuáles merecen formar parte de Academia.**

La Academia transforma esos materiales seleccionados en una experiencia clara y útil, conservando su procedencia y conectándolos con la materia y el Tema que realmente les corresponde.

---

## 2. Ubicación en 6.º

En el portal de `6.º de Primaria`, `Plan Semanal` debe aparecer como un espacio transversal propio:

- `Mis asignaturas`;
- fila de accesos independientes: `Zonas del cole` y `📅 Plan Semanal`, uno junto al otro;
- `Recursos del colegio`.

En pantallas extremadamente estrechas, la rejilla compartida permite una columna para mantener la legibilidad.

Por tanto:

- se ubica **junto a `Zonas del cole`, en la misma fila de accesos**;
- se ubica **antes de `Recursos del colegio`**;
- no es una asignatura;
- no es una Zona del cole;
- no sustituye a los portales de materia;
- no es una copia del Site de Gaudem.

---

## 3. Organización por semanas

La entrada principal de `Plan Semanal` organiza el material seleccionado por la semana indicada por el Product Owner.

Ejemplo:

```text
📅 Plan Semanal

Semana · 19–26 octubre
  🔬 Science · Nutrición
     El viaje de la nutrición

Semanas anteriores
  13–19 octubre
  ...
```

La etiqueta de semana debe conservar el rango escolar utilizado por Gaudem cuando sea conocido.

Las semanas anteriores pueden presentarse plegadas o con menor protagonismo para evitar saturación.

No existe obligación de mostrar todas las semanas: una semana puede no tener ningún material incorporado si el Product Owner no seleccionó documentos.

---

## 4. Incorporación selectiva mediante una sola instrucción

El Product Owner no debe realizar tareas administrativas para registrar cada material.

Son entradas suficientes expresiones como:

- `Adjunto documento del Plan Semanal de esta semana.`
- `Adjunto documento del Plan Semanal de la semana pasada.`
- `Adjunto documento del Plan Semanal de la semana del 19 al 26 de octubre.`

A partir de esa instrucción y del archivo aportado, el proceso debe:

1. identificar el contenido y, cuando sea posible, la materia;
2. resolver la semana indicada por el Product Owner;
3. analizar si corresponde a un Tema existente, a un Tema nuevo o a una actividad semanal independiente;
4. reutilizar el Tema existente cuando proceda;
5. conservar la procedencia `Material del colegio · Plan Semanal`;
6. construir solo la experiencia necesaria;
7. documentar la incorporación conforme al workflow vigente.

Solo se solicita aclaración si existe una ambigüedad que pueda cambiar materialmente la ubicación o el significado del material.

---

## 5. Clasificación de cada documento seleccionado

### 5.1 Material complementario de un Tema existente

Si el documento amplía, practica o refuerza un contenido que ya existe en Academia:

- **no se crea otro Tema**;
- el conocimiento sigue perteneciendo al Tema existente;
- `Plan Semanal` funciona como acceso temporal/semanal hacia esa experiencia;
- dentro del Tema puede existir una sección identificada como `Material del Plan Semanal` o equivalente, organizada por fecha cuando haya más de una incorporación.

Ejemplo inicial:

```text
Plan Semanal
  → Science · Nutrición
      → Material del Plan Semanal
          → Semana 19–26 octubre
             El viaje de la nutrición
```

### 5.2 Material que introduce un Tema nuevo

Si el documento introduce contenido curricular nuevo que merece un Tema propio:

- se crea/incorpora el Tema dentro de su materia siguiendo el estándar curricular vigente;
- `Plan Semanal` referencia ese Tema como acceso de la semana;
- no se mantiene una segunda implementación paralela del mismo contenido.

### 5.3 Actividad o instrucción semanal sin Tema propietario

Si el documento es una actividad puntual, instrucción o ficha que no justifica crear un Tema:

- puede existir únicamente dentro de `Plan Semanal`;
- conserva materia/procedencia cuando puedan identificarse;
- no se fuerza artificialmente su conversión en Tema académico.

---

## 6. Relación con el material oficial de Gaudem

`Plan Semanal` de Academia es una **selección curada**, no un espejo de `https://sites.google.com/gaudem.es/sexto/plan-semanal`.

Por defecto:

- no se incorporan automáticamente todos los documentos detectados;
- el Monitor Gaudem puede ayudar a identificar novedades, pero **la detección no equivale a incorporación**;
- la decisión de incorporar corresponde al Product Owner;
- no se publica una copia del PDF original salvo decisión explícita y justificada;
- la experiencia de Academia se construye a partir del material seleccionado, manteniendo trazabilidad de origen.

---

## 7. Experiencia paper-first cuando el colegio lo pida

Cuando el propio material escolar indique realizar el trabajo en papel/cuaderno, Academia debe respetar esa instrucción.

Patrón recomendado:

> **Haz primero esta actividad en tu cuaderno, como indicó el cole. Después puedes usar Academia para leer, escuchar y comprobar.**

En esos casos:

- Academia no sustituye el trabajo en cuaderno;
- después del trabajo en cuaderno, el alumno puede responder en Academia y comprobar sus elecciones;
- no es obligatorio convertir el ejercicio en otra prueba digital persistente;
- se evita duplicar evidencia si el Tema ya dispone de Práctica/Prueba académica propia.

---

## 8. Primera aplicación aprobada · Science · Nutrición

### 8.1 Fuente

Archivo aportado por el Product Owner:

`6_PS_ANS_Nutrición.pdf`

Procedencia declarada:

`Colegio Gaudem · Plan Semanal · semana del 19 al 26 de octubre de 2026`

El documento se presenta como `Plan Semana de Science · 6.º E.P. Adaptación no significativa` y declara que trabajará **comprensión lectora y el nuevo tema de Science de la Nutrición**.

### 8.2 Relación con el Tema existente

El documento pertenece al Tema ya publicado:

`6.º → Science → Nutrición`

Por tanto:

- **no se crea otro Tema**;
- **no se crea otra materia**;
- se incorpora como primer `Material del Plan Semanal` asociado a Nutrición;
- también se muestra desde el nuevo acceso transversal `Plan Semanal` de 6.º.

### 8.3 Contenido escolar que debe preservarse

El documento contiene:

1. lectura integrada **`El viaje de la nutrición`**;
2. actividad de **Verdadero o Falso** con corrección de afirmaciones falsas;
3. actividad **A/B/C** de ocho preguntas;
4. actividad de conexión entre partes del cuerpo y los cuatro sistemas.

La lectura integra en una única narración:

- sistema digestivo;
- sistema respiratorio;
- sistema circulatorio;
- sistema excretor.

### 8.4 Instrucción paper-first del colegio

El documento indica explícitamente que las actividades deben realizarse **en papel/cuaderno**, cuidando la presentación y copiando ejercicios y respuestas.

La adaptación en Academia debe conservar esa intención.

Experiencia aprobada, ajustada tras la primera revisión del Product Owner:

```text
📖 El viaje de la nutrición
  lectura clara
  🔊 escuchar

✏️ Actividades del Plan Semanal
  1. Verdadero o Falso
  2. A/B/C
  3. Conectar parte ↔ sistema

Primero en tu cuaderno.
Después, responde también en Academia: 👀 Comprobar mis respuestas
```

La comprobación posterior valida las elecciones introducidas en Academia y ofrece respuestas y explicaciones breves, sin convertir esta ficha en una segunda Prueba académica persistente ni duplicar la persistencia del Tema. En V/F se pide una propuesta escrita al marcar Falso; esa redacción se compara con el modelo, sin calificación automática del texto libre.

---

## 9. UX mínima del acceso transversal

Cada material seleccionado debe mostrar, como mínimo:

- materia cuando sea conocida;
- título o descripción breve;
- semana;
- procedencia escolar;
- acción clara para abrirlo;
- relación con el Tema propietario cuando exista.

Ejemplo:

```text
🔬 Science · Nutrición
📖 El viaje de la nutrición
Lectura + actividades en cuaderno
Abrir actividad →
```

La interfaz debe priorizar la semana actual y mantener semanas anteriores accesibles sin sobrecarga visual.

---

## 10. Fuera de alcance de esta primera versión

No se aprueba por esta decisión:

- sincronización automática con Google Sites;
- incorporación automática de todos los documentos detectados;
- descarga o republicación masiva de PDFs del colegio;
- clasificación automática sin revisión del material seleccionado;
- creación de nuevas colecciones/persistencias si los contratos existentes son suficientes;
- convertir cada documento semanal en Misión o Prueba;
- rehacer los portales de materias o Zonas.

---

## 11. Criterios de aceptación

La primera implementación deberá demostrar que:

1. `Plan Semanal` aparece junto a `Zonas del cole` en 6.º, antes de `Recursos del colegio`, con la misma rejilla responsive;
2. solo contiene material seleccionado por el Product Owner;
3. organiza el material por semana;
4. el primer documento corresponde a la semana 19–26 octubre de 2026;
5. el primer documento se identifica como Science · Nutrición;
6. desde Plan Semanal se accede a la experiencia correspondiente sin crear un Tema duplicado;
7. Science → Nutrición conserva la propiedad del contenido y presenta el material semanal asociado;
8. la actividad respeta la instrucción de realizar primero el trabajo en cuaderno;
9. el alumno responde y comprueba los tres bloques en Academia sin duplicar la Práctica/Prueba persistente de Nutrición ni guardar las respuestas;
10. responsive, navegación y `Volver` conservan los estándares vigentes.

---

## 12. Implementación y continuidad técnica · 20/10/2026

Base real de desarrollo: `main` `288875b6a01fccebb5eec4102ff9f22afcd819db` (decisión de Plan Semanal ya integrada). Rama `feat/plan-semanal-6to`. PR #190 integrada en `da8eb5fb6b1a750e17f47575ad5466b69b262a5d`, dentro de la autorización expresa del Product Owner para implementación, PR y publicación/verificación. La revisión familiar del resultado sigue pendiente.

### 12.1 Ubicación, propiedad y reutilización

- `cursos/6to/index.html` sitúa dos accesos independientes (Zonas del cole y Plan Semanal) en la misma rejilla compartida, antes de Recursos del colegio. Conserva títulos, tarjetas e identidad; no incorpora una asignatura o una Zona. Las filas de encabezados/tarjetas se alinean con subgrid; a 350 px o menos aplica la columna única ya prevista en la rejilla.
- `cursos/6to/plan-semanal/index.html` es el acceso por semanas. `materiales.js` contiene únicamente la selección del Product Owner: identidad, rango escolar, materia/Tema, procedencia y rutas. No consulta Google Sites ni el Monitor.
- La única experiencia del documento vive en `cursos/6to/science/nutricion/plan-semanal/`. El acceso semanal y la sección **Material del Plan Semanal** del Mapa de Nutrición se derivan del mismo catálogo y apuntan al mismo destino.
- `viaje-nutricion.js` contiene lectura y actividades del documento; utiliza `plan-semanal/documento.js` para presentar lectura, voz y comprobación por bloque. El presentador existente incorpora comprobación de las selecciones de esta ficha, sin iniciar sesiones académicas ni guardar respuestas/resultados. No se duplica ni adapta el motor persistente del Tema.
- `plan-semanal.js` agrupa el catálogo y presenta también los enlaces asociados de un Tema mediante `data-plan-tema`. La selección no se copia al catálogo de Science ni a Misiones.
- `plan-semanal.css` contiene solo ajustes de semanas/documentos. Reutiliza `academia-base.css`, `portal-curso.css`, la rejilla de tarjetas y la cabecera/navegación/Panel compartidos. El cuerpo declara título, icono y retorno alternativo; no duplica la navegación.
- Reutiliza `LectorTexto` con español y parada explícita. Escucha exclusivamente el relato, nunca las soluciones ocultas. Informa si no hay voz disponible o si falla; detiene la lectura al abandonar la página.
- Las carpetas superiores muestran una sección cada vez: Lectura (inicial), V/F, A/B/C o Conectar. Se retiran los tres encabezados plegables repetidos debajo de la lectura. Radios V/F y A/B/C, y selectores para conectar sistemas. **👀 Comprobar mis respuestas** valida las selecciones completas, muestra qué revisar, explicación por pregunta y recuento de elecciones correctas del bloque; **Volver a intentarlo** reinicia ese bloque. No se guarda ninguna respuesta o recuento. Las respuestas se reinician al recargar la página.
- No se añaden colecciones, Rules, sesiones, resultados, Misiones ni escrituras educativas; la navegación mantiene su almacenamiento contextual ya existente. Práctica/Prueba de Nutrición conservan íntegros su motor, banco, identidad y evidencia.

### 12.2 Calendario y futuras incorporaciones

Las fechas del catálogo usan `AAAA-MM-DD`; el día actual se obtiene en **Europe/Madrid**. Los dos extremos del rango escolar se incluyen. Las semanas que contienen el día actual tienen prioridad; las anteriores quedan accesibles en desplegables cerrados, ordenadas de más reciente a más antigua. Una semana pasada nunca se etiqueta como actual. Si no hay selección actual se informa sin ocultar los materiales disponibles; los futuros se muestran plegados como próximos. El rango se formatea sin alterar las fechas del colegio, también si cruza mes/año.

Para incorporar material seleccionado posteriormente:

1. resolver semana y clasificación siguiendo §§4–5, con la instrucción mínima del Product Owner;
2. reutilizar la materia/Tema propietario cuando exista; si es una ficha independiente no forzar un Tema;
3. añadir la entrada al catálogo con las fechas reales, procedencia y destino único;
4. añadir/adaptar solo el contenido de esa experiencia y reutilizar el presentador paper-first si el documento lo pide;
5. validar fidelidad, enlaces, retorno y responsive; actualizar esta fuente cuando cambie el patrón y la SPEC del Tema cuando cambie su contenido.

El catálogo admite varias actividades de una semana sin añadir condiciones por ID al portal. El presentador recibe el contenido del documento; las soluciones no se incrustan en la navegación ni en el motor académico.

### 12.3 Trazabilidad de la primera ficha

Fuente aportada: `6_PS_ANS_Nutrición.pdf`, copia `6_PS_ANS_Nutrición(1).pdf`, cuatro páginas. SHA-256: `368164a4cc2fb1219ed7d1fe30e1a1c2b3a42f1e46da25aa4075286cf9fc6df0`. Texto extraído y cuatro páginas renderizadas revisados. No se publica una copia del PDF original.

| Páginas | Contenido escolar | Representación |
|---|---|---|
| 1–2 | El viaje de la nutrición e instrucción de cuaderno | Relato íntegro en cinco párrafos, lectura en voz alta y aviso paper-first visible antes de las actividades. |
| 2 | Diez V/F; corregir falsas | Primer bloque; mismas afirmaciones y orden, respuestas con correcciones breves tras intento. |
| 3–4 | Ocho preguntas con opciones A/B/C | Segundo bloque; mismas preguntas, opciones y orden; respuesta y explicación tras intento. |
| 4 | Ocho partes para conectar con cuatro sistemas | Tercer bloque; mismas partes y orden; correspondencias tras intento. |

Se corrigen erratas de transcripción/ortografía del enunciado/opciones (`estómaglo`, `os nutrientes`, `se ha ce`, `alveolos`), sin cambiar la respuesta esperada. Se conservan las simplificaciones del relato escolar; las explicaciones de apoyo distinguen el recorrido de las arterias al resto del cuerpo de una afirmación universal sobre oxigenación, y diferencian heces de orina. La afirmación sobre capilares está en las actividades, aunque no se desarrolla en el relato: la solución la identifica expresamente como aclaración de apoyo de Academia. No se mezcla ese apoyo con el texto que se escucha.

### 12.4 Validación y límites

`tests/plan-semanal-browser.cjs` conserva la cobertura inicial de semana Madrid, rangos inclusivos, archivo plegado, navegación en ambos recorridos, acceso directo, Persona Activa, lectura/voz y cero escrituras educativas para alumno/familiar/profesional. Añade la alineación real de las dos tarjetas y ausencia de desbordamiento en 6.º, respuestas incompletas, selecciones correctas/incorrectas en cada bloque, recuentos, petición de corrección escrita al elegir Falso, explicación sin calificar el texto libre, edición sin resultados desactualizados, reintentos y reinicio al recargar. Verifica los mismos 10 V/F, 8 A/B/C y 8 conexiones. SDK, identidades y voz simulados; no certifica cuentas reales o audio físico.

Responsive Chromium con Outfit/emoji cargados: 1440/768/390/320 px en el portal de curso y semanal; ficha también a 1024 px, sin desbordamientos con respuestas/correcciones/feedback visibles. Se revisan las tarjetas juntas en escritorio y móvil y el formulario. Se ajusta el salto de línea de las etiquetas existentes del encabezado en móvil para evitar desbordamiento en 6.º. No cambia contenido/banco/motor/evidencia de la Práctica/Prueba académica ni la pirámide aprobada. La regresión completa de Nutrición de #190 sigue como antecedente; este ajuste valida el recorrido actual hasta el Tema. Sintaxis/imports/rutas/diff revisados. La comprensión y utilidad con Gloria siguen pendientes de uso familiar.

### 12.5 Publicación inicial verificada · #190

Pages #800 (run `39473961170`) terminó `success` sobre `da8eb5fb6b1a750e17f47575ad5466b69b262a5d`. Portal de 6.º, portal semanal, catálogo, presentador de semanas, CSS, presentador de documentos, Tema Nutrición, ficha y contenido semanal servidos con HTTP 200 y coincidencia byte a byte con los nueve archivos de producto probados. El árbol remoto de #190 coincide exactamente con el árbol local validado; no incorpora cambios ajenos. Sin implementación ni publicación pendiente de este frente. Queda la revisión final familiar, especialmente claridad de lectura, trabajo en cuaderno y comprobación; no declarar estable.

## 13. Ajuste solicitado por el Product Owner · 20/10/2026

Tras revisar el producto publicado, el Product Owner solicita Plan Semanal al lado de Zonas y responder/validar dentro de Academia, en esta oportunidad sin guardar resultados. Esta instrucción directa actualiza la decisión anterior de solo revelar soluciones después del cuaderno; no requiere crear otro Tema o Prueba persistente. La indicación escolar de hacer primero el trabajo en papel permanece visible.

El contrato del documento declara el tipo de bloque (`verdadero-falso`, `opcion-multiple`, `relacionar`), las opciones y un índice `respuestaCorrecta` por pregunta. La respuesta mostrada se obtiene de esas mismas opciones: no se deduce la clave analizando textos de presentación ni se mantienen dos claves independientes.

- Todas las selecciones de un bloque deben estar completadas antes de corregirlo. Si falta alguna se informa y enfoca la primera pendiente, sin mostrar las soluciones.
- V/F: Verdadero o Falso seleccionables; al elegir Falso se solicita una corrección propia. Se valida la elección V/F; la corrección libre se compara con la explicación, sin fingir evaluación semántica ni exigir una redacción literal.
- A/B/C: se elige una de las mismas tres opciones por pregunta y se valida contra la clave escolar.
- Conectar: cada parte tiene un selector de los cuatro sistemas, con validación de la correspondencia.
- Tras comprobar se muestran acierto/revisión, respuesta y explicación. El recuento se denomina **elecciones correctas**, para no atribuir una calificación automática a las correcciones escritas.
- Editar una respuesta oculta su feedback y el recuento anterior; volver a comprobar recalcula el bloque. Reintentar borra las respuestas y el feedback de ese bloque. No modifica los otros bloques.
- Estado solo en los controles de la página; sin localStorage/Firestore de resultados, sesiones, Misiones o evidencias nuevas. El almacenamiento contextual de navegación existente se conserva.

Base del ajuste: `main` `0ed73bf8fd6e5a8f89de729cbdac623c07b3fd2c` (#191). Rama `fix/plan-semanal-respuestas`. PR #192 integrada en `20364da3df4ee5cf9ac5577c5df99b4265e1049c` dentro de la autorización de implementación/publicación del encargo. Pages #802 (run `39478081719`) `success`; seis archivos de producto modificados HTTP 200 e idénticos byte a byte al resultado probado: portal de 6.º, CSS del curso, presentador/CSS de la ficha y HTML/datos de la actividad. Árbol remoto de #192 idéntico al local validado. El cierre añade referencias `?v=2` al CSS del portal y al conjunto HTML → datos → presentador/CSS de la ficha, para evitar mezclar versiones en un navegador que vio la entrega anterior; no cambia comportamiento o claves. Sin desarrollo pendiente del ajuste; revisión familiar del resultado pendiente, sin declarar estabilidad.

### 13.1 Limpieza de accesos duplicados · revisión visual

Observación directa del Product Owner sobre el adjunto del 20/10/2026: los tres acordeones inferiores repiten las carpetas superiores y no son necesarios. Se reutilizan esos cuatro controles superiores como selectores de sección; los tres bloques dejan de ser acordeones y cada actividad aparece directamente al elegir su carpeta. Inicialmente se muestra Lectura; un fragmento válido (`#bloque-vf`, `#bloque-abc`, `#bloque-conectar`) permite abrir directamente esa actividad. Solo hay una sección visible y el control activo se identifica visualmente y mediante `aria-pressed`/`aria-controls`.

Cambiar de carpeta conserva selecciones, correcciones y feedback en memoria, sin guardar resultados. El cambio usa `replaceState` para no añadir pasos al recorrido de Volver. Ocultar la lectura detiene su audio. Contenido, claves, validación, reintentos y navegación curricular se conservan; referencias `?v=3` mantienen coherentes HTML, contenido, presentador y CSS frente a caché anterior.

Base `main` `7cb4139c065bc6cfd4380d86017a14f2093406d9`; rama `fix/plan-semanal-atajos`. La prueba de navegador se adapta para recorrer las cuatro carpetas, verificar una sección visible, ausencia de acordeones duplicados y conservación de respuestas al volver a una actividad, además de las validaciones de formularios, retorno, responsive y cero escrituras anteriores. SDK/identidad/voz simulados; revisión familiar del ajuste pendiente. Este ajuste de presentación no declara estabilidad del material.

## DECISIÓN

**AJUSTE DIRECTO DEL PRODUCT OWNER PUBLICADO · REVISIÓN FAMILIAR PENDIENTE.**

`Plan Semanal` será un espacio transversal y selectivo de 6.º. El Product Owner elegirá los documentos importantes mediante una instrucción mínima; Academia resolverá su clasificación e integración. La semana organiza el acceso, mientras que la materia y el Tema conservan la propiedad curricular cuando corresponda.

Primera aplicación aprobada: `6_PS_ANS_Nutrición.pdf`, semana escolar **19–26 de octubre de 2026**, conectado con el Tema existente `Science → Nutrición` y con experiencia **paper-first + comprobación posterior**.
