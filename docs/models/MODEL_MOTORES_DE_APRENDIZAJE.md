# ⚙️ Motores de Aprendizaje
## 🌈 Modelo conceptual de Academia Gloria Valentina

> **Un motor aporta la experiencia. El contenido le da vida. La Academia conecta ambos con el camino del alumno.**

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md` |
| **Código documental** | `MODEL-MOTORES_DE_APRENDIZAJE` |
| **Versión** | 0.4 |
| **Estado** | Activo |
| **Fecha** | 21/08/2026 |
| **Última actualización** | 03/09/2026 |
| **Propietario** | Modelos de Aprendizaje |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Modelo conceptual compartido de motores, contenido, experiencia, sesiones, evidencia, análisis e integración de experiencias de aprendizaje |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Gobierna:** propósito y principios humanos. |
| `docs/vision/01_PRINCIPIOS_PEDAGOGICOS.md` | **Gobierna:** principios pedagógicos generales. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna:** dominios de contenido, experiencias, evidencias, acompañamiento y progreso. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Norma el dominio académico:** incorporación de Temas, sesiones y evidencia. |
| `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` | **Implementa:** relación funcional con Misiones/evidencias. |
| `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md` | **Complementa:** consulta histórica de experiencias. |
| `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` | **Complementa:** consumo transversal de evidencias para análisis y fortalecimiento. |
| `compartido/js/sesiones-academicas.js` | **Implementa:** contrato compartido `sesion-academica-v1` para el dominio académico actual. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 0.4 | 03/09/2026 | Product Owner + AI Collaborator | Sincroniza el modelo con el producto real: el Estudio Académico deja de ser solo conceptual y dispone de contrato compartido `sesion-academica-v1`, evidencia por referencia, histórico de solo lectura, refuerzo académico y consumo por Análisis Educativo. Formaliza que todo nuevo Tema de 6.º debe producir evidencia reutilizable aun en acceso libre. Incorpora Persona Activa, Vista previa sin escritura, separación `Sesión → Evidencia de Misión`, y ciclo `Evidencia → Análisis → Fortalecimiento`. Actualiza el estado de Semillas/Creciendo por Dentro como experiencia real sin forzar una abstracción técnica única. |
| 0.3 | 21/08/2026 | Product Owner + AI Collaborator | Incorpora conceptualmente el Motor de Estudio Académico para 6.º, la separación Sesión Académica / Evidencia de Misión, “finalización no equivale a dominio” y Datos → Observaciones → Insumos → Acciones. |
| 0.2 | 2026 | Product Owner + AI Collaborator | Revisión de Detectives/Lectura, principio de Semillas, flujos libre/Misión, evidencias, servicios comunes y criterios de evolución. |
| 0.1 | 2026 | Product Owner + AI Collaborator | Primera identificación del concepto de Motor de Aprendizaje. |

---

## 🎯 1. Propósito

Este documento define el **lenguaje conceptual común** utilizado para comprender experiencias de aprendizaje repetibles de la Academia.

Busca responder:

1. ¿Qué es un Motor de Aprendizaje?
2. ¿Qué pertenece al motor y qué pertenece al contenido?
3. ¿Qué debe poder compartirse?
4. ¿Qué diferencias deben preservarse?
5. ¿Cómo se registra una experiencia?
6. ¿Cómo se relaciona con Persona Activa y Misiones?
7. ¿Cómo se revisa históricamente sin reejecutar?
8. ¿Cómo se transforma la evidencia en acompañamiento?
9. ¿Cómo evitar una arquitectura diferente por cada Tema?
10. ¿Cómo permitir que nuevos contenidos se incorporen con cada vez menos intervención técnica?

Este documento sigue siendo **modelo**, no estándar obligatorio.

Las reglas normativas pertenecen a los estándares/especificaciones propietarias.

---

## 🧱 2. Definición

Un **Motor de Aprendizaje** es un conjunto reutilizable de comportamientos capaz de presentar, acompañar, registrar y cerrar una familia de experiencias cuyo contenido concreto puede variar.

```text
MOTOR
= comportamiento repetible

CONTENIDO
= qué se aprende / practica / vive

EXPERIENCIA
= ejecución concreta por una Persona

REGISTRO
= qué ocurrió realmente

INTEGRACIÓN
= relación con Academia, Misiones, histórico y acompañamiento
```

Ejemplos conceptuales:

```text
Detectives + historias       → Aventuras Matemáticas
Lectura + historias          → Sesiones de lectura
Creciendo + Semillas         → Experiencias personales
Estudio Académico + Tema     → Comprensión/práctica/comprobación curricular
```

---

## 🧭 3. Principio central

> **Compartir comportamiento cuando es realmente común. Preservar contenido y variación pedagógica cuando son específicos.**

El objetivo no es que todas las experiencias se vean iguales.

El objetivo es evitar que cada contenido vuelva a resolver por su cuenta:

- identidad;
- Persona Activa;
- contexto de Misión;
- navegación/retorno;
- persistencia;
- evidencia;
- histórico;
- modos de consulta;
- permisos;
- análisis compartido.

No todo tiene que resolverse mediante JSON ni mediante una sola clase/librería.

La reutilización puede estar en:

- datos;
- servicios;
- contratos;
- componentes;
- patrones;
- comportamiento.

---

## 🚫 4. Qué no es un Motor

No es automáticamente:

- una pantalla;
- un archivo JS grande;
- un JSON;
- una colección Firestore;
- un módulo completo;
- una abstracción obligatoria para todas las páginas;
- una excusa para generalizar antes de disponer de casos reales.

Un motor tiene sentido cuando existe suficiente combinación de:

- mecánica repetible;
- contenido variable;
- crecimiento esperado;
- necesidad de historial/evidencia;
- integración transversal;
- beneficio real de mantenimiento.

---

## 🧩 5. Componentes conceptuales

El modelo utiliza seis componentes:

```text
1. Motor
2. Contenido
3. Configuración
4. Experiencia
5. Registro
6. Integración
```

### 5.1 Motor

Puede encargarse de:

- cargar/validar contenido;
- iniciar estado;
- navegar entre pasos;
- gestionar interacción;
- proporcionar apoyos;
- recopilar resultados;
- cerrar;
- producir registro;
- conectarse con servicios comunes.

### 5.2 Contenido

Describe la experiencia específica:

- historia;
- Tema;
- situación;
- textos;
- preguntas;
- ejemplos;
- respuestas;
- apoyos;
- imágenes;
- audio/vídeo;
- recursos;
- cierre.

### 5.3 Configuración

Permite variaciones sin reescribir lógica cuando tenga sentido:

- nivel;
- duración;
- dificultad;
- apoyos;
- filtros;
- intentos;
- grabación;
- visibilidad;
- recursos habilitados;
- preferencias por Persona.

No se crea un sistema general de configuración antes de una necesidad real.

### 5.4 Experiencia

Es una ejecución concreta:

```text
Persona: Gloria
Motor: Detectives
Contenido: historia X
Origen: Misión / acceso libre
Fecha: ...
```

### 5.5 Registro

Conserva únicamente datos que puedan ayudar a:

- revisar;
- comprender;
- continuar;
- fortalecer;
- auditar;
- medir evolución con prudencia.

### 5.6 Integración

Conecta la experiencia con:

- Persona Activa;
- Mi Camino;
- Gestión de Misiones;
- evidencias;
- histórico;
- Análisis Educativo;
- Reconocimientos cuando aplique;
- familia/profesionales autorizados.

---

## 👤 6. Persona Activa

Una experiencia pertenece a la **Persona Activa**, no necesariamente al UID autenticado que la acompaña.

Conceptualmente:

```text
usuario autenticado
→ ContextoUsuario
→ Persona Activa
→ experiencia
→ sesión/evidencia
```

Los motores no deben inventar su propia resolución de identidad.

Campos conceptuales útiles:

- Persona/alumno propietario;
- actor que acompañó o ejecutó la acción técnica;
- Misión de origen cuando existe.

---

## ▶️ 7. Dos formas de entrada

### 7.1 Acceso libre

```text
Curso / Mi Universo / menú
→ experiencia
→ sesión
→ histórico/análisis posible
```

**Importante:** acceso libre no significa “sin evidencia”.

En el dominio académico de 6.º, una ejecución normal debe producir sesión académica reutilizable aunque no exista Misión.

### 7.2 Acceso desde Misión

```text
Mi Camino
→ Misión
→ experiencia
→ sesión propietaria
→ evidencia de Misión por referencia
→ revisión familiar
```

La Misión no debe obligar al Motor a duplicar su sesión completa.

---

## 📎 8. Sesión y Evidencia de Misión

### 8.1 Sesión

Registra **qué ocurrió en la experiencia**.

Puede existir sin Misión.

### 8.2 Evidencia de Misión

Registra **que una experiencia concreta está vinculada a una Misión**.

Debe preferir:

```text
misionId
+ sesionId
+ resumen mínimo
+ destino de revisión
```

antes que copiar toda la sesión.

### 8.3 Relación

```text
Experiencia
→ Sesión

Misión ─────────────┐
                    ↓
             Evidencia de Misión
                    ↓
              referencia Sesión
```

### 8.4 Beneficio

Esta separación permite:

- acceso libre con histórico;
- Misión sin duplicación;
- borrado/control más seguro;
- análisis transversal;
- múltiples vistas del mismo hecho.

---

## 👁️ 9. Vista previa e histórico

### Vista previa

> **No persiste sesión, evidencia, progreso ni reconocimiento.**

Sirve para revisar contenido/experiencia antes de una ejecución real.

### Histórico / Ver trabajo

> **Solo lectura.**

No:

- reinicia actividad;
- registra otra sesión;
- cambia intentos;
- altera estadísticas;
- completa una Misión.

La resolución histórica reutiliza visores especializados cuando existen y un visor general en el resto.

---

## ⚙️ 10. Motores/experiencias identificadas

### 10.1 Detectives

Fortalezas observadas:

- catálogo de historias;
- contenido externo;
- nivel/tema/tipo;
- pistas;
- pasos;
- intentos;
- sesión independiente;
- historial;
- integración con Misiones;
- refuerzo por señales repetidas;
- fuente de Reconocimientos de Lía de alta confianza.

Especialmente útil como referencia de:

```text
contenido configurable + comportamiento repetible + datos comparables
```

### 10.2 Mi Rincón de Lectura

Fortalezas:

- catálogo;
- lectura;
- grabación;
- reproducción;
- transcripción/análisis;
- Palabras para Crecer;
- comprensión;
- observación familiar;
- evidencias;
- visor histórico rico;
- refuerzo de pronunciación.

Limitación relevante actual:

- parte del histórico se organiza por historia y no constituye siempre una secuencia inmutable de sesiones comparable a Detectives.

Por eso no deben generalizarse automáticamente Récords o conclusiones que el dato no puede sostener.

### 10.3 Creciendo por Dentro / Semillas

La experiencia ya existe y se utiliza realmente.

Incluye:

- catálogo de Semillas;
- situaciones;
- preguntas/reflexiones;
- frase/cierre;
- grabación opcional;
- persistencia de sesión;
- integración con Misiones;
- consulta histórica.

El concepto **Motor de Semillas** continúa siendo útil para separar contenido de comportamiento, pero el modelo no exige reconstruir el módulo únicamente para demostrar una abstracción común.

Particularidad:

> sus datos pueden tener significado personal sensible y no deben transformarse automáticamente en inferencias psicológicas.

### 10.4 Estudio Académico

#### Estado actual

✅ **Patrón materialmente implementado y validado en 6.º de Primaria.**

No existe todavía obligación de que todos los futuros Temas utilicen un único renderer universal.

Lo común actualmente validado está principalmente en:

- jerarquía `Curso → Asignatura → Tema`;
- contrato `sesion-academica-v1`;
- Persona Activa;
- modos aprendizaje / Vista previa;
- evidencia de Misión por referencia;
- visor histórico;
- mapa/resumen formativo;
- refuerzo desde resultados;
- Análisis Educativo.

#### Primeros casos reales

- Puente de 5.º a 6.º;
- Fracciones.

#### Propósito

Transformar un Tema escolar real en una experiencia que pueda:

```text
Comprender
→ practicar
→ comprobar
→ registrar
→ revisar
→ analizar
→ fortalecer
```

#### Variación legítima

Un Tema puede necesitar:

- mapa;
- gráfico;
- línea del tiempo;
- simulación;
- vídeo;
- audio;
- fórmula;
- escritura;
- producción oral;
- práctica paso a paso.

El modelo común **no obliga a páginas idénticas**.

---

## 📘 11. Contrato académico actual · `sesion-academica-v1`

El contrato compartido actual permite registrar, entre otros:

```text
contrato = sesion-academica-v1
modo = aprendizaje
personaId
alumnoUserId
actorUserId
actividadId
tituloActividad
versionActividad
cursoReferencia
materia
tema
origen
misionId?
inicio/fin
tiempoActivoSegundos
tiempoActivoPorSegmento
conceptosTrabajados[]
variantes[]
respuestas[]
resumen{}
retroalimentacion{}
```

El modelo exacto puede evolucionar; estos campos describen el contrato real al 03/09/2026.

### Requisitos mínimos

Una sesión académica exige actualmente:

- actividad;
- curso;
- materia;
- Tema.

### Vista previa

`modo = vista_previa` devuelve sin guardar.

### Misión

Si existe `misionId` y la Misión es `repaso_academico`, se registra evidencia utilizando la API normal de Misiones.

Si el enlace de evidencia falla pero la sesión ya fue persistida, no se falsea que la sesión no existió.

---

## 🌱 12. Todo nuevo Tema de 6.º nace con evidencia

Esta es una decisión transversal consolidada.

> **Todo Tema nuevo de 6.º debe producir una sesión académica estructurada durante una ejecución normal de aprendizaje, exista o no una Misión.**

La evidencia debe permitir, al menos, responder razonablemente:

- qué Tema/actividad se trabajó;
- qué conceptos/focos participaron;
- qué respuestas/resultados se observaron;
- qué apoyos/variantes fueron relevantes cuando el motor los registra;
- qué resumen produjo la experiencia;
- cómo puede revisarse después.

No significa guardar cada clic.

Significa producir **señales educativas reutilizables**.

### Reutilización obligatoria antes de un esquema privado

Un Tema no debe inventar:

```text
miPropiaColeccionDeResultados
miPropioFormatoDeEvidencia
miPropioVisorHistorico
```

si el contrato académico compartido puede representarlo.

Si un nuevo Tema necesita datos que el contrato no expresa, primero se analiza una **evolución compatible del contrato común**.

---

## 🧠 13. Identificadores estables de aprendizaje

Para que varias sesiones sean analizables, las señales deben evitar depender únicamente de texto libre.

Cuando la actividad tenga múltiples objetivos, conviene utilizar identificadores estables como:

```text
bloqueId
conceptoId
focoId
preguntaId
varianteId
```

según corresponda.

Esto permite relacionar ejecuciones sin obligar a que todas las actividades tengan la misma estructura.

Principio:

> **Persistir significado suficiente para poder comparar, no acoplar todos los Temas a una interfaz idéntica.**

---

## 📊 14. Evidencia → Análisis → Fortalecimiento

El modelo actual ya no termina en “guardar historial”.

Ciclo consolidado:

```text
EXPERIENCIA
    ↓
SESIÓN / EVIDENCIA
    ↓
DATOS OBSERVABLES
    ↓
ANÁLISIS PRUDENTE
    ↓
FORTALEZAS / ASPECTOS A REFORZAR
    ↓
PROPUESTA DE ACTUACIÓN
    ↓
DECISIÓN FAMILIAR
    ↓
MISIÓN / PRÁCTICA / CONTINUIDAD
    ↓
NUEVA EXPERIENCIA
    ↓
NUEVA EVIDENCIA
```

### Separación de responsabilidades

```text
Motor
→ produce datos fiables

Análisis Educativo
→ interpreta varias evidencias con reglas prudentes

Familia
→ decide acciones sensibles

Misión
→ orquesta una nueva oportunidad
```

El Motor no necesita incorporar todo el algoritmo longitudinal dentro de su propia página.

---

## 🔎 15. Datos → Observaciones → Insumos → Acciones

Se conserva el modelo original de cuatro niveles:

### Datos

Hechos registrados.

Ejemplos:

- respuesta;
- intento;
- pista;
- palabra practicada;
- concepto;
- tiempo activo;
- grabación autorizada.

### Observaciones

Interpretación limitada por una regla definida.

Ejemplo:

> En esta sesión, dos preguntas del mismo bloque fueron incorrectas.

### Insumos

Información útil para acompañar.

Ejemplo:

> Conviene volver a practicar ese bloque con otros ejemplos.

### Acciones

Continuidad concreta.

Ejemplo:

> Preparar una Misión breve de refuerzo.

Una observación aislada no se convierte en diagnóstico ni atributo permanente.

---

## 🧪 16. Ejemplos actuales

### Detectives

```text
Dato:
misma dificultad aparece en varias historias.

Observación:
la señal se repite en contextos distintos.

Insumo:
conviene practicar ese foco.

Acción:
propuesta de Misión de Detectives.
```

La prioridad puede utilizar intentos adicionales sin confundirlos con pistas.

### Estudio Académico

```text
Dato:
varias respuestas de un bloque resultan incorrectas.

Observación:
la señal se mantiene en la ventana de sesiones relevante.

Insumo:
el bloque puede beneficiarse de práctica adicional.

Acción:
preparar Repaso Académico sobre ese foco.
```

### Lectura / pronunciación

```text
Dato:
palabra queda en práctica o necesita varios intentos válidos.

Observación:
conviene seguir practicando esa palabra.

Acción:
proponer Misión de pronunciación.
```

---

## 🗂️ 17. Responsabilidades del Motor

Un Motor puede asumir:

### Inicialización

- resolver contexto;
- Persona Activa;
- origen;
- Misión;
- contenido/configuración;
- modo.

### Presentación

- experiencia inicial;
- contenido;
- recursos;
- apoyos;
- accesibilidad.

### Interacción

- selecciones;
- texto;
- voz cuando aplica;
- intentos;
- ayudas;
- feedback.

### Registro

- sesión;
- datos útiles;
- resultado;
- relación con Misión;
- revisión histórica.

### Cierre

- resumen;
- continuidad;
- evidencia cuando corresponde;
- estado de Misión según contrato.

No es obligatorio que una única clase JS ejecute todas estas responsabilidades.

---

## 📚 18. Responsabilidades del contenido

El contenido puede definir:

- objetivos;
- texto/situación/Tema;
- explicaciones;
- preguntas;
- opciones;
- ejemplos;
- recursos;
- ayudas;
- criterios específicos;
- metadatos;
- bloques/conceptos;
- mensajes pedagógicos.

No debería resolver directamente:

- autenticación;
- Persona Activa;
- permisos;
- Firestore Rules;
- navegación global;
- APIs de Misiones;
- histórico común.

---

## 🧰 19. Servicios compartidos

Los motores deben reutilizar, cuando aplique:

- autenticación;
- `ContextoUsuario`;
- navegación global;
- panel de usuario;
- Misiones/evidencias;
- sesiones académicas;
- histórico/Ver trabajo;
- Lía;
- lectores/reproductores compartidos;
- Firestore Rules canónicas;
- identidad visual/componentes.

La pregunta correcta es:

> **¿Qué necesita ser específico de esta experiencia?**

no:

> **¿Qué puedo volver a construir localmente?**

---

## 🗣️ 20. Voz

La voz puede ser una capacidad transversal para Lectura, Creciendo y futuros Temas.

Posibles servicios comunes:

- permisos;
- grabar/detener;
- duración;
- reproducción;
- almacenamiento;
- transcripción;
- gestión de fallos.

La extracción de un servicio compartido debe basarse en reutilización real, no en previsión.

Uso educativo permitido:

- practicar lectura/expresión;
- comparar intentos válidos;
- apoyar pronunciación;
- revisar fluidez;
- ofrecer práctica.

Requiere especial cautela:

- inferencia emocional;
- diagnóstico;
- biometría;
- clasificación psicológica.

> La Academia puede analizar la voz para apoyar una habilidad; no para diagnosticar a la Persona.

---

## 🪜 21. Nivel de apoyo

El nivel de apoyo representa **cuánta ayuda ofrece una experiencia**.

No significa inteligencia ni capacidad.

Puede incluir:

```text
más guía
→ ayudas visibles
→ pistas opcionales
→ mayor autonomía
```

Debe poder variar según experiencia y contexto sin convertirse en una etiqueta del alumno.

---

## 🧭 22. Integración con Misiones

Conceptualmente la Misión orquesta una intención y el Motor ejecuta la experiencia.

El producto actual utiliza principalmente una Misión como unidad operativa visible, aunque el modelo conserva la posibilidad de estructuras compuestas cuando exista una necesidad real.

Contrato mínimo conceptual:

### Hacia la experiencia

```text
misionId?
actividadId / filtros
criterio aplicable
modo
ruta de retorno
Persona Activa
```

### Desde la experiencia

```text
sesionId
actividad realizada
resultado
resumen/evidencia
estado de cumplimiento
destino de revisión
```

No se formaliza aquí una interfaz técnica universal; las APIs propietarias son la fuente de implementación.

---

## 🏅 23. Relación con Reconocimientos

Un Motor puede producir **hechos candidatos**, pero no todo hecho debe generar recompensa.

Ejemplos:

- Detectives produce datos suficientes para algunas reglas de Lía;
- una Misión completada puede recibir Reconocimiento humano;
- un futuro Récord Personal exige comparabilidad real;
- experiencias sensibles pueden requerir significado humano.

La capa de Reconocimientos debe consumir evidencia sin obligar al Motor a convertirse en sistema de premios.

---

## 🤖 24. Rol de IA

La IA puede tener dos papeles diferentes.

### 24.1 AI Collaborator de desarrollo/contenido

Especialmente relevante para 6.º:

```text
material escolar
+ curso
+ materia
+ Tema
+ notas opcionales
→ analizar
→ decidir ubicación
→ reutilizar arquitectura
→ construir contenido
→ integrar evidencia
→ validar
→ entregar para prueba
```

Este papel **ya está aprobado como procedimiento de incorporación curricular**.

No significa que una IA autónoma modifique producción sin revisión.

### 24.2 IA visible dentro del producto

Puede, en el futuro:

- reformular;
- adaptar apoyos;
- resumir;
- sugerir continuidad;
- apoyar a Lía.

Solo con límites, privacidad, fuentes confiables y control adecuado.

La IA no debe:

- inventar historial;
- convertir inferencias en hechos;
- diagnosticar;
- decidir autónomamente intervenciones sensibles.

---

## 📘 25. Incorporación de nuevos Temas académicos

El Motor Académico debe hacer posible que añadir contenido sea cada vez menos técnico.

Entrada familiar deseada:

```text
Documento oficial del colegio
+ Curso
+ Materia
+ nombre del Tema
+ notas/comentarios opcionales
```

La AI Collaborator debe resolver internamente:

```text
analizar fuente
→ localizar Curso / Asignatura / Tema
→ crear carpetas solo si son necesarias
→ reutilizar portales/componentes/contratos
→ preparar contenido académico
→ preparar práctica/comprobación
→ integrar sesion-academica-v1
→ garantizar histórico
→ garantizar señales para Análisis Educativo
→ garantizar capacidad de fortalecimiento
→ auditar
→ YA PUEDES PROBAR
```

Tras observaciones opcionales:

```text
ajustar
→ validar
→ aprobación
→ cierre definitivo
```

Este ciclo pertenece normativamente a `STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`; aquí se documenta su encaje conceptual con los Motores.

---

## 🔄 26. Reutilización

Puede existir en cuatro niveles:

### Funcional

- abrir;
- continuar;
- finalizar;
- revisar;
- filtrar;
- registrar.

### Visual

- tarjetas;
- paneles;
- filtros;
- estados vacíos;
- grabación/reproductores;
- layouts académicos.

### Servicios

- identidad;
- navegación;
- persistencia;
- Misiones;
- evidencia;
- histórico;
- análisis.

### Patrones

- acceso libre;
- acceso por Misión;
- Vista previa;
- consulta histórica;
- refuerzo;
- errores comprensibles.

No reutilizar por obligación cuando las necesidades sean realmente diferentes.

---

## 🔐 27. Seguridad y sensibilidad

Seguridad es transversal.

Un Motor no debe definir reglas aisladas que contradigan:

- Persona Activa;
- roles;
- relaciones;
- nivel efectivo;
- Firestore Rules canónicas.

Especial atención para:

- grabaciones;
- respuestas personales;
- observaciones;
- datos académicos;
- acceso profesional.

La UI no constituye frontera de seguridad.

---

## 📈 28. Estado de validación del modelo al 03/09/2026

| Capacidad conceptual | Evidencia de producto | Estado |
|---|---|:---:|
| Separar contenido/comportamiento | Detectives, Lectura, Semillas, catálogos académicos | ✅ Validado |
| Acceso libre y desde Misión | Varios motores | ✅ Validado |
| Persona Activa | Misiones, Detectives, académico, Reconocimientos | ✅ Validado |
| Sesión propietaria | Detectives, académico, Creciendo, Lectura según motor | ✅ Validado |
| Evidencia por referencia | Repaso Académico y otros motores integrados | ✅ Validado |
| Vista previa sin persistencia | Estudio Académico | ✅ Validado |
| Histórico solo lectura | `👁️ Ver trabajo`, Resultado Académico, Detectives | ✅ Validado |
| Evidencia → refuerzo | Detectives, académico, pronunciación | ✅ V1 validado |
| Análisis transversal de evidencias | Análisis Educativo | ✅ V1 validado |
| Incorporación curricular de mínima intervención | Estándar aprobado | 🟡 Procedimiento listo; validar repetidamente con nuevos Temas |
| Motor universal único para todos los Temas | — | ⛔ No requerido |
| Servicio común único de voz | — | ⏳ Solo si reutilización real lo justifica |

---

## 🚦 29. Evolución del modelo

La versión 0.4 ya dispone de más validación real que la 0.3, pero **no necesita convertirse todavía en 1.0**.

Para una futura 1.0 convendría observar varios Temas reales de 6.º de distintas materias y confirmar qué partes del patrón académico son verdaderamente comunes.

Candidatos a validación:

- otro Tema de Matemáticas;
- Science;
- Lengua;
- contenido con recursos visuales diferentes;
- Tema donde la evaluación no sea de selección simple.

Solo entonces decidir si alguna parte del modelo merece elevarse a estándar técnico más rígido.

---

## ✅ 30. Criterios para un nuevo Motor

Antes de crear un Motor separado:

1. ¿Existe una mecánica repetible?
2. ¿Habrá múltiples contenidos?
3. ¿Se espera crecimiento real?
4. ¿Necesita historial/evidencia?
5. ¿Se integrará con Misiones?
6. ¿Genera datos con utilidad?
7. ¿Los servicios existentes no bastan?
8. ¿La abstracción reduce realmente duplicación?
9. ¿Preserva diferencias pedagógicas?
10. ¿Estamos evitando sobrearquitectura?

Si no se justifica, usar una solución más simple dentro de la arquitectura existente.

---

## 📌 31. Decisiones conceptuales consolidadas

1. La Academia reconoce el concepto Motor de Aprendizaje.
2. El motor separa comportamiento común de contenido variable.
3. Detectives, Lectura, Creciendo/Semillas y Estudio Académico son casos principales de referencia.
4. No todo módulo debe convertirse en un Motor abstraído.
5. Persona Activa es transversal.
6. Acceso libre puede producir historial/evidencia.
7. Sesión y Evidencia de Misión son conceptos diferentes.
8. Una Misión referencia la sesión antes de duplicarla.
9. Vista previa no persiste.
10. Histórico es solo lectura.
11. Finalizar no equivale a dominar.
12. Datos persistidos deben tener utilidad educativa/familiar.
13. Datos → Observaciones → Insumos → Acciones sigue siendo el ciclo conceptual.
14. El Análisis Educativo puede consumir varias fuentes sin mudarse dentro de cada Motor.
15. Las acciones sensibles permanecen bajo control humano.
16. El Motor Académico está materialmente validado en Puente/Fracciones mediante contratos compartidos, sin obligar a un renderer universal.
17. Todo nuevo Tema de 6.º debe producir evidencia académica reutilizable.
18. Los Temas deben utilizar identificadores estables de concepto/foco cuando sean necesarios para análisis longitudinal.
19. El contrato `sesion-academica-v1` se reutiliza antes de crear esquemas privados.
20. Si el contrato queda corto, se estudia evolución compatible antes de crear persistencia paralela.
21. El ciclo académico incluye evidencia → análisis → fortalecimiento.
22. La incorporación curricular debe requerir intervención mínima de la familia.
23. La AI Collaborator resuelve complejidad técnica repetitiva bajo estándares aprobados.
24. Reutilización visual/funcional no debe borrar las diferencias legítimas entre materias y Motores.
25. La voz puede apoyar habilidades; no debe usarse para diagnosticar.
26. Reconocimientos consumen hechos/evidencia; no deben contaminar la lógica pedagógica del Motor.
27. El modelo permanece conceptual y evolutivo en v0.4.

---

## ❓ 32. Preguntas abiertas reales

Se eliminan preguntas que ya fueron resueltas por implementación.

Permanecen abiertas:

1. ¿Qué campos adicionales necesitará `sesion-academica-v1` al incorporar Science/Lengua y recursos diferentes?
2. ¿Qué taxonomía mínima de `bloque/concepto/foco` puede compartirse sin rigidizar materias distintas?
3. ¿Cuándo conviene extraer componentes académicos adicionales a infraestructura compartida?
4. ¿Qué futuros Motores requieren comparación longitudinal válida?
5. ¿Qué servicio de voz merece compartirse después de observar más casos?
6. ¿Qué preferencias por Persona deben influir en los motores (p. ej. velocidad de voz)?
7. ¿Qué permisos profesionales adicionales serán necesarios cuando exista uso real?
8. ¿Qué comportamiento de Lía puede consolidarse como verdaderamente común?

Las respuestas deben venir de producto real, no de documentos hipotéticos.

---

## 📖 33. Glosario

### Motor de Aprendizaje

Comportamiento reutilizable para una familia de experiencias.

### Contenido configurable

Información que define la experiencia concreta sin duplicar comportamiento compartido.

### Experiencia

Ejecución concreta por una Persona en un contexto determinado.

### Sesión

Registro propietario de una ejecución real.

### Sesión Académica

Registro `sesion-academica-v1` (o evolución compatible) de una ejecución de estudio/práctica curricular.

### Evidencia de Misión

Registro que vincula una Misión con una sesión/resultado sin necesidad de duplicarlo.

### Vista previa

Modo no persistente utilizado para revisar la experiencia sin contaminar historial.

### Histórico / consulta

Visualización de solo lectura de una ejecución ya registrada.

### Observación

Interpretación educativa limitada y sustentada en datos; no diagnóstico.

### Insumo

Información que puede ayudar a decidir continuidad.

### Acción

Próximo paso concreto: práctica, Misión, revisión u otro acompañamiento.

### Nivel de apoyo

Cantidad/tipo de ayuda de una experiencia; no representa inteligencia.

### Persona Activa

Persona sobre la que opera el contexto educativo aunque el usuario autenticado sea otro autorizado.

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Motor Académico** | Patrón real y validado en 6.º; no renderer universal obligatorio. |
| **Evidencia** | Todo Tema nuevo de 6.º genera sesión estructurada incluso en acceso libre. |
| **Misión** | Añade evidencia por referencia; no sustituye la sesión del Motor. |
| **Consulta** | Vista previa sin escritura; histórico de solo lectura. |
| **Análisis** | Evidencia puede alimentar Análisis Educativo y fortalecimiento transversal. |
| **Escalado curricular** | Material + curso + materia + Tema + notas opcionales → AI Collaborator resuelve integración conforme a estándares. |
| **Arquitectura** | Reutilizar lo común y preservar variación pedagógica legítima. |
| **Estado** | Modelo conceptual activo · v0.4 · sincronizado al 03/09/2026. |

---

Un Motor de Aprendizaje no existe para demostrar una arquitectura.

Existe para hacer posible que la Academia crezca sin perder coherencia.

El motor aporta la experiencia.

El contenido le da vida.

El historial permite aprender de lo ocurrido.

Y la Academia utiliza ese aprendizaje para acompañar cada vez mejor:

**no para juzgar, comparar ni etiquetar, sino para ayudar al alumno a continuar.** 🌱💜