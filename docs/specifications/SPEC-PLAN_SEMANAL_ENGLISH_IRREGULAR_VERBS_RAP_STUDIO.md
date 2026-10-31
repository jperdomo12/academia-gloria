# Plan Semanal · English · Irregular Verbs RAP · RAP Studio
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-PLAN_SEMANAL_ENGLISH_IRREGULAR_VERBS_RAP_STUDIO.md` |
| **Versión** | 1.5 |
| **Estado** | Integrada y publicada para revisión técnica · escucha humana pendiente · no lista para uso real |
| **Última actualización** | 31/10/2026 |
| **Propietario** | Experiencia curricular · Plan Semanal 6.º / English / Irregular Verbs RAP |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Preparación del reparto real, memorización, coordinación y toma de vídeo del RAP escolar, incluyendo beat instrumental opcional de ensayo |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/specifications/SPEC-PLAN_SEMANAL_ENGLISH_IRREGULAR_VERBS_RAP.md` | **Gobierna:** actividad escolar, letra canónica, 14 fragmentos, 94 líneas, 67 tríos, RAP Team, vídeo, Drive, fecha y límites. |
| `docs/specifications/SPEC-PLAN_SEMANAL_6TO.md` | Gobierna el patrón transversal de Plan Semanal. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | Gobierna fidelidad al material escolar y calidad pedagógica. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | Gobierna implementación, validación, PR, publicación y cierre. |

> Esta SPEC es **hija** de la SPEC principal del RAP. No duplica la letra escolar, los tríos verbales ni los enlaces oficiales. Toda representación de texto debe derivarse de `FRAGMENTOS_RAP` y de los parsers/ayudas ya existentes.

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.5 | 31/10/2026 | Product Owner + AI Collaborator | Solicitud de uso: acompañar explícitamente la lectura completa con beat en ambos órdenes, con paradas independientes y cancelación conjunta por contexto. Conserva exclusión para pronunciación individual; candidata probada, pendiente publicación y escucha perceptiva conjunta. |
| 1.4 | 31/10/2026 | Product Owner + AI Collaborator | Ajustes #217 integrados/publicados en 1472f09c…; Pages #826 success y siete archivos modificados públicos idénticos al árbol probado, fuente intacta. Cierra publicación; conserva escucha perceptiva del nuevo nivel y uso real, sin estabilidad. |
| 1.3 | 31/10/2026 | Product Owner + AI Collaborator | Ajuste solicitado tras uso real: escuchar cada parte completa mediante secuencia cancelable del lector existente y mayor techo de volumen del beat. Pruebas de 94 líneas, cancelación/errores y captura nativa al máximo sin clipping; candidata para verificar publicación y balance perceptivo. |
| 1.2 | 31/10/2026 | Product Owner + AI Collaborator | #215 integrada en b6b67ee6…; Pages #824 success y nueve archivos modificados públicos idénticos al árbol probado, fuente intacta. Cierra integración/publicación técnica; conserva escucha humana/timestamps y uso real pendientes, sin declarar lista ni estable. |
| 1.1 | 31/10/2026 | Product Owner + AI Collaborator | Implementa RAP Studio dentro de Graba, reparto derivado 15/31/21, tres apoyos, relevos, beat local opcional y toma externa. Registra pruebas/visual/nativo, fidelidad y límites: sin timestamps publicados ni escucha humana superada; no lista para uso real. |
| 1.0 | 31/10/2026 | Product Owner + AI Collaborator | Decisión aprobada en Análisis: preparar reparto, memorización, relevos y toma externa con beat instrumental propio opcional, sin medios ni persistencia. |

## Resumen de contenido

| Apartado | Contenido |
|---|---|
| 1–4 | Necesidad, fuentes, reparto y decisión aprobada. |
| 5–9 | Memorización, relevos, vídeo, beat, toma y continuidad de RAP Team. |
| 10–14 | Privacidad, accesibilidad, aceptación y validación. |
| 15 | Implementación real, archivos, trazabilidad, pruebas y límites de la candidata. |

## 1. Origen de la necesidad

Durante el uso real se confirma que la tarea no consiste solo en repasar irregular verbs: el producto escolar final es un **vídeo del RAP** y el grupo de tres compañeras debe cubrir entre las tres todo el texto.

El grupo ha decidido organizar el RAP en **tres tramos continuos**. La posibilidad de que cada compañera grabe su tramo por separado y después se unan los clips es una **estrategia del grupo**, no una instrucción explícita del colegio.

RAP Team sigue siendo útil para aprender, pronunciar, descubrir rimas y practicar en igualdad. Sin embargo, no representa por sí solo el reparto real de la grabación porque sus roles Base / Past / Participle son una **técnica de entrenamiento**, no el reparto final de la letra.

La nueva necesidad es:

> ayudar a pasar de **aprender los verbos** a **dominar el tramo asignado, coordinar los cambios y preparar una buena toma de vídeo**.

## 2. Hechos y límites

### 2.1 Hechos confirmados

- la tarea escolar mantiene el RAP completo y el vídeo oficial como referencia de ritmo e interpretación;
- el grupo está formado por tres compañeras;
- el texto se ha repartido en tres tramos continuos que, juntos, cubren todo el RAP;
- el reparto real no coincide con Voz A / Voz B / Voz C de RAP Team;
- el grupo contempla como opción grabar cada tramo por separado y unir posteriormente los tres clips;
- existe una transcripción del vídeo oficial con marcas temporales que permite acotar la ubicación de los fragmentos;
- esa transcripción contiene errores automáticos de palabras y **no sustituye** la letra canónica del documento escolar.

### 2.2 Fuente de verdad

- **Letra y formas verbales:** `FRAGMENTOS_RAP` / documento escolar.
- **Ritmo e interpretación:** vídeo oficial del colegio.
- **Timestamps:** solo se usarán cuando el comienzo concreto haya sido verificado contra el vídeo; no inferir segundos intermedios.
- **Reparto:** metadatos de tres partes que referencian posiciones de la letra canónica; nunca una segunda copia completa del texto.

### 2.3 Privacidad

No publicar en código, documentación o interfaz los nombres de las otras compañeras menores.

La experiencia usa únicamente:

- `Parte 1`;
- `Parte 2`;
- `Parte 3`;
- y, de forma opcional y efímera, `Mi parte` para la parte seleccionada durante la sesión.

No guardar nombres, reparto personal ni selección de parte en persistencia educativa.

## 3. Reparto funcional aprobado

El reparto se representa mediante límites sobre la letra canónica:

| Parte | Inicio | Final | Tríos derivados |
|---|---|---|---:|
| **Parte 1** | `The microphone I take (took, taken).` | `Begin (began, begun).` | 15 |
| **Parte 2** | `Shoot (shot, shot)—` | `When I spit (spat, spat),` | 31 |
| **Parte 3** | `Never quit (quit, quit).` | `Now I go (went, gone).` | 21 |

Total: **67 tríos**, sin añadir, retirar o normalizar ninguna forma escolar.

Los conteos deben derivarse/validarse desde la fuente existente; no mantener otro banco manual de 67 tríos.

## 4. Decisión de producto · RAP Studio

Se aprueba una capa de preparación dentro de la ficha existente:

# 🎬 RAP Studio · Prepara vuestro vídeo

RAP Studio **no es otro Tema ni otro módulo independiente**. Debe integrarse en la experiencia actual del RAP, preferentemente como evolución del bloque escolar `Graba` y con acceso natural desde `Ensayo final` de RAP Team.

RAP Team responde principalmente:

> **¿Cómo aprendemos y practicamos los verbos y el RAP?**

RAP Studio responde:

> **¿Cómo preparamos nuestra parte y el vídeo que vamos a entregar?**

No duplicar modos de RAP Team cuando puedan enlazarse o reutilizarse.

## 5. Recorrido funcional

La experiencia debe comunicar de forma simple:

**🧠 APRENDO → 🎤 ENSAYO → 🔄 COORDINO → 🎵 RAP → 🎬 PREPARO MI TOMA**

No es un workflow obligatorio ni produce estado de completado.

### 5.1 Elegir parte

Mostrar tres partes equivalentes:

- `Parte 1 · take → begin`;
- `Parte 2 · shoot → spit`;
- `Parte 3 · quit → go`.

La alumna selecciona cuál va a ensayar. Puede marcarse visualmente como `Mi parte` durante la sesión, sin persistencia.

Mostrar de forma breve:

- primera frase;
- última frase;
- número de tríos;
- acceso a practicarla.

No mostrar nombres de compañeras.

### 5.2 Ensayar la parte

Para la parte seleccionada, derivar y presentar el texto original en bloques respirables, preservando sus frases y tríos.

Progresión de apoyo aprobada:

1. **👀 Texto completo** — letra completa de la parte;
2. **🧩 Con pistas** — reducir apoyo visual conservando anclas suficientes para recordar;
3. **🙈 Sin letra** — ocultar la letra y conservar solo señales mínimas de inicio/final o la acción para recuperarla.

Reglas:

- sin puntuación;
- sin porcentaje de dominio;
- sin bloquear el avance;
- siempre permitir volver a mostrar el texto;
- reutilizar pronunciación, significado y rimas existentes cuando aporten valor;
- evitar una segunda transcripción de la letra.

La implementación concreta de `Con pistas` debe ser determinista y derivada del texto; no generar dinámicamente contenido lingüístico nuevo.

### 5.3 Ensayo del relevo

Añadir una ayuda corta para las fronteras entre partes:

**Parte 1 → Parte 2**

- mostrar las últimas líneas de Parte 1;
- señalar el cambio;
- mostrar las primeras líneas de Parte 2;
- permitir una cuenta breve `3 · 2 · 1` para ensayar la entrada.

**Parte 2 → Parte 3**

Mismo patrón.

Objetivo: que una grabación conjunta pueda tener cambios naturales y que, si se graban clips separados, las niñas conozcan con precisión dónde termina y comienza cada tramo.

No calificar coordinación ni registrar resultados.

### 5.4 Vídeo oficial por tramo

RAP Studio debe facilitar pasar del texto al ritmo real.

Acción objetivo:

`🎵 Escuchar esta parte en el vídeo del cole ↗`

Reglas:

- usar exclusivamente el vídeo oficial ya registrado en la SPEC principal;
- enlazar con `t=` solo después de verificar manualmente el segundo exacto de inicio de cada parte;
- no inferir timestamps por interpolación entre bloques de transcripción;
- el primer inicio dispone de evidencia directa `00:03`, pero todos los inicios usados en producto deben verificarse igualmente en el vídeo;
- no intentar embeber, descargar, copiar o recortar el vídeo si no aporta valor claro;
- la voz sintética de Academia ayuda a pronunciación; el vídeo escolar sigue siendo autoridad para ritmo e interpretación.

## 6. Beat de ensayo aprobado

Se aprueba un **beat RAP instrumental opcional**, sin letra, para practicar dentro de Academia.

### 6.1 Propósito

El beat ayuda a:

- mantener un pulso estable;
- practicar el texto sin reproducir continuamente el vídeo completo;
- hacer varias repeticiones de una misma parte;
- ensayar entradas y relevos;
- usar una cuenta de entrada consistente;
- y, si el grupo graba clips separados, facilitar que las tres practiquen con un pulso comparable.

El beat **no es la música oficial de la tarea** y no sustituye el vídeo del colegio.

### 6.2 Origen del sonido

Preferencia aprobada:

- beat **propio de Academia**, generado localmente en el navegador mediante sonidos percutivos simples;
- sin canción comercial;
- sin letra;
- sin copiar ni extraer la pista musical del vídeo oficial;
- sin depender de un servicio externo de música;
- sin almacenar audio de las alumnas.

Desarrollo debe priorizar una implementación sencilla y mantenible, por ejemplo Web Audio API si resulta robusta en los navegadores objetivo.

### 6.3 Controles mínimos

El beat debe tener, como mínimo:

- `▶ Empezar beat`;
- `■ Parar`;
- cuenta de entrada clara, preferentemente cuatro pulsos;
- volumen propio o una forma simple de evitar que domine las voces;
- pulso visual accesible además del sonido.

Puede añadirse una segunda velocidad de práctica si aporta valor y se valida; no inventar que una velocidad concreta coincide con el vídeo oficial.

No autoplay.

### 6.4 Relación con la grabación

La interfaz debe explicar de forma breve:

> El beat es para ensayar. El vídeo del cole marca el ritmo final.

Si el grupo decide dejar el beat audible durante una grabación, es una decisión creativa del grupo. Academia no afirma que el colegio exija música de fondo.

Si las tres graban clips separados, usar el mismo beat y la misma cuenta de entrada puede ayudar a mantener un tempo parecido, pero **no garantiza sincronización exacta de los vídeos**.

## 7. Preparar la toma

RAP Studio puede ofrecer una tarjeta breve de preparación de grabación, sin grabar desde Academia.

Contenido orientativo:

- recordar primera frase y última frase de la parte;
- cámara estable;
- comprobar que se escucha bien la voz;
- dejar un pequeño margen antes y después de hablar si van a editar clips;
- usar el mismo formato/orientación acordado por el grupo;
- hacer una toma de prueba antes de la definitiva.

La ayuda debe ser práctica y breve, no un tutorial audiovisual extenso.

Puede existir una acción `3 · 2 · 1 · 🎬` como cuenta previa visual/sonora para comenzar una toma externa.

## 8. Edición y unión de vídeos

### 8.1 Fuera del alcance inicial

La primera versión **no** debe:

- grabar vídeo dentro de Academia;
- solicitar cámara o micrófono;
- subir vídeos a Academia;
- almacenar clips;
- editar, recortar o unir automáticamente los tres vídeos;
- exportar un vídeo final.

La complejidad de formatos, dispositivos, orientación, resolución, audio y exportación no está justificada antes de comprobar el uso real de la capa de preparación.

### 8.2 Evolución posible

Después del uso real, si unir los tres clips aparece como problema relevante, podrá estudiarse una herramienta local y acotada de ensamblaje, siempre con análisis específico de privacidad, compatibilidad, rendimiento y utilidad.

No anticipar esa funcionalidad en esta implementación.

## 9. Integración con RAP Team

Mantener íntegramente:

- Modo trío;
- Ritmo;
- Call & Response;
- Random RAP;
- Retos;
- Ensayo final;
- pronunciación;
- significado;
- familias sonoras;
- `Verbos → Cadena → RAP`;
- tres voces equivalentes y roles rotatorios como entrenamiento.

Añadir un puente claro desde `Ensayo final` hacia RAP Studio, sin hacer creer que los roles A/B/C son el reparto del vídeo.

Microcopy recomendada:

> En RAP Team repartís las formas para practicar. En RAP Studio ensayáis el tramo real que os corresponde en el vídeo.

## 10. Privacidad, datos y persistencia

- no nombres de compañeras en repositorio o UI pública;
- no nueva colección Firestore;
- no nueva evidencia académica;
- no puntuación, ranking ni nota;
- no cámara, micrófono ni reconocimiento de voz;
- no almacenamiento de vídeo/audio;
- selección de parte, modo de apoyo y beat: efímeros;
- no cambiar permisos o Rules.

## 11. Accesibilidad y UX

- experiencia comprensible sin leer documentación externa;
- objetivo de cada control visible;
- teclado y foco;
- controles táctiles adecuados;
- pulso visual además del sonido;
- `prefers-reduced-motion` respetado;
- no depender del color como única señal;
- responsive 320–1440 px;
- el beat nunca debe impedir usar RAP Studio si Web Audio no está disponible;
- si falla el beat, texto, pronunciación y vídeo oficial siguen disponibles.

## 12. Criterios de aceptación

La implementación será candidata cuando:

1. RAP Studio se integra en la ficha existente sin crear otro Tema o ruta innecesaria;
2. queda clara la diferencia entre RAP Team y el reparto real de la grabación;
3. existen Parte 1, Parte 2 y Parte 3 sin nombres de compañeras;
4. los límites de cada parte coinciden exactamente con la letra canónica;
5. los conteos 15 / 31 / 21 se derivan o validan desde los 67 tríos existentes;
6. `FRAGMENTOS_RAP` sigue siendo la única letra escolar;
7. se puede ensayar una parte con texto completo, pistas y sin letra;
8. existe apoyo para los dos relevos entre partes;
9. cualquier timestamp publicado fue verificado contra el vídeo oficial y no inferido;
10. el vídeo oficial sigue siendo referencia final de ritmo e interpretación;
11. existe beat instrumental propio, opcional y sin letra, con inicio/parada y cuenta de entrada;
12. el beat no usa música comercial ni audio extraído del vídeo del colegio;
13. el beat tiene alternativa visual y degradación segura si no hay audio compatible;
14. la interfaz aclara que el beat es de ensayo y no un requisito escolar;
15. se ofrece preparación breve de toma sin usar cámara/micrófono desde Academia;
16. no se implementa todavía edición/unión/exportación de vídeo;
17. no hay persistencia, evidencia, puntuación ni datos personales nuevos;
18. RAP Team conserva sus seis modos y ayudas sin regresión;
19. Escucha, Practica, Aprende, Graba, Entrega, vídeo, Drive, fecha y patrón escolar siguen intactos;
20. pruebas funcionales, responsive, teclado, foco, reduced-motion y cancelación del beat se validan;
21. se realiza una prueba auditiva humana del beat y de su convivencia con voz/pronunciación antes de declarar la evolución lista para uso real;
22. el uso real del grupo permanece pendiente antes de declarar estabilidad.

## 13. Validación esperada en Desarrollo

Desarrollo debe verificar al menos:

- derivación exacta de las tres partes desde `FRAGMENTOS_RAP`;
- ningún nombre personal en el diff;
- 15 + 31 + 21 = 67 tríos;
- fronteras `begin → shoot` y `spit → quit`;
- selección de parte y modos de apoyo;
- relevos y cuenta atrás;
- timestamps exactos mediante comprobación real del vídeo antes de publicar enlaces con `t=`;
- beat: comienzo, parada, cuenta de entrada, repetición, cancelación al cambiar de sección/ocultar página/salir;
- convivencia del beat con Web Speech: evitar solapamientos confusos y proporcionar parada clara;
- ausencia de autoplay;
- fallback sin Web Audio;
- cero escrituras educativas/Storage y cero APIs de cámara/micrófono;
- regresión completa de RAP Team y de la ficha escolar;
- revisión visual desktop/móvil;
- escucha humana real del beat y del balance de uso.

## 14. Decisión

**APROBADO PARA DESARROLLO.**

Se aprueba **RAP Studio** como evolución aditiva de la actividad `Irregular Verbs RAP` para ayudar al grupo a preparar el producto escolar real: elegir/ensayar su tramo, reducir progresivamente el apoyo de la letra, practicar relevos, volver al vídeo oficial y preparar una toma externa.

Se aprueba además un **beat RAP instrumental propio de Academia**, opcional, sin letra y generado/reproducido localmente para ensayo. El beat no sustituye el vídeo oficial ni se presenta como requisito de la tarea.

La primera implementación **no graba, almacena, edita ni une vídeos**. Esa capacidad solo podrá evaluarse después del uso real si aparece como necesidad concreta.

## 15. Implementación técnica · 31/10/2026

Base canónica `main` `656644301f808afca8a172e55e76945cb00bc656`, SPEC 1.0 aprobada. Rama `feat/rap-studio`. El encargo autoriza PR, revisión, integración y publicación autónomas para revisión, sin una segunda aprobación de alcance. **Esa autorización no equivale a haber superado la escucha humana ni a declarar la evolución lista para uso real.**

### 15.1 Reutilización y fidelidad

- Una sola ruta: la ficha semanal existente. `#rapStudio` dentro de `#graba`, después de las opciones escolares Solo/pareja/trío/otras clases. Acceso desde Ensayo final. La entrega conserva vídeo/Drive, fecha 10/11/2026 y patrón exacto `6A/B/C_WP_NAMES_RAP`.
- `rap-studio-data.js` usa posiciones sobre `FRAGMENTOS_RAP`: inicios en fragmento 1/línea 1, fragmento 4/línea 4 y fragmento 11/línea 1 (lectura humana, índices internos desde cero). Corta por líneas, no por tríos: conserva las líneas intermedias sin verbo. Devuelve 16/47/31 líneas (94 total), 4/7/4 bloques respirables y valida 15/31/21 tríos (67 total) con `extraerTrios`; el cambio de fuente que invalide el reparto falla explícitamente, sin ajustar límites silenciosamente.
- `rap-data.js`, `trios.js`, glosas, familias y `fragmentos.js` intactos. No hay segunda letra ni banco de 67 verbos. `pistaLineaRap` conserva la base y conectores y oculta pasado/participio; líneas sin trío dejan primera palabra + puntos. Determinista, sin contenido lingüístico generado. Sin letra retira los bloques, deja solo inicio/final y recuperación explícita.
- Escuchar bloque delega a `textoParaEscuchar` y `prepararVozRap` → `LectorTexto`. Una acción vuelve al primer trío de la parte en RAP Team para practicar formas/significado/rimas existentes, sin duplicar ese panel ni sus metadatos. El pequeño contrato de retorno de Team permite detenerlo y elegir un trío; conserva sus seis modos.
- Selección/apoyo/cuentas/volumen solo en memoria. No nuevas llamadas a Firestore/Storage, evidencia, cámara, micrófono, grabación o reconocimiento. No nombres de compañeras. La navegación/identidad global conserva sus escrituras de contexto ya existentes; Studio no persiste parte, reparto o resultados.

### 15.2 Beat y cancelación

`rap-beat.js` genera bombo (oscilador sinusoidal con caída de frecuencia), caja y plato (ruido filtrado), y una cuenta previa de cuatro pulsos. Ruido generado localmente; ninguna muestra, canción, servicio musical o extracción del vídeo. Un tempo de ensayo: **84 pulsos/min**, rotulado sin atribuirlo al vídeo. Volumen inicial 35 %, ajustable hasta silencio.

Contexto creado únicamente al pulsar Empezar, reutilizado tras parada, con resume/suspend serializados y token que invalida inicios tardíos. Scheduler de 25 ms con horizonte de 100 ms sobre reloj Web Audio, subdivisiones de corchea, visuales sincronizados a los pulsos programados; no se reproducen ráfagas de pulsos atrasados. Parar silencia salida, detiene fuentes programadas, borra scheduler/visuales y suspende el contexto. No autoplay.

La falta de API o un fallo de inicio ofrece cuenta/pulso visual, sin bloquear texto, voz o vídeo. Una interrupción del contexto detiene el ensayo e informa cómo retomarlo. Se cancelan beat/cuentas al cambiar parte, seguir enlaces de sección/externos, usar Team, ocultar pestaña, salir del área (IntersectionObserver) o `pagehide`.

`rap-voz.js` emite `rap:antes-voz` solo antes de una escucha válida. Studio detiene beat/cuentas antes de pronunciación individual de Team o Studio. Empezar beat detiene esa pronunciación y relojes de Team; la lectura completa admite acompañamiento intencional según §15.8. La cancelación por navegación se ejecuta en captura antes del nuevo control, para no cancelar por bubbling una pronunciación recién iniciada. Parada de Studio no cancela una voz ajena si no tiene una emisión propia activa.

Los relevos ofrecen las dos últimas/primeras líneas originales, cambio de voz y cuenta 3/2/1: sigue pulsos del beat activo o segundos si está parado. La toma ofrece lista breve, inicio/final y cuenta visual 3/2/1/🎬; detiene el beat para la toma externa. No hay estado de completado ni valoración.

Referencias técnicas: [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) y [AudioScheduledSourceNode.stop](https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode/stop). La API no sustituye la validación auditiva.

### 15.3 Vídeo y timestamps · límite explícito

Se mantiene exclusivamente `https://www.youtube.com/watch?v=NTspOI05mJw`, leído del enlace escolar existente; abre en otra pestaña con noopener/noreferrer. **No se publica ningún `t=`**, ni siquiera 00:03: no se ha podido verificar humanamente el segundo de inicio de las tres partes en el vídeo. La consulta del vídeo mediante la herramienta web de Desarrollo no pudo recuperarlo. No se usó ni interpoló la transcripción automática.

La acción abre el vídeo completo y pide buscar la frase inicial de la parte. Es útil como acceso al ritmo oficial; **no se presenta como enlace temporal ya verificado**. Queda pendiente esa mejora acotada cuando los segundos puedan comprobarse realmente. Drive, permisos y subida escolar reales no se certifican por el test que controla la apertura de pestañas.

### 15.4 Pruebas y revisión visual

Se amplía `tests/plan-semanal-rap-browser.cjs`, conservando la regresión de ficha/Team y los tres roles con SDK/identidad simulados. Comprueba reparto/fuente de 94 líneas, 15/31/21 y fronteras begin→shoot/spit→quit; correspondencia completa/pistas/ocultación/recuperación; puente desde Ensayo final y vuelta al trío correcto; relevos/cuentas; beat/scheduler/volumen/parada/cancelación por contexto y resume tardío; cuenta de cuatro pulsos; ausencia de autoplay; API ausente y resume fallido; exclusión con voz; cero escrituras educativas y cero acceso a medios. Las escrituras legítimas de navegación/Persona Activa global se distinguen de persistencia de Studio.

Responsive 320/390/768/1024/1440, botones/enlaces/summary/range de al menos 44 px, teclado/foco visible, reduced-motion, sin overflow. Revisión renderizada real de selección, parte con letra, pistas/sin letra, beat, relevos y preparación de toma, en desktop y móvil. Rejilla 3→2→1: en móvil estrecho se usa una columna deliberadamente por las frases completas de inicio/final (no tarjetas de catálogo compactas). Se reutilizan colores/Outfit/estilos de tríos de la ficha; los detalles de coordinación/toma empiezan plegados.

Prueba adicional con **Web Audio nativa en Chromium/Linux**, sin mock del motor: nueve segundos de cuenta + beat, salida capturada solo por QA mediante MediaStreamDestination, sin entrada de micrófono ni audio personal; resume/suspend reales y señal no silenciosa. La captura de QA no forma parte de Academia ni se guarda en el repositorio. No certifica balance perceptivo o calidad musical.

**ESCUCHA HUMANA PENDIENTE.** Este entorno permite generar/capturar señal pero no escucharla humanamente. No se afirma que el beat suene bien, que el volumen resulte equilibrado con voces reales o que su convivencia perceptiva con pronunciación esté validada. Los mocks prueban exclusión de reproducción y eventos; la señal nativa prueba generación, no audición. Antes de declarar listo para uso real hay que escuchar beat/cuenta/volumen/parada y alternar con pronunciación en el navegador real. El vídeo sigue siendo autoridad para ritmo final. Conserva también la escucha pendiente de ayudas de RAP Team documentada en la SPEC principal.

Implementación técnica candidata; **no lista para uso real hasta realizar esa escucha; no estable hasta validar el uso real del grupo.** La disponibilidad de la revisión/merge/Pages se registra en la PR y en el HandOff, sin convertir publicación en aceptación auditiva.

### 15.5 Integración y publicación verificadas

[PR #215](https://github.com/jperdomo12/academia-gloria/pull/215) revisada e integrada, dentro de la autorización expresa del encargo. Head probado `d48ccfb81c1293d428cda88bc42199cf24177cde`, árbol `e3c7ed9b2711ea25b2e32e1468d6b25add554634`, merge `b6b67ee6d08f85072cd6e6ed2625dedb2c1b1c9d`. Pages **#824**, run `41211251812`, `success`. Nueve archivos modificados de producto HTTP 200 e idénticos byte a byte al árbol probado; `rap-data.js` público también HTTP 200 e intacto (diez comprobaciones). Caché coherente: HTML → `rap.js?v=5` → `rap-team.js?v=4` → `rap-apoyos.js?v=3` → `rap-voz.js?v=2`; Studio reutiliza las mismas referencias.

Archivos exactos de producto, todos bajo `cursos/6to/plan-semanal/english-irregular-verbs-rap/`: `index.html`, `rap.js`, `rap-team.js`, `rap-apoyos.js`, `rap-voz.js`, `rap-beat.js`, `rap-studio-data.js`, `rap-studio.js`, `rap-studio.css`. Test ampliado: `tests/plan-semanal-rap-browser.cjs`. Documentación: esta SPEC, la SPEC principal y HandOff; trece archivos totales en #215.

Comprobación renderizada adicional del hostname/subruta de Pages con assets del mismo árbol e identidad/SDK simulados: imports, selección y apoyos funcionan bajo `/academia-gloria`. El intento de navegador público directo en Chromium de Desarrollo recibió `ERR_EMPTY_RESPONSE`; por eso no se presenta como navegación pública autenticada. La verificación HTTP/bytes publicada, el render local y la simulación de subruta son evidencias diferentes.

**Sin implementación/integración/publicación técnica pendiente de #215.** Pendientes reales: escucha humana del beat/cuenta/volumen/parada y alternancia con voz; segundos del vídeo antes de añadir enlaces temporales; después, utilidad/autonomía del grupo. La publicación facilita revisión técnica/adulta y no satisface el criterio auditivo §12.21: **no lista para uso real ni estable**. Conservar todos los pendientes previos de la SPEC principal.

### 15.6 Ajustes tras revisión del Product Owner · escucha completa y volumen

El Product Owner valora positivamente Studio y solicita escuchar completos los tres tramos y aumentar el volumen máximo del beat. Se mantienen **Parte 1 / Parte 2 / Parte 3**, sin introducir otra clasificación A/B/C que pueda confundirse con las voces de Team.

- `studioParteAudio` ofrece **Escuchar Parte N completa** junto a Detener voz/estado, antes del beat. Disponible también Con pistas/Sin letra. Deriva todas las líneas de la parte (16/47/31) y usa `textoParaEscuchar`, sin otra letra ni otra voz. La lectura no es una interpretación musical: el vídeo sigue marcando el RAP.
- `prepararVozRap.escucharSecuencia` encadena locuciones cortas línea a línea mediante LectorTexto, evitando una única locución larga. Reutiliza selección de voz/velocidad, estado y token de cancelación. Un final cancelado, un error o un cambio de parte no puede reactivar la cola. Las emisiones simples anteriores llaman al mismo contrato con una sola entrada. En #217, empezar beat cancelaba la parte y escuchar la parte detenía el beat; esa exclusión de la lectura completa evoluciona por solicitud del Product Owner en §15.8. La pronunciación individual mantiene su exclusión.
- Beat: se elimina la atenuación fija adicional `×0.35`; el rango 0–100 y el inicio en 35 permanecen. A igual posición, amplitud ×2.857 (aprox. +9.1 dB), también en el máximo. No cambia percusión/tempo/cuenta ni se añade música. Captura nativa Chromium de 9 segundos al 100 %: pico **−2.7 dBFS**, media **−24.3 dBFS**, sin recorte en esa captura. Esto no certifica calidad percibida o todos los dispositivos.
- Suite RAP/Studio superada: lectura exacta/en orden de las 94 líneas en las tres partes, incluido apoyo Sin letra; parada/cambio/beat/error con final tardío; ganancia 1 al 100 y 0 al mínimo. Conserva regresión Team, medios/persistencia, cinco anchos y accesibilidad. Revisión renderizada de controles completos desktop/móvil. SDK/identidad/voz controlados; prueba de beat nativa separada.

Fuente/parser/glosas/familias/vídeo/Drive/fecha/patrón intactos. Caché: `rap.js?v=6`, Team `?v=5`, apoyos `?v=4`, voz `?v=3`, Studio `?v=2`, beat `?v=2`. Continúan pendientes la escucha humana del **nuevo** volumen/balance y los segundos del vídeo; no se declara estabilidad ni se convierte la valoración positiva en una prueba auditiva completa.

### 15.7 Publicación de los ajustes

[PR #217](https://github.com/jperdomo12/academia-gloria/pull/217) integrada en `1472f09c6f1fc16b585b844bfd06f0491cab1cbd`, head probado `84ffb3a413d85b454d0f7e63ec38b332c8fb7d3c`, árbol `0a240cb87bd2ce0131c2be66ab7742850a68cad8`. Pages **#826**, run `41216925677`, `success`. Siete archivos modificados de producto HTTP 200 e idénticos al árbol probado, con las referencias de caché de §15.6; tres comprobaciones adicionales de Studio data/CSS/fuente escolar intactos. Sin implementación/integración/publicación pendiente del ajuste. Se conserva escucha perceptiva del nuevo volumen/balance/voz y uso real antes de estabilidad.

Archivos de producto de #217, bajo la misma carpeta RAP: `index.html`, `rap.js`, `rap-team.js`, `rap-apoyos.js`, `rap-voz.js`, `rap-studio.js`, `rap-beat.js`. Además, test RAP y tres documentos (esta SPEC, principal, HandOff); once archivos exactos en la PR. No se publican audios de QA ni se modifica la fuente escolar o los timestamps.

### 15.8 Acompañamiento intencional de lectura completa · 31/10/2026

El Product Owner solicita activar el beat mientras escucha el texto completo. Se incorpora como decisión de uso: **lectura completa de una parte + beat opcional**, conservando la referencia musical del vídeo y sin prometer sincronización del habla con el pulso.

- Mientras se reproduce una parte, el botón pasa a **Añadir beat a la lectura** (o añadir pulso visual si no hay Web Audio). Se puede arrancar voz→beat o beat→voz. No hay autoplay.
- Detener voz no para el beat; Parar beat no cancela la cola de lectura. Al terminar la lectura el beat continúa para practicar, hasta pararlo o abandonar el contexto. La UI lo explica y mantiene ambos controles separados y el volumen del beat accesible.
- `escucharSecuencia(textos, { conBeat: true })` expresa la intención de acompañamiento en el evento existente `rap:antes-voz`. Solo la acción de escuchar la parte completa usa esa opción. Locuciones individuales/bloques y RAP Team mantienen el valor predeterminado falso: detienen el beat para oír pronunciación. No se añade otro sintetizador ni cola.
- Antes de iniciar lectura completa se cancelan voz/relojes de Team; añadir beat a esa lectura ya activa no vuelve a cancelar el lector global. Final/error/parada restablecen el estado de lectura; callbacks tardíos no reactivan la cola. Cambio de parte/sección, ocultación, salida del área y pagehide siguen cancelando ambos sonidos/cuentas.
- Fuente, límites/67 tríos, vídeo/Drive/fecha/patrón, tempo/percusión/ganancia del beat y no persistencia/medios intactos. Caché: `rap.js?v=7`, Team `?v=6`, apoyos `?v=5`, voz `?v=4`, Studio `?v=3`; beat `?v=2` sin cambios.

Suite RAP/Studio superada en tres roles simulados; pruebas nuevas de ambos órdenes, continuidad entre líneas con beat, paradas independientes, beat que sigue tras finalizar la parte, y cancelación conjunta al cambiar/ocultar/salir, junto a regresión de pronunciación individual/Team y 320–1440/teclado/reduced-motion. Revisión renderizada de ayuda/controles desktop/móvil y etiqueta dinámica. Prueba adicional: beat Web Audio nativo activo durante nueve segundos con la cola de voz **controlada por QA**, sin suspensión accidental; parada del beat conserva la lectura. Esa voz controlada **no es una mezcla de voz real capturada ni una prueba auditiva**.

**Pendiente de escucha humana conjunta** para valorar balance/claridad en dispositivo real. La lectura sintética no canta ni se adapta al tempo. No se declara lista para uso real ni estable por superar tests de estados; se conserva el gate auditivo y el uso real del grupo, sin timestamps inventados.
