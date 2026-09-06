# MODELO DE NAVEGACIÓN
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/models/MODELO_NAVEGACION.md` |
| **Versión** | 1.10 |
| **Estado** | Activo |
| **Fecha** | 24/08/2026 |
| **Última actualización** | 06/09/2026 |
| **Propietario** | Arquitectura de Navegación |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Navegación transversal, contexto de Persona Activa, visibilidad por nivel, cabecera global, Panel de Usuario y comportamiento de retorno |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.10 | 06/09/2026 | Product Owner + AI Collaborator | Formaliza tras PR #85 la representación de nodos principales con y sin hijos: `con hijos → grupo desplegable`, `sin hijos → enlace directo`. Registra Bitácora de Acompañamiento como primer caso principal de nodo directo y alinea el modelo con `STD-PANEL_DE_USUARIO.md` y el árbol visible. |
| 1.9 | 29/08/2026 | Product Owner + AI Collaborator | Formaliza la continuidad de Persona Activa durante navegación interna, el tratamiento de URLs canónicas de Academia como destinos internos del entorno actual y el historial lógico de `Volver`, evitando rebotes del tipo A → B → C → B → C. |
| 1.8 | 26/08/2026 | Product Owner + AI Collaborator | Activa `6.º de Primaria` como nodo navegable real dentro de `Mis Cursos`, retirando su estado `proximo`. El acceso compartido y la página principal apuntan a `cursos/6to/`; el portal de 6.º permanece identificado como construcción activa mientras incorpora materias y temas reales. |
| 1.7 | 24/08/2026 | Product Owner + AI Collaborator | Formaliza la arquitectura robusta de cabecera global: un único host canónico del Panel de Usuario, prohibición de trasladar Paneles locales a la cabecera, desactivación compatible de hosts heredados, inicialización repetible segura, carga de CSS compartido por el propio componente y separación entre árbol visible del menú y ubicaciones auxiliares de cabecera. Amplía la adopción controlada a Biblioteca, Escritura, Creciendo por Dentro, auxiliares de Detectives y Calendarios, y Adicionales. |
| 1.6 | 24/08/2026 | Product Owner + AI Collaborator | Cierra P2 de navegación de pantallas principales. El modelo central puede declarar adopción de cabecera global, fallback de retorno y limpieza controlada de navegación heredada. La carga de la cabecera puede activarse desde `navegacion.js` sin reescribir HTML grandes, preservando las acciones locales propias de cada módulo. |
| 1.5 | 24/08/2026 | Product Owner + AI Collaborator | Separa el espaciado del contenido del espaciado de la página: la cabecera global queda fuera del padding local y el contenido conserva su separación en un contenedor interior. |
| 1.4 | 24/08/2026 | Product Owner + AI Collaborator | Formaliza tipografía/identidad visual de cabecera y favicon oficial local. |
| 1.3 | 24/08/2026 | Product Owner + AI Collaborator | Aprueba la cabecera global `Academia + Volver · Pantalla actual · Menú`. |
| 1.2 | 13/08/2026 | Product Owner + AI Collaborator | Consolida Persona Activa, visibilidad por nivel, ruta única de Mi Calendario, responsabilidades entre modelo central y panel, y regla estándar de Volver. |
| 1.1 | 01/08/2026 | Proyecto Academia | Regla genérica de nodos navegables con hijos y centralización del árbol. |

## Documentos y fuentes relacionados

| Fuente | Relación |
|---|---|
| `compartido/modelos/navegacion.js` | Fuente técnica central del árbol compartido, de las declaraciones de adopción de cabecera y de las ubicaciones auxiliares. |
| `compartido/js/panel-usuario.js` | Presenta el menú de usuario, Mi espacio personal, Persona Activa y filtra/renderiza nodos por nivel y estructura. |
| `compartido/js/navegacion.js` | Implementa navegación contextual, comportamiento de retorno y carga declarativa de la cabecera cuando el modelo lo indica. |
| `compartido/componentes/navegacion-global.js` | Implementa la cabecera global, crea el host canónico del Panel, neutraliza hosts heredados y retira navegación global duplicada cuando el modelo lo autoriza. |
| `compartido/css/navegacion-global.css` | Define la presentación responsive de la cabecera global. |
| `compartido/css/panel-usuario.css` | Define la presentación compartida del Panel de Usuario. |
| `docs/models/MODELO_ARBOL_NAVEGACION.md` | Representación humana del árbol funcional visible vigente. |
| `docs/standards/STD-PANEL_DE_USUARIO.md` | Estándar transversal del Panel de Usuario. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | Gobierna roles, relaciones y niveles de acceso. |
| `docs/specifications/SPEC-BITACORA_ACOMPANAMIENTO.md` | Define el primer nodo principal directo incorporado por Bitácora V1. |

---

## 1. Propósito

Definir las reglas conceptuales de navegación de la Academia para que las páginas, el Panel de Usuario y los módulos compartan un comportamiento coherente sin duplicar árboles, rutas, Paneles o reglas locales.

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
9. **La migración de pantallas existentes debe priorizar reutilización compartida antes que reescritura de páginas.**
10. **La cabecera global es propietaria del único Panel de Usuario visible de la pantalla.**
11. **Un Panel local heredado nunca se traslada físicamente a la cabecera.**
12. **Las opciones visibles del menú y las ubicaciones auxiliares de cabecera son conceptos distintos.**
13. **La navegación interna debe conservar la Persona Activa y el contexto de sesión.**
14. **`Volver` representa una pila lógica de recorrido, no un rebote entre las dos últimas páginas visitadas.**
15. **La forma del nodo determina su interacción: los nodos con hijos despliegan; los nodos sin hijos navegan directamente.**

---

## 3. Nodos con y sin hijos

### 3.1 Nodo principal con hijos

Un nodo puede cumplir simultáneamente dos funciones:

1. representar una página navegable;
2. contener páginas hijas.

La interfaz ofrece controles separados:

- el nombre o contenido principal del nodo navega a su página cuando existe ruta;
- la flecha expande o comprime sus hijos;
- la rama de la página actual puede abrirse automáticamente.

Este patrón puede aplicarse a:

- Mi Universo;
- Aventuras Matemáticas;
- cursos;
- materias con temas;
- futuros módulos equivalentes.

### 3.2 Nodo principal sin hijos

Cuando un nodo principal tiene ruta pero **no tiene hijos**, el Panel debe representarlo como un enlace directo.

```text
nodo principal con hijos → grupo desplegable
nodo principal sin hijos → enlace directo
```

No debe crearse un segundo nivel artificial como:

```text
Bitácora de Acompañamiento
└── Abrir Bitácora
```

cuando el modelo ya expresa suficiente información mediante:

```text
Bitácora de Acompañamiento → bitacora/
```

Bitácora de Acompañamiento V1 es el primer caso principal que motivó la formalización explícita de esta regla mediante PR #85.

La implementación debe derivar este comportamiento de la estructura del nodo (`hijos`) y no de excepciones por nombre.

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
- nivel mínimo cuando corresponda;
- `volver`, cuando el nodo necesita una ruta alternativa centralizada;
- `cabeceraGlobal`, cuando la pantalla puede adoptar declarativamente la cabecera compartida;
- `limpiarNavegacionLegada`, cuando se autoriza retirar duplicados globales heredados de esa pantalla.

No debe contener HTML ni comportamiento visual.

### 4.2 Árbol visible y ubicaciones auxiliares

**DECISIÓN:** `NAVEGACION_ACADEMIA` representa el árbol que puede aparecer en el Panel de Usuario.

Una pantalla funcional puede necesitar metadatos de cabecera sin convertirse en una nueva opción del menú. Esas pantallas se registran como **ubicaciones auxiliares** y se incorporan únicamente a `UBICACIONES_ACADEMIA`.

Ejemplos actuales:

- Detalle de historia de Detectives;
- Trabajo realizado de Detectives;
- Calendarios del Colegio;
- calendario escolar concreto;
- Música, Juegos y Lecturas de Adicionales;
- cuentos/lecturas individuales.

Esto evita duplicar o contaminar el árbol visible para resolver únicamente título, icono, `Volver` o adopción de cabecera.

### 4.3 Panel de Usuario

```text
compartido/js/panel-usuario.js
```

Tiene responsabilidades de navegación:

1. presentar `Mi espacio personal`;
2. renderizar el árbol central filtrado según nivel de acceso;
3. representar la forma del nodo según tenga o no hijos.

`Mi espacio personal` contiene actualmente:

- Mi Camino;
- Mi Calendario;
- Mis Logros · próximo;
- Configuración · próximo.

Esta sección es una composición funcional del Panel y **no forma parte actualmente de `NAVEGACION_ACADEMIA`**.

La inicialización del Panel debe ser segura frente a llamadas repetidas. Una llamada heredada cuyo contenedor ya fue neutralizado por la cabecera global se convierte en un **no-op** y no puede destruir el Panel canónico.

### 4.4 Navegación contextual

```text
compartido/js/navegacion.js
```

Gestiona el retorno contextual y la conservación del origen cuando una página abre otra.

También reconoce como navegación interna los destinos canónicos de la propia Academia, los resuelve en el entorno actual —desarrollo local o GitHub Pages— y preserva el contexto necesario para que Persona Activa y el historial lógico continúen siendo válidos.

Una URL absoluta de producción que apunta a la propia Academia no debe tratarse como un sitio externo únicamente por su forma. Cuando corresponda, debe abrirse en la misma pestaña y en el entorno actual. Los enlaces realmente externos conservan su comportamiento propio.

Además, puede consultar el modelo central y cargar la cabecera global de forma declarativa cuando el nodo actual define `cabeceraGlobal: true`.

### 4.5 Cabecera global

```text
compartido/componentes/navegacion-global.js
compartido/css/navegacion-global.css
```

La cabecera global compone de forma compartida:

- acceso a Academia;
- acción contextual Volver cuando corresponde;
- identificación de la pantalla actual;
- Panel de Usuario.

**DECISIÓN:** la cabecera crea su propio host canónico del Panel de Usuario (`#nav-panel-usuario`).

La cabecera no mueve un Panel local previo. En su lugar:

1. identifica hosts locales heredados;
2. los desactiva y vacía;
3. conserva la lógica funcional restante del módulo;
4. inicia una única instancia del Panel en el host canónico.

El componente también garantiza la disponibilidad de:

- `navegacion-global.css`;
- `panel-usuario.css`;
- favicon oficial local.

Cuando un nodo declara `limpiarNavegacionLegada: true`, puede retirar equivalentes globales heredados. Las acciones propias del módulo deben conservarse.

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

Cuando son distintas, el Panel muestra:

```text
🎯 Viendo a: <nombre de Persona Activa>
```

El cambio de Persona Activa puede afectar:

- Mi Camino;
- Mi Calendario;
- módulos educativos con datos de la Persona;
- tareas, misiones, eventos y evidencias cuando el módulo lo soporte;
- Bitácora de Acompañamiento y otras capacidades colaborativas autorizadas.

**Continuidad obligatoria:** navegar entre pantallas internas no debe restablecer silenciosamente Persona Activa a la Persona conectada. El contexto se mantiene hasta cambio explícito o fin de sesión.

---

## 6. Mi Calendario

`Mi Calendario` utiliza una única ruta funcional:

```text
calendarios/
```

No debe construirse una ruta mediante `calendarioSlug`, nombre visible, nombre de Persona o carpeta física individual.

Persona Activa determina qué datos personales se muestran.

---

## 7. Visibilidad por nivel de acceso

El Panel utiliza tres niveles ordenados:

```text
consulta < gestion < administracion
```

Un nodo puede declarar `nivelMinimo`.

Si no lo declara, el comportamiento actual lo considera visible desde `consulta`.

La visibilidad del menú no debe confundirse con autorización de datos: **el contrato del módulo y Firestore Rules siguen siendo autoridad efectiva**.

Bitácora es un ejemplo: puede ser visible como nodo desde `consulta`, pero su lectura/escritura real depende además de Persona Activa, relación, autoría, visibilidad y Rules.

---

## 8. Regla estándar de Volver

> **Volver regresa al punto real desde el que se llegó a la página.**

Prioridad:

```text
1. origen explícito conservado por la navegación
2. historial/referrer válido dentro de la Academia
3. ruta alternativa segura definida por la página o por el modelo central
```

No debe utilizarse como regla general `Volver = carpeta padre`.

El historial debe comportarse como una pila lógica:

```text
A → B → C
Volver desde C → B
Volver desde B → A
```

No debe rebotar B → C tras retroceder.

### 8.1 Ruta alternativa

Puede declararse mediante:

```html
data-nav-back="..."
```

o centralmente:

```js
volver: "ruta/segura/"
```

La declaración local tiene prioridad cuando existe; `volver` central permite migrar sin modificación local innecesaria.

### 8.2 Estándar visual de cabecera global

```text
ACADEMIA + VOLVER    |    PANTALLA ACTUAL    |    MENÚ DEL USUARIO
```

Sin retorno contextual:

```text
ACADEMIA             |    PANTALLA ACTUAL    |    MENÚ DEL USUARIO
```

Reglas principales:

1. Academia permanece visible como acceso estable.
2. Volver aparece junto a Academia cuando corresponde.
3. Volver no ocupa bloque/fila independiente.
4. Pantalla actual permanece al centro.
5. Panel de Usuario permanece a la derecha.
6. `Volver` real sigue gobernado por navegación contextual; fallback es seguridad.
7. En móvil la cabecera puede compactar etiquetas e iconos.
8. No implementar copias locales salvo piloto explícito.
9. Nuevas pantallas consumen componente/CSS compartidos.
10. Migraciones existentes deben ser controladas y sin reescrituras funcionales innecesarias.
11. Outfit se carga desde recurso compartido.
12. Nombre de pantalla: 14px/800/1.2; 13px hasta 900px; 12px hasta 480px.
13. Icono de pantalla: 16px, no se contrae y puede ocultarse en pantalla pequeña.
14. Nombre en una línea con ellipsis.
15. `data-page-title` usa nombre funcional corto y no identidad personal.
16. CSS local no altera cabecera compartida.
17. Página funcional usa favicon oficial local.
18. No favicons externos salvo excepción documentada.
19. Padding de contenido se aplica a contenedor interior, no al `<body>`.
20. Adopción declarativa mediante `cabeceraGlobal: true` cuando ya carga `navegacion.js`.
21. Limpieza heredada requiere `limpiarNavegacionLegada: true`.
22. Limpieza no elimina acciones propias del módulo.
23. Cabecera contiene un único host canónico del Panel.
24. Panel conserva mismo CSS/menú/comportamiento en cualquier módulo.
25. Reinicialización heredada no desmonta Panel canónico.

### 8.3 Alcance

Aplica a pantallas funcionales internas.

Quedan fuera salvo decisión específica:

- `login.html` y pantallas preautenticación;
- históricos;
- páginas técnicas de prueba;
- utilidades fuera de la experiencia de navegación.

### 8.4 Adopción validada y ampliada

Referencias iniciales P2:

- Mi Universo;
- Mi Camino;
- Gestión de Misiones;
- Aventuras Matemáticas;
- Detectives;
- Mi Rincón de Lectura.

La arquitectura v1.7 amplió adopción a Biblioteca, Escritura, Creciendo por Dentro, auxiliares de Detectives, Calendarios y Adicionales.

v1.8 activó `6.º de Primaria` dentro de `Mis Cursos`.

v1.9 consolidó continuidad de Persona Activa y pila histórica de retorno.

v1.10 incorpora Bitácora de Acompañamiento y formaliza la representación directa de nodos principales sin hijos.

La inclusión significa adopción arquitectónica; el cierre de cada familia depende de sus pruebas aplicables.

---

## 9. Independencia de las páginas

Los HTML y módulos consumen navegación compartida cuando corresponde.

No deben:

- reconstruir árbol completo localmente;
- introducir rutas alternativas sin necesidad;
- decidir permisos por nombre de Persona;
- crear estructuras paralelas a `NAVEGACION_ACADEMIA`;
- duplicar cabecera global;
- mover un Panel local hacia la cabecera;
- aplicar estilos locales al Panel canónico;
- crear niveles de menú artificiales para nodos directos.

Se admiten accesos locales complementarios cuando pertenecen a una pantalla y no sustituyen el modelo global.

---

## 10. Criterios de validación

La navegación se considera coherente cuando:

- el menú carga desde el modelo central;
- un nodo principal con hijos se renderiza como grupo desplegable;
- un nodo principal sin hijos se renderiza como enlace directo;
- no se crea un hijo artificial para abrir un nodo directo;
- nodos visibles corresponden al nivel efectivo;
- ubicaciones auxiliares no aparecen como nuevas opciones;
- Persona Activa no cambia identidad del conectado;
- Persona Activa se conserva al navegar y regresar;
- indicador contextual aparece solo cuando corresponde;
- Mi Calendario usa `calendarios/`;
- rutas funcionan localmente y en GitHub Pages;
- URLs canónicas de Academia se resuelven como internas cuando corresponde;
- navegación interna no rompe contexto por aperturas innecesarias;
- Volver recupera origen real;
- A → B → C retrocede C → B → A;
- acceso directo usa fallback seguro;
- Academia permanece accesible;
- existe exactamente un Panel visible asociado a cabecera global;
- no existe segundo host local activo;
- reinicialización tardía no sustituye Panel;
- cabecera no desborda en móvil;
- cabecera queda fuera del padding del contenido;
- no existe segunda cabecera local;
- no existen acciones globales Volver duplicadas;
- adopción declarativa solo se activa en nodos marcados;
- limpieza legada conserva acciones propias;
- favicon local resuelve;
- y el conjunto certificado no presenta regresiones relevantes.

---

## 11. Decisiones vigentes

| ID | Decisión |
|---|---|
| NAV-001 | El árbol compartido vive en `compartido/modelos/navegacion.js`. |
| NAV-002 | En nodos con hijos, nombre/contenido principal navega y flecha expande/comprime cuando existe página propia. |
| NAV-003 | Persona conectada y Persona Activa permanecen separadas. |
| NAV-004 | Si Persona Activa es distinta, se muestra `🎯 Viendo a: <nombre>`. |
| NAV-005 | Mi Calendario utiliza `calendarios/` y no `calendarioSlug`. |
| NAV-006 | La visibilidad por nivel usa `consulta < gestion < administracion`. |
| NAV-007 | Un nodo sin `nivelMinimo` es visible desde Consulta; esto no sustituye autorización real. |
| NAV-008 | Volver prioriza el origen real y usa ruta alternativa solo como fallback. |
| NAV-009 | La cabecera agrupa `Academia + Volver` a la izquierda, pantalla actual al centro y Panel a la derecha. |
| NAV-010 | Las pantallas funcionales internas reutilizan cabecera global. |
| NAV-011 | La cabecera gobierna su propia tipografía. |
| NAV-012 | Las páginas funcionales usan favicon oficial local salvo excepción. |
| NAV-013 | El padding local se aplica al contenido, no al `<body>`. |
| NAV-014 | El modelo puede declarar `volver`, `cabeceraGlobal` y `limpiarNavegacionLegada`. |
| NAV-015 | `navegacion.js` carga cabecera automáticamente solo con `cabeceraGlobal: true`. |
| NAV-016 | La limpieza heredada es opt-in y conserva acciones propias. |
| NAV-017 | La cabecera crea y posee el único host canónico del Panel. |
| NAV-018 | Hosts locales heredados se neutralizan antes de iniciar Panel canónico. |
| NAV-019 | `panel-usuario.js` tolera inicializaciones repetidas. |
| NAV-020 | Ubicaciones auxiliares se mantienen fuera de `NAVEGACION_ACADEMIA`. |
| NAV-021 | Cabecera garantiza carga de sus estilos y `panel-usuario.css`. |
| NAV-022 | `6.º de Primaria` es destino navegable activo en `Mis Cursos`. |
| NAV-023 | Navegación interna conserva Persona Activa hasta cambio explícito o fin de sesión. |
| NAV-024 | `Volver` utiliza historial lógico que elimina rama abandonada al retroceder. |
| NAV-025 | Destinos canónicos de Academia se tratan como navegación interna y se resuelven en el entorno actual. |
| NAV-026 | Un nodo principal sin hijos se representa como enlace directo; un nodo principal con hijos se representa como grupo desplegable. |

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 1.10 |
| **Última sincronización** | 06/09/2026 |
| **Fuente técnica central** | `compartido/modelos/navegacion.js` |
| **Representación humana del árbol** | `docs/models/MODELO_ARBOL_NAVEGACION.md` |
| **Implementación del Panel** | `compartido/js/panel-usuario.js` |
| **Regla nueva consolidada** | Con hijos → desplegable; sin hijos → enlace directo |
