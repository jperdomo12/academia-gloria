# 🌈 Academia Gloria Valentina
# DISEÑO — SISTEMA DE MOTIVACIÓN Y RECONOCIMIENTO

| Campo | Valor |
|---|---|
| **Ruta oficial propuesta** | `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` |
| **Versión** | 1.0-draft |
| **Estado** | Diseño fundacional · En revisión |
| **Fecha** | 01/09/2026 |
| **Responsables** | Juan Perdomo + Arquitectura colaborativa con IA |
| **Ámbito** | Motivación, reconocimiento, recompensas, Guacamayas, récord personal, Lía y retos cooperativos |

---

## 1. Propósito

Definir el sistema de motivación y reconocimiento de la Academia Gloria Valentina antes de implementar sus reglas, datos o interfaces.

El objetivo no es construir un sistema de premios.

El objetivo es ayudar a que el alumno:

- quiera comenzar;
- quiera continuar;
- pueda volver a intentarlo después de una dificultad;
- reconozca su propio progreso;
- desarrolle confianza y autonomía;
- disfrute aprender;
- descubra intereses propios;
- aprenda a pedir ayuda sin vivirlo como fracaso;
- se compare principalmente consigo mismo;
- y quiera regresar a la Academia porque la experiencia tiene sentido para él.

La motivación es una capacidad transversal del producto, no una pantalla aislada.

> **La recompensa visible es solo una de las herramientas. La meta real es construir deseo de aprender, confianza para actuar y capacidad para levantarse después de caer.**

---

## 2. Posición dentro de la arquitectura existente

Este documento NO crea una filosofía nueva. Desarrolla decisiones que ya existen en la Academia.

Documentos que lo gobiernan:

- `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md`
- `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
- `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md`
- `docs/vision/01_PRINCIPIOS_PEDAGOGICOS.md`
- `docs/vision/07_IDENTIDAD_GUACAMAYAS.md`
- `docs/vision/08_MI_CAMINO.md`
- `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`

La arquitectura actual ya establece que:

- motivación y reconocimiento constituyen un dominio propio;
- las recompensas no deben sustituir la motivación interna;
- no deben comparar alumnos;
- no deben castigar;
- no deben generar ansiedad;
- las Guacamayas pueden formar parte del reconocimiento, pero no representan competición, presión, superioridad, perfección ni premio material;
- Mi Camino debe mostrar el crecimiento personal;
- y la IA no debe conceder recompensas relevantes sin supervisión cuando la decisión sea sensible.

Este documento concreta esas reglas.

---

## 3. Base profesional que orienta el diseño

### 3.1 Teoría de la Autodeterminación

La Self-Determination Theory (SDT) ofrece una base especialmente adecuada para la Academia porque diferencia motivación autónoma de motivación controlada y sitúa tres necesidades psicológicas como fundamentales:

1. **Autonomía** — sentir que puedo elegir, comprender el propósito y actuar con participación propia.
2. **Competencia** — percibir que puedo progresar, desarrollar habilidades y superar retos alcanzables.
3. **Relación / pertenencia** — sentir acompañamiento, vínculo y seguridad con las personas relevantes.

Revisiones y meta-análisis recientes en educación indican que intervenciones basadas en SDT pueden favorecer motivación intrínseca, autonomía y competencia, y que el apoyo a la autonomía se relaciona con compromiso, autorregulación, creencias positivas sobre uno mismo y resultados de aprendizaje.

**Implicación para la Academia:** el sistema de motivación debe apoyar `quiero / puedo / pertenezco`, no `debo hacerlo para ganar algo`.

### 3.2 Elogio y reconocimiento

La literatura sobre elogio infantil muestra que no todo elogio ayuda de la misma manera. Resulta más favorable cuando es:

- sincero;
- específico;
- informativo;
- relacionado con acciones o estrategias controlables;
- compatible con autonomía;
- y no basado en comparación social.

**Preferir:**

> “Esta vez probaste otra estrategia cuando la primera no funcionó.”

**Evitar como patrón habitual:**

> “Eres la mejor.”

> “Eres súper inteligente.”

> “Ganaste porque eres mejor que los demás.”

El reconocimiento no debe inventar méritos. Si algo salió mal, puede reconocerse la perseverancia o la estrategia sin afirmar falsamente que la respuesta fue correcta.

### 3.3 Recompensas externas

Existe evidencia de que recompensas tangibles o percibidas como controladoras pueden debilitar la motivación intrínseca en determinadas condiciones.

**Implicación para la Academia:**

- no crear una economía de puntos;
- no pagar cada acción con una recompensa;
- no convertir una Misión en una transacción;
- usar símbolos principalmente como información emocional sobre progreso real;
- y mantener las recompensas de alto significado escasas y explicables.

### 3.4 Metas de dominio y competición

La orientación hacia mejorar la propia competencia (mastery-approach) se asocia de forma más favorable con emociones positivas y, en meta-análisis recientes, con menor ansiedad que metas centradas en evitar quedar por debajo de otros.

La Academia puede fomentar una **competitividad sana**, pero su forma primaria será:

> **Gloria hoy frente a Gloria anteriormente.**

Los Récords Personales materializan esta idea.

No habrá rankings ni tablas comparativas entre alumnos.

### 3.5 Consideraciones DLD / TEL / TDL

La literatura sobre Developmental Language Disorder (DLD) muestra heterogeneidad importante, pero también una mayor frecuencia de dificultades socioemocionales y ansiedad en algunos niños, junto con fortalezas reales en áreas como conductas prosociales, autonomía cotidiana, juego y afrontamiento.

Investigaciones recientes señalan especialmente:

- relación entre DLD y mayores dificultades de regulación emocional en promedio;
- presencia elevada de ansiedad en algunas muestras;
- posible relevancia de intolerancia a la incertidumbre;
- importancia de observar fortalezas funcionales y factores protectores, no únicamente déficits;
- valor de la participación familiar y de contextos que favorezcan autonomía;
- y evidencia de que la motivación autónoma también resulta relevante en jóvenes con DLD.

**Implicación para la Academia:**

El sistema no pretende tratar ansiedad ni sustituir intervención profesional. Debe, sin embargo, evitar diseños que añadan presión innecesaria y favorecer:

- reglas previsibles;
- mensajes breves y claros;
- ayuda visible;
- ausencia de pérdida o amenaza;
- posibilidad de repetir;
- tiempo suficiente;
- elección cuando sea posible;
- reconocimiento de fortalezas;
- y seguridad para equivocarse.

---

## 4. Resultados humanos que queremos favorecer

La Academia aspira a reforzar progresivamente una persona:

- **feliz**, para quien aprender no sea sinónimo de presión;
- **independiente**, capaz de hacer cada vez más por sí misma;
- **analítica**, que observe, piense y busque estrategias;
- **curiosa**, que quiera leer, descubrir y aprender;
- **perseverante**, capaz de caer, recuperar confianza y volver a intentarlo;
- **competitiva de forma sana**, buscando mejorar respecto a sí misma y afrontar retos;
- **capaz de pedir ayuda**, sin interpretarlo como derrota;
- **capaz de reconocer sus fortalezas** sin negar aquello que necesita practicar;
- **con sentido de pertenencia**, acompañada por familia y Academia sin sentirse controlada.

Estos resultados son direcciones de producto, no diagnósticos ni métricas psicológicas automáticas.

---

## 5. Modelo motivacional de la Academia

El sistema se apoyará en cinco pilares.

### 5.1 QUIERO — Autonomía y sentido

El alumno comprende para qué sirve una actividad y dispone de elección cuando la elección sea realista.

Ejemplos:

- elegir entre historias compatibles con una Misión;
- escoger por cuál reto comenzar;
- conocer por qué conviene practicar algo;
- decidir volver a intentar una actividad.

### 5.2 PUEDO — Competencia y progreso visible

El sistema hace visible la mejora sin exigir perfección.

Ejemplos:

- menos pistas que en una experiencia comparable;
- una estrategia nueva utilizada correctamente;
- completar una actividad que antes quedó en curso;
- realizar una parte con mayor autonomía.

### 5.3 PERTENEZCO — Relación y acompañamiento

La familia y Lía acompañan sin convertir la experiencia en vigilancia.

Ejemplos:

- reconocimiento familiar;
- retos cooperativos;
- mensaje breve de Lía basado en un hecho real;
- celebrar juntos un hito importante.

### 5.4 ME SUPERO — Resiliencia y dominio personal

El sistema reconoce el proceso de enfrentarse a una dificultad y volver a actuar.

Ejemplos:

- regresar después de necesitar ayuda;
- reintentar con una estrategia distinta;
- completar una práctica después de varios intentos;
- mantener la calma suficiente para continuar paso a paso.

### 5.5 MI CAMINO IMPORTA — Identidad, memoria y significado

Los hitos importantes se conservan como historia personal.

Una recompensa duradera debe poder responder:

> “¿Qué ocurrió para que recibiera esto?”

La respuesta nunca será simplemente:

> “Porque acumulaste 500 puntos.”

---

## 6. Cuatro mecanismos principales de Recompensas v1

### 6.1 ✨ Reconocimiento de Lía o de la familia

**Propósito:** reconocer una acción concreta y valiosa.

Puede ser relativamente frecuente, pero no automático por cada clic o cada finalización.

Ejemplos:

- “Volviste a intentarlo usando otra estrategia.”
- “Hoy elegiste por ti misma qué lectura comenzar.”
- “Terminaste algo que habías dejado pendiente.”

#### Origen

- automático cuando exista un hecho observable suficientemente claro;
- manual por la familia cuando el significado humano no pueda deducirse del dato;
- eventualmente propuesto por profesionales autorizados, según permisos futuros.

#### Persistencia

Puede conservarse en el historial de crecimiento, pero no necesita presentarse como un gran trofeo permanente.

---

### 6.2 🏅 Récord Personal

**Propósito:** hacer visible una mejora respecto a experiencias anteriores comparables.

Regla central:

> Un Récord Personal debe demostrarse con datos reales.

No se asigna manualmente.

Solo se genera cuando la comparación sea válida.

Ejemplos potenciales:

- misma familia de actividad y dificultad comparable;
- menos pistas utilizadas;
- menos intentos para resolver una etapa equivalente;
- mayor autonomía observable cuando exista una métrica válida;
- mejora en una prueba académica comparable cuando la estructura permita esa comparación.

#### No se utilizará

- para comparar actividades no equivalentes;
- para pronunciación clínica inferida desde reconocimiento de voz;
- para afirmar mejoras que el dato no pueda sostener;
- para comparar con otros alumnos.

---

### 6.3 🦜 Guacamaya / Hito significativo

**Propósito:** conservar hitos verdaderamente especiales de crecimiento.

La Guacamaya NO es moneda.

No se entrega por cada Misión.

No se acumula para comprar nada.

No se pierde.

No representa superioridad.

Cada Guacamaya debe conservar:

- nombre / significado;
- fecha;
- hecho que la originó;
- fuente real;
- mensaje breve;
- y, cuando corresponda, Misión o experiencia asociada.

#### Primera orientación

Las Guacamayas pueden representar familias de significado, por ejemplo:

- valentía / volver a intentarlo;
- autonomía;
- curiosidad / descubrimiento;
- constancia significativa;
- trabajo en equipo;
- crecimiento personal.

El catálogo final deberá ser pequeño al inicio.

#### Autoridad v1

Para un hito de alto significado, el sistema puede **proponer una Guacamaya**, pero la concesión deberá poder ser confirmada por la familia en la primera versión.

La familia también podrá iniciar una concesión sobre una experiencia real ya completada.

---

### 6.4 🤝 Reto cooperativo

**Propósito:** reforzar pertenencia, acompañamiento y colaboración.

Un reto cooperativo requiere aportes distintos, no duplicados.

Ejemplo:

```text
Gloria realiza una Misión
        +
La familia revisa / conversa / acompaña
        ↓
Reto en equipo completado
```

No debe convertir la validación familiar en una obligación constante ni añadir presión innecesaria.

Algunos retos cooperativos especiales podrán originar una Guacamaya de Equipo.

---

## 7. Reconocimiento humano sobre Misiones completadas

Requisito explícito de v1:

> **La familia podrá reconocer una Misión ya completada, incluso si el sistema no generó automáticamente una recompensa en el momento de finalizarla.**

Esto permite reconocer:

- Misiones libres;
- actividades de 5.º sin persistencia automática;
- Semillas de Creciendo por Dentro;
- logros cuyo valor depende del contexto familiar;
- y actividades completadas antes de existir Recompensas v1.

### 7.1 Integridad histórica

No se fingirá que Lía detectó retrospectivamente algo que no detectó.

Se diferenciarán:

- fecha de la actividad;
- fecha del reconocimiento;
- quién concedió el reconocimiento;
- y motivo.

Ejemplo:

```text
✨ Reconocimiento de la familia
Por: “Algo que conseguí esta semana”
Misión completada: 31/08/2026
Reconocimiento otorgado: 01/09/2026

“Te detuviste a pensar en algo que has conseguido y reconociste tu propio esfuerzo. Eso también es crecer.”
```

### 7.2 Caso real de diseño

La Misión:

> **Algo que conseguí esta semana**

se utilizará como uno de los primeros casos reales para validar el diseño manual de reconocimiento.

---

## 8. Reglas no negociables

Recompensas v1 NO tendrá:

- rankings;
- clasificación entre alumnos;
- ganador / perdedor;
- pérdida de recompensas por errores;
- pérdida de recompensas por inactividad;
- “racha perdida”;
- castigos visuales;
- monedas;
- tienda de premios;
- puntos como fin principal;
- recompensa por login;
- recompensa por navegar o hacer clic;
- premio garantizado por cada actividad;
- mensajes de culpa;
- cuenta atrás artificial para generar presión;
- afirmaciones clínicas sobre ansiedad, TEL/DLD, pronunciación o salud emocional;
- ni recompensa automática basada en datos de prueba identificados como tales.

Una recompensa concedida correctamente forma parte de la historia personal y no se retira como mecanismo disciplinario.

Los errores administrativos o duplicados podrán corregirse con trazabilidad; eso no equivale a “perder una recompensa”.

---

## 9. Datos reales y trazabilidad

Toda recompensa debe identificar su fundamento.

### 9.1 Fuentes posibles

- Misión real;
- evidencia de Misión;
- sesión de Detectives;
- sesión académica;
- sesión de lectura;
- sesión de Creciendo por Dentro;
- práctica de pronunciación como actividad, sin interpretación clínica;
- Biblioteca;
- observación familiar;
- validación familiar;
- decisión manual explícita sobre una Misión completada.

### 9.2 Tres clases de origen

**OBSERVADO**  
El dato prueba directamente lo ocurrido.

**DERIVADO**  
Una regla compara datos observados y produce una conclusión limitada y explicable.

**HUMANO**  
La familia atribuye significado a una experiencia real.

La interfaz y el modelo deben conservar esta diferencia.

### 9.3 Datos de prueba

Una Misión marcada `esDatoPrueba=true` no debe generar automáticamente reconocimientos duraderos, Récords Personales ni Guacamayas.

La marca de prueba protege la integridad motivacional del historial.

---

## 10. Lenguaje de reconocimiento

Los mensajes deben ser:

- breves;
- concretos;
- comprensibles;
- positivos sin exageración;
- relacionados con el hecho observado;
- orientados a estrategia, decisión, esfuerzo útil o progreso;
- compatibles con el nivel de lenguaje del alumno.

### 10.1 Patrón recomendado

```text
QUÉ OCURRIÓ
+ POR QUÉ IMPORTA
+ INVITACIÓN SUAVE A CONTINUAR (opcional)
```

Ejemplo:

> “Esta vez pediste una pista y después continuaste tú sola. Supiste usar la ayuda para seguir avanzando.”

### 10.2 Evitar

- etiquetas globales de personalidad;
- superioridad;
- falsa precisión;
- elogio automático repetitivo;
- mensajes demasiado largos;
- lenguaje que convierta pedir ayuda en debilidad;
- minimizar una dificultad real;
- afirmar “perfecto” cuando no lo fue.

---

## 11. Salvaguardas de ansiedad, accesibilidad y TEL/DLD

El sistema motivacional debe aumentar seguridad, no incertidumbre.

### 11.1 Previsibilidad

El alumno debe poder entender:

- qué está haciendo;
- qué cuenta como avance;
- por qué recibió un reconocimiento;
- y qué puede hacer después.

### 11.2 Sin amenaza de pérdida

Nada relevante desaparece por no entrar mañana.

### 11.3 Ritmo propio

No se premiará sistemáticamente “hacerlo más rápido”.

El tiempo solo será una métrica cuando la propia actividad lo justifique y no genere presión perjudicial.

### 11.4 Ayuda normalizada

Pedir ayuda puede coexistir con progreso y reconocimiento.

El objetivo no es “no usar nunca pistas”.

El objetivo puede ser aprender a utilizarlas y necesitar progresivamente menos apoyo cuando realmente ocurra.

### 11.5 Carga lingüística

Los mensajes principales deberán:

- contener una idea central;
- evitar frases innecesariamente complejas;
- utilizar iconos consistentes;
- separar explicación de detalle;
- permitir lectura visual rápida.

### 11.6 Fortalezas antes que etiquetas

La Academia no construirá perfiles motivacionales del tipo:

> “Gloria es ansiosa.”

> “Gloria tiene poca perseverancia.”

Podrá registrar hechos como:

> “En esta actividad pidió ayuda dos veces y después continuó.”

El dato observable no se convertirá automáticamente en una etiqueta permanente.

---

## 12. Integración principal: Mi Camino → Así voy creciendo

El hogar principal del reconocimiento será:

```text
Mi Camino
   ↓
Así voy creciendo
```

El bloque actual `Semilla → Brote → Árbol` se conserva conceptualmente.

La primera evolución puede mostrar:

### ✨ Lo último que Lía o mi familia reconoció

Un reconocimiento reciente y explicable.

### 🦜 Mis Guacamayas

Hitos especiales conservados.

### 🏅 Mi mejor marca reciente

Solo cuando exista un Récord Personal válido.

### 🤝 Nuestro reto en familia

Un único reto cooperativo activo, si existe.

### 🌱 Mi etapa de crecimiento

Semilla / Brote / Árbol continúa como metáfora de largo plazo.

**No se definirá todavía el paso de etapa mediante un umbral simple de puntos.**

Su significado y reglas requieren una decisión posterior dentro de este mismo diseño.

---

## 13. Frecuencia e intensidad

No todo merece la misma celebración.

### Nivel 1 — Reconocimiento suave

Frecuente cuando existe un hecho real que merece hacerse visible.

Ejemplo: mensaje de Lía.

### Nivel 2 — Récord o logro concreto

Menos frecuente.

Requiere comparación válida o condición definida.

### Nivel 3 — Guacamaya / hito

Especial y poco frecuente.

Debe conservar significado con el paso del tiempo.

> **Si todo es extraordinario, nada lo es.**

Como regla inicial, una experiencia puede producir varios datos útiles, pero no debe desencadenar una cascada de celebraciones simultáneas.

---

## 14. Competitividad sana

La Academia no elimina el reto ni la ambición.

Los orienta.

Formas aceptables:

- superar una mejor marca propia;
- intentar un nivel más complejo voluntariamente;
- completar un desafío personal;
- cooperar con familia;
- plantearse una meta elegida;
- celebrar una mejora de estrategia.

Formas no aceptables en v1:

- “eres número 1”;
- ranking de compañeros;
- tablas de posiciones;
- premio por superar a otro niño;
- pérdida pública;
- presión por mantener una posición.

---

## 15. Lectura y curiosidad

Recompensas v1 debe poder favorecer lectura y aprendizaje sin convertir cantidad en competición.

Ejemplos de hechos potencialmente reconocibles:

- elegir voluntariamente una lectura;
- regresar a una historia para comprenderla mejor;
- compartir un libro;
- mantener una práctica de lectura significativa;
- descubrir una temática nueva;
- expresar una reflexión personal sobre lo leído.

No se premiará automáticamente “leer más páginas que antes” si la comparación no aporta valor educativo.

---

## 16. Papel de Lía

Lía puede:

- reconocer hechos observables;
- explicar por qué un progreso importa;
- proponer un próximo paso;
- presentar un Récord Personal calculado por una regla válida;
- proponer a la familia una posible Guacamaya;
- acompañar un reto cooperativo.

Lía no puede:

- inventar progreso;
- diagnosticar;
- otorgar automáticamente recompensas de alto significado cuando la regla requiera revisión humana;
- presionar para mantener una racha;
- comparar con otros alumnos;
- retirar reconocimientos.

---

## 17. Papel de la familia

La familia puede:

- reconocer una Misión completada;
- escribir un mensaje personal;
- confirmar una Guacamaya propuesta;
- conceder una Guacamaya cuando exista un hecho real y una categoría válida;
- proponer retos cooperativos;
- revisar el historial de reconocimientos.

La familia no necesita convertir cada actividad en una evaluación.

El sistema debe facilitar acompañar y celebrar, no vigilar permanentemente.

---

## 18. Modelo conceptual mínimo

Antes de decidir Firestore, el dominio necesita al menos la entidad conceptual:

```text
RECONOCIMIENTO
- id
- personaId
- tipo
- categoria
- titulo
- mensaje
- origen: observado | derivado | humano
- fuenteTipo
- fuenteId
- misionId? 
- concedidoPor
- fechaHecho
- fechaReconocimiento
- datosSoporte? 
- estado
```

Para Récord Personal deberá conservar además la comparación que permite explicar la mejora.

Para Guacamaya deberá conservar el significado del hito y su categoría.

No se aprueba todavía una colección Firestore concreta.

Primero se revisarán modelos y APIs existentes antes de crear estructura nueva.

---

## 19. Recompensas y eliminación de Misiones

Debe definirse antes de implementar cómo se comporta un reconocimiento cuando una Misión fuente se elimina.

Principio propuesto:

- si la Misión se elimina porque era prueba o dato erróneo, no debe quedar una recompensa automática huérfana que afirme un hecho inexistente;
- si existe un reconocimiento humano con significado independiente, el sistema deberá advertir antes de eliminar la Misión y permitir una decisión explícita según reglas futuras;
- el borrado nunca debe ocurrir silenciosamente.

Esta relación deberá integrarse con el motor actual de eliminación completa de Misiones.

---

## 20. Recompensas retroactivas

La familia podrá reconocer actividades históricas reales.

Reglas:

1. No inventar métricas que no fueron almacenadas.
2. No generar retrospectivamente Récords Personales sin datos comparables.
3. Sí permitir reconocimiento humano sobre una Misión completada.
4. Sí permitir Guacamaya humana cuando el hecho real pueda identificarse y la categoría sea válida.
5. Mostrar por separado fecha del hecho y fecha de concesión.

---

## 21. Alcance de implementación recomendado para v1

El diseño completo puede crecer incrementalmente.

### Fase A — Base visible y humana

- entidad de Reconocimiento;
- `🌟 Añadir reconocimiento` desde Misión completada;
- reconocimiento de familia;
- primeras Guacamayas curadas / confirmadas por familia;
- visualización en `Así voy creciendo`;
- historial sencillo;
- exclusión de datos de prueba.

### Fase B — Reconocimiento automático explicable

- primeros eventos automáticos de Lía;
- deduplicación;
- reglas de frecuencia;
- trazabilidad de fuente.

### Fase C — Récord Personal

- comenzar por un motor con comparabilidad sólida, previsiblemente Detectives;
- validar reglas con datos reales antes de ampliar.

### Fase D — Retos cooperativos

- modelo de reto;
- acciones diferenciadas alumno / familia;
- cierre y reconocimiento.

### Fase E — Evolución de Semilla / Brote / Árbol

- definir significado real de las etapas;
- evitar equivalencia directa con puntos acumulados;
- utilizar suficiente historia antes de aprobar reglas.

---

## 22. Criterios de éxito de Recompensas v1

El sistema será exitoso si observamos que:

- el alumno comprende por qué recibe un reconocimiento;
- los reconocimientos se sienten relacionados con hechos reales;
- una Guacamaya conserva valor emocional;
- el alumno habla de su progreso sin necesitar compararse con otros;
- pedir ayuda no se percibe como perder;
- los errores no producen miedo a perder recompensas;
- la familia puede reconocer logros que el sistema no sabe interpretar;
- el alumno muestra interés por volver y descubrir qué sigue;
- y la capa motivacional no distrae del aprendizaje.

No se considerará éxito simplemente aumentar clics, sesiones abiertas o tiempo de pantalla.

---

## 23. Decisiones abiertas antes de implementar

1. Catálogo inicial exacto de Guacamayas (4–6 como máximo recomendado para comenzar).
2. Primera lista de reglas automáticas de Reconocimiento de Lía.
3. Primer conjunto de Récords Personales técnicamente comparables.
4. Regla de deduplicación y frecuencia.
5. Comportamiento exacto al eliminar una Misión con reconocimiento asociado.
6. Permisos de familia / profesionales para conceder o proponer reconocimientos.
7. Significado futuro de Semilla / Brote / Árbol.
8. Diseño visual de `Así voy creciendo`.
9. Primer Reto Cooperativo real.

---

## 24. Referencias profesionales iniciales

Estas referencias orientan decisiones de diseño. No convierten a la Academia en una herramienta clínica.

1. Wang, Y. et al. (2024). *A systematic review and meta-analysis of self-determination-theory-based interventions in the education context*. Learning and Motivation, 87, 102015. DOI: https://doi.org/10.1016/j.lmot.2024.102015
2. Ryan, R. M., & Deci, E. L. (2020). *Intrinsic and extrinsic motivation from a self-determination theory perspective: Definitions, theory, practices, and future directions*. Contemporary Educational Psychology, 61, 101860. DOI: https://doi.org/10.1016/j.cedpsych.2020.101860
3. Henderlong, J., & Lepper, M. R. (2002). *The effects of praise on children's intrinsic motivation: A review and synthesis*. Psychological Bulletin, 128(5), 774–795. DOI: https://doi.org/10.1037/0033-2909.128.5.774
4. Deci, E. L., Koestner, R., & Ryan, R. M. (2001). *Extrinsic Rewards and Intrinsic Motivation in Education: Reconsidered Once Again*. Review of Educational Research, 71(1). DOI: https://doi.org/10.3102/00346543071001001
5. Diaconu-Gherasim, L. R. et al. (2024). *A Meta-Analysis of the Relations Between Achievement Goals and Internalizing Problems*. Educational Psychology Review, 36, 109. DOI: https://doi.org/10.1007/s10648-024-09943-5
6. *Understanding the prevalence and manifestation of anxiety and other socio-emotional and behavioural difficulties in children with Developmental Language Disorder*. PubMed PMID 37322422: https://pubmed.ncbi.nlm.nih.gov/37322422/
7. Mateus-Moreno, A. et al. (2026). *Emotion regulation in children and adolescents with developmental language disorder: A systematic review and meta-analysis*. Child Development. PubMed PMID 42560654: https://pubmed.ncbi.nlm.nih.gov/42560654/
8. McGregor, K. K. et al. (2023). *Abilities and Disabilities Among Children With Developmental Language Disorder*. Language, Speech, and Hearing Services in Schools, 54(3), 927–951. DOI: https://doi.org/10.1044/2023_LSHSS-22-00070
9. *Examining the contribution of motivation in the job search of youth with developmental language disorder*. PubMed PMID 36762259: https://pubmed.ncbi.nlm.nih.gov/36762259/
10. Lloyd-Esenkaya, V., Russell, A. J., & St Clair, M. C. (2020). *What Are the Peer Interaction Strengths and Difficulties in Children with Developmental Language Disorder? A Systematic Review*. DOI: https://doi.org/10.3390/ijerph17093140

---

## 25. Declaración de diseño

> **Recompensas v1 no premiará obediencia ni perfección. Hará visible el crecimiento real.**
>
> Reconocerá decisiones, estrategias, esfuerzo útil, autonomía, perseverancia, curiosidad y vínculos significativos.
>
> Las Guacamayas conservarán momentos especiales. Los Récords Personales mostrarán que uno puede superarse a sí mismo. Lía pondrá palabras breves a progresos observables. La familia aportará el significado humano que ningún algoritmo puede conocer por completo.
>
> Y ninguna recompensa deberá hacer que aprender deje de ser la verdadera aventura.
