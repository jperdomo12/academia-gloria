###############################################################################
#
# Academia Gloria Valentina
#
# AUDIT-MOTORES_APRENDIZAJE-v1.0.md
#
# Auditoría técnica breve
#
# Módulos revisados:
# - Aventuras Matemáticas — Detectives
# - Mi Rincón de Lectura
#
###############################################################################

# 🔎 Auditoría técnica de Motores de Aprendizaje

## Detectives y Mi Rincón de Lectura

**Versión:** 1.1  
**Estado:** Auditoría completada y ajustada con revisión de `compartido/`  
**Ubicación propuesta:** `docs/project/AUDIT-MOTORES_APRENDIZAJE-v1.0.md`  
**Fecha:** 05/08/2026  
**Modelo relacionado:** `docs/models/MODEL-MOTORES_DE_APRENDIZAJE.md`  
**Producto relacionado:** `docs/product/SPEC-CRECIENDO_POR_DENTRO.md`

## Historial de versiones

### Versión 1.1

Incorpora la revisión de la carpeta `compartido/` y las decisiones aprobadas sobre Misiones y Semillas:

- confirmación del modelo técnico actual de Misiones;
- una Misión visible corresponde actualmente a un documento de Tarea;
- cada Misión utiliza un único módulo, tipo de evidencia y criterio;
- una Misión puede exigir varias evidencias del mismo tipo;
- confirmación de que `tareas.registrarEvidencia` y `evidencias.registrarParaMision` usan la misma implementación;
- definición del comportamiento para Misiones de Semillas;
- cantidad objetivo configurable;
- selección opcional de Semillas concretas;
- selección libre del alumno cuando no se indican Semillas;
- criterio de unicidad para evitar que una misma Semilla cuente dos veces por accidente;
- reconocimiento de las Misiones heterogéneas como evolución futura, no necesaria para el piloto.

### Versión 1.0

Primera auditoría técnica breve de Detectives y Mi Rincón de Lectura.

---

# 1. Propósito

Esta auditoría revisa brevemente la implementación actual de:

- **Aventuras Matemáticas — Detectives**;
- **Mi Rincón de Lectura**.

Su objetivo no es buscar defectos menores ni rediseñar estos módulos.

Su objetivo es identificar:

1. qué patrones ya existen;
2. qué capacidades son realmente reutilizables;
3. qué diferencias deben conservarse;
4. qué debe aprovechar el futuro Motor de Semillas;
5. qué no debe generalizarse todavía;
6. qué dependencias requieren revisión adicional.

La auditoría se realiza antes de diseñar e implementar el primer piloto de:

> **🌱 Aprendo a decir lo que siento**

---

# 2. Alcance y limitaciones

## 2.1 Carpetas revisadas

### Detectives

```text
detectives/
├── README-historias-detectives-v1.3.md
├── historia.html
├── historial.html
├── historias.json
└── index.html
```

### Mi Rincón de Lectura

```text
rincon-lectura/
├── historias.js
├── index.html
├── rincon-lectura-lia.css
└── rincon-lectura.js
```

## 2.2 Componentes compartidos revisados

La versión 1.1 incorpora la revisión de la carpeta:

```text
compartido/
```

Se revisaron especialmente:

```text
compartido/api/academia.js
compartido/js/celebracion.js
compartido/js/detectives-progreso.js
compartido/js/palabras-para-crecer.js
compartido/js/panel-usuario.js
compartido/js/perfil-usuario.js
compartido/firebase/firestore.rules
```

Esto permite confirmar:

- normalización actual de Tareas;
- criterio de cumplimiento;
- progreso;
- evidencias;
- deduplicación;
- relación técnica entre `misionId` y el documento de Tarea;
- equivalencia entre las dos fachadas de evidencias;
- servicios compartidos ya disponibles.

Todavía requieren análisis específico durante la implementación:

- estrategia definitiva de almacenamiento de audio;
- seguridad detallada para datos sensibles de Semillas;
- modelo futuro de Misiones con Tareas heterogéneas;
- posible extracción de un servicio común de grabación;
- posible normalización adicional de datos.

---

# 3. Resumen ejecutivo

## 3.1 Conclusión principal

Los dos módulos representan **motores distintos y complementarios**.

Ninguno debe sustituir al otro.

El Motor de Semillas deberá combinar:

### De Detectives

- contenido externo;
- catálogo configurable;
- filtros;
- flujo estructurado por etapas;
- selección contextual desde una misión;
- separación conceptual entre historia y ejecución.

### De Mi Rincón de Lectura

- presentación visual madura;
- grabación;
- transcripción;
- análisis;
- repetición;
- historial detallado;
- observaciones familiares;
- generación de insumos;
- integración profunda con evidencias de misión;
- acompañamiento contextual de Lía.

## 3.2 Recomendación

> **Semillas debe adoptar la estructura de contenidos de Detectives y la riqueza de interacción e historial de Mi Rincón de Lectura.**

No debe copiar completamente ninguno de los dos.

## 3.3 Hallazgo transversal

Ambos módulos ya utilizan un patrón común:

```text
Contexto
   ↓
Selección o asignación
   ↓
Experiencia
   ↓
Resultado
   ↓
Persistencia
   ↓
Evidencia de misión
   ↓
Historial
```

Sin embargo, ese patrón todavía está implementado de manera diferente en cada módulo.

La revisión de `compartido/api/academia.js` confirma además que el modelo actual es:

```text
Misión visible
      =
un documento en usuarios/{uid}/tareas/{tareaId}
      =
un módulo
      =
un tipo de evidencia
      =
una cantidad objetivo
      =
varias evidencias del mismo tipo
```

Antes de extraer servicios comunes conviene validar el tercer caso: **Semillas**.

---

# 4. Auditoría de Detectives

# 4.1 Arquitectura actual

Detectives concentra la mayor parte de:

- HTML;
- CSS;
- estado;
- flujo;
- filtros;
- validación;
- integración con Misiones;
- renderizado;
- retroalimentación.

en un único archivo:

```text
index.html
```

El archivo contiene aproximadamente 2.493 líneas.

El contenido principal está en:

```text
historias.json
```

El catálogo contiene actualmente 69 historias válidas en el archivo recibido.

También existen dos vistas independientes:

```text
historial.html
historia.html
```

Estas vistas consumen funciones compartidas de progreso y sesiones.

---

# 4.2 Contenido de Detectives

Cada historia utiliza una estructura consistente:

```text
id
titulo
texto
nivel
tema
tipo
comprension
descubrimiento
pasos
activo
```

Los pasos pueden incluir:

```text
pregunta
operacion
a
b
resultado
visual
```

La estructura permite:

- casos simples;
- casos compuestos;
- niveles;
- temas;
- comprensión previa;
- identificación de la pregunta;
- selección de operación;
- cálculo;
- apoyos visuales.

## Valor

La separación mediante `historias.json` es una fortaleza clara.

Permite incorporar o ajustar historias sin modificar el flujo principal, siempre que respeten el mismo esquema.

---

# 4.3 Carga del contenido

Detectives intenta cargar:

```javascript
fetch("./historias.json", { cache: "no-store" })
```

Sin embargo, `index.html` contiene además:

- `fallbackCases`;
- `additionalCases`.

La carga combina:

```text
historias.json
+
fallbackCases
+
additionalCases
```

y elimina duplicados mediante el identificador.

## Hallazgo

Existe duplicación significativa de contenido dentro del HTML.

Aunque el fallback protege frente a un fallo de carga, también provoca:

- crecimiento excesivo de `index.html`;
- dos posibles fuentes de contenido;
- riesgo de divergencia;
- mantenimiento más costoso;
- menor claridad sobre cuál es la fuente oficial.

## Recomendación

Para Semillas:

> **No duplicar el catálogo completo dentro del motor.**

Puede existir un contenido mínimo de recuperación, pero no una copia completa de `semillas.json`.

Para Detectives, en una futura mejora no bloqueante:

- conservar `historias.json` como fuente única;
- reducir el fallback a uno o dos casos básicos;
- mostrar un error claro cuando falle la carga.

---

# 4.4 Flujo funcional

El motor utiliza un estado interno con:

```text
selectedLevel
selectedTheme
selectedQuantity
challenges
challengeIndex
stage
stepIndex
attempts
completedOperations
simpleCompleted
compoundCompleted
caseStats
```

El flujo general es:

```text
Selector
   ↓
Nivel, tema y cantidad
   ↓
Historias seleccionadas
   ↓
Comprender
   ↓
Descubrir
   ↓
Elegir operación
   ↓
Resolver
   ↓
Celebrar
   ↓
Siguiente paso o historia
   ↓
Resumen
```

## Fortaleza

El flujo está muy claramente estructurado y resulta apropiado para un motor repetible.

## Oportunidad

La lógica se encuentra estrechamente unida al DOM del mismo archivo.

No debe extraerse como motor universal.

Sí deben reutilizarse sus patrones:

- etapas;
- estado de sesión;
- selección;
- filtros;
- siguiente paso;
- resumen final.

---

# 4.5 Integración con Misiones

Detectives obtiene:

```text
misionId
```

desde los parámetros de la URL.

Luego carga la misión mediante:

```javascript
Academia.tareas.obtener(misionId)
```

y valida:

```text
mision.modulo === "detectives"
```

El contexto de la misión puede establecer:

- cantidad objetivo;
- nivel;
- progreso inicial;
- ruta de retorno.

Cuando se resuelve una historia:

1. guarda la resolución mediante `registrarResolucionDetective`;
2. registra evidencia de misión;
3. actualiza el progreso;
4. muestra si la misión continúa o ha terminado.

La evidencia incluye:

```text
alumnoId
misionId
modulo
tipo
actividadId
sesionId
tituloActividad
atributos
resultado
destinoRevision
```

## Hallazgo confirmado

La revisión de `academia.js` confirma que:

```javascript
Academia.tareas.registrarEvidencia
```

y:

```javascript
Academia.evidencias.registrarParaMision
```

apuntan a la misma función interna:

```javascript
registrarEvidenciaMision
```

Por tanto:

- no existen dos implementaciones;
- existen dos nombres públicos para la misma capacidad;
- la lógica de validación, deduplicación y progreso es común.

## Recomendación

Semillas utilizará preferentemente:

```javascript
Academia.evidencias.registrarParaMision(...)
```

por expresar mejor la intención funcional.

No es obligatorio modificar inmediatamente Detectives.

---

# 4.6 Modelo técnico actual de Misión

La revisión de `academia.js` confirma que el identificador recibido como:

```text
misionId
```

se utiliza para abrir directamente:

```text
usuarios/{uid}/tareas/{misionId}
```

Por tanto, la implementación actual no separa técnicamente:

```text
Misión
└── Tareas[]
```

La situación actual es:

```text
Misión visible
      =
un documento de Tarea
      =
un único módulo
      =
un único criterio
      =
una o varias evidencias del mismo tipo
```

Ejemplo:

```text
Misión:
Resolver 5 ejercicios de Detectives de nivel 1

Criterio:
modulo: detectives
evidenciaTipo: detective_resuelto
cantidadObjetivo: 5
filtros:
  nivel: 1
```

Cada ejercicio válido añade una evidencia y aumenta:

```text
progreso.cantidadActual
```

hasta alcanzar la cantidad objetivo.

## Hallazgo

La API admite nombres como:

```text
tarea_combinada
criterio.tipo: combinado
```

pero el cálculo actual continúa utilizando un solo:

- módulo;
- tipo de evidencia;
- conjunto de filtros;
- objetivo cuantitativo.

No existe todavía un modelo operativo completo de Misión compuesta por Tareas heterogéneas.

## Decisión

Para Semillas se mantendrá el modelo actual.

No se implementará todavía:

```text
Misión
├── Tarea de Detectives
├── Tarea de Lectura
└── Tarea de Semillas
```

Esta capacidad queda reconocida como una evolución futura más robusta, pero no necesaria para el piloto.
---

# 4.7 Persistencia e historial

Detectives utiliza dos niveles de persistencia visibles.

## Persistencia detallada

```javascript
registrarResolucionDetective(...)
```

Guarda datos como:

- historia;
- nivel;
- tema;
- tipo;
- intentos;
- pasos;
- operación;
- operandos;
- resultado.

Las vistas `historial.html` e `historia.html` recuperan sesiones y progreso mediante `detectives-progreso.js`.

## Persistencia resumida local

Al finalizar una aventura también guarda un resumen en:

```text
localStorage
```

con una clave por usuario y nivel.

Incluye:

- completada;
- fecha;
- nivel;
- tema;
- desafíos;
- operaciones;
- casos simples;
- casos compuestos;
- intentos.

## Hallazgo

Existe una posible convivencia de:

- historial detallado remoto;
- resumen local heredado.

El README todavía indica que el seguimiento se guarda en `localStorage`, aunque el código actual ya registra resoluciones detalladas mediante servicios compartidos.

## Recomendación

Actualizar en el futuro el README de Detectives para reflejar la implementación actual.

Para Semillas:

- no crear persistencia local paralela si ya existe persistencia compartida;
- utilizar una única sesión de referencia;
- registrar evidencia asociada;
- conservar únicamente preferencias temporales en estado local.

---

# 4.8 Fortalezas de Detectives

1. Contenido estructurado y externo.
2. Esquema repetible.
3. Filtros por nivel y tema.
4. Casos simples y compuestos.
5. Flujo educativo claro.
6. Apoyos visuales configurables.
7. Acceso libre y acceso desde misión.
8. Registro por historia.
9. Historial y detalle.
10. Estado de “necesito ayuda”.
11. Navegación contextual.
12. Celebración integrada.

---

# 4.9 Aspectos que no deben copiarse directamente

1. Catálogo completo duplicado dentro del HTML.
2. Archivo principal excesivamente grande.
3. CSS, HTML y lógica concentrados.
4. Dos posibles fachadas para registrar evidencia.
5. Persistencia resumida local junto a persistencia detallada.
6. Acoplamiento fuerte entre flujo y elementos DOM.
7. Suposición directa de una única entidad `misionId`.
8. Catálogo de etiquetas de temas codificado en JavaScript.

---

# 5. Auditoría de Mi Rincón de Lectura

# 5.1 Arquitectura actual

Mi Rincón de Lectura presenta una separación más clara:

```text
index.html
historias.js
rincon-lectura.js
rincon-lectura-lia.css
```

Responsabilidades principales:

```text
index.html
Estructura y gran parte de la presentación.

historias.js
Catálogo de lecturas.

rincon-lectura.js
Motor, interacción, grabación, análisis, historial e integración.

rincon-lectura-lia.css
Estilo específico adicional de Lía.
```

El archivo JavaScript principal tiene aproximadamente 1.707 líneas y 50 funciones con nombre.

---

# 5.2 Contenido de Lectura

Las lecturas se guardan en:

```text
historias.js
```

y se exportan mediante:

```javascript
export const HISTORIAS = [...]
```

El catálogo recibido contiene 11 historias.

Cada historia puede incluir:

```text
id
titulo
idioma
idiomaEtiqueta
subtitulo
nivel
categoria
tiempoEstimado
portada
escena
valores
parrafos
preguntas
reflexion
fraseDelDia
```

## Fortaleza

La estructura es especialmente rica y adecuada para una experiencia visual y narrativa.

Incluye:

- contenido;
- metadatos;
- presentación;
- valores;
- comprensión;
- reflexión;
- cierre.

## Observación

Aunque está separado del motor, utilizar JavaScript implica que el contenido:

- necesita ser un módulo ejecutable;
- no puede validarse directamente como JSON estándar;
- admite estructuras y sintaxis propias de JavaScript.

Para el catálogo actual esto funciona correctamente.

Para Semillas se recomienda JSON por su facilidad de edición, validación y futura administración.

---

# 5.3 Catálogo y filtros

Lectura filtra por:

- idioma;
- nivel;
- categoría;
- estado de lectura.

También marca si una historia:

- es nueva;
- ya fue leída.

## Fortaleza

El catálogo no se limita a listar contenido.

Utiliza el historial del alumno para modificar la presentación.

Este patrón debe reutilizarse en Semillas:

```text
Nueva
Iniciada
Completada
Recomendada
Asignada
Para repetir
```

---

# 5.4 Flujo funcional

El flujo general es:

```text
Catálogo
   ↓
Selección de historia
   ↓
Presentación
   ↓
Lectura
   ↓
Grabación
   ↓
Transcripción
   ↓
Comparación
   ↓
Palabras para crecer
   ↓
Preguntas
   ↓
Observación familiar
   ↓
Guardar sesión
   ↓
Celebración
   ↓
Historial
```

## Fortaleza

La experiencia forma una cadena completa:

```text
actividad
+
práctica oral
+
análisis
+
reflexión
+
persistencia
+
acompañamiento familiar
```

Este es el principal patrón que debe inspirar Semillas.

---

# 5.5 Grabación

Lectura implementa directamente:

- permiso de micrófono;
- `MediaRecorder`;
- selección de MIME;
- límite de 120 segundos;
- contador;
- advertencia;
- inicio;
- detención;
- reproducción;
- eliminación;
- repetición;
- conversión a Data URL;
- número de intentos.

## Fortaleza

Es una capacidad ya validada funcionalmente dentro de la Academia.

## Oportunidad de reutilización

Es candidata clara a convertirse en un servicio compartido.

Sin embargo, no debe extraerse antes de revisar:

- cómo guarda realmente `Academia.rinconLectura`;
- límites de tamaño;
- compatibilidad;
- seguridad;
- retención;
- errores;
- diferencias requeridas por Semillas.

## Recomendación

Para el piloto de Semillas:

1. reutilizar primero el patrón;
2. minimizar cambios;
3. comprobar que funciona en ambos módulos;
4. extraer un servicio común solo si la duplicación es real y estable.

---

# 5.6 Transcripción y análisis

Lectura usa:

```text
SpeechRecognition
webkitSpeechRecognition
```

La transcripción se compara con el texto esperado.

El motor calcula, entre otros:

- tokens esperados;
- tokens reconocidos;
- coincidencias;
- palabras omitidas;
- palabras adicionales;
- ritmo aproximado;
- retroalimentación;
- mapa de comparación.

Además utiliza:

```text
palabras-para-crecer.js
```

para practicar palabras identificadas.

## Fortaleza

Este es actualmente el componente que más claramente convierte:

```text
Datos
   ↓
Observaciones
   ↓
Insumos
   ↓
Nueva práctica
```

## Precaución

La comparación está diseñada para lectura de un texto objetivo.

No debe copiarse literalmente en Semillas.

Semillas necesitará analizar una respuesta más libre.

Posibles elementos reutilizables:

- transcripción;
- intentos;
- duración;
- reproducción;
- comparación entre intentos;
- identificación de palabras o frases objetivo.

Elementos específicos de Lectura:

- comparación exacta con el texto original;
- palabras omitidas respecto a un texto fijo;
- comprensión de lectura;
- ritmo basado en cantidad de palabras esperadas.

---

# 5.7 Integración con Misiones

Lectura obtiene:

```text
misionId
```

desde la URL.

Carga la entidad mediante:

```javascript
Academia.tareas.obtener(misionId)
```

y valida:

```text
modulo === "rincon-lectura"
evidenciaTipo === "lectura_completada"
```

Al guardar una sesión:

1. guarda todos los datos de Lectura;
2. obtiene `sesionId`;
3. registra evidencia mediante:
   `Academia.evidencias.registrarParaMision`;
4. actualiza progreso;
5. muestra celebración cuando se alcanza el objetivo.

La evidencia incluye:

```text
misionId
modulo
tipo
actividadId
sesionId
atributos
resultado
destinoRevision
```

## Fortaleza

La sesión guardada y la evidencia están claramente relacionadas.

El historial puede filtrarse por:

- misión;
- sesión;
- historia.

## Recomendación

Este patrón es el candidato principal para Semillas:

```text
guardar sesión
   ↓
obtener sesionId
   ↓
registrar evidencia
   ↓
actualizar progreso
   ↓
permitir revisión
```

---

# 5.8 Datos guardados

La sesión incluye:

```text
historiaId
titulo
nivel
categoria
valores
textoOriginal
audioData
mimeType
duracion
transcripcion
observacionFamilia
intentos
analisisLectura
respuestas
reflexion
fraseDelDia
idioma
```

## Fortaleza

El historial conserva evidencia rica y revisable.

## Riesgo futuro

Guardar audio como Data URL puede aumentar mucho el tamaño del documento.

La auditoría no puede confirmar dónde ni cómo se persiste porque `academia.js` no fue incluido.

Antes de ampliar el número de alumnos o la duración de grabación deberá revisarse:

- tamaño;
- límites del almacenamiento;
- coste;
- rendimiento;
- estrategia de archivos;
- eliminación;
- retención.

Esto no bloquea el piloto actual.

---

# 5.9 Historial

El historial muestra:

- fecha;
- duración;
- audio;
- transcripción;
- respuestas;
- comprensión;
- intentos;
- análisis;
- palabras para crecer;
- reflexión;
- observación familiar;
- historial de cambios de la observación;
- relación con misión.

También permite:

- actualizar observación;
- eliminar sesión;
- abrir directamente una historia o sesión;
- filtrar evidencias de una misión.

## Hallazgo

Lectura ya contiene la base más madura para el futuro historial de Semillas.

Semillas deberá distinguir:

```text
Datos objetivos
Observaciones del sistema
Respuesta del alumno
Grabación
Observación familiar
Insumos
Acciones posteriores
```

---

# 5.10 Lía

Lectura incluye mensajes contextuales para:

- inicio;
- grabación;
- repetición;
- error;
- comparación;
- avance;
- cierre.

## Fortaleza

Lía no es únicamente decoración.

Forma parte del flujo.

## Recomendación

Semillas deberá reutilizar:

- tono;
- estilo;
- reglas de acompañamiento;
- componente visual;
- tratamiento de error;
- mensajes de repetición.

Y definir específicamente:

- preguntas emocionales;
- reformulación;
- apoyo para hablar;
- reducción de vergüenza;
- cierre de la Semilla.

---

# 5.11 Fortalezas de Mi Rincón de Lectura

1. Catálogo visual de alta calidad.
2. Contenido narrativo rico.
3. Filtros.
4. Grabación integrada.
5. Transcripción.
6. Varios intentos.
7. Comparación y análisis.
8. Palabras para crecer.
9. Comprensión.
10. Historial completo.
11. Observaciones familiares.
12. Integración profunda con Misiones.
13. Evidencias vinculadas a sesiones.
14. Navegación directa a revisión.
15. Lía contextual.
16. Celebración reutilizable.

---

# 5.12 Aspectos que no deben copiarse directamente

1. Análisis basado en coincidencia con un texto fijo.
2. Dependencia obligatoria de una grabación para toda Semilla.
3. Persistencia de audio sin revisar límites.
4. Lógica de grabación embebida completa en cada motor.
5. Archivo JavaScript principal demasiado amplio.
6. Acceso directo al DOM desde prácticamente todas las funciones.
7. Contenido JavaScript cuando JSON sea suficiente.
8. Mezcla en un solo archivo de:
   - catálogo;
   - sesión;
   - grabación;
   - análisis;
   - historial;
   - acciones familiares.

---

# 6. Comparación directa

| Área | Detectives | Mi Rincón de Lectura | Recomendación para Semillas |
|---|---|---|---|
| Contenido | `historias.json` | `historias.js` | `semillas.json` |
| Catálogo | Sí | Sí, más visual | Tomar Lectura |
| Filtros | Nivel y tema | Idioma, nivel y categoría | Emoción, situación, familia y apoyo |
| Flujo | Etapas matemáticas | Paneles de experiencia | Etapas configurables |
| Voz | Síntesis para escuchar | Grabación y transcripción | Grabación principal |
| Análisis | Respuesta y cálculo | Voz, lectura y palabras | Estructura del mensaje y práctica oral |
| Historial | Resoluciones por historia | Sesiones muy detalladas | Tomar Lectura |
| Familia | Revisión de resultados | Observaciones editables | Tomar Lectura con reglas de privacidad |
| Misiones | Sí | Sí | Reutilizar patrón vigente |
| Evidencia | Fachada `tareas` | Fachada `evidencias` | Misma implementación; preferir `evidencias` |
| Navegación contextual | Sí | Sí | Reutilizar |
| Contenido visual | Configurable parcialmente | Muy rico | Combinar ambos |
| Lía | Poco central | Muy integrada | Tomar Lectura |
| Datos útiles | Intentos y resolución | Análisis e insumos | Combinar ambos |
| Organización del código | Muy concentrada en HTML | Más separada, pero JS grande | Separación moderada |

---

# 7. Capacidades comunes reales

Las siguientes capacidades existen en ambos motores o presentan un patrón suficientemente similar.

## 7.1 Acceso contextual

- URL con `misionId`;
- ruta de retorno;
- validación del módulo;
- modo libre si falla el contexto.

## 7.2 Estado de misión

- misión activa;
- progreso;
- cantidad objetivo;
- necesidad de ayuda;
- finalización;
- celebración.

## 7.3 Catálogo

- contenido identificable;
- filtros;
- selección;
- estado previo;
- comienzo de experiencia.

## 7.4 Sesión

- identificador de actividad;
- intentos;
- resultado;
- finalización;
- historial.

## 7.5 Evidencias

- módulo;
- tipo;
- actividad;
- sesión;
- atributos;
- resultado;
- destino de revisión.

## 7.6 Historial

- listado;
- detalle;
- relación con contenido;
- relación con misión;
- revisión familiar.

## 7.7 Navegación

- acceso libre;
- acceso desde misión;
- vuelta contextual;
- continuidad.

## 7.8 Acompañamiento

- solicitud de ayuda;
- retroalimentación;
- celebración;
- mensajes positivos.

---

# 8. Capacidades específicas que deben conservarse

## 8.1 Detectives

- operaciones matemáticas;
- validación numérica;
- operandos;
- solución correcta;
- problemas compuestos;
- visualización de grupos y repartos;
- elección de operación.

## 8.2 Lectura

- texto objetivo;
- reconocimiento de palabras;
- comparación textual;
- ritmo lector;
- preguntas de comprensión;
- palabras para crecer;
- idioma.

## 8.3 Semillas

Deberá conservar como propias:

- ausencia de una única emoción correcta;
- respuesta oral libre o semiguiada;
- estructura de comunicación;
- nivel de apoyo;
- privacidad reforzada;
- reducción progresiva de vergüenza;
- acompañamiento sensible;
- práctica sin evaluación personal.

---

# 9. Servicios candidatos a reutilización

# 9.1 Alta prioridad

## Contexto de misión

Responsabilidades:

- leer parámetros;
- cargar misión/tarea;
- validar módulo;
- ofrecer modo libre;
- preparar retorno;
- actualizar banda;
- gestionar ayuda.

## Registro de evidencia

Debe existir una única fachada vigente.

## Grabación

Responsabilidades:

- permisos;
- inicio;
- parada;
- duración;
- reproducción;
- eliminación;
- reintentos;
- preparación para guardar.

## Celebración

Ya existe como componente compartido.

## Panel de usuario y navegación

Ya existen como componentes compartidos.

# 9.2 Prioridad media

## Transcripción

Puede compartirse como infraestructura.

La interpretación seguirá siendo específica.

## Filtros

Puede compartirse un patrón o componente visual.

Los criterios seguirán siendo propios de cada catálogo.

## Historial

Puede compartirse un modelo básico de sesión y evidencia.

La presentación detallada seguirá siendo específica.

## Lía

Debe compartirse todo lo posible:

- identidad;
- tono;
- componentes;
- audio;
- accesibilidad;
- errores;
- mensajes generales.

Cada motor conservará sus diálogos y ayudas pedagógicas.

# 9.3 No extraer todavía

- motor universal de etapas;
- analizador universal de aprendizaje;
- esquema único completo para todos los resultados;
- renderer universal de contenido;
- reglas comunes de evaluación;
- catálogo universal.

Primero debe validarse Semillas.

---

# 10. Contrato actual y recomendado

## 10.1 Contrato técnico actual

La Tarea visible como Misión contiene:

```text
tareaId
titulo
modulo
criterioCumplimiento
progreso
estado
requiereRevision
destinoUrl
```

El criterio normalizado contiene:

```text
tipo
modulo
evidenciaTipo
cantidadObjetivo
filtros
```

La evidencia contiene:

```text
misionId
modulo
tipo
actividadId
sesionId
atributos
resultado
destinoRevision
origen
```

Aunque la evidencia acepta alternativamente `tareaId`, la normalización guarda finalmente la relación como:

```text
misionId
```

y utiliza ese valor para localizar el documento de Tarea.

## 10.2 Validación de una evidencia

Una evidencia cuenta cuando:

1. corresponde al mismo módulo;
2. tiene el tipo de evidencia requerido;
3. cumple todos los filtros;
4. pertenece al alumno;
5. la misión está activa;
6. no fue registrada previamente.

El identificador de evidencia combina:

```text
misionId
modulo
sesionId o actividadId
```

Esto evita que la misma sesión o actividad se contabilice dos veces.

## 10.3 Regla para Semillas

Para el piloto:

```text
Misión visible
=
un documento de Tarea
=
módulo creciendo-por-dentro
=
evidencia semilla_completada
=
cantidad objetivo
=
filtros opcionales
```

No se utilizará todavía un `tareaId` separado de `misionId`.

## 10.4 Evolución futura

El contrato deberá poder evolucionar más adelante hacia:

```text
Misión
└── Tareas[]
    └── Evidencias[]
```

El piloto no dependerá de esa capacidad.
---

# 11. Configuración de una Misión de Semillas

La creación de una Misión de Semillas reutilizará el patrón actual:

```text
cantidad objetivo
+
filtros opcionales
```

## 12.1 Campos principales

El administrador indicará:

### Cantidad de Semillas

Ejemplo:

```text
2
```

### Semillas concretas

Selección opcional de hasta la cantidad indicada.

Ejemplo:

```text
Cantidad objetivo:
2

Semillas seleccionadas:
- Aprendo a decir lo que siento
- Pido ayuda con confianza
```

## 11.2 Selección libre

Si no se selecciona ninguna Semilla:

```text
Cantidad objetivo:
2

Semillas seleccionadas:
vacío
```

el alumno podrá escoger cualesquiera dos Semillas válidas que cumplan los demás filtros de la Misión.

Texto recomendado para el formulario:

> Puedes elegir las Semillas concretas o dejar la selección vacía para que el alumno decida cuáles realizar.

## 11.3 Comportamiento dinámico

La cantidad de selecciones permitidas dependerá de la cantidad objetivo:

```text
Cantidad: 1
→ seleccionar como máximo 1 Semilla.

Cantidad: 2
→ seleccionar como máximo 2 Semillas.

Cantidad: 5
→ seleccionar como máximo 5 Semillas.
```

No será obligatorio completar todas las selecciones.

Ejemplo válido:

```text
Cantidad objetivo:
3

Semillas seleccionadas:
- Aprendo a decir lo que siento

Resultado:
Esa Semilla debe completarse y el alumno elige otras dos.
```

## 11.4 Regla de cómputo

Para el piloto, cada Semilla diferente contará una sola vez dentro de la misma Misión.

Esto evita que repetir accidentalmente la misma Semilla complete una Misión que esperaba variedad.

La repetición:

- se guardará en historial;
- podrá aportar valor educativo;
- no incrementará nuevamente el progreso de esa Misión.

Esta regla podrá hacerse configurable en una fase futura si aparece una necesidad real de repetir una misma Semilla varias veces como criterio de cumplimiento.

## 11.5 Representación conceptual del criterio

Cuando se indiquen Semillas concretas:

```json
{
  "tipo": "cantidad",
  "modulo": "creciendo-por-dentro",
  "evidenciaTipo": "semilla_completada",
  "cantidadObjetivo": 2,
  "filtros": {
    "semillasIds": [
      "decir-lo-que-siento",
      "pedir-ayuda"
    ]
  }
}
```

Cuando la selección sea libre:

```json
{
  "tipo": "cantidad",
  "modulo": "creciendo-por-dentro",
  "evidenciaTipo": "semilla_completada",
  "cantidadObjetivo": 2,
  "filtros": {}
}
```

## 11.6 Ajuste técnico necesario

La función actual de filtros compara valores simples:

```text
atributo == valor esperado
```

Una lista `semillasIds` requiere una pequeña ampliación para aceptar:

```text
actividadId incluido en una lista permitida
```

Alternativas simples:

### Opción A — Filtro por lista

Extender la validación para admitir arrays.

### Opción B — Una Semilla concreta

Usar `actividadId` cuando solo se selecciona una.

### Opción C — Selección en el motor

Abrir el catálogo ya filtrado y registrar únicamente actividades permitidas.

## Recomendación

Utilizar **Opción A**, porque agrega valor con una modificación acotada y reutilizable:

```text
si el filtro esperado es un array,
la evidencia cumple cuando el valor real está incluido.
```

Además, la validación deberá poder considerar `actividadId` como campo filtrable, no solo `atributos`.

---

# 12. Modelo recomendado para Semillas

```text
creciendo-por-dentro/
├── index.html
├── semillas.json
├── creciendo-por-dentro.js
├── creciendo-por-dentro.css
└── README.md
```

La necesidad de archivos adicionales deberá surgir del piloto.

## 12.1 Responsabilidades propuestas

### `semillas.json`

- catálogo;
- situaciones;
- pasos;
- opciones;
- emociones;
- apoyos;
- recursos;
- filtros;
- mensajes específicos;
- cierre.

### `creciendo-por-dentro.js`

- cargar contenido;
- filtrar;
- iniciar sesión;
- gestionar pasos;
- grabar;
- transcribir;
- construir respuesta;
- guardar;
- registrar evidencia;
- mostrar cierre.

### Servicios compartidos

- autenticación;
- perfil;
- panel;
- contexto de misión;
- grabación, cuando se consolide;
- evidencias;
- celebración;
- Lía;
- persistencia.

---

# 13. Flujo propuesto para el piloto

```text
Acceso libre o desde Misión/Tarea
                │
                ▼
      Cargar contexto válido
                │
                ▼
        Cargar semillas.json
                │
                ▼
 Semilla asignada o catálogo filtrado
                │
                ▼
       Presentar la situación
                │
                ▼
           Describir
                │
                ▼
           Expresar
                │
                ▼
      Solicitar o sugerir
                │
                ▼
          Consecuencia
                │
                ▼
     Construir respuesta oral
                │
                ▼
        Grabar y reproducir
                │
                ▼
       Repetir o confirmar
                │
                ▼
          Guardar sesión
                │
                ▼
 Registrar evidencia de la Tarea
                │
                ▼
 Actualizar progreso de la Misión
                │
                ▼
       Historial y revisión
                │
                ▼
Datos → Observaciones → Insumos → Acciones
```

---

# 14. Datos mínimos propuestos para Semillas

## Sesión

```text
sesionId
alumnoId
semillaId
titulo
familia
tipoSituacion
nivelApoyo
fechaInicio
fechaFin
duracion
intentos
respuestaConstruida
audio
mimeType
transcripcion
pasos
observacionFamilia
analisisEducativo
misionId
```

## Evidencia

```text
modulo: creciendo-por-dentro
tipo: semilla_completada
actividadId: semillaId
sesionId
atributos:
  familia
  tipoSituacion
  nivelApoyo
resultado:
  intentos
  duracion
  grabacionConfirmada
destinoRevision
```

El esquema definitivo deberá ajustarse a la API real.

---

# 15. Riesgos identificados

## 15.1 Sobrearquitectura

Intentar construir inmediatamente un motor universal.

**Respuesta:** implementar primero el piloto.

## 15.2 Duplicación de servicios

Copiar grabación, contexto de misión e historial.

**Respuesta:** reutilizar patrones y extraer solo cuando se confirmen.

## 15.3 Dos fachadas públicas de evidencias

Detectives y Lectura utilizan nombres distintos para la misma función interna.

**Respuesta:** preferir `Academia.evidencias.registrarParaMision` en Semillas y mantener compatibilidad.

## 15.4 Evolución futura de Misiones compuestas

Actualmente una Misión visible corresponde a una única Tarea técnica y un único tipo de actividad.

**Respuesta:** mantener el modelo actual para el piloto y dejar las Misiones heterogéneas para otra fase.

## 15.5 Audio en documentos

Posible crecimiento de tamaño.

**Respuesta:** verificar persistencia antes de ampliar.

## 15.6 Datos sensibles

Semillas manejará información más personal.

**Respuesta:** mantener acceso familiar controlado y revisar seguridad.

## 15.7 Acoplamiento al DOM

Ambos motores dependen intensamente de identificadores de pantalla.

**Respuesta:** no buscar abstracción total, pero separar contenido, sesión y servicios.

## 15.8 Filtros múltiples de Semillas

La función actual compara filtros simples y no listas.

**Respuesta:** realizar una ampliación pequeña y controlada para aceptar valores permitidos en arrays.

---

# 16. Decisiones recomendadas

1. Utilizar `semillas.json`.
2. Crear una carpeta propia para Creciendo por dentro.
3. Tomar Detectives como referencia de catálogo configurable.
4. Tomar Lectura como referencia de interacción e historial.
5. Reutilizar el patrón de apertura desde misión.
6. Mantener el modelo actual: una Misión visible corresponde a una Tarea técnica.
7. Mantener un solo módulo y tipo de evidencia por Misión.
8. Permitir que una Misión exija varias Semillas.
9. Solicitar una cantidad objetivo.
10. Permitir seleccionar Semillas concretas de forma opcional.
11. Permitir selección libre cuando no se indiquen Semillas.
12. Permitir selección parcial: algunas obligatorias y el resto libres.
13. Contabilizar una Semilla diferente una sola vez por Misión durante el piloto.
14. Guardar las repeticiones en historial aunque no incrementen progreso.
15. Ampliar de forma sencilla los filtros para aceptar listas.
16. Utilizar `Academia.evidencias.registrarParaMision`.
17. Guardar una sesión antes de registrar evidencia.
18. Relacionar sesión, evidencia y Misión.
19. Generar historial desde la primera versión.
20. Diseñar el historial para producir insumos.
21. Usar grabación como interacción principal.
22. Reutilizar transcripción como infraestructura.
23. No reutilizar el análisis textual específico de Lectura.
24. Reutilizar la mayor parte posible de Lía.
25. No implementar todavía Misiones con módulos diferentes.
26. No crear todavía un motor universal.
27. No crear documentación adicional salvo necesidad real.
28. Considerar la auditoría cerrada al comenzar el diseño técnico de Semillas.
---

# 17. Próximo paso recomendado

La auditoría confirma que ya existe base suficiente para diseñar el piloto.

El siguiente paso es:

> **Diseñar técnicamente el Motor de Semillas y la primera Semilla “Aprendo a decir lo que siento”.**

La carpeta `compartido/` ya permitió confirmar el contrato actual de Tareas y evidencias.

Antes de escribir el código solo falta revisar en el módulo de creación de Mis Tareas:

- cómo añadir `creciendo-por-dentro` como módulo;
- cómo presentar cantidad de Semillas;
- cómo implementar selección opcional;
- cómo serializar filtros;
- cómo mantener compatibilidad con las Misiones existentes.

Esta revisión puede realizarse directamente como parte del diseño técnico y de la implementación.

No requiere una nueva auditoría documental extensa.

---

# 18. Conclusión

Detectives demuestra que la Academia ya puede sostener un catálogo amplio y configurable de experiencias.

Mi Rincón de Lectura demuestra que puede acompañar una experiencia oral, analizarla, conservarla y convertirla en información útil.

Semillas deberá unir ambas capacidades:

```text
Contenido configurable
        +
Experiencia oral
        +
Acompañamiento de Lía
        +
Misión de un único tipo
        +
Cantidad objetivo
        +
Selección opcional de Semillas
        +
Historial
        +
Insumos
```

El objetivo no es construir el motor técnicamente más complejo.

Es construir el motor más adecuado para acompañar a Gloria.

Y hacerlo apoyándonos en todo lo que la Academia ya ha aprendido.

🌱💜
