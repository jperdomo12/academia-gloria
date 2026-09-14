# 🔄 Academia Gloria Valentina · HandOff
## Plantilla viva de continuidad

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` |
| **Versión** | 2.6 |
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

El paquete funcional fue trabajado y validado durante este ciclo, pero el Issue #108 **sigue OPEN y su cuerpo está desactualizado**. Después de resolver el defecto visual actual de `Academia de un vistazo`, sincronizar/cerrar el issue si no queda pendiente real.

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

Hero aprobado en composición:
- Gloria a la izquierda;
- título y subtítulo al centro;
- guacamaya + Alumno/Familia/Profesionales/IA a la derecha.

`0eb6b928...` integró una primera Gloria inline. El Product Owner aprobó **posición y composición**, pero pidió sustituir el dibujo por una ilustración concreta seleccionada después.

---

## 🔴 9. TRABAJO ON GOING · reparar ilustración de Gloria

Este es el **siguiente paso exacto** del nuevo chat.

### 9.1 Requisito

Usar **exactamente el archivo seleccionado `Niña Gloria.jpg`** para reemplazar la niña del hero de `Academia de un vistazo`.

No generar una nueva imagen. Si el nuevo chat no dispone del archivo, pedir únicamente que el Product Owner lo vuelva a adjuntar.

La imagen seleccionada muestra una niña sentada junto a cuatro libros con los textos `Explora`, `Aprende`, `Crece`, `Sueña`, camiseta violeta, jeans y flor violeta en el cabello.

### 9.2 Estado técnico actual

- `8a9a633ff751509c5d13edda99eddb5738938318` crea `assets/imagenes/personajes/gloria-academia-un-vistazo.svg`.
- `5ae3634350691add7993dc1ed84197c4d430e1c0` hace que `descubre-la-academia/guia.css` use ese asset como fondo de `.overview-girl` y oculte el SVG inline anterior.
- GitHub Pages #665 terminó `success` técnicamente.
- Validación visual del Product Owner: **fallida**; aparece el icono de imagen rota en lugar de Gloria.

Causa verificada: el SVG contiene un `data:image/webp;base64,...` cuyo payload no es un WebP válido/completo. El build de Pages puede ser exitoso aunque el recurso interno no renderice.

### 9.3 Corrección esperada

```text
mantener layout/posición aprobados
+ sustituir únicamente el recurso roto
+ usar el archivo exacto elegido
+ validar desktop y móvil
```

Preferir un PNG/WebP válido como asset real. Si el conector de contenidos no admite binarios, usar Git Data API (`create_blob` con base64 → `create_tree` → `create_commit` → `update_ref`).

El Product Owner autorizó este fix de bajo impacto **directamente en `main`**, tras verificar HEAD.

### 9.4 Observación menor

Las URLs de Descubre pueden mostrar `volver=` anidados en recorridos repetidos. La Guía rápida limpia su propio retorno, pero no asumir que el anidamiento global está completamente resuelto. Tratarlo solo si vuelve a ser una necesidad real.

---

## ⏳ 10. Backlog después del fix actual

1. Sincronizar/cerrar Issue #108 si ya no queda pendiente de invitación.
2. Explicar la configuración de peso/niveles de Misiones cuando el Product Owner lo retome.
3. Velocidad de voz por Persona: `Normal / Pausada / Muy pausada` mediante mecanismo compartido.
4. Mi Universo · comprensión de preguntas.
5. Actividades sugeridas desde email, reutilizando capacidades existentes.
6. Creciendo por Dentro · formalizar proceso de nuevas Semillas.
7. Evaluar ChatGPT Work con un caso real de material escolar.

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
| **HEAD de producto previo a este HandOff** | `5ae3634350691add7993dc1ed84197c4d430e1c0` |
| **Rama On going** | Ninguna |
| **PR On going** | Ninguna |
| **Trabajo inmediato** | 🔴 Reparar ilustración de Gloria en `Academia de un vistazo` |
| **Último Pages relevante** | #665 · deploy técnico exitoso; validación visual fallida |
| **Mi Camino** | ✅ Cerrado y validado |
| **Bitácora** | ✅ Cerrada y validada |
| **Horario / Menú / Calendario** | ✅ Cerrados |
| **Guía rápida** | ✅ Publicada, orientada al alumno y sensible a sesión |
| **Email de invitación** | ✅ Trabajado/cerrado en este ciclo |
| **Academia de un vistazo** | 🟡 General aprobada; imagen de Gloria rota |
| **Issue #108** | 🟡 OPEN y desactualizado |
| **Estado operativo** | 🌿 Fase de uso prioritario |
| **Carril curricular 6.º** | ✅ Activo |

---

## ▶️ 13. Siguiente paso exacto

Al iniciar el nuevo chat:

1. leer este HandOff + `docs/ai/AI_CHAT_BOOTSTRAP.md`;
2. verificar HEAD real de `main`;
3. revisar `descubre-la-academia/guia.css`, `descubre-la-academia/guia.js` y `assets/imagenes/personajes/gloria-academia-un-vistazo.svg`;
4. reemplazar el asset roto por el archivo `Niña Gloria.jpg` seleccionado;
5. mantener layout/posición ya aprobados;
6. desplegar y validar desktop + móvil;
7. pedir solo validación visual final al Product Owner;
8. sincronizar/cerrar Issue #108 si no queda otro pendiente;
9. regresar a uso prioritario + material real de 6.º + resolución de issues reales.

---

# 🟣 Última actualización — 14/09/2026

## Trabajo On going

> **Corregir el recurso visual de Gloria en `Academia de un vistazo`: el asset actual muestra imagen rota.**

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión** | 2.6 |
| **Estado operativo** | 🌿 Fase de uso prioritario |
| **Trabajo On going** | 🔴 Reparar imagen de Gloria |
| **PR On going** | Ninguno |
| **Directo a main para este fix** | ✅ Autorizado por el Product Owner |
| **Issue #108** | 🟡 OPEN; pendiente sincronización/cierre |
| **Siguiente paso** | Reparar asset → validar → sincronizar/cerrar #108 → volver a uso prioritario |
| **Mecanismo de continuidad** | GitHub `main` + HandOff + Bootstrap + verificación dirigida |
| **Autoridad sobre estado implementado** | Repositorio y fuentes propietarias verificadas |
