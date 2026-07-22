# 🌈 Academia de Gloria Valentina

> **"Aprender puede ser bonito."**

![Versión](https://img.shields.io/badge/Versión-2.0%20Cloud-blue)
![Estado](https://img.shields.io/badge/Estado-En%20desarrollo-success)
![Firebase](https://img.shields.io/badge/Firebase-Activo-orange)
![Firestore](https://img.shields.io/badge/Firestore-Sincronizado-brightgreen)

---

# 📖 ¿Qué es?

La **Academia de Gloria Valentina** es una plataforma educativa digital creada para acompañar el desarrollo académico, personal y emocional de Gloria.

Nació inicialmente como un apoyo para reforzar los contenidos escolares de **5º de Primaria** y ha evolucionado hacia un ecosistema digital donde aprender también significa crear, descubrir, imaginar, organizarse y disfrutar.

La Academia está especialmente diseñada teniendo presentes las necesidades de niños con **Trastorno del Desarrollo del Lenguaje (TDL/TEL)**, priorizando siempre:

- aprendizaje visual;
- motivación;
- autonomía;
- organización del pensamiento;
- desarrollo de la autoestima.

Su objetivo no es sustituir el trabajo del colegio ni de los profesionales que acompañan a Gloria, sino complementar ese trabajo desde casa mediante recursos digitales visuales, interactivos y motivadores.

---

# ❤️ Nuestra filosofía

Creemos que:

- Aprender puede ser bonito.
- Cada niño aprende a su propio ritmo.
- La motivación es tan importante como el contenido.
- Equivocarse también forma parte del aprendizaje.
- La creatividad merece tanto espacio como las asignaturas.
- Cada pequeño avance merece ser celebrado.

---

# 📂 Organización del proyecto

```text
academia-gloria/
│
├── index.html
├── login.html
├── README.md
│
├── assets/
├── calendarios/
│   ├── escolar/
│   └── gloria/
│       ├── 2025.html
│       └── 2026.html
├── compartido/
│   ├── api/
│   ├── componentes/
│   ├── css/
│   ├── firebase/
│   ├── js/
│   ├── modelos/
│   └── templates/
├── cursos/
├── mi-universo/
├── habilidades/
├── etapas/
├── adicionales/
├── docs/
├── OLD/
└── .vscode/
```

---

# 📁 Descripción de las carpetas

| Carpeta | Descripción |
|----------|-------------|
| **assets/** | Recursos multimedia compartidos: imágenes, iconos, audio, vídeo y fuentes. |
| **calendarios/** | Calendarios escolares y calendarios personales de Gloria organizados por año. |
| **compartido/** | Núcleo técnico reutilizable: API, Firebase, CSS, JavaScript, componentes, modelos y plantillas. |
| **cursos/** | Contenido académico organizado por curso escolar: 5º, 6º y futuros cursos. |
| **mi-universo/** | Espacio personal y creativo de Gloria: historias, biblioteca, aventuras, recuerdos, logros y proyectos. |
| **habilidades/** | Actividades para fortalecer comprensión, razonamiento, autonomía, organización y habilidades emocionales. |
| **etapas/** | Organización temporal del aprendizaje: verano, preparación de curso, vacaciones y transiciones. |
| **adicionales/** | Juegos, música, lecturas y recursos complementarios. |
| **docs/** | Documentación funcional, técnica, estratégica y de gestión del proyecto. |
| **OLD/** | Contenido histórico conservado como referencia durante la transición entre versiones. |
| **.vscode/** | Configuración recomendada para Visual Studio Code. |

---

# 🎓 Principales módulos

## 📅 Calendarios

La Academia dispone actualmente de:

- Calendario Gloria 2025.
- Calendario Gloria 2026.
- Calendarios escolares organizados por curso académico.
- Sincronización en la nube mediante Cloud Firestore.

## 📚 Mis Cursos

Contenidos académicos organizados por niveles escolares.

Actualmente:

- 5º de Primaria.
- Preparación para 6º de Primaria.
- Estructura preparada para cursos futuros.

## 🌈 Mi Universo

Espacio personal donde Gloria puede crear, imaginar, escribir y conservar sus propios recuerdos.

Incluye progresivamente:

- Gloria Escritora.
- Biblioteca Encantada.
- Taller Creativo.
- Aventuras.
- Mis Logros.

## 🧠 Mis Superpoderes

Actividades destinadas a desarrollar capacidades que van más allá de las asignaturas:

- comprensión lectora;
- razonamiento lógico;
- organización;
- autonomía;
- gestión emocional;
- autoestima.

## ✨ Adicionales

Recursos para aprender disfrutando:

- juegos;
- lecturas;
- música;
- retos;
- curiosidades.

---

# ☁️ Arquitectura Cloud

Desde la versión 2.0, la Academia utiliza una arquitectura Cloud:

```text
Interfaz Web
      │
      ▼
Calendarios / Módulos
      │
      ▼
AcademiaAPI
      │
      ▼
Firebase Authentication
      │
      ▼
Cloud Firestore
```

Esto permite:

- autenticación real de usuarios;
- identificación automática mediante UID;
- almacenamiento seguro por usuario;
- sincronización entre dispositivos;
- persistencia de eventos en la nube;
- reutilización de la misma arquitectura en futuros módulos.

---

# 💻 Tecnologías utilizadas

La Academia utiliza:

- HTML5
- CSS3
- JavaScript ES6 Modules
- Firebase Authentication
- Cloud Firestore
- GitHub Pages
- Git
- GitHub Desktop
- Visual Studio Code

---

# 📖 Documentación

La documentación oficial se encuentra en:

```text
docs/
```

## Documentación del proyecto

```text
docs/project/
```

Incluye:

- ADN_ACADEMIA_GLORIA.md
- MASTER_PLAN.md
- PROJECT_MAP.md
- ROADMAP.md
- DECISION_LOG.md
- MIGRACION_5TO.md

## Estándares de desarrollo

```text
docs/standards/
```

Incluye:

- GUIA_DESARROLLO_ULTRA_PRO.md
- IA_SYSTEM_PROMPT.md
- GLOSARIO.md

La estructura y responsabilidad de cada documento se explica en:

```text
docs/README.md
```

---

# 🚀 Estado del proyecto

## Arquitectura

- ✅ Reorganización completa del repositorio.
- ✅ Migración de 5º de Primaria.
- ✅ Nuevo portal principal.
- ✅ Arquitectura modular.
- ✅ Firebase Authentication.
- ✅ Cloud Firestore.
- ✅ AcademiaAPI.
- ✅ UID dinámico.
- ✅ Calendarios 2025 y 2026 sincronizados.
- ✅ Configuración de Visual Studio Code.
- ✅ Documentación estratégica inicial.

## En desarrollo

- 🚧 Mi Universo.
- 🚧 Gloria Escritora.
- 🚧 Biblioteca Encantada.
- 🚧 Preparación para 6º de Primaria.
- 🚧 Sistema de logros.
- 🚧 Panel de progreso.

---

# 🌱 Evolución de la Academia

La Academia crecerá junto con Gloria.

Cada curso escolar incorporará nuevos contenidos, nuevas experiencias y nuevos recursos, manteniendo siempre el mismo objetivo:

**hacer del aprendizaje una experiencia visual, motivadora y significativa.**

Más que un proyecto tecnológico, la Academia es un proyecto familiar de acompañamiento al aprendizaje.

---

# ❤️ Un proyecto familiar

La Academia ha sido creada por la familia de Gloria con un único propósito:

**ayudarla a aprender con confianza, autonomía y motivación.**

Cada nueva página, actividad o recurso intenta responder siempre a la misma pregunta:

> **¿Esto ayuda realmente a Gloria?**

Si la respuesta es sí, probablemente merece formar parte de la Academia.

---

# 🎯 Principios de desarrollo

Antes de incorporar una nueva funcionalidad nos hacemos cuatro preguntas:

- ¿Ayuda realmente a Gloria?
- ¿Hace el aprendizaje más sencillo?
- ¿Puede reutilizarse?
- ¿Mantiene la Academia simple y fácil de usar?

Si alguna respuesta es **no**, preferimos no incorporarla.

---

# 🌈 Nuestro lema

> **"Aprender puede ser bonito."**

Y cuando tengamos que elegir entre añadir una nueva funcionalidad o hacer más sencillo el aprendizaje de Gloria, siempre elegiremos lo segundo.

---

**Academia de Gloria Valentina**

Versión pública **2.0 Cloud**

Madrid · España

© Juan Perdomo
