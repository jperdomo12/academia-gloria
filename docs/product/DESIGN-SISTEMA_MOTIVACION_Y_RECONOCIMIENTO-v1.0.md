# 🌈 Academia Gloria Valentina
# DISEÑO — SISTEMA DE MOTIVACIÓN Y RECONOCIMIENTO

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` |
| **Versión** | 1.0-rc1 |
| **Estado** | Candidato a aprobación funcional · Sin implementación |
| **Fecha** | 01/09/2026 |
| **Responsables** | Juan Perdomo + Arquitectura colaborativa con IA |
| **Ámbito** | Motivación, reconocimiento, Guacamayas, Récord Personal, Lía, retos cooperativos y su integración con Mi Camino |

---

## 0. Resumen ejecutivo

Recompensas v1 no se diseña como una capa decorativa ni como un sistema de premios.

Es la primera versión de un **Sistema de Motivación y Reconocimiento** cuyo propósito es ayudar a que el alumno quiera aprender, perciba su progreso, pueda volver después de una dificultad, desarrolle autonomía y conserve una historia positiva y verdadera de su crecimiento.

El sistema se apoya en cinco pilares:

1. **QUIERO** — autonomía y sentido.
2. **PUEDO** — competencia y progreso visible.
3. **PERTENEZCO** — vínculo y acompañamiento.
4. **ME SUPERO** — perseverancia y recuperación.
5. **MI CAMINO IMPORTA** — identidad, memoria y significado.

Recompensas v1 utilizará cuatro mecanismos:

- ✨ **Reconocimiento** de Lía o de la familia.
- 🏅 **Récord Personal** contra una marca propia comparable.
- 🦜 **Guacamaya** como hito especial y permanente.
- 🤝 **Reto cooperativo** Gloria + familia.

Principios centrales:

- actividad y progreso reales, no clics;
- proceso antes que perfección;
- comparación principal con uno mismo;
- ayuda normalizada;
- reconocimiento específico y explicable;
- Guacamayas raras y significativas;
- participación humana cuando el significado no puede inferirse de datos;
- ninguna recompensa se pierde como castigo;
- no rankings, puntos, monedas, tienda, rachas con amenaza ni “premios por entrar”;
- no afirmaciones clínicas ni inferencias emocionales automáticas;
- no backfill masivo de reconocimientos automáticos antiguos;
- datos de prueba excluidos.

El hogar visible será:

```text
Mi Camino
   ↓
Así voy creciendo
```

La implementación se propone incrementalmente:

```text
A1  Reconocimiento humano
A2  Guacamayas humanas
B   Reconocimientos automáticos de Lía
C   Récord Personal en Detectives
D   Retos cooperativos
E   Evolución Semilla → Brote → Árbol
```

Este documento en estado `1.0-rc1` consolida las decisiones funcionales suficientes para revisar y aprobar A1/A2 antes de programar.

---

## 1. Propósito

Definir el sistema de motivación y reconocimiento de la Academia Gloria Valentina antes de implementar reglas, datos o interfaces.

El objetivo no es que el alumno “haga cosas para ganar premios”.

El objetivo es favorecer progresivamente que:

- quiera comenzar;
- quiera continuar;
- pueda volver a intentarlo después de una dificultad;
- perciba que puede mejorar;
- desarrolle confianza y autonomía;
- disfrute aprender;
- descubra intereses propios;
- pueda pedir ayuda sin vivirlo como fracaso;
- acepte que equivocarse forma parte del aprendizaje;
- se compare principalmente consigo mismo;
- afronte retos con ambición sana;
- y quiera regresar a la Academia porque la experiencia tiene sentido.

La motivación es una capacidad transversal del producto, no una pantalla aislada.

> **La recompensa visible es una herramienta. La meta real es construir deseo de aprender, confianza para actuar y capacidad para levantarse después de caer.**

---

## 2. Posición dentro de la arquitectura existente

Este documento desarrolla principios ya presentes en la Academia.

Documentos que lo gobiernan:

- `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md`
- `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md`
- `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md`
- `docs/vision/01_PRINCIPIOS_PEDAGOGICOS.md`
- `docs/vision/07_IDENTIDAD_GUACAMAYAS.md`
- `docs/vision/08_MI_CAMINO.md`
- `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`

La arquitectura existente ya establece que:

- Motivación y Reconocimiento constituyen un dominio propio.
- Las recompensas no deben sustituir la motivación interna.
- No deben comparar alumnos como mecanismo principal.
- No deben castigar ni generar ansiedad.
- Las Guacamayas representan identidad, crecimiento, raíces, familia y esperanza; no superioridad ni perfección.
- Mi Camino debe hacer visible el crecimiento personal.
- Lía acompaña y explica, pero no inventa progreso ni realiza inferencias clínicas.
- Las decisiones de alto significado necesitan supervisión humana cuando el dato no basta.

Este documento concreta esas reglas para Recompensas v1.

---

## 3. Base profesional y nivel de evidencia

### 3.1 Self-Determination Theory

La Self-Determination Theory (SDT) distingue motivación autónoma de motivación controlada y sitúa tres necesidades psicológicas como fundamentales:

- **Autonomía** — sentir participación y elección real.
- **Competencia** — percibir que puedo desarrollar habilidades y progresar.
- **Relación / pertenencia** — sentir vínculo, apoyo y seguridad.

Una revisión sistemática y meta-análisis de 36 intervenciones educativas basadas en SDT encontró efectos favorables sobre autonomía y competencia, y evidencia parcial favorable sobre motivación intrínseca.

**Implicación para la Academia:**

```text
quiero + puedo + pertenezco
```

debe pesar más que:

```text
debo hacerlo para que me den algo
```

### 3.2 Elogio y feedback

La investigación sobre elogio infantil muestra que su efecto depende del contenido y del contexto.

El reconocimiento resulta más compatible con motivación cuando es:

- sincero;
- específico;
- informativo;
- ligado a acciones, estrategias o causas controlables;
- respetuoso de la autonomía;
- y no dependiente de comparación social.

Preferir:

> “Esta vez volviste a leer la pregunta y seguiste pensando.”

Evitar como patrón:

> “Eres la mejor.”

> “Eres súper inteligente.”

> “Siempre lo haces perfecto.”

La Academia reconocerá **hechos y procesos**, evitando convertirlos en etiquetas fijas de personalidad.

### 3.3 Recompensas externas

Recompensas tangibles o percibidas como controladoras pueden reducir la motivación intrínseca en determinadas condiciones.

Por ello, la Academia no creará una economía de puntos ni pagará cada conducta con un premio.

Los símbolos de Recompensas v1 deben funcionar principalmente como:

- información sobre progreso;
- memoria de un hito;
- señal de pertenencia;
- y reconocimiento de un proceso valioso.

### 3.4 Metas de dominio y competitividad

La Academia favorece metas centradas en desarrollar competencia y superar retos propios.

En v1 la comparación principal será:

> **Yo ahora frente a yo antes, cuando la comparación sea válida.**

Esto no elimina la competitividad sana.

A largo plazo, competir sanamente también puede incluir afrontar un reto compartido, aceptar que no siempre se gana, respetar reglas y aprender del resultado. Sin embargo, **Recompensas v1 no utiliza ranking social ni comparación entre alumnos**.

### 3.5 TEL / TDL / DLD

La literatura sobre Developmental Language Disorder (DLD/TDL) es heterogénea y no describe a cada niño de la misma manera.

La evidencia reciente sí justifica cautela ante diseños que aumenten presión o incertidumbre. Un meta-análisis de 2026 encontró, en promedio, mayores dificultades de regulación emocional en niños y adolescentes con DLD que en pares de desarrollo típico, con heterogeneidad importante y señales de que el tamaño del efecto puede estar sobreestimado. Otros estudios han descrito mayor presencia de ansiedad en algunas muestras y posible relevancia de la intolerancia a la incertidumbre.

**Implicación de producto, no clínica:**

- reglas comprensibles;
- mensajes breves;
- ayudas visibles;
- ausencia de amenaza de pérdida;
- posibilidad de repetir;
- tiempo suficiente;
- elección cuando sea real;
- fortalecimiento de capacidades;
- y seguridad para equivocarse.

La Academia no diagnostica ansiedad, regulación emocional, autoestima ni progreso clínico.

---

## 4. Resultados humanos que queremos favorecer

La Academia aspira a reforzar progresivamente una persona:

- **feliz**, para quien aprender no sea sinónimo de presión;
- **independiente**, capaz de hacer cada vez más por sí misma;
- **analítica**, que observe, piense y pruebe estrategias;
- **curiosa**, que quiera leer, descubrir y aprender;
- **perseverante**, capaz de recuperarse y volver;
- **competitiva de forma sana**, interesada en superarse y afrontar retos;
- **capaz de pedir ayuda**, sin interpretarlo como derrota;
- **capaz de reconocer fortalezas** sin negar aquello que necesita practicar;
- **con sentido de pertenencia**, acompañada por familia y Academia sin sentirse vigilada.

Estos son **nortes de diseño**, no puntuaciones psicológicas.

---

## 5. Modelo motivacional: cinco pilares

### 5.1 QUIERO — Autonomía y sentido

Favorecer que el alumno comprenda para qué sirve una actividad y pueda elegir cuando la elección sea realista.

Ejemplos:

- elegir entre historias compatibles con una Misión;
- escoger por cuál reto comenzar;
- conocer por qué conviene practicar algo;
- decidir volver a intentar.

### 5.2 PUEDO — Competencia y progreso visible

Hacer visible la mejora sin exigir perfección.

Ejemplos:

- necesitar menos pistas en una experiencia realmente comparable;
- necesitar menos intentos adicionales;
- completar algo que antes quedó en curso;
- dominar progresivamente una habilidad.

### 5.3 PERTENEZCO — Relación y acompañamiento

Familia y Lía acompañan sin convertir la experiencia en vigilancia.

Ejemplos:

- reconocimiento familiar;
- reto cooperativo;
- mensaje breve de Lía basado en un hecho real;
- celebrar juntos un hito.

### 5.4 ME SUPERO — Perseverancia y recuperación

Reconocer el proceso de enfrentarse a una dificultad y continuar.

Ejemplos:

- pedir ayuda y continuar;
- reintentar después de no acertar;
- completar una práctica después de varios intentos;
- regresar a algo que había quedado pendiente.

### 5.5 MI CAMINO IMPORTA — Identidad, memoria y significado

Los momentos importantes forman una historia personal.

Una recompensa duradera debe poder responder:

> “¿Qué ocurrió para que esto forme parte de mi camino?”

La respuesta nunca será:

> “Porque acumulaste 500 puntos.”

---

## 6. Reglas no negociables

Recompensas v1 NO tendrá:

- rankings entre alumnos;
- ganador/perdedor como estructura motivacional;
- pérdida de recompensas por errores;
- pérdida por inactividad;
- “racha perdida”;
- castigos visuales;
- monedas;
- tienda;
- XP como fin;
- recompensa por login;
- recompensa por navegar o hacer clic;
- premio garantizado por cada actividad;
- mensajes de culpa;
- cuenta atrás artificial para presionar;
- catálogo de premios bloqueados;
- botón “reclamar premio”;
- comparación pública;
- afirmaciones clínicas;
- ni recompensas basadas en datos marcados como prueba.

Una recompensa correctamente concedida no se retira como disciplina.

Errores administrativos o duplicados pueden corregirse con trazabilidad. Eso no equivale a “perder” una recompensa.

---

## 7. Los cuatro mecanismos

### 7.1 ✨ Reconocimiento

Reconoce una acción concreta y valiosa.

Puede provenir de:

- Lía, cuando un hecho observable cumple una regla de alta confianza;
- familia, cuando el significado requiere contexto humano.

Ejemplos:

> “Una respuesta necesitó más de un intento y seguiste pensando hasta encontrarla.”

> “Tu familia quiso guardar este momento porque vio algo importante en tu esfuerzo.”

Un reconocimiento puede conservarse en la historia, pero no se presenta como gran trofeo.

### 7.2 🏅 Récord Personal

Hace visible una mejora respecto a experiencias anteriores **comparables**.

Regla central:

> **Un Récord Personal debe demostrarse con datos reales y una línea base válida.**

No se asigna manualmente.

No se utiliza para:

- comparar actividades no equivalentes;
- primera ejecución sin referencia anterior;
- reconocimiento de voz;
- “mejor respuesta emocional”;
- velocidad en v1;
- comparar con otros alumnos.

### 7.3 🦜 Guacamaya

Es un hito de alto significado.

La Guacamaya:

- no es moneda;
- no se entrega por cada Misión;
- no se compra;
- no se pierde;
- no representa perfección;
- no representa superioridad;
- no se “reclama”.

Cada Guacamaya conserva:

- categoría;
- nombre;
- fecha;
- hecho real;
- fuente;
- mensaje;
- y vínculo histórico cuando exista.

### 7.4 🤝 Reto cooperativo

Refuerza pertenencia y colaboración.

Un reto cooperativo requiere aportes diferentes de Gloria y familia.

La simple validación administrativa de una Misión no constituye por sí sola cooperación.

La especificación detallada del primer reto se realizará en Fase D y no bloquea A1/A2.

---

## 8. Catálogo inicial de Guacamayas v1

El catálogo comienza con seis categorías.

| Guacamaya | Pilar principal | Qué representa | Criterio v1 |
|---|---|---|---|
| 🦜 **Valiente** | ME SUPERO | Recuperarse tras una dificultad real | Retomar, continuar o afrontar de nuevo algo que había supuesto una dificultad significativa. No basta un error aislado. |
| 🦜 **Alas Propias** | QUIERO / PUEDO | Autonomía creciente | Hito cualitativo de independencia o responsabilidad con menos acompañamiento, cuando el hecho pueda demostrarse o ser confirmado por familia. |
| 🦜 **Curiosa** | QUIERO | Deseo auténtico de descubrir | Iniciar o ampliar voluntariamente un aprendizaje, lectura o tema con significado. Una acción aislada asignada no basta. |
| 🦜 **Pensadora** | PUEDO | Analizar, comprender y probar estrategias | Hito en el que exista evidencia/observación de razonamiento, revisión de error o estrategia significativa. No basta acertar. |
| 🦜 **de Equipo** | PERTENEZCO | Cooperación real | Completar un reto cooperativo con aportes distintos de alumno y familia. |
| 🦜 **de Crecimiento** | MI CAMINO IMPORTA | Descubrir algo importante sobre sí misma o una habilidad para la vida | Hito de significado humano. En v1 su concesión es humana. |

### 8.1 Rareza

Regla operativa v1:

> **Cada categoría de Guacamaya puede estar activa una sola vez por Persona.**

Un nuevo hecho de la misma categoría puede producir otro ✨ Reconocimiento o 🏅 Récord, pero no duplica la Guacamaya.

Esta unicidad es una decisión de v1 para proteger significado, **no una ley permanente del producto**. Se revisará después de observar uso real.

### 8.2 Autoridad

- El sistema puede **proponer** una posible Guacamaya cuando exista señal suficiente.
- La familia confirma o descarta.
- La familia puede conceder directamente una Guacamaya sobre un hecho real.
- `Guacamaya de Crecimiento` es humana en v1.

### 8.3 Una sola celebración principal

Si un mismo hecho cumple varios mecanismos:

```text
Guacamaya > Récord Personal > Reconocimiento
```

Los datos secundarios pueden mencionarse dentro del mensaje, pero no se mostrará una cascada de celebraciones.

---

## 9. Reconocimiento humano sobre Misiones completadas

Requisito explícito:

> **La familia podrá reconocer una Misión real ya completada aunque el sistema no generara automáticamente un reconocimiento al finalizarla.**

Esto cubre:

- Misiones libres;
- actividades escolares sin evidencia automática;
- Semillas de Creciendo por Dentro;
- logros cuyo significado depende del contexto;
- actividades históricas anteriores a Recompensas v1.

### 9.1 Integridad histórica

Se distinguirán:

- fecha del hecho;
- fecha del reconocimiento;
- quién lo concedió;
- motivo;
- fuente.

No se fingirá que Lía observó retrospectivamente algo que no observó.

### 9.2 Caso de referencia

Misión:

> **Algo que conseguí esta semana**

Flujo previsto:

```text
Gestión de Misiones
→ Completadas
→ Algo que conseguí esta semana
→ 🌟 Añadir reconocimiento
```

Categoría sugerida:

```text
🌱 Crecimiento personal
```

Mensaje editable:

> “Te detuviste a pensar en algo que has conseguido y supiste reconocer tu propio esfuerzo. Eso también es crecer.”

La familia decide:

- ✨ guardarlo como Reconocimiento; o
- 🦜 convertirlo en Guacamaya de Crecimiento si el contenido real representa un hito especial.

**Completar la Semilla por sí sola nunca concede automáticamente una Guacamaya.**

---

## 10. Reconocimientos automáticos de Lía v1

### 10.1 Principio de alta confianza

Lía automatiza poco y solo cuando el dato demuestra directamente lo que el mensaje afirma.

No automatizará todavía:

- “eres más autónoma” sin una medida explícita;
- “cambiaste de estrategia” sin registro de estrategia;
- “leíste por curiosidad” sin distinguir claramente voluntario/asignado;
- “volviste voluntariamente” a una lectura con historial sobrescrito;
- estados emocionales;
- confianza;
- ansiedad;
- autoestima;
- rasgos permanentes.

### 10.2 Reglas iniciales aprobables

| ID | Motor | Condición observable | Mensaje base |
|---|---|---|---|
| `lia.detectives.ayuda_y_continuo` | Detectives | Sesión completada con `pistasUtilizadas >= 1` | “Usaste ayuda cuando la necesitaste y seguiste hasta resolver el caso. Pedir ayuda también puede ayudarte a avanzar.” |
| `lia.detectives.persistencia` | Detectives | Sesión completada con `intentosAdicionales >= 2`, sin celebración de mayor prioridad | “No salió al principio, pero seguiste probando hasta resolver el caso.” |
| `lia.lectura.comprension_reintento` | Rincón | Alguna pregunta de opción termina correcta tras `>= 2` intentos | “Una respuesta necesitó más de un intento y seguiste pensando hasta encontrarla.” |
| `lia.palabras.practica_persistente` | Palabras para Crecer | Palabra con `>= 2` intentos que termina `superada`; para `en_practica`, solo cuando los intentos fueron válidos y no un fallo técnico | Éxito: “Practicaste «{palabra}» varias veces hasta que Lía pudo reconocerla.” / En práctica: “Practicaste «{palabra}» varias veces. No tiene que salir hoy; puedes volver más adelante.” |

### 10.3 Regla de Creciendo por Dentro retirada de automatización rc1

El borrador incluía una regla basada en `recordingAttempts >= 2`.

La auditoría rc1 la retira porque dos grabaciones pueden significar:

- decisión consciente de repetir;
- error de micrófono;
- reintento técnico;
- grabación demasiado grande;
- u otra causa.

Por tanto, **Creciendo por Dentro permanece predominantemente humano en v1**.

Una regla automática de repetición solo podrá reabrirse cuando el motor registre de forma explícita una intención como:

```text
“Quiero volver a decirlo”
```

diferenciada de un reintento técnico.

---

## 11. Récord Personal v1 — Detectives

Detectives es el primer motor aprobado para Récord Personal porque conserva sesiones independientes y métricas estructuradas.

### 11.1 Comparabilidad

Dos sesiones son comparables solo si coinciden en:

- `nivel`;
- `tipo`;
- `plantillaId`;
- `intentosMinimos`.

Además, para reducir el efecto memoria, v1 preferirá y, para emitir un Récord, requerirá una sesión anterior de **otra historia** dentro del mismo grupo comparable.

Debe existir al menos una sesión anterior real y no identificada como prueba.

### 11.2 Récord A — Menos pistas

Condición:

```text
pistasActuales < mejorPistasAnteriorComparable
```

Mensaje:

> 🏅 **Nueva mejor marca personal**  
> “Esta vez resolviste un caso comparable usando menos pistas que antes.”

Dato secundario:

> “Antes: 2 · Ahora: 1”

No afirmar:

> “Ya no necesitas ayuda.”

### 11.3 Récord B — Menos intentos adicionales

Se evalúa si la sesión no produjo Récord A.

Condición:

```text
intentosAdicionalesActuales < mejorIntentosAdicionalesAnteriorComparable
```

Mensaje:

> 🏅 **Nueva mejor marca personal**  
> “Esta vez necesitaste menos intentos extra para resolver un caso comparable.”

### 11.4 Categoría semántica

Un Récord de menos pistas o menos intentos se clasifica como **progreso personal**.

No se etiquetará automáticamente como “autonomía” ni “pensamiento” salvo que otro dato permita sostener esa interpretación.

### 11.5 Baseline histórico

Los datos reales anteriores a activar Recompensas pueden servir como línea base.

No se crean retrospectivamente récords antiguos.

Ejemplo:

```text
Agosto: 2 pistas
Activación de Recompensas
Septiembre: 1 pista
```

Septiembre puede generar un Récord verdadero:

> “Antes: 2 · Ahora: 1.”

---

## 12. Frecuencia, deduplicación y riesgo de dependencia

### 12.1 Una celebración por experiencia

Máximo un Reconocimiento automático de Lía por experiencia/sesión.

### 12.2 Idempotencia

Identidad lógica mínima:

```text
persona + reglaId + fuentePrincipal
```

Refrescar, reabrir o repetir una llamada no puede duplicar el mismo reconocimiento.

### 12.3 Parámetros iniciales de experiencia

Valores de partida para piloto:

- descanso de **7 días** antes de volver a destacar la misma regla;
- máximo **2 Reconocimientos automáticos de Lía al día**.

Estos valores:

- NO son umbrales pedagógicos;
- NO son puntuaciones;
- NO significan que lo demás “no cuente”;
- deben ser configurables;
- se revisarán con uso real.

Guacamayas y Récords válidos tienen prioridad y no se invalidan por estos límites.

Los reconocimientos humanos no están sujetos al límite automático.

### 12.4 Señales de sobre-recompensa

El sistema debe vigilar cualitativamente si la capa motivacional empieza a desplazar el interés por aprender.

Señales para revisar el diseño, no para etiquetar al alumno:

- pregunta sistemáticamente “¿qué me dan?” antes de comenzar;
- deja de querer hacer actividades si no hay recompensa visible;
- muestra decepción frecuente cuando una actividad correcta no produce reconocimiento;
- se interesa más por acumular símbolos que por la actividad;
- aumenta la negociación externa alrededor de cada Misión.

Si estas señales aparecen de forma sostenida, la respuesta de producto será:

- reducir frecuencia/intensidad;
- hacer más informativo el feedback;
- aumentar elección y sentido;
- reforzar curiosidad;
- revisar si estamos premiando demasiado.

**Nunca se responderá creando más premios para mantener el mismo nivel de interés.**

---

## 13. Mi Camino → Así voy creciendo

`Así voy creciendo` será el hogar visible de Recompensas v1.

No será una vitrina de premios.

Debe responder:

1. ¿Qué he conseguido últimamente?
2. ¿Qué cosas especiales forman parte de mi historia?
3. ¿En qué noto que estoy mejorando respecto a mí misma?

### 13.1 Orden visual

```text
🌱 ASÍ VOY CRECIENDO

✨ Lo último que reconocimos

🦜 Mis Guacamayas     🏅 Mi mejor marca reciente

🤝 Nuestro reto en familia     [solo si existe]

🌱 Mi etapa de crecimiento
Semilla → Brote → Árbol

🌈 Ver mi historia de crecimiento
```

En móvil, una columna.

### 13.2 Lo último que reconocimos

Variantes:

- `✨ Lía observó...`
- `💛 Mi familia reconoce...`
- `🏅 Nueva mejor marca`
- `🦜 Un hito especial`

Puede mostrar `✨ Nuevo` hasta la primera visualización, sin alarma ni presión.

### 13.3 Mis Guacamayas

Gloria verá **solo las Guacamayas obtenidas**.

No verá:

- seis siluetas grises;
- `2/6`;
- porcentaje;
- “te faltan 4”;
- progreso hacia la siguiente;
- requisito para “desbloquear”.

Si todavía no tiene ninguna:

> “Las Guacamayas aparecen en momentos especiales de tu camino. No tienes que buscarlas: llegan cuando algo importante merece ser recordado.”

Cada Guacamaya mostrará:

- nombre;
- ilustración;
- fecha;
- frase corta;
- `Ver mi historia`.

### 13.4 Mi mejor marca reciente

Solo aparece cuando existe un Récord válido.

No usa:

- podio;
- puesto;
- ranking;
- cronómetro;
- presión por volver a superar la marca.

Una sesión sin récord no se presenta como retroceso.

### 13.5 Historia de crecimiento

Acceso:

```text
🌈 Ver mi historia de crecimiento
```

Orden cronológico.

Puede contener:

- reconocimientos de Lía;
- reconocimientos familiares;
- Récords;
- Guacamayas;
- retos cooperativos completados.

Filtros avanzados son opcionales mientras el historial sea pequeño.

### 13.6 Celebración de Guacamaya

Flujo:

```text
Existe Guacamaya nueva no vista
→ aparición suave
→ “Esta Guacamaya llegó por...”
→ explicación real
→ [Entendido]
```

No:

- cofres;
- ruletas;
- azar;
- sonido obligatorio;
- confeti prolongado;
- “reclamar”.

La Guacamaya ya forma parte de su historia antes de ser vista.

---

## 14. Flujo familiar — Añadir reconocimiento

En Gestión de Misiones → Completadas se añadirá:

```text
🌟 Añadir reconocimiento
```

junto a las acciones existentes y solo para roles con gestión.

### 14.1 Formulario v1

#### Campo 1 — Qué quieres reconocer

- 💪 Perseverancia / volver a intentarlo
- 🪽 Autonomía / hacer más por sí misma
- 🔎 Curiosidad / querer descubrir
- 🧠 Pensamiento / estrategia
- 🤝 Trabajo en equipo
- 🌱 Crecimiento personal
- 📈 Progreso personal
- ✨ Otro

#### Campo 2 — Mensaje para el alumno

Editable por la familia.

Ayuda:

> “Cuenta qué ocurrió y por qué te pareció importante.”

Sin escalas numéricas obligatorias.

#### Campo 3 — ¿Fue un hito especialmente importante?

Desactivado por defecto:

```text
🦜 Convertir este reconocimiento en Guacamaya
```

Al activarlo:

- se propone la categoría compatible;
- se explica que es un hito especial;
- se comprueba unicidad;
- la familia confirma.

### 14.2 Una Misión, un reconocimiento humano principal en v1

Para evitar cascadas y complejidad inicial:

> una Misión tendrá como máximo un Reconocimiento humano principal activo.

La familia puede editarlo o elevarlo a Guacamaya.

Esta es una simplificación operativa v1, revisable si el uso real exige varios reconocimientos independientes.

### 14.3 Propuestas automáticas de Guacamaya

Las posibles Guacamayas detectadas por el sistema:

- no aparecen como “pendientes” ante Gloria;
- aparecen solo en Gestión como `🦜 Posible hito para revisar`;
- pueden confirmarse, convertirse en reconocimiento normal o descartarse;
- descartarlas no produce mensaje negativo al alumno.

---

## 15. Modelo funcional de datos

### 15.1 Entidad central

Conceptualmente se utilizará:

```text
RECONOCIMIENTO
```

No se crean dominios separados de puntos, premios, insignias y récords.

Ruta física candidata, a validar contra API y reglas existentes:

```text
usuarios/{userIdPersonaActiva}/reconocimientos/{reconocimientoId}
```

La ruta se alinea con las subcolecciones educativas actuales.

**Importante:** `userIdPersonaActiva` es el identificador técnico del documento `usuarios/{uid}` asociado a la Persona Activa. Si el modelo de Persona ya proporciona un `personaId` de negocio estable, podrá conservarse dentro del reconocimiento; no se duplicará identidad sin necesidad.

### 15.2 Modelo conceptual rc1

```text
RECONOCIMIENTO
- id
- schemaVersion

- personaId?                  // identidad de negocio, si aplica
- userIdPersona               // propietario técnico de la subcolección

- tipo
    reconocimiento
    record_personal
    guacamaya
    reto_cooperativo

- categoria
    progreso
    perseverancia
    autonomia
    curiosidad
    pensamiento
    equipo
    crecimiento
    otro

- titulo
- mensaje

- origen
    observado
    derivado
    humano

- reglaId?                    // automático/derivado

- fuentePrincipal
    tipo
    id
    modulo?
    misionId?
    actividadId?
    sesionId?

- dependencias?[]             // fuentes adicionales necesarias para demostrar la afirmación
    tipo
    id
    modulo?
    misionId?
    actividadId?
    sesionId?

- fuenteSnapshot?             // solo preservación humana tras eliminar fuente
    titulo
    modulo
    fechaHecho

- fuenteEliminada
- datosSoporte?
    comparacion?
    valorAnterior?
    valorActual?
    unidad?

- guacamaya?
    categoriaId
    confirmadaPor
    confirmadaEn

- estado
    propuesta
    activo
    descartado
    anulado

- visibleAlumno
- vistoPorAlumnoEn?

- fechaHecho
- fechaReconocimiento

- createdAt
- createdBy
- updatedAt
- updatedBy
```

### 15.3 Dependencias múltiples

Un Récord necesita demostrar:

- sesión actual;
- referencia anterior o conjunto de comparación.

Por ello `fuentePrincipal` no es suficiente.

`dependencias[]` permite saber qué datos sostienen la afirmación y qué debe revisarse si una fuente se elimina.

### 15.4 Estados

**propuesta**  
Pendiente de decisión adulta. No visible al alumno.

**activo**  
Forma parte del camino.

**descartado**  
Propuesta no aceptada. No visible; puede conservarse mínimamente para evitar reproponer el mismo hecho.

**anulado**  
Corrección administrativa auditada. No es pérdida educativa.

`vistoPorAlumnoEn` es presentación, no estado de logro.

---

## 16. Autoridad, permisos y frontera de seguridad

### 16.1 Alumno

Puede:

- leer reconocimientos `activo` + `visibleAlumno=true`;
- marcar como visto;
- realizar actividades que originan hechos candidatos.

No puede:

- concederse Guacamayas;
- crear reconocimiento humano;
- confirmar propuestas;
- modificar mensajes familiares;
- anular reconocimientos.

### 16.2 Familia / rol de gestión relacionado

Puede:

- leer reconocimientos y propuestas;
- crear/editar Reconocimiento humano;
- confirmar/descartar Guacamaya;
- conceder una Guacamaya válida;
- anular errores con trazabilidad;
- decidir qué ocurre al eliminar una Misión fuente.

### 16.3 Consulta relacionada

Lectura según permisos, sin conceder ni modificar.

### 16.4 Administrador

Gestión completa y corrección auditada.

### 16.5 La interfaz no es una frontera de seguridad

Una regla crítica de implementación:

> **Ocultar un botón al alumno no demuestra que una escritura Firestore sea legítima.**

Antes de implementar Fase B/C deberá decidirse cómo validar escrituras automáticas.

Opciones aceptables:

1. Firestore Rules que validen estrictamente tipo, origen, autor y fuente verificable; o
2. un flujo de procesamiento con autoridad de gestión/trusted workflow.

Si no puede demostrarse que una escritura automática es suficientemente validable, **se pospone esa automatización**.

A1/A2 no dependen de resolver todavía este problema porque son acciones adultas explícitas.

---

## 17. Datos de prueba

Regla:

> Una Misión `esDatoPrueba=true` no puede originar Recompensas v1, ni automática ni manualmente.

Si una Misión fue marcada como prueba por error, el adulto debe retirar conscientemente la marca antes de reconocerla.

Para fuentes no ligadas a Misión, futuras herramientas de prueba deberán disponer de una señal equivalente o ejecutarse con un contexto de prueba que no contamine el historial.

---

## 18. Retroactividad y activación

### 18.1 Reconocimiento humano histórico

Permitido sobre una actividad real.

Se guarda:

- `fechaHecho`;
- `fechaReconocimiento`.

### 18.2 Guacamaya humana histórica

Permitida si existe un hecho real identificable y la familia confirma el significado.

### 18.3 Automáticos

No hay backfill masivo.

Al activar Recompensas, no se escanea todo el pasado para fabricar mensajes antiguos de Lía.

### 18.4 Récord Personal

El pasado real puede ser baseline.

No produce retrospectivamente récords antiguos.

### 18.5 Fecha de activación

La implementación tendrá una referencia explícita, por ejemplo:

```text
recompensasActivadasEn
```

La ubicación se decidirá reutilizando configuración existente antes de crear estructura nueva.

---

## 19. Eliminación de Misiones y fuentes

Antes de borrar una Misión, el inventario de eliminación deberá incluir reconocimientos vinculados.

### 19.1 Automático / Récord

Si una fuente o dependencia necesaria para demostrar el reconocimiento se elimina:

- el reconocimiento derivado no puede seguir afirmando el hecho como verificable;
- deberá eliminarse o anularse según la política técnica aprobada;
- no puede independizarse solo mediante texto.

Un Récord cuya referencia anterior fue eliminada también debe revisarse porque su comparación pierde trazabilidad.

### 19.2 Humano / Guacamaya

Si una Misión con reconocimiento humano se elimina, la confirmación reforzada ofrecerá:

1. eliminar también reconocimiento/hito; o
2. conservarlo como historia humana independiente.

Al conservar:

```text
fuenteEliminada = true
fuenteSnapshot = {
  titulo,
  modulo,
  fechaHecho
}
```

El sistema no fingirá que la Misión continúa existiendo.

### 19.3 Integración con el motor actual

La implementación deberá reutilizar el motor actual de eliminación completa de Misiones y ampliar su inventario; no crear un segundo mecanismo de borrado paralelo.

---

## 20. Lenguaje y salvaguardas TEL/TDL

### 20.1 Patrón de mensaje

```text
QUÉ OCURRIÓ
+ POR QUÉ IMPORTA
+ próximo paso suave, solo si aporta
```

### 20.2 Mensajes principales

Deben:

- contener una idea central;
- ser breves;
- evitar subordinadas innecesarias;
- usar iconos consistentes;
- separar detalle opcional;
- permitir lectura visual rápida.

### 20.3 Ayuda normalizada

Pedir ayuda puede coexistir con progreso.

El objetivo no es “no usar nunca pistas”.

El sistema puede reconocer que la ayuda permitió continuar sin inferir que pedir ayuda es fracaso ni prometer que nunca volverá a necesitarla.

### 20.4 Ritmo propio

No se premia sistemáticamente rapidez.

El tiempo no será Récord en v1.

### 20.5 Fortalezas antes que etiquetas

No:

> “Gloria es ansiosa.”

> “Gloria tiene poca perseverancia.”

Sí:

> “En esta actividad necesitaste varios intentos y continuaste hasta terminar.”

El hecho no se transforma en perfil psicológico.

### 20.6 Previsibilidad sin transacción

El alumno debe comprender:

- qué está haciendo;
- por qué un reconocimiento aparece;
- qué significa una Guacamaya.

Pero el sistema no promete:

> “si haces X, ganarás Y”

como contrato habitual.

---

## 21. Lectura, curiosidad y aprendizaje

Recompensas debe favorecer lectura sin convertir volumen en competición.

Hechos potencialmente reconocibles:

- elegir voluntariamente una lectura;
- regresar para comprender mejor;
- compartir un libro;
- mantener una práctica significativa;
- descubrir un tema;
- expresar una reflexión.

En v1 muchos de estos hechos serán **humanos**, porque el sistema todavía no distingue con suficiente certeza intención, obligación y curiosidad.

No se premiará por “más páginas” como regla automática.

---

## 22. Limitaciones conocidas de los motores actuales

### 22.1 Detectives

Fortaleza:

- sesiones independientes;
- datos comparables;
- intentos y pistas.

Es el primer motor de Récord Personal.

### 22.2 Rincón de Lectura

La sesión principal de una historia utiliza `historiaId` y puede actualizar/reutilizar el mismo documento.

Consecuencia:

- no construir Récords de lectura en v1;
- no afirmar automáticamente “releíste voluntariamente”;
- reconocimientos de comprensión pueden generarse al guardar el hecho actual, no reconstruirse desde un histórico inmutable inexistente.

### 22.3 Palabras para Crecer

Permite observar intentos y estado de práctica.

Nunca se utiliza como diagnóstico de pronunciación.

Los errores técnicos del navegador no deben convertirse en afirmaciones de desempeño.

### 22.4 Creciendo por Dentro

Conserva sesiones independientes, pero su contenido tiene significado personal.

Predominio humano en v1.

No inferir:

- ansiedad;
- autoestima;
- valentía;
- autoconocimiento;
- “mejor respuesta emocional”.

---

## 23. Papel de Lía y de la familia

### 23.1 Lía puede

- reconocer un hecho observable;
- explicar por qué puede importar;
- presentar un Récord determinista;
- proponer un próximo paso suave;
- proponer a adultos una posible Guacamaya;
- acompañar un reto.

### 23.2 Lía no puede

- inventar progreso;
- diagnosticar;
- atribuir intención no registrada;
- comparar con otros alumnos;
- retirar recompensas;
- presionar con rachas;
- convertir toda actividad en celebración.

### 23.3 La familia puede

- reconocer una Misión;
- aportar contexto humano;
- escribir un mensaje;
- confirmar/conceder Guacamaya;
- proponer retos;
- revisar historia.

El sistema debe facilitar acompañar y celebrar, no convertir a la familia en evaluador permanente.

---

## 24. Plan de implementación

### Fase A1 — Fundamento humano

- revisar API/modelos/reglas existentes antes de crear estructura;
- colección/API mínima de Reconocimiento;
- permisos adultos;
- `🌟 Añadir reconocimiento` en Misión completada;
- caso “Algo que conseguí esta semana”;
- último reconocimiento en `Así voy creciendo`;
- historia básica;
- exclusión de datos de prueba;
- integración con eliminación de Misión.

**Valor:** motivación real sin depender de algoritmos.

### Fase A2 — Guacamayas humanas

- seis categorías;
- elevar Reconocimiento a Guacamaya;
- unicidad por categoría;
- `Mis Guacamayas` solo obtenidas;
- celebración suave;
- propuestas visibles solo a familia.

### Fase B — Lía automática

Implementar las **cuatro** reglas rc1:

- ayuda y continuación en Detectives;
- perseverancia en Detectives;
- reintento de comprensión;
- práctica persistente de Palabras para Crecer.

Incluye:

- idempotencia;
- cooldown configurable;
- límite diario configurable;
- control de fuente;
- seguridad de escritura.

La regla automática de Semillas queda fuera hasta disponer de señal explícita de repetición consciente.

### Fase C — Récord Personal Detectives

- comparabilidad formal;
- referencia de otra historia;
- menos pistas;
- menos intentos adicionales;
- baseline histórico;
- `antes → ahora`;
- dependencias trazables.

### Fase D — Reto cooperativo

- diseñar primer reto concreto;
- aporte del alumno;
- aporte de familia;
- cierre cooperativo;
- Guacamaya de Equipo cuando corresponda.

### Fase E — Semilla / Brote / Árbol

Solo después de observar uso real:

- definir qué significa cambiar de etapa;
- usar señales multidimensionales;
- no `X puntos = siguiente nivel`.

### 24.1 Criterio incremental

Cada fase debe aportar valor sin depender de la siguiente.

A1 debe funcionar aunque nunca se implemente B.

---

## 25. Criterios de éxito

No se considerará éxito simplemente aumentar:

- clics;
- sesiones abiertas;
- tiempo de pantalla;
- cantidad de premios.

Se buscará observar cualitativamente que:

- entiende por qué recibe un reconocimiento;
- relaciona reconocimientos con hechos reales;
- una Guacamaya conserva valor emocional;
- puede hablar de progreso propio;
- pedir ayuda no se vive como derrota;
- los errores no generan miedo a perder;
- la familia puede reconocer lo que el sistema no sabe interpretar;
- existe interés por volver;
- la capa motivacional no distrae del aprendizaje;
- y la motivación no se vuelve dependiente de recibir algo en cada actividad.

### 25.1 Revisión de piloto

Después de un periodo suficiente de uso real, revisar:

- frecuencia de reconocimientos;
- reacción ante sesiones sin recompensa;
- comprensión de mensajes;
- valor percibido de Guacamayas;
- uso de `Añadir reconocimiento`;
- señales de sobre-recompensa;
- necesidad real de más de un reconocimiento humano por Misión;
- idoneidad de 7 días / 2 al día.

---

## 26. Decisiones cerradas en rc1

Quedan funcionalmente resueltas para aprobación:

1. Cinco pilares motivacionales.
2. Cuatro mecanismos.
3. Seis Guacamayas iniciales.
4. Unicidad por categoría en v1.
5. No mostrar catálogo bloqueado al alumno.
6. Reconocimiento humano retroactivo.
7. Caso “Algo que conseguí esta semana”.
8. Cuatro reglas automáticas de Lía aprobables.
9. Creciendo automático retirado hasta señal más fuerte.
10. Detectives como único motor de Récord v1 inicial.
11. Récord de menos pistas y menos intentos adicionales.
12. Comparabilidad conservadora.
13. Frecuencia automática como parámetro configurable.
14. Mi Camino → Así voy creciendo como hogar visible.
15. Historia cronológica, no ranking.
16. Modelo conceptual único RECONOCIMIENTO.
17. Dependencias múltiples para trazabilidad.
18. Datos de prueba excluidos.
19. No backfill automático masivo.
20. Integración con eliminación completa de Misiones.
21. Despliegue incremental A1–E.

---

## 27. Decisiones deliberadamente abiertas

No bloquean la aprobación funcional de A1/A2:

1. ruta Firestore exacta después de revisar API/modelos/rules existentes;
2. reglas Firestore exactas;
3. diseño gráfico final de cada Guacamaya;
4. textos finales de celebración después de prueba visual;
5. ubicación técnica de `recompensasActivadasEn`;
6. primer Reto cooperativo concreto;
7. significado de Semilla/Brote/Árbol;
8. ajuste de cooldown/límite diario después de uso real;
9. ampliación futura a profesionales que propongan reconocimientos;
10. ampliación futura de Récords a otros motores cuando tengan datos comparables.

Estas decisiones deben resolverse en la fase donde sean necesarias, evitando sobrearquitectura anticipada.

---

## 28. Referencias profesionales

Estas referencias orientan decisiones de diseño. No convierten la Academia en una herramienta clínica.

1. Wang, Y., Wang, H., Wang, S., Wind, S. A., & Gill, C. (2024). *A systematic review and meta-analysis of self-determination-theory-based interventions in the education context*. Learning and Motivation, 87, 102015. DOI: https://doi.org/10.1016/j.lmot.2024.102015
2. Ryan, R. M., & Deci, E. L. (2020). *Intrinsic and extrinsic motivation from a self-determination theory perspective: Definitions, theory, practices, and future directions*. Contemporary Educational Psychology, 61, 101860. DOI: https://doi.org/10.1016/j.cedpsych.2020.101860
3. Henderlong, J., & Lepper, M. R. (2002). *The effects of praise on children's intrinsic motivation: A review and synthesis*. Psychological Bulletin, 128(5), 774–795. DOI: https://doi.org/10.1037/0033-2909.128.5.774
4. Deci, E. L., Koestner, R., & Ryan, R. M. (2001). *Extrinsic Rewards and Intrinsic Motivation in Education: Reconsidered Once Again*. Review of Educational Research, 71(1). DOI: https://doi.org/10.3102/00346543071001001
5. Diaconu-Gherasim, L. R. et al. (2024). *A Meta-Analysis of the Relations Between Achievement Goals and Internalizing Problems*. Educational Psychology Review, 36, 109. DOI: https://doi.org/10.1007/s10648-024-09943-5
6. Burnley, A., St Clair, M., Bedford, R., Wren, Y., & Dack, C. (2023). *Understanding the prevalence and manifestation of anxiety and other socio-emotional and behavioural difficulties in children with Developmental Language Disorder*. Journal of Neurodevelopmental Disorders, 15, 17. DOI: https://doi.org/10.1186/s11689-023-09486-w
7. Mateus-Moreno, A., Guirado-Moreno, J.-L., López-Penadés, R., Aguilar-Mediavilla, E., & Adrover-Roig, D. (2026). *Emotion regulation in children and adolescents with developmental language disorder: A systematic review and meta-analysis*. Child Development. DOI: https://doi.org/10.1093/chidev/aacag141
8. McGregor, K. K. et al. (2023). *Abilities and Disabilities Among Children With Developmental Language Disorder*. Language, Speech, and Hearing Services in Schools, 54(3), 927–951. DOI: https://doi.org/10.1044/2023_LSHSS-22-00070
9. *Examining the contribution of motivation in the job search of youth with developmental language disorder*. PubMed PMID 36762259: https://pubmed.ncbi.nlm.nih.gov/36762259/
10. Lloyd-Esenkaya, V., Russell, A. J., & St Clair, M. C. (2020). *What Are the Peer Interaction Strengths and Difficulties in Children with Developmental Language Disorder? A Systematic Review*. International Journal of Environmental Research and Public Health, 17(9), 3140. DOI: https://doi.org/10.3390/ijerph17093140

---

## 29. Auditoría de coherencia rc1

La consolidación rc1 realizó explícitamente las siguientes correcciones sobre el borrador y los bloques de análisis:

### 29.1 Se evita automatizar significado humano débil

Se retira la regla automática de Creciendo basada solo en cantidad de grabaciones.

### 29.2 Se separa dato de interpretación

“Menos pistas” se registra como **progreso personal**, no como prueba automática de autonomía.

### 29.3 Se fortalece comparabilidad

Récord Detectives requiere estructura equivalente y una referencia de otra historia para reducir efecto memoria.

### 29.4 Frecuencia deja de ser dogma

`7 días / 2 diarios` pasa a ser configuración inicial revisable.

### 29.5 Se incorpora dependencia de fuentes

Un Récord puede depender de más de un registro; su trazabilidad no se reduce a una sola sesión.

### 29.6 Se explicita la frontera de seguridad

La UI no autoriza por sí sola una escritura automática.

### 29.7 Se añade protección frente a dependencia de recompensas

El sistema debe poder disminuir intensidad si la recompensa comienza a desplazar la motivación.

### 29.8 Se diferencia lo aprobado de lo futuro

Reto cooperativo y Semilla/Brote/Árbol permanecen como fases posteriores sin bloquear A1/A2.

---

## 30. Declaración de diseño

> **Recompensas v1 no premiará obediencia ni perfección. Hará visible el crecimiento real.**
>
> Reconocerá decisiones, estrategias, esfuerzo útil, progreso, autonomía cuando pueda sostenerse, perseverancia, curiosidad y vínculos significativos.
>
> Las Guacamayas conservarán momentos especiales. Los Récords Personales mostrarán que uno puede superarse a sí mismo. Lía pondrá palabras breves a hechos observables. La familia aportará el significado humano que ningún algoritmo puede conocer por completo.
>
> La recompensa nunca será la razón principal para aprender.
>
> **Aprender, descubrir, poder hacer más y construir una vida propia siguen siendo la verdadera aventura.**
