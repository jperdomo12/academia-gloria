# Matemáticas 6.º · Números hasta 100 000
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-MATEMATICAS_6TO_NUMEROS_HASTA_100000.md` |
| **Versión** | 1.1 |
| **Estado** | Candidata implementada y validada en desarrollo · publicación y uso real pendientes |
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
| 1.1 | 28/10/2026 | Product Owner + AI Collaborator | Implementa el Tema canónico: cuatro experiencias, teoría manipulable/voz, seis fichas, 36 retos variados y Prueba de 12 familias/48 variantes con evidencia compartida. Registra revisión de las 17 páginas, reutilización mínima, comparación visual, validaciones y límites. Pendiente publicación/verificación y uso real; no estable. |
| 1.0 | 28/10/2026 | Product Owner + AI Collaborator | Aprueba el nuevo Tema `Números hasta 100 000` a partir de 17 páginas escaneadas de material de estudio, con cuatro núcleos: valor posicional/lectura-escritura, comparación-orden, series y redondeo. Fija el principio de experiencia `Disfrutar Aprendiendo`, cuatro experiencias interactivas propias, práctica progresiva y prueba con evidencia académica reutilizando el motor vigente. |

---

## Resumen de contenido

| Apartado | Contenido |
|---|---|
| 1–4 | Decisión, fuente, filosofía y arquitectura aprobadas. |
| 5–8 | Cuatro experiencias: construcción, comparación, saltos y aproximación. |
| 9–12 | Teoría, fichas, práctica y motivación. |
| 13–17 | Prueba, accesibilidad, fidelidad e integración académica. |
| 18–19 | Criterios de aceptación y revisión visual. |
| 20 | Estado operativo vigente. |
| 21 | Implementación, trazabilidad de 17 páginas, contratos, pruebas y límites. |

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

**DECISIÓN FUNCIONAL APROBADA · CANDIDATA IMPLEMENTADA EN DESARROLLO.**

Tema canónico en `cursos/6to/mates/numeros-hasta-100000/`, catálogo de Matemáticas ampliado sin cambiar Fracciones/Puente/piloto. Base `main` `c382e18a54f4c115af5e0b2857b3e51f5d5c3d01` (#211), rama `feat/mates-numeros-100000`. El encargo autoriza implementación, PR, revisión y publicación/verificación autónomas para revisión final. Pendientes: revisión final del diff, integración/publicación/verificación y uso real. No declarar estabilidad.

## 21. Implementación real y validación · 28/10/2026

### 21.1 Fuente examinada y privacidad

Se revisaron visualmente las **17 páginas renderizadas**, sin depender de OCR. Página 14 en blanco, sin actividad derivada. El escaneo aportado contiene 17 páginas, SHA-256 `f2216814ea8dcd98448b8d89d8f156ee3196abf53a86f6868fae06db8c25029a`. No se publica el PDF ni sus imágenes: contiene anotaciones personales ajenas al contenido curricular. No se copian respuestas manuscritas, correcciones o valoraciones ni se infiere un diagnóstico.

Los ejemplos y procedimientos provienen del texto/diagramas impresos, conforme a la decisión §2. No se atribuye al documento una editorial, autoría o procedencia oficial de libro de 6.º no demostrada. El Tema se incorpora al contexto académico de 6.º aprobado por Product Owner.

| Página PDF | Contenido impreso revisado | Función conservada / implementación |
|---|---|---|
| 1 | Representación de 59 725 con fichas y cinco columnas | Tablero DM/UM/C/D/U con cantidades, valores y manipulación accesible. |
| 2 | Descomposición, valor de cada cifra y lectura de 59 725 | Número, lectura escrita y sumandos actualizados; retos de valor/lectura/descomposición. |
| 3 | Equivalencia de DM y millares; representación y 25 612 | Agrupación alternativa en millares y construcción; no se usan los resultados manuscritos. |
| 4 | 68 001, cantidades representadas, valor de 5 y lectura/cifras | Ceros intermedios, representación/valor y conversión de palabras a cifras. No se reproduce el cheque como imagen personal. |
| 5 | Comparación 25 000 / 32 000 mediante fichas/posiciones | Dos filas alineadas y búsqueda guiada desde la izquierda. |
| 6 | Comparación en recta y ordenación | Recta con referencias, práctica de orden, mayor/menor y localización; no se transcriben cifras borrosas dudosas. |
| 7 | 63 398 / 62 431 y decisión en UM; recta 62 000–64 000 | Detector detiene la investigación en la primera diferencia; dos marcadores en la misma escala. |
| 8 | Orden ascendente/descendente y comparaciones | Elegir secuencias sin drag & drop; intruso y variantes de orden/primera diferencia. |
| 9 | 97 000 + 1 000, fichas posicionales y saltos sobre recta | Anticipación opcional, controles de salto, camino de últimos pasos y posiciones actualizadas. |
| 10 | 53 600 − 100; práctica de cambios de 10/100/1 000 | Cuatro controles principales ±100/±1 000; un reto breve de +10 conserva esa extensión impresa sin añadir otro motor. |
| 11 | Redondeo de 2 078 al millar por cercanía | Recta con dos vecinos, decisión y distancias. |
| 12 | 2 508 y caso de mitad 2 500 | Imán, punto medio y convención explícita del superior. |
| 13 | Aplicaciones de aproximación a distancias | Mismo razonamiento con ejemplos numéricos legibles de la fuente; no se convierten anotaciones/mapa poco legible en hechos geográficos nuevos. |
| 14 | Blanco | No genera contenido. |
| 15 | 4 218 a la decena; signo de aproximación | Selector de unidad visible y número ≈ vecino elegido. |
| 16 | 4 218/3 255 a centena/decena; 1 250 a centena y mitad | Tres unidades, comparación de distancias y casos de mitad explícitos. |
| 17 | 2 139/2 017/9 985 a distintas unidades | Práctica/variantes de aproximación y llevadas hacia otro orden; sin reproducir soluciones manuscritas. |

**Apoyos propios de Academia**, derivados de los procedimientos y separados de la fuente: detector progresivo, anticipación del salto, metáfora del imán, intruso, tres rondas, ejemplos distintos en pistas y feedback, etiquetas A/B en rectas, microcelebraciones y variantes numéricas. No se presentan como transcripción literal del colegio.

### 21.2 Arquitectura mínima y reutilización

- Portal/catalogo real de Matemáticas: añade un único registro a `temas-matematicas.js`, sin modificar el registro de Fracciones ni las rutas de Puente/piloto. Misma tarjeta/retorno del portal compartido. No es Plan Semanal.
- Nueve archivos del Tema: `index.html`, `numeros.css`, `numeros.js`, `numeros-modelo.js`, `numeros-visuales.js`, `exploradores.js`, `practica.js`, `practica-data.js`, `numeros-data.js`. Matemática pura, representaciones y contenido separados; mismas representaciones para exploración y práctica. Sin dependencias de producción añadidas.
- Navegación/Panel/Persona Activa/favicon reutilizados. Cinco secciones Resumen/Teoría/Fichas/Práctica/Prueba. El mapa conceptual usa cuatro pasos equivalentes por su semántica aprobada, excepción deliberada a tres columnas de un catálogo genérico; Fichas usa rejilla 3/2/1. La cabecera se compacta al estudiar para acercar los controles en móvil.
- Prueba mediante **`iniciarTemaVerbal` existente**, ya compartido por otros contenidos. Extensión compatible: práctica opcional (vacía por defecto), para poder reutilizar la Prueba sin imponer su presentador de selección simple a la práctica manipulativa. Tres bindings toleran la ausencia de esos controles y el render inicial solo se ejecuta si hay práctica. Los consumidores anteriores mantienen su lista y comportamiento.
- El mismo motor admite un segmento temporal opcional, conservando el valor anterior por defecto; el Tema usa `prueba-numeros-hasta-100000`. Restaura el texto original del botón de inicio; estados accesibles de pestaña y scroll respetan movimiento reducido. Una opción compatible reenvía configuración al celebrador existente: el Tema carga su CSS y usa cierre de 1,8 s sin guacamayas ni partículas; los consumidores anteriores conservan sus valores por defecto. No se duplica corrección, permisos, selección reciente, resultados, guardado o celebración final.
- El cargador existente de Misiones reconoce imports de catálogos con `?v=` además de `.js`, conservando la validación de origen. Necesario para el catálogo de Matemáticas versionado; no es otro catálogo. Registro de cuatro bloques en `refuerzos-academicos.js` a partir de la misma metadata.
- Caché: portal importa `temas-matematicas.js?v=2`; adaptador del Tema importa motor `?v=2`; Gestión importa refuerzos `?v=4` y estos catálogo `?v=4`. Nuevos archivos no sustituyen rutas publicadas anteriores.

### 21.3 Experiencias y variedad

| Experiencia | Comportamiento real y ayuda |
|---|---|
| Construyo | Botones +/− por posición, suma/resta de su valor con cambios de orden, entrada de otro número, lectura española y descomposición dinámicas. Agrupación opcional en millares muestra la equivalencia 1 DM = 10 UM. El límite 100 000 se presenta como cien mil = 10 DM, sin fingir que sus seis cifras caben en cinco columnas; se puede volver escribiendo otro número. Ceros y fronteras controlados. |
| Comparo | Dos entradas; pista DM, luego UM, etc. Se detiene en la primera diferencia, muestra por qué y la resalta. Igualdad y 100 000 se explican sin índices inválidos. Recta con dos marcadores y leyenda en la misma escala. |
| Salto | Seleccionar ±100/±1 000 no revela inmediatamente: permite anticipar y luego Ver el salto. Número, recorrido y posiciones cambian juntos. Explica qué posiciones cambian; bloquea salidas fuera de 0–100 000. No cronómetro. |
| Aproximo | Decena/centena/millar siempre visibles. Recta con límites, mitad y número; elegir vecino, comprobar distancias, representar la aproximación. Botón para experimentar una mitad. Pistas: vecinos → punto medio → distancias → explicación explícita. Reintento libre y caso de múltiplo exacto, incluido 100 000. |

Teoría breve conectada a cada experiencia; Escuchar idea mediante LectorTexto en español. Seis fichas de consulta con respuesta cerrada, abiertas por botón/teclado. **36 retos**, doce por ronda Calentamiento/Entrenamiento/Reto, tres por núcleo: construir, escribir valor/parte, comparar, ordenar tocando, localizar con slider, posición decisiva, intruso, saltos, series y aproximación. No se reduce toda la práctica a elegir entre respuestas.

Una respuesta errónea orienta sin puntuar ni bloquear. Tres pistas bajo demanda: pregunta orientadora → foco/segmentación o representación → ejemplo distinto. En construcción se destaca la primera posición a revisar; en valor, la columna; en redondeo aparece la mitad cuando se necesita. Después de las tres pistas hay una acción distinta **Ver solución explicada**, que no responde ni marca el reto automáticamente. Debe comprobarse el propio intento. Repetición libre; las rondas y sus respuestas viven solo en memoria, sin progreso persistente, nota, vidas ni límite de tiempo.

### 21.4 Prueba y evidencia académica

Actividad estable `6-mates-numeros-hasta-100000`, Matemáticas, Tema `Números hasta 100 000`, versión 1.0. **12 familias × 4 variantes = 48 preguntas**; cada ejecución elige 12, tres por cada bloque:

| Bloque | Familias |
|---|---|
| `valor-posicional` | valor de cifra; palabras → cifras; descomposición |
| `comparacion-orden` | primera diferencia; orden; localización en recta |
| `series` | ±100; ±1 000; continuar patrón |
| `redondeo` | decena; centena; millar, con variantes de mitad y cambio de orden |

Se barajan opciones y se evitan variantes de las últimas tres sesiones cuando hay alternativas. Feedback después de confirmar, sin pistas durante la Prueba. El resultado describe esta sesión, no una nota escolar ni dominio permanente.

Contrato `sesion-academica-v1` mediante `guardarSesionAcademica`: identidad activa, actor, contexto, tiempos, conceptos, variantes, respuestas/opción correcta/explicación, resumen por cuatro bloques y retroalimentación. Acceso libre guarda sesión normal; desde Misión referencia esa sesión en la evidencia compartida, sin duplicarla. Trabajo realizado/histórico/Análisis/refuerzos consumen el contrato vigente.

Alumno propio de 6.º: aprendizaje por defecto. Familia/profesional relacionados: Vista previa, sin escritura; forzar `modo=aprendizaje` no otorga permisos. Solo los permisos ya vigentes permiten cambiar el modo. Persona sin relación válida no obtiene acceso a los datos del alumno. Sin colecciones, APIs, Rules o persistencia privada nuevas.

### 21.5 Comparación visual PDF → Academia

| Recurso fuente y función | Solución Academia / juicio de Desarrollo |
|---|---|
| Fichas y colores hacen visible el valor posicional | Columnas que cambian con botones, valor real, suma y lectura simultáneos. Color acompañado por DM/UM/C/D/U, nombre y valor; en móvil hay leyenda legible. Mejora la relación causa/efecto y conserva las cinco posiciones. |
| Tabla de descomposición y equivalencia en millares | La misma cantidad se transforma en sumandos o agrupación en millares, sin perder ceros/valor. Mejora la comprobación inmediata. |
| Comparación cifra a cifra | Detector resalta la primera diferencia y detiene la búsqueda. La siguiente columna solo aparece como pista cuando las anteriores coinciden. Mayor claridad que la respuesta escrita estática. |
| Rectas y flechas de salto | Escalas proporcionales, números de referencia y leyendas A/B; recorrido y posiciones cambian al comprobar la anticipación. Conserva localización/dirección y añade exploración repetible. |
| Rectas de redondeo y puntos medios | Dos vecinos, punto medio, posición y distancias explícitas; varias unidades y mitad experimentable. No sustituye la distancia por la regla 0–4/5–9. |
| Ejemplos y práctica impresos | Idea breve → visual → manipulación → reto; tres rondas variadas, pistas y reintentos. La Prueba no sustituye el estudio; ofrece una fotografía analizable. |

Revisión renderizada real: Resumen, cuatro experiencias, Fichas, variantes de Práctica/ayudas/feedback y Prueba/resultados en escritorio y móvil. Refinamientos: cabecera compacta fuera del Resumen, leyenda completa de posiciones en móvil y controles de al menos 44 px. Números con espacios entre millares incluso en cuatro cifras; sin desbordamiento en cinco anchos. La revisión de Desarrollo considera preservada y mejorada la función pedagógica de tablas/rectas; la motivación y comprensión reales siguen pendientes del uso familiar. No basta con este juicio para declarar estabilidad.

### 21.6 Pruebas, alcance y límites reales

- `tests/numeros-modelo.test.mjs`: seis pruebas de representación, lectura/entrada, comparación, saltos/fronteras, distancias/redondeo/mitad, variedad y coherencia de datos. Incluye ceros, igualdad, exactos, llevadas y 100 000; 36 retos/48 variantes y reparto de bloques comprobados.
- `tests/numeros-browser.cjs`: navegación portal/Tema y conservación de Fracciones; cuatro experiencias, anticipación, igualdad, cifras, suma/resta, fronteras, tres unidades/mitad/exactos, fichas por teclado; resuelve los 36 retos con comprobación/pistas/reintentos; Prueba, sesión, rotación de variantes, Misión/evidencia, histórico, catálogo, refuerzos y Análisis. Alumno/familia/profesional y relación inválida; preview/práctica sin escrituras educativas; voz es-ES controlada y funcionamiento sin síntesis. Reduced-motion, foco y targets, responsive 1440/1024/768/390/320. Regresión básica de Fracciones y carga de Puente/piloto, archivos originales sin alterar.
- `tests/nutricion-browser.cjs` superado para el consumidor anterior del motor compartido: práctica, prueba, cinco bloques/variantes/sesión, Misión, histórico, permisos, catálogo/refuerzo/Análisis y responsive.
- Sintaxis/imports/rutas/IDs y diff comprobados. Los tests usan Chromium y **SDK/identidad/audio simulados**; servicios, contratos y lógica del producto son reales. No certifican Rules desplegadas ni escrituras sobre cuentas reales. No se ha realizado audición física; la voz española reutiliza LectorTexto y es opcional.
- Consola del Tema sin errores JavaScript. En la regresión del consumidor anterior Nutrición, su celebración predeterminada solicita `assets/identidad/guacamayas/guacamaya-roja-posada-01.png`, y recibe un 404: recurso ajeno ausente ya en el baseline, no introducido por este Tema. El nuevo Tema no solicita esas imágenes; no se modifica el frente de assets ni se declara consola de todos los consumidores sin avisos. Las comprobaciones de sesiones y permisos simulados se completan pese a ese aviso.
- Pendiente validación de comprensión, disfrute y autonomía con Gloria/familia, y revisión autenticada de producción. No se declara estabilidad.
