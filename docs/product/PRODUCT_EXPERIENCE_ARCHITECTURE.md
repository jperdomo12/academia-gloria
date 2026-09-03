# Product Experience Architecture
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` |
| **Versión** | 1.1-rc1 |
| **Estado** | Candidato para aprobación |
| **Fecha** | 03/08/2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Arquitectura del Producto |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Arquitectura conceptual de la experiencia del producto, sus actores, dominios, relaciones y evolución |

## Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Fundamenta:** propósito humano estable de la Academia. |
| `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` | **Gobierna:** identidad, misión y principios que esta arquitectura debe respetar. |
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** organización y propiedad del conocimiento documental. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** estructura, trazabilidad y mantenimiento de este documento. |
| `docs/project/DECISION_LOG.md` | **Gobierna/complementa:** decisiones transversales que condicionan la experiencia. |
| `docs/project/ROADMAP.md` | **Complementa:** prioridades y evolución prevista del producto. |
| `docs/project/RELEASE_NOTES.md` | **Evidencia:** evolución consolidada del producto real. |
| `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` | **Complementa:** identidad visual, emocional y Personajes Oficiales. |
| `docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md` | **Implementa:** diseño específico de Motivación y Reconocimientos. |
| `docs/models/MODELO_NAVEGACION.md` | **Implementa:** modelo conceptual de navegación. |
| `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` | **Implementa:** comportamiento funcional de Misiones y Gestión de Misiones. |
| `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md` | **Gobierna:** reglas normativas del dominio de Misiones. |
| `docs/vision/00_MANIFIESTO_DE_LA_ACADEMIA_v1.0.md` | **Complementa:** visión fundacional de la Academia. |
| `docs/vision/01_PRINCIPIOS_PEDAGOGICOS_v1.0.md` | **Complementa:** principios pedagógicos aplicados a las experiencias. |
| `docs/vision/02_VISION_DEL_RINCON_DE_LECTURA_v1.0.md` | **Implementa:** visión de una experiencia específica de lectura. |
| `docs/vision/03_PERFIL_INTELIGENTE_DEL_USUARIO_v1.0.md` | **Complementa:** visión futura de perfil y personalización. |
| `docs/vision/04_MEMORIA_INTELIGENTE_DE_LA_ACADEMIA_v1.0.md` | **Complementa:** visión futura de memoria del producto. |
| `docs/vision/05_MANIFIESTO_DE_AVENTURAS_MATEMATICAS_v1.0.md` | **Implementa:** experiencias matemáticas contextualizadas. |
| `docs/vision/08_MI_CAMINO_v1.0.md` | **Implementa:** visión funcional de Mi Camino. |

## Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1-rc1 | 04/09/2026 | Product Owner + AI Collaborator | Sincronización P1 con la experiencia real: incorpora Persona Activa y acceso multi-persona; reconoce la separación ya implementada entre Mi Camino y Gestión de Misiones; actualiza Recompensas V1, evidencia/Análisis Educativo, expansión curricular de 6.º y Mi Baúl; corrige rutas documentales y elimina formulaciones futuras ya superadas sin alterar los principios centrales de la arquitectura. |
| 1.0 | 03/08/2026 | Juan Perdomo + IA | Versión aprobada. Adopta conformidad completa con el estándar documental: metadatos, relaciones, historial, alcance, jerarquía, índice, decisiones y cierre. |
| 1.0-rc1 | 03/08/2026 | Juan Perdomo + IA | Primera propuesta integral de la arquitectura de experiencia del producto. |

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
- la interpretación arquitectónica de Mi Camino, Mis Cursos, Gestión de Misiones, Mis Aventuras, Mi Baúl y otros espacios transversales;
- y los criterios para evaluar la evolución de nuevas capacidades.

Quedan fuera de su alcance:

- diseño detallado de pantallas;
- navegación física definitiva;
- componentes de interfaz;
- contratos de API;
- modelos de datos detallados;
- reglas funcionales completas;
- implementación técnica;
- y definición gráfica de los Personajes Oficiales.

Esos elementos pertenecen a estándares, modelos, especificaciones, código y documentos de identidad especializados.

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

De esa reflexión nacieron nuevas experiencias que posteriormente se agruparon bajo **Mis Aventuras** y otros espacios de Mi Universo.

Más adelante apareció otra necesidad:

> ¿Cómo puede Gloria saber por sí misma qué tiene asignado y avanzar con menor dependencia del adulto?

De ahí nació **Mi Camino**, inicialmente como un tablón personal de asignaciones.

Con el crecimiento del uso se añadieron capacidades para la familia:

- crear Misiones;
- asignarlas;
- hacer seguimiento;
- revisar evidencias;
- añadir observaciones;
- validar su finalización;
- reabrirlas;
- analizarlas;
- y cerrarlas.

Durante agosto y septiembre de 2026 la Academia dio un nuevo salto:

- identidad multi-persona y **Persona Activa**;
- Gestión de Usuarios y niveles de acceso;
- **Gestión de Misiones** separada de la experiencia normal del alumno;
- evidencia académica e histórico de solo lectura;
- propuestas de refuerzo y Análisis Educativo basados en datos reales;
- Recompensas/Reconocimientos V1 dentro de Mi Camino;
- nueva base curricular `Curso → Asignatura → Tema` para 6.º;
- y **Mi Baúl** como espacio personal para conservar contenidos e ideas de valor sin convertirlos en evaluación.

Esta evolución mantiene el principio que permitió crecer desde el inicio:

> **Construimos pronto para aprender antes; consolidamos después para crecer mejor.**

La arquitectura actual reconoce ese origen y prepara una evolución organizada para los próximos años sin exigir rehacer lo que ya funciona.

---

## 3. Las dos formas de crecer

El ADN del producto establece que la Academia acompaña dos dimensiones complementarias.

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

Es el actor principal de la experiencia educativa.

Necesita:

- comprender qué puede hacer;
- saber qué tiene asignado;
- avanzar paso a paso;
- recibir ayuda sin sentirse evaluado constantemente;
- completar experiencias con autonomía;
- reconocer sus logros;
- y sentir deseo de regresar.

El término **alumno** describe su rol educativo. No debe confundirse con `USER` o con la identidad técnica de autenticación.

La Persona sobre la que opera la experiencia puede ser la **Persona Activa**, que no siempre coincide con el usuario autenticado cuando un adulto o profesional autorizado acompaña a otra Persona.

### 4.2 Familia

La familia acompaña el proceso.

Puede, según permisos:

- identificar necesidades;
- seleccionar o crear Misiones;
- proponer objetivos;
- observar el progreso;
- revisar evidencias;
- aportar observaciones;
- celebrar los logros;
- y decidir ajustes.

La familia no debe controlar cada interacción del alumno.

Su papel es acompañar, facilitar y validar cuando corresponda.

### 4.3 Tutor, docente y profesionales

La arquitectura de identidad y relaciones permite incorporar progresivamente:

- tutor o docente;
- PT;
- logopeda;
- psicólogo;
- orientador;
- y otros profesionales autorizados.

La base multi-persona y los niveles de acceso ya existen; la colaboración profesional concreta debe abrirse solo con permisos y casos de uso explícitos.

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
- proponer apoyos;
- y derivar reconocimientos automáticos cuando una regla de alta confianza se sustenta en datos reales suficientes.

No debe:

- sustituir a la familia o al profesional;
- emitir diagnósticos;
- etiquetar al alumno;
- presionar;
- castigar;
- juzgar;
- ni tomar decisiones humanas sensibles sin trazabilidad y el nivel de revisión requerido.

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

Su experiencia debe mantenerse separada de la experiencia educativa del alumno y protegida por permisos reales, no solo por visibilidad de interfaz.

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
                            ├─ Progreso personal
                            ├─ Constancia
                            └─ Memoria de progreso
```

Esta arquitectura reconoce **nueve dominios principales**, desarrollados en las secciones 6 a 14.

---

## 6. Dominio de Contenidos

### 6.1 Propósito

Organizar aquello que el alumno puede aprender, consultar, practicar, conservar o explorar.

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
- Mi Baúl como espacio personal curado;
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
- controlar estados de Misiones;
- ni definir recompensas.

Esas responsabilidades pertenecen a otros dominios.

### 6.5 Mis Cursos

**Mis Cursos** es la materialización del aprendizaje académico organizado por curso y asignatura.

Para la expansión actual de 6.º, la jerarquía estable es:

```text
Curso
→ Asignatura
→ Tema
```

Su responsabilidad principal es:

> ofrecer contenidos escolares adaptados para comprender, practicar y preparar aprendizajes concretos.

Los nuevos Temas de 6.º deben nacer preparados para generar evidencia académica estructurada cuando exista una actividad evaluable o práctica que lo justifique.

Mis Cursos no representa toda la Academia ni todas las formas de aprender.

### 6.6 Mi Baúl

**Mi Baúl** conserva contenidos e ideas de valor para la Persona Activa: vídeos, artículos, audios, documentos, imágenes, libros, ideas, frases y recursos web, entre otros.

Su contrato es deliberadamente distinto del de Misiones y Evidencias:

> **Guardar algo en Mi Baúl no genera Misión, evidencia, estadística ni recompensa.**

El Baúl sirve para conservar, volver a encontrar y compartir significado; no convierte todo lo que interesa al alumno en una actividad evaluable.

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

No todas las experiencias deben producir todos esos elementos. La evidencia y el reconocimiento se incorporan solo cuando tienen sentido para el propósito real.

### 7.2 Ejemplos actuales

- lectura y grabación;
- Aventuras Matemáticas;
- casos de Detectives;
- prácticas académicas de 6.º;
- juegos;
- retos;
- Misiones libres;
- Creciendo por Dentro;
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

> **Una acción pedagógicamente necesaria debe estar integrada en el flujo y no depender de una instrucción implícita.**

### 7.5 Vista previa e histórico

Cuando una experiencia dispone de **Vista previa**, esta sirve para inspeccionar o validar sin contaminar el trabajo real.

Por tanto, la Vista previa no debe escribir:

- sesiones;
- evidencias;
- progreso;
- ni resultados reales.

Cuando existe consulta histórica, esta debe ser de **solo lectura** y reutilizar las fuentes reales del motor en lugar de crear una segunda persistencia.

---

## 8. Dominio de Acompañamiento

### 8.1 Propósito

Ayudar al alumno a saber:

- qué hacer;
- cómo empezar;
- qué paso sigue;
- dónde pedir ayuda;
- cómo continuar;
- y cómo reconocer lo que va construyendo.

### 8.2 Mi Camino

Mi Camino nació como un tablón personal de asignaciones y hoy es el principal espacio de acompañamiento personal.

Su responsabilidad es:

> presentar al alumno sus Misiones de forma clara y motivadora, facilitar su avance y hacer visible parte de su camino de crecimiento sin convertirlo en una pantalla administrativa.

Mi Camino:

- organiza;
- prioriza;
- orienta;
- conecta con otros espacios;
- muestra Misiones;
- muestra señales de progreso y constancia;
- integra `Así voy creciendo` y Reconocimientos;
- y acompaña.

Mi Camino no es:

- un curso;
- un repositorio general de contenidos;
- el sistema administrativo de Misiones;
- ni una herramienta diagnóstica.

### 8.3 Mi Camino como orquestador

Una Misión mostrada en Mi Camino puede conducir a:

- un Tema de Mis Cursos;
- una lectura;
- una aventura;
- un juego;
- una Misión libre;
- una actividad física fuera de la pantalla;
- o una combinación de acciones.

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

Permitir que adultos autorizados creen, asignen, revisen, analicen y cierren actividades para una Persona.

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
- análisis;
- propuestas de refuerzo;
- limpieza controlada de datos de prueba;
- e historial.

### 9.3 Separación actual respecto a Mi Camino

La separación que en v1.0 se describía como dirección evolutiva ya está **materialmente implementada**.

Actualmente:

```text
EXPERIENCIA DEL ALUMNO
Mi Camino
- ver Misiones
- empezar / continuar
- finalizar cuando corresponda
- ver crecimiento y Reconocimientos

EXPERIENCIA FAMILIAR / DE GESTIÓN
Gestión de Misiones
- crear
- asignar
- editar
- revisar
- validar
- analizar
- preparar refuerzos
- limpiar datos de prueba
- cerrar / reabrir / eliminar cuando corresponda
```

`Gestión de Misiones` requiere nivel mínimo `gestion`; un alumno con nivel `consulta` no debe verla en su menú ni acceder directamente a ella.

La separación no implica duplicar modelos, visores o persistencia: ambos espacios consumen los mismos contratos y fuentes propietarias según su responsabilidad.

### 9.4 Criterio de evolución

La separación puede seguir refinándose si el crecimiento de roles, análisis o colaboración lo exige, pero **no se debe crear una segunda arquitectura de Misiones**.

La prioridad es mantener:

- experiencia simple para el alumno;
- permisos claros;
- reutilización de contratos;
- y coherencia multi-persona.

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

### 10.3 Base actual

La Academia ya dispone de una base transversal para colaboración controlada:

- `PERSON` y `USER` separados conceptualmente;
- roles y niveles de acceso;
- relaciones entre Personas;
- Persona Activa;
- acceso a otra Persona según relación y nivel;
- y Gestión de Usuarios para administración.

Esto no significa que todos los flujos profesionales estén ya construidos. Significa que deben reutilizar esta identidad y permisos antes de crear mecanismos paralelos.

### 10.4 Capacidades de colaboración

Pueden incluir:

- observaciones;
- objetivos;
- evidencias;
- recomendaciones;
- seguimiento;
- validaciones;
- y coordinación.

### 10.5 Principios

- acceso mínimo necesario;
- consentimiento y privacidad;
- separación de observaciones adultas y mensajes al alumno;
- trazabilidad;
- lenguaje respetuoso;
- ausencia de comparaciones entre alumnos;
- y uso de Persona Activa para atribuir correctamente la información.

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

El sistema debe:

- celebrar esfuerzo y crecimiento;
- reconocer constancia;
- hacer visible progreso personal;
- valorar autonomía y cooperación;
- reconocer el uso constructivo de ayuda;
- y reforzar una experiencia positiva.

No debe:

- sustituir la motivación interna;
- comparar alumnos;
- castigar;
- generar ansiedad;
- convertir el aprendizaje en puntos o monedas;
- premiar por abrir/clicar/iniciar sesión;
- ni convertir los hitos en un checklist de colección.

### 11.3 Recompensas / Reconocimientos V1

La primera capacidad operativa ya está integrada principalmente en:

```text
Mi Camino
→ Así voy creciendo
```

Incluye, según las fases ya consolidadas:

- Reconocimientos humanos asociados a momentos reales;
- Guacamayas como hitos especiales con control humano;
- Reconocimientos automáticos de Lía únicamente sobre señales de alta confianza;
- reconocimiento de constancia basado en días reales;
- transparencia motivacional sobre qué comportamientos celebra la Academia.

Los datos `🧪` no cuentan como logros reales y no deben contaminar constancia o Reconocimientos.

Las fases futuras, como Récord Personal o retos cooperativos, no se consideran implementadas hasta que exista producto real y suficiente justificación.

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

La definición concreta de Lía, Guacamayas y otros personajes pertenece a `PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md`.

---

## 12. Dominio de Progreso y Evidencias

### 12.1 Propósito

Conservar señales útiles de aprendizaje y crecimiento sin confundir dato observado con interpretación.

### 12.2 Responsabilidades separadas

La arquitectura actual distingue:

```text
Misión
→ intención / asignación

Sesión o resultado del motor
→ ejecución real

Evidencia
→ vínculo auditable entre la Misión y el trabajo realizado

Ver trabajo / resultado histórico
→ consulta de solo lectura
```

Esta separación evita duplicar resultados y permite que diferentes motores mantengan sus fuentes especializadas.

### 12.3 Evidencias

Pueden incluir:

- actividades completadas;
- respuestas;
- grabaciones;
- lecturas;
- tiempos;
- intentos;
- pistas o ayudas;
- textos;
- producciones;
- observaciones;
- solicitudes de ayuda;
- y validaciones.

No se inventan métricas que un motor no registra.

### 12.4 Progreso

El progreso no se reduce a una calificación.

Debe poder reconocer, cuando exista evidencia suficiente:

- comprensión;
- autonomía;
- esfuerzo;
- constancia;
- curiosidad;
- capacidad de volver a intentarlo;
- expresión;
- y habilidades para la vida.

Completar una actividad no equivale automáticamente a dominarla.

### 12.5 Análisis Educativo y refuerzo

La Academia ya utiliza el patrón:

```text
Evidencia real
↓
Datos observables
↓
Observación / tendencia prudente
↓
Propuesta de actuación o refuerzo
↓
Revisión humana
↓
Misión / acción cuando aporta valor
↓
Nueva evidencia
```

El Análisis Educativo:

- describe evidencia y tendencias;
- no etiqueta al alumno;
- separa las métricas propias de cada motor;
- y mantiene la decisión familiar/humana antes de convertir una propuesta en acción visible cuando corresponda.

### 12.6 Datos de prueba

Una Misión o sesión `🧪` puede recorrer el flujo real para validar funcionalidad, pero no debe contar como historia educativa real del alumno en:

- estadísticas;
- constancia;
- propuestas de progreso;
- ni Recompensas.

Su eliminación solo debe realizarse cuando el vínculo con la Misión o sesión sea suficientemente exacto y seguro.

### 12.7 Perfil y memoria

El producto podrá construir progresivamente un perfil de aprendizaje que permita adaptar la experiencia.

La memoria debe:

- conservar solo información útil;
- ser comprensible para la familia;
- respetar permisos;
- diferenciar datos observados de inferencias;
- evitar etiquetas permanentes;
- y preservar trazabilidad suficiente.

El perfil y la memoria siguen siendo capacidades transversales cuya ampliación debe apoyarse en datos reales y utilidad observada.

---

## 13. Dominio de IA y Personalización

### 13.1 Propósito

Aumentar la capacidad de adaptación y acompañamiento del producto.

### 13.2 Capacidades

La IA puede ayudar a:

- adaptar explicaciones;
- generar pistas;
- ajustar dificultad cuando exista un contrato seguro;
- proponer pasos;
- resumir progreso;
- detectar acciones incompletas;
- sugerir próximas experiencias;
- y derivar señales motivacionales verificables.

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

La IA no debe modificar automáticamente sin el contrato y autorización adecuados:

- diagnósticos;
- permisos;
- relaciones entre Personas;
- decisiones finales de adultos;
- Guacamayas u otros hitos que requieran control humano;
- ni estados cuya modificación no pueda verificarse de forma fiable.

La existencia de automatización no elimina la necesidad de límites. Los Reconocimientos automáticos ya implementados son un ejemplo de automatización acotada: se derivan de fuentes reales, con reglas explícitas, deduplicación y exclusión de datos de prueba.

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
- Personas;
- roles;
- relaciones;
- permisos;
- configuración;
- auditoría;
- seguridad;
- mantenimiento;
- versiones;
- y operación.

### 14.2 Separación

La administración no debe formar parte de la navegación habitual del alumno.

Los adultos solo deben ver las capacidades que correspondan a su rol y nivel de acceso.

La Academia ya aplica esta separación, por ejemplo, a Gestión de Usuarios y Gestión de Misiones mediante niveles mínimos de acceso.

---

## 15. Espacios funcionales actuales

Los nombres actuales representan implementaciones y puertas de entrada al producto.

No sustituyen a los dominios.

| Espacio actual | Responsabilidad principal | Dominios relacionados |
|---|---|---|
| Mis Cursos | Aprendizaje académico organizado por Curso → Asignatura → Tema | Contenidos · Experiencias · Evidencias |
| Mi Universo | Acceso personal a experiencias y recursos del alumno | Contenidos · Experiencias · Acompañamiento |
| Mi Camino | Misiones, acompañamiento y crecimiento visible | Acompañamiento · Asignaciones · Progreso · Motivación |
| Gestión de Misiones | Gestión familiar/administrativa de Misiones y análisis asociado | Asignaciones · Colaboración · Evidencias · Progreso |
| Análisis Educativo | Lectura prudente de evidencia real y propuestas de actuación | Progreso · Evidencias · Acompañamiento |
| Mis Aventuras / Aventuras Matemáticas | Aprendizaje contextual y habilidades para la vida | Experiencias · Motivación |
| Biblioteca / Rincón de Lectura | Lectura, comprensión, dicción y expresión | Contenidos · Experiencias · Evidencias |
| Detectives | Resolución contextual de problemas | Experiencias · Práctica · Evidencias |
| Creciendo por Dentro | Reflexión, expresión y crecimiento personal | Experiencias · Acompañamiento · Evidencias cuando corresponde |
| Mi Baúl | Conservar contenidos e ideas de valor para la Persona Activa | Contenidos · Acompañamiento personal |
| Calendarios | Organización temporal personal y escolar | Acompañamiento · Organización |
| Lía | Guía contextual y automatización acotada | IA · Acompañamiento · Motivación |
| Guacamayas / Reconocimientos | Celebración de progreso real | Motivación · Identidad · Progreso |
| Gestión de Usuarios | Administración de identidad, roles y relaciones | Administración · Seguridad · Colaboración |

### 15.1 Sobre Mi Universo

Mi Universo es actualmente una agrupación importante de experiencias personales: Mi Camino, Rincón de Lectura, Biblioteca, Escritura, Aventuras Matemáticas, Creciendo por Dentro y, para usuarios autorizados, Gestión de Misiones.

No es el contenedor único de toda la Academia.

**Mis Cursos**, **Administración** y **Explorar más** mantienen responsabilidades y rutas propias en la navegación actual.

Por tanto, la arquitectura no fuerza que todo deba vivir dentro de Mi Universo. Su función es agrupar experiencias personales coherentes, mientras otros dominios conservan sus propios puntos de entrada.

### 15.2 Explorar más

`Explorar más` agrupa actualmente:

- Calendarios;
- Mi Baúl;
- Adicionales.

Es una agrupación de acceso, no un dominio arquitectónico nuevo.

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
Se conserva evidencia solo cuando el contrato de la experiencia lo requiere
```

### 16.2 Misión asignada

```text
Adulto autorizado crea o prepara una Misión
        ↓
La Misión aparece en Mi Camino cuando corresponde
        ↓
Mi Camino explica qué debe hacerse
        ↓
El alumno inicia
        ↓
La experiencia guía los pasos necesarios
        ↓
Se registra sesión/resultado y evidencia cuando aplica
        ↓
El cierre es automático solo si puede verificarse de forma fiable
        ↓
En otros casos el alumno confirma que terminó
        ↓
La familia revisa o valida cuando corresponde
        ↓
La Academia puede reconocer el progreso real
```

### 16.3 Evidencia, análisis y refuerzo

```text
Actividad real
  ↓
Sesión / evidencia
  ↓
Datos observables
  ↓
Tendencia prudente
  ↓
Propuesta
  ↓
Revisión familiar
  ↓
Misión / actuación
  ↓
Nueva evidencia
```

### 16.4 Incorporación curricular

```text
Material oficial del colegio
+ Curso
+ Asignatura
+ Tema
+ notas opcionales
        ↓
Análisis y ubicación
        ↓
Construcción / reutilización
        ↓
Actividad + evidencia cuando corresponde
        ↓
Validación
        ↓
Tema disponible en la Academia
```

La familia no necesita conocer ni copiar rutas técnicas para incorporar un Tema al catálogo cuando la Academia puede resolverlas desde la estructura real.

### 16.5 Solicitud de ayuda

```text
Alumno encuentra una dificultad
        ↓
Solicita ayuda
        ↓
La Academia ofrece una pista gradual
        ↓
El alumno vuelve a intentar
        ↓
La señal puede conservarse como dato observable cuando el motor lo registra
        ↓
Solo patrones suficientemente fiables alimentan análisis o propuestas
```

### 16.6 Guardar en Mi Baúl

```text
Persona encuentra algo de valor
        ↓
Lo guarda / describe / clasifica en Mi Baúl
        ↓
Puede volver a consultarlo o compartir significado
```

Este flujo termina allí: **no crea Misión, evidencia, estadística ni recompensa**.

### 16.7 Evolución del producto

```text
Idea
  ↓
Análisis suficiente
  ↓
Revisión de capacidades existentes
  ↓
Construcción temprana cuando el alcance está claro
  ↓
Uso real
  ↓
Observación
  ↓
Ajuste
  ↓
Consolidación documental
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

Las funciones de gestión deben protegerse mediante permisos y no solo mediante ocultación visual.

### 17.5 Persona Activa coherente

Cuando un adulto autorizado acompaña a otra Persona, la navegación y las operaciones deben conservar la **Persona Activa** y atribuir correctamente sesiones, evidencias y progreso.

La identidad autenticada y la Persona sobre la que se trabaja no deben confundirse.

### 17.6 Continuidad entre dispositivos

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

### 17.7 Evidencia antes que opinión

Las mejoras y conclusiones sobre progreso deben apoyarse en:

- uso real;
- observaciones;
- resultados;
- comentarios de Gloria;
- y aportaciones de la familia y profesionales.

Una señal aislada no se convierte en una etiqueta personal.

### 17.8 Datos de prueba fuera de la historia real

Las pruebas funcionales pueden utilizar el flujo real, pero no deben contaminar métricas, constancia, análisis o Recompensas del alumno.

### 17.9 Reutilizar antes de crear

Antes de crear una pantalla, visor, persistencia o motor nuevo, debe comprobarse si una capacidad existente puede evolucionar o reutilizarse.

### 17.10 Mejora justificada

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

La Academia ha crecido de forma incremental, pero varios límites que en v1.0 eran todavía aspiracionales ya existen.

Actualmente:

- Mi Camino concentra la experiencia del alumno respecto a Misiones y crecimiento visible;
- Gestión de Misiones concentra la gestión adulta/familiar y exige acceso de gestión;
- Gestión de Usuarios está separada en Administración;
- Persona Activa permite operar sobre otra Persona autorizada sin duplicar pantallas;
- Mis Cursos crece mediante Curso → Asignatura → Tema;
- evidencia, sesiones y visores históricos mantienen responsabilidades diferenciadas;
- Análisis Educativo consume datos reales sin persistir un diagnóstico paralelo;
- Recompensas V1 vive dentro del camino personal, no como un sistema de puntos separado;
- y Mi Baúl conserva contenido personal sin convertirlo en actividad evaluable.

Esta arquitectura sigue siendo incremental y admite componentes heredados, pero la dirección de responsabilidades es hoy más clara que en agosto.

### 18.2 Arquitectura objetivo

La arquitectura objetivo no exige rehacer el producto.

Busca que cada dominio pueda evolucionar con límites claros:

```text
EXPERIENCIA DEL ALUMNO
├── Explorar
├── Aprender
├── Practicar
├── Ver Misiones
├── Pedir ayuda
├── Completar
├── Conservar contenidos personales
└── Celebrar

ACOMPAÑAMIENTO ADULTO
├── Crear objetivos
├── Asignar
├── Revisar
├── Observar
├── Analizar
├── Validar
└── Ajustar

CAPACIDADES TRANSVERSALES
├── Identidad / Persona Activa
├── IA
├── Progreso
├── Evidencias
├── Seguridad
├── Permisos
└── Datos
```

La evolución hacia mayor separación será gradual, reutilizará contratos existentes y se basará en necesidad real.

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
13. ¿Genera datos? Si los genera, ¿quién es su propietario y para qué se usarán?
14. ¿Requiere intervención humana o puede verificarse de forma fiable?

### 19.1 Criterio de decisión

Una nueva capacidad se incorpora cuando:

- existe una necesidad suficiente;
- aporta valor comprobable;
- es coherente con el ADN;
- tiene un dominio propietario;
- reutiliza lo existente cuando resulta razonable;
- y su beneficio justifica el coste.

---

## 20. Relación con otros documentos

### 20.1 ADN del Producto

`docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` define:

- quién es la Academia;
- sus valores;
- sus principios;
- y aquello que no debe perder.

Este documento debe respetarlo.

### 20.2 Decision Log

`docs/project/DECISION_LOG.md` conserva las decisiones transversales y su vigencia.

Esta arquitectura implementa esas decisiones en términos de actores, dominios y experiencia, sin duplicar su justificación histórica.

### 20.3 Documentos de Visión

Explican aspiraciones y principios de dominios específicos.

No deben duplicar la arquitectura global ni declararse como estado implementado cuando describen futuro.

### 20.4 Modelos

Definen entidades, estados y relaciones conceptuales o de datos.

### 20.5 Especificaciones

Definen el comportamiento concreto de una capacidad.

Ejemplo:

```text
docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md
```

### 20.6 Estándares

Definen cómo debe realizarse una práctica de forma repetible.

### 20.7 Identidad Visual y Personajes

`docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` es propietario de:

- lenguaje visual;
- iconografía;
- personajes oficiales;
- Lía;
- Guacamayas;
- reglas de representación;
- y coherencia emocional.

### 20.8 AI Collaboration Guide

`docs/ai/AI_COLLABORATION_GUIDE.md` define cómo colabora la IA con el desarrollo y mantenimiento del producto y debe respetar esta arquitectura.

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
- ni detalles de implementación.

### 21.1 Cambios de versión

#### Versión menor

Cuando:

- se aclara un dominio;
- se añade una relación;
- o se incorpora una evolución compatible.

#### Versión mayor

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

- mantener Mi Camino como orquestador y espacio de acompañamiento;
- delegar contenidos y gestión avanzada en dominios propios.

### 22.2 Confundir recompensas con aprendizaje

Riesgo:

- motivación exclusivamente externa;
- aprendizaje transaccional.

Mitigación:

- celebrar esfuerzo, autonomía, constancia y crecimiento;
- no premiar cada acción;
- evitar puntos, rankings y pérdida de recompensas;
- derivar automatizaciones solo desde evidencia fiable.

### 22.3 Introducir IA sin límites

Riesgo:

- decisiones opacas;
- dependencia;
- pérdida de supervisión;
- o afirmaciones no sustentadas.

Mitigación:

- trazabilidad;
- límites;
- permisos;
- reglas verificables;
- y revisión humana cuando corresponda.

### 22.4 Duplicar experiencias o visores

Riesgo:

- distintas páginas resolviendo la misma necesidad;
- duplicidad de datos o contratos.

Mitigación:

- identificar primero el dominio;
- evolucionar capacidades existentes;
- reutilizar visores especializados y fuentes reales antes de crear nuevos.

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

### 22.7 Sobreinterpretar evidencia educativa

Riesgo:

- convertir una observación aislada en una etiqueta;
- proponer acciones desde señales débiles;
- confundir finalización con dominio.

Mitigación:

- datos observables primero;
- repetición o confianza suficiente según el motor;
- lenguaje prudente;
- revisión humana;
- y Análisis Educativo no diagnóstico.

### 22.8 Contaminar la historia real con pruebas

Riesgo:

- estadísticas, constancia o Recompensas incorrectas.

Mitigación:

- marca `🧪`;
- exclusión transversal de métricas reales;
- limpieza únicamente mediante vínculos exactos y seguros.

### 22.9 Convertir todo contenido valioso en actividad evaluable

Riesgo:

- presión innecesaria;
- pérdida de espacios personales de curiosidad e inspiración.

Mitigación:

- mantener contratos como Mi Baúl, donde conservar contenido no genera Misiones, evidencia, estadísticas ni Recompensas.

---

## 23. Hoja de evolución recomendada

Esta sección no sustituye `ROADMAP.md` ni constituye un compromiso de entrega.

La arquitectura recomienda mantener estas direcciones:

### Corto plazo

- continuar la expansión curricular real de 6.º mediante `Curso → Asignatura → Tema`;
- preservar evidencia estructurada desde los nuevos Temas cuando corresponda;
- completar la revisión técnica pendiente de identidad, auditoría y regresión del núcleo;
- seguir refinando Mi Camino y Gestión de Misiones sin volver a mezclar sus responsabilidades;
- mejorar la calidad de fuentes antes de ampliar automatizaciones educativas o motivacionales.

### Medio plazo

- ampliar colaboración profesional sobre la base multi-persona existente cuando existan casos reales;
- mejorar perfiles y memoria solo con datos suficientes;
- ampliar Análisis Educativo y refuerzos a nuevos motores sin inventar métricas;
- continuar las fases futuras de Motivación únicamente cuando la evidencia y el valor lo justifiquen.

### Largo plazo

- soporte multi-alumno más amplio;
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
3. Contenido, acompañamiento, asignación, evidencia y reconocimiento son responsabilidades diferentes.
4. Mi Camino organiza y acompaña; no debe poseer todo el producto.
5. La gestión adulta se mantiene separada de la experiencia normal del alumno y protegida por permisos.
6. Persona Activa determina de quién son los datos cuando el contexto difiere del usuario autenticado.
7. La IA acompaña y puede automatizar solo dentro de contratos explícitos y verificables.
8. El progreso incluye conocimiento y habilidades para la vida, pero no debe inferirse más de lo que la evidencia permite.
9. Las acciones necesarias deben estar guiadas de forma explícita.
10. La identidad y los personajes apoyan la experiencia, pero no la dominan.
11. La tecnología se adapta al alumno.
12. La Vista previa no escribe y el histórico es de solo lectura.
13. Los datos de prueba validan funcionalidad, no forman parte de la historia educativa real.
14. Se construye pronto para aprender y se consolida para crecer.
15. Las mejoras deben justificar su coste.
16. Se reutiliza y evoluciona antes de duplicar.
17. Cada conocimiento, dato y capacidad debe tener un propietario claro.
18. No todo contenido valioso debe convertirse en Misión o evidencia.
19. El producto debe poder crecer durante años sin perder su ADN.

---

## 25. Declaración de arquitectura

> **La Academia Gloria Valentina es un ecosistema de aprendizaje que combina contenidos, experiencias, acompañamiento, colaboración, motivación y progreso para ayudar a cada alumno a crecer en conocimiento académico y en habilidades para la vida.**

> **Su arquitectura no se organiza alrededor de pantallas inmutables, sino de dominios con responsabilidades claras, capaces de evolucionar de forma independiente y coherente.**

> **Cada nueva capacidad deberá demostrar que mejora una experiencia real, respeta el ADN del producto, reutiliza adecuadamente lo existente y aporta un beneficio suficiente para justificar su coste.**

> **Los datos y automatizaciones deben servir al aprendizaje sin convertir observaciones en etiquetas, pruebas en historia real ni curiosidad personal en evaluación obligatoria.**

---

## Decisiones adoptadas

| ID | Decisión | Estado | Impacto |
|---|---|---|---|
| PEA-001 | Organizar la experiencia del producto mediante dominios conceptuales y no mediante pantallas. | Aprobada | Arquitectura del Producto |
| PEA-002 | Definir Mi Camino como orquestador de Misiones y acompañamiento, sin convertirlo en contenedor universal. | Aprobada | Mi Camino · Escalabilidad |
| PEA-003 | Separar la experiencia del alumno y la gestión adulta, reutilizando los mismos contratos y protegiendo Gestión de Misiones por nivel de acceso. | Aprobada · implementada en su base actual | Alumno · Familia · Permisos |
| PEA-004 | Integrar explícitamente en el flujo toda acción imprescindible para el objetivo pedagógico. | Aprobada | UX · Aprendizaje |
| PEA-005 | Utilizar Reconocimientos para celebrar progreso, esfuerzo, constancia, autonomía y crecimiento sin convertir el aprendizaje en una transacción. | Aprobada · V1 implementada | Motivación · Recompensas |
| PEA-006 | Considerar iPad y otros dispositivos táctiles como parte habitual de la experiencia. | Aprobada | Accesibilidad · Multidispositivo |
| PEA-007 | Evaluar las mejoras arquitectónicas mediante beneficio, coste, impacto, riesgo y reversibilidad. | Aprobada | Evolución Responsable |
| PEA-008 | Adoptar Persona Activa como contexto funcional transversal cuando la Persona sobre la que se trabaja difiere del usuario autenticado. | Aprobada · implementada | Identidad · Multi-persona |
| PEA-009 | Separar Misión, sesión/resultado, evidencia y consulta histórica; Vista previa no escribe e histórico es solo lectura. | Aprobada · implementada en motores integrados | Misiones · Evidencias · Trazabilidad |
| PEA-010 | Convertir evidencia en análisis o refuerzo mediante observaciones prudentes y revisión humana, sin etiquetar al alumno ni inventar métricas. | Aprobada · V1 implementada | Análisis Educativo · Refuerzo |
| PEA-011 | Mantener datos `🧪` fuera de estadísticas, constancia y Reconocimientos reales. | Aprobada · implementada | Calidad de datos |
| PEA-012 | Estructurar la expansión curricular mediante Curso → Asignatura → Tema y generar evidencia desde el nacimiento de nuevos Temas cuando corresponda. | Aprobada · base implementada | Mis Cursos · 6.º |
| PEA-013 | Mantener Mi Baúl como espacio personal curado que no genera Misiones, evidencias, estadísticas ni Recompensas. | Aprobada · implementada | Contenidos · Acompañamiento |

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | 🟡 Candidato para aprobación |
| **Versión propuesta** | 1.1 |
| **Fecha** | 04/09/2026 |
| **Aprobado por** | Pendiente Product Owner |
| **Sustituye al aprobarse** | `PRODUCT_EXPERIENCE_ARCHITECTURE.md` v1.0 |
| **Sustituido por** | — |

**Impacto:** Arquitectura del Producto · Experiencia del Alumno · Persona Activa · Mi Camino · Gestión de Misiones · Familia · IA · Evidencias · Motivación · Evolución Responsable