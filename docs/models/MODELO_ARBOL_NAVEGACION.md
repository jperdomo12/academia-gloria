# 🧭 Modelo · Árbol de Navegación
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/models/MODELO_ARBOL_NAVEGACION.md` |
| **Versión** | 1.5 |
| **Estado** | Activo |
| **Fecha de origen** | 13/08/2026 |
| **Última actualización** | 06/09/2026 |
| **Propietario** | Arquitectura de Navegación |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Representación humana del árbol funcional visible vigente, sin sustituir la fuente técnica central |

## 🔗 Documentos y fuentes relacionados

| Fuente | Relación |
|---|---|
| `compartido/modelos/navegacion.js` | **Implementa:** fuente técnica central del árbol compartido. |
| `compartido/js/panel-usuario.js` | **Implementa:** Mi espacio personal, selector de Persona Activa y renderizado por nivel/estructura. |
| `docs/models/MODELO_NAVEGACION.md` | **Gobierna conceptualmente:** reglas transversales de navegación. |
| `docs/standards/STD-PANEL_DE_USUARIO.md` | **Gobierna:** Panel de Usuario y separación entre identidad propia y Persona Activa. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** niveles y acceso efectivo. |
| `docs/specifications/SPEC-BITACORA_ACOMPANAMIENTO.md` | **Define:** comportamiento funcional de la Bitácora de Acompañamiento V1. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.5 | 06/09/2026 | Product Owner + AI Collaborator | Sincroniza el árbol con la Bitácora de Acompañamiento V1 fusionada mediante PR #83 y la corrección de menú PR #85. Añade Bitácora como nodo principal sin hijos, penúltimo antes de `Descubre la Academia`, y formaliza que un nodo principal sin hijos se renderiza como enlace directo. |
| 1.4 | 04/09/2026 | Product Owner + AI Collaborator | P2. Sincroniza el árbol con `main`: incorpora Mi Baúl en Explorar más, explicita que Gestión de Misiones requiere `gestion`, actualiza 6.º como portal activo y mantiene la separación entre Mi espacio personal y el árbol central. |
| 1.3 | 26/08/2026 | Product Owner + AI Collaborator | Activa 6.º de Primaria como destino navegable dentro de Mis Cursos. |
| 1.2 | 13/08/2026 | Product Owner + AI Collaborator | Alinea el árbol con el modelo de navegación v1.2, aclara responsabilidades de Mi espacio personal y visibilidad por nivel. |
| 1.1 | 13/08/2026 | Product Owner + AI Collaborator | Actualización al árbol vigente, Persona Activa, Administración, Calendario único, regla Volver y normalización del nombre documental. |
| 1.0 | Anterior | Proyecto Academia | Árbol inicial de Fase 1. |

---

## 🎯 1. Propósito

Representar de forma legible la navegación funcional actual de la Academia.

Este documento **no sustituye** `compartido/modelos/navegacion.js` ni debe utilizarse como un árbol paralelo de implementación.

Si la representación humana y el modelo técnico discrepan sobre el estado actual, debe verificarse el producto y sincronizar este documento.

---

## 🌳 2. Árbol funcional actual

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
│   ├── Mi Camino
│   ├── Mi Rincón de Lectura
│   ├── Biblioteca Encantada
│   ├── Mi Rincón de Escritura
│   ├── Aventuras Matemáticas
│   │   ├── Detectives
│   │   └── Historial de Detectives
│   ├── Creciendo por Dentro
│   └── Gestión de Misiones · nivel mínimo: gestion
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
│   ├── Mi Baúl
│   └── Adicionales
│
├── 🤝 Bitácora de Acompañamiento
│
└── Descubre la Academia
```

### 2.1 Duplicidad intencional de Mi Camino

`Mi Camino` aparece:

- como acceso directo dentro de **Mi espacio personal**;
- y como nodo real dentro de **Mi Universo**.

No son dos páginas distintas: ambos accesos llevan al mismo espacio del alumno.

### 2.2 Bitácora como nodo principal directo

`🤝 Bitácora de Acompañamiento` es un nodo principal del árbol central y no tiene hijos en V1.

Por ello, el Panel la presenta como enlace directo de un solo nivel:

```text
Bitácora de Acompañamiento
→ abrir Bitácora
```

No debe presentarse como:

```text
Bitácora de Acompañamiento
└── Abrir Bitácora
```

---

## 🧩 3. Responsabilidad del árbol

El árbol visible combina dos fuentes actuales.

### 3.1 Mi espacio personal

Se compone en:

```text
compartido/js/panel-usuario.js
```

Incluye accesos personales rápidos y no forma parte de `NAVEGACION_ACADEMIA`.

### 3.2 Árbol compartido

Proceden de:

```text
compartido/modelos/navegacion.js
```

los grupos/nodos:

- Mi Universo;
- Mis Cursos;
- Administración;
- Explorar más;
- Bitácora de Acompañamiento.

`Descubre la Academia` está definido también por el modelo central como acceso destacado independiente.

### 3.3 Ubicaciones auxiliares

El modelo técnico mantiene además ubicaciones funcionales que necesitan metadatos de cabecera pero **no deben aparecer como nuevos nodos del menú**.

Ejemplos:

- detalle de Detectives;
- Trabajo realizado;
- calendarios escolares concretos;
- subpáginas de Adicionales.

Estas ubicaciones no se reproducen en este árbol principal.

---

## 🎯 4. Persona Activa

Cuando el Usuario autenticado trabaja sobre otra Persona relacionada, el Panel conserva visible el contexto:

```text
🎯 Viendo a: <Persona Activa>
```

Cuando trabaja sobre su Persona propia, no necesita mostrar un indicador adicional.

La navegación interna debe conservar Persona Activa hasta que el Usuario la cambie expresamente o finalice la sesión.

---

## 📅 5. Mi Calendario

Ruta funcional única:

```text
calendarios/
```

La identidad de la Persona no forma parte de la ruta.

Persona Activa determina qué datos personales muestra el módulo.

---

## 🪜 6. Visibilidad por nivel

Orden transversal:

```text
consulta < gestion < administracion
```

En el árbol actual:

- `Gestión de Misiones` exige `gestion`;
- `Administración` exige `administracion`;
- `Gestión de Usuarios` exige `administracion`;
- los nodos que no declaran `nivelMinimo`, incluida Bitácora como acceso visible, son visibles desde `consulta`.

La visibilidad del menú es una regla de experiencia; **no sustituye la autorización real del módulo/API/Firestore**. En particular, la Bitácora aplica además su contrato propio de relación, autoría y visibilidad.

---

## 🌿 7. Nodos con y sin hijos

El patrón compartido distingue dos casos:

```text
nodo principal con hijos
→ grupo desplegable

nodo principal sin hijos
→ enlace directo
```

Cuando un nodo tiene hijos puede ser simultáneamente:

- una página navegable;
- un contenedor de hijos.

En esos casos el patrón compartido puede distinguir:

- acción principal del nodo → navegar;
- flecha/control secundario → expandir o comprimir.

No debe crearse un segundo nivel artificial solo para poder abrir un nodo principal sin hijos.

---

## ↩️ 8. Volver

Regla conceptual:

> **Volver regresa al origen real de navegación cuando puede determinarse.**

Cuando no existe un origen válido, se utiliza la ruta alternativa segura declarada por la ubicación.

No se define de forma general como “carpeta padre”.

---

## 📊 9. Estado de capacidades visibles

| Capacidad | Estado actual |
|---|---|
| Mi Camino | ✅ Implementado |
| Mi Calendario | ✅ Implementado |
| Persona Activa | ✅ Implementado |
| Mi Rincón de Lectura | ✅ Implementado |
| Biblioteca Encantada | ✅ Implementado |
| Mi Rincón de Escritura | ✅ Implementado |
| Aventuras Matemáticas / Detectives | ✅ Implementado |
| Creciendo por Dentro | ✅ Implementado |
| Gestión de Misiones | ✅ Implementado · `gestion`+ |
| 5.º de Primaria | ✅ Implementado |
| 6.º de Primaria | ✅ Portal activo; contenido curricular evoluciona por Temas |
| Gestión de Usuarios | ✅ Implementado · `administracion` |
| Calendarios | ✅ Implementado |
| Mi Baúl | ✅ Implementado |
| Adicionales | ✅ Implementado |
| Bitácora de Acompañamiento | ✅ V1 implementada · Persona Activa · contrato específico de colaboración |
| Mis Logros | ⏳ Próximo |
| Configuración | ⏳ Próximo |

---

## ✅ 10. Criterios de mantenimiento

Actualizar esta representación cuando cambie el árbol visible de forma relevante.

No actualizarla por cada ubicación auxiliar o detalle de cabecera.

Antes de modificarla:

1. comprobar `compartido/modelos/navegacion.js`;
2. comprobar `panel-usuario.js` si afecta Mi espacio personal o la forma de renderizar nodos;
3. distinguir nodo visible de ubicación auxiliar;
4. distinguir nodos con hijos de nodos principales directos;
5. no convertir una ruta futura en capacidad implementada sin evidencia.

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Activo |
| **Versión** | 1.5 |
| **Fuente técnica central** | `compartido/modelos/navegacion.js` |
| **Reglas conceptuales** | `MODELO_NAVEGACION.md` |
| **Baseline funcional de esta sincronización** | `main @ 58cab370fbf0b8e2191ef29ec4823dcb37b58bd2` |
