# 👤 Panel de Usuario
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/standards/STD-PANEL_DE_USUARIO.md` |
| **Código** | STD-006 |
| **Versión** | 1.2 |
| **Estado** | Activo |
| **Fecha de origen** | Agosto 2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Identidad visible y navegación personal |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Identidad visible del Usuario autenticado, Persona Activa, menú del Panel, integración con cabecera global, reutilización, responsive y fronteras de seguridad |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Gobierna:** dignidad, cercanía, privacidad y experiencia humana. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna/complementa:** experiencia multi-actor y separación entre identidad, Persona Activa y espacios funcionales. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** USER, PERSON, Persona Activa, Roles, Relaciones y acceso efectivo. |
| `docs/models/MODELO_NAVEGACION.md` | **Modela:** navegación y ubicación de capacidades. |
| `compartido/modelos/navegacion.js` | **Implementa:** árbol central de navegación y requisitos mínimos de acceso. |
| `compartido/js/contexto-usuario.js` | **Implementa:** identidad, Persona propia, Persona Activa y nivel efectivo. |
| `compartido/js/perfil-usuario.js` | **Implementa:** servicio compartido de perfil/saludo sobre el contexto actual. |
| `compartido/js/panel-usuario.js` | **Implementa:** componente visual y comportamiento actual del Panel. |
| `compartido/css/panel-usuario.css` | **Implementa:** apariencia compartida. |
| `compartido/componentes/navegacion-global.js` | **Implementa:** host canónico del Panel dentro de la cabecera global. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.2 | 04/09/2026 | Product Owner + AI Collaborator | Aprobación del Product Owner y activación de la sincronización P1 del Panel de Usuario. |
| 1.2-rc1 | 04/09/2026 | Product Owner + AI Collaborator | Sincronización P1. Formaliza que el Panel representa a la Persona propia del Usuario autenticado y que Persona Activa es un contexto separado; documenta selector de Persona Activa, menú derivado de la navegación central y filtrado por nivel; actualiza fuentes de identidad hacia ContextoUsuario/PERSON; mantiene el host canónico único de cabecera; conserva como excepción técnica controlada las lecturas directas actuales de relaciones/Personas realizadas por el propio Panel. |
| 1.1 | 24/08/2026 | Equipo del proyecto | Formalizó host canónico único en cabecera global, neutralización compatible de hosts heredados, mismo CSS/JS/menú y reinicialización segura. |
| 1.0 | Agosto 2026 | Equipo del proyecto | Primera versión aprobada del estándar transversal del Panel de Usuario. |

---

## 🎯 1. Propósito

Definir el estándar oficial del **Panel de Usuario** utilizado como componente transversal en las pantallas privadas de la Academia.

El Panel debe permitir responder de manera inmediata y sin lenguaje técnico:

- **¿Quién ha iniciado sesión?**
- **¿Con qué Persona estoy trabajando ahora?**, cuando el Usuario puede acompañar a otra Persona;
- **¿Dónde están mis accesos principales?**
- **¿Cómo cierro mi sesión?**

El Panel no es solamente un botón.

Es la representación visible y estable de la identidad autenticada dentro de la Academia.

---

## 🧭 2. Principio central

> **El Panel representa a quien inició sesión; Persona Activa indica con quién se está trabajando.**

Estos conceptos no deben confundirse.

Ejemplo:

```text
Usuario autenticado: Azucena
Persona propia: Azucena
Persona Activa: Gloria

Panel visible:
Azucena
🎯 Viendo a: Gloria
```

El Panel **no debe transformarse visualmente en Gloria** cuando Azucena selecciona a Gloria como Persona Activa.

La sesión, identidad y autoría continúan perteneciendo al Usuario autenticado.

---

## 💛 3. Filosofía de experiencia

Cuando una persona entra en la Academia no debe sentir que está operando un sistema administrativo.

Debe encontrar:

- cercanía;
- confianza;
- simplicidad;
- alegría;
- personalización;
- continuidad;
- seguridad.

Para el alumno, el Panel debe reforzar:

> **“Este es mi espacio.”**

Para un adulto o profesional autorizado debe reforzar:

> **“Sigo siendo yo, pero ahora estoy acompañando a esta Persona.”**

Nunca debe mostrar innecesariamente:

- UID;
- identificadores internos;
- estructura de Firestore;
- datos técnicos de seguridad.

---

## 🧩 4. Ubicación e instancia canónica

El Panel aparece de forma consistente en la zona superior derecha de las pantallas que adoptan la cabecera global.

La ubicación canónica pertenece a:

```text
compartido/componentes/navegacion-global.js
```

Reglas:

1. Debe existir **un único Panel visible por pantalla**.
2. La cabecera global crea el host canónico.
3. Un módulo no debe crear una segunda instancia visible.
4. Un host heredado puede permanecer temporalmente en HTML mientras se migra, pero debe quedar neutralizado.
5. No se mueve físicamente un host local heredado hacia la cabecera para “reutilizarlo”.
6. Reinicializaciones posteriores no deben desmontar o sustituir una instancia canónica ya activa.
7. Los estilos locales del módulo no deben alterar la apariencia del Panel compartido.

---

## 👤 5. Identidad mostrada

### 5.1 Identidad principal

El nombre y avatar visibles en el botón principal corresponden a:

```text
contexto.personaUsuario
```

es decir, la **Persona propia del Usuario autenticado**.

Fuentes preferidas:

- `nombreVisible`;
- `nombre` como fallback;
- `avatar`;
- saludo compartido.

### 5.2 Persona Activa

Cuando Persona Activa difiere de Persona propia, el Panel muestra un indicador contextual como:

```text
🎯 Viendo a: <nombre de Persona Activa>
```

Ese indicador:

- informa contexto;
- no cambia identidad;
- no cambia autoría;
- no representa impersonación.

### 5.3 Selector de Persona Activa

Cuando existen Personas relacionadas disponibles, el Panel puede mostrar un selector:

```text
Persona activa
[ Yo · Persona propia ]
[ Persona relacionada ]
```

La ayuda debe explicar que:

> **La sesión sigue siendo del Usuario autenticado; el selector cambia la Persona con la que se trabaja.**

Cambiar Persona Activa debe reconstruir el contexto de forma segura. La implementación actual realiza una recarga de página intencionada para evitar que otros componentes conserven datos del contexto anterior.

---

## 🔗 6. Relaciones y acceso al selector

Una Persona relacionada no se presenta porque exista en una lista local o porque su identificador sea conocido.

Debe existir una relación válida conforme a `STD-USUARIOS_ROLES_Y_ACCESOS.md` y a Firestore Rules.

El Panel solo debe ofrecer Personas que el Usuario puede legítimamente seleccionar.

Si no existen Personas relacionadas disponibles:

- no se necesita selector;
- Persona Activa permanece en Persona propia.

---

## 🗺️ 7. Menú actual del Panel

El menú ya no se define mediante una lista local fija de páginas.

Su estructura combina:

1. **Mi espacio personal**;
2. navegación central de la Academia;
3. **Descubre la Academia** cuando corresponde;
4. **Cerrar sesión**.

### 7.1 Mi espacio personal

Actualmente puede incluir:

- Mi Camino;
- Mi Calendario;
- Mis Logros — marcado como próximo cuando no existe capacidad real;
- Configuración — marcada como próxima cuando no existe capacidad real.

Una opción futura no debe presentarse como producto operativo.

### 7.2 Navegación central

Las secciones principales proceden de:

```text
compartido/modelos/navegacion.js
```

El Panel no debe mantener una segunda copia divergente de:

- Mi Universo;
- Mis Cursos;
- Administración;
- Explorar más;
- ni sus hijos.

### 7.3 Filtrado por nivel

El Panel filtra las ubicaciones según `nivelMinimo` y el nivel efectivo actual.

Ejemplos:

- Gestión de Misiones → `gestion`+;
- Administración → `administracion`;
- Gestión de Usuarios → `administracion`.

Este filtrado mejora la experiencia, pero **no constituye por sí solo seguridad**.

---

## 🔐 8. Seguridad

El Panel nunca será la barrera definitiva de autorización.

La seguridad real combina:

```text
Panel / navegación
→ ContextoUsuario
→ contrato del módulo / API
→ Firestore Rules
```

Reglas:

- ocultar una opción no concede ni revoca permisos reales;
- una URL directa debe volver a validar acceso;
- Persona Activa no convierte al Usuario en propietario de información ajena;
- cerrar sesión elimina el contexto temporal de Persona Activa;
- el Panel no contiene credenciales administrativas.

---

## 🧱 9. Arquitectura de datos y servicios

Arquitectura preferida:

```text
panel-usuario.js
        ↓
ContextoUsuario / PerfilUsuario
        ↓
Firebase Authentication + Firestore
```

### 9.1 Identidad y perfil

La identidad principal del Panel se resuelve mediante `ContextoUsuario` y la Persona propia.

`perfil-usuario.js` continúa como servicio compartido de perfil, saludo y compatibilidad.

`PERSON` es la fuente prioritaria de datos personales del modelo nuevo.

### 9.2 Excepción técnica actual

`panel-usuario.js` todavía realiza lecturas directas de:

- `personaRelaciones`;
- `personas`;

para construir el selector de Personas relacionadas.

Esto se considera una **excepción técnica localizada**, no un patrón que otros módulos deban copiar.

No es necesario crear una abstracción nueva solo por pureza arquitectónica; se revisará cuando exista beneficio real en centralizar esa capacidad.

---

## 🗃️ 10. Datos utilizados

El Panel no depende ya de una lista rígida de campos dentro de `usuarios/{uid}`.

Conceptualmente utiliza:

### Identidad autenticada

```text
USER
→ userId
→ login
→ personaId
→ rol / nivelAcceso
```

### Persona propia

```text
PERSON
→ nombre
→ nombreVisible
→ avatar
→ datos personales/contextuales disponibles
```

### Persona Activa

```text
PERSON
+ PERSON_RELATION cuando es ajena
```

### Compatibilidad

`PerfilUsuario` y `ContextoUsuario` pueden conservar temporalmente datos legacy cuando el modelo nuevo todavía no está completo.

El Panel no debe inventar datos faltantes ni depender de email/login como identidad visual principal.

---

## ⚙️ 11. Responsabilidades por componente

### `panel-usuario.js`

Responsable de:

- construir el Panel;
- mostrar identidad propia;
- mostrar saludo;
- mostrar contexto de Persona Activa;
- ofrecer selector de Persona Activa cuando corresponde;
- construir el menú compartido;
- filtrar navegación por nivel;
- abrir/cerrar el menú;
- gestionar responsive del menú;
- ejecutar cierre de sesión;
- mantener reinicializaciones seguras;
- no acumular listeners globales;
- tratar inicializaciones heredadas contra hosts inexistentes como no-op seguro.

### `contexto-usuario.js`

Responsable de:

- USER;
- Persona propia;
- Persona Activa;
- Roles;
- Relaciones;
- nivel efectivo;
- selección/retorno de Persona Activa.

### `perfil-usuario.js`

Responsable de:

- servicio compartido de perfil;
- saludo;
- preferencias/contexto disponibles;
- cierre de sesión;
- compatibilidad temporal con consumidores existentes.

### `navegacion-global.js`

Responsable de:

- crear el host canónico;
- cargar recursos compartidos necesarios;
- neutralizar hosts heredados;
- iniciar una única instancia visible.

### `navegacion.js`

Responsable de:

- definir el árbol de navegación;
- rutas;
- títulos;
- iconos semánticos;
- requisitos mínimos de acceso.

---

## ♻️ 12. Reutilización

Todos los módulos privados deben reutilizar el componente compartido cuando incorporan Panel de Usuario.

Recursos canónicos:

```text
compartido/css/panel-usuario.css
compartido/js/panel-usuario.js
compartido/componentes/navegacion-global.js
compartido/modelos/navegacion.js
```

No se debe:

- copiar el HTML del Panel a cada página;
- mantener menús privados divergentes;
- crear CSS local que reinterprete el Panel;
- crear un selector de Persona Activa distinto por módulo.

---

## 📱 13. Responsive e interacción

El Panel debe funcionar de forma equivalente en:

- escritorio;
- portátil;
- tablet;
- iPad;
- móvil cuando la pantalla lo requiera.

El menú debe:

- mantenerse dentro de la ventana;
- poder abrir hacia arriba cuando no exista espacio inferior suficiente;
- limitar su altura y permitir scroll interno;
- cerrar por clic exterior;
- cerrar con `Escape`;
- cerrarse/recolocarse ante scroll o resize según el comportamiento compartido;
- evitar depender de hover.

Los controles táctiles deben conservar tamaño y separación suficientes.

---

## 🎨 14. Diseño visual

Reglas:

- mismo componente;
- mismo CSS;
- misma jerarquía;
- mismo comportamiento;
- misma ubicación canónica;
- una sola identidad visible;
- no mostrar información técnica innecesaria;
- mantener nombre y avatar reconocibles;
- distinguir claramente identidad propia de contexto de Persona Activa.

El estado cerrado y el menú abierto deben conservar identidad visual común sin depender del layout particular de cada módulo.

---

## 🗣️ 15. Personalización y lenguaje

Todo texto dirigido al alumno debe ser:

- personalizado desde el contexto real, o
- universal cuando no exista contexto suficiente.

No se debe escribir manualmente “Gloria” en componentes transversales salvo que:

- forme parte del nombre oficial del proyecto;
- el contenido esté explícitamente dedicado a Gloria;
- o el nombre proceda del perfil/contexto real.

El Panel utiliza lenguaje simple y cercano.

---

## 🤖 16. Relación con Lía

Lía puede utilizar en el futuro el contexto de identidad y Persona Activa para acompañamiento personalizado.

Eso **no convierte al Panel en un canal obligatorio de Lía** ni implica que mensajes proactivos estén implementados actualmente.

Cualquier integración futura debe:

- respetar Persona Activa;
- respetar permisos;
- no confundir quién inició sesión;
- no saturar el Panel con contenido educativo.

---

## 🚫 17. Supuestos retirados de v1.1

La v1.2 deja de tratar como reglas vigentes estas formulaciones anteriores:

1. **“El Panel representa permanentemente la identidad del alumno.”**  
   El producto es multi-actor. El Panel representa la Persona propia del Usuario autenticado, que puede ser alumno, familiar, profesional o administrador.

2. **“Cambiar Persona Activa debe cambiar el nombre/avatar principal del Panel.”**  
   No. Persona Activa es contexto, no impersonación.

3. **“El menú del Panel es una lista fija definida dentro del propio Panel.”**  
   La navegación principal procede del modelo central y se filtra por nivel.

4. **“Todos los datos proceden directamente de `usuarios/{uid}`.”**  
   PERSON y ContextoUsuario son prioritarios; existen compatibilidades legacy.

5. **“Mis Logros, Configuración, Notificaciones, Familia, Profesorado, Lía y Progreso están disponibles por figurar en la visión.”**  
   Una capacidad futura solo se muestra como operativa cuando existe producto real. Las opciones `proximo` siguen siendo futuras.

6. **“El Panel no accede directamente a Firestore.”**  
   Es la arquitectura preferida, pero la implementación actual mantiene una excepción localizada para leer relaciones y Personas destinadas al selector.

---

## ✅ 18. Quality Gate

Antes de modificar el Panel o integrar una nueva pantalla:

### Identidad

- [ ] El nombre/avatar principal representan la Persona propia del Usuario autenticado.
- [ ] Persona Activa ajena se muestra como contexto separado.
- [ ] No existe impersonación visual accidental.

### Integración

- [ ] Existe un único Panel visible.
- [ ] Utiliza host canónico de cabecera global cuando aplica.
- [ ] Hosts heredados quedan neutralizados.
- [ ] No se copia el componente localmente.

### Navegación

- [ ] Las rutas principales proceden del modelo central.
- [ ] El nivel mínimo se respeta en la presentación.
- [ ] El módulo vuelve a validar permisos reales.
- [ ] Las opciones futuras no parecen implementadas.

### Persona Activa

- [ ] El selector solo muestra Personas legítimamente relacionadas.
- [ ] Cambiar Persona Activa reconstruye el contexto.
- [ ] Cerrar sesión limpia el contexto temporal.

### UX

- [ ] Funciona con teclado y táctil.
- [ ] `Escape`, clic exterior, scroll y resize no dejan el menú en estado incoherente.
- [ ] No acumula listeners tras reinicialización.
- [ ] El menú permanece dentro del viewport.

### Seguridad

- [ ] No aparecen UID ni datos internos innecesarios.
- [ ] Ocultar navegación no se trata como autorización suficiente.
- [ ] No se duplican consultas directas de relaciones en otros módulos.

---

## 📌 19. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| PU-001 | Mantener un único Panel compartido y visible por pantalla. | Aprobada · implementada |
| PU-002 | La cabecera global posee el host canónico del Panel. | Aprobada · implementada |
| PU-003 | La identidad principal del Panel corresponde a la Persona propia del Usuario autenticado. | Aprobada · implementada |
| PU-004 | Persona Activa se presenta como contexto separado y nunca como impersonación. | Aprobada · implementada |
| PU-005 | El Panel puede seleccionar Persona Activa entre Personas relacionadas válidas. | Aprobada · implementada |
| PU-006 | La navegación principal del Panel procede de `NAVEGACION_ACADEMIA` y se filtra por nivel. | Aprobada · implementada |
| PU-007 | El filtrado del menú mejora UX pero no sustituye seguridad de módulo/API/Firestore. | Aprobada |
| PU-008 | Las lecturas directas de relaciones/Personas permanecen como excepción localizada, no como patrón reusable. | Aprobada |
| PU-009 | Opciones futuras no se declaran operativas hasta existir producto real. | Aprobada |

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 1.2 |
| **Fecha de aprobación** | 04/09/2026 |
| **Aprobado por** | Product Owner |
| **Sustituye** | `STD-PANEL_DE_USUARIO.md` v1.1 |
| **Principio central** | El Panel identifica a quien inició sesión; Persona Activa indica con quién se trabaja. |

**Impacto:** Panel de Usuario · Persona Activa · Navegación · Identidad · Seguridad · Cabecera global · Multi-persona