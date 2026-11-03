# Matemáticas 6.º · Potencias
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-MATEMATICAS_6TO_POTENCIAS.md` |
| **Versión** | 1.0 |
| **Estado** | Aprobada para desarrollo · no implementada |
| **Última actualización** | 03/11/2026 |
| **Propietario** | Experiencia curricular · Matemáticas 6.º |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Nuevo Tema académico `Potencias` a partir del Plan Semanal ANS de Gloria |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` | Gobierna la filosofía de comprensión, autonomía, motivación y disfrute aprendiendo. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | Gobierna incorporación curricular, fidelidad a la fuente, experiencia, evidencia y calidad. |
| `docs/specifications/SPEC-PLAN_SEMANAL_6TO.md` | Gobierna la selección semanal y el caso de material que introduce un Tema nuevo. |
| `docs/specifications/SPEC-MATEMATICAS_6TO_NUMEROS_HASTA_100000.md` | Referencia reciente de Tema académico propio de Matemáticas; reutilizar contratos, no copiar composición visual. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | Gobierna implementación, pruebas, PR, publicación y cierre. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 03/11/2026 | Product Owner + AI Collaborator | Aprueba `6.º → Matemáticas → Potencias` como Tema permanente y acceso desde Plan Semanal. Fuente exclusiva: `6_PS_ANS_Potencias.docx (1).pdf`. Conserva los 9 ejercicios ANS completos y en orden, añade experiencia propia de Academia y apoyo explícito para exponente cero sin incorporar el material general ni AACC. |

---

## 🧭 Resumen de contenido

| Punto | Contenido |
|---|---|
| 1–3 | Decisión, fuente y alcance. |
| 4–7 | Arquitectura del Tema y cuatro núcleos de aprendizaje. |
| 8 | Material del Plan Semanal: ejercicios 1–9 completos. |
| 9–12 | Teoría, fichas, práctica, prueba y ayudas. |
| 13–16 | TEL/UX, voz, evidencia, Misiones e integración. |
| 17–19 | Fidelidad, fuera de alcance y criterios de aceptación. |
| 20 | Estado operativo y cierre esperado. |

## 1. Decisión funcional aprobada

Se incorpora como nuevo Tema canónico:

`6.º → Matemáticas → Potencias`

El mismo Tema tendrá acceso desde:

`6.º → Plan Semanal → Matemáticas · Potencias`

La clasificación corresponde al caso **material del Plan Semanal que introduce un Tema nuevo**:

- el conocimiento queda de forma permanente en Matemáticas;
- Plan Semanal actúa como acceso de la semana;
- no se crea una implementación paralela del mismo contenido;
- la ficha escolar seleccionada se conserva dentro del Tema como `Material del Plan Semanal`.

Ruta funcional esperada del Tema:

`cursos/6to/mates/potencias/`

Identificador académico propuesto:

`6-mates-potencias`

La implementación deberá respetar los contratos compartidos vigentes de Temas académicos antes de crear estructuras nuevas.

---

## 2. Fuente escolar autorizada

Fuente exclusiva para esta incorporación:

`6_PS_ANS_Potencias.docx (1).pdf`

Procedencia:

`Colegio Gaudem · Plan Semanal MATEMÁTICAS · Adaptación no significativa · 6.º Ed. Primaria`

Semana operativa indicada por el Product Owner para esta incorporación:

`02/11/2026–09/11/2026`

### 2.1 Fuentes expresamente no incorporadas

No se incorpora como contenido de Gloria:

- `6_PS_Potencias.docx.pdf` · versión general;
- `6_PS_AACC_Potencias.docx.pdf` · versión AACC.

Pueden existir como contexto documental de origen, pero **no deben alimentar preguntas, retos, teoría adicional ni dificultad del Tema** salvo nueva decisión explícita del Product Owner.

---

## 3. Alcance conceptual real de la fuente ANS

La ficha seleccionada trabaja:

1. reconocer **base** y **exponente**;
2. explicar con palabras propias qué es una potencia;
3. pasar de potencia a multiplicación repetida y calcular;
4. pasar de multiplicación repetida a potencia;
5. leer potencias;
6. distinguir expresiones que sí representan una potencia;
7. relacionar representaciones equivalentes;
8. completar una tabla `potencia ↔ producto ↔ lectura`;
9. interpretar multiplicaciones por potencias de 10.

Academia puede reorganizar y enriquecer la **experiencia** para facilitar comprensión, pero no ampliar silenciosamente el **contenido curricular** más allá de este alcance.

---

## 4. Concepto de experiencia

Idea guía:

> **Una potencia es una forma corta de escribir una multiplicación en la que el mismo factor se repite.**

El Tema debe ayudar a Gloria a cambiar con seguridad entre cuatro representaciones:

`potencia ↔ multiplicación repetida ↔ lectura ↔ valor`

La experiencia debe sentirse como **descubrir una relación entre formas de escribir la misma idea**, no como memorizar símbolos aislados.

Principios:

- reto corto antes de explicación larga;
- una transformación por vez;
- apoyo visual a base y exponente;
- feedback que explique el paso relevante;
- reintento sin presión;
- lenguaje apropiado para 11 años, sin infantilización;
- mantener la exigencia académica del material ANS.

---

## 5. Arquitectura del Tema

Mantener el patrón académico vigente:

- `🧭 Resumen`
- `📖 Teoría`
- `🃏 Fichas`
- `✏️ Práctica`
- `✅ Prueba`

Añadir dentro del Tema:

- `📅 Material del Plan Semanal`
  - `Potencias · ANS`
  - ejercicios escolares 1–9, completos y en el orden original.

No copiar la composición visual de Fracciones o Números hasta 100 000 como plantilla rígida. Potencias debe tener representaciones propias.

---

## 6. Cuatro núcleos de aprendizaje

### 6.1 🔍 Descubro una potencia

Objetivo:

- identificar base;
- identificar exponente;
- comprender qué indica cada parte;
- expresar con palabras propias qué es una potencia.

Representación recomendada:

`2⁷`

con señalización accesible y no dependiente solo del color:

- `2` → base → número que se repite;
- `7` → exponente → cuántas veces aparece la base como factor.

### 6.2 🔁 Cambio de forma

Objetivo:

`potencia ↔ multiplicación repetida ↔ resultado`

Ejemplo de Academia, distinto de una pregunta escolar cuando proceda:

`3⁴ = 3 × 3 × 3 × 3 = 81`

La interfaz debe hacer visible que **el exponente cuenta factores**, no el número de signos de multiplicación.

### 6.3 🧩 Conecto representaciones

Objetivo:

- reconocer expresiones equivalentes;
- decidir cuándo una multiplicación repetida puede escribirse como potencia;
- leer y escribir una misma potencia en diferentes formatos.

Debe incluir relaciones de uno a uno y, cuando la ficha escolar lo requiera, relaciones de varios elementos con el mismo valor sin forzar una falsa correspondencia única.

### 6.4 🚀 Potencias de 10

Objetivo:

interpretar expresiones del tipo:

`4 × 10³`

como:

`4 × 1000 = 4000`

El alcance de esta sección es el mostrado por la ficha ANS. No convertirla en una unidad de notación científica ni introducir leyes de exponentes.

---

## 7. Apoyo específico · exponente cero

La fuente ANS incluye `7⁰` en el ejercicio 3, pero no presenta antes una explicación explícita del exponente cero.

Academia debe conservar `7⁰` porque forma parte del ejercicio escolar y puede ofrecer, como **apoyo de Academia claramente diferenciado de la fuente**, una ayuda breve:

> **Una potencia especial**  
> Cuando una base distinta de cero está elevada a 0, su valor es 1.  
> Por eso `7⁰ = 1`.

Reglas:

- no presentar esta ayuda como texto original de Gaudem;
- mostrarla bajo demanda o cuando la alumna solicite ayuda, no necesariamente adelantando la respuesta;
- no extender desde aquí a propiedades generales de exponentes que no aparecen en ANS.

---

## 8. Material del Plan Semanal · fidelidad 1–9

La experiencia `Material del Plan Semanal` debe conservar **los nueve ejercicios completos y en el mismo orden**.

### Ejercicio 1 · Partes de una potencia

Consigna escolar:

`Nombra y explica las partes de una potencia.`

Referencia visual de la ficha: `2⁷`.

Academia debe permitir identificar y explicar:

- base;
- exponente.

### Ejercicio 2 · Definición con palabras propias

Consigna escolar:

`Define con tus propias palabras qué es una potencia, no olvides poner un ejemplo.`

Debe mantenerse como respuesta abierta. Academia puede aportar una guía breve o modelo después del intento, pero no convertir automáticamente la redacción libre en una respuesta cerrada ni calificar semánticamente una formulación válida solo por no coincidir palabra por palabra.

### Ejercicio 3 · Potencia → multiplicación → producto

Conservar exactamente estas seis potencias:

- `2⁴`;
- `5²`;
- `7⁰`;
- `3⁵`;
- `6³`;
- `10⁸`.

La ficha ofrece como ejemplo `3² = 3 × 3 = 9`.

Academia puede dividir cada caso visualmente en:

`potencia → multiplicación → resultado`

sin cambiar los valores.

### Ejercicio 4 · Producto → potencia

Conservar exactamente:

- `8 × 8 × 8 × 8 × 8 × 8`;
- `6 × 6`;
- `4 × 4 × 4 × 4 × 4 × 4 × 4 × 4`;
- `5 × 5 × 5`.

### Ejercicio 5 · Lectura

Conservar la dependencia del ejercicio anterior: escribir cómo se leen las cuatro potencias obtenidas en el ejercicio 4.

Academia debe aceptar formulaciones escolares equivalentes razonables, por ejemplo `al cuadrado`, `al cubo` o `elevado a ...` cuando correspondan.

### Ejercicio 6 · ¿Puede escribirse como potencia?

Conservar exactamente las seis expresiones:

- `5 + 5`;
- `12 × 12 × 12`;
- `8 - 8 - 8 - 8`;
- `3 × 3`;
- `9 × 9 × 9 × 9`;
- `10 + 10 + 10`.

La actividad debe comprobar que la potencia representa una **multiplicación del mismo factor repetido**.

### Ejercicio 7 · Unir expresiones equivalentes

Conservar las expresiones de la ficha:

Grupo superior:

- `5⁴`;
- `4 × 5`;
- `4⁵`.

Grupo inferior:

- `5 + 5 + 5 + 5`;
- `4 × 4 × 4 × 4 × 4`;
- `5 × 5 × 5 × 5`;
- `4 + 4 + 4 + 4 + 4`.

La implementación debe admitir la semántica real de la consigna `expresiones que indiquen lo mismo`, incluida la posibilidad de varias representaciones con valor 20. No imponer artificialmente un matching uno-a-uno si la propia ficha no lo exige.

### Ejercicio 8 · Tabla potencia/producto/lectura

Conservar la tabla con columnas:

`POTENCIA | PRODUCTO | SE LEE...`

Filas parcialmente dadas por la fuente:

- `2⁴`;
- `Siete elevado a nueve`;
- `6 × 6 × 6 × 6`;
- `Cinco al cubo`;
- `10 × 10`.

Academia debe completar los campos faltantes respetando estas cinco filas y su intención original.

### Ejercicio 9 · Multiplicación por potencias de 10

Conservar el ejemplo escolar:

`4 × 10³ = 4 × 1000 = 4000`

Y las seis expresiones:

- `4 × 10³`;
- `12 × 10²`;
- `45 × 10⁵`;
- `1 × 10¹⁰`;
- `5 × 10⁴`;
- `2 × 10⁹`.

La interfaz puede mostrar separación de miles para facilitar lectura, sin alterar el valor matemático.

---

## 9. Teoría

La Teoría debe ser breve y visual, organizada según los cuatro núcleos.

Como mínimo:

1. qué es una potencia;
2. base y exponente;
3. potencia como multiplicación repetida;
4. lectura básica de potencias;
5. `al cuadrado` y `al cubo` como vocabulario escolar;
6. potencias de 10 en el alcance de la ficha;
7. ayuda separada sobre exponente cero.

No introducir como contenido troncal:

- producto o cociente de potencias;
- potencia de una potencia;
- exponentes negativos;
- bases fraccionarias/decimales;
- notación científica formal;
- patrones avanzados de últimas cifras.

---

## 10. Fichas rápidas

Las fichas deben reforzar recuperación breve, no sustituir la comprensión.

Familias sugeridas:

- `Base` → ¿qué número se repite?;
- `Exponente` → ¿cuántas veces aparece como factor?;
- `2³` → `2 × 2 × 2`;
- `5 × 5 × 5 × 5` → `5⁴`;
- lectura de una potencia;
- `10⁴` → `10 000` dentro del alcance trabajado.

Variar ejemplos, pero permanecer dentro del contenido ANS.

---

## 11. Práctica

La Práctica debe usar variantes nuevas de las mismas habilidades, sin copiar los nueve ejercicios escolares como único banco.

Progresión recomendada:

1. identificar base/exponente;
2. potencia → producto repetido;
3. producto repetido → potencia;
4. lectura/escritura;
5. equivalencias;
6. potencias de 10.

Feedback útil:

- `La base es el factor que se repite.`
- `Cuenta cuántas veces aparece el mismo factor.`
- `Aquí hay una suma, no una multiplicación repetida.`
- `10³ significa 10 × 10 × 10.`

No usar únicamente `Correcto/Incorrecto` cuando pueda darse una pista conceptual breve.

---

## 12. Prueba

Crear una Prueba académica reutilizando el motor/contrato compartido vigente.

Debe cubrir las mismas familias, con variantes suficientes para evitar memorizar una secuencia fija.

Cobertura mínima:

- base/exponente;
- significado;
- potencia ↔ multiplicación;
- lectura;
- reconocimiento de expresiones válidas como potencia;
- equivalencias;
- potencias de 10.

La Prueba no debe evaluar material exclusivo de la versión AACC o general.

---

## 13. Diseño TEL-friendly y accesibilidad cognitiva

Aplicar el estándar curricular vigente:

- instrucciones cortas;
- una acción principal por bloque;
- jerarquía visual clara;
- base y exponente distinguibles también sin depender solo de color;
- evitar párrafos largos antes de actuar;
- mostrar el paso actual;
- ayudas progresivas;
- permitir reintento;
- evitar animaciones distractoras;
- lenguaje preciso y natural;
- tamaño de objetivo táctil y foco de teclado conforme al estándar general;
- responsive desde móvil estrecho hasta escritorio.

No reducir la cantidad de ejercicios escolares por TEL. La adaptación afecta **presentación, apoyo y carga por pantalla**, no el contenido exigido.

---

## 14. Lectura/voz

Puede reutilizarse la capacidad compartida `🔊 Escuchar` cuando aporte valor en:

- teoría;
- consignas;
- lectura verbal de potencias.

No es obligatorio sintetizar números extremadamente largos de la actividad 9 si la experiencia auditiva empeora la comprensión. La lectura visual debe seguir siendo suficiente y accesible.

---

## 15. Evidencia académica y Trabajo realizado

Al ser un Tema real de 6.º, la Prueba debe generar evidencia mediante el contrato académico compartido vigente.

No crear una persistencia privada de `Potencias` si `sesion-academica-v1` y los contratos actuales son suficientes.

La evidencia debe poder ser reutilizada por:

- Trabajo realizado;
- estadísticas;
- Análisis Educativo;
- propuestas de fortalecimiento;
- Misiones cuando proceda.

La ficha `Material del Plan Semanal` puede ser formativa y no necesita duplicar una segunda evidencia persistente si la Práctica/Prueba del Tema ya cumple esa función.

---

## 16. Integración con Plan Semanal y Misiones

### 16.1 Plan Semanal

Añadir el material seleccionado al catálogo semanal como Matemáticas · Potencias.

Comportamiento:

- aparece en la semana correspondiente;
- conserva `Material del colegio · Plan Semanal`;
- abre el único Tema propietario `Potencias` o su sección semanal;
- no crea una segunda copia del Tema.

No se impone `paper-first`: la ficha ANS no contiene una instrucción equivalente a la usada en Nutrición para realizar primero el trabajo en cuaderno.

### 16.2 Matemáticas

Añadir `Potencias` al catálogo de Temas reales de Matemáticas, junto a los Temas existentes.

### 16.3 Misiones

La nueva actividad debe quedar disponible a través de los mecanismos genéricos vigentes de Matemáticas/Temas, sin inventar una lógica privada de Misión.

---

## 17. Fidelidad y trazabilidad

Antes del cierre técnico debe existir una comparación fuente → Academia que confirme:

- 3 páginas ANS revisadas;
- 9 ejercicios presentes;
- mismo orden 1–9;
- mismos valores numéricos de los ejercicios;
- tabla del ejercicio 8 completa como actividad;
- seis expresiones del ejercicio 9 presentes;
- `7⁰` conservado;
- ayuda de exponente cero identificada como apoyo de Academia;
- ausencia de contenido importado de AACC/general;
- ausencia de empobrecimiento visual/pedagógico respecto a la fuente.

La implementación puede mejorar layout, interacción, explicación y feedback sin reproducir literalmente la estética del PDF.

---

## 18. Fuera de alcance

No forma parte de esta incorporación:

- convertir las versiones general o AACC en rutas alternativas;
- permitir seleccionar nivel ANS/general/AACC;
- leyes de exponentes;
- notación científica como Tema;
- ajedrez/patrones/descomposición avanzada del documento AACC;
- generación dinámica por IA;
- nuevas colecciones Firestore;
- rediseñar el portal general de Matemáticas;
- cambiar Fracciones, Números hasta 100 000 o ayudas matemáticas existentes.

---

## 19. Criterios de aceptación

La implementación se considera candidata para publicación cuando demuestre:

1. `Potencias` aparece como Tema real de Matemáticas 6.º;
2. Plan Semanal muestra `Matemáticas · Potencias` para la semana aprobada;
3. ambos accesos conducen a un único Tema propietario;
4. la fuente curricular utilizada es exclusivamente la versión ANS aprobada;
5. los 9 ejercicios escolares están completos y en orden dentro de `Material del Plan Semanal`;
6. ejercicio 3 conserva `2⁴`, `5²`, `7⁰`, `3⁵`, `6³`, `10⁸`;
7. ejercicio 8 conserva sus cinco filas/fuentes parciales y ejercicio 9 sus seis expresiones;
8. la ayuda de `a⁰` está claramente diferenciada como apoyo de Academia;
9. no se exige trabajo previo en cuaderno;
10. Resumen, Teoría, Fichas, Práctica y Prueba funcionan con contenido dentro del alcance ANS;
11. la Prueba genera evidencia académica reutilizando contratos compartidos;
12. Trabajo realizado/Misiones no se rompen y no se crea persistencia paralela;
13. navegación y `Volver` respetan el modelo vigente;
14. accesibilidad de teclado/foco y `prefers-reduced-motion` se conservan donde aplique;
15. revisión responsive al menos en 320, 390, 768, 1024 y 1440 px;
16. cero errores JS en recorridos principales;
17. regresión del portal de Matemáticas y Plan Semanal vigente superada;
18. comparación visual/funcional fuente → Academia documentada;
19. publicación Pages verificada antes de declarar cierre técnico;
20. uso real con Gloria/familia queda como validación posterior y no debe confundirse con estabilidad automática.

---

## 20. Estado operativo

**DECISIÓN APROBADA POR PRODUCT OWNER · 03/11/2026.**

Estado actual:

`Aprobada para desarrollo · no implementada`

Siguiente paso:

1. implementar el Tema siguiendo esta SPEC;
2. integrar el acceso de Plan Semanal;
3. ejecutar pruebas funcionales, académicas, responsive y regresión;
4. comparar las 3 páginas ANS con la experiencia resultante;
5. abrir/integrar PR según workflow;
6. publicar y verificar Pages;
7. sincronizar `SPEC-PLAN_SEMANAL_6TO.md`, esta SPEC y el HandOff con el estado real alcanzado;
8. entregar para revisión familiar con Gloria antes de declarar estabilidad.
