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
| 2.2 | 13/08/2026 | Product Owner + AI Collaborator | Actualiza el README como puerta de entrada al producto; separa claramente producto y documentación; incorpora arquitectura Multi-Persona, Persona Activa, Gestión de Usuarios y ruta mínima de incorporación al proyecto. |
| 2.1 | 13/08/2026 | Product Owner + AI Collaborator | Actualización de arquitectura y estado del producto. |
| 2.0 | Anterior | Proyecto Academia | README Cloud inicial. |

---

# 📖 ¿Qué es?

La **Academia de Gloria Valentina** es una plataforma educativa digital creada para acompañar el desarrollo académico, personal y emocional del alumnado.

Nació inicialmente como apoyo para Gloria durante **5.º de Primaria** y ha evolucionado hacia una Academia modular con contenidos educativos, espacios personales, calendario, misiones, seguimiento y colaboración familiar/profesional.

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
- **Administración**: permite gestionar Usuarios, Personas, Roles asignados y Relaciones.

Cuando la Persona Activa es distinta de la Persona conectada, la interfaz muestra el contexto de forma visible.

---

# 🎓 Módulos principales

## 🌅 Mi Camino

Espacio de misiones y tareas de la Persona Activa.

## 📅 Mi Calendario

Calendario funcional de la Persona Activa.

La ruta actual es única:

```text
calendarios/
```

No depende de carpetas físicas por Persona ni de `calendarioSlug`.

## 🌈 Mi Universo

Incluye, entre otros:

- Mi Rincón de Lectura;
- Biblioteca Encantada;
- Mi Rincón de Escritura;
- Aventuras Matemáticas;
- Detectives;
- Historial de Detectives;
- Creciendo por Dentro;
- Gestión de Misiones.

## 🎓 Mis Cursos

Contenidos académicos organizados por curso escolar.

Actualmente:

- 5.º de Primaria;
- 6.º de Primaria en preparación/evolución.

## 🛡️ Administración

Incluye la Gestión de Usuarios y accesos para perfiles con nivel de administración.

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
Academia API
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
- auditoría funcional.

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
- GitHub Desktop
- Visual Studio Code

La arquitectura actual no utiliza backend propio ni Firebase Functions.

---

# 📂 Organización principal del repositorio

```text
academia-gloria/
│
├── .git/
├── .vscode/
├── adicionales/
├── administracion/
├── assets/
├── calendarios/
├── compartido/
├── cursos/
├── descubre-la-academia/
├── docs/
├── history/
├── mi-universo/
│
├── index.html
├── login.html
└── README.md
```

La estructura física evoluciona gradualmente. Para decisiones de implementación debe verificarse siempre el repositorio actual.

---

# 📁 Descripción de las carpetas

| Carpeta | Descripción |
|---|---|
| **.git/** | Metadatos internos del repositorio Git. |
| **.vscode/** | Configuración de trabajo recomendada para Visual Studio Code. |
| **adicionales/** | Recursos y experiencias complementarias de la Academia. |
| **administracion/** | Funcionalidades administrativas, actualmente incluyendo Gestión de Usuarios. |
| **assets/** | Recursos multimedia y visuales compartidos: imágenes, iconos y otros recursos estáticos. |
| **calendarios/** | Módulo de calendarios personales y escolares. La navegación funcional utiliza una ruta única y el contenido se resuelve según la Persona Activa. |
| **compartido/** | Núcleo reutilizable de la aplicación: API, Firebase, JavaScript común, CSS, componentes, modelos y plantillas. |
| **cursos/** | Contenido académico organizado por curso escolar, incluyendo 5.º de Primaria y la evolución hacia 6.º. |
| **descubre-la-academia/** | Presentación y exploración general de la Academia. |
| **docs/** | Documentación oficial funcional, técnica, de producto, arquitectura, estándares, proyecto e IA. Su punto de entrada es `docs/README.md`. |
| **history/** | Contenido histórico del repositorio conservado como referencia. No constituye fuente de verdad vigente. |
| **mi-universo/** | Espacio personal y creativo: lectura, biblioteca, escritura, aventuras, Creciendo por Dentro y Gestión de Misiones. |

---

# 📖 Documentación oficial

La documentación oficial del proyecto se encuentra en:

```text
docs/
```

Su **punto único de entrada** es:

```text
docs/README.md
```

Ese documento explica:

- cómo está organizada la documentación;
- cuáles son las fuentes de verdad;
- qué documento gobierna cada ámbito;
- la ruta recomendada de lectura;
- la documentación de producto, modelos, especificaciones, estándares, tecnología, proyecto, IA, manuales e histórico;
- cómo incorporarse al proyecto sin depender de conversaciones anteriores.

El `README.md` de la raíz describe **el producto y su estado general**.

`docs/README.md` describe **la arquitectura y navegación de toda la documentación oficial**.

---

# 🚀 Si eres nuevo en el proyecto

La ruta mínima recomendada es:

```text
1. README.md
2. docs/README.md
3. docs/FOUNDATION.md
4. docs/DOCUMENTATION_ARCHITECTURE.md
5. docs/DOCUMENTATION_STANDARD.md
6. docs/ai/AI_CHAT_BOOTSTRAP.md
```

Después de esa lectura inicial, `docs/README.md` indica qué documentación adicional debe consultarse según el módulo o cambio que se vaya a realizar.

Una persona o una IA nueva **no debe asumir que una conversación anterior es fuente de verdad**. Antes de proponer o modificar debe revisar el repositorio actual y los documentos propietarios del ámbito afectado.

---

# 🚀 Estado actual

Implementado y operativo:

- ✅ Firebase Authentication.
- ✅ login funcional separado del email técnico.
- ✅ Cloud Firestore.
- ✅ Academia API compartida.
- ✅ modelo USER / PERSON.
- ✅ Roles y niveles de acceso.
- ✅ Relaciones entre Personas.
- ✅ Persona Activa.
- ✅ acceso relacionado a Mi Camino y Calendario.
- ✅ Gestión de Usuarios.
- ✅ auditoría básica de entidades administrativas.
- ✅ navegación central compartida.
- ✅ funcionamiento local y GitHub Pages.

En evolución:

- 🚧 consolidación y certificación del núcleo compartido;
- 🚧 auditoría e historial de Tareas y Misiones;
- 🚧 preparación de 6.º de Primaria;
- 🚧 seguimiento basado en datos educativos reales;
- 🚧 Logros y Constancia;
- 🚧 evolución de colaboración familiar/profesional.

---

# 🎯 Principios de desarrollo

Antes de incorporar una funcionalidad:

- ¿Ayuda realmente al alumnado?
- ¿Hace el aprendizaje más sencillo?
- ¿Puede reutilizarse?
- ¿Mantiene la Academia clara y fácil de usar?
- ¿Respeta el modelo de identidad, permisos y Persona Activa?
- ¿Evita duplicar lógica ya existente?

Si una funcionalidad no aporta suficiente valor, se pospone.

---

# 🌈 Nuestro lema

> **“Aprender puede ser bonito.”**

Cuando exista que elegir entre añadir complejidad o hacer más sencillo el aprendizaje, la Academia prioriza lo segundo.

---

**Academia de Gloria Valentina**  
Madrid · España  
© Juan Perdomo
