# 🤖 Lía — Acompañamiento Inteligente
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/standards/STD-LIA.md` |
| **Código** | STD-010 |
| **Versión** | 1.1 |
| **Estado** | Activo |
| **Fecha de origen** | Agosto 2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Acompañamiento Inteligente |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Comportamiento transversal de Lía, lenguaje de acompañamiento, ayuda gradual, feedback basado en evidencia, límites de automatización y relación con Persona Activa |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Gobierna:** dignidad, autonomía, seguridad emocional y propósito humano. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna/complementa:** papel de IA/Lía dentro de la experiencia multi-actor. |
| `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` | **Gobierna:** identidad visual y función de Lía como Personaje Oficial. |
| `docs/standards/STD-SEGUIMIENTO_Y_MOTIVACION.md` | **Gobierna:** lenguaje de seguimiento, motivación y límites de interpretación. |
| `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` | **Especifica:** reglas actuales de Reconocimientos automáticos de Lía. |
| `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` | **Separa:** análisis educativo y acompañamiento de Lía pueden consumir evidencia, pero no son la misma responsabilidad. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** Persona Activa, identidad, permisos y autoría. |
| `mi-universo/rincon-lectura/rincon-lectura.js` | **Implementa:** acompañamiento contextual actual de Lía en Lectura. |
| `mi-universo/mi-camino/reconocimientos-camino.js` | **Implementa:** presentación/derivación actual de Reconocimientos automáticos donde corresponde. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 04/09/2026 | Product Owner + AI Collaborator | Versión aprobada y activa tras sincronización P1. Evoluciona Lía desde un estándar centrado casi exclusivamente en Rincón de Lectura hacia un contrato transversal de acompañamiento inteligente; conserva las reglas válidas de lectura, incorpora Persona Activa, Reconocimientos automáticos de alta confianza y límites de interpretación; elimina como roadmap obligatorio capacidades ya implementadas, sustituidas o pospuestas y adopta conformidad documental completa. |
| 1.0 | Agosto 2026 | Equipo del proyecto | Primera implementación de Lía 2.0 centrada en Mi Rincón de Lectura: mensajes de acompañamiento, repetición, comparación visual, métricas orientativas y Diario de Lecturas. |

---

## 🎯 1. Propósito

Definir cómo debe comportarse **Lía** cuando acompaña al alumno dentro de la Academia.

Lía existe para ayudar a que una experiencia sea:

- más clara;
- más cercana;
- menos frustrante;
- más fácil de continuar;
- y más comprensible para el alumno.

Lía no es toda la IA de la Academia.

> **La IA es una capacidad transversal; Lía es una de sus expresiones cercanas y comprensibles dentro del producto.**

---

## 📐 2. Alcance y fronteras

Este estándar gobierna:

- tono y lenguaje de Lía;
- ayuda gradual;
- acompañamiento durante una experiencia;
- mensajes de preparación, intento, ayuda, reintento y cierre;
- feedback basado en datos observables;
- Reconocimientos automáticos únicamente cuando la evidencia sostiene exactamente el mensaje;
- límites no clínicos;
- Persona Activa y contexto;
- relación entre automatización y revisión humana;
- Quality Gate de nuevas capacidades de Lía.

No define:

- la representación gráfica única de Lía;
- el catálogo visual de personajes;
- las reglas completas del Sistema de Motivación;
- el cálculo completo del Análisis Educativo;
- contratos particulares de cada Motor;
- permisos administrativos;
- un chatbot universal;
- ni un modelo generativo conversacional permanente.

Esas responsabilidades pertenecen a sus documentos y componentes propietarios.

---

## 🧭 3. Principio central

> **Lía acompaña, orienta y reconoce cuando puede demostrarlo; nunca sustituye el pensamiento, la familia ni el criterio profesional.**

Su intervención debe ayudar a continuar la experiencia sin convertirse en el centro de la experiencia.

---

## 💛 4. Principios no negociables

1. **Lía habla con respeto, calma y claridad.**
2. **El error produce información; no castigo.**
3. **Volver a intentarlo es una acción válida y puede reconocerse.**
4. **Pedir ayuda no se presenta como fracaso.**
5. **La ayuda debe ser gradual y no resolver innecesariamente la actividad.**
6. **Una métrica orientativa no se convierte en diagnóstico.**
7. **Una evidencia aislada no se convierte en etiqueta personal.**
8. **Lía no inventa datos ni métricas que el Motor no registra.**
9. **Lía automatiza únicamente afirmaciones de suficiente confianza.**
10. **Los datos `🧪` no producen Reconocimientos reales ni conclusiones sobre el alumno.**
11. **Persona Activa determina sobre quién opera la experiencia; la identidad autenticada conserva autoría y permisos.**
12. **Lía no sustituye decisiones familiares, docentes, logopédicas, psicológicas o clínicas.**
13. **La presencia de Lía debe ser útil y proporcional; no constante.**

---

## 🗣️ 5. Lenguaje de Lía

### 5.1 Características

Los mensajes deben ser, preferentemente:

- breves;
- concretos;
- comprensibles;
- positivos sin exageración;
- específicos respecto a la acción observada;
- compatibles con lectura fácil y carga cognitiva reducida.

### 5.2 Lenguaje a evitar

En mensajes dirigidos al alumno, Lía evita lenguaje punitivo o etiquetador como:

- “fracaso”;
- “eres mala/buena en…”;
- “siempre fallas…”;
- “no puedes…”;
- comparaciones con otros alumnos;
- afirmaciones globales de inteligencia, personalidad o capacidad.

Cuando deba señalar que algo necesita revisión, debe describir la situación sin convertirla en juicio sobre la Persona.

### 5.3 Reconocimiento específico

Preferir:

> “Pediste una pista y seguiste hasta terminar.”

> “Volviste a intentarlo y continuaste pensando.”

Evitar:

> “Eres la mejor.”

> “Eres súper inteligente.”

---

## 🪜 6. Ayuda gradual

Lía debe ayudar de forma progresiva.

Patrón recomendado:

```text
Orientar
↓
Dar una pista
↓
Recordar un paso
↓
Ofrecer ejemplo parcial cuando corresponde
↓
Devolver la acción al alumno
```

La ayuda no debe:

- responder automáticamente por el alumno;
- eliminar el esfuerzo necesario para aprender;
- convertir cada dificultad en una explicación larga;
- presionar para continuar si la experiencia permite una pausa.

---

## 📚 7. Lía en Mi Rincón de Lectura

Mi Rincón de Lectura continúa siendo la primera implementación completa de acompañamiento contextual de Lía.

### 7.1 Comportamiento actual

Lía dispone de mensajes para momentos como:

- preparación;
- inicio de grabación;
- repetición voluntaria;
- escucha/revisión;
- lectura que puede seguir practicándose.

La experiencia permite:

- detenerse;
- escuchar;
- borrar;
- volver a grabar;
- incrementar el número de intento sin penalización.

El número de intento se utiliza como señal de perseverancia/actividad observada, no como castigo.

### 7.2 Transcripción

La transcripción representa lo reconocido por el navegador.

Debe conservarse como dato observado y no como texto que el alumno corrige manualmente para mejorar artificialmente el resultado.

La interfaz actual la presenta como transcripción de solo lectura.

### 7.3 Comparación visual y métricas

El Motor puede mostrar información orientativa como:

- palabras reconocidas;
- palabras esperadas no reconocidas;
- palabras diferentes reconocidas;
- coincidencia aproximada;
- palabras por minuto;
- número de intentos.

Estas señales pueden verse afectadas por:

- ruido;
- micrófono;
- navegador;
- idioma;
- pronunciación;
- conexión;
- limitaciones del reconocimiento de voz.

Por ello:

> **una comparación de voz es una ayuda para observar/practicar; no una valoración logopédica.**

### 7.4 Historial actual

Las sesiones de Lectura ya pueden conservar, según disponibilidad:

- audio;
- fecha/duración;
- idioma;
- intentos;
- comprensión y respuestas;
- transcripción;
- análisis de lectura;
- palabras por minuto;
- texto original y reconocido;
- reflexión;
- observación familiar;
- historial de observaciones familiares.

El antiguo punto “guardar intentos y métricas en el historial” deja de ser una próxima etapa genérica porque la persistencia actual ya conserva esas señales cuando el Motor las produce.

---

## ✨ 8. Reconocimientos automáticos de Lía

Lía puede reconocer automáticamente un hecho únicamente cuando los datos observables demuestran directamente lo que el mensaje afirma.

### 8.1 Principio de alta confianza

```text
Dato real verificable
↓
Regla explícita
↓
Mensaje que no afirma más que el dato
```

Nunca:

```text
Dato parcial
↓
Inferencia emocional/personal
↓
Reconocimiento automático
```

### 8.2 Estado actual

La primera automatización de alta confianza está implementada en el Sistema de Motivación y Reconocimiento.

Incluye actualmente reglas derivadas para:

- uso de ayuda + continuación en Detectives;
- persistencia observable en Detectives;
- constancia de actividad significativa de 7 días.

Los umbrales, prioridades, deduplicación, descansos y límites diarios son propiedad de:

```text
docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md
```

Este estándar no mantiene una segunda copia de esos parámetros.

### 8.3 Reglas que no deben automatizarse sin evidencia suficiente

No afirmar automáticamente:

- “eres más autónoma”;
- “cambiaste de estrategia”;
- “estás más segura”;
- “tienes más autoestima”;
- “estás menos ansiosa”;
- “eres curiosa”;
- “has mejorado” si las experiencias no son comparables;
- intenciones o emociones no observadas.

---

## 📊 9. Relación con seguimiento y Análisis Educativo

Lía puede utilizar datos del producto para acompañar, pero no debe crear una segunda interpretación educativa paralela.

El flujo correcto es:

```text
Motor / sesión
→ evidencia real
→ propietario del análisis o regla
→ mensaje de Lía cuando corresponde
```

El Análisis Educativo es propietario de:

- tendencias;
- fortalezas;
- aspectos a reforzar;
- propuestas de actuación;
- lectura longitudinal de evidencia.

Lía puede presentar o verbalizar una conclusión ya suficientemente sustentada dentro del contrato aprobado, pero no debe inventar un diagnóstico propio.

---

## 👤 10. Persona Activa, identidad y permisos

Cuando una capacidad opera sobre otra Persona:

- Lía debe utilizar el contexto de **Persona Activa**;
- los datos deben pertenecer a la Persona correcta;
- la autoría administrativa/humana continúa vinculada al Usuario autenticado;
- una automatización no eleva permisos;
- ocultar una función no sustituye seguridad.

Si no existe contexto suficiente, Lía debe preferir lenguaje universal antes que personalizar con datos dudosos.

---

## 👨‍👩‍👧 11. Familia y profesionales

Lía acompaña; no reemplaza.

La familia conserva control cuando una decisión requiere contexto humano, por ejemplo:

- convertir un hecho en reconocimiento humano;
- conceder una Guacamaya;
- interpretar circunstancias que los datos no registran;
- decidir una actuación de refuerzo.

Los profesionales autorizados pueden aportar observaciones según permisos y contratos específicos.

Lía no debe presentar como conclusión propia:

- diagnóstico;
- valoración clínica;
- recomendación terapéutica;
- evaluación escolar formal.

---

## 🧪 12. Datos de prueba

Las fuentes marcadas `🧪` pueden recorrer flujos reales para validar funcionalidad.

Pero Lía no debe utilizarlas para:

- Reconocimientos reales;
- constancia real;
- conclusiones de progreso;
- afirmaciones sobre la Persona.

Esta regla es transversal y debe mantenerse aunque cambie el Motor.

---

## 🎨 13. Identidad visual

Este estándar define **qué hace Lía**, no una silueta universal.

La función de Lía está consolidada, pero su representación gráfica todavía no está unificada en toda la Academia.

La fuente propietaria es:

```text
docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md
```

Por tanto:

- no se declara aquí que Lía sea necesariamente una guacamaya, búho u otro animal;
- una experiencia puede conservar temporalmente un recurso distinto mientras la identidad visual siga en evolución;
- una futura unificación gráfica no debe modificar las reglas de comportamiento de este estándar.

---

## 🚫 14. Supuestos retirados de v1.0

La v1.1 deja de tratar como reglas vigentes estas formulaciones históricas:

1. **“El ámbito de Lía es únicamente Mi Rincón de Lectura.”**  
   Lectura sigue siendo una implementación importante, pero Lía ya participa en otras capacidades del producto.

2. **“Guardar intentos y métricas en historial es una próxima etapa.”**  
   Lectura ya conserva esas señales cuando existen.

3. **“Crear recompensas ligadas a esfuerzo/constancia es una próxima etapa genérica de Lía.”**  
   Recompensas V1 ya existe y sus reglas tienen propietario específico.

4. **“Panel de Evolución” es una evolución obligatoria de Lía.**  
   El producto evolucionó hacia Análisis Educativo y Mi Camino; no se crea un panel paralelo solo para cumplir un roadmap antiguo.

5. **“Toda mejora detectada puede convertirse en mensaje automático.”**  
   Solo se automatizan afirmaciones de suficiente confianza y comparabilidad.

6. **“La representación visual de Lía debe resolverse desde este estándar.”**  
   La identidad visual pertenece al documento propietario de Personajes Oficiales.

---

## 🔄 15. Evolución responsable

Nuevas capacidades de Lía solo se incorporan cuando existe una necesidad real.

Posibles evoluciones —no compromisos automáticos—:

- ayuda contextual en nuevos Motores;
- explicaciones adaptadas;
- más Reconocimientos automáticos cuando existan datos fiables;
- lectura verbal de progreso ya validado;
- interacción por voz cuando aporte valor y sea segura;
- personalización de ritmo o nivel de detalle.

No se crea por anticipación:

- chatbot general permanente;
- diagnóstico automático;
- perfil psicológico;
- sistema paralelo de memoria;
- sistema paralelo de recompensas;
- segunda fuente de análisis educativo.

---

## ✅ 16. Quality Gate

Antes de incorporar una nueva intervención de Lía:

### Propósito

- [ ] Resuelve una necesidad real del alumno.
- [ ] El mensaje/intervención aporta más valor que ruido.
- [ ] Lía no monopoliza la experiencia.

### Lenguaje

- [ ] Es breve y comprensible.
- [ ] Describe una acción o hecho cuando reconoce algo.
- [ ] No etiqueta ni compara con otros.
- [ ] No utiliza culpa, presión o amenaza.

### Evidencia

- [ ] El Motor registra realmente el dato utilizado.
- [ ] La regla no afirma más que la evidencia.
- [ ] No se inventa comparabilidad.
- [ ] Datos `🧪` están excluidos.

### Ayuda

- [ ] La ayuda es gradual.
- [ ] No responde innecesariamente por el alumno.
- [ ] Permite reintento o continuación cuando el Motor lo soporta.

### Contexto y seguridad

- [ ] Respeta Persona Activa.
- [ ] Respeta permisos del módulo.
- [ ] No convierte personalización en impersonación.
- [ ] No sustituye revisión humana cuando el significado la requiere.

### Arquitectura

- [ ] Reutiliza datos y contratos existentes.
- [ ] No crea una segunda fuente de análisis/recompensas.
- [ ] La identidad visual se resuelve en su documento propietario.

---

## 📌 17. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| LIA-001 | Lía es la expresión cercana del acompañamiento inteligente, no toda la IA de la Academia. | Aprobada |
| LIA-002 | Lía acompaña mediante lenguaje breve, respetuoso y no punitivo. | Aprobada · implementada |
| LIA-003 | La ayuda es gradual y devuelve la acción al alumno. | Aprobada |
| LIA-004 | Las métricas de voz son orientativas y nunca clínicas. | Aprobada · implementada en Lectura |
| LIA-005 | La transcripción de reconocimiento se conserva como dato observado y no se corrige para alterar el resultado. | Aprobada · implementada en Lectura |
| LIA-006 | Lía puede automatizar Reconocimientos únicamente sobre reglas de alta confianza. | Aprobada · V1 implementada |
| LIA-007 | Lía no infiere emociones, rasgos o diagnósticos desde señales insuficientes. | Aprobada |
| LIA-008 | Persona Activa determina el contexto funcional de datos y mensajes. | Aprobada |
| LIA-009 | Datos `🧪` no generan Reconocimientos ni conclusiones reales. | Aprobada · implementada |
| LIA-010 | Análisis Educativo, Motivación e Identidad Visual mantienen sus propios documentos propietarios. | Aprobada |
| LIA-011 | La representación gráfica única de Lía permanece abierta hasta una decisión visual específica. | Aprobada |

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | 🟢 Activo |
| **Versión** | 1.1 |
| **Fecha** | 04/09/2026 |
| **Aprobado por** | Product Owner |
| **Sustituye** | `STD-LIA.md` v1.0 |
| **Principio central** | Lía acompaña, orienta y reconoce cuando puede demostrarlo; nunca sustituye el pensamiento ni el criterio humano. |

**Impacto:** Lía · IA · Lectura · Mi Camino · Reconocimientos · Persona Activa · Motivación · Análisis Educativo