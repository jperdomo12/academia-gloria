# STD-006 – PANEL DE USUARIO
## Versión 1.1

**Proyecto:** Academia Gloria
**Ubicación:** `docs/standards/`
**Estado:** Aprobado
**Versión:** 1.1
**Fecha:** Agosto 2026

## Historial de versiones

| Versión | Fecha | Cambio |
|---|---:|---|
| 1.1 | 24/08/2026 | Formaliza la integración del Panel con la cabecera global: host canónico único, neutralización compatible de hosts heredados, mismo CSS/JS/menú en todas las pantallas y reinicialización segura. Registra como deuda separada la discrepancia preexistente entre la arquitectura prevista de acceso a datos y las lecturas directas actuales de Firestore para Personas relacionadas. |
| 1.0 | Agosto 2026 | Primera versión aprobada del estándar transversal del Panel de Usuario. |

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

**Decisión vigente desde v1.1:** en las pantallas que utilizan la cabecera global, esa posición pertenece al host canónico creado por `compartido/componentes/navegacion-global.js`. Un módulo no debe crear una segunda ubicación visible ni trasladar hacia la cabecera una instancia local del Panel.

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

### Estado de implementación observado en v1.1

**HECHO:** la implementación actual de `panel-usuario.js` todavía realiza lecturas directas de Firestore para resolver Personas relacionadas y la Persona Activa.

**DEUDA ARQUITECTÓNICA:** esa situación no cumple todavía completamente la arquitectura prevista en esta sección. La corrección pertenece a una evolución específica de la capa de datos/servicios y **no forma parte del ajuste de cabecera y navegación de v1.1**.

Esta deuda no autoriza a duplicar dichas consultas en los módulos. El Panel compartido sigue siendo el único lugar actual donde existe ese comportamiento.

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
- Garantizar que las reinicializaciones del componente sean seguras y no acumulen listeners globales.
- Tratar una inicialización dirigida a un host heredado inexistente como un no-op, sin desmontar la instancia canónica activa.

## perfil-usuario.js

Responsable de:

- Obtener el perfil completo.
- Obtener el nombre.
- Obtener el avatar.
- Obtener el idioma.
- Obtener el saludo.
- Obtener las preferencias del usuario.
- Gestionar futuras ampliaciones del perfil.

## navegacion-global.js

Cuando una pantalla adopta la cabecera global, es responsable de:

- Crear el host canónico del Panel.
- Garantizar la carga del CSS compartido del Panel antes de presentar la cabecera.
- Neutralizar hosts locales heredados sin moverlos ni reutilizarlos.
- Iniciar una única instancia visible del Panel en la zona derecha de la cabecera.

---

# 10. Integración

Todos los módulos privados deberán utilizar exactamente el mismo componente.

Los recursos compartidos son:

```text
compartido/css/panel-usuario.css
compartido/js/panel-usuario.js
```

En pantallas con cabecera global, la integración del Panel debe realizarse a través de:

```text
compartido/componentes/navegacion-global.js
```

Nunca se duplicará el código del Panel.

Toda mejora deberá realizarse únicamente en los componentes compartidos correspondientes.

Una página heredada puede conservar temporalmente en su HTML un antiguo host `[data-panel-usuario]` mientras se completa la migración, pero ese host:

- no puede permanecer visible junto al Panel canónico;
- no puede alterar la apariencia del Panel canónico;
- no debe trasladarse físicamente hacia la cabecera;
- debe quedar neutralizado por el componente global antes de iniciar el Panel canónico.

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

✔ Un único Panel visible por pantalla.

✔ El estado cerrado y el menú abierto conservan la misma identidad visual independientemente del módulo.

✔ Los estilos locales de Biblioteca, Escritura, Matemáticas, Lectura u otros módulos no pueden modificar el Panel canónico.

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

# 16. Contrato de integración con la cabecera global

Para una pantalla que adopta la cabecera global se considera correcta la integración cuando:

1. existe exactamente un Panel de Usuario visible;
2. ese Panel está renderizado en el host canónico de la cabecera;
3. no existe un segundo host local activo;
4. el botón cerrado conserva el diseño oficial;
5. al abrir el menú conserva el mismo CSS, anchura, jerarquía y opciones compartidas;
6. el menú puede cerrarse por clic exterior, `Escape`, scroll y resize sin acumular listeners por reinicializaciones;
7. una inicialización heredada posterior no sustituye ni desmonta el Panel canónico;
8. el Panel no depende de wrappers, grid, estilos o layout propios del módulo;
9. el comportamiento es equivalente en escritorio y móvil dentro de las reglas responsive compartidas.

Estas reglas son parte del criterio de aceptación transversal de navegación y deben verificarse antes de declarar cerrada una migración de cabecera.

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

## Principio de Personalización

Todo texto mostrado al alumno deberá ser:

- Personalizado mediante el perfil del usuario, o
- Universal, evitando referencias a un alumno concreto.

El nombre "Gloria" solo podrá aparecer cuando forme parte del nombre oficial del proyecto "Academia Gloria" o de contenidos específicamente dedicados a Gloria.
