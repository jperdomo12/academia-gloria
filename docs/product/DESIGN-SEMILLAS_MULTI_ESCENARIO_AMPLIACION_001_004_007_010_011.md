# 🌱 Semillas multi-escenario · Ampliación 001 / 004 / 007 / 010 / 011
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/product/DESIGN-SEMILLAS_MULTI_ESCENARIO_AMPLIACION_001_004_007_010_011.md` |
| **Versión** | 0.1 |
| **Estado** | Contenido y UX aprobados · pendiente de implementación |
| **Última actualización** | 02/11/2026 |
| **Propietario** | Producto · Creciendo por Dentro |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Ampliación curada del patrón multi-escenario a Semillas 001, 004, 007, 010 y 011; badge informativo `🌱 N situaciones` |

## 1. Objetivo

Extender el patrón validado funcionalmente en `Yo sí puedo` a cinco Semillas adicionales, conservando la regla:

> **Semilla = habilidad estable. Escenario = situación concreta donde se practica esa misma habilidad.**

No se crean nuevas Semillas ni se altera la habilidad primaria de las existentes.

La ampliación busca permitir una prueba familiar más representativa del modelo multi-escenario antes de declararlo estable.

## 2. Alcance aprobado

Semillas que pasan a tres escenarios totales:

- 001 · `Aprendo a decir lo que siento`
- 004 · `Nos escuchamos y buscamos un acuerdo`
- 007 · `Puedo elegir diferente`
- 010 · `Un momento para mí también está bien`
- 011 · `Puedo aceptar apoyo y seguir siendo capaz`

Se conserva sin cambios el escenario actual de cada Semilla y se añaden dos escenarios nuevos.

`Yo sí puedo` conserva sus tres escenarios existentes y forma parte del piloto ampliado.

Tras la implementación habrá seis Semillas multi-escenario.

## 3. Regla UX del catálogo

Se aprueba mostrar en la tarjeta de catálogo una marca informativa automática cuando una Semilla tenga más de un escenario:

> `🌱 N situaciones`

Reglas:

- `escenarios.length > 1` → mostrar `🌱 N situaciones`;
- una Semilla tradicional/sin pluralidad → no mostrar badge;
- el número se deriva del catálogo real; no se mantiene manualmente;
- no es un indicador de progreso;
- no mostrar `1/3`, porcentaje, checklists ni mensajes que sugieran que todos los escenarios son obligatorios;
- debe conservar la jerarquía visual y no competir con familia, duración o estado `Practicada`.

El significado para el usuario es únicamente: **esta habilidad puede practicarse en distintos contextos**.

## 4. Semilla 001 · Aprendo a decir lo que siento

### Habilidad estable
Organizar un hecho que molesta y comunicarlo con claridad y respeto mediante `Describir → Expresar → Solicitar → Consecuencia/mejora`.

### Escenario actual
`El lápiz` — se conserva sin cambios.

### Nuevo escenario · Quiero terminar de hablar
- **id:** `quiero-terminar-de-hablar`
- **descripción:** `Cuando alguien te interrumpe mientras estás explicando algo.`
- **tipoSituacion:** `colegio`
- **situación:** `Estás contando una idea en clase. Una compañera empieza a hablar antes de que hayas terminado y te cuesta continuar.`

**Describir**
- `Una compañera empezó a hablar antes de que yo terminara.` · recomendada
- `Nunca me deja hablar.`
- `Lo hizo para fastidiarme.`
- otra respuesta permitida

**Expresar**
- Enfadada
- Nerviosa
- Confundida
- Triste
- No estoy segura
- otra respuesta permitida

**Solicitar**
- `Que me deje terminar lo que estaba diciendo.`
- `Que espere un momento antes de hablar.`
- `Que después pueda contar también su idea.`
- otra respuesta permitida

**Consecuencia**
- `Podremos escucharnos mejor.`
- `Podré explicar mi idea completa.`
- `Las dos podremos hablar por turnos.`
- otra respuesta permitida

### Nuevo escenario · Ese apodo no me gusta
- **id:** `ese-apodo-no-me-gusta`
- **descripción:** `Cuando alguien te llama de una manera que no te gusta.`
- **tipoSituacion:** `colegio`
- **situación:** `Una compañera te llama por un apodo que a ti no te gusta. Quieres explicárselo sin discutir.`

**Describir**
- `Una compañera me llamó por un apodo que no me gusta.` · recomendada
- `Se está burlando de mí.`
- `Siempre quiere hacerme sentir mal.`
- otra respuesta permitida

**Expresar**
- Enfadada
- Triste
- Nerviosa
- Confundida
- No estoy segura
- otra respuesta permitida

**Solicitar**
- `Que me llame por mi nombre.`
- `Que no use ese apodo conmigo.`
- `Que me pregunte si un apodo me gusta antes de usarlo.`
- otra respuesta permitida

**Consecuencia**
- `Podrá saber cómo prefiero que me llame.`
- `Podremos entendernos mejor.`
- `Me sentiré más cómoda cuando hablemos.`
- otra respuesta permitida

**Frontera:** 001 expresa un límite/necesidad personal. No debe convertirse en negociación conjunta de 004 ni en conversación social de 012.

## 5. Semilla 004 · Nos escuchamos y buscamos un acuerdo

### Habilidad estable
Describir un conflicto compartido sin culpar, considerar la perspectiva de la otra persona, expresar necesidades y buscar un acuerdo que cuide a ambas.

### Escenario actual
`Las dos queremos jugar primero` — se conserva sin cambios.

### Nuevo escenario · Tenemos dos ideas distintas
- **id:** `tenemos-dos-ideas-distintas`
- **descripción:** `Cuando tenéis que hacer algo juntas y cada una propone una forma diferente.`
- **tipoSituacion:** `colegio`
- **situación:** `En clase, tú y una compañera tenéis que preparar una parte de un trabajo juntas. Tú quieres hacerlo de una manera y ella propone otra. Las dos defendéis vuestra idea y empezáis a molestaros.`

**Comprender**
- `Tenemos dos ideas diferentes para hacer el mismo trabajo.`
- `Mi compañera quiere mandar siempre.`
- `Su idea está mal.`
- otra respuesta permitida

**Perspectiva**
- `Puede pensar que su idea también puede funcionar.`
- `Quizá quiere que escuche su propuesta.`
- `Puede estar molesta porque siente que no la estoy teniendo en cuenta.`
- `No estoy segura de lo que siente.`
- otra respuesta permitida

**Hablar**
- `A mí me gusta mi idea, pero quiero entender la tuya también.`
- `Tenemos dos ideas. ¿Miramos qué nos gusta de cada una?`
- `Creo que las dos queremos que el trabajo salga bien. Busquemos una forma que nos sirva.`
- otra respuesta permitida

**Acuerdo**
- `Combinar una parte de cada idea.`
- `Probar brevemente las dos opciones y decidir después.`
- `Repartir partes del trabajo si las dos ideas pueden usarse.`
- `Elegir juntas la opción que mejor cumpla lo que pide la actividad.`
- otra respuesta permitida

### Nuevo escenario · Queremos la misma parte
- **id:** `queremos-la-misma-parte`
- **descripción:** `Cuando las dos queréis hacer la misma parte de una actividad compartida.`
- **tipoSituacion:** `colegio`
- **situación:** `Estás haciendo una actividad en pareja. Tú y tu compañera queréis hacer la misma parte porque a las dos os gusta más. Empezáis a discutir sobre quién debería hacerla.`

**Comprender**
- `Las dos queremos hacer la misma parte de la actividad.`
- `Ella quiere quedarse con lo mejor.`
- `Nunca me deja elegir.`
- otra respuesta permitida

**Perspectiva**
- `Puede gustarle esa parte tanto como a mí.`
- `Quizá también tenía ilusión por hacerla.`
- `Puede estar molesta porque las dos estamos insistiendo.`
- `No estoy segura de lo que siente.`
- otra respuesta permitida

**Hablar**
- `A mí también me gustaría hacer esa parte. ¿Cómo podemos repartirnos?`
- `Entiendo que tú también quieras hacerla. Busquemos una solución para las dos.`
- `Las dos queremos lo mismo. Pensemos cómo podemos decidirlo sin discutir.`
- otra respuesta permitida

**Acuerdo**
- `Dividir esa parte entre las dos si es posible.`
- `Hacer una parte cada una y después intercambiar.`
- `Elegir al azar quién empieza y cambiar después.`
- `Acordar que una haga esta parte ahora y la otra elija primero en otra parte equivalente.`
- otra respuesta permitida

**Frontera:** 004 necesita una solución compartida. No convertirla en 001 ni en 007.

## 6. Semilla 007 · Puedo elegir diferente

### Habilidad estable
Reconocer la propia preferencia, aceptar que otras personas elijan distinto, expresarla con amabilidad, probar una manera propia y cuidar la amistad sin necesidad de elegir lo mismo.

### Escenario actual
`Hoy yo prefiero otra cosa` — se conserva sin cambios.

### Nuevo escenario · Quiero probar mi manera
- **id:** `quiero-probar-mi-manera`
- **descripción:** `Cuando otras personas hacen una actividad de una forma y tú quieres probar primero tu propia idea.`
- **tipoSituacion:** `colegio`
- **situación:** `Estás haciendo una actividad individual en clase. Unas compañeras te enseñan cómo la están haciendo ellas. Tú tienes otra idea, pero dudas y piensas en copiar su manera antes de probar la tuya.`

**Preferencia**
- `Quiero intentar primero la idea que se me ocurrió.`
- `Me gusta una parte de su manera, pero quiero probar la mía.`
- `Todavía no sé cuál funciona mejor; quiero experimentar un poco.`
- `Me doy cuenta de que iba a copiar sin probar mi idea.`
- otra respuesta permitida

**Diferencia**
- `Su manera puede funcionar y la mía también podría funcionar.`
- `Puedo escuchar sus ideas sin tener que copiarlas.`
- `Hacerlo diferente no significa que una de nosotras esté mal.`
- `Mi idea también merece que la pruebe.`
- otra respuesta permitida

**Decirlo**
- `Gracias por enseñármelo. Primero quiero probar mi idea.`
- `Voy a intentarlo de esta forma y después puedo comparar.`
- `Me gusta vuestra idea, pero quiero ver qué pasa si pruebo la mía.`
- `Si me atasco, después os puedo preguntar.`
- otra respuesta permitida

**Probar mi manera**
- `si mi idea funciona.`
- `qué parte entiendo por mí misma.`
- `qué necesito cambiar después de probar.`
- `qué pregunta concreta necesito hacer si me atasco.`
- otra respuesta permitida

**Cuidar amistad**
- `agradecer sus ideas aunque no las copie.`
- `comparar después lo que descubrimos sin decidir quién es mejor.`
- `pedir ayuda si la necesito y también compartir lo que aprendí.`
- `recordar que hacer algo de formas distintas no nos separa.`
- otra respuesta permitida

### Nuevo escenario · Yo elegiría otro taller
- **id:** `yo-elegiria-otro-taller`
- **descripción:** `Cuando tus amigas eligen una actividad y tú tienes ganas de probar otra.`
- **tipoSituacion:** `personal`
- **situación:** `Hay varias actividades o talleres para elegir. Tus amigas quieren apuntarse juntas al mismo. A ti te llama más la atención otro, pero dudas porque eso significaría estar separadas durante un rato.`

**Preferencia**
- `El otro taller me interesa más.`
- `Me gustaría probar algo diferente aunque ellas elijan juntas.`
- `Quiero pensarlo antes de decidir solo por seguirlas.`
- `Me doy cuenta de que elegiría el suyo únicamente para estar con ellas.`
- otra respuesta permitida

**Diferencia**
- `Ellas pueden elegir juntas y yo puedo elegir otra actividad.`
- `No tenemos que hacer todo juntas para seguir siendo amigas.`
- `Puedo alegrarme por su elección aunque la mía sea diferente.`
- `Lo que a mí me interesa también importa.`
- otra respuesta permitida

**Decirlo**
- `Vosotras podéis hacer ese; yo creo que voy a probar este otro.`
- `A mí me apetece más este taller. Después nos contamos cómo fue.`
- `Me gusta que vosotras vayáis juntas, pero yo quiero probar otra cosa.`
- `Luego podemos volver a encontrarnos.`
- otra respuesta permitida

**Probar mi manera**
- `si esa actividad realmente me gusta.`
- `algo nuevo que quizá no habría probado siguiendo al grupo.`
- `que puedo estar bien haciendo algo por mi cuenta un rato.`
- `qué cosas me interesan de verdad.`
- otra respuesta permitida

**Cuidar amistad**
- `volver a encontrarnos después.`
- `preguntarles cómo les fue y contarles cómo me fue a mí.`
- `respetar que cada una haya elegido lo que quería.`
- `recordar que hacer actividades distintas un rato no rompe una amistad.`
- otra respuesta permitida

**Frontera:** 007 no exige llegar a un acuerdo. La habilidad es poder elegir distinto manteniendo respeto y vínculo.

## 7. Semilla 010 · Un momento para mí también está bien

### Habilidad estable
Reconocer señales de cansancio o saturación, normalizar una pausa breve, elegir una forma de descansar y decidir cómo volver después.

### Escenario actual
`Necesito un ratito tranquilo` — se conserva sin cambios.

### Nuevo escenario · Después de mucho ruido
- **id:** `despues-de-mucho-ruido`
- **descripción:** `Cuando has estado en un lugar con mucho ruido y necesitas bajar el ritmo.`
- **tipoSituacion:** `colegio`
- **situación:** `Acaba de terminar el recreo o una actividad con muchas voces, movimiento y ruido. Al volver, notas que todavía estás saturada y te cuesta concentrarte.`

**Notar pausa**
- `Me molestan más los ruidos de lo normal.`
- `Me cuesta concentrarme en lo siguiente.`
- `Siento que necesito unos minutos sin hablar.`
- `Estoy cansada aunque la actividad ya terminó.`
- `No estoy segura de lo que noto.`
- otra respuesta permitida

**Recordar pausa**
- `Después de mucho ruido, mi mente puede necesitar un momento tranquilo.`
- `Necesitar calma no significa que haya algo malo en mí.`
- `Puedo descansar un poco y después continuar.`
- `No tengo que empezar lo siguiente inmediatamente si puedo hacer una pequeña pausa.`
- otra respuesta permitida

**Elegir pausa**
- `Sentarme en un lugar más tranquilo unos minutos.`
- `Beber agua y respirar despacio.`
- `Estar un momento sin hablar ni hacer otra actividad.`
- `Hacer algo tranquilo mientras bajo el ritmo.`
- otra respuesta permitida

**Volver después**
- `Cuando me sienta más tranquila, empiezo la siguiente actividad.`
- `Vuelvo primero con una tarea pequeña.`
- `Digo que ya estoy preparada para continuar.`
- `Pido un poco más de ayuda si todavía me cuesta concentrarme.`
- otra respuesta permitida

### Nuevo escenario · Necesito parar un momento
- **id:** `necesito-parar-un-momento`
- **descripción:** `Cuando llevas un rato con una tarea y notas que tu mente necesita descansar.`
- **tipoSituacion:** `personal`
- **situación:** `Llevas bastante rato haciendo una actividad. Empiezas a releer lo mismo, te cuesta pensar y notas que cada vez avanzas menos. Quizá te vendría bien parar unos minutos antes de continuar.`

**Notar pausa**
- `Leo o miro lo mismo varias veces y no me concentro.`
- `Estoy tardando más porque estoy cansada.`
- `Mi cabeza parece llena y me cuesta pensar.`
- `Tengo ganas de parar un momento.`
- `No estoy segura de lo que noto.`
- otra respuesta permitida

**Recordar pausa**
- `Descansar unos minutos también puede ayudarme a avanzar.`
- `Hacer una pausa no significa abandonar la actividad.`
- `No tengo que seguir hasta estar completamente agotada.`
- `Puedo parar un momento y después volver.`
- otra respuesta permitida

**Elegir pausa**
- `Levantarme y moverme un poco.`
- `Descansar unos minutos sin mirar la actividad.`
- `Beber agua y respirar con calma.`
- `Hacer algo tranquilo durante un momento.`
- otra respuesta permitida

**Volver después**
- `Retomar por una parte pequeña.`
- `Revisar dónde me quedé y continuar desde ahí.`
- `Decidir cuál será mi siguiente paso antes de empezar otra vez.`
- `Pedir ayuda si después de descansar sigo bloqueada.`
- otra respuesta permitida

**Frontera:** 010 trata de pausa y regreso, no de identificar/interpretar emociones como 002.

## 8. Semilla 011 · Puedo aceptar apoyo y seguir siendo capaz

### Habilidad estable
Aceptar apoyo concreto sin perder autonomía ni mérito, elegir qué ayuda sirve, expresarlo y continuar después por cuenta propia.

### Escenario actual
`Me ofrecen una pista` — se conserva sin cambios.

### Nuevo escenario · Me enseñan un ejemplo
- **id:** `me-ensenan-un-ejemplo`
- **descripción:** `Cuando alguien te muestra un ejemplo para ayudarte a entender cómo seguir.`
- **tipoSituacion:** `colegio`
- **situación:** `Estás haciendo una actividad y no tienes claro cómo empezar una parte. Una profesora o una compañera te enseña un ejemplo parecido para que puedas orientarte. Te preocupa que mirar el ejemplo signifique que ya no lo estás haciendo tú sola.`

**Reacción al apoyo**
- `Pienso que si miro el ejemplo ya no cuenta como mío.`
- `Quiero demostrar que puedo entenderlo sin ayuda.`
- `Me da vergüenza que vean que todavía no sé cómo hacerlo.`
- `No sé si el ejemplo me ayudará o me confundirá más.`
- `No estoy segura de por qué me cuesta aceptar la ayuda.`
- otra respuesta permitida

**Recordar apoyo**
- `Un ejemplo puede ayudarme a entender sin hacer mi actividad por mí.`
- `Puedo mirar solo lo que necesito y después seguir sola.`
- `Entender un ejemplo también forma parte de aprender.`
- `Yo sigo teniendo que pensar qué hacer en mi propia actividad.`
- otra respuesta permitida

**Tipo de apoyo**
- `Que me enseñen solo un ejemplo parecido.`
- `Que me expliquen qué parte del ejemplo tengo que observar.`
- `Que me muestren el primer paso y después continuar yo.`
- `Que me dejen comparar mi intento con el ejemplo cuando termine.`
- otra respuesta permitida

**Frase de apoyo**
- `¿Me enseñas un ejemplo y después lo intento yo?`
- `Enséñame solo cómo empieza y sigo por mi cuenta.`
- `Quiero mirar un ejemplo para entender esta parte.`
- `Después del ejemplo quiero probarlo sola.`
- otra respuesta permitida

**Seguir con autonomía**
- `Hago mi propia actividad sin copiar el ejemplo.`
- `Explico con mis palabras qué entendí.`
- `Intento el siguiente paso por mí misma.`
- `Pido otra explicación solo si realmente la necesito.`
- otra respuesta permitida

### Nuevo escenario · Necesito ayuda, pero no toda
- **id:** `necesito-ayuda-pero-no-toda`
- **descripción:** `Cuando necesitas apoyo en una parte concreta pero quieres hacer el resto por ti misma.`
- **tipoSituacion:** `colegio`
- **situación:** `Estás haciendo algo que ya sabes hacer en parte. Hay un paso concreto que no entiendes y alguien se ofrece a ayudarte con toda la actividad. Tú sí necesitas apoyo, pero prefieres que te ayuden solo en esa parte.`

**Reacción al apoyo**
- `Me preocupa que hagan por mí cosas que sí puedo hacer.`
- `Quiero ayuda, pero solo en una parte.`
- `No sé cómo explicar exactamente qué necesito.`
- `Me da miedo parecer poco agradecida si digo que no necesito tanta ayuda.`
- `No estoy segura de qué parte quiero hacer sola.`
- otra respuesta permitida

**Recordar apoyo**
- `Puedo aceptar una parte de la ayuda y rechazar otra con amabilidad.`
- `Pedir ayuda concreta también es ser autónoma.`
- `No tengo que elegir entre hacerlo todo sola o que otra persona lo haga todo.`
- `Puedo decir qué parte necesito entender y qué parte quiero hacer yo.`
- otra respuesta permitida

**Tipo de apoyo**
- `Que me expliquen solo el paso que no entiendo.`
- `Que me den una pista y después me dejen continuar.`
- `Que revisemos juntas una parte concreta.`
- `Que me den un momento para intentar primero lo que sí sé hacer.`
- otra respuesta permitida

**Frase de apoyo**
- `Gracias. Esta parte sí quiero hacerla yo; ¿me ayudas solo con esta otra?`
- `Necesito una pista aquí, pero después quiero continuar sola.`
- `¿Puedes explicarme este paso y luego lo intento yo?`
- `Primero quiero hacer lo que sí sé y después te pregunto lo que me falta.`
- otra respuesta permitida

**Seguir con autonomía**
- `Continúo con la parte que sí sé hacer.`
- `Compruebo si ya puedo seguir sin más ayuda.`
- `Explico qué parte entendí gracias al apoyo.`
- `Decido si necesito otra ayuda concreta o puedo continuar sola.`
- otra respuesta permitida

## 9. Reglas de implementación

- Reutilizar el Motor multi-escenario vigente; no crear flujos paralelos.
- Mantener el escenario actual de cada Semilla como `escenarioPredeterminadoId` para compatibilidad histórica.
- Los nuevos IDs son estables y no deben inferirse desde títulos.
- Conservar `otraRespuesta` donde ya forma parte del patrón pedagógico.
- Las opciones no deben introducir emociones correctas, diagnósticos ni intenciones atribuidas como hechos.
- No crear nuevas colecciones Firestore ni migraciones.
- Gestión de Misiones debe detectar automáticamente estos escenarios desde el catálogo ya que la V1 de escenario opcional está implementada.
- Evidencia, Trabajo Realizado y Jardín deben reutilizar el soporte multi-escenario existente.
- No añadir requisito de practicar todos los escenarios.

## 10. Validación esperada

### Contenido y Motor
- seis Semillas multi-escenario totales: 001, 003, 004, 007, 010, 011;
- tres escenarios por cada una;
- escenario original intacto;
- recorrido completo de los diez escenarios nuevos;
- composición correcta con las plantillas existentes;
- respuestas propias siguen disponibles;
- repetición y cambio de escenario funcionan como en 003.

### Catálogo
- badge automático `🌱 3 situaciones` en las seis Semillas;
- ninguna marca en las demás;
- si en el futuro una Semilla tiene N distinto de 3, mostrar el valor real;
- no presentar el badge como progreso.

### Misiones
- cada una de las cinco Semillas nuevas multi-escenario ofrece sus escenarios en Gestión cuando el contrato V1 aplica;
- escenario libre y escenario fijado;
- evidencia correcta por `semillaId + escenarioId` cuando corresponda;
- Misiones existentes y multi-Semilla sin regresión.

### Histórico / Trabajo Realizado
- escenario real visible;
- sesiones legacy siguen resolviendo al escenario predeterminado;
- no migraciones destructivas.

### Regresión
- las otras seis Semillas tradicionales permanecen intactas;
- Persona Activa, permisos, consulta, navegación, teclado/foco, reduced motion y responsive sin regresión.

## 11. Estado de producto tras implementación

La implementación no declara automáticamente estable el patrón multi-escenario.

Después de publicación corresponde realizar una prueba familiar ampliada con Anaís y Gloria usando varias de las seis Semillas multi-escenario y, de acuerdo con el resultado, ajustar o certificar el patrón.
