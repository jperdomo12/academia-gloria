# MODELO DE NAVEGACIÓN
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/models/MODELO_NAVEGACION.md` |
| **Versión** | 1.5 |
| **Estado** | Activo |
| **Fecha** | 24/08/2026 |
| **Última actualización** | 24/08/2026 |
| **Propietario** | Arquitectura de Navegación |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Navegación transversal, contexto de Persona Activa, visibilidad por nivel, cabecera global y comportamiento de retorno |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.5 | 24/08/2026 | Product Owner + AI Collaborator | Separa el espaciado del contenido del espaciado de la página: la cabecera global queda fuera del padding local y el contenido conserva su separación en un contenedor interior. Aplica la corrección al conjunto de once páginas de 5.º de Primaria identificado en la validación visual. |
| 1.4 | 24/08/2026 | Product Owner + AI Collaborator | Formaliza la tipografía e identidad visual de la cabecera, responsabiliza al recurso compartido de cargar Outfit, fija los tamaños responsive del nombre de pantalla y establece el favicon oficial local como obligatorio en páginas funcionales. Define 5.º de Primaria como conjunto inicial de validación y referencia, cuyo cierre queda condicionado a la superación de las pruebas. |
| 1.3 | 24/08/2026 | Product Owner + AI Collaborator | Aprueba la cabecera global `Academia + Volver · Pantalla actual · Menú`, elimina la necesidad de un bloque independiente para Volver, consolida su implementación mediante componente compartido y define el comportamiento responsive y las excepciones operativas. |
| 1.2 | 13/08/2026 | Product Owner + AI Collaborator | Consolida Persona Activa, visibilidad por nivel, ruta única de Mi Calendario, responsabilidades entre modelo central y panel, y regla estándar de Volver. |
| 1.1 | 01/08/2026 | Proyecto Academia | Regla genérica de nodos navegables con hijos y centralización del árbol. |

## Documentos y fuentes relacionados

| Fuente | Relación |
|---|---|
| `compartido/modelos/navegacion.js` | Fuente técnica central del árbol compartido. |
| `compartido/js/panel-usuario.js` | Presenta el menú de usuario, Mi espacio personal, Persona Activa y filtra nodos por nivel de acceso. |
| `compartido/js/navegacion.js` | Implementa navegación contextual y comportamiento de retorno. |
| `compartido/componentes/navegacion-global.js` | Implementa la cabecera global compartida y compone Academia, Volver contextual, pantalla actual y Panel de Usuario. |
| `compartido/css/navegacion-global.css` | Define la presentación responsive de la cabecera global. |
| `docs/models/MODELO_ARBOL_NAVEGACION.md` | Representación humana del árbol funcional vigente. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | Gobierna roles, relaciones y niveles de acceso. |

---

## 1. Propósito

Definir las reglas conceptuales de navegación de la Academia para que las páginas, el Panel de Usuario y los módulos compartan un comportamiento coherente sin duplicar árboles, rutas o reglas locales.

Este documento define **cómo debe comportarse la navegación**.

El árbol concreto vigente se documenta en `MODELO_ARBOL_NAVEGACION.md` y su fuente técnica central es `compartido/modelos/navegacion.js`.

---

## 2. Principios

1. **Fuente central antes que navegación local.**
2. **Persona conectada y Persona Activa son conceptos distintos.**
3. **Las rutas funcionales no deben depender del nombre visible de una Persona.**
4. **La visibilidad de un nodo depende de reglas explícitas, no de excepciones locales.**
5. **Volver debe recuperar el origen real cuando exista.**
6. **Las páginas no deben duplicar el árbol completo.**
7. **La navegación debe funcionar tanto en desarrollo local como en GitHub Pages.**
8. **La cabecera global es un componente compartido y no debe reconstruirse localmente en cada HTML.**

---

## 3. Nodos con hijos

Un nodo puede cumplir simultáneamente dos funciones:

1. representar una página navegable;
2. contener páginas hijas.

La interfaz ofrece controles separados:

- el nombre o contenido principal del nodo navega a su página;
- la flecha expande o comprime sus hijos;
- la rama de la página actual puede abrirse automáticamente.

Este patrón es genérico y puede aplicarse a:

- Mi Universo;
- Aventuras Matemáticas;
- cursos;
- materias con temas;
- futuros módulos equivalentes.

---

## 4. Fuente central y responsabilidades

### 4.1 Árbol compartido

```text
compartido/modelos/navegacion.js
```

Contiene los datos del árbol compartido:

- identificador;
- título;
- icono;
- ruta;
- hijos;
- estado próximo;
- nivel mínimo cuando corresponda.

No debe contener HTML ni comportamiento visual.

### 4.2 Panel de Usuario

```text
compartido/js/panel-usuario.js
```

Actualmente tiene dos responsabilidades adicionales:

1. presentar `Mi espacio personal`;
2. renderizar el árbol central filtrado según el nivel de acceso.

`Mi espacio personal` contiene actualmente:

- Mi Camino;
- Mi Calendario;
- Mis Logros · próximo;
- Configuración · próximo.

Esta sección es una composición funcional del Panel y **no forma parte actualmente de `NAVEGACION_ACADEMIA`**.

### 4.3 Navegación contextual

```text
compartido/js/navegacion.js
```

Gestiona el retorno contextual y la conservación del origen cuando una página abre otra.

### 4.4 Cabecera global

```text
compartido/componentes/navegacion-global.js
compartido/css/navegacion-global.css
```

La cabecera global compone de forma compartida:

- acceso a Academia;
- acción contextual Volver cuando corresponde;
- identificación de la pantalla actual;
- Panel de Usuario.

Las páginas no deben reconstruir estos elementos mediante una segunda cabecera local.

---

## 5. Persona Activa

La navegación debe conservar la distinción:

```text
Persona conectada
        │
        └── Persona Activa
```

La Persona conectada mantiene la sesión, identidad y permisos propios.

La Persona Activa determina el contexto funcional cuando el usuario trabaja sobre sí mismo o sobre una Persona relacionada.

Cuando Persona conectada y Persona Activa son distintas, el Panel muestra de forma persistente:

```text
🎯 Viendo a: <nombre de Persona Activa>
```

Cuando coinciden, no se muestra indicador adicional.

El cambio de Persona Activa puede afectar:

- Mi Camino;
- Mi Calendario;
- módulos educativos con datos de la Persona;
- tareas, misiones, eventos y evidencias cuando el módulo lo soporte.

---

## 6. Mi Calendario

`Mi Calendario` utiliza una única ruta funcional:

```text
calendarios/
```

No debe construirse una ruta mediante:

- `calendarioSlug`;
- nombre visible;
- nombre de la Persona;
- carpeta física individual.

La Persona Activa determina qué datos personales deben mostrarse.

---

## 7. Visibilidad por nivel de acceso

El Panel utiliza tres niveles ordenados:

```text
consulta < gestion < administracion
```

Un nodo puede declarar:

```text
nivelMinimo
```

Si no lo declara, el comportamiento actual lo considera accesible desde `consulta`.

Consecuencias:

- un nodo `nivelMinimo: administracion` solo aparece a nivel Administración;
- un nodo `nivelMinimo: gestion` aparece a Gestión y Administración;
- un nodo sin `nivelMinimo` aparece desde Consulta.

La visibilidad del menú no debe confundirse con autorización de datos: **Firestore Rules siguen siendo la autoridad efectiva sobre acceso a la información**.

---

## 8. Regla estándar de Volver

El comportamiento transversal es:

> **Volver regresa al punto real desde el que se llegó a la página.**

Prioridad:

```text
1. origen explícito conservado por la navegación
2. historial/referrer válido dentro de la Academia
3. ruta alternativa segura definida por la página
```

No debe utilizarse como regla general:

```text
Volver = carpeta padre
```

porque una misma página puede abrirse desde distintos puntos del producto.

### 8.1 Ruta alternativa

La ruta alternativa es un mecanismo de seguridad.

Solo se utiliza cuando no existe un origen válido o cuando el acceso fue directo.

Las páginas que necesitan una ruta alternativa declaran:

```html
data-nav-back="..."
```

La presencia de `data-nav-back` permite además que la cabecera global muestre la acción `Volver`.

### 8.2 Estándar visual de cabecera global

La cabecera estándar de las pantallas funcionales internas de la Academia es:

```text
ACADEMIA + VOLVER    |    PANTALLA ACTUAL    |    MENÚ DEL USUARIO
```

Cuando la pantalla no necesita acción contextual de retorno:

```text
ACADEMIA             |    PANTALLA ACTUAL    |    MENÚ DEL USUARIO
```

Reglas:

1. **Academia permanece visible** como acceso estable al inicio.
2. **Volver aparece junto a Academia** cuando la página declara `data-nav-back`.
3. **Volver no ocupa un bloque o fila independiente.**
4. **La pantalla actual permanece en la zona central.**
5. **El Panel de Usuario permanece en la zona derecha.**
6. El comportamiento real de `Volver` continúa gobernado por la navegación contextual; `data-nav-back` sigue siendo fallback seguro.
7. En pantallas pequeñas, la cabecera puede compactar etiquetas y conservar iconos para evitar desbordamiento.
8. No deben implementarse copias locales de esta composición salvo piloto temporal explícitamente aprobado.
9. Las nuevas pantallas funcionales deben consumir el componente y CSS compartidos.
10. Las pantallas existentes que todavía no consuman la cabecera compartida deberán migrarse de manera controlada, sin reescrituras funcionales innecesarias.
11. La fuente de la cabecera es Outfit y debe cargarse desde el recurso CSS compartido, sin depender de las fuentes de cada página.
12. El nombre de la pantalla actual usa `14px`, peso `800` y `line-height: 1.2`; pasa a `13px` en tablet (anchuras de hasta 900px) y a `12px` en móvil (hasta 480px).
13. El icono de la pantalla actual usa `16px` y no se contrae; puede ocultarse en pantallas pequeñas para evitar desbordamientos.
14. La pantalla actual ocupa una sola línea y aplica ellipsis cuando el espacio disponible no permite mostrar el nombre completo.
15. `data-page-title` contiene un nombre funcional corto, sin identidad, nombres personales ni mensajes promocionales redundantes.
16. Los estilos locales de una página no deben alterar la tipografía ni la presentación de la cabecera compartida.
17. Toda página funcional debe declarar dentro de `<head>` el favicon oficial local de la Academia, incluyendo `icon`, `shortcut icon` y `apple-touch-icon`.
18. No deben usarse favicons externos de terceros salvo una excepción explícitamente documentada.
19. El espaciado propio del contenido debe aplicarse a un contenedor interior, no al `<body>`, para que el padding local no desplace ni estreche la cabecera global.

### 8.3 Alcance del estándar

Este estándar se aplica a las **pantallas funcionales internas de la Academia**.

Quedan fuera, salvo decisión posterior específica:

- `login.html` y otras pantallas previas a autenticación;
- archivos históricos;
- páginas técnicas de prueba;
- utilidades que no formen parte de la experiencia de navegación del producto.

---

## 9. Independencia de las páginas

Los HTML y módulos deben consumir la navegación compartida cuando corresponda.

No deben:

- reconstruir el árbol completo localmente;
- introducir rutas alternativas sin necesidad funcional;
- decidir permisos por nombre de Persona;
- crear estructuras paralelas a `NAVEGACION_ACADEMIA`;
- duplicar localmente la cabecera global.

Se admiten accesos locales complementarios cuando pertenecen específicamente a una pantalla y no sustituyen el modelo global.

---

## 10. Criterios de validación

La navegación se considera coherente cuando:

- el menú carga desde el modelo central;
- los nodos visibles corresponden al nivel efectivo;
- Persona Activa no cambia la identidad de la Persona conectada;
- el indicador contextual solo aparece cuando corresponde;
- Mi Calendario usa `calendarios/`;
- las rutas funcionan localmente y en GitHub Pages;
- Volver recupera el origen real cuando existe;
- las páginas siguen funcionando con acceso directo mediante una ruta alternativa segura;
- Academia permanece accesible desde la cabecera;
- Volver comparte el bloque izquierdo con Academia cuando corresponde;
- la pantalla actual permanece identificada;
- el Panel de Usuario permanece funcional;
- la cabecera no produce desbordamientos relevantes en móvil;
- la cabecera queda fuera del padding propio del contenido;
- no existe una segunda cabecera global reconstruida localmente;
- la tipografía del centro es idéntica aunque el contenido de la página utilice otra fuente;
- no existen acciones globales `Volver` duplicadas;
- el favicon oficial local aparece y su ruta resuelve correctamente;
- y no quedan favicons externos en el conjunto de referencia.

---

## 11. Decisiones vigentes

| ID | Decisión |
|---|---|
| NAV-001 | El árbol compartido vive en `compartido/modelos/navegacion.js`. |
| NAV-002 | Nombre/contenido principal navega; flecha expande o comprime. |
| NAV-003 | Persona conectada y Persona Activa permanecen separadas. |
| NAV-004 | Si Persona Activa es distinta, se muestra `🎯 Viendo a: <nombre>`. |
| NAV-005 | Mi Calendario utiliza `calendarios/` y no `calendarioSlug`. |
| NAV-006 | La visibilidad por nivel usa `consulta < gestion < administracion`. |
| NAV-007 | Un nodo sin `nivelMinimo` es visible desde Consulta. |
| NAV-008 | Volver prioriza el origen real y usa una ruta alternativa solo como fallback. |
| NAV-009 | La cabecera estándar agrupa `Academia + Volver` en el bloque izquierdo, mantiene la pantalla actual al centro y el Panel de Usuario a la derecha. |
| NAV-010 | Las pantallas funcionales internas deben reutilizar la cabecera global compartida y no reconstruirla localmente. |
| NAV-011 | La cabecera carga y gobierna su propia tipografía; la pantalla no es responsable de cargar Outfit. |
| NAV-012 | Las páginas funcionales usan el favicon oficial local de Academia salvo excepción documentada. |
| NAV-013 | El padding local de cada pantalla se aplica al contenedor de contenido y no al `<body>`, para no afectar a la cabecera global. |
