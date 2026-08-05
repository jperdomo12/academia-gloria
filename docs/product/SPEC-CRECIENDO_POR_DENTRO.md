###############################################################################
#
# Academia Gloria Valentina
#
# SPEC-CRECIENDO_POR_DENTRO.md
#
# Especificación Funcional
#
# Módulo: 🌱 Creciendo por dentro
#
# "Cada Semilla representa una oportunidad para crecer."
#
###############################################################################

# 🌱 Creciendo por dentro

## Especificación funcional del módulo

**Código documental:** `SPEC-CRECIENDO_POR_DENTRO`  
**Versión:** 1.1  
**Estado:** Aprobado para diseño e implementación del piloto  
**Ubicación prevista:** `docs/product/SPEC-CRECIENDO_POR_DENTRO.md`  
**Documento fundacional relacionado:** `docs/FOUNDATION.md`  
**Documento familiar relacionado:** `docs/CARTA_A_GLORIA.md`  
**Modelo conceptual relacionado:** `docs/models/MODEL-MOTORES_DE_APRENDIZAJE.md`

## Historial de versiones

### Versión 1.1

Incorpora las decisiones derivadas de la revisión funcional posterior a la versión 1.0:

- prioridad de la expresión oral y de la grabación;
- análisis de voz con finalidad educativa, nunca diagnóstica;
- reducción progresiva de la vergüenza y del miedo al error;
- motivación para volver a la Academia como indicador de éxito;
- integración explícita con Mi Camino, Mis Tareas y Misiones;
- contenido configurable mediante un archivo equivalente a `semillas.json`;
- filtros por emociones, situaciones, familias y nivel de apoyo;
- historial orientado a generar insumos útiles;
- acceso familiar amplio y transparente en la etapa actual;
- validación profesional como mejora posterior, no como bloqueo del piloto;
- reutilización de patrones ya validados en Detectives y Mi Rincón de Lectura;
- alineación conceptual con `MODEL-MOTORES_DE_APRENDIZAJE.md`.

### Versión 1.0

Primera definición integral del módulo, de las Semillas, del Jardín Personal y de la experiencia piloto basada en DESC.

---

## 1. Propósito del documento

Este documento define el propósito, alcance, principios, modelo funcional y criterios de diseño del módulo **🌱 Creciendo por dentro** de la Academia Gloria Valentina.

Su función es convertir los principios expresados en `FOUNDATION.md` en experiencias concretas de producto orientadas al desarrollo personal, emocional y social del alumno.

Este documento deberá servir como referencia para:

- Product Owner.
- Diseño funcional.
- Diseño de experiencia de usuario.
- Desarrollo.
- Pruebas.
- Creación de contenidos.
- Revisión familiar.
- Revisión pedagógica o profesional cuando corresponda.
- Evolución futura del módulo.

No sustituye la intervención de psicólogos, logopedas, docentes u otros profesionales.

No constituye una guía clínica.

No define diagnósticos ni tratamientos.

Su propósito es acompañar, practicar y reforzar habilidades de una forma cercana, segura y coherente con las necesidades reales del alumno.

---

## 2. Relación con `FOUNDATION.md`

`FOUNDATION.md` define por qué existe la Academia.

Este documento define cómo una parte de ese propósito se transforma en producto.

La relación entre ambos documentos es:

```text
FOUNDATION.md
La Academia habla.
Define propósito, identidad y principios.

        ↓

SPEC-CRECIENDO_POR_DENTRO.md
El producto habla.
Convierte esos principios en experiencias concretas.

        ↓

Semillas
El alumno vive y practica esas experiencias.
```

Toda decisión funcional de este módulo deberá poder responder afirmativamente:

> **¿Está alineada con el propósito y los principios de `FOUNDATION.md`?**

Si la respuesta es negativa o dudosa, la decisión deberá revisarse antes de implementarse.

---

## 3. Visión del módulo

**Creciendo por dentro** será un espacio de la Academia donde el alumno pueda:

- comprender mejor lo que siente;
- expresar sus ideas y necesidades;
- pedir ayuda;
- resolver pequeños conflictos;
- reconocer sus fortalezas;
- aprender de sus errores;
- desarrollar confianza;
- relacionarse con respeto;
- practicar habilidades para la vida;
- descubrir que crecer como persona también es una aventura.

No será una asignatura.

No tendrá exámenes.

No utilizará calificaciones.

No buscará respuestas perfectas.

No presentará el crecimiento personal como una competición.

Será un espacio de acompañamiento, reflexión y práctica.

---

## 4. Objetivo general

Acompañar al alumno en el desarrollo progresivo de habilidades personales, emocionales, comunicativas y sociales mediante experiencias breves, guiadas y significativas.

---

## 5. Objetivos específicos

El módulo deberá facilitar que el alumno pueda:

1. Reconocer situaciones cotidianas con mayor claridad.
2. Identificar emociones propias.
3. Ampliar su vocabulario emocional.
4. Diferenciar hechos, pensamientos, emociones y necesidades.
5. Expresar lo que siente de forma respetuosa.
6. Formular peticiones claras.
7. Pedir ayuda cuando la necesite.
8. Escuchar y considerar el punto de vista de otras personas.
9. Practicar alternativas ante pequeños conflictos.
10. Reconocer sus capacidades y avances.
11. Comprender que equivocarse forma parte del aprendizaje.
12. Desarrollar pensamiento flexible.
13. Tomar pequeñas decisiones con mayor autonomía.
14. Organizar ideas antes de hablar o actuar.
15. Trasladar lo practicado a situaciones reales.
16. Reducir progresivamente la vergüenza cuando interfiera con la expresión o el aprendizaje.
17. Aumentar la seguridad para hablar, grabarse y volver a intentarlo.
18. Favorecer que el alumno desee regresar espontáneamente a la Academia.

---

## 6. Alcance

### 6.1 Incluido en la versión inicial

La primera versión incluirá:

- acceso al módulo desde **Mi Universo**;
- presentación general de **Creciendo por dentro**;
- concepto de **Semilla**;
- primera Semilla funcional;
- acompañamiento de Lía;
- situación cotidiana guiada;
- selección de respuestas;
- expresión de emociones;
- construcción progresiva de una respuesta;
- resumen final;
- cierre positivo;
- registro básico de finalización;
- representación inicial del crecimiento;
- grabación como vía principal de práctica oral, aunque no obligatoria;
- reproducción de la grabación;
- almacenamiento de la respuesta final conforme a las reglas de privacidad;
- análisis de voz con finalidad educativa cuando aporte valor;
- contenido piloto configurable mediante un archivo de datos;
- integración contextual con Mi Camino, Mis Tareas y Misiones;
- historial básico capaz de generar insumos útiles.

La primera Semilla será:

> **🌱 Aprendo a decir lo que siento**

Estará inspirada en la estructura DESC.

### 6.2 Fuera del alcance inicial

No se incluirá en la primera versión:

- diagnóstico emocional;
- interpretación clínica de respuestas;
- recomendaciones terapéuticas automáticas;
- evaluación psicológica;
- puntuaciones emocionales;
- rankings;
- comparación entre alumnos;
- diagnóstico automático a partir de la voz;
- inferencias psicológicas o emocionales automáticas;
- clasificación automática de estados emocionales;
- intervención en situaciones de riesgo;
- generación libre e ilimitada de consejos;
- comunicación directa con profesionales;
- personalización automática avanzada;
- biblioteca extensa de Semillas;
- Jardín Personal completo;
- informes profesionales.

Estas capacidades podrán evaluarse en el futuro, siempre con revisión específica de seguridad, privacidad, valor y pertinencia.

El análisis de voz **sí podrá formar parte del piloto** cuando su finalidad sea educativa, por ejemplo:

- revisar pronunciación;
- observar fluidez;
- identificar palabras o expresiones que convenga practicar;
- comparar intentos;
- proponer una nueva práctica;
- reconocer evolución.

No se utilizará para diagnosticar emociones, personalidad, ansiedad, vergüenza u otros estados psicológicos.

---

## 7. Público objetivo

El módulo se diseña inicialmente pensando en Gloria Valentina y en sus necesidades reales.

Sin embargo, su lenguaje y su experiencia deberán ser utilizables por otros alumnos con necesidades similares.

El módulo deberá:

- respetar distintas formas de aprender;
- utilizar lenguaje comprensible;
- evitar infantilizar;
- permitir avance pausado;
- combinar texto, imagen, audio y selección visual cuando aporte valor;
- admitir apoyo familiar;
- reducir la carga cognitiva;
- ofrecer instrucciones breves;
- mantener visible la información necesaria durante cada actividad.

El origen en Gloria deberá permanecer presente en la identidad del proyecto, aunque la experiencia hable a todos los alumnos.

---

## 8. Principios funcionales

### 8.1 No se evalúa a la persona

La Academia puede comprobar que una actividad fue realizada.

No debe convertir una emoción, una opinión o una necesidad en una respuesta correcta o incorrecta.

### 8.2 Se guía sin imponer

Lía puede ayudar a ordenar ideas y mostrar alternativas.

No debe imponer una única forma de sentir.

### 8.3 Se practica una habilidad cada vez

Cada Semilla tendrá un objetivo principal.

No deberá intentar trabajar demasiadas habilidades simultáneamente.

### 8.4 La experiencia será breve

La duración orientativa de una Semilla será de **5 a 10 minutos**.

Deberá poder interrumpirse y retomarse cuando resulte necesario.

### 8.5 El alumno conserva el control

El alumno podrá:

- avanzar a su ritmo;
- repetir una instrucción;
- volver al paso anterior cuando proceda;
- escuchar de nuevo;
- cambiar una selección antes de finalizar;
- pedir ayuda;
- salir sin recibir mensajes negativos.

### 8.6 El cierre siempre será seguro y positivo

Toda Semilla terminará con:

- una síntesis sencilla;
- reconocimiento del esfuerzo;
- una idea práctica;
- una invitación a utilizar lo aprendido;
- una representación de crecimiento.

### 8.7 La privacidad es prioritaria

Las respuestas personales no deberán exponerse innecesariamente.

Las grabaciones, si existen, requerirán reglas específicas de almacenamiento, acceso y eliminación.

### 8.8 El módulo acompaña; no sustituye

El contenido podrá reforzar recomendaciones familiares o profesionales.

Nunca deberá presentarse como sustituto del acompañamiento humano.

### 8.9 La expresión oral es prioritaria

En la etapa actual de Gloria, hablar y practicar oralmente tiene mayor prioridad que escribir mediante teclado.

Por tanto:

- la grabación será una vía principal de interacción;
- escribir en ordenador será una alternativa, no el camino predeterminado;
- la escritura manual podrá trabajarse fuera de la pantalla o mediante actividades complementarias;
- la experiencia deberá permitir escuchar, repetir, grabar y comparar;
- ninguna Semilla deberá depender obligatoriamente de una respuesta escrita con teclado.

### 8.10 Volver también es un logro

La Academia considerará un indicador de éxito que el alumno:

- quiera repetir una experiencia;
- solicite otra Semilla;
- regrese espontáneamente;
- recuerde a Lía o la estrategia practicada;
- perciba la Academia como un lugar al que desea volver.

---

## 9. Concepto de Semilla

Una **Semilla** es la unidad funcional básica de **Creciendo por dentro**.

Representa una experiencia breve orientada a practicar una habilidad personal, emocional, comunicativa o social.

Cada Semilla deberá tener:

- un título cercano;
- un propósito único;
- una situación comprensible;
- una secuencia guiada;
- participación activa;
- una síntesis final;
- una aplicación práctica;
- una representación de crecimiento.

Una Semilla no es:

- una lección teórica;
- un examen;
- un test psicológico;
- una competencia;
- una recompensa;
- una evaluación de personalidad.

### 9.1 Relación con las Misiones

El símbolo 🌱 ya forma parte del lenguaje de crecimiento de la Academia y puede aparecer también alrededor de Misiones.

Los conceptos no son idénticos:

- **Semilla:** experiencia o habilidad concreta que puede crecer.
- **Misión:** encargo o recorrido asignado al alumno.
- **Tarea:** unidad de trabajo que forma parte de una misión.

Una Semilla podrá:

- realizarse libremente desde Creciendo por dentro;
- formar parte de una misión;
- ser asignada como tarea;
- aparecer como recomendación en Mi Camino.

El uso compartido de 🌱 es conceptualmente válido porque ambos elementos representan crecimiento.

Durante el diseño visual se comprobará que el contexto, el texto y los componentes eviten confusión. Si fuera necesario, Misiones y Semillas utilizarán variantes visuales complementarias sin perder el vínculo común.

---

## 10. Identidad de las Semillas

Las Semillas utilizarán títulos centrados en capacidades y acciones.

Ejemplos:

- 🌱 Aprendo a decir lo que siento.
- 🌱 Pido ayuda con confianza.
- 🌱 Escucho antes de responder.
- 🌱 Cuando algo no sale como esperaba.
- 🌱 Puedo decir que no con respeto.
- 🌱 También intento comprender a los demás.
- 🌱 Reconozco lo que hago bien.
- 🌱 Organizo mis ideas antes de hablar.
- 🌱 Busco otra manera.
- 🌱 Tomo una pequeña decisión.

Los títulos deberán:

- evitar lenguaje clínico;
- evitar etiquetas;
- evitar presentar una carencia;
- transmitir posibilidad;
- estar formulados en primera persona cuando resulte natural;
- ser comprensibles para el alumno.

---

## 11. Anatomía estándar de una Semilla

Toda Semilla deberá seguir una estructura coherente.

La secuencia podrá adaptarse, pero no perder su lógica.

### 11.1 Paso 1 — Bienvenida

Lía presenta la experiencia.

Objetivos:

- generar calma;
- explicar qué se hará;
- reducir incertidumbre;
- dejar claro que no es un examen.

Ejemplo:

> “Hoy vamos a practicar una forma de explicar lo que sentimos sin discutir. No hay respuestas perfectas. Lo pensaremos juntas.”

### 11.2 Paso 2 — Situación

Se presenta una escena cotidiana.

La situación deberá ser:

- breve;
- concreta;
- comprensible;
- adecuada a la edad;
- emocionalmente segura;
- cercana a experiencias posibles;
- libre de detalles innecesarios.

Podrá presentarse mediante:

- texto;
- ilustración;
- audio;
- diálogo;
- secuencia visual.

### 11.3 Paso 3 — Observar

El alumno identifica qué ocurrió.

Objetivo:

- diferenciar hechos de interpretaciones;
- organizar la situación;
- reducir ambigüedad.

Lía podrá utilizar preguntas como:

- ¿Qué pasó?
- ¿Quién hizo qué?
- ¿Qué viste o escuchaste?
- ¿Cómo lo contarías como una reportera?

### 11.4 Paso 4 — Reconocer

El alumno identifica cómo se siente.

Podrá:

- seleccionar una emoción;
- elegir varias;
- escuchar su nombre;
- consultar una explicación breve;
- escribir o decir otra emoción.

El sistema no deberá afirmar que existe una única emoción correcta.

### 11.5 Paso 5 — Expresar una necesidad

El alumno piensa qué necesita o qué desea pedir.

Lía podrá ayudar con:

- opciones;
- frases incompletas;
- ejemplos;
- reformulación;
- apoyo visual.

### 11.6 Paso 6 — Pensar en el resultado

El alumno reflexiona sobre qué puede ocurrir si se comunica de forma clara y respetuosa.

No se presentará la consecuencia como garantía.

Se trabajará como resultado posible o deseable.

### 11.7 Paso 7 — Construir

La Academia combina las respuestas del alumno en una estructura comprensible.

El alumno podrá revisar y modificar antes de finalizar.

### 11.8 Paso 8 — Practicar

Según la Semilla, el alumno podrá:

- leer;
- repetir;
- grabar;
- elegir una frase;
- representar una conversación;
- completar un diálogo;
- ordenar pasos.

### 11.9 Paso 9 — Cierre de Lía

Lía resume lo aprendido.

Reconoce el esfuerzo.

Evita exageraciones.

Ejemplo:

> “Has organizado lo que ocurrió, cómo te sentiste y qué querías pedir. Eso puede ayudarte a hablar con más claridad.”

### 11.10 Paso 10 — Crecimiento

La Semilla muestra una representación sencilla:

- semilla plantada;
- primer brote;
- hoja;
- flor;
- nueva parte del jardín.

No se presenta como premio por acertar.

Representa el tiempo dedicado a crecer.

---

## 12. Familias de Semillas

### 12.1 Comunicación

Objetivo:

- expresar ideas;
- organizar mensajes;
- formular peticiones;
- pedir aclaraciones;
- decir que no;
- pedir ayuda.

### 12.2 Emociones

Objetivo:

- identificar;
- nombrar;
- diferenciar;
- comprender;
- expresar;
- regular con apoyo.

### 12.3 Autoestima e identidad

Objetivo:

- reconocer fortalezas;
- valorar avances;
- construir una identidad propia;
- reducir comparaciones;
- aceptar diferencias.

### 12.4 Relaciones

Objetivo:

- escuchar;
- respetar turnos;
- comprender perspectivas;
- cuidar amistades;
- reconocer límites.

### 12.5 Resolución de conflictos

Objetivo:

- describir problemas;
- buscar alternativas;
- conversar;
- reparar;
- llegar a acuerdos sencillos.

### 12.6 Pensamiento flexible

Objetivo:

- aceptar cambios;
- explorar otras posibilidades;
- tolerar que algo no salga como se esperaba;
- probar estrategias diferentes.

### 12.7 Autonomía

Objetivo:

- tomar pequeñas decisiones;
- reconocer cuándo puede continuar sola;
- identificar cuándo necesita ayuda;
- asumir responsabilidades adecuadas.

### 12.8 Organización personal

Objetivo:

- ordenar ideas;
- preparar pasos;
- anticipar acciones;
- dividir una tarea;
- revisar lo necesario.

### 12.9 Toma de decisiones

Objetivo:

- identificar opciones;
- pensar consecuencias;
- elegir;
- revisar;
- aprender de la experiencia.

---

## 13. Papel de Lía

En este módulo, Lía tendrá una función especialmente sensible.

### 13.1 Lía debe

- hablar con calma;
- utilizar frases breves;
- validar el esfuerzo;
- permitir silencio y tiempo;
- formular preguntas abiertas cuando sea apropiado;
- ofrecer opciones cuando la respuesta libre resulte difícil;
- ayudar a ordenar;
- reformular sin apropiarse de la voz del alumno;
- recordar que puede pedir ayuda;
- invitar a practicar;
- cerrar de forma positiva y realista.

### 13.2 Lía no debe

- diagnosticar;
- interpretar clínicamente;
- asegurar que sabe cómo se siente el alumno;
- decir “eso está mal”;
- ridiculizar;
- comparar;
- presionar para responder;
- exigir revelar experiencias personales;
- convertir una emoción en una conducta negativa;
- minimizar lo ocurrido;
- prometer resultados;
- sugerir guardar secretos frente a adultos responsables;
- sustituir a familia o profesionales;
- presentar una respuesta como única solución.

### 13.3 Voz de Lía

La voz de Lía será:

- cercana;
- amable;
- clara;
- respetuosa;
- esperanzadora;
- natural;
- no infantilizada;
- no excesivamente efusiva;
- coherente con la edad y comprensión del alumno.

### 13.4 Ejemplos de lenguaje adecuado

> “Podemos pensarlo paso a paso.”

> “Puedes elegir una opción o decirlo con tus propias palabras.”

> “Es posible sentir más de una cosa al mismo tiempo.”

> “No hace falta responder rápido.”

> “Podemos volver atrás y cambiarlo.”

> “Pedir ayuda también es una buena decisión.”

### 13.5 Lenguaje que debe evitarse

- “Respuesta incorrecta.”
- “Eso no tiene sentido.”
- “No deberías sentirte así.”
- “Tienes que hacerlo.”
- “Todos los demás pueden.”
- “Es muy fácil.”
- “Ya deberías saberlo.”
- “Si haces esto, todo se resolverá.”
- “No se lo cuentes a nadie.”

---

## 14. Modelo emocional

### 14.1 Emociones que la experiencia debe favorecer

- seguridad;
- calma;
- curiosidad;
- confianza;
- comprensión;
- esperanza;
- orgullo sereno;
- sensación de acompañamiento.

### 14.2 Emociones que deberá evitar provocar

- vergüenza generada por la propia experiencia;
- culpa innecesaria;
- miedo al error;
- presión;
- inferioridad;
- exposición;
- confusión evitable;
- sensación de fracaso;
- obligación de compartir información íntima.

### 14.3 Vergüenza como punto de acompañamiento

Además de evitar provocar vergüenza, la Academia ayudará al alumno a reducirla o manejarla progresivamente cuando interfiera con:

- hablar;
- grabarse;
- participar;
- pedir ayuda;
- expresar una necesidad;
- volver a intentarlo;
- reconocer una dificultad.

En el caso inicial de Gloria, la vergüenza constituye un punto de atención real.

La Academia deberá ofrecer:

- exposición gradual;
- control sobre cuándo grabar;
- posibilidad de repetir en privado;
- escucha antes de compartir;
- mensajes que normalicen el error;
- reconocimiento del esfuerzo;
- ausencia de comparaciones;
- pequeños pasos de dificultad creciente.

La Academia no prometerá eliminar la vergüenza.

Sí procurará crear condiciones para que el alumno gane seguridad y pueda actuar a pesar de ella.

### 14.4 Selección emocional

Cuando se solicite identificar emociones:

- podrá elegirse más de una;
- se permitirá “no estoy segura”;
- se ofrecerá “otra emoción”;
- se podrá escuchar el nombre;
- se podrá consultar una explicación;
- no se corregirá como una prueba cerrada.

### 14.5 Intensidad

En versiones futuras podrá incorporarse una escala sencilla de intensidad.

No se implementará como puntuación clínica.

Ejemplo:

```text
Un poquito — Bastante — Mucho
```

### 14.6 Situaciones sensibles

Si una actividad pudiera evocar situaciones de daño, abuso, miedo intenso, autolesión o riesgo:

- no deberá gestionarse como una Semilla ordinaria;
- deberá mostrar una indicación clara de buscar a un adulto de confianza;
- requerirá revisión específica antes de incorporarse;
- no deberá automatizar conclusiones ni consejos.

La versión inicial evitará este tipo de situaciones.

---

## 15. Modelo de interacción

Las Semillas podrán combinar:

- lectura;
- escucha;
- selección visual;
- escritura;
- frases guiadas;
- ordenación;
- grabación;
- reproducción;
- simulación de diálogo;
- reflexión final.

### 15.1 Reglas de interacción

- Una acción principal por pantalla.
- Instrucciones cortas.
- Botones claramente identificables.
- Estado visible.
- Posibilidad de repetir audio.
- Información importante siempre visible.
- No depender exclusivamente del color.
- No ocultar una instrucción necesaria antes de completar la acción.
- Evitar desplazamientos innecesarios.
- Confirmar antes de borrar una respuesta o grabación.
- Permitir pausa y continuación cuando sea viable.

### 15.2 Respuesta libre y respuesta guiada

Toda Semilla deberá decidir qué grado de libertad es adecuado.

Opciones:

1. Selección cerrada.
2. Selección múltiple.
3. Frase incompleta.
4. Texto libre.
5. Grabación.
6. Combinación progresiva.

Para la primera versión se priorizará una combinación guiada que reduzca carga cognitiva.

La secuencia recomendada será:

```text
Escuchar
    ↓
Elegir u organizar
    ↓
Hablar
    ↓
Grabar
    ↓
Escuchar la propia respuesta
    ↓
Repetir o finalizar
```

La escritura con teclado podrá existir como apoyo, pero no será la interacción principal del piloto.

---

## 16. Modelo de progreso

El módulo no utilizará niveles competitivos.

No habrá puntuaciones emocionales.

No habrá rachas obligatorias.

No habrá clasificación.

El progreso se representará mediante crecimiento visual.

### 16.1 Estados posibles de una Semilla

```text
disponible
iniciada
en_pausa
completada
repetida
```

### 16.2 Significado de completar

Una Semilla se considera completada cuando el alumno recorre su secuencia y llega al cierre.

No requiere una respuesta considerada “correcta”.

### 16.3 Repetición

Una Semilla podrá repetirse.

La repetición:

- no elimina el progreso anterior;
- no implica fracaso;
- puede utilizar una situación diferente;
- puede mostrar que practicar ayuda a crecer.

### 16.4 Metáfora visual

Evolución orientativa:

```text
Semilla
   ↓
Brote
   ↓
Planta
   ↓
Flor o árbol
```

Esta evolución no deberá interpretarse como medición psicológica.

Solo representa participación y continuidad.

---

## 17. El Jardín Personal

El Jardín Personal será la representación visual del recorrido en **Creciendo por dentro**.

### 17.1 Propósito

- mostrar continuidad;
- hacer visible el tiempo dedicado;
- conectar las Semillas;
- transmitir crecimiento;
- generar motivación tranquila.

### 17.2 Principios

El Jardín:

- no será un ranking;
- no comparará;
- no tendrá elementos mejores o peores;
- no dependerá de respuestas correctas;
- podrá ser diferente para cada alumno;
- crecerá con el tiempo;
- conservará una estética alegre y serena.

### 17.3 Versión inicial

La versión 1 podrá limitarse a:

- mostrar una Semilla o brote al finalizar;
- registrar la primera Semilla;
- incluir un mensaje de Lía.

El Jardín completo se desarrollará después de validar la experiencia básica.

---

## 18. Integración con la Academia

### 18.1 Ubicación

**Creciendo por dentro** formará parte de:

```text
Mi Universo
└── 🌱 Creciendo por dentro
```

### 18.2 Menú

A futuro aparecerá como una opción propia dentro de **Mi Universo**.

No se incorporará al menú principal hasta que exista al menos una experiencia funcional validada.

### 18.3 Mi Camino

Una Semilla podrá aparecer como recomendación dentro de **Mi Camino** cuando:

- haya sido asignada;
- forme parte de una misión;
- la familia considere que es un buen momento;
- exista una continuidad pendiente.

### 18.4 Mis Tareas

Una Semilla podrá asociarse a una tarea o misión.

Ejemplo:

```text
Misión:
Practico cómo decir lo que siento.

Actividad:
Completar la Semilla “Aprendo a decir lo que siento”.
```

La finalización de la Semilla podrá actualizar el avance de la misión.

### 18.5 Mis Logros

La finalización podrá registrar un logro personal, pero no una medalla competitiva.

Ejemplos:

- “He practicado cómo expresar lo que siento.”
- “He pedido ayuda con confianza.”
- “He buscado otra forma de resolver un problema.”

### 18.6 Familia

A futuro la familia podrá:

- recomendar una Semilla;
- acompañar su realización;
- consultar si fue completada;
- proponer una situación;
- revisar un resumen no sensible;
- acceder a orientaciones de acompañamiento.

No deberá acceder automáticamente a respuestas íntimas sin una decisión explícita de diseño y privacidad.

---

## 19. Primera Semilla

# 🌱 Aprendo a decir lo que siento

### 19.1 Propósito

Practicar una estructura sencilla para comunicar:

1. qué ocurrió;
2. cómo se siente el alumno;
3. qué necesita o desea pedir;
4. qué resultado positivo podría facilitar esa petición.

La Semilla estará inspirada en el método DESC.

No se presentará inicialmente como teoría.

Primero se practicará.

Después Lía podrá explicar que esta forma de organizar una conversación tiene un nombre.

### 19.2 Situación piloto

> Un compañero toma el lápiz del alumno sin pedir permiso mientras está trabajando.

La situación podrá evolucionar después a otras variantes.

### 19.3 Flujo funcional

#### Pantalla 1 — Bienvenida

Lía presenta el objetivo.

Mensaje orientativo:

> “A veces sabemos que algo nos molesta, pero nos cuesta explicarlo. Hoy practicaremos un pequeño truco para decir lo que sentimos con calma.”

Acción:

```text
[Empezar]
```

#### Pantalla 2 — Situación

Se muestra la escena.

Texto:

> “Estás trabajando en clase. Un compañero coge tu lápiz sin pedir permiso.”

Acciones:

```text
[Escuchar]
[Continuar]
```

#### Pantalla 3 — Describir

Pregunta:

> “¿Qué ocurrió?”

Opciones:

- Mi compañero cogió mi lápiz sin preguntarme.
- Mi compañero es malo.
- Todo salió fatal.
- Quiero decirlo con mis palabras.

La opción funcionalmente preferida deberá centrarse en el hecho.

Si el alumno elige otra, Lía no dirá que está mal.

Podrá ayudar:

> “Esa frase cuenta lo que piensas. ¿Buscamos también una frase que diga exactamente qué ocurrió?”

#### Pantalla 4 — Expresar

Pregunta:

> “¿Cómo podrías sentirte?”

Opciones múltiples:

- 😠 Enfadada.
- 😕 Confundida.
- 😟 Nerviosa.
- 😢 Triste.
- 😐 No estoy segura.
- Otra.

No existirá una única respuesta correcta.

#### Pantalla 5 — Solicitar

Pregunta:

> “¿Qué te gustaría pedir?”

Opciones:

- Que me devuelva el lápiz.
- Que me pregunte antes de cogerlo.
- Que espere a que termine.
- Quiero decirlo con mis palabras.

#### Pantalla 6 — Consecuencia positiva

Pregunta:

> “¿Qué podría pasar si lo habláis?”

Opciones:

- Podremos seguir trabajando tranquilos.
- Nos entenderemos mejor.
- Podrá saber qué necesito.
- Quiero decirlo con mis palabras.

#### Pantalla 7 — Construcción

La Academia genera una frase editable:

> “Cuando coges mi lápiz sin preguntarme, me siento enfadada. Me gustaría que me preguntaras antes. Así podremos seguir trabajando tranquilos.”

El alumno podrá:

- escuchar;
- modificar;
- volver a un paso;
- leer;
- grabar.

#### Pantalla 8 — Práctica

Lía invita:

> “Puedes leerla o decirla con tus propias palabras. No tiene que salir perfecta.”

Opciones:

```text
[Grabar mi voz]        ← acción principal
[Escuchar la frase]
[Leerla]
[Decirla sin grabar]
[Prefiero continuar]
```

La grabación será la vía recomendada y visualmente prioritaria.

No será obligatoria, porque el alumno debe conservar el control y poder continuar cuando no se sienta preparado.

#### Pantalla 9 — Descubrimiento

Lía explica:

> “Has organizado una conversación en cuatro partes: qué ocurrió, cómo te sentiste, qué querías pedir y qué podía mejorar.”

En el piloto, el alumno **no necesita conocer el acrónimo DESC**.

La Academia enseñará primero la habilidad mediante lenguaje natural.

La denominación podrá:

- permanecer únicamente en la documentación y en el área familiar;
- mostrarse al final en una versión futura;
- activarse mediante configuración;
- adaptarse a la formulación recomendada por la psicóloga.

La estructura base será:

```text
Describir
Expresar
Solicitar o sugerir
Consecuencia
```

La terminología concreta deberá residir en el contenido configurable y no quedar codificada directamente en las pantallas.

#### Pantalla 10 — Cierre

Mensaje orientativo:

> “No siempre es fácil decir lo que sentimos. Hoy has practicado una forma de hacerlo con claridad y respeto.”

Se muestra un brote.

Acciones:

```text
[Terminar]
[Practicar otra vez]
```

### 19.4 Resultado funcional

Al completar:

- estado de la Semilla = `completada`;
- fecha de finalización;
- número de intentos;
- crecimiento visual inicial;
- posible actualización de tarea o misión;
- mensaje en Mi Camino o Mis Logros cuando corresponda.

No se guardarán inicialmente respuestas emocionales detalladas sin una decisión específica de privacidad.

---

## 20. Contenidos y situaciones

### 20.1 Reglas de contenido

Toda situación deberá:

- tener un objetivo claro;
- evitar ambigüedad excesiva;
- evitar culpabilizar;
- no utilizar estereotipos;
- no presentar al alumno siempre como víctima;
- incluir progresivamente distintos puntos de vista;
- ser adecuada a la edad;
- ser revisada antes de publicarse.

### 20.2 Tipos de situaciones futuras

- En clase.
- En el recreo.
- En casa.
- Con una amistad.
- Con un adulto.
- Durante una tarea.
- Cuando cambia un plan.
- Cuando algo no sale bien.
- Cuando necesita ayuda.
- Cuando quiere decir que no.
- Cuando debe escuchar otra opinión.
- Cuando necesita reparar una situación.

### 20.3 Gradación

Las situaciones podrán organizarse por complejidad:

```text
Nivel de apoyo 1:
Opciones muy guiadas.

Nivel de apoyo 2:
Frases incompletas y selección.

Nivel de apoyo 3:
Respuesta propia con apoyo.

Nivel de apoyo 4:
Situación abierta y práctica autónoma.
```

No se mostrará al alumno como una clasificación de capacidad.

---

## 21. Catálogo y filtros

El módulo deberá evolucionar hacia un catálogo de Semillas similar a los patrones existentes en Detectives y Mi Rincón de Lectura.

### 21.1 Filtros previstos

- familia de Semilla;
- emoción;
- tipo de situación;
- contexto;
- nivel de apoyo;
- duración;
- estado;
- asignada mediante misión;
- recomendada;
- completada;
- pendiente de repetición.

### 21.2 Nivel de apoyo

El nivel de apoyo representará la cantidad de ayuda ofrecida, no la capacidad del alumno.

Ejemplo:

```text
Apoyo 1
Opciones directas y guía completa.

Apoyo 2
Frases incompletas y ayudas visibles.

Apoyo 3
Respuesta propia con ayudas disponibles.

Apoyo 4
Mayor autonomía.
```

Los niveles no se mostrarán como clasificación del alumno.

### 21.3 Configuración

Filtros, categorías y niveles deberán provenir del contenido configurable siempre que resulte adecuado.

---

## 22. Accesibilidad y carga cognitiva

El módulo deberá:

- usar tipografía legible;
- mantener contraste suficiente;
- admitir navegación por teclado;
- identificar botones con texto;
- incluir alternativas al audio;
- evitar información exclusivamente visual;
- permitir repetición;
- evitar temporizadores;
- limitar elementos por pantalla;
- mantener instrucciones visibles;
- dividir tareas largas;
- utilizar lenguaje directo;
- evitar párrafos extensos en la experiencia del alumno;
- ofrecer apoyo visual sin saturar;
- permitir continuar sin grabar;
- evitar animaciones intensas;
- respetar `prefers-reduced-motion`.

---

## 23. Privacidad y seguridad

### 23.1 Datos mínimos

La versión inicial deberá guardar solo lo necesario:

- identificador de alumno;
- identificador de Semilla;
- estado;
- fecha de inicio;
- fecha de finalización;
- número de repeticiones;
- progreso visual.

### 23.2 Respuestas personales

En la etapa actual, la Academia es un producto familiar construido para acompañar a Gloria.

Por tanto, la familia podrá acceder a la información generada por el módulo, incluyendo:

- respuestas;
- progreso;
- grabaciones;
- intentos;
- apoyos utilizados;
- insumos derivados.

Este acceso deberá ser:

- transparente para Gloria;
- comprensible;
- limitado a responsables autorizados;
- coherente con la finalidad educativa;
- revisable conforme aumenten su edad y autonomía.

No se ocultará información a la familia en el piloto.

A futuro deberá evolucionar un modelo de privacidad que equilibre acompañamiento familiar, confianza y autonomía progresiva del alumno.

### 23.3 Grabaciones

La grabación será opcional desde el punto de vista del control del alumno, pero constituirá una capacidad principal del piloto.

La versión inicial deberá:

- permitir grabar;
- permitir reproducir;
- permitir repetir;
- permitir eliminar antes de confirmar;
- guardar la respuesta final;
- asociarla al alumno, Semilla y misión cuando corresponda;
- permitir acceso familiar autorizado;
- registrar metadatos de práctica;
- aplicar medidas de seguridad y retención.

El diseño deberá diferenciar:

```text
Grabación temporal
Se utiliza durante los intentos y puede descartarse.

Grabación final
Es confirmada por el alumno y se conserva como evidencia de práctica.
```

La persistencia se implementará de forma explícita y documentada.

### 23.4 Situaciones de riesgo

El módulo no debe utilizarse para detectar automáticamente situaciones de riesgo.

Si un contenido permite que el alumno indique miedo, daño o peligro, deberá existir una ruta segura hacia un adulto responsable.

Esta capacidad queda fuera de la primera versión.

---

## 24. Reglas de diseño visual

### 24.1 Identidad

El módulo utilizará:

- 🌱 como símbolo principal;
- formas orgánicas;
- colores alegres y suaves;
- espacio visual;
- ilustraciones claras;
- animaciones discretas;
- elementos naturales como brotes, hojas, flores y jardines.

El símbolo 🌱 expresa crecimiento y puede coexistir con su uso en Misiones.

La identidad se diferenciará mediante:

- nombre visible **Creciendo por dentro**;
- concepto de **Semilla**;
- jardín y elementos orgánicos;
- colores y composición propios;
- contexto funcional;
- textos claros.

La decisión visual definitiva se validará en el diseño del piloto.

### 24.2 Evitar

- estética clínica;
- semáforos de aprobado/suspenso;
- cruces rojas;
- mensajes de error emocional;
- exceso de estímulos;
- animaciones competitivas;
- contadores de presión;
- insignias de superioridad;
- infantilización visual.

### 24.3 Mensajes

Los mensajes serán:

- breves;
- positivos;
- realistas;
- respetuosos;
- centrados en el proceso.

---

## 25. Reglas de implementación

### 25.1 Separación de contenido y lógica

Las situaciones, textos, opciones, emociones, apoyos, recursos, filtros y formulaciones deberán definirse fuera del HTML.

El piloto utilizará un archivo de contenido configurable equivalente a:

```text
creciendo-por-dentro/
└── semillas.json
```

El nombre definitivo podrá ajustarse durante la implementación.

Modificar o incorporar una situación equivalente no deberá exigir cambios en las pantallas ni en el motor.

La estructura seguirá el patrón ya validado en `historias.json` de Detectives.

La primera implementación deberá ser sencilla, pero no deberá codificar directamente cada historia en el HTML o JavaScript.

### 25.2 Plantilla futura

Una Semilla podrá definirse mediante una estructura de datos con:

```text
id
titulo
familia
objetivo
duracionEstimada
situacion
pasos
opciones
ayudas
resumen
cierre
crecimiento
```

La estructura definitiva se documentará después de validar el piloto.

### 25.3 Reutilización

La implementación deberá reutilizar, siempre que resulte funcionalmente adecuado, patrones y componentes ya validados en:

- Aventuras Matemáticas — Detectives;
- Mi Rincón de Lectura;
- Mis Tareas y Misiones;
- Mi Camino;
- grabación y reproducción;
- filtros;
- historial;
- navegación contextual.

La lógica común deberá centralizarse cuando exista más de una Semilla.

No se desarrollará una arquitectura compleja antes de validar la primera experiencia.

El módulo será el siguiente caso de validación de `MODEL-MOTORES_DE_APRENDIZAJE.md`.

### 25.4 Progresión

La implementación deberá permitir:

- iniciar;
- pausar;
- continuar;
- completar;
- repetir;
- registrar progreso;
- integrarse con tareas y misiones.

### 25.5 Estructura de carpeta

El módulo tendrá su propia carpeta, al igual que otros módulos principales.

Estructura conceptual inicial:

```text
academia-gloria/
└── creciendo-por-dentro/
    ├── index.html
    ├── creciendo-por-dentro.css
    ├── creciendo-por-dentro.js
    ├── semillas.json
    ├── README.md
    └── assets/
```

La estructura definitiva se ajustará a los estándares y componentes existentes.

### 25.6 Compatibilidad

Deberá funcionar en:

- escritorio;
- tablet;
- móvil;
- Live Server;
- despliegue GitHub Pages u origen equivalente utilizado por el proyecto.

---

## 26. Criterios de aceptación del piloto

La primera Semilla se considerará funcionalmente aceptada cuando:

1. Sea accesible desde una ruta definida.
2. Presente claramente la situación.
3. Guíe los cuatro pasos funcionales inspirados en DESC sin exigir que el alumno conozca el acrónimo.
4. Permita elegir emociones sin una respuesta única.
5. Permita construir una frase final.
6. Mantenga las respuestas visibles cuando sean necesarias.
7. Presente la grabación como vía principal, permitiendo continuar sin ella.
8. No utilice mensajes de error emocional.
9. Finalice con un cierre positivo.
10. Registre la finalización.
11. Muestre un primer símbolo de crecimiento.
12. Funcione en escritorio, tablet y móvil.
13. Sea comprensible para Gloria sin explicación técnica.
14. Pueda completarse aproximadamente en 5–10 minutos.
15. Sea revisada por la familia.
16. Sea validada funcionalmente por la familia sin quedar bloqueada por el calendario profesional.
17. Permita incorporar posteriormente observaciones de la psicóloga mediante contenido configurable.
18. Guarde la grabación final confirmada.
19. Se integre con una misión reutilizando el patrón existente.
20. Cargue la situación piloto desde un archivo de datos.
21. Genere al menos un insumo útil en el historial.
22. Ofrezca filtros básicos o deje preparada su estructura.
23. Motive a Gloria a completar, repetir o regresar a la experiencia.

---

## 27. Validación

La validación se realizará en tres niveles.

### 27.1 Validación funcional

- navegación;
- persistencia;
- controles;
- retroceso;
- repetición;
- integración;
- responsive;
- accesibilidad básica.

### 27.2 Validación de experiencia

- claridad;
- duración;
- carga cognitiva;
- tono;
- comprensión;
- motivación;
- facilidad para completar.

### 27.3 Validación familiar y profesional

La familia evaluará:

- pertinencia;
- cercanía;
- lenguaje;
- reacción de Gloria;
- utilidad práctica.

Cuando sea posible, se solicitará opinión profesional para enriquecer versiones posteriores sobre:

- objetivo;
- estructura;
- situaciones;
- lenguaje;
- formulación del enfoque DESC;
- adecuación a las necesidades actuales.

La ausencia de sesiones durante agosto no bloqueará el piloto familiar.

Las observaciones profesionales se incorporarán mediante configuración o nuevas versiones cuando estén disponibles.

---

## 28. Indicadores cualitativos iniciales

En la fase piloto no se priorizarán métricas cuantitativas complejas.

Se observará:

- si Gloria comprende la situación;
- si puede avanzar sin frustración;
- si identifica al menos una emoción;
- si comprende la estructura final;
- si desea repetir;
- si recuerda la estrategia posteriormente;
- si puede utilizarla con apoyo en una situación real;
- si la experiencia le resulta adecuada a su edad;
- si Lía se percibe como acompañante;
- si Gloria desea repetir;
- si regresa espontáneamente;
- si recuerda la estrategia en otro momento;
- si la grabación facilita hablar con mayor seguridad;
- si disminuye la vergüenza durante los intentos;
- qué apoyos utiliza;
- qué situaciones o emociones requieren nueva práctica.

Estas observaciones no se utilizarán como evaluación psicológica.

El historial deberá permitir convertirlas, cuando corresponda, en insumos concretos para:

- nuevas Semillas;
- Mi Camino;
- Misiones;
- acompañamiento familiar;
- futuras revisiones profesionales.

---

## 29. Roadmap

### Versión 1.0 — Piloto funcional

- Definición del módulo.
- Primera Semilla.
- Flujo natural inspirado en DESC.
- Grabación principal.
- Almacenamiento de respuesta final.
- Contenido configurable.
- Integración con Misiones.
- Historial e insumo inicial.
- Cierre positivo.
- Primer brote visual.
- Validación con Gloria.

### Versión 1.1 — Plantilla reutilizable

- Separación de contenido.
- Modelo de datos.
- Componentes comunes.
- Segunda y tercera Semilla.
- Repetición con situaciones alternativas.

### Versión 1.5 — Integración

- Acceso oficial desde Mi Universo.
- Integración con Mi Camino.
- Asociación con tareas y misiones.
- Logros personales.
- Acompañamiento familiar básico.

### Versión 2.0 — Jardín Personal

- Jardín visual.
- Familias de Semillas.
- Historial longitudinal.
- Generación de insumos para otras necesidades del alumno.
- Crecimiento acumulado.
- Personalización estética.

### Versión 3.0 — Adaptación

- niveles de apoyo;
- recomendaciones personalizadas;
- situaciones configurables;
- participación familiar;
- revisión profesional;
- nuevas modalidades de interacción.

Toda evolución deberá mantener alineación con `FOUNDATION.md`.

---

## 30. Backlog inicial de Semillas

Después del piloto podrán evaluarse:

1. 🌱 Pido ayuda con confianza.
2. 🌱 Puedo decir que no con respeto.
3. 🌱 Cuando me equivoco.
4. 🌱 Escucho antes de responder.
5. 🌱 Busco otra manera.
6. 🌱 Reconozco lo que hago bien.
7. 🌱 Cuando cambian mis planes.
8. 🌱 También intento comprender a los demás.
9. 🌱 Organizo mis ideas antes de hablar.
10. 🌱 Reparamos lo que ocurrió.

El backlog no implica compromiso de implementación.

Cada Semilla deberá justificarse por valor real.

---

## 31. Decisiones aprobadas

Quedan aprobadas las siguientes decisiones:

1. El módulo se denomina **🌱 Creciendo por dentro**.
2. Forma parte de **Mi Universo**.
3. Sus actividades se denominan **Semillas**.
4. La primera Semilla será **Aprendo a decir lo que siento**.
5. La primera Semilla estará inspirada en DESC.
6. Lía acompañará sin evaluar ni asumir un rol terapéutico.
7. No habrá puntuaciones, rankings ni respuestas emocionales correctas.
8. El progreso se representará como crecimiento.
9. El Jardín Personal será una evolución posterior.
10. La primera implementación será pequeña y validable.
11. El módulo deberá alinearse siempre con `FOUNDATION.md`.
12. La familia y los profesionales podrán aportar, sin que la Academia sustituya su función.
13. La expresión oral y la grabación serán prioritarias frente a la escritura con teclado.
14. La grabación final se conservará.
15. El análisis de voz podrá utilizarse con finalidad educativa, no diagnóstica.
16. El módulo ayudará a reducir progresivamente la vergüenza y el miedo al error.
17. El deseo de volver a la Academia será un indicador de éxito.
18. Las Semillas podrán asignarse como parte de Misiones y aparecer en Mi Camino.
19. El módulo reutilizará los patrones de Detectives y Mi Rincón de Lectura.
20. El contenido se administrará mediante un archivo configurable equivalente a `semillas.json`.
21. El módulo tendrá su propia carpeta.
22. El historial deberá generar insumos útiles para el acompañamiento.
23. En el piloto, la familia autorizada podrá acceder a toda la información generada.
24. La palabra DESC no se mostrará al alumno por defecto.
25. La revisión de la psicóloga enriquecerá versiones posteriores y no bloqueará el piloto.
26. El Motor de Semillas validará el modelo descrito en `MODEL-MOTORES_DE_APRENDIZAJE.md`.

---

## 32. Preguntas abiertas

Deberán resolverse durante el diseño y la implementación del piloto:

1. ¿Qué formulación exacta de DESC recomienda la psicóloga para Gloria cuando sea posible consultarla?
2. ¿Qué situación inicial resulta más cercana y útil después de probarla con Gloria?
3. ¿Qué conjunto inicial de emociones ofrece suficiente variedad sin aumentar la carga cognitiva?
4. ¿Qué análisis educativo de voz puede reutilizarse de Mi Rincón de Lectura?
5. ¿Qué formato y retención tendrán las grabaciones finales?
6. ¿Cómo se representará visualmente el primer brote?
7. ¿Qué filtros estarán activos en la primera entrega y cuáles quedarán preparados?
8. ¿Qué insumo inicial generará el historial?
9. ¿Qué componentes existentes pueden reutilizarse sin introducir acoplamiento innecesario?
10. ¿Qué estructura definitiva tendrá `semillas.json`?

Quedan resueltas como decisiones:

- la grabación aporta valor y será principal;
- la grabación final se guardará;
- la familia verá toda la información autorizada durante el piloto;
- el módulo tendrá su propia carpeta;
- se reutilizará la integración con Misiones;
- DESC no se mostrará al alumno por defecto;
- la validación profesional no bloqueará la primera implementación.

Estas preguntas no bloquean la aprobación del marco funcional.

---

## 33. Glosario

### Academia

Ecosistema educativo y personal definido por `FOUNDATION.md`.

### Creciendo por dentro

Módulo de Mi Universo dedicado a habilidades personales, emocionales, comunicativas y sociales.

### Semilla

Experiencia breve de crecimiento centrada en una habilidad.

### Jardín Personal

Representación visual no competitiva del recorrido del alumno.

### Lía

Compañera de viaje que guía y acompaña dentro de la Academia.

### DESC

Estructura de comunicación utilizada como base de la primera Semilla:

- Describir.
- Expresar.
- Solicitar o sugerir.
- Consecuencia.

La terminología final se mantendrá configurable.

El acrónimo no se mostrará al alumno por defecto durante el piloto.

### Crecimiento

Participación, práctica, reflexión y desarrollo progresivo.

No equivale a puntuación ni nivel clínico.

---

# Declaración final

Cada Semilla representa una oportunidad para crecer.

Cada conversación practicada puede convertirse en una herramienta para la vida.

Cada emoción comprendida puede ayudar a un niño a conocerse mejor.

Cada pequeño paso merece ser reconocido.

Porque la Academia no acompaña únicamente el aprendizaje de los niños.

Acompaña también la construcción de la persona que están llegando a ser.

Y todo este camino conserva siempre sus raíces.

Porque **Creciendo por dentro**, como la propia Academia, nació pensando primero en una niña llamada:

# **Gloria Valentina**

🌱💜
