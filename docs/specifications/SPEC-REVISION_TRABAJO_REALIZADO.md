# 👁️ Especificación de Revisión de Trabajo Realizado
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md` |
| **Versión** | 2.0 |
| **Estado** | Activo |
| **Fecha** | 2026 |
| **Última actualización** | 03/09/2026 |
| **Propietario** | Consulta de Trabajo Realizado |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Acceso unificado, contextual y de solo lectura a actividades/evidencias relacionadas con una Misión |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Gobierna:** lenguaje respetuoso y acompañamiento sin juicio. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Gobierna:** relación Misión/Tarea/evidencia. |
| `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` | **Complementa:** ciclo funcional de la Misión. |
| `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md` | **Separa responsabilidades:** análisis/tendencias no se generan dentro del visor histórico. |
| `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md` | **Modela:** sesiones, experiencias y evidencias de distintos motores. |
| `mi-universo/mis-tareas/trabajo-realizado-generico.js` | **Implementa:** visor general de consulta. |
| `mi-universo/mis-tareas/trabajo-realizado-gestion.js` | **Implementa:** integración desde Gestión de Misiones. |
| `mi-universo/mis-tareas/resultado-academico.*` | **Implementa:** visor especializado de resultados académicos. |
| `mi-universo/aventuras-matematicas/detectives/` | **Implementa:** visor especializado de Detectives en modo consulta. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 2.0 | 03/09/2026 | Product Owner + AI Collaborator | Sincroniza la especificación con la implementación transversal validada y fusionada en PR #45. Define un único contrato `👁️ Ver trabajo`, `modo=consulta`, Persona Activa y retorno al caller; reutiliza visores especializados de Detectives/Resultado Académico y visor general para Lectura, Creciendo por Dentro, Biblioteca, Misiones libres y repasos sin resultado digital. Formaliza carga por `sesionId`, fallback legacy y protección estricta de solo lectura. |
| 1.1 | 2026 | Product Owner + AI Collaborator | Ajustó la propuesta inicial con retorno al origen, revisión más rica y posible uso posterior de fortalezas/aspectos a reforzar. |
| 1.0 | 2026 | Product Owner + AI Collaborator | Primera definición funcional de Ver trabajo realizado con Detectives como implementación inicial propuesta. |

---

## 🎯 1. Propósito

Permitir que familia y alumno, según su contexto y permisos, puedan **volver a mirar lo que realmente se hizo** en una Misión sin reejecutar la actividad ni modificar el historial.

Nombre visible unificado:

```text
👁️ Ver trabajo
```

El término técnico **evidencia** permanece en contratos internos cuando sea necesario.

El visor debe responder:

- ¿qué Misión estoy consultando?;
- ¿qué trabajo existe?;
- ¿qué ocurrió en esa ejecución?;
- ¿qué datos registró el Motor?;
- ¿cómo regreso al lugar desde el que abrí la consulta?

No debe convertir la consulta histórica en una nueva sesión.

---

## 📐 2. Alcance V2

### Incluido

- entrada desde **Mi Camino**;
- entrada desde **Gestión de Misiones**;
- resolución común por Misión;
- Persona Activa;
- `modo=consulta`;
- retorno al caller/origen;
- detección del tipo de trabajo disponible;
- visor especializado cuando ya existe uno mejor;
- visor general para otros tipos;
- compatibilidad con evidencias/sesiones modernas y casos heredados;
- estados sin evidencia digital;
- datos faltantes sin inventar valores;
- navegación local/GitHub Pages.

### No incluido

- editar respuestas;
- rehacer una prueba desde el histórico;
- volver a guardar una sesión;
- generar nuevas evidencias al abrir el visor;
- cambiar estado de la Misión;
- validar la Misión desde el visor por el simple hecho de consultarla;
- generar análisis longitudinal nuevo;
- inferir fortalezas o dificultades nuevas;
- crear Misiones de refuerzo automáticamente desde esta vista.

El análisis educativo pertenece a `SPEC-ANALISIS_EDUCATIVO.md`.

---

## 🧭 3. Principios funcionales

### 3.1 Un único contrato visible

Distintos Motores pueden usar distintos visores internos, pero la experiencia de entrada es:

```text
👁️ Ver trabajo
```

El usuario no necesita saber qué visor técnico corresponde.

### 3.2 Resolver antes de navegar

La Academia decide, a partir de la Misión/evidencia:

```text
Misión
→ tipo de trabajo
→ sesión/referencia
→ visor apropiado
→ modo consulta
→ retorno
```

No se envía al usuario genéricamente al módulo como sustituto del trabajo histórico.

### 3.3 Solo lectura

> **Consultar trabajo histórico no escribe.**

No se modifican:

- sesión;
- evidencia;
- respuestas;
- intentos;
- ayudas;
- análisis ya persistido;
- estado de la Misión;
- progreso;
- estadísticas.

### 3.4 No inventar datos

Si una actividad histórica no conserva cierto detalle, se muestra únicamente lo existente.

No inferir:

- duración;
- pistas;
- intentos;
- respuesta;
- audio;
- resultado;
- análisis.

### 3.5 Top-Down

Cuando la cantidad de datos lo permita, presentar:

```text
Misión / contexto
→ actividad o sesión
→ resumen
→ detalle específico
```

La información extensa se revela progresivamente.

---

## 👤 4. Persona Activa y permisos

La consulta debe operar sobre la Persona Activa asociada a la Misión.

No asumir que el usuario autenticado y el alumno son siempre la misma persona.

Reglas:

- resolver Persona Activa mediante el modelo global;
- mantener permisos del contexto que abre la consulta;
- no ampliar escritura por permitir lectura;
- un usuario de consulta no obtiene Gestión de Misiones;
- las reglas Firestore deben permitir únicamente la lectura autorizada necesaria.

---

## 🔙 5. Origen y retorno

El visor puede ser invocado desde:

- Mi Camino;
- Gestión de Misiones;
- detalle autorizado de una Misión;
- otra vista futura compatible.

Debe conservarse el origen mediante el contrato de navegación vigente (`volver` o equivalente).

Flujo:

```text
caller
→ 👁️ Ver trabajo
→ visor apropiado
→ Volver
→ caller original
```

No utilizar una ruta fija si existe un origen válido.

Si no hay origen válido, usar la alternativa segura definida por navegación global.

---

## 🧩 6. Estrategia de visores

### 6.1 Reutilizar antes de crear

No existe obligación de construir un único “supervisor universal”.

Patrón:

```text
resolver común
        ↓
¿existe visor especializado maduro?
  ├─ sí → reutilizarlo en modo consulta
  └─ no → visor general de solo lectura
```

### 6.2 Detectives

Reutiliza su capacidad especializada para mostrar, cuando existe:

- historia;
- nivel/tema;
- comprensión;
- descubrimiento;
- operaciones/datos;
- pasos;
- intentos;
- pistas registradas;
- resultados;
- fecha/tiempo cuando están disponibles.

La protección de `modo=consulta` impide que abrir el histórico altere progreso o cree una nueva ejecución.

### 6.3 Resultado Académico

Reutiliza `resultado-academico` para sesiones `sesion-academica-v1`.

Puede mostrar, según la actividad:

- actividad/Tema;
- fecha;
- correctas/total;
- porcentaje;
- tiempo activo;
- mapa formativo;
- pregunta;
- respuesta seleccionada;
- respuesta correcta;
- explicación;
- bloque/foco.

El resultado histórico no ofrece reenvío de la prueba como escritura.

### 6.4 Visor general

Cubre casos donde no existe visor especializado suficiente, entre ellos:

- Mi Rincón de Lectura;
- Creciendo por Dentro;
- Biblioteca;
- Misión libre;
- recursos académicos heredados sin resultado digital;
- otros formatos compatibles.

---

## 📖 7. Mi Rincón de Lectura

La consulta V2 preserva riqueza informativa existente cuando está registrada.

Puede incluir:

- texto/historia original;
- fecha;
- mapa de palabras;
- análisis de lectura;
- Palabras para Crecer;
- audio si está disponible;
- comprensión;
- reflexión;
- observaciones;
- otros detalles guardados por la sesión.

Regla:

> Adoptar el contrato común no debe empobrecer un visor que ya dispone de información útil.

---

## 🌱 8. Creciendo por Dentro

El visor general puede mostrar, cuando existe:

- Semilla;
- situación;
- respuestas/elecciones;
- frase/reflexión;
- grabación disponible;
- datos de sesión;
- relación con la Misión.

No genera una nueva práctica al consultar.

Si el audio no fue persistido por límites técnicos pero la sesión sí, se presenta el resto del trabajo sin tratar la ausencia de audio como pérdida de toda la evidencia.

---

## 📚 9. Biblioteca

La consulta puede mostrar información del libro/registro relacionado y recursos autorizados de lectura/audio cuando existan.

La ampliación de lectura necesaria para el visor no implica ampliar permisos de escritura.

---

## ✏️ 10. Misión libre

Una Misión libre puede no poseer trabajo digital.

En ese caso la consulta debe explicar de forma simple:

- qué Misión era;
- indicaciones registradas;
- fecha/estado;
- confirmación/revisión disponible;
- observación familiar cuando exista.

No mostrar un error ni inventar una evidencia.

---

## 📘 11. Recursos académicos heredados sin evidencia

Los recursos de 5.º pueden haberse ejecutado antes de existir `sesion-academica-v1` o no producir evidencia automática.

La consulta:

- no fabrica una sesión retrospectiva;
- puede mostrar la referencia/recurso de la Misión y su información administrativa;
- distingue claramente que no existe resultado digital estructurado para esa ejecución.

Una ejecución futura de un recurso modernizado puede producir evidencia nueva; eso no modifica la ejecución histórica anterior.

---

## 🔑 12. Resolución por `sesionId` y compatibilidad legacy

Cuando una evidencia moderna contiene referencia directa de sesión:

```text
sesionId
```

se utiliza como vía preferida de carga.

Ventajas:

- carga precisa;
- menos lecturas;
- evita ambigüedad;
- abre exactamente la ejecución referenciada.

Solo cuando falta una referencia moderna se permite fallback legacy proporcional para localizar trabajo histórico compatible.

No recorrer históricos completos por defecto si existe `sesionId` suficiente.

---

## 📊 13. Análisis y observaciones

El visor puede **mostrar** análisis/observaciones ya registrados por el Motor o por la familia.

No debe generar una nueva interpretación longitudinal al abrirse.

Separación:

```text
VER TRABAJO
¿Qué ocurrió en esta ejecución?

ANÁLISIS EDUCATIVO
¿Qué muestran varias evidencias/tendencias?
```

Esta separación evita duplicar algoritmos y conclusiones.

---

## ⚠️ 14. Estados y errores

### Sin trabajo digital

Mensaje descriptivo, no técnico.

Ejemplo:

> Esta Misión no tiene un resultado digital guardado. Puedes revisar sus indicaciones y el estado registrado.

### Referencia no encontrada

Indicar qué no pudo cargarse y, cuando sea seguro, la razón conocida.

No inventar contenido sustituto.

### Fallo parcial

Si una parte opcional no está disponible (por ejemplo audio) pero existe resto de la sesión, mostrar lo disponible y explicar la ausencia si se conoce.

---

## 🧪 15. Datos de prueba

Abrir un registro `🧪` en consulta:

- no lo convierte en dato real;
- no genera una nueva sesión;
- no altera su marca;
- no lo incorpora a estadísticas/recompensas.

La limpieza pertenece a Gestión de Misiones, no al visor de consulta.

---

## ✅ 16. Validación funcional cerrada

La entrega transversal validada el 02/09/2026 cubrió:

| Caso | Estado |
|---|:---:|
| Detectives | ✅ |
| Mi Rincón de Lectura | ✅ |
| Creciendo por Dentro | ✅ |
| Biblioteca | ✅ |
| 5.º de Primaria sin evidencia estructurada | ✅ |
| 6.º de Primaria con resultado académico | ✅ |
| Misión libre | ✅ |
| Mi Camino después de corrección del observer | ✅ |

La implementación fue aprobada mediante prueba funcional del usuario y fusionada en `main` en PR #45.

---

## ✅ 17. Criterios de aceptación

### Contexto

- [ ] Puede abrirse desde Mi Camino.
- [ ] Puede abrirse desde Gestión de Misiones.
- [ ] Conserva Persona Activa.
- [ ] `Volver` regresa al caller válido.

### Resolución

- [ ] Determina automáticamente el visor adecuado.
- [ ] Usa `sesionId` cuando existe.
- [ ] Fallback legacy solo cuando es necesario.

### Solo lectura

- [ ] No crea sesiones.
- [ ] No registra evidencia nueva.
- [ ] No cambia estado de Misión.
- [ ] No modifica respuestas/intentos/análisis.
- [ ] Detectives respeta `modo=consulta`.
- [ ] Resultado académico es histórico y no reejecutable desde el visor.

### Contenido

- [ ] Muestra lo útil disponible.
- [ ] No inventa datos faltantes.
- [ ] Rincón conserva su detalle rico.
- [ ] Misión libre/sin evidencia muestra contexto útil en vez de error vacío.

### Seguridad

- [ ] Lectura respeta Persona/relación/permisos.
- [ ] Permitir consulta no amplía escritura.

---

## 📌 18. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| TR-001 | Nombre visible unificado `👁️ Ver trabajo`. | Aprobada / implementada |
| TR-002 | Resolver común por Misión; el usuario no elige visor técnico. | Aprobada / implementada |
| TR-003 | Reutilizar visores especializados cuando existen y usar visor general para el resto. | Aprobada / implementada |
| TR-004 | Toda consulta histórica es solo lectura. | Aprobada / implementada |
| TR-005 | Persona Activa y retorno al caller forman parte del contrato. | Aprobada / implementada |
| TR-006 | `sesionId` es vía preferida; fallback legacy solo cuando hace falta. | Aprobada / implementada |
| TR-007 | Un recurso histórico sin evidencia no recibe una sesión inventada. | Aprobada / implementada |
| TR-008 | Ver trabajo muestra datos/observaciones existentes; el análisis longitudinal pertenece a Análisis Educativo. | Aprobada |
| TR-009 | El contrato común no debe empobrecer visores ricos como Rincón de Lectura. | Aprobada / implementada |

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Entrada visible** | `👁️ Ver trabajo`. |
| **Contexto** | Misión + Persona Activa + caller/origen. |
| **Modo** | `consulta` · solo lectura. |
| **Visores** | Especializados cuando existen; general en los demás casos. |
| **Referencia moderna** | `sesionId` preferida. |
| **Histórico legacy** | Compatible sin fabricar datos. |
| **Análisis** | Se muestra lo existente; nuevas tendencias pertenecen a `SPEC-ANALISIS_EDUCATIVO.md`. |
| **Estado** | Activo · V2 validada y fusionada al 02/09/2026. |