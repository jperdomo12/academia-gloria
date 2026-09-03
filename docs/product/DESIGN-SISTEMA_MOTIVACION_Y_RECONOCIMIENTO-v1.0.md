# 🌈 Academia Gloria Valentina
# 🏅 Diseño — Sistema de Motivación y Reconocimiento

| Campo | Valor |
|---|---|
| **Ruta oficial actual** | `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` |
| **Versión del documento** | 1.1 |
| **Estado** | Activo |
| **Fecha inicial** | 01/09/2026 |
| **Última actualización** | 03/09/2026 |
| **Responsables** | Juan Perdomo + Arquitectura colaborativa con IA |
| **Ámbito** | Motivación, Reconocimientos, Guacamayas, Lía, Récord Personal, Retos cooperativos y su integración con Mi Camino |

> **Nota sobre el nombre del archivo:** el nombre conserva por compatibilidad la convención histórica `-v1.0`. La versión documental vigente está dentro del documento. Una futura normalización de nombres deberá actualizar referencias de forma controlada y no mediante copias paralelas.

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Gobierna:** dignidad, propósito y acompañamiento humano. |
| `docs/standards/STD-SEGUIMIENTO_Y_MOTIVACION.md` | **Gobierna:** reglas transversales de seguimiento y motivación. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna:** posición del dominio dentro de la experiencia global. |
| `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` | **Gobierna:** identidad visual y papel de personajes. |
| `docs/vision/07_IDENTIDAD_GUACAMAYAS.md` | **Fundamenta:** significado de las Guacamayas. |
| `docs/vision/08_MI_CAMINO.md` | **Complementa:** hogar visible del recorrido personal. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Complementa:** Misiones como fuentes de hechos/reconocimientos. |
| `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` | **Separa:** análisis educativo y motivación comparten evidencia, pero no son el mismo dominio. |
| `compartido/api/reconocimientos.js` | **Implementa:** API actual de Reconocimientos humanos y Guacamayas. |
| `mi-universo/mi-camino/reconocimientos-camino.js` | **Implementa:** presentación y reglas derivadas de Reconocimientos en Mi Camino. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 03/09/2026 | Juan Perdomo + IA | Sincroniza el diseño con la implementación real posterior al rc1. Declara A1 y A2 implementadas, B1 implementada para Detectives, B2 implementada para Constancia/transparencia, guía visual para Gloria y marca/filtro de Recompensa en Gestión. Mantiene Récord Personal, Reto cooperativo y mecánica Semilla/Brote/Árbol como evoluciones diseñadas todavía no implementadas. Actualiza el modelo físico real, Persona Activa, eliminación, datos de prueba y fronteras de seguridad. |
| 1.0-rc1 | 01/09/2026 | Juan Perdomo + IA | Consolidación fundacional previa a implementación: cinco pilares, cuatro mecanismos, seis Guacamayas, reglas de alta confianza para Lía, diseño de Récord Personal, seguridad, datos de prueba y plan incremental A1–E. |

---

## 🎯 0. Resumen ejecutivo

El Sistema de Motivación y Reconocimiento **no es una capa decorativa ni una economía de premios**.

Su propósito es ayudar a que el alumno:

- quiera aprender;
- perciba progreso verdadero;
- pueda volver después de una dificultad;
- desarrolle autonomía;
- normalice pedir ayuda;
- conserve una historia positiva y verdadera de su crecimiento.

Se apoya en cinco pilares:

1. **QUIERO** — autonomía y sentido.
2. **PUEDO** — competencia y progreso visible.
3. **PERTENEZCO** — vínculo y acompañamiento.
4. **ME SUPERO** — perseverancia y recuperación.
5. **MI CAMINO IMPORTA** — identidad, memoria y significado.

El modelo conceptual contempla cuatro mecanismos:

- ✨ **Reconocimiento** de Lía o de la familia;
- 🏅 **Récord Personal** contra una marca propia comparable;
- 🦜 **Guacamaya** como hito especial y permanente;
- 🤝 **Reto cooperativo** Gloria + familia.

### Interpretación correcta de “Recompensas v1 · Listo”

Al 03/09/2026 existe una **primera capacidad operativa completa y usable** de Motivación/Reconocimiento.

Eso significa que el bloque de producto **Recompensas v1** puede considerarse cerrado como primera entrega funcional.

No significa que todas las fases conceptuales A–E estén programadas.

| Bloque | Estado 03/09/2026 |
|---|:---:|
| A1 · Reconocimiento humano | ✅ Implementado y validado |
| A2 · Guacamayas humanas | ✅ Implementado y validado |
| B1 · Lía automática en Detectives | ✅ Implementado y validado |
| B2 · Constancia + transparencia motivacional | ✅ Implementado y validado |
| Guía visual para Gloria | ✅ Implementada y validada |
| Marca/filtro `🏅 Recompensa` en Gestión | ✅ Implementado y corregido |
| C · Récord Personal | ⏳ Diseñado · no implementado |
| D · Reto cooperativo | ⏳ Diseñado · no implementado |
| E · Mecánica Semilla/Brote/Árbol | ⏳ Diseñada conceptualmente · no implementada |

La representación **Semilla → Brote → Árbol** ya puede aparecer como lenguaje visual de crecimiento, pero eso no equivale a disponer de una mecánica automática que cambie etapas.

---

## 💛 1. Propósito

La meta no es que el alumno haga cosas para recibir premios.

La meta es favorecer progresivamente que:

- quiera comenzar;
- quiera continuar;
- pueda volver a intentarlo;
- perciba que puede mejorar;
- desarrolle confianza y autonomía;
- descubra intereses propios;
- pida ayuda sin vivirlo como fracaso;
- acepte que equivocarse forma parte del aprendizaje;
- se compare principalmente consigo mismo;
- y quiera regresar a la Academia porque la experiencia tiene sentido.

> **La recompensa visible es una herramienta. La meta real es construir deseo de aprender, confianza para actuar y capacidad para continuar después de una dificultad.**

---

## 🧠 2. Base profesional preservada

El diseño original se fundamentó en referencias profesionales sobre:

- Self-Determination Theory;
- elogio/feedback;
- recompensas externas;
- metas de dominio;
- TEL/TDL/DLD y necesidad de evitar presión innecesaria.

### 2.1 Autonomía, competencia y pertenencia

El diseño prioriza:

```text
quiero + puedo + pertenezco
```

sobre:

```text
debo hacerlo para que me den algo
```

### 2.2 Feedback específico

Preferir:

> “Esta vez volviste a leer la pregunta y seguiste pensando.”

Evitar como patrón:

> “Eres la mejor.”

> “Eres súper inteligente.”

La Academia reconoce **hechos, procesos, estrategias y progreso**, no etiquetas fijas.

### 2.3 Recompensa informativa, no controladora

Los símbolos deben funcionar principalmente como:

- información sobre progreso;
- memoria de un hito;
- señal de pertenencia;
- reconocimiento de un proceso valioso.

No como pago por obediencia.

### 2.4 TEL/TDL

Implicaciones de producto:

- reglas comprensibles;
- mensajes breves;
- ayudas visibles;
- ausencia de amenaza de pérdida;
- posibilidad de repetir;
- tiempo suficiente;
- elección cuando sea real;
- seguridad para equivocarse.

La Academia no diagnostica ansiedad, regulación emocional, autoestima ni progreso clínico.

---

## 🧭 3. Cinco pilares

### QUIERO — Autonomía y sentido

El alumno comprende para qué sirve una actividad y elige cuando la elección es auténtica.

### PUEDO — Competencia y progreso visible

La mejora se hace visible sin exigir perfección.

### PERTENEZCO — Relación y acompañamiento

Familia y Lía acompañan sin convertir la experiencia en vigilancia.

### ME SUPERO — Perseverancia y recuperación

Se reconoce continuar, volver, pedir ayuda y enfrentarse a una dificultad.

### MI CAMINO IMPORTA — Identidad y memoria

Los momentos importantes forman una historia personal.

Una recompensa duradera debe poder responder:

> **¿Qué ocurrió para que esto forme parte de mi camino?**

Nunca:

> “Porque acumulaste 500 puntos.”

---

## 🚫 4. Reglas no negociables

El Sistema NO utiliza como patrón:

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
- recompensa por hacer clic;
- premio garantizado por cada actividad;
- culpa;
- cuenta atrás artificial;
- catálogo bloqueado de premios;
- botón “reclamar premio”;
- comparación pública;
- afirmaciones clínicas;
- recompensas basadas en datos de prueba.

Una recompensa correctamente concedida no se retira como disciplina.

Una corrección administrativa no equivale a “perder” una recompensa.

---

## ✨ 5. Reconocimiento

Reconoce un hecho concreto y valioso.

Puede provenir de:

- **familia**, cuando el significado necesita contexto humano;
- **Lía**, solo cuando datos observables sostienen exactamente el mensaje.

Ejemplos:

> “Una respuesta necesitó más de un intento y seguiste pensando.”

> “Tu familia quiso guardar este momento porque vio algo importante en tu esfuerzo.”

### Estado

✅ **Operativo**.

La implementación A1 permite Reconocimiento humano sobre Misiones completadas reales.

Contrato actual:

- Persona Activa;
- un Reconocimiento humano principal por Misión en esta versión;
- mensaje editable;
- categoría;
- fuente Misión;
- fecha del hecho y del reconocimiento;
- auditoría;
- exclusión de datos de prueba.

---

## 🦜 6. Guacamayas

Una Guacamaya es un **hito de alto significado**.

No es:

- moneda;
- premio rutinario;
- nivel;
- catálogo que deba completarse;
- indicador de perfección;
- superioridad.

### 6.1 Catálogo V1

| Guacamaya | Qué representa |
|---|---|
| 🦜 **Valiente** | Recuperarse tras una dificultad real y volver/continuar. |
| 🦜 **Alas Propias** | Hito de autonomía, independencia o responsabilidad creciente. |
| 🦜 **Curiosa** | Querer descubrir, leer o aprender con iniciativa y significado. |
| 🦜 **Pensadora** | Analizar, revisar un error o probar una estrategia significativa. |
| 🦜 **de Equipo** | Cooperación real con aportes diferentes. |
| 🦜 **de Crecimiento** | Descubrimiento importante sobre sí misma o una habilidad para la vida. |

### 6.2 Unicidad V1

> Cada categoría de Guacamaya se concede como máximo una vez por Persona.

Es una decisión de V1 para proteger significado, no una ley eterna.

### 6.3 Autoridad

Actualmente la concesión es humana y explícita.

Convertir un Reconocimiento en Guacamaya exige confirmación adicional.

### 6.4 Presentación

Gloria ve solo las Guacamayas realmente obtenidas.

No ve:

- siluetas bloqueadas;
- `2/6`;
- “faltan 4”;
- requisitos para desbloquear.

### Estado

✅ **A2 implementada y validada.**

---

## 🏅 7. Récord Personal

Hace visible una mejora respecto de experiencias anteriores **comparables**.

> **Un Récord Personal debe demostrarse con datos reales y una línea base válida.**

No se asigna manualmente.

No utilizar para:

- actividades no equivalentes;
- primera ejecución sin baseline;
- reconocimiento de voz no fiable;
- “mejor emoción”;
- rapidez por defecto;
- comparación con otros.

### 7.1 Diseño aprobado para Detectives

Comparabilidad conservadora prevista:

- mismo nivel;
- mismo tipo/estructura comparable;
- referencia anterior válida;
- preferencia/requisito de otra historia para reducir efecto memoria.

Récords diseñados:

- menos pistas;
- menos intentos adicionales.

“Menos pistas” significa **progreso personal**, no prueba automática de autonomía.

### Estado

⏳ **Diseñado, todavía no implementado.**

No mostrar `Mi mejor marca reciente` como dato real hasta disponer de un Récord implementado y válido.

---

## 🤝 8. Reto cooperativo

Busca reforzar pertenencia y colaboración.

Un reto cooperativo requiere aportes reales y diferentes de Gloria y familia.

La validación administrativa de una Misión no constituye cooperación.

### Estado

⏳ **Concepto diseñado; primer reto concreto pendiente.**

La Guacamaya de Equipo ya existe como categoría humana, pero eso no demuestra que el motor de Retos cooperativos esté implementado.

---

## 🤖 9. Reconocimientos automáticos de Lía

### 9.1 Principio de alta confianza

Lía automatiza poco.

Solo cuando el dato demuestra directamente lo que el mensaje afirma.

No automatizar:

- “eres más autónoma” sin medida;
- “cambiaste estrategia” sin registro;
- curiosidad/intención no observada;
- emociones;
- confianza;
- ansiedad;
- autoestima;
- rasgos permanentes.

### 9.2 B1 implementada · Detectives

Reglas reales:

#### `lia.detectives.ayuda_y_continuo`

Condición:

```text
sesión completada
+ pistasUtilizadas >= 1
```

Reconoce factual y brevemente que usó ayuda y continuó.

#### `lia.detectives.persistencia`

Condición:

```text
sesión completada
+ intentosAdicionales >= 2
+ no aplicó regla de mayor prioridad
```

Reconoce persistencia sin inferir emoción.

### 9.3 Arquitectura B1

Los Reconocimientos automáticos de Detectives **no son escrituras humanas falsas en la colección de reconocimientos**.

Mi Camino los deriva de sesiones reales elegibles.

Ventajas:

- evita conceder escritura automática al alumno sobre su historia motivacional;
- sin backfill histórico;
- si desaparece la fuente, desaparece la derivación;
- deduplicación determinista;
- no colección paralela.

### 9.4 Límites actuales del piloto

- máximo un Reconocimiento automático por sesión;
- prioridad ayuda > persistencia;
- descanso inicial de 7 días para repetir la misma regla;
- máximo 2 Reconocimientos automáticos de Lía por día;
- datos `🧪` excluidos;
- no backfill anterior a activación.

Estos números son **parámetros de experiencia**, no umbrales pedagógicos.

### 9.5 Reglas inicialmente diseñadas pero pospuestas

El rc1 contemplaba reglas automáticas para:

- reintento de comprensión en Lectura;
- práctica persistente en Palabras para Crecer.

Se posponen porque la fuente actual no sostiene todavía esas afirmaciones con suficiente confianza.

Esto es una aplicación correcta del principio:

> **si el dato no puede demostrarlo, no automatizarlo.**

---

## 🔥 10. B2 · Constancia y transparencia motivacional

### 10.1 Reconocimiento de constancia

Regla real:

```text
lia.constancia.7_dias
```

Se deriva exclusivamente de los mismos días reales utilizados por **Mi constancia**.

Características:

- exige 7 días consecutivos de actividad significativa;
- excluye siempre Misiones `🧪`;
- una racha continua de 14 días no duplica el hito de 7;
- una nueva racha independiente puede volver a producirlo;
- romper la racha no elimina el reconocimiento histórico;
- no backfill de hitos anteriores a la activación de la regla.

Mensaje base:

> “Durante 7 días seguidos encontraste un momento para aprender o avanzar. Lo importante no es hacerlo perfecto, sino seguir construyendo tu camino.”

### 10.2 Transparencia

Mi Camino incorpora:

```text
🌈 ¿Qué cosas celebra la Academia?
```

Explica al alumno, sin convertirlo en receta transaccional, que la Academia valora:

- constancia;
- seguir intentando;
- usar ayuda y continuar;
- reconocimientos familiares;
- Guacamayas como hitos especiales.

### Estado

✅ **B2 implementada y validada.**

---

## 🌈 11. Guía visual para Gloria

La experiencia visual `Las cosas bonitas que celebra la Academia` incorpora una primera página especialmente sencilla para Gloria y conserva explicación adicional como segunda capa.

Elementos conceptuales:

- Panda como guía;
- Guacamayas como hitos;
- Semilla → Brote → Árbol como lenguaje visual de crecimiento;
- Bosque como concepto visual/emocional de camino acumulado.

### Regla de interpretación

> **Panda guía; no es una recompensa.**

> **Guacamaya es hito; no moneda.**

> **Semilla/Brote/Árbol puede representar crecimiento visual sin constituir todavía una mecánica automática de niveles.**

### Estado

✅ Guía visual implementada.

⏳ Mecánica E de cambio de etapa todavía no implementada.

---

## 🌱 12. Mi Camino → Así voy creciendo

Es el hogar visible principal del sistema.

Debe responder:

1. ¿Qué he conseguido últimamente?
2. ¿Qué cosas especiales forman parte de mi historia?
3. ¿En qué noto que estoy creciendo?

Elementos que pueden aparecer **solo cuando existen realmente**:

- Reconocimientos familiares;
- Reconocimientos derivados de Lía;
- Guacamayas obtenidas;
- Constancia;
- Récord Personal futuro cuando esté implementado;
- Reto cooperativo futuro cuando exista.

No es una vitrina de premios.

---

## 👨‍👩‍👧 13. Flujo familiar

En Gestión de Misiones, una Misión completada real puede ofrecer:

```text
🌟 Añadir reconocimiento
```

La familia selecciona:

- categoría;
- mensaje;
- opcionalmente Guacamaya.

Categorías actuales:

- perseverancia;
- autonomía;
- curiosidad;
- pensamiento;
- equipo;
- crecimiento;
- progreso;
- otro.

Regla V1:

> una Misión tiene como máximo un Reconocimiento humano principal activo.

La familia puede editarlo o elevarlo a Guacamaya.

---

## 🗃️ 14. Modelo físico implementado

Colección actual:

```text
usuarios/{userIdPersonaActiva}/reconocimientos/{reconocimientoId}
```

Para Reconocimiento humano por Misión se utiliza un ID determinista:

```text
mision__{misionId}
```

Campos reales principales de A1/A2:

```text
schemaVersion
userIdPersona
tipo                 // reconocimiento | guacamaya
categoria
titulo
mensaje
origen               // humano
fuentePrincipal
  tipo
  id
  misionId
  modulo
fuenteEliminada
estado               // activo
visibleAlumno
fechaHecho
fechaReconocimiento
createdAt
createdBy
updatedAt
updatedBy

guacamayaTipo?
guacamayaNombre?
guacamayaDescripcion?
fechaGuacamaya?
fuenteSnapshot?       // si la fuente fue eliminada y el hito se conserva
```

### Modelo conceptual futuro

El diseño conserva capacidad conceptual para:

- `record_personal`;
- `reto_cooperativo`;
- dependencias múltiples;
- datos de comparación;
- estados de propuesta/anulación cuando una futura fase los necesite.

No declarar esos campos como persistencia real si todavía no existen en la implementación.

---

## 👤 15. Persona Activa y autoridad

Los Reconocimientos operan sobre el `userId` asociado a la **Persona Activa**.

### Alumno

Puede ver lo que le corresponda.

No puede:

- crear Reconocimiento humano;
- concederse Guacamayas;
- modificar mensajes familiares;
- ejecutar correcciones administrativas.

### Gestión relacionada / familia

Puede, según permisos:

- crear/editar Reconocimiento humano;
- conceder Guacamaya;
- revisar fuentes;
- realizar correcciones autorizadas.

### Administrador

Gestión/corrección conforme al modelo global.

### Regla crítica

> **Ocultar un botón no es seguridad.**

Firestore Rules y APIs deben sostener la frontera real.

---

## 🧪 16. Datos de prueba

Principio:

> **Los datos de prueba se comportan como datos reales para validar funcionalidad, pero no como logros reales para medir a Gloria.**

Por ello:

- una Misión `esDatoPrueba=true` no puede generar Reconocimiento humano;
- las reglas derivadas excluyen Misiones de prueba;
- Mi constancia excluye Misiones de prueba;
- marcar posteriormente una fuente como prueba hace que un Reconocimiento derivado deje de presentarse si su regla depende de esa elegibilidad;
- la limpieza de datos de prueba debe eliminar fuentes exactas, no usar heurísticas por fecha.

---

## 🗑️ 17. Eliminación y correcciones

### Reconocimiento humano / Guacamaya vinculada a Misión

Si se elimina una Misión fuente, la historia puede conservarse como hito humano con:

```text
fuenteEliminada = true
fuenteSnapshot = {
  titulo,
  modulo,
  fechaHecho
}
```

No se finge que la Misión todavía existe.

### Guacamaya incorrecta

Existe corrección administrativa para eliminar una Guacamaya/Reconocimiento concreto con confirmación reforzada.

Eliminar la Guacamaya:

- no elimina automáticamente la Misión;
- no elimina sus evidencias;
- libera la categoría para un hito futuro.

Esto es **corrección administrativa**, no pérdida motivacional.

### Derivados

Un reconocimiento derivado depende de su fuente real; si la fuente deja de sostener el hecho, no debe seguir afirmándose como verificable.

---

## 🏷️ 18. Integración con Gestión de Misiones

Una Misión reconocida puede mostrar:

```text
🏅 Recompensa
```

Gestión dispone de filtro específico compatible con:

- Estado;
- Tipo/Tema;
- `🧪 Pruebas`;
- paginación.

Regla de implementación validada:

> el filtro Recompensa opera sobre el conjunto real de Misiones reconocidas, no solamente sobre la página actual del paginador.

---

## 🗣️ 19. Lenguaje y salvaguardas TEL/TDL

Patrón recomendado:

```text
QUÉ OCURRIÓ
+ POR QUÉ IMPORTA
+ próximo paso suave solo si aporta
```

Mensajes:

- breves;
- una idea central;
- específicos;
- explicables;
- sin subordinadas innecesarias;
- con detalle opcional separado.

### Ayuda normalizada

Pedir ayuda puede coexistir con progreso.

No afirmar:

> “Ya no necesitas ayuda.”

solo porque una ejecución usó menos pistas.

### Ritmo propio

No premiar rapidez sistemáticamente.

### Sin etiquetas

No:

> “Gloria es ansiosa.”

> “Gloria tiene poca perseverancia.”

Sí:

> “En esta actividad necesitaste varios intentos y continuaste hasta terminar.”

---

## 📖 20. Lectura, curiosidad y otros motores

La capa de Reconocimientos puede crecer hacia otros motores, pero únicamente cuando la señal sea fiable.

Hechos potencialmente valiosos:

- volver para comprender mejor;
- elegir una lectura;
- practicar una palabra;
- expresar una reflexión;
- descubrir un Tema;
- compartir un libro.

Muchos requieren contexto humano porque el sistema no puede distinguir todavía intención y obligación con suficiente certeza.

No premiar “más páginas” como regla automática por defecto.

---

## ⚠️ 21. Limitaciones conocidas

### Detectives

Fortaleza:

- sesiones independientes;
- intentos;
- pistas;
- datos comparables.

Es la fuente actual de reglas automáticas B1 y sigue siendo candidato natural para Récord Personal futuro.

### Rincón de Lectura

Parte del registro puede reutilizar el mismo documento por historia.

Consecuencia:

- no reconstruir retrospectivamente intenciones inexistentes;
- no crear Récords de lectura sin histórico comparable.

### Palabras para Crecer

Errores técnicos de reconocimiento pueden contaminar la lectura de “intentos”.

No convertir fallos del navegador en desempeño del alumno.

### Creciendo por Dentro

Tiene significado personal sensible.

Predominio humano para Reconocimientos.

No inferir automáticamente:

- ansiedad;
- autoestima;
- valentía;
- autoconocimiento;
- “mejor respuesta emocional”.

---

## 🐼 22. Papel de Lía, Panda y familia

### Lía

Puede:

- reconocer un hecho observable cuando existe una regla aprobada;
- explicar brevemente;
- acompañar.

No puede:

- inventar progreso;
- diagnosticar;
- atribuir intención no registrada;
- comparar con otros;
- retirar recompensas;
- convertir toda sesión en celebración.

### Panda

Es guía visual/pedagógica de la explicación de crecimiento.

No es una categoría de recompensa.

### Familia

Aporta contexto humano que los datos no conocen.

Puede:

- reconocer una Misión real;
- escribir un mensaje;
- conceder Guacamaya;
- revisar historia;
- decidir futuras acciones.

---

## 🛡️ 23. Riesgo de sobre-recompensa

Señales cualitativas para revisar el producto, no al alumno:

- preguntar sistemáticamente “¿qué me dan?” antes de comenzar;
- rechazar actividades sin recompensa visible;
- decepción frecuente si una actividad no produce reconocimiento;
- interés centrado en acumular símbolos;
- negociación externa creciente alrededor de cada Misión.

Respuesta de producto:

- reducir frecuencia/intensidad;
- mejorar feedback informativo;
- aumentar sentido/elección;
- reforzar curiosidad;
- revisar qué estamos celebrando.

> **Nunca responder creando más premios para mantener artificialmente el interés.**

---

## 🚦 24. Estado de implementación por fase

### ✅ A1 — Fundamento humano

Implementado:

- API de Reconocimientos;
- Persona Activa;
- permisos;
- Reconocimiento sobre Misión completada;
- `Así voy creciendo`;
- historia básica;
- auditoría;
- datos de prueba;
- integración con eliminación.

### ✅ A2 — Guacamayas humanas

Implementado:

- seis categorías;
- elevar Reconocimiento a Guacamaya;
- unicidad por categoría;
- solo Guacamayas obtenidas;
- acceso a fuentes para gestión;
- preservación histórica al eliminar Misión.

### ✅ B1 — Lía automática · Detectives

Implementado:

- ayuda + continuar;
- persistencia por intentos adicionales;
- deduplicación/frecuencia;
- exclusión de pruebas;
- derivación segura sin escritura humana falsa.

### ✅ B2 — Constancia y transparencia

Implementado:

- reconocimiento de 7 días;
- guía “¿Qué cosas celebra la Academia?”;
- progreso visible hacia constancia usando fuente real.

### ✅ B2 visual complementaria

Implementado:

- guía visual para Gloria;
- Panda;
- Semilla/Brote/Árbol como explicación visual;
- Bosque como concepto visual;
- `🏅 Recompensa` en Gestión y filtro asociado.

### ⏳ C — Récord Personal

Diseñado para Detectives; no implementado.

### ⏳ D — Reto cooperativo

Concepto aprobado; no implementado.

### ⏳ E — Mecánica de crecimiento

Concepto Semilla/Brote/Árbol aprobado como lenguaje visual.

La mecánica para determinar cambio de etapa todavía no está implementada y **no debe reducirse a `X puntos = etapa`**.

---

## ✅ 25. Criterios de éxito

No medir éxito solo por:

- clics;
- tiempo de pantalla;
- sesiones;
- cantidad de recompensas.

Buscar que:

- el alumno comprenda por qué aparece un Reconocimiento;
- lo relacione con un hecho real;
- una Guacamaya conserve significado;
- pueda hablar de progreso propio;
- pedir ayuda no sea derrota;
- equivocarse no amenace lo conseguido;
- la familia pueda aportar significado humano;
- exista interés por volver;
- la capa motivacional no distraiga del aprendizaje.

---

## 🔄 26. Revisión con uso real

Revisar periódicamente:

- frecuencia de Reconocimientos;
- reacción ante sesiones sin recompensa;
- comprensión de mensajes;
- valor percibido de Guacamayas;
- uso familiar de Reconocimiento;
- señales de sobre-recompensa;
- idoneidad del cooldown y límite diario;
- necesidad real de Récord Personal;
- necesidad real de Reto cooperativo;
- si la metáfora Semilla/Brote/Árbol aporta sin convertirse en presión.

No ampliar por completar un roadmap conceptual.

Ampliar porque el uso real demuestra valor.

---

## 📌 27. Decisiones consolidadas

1. Cinco pilares motivacionales.
2. Cuatro mecanismos conceptuales.
3. No rankings ni economía de puntos.
4. No pérdida de recompensas como castigo.
5. No recompensas por login/clic.
6. Seis Guacamayas iniciales.
7. Unicidad de Guacamaya por categoría en V1.
8. Solo Guacamayas obtenidas son visibles.
9. Reconocimiento humano puede aplicarse a una Misión real completada.
10. Datos de prueba quedan fuera de motivación real.
11. Lía automatiza únicamente señales de alta confianza.
12. Detectives dispone de B1 real.
13. Constancia de 7 días dispone de B2 real.
14. No backfill automático masivo.
15. Mi Camino → Así voy creciendo es hogar principal.
16. Panda es guía, no recompensa.
17. Guacamaya es hito, no moneda.
18. Semilla → Brote → Árbol es metáfora visual aprobada; su mecánica automática sigue pendiente.
19. Bosque es representación visual/emocional, no nivel competitivo.
20. Récord Personal sigue diseñado, no implementado.
21. Reto cooperativo sigue diseñado, no implementado.
22. Menos pistas debe interpretarse como progreso personal antes que inferir autonomía.
23. La UI no es frontera de seguridad.
24. Fuentes y dependencias deben mantener trazabilidad suficiente.
25. Si una fuente no puede demostrar una afirmación, la automatización se pospone.
26. La primera entrega Recompensas v1 está cerrada sin obligar a implementar todas las fases futuras del diseño.

---

## 📚 28. Referencias profesionales preservadas

Estas referencias orientaron el diseño inicial. No convierten la Academia en herramienta clínica.

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

## 🔎 29. Auditoría de coherencia V1.1

La sincronización al 03/09 confirma:

### Dato ≠ interpretación

- menos pistas = progreso observable;
- no prueba automática de autonomía.

### Significado humano ≠ automatización

- Guacamaya sigue requiriendo contexto humano en V1;
- Creciendo por Dentro no se automatiza por cantidad de grabaciones.

### Fuente débil = automatización pospuesta

- Lectura/Palabras no reciben todavía las reglas automáticas inicialmente imaginadas.

### Implementado ≠ diseñado

- A1/A2/B1/B2 son hechos reales;
- C/D/E continúan como diseño/evolución.

### Visual ≠ mecánica

- Semilla/Brote/Árbol puede explicar crecimiento aunque no exista algoritmo de etapas.

### Corrección ≠ castigo

- eliminar un Reconocimiento mal registrado es corrección administrativa, no pérdida educativa.

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Primera versión operativa** | Cerrada y disponible al 02/09/2026. |
| **Implementado** | A1, A2, B1 Detectives, B2 Constancia/transparencia, guía visual y soporte de Gestión. |
| **Diseñado / pendiente** | Récord Personal, Reto cooperativo y mecánica automática Semilla/Brote/Árbol. |
| **Hogar visible** | `Mi Camino → Así voy creciendo`. |
| **Datos** | Actividad/progreso real; `🧪` excluido. |
| **Comparación** | Principalmente con uno mismo y solo cuando sea válida. |
| **Guacamayas** | Hitos raros y significativos, nunca moneda. |
| **Lía** | Solo hechos observables de alta confianza. |
| **Familia** | Aporta significado humano y conserva control en decisiones de alto significado. |
| **Estado** | Activo · v1.1 · sincronizado al 03/09/2026. |

---

## 🌈 Declaración de diseño

> **El Sistema de Motivación y Reconocimiento no premia obediencia ni perfección. Hace visible crecimiento real.**
>
> Las Guacamayas conservan momentos especiales. Lía pone palabras breves a hechos observables. La familia aporta el significado humano que ningún algoritmo conoce por completo. Los futuros Récords solo existirán cuando una comparación pueda demostrarse y los Retos cooperativos solo cuando exista cooperación real.
>
> La recompensa nunca será la razón principal para aprender.
>
> **Aprender, descubrir, poder hacer más y construir una vida propia siguen siendo la verdadera aventura.**