# 🌈 Academia Gloria Valentina
# ROADMAP

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ROADMAP.md` |
| **Versión del documento** | 1.6 |
| **Estado** | Activo · evolución funcional congelada |
| **Última actualización** | 04/09/2026 |
| **Responsables** | Juan Perdomo + AI Collaborator |
| **Ámbito** | Evolución funcional y prioridades de producto |

---

# 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.6 | 04/09/2026 | Juan Perdomo + AI Collaborator | Cierra la jornada documental P0/P1/P2, consolida el baseline funcional estable tras PR #71, registra PR #72 descartado sin merge, formaliza la congelación funcional por inicio del curso y deja un backlog pequeño y explícito para retomar posteriormente, incluida la simplificación del proceso para incorporar nuevas Semillas. |
| 1.5 | 03/09/2026 | Juan Perdomo + IA | Cerró la jornada P0 de sincronización documental del 03Sep2026 y dejó como siguiente frente funcional la expansión curricular progresiva de 6.º. |
| 1.4 | 03/09/2026 | Juan Perdomo + IA | Sincronizó Gestión de Misiones V1, Repaso Académico, Misiones libres, refuerzos, Análisis Educativo V1, datos de prueba, eliminación controlada, Recompensas V1, recordatorios y base visual de 6.º. |
| 1.3 | 30/08/2026 | Juan Perdomo + IA | Registró propuestas de refuerzo de Detectives y pruebas académicas, consolidando Evidencia → Observación → Propuesta → Revisión humana → Misión. |
| 1.2 | 29/08/2026 | Juan Perdomo + IA | Sincronizó estado real de Misiones, Trabajo realizado y 6.º. |
| 1.1 | 12/08/2026 | Juan Perdomo + IA | Incorporó Identidad Multi-Persona, Gestión de Usuarios y reorganizó prioridades. |
| 1.0 | 22/07/2026 | Juan Perdomo | Primera versión del roadmap funcional. |

---

# 🎯 1. Propósito

Este documento define la evolución funcional de **Academia Gloria Valentina**.

El Roadmap:

- orienta los grandes hitos del producto;
- prioriza capacidades, no tareas técnicas aisladas;
- distingue claramente lo implementado, lo pendiente y la visión futura;
- debe actualizarse cuando el estado real del producto supere o modifique una prioridad.

No sustituye:

- especificaciones funcionales;
- estándares;
- modelos;
- `DECISION_LOG.md`;
- `RELEASE_NOTES.md`;
- el comportamiento real validado en `main`.

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
10. **Cambios pequeños deben seguir siendo pequeños.** Una mejora menor no justifica arquitectura paralela ni riesgo innecesario sobre una experiencia estable.
11. **El uso escolar manda.** Durante el curso, las necesidades reales del colegio pueden reordenar el backlog.
12. **Separar funcionalidad de recursos gráficos.** Una nueva experiencia debe poder validarse con iconos provisionales antes de invertir tiempo en imágenes definitivas.

---

# 🧊 3. Congelación funcional · 04Sep2026

Por decisión del Product Owner, la Academia queda **funcionalmente congelada desde el 04/09/2026** para priorizar el inicio del curso escolar y utilizar el producto real con Gloria.

### Baseline estable

```text
main
4db6c734556e7fdc702bd0b78b228173d64ac036
```

### Regla durante la congelación

No iniciar:

- nuevas funcionalidades;
- mejoras visuales;
- refactors;
- ampliaciones de motores;
- ajustes de navegación;
- cambios de Recompensas;
- cambios de preferencias o configuración.

Excepciones:

- problema crítico de seguridad;
- pérdida/corrupción de datos;
- bloqueo real del uso escolar;
- instrucción expresa del Product Owner para descongelar una iniciativa concreta.

La documentación puede mantenerse para preservar continuidad.

---

# ✅ 4. Estado consolidado al congelar

## 4.1 Misiones

### Creación/preparación de Misiones · Repaso Académico

✅ **Listo · 31Ago2026**

- Curso de referencia + Materia cargan Temas disponibles.
- Tema es lista de valores.
- Seleccionar Tema completa automáticamente la URL cuando existe catálogo compatible.
- El administrador no necesita conocer/copiar rutas técnicas.

### Misión libre

✅ **Listo · 31Ago2026**

La Misión libre sin actividad asociada dispone de un cierre manual coherente con revisión familiar.

### Gestión de Misiones

✅ **Listo · 31Ago2026**

- filtro por tipo de Misión;
- presentación por bloques/paginación de 5;
- alumno sin acceso a Gestión de Misiones;
- eliminación controlada de Misiones completadas para casos puntuales autorizados;
- herramientas de datos de prueba.

---

## 4.2 Refuerzo y Análisis Educativo

### Sugerencias de refuerzo

✅ **Listo · 31Ago2026**

Patrón vigente:

```text
Evidencia
→ dato observable
→ observación/tendencia prudente
→ propuesta
→ revisión humana
→ Misión cuando aporta valor
```

Detectives y pruebas académicas disponen de una base real para propuestas de refuerzo. Los intentos adicionales y la repetición de señales se utilizan como información observable según el motor y la especificación propietaria.

### Análisis Educativo V1

✅ **Listo · 01Sep2026**

Permite seleccionar período y Motor/Área/Tema/Foco, y describir:

- fortalezas;
- aspectos a reforzar;
- evolución;
- intentos;
- pistas/ayudas;
- posibles mejoras personales observables;
- propuestas de actuación.

El reporte no etiqueta al alumno.

---

## 4.3 Recompensas / Reconocimientos V1

✅ **Listo · 02Sep2026**

Integración principal: **Mi Camino → Así voy creciendo**.

Mecanismos V1:

- 🦜 Guacamaya / hito significativo;
- 🏅 Récord personal;
- ✨ Reconocimiento de Lía;
- 🤝 Reto cooperativo cuando corresponda.

Principios:

- actividad/progreso real;
- no premios por clic;
- no rankings;
- no comparación con otros;
- no pérdida de recompensas;
- mensajes específicos y demostrables.

Ejemplo de progreso personal válido:

> “Esta vez utilizaste una pista menos.”

---

## 4.4 Calendarios / Recordatorios

✅ **Listo · 03Sep2026**

Comportamiento estable al congelar:

- revisar calendario de la Persona Activa al ingresar;
- mostrar recordatorios de eventos de **hoy** y del **día siguiente** —equivalente a un día antes del evento—;
- evitar repetir innecesariamente el mismo aviso durante la sesión.

No existe al congelar una ampliación 3/2/1/0 días en `main`.

---

## 4.5 6.º de Primaria · Matemáticas

✅ **Base lista · 03Sep2026**

Jerarquía:

```text
6.º
→ Matemáticas
→ Tema
```

El portal está organizado visualmente y preparado para crecer con Temas reales durante el curso.

La expansión curricular futura debe partir del material real del colegio y reutilizar el patrón ya validado de evidencia/análisis/refuerzo.

---

## 4.6 Mi Baúl

✅ **V1 lista · 03Sep2026**

Espacio para guardar y compartir contenidos e ideas de valor para la Persona Activa.

Contrato esencial:

> El Baúl conserva contenidos e ideas de valor; no genera Misiones, evidencias, estadísticas ni recompensas.

---

## 4.7 Documentación

✅ **Cerrada · 04Sep2026**

- P0 cerrado.
- P1 cerrado: 15/15.
- P2 cerrado: 32/32.
- `DOCUMENTATION_STANDARD.md` sigue siendo el estándar rector.
- HandOff oficial actualizado.

---

## 4.8 Creciendo por Dentro · integración con Misiones

✅ **Flujo verificado · 04Sep2026**

Prueba real confirmada:

```text
Misión de Creciendo por Dentro
→ Semilla realizada desde la Misión
→ sesión
→ evidencia
→ objetivo alcanzado
→ ⏳ Esperando a mi familia
```

La incidencia observada previamente no se reprodujo como bug.

### Mejora integrada

✅ **PR #71 aprobado y fusionado**

Si una Semilla abierta como práctica libre pertenece a una Misión activa, la Academia avisa y permite elegir:

- continuar la Misión para que la práctica cuente; o
- practicar libremente.

---

# ⏳ 5. Backlog congelado

Nada de esta sección debe implementarse mientras la Academia permanezca congelada.

## P1 · Velocidad de voz por Persona

**Estado:** ⏳ Pendiente.

Objetivo:

- preferencia configurable de la Persona;
- administrable por adulto/administrador;
- interfaz conceptual:

```text
Normal
Pausada
Muy pausada
```

Los valores técnicos permanecen internos.

### Criterio de reactivación

Al retomar desarrollo, verificar primero todos los lugares donde la Academia usa voz y definir un único resolver compartido antes de modificar pantallas individuales.

---

## P1 · Mi Universo · leer y entender preguntas

**Estado:** ⏳ Pendiente de análisis/diseño futuro.

Necesidad observada: ayudar a Gloria a desarrollar consistencia en:

```text
leer
→ comprender qué se pregunta
→ identificar información relevante
→ responder
```

Ejercicios de origen:

- preguntas deliberadamente evidentes como “¿De qué color es el caballo blanco de Bolívar?”;
- adivinanzas sencillas donde la clave está contenida o casi contenida en el enunciado.

No convertir directamente estos ejemplos en una funcionalidad aislada. Primero diseñar una capacidad educativa reutilizable.

---

## P1 · Actividades sugeridas para Gloria desde email

**Estado:** ⏳ Pendiente de análisis futuro.

Las recomendaciones revisadas incluyen actividades relacionadas con:

- lectura conversada;
- narración ordenada;
- preguntas `qué / quién / dónde / cuándo / por qué`;
- instrucciones progresivas;
- descripción y explicación;
- expresar opinión propia y justificarla;
- pedir aclaraciones;
- autonomía e identidad.

### Criterio futuro

No crear una pantalla por cada actividad. Estudiar cuáles se integran naturalmente en:

- Mi Universo;
- Misiones;
- Creciendo por Dentro;
- Rincón de Lectura;
- rutinas familiares breves.

---

## 🟡 Ajuste conocido · Mi Camino / Guacamayas

**Estado:** conocido, no bloqueante y deliberadamente pospuesto.

Síntoma:

- una Guacamaya puede aparecer duplicada en `Así voy creciendo`;
- caso observado: `🦜 Guacamaya Valiente · Algo que conseguí esta semana`;
- el Product Owner prefiere la presentación del segundo bloque;
- si ese bloque funciona como historial de Guacamayas, debe estudiarse que aparezca inicialmente comprimido.

### Antecedente

El **PR #72** intentó resolver esta mejora junto con otro ajuste menor, pero no alcanzó una solución estable y llegó a provocar bloqueo de `Mi Camino` durante una prueba.

Decisión:

- PR #72 cerrado **sin merge**;
- rama restablecida al mismo commit de `main`;
- ningún cambio de PR #72 forma parte del baseline congelado.

### Regla al retomar

> Reanalizar desde cero el componente actual de Recompensas y resolver con el mínimo cambio posible. No reutilizar el observador/parche del PR #72.

---

## 🟡 Incidencia de proceso · incorporación de nuevas Semillas

**Estado:** conocida, no bloqueante y deliberadamente pospuesta.

Observación:

- incorporar solo dos Semillas requirió un esfuerzo excesivo;
- repetir el mismo proceso para ampliar el catálogo no es sostenible;
- antes de añadir nuevas Semillas debe simplificarse la incorporación y separar funcionalidad de imagen final.

### Proceso acordado para la próxima incorporación

```text
1. Definir Semilla
2. Implementar con icono genérico sencillo
3. Probar flujo funcional completo
4. AI Collaborator indica nombre exacto y ruta del archivo de imagen
5. Product Owner crea/publica la imagen
6. Sustituir icono provisional
7. Prueba visual breve
```

Reglas:

- no generar la imagen definitiva en la primera iteración;
- no bloquear la Semilla funcional por trabajo gráfico;
- el Product Owner controla la creación/publicación de la imagen final;
- si el proceso no puede convertirse en algo simple y repetible, no ampliar nuevas Semillas hasta replantearlo.

---

# 📘 6. Curso 2026–2027 · criterio de evolución

A partir del inicio de clases, la prioridad es **usar la Academia y observar necesidades reales**, no anticipar funcionalidades.

Cuando se descongele la expansión curricular:

```text
Material real del colegio
+ Curso
+ Asignatura
+ Tema
+ notas opcionales
        ↓
analizar
        ↓
reutilizar estructura
        ↓
construir la mínima experiencia útil
        ↓
integrar evidencia cuando corresponda
        ↓
validar con uso real
```

No crear contenido ficticio para “llenar” el curso.

---

# 👨‍👩‍👧 7. Colaboración familiar y profesional

Base ya disponible:

- Persona Activa;
- Relaciones;
- niveles de acceso;
- acceso profesional;
- Gestión de Usuarios;
- revisión familiar de Misiones.

Evolución futura solo ante una necesidad concreta y con seguridad/privacidad definidas.

---

# 🤖 8. Inteligencia Artificial educativa

La AI Collaborator forma parte del proceso de desarrollo y documentación.

La IA generativa visible para el alumno sigue siendo una visión futura y requiere antes:

- objetivo pedagógico claro;
- supervisión familiar;
- privacidad;
- límites funcionales;
- datos suficientes;
- beneficio demostrado frente a una solución más simple.

---

# 🗺️ 9. Secuencia al retomar

Durante la congelación:

```text
AHORA
────────────────────────────────────────────
🧊 Academia congelada
📚 Inicio de clases y uso real
👀 Observar necesidades, sin construir por adelantado
```

Cuando el Product Owner descongele el desarrollo:

```text
1. Revisar HandOff + Roadmap + main vigente
2. Identificar la necesidad real más urgente surgida del curso
3. Compararla con Velocidad de voz por Persona
4. Elegir UNA iniciativa
5. Revisar/reutilizar componentes existentes
6. Construir → probar → aprobar → merge
7. Solo después abrir la siguiente
```

Backlog conocido, sin prioridad definitiva hasta reactivar:

```text
P1  Velocidad de voz por Persona
P1  Comprensión de preguntas en Mi Universo
P1  Integración selectiva de actividades sugeridas por psicología/familia
🟡  Duplicación visual de Guacamayas en Mi Camino
🟡  Simplificar incorporación de nuevas Semillas
P1  Nuevos Temas de 6.º según material escolar real
```

---

# 📋 10. Resumen ejecutivo

| Iniciativa | Estado al congelar |
|---|---|
| Repaso Académico · preparación de Misiones | ✅ Listo |
| Misión libre | ✅ Listo |
| Gestión de Misiones V1 | ✅ Listo |
| Refuerzos | ✅ V1 lista |
| Análisis Educativo V1 | ✅ Listo |
| Datos de prueba / limpieza | ✅ Listo |
| Eliminación controlada de Misiones completadas | ✅ Listo |
| Recompensas / Reconocimientos V1 | ✅ Listo |
| Calendarios / recordatorios actuales | ✅ Listo |
| 6.º + Matemáticas | ✅ Base lista |
| Mi Baúl V1 | ✅ Listo |
| HandOff | ✅ Activo |
| Documentación P0/P1/P2 | ✅ Cerrada |
| Creciendo por Dentro → Misión → revisión familiar | ✅ Verificado |
| Aviso Semilla libre asociada a Misión | ✅ PR #71 integrado |
| Velocidad de voz por Persona | ⏳ Congelado |
| Mi Universo · comprender preguntas | ⏳ Congelado |
| Actividades sugeridas desde email | ⏳ Congelado |
| Duplicación visual de Guacamaya | 🟡 Conocida · congelada |
| Proceso de incorporación de nuevas Semillas | 🟡 Mejorar antes de ampliar catálogo |
| Desarrollo funcional general | 🧊 Congelado desde 04/09/2026 |

---

# 🔗 11. Documentos relacionados

- `docs/README.md`
- `docs/DOCUMENTATION_STANDARD.md`
- `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md`
- `docs/project/MASTER_PLAN.md`
- `docs/project/PROJECT_MAP.md`
- `docs/project/DECISION_LOG.md`
- `docs/project/RELEASE_NOTES.md`
- `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md`
- `docs/models/MODELO_NAVEGACION.md`
- `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`
- `docs/standards/STD-SEGUIMIENTO_Y_MOTIVACION.md`
- `docs/standards/STD-LIA.md`
- `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md`

---

# DECISIÓN

| Campo | Valor |
|---|---|
| **Estado del Roadmap** | ✅ Activo |
| **Versión** | 1.6 |
| **Estado funcional del producto** | 🧊 Congelado |
| **Fecha de congelación** | 04/09/2026 |
| **Baseline funcional** | `4db6c734556e7fdc702bd0b78b228173d64ac036` |
| **Prioridad inmediata** | Inicio de clases + uso real |
| **Reactivación** | Solo por decisión explícita del Product Owner |

---

**Academia Gloria Valentina 🌈**

*El Roadmap orienta el futuro; el uso real decide qué merece construirse.*
