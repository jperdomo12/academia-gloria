# English 6.º · Preparación de pruebas · noviembre de 2026
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| Ruta oficial | docs/specifications/SPEC-ENGLISH_6TO_PREPARACION_PRUEBAS_NOV2026.md |
| Versión | 1.4 |
| Estado | Publicada para validación familiar · lámina Body Parts implementada en rama, pendiente de aprobación e integración |
| Fecha | 15/11/2026 |
| Decisión | Product Owner aprueba preparación del 17/11, refuerzo *have/has* y, el 15/11, una lámina visual original «Body Parts · Picture» como opción de presentación en el selector «Elige un grupo»; Listening/Writing del 23/11 permanece posterior. |

## Historial de versiones

| Versión | Fecha | Cambios |
|---|---|---|
| 1.4 | 15/11/2026 | Candidata técnica: lámina SVG original de 16 partes, ampliación y alternativa textual. Conserva el banco y el reto. Pendiente de aprobación y publicación. |
| 1.3 | 15/11/2026 | Aprobada mejora funcional «Body Parts · Picture» dentro de Vocabulary: lámina original del cuerpo, etiquetas inglesas tomadas del banco existente, acceso desde «Elige un grupo» sin crear nuevo grupo de datos, reutilizando reto/audio. Únicamente documentada; implementación y validación quedan pendientes en ACADEMIA-DESA. |
| 1.2 | 12/11/2026 | Refuerzo solicitado de *have/has* en presente como verbo principal («tener»), con ocho ejemplos y ocho ejercicios, añadido a Grammar sin nuevo Tema ni cambios en la persistencia. Siete tests de contrato comprobados en V8 con el código de la rama; validación de navegador/cuenta familiar pendiente. |
| 1.1 | 11/11/2026 | PR #248 integrada en main (merge 1bd319124facb1b862903ee88f790f724b844700); Pages #43034008253 completado con éxito; prueba familiar y navegador real pendientes. |
| 1.0 | 11/11/2026 | Aprobación del alcance y primera implementación. |

## 🧭 Resumen de contenido

| Punto | Contenido |
|---|---|
| 1. Fuentes y fidelidad | Correspondencia con las fichas de Gaudem y límites de cobertura. |
| 2. Ubicación | Acceso temporal desde English 6.º. |
| 3. Experiencia | Vocabulary, Grammar, Reading, Practico y nueva lámina Body Parts aprobada. |
| 4. Arquitectura y contratos | Reutilización del banco, lector, navegación y ausencia de nuevas persistencias. |
| 5. Etapa siguiente | Listening y Writing del 23 de noviembre. |
| 6. Criterios de aceptación | Estado de lo implementado y controles pendientes de la mejora. |
| 7. Estado de implementación | Evidencia de integración previa y alcance aún no publicado. |

## 1. Fuentes y fidelidad

Fuente escolar principal: **Inglés .pdf**, 11 páginas de fichas escaneadas de Gaudem aportadas por la familia (Taller de inglés / English Important Book / Inglés ACS según sección). El distintivo **ACS** aparece en las páginas 10 y 11; no implica por sí solo que cada apartado haya sido individualizado específicamente para Gloria. No se publica el PDF ni sus anotaciones.

Temario comunicado por Pilar:
- **17/11/2026:** Reading (Halloween, partes del cuerpo, contenidos de cursos anteriores) y Grammar (Present Simple, *to be*, *have*, *much*, *many*, *a lot of*; **Present Continuous** aclarado por Pilar el 12/11).
- **23/11/2026:** Listening y Writing.

Este PDF es una **referencia parcial** del temario, no el modelo de examen.

| Páginas PDF | Referencia de Gaudem | Cobertura de Academia |
|---|---|---|
| 1–3 | Body Parts, equivalentes español/inglés y anotaciones manuscritas complementarias | Grupo Body Parts, reconocimiento de palabras y escucha |
| 4 | Lámina de vocabulario corporal ilustrado | Términos complementarios y símbolos propios; no copia de imágenes |
| 5 | Halloween Vocabulary, veinte conceptos ilustrados | Veinte conceptos, apoyo visual y lectura original sobre Halloween |
| 6–7 | Colors, Numbers 1–30, decenas 40–100 y regla de formación 20–99 | Grupos Colours y Numbers, tarjetas y práctica original |
| 8 | School vocabulary: objetos, materiales y aula | Grupo School Objects |
| 9 | School vocabulary: lugares, personas y materiales | School Objects y People & Places |
| 10 | Pronombres personales y afirmativo del verbo *to be* | Explicación, ejemplos y retos |
| 11 | Negativo, preguntas y respuestas cortas de *to be* | Explicación, ejemplos y retos |

Algunas formas se escriben con el inglés escolar habitual (por ejemplo, *coloured pencils*). No inferir que cada palabra de las páginas 8–9 será evaluada.

**Faltante en la fuente:** no aparece una ficha específica de *have* ni el formato exacto de Reading, Listening o Writing. Por decisión familiar se añade un **apoyo original de Academia** para el presente de *have/has* en oraciones afirmativas («tener»); esta elección pedagógica no confirma el alcance exacto del examen escolar. No se enseñan aquí *have got*, negativas, interrogativas ni *has* como auxiliar de Present Perfect. La preparación de Present Simple/Continuous y cuantificadores reutiliza los dos Temas de English ya publicados. No duplicarlos.

## 2. Ubicación

6.º → English → sección destacada **Me preparo para English** → Reading & Grammar del 17 de noviembre.

Ruta del refuerzo: cursos/6to/english/preparacion-noviembre/.

Se mantiene **fuera del catálogo de Temas permanentes** porque es un recurso temporal por evaluación; no se modifica temas-english.js. Se enlaza desde el portal de English.

## 3. Experiencia

1. **Mi mapa:** recorrido recomendado y enlaces a Present Simple vs Present Continuous y Much / Many – A lot of.
2. **Vocabulary:** seis grupos (Body Parts, Halloween, Colours, Numbers, School Objects, School People & Places). Tarjetas paginadas y escucha con el lector existente.
3. **Grammar:** bloque ya existente de *to be* (pronombres, afirmativo, negativo y preguntas/respuestas cortas), más bloque diferenciado de *have/has* en presente. En *have/has* se agrupan I/you/we/they → have y he/she/it → has, con ocho frases traducidas y audio. *Have/has* es verbo principal de posesión, no adjetivo ni auxiliar.
4. **Reading:** tres relatos originales de Academia (Halloween at school, A healthy school day, The new classroom), cada uno con cuatro preguntas de comprensión.
5. **Practico:** retos Vocabulary (8), *To be* (8), **Have/Has (8)** y Reading + Grammar (12: cuatro preguntas de lectura, cinco de *to be*, tres de vocabulario); Reading desde el texto seleccionado. No se modifica el ensayo mixto preexistente ni se presenta como simulacro oficial.

**Regla pedagógica:** Miro o escucho → Comprendo → Elijo → Compruebo. Una pregunta principal por paso, sin cronómetro ni premios por rapidez, pistas voluntarias y feedback conceptual tras acertar. Reintentos sin penalización y lectura de textos en voz alta.

### 3.1. Mejora aprobada · Body Parts · Picture (candidata de implementación)

**Necesidad real:** reforzar visualmente la localización y asociación de partes del cuerpo de cara al Reading del 17/11. El vocabulario de **Body Parts** (31 entradas con traducción, emojis y audio) ya existe; **no** existe en el recurso actual una lámina anatómica completa con etiquetas.

**Ubicación acordada:** `6.º → English → Me preparo para English → Vocabulary → Elige un grupo → Body Parts · Picture`. El nombre de interfaz **Body Parts · Picture** es preferible a `Body Parts in Draw`, porque es inglés natural y mantiene diferenciada la modalidad ilustrada.

**Comportamiento aprobado:**
1. Mantener el selector actual y sus **seis grupos académicos**. Añadir `Body Parts · Picture` como **opción de visualización** asociada al grupo existente `Body Parts` (ID `body`), **no** como séptimo grupo de contenido ni como duplicación de las 31 entradas.
2. Al seleccionarla, mostrar **una lámina original de Academia**, de cuerpo humano completo con señales/flechas y etiquetas **en inglés** correspondientes al banco real. Priorizar aproximadamente 14–18 partes claramente ubicables y legibles: `head`, `eye/eyes`, `ear`, `nose`, `mouth`, `hair`, `shoulder`, `arm`, `elbow`, `hand`, `finger`, `chest`, `leg`, `knee/knees`, `foot/feet`, `toe`; puede ajustarse la distribución visual para claridad sin prometer representar todas las 31 entradas.
3. Conservar las restantes palabras en las tarjetas `Body Parts`, sin excluirlas de los ejercicios. El texto **«Las 31 palabras están en Body Parts»** y un acceso claro **«Ver tarjetas de Body Parts»** permiten alternar sin perder el contexto.
4. El botón de práctica, si se mantiene visible en modo dibujo, debe iniciar **el reto existente de Body Parts** y nunca enviar un identificador de vista ficticio al motor de preguntas. No alterar la selección, el número de preguntas (8) ni las estadísticas existentes.
5. **Opción A: lámina estática**, no mapa interactivo ni reto «señala y escucha». Los botones de audio existentes permanecen en las tarjetas; si se añade audio desde el dibujo, debe reutilizar el lector compartido, sin diseñar otro sistema.
6. El dibujo será **elaboración visual original de Academia**, nunca copia de una ficha ilustrada, foto ni imagen web con derechos no comprobados. Guardar trazabilidad del banco escolar y distinguir el enriquecimiento de Academia de la fuente de Gaudem.
7. Accesibilidad: etiquetas claramente legibles en ordenador y móvil; sin superposición de flechas, opción de ampliar/visualizar cómodamente en pantalla pequeña, equivalente textual de las partes ilustradas, contraste y foco/teclado adecuados. No depender solo del dibujo para aprender vocabulario. Diseño respetuoso con la edad y sin apariencia infantilizante.
8. Reutilizar `preparacion-data.js`, `preparacion.js`, `preparacion.css` y la experiencia actual; no crear colección, registro, Tema permanente ni nueva página de curso. El modo dibujo es una presentación del recurso existente.

**Fuera de alcance:** añadir ejercicios nuevos, representar las 31 palabras en una sola ilustración, interactividad por regiones del cuerpo, identificación de imágenes mediante IA, rediseñar todo Vocabulary o sustituir las tarjetas actuales.

**Validación familiar pendiente:** verificación visual en escritorio y móvil, legibilidad de etiquetas, entrada/retorno por «Elige un grupo», acceso a 31 tarjetas y reto de 8 preguntas sin regresiones de los otros grupos. No declarar esta mejora publicada ni estable hasta su integración, verificación en Pages y prueba real.

## 4. Arquitectura y contratos

- Banco escolar y ejercicios: cursos/6to/english/preparacion-noviembre/preparacion-data.js.
- Experiencia: index.html, preparacion.js y preparacion.css en el mismo directorio.
- Acceso: cursos/6to/english/index.html con tarjeta propia; estilos en english-portal.css.
- Reutiliza auth, ContextoUsuario, navegación global y compartido/js/lector-texto.js.
- Sin nuevas colecciones ni escrituras Firestore, sin nota académica persistente. El resultado del refuerzo es formativo. Los Temas existentes conservan su propia evidencia oficial.
- En la mejora visual aprobada, usar un **modo de presentación** para el mismo ID `body`; no modificar `DATA.groups` para introducir un séptimo grupo ni duplicar palabras. La lámina es un recurso visual estático original, separado del motor de ejercicios.

## 5. Etapa siguiente · 23 de noviembre

Reutilizar vocabulario, lectura y gramática como base para Listening y Writing. La preparación específica de escucha y producción escrita **no forma parte de esta primera implementación**, porque las once páginas recibidas no contienen muestras del formato evaluado. Ampliar cuando el colegio confirme ese formato o llegue material concreto, sin recrear un motor de voz.

## 6. Criterios de aceptación

- [x] Seis grupos completos y cobertura trazable a páginas 1–9.
- [x] *To be*: pronombres, afirmación, negación, preguntas y respuestas cortas.
- [x] *Have/has* en presente afirmativo: ocho ejemplos, ocho ejercicios por pronombres, pistas específicas y escucha en inglés, diferenciados de la fuente escolar.
- [x] Tres textos originales, con preguntas que exijan leer el contexto.
- [x] Vínculos a los Temas existentes de Present Simple y cuantificadores.
- [x] Voz inglesa, pistas, reintentos, foco de teclado y responsive **incorporados en código**; prueba con navegador/dispositivo real pendiente.
- [x] No publicar escaneos ni notas de evaluación.
- [x] Revisión estática del banco y rutas: 148 términos, 18 preguntas de *to be*, 8 de *have/has* con clave correcta, 3 lecturas × 4 preguntas, 47 IDs DOM sin duplicados y 0 selectores referenciados inexistentes. Siete pruebas de aserción del archivo `.test.mjs` ejecutadas en V8 con los archivos reales de la rama (no equivale a ejecución Node). Los recorridos de 8/8/12 preguntas se verificaron con el motor real en V8; uso en navegador autenticado pendiente.
- [x] GitHub Pages completado con éxito para el recurso previo; [ ] uso familiar posterior con Gloria y navegación real, aún pendientes.
- [ ] **Pendiente DESA (15/11):** opción «Body Parts · Picture» desde selector existente, lámina original con 14–18 etiquetas claramente localizables y alternativa textual, funcional en móvil y escritorio.
- [ ] **Pendiente DESA:** alternar dibujo/tarjetas manteniendo 31 entradas y audio, reto existente de 8 preguntas, exactamente seis grupos académicos y sin nuevas escrituras/evidencias; comprobar regresiones.

## 7. Estado de implementación

Implementación integrada en main mediante [PR #248](https://github.com/jperdomo12/academia-gloria/pull/248), merge 1bd319124facb1b862903ee88f790f724b844700. Despliegue GitHub Pages [#43034008253](https://github.com/jperdomo12/academia-gloria/actions/runs/43034008253) finalizado con éxito. URL: https://jperdomo12.github.io/academia-gloria/cursos/6to/english/preparacion-noviembre/. No se ha ejecutado una prueba real completa de uso con navegador/cuenta de Gloria; tampoco se ha comprobado la lectura en voz alta en su dispositivo. La validación familiar es necesaria antes de declarar estabilidad. Listening/Writing de 23/11 sigue pendiente de material/formato; *have/has* básico ya tiene un refuerzo de Academia, sin asumir que el colegio requiere otras formas verbales. **Mejora aprobada del 15/11 · Body Parts · Picture:** solo diseño funcional, sin ilustración ni código integrado todavía; corresponde a ACADEMIA-DESA y requiere validación de legibilidad y funcionamiento real.

### Validación de Body Parts · Picture

Candidata `feat/body-parts-picture` desde #255. SVG original de Academia, con 16 etiquetas resueltas desde el banco de Body Parts y lista bilingüe como alternativa textual. Ampliación con desplazamiento accesible al teclado. La opción del selector mantiene `body` como grupo y conserva la página de tarjetas al alternar. Sin cambios al banco de 31 entradas, al lector, al reto de ocho preguntas ni a la persistencia.

Siete pruebas de contrato y prueba Chromium de la vista, etiquetas, tarjetas/audio, ampliación/teclado, reto y otros cinco grupos, sin escrituras, 320/390/768/1280/1440 px. Revisión de la lámina renderizada con Outfit. Identidad, Firebase y voz controlados; pendientes aprobación de PR, publicación y prueba familiar real.
