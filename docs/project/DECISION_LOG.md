# 📘 Decision Log
## Academia de Gloria Valentina

**Proyecto:** Academia de Gloria Valentina

**Documento:** Decision Log

**Versión:** 1.0

**Estado:** Activo

**Última actualización:** Julio 2026

---

# Objetivo

Este documento registra las decisiones importantes de arquitectura, diseño, organización y evolución tomadas durante el desarrollo de la Academia.

Su propósito no es describir cómo funciona el proyecto.

Su propósito es explicar **por qué se tomaron determinadas decisiones**.

Con el paso del tiempo, este documento permitirá comprender el razonamiento detrás de la evolución de la Academia.

---

# Formato

Cada decisión tendrá:

- Identificador
- Fecha
- Estado
- Contexto
- Decisión
- Justificación
- Impacto

---

# DECISION-001

## Nombre

Creación de la Arquitectura 2.0

**Fecha**

Julio 2026

**Estado**

✅ Aprobada

### Contexto

Durante el desarrollo de 5º de Primaria el proyecto creció rápidamente.

La estructura original comenzó a dificultar el mantenimiento y la incorporación de nuevos cursos.

### Decisión

Crear una nueva arquitectura basada en dominios funcionales.

```
Academia

↓

Cursos

↓

Etapas

↓

Habilidades

↓

Adicionales

↓

Compartido

↓

Assets

↓

Docs
```

### Justificación

Separar claramente:

- contenido
- recursos
- documentación
- reutilización

### Impacto

Muy alto.

Esta decisión condiciona toda la evolución futura del proyecto.

---

# DECISION-002

## Nombre

Mantener la URL principal

**Fecha**

Julio 2026

**Estado**

✅ Aprobada

### Contexto

Se evaluó mover el archivo index.html a otra carpeta.

### Decisión

Mantener siempre:

```
index.html
```

en la raíz.

### Justificación

Es el punto natural de entrada a la Academia y sigue las convenciones de GitHub Pages.

### Impacto

Medio.

Simplifica la navegación.

---

# DECISION-003

## Nombre

Separación por cursos

### Estado

✅ Aprobada

### Decisión

Crear:

```
cursos/

    5to/

    6to/
```

### Justificación

Cada curso evoluciona independientemente.

Evita mezclar contenidos.

Facilita futuras ampliaciones.

### Impacto

Muy alto.

---

# DECISION-004

## Nombre

Crear carpeta docs

### Estado

✅ Aprobada

### Decisión

Toda la documentación técnica residirá en:

```
docs/
```

### Justificación

Mantener limpia la raíz del proyecto.

### Impacto

Medio.

---

# DECISION-005

## Nombre

Separación de documentación

### Estado

✅ Aprobada

### Decisión

Dividir la documentación en:

```
docs/

    standards/

    project/
```

### Justificación

Separar metodología de gestión.

### Impacto

Medio.

---

# DECISION-006

## Nombre

Assets centralizados

### Estado

✅ Aprobada

### Decisión

Crear:

```
assets/

    img/

    audio/

    video/

    icons/

    fonts/
```

### Justificación

Eliminar duplicidades.

Favorecer reutilización.

### Impacto

Muy alto.

---

# DECISION-007

## Nombre

Componentes reutilizables

### Estado

✅ Aprobada

### Decisión

Toda nueva página deberá construirse reutilizando componentes comunes.

Ejemplos:

- Hero
- Tarjeta
- Resumen
- Juego
- Test
- Canción
- Esquema

### Justificación

Reducir mantenimiento.

Aumentar consistencia.

### Impacto

Muy alto.

---

# DECISION-008

## Nombre

Migración segura

### Estado

✅ Aprobada

### Decisión

Nunca mover.

Siempre:

```
Copiar

↓

Validar

↓

Certificar

↓

Eliminar
```

### Justificación

Evitar romper la Academia publicada.

### Impacto

Muy alto.

---

# DECISION-009

## Nombre

Página Certificada

### Estado

✅ Aprobada

### Decisión

Toda página migrada deberá superar un proceso de certificación.

### Incluye

- Navegación
- Responsive
- Juegos
- Audio
- Vídeos
- Impresión
- ADN
- Guía ULTRA PRO

### Impacto

Muy alto.

---

# DECISION-010

## Nombre

Portal de Curso

### Estado

✅ Aprobada

### Decisión

Cada curso dispondrá de un portal propio.

Ejemplo:

```
Academia

↓

5º

↓

Matemáticas
```

### Justificación

Mejorar la experiencia de navegación.

### Impacto

Muy alto.

---

# DECISION-011

## Nombre

La Academia como Ecosistema

### Estado

✅ Aprobada

### Contexto

Inicialmente el proyecto nació como una colección de páginas HTML.

Con el tiempo evolucionó hacia una metodología educativa completa.

### Decisión

Considerar oficialmente la Academia como un ecosistema de aprendizaje.

No como una simple página web.

### Justificación

Representa mejor la visión a largo plazo.

### Impacto

Estratégico.

---

# DECISION-012

## Nombre

Prioridad absoluta: Gloria

### Estado

✅ Permanente

### Decisión

Todas las decisiones futuras deberán responder primero a esta pregunta:

> ¿Esto ayuda realmente a Gloria?

Si la respuesta es NO...

La decisión deberá revisarse.

### Justificación

La Academia existe para Gloria.

Todo lo demás es secundario.

### Impacto

Absoluto.

---

# DECISION-013

## Nombre

Migración del Calendario Gloria a Cloud Firestore

**Fecha**

Julio 2026

### Estado

✅ Aprobada

### Contexto

El Calendario Gloria almacenaba toda la información utilizando localStorage, lo que impedía la sincronización entre dispositivos y vinculaba los datos al navegador donde se habían creado.

### Decisión

Migrar el almacenamiento del calendario a Cloud Firestore mediante la API propia `AcademiaAPI`, utilizando Firebase Authentication para asociar automáticamente los eventos al usuario autenticado.

Arquitectura:

Calendario Gloria

↓

AcademiaAPI

↓

Cloud Firestore

↓

usuarios/{uid}/eventos

### Justificación

- Sincronización entre dispositivos.
- Datos asociados a la identidad del usuario.
- Eliminación de la dependencia de localStorage como almacenamiento principal.
- Base común para todos los futuros módulos de la Academia.

### Impacto

Estratégico.

Esta decisión convierte oficialmente a la Academia de Gloria en una plataforma cloud preparada para crecer de forma segura y escalable.


---


DECISION-014
Nombre

Adopción de Git como sistema oficial de control de versiones

Fecha

Julio 2026

Estado

✅ Aprobada

Contexto

Tras completar la infraestructura Cloud, el proyecto alcanza un nivel de complejidad que requiere un control formal de versiones.

Decisión

Se adopta Git como sistema oficial de control de versiones de la Academia.

Cada hito importante deberá registrarse mediante:

Commit descriptivo.
Tag cuando represente una versión estable.
Publicación en GitHub.
Justificación
Historial fiable.
Recuperación sencilla.
Trazabilidad.
Preparación para el crecimiento del proyecto.
Impacto

Estratégico.

A partir de la versión 2.0 Cloud, la evolución del proyecto quedará registrada mediante hitos de Git.

---


# Próximas decisiones

Pendientes.

- Arquitectura 3.0
- Sistema de componentes
- Design System
- Framework CSS
- Gamificación
- Sistema de logros
- Campamento de verano
- Academia 6º

---

# Principio de Arquitectura

Las decisiones de este documento tienen prioridad sobre las implementaciones técnicas.

Si el código contradice una decisión aprobada...

Debe modificarse el código.

No la decisión.

---

# Nuestra filosofía

No construimos páginas.

Construimos experiencias.

No añadimos funciones.

Creamos oportunidades para aprender.

Y cada decisión que tomemos deberá acercarnos un poco más a ese objetivo.

🌈

