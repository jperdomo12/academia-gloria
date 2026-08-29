# 🌈 Academia de Gloria Valentina
# GUÍA DE DESARROLLO ULTRA PRO

**Versión:** 2.1 Cloud  
**Estado:** Activo  
**Última actualización:** 29/08/2026

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

# Mensajes de error y fallos

Todo fallo visible para el usuario debe indicar **la razón del fallo siempre que la aplicación pueda conocerla de forma segura**.

No se utilizará como mensaje final una frase genérica como:

```text
Ha ocurrido un error.
```

cuando exista una causa útil que pueda comunicarse.

El mensaje visible debe:

- explicar qué no pudo realizarse;
- indicar por qué, cuando la causa sea conocida y apropiada para el usuario;
- ofrecer el siguiente paso cuando exista una acción razonable;
- evitar códigos internos, trazas o datos técnicos sensibles.

Ejemplo preferido:

```text
No pudimos guardar la sesión porque se perdió la conexión.
Revisa tu conexión e inténtalo de nuevo.
```

La información técnica adicional puede registrarse en consola o en los mecanismos de diagnóstico correspondientes, sin sustituir la explicación útil mostrada al usuario.

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
- ¿Los fallos visibles explican la causa cuando es conocida y segura de mostrar?
- ¿Se realizó commit?

---

# Regla de Oro

No construimos páginas.

Construimos experiencias de aprendizaje sobre una arquitectura preparada para acompañar a Gloria durante muchos años.

🌈
