###############################################################################
#
# Academia Gloria Valentina
#
# MODEL-MOTORES_DE_APRENDIZAJE.md
#
# Modelo conceptual
#
# "Un motor aporta la experiencia.
# El contenido le da vida.
# La Academia conecta ambos con el camino del alumno."
#
###############################################################################

# ⚙️ Motores de Aprendizaje

## Modelo conceptual de la Academia Gloria Valentina

**Código documental:** `MODEL-MOTORES_DE_APRENDIZAJE`  
**Versión:** 0.2  
**Estado:** Modelo conceptual en evolución  
**Ubicación:** `docs/models/MODEL-MOTORES_DE_APRENDIZAJE.md`

## Historial de versiones

### Versión 0.2

Incorpora la revisión funcional y arquitectónica posterior a la lectura de la versión 0.1:

- ubicación real de las historias de Mi Rincón de Lectura en `historias.js`;
- comparación equilibrada entre Detectives y Mi Rincón de Lectura;
- principio de construcción del Motor de Semillas a partir de lo mejor de ambos;
- representación gráfica del flujo de acceso libre y del flujo desde una misión;
- distinción entre Datos, Observaciones, Insumos y Acciones;
- explicación conceptual del contrato de integración con Misiones;
- reconocimiento explícito de que una Misión contiene una o más Tareas;
- posible configuración administrable de la Academia, sin crearla prematuramente;
- servicios comunes de grabación y análisis de voz;
- principio de reutilización de Lía;
- consideración pendiente de seguridad, autorización y datos sensibles;
- criterio de promoción del modelo a versión 1.0;
- observación de producto sobre la futura simplificación de Mi Camino.

### Versión 0.1

Primera identificación del concepto de Motor de Aprendizaje y de los casos Detectives, Lectura y Semillas.  
**Documentos relacionados:**

- `docs/FOUNDATION.md`
- `docs/product/SPEC-CRECIENDO_POR_DENTRO.md`
- Especificaciones funcionales de los módulos que utilicen este modelo
- Estándares técnicos y documentales aplicables

---

# 1. Propósito

Este documento define el modelo conceptual de **Motores de Aprendizaje** de la Academia Gloria Valentina.

Su propósito es identificar y describir un patrón que ya comienza a aparecer en distintos espacios de la Academia:

- **Aventuras Matemáticas — Detectives**.
- **Mi Rincón de Lectura**.
- **Creciendo por dentro — Semillas**.
- Otros módulos futuros que puedan reutilizar el mismo enfoque.

El modelo busca responder a estas preguntas:

1. ¿Qué entendemos por Motor de Aprendizaje?
2. ¿Qué responsabilidades debe asumir?
3. ¿Qué elementos deben ser configurables?
4. ¿Qué elementos pueden compartirse entre módulos?
5. ¿Cómo se integra con Misiones, Mi Camino, Mis Tareas y Mis Logros?
6. ¿Cómo se registra el historial?
7. ¿Cómo pueden utilizarse los datos para acompañar mejor al alumno?
8. ¿Cómo evitar duplicar código y decisiones?
9. ¿Qué diferencias legítimas deben conservarse entre motores?
10. ¿Cómo se relacionan una Misión, sus Tareas y las experiencias ejecutadas?
11. ¿Cómo se transforman los datos registrados en acciones útiles?
12. ¿Qué configuraciones podrán administrarse sin modificar el código?

Este documento **no constituye todavía un estándar obligatorio**.

Describe un modelo conceptual que deberá validarse y evolucionar a partir de la experiencia real del producto.

---

# 2. Relación con la arquitectura documental

La ubicación conceptual de este documento es:

```text
FOUNDATION
¿Por qué existe la Academia?

        ↓

VISIÓN
¿Hacia dónde quiere evolucionar?

        ↓

PRODUCTO
¿Qué experiencias y comportamientos debe ofrecer?

        ↓

MODELOS
¿Cómo entendemos y organizamos los conceptos comunes?

        ↓

ESTÁNDARES
¿Qué reglas deben cumplirse?

        ↓

IMPLEMENTACIÓN
¿Cómo se construye en código?
```

`MODEL-MOTORES_DE_APRENDIZAJE.md` pertenece a **Modelos**.

No define por sí solo una implementación técnica obligatoria.

No sustituye las especificaciones funcionales de cada módulo.

No debe convertirse prematuramente en una arquitectura rígida.

Su función es ofrecer un lenguaje común y una estructura conceptual compartida.

---

# 3. Definición

Un **Motor de Aprendizaje** es un conjunto reutilizable de comportamientos que permite presentar, ejecutar, acompañar, registrar y completar experiencias educativas o de crecimiento sin depender de un único contenido específico.

El motor proporciona la forma.

El contenido proporciona la experiencia concreta.

Ejemplo:

```text
Motor Detectives
        +
historias.json
        =
Aventuras Matemáticas concretas
```

```text
Motor de Lectura
        +
lecturas, configuraciones y recursos
        =
Sesiones concretas de Mi Rincón de Lectura
```

```text
Motor de Semillas
        +
semillas.json
        =
Experiencias concretas de Creciendo por dentro
```

---

# 4. Principio central

> **El comportamiento común debe estar en el motor.**
>
> **El contenido variable debe estar en configuración.**

El objetivo es que una nueva historia, lectura, situación o Semilla pueda incorporarse, cuando sea razonable, sin modificar:

- el HTML;
- el flujo principal;
- la navegación;
- la integración con Misiones;
- el registro de progreso;
- los componentes compartidos.

Esto no significa que todo deba resolverse mediante JSON.

Significa que debemos distinguir conscientemente entre:

- comportamiento;
- contenido;
- configuración;
- datos generados;
- integración;
- presentación.

---

# 5. Qué no es un Motor de Aprendizaje

Un Motor de Aprendizaje no es:

- una pantalla aislada;
- un archivo JavaScript grande;
- un conjunto de textos;
- un módulo completo por sí solo;
- una configuración JSON sin lógica;
- una librería genérica obligatoria para toda la Academia;
- un sustituto de la especificación funcional;
- una excusa para sobrearquitectura.

Tampoco todos los módulos de la Academia tienen que convertirse en motores.

Un motor tiene sentido cuando existe:

- repetición de una misma mecánica;
- contenido variable;
- posibilidad real de crecimiento;
- necesidad de historial;
- integración con Misiones;
- reutilización funcional;
- beneficio de mantenimiento.

---

# 6. Componentes conceptuales

Un Motor de Aprendizaje puede entenderse mediante seis componentes principales:

```text
1. Motor
2. Contenido
3. Configuración
4. Experiencia
5. Registro
6. Integración
```

## 6.1 Motor

Contiene la lógica común.

Ejemplos:

- cargar contenido;
- validar estructura;
- iniciar experiencia;
- navegar entre pasos;
- gestionar estado;
- mostrar apoyos;
- registrar avance;
- finalizar;
- repetir;
- integrarse con una misión.

## 6.2 Contenido

Define qué vive el alumno.

Ejemplos:

- historia matemática;
- texto de lectura;
- situación emocional;
- preguntas;
- opciones;
- ilustraciones;
- audios;
- ayudas;
- cierre.

## 6.3 Configuración

Define variaciones de comportamiento sin cambiar el motor.

Ejemplos:

- nivel;
- duración;
- tipo de apoyo;
- filtros;
- número de intentos;
- uso de grabación;
- forma de cierre;
- asociación con una familia o categoría.

La configuración puede existir en dos niveles:

### Configuración propia del contenido

Pertenece a una experiencia o catálogo concreto.

Ejemplos:

- nivel de una historia;
- emociones asociadas a una Semilla;
- idioma de una lectura;
- apoyos visuales;
- duración estimada.

### Configuración administrable de la Academia

Permite que un administrador autorizado modifique opciones permitidas sin editar el código.

Ejemplos futuros:

- duración máxima de grabación;
- filtros habilitados;
- niveles de apoyo disponibles;
- comportamiento configurable de Lía;
- límites de intentos;
- preferencias del alumno;
- visibilidad familiar;
- recursos audiovisuales habilitados.

La Academia no creará una nueva carpeta o mecanismo general de configuración hasta que exista una necesidad real y aprobada.

La idea previamente evaluada de configurar guacamayas por emociones fue descartada por falta de valor actual.

Esa decisión no elimina la utilidad futura de una configuración administrable para otras necesidades justificadas.

## 6.4 Experiencia

Es la ejecución concreta que vive el alumno.

Ejemplo:

```text
Motor: Detectives
Contenido: El misterio del jardín
Alumno: Gloria
Origen: Misión asignada
Fecha: 05/08/2026
```

## 6.5 Registro

Conserva información útil sobre lo ocurrido.

Ejemplos:

- inicio;
- finalización;
- intentos;
- respuestas;
- apoyos utilizados;
- grabaciones;
- palabras a practicar;
- resultados;
- observaciones derivadas;
- relación con una misión.

## 6.6 Integración

Conecta la experiencia con el resto de la Academia.

Ejemplos:

- Mi Universo;
- Mi Camino;
- Mis Tareas;
- Misiones;
- Mis Logros;
- perfil del alumno;
- historial;
- familia;
- Lía;
- futuras capacidades de IA.

---

# 7. Modelo general

El modelo distingue dos formas principales de entrada:

1. acceso contextual desde Mi Camino, Mis Tareas o una Misión;
2. acceso libre desde el menú o desde Mi Universo.

## 7.1 Flujo desde una Misión

```text
Mi Camino / Mis Tareas
          │
          ▼
Misión asignada
          │
          ├── Tarea 1
          ├── Tarea 2
          └── Tarea n
                  │
                  ▼
        Tarea asociada al motor
                  │
                  ▼
      Contexto de misión y tarea
  misionId · tareaId · criterios · filtros
                  │
                  ▼
         Motor de Aprendizaje
                  │
                  ▼
 Experiencia asignada o catálogo filtrado
                  │
                  ▼
       Ejecución de la experiencia
                  │
                  ▼
   Grabación de sesión y resultados
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
   Evidencia   Progreso    Historial
   de tarea    de misión
                  │
                  ▼
                Datos
                  │
                  ▼
      Observaciones / análisis
                  │
                  ▼
               Insumos
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
    Mi Camino   Familia   Próxima acción
```

## 7.2 Flujo desde acceso libre

```text
Mi Universo / Menú / Acceso directo
                  │
                  ▼
         Motor de Aprendizaje
                  │
                  ▼
               Catálogo
                  │
                  ▼
          Filtros opcionales
                  │
                  ▼
      Selección de experiencia
                  │
                  ▼
       Ejecución de la experiencia
                  │
                  ▼
   Grabación de sesión y resultados
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
   Historial     Datos    Logro personal
                  │
                  ▼
      Observaciones / análisis
                  │
                  ▼
               Insumos
                  │
                  ▼
    Recomendación o continuidad
```

## 7.3 Capas comunes

```text
┌─────────────────────────────────────────────┐
│            ACADEMIA GLORIA VALENTINA        │
└─────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│          SERVICIOS COMPARTIDOS              │
│                                             │
│  Autenticación y autorización               │
│  Perfil del alumno                          │
│  Mi Camino                                  │
│  Mis Tareas y Misiones                      │
│  Mis Logros                                 │
│  Historial                                  │
│  Lía                                        │
│  Grabación                                  │
│  Persistencia                               │
└─────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│          MOTOR DE APRENDIZAJE               │
│                                             │
│  Carga · Flujo · Interacción · Apoyos       │
│  Evaluación funcional · Cierre              │
└─────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│          CONTENIDO CONFIGURABLE             │
│                                             │
│  JSON o JavaScript de datos                 │
│  Recursos visuales · Audio · Textos         │
│  Variantes · Filtros · Niveles              │
└─────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│          EXPERIENCIA DEL ALUMNO             │
└─────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│  DATOS → OBSERVACIONES → INSUMOS → ACCIONES │
└─────────────────────────────────────────────┘
```
---

# 8. Motores identificados

## 8.1 Motor Detectives

### Propósito

Presentar aventuras matemáticas basadas en historias y retos.

### Contenido variable

- historias;
- nivel;
- tema;
- preguntas;
- pistas;
- apoyos visuales;
- soluciones;
- criterios de filtrado.

### Capacidades observadas

- historias configurables;
- contenido externo en JSON;
- apoyo visual;
- filtros;
- flujo estructurado;
- integración con Misiones;
- apertura contextual cuando se accede desde una misión;
- registro de avance;
- historial.

### Archivo de contenido de referencia

```text
historias.json
```

### Fortalezas principales

- separación clara entre contenido y comportamiento;
- facilidad para añadir historias;
- catálogo y filtros;
- estructura repetible;
- mecánica especialmente adecuada para problemas matemáticos.

## 8.2 Motor de Lectura

### Propósito

Acompañar la lectura, grabar, analizar y proponer práctica.

### Ubicación real del contenido

Las lecturas se encuentran actualmente en:

```text
mi-universo/rincon-lectura/historias.js
```

El módulo importa:

```javascript
import { HISTORIAS } from "./historias.js";
```

Esto confirma que también existe separación entre contenido e interfaz, aunque se utiliza JavaScript en lugar de JSON.

### Contenido variable

- textos;
- párrafos;
- nivel;
- categoría;
- dificultad;
- valores;
- preguntas;
- apoyos;
- palabras;
- imágenes;
- instrucciones;
- reflexión;
- frase del día.

### Capacidades observadas

- catálogo visual cuidadosamente presentado;
- filtros;
- grabación;
- reproducción;
- varios intentos;
- transcripción;
- análisis de la lectura;
- identificación de palabras a repetir;
- registro de palabras superadas;
- registro de palabras no superadas;
- comprensión y respuestas;
- observaciones familiares;
- integración real con Misiones;
- evidencias asociadas;
- historial detallado;
- generación de datos de alto valor.

### Valor especial

El Motor de Lectura no solo registra que una actividad fue completada.

Genera información sobre el aprendizaje real.

Ejemplos:

- palabras identificadas para repetir;
- palabras superadas antes del límite de intentos;
- palabras no superadas;
- evolución entre sesiones;
- número de intentos;
- grabación;
- transcripción;
- respuestas;
- apoyos que resultaron útiles.

Estos datos constituyen un insumo valioso para acompañar el crecimiento del alumno.

### Fortalezas principales

- experiencia visual madura;
- práctica oral;
- grabación y análisis;
- persistencia rica;
- historial;
- participación familiar;
- integración profunda con Misiones y evidencias.

## 8.3 ¿Qué motor es mejor?

Ninguno es globalmente mejor.

Cada uno resuelve una necesidad distinta y está más maduro en capacidades diferentes.

```text
Detectives
Destaca en:
- contenido externo;
- catálogo;
- filtros;
- estructura repetible;
- separación motor/contenido.

Mi Rincón de Lectura
Destaca en:
- experiencia visual;
- voz;
- análisis;
- historial;
- datos;
- familia;
- integración con Misiones.
```

La conclusión para Semillas es:

> **Tomar de Detectives la arquitectura de contenidos y catálogo.**
>
> **Tomar de Mi Rincón de Lectura la riqueza de interacción, grabación, historial e integración.**

No se copiará por completo ninguno de los dos motores.

## 8.4 Motor de Semillas

### Propósito

Presentar experiencias de crecimiento personal, emocional, comunicativo y social.

### Contenido variable

- situaciones;
- emociones;
- tipos de situación;
- niveles de apoyo;
- pasos;
- preguntas;
- respuestas;
- grabaciones;
- apoyos visuales;
- cierres;
- familias de Semillas.

### Capacidades previstas

- contenido configurable mediante `semillas.json` o equivalente;
- catálogo visual;
- filtros;
- grabación;
- análisis educativo de la práctica oral;
- integración con Misiones;
- historial;
- observaciones;
- insumos;
- acompañamiento de Lía;
- crecimiento visual;
- posible Jardín Personal.

### Principio de diseño

El Motor de Semillas será el primer caso nuevo utilizado para validar este modelo conceptual.
---

# 9. Contenido configurable

El contenido configurable deberá permitir incorporar nuevas experiencias sin modificar el motor cuando el comportamiento sea equivalente.

## 9.1 Ejemplo conceptual

```json
{
  "id": "semilla-decir-lo-que-siento-001",
  "titulo": "Aprendo a decir lo que siento",
  "familia": "comunicacion",
  "emociones": ["enfado", "confusion", "nervios"],
  "tipoSituacion": "colegio",
  "nivelApoyo": 2,
  "duracionEstimada": 7,
  "situacion": {},
  "pasos": [],
  "recursos": {},
  "cierre": {},
  "integracion": {}
}
```

Este ejemplo no define todavía el esquema definitivo.

El esquema deberá surgir de la validación de la primera implementación.

## 9.2 Principios

El contenido deberá ser:

- identificable;
- validable;
- versionable;
- legible;
- mantenible;
- separable de la lógica;
- reutilizable cuando corresponda;
- suficientemente expresivo;
- no más complejo de lo necesario.

## 9.3 Encabezado descriptivo

Cuando el formato lo permita, la finalidad del archivo deberá documentarse en el README de su carpeta.

Los archivos JSON deberán contener únicamente información compatible con JSON válido.

No deberán utilizarse comentarios no soportados por el formato.

---

# 10. Responsabilidades del motor

Un motor podrá asumir las siguientes responsabilidades:

## 10.1 Inicialización

- cargar configuración;
- determinar contexto;
- identificar alumno;
- identificar misión;
- validar contenido;
- preparar estado.

## 10.2 Presentación

- construir pantalla inicial;
- mostrar contenido;
- aplicar recursos;
- adaptar nivel de apoyo;
- respetar accesibilidad.

## 10.3 Navegación

- avanzar;
- retroceder;
- pausar;
- continuar;
- repetir;
- salir de forma segura.

## 10.4 Interacción

- recibir selecciones;
- recibir texto;
- recibir voz;
- mostrar ayudas;
- permitir revisión;
- gestionar intentos.

## 10.5 Acompañamiento

- activar mensajes de Lía;
- mostrar ayudas oportunas;
- reforzar el esfuerzo;
- evitar mensajes inadecuados.

## 10.6 Registro

- guardar estado;
- guardar avance;
- asociar misión;
- generar historial;
- conservar datos útiles;
- evitar almacenar información innecesaria.

## 10.7 Cierre

- sintetizar;
- registrar finalización;
- actualizar misión;
- actualizar Mi Camino;
- generar logro cuando corresponda;
- mostrar continuidad.

---

# 11. Responsabilidades del contenido

El contenido deberá definir:

- objetivo de la experiencia;
- instrucciones;
- historia o situación;
- preguntas;
- respuestas;
- pistas;
- apoyos;
- recursos;
- criterios propios;
- mensajes de cierre;
- categorías;
- filtros;
- metadatos.

El contenido no debería contener lógica técnica compleja.

No debería decidir directamente:

- autenticación;
- persistencia;
- navegación global;
- seguridad;
- resolución de rutas;
- gestión de sesión;
- reglas generales de Misiones.

---

# 12. Servicios compartidos

Los motores no deberían implementar repetidamente capacidades que pertenecen a la Academia.

## 12.1 Autenticación

Identificar usuario y sesión.

## 12.2 Perfil del alumno

Proporcionar:

- identidad;
- preferencias;
- contexto;
- nivel;
- apoyos configurados;
- datos autorizados.

## 12.3 Mis Tareas y Misiones

Una **Misión puede contener una o más Tareas**.

La relación conceptual es:

```text
Misión
├── Tarea 1
├── Tarea 2
└── Tarea n
```

Cada Tarea podrá:

- estar asociada a un motor;
- identificar una experiencia concreta;
- definir filtros o criterios;
- requerir una o varias ejecuciones;
- generar una o más evidencias;
- contribuir al progreso global de la Misión.

El servicio deberá permitir:

- asignación;
- apertura contextual;
- seguimiento por tarea;
- cálculo del progreso de la misión;
- finalización de tareas;
- finalización de misión;
- relación con experiencias concretas;
- evidencias;
- reapertura cuando corresponda.

## 12.4 Mi Camino

Mostrar:

- siguiente paso;
- continuidad;
- recomendaciones;
- actividades pendientes;
- experiencias recientes.

## 12.5 Mis Logros

Registrar avances significativos sin convertirlos en competición.

## 12.6 Historial

Conservar eventos útiles y consultables.

## 12.7 Lía

La mayor parte posible de Lía deberá ser común.

Se considerará común:

- identidad;
- voz;
- tono;
- reglas de lenguaje;
- componentes visuales;
- reproducción de mensajes;
- accesibilidad;
- mensajes de ayuda;
- tratamiento de errores;
- principios de acompañamiento.

Cada motor definirá únicamente lo que necesite ser específico:

- diálogos;
- contenido pedagógico;
- ayudas contextuales;
- reacción a resultados;
- cierre propio.

La pregunta de diseño será:

> **¿Qué parte de Lía necesita ser diferente en este motor?**

y no:

> ¿Qué pequeña parte puede reutilizarse?

## 12.8 Persistencia

Guardar datos con reglas compartidas.

## 12.9 Recursos

Resolver imágenes, audio, vídeo y otros assets cuando se consolide un mecanismo común.

---

# 13. Integración con Misiones

La integración con Misiones será una capacidad transversal.

## 13.1 Relación Misión–Tareas

Una Misión agrupa uno o más objetivos operativos representados como Tareas.

```text
Misión
    │
    ├── Tarea de Lectura
    ├── Tarea de Detectives
    └── Tarea de Semillas
```

Una misma Misión podrá combinar varios motores.

Ejemplo:

```text
Misión:
“Me preparo para explicar una situación”

Tarea 1:
Leer una historia relacionada.

Tarea 2:
Completar una Semilla de comunicación.

Tarea 3:
Grabar una respuesta final.
```

La Misión se completa según sus criterios y el estado de las Tareas relacionadas.

## 13.2 Acceso libre

El alumno entra directamente al módulo.

```text
Mi Universo
    ↓
Motor
    ↓
Catálogo
    ↓
Experiencia elegida
```

No existe contexto de misión ni tarea.

## 13.3 Acceso desde una tarea de misión

El alumno entra desde Mi Camino o Mis Tareas.

```text
Misión
    ↓
Tarea seleccionada
    ↓
Contexto de misión y tarea
    ↓
Motor
    ↓
Experiencia asignada o filtrada
    ↓
Resultado asociado a la tarea
    ↓
Progreso agregado en la misión
```

## 13.4 Qué significa “contrato”

El contrato no implica necesariamente una interfaz técnica compleja.

Representa el conjunto mínimo y estable de información que intercambian:

- Misiones y Tareas;
- el Motor de Aprendizaje;
- el servicio de evidencias;
- el historial.

### La Misión o Tarea entrega al motor

```text
misionId
tareaId
modulo
actividadId o filtros
criterio de cumplimiento
cantidad objetivo
ruta de retorno
parámetros permitidos
```

### El motor devuelve o registra

```text
sesionId
actividad realizada
estado
resultado
evidencia
progreso de la tarea
progreso de la misión
destino de revisión
```

El contrato técnico exacto deberá extraerse de una auditoría del código existente antes de formalizarse como estándar.

## 13.5 Comportamiento contextual

Cuando la experiencia se abra desde una tarea de misión:

- deberá reconocerse la misión;
- deberá reconocerse la tarea;
- el avance se asociará a ambas;
- la evidencia se registrará para la tarea;
- el progreso de la misión se recalculará;
- la navegación de salida respetará el origen;
- el historial conservará las relaciones;
- una tarea completada no implicará necesariamente una misión completada.

## 13.6 Evidencias

Una ejecución podrá producir una evidencia.

Ejemplos:

```text
Lectura completada
Historia de Detectives resuelta
Semilla practicada
Grabación final guardada
```

Una Tarea podrá requerir:

- una evidencia;
- varias evidencias;
- una cantidad objetivo;
- condiciones adicionales.

## 13.7 Reutilización

Este patrón deberá reutilizar lo ya validado en:

- Aventuras Matemáticas;
- Mi Rincón de Lectura;
- Mis Tareas;
- servicio de evidencias;
- navegación contextual.

No deberá reconstruirse desde cero sin una razón funcional.
---

# 14. Integración con Mi Camino

Mi Camino podrá utilizar información de los motores para mostrar:

- experiencia pendiente;
- experiencia recomendada;
- continuación;
- repetición útil;
- actividad completada;
- siguiente paso.

Mi Camino no deberá interpretar por sí solo el significado pedagógico de los datos.

Los motores o servicios especializados deberán proporcionar información comprensible.

### Observación de producto

A futuro, Mi Camino podría simplificarse para funcionar principalmente como un tablero personal de:

- Misiones asignadas;
- siguiente paso;
- progreso;
- necesidad de ayuda;
- continuidad recomendada.

Las Tareas detalladas podrían permanecer en **Mis Tareas**.

Esta posibilidad pertenece al diseño de producto y no se resuelve dentro de este modelo.

Ejemplo:

```text
Motor de Lectura:
“Hay tres palabras que conviene seguir practicando.”

Mi Camino:
“Continúa practicando estas palabras.”
```

---

# 15. Integración con Mis Logros

Los motores podrán generar logros personales.

Ejemplos:

```text
Lectura:
“Superé una palabra que me costaba.”

Detectives:
“Encontré una estrategia para resolver el reto.”

Semillas:
“Practiqué cómo decir lo que siento.”
```

Los logros deberán:

- estar vinculados al crecimiento;
- evitar superioridad;
- evitar comparación;
- reconocer esfuerzo, práctica o avance;
- poder relacionarse con evidencia real.

---

# 16. Historial

El historial es una capacidad esencial del modelo.

No debe limitarse a registrar:

```text
Actividad completada: sí/no
```

Debe poder conservar información útil para comprender el recorrido.

## 16.1 Tipos de datos

### Datos de ejecución

- inicio;
- finalización;
- duración;
- pausas;
- repeticiones;
- origen;
- misión.

### Datos de interacción

- intentos;
- ayudas utilizadas;
- pasos repetidos;
- opciones elegidas;
- grabaciones autorizadas.

### Datos de aprendizaje

- elementos superados;
- elementos pendientes;
- errores recurrentes;
- apoyos efectivos;
- evolución;
- nuevas oportunidades.

### Datos de crecimiento

- habilidades practicadas;
- Semillas completadas;
- situaciones trabajadas;
- repeticiones;
- reflexiones autorizadas.

## 16.2 Principio de utilidad

No se guardarán datos por el simple hecho de poder hacerlo.

Todo dato persistido deberá responder:

> **¿Cómo puede ayudar a acompañar mejor al alumno?**

## 16.3 Principio de proporcionalidad

La utilidad deberá equilibrarse con:

- privacidad;
- sensibilidad;
- edad;
- consentimiento;
- acceso;
- retención;
- seguridad.

---

# 17. De datos a acciones útiles

El modelo incorpora cuatro niveles diferenciados:

```text
Datos
  ↓
Observaciones / análisis
  ↓
Insumos
  ↓
Acciones
```

## 17.1 Datos

Son hechos registrados por el sistema.

Ejemplos:

- palabra pronunciada;
- número de intentos;
- duración;
- respuesta elegida;
- nivel de apoyo;
- Semilla repetida;
- grabación guardada.

## 17.2 Observaciones o análisis

Interpretan los datos dentro de una regla educativa definida.

Ejemplos:

- la palabra no se reconoció en tres intentos;
- la fluidez mejoró entre el primer y el tercer intento;
- se utilizó el nivel máximo de apoyo;
- la experiencia fue repetida voluntariamente.

Una observación no debe presentarse como diagnóstico.

## 17.3 Insumos

Transforman la observación en información útil para acompañar.

Ejemplos:

- conviene continuar practicando esta palabra;
- esta habilidad merece otra experiencia;
- este apoyo parece facilitar la participación;
- sería útil revisar la sesión en familia.

## 17.4 Acciones

Convierten el insumo en continuidad concreta.

Ejemplos:

- recomendar una nueva lectura;
- crear una Tarea;
- asignar una Semilla;
- mostrar una sugerencia en Mi Camino;
- preparar un resumen familiar;
- generar material para una futura revisión profesional.

## 17.5 Ejemplo de Lectura

```text
Dato:
“extraordinario” no fue reconocida correctamente en tres intentos.

Observación:
La palabra continúa presentando dificultad.

Insumo:
Conviene seguir practicándola.

Acción:
Proponer una lectura o actividad donde aparezca nuevamente.
```

## 17.6 Ejemplo de Semillas

```text
Dato:
La alumna grabó tres intentos y repitió voluntariamente.

Observación:
La práctica oral necesitó repetición, pero se mantuvo la motivación.

Insumo:
Puede ser útil continuar con un nivel de apoyo similar.

Acción:
Recomendar otra situación de comunicación con el mismo nivel de apoyo.
```

## 17.7 Límites

Los datos, observaciones e insumos no deberán transformarse automáticamente en:

- diagnósticos;
- etiquetas;
- valoraciones de personalidad;
- conclusiones clínicas;
- juicios sobre el alumno.

Toda acción sensible deberá permanecer bajo control familiar o profesional.
---

# 18. Grabación y análisis de voz

La voz puede ser una capacidad importante para varios motores.

## 18.1 Servicio común de grabación

Existe una alta probabilidad de que convenga un servicio reutilizable para:

- solicitar permisos del micrófono;
- iniciar y detener;
- controlar duración;
- reproducir;
- repetir;
- eliminar;
- guardar;
- asociar a alumno, sesión, tarea y misión;
- aplicar reglas comunes de seguridad.

La reutilización deberá evaluarse mediante auditoría de Mi Rincón de Lectura antes de extraer el servicio.

## 18.2 Servicio común de análisis

También puede convenir una infraestructura compartida para:

- transcripción;
- segmentación;
- comparación;
- almacenamiento de resultados;
- gestión de errores;
- generación de observaciones.

La interpretación educativa continuará siendo específica del motor.

## 18.3 Usos educativos permitidos

- grabar;
- reproducir;
- comparar intentos;
- identificar palabras;
- revisar fluidez;
- revisar pronunciación;
- proponer práctica;
- observar progreso;
- apoyar expresión oral.

## 18.4 Usos que requieren especial revisión

- análisis emocional;
- clasificación de ánimo;
- detección de vergüenza;
- inferencias psicológicas;
- evaluación clínica;
- identificación biométrica.

## 18.5 Principio

> **La Academia podrá analizar la voz para apoyar una habilidad.**
>
> **No deberá utilizarla para diagnosticar a la persona.**

---

# 19. Filtros y descubrimiento

Los motores con catálogos deberán permitir descubrir contenido mediante filtros útiles.

## 19.1 Detectives

Posibles filtros:

- nivel;
- tema;
- operación;
- dificultad;
- estado.

## 19.2 Lectura

Posibles filtros:

- nivel;
- extensión;
- tema;
- dificultad;
- estado;
- categoría.

## 19.3 Semillas

Posibles filtros:

- emoción;
- familia;
- tipo de situación;
- nivel de apoyo;
- duración;
- contexto;
- estado;
- recomendada;
- asignada.

## 19.4 Reglas

Los filtros deberán:

- ayudar a elegir;
- evitar etiquetar al alumno;
- ser comprensibles;
- poder combinarse cuando aporte valor;
- ocultar complejidad innecesaria.

---

# 20. Nivel de apoyo

El nivel de apoyo es una dimensión transversal.

No equivale a nivel de inteligencia ni capacidad.

Representa cuánta ayuda ofrece la experiencia.

Ejemplo conceptual:

```text
Apoyo 1
Opciones directas y guía completa.

Apoyo 2
Frases incompletas y ayudas visibles.

Apoyo 3
Respuesta propia con ayudas disponibles.

Apoyo 4
Experiencia abierta y mayor autonomía.
```

Los niveles de apoyo:

- podrán variar por experiencia;
- podrán adaptarse;
- no se mostrarán como clasificación;
- podrán basarse en configuración;
- podrán utilizar datos previos cuando exista autorización.

---

# 21. Seguridad, autorización y datos sensibles

La seguridad y la autenticación existen actualmente en la Academia, pero todavía no se han consolidado con el nivel de detalle necesario para todos los escenarios de Motores de Aprendizaje.

Los motores dependerán de un modelo transversal que deberá definir:

- autenticación;
- autorización;
- roles;
- acceso familiar;
- acceso del alumno;
- datos sensibles;
- grabaciones;
- retención;
- eliminación;
- trazabilidad;
- protección de datos.

Este tema tiene prioridad importante, especialmente antes de ampliar:

- grabaciones;
- respuestas personales;
- análisis;
- participación de más alumnos;
- acceso profesional.

No se resolverá mediante reglas aisladas dentro de cada motor.

---

# 22. Rol de la IA

La IA podrá apoyar a los motores, pero no será el motor completo ni el centro de la experiencia.

## 24.1 Posibles capacidades

- analizar lectura;
- identificar palabras a practicar;
- generar variantes controladas;
- reformular;
- adaptar apoyo;
- resumir historial;
- sugerir contenido;
- ayudar a Lía;
- detectar patrones educativos;
- preparar insumos para familia.

## 24.2 Límites

La IA no deberá:

- sustituir el contenido aprobado sin control;
- diagnosticar;
- decidir autónomamente intervenciones sensibles;
- exponer datos;
- inventar historial;
- presentar inferencias como hechos;
- actuar fuera de las reglas de `FOUNDATION.md`.

## 24.3 Principio

> **La IA amplía la capacidad de acompañar.**
>
> **No reemplaza el criterio de la familia, del producto ni de los profesionales.**

---

# 23. Variaciones legítimas

No todos los motores deben ser idénticos.

## 24.1 Detectives

Puede requerir:

- solución;
- pistas;
- razonamiento;
- validación de respuesta;
- dificultad matemática.

## 24.2 Lectura

Puede requerir:

- audio;
- grabación;
- transcripción;
- palabras;
- intentos;
- análisis oral.

## 24.3 Semillas

Puede requerir:

- emociones;
- situaciones;
- privacidad reforzada;
- ausencia de respuestas correctas;
- acompañamiento sensible;
- práctica oral.

El modelo común no debe borrar estas diferencias.

Debe compartir únicamente lo que realmente sea común.

---

# 24. Reutilización

La reutilización puede ocurrir en varios niveles.

## 24.1 Reutilización funcional

- navegación;
- estados;
- historial;
- Misiones;
- filtros;
- carga;
- finalización.

## 24.2 Reutilización visual

- tarjetas;
- paneles;
- filtros;
- reproductores;
- grabación;
- ayudas;
- estados vacíos.

## 24.3 Reutilización de servicios

- autenticación;
- perfil;
- persistencia;
- Lía;
- análisis de voz;
- assets;
- misiones.

## 24.4 Reutilización de patrones

- abrir desde misión;
- continuar;
- repetir;
- revisar;
- mostrar logro;
- generar historial.

## 24.5 Criterio

No se reutilizará por obligación.

Se reutilizará cuando:

- reduzca duplicidad;
- mantenga claridad;
- preserve flexibilidad;
- mejore consistencia;
- no fuerce necesidades diferentes.

---

# 25. Evolución del modelo

## Etapa 1 — Identificación

Reconocer patrones existentes.

Motores observados:

- Detectives;
- Lectura;
- Semillas.

## Etapa 2 — Auditoría

Revisar técnicamente Detectives y Mi Rincón de Lectura para identificar:

- componentes;
- flujo;
- contenido;
- integración con Misiones;
- historial;
- grabación;
- análisis;
- datos;
- diferencias.

La auditoría será un insumo de implementación.

No requiere necesariamente un documento independiente.

## Etapa 3 — Validación

Implementar el primer ejemplo funcional de Semillas:

> “Un niño me quitó el lápiz.”

Observar:

- qué se pudo reutilizar;
- qué no;
- qué faltaba;
- qué era específico;
- cómo se integró con una Tarea y una Misión;
- qué datos e insumos se generaron;
- cómo reaccionó Gloria.

## Etapa 4 — Consolidación

Ajustar:

- servicios comunes;
- contratos;
- modelos de datos;
- componentes;
- integración;
- seguridad;
- configuración.

## Etapa 5 — Versión 1.0

El modelo no deberá pasar a versión 1.0 antes de:

1. implementar el primer piloto de Semillas;
2. validarlo técnicamente;
3. validarlo con Gloria;
4. revisar su integración con Misiones y Tareas;
5. confirmar qué elementos son realmente comunes;
6. actualizar el modelo según lo aprendido.

## Etapa 6 — Estandarización

Solo después de validación suficiente, considerar qué elementos merecen convertirse en estándares formales.
---

# 26. Criterios para crear un nuevo motor

Antes de crear un nuevo Motor de Aprendizaje, deberá comprobarse:

1. ¿Existe una mecánica repetible?
2. ¿Habrá múltiples contenidos?
3. ¿Se espera crecimiento?
4. ¿Necesita filtros?
5. ¿Necesita historial?
6. ¿Se integrará con Misiones?
7. ¿Generará datos útiles?
8. ¿Puede reutilizar servicios existentes?
9. ¿Un motor aporta más valor que páginas independientes?
10. ¿Se está evitando sobrearquitectura?

Si la respuesta general no justifica un motor, deberá utilizarse una solución más simple.

---

# 27. Principios de diseño

1. Primero necesidad real.
2. Después experiencia.
3. Después modelo.
4. Después reutilización.
5. Por último arquitectura técnica.

Además:

- no construir abstracciones prematuras;
- no duplicar sin necesidad;
- no generalizar a partir de un único caso;
- no sacrificar claridad;
- validar con el alumno;
- aprender de los datos;
- preservar privacidad;
- mantener alineación con `FOUNDATION.md`.

---

# 28. Decisiones conceptuales aprobadas

1. La Academia reconoce el concepto de **Motor de Aprendizaje**.
2. Un motor separa comportamiento común de contenido variable.
3. Detectives, Lectura y Semillas son los primeros casos de referencia.
4. Los motores pueden utilizar contenido configurable.
5. La integración con Misiones será transversal.
6. El historial debe conservar datos útiles, no solo finalización.
7. Los datos deben transformarse en insumos para acompañar.
8. El análisis de voz puede aportar valor educativo.
9. La IA podrá apoyar, pero no sustituir el criterio humano.
10. Las diferencias entre motores deben preservarse.
11. Este modelo no es todavía un estándar obligatorio.
12. El Motor de Semillas servirá como siguiente caso de validación.
13. Mi Rincón de Lectura utiliza actualmente `historias.js`.
14. Semillas tomará patrones de Detectives y de Mi Rincón de Lectura.
15. Una Misión puede contener una o más Tareas.
16. Una Misión puede combinar Tareas de distintos motores.
17. La integración deberá reconocer `misionId` y `tareaId`.
18. El flujo conceptual será Datos → Observaciones → Insumos → Acciones.
19. Se evaluará un servicio común de grabación.
20. Se evaluará infraestructura común de análisis de voz con interpretación específica por motor.
21. La mayor parte posible de Lía será común.
22. La configuración administrable se creará solo cuando exista una necesidad real.
23. Seguridad y autorización deberán consolidarse como capacidad transversal.
24. El modelo no pasará a versión 1.0 antes de validar el primer piloto de Semillas con Gloria.
25. Mi Camino podrá evolucionar hacia un tablero más limpio de Misiones, sin decidirlo dentro de este modelo.

---

# 29. Preguntas abiertas

1. ¿Qué capacidades comunes ya existen en componentes compartidos?
2. ¿Cuál es el flujo técnico real completo de Detectives?
3. ¿Cuál es el flujo técnico real completo de Mi Rincón de Lectura?
4. ¿Cuál es el contrato actual de integración con Misiones, Tareas y evidencias?
5. ¿Cómo se calcula actualmente el progreso de una Misión con varias Tareas?
6. ¿Qué estructura de historial utilizan Detectives y Lectura?
7. ¿Qué historial existente puede convertirse ya en insumos?
8. ¿Qué datos maestros deben normalizarse?
9. ¿Qué servicio común de grabación puede extraerse sin sobrearquitectura?
10. ¿Qué infraestructura de análisis de voz puede compartirse?
11. ¿Cómo se resolverán los assets configurables?
12. ¿Qué filtros podrán reutilizarse?
13. ¿Qué parte de Lía necesita realmente ser específica?
14. ¿Qué modelo transversal de permisos y seguridad se adoptará?
15. ¿Qué configuraciones administrables aportan valor real?
16. ¿Qué elementos merecerán convertirse en estándar después del piloto?

Estas preguntas deberán resolverse mediante:

- análisis de los módulos existentes;
- implementación del primer Motor de Semillas;
- validación con Gloria;
- uso real de los datos.

No deberán provocar una generación excesiva de documentos.

Cuando sea suficiente, las respuestas se incorporarán directamente a:

- este modelo;
- el SPEC propietario;
- el código;
- el backlog;
- el estándar correspondiente, solo si realmente se consolida una regla.
---

# 30. Glosario

## Motor de Aprendizaje

Comportamiento reutilizable para ejecutar una familia de experiencias.

## Contenido configurable

Información que define una experiencia concreta sin alterar la lógica principal.

## Experiencia

Ejecución concreta de un contenido por un alumno y en un contexto determinado.

## Contexto de misión

Información que vincula una experiencia con una tarea o misión.

## Historial

Registro de eventos, interacciones y resultados útiles.

## Insumo

Información derivada que puede ayudar a acompañar al alumno.

## Nivel de apoyo

Cantidad y tipo de ayuda ofrecida durante una experiencia.

## Servicio compartido

Capacidad común proporcionada por la Academia a varios módulos.

## Misión

Objetivo o recorrido asignado al alumno que contiene una o más Tareas.

## Tarea

Unidad operativa de una Misión.

Puede estar asociada a un motor, una experiencia, un criterio y una o más evidencias.

## Contrato de integración

Conjunto mínimo de información intercambiada entre Misiones, Tareas, motores, evidencias e historial.

## Observación

Interpretación educativa controlada de uno o varios datos.

No constituye diagnóstico.

## Acción

Continuidad concreta generada a partir de un insumo.

## Motor de Semillas

Motor previsto para las experiencias de Creciendo por dentro.

---

# Declaración final

Un Motor de Aprendizaje no existe para demostrar una arquitectura.

Existe para hacer posible que la Academia crezca sin perder coherencia.

El motor aporta la experiencia.

El contenido le da vida.

Los servicios compartidos lo conectan con el camino del alumno.

Las Misiones organizan objetivos.

Las Tareas convierten esos objetivos en acciones concretas.

El historial permite aprender de lo ocurrido.

Y la Academia utiliza ese aprendizaje para acompañar cada vez mejor.

No para juzgar.

No para comparar.

No para etiquetar.

Sino para reconocer oportunidades y ayudar al alumno a continuar.

Porque cada nueva experiencia debe apoyarse en lo que ya hemos aprendido.

Y cada nuevo motor debe conservar el mismo propósito con el que comenzó todo:

> **Ayudar a un niño a descubrir todo lo que puede llegar a hacer.**

🌱💜
