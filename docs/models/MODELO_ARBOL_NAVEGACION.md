# MODELO · ÁRBOL DE NAVEGACIÓN
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/models/MODELO_ARBOL_NAVEGACION.md` |
| **Versión** | 1.3 |
| **Estado** | Activo |
| **Fecha** | 13/08/2026 |
| **Última actualización** | 26/08/2026 |
| **Propietario** | Arquitectura de Navegación |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Representación humana de la navegación funcional vigente |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.3 | 26/08/2026 | Product Owner + AI Collaborator | Activa 6.º de Primaria como destino navegable dentro de Mis Cursos. El portal queda disponible en construcción activa, con Matemáticas como primera área funcional. |
| 1.2 | 13/08/2026 | Product Owner + AI Collaborator | Alinea el árbol con el modelo de navegación v1.2, aclara responsabilidades de Mi espacio personal y visibilidad por nivel. |
| 1.1 | 13/08/2026 | Product Owner + AI Collaborator | Actualización al árbol vigente, Persona Activa, Administración, Calendario único, regla Volver y normalización del nombre documental. |
| 1.0 | Anterior | Proyecto Academia | Árbol inicial de Fase 1. |

## Documentos y fuentes relacionados

| Fuente | Relación |
|---|---|
| `compartido/modelos/navegacion.js` | Fuente técnica del árbol compartido. |
| `compartido/js/panel-usuario.js` | Añade Mi espacio personal y renderiza el árbol según nivel. |
| `docs/models/MODELO_NAVEGACION.md` | Define las reglas conceptuales de navegación. |

---

## 1. Propósito

Representar de forma legible la navegación funcional actual de la Academia.

Este documento **no sustituye** la fuente técnica central ni debe utilizarse como árbol paralelo de implementación.

---

## 2. Árbol funcional actual

```text
Academia
│
├── Mi espacio personal · Panel de Usuario
│   ├── Mi Camino
│   ├── Mi Calendario
│   ├── Mis Logros · próximo
│   └── Configuración · próximo
│
├── Mi Universo
│   ├── Mi Rincón de Lectura
│   ├── Biblioteca Encantada
│   ├── Mi Rincón de Escritura
│   ├── Aventuras Matemáticas
│   │   ├── Detectives
│   │   └── Historial de Detectives
│   ├── Creciendo por Dentro
│   └── Gestión de Misiones
│
├── Mis Cursos
│   ├── 5.º de Primaria
│   └── 6.º de Primaria
│
├── Administración · nivel mínimo: administracion
│   └── Gestión de Usuarios · nivel mínimo: administracion
│
├── Explorar más
│   ├── Calendarios
│   └── Adicionales
│
└── Descubre la Academia
```

---

## 3. Responsabilidad del árbol

El árbol anterior combina dos fuentes actuales:

### 3.1 Sección personal

```text
Mi espacio personal
```

se construye actualmente en:

```text
compartido/js/panel-usuario.js
```

### 3.2 Árbol compartido

```text
Mi Universo
Mis Cursos
Administración
Explorar más
```

proceden de:

```text
compartido/modelos/navegacion.js
```

`Descubre la Academia` está definido también por el modelo central, como acceso destacado independiente del árbol principal.

---

## 4. Persona Activa

Cuando la Persona conectada trabaja sobre otra Persona relacionada:

```text
🎯 Viendo a: <nombre de Persona Activa>
```

permanece visible en el Panel.

Cuando ambas Personas coinciden, no se muestra indicador adicional.

La Persona Activa proporciona contexto a los módulos que soportan datos personales relacionados.

---

## 5. Mi Calendario

Ruta funcional:

```text
calendarios/
```

No existe dependencia funcional de `calendarioSlug` ni de una carpeta por nombre de Persona.

---

## 6. Visibilidad por nivel

Orden funcional:

```text
consulta < gestion < administracion
```

En el árbol técnico actual:

- `Administración` exige `administracion`;
- `Gestión de Usuarios` exige `administracion`;
- los nodos que no declaran `nivelMinimo` se consideran visibles desde `consulta`.

La visibilidad del menú no sustituye las reglas de autorización de Firestore.

---

## 7. Nodos con hijos

Un nodo puede:

- navegar;
- contener hijos.

Comportamiento:

- nombre/contenido principal → navegar;
- flecha → expandir/comprimir.

---

## 8. Volver

Regla conceptual:

> **Volver regresa al origen real de navegación cuando este puede determinarse.**

Fallback:

```text
ruta alternativa segura
```

No se define como regla general el padre físico de la carpeta.

---

## 9. Convención documental

Los documentos conceptuales de:

```text
docs/models/
```

utilizan el prefijo:

```text
MODELO_
```

Por tanto, el nombre oficial es:

```text
MODELO_ARBOL_NAVEGACION.md
```

y no `ARBOL_NAVEGACION.md`.

---

## 10. Estado de capacidades

| Capacidad | Estado |
|---|---|
| Mi Camino | Implementado |
| Mi Calendario | Implementado |
| Persona Activa | Implementado |
| Indicador `🎯 Viendo a:` | Implementado |
| Mi Rincón de Lectura | Implementado |
| Biblioteca Encantada | Implementado |
| Mi Rincón de Escritura | Implementado |
| Aventuras Matemáticas / Detectives | Implementado |
| Creciendo por Dentro | Implementado |
| Gestión de Misiones | Implementado |
| Gestión de Usuarios | Implementado |
| Mis Logros | Próximo |
| Configuración | Próximo |
| 6.º de Primaria | Disponible / construcción activa |
