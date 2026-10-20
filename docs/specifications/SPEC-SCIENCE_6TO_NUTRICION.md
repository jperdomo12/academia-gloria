# Science 6.º · Nutrición
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-SCIENCE_6TO_NUTRICION.md` |
| **Versión** | 1.1 |
| **Estado** | Publicada para validación familiar · no declarada estable |
| **Última actualización** | 20/10/2026 |
| **Propietario** | Contenido curricular · Science 6.º |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Incorporar el material escolar de Nutrición en Science, con la pirámide aprobada y los contratos académicos existentes |

## Documentos relacionados

| Fuente | Relación |
|---|---|
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | Gobierna incorporación curricular de una instrucción, fidelidad, apoyo TEL y evidencia. |
| `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md` | Gobierna calidad, reutilización, navegación y responsive. |
| `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` | Gobierna Repaso académico, asignación y evidencia de Misión. |
| `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` | Consume sesiones, focos y señales de fortalecimiento. |
| `compartido/js/motor-practica-verbal.js` | Implementa el motor académico parametrizado ya utilizado por Lengua y English. |
| `compartido/js/sesiones-academicas.js` | Implementa el contrato compartido de sesión y vinculación con Misión. |
| `cursos/6to/science/organizacion-seres-vivos/` | Referencia vigente de presentación, identidad y recorridos de Science. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 20/10/2026 | Product Owner + AI Collaborator | PR #185 aprobada e integrada en e093be77…; cierra implementación de Nutrición y conserva pendiente de uso real con Gloria. No modifica el producto validado ni declara estabilidad. |
| 1.0 | 20/10/2026 | Product Owner + AI Collaborator | Candidata autorizada por el Product Owner: un Tema de Nutrición con seis páginas escolares cubiertas, imagen aprobada intacta, práctica, prueba y evidencia compartida. Revisión familiar pendiente. |

## Resumen de contenido

| Sección | Contenido |
|---|---|
| 1. Fuentes y fidelidad | Material original, imagen, cobertura por página y aclaraciones de adaptación. |
| 2. Experiencia | Mapa, alimentación, cuatro sistemas, práctica y comprobación. |
| 3. Integración | Catálogo, motor, persistencia, Misiones, histórico, análisis y refuerzo. |
| 4. Validación y límites | Verificación técnica y visual; separación de pruebas simuladas y uso real. |

## 1. Fuentes y fidelidad

**Decisión:** instrucción del Product Owner del 20/10/2026, «Incorporar a la Academia». No es una nueva capacidad ni un módulo independiente. Science ya está activa: se añade un único Tema `Nutrición` sin alterar Organización de los seres vivos.

Fuente principal: PDF escolar `6_LI_Nutrición.pdf`; copia aportada `6_LI_Nutrición(1).pdf`, seis páginas, «6.º E.P. Adaptación no significativa». Se revisaron texto y páginas renderizadas. SHA-256 del original: `06e3dcce1a7860925dd9b186c479f497f49df29a6ef69bba5f56d62e675e6069`. El PDF no se presenta como sustituto de la experiencia ni se publica una copia adicional.

| Página | Contenido de origen | Representación en Academia |
|---|---|---|
| 1 | Introducción, alimentos variados, nutrientes y cuatro sistemas; pirámide con seis grupos | Mapa inicial, imagen aprobada, Alimentación, ejemplos y retos de grupos/nutrición. |
| 2 | Órganos digestivos; boca, saliva, esófago y jugos gástricos | Recorrido visual y primera etapa de la explicación digestiva. |
| 3 | Hígado/bilis, absorción, heces; partes del respiratorio | Digestión/absorción/eliminación y recorrido del aire. |
| 4 | Tráquea, bronquios, bronquiolos, alvéolos; corazón/cavidades y vasos | Explicaciones respiratoria y circulatoria, conexiones, actividades y prueba. |
| 5 | Circuito corazón-pulmones-cuerpo y eliminación de sustancias | Recorrido circulatorio, transporte y conexión con eliminación. |
| 6 | Riñones, uréteres, vejiga, uretra; restos alimentarios, agua, recto y ano | Dos recorridos diferenciados: orina y heces; preguntas y explicaciones. |

**Imagen aprobada:** `assets/imagenes/science/science-nutricion-piramide-alimenticia.png`. Se incorpora el PNG aportado por el Product Owner porque el nombre no existía en el `main` de partida. Binario intacto, sin rediseño, sustitución, recorte ni recomprensión. Dimensiones 1099 × 1431; SHA-256 `5f8932418521f015b75147cbfacaf03ff052a0861a86bef4d28209afca518f04`. La imagen está visible en el Mapa inicial, mantiene su proporción y permite abrirla en grande. El texto alternativo identifica sus seis grupos.

La ilustración aprobada distribuye los grupos de forma diferente a los niveles del esquema original (por ejemplo, proteínas y verduras). Se conserva por decisión explícita; se trabaja **reconocimiento de grupos**, sin evaluar posiciones, proporciones, raciones, recomendaciones de frecuencia ni deducir cantidades del tamaño de los dibujos. No se inventa una equivalencia entre ambas composiciones.

Adaptación: explicaciones y retos son elaboración de Academia basada en el material escolar. Se separan pasos y se conservan términos académicos. Se precisa que arterias salen del corazón y venas regresan a él, sin generalizar que toda arteria lleva sangre oxigenada; la referencia del colegio simplifica el circuito general. La eliminación digestiva se incluye como en el PDF, distinguiendo restos no digeridos de la formación de orina al filtrar sangre. Se explicitan los uréteres y el dióxido de carbono para conectar etiquetas y recorridos ya presentes en la fuente. No se incorporan dietas, diagnósticos ni recomendaciones clínicas.

## 2. Experiencia

- **Mapa:** pirámide aprobada visible, idea de alimentación variada, funciones de los cuatro sistemas y ruta breve de estudio.
- **Alimentación:** seis grupos con ejemplos; escucha en español y comprobación desplegable tras pensar.
- **Los cuatro sistemas:** cuatro explicaciones plegadas para abrir una cada vez. Recorridos por pasos, órganos, funciones, conexiones y escucha de cada bloque. Comparación entre orina y heces y comprobación de conexiones.
- **Práctica:** diez retos con pista solicitada, reintentos y explicación. No guarda evidencia académica.
- **Prueba:** diez familias con dos variantes cada una (veinte variantes); una pregunta por familia. Se evitan variantes recientes cuando hay alternativas. Sin pistas ni límite de tiempo; explicación tras responder y mapa final de cinco focos.

Focos estables: `alimentacion`, `digestivo`, `respiratorio`, `circulatorio`, `excrecion`. Cada foco tiene dos familias. El resultado describe las respuestas observadas, sin equivaler a dominio ni calificación escolar. La continuidad de variantes corresponde al historial de pruebas; no se añade guardado de borradores.

## 3. Integración y reutilización

Ruta: `cursos/6to/science/nutricion/`. Identidad de actividad: `6-science-nutricion`, materia `Science`, tema/título `Nutrición`, versión `1.0`.

- `temas-science.js` incorpora el Tema y conserva el primero. El catálogo asistido de Misiones lo descubre desde el portal existente; no se crea un segundo catálogo de temas.
- `nutricion-data.js` contiene metadata, focos, práctica y familias; `nutricion.js` configura el motor compartido existente. No se duplica ni modifica el motor, ContextoUsuario o la persistencia.
- El HTML y CSS reutilizan la identidad, hero, pestañas, paneles y tarjetas de Science y los componentes existentes de práctica/prueba. Los estilos locales se limitan a la imagen y recorridos/explicaciones; no se rehacen los otros Temas.
- Aprendizaje guarda `sesion-academica-v1`: identidad, respuestas con foco/concepto, variantes, mapa formativo y tiempo activo. Solo la prueba completada genera esta evidencia, también en acceso libre.
- Vista previa, profesional de consulta e histórico son de solo lectura. Una Misión de Repaso académico referencia la sesión existente, sin duplicarla; conserva el cambio a pendiente de validación familiar.
- `refuerzos-academicos.js` incorpora la actividad y sus focos desde los datos. Trabajo realizado, visor histórico, Análisis Educativo y propuestas reutilizan sus contratos y algoritmos, sin nuevas colecciones, roles, Rules o permisos.

## 4. Validación y límites

Base `main` `f699b99f19084d288337fb91cd8701e4006d678a` (#184). Rama `feat/science-nutricion`. PR #185 aprobada por el Product Owner e integrada en `main` `e093be77f09e5a8db22ccbae8522fd50448d89c3`. Pages #795 `success`; página, módulo, datos, CSS, catálogo de Science y PNG publicados con HTTP 200 y coincidencia byte a byte con la implementación aprobada. El PNG publicado conserva el SHA-256 del original. Implementación publicada; prueba real con Gloria pendiente, sin declarar estabilidad.

`tests/nutricion-browser.cjs` reproduce el patrón de pruebas existente con ContextoUsuario, contrato de sesiones, API y Análisis reales, sustituyendo solo SDK/identidad externos. Comprueba acceso Science → Nutrición, imagen cargada, cuatro sistemas, práctica/escucha, aprendizaje de diez respuestas/cinco focos, variantes distintas, Misión y evidencia, histórico sin escritura, vista previa profesional/familiar sin escritura, catálogo de Science y refuerzo/Análisis. Banco auditado: diez prácticas, diez familias/veinte variantes, cinco focos, treinta IDs únicos y una opción correcta válida por reto. Los términos principales de las seis páginas están representados. Sintaxis, rutas y `git diff --check` correctos. Inspección visual de Mapa y Sistemas con Outfit y fuente emoji cargadas, en escritorio y móvil; 1440/1024/768/390/320 px sin desbordamiento. Sistemas desplegados, práctica y resultado también comprobados a 320 px. La regresión existente de English (`tests/quantifiers-browser.cjs`) pasa con la ampliación del registro de refuerzos.

No usa cuentas ni datos reales y no certifica audio físico o Rules desplegadas. La utilidad/comprensión con Gloria requiere revisión familiar. Durante estas pruebas se observa una solicitud del componente compartido de celebración a una guacamaya roja ya ausente en el baseline; no pertenece a este Tema ni bloquea su registro/resultado. No se amplía el alcance para modificar ese recurso compartido.

## DECISIÓN

Incorporación curricular aprobada dentro de Science, con la imagen aprobada intacta y reutilización de los patrones existentes. PR #185 aprobada e integrada: implementación cerrada en el mismo alcance, sin confirmaciones redundantes. La publicación no sustituye la validación familiar de comprensión y uso.
