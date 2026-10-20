# Plan Semanal 6.º
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-PLAN_SEMANAL_6TO.md` |
| **Versión** | 1.0 |
| **Estado** | Aprobada para desarrollo · no implementada |
| **Última actualización** | 20/10/2026 |
| **Propietario** | Experiencia curricular · 6.º de Primaria |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Incorporación selectiva de documentos relevantes publicados por Gaudem en Plan Semanal, organizados por semana y conectados con sus materias/Temas propietarios |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | Gobierna la incorporación de material escolar real y la reutilización de Temas existentes. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | Gobierna la organización conceptual de la experiencia. |
| `docs/specifications/SPEC-SCIENCE_6TO_NUTRICION.md` | Primera aplicación real: material complementario semanal conectado con el Tema existente de Nutrición. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | Gobierna desarrollo, validación, PR, aprobación y cierre. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 20/10/2026 | Product Owner + AI Collaborator | Decisión funcional aprobada: nuevo acceso transversal `Plan Semanal` en 6.º, incorporación selectiva mediante una sola instrucción, organización por semanas y conexión con el Tema propietario cuando corresponda. Registra `6_PS_ANS_Nutrición.pdf` como primera aplicación, semana escolar del 19 al 26 de octubre de 2026. |

---

## 1. Propósito

`Plan Semanal` permite incorporar a Academia una **selección de materiales relevantes** que el Colegio Gaudem publica semanalmente para 6.º de Primaria.

No pretende copiar ni republicar automáticamente toda la carpeta oficial del colegio.

El principio es:

> **Gaudem publica muchos documentos; el Product Owner selecciona cuáles merecen formar parte de Academia.**

La Academia transforma esos materiales seleccionados en una experiencia clara y útil, conservando su procedencia y conectándolos con la materia y el Tema que realmente les corresponde.

---

## 2. Ubicación en 6.º

En el portal de `6.º de Primaria`, `Plan Semanal` debe aparecer como un espacio transversal propio:

```text
Mis asignaturas
Zonas del cole
📅 Plan Semanal
Recursos del colegio
```

Por tanto:

- se ubica **después de `Zonas del cole`**;
- se ubica **antes de `Recursos del colegio`**;
- no es una asignatura;
- no es una Zona del cole;
- no sustituye a los portales de materia;
- no es una copia del Site de Gaudem.

---

## 3. Organización por semanas

La entrada principal de `Plan Semanal` organiza el material seleccionado por la semana indicada por el Product Owner.

Ejemplo:

```text
📅 Plan Semanal

Esta semana · 19–26 octubre
  🔬 Science · Nutrición
     El viaje de la nutrición

Semanas anteriores
  13–19 octubre
  ...
```

La etiqueta de semana debe conservar el rango escolar utilizado por Gaudem cuando sea conocido.

Las semanas anteriores pueden presentarse plegadas o con menor protagonismo para evitar saturación.

No existe obligación de mostrar todas las semanas: una semana puede no tener ningún material incorporado si el Product Owner no seleccionó documentos.

---

## 4. Incorporación selectiva mediante una sola instrucción

El Product Owner no debe realizar tareas administrativas para registrar cada material.

Son entradas suficientes expresiones como:

- `Adjunto documento del Plan Semanal de esta semana.`
- `Adjunto documento del Plan Semanal de la semana pasada.`
- `Adjunto documento del Plan Semanal de la semana del 19 al 26 de octubre.`

A partir de esa instrucción y del archivo aportado, el proceso debe:

1. identificar el contenido y, cuando sea posible, la materia;
2. resolver la semana indicada por el Product Owner;
3. analizar si corresponde a un Tema existente, a un Tema nuevo o a una actividad semanal independiente;
4. reutilizar el Tema existente cuando proceda;
5. conservar la procedencia `Material del colegio · Plan Semanal`;
6. construir solo la experiencia necesaria;
7. documentar la incorporación conforme al workflow vigente.

Solo se solicita aclaración si existe una ambigüedad que pueda cambiar materialmente la ubicación o el significado del material.

---

## 5. Clasificación de cada documento seleccionado

### 5.1 Material complementario de un Tema existente

Si el documento amplía, practica o refuerza un contenido que ya existe en Academia:

- **no se crea otro Tema**;
- el conocimiento sigue perteneciendo al Tema existente;
- `Plan Semanal` funciona como acceso temporal/semanal hacia esa experiencia;
- dentro del Tema puede existir una sección identificada como `Material del Plan Semanal` o equivalente, organizada por fecha cuando haya más de una incorporación.

Ejemplo inicial:

```text
Plan Semanal
  → Science · Nutrición
      → Material del Plan Semanal
          → Semana 19–26 octubre
             El viaje de la nutrición
```

### 5.2 Material que introduce un Tema nuevo

Si el documento introduce contenido curricular nuevo que merece un Tema propio:

- se crea/incorpora el Tema dentro de su materia siguiendo el estándar curricular vigente;
- `Plan Semanal` referencia ese Tema como acceso de la semana;
- no se mantiene una segunda implementación paralela del mismo contenido.

### 5.3 Actividad o instrucción semanal sin Tema propietario

Si el documento es una actividad puntual, instrucción o ficha que no justifica crear un Tema:

- puede existir únicamente dentro de `Plan Semanal`;
- conserva materia/procedencia cuando puedan identificarse;
- no se fuerza artificialmente su conversión en Tema académico.

---

## 6. Relación con el material oficial de Gaudem

`Plan Semanal` de Academia es una **selección curada**, no un espejo de `https://sites.google.com/gaudem.es/sexto/plan-semanal`.

Por defecto:

- no se incorporan automáticamente todos los documentos detectados;
- el Monitor Gaudem puede ayudar a identificar novedades, pero **la detección no equivale a incorporación**;
- la decisión de incorporar corresponde al Product Owner;
- no se publica una copia del PDF original salvo decisión explícita y justificada;
- la experiencia de Academia se construye a partir del material seleccionado, manteniendo trazabilidad de origen.

---

## 7. Experiencia paper-first cuando el colegio lo pida

Cuando el propio material escolar indique realizar el trabajo en papel/cuaderno, Academia debe respetar esa instrucción.

Patrón recomendado:

> **Haz primero esta actividad en tu cuaderno, como indicó el cole. Después puedes usar Academia para leer, escuchar y comprobar.**

En esos casos:

- Academia no sustituye el trabajo en cuaderno;
- la comprobación puede mostrarse después de que el alumno haya intentado la actividad;
- no es obligatorio convertir el ejercicio en otra prueba digital persistente;
- se evita duplicar evidencia si el Tema ya dispone de Práctica/Prueba académica propia.

---

## 8. Primera aplicación aprobada · Science · Nutrición

### 8.1 Fuente

Archivo aportado por el Product Owner:

`6_PS_ANS_Nutrición.pdf`

Procedencia declarada:

`Colegio Gaudem · Plan Semanal · semana del 19 al 26 de octubre de 2026`

El documento se presenta como `Plan Semana de Science · 6.º E.P. Adaptación no significativa` y declara que trabajará **comprensión lectora y el nuevo tema de Science de la Nutrición**.

### 8.2 Relación con el Tema existente

El documento pertenece al Tema ya publicado:

`6.º → Science → Nutrición`

Por tanto:

- **no se crea otro Tema**;
- **no se crea otra materia**;
- se incorpora como primer `Material del Plan Semanal` asociado a Nutrición;
- también se muestra desde el nuevo acceso transversal `Plan Semanal` de 6.º.

### 8.3 Contenido escolar que debe preservarse

El documento contiene:

1. lectura integrada **`El viaje de la nutrición`**;
2. actividad de **Verdadero o Falso** con corrección de afirmaciones falsas;
3. actividad **A/B/C** de ocho preguntas;
4. actividad de conexión entre partes del cuerpo y los cuatro sistemas.

La lectura integra en una única narración:

- sistema digestivo;
- sistema respiratorio;
- sistema circulatorio;
- sistema excretor.

### 8.4 Instrucción paper-first del colegio

El documento indica explícitamente que las actividades deben realizarse **en papel/cuaderno**, cuidando la presentación y copiando ejercicios y respuestas.

La adaptación en Academia debe conservar esa intención.

Primera propuesta de experiencia aprobada:

```text
📖 El viaje de la nutrición
  lectura clara
  🔊 escuchar

✏️ Actividades del Plan Semanal
  1. Verdadero o Falso
  2. A/B/C
  3. Conectar parte ↔ sistema

Primero en tu cuaderno.
Después: 👀 Comprobar cuando termine
```

La comprobación posterior puede ofrecer respuestas y explicaciones breves, sin convertir esta ficha en una segunda Prueba académica ni duplicar la persistencia del Tema.

---

## 9. UX mínima del acceso transversal

Cada material seleccionado debe mostrar, como mínimo:

- materia cuando sea conocida;
- título o descripción breve;
- semana;
- procedencia escolar;
- acción clara para abrirlo;
- relación con el Tema propietario cuando exista.

Ejemplo:

```text
🔬 Science · Nutrición
📖 El viaje de la nutrición
Lectura + actividades en cuaderno
Abrir actividad →
```

La interfaz debe priorizar la semana actual y mantener semanas anteriores accesibles sin sobrecarga visual.

---

## 10. Fuera de alcance de esta primera versión

No se aprueba por esta decisión:

- sincronización automática con Google Sites;
- incorporación automática de todos los documentos detectados;
- descarga o republicación masiva de PDFs del colegio;
- clasificación automática sin revisión del material seleccionado;
- creación de nuevas colecciones/persistencias si los contratos existentes son suficientes;
- convertir cada documento semanal en Misión o Prueba;
- rehacer los portales de materias o Zonas.

---

## 11. Criterios de aceptación

La primera implementación deberá demostrar que:

1. `Plan Semanal` aparece en 6.º después de `Zonas del cole` y antes de `Recursos del colegio`;
2. solo contiene material seleccionado por el Product Owner;
3. organiza el material por semana;
4. el primer documento corresponde a la semana 19–26 octubre de 2026;
5. el primer documento se identifica como Science · Nutrición;
6. desde Plan Semanal se accede a la experiencia correspondiente sin crear un Tema duplicado;
7. Science → Nutrición conserva la propiedad del contenido y presenta el material semanal asociado;
8. la actividad respeta la instrucción de realizar primero el trabajo en cuaderno;
9. la comprobación posterior no duplica la Práctica/Prueba persistente de Nutrición;
10. responsive, navegación y `Volver` conservan los estándares vigentes.

---

## DECISIÓN

**APROBADO PARA DESARROLLO.**

`Plan Semanal` será un espacio transversal y selectivo de 6.º. El Product Owner elegirá los documentos importantes mediante una instrucción mínima; Academia resolverá su clasificación e integración. La semana organiza el acceso, mientras que la materia y el Tema conservan la propiedad curricular cuando corresponda.

Primera aplicación aprobada: `6_PS_ANS_Nutrición.pdf`, semana escolar **19–26 de octubre de 2026**, conectado con el Tema existente `Science → Nutrición` y con experiencia **paper-first + comprobación posterior**.
