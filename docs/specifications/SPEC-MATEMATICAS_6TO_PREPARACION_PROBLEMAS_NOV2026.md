# Matemáticas 6.º · Preparación de problemas · noviembre 2026
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| Ruta | docs/specifications/SPEC-MATEMATICAS_6TO_PREPARACION_PROBLEMAS_NOV2026.md |
| Versión | 1.0 |
| Estado | Aprobada para desarrollo · implementación en rama · pendiente de publicar/validar |
| Fecha | 11/11/2026 |
| Origen | Decisión aprobada por el Product Owner para prueba del 19/11/2026 |

## Documentos relacionados

- Fuente escolar específica: Matemáticas.pdf, ficha Gaudem «Matemáticas · Problemas», una página y cinco ejercicios aportados por la familia.
- Referencia metodológica: Problemas .pdf, quince fotografías de páginas dobles del libro facilitado por Pilar; **no se reproduce el libro**.
- Fechas y temario proporcionados por Pilar: 19/11 Matemáticas, numeración hasta 999.999, anterior/posterior, nombre de números, redondeo, cálculo y problemas.
- docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md
- docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md
- docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md

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
Diez problemas originales de Academia: dos variantes de cada familia (doble, suma, reparto con resto, multiplicación de grupos y comparación aditiva con suma final). Cada sesión selecciona una variante de cada familia; la sesión contiene cinco ejercicios.

## 4. Arquitectura y contratos

- Banco de datos: cursos/6to/mates/preparacion-problemas/problemas.json.
- Vista y control: index.html, preparacion.js y preparacion.css en la misma carpeta.
- Autenticación y contexto: mecanismos actuales de auth y ContextoUsuario.
- Voz: lector compartido de Academia, sin nueva dependencia.
- Navegación: componentes globales existentes.
- Sin nuevas colecciones ni escrituras Firestore, sin notas ni registros de resultados. El objetivo es formativo; la evidencia académica sigue en los Temas que ya la registran.

## 5. Experiencia y accesibilidad

- Una pregunta principal por paso; selección o entrada numérica con etiquetas.
- Pistas solicitadas por Gloria, reintento, feedback conceptual y progreso visible.
- La solución numérica aparece solo después de superar comprensión y plan.
- Audio del enunciado y la pregunta a velocidad moderada.
- Teclado, foco, regiones de estado accesibles, responsive y preferencia de movimiento reducido.
- El resultado no equivale a calificación escolar ni diagnóstico.

## 6. Fuera de alcance

No incorporar el libro íntegro, la ficha como PDF público, contenidos de numeración hasta 999.999, redondeo, otros apartados del examen, analítica, notas, pruebas oficiales ni contenido avanzado no indicado.

El resto de la prueba necesita los recursos de Matemáticas apropiados y contraste con material individualizado de Gloria.

## 7. Criterios de aceptación

- Cinco problemas escolares, mismo orden y mismos datos.
- Respuestas verificadas: 318, 55, 361 y resto 1, 270, 146 y total 392.
- Comprensión y planificación preceden al cálculo.
- Un resultado intermedio no sustituye la respuesta final.
- Diez variantes originales, dos por familia, cinco por ensayo.
- Pistas, reintentos y voz; sin cronómetro ni puntuación punitiva.
- Accesos correctos desde Matemáticas y Entender antes de calcular.
- Sin regresiones en recursos existentes.
- Documentar pruebas, publicación y validación familiar con Gloria.

## 8. Estado

La funcionalidad se prepara en la rama feat/mates-preparacion-problemas-gaudem-nov2026. La revisión en vivo con Gloria es posterior a la publicación y será condición para declararla estable.
