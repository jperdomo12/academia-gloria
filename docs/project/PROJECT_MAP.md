# 🌈 Academia de Gloria
# PROJECT_MAP

**Proyecto:** Academia de Gloria

**Versión del Proyecto:** 2.0 Cloud
**Versión del Documento:** 1.1
**Estado:** Activo
**Última actualización:** 23/07/2026
**Autor:** Juan Perdomo

---

# 1. Introducción

Este documento describe la organización física del repositorio de la Academia de Gloria y la responsabilidad de cada directorio.

---

# 2. Principios

- Modularidad
- Separación de responsabilidades
- Reutilización
- Escalabilidad
- Simplicidad
- Mantenibilidad

---

# 3. Estado General

| Directorio | Estado | Descripción |
|------------|:------:|-------------|
| adicionales | ✅ | Recursos auxiliares. |
| assets | ✅ | Recursos gráficos. |
| calendarios | ✅ | Calendarios personales y escolares. |
| compartido | ✅ | Núcleo técnico Cloud. |
| cursos | 🟡 | Información académica. |
| docs | ✅ | Documentación oficial. |
| etapas | 🟡 | Evolución del proyecto. |
| habilidades | 🟡 | Documentación funcional. |
| mi-universo | ⏳ | Universo personal de Gloria. |
| OLD | ✅ | Recursos históricos. |

---

# 4. Organización General

```text
academia-gloria/
│
├── index.html
├── login.html
├── README.md
│
├── adicionales/
├── assets/
├── calendarios/
│   └── gloria/
│       ├── 2025.html
│       └── 2026.html
├── compartido/
├── cursos/
├── docs/
├── etapas/
├── habilidades/
├── mi-universo/
└── OLD/
```

---

# 5. Directorio compartido

```text
compartido/
├── api/
├── componentes/
├── css/
├── firebase/
├── js/
├── modelos/
└── templates/
```

## Arquitectura Cloud

- Firebase Authentication
- Cloud Firestore
- AcademiaAPI
- Componentes reutilizables
- Modelos
- CSS compartido

---

# 6. Archivos Principales

| Archivo | Descripción |
|---------|-------------|
| index.html | Entrada principal. |
| login.html | Inicio de sesión Firebase. |
| README.md | Presentación del proyecto. |

Los calendarios residen en:

```text
calendarios/gloria/
```

---

# 7. Dependencias

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

---

# 8. Convenciones

- Una responsabilidad por carpeta.
- Reutilizar componentes.
- Evitar duplicación.
- Mantener la arquitectura.
- Documentar cambios relevantes.

---

# 9. Evolución

Actualizar conjuntamente:

- README.md
- MASTER_PLAN.md
- ROADMAP.md
- PROJECT_MAP.md
- DECISION_LOG.md

(CHANGELOG.md pendiente de creación.)

---

# 10. Filosofía

La infraestructura Cloud implantada en la versión 2.0 convierte a la Academia en una plataforma preparada para crecer mediante módulos reutilizables y datos sincronizados.

---

**Academia de Gloria 🌈**

*"Una arquitectura bien organizada facilita el desarrollo de hoy y el mantenimiento de mañana."*
