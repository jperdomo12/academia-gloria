# 🌈 Academia de Gloria Valentina

> **“Aprender puede ser bonito.”**

![Estado](https://img.shields.io/badge/Estado-En%20desarrollo-success)
![Firebase](https://img.shields.io/badge/Firebase-Activo-orange)
![Firestore](https://img.shields.io/badge/Firestore-Sincronizado-brightgreen)
![Arquitectura](https://img.shields.io/badge/Arquitectura-Multi--Persona-blue)

---

## 📝 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---|---|---|
| 2.3 | 06/09/2026 | Product Owner + AI Collaborator | Sincroniza la puerta de entrada con el producto real: incorpora `baul/`, `bitacora/`, `herramientas/`, 6.º activo por Temas reales, Gestión de Misiones/Análisis/Recompensas, observación administrativa minimizada de accesos, Bitácora de Acompañamiento V1 y la fase de uso prioritario. |
| 2.2 | 13/08/2026 | Product Owner + AI Collaborator | Actualiza el README como puerta de entrada al producto; separa claramente producto y documentación; incorpora arquitectura Multi-Persona, Persona Activa, Gestión de Usuarios y ruta mínima de incorporación al proyecto. |
| 2.1 | 13/08/2026 | Product Owner + AI Collaborator | Actualización de arquitectura y estado del producto. |
| 2.0 | Anterior | Proyecto Academia | README Cloud inicial. |

---

# 📖 ¿Qué es?

La **Academia de Gloria Valentina** es una plataforma educativa digital creada para acompañar el desarrollo académico, personal y emocional del alumnado.

Nació como apoyo para Gloria durante **5.º de Primaria** y ha evolucionado hacia una Academia modular con contenidos educativos, espacios personales, calendario, Misiones, evidencia, análisis prudente, motivación y colaboración familiar/profesional.

La experiencia mantiene especialmente presentes las necesidades asociadas al **Trastorno del Desarrollo del Lenguaje (TDL/TEL)**, priorizando:

- aprendizaje visual;
- motivación;
- autonomía;
- organización del pensamiento;
- autoestima;
- acompañamiento respetuoso del error.

La Academia no sustituye al colegio ni a los profesionales. Complementa ese trabajo mediante recursos digitales visuales, interactivos y motivadores.

---

# ❤️ Filosofía

La Academia parte de principios sencillos:

- Aprender puede ser bonito.
- Cada alumna o alumno aprende a su propio ritmo.
- La motivación es tan importante como el contenido.
- Equivocarse forma parte del aprendizaje.
- La creatividad merece espacio junto a las asignaturas.
- Cada avance merece ser reconocido.
- La tecnología debe simplificar el aprendizaje, no complicarlo.
- Los datos sirven para acompañar mejor, no para etiquetar.

---

# 🧭 Arquitectura funcional actual

La Academia separa claramente la identidad autenticada del contexto funcional de trabajo.

```text
Usuario autenticado
       │
       ▼
Persona conectada
       │
       ├── puede trabajar sobre sí misma
       │
       └── puede tener acceso autorizado a otra Persona
                    │
                    ▼
              Persona Activa
```

Conceptos principales:

- **Usuario**: identidad técnica que accede mediante Firebase Authentication.
- **Persona conectada**: Persona asociada al Usuario autenticado.
- **Persona Activa**: Persona sobre la que opera funcionalmente la pantalla.
- **Rol**: determina el nivel máximo de acceso del Usuario.
- **Relación**: autoriza el acceso a otra Persona y puede limitar dicho nivel.
- **Administración**: permite gestionar Usuarios, Personas, Roles asignados, Relaciones y observación administrativa minimizada de accesos.

Cuando Persona Activa es distinta de Persona conectada, la interfaz muestra el contexto de forma visible.

---

# 🎓 Módulos principales

## 🌅 Mi Camino

Espacio personal de Misiones, recorrido y crecimiento visible de la Persona Activa.

Incluye integración con Reconocimientos, Guacamayas y consulta de trabajo cuando corresponde.

## ⚙️ Gestión de Misiones

Espacio familiar/administrativo para preparar, asignar, revisar, validar, analizar y cerrar Misiones.

Requiere nivel mínimo `gestion` y se mantiene separado de la experiencia normal del alumno.

## 📅 Mi Calendario

Calendario funcional de la Persona Activa.

Ruta única:

```text
calendarios/
```

No depende de carpetas físicas por Persona ni de `calendarioSlug`.

## 🌈 Mi Universo

Incluye, entre otros:

- Mi Camino;
- Mi Rincón de Lectura;
- Biblioteca Encantada;
- Mi Rincón de Escritura;
- Aventuras Matemáticas;
- Detectives;
- Creciendo por Dentro;
- Gestión de Misiones para usuarios autorizados.

## 🎓 Mis Cursos

Contenidos académicos organizados por curso escolar.

Actualmente:

- **5.º de Primaria**: recursos heredados y utilizables;
- **6.º de Primaria**: base estructural activa con jerarquía `Curso → Asignatura → Tema` y crecimiento mediante material real del colegio.

## 🧠 Análisis Educativo

Consume evidencia real de motores compatibles para describir fortalezas observadas, aspectos a reforzar, evolución y propuestas de actuación con lenguaje prudente.

No emite diagnósticos ni convierte una observación aislada en una etiqueta.

## 🧰 Mi Baúl

Espacio personal para conservar contenidos, ideas y recursos de valor.

Guardar algo en Mi Baúl **no genera Misión, evidencia, estadística ni Recompensa**.

## 🤝 Bitácora de Acompañamiento

Espacio colaborativo V1 sobre Persona Activa para familia y profesionales autorizados.

Permite aportaciones estructuradas con destino y visibilidad separados y, cuando corresponde, una única respuesta.

No es chat y no convierte automáticamente aportaciones humanas en Misiones, evidencias, Análisis Educativo, Recompensas ni inferencias de IA.

## 🛡️ Administración

Incluye Gestión de Usuarios y accesos para perfiles con nivel `administracion`.

La observación administrativa de acceso conserva únicamente información minimizada: fecha/hora y ubicación aproximada ciudad/región/país, con historial limitado a 10 accesos por USER. No persiste IP, GPS, coordenadas ni ISP.

---

# ☁️ Arquitectura técnica

La Academia utiliza una arquitectura web modular apoyada en Firebase:

```text
Interfaz Web
      │
      ▼
Contexto de Usuario / Persona Activa
      │
      ▼
Componentes + APIs compartidas/de dominio
      │
      ├── Firebase Authentication
      └── Cloud Firestore
```

Firebase Authentication gestiona exclusivamente:

- email técnico de autenticación;
- contraseña;
- UID Firebase.

La Academia gestiona funcionalmente:

- login;
- Persona;
- Rol;
- Relaciones;
- Persona Activa;
- datos educativos;
- evidencia y sesiones;
- colaboración;
- auditoría funcional/administrativa.

Las contraseñas **no se almacenan en Firestore**.

---

# 💻 Tecnologías

- HTML5
- CSS3
- JavaScript ES Modules
- Firebase Authentication
- Cloud Firestore
- GitHub Pages
- Git
- GitHub
- Visual Studio Code

La arquitectura actual no utiliza backend propio ni Firebase Functions.

---

# 📂 Organización principal del repositorio

```text
academia-gloria/
│
├── .vscode/
├── adicionales/
├── administracion/
├── assets/
├── baul/
├── bitacora/
├── calendarios/
├── compartido/
├── cursos/
├── descubre-la-academia/
├── docs/
├── herramientas/
├── history/
├── mi-universo/
│
├── index.html
├── login.html
├── AGENTS.md
└── README.md
```

La estructura física evoluciona gradualmente. Para decisiones de implementación debe verificarse siempre el repositorio actual.

---

# 📁 Descripción de las carpetas

| Carpeta | Descripción |
|---|---|
| **.vscode/** | Configuración de apoyo para desarrollo local. |
| **adicionales/** | Lecturas, música, juegos y otros recursos complementarios. |
| **administracion/** | Funcionalidades administrativas, actualmente Gestión de Usuarios. |
| **assets/** | Imágenes, iconos, identidad y otros recursos estáticos compartidos. |
| **baul/** | Mi Baúl V1. |
| **bitacora/** | Bitácora de Acompañamiento V1. |
| **calendarios/** | Calendarios personales/escolares; Persona Activa resuelve el contexto. |
| **compartido/** | Núcleo reutilizable: APIs, Firebase, JS/CSS, componentes y modelos. |
| **cursos/** | Contenido académico organizado por curso/asignatura/tema. |
| **descubre-la-academia/** | Presentación y exploración general de la Academia. |
| **docs/** | Documentación oficial. Punto de entrada: `docs/README.md`. |
| **herramientas/** | Herramientas educativas reutilizables no ligadas a un único Tema. |
| **history/** | Recursos históricos del repositorio; no constituyen fuente vigente. |
| **mi-universo/** | Experiencias personales, aprendizaje, Misiones y Mi Camino. |

Para el mapa físico/propietarios actualizado usar:

```text
docs/project/PROJECT_MAP.md
```

---

# 📖 Documentación oficial

La documentación oficial vive en:

```text
docs/
```

Punto único de entrada:

```text
docs/README.md
```

Contexto específico para IA:

```text
docs/ai/
```

`docs/ai/` es la ruta canónica. No existe una estructura documental activa paralela `docs/ia/`.

El README raíz describe **el producto y su estado general**.

`docs/README.md` describe **la arquitectura y navegación de toda la documentación oficial**.

---

# 🚀 Si eres nuevo en el proyecto

Ruta mínima:

```text
1. README.md
2. docs/README.md
3. docs/FOUNDATION.md
4. docs/DOCUMENTATION_ARCHITECTURE.md
5. docs/DOCUMENTATION_STANDARD.md
6. docs/ai/AI_CHAT_BOOTSTRAP.md
```

Para continuar trabajo reciente, revisar además:

```text
docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md
```

Una persona o IA nueva **no debe asumir que una conversación anterior es fuente de verdad**. Antes de proponer o modificar debe revisar el repositorio y los documentos propietarios del ámbito afectado.

---

# 🚀 Estado actual · 06/09/2026

## Implementado y operativo

- ✅ Firebase Authentication y Cloud Firestore.
- ✅ Academia API + APIs de dominio cuando aplica.
- ✅ USER / PERSON / Roles / Relaciones / Persona Activa.
- ✅ navegación central + cabecera + Panel de Usuario.
- ✅ Mi Camino y Gestión de Misiones V1.
- ✅ evidencia, `Ver trabajo` e históricos de solo lectura.
- ✅ Biblioteca, Rincón de Lectura, Detectives, Creciendo por Dentro y Escritora.
- ✅ Análisis Educativo y refuerzos V1.
- ✅ Recompensas / Reconocimientos / Guacamayas V1.
- ✅ Calendarios y recordatorios al ingreso.
- ✅ Mi Baúl V1.
- ✅ Gestión de Usuarios con accesos recientes minimizados.
- ✅ Bitácora de Acompañamiento V1.
- ✅ portal 6.º + Matemáticas + Tema Fracciones.
- ✅ funcionamiento local y GitHub Pages.

## Fase operativa actual

🌿 **Fase de uso prioritario.**

Durante varias semanas se prioriza:

```text
usar bien lo existente
+ incorporar material real de 6.º
+ observar utilidad y motivación
+ resolver issues reales rápidamente
```

El crecimiento funcional general queda en espera por foco, salvo necesidad real.

La incorporación curricular de 6.º permanece activa y debe poder iniciarse con material del colegio + curso + materia + tema + notas opcionales.

---

# 🎯 Principios de desarrollo

Antes de incorporar una funcionalidad:

- ¿Ayuda realmente al alumnado?
- ¿Hace el aprendizaje más sencillo?
- ¿Puede reutilizarse lo existente?
- ¿Mantiene la Academia clara y fácil de usar?
- ¿Respeta identidad, permisos y Persona Activa?
- ¿Evita duplicar lógica, datos o documentación?
- ¿La necesidad existe ahora o estamos anticipando complejidad?

Si una funcionalidad no aporta suficiente valor, se pospone.

---

# 🌈 Nuestro lema

> **“Aprender puede ser bonito.”**

Cuando exista que elegir entre añadir complejidad o hacer más sencillo el aprendizaje, la Academia prioriza lo segundo.

---

**Academia de Gloria Valentina**  
Madrid · España  
© Juan Perdomo
