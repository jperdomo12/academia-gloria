# Matemáticas 6.º · Preparación de problemas · noviembre 2026
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| Ruta | docs/specifications/SPEC-MATEMATICAS_6TO_PREPARACION_PROBLEMAS_NOV2026.md |
| Propietario | Contenido curricular Matemáticas · 6.º |
| Responsables | Product Owner + AI Collaborator |
| Ámbito | Refuerzo temporal de interpretación y resolución de problemas de Matemáticas de 6.º |
| Versión | 1.4 |
| Estado | Ampliación Paso 3 implementada y validada en rama · pendiente aprobación de PR · no integrada ni publicada |
| Fecha | 17/11/2026 |
| Origen | Ficha escolar de cinco problemas y ampliación formativa aprobada por el Product Owner; examen confirmado el 26/11/2026 |

## Documentos relacionados

- Fuente escolar específica: Matemáticas.pdf, ficha Gaudem «Matemáticas · Problemas», una página y cinco ejercicios aportados por la familia.
- Referencia metodológica: Problemas .pdf, quince fotografías de páginas dobles del libro facilitado por Pilar; **no se reproduce el libro**.
- Fechas y temario inicialmente comunicados por Pilar: 19/11 y numeración hasta 999.999 (referencia histórica superada). **Corrección confirmada el 12/11: prueba de Matemáticas el 26/11/2026; numeración hasta 99.999.** Incluye anterior/posterior, nombre de números, redondeo, cálculo y problemas; esta SPEC cubre solo el refuerzo de problemas.
- docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md
- docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md
- docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md

## Historial

| Versión | Fecha | Responsables | Cambios |
|---|---|---|---|
| 1.4 | 17/11/2026 | Product Owner + AI Collaborator | Implementación candidata del contrato v1.3: 20 originales, cuatro bloques sin repetición, progreso por problema completo y pausa/reanudación en memoria; relación más/menos y total/restante, unidad de libros y fecha 26/11. Nueve pruebas Node y navegador real superados; Gaudem y calentamiento conservados. Pendiente aprobación de PR; sin merge/Pages ni estabilidad familiar. |
| 1.3 | 17/11/2026 | Product Owner + AI Collaborator | Prioridad pedagógica familiar: **comprensión y razonamiento matemático transversal** mediante práctica variada y ayudas voluntarias. En 20 problemas de 4 bloques se mantienen 2 comparaciones «menos que» cuyo final es suma, y se incorporan 2 «más que»: una pide el total y otra pide el dinero restante (**operación final resta**). Motor, preguntas, diagramas y pruebas deben distinguir relación y pregunta final; se preservan cinco Gaudem, contenido anterior y calidad. Solo documentación; pendiente DESA. |
| 1.2 | 17/11/2026 | Product Owner + AI Collaborator | Product Owner aprueba subir de 10 a 20 los problemas originales del Paso 3, en cuatro bloques de cinco equilibrados (una familia por bloque), con contador global, selección sin repetición y calidad actual como mínimo. Se añaden contratos verificables, diez propuestas de enunciados originales y corrección de fecha del examen a 26/11. **Solo documentación; aún no implementado.** |
| 1.1 | 11/11/2026 | Product Owner + AI Collaborator | PR #245: experiencia y banco de problemas; PR #246: visualización de doble y comparaciones. Pages #43028910917 y #43029670985 completados con éxito. Validación familiar pendiente. |
| 1.0 | 11/11/2026 | Product Owner + AI Collaborator | Especificación aprobada y desarrollo inicial en rama. |

## 🧭 Resumen de contenido

| Punto | Contenido |
|---|---|
| 1. Decisión y ubicación | Ruta y alcance del recurso temporal. |
| 2. Metodología | Comprender antes de operar, ayudas, audio y reintentos. |
| 3. Recorridos | Comprensión, cinco problemas de Gaudem y veinte originales en cuatro bloques. |
| 4. Arquitectura y contratos | Banco, motor, selección sin repetición y estado temporal del progreso. |
| 5. Experiencia y accesibilidad | Contadores, pausas, apoyos visuales y uso en móvil/escritorio. |
| 6. Fuera de alcance | Límites de la ampliación y temario independiente. |
| 7. Criterios de aceptación | Barrera explícita de calidad pedagógica, funcional y técnica. |
| 8. Estado | Diferencia entre lo publicado y lo aprobado pendiente de DESA. |

## 1. Decisión y ubicación

Ruta: 6.º de Primaria → Matemáticas → Me puede ayudar / Estrategias para problemas → Me preparo para los problemas.

Implementación: cursos/6to/mates/preparacion-problemas/.

Accesos: tarjeta propia en cursos/6to/mates/index.html y enlace desde cursos/6to/mates/piloto-problemas.html («Entender antes de calcular»).

No se modifica el motor original de «Entender antes de calcular» ni el de «Problemas y operaciones · Nivel A»; no se crea un nuevo Tema permanente paralelo. Potencias no forma parte de este refuerzo.

## 2. Metodología

**Comprendo → Relaciono → Calculo → Compruebo.**

Se comienza con una interpretación explícita del enunciado, sin efectuar cálculos. Después se identifica la operación, se resuelve y se verifica la respuesta. En comparaciones de precio hay dos cálculos: precio desconocido y respuesta final, que puede ser el total de ambos artículos o el dinero restante tras comprar únicamente el segundo. En repartos se comprueban cociente y resto.

No se premia la rapidez, no se utiliza cronómetro, existen pistas voluntarias y reintentos sin penalización. El material responde a observaciones familiares de respuestas precipitadas y dificultades posibles con relaciones «más/menos que». No permite establecer diagnósticos.

### 2.1. Prioridad familiar · comprensión y razonamiento matemático transversal

**Observación familiar del 17/11:** Gloria ha tenido dificultades para distinguir la **relación entre datos** de la **respuesta final solicitada**. En problemas como «B cuesta 2 € menos que A», ha tendido a elegir la resta por la palabra «menos», sin resolver siempre el gasto total. La familia confirma que **también necesita practicar el sentido contrario, «más que»**, incluso cuando la **operación final es una resta**, y que la prioridad verdadera es el **razonamiento en todas las familias de problemas**. Ha avanzado y necesita práctica variada y gradual. Es una observación educativa familiar, no diagnóstico ni confirmación del contenido exacto del examen.

**Ejemplos didácticos, fuera del banco de 20:** Si A cuesta 10 € y B cuesta **2 € menos**, B = 8 € y, si preguntan cuánto cuestan **juntos**, total = **18 €**. Si B cuesta **2 € más**, B = 12 € y, si preguntan cuánto cuestan **juntos**, total = **22 €**. Pero si se dispone de 20 € y se compra **solo B** (12 €), el dinero que **queda** es **8 €**: la palabra «más» describe la relación inicial, y la **operación final es restar**. No enseñar la regla automática «si veo más, sumo» o «si veo menos, resto»: primero comprender qué se busca.

**Aplicación transversal a los cinco tipos:** Antes de operar, Gloria debe distinguir los datos relevantes, la relación entre cantidades, la pregunta completa, las operaciones intermedias y el resultado final con su unidad. Conservar las fases existentes **Comprendo → Relaciono → Calculo → Compruebo** y los apoyos no punitivos. Cada familia verifica una relación distinta:

- **Doble:** identificar la cantidad de referencia y distinguir el doble de añadir dos.
- **Suma:** reconocer todas las cantidades que componen el total solicitado.
- **Reparto con resto:** reconocer total, número de grupos, cociente por grupo y sobrante.
- **Grupos iguales:** distinguir cantidad de grupos de elementos por grupo.
- **Comparación «menos/más que»:** descubrir primero el valor desconocido y **después responder la pregunta real**: sumar ambos precios cuando piden el total, o restar al presupuesto el precio del artículo comprado cuando preguntan cuánto queda. No confundir diferencia/incremento con precio final ni resultado intermedio con respuesta solicitada.

**Distribución en Paso 3 sin aumentar volumen:** cuatro problemas de comparación a lo largo de los cuatro bloques, **dos «menos que»** (`e5a` y `e5b`, ya existentes, segundo precio mediante resta y **suma final** del total) y **dos «más que»** (`e5c`: segundo precio mediante suma y **suma final** del total; `e5d`: segundo precio mediante suma y **resta final** del presupuesto restante). Exactamente **una comparación por bloque**, con ambas preguntas finales representadas. El problema escolar `g5` del Paso 2 conserva su enunciado original «menos que» intacto. No es un quinto tipo de problema ni incrementa las 20 variantes.

**Calidad pedagógica:** mantener formulaciones naturales y suficientemente diversas para evitar aprendizaje mecánico de plantillas. Adaptar la formulación a la comprensión lingüística: instrucciones breves y sin ambigüedad, una idea importante por pregunta, lectura y relectura disponibles, apoyo visual que represente relaciones sin revelar resultados, y pistas opcionales que ayuden a identificar «qué sé / qué me preguntan / qué necesito calcular primero». Animar a verbalizar su estrategia, sin obligarla a respuestas orales ni penalizar errores o apoyos. Reducir dependencia de pistas mediante elección voluntaria, **sin ocultarlas ni retirarlas forzosamente**. Priorizar comprensión y transferencia sobre volumen o velocidad.

## 3. Recorridos

### 3.1 Comprendo la historia
Cuatro microactividades sin operaciones: diferencia frente a precio completo; comparación «menos que»; «el doble»; resultado intermedio frente a respuesta final.

### 3.2 Mi ficha de Gaudem
Cinco problemas con enunciados, orden y cantidades de la hoja:
1. Isa y Diana: el doble de 159 € → 318 €.
2. Compras de Mónica: 15 + 12 + 28 → 55 €.
3. 1.445 sillas entre cuatro bodas → 361 por boda y 1 sobrante.
4. 15 cajas de 18 kg → 270 kg.
5. Mesa 246 €, nevera 100 € menos → precio nevera 146 €, gasto total 392 €.

El PDF completo no se publica y este contenido no se identifica como modelo oficial del examen.

### 3.3 Compruebo que puedo
**Estado todavía publicado (antes de integrar esta candidata):** diez problemas originales de Academia, dos variantes de cada familia (doble, suma, reparto con resto, multiplicación de grupos y comparación aditiva con suma final). Cada ensayo elige al azar una por familia, sin memoria de qué variantes han salido antes.

**Decisión funcional aprobada el 17/11:** ampliar a **20 problemas originales, cuatro por cada una de las cinco familias**, distribuidos en **cuatro bloques de cinco**, uno por familia y sin repetición hasta completar una vuelta. Esta decisión está **implementada en la rama candidata**, pendiente de revisión y aprobación de su PR antes de integrar o publicar.

### 3.3.1. Selección por bloques y progreso

- La entrada del Paso 3 presenta con claridad **«20 problemas · 4 bloques de 5»**, sin sugerir que deban realizarse todos de una vez.
- Una **vuelta** consiste en cuatro bloques. Al iniciarla, se crea un plan en memoria: se mezclan las cuatro variantes de cada familia y se distribuye una variante por familia en cada bloque. Se puede variar el orden de las cinco familias dentro de cada bloque, manteniendo equilibrio, variedad y ausencia de duplicados.
- **Un problema está completado solo al terminar todas sus fases**. La barra de progreso de cada bloque y el contador global no aumentan por iniciar un problema, acertar una pregunta intermedia ni pulsar una pista.
- Durante la ejecución mostrar **«Bloque 2 de 4»**, **«Problema 3 de 5»**, **«7 de 20 problemas completados»** (los números son ejemplo, no estado inicial) y mantener visible la fase pedagógica del problema que ya muestra el motor.
- Al cerrar un bloque, ofrecer **«Continuar con el bloque siguiente»** o **«Descansar / volver al inicio»**. En la **misma página abierta** debe poder reanudarse el siguiente bloque sin generar otro plan ni repetir variantes. No abrir cinco páginas ni añadir pantallas obligatorias de motivación.
- **Límite de estado:** el recorrido y el conteo se conservan únicamente durante la visita/página abierta; una recarga, cierre o nuevo acceso reinicia la vuelta. Indicarlo de forma clara cuando la familia elija detenerse. **No crear por defecto persistencia entre días**, nuevos historiales, notas o colecciones.
- Al completar 20, mostrar resumen claro de los cuatro bloques y opción **«Empezar otra vuelta»**. Solo entonces se autoriza un nuevo orden; no insinuar que se completaron problemas de Gaudem en el contador de 20.
- El Paso 2 «Mi ficha de Gaudem» mantiene sus **cinco problemas originales y su flujo**. El Paso 1 conserva las cuatro microactividades.

### 3.3.2. Diez variantes adicionales originales · diseño de contenidos

Las diez variantes vigentes (`e1a/e1b`, `e2a/e2b`, `e3a/e3b`, `e4a/e4b`, `e5a/e5b`) **se conservan**. La tabla siguiente constituye el **banco candidato de ampliación de Academia**, listo para DESA, que debe validar el contenido, los cálculos, la claridad de cada contexto y la compatibilidad de cada fase antes de publicarlo. No procede del documento escolar ni sustituye los cinco problemas de Gaudem.

| ID propuesto | Familia | Situación original | Datos y resultado correcto |
|---|---|---|---|
| `e1c` | doble | En una biblioteca hay 146 libros de aventuras y el doble de libros de ciencia. ¿Cuántos libros de ciencia hay? | 146 × 2 → **292 libros** |
| `e1d` | doble | Un libro cuesta 38 €. Un atlas cuesta el doble que el libro. ¿Cuánto cuesta el atlas? | 38 × 2 → **76 €** |
| `e2c` | suma | Para el huerto escolar compran semillas por 17 €, tierra por 29 € y una regadera por 26 €. ¿Cuánto gastan en total? | 17 + 29 + 26 → **72 €** |
| `e2d` | suma | Una clase paga 42 € por las entradas a un museo, 36 € por el transporte y 18 € por la merienda. ¿Cuánto paga en total? | 42 + 36 + 18 → **96 €** |
| `e3c` | reparto | El colegio tiene 1349 lápices y quiere repartirlos por igual entre 6 aulas. ¿Cuántos lápices recibe cada aula? ¿Cuántos sobran? | 1349 ÷ 6 → **224 por aula; sobran 5** |
| `e3d` | reparto | Hay 865 pegatinas que se reparten por igual entre 7 grupos. ¿Cuántas pegatinas recibe cada grupo? ¿Cuántas sobran? | 865 ÷ 7 → **123 por grupo; sobran 4** |
| `e4c` | grupos | En un teatro hay 18 filas con 23 asientos en cada una. ¿Cuántos asientos hay en total? | 18 × 23 → **414 asientos** |
| `e4d` | grupos | En el huerto han plantado 16 filas con 14 plantas en cada fila. ¿Cuántas plantas hay en total? | 16 × 14 → **224 plantas** |
| `e5c` | comparacion | Para equipar el aula de música compran un teclado de 350 € y una guitarra que cuesta 80 € más que el teclado. ¿Cuánto cuestan los dos instrumentos juntos? | 350 € y 80 € más → **guitarra 430 €; total 780 €** |
| `e5d` | comparacion | Una mochila cuesta 86 €. Una maleta cuesta 37 € más que la mochila. Sara tiene 200 € y compra solamente la maleta. ¿Cuánto dinero le queda? | 86 + 37 = **123 €** (maleta); 200 − 123 = **77 €** (restante) |

**Precisión de calidad obligatoria:** los nuevos problemas introducen contextos y unidades variados (por ejemplo, libros), sin cambiar las **cinco familias matemáticas** ni incorporar más de veinte problemas. En la familia `doble`, las fases actuales preguntan literalmente por **«precio doble, en euros»**. DESA deberá hacer que la pregunta, la unidad y la explicación se adapten al `p.unidad` de forma **retrocompatible** con las variantes en euros, en vez de mostrar una pregunta incorrecta para libros. En `reparto`, validar que el resto es no nulo y menor que el divisor; en `comparacion`, comprobar precio segundo positivo, identificar la **respuesta intermedia** y validar si la pregunta final pide **suma del total o resta del restante**. En `e5d`, Sara compra **solo la maleta**, no ambos artículos; nunca descontar la mochila también. En grupos y sumas, confirmar que las magnitudes y la respuesta corresponden al enunciado.

**Contrato de datos:** conservar los campos vigentes de `problemas.json` (`id,tipo,titulo,enunciado,a,b,valores,unidad` según tipo), sin datos personales ni motores paralelos. **Ampliación mínima aprobada del contrato:** para el tipo `comparacion`, admitir opcionalmente `relacion: "mas"` en las dos nuevas entradas `e5c` y `e5d`; las entradas anteriores, incluyendo las cinco escolares y `e5a/e5b`, no requieren cambios y por **retrocompatibilidad** la ausencia de `relacion` significa `"menos"`. Permitir además `preguntaFinal: "restante"` y `presupuesto: 200` **solo** en `e5d`; por defecto `preguntaFinal` ausente significa `"total"`. Verificar que `presupuesto` sea entero positivo y suficiente para la compra correspondiente, y que el enunciado identifique inequívocamente qué se compra. DESA puede adoptar estructura interna equivalente, documentada y probada, si evita duplicación.

**Cambio técnico imprescindible para «más que» y pregunta final variable (DESA):** el motor actual `fases(p)` calcula `otro=p.a-p.b`, asume siempre `total=p.a+otro` y redacta preguntas/pistas literalmente para «menos que» y dos artículos juntos. Adaptarlo de manera retrocompatible: calcular `otro=p.a+p.b` para `relacion === "mas"`, o `otro=p.a-p.b` para «menos». **Después elegir la respuesta final por el enunciado y contrato:** para `preguntaFinal === "restante"`, `p.presupuesto - otro` (se compra solo el segundo artículo); para `"total"`, `p.a + otro` (ambos). Reformular la **primera pregunta de interpretación**, plan de las dos operaciones, fase numérica intermedia y fase final para que sean coherentes con cada caso. Diferenciar «¿cuánto cuesta B?» de «¿cuánto cuestan juntos?» y «¿cuánto dinero queda?». No mostrar una suma final cuando la situación solicita un restante ni permitir que el valor intermedio se interprete como respuesta final.

**Diagrama:** `representarRelacion(p)` hoy modela únicamente `p.a-p.b` y etiqueta «− diferencia»; debe visualizar la relación `más` como precio inicial **más incremento** hasta el segundo precio, sin anticipar el valor desconocido antes de calcular. Para la pregunta final de presupuesto, representar opcionalmente el dinero disponible y lo gastado/restante **sin revelar anticipadamente el cálculo del restante** ni insinuar que se compraron ambos productos. Conservar la visualización «menos que» del Gaudem y las anteriores, proporciones significativas, etiquetas accesibles y lectura con/sin diagrama.

**No alterar los problemas escolares** (`g1…g5`), los 10 originales anteriores ni los cuatro de comprensión. La tabla define las diez situaciones añadidas y sus claves aritméticas; DESA debe contrastar sentido, redacción, pistas y compatibilidad con cada fase antes de publicarlas.

## 4. Arquitectura y contratos

- Banco de datos: cursos/6to/mates/preparacion-problemas/problemas.json.
- Vista y control: index.html, preparacion.js y preparacion.css en la misma carpeta.
- Autenticación y contexto: mecanismos actuales de auth y ContextoUsuario.
- Voz: lector compartido de Academia, sin nueva dependencia.
- Navegación: componentes globales existentes.
- Sin nuevas colecciones ni escrituras Firestore, sin notas ni registros de resultados. El objetivo es formativo; la evidencia académica sigue en los Temas que ya la registran.
- `problemas.json`: pasar `ensayos.length` de **10 a 20**, con **cuatro por familia**; mantener `gaudem.length===5` y `calentamiento.length===4`.
- `preparacion.js`: reemplazar selección aleatoria independiente por **plan de cuatro bloques sin repetición**; actualizar las verificaciones del banco, la unidad de `doble` cuando corresponda, el progreso y los cierres, y añadir soporte retrocompatible para **«más que» y «menos que»** y para preguntas finales de **total o restante** en comprensión, cálculo y diagramas. No alterar los demás tipos ni los cinco Gaudem.
- `index.html` y CSS actual: adaptar entrada del Paso 3, indicador de bloque y progreso global, y acciones continuar/descansar/resumir. Las barras de los Pasos 1 y 2 mantienen sentido y sus contratos.
- Corregir en producto y documentación visible el **19/11 → 26/11**, incluida la fecha de `problemas.json.meta.fecha`, cabecera y cualquier etiqueta afectada. No alterar de modo oportunista el contenido específico de numeración; se confirmó que el examen general incluye números **hasta 99.999**, no 999.999.
- Reutilizar `auth`, `ContextoUsuario`, `lector-texto.js`, estilos, accesibilidad, navegación contextual y pruebas del recurso actual.

## 5. Experiencia y accesibilidad

- Una pregunta principal por paso; selección o entrada numérica con etiquetas.
- Los bloques de cinco limitan la carga cognitiva; no convertir el Paso 3 en una sesión única de veinte. Mostrar dos niveles de progreso (bloque y vuelta), **etiquetados con texto** y semántica accesible, no solo con colores. En el resumen, distinguir problemas completados de intentos/pistas y no inferir dominio.
- Reposo voluntario entre bloques y retorno/reanudación mientras la página siga abierta; no penalizar descanso, errores ni pistas.
- Pistas solicitadas por Gloria, reintento, feedback conceptual y progreso visible.
- La solución numérica aparece solo después de superar comprensión y plan.
- Audio del enunciado y la pregunta a velocidad moderada.
- Teclado, foco, regiones de estado accesibles, responsive y preferencia de movimiento reducido.
- El resultado no equivale a calificación escolar ni diagnóstico.

### Apoyos visuales

Los dos focos de mayor dificultad identificados por la familia cuentan con representaciones visibles: en **comparación aditiva**, el precio inicial, la parte desconocida y la diferencia; para **doble**, un grupo y dos grupos iguales. No se muestra por adelantado el precio desconocido. Las barras de comparación son proporcionales a las cantidades conocidas; el modelo no representa sumas ni repartos mediante barras engañosas. Se mantiene voz y opción de lectura sin los diagramas.

## 6. Fuera de alcance

No incorporar el libro íntegro, la ficha como PDF público, nuevas unidades de numeración ni otros apartados del examen (numeración, redondeo y cálculo requieren sus recursos propios), analítica, notas, pruebas oficiales ni contenido avanzado no indicado. No hay persistencia entre visitas, nuevos motores, selector de tamaño 8/10 ni mezcla de problemas Gaudem en los bloques originales.

El resto de la prueba necesita los recursos de Matemáticas apropiados y contraste con material individualizado de Gloria.

## 7. Criterios de aceptación

- Cinco problemas escolares, mismo orden y mismos datos.
- Respuestas verificadas: 318, 55, 361 y resto 1, 270, 146 y total 392.
- Comprensión y planificación preceden al cálculo.
- Un resultado intermedio no sustituye la respuesta final.
- **Veinte variantes originales, cuatro por familia, cinco por bloque y cuatro bloques**. Los 10 ejercicios anteriores se conservan y las 10 nuevas variantes cumplen claridad, variedad y calidad iguales o superiores al nivel publicado.
- **Comprensión transversal comprobable:** en los cinco tipos debe estar clara la pregunta final antes de calcular, evitando resolver por palabras clave aisladas; identificar datos, relaciones, magnitudes, operaciones intermedias y respuesta definitiva.
- **Comparaciones variadas:** una por bloque; `e5a/e5b` con «menos que» y **suma final**, `e5c` con «más que» y **suma final**, `e5d` con «más que» y **resta final del presupuesto**. Casos mínimos: `A=10, diferencia=2` → **total 18** para «menos», **total 22** para «más», con segundos precios **8** y **12**; con **presupuesto 20 y compra solo B** (12), **restante 8**. Para `e5d`, 86+37=123 € y 200−123=**77 €**. No admitir diferencias/precios intermedios como respuesta final, ni sumar la mochila a la compra de maleta.
- **Regresión escolar:** `g5` sin `relacion` ni `preguntaFinal` sigue interpretándose como «menos» con total, mantiene `246−100=146` y `246+146=392` y conserva su representación visual. `e5a/e5b` conservan enunciados y resultados. En «más», validar textos, pistas, distractores, ayudas visuales, foco y ausencia de solución prematura; en `e5d`, no contabilizar la compra de un artículo que el enunciado no indica comprar.
- Prueba automatizada del contrato `4 calentamiento + 5 Gaudem + 20 originales`; unicidad de 20 IDs, exactamente cuatro por familia, cinco tipos representados en cada bloque, **cero repeticiones dentro de una vuelta** y dos vueltas consecutivas con renovación correcta.
- Validación aritmética de los 20 enunciados originales: dobles correctos; sumas de tres cantidades; división con cociente y **resto entre 1 y divisor−1**; multiplicación por grupos; comparación **«más» y «menos»** con segundo precio positivo y suma final. Verificar claves de respuesta con un cálculo independiente.
- Comprobar que ninguna pregunta, explicación, unidad, apoyo visual o pista contradiga la situación original; caso explícito de **doble de libros** frente a las variantes monetarias.
- Progreso **«Bloque X de 4 · Problema Y de 5 · Z de 20 completados»** coherente en todas las transiciones, errores, pistas, pausa/reanudación, fin de bloque, fin de vuelta y reinicio. No contabilizar fases intermedias como problemas resueltos.
- No cambiar enunciados, valores, orden escolar ni resultados de los cinco Gaudem; los cuatro microejercicios del Paso 1 siguen intactos.
- No modificar ni degradar el método `Comprendo → Relaciono → Calculo → Compruebo`, diagramas actuales de doble/comparación, retroalimentación, ayuda voluntaria, audio, reintentos, navegación o diseño adaptable.
- Comprobar móvil (320/390 px), escritorio (1280/1440 px), teclado, foco, lectura/escritor de pantalla, barra de progreso y estados de pausa/reanudación. No basta la verificación estática: prueba de navegador y posterior uso familiar reales.
- Fecha de examen **26/11/2026** visible y coherente en HTML, metadatos del banco y SPEC. Conservar explícitamente la corrección de temario numérico **hasta 99.999**.
- **Condición de calidad:** si alguna de las pruebas anteriores falla, la mejora **no se declara lista ni estable**, aunque el conteo alcance veinte; corregir primero. La aceptación técnica y la familiar son hitos separados.
- Pistas, reintentos y voz; sin cronómetro ni puntuación punitiva.
- Accesos correctos desde Matemáticas y Entender antes de calcular.
- Sin regresiones en recursos existentes.
- Documentar pruebas, publicación y validación familiar con Gloria.

## 8. Estado

**Estado publicado:** permanece la versión previa (#245/#246): cinco Gaudem, diez originales, selección aleatoria de cinco y rótulo 19/11. No se ha desplegado esta candidata.

**Estado de la ampliación:** implementada desde `main` `345f080` (PR documentales #258/#259), rama `feat/problemas-bloques`. Respeta el contrato funcional aprobado v1.3. Pendiente revisión/aprobación del Product Owner, integración mediante PR y posterior publicación/verificación de Pages. **No integrar ni publicar sin aprobación.** La prueba familiar con Gloria sigue pendiente; no se declara estable.

### 8.1. Implementación y trazabilidad

- Diez entradas nuevas exactamente según §3.3.2; `e5c.relacion="mas"`; `e5d` además `preguntaFinal="restante"`, `presupuesto=200`. Ausencia de campos conserva menos/total.
- `fases(p)` adapta las dos operaciones, preguntas, pistas y explicaciones; no confunde los 123 € de maleta con los 77 € restantes. `representarRelacion(p)` añade incremento proporcional y presupuesto sin resultados anticipados; conserva el esquema menos y el doble, ahora con unidad real.
- `crearPlanEnsayo` mezcla una vez cuatro variantes por familia y reparte cuatro bloques; estado `vuelta`/`puntoEnsayo` exclusivamente en memoria. `Set` cuenta IDs solo al acertar la última fase, evita duplicados y conserva el punto al descansar/visitar otro recorrido. Solo el cierre de la vuelta ofrece regenerarla.
- Progreso textual y dos barras accesibles: bloque/problema y total de vuelta. Pausa voluntaria explica el límite de página abierta. Cierres de bloque permiten continuar o descansar.
- Fecha 26/11 corregida en cabecera, JSON y accesos de Matemáticas/Entender antes de calcular. Numeración confirmada hasta 99.999; su recurso no se modifica.
- Se reutilizan Motor, lector, auth, Persona Activa y navegación. Sin nuevas persistencias, colecciones, Temas, evidencias ni dependencias del producto.

### 8.2. Validación técnica y visual ejecutada · 17/11/2026

- `node --test tests/mates-preparacion-problemas.test.mjs`: **9/9**. Contrato 4+5+20; huella del contenido histórico íntegro; huella de todas las preguntas/pistas/explicaciones/fases de los cinco Gaudem idéntica a `main`; 25 claves numéricas independientes; casos 10±2, total/restante; libros sin euros; contratos inválidos; 200 vueltas equilibradas sin repetición y con orden variable.
- `tests/mates-preparacion-problemas-browser.cjs`, Chromium real con SDK/identidades y salida de voz controlados: cuatro microactividades, cinco Gaudem, **dos vueltas completas de veinte**; equilibrio/unicidad por bloque, progreso antes/después de cada fase, error/pista sin incremento, reanudación incluso tras otro recorrido y fase ya acertada, descanso entre bloques, fin/reinicio/recarga.
- Las cuatro comparaciones verificadas en UI: e5a/e5b menos, e5c más/total, e5d más/restante. En e5d se rechazan 123 (precio intermedio), 37 (diferencia) y −9 (descontar ambas compras, entrada inválida); solo 77 resuelve la pregunta final. No se muestran los resultados desconocidos en los diagramas iniciales.
- Revisión visual real de diagramas/composición y ausencia de overflow en **320/390/768/1024/1280/1440 px**, con Outfit. Conserva jerarquía, relato, preguntas, radios y controles; comparación más amplía la barra de referencia mediante un tramo de incremento, menos conserva su representación y doble de libros usa dos grupos iguales con unidad correcta. Frente al recurso previo se añaden progreso y descanso sin sustituir los apoyos pedagógicos.
- Teclado, foco tras acierto/retorno, labels del formulario, `role=status`, barras etiquetadas y `prefers-reduced-motion`; audio recibe enunciado/pregunta reales. Consulta relacionada abre el mismo recurso; cero escrituras educativas y Storage sin cambios durante los recorridos.
- Sintaxis JS y `git diff --check` correctos. Pruebas reproducibles con servidor local y `BASE_URL`, Chromium mediante `CHROMIUM_EXECUTABLE`; `QA_FONT_CSS`/`QA_IMAGES` son opciones de QA, no dependencias del producto.

**Límites reales:** autenticación/Firestore controlados, no cuentas de producción ni emulador de Rules; salida de voz controlada, no escucha humana ni proveedor del dispositivo familiar; no auditoría con lector de pantalla humano. Navegador probado es Chromium, no dispositivo físico ni Safari. Antes de estabilidad se requiere uso real con Gloria, incluida comprensión, ritmo de trabajo, ayudas y audio. Publicación y verificación pública pendientes de la aprobación de la PR.
