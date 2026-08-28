# ROADMAP — Academia Gloria Valentina

> Documento vivo de dirección del producto.  
> Este roadmap no sustituye las especificaciones ni los estándares: ordena el trabajo y registra la dirección acordada.

## Convenciones

- **HECHO**: implementado y validado funcionalmente.
- **EN CURSO**: trabajo abierto en rama activa.
- **DECISIÓN**: dirección aprobada para próximos bloques.
- **PROPUESTA**: idea todavía no aprobada como ejecución.

---

# 1. Base transversal de la Academia

## HECHO

- Navegación global compartida.
- Panel de usuario compartido.
- Persona Activa y contexto de usuario.
- Gestión de Misiones / Mis Tareas.
- Evidencias y revisión de trabajo realizado en los módulos ya integrados.
- Lector de texto compartido.
- Sesiones académicas genéricas para experiencias de 6.º.
- Cierre automático de sesión por inactividad.
- Navegación **Volver multinivel** sin ciclos, conservando origen explícito, historial de navegación, referrer y fallback seguro.

---

# 2. 5.º de Primaria

## HECHO

- 5.º queda como ciclo cerrado y de referencia.
- Sus contenidos y experiencias sirven como base para reutilizar patrones útiles, sin reabrir el curso salvo una corrección transversal realmente necesaria.

---

# 3. 6.º de Primaria — nueva dirección de producto

## DECISIÓN

6.º no será una simple copia visual de 5.º. El objetivo es evolucionar hacia una experiencia más madura, autónoma, visual y basada en evidencia real de aprendizaje.

Principios de trabajo:

- **maduro + mágico**;
- menos ambigüedad, no menos conocimiento;
- textos más cortos y apoyos visuales abundantes;
- audio contextual cuando reduzca carga de lectura;
- explicar el porqué de respuestas correctas e incorrectas;
- resultado numérico de cada prueba + mapa formativo, sin convertirlo en una etiqueta escolar;
- práctica con ayudas y prueba sin pistas;
- variantes controladas para evitar responder por memoria de pantalla;
- Vista previa totalmente interactiva, pero sin contaminar historial académico;
- Sesión de aprendizaje con evidencia útil y trazable.

Ciclo académico de referencia:

`Material colegio → Tema Academia → Aprendizaje → Práctica → Evaluación → Evidencia → Análisis → Refuerzo → Nueva evaluación`

---

# 4. Matemáticas 6.º

## EN CURSO — Puente 5.º → 6.º

Patrón aprobado:

`Resumen → Teoría → Fichas → Práctica → Prueba`

Objetivo del Puente: obtener un **punto de partida real** antes de aumentar la dificultad de 6.º.

Bases incluidas:

1. operaciones y jerarquía;
2. fracciones y equivalencias básicas de 5.º;
3. resolución de problemas;
4. perímetro y área.

Características ya validadas en la rama de producto:

- apoyos visuales reales, no meramente decorativos;
- lecturas contextuales en introducción, resumen, teoría, fichas, práctica, explicaciones y cierre;
- prueba con respuesta correcta/incorrecta explicada;
- resultado total `X/N + porcentaje`;
- revisión de respuestas;
- mapa de fortalezas y refuerzos;
- guardado solo en Sesión de aprendizaje.

### DECISIÓN

El Puente mide únicamente conocimientos de transición y **no debe diagnosticar como fallo contenidos nuevos de 6.º que todavía no se hayan enseñado**.

---

# 5. Fracciones — primer tema real de Matemáticas 6.º

## EN CURSO / VALIDADO EN RAMA DE PRODUCTO

Fracciones es el **primer tema académico real de 6.º** y el primer caso completo del nuevo patrón de tema.

Fuente académica inicial: bosquejo de Fracciones 6.º aportado por la familia.

Recorrido:

`Resumen → Teoría → Fichas → Práctica → Prueba`

Contenido actualmente incluido:

1. significado de una fracción;
2. numerador y denominador;
3. fracciones equivalentes;
4. amplificación y simplificación;
5. suma/resta con igual denominador;
6. denominador común mediante m.c.m.;
7. suma con distinto denominador;
8. multiplicación de fracciones;
9. división de fracciones;
10. problemas de varios pasos.

Características del tema:

- barras, porciones, equivalencias y otros apoyos visuales;
- explicación antes de fórmula cuando sea posible;
- fichas de memoria breve;
- práctica progresiva con pistas y reintentos;
- prueba con familias de preguntas y variantes controladas;
- explicación inmediata de cada respuesta seleccionada, sea correcta o incorrecta;
- resultado total `X/10 + porcentaje`;
- revisión final de las respuestas;
- mapa por bloques;
- lector de texto a ritmo más lento que el estándar inicial del Puente;
- Vista previa sin persistencia;
- Sesión de aprendizaje con evidencia académica.

### DECISIÓN

No incorporar todavía **operaciones combinadas con fracciones** solo porque aparezcan mencionadas en el material. Se añadirán cuando exista suficiente desarrollo académico para definir correctamente procedimiento, ejemplos y nivel de dificultad.

---

# 6. Orden inmediato de trabajo aprobado

## DECISIÓN

1. **Cerrar técnicamente Puente + Fracciones** con revisión final, PR y merge a `main`.
2. Publicar ambos productos como parte estable de Matemáticas 6.º.
3. Crear una primera **Misión de repaso académico** asociada al nuevo contenido, usando la Gestión de Misiones existente.
4. Realizar la primera ejecución real con Gloria en **Sesión de aprendizaje**.
5. Verificar que la evidencia académica guardada sea útil para familia/profesionales y que no se mezcle con Vista previa.
6. A partir de la evidencia del Puente, priorizar refuerzos antes de avanzar a más dificultad.
7. Continuar Matemáticas 6.º con nuevos temas reales, manteniendo el mismo patrón solo donde demuestre ser útil.

---

# 7. Integración con Misiones

## DECISIÓN

Los contenidos académicos nuevos de 6.º deben poder asignarse como **Misión de repaso académico** mediante el sistema actual de Gestión de Misiones, evitando crear un subsistema paralelo.

Campos de referencia:

- Curso: `6.º de Primaria`
- Materia: `Matemáticas`
- Tema: el contenido correspondiente (`Puente 5.º → 6.º`, `Fracciones`, etc.)
- Recurso académico: URL de la página estable publicada en `main`

### Límite actual

La integración de `repaso_academico` organiza y abre el recurso asignado, pero todavía no convierte automáticamente una sesión académica genérica de 6.º en evidencia de Misión específica. Esa unión debe diseñarse después de validar el primer uso real, reutilizando el sistema de Misiones y `sesionesAcademicas` existente en lugar de duplicar datos.

---

# 8. Líneas posteriores

## DECISIÓN

- Mantener las microherramientas matemáticas como herramientas transversales, no como propietarias de 6.º.
- Introducir progresivamente variación, transferencia y retención.
- Futuras capacidades de **Intercalar** y **Recordar** deberán apoyarse en evidencia real acumulada.
- Las recompensas/guacamayas seguirán una dirección emocional y de esfuerzo, sin comparación pública ni economía de puntos.
- Academia no declarará por sí sola que Gloria está “lista para ESO”; ofrecerá evidencia para que familia y profesionales puedan valorarlo.

---

# 9. Regla de evolución

Antes de crear una nueva pantalla, componente, motor o arquitectura:

1. revisar lo que ya existe;
2. reutilizarlo cuando sea suficiente;
3. crear algo nuevo solo cuando lo actual no permita resolver bien el problema;
4. justificar por qué hace falta.

El objetivo no es acumular funciones, sino conseguir que cada nuevo bloque haga la Academia más coherente, útil, autónoma y agradable de usar.
