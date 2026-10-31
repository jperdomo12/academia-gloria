# Plan Semanal · English · Irregular Verbs RAP · RAP Studio
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-PLAN_SEMANAL_ENGLISH_IRREGULAR_VERBS_RAP_STUDIO.md` |
| **Versión** | 1.0 |
| **Estado** | Aprobada para desarrollo · no implementada |
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
