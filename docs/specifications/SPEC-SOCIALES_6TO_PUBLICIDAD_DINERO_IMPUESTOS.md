# Sociales 6.º · Publicidad, dinero e impuestos
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-SOCIALES_6TO_PUBLICIDAD_DINERO_IMPUESTOS.md` |
| **Versión** | 1.2 |
| **Estado** | Publicada para validación familiar · no declarada estable |
| **Última actualización** | 21/10/2026 |
| **Propietario** | Contenido curricular · Sociales 6.º |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Incorporación curricular de tres Temas de Sociales a partir de dos fuentes escolares, con exigencia transversal de calidad visual y pedagógica igual o superior a la fuente |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` | Gobierna identidad y filosofía; esta decisión aprueba sincronizar en el ADN el umbral visual/pedagógico para temas escolares. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | Gobierna incorporación curricular, fidelidad a material real, apoyo TEL y evidencia. |
| `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md` | Gobierna calidad, reutilización, UX, responsive y validación. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | Gobierna implementación, PR, aprobación, publicación y cierre. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.2 | 21/10/2026 | Product Owner + AI Collaborator | PR #198 aprobada e integrada en 72e99bab…; Pages #807 success y 18 archivos de producto públicos HTTP 200 e idénticos a la implementación probada. Cierra desarrollo/integración/publicación; conserva validación familiar pendiente. |
| 1.1 | 21/10/2026 | Product Owner + AI Collaborator | Implementa candidata de tres Temas independientes y portal de Sociales con motor académico existente; registra fuentes, recursos visuales, comparación PDF → Academia, focos/evidencia y validación. Sin integración/publicación ni estabilidad declaradas; uso real pendiente. |
| 1.0 | 21/10/2026 | Product Owner + AI Collaborator | Aprueba tres Temas propietarios de Sociales: `La publicidad`, `El dinero, el ahorro y la inversión` y `Los impuestos`; conserva cada fuente escolar; define el tratamiento del solapamiento de presupuesto; y eleva a principio transversal/ADN que un tema escolar de Academia no puede empobrecer el material fuente y debe igualar o superar su claridad, estructura, apoyo visual y valor pedagógico. |

---

## 1. Decisión curricular

Se incorporan **tres Temas independientes** dentro de `6.º → Sociales`:

1. **La publicidad**
2. **El dinero, el ahorro y la inversión**
3. **Los impuestos**

No deben fusionarse en una única experiencia extensa.

La incorporación del primer Tema real debe activar el portal de Sociales conforme al estándar curricular vigente si todavía aparece como `Preparando`.

Estos materiales se consideran **materiales curriculares de Sociales**, no incorporaciones de Plan Semanal.

---

## 2. Fuentes escolares y propiedad

### 2.1 Tema · La publicidad

**Fuente escolar:** `5_LI_La publicidad.pdf`, páginas 1–3.

Contenido que pertenece a este Tema:

- qué es la publicidad;
- función comercial e informativa/educativa;
- estrategias publicitarias;
- mensaje publicitario;
- emisor;
- destinatario;
- mensaje;
- medio de difusión;
- eslogan;
- análisis visual de un anuncio.

La página 3 contiene un apoyo visual especialmente valioso: un anuncio real/representado con señalización de `eslogan`, `mensaje`, `destinatario` y `emisor`. La Academia debe conservar esa capacidad de **ver y analizar**, no reducirla a una lista textual.

### 2.2 Tema · El dinero, el ahorro y la inversión

**Fuente escolar:** `5_LI_La publicidad.pdf`, páginas 4–6.

Aunque comparte archivo físico con Publicidad, constituye una **fuente lógica/segmento curricular diferente** y un Tema propietario independiente.

Contenido:

- el dinero como medio de pago;
- dinero efectivo;
- tarjetas bancarias;
- medios de pago electrónico;
- ingresos;
- presupuesto;
- relación ingresos/gastos;
- ahorro;
- inversión;
- diferencia entre ahorrar e invertir;
- riesgo asociado a la inversión.

La página 5 contiene una comparación visual de tres situaciones presupuestarias que debe preservarse o mejorarse:

- ingresos = gastos;
- ingresos > gastos;
- ingresos < gastos.

### 2.3 Tema · Los impuestos

**Fuente escolar:** `6_LI_Los impuestos.docx.pdf`, cuatro páginas.

Contenido:

- qué son los impuestos;
- aportación al Estado y servicios públicos;
- consecuencias descritas por el material ante el impago;
- IVA;
- IRPF;
- significado básico de impuesto/renta/persona física;
- retención y referencia escolar a la declaración de la Renta;
- otros tributos mencionados por la fuente;
- servicios públicos financiados;
- curiosidad histórica sobre impuestos;
- ejemplo de presupuesto familiar/infantil incluido en la fuente.

La Academia debe mantener el nivel y encuadre de la fuente escolar. No se añaden explicaciones fiscales avanzadas ni se convierte el Tema en asesoramiento tributario.

---

## 3. Solapamiento de `presupuesto`

`Presupuesto` aparece en las dos fuentes.

Decisión:

- la propiedad conceptual principal queda en **El dinero, el ahorro y la inversión**;
- `Los impuestos` puede reutilizar el ejemplo de presupuesto de su fuente como **conexión/refuerzo práctico**;
- no se crean dos explicaciones propietarias contradictorias o innecesariamente repetidas;
- si se enlaza entre Temas, la navegación debe ser clara y contextual.

---

## 4. Principio transversal aprobado · umbral de calidad escolar

Esta incorporación aprueba como **principio base de Academia para temas escolares** la siguiente regla:

> **Cuando Academia transforma material real del colegio en un Tema escolar, el resultado debe igualar o superar el nivel de claridad, estructura, apoyo visual y valor pedagógico del material fuente. Si no es posible superarlo en algún aspecto, como mínimo debe mantenerse al mismo nivel. Academia no debe empobrecer el material original al transformarlo.**

Este principio debe sincronizarse en:

- `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md`, dentro de la filosofía visual/pedagógica;
- `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`, como criterio operativo y de conformidad.

### 4.1 Qué significa

No basta con que el contenido textual sea correcto.

Si la fuente utiliza con valor pedagógico:

- diagramas;
- esquemas;
- comparaciones;
- iconografía;
- ilustraciones;
- ejemplos visuales;
- flechas o relaciones;
- colores para distinguir conceptos;
- tablas;
- mapas;
- secuencias;
- anotaciones sobre una imagen;

la Academia debe evaluar ese recurso y **preservar su función pedagógica o mejorarla**.

### 4.2 Qué no significa

- No significa copiar mecánicamente el diseño del colegio.
- No significa añadir decoración sin propósito.
- No significa saturar la pantalla con imágenes.
- No significa que todos los Temas deban tener la misma plantilla.
- No autoriza a cambiar el significado académico para hacer una visual más llamativa.

La mejora visual debe servir a la comprensión.

### 4.3 Regla de bloqueo de calidad

Un Tema escolar **no está listo para aprobación** si una visualización útil de la fuente fue sustituida por una representación claramente peor, más plana o menos comprensible sin justificación pedagógica.

---

## 5. Expectativas específicas de alta calidad visual

### 5.1 La publicidad

La experiencia debe permitir **analizar visualmente un anuncio**.

Como mínimo debe existir una composición donde el alumno pueda reconocer en contexto:

- eslogan;
- emisor;
- destinatario;
- mensaje;
- medio de difusión cuando aplique.

Preferencia: recurso interactivo o visual etiquetado progresivamente, evitando presentar primero todas las respuestas si la actividad busca observación.

Las estrategias publicitarias deben poder distinguirse visualmente mediante ejemplos breves, no solo mediante párrafos.

### 5.2 El dinero, el ahorro y la inversión

Debe existir apoyo visual claro para:

- efectivo;
- tarjeta;
- pago electrónico;
- ingresos y gastos;
- las tres situaciones del presupuesto;
- ahorro frente a inversión;
- riesgo de inversión.

La comparación `ingresos = gastos / ingresos > gastos / ingresos < gastos` debe ser al menos tan clara como el esquema escolar de la página 5.

### 5.3 Los impuestos

Debe existir una representación comprensible de la idea:

`aportaciones → fondo común/Estado → servicios públicos`

Los servicios públicos mencionados en la fuente deben tener apoyo visual significativo: colegios/parques, hospitales/medicinas, policía/bomberos, transporte/carreteras y recogida de basuras.

IVA e IRPF deben diferenciarse visualmente con ejemplos simples coherentes con la fuente.

El ejemplo de presupuesto de 10 € puede reutilizarse como conexión, evitando competir con el Tema propietario de presupuesto.

---

## 6. Fidelidad académica

La fuente escolar es prioritaria para esta incorporación.

Reglas:

- conservar terminología y nivel del colegio;
- no sustituir conceptos por formulaciones externas sin necesidad;
- no corregir silenciosamente la fuente para convertirla en otra lección;
- si se requiere una aclaración pedagógica, distinguirla como elaboración de Academia;
- no introducir contenidos financieros/fiscales avanzados;
- no presentar consejos de inversión;
- no ampliar a política fiscal o debate económico que no esté en la fuente;
- no introducir marcas comerciales como requisito didáctico.

---

## 7. Experiencia académica esperada

Cada Tema debe reutilizar los contratos académicos vigentes y ofrecer una experiencia coherente con 6.º, pudiendo incluir según necesidad:

- Mapa/resumen visual;
- contenido por bloques breves;
- escuchar cuando aporte valor;
- observación antes de explicación;
- ejemplos;
- práctica con apoyo/pistas;
- comprobación/prueba formativa;
- evidencia académica compartida;
- integración con Misiones, histórico, Análisis Educativo y refuerzos según los contratos existentes.

No crear motores, persistencias o colecciones específicas si los componentes compartidos actuales son suficientes.

El diseño debe permitir estudiar sin convertir la pantalla en una transcripción del PDF.

---

## 8. Diseño para comprensión

Priorizar:

- una idea o relación principal por bloque;
- lenguaje claro;
- jerarquía visual fuerte;
- texto segmentado;
- comparaciones cercanas;
- ejemplos cotidianos;
- visuales funcionales;
- pistas graduales;
- lectura cómoda;
- autonomía;
- responsive real.

Evitar:

- paredes de texto;
- tarjetas repetitivas que conviertan todo en el mismo patrón;
- exceso de botones;
- ilustraciones ornamentales sin función;
- actividades que midan lectura de interfaz en lugar de comprensión del concepto.

---

## 9. Validación visual obligatoria contra la fuente

Antes de presentar la candidata al Product Owner, Desarrollo debe hacer una **comparación explícita fuente → Academia**.

Para cada Tema debe responder internamente:

1. ¿Qué apoyos visuales útiles ofrece el PDF?
2. ¿Dónde están representados en Academia?
3. ¿La representación de Academia es igual o mejor en claridad?
4. ¿Se perdió alguna relación visual importante?
5. ¿El resultado funciona en desktop y móvil sin degradar la comprensión?

La validación no se satisface únicamente con comprobar que no hay overflow o errores de consola.

Debe existir revisión pedagógica/visual real del resultado renderizado.

---

## 10. Pruebas y prevención de errores

La implementación debe validar como mínimo:

- rutas y navegación;
- activación de Sociales si corresponde;
- `Volver` contextual sin ciclos;
- responsive en anchos representativos, incluido móvil estrecho;
- teclado/foco cuando haya interacción;
- ausencia de errores de consola;
- carga de assets;
- correspondencia entre preguntas y respuestas;
- IDs únicos;
- persistencia solo donde corresponde;
- Vista previa y contextos de solo lectura sin escrituras;
- evidencia reutilizable por los contratos existentes;
- regresión de los Temas compartidos/motores que se reutilicen;
- revisión del texto contra las páginas fuente;
- revisión visual de cada recurso importante contra la fuente.

No declarar estabilidad solo por pruebas automatizadas. Queda pendiente uso real con Gloria.

---

## 11. Criterios de aceptación por Tema

### La publicidad

- cubre páginas 1–3 de la fuente;
- permite comprender concepto y estrategias;
- identifica emisor, destinatario, mensaje, medio y eslogan;
- incluye una experiencia visual de análisis de anuncio igual o mejor que la fuente;
- dispone de práctica/comprobación coherente con los contratos de Academia.

### El dinero, el ahorro y la inversión

- cubre páginas 4–6 de la fuente;
- distingue tipos de dinero/pago;
- explica ingresos y presupuesto;
- representa claramente las tres relaciones ingresos/gastos;
- diferencia ahorro e inversión y conserva la idea de riesgo;
- no convierte inversión en recomendación financiera.

### Los impuestos

- cubre las cuatro páginas de la fuente;
- explica finalidad básica de impuestos según el material;
- diferencia IVA e IRPF al nivel de la fuente;
- representa visualmente servicios públicos financiados;
- conserva la curiosidad histórica como dato de la fuente si se incluye;
- usa presupuesto solo como conexión/refuerzo, sin duplicar su propiedad conceptual.

---

## 12. Fuera de alcance

- Plan Semanal para estos dos PDFs;
- asesoramiento fiscal o financiero;
- contenidos externos no requeridos por la fuente;
- rehacer otros Temas;
- nuevas capacidades administrativas;
- motores académicos privados por Tema;
- automatizaciones nuevas.

---

## 13. Implementación y publicación · 21/10/2026

Base verificada: `main` `ae69a3704adc59632e8d71b9d2728b1cc045dc94`. Rama `feat/sociales-6to`, head aprobado `3d70066a94845f88812728911a300d46e48606f6`. PR #198 aprobada por el Product Owner e integrada en `main` `72e99bab9466ced5059f9c4e82cbc34661ef2632`; árbol idéntico al probado `982e46dae6fd9ecadf1dc0515cff8e87b212697b`. Las decisiones de §§1–12 se conservan. Pages #807 (run `39618427748`) `success`; 18 archivos públicos de producto HTTP 200 e idénticos byte a byte a los aprobados, incluido el JPEG escolar intacto. Sin desarrollo, integración ni publicación pendiente de #198; uso real con Gloria pendiente.

### 13.1 Rutas, reutilización y evidencia

Sociales se activa en `cursos/6to/index.html`; portal en `cursos/6to/sociales/index.html` y catálogo único `temas-sociales.js`. Reutiliza `portal-asignatura.js`, rejilla de tarjetas, recursos oficiales, Panel y navegación. Incluye exclusivamente el enlace de Sociales aportado en las fuentes del proyecto: `https://sites.google.com/gaudem.es/sexto/%C3%A1reas/sociales`. No abre ni duplica Plan Semanal.

| Tema / ruta bajo `cursos/6to/sociales/` | Actividad estable | Focos | Práctica / familias de prueba / variantes |
|---|---|---|---|
| `publicidad/` | `6-sociales-publicidad` | funciones, estrategias, mensaje, analisis | 8 / 8 / 16 |
| `dinero-ahorro-inversion/` | `6-sociales-dinero-ahorro-inversion` | pagos, presupuesto, ahorro, inversion | 8 / 8 / 16 |
| `impuestos/` | `6-sociales-impuestos` | aportaciones, servicios, iva, irpf, otros-tributos | 10 / 10 / 20 |

Cada Tema contiene `index.html`, `datos.js` y un adaptador `tema.js` al motor académico ya existente `compartido/js/motor-practica-verbal.js`. Se reutilizan práctica, prueba, variantes recientes, voz, modo aprendizaje/vista previa, sesiones `sesion-academica-v1`, histórico y vinculación de evidencias a Misiones. El motor compartido no cambia. `actividades-sociales.js` deriva metadatos/focos de los mismos bancos; `refuerzos-academicos.js` registra esas actividades en el motor existente. El catálogo de Misiones descubre Sociales desde los portales existentes. Análisis conserva sus filtros, prioridades y límites de resumen; no se duplica ni modifica.

`sociales.css` adapta la identidad existente de Temas académicos. `experiencias.js` gestiona únicamente exploraciones de estudio en memoria: etiquetas del anuncio, presupuesto variable y explicación de servicios. No guarda esas respuestas ni las convierte en otra prueba. Solo la prueba académica final guarda evidencia conforme al contrato vigente; consulta/vista previa no escribe. Sin nuevas colecciones, API ni Rules.

### 13.2 Fuentes y delimitación comprobadas

| Fuente recibida | Alcance | SHA-256 del PDF |
|---|---|---|
| `5_LI_La publicidad.pdf` (adjunto recibido con sufijo `(1)`) | Páginas 1–3 Publicidad; 4–6 Dinero/ahorro/inversión | `72cd54231b22dc5f0a08258e8f48e6d4ed7031090275d740147943980d991854` |
| `6_LI_Los impuestos.docx.pdf` (adjunto recibido con sufijo `(1)`) | Cuatro páginas de Impuestos; presupuesto de p.4 solo como conexión | `0230a348ce576950f8ef0bef7e5b8702dd3fe79a0a43095ad54dbd2528a2d1b1` |

Se leyeron y renderizaron las diez páginas, incluidos recuadros visuales: creación de anuncios por agencias/departamentos y explicación escolar sobre depósitos bancarios. Cada Tema identifica procedencia y páginas. No se publican copias completas de los PDFs.

El anuncio escolar de p.3 se extrae sin recomprimir, recortar ni rediseñar a `assets/imagenes/sociales/anuncio-despierta-desayuna.jpg` (579 × 842, 72.936 bytes; SHA-256 `24b80873a8953346520454979d0333ef5c35380aec467906ed7d0194d43e5081`). Conserva texto y logotipos originales. El emisor histórico se atribuye al análisis del colegio; no se sustituye por una institución actual. Los demás apoyos son HTML/CSS y SVG locales, sin generar imágenes ni incorporar recursos financieros/fiscales externos.

IVA e IRPF mantienen el encuadre escolar; los importes inventados se identifican como ejemplos, sin tipos legales o consejo fiscal. Retenciones y Renta se explican como referencia del material, sin convertir su simplificación en obligaciones particulares. Otros tributos, sanciones y curiosidad histórica se presentan como contenido de la fuente. Ahorro/inversión no incluyen recomendaciones ni productos financieros.

### 13.3 Comparación visual fuente → Academia · quality gate

Revisión del producto renderizado frente a las páginas originales; no se limita a transcripción o ausencia de overflow. Juicio de revisión de Desarrollo, pendiente de validación familiar.

| Recurso / función en la fuente | Representación concreta en Academia | Claridad conservada o mejorada y comprobación móvil |
|---|---|---|
| Publicidad p.3: localizar eslogan, mensaje, destinatario y emisor dentro del anuncio | `publicidad/index.html` → «Observo un anuncio»: composición original con cuatro puntos y etiquetas progresivas; selección, pista, comprobación y explicación propia comparada con modelo | Conserva las posiciones y el anuncio entero. Permite observar antes de revelar; no sustituye la imagen por cuatro tarjetas. En móvil se selecciona antes de la imagen y el feedback aparece después; zonas de al menos 44 px, teclado y leyenda legible. El texto libre se compara con modelo, sin fingir corrección automática. |
| Publicidad pp.1–2: funciones, estrategias y elementos del mensaje | «El mensaje»: emisor → mensaje → destinatario y canales; «Estrategias»: cuatro mini anuncios con explicación tras observar | Las relaciones se ven en secuencia y las estrategias tienen ejemplos diferentes, no solo definiciones. Ejemplos inventados identificados; el anuncio real mantiene su atribución. Secuencia y ejemplos se apilan de forma legible en móvil. |
| Dinero p.4: efectivo y medios bancarios/electrónicos | `dinero-ahorro-inversion/index.html` → «Dinero y pagos»: monedas, tarjeta y móvil con objeto SVG, significado y recorrido del pago | Mantiene distinción y procedencia del dinero; las ilustraciones cumplen función de reconocimiento. Objetos y explicación permanecen juntos en móvil. |
| Dinero p.5: comparar ingresos =, > y < gastos | «Mi presupuesto»: tres pares de barras, escala/base comunes, importes, símbolo relacional y diferencia; presupuesto manipulable con ingreso fijo de 10 € | Hace visible la diferencia, el margen o la falta y su cálculo. Los tres escenarios siguen disponibles al apilarse en móvil; barra verde/coral acompañada de etiquetas y números. No depende solo del color. |
| Dinero p.6: distinguir ahorro/inversión y riesgo | «Ahorro e inversión»: reservar para después frente a destinar a una actividad; bifurcación con tres resultados posibles, incluido perder todo | Intención y consecuencias separadas, símbolo ≠, beneficio no garantizado. La rama de riesgo continúa visible en móvil, sin sugerir probabilidad ni recomendar inversión. |
| Impuestos pp.1–3: aportaciones al Estado y servicios comunes | `impuestos/index.html` → «Un fondo común»: personas/actividad → aportación obligatoria → Estado/fondo → cinco grupos de servicios ilustrados y seleccionables | Explicita el recorrido causal y la ramificación que la fuente describe. En móvil conserva orden/flechas y grupos completos: colegios/parques, hospitales/medicinas, policía/bomberos, carreteras/transporte y basuras. |
| Impuestos p.2: IVA frente a IRPF y vocabulario | «IVA e IRPF»: recibo de compra (precio + IVA = total), nómina escolar (ingreso = recibido + retención), glosario y secuencia retención → Renta | Dos contextos visualmente diferentes y cálculos completos, sin tipos fiscales reales. En móvil cada ejemplo mantiene su operación y explicación juntos. |
| Impuestos pp.3–4: curiosidad y presupuesto de 10 € | «Lo conecto»: hito histórico y barra proporcional 3 € helado / 5 € cromos-juguete / 2 € ahorro | Conserva reparto, suma y reserva. No duplica la explicación de presupuesto: enlaza al Tema del dinero con `data-conservar-retorno`; abrirlo y volver regresa a Impuestos. Barra legible también en móvil. |

No se ha identificado pérdida de relaciones visuales relevantes en esta revisión. Los tres Temas comparten marco académico, no composición de contenido: anuncio para investigar, comparación/manipulación presupuestaria y recorrido de aportaciones/servicios.

### 13.4 Validación y límites

- `tests/sociales-browser.cjs`: Chromium con páginas/módulos, ContextoUsuario, guard, API y Análisis reales; SDK/identidad externos y voz simulados. Activa portal/3 Temas; prueba anuncio (error, pista, teclado, cuatro etiquetas, modelo y reinicio), tres presupuestos/deslizador, tres pagos, ramas de riesgo, cinco servicios y retorno entre Temas.
- Comprueba las 26 prácticas, correspondencia de opciones/respuestas y 78 IDs únicos; 26 familias con dos variantes cada una. Ejecuta pruebas finales de los tres Temas, metadatos/focos, sesiones/histórico, cambio de variantes, Misión/evidencia y refuerzo repetido. Análisis consulta cada Tema con su filtro existente, sin alterar el límite global de fortalezas.
- Estudio y práctica sin escrituras educativas; profesional de consulta y familiar en vista previa sin escrituras; aprendizaje del alumno guarda únicamente por el motor existente. No utiliza cuentas ni datos reales.
- Revisión de layouts/recursos renderizados en escritorio y móvil; comprobación de anchos 1440, 1024, 768, 390 y 320 px, incluidos resultados. Sin overflow ni errores JavaScript. JPEG escolar y recursos locales nuevos cargados. El fixture identifica el 404 previo de `assets/identidad/guacamayas/guacamaya-roja-posada-01.png` al celebrar resultados; no se declara ausencia total de 404 del producto anterior.
- Regresión del Tema existente Science/Nutrición: `tests/nutricion-browser.cjs` superado: pirámide, cuatro sistemas, práctica/prueba, sesiones/Misión, histórico, vista previa, catálogo/refuerzo/Análisis y responsive. No cambian su motor, contenido ni imagen.
- No se certifican Rules desplegadas, sesión Firebase real ni voz física. Revisión/aprobación del Product Owner e integración/publicación completadas; pendiente uso real con Gloria antes de declarar estabilidad.

---

## DECISIÓN

**APROBADO PARA DESARROLLO.**

Sociales se incorpora con tres Temas propietarios: `La publicidad`, `El dinero, el ahorro y la inversión` y `Los impuestos`, conservando trazabilidad de sus fuentes escolares y el tratamiento acordado del presupuesto.

Se aprueba además como principio transversal/ADN de Academia que **un Tema escolar transformado por Academia no puede empobrecer el material fuente: debe igualar o superar su claridad, estructura, apoyo visual y valor pedagógico, manteniendo como mínimo el nivel del colegio cuando no sea posible superarlo**.


**Estado de ejecución:** #198 aprobada, integrada y publicada con verificación completada. Pendiente uso familiar; no equivale a estabilidad de producto.
