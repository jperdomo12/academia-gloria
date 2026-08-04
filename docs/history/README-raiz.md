# 📚 Documentación Oficial
# Academia Gloria Valentina 🌈

**Ruta oficial:** `docs/README.md`
**Proyecto:** Academia Gloria Valentina
**Versión del proyecto:** 2.3
**Etapa:** II — De aplicación a producto
**Versión del documento:** 2.0
**Estado:** Activo
**Última actualización:** 02/08/2026
**Propietario del proyecto:** Juan Perdomo

---

# 0. Historial de versiones

| Versión | Fecha | Autor / responsable | Cambios |
|---|---:|---|---|
| 2.0 | 02/08/2026 | Juan Perdomo + IA | Evolución del README como puerta de entrada oficial: estructura real de `docs/`, principio SSOT, historial obligatorio, mapa de consulta y actualización a la Etapa II. |
| 1.0 | 22/07/2026 | Juan Perdomo | Primera versión de la organización documental de Academia Gloria. |

---

# 1. Bienvenida

Esta carpeta contiene la documentación oficial de **Academia Gloria Valentina**.

Su propósito es mantener organizado el conocimiento funcional, técnico, pedagógico y estratégico necesario para comprender, mantener y continuar el proyecto.

La documentación forma parte integral de la Academia y evoluciona junto con el código fuente. Sin embargo, no debe frenar el desarrollo ni duplicar información que ya tenga un documento propietario.

Este `README.md` es la **puerta de entrada** a la documentación. Su función principal es orientar:

- qué contiene `docs/`;
- cómo está organizada;
- dónde encontrar cada tipo de información;
- qué documentos deben consultarse primero;
- qué reglas seguimos para mantener la documentación.

Los detalles de cada tema se desarrollan en sus documentos especializados.

---

# 2. Objetivos de la documentación

- Centralizar el conocimiento del proyecto.
- Preservar la continuidad funcional y técnica.
- Documentar decisiones arquitectónicas y de producto.
- Mantener la trazabilidad de los cambios.
- Facilitar el mantenimiento y la evolución.
- Garantizar consistencia entre código, modelos y documentación.
- Servir como referencia para Juan, futuros colaboradores y herramientas de IA.
- Evitar que el conocimiento crítico dependa exclusivamente de conversaciones históricas.
- Permitir que una nueva persona o IA comprenda rápidamente el estado actual de la Academia.

---

# 3. Principios documentales

## 3.1 Single Source of Truth — SSOT

Cada concepto importante debe tener un único documento propietario.

Los demás documentos pueden:

- enlazarlo;
- resumirlo brevemente;
- explicar su relación con otros componentes;

pero no deben copiar ni mantener una segunda versión completa del mismo contenido.

> **Una información importante debe tener una única fuente oficial de verdad.**

## 3.2 Una pregunta por documento

Cada documento debe responder principalmente a una sola pregunta.

Ejemplos:

| Documento | Pregunta principal |
|---|---|
| `README.md` | ¿Dónde está cada tipo de información? |
| `ADN_ACADEMIA_GLORIA.md` | ¿Quiénes somos y por qué existe la Academia? |
| `MASTER_ARCHITECTURE_AND_AI_HANDOFF...md` | ¿Cómo está construida la Academia y cómo continuarla? |
| `MASTER_PLAN...md` | ¿Qué queremos construir y con qué visión global? |
| `PROJECT_MAP...md` | ¿Cómo está organizado el proyecto? |
| `ROADMAP.md` | ¿Qué construiremos después? |
| `DECISION_LOG.md` | ¿Por qué se tomó una decisión? |
| `RELEASE_NOTES.md` | ¿Qué se entregó en cada versión relevante? |
| Documentos de `models/` | ¿Cómo funciona un dominio concreto? |
| Documentos de `standards/` | ¿Cómo debemos construir o mantener una solución? |
| Documentos de `vision/` | ¿Qué visión o experiencia queremos alcanzar? |

## 3.3 Actualizar antes que crear

Antes de crear un documento nuevo se debe comprobar:

1. si el tema ya tiene un documento propietario;
2. si puede actualizarse un documento existente;
3. si el nuevo documento responde a una pregunta realmente distinta;
4. si aporta valor suficiente para justificar su mantenimiento.

## 3.4 La documentación acompaña al producto

El flujo habitual de trabajo es:

```text
Idea o necesidad
        ↓
Análisis breve
        ↓
Decisión
        ↓
Desarrollo
        ↓
Pruebas
        ↓
Ajustes
        ↓
Documentación de la solución consolidada
```

Como regla de colaboración, una idea debe analizarse normalmente en **una a cuatro interacciones**. Una vez tomada la decisión, se pasa a desarrollar y entregar.

No deben mantenerse conversaciones extensas repitiendo un alcance que ya fue aprobado.

## 3.5 Evolucionar, no desechar

La documentación existente debe revisarse con la misma filosofía aplicada al producto:

- conservar lo que sigue siendo válido;
- actualizar lo que quedó desfasado;
- mover lo que pertenece a otro documento;
- eliminar solo duplicidades u obsolescencia confirmada.

---

# 4. Organización actual de `docs/`

La estructura oficial actual es:

```text
docs/
│
├── README.md
│
├── project/
│
├── vision/
│
├── models/
│
└── standards/
```

## 4.1 `project/`

Contiene los documentos de gobierno, arquitectura, continuidad, planificación y evolución general del proyecto.

Responde principalmente a preguntas como:

- ¿qué es la Academia como proyecto?;
- ¿cómo está organizada?;
- ¿hacia dónde va?;
- ¿qué decisiones se tomaron?;
- ¿cómo puede continuarla una nueva persona o IA?;
- ¿qué se ha entregado?

## 4.2 `vision/`

Contiene documentos de visión funcional, pedagógica, narrativa y de experiencia.

Responde principalmente a:

- ¿qué experiencia queremos construir?;
- ¿qué principios deben orientar una funcionalidad?;
- ¿cómo queremos que se sienta el alumno?;
- ¿qué visión futura guía un módulo?

Los documentos de `vision/` no deben confundirse con especificaciones técnicas ni con el estado implementado.

## 4.3 `models/`

Contiene models funcionales, conceptuales y de datos.

Responde principalmente a:

- ¿cómo funciona un dominio?;
- ¿qué estados utiliza?;
- ¿qué relaciones existen?;
- ¿qué datos necesita?;
- ¿cómo se integra con otros módulos?

## 4.4 `standards/`

Contiene estándares, guías y reglas de construcción.

Responde principalmente a:

- ¿cómo debemos desarrollar?;
- ¿qué convenciones debemos respetar?;
- ¿cómo se mantiene la coherencia?;
- ¿qué comportamiento debe conservar un componente compartido?

---

# 5. ¿Dónde encuentro...?

| Si necesitas conocer... | Consulta principal |
|---|---|
| La identidad, filosofía y propósito de la Academia | `project/ADN_ACADEMIA_GLORIA.md` |
| La arquitectura completa y la continuidad mediante IA | `project/MASTER_ARCHITECTURE_AND_AI_HANDOFF_actualizado_v1.1.md` |
| La visión global y planificación estratégica | `project/MASTER_PLAN_v1.1.md` |
| La organización técnica del proyecto | `project/PROJECT_MAP_v1.1.md` |
| La evolución prevista | `project/ROADMAP.md` |
| Las decisiones tomadas y sus motivos | `project/DECISION_LOG.md` |
| Las entregas y novedades publicadas | `project/RELEASE_NOTES.md` |
| La migración de 5.º de Primaria | `project/MIGRACION_5TO.md` |
| El modelo general de misiones | `models/MODELO_MISIONES.md` |
| La integración de misiones con lectura | `models/MODELO_MISIONES_LECTURA.md` |
| El modelo de navegación | `models/MODELO_NAVEGACION.md` |
| El árbol de navegación | `models/ARBOL_NAVEGACION.md` |
| Los roles actuales y futuros | `models/MODELO_ROLES.md` |
| El vocabulario oficial del proyecto | `standards/GLOSARIO.md` |
| Las instrucciones generales para una IA | `standards/IA_SYSTEM_PROMPT.md` |
| La guía global de desarrollo | `standards/GUIA_DESARROLLO_ULTRA_PRO_v2.0_Cloud.md` |
| Los estándares específicos de módulos | `standards/STD-*.md` |
| La visión pedagógica y de experiencia | `vision/` |
| El manifiesto general de la Academia | `vision/00_MANIFIESTO_DE_LA_ACADEMIA_v1.0.md` |
| Los principios pedagógicos | `vision/01_PRINCIPIOS_PEDAGOGICOS_v1.0.md` |
| La visión de Mi Camino | `vision/08_MI_CAMINO_v1.0.md` |
| La visión de Mis Tareas | `vision/09_MIS_TAREAS_v1.0.md` |

> Los nombres exactos deben mantenerse sincronizados con los archivos reales del repositorio.
> Cuando un archivo se renombre, este mapa debe actualizarse.

---

# 6. Ruta de lectura recomendada

## 6.1 Para comprender el proyecto por primera vez

1. `docs/README.md`
2. `docs/project/ADN_ACADEMIA_GLORIA.md`
3. `docs/project/MASTER_ARCHITECTURE_AND_AI_HANDOFF_actualizado_v1.1.md`
4. `docs/project/PROJECT_MAP_v1.1.md`
5. `docs/project/MASTER_PLAN_v1.1.md`
6. `docs/project/ROADMAP.md`

## 6.2 Para continuar un desarrollo concreto

1. Leer este `README.md`.
2. Consultar `MASTER_ARCHITECTURE_AND_AI_HANDOFF...md`.
3. Identificar el modelo correspondiente en `models/`.
4. Revisar el estándar aplicable en `standards/`.
5. Consultar la visión correspondiente en `vision/`, cuando exista.
6. Comparar siempre la documentación con el código actual.
7. Tomar el repositorio desplegado como referencia final cuando exista una discrepancia no resuelta.

## 6.3 Para una nueva IA

La IA debe:

1. leer el documento maestro de arquitectura y continuidad;
2. revisar los archivos actuales del módulo antes de proponer cambios;
3. distinguir entre visión, modelo, estándar y código implementado;
4. no asumir que una función está disponible solo porque aparece en un documento de visión;
5. respetar las decisiones ya consolidadas;
6. desarrollar y entregar una vez aprobado el alcance;
7. actualizar la documentación después de validar la solución.

---

# 7. Convenciones documentales

## 7.1 Cabecera obligatoria

Todo documento oficial debe incluir al principio, como mínimo:

```text
Título
Ruta oficial
Versión del documento
Estado
Última actualización
Autor o responsables
```

Cuando corresponda, también debe incluir:

- versión del proyecto;
- módulo;
- etapa;
- documento sustituido;
- fuentes de autoridad relacionadas.

## 7.2 Historial obligatorio

Todo documento oficial debe incluir un historial de versiones al principio.

Formato recomendado:

```markdown
# Historial de versiones

| Versión | Fecha | Autor / responsable | Cambios |
|---|---:|---|---|
| 1.1 | DD/MM/AAAA | Responsable | Resumen de la actualización. |
| 1.0 | DD/MM/AAAA | Responsable | Primera versión. |
```

El historial debe describir cambios relevantes, no cada corrección tipográfica menor.

## 7.3 Estados documentales

Estados recomendados:

| Estado | Significado |
|---|---|
| `Activo` | Documento vigente y utilizado. |
| `En revisión` | Documento válido, pero pendiente de comprobación o ajuste. |
| `En desarrollo` | Documento todavía no consolidado. |
| `Histórico` | Conservado como referencia, pero no representa el estado actual. |
| `Archivado` | Ya no debe utilizarse como fuente vigente. |

## 7.4 Nombres de archivos

Reglas generales:

- usar mayúsculas y guiones bajos en documentos principales;
- usar nombres descriptivos;
- evitar nombres ambiguos como `documento_final.md`;
- incluir versión en el nombre solo cuando exista una razón operativa;
- no crear copias `final`, `final2`, `nuevo` o `corregido`;
- cuando un documento tenga nombre estable, mantener la versión dentro de su cabecera e historial.

Ejemplos:

```text
ADN_ACADEMIA_GLORIA.md
MODELO_MISIONES.md
STD-011_MIS_TAREAS_Y_MISIONES_v1.0.md
```

## 7.5 Referencias

Usar rutas relativas desde `docs/` siempre que sea posible.

Ejemplo:

```markdown
Consulta [Modelo de Misiones](models/MODELO_MISIONES.md).
```

No copiar contenido completo cuando basta con una referencia.

## 7.6 Actualización por cambio funcional

Una funcionalidad importante debe revisar, cuando aplique:

- modelo funcional;
- estándar;
- documento maestro de arquitectura;
- mapa del proyecto;
- roadmap;
- registro de decisiones;
- notas de versión;
- README, únicamente si cambia la organización o la ruta de consulta.

No todos los cambios requieren actualizar todos los documentos.

## 7.7 Código frente a documentación

Cuando exista una discrepancia:

1. comprobar la rama y versión actuales;
2. verificar el comportamiento desplegado;
3. confirmar si el código representa una decisión consolidada;
4. corregir la documentación;
5. registrar la decisión si cambia arquitectura o comportamiento importante.

La documentación no debe declarar como implementado algo que solo existe como visión o propuesta.

---

# 8. Estado actual de la documentación

La documentación se encuentra activa y en proceso de consolidación para la **Etapa II**.

Estado general:

| Área | Estado |
|---|---|
| Organización principal de `docs/` | Consolidada |
| Documento maestro de arquitectura y continuidad | Actualizado; requiere mantener el nombre/versionado sincronizado |
| README principal | Actualizado a versión 2.0 |
| Modelos principales | Disponibles |
| Estándares principales | Disponibles; revisión progresiva |
| Documentos de visión | Disponibles |
| Revisión de duplicidades | Pendiente |
| Normalización completa de nombres | Pendiente |
| Historial en todos los documentos | En implantación |

La actualización documental debe continuar de forma gradual y orientada al valor.

No se pretende reescribir todos los documentos indiscriminadamente.

---

# 9. Próximos pasos documentales

Orden recomendado:

1. Certificar este `README.md` como versión oficial.
2. Crear o consolidar el estándar documental en `standards/`.
3. Revisar `PROJECT_MAP_v1.1.md`.
4. Revisar `MASTER_PLAN_v1.1.md`.
5. Revisar `ROADMAP.md`.
6. Consolidar el nombre oficial del documento maestro de arquitectura y continuidad.
7. Revisar duplicidades en `project/`.
8. Revisar solapamientos entre guías y estándares.
9. Incorporar historial a los documentos que todavía no lo tengan.
10. Actualizar `RELEASE_NOTES.md` con las versiones funcionales recientes.

---

# 10. Cierre

Este documento es la puerta de entrada a la documentación oficial de Academia Gloria Valentina.

El `README.md` orienta. Los documentos especializados explican.

> **La documentación debe preservar el conocimiento, facilitar la evolución y acompañar al producto sin frenar su desarrollo.**

---

**Academia Gloria Valentina 🌈**

*Construyendo una Academia que crece junto con cada alumno.*
