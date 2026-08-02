# 🌈 MASTER ARCHITECTURE AND AI HANDOFF
## Academia Gloria Valentina

**Ruta oficial prevista:** `docs/project/MASTER_ARCHITECTURE_AND_AI_HANDOFF.md`
**Versión del documento:** 1.1
**Fecha de consolidación:** 02/08/2026 · actualización nocturna
**Estado:** Documento maestro de referencia y continuidad
**Propietario del proyecto:** Juan Perdomo
**Repositorio oficial:** `https://github.com/jperdomo12/academia-gloria`
**Sitio publicado:** `https://jperdomo12.github.io/academia-gloria/`

---

> **Propósito de este documento**
>
> Este documento preserva el conocimiento acumulado durante meses de diseño, desarrollo,
> pruebas, uso familiar y evolución de la Academia. Está escrito para que una nueva instancia
> de IA, un arquitecto, un desarrollador o un profesional colaborador pueda comprender el
> proyecto y continuar exactamente desde su estado actual sin depender del chat histórico.
>
> No debe interpretarse como sustituto de los documentos especializados de `docs/`.
> Es el documento de **integración, arquitectura, continuidad y transferencia de conocimiento**.
> Cuando exista una discrepancia entre este documento y el código desplegado, debe verificarse
> primero el código actual del repositorio y registrar la corrección documental correspondiente.


> Este documento constituye la memoria técnica, funcional y arquitectónica oficial de la Academia.
> Su propósito es preservar el conocimiento acumulado del proyecto y garantizar su continuidad a largo plazo, independientemente de las personas o herramientas que participen en su evolución.

---

# 0. Historial de revisiones

| Versión | Fecha | Autor / responsable | Descripción |
|---|---:|---|---|
| 0.1 | Julio 2026 | Juan Perdomo + IA | Se plantea un documento de continuidad para migrar el proyecto a un nuevo chat. |
| 0.2 | 02/08/2026 | Juan Perdomo + IA | Se amplía el objetivo: no solo continuidad de IA, sino referencia para arquitectos y desarrolladores. |
| 0.3 | 02/08/2026 | Juan Perdomo + IA | Se acuerda el nombre `MASTER_ARCHITECTURE_AND_AI_HANDOFF.md`. |
| 0.4 | 02/08/2026 | Juan Perdomo + IA | Se incorpora como fuente conceptual el módulo **Descubre la Academia**. |
| 0.5 | 02/08/2026 | Juan Perdomo + IA | Se generaliza la terminología: la Academia nació para Gloria, pero se diseña para **alumnas y alumnos**. |
| 1.0 | 02/08/2026 | Juan Perdomo + IA | Primera versión integral consolidada, limitada deliberadamente a una extensión operativa menor de 70 páginas equivalentes. |
| 1.1 | 02/08/2026 | Juan Perdomo + IA | Actualización del estado real: Misiones, navegación global, integración de Lectura, contenidos nuevos, mantenimiento documental y evolución de la portada principal con acceso dinámico a Mi Camino. |

## 0.1 Política de mantenimiento del documento

Este documento debe actualizarse cuando ocurra cualquiera de estos eventos:

1. Cambia la arquitectura física del repositorio.
2. Se crea un nuevo módulo principal.
3. Se modifica el modelo de datos compartido.
4. Se introduce una nueva decisión arquitectónica de alto impacto.
5. Se cambia la forma de autenticación, despliegue o persistencia.
6. Se completa una versión funcional relevante.
7. Se descubre que una afirmación de este documento ya no coincide con el código.

Cada modificación debe añadir una fila al historial de revisiones y, cuando corresponda,
actualizar también:

- `docs/project/CHANGELOG.md`
- `docs/project/DECISION_LOG.md`
- `docs/project/PROJECT_MAP.md`
- `docs/project/ROADMAP.md`
- `docs/project/MASTER_PLAN.md`

---

# 1. Resumen ejecutivo

La **Academia Gloria Valentina** es un ecosistema educativo digital, familiar y evolutivo que
nació para acompañar a Gloria, una alumna con necesidades específicas de lenguaje, comprensión,
organización y motivación. Con el tiempo, el proyecto se ha generalizado para que pueda ser usado
por otras alumnas y alumnos, sin perder su origen profundamente personalizado.

No es un LMS tradicional, ni una colección de deberes digitales. Su propósito es convertir el
aprendizaje en experiencias visuales, estructuradas, accesibles, motivadoras y conectadas con la
vida cotidiana. La Academia combina:

- contenidos escolares organizados por curso;
- actividades de lectura, escritura y matemáticas;
- planificación mediante tareas y misiones;
- seguimiento familiar;
- identidad visual y narrativa;
- almacenamiento cloud por usuario;
- colaboración futura entre familia, colegio y profesionales.

La aplicación utiliza principalmente **HTML5, CSS3 y JavaScript ES6**, con **Firebase
Authentication** y **Cloud Firestore** como infraestructura de identidad y datos. Se publica en
**GitHub Pages** desde el repositorio `jperdomo12/academia-gloria` y se desarrolla localmente con
**Visual Studio Code** y un servidor local, normalmente Live Server.

La arquitectura actual es modular, basada en páginas estáticas enriquecidas con módulos
JavaScript compartidos. El núcleo reutilizable se concentra en `compartido/`, especialmente:

- configuración Firebase;
- autenticación y protección de páginas;
- perfil de usuario;
- panel de usuario;
- navegación contextual;
- API de datos `Academia`.

Los módulos con mayor madurez funcional son:

- Calendarios;
- Biblioteca Encantada;
- Mi Rincón de Lectura;
- Detectives de Problemas;
- Mi Camino;
- Mis Tareas;
- navegación y perfil de usuario;
- Descubre la Academia.

Desde aquella consolidación, el proyecto avanzó de forma sustancial. Detectives dejó de ser el
único módulo plenamente integrado con Misiones: **Mi Rincón de Lectura** también quedó conectado al
ciclo completo de misión, evidencia, revisión familiar y cierre. Además se consolidaron la navegación
global, el historial compacto de lecturas y nuevos contenidos educativos.

El punto actual de reanudación es la **evolución de la portada principal**. Existe una propuesta HTML
funcional y una variante más compacta y dinámica que:

1. aplana el hero sin perder identidad;
2. reduce la franja `Observo · Comprendo · Practico`;
3. convierte `Descubre la Academia` y `Continúa tu aventura` en tarjetas completas pulsables;
4. enlaza directamente con `Mi Camino`;
5. adapta el mensaje según misiones preparadas, en curso, con ayuda solicitada o pendientes de revisión.

Esta nueva portada debe integrarse sobre el `index.html` real del repositorio y validarse en local y
GitHub Pages antes de declararse versión oficial.

---

# 2. Descripción general del proyecto

## 2.1 Finalidad

La Academia busca acompañar el desarrollo académico, personal y emocional de cada alumno
mediante experiencias digitales adaptadas, manteniendo una continuidad entre:

- lo que aprende en el colegio;
- lo que practica en casa;
- lo que observa la familia;
- lo que recomiendan los profesionales;
- lo que el propio alumno descubre sobre sí mismo.

## 2.2 Problema que resuelve

Los materiales escolares convencionales pueden presentar dificultades para alumnos que necesitan:

- menor carga cognitiva;
- lenguaje más claro;
- secuencias paso a paso;
- apoyos visuales;
- retroalimentación inmediata;
- repetición sin castigo;
- mayor motivación;
- contextos familiares y significativos;
- oportunidades para desarrollar autonomía.

La Academia reorganiza, adapta y enriquece el material educativo para hacerlo más comprensible,
cercano y útil.

## 2.3 Usuarios y roles

### Alumna o alumno

Es el protagonista. Debe poder:

- comprender qué hacer;
- navegar con autonomía progresiva;
- practicar sin miedo al error;
- recibir mensajes motivadores;
- revisar su progreso;
- escuchar, grabar, leer, escribir y resolver;
- sentir que la Academia es su espacio.

### Familia

Planifica, acompaña, observa y registra. Puede:

- crear y organizar tareas;
- convertir tareas en misiones;
- revisar resultados;
- añadir observaciones;
- consultar historiales;
- acompañar sin convertir la experiencia en un informe rígido.

### Profesionales

Psicología, logopedia, Pedagogía Terapéutica, tutoría y otros perfiles podrán aportar
observaciones y recomendaciones. La colaboración profesional está definida como visión y objetivo,
pero todavía no existe un rol técnico completo de “profesional invitado”.

### Administración / desarrollo

Mantiene el código, los datos, la documentación, las versiones y la evolución funcional.

## 2.4 Objetivos

### Objetivos educativos

- favorecer la comprensión;
- estructurar el pensamiento;
- reforzar lectura y expresión;
- desarrollar razonamiento matemático;
- reducir frustración;
- fomentar autonomía;
- reforzar autoestima y confianza;
- registrar crecimiento sin comparaciones externas.

### Objetivos técnicos

- mantener una arquitectura sencilla y escalable;
- evitar dependencias innecesarias;
- reutilizar componentes;
- sincronizar datos entre dispositivos;
- mantener trazabilidad;
- permitir evolución durante varios cursos escolares;
- conservar compatibilidad con GitHub Pages.

## 2.5 Alcance

La Academia integra dos grandes caminos:

### Mi Universo

Espacios funcionales y personales para leer, escribir, crear, resolver, planificar y crecer.

### Mis Cursos

Contenido escolar organizado por curso, asignatura y tema.

Ambos caminos deben conectarse: un contenido de curso puede derivar en una experiencia de
lectura, una misión, un detective matemático o una actividad creativa.

---

# 3. ADN, filosofía y principios pedagógicos

## 3.1 Principio rector

> **¿Esto ayuda realmente al alumno?**

Toda decisión de diseño, arquitectura o funcionalidad debe responder afirmativamente a esa
pregunta. Si una función es técnicamente atractiva pero añade presión, confusión o mantenimiento
sin beneficio educativo claro, debe posponerse o descartarse.

## 3.2 Filosofía de aprendizaje

La Academia sostiene que:

- cada persona aprende de una manera diferente;
- comprender importa más que correr;
- el error es una pista, no un fracaso;
- la motivación no debe depender de comparaciones;
- el progreso se compara con el propio camino;
- pedir ayuda es una habilidad positiva;
- la autonomía se construye gradualmente;
- aprender para el colegio y aprender para la vida son partes del mismo camino.

## 3.3 Diseño para necesidades de lenguaje y comprensión

El proyecto nació considerando necesidades asociadas al TEL. Por ello debe priorizar:

- frases claras y breves;
- instrucciones secuenciales;
- una idea principal por bloque;
- apoyos visuales;
- lectura pausada;
- reducción de elementos simultáneos;
- repetición amable;
- confirmaciones comprensibles;
- botones de detener, repetir y escuchar;
- retroalimentación concreta y no punitiva.

## 3.4 Colaboración

La Academia no pretende sustituir al colegio ni a los profesionales.

Su visión es formar una red:

- alumno;
- familia;
- tutoría;
- colegio;
- psicología;
- logopedia;
- Pedagogía Terapéutica;
- otros profesionales autorizados.

La información compartida deberá ser pertinente, respetuosa, controlada y orientada a objetivos
comunes.

## 3.5 Identidad narrativa

Las guacamayas, especialmente **Lía**, acompañan la experiencia.

Lía:

- orienta;
- anima;
- celebra;
- ayuda a comprender;
- nunca ridiculiza;
- no da automáticamente todas las respuestas;
- invita a observar, pensar y volver a intentar.

Las guacamayas simbolizan curiosidad, alegría, libertad, pertenencia y crecimiento.

---

# 4. Estado actual del proyecto

## 4.1 Estado global

El proyecto está activo y en evolución. La documentación histórica lo identifica como
“2.0 Cloud”, aunque los módulos internos tienen versiones independientes. No debe asumirse que
la numeración de un módulo representa la versión global del proyecto.

## 4.2 Infraestructura confirmada

| Componente | Estado | Observaciones |
|---|---|---|
| GitHub | Operativo | Repositorio oficial público. |
| GitHub Pages | Operativo | Publicación desde `/academia-gloria/`. |
| Desarrollo local | Operativo | VS Code + Live Server / servidor local. |
| Firebase Authentication | Operativo | Protege páginas y vincula datos al usuario. |
| Cloud Firestore | Operativo | Persistencia principal de varios módulos. |
| API `Academia` | Operativa | Fachada común para eventos, biblioteca, lectura y tareas. |
| Perfil de usuario | Operativo | Nombre, nombre visible, avatar, curso y otras propiedades. |
| Panel de usuario | Operativo | Menú de perfil, Mi Camino, cierre de sesión y navegación. |
| Navegación contextual | Operativa | Uso de parámetro `volver` y rutas alternativas. |

## 4.3 Módulos funcionales

### Calendarios

- calendario escolar;
- calendarios personales por año;
- almacenamiento cloud de eventos;
- sincronización entre dispositivos;
- acceso asociado al usuario autenticado.

### Biblioteca Encantada

- catálogo de libros;
- filtros;
- carátulas;
- audio y transcripción en evoluciones recientes;
- conexión conceptual con Mi Rincón de Lectura;
- historial y seguimiento de libros.

### Mi Rincón de Lectura

Módulo de alta madurez que permite:

- elegir historias;
- leer;
- grabar voz;
- detener y repetir;
- transcribir mediante reconocimiento del navegador;
- comparar texto objetivo con lo entendido;
- ofrecer valoración;
- guardar sesiones;
- consultar historial;
- registrar y actualizar observaciones familiares;
- eliminar registros cuando corresponde.

### Detectives de Problemas

Permite trabajar comprensión de problemas antes del cálculo:

1. comprender la historia;
2. descubrir qué se pregunta;
3. elegir operación;
4. resolver;
5. celebrar.

Dispone de niveles, temas, casos simples y compuestos, ayudas visuales, audio y retroalimentación.

### Mi Camino

Es el espacio personal del alumno. Integra:

- Mi aventura de hoy;
- misiones activas;
- Mi Seguimiento;
- Mis Tareas;
- Mis Logros, todavía en preparación;
- Mi Constancia, todavía en preparación;
- El Árbol de Mi Camino.

En la revisión más reciente se decidió colocar **El Árbol de Mi Camino al final**, después del
seguimiento, para que funcione como cierre emocional y representación del crecimiento.

### Mis Tareas

Dispone de:

- lista de tareas;
- filtros;
- creación y edición;
- estados;
- misión visible para el alumno;
- iconos;
- título y descripción de misión;
- planificación;
- acompañamiento;
- orden manual de misiones;
- reapertura de tareas completadas;
- resultado de la tarea en versión MVP.

La interfaz 2.0 reorganizó el formulario en acordeones:

1. Información básica;
2. Cómo lo verá el alumno;
3. Planificación;
4. Acompañamiento;
5. Resultado de la tarea.

### Descubre la Academia

Módulo de presentación estratégica y pedagógica. Explica:

- qué es la Academia;
- filosofía;
- Mi Universo y Mis Cursos;
- red de colaboración;
- camino de aprendizaje;
- significado de las guacamayas;
- apertura del proyecto a otros alumnos.

Este contenido debe considerarse una fuente principal de lenguaje institucional.

## 4.4 Funcionalidades en preparación o simuladas

No deben presentarse como datos reales:

- Mis Logros;
- Mi Constancia;
- crecimiento automático del árbol;
- estadísticas avanzadas;
- recomendaciones automáticas;
- rol profesional;
- IA educativa integrada;
- panel de evolución completo.

Las pantallas que muestran ejemplos deben mantener visible la etiqueta
**“En preparación”** o equivalente.

## 4.5 Punto exacto al finalizar el chat

### Últimas mejoras completadas

La línea v2.3 consolidó varios hitos relevantes:

1. **Sistema de Misiones** maduro para Detectives y Lectura.
2. **Mi Rincón de Lectura** integrado con tareas/misiones, evidencias y revisión familiar.
3. Estados coherentes entre alumno y familia, incluido `pendiente_validacion`.
4. Historial compacto de lecturas: grabación visible y detalles secundarios comprimidos.
5. Navegación global jerárquica y reutilizable, incluida la portada raíz.
6. Nuevos contenidos:
   - 6 lecturas en español: 3 de nivel 1, 2 de nivel 2 y 1 de nivel 3;
   - 9 nuevos casos de Detectives: 6 de nivel 1 y 3 de nivel 2;
   - corrección visual del caso de excursión para mostrar niños, grupos y botellas.
7. Gestión de tareas mejorada:
   - tarjetas inicialmente comprimidas;
   - filtros en orden Activas, Completadas y Todas;
   - títulos automáticos y coherentes;
   - fechas predeterminadas;
   - evidencias y acceso a resoluciones;
   - eliminación controlada y revisión del impacto sobre actividades relacionadas.

### Desarrollo inmediato pendiente

**Evolución de la portada principal — candidata UX v4.**

La idea ya fue analizada, diseñada y prototipada. Falta integrarla sobre la versión vigente del
repositorio y completar pruebas de regresión.

Cambios acordados:

1. hero más plano y compacto;
2. `Observo · Comprendo · Practico` en una franja de menor altura;
3. eliminar botones independientes de `Conocer la Academia` y `Continuar mi Camino`;
4. usar las tarjetas completas como enlaces accesibles;
5. mantener las guacamayas como identidad visual, no como único control de navegación;
6. bloque `Continúa tu aventura` compacto;
7. mensaje dinámico según el estado real de las misiones;
8. conservar intacto el concepto `Dos caminos para aprender`.

Archivo candidato producido en el chat:

```text
index_pagina_principal_mi_camino_dinamico_compacto_v4.html
```

Debe compararse con el `index.html` actual antes de sustituirlo.

# 5. Arquitectura técnica

## 5.1 Visión general

```text
Navegador
   │
   ├── HTML de cada módulo
   ├── CSS local + CSS compartido
   └── JavaScript ES6
          │
          ├── perfil-usuario.js
          ├── panel-usuario.js
          ├── navegacion.js
          ├── auth-guard.js
          └── api/academia.js
                   │
                   ├── Firebase Authentication
                   └── Cloud Firestore
```

## 5.2 Frontend

Tecnologías:

- HTML5;
- CSS3;
- JavaScript ES6;
- módulos `type="module"`;
- Lucide Icons en algunas páginas;
- Web Speech API para síntesis y reconocimiento;
- SVG inline para ilustraciones;
- `details/summary` para acordeones accesibles.

No existe un framework frontend principal. La decisión implícita y práctica ha sido mantener una
arquitectura estática modular, adecuada para GitHub Pages.

## 5.3 Backend y persistencia

Firebase proporciona:

- autenticación;
- base de datos Firestore;
- identidad por `uid`.

Los datos se organizan normalmente bajo:

```text
usuarios/{uid}/...
```

Esto garantiza separación por usuario y sincronización entre dispositivos.

## 5.4 Hosting

GitHub Pages sirve los archivos estáticos desde el repositorio.

Consecuencias:

- las rutas deben funcionar bajo el prefijo `/academia-gloria/`;
- no debe asumirse despliegue en la raíz del dominio;
- las rutas absolutas deben incluir el prefijo o construirse dinámicamente;
- no existe backend propio ejecutable en GitHub Pages;
- toda lógica de servidor se delega en Firebase.

## 5.5 Desarrollo local

Entorno habitual:

- Windows;
- Visual Studio Code;
- estructura local similar a:
  `C:\Users\jpperdomo\JP\Personales\Gloria\GitHub\academia-gloria`;
- Live Server, normalmente `http://127.0.0.1:5500/`.

El código debe funcionar tanto localmente como publicado.

## 5.6 Dependencias externas relevantes

- Firebase Web SDK;
- Google Fonts: Outfit;
- Lucide;
- APIs del navegador:
  - `SpeechRecognition` / `webkitSpeechRecognition`;
  - `speechSynthesis`;
  - `localStorage` o `sessionStorage` solo para estados de interfaz, no como persistencia principal de dominios cloud.

---

# 6. Organización del repositorio

La estructura documentada y evolucionada es:

```text
academia-gloria/
│
├── index.html
├── login.html
├── README.md
│
├── adicionales/
├── assets/
│   ├── identidad/
│   ├── iconos/
│   ├── img/
│   ├── audio/
│   └── video/
│
├── calendarios/
│   └── gloria/
│       ├── 2025.html
│       ├── 2026.html
│       └── 2027.html
│
├── compartido/
│   ├── api/
│   │   └── academia.js
│   ├── componentes/
│   ├── css/
│   │   ├── academia-base.css
│   │   └── panel-usuario.css
│   ├── firebase/
│   │   └── firebase-config.js
│   ├── js/
│   │   ├── auth-guard.js
│   │   ├── navegacion.js
│   │   ├── panel-usuario.js
│   │   ├── perfil-usuario.js
│   │   └── sesion.js
│   ├── modelos/
│   └── templates/
│
├── cursos/
│   ├── 5to/
│   └── 6to/
│
├── descubre-la-academia/
│   ├── index.html
│   ├── contenido.json
│   └── guia.js
│
├── docs/
│   ├── README.md
│   ├── project/
│   ├── modelos/
│   ├── standards/
│   ├── etapas/
│   ├── habilidades/
│   ├── mi-universo/
│   └── OLD/
│
├── mi-universo/
│   ├── index.html
│   ├── mi-camino/
│   ├── mis-tareas/
│   ├── biblioteca/
│   ├── rincon-lectura/
│   ├── escritora/
│   └── aventuras-matematicas/
│       └── detectives/
│
└── OLD/
```

> **Nota de verificación:** la estructura exacta debe confirmarse contra la rama principal antes
> de modificar documentación. Los documentos anteriores de proyecto estaban desactualizados
> respecto a módulos ya construidos.

## 6.1 Principios de organización

- responsabilidad única por carpeta;
- recursos compartidos centralizados;
- módulos funcionales independientes;
- documentación separada del código;
- históricos en `OLD/`;
- no duplicar lógica que ya existe en `compartido/`.

---

# 7. Núcleo compartido

## 7.1 `firebase-config.js`

Responsabilidad:

- inicializar Firebase;
- exportar `app`, `db` y `auth`.

No debe duplicarse la inicialización Firebase dentro de cada módulo.

## 7.2 `auth-guard.js`

Expone `protegerPagina(...)`.

Responsabilidad:

- esperar estado de autenticación;
- redirigir a login cuando no existe sesión;
- preservar, cuando aplique, la ruta de retorno.

## 7.3 `perfil-usuario.js`

Responsabilidades observadas:

- esperar autenticación;
- obtener usuario;
- construir perfil predeterminado;
- normalizar perfil;
- cachear perfil;
- obtener:
  - nombre;
  - nombre visible;
  - avatar;
  - idioma;
  - curso;
  - colegio;
  - tipo de usuario;
  - iniciales;
  - saludo;
- cerrar sesión;
- observar sesión.

Regla importante:

> No escribir “Gloria” de forma fija cuando el texto representa al usuario actual.

Usar datos del perfil, preferiblemente:

- `nombreCompleto`;
- `nombreVisible`;
- `nombre`;
- valor alternativo neutral: `Alumno`, `Explorador` o equivalente.

## 7.4 `panel-usuario.js`

Construye el panel desplegable de usuario.

Funciones conceptuales:

- detectar base de la Academia;
- construir URLs seguras;
- renderizar carga;
- crear menú;
- abrir/cerrar;
- posicionar en ventana;
- destruir y reinicializar.

Opciones habituales:

- Inicio;
- Mi Camino;
- perfil o inicio de sesión;
- cerrar sesión.

La versión funcional más reciente debe ser tomada del repositorio, no de archivos históricos
aislados.

## 7.5 `navegacion.js`

Se consolidó como módulo único de navegación contextual. Debe evitarse crear variantes redundantes
como `navigation.js`.

Convención:

```html
<a
  data-volver-modulo
  data-ruta-alternativa="../"
  href="../"
>
  Volver
</a>
```

El módulo interpreta el parámetro:

```text
?volver=<ruta codificada>
```

y utiliza la ruta alternativa si no es válida o no está presente.

## 7.6 `api/academia.js`

Es la fachada de acceso a datos.

Dominios confirmados:

- eventos;
- biblioteca;
- audio de libros;
- perfil;
- sesiones de lectura;
- tareas.

Expone dos objetos históricos:

- `AcademiaDB`;
- `Academia`.

La nueva IA debe inspeccionar la exportación exacta antes de consumirla, porque distintas páginas
pueden utilizar nombres antiguos o modernos.

---

# 8. Modelo de datos

## 8.1 Principio general

Los datos del alumno se organizan por usuario autenticado:

```text
usuarios/{uid}
```

y subcolecciones por dominio.

## 8.2 Perfil

```text
usuarios/{uid}
```

Campos comunes esperados:

```javascript
{
  nombre: "Gloria",
  nombreCompleto: "Gloria Valentina ...",
  nombreVisible: "Gloria",
  avatar: "...",
  idioma: "es",
  curso: "6to",
  colegio: "Gaudem",
  tipoUsuario: "alumno"
}
```

Los campos reales deben normalizarse porque los perfiles históricos pueden no contener todos.

## 8.3 Eventos

```text
usuarios/{uid}/eventos/{eventoId}
```

Responsabilidades:

- eventos por año;
- creación;
- actualización;
- eliminación;
- observación en tiempo real.

Campos exactos deben verificarse en `Academia.eventos`.

## 8.4 Biblioteca

```text
usuarios/{uid}/biblioteca/{libroId}
```

Campos funcionales habituales:

- título;
- autor;
- estado;
- portada;
- fecha;
- favorito;
- comentarios;
- datos de audio o referencia.

Audio asociado:

```text
usuarios/{uid}/biblioteca/{libroId}/...
```

o documento específico según la implementación actual de `documentoAudioLibro`.

No cambiar la ruta sin migración.

## 8.5 Sesiones de lectura

```text
usuarios/{uid}/sesionesLectura/{historiaId o sesionId}
```

Información funcional:

- historia;
- fecha;
- audio o referencia;
- transcripción;
- análisis;
- observación familiar;
- valoración;
- actualizaciones posteriores.

Debe revisarse la clave exacta usada por la implementación, porque algunas versiones históricas
eliminaban por `historiaId`.

## 8.6 Tareas

```text
usuarios/{uid}/tareas/{tareaId}
```

Modelo consolidado:

```javascript
{
  alumnoId: "uid",
  titulo: "Realizar cinco retos",
  descripcion: "Realizar cinco aventuras de nivel 1.",
  tipo: "actividad_modulo",
  modulo: "detectives",
  destinoUrl: "/mi-universo/aventuras-matematicas/detectives/",
  objetivo: "Comprender el problema antes de calcular.",
  criterioFinalizacion: "Completar cinco casos.",
  fechaInicio: "2026-07-27",
  fechaLimite: "2026-08-02",
  tiempoEstimadoMinutos: 15,
  prioridad: "normal",

  estado: "pendiente",
  visibleParaAlumno: true,
  ordenMision: 1,

  asignadaPor: {
    uid: "uid-adulto",
    rol: "familia",
    nombreVisible: "Familia"
  },

  presentacionAlumno: {
    tituloMision: "Misión de detectives",
    descripcion: "Realiza cinco casos de nivel 1.",
    mensaje: "Lía te acompaña.",
    icono: "🧩"
  },

  progreso: {
    iniciadaEn: null,
    completadaEn: null,
    tiempoRealMinutos: null,
    intentos: 0
  },

  evidencia: {
    tipo: null,
    modulo: null,
    referenciaId: null,
    resumen: null
  },

  observacionActual: "",
  historialObservaciones: [],

  resultado: {
    fechaFinalizacion: "",
    observaciones: "",
    masDeLoEsperado: false,
    necesitoAyuda: false,
    convieneRepetir: false
  },

  creadaEn: "serverTimestamp",
  actualizadaEn: "serverTimestamp"
}
```

### Estados

```text
pendiente
en_curso
completada_pendiente_validacion
completada
necesita_ayuda
vencida
cancelada
```

Presentación amable:

| Estado interno | Texto para el alumno |
|---|---|
| `pendiente` | 🌱 Preparada |
| `en_curso` | ▶️ En aventura |
| `completada_pendiente_validacion` | ✨ Esperando celebración |
| `completada` | ✅ Conseguida |
| `necesita_ayuda` | 🤝 Necesito ayuda |
| `vencida` | 🌿 Podemos retomarla |
| `cancelada` | No se muestra |

### Historial futuro / recomendado

```text
usuarios/{uid}/tareas/{tareaId}/historial/{eventoId}
```

Eventos:

- creada;
- modificada;
- iniciada;
- ayuda solicitada;
- completada;
- validada;
- observación añadida;
- reabierta;
- cancelada.

### Ejecuciones futuras

El estándar STD-012 propone:

```text
usuarios/{uid}/tareas/{tareaId}/ejecuciones/{ejecucionId}
```

No se debe asumir que esta subcolección ya está implementada. El MVP actual guarda un único
objeto `resultado` en la tarea.

## 8.7 Índices y reglas

Las reglas actualmente aplicadas fueron mantenidas principalmente desde la consola de Firebase.
La versión comunicada en el chat es:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function esPropietario(userId) {
      return request.auth != null
        && request.auth.uid == userId;
    }

    match /usuarios/{userId}/{documento=**} {
      allow read, write: if esPropietario(userId);
    }
  }
}
```

Esta regla protege el documento principal del usuario y todas sus subcolecciones internas. Debe
crearse o sincronizarse un archivo versionado `firestore.rules` dentro del proyecto Firebase para
evitar que la consola sea la única fuente.

No existe todavía confirmación equivalente para `firestore.indexes.json`. Antes de proponer
consultas compuestas, revisar índices reales en Firebase.

Los roles profesionales futuros requerirán autorización explícita; no deben resolverse compartiendo
credenciales del alumno.

---

# 9. Diseño funcional por módulo

## 9.1 Login e inicio

La URL canónica para compartir es:

```text
https://jperdomo12.github.io/academia-gloria/
```

`index.html` es la entrada natural. `login.html` es un detalle técnico de autenticación.

Comportamiento esperado:

- si no hay sesión, redirigir a login;
- tras iniciar sesión, respetar destino;
- no saltarse innecesariamente pantallas de orientación;
- mantener una experiencia consistente entre local y GitHub Pages.

## 9.2 Portada

La portada debe conservar dos funciones complementarias:

1. **emocionar y presentar la Academia** mediante el hero, la identidad y las guacamayas;
2. **orientar el uso diario** mediante un acceso inmediato a `Mi Camino`.

Orden conceptual acordado:

1. hero `Academia Gloria Valentina`, ligeramente compacto;
2. tarjeta completa `Descubre la Academia`;
3. tarjeta completa y dinámica `Continúa tu aventura`;
4. `Dos caminos para aprender`;
5. `Mi Universo` y `Mis Cursos`;
6. módulos secundarios y cierre motivador.

### Evolución UX acordada

- No rediseñar: **evolucionar** la portada existente.
- Mantener colores, degradados, guacamayas y personalidad.
- Aplanar hero, bienvenida interna y método visual.
- Convertir las tarjetas completas en enlaces; no depender de botones internos.
- Mantener foco visible, semántica de enlace y soporte `prefers-reduced-motion`.
- La guacamaya puede reforzar el destino, pero no ser el único elemento pulsable.

### Bloque dinámico `Continúa tu aventura`

Debe mostrar una sola prioridad, sin convertirse en panel estadístico:

| Condición | Mensaje orientativo |
|---|---|
| `necesita_ayuda` | La familia ya sabe que el alumno necesita ayuda. |
| `en_curso` | Continúa la aventura que ya comenzó. |
| `pendiente` | Hoy le esperan nuevas misiones. |
| `pendiente_validacion` | La familia revisará la misión. |
| Sin misiones activas | Puede explorar libremente la Academia. |

La tarjeta completa navega a:

```text
mi-universo/mi-camino/
```

La consulta debe hacerse mediante `Academia.tareas`, después de autenticación y carga del perfil.

## 9.3 Mi Universo

Es el portal de habilidades y experiencias transversales. Debe incluir panel de usuario, favicon,
navegación contextual y acceso a módulos.

## 9.4 Mi Camino

Orden actual recomendado:

1. cabecera;
2. Mi aventura de hoy;
3. Mi seguimiento:
   - Mis Tareas;
   - Mis Logros;
   - Mi Constancia;
4. El Árbol de Mi Camino;
5. lema final.

### Mi aventura de hoy

- muestra como máximo tres misiones;
- respeta `ordenMision`;
- excluye completadas, canceladas y ocultas;
- cada misión debe mostrar su descripción real;
- cada tarjeta enlaza al módulo correcto;
- si no hay misiones, Lía muestra un estado amable.

### Mi seguimiento

#### Tareas activas

Acordeón inicialmente cerrado.

#### Tareas completadas recientemente

Acordeón inicialmente cerrado.

Terminología exacta:

- **Tareas activas (N)**
- **Tareas completadas recientemente (N)**

Acción:

- **Preparar una tarea**, no “Crear una tarea”.

#### Logros y Constancia

Deben permanecer marcados como “En preparación” mientras los datos sean de ejemplo.

### Árbol

Actualmente visual y orientativo.

Etapas:

- Semilla;
- Brote;
- Árbol.

No presentar porcentajes como reales si todavía no están calculados.

## 9.5 Mis Tareas

### Vista de lista

- filtros;
- tarjetas;
- acciones;
- orden de misiones;
- completar;
- reabrir;
- observaciones;
- resultado.

### Formulario

Acordeones:

1. Información básica;
2. Cómo lo verá el alumno;
3. Planificación;
4. Acompañamiento;
5. Cuando termine / Resultado de la tarea.

### Resultado MVP

- fecha y hora automática;
- editable;
- observaciones;
- hizo más de lo esperado;
- necesitó ayuda;
- conviene repetir.

Ejemplo real que motivó la función:

> Se asignaron 5 retos y el alumno realizó 10, todos de nivel 1.

### Reapertura

Al reabrir:

- estado vuelve a `en_curso`;
- no debe desaparecer el resultado previo sin intención;
- la tarea puede volver a aparecer como misión;
- la evolución futura debe preservar ejecuciones históricas.

## 9.6 Detectives de Problemas

### Objetivo pedagógico

Comprender antes de calcular.

### Flujo

1. Comprendo;
2. Descubro;
3. Elijo;
4. Resuelvo.

### Datos de caso

Cada caso contiene:

```javascript
{
  id,
  titulo,
  texto,
  nivel,
  tema,
  tipo,
  comprension: {
    pregunta,
    opciones: [{ id, texto }],
    correcta
  },
  descubrimiento: {
    pregunta,
    opciones: [{ id, texto }],
    correcta
  },
  pasos: [{
    pregunta,
    operacion,
    a,
    b,
    resultado,
    visual
  }],
  activo
}
```

### Niveles actuales

- Nivel 1 · Sencillo;
- Nivel 2 · Con pistas;
- Nivel 3 · Compuesto.

### Estado consolidado posterior

Las funciones inicialmente previstas para v2.1 fueron superadas por versiones posteriores:

- selección de 5, 10, 15, todas o una cantidad válida personalizada;
- selección por nivel;
- posibilidad de misiones con menos de cinco historias;
- historias barajadas sin repetición dentro de la sesión;
- opciones de respuesta en orden variable;
- operaciones y operandos explícitos;
- historias simples y compuestas;
- integración con Misiones;
- solicitud `Necesito ayuda`;
- evidencias y acceso familiar a la resolución;
- celebración final con recursos de identidad;
- retorno coherente a `Mi Camino`;
- contenido adicional en niveles 1 y 2.

Reglas de presentación consolidadas:

- no mostrar `Historia resuelta` cuando solo termina una parte de una historia compuesta;
- utilizar `Historia resuelta` únicamente al completar la historia completa;
- distinguir práctica libre de misión asignada;
- evitar botones duplicados con el mismo destino;
- mostrar estado de misión como información, no como control;
- asegurar que las rutas de evidencia respeten la ubicación real bajo
  `mi-universo/aventuras-matematicas/detectives/`.

Corrección de contenido reciente:

- el caso de excursión con 24 niños, 4 grupos y 2 botellas por grupo debe mostrar niños, grupos y
  botellas, nunca mesas y vasos.

## 9.7 Mi Rincón de Lectura

### Objetivos visibles

- practicar lectura;
- escuchar;
- grabar;
- comparar;
- mejorar.

### Objetivos invisibles

- confianza;
- autocorrección;
- atención;
- expresión;
- tolerancia al error;
- autonomía.

### Integración con Misiones

Mi Rincón de Lectura ya participa en el ciclo de misiones:

1. la familia prepara una misión de lectura;
2. la misión queda inicialmente `pendiente`, igual que en Detectives;
3. el alumno entra con `misionId` y contexto de retorno;
4. la lectura seleccionada queda asociada a la misión;
5. al finalizar se genera evidencia;
6. la tarea pasa a `pendiente_validacion`;
7. el alumno ve que la acción pendiente corresponde a la familia;
8. la familia puede abrir la lectura asociada y revisar el registro guardado;
9. el cierre requiere confirmación.

El historial fue compactado:

- cabecera, indicadores y grabación permanecen visibles;
- análisis, comprensión, reflexión y observaciones familiares aparecen dentro de detalles;
- los subbloques están inicialmente cerrados;
- varias lecturas deben poder verse sin ocupar toda la pantalla.

El catálogo incluye filtros por idioma y nivel, y cada lectura puede mostrar una marca que indique si
el alumno ya tiene un registro previo.

### Reconocimiento de voz

Se utiliza Web Speech API. Lección importante:

- el reconocimiento puede variar por perfil de Chrome y control parental;
- se documentó un caso en el que español fallaba solo en un usuario supervisado;
- inglés y francés funcionaban;
- Google Translate y dictation.io reproducían el mismo fallo;
- el problema no era el código de la Academia;
- solución temporal: usar otro perfil de Chrome;
- no invertir más esfuerzo hasta que sea prioritario.

La interfaz debe mostrar claramente cuando la transcripción automática está disponible.

## 9.8 Biblioteca Encantada

Debe mantener:

- catálogo;
- filtros;
- registro de libros;
- carátulas;
- audio;
- transcripción;
- acceso a “Cuéntaselo a Lía”;
- integración con historial y lectura.

Lección: cambios de interfaz pueden ocultar datos o filtros si se reemplaza HTML sin preservar
IDs y lógica. Siempre validar catálogo y filtros después de actualizar.

## 9.9 Descubre la Academia

Debe mantenerse como contenido institucional reutilizable.

Ideas clave:

- espacio que crece con cada alumno;
- no sustituye colegio ni profesionales;
- Mi Universo y Mis Cursos;
- red de acompañamiento;
- comprender antes que memorizar;
- motivación sin presión;
- autonomía;
- progreso individual;
- proyecto abierto.

---

# 10. Diseño técnico y flujo de datos

## 10.1 Patrón de inicialización de página

Patrón recomendado:

```javascript
import { protegerPagina } from ".../auth-guard.js";
import { iniciarPanelUsuario } from ".../panel-usuario.js";
import { obtenerPerfil } from ".../perfil-usuario.js";
import { Academia } from ".../api/academia.js";

await protegerPagina(...);
const perfil = await obtenerPerfil();
await iniciarPanelUsuario(...);
```

Después:

- personalizar textos;
- registrar listeners;
- suscribirse a Firestore;
- renderizar estado de carga;
- gestionar errores.

## 10.2 Observación en tiempo real

Para dominios con cambios frecuentes se utiliza `onSnapshot` encapsulado por la API:

```javascript
const cancelar = Academia.tareas.observar(
  tareas => render(tareas),
  error => mostrarError(error)
);
```

Al salir, cancelar suscripciones cuando la página lo requiera.

## 10.3 Normalización

La API debe normalizar:

- valores ausentes;
- strings;
- booleanos;
- fechas;
- estructuras anidadas;
- datos de versiones anteriores.

No confiar en que todos los documentos antiguos tengan el esquema actual.

## 10.4 IDs y selectores

La lógica existente depende de IDs concretos. Al rediseñar una página:

1. inventariar IDs;
2. identificar listeners;
3. preservar `data-*`;
4. preservar rutas;
5. probar carga, creación, edición y eliminación.

## 10.5 Datos de interfaz

Puede usarse `sessionStorage` para:

- recordar acordeones abiertos durante la sesión;
- conservar filtros temporales;
- estado de navegación no crítico.

No usarlo como fuente principal de tareas, libros o eventos.

## 10.6 Manejo de errores

Mensajes:

- claros;
- no técnicos para el alumno;
- detallados en consola para desarrollo;
- sin culpar al usuario.

Ejemplo:

```text
No pudimos guardar este momento todavía.
Revisa la conexión y vuelve a intentarlo.
```

---

# 11. Decisiones arquitectónicas importantes

## ADR-001 — Arquitectura por dominios

Separar cursos, habilidades, Mi Universo, compartido, assets y docs.

## ADR-002 — `index.html` en raíz

La entrada principal permanece en la raíz por compatibilidad con GitHub Pages.

## ADR-003 — Separación por cursos

`cursos/5to`, `cursos/6to`, etc.

## ADR-004 — Documentación en `docs/`

La raíz debe permanecer limpia.

## ADR-005 — Assets centralizados

Evitar copias de imágenes y recursos.

## ADR-006 — Componentes reutilizables

Panel, navegación, perfil, estilos y API compartidos.

## ADR-007 — Migración segura

```text
Copiar → Validar → Certificar → Eliminar
```

Nunca mover/eliminar primero.

## ADR-008 — Academia como ecosistema

No tratarla como páginas independientes.

## ADR-009 — Firebase como backend

Elimina dependencia de un navegador específico y permite sincronización.

## ADR-010 — Tarea y misión no son conceptos idénticos

- Tarea: definición adulta.
- Misión: presentación motivadora al alumno.

## ADR-011 — Navegación contextual

Los módulos invocados desde distintos lugares deben regresar al origen mediante `volver`.

## ADR-012 — Terminología “Preparar una tarea”

Se prefiere a “Crear” por coherencia con la experiencia familiar.

## ADR-013 — Nombre dinámico del alumno

No fijar “Gloria” en componentes reutilizables.

## ADR-014 — Resultado MVP antes de modelo complejo

Se eligió:

- fecha;
- observación;
- tres indicadores;

en lugar de construir de inmediato ejecuciones, evidencias y recomendaciones complejas.

## ADR-015 — El Árbol al final de Mi Camino

Funciona mejor como cierre narrativo y emocional.

## ADR-016 — Acordeones nativos o accesibles

Reducen longitud visual y complejidad.

## ADR-017 — Entregas completas en ZIP

Para cambios relevantes:

- paquete completo;
- estructura de carpetas;
- JS como `.js.txt` cuando la descarga directa falla;
- archivo de instrucciones.

## ADR-018 — Repositorio oficial

GitHub es la fuente principal. No basarse exclusivamente en copias sueltas del chat.


## ADR-019 — Evolucionar antes que rediseñar

Cuando una necesidad puede resolverse refinando una estructura funcional existente, se evita crear
una pantalla o bloque paralelo. La portada principal es el ejemplo vigente.

## ADR-020 — Tarjetas completas como navegación principal

En la portada, `Descubre la Academia` y `Continúa tu aventura` pueden funcionar como enlaces
completos. Esto reduce altura, evita botones redundantes y mejora la superficie táctil, siempre que
se preserve foco visible y semántica de enlace.

## ADR-021 — Mi Camino como acceso cotidiano del alumno

`Mi Universo` y `Mis Cursos` siguen siendo los dos grandes caminos conceptuales. `Mi Camino` no es
un tercer camino: es el punto de entrada diario que organiza misiones, progreso y próximos pasos.

## ADR-022 — Mensajes dinámicos breves, no paneles sobrecargados

La portada puede consultar tareas para orientar al alumno, pero debe mostrar una sola prioridad
motivadora. No convertir el acceso principal en un tablero estadístico.

## ADR-023 — Documentar soluciones consolidadas

La documentación acompaña al producto y no debe frenar el desarrollo. Se evita crear un documento
nuevo cuando la información puede integrarse coherentemente en uno existente. Cada documento
importante mantiene versión, estado e historial breve al principio.


---

# 12. Historial de problemas y lecciones aprendidas

## 12.1 Conversaciones demasiado largas sin entrega

Problema:

- análisis repetido;
- confirmaciones sucesivas;
- “lo voy a hacer” sin producir artefacto.

Lección:

- una o dos interacciones de análisis;
- cerrar alcance;
- entregar;
- no volver a enumerar lo acordado.

## 12.2 Afirmar limitaciones inexistentes

En el chat se indicó erróneamente que no era posible editar archivos grandes o crear ZIP, aunque
ya se había realizado antes.

Lección:

- utilizar herramientas de archivos;
- inspeccionar el archivo montado;
- generar artefactos reales;
- no prometer trabajo futuro sin ejecutar.

## 12.3 Archivos JS con problemas de descarga

Solución acordada:

```text
archivo.js.txt → renombrar a archivo.js
```

Mantener esta convención cuando sea necesaria.

## 12.4 Duplicidad `navegacion.js` / `navigation.js`

Se decidió consolidar en:

```text
compartido/js/navegacion.js
```

No recrear un segundo módulo equivalente.

## 12.5 Regreso a pantalla fija

Módulos afectados históricamente:

- Aventuras Matemáticas;
- Rincón de Lectura;
- Biblioteca;
- Escritora;
- Detectives.

Solución:

- parámetro `volver`;
- `data-volver-modulo`;
- ruta alternativa.

## 12.6 Datos desaparecidos tras cambio visual

En Biblioteca, un cambio hizo que no aparecieran libros ni filtros.

Causa probable:

- sustitución de estructura sin conservar selectores o flujo de carga.

Prevención:

- pruebas de regresión;
- preservar IDs;
- validar datos reales antes de aprobar.

## 12.7 Reconocimiento de voz en Chrome supervisado

Síntoma:

| Perfil | Español | Inglés |
|---|---:|---:|
| Usuario supervisado | No | Sí |
| Otro usuario | Sí | Sí |

Se reprodujo fuera de la Academia.

Conclusión:

- problema del perfil/navegador/servicio;
- no del módulo.

Solución temporal:

- usar otro perfil.

## 12.8 Tareas completadas por error

Se añadió:

```text
↩️ Volver a En aventura
```

No eliminar datos de forma destructiva al reabrir.

## 12.9 Animaciones excesivas

Las guacamayas se probaron con trayectorias complejas y se descartó.

Versión preferida:

```css
@keyframes guacamayaUno{
  0%,100%{transform:translateY(4px) rotate(-3deg)}
  50%{transform:translateY(-8px) rotate(3deg)}
}

@keyframes guacamayaDos{
  0%,100%{transform:scaleX(-1) translateY(-4px) rotate(-3deg)}
  50%{transform:scaleX(-1) translateY(8px) rotate(3deg)}
}
```

Lección: el paisaje acompaña; no debe distraer.

## 12.10 Documentación desactualizada

Los documentos MASTER_PLAN, ROADMAP y PROJECT_MAP de julio no reflejaban varios módulos ya
implementados.

Lección:

- distinguir documento histórico de estado actual;
- actualizar documentación con cada versión;
- usar este documento como índice maestro, no como excusa para dejar obsoletos los específicos.

---


## 12.11 Separar análisis de ejecución

Se acordó una proporción orientativa:

- análisis: máximo 15 %;
- desarrollo, entrega, pruebas y ajustes: 85 %.

Una vez aprobado el alcance, la IA debe ejecutar con herramientas y entregar el artefacto, no seguir
repitiendo la planificación.

## 12.12 No prometer trabajo en segundo plano

La IA no continúa desarrollando entre mensajes. Debe generar el archivo o ZIP en la misma
interacción en la que afirma entregarlo. Si falta un archivo base, pedirlo una sola vez.

## 12.13 Los ZIP no deben contener `.js.txt`

Cuando un JavaScript se entrega dentro de ZIP, incluir únicamente `.js`. La extensión `.js.txt` se
reserva para descargas directas desde el chat cuando exista un problema real de descarga.

## 12.14 La portada no debe convertirse en una lista de tareas

Aunque `Mi Camino` sea el acceso cotidiano, el hero debe conservar emoción, color, bienvenida y
presencia de las guacamayas. La orientación funcional no puede eliminar la sensación de universo.

# 13. Convenciones de desarrollo

## 13.1 Idioma

- interfaz: español;
- nombres técnicos: camelCase;
- textos para alumno: cercanos;
- comentarios: español claro.

## 13.2 JavaScript

- ES6;
- `const` por defecto;
- `let` solo cuando cambia;
- funciones pequeñas;
- `async/await`;
- manejo de errores;
- escapar HTML al construir plantillas;
- no mezclar persistencia directa si existe método en `Academia`.

## 13.3 HTML

- semántico;
- etiquetas `label`;
- `aria-live` para feedback;
- `aria-label` en controles;
- botones reales para acciones;
- enlaces para navegación;
- IDs estables;
- `data-*` para comportamiento reutilizable.

## 13.4 CSS

- mobile responsive;
- clases descriptivas;
- variables;
- no colores agresivos;
- `prefers-reduced-motion`;
- estados de foco;
- evitar CSS global que afecte otros módulos;
- animaciones suaves y funcionales.

## 13.5 Rutas

- verificar profundidad de carpeta;
- probar en local y GitHub Pages;
- no asumir `/`;
- preferir módulos de navegación compartidos.

## 13.6 Versionado

Los módulos pueden tener su propia versión.

Formato de paquete:

```text
Academia-Gloria-<Modulo>-vX.Y.zip
```

Contenido:

```text
ruta/real/del/archivo
CHANGELOG.md o LEEME.txt
```

## 13.7 Pruebas mínimas

Para cada página:

- carga autenticada;
- carga sin sesión;
- móvil;
- escritorio;
- navegación de regreso;
- panel de usuario;
- datos reales;
- estado vacío;
- error de red;
- crear;
- editar;
- completar;
- reabrir;
- eliminar cuando aplique.

---

# 14. Seguridad, privacidad y colaboración profesional

## 14.1 Estado actual

Para una demostración con la psicóloga se planteó compartir temporalmente el usuario de Gloria.

Esto puede ser aceptable para una sesión controlada, pero no es la solución definitiva.

## 14.2 Recomendación

Crear roles y cuentas específicas:

```text
alumno
familia
profesional_invitado
administrador
```

Un profesional invitado debería:

- ver solo datos autorizados;
- no modificar configuración sensible;
- añadir observaciones profesionales;
- no acceder a credenciales del alumno;
- disponer de caducidad o revocación.

## 14.3 Datos sensibles

No almacenar innecesariamente:

- diagnósticos completos;
- credenciales;
- informes médicos sin control;
- datos de terceros.

Si se incorporan documentos profesionales, definir:

- consentimiento;
- propósito;
- retención;
- acceso;
- eliminación.

---

# 15. Documentación oficial

El README de documentación establece responsabilidad única:

| Documento | Pregunta |
|---|---|
| README | ¿Dónde está la documentación? |
| MASTER_PLAN | ¿Qué es la Academia y hacia dónde va? |
| PROJECT_MAP | ¿Cómo está organizado el proyecto? |
| ROADMAP | ¿Qué construiremos y cuándo? |
| CHANGELOG | ¿Qué ha cambiado? |
| DECISION_LOG | ¿Por qué se decidió? |
| Este documento | ¿Cómo comprender y continuar el sistema completo? |

La documentación ya supera varias decenas de archivos. La decisión vigente es **no multiplicar
documentos sin necesidad**.

Reglas:

1. antes de crear un archivo, preguntar dónde vive naturalmente esa información;
2. preferir actualizar un documento existente;
3. crear un documento independiente solo si tendrá identidad, mantenimiento y consulta propios;
4. cada documento importante incluye al principio:
   - versión;
   - fecha de última actualización;
   - estado;
   - historial breve;
5. la versión vive dentro del documento, no en el nombre del archivo;
6. nombres descriptivos, en mayúsculas y separados por `_` cuando corresponda;
7. evitar numeración `00_`, `01_` salvo que el orden secuencial sea parte esencial del significado;
8. los README de subcarpeta, si existen, deben ser muy breves y explicar únicamente qué información
   vive allí.

La reorganización documental quedó pausada hasta cerrar e implementar la evolución de la portada.

# 16. Pendientes priorizados

## P0 — Integrar y validar la nueva portada

**Prioridad:** crítica  
**Dificultad:** baja-media

Tareas:

- comparar el candidato v4 con el `index.html` vigente;
- integrar sin perder navegación global, autenticación ni panel de usuario;
- comprobar que `Academia.tareas.leer()` coincide con la API real;
- validar estados `pendiente`, `en_curso`, `necesita_ayuda` y `pendiente_validacion`;
- probar sin tareas y con error de red;
- probar escritorio, móvil, local y GitHub Pages;
- revisar que toda la tarjeta sea pulsable y accesible.

## P1 — Certificar versiones v2.3

- regresión de Misiones en Detectives;
- regresión de Misiones en Lectura;
- evidencias y rutas de resolución;
- cierre y reapertura de tareas;
- historial compacto;
- navegación global en todas las pantallas afectadas.

## P1 — Persistir configuración Firebase en repositorio

- crear o actualizar `firestore.rules`;
- revisar `firestore.indexes.json`;
- documentar despliegue de reglas;
- evitar dependencia exclusiva de la consola.

## P2 — Mantenimiento documental ligero

Después de cerrar portada:

- actualizar `docs/README.md`;
- definir convención de nombres;
- revisar solapamientos;
- introducir historial al principio de documentos importantes;
- no crear documentos nuevos salvo necesidad real.

## P2 — Seguimiento y calidad de datos

- historial de Detectives;
- ejecuciones de tarea cuando el MVP lo justifique;
- logros reales;
- constancia real;
- reglas transparentes para el Árbol.

## P3 — Profesionales e IA

- roles y permisos;
- profesional invitado;
- observaciones profesionales;
- tutor IA y recomendaciones solo con supervisión, privacidad y datos suficientes.

# 17. Hoja de ruta recomendada

## Fase 1 — Cerrar la portada evolucionada

Integrar, probar con Gloria y Anais, ajustar proporciones y publicar.

## Fase 2 — Uso real de Misiones en dos módulos

Durante varias semanas:

- observar Detectives y Lectura;
- registrar confusiones reales;
- revisar estados, evidencias y mensajes;
- evitar ampliar el modelo sin necesidad observada.

## Fase 3 — Certificar núcleo compartido

- login;
- perfil;
- panel;
- navegación global;
- API `Academia`;
- reglas;
- rutas local/GitHub Pages.

## Fase 4 — Mantenimiento documental 2.0

Ordenar sin inflar:

- README principal;
- nombres;
- historial de documentos;
- documentos obsoletos;
- responsabilidades claras.

## Fase 5 — Seguimiento basado en datos reales

- historial de Detectives;
- ejecuciones;
- logros;
- constancia;
- Árbol.

## Fase 6 — Colaboración profesional

Diseñar seguridad y permisos antes de interfaz.

## Fase 7 — IA educativa

Solo cuando existan datos, objetivos, controles familiares y criterios de privacidad suficientes.

# 18. Contexto relevante del propietario y forma de trabajo

## 18.1 Perfil técnico

Juan Perdomo:

- Ingeniero en Informática;
- más de 30 años de experiencia;
- especialista en sistemas de gestión de activos;
- IBM Maximo;
- gerencia de proyectos;
- experiencia suficiente para revisar arquitectura, código, versiones y decisiones.

La IA no debe simplificar excesivamente ni ocultar implicaciones técnicas.

## 18.2 Motivación

El proyecto tiene un alto valor personal y familiar. Nació para acompañar a Gloria y ha requerido
meses de trabajo. Debe tratarse con continuidad, respeto y rigor.

## 18.3 Preferencias de colaboración

- análisis útil y proporcionado, con referencia orientativa máxima del 15 % del esfuerzo;
- una o dos interacciones para cerrar decisiones;
- evitar repetir “lo haré”;
- una vez aprobado, desarrollar y entregar;
- paquetes ZIP completos;
- JS como `.js.txt` solo para descarga directa problemática; dentro de ZIP usar siempre `.js`;
- instrucciones claras de sustitución;
- calidad con acción concreta; evitar prolongar análisis cuando el alcance ya está aprobado;
- no añadir alcance sin aprobación;
- propuestas adicionales solo si aportan valor y sin bloquear la entrega.

## 18.4 Terminología

Aunque el nombre histórico es Academia Gloria Valentina:

- usar “alumna o alumno”, “alumnado” o “el alumno” en componentes generalizables;
- mantener el nombre de Gloria cuando se habla del origen, contenido personal o identidad del proyecto;
- obtener el nombre real desde perfil en interfaz.

---

# 19. Instrucciones para una nueva IA

## 19.1 Inicio obligatorio

Al comenzar un nuevo chat:

1. leer este documento completo;
2. solicitar o consultar la versión actual del repositorio;
3. identificar la ruta exacta del módulo;
4. comparar código actual con el estado documentado;
5. confirmar solo discrepancias reales.

## 19.2 Reglas de trabajo

- No rediseñar arquitectura sin necesidad.
- No crear módulos duplicados.
- No sustituir `navegacion.js`.
- No fijar “Gloria” en componentes generales.
- No perder IDs y listeners.
- No asumir que documentos históricos están actualizados.
- No afirmar que una función existe si solo está documentada como visión.
- No mostrar datos simulados como reales.
- No borrar datos al reabrir tareas.
- No convertir el error del alumno en castigo.
- No alargar la conversación después de aprobar el alcance.
- No prometer un ZIP: generarlo realmente.
- Entregar archivos dentro de su estructura de carpetas.

## 19.3 Criterio de propuestas

Una propuesta adicional es apropiada cuando:

- resuelve un riesgo evidente;
- cuesta poco;
- no altera alcance;
- mejora accesibilidad o mantenimiento.

Debe documentarse para futuro cuando:

- introduce nuevo modelo de datos;
- requiere migración;
- añade roles;
- cambia arquitectura;
- aumenta significativamente pruebas o mantenimiento.

## 19.4 Formato de entrega

Respuesta final esperada:

```text
Listo.

[Descargar paquete]

Archivos:
- ...
- ...

Instalación:
1. ...
2. ...

Cambios incluidos:
- ...
```

Sin volver a explicar durante varios párrafos lo que se iba a hacer.

## 19.5 Prueba de comprensión para la nueva IA

Antes de modificar código, debe poder responder:

1. ¿Qué diferencia hay entre tarea y misión?
2. ¿Cuál es la URL canónica?
3. ¿Por qué existe `volver`?
4. ¿Dónde viven los datos por usuario?
5. ¿Cuál es la prioridad inmediata de integración?
6. ¿Qué partes de Mi Camino son todavía ejemplos?
7. ¿Qué términos no deben fijarse?
8. ¿Cuál es la dinámica de colaboración preferida?

Respuestas:

1. tarea = definición adulta; misión = presentación al alumno;
2. `https://jperdomo12.github.io/academia-gloria/`;
3. para regresar al origen real;
4. bajo `usuarios/{uid}`;
5. integrar y validar la portada compacta y dinámica candidata v4;
6. Logros, Constancia y crecimiento automático del Árbol;
7. nombre del alumno, especialmente “Gloria” en componentes generales;
8. analizar, cerrar alcance, desarrollar y entregar sin reiteración.

---

# 20. Checklist de continuidad

## Antes de desarrollar

- [ ] Leer este documento.
- [ ] Confirmar rama y archivo actual.
- [ ] Revisar documentación específica.
- [ ] Identificar módulos compartidos.
- [ ] Detectar selectores dependientes.
- [ ] Definir alcance cerrado.
- [ ] Preparar prueba local y GitHub Pages.

## Antes de entregar

- [ ] HTML válido.
- [ ] JS sin errores de sintaxis.
- [ ] Rutas verificadas.
- [ ] Funciona con usuario autenticado.
- [ ] Datos reales visibles.
- [ ] Estado vacío correcto.
- [ ] Responsive.
- [ ] Navegación contextual.
- [ ] `prefers-reduced-motion`.
- [ ] ZIP con rutas correctas.
- [ ] CHANGELOG o LEEME.
- [ ] Documentación actualizada cuando corresponde.

---

# 21. Anexo A — Glosario

**Academia**
Ecosistema completo.

**Mi Universo**
Experiencias transversales y personales.

**Mis Cursos**
Contenido académico estructurado.

**Tarea**
Actividad definida por un adulto.

**Misión**
Forma motivadora de presentar una tarea.

**Ejecución**
Una realización concreta de una tarea.

**Resultado**
Registro MVP de lo ocurrido al terminar.

**Evidencia**
Referencia a una actividad, sesión, audio, caso o producción.

**Mi Camino**
Centro personal de misiones, seguimiento y crecimiento.

**Lía**
Guacamaya guía.

**Árbol**
Representación visual del crecimiento.

**Academia API**
Fachada JavaScript para Firestore.

**Navegación contextual**
Regreso dinámico al lugar de origen mediante `volver`.

---

# 22. Anexo B — Fuentes utilizadas para esta consolidación

Este documento se construyó a partir de:

- meses de conversación funcional y técnica;
- README oficial de `docs/`;
- MASTER_PLAN y PROJECT_MAP históricos;
- ROADMAP;
- DECISION_LOG;
- MANIFIESTO;
- IA_SYSTEM_PROMPT;
- contenido de Descubre la Academia;
- estándares de Mi Rincón de Lectura;
- especificaciones de Mis Tareas;
- STD-012;
- versiones recientes de:
  - `academia.js`;
  - `perfil-usuario.js`;
  - `panel-usuario.js`;
  - `auth-guard.js`;
  - `navegacion.js`;
  - Mi Camino;
  - Detectives;
  - Mis Tareas.

## Niveles de certeza

**Confirmado en código o archivo actual:** arquitectura Firebase, API, perfil, tareas, estructura de
casos Detectives, módulos actuales.

**Confirmado por decisiones y entregas recientes:** Mi Camino v2.1, Mis Tareas 2.0, resultado MVP,
reapertura, navegación contextual.

**Especificación aprobada pero no necesariamente implementada:** ejecuciones, rol profesional,
logros reales, constancia real, árbol real, IA.

---

# 23. Resumen de reanudación en cinco minutos

1. La Academia es un ecosistema educativo familiar en HTML/CSS/JS con Firebase y GitHub Pages.
2. `Mi Universo` y `Mis Cursos` son los dos grandes caminos; `Mi Camino` es el acceso cotidiano del
   alumno, no un tercer camino conceptual.
3. Detectives y Mi Rincón de Lectura ya están integrados con Misiones, evidencias y revisión familiar.
4. La navegación global está centralizada y debe reutilizarse.
5. Los estados principales son `pendiente`, `en_curso`, `necesita_ayuda`, `pendiente_validacion` y
   `completada`.
6. La prioridad inmediata es integrar y probar la portada compacta y dinámica candidata v4.
7. `Descubre la Academia` y `Continúa tu aventura` serán tarjetas completas pulsables, sin botones
   internos redundantes.
8. El hero conserva las guacamayas y el ADN visual, pero se aplana.
9. El bloque dinámico muestra una sola prioridad basada en las tareas reales.
10. La documentación debe acompañar al producto: menos documentos nuevos, más actualización de los
    existentes.
11. No prometer entregas futuras: generar realmente archivos o ZIP con herramientas.
12. Dentro de ZIP, incluir `.js`, nunca `.js.txt`.

Archivo candidato reciente:

```text
index_pagina_principal_mi_camino_dinamico_compacto_v4.html
```

Antes de integrarlo, confirmar la exportación y firma reales de `Academia.tareas` en el repositorio.

# 24. Cierre

La Academia nació como una respuesta familiar a una necesidad concreta y se convirtió en una
plataforma educativa con identidad, arquitectura y visión propias.

Su valor no reside únicamente en el código. Reside en la combinación de:

- observación;
- afecto;
- conocimiento técnico;
- colaboración;
- adaptación;
- constancia;
- respeto por la forma particular de aprender de cada persona.

> **No construimos páginas. Construimos experiencias.**
>
> **Cada pequeño paso cuenta.**

🌈
