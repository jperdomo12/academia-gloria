# 🌱 Estándar de nuevas Semillas · Creciendo por Dentro
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/standards/STD-CRECIENDO_POR_DENTRO_SEMILLAS.md` |
| **Versión** | 1.1 |
| **Estado** | Activo |
| **Fecha de origen** | 15/09/2026 |
| **Última actualización** | 15/09/2026 |
| **Propietario** | Creciendo por Dentro |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Diseño, imagen, incorporación, validación, documentación de acompañamiento y cierre de nuevas Semillas del módulo `Creciendo por Dentro` |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Gobierna:** dignidad, autonomía, seguridad emocional y propósito humano. |
| `docs/vision/01_PRINCIPIOS_PEDAGOGICOS.md` | **Gobierna:** principios pedagógicos de la Academia. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna:** experiencia general del alumno y relación con los dominios del producto. |
| `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` | **Gobierna:** lenguaje visual, coherencia de personajes, generación mediante IA y validación en contexto. |
| `docs/standards/STD-LIA.md` | **Gobierna:** tono, ayuda gradual y límites del acompañamiento de Lía. |
| `docs/manuales/GUIA-SEMILLAS-CRECIENDO-POR-DENTRO.md` | **Explica:** significado, objetivo, práctica y aspectos observables de cada Semilla para familias y profesionales. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Gobierna:** construcción, validación y cierre de cambios del producto. |
| `mi-universo/creciendo-por-dentro/semillas.json` | **Implementa:** catálogo vigente de Semillas y contenido data-driven. |
| `mi-universo/creciendo-por-dentro/creciendo-por-dentro.js` | **Implementa:** Motor compartido de la experiencia. |
| `mi-universo/creciendo-por-dentro/guia-familias-profesionales.html` | **Presenta:** guía web para usuarios adultos autorizados. |
| `assets/imagenes/creciendo-por-dentro/semillas/` | **Implementa:** ilustraciones activas de las Semillas. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 15/09/2026 | Product Owner + AI Collaborator | Incorpora al cierre estándar de una nueva Semilla la actualización de la guía oficial para familias/profesionales y de sus presentaciones derivadas vigentes. Evita que catálogo, documentación de acompañamiento y guía web queden desincronizados. |
| 1.0 | 15/09/2026 | Product Owner + AI Collaborator | Formaliza el flujo validado durante la creación de las Semillas 007–009: necesidad real → diseño pedagógico → imagen generada por IA manteniendo continuidad visual de Gloria → subida mínima del binario por el Product Owner cuando sea necesaria → integración técnica por la AI Collaborator → validación de Pages → prueba real con Gloria. Reduce al mínimo la intervención manual del Product Owner y establece Quality Gate funcional, emocional, visual y técnico. |

---

## 🎯 1. Propósito

Este estándar responde a una pregunta principal:

> **¿Cómo crear una nueva Semilla de `Creciendo por Dentro` de forma rápida, coherente, segura y con la mínima intervención manual del Product Owner?**

Una Semilla existe para ayudar al alumno a **comprender y practicar una situación emocional, personal o social concreta** mediante una experiencia breve, guiada y reutilizable.

No es un cuestionario clínico, una evaluación psicológica ni una forma de etiquetar al alumno.

---

## 📐 2. Alcance y fronteras

Este estándar gobierna:

- cuándo merece crearse una nueva Semilla;
- diseño pedagógico y emocional;
- estructura de contenido en `semillas.json`;
- generación y aprobación de la imagen;
- continuidad visual de Gloria cuando aparezca;
- reparto de responsabilidades Product Owner / AI Collaborator;
- integración directa con el Motor existente;
- actualización de la documentación de acompañamiento;
- validación técnica y visual;
- prueba real y ajustes posteriores.

No define:

- diagnósticos o recomendaciones clínicas;
- el comportamiento general de toda la IA de Academia;
- la mecánica completa de Misiones;
- un nuevo Motor para cada Semilla;
- ni una infraestructura propia de imágenes diferente de la ya existente.

---

## 🧭 3. Principio central

> **La necesidad real inicia la Semilla; el Motor se reutiliza; la AI Collaborator asume el trabajo técnico; el Product Owner interviene solo donde aporta decisión o validación.**

La creación de una nueva Semilla no debe abrir por defecto un desarrollo nuevo del Motor.

La primera opción es siempre:

```text
necesidad real
→ nuevo contenido data-driven
→ reutilizar Motor existente
→ validar en contexto
```

Solo se modifica lógica compartida cuando la nueva necesidad demuestra una carencia real que no puede resolverse limpiamente con datos.

---

## 🌱 4. Cuándo crear una nueva Semilla

Una nueva Semilla se justifica cuando existe una situación concreta que el alumno necesita comprender, practicar o gestionar y que:

- ha aparecido en la vida real o en una necesidad educativa clara;
- puede abordarse mediante pasos breves y comprensibles;
- aporta una habilidad reutilizable más allá del episodio concreto;
- no duplica innecesariamente otra Semilla existente;
- y encaja con el propósito de `Creciendo por Dentro`.

Ejemplos recientes validados:

- `Puedo elegir diferente` → mantener preferencias propias dentro de una amistad;
- `Cuando un plan no me incluye` → gestionar una situación de no invitación sin convertir una interpretación en hecho;
- `Puedo pasar con calma` → manejar incertidumbre ante niños desconocidos sin asumir automáticamente rechazo ni entrar en evitación.

No se crea una Semilla únicamente para aumentar el catálogo.

---

## 🤝 5. Forma de trabajo estándar

### 5.1 Entrada mínima del Product Owner / familia

Normalmente es suficiente con describir la necesidad en lenguaje natural, por ejemplo:

```text
Gloria nos comenta que cuando pasa cerca de niños que no conoce
siente que la miran feo, mira al suelo, acelera y trata de evitarlos.
```

No se requiere que el Product Owner diseñe pasos, JSON, copy, estructura técnica ni prompts de imagen.

### 5.2 Responsabilidad de la AI Collaborator

La AI Collaborator debe asumir, salvo bloqueo material:

1. comprender la necesidad;
2. identificar la habilidad principal;
3. comprobar que no duplique otra Semilla;
4. proponer título, subtítulo y enfoque;
5. diseñar situación, pasos, opciones, apoyo de Lía y cierre;
6. definir el nombre del archivo de imagen;
7. generar la imagen cuando la herramienta esté disponible;
8. mantener continuidad visual de Gloria y de la Academia;
9. incorporar la Semilla a `semillas.json`;
10. actualizar la versión del catálogo cuando corresponda;
11. actualizar la guía oficial para familias/profesionales y sus presentaciones derivadas vigentes;
12. realizar ajustes mínimos del Motor/CSS solo si son realmente necesarios;
13. verificar commit, consistencia y GitHub Pages;
14. entregar la experiencia lista para prueba real.

### 5.3 Intervención mínima del Product Owner

El Product Owner conserva las decisiones funcionales y de producto, pero su trabajo operativo debe reducirse a:

- plantear o aprobar la necesidad;
- revisar la imagen cuando sea relevante;
- subir el archivo binario a GitHub cuando la herramienta conectada no pueda hacerlo de forma segura/fiable;
- probar el resultado;
- aprobar o solicitar ajustes.

No debe editar JSON, JavaScript o CSS manualmente cuando la AI Collaborator pueda realizar el cambio.

---

## 🎨 6. Imagen de una nueva Semilla

### 6.1 Flujo por defecto

El flujo preferido es:

```text
AI Collaborator diseña la intención visual
→ AI Collaborator genera la imagen
→ Product Owner valida
→ Product Owner sube el binario solo si la conexión GitHub no permite hacerlo directamente
→ AI Collaborator integra y verifica
```

El flujo anterior —Product Owner genera la imagen a partir de un nombre indicado— permanece como **alternativa**, no como proceso principal.

Se usa cuando:

- la generación integrada no esté disponible;
- el Product Owner ya disponga de una imagen adecuada;
- exista una razón concreta para producirla externamente.

### 6.2 Convención de nombre

Para nuevas Semillas:

```text
semilla-NNN-slug-descriptivo.jpg
```

Ejemplo:

```text
semilla-009-puedo-pasar-con-calma.jpg
```

Ruta activa:

```text
assets/imagenes/creciendo-por-dentro/semillas/
```

El formato puede variar si existe una razón técnica, pero no debe hacerse sin necesidad.

### 6.3 Continuidad visual de Gloria

Cuando Gloria aparezca en una ilustración, debe sentirse como **el mismo personaje reconocible**, no como una niña distinta en cada Semilla.

La generación debe utilizar como referencia las ilustraciones de Gloria previamente aprobadas cuando estén disponibles y preservar de forma consistente:

- edad visual y proporciones infantiles;
- rasgos generales y expresión cercana;
- tono de piel moreno natural ya aprobado;
- cabello oscuro;
- cintillo como elemento visual preferente cuando encaje con la escena;
- lenguaje gráfico amable, cálido y coherente con las Semillas recientes;
- postura y emoción proporcionales a la situación, sin dramatización innecesaria.

La ropa puede variar según el contexto, pero debe conservar una paleta y tratamiento compatibles con la identidad aprobada.

No se debe convertir cada generación en un rediseño de Gloria.

### 6.4 Representación de otras personas

Las imágenes deben evitar atribuir visualmente intenciones negativas que la situación todavía no demuestra.

Por ejemplo:

- niños desconocidos no deben verse automáticamente hostiles;
- amigas que realizan otro plan no deben representarse necesariamente como crueles;
- una situación incómoda no debe convertirse gráficamente en amenaza salvo que el contenido trate realmente una amenaza.

Esto evita que la ilustración contradiga la habilidad que intenta enseñar la Semilla.

### 6.5 Prueba en contexto

La imagen debe revisarse:

- dentro de la tarjeta del catálogo;
- en bienvenida/situación cuando se reutilice allí;
- al tamaño real;
- y en el dispositivo relevante cuando la composición pueda cambiar.

Si el encuadre de una miniatura necesita un pequeño ajuste, se prefiere modificar presentación (`object-position` u otra solución equivalente) antes que regenerar una imagen aprobada, siempre que el resultado siga siendo limpio y mantenible.

---

## 🧠 7. Diseño pedagógico de la Semilla

### 7.1 Una habilidad principal

Cada Semilla debe poder resumirse en una habilidad clara.

Ejemplos:

- distinguir hecho e interpretación;
- reconocer una emoción;
- expresar una preferencia propia;
- elegir una acción de autocuidado;
- pedir ayuda cuando corresponde.

Evitar mezclar demasiados objetivos en una sola experiencia.

### 7.2 Validar sin confirmar interpretaciones

La Semilla puede reconocer una emoción o sensación sin declarar como hecho aquello que el alumno todavía interpreta.

Ejemplo válido:

```text
“Sientes que te miran feo.”
```

No convertir automáticamente esa sensación en:

```text
“Esos niños te están rechazando.”
```

La experiencia debe ayudar a distinguir:

```text
lo que ocurrió
≠
lo que pienso que significa
```

### 7.3 Emociones válidas, respuestas no impuestas

No existe una emoción “correcta”.

La Semilla puede ofrecer vocabulario y opciones, pero debe permitir:

- varias emociones cuando corresponda;
- `No estoy segura`;
- y respuesta con palabras propias.

### 7.4 Acciones pequeñas y practicables

Las acciones propuestas deben ser suficientemente pequeñas para poder usarse en una situación real.

Preferir:

- respirar una vez;
- mirar hacia donde se camina;
- decir una frase breve;
- seguir con un plan propio;
- preguntar con calma;
- pedir ayuda.

Evitar exigir transformaciones emocionales inmediatas como “no tener miedo”, “no ponerse triste” o “ignorar lo que siente”.

### 7.5 Seguridad y apoyo adulto

Cuando la situación pueda confundirse con maltrato, burla, amenaza o exclusión repetida, la Semilla debe distinguir entre:

- incomodidad o incertidumbre que puede practicarse con autonomía;
- y comportamiento real que justifica alejarse, buscar seguridad o acudir a un adulto de confianza.

No se enseña al alumno a aguantar situaciones dañinas.

### 7.6 Lía

Lía debe:

- acompañar;
- aclarar;
- reducir presión;
- ayudar a separar hechos e interpretaciones;
- reforzar autonomía y petición de ayuda.

No debe:

- diagnosticar;
- imponer una emoción;
- decir al alumno lo que “debería” sentir;
- afirmar intenciones de terceros sin evidencia;
- ni resolver la reflexión por él.

---

## 🧩 8. Estructura funcional

La Semilla se incorpora normalmente en:

```text
mi-universo/creciendo-por-dentro/semillas.json
```

Debe reutilizar el contrato vigente del catálogo y, cuando aplique, contener:

- `id` semántico estable;
- `titulo`;
- `subtitulo`;
- `familia`;
- `tipoSituacion`;
- `emociones`;
- `nivelApoyo`;
- `duracionEstimada`;
- `activo`;
- `recomendada`;
- `portada`;
- `recursos.imagen`;
- `bienvenida`;
- `situacion`;
- `pasos`;
- `plantillaRespuesta`;
- `cierre`.

No se añade una propiedad nueva al contrato únicamente para una Semilla si el comportamiento puede resolverse con el modelo existente.

Si una necesidad demuestra valor transversal, puede evolucionarse el contrato compartido mediante el cambio mínimo necesario.

### 8.1 Documentación de acompañamiento

Toda nueva Semilla activa debe quedar explicada también en:

```text
docs/manuales/GUIA-SEMILLAS-CRECIENDO-POR-DENTRO.md
```

La guía debe conservar el orden **de la Semilla más nueva a la más antigua** y explicar, con lenguaje orientado a familias/profesionales:

- situación que aborda;
- objetivo principal;
- cómo se practica;
- qué puede ser útil observar;
- mensaje clave.

Esta guía es la fuente documental de acompañamiento. Las presentaciones derivadas vigentes —actualmente la guía web dentro de Academia y, cuando se genere para compartir, el PDF— deben mantenerse coherentes con ella.

La guía no convierte respuestas del alumno en evaluación clínica ni diagnóstico.

---

## ✅ 9. Quality Gate antes de darla por lista

Una nueva Semilla se considera técnicamente lista cuando:

- responde a una necesidad real;
- la habilidad principal es clara;
- no duplica innecesariamente una Semilla existente;
- no diagnostica ni etiqueta;
- valida emociones sin confirmar interpretaciones no demostradas;
- ofrece acciones pequeñas y utilizables;
- incluye salida hacia un adulto cuando corresponda;
- usa lenguaje comprensible y TEL-friendly;
- Lía respeta `STD-LIA`;
- la imagen es coherente con la identidad;
- Gloria mantiene continuidad visual cuando aparece;
- otras personas no se representan como antagonistas sin fundamento;
- `semillas.json` sigue siendo válido;
- la guía oficial para familias/profesionales incluye la nueva Semilla;
- la presentación web para adultos está sincronizada cuando aplica;
- el Motor existente sigue funcionando;
- la imagen carga desde la ruta oficial;
- el catálogo se ve equilibrado;
- GitHub Pages finaliza correctamente.

Después de esto, la Semilla queda **lista para prueba real**, no necesariamente cerrada para siempre.

---

## 👧 10. Validación con Gloria y mejora posterior

La validación más importante ocurre en uso real.

Observar especialmente:

- si Gloria comprende la situación;
- qué pregunta necesita más apoyo;
- si distingue el concepto que se intenta enseñar;
- qué opciones reconoce como naturales;
- si el lenguaje le resulta claro;
- si alguna frase parece demasiado abstracta;
- si la imagen ayuda a comprender o distrae;
- y qué estrategia recuerda después de terminar.

Un ajuste posterior basado en uso real no significa que la Semilla estuviera “mal”; forma parte del ciclo normal de aprendizaje del producto.

No se debe modificar inmediatamente una Semilla por una reacción aislada sin entender primero qué ocurrió.

---

## 🔄 11. Flujo operativo resumido

```text
1. NECESIDAD REAL
   Product Owner / familia describe la situación

2. ANÁLISIS
   AI Collaborator identifica habilidad, solapamientos y enfoque

3. DISEÑO
   AI Collaborator construye contenido completo

4. IMAGEN
   AI Collaborator genera → Product Owner valida
   → Product Owner sube binario solo si hace falta

5. IMPLEMENTACIÓN
   AI Collaborator actualiza catálogo/versión y solo toca Motor si es necesario

6. DOCUMENTACIÓN DE ACOMPAÑAMIENTO
   AI Collaborator actualiza la guía oficial y sus presentaciones derivadas vigentes

7. VERIFICACIÓN
   JSON + imagen + UI + guía + commit + GitHub Pages

8. PRUEBA REAL
   Product Owner / familia / Gloria usan la Semilla

9. AJUSTE
   AI Collaborator corrige solo necesidades observadas

10. CIERRE
   Product Owner aprueba; conocimiento estable permanece en GitHub
```

---

## 🚫 12. Anti-patrones

Evitar:

- pedir al Product Owner que escriba o pegue JSON;
- crear un HTML/JS independiente por cada Semilla;
- generar muchas imágenes antes de que exista una necesidad;
- rediseñar a Gloria en cada ilustración;
- usar una imagen que contradiga el mensaje pedagógico;
- convertir sensaciones en hechos sin evidencia;
- presentar evitación como única estrategia;
- presentar exposición forzada como única estrategia;
- eliminar la posibilidad de pedir ayuda;
- modificar el Motor por comodidad cuando el catálogo basta;
- añadir una Semilla al catálogo sin actualizar su explicación para familias/profesionales;
- documentar cada Semilla en un archivo separado;
- mantener procesos paralelos fuera de esta fuente propietaria.

---

## 🛠️ 13. Gobierno y mantenimiento

Este estándar debe revisarse cuando:

- una nueva Semilla requiera cambiar materialmente el contrato del Motor;
- cambie la forma habitual de generar/subir imágenes;
- cambie la forma de mantener o presentar la guía para familias/profesionales;
- se consolide una nueva regla pedagógica reutilizable;
- cambie la identidad visual de Gloria;
- o varias experiencias reales demuestren que una regla aquí descrita ya no funciona.

No requiere nueva versión por cada Semilla incorporada cuando esta cumple el proceso existente. La guía de acompañamiento, en cambio, sí debe actualizarse para reflejar cada nueva Semilla activa.

---

# 🟣 DECISIÓN

Queda aprobado como proceso oficial de nuevas Semillas el modelo de **mínima intervención del Product Owner**:

```text
necesidad familiar / educativa
→ diseño completo por AI Collaborator
→ imagen generada por AI Collaborator
→ validación del Product Owner
→ subida manual del binario solo cuando sea técnicamente necesaria
→ implementación por AI Collaborator
→ actualización de la guía para familias/profesionales
→ verificación por AI Collaborator
→ prueba real con Gloria
→ ajuste si la evidencia de uso lo justifica
```
