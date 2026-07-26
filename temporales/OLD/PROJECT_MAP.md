# 🌈 Academia de Gloria
# PROJECT_MAP

**Proyecto:** Academia de Gloria

**Versión del Proyecto:** 2.0

**Versión del Documento:** 1.0

**Estado:** Activo

**Última actualización:** 22/07/2026

**Autor:** Juan Perdomo

---

# 1. Introducción

Este documento describe la organización física del repositorio de la **Academia de Gloria**.

Su objetivo es facilitar la comprensión de la arquitectura del proyecto y definir claramente la responsabilidad de cada directorio.

No documenta el funcionamiento interno de los módulos; únicamente explica **cómo está organizado el proyecto**.

---

# 2. Principios de Organización

La estructura del proyecto se basa en los siguientes principios:

- Modularidad
- Separación de responsabilidades
- Reutilización
- Escalabilidad
- Simplicidad
- Mantenibilidad

Cada carpeta debe tener una única responsabilidad.

---

# 3. Estado General del Proyecto

| Directorio | Estado | Descripción |
|------------|:------:|-------------|
| adicionales | ✅ | Recursos auxiliares y utilidades. |
| assets | ✅ | Recursos gráficos y multimedia. |
| calendarios | 🟡 | Calendarios escolares y personales. |
| compartido | ✅ | Núcleo técnico reutilizable de la Academia. |
| cursos | 🟡 | Información específica de cada curso escolar. |
| docs | ✅ | Documentación oficial del proyecto. |
| etapas | 🟡 | Evolución cronológica del desarrollo. |
| habilidades | 🟡 | Documentación funcional de cada módulo. |
| mi-universo | ⏳ | Información personal y evolución de Gloria. |
| OLD | ✅ | Históricos y versiones anteriores. |

---

# 4. Organización General

```text
academia-gloria/
│
├── adicionales/
├── assets/
├── calendarios/
├── compartido/
├── cursos/
├── docs/
├── etapas/
├── habilidades/
├── mi-universo/
├── OLD/
│
├── index.html
├── login.html
├── calendario.html
├── README.md
│
└── ...
```

---

# 5. Descripción de Directorios

## 📁 adicionales/

Contiene recursos auxiliares, pruebas y herramientas temporales que no forman parte del producto final.

---

## 📁 assets/

Repositorio de recursos visuales utilizados por toda la Academia.

Ejemplos:

- Imágenes
- Iconos
- Logos
- Fondos
- Ilustraciones

---

## 📁 calendarios/

Contiene los distintos calendarios utilizados por la plataforma.

Ejemplos:

- Calendario Escolar
- Calendario Gloria
- Calendarios históricos

---

## 📁 compartido/

Es el núcleo técnico reutilizable de toda la Academia.

Su contenido puede ser utilizado por cualquier módulo.

### Organización

```text
compartido/

api/
componentes/
css/
firebase/
js/
modelos/
templates/
```

### api/

API propia de acceso a datos.

Responsabilidades:

- CRUD
- Firestore
- Consultas
- Sincronización

---

### componentes/

Componentes reutilizables de interfaz.

Ejemplos:

- Tarjetas
- Botones
- Diálogos
- Calendarios

---

### css/

Hojas de estilo compartidas.

---

### firebase/

Configuración y acceso a Firebase.

Incluye:

- Configuración
- Authentication
- Firestore

---

### js/

Utilidades JavaScript reutilizables.

---

### modelos/

Modelos de datos de la Academia.

Ejemplos:

- Evento
- Usuario
- Libro
- Logro
- Viaje

---

### templates/

Plantillas HTML reutilizables.

---

## 📁 cursos/

Información organizada por curso escolar.

Ejemplos:

- 5º Primaria
- 6º Primaria
- ESO
- Bachillerato

---

## 📁 docs/

Documentación oficial del proyecto.

La organización de esta carpeta se describe en:

README.md

---

## 📁 etapas/

Documentación histórica del desarrollo.

Cada etapa representa un gran hito del proyecto.

---

## 📁 habilidades/

Describe funcionalmente cada módulo de la Academia.

Ejemplos:

- Calendario
- Biblioteca
- Escritora
- Logros
- Viajes
- Estadísticas

---

## 📁 mi-universo/

Espacio reservado para la información más personal de Gloria.

Incluye:

- Recuerdos
- Sueños
- Proyectos
- Objetivos
- Línea de vida

---

## 📁 OLD/

Documentación y recursos históricos.

No forman parte de la versión actual.

---

# 6. Archivos Principales

| Archivo | Descripción |
|---------|-------------|
| index.html | Punto de entrada principal de la Academia. |
| login.html | Autenticación de usuarios. |
| calendario.html | Acceso al calendario principal. |
| README.md | Presentación general del proyecto. |

---

# 7. Dependencias

```text
Interfaz Web

↓

Componentes Compartidos

↓

API Academia

↓

Firebase Authentication

↓

Cloud Firestore
```

---

# 8. Convenciones

Toda nueva carpeta deberá:

- Tener una única responsabilidad.
- Evitar duplicar código.
- Reutilizar componentes existentes.
- Mantener coherencia con la arquitectura.
- Documentarse en este archivo cuando pase a formar parte del proyecto.

---

# 9. Evolución

La estructura del repositorio evolucionará conforme crezca la Academia.

Las modificaciones importantes deberán reflejarse también en:

- MASTER_PLAN.md
- ROADMAP.md
- CHANGELOG.md

---

# 10. Documentos Relacionados

- README.md
- MASTER_PLAN.md
- ROADMAP.md
- CHANGELOG.md
- DECISION_LOG.md

---

# Filosofía

La organización del proyecto debe ser tan clara como el propio código.

Un nuevo desarrollador debe poder comprender la estructura general del repositorio en pocos minutos simplemente leyendo este documento.

---

**Academia de Gloria 🌈**

*"Una arquitectura bien organizada facilita el desarrollo de hoy y el mantenimiento de mañana."*
