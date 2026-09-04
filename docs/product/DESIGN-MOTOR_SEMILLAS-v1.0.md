# 🌱 Diseño · Motor de Semillas
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/product/DESIGN-MOTOR_SEMILLAS-v1.0.md` |
| **Versión** | 1.1 |
| **Estado** | Activo |
| **Fecha de origen** | Agosto 2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Producto · Creciendo por Dentro |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Diseño de producto del Motor de Semillas implementado en `mi-universo/creciendo-por-dentro/` |

## 🔗 Documentos relacionados

| Documento / fuente | Relación |
|---|---|
| `docs/specifications/SPEC-CRECIENDO_POR_DENTRO.md` | **Especifica:** comportamiento funcional y criterios verificables de Creciendo por Dentro. |
| `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md` | **Modela:** patrón transversal Motor → sesión → evidencia. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Gobierna:** integración con Misiones, evidencia, finalización y revisión. |
| `docs/standards/STD-SEGUIMIENTO_Y_MOTIVACION.md` | **Gobierna:** seguimiento y motivación no punitiva. |
| `mi-universo/creciendo-por-dentro/` | **Implementa:** Motor de Semillas vigente. |
| `compartido/api/academia.js` | **Implementa:** persistencia y API compartida. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 04/09/2026 | Product Owner + AI Collaborator | P2. Sincroniza el diseño con el producto real: el piloto ya está implementado; conserva la arquitectura de Semillas, sesión y evidencia, reconoce la integración vigente con Mi Camino/Misiones y separa claramente diseño, especificación y evolución futura. |
| 1.0 | Agosto 2026 | Product Owner + AI Collaborator | Diseño inicial del piloto implementable del Motor de Semillas. |

---

## 🎯 1. Objetivo

Definir el diseño de producto del primer **Motor de Semillas** de la Academia, reutilizando patrones ya validados sin introducir un motor universal prematuro.

El Motor está actualmente materializado en:

```text
mi-universo/creciendo-por-dentro/
```

Este documento conserva las decisiones de diseño. El comportamiento funcional verificable pertenece a `SPEC-CRECIENDO_POR_DENTRO.md` y el estado implementado se confirma contra el código vigente.

---

## 🧭 2. Principios de diseño

1. **Una Semilla es una experiencia de crecimiento, no una evaluación clínica.**
2. **La experiencia debe ser comprensible, guiada y no punitiva.**
3. **Se reutilizan patrones compartidos de voz, sesión, evidencia, navegación y Persona Activa antes de crear infraestructura paralela.**
4. **La sesión conserva el trabajo realizado; la evidencia referencia la sesión cuando una Misión necesita trazabilidad.**
5. **Práctica libre y ejecución desde Misión son recorridos válidos y distintos.**
6. **La complejidad administrativa no se expone al alumno.**
7. **No se realizan diagnósticos ni análisis emocionales automáticos presentados como conclusiones profesionales.**

---

## 🧩 3. Componentes del Motor

La implementación actual conserva la separación:

```text
semillas.json
    ↓ contenido
creciendo-por-dentro.js
    ↓ experiencia y coordinación
index.html + CSS
    ↓ presentación
Academia.semillas / API compartida
    ↓ persistencia
sesión guardada
    ↓ cuando existe Misión
Evidencia de aprendizaje
```

El catálogo de Semillas vive en `semillas.json` y la experiencia se ejecuta desde `creciendo-por-dentro.js`.

---

## 🌱 4. Flujo conceptual

```text
Acceso libre o desde una Misión
        ↓
Cargar contexto y catálogo
        ↓
Seleccionar / recibir una Semilla válida
        ↓
Comprender la situación
        ↓
Describir
        ↓
Expresar
        ↓
Solicitar / construir respuesta
        ↓
Practicar con voz cuando corresponde
        ↓
Guardar sesión
        ↓
Registrar evidencia si existe Misión válida
        ↓
Actualizar el recorrido correspondiente
```

La UI concreta puede evolucionar sin cambiar este flujo conceptual mientras preserve su intención educativa.

---

## 💾 5. Sesión y persistencia

La sesión de Semilla conserva el trabajo real realizado por la Persona Activa. Entre los datos que la implementación puede registrar se encuentran:

- identificador de Semilla;
- título / familia / tipo de situación;
- nivel de apoyo;
- respuestas construidas;
- grabación y transcripción cuando existen;
- intentos y duración cuando son observables;
- observación familiar;
- referencias de contexto necesarias.

El contrato físico exacto pertenece al código y a las convenciones de datos vigentes; este diseño no congela un payload exhaustivo.

---

## 🔗 6. Evidencia y Misiones

Cuando la experiencia se ejecuta dentro de una Misión compatible:

```text
Misión
  ↓
Semilla realizada
  ↓
sesión guardada
  ↓
evidencia referenciada
```

La evidencia identifica la actividad y su sesión propietaria. No debe duplicar innecesariamente todo el contenido de la sesión.

La finalización y el progreso de Misiones se rigen por `STD-MIS_TAREAS_Y_MISIONES.md` y su especificación propietaria.

---

## 👤 7. Persona Activa

El Motor debe operar sobre la **Persona Activa** autorizada y conservar ese contexto durante navegación, persistencia, evidencia y retorno.

Usuario autenticado, Persona propia y Persona Activa no deben confundirse.

---

## ✅ 8. Estado actual

La capacidad base está **implementada** y dispone, entre otros elementos, de:

- catálogo `semillas.json`;
- Motor funcional en `creciendo-por-dentro.js`;
- acceso libre;
- ejecución contextual desde Misión;
- guardado de sesiones;
- integración con evidencia/progreso;
- voz/transcripción donde corresponde;
- navegación compartida y retorno contextual.

La existencia de herramientas de piloto o compatibilidad no las convierte en el contrato permanente del producto.

---

## 🚫 9. Fuera del contrato actual

No forman parte obligatoria de este diseño:

- un motor universal abstracto para todas las experiencias;
- Misiones heterogéneas entre múltiples Motores;
- diagnóstico o análisis emocional automático;
- recomendaciones automáticas no revisadas;
- un Jardín Personal completo por el mero hecho de existir Semillas;
- nuevas capas técnicas sin una necesidad observada.

Estas capacidades requieren decisión y fuente propietaria antes de considerarse producto vigente.

---

## 🧪 10. Validación

La experiencia debe seguir validándose mediante uso real y criterios observables, entre ellos:

- comprensión de la situación y de las instrucciones;
- facilidad para completar el recorrido;
- claridad de voz/transcripción cuando se usa;
- persistencia correcta;
- evidencia/progreso correctos cuando existe Misión;
- ausencia de escrituras indebidas en modos de consulta/preview;
- motivación y disposición para regresar;
- coherencia con FOUNDATION y con la supervisión familiar.

---

## 🛠️ 11. Mantenimiento

Actualizar este documento cuando cambie una **decisión estable de diseño del Motor de Semillas**.

Los cambios detallados de comportamiento se consolidan primero en la especificación propietaria; los cambios puramente técnicos permanecen en código o documentación técnica cuando no alteran el diseño de producto.

---

**Fin de `DESIGN-MOTOR_SEMILLAS-v1.0.md` · v1.1 · Activo**
