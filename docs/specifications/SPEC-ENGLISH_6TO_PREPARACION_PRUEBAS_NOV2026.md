# English 6.º · Preparación de pruebas · noviembre de 2026
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| Ruta oficial | docs/specifications/SPEC-ENGLISH_6TO_PREPARACION_PRUEBAS_NOV2026.md |
| Versión | 1.0 |
| Estado | Aprobada y en desarrollo; publicación y validación familiar pendientes |
| Fecha | 11/11/2026 |
| Decisión | Product Owner aprueba incorporación de la fuente escolar, priorizando el 17 de noviembre y reservando Listening/Writing del 23 como segunda etapa. |

## 1. Fuentes y fidelidad

Fuente escolar principal: **Inglés .pdf**, 11 páginas de fichas escaneadas de Gaudem aportadas por la familia (Taller de inglés / English Important Book / Inglés ACS según sección). El distintivo **ACS** aparece en las páginas 10 y 11; no implica por sí solo que cada apartado haya sido individualizado específicamente para Gloria. No se publica el PDF ni sus anotaciones.

Temario comunicado por Pilar:
- **17/11/2026:** Reading (Halloween, partes del cuerpo, contenidos de cursos anteriores) y Grammar (Present Simple, *to be*, *have*, *much*, *many*, *a lot of*).
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

**Faltante en la fuente:** no aparece una ficha específica de *have* ni el formato exacto de Reading, Listening o Writing. La preparación de Present Simple y cuantificadores reutiliza los dos Temas de English ya publicados. No duplicarlos.

## 2. Ubicación

6.º → English → sección destacada **Me preparo para English** → Reading & Grammar del 17 de noviembre.

Ruta del refuerzo: cursos/6to/english/preparacion-noviembre/.

Se mantiene **fuera del catálogo de Temas permanentes** porque es un recurso temporal por evaluación; no se modifica temas-english.js. Se enlaza desde el portal de English.

## 3. Experiencia

1. **Mi mapa:** recorrido recomendado y enlaces a Present Simple vs Present Continuous y Much / Many – A lot of.
2. **Vocabulary:** seis grupos (Body Parts, Halloween, Colours, Numbers, School Objects, School People & Places). Tarjetas paginadas y escucha con el lector existente.
3. **To be:** pronombres, affirmative, negative y questions/short answers; ejemplos y audio.
4. **Reading:** tres relatos originales de Academia (Halloween at school, A healthy school day, The new classroom), cada uno con cuatro preguntas de comprensión.
5. **Practico:** mini reto Vocabulary (8), Grammar (8) y Reading + Grammar (12: cuatro preguntas de lectura, cinco de gramática, tres de vocabulario). Reto de lectura desde el texto seleccionado.

**Regla pedagógica:** Miro o escucho → Comprendo → Elijo → Compruebo. Una pregunta principal por paso, sin cronómetro ni premios por rapidez, pistas voluntarias y feedback conceptual tras acertar. Reintentos sin penalización y lectura de textos en voz alta.

## 4. Arquitectura y contratos

- Banco escolar y ejercicios: cursos/6to/english/preparacion-noviembre/preparacion-data.js.
- Experiencia: index.html, preparacion.js y preparacion.css en el mismo directorio.
- Acceso: cursos/6to/english/index.html con tarjeta propia; estilos en english-portal.css.
- Reutiliza auth, ContextoUsuario, navegación global y compartido/js/lector-texto.js.
- Sin nuevas colecciones ni escrituras Firestore, sin nota académica persistente. El resultado del refuerzo es formativo. Los Temas existentes conservan su propia evidencia oficial.

## 5. Etapa siguiente · 23 de noviembre

Reutilizar vocabulario, lectura y gramática como base para Listening y Writing. La preparación específica de escucha y producción escrita **no forma parte de esta primera implementación**, porque las once páginas recibidas no contienen muestras del formato evaluado. Ampliar cuando el colegio confirme ese formato o llegue material concreto, sin recrear un motor de voz.

## 6. Criterios de aceptación

- [ ] Seis grupos completos y cobertura trazable a páginas 1–9.
- [ ] *To be*: pronombres, afirmación, negación, preguntas y respuestas cortas.
- [ ] Tres textos originales, con preguntas que exijan leer el contexto.
- [ ] Vínculos a los Temas existentes de Present Simple y cuantificadores.
- [ ] Voz inglesa, pistas, reintentos y foco de teclado; responsive.
- [ ] No publicar escaneos ni notas de evaluación.
- [ ] Pruebas del banco, preguntas y rutas de navegación.
- [ ] Publicación GitHub Pages verificada y uso familiar posterior con Gloria.

## 7. Estado de implementación

Trabajo iniciado en rama feat/english-preparacion-pruebas-noviembre-2026. Completar PR, despliegue y límites de validación al finalizar.
