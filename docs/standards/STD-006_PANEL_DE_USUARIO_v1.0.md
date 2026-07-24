# STD-006 – PANEL DE USUARIO
## Versión 1.0

**Proyecto:** Academia Gloria
**Ubicación:** `docs/standards/`
**Estado:** Aprobado
**Versión:** 1.0
**Fecha:** Agosto 2026

---

# 1. Objetivo

Definir el estándar oficial del **Panel de Usuario** utilizado por todos los módulos privados de la Academia.

El Panel de Usuario representa la identidad permanente del alumno dentro de la Academia y constituye el punto central desde el cual accederá a su perfil, preferencias y sesión.

No se considera un simple botón de usuario.

Es el lugar donde cada niño reconoce inmediatamente que se encuentra en **su propia Academia**.

---

# 2. Filosofía

Cuando un niño entra en la Academia no debe sentir que inicia sesión en una aplicación informática.

Debe sentir que entra en un espacio que le conoce, le recuerda y le acompaña.

La Academia debe darle la bienvenida utilizando su nombre, su avatar y un lenguaje cercano, positivo y motivador.

Cada alumno debe sentir:

> **"Este es mi espacio."**

---

# 3. Principios

El Panel de Usuario deberá transmitir siempre:

- Cercanía.
- Confianza.
- Simplicidad.
- Alegría.
- Personalización.
- Seguridad.

Nunca deberá transmitir complejidad técnica.

No mostrará información innecesaria como UID, correo electrónico o datos internos del sistema.

---

# 4. Ubicación

El Panel de Usuario aparecerá de forma consistente en la esquina superior derecha de todos los módulos privados de la Academia.

Entre ellos:

- Inicio de la Academia.
- Mi Universo.
- Biblioteca Encantada.
- Gloria Escritora.
- Mi Rincón de Lectura.
- Calendario.
- Matemáticas.
- Lía.
- Cualquier módulo futuro.

La posición deberá ser siempre la misma para favorecer el aprendizaje visual y la familiaridad.

---

# 5. Información mostrada

Toda la información deberá obtenerse dinámicamente desde Firestore.

Nunca deberá escribirse manualmente dentro del código HTML o JavaScript.

## Avatar

Ejemplo:

🌈

## Nombre visible

Ejemplo:

Gloria

(No necesariamente el nombre completo.)

## Saludo

Dependiendo de la hora local del usuario.

Ejemplos:

🌞 Buenos días

☀️ Buenas tardes

🌙 Buenas noches

---

# 6. Menú del Panel

## Versión 1.0

👤 Mi Perfil

🚧 Configuración (Próximamente)

🚧 Mis Logros (Próximamente)

────────────────────

🚪 Cerrar sesión

---

## Versiones futuras

El menú podrá incorporar:

👤 Mi Perfil

⚙️ Configuración

🏆 Mis Logros

🌍 Idioma

🎨 Apariencia

🔔 Notificaciones

👨‍👩‍👧 Familia

👩‍🏫 Profesorado

🤖 Lía

📈 Mi progreso

🚪 Cerrar sesión

---

# 7. Arquitectura

El Panel de Usuario nunca accederá directamente a Firebase.

Toda la información será obtenida mediante los servicios comunes de la Academia.

Arquitectura prevista:

panel-usuario.js

↓

perfil-usuario.js

↓

Firebase Authentication

↓

Cloud Firestore

---

# 8. Datos utilizados

Colección:

usuarios/{uid}

Campos mínimos:

nombre

nombreVisible

avatar

idioma

curso

cursoEscolar

colegio

zonaHoraria

tipoUsuario

activo

En el futuro podrán añadirse otros campos sin modificar la interfaz del Panel.

---

# 9. Responsabilidades

## panel-usuario.js

Responsable de:

- Construir el Panel.
- Mostrar el saludo.
- Mostrar el avatar.
- Mostrar el nombre.
- Abrir y cerrar el menú.
- Ejecutar el cierre de sesión.
- Redirigir al Login cuando sea necesario.

## perfil-usuario.js

Responsable de:

- Obtener el perfil completo.
- Obtener el nombre.
- Obtener el avatar.
- Obtener el idioma.
- Obtener el saludo.
- Obtener las preferencias del usuario.
- Gestionar futuras ampliaciones del perfil.

---

# 10. Integración

Todos los módulos privados deberán utilizar exactamente el mismo componente.

Cada página únicamente deberá importar:

compartido/css/panel-usuario.css

compartido/js/panel-usuario.js

Nunca se duplicará el código del Panel.

Toda mejora deberá realizarse únicamente en estos componentes compartidos.

---

# 11. Evolución prevista

El Panel crecerá junto con la Academia.

Entre las futuras funcionalidades previstas:

- Configuración personal.
- Cambio de avatar.
- Cambio de idioma.
- Tema claro / oscuro.
- Notificaciones inteligentes.
- Insignias.
- Estadísticas.
- Recomendaciones de lectura.
- Integración con Lía.
- Gestión familiar.
- Gestión docente.

La evolución deberá realizarse sin modificar la experiencia básica del alumno.

---

# 12. Reglas de diseño

El Panel deberá cumplir siempre las siguientes normas:

✔ Mismo diseño en toda la Academia.

✔ Mismo comportamiento.

✔ Mismo CSS.

✔ Mismo JavaScript.

✔ Mismo menú.

✔ Misma ubicación.

El usuario nunca deberá preguntarse dónde encontrar su perfil o cómo cerrar la sesión.

---

# 13. Experiencia de usuario

La Academia debe reconocer automáticamente al alumno.

Debe recuperar su perfil y darle la bienvenida de forma natural.

El alumno no cambia de aplicación.

Simplemente continúa su aventura.

La tecnología debe permanecer invisible.

La experiencia debe sentirse humana.

---

# 14. Relación con Lía

En versiones futuras el Panel permitirá la integración natural con Lía.

Ejemplos:

🌞 Buenos días, Gloria.

Hoy tienes una nueva aventura esperándote.

o

🎉 ¡Ayer terminaste una lectura!

Estoy muy orgullosa de ti.

Lía utilizará el Panel como punto principal para establecer una comunicación personalizada con cada alumno.

---

# 15. Visión

El Panel de Usuario constituye la puerta de entrada a toda la experiencia personalizada de la Academia.

Desde él será posible acceder a:

👤 Perfil

🏆 Logros

🤖 Lía

📈 Progreso

⚙️ Configuración

🔔 Notificaciones

sin alterar la simplicidad que caracteriza a la Academia.

---

# Inspiración

Este estándar nace de la experiencia real de Gloria Valentina.

Ha sido construido a partir de las conversaciones mantenidas con su familia, su colegio, su logopeda, su psicóloga infantil y de la observación de sus necesidades reales.

Su propósito es que cualquier niño que utilice la Academia sienta que ese espacio también ha sido creado pensando en él.

---

# Frase guía

> **"Cada niño debe sentir que la Academia le conoce, le recuerda y le acompaña."**

---

# Nota de Arquitectura

Este documento forma parte de los estándares oficiales de la Academia Gloria.

Su finalidad es garantizar que todos los módulos presentes y futuros compartan una identidad común, una experiencia consistente y una arquitectura reutilizable.

El Panel de Usuario representa el primer componente transversal de la Academia y constituye la base sobre la que evolucionarán el Perfil del Alumno, Lía y el resto de servicios inteligentes.
