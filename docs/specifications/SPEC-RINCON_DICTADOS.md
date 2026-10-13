# Mi Rincón de Dictado

| Campo | Valor |
|---|---|
| Ruta oficial | `docs/specifications/SPEC-RINCON_DICTADOS.md` |
| Versión | 1.2 |
| Estado | V1 funcional publicada para validación familiar · ajustes #161 |
| Fecha | 13/10/2026 |
| Propietario | Práctica de escritura y autoevaluación |
| Responsables | Product Owner + AI Collaborator |
| Ámbito | Dictados en español, escritura en papel, revisión manual e historial por Persona Activa |

## Documentos relacionados

- `docs/FOUNDATION.md`: autonomía, motivación y dignidad.
- `docs/standards/STD-LIA.md`: acompañamiento sin atribuir capacidades inexistentes.
- `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md`: permisos e identidad.
- `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md`: aprobación e integración.
- `compartido/js/lector-texto.js`: voz compartida.
- `compartido/js/sesiones-academicas.js`: guardado e historial canónicos.
- `mi-universo/rincon-dictados/`: catálogo, modelo y experiencia.

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---|---|---|
| 1.2 | 13/10/2026 | Product Owner + AI Collaborator | Cuatro ajustes de primera revisión aprobados e integrados mediante #161 en `c980fcc1…`; Pages #766 `success`. Continúa validación familiar de audio físico, Rules y persistencia real; sin declarar estabilidad. |
| 1.2-rc | 13/10/2026 | Product Owner + AI Collaborator | Primera revisión familiar: avisos al final del panel activo, banda de Dictado libre, nombre visible Mi Rincón de Dictado y acordeón compartido con Misiones preparadas/sugeridas. Extiende la consulta de refuerzos sobre las mismas Misiones y su API; edición en formulario común. Candidata, sin declarar estabilidad. |
| 1.1 | 13/10/2026 | Product Owner + AI Collaborator | Reparación #159 aprobada e integrada en `372291dd…`; Pages #763 `success`. Validación familiar de voz, Rules y persistencia real pendiente; sin declarar estabilidad. |
| 1.1-rc | 13/10/2026 | Product Owner + AI Collaborator | Recuperación de calidad autorizada: formulario y módulo estándar, refuerzos revisables en el mismo formulario, compatibilidad sin migración, evidencia del texto asignado, Mi Camino sin cierre redundante, bienvenida basada en Lectura y pruebas sobre el flujo real. |
| 1.0 | 12/10/2026 | Product Owner + AI Collaborator | Integración autorizada: Misiones de aventuras y refuerzos de palabras/frases, evidencia idempotente para revisión familiar y análisis separado de autoevaluaciones. |
| 1.0-rc6 | 12/10/2026 | Product Owner + AI Collaborator | Cabecera canónica en vista previa e integración, elimina Panel local y aísla CSS; matriz de estándares, árbol e índice sincronizados; prueba específica de navegación real. |
| 1.0-rc5 | 12/10/2026 | Product Owner + AI Collaborator | Comparación con Rincón de Lectura publicado: bienvenida, tarjetas, pasos y panel de voz de la misma familia; cierre de vista previa explícito sin guardado. |
| 1.0-rc4 | 12/10/2026 | Product Owner + AI Collaborator | Revisión integral de UX: secuencia de escucha antes de avance, salida explícita ante audio sin end, ayudas progresivas, foco de actividad, origen institucional, catálogo responsive y detalle de práctica en historial. |
| 1.0-rc3 | 12/10/2026 | Product Owner + AI Collaborator | Ajustes tras revisión de Juan: velocidades más diferenciadas y repetición inmediata, navegación explícita para finalizar/comparar/ver resultado/cerrar, aventura original imaginada con Shakira en Nivel 1. Revisión 3: inicio/avance destacados antes del contenido y avance manual sin dependencia de evento end. Primera versión para revisión: seis aventuras, tres niveles, voz ajustable con avance manual, autoevaluación por frases, práctica posterior, borradores locales e historial. |

## Resumen de contenido

| Sección | Contenido |
|---|---|
| 1. Experiencia | Preparación, dictado, revisión, resultado y práctica. |
| 2. Contenido | Catálogo inicial, niveles y autoría. |
| 3. Evaluación | Fórmula, dudas, límites y meta inicial. |
| 4. Datos y permisos | Borradores, historial, identidad, idempotencia y vista previa. |
| 5. Integración | Navegación, voz y separación del análisis automático. |
| 6. Validación | Pruebas reproducibles y límites pendientes de uso real. |

## 1. Experiencia

Principio aprobado: **«Sé qué hice bien y sé qué puedo mejorar»**. El diseño funcional aprobado el 12/10/2026 se conserva en esta especificación; el chat de Análisis no sustituye a este propietario. V1 está publicada para validación familiar, con ajustes menores o medios posibles antes de declararla estable.

Acceso: `Mi Universo → Mi Rincón de Dictado`, junto al Rincón de Lectura.

1. Elegir una aventura, con filtro de nivel, extensión y objetivo ortográfico.
2. Preparar lápiz y papel; probar la voz; escuchar opcionalmente el texto completo sin verlo. El inicio del dictado aparece después de esa escucha o de elegir expresamente «Prefiero empezar directamente».
3. Escuchar fragmentos preparados por sentido. Velocidades: Normal (1), Pausada (0.75) y Muy pausada (0.5). El módulo prepara los signos para que el lector compartido los dicte expresamente durante los fragmentos.
4. El texto permanece oculto. «Ya escribí este fragmento → Siguiente» aparece **después de terminar el audio**, debajo de la escucha; no avanza automáticamente. Si el navegador omite el evento de fin, «Ya terminó de sonar» permite confirmar explícitamente el final y detener cualquier audio residual. No se usan temporizadores para certificar escucha ni para avanzar. Un error deja el avance oculto hasta reintentar. Detener, repetir y escuchar el fragmento anterior son acciones explícitas. Cambiar velocidad durante el audio lo repite desde el principio con el nuevo valor. Los borradores anteriores con 0.84/0.65 se recuperan con 0.75/0.5. La diferencia audible requiere comprobación real.
5. Escucha final opcional antes de revelar el modelo. Puede dejarse un borrador para revisar después.
6. Comparación de una frase cada vez con el dictado original en papel. Las palabras empiezan sin revisar. Cada una admite: igual, corregir, omitida o duda. La confirmación explícita convierte las no marcadas en iguales. Signos y palabras añadidas se registran aparte.
7. Solo al completar la revisión aparece el porcentaje. Se elige si la revisión fue a solas o acompañada.
8. Práctica opcional de hasta tres palabras por corregir, con confirmación de corrección en papel. No altera la nota original.
9. Guardar resultado o realizar otro intento independiente. Historial solo lectura con texto, marcas y correcciones posteriores.

Al ocultar/cerrar la página se detiene la voz. Tras reanudar un borrador en fase de escritura debe escucharse otra vez el fragmento actual. Una voz no disponible o un error notificado mantienen el avance oculto hasta volver a escuchar. La confirmación manual del final de audio declara la percepción del alumno, no verifica su escucha.

## 2. Contenido

Seis textos originales, sin datos personales:

| Nivel | Aventuras | Palabras |
|---|---|---|
| 1 | La carta secreta; Una aventura con Shakira | 19; 20 |
| 2 | La maleta del mar; El huerto de la azotea | 30; 32 |
| 3 | Luces tras el telón; Un mapa de estrellas | 51; 56 |

Cada aventura conserva ID, versión, categoría, objetivo y frases divididas en fragmentos. Niveles orientativos, no equivalencias clínicas ni de curso. El texto se conserva con tildes, mayúsculas y signos. No se reutiliza la normalización de coincidencia de voz del Rincón de Lectura.

## 3. Evaluación

`porcentaje = redondear(100 × palabras del texto marcadas como correctas / palabras del texto)`.

- Letras, tildes y mayúsculas forman parte de la revisión manual de una palabra.
- Una palabra con varios fallos cuenta una vez. Las omitidas no son correctas.
- Signos y palabras añadidas se registran aparte; no están incluidos en ese porcentaje. Esta limitación se muestra junto al resultado.
- Una duda o un elemento sin revisar impide el resultado; se conserva pendiente sin fabricar un cero.
- 70 % es una meta familiar inicial motivadora, no una calificación oficial ni un requisito para guardar o celebrar.
- La Academia no lee el manuscrito ni verifica que las marcas coincidan con él. Tipo explícito: `autoevaluacion`.
- Las correcciones posteriores no sobrescriben la revisión inicial. En V1 se marcan en la pantalla de resultado antes del guardado final; después, el historial queda en consulta. Otro intento tiene un ID independiente.
- Volver a comprobar una revisión antes de guardar limpia la selección de práctica para evitar referencias obsoletas.

## 4. Datos y permisos

### Borrador

Un borrador por actor + Persona Activa en `localStorage`, clave `academia.dictados.v1.<actor>.<persona>` (sufijo de Misión cuando corresponde). Contiene fase, texto/versionado referenciado, posición, revisión y práctica. Recuperación valida estructura, versión e índices. Es exclusivo de ese navegador, no se sincroniza. La interfaz lo distingue del historial. Iniciar otra aventura pide confirmar su sustitución. Acceso de consulta y vista previa no leen ni escriben borradores reales.

### Sesión terminada

Reutiliza `usuarios/{userIdPersonaActiva}/sesionesAcademicas/{intentoId}` y el contrato `sesion-academica-v1`. No requiere nuevas colecciones o reglas.

- `actividadId: rincon-dictados`, `materia: lengua`, `cursoReferencia: 6to`, `origen: rincon-dictados`.
- `resumen.tipoEvaluacion: autoevaluacion`.
- `resumen.dictado`: aventura, versión en `versionActividad`, nivel, texto y frases originales (frases como cadenas, sin arrays directamente anidados), revisión por palabra y frase, añadidas, porcentaje, meta, acompañamiento, velocidad, práctica y correcciones.
- `respuestas` y `conceptosTrabajados` vacíos: no se inventan respuestas corregidas automáticamente.
- Práctica libre: `vincularMision: false`. Una Misión explícita y validada añade `misionId` y `focoDictado`; guardar aporta una evidencia y pasa a revisión familiar, sin exigir porcentaje mínimo.
- No se atribuye tiempo activo: la V1 no mide tiempo de escritura en papel.
- ID estable por intento; transacción de creación. Reintentos idénticos no duplican ni reescriben. Si el resultado ya existe y el contenido difiere, se indica consultar el historial o iniciar otro intento.
- Servicio comprueba los campos opcionales de identidad esperada. Cliente verifica de nuevo cuenta, persona y acceso antes de guardar. Las Rules existentes siguen siendo la autorización final.
- Propietario o gestión/administración pueden practicar y guardar; consulta solo ve historial. Vista previa pública `?modo=vista_previa` permite practicar sin identidad, sin Firebase ni persistencia.

### Compatibilidad del servicio compartido

Los campos opcionales nuevos (`intentoId`, `personaIdEsperada`, `actorUserIdEsperado`, `vincularMision`) no cambian el flujo de consumidores anteriores: sin ID estable se mantiene la generación habitual de documentos. `leerSesionesAcademicas` admite `excluirAutoevaluaciones`, aplicado antes de ordenar/limitar.

## 5. Integración

- Navegación contextual y Panel de Usuario compartidos en uso autenticado.
- LectorTexto y celebración compartidos; guacamaya existente como identidad de la Academia, sin declarar una imagen universal de Lía.
- Análisis Educativo excluye autoevaluaciones de Pruebas Académicas y carga Dictado como fuente independiente: véase SPEC-ANALISIS_EDUCATIVO.
- Un enlace genérico de resultado académico a un dictado se redirige a su historial específico, preservando el carácter de autoevaluación.
- Nuevas Misiones: `actividad_modulo` (Misión de Mi Aventura), módulo `rincon-dictados`, evidencia `sesion_academica`. Extiende formulario/listado/API/Mi Camino existentes. Las Misiones publicadas como `repaso_academico/libre` se conservan sin migración y mantienen su contrato original. No modifica Lectura ni Rules.

### Revisión de coherencia con la Academia · revisión 4

| Fuente propietaria revisada | Aplicación en Dictado |
|---|---|
| FOUNDATION y ADN | Ritmo propio, ayuda sin penalizar, lenguaje respetuoso y origen familiar visible en pie de página con enlace a Descubre la Academia. No se reproduce la carta familiar. |
| Product Experience Architecture | Acciones de aprendizaje explícitas; vista previa sin evidencia real; historial de consulta. |
| Identidad visual y personajes | Tipografía Outfit, paleta luminosa, favicon oficial y guacamaya reutilizada; presencia discreta durante la actividad. |
| Guía Ultra Pro, UX y TEL | Una acción principal por momento, instrucciones breves, ayuda desplegable en revisión. Catálogo 3 columnas escritorio, 2 tablet/móvil y 1 por debajo de 360 px. |
| STD-LIA y seguimiento | Reconocimiento concreto del trabajo y siguiente paso; sin comparación ni castigo por porcentaje. Dudas conservadas y resolubles con ayuda. |
| Navegación, Panel de Usuario y accesos | Componentes comunes, Persona Activa, historial separado de práctica; no se crea navegación global propia. |
| Accesibilidad | Foco visible, diálogo con título accesible, estados con texto además de color, objetivos táctiles, movimiento reducido y errores próximos a la actividad. |

El resultado diferencia «Lo que hice bien», «Mi siguiente paso» y la práctica opcional. El historial muestra tanto palabras seleccionadas como correcciones registradas, sin cambiar el porcentaje. La vista autónoma permite probar la actividad, pero la cabecera de cuenta y el historial real corresponden a la integración autenticada.

### Comparación con Rincón de Lectura · revisión 5

Referencia: `mi-universo/rincon-lectura/index.html` y `rincon-lectura-lia.css`, contrastados con el HTML publicado el 12/10/2026 (coincidente con el archivo local). La comparación visual estática no simula una sesión autenticada de Lectura.

| Patrón de Lectura | Aplicación a Dictado |
|---|---|
| Bienvenida con Lía, fondos luminosos y tarjetas redondeadas | Misma familia visual, guacamaya institucional y mensaje específico para escritura. |
| Guía de pasos destacada | Cuatro pasos visibles desde el catálogo y durante la actividad; estado actual con texto y contraste. |
| Contexto de aventura antes de empezar | Descripción, nivel y extensión; el texto a dictar sigue oculto. |
| Controles de voz agrupados | Panel reconocible con velocidad, estado y detención; avance posterior al audio. |
| Celebración de cierre | Diferencia explícita entre prueba sin guardado y resultado guardado. |

Se conservan las diferencias funcionales aprobadas: papel, tildes/mayúsculas relevantes, revisión manual, historial de intentos independientes y cero penalización por ayudas. No se traslada el reconocimiento de voz ni la sustitución de una grabación previa de Lectura. No se modifica el módulo de Lectura ni se extrae un nuevo sistema visual global para este ajuste.

### Conformidad documental e integración · revisión 6

La semejanza visual con Lectura no sustituye los contratos transversales. Se revisa el mapa de documentación activa y se aplican los propietarios pertinentes; `history/` y capacidades futuras no se convierten en requisitos vigentes.

| Propietario vigente | Aplicación y evidencia en V1 publicada para validación |
|---|---|
| FOUNDATION, ADN, principios pedagógicos | Origen institucional, autonomía, pausa, respeto y ausencia de castigo. |
| Product Experience Architecture e identidad visual | Experiencia guiada, assets oficiales, separación de actividad, acompañamiento y evidencia. |
| MODELO_NAVEGACION y MODELO_ARBOL_NAVEGACION | Cabecera canónica fuera del contenedor local; Academia + Volver + ubicación + Panel. Nodo técnico y árbol humano alineados. |
| STD-PANEL_DE_USUARIO | Sin host ni inicialización local: componente global propietario del único Panel. La vista previa indica ausencia de sesión, sin inventar nombre, avatar o menú autenticado. |
| STD-USUARIOS_ROLES_Y_ACCESOS / MODELO_ROLES | ContextoUsuario separa actor y Persona Activa; consulta sin guardado. Servicio verifica identidad esperada. Rules reales pendientes de prueba autenticada. |
| STD-GUIA_DESARROLLO_ULTRA_PRO | Acción principal oportuna, rejilla 3/2/2/1, móvil, teclado, errores visibles, estilos de controles limitados al módulo y al diálogo. |
| STD-LIA | Instrucciones graduales, reconocimiento concreto; no lee el cuaderno ni inventa capacidades. |
| STD-SEGUIMIENTO_Y_MOTIVACION | 70 % orientativo, todo trabajo revisado se reconoce, sin ranking ni recompensa persistida por prueba. |
| STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS | camelCase, contrato sesion-academica-v1, IDs estables y auditoría del servicio compartido; sin colecciones privadas. |
| MODEL_MOTORES_DE_APRENDIZAJE / STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR | Reutiliza sesiones; declara autoevaluación y no la mezcla con corrección automática. Este catálogo original no es una incorporación de material Gaudem ni un Tema curricular nuevo. |
| STD-MIS_TAREAS_Y_MISIONES | Creación/edición en `formTarea`, módulo propio en API/listado/Mi Camino; evidencia del texto asignado y revisión familiar. Refuerzo preparado en el mismo formulario, oculto inicialmente. Sin cierre manual redundante. Véase recuperación 13/10 para evidencias de validación. |
| STD-GLOSARIO | Persona Activa, aventura, revisión e historial conservan su significado; dudas no equivalen a error. |
| DOCUMENTATION_STANDARD / ARCHITECTURE y docs/ai | Propietario único, historial y estado de validación familiar pendiente; HandOff solo continuidad. Corrección de versión final del índice y nodo humano del árbol. |
| PRODUCT_DEVELOPMENT_WORKFLOW | Rama y PR; integración autorizada para validación familiar. Publicación requiere despliegue verificado; estable requiere validación real. |
| STD-AVENTURAS_MATEMATICAS / estándares de Semillas | No aplican sus mecánicas específicas a Dictado; no se añaden motores ni contenidos ajenos al alcance. |

**Cabecera en prueba:** la vista alojada de Dictado usa el componente real con `data-nav-preview=true`; no importa Panel/identidad/Firebase. El paquete descargable incrusta el mismo componente y CSS, adapta las rutas a la Academia publicada y conserva Volver hacia Mi Universo. No representa una sesión autenticada. En uso normal se utiliza el retorno contextual del servicio común, con Persona Activa y Panel canónico. Los controles locales no sobrescriben los estilos de ese Panel.

**Verificado:** cabecera única, sin carga de Panel en preview, único inicio del Panel con identidad simulada, retorno al origen Lectura, ausencia de desbordamiento, recorrido completo de dictado, revisión e historial simulado. **Pendiente:** sonido físico y guardado/permisos con cuentas reales. No se declara conformidad completa en producción basándose solo en dobles de identidad.

### Misiones, historial y análisis · contrato tras recuperación 13/10/2026

El Product Owner autoriza incorporar Misiones y seguimiento a esta V1 para uso familiar. En Gestión de Misiones → Nueva Misión se elige **Misión de Mi Aventura → Mi Rincón de Dictado → aventura**, dentro del formulario común. En Observaciones y refuerzos → Mi Rincón de Dictado → Misiones sugeridas se elige un intento y de uno a tres objetivos: palabras diferentes/omitidas o frases con diferencias, signos o añadidas. Se conserva la referencia al intento original; no se copia ni cambia su calificación. La práctica breve es un intento nuevo y se identifica como refuerzo en los datos.

Las Misiones de refuerzo se preparan inicialmente ocultas en el formulario común; la familia revisa sus campos y decide cuándo mostrarlas. Las aventuras utilizan la visibilidad y demás campos del formulario estándar. No se duplican Misiones abiertas del mismo foco desde este flujo. El alumno solo ejecuta Misiones activas y visibles. El destino incorpora `misionId`; el catálogo queda limitado a la aventura asignada. El contrato exige `actividadId` y `focoDictado` coincidentes y valida además aventura, texto original, referencia de origen y objetivos de refuerzo; copiar un foco no acredita otro texto. Una evidencia válida pasa a revisión familiar; la familia conserva el cierre final. Repetir o pedir ayuda no penaliza.

El guardado original y la evidencia de Misión son operaciones independientes: si falla la segunda, el resultado sigue en el historial y se ofrece reintentar sin duplicar el intento. El borrador local se conserva para recuperar ese reintento en el mismo navegador. Si el almacenamiento local no está disponible, ese reintento solo permanece en la pantalla actual. La consulta de Trabajo realizado lleva al historial específico de Dictado.

El análisis usa hasta 200 sesiones, excluye datos de prueba (incluidas Misiones marcadas después) y compara únicamente texto idéntico, mismo acompañamiento y mismo tipo de práctica. No promedia aventuras de distinta dificultad con ejercicios de una palabra. Las señales son descriptivas de la autoevaluación, no diagnósticos. La familia elige y activa cualquier nueva Misión; ninguna se asigna automáticamente. El detalle completo de errores y correcciones permanece en el historial propietario.

### Recuperación de estándares · 13/10/2026

La auditoría encontró que la V1 había documentado como válida una creación paralela mediante `repaso_academico/libre`. Esa clasificación y el creador/listado independiente quedan sustituidos en la reparación #159 integrada; el diseño funcional aprobado no cambia.

| Hallazgo | Corrección y evidencia verificable |
|---|---|
| Creación fuera del formulario | Configuración `configuracionDictado` dentro de `formTarea`; catálogo original `AVENTURAS`; guardar/editar/fechas/presentación mediante `mis-tareas.js`. |
| Tipo y módulo incorrectos | `actividad_modulo/rincon-dictados` en `prepararMision`, API y catálogos de Gestión/Mi Camino. |
| Listado y visibilidad duplicados | Observaciones prepara un evento para el formulario; no crea documentos por su cuenta. Desde la primera revisión familiar, Misiones preparadas consulta los mismos registros y gestiona su visibilidad mediante Academia.tareas; la edición abre el formulario común. |
| Cierre redundante | Las Misiones de Dictado, incluidas anteriores, ejecutan el destino real y envían evidencia al guardar; Mi Camino no ofrece el cierre manual de repaso. |
| Aventura ajena con foco copiado | Cliente limita nuevos intentos a la asignada; `validarIntentoMision` compara el texto y objetivos antes de enlazar evidencia. Un intento no atribuible se conserva sin acreditar la Misión. |
| Edición opaca | Misiones anteriores muestran aviso y controles de contrato bloqueados; sin migración. Refuerzos conservan sus objetivos. El selector de Misión libre respeta el bloqueo canónico. |
| Bienvenida e historial | Jerarquía visual basada en la composición de Lectura, saludo a Persona Activa, pasos desde el catálogo, contexto/ayuda de Misión. Historial identifica aventura/práctica breve y extensión. CSS local consolidado y legible. |
| Prueba aislada del bloque nuevo | `dictados-misiones-browser.cjs` usa HTML/formulario/listado/Mi Camino/API/sesiones reales. Solo identidad, SDK Firestore, voz y paneles ajenos al caso se sustituyen. |

El reinicio interno del formulario evita volver a disparar su propio manejador de `reset`. Es una corrección de integración detectada al ejercitar el formulario real, no un cambio funcional nuevo.

La semejanza visual no obliga a copiar reconocimiento de voz, animales, métricas o mecanismos particulares de Lectura. No se declara estabilidad ni cumplimiento de Rules desplegadas mediante pruebas simuladas.

### Ajustes de primera revisión familiar · 13/10/2026

| Observación y referencia real | Ajuste integrado mediante #161 |
|---|---|
| Aviso amarillo antes del resultado (`dictados.js`: `prepend`) | `mensaje` queda como último elemento del panel activo; mantiene `role=status` y `aria-live=polite` en actividad, catálogo e historial. |
| Dictado mostraba todo directamente; Lectura y Detectives usan `grupo-refuerzo`/`subgrupo-refuerzo` | Las funciones existentes se extraen sin duplicación a `mis-tareas/grupos-refuerzos.js`. Los tres módulos comparten acordeón cerrado, icono, resumen, flecha, bordes, espaciado y apertura exclusiva del grupo. Misiones preparadas/sugeridas permanecen independientes. No se crea CSS alternativo. |
| Faltaba consulta de refuerzos preparados en Observaciones | `listaMisionesDictado` muestra refuerzos abiertos reales, incluidos contratos anteriores, estado, objetivos y visibilidad. `Academia.tareas` conserva el único registro. Activar añade al final del orden visible; ocultar usa 9999, igual que Lectura/Detectives. Revisar abre `cargarTareaEnFormulario`, sin editor alternativo. |
| Sin banda en acceso libre; Lectura declara explícitamente su contexto | Banda «🌈 Dictado libre», «Este dictado no pertenece a ninguna misión.», «Sin misión» y «Estado: Dictado libre». Composición basada en `reading-mission`; ayuda solo para Misión. Historial solicitado por URL conserva consulta sin atribuirle ejecución libre. |
| Nombre discordante entre cabecera, menú y catálogos | Nombre visible **Mi Rincón de Dictado**, coherente con Lectura/Escritura; `rincon-dictados`, rutas, evidencia, sesiones y contratos persistidos permanecen iguales. |

La selección sigue siendo familiar a partir de la autoevaluación más reciente de cada texto; no adopta umbrales de Detectives ni diagnostica dificultades. No se asigna ninguna Misión automáticamente. El diseño funcional aprobado se conserva.

## 6. Validación

Pruebas de cálculo/contenido:

```sh
node --test tests/dictados-modelo.test.mjs tests/dictados-seguimiento.test.mjs
node --experimental-vm-modules --test tests/dictados-sesiones.test.mjs
```

Prueba de interfaz con Playwright y servidor local (puerto 8765 por defecto; configurable con `BASE_URL`):

```sh
python -m http.server 8765
node tests/dictados-browser.cjs
node tests/dictados-navegacion.cjs
node tests/dictados-misiones-browser.cjs
```

La prueba de navegador simula voz y servicio Firebase. La prueba del servicio ejecuta el módulo real con dobles de Firestore. Ninguna escribe datos reales. Se verificaron seis aventuras, cálculo y dudas, serialización compatible, identidad esperada, envío idempotente incluso con claves reordenadas por Firestore, compatibilidad de consumidores anteriores y flujo en navegador de escritorio/móvil. La prueba de interfaz cubre también velocidad, errores de voz, borrador aislado, reintento tras fallo y resultado por debajo del 70 %. No sustituyen la comprobación de la voz física en Edge/Chrome ni el guardado autenticado con las Rules realmente desplegadas. Esos dos puntos deben validarse en el primer uso familiar.

### Criterio de aceptación y primera prueba familiar

1. Abrir la aventura Nivel 1 «La carta secreta», con lápiz y papel y la Persona Activa correcta.
2. Probar la voz, ajustar velocidad, repetir y avanzar manualmente sin ver el texto.
3. Descansar y volver desde el mismo navegador para comprobar el borrador.
4. Revisar una frase cada vez: incluir una palabra diferente, una omitida, una añadida y una duda; resolver esta última antes de cerrar.
5. Confirmar que signos y añadidas se registran aparte y que el porcentaje describe la revisión del intento original.
6. Elegir hasta tres palabras, practicar en papel y guardar indicando revisión sola o acompañada, también con resultado menor que el 70 %.
7. Abrir el historial: comprobar fecha, nivel, resultado, marcas y práctica. Un nuevo intento no sustituye al anterior.

8. Como familia, crear una Misión de aventura, mostrarla y completarla; revisar su evidencia. A partir de ese intento, preparar una Misión breve con palabras/frases y comprobar que el resultado original sigue intacto y el análisis separa ambos textos.

Registrar observaciones de comprensión, ritmo y autonomía; ajustar lo necesario y validar de nuevo antes de cambiar el estado a estable. La V1 no incorpora teclado obligatorio, fotos, OCR, IA para leer el manuscrito, pausas automáticas complejas ni penalización por ayudas.

**Verificación de reparación:** 16 pruebas de modelo/seguimiento/servicio; navegación con componentes reales y voz/identidad simuladas; recorrido del formulario/listado/API/Mi Camino/sesiones reales con SDK Firestore simulado; edición y ejecución de contrato anterior sin migración; regresión de Lectura/Detectives/Semillas/Curso/Misión libre; exportación autónoma con Shakira completa, sin Firebase ni persistencia. Revisión visual de cabecera/formulario y anchos 1280/768/390/320. Estas verificaciones no sustituyen audio físico, Rules ni persistencia con cuentas reales.

## DECISIÓN

| Campo | Valor |
|---|---|
| Diseño | Aprobado para construir primera versión · 12/10/2026 |
| Entrega | #161 aprobada, integrada y publicada; Pages #766 `success`. Validación familiar continúa; sin declarar estabilidad |
| Siguiente paso | Probar una aventura Nivel 1 con lápiz y papel; ajustar ritmo y revisión según uso |
