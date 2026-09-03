# 📊 Especificación de Análisis Educativo
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` |
| **Versión** | 1.0 |
| **Estado** | Activo |
| **Fecha** | 03/09/2026 |
| **Última actualización** | 03/09/2026 |
| **Propietario** | Análisis Educativo y Acompañamiento Familiar |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Análisis descriptivo de evidencias educativas, tendencias, fortalezas, aspectos a reforzar, mejoras personales y propuestas de actuación |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Gobierna:** propósito humano, dignidad del alumno y acompañamiento sin etiquetas. |
| `docs/vision/01_PRINCIPIOS_PEDAGOGICOS.md` | **Gobierna:** comprensión, autonomía, error, motivación y observación prudente del aprendizaje. |
| `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md` | **Gobierna conceptualmente:** transformación Datos → Observaciones → Insumos → Acciones. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna:** contrato de contenidos académicos, sesiones, evidencias, retroalimentación y refuerzo. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Complementa:** creación y control familiar de Misiones derivadas de necesidades observadas. |
| `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` | **Complementa:** comportamiento funcional de Misiones y evidencias. |
| `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md` | **Complementa:** presentación familiar de ejecuciones y evidencias ya realizadas. |
| `compartido/js/sesiones-academicas.js` | **Implementa:** lectura y persistencia compartida de sesiones académicas. |
| `compartido/js/detectives-progreso.js` | **Implementa:** historial y sesiones de Detectives usados por el análisis. |
| `mi-universo/mis-tareas/analisis-educativo.js` | **Implementa:** motor V1 del reporte educativo. |
| `mi-universo/mis-tareas/analisis-educativo.css` | **Implementa:** presentación visual del reporte. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 03/09/2026 | Product Owner + AI Collaborator | Primera especificación propietaria del Análisis Educativo. Documenta la V1 implementada, sus fuentes, filtros, criterios por motor, tratamiento de tendencias, mejoras personales y propuestas de actuación. Formaliza además que todo nuevo Tema Académico de 6.º debe generar evidencia estructurada reutilizable por análisis estadístico/educativo y por propuestas de fortalecimiento. |

---

## 🎯 1. Propósito

El Análisis Educativo transforma evidencias reales de actividad en una lectura familiar útil y prudente.

Su pregunta principal es:

> **¿Qué muestran las actividades realizadas sobre lo que está funcionando, lo que conviene seguir observando y lo que puede ser útil reforzar?**

El objetivo **no** es calificar globalmente al alumno, construir perfiles rígidos ni diagnosticar capacidades.

El objetivo es convertir datos observables en información accionable siguiendo el ciclo:

```text
EVIDENCIAS REALES
        ↓
DATOS OBSERVABLES
        ↓
AGRUPACIÓN Y COMPARACIÓN
        ↓
OBSERVACIONES
        ↓
TENDENCIAS PRUDENTES
        ↓
FORTALEZAS / ASPECTOS A REFORZAR
        ↓
PROPUESTAS DE ACTUACIÓN
        ↓
DECISIÓN FAMILIAR
        ↓
FORTALECIMIENTO / CONTINUIDAD
```

La familia conserva el control de cualquier acción posterior que afecte el recorrido del alumno.

---

## 📐 2. Alcance

### 2.1 Incluido

La V1 incluye:

- selección de período;
- selección de Motor / Área;
- selección de Tema / Foco cuando el Motor lo permite;
- lectura de evidencias de Detectives;
- lectura de sesiones de Pruebas Académicas;
- lectura de sesiones de Mi Rincón de Lectura;
- resumen cuantitativo de las evidencias observadas;
- fortalezas observadas;
- aspectos a reforzar;
- evolución temporal descriptiva;
- intentos cuando el motor los registra de forma comparable;
- uso de pistas o ayudas cuando existe ese dato;
- mejoras personales observables;
- propuestas de actuación;
- tratamiento explícito de ausencia de datos;
- funcionamiento con fuentes parciales cuando alguna no puede leerse;
- Persona Activa como alumno analizado;
- y reutilización futura de evidencias producidas por nuevos Temas Académicos.

### 2.2 Fuera de alcance de la V1

La V1 no constituye:

- diagnóstico clínico, psicológico, logopédico o pedagógico;
- boletín escolar;
- nota oficial;
- ranking;
- comparación con otros alumnos;
- predicción de capacidad;
- evaluación de inteligencia;
- perfil permanente de fortalezas/debilidades;
- cálculo de métricas que la actividad no registró;
- sustitución del criterio de la familia o del colegio;
- creación automática e inmediata de una Misión visible para el alumno;
- ni un motor genérico de machine learning.

---

## 🧭 3. Principios normativos

### 3.1 Evidencia antes que interpretación

Toda afirmación debe poder remontarse a datos realmente registrados.

```text
DATO
→ OBSERVACIÓN
→ TENDENCIA PRUDENTE
→ PROPUESTA
```

Nunca:

```text
DATO AISLADO
→ ETIQUETA SOBRE EL ALUMNO
```

### 3.2 Una señal aislada no es un patrón

Una única actividad puede producir una observación útil, pero no debe convertirse automáticamente en una conclusión longitudinal.

Cuando un criterio requiera repetición, debe especificar qué se considera repetición independiente.

### 3.3 No inventar comparabilidad

Cada Motor registra información diferente.

Si un Motor no registra pistas, segundos intentos u otra métrica comparable, el reporte debe decirlo expresamente en vez de inferirla.

### 3.4 Describir, no etiquetar

Preferir:

> “En dos sesiones recientes apareció esta señal.”

Evitar:

> “Le cuesta siempre…”

> “Es débil en…”

> “No sabe…”

### 3.5 Fortalecimiento, no castigo

Las acciones sugeridas deben buscar una nueva oportunidad de aprendizaje.

No deben:

- penalizar;
- retirar recompensas;
- repetir mecánicamente una actividad para producir estadísticas;
- ni presentar el refuerzo como fracaso.

### 3.6 Control familiar

Una propuesta del reporte es un **insumo para decidir**.

Cuando una propuesta llegue a convertirse en Misión de refuerzo, se respetará el patrón vigente de revisión/activación familiar y no se publicará automáticamente al alumno sin el control previsto por el módulo de Misiones.

---

## 👤 4. Persona Activa y acceso

El reporte analiza a la **Persona Activa** resuelta por `ContextoUsuario`.

La implementación V1 vive dentro de **Gestión de Misiones**, por lo que hereda el carácter familiar/administrativo de ese espacio.

Reglas:

1. no debe analizar silenciosamente a una persona distinta de la Persona Activa;
2. un cambio futuro de Persona Activa debe conservar el modelo global de permisos;
3. el alumno no obtiene acceso a Gestión de Misiones únicamente por existir este reporte;
4. el reporte no crea un nuevo modelo de autorización paralelo.

---

## 🔎 5. Filtros funcionales

### 5.1 Período

La V1 ofrece:

- último mes;
- últimos 2 meses;
- últimos 3 meses;
- personalizado: Desde / Hasta.

El rango personalizado incluye el día completo de inicio y de finalización.

### 5.2 Motor / Área

Opciones vigentes:

- Todos;
- Detectives;
- Pruebas académicas;
- Rincón de Lectura.

### 5.3 Tema / Foco

El filtro Tema / Foco:

- se habilita al seleccionar un Motor concreto;
- se construye con los temas/focos realmente disponibles dentro del período;
- no presenta valores ficticios;
- permanece deshabilitado cuando se seleccionan Todos los Motores o no existen opciones;
- compara de forma normalizada mayúsculas/minúsculas y acentos cuando filtra.

Cuando `Motor = Todos`, la V1 no aplica simultáneamente un Tema porque los significados de “tema” no son homogéneos entre Motores.

---

## 🗂️ 6. Fuentes de datos V1

### 6.1 Detectives

Fuentes principales:

- historial de historias del alumno;
- sesiones de cada historia;
- catálogo de historias para presentar títulos legibles.

Focos observables actuales:

1. 🧠 Comprender qué pregunta el problema;
2. 🔎 Descubrir qué hay que averiguar;
3. ➕ Elegir la operación;
4. 🔢 Elegir los datos necesarios;
5. ✅ Calcular y comprobar el resultado.

### 6.2 Pruebas académicas

Fuente:

- `sesionesAcademicas`, leídas mediante el servicio compartido.

La V1 solicita como máximo **100 sesiones académicas** en una carga del reporte.

Para análisis por pregunta/bloque se consideran respuestas que contienen un valor booleano de corrección.

### 6.3 Mi Rincón de Lectura

Fuente:

- sesiones de lectura;
- `analisisLectura.palabrasParaCrecer` cuando existe.

Se utilizan principalmente:

- palabra;
- estado;
- intentos;
- fecha;
- historia/lectura de procedencia.

### 6.4 Carga parcial

Las fuentes se intentan cargar de forma independiente.

Si una fuente falla y otras están disponibles:

- el reporte puede generarse con datos parciales;
- debe mostrar una advertencia;
- no debe presentar el resultado parcial como si todas las fuentes hubieran sido leídas correctamente.

Si no puede resolverse la Persona Activa o falla el proceso principal, debe mostrarse una razón comprensible cuando sea seguro hacerlo.

---

## 📊 7. Estructura visible del reporte

Cuando existen datos, la V1 presenta:

1. 📊 **Resumen del período**;
2. 💪 **Fortalezas observadas**;
3. 🌱 **Aspectos a reforzar**;
4. 📈 **Evolución**;
5. 🎯 **Intentos**;
6. 💡 **Uso de pistas y ayudas**;
7. 🏅 **Mejoras personales observables**;
8. 🧭 **Propuestas de actuación**;
9. 🦜 recordatorio de interpretación prudente.

El resumen indica:

- total de actividades/sesiones observadas;
- cantidad de Detectives;
- cantidad de Pruebas Académicas;
- cantidad de Rincón de Lectura;
- período analizado.

Si no existen datos para los filtros:

> “No hay evidencias observables con estos filtros.”

La ausencia de datos es un resultado válido; no debe sustituirse por estimaciones.

---

## 🧩 8. Criterios de Detectives

### 8.1 Intentos adicionales

Para cada foco se distingue:

```text
intentos registrados
- base esperada del paso
= intentos adicionales
```

En pasos repetibles, la base se ajusta al número de pasos observados.

### 8.2 Fortaleza observable

Un foco puede aparecer como fortaleza cuando:

- existen observaciones sin intentos adicionales;
- esas observaciones proceden de **al menos 2 historias distintas** del mismo nivel.

La V1 prioriza hasta 3 fortalezas por:

1. proporción de observaciones sin intentos adicionales;
2. número de historias diferentes;
3. orden pedagógico del foco.

### 8.3 Aspecto a reforzar

Una señal puede proponerse como aspecto a reforzar cuando:

- existen intentos adicionales;
- la señal aparece en **al menos 2 historias distintas** del mismo nivel.

Para evitar duplicar ruido dentro de una misma historia, se conserva como soporte la observación más reciente por historia.

La prioridad se ordena principalmente por:

1. media de intentos adicionales por historia;
2. recencia de la señal;
3. orden pedagógico del foco.

Esto mantiene el criterio aprobado:

> **la repetición confirma la necesidad; los intentos adicionales determinan prioritariamente su intensidad y orden.**

### 8.4 Pistas

Las pistas se muestran como una señal **separada** de los intentos.

La V1 no mezcla automáticamente ambas magnitudes en una única puntuación.

### 8.5 Evolución

Para describir tendencia temporal se requieren al menos **4 resoluciones comparables** en el período.

Las sesiones se ordenan cronológicamente y se dividen en dos mitades.

Se compara la media de intentos adicionales por resolución.

Una subida no se presenta como conclusión estable; se acompaña de lenguaje prudente y necesidad de seguir observando.

### 8.6 Mejora personal observable

Puede destacarse una mejora cuando la **misma historia** dispone de al menos dos resoluciones comparables y los intentos totales disminuyen entre la primera y la última del período.

No se compara con otros alumnos.

### 8.7 Propuesta de actuación

Los aspectos repetidos de mayor prioridad pueden originar propuestas como:

> practicar con historias nuevas del mismo nivel centradas en el foco observado.

Por defecto se evita pedir repetir exactamente las historias que originaron la señal.

---

## 📘 9. Criterios de Pruebas Académicas

### 9.1 Unidad de agrupación

Las respuestas se agrupan por:

```text
actividadId + bloqueId
```

Esto permite analizar un foco concreto dentro de un Tema cuando la prueba guarda un mapa suficientemente estructurado.

### 9.2 Fortaleza observable

Un bloque puede aparecer como fortaleza cuando, dentro del período:

- existen al menos **2 respuestas correctas**;
- no existe ninguna respuesta incorrecta en ese grupo.

### 9.3 Aspecto a reforzar

Un bloque puede aparecer como aspecto a reforzar cuando:

- existen al menos **2 respuestas incorrectas** en el grupo;
- la sesión más reciente del período **todavía mantiene una respuesta incorrecta** para ese grupo.

La prioridad se ordena por:

1. mayor proporción de respuestas incorrectas;
2. mayor recencia.

Este criterio evita que una dificultad antigua ya superada siga apareciendo automáticamente como necesidad actual.

### 9.4 Intentos

Las pruebas académicas V1 registran una respuesta por pregunta y **no poseen segundos/terceros intentos comparables con Detectives**.

Por tanto:

- error ≠ intento adicional;
- el reporte no inventa una métrica de intentos.

### 9.5 Pistas

Las pruebas académicas actuales no registran una señal de pistas comparable con Detectives.

La V1 lo declara expresamente y no lo infiere.

### 9.6 Evolución

Se requieren al menos **4 sesiones comparables** para describir una tendencia temporal.

Se compara entre las dos mitades del período la proporción media de respuestas correctas de las sesiones con respuestas calificadas.

Una disminución se describe como señal a seguir observando, no como conclusión sobre capacidad.

### 9.7 Mejora personal observable

Para una misma `actividadId`, si existen al menos dos sesiones comparables y la proporción de respuestas correctas aumenta entre la primera y la última, puede destacarse como mejora personal.

### 9.8 Propuesta de actuación

Un bloque repetidamente señalado puede sugerir:

> preparar ejercicios **nuevos** del Tema centrados en ese bloque.

No se debe repetir exactamente la misma prueba solo para generar más datos.

---

## 📖 10. Criterios de Mi Rincón de Lectura

### 10.1 Fortaleza observable

La V1 puede destacar una fortaleza global cuando existen al menos **2 palabras superadas a la primera** dentro del período.

### 10.2 Señal más reciente por palabra

Para cada palabra normalizada se conserva la señal más reciente.

Esto evita mantener como activa una dificultad antigua si la evidencia posterior indica un estado diferente.

### 10.3 Aspecto a reforzar

Una palabra puede aparecer cuando su señal más reciente:

- no está superada; o
- está superada, pero necesitó más de un intento.

La prioridad favorece:

1. palabras todavía no superadas;
2. mayor número de intentos;
3. mayor recencia.

### 10.4 Intentos

Cuando existen, se suman los intentos registrados en observaciones de pronunciación.

Si no existen datos comparables, el reporte lo dice expresamente.

### 10.5 Pistas

Rincón de Lectura no registra una señal de pistas equivalente a Detectives.

No se mezclan intentos de pronunciación con pistas inexistentes.

### 10.6 Evolución

Con al menos **4 lecturas comparables**, la V1 compara entre ambas mitades del período la proporción de palabras superadas a la primera entre aquellas que tienen número de intentos disponible.

Como las lecturas pueden contener palabras diferentes, una variación negativa se presenta solo como señal descriptiva.

### 10.7 Propuesta de actuación

Puede sugerirse practicar la palabra dentro de una **frase nueva y breve**, sin obligar a repetir la lectura original.

---

## 🌱 11. Contrato obligatorio de evidencia para nuevos Temas Académicos

### 11.1 Regla principal

> **Todo nuevo Tema Académico de 6.º debe generar evidencia académica estructurada durante una ejecución normal de aprendizaje.**

Esta regla existe para que el crecimiento curricular no produzca Temas aislados que luego no puedan participar en:

- Trabajo realizado;
- análisis estadístico/educativo;
- evolución temporal;
- identificación de fortalezas;
- identificación de aspectos a reforzar;
- mejoras personales;
- propuestas de actuación;
- y propuestas de fortalecimiento o Misiones de refuerzo cuando exista evidencia suficiente.

### 11.2 Evidencia académica ≠ Evidencia de Misión

Se distinguen:

**Evidencia académica**

La produce el Tema mediante una sesión académica estructurada, tanto en acceso libre como desde una Misión.

**Evidencia de Misión**

Se crea adicionalmente cuando la ejecución procede de una Misión y referencia la sesión académica correspondiente.

Por tanto:

```text
ACCESO LIBRE
Tema
→ actividad/comprobación observable
→ sesión académica
→ evidencia reutilizable por análisis

DESDE MISIÓN
Misión
→ Tema
→ actividad/comprobación observable
→ sesión académica
→ evidencia de Misión que referencia la sesión
→ revisión familiar cuando corresponda
```

### 11.3 No crear esquemas privados por Tema

Un nuevo Tema no debe inventar una colección o formato de persistencia exclusivo si el contrato compartido puede representar la experiencia.

Por defecto debe reutilizar `sesion-academica-v1` y los servicios compartidos vigentes.

Si aparece una necesidad educativa que el contrato no puede representar:

1. se analiza como evolución del contrato común;
2. se evita una solución paralela solo para ese Tema;
3. se mantiene compatibilidad con los consumidores de evidencia existentes.

### 11.4 Identidad mínima analizable

Toda evidencia académica nueva debe permitir identificar, como mínimo cuando aplique:

- Persona Activa / propietario de la sesión;
- `cursoReferencia`;
- `materia`;
- `tema`;
- `actividadId` estable;
- tipo de actividad;
- fecha de ejecución;
- estado/finalización;
- y relación con `misionId` cuando exista.

### 11.5 Evidencia del aprendizaje

Además de identidad, el Tema debe diseñar **al menos una interacción o comprobación observable** proporcional a su naturaleza.

Puede consistir, según el contenido, en:

- respuestas correctas/incorrectas;
- bloques o focos trabajados;
- resultado inicial/final;
- intentos reales;
- ayudas/pistas realmente usadas;
- elecciones de estrategia;
- producción estructurada;
- clasificación;
- aplicación;
- transferencia;
- o cualquier otra señal educativa medible y justificada.

No todos los Temas necesitan las mismas métricas.

### 11.6 Preparar los datos para análisis futuro

Siempre que una prueba o actividad tenga varios objetivos, las respuestas deben conservar una identificación suficientemente estable del **bloque/foco/concepto** para permitir posteriormente agrupar evidencias.

Ejemplo conceptual:

```text
Tema: Fracciones
Actividad: prueba-final
Respuesta
├── preguntaId
├── bloqueId / foco
├── correcta
└── datos educativos útiles
```

La evidencia debe permitir responder preguntas como:

- ¿qué concepto se observó?;
- ¿en qué actividad?;
- ¿cuándo?;
- ¿qué ocurrió?;
- ¿es comparable con otra evidencia?;
- ¿la señal sigue apareciendo en lo más reciente?;
- ¿hay evidencia suficiente para sugerir una acción?;

### 11.7 Diseñar para decisiones, no para acumular datos

La obligación de generar evidencia **no autoriza telemetría indiscriminada**.

Antes de guardar un dato debe existir una utilidad posible para:

- retroalimentación inmediata;
- revisión familiar;
- análisis educativo;
- evolución;
- fortalecimiento;
- o mejora del producto.

No se almacenarán métricas solo porque técnicamente sea posible obtenerlas.

### 11.8 Vista previa

La Vista previa sigue siendo una excepción deliberada de escritura:

> **Vista previa no genera sesión, evidencia, progreso ni cambio de estado.**

La regla “todo Tema genera evidencia” significa **durante una ejecución normal de aprendizaje**, no durante una inspección o prueba administrativa en Vista previa.

### 11.9 Resultado histórico

Consultar una evidencia existente es solo lectura.

Abrir un resultado histórico:

- no genera otra evidencia;
- no duplica la sesión;
- no altera estadísticas;
- no modifica la Misión.

---

## 🔄 12. Del reporte a una acción de fortalecimiento

El ciclo aprobado es:

```text
EVIDENCIA
↓
OBSERVACIÓN
↓
SEÑAL REPETIDA / COMPARACIÓN VÁLIDA
↓
PROPUESTA DE ACTUACIÓN
↓
REVISIÓN FAMILIAR
↓
FORTALECIMIENTO
↓
NUEVA EVIDENCIA
↓
NUEVA OBSERVACIÓN
```

### 12.1 Una propuesta no equivale a una Misión

El reporte puede sugerir una actuación sin crear una Misión.

Una Misión se utiliza cuando resulte útil orquestar, hacer visible y seguir esa acción dentro de Mi Camino.

### 12.2 Mínimo refuerzo eficaz

La propuesta debe apuntar al foco concreto observado.

Preferir:

```text
foco concreto
→ actividad nueva y breve
→ nueva oportunidad de aplicación
```

antes que:

```text
señal localizada
→ repetir todo el Tema completo
```

### 12.3 Cierre del ciclo

Una actividad de fortalecimiento debe poder producir nueva evidencia compatible para comprobar si la señal:

- continúa;
- disminuye;
- desaparece;
- cambia de forma;
- o necesita más observaciones.

Así, el fortalecimiento no es un callejón sin salida; vuelve a alimentar el ciclo educativo.

---

## 🧠 13. Separación entre estadísticas y juicio educativo

Una estadística resume registros; no define a una persona.

Ejemplos de métricas aceptables cuando existen datos reales:

- número de sesiones;
- proporción de correctas;
- intentos adicionales;
- número de pistas;
- cambio entre sesiones comparables;
- frecuencia de una señal en historias distintas.

Ejemplos de conclusiones no permitidas por derivación automática:

- “nivel intelectual”;
- “capacidad matemática”;
- “atención baja”;
- “problema de comprensión” como diagnóstico;
- “siempre falla”;
- “nunca aprende”.

El reporte puede señalar un comportamiento observado, por ejemplo:

> “En el período, dos historias distintas necesitaron intentos adicionales al elegir la operación.”

No debe convertirlo en:

> “Tiene dificultad permanente para elegir operaciones.”

---

## ⚠️ 14. Calidad y limitaciones de datos

### 14.1 Datos incompletos

Si una actividad histórica no registraba cierta métrica, la V1 no debe rellenarla artificialmente.

### 14.2 Recursos heredados

Los recursos antiguos que no producen sesiones estructuradas pueden seguir siendo válidos para aprender, pero no aportarán el mismo nivel de evidencia estadística que los nuevos Temas.

### 14.3 Comparabilidad

Dos ejecuciones solo deben compararse cuando las métricas representen fenómenos razonablemente equivalentes.

El hecho de compartir una fecha, materia o porcentaje no basta por sí solo.

### 14.4 Borrado de datos de prueba

Las evidencias generadas únicamente durante pruebas técnicas pueden distorsionar estadísticas.

La herramienta de limpieza de datos de prueba debe utilizarse cuando proceda para evitar que esos registros se interpreten como actividad educativa real.

No se debe “compensar” estadísticamente un dato de prueba conocido; si puede identificarse y eliminarse de forma segura, debe mantenerse limpio el origen de datos.

---

## 🧩 15. Integración con el Modo de Incorporación Curricular

Cuando la familia proporciona:

```text
material escolar
+ curso
+ materia
+ nombre del Tema
+ notas opcionales
```

la AI Collaborator debe considerar automáticamente dentro del trabajo de incorporación:

1. dónde corresponde el Tema dentro de `Curso → Asignatura → Tema`;
2. qué estructura existente debe reutilizarse;
3. qué carpetas/archivos deben crearse si realmente son necesarios;
4. qué experiencia de comprensión/práctica/comprobación es adecuada;
5. qué evidencia académica útil generará el Tema;
6. qué identificadores de bloque/foco permitirán analizarla después;
7. cómo se integrará con Misiones cuando aplique;
8. cómo se consultará el resultado histórico;
9. cómo podrá participar en Análisis Educativo;
10. cómo podrá originar propuestas de fortalecimiento cuando exista señal suficiente;
11. cómo se comportará Vista previa sin escrituras;
12. qué pruebas técnicas y funcionales deben realizarse;
13. y qué documentación debe actualizarse al cerrar.

La familia no debe tener que diseñar manualmente ninguno de esos contratos en cada nuevo Tema.

---

## ✅ 16. Criterios de aceptación del Análisis Educativo

### Acceso y contexto

- [ ] Analiza la Persona Activa correcta.
- [ ] Respeta el nivel de acceso de Gestión de Misiones.
- [ ] No crea un sistema paralelo de usuarios/permisos.

### Filtros

- [ ] Permite 1, 2 y 3 meses y rango personalizado.
- [ ] Permite seleccionar Motor / Área.
- [ ] Tema / Foco se construye desde datos reales del período.
- [ ] Cambiar filtros vuelve a renderizar el reporte sin generar evidencias.

### Fuentes

- [ ] Detectives usa sus sesiones reales.
- [ ] Pruebas académicas usa sesiones académicas reales.
- [ ] Rincón de Lectura usa sesiones reales.
- [ ] Un fallo parcial se comunica como datos parciales.

### Interpretación

- [ ] No inventa métricas no disponibles.
- [ ] Repetición y comparabilidad están explícitamente definidas.
- [ ] Una señal aislada no se presenta como patrón permanente.
- [ ] Fortalezas y aspectos a reforzar describen evidencias.
- [ ] No existen etiquetas clínicas o de capacidad.

### Evolución y mejoras

- [ ] Una tendencia requiere evidencia mínima comparable.
- [ ] Una mejora personal compara al alumno consigo mismo.
- [ ] No existen rankings ni comparación entre alumnos.

### Actuaciones

- [ ] Las propuestas se relacionan con evidencia observable.
- [ ] Se prefieren ejercicios nuevos y focalizados.
- [ ] La familia controla una eventual Misión de refuerzo.
- [ ] La actividad de fortalecimiento puede volver a producir evidencia.

### Nuevos Temas Académicos

- [ ] Todo Tema nuevo de 6.º genera evidencia académica estructurada en ejecución normal.
- [ ] Reutiliza el contrato compartido antes de crear persistencia propia.
- [ ] Conserva identidad estable de curso/materia/tema/actividad.
- [ ] Sus datos incluyen focos/bloques suficientemente analizables cuando el contenido los tenga.
- [ ] La evidencia puede ser consumida por reportes y fortalecimiento sin conocer detalles privados del Tema.
- [ ] Vista previa no escribe evidencia.
- [ ] Histórico es solo lectura.

---

## 🛠️ 17. Estado de implementación al 03/09/2026

### ✅ Implementado y validado

La V1 dispone de:

1. pestaña `📊 Análisis educativo` dentro de Gestión de Misiones;
2. períodos de 1, 2, 3 meses y personalizado;
3. filtros por Motor / Área;
4. filtro Tema / Foco dependiente de datos reales;
5. integración de Detectives;
6. integración de Pruebas Académicas;
7. integración de Rincón de Lectura;
8. fortalezas observadas;
9. aspectos a reforzar;
10. evolución temporal cuando hay al menos cuatro observaciones comparables;
11. tratamiento específico de intentos;
12. pistas/ayudas sin mezclar métricas incompatibles;
13. mejoras personales observables;
14. propuestas de actuación;
15. mensajes de ausencia de datos;
16. advertencia de carga parcial;
17. Persona Activa;
18. lenguaje explícitamente descriptivo y no etiquetador.

### 📌 Contrato aprobado para expansión curricular

Desde el 03/09/2026 se considera requisito de diseño para nuevos Temas de 6.º:

> **producir evidencia académica estructurada, analizable y reutilizable por el ciclo de reporte y fortalecimiento.**

Este requisito deberá aplicarse en cada incorporación curricular nueva; no implica migrar masivamente los recursos heredados de 5.º.

### 🔄 Evolución futura posible

Solo cuando la evidencia real lo justifique, podrán estudiarse:

- nuevos Motores / Áreas;
- mejores criterios longitudinales;
- integración más directa entre propuesta de actuación y preparación de Misión;
- visualizaciones estadísticas adicionales;
- análisis por materia/curso transversal;
- nuevos tipos de evidencia no basados en correcto/incorrecto;
- criterios más ricos de ayudas;
- exportación o resumen familiar;
- períodos más amplios;
- y evolución del contrato común de evidencia.

No se debe anticipar un framework complejo sin casos reales que lo requieran.

---

## 📌 18. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| AE-001 | El reporte describe evidencias y tendencias; no etiqueta ni diagnostica al alumno. | Aprobada y validada |
| AE-002 | Una observación aislada no se convierte automáticamente en patrón longitudinal. | Aprobada y validada |
| AE-003 | Cada Motor conserva sus métricas semánticas; no se inventan equivalencias entre intentos, errores y pistas. | Aprobada y validada |
| AE-004 | Detectives confirma aspectos a reforzar mediante señal repetida en al menos dos historias distintas; los intentos adicionales priorizan la intensidad. | Aprobada y validada |
| AE-005 | Las pistas de Detectives se mantienen separadas de los intentos en la V1. | Aprobada y validada |
| AE-006 | En Pruebas Académicas, un aspecto a reforzar requiere al menos dos errores del grupo y que la sesión más reciente todavía mantenga la señal. | Aprobada y validada |
| AE-007 | Las tendencias V1 requieren al menos cuatro observaciones/sesiones comparables antes de comparar mitades del período. | Aprobada y validada |
| AE-008 | Las mejoras personales comparan ejecuciones del propio alumno; no existen rankings. | Aprobada y validada |
| AE-009 | Las propuestas de actuación son insumos; la familia conserva el control de una eventual Misión de fortalecimiento. | Aprobada |
| AE-010 | Todo nuevo Tema Académico de 6.º debe producir evidencia académica estructurada en una ejecución normal. | Aprobada |
| AE-011 | La evidencia académica existe también en acceso libre; la evidencia de Misión se añade solo cuando existe Misión y referencia la sesión. | Aprobada |
| AE-012 | Los nuevos Temas reutilizarán `sesion-academica-v1` y no crearán esquemas privados salvo evolución justificada del contrato común. | Aprobada |
| AE-013 | La evidencia de un nuevo Tema debe poder ser utilizada por análisis estadístico/educativo y por propuestas de fortalecimiento. | Aprobada |
| AE-014 | Todo Tema con varios objetivos debe conservar focos/bloques suficientemente estables para que las evidencias puedan agruparse posteriormente. | Aprobada |
| AE-015 | Vista previa y consulta histórica no generan nuevas evidencias ni alteran estadísticas. | Aprobada y validada |

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Pregunta resuelta** | Cómo convertir evidencias reales de aprendizaje en observaciones, tendencias y acciones de fortalecimiento útiles sin etiquetar al alumno. |
| **Unidad humana** | Persona Activa. |
| **Fuentes V1** | Detectives, Pruebas Académicas y Rincón de Lectura. |
| **Principio** | Evidencia → observación → tendencia prudente → propuesta; nunca evidencia aislada → etiqueta. |
| **Comparación** | El alumno consigo mismo y solo entre observaciones razonablemente comparables. |
| **Nuevos Temas** | Todo nuevo Tema de 6.º debe generar evidencia académica estructurada y reutilizable. |
| **Persistencia** | Reutilizar contratos compartidos; evitar esquemas privados por Tema. |
| **Fortalecimiento** | Las evidencias deben poder alimentar propuestas de actuación y nuevas experiencias de práctica/refuerzo. |
| **Control** | La familia decide la activación de acciones/Misiones cuando corresponda. |
| **Estado** | Activo; V1 implementada y contrato de evidencia para expansión curricular aprobado el 03/09/2026. |