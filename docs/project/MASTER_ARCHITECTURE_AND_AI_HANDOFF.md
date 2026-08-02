# MASTER_ARCHITECTURE_AND_AI_HANDOFF.md

# Academia Gloria Valentina

**Documento maestro de arquitectura, continuidad y transferencia de conocimiento para IA, arquitectos y desarrolladores**

---

## Control documental

| Campo | Valor |
|---|---|
| Proyecto | Academia Gloria Valentina / Academia de Gloria |
| Documento | `MASTER_ARCHITECTURE_AND_AI_HANDOFF.md` |
| Versión | 1.0 |
| Estado | Línea base maestra para revisión |
| Fecha de emisión | 02/08/2026 |
| Propietario funcional y técnico | Juan Perdomo |
| Repositorio oficial | `https://github.com/jperdomo12/academia-gloria` |
| Publicación | GitHub Pages |
| URL pública principal | `https://jperdomo12.github.io/academia-gloria/` |
| Tecnología principal | HTML5, CSS3, JavaScript ES Modules, Firebase Authentication, Cloud Firestore |
| Público de este documento | Nueva instancia de IA, arquitectos, desarrolladores, colaboradores funcionales y profesionales autorizados |
| Clasificación | Uso interno del proyecto; contiene contexto funcional y técnico, pero no debe incorporar contraseñas reales |

> **Advertencia de seguridad:** este documento no incluye contraseñas, claves privadas ni credenciales personales. Las credenciales de demostración o acceso deben compartirse por un canal separado y cambiarse cuando dejen de ser necesarias.

---

# 0. Historial de revisiones

| Versión | Fecha | Autor | Descripción |
|---|---:|---|---|
| 0.1 | 02/08/2026 | ChatGPT + Juan Perdomo | Primera consolidación del conocimiento acumulado durante meses de desarrollo. |
| 0.2 | 02/08/2026 | ChatGPT + Juan Perdomo | Incorporación del propósito dual: continuidad para IA y documento de referencia para arquitectos/desarrolladores. |
| 0.3 | 02/08/2026 | ChatGPT + Juan Perdomo | Incorporación del historial de revisiones como una de las primeras secciones. |
| 0.4 | 02/08/2026 | ChatGPT + Juan Perdomo | Reconciliación con el `README.md` oficial de `docs/`, versión de proyecto 2.0 y fecha 22/07/2026. |
| 1.0 | 02/08/2026 | ChatGPT + Juan Perdomo | Emisión de la línea base maestra: arquitectura, funcionalidades, datos, decisiones, problemas, convenciones, pendientes y protocolo de trabajo de la nueva IA. |

## 0.1 Regla de mantenimiento del historial

Toda modificación futura de este documento debe:

1. incrementar su versión;
2. añadir una fila al historial;
3. indicar qué fuentes se revisaron;
4. separar claramente hechos verificados, decisiones aprobadas, propuestas y visión futura;
5. actualizar la sección **Estado actual** y la lista de **Pendientes**;
6. evitar que el documento se convierta en un duplicado literal de todos los documentos especializados.

---

# 1. Propósito y autoridad del documento

Este archivo cumple dos funciones simultáneas:

1. **AI Handoff:** permitir que una nueva conversación de ChatGPT continúe el proyecto sin depender del chat histórico.
2. **Referencia maestra de arquitectura:** ofrecer a cualquier arquitecto o desarrollador una visión integrada del producto, su tecnología, sus decisiones y su estado real.

No sustituye los documentos especializados. Actúa como una capa de integración y navegación entre ellos.

## 1.1 Jerarquía de fuentes

Cuando exista una discrepancia, se aplicará esta prioridad:

1. **Código presente en la rama de producción del repositorio oficial.**
2. **Datos y reglas desplegadas en Firebase.**
3. **Último paquete de entrega aprobado e instalado por Juan.**
4. **Este documento maestro.**
5. **Documentación oficial bajo `docs/`.**
6. **Documentos históricos, prototipos y archivos en `OLD/`.**
7. **Ideas conversadas pero no aprobadas.**

El motivo es sencillo: parte de la documentación estratégica de julio de 2026 quedó desactualizada respecto de módulos que evolucionaron rápidamente, en especial Biblioteca Encantada, Rincón de Lectura, Mi Camino, Mis Tareas, navegación contextual y Detectives de Problemas.

## 1.2 Etiquetas de certeza

Este documento usa implícitamente cuatro categorías:

- **Implementado y verificado:** existe código o una entrega aprobada.
- **Implementado con verificación pendiente:** fue entregado, pero debe confirmarse contra la rama actual.
- **Diseñado/documentado:** existe especificación, pero no necesariamente implementación completa.
- **Visión futura:** idea estratégica sin compromiso inmediato.

---

# 2. Resumen ejecutivo

La **Academia Gloria Valentina** es una plataforma web educativa, familiar y personal creada inicialmente para acompañar a Gloria Valentina, alumna con diagnóstico de TEL. Su objetivo no es sustituir al colegio, a la psicología, a la logopedia ni a la Pedagogía Terapéutica, sino transformar materiales y objetivos educativos en experiencias visuales, estructuradas, motivadoras y accesibles.

El proyecto nació como apoyo académico y evolucionó hacia un ecosistema de aprendizaje, autonomía, motivación, expresión oral, lectura, razonamiento matemático, creatividad, organización y memoria de crecimiento.

La solución se publica en GitHub Pages y emplea un frontend estático con JavaScript modular, Firebase Authentication y Cloud Firestore. Los datos se aíslan por usuario mediante rutas del tipo:

```text
usuarios/{uid}/...
```

Los módulos funcionalmente más relevantes son:

- Portal principal y autenticación.
- Panel reutilizable de usuario.
- Calendarios escolares y personales.
- Biblioteca Encantada.
- Mi Rincón de Lectura, con grabación, transcripción, análisis e historial.
- Gloria Escritora.
- Aventuras Matemáticas.
- Detectives de Problemas.
- Mi Camino.
- Mis Tareas y presentación como misiones.
- Navegación contextual entre módulos.
- Descubre la Academia.
- Documentación oficial y estándares.

Al cierre de este chat, el desarrollo inmediato pendiente era **Detectives de Problemas v2.1**, con alcance aprobado:

1. elegir cuántas historias resolver, con 5 por defecto;
2. mezclar aleatoriamente las respuestas;
3. no repetir historias durante la sesión;
4. mostrar los números implicados al elegir la operación.

El archivo fuente actual de Detectives fue adjuntado y corresponde a una página autocontenida con CSS y JavaScript embebidos, catálogo de casos por niveles y lógica de cuatro pasos. La implementación del paquete ZIP no quedó finalizada antes de iniciar este handoff.

---

# 3. Descripción general del proyecto

## 3.1 Finalidad

Crear un entorno digital que se adapte a la forma de aprender de Gloria y que pueda crecer durante años, desde Primaria hacia etapas académicas posteriores.

La Academia debe:

- organizar el trabajo escolar;
- reducir la carga cognitiva;
- estructurar los procesos paso a paso;
- reforzar comprensión lectora y oral;
- desarrollar razonamiento matemático;
- promover autonomía;
- reducir frustración ante el error;
- celebrar esfuerzo, constancia, curiosidad y progresos;
- conservar recuerdos y evidencias del crecimiento;
- facilitar una futura colaboración entre familia y profesionales.

## 3.2 Problema que resuelve

Los materiales escolares convencionales pueden resultar densos, lineales o poco accesibles. La Academia los transforma mediante:

- recursos visuales;
- esquemas;
- ejercicios interactivos;
- juegos;
- canciones y vídeos;
- lectura guiada;
- grabación de voz;
- transcripción;
- retroalimentación;
- tareas pequeñas y claras;
- mensajes motivadores;
- navegación consistente.

## 3.3 Usuarios

### Usuario principal

**Alumno**, actualmente Gloria Valentina.

Debe poder:

- entrar de forma segura;
- reconocer su espacio;
- elegir una actividad;
- comprender qué se espera;
- completar misiones;
- escuchar, leer, grabarse y revisar;
- recibir mensajes positivos;
- consultar su camino sin sentirse evaluada.

### Familia

Juan y Anais actúan como administradores funcionales y acompañantes.

Deben poder:

- preparar tareas;
- decidir cuáles aparecen como misiones;
- ordenar las misiones;
- marcar estados;
- registrar observaciones y resultados;
- revisar historial;
- acompañar sin convertir la plataforma en un sistema punitivo.

### Profesionales

Psicología, logopedia, PT y colegio son colaboradores potenciales.

El principio aprobado es:

- no sustituir su trabajo;
- compartir información solo con autorización familiar;
- recoger observaciones útiles;
- permitir que la evolución futura se beneficie de su criterio.

Actualmente no existe un rol profesional específico plenamente implantado. Para demostraciones se ha usado temporalmente la cuenta del alumno, lo cual debe considerarse una solución provisional.

## 3.4 Alcance

La Academia incluye aprendizaje académico y desarrollo personal. No debe convertirse en:

- un LMS empresarial complejo;
- un sistema clínico;
- una herramienta de vigilancia;
- un ranking entre niños;
- una plataforma que etiquete errores;
- un conjunto de pantallas sobrecargadas.

---

# 4. Principios rectores

1. **Gloria es la protagonista.**
2. **La tecnología se adapta al niño, no al revés.**
3. **Comprender antes de calcular.**
4. **Aprender sin miedo al error.**
5. **Celebrar esfuerzo, iniciativa, autonomía y petición de ayuda.**
6. **No comparar niños.**
7. **Usar lenguaje amable y motivador.**
8. **Mantener la interfaz sencilla.**
9. **Registrar solo datos que aporten valor real.**
10. **Evitar complejidad prematura.**
11. **Separar tarea, misión, ejecución, resultado y evidencia.**
12. **Mantener un único núcleo técnico compartido.**
13. **Proteger la privacidad y minimizar credenciales compartidas.**
14. **Documentar decisiones y cambios relevantes.**
15. **Conservar compatibilidad con GitHub Pages y ejecución local.**

---

# 5. Estado actual del desarrollo

## 5.1 Infraestructura

| Componente | Estado | Observación |
|---|---|---|
| Repositorio GitHub | Operativo | Fuente oficial: `jperdomo12/academia-gloria`. |
| GitHub Pages | Operativo | URL canónica sin `index.html`: `/academia-gloria/`. |
| Desarrollo local | Operativo | Normalmente VS Code + Live Server en `127.0.0.1:5500`. |
| Firebase Authentication | Operativo | Inicio de sesión por correo y contraseña. |
| Cloud Firestore | Operativo | Datos por UID y subcolecciones. |
| Firebase Storage | No usado como núcleo | Audios se han guardado como Data URL en Firestore con límites estrictos. |
| API `Academia` | Operativa y en evolución | Fachada modular para eventos, biblioteca, lectura y tareas. |
| Panel de usuario | Operativo | Componente reutilizable con submenú. |
| Navegación contextual | Operativa | Parámetro `volver` y fallback por módulo. |

## 5.2 Funcionalidades consolidadas o avanzadas

### Portal y autenticación

- Página pública principal.
- `login.html`.
- Protección de páginas privadas.
- Redirección al login cuando no existe sesión.
- Perfil cargado desde `usuarios/{uid}`.
- Nombre visible y avatar dinámicos.
- Cierre de sesión.

### Calendarios

- Calendario escolar.
- Calendarios de Gloria 2025 y 2026.
- Integración Cloud para eventos.
- Historial de varias generaciones de páginas y scripts.

### Biblioteca Encantada

- Registro de libros.
- Estados de lectura.
- Personaje favorito.
- Valoración.
- Parte favorita.
- Aprendizaje.
- Palabras nuevas.
- Reseña.
- Portada comprimida.
- Filtros.
- Contadores.
- Audio asociado a un libro.
- Transcripción de “Cuéntaselo a Lía”.
- Lectura, edición y eliminación de registros.

### Mi Rincón de Lectura

- Catálogo por idioma, nivel y categoría.
- Selección de historia.
- Lectura y preguntas.
- Grabación de audio.
- Botón detener, especialmente útil cuando Gloria detecta un error y desea repetir.
- Reconocimiento de voz cuando el navegador lo permite.
- Transcripción de “Lo que Lía entendió”.
- Comparación entre texto leído, transcripción y objetivo.
- Análisis de lectura.
- Respuestas.
- Reflexión y frase del día.
- Historial de lecturas.
- Observaciones familiares editables.
- Eliminación de una sesión guardada.
- Límite de grabación.

### Mi Camino

- Hero personal con paisaje, montaña, sendero y guacamayas.
- “Mi aventura de hoy” alimentada por tareas visibles.
- Enlaces directos al módulo correspondiente.
- Descripción real de la tarea en la misión.
- Mi Seguimiento:
  - tareas activas;
  - tareas completadas recientemente;
  - logros como diseño en preparación;
  - constancia como diseño en preparación.
- Árbol de Mi Camino con etapas Semilla, Brote y Árbol.
- Explicación de etapas.
- En la versión aprobada v2.1:
  - Árbol movido al final;
  - tareas activas y completadas como acordeones cerrados;
  - terminología “Preparar una tarea”.

### Mis Tareas

- CRUD de tareas.
- Formulario tipo acordeón.
- Orden de bloques:
  1. Información básica.
  2. Cómo lo verá el alumno.
  3. Planificación.
  4. Acompañamiento.
  5. Resultado de la tarea.
- Nombre del alumno obtenido del perfil.
- Presentación de tarea como misión.
- Lista de iconos y emoji personalizado.
- Visibilidad para el alumno.
- Orden manual con subir/bajar.
- Estados:
  - pendiente;
  - en curso;
  - completada pendiente de validación;
  - completada;
  - necesita ayuda;
  - vencida;
  - cancelada.
- Reapertura de una tarea completada a “En aventura”.
- Resultado MVP:
  - fecha/hora automática al completar;
  - editable;
  - observaciones;
  - hizo más de lo esperado;
  - necesitó ayuda;
  - conviene repetir.
- El resultado se conserva al reabrir.

### Aventuras Matemáticas y Detectives

- Selección de nivel.
- Filtro opcional por tema.
- Casos simples y compuestos.
- Flujo pedagógico:
  1. Comprendo.
  2. Descubro.
  3. Elijo.
  4. Resuelvo.
- Feedback positivo.
- Ayuda visual para grupos y reparto.
- Celebración de caso resuelto.
- Resumen de sesión.
- Catálogo embebido de historias de niveles 1, 2 y 3.

## 5.3 Funciones en preparación o con datos de ejemplo

- Mis Logros automáticos.
- Mi Constancia real.
- Árbol calculado a partir de datos reales.
- Panel de evolución avanzado.
- Roles de profesionales.
- Estadísticas longitudinales.
- Memoria inteligente.
- Recomendaciones automáticas.
- Tutor de IA.

## 5.4 Trabajo exacto pendiente al cerrar el chat

**Detectives de Problemas v2.1**.

Archivo objetivo:

```text
mi-universo/aventuras-matematicas/detectives/index.html
```

Alcance aprobado:

- Selector de número de casos:
  - 5 recomendado y predeterminado;
  - 10;
  - todos los disponibles.
- Resumen previo con nivel y cantidad.
- Botón de inicio de investigación.
- Barajado de opciones en comprensión y descubrimiento.
- Selección de casos sin repetición dentro de la sesión.
- Mostrar los números `a` y `b` en el paso de elección de operación.
- Mantener intacta la lógica existente de puntuación, intentos, pasos, celebración y resumen.

Quedó para versiones posteriores:

- historial de historias contestadas;
- estadísticas por nivel;
- diez historias adicionales por nivel;
- reintento de casos fallados.

---

# 6. Arquitectura general

## 6.1 Vista lógica

```text
Navegador
   │
   ├── HTML por módulo
   ├── CSS local + CSS compartido
   ├── JavaScript ES Modules
   │
   ├── Componentes compartidos
   │      ├── Perfil de usuario
   │      ├── Panel de usuario
   │      ├── Navegación contextual
   │      └── Protección de sesión
   │
   ├── API Academia
   │      ├── Eventos
   │      ├── Biblioteca
   │      ├── Audio de biblioteca
   │      ├── Rincón de Lectura
   │      └── Tareas
   │
   └── Firebase
          ├── Authentication
          └── Cloud Firestore
```

## 6.2 Estilo de aplicación

Es una aplicación multipágina estática, no una SPA.

Ventajas:

- despliegue simple en GitHub Pages;
- facilidad para abrir módulos directamente;
- bajo coste de infraestructura;
- independencia entre mundos;
- compatibilidad con archivos HTML educativos autocontenidos.

Riesgos:

- repetición de CSS/JS;
- rutas relativas complejas;
- dificultad para sincronizar componentes en páginas antiguas;
- archivos HTML muy grandes;
- fragmentación de versiones.

La estrategia aplicada ha sido mantener páginas independientes, pero centralizar gradualmente:

- Firebase;
- API;
- perfil;
- panel de usuario;
- navegación;
- CSS base.

## 6.3 Entornos

### Producción

```text
https://jperdomo12.github.io/academia-gloria/
```

### Local

Habitualmente:

```text
http://127.0.0.1:5500/
```

Las rutas deben funcionar en ambos entornos. Los componentes compartidos detectan `github.io` para anteponer `/academia-gloria` cuando corresponde.

---

# 7. Organización del repositorio

La estructura documentada oficialmente es:

```text
academia-gloria/
│
├── index.html
├── login.html
├── README.md
│
├── adicionales/
├── assets/
├── calendarios/
├── compartido/
├── cursos/
├── docs/
├── etapas/
├── habilidades/
├── mi-universo/
└── OLD/
```

## 7.1 `compartido/`

Núcleo técnico común:

```text
compartido/
├── api/
├── componentes/
├── css/
├── firebase/
├── js/
├── modelos/
└── templates/
```

Archivos relevantes conocidos:

```text
compartido/api/academia.js
compartido/firebase/firebase-config.js
compartido/firebase/firebase-auth.js
compartido/js/auth-guard.js
compartido/js/perfil-usuario.js
compartido/js/panel-usuario.js
compartido/js/navegacion.js
compartido/css/academia-base.css
compartido/css/panel-usuario.css
```

## 7.2 `mi-universo/`

Contiene módulos personales y educativos, entre ellos:

```text
mi-universo/
├── index.html
├── mi-camino/
├── mis-tareas/
├── biblioteca/
├── rincon-lectura/
├── escritora/
└── aventuras-matematicas/
    └── detectives/
```

## 7.3 `assets/`

Contiene identidad visual, iconos, imágenes y guacamayas.

Rutas usadas repetidamente:

```text
assets/iconos/icono-principal.png
assets/identidad/guacamayas/
```

## 7.4 `docs/`

El README oficial establece responsabilidad única:

```text
docs/
├── README.md
├── project/
├── modelos/
├── standards/
├── etapas/
├── habilidades/
├── mi-universo/
└── OLD/
```

Documentos estratégicos:

```text
docs/project/ADN_ACADEMIA_GLORIA.md
docs/project/MASTER_PLAN.md
docs/project/PROJECT_MAP.md
docs/project/ROADMAP.md
docs/project/DECISION_LOG.md
docs/project/CHANGELOG.md
docs/project/RELEASE_NOTES.md
```

El README oficial encontrado declara versión de proyecto 2.0, versión documental 1.0 y fecha 22/07/2026. Debe actualizarse para incluir este documento maestro.

---

# 8. Dependencias y tecnologías

## 8.1 Frontend

- HTML5.
- CSS3.
- JavaScript moderno.
- ES Modules.
- DOM nativo.
- MediaRecorder.
- Web Speech API.
- `SpeechRecognition` o `webkitSpeechRecognition`.
- Local/session storage para estados de interfaz.
- Google Fonts, principalmente Outfit.
- Lucide en algunas páginas.

No se usa un framework principal como React, Vue o Angular.

## 8.2 Firebase

Versiones observadas en módulos recientes:

```text
firebasejs/12.16.0
```

Servicios:

- Firebase Authentication.
- Cloud Firestore.

La configuración contiene valores públicos propios de Firebase Web. No deben confundirse con secretos administrativos. Nunca deben publicarse claves privadas de servicio.

## 8.3 Hosting

- GitHub Pages para frontend.
- Firebase para autenticación y datos.

## 8.4 Herramientas de desarrollo

- VS Code.
- Live Server.
- Git.
- GitHub.
- Navegadores Chromium para pruebas de voz.
- Firestore Console para inspección de datos.

---

# 9. Componentes técnicos compartidos

## 9.1 `firebase-config.js`

Responsabilidad:

- inicializar Firebase;
- exportar `app`, `auth` y `db` en la variante modular;
- mantener una única configuración.

No duplicar configuraciones Firebase en módulos nuevos.

## 9.2 `auth-guard.js`

Función principal:

```javascript
protegerPagina({
  loginUrl,
  onAuthenticated
})
```

Comportamiento:

1. oculta el documento;
2. observa sesión;
3. redirige al login si no existe usuario;
4. hace visible la página cuando la sesión es válida;
5. ejecuta callback opcional.

Lección: evitar que una página privada se vea brevemente antes de redirigir.

## 9.3 `perfil-usuario.js`

Servicio oficial de perfil.

Capacidades:

- espera el estado de autenticación;
- obtiene UID;
- lee `usuarios/{uid}`;
- crea perfil predeterminado si no existe;
- normaliza nombre, nombreVisible, avatar, idioma, zona horaria y estado;
- mantiene caché por UID;
- ofrece recarga;
- obtiene saludo según zona horaria;
- cierra sesión;
- observa cambios de autenticación.

API conceptual:

```javascript
PerfilUsuario.obtenerPerfil()
PerfilUsuario.obtenerNombreVisible()
PerfilUsuario.obtenerAvatar()
PerfilUsuario.obtenerSaludo()
PerfilUsuario.cerrarSesion()
PerfilUsuario.observarSesion()
```

Regla:

- no escribir “Gloria” de forma fija cuando el texto representa al alumno autenticado;
- usar `nombreVisible` para mensajes;
- usar `nombreCompleto` cuando exista y sea apropiado;
- mantener fallback “Explorador”.

## 9.4 `panel-usuario.js`

Componente reutilizable.

Características:

- identidad;
- saludo;
- avatar;
- menú contextual;
- “Descubre la Academia”;
- submenú “Mi espacio personal”;
- Mi Camino;
- Mis Tareas;
- Mis Logros;
- Configuración;
- cierre de sesión;
- posición adaptable arriba/abajo;
- cierre al pulsar fuera;
- alto máximo y scroll;
- URLs compatibles con GitHub Pages y local.

La interfaz fue deliberadamente compactada mediante submenú para evitar un panel excesivamente largo.

## 9.5 `navegacion.js`

Responsabilidad:

- determinar desde dónde se llamó un módulo;
- leer `?volver=...`;
- validar y construir ruta;
- usar fallback del atributo `data-ruta-alternativa`;
- evitar botones “Volver” que regresen siempre a una pantalla fija;
- conservar comportamiento entre local y GitHub Pages.

Patrón HTML:

```html
<a
  data-volver-modulo
  data-ruta-alternativa="../"
  href="../"
>
  Volver
</a>
```

Regla crítica:

- existe un único archivo oficial `navegacion.js`;
- no crear `navigation.js` paralelo;
- evitar duplicidad por nombres español/inglés.

---

# 10. API Academia

## 10.1 Objetivo

Proporcionar una fachada coherente para que las páginas no manipulen Firestore directamente.

Forma pública observada:

```javascript
Academia.usuario
Academia.eventos
Academia.biblioteca
Academia.rinconLectura
Academia.tareas
```

Existe compatibilidad histórica con:

```javascript
AcademiaDB
```

especialmente en calendarios.

## 10.2 Reglas

- validar UID;
- normalizar entradas;
- usar `serverTimestamp()`;
- ordenar lecturas por `actualizadoEn`;
- devolver IDs de documentos;
- usar listeners `onSnapshot` donde la interfaz necesita tiempo real;
- centralizar límites de tamaño;
- no duplicar estructuras en cada página.

---

# 11. Modelo de datos Firestore

## 11.1 Árbol general

```text
usuarios/
└── {uid}/
    ├── [campos de perfil]
    ├── eventos/
    │   └── {eventoId}
    ├── biblioteca/
    │   └── {libroId}
    ├── bibliotecaAudios/
    │   └── {libroId}
    ├── sesionesLectura/
    │   └── {historiaId}
    └── tareas/
        └── {tareaId}
```

## 11.2 Perfil: `usuarios/{uid}`

Campos conocidos o previstos:

```javascript
{
  uid,
  nombre,
  nombreVisible,
  nombreCompleto,
  avatar,
  idioma,
  curso,
  cursoEscolar,
  colegio,
  zonaHoraria,
  tipoUsuario,
  activo
}
```

Defaults:

```javascript
{
  nombre: "Explorador",
  nombreVisible: "Explorador",
  avatar: "🌟",
  idioma: "es",
  zonaHoraria: "Europe/Madrid",
  tipoUsuario: "alumno",
  activo: true
}
```

## 11.3 Eventos

Ruta:

```text
usuarios/{uid}/eventos/{eventoId}
```

Usada por calendarios.

Los detalles exactos deben verificarse contra `academia.js` en producción y los calendarios actuales. La API permite:

- guardar;
- leer por año;
- observar;
- actualizar;
- eliminar.

## 11.4 Biblioteca

Ruta:

```text
usuarios/{uid}/biblioteca/{libroId}
```

Modelo consolidado:

```javascript
{
  title,
  author,
  readingStatus,
  favoriteCharacter,
  rating,
  favoritePart,
  learning,
  newWords,
  review,
  coverImage,
  hasAudio,
  creadoEn,
  actualizadoEn
}
```

Reglas:

- `title` obligatorio;
- `rating` entre 0 y 5;
- portada como Data URL comprimida;
- `hasAudio` indica si existe documento asociado.

## 11.5 Audio de Biblioteca

Ruta:

```text
usuarios/{uid}/bibliotecaAudios/{libroId}
```

Modelo:

```javascript
{
  audioData,
  mimeType,
  duration,
  transcript,
  language,
  transcriptEdited,
  actualizadoEn
}
```

Restricción observada:

```text
audioData.length <= 900000
```

Esta es una defensa práctica para evitar documentos demasiado grandes. Firestore tiene límite de tamaño por documento; no incrementar sin rediseñar almacenamiento.

## 11.6 Sesiones de lectura

Ruta:

```text
usuarios/{uid}/sesionesLectura/{historiaId}
```

Actualmente el ID de documento es el `historiaId`, por lo que guardar de nuevo la misma historia actualiza la sesión. Esto simplifica “una lectura guardada por historia”, pero limita múltiples ejecuciones históricas independientes.

Modelo:

```javascript
{
  historiaId,
  titulo,
  nivel,
  categoria,
  valores: [],
  textoOriginal,
  audioData,
  mimeType,
  duracion,
  transcripcion,
  observacionFamilia,
  historialObservacionesFamilia: [],
  intentos,
  analisisLectura: {},
  respuestas: {},
  reflexion,
  fraseDelDia,
  idioma,
  creadaEn,
  actualizadaEn,
  observacionActualizadaEn
}
```

Nota técnica detectada:

- en una versión de normalización aparece `duracion` repetida dos veces. No rompe el objeto final, pero debe limpiarse.

## 11.7 Tareas

Ruta:

```text
usuarios/{uid}/tareas/{tareaId}
```

Modelo:

```javascript
{
  titulo,
  descripcion,

  tipo:
    "actividad_modulo" |
    "tiempo_practica" |
    "cantidad_actividades" |
    "tarea_libre" |
    "tarea_combinada",

  modulo:
    "rincon-lectura" |
    "detectives" |
    "biblioteca" |
    "libre",

  destinoUrl,
  objetivo,
  criterioFinalizacion,

  fechaInicio,
  fechaLimite,
  tiempoEstimadoMinutos,

  prioridad:
    "baja" |
    "normal" |
    "alta",

  visibleParaAlumno,
  ordenMision,

  estado:
    "pendiente" |
    "en_curso" |
    "completada_pendiente_validacion" |
    "completada" |
    "necesita_ayuda" |
    "vencida" |
    "cancelada",

  asignadaPor: {
    uid,
    rol,
    nombreVisible
  },

  presentacionAlumno: {
    tituloMision,
    descripcionMision,
    mensaje,
    icono
  },

  progreso: {
    iniciadaEn,
    completadaEn,
    tiempoRealMinutos,
    intentos
  },

  evidencia: {
    tipo,
    modulo,
    referenciaId,
    resumen
  },

  resultado: {
    fechaFinalizacion,
    observaciones,
    masDeLoEsperado,
    necesitoAyuda,
    convieneRepetir
  },

  observacionActual,
  historialObservaciones: [
    {
      texto,
      fecha,
      autor
    }
  ],

  creadaEn,
  actualizadaEn
}
```

## 11.8 Índices

Las consultas actuales ordenan subcolecciones por `actualizadoEn`. Los índices simples se gestionan automáticamente. Cualquier futura consulta combinada por estado, módulo, fecha o visibilidad puede requerir índice compuesto.

No crear índices “por previsión”. Crear cuando Firestore lo solicite y documentar el enlace o definición.

## 11.9 Seguridad

Las reglas Firestore exactas no fueron recuperadas en este handoff y deben verificarse en el repositorio o consola.

Requisito mínimo recomendado:

```text
El usuario autenticado solo puede leer y escribir bajo usuarios/{su_uid}.
```

Un rol familiar o profesional requerirá un modelo explícito de autorización. No debe resolverse compartiendo indefinidamente la cuenta de Gloria.

---

# 12. Diseño funcional por módulo

## 12.1 Login y entrada

La URL que debe compartirse públicamente es:

```text
https://jperdomo12.github.io/academia-gloria/
```

No es necesario añadir `/index.html`. La raíz es más limpia y canónica.

El login puede ser alcanzado por redirección. No se recomienda enviar `login.html` como “dirección del producto” salvo que el contexto sea únicamente acceso.

## 12.2 Descubre la Academia

Objetivo:

- explicar qué es el proyecto;
- mostrar su propósito a familia, profesionales y visitantes autorizados;
- ofrecer una presentación coherente y emocional.

Debe poder regresar al punto desde el que fue invocado.

## 12.3 Calendarios

Objetivo:

- mostrar evaluaciones, actividades y planificación;
- conservar datos en la nube;
- ofrecer vistas por año.

Existe historia significativa de calendarios 2025, 2026 y escolar. Deben mantenerse como módulo estable, evitando que nuevas funcionalidades personales rompan sus rutas.

## 12.4 Biblioteca Encantada

### Propósito

Registrar libros y convertir la lectura en una experiencia expresiva.

### Flujo

```text
Registrar libro
→ Añadir portada y datos
→ Guardar
→ Consultar y filtrar
→ Cuéntaselo a Lía
→ Grabar
→ Transcribir
→ Revisar historial
```

### Decisiones

- audio separado del documento principal;
- transcripción editable;
- portada comprimida;
- Firestore por UID;
- UI atractiva y familiar.

## 12.5 Rincón de Lectura

### Propósito

Trabajar lectura, expresión oral, escucha y reflexión.

### Flujo

```text
Elegir historia
→ Leer
→ Grabar
→ Detener/repetir
→ Transcribir
→ Comparar
→ Responder
→ Reflexionar
→ Guardar sesión
→ Revisar historial
```

### Valor del botón Detener

Fue validado en uso real. Gloria lo usa cuando percibe que no dijo algo correctamente; se detiene y repite. No eliminar ni ocultar este control.

### Historial

Debe mostrar:

- historia;
- audio;
- transcripción;
- análisis;
- respuestas;
- reflexión;
- observaciones familiares;
- posibilidad de editar observaciones;
- eliminación controlada.

## 12.6 Escritora

Es un espacio creativo para cuentos, historias y redacciones. Existen varias generaciones de archivos. La nueva IA debe verificar la versión productiva antes de modificar.

## 12.7 Detectives de Problemas

### Filosofía

“No busques una palabra mágica. Piensa qué está ocurriendo.”

### Niveles

- Nivel 1: sencillo.
- Nivel 2: con pistas y datos decorativos.
- Nivel 3: compuesto, varios pasos.

### Pasos

1. Comprensión.
2. Descubrimiento.
3. Selección de operación.
4. Cálculo.

### Modelo de caso

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
  pasos: [
    {
      pregunta,
      operacion,
      a,
      b,
      resultado,
      visual
    }
  ],
  activo
}
```

### V2.1 aprobada

Debe introducir una lista de sesión seleccionada al inicio. Algoritmo recomendado:

```javascript
function barajar(items) {
  const copia = [...items];

  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}
```

Inicio:

```javascript
const disponibles = casosFiltrados();
const cantidad = Math.min(cantidadSolicitada, disponibles.length);
casosSesion = barajar(disponibles).slice(0, cantidad);
```

Opciones:

```javascript
const opcionesVista = barajar(pregunta.opciones);
```

La respuesta correcta debe seguir comparándose por `id`, nunca por posición ni letra.

Números en operación:

```text
Operación: Suma
Números: 4 y 2
```

Para problemas compuestos, mostrar los números del paso actual.

## 12.8 Mi Camino

### Propósito

Ser centro de motivación y seguimiento, no reemplazar el portal principal.

### Orden aprobado

```text
Hero
Mi aventura de hoy
Mi seguimiento
El Árbol de Mi Camino
Lema
```

### Misiones

Una tarea solo aparece si:

- no está completada ni cancelada;
- `visibleParaAlumno !== false`;
- tiene un destino válido;
- respeta `ordenMision`.

### Árbol

Es una representación emocional. Sus valores actuales son orientativos. No presentar porcentajes como datos reales hasta conectar el cálculo.

## 12.9 Mis Tareas

### Distinción esencial

- **Tarea:** definición formal para la familia.
- **Misión:** presentación amable para el alumno.
- **Ejecución:** ocasión real en que se realiza.
- **Resultado:** registro breve de lo sucedido.
- **Evidencia:** referencia a un módulo o actividad.

### Comportamiento de acordeones

Al crear:

- Información básica abierta.
- Cómo lo verá el alumno abierta.
- Los demás cerrados.

Al editar:

- todos cerrados inicialmente;
- el usuario abre lo que necesita.

### Terminología

Usar:

- “Preparar una tarea”.
- “Guardar tarea”.
- “Tareas activas”.
- “Tareas completadas recientemente”.

Evitar alternar “Crear” y “Preparar” para la misma acción.

---

# 13. Navegación y rutas

## 13.1 Problema histórico

Varias páginas podían abrirse desde distintos sitios, pero “Volver” regresaba a una ruta fija.

## 13.2 Solución

Parámetro:

```text
?volver=<ruta-codificada>
```

Ejemplo:

```text
mi-camino/?volver=%2Facademia-gloria%2Findex.html
```

Los enlaces deben propagar el origen.

## 13.3 Reglas

- usar rutas relativas en HTML donde resulte natural;
- permitir base `/academia-gloria` en GitHub Pages;
- validar rutas recibidas;
- evitar open redirect a dominios externos;
- usar fallback;
- no duplicar lógica de navegación en cada módulo.

---

# 14. Voz, audio y transcripción

## 14.1 Tecnologías

- `navigator.mediaDevices.getUserMedia`.
- `MediaRecorder`.
- `SpeechRecognition` / `webkitSpeechRecognition`.
- Data URL para persistencia.
- idioma `es-ES` o según historia.

## 14.2 Limitaciones

La Web Speech API depende del navegador, perfil y políticas de Google/Chrome.

Problema documentado:

- En un perfil Chrome supervisado por control parental (`gvpp.2015`), el reconocimiento funcionaba en inglés y francés, pero no en español.
- Se reprodujo en Dictation.io y Google Translate.
- Otro usuario Chrome del mismo portátil funcionaba correctamente en español.
- La Academia no era la causa.
- Solución temporal: usar otro perfil, por ejemplo el usuario escolar.
- Decisión: documentar y no invertir más esfuerzo por ahora.

## 14.3 Reglas de UX

- indicar si la transcripción automática está disponible;
- no prometer transcripción si el navegador no la soporta;
- permitir editar transcripción;
- permitir repetir grabación;
- conservar botón Detener;
- mensajes claros ante permisos de micrófono;
- no guardar audio vacío;
- limitar duración y tamaño.

---

# 15. Historial de problemas y lecciones aprendidas

## 15.1 Chats excesivamente largos

**Problema:** el chat original acumuló meses de contexto, archivos y respuestas, volviéndose lento.

**Lección:** mantener este documento maestro actualizado y migrar a un nuevo chat cuando sea necesario.

## 15.2 Exceso de análisis repetido

**Problema:** después de aprobar una mejora, la conversación repetía varias veces “lo voy a hacer” sin entregar.

**Nueva dinámica aprobada:**

1. análisis profundo;
2. una interacción de ajuste si hace falta;
3. aprobación;
4. desarrollo;
5. entrega directa.

No repetir el alcance en múltiples turnos.

## 15.3 Prometer entregas sin ejecutar

**Problema:** en varios momentos se afirmó que se prepararía un ZIP, pero no se generó inmediatamente.

**Regla:** nunca decir que una entrega está completada sin crear el archivo y verificar su existencia.

## 15.4 Archivos `.js` difíciles de descargar

**Solución:** entregar JavaScript como `.js.txt` y pedir que se renombre a `.js`.

Mantener este patrón mientras persista el problema.

## 15.5 Duplicación `navegacion.js` / `navigation.js`

**Problema:** se propuso un segundo archivo redundante.

**Solución:** conservar `compartido/js/navegacion.js` como único componente oficial.

## 15.6 Botón Volver fijo

**Solución:** navegación contextual mediante `volver`.

## 15.7 Tarea completada por error

**Problema:** no existía forma de revertir.

**Solución:** botón:

```text
↩️ Volver a En aventura
```

Cambia a `en_curso`, limpia `progreso.completadaEn` cuando corresponde y conserva resultado/historial.

## 15.8 Datos ficticios presentados como reales

**Problema:** Logros y Constancia mostraban ejemplos que podían interpretarse como actividad real.

**Solución:** mostrar claramente:

```text
🚧 En preparación
```

y explicar que son datos de diseño.

## 15.9 Pantalla de tareas demasiado larga

**Solución:** cinco bloques en acordeón.

## 15.10 Desaparición de libros y filtros

**Problema:** una actualización de Biblioteca provocó que no aparecieran libros ni filtros.

**Lección:** preservar IDs, nombres de campos, listeners y compatibilidad con datos existentes; probar con registros reales antes de entregar.

## 15.11 Portadas y audio grandes

**Solución:** comprimir portada; separar audio; validar tamaño; limitar grabación.

## 15.12 HTML monolíticos

**Problema:** páginas de 1.500–2.000 líneas dificultan cambios.

**Decisión actual:** no migrar impulsivamente a framework. Extraer gradualmente CSS, datos y lógica cuando el beneficio sea claro.

## 15.13 Documentación desactualizada

El README y documentos estratégicos de julio de 2026 reflejan una etapa anterior y califican Biblioteca, Escritora y otros módulos como pendientes aunque existen implementaciones avanzadas.

**Solución:** este maestro sirve como reconciliación. Después debe actualizarse:

- README de docs;
- MASTER_PLAN;
- PROJECT_MAP;
- ROADMAP;
- CHANGELOG;
- DECISION_LOG.

---

# 16. Decisiones arquitectónicas importantes

## ADR-001 — GitHub Pages como hosting

**Razón:** coste cero, simplicidad, integración con repositorio.

**Impacto:** frontend estático; Firebase resuelve sesión y datos.

## ADR-002 — Firebase Authentication y Firestore

**Razón:** sincronización Cloud sin backend propio.

**Impacto:** dependencia de SDK cliente y reglas de seguridad.

## ADR-003 — Datos bajo `usuarios/{uid}`

**Razón:** aislamiento y futura capacidad multiusuario.

**Impacto:** todas las APIs deben obtener UID autenticado.

## ADR-004 — API Academia como fachada

**Razón:** impedir que cada página replique Firestore.

**Impacto:** cambios de modelo deben pasar por normalizadores.

## ADR-005 — Aplicación multipágina

**Razón:** compatibilidad con materiales HTML, simplicidad y módulos independientes.

**Impacto:** necesidad de componentes compartidos y disciplina de rutas.

## ADR-006 — Perfil dinámico

**Razón:** evitar hardcode de Gloria y preparar reutilización.

**Impacto:** usar `nombreVisible`, avatar e idioma.

## ADR-007 — Lía como guía

**Razón:** hilo emocional y pedagógico.

**Impacto:** mensajes deben ser cercanos, no infantiles en exceso ni técnicos.

## ADR-008 — Tarea y misión separadas conceptualmente

**Razón:** familia necesita precisión; alumno necesita motivación.

## ADR-009 — Resultado MVP antes que modelo complejo de ejecuciones

**Razón:** evitar complejidad de registro y mantenimiento.

**Impacto:** fecha, observación y tres indicadores; el estándar completo queda como visión.

## ADR-010 — Navegación contextual

**Razón:** los módulos tienen varios puntos de entrada.

## ADR-011 — ZIP como formato de entrega

**Razón:** agrupar archivos coherentes, reducir errores manuales y mantener instrucciones.

## ADR-012 — `.js.txt` temporal

**Razón:** evitar fallos de descarga.

## ADR-013 — Documentación con responsabilidad única

**Razón:** mantener claridad y evitar duplicación.

## ADR-014 — Colaboración profesional futura

**Razón:** coordinación familia-colegio-psicología-logopedia-PT.

**Impacto:** roles y privacidad deben diseñarse antes de dar acceso estable.

---

# 17. Convenciones de desarrollo

## 17.1 Idioma

- nombres de interfaz en español;
- funciones y variables mayoritariamente en español;
- nombres de campos históricos en inglés se conservan cuando ya existen, por ejemplo Biblioteca;
- no renombrar datos persistidos sin migración.

## 17.2 HTML

- `lang="es"`;
- viewport;
- título y descripción;
- favicon;
- estructura semántica;
- IDs estables;
- atributos `data-*` para componentes;
- accesibilidad básica;
- `aria-live` para feedback;
- `type="button"` en botones que no envían formularios.

## 17.3 CSS

- responsive;
- diseño amable;
- bordes redondeados;
- gradientes suaves;
- variables CSS;
- evitar colores agresivos;
- respetar `prefers-reduced-motion`;
- no sacrificar contraste;
- mantener identidad por módulo.

## 17.4 JavaScript

- ES Modules;
- `const` por defecto;
- `let` solo cuando cambie;
- `Object.freeze` para configuraciones;
- funciones pequeñas;
- validación de entradas;
- escapar HTML al renderizar datos;
- listeners una sola vez;
- cancelar snapshots al salir cuando proceda;
- manejar errores y mostrar mensajes comprensibles.

## 17.5 Firestore

- `serverTimestamp()`;
- `creadoEn` y `actualizadoEn`;
- subcolecciones por UID;
- documentos pequeños;
- no almacenar blobs grandes sin evaluar Storage;
- no confiar solo en validación de cliente;
- documentar índices compuestos.

## 17.6 Versiones y entregas

Paquete típico:

```text
nombre_modulo_vX_Y/
├── ruta/archivo.html
├── ruta/archivo.css
├── ruta/archivo.js.txt
└── LEEME.txt
```

ZIP con la misma estructura del repositorio.

## 17.7 Control de cambios

Cada funcionalidad importante debe actualizar:

- código;
- CHANGELOG;
- documento funcional;
- PROJECT_MAP si cambia estructura;
- ROADMAP si cambia planificación;
- DECISION_LOG si existe una decisión relevante.

---

# 18. Documentación existente y relación

## 18.1 Documentos estratégicos

- `ADN_ACADEMIA_GLORIA.md`: filosofía e identidad.
- `MASTER_PLAN.md`: visión y estrategia.
- `PROJECT_MAP.md`: estructura.
- `ROADMAP.md`: evolución por versiones.
- `DECISION_LOG.md`: razones.
- `CHANGELOG.md`: cambios.
- `RELEASE_NOTES.md`: novedades publicadas.

## 18.2 Modelos previstos

- misiones;
- evidencias;
- logros;
- usuarios.

## 18.3 Estándares conocidos

- STD-010 Lía 2.0.
- STD-011 Mis Tareas y Misiones.
- STD-012 Cierre y Reflexión.

## 18.4 Actualización recomendada del README de `docs/`

Añadir:

```text
docs/project/MASTER_ARCHITECTURE_AND_AI_HANDOFF.md
```

Pregunta que responde:

```text
¿Cuál es el estado integrado de la arquitectura y cómo continúa una nueva IA o desarrollador?
```

No sustituye:

- PROJECT_MAP;
- MASTER_PLAN;
- ROADMAP;
- CHANGELOG;
- DECISION_LOG.

---

# 19. Pendientes priorizados

## Prioridad P0 — Inmediatos

### P0.1 Detectives v2.1

**Dificultad:** media.  
**Dependencias:** archivo productivo actual.  
**Riesgo:** lógica embebida y catálogo grande.

Entregar ZIP probado.

### P0.2 Verificar repositorio contra este documento

**Dificultad:** media.  
**Objetivo:** confirmar rutas, versiones y archivos realmente desplegados.

### P0.3 Actualizar documentación oficial

**Dificultad:** media.  
**Dependencia:** verificación P0.2.

Actualizar README, MASTER_PLAN, PROJECT_MAP, ROADMAP, CHANGELOG y DECISION_LOG.

## Prioridad P1 — Alta

### P1.1 Historial de Detectives

Guardar:

- caso;
- nivel;
- fecha;
- aciertos;
- intentos;
- operaciones;
- duración.

Diseñar modelo antes de implementar.

### P1.2 Roles y acceso profesional

Crear rol:

```text
profesional_invitado
```

Con permisos de solo lectura o colaboración limitada.

No seguir compartiendo la cuenta de Gloria como solución permanente.

### P1.3 Convertir ejemplos de Logros y Constancia en datos reales

Depende de eventos significativos y definiciones claras.

### P1.4 Consolidar API y eliminar duplicados

Auditar copias históricas de `academia.js`, Firebase, panel y navegación.

## Prioridad P2 — Media

### P2.1 Diez historias nuevas por nivel en Detectives

30 historias nuevas.

Debe equilibrarse:

- suma;
- resta;
- multiplicación;
- división;
- contextos;
- dificultad;
- datos irrelevantes;
- problemas compuestos.

### P2.2 Reintento de casos fallados

No punitivo y opcional.

### P2.3 Modelo de ejecuciones de tareas

Solo cuando el uso real demuestre necesidad.

### P2.4 Integración automática tareas-evidencias

Detectives y Rincón de Lectura deberían devolver evidencias a una tarea.

### P2.5 Panel de evolución

Diseño simple, sin exceso de gráficos.

## Prioridad P3 — Estratégica

- memoria inteligente;
- tutor IA;
- recomendaciones;
- multiusuario completo;
- profesionales;
- línea de vida;
- viajes;
- estadísticas longitudinales;
- portafolio académico.

---

# 20. Hoja de ruta recomendada

## Fase 1 — Cerrar el trabajo actual

1. Implementar Detectives v2.1.
2. Probar:
   - 5, 10 y todos;
   - cada nivel;
   - cada tema;
   - casos compuestos;
   - opciones barajadas;
   - sin repetición;
   - números correctos;
   - móvil.
3. Publicar.
4. Registrar versión.

## Fase 2 — Línea base documental

1. Copiar este documento a `docs/project/`.
2. Actualizar índice.
3. Revisar contra rama `main`.
4. Marcar discrepancias.
5. Emitir versión 1.1.

## Fase 3 — Observación de uso

Durante varias semanas:

- registrar comentarios de Gloria;
- observaciones de familia;
- opinión de psicóloga;
- feedback del colegio;
- no añadir funcionalidad innecesaria.

## Fase 4 — Historial de Detectives

Diseñar modelo mínimo y luego implementar.

## Fase 5 — Seguimiento real

Conectar:

- tareas;
- lecturas;
- detectives;
- logros;
- constancia;
- árbol.

---

# 21. Estrategia de pruebas

## 21.1 Matriz mínima

| Área | Prueba |
|---|---|
| Autenticación | Usuario válido, sesión caducada, logout. |
| Rutas | Local y GitHub Pages. |
| Navegación | Con y sin `volver`. |
| Perfil | Documento existente y fallback. |
| Biblioteca | Crear, editar, eliminar, portada, audio. |
| Lectura | Grabar, detener, transcribir, guardar, eliminar. |
| Tareas | Crear, editar, ordenar, ocultar, completar, reabrir. |
| Mi Camino | Misiones, enlaces, contadores, acordeones. |
| Detectives | Niveles, temas, pasos, casos compuestos, resumen. |
| Responsive | 360 px, tablet, escritorio. |
| Accesibilidad | Teclado, focus, contraste, reduce motion. |

## 21.2 Pruebas con datos reales

Siempre conservar una copia de seguridad antes de probar eliminaciones o migraciones.

## 21.3 Criterio de entrega

No entregar un paquete solo porque “compila visualmente”. Debe comprobarse:

- archivo existe;
- ZIP abre;
- estructura correcta;
- imports válidos;
- IDs coinciden;
- no hay referencias a archivos inexistentes;
- cambios limitados al alcance.

---

# 22. Privacidad, seguridad y ética

1. No incluir contraseñas en repositorio, ZIP, documentación o chat.
2. Revocar credenciales temporales.
3. Minimizar datos personales.
4. Solicitar consentimiento antes de compartir con profesionales.
5. Distinguir datos educativos de datos clínicos.
6. No automatizar diagnósticos.
7. No etiquetar al alumno por errores.
8. No crear comparaciones entre niños.
9. Permitir corregir y eliminar observaciones.
10. Diseñar roles antes de ampliar accesos.

---

# 23. Contexto relevante del usuario

## 23.1 Perfil técnico

Juan es Ingeniero en Informática con más de 30 años de experiencia, especialista en sistemas de gestión de activos, IBM Maximo y dirección de proyectos.

Implicaciones:

- entiende arquitectura, datos, versiones y control de cambios;
- valora explicaciones profundas;
- puede revisar código;
- espera entregables completos;
- prefiere calidad sobre rapidez;
- no necesita simplificaciones artificiales.

## 23.2 Forma de trabajo preferida

- analizar bien una propuesta;
- aceptar una segunda interacción si resuelve dudas reales;
- cerrar alcance;
- desarrollar;
- entregar ZIP;
- evitar repetir lo ya acordado;
- respuesta corta cuando la solicita;
- `.js.txt` por problemas de descarga;
- mantener el diseño atractivo, útil y sencillo.

## 23.3 Objetivo familiar

Crear una herramienta duradera para Gloria y favorecer colaboración progresiva entre:

- familia;
- colegio;
- psicología;
- logopedia;
- PT.

## 23.4 Filosofía de producto

Juan valora especialmente:

- personalización;
- seguimiento;
- motivación;
- autonomía;
- calidad visual;
- trazabilidad;
- no complicar mantenimiento;
- construir basándose en uso real.

---

# 24. Cómo debe trabajar una nueva IA

## 24.1 Inicio obligatorio

Al comenzar un nuevo chat:

1. leer este documento completo;
2. preguntar o verificar cuál es la rama/archivo productivo actual;
3. no asumir que un archivo histórico es el actual;
4. solicitar solo los archivos que falten;
5. revisar el repositorio público cuando sea posible;
6. identificar alcance exacto.

## 24.2 Protocolo de interacción

1. Analizar con profundidad.
2. Dar opinión clara.
3. Proponer mejoras adicionales solo si aportan valor.
4. No abrir más de una ronda de aclaración salvo necesidad.
5. Una vez aprobado, ejecutar.
6. Entregar archivo o ZIP.
7. Resumir cambios y pasos de instalación.
8. No seguir prometiendo trabajo en turnos sucesivos.

## 24.3 Protocolo de código

- preservar arquitectura;
- modificar lo mínimo necesario;
- no introducir framework sin ADR;
- no duplicar componentes;
- no cambiar campos persistidos sin migración;
- mantener local/GitHub;
- usar perfil dinámico;
- conservar navegación contextual;
- respetar identidad visual;
- probar antes de entregar.

## 24.4 Protocolo documental

Al terminar una versión:

- actualizar changelog;
- documentar decisiones;
- actualizar este maestro si cambia arquitectura, datos o estado;
- separar hecho de propuesta.

## 24.5 Conductas prohibidas

- inventar que un ZIP fue generado;
- afirmar que se editó un repositorio si no ocurrió;
- exponer credenciales;
- sustituir archivos grandes por reconstrucciones incompletas;
- eliminar lógica existente por no comprenderla;
- mezclar nuevas ideas dentro de una versión cerrada;
- convertir datos de ejemplo en estadísticas reales;
- usar el nombre “Gloria” fijo cuando debe venir del perfil;
- crear `navigation.js` redundante;
- romper el botón Volver contextual;
- quitar el botón Detener de audio.

---

# 25. Guía de continuidad inmediata para el próximo chat

Copiar como primer mensaje, junto con este archivo:

```text
Trabajaremos sobre Academia Gloria Valentina.

Lee completamente MASTER_ARCHITECTURE_AND_AI_HANDOFF.md antes de responder.

El repositorio oficial es:
https://github.com/jperdomo12/academia-gloria

El trabajo inmediato es cerrar Detectives de Problemas v2.1 en:
mi-universo/aventuras-matematicas/detectives/index.html

Alcance aprobado:
1. seleccionar 5, 10 o todos los casos, con 5 por defecto;
2. mostrar resumen de nivel y cantidad;
3. aleatorizar opciones sin alterar la respuesta correcta;
4. no repetir casos dentro de la sesión;
5. mostrar los números a y b en el paso de elegir operación;
6. mantener toda la funcionalidad actual.

Primero revisa el archivo productivo. Después implementa y entrega un ZIP completo.
No vuelvas a analizar lo ya aprobado salvo que encuentres una incompatibilidad real.
```

---

# 26. Criterios de éxito del proyecto

La Academia tendrá éxito si:

- Gloria entra con ilusión;
- comprende qué hacer;
- puede detenerse y repetir;
- se siente segura al equivocarse;
- gana autonomía;
- familia y profesionales obtienen información útil;
- el sistema se mantiene sencillo;
- los datos permanecen privados;
- el código es sostenible;
- la documentación permite continuidad;
- dentro de años pueden observarse recuerdos y crecimiento.

---

# 27. Resumen operativo de cinco minutos

- Aplicación web multipágina.
- GitHub Pages + Firebase Auth + Firestore.
- Datos por UID.
- Núcleo compartido: Firebase, API, perfil, panel, navegación y CSS.
- Módulos avanzados: Calendarios, Biblioteca, Lectura, Mi Camino, Mis Tareas y Detectives.
- Lía es guía emocional.
- Tarea formal; misión motivadora.
- Resultado MVP, no sistema complejo.
- Voz depende de Chrome/Web Speech.
- Perfil supervisado tuvo fallo solo en español; usar otro perfil.
- ZIP es formato preferido.
- JS se entrega como `.js.txt`.
- No repetir análisis después de aprobar.
- Próximo desarrollo: Detectives v2.1.
- Documentación oficial debe reconciliarse con el código actual.
- Este documento debe vivir en `docs/project/`.

---

# 28. Apéndice A — Glosario

| Término | Significado |
|---|---|
| Academia | Ecosistema digital completo. |
| Mi Universo | Área personal y educativa. |
| Lía | Guacamaya guía. |
| Tarea | Actividad formal preparada por adulto. |
| Misión | Presentación de tarea para alumno. |
| Ejecución | Realización concreta. |
| Resultado | Registro breve al finalizar. |
| Evidencia | Referencia al trabajo realizado. |
| Mi Camino | Centro de misiones, seguimiento y crecimiento. |
| Árbol | Metáfora visual de evolución. |
| Constancia | Actividad significativa, no simple login. |
| Momento especial | Hito emocional futuro. |
| Academia API | Fachada de datos. |
| Navegación contextual | Regreso al origen mediante `volver`. |

---

# 29. Apéndice B — Checklist de una nueva funcionalidad

```text
[ ] Problema y usuario definidos
[ ] Beneficio claro
[ ] Alcance MVP
[ ] Dependencias identificadas
[ ] Modelo de datos validado
[ ] Privacidad revisada
[ ] Rutas local/GitHub
[ ] Perfil dinámico
[ ] Navegación contextual
[ ] Responsive
[ ] Accesibilidad
[ ] Mensajes de error
[ ] Prueba con datos reales
[ ] ZIP verificado
[ ] CHANGELOG
[ ] Documentación
```

---

# 30. Apéndice C — Deuda técnica conocida

- Varias generaciones de archivos con nombres similares.
- HTML monolíticos.
- CSS embebido en páginas grandes.
- Catálogos de datos embebidos.
- Historial de sesiones de lectura limitado por ID de historia.
- Audio en Firestore.
- Roles no formalizados.
- Reglas Firestore por verificar.
- Documentos estratégicos desactualizados.
- Duplicado de `duracion` en normalización de lectura.
- Uso transitorio de cuenta del alumno para demos.
- Nomenclatura mixta inglés/español en Biblioteca.
- Múltiples archivos históricos fuera de una política de archivo uniforme.

Estas deudas deben tratarse por prioridad y no mediante una refactorización masiva.

---

# 31. Apéndice D — Registro de decisiones futuras

Añadir futuras decisiones con formato:

```text
ADR-XXX — Título

Estado:
Fecha:
Contexto:
Opciones:
Decisión:
Justificación:
Consecuencias:
Migración:
Documentos afectados:
```

---

# 32. Cierre

La Academia Gloria Valentina ha evolucionado de un conjunto de materiales escolares adaptados a una plataforma educativa y personal con arquitectura Cloud, identidad propia y una visión de largo plazo.

Su valor no reside únicamente en sus páginas o datos. Reside en haber convertido el acompañamiento familiar en experiencias que Gloria puede comprender, disfrutar, repetir y hacer suyas.

La prioridad técnica es preservar esa esencia mientras el sistema crece:

> **útil, atractivo, sencillo, respetuoso, mantenible y centrado en Gloria.**
