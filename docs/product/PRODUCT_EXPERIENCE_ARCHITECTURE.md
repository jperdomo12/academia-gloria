# Product Experience Architecture
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` |
| **Versión** | 1.0 |
| **Estado** | Activo |
| **Fecha** | 03/08/2026 |
| **Última actualización** | 03/08/2026 |
| **Propietario** | Arquitectura del Producto |
| **Responsables** | Juan Perdomo + Arquitectura colaborativa con IA |
| **Ámbito** | Arquitectura conceptual de la experiencia del producto, sus actores, dominios, relaciones y evolución |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/ADN_ACADEMIA_GLORIA_VALENTINA.md` | **Gobierna:** define la identidad, valores y principios que esta arquitectura debe respetar. |
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** establece la organización y propiedad del conocimiento documental. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** define la estructura, trazabilidad y mantenimiento de este documento. |
| `docs/project/RELEASE_NOTES.md` | **Complementa:** registra la evolución publicada del producto. |
| `docs/vision/00_MANIFIESTO_DE_LA_ACADEMIA_v1.0.md` | **Complementa:** aporta la visión fundacional de la Academia. |
| `docs/vision/01_PRINCIPIOS_PEDAGOGICOS_v1.0.md` | **Complementa:** desarrolla los principios pedagógicos aplicados a las experiencias. |
| `docs/vision/02_VISION_DEL_RINCON_DE_LECTURA_v1.0.md` | **Implementa:** desarrolla la visión de una experiencia específica de lectura. |
| `docs/vision/03_PERFIL_INTELIGENTE_DEL_USUARIO_v1.0.md` | **Complementa:** desarrolla capacidades futuras de perfil y personalización. |
| `docs/vision/04_MEMORIA_INTELIGENTE_DE_LA_ACADEMIA_v1.0.md` | **Complementa:** desarrolla capacidades futuras de memoria del producto. |
| `docs/vision/05_MANIFIESTO_DE_AVENTURAS_MATEMATICAS_v1.0.md` | **Implementa:** concreta principios de experiencias matemáticas contextualizadas. |
| `docs/vision/08_MI_CAMINO_v1.0.md` | **Implementa:** desarrolla la visión funcional de Mi Camino. |
| `docs/modelos/SPEC-MIS_TAREAS_Y_MISIONES.md` | **Implementa:** especifica el comportamiento de tareas, misiones y gestión familiar. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0-rc1 | 03/08/2026 | Juan Perdomo + IA | Primera propuesta integral de la arquitectura de experiencia del producto. |
| 1.0 | 03/08/2026 | Juan Perdomo + IA | Versión aprobada. Adopta conformidad completa con el estándar documental: metadatos, relaciones, historial, alcance, jerarquía, índice, decisiones y cierre. |

## Propósito

Definir cómo se organiza la experiencia de la **Academia Gloria Valentina** como producto.

Este documento explica:

- qué necesidades atiende el producto;
- qué actores participan;
- qué dominios de experiencia existen;
- cómo se relacionan;
- qué responsabilidad tiene cada uno;
- cómo encajan los elementos actuales de la Academia;
- y cómo puede evolucionar el producto sin perder su identidad.

La arquitectura de experiencia actúa como puente entre:

```text
ADN DEL PRODUCTO
        ↓
EXPERIENCIA DEL ALUMNO Y SU ENTORNO
        ↓
DISEÑO FUNCIONAL
        ↓
ESPECIFICACIONES
        ↓
IMPLEMENTACIÓN
```

## Alcance

Este documento gobierna:

- la arquitectura conceptual de la experiencia;
- los actores y sus responsabilidades;
- los dominios del producto;
- las relaciones entre contenidos, experiencias, acompañamiento, motivación, progreso, colaboración, IA y administración;
- la interpretación arquitectónica de Mi Camino, Mis Cursos, Misiones y Mis Aventuras;
- y los criterios para evaluar la evolución de nuevas capacidades.

Quedan fuera de su alcance:

- diseño detallado de pantallas;
- navegación definitiva;
- componentes de interfaz;
- contratos de API;
- modelos de datos detallados;
- reglas funcionales completas;
- implementación técnica;
- y definición gráfica de los Personajes Oficiales.

Esos elementos pertenecen a estándares, modelos, especificaciones y documentos de identidad especializados.


## Índice

1. Principio central  
2. Origen y evolución del producto  
3. Las dos formas de crecer  
4. Actores del ecosistema  
5. Dominios de experiencia  
6. Dominio de Contenidos  
7. Dominio de Experiencias de Aprendizaje  
8. Dominio de Acompañamiento  
9. Dominio de Asignaciones y Gestión Familiar  
10. Dominio de Colaboración  
11. Dominio de Motivación y Reconocimiento  
12. Dominio de Progreso y Evidencias  
13. Dominio de IA y Personalización  
14. Dominio de Administración y Gobierno  
15. Espacios funcionales actuales  
16. Flujos principales  
17. Principios de diseño derivados  
18. Arquitectura actual y arquitectura objetivo  
19. Evaluación de nuevas ideas  
20. Relación con otros documentos  
21. Gobierno y evolución  
22. Riesgos arquitectónicos  
23. Hoja de evolución recomendada  
24. Principios de arquitectura  
25. Declaración de arquitectura  

## 1. Principio central

> **La Academia no se diseña alrededor de funcionalidades. Se diseña alrededor de experiencias de aprendizaje.**

Una funcionalidad existe porque resuelve una necesidad concreta de alguno de los actores del producto.

Una pantalla es una representación temporal de esa funcionalidad.

La experiencia, en cambio, es aquello que el alumno, la familia o los profesionales necesitan vivir y conseguir.

Por ello, la arquitectura parte de:

1. las personas;
2. sus necesidades;
3. los dominios de experiencia;
4. las relaciones entre esos dominios;
5. y, solo después, las interfaces y la implementación.

---

## 2. Origen y evolución del producto

La Academia nació como una iniciativa familiar para ayudar a Gloria con los contenidos de 5.º de Primaria.

Su primera necesidad fue transformar materiales escolares en experiencias:

- más visuales;
- más comprensibles;
- más prácticas;
- más motivadoras;
- y mejor adaptadas a su forma de aprender.

A partir de ese origen aparecieron **Mis Cursos**, con contenidos académicos, prácticas para exámenes, recursos de comprensión y ayudas para recordar conceptos.

Durante las vacaciones surgió una nueva pregunta:

> ¿Cómo puede la Academia seguir ayudando a Gloria cuando el aprendizaje no está organizado por el colegio?

La familia identificó necesidades concretas, entre ellas:

- comprensión matemática;
- lectura;
- dicción y pronunciación;
- autonomía;
- resolución de problemas;
- y habilidades útiles para la vida diaria.

De esa reflexión nacieron nuevas experiencias que posteriormente se agruparon bajo **Mis Aventuras**.

Más adelante apareció otra necesidad:

> ¿Cómo puede Gloria saber por sí misma qué tiene asignado y avanzar con menor dependencia del adulto?

De ahí nació **Mi Camino**, inicialmente como un tablón personal de asignaciones.

Con el crecimiento del uso se añadieron capacidades para la familia:

- crear tareas;
- asignarlas;
- hacer seguimiento;
- revisar evidencias;
- añadir observaciones;
- validar su finalización;
- reabrirlas;
- y cerrarlas.

Esta evolución fue válida y eficiente: permitió construir pronto, observar el uso real y aprender antes de consolidar.

> **Construimos pronto para aprender antes; consolidamos después para crecer mejor.**

La arquitectura actual reconoce ese origen y, al mismo tiempo, prepara una evolución organizada para los próximos años.

---

## 3. Las dos formas de crecer

El ADN del producto establece que la Academia acompaña dos dimensiones complementarias:

### 3.1 Crecer en conocimiento académico

Incluye la comprensión y práctica de contenidos asociados al aprendizaje escolar:

- Lengua;
- Matemáticas;
- Ciencias;
- Inglés;
- lectura;
- escritura;
- preparación de exámenes;
- y futuros ámbitos académicos.

### 3.2 Crecer en habilidades para la vida

Incluye capacidades que ayudan al alumno a desenvolverse con mayor autonomía y confianza:

- comprender instrucciones;
- organizarse;
- comunicarse;
- leer en voz alta;
- mejorar la dicción;
- resolver problemas;
- tomar decisiones;
- manejar situaciones cotidianas;
- perseverar;
- pedir ayuda;
- y descubrir su propia forma de aprender.

Estas dos dimensiones no son menús ni módulos rígidos.

Son propósitos del producto que pueden aparecer combinados dentro de una misma experiencia.

Por ejemplo, una actividad de lectura puede reforzar:

- comprensión académica;
- pronunciación;
- confianza;
- expresión oral;
- y autonomía.

---

## 4. Actores del ecosistema

La Academia es un producto multi-actor, aunque el alumno ocupa siempre el centro.

```text
                    FAMILIA
                       │
                       │ acompaña, asigna y valida
                       ▼
DOCENTES ───────►   ALUMNO   ◄─────── IA / LÍA
y especialistas      │               guía y apoya
                     │
                     ▼
                EXPERIENCIAS
                     │
                     ▼
              PROGRESO Y EVIDENCIAS
```

### 4.1 Alumno

Es el actor principal.

Necesita:

- comprender qué puede hacer;
- saber qué tiene asignado;
- avanzar paso a paso;
- recibir ayuda sin sentirse evaluado constantemente;
- completar experiencias con autonomía;
- reconocer sus logros;
- y sentir deseo de regresar.

El término oficial del producto es **alumno**.

No se utiliza “usuario” como término principal porque describe una relación técnica y no educativa.

### 4.2 Familia

La familia acompaña el proceso.

Puede:

- identificar necesidades;
- seleccionar o crear asignaciones;
- proponer objetivos;
- observar el progreso;
- revisar evidencias;
- aportar observaciones;
- celebrar los logros;
- y decidir ajustes.

La familia no debe controlar cada interacción del alumno.

Su papel es acompañar, facilitar y validar cuando corresponda.

### 4.3 Tutor, docente y profesionales

Podrán participar progresivamente en el ecosistema mediante permisos y responsabilidades definidos.

Entre ellos:

- tutor o docente;
- PT;
- logopeda;
- psicólogo;
- orientador;
- y otros profesionales autorizados.

El producto complementa su trabajo y nunca pretende sustituirlo.

### 4.4 IA y Lía

La IA es una capacidad transversal.

Lía es la representación cercana y comprensible de parte de ese acompañamiento.

La IA puede:

- explicar;
- guiar;
- dar pistas;
- adaptar mensajes;
- recordar pasos;
- ayudar a practicar;
- resumir evidencias;
- y proponer apoyos.

No debe:

- sustituir a la familia o al profesional;
- emitir diagnósticos;
- presionar;
- castigar;
- juzgar;
- ni realizar acciones relevantes sin trazabilidad.

### 4.5 Arquitectos y responsables de producto

Son responsables de:

- proteger el ADN;
- organizar los dominios;
- evaluar nuevas ideas;
- decidir su ubicación conceptual;
- controlar el coste y el beneficio;
- y mantener coherencia entre producto, documentación e implementación.

### 4.6 Desarrolladores

Transforman decisiones de producto y especificaciones aprobadas en software mantenible.

No deben convertir decisiones de implementación en nuevas reglas de producto sin validación arquitectónica.

### 4.7 Administradores

Gestionan:

- acceso;
- permisos;
- configuración;
- seguridad;
- mantenimiento;
- y operación del producto.

Su experiencia debe mantenerse separada de la experiencia educativa del alumno.

---

## 5. Dominios de experiencia

La Academia se organiza conceptualmente mediante dominios.

Un dominio reúne necesidades y responsabilidades coherentes. No equivale necesariamente a una pantalla, carpeta o módulo técnico.

```text
                         ACADEMIA
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   APRENDIZAJE        ACOMPAÑAMIENTO       GOBIERNO
        │                   │                   │
        ├─ Contenidos       ├─ Orientación      ├─ Administración
        ├─ Experiencias     ├─ Asignaciones     ├─ Seguridad
        ├─ Práctica         ├─ Colaboración     └─ Configuración
        └─ Evidencias       └─ IA
                            │
                      MOTIVACIÓN Y PROGRESO
                            │
                            ├─ Reconocimiento
                            ├─ Recompensas
                            ├─ Logros
                            └─ Memoria de progreso
```

La primera versión de esta arquitectura reconoce siete dominios principales.

---

## 6. Dominio de Contenidos

### 6.1 Propósito

Organizar aquello que el alumno puede aprender, consultar, practicar o explorar.

### 6.2 Incluye

- Mis Cursos;
- recursos académicos;
- Biblioteca;
- Rincón de Lectura;
- teoría;
- ejemplos;
- esquemas;
- fichas;
- vídeos;
- canciones;
- juegos educativos;
- tests;
- y futuros contenidos.

### 6.3 Principios

Los contenidos deben:

- respetar el ADN pedagógico;
- reducir la carga cognitiva;
- ser visuales y secuenciales;
- permitir repetición;
- favorecer comprensión antes que memorización;
- y poder reutilizarse desde diferentes experiencias.

### 6.4 Qué no debe hacer este dominio

No debe:

- decidir por sí mismo qué debe realizar hoy el alumno;
- gestionar asignaciones familiares;
- controlar estados de tareas;
- ni definir recompensas.

Esas responsabilidades pertenecen a otros dominios.

### 6.5 Mis Cursos

**Mis Cursos** es la materialización actual del aprendizaje académico organizado por curso y asignatura.

Su responsabilidad principal es:

> ofrecer contenidos escolares adaptados para comprender, practicar y preparar aprendizajes concretos.

Mis Cursos no representa toda la Academia ni todas las formas de aprender.

---

## 7. Dominio de Experiencias de Aprendizaje

### 7.1 Propósito

Transformar contenidos, actividades y objetivos en vivencias completas para el alumno.

Una experiencia incluye, según corresponda:

- un propósito comprensible;
- una secuencia;
- interacción;
- ayuda;
- una acción del alumno;
- evidencias;
- cierre;
- y reconocimiento.

### 7.2 Ejemplos actuales

- lectura y grabación;
- aventuras matemáticas;
- casos de Detectives;
- prácticas;
- juegos;
- retos;
- tareas libres;
- y actividades combinadas.

### 7.3 Mis Aventuras

**Mis Aventuras** nació para apoyar necesidades que no dependían exclusivamente del temario escolar.

Su responsabilidad es permitir experiencias:

- contextualizadas;
- prácticas;
- motivadoras;
- conectadas con habilidades para la vida;
- y organizadas como retos o recorridos.

Mis Aventuras no debe limitarse a “juegos educativos”.

Es un marco para aprender mediante situaciones, historias, retos y decisiones.

### 7.4 Experiencia completa

Cuando una acción sea esencial para el aprendizaje, la experiencia debe guiarla explícitamente.

La Academia no debe asumir que el alumno recordará un paso importante si la interfaz no lo solicita con claridad.

Ejemplo:

```text
Lía presenta las palabras
        ↓
El alumno practica su pronunciación
        ↓
El sistema confirma el paso
        ↓
Se habilita la grabación
        ↓
El alumno escucha y guarda la evidencia
```

Este principio surge directamente del uso real: Gloria indicó que no realizó una práctica porque el sistema no le dijo que debía hacerla.

> **Una acción pedagógicamente necesaria debe estar integrada en el flujo y no depender de una instrucción implícita.**

---

## 8. Dominio de Acompañamiento

### 8.1 Propósito

Ayudar al alumno a saber:

- qué hacer;
- cómo empezar;
- qué paso sigue;
- dónde pedir ayuda;
- y cómo continuar.

### 8.2 Mi Camino

Mi Camino nació como un tablón personal de asignaciones.

Su responsabilidad principal es:

> presentar al alumno, de forma clara y motivadora, las misiones que le han sido asignadas y permitirle avanzar con autonomía.

Mi Camino:

- organiza;
- prioriza;
- orienta;
- conecta con otros espacios;
- muestra progreso;
- y acompaña.

Mi Camino no es:

- un curso;
- un repositorio general de contenidos;
- el sistema administrativo completo;
- ni una herramienta de evaluación.

### 8.3 Mi Camino como orquestador

Una misión mostrada en Mi Camino puede conducir a:

- un contenido de Mis Cursos;
- una lectura;
- una aventura;
- un juego;
- una tarea libre;
- una actividad física fuera de la pantalla;
- o una combinación de varias acciones.

```text
                     MI CAMINO
                         │
          ┌──────────────┼──────────────┐
          │              │              │
      MIS CURSOS     MIS AVENTURAS    RECURSOS
          │              │              │
       práctica          reto          lectura
       examen         vida diaria       juego
```

Mi Camino no necesita poseer esos contenidos.

Los referencia y los convierte en una experiencia personal asignada.

---

## 9. Dominio de Asignaciones y Gestión Familiar

### 9.1 Propósito

Permitir que adultos autorizados creen, asignen, revisen y cierren actividades para un alumno.

### 9.2 Responsabilidades

Incluye:

- creación;
- asignación;
- fechas;
- prioridades;
- criterios de finalización;
- observaciones;
- seguimiento;
- revisión de evidencias;
- validación;
- reapertura;
- cancelación;
- e historial.

### 9.3 Relación actual con Mi Camino

En la implementación actual, la experiencia del alumno y la gestión familiar conviven en el mismo entorno funcional.

Esta decisión fue válida para:

- construir rápidamente;
- validar la idea;
- reducir el coste inicial;
- y obtener evidencia real de uso.

### 9.4 Evolución recomendada

A medida que aumenten:

- el número de alumnos;
- los roles;
- las asignaciones;
- las reglas;
- y las necesidades de seguimiento,

se recomienda separar progresivamente:

```text
EXPERIENCIA DEL ALUMNO
Mi Camino
- ver misiones
- empezar
- pedir ayuda
- continuar
- completar
- celebrar

EXPERIENCIA DEL ADULTO
Gestión de Asignaciones
- crear
- asignar
- editar
- revisar
- validar
- analizar
- cerrar
```

### Beneficios

- menor carga cognitiva para el alumno;
- experiencia más limpia;
- permisos más claros;
- mejor escalabilidad multi-alumno;
- mayor seguridad;
- y evolución independiente.

### Costes

- nuevas rutas o pantallas;
- separación de componentes;
- revisión de permisos;
- posible migración de navegación;
- y más pruebas.

### Recomendación

No es obligatorio separar inmediatamente ambas experiencias.

Debe realizarse cuando el coste de mantenerlas juntas supere el beneficio de la simplicidad actual.

---

## 10. Dominio de Colaboración

### 10.1 Propósito

Permitir que las personas que acompañan al alumno compartan información útil sin convertir la Academia en una herramienta de vigilancia.

### 10.2 Participantes

- familia;
- tutor;
- docentes;
- PT;
- logopeda;
- psicólogo;
- y futuros profesionales autorizados.

### 10.3 Capacidades posibles

- observaciones;
- objetivos;
- evidencias;
- recomendaciones;
- seguimiento;
- validaciones;
- y coordinación.

### 10.4 Principios

- acceso mínimo necesario;
- consentimiento y privacidad;
- separación de observaciones adultas y mensajes al alumno;
- trazabilidad;
- lenguaje respetuoso;
- y ausencia de comparaciones entre alumnos.

---

## 11. Dominio de Motivación y Reconocimiento

### 11.1 Propósito

Favorecer que el alumno:

- comience;
- continúe;
- vuelva a intentarlo;
- reconozca su progreso;
- y quiera regresar.

> **La mejor señal de que la Academia cumple su misión es que el alumno quiera regresar mañana.**

### 11.2 Reconocimiento, no dependencia

La Academia no busca que el alumno aprenda únicamente para obtener un premio.

Las recompensas deben:

- celebrar el esfuerzo;
- reconocer la constancia;
- hacer visible el progreso;
- y reforzar una experiencia positiva.

No deben:

- sustituir la motivación interna;
- comparar alumnos;
- castigar;
- generar ansiedad;
- ni convertir todo aprendizaje en una transacción.

### 11.3 Guacamayas y futuras recompensas

La Academia puede utilizar recompensas representadas por guacamayas u otros elementos definidos en la identidad oficial del producto.

La escala concreta, sus niveles y reglas no pertenecen a este documento.

Deberán definirse en documentación específica, alineada con:

- el ADN;
- la identidad visual;
- los personajes oficiales;
- y el sistema de progreso.

### 11.4 Personajes Oficiales

Los Personajes Oficiales pueden:

- acompañar;
- orientar;
- motivar;
- celebrar;
- y reforzar la identidad emocional.

No deben:

- responder por el alumno;
- distraer del objetivo;
- presionar;
- ni competir con la comprensión.

La definición concreta de Lía, las guacamayas y futuros personajes pertenece a:

```text
PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md
```

---

## 12. Dominio de Progreso y Evidencias

### 12.1 Propósito

Conservar señales útiles de aprendizaje y crecimiento.

### 12.2 Evidencias

Pueden incluir:

- actividades completadas;
- respuestas;
- grabaciones;
- lecturas;
- tiempos;
- intentos;
- textos;
- producciones;
- observaciones;
- solicitudes de ayuda;
- y validaciones.

### 12.3 Progreso

El progreso no se reduce a una calificación.

Debe reconocer:

- comprensión;
- autonomía;
- esfuerzo;
- constancia;
- curiosidad;
- capacidad de volver a intentarlo;
- expresión;
- y habilidades para la vida.

### 12.4 Perfil y memoria

El producto podrá construir progresivamente un perfil de aprendizaje que permita adaptar la experiencia.

La memoria debe:

- conservar solo información útil;
- ser comprensible para la familia;
- respetar permisos;
- diferenciar datos observados de inferencias;
- y evitar etiquetas permanentes.

El perfil y la memoria son capacidades transversales; sus modelos detallados pertenecen a documentos específicos.

---

## 13. Dominio de IA y Personalización

### 13.1 Propósito

Aumentar la capacidad de adaptación y acompañamiento del producto.

### 13.2 Capacidades

La IA puede ayudar a:

- adaptar explicaciones;
- generar pistas;
- ajustar dificultad;
- proponer pasos;
- resumir progreso;
- detectar acciones incompletas;
- y sugerir próximas experiencias.

### 13.3 Principios

La IA debe ser:

- contextual;
- gradual;
- explicable;
- trazable;
- segura;
- respetuosa;
- y supervisable.

### 13.4 Acciones sensibles

La IA no debe modificar automáticamente sin autorización:

- objetivos;
- diagnósticos;
- permisos;
- estados finales;
- recompensas relevantes;
- o decisiones adultas.

### 13.5 Personalización progresiva

La personalización debe comenzar con reglas simples y observaciones verificables.

Solo debe aumentar su complejidad cuando exista:

- evidencia de utilidad;
- datos suficientes;
- comprensión del riesgo;
- y mecanismos de revisión.

---

## 14. Dominio de Administración y Gobierno

### 14.1 Propósito

Sostener el producto sin contaminar la experiencia educativa.

Incluye:

- usuarios;
- roles;
- permisos;
- configuración;
- auditoría;
- seguridad;
- mantenimiento;
- versiones;
- y operación.

### 14.2 Separación

La administración no debe formar parte de la navegación habitual del alumno.

Los adultos solo deben ver las capacidades que correspondan a su rol.

---

## 15. Espacios funcionales actuales

Los nombres actuales representan implementaciones y puertas de entrada al producto.

No sustituyen a los dominios.

| Espacio actual | Responsabilidad principal | Dominios relacionados |
|---|---|---|
| Mis Cursos | Aprendizaje académico organizado | Contenidos · Práctica |
| Mi Universo | Acceso personal a recursos y experiencias | Contenidos · Experiencias |
| Mi Camino | Tablón y acompañamiento personal | Acompañamiento · Asignaciones · Progreso |
| Misiones | Unidad asignable de acción | Experiencias · Acompañamiento |
| Mis Aventuras | Aprendizaje contextual y habilidades para la vida | Experiencias · Motivación |
| Biblioteca / Rincón de Lectura | Lectura, comprensión, dicción y expresión | Contenidos · Experiencias · Evidencias |
| Detectives | Resolución contextual de problemas | Experiencias · Práctica |
| Gestión familiar de tareas | Crear y revisar asignaciones | Asignaciones · Colaboración |
| Lía | Guía contextual | IA · Acompañamiento · Motivación |
| Guacamayas | Identidad y celebración | Motivación · Identidad |

### 15.1 Sobre Mi Universo

El conocimiento disponible no permite afirmar todavía que Mi Universo deba convertirse en el contenedor único de Mis Cursos y de todas las experiencias.

Por ello, esta versión no establece una jerarquía rígida entre:

- Mi Universo;
- Mis Cursos;
- Mi Camino;
- y otros espacios.

Esa decisión deberá tomarse al revisar:

- la navegación real;
- el uso por Gloria;
- el crecimiento multi-alumno;
- y la visión futura del producto.

---

## 16. Flujos principales

### 16.1 Aprendizaje libre

```text
Alumno
  ↓
Explora un espacio
  ↓
Selecciona contenido o experiencia
  ↓
Recibe guía
  ↓
Practica
  ↓
Obtiene retroalimentación
  ↓
Puede conservar evidencia
```

### 16.2 Misión asignada

```text
Adulto crea una asignación
        ↓
La asignación aparece como misión
        ↓
Mi Camino explica qué debe hacerse
        ↓
El alumno inicia
        ↓
La experiencia guía todos los pasos necesarios
        ↓
Se registra evidencia
        ↓
El alumno completa
        ↓
El adulto revisa o valida cuando corresponde
        ↓
La Academia reconoce el progreso
```

### 16.3 Solicitud de ayuda

```text
Alumno encuentra una dificultad
        ↓
Solicita ayuda
        ↓
La Academia ofrece una pista gradual
        ↓
El alumno vuelve a intentar
        ↓
Si persiste la dificultad, se informa al adulto autorizado
```

### 16.4 Evolución del producto

```text
Idea
  ↓
Análisis suficiente
  ↓
Construcción temprana
  ↓
Uso real
  ↓
Observación
  ↓
Aprendizaje
  ↓
Consolidación
  ↓
Documentación
  ↓
Evolución responsable
```

---

## 17. Principios de diseño derivados

Toda experiencia deberá evaluar los siguientes principios.

### 17.1 Claridad de propósito

El alumno debe comprender:

- qué hará;
- por qué;
- y cómo empezar.

### 17.2 Una acción importante no puede ser implícita

Cuando una acción sea necesaria para completar correctamente la experiencia, el sistema debe:

- indicarla;
- guiarla;
- y comprobarla cuando resulte razonable.

### 17.3 Autonomía gradual

La ayuda debe aparecer cuando sea necesaria, pero no hacer el trabajo por el alumno.

### 17.4 Separación de roles

La vista del alumno debe ser más simple que la vista del adulto.

### 17.5 Continuidad entre dispositivos

La experiencia debe funcionar en:

- ordenador;
- portátil;
- tableta;
- y especialmente iPad.

No debe depender de:

- hover;
- ratón;
- botones pequeños;
- ni interacciones difíciles de tocar.

> **La tecnología se adapta al alumno; el alumno no debe adaptarse a la tecnología.**

### 17.6 Evidencia antes que opinión

Las mejoras deben apoyarse en:

- uso real;
- observaciones;
- resultados;
- comentarios de Gloria;
- y aportaciones de la familia y profesionales.

### 17.7 Mejora justificada

> **La Academia evoluciona mediante mejoras justificadas, no mediante rediseños continuos.**

Toda propuesta relevante debe analizar:

- beneficio;
- coste;
- impacto sobre el alumno;
- impacto arquitectónico;
- riesgo;
- y reversibilidad.

---

## 18. Arquitectura actual y arquitectura objetivo

### 18.1 Arquitectura actual

La Academia ha crecido de forma incremental.

Algunos dominios están materializados en páginas separadas.

Otros comparten una misma pantalla o módulo.

El caso más representativo es Mi Camino, que hoy reúne:

- experiencia del alumno;
- presentación de misiones;
- y gestión familiar de tareas.

Esta convivencia es válida mientras mantenga:

- claridad;
- seguridad;
- facilidad de mantenimiento;
- y utilidad.

### 18.2 Arquitectura objetivo

La arquitectura objetivo no exige rehacer el producto.

Busca que cada dominio pueda evolucionar con límites más claros.

```text
EXPERIENCIA DEL ALUMNO
├── Explorar
├── Aprender
├── Practicar
├── Ver misiones
├── Pedir ayuda
├── Completar
└── Celebrar

ACOMPAÑAMIENTO ADULTO
├── Crear objetivos
├── Asignar
├── Revisar
├── Observar
├── Validar
└── Ajustar

CAPACIDADES TRANSVERSALES
├── Identidad
├── IA
├── Progreso
├── Evidencias
├── Seguridad
└── Datos
```

La evolución hacia esta separación será gradual y basada en necesidad real.

---

## 19. Evaluación de nuevas ideas

Toda nueva idea relevante deberá responder:

1. ¿Qué problema real intenta resolver?
2. ¿Quién es el actor principal?
3. ¿A qué dominio pertenece?
4. ¿Qué experiencia mejora?
5. ¿Qué principio del ADN refuerza?
6. ¿Qué otros dominios afecta?
7. ¿Existe ya una capacidad que pueda evolucionar?
8. ¿Qué beneficio aporta?
9. ¿Cuál es el coste?
10. ¿Cómo se comprobará su valor?
11. ¿Qué documentación deberá actualizarse?
12. ¿Puede implementarse de forma reversible?

### 19.1 Criterio de decisión

Una nueva capacidad se incorpora cuando:

- existe una necesidad suficiente;
- aporta valor comprobable;
- es coherente con el ADN;
- tiene un dominio propietario;
- y su beneficio justifica el coste.

---

## 20. Relación con otros documentos

### 20.1 ADN del Producto

Define:

- quién es la Academia;
- sus valores;
- sus principios;
- y aquello que no debe perder.

Este documento debe respetarlo.

### 20.2 Documentos de Visión

Explican aspiraciones y principios de dominios específicos.

No deben duplicar la arquitectura global.

### 20.3 Modelos

Definen entidades, estados y relaciones conceptuales o de datos.

### 20.4 Especificaciones

Definen el comportamiento concreto de una capacidad.

Ejemplo:

```text
SPEC-MIS_TAREAS_Y_MISIONES.md
```

### 20.5 Estándares

Definen cómo debe realizarse una práctica de forma repetible.

### 20.6 Identidad Visual y Personajes

El futuro documento:

```text
PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md
```

será propietario de:

- lenguaje visual;
- iconografía;
- personajes oficiales;
- Lía;
- guacamayas;
- reglas de representación;
- y coherencia emocional.

### 20.7 AI Collaboration Guide

El futuro:

```text
docs/ai/AI_COLLABORATION_GUIDE.md
```

enseñará a una IA cómo colaborar con el producto y deberá referenciar esta arquitectura.

---

## 21. Gobierno y evolución

Este documento debe actualizarse cuando cambie:

- la estructura conceptual del producto;
- la responsabilidad de un dominio;
- la relación entre actores;
- o una decisión arquitectónica relevante.

No debe actualizarse por:

- cambios menores de interfaz;
- nuevas páginas que encajen en dominios existentes;
- correcciones;
- o detalles de implementación.

### 21.1 Cambios de versión

### Versión menor

Cuando:

- se aclara un dominio;
- se añade una relación;
- o se incorpora una evolución compatible.

### Versión mayor

Cuando:

- aparece un nuevo paradigma de experiencia;
- se reorganizan dominios fundamentales;
- o cambia significativamente el papel de los actores.

---

## 22. Riesgos arquitectónicos

### 22.1 Convertir Mi Camino en un contenedor universal

Riesgo:

- mezclar demasiadas responsabilidades;
- aumentar la complejidad;
- y dificultar la experiencia del alumno.

Mitigación:

- mantener Mi Camino como orquestador;
- y delegar los contenidos y la gestión avanzada en dominios propios.

### 22.2 Confundir recompensas con aprendizaje

Riesgo:

- motivación exclusivamente externa.

Mitigación:

- celebrar el esfuerzo y la autonomía;
- no premiar cada acción de forma automática.

### 22.3 Introducir IA sin límites

Riesgo:

- decisiones opacas;
- dependencia;
- o pérdida de supervisión.

Mitigación:

- trazabilidad;
- límites;
- permisos;
- y revisión humana.

### 22.4 Duplicar experiencias

Riesgo:

- distintas páginas resolviendo la misma necesidad.

Mitigación:

- identificar primero el dominio;
- evolucionar capacidades existentes antes de crear nuevas.

### 22.5 Diseñar solo para escritorio

Riesgo:

- impedir una experiencia cómoda en iPad y tablet.

Mitigación:

- interacción táctil como requisito habitual;
- pruebas reales;
- y ausencia de dependencias exclusivas del ratón.

### 22.6 Escalar antes de consolidar

Riesgo:

- deuda arquitectónica;
- documentación contradictoria;
- y pérdida de identidad.

Mitigación:

> **Consolidar los fundamentos antes de ampliar los dominios principales.**

---

## 23. Hoja de evolución recomendada

Esta sección no constituye un compromiso de entrega.

## Corto plazo

- consolidar la experiencia actual de Mi Camino;
- mejorar flujos obligatorios dentro de misiones;
- separar visualmente acciones del alumno y del adulto;
- formalizar reconocimiento y recompensas;
- consolidar identidad visual y personajes;
- y completar documentación fundacional.

## Medio plazo

- separar funcionalmente la gestión adulta cuando la complejidad lo justifique;
- mejorar perfiles y memoria;
- incorporar permisos de tutores y profesionales;
- ampliar evidencias;
- y reforzar personalización.

## Largo plazo

- soporte multi-alumno completo;
- colaboración controlada con profesionales;
- recomendaciones adaptativas;
- experiencias longitudinales;
- y acompañamiento durante distintas etapas educativas.

Toda evolución deberá conservar la posibilidad de cambiar de dirección según:

- el uso real;
- las necesidades del alumno;
- la experiencia familiar;
- y el análisis coste/beneficio.

---

## 24. Principios de arquitectura

1. El alumno es el centro del ecosistema.
2. La Academia diseña experiencias, no colecciones de funcionalidades.
3. Contenido, acompañamiento, asignación y reconocimiento son responsabilidades diferentes.
4. Mi Camino organiza y acompaña; no debe poseer todo el producto.
5. Las experiencias del alumno y del adulto pueden evolucionar por separado.
6. La IA acompaña, pero no sustituye ni decide sin límites.
7. El progreso incluye conocimiento y habilidades para la vida.
8. Las acciones necesarias deben estar guiadas de forma explícita.
9. La identidad y los personajes apoyan la experiencia, pero no la dominan.
10. La tecnología se adapta al alumno.
11. Se construye pronto para aprender y se consolida para crecer.
12. Las mejoras deben justificar su coste.
13. Se evoluciona antes que duplicar.
14. Cada conocimiento y capacidad debe tener un propietario claro.
15. El producto debe poder crecer durante años sin perder su ADN.

---

## 25. Declaración de arquitectura

> **La Academia Gloria Valentina es un ecosistema de aprendizaje que combina contenidos, experiencias, acompañamiento, colaboración, motivación y progreso para ayudar a cada alumno a crecer en conocimiento académico y en habilidades para la vida.**

> **Su arquitectura no se organiza alrededor de pantallas inmutables, sino de dominios con responsabilidades claras, capaces de evolucionar de forma independiente y coherente.**

> **Cada nueva capacidad deberá demostrar que mejora una experiencia real, respeta el ADN del producto y aporta un beneficio suficiente para justificar su coste.**

---

## Decisiones adoptadas

| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| PEA-001 | Organizar la experiencia del producto mediante dominios conceptuales y no mediante pantallas. | Aprobada | Arquitectura del Producto |
| PEA-002 | Definir Mi Camino como orquestador de asignaciones y acompañamiento, sin convertirlo en contenedor universal. | Aprobada | Mi Camino · Escalabilidad |
| PEA-003 | Separar progresivamente la experiencia del alumno y la gestión adulta cuando el beneficio justifique el coste. | Aprobada como dirección evolutiva | Alumno · Familia · Permisos |
| PEA-004 | Integrar explícitamente en el flujo toda acción imprescindible para el objetivo pedagógico. | Aprobada | UX · Aprendizaje |
| PEA-005 | Utilizar reconocimiento y recompensas para celebrar progreso, esfuerzo y constancia, sin sustituir la motivación interna. | Aprobada | Motivación · Recompensas |
| PEA-006 | Considerar iPad y otros dispositivos táctiles como parte habitual de la experiencia. | Aprobada | Accesibilidad · Multidispositivo |
| PEA-007 | Evaluar las mejoras arquitectónicas mediante beneficio, coste, impacto, riesgo y reversibilidad. | Aprobada | Evolución Responsable |

## DECISIÓN

**Estado:** 🟢 Aprobado  
**Próximo paso:** Consolidar `PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` a partir de la documentación existente de identidad visual y guacamayas.  
**Impacto:** Arquitectura del Producto · Experiencia del Alumno · Mi Camino · Familia · IA · Evolución Responsable
