# 🔄 Academia Gloria Valentina · HandOff
## Plantilla viva de continuidad

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` |
| **Versión** | 2.1 |
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
| `docs/README.md` | **Orienta:** punto de entrada documental y ruta canónica `docs/ai/`. |
| `docs/project/ROADMAP.md` | **Complementa:** evolución planificada y prioridades de producto. |
| `docs/project/DECISION_LOG.md` | **Complementa:** decisiones transversales estables. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Complementa:** ciclo operativo de construcción y cierre. |
| `docs/specifications/SPEC-BITACORA_ACOMPANAMIENTO.md` | **Define:** Bitácora de Acompañamiento V1 activa. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna:** incorporación curricular de 6.º a partir de material escolar real. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** identidad, acceso, Gestión de Usuarios y observación administrativa de accesos con retención limitada. |
| `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md` | **Gobierna:** calidad transversal y catálogos cerrados extensibles con `Otros`. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 2.1 | 06/09/2026 | Product Owner + AI Collaborator | Cierra la excepción Bitácora de Acompañamiento V1: PR #83 y corrección PR #85 fusionados, SPEC activa 1.0, Rules publicadas/validadas, menú de un solo nivel y baseline funcional actualizado a `58cab370...`. Elimina instrucciones obsoletas de prueba/merge y deja como estado operativo real la fase de uso prioritario sin trabajo funcional On going. |
| 2.0 | 06/09/2026 | Product Owner + AI Collaborator | Registró la Bitácora de Acompañamiento V1 como excepción funcional activa en validación. Su estado queda sustituido por v2.1 tras la prueba y merge. |
| 1.9 | 06/09/2026 | Product Owner + AI Collaborator | Incorpora como pendiente la evaluación de **ChatGPT Work** con el primer caso real de incorporación de material escolar, para comprobar hasta qué punto puede ejecutar autónomamente el proceso completo de preparación para Academia. |
| 1.8 | 05/09/2026 | Product Owner + AI Collaborator | Registra PR #80 aprobado y fusionado: historial administrativo de los **10 accesos más recientes** por USER, bloque plegado `6. Historial de accesos`, botón `Ver / editar`, misma minimización de datos y baseline funcional actualizado a `77c734a5...`. |
| 1.7 | 05/09/2026 | Product Owner + AI Collaborator | Registra PR #78 aprobado y fusionado: **Último acceso a la Academia** + ubicación aproximada ciudad/región/país en Gestión de Usuarios, con minimización de datos, sin GPS ni persistencia de IP. |
| 1.6 | 05/09/2026 | Product Owner + AI Collaborator | Sustituye el concepto de “congelación funcional” por **Fase de uso prioritario**. Mantiene en espera el crecimiento funcional general, deja activo el carril curricular de 6.º y formaliza resolución rápida de issues reales. |
| 1.5 | 04/09/2026 | Product Owner + AI Collaborator | Registró PR #74 aprobado y fusionado y cerró la incidencia visual de Guacamayas. |
| 1.4 | 04/09/2026 | Product Owner + AI Collaborator | Cerró P0/P1/P2, registró PR #71 aprobado, PR #72 descartado y consolidó pendientes de continuidad. |
| 1.3 | 04/09/2026 | Product Owner + AI Collaborator | Cierre de revisión P2 en 32/32 documentos. |
| 1.2 | 04/09/2026 | Product Owner + AI Collaborator | Registró PR #68 fusionado y cierre de P2-21 a P2-30. |
| 1.1 | 04/09/2026 | Product Owner + AI Collaborator | Sincronizó el HandOff con P0/P1 cerrados y P2 en ejecución. |
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

### 2.3 Ruta canónica de IA

La documentación de contexto para IA vive en:

```text
docs/ai/
```

No existe una estructura activa paralela `docs/ia/`. Si una instrucción externa utiliza `docs/ia/`, corregir/interpretar la referencia hacia `docs/ai/` y no crear una carpeta duplicada.

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

La Academia **no está congelada**. El foco durante varias semanas es **usar bien lo que ya existe**, comprobar que Gloria lo utilice con motivación y que resulte de ayuda efectiva durante el inicio del curso 2026–2027.

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

### 4.1 En espera por foco

No priorizar por iniciativa propia:

- nuevas funcionalidades generales;
- mejoras visuales no motivadas por uso real;
- refactors preventivos;
- ampliaciones de motores;
- cambios de navegación;
- cambios de Recompensas;
- nuevas preferencias/configuraciones no urgentes.

Esto es una regla de foco, no una prohibición rígida.

### 4.2 Carril activo · incorporación curricular de 6.º

Entrada mínima suficiente:

```text
material del colegio
+ 6.º
+ materia
+ tema
+ notas opcionales
+ “Incorporar a la Academia”
```

Propietario normativo:

`docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`

La AI Collaborator resuelve rutas, estructura, evidencia, integración, navegación, Persona Activa, Vista previa, histórico, PR y merge.

Solo interrumpir si falta información que pueda cambiar materialmente:

1. qué debe aprender Gloria;
2. procedimiento exigido por el colegio;
3. nivel de dificultad;
4. cómo la evaluarán;
5. una respuesta que deba coincidir exactamente con el material;
6. una decisión arquitectónica nueva no resuelta.

### 4.3 Carril activo · issues de uso real

```text
issue observado
→ reproducir / verificar
→ identificar impacto y propietario
→ corregir con el cambio mínimo suficiente
→ validar
→ cerrar
```

Prioridad alta si afecta aprendizaje, motivación, acceso/navegación necesaria, datos, Persona Activa/permisos, evidencia/progreso o uso escolar.

### 4.4 Excepción funcional cerrada · Bitácora de Acompañamiento V1

La Bitácora fue autorizada el 06/09/2026 por una necesidad inmediata de colaboración con profesionales que acompañan la educación/formación de Gloria.

Estado **cerrado y validado**:

```text
PR #83 · fusionado
PR #85 · fusionado
SPEC-BITACORA_ACOMPANAMIENTO.md · 1.0 Activo
baseline funcional · main @ 58cab370fbf0b8e2191ef29ec4823dcb37b58bd2
Firestore Rules V1 · publicadas en Firebase y validadas en prueba funcional
```

Alcance V1:

- opción principal `🤝 Bitácora de Acompañamiento`, inmediatamente antes de `Descubre la Academia`;
- nodo principal sin hijos → enlace directo de un solo nivel;
- Persona Activa + USER/PERSON/USER_ROLE/PERSON_RELATION;
- entradas estructuradas con tipo, título, mensaje, destino y visibilidad;
- `Otros` en catálogos cerrados extensibles;
- `Otros` de visibilidad permanece privado al autor en V1;
- 0 o 1 respuesta estructurada; no chat ni hilos;
- respuesta hereda la visibilidad de la entrada;
- alumno solo lee entradas expresamente compartidas y no publica/responde en V1;
- entradas publicadas inmutables y sin eliminación funcional;
- no genera Misiones, evidencias, Análisis Educativo, Recompensas ni inferencias de IA.

Regla central:

> **Destino comunica intención; visibilidad gobierna lectura.**

No ampliar Bitácora por iniciativa propia durante la fase actual; primero usar V1 y observar necesidades reales.

### 4.5 Baseline funcional estable

```text
main
58cab370fbf0b8e2191ef29ec4823dcb37b58bd2
```

Incluye entre otras entregas recientes:

- PR #71 · aviso Semilla libre asociada a Misión;
- PR #74 · `Mis Guacamayas` plegado;
- PR #78 · último acceso + ubicación aproximada minimizada;
- PR #80 · historial de los 10 accesos más recientes por USER;
- PR #83 · Bitácora de Acompañamiento V1;
- PR #85 · Bitácora como nodo de menú de un solo nivel.

Un HEAD documental posterior no cambia este baseline funcional.

La observación administrativa de acceso pertenece al USER autenticado, no a Persona Activa. Conserva fecha/hora y ubicación aproximada ciudad/región/país; no GPS, coordenadas, ISP ni IP persistida. El historial conserva máximo 10 accesos.

Antecedentes cerrados:

- PR #72 · cerrado sin merge;
- PR #7 · cerrado sin merge como histórico/obsoleto.

---

## ✅ 5. Estado documental

| Bloque | Estado |
|---|---|
| P0 | ✅ Cerrado |
| P1 | ✅ 15/15 cerrados |
| P2 | ✅ 32/32 cerrados |
| Jornada documental P0 + P1 + P2 | ✅ Cerrada · 04/09/2026 |
| Estabilización documental posterior a Bitácora | ✅ Ejecutada 06/09/2026 |
| `SPEC-BITACORA_ACOMPANAMIENTO.md` | ✅ 1.0 Activo |
| Ruta canónica IA | ✅ `docs/ai/` |

`docs/DOCUMENTATION_STANDARD.md` continúa gobernando cualquier evolución documental futura.

La estabilización del 06/09 no reabre P0/P1/P2; sincroniza únicamente fuentes afectadas por entregas posteriores.

---

## ✅ 6. Capacidades cerradas relevantes

### Misiones y acompañamiento

- ✅ Creación/preparación de Misiones · Repaso Académico.
- ✅ Misión libre.
- ✅ Gestión de Misiones V1.
- ✅ Refuerzos.
- ✅ Análisis Educativo V1.
- ✅ Limpieza de datos/evidencias de prueba.
- ✅ Eliminación controlada de Misiones completadas.

### Motivación

- ✅ Recompensas / Reconocimientos V1.
- ✅ `Mis Guacamayas` como historial plegado.
- ✅ `Historia de crecimiento` preservada.

### Calendarios y curso

- ✅ Recordatorios al ingreso.
- ✅ Portal 6.º + Matemáticas.
- ✅ Incorporación curricular por una sola instrucción.

### Administración, colaboración y memoria

- ✅ Mi Baúl V1.
- ✅ Gestión de Usuarios con último acceso + ubicación aproximada.
- ✅ Historial de 10 accesos recientes.
- ✅ Bitácora de Acompañamiento V1.
- ✅ HandOff + Bootstrap.
- ✅ Documentación P0/P1/P2 consolidada.

---

## ⏳ 7. Backlog en espera por foco de uso

### 7.1 Velocidad de voz por Persona

**Estado:** ⏳ En espera.

Objetivo futuro: `Normal / Pausada / Muy pausada`, administrable por adulto/administrador y resuelto mediante un único mecanismo compartido.

### 7.2 Mi Universo · comprensión de preguntas

**Estado:** ⏳ En espera.

Objetivo: ayudar a Gloria a leer, identificar qué se pregunta y responder con mayor consistencia.

### 7.3 Actividades sugeridas para Gloria desde email

**Estado:** ⏳ En espera.

Al retomarlo, evitar una pantalla/sistema paralelo por actividad; integrar con capacidades existentes cuando sea posible.

### 7.4 Creciendo por Dentro · proceso de nuevas Semillas

**Estado:** 🟡 Deuda de proceso conocida.

```text
Semilla funcional + icono genérico
→ prueba funcional
→ definir nombre/ruta de imagen
→ crear/publicar imagen
→ sustitución
→ prueba visual breve
```

### 7.5 Evaluar ChatGPT Work con material escolar real

**Estado:** ⏳ Pendiente.

Evaluar con el primer caso real de incorporación escolar hasta qué punto Work puede ejecutar autónomamente el proceso completo, sin crear un proceso paralelo ni sustituir fuentes propietarias.

---

## 🌿 8. Reglas que no deben perderse

- GitHub `main` es la base canónica integrada.
- `docs/DOCUMENTATION_STANDARD.md` gobierna la documentación.
- `docs/ai/` es la ruta canónica para contexto de IA; no crear `docs/ia/`.
- Reutilizar antes de crear.
- No crear arquitectura paralela para una mejora menor.
- Persona Activa persiste durante navegación interna.
- Vista previa no persiste sesión/evidencia/progreso.
- Históricos y `Ver trabajo` son de solo lectura.
- Cierre automático de Misión solo con evidencia fiable; si no, cierre manual + revisión familiar.
- Recompensas reconocen progreso real; no rankings, comparación ni pérdida.
- Datos `🧪` no contaminan análisis ni reconocimientos.
- Firestore Rules en Git ≠ Rules desplegadas en Firebase.
- Nuevos Temas de 6.º aplican el estándar curricular y producen evidencia cuando corresponde.
- Issues reales se verifican y corrigen con prioridad proporcional.
- Acceso observado pertenece al USER autenticado y no es evidencia académica.
- Ubicación aproximada no representa posición física exacta y no persiste IP/GPS.
- Historial de acceso máximo 10; ampliar requiere decisión explícita.
- Catálogos cerrados extensibles incluyen `Otros` cuando corresponde.
- En Bitácora, destino y visibilidad son distintos; la respuesta hereda visibilidad.
- Un nodo principal de menú sin hijos se representa como enlace directo; no crear segundo nivel artificial.

---

## 🌿 9. Estado operativo actual

| Campo | Valor actual |
|---|---|
| **Base canónica integrada** | `main` |
| **Baseline funcional cerrado** | `58cab370fbf0b8e2191ef29ec4823dcb37b58bd2` |
| **Rama funcional On going** | Ninguna registrada |
| **PR funcional On going** | Ninguna registrada |
| **Bitácora V1** | ✅ Cerrada · PR #83/#85 |
| **Especificación Bitácora** | ✅ `1.0` Activo |
| **Estado operativo general** | 🌿 Fase de uso prioritario |
| **Carril curricular 6.º** | ✅ Activo con material escolar real |
| **Issues de uso real** | ✅ Reportar y resolver con rapidez |
| **Crecimiento funcional general** | ⏸️ En espera por foco, salvo necesidad real |

---

## ▶️ 10. Siguiente paso exacto

No existe una iniciativa funcional On going que deba retomarse antes de usar la Academia.

La secuencia preferida es:

```text
1. Usar la Academia con Gloria y profesionales autorizados.
2. Incorporar material real de 6.º cuando llegue.
3. Usar Bitácora V1 cuando aporte valor y observar si cubre la necesidad.
4. Reportar cualquier issue real.
5. No iniciar nuevas funciones generales por iniciativa propia durante la fase de foco.
```

### 10.1 Cuando llegue material escolar

La familia puede limitarse a:

```text
6.º · Materia · Tema. Incorporar a la Academia.
+ material del colegio
+ notas opcionales
```

La AI Collaborator realiza el resto aplicando las fuentes propietarias y estándares correspondientes.

### 10.2 Cuando aparezca un issue

Reportarlo de forma natural, idealmente con captura o pasos si se tienen. La AI Collaborator verifica antes de asumir la causa y aplica la corrección mínima suficiente.

### 10.3 Bitácora

Usar V1 tal como está. Cualquier ampliación debe justificarse por una necesidad observada y partir de `SPEC-BITACORA_ACOMPANAMIENTO.md` activa.

---

# 🟣 Última actualización — 06/09/2026

## Cerrado recientemente

- PR #78 · último acceso + ubicación aproximada minimizada.
- PR #80 · historial de 10 accesos recientes.
- PR #83 · Bitácora de Acompañamiento V1.
- PR #85 · Bitácora como opción de menú de un solo nivel.
- SPEC Bitácora activada como 1.0.
- Jornada documental P0/P1/P2 cerrada.
- Estabilización documental posterior ejecutada.

## Trabajo funcional On going

> **Ninguno.**

El proyecto vuelve a su foco normal de uso prioritario, incorporación curricular real e issues.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 2.1 |
| **Estado operativo** | 🌿 Fase de uso prioritario desde 05/09/2026 |
| **Baseline funcional cerrado** | `58cab370fbf0b8e2191ef29ec4823dcb37b58bd2` |
| **Trabajo funcional On going** | Ninguno |
| **Siguiente paso** | Uso real + material de 6.º + issues según aparezcan |
| **Crecimiento curricular 6.º** | ✅ Activo durante la fase |
| **Issues reales** | ✅ Reportar → verificar → corregir con rapidez |
| **Crecimiento funcional general** | ⏸️ En espera por foco de uso, salvo necesidad real |
| **Mecanismo de continuidad** | GitHub `main` + HandOff + Bootstrap + verificación dirigida de fuentes |
| **Autoridad sobre estado implementado** | Repositorio y fuentes propietarias verificadas |
