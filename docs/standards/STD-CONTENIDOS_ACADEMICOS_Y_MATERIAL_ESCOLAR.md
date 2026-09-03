# Estándar de Contenidos Académicos y Material Escolar
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` |
| **Versión** | 1.3 |
| **Estado** | Activo |
| **Fecha** | 22/08/2026 |
| **Última actualización** | 03/09/2026 |
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
| `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` | **Complementa e implementa:** consumo de evidencias para reportes descriptivos, tendencias y propuestas de fortalecimiento. |
| `compartido/js/sesiones-academicas.js` | **Implementa:** contrato compartido vigente de persistencia y consulta de sesiones académicas. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.3 | 03/09/2026 | Product Owner + AI Collaborator | Refuerza el **Modo de Incorporación Curricular de una sola instrucción** como ciclo de mínima intervención: material + curso/materia/tema + notas opcionales → análisis → ubicación `Curso → Asignatura → Tema` → creación de estructura solo si hace falta → construcción aplicando todos los estándares vigentes → evidencia/analítica/refuerzo → `YA PUEDES PROBAR` → observaciones opcionales → aprobación → cierre definitivo. Establece como requisito que **todo nuevo Tema de 6.º genere evidencia académica estructurada y reutilizable** por Trabajo realizado, Análisis Educativo, estadísticas y propuestas de fortalecimiento, sin crear persistencias privadas por Tema. |
| 1.2 | 30/08/2026 | Product Owner + AI Collaborator | Formaliza el **Modo de Incorporación Curricular de una sola instrucción** para 6.º: material + curso/materia/tema como entrada suficiente, trabajo interno sin interacciones administrativas, aclaraciones solo ante bloqueos académicos materiales, entrega `YA PUEDES PROBAR` y cierre posterior a la aprobación mediante auditoría, documentación, PR y merge. Sincroniza además el estado ya implementado de propuestas de refuerzo académico de Puente y Fracciones. |
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
7. generar evidencia académica estructurada y útil en todo nuevo Tema de 6.º;
8. hacer esa evidencia reutilizable por Trabajo realizado, análisis estadístico/educativo y evolución;
9. generar evidencias vinculables a Misiones cuando la ejecución procede de una Misión;
10. identificar oportunidades de refuerzo sin etiquetar al alumno;
11. proponer acciones de fortalecimiento cuando exista evidencia suficiente;
12. y mantener una experiencia visual coherente con la Academia.

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
- capacidad de reutilizar la evidencia en análisis estadístico/educativo;
- retroalimentación educativa derivada de datos;
- propuestas de fortalecimiento derivadas de señales observables suficientes;
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

A 03/09/2026, la primera aplicación estructurada dispone además de dos referencias académicas validadas con persistencia, Misiones y propuestas de refuerzo:

- **Puente de 5.º a 6.º**;
- **Fracciones**.

Ambas utilizan el patrón aprobado de aprendizaje, práctica, prueba final, sesión académica, evidencia de Misión, revisión histórica y continuidad/refuerzo bajo revisión familiar.

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
ANÁLISIS EDUCATIVO
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
- qué evidencia académica útil debe producir el Tema;
- qué focos/bloques deben identificarse para permitir análisis posterior;
- qué información merece persistirse;
- y qué cierre resulta útil.

### 6.4 Validación antes de publicar

La experiencia debe contrastarse contra el material original para confirmar:

- fidelidad académica;
- cobertura suficiente;
- ausencia de contradicciones;
- instrucciones claras;
- nivel adecuado;
- correspondencia entre práctica y contenido explicado;
- y capacidad real de producir evidencia interpretable durante una ejecución normal.

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

### 7.7 Comprobar y producir evidencia

La comprobación final debe ayudar a estudiar, no limitarse a emitir una puntuación.

En todo nuevo Tema de 6.º debe existir además al menos una interacción o comprobación observable que permita producir evidencia académica útil y estructurada durante la ejecución normal.

La evidencia será proporcional a la naturaleza del Tema: no todos requieren porcentaje, intentos o respuesta correcta/incorrecta, pero ninguno debe quedar sin una señal educativa reutilizable.

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

Para los nuevos Temas de 6.º la evidencia académica deja de ser opcional:

> **Todo nuevo Tema debe producir al menos una evidencia académica estructurada durante una ejecución normal de aprendizaje.**

Esto no significa medir cada clic. Significa diseñar desde el inicio al menos una interacción o comprobación observable que tenga utilidad educativa real.

### 12.2 Reutilización de la arquitectura existente

6.º no creará un sistema paralelo de evidencias.

El aprendizaje académico deberá reutilizar el patrón conceptual existente:

```text
Tema
  ↓
Actividad / comprobación observable
  ↓
Sesión académica / evidencia estructurada
  ↓
Evidencia de Misión si existe Misión
  ↓
Datos
  ↓
Análisis Educativo
  ↓
Observaciones
  ↓
Insumos
  ↓
Acciones de fortalecimiento o continuidad
```

### 12.3 Evidencia académica y evidencia de Misión

Se distinguen dos conceptos:

**Evidencia académica / sesión académica**

Conserva la ejecución y sus datos útiles, exista o no una Misión. En los nuevos Temas de 6.º debe generarse durante una ejecución normal de aprendizaje.

**Evidencia de Misión**

Cuando la actividad se realiza desde una Misión, registra además una evidencia vinculada a esa Misión y referencia la sesión académica.

Esta separación reutiliza el patrón ya empleado por otros Motores de Aprendizaje y evita obligar a que todo estudio libre sea una Misión.

Por tanto:

```text
ACCESO LIBRE
Tema → sesión académica → evidencia analizable

DESDE MISIÓN
Misión → Tema → sesión académica → evidencia de Misión que referencia la sesión
```

### 12.4 Datos útiles posibles

Según la actividad, pueden resultar útiles:

- `cursoReferencia`;
- `materia`;
- `tema`;
- `actividadId` estable;
- tipo de actividad;
- conceptos trabajados;
- `bloqueId`, foco u otro identificador conceptual estable cuando existan varios objetivos;
- fecha/hora;
- inicio y finalización;
- intentos reales;
- respuestas;
- primer resultado;
- resultado final;
- ayudas o pistas utilizadas;
- pasos repetidos;
- tiempo aproximado cuando sea fiable y significativo;
- producción escrita u oral cuando esté autorizada;
- y relación con `misionId` cuando exista.

La implementación compartida vigente utiliza el contrato `sesion-academica-v1`. El contrato técnico se centraliza en `compartido/js/sesiones-academicas.js`; este estándar conserva la semántica y no duplica cada detalle físico de almacenamiento.

### 12.5 Identidad mínima analizable

Para que una evidencia pueda reutilizarse por reportes y fortalecimiento, todo nuevo Tema debe conservar una identidad suficientemente estable de:

```text
Persona Activa
+ curso
+ materia
+ tema
+ actividadId
+ fecha
+ resultado/señal observable
```

Cuando una actividad mida más de un objetivo, debe incluir un `bloqueId`, foco, concepto u otra clave estable equivalente que permita agrupar posteriormente las observaciones sin interpretar texto libre.

### 12.6 Datos que no deben guardarse por defecto

No persistir:

- movimientos de ratón sin valor educativo;
- tiempo de pantalla como sustituto automático de aprendizaje;
- métricas que el sistema no puede medir con fiabilidad;
- inferencias emocionales no autorizadas;
- diagnósticos;
- etiquetas de inteligencia o capacidad;
- ni información que no tenga una finalidad clara de acompañamiento.

### 12.7 Regla de utilidad y reutilización

Antes de persistir un dato deben poder responderse estas preguntas:

> **¿Qué decisión educativa, familiar o de producto podrá mejorar gracias a este dato?**

> **¿Podrá interpretarse después sin conocer una implementación privada del Tema?**

Si no existe una utilidad clara, el dato no es necesario.

Si el dato sí es útil pero el contrato compartido no puede representarlo, debe estudiarse una evolución del contrato común antes de crear una persistencia aislada por Tema.

### 12.8 Modos y persistencia

Los Temas Académicos conectados al contrato compartido distinguen al menos dos modos funcionales:

**Sesión de aprendizaje**

Registra la evidencia académica estructurada y, cuando procede de una Misión de Repaso Académico, enlaza la sesión como evidencia de esa Misión.

**Vista previa**

Permite consultar o probar el recurso sin alterar el historial educativo.

Regla obligatoria:

> **Vista previa no guarda sesión académica, evidencia, progreso ni cambio de estado de la Misión.**

La revisión histórica de un resultado es también una operación de **solo lectura**. Debe consultar la sesión ya existente y no crear, reemplazar ni modificar sesiones, respuestas, evidencias o progreso.

### 12.9 Capacidad de análisis y fortalecimiento

La evidencia de cada nuevo Tema debe diseñarse para que pueda, cuando exista suficiente información real:

- participar en reportes estadísticos/educativos;
- permitir reconocer fortalezas observadas;
- permitir identificar aspectos a reforzar;
- mostrar evolución entre ejecuciones comparables;
- destacar mejoras personales;
- y originar propuestas de actuación o fortalecimiento.

Esto no obliga a que toda evidencia produzca automáticamente una propuesta. **La ausencia de una señal repetida suficiente debe poder resultar en “seguir observando”.**

El consumidor principal de este contrato se documenta en `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md`.

### 12.10 Estado de implementación validado

A 03/09/2026 se ha validado en uso real el siguiente flujo con **Puente de 5.º a 6.º** y **Fracciones**:

```text
Tema Académico
→ Prueba final
→ sesión académica persistida
→ evidencia `sesion_academica` cuando existe Misión
→ Misión pendiente de revisión familiar
→ Trabajo realizado
→ Resultado académico histórico de solo lectura
→ Análisis Educativo / observaciones
→ propuesta de refuerzo cuando el mapa formativo lo justifica
→ revisión/activación familiar
```

La evidencia de Misión referencia la sesión mediante `sesionId`; no duplica dentro de la Misión todo el contenido de la ejecución.

La persistencia existe también sin Misión cuando la actividad se realiza como aprendizaje libre.

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
↓
nueva evidencia
```

### 14.2 Estado actual de propuestas desde pruebas

La propuesta asistida de Misiones de refuerzo a partir de resultados académicos está **implementada y validada** en **Puente de 5.º a 6.º** y **Fracciones**.

Reutiliza el ciclo común:

```text
Datos
→ Observación
→ Propuesta
→ Revisión humana
→ Misión
→ Nueva evidencia
```

Primera regla vigente:

- se analiza la sesión de aprendizaje más reciente de cada actividad;
- una Vista previa no participa porque no persiste sesión académica;
- solo un bloque marcado `reforzar` por el mapa formativo genera propuesta automática;
- un bloque `camino` se conserva como observación y no genera propuesta automática en esta primera versión;
- la propuesta separa la ruta curricular donde ocurrió del foco concreto a reforzar;
- la Misión se prepara inicialmente con **Mostrar en Mi Camino = No**;
- la familia decide cuándo hacerla visible;
- la nueva ejecución reutiliza la sesión/evidencia académica normal;
- y no existe un sistema paralelo exclusivo para exámenes.

### 14.3 Relación con Análisis Educativo

El reporte de Análisis Educativo puede producir propuestas descriptivas de actuación a partir de múltiples fuentes.

Una propuesta del reporte:

- no equivale automáticamente a una Misión;
- debe estar apoyada por evidencia observable;
- debe priorizar el foco específico en lugar de repetir todo el Tema;
- y, si se materializa como actividad de fortalecimiento, debe poder producir nueva evidencia para cerrar el ciclo de observación.

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
├── evidencia
│   ├── actividadId
│   ├── focos / bloques observables
│   └── datos útiles
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
→ Sesión académica / evidencia analizable
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

El Tema Académico enseña, practica y produce evidencia académica.

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
- [ ] Existe una interacción o comprobación observable capaz de producir evidencia académica útil en una ejecución normal.

### Datos y evidencia

- [ ] Todo nuevo Tema de 6.º genera evidencia académica estructurada en ejecución normal.
- [ ] Reutiliza `sesion-academica-v1` y servicios compartidos antes de crear persistencia propia.
- [ ] Conserva identidad estable de curso, materia, tema y `actividadId`.
- [ ] Conserva focos/bloques estables cuando existen varios objetivos analizables.
- [ ] Solo se registran datos útiles y medibles.
- [ ] Los datos pueden distinguir hechos de inferencias.
- [ ] No existen métricas inventadas.
- [ ] La evidencia puede ser consumida por reportes/análisis sin conocer detalles privados del Tema.
- [ ] La evidencia puede apoyar propuestas de fortalecimiento cuando exista señal suficiente.
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
- [ ] Usa el favicon oficial de la Academia en una nueva página funcional.
- [ ] Los fallos visibles indican la razón cuando es conocida y segura de mostrar.
- [ ] Las rutas funcionan tanto en validación local como en GitHub Pages.

---

## 21. Modo de Incorporación Curricular de una sola instrucción

### 21.1 Objetivo operativo

La expansión curricular de 6.º debe ser una operación repetible y de **intervención humana mínima** para la familia.

En condiciones normales, incorporar un nuevo Tema Académico requiere solo dos momentos de decisión humana, con observaciones intermedias únicamente si la familia desea ajustar el producto:

```text
INTERVENCIÓN 1
Material del colegio
+ curso
+ materia
+ nombre del tema
+ notas/comentarios opcionales
+ “Incorporar a la Academia”

        ↓

TRABAJO INTERNO DE LA ACADEMIA / IA
Analizar material
→ decidir ubicación `Curso → Asignatura → Tema`
→ revisar estándares y estructura existentes
→ crear carpetas/archivos solo si hacen falta
→ diseñar experiencia
→ implementar contenido
→ integrar evidencia, histórico, análisis y fortalecimiento
→ validar fidelidad y funcionamiento
→ auditar

        ↓

“YA PUEDES PROBAR”

        ↓

INTERVENCIÓN 2
Validación familiar:
“Aprobado”
o observaciones concretas opcionales

        ↓

SI HAY OBSERVACIONES
Ajuste → nueva prueba

        ↓

APROBACIÓN

        ↓

CIERRE DEFINITIVO
Auditoría final → documentación → PR → revisión remota → merge a main
```

El objetivo es reducir interacciones administrativas **sin reducir el análisis, la fidelidad académica, la calidad del producto ni la capacidad futura de aprender de sus evidencias**.

### 21.2 Entrada mínima suficiente

Cuando se adjunta el material del colegio, una instrucción como la siguiente debe considerarse suficiente:

```text
6.º · Science · The circulatory system. Incorporar a la Academia.
```

O, por ejemplo:

```text
6.º · Matemáticas · Decimales. Incorporar a la Academia.
```

Las notas o comentarios de interés son **opcionales**. Si se incluyen, forman parte del contexto funcional/pedagógico que debe considerarse durante la construcción.

La familia no debe tener que especificar en cada incorporación:

- la ruta exacta dentro del repositorio;
- si hay que crear carpetas;
- plantilla técnica;
- estructura HTML/CSS/JavaScript;
- documentación que debe revisarse;
- estándares que deben aplicarse;
- componentes compartidos que deben reutilizarse;
- contrato de evidencia;
- integración con Análisis Educativo;
- capacidad de fortalecimiento;
- integración con Misiones;
- persistencia;
- favicon;
- reglas de `Volver`;
- Persona Activa;
- Vista previa;
- histórico;
- tratamiento de errores;
- rama Git;
- validaciones técnicas;
- PR o merge.

Esas responsabilidades pertenecen al proceso de incorporación.

### 21.3 Trabajo interno obligatorio

Tras recibir la entrada mínima, antes de pedir cualquier aclaración o modificar código, se debe:

1. revisar `AGENTS.md` y la documentación propietaria vigente;
2. revisar **todos los estándares aprobados que apliquen** al nuevo Tema;
3. revisar la estructura, código, configuración y componentes reales del curso y la materia;
4. decidir la ubicación correcta dentro de la jerarquía `Curso → Asignatura → Tema`;
5. buscar referencias existentes reutilizables antes de crear estructura nueva;
6. crear carpetas/archivos únicamente cuando la estructura existente no sea suficiente;
7. analizar completamente el material escolar en el alcance necesario;
8. identificar hechos del material, inferencias y enriquecimientos de la Academia;
9. definir objetivos, conceptos, vocabulario, procedimientos y recursos que no deben perderse;
10. diseñar la experiencia adecuada al contenido sin convertir el estándar en una plantilla visual rígida;
11. definir desde el diseño **qué evidencia académica producirá** y qué focos/bloques permitirán analizarla;
12. implementar con los patrones compartidos vigentes;
13. integrar Sesión de aprendizaje/evidencia académica en todo Tema nuevo de 6.º;
14. integrar, cuando corresponda, Vista previa, Misiones, evidencia de Misión, histórico y refuerzo;
15. confirmar que la evidencia puede ser utilizada por Trabajo realizado y Análisis Educativo sin conocer un esquema privado del Tema;
16. comprobar que una señal suficiente pueda traducirse en una propuesta de fortalecimiento sin obligar a repetir todo el Tema;
17. comprobar favicon, navegación, `Volver`, Persona Activa, rutas local/GitHub Pages y mensajes de error;
18. validar fidelidad académica contra el material original;
19. realizar las comprobaciones técnicas proporcionales;
20. auditar el diff y confirmar que no se mezcló trabajo ajeno al Tema.

La incorporación no debe delegar al usuario decisiones técnicas que puedan resolverse aplicando la documentación y la arquitectura vigentes.

### 21.4 Regla de no interrupción

No se pedirán aclaraciones por detalles secundarios que puedan resolverse de forma segura con el material y los estándares existentes.

Solo se interrumpirá el flujo cuando falte información que pueda cambiar materialmente:

- el contenido que debe enseñarse;
- el procedimiento esperado por el colegio;
- el nivel de dificultad;
- el formato de evaluación;
- una respuesta que deba ser fiel a la fuente;
- o una decisión de producto/arquitectura que no esté ya aprobada.

Si falta una imagen secundaria, un ejemplo complementario, una formulación de apoyo o un detalle visual no crítico, el trabajo debe continuar utilizando una solución proporcional y reversible.

### 21.5 Resultado antes de la validación familiar

No se solicitará al usuario revisar borradores técnicos intermedios cuando el alcance esté claro.

La primera devolución operativa debe producirse cuando exista un Tema suficientemente completo para validar y debe ser breve:

```text
YA PUEDES PROBAR
```

La indicación de prueba señalará únicamente:

- la ruta o punto de entrada necesario;
- los puntos funcionales/pedagógicos que realmente conviene validar;
- y cualquier limitación conocida que pueda afectar la prueba.

El usuario debe validar el producto, no descubrir defectos básicos que podían detectarse durante la construcción y auditoría interna.

### 21.6 Observaciones opcionales y ajuste

Después de probar, la familia puede:

- aprobar directamente;
- o comunicar observaciones concretas de contenido, experiencia o funcionamiento.

Las observaciones no reinician el proceso desde cero.

Se aplica el **menor ajuste suficiente**, se repiten las validaciones afectadas y se devuelve nuevamente el Tema para prueba cuando sea necesario.

### 21.7 Cierre después de la aprobación

Cuando la validación familiar sea positiva, el producto pasa de candidato probado a definitivo mediante:

```text
Aprobado
↓
Auditoría final
↓
Actualización documental solo cuando corresponda
↓
PR
↓
Revisión del diff remoto
↓
Merge a main
↓
Tema definitivo
↓
Cierre
```

No se solicitarán confirmaciones redundantes entre estos pasos cuando el bloque ya haya sido aprobado y el diff final permanezca dentro del alcance autorizado.

### 21.8 Un Tema nuevo no es un proyecto de arquitectura

> **La incorporación de un Tema Académico no debe convertirse, por defecto, en una reconstrucción de la Academia.**

Si durante la incorporación aparece un defecto genérico del motor, navegación, persistencia, Misiones u otra infraestructura compartida:

- primero se determinará si realmente bloquea el Tema;
- si no lo bloquea, se registrará/tratará como trabajo técnico independiente;
- si lo bloquea, se aplicará el cambio compartido mínimo necesario y se justificará explícitamente;
- no se crearán arquitecturas, colecciones, servicios o estructuras paralelas solo para resolver un Tema concreto.

La medida de éxito del proceso no es únicamente que el Tema actual funcione: también debe facilitar que **el siguiente Tema sea más rápido y seguro de incorporar**.

### 21.9 Contrato de interacción esperado

La interacción ideal es:

```text
FAMILIA
“6.º · Materia · Tema. Incorporar a la Academia.”
+ material escolar
+ notas opcionales

ACADEMIA / AI COLLABORATOR
[trabajo interno sin interacción administrativa]

ACADEMIA / AI COLLABORATOR
“YA PUEDES PROBAR”

FAMILIA
“Aprobado.”

o comunica una incidencia/observación concreta

ACADEMIA / AI COLLABORATOR
[ajusta solo si hace falta y cierra tras aprobación]
```

Este es el procedimiento por defecto para la expansión curricular de 6.º y debe reutilizarse en cursos posteriores mientras continúe siendo válido.

---

## 22. Evolución y compatibilidad

### 22.1 5.º de Primaria

No se realizará una migración masiva de 5.º únicamente para cumplir este estándar.

Las páginas existentes continuarán funcionando y **pueden seguir utilizándose como recursos de Misiones de Repaso Académico aunque no generen `sesionesAcademicas` ni evidencia académica estructurada**.

En esos recursos heredados puede mantenerse el cierre manual de la Misión cuando no existe integración automática de evidencia. La familia conserva la validación posterior según el contrato general de Misiones.

Si un tema de 5.º vuelve a ser intervenido, podrán incorporarse progresivamente los principios y la persistencia que aporten valor. Esta modernización será selectiva, no una migración obligatoria del curso completo.

### 22.2 6.º de Primaria

Los temas nuevos de 6.º aplicarán este estándar desde su nacimiento.

> **Todo nuevo Tema de 6.º debe producir evidencia académica estructurada en una ejecución normal de aprendizaje.**

La evidencia debe:

- reutilizar el contrato compartido de sesión/evidencia antes de crear persistencia propia;
- conservar identidad estable del Tema/actividad;
- representar al menos una señal educativa útil;
- poder ser consumida por Trabajo realizado y Análisis Educativo;
- y permitir propuestas de fortalecimiento cuando aparezcan señales suficientes.

Cuando el Tema se ejecuta desde una Misión, la evidencia de Misión referencia la sesión académica; no se duplica el contenido completo de la ejecución.

Vista previa e histórico conservan su comportamiento sin escrituras.

La incorporación seguirá por defecto el **Modo de Incorporación Curricular de una sola instrucción** definido en la sección 21.

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
| CA-021 | Para 6.º, material escolar + curso/materia/tema + la instrucción “Incorporar a la Academia” constituyen la entrada normal suficiente para iniciar una incorporación curricular; las notas adicionales son opcionales. | Aprobada |
| CA-022 | El proceso no interrumpirá por detalles secundarios; solo solicitará aclaración cuando falte información que cambie materialmente el contenido, procedimiento, nivel, evaluación, fidelidad a la fuente o una decisión de arquitectura no aprobada. | Aprobada |
| CA-023 | Un nuevo Tema no justifica por sí solo nueva arquitectura; los defectos genéricos se separarán como trabajo técnico salvo que bloqueen el Tema. | Aprobada |
| CA-024 | Tras la validación familiar positiva, auditoría final, documentación aplicable, PR y merge forman parte del cierre normal sin confirmaciones redundantes si el alcance no cambia. | Aprobada |
| CA-025 | Todo nuevo Tema Académico de 6.º debe producir evidencia académica estructurada durante una ejecución normal, incluso cuando el acceso no procede de una Misión. | Aprobada |
| CA-026 | La evidencia de nuevos Temas debe poder alimentar Trabajo realizado, Análisis Educativo, estadísticas/evolución y propuestas de fortalecimiento sin depender de un esquema privado por Tema. | Aprobada |
| CA-027 | La AI Collaborator decide la ubicación `Curso → Asignatura → Tema`, reutiliza estructura existente y crea carpetas/archivos solo cuando sean necesarios; la familia no administra rutas técnicas. | Aprobada |
| CA-028 | El ciclo normal es entrada mínima → trabajo interno → `YA PUEDES PROBAR` → observaciones opcionales → aprobación → cierre definitivo. | Aprobada |

---

## 24. Estado de implementación y trabajo pendiente

### Implementado y validado

A 03/09/2026 están construidos y probados:

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
11. Propuestas de refuerzo a partir del mapa formativo de la sesión académica más reciente en Puente y Fracciones.
12. Preparación de Misiones académicas de refuerzo bajo revisión/activación familiar, sin persistencia paralela.
13. Protección para que una Misión académica de refuerzo oculta no se abra ni se cierre manualmente saltándose su sesión/evidencia.
14. **Modo de Incorporación Curricular de una sola instrucción** aprobado como procedimiento operativo para nuevos temas de 6.º.
15. Reporte de **Análisis Educativo V1** que consume Detectives, Pruebas Académicas y Rincón de Lectura para describir fortalezas, aspectos a reforzar, evolución, intentos, pistas/ayudas, mejoras personales y propuestas de actuación.
16. Contrato documental que exige evidencia académica analizable para cada nuevo Tema de 6.º.

### Pendiente de evolución

1. Aplicar el modo de incorporación completo al siguiente tema/materia real de 6.º y aprender de su uso repetido.
2. Aplicar sistemáticamente el contrato de evidencia analizable a cada nuevo Tema de 6.º.
3. Extender los tipos de señales compartidas solo cuando nuevos contenidos reales lo requieran.
4. Ajustar las reglas automáticas de refuerzo solo cuando exista evidencia real suficiente que justifique una evolución.

La existencia de persistencia no obliga a modernizar de forma masiva los recursos de 5.º.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Pregunta resuelta** | Cómo transformar material escolar en Temas Académicos consistentes, adaptados, medibles y reutilizables con mínima intervención administrativa de la familia. |
| **Primera aplicación** | 6.º de Primaria. |
| **Reutilización** | Aprovechar patrones validados de 5.º y la arquitectura existente de Motores, Misiones y Evidencias. |
| **Principio de diseño** | Estándar común de experiencia; implementación específica según materia y tema. |
| **Persistencia** | `sesion-academica-v1`: todo nuevo Tema de 6.º produce evidencia académica estructurada; la evidencia de Misión referencia la sesión cuando existe Misión. |
| **Análisis** | La evidencia debe poder alimentar Trabajo realizado, Análisis Educativo, estadísticas/evolución y propuestas de fortalecimiento. |
| **Retroalimentación** | Basada en datos observables, prudente, accionable y no diagnóstica. |
| **Operación curricular** | Material + curso/materia/tema + notas opcionales + “Incorporar a la Academia” → análisis/ubicación/construcción/integración → `YA PUEDES PROBAR` → aprobación u observaciones → cierre definitivo. |
| **Intervención familiar** | La familia aporta contenido y contexto, valida el producto y controla las acciones de fortalecimiento; no administra rutas, carpetas ni contratos técnicos. |
| **Estado** | Activo; implementación base validada con Puente y Fracciones, Análisis Educativo V1 disponible y procedimiento de incorporación de mínima intervención aprobado para la expansión progresiva de 6.º. |