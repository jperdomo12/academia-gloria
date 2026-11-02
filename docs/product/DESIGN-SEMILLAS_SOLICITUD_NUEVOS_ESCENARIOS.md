# 🌱 Diseño futuro · Solicitud de nuevos escenarios para Semillas
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/product/DESIGN-SEMILLAS_SOLICITUD_NUEVOS_ESCENARIOS.md` |
| **Versión** | 0.1 |
| **Estado** | Propuesta documentada · no aprobada para desarrollo |
| **Última actualización** | 02/11/2026 |
| **Propietario** | Producto · Creciendo por Dentro / Motor de Semillas |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Dirección futura para solicitar por chat la incorporación de nuevos escenarios curados a una Semilla existente |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/specifications/SPEC-CRECIENDO_POR_DENTRO_MULTI_ESCENARIO.md` | **Base:** define Fase A, separación Semilla = habilidad / Escenario = situación y piloto `Yo sí puedo`. |
| `docs/specifications/SPEC-CRECIENDO_POR_DENTRO.md` | **Gobierna:** comportamiento funcional general del módulo. |
| `docs/standards/STD-CRECIENDO_POR_DENTRO_SEMILLAS.md` | **Gobierna:** diseño pedagógico, seguridad y proceso oficial de creación de Semillas. |
| `docs/product/DESIGN-MOTOR_SEMILLAS-v1.0.md` | **Diseña:** catálogo → Motor → sesión → evidencia. |

---

## 1. Propósito

Conservar para una fase posterior una evolución natural del modelo multi-escenario:

> permitir que la familia / Product Owner solicite por chat **añadir un nuevo escenario a una Semilla ya existente**, mediante un proceso editorial y curado, equivalente conceptualmente al proceso actual de solicitar una nueva Semilla.

Esta capacidad **no forma parte de la Fase A** y no debe implementarse mientras esa fase esté todavía en validación.

Tampoco es todavía generación dinámica dentro de la aplicación.

---

## 2. Principio rector

La solicitud de un nuevo escenario no cambia la habilidad principal de la Semilla.

Regla:

> **Si se practica la misma habilidad en otra situación, puede ser un nuevo escenario. Si cambia la habilidad principal, normalmente corresponde otra Semilla.**

Por tanto, antes de diseñar contenido debe verificarse:

```text
situación solicitada
→ identificar Semilla propuesta
→ comprobar habilidad principal
→ ¿la situación realmente practica esa misma habilidad?
   ├─ sí → candidato a nuevo escenario
   └─ no → proponer otra Semilla existente o una nueva Semilla
```

---

## 3. Canal inicial previsto

La primera versión futura se concibe como un proceso realizado **por chat con la AI Collaborator**, no desde una pantalla de creación dentro de Academia.

Ejemplo:

> “Quiero añadir a `Yo sí puedo` un escenario en el que Gloria está aprendiendo a montar en bicicleta y se compara con una amiga que ya sabe.”

La AI Collaborator debe asumir el trabajo de análisis, propuesta, revisión, documentación e incorporación técnica, manteniendo al Product Owner centrado en la necesidad y la aprobación funcional.

---

## 4. Modalidades de entrada

La solicitud debe admitir distintos niveles de detalle. No se debe obligar al solicitante a completar todas las etapas para poder proponer un escenario.

### 4.1 Entrada mínima · solo descripción del escenario

Datos mínimos:

- Semilla existente a la que se desea añadir el escenario;
- descripción en lenguaje natural de la situación.

Ejemplo:

```text
Semilla: Yo sí puedo

Escenario:
Gloria está aprendiendo a montar en bicicleta. Una amiga ya sabe y
Gloria empieza a pensar que ella no podrá hacerlo igual de bien.
```

A partir de esa información, la AI Collaborator propone:

- título del escenario;
- `escenarioId`;
- texto de situación;
- opciones contextualizadas para todas las etapas existentes de la Semilla;
- ayudas de Lía cuando aporten valor;
- recurso visual si se justifica;
- cualquier ajuste mínimo necesario sin alterar la habilidad principal.

### 4.2 Entrada parcial · descripción + algunas etapas/opciones

El solicitante puede aportar ideas para **una o varias etapas**, dejando las demás sin definir.

Ejemplo:

```text
Semilla: Yo sí puedo

Escenario:
Aprender a montar en bicicleta.

Ideas para fortaleza:
- Paciencia
- Constancia
- Valentía

Idea para frase amable:
- Estoy aprendiendo y no tengo que hacerlo igual que otra persona.
```

La AI Collaborator debe:

- conservar y revisar las aportaciones útiles;
- adaptar o rechazar las que contradigan la intención pedagógica;
- completar únicamente las etapas faltantes;
- presentar el escenario completo para revisión.

### 4.3 Entrada completa · descripción + todas las etapas/opciones

El solicitante puede proponer prácticamente todo el escenario:

- situación;
- opciones para cada etapa;
- frases o ayudas;
- observaciones adicionales.

Esto **no convierte el contenido aportado en contenido aprobado automáticamente**.

La AI Collaborator debe realizar igualmente la revisión pedagógica, emocional, funcional y de coherencia con la Semilla antes de incorporarlo.

---

## 5. Regla sobre las etapas

La solicitud puede aportar opciones para:

- ninguna etapa;
- una etapa;
- varias etapas;
- todas las etapas.

No es obligatorio rellenarlas todas.

La estructura pedagógica de la Semilla permanece estable salvo decisión funcional independiente.

Ejemplo para `Yo sí puedo`:

```text
logro
→ fortaleza
→ fraseAmable
→ siguientePaso
```

Un nuevo escenario puede cambiar:

- situación;
- opciones de `logro`;
- opciones de `fortaleza`;
- opciones de `fraseAmable`;
- opciones de `siguientePaso`;
- ayudas específicas.

Pero no debería sustituir libremente esa secuencia por otra diferente.

Si una situación requiere, por ejemplo:

```text
qué ocurrió
→ cómo me siento
→ qué quiero pedir
→ a quién pido ayuda
```

eso es una señal de que probablemente pertenece a otra Semilla/habilidad.

---

## 6. Lo aportado por el usuario es una propuesta

Todo contenido aportado debe considerarse **propuesto**, no válido automáticamente.

Ejemplo:

```text
Fortaleza propuesta: “Ser mejor que los demás”
```

La AI Collaborator no debe incorporarlo sin revisión si contradice la habilidad o los principios de Academia.

Puede:

- explicar brevemente el problema;
- reformular la opción;
- proponer alternativas compatibles;
- conservar la intención útil cuando sea posible.

La prioridad es preservar:

- una habilidad principal;
- autonomía;
- dignidad;
- seguridad emocional;
- lenguaje no punitivo;
- no atribuir intenciones de terceros sin evidencia;
- no convertir la Semilla en evaluación o diagnóstico.

---

## 7. Flujo editorial previsto

La dirección propuesta es:

```text
Solicitud por chat
↓
Identificar Semilla/habilidad propietaria
↓
Validar que sigue siendo la misma habilidad
↓
Leer aportaciones del solicitante
↓
Completar solamente lo que falte
↓
Revisar pedagogía / seguridad / coherencia
↓
Presentar propuesta completa
↓
Aprobación del Product Owner
↓
Documentación oficial
↓
Incorporación data-driven
↓
Pruebas / publicación
↓
Uso real
```

El Product Owner no debe tener que editar JSON o código manualmente.

---

## 8. Formato orientativo de solicitud

La futura interacción puede aceptar lenguaje natural libre, pero un formato estructurado opcional puede ayudar:

```text
Añadir escenario a Semilla existente

Semilla:
[Nombre de la Semilla]

Descripción del escenario:
[Obligatorio]

Opcional:
- Situación propuesta:
- Opciones para etapa 1:
- Opciones para etapa 2:
- Opciones para etapa 3:
- Opciones para etapa 4:
- Ayudas o frases que queremos conservar:
- Otra observación:
```

Solo `Semilla` y `Descripción del escenario` son conceptualmente necesarias para iniciar el análisis.

La cantidad y nombres de etapas deben derivarse de la Semilla real; no asumir siempre cuatro etapas.

---

## 9. Relación con la futura generación dinámica

Esta fase editorial por chat debe servir como **laboratorio seguro** antes de considerar una experiencia dinámica dentro de Academia.

Permitirá observar:

- cuánto contexto suele aportar la familia;
- qué partes suele completar la AI Collaborator;
- qué tipos de propuestas necesitan corrección;
- qué validaciones son realmente necesarias;
- qué información debe guardarse;
- qué casos no pertenecen a la Semilla seleccionada;
- cuánto puede automatizarse con seguridad.

La dirección posterior podría llegar a:

```text
usuario dentro de Academia describe una situación
↓
Academia valida que corresponde a la habilidad
↓
propone/adapta un escenario
↓
usuario practica
```

Pero esa capacidad **no queda aprobada** por este documento.

Antes requerirá análisis específico de:

- privacidad;
- seguridad emocional;
- calidad y control del contenido generado;
- hechos frente a interpretaciones;
- atribución de intención a terceros;
- persistencia o carácter efímero;
- revisión familiar/profesional;
- límites de IA;
- trazabilidad del escenario generado;
- interacción con histórico y Misiones.

---

## 10. Fases conceptuales futuras

Sin fijar todavía numeración definitiva, la evolución puede madurar así:

### Etapa editorial

Solicitar por chat nuevos escenarios curados para Semillas existentes.

Entrada mínima / parcial / completa.

Resultado revisado, aprobado e incorporado al catálogo.

### Etapa asistida

Reducir el trabajo editorial mediante herramientas o formularios que ayuden a estructurar la solicitud, manteniendo revisión antes de publicar.

### Etapa dinámica

Permitir eventualmente que el usuario proponga una situación dentro de la aplicación y reciba una adaptación contextual controlada.

Esta última etapa solo debe diseñarse después de contar con evidencia suficiente de las anteriores.

---

## 11. Estado de decisión

**PROPUESTA DOCUMENTADA · NO APROBADA PARA DESARROLLO.**

Se conserva como dirección futura:

1. permitir solicitar por chat un nuevo escenario para una Semilla existente;
2. aceptar como entrada válida:
   - solo descripción del escenario;
   - descripción + algunas etapas/opciones;
   - descripción + todas las etapas/opciones;
3. tratar todo aporte como propuesta sujeta a revisión;
4. mantener la estructura/habilidad de la Semilla salvo decisión separada;
5. usar esta fase editorial para aprender antes de diseñar generación dinámica dentro de Academia.

La activación de esta evolución deberá realizarse explícitamente después de validar/madurar la Fase A multi-escenario.
