# 🌈 Academia Gloria Valentina
# ROADMAP

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ROADMAP.md` |
| **Versión del documento** | 1.8 |
| **Estado** | Activo · fase de uso prioritario |
| **Última actualización** | 05/09/2026 |
| **Responsables** | Juan Perdomo + AI Collaborator |
| **Ámbito** | Evolución funcional y prioridades de producto |

---

# 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.8 | 05/09/2026 | Juan Perdomo + AI Collaborator | Sustituye “congelación funcional” por **fase de uso prioritario**. Durante varias semanas prioriza uso real, motivación y ayuda efectiva; mantiene activo el crecimiento curricular de 6.º mediante material real + una sola instrucción; formaliza reporte y resolución rápida de issues reales; deja el crecimiento funcional general en espera por foco, no prohibido. |
| 1.7 | 04/09/2026 | Juan Perdomo + AI Collaborator | Registró el cierre del ajuste visual de Guacamayas mediante PR #74 y actualizó el baseline funcional estable. La “congelación” descrita entonces queda reinterpretada por v1.8 como una decisión de foco de gestión. |
| 1.6 | 04/09/2026 | Juan Perdomo + AI Collaborator | Cerró la jornada documental P0/P1/P2, consolidó el baseline tras PR #71, registró PR #72 descartado y dejó un backlog explícito. |
| 1.5 | 03/09/2026 | Juan Perdomo + IA | Cerró la jornada P0 y dejó como siguiente frente funcional la expansión curricular progresiva de 6.º. |
| 1.4 | 03/09/2026 | Juan Perdomo + IA | Sincronizó Gestión de Misiones V1, Repaso Académico, Misiones libres, refuerzos, Análisis Educativo V1, datos de prueba, eliminación controlada, Recompensas V1, recordatorios y base visual de 6.º. |
| 1.3 | 30/08/2026 | Juan Perdomo + IA | Registró propuestas de refuerzo y consolidó Evidencia → Observación → Propuesta → Revisión humana → Misión. |
| 1.2 | 29/08/2026 | Juan Perdomo + IA | Sincronizó Misiones, Trabajo realizado y 6.º. |
| 1.1 | 12/08/2026 | Juan Perdomo + IA | Incorporó Identidad Multi-Persona, Gestión de Usuarios y reorganizó prioridades. |
| 1.0 | 22/07/2026 | Juan Perdomo | Primera versión del roadmap funcional. |

---

# 🎯 1. Propósito

Este documento define la evolución funcional de **Academia Gloria Valentina**.

El Roadmap:

- orienta los grandes hitos del producto;
- prioriza capacidades y resultados de uso, no tareas técnicas aisladas;
- distingue claramente lo implementado, lo activo, lo pendiente y la visión futura;
- debe actualizarse cuando el uso real modifique una prioridad.

No sustituye:

- especificaciones funcionales;
- estándares;
- modelos;
- `DECISION_LOG.md`;
- `RELEASE_NOTES.md`;
- ni el comportamiento real validado en `main`.

---

# 🧭 2. Principios de evolución

1. **Primero utilidad real.** La Academia evoluciona para acompañar aprendizaje y crecimiento.
2. **Uso real antes que complejidad.** No construir sistemas avanzados sin una necesidad observada.
3. **Reutilizar antes de crear.** No duplicar arquitectura, servicios, modelos o componentes.
4. **Cerrar antes de ampliar.** Una iniciativa debe quedar estable antes de abrir otra.
5. **Datos educativos vinculados a Persona.** La evolución multi-persona no duplica pantallas por alumno.
6. **Evidencia desde el nacimiento.** Una nueva experiencia evaluable debe producir evidencia útil cuando corresponda.
7. **Vista previa sin persistencia.** Una preview no genera sesión, evidencia, progreso ni reconocimiento real.
8. **Acompañamiento sin etiquetas.** Análisis y refuerzos describen evidencias/tendencias, no definen al alumno.
9. **Motivación no transaccional.** Recompensas reconocen actividad/progreso real, no clics ni perfección.
10. **Cambios pequeños deben seguir siendo pequeños.** Una mejora menor no justifica arquitectura paralela.
11. **El uso escolar manda.** Durante el curso, las necesidades reales del colegio pueden reordenar el backlog.
12. **Separar funcionalidad de recursos gráficos.** Validar primero la experiencia; perfeccionar imágenes después cuando aporte valor.
13. **Los issues reales se atienden.** Un problema detectado en uso no se pospone solo porque exista una fase de foco.
14. **El siguiente Tema debe costar menos.** La incorporación curricular debe hacerse cada vez más rápida y segura sin bajar calidad.

---

# 🌿 3. Fase de uso prioritario · desde 05Sep2026

Durante las primeras semanas del curso 2026–2027 la prioridad no es crecer en nuevas funciones generales, sino **usar la Academia con Gloria, observar su utilidad real, mantener motivación y alimentar 6.º con el material del colegio**.

```text
USO REAL
+ MOTIVACIÓN
+ AYUDA EFECTIVA
+ TEMAS REALES DE 6.º
+ ISSUES CORREGIDOS RÁPIDAMENTE
        ↓
EVIDENCIA PARA DECIDIR EL PRÓXIMO CRECIMIENTO
```

### Baseline funcional estable de referencia

```text
main
d893e977d2c5f122b97c7efecef1f665a1988f38
```

Incluye:

- PR #71 · aviso cuando una Semilla abierta libremente pertenece a una Misión activa;
- PR #74 · ajuste visual mínimo aprobado de `Mis Guacamayas`.

El HEAD documental puede ser posterior sin cambiar este baseline funcional.

### 3.1 Crecimiento funcional general

Durante esta fase queda **en espera por foco de uso**, salvo necesidad real:

- nuevas funcionalidades generales;
- mejoras visuales no motivadas por uso;
- refactors preventivos;
- ampliaciones de motores;
- cambios de navegación;
- cambios de Recompensas;
- preferencias/configuraciones no urgentes.

No es una congelación rígida. Es una decisión de gestión para aprender del uso antes de ampliar.

### 3.2 Carril activo · incorporación curricular de 6.º

La expansión curricular **sí está activa**.

Entrada mínima:

```text
material real del colegio
+ curso
+ materia
+ tema
+ notas opcionales
+ “Incorporar a la Academia”
```

Ejemplo:

```text
6.º · Lengua · Acentuación. Incorporar a la Academia.
```

El proceso se rige por:

`docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`

La familia no debe especificar rutas, estructura técnica, evidencia, Misiones, Persona Activa, histórico, Vista previa, navegación, PR o merge.

Solo se interrumpe cuando falte información que pueda cambiar materialmente:

1. qué debe aprender Gloria;
2. el procedimiento exigido por el colegio;
3. el nivel de dificultad;
4. cómo la van a evaluar;
5. una respuesta que deba coincidir exactamente con el material;
6. una decisión arquitectónica nueva no resuelta.

Flujo esperado:

```text
material escolar
→ analizar fuente
→ ubicar Curso → Asignatura → Tema
→ reutilizar estructura
→ diseñar experiencia
→ implementar
→ integrar evidencia / histórico / análisis / fortalecimiento cuando corresponda
→ validar fidelidad y funcionamiento
→ YA PUEDES PROBAR
→ observaciones opcionales / Aprobado
→ auditoría final
→ documentación aplicable
→ PR
→ revisión remota
→ merge
```

### 3.3 Carril activo · issues del uso real

Cualquier issue observado debe reportarse y verificarse.

```text
issue
→ reproducir / verificar
→ impacto + propietario
→ corrección mínima suficiente
→ validación
→ cierre
```

Prioridad alta cuando afecte:

- aprendizaje;
- motivación o continuidad de la actividad;
- acceso/navegación necesaria;
- datos;
- Persona Activa/permisos;
- evidencia/progreso;
- bloqueo del uso escolar.

Un issue no debe convertirse automáticamente en rediseño ni arquitectura nueva.

---

# ✅ 4. Estado consolidado al entrar en la fase

## 4.1 Misiones

✅ **Listo**

- creación/preparación de Misiones · Repaso Académico;
- Misión libre con cierre manual coherente;
- Gestión de Misiones V1;
- filtros y paginación;
- alumno sin acceso a Gestión;
- eliminación controlada de Misiones completadas;
- datos de prueba;
- integración con Trabajo realizado y revisión familiar.

---

## 4.2 Refuerzo y Análisis Educativo

✅ **V1 lista**

Patrón vigente:

```text
Evidencia
→ dato observable
→ observación/tendencia prudente
→ propuesta
→ revisión humana
→ Misión cuando aporta valor
```

Análisis Educativo V1 puede describir fortalezas, aspectos a reforzar, evolución, intentos, ayudas y propuestas sin etiquetar al alumno.

---

## 4.3 Recompensas / Reconocimientos V1

✅ **Listo**

Integración principal: **Mi Camino → Así voy creciendo**.

Mecanismos vigentes:

- 🦜 Guacamayas;
- 🏅 Récord personal;
- ✨ Reconocimientos de Lía;
- 🤝 Retos cooperativos cuando correspondan.

Principios:

- actividad/progreso real;
- sin premios por clic;
- sin rankings;
- sin comparación con otros;
- sin pérdida de recompensas.

`Mis Guacamayas` queda como historial especializado plegado por defecto tras PR #74.

---

## 4.4 Calendarios / Recordatorios

✅ **Listo**

- Persona Activa;
- aviso al ingreso;
- eventos de hoy y del día siguiente / un día antes;
- sin repetición innecesaria durante la sesión.

---

## 4.5 6.º de Primaria

✅ **Base estructural lista · crecimiento curricular activo**

Jerarquía:

```text
6.º
→ Asignatura
→ Tema
```

Matemáticas ya dispone de base real y patrones validados.

A partir del inicio de clases, **nuevos Temas reales de cualquier materia forman parte de la operación normal del producto**, no de un backlog futuro.

Regla:

> Material del colegio + Materia + Tema debe ser suficiente para iniciar la incorporación completa.

Todo Tema nuevo de 6.º debe seguir el estándar curricular vigente y producir evidencia académica estructurada cuando corresponda a ejecución normal.

---

## 4.6 Mi Baúl

✅ **V1 lista**

> El Baúl conserva contenidos e ideas de valor; no genera Misiones, evidencias, estadísticas ni recompensas.

---

## 4.7 Documentación

✅ **Cerrada y activa como sistema de continuidad**

- P0 cerrado.
- P1 cerrado: 15/15.
- P2 cerrado: 32/32.
- `DOCUMENTATION_STANDARD.md` sigue siendo el estándar rector.
- HandOff y Bootstrap son los mecanismos de continuidad entre chats.

---

## 4.8 Creciendo por Dentro · integración con Misiones

✅ **Verificado**

```text
Misión
→ Semilla realizada desde la Misión
→ sesión
→ evidencia
→ objetivo alcanzado
→ ⏳ Esperando a mi familia
```

PR #71 añade advertencia cuando una Semilla abierta libremente pertenece a una Misión activa.

---

## 4.9 Mi Camino · historial de Guacamayas

✅ **Cerrado · PR #74**

La repetición observada era de presentación, no duplicación de datos.

Se adoptó solución mínima en el componente propietario, sin cambios de Firestore, Misiones ni lógica de creación de Recompensas.

Antecedentes:

- PR #72 cerrado sin merge;
- PR #7 cerrado el 05/09/2026 sin merge y considerado histórico/obsoleto.

---

# ⏳ 5. Backlog en espera por foco de uso

Nada de esta sección tiene prioridad automática durante las primeras semanas. Puede subir de prioridad si el uso real demuestra necesidad.

## P1 · Velocidad de voz por Persona

**Estado:** ⏳ En espera por foco de uso.

Objetivo futuro:

```text
Normal
Pausada
Muy pausada
```

Antes de implementar, revisar todos los usos de voz y definir un único resolver compartido.

---

## P1 · Mi Universo · leer y entender preguntas

**Estado:** ⏳ En espera para análisis futuro.

Objetivo: ayudar a Gloria a desarrollar consistencia en leer, comprender qué se pregunta, identificar información relevante y responder.

---

## P1 · Actividades sugeridas para Gloria

**Estado:** ⏳ En espera para análisis futuro.

No crear una pantalla por actividad. Estudiar integración con capacidades ya existentes cuando vuelva a ser prioridad.

---

## 🟡 Proceso de incorporación de nuevas Semillas

**Estado:** deuda de proceso conocida.

Próxima incorporación:

```text
Semilla funcional + icono genérico
→ prueba funcional
→ nombre/ruta de imagen
→ imagen creada/publicada por Product Owner
→ sustitución
→ prueba visual breve
```

No ampliar catálogo con el proceso anterior si sigue siendo costoso.

---

# 📘 6. Curso 2026–2027 · operación curricular

La prioridad durante el curso es:

```text
Material real del colegio
+ Curso
+ Asignatura
+ Tema
+ notas opcionales
        ↓
analizar
        ↓
reutilizar estructura y estándares
        ↓
construir experiencia útil
        ↓
integrar evidencia cuando corresponde
        ↓
validar con uso real
        ↓
mejorar el siguiente Tema
```

No crear contenido ficticio para “llenar” el curso.

### Objetivo operativo

El esfuerzo de la familia para incorporar un Tema debe tender a:

> **adjuntar material + indicar Materia y Tema.**

La calidad interna no se reduce por reducir interacción humana.

---

# 👨‍👩‍👧 7. Colaboración familiar y profesional

Base disponible:

- Persona Activa;
- Relaciones;
- niveles de acceso;
- acceso profesional;
- Gestión de Usuarios;
- revisión familiar de Misiones.

Evolución futura solo ante necesidad concreta y con seguridad/privacidad definidas.

---

# 🤖 8. Inteligencia Artificial educativa

La AI Collaborator forma parte del proceso de desarrollo, documentación e incorporación curricular.

La IA generativa visible para el alumno sigue siendo una visión futura y requiere antes:

- objetivo pedagógico claro;
- supervisión familiar;
- privacidad;
- límites funcionales;
- datos suficientes;
- beneficio demostrado frente a una solución más simple.

---

# 🗺️ 9. Secuencia durante la fase de uso prioritario

```text
AHORA
────────────────────────────────────────────
🌿 Usar la Academia con Gloria
📚 Incorporar Temas reales de 6.º
💡 Observar qué ayuda de verdad
😊 Cuidar motivación y experiencia
🛠️ Reportar y resolver issues reales
⏸️ No anticipar nuevas funciones generales
```

Para cada Tema de 6.º:

```text
1. Recibir material + Materia + Tema
2. Aplicar estándar curricular y fuentes propietarias
3. Construir sin preguntas administrativas
4. Preguntar solo ante bloqueo material real
5. YA PUEDES PROBAR
6. Ajuste opcional
7. Aprobado → PR → merge → cierre
```

Para un issue:

```text
1. Reportar
2. Verificar
3. Corregir mínimo necesario
4. Probar
5. Cerrar
```

Después de varias semanas de uso, revisar backlog general a partir de evidencia real.

---

# 📋 10. Resumen ejecutivo

| Iniciativa | Estado actual |
|---|---|
| Repaso Académico · preparación de Misiones | ✅ Listo |
| Misión libre | ✅ Listo |
| Gestión de Misiones V1 | ✅ Listo |
| Refuerzos | ✅ V1 lista |
| Análisis Educativo V1 | ✅ Listo |
| Datos de prueba / limpieza | ✅ Listo |
| Eliminación controlada de Misiones completadas | ✅ Listo |
| Recompensas / Reconocimientos V1 | ✅ Listo |
| Historial `Mis Guacamayas` | ✅ PR #74 integrado |
| Calendarios / recordatorios actuales | ✅ Listo |
| 6.º · base estructural | ✅ Lista |
| 6.º · incorporación de Temas reales | 📚 Activa |
| Mi Baúl V1 | ✅ Listo |
| HandOff | ✅ Activo |
| Bootstrap de nuevos chats | ✅ Activo |
| Documentación P0/P1/P2 | ✅ Cerrada |
| Creciendo por Dentro → Misión → revisión familiar | ✅ Verificado |
| Aviso Semilla libre asociada a Misión | ✅ PR #71 integrado |
| Issues del uso real | 🛠️ Reportar y resolver con rapidez |
| Velocidad de voz por Persona | ⏳ En espera por foco de uso |
| Mi Universo · comprender preguntas | ⏳ En espera por foco de uso |
| Actividades sugeridas | ⏳ En espera por foco de uso |
| Proceso de nuevas Semillas | 🟡 Mejorar antes de ampliar catálogo |
| Nuevas funciones generales | ⏸️ En espera durante primeras semanas |

---

# 🔗 11. Documentos relacionados

- `docs/README.md`
- `docs/DOCUMENTATION_STANDARD.md`
- `docs/ai/AI_CHAT_BOOTSTRAP.md`
- `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md`
- `docs/project/MASTER_PLAN.md`
- `docs/project/PROJECT_MAP.md`
- `docs/project/DECISION_LOG.md`
- `docs/project/RELEASE_NOTES.md`
- `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md`
- `docs/models/MODELO_NAVEGACION.md`
- `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`
- `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`
- `docs/standards/STD-SEGUIMIENTO_Y_MOTIVACION.md`
- `docs/standards/STD-LIA.md`
- `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md`

---

# DECISIÓN

| Campo | Valor |
|---|---|
| **Estado del Roadmap** | ✅ Activo |
| **Versión** | 1.8 |
| **Estado operativo** | 🌿 Fase de uso prioritario |
| **Inicio de la fase** | 05/09/2026 |
| **Baseline funcional de referencia** | `d893e977d2c5f122b97c7efecef1f665a1988f38` |
| **Prioridad inmediata** | Uso motivado + ayuda efectiva + Temas reales de 6.º |
| **Incorporación curricular 6.º** | 📚 Activa |
| **Issues reales** | 🛠️ Reportar → verificar → resolver rápidamente |
| **Nuevas funciones generales** | ⏸️ En espera por foco de uso |
| **Revisión del foco** | Después de varias semanas o antes si el uso real lo justifica |

---

**Academia Gloria Valentina 🌈**

*El Roadmap orienta el futuro; el uso real decide qué merece construirse.*