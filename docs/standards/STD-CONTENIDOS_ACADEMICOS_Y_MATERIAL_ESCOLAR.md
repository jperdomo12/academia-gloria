# Estándar de Contenidos Académicos y Material Escolar
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` |
| **Versión** | 1.1 |
| **Estado** | Activo |
| **Fecha** | 22/08/2026 |
| **Última actualización** | 29/08/2026 |
| **Propietario** | Estándares de Aprendizaje Académico |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Creación, adaptación, incorporación y validación de temas académicos a partir de material escolar, con primera aplicación estructurada en 6.º de Primaria |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Gobierna:** propósito humano y principios fundacionales que ningún contenido académico puede contradecir. |
| `docs/vision/01_PRINCIPIOS_PEDAGOGICOS.md` | **Gobierna:** principios pedagógicos de comprensión, autonomía, motivación, error y colaboración con colegio/familia. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna:** sitúa Mis Cursos, contenidos, experiencias, evidencias, acompañamiento y progreso dentro de la arquitectura del producto. |
| `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md` | **Gobierna conceptualmente:** separación Motor/Contenido/Experiencia/Registro/Integración y transformación Datos → Observaciones → Insumos → Acciones. |
| `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md` | **Complementa:** reglas generales de calidad, arquitectura Cloud, UX y apoyo TEL. |
| `docs/standards/STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md` | **Gobierna:** nomenclatura de nuevos atributos y contratos de datos. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Complementa:** reglas de asignación, seguimiento y relación entre actividad y Misión. |
| `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` | **Implementa:** comportamiento funcional vigente de Misiones y evidencias. |
| `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md` | **Complementa:** presentación familiar de las actividades y evidencias realizadas. |
| `compartido/js/sesiones-academicas.js` | **Implementa:** contrato compartido vigente de persistencia y consulta de sesiones académicas. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 29/08/2026 | Product Owner + AI Collaborator | Sincroniza el estándar con la implementación validada de Puente y Fracciones: `sesion-academica-v1`, persistencia de pruebas, evidencia de Misión `sesion_academica`, visor histórico de solo lectura, modo Vista previa sin escrituras y compatibilidad de Misiones/temas heredados de 5.º sin migración masiva. Mantiene como pendiente la generación de propuestas de refuerzo desde resultados académicos. |
| 1.0 | 22/08/2026 | Product Owner + AI Collaborator | Aprobación de la Base Académica de 6.º. Consolida tiempo cognitivo, exigencia sin presión emocional alta, reto primero con apoyo progresivo, reto productivo, foco en el paso actual, comprensión lingüística de problemas, separación entre métricas internas y visibles, pausa estratégica y valoración del proceso. No declara implementación técnica. |
| 1.0-rc1 | 21/08/2026 | Product Owner + AI Collaborator | Primera consolidación de las pautas para aprendizaje académico estructurado: material escolar como fuente prioritaria, diseño TEL-friendly, estructura modular, selección de recursos, práctica formativa, evidencias, retroalimentación y proceso de incorporación ágil. Primera aplicación prevista: 6.º de Primaria. |

---

## 1. Propósito

Este estándar responde a una pregunta principal:

> **¿Cómo debe transformar la Academia un material escolar real en una experiencia académica clara, motivadora, adaptable y útil para aprender, practicar y generar retroalimentación?**

Su objetivo es permitir que, durante 6.º de Primaria y cursos posteriores, incorporar un nuevo tema sea un proceso ágil y repetible sin convertir todas las páginas en copias idénticas.

El resultado esperado es que, cuando la familia comparta material del colegio —PDF, fotografía, ficha, esquema, presentación, vídeo, enlace, apuntes o instrucciones—, la Academia disponga de criterios suficientes para:

1. comprender el material;
2. preservar lo que el colegio quiere enseñar;
3. reorganizarlo cuando sea necesario;
4. adaptar la experiencia para facilitar comprensión y autonomía;
5. seleccionar los recursos pedagógicos adecuados;
6. crear práctica progresiva y retroalimentación formativa;
7. registrar datos útiles cuando corresponda;
8. generar evidencias vinculables a Misiones;
9. identificar oportunidades de refuerzo sin etiquetar al alumno;
10. y mantener una experiencia visual coherente con la Academia.

---

## 2. Alcance

### 2.1 Incluido

Este estándar gobierna:

- temas académicos de Mis Cursos;
- contenidos de Matemáticas, Lengua, Ciencias, Sociales, Inglés y futuras materias;
- material escolar aportado por el colegio;
- materiales complementarios autorizados por la familia;
- explicaciones, resúmenes, fichas, esquemas y ejemplos;
- vídeos, mapas, gráficos, líneas del tiempo, música, simulaciones y otros recursos cuando aporten valor;
- práctica guiada y autónoma;
- pruebas de estudio y comprobaciones formativas;
- criterios de accesibilidad cognitiva y lingüística;
- evidencia de actividad y resultados observables;
- retroalimentación educativa derivada de datos;
- y el proceso de incorporación de nuevos temas.

### 2.2 Fuera de alcance

Este estándar no define:

- el currículo oficial completo de un curso;
- calificaciones escolares;
- competencias oficiales, indicadores o boletines;
- diagnóstico clínico, logopédico, psicológico o pedagógico;
- un sistema de dominio o mastery obligatorio;
- un historial académico oficial del colegio;
- reglas de Firestore concretas;
- detalles físicos internos que pertenezcan a la implementación técnica de cada módulo;
- ni la implementación específica de cada tema.

El estándar define el contrato conceptual de persistencia y evidencia. Los detalles técnicos vigentes se materializan en los recursos compartidos correspondientes y pueden evolucionar sin duplicarse aquí.

---

## 3. Primera aplicación: 6.º de Primaria

6.º es la primera aplicación estructurada de este estándar.

Esto significa:

- **no reconstruir 5.º desde cero**;
- reutilizar los patrones que demostraron valor;
- no migrar masivamente las páginas existentes de 5.º;
- y diseñar 6.º desde el inicio con una arquitectura de contenido, interacción y datos más consistente.

Los temas de 5.º sirven como **casos de aprendizaje y referencia**, no como plantillas rígidas.

Entre los patrones ya validados se encuentran:

- representación interactiva de conceptos cuando el fenómeno se comprende mejor experimentándolo;
- integración de vídeos del colegio dentro de una ruta de estudio;
- mapas y orientación espacial para contenidos geográficos;
- líneas del tiempo para secuencias históricas;
- música o mnemotecnias cuando facilitan recordar;
- flashcards para recuperación activa;
- gráficos y esquemas para relaciones visuales;
- práctica contextualizada;
- y test de repaso.

A 29/08/2026, la primera aplicación estructurada dispone además de dos referencias académicas validadas con persistencia y Misiones:

- **Puente de 5.º a 6.º**;
- **Fracciones**.

Ambas utilizan el patrón aprobado de aprendizaje, práctica, prueba final, sesión académica, evidencia de Misión y revisión histórica.

---

## 4. Principio central: estándar no significa idéntico

> **El estándar define qué experiencia debemos conseguir. No obliga a que todos los temas tengan las mismas pantallas ni los mismos recursos.**

Todo tema debe responder a necesidades comunes de aprendizaje, pero su forma concreta depende de:

- la materia;
- el contenido;
- el material recibido;
- el tipo de razonamiento;
- la dificultad lingüística;
- la necesidad de memoria o aplicación;
- y los recursos disponibles.

Por ejemplo:

```text
Electricidad
→ puede necesitar simulación o circuito interactivo.

Geografía
→ puede necesitar mapa y orientación espacial.

Historia
→ puede necesitar línea del tiempo, mapa y relaciones causa–consecuencia.

Matemáticas
→ puede necesitar representación visual, manipulación y resolución paso a paso.

Lengua
→ puede necesitar lectura, clasificación, análisis, construcción y producción propia.
```

La consistencia se obtiene mediante principios comunes, no mediante clonación visual.

---

## 5. Material escolar como fuente prioritaria

### 5.1 Principio

Cuando el colegio proporciona material para estudiar, ese material constituye la **fuente académica prioritaria para el alcance de la actividad**.

La Academia debe:

- respetar la terminología utilizada cuando sea importante para el colegio;
- conservar procedimientos, reglas, ejemplos o formatos que el alumno deba reconocer;
- identificar qué contenidos parecen centrales;
- mantener vídeos, mapas, documentos o recursos proporcionados cuando aporten valor;
- y construir apoyos alrededor del material.

### 5.2 Enriquecer no es sustituir

La Academia puede:

- explicar con otras palabras;
- crear ejemplos propios;
- añadir apoyos visuales;
- reorganizar información;
- crear práctica adicional;
- añadir comparaciones;
- construir esquemas;
- introducir mnemotecnias;
- o contextualizar en situaciones reales.

Pero no debe sustituir silenciosamente lo indicado por el colegio por otra explicación incompatible.

### 5.3 Separación de procedencia

Durante la construcción debe distinguirse entre:

```text
HECHO DEL MATERIAL ESCOLAR
Contenido explícitamente aportado.

INFERENCIA DE LA ACADEMIA
Interpretación razonable pero no explícita.

ENRIQUECIMIENTO DE LA ACADEMIA
Explicación, ejemplo, visual o práctica añadida para ayudar.
```

Si una carencia del material impide construir correctamente el tema, deberá identificarse antes de inventar el dato.

### 5.4 Material incompleto

La ausencia de una pieza secundaria no debe bloquear innecesariamente el trabajo.

Se solicitará aclaración únicamente cuando la carencia cambie de forma material:

- el contenido que debe enseñarse;
- el procedimiento esperado;
- el nivel de dificultad;
- el formato de evaluación;
- o una respuesta que deba ser fiel al colegio.

---

## 6. Contrato de incorporación de material escolar

El proceso estándar será:

```text
MATERIAL DEL COLEGIO
        ↓
ANÁLISIS DE FUENTE
        ↓
OBJETIVOS Y CONCEPTOS
        ↓
ADAPTACIÓN DE COMPRENSIÓN
        ↓
DISEÑO DE LA EXPERIENCIA
        ↓
SELECCIÓN DE RECURSOS
        ↓
PRÁCTICA PROGRESIVA
        ↓
COMPROBACIÓN FORMATIVA
        ↓
REGISTRO / EVIDENCIA
        ↓
RETROALIMENTACIÓN
        ↓
REFUERZO O CONTINUIDAD
```

### 6.1 Entrada admitida

El proceso puede comenzar con:

- PDF;
- fotografía;
- captura de pantalla;
- documento;
- ficha;
- presentación;
- enlace;
- vídeo;
- audio;
- índice de libro;
- instrucciones de profesor;
- apuntes;
- o combinación de varios insumos.

### 6.2 Análisis de fuente

Antes de generar la experiencia se identificará:

- curso de referencia;
- materia;
- tema;
- propósito aparente;
- conceptos clave;
- vocabulario académico;
- procedimientos;
- ejemplos aportados;
- recursos proporcionados;
- tipo de trabajo esperado;
- posibles dificultades de comprensión;
- y elementos que no deben perderse al adaptar.

### 6.3 Diseño de la experiencia

A continuación se decidirá:

- qué debe explicarse;
- qué debe verse;
- qué debe practicarse;
- qué debe recordarse;
- qué conviene producir o resolver;
- qué recursos aportan valor;
- qué información merece persistirse;
- y qué cierre resulta útil.

### 6.4 Validación antes de publicar

La experiencia debe contrastarse contra el material original para confirmar:

- fidelidad académica;
- cobertura suficiente;
- ausencia de contradicciones;
- instrucciones claras;
- nivel adecuado;
- y correspondencia entre práctica y contenido explicado.

---

## 7. Núcleo común de un Tema Académico

Un Tema Académico debe conseguir, cuando corresponda, los siguientes resultados:

### 7.1 Orientar

El alumno debe saber:

- qué va a aprender;
- qué hará;
- y por dónde empezar.

### 7.2 Dar una fotografía mental

Debe existir una síntesis rápida que permita ubicar el tema antes de profundizar.

Puede adoptar formas como:

- súper resumen;
- mapa visual;
- esquema;
- comparación;
- línea del tiempo;
- gráfico;
- fórmula visual;
- o conjunto breve de ideas clave.

### 7.3 Comprender

La teoría debe dividirse en unidades manejables.

La explicación debe priorizar:

```text
comprender → relacionar → aplicar → recordar
```

no:

```text
memorizar → repetir sin comprender
```

### 7.4 Verlo funcionar

Cuando sea posible, el concepto debe mostrarse mediante:

- ejemplo;
- demostración;
- animación;
- diagrama;
- simulación;
- mapa;
- vídeo;
- manipulación;
- o comparación concreta.

### 7.5 Practicar con apoyo

La primera práctica debe ofrecer suficiente ayuda para que el alumno pueda construir la estrategia.

### 7.6 Practicar con mayor autonomía

Después debe existir al menos una oportunidad de aplicar el aprendizaje con menos apoyo.

### 7.7 Comprobar

La comprobación final debe ayudar a estudiar, no limitarse a emitir una puntuación.

### 7.8 Recordar y continuar

El cierre puede incluir:

- ideas clave;
- mnemotecnia;
- regla visual;
- errores que conviene vigilar;
- próximos pasos;
- o propuesta de refuerzo.

### 7.9 No son secciones obligatorias

Estos resultados no implican ocho pestañas ni ocho bloques separados.

Un buen diseño puede combinar varios dentro de una sola actividad.

---

## 8. Diseño para comprensión y apoyo TEL

La adaptación TEL forma parte de la calidad de la experiencia. No debe reducir el nivel académico ni infantilizar al alumno.

### 8.1 Lenguaje

Preferir:

- frases breves;
- estructura directa;
- voz activa;
- una idea principal por bloque;
- vocabulario concreto;
- conectores explícitos;
- instrucciones visibles junto a la acción;
- ejemplos antes de abstracciones complejas;
- definición clara del vocabulario académico nuevo.

Evitar:

- párrafos densos;
- varias instrucciones simultáneas;
- ambigüedad innecesaria;
- saltos lógicos no explicados;
- texto decorativo que compita con el contenido;
- reformulaciones que eliminen términos que el alumno necesita aprender para el colegio.

### 8.2 Carga cognitiva

La página debe permitir concentrarse en una tarea cada vez.

> **Aprender bien tiene prioridad sobre terminar rápido.**

El alumno puede necesitar más tiempo para procesar del que espontáneamente se concede a sí mismo. La Academia debe proteger el tiempo necesario para pensar y no convertir la velocidad en sinónimo de aprendizaje.

Aplicar:

- jerarquía clara;
- agrupación por significado;
- espacio en blanco;
- revelado progresivo cuando aporte valor;
- navegación predecible;
- repetición accesible;
- y ausencia de presión temporal salvo que el tiempo sea parte real del objetivo.

No se utilizarán cronómetros, velocidad de respuesta o rapidez como presión o puntuación, salvo que el tiempo forme parte real y aprobada del objetivo académico.

Cuando una actividad larga pueda generar urgencia por llegar al final, se considerarán microbloques o progresión gradual. No es obligatorio mostrar siempre indicadores como “pregunta X de 10” si no aportan valor pedagógico. La interfaz debe favorecer la concentración en la actividad actual:

> **Ahora importa este paso.**

### 8.3 Apoyo visual

El visual debe explicar, orientar o ayudar a recordar.

No debe existir únicamente para decorar.

Un apoyo visual puede:

- hacer visible una relación;
- mostrar una secuencia;
- reducir texto;
- destacar diferencias;
- representar una cantidad;
- ubicar espacialmente;
- o servir como ancla de memoria.

### 8.4 Edad y dignidad

El tono debe ser:

- cercano;
- positivo;
- respetuoso;
- motivador;
- propio de la edad.

No debe resultar infantilizante.

La adaptación debe estar integrada en el diseño; no necesita etiquetarse constantemente como “modo TEL” en la interfaz del alumno.

### 8.5 Repetición útil

El alumno debe poder:

- volver a una explicación;
- repetir un ejemplo;
- volver a ver un vídeo;
- consultar una ficha;
- rehacer una práctica;
- o pedir una pista.

Repetir no es fracasar.

---

## 9. Selección inteligente de recursos

El recurso se elige por su función pedagógica.

| Necesidad | Recursos que pueden aportar valor |
|---|---|
| Ubicación espacial | Mapa, mapa interactivo, orientación, capas visuales |
| Secuencia temporal | Línea del tiempo, tarjetas ordenables, animación |
| Relación entre conceptos | Diagrama, esquema, tabla comparativa, mapa conceptual |
| Cambio o proceso | Simulación, animación, demostración, vídeo |
| Procedimiento | Ejemplo guiado, pasos numerados, manipulación interactiva |
| Memorización | Fichas, recuperación activa, asociación visual, mnemotecnia, música cuando sea adecuada |
| Clasificación | Tarjetas, agrupaciones, arrastrar/ordenar cuando sea accesible |
| Aplicación | Problema, caso, juego, ejercicio contextualizado |
| Expresión | Respuesta escrita, explicación oral, esquema, producción propia |
| Material del profesor | Recurso integrado con orientación antes y después |
| Revisión final | Test formativo, mini reto, síntesis, actividad de transferencia |

### 9.1 Multimedia con propósito

Vídeo, audio, música y animación deben responder a una necesidad concreta.

Evitar añadir multimedia únicamente para hacer la página “más llamativa”.

### 9.2 Antes y después de un vídeo

Cuando un vídeo sea importante:

**Antes:** indicar qué debe observar el alumno.

**Después:** comprobar una o dos ideas clave, resumir o aplicar.

No se considerará evidencia que el alumno “vio el 100 %” del vídeo si el sistema no puede comprobarlo de forma fiable.

---

## 10. Práctica progresiva

La práctica debe evolucionar desde apoyo hacia autonomía.

> **Exigencia académica alta no equivale a presión emocional alta.**

La regla de diseño es: **máxima expectativa curricular razonable, mínima ayuda necesaria y presión emocional regulada**. La Academia no reducirá preventivamente el nivel académico solo porque un alumno pueda necesitar apoyos: primero ofrecerá una oportunidad razonable de resolver el reto y después observará qué apoyo necesita.

Patrón recomendado:

```text
VEO
↓
LO HACEMOS JUNTOS
↓
LO INTENTO
↓
RECIBO FEEDBACK
↓
CORRIJO / VUELVO A INTENTAR
↓
LO APLICO EN OTRA FORMA
```

### 10.1 Variedad con propósito

No repetir diez veces la misma mecánica si tres ejercicios permiten observar lo mismo.

La variedad debe permitir comprobar:

- reconocimiento;
- comprensión;
- aplicación;
- transferencia;
- o producción.

### 10.2 Ayudas

Las ayudas deben ser graduales y comenzar por el reto. La escalera conceptual es:

1. intento autónomo;
2. pregunta orientadora;
3. aclaración o segmentación lingüística;
4. apoyo visual o representación;
5. ejemplo similar;
6. resolución parcialmente guiada;
7. guía paso a paso cuando realmente sea necesaria.

No es obligatorio utilizar todos los niveles ni seguirlos mecánicamente. Debe aplicarse el mínimo apoyo suficiente, sin resolver silenciosamente toda la tarea, y registrar cuando tenga utilidad educativa qué apoyo permitió continuar.

### 10.3 Reto productivo y ajuste

La dificultad, el error y cierta frustración pueden formar parte del aprendizaje. No se intervendrá simplemente porque exista un error.

Existe reto productivo cuando el alumno:

- piensa;
- prueba;
- acepta orientación;
- modifica su estrategia;
- y continúa procesando.

Debe ajustarse el apoyo o la presión cuando el alumno:

- responde cada vez más rápido sin analizar;
- repite de forma improductiva buscando perfección;
- deja de procesar las explicaciones;
- o realiza nuevos intentos que ya no aportan aprendizaje.

Ajustar no significa necesariamente hacer el contenido más fácil. Puede significar:

```text
parar → cambiar apoyo → volver después
```

La Academia debe normalizar guardar, parar y continuar posteriormente cuando repetir deje de aportar aprendizaje. Parar no debe presentarse como fracaso.

### 10.4 Comprensión del lenguaje en problemas

Especialmente en Matemáticas y problemas razonados, debe distinguirse:

```text
comprender el enunciado ≠ resolver matemáticamente el problema
```

Un patrón posible es:

```text
¿Qué está pasando?
→ ¿Qué me preguntan?
→ ¿Qué datos necesito?
→ ¿Qué relación existe?
→ ¿Qué operación o estrategia corresponde?
→ ¿La respuesta tiene sentido?
```

Los apoyos pueden incluir escuchar, segmentar frases, reformular manteniendo el vocabulario académico, destacar datos, emplear una representación visual o construir un esquema. Una dificultad lingüística no debe interpretarse automáticamente como desconocimiento matemático.

---

## 11. Test y comprobación formativa

### 11.1 Objetivo

El test es una herramienta para estudiar.

No es únicamente un mecanismo de puntuación.

### 11.2 Ante una respuesta correcta

La Academia puede:

- confirmar;
- reforzar la regla;
- señalar por qué es correcta;
- y continuar.

### 11.3 Ante una respuesta incorrecta

Debe, cuando sea razonable:

- mostrar qué opción se eligió;
- identificar la respuesta correcta;
- explicar el razonamiento;
- ofrecer un apoyo breve;
- y permitir volver a practicar.

### 11.4 Primer intento y resultado final

Cuando se persistan datos, distinguir siempre que sea útil entre:

- respuesta o resultado inicial;
- corrección posterior;
- y resultado final.

Un alumno que necesitó una explicación y después resolvió correctamente produjo información educativa distinta de un simple “0” o “1”.

### 11.5 Finalización no equivale a dominio

> **Completar una actividad demuestra que la experiencia se realizó. No demuestra por sí sola que el contenido esté dominado.**

Una actividad no exigirá perfección para poder finalizar, salvo que una regla académica específica aprobada lo requiera.

La necesidad de refuerzo se representa mediante datos y retroalimentación, no bloqueando indefinidamente el cierre.

---

## 12. Evidencia académica

### 12.1 Principio

La evidencia debe demostrar **qué experiencia se realizó y qué ocurrió durante ella**.

No debe convertirse en una etiqueta permanente sobre la capacidad del alumno.

### 12.2 Reutilización de la arquitectura existente

6.º no creará un sistema paralelo de evidencias.

El aprendizaje académico deberá reutilizar el patrón conceptual existente:

```text
Tema
  ↓
Actividad
  ↓
Sesión / ejecución
  ↓
Evidencia cuando corresponda
  ↓
Datos
  ↓
Observaciones
  ↓
Insumos
  ↓
Acciones de refuerzo o continuidad
```

### 12.3 Sesión y evidencia

Se distinguen dos conceptos:

**Sesión académica**

Conserva la ejecución y sus datos útiles, exista o no una Misión.

**Evidencia de Misión**

Cuando la actividad se realiza desde una Misión, puede registrar una evidencia vinculada a esa Misión y referenciar la sesión académica.

Esta separación reutiliza el patrón ya empleado por otros Motores de Aprendizaje y evita obligar a que todo estudio libre sea una Misión.

### 12.4 Datos útiles posibles

Según la actividad, pueden resultar útiles:

- `cursoReferencia`;
- `materia`;
- `tema`;
- `actividadId`;
- tipo de actividad;
- conceptos trabajados;
- fecha/hora;
- inicio y finalización;
- intentos;
- respuestas;
- primer resultado;
- resultado final;
- ayudas o pistas utilizadas;
- pasos repetidos;
- tiempo aproximado cuando sea fiable y significativo;
- producción escrita u oral cuando esté autorizada;
- y relación con `misionId` cuando exista.

La implementación compartida vigente utiliza el contrato `sesion-academica-v1`. El contrato técnico se centraliza en `compartido/js/sesiones-academicas.js`; este estándar conserva la semántica y no duplica cada detalle físico de almacenamiento.

### 12.5 Datos que no deben guardarse por defecto

No persistir:

- movimientos de ratón sin valor educativo;
- tiempo de pantalla como sustituto automático de aprendizaje;
- métricas que el sistema no puede medir con fiabilidad;
- inferencias emocionales no autorizadas;
- diagnósticos;
- etiquetas de inteligencia o capacidad;
- ni información que no tenga una finalidad clara de acompañamiento.

### 12.6 Regla de utilidad

Antes de persistir un dato debe poder responderse:

> **¿Qué decisión educativa, familiar o de producto podrá mejorar gracias a este dato?**

Si no existe respuesta clara, el dato no es necesario.

### 12.7 Modos y persistencia

Los Temas Académicos conectados al contrato compartido distinguen al menos dos modos funcionales:

**Sesión de aprendizaje**

Puede registrar una sesión académica y, cuando procede de una Misión de Repaso Académico, enlazarla como evidencia de esa Misión.

**Vista previa**

Permite consultar o probar el recurso sin alterar el historial educativo.

Regla obligatoria:

> **Vista previa no guarda sesión académica, evidencia, progreso ni cambio de estado de la Misión.**

La revisión histórica de un resultado es también una operación de **solo lectura**. Debe consultar la sesión ya existente y no crear, reemplazar ni modificar sesiones, respuestas, evidencias o progreso.

### 12.8 Estado de implementación validado

A 29/08/2026 se ha validado en uso real el siguiente flujo con **Puente de 5.º a 6.º** y **Fracciones**:

```text
Tema Académico
→ Prueba final
→ sesión académica persistida
→ evidencia `sesion_academica` cuando existe Misión
→ Misión pendiente de revisión familiar
→ Trabajo realizado
→ Resultado académico histórico de solo lectura
```

La evidencia de Misión referencia la sesión mediante `sesionId`; no duplica dentro de la Misión todo el contenido de la ejecución.

La persistencia puede existir también sin Misión cuando la actividad se realiza como aprendizaje libre.

---

## 13. Retroalimentación

La retroalimentación ocurre en varios niveles.

Debe valorar el proceso, no solo el resultado. Puede reconocer volver a leer, pensar antes de responder, pedir una pista, usar una representación, corregir, cambiar de estrategia y persistir de forma productiva. “Hacerlo bien” no se reducirá exclusivamente a obtener una puntuación perfecta.

### 13.1 Inmediata para el alumno

Debe ayudar a continuar en ese momento.

Ejemplos:

- explicación de una respuesta;
- pista;
- recordatorio de fórmula;
- comparación visual;
- siguiente paso.

### 13.2 De cierre

Al terminar una actividad puede resumir:

- lo realizado;
- lo que salió bien;
- qué necesitó apoyo;
- y qué conviene practicar después.

### 13.3 Para la familia

Debe ser breve, útil y comprensible.

Ejemplos:

```text
Fortaleza observada
Reconoció correctamente las ideas principales.

Oportunidad de refuerzo
Todavía confunde dos conceptos cuando la pregunta cambia de formato.

Apoyo que pareció ayudar
La comparación visual permitió corregir la respuesta.

Siguiente paso sugerido
Realizar una práctica breve con ejemplos diferentes.
```

### 13.4 Diferenciar dato e inferencia

```text
HECHO
Usó dos pistas y corrigió la respuesta en el segundo intento.

OBSERVACIÓN
La ayuda visual permitió completar correctamente este ejercicio.

INFERENCIA PRUDENTE
Este tipo de apoyo parece útil en este contenido.
```

Una única actividad constituye una señal, no un patrón longitudinal.

Los patrones requieren varias observaciones independientes y deben poder revisarse.

### 13.5 Retroalimentación no diagnóstica

Nunca transformar resultados en:

- “no sabe”;
- “es malo en”;
- “tiene poca capacidad”;
- etiquetas clínicas;
- conclusiones psicológicas;
- o valoraciones permanentes.

---

## 14. Refuerzo

El refuerzo debe responder a una necesidad observada.

Puede consistir en:

- repetir una explicación de otra forma;
- usar un apoyo visual distinto;
- practicar solo el concepto que generó dificultad;
- reducir temporalmente el nivel de apoyo;
- aumentar apoyo cuando sea necesario;
- ofrecer un ejemplo adicional;
- realizar una lectura relacionada;
- utilizar Detectives u otro motor existente;
- o crear una nueva Misión corta.

### 14.1 Refuerzo mínimo eficaz

No volver a repetir un tema completo si la dificultad está localizada.

Preferir:

```text
problema detectado
↓
refuerzo específico
↓
nueva oportunidad de aplicación
```

### 14.2 Estado actual de propuestas desde pruebas

La persistencia ya permite conservar resultados y mapa formativo de las pruebas académicas validadas.

La **propuesta automática o asistida de nuevas Misiones de refuerzo a partir de esos resultados todavía está pendiente**. Cuando se implemente deberá reutilizar el ciclo común:

```text
Datos
→ Observación
→ Propuesta
→ Revisión humana
→ Misión
```

No se creará un sistema paralelo exclusivo para exámenes.

---

## 15. Motivación

La motivación debe acompañar el proceso sin ocultar el aprendizaje.

### 15.1 Reconocer

Celebrar:

- empezar;
- perseverar;
- corregir;
- pedir ayuda;
- aplicar una estrategia;
- completar;
- y volver a intentarlo.

### 15.2 Evitar

- presión;
- comparación;
- exceso de premios;
- celebraciones desproporcionadas;
- lenguaje infantilizante;
- o mensajes que hagan sentir el error como fracaso.

### 15.3 Motivación visual

La página puede ser atractiva mediante:

- ilustración;
- color;
- iconografía;
- microanimaciones;
- personajes;
- contexto narrativo;
- y progresión visual.

Siempre subordinados al objetivo académico.

---

## 16. Estructura lógica del contenido

Aunque la implementación inicial pueda seguir utilizando HTML/JavaScript, cada nuevo Tema Académico debe poder entenderse conceptualmente como contenido separable de la mecánica.

Ejemplo conceptual:

```text
Tema Académico
├── identidad
│   ├── cursoReferencia
│   ├── materia
│   └── tema
├── objetivos
├── conceptos
├── explicación
├── recursos
├── actividades
├── comprobación
├── apoyos
└── cierre
```

La estructura definitiva de archivos o configuración evolucionará con los temas reales, evitando crear prematuramente un framework o JSON universal.

---

## 17. Integración con Misiones

Un Tema Académico puede utilizarse:

### Acceso libre

```text
Mis Cursos
→ Tema
→ Estudio / práctica
→ Sesión académica
```

### Desde Mi Camino

```text
Misión
→ Tema / actividad
→ Sesión académica
→ Evidencia de Misión
→ Esperando revisión cuando corresponda
```

La Misión orquesta.

El Tema Académico enseña y practica.

La evidencia registra lo realizado.

La familia revisa cuando el flujo lo requiera.

### 17.1 Compatibilidad de Misiones existentes

La incorporación de persistencia no obliga a recrear Misiones académicas existentes.

Si una Misión previa apunta a un recurso que actualmente genera una sesión académica, una ejecución nueva puede vincularse al contrato vigente sin migrar el registro original de la Misión.

Si la actividad fue realizada **antes** de que existiera persistencia, la Academia no inventará retrospectivamente una sesión que nunca se guardó. La Misión histórica sigue siendo válida; si se desea una nueva evaluación con datos persistidos, se creará una nueva Misión conservando la anterior como historial.

---

## 18. Experiencia familiar y Trabajo realizado

Cuando exista evidencia académica, la familia debe poder comprender sin inspeccionar datos técnicos:

- qué tema se trabajó;
- qué actividad se realizó;
- cuándo;
- qué resultado produjo;
- si necesitó ayudas;
- qué oportunidades de refuerzo aparecieron;
- y cómo abrir el detalle histórico cuando exista.

El lenguaje visible será funcional y cercano.

El término técnico **evidencia** puede permanecer interno cuando una expresión como **Trabajo realizado** resulte más comprensible.

### 18.1 Resultado académico histórico

La implementación vigente permite abrir la sesión concreta referenciada por la evidencia y consultar, cuando el tema los registra:

- correctas / total;
- porcentaje de la prueba;
- tiempo activo;
- mapa formativo;
- respuestas seleccionadas;
- respuesta correcta;
- explicación;
- y otros datos útiles de la sesión.

Este visor es histórico y de **solo lectura**. No reejecuta la prueba ni altera el registro original.

---

## 19. Calidad visual

Todo Tema Académico debe aspirar a una experiencia:

- limpia;
- respirable;
- ordenada;
- moderna;
- motivadora;
- accesible en móvil/tableta/escritorio;
- y consistente con la identidad de la Academia.

### 19.1 Evitar sobrecarga

No acumular simultáneamente:

- demasiados colores;
- animaciones competidoras;
- iconos sin significado;
- largos bloques de texto;
- múltiples llamadas a la acción equivalentes;
- o recursos redundantes.

### 19.2 Una acción principal clara

En cada paso debe ser evidente qué puede hacer el alumno a continuación.

### 19.3 Métricas internas y métricas visibles

La Academia puede registrar más información de la que necesita mostrar al alumno. Porcentaje, número de intentos, duración, ayudas, resultado inicial y resultado final pueden ser útiles para la familia, el análisis o el refuerzo.

Estos datos no deben mostrarse automáticamente al alumno cuando:

- no ayudan a aprender;
- generan presión innecesaria;
- convierten la experiencia en una búsqueda de perfección;
- o hacen que una medida técnica se interprete como capacidad personal.

> **La Academia puede medir mucho sin hacer sentir al alumno constantemente medido.**

La interfaz del alumno puede priorizar avance, estrategia, comprensión, esfuerzo útil, corrección y siguiente paso.

---

## 20. Criterios de conformidad de un Tema Académico

Antes de considerar un tema preparado para uso debe comprobarse:

### Fuente

- [ ] El material escolar recibido fue revisado completo en el alcance necesario.
- [ ] Se preservaron conceptos, procedimientos y recursos importantes.
- [ ] Los enriquecimientos no contradicen la fuente.

### Comprensión

- [ ] El objetivo se entiende.
- [ ] La teoría está segmentada.
- [ ] El vocabulario importante está explicado.
- [ ] Existe al menos una representación clara del concepto cuando aporta valor.

### TEL y carga cognitiva

- [ ] Las instrucciones son directas.
- [ ] No existen varias órdenes ambiguas en el mismo paso.
- [ ] La interfaz no infantiliza.
- [ ] El alumno puede repetir o consultar ayudas.
- [ ] La experiencia protege el tiempo para pensar y no premia la rapidez salvo que sea un objetivo académico aprobado.
- [ ] La interfaz mantiene el foco en el paso actual y evita indicadores de progreso que generen urgencia sin valor pedagógico.

### Práctica

- [ ] Existe práctica suficiente para el objetivo.
- [ ] Hay progresión de apoyo a autonomía cuando aplica.
- [ ] Se ofrece una oportunidad razonable de intento autónomo antes de ajustar el apoyo.
- [ ] Se utiliza el mínimo apoyo suficiente y puede identificarse cuál permitió continuar cuando resulte útil.
- [ ] Se distingue el reto productivo de la repetición o presión improductivas.
- [ ] El error produce información útil.
- [ ] En problemas razonados se diferencia la comprensión del enunciado de la resolución del contenido.

### Comprobación

- [ ] El test o actividad final explica los errores cuando corresponde.
- [ ] El cierre no depende de una puntuación perfecta por defecto.
- [ ] Se diferencia finalización de dominio.

### Datos

- [ ] Solo se registran datos útiles y medibles.
- [ ] Los datos pueden distinguir hechos de inferencias.
- [ ] No existen métricas inventadas.
- [ ] La relación con una Misión se conserva cuando corresponda.
- [ ] Vista previa no crea sesión, evidencia, progreso ni cambio de estado.
- [ ] La consulta histórica no modifica la sesión ni la evidencia original.
- [ ] Las métricas visibles para el alumno aportan valor pedagógico y no convierten medidas técnicas en juicios de capacidad.

### Retroalimentación

- [ ] Puede identificarse al menos qué ocurrió en la actividad.
- [ ] La retroalimentación no etiqueta al alumno.
- [ ] El refuerzo sugerido está relacionado con datos observables.
- [ ] Se reconoce el proceso y la estrategia, no solo la puntuación o el resultado final.
- [ ] Guardar, parar y continuar después se presenta como una estrategia válida cuando repetir deja de aportar aprendizaje.

### Integración

- [ ] Funciona con navegación estándar.
- [ ] Respeta el origen y retorno contextual cuando corresponde.
- [ ] Conserva Persona Activa durante la navegación interna cuando aplica.
- [ ] Reutiliza componentes/servicios existentes antes de crear otros.

---

## 21. Proceso ágil durante 6.º

Una vez aprobado este estándar, el flujo deseado para incorporar nuevo material será:

```text
1. La familia comparte el material del colegio.
2. La Academia identifica materia, tema y objetivos.
3. Se decide qué patrones comunes y recursos específicos necesita.
4. Se genera el Tema Académico.
5. Se valida contra el material original.
6. Se comprueba navegación, práctica y feedback.
7. Si corresponde, se conecta con sesión/evidencia.
8. Se entrega el incremental listo para instalar.
9. El uso real aporta nuevas observaciones.
10. Solo las lecciones generalizables actualizan este estándar.
```

El objetivo es reducir interacciones administrativas, no reducir la calidad del análisis.

---

## 22. Evolución y compatibilidad

### 22.1 5.º de Primaria

No se realizará una migración masiva de 5.º únicamente para cumplir este estándar.

Las páginas existentes continuarán funcionando y **pueden seguir utilizándose como recursos de Misiones de Repaso Académico aunque no generen `sesionesAcademicas` ni evidencia académica estructurada**.

En esos recursos heredados puede mantenerse el cierre manual de la Misión cuando no existe integración automática de evidencia. La familia conserva la validación posterior según el contrato general de Misiones.

Si un tema de 5.º vuelve a ser intervenido, podrán incorporarse progresivamente los principios y la persistencia que aporten valor. Esta modernización será selectiva, no una migración obligatoria del curso completo.

### 22.2 6.º de Primaria

Los temas nuevos de 6.º aplicarán este estándar desde su nacimiento.

Cuando un Tema Académico incluya una prueba final diseñada para producir datos útiles, deberá reutilizar el contrato compartido de sesión/evidencia en lugar de crear persistencia propia.

### 22.3 Cursos posteriores

El estándar se diseña para evolucionar más allá de 6.º.

No se crearán estándares independientes por curso salvo que aparezca una necesidad pedagógica real que lo justifique.

---

## 23. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| CA-001 | El material del colegio es la fuente prioritaria para el alcance académico de cada tema. | Aprobada conceptualmente |
| CA-002 | Estandarizar significa asegurar una experiencia común de calidad, no crear páginas idénticas. | Aprobada conceptualmente |
| CA-003 | Los recursos se seleccionan por función pedagógica; vídeo, música, mapas o juegos no son obligatorios. | Aprobada conceptualmente |
| CA-004 | La adaptación TEL mantiene el nivel académico y evita infantilización. | Aprobada conceptualmente |
| CA-005 | El test debe ayudar a estudiar mediante feedback, no limitarse a puntuar. | Aprobada conceptualmente |
| CA-006 | Completar una actividad no equivale a dominar un contenido. | Aprobada conceptualmente |
| CA-007 | 6.º reutilizará la arquitectura genérica de sesiones/evidencias; no creará un sistema paralelo por asignatura. | Aprobada y validada |
| CA-008 | Los datos se registran por utilidad educativa, no por disponibilidad técnica. | Aprobada conceptualmente |
| CA-009 | La retroalimentación separará hechos, observaciones, inferencias prudentes y acciones. | Aprobada conceptualmente |
| CA-010 | 5.º no se migrará masivamente; sus mejores experiencias sirven como referencia para 6.º. | Aprobada |
| CA-011 | Aprender bien tiene prioridad sobre terminar rápido; la velocidad solo se medirá o puntuará cuando sea parte real y aprobada del objetivo. | Aprobada |
| CA-012 | Se mantendrá la máxima expectativa curricular razonable con el mínimo apoyo suficiente y presión emocional regulada. | Aprobada |
| CA-013 | El reto precederá al apoyo progresivo, sin intervenir automáticamente ante el error y ajustando cuando los intentos dejen de aportar aprendizaje. | Aprobada |
| CA-014 | La comprensión lingüística del enunciado se distinguirá de la resolución matemática. | Aprobada |
| CA-015 | Las métricas internas no se mostrarán automáticamente al alumno; la interfaz priorizará información útil para aprender. | Aprobada |
| CA-016 | Parar y continuar después es una estrategia válida, y la retroalimentación reconocerá el proceso además del resultado. | Aprobada |
| CA-017 | `sesion-academica-v1` es el contrato compartido vigente para la persistencia académica validada; la evidencia de Misión referencia la sesión y no duplica su contenido. | Aprobada y validada |
| CA-018 | Vista previa y revisión histórica son experiencias sin escritura sobre sesión, evidencia o progreso. | Aprobada y validada |
| CA-019 | Las Misiones existentes no se recrean por incorporar persistencia; una ejecución futura puede usar el contrato vigente y no se inventan sesiones retrospectivas. | Aprobada y validada |
| CA-020 | Los recursos heredados de 5.º pueden seguir asignándose como Misiones aunque no produzcan evidencia académica automática. | Aprobada |

---

## 24. Estado de implementación y trabajo pendiente

### Implementado y validado

A 29/08/2026 están construidos y probados:

1. Temas Académicos de referencia: Puente y Fracciones.
2. Contrato compartido `sesion-academica-v1`.
3. Persistencia de pruebas académicas en sesión.
4. Evidencia `sesion_academica` ligada a Misión cuando corresponde.
5. Cambio automático de la Misión a revisión familiar tras una prueba válida.
6. Trabajo realizado con acceso al resultado académico histórico.
7. Vista previa sin persistencia.
8. Resultado histórico de solo lectura.
9. Compatibilidad con Misiones académicas creadas antes de esta persistencia.
10. Reglas de acceso a `sesionesAcademicas` desplegadas y validadas para Persona Activa relacionada.

### Pendiente de evolución

1. Proponer acciones de refuerzo a partir de resultados académicos persistidos.
2. Permitir que esas propuestas preparen o creen Misiones bajo revisión humana, reutilizando el modelo común de Misiones.
3. Extender progresivamente el patrón a los nuevos temas y materias de 6.º cuando corresponda.

La existencia de persistencia no obliga a modernizar de forma masiva los recursos de 5.º.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Pregunta resuelta** | Cómo transformar material escolar en Temas Académicos consistentes, adaptados, medibles y reutilizables. |
| **Primera aplicación** | 6.º de Primaria. |
| **Reutilización** | Aprovechar patrones validados de 5.º y la arquitectura existente de Motores, Misiones y Evidencias. |
| **Principio de diseño** | Estándar común de experiencia; implementación específica según materia y tema. |
| **Persistencia** | `sesion-academica-v1`: registrar solo datos útiles; separar sesión académica de evidencia de Misión. |
| **Retroalimentación** | Basada en datos observables, prudente, accionable y no diagnóstica. |
| **Estado** | Activo; implementación base validada con Puente y Fracciones y expansión progresiva hacia nuevos temas de 6.º. |
