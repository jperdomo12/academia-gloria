# Matemáticas 6.º · Números hasta 100 000
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-MATEMATICAS_6TO_NUMEROS_HASTA_100000.md` |
| **Versión** | 1.0 |
| **Estado** | Aprobada para desarrollo · no implementada |
| **Última actualización** | 28/10/2026 |
| **Propietario** | Experiencia curricular · Matemáticas 6.º |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Nuevo Tema académico a partir del material de estudio escaneado `Gloria-Mates-6to-Primaria.pdf` |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` | Gobierna la filosofía de comprensión, autonomía, motivación y disfrute aprendiendo. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | Gobierna la incorporación curricular, práctica, evidencia, calidad visual y comparación fuente → Academia. |
| `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md` | Complementa las reglas de UX, accesibilidad y calidad técnica. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | Gobierna desarrollo, validación, PR, publicación y cierre. |
| `cursos/6to/mates/fracciones/` | Referencia real de arquitectura de Tema académico de Matemáticas; reutilizar motor y contratos, no su composición visual como plantilla rígida. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 28/10/2026 | Product Owner + AI Collaborator | Aprueba el nuevo Tema `Números hasta 100 000` a partir de 17 páginas escaneadas de material de estudio, con cuatro núcleos: valor posicional/lectura-escritura, comparación-orden, series y redondeo. Fija el principio de experiencia `Disfrutar Aprendiendo`, cuatro experiencias interactivas propias, práctica progresiva y prueba con evidencia académica reutilizando el motor vigente. |

---

## 1. Decisión funcional

Se incorpora como nuevo Tema canónico:

`6.º → Matemáticas → Números hasta 100 000`

No se clasifica como Plan Semanal ni como ficha temporal.

Razones:

- el material desarrolla una unidad conceptual coherente;
- contiene explicación, ejemplos y práctica suficiente para construir un Tema propietario;
- aborda varias habilidades relacionadas alrededor de los números naturales hasta 100 000;
- el contenido no existe actualmente como Tema real en el catálogo de Matemáticas 6.º;
- el conocimiento debe permanecer disponible después de la semana o tarea concreta en que se haya utilizado.

La incorporación debe añadir el Tema al portal actual de Matemáticas, que ya contiene `Fracciones`.

---

## 2. Fuente escolar y alcance real

Fuente aportada por la familia:

`Gloria-Mates-6to-Primaria.pdf`

Origen indicado por el Product Owner: hojas entregadas por Ana a Gloria para estudio de Matemáticas.

El PDF contiene **17 páginas escaneadas**; la página 14 está en blanco y no contiene contenido curricular útil.

El material visible organiza el contenido bajo `Unidad 1 · Números hasta 100 000` y presenta los siguientes núcleos:

1. **Leer, escribir y representar números hasta 100 000**.
2. **Valor posicional y descomposición** en decenas de millar, millares, centenas, decenas y unidades.
3. **Comparar y ordenar números**, incluyendo recta numérica y orden ascendente/descendente.
4. **Series numéricas** mediante incrementos/decrementos de 100 y 1 000 y razonamiento sobre posiciones.
5. **Redondear números** al millar, centena y decena más cercanos utilizando recta numérica y distancia.

La Academia debe preservar esos aprendizajes y no introducir como contenido fuente competencias o procedimientos no presentes en el material.

Las anotaciones manuscritas/correcciones visibles sirven únicamente como contexto de uso del material; no deben reproducirse como respuestas personales ni utilizarse para diagnosticar o etiquetar al alumno.

---

## 3. Concepto de experiencia: `Disfrutar Aprendiendo`

El Product Owner aprueba como intención principal de este Tema:

> **Aprender Matemáticas debe sentirse como descubrir, manipular y comprender, no como rellenar una hoja digital.**

La experiencia debe motivar a volver y probar otra vez mediante:

- interacción visual con propósito;
- retos cortos;
- descubrimiento antes de explicación larga;
- feedback inmediato y amable;
- posibilidad de repetir sin penalización;
- ayudas progresivas;
- pequeñas celebraciones del proceso;
- variedad entre actividades sin ruido visual;
- sensación de avance comprensible;
- autonomía creciente.

`Disfrutar Aprendiendo` no significa convertir el Tema en un videojuego ni añadir recompensas artificiales. La diversión debe surgir de **entender, acertar, manipular, descubrir patrones y notar progreso**.

---

## 4. Arquitectura del Tema

Reutilizar el patrón académico vigente donde aporte valor:

- `🧭 Resumen`
- `📖 Teoría`
- `🃏 Fichas`
- `✏️ Práctica`
- `✅ Prueba`

No copiar la composición interna de Fracciones. Cada núcleo de este Tema necesita representaciones e interacciones propias.

### 4.1 Resumen · mapa visual

Mostrar un recorrido simple:

`Construyo → Comparo → Salto → Aproximo`

Correspondencia:

- **Construyo** → valor posicional, lectura, escritura, descomposición.
- **Comparo** → mayor/menor, ordenar, recta numérica.
- **Salto** → series +100/+1 000 y -100/-1 000.
- **Aproximo** → redondeo a decena/centena/millar.

Idea guía visible:

> **Los números cuentan una historia según la posición de cada cifra. Si entiendo dónde está cada cifra, puedo leer, comparar, avanzar y redondear con más seguridad.**

---

## 5. Experiencia A · 🧱 Construye el número

Propósito: comprender valor posicional, representación, lectura, escritura y descomposición.

### 5.1 Representación

Usar columnas visuales equivalentes a:

`DM | UM | C | D | U`

con etiquetas completas accesibles:

- decenas de millar;
- unidades de millar;
- centenas;
- decenas;
- unidades.

Los colores pueden inspirarse en la función visual del material fuente, pero Academia debe usar su propio diseño coherente y accesible.

### 5.2 Interacción principal

Permitir construir un número de forma directa mediante controles accesibles —botones, selectores, teclado o mecanismo equivalente— sin depender exclusivamente de drag & drop.

Ejemplo:

`59 725`

La interfaz debe permitir descubrir:

- 5 decenas de millar = 50 000;
- 9 millares = 9 000;
- 7 centenas = 700;
- 2 decenas = 20;
- 5 unidades = 5.

Y componer visualmente:

`59 725 = 50 000 + 9 000 + 700 + 20 + 5`

### 5.3 Modos de reto

Variar entre:

- construir el número que se muestra escrito;
- escribir en cifras un número representado por posiciones;
- completar una descomposición;
- identificar cuánto vale una cifra concreta según su posición;
- leer el número construido.

No abusar de campos de texto largos; combinar selección, manipulación y escritura breve.

### 5.4 Ayuda progresiva

Primera ayuda:

> `Mira primero la columna donde está la cifra.`

Segunda ayuda:

> resaltar únicamente la posición relevante.

Tercera ayuda:

> mostrar un ejemplo equivalente distinto del ejercicio actual.

No revelar inmediatamente la respuesta salvo acción explícita de ayuda final.

---

## 6. Experiencia B · 🔍 Detective de números

Propósito: comparar y ordenar sin reducir la actividad a elegir `>` o `<` mecánicamente.

### 6.1 Primera diferencia

Presentar dos números, por ejemplo:

`63 398` y `62 431`

Academia invita a comparar **de izquierda a derecha**.

La interacción debe permitir revelar progresivamente:

- decenas de millar: iguales;
- millares: `3 > 2`;
- ya no hace falta seguir comparando cifras posteriores.

Mensaje conceptual:

> **La primera posición diferente decide cuál es mayor.**

### 6.2 Recta numérica

Incluir una representación de recta cuando aporte comprensión, como hace el material escolar.

No convertir todos los ejercicios en recta numérica.

### 6.3 Retos

Combinar:

- elegir mayor/menor;
- ordenar 3–4 números ascendente/descendente;
- colocar aproximadamente números en una recta;
- encontrar el “intruso” que rompe un orden;
- explicar qué cifra decidió la comparación mediante selección guiada.

### 6.4 Feedback

Evitar únicamente `correcto/incorrecto`.

Feedback útil, por ejemplo:

> `Las decenas de millar son iguales. Mira ahora los millares.`

O:

> `Ya encontraste la primera cifra diferente. No necesitas comparar las siguientes.`

---

## 7. Experiencia C · 🚀 Saltos numéricos

Propósito: comprender series y cambios de +100, -100, +1 000 y -1 000 a partir del valor posicional.

### 7.1 Interacción

Mostrar una recta/camino visual y controles de salto:

- `+100`
- `−100`
- `+1 000`
- `−1 000`

El número debe actualizarse visualmente y, cuando aporte valor, resaltar qué posiciones cambiaron.

Ejemplo:

`97 000 → +1 000 → 98 000`

### 7.2 Descubrir antes de calcular

Antes de mostrar el resultado, permitir anticiparlo.

Después del salto, Academia puede mostrar:

> `Ha cambiado la cifra de los millares; las centenas, decenas y unidades siguen en 0.`

cuando corresponda.

### 7.3 Retos

- completar el siguiente/anterior;
- encontrar el número tras varios saltos;
- elegir el salto correcto para llegar a una meta;
- completar una serie corta;
- detectar un número incorrecto dentro de una serie.

Mantener cantidades y longitud de secuencia razonables para evitar cálculo repetitivo sin comprensión.

---

## 8. Experiencia D · 🧲 El imán del redondeo

Propósito: comprender redondeo como **distancia al múltiplo más cercano**, no únicamente como regla memorizada de `0–4 / 5–9`.

### 8.1 Representación principal

Usar una recta numérica clara con:

- límite inferior;
- límite superior;
- punto medio;
- número a redondear;
- distancia visual a ambos extremos.

Ejemplo al millar:

`2 000 —— 2 500 —— 3 000`

para razonar dónde cae `2 508`.

### 8.2 Interacción

El alumno debe decidir hacia qué referencia “atrae” el número.

Puede utilizarse una animación corta de imán/desplazamiento si aporta comprensión y respeta `prefers-reduced-motion`.

### 8.3 Casos de mitad

El material muestra casos exactamente a mitad. Explicar de forma explícita la convención utilizada por el material: cuando está justo en la mitad, se aproxima al valor superior.

No ocultar ese caso como excepción sin explicación.

### 8.4 Niveles

- redondear a la decena;
- redondear a la centena;
- redondear al millar.

La interfaz debe indicar siempre **a qué posición se está redondeando**.

### 8.5 Ayudas

Secuencia sugerida:

1. `¿Entre qué dos decenas/centenas/millares está?`
2. `Encuentra el punto medio.`
3. `¿A cuál está más cerca?`
4. revelar la recta completa si aún necesita ayuda.

---

## 9. Teoría visual

La teoría debe ser breve, manipulable cuando sea posible y organizada en los cuatro núcleos.

No escribir una explicación extensa seguida de ejercicios.

Cada bloque debe incluir:

- una idea principal;
- representación visual;
- ejemplo resuelto paso a paso;
- `🔊 Escuchar` reutilizando la capacidad existente cuando proceda;
- acceso natural a una práctica relacionada.

El contenido debe preservar la terminología escolar relevante: decenas de millar, millares/unidades de millar, centenas, decenas, unidades; ascendente/descendente; mayor/menor; redondeo a decena/centena/millar.

---

## 10. Fichas rápidas

Crear fichas visuales reutilizables para consulta, no como duplicado de la teoría.

Ejemplos:

- `DM · UM · C · D · U`;
- `Primera cifra diferente`;
- `+100 / +1 000: mira qué posición cambia`;
- `Redondear = encontrar los dos vecinos + decidir cuál está más cerca`.

Las fichas deben permitir repaso rápido antes de la práctica o prueba.

---

## 11. Práctica progresiva

La práctica debe mezclar los cuatro núcleos con dificultad progresiva y alta variedad.

### 11.1 Fase 1 · Calentamiento

Ejercicios simples y cortos para entrar en tarea.

### 11.2 Fase 2 · Entrenamiento

Ejercicios combinados con ayudas bajo demanda.

### 11.3 Fase 3 · Reto

Problemas o decisiones que exijan elegir estrategia y no solo ejecutar una operación.

### 11.4 Reintentos

Permitir repetir libremente.

El error debe orientar:

- señalar el paso a revisar;
- ofrecer pista progresiva;
- evitar mensajes punitivos;
- no resolver automáticamente en el primer fallo.

---

## 12. Mini experiencias de motivación

La motivación debe ser discreta y vinculada al aprendizaje.

Se permiten, entre otras:

- `✨ ¡Lo descubriste!` al identificar la primera cifra diferente;
- pequeña animación cuando un número encaja en su posición;
- `🚀 Salto perfecto` al completar una serie razonada;
- efecto visual de “imán” al justificar correctamente un redondeo;
- celebración breve al completar una ronda de práctica.

No usar:

- ranking;
- vidas;
- presión por tiempo;
- pérdida de puntos por error;
- recompensas desproporcionadas;
- ruido constante o confeti repetitivo.

---

## 13. Prueba académica

Este nuevo Tema real de 6.º debe integrar la Prueba vigente y generar evidencia académica estructurada mediante el motor compartido existente.

La prueba debe cubrir proporcionalmente:

- valor posicional/lectura/descomposición;
- comparación/orden;
- series;
- redondeo.

Debe utilizar variantes suficientes para evitar que repetir la prueba sea memorizar las mismas respuestas.

La evidencia debe integrarse con:

- sesiones académicas;
- Trabajo realizado;
- Análisis Educativo;
- propuestas de refuerzo existentes;
- Misiones cuando proceda.

No crear una persistencia privada para este Tema.

---

## 14. Diseño accesible y carga cognitiva

Aplicar de forma estricta:

- una decisión principal por interacción cuando sea posible;
- instrucciones breves visibles;
- números con separación clara de millares;
- etiquetas además del color;
- targets táctiles adecuados;
- teclado y foco visibles;
- no depender de drag & drop;
- feedback junto al elemento relevante;
- ayudas progresivas;
- `prefers-reduced-motion`;
- responsive sin scroll horizontal accidental;
- voz como apoyo opcional, nunca obligatoria.

Evitar infantilización. La experiencia puede ser divertida sin parecer diseñada para niños pequeños.

---

## 15. Calidad visual fuente → Academia

El material escolar usa recursos visuales con función pedagógica que deben preservarse o mejorarse:

| Fuente escolar | Función que Academia debe igualar/superar |
|---|---|
| fichas/colores de valor posicional | hacer visible cuánto vale cada cifra según su posición |
| tablas DM/UM/C/D/U | estructurar el número y su descomposición |
| comparación cifra a cifra | mostrar qué posición decide mayor/menor |
| rectas numéricas | localizar, comparar, saltar y redondear |
| ejemplos guiados | explicar procedimiento antes de pedir autonomía |
| práctica escrita | transformarla en práctica interactiva con feedback y reintento |

No aprobar la implementación si convierte estas ayudas visuales en párrafos de texto o tarjetas decorativas sin función.

---

## 16. Fidelidad al material

Desarrollo debe revisar las 17 páginas renderizadas antes de cerrar contenido.

Reglas:

- no copiar errores manuscritos como contenido;
- no presentar correcciones personales como ejemplos públicos;
- no inventar procedimientos escolares ausentes;
- no cambiar la convención de redondeo mostrada por la fuente;
- no afirmar que el PDF es un libro oficial de 6.º si esa procedencia no está demostrada;
- conservar que es material de estudio utilizado en el contexto de Matemáticas 6.º aportado por la familia;
- página 14 en blanco: no genera contenido.

---

## 17. Integración en Matemáticas

Añadir el Tema al catálogo real:

`cursos/6to/mates/temas-matematicas.js`

Título recomendado:

**Números hasta 100 000**

Descripción orientativa:

> Construye números, descubre qué cifra manda, avanza con saltos y aprende a redondear viendo dónde está cada número.

No alterar ni degradar `Fracciones`, `Puente 5.º→6.º` ni el piloto de problemas.

Reutilizar:

- portal de Matemáticas;
- motor académico compartido;
- sesiones/evidencias;
- voz;
- navegación/Panel;
- Misiones;
- histórico;
- Vista previa familiar/profesional;
- refuerzos y Análisis Educativo.

---

## 18. Criterios de aceptación

La candidata se considera lista cuando:

1. existe un único Tema canónico `Números hasta 100 000` en Matemáticas 6.º;
2. cubre los cuatro núcleos aprobados sin añadir contenido ajeno como si proviniera de la fuente;
3. el Resumen comunica `Construyo → Comparo → Salto → Aproximo`;
4. valor posicional se aprende mediante una experiencia manipulable/accesible, no solo texto;
5. comparar hace visible la primera cifra diferente;
6. series permiten experimentar +100/-100/+1 000/-1 000 y comprender qué cambia;
7. redondeo se apoya en distancia/recta numérica y explica el punto medio;
8. las ayudas son progresivas y no revelan la solución demasiado pronto;
9. existen ejercicios variados y reintentables;
10. el feedback orienta el razonamiento;
11. la experiencia transmite `Disfrutar Aprendiendo` sin gamificación excesiva;
12. el diseño iguala o supera las ayudas visuales del material fuente;
13. teclado, foco, contraste, reduced-motion y responsive están validados;
14. funciona en 1440/1024/768/390/320 px sin overflow;
15. la Prueba usa el motor académico vigente y genera evidencia estructurada;
16. alumno, familia y profesional respetan sus contratos de escritura/consulta vigentes;
17. no se crea persistencia privada innecesaria;
18. no hay regresión en Fracciones ni en otros módulos de Matemáticas;
19. se realiza revisión visual real de las cuatro experiencias y de móvil antes de presentar al Product Owner;
20. se compara explícitamente cada recurso visual relevante del PDF frente a la solución Academia;
21. la documentación y HandOff reflejan el estado real;
22. no se declara estable antes del uso real.

---

## 19. Revisión visual obligatoria

Antes de `YA PUEDES PROBAR`, Desarrollo debe mirar el producto renderizado y responder internamente:

> **¿Esto invita a tocar, probar y descubrir, o parece una ficha escolar trasladada a HTML?**

> **¿Cada interacción ayuda a comprender algo matemático?**

> **¿Una alumna puede equivocarse y saber qué mirar después sin sentirse bloqueada?**

> **¿El resultado es visualmente al menos tan útil como las tablas, fichas y rectas del material fuente?**

Si alguna respuesta es negativa, refinar antes de entregar.

---

## 20. Estado y siguiente paso

**DECISIÓN: APROBADO PARA DESARROLLO.**

Crear el nuevo Tema `Matemáticas 6.º · Números hasta 100 000` sobre el material escaneado, con la filosofía `Disfrutar Aprendiendo` y las cuatro experiencias propietarias:

- 🧱 Construye el número;
- 🔍 Detective de números;
- 🚀 Saltos numéricos;
- 🧲 El imán del redondeo.

La implementación debe reutilizar la arquitectura académica vigente, conservar la fuente escolar y generar evidencia mediante el motor existente. No declarar estabilidad hasta validación real.