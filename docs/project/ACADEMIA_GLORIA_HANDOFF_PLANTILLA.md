# 🔄 Academia Gloria Valentina · HandOff
## Plantilla viva de continuidad

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` |
| **Versión** | 2.0 |
| **Estado** | Activo · Fase de uso prioritario 2026–2027 |
| **Fecha de origen** | 03/09/2026 |
| **Última actualización** | 06/09/2026 |
| **Propietario** | Gobierno y Continuidad del Proyecto |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Continuidad operativa entre chats, personas o IA sin reconstruir conversaciones anteriores |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/ai/AI_CHAT_BOOTSTRAP.md` | **Complementa:** incorporación rápida de un nuevo chat o IA. |
| `docs/ai/AI_COLLABORATION_GUIDE.md` | **Gobierna:** modelo de colaboración Personas + Documentación + IA. |
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** ubicación y responsabilidad del HandOff. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** estructura, mantenimiento, estados y trazabilidad documental. |
| `docs/README.md` | **Orienta:** punto de entrada documental. |
| `docs/project/ROADMAP.md` | **Complementa:** evolución planificada y prioridades de producto. |
| `docs/project/DECISION_LOG.md` | **Complementa:** decisiones transversales estables. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Complementa:** ciclo operativo de construcción y cierre. |
| `docs/specifications/SPEC-BITACORA_ACOMPANAMIENTO.md` | **Define candidato actual:** Bitácora de Acompañamiento V1, pendiente de prueba funcional y merge. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna:** incorporación curricular de 6.º a partir de material escolar real. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** identidad, acceso, Gestión de Usuarios y observación administrativa de accesos con retención limitada. |
| `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md` | **Gobierna:** calidad transversal; desde v2.3 formaliza `Otros` en catálogos cerrados extensibles. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 2.0 | 06/09/2026 | Product Owner + AI Collaborator | Registra la **Bitácora de Acompañamiento V1** como excepción funcional activa motivada por el inicio real de clases y la colaboración con profesionales. Documenta PR #83 Draft, rama `feature/bitacora-acompanamiento-v1`, Rules publicadas en Firebase, especificación `1.0-rc3`, posición de menú aprobada antes de `Descubre la Academia`, regla transversal `Otros` y deja como siguiente paso exacto la prueba funcional del Product Owner. |
| 1.9 | 06/09/2026 | Product Owner + AI Collaborator | Incorpora como pendiente la evaluación de **ChatGPT Work** con el primer caso real de incorporación de material escolar, para comprobar hasta qué punto puede ejecutar autónomamente el proceso completo de preparación para Academia. |
| 1.8 | 05/09/2026 | Product Owner + AI Collaborator | Registra PR #80 aprobado y fusionado: historial administrativo de los **10 accesos más recientes** por USER, bloque plegado `6. Historial de accesos`, botón `Ver / editar`, misma minimización de datos y baseline funcional actualizado a `77c734a5...`. |
| 1.7 | 05/09/2026 | Product Owner + AI Collaborator | Registra PR #78 aprobado y fusionado: **Último acceso a la Academia** + ubicación aproximada ciudad/región/país en Gestión de Usuarios, con minimización de datos, sin GPS ni persistencia de IP. Actualiza el baseline funcional a `9e03c096...` y mantiene intacta la Fase de uso prioritario. |
| 1.6 | 05/09/2026 | Product Owner + AI Collaborator | Sustituye el concepto de “congelación funcional” por **Fase de uso prioritario**. Mantiene en espera el crecimiento funcional general para concentrarse durante varias semanas en uso real, motivación y utilidad efectiva; deja activo el carril de incorporación curricular de 6.º por una sola instrucción; formaliza reporte y resolución rápida de issues reales; añade el arranque preferido de nuevos chats desde GitHub y registra PR #7 como antecedente histórico cerrado sin merge. |
| 1.5 | 04/09/2026 | Product Owner + AI Collaborator | Registró PR #74 aprobado y fusionado, cerró la incidencia visual de Guacamayas y actualizó el baseline funcional. El término “congelación” utilizado en esta versión queda reinterpretado por v1.6 como una decisión de foco de gestión, no como inmovilidad del producto. |
| 1.4 | 04/09/2026 | Product Owner + AI Collaborator | Cerró P0/P1/P2, registró PR #71 aprobado, PR #72 descartado y consolidó pendientes de continuidad. |
| 1.3 | 04/09/2026 | Product Owner + AI Collaborator | Cierre de revisión P2 en 32/32 documentos. |
| 1.2 | 04/09/2026 | Product Owner + AI Collaborator | Registró PR #68 fusionado, cierre de P2-21 a P2-30 y dejó P2-31/P2-32 como último tramo. |
| 1.1 | 04/09/2026 | Product Owner + AI Collaborator | Sincronizó el HandOff con P0/P1 cerrados y P2 en ejecución por lotes. |
| 1.0 | 03/09/2026 | Product Owner + AI Collaborator | Activó la plantilla como mecanismo oficial de continuidad. |

---

## 🎯 1. Propósito

Permitir continuar la Academia Gloria Valentina en otro chat de forma rápida y segura, conservando únicamente el **contexto operativo reciente** que todavía no se deduce con facilidad de las fuentes oficiales.

> **El HandOff orienta; las fuentes propietarias y el producto real gobiernan.**

No sustituye código, estándares, especificaciones, ramas, PR ni comportamiento validado.

---

## 🧭 2. Cómo iniciar o continuar un chat

### 2.1 Procedimiento preferido cuando GitHub está conectado

Abrir un nuevo chat y escribir:

```text
Continuamos el proyecto Academia Gloria Valentina.
Revisa en el repositorio jperdomo12/academia-gloria, rama main, el último
`docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` y sigue el protocolo de
`docs/ai/AI_CHAT_BOOTSTRAP.md`.

Verifica el estado actual en las fuentes propietarias antes de actuar.
No me pidas contexto que ya esté documentado.

Si existe una rama/PR funcional On going registrada en el HandOff,
revísala antes de iniciar trabajo nuevo.

Si el trabajo es incorporación de material escolar real de 6.º, aplica obligatoriamente
`docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` y todos los
estándares relacionados que correspondan.

Pregunta solo si falta información que pueda cambiar materialmente:
- qué debe aprender Gloria;
- el procedimiento exigido por el colegio;
- el nivel de dificultad;
- cómo la van a evaluar;
- una respuesta que deba coincidir exactamente con el material;
- o una decisión arquitectónica nueva no resuelta.

Al terminar la incorporación inicial, dime brevemente que estás listo para continuar.
```

Con GitHub conectado **no es necesario adjuntar manualmente este HandOff** si el nuevo chat puede leerlo directamente del repositorio.

### 2.2 Si GitHub no está disponible

1. proporcionar o adjuntar el último HandOff;
2. indicar brevemente que se continúa desde ese HandOff;
3. proporcionar únicamente las fuentes que el nuevo chat no pueda consultar;
4. no reconstruir conversaciones anteriores si el estado puede resolverse con HandOff + fuentes oficiales.

---

## ⚖️ 3. Regla de autoridad

Antes de modificar o afirmar un estado, verificar según corresponda:

- `main` y rama/PR vigente;
- documento propietario;
- código afectado;
- estándar/especificación;
- comportamiento validado.

Si el HandOff discrepa con el repositorio verificado, prevalece el repositorio.

---

## 🌿 4. Fase de uso prioritario · desde 05/09/2026

La Academia **no está congelada**. El Product Owner ha decidido concentrar durante varias semanas la capacidad del proyecto en **usar bien lo que ya existe**, comprobar que Gloria lo utilice con motivación y que resulte de ayuda efectiva durante el inicio del curso 2026–2027.

La gestión durante esta fase se resume así:

```text
USAR LO EXISTENTE
        +
ALIMENTAR 6.º CON MATERIAL REAL DEL COLEGIO
        +
OBSERVAR UTILIDAD Y MOTIVACIÓN
        +
RESOLVER RÁPIDO LOS ISSUES / NECESIDADES REALES
        ↓
DECIDIR MÁS ADELANTE QUÉ NUEVAS FUNCIONES MERECEN CRECER
```

### 4.1 Qué queda temporalmente en espera

Durante esta fase no se priorizan por iniciativa propia:

- nuevas funcionalidades generales;
- mejoras visuales no motivadas por uso real;
- refactors preventivos;
- ampliaciones de motores;
- cambios de navegación;
- cambios de Recompensas;
- nuevas preferencias o configuraciones no urgentes.

Esto es una **regla de foco**, no una prohibición rígida de evolucionar.

### 4.2 Carril operativo activo · incorporación curricular de 6.º

La incorporación de Temas reales de 6.º **sí permanece activa** y no requiere “descongelar” el producto.

Entrada mínima suficiente:

```text
material del colegio
+ 6.º
+ materia
+ tema
+ notas opcionales
+ “Incorporar a la Academia”
```

Ejemplo:

```text
6.º · Lengua · Acentuación. Incorporar a la Academia.
```

Eso debe ser suficiente para iniciar el trabajo completo.

El propietario normativo es:

`docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`

La AI Collaborator debe aplicar **todos los estándares vigentes que correspondan**, sin delegar al Product Owner rutas, estructura técnica, evidencia, integración, navegación, Persona Activa, Vista previa, histórico, PR o merge.

Solo debe interrumpir cuando falte información que pueda cambiar materialmente:

1. qué debe aprender Gloria;
2. el procedimiento exigido por el colegio;
3. el nivel de dificultad;
4. cómo la van a evaluar;
5. una respuesta que deba coincidir exactamente con el material;
6. una decisión arquitectónica nueva no resuelta.

Cuando no exista uno de esos bloqueos, el flujo esperado es:

```text
material
→ análisis
→ construcción completa
→ validación interna
→ YA PUEDES PROBAR
→ observaciones opcionales / Aprobado
→ auditoría final
→ documentación aplicable
→ PR
→ revisión remota
→ merge a main
→ cierre
```

### 4.3 Carril operativo activo · issues de uso real

Todo issue observado durante el uso real debe **reportarse y verificarse**.

Flujo por defecto:

```text
issue observado
→ reproducir / verificar
→ identificar impacto y propietario
→ corregir con el cambio mínimo suficiente
→ validar
→ cerrar
```

Se resolverá con especial rapidez cuando afecte:

- aprendizaje;
- motivación o posibilidad real de continuar una actividad;
- acceso o navegación necesaria;
- pérdida, corrupción o asociación incorrecta de datos;
- Persona Activa / permisos;
- evidencia o progreso;
- bloqueo del uso escolar.

Un issue real puede justificar una corrección durante esta fase. **No debe convertirse automáticamente en una nueva iniciativa arquitectónica.**

### 4.4 Excepción funcional activa · Bitácora de Acompañamiento V1

La Bitácora fue autorizada por el Product Owner el 06/09/2026 porque responde a una necesidad real inmediata: **incorporar a los profesionales que apoyan la educación/formación de Gloria desde el inicio del curso** y ofrecerles un espacio común para observaciones, recomendaciones, dudas, sugerencias y seguimiento.

Estado actual verificado:

```text
rama: feature/bitacora-acompanamiento-v1
PR: #83 · Draft · NO MERGE todavía
base: main @ 3f560fbd37e16faa955ed5f19b54148f3f77beb9
head candidato: 24f0aacc1bce155e0dbbc7a6803b6b2ed5864af4
especificación: SPEC-BITACORA_ACOMPANAMIENTO.md · 1.0-rc3
Firestore Rules candidatas: publicadas en Firebase por el Product Owner
siguiente paso: prueba funcional del Product Owner
```

Alcance V1 aprobado:

- opción principal `🤝 Bitácora de Acompañamiento`;
- posición de menú: **penúltima opción, inmediatamente después de `Explorar más` y antes de `Descubre la Academia`**;
- opera sobre Persona Activa reutilizando USER / PERSON / USER_ROLE / PERSON_RELATION;
- entradas estructuradas con tipo, título, mensaje, destino y visibilidad separados;
- catálogos cerrados extensibles incluyen `Otros` y requieren especificación cuando corresponde;
- `Otros` de visibilidad es conservador: permanece privado al autor en V1;
- una entrada puede recibir **0 o 1 respuesta estructurada**; no hay chat ni hilos;
- la respuesta hereda exactamente la visibilidad de su entrada;
- alumno solo lee entradas expresamente compartidas con él y no publica/responde en V1;
- entradas publicadas son inmutables y sin eliminación funcional V1;
- no genera Misiones, evidencias, Análisis Educativo, Recompensas ni inferencias de IA.

Regla de seguridad importante:

> **Destino comunica intención; visibilidad gobierna lectura. Una entrada dirigida al alumno no se vuelve visible al alumno salvo que la visibilidad lo incluya expresamente.**

La rama toca únicamente el alcance de Bitácora y fuentes transversales necesarias: pantalla propia, modelo/API propios, navegación central, Rules canónicas, especificación candidata y regla `Otros` en la guía de desarrollo. No modifica motores educativos certificados.

No fusionar PR #83 hasta:

1. prueba funcional controlada;
2. corrección de incidencias reales si aparecen;
3. aprobación del Product Owner;
4. auditoría final;
5. activación/sincronización documental;
6. merge a `main`.

### 4.5 Baseline funcional estable de referencia

```text
main
77c734a5cadd992238cff478eb0b6d619100623e
```

Este baseline funcional incorpora, entre otras entregas cerradas:

- **PR #71**, mejora aprobada de Creciendo por Dentro;
- **PR #74**, ajuste visual mínimo aprobado de `Mis Guacamayas`;
- **PR #78**, Último acceso a la Academia + ubicación aproximada en Gestión de Usuarios;
- **PR #80**, historial limitado de los 10 accesos más recientes + acción `Ver / editar`.

El `main` actual verificado al iniciar la Bitácora es:

```text
3f560fbd37e16faa955ed5f19b54148f3f77beb9
```

Ese HEAD es posterior por cambios no funcionales —incluido el Overview visual— y no altera el baseline funcional de referencia anterior.

La observación administrativa de acceso mantiene la separación USER/PERSON: pertenece al USER autenticado, no a Persona Activa. La ubicación es aproximada por IP y persiste solo ciudad/región/país/código de país; no usa GPS ni conserva IP, coordenadas, ISP o código postal.

El historial de PR #80 conserva como máximo 10 accesos observados, elimina el más antiguo al superar el límite, aparece plegado por defecto y no reconstruye accesos previos que no fueron conservados por la V1.

Antecedentes:

- **PR #72**: cerrado sin merge; no reutilizar su enfoque de observador externo para Guacamayas.
- **PR #7**: cerrado el 05/09/2026 sin merge como **PR histórico/obsoleto**; cualquier necesidad futura de ese dominio debe partir de `main` vigente.

---

## ✅ 5. Estado documental

| Bloque | Estado |
|---|---|
| P0 | ✅ Cerrado |
| P1 | ✅ 15/15 cerrados |
| P2 | ✅ 32/32 cerrados |
| Jornada documental P0 + P1 + P2 | ✅ Cerrada · 04/09/2026 |
| `SPEC-BITACORA_ACOMPANAMIENTO.md` | 🟡 Candidato 1.0-rc3 · pendiente de validación funcional |
| `STD-GUIA_DESARROLLO_ULTRA_PRO.md` | ✅ v2.3 Cloud en rama candidata · regla transversal `Otros` |

`docs/DOCUMENTATION_STANDARD.md` continúa gobernando cualquier evolución documental futura.

---

## ✅ 6. Capacidades cerradas antes y durante la fase de uso prioritario

### Misiones y acompañamiento

- ✅ Creación/preparación de Misiones · Repaso Académico.
- ✅ Comportamiento de Misión libre corregido.
- ✅ Gestión de Misiones V1.
- ✅ Lógica de sugerencias de refuerzo.
- ✅ Reporte de Análisis Educativo V1.
- ✅ Limpieza de datos/evidencias de prueba.
- ✅ Eliminación controlada de Misiones completadas.

### Motivación y crecimiento

- ✅ Recompensas / Reconocimientos V1.
- ✅ `Mis Guacamayas` como historial especializado plegado por defecto en PR #74.
- ✅ `Historia de crecimiento` conserva su lógica e indicador de apertura/cierre.

Principios vigentes: actividad/progreso real, sin rankings, sin comparación con otros y sin pérdida de recompensas.

### Calendarios y curso

- ✅ Recordatorios de Calendario al ingreso: evento del día + evento del día siguiente / un día antes.
- ✅ Portal 6.º de Primaria y Matemáticas preparado para crecimiento por Temas.
- ✅ Contrato de incorporación curricular de una sola instrucción.

### Administración y otros

- ✅ Mi Baúl V1.
- ✅ Gestión de Usuarios con **Último acceso a la Academia** y **Ubicación aproximada del último acceso** · PR #78.
- ✅ Historial administrativo de los **10 accesos más recientes**, plegado por defecto en `Ver / editar` · PR #80.
- ✅ Ubicación minimizada: ciudad/región/país, sin GPS ni persistencia de IP.
- ✅ Plantilla oficial de HandOff.
- ✅ Documentación P0/P1/P2 sincronizada.

**Bitácora de Acompañamiento V1 todavía NO pertenece a este bloque:** está en validación mediante PR #83 Draft.

---

## 🌱 7. Incidencias recientes revisadas y cerradas

### 7.1 Creciendo por Dentro · Misión / práctica libre

Se verificó mediante una Misión de prueba real:

```text
Misión Creciendo por Dentro
→ completar Semilla desde la Misión
→ guardar sesión
→ registrar evidencia
→ objetivo alcanzado
→ ⏳ Esperando a mi familia
```

**PR #71**, probado y aprobado, añade advertencia cuando una Semilla abierta libremente pertenece a una Misión activa y permite continuar la Misión o practicar libremente de forma consciente.

### 7.2 Mi Camino · Guacamaya repetida visualmente

✅ **Cerrado · PR #74 · 04/09/2026**

No existía duplicación de datos; una misma Guacamaya podía aparecer en distintos contextos visuales.

Solución aprobada:

- `Último reconocimiento` permanece sin cambios;
- `🦜 Mis Guacamayas` es historial especializado plegado inicialmente;
- `🌈 Historia de crecimiento` conserva su lógica;
- los bloques se alinean al ancho de referencia;
- no se modificaron datos, Firestore, Misiones ni creación de Recompensas.

Lección: para ajustes menores, modificar el componente propietario con el cambio mínimo; no crear capas externas que observen y reescriban el DOM.

---

## ⏳ 8. Backlog en espera por foco de uso

Estos puntos **siguen vigentes**, pero no se priorizan durante las primeras semanas salvo que el uso real los convierta en una necesidad más urgente.

### 8.1 Velocidad de voz por Persona

**Estado:** ⏳ En espera por foco de uso.

Objetivo futuro:

- preferencia propia de la Persona;
- administrable por adulto/administrador;
- interfaz simple: `Normal / Pausada / Muy pausada`;
- valores técnicos internos, no expuestos al alumno.

### 8.2 Mi Universo · comprensión de preguntas

**Estado:** ⏳ En espera para análisis futuro.

Objetivo pedagógico: ayudar a Gloria a adquirir consistencia en leer, identificar qué se pregunta y responder.

### 8.3 Actividades sugeridas para Gloria desde email

**Estado:** ⏳ En espera para análisis futuro.

Al retomarlo, evitar una pantalla o sistema paralelo por actividad; estudiar integración natural con capacidades existentes.

### 8.4 Creciendo por Dentro · proceso de incorporación de nuevas Semillas

**Estado:** 🟡 Incidencia de proceso / deuda técnica conocida.

Regla para una futura incorporación:

```text
Semilla funcional con icono genérico
→ prueba funcional
→ AI Collaborator indica nombre/ruta de imagen
→ Product Owner crea/publica imagen
→ sustitución
→ prueba visual breve
```

No ampliar nuevas Semillas con el proceso anterior si sigue resultando costoso.

### 8.5 Evaluar ChatGPT Work con incorporación real de material escolar

**Estado:** ⏳ Pendiente.

> **[PENDIENTE] Evaluar ChatGPT Work con el primer caso real de incorporación de material escolar: proporcionar material + materia + tema y comprobar hasta qué punto Work puede ejecutar autónomamente el proceso completo de preparación para Academia.**

Esta evaluación debe realizarse con un caso real del colegio y observar qué partes del flujo vigente puede ejecutar Work de extremo a extremo sin introducir un proceso paralelo ni sustituir las fuentes propietarias de Academia.

---

## 🌿 9. Reglas que no deben perderse

- `docs/DOCUMENTATION_STANDARD.md` gobierna la documentación.
- GitHub `main` es la base canónica integrada.
- Reutilizar antes de crear.
- No crear arquitectura paralela para resolver una mejora menor.
- Persona Activa debe persistir durante navegación interna.
- Vista previa no persiste sesión/evidencia/progreso.
- Históricos y `Ver trabajo` son de solo lectura.
- Misión se completa automáticamente solo cuando existe evidencia fiable; en caso contrario, cierre manual + confirmación + revisión familiar.
- Recompensas reconocen esfuerzo, autonomía, constancia, crecimiento y cooperación; no perfección.
- Datos `🧪` no deben contaminar análisis educativos ni reconocimientos reales.
- Firestore Rules versionadas en GitHub no equivalen a Rules desplegadas en Firebase.
- Los nuevos Temas de 6.º deben aplicar el modo de incorporación curricular de una sola instrucción y producir la evidencia académica exigida por el estándar.
- Issues reales de uso se reportan, verifican y corrigen con prioridad proporcional a su impacto.
- El acceso observado pertenece al USER autenticado y no es evidencia académica ni actividad de Persona Activa.
- La ubicación aproximada de acceso aplica minimización de datos; no interpretar ciudad/región como posición física exacta.
- El historial de acceso conserva como máximo 10 entradas; ampliar esa retención requiere una nueva decisión explícita de producto y privacidad.
- En catálogos cerrados extensibles debe existir `Otros`; cuando sea necesario debe especificarse y nunca puede ampliar permisos/visibilidad de forma ambigua.
- En Bitácora, **destino y visibilidad son distintos** y una respuesta hereda la visibilidad de su entrada.
- No declarar la Bitácora cerrada/implementada en `main` hasta que PR #83 sea probada, aprobada y fusionada.

---

## 🌿 10. Rama / trabajo actual

| Campo | Valor actual |
|---|---|
| **Base canónica integrada** | `main` |
| **HEAD actual de main al iniciar Bitácora** | `3f560fbd37e16faa955ed5f19b54148f3f77beb9` |
| **Baseline funcional cerrado de referencia** | `77c734a5cadd992238cff478eb0b6d619100623e` |
| **Rama funcional On going** | `feature/bitacora-acompanamiento-v1` |
| **PR funcional** | `#83` · Draft · NO MERGE |
| **Head candidato Bitácora** | `24f0aacc1bce155e0dbbc7a6803b6b2ed5864af4` |
| **Especificación candidata** | `SPEC-BITACORA_ACOMPANAMIENTO.md` · `1.0-rc3` |
| **Firestore Rules** | ✅ Publicadas en Firebase para prueba funcional |
| **Estado operativo general** | 🌿 Fase de uso prioritario |
| **Carril curricular 6.º** | ✅ Activo con material escolar real |
| **Issues de uso real** | ✅ Reportar y resolver con rapidez |
| **Prioridad inmediata** | Probar Bitácora V1 sin afectar lo certificado |

---

## ▶️ 11. Siguiente paso exacto

### 11.1 Continuación inmediata · Bitácora de Acompañamiento V1

En el siguiente chat:

```text
1. Revisar este HandOff.
2. Verificar PR #83 y rama feature/bitacora-acompanamiento-v1.
3. Confirmar que el head candidato no cambió inesperadamente.
4. Solicitar al Product Owner cambiar localmente a la rama y Fetch/Pull solo cuando sea momento de probar.
5. Ejecutar prueba funcional controlada.
6. Corregir únicamente incidencias reales encontradas.
7. Tras aprobación: auditoría final + activar SPEC 1.0 + sincronizar navegación/HandOff/Roadmap/Release Notes que correspondan + merge.
```

Casos mínimos de prueba:

```text
A. Profesional/familiar relacionado → Persona Activa Gloria → crear entrada adultos/profesionales → otro adulto la ve y responde.
B. Gloria → no ve la entrada anterior.
C. Entrada con visibilidad Alumno + familia + profesionales → Gloria sí la ve; si tiene respuesta, también la ve.
D. Otros en Tipo/Destino/Visibilidad → exige especificación; Otros de visibilidad permanece privado.
E. Autor no puede auto-responder; segunda respuesta no existe.
F. Bitácora aparece inmediatamente antes de Descubre la Academia.
G. Navegación, Persona Activa y módulos existentes siguen funcionando sin regresiones.
```

### 11.2 Cuando llegue material escolar

La familia debe poder limitarse a:

```text
6.º · Materia · Tema. Incorporar a la Academia.
+ material del colegio
+ notas opcionales
```

La AI Collaborator realiza el resto aplicando las fuentes propietarias y todos los estándares correspondientes.

### 11.3 Cuando aparezca un issue

La familia lo reporta de forma natural, idealmente con captura o pasos si los tiene. La AI Collaborator verifica antes de asumir la causa y propone/aplica la corrección mínima suficiente.

### 11.4 Nuevas funcionalidades generales

Mantener la Fase de uso prioritario y no iniciar otras capacidades generales mientras Bitácora V1 esté On going, salvo necesidad clara surgida del colegio, de Gloria o de la familia.

---

# 🟣 Última actualización / On going — 06/09/2026

## Qué acabamos de cerrar

- PR #80 aprobado y fusionado: historial de los 10 accesos más recientes + `Ver / editar` en Gestión de Usuarios.
- PR #78 aprobado y fusionado: Último acceso a la Academia + ubicación aproximada minimizada en Gestión de Usuarios.
- Jornada documental P0 + P1 + P2.
- PR #71 aprobado y fusionado.
- PR #72 descartado y no fusionado.
- PR #74 aprobado y fusionado.
- PR #7 cerrado sin merge como antecedente histórico/obsoleto.
- Mi Baúl V1 cerrado.
- Mecanismo oficial de HandOff activo.
- Overview visual de Academia incorporado a `docs/project/ACADEMIA_GLORIA-VALENTINA_OVERVIEW.png` en `main`.

## Qué estamos trabajando ahora

> **🤝 Bitácora de Acompañamiento V1 · PR #83 Draft · pendiente de prueba funcional.**

Completado antes del cambio de chat:

- concepto funcional aprobado;
- diseño y construcción V1 realizados en rama aislada;
- auditoría estática y endurecimiento de seguridad realizados;
- `Otros` formalizado como regla transversal en la guía de desarrollo candidata;
- Firestore Rules candidatas publicadas en Firebase por el Product Owner;
- respuesta única y herencia de visibilidad documentadas/advertidas;
- posición de menú ajustada: después de `Explorar más`, antes de `Descubre la Academia`;
- especificación sincronizada a `1.0-rc3`;
- `main` no contiene todavía la Bitácora.

**Próximo paso exacto:** prueba funcional del Product Owner sobre la rama candidata. No fusionar antes de esa prueba y aprobación.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 2.0 |
| **Estado operativo** | 🌿 Fase de uso prioritario desde 05/09/2026 |
| **Baseline funcional cerrado** | `77c734a5cadd992238cff478eb0b6d619100623e` |
| **HEAD main verificado al iniciar Bitácora** | `3f560fbd37e16faa955ed5f19b54148f3f77beb9` |
| **Trabajo On going** | 🤝 Bitácora de Acompañamiento V1 · PR #83 Draft |
| **Head candidato** | `24f0aacc1bce155e0dbbc7a6803b6b2ed5864af4` |
| **Siguiente paso** | Prueba funcional controlada del Product Owner |
| **Crecimiento curricular 6.º** | ✅ Activo durante la fase |
| **Issues reales** | ✅ Reportar → verificar → corregir con rapidez |
| **Crecimiento funcional general** | ⏸️ En espera por foco de uso, salvo necesidad real |
| **Mecanismo de continuidad** | GitHub `main` + HandOff + rama/PR On going + Bootstrap + verificación dirigida de fuentes |
| **Autoridad sobre estado implementado** | Repositorio y fuentes propietarias verificadas |