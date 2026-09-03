# Product Identity, Visual Language and Official Characters
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` |
| **Versión** | 1.1 |
| **Estado** | Activo |
| **Fecha de origen** | 03/08/2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Identidad del Producto |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Identidad visual y emocional, momentos de experiencia, Personajes Oficiales, assets de identidad y reglas de evolución |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Fundamenta:** propósito humano estable de la Academia. |
| `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` | **Gobierna:** identidad, valores y principios que este documento expresa visual y emocionalmente. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna/complementa:** actores, dominios y momentos de experiencia que la identidad acompaña. |
| `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` | **Propietario de mecánica:** reglas, concesión y evolución del Sistema de Motivación y Reconocimiento. |
| `docs/project/DECISION_LOG.md` | **Gobierna/complementa:** decisiones transversales vigentes, incluida la decisión de no implantar por ahora un catálogo desacoplado de assets. |
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** propiedad, ubicación y evolución del conocimiento documental. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** estructura, trazabilidad y mantenimiento del documento. |
| `docs/vision/06_IDENTIDAD_VISUAL_DE_LA_ACADEMIA.md` | **Fundamenta/complementa:** conserva la visión previa de identidad visual. |
| `docs/vision/07_IDENTIDAD_GUACAMAYAS.md` | **Fundamenta/complementa:** conserva origen y simbolismo previo de las guacamayas. |
| `assets/identidad/guacamayas/` | **Implementa parcialmente:** familia gráfica de guacamayas disponible en el repositorio. |
| `assets/imagenes/personajes/` | **Implementa parcialmente:** recursos gráficos asociados a personajes. |
| `assets/imagenes/mi-camino/` | **Implementa parcialmente:** escenas e ilustraciones de identidad usadas por Mi Camino. |
| `assets/iconos/` | **Implementa:** activos institucionales e ilustraciones compactas de módulos. |

---

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 04/09/2026 | Product Owner + AI Collaborator | Versión aprobada y activa tras sincronización P1. Resuelve la incoherencia de estado de v1.0; actualiza Lía, Guacamayas y Recompensas contra el producto real; mantiene el modelo semántico como lenguaje conceptual pero pospone catálogo/resolver técnico; elimina conteos no verificados de assets; incorpora reglas de familia visual, peso óptico y validación a tamaño real derivadas de la portada actual. |
| 1.0 | 03/08/2026 | Juan Perdomo + IA | Documento aprobado como primera versión activa del modelo de Identidad Visual y Personajes Oficiales. |
| 1.0-rc2 | 03/08/2026 | Juan Perdomo + IA | Candidato previo cuya cabecera quedó sin sincronizar después de la aprobación de v1.0. |

---

## Índice

1. Propósito
2. Alcance
3. Pregunta principal
4. Principio central
5. Modelo de identidad
6. Identidad visual de la Academia
7. Lenguaje emocional
8. Momentos de experiencia
9. Personajes Oficiales
10. Lía
11. Las guacamayas
12. Símbolos permanentes
13. Activos institucionales
14. Sistema de reconocimiento
15. Assets oficiales
16. Semántica de identidad y catálogo técnico
17. Auditoría del inventario existente
18. Evolución de referencias gráficas
19. Generación y evolución mediante IA
20. Accesibilidad y experiencia multidispositivo
21. Gobierno y mantenimiento
22. Riesgos
23. Criterios de calidad
24. Hoja de evolución
25. Declaración de identidad

---

## 1. Propósito

Definir cómo la **Academia Gloria Valentina** convierte su ADN en una identidad visual y emocional coherente.

Este documento establece:

- qué debe transmitir la identidad;
- cómo se relacionan emociones y momentos de experiencia;
- qué es un Personaje Oficial;
- qué papel cumplen Lía y las guacamayas;
- cómo se seleccionan, reutilizan y validan los assets;
- cómo se conserva la intención aunque cambie una ilustración concreta;
- y cómo puede evolucionar la identidad sin perder su esencia.

No es un catálogo de dibujos ni una obligación de crear infraestructura para cada recurso visual.

Es el documento propietario del **lenguaje visual y emocional del producto**.

---

## 2. Alcance

Este documento gobierna:

- principios de identidad visual;
- lenguaje emocional;
- símbolos permanentes;
- momentos de experiencia;
- categoría de Personajes Oficiales;
- funciones de Lía y las guacamayas;
- reglas de selección, reutilización y uso;
- criterios visuales comunes entre módulos;
- reglas de sustitución;
- y evolución de la identidad.

Quedan fuera de su alcance:

- diseño detallado de componentes;
- tokens CSS;
- tamaños exactos de cada pantalla;
- contratos de API;
- implementación técnica de carga de assets;
- prompts completos de generación;
- animaciones específicas;
- derechos y licencias de cada recurso;
- y mecánica completa de Recompensas/Reconocimientos.

La mecánica de Motivación y Reconocimiento pertenece a su documento de diseño propietario. Este documento gobierna únicamente su **expresión visual y emocional**.

---

## 3. Pregunta principal

> **¿Cómo utiliza la Academia su identidad visual y sus Personajes Oficiales para acompañar los momentos del alumno y transmitir emociones coherentes con el ADN del producto?**

---

## 4. Principio central

> **La identidad visual no existe para decorar pantallas. Existe para ayudar a construir una experiencia que el alumno pueda sentir como suya.**

La Academia no comienza seleccionando una ilustración.

Comienza identificando:

1. el momento que vive el alumno;
2. la emoción que necesita acompañarse;
3. la intención del producto;
4. el personaje, símbolo o familia visual más adecuada;
5. y, finalmente, el asset que lo representa.

```text
IDENTIDAD
    ↓
MOMENTO DE EXPERIENCIA
    ↓
EMOCIÓN E INTENCIÓN
    ↓
PERSONAJE / SÍMBOLO / FAMILIA VISUAL
    ↓
ASSET ADECUADO
    ↓
ARCHIVO ACTUAL
```

El archivo puede cambiar.

La intención debe permanecer reconocible.

---

## 5. Modelo de identidad

La identidad se organiza en seis capas:

```text
ADN DEL PRODUCTO
        │
        ▼
PRINCIPIOS DE IDENTIDAD
        │
        ▼
LENGUAJE EMOCIONAL
        │
        ▼
MOMENTOS DE EXPERIENCIA
        │
        ▼
PERSONAJES Y SÍMBOLOS
        │
        ▼
ASSETS Y ARCHIVOS
```

### 5.1 ADN del Producto

Define quién es la Academia y qué no debe perder.

### 5.2 Principios de identidad

Definen qué sensaciones y valores deben reconocerse en toda experiencia.

### 5.3 Lenguaje emocional

Define qué emoción necesita acompañarse y con qué intensidad.

### 5.4 Momentos de experiencia

Definen cuándo necesita el producto expresar esa emoción.

### 5.5 Personajes y símbolos

Representan la intención de forma cercana, reconocible y coherente.

### 5.6 Assets y archivos

Materializan temporalmente esa representación en PNG, WebP, SVG, audio, animación u otros formatos.

La existencia de esta jerarquía conceptual **no obliga** a introducir una capa técnica adicional cuando una referencia directa sea más simple y mantenible.

---

## 6. Identidad visual de la Academia

La Academia debe sentirse:

- alegre;
- tranquila;
- curiosa;
- creativa;
- segura;
- cercana;
- acogedora;
- clara;
- y esperanzadora.

Nunca debe sentirse:

- fría;
- saturada;
- agresiva;
- excesivamente infantil;
- competitiva;
- punitiva;
- o parecida a una plataforma de exámenes.

### 6.1 Alegría

Los colores pueden ser vivos, pero deben conservar suavidad y equilibrio.

La alegría visual no exige saturación permanente.

### 6.2 Claridad

La identidad nunca debe dificultar lectura, navegación o comprensión.

### 6.3 Espacio

La composición debe respirar.

Los personajes e ilustraciones no deben llenar todo espacio disponible.

### 6.4 Cercanía

La comunicación debe sentirse personal sin convertirse en invasiva.

### 6.5 Coherencia

Cada módulo debe reconocerse como parte de la misma Academia, incluso cuando cambie su contenido.

### 6.6 Legibilidad

La tipografía debe ser moderna, amable y fácil de leer.

La legibilidad tiene prioridad sobre la originalidad gráfica.

### 6.7 Ilustración

Las ilustraciones deben favorecer:

- formas suaves;
- expresiones positivas;
- fondos limpios;
- buena lectura a diferentes tamaños;
- y coherencia entre familias visuales.

No se mezclarán estilos gráficos sin una decisión justificada.

### 6.8 Familia visual y peso óptico

Cuando varias ilustraciones aparecen como un conjunto —por ejemplo, tarjetas equivalentes de navegación— deben compartir:

- lenguaje de ilustración;
- alineación;
- espacio reservado comparable;
- nivel de detalle compatible con el tamaño final;
- y **peso óptico equivalente**.

Esto no significa forzar el mismo ancho o alto de archivo.

Dos assets con dimensiones idénticas pueden sentirse muy diferentes si uno tiene mucho espacio vacío o demasiados elementos internos. La normalización debe hacerse por **percepción en contexto**, no solo por píxeles.

Una ilustración compleja puede necesitar mostrarse ligeramente más pequeña que otra sencilla para evitar dominar el conjunto.

### 6.9 Nivel de detalle según tamaño final

Un asset que funciona como ilustración grande puede fallar como icono de tarjeta.

Antes de aprobarlo debe comprobarse que, al tamaño real:

- la idea principal siga siendo reconocible;
- el detalle secundario no genere ruido;
- el texto incluido en la propia imagen no sea necesario para comprenderla;
- y no compita con el título o descripción de la interfaz.

---

## 7. Lenguaje emocional

El lenguaje emocional es el conjunto de emociones que la Academia decide transmitir conscientemente.

| Emoción | Intención del producto | Evitar |
|---|---|---|
| Curiosidad | Invitar a descubrir | Sobrecargar o prometer demasiado |
| Alegría | Hacer agradable el aprendizaje | Exageración permanente |
| Confianza | Transmitir que el alumno puede avanzar | Falsa seguridad |
| Calma | Reducir presión ante una dificultad | Minimizar el esfuerzo |
| Motivación | Ayudar a comenzar o continuar | Manipulación |
| Perseverancia | Animar a volver a intentarlo | Culpa |
| Celebración | Reconocer progreso y esfuerzo | Competición |
| Libertad | Recordar que cada alumno puede encontrar su camino | Falta de estructura |
| Pertenencia | Hacer sentir que la Academia también es su espacio | Apropiación invasiva |
| Esperanza | Mostrar que siempre existe un próximo paso | Promesas irreales |
| Autonomía | Reforzar la capacidad de actuar por sí mismo | Abandono sin ayuda |

### 7.1 Intensidad emocional

No todos los momentos requieren la misma intensidad.

La identidad distingue entre:

- **presencia suave:** acompañamiento discreto;
- **presencia media:** orientación o motivación;
- **presencia destacada:** bienvenida, cierre o celebración relevante.

La celebración permanente pierde significado.

---

## 8. Momentos de experiencia

Un momento de experiencia es una situación reconocible del recorrido del alumno que puede necesitar acompañamiento visual o emocional.

### 8.1 Vocabulario semántico inicial

Los siguientes identificadores se conservan como **vocabulario conceptual**, útil para razonar y documentar la intención. No constituyen un contrato de software ni obligan a crear un archivo JSON.

| ID semántico | Momento | Emoción principal | Intención |
|---|---|---|---|
| `academy.discovery.primary` | Descubrir la Academia | Curiosidad · Confianza | Invitar a conocer el producto |
| `academy.welcome.primary` | Bienvenida | Alegría · Pertenencia | Hacer sentir al alumno esperado |
| `journey.continue.primary` | Continuar la aventura | Motivación · Movimiento | Ayudar a retomar el camino |
| `mission.start.primary` | Iniciar una Misión | Curiosidad · Confianza | Reducir la fricción de comenzar |
| `mission.progress.primary` | Avanzar en una Misión | Perseverancia | Mostrar que cada paso cuenta |
| `mission.complete.primary` | Completar una Misión | Celebración | Reconocer esfuerzo y finalización |
| `learning.thinking.primary` | Pensar o resolver | Calma · Curiosidad | Dar espacio al razonamiento |
| `learning.help.primary` | Pedir ayuda | Seguridad · Confianza | Normalizar la solicitud de apoyo |
| `learning.retry.primary` | Volver a intentarlo | Calma · Perseverancia | Animar sin juzgar |
| `reading.practice.primary` | Practicar lectura o dicción | Confianza · Concentración | Acompañar la expresión oral |
| `achievement.primary` | Logro relevante | Orgullo sereno · Celebración | Hacer visible el crecimiento |
| `return.primary` | Regresar a la Academia | Alegría · Pertenencia | Generar ilusión por continuar |
| `rest.primary` | Pausa o descanso | Calma | Evitar saturación |
| `adventure.discovery.primary` | Descubrir una aventura | Curiosidad · Libertad | Abrir una experiencia contextual |

Este vocabulario no obliga a crear un asset diferente para cada momento.

### 8.2 Principio de necesidad

Solo se incorpora un asset cuando:

- el momento es real;
- la emoción necesita apoyo;
- el recurso aporta valor;
- y no existe otro recurso adecuado.

### 8.3 Ubicación frente a intención

Cuando se utilicen identificadores conceptuales, deben describir intención y no coordenadas de pantalla.

Evitar:

```text
home.header.macaw
mission.page.right
```

Preferir:

```text
academy.discovery.primary
journey.continue.primary
mission.complete.primary
learning.retry.primary
```

La ubicación puede cambiar. La intención permanece.

---

## 9. Personajes Oficiales

Un Personaje Oficial es una figura con identidad y función reconocibles dentro de la experiencia.

No todo dibujo es un personaje.

Para ser oficial debe:

- representar valores del ADN;
- cumplir una función definida;
- tener momentos de uso coherentes;
- respetar el lenguaje emocional;
- mantener una identidad reconocible;
- y haber sido aprobado por el Product Owner/Arquitectura del Producto.

### 9.1 Funciones permitidas

Puede:

- acompañar;
- orientar;
- invitar;
- observar;
- animar;
- celebrar;
- recordar;
- y ayudar a construir pertenencia.

### 9.2 Funciones no permitidas

No debe:

- resolver por el alumno;
- sustituir a la familia o al docente;
- aparecer constantemente;
- interrumpir sin necesidad;
- presionar;
- ridiculizar;
- culpabilizar;
- ni dominar la interfaz.

### 9.3 Categoría abierta

La Academia puede incorporar, evolucionar o retirar personajes si existe una necesidad real, se preserva la identidad y la decisión tiene trazabilidad.

---

## 10. Lía

Lía es el **Personaje Oficial de acompañamiento inteligente**.

Representa:

- guía;
- cercanía;
- ayuda gradual;
- claridad;
- y confianza.

Lía puede aparecer cuando el alumno necesita:

- comprender una instrucción;
- conocer el siguiente paso;
- recibir una pista;
- practicar;
- interpretar su progreso;
- o recibir un reconocimiento automático sustentado por una regla suficientemente fiable.

Lía no debe convertirse en:

- una profesora que monopoliza la experiencia;
- una voz que habla continuamente;
- una autoridad punitiva;
- ni la representación de toda la IA del sistema.

La IA es una capacidad transversal.

Lía es una de sus expresiones cercanas dentro del producto.

### 10.1 Estado visual actual

La **función de Lía está consolidada**, pero su representación visual todavía no está unificada en toda la Academia.

El repositorio dispone de:

```text
assets/imagenes/personajes/lia.png
```

Sin embargo, existen experiencias que presentan mensajes explícitos de Lía mediante otros recursos visuales; por ejemplo, Mi Rincón de Lectura muestra `✨ Lía dice...` mientras actualmente acompaña ese bloque con un avatar `🦉`.

Por tanto:

- no se declara todavía una única silueta/animal/imagen como representación universal de Lía;
- no se presupone que una guacamaya roja represente a Lía;
- las variantes existentes deben evaluarse por contexto antes de unificarlas;
- una futura consolidación visual debe reutilizar lo existente cuando sea suficiente y evitar una migración masiva sin beneficio real.

### 10.2 Color y personaje

El color por sí solo no define la personalidad ni la responsabilidad de un personaje.

Una variante cromática puede ayudar a diferenciar usos, pero no debe convertirse en una regla arbitraria.

---

## 11. Las guacamayas

### 11.1 Origen

Las guacamayas nacen de una experiencia familiar real en Caracas durante 2026.

Después de más de diez años sin regresar a Venezuela, una pareja de guacamayas sobrevolaba cada mañana el entorno del apartamento familiar.

La imagen quedó asociada a:

- tranquilidad;
- belleza;
- raíces;
- reencuentro;
- libertad;
- y esperanza.

La Academia convierte ese recuerdo en parte de su identidad.

### 11.2 Significado

Representan:

- curiosidad;
- alegría;
- libertad;
- crecimiento;
- inteligencia;
- esperanza;
- raíces;
- familia;
- y capacidad de descubrir las propias alas.

No representan:

- competición;
- presión;
- superioridad;
- perfección;
- ni premio material.

### 11.3 Filosofía

> **Pequeñas compañeras de viaje.**

Aparecen en momentos especiales para acompañar, animar y celebrar.

No ofrecen respuestas: recuerdan que cada persona puede descubrir sus propias alas.

### 11.4 Personalidad

Las guacamayas:

- no hablan demasiado;
- no interrumpen constantemente;
- acompañan;
- observan;
- celebran;
- animan;
- aparecen cuando aportan significado;
- y continúan su vuelo.

### 11.5 Estado actual

Las guacamayas siguen siendo una de las principales familias visuales de acompañamiento emocional de la Academia y, desde Recompensas V1, también representan **hitos especiales** dentro de `Mi Camino → Así voy creciendo`.

El repositorio conserva varias representaciones activas y otras explícitamente separadas bajo `No usadas/`. La mera existencia física de un archivo no significa que esté aprobado para cualquier contexto.

### 11.6 Guacamayas de Reconocimiento V1

El sistema actual contempla seis categorías humanas de Guacamaya:

- Valiente;
- Alas Propias;
- Curiosa;
- Pensadora;
- de Equipo;
- de Crecimiento.

Este documento gobierna su **significado y representación visual**.

Las reglas de concesión, unicidad, confirmación humana y persistencia pertenecen a `DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` y a la implementación vigente.

Las categorías no deben presentarse como:

- ranking;
- colección obligatoria;
- `x/6`;
- requisito para “subir de nivel”;
- ni comparación entre alumnos.

---

## 12. Símbolos permanentes

Los personajes conviven con símbolos visuales.

### 12.1 Arcoíris

Representa esperanza, diversidad, aprendizaje, nuevos comienzos y continuidad de identidad.

### 12.2 Estrellas

Representan pequeños logros, ilusión, reconocimiento y celebración.

Nunca deben expresar superioridad frente a otros alumnos.

### 12.3 Libros

Representan imaginación, conocimiento, lectura y descubrimiento.

### 12.4 Piezas

Representan comprender, relacionar, descubrir y resolver.

### 12.5 Raíces familiares

España representa el presente y el futuro.

Venezuela representa las raíces.

La Academia puede incorporar homenajes sutiles —guacamayas, referencias naturales o siluetas reconocibles— cuando tengan sentido y no como decoración arbitraria.

---

## 13. Activos institucionales

Los activos institucionales identifican a la Academia como producto.

No son necesariamente Personajes Oficiales ni participan siempre en el lenguaje emocional de una experiencia.

Incluyen:

- icono principal;
- favicon;
- iconos para accesos directos;
- futuros iconos de manifest/PWA;
- logotipo, si se consolida;
- y variantes institucionales justificadas.

### 13.1 Icono principal y favicon

El activo oficial actual es:

```text
assets/iconos/icono-principal.png
```

Debe seguir siendo la referencia institucional por defecto salvo decisión explícita posterior.

### 13.2 Ilustraciones compactas de módulos

`assets/iconos/` también contiene ilustraciones compactas de acceso, como las utilizadas actualmente por Calendarios, Mi Baúl y Adicionales en la portada.

Aunque se almacenen junto a iconos institucionales, su función puede ser **experiencial/navegacional** y por tanto deben respetar las reglas de familia visual y peso óptico de este documento.

### 13.3 Responsabilidad

Los activos institucionales deben:

- ser reconocibles a tamaños pequeños;
- mantener coherencia global;
- conservar rutas suficientemente estables;
- utilizarse uniformemente cuando cumplen la misma función;
- y evitar duplicados activos sin necesidad.

### 13.4 Alcance del inventario

Una revisión de identidad no debe limitarse a `assets/identidad/guacamayas/`.

Debe considerar, según el caso:

```text
assets/identidad/guacamayas/
assets/imagenes/personajes/
assets/imagenes/mi-camino/
assets/iconos/
```

además de referencias visuales embebidas en HTML/CSS.

---

## 14. Sistema de reconocimiento

El Sistema de Motivación y Reconocimiento **ya no es una posibilidad futura**: su V1 está operativa.

Este documento no redefine su mecánica.

Su responsabilidad es proteger la identidad visual y emocional con la que se presenta.

### 14.1 Qué debe expresar

Los Reconocimientos pueden celebrar:

- esfuerzo;
- constancia;
- curiosidad;
- autonomía;
- perseverancia;
- cooperación;
- uso constructivo de ayuda;
- y progreso personal.

### 14.2 Qué debe evitar

No deben generar:

- comparación;
- presión;
- miedo a perder;
- perfeccionismo;
- colección compulsiva;
- ni dependencia exclusiva de premios.

### 14.3 Jerarquía visual

Una celebración debe ser proporcional al significado del momento.

No todo reconocimiento necesita la misma intensidad visual que una Guacamaya.

La identidad debe permitir distinguir, sin convertirlo en una escala competitiva:

- reconocimiento cotidiano o moderado;
- hito especial;
- mensaje de constancia o crecimiento;
- celebración excepcional cuando realmente corresponda.

### 14.4 Propiedad separada

```text
Este documento
→ significado, tono, representación y coherencia visual

Diseño de Motivación y Reconocimiento
→ reglas, concesión, frecuencia, unicidad y evolución funcional
```

---

## 15. Assets oficiales

Un asset oficial es un recurso aprobado que materializa una intención de identidad.

Puede ser PNG, WebP, SVG, animación, audio, voz, icono, ilustración u otro recurso equivalente.

### 15.1 Intención frente a archivo

Conceptualmente:

```text
INTENCIÓN
mission.complete.primary
        ↓
FAMILIA / PERSONAJE ADECUADO
guacamaya
        ↓
ARCHIVO VIGENTE
ruta concreta aprobada
```

La intención no debe depender de un nombre de archivo accidental.

Sin embargo, **no es obligatorio introducir un resolver técnico** para lograr esa separación conceptual.

### 15.2 Referencias directas válidas

Las rutas físicas directas son válidas cuando:

- el recurso tiene una responsabilidad clara;
- el nombre/ruta son suficientemente estables;
- la referencia no crea duplicación problemática;
- y sustituirla más adelante sería simple y controlable.

### 15.3 Reutilización

Un asset puede utilizarse en más de un lugar cuando la intención y el contexto sean compatibles.

No se reutiliza únicamente porque “queda bonito”.

### 15.4 Texto alternativo

Todo asset visible y significativo debe declarar una alternativa accesible adecuada.

Si es puramente decorativo, debe marcarse de forma que no añada ruido a tecnologías de asistencia.

---

## 16. Semántica de identidad y catálogo técnico

### 16.1 Decisión actual

La **semántica de identidad sigue vigente como herramienta conceptual**.

La propuesta técnica de crear:

```text
assets/identidad/identity-catalog.json
IdentityAssets.get(...)
```

queda **pospuesta**.

No existe actualmente una necesidad observada que compense la complejidad adicional de un catálogo/resolver global.

Esta decisión se alinea con `DECISION-015 · Catálogo de Assets desacoplado`, actualmente pospuesta.

### 16.2 Qué sí conservamos

Podemos seguir usando identificadores conceptuales como:

```text
academy.discovery.primary
journey.continue.primary
mission.complete.primary
```

para describir intención, comparar alternativas o documentar un uso.

No tienen que existir en código.

### 16.3 Cuándo reconsiderarlo

Un catálogo/resolver técnico solo se reabrirá si aparece una necesidad real, por ejemplo:

- volumen de assets difícil de mantener;
- sustituciones frecuentes en muchas pantallas;
- variantes dinámicas por contexto;
- accesibilidad centralizada que aporte beneficio tangible;
- o duplicación efectiva imposible de controlar con referencias simples.

Hasta entonces se favorece la solución más sencilla.

---

## 17. Auditoría del inventario existente

No se mantiene un conteo aproximado de archivos como dato normativo.

El repositorio cambia y un número sin auditoría específica queda obsoleto rápidamente.

### 17.1 Objetivos cuando se realice una auditoría

- inventariar recursos relevantes;
- identificar duplicados y variantes;
- diferenciar activos de `No usadas` o históricos;
- registrar dimensiones, formato y transparencia cuando importe;
- localizar usos actuales;
- relacionar uso con intención;
- valorar coherencia visual;
- detectar recursos sin uso;
- y decidir mantener, mejorar, sustituir, archivar o retirar del uso activo.

### 17.2 Matriz de auditoría

| Archivo | Uso real | Intención | Calidad | Coherencia | Estado | Acción |
|---|---|---|---|---|---|---|
| Por inventariar | Por localizar | Por definir | Por evaluar | Por evaluar | Activo / No usado / Histórico | Mantener / Mejorar / Sustituir / Archivar |

### 17.3 Criterio

Un archivo puede mantenerse cuando cumple una función clara, tiene calidad suficiente, funciona en contexto y no duplica innecesariamente otro recurso.

Un archivo puede retirarse del **uso activo** sin ser eliminado físicamente. Los originales y variantes pueden conservar valor histórico o de trabajo.

### 17.4 Auditoría proporcional

No es necesario abrir una auditoría completa para incorporar o ajustar una sola ilustración cuando:

- el alcance es claro;
- la familia visual ya existe;
- la modificación es reversible;
- y se ha verificado el contexto real.

La reciente armonización de los accesos de `Explora más` es un ejemplo de mejora visual pequeña que no justificaba construir antes una infraestructura global de assets.

---

## 18. Evolución de referencias gráficas

### 18.1 Principio

No existe una migración obligatoria de todos los HTML hacia un catálogo semántico.

Las referencias gráficas evolucionarán **solo cuando exista beneficio**.

### 18.2 Referencias actuales

La Academia utiliza una combinación legítima de:

- rutas directas en HTML;
- imágenes desde CSS;
- emojis/iconografía;
- recursos compartidos;
- y assets específicos de módulo.

### 18.3 Cuándo normalizar

Conviene normalizar una referencia cuando:

- existe duplicidad;
- varias pantallas deben compartir exactamente el mismo recurso;
- un activo institucional debe ser uniforme;
- una ruta heredada causa fallos;
- o una nueva familia visual requiere coherencia común.

### 18.4 No reemplazos ciegos

No se realizará un reemplazo global de rutas sin revisar cada contexto.

La misma imagen puede estar cumpliendo funciones distintas o ser adecuada en una pantalla y no en otra.

### 18.5 Reversibilidad

Los cambios visuales importantes deben poder revertirse sin afectar lógica, datos o navegación cuando su alcance es puramente visual.

---

## 19. Generación y evolución mediante IA

La IA puede ayudar a crear, adaptar y mejorar recursos.

No debe generar personajes o colecciones de variantes sin una necesidad previa.

### 19.1 Flujo recomendado

```text
NECESIDAD REAL
        ↓
MOMENTO Y EMOCIÓN
        ↓
INTENCIÓN
        ↓
FAMILIA / PERSONAJE ADECUADO
        ↓
GENERACIÓN O REUTILIZACIÓN
        ↓
REVISIÓN VISUAL
        ↓
PRUEBA EN CONTEXTO Y TAMAÑO REAL
        ↓
APROBACIÓN
        ↓
INCORPORACIÓN
```

### 19.2 Criterios de aprobación

Una ilustración generada se revisa por:

- coherencia con el ADN;
- estilo;
- expresión;
- postura;
- calidad;
- fondo/transparencia cuando corresponda;
- lectura a tamaño real;
- integración con la interfaz;
- peso óptico frente a elementos hermanos;
- accesibilidad;
- rendimiento razonable;
- y reacción real del alumno cuando sea posible.

### 19.3 Prueba en contexto obligatoria

Una imagen aislada puede parecer excelente y fallar dentro de una pantalla.

Debe probarse:

- con texto real;
- al tamaño real;
- dentro de la composición definitiva;
- en escritorio;
- y, cuando aplique, en tablet/iPad/móvil.

### 19.4 Variantes

Solo se crean variantes cuando cubren una necesidad diferente.

No se generan colecciones numerosas únicamente porque la tecnología lo permita.

---

## 20. Accesibilidad y experiencia multidispositivo

La identidad debe acompañar sin dificultar.

Los assets deben considerar:

- contraste;
- texto alternativo;
- escalabilidad;
- tamaño táctil cuando sean interactivos;
- carga y rendimiento;
- fondos correctos;
- y comportamiento en dispositivos táctiles.

Un personaje interactivo debe dejar claro que puede pulsarse.

La interacción mediante personaje nunca debe ser la única forma de acceder a una capacidad esencial sin alternativa accesible.

---

## 21. Gobierno y mantenimiento

### 21.1 Propiedad

Identidad/Arquitectura del Producto gobierna:

- principios;
- lenguaje emocional;
- momentos;
- personajes;
- familias visuales;
- y decisiones relevantes de evolución.

### 21.2 Operación

Desarrollo mantiene:

- archivos;
- rutas;
- optimización;
- carga;
- accesibilidad técnica;
- y reutilización de recursos.

No existe actualmente obligación de mantener un catálogo semántico técnico.

### 21.3 Aprobación

El **Product Owner** mantiene la decisión final sobre:

- incorporación de un Personaje Oficial;
- sustitución relevante;
- retiro del uso activo;
- nuevas familias visuales;
- y cambios de identidad de alto impacto.

La asignación de personas a roles se mantiene en `docs/project/PROJECT_ROLES.md`.

### 21.4 Eventos de revisión

Este documento se revisa cuando:

- cambia el ADN;
- nace una nueva familia de personajes;
- cambia significativamente el lenguaje visual;
- evoluciona materialmente el sistema de reconocimiento;
- se decide reabrir la arquitectura técnica de assets;
- o el producto demuestra que un principio ya no funciona.

No requiere nueva versión por cada PNG/WebP compatible.

---

## 22. Riesgos

### 22.1 Convertir personajes en decoración

**Riesgo:** saturación y pérdida de significado.  
**Mitigación:** exigir momento, emoción e intención.

### 22.2 Crear demasiados assets

**Riesgo:** inconsistencia, duplicidad y mantenimiento alto.  
**Mitigación:** reutilizar, auditar proporcionalmente y generar solo ante necesidad real.

### 22.3 Acoplar demasiadas pantallas a un recurso inestable

**Riesgo:** sustituciones costosas.  
**Mitigación:** nombres/rutas estables, reutilización compartida cuando aporte valor y reconsiderar un resolver solo si el problema aparece de verdad.

### 22.4 Añadir infraestructura de assets antes de necesitarla

**Riesgo:** complejidad sin beneficio.  
**Mitigación:** mantener pospuesto el catálogo/resolver hasta que exista un caso real que lo justifique.

### 22.5 Mezclar estilos o pesos visuales

**Riesgo:** pérdida de identidad o tarjetas visualmente desequilibradas.  
**Mitigación:** familias coherentes, peso óptico comparable y prueba en contexto.

### 22.6 Sobreutilizar Recompensas

**Riesgo:** motivación exclusivamente externa.  
**Mitigación:** reconocimiento proporcional, no transaccional y ligado a progreso real.

### 22.7 Confundir Lía con toda la IA

**Riesgo:** límites poco claros.  
**Mitigación:** separar capacidad técnica y representación del personaje.

### 22.8 Forzar una identidad visual de Lía antes de validarla

**Riesgo:** migración innecesaria e inconsistencia posterior.  
**Mitigación:** conservar su función estable, auditar usos reales y unificar solo cuando exista una representación claramente superior y útil.

### 22.9 Sustituir la identidad por tendencias

**Riesgo:** rediseños continuos.  
**Mitigación:** cambios justificados por beneficio real y reversibilidad.

---

## 23. Criterios de calidad

La identidad cumple su propósito cuando:

- se reconoce como parte de la Academia;
- acompaña sin distraer;
- refuerza el momento;
- transmite una emoción coherente;
- funciona a su tamaño real;
- mantiene equilibrio con elementos hermanos;
- es accesible;
- tiene un coste técnico razonable;
- puede evolucionar sin romper el producto;
- y provoca una respuesta positiva real cuando puede observarse.

Un asset no se aprueba únicamente porque sea bonito.

Debe ser **útil, coherente, oportuno y adecuado a su contexto**.

---

## 24. Hoja de evolución

Esta sección expresa direcciones posibles; no sustituye `ROADMAP.md` ni crea automáticamente trabajo prioritario.

### Corto plazo

- mantener coherencia de las familias visuales que ya están activas;
- consolidar nuevas ilustraciones solo mediante prueba a tamaño real;
- corregir usos claramente inconsistentes cuando aparezcan durante trabajo funcional;
- conservar la identidad de Recompensas/Guacamayas alineada con su diseño no transaccional;
- revisar la representación visual de Lía cuando exista una necesidad concreta que justifique unificarla.

### Medio plazo

- auditar inventarios de identidad si el volumen o la duplicación empiezan a dificultar mantenimiento;
- mejorar accesibilidad y rendimiento de assets pesados cuando sean prioritarios;
- retirar del uso activo variantes redundantes sin destruir fuentes históricas;
- documentar nuevas familias solo cuando realmente se incorporen al producto.

### Largo plazo

- incorporar nuevos personajes solo ante necesidad real;
- admitir variantes temáticas sin perder identidad;
- evolucionar hacia animaciones o audio cuando aporten valor;
- y mantener la identidad preparada para múltiples alumnos y etapas educativas.

### Decisión explícita sobre el catálogo técnico

`identity-catalog.json` y un resolver global **no forman parte de la hoja activa**.

Solo se reabrirán si una necesidad futura demuestra que su beneficio supera la complejidad.

---

## 25. Declaración de identidad

> **La Academia Gloria Valentina utiliza su identidad visual para acompañar, no para decorar.**

> **Cada personaje, símbolo e ilustración existe porque ayuda a expresar una intención del producto en un momento real del alumno.**

> **Las guacamayas conservan de forma especial la curiosidad, la alegría, la libertad, las raíces y el crecimiento; Lía conserva el papel de guía cercana aunque su representación gráfica todavía pueda evolucionar.**

> **La coherencia no exige que todas las imágenes sean iguales: exige que pertenezcan al mismo mundo, tengan un peso visual equilibrado y funcionen en el contexto real donde el alumno las ve.**

---

## Decisiones adoptadas y vigencia

| ID | Decisión | Vigencia 04/09/2026 | Impacto |
|---|---|---|---|
| PIVP-001 | Este documento es propietario del lenguaje visual y emocional del producto. | **Vigente** | Identidad del Producto |
| PIVP-002 | Diseñar identidad desde momentos y emociones, no desde decoración o ubicación. | **Vigente** | Experiencia · UX |
| PIVP-003 | Mantener Personajes Oficiales como categoría abierta. | **Vigente** | Evolución de Personajes |
| PIVP-004 | Reconocer a Lía como personaje de acompañamiento y diferenciarla de la IA técnica. | **Vigente** | IA · Acompañamiento |
| PIVP-005 | Mantener las guacamayas como familia visual relevante y conservar su origen familiar/venezolano. | **Vigente** | Identidad · Raíces |
| PIVP-006 | Separar conceptualmente intención y archivo físico. | **Vigente, sin exigir resolver técnico** | Arquitectura Visual |
| PIVP-007 | Crear un catálogo operativo global de assets. | **Pospuesta** | Assets · Mantenibilidad |
| PIVP-008 | Auditar antes de generar colecciones amplias de nuevas guacamayas. | **Vigente** | Calidad · Eficiencia |
| PIVP-009 | Exigir prueba en contexto y tamaño real, incluyendo tablet/iPad cuando aplique. | **Vigente** | UX · Multidispositivo |
| PIVP-010 | Este documento concentra la propiedad activa de identidad; los documentos de visión 06/07 permanecen como fundamento complementario. | **Vigente / evolucionada** | Gobierno Documental |
| PIVP-011 | Referenciar roles estables y mantener asignación nominal en `PROJECT_ROLES.md`. | **Vigente** | Gobierno del Producto |
| PIVP-012 | Clasificar favicon/icono principal y equivalentes como activos institucionales. | **Vigente** | Identidad Institucional |
| PIVP-013 | Auditar identidad en todas las ubicaciones reales, no solo en `assets/identidad/guacamayas/`. | **Vigente** | Inventario · Trazabilidad |
| PIVP-014 | Asociación automática “guacamaya roja = Lía”. | **No vigente**: no se adopta como identidad oficial. | Lía · Personajes |
| PIVP-015 | Migración progresiva obligatoria de HTML a un catálogo semántico. | **Pospuesta / no requerida** | Implementación |
| PIVP-016 | Normalizar conjuntos de ilustraciones por familia, alineación y peso óptico, no solo por dimensiones físicas. | **Vigente** | UX · Coherencia Visual |
| PIVP-017 | Separar identidad visual de Recompensas de sus reglas funcionales; no usar iconografía para crear ranking o colección obligatoria. | **Vigente** | Motivación · Identidad |
| PIVP-018 | Mantener Lía funcionalmente consolidada, pero no declarar una representación gráfica universal hasta que el producto la unifique y valide. | **Vigente** | Lía · Evolución Responsable |

---

## DECISIÓN DEL DOCUMENTO

| Campo | Valor |
|---|---|
| **Estado** | 🟢 Activo |
| **Versión vigente** | 1.1 |
| **Fecha** | 04/09/2026 |
| **Aprobado por** | Product Owner |
| **Sustituye** | `PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` v1.0 |
| **Sustituido por** | — |

**Impacto:** Identidad del Producto · Personajes Oficiales · Lía · Guacamayas · Recompensas · Activos Institucionales · Accesibilidad · Evolución Responsable