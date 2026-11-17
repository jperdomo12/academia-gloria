# Matemáticas 6.º · Preparación de problemas · noviembre 2026
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| Ruta | docs/specifications/SPEC-MATEMATICAS_6TO_PREPARACION_PROBLEMAS_NOV2026.md |
| Propietario | Contenido curricular Matemáticas · 6.º |
| Responsables | Product Owner + AI Collaborator |
| Ámbito | Refuerzo temporal de interpretación y resolución de problemas de Matemáticas de 6.º |
| Versión | 1.2 |
| Estado | Publicada para validación familiar · ampliación Paso 3 aprobada, pendiente de DESA |
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

| Versión | Fecha | Cambios |
|---|---|---|
| 1.2 | 17/11/2026 | Product Owner aprueba subir de 10 a 20 los problemas originales del Paso 3, en cuatro bloques de cinco equilibrados (una familia por bloque), con contador global, selección sin repetición y calidad actual como mínimo. Se añaden contratos verificables, diez propuestas de enunciados originales y corrección de fecha del examen a 26/11. **Solo documentación; aún no implementado.** |
| 1.1 | 11/11/2026 | PR #245: experiencia y banco de problemas; PR #246: visualización de doble y comparaciones. Pages #43028910917 y #43029670985 completados con éxito. Validación familiar pendiente. |
| 1.0 | 11/11/2026 | Especificación aprobada y desarrollo inicial en rama. |

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

Se comienza con una interpretación explícita del enunciado, sin efectuar cálculos. Después se identifica la operación, se resuelve y se verifica la respuesta. En comparaciones de precio hay dos pasos: precio desconocido y total. En repartos se comprueban cociente y resto.

No se premia la rapidez, no se utiliza cronómetro, existen pistas voluntarias y reintentos sin penalización. El material responde a observaciones familiares de respuestas precipitadas y dificultades posibles con relaciones «más/menos que». No permite establecer diagnósticos.

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
**Estado publicado antes de esta ampliación:** diez problemas originales de Academia, dos variantes de cada familia (doble, suma, reparto con resto, multiplicación de grupos y comparación aditiva con suma final). Cada ensayo elige al azar una por familia, sin memoria de qué variantes han salido antes.

**Decisión funcional aprobada el 17/11:** ampliar a **20 problemas originales, cuatro por cada una de las cinco familias**, distribuidos en **cuatro bloques de cinco**, uno por familia y sin repetición hasta completar una vuelta. Esta decisión **todavía no está implementada**.

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
| `e5c` | comparacion | Un teclado cuesta 350 € y una guitarra cuesta 80 € menos que el teclado. ¿Cuánto cuestan los dos instrumentos juntos? | 350 € y 80 € menos → **guitarra 270 €; total 620 €** |
| `e5d` | comparacion | Un escritorio cuesta 289 € y una silla cuesta 120 € menos que el escritorio. ¿Cuánto cuestan ambos muebles? | 289 € y 120 € menos → **silla 169 €; total 458 €** |

**Precisión de calidad obligatoria:** los nuevos problemas introducen contextos y unidades variados (por ejemplo, libros), sin cambiar las **cinco relaciones matemáticas**. En la familia `doble`, las fases actuales preguntan literalmente por **«precio doble, en euros»**. DESA deberá hacer que la pregunta, la unidad y la explicación se adapten al `p.unidad` de forma **retrocompatible** con las variantes en euros, en vez de mostrar una pregunta incorrecta para libros. En `reparto`, validar que el resto es no nulo y menor que el divisor; en `comparacion`, comprobar precio segundo positivo, **respuesta intermedia** y **total final**; en grupos y sumas, confirmar que las magnitudes y la respuesta corresponden al enunciado.

**Contrato de datos:** reutilizar exactamente los campos vigentes de `problemas.json` (`id,tipo,titulo,enunciado,a,b,valores,unidad` según tipo); no crear formatos, datos personales ni motores paralelos. La tabla define las diez nuevas situaciones y sus claves de cálculo, pero la adaptación del texto, pistas y ayudas al motor corresponde a la validación técnica y pedagógica de DESA.

## 4. Arquitectura y contratos

- Banco de datos: cursos/6to/mates/preparacion-problemas/problemas.json.
- Vista y control: index.html, preparacion.js y preparacion.css en la misma carpeta.
- Autenticación y contexto: mecanismos actuales de auth y ContextoUsuario.
- Voz: lector compartido de Academia, sin nueva dependencia.
- Navegación: componentes globales existentes.
- Sin nuevas colecciones ni escrituras Firestore, sin notas ni registros de resultados. El objetivo es formativo; la evidencia académica sigue en los Temas que ya la registran.
- `problemas.json`: pasar `ensayos.length` de **10 a 20**, con **cuatro por familia**; mantener `gaudem.length===5` y `calentamiento.length===4`.
- `preparacion.js`: reemplazar selección aleatoria independiente por **plan de cuatro bloques sin repetición**; actualizar las verificaciones del banco, la unidad de `doble` cuando corresponda, el progreso y los cierres, sin tocar reglas de las cinco operaciones.
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
- Prueba automatizada del contrato `4 calentamiento + 5 Gaudem + 20 originales`; unicidad de 20 IDs, exactamente cuatro por familia, cinco tipos representados en cada bloque, **cero repeticiones dentro de una vuelta** y dos vueltas consecutivas con renovación correcta.
- Validación aritmética de los 20 enunciados originales: dobles correctos; sumas de tres cantidades; división con cociente y **resto entre 1 y divisor−1**; multiplicación por grupos; comparación con precio desconocido positivo y suma final. Verificar claves de respuesta con un cálculo independiente.
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

**Estado actual de producto:** siguen publicados 5 problemas de Gaudem, **10** variantes originales y sesiones aleatorias de **5**; el recurso **todavía muestra 19/11**. La ampliación a 20 y la corrección visual al 26/11 **no están implementadas** y quedan a cargo de ACADEMIA-DESA. Implementación anterior integrada: PR #245 (merge 1d0406186aeaa957261d001b05f8e273d20af7f2) y PR #246 (merge 5001d7197005f4b710a9ac3f4bb3ebf682b4baa1). Publicación de Pages confirmada con éxito en ejecuciones #43028910917 y #43029670985. Se verificaron cálculos, diversidad del banco, sintaxis JS, rutas de DOM y equilibrio del CSS. Se incorporó una prueba Node estática, pero no se ejecutó en un navegador real desde este entorno. Pendiente: probar en vivo con Gloria, revisar respuesta ante pista/error, voz en dispositivo real, responsive y facilidad de comprensión; solo después declarar estable.
