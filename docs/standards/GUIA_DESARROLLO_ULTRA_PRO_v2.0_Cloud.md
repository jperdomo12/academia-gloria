# 🌈 Academia de Gloria Valentina
# GUÍA DE DESARROLLO ULTRA PRO

**Versión:** 2.0 Cloud  
**Estado:** Activo

---

# Objetivo

Esta guía define el estándar de calidad para cualquier funcionalidad nueva de la Academia.

No solo establece cómo desarrollar una página, sino cómo diseñar una experiencia de aprendizaje coherente con la arquitectura Cloud y con la filosofía de la Academia.

---

# Filosofía

Antes de escribir una línea de código debemos responder:

- ¿Ayuda realmente a Gloria?
- ¿Reduce la carga cognitiva?
- ¿Favorece su autonomía?
- ¿Es visual y motivadora?
- ¿Puede reutilizarse?

Si la respuesta es "no" en alguno de estos puntos, la solución debe replantearse.

---

# Flujo de desarrollo

1. Comprender la necesidad.
2. Revisar la documentación (README, MASTER_PLAN, ROADMAP y PROJECT_MAP).
3. Diseñar la experiencia.
4. Identificar componentes reutilizables.
5. Implementar.
6. Validar.
7. Actualizar la documentación si corresponde.
8. Crear commit y, cuando aplique, una nueva versión.

---

# Arquitectura Cloud (obligatoria)

Toda funcionalidad deberá respetar esta arquitectura:

```text
Interfaz
   │
   ▼
Componentes reutilizables
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

Reglas:

- Usar JavaScript ES Modules (`type="module"`).
- Acceder a los datos únicamente mediante `AcademiaAPI`.
- Obtener la identidad del usuario mediante Firebase Authentication.
- Reutilizar componentes y estilos compartidos.
- Mantener compatibilidad con GitHub Pages.

Nunca:

- Codificar UID o credenciales.
- Acceder directamente a Firestore desde páginas HTML.
- Duplicar componentes existentes.
- Usar `localStorage` como almacenamiento principal.

---

# Estándares UX

- Diseño limpio.
- Tarjetas visuales.
- Mucho espacio en blanco.
- Navegación consistente.
- Excelente experiencia en móvil.

---

# Reglas TEL

Siempre:

- frases cortas;
- una idea por bloque;
- iconografía;
- esquemas;
- retroalimentación positiva.

Nunca:

- mensajes negativos;
- párrafos extensos;
- varias instrucciones simultáneas.

---

# Calidad del código

- Modular.
- Legible.
- Reutilizable.
- Sin duplicación.
- Comentarios cuando aporten valor.

---

# Lista de comprobación

Antes de publicar:

- ¿Es útil para Gloria?
- ¿Respeta la arquitectura Cloud?
- ¿Reutiliza componentes?
- ¿Está documentado el cambio?
- ¿Se probó en móvil y escritorio?
- ¿Se realizó commit?

---

# Regla de Oro

No construimos páginas.

Construimos experiencias de aprendizaje sobre una arquitectura preparada para acompañar a Gloria durante muchos años.

🌈
