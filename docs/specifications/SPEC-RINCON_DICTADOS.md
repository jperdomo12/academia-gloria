# Rincón del Dictado

| Campo | Valor |
|---|---|
| Ruta oficial | `docs/specifications/SPEC-RINCON_DICTADOS.md` |
| Versión | 1.0-rc4 |
| Estado | V1 candidata en PR #157 · pendiente de integración y validación familiar |
| Fecha | 12/10/2026 |
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

Principio aprobado: **«Sé qué hice bien y sé qué puedo mejorar»**. El diseño funcional aprobado el 12/10/2026 se conserva en esta especificación; el chat de Análisis no sustituye a este propietario. V1 es una candidata para uso real, con ajustes menores o medios posibles antes de declararla estable.

Acceso: `Mi Universo → Rincón del Dictado`, junto al Rincón de Lectura.

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

Un borrador por actor + Persona Activa en `localStorage`, clave `academia.dictados.v1.<actor>.<persona>`. Contiene fase, texto/versionado referenciado, posición, revisión y práctica. Recuperación valida estructura, versión e índices. Es exclusivo de ese navegador, no se sincroniza. La interfaz lo distingue del historial. Iniciar otra aventura pide confirmar su sustitución. Acceso de consulta y vista previa no leen ni escriben borradores reales.

### Sesión terminada

Reutiliza `usuarios/{userIdPersonaActiva}/sesionesAcademicas/{intentoId}` y el contrato `sesion-academica-v1`. No requiere nuevas colecciones o reglas.

- `actividadId: rincon-dictados`, `materia: lengua`, `cursoReferencia: 6to`, `origen: rincon-dictados`.
- `resumen.tipoEvaluacion: autoevaluacion`.
- `resumen.dictado`: aventura, versión en `versionActividad`, nivel, texto y frases originales (frases como cadenas, sin arrays directamente anidados), revisión por palabra y frase, añadidas, porcentaje, meta, acompañamiento, velocidad, práctica y correcciones.
- `respuestas` y `conceptosTrabajados` vacíos: no se inventan respuestas corregidas automáticamente.
- `vincularMision: false` impide heredar `misionId` de la URL. V1 no completa Misiones automáticamente.
- No se atribuye tiempo activo: la V1 no mide tiempo de escritura en papel.
- ID estable por intento; transacción de creación. Reintentos idénticos no duplican ni reescriben. Si el resultado ya existe y el contenido difiere, se indica consultar el historial o iniciar otro intento.
- Servicio comprueba los campos opcionales de identidad esperada. Cliente verifica de nuevo cuenta, persona y acceso antes de guardar. Las Rules existentes siguen siendo la autorización final.
- Propietario o gestión/administración pueden practicar y guardar; consulta solo ve historial. Vista previa pública `?modo=vista_previa` permite practicar sin identidad, sin Firebase ni persistencia.

### Compatibilidad del servicio compartido

Los campos opcionales nuevos (`intentoId`, `personaIdEsperada`, `actorUserIdEsperado`, `vincularMision`) no cambian el flujo de consumidores anteriores: sin ID estable se mantiene la generación habitual de documentos. `leerSesionesAcademicas` admite `excluirAutoevaluaciones`, aplicado antes de ordenar/limitar.

## 5. Integración

- Navegación contextual y Panel de Usuario compartidos en uso autenticado.
- LectorTexto y celebración compartidos; guacamaya existente como identidad de la Academia, sin declarar una imagen universal de Lía.
- Análisis Educativo solicita `excluirAutoevaluaciones: true` para no mezclar estas revisiones manuales con ejercicios corregidos automáticamente.
- Un enlace genérico de resultado académico a un dictado se redirige a su historial específico, preservando el carácter de autoevaluación.
- No se modifica Rincón de Lectura, Rules ni catálogo de Misiones.

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

## 6. Validación

Pruebas de cálculo/contenido:

```sh
node --test tests/dictados-modelo.test.mjs
node --experimental-vm-modules --test tests/dictados-sesiones.test.mjs
```

Prueba de interfaz con Playwright y servidor local (puerto 8765 por defecto; configurable con `BASE_URL`):

```sh
python -m http.server 8765
node tests/dictados-browser.cjs
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

Registrar observaciones de comprensión, ritmo y autonomía; ajustar lo necesario y validar de nuevo antes de cambiar el estado a estable. La V1 no incorpora teclado obligatorio, fotos, OCR, IA para leer el manuscrito, pausas automáticas complejas ni penalización por ayudas.

## DECISIÓN

| Campo | Valor |
|---|---|
| Diseño | Aprobado para construir primera versión · 12/10/2026 |
| Entrega | V1 candidata; pendiente de revisión de experiencia familiar |
| Siguiente paso | Probar una aventura Nivel 1 con lápiz y papel; ajustar ritmo y revisión según uso |
