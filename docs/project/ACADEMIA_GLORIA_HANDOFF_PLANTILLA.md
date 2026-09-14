# 🔄 Academia Gloria Valentina · HandOff
## Plantilla viva de continuidad

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` |
| **Versión** | 2.7 |
| **Estado** | Activo · Fase de uso prioritario 2026–2027 |
| **Fecha de origen** | 03/09/2026 |
| **Última actualización** | 14/09/2026 |
| **Propietario** | Gobierno y Continuidad del Proyecto |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Continuidad operativa entre chats, personas o IA sin reconstruir conversaciones anteriores |

## 🔗 Documentos relacionados

- `docs/ai/AI_CHAT_BOOTSTRAP.md` · protocolo para iniciar un nuevo chat.
- `docs/ai/AI_COLLABORATION_GUIDE.md` · modelo de colaboración Personas + Documentación + IA.
- `docs/DOCUMENTATION_STANDARD.md` · estándar documental.
- `docs/FOUNDATION.md` · propósito e identidad de Academia.
- `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` · flujo de construcción y cierre.
- `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` · arquitectura conceptual de experiencia.
- `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` · identidad visual y personajes.
- `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` · incorporación curricular de 6.º.
- `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` · identidad, roles y accesos.

## 🕘 Historial de versiones

| Versión | Fecha | Cambios |
|---|---:|---|
| 2.7 | 14/09/2026 | Cierra el trabajo On going de `Academia de un vistazo`: sustituye el asset roto de Gloria por un WebP válido, ajusta el fondo para integrarlo con el hero, valida el resultado con el Product Owner, incorpora `assets/identidad/ACADEMIA_GLORIA-VALENTINA_OVERVIEW.jpg` como referencia visual del producto, retira el SVG defectuoso obsoleto y cierra Issue #108. |
| 2.6 | 14/09/2026 | Consolida todo el trabajo posterior a Mi Camino: guía visual de 7 etapas, renombre `Gestión de Mi Camino`, acceso compacto a Bitácora, Guía rápida + invitaciones, refinamientos de Inicio/Descubre, responsive móvil, `Academia de un vistazo`, Guía rápida sensible a sesión y el defecto visual actual de la ilustración de Gloria. |
| 2.5 | 12/09/2026 | Cierra revisión visual `Así crece mi camino` y alinea el render inicial al modelo canónico de 7 etapas. |
| 2.4 | 12/09/2026 | Cierra PR #122: niveles Bajo/Medio/Alto, configuración Área/Tema, auditoría, navegación, Rules v1/v2 y documentación v1.3. |
| 2.3 | 12/09/2026 | Consolida PR #114–#119: Semilla 007, Constancia, crecimiento real, escucha única y Administración de Mi Camino. |
| 2.2 | 09/09/2026 | Registra Calendario 2026–2027, Menú del Cole, Horario V1, recursos oficiales Gaudem e Issue #108. |
| 2.1 | 06/09/2026 | Cierra Bitácora V1, PR #83/#85 y Rules publicadas/validadas. |
| 1.x | 03–06/09/2026 | Activación del HandOff, fase de uso prioritario, observación de accesos y consolidación documental P0/P1/P2. |

---

## 🎯 1. Propósito

Permitir continuar Academia Gloria Valentina en otro chat de forma rápida y segura conservando el contexto operativo reciente que todavía no se deduce con facilidad del resto de fuentes oficiales.

> **El HandOff orienta; las fuentes propietarias y el producto real gobiernan.**

---

## 🧭 2. Cómo iniciar el siguiente chat

Con GitHub conectado, usar:

```text
Continuamos el proyecto Academia Gloria Valentina.
Revisa en jperdomo12/academia-gloria, rama main:
1. `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md`;
2. `docs/ai/AI_CHAT_BOOTSTRAP.md`;
3. las fuentes propietarias necesarias antes de actuar.

No reconstruyas conversaciones anteriores ni me pidas contexto ya documentado.
Si existe trabajo On going, revísalo antes de iniciar algo nuevo.
Al comenzar, dime brevemente que revisaste el contexto y estás listo.
```

La ruta canónica para contexto de IA es `docs/ai/`. No crear `docs/ia/`.

---

## ⚖️ 3. Regla de autoridad y forma de trabajo

- GitHub `main` es la base canónica integrada.
- Verificar código/documentación antes de afirmar que algo está implementado, cerrado o vigente.
- Reutilizar antes de crear.
- No pedir al Product Owner que edite código manualmente si la AI Collaborator puede hacerlo.
- Flujo normal: rama → PR → revisión → aprobación del Product Owner → merge → verificación.
- El Product Owner autoriza cambios directos a `main` cuando sean de bajo impacto y se haya verificado que no afectan datos, seguridad, arquitectura o funcionalidad sensible.
- Cuando exista PR relevante, indicar explícitamente su número.
- Firestore Rules en Git no equivalen a Rules desplegadas en Firebase.

---

## 🌿 4. Fase operativa actual

Desde 05/09/2026 Academia está en **Fase de uso prioritario**:

```text
USAR LO EXISTENTE
+ ALIMENTAR 6.º CON MATERIAL REAL DEL COLEGIO
+ OBSERVAR UTILIDAD Y MOTIVACIÓN
+ RESOLVER RÁPIDO ISSUES REALES
→ DECIDIR DESPUÉS QUÉ NUEVAS FUNCIONES MERECEN CRECER
```

No priorizar por iniciativa propia nuevas funciones generales, refactors preventivos o cambios de navegación que no respondan a una necesidad real.

### 4.1 Carril curricular de 6.º

Propietario: `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`.

Entrada mínima suficiente: material del colegio + 6.º + materia + tema + notas opcionales + “Incorporar a la Academia”. La AI Collaborator resuelve estructura, rutas, evidencia, integración, navegación, Persona Activa, histórico y flujo Git.

Para nuevos portales de materia, revisar recursos oficiales Gaudem y reutilizar el patrón existente solo cuando corresponda. Los recursos externos se mantienen diferenciados del contenido propio y condicionados al perfil adecuado.

---

## ✅ 5. Estado estable reciente

### 5.1 Mi Camino

- PR #117 · crecimiento visual real.
- 7 etapas: `Semilla → Brote → Plantita → Árbol joven → Árbol → Árbol con frutos → Árbol lleno de frutos`.
- Nivel técnico por Misión: `Bajo=1`, `Medio=2`, `Alto=3` unidades internas.
- Precedencia: Misión → actividad → Tema → Área → Medio.
- Umbrales predeterminados: `0 / 30 / 140 / 260 / 400 / 560 / 740`.
- PR #118 · una sola observación de Misiones.
- PR #119 · Administración de Mi Camino.
- PR #122 · configuración Área/Tema, auditoría, navegación estándar y Rules v1/v2 publicadas.
- `3b31a6f9...` · render inicial alineado a 7 etapas.
- `03c09a57...` + `0d628277...` · modal `Así crece mi camino` alineado y compactado; validado por el Product Owner.
- `f43c9aeb...` + `ce8b051e...` · nombre visible **Gestión de Mi Camino**; IDs/rutas no cambiaron.

Pendiente personal del Product Owner: comprender mejor cómo configurar el peso/nivel de las Misiones. No hay cambio funcional solicitado; cuando se retome, explicar con ejemplos la precedencia y el efecto de Bajo/Medio/Alto.

### 5.2 Bitácora

Bitácora V1 continúa cerrada y validada: PR #83/#85 + SPEC 1.0 + Rules publicadas.

Acceso compacto desde Inicio:
- `ca3cd428...`;
- `340d4fea...`;
- `cb8cb9f9...`.

Criterio: se decide por **USER autenticado**, no por Persona Activa. Visible para USER no alumno; oculto para USER alumno. Validado por el Product Owner.

### 5.3 Utilidades escolares

- Calendario 2026–2027 · PR #87.
- Menú del Cole V1 · PR #88–#93.
- Mi horario V1 · PR #96–#107 + #109/#110.
- Recursos oficiales Gaudem 6.º/Matemáticas · PR #111–#113.

---

## 🌈 6. Issue #108 · Guía rápida e invitaciones

Issue: **#108 · P1 · Guía rápida + email de invitación para nuevos alumnos**.

### 6.1 Estado real

✅ **CERRADO / COMPLETADO y validado por el Product Owner.**

El paquete de Guía rápida + invitaciones quedó cerrado. `Academia de un vistazo` también fue refinada y validada visualmente, eliminando el último defecto que mantenía abierto este frente. El Issue #108 queda cerrado como referencia histórica del trabajo.

### 6.2 Decisiones para las primeras invitaciones

- Compartir Academia de forma natural, no como experimento/piloto.
- Primera etapa: USER alumno solamente; no cuentas de familias por ahora.
- No preparar Misiones específicas inicialmente.
- Permitir exploración libre de Mi Universo, Mis Cursos disponibles, Calendarios/Horario y Mi Camino.
- 5.º permanece congelado; no prometer contenido actualizado.
- 6.º crece con material escolar real.
- Feedback inicial mediante respuesta al email; Bitácora no se convierte por ahora en canal de feedback de producto.

### 6.3 Guía rápida

Ruta: `descubre-la-academia/guia-rapida.html`.

Contenido aprobado:
1. `🔑 1. Entra por la Puerta Mágica`;
2. `🌈 Mi Universo`, `🎓 Mis Cursos`, `🗓️ Calendarios`, `🗺️ Mi Camino`;
3. `🚀 3. ¿Por dónde empiezo?` con exploración libre;
4. ruta `Inicio → Descubre la Academia → Guía rápida de uso`;
5. cierre `Aprender con calma, confianza, curiosidad y color. 🌈`.

Commits principales: `0eb41e77...`, `d94e2d63...`, `2ae8f60d...`, `defc9193...`, `7635aa22...`.

Sesión activa:
- `af277ca4...` adapta texto/flujo;
- `c30af612...` oculta correctamente los accesos de Login cuando el USER ya está conectado.

Validado visualmente por el Product Owner.

### 6.4 Email de invitación

El email quedó trabajado/cerrado como mensaje breve, cálido e institucional, acompañado por el brochure. Incluye presentación de Academia, acceso a la Puerta Mágica, datos de acceso del alumno, referencia a Mi Universo/Mis Cursos/Calendarios/Mi Camino, enlace y ruta a la Guía rápida, invitación a explorar sin obligación de completar una actividad y feedback respondiendo al propio correo.

Tono preferido: **“Nos alegra compartir…”**.

Referencia visual conservada en GitHub:

`assets/identidad/ACADEMIA_GLORIA-VALENTINA_OVERVIEW.jpg`

---

## 🏠 7. Inicio y Descubre · refinamientos cerrados

Commits de bajo impacto autorizados directamente en `main`:

- `2efa7070...` · mejor aprovechamiento del ancho de bloques principales;
- `b6728914...` · retirada de pistas separadas de interacción;
- `4af22d63...` + `b6c8c105...` · mensajes de Descubre y Mi Camino;
- `84bfb768...` + `e38c23cd...` · CTA violeta y versionado;
- `d6e3d246...` + `c6b26be1...` · `Explora más` a una columna en móvil `≤640px`, dos en tablet y tres en desktop; validado en iPhone.

Los mensajes dinámicos de Mi Camino continúan intactos. No volver a añadir una tarjeta independiente de Guía rápida en Inicio: **Descubre la Academia** es la puerta natural para presentación y ayuda.

---

## 🌈 8. `Academia de un vistazo` · brochure digital

Decisión aprobada: dentro de Descubre mostrar dos accesos hermanos:

- `🌈 Academia de un vistazo →`
- `📘 Guía rápida · Empieza aquí →`

No añadir otra llamada independiente en Inicio.

Implementación:
- `d76a15b2...` · añade `Academia de un vistazo` dentro de `descubre-la-academia/index.html` mediante `#academia-de-un-vistazo`;
- vista web responsive, no simple imagen estática;
- bloques: Propósito, Cómo funciona, Así se vive la Academia, Lo que hace diferente a la Academia y Una historia real que sigue creciendo;
- contenido general validado por el Product Owner.

Hero final aprobado:
- Gloria a la izquierda;
- título y subtítulo al centro;
- guacamaya + Alumno/Familia/Profesionales/IA a la derecha;
- ilustración de Gloria integrada mediante `assets/imagenes/personajes/gloria-academia-un-vistazo.webp`;
- fondo de la ilustración ajustado para integrarse con el fondo menta del hero.

Secuencia final del fix:
- `e1ff64f0...` · WebP válido de Gloria;
- `b8c6d08b...` · ajuste visual del fondo de Gloria para integrarlo con el hero;
- GitHub Pages #670 · `success`;
- validación visual final del Product Owner: ✅ aprobada.

El SVG defectuoso `assets/imagenes/personajes/gloria-academia-un-vistazo.svg` fue retirado al cerrar el punto.

El brochure original se conserva como referencia visual de identidad en:

`assets/identidad/ACADEMIA_GLORIA-VALENTINA_OVERVIEW.jpg`

---

## ✅ 9. TRABAJO ON GOING

No hay trabajo On going activo al cierre de esta actualización.

El frente `Academia de un vistazo` + Guía rápida + invitaciones queda cerrado. No reabrirlo salvo que aparezca una necesidad real de uso, un defecto verificable o una nueva decisión del Product Owner.

### 9.1 Observación menor no bloqueante

Las URLs de Descubre pueden mostrar `volver=` anidados en recorridos repetidos. La Guía rápida limpia su propio retorno, pero no asumir que el anidamiento global está completamente resuelto. Tratarlo solo si vuelve a ser una necesidad real.

---

## ⏳ 10. Backlog posterior

1. Explicar la configuración de peso/niveles de Misiones cuando el Product Owner lo retome.
2. Velocidad de voz por Persona: `Normal / Pausada / Muy pausada` mediante mecanismo compartido.
3. Mi Universo · comprensión de preguntas.
4. Actividades sugeridas desde email, reutilizando capacidades existentes.
5. Creciendo por Dentro · formalizar proceso de nuevas Semillas.
6. Evaluar ChatGPT Work con un caso real de material escolar.

---

## 🌿 11. Reglas que no deben perderse

- Productos visibles para alumnos deben ser **motivadores, coloridos, amigables y visuales**, manteniendo simplicidad y sin sobrecargar.
- Persona Activa persiste durante navegación interna.
- Vista previa no persiste progreso/evidencia.
- Históricos y `Ver trabajo` son solo lectura.
- Recompensas no usan rankings ni comparación.
- Datos de prueba no contaminan análisis/reconocimientos.
- Recursos oficiales del colegio son externos y diferenciados del contenido propio.
- El nivel técnico de Mi Camino usa una sola precedencia canónica.
- No convertir ideas exploratorias en requisitos aprobados automáticamente.

---

## 🌿 12. Estado operativo actual

| Campo | Valor actual |
|---|---|
| **Base canónica** | `main` |
| **Baseline funcional cerrado** | `8b93f1b00618d3c7f73e18da4bf7fd6aff2d1db4` |
| **HEAD relevante al cierre** | verificar `main` al iniciar el siguiente trabajo |
| **Rama On going** | Ninguna |
| **PR On going** | Ninguna |
| **Trabajo inmediato** | Ninguno obligatorio; volver a uso prioritario y material real de 6.º |
| **Último Pages relevante** | #670 · deploy exitoso y validado visualmente |
| **Mi Camino** | ✅ Cerrado y validado |
| **Bitácora** | ✅ Cerrada y validada |
| **Horario / Menú / Calendario** | ✅ Cerrados |
| **Guía rápida** | ✅ Publicada, orientada al alumno y sensible a sesión |
| **Email de invitación** | ✅ Cerrado |
| **Academia de un vistazo** | ✅ Cerrada y validada |
| **Brochure overview** | ✅ Conservado en `assets/identidad/ACADEMIA_GLORIA-VALENTINA_OVERVIEW.jpg` |
| **Issue #108** | ✅ Cerrado/completado |
| **Estado operativo** | 🌿 Fase de uso prioritario |
| **Carril curricular 6.º** | ✅ Activo |

---

## ▶️ 13. Siguiente paso exacto

Al iniciar o retomar trabajo:

1. leer este HandOff + `docs/ai/AI_CHAT_BOOTSTRAP.md`;
2. verificar HEAD real de `main`;
3. confirmar que no exista un nuevo trabajo On going antes de iniciar otro frente;
4. continuar la **Fase de uso prioritario**;
5. priorizar material real de 6.º, uso real de Gloria y resolución de issues reales;
6. retomar el backlog solo cuando exista una decisión o necesidad concreta.

---

# 🟣 Última actualización — 14/09/2026

## Trabajo On going

> **Ninguno.** El frente `Academia de un vistazo` + Guía rápida + invitaciones quedó cerrado y validado.

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión** | 2.7 |
| **Estado operativo** | 🌿 Fase de uso prioritario |
| **Trabajo On going** | Ninguno |
| **PR On going** | Ninguno |
| **Issue #108** | ✅ Cerrado/completado |
| **Academia de un vistazo** | ✅ Cerrada y validada |
| **Brochure** | ✅ `assets/identidad/ACADEMIA_GLORIA-VALENTINA_OVERVIEW.jpg` |
| **Siguiente paso** | Uso prioritario → material real de 6.º → resolver issues reales |
| **Mecanismo de continuidad** | GitHub `main` + HandOff + Bootstrap + verificación dirigida |
| **Autoridad sobre estado implementado** | Repositorio y fuentes propietarias verificadas |