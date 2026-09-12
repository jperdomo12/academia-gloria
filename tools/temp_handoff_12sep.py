from pathlib import Path

path = Path('docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md')
text = path.read_text(encoding='utf-8')

text = text.replace('| **Versión** | 2.2 |', '| **Versión** | 2.3 |', 1)
text = text.replace('| **Última actualización** | 09/09/2026 |', '| **Última actualización** | 12/09/2026 |', 1)

history = '| Versión | Fecha | Responsables | Cambios |\n|---|---:|---|---|\n'
row = '| 2.3 | 12/09/2026 | Product Owner + AI Collaborator | Sincroniza continuidad con `main @ af3d936f...` tras PR #114–#119. Registra Semilla 007 `Puedo elegir diferente`, contexto de Constancia, crecimiento visual real de Mi Camino con 7 etapas y ponderación interna 1/2/3, escucha única de Misiones y nueva consola `Administración → Mi Camino`. Deja como trabajo inmediato los refinamientos UX observados por el Product Owner, la publicación pendiente de Firestore Rules de configuración y la revisión posterior de la guía visual estática `Así crece mi camino`. |\n'
if row not in text:
    assert history in text
    text = text.replace(history, history + row, 1)

anchor = '### 4.6 Baseline funcional estable\n'
section = '''### 4.6 Evolución real de Mi Camino · 11–12/09/2026\n\nLa observación de Gloria de que su planta de Mi Camino “no crecía” originó una mejora real de uso y motivación.\n\nEstado integrado en `main`:\n\n- PR #117 · crecimiento visual real de Mi Camino;\n- 7 etapas: `Semilla → Brote → Plantita → Árbol joven → Árbol → Árbol con frutos → Árbol lleno de frutos`;\n- solo cuentan Misiones `completada`, visibles para el alumno y no marcadas `esDatoPrueba=true`;\n- ponderación interna por alcance observable: peso 1 ligera, 2 estándar y 3 amplia;\n- la ponderación no se presenta al alumno como puntos/XP ni valor personal;\n- umbrales predeterminados vigentes: `0 / 30 / 140 / 260 / 400 / 560 / 740` unidades;\n- la etapa no se persiste por Persona: se deriva de Misiones reales + configuración;\n- PR #118 · una única observación compartida de Misiones dentro de Mi Camino;\n- PR #119 · nueva opción `Administración → Mi Camino` con auditoría por Persona, desglose por Misión, vista previa y configuración global con auditoría.\n\nLa configuración global usa el documento:\n\n```text\nconfiguracion/miCamino\n```\n\ncon `createdAt`, `createdBy`, `updatedAt` y `updatedBy`. La fuente canónica de Firestore Rules ya contiene el contrato y fue compilada correctamente con Firestore Emulator, pero **su publicación en Firebase todavía es un paso separado pendiente**. Hasta entonces, la interfaz puede trabajar con los valores predeterminados, pero guardar la configuración global no debe considerarse validado.\n\n#### Feedback del Product Owner pendiente de aplicar\n\n1. `Configuración global · Reglas de crecimiento` debe aparecer **antes** de `Auditoría · Contribución de cada Misión`.\n2. La auditoría debe mostrar registros en bloques/páginas de **5**, reutilizando el patrón de Gestión de Misiones.\n3. Corregir el dimensionado visual de los campos de las siete etapas; actualmente los `input` no quedan proporcionados dentro de sus tarjetas.\n4. La función del bloque de configuración no resulta suficientemente autoexplicativa. Debe explicar de forma sencilla que:\n   - una **unidad no equivale necesariamente a una Misión**;\n   - una Misión real completada puede aportar 1, 2 o 3 unidades según su alcance observable;\n   - cada número de etapa es el umbral global desde el cual comienza esa etapa;\n   - editar esos valores cambia el cálculo para todas las Personas, sin modificar ni borrar sus Misiones;\n   - los cambios deben poder previsualizarse antes de guardar.\n5. Después de estos refinamientos, publicar las Firestore Rules necesarias y validar lectura/guardado real de `configuracion/miCamino`.\n6. Queda pendiente revisar la guía/modal estática **`Así crece mi camino`** mostrada al alumno, que todavía representa visualmente Semilla/Brote/Árbol y debe revisarse con calma frente al modelo actual de 7 etapas.\n\nEl Product Owner valoró positivamente la primera versión administrativa (“Que buen trabajo !!!!”); los puntos anteriores son refinamientos, no un rechazo del enfoque.\n\n### 4.7 Baseline funcional estable\n'''
if '### 4.6 Evolución real de Mi Camino · 11–12/09/2026' not in text:
    assert anchor in text
    text = text.replace(anchor, section, 1)

text = text.replace('main\n27b9e0a29ee92a2f081504cf5f52fbb9f4332221', 'main\naf3d936f660b9bb4d160c8ca10ad12166b274cea', 1)
text = text.replace('- PR #111–#113 · recursos oficiales Gaudem 6.º.\n', '- PR #111–#113 · recursos oficiales Gaudem 6.º.\n- PR #114 · estabilización documental de inicio de curso.\n- PR #115 · contexto temporal de Constancia.\n- PR #116 · Semilla 007 `Puedo elegir diferente`.\n- PR #117 · crecimiento visual real de Mi Camino.\n- PR #118 · escucha única de Misiones en Mi Camino.\n- PR #119 · Administración de Mi Camino.\n', 1)

text = text.replace('### Motivación\n\n- ✅ Recompensas / Reconocimientos V1.\n- ✅ `Mis Guacamayas` como historial plegado.\n- ✅ `Historia de crecimiento` preservada.\n', '### Motivación\n\n- ✅ Recompensas / Reconocimientos V1.\n- ✅ `Mis Guacamayas` como historial plegado.\n- ✅ `Historia de crecimiento` preservada.\n- ✅ Crecimiento visual real de Mi Camino con 7 etapas derivadas de Misiones reales.\n- ✅ Ponderación interna 1/2/3 por alcance observable, invisible como economía para el alumno.\n- ✅ Administración → Mi Camino para auditoría/configuración global, pendiente de refinamientos UX y publicación de Rules.\n', 1)

backlog_anchor = '## ⏳ 7. Backlog en espera por foco de uso\n\n'
backlog = '''## ⏳ 7. Backlog en espera por foco de uso\n\n### 7.0 Refinamiento inmediato · Administración → Mi Camino\n\n**Estado:** 🟡 Trabajo inmediato de continuidad.\n\nAplicar el feedback del Product Owner registrado en 4.6 antes de dar por cerrada la consola administrativa:\n\n- Configuración antes que Auditoría;\n- paginación de auditoría en bloques de 5;\n- corregir tamaño de campos de etapas;\n- explicar claramente unidades, pesos y umbrales con lenguaje administrativo comprensible;\n- publicar Firestore Rules y validar guardado real;\n- revisar después la guía visual `Así crece mi camino`.\n\n'''
if '### 7.0 Refinamiento inmediato · Administración → Mi Camino' not in text:
    assert backlog_anchor in text
    text = text.replace(backlog_anchor, backlog, 1)

text = text.replace('| **Baseline funcional cerrado** | `27b9e0a29ee92a2f081504cf5f52fbb9f4332221` |', '| **Baseline funcional cerrado** | `af3d936f660b9bb4d160c8ca10ad12166b274cea` |', 1)
text = text.replace('| **Rama funcional On going** | Ninguna registrada |', '| **Rama funcional On going** | Ninguna; iniciar nueva rama desde `main` para refinamientos de Administración → Mi Camino |', 1)
text = text.replace('| **PR funcional On going** | Ninguna registrada |', '| **PR funcional On going** | Ninguna |', 1)
text = text.replace('| **Próxima necesidad P1** | Manual breve + email de invitación · Issue #108 |', '| **Próxima necesidad P1** | Refinar Administración → Mi Camino; después Issue #108 |', 1)

old_next = '''## ▶️ 10. Siguiente paso exacto\n\nNo existe una iniciativa funcional On going que deba retomarse antes de usar la Academia.\n\nLa secuencia preferida es:\n\n```text\n1. Usar la Academia con Gloria y profesionales autorizados.\n2. Incorporar material real de 6.º cuando llegue.\n3. Usar Calendario, Horario y Menú del Cole como apoyos cotidianos.\n4. Usar Bitácora V1 cuando aporte valor y observar si cubre la necesidad.\n5. Reportar cualquier issue real.\n6. Antes/junto con crear 2–3 nuevas alumnas, completar Issue #108.\n7. No iniciar nuevas funciones generales por iniciativa propia durante la fase de foco.\n```\n'''
new_next = '''## ▶️ 10. Siguiente paso exacto\n\nExiste una continuidad funcional inmediata surgida de la validación real del Product Owner sobre `Administración → Mi Camino`.\n\nLa secuencia preferida es:\n\n```text\n1. Crear rama limpia desde main para refinamientos de Administración → Mi Camino.\n2. Mover Configuración global antes de Auditoría.\n3. Añadir paginación de 5 registros reutilizando Gestión de Misiones.\n4. Corregir dimensionado de inputs de las 7 etapas.\n5. Reescribir ayudas del bloque para explicar unidades, pesos y umbrales con claridad.\n6. Validar la vista previa con una Persona real.\n7. Publicar Firestore Rules pendientes y validar guardar/leer configuracion/miCamino.\n8. Revisar luego la guía visual estática `Así crece mi camino`.\n9. Volver al flujo normal de uso prioritario y al Issue #108.\n```\n'''
if old_next in text:
    text = text.replace(old_next, new_next, 1)

latest_anchor = '# 🟣 Última actualización — 09/09/2026\n'
latest = '''# 🟣 Última actualización — 12/09/2026\n\n## Cerrado recientemente\n\n- PR #114 · estabilización documental.\n- PR #115 · contexto temporal de Constancia.\n- PR #116 · Semilla 007 `Puedo elegir diferente`.\n- PR #117 · crecimiento visual real de Mi Camino con 7 etapas.\n- PR #118 · una sola escucha de Misiones en Mi Camino.\n- PR #119 · Administración → Mi Camino integrada en `main`.\n\n## Trabajo funcional On going\n\n> **Refinamiento de Administración → Mi Camino, todavía sin rama funcional abierta.**\n\nPendientes exactos: orden Configuración/Auditoría, paginación 5, tamaño de inputs, explicación clara del modelo, despliegue/validación de Rules y revisión posterior de la guía visual estática.\n\n## Próxima necesidad posterior\n\n> **Issue #108 · mini manual + email de invitación para nuevas alumnas.**\n\n---\n\n'''
if latest_anchor in text:
    start = text.index(latest_anchor)
    decision = text.index('## DECISIÓN', start)
    text = text[:start] + latest + text[decision:]

text = text.replace('| **Versión activa** | 2.2 |', '| **Versión activa** | 2.3 |', 1)
text = text.replace('| **Baseline funcional cerrado** | `27b9e0a29ee92a2f081504cf5f52fbb9f4332221` |', '| **Baseline funcional cerrado** | `af3d936f660b9bb4d160c8ca10ad12166b274cea` |', 1)
text = text.replace('| **Trabajo funcional On going** | Ninguno |', '| **Trabajo funcional On going** | Refinamiento de Administración → Mi Camino |', 1)
text = text.replace('| **Siguiente paso** | Uso real + material de 6.º + issues + Issue #108 antes/junto con nuevas alumnas |', '| **Siguiente paso** | Refinar Administración → Mi Camino → publicar/validar Rules → revisar guía visual → retomar uso real + Issue #108 |', 1)

path.write_text(text, encoding='utf-8')
