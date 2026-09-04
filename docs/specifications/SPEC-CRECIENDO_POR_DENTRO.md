# 🌱 Creciendo por Dentro
## Especificación funcional · Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-CRECIENDO_POR_DENTRO.md` |
| **Código** | SPEC-CRECIENDO_POR_DENTRO |
| **Versión** | 1.2 |
| **Estado** | Activo |
| **Fecha de origen** | Agosto 2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Producto · Creciendo por Dentro |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Comportamiento funcional del módulo Creciendo por Dentro y su Motor de Semillas |

## 🔗 Documentos relacionados

| Documento / fuente | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Fundamenta:** propósito humano, dignidad, acompañamiento y límites no clínicos. |
| `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` | **Fundamenta/complementa:** principios estables de producto. |
| `docs/product/DESIGN-MOTOR_SEMILLAS-v1.0.md` | **Diseña:** decisiones de producto del Motor de Semillas. |
| `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md` | **Modela:** patrón Motor → sesión → evidencia. |
| `docs/standards/STD-LIA.md` | **Gobierna:** comportamiento transversal de Lía. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Gobierna:** Misiones, evidencia, finalización, revisión y Persona Activa. |
| `docs/standards/STD-SEGUIMIENTO_Y_MOTIVACION.md` | **Gobierna:** seguimiento y motivación no punitiva. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** Usuario, Persona Activa, relaciones y permisos. |
| `mi-universo/creciendo-por-dentro/` | **Implementa:** módulo actual. |
| `compartido/api/academia.js` | **Implementa:** persistencia de sesiones e integración con evidencias. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.2 | 04/09/2026 | Product Owner + AI Collaborator | P2. Activa la especificación contra el producto implementado. Corrige ruta/modelo relacionados, sustituye lenguaje de piloto futuro por estado real, alinea Semilla/Misión con STD-011, incorpora Persona Activa, catálogo `semillas.json`, sesión + evidencia, historial actual, límites de voz/privacidad y separa Jardín completo/backlog como evolución futura. |
| 1.1 | Agosto 2026 | Product Owner + AI Collaborator | Incorporó expresión oral, grabación, integración con Misiones, contenido configurable, historial e insumos del piloto. |
| 1.0 | Agosto 2026 | Product Owner + AI Collaborator | Primera definición integral de Creciendo por Dentro, Semillas y primera experiencia inspirada en DESC. |

---

## 🎯 1. Propósito

Definir **qué debe hacer Creciendo por Dentro**, qué experiencia ofrece al alumno y qué límites deben mantenerse al evolucionarlo.

El módulo acompaña la práctica de habilidades personales, comunicativas, emocionales y sociales mediante experiencias breves denominadas **Semillas**.

No es una herramienta clínica. No diagnostica, no interpreta psicológicamente a la Persona y no sustituye a familia, docentes, logopedas, psicólogos u otros profesionales.

---

## 🌿 2. Estado actual

Creciendo por Dentro está **implementado** dentro de:

```text
Mi Universo
└── 🌱 Creciendo por Dentro
```

La capacidad actual dispone de:

- catálogo configurable `semillas.json`;
- filtros por familia;
- acceso libre;
- acceso desde una Misión compatible mediante `misionId`;
- recorrido guiado por pasos;
- respuestas seleccionadas y respuestas propias;
- dictado de respuestas propias cuando el navegador lo permite;
- construcción de una frase/respuesta final;
- grabación y transcripción opcionales;
- repetición;
- persistencia de sesiones mediante `Academia.semillas`;
- evidencia `semilla_completada` cuando existe Misión válida;
- actualización de progreso de la Misión;
- historial de Semillas guardadas;
- Persona Activa;
- navegación compartida y retorno contextual;
- cierre positivo y celebración.

La existencia de ideas históricas como un Jardín Personal completo o informes longitudinales **no significa que estén implementadas**.

---

## 🧭 3. Principios funcionales

1. **No se evalúa a la Persona.** Una emoción, opinión o necesidad no se trata como correcta/incorrecta.
2. **Se guía sin imponer.** Se ofrecen estructura, ejemplos y opciones sin apropiarse de la voz del alumno.
3. **Una Semilla trabaja un propósito principal reconocible.**
4. **El alumno conserva control.** Puede repetir, volver, cambiar respuestas y salir sin mensajes punitivos.
5. **La voz es una vía de práctica, no una obligación.**
6. **La transcripción y métricas observables son educativas/orientativas, nunca diagnósticas.**
7. **El cierre reconoce práctica y esfuerzo, no “acierto emocional”.**
8. **La privacidad y el mínimo dato necesario son parte del diseño.**
9. **El módulo acompaña; no sustituye acompañamiento humano.**
10. **La experiencia debe invitar a regresar sin generar dependencia artificial.**

---

## 🌱 4. Concepto de Semilla

Una **Semilla** es una experiencia breve para practicar una habilidad personal, comunicativa, emocional o social.

Una Semilla puede contener:

- título y propósito;
- familia;
- situación;
- pasos;
- opciones y ayudas;
- nivel de apoyo;
- recursos visuales o auditivos;
- plantilla de respuesta cuando corresponde;
- cierre.

Una Semilla **no es**:

- examen;
- test psicológico;
- diagnóstico;
- clasificación de personalidad;
- recompensa;
- ranking.

### 4.1 Semilla y Misión

Una Semilla puede realizarse:

```text
libremente
```

o dentro del contexto de una:

```text
Misión / Tarea
```

En el modelo vigente, **Tarea y Misión son dos perspectivas de una misma asignación**, no una jerarquía obligatoria `Misión → Tarea`.

Cuando una Semilla pertenece a una Misión:

```text
Misión
  ↓ abre Creciendo por Dentro con contexto
Semilla realizada
  ↓
sesión guardada
  ↓
evidencia semilla_completada
  ↓
progreso / revisión de la Misión
```

La evidencia referencia la sesión; no debe copiar todo el contenido personal dentro de la Misión.

---

## 👤 5. Persona Activa y acceso

La experiencia opera sobre la **Persona Activa** autorizada.

Debe preservarse la diferencia entre:

```text
Usuario autenticado
Persona propia
Persona Activa
```

La sesión, historial y evidencia deben pertenecer al contexto correcto.

Un adulto relacionado puede consultar el trabajo únicamente conforme a su Relación/nivel y a las reglas de seguridad vigentes.

La UI no sustituye Firestore Rules.

---

## 🧩 6. Catálogo y selección

El contenido activo procede de:

```text
mi-universo/creciendo-por-dentro/semillas.json
```

El Motor no debe mantener una segunda copia integral del catálogo dentro del HTML/JS.

### 6.1 Exploración libre

Sin Misión activa, el alumno puede explorar las Semillas disponibles y filtrar por familia.

La tarjeta puede indicar, según historial:

- ✨ Nueva;
- ✅ Practicada;
- 🔁 Practicar otra vez.

### 6.2 Desde una Misión

Una Misión válida puede restringir el catálogo mediante filtros como:

```text
criterioCumplimiento.filtros.semillasIds
```

El módulo no debe mostrar temporalmente Semillas ajenas a la Misión mientras resuelve ese contexto.

La Misión debe corresponder a:

```text
modulo: creciendo-por-dentro
evidenciaTipo: semilla_completada
```

Si el contexto no es válido, no se debe atribuir actividad a esa Misión.

---

## 🪜 7. Flujo de una Semilla

La estructura puede variar por contenido, pero el patrón actual es:

```text
Bienvenida
↓
Situación
↓
Pasos guiados
↓
Construcción de una respuesta
↓
Práctica oral / grabación opcional
↓
Guardar sesión
↓
Evidencia si existe Misión
↓
Cierre positivo
```

### 7.1 Bienvenida

Debe:

- explicar qué se practicará;
- reducir incertidumbre;
- evitar lenguaje de examen;
- ofrecer salida segura.

### 7.2 Situación

Debe ser breve, concreta, apropiada a la edad y emocionalmente segura.

Puede incluir texto, audio e ilustración.

### 7.3 Pasos guiados

Los pasos pueden combinar:

- selección simple;
- selección múltiple;
- respuesta propia;
- dictado;
- ayuda visual;
- escucha.

No debe existir una única emoción “correcta”.

### 7.4 Construcción

El Motor puede combinar respuestas para ayudar a organizar una frase o mensaje.

La respuesta construida debe seguir perteneciendo al alumno: debe poder revisar, volver y cambiar lo necesario.

### 7.5 Práctica oral

La práctica puede incluir:

- escuchar la frase;
- grabar;
- transcribir;
- escuchar la propia grabación;
- repetir;
- continuar sin grabar cuando corresponda.

---

## 🎙️ 8. Voz, grabación y transcripción

### 8.1 Principio

La voz ayuda a practicar expresión y seguridad comunicativa. **No se utiliza para inferir emociones, personalidad, ansiedad o diagnósticos.**

### 8.2 Grabación

La implementación actual limita la grabación y controla tamaño antes de persistir.

Si el audio resulta demasiado grande para guardarse:

- las respuestas deben poder conservarse;
- el error debe explicarse de forma comprensible;
- no debe perderse el trabajo ya realizado por un fallo de audio.

### 8.3 Transcripción

Puede utilizar `SpeechRecognition`/equivalente disponible en el navegador.

La transcripción es una observación tecnológica y puede contener errores. No debe presentarse como copia perfecta de lo que dijo el alumno.

### 8.4 Datos educativos derivados

Solo deben conservarse datos observables y útiles, por ejemplo:

- intentos;
- duración de audio cuando existe;
- palabras objetivo/reconocidas si el tipo de práctica lo define;
- mensaje educativo prudente.

No deben generarse conclusiones clínicas.

---

## 💾 9. Sesión

Al guardar una Semilla, la sesión es la fuente propietaria del trabajo realizado.

Puede conservar, según la experiencia:

- `semillaId`;
- título/familia/tipo de situación;
- nivel de apoyo;
- respuestas;
- respuesta construida;
- intentos;
- duración;
- audio guardable;
- transcripción;
- observación familiar;
- análisis educativo no clínico;
- contexto de Misión cuando aplica;
- timestamps.

El payload físico exacto pertenece a la implementación y a las convenciones de datos; esta SPEC define el comportamiento, no congela todos los campos para siempre.

---

## 🔗 10. Evidencia y progreso de Misión

Después de guardar correctamente la sesión, una Misión compatible puede registrar:

```text
modulo: creciendo-por-dentro
tipo: semilla_completada
actividadId: semillaId
sesionId: sesión guardada
```

La evidencia puede añadir atributos funcionales como:

- familia;
- tipo de situación;
- nivel de apoyo;
- filtros relevantes.

Y resultados observables como:

- título;
- intentos;
- duración de audio;
- grabación confirmada.

No se deben copiar respuestas íntimas completas a la evidencia salvo una necesidad contractual explícita.

La lógica de conteo, deduplicación, finalización y revisión pertenece a STD/SPEC de Misiones.

---

## 📚 11. Historial

El módulo ofrece una vista de historial/jardín de sesiones guardadas.

Puede mostrar:

- Semilla;
- fecha;
- intentos;
- audio cuando fue guardado;
- respuestas construidas;
- transcripción;
- datos educativos de práctica;
- observación familiar cuando existe.

### Regla

El historial es una **vista de consulta del trabajo existente**. No debe fabricar sesiones, evidencia o resultados que nunca ocurrieron.

Cuando se abre una sesión concreta desde revisión, debe mantenerse el contexto autorizado de Persona Activa.

---

## 🤝 12. Papel de Lía

Lía:

- habla con calma;
- usa frases breves;
- reconoce esfuerzo;
- ofrece opciones cuando la respuesta libre es difícil;
- ayuda a ordenar ideas;
- invita a repetir;
- no se apropia de la voz del alumno.

Lía no:

- diagnostica;
- afirma saber cómo se siente el alumno;
- presiona para revelar información personal;
- ridiculiza;
- compara;
- prescribe tratamiento;
- promete que una estrategia resolverá una situación;
- sustituye a un adulto o profesional.

Las reglas transversales completas pertenecen a `STD-LIA.md`.

---

## 🧠 13. Contenido sensible y seguridad emocional

La versión ordinaria de Semillas debe trabajar situaciones cotidianas seguras.

No se utilizará como detector automático de:

- abuso;
- autolesión;
- violencia;
- peligro;
- crisis psicológica.

Una experiencia que pueda abordar situaciones de riesgo requiere diseño, revisión y rutas de ayuda específicas antes de incorporarse.

No se automatizan conclusiones sobre salud mental.

---

## 🔐 14. Privacidad

Principios:

1. guardar solo lo necesario para el propósito educativo;
2. respetar Persona Activa y relaciones autorizadas;
3. evitar exponer respuestas personales fuera del contexto necesario;
4. no presentar la existencia de acceso familiar como permiso universal fuera del modelo vigente;
5. revisar retención y almacenamiento de audio si el volumen/uso crece;
6. no utilizar personalización como justificación para recopilar datos ilimitados.

La implementación actual permite que usuarios autorizados por el modelo de Persona Activa consulten sesiones conforme a las reglas vigentes. Cualquier ampliación de acceso requiere decisión explícita de producto y seguridad.

---

## 🎨 15. UX y accesibilidad

La experiencia debe:

- tener una acción principal clara;
- usar instrucciones breves;
- mantener la información necesaria visible;
- no depender exclusivamente del color;
- admitir teclado/tacto según corresponda;
- ofrecer alternativa al audio;
- permitir repetir;
- evitar temporizadores de presión;
- evitar saturación visual;
- respetar `prefers-reduced-motion` cuando exista animación relevante;
- funcionar en escritorio, tablet y móvil.

La identidad visual se rige además por los documentos de identidad vigentes.

---

## ✅ 16. Finalización

Una Semilla se considera funcionalmente realizada cuando:

1. el alumno completa el recorrido requerido por esa Semilla;
2. la sesión se guarda correctamente;
3. se llega al cierre de la experiencia.

No requiere una “respuesta emocional correcta”.

Si existe Misión, la evidencia se registra **después** de la sesión guardada y la Misión aplica su propio contrato de progreso/finalización.

Repetir una Semilla:

- no es fracaso;
- no elimina automáticamente el trabajo anterior;
- puede generar una nueva sesión cuando corresponde;
- sirve para practicar de nuevo.

---

## 🌿 17. Crecimiento visual y Motivación

El símbolo de Semilla/brote representa participación y crecimiento, no nivel psicológico.

El módulo puede utilizar una celebración positiva al cerrar una práctica.

Las Recompensas/Reconocimientos transversales no deben definirse aquí ni concederse por una supuesta calidad emocional de la respuesta. Su contrato pertenece al sistema de Motivación.

### Jardín Personal

Un **Jardín Personal completo**, longitudinal y personalizable permanece como **visión futura** salvo que una capacidad concreta se implemente y documente posteriormente.

La vista histórica actual puede utilizar lenguaje de jardín sin que ello equivalga a haber implementado todo ese concepto futuro.

---

## 🧪 18. Validación funcional

Al revisar cambios de este módulo comprobar, según alcance:

- carga de `semillas.json`;
- filtros;
- acceso libre;
- acceso por Misión válida;
- exclusión de Semillas no permitidas por Misión;
- recorrido por pasos;
- volver/cambiar respuesta;
- dictado cuando existe soporte;
- grabación y límites;
- continuación segura si el audio no puede guardarse;
- persistencia de sesión;
- evidencia/progreso de Misión;
- historial;
- Persona Activa;
- navegación/retorno;
- responsive;
- errores comprensibles;
- ausencia de lenguaje evaluativo o clínico.

La validación con Gloria/familia aporta evidencia de experiencia, pero no sustituye QA técnico básico.

---

## 🌱 19. Primera familia de experiencia

La primera Semilla de referencia histórica y funcional es:

> **🌱 Aprendo a decir lo que siento**

Su estructura se inspira en cuatro movimientos comunicativos:

```text
Describir
Expresar
Solicitar / sugerir
Consecuencia
```

El acrónimo DESC no necesita mostrarse al alumno.

El propósito es practicar una forma de organizar un mensaje, **no enseñar una receta única para sentir o resolver conflictos**.

El catálogo puede incorporar otras Semillas siempre que cada una:

- tenga propósito claro;
- preserve los límites de esta SPEC;
- sea configurable desde contenido;
- no convierta una experiencia personal en examen.

---

## 🔭 20. Evolución futura

Pueden evaluarse en el futuro, mediante decisión separada:

- más familias de Semillas;
- niveles de apoyo más ricos;
- Jardín Personal completo;
- recomendaciones revisadas;
- participación familiar ampliada;
- nuevas modalidades de interacción;
- análisis educativo más sofisticado pero no clínico;
- visualizaciones longitudinales prudentes.

No forman parte del producto solo por aparecer aquí.

El roadmap detallado pertenece a `docs/project/ROADMAP.md`.

---

## ✅ 21. Decisiones vigentes

1. El módulo se denomina **Creciendo por Dentro** y forma parte de Mi Universo.
2. Sus experiencias se denominan **Semillas**.
3. Las Semillas pueden realizarse libremente o dentro de una Misión.
4. Tarea/Misión se interpretan conforme al modelo transversal vigente, no como entidades jerárquicas obligatorias.
5. Lía acompaña sin evaluar ni asumir rol terapéutico.
6. No hay puntuaciones emocionales, rankings ni respuestas emocionales correctas.
7. La expresión oral puede ser prioritaria, pero la grabación no debe ser una obligación absoluta.
8. La voz se utiliza con finalidad educativa/no diagnóstica.
9. El catálogo reside en contenido configurable (`semillas.json`).
10. La sesión se guarda antes de registrar evidencia de Misión.
11. La evidencia referencia sesión/actividad y evita duplicar contenido personal innecesario.
12. Persona Activa determina la Persona sobre la que opera la experiencia.
13. El historial consulta trabajo real guardado y no fabrica evidencia.
14. El Jardín Personal completo sigue siendo evolución futura.
15. La familia/profesionales pueden acompañar únicamente dentro de permisos y responsabilidades autorizados.
16. El producto se valida con uso real sin convertir observaciones de una Persona en reglas universales automáticas.

---

## 🛠️ 22. Mantenimiento

Actualizar esta SPEC cuando cambie el comportamiento funcional verificable de Creciendo por Dentro.

No actualizarla por:

- una idea todavía exploratoria;
- un cambio puramente visual sin impacto funcional;
- un cambio técnico interno que no altere contrato;
- una recomendación profesional aún no convertida en decisión de producto.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 1.2 |
| **Capacidad base** | Implementada |
| **Fuente funcional** | Esta SPEC |
| **Diseño complementario** | `docs/product/DESIGN-MOTOR_SEMILLAS-v1.0.md` |
| **Implementación** | `mi-universo/creciendo-por-dentro/` + `compartido/api/academia.js` |
