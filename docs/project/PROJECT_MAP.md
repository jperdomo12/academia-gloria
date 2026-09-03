# 🗺️ PROJECT_MAP
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/PROJECT_MAP.md` |
| **Versión** | 2.0 |
| **Estado** | Activo |
| **Fecha** | 23/07/2026 |
| **Última actualización** | 03/09/2026 |
| **Propietario** | Arquitectura del Proyecto |
| **Responsables** | Juan Perdomo + AI Collaborator |
| **Ámbito** | Organización física del repositorio, responsabilidades principales y mapa de fuentes propietarias |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/README.md` | Índice de entrada a la documentación oficial. |
| `docs/DOCUMENTATION_ARCHITECTURE.md` | Gobierna dominios documentales, propiedad y ciclo de vida. |
| `docs/DOCUMENTATION_STANDARD.md` | Gobierna formato, estados, historial y mantenimiento documental. |
| `docs/project/MASTER_PLAN.md` | Resume dirección y grandes frentes del proyecto. |
| `docs/project/ROADMAP.md` | Define prioridades y evolución funcional. |
| `docs/project/RELEASE_NOTES.md` | Registra entregas reales y releases. |
| `AGENTS.md` | Reglas operativas que deben respetar los colaboradores/IA al intervenir el repositorio. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 2.0 | 03/09/2026 | Juan Perdomo + AI Collaborator | Reconstruye el mapa contra la estructura real del repositorio. Elimina directorios históricos que ya no existen (`etapas`, `habilidades`, `OLD`), corrige Calendarios, incorpora `administracion`, `descubre-la-academia`, `herramientas`, `history`, la estructura vigente de `mi-universo`, el curso 6.º, los portales académicos compartidos, Recompensas, Análisis Educativo y el mapa actual de documentación propietaria. |
| 1.1 | 23/07/2026 | Juan Perdomo | Primera actualización del mapa Cloud y responsabilidades generales. |

---

## 🎯 1. Propósito

Este documento responde a dos preguntas operativas:

> **¿Dónde vive cada parte importante de la Academia?**

> **¿Qué documento o componente es propietario de cada responsabilidad?**

No pretende enumerar cada archivo del repositorio. Debe proporcionar un mapa suficientemente preciso para que una persona o IA pueda:

- orientarse antes de modificar código;
- localizar el módulo propietario;
- distinguir producto, infraestructura, contenido y documentación;
- reutilizar antes de crear;
- evitar directorios o subsistemas paralelos;
- identificar qué documentación debe consultarse para cada tipo de cambio.

---

## 🧭 2. Principios del mapa

1. **La estructura real manda.** No se documentan carpetas inexistentes como si siguieran activas.
2. **Una responsabilidad tiene un propietario reconocible.**
3. **Reutilizar antes de crear.** Una nueva necesidad debe buscar primero servicios, componentes, contratos y documentación existentes.
4. **El mapa es orientativo, no una API.** Los contratos funcionales viven en estándares, especificaciones y código propietario.
5. **No duplicar documentación normativa.** Este documento enlaza al propietario; no copia todas sus reglas.
6. **El contenido académico crece dentro de `cursos/` siguiendo `Curso → Asignatura → Tema`.**
7. **La infraestructura compartida vive en `compartido/`; un Tema o módulo no debe recrearla localmente sin justificación.**
8. **Los archivos históricos se distinguen de las fuentes activas.**

---

## 🏠 3. Raíz actual del repositorio

Estructura funcional principal comprobada al 03/09/2026:

```text
academia-gloria/
│
├── index.html
├── login.html
├── README.md
├── AGENTS.md
│
├── .vscode/
├── adicionales/
├── administracion/
├── assets/
├── calendarios/
├── compartido/
├── cursos/
├── descubre-la-academia/
├── docs/
├── herramientas/
├── history/
└── mi-universo/
```

### Responsabilidad por directorio

| Directorio | Responsabilidad actual | Estado |
|---|---|:---:|
| `.vscode/` | Configuración de apoyo para desarrollo local. | ✅ |
| `adicionales/` | Lecturas, música, juegos y otros recursos complementarios. | ✅ |
| `administracion/` | Funciones administrativas; actualmente Gestión de Usuarios. | ✅ |
| `assets/` | Iconos, identidad, personajes e imágenes compartidas. | ✅ |
| `calendarios/` | Entrada a calendarios y calendario escolar. | ✅ |
| `compartido/` | Núcleo técnico, contratos y componentes reutilizables. | ✅ |
| `cursos/` | Contenido curricular por curso/asignatura/tema. | 🚧 Crecimiento activo |
| `descubre-la-academia/` | Experiencia/guía para descubrir la Academia. | ✅ |
| `docs/` | Documentación oficial activa e histórica. | 🚧 Sincronización 03Sep |
| `herramientas/` | Herramientas educativas reutilizables no ligadas a un único Tema. | ✅ |
| `history/` | Recursos técnicos antiguos de prueba conservados fuera de la documentación oficial. | 🗃️ Histórico |
| `mi-universo/` | Experiencias personales, aprendizaje, Misiones y Mi Camino. | ✅ / evolución activa |

> Las carpetas `etapas/`, `habilidades/` y `OLD/` que aparecían en versiones antiguas de este mapa **no forman parte de la estructura actual comprobada**.

---

## 🧱 4. Núcleo compartido · `compartido/`

```text
compartido/
├── api/
├── componentes/
├── config/
├── css/
├── firebase/
├── js/
└── modelos/
```

### 4.1 `compartido/api/`

Fachadas y APIs de dominio compartidas.

Referencias destacadas:

- `academia.js` — fachada principal de operaciones de la Academia;
- `reconocimientos.js` — API cohesionada del dominio de Reconocimientos/Recompensas.

### 4.2 `compartido/componentes/`

Componentes reutilizables de interfaz.

Referencia principal:

- `navegacion-global.js` — cabecera/navegación global.

### 4.3 `compartido/css/`

Estilos compartidos, entre ellos:

- base visual;
- panel de usuario;
- navegación global;
- calendarios;
- celebraciones;
- recordatorios de calendario;
- componentes reutilizables;
- grid compartido de tarjetas cuando aplica.

### 4.4 `compartido/firebase/`

Infraestructura Firebase:

- autenticación;
- configuración;
- acceso a base de datos;
- reglas canónicas de Firestore.

Fuente canónica de reglas:

```text
compartido/firebase/FireStore Rules.txt
```

Los archivos fechados de reglas se consideran referencias históricas, no fuentes canónicas.

### 4.5 `compartido/js/`

Servicios y comportamiento reutilizable.

Referencias especialmente relevantes:

| Archivo | Responsabilidad |
|---|---|
| `contexto-usuario.js` | Usuario, Persona Activa, roles y nivel efectivo de acceso. |
| `auth-guard.js` | Protección de páginas y nivel mínimo de acceso. |
| `navegacion.js` | Navegación y retorno contextual. |
| `panel-usuario.js` | Panel reutilizable de usuario/Persona Activa. |
| `sesiones-academicas.js` | Contrato compartido `sesion-academica-v1`. |
| `detectives-progreso.js` | Persistencia/consulta de progreso y sesiones de Detectives. |
| `recordatorios-calendario-ingreso.js` | Recordatorios de eventos al entrar en la Academia. |
| `trabajo-realizado.js` | Apoyo compartido al acceso de trabajo/evidencias. |
| `lector-texto.js` | Lectura de texto compartida. |

### 4.6 `compartido/modelos/`

Modelos compartidos de entidades/comportamiento transversal.

Referencias:

- `navegacion.js`;
- `evento.js`.

---

## 👤 5. Administración · `administracion/`

```text
administracion/
└── usuarios/
    ├── index.html
    ├── usuarios.css
    └── usuarios.js
```

Responsabilidad actual:

- Gestión de Usuarios;
- relaciones Persona/Usuario/Rol;
- operaciones administrativas autorizadas.

Documentación propietaria principal:

- `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md`;
- `docs/vision/MODELO-USUARIOS_ALUMNOS_Y_ROLES.md`;
- `docs/manuales/MANUAL-GESTION_DE_USUARIOS.md`.

---

## 📅 6. Calendarios · `calendarios/`

```text
calendarios/
├── index.html
└── escolar/
    ├── index.html
    └── 2025-2026.html
```

La lógica y estilos principales se apoyan además en `compartido/js/` y `compartido/css/`.

Capacidad adicional implementada:

```text
Ingreso a Academia
→ Persona Activa
→ revisar eventos HOY / MAÑANA
→ mostrar recordatorio cuando corresponde
```

A 03/09/2026 **no existe una especificación independiente de Recordatorios**. Si el dominio Calendarios crece lo suficiente, su comportamiento deberá consolidarse en un documento propietario de Gestión de Calendarios, evitando un documento aislado para una sola particularidad.

---

## 📘 7. Cursos · `cursos/`

### 7.1 Estructura general

```text
cursos/
├── 5to/
│   ├── ciencias/
│   ├── ingles/
│   ├── lengua/
│   ├── mates/
│   └── sociales/
│
└── 6to/
    ├── index.html
    ├── portal-curso.css
    ├── portal-asignatura.css
    ├── portal-asignatura.js
    └── mates/
```

### 7.2 5.º de Primaria

Contiene recursos heredados y todavía utilizables.

Regla actual:

- no migración masiva;
- pueden seguir utilizándose directamente o mediante Misiones de Repaso Académico;
- se modernizan selectivamente cuando una necesidad real lo justifique.

### 7.3 6.º de Primaria

Es la primera aplicación estructurada del nuevo estándar académico.

Jerarquía canónica:

```text
Academia
→ 6.º de Primaria
→ Asignatura
→ Tema
```

#### Portal del curso

`cursos/6to/index.html`

Contiene:

- bloque prioritario **Así aprendemos en 6.º**;
- navegación por asignaturas;
- patrón visual de tarjetas aprobado.

#### Infraestructura visual de portales

- `portal-curso.css` — portada de 6.º;
- `portal-asignatura.css` — sistema visual de portales de Asignatura;
- `portal-asignatura.js` — renderizador reutilizable de catálogo de Temas.

Patrón de cuadrícula aprobado:

```text
3 columnas · escritorio
2 columnas · tablet
2 columnas · móvil normal/ancho
1 columna   · móvil extremadamente estrecho
```

### 7.4 Matemáticas 6.º

```text
cursos/6to/mates/
├── index.html
├── temas-matematicas.js
├── fracciones/
│   ├── index.html
│   ├── fracciones.css
│   ├── fracciones.js
│   └── fracciones-data.js
├── puente-5to-6to.*
└── piloto-problemas.*
```

#### Tema curricular real

```text
6.º → Matemáticas → Fracciones
```

`temas-matematicas.js` actúa como catálogo real del portal; no deben añadirse Temas ficticios para anticipar el curso.

#### Recursos de apoyo

Puente y otras herramientas matemáticas pueden apoyar al alumno sin confundirse necesariamente con el catálogo de Temas del colegio.

### 7.5 Contrato para nuevos Temas de 6.º

Propietario:

```text
docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md
```

Entrada operativa normal:

```text
material escolar
+ curso
+ materia
+ tema
+ notas opcionales
→ incorporar a la Academia
```

La AI Collaborator decide ubicación, reutiliza estructura, crea lo mínimo necesario, aplica los estándares vigentes y entrega un Tema probado.

Todo nuevo Tema debe producir evidencia académica estructurada y reutilizable por análisis y fortalecimiento durante una ejecución normal.

---

## 🧰 8. Herramientas · `herramientas/`

Actualmente incluye:

```text
herramientas/
└── matematicas/
    └── sentido-operaciones/
```

Una herramienta reusable vive aquí cuando:

- aporta valor a varios Temas o experiencias;
- no representa por sí misma un Tema curricular concreto;
- no debe duplicarse dentro de cada asignatura.

---

## 🌌 9. Mi Universo · `mi-universo/`

Estructura principal:

```text
mi-universo/
├── index.html
├── aventuras-matematicas/
├── biblioteca/
├── creciendo-por-dentro/
├── escritora/
├── mi-camino/
├── mis-tareas/
└── rincon-lectura/
```

### 9.1 Aventuras Matemáticas

```text
aventuras-matematicas/
└── detectives/
```

Detectives dispone de:

- motor de resolución;
- catálogo/historias;
- historial;
- trabajo realizado;
- persistencia de sesiones;
- señales para Análisis Educativo y refuerzo.

Propietarios documentales principales:

- `docs/standards/STD-AVENTURAS_MATEMATICAS.md`;
- `docs/models/MODEL_MOTORES_DE_APRENDIZAJE.md`.

### 9.2 Biblioteca

`mi-universo/biblioteca/`

Experiencia de Biblioteca Encantada y datos relacionados.

### 9.3 Creciendo por Dentro

`mi-universo/creciendo-por-dentro/`

Incluye:

- catálogo de Semillas;
- prácticas;
- sesiones/evidencias;
- grabación opcional;
- integración con Misiones.

Propietario principal:

- `docs/specifications/SPEC-CRECIENDO_POR_DENTRO.md`.

### 9.4 Escritora

`mi-universo/escritora/`

Espacio de expresión/escritura actualmente autocontenido.

### 9.5 Mi Camino

`mi-universo/mi-camino/`

Espacio principal del alumno para:

- Misiones visibles;
- recorrido personal;
- `Así voy creciendo`;
- Reconocimientos/Recompensas;
- Guacamayas;
- constancia;
- consulta de trabajo cuando corresponda.

Archivos destacados:

- `reconocimientos-camino.js/.css`;
- `guia-celebraciones-gloria.js/.css`;
- `mision-libre.js`;
- `mision-finalizacion-manual.css`.

Documentación principal:

- `docs/vision/08_MI_CAMINO.md`;
- `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md`;
- `docs/standards/STD-SEGUIMIENTO_Y_MOTIVACION.md`.

### 9.6 Gestión de Misiones · `mis-tareas/`

Es el espacio familiar/administrativo para preparar, revisar y acompañar Misiones.

Componentes funcionales actuales incluyen:

- `mis-tareas.js/.css` — base de Gestión de Misiones;
- `catalogo-repaso-academico.js` — selección asistida Curso/Materia/Tema/ruta;
- `listado-misiones.js/.css` — filtros/paginación;
- `mision-libre.js` — comportamiento de Misión libre;
- `refuerzos-detectives.js/.css`;
- `refuerzos-academicos.js/.css`;
- `refuerzos-pronunciacion.js/.css`;
- `analisis-educativo.js/.css`;
- `eliminacion-misiones.js`;
- `eliminacion-completadas.js`;
- `datos-prueba-misiones.js`;
- `limpieza-datos-prueba*.js/.css`;
- `reconocimientos-misiones.js/.css`;
- `filtro-recompensas.js`;
- `trabajo-realizado*.js/.css/.html`;
- `resultado-academico.js/.css/.html`.

Documentos propietarios principales:

- `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`;
- `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md`;
- `docs/specifications/SPEC-REVISION_TRABAJO_REALIZADO.md`;
- `docs/specifications/SPEC-ANALISIS_EDUCATIVO.md`.

Acceso funcional mínimo:

```text
nivel = gestion
```

Un alumno con nivel `consulta` no debe disponer de acceso a Gestión de Misiones.

### 9.7 Mi Rincón de Lectura

`mi-universo/rincon-lectura/`

Incluye:

- catálogo de historias;
- lectura;
- análisis de lectura;
- Palabras para Crecer;
- refuerzo de pronunciación;
- sesiones consumibles por Análisis Educativo.

---

## 🎨 10. Assets e identidad · `assets/`

```text
assets/
├── iconos/
├── identidad/
└── imagenes/
```

### Icono oficial

```text
assets/iconos/icono-principal.png
```

Debe utilizarse como favicon oficial de las nuevas páginas funcionales salvo decisión posterior que cambie el estándar.

### Identidad

Incluye:

- Guacamayas;
- personajes;
- imágenes de Mi Camino;
- ilustraciones de Creciendo por Dentro.

Documentación principal:

- `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md`;
- `docs/vision/06_IDENTIDAD_VISUAL_DE_LA_ACADEMIA.md`;
- `docs/vision/07_IDENTIDAD_GUACAMAYAS.md`.

---

## 📚 11. Documentación oficial · `docs/`

Estructura actual principal:

```text
docs/
├── README.md
├── FOUNDATION.md
├── DOCUMENTATION_ARCHITECTURE.md
├── DOCUMENTATION_STANDARD.md
├── CARTA_A_GLORIA.md
│
├── ai/
├── history/
├── manuales/
├── models/
├── product/
├── project/
├── specifications/
├── standards/
├── tech/
└── vision/
```

### 11.1 Raíz documental

| Documento | Responsabilidad |
|---|---|
| `FOUNDATION.md` | Propósito y fundamentos humanos. |
| `DOCUMENTATION_ARCHITECTURE.md` | Arquitectura y propiedad documental. |
| `DOCUMENTATION_STANDARD.md` | Normas de documentación. |
| `README.md` | Índice documental. |
| `CARTA_A_GLORIA.md` | Pieza fundacional/humana dirigida a Gloria. |

### 11.2 `docs/project/`

| Documento | Responsabilidad |
|---|---|
| `MASTER_PLAN.md` | Dirección general y grandes frentes. |
| `ROADMAP.md` | Prioridades/evolución funcional. |
| `PROJECT_MAP.md` | Este mapa físico/propietario. |
| `RELEASE_NOTES.md` | Entregas reales y releases. |
| `DECISION_LOG.md` | Decisiones transversales. |
| `PRODUCT_DEVELOPMENT_WORKFLOW.md` | Flujo de desarrollo de producto. |
| `PROJECT_ROLES.md` | Roles del proyecto. |
| `ADN_ACADEMIA_GLORIA_VALENTINA.md` | ADN/identidad de proyecto. |

### 11.3 `docs/specifications/`

Especificaciones funcionales activas:

- `SPEC-CRECIENDO_POR_DENTRO.md`;
- `SPEC-MIS_TAREAS_Y_MISIONES.md`;
- `SPEC-REVISION_TRABAJO_REALIZADO.md`;
- `SPEC-ANALISIS_EDUCATIVO.md`.

### 11.4 `docs/standards/`

Normas reutilizables del producto, entre ellas:

- contenidos académicos/material escolar;
- Misiones;
- navegación/experiencia según sus propietarios;
- usuarios/roles/accesos;
- motivación/seguimiento;
- Lía;
- datos y atributos;
- guía de desarrollo.

### 11.5 `docs/models/`

Modelos conceptuales, no duplicación normativa.

Incluyen:

- Misiones;
- Navegación;
- Roles;
- Motores de Aprendizaje.

### 11.6 `docs/history/`

Documentación histórica sustituida o preservada por contexto.

No debe utilizarse como fuente normativa cuando existe equivalente activo fuera de `history/`.

---

## 🧠 12. Mapa rápido: necesidad → propietario

| Necesidad | Primer lugar a revisar |
|---|---|
| Propósito humano/pedagógico | `FOUNDATION.md` + `vision/01_PRINCIPIOS_PEDAGOGICOS.md` |
| Crear/modificar documentación | `DOCUMENTATION_STANDARD.md` |
| Decidir dónde documentar | `DOCUMENTATION_ARCHITECTURE.md` |
| Prioridad del proyecto | `project/ROADMAP.md` |
| Qué se entregó realmente | `project/RELEASE_NOTES.md` |
| Estructura del repositorio | `project/PROJECT_MAP.md` |
| Usuarios / Persona Activa / accesos | `STD-USUARIOS_ROLES_Y_ACCESOS.md` + `ContextoUsuario` |
| Navegación / Volver | `MODELO_NAVEGACION.md` + compartidos de navegación |
| Nueva Misión / Gestión de Misiones | `STD-MIS_TAREAS_Y_MISIONES.md` + `SPEC-MIS_TAREAS_Y_MISIONES.md` |
| Revisar trabajo realizado | `SPEC-REVISION_TRABAJO_REALIZADO.md` |
| Reportes/tendencias educativas | `SPEC-ANALISIS_EDUCATIVO.md` |
| Nuevo Tema académico de 6.º | `STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` |
| Evidencia académica | `STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` + `sesiones-academicas.js` |
| Refuerzo desde evidencias | `SPEC-ANALISIS_EDUCATIVO.md` + estándar del motor correspondiente |
| Recompensas / Reconocimientos | `DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` + `reconocimientos.js` |
| Identidad visual | `PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` + assets |
| Firestore Rules | `compartido/firebase/FireStore Rules.txt` |

---

## 🔄 13. Mantenimiento

Actualizar este mapa cuando ocurra alguno de estos cambios:

- aparece/desaparece un directorio raíz relevante;
- se crea un nuevo dominio funcional permanente;
- cambia el propietario de una responsabilidad;
- se crea una nueva familia documental;
- un componente compartido pasa a ser infraestructura central;
- cambia la jerarquía académica principal.

No actualizarlo por:

- cada archivo de contenido;
- cada nueva historia;
- cada commit menor;
- cada Tema si la jerarquía ya lo contempla.

Antes de declarar una ruta como actual debe contrastarse con la estructura real del repositorio.

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estructura activa** | Raíz y dominios comprobados contra el repositorio al 03/09/2026. |
| **Núcleo compartido** | `compartido/` es propietario de infraestructura reutilizable; los módulos no deben recrearla localmente sin causa justificada. |
| **Currículo** | `cursos/` sigue `Curso → Asignatura → Tema`; 6.º es la primera aplicación estructurada del nuevo patrón. |
| **Mi Universo** | Aloja experiencias personales, Misiones, aprendizaje y Mi Camino. |
| **Documentación** | `docs/` contiene las fuentes oficiales; `docs/history/` preserva contexto sustituido. |
| **Principio** | Encontrar propietario → reutilizar → modificar lo mínimo → documentar en la fuente correcta. |
| **Estado** | Activo y sincronizado al 03/09/2026. |

---

**Academia Gloria Valentina 🌈**

*Una arquitectura bien organizada facilita el desarrollo de hoy y el mantenimiento de mañana.*