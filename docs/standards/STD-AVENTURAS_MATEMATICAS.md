# 🧮 Aventuras Matemáticas
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/standards/STD-AVENTURAS_MATEMATICAS.md` |
| **Código** | STD-007 |
| **Versión** | 1.1 |
| **Estado** | Activo |
| **Fecha de origen** | Julio 2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Aventuras Matemáticas |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Principios funcionales y de experiencia del espacio Aventuras Matemáticas, sus mundos y su integración con la arquitectura actual de la Academia |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Gobierna:** propósito humano, dignidad, autonomía y acompañamiento. |
| `docs/vision/01_PRINCIPIOS_PEDAGOGICOS.md` | **Gobierna:** comprensión, error, motivación y aprendizaje significativo. |
| `docs/vision/05_MANIFIESTO_DE_AVENTURAS_MATEMATICAS.md` | **Fundamenta:** visión original y lema `Descubrir. Comprender. Resolver.` |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna/complementa:** posición de Aventuras Matemáticas dentro de Mi Universo y relación con Persona Activa. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna:** Temas académicos curriculares, incluidos los de Matemáticas de 6.º. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Gobierna:** Misiones, evidencia, finalización y revisión familiar. |
| `docs/standards/STD-SEGUIMIENTO_Y_MOTIVACION.md` | **Gobierna:** seguimiento, constancia, motivación y límites de gamificación. |
| `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` | **Gobierna:** Reconocimientos, Guacamayas y automatizaciones motivacionales. |
| `docs/standards/STD-PANEL_DE_USUARIO.md` | **Gobierna:** Panel de Usuario compartido y Persona Activa. |
| `mi-universo/aventuras-matematicas/` | **Implementa:** portal actual de Aventuras Matemáticas. |
| `mi-universo/aventuras-matematicas/detectives/` | **Implementa:** primer mundo operativo, Detectives de Problemas. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 04/09/2026 | Product Owner + AI Collaborator | Sincronización P1 con el producto real. Mantiene la visión matemática y los mundos conceptuales, declara Detectives como único mundo actualmente operativo, separa mundos futuros de implementación actual, elimina el árbol Firebase y el roadmap de versiones como contratos obligatorios, sustituye gamificación genérica por el sistema vigente de Motivación/Reconocimiento, incorpora Persona Activa, Misiones/evidencia, accesibilidad, Quality Gate y referencias canónicas actuales. |
| 1.0 | Julio 2026 | Equipo del proyecto | Primera versión aprobada. Definió propósito, mundos, filosofía, gamificación inicial, propuesta de persistencia y roadmap original. |

---

## 🎯 1. Propósito

Aventuras Matemáticas es el espacio de la Academia dedicado a aprender a **pensar con matemáticas** mediante situaciones comprensibles, útiles y conectadas con la vida.

Su propósito no es acumular ejercicios ni acelerar cálculos.

Busca desarrollar progresivamente:

- comprensión de situaciones;
- razonamiento;
- lógica;
- selección de estrategias;
- resolución de problemas;
- capacidad de comprobar;
- autonomía;
- confianza para intentarlo;
- y uso de las matemáticas en contextos cotidianos.

Lema preservado:

> **Descubrir. Comprender. Resolver.**

---

## 📐 2. Alcance y fronteras

Este estándar gobierna:

- la intención educativa de Aventuras Matemáticas;
- la experiencia general de sus mundos;
- el papel de Detectives de Problemas;
- principios de interacción, feedback y accesibilidad;
- relación con Misiones, evidencia y seguimiento;
- y criterios para incorporar futuros mundos.

No gobierna:

- el currículo completo de Matemáticas;
- los Temas académicos de `Mis Cursos`;
- el contrato físico completo de sesiones/evidencias;
- las reglas detalladas de Reconocimientos;
- la persistencia completa de cada mundo;
- ni un roadmap obligatorio de versiones.

Los Temas curriculares de 6.º —por ejemplo Fracciones, Decimales o Geometría escolar— pertenecen al estándar de **Contenidos Académicos y Material Escolar**, aunque puedan reutilizar una mecánica o experiencia nacida en Aventuras Matemáticas.

---

## 🧭 3. Principios no negociables

1. **Comprender antes que calcular.**
2. **Las operaciones son herramientas, no el objetivo único.**
3. **El error aporta información y nunca se utiliza como castigo.**
4. **La rapidez no se premia por defecto.**
5. **El alumno debe poder pensar, probar, revisar y volver a intentar.**
6. **Las ayudas deben facilitar el siguiente paso sin resolver innecesariamente por el alumno.**
7. **Las matemáticas deben conectarse, cuando aporte valor, con decisiones y situaciones reales.**
8. **No existen rankings ni comparaciones entre alumnos.**
9. **El progreso se interpreta principalmente frente a la propia trayectoria y mediante evidencia real.**
10. **No se inventan estadísticas, niveles o logros que el sistema no pueda demostrar.**
11. **Persona Activa determina sobre quién opera la experiencia cuando existen datos personales.**
12. **Un nuevo mundo se crea por necesidad real, no para completar un catálogo histórico.**

---

## 🧠 4. Modelo de aprendizaje

El patrón general es:

```text
DESCUBRIR
¿Qué está ocurriendo?
¿Qué información tengo?

        ↓

COMPRENDER
¿Qué me preguntan?
¿Qué relaciones existen?

        ↓

PENSAR UNA ESTRATEGIA
¿Qué podría ayudarme?

        ↓

RESOLVER
Aplicar, probar, calcular o construir.

        ↓

COMPROBAR
¿Tiene sentido el resultado?
¿Qué aprendí del proceso?
```

No toda actividad necesita mostrar literalmente estas cinco etapas, pero debe conservar la intención cuando corresponda.

---

## 🌍 5. Mundos de Aventuras Matemáticas

La visión original conserva los siguientes mundos conceptuales:

1. 🧩 Detectives de Problemas
2. 💶 Mi Tienda
3. 🔢 Reino de los Números
4. ⚡ Cálculo a mi ritmo
5. 📐 Isla de la Geometría
6. 🧠 Laboratorio de Lógica
7. 🕒 Matemáticas de cada día
8. 🏆 Grandes Aventuras

### 5.1 Interpretación correcta

La existencia de estos nombres en la visión o en el portal **no significa que todos estén implementados**.

Estado validado al 04/09/2026:

| Mundo | Estado |
|---|---|
| 🧩 Detectives de Problemas | ✅ Operativo |
| 💶 Mi Tienda | ⏳ Próximamente / conceptual |
| 🔢 Reino de los Números | ⏳ Próximamente / conceptual |
| ⚡ Cálculo a mi ritmo | ⏳ Próximamente / conceptual |
| 📐 Isla de la Geometría | ⏳ Próximamente / conceptual |
| 🧠 Laboratorio de Lógica | ⏳ Próximamente / conceptual |
| 🕒 Matemáticas de cada día | ⏳ Próximamente / conceptual |
| 🏆 Grandes Aventuras | ⏳ Próximamente / conceptual |

El portal puede mostrar mundos futuros como orientación visual siempre que su estado sea inequívoco y no simule una capacidad disponible.

### 5.2 Activación de un nuevo mundo

Un nuevo mundo solo pasa a operativo cuando existe:

- necesidad educativa real;
- experiencia suficientemente definida;
- implementación navegable;
- persistencia/evidencia solo si aporta valor;
- integración con Persona Activa cuando corresponde;
- validación funcional;
- y documentación propietaria actualizada si cambia el contrato transversal.

No se activa un mundo únicamente porque aparecía en el roadmap de v1.0.

---

## 🧩 6. Detectives de Problemas

Detectives de Problemas es el primer mundo operativo y la referencia funcional actual de Aventuras Matemáticas.

Su propósito es ayudar a separar:

```text
comprender la historia
↓
identificar los datos útiles
↓
entender qué se pregunta
↓
elegir una estrategia
↓
resolver
```

### 6.1 Experiencia

Una aventura puede incluir:

- historia o situación contextual;
- preguntas de comprensión;
- descubrimiento de información relevante;
- elección o construcción de estrategia;
- cálculo/resolución;
- pistas;
- reintentos;
- celebración proporcional al cierre.

### 6.2 Evidencia y Misiones

Cuando Detectives se utiliza desde una Misión y existe evidencia verificable, debe reutilizar los contratos vigentes de Misiones/sesiones/evidencia.

La Misión referencia el trabajo real; no copia de forma completa toda la experiencia dentro del registro de la Misión.

Cuando se consulta trabajo histórico, la vista es de **solo lectura**.

### 6.3 Motivación derivada

Detectives puede producir señales observables útiles para acompañamiento, por ejemplo uso de pistas o intentos adicionales.

Cualquier Reconocimiento automático de Lía debe cumplir el principio de **alta confianza** definido por el Sistema de Motivación y Reconocimiento.

No se convierte una señal puntual en una etiqueta sobre capacidad, autonomía, emoción o personalidad.

---

## 💶 7. Matemáticas para la vida

Los futuros mundos y actividades pueden inspirarse en contextos como:

- compras y cambio;
- comparación de precios;
- presupuesto;
- tiempo y horarios;
- calendarios;
- viajes y distancias;
- recetas y medidas;
- organización;
- planos y espacio;
- patrones y decisiones.

El contexto cotidiano debe ayudar a comprender, no convertirse en decoración narrativa sin función.

---

## 🎮 8. Motivación y celebración

La versión 1.0 proponía una gamificación local basada en estrellas, arcoíris, logros e insignias.

La regla vigente es distinta:

> **Aventuras Matemáticas no mantiene un sistema paralelo de puntos, insignias o premios.**

Puede utilizar:

- mensajes positivos y específicos;
- microcelebraciones;
- progresión visual;
- Reconocimientos;
- Guacamayas cuando el sistema propietario las conceda;
- hitos de constancia o progreso personal cuando estén sustentados.

Nunca utilizar como patrón:

- rankings;
- comparación pública;
- pérdida de recompensas;
- moneda/puntos como pago por aprender;
- premio por clic o login;
- presión para completar un catálogo.

---

## 👤 9. Persona Activa y Panel de Usuario

Aventuras Matemáticas reutiliza el **Panel de Usuario compartido** y el contexto global de **Persona Activa**.

Reglas:

- no crear un panel privado del módulo;
- no asumir que `auth.currentUser.uid` es siempre la Persona sobre la que se consulta información;
- las operaciones propias del alumno se rigen por el contrato del módulo;
- las capacidades de gestión/revisión respetan el modelo transversal de accesos;
- la navegación debe conservar Persona Activa cuando corresponda.

---

## 📊 10. Progreso y datos

El portal puede presentar progreso únicamente cuando el significado del dato sea claro y verificable.

No existe como contrato obligatorio la estructura propuesta en v1.0:

```text
usuarios/{uid}/aventurasMatematicas/progreso/mundos/logros/actividades/estadisticas
```

Cada mundo debe reutilizar los contratos compartidos existentes antes de introducir persistencia propia.

Los datos pueden incluir, cuando tengan utilidad y sean fiables:

- sesiones realizadas;
- nivel o caso trabajado;
- respuestas/intentos;
- pistas utilizadas;
- finalización;
- relación con Misión;
- evidencia necesaria para histórico/análisis;
- señales comparables para progreso personal.

No guardar o mostrar por defecto:

- tiempo de pantalla como sustituto de aprendizaje;
- puntuaciones comparativas entre alumnos;
- métricas que no puedan medirse con fiabilidad;
- inferencias emocionales o clínicas;
- indicadores visuales que aparenten progreso real sin una fuente válida.

---

## 🗣️ 11. Lenguaje y feedback

El feedback debe ser:

- breve;
- específico;
- orientado al proceso;
- no punitivo;
- compatible con carga cognitiva reducida.

Ejemplos válidos:

> “Encontraste una pista importante.”

> “Vuelve a leer qué te están preguntando.”

> “Probemos otro camino.”

> “Usaste una ayuda y seguiste pensando.”

Evitar:

> “Eres mala en problemas.”

> “Deberías haberlo sabido.”

> “Los demás lo hacen más rápido.”

---

## ♿ 12. Accesibilidad y TEL

Cuando aplique:

- instrucciones directas;
- una acción principal clara;
- botones/objetivos táctiles suficientes;
- texto legible;
- apoyo visual con función;
- posibilidad de repetir;
- ayudas progresivas;
- tiempo suficiente para pensar;
- diseño responsive;
- reducción de movimiento cuando el sistema lo solicita;
- audio/voz solo cuando aporte valor.

Adaptar la experiencia no significa reducir automáticamente el nivel matemático.

---

## 🎨 13. Identidad visual

Aventuras Matemáticas debe reconocerse como parte de la Academia.

Puede conservar personalidad propia mediante:

- colores;
- narrativa;
- iconografía;
- escenas;
- ilustración;
- mundos temáticos.

Pero debe reutilizar, cuando corresponda:

- navegación global;
- Panel de Usuario;
- favicon oficial;
- patrones compartidos;
- lenguaje visual del producto.

La identidad nunca debe dificultar comprender la actividad.

---

## 🔄 14. Evolución

La evolución no se organiza mediante el roadmap rígido `1.0 → 1.1 → … → 2.0` definido en la primera versión.

La prioridad se decide por:

```text
necesidad real
+ valor educativo
+ evidencia de uso
+ reutilización posible
+ coste/riesgo proporcional
```

Un futuro mundo puede incluso no ser necesario si el mismo objetivo queda mejor resuelto mediante un Tema Académico, Detectives u otro Motor existente.

---

## ✅ 15. Quality Gate

Antes de incorporar o modificar una experiencia de Aventuras Matemáticas:

### Propósito

- [ ] Resuelve una necesidad matemática real.
- [ ] La mecánica favorece comprensión o razonamiento.
- [ ] No existe otro Motor/experiencia reutilizable suficiente.

### Alumno

- [ ] La instrucción es clara.
- [ ] Existe tiempo para pensar.
- [ ] El error no produce castigo.
- [ ] Las ayudas son graduales.
- [ ] No se premia rapidez sin motivo académico.

### Datos

- [ ] Solo se guardan datos con propósito.
- [ ] La evidencia reutiliza contratos existentes cuando aplica.
- [ ] No se inventan métricas.
- [ ] Datos `🧪` no se interpretan como progreso real.

### Integración

- [ ] Respeta Persona Activa y permisos.
- [ ] Reutiliza navegación y Panel compartidos.
- [ ] Misiones/histórico respetan sus contratos cuando aplican.
- [ ] No crea un sistema paralelo de Recompensas.

### Experiencia

- [ ] Funciona en móvil, tablet y escritorio.
- [ ] El diseño mantiene jerarquía y legibilidad.
- [ ] El estado de capacidades futuras se muestra con claridad.

---

## 📌 16. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| MAT-001 | `Descubrir. Comprender. Resolver.` continúa siendo el lema funcional de Aventuras Matemáticas. | Aprobada |
| MAT-002 | Comprender y razonar tienen prioridad sobre calcular rápidamente. | Aprobada |
| MAT-003 | Detectives de Problemas es el único mundo operativo confirmado al 04/09/2026. | Aprobada / implementada |
| MAT-004 | Los demás mundos se conservan como visión y no se declaran implementados por aparecer en el portal. | Aprobada |
| MAT-005 | No existe un árbol Firebase obligatorio propio de Aventuras Matemáticas; se reutilizan contratos compartidos. | Aprobada |
| MAT-006 | Motivación y Reconocimientos se gobiernan por el sistema transversal, sin gamificación paralela. | Aprobada |
| MAT-007 | Temas curriculares de Matemáticas pertenecen al estándar académico aunque puedan reutilizar mecánicas de Aventuras. | Aprobada |
| MAT-008 | El roadmap original de mundos deja de ser compromiso de versión. | Aprobada |

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Activo |
| **Versión** | 1.1 |
| **Fecha** | 04/09/2026 |
| **Principio central** | Comprender antes que calcular; pensar antes que responder. |
| **Implementación actual** | Portal de Aventuras Matemáticas + Detectives de Problemas. |
| **Mundos restantes** | Visión/evolución, no compromisos de versión. |

> 🌈 **Cada aventura empieza comprendiendo el camino.**
