# 🤝 Especificación de Bitácora de Acompañamiento
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-BITACORA_ACOMPANAMIENTO.md` |
| **Versión** | 1.0-rc1 |
| **Estado** | Candidato · V1 construida en rama y pendiente de validación del Product Owner |
| **Fecha** | 06/09/2026 |
| **Última actualización** | 06/09/2026 |
| **Propietario** | Colaboración y Acompañamiento |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Registro colaborativo de observaciones, recomendaciones, dudas, sugerencias, seguimiento y una respuesta estructurada sobre la Persona Activa |

## 🔗 Documentos relacionados

| Documento / fuente | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Gobierna:** dignidad, privacidad, acompañamiento humano y centralidad del alumno. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna conceptualmente:** Dominio de Colaboración, participantes, privacidad, trazabilidad y separación entre observaciones adultas y mensajes al alumno. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** USER/PERSON, Persona Activa, relaciones y nivel efectivo de acceso. |
| `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md` | **Gobierna técnicamente:** reutilización, UX, navegación, seguridad y catálogos cerrados. |
| `docs/models/MODELO_NAVEGACION.md` | **Gobierna conceptualmente:** árbol compartido, Persona Activa y cabecera global. |
| `docs/models/MODELO_ARBOL_NAVEGACION.md` | **Representa:** árbol visible del producto. |
| `compartido/modelos/bitacora-acompanamiento.js` | **Implementa:** catálogos, validación y contrato de datos V1. |
| `compartido/api/bitacora-acompanamiento.js` | **Implementa:** lectura, publicación, observación y respuesta V1. |
| `bitacora/` | **Implementa:** experiencia de usuario de la Bitácora. |
| `compartido/firebase/FireStore Rules.txt` | **Implementa:** fuente canónica de autorización Firestore del proyecto. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0-rc1 | 06/09/2026 | Product Owner + AI Collaborator | Primera especificación propietaria. Materializa el Dominio de Colaboración como Bitácora de Acompañamiento V1: opción de menú, Persona Activa, entradas estructuradas, destino y visibilidad separados, opción `Otros` en catálogos cerrados, una única respuesta, autoría trazable, permisos específicos y fronteras respecto a chat, Misiones, evidencias, IA y Análisis Educativo. |

---

## 🎯 1. Propósito

La **Bitácora de Acompañamiento** permite que familia y profesionales autorizados compartan información útil para acompañar a una Persona sin convertir la Academia en un chat ni en una herramienta de vigilancia.

La pregunta funcional que responde es:

> **¿Cómo pueden las personas que acompañan al alumno registrar y consultar observaciones, recomendaciones, dudas y seguimiento de forma ordenada, trazable y con visibilidad controlada?**

La Bitácora conserva aportaciones humanas y facilita continuidad entre quienes acompañan al alumno.

---

## 📐 2. Alcance

### 2.1 Incluido en V1

- opción visible `🤝 Bitácora de Acompañamiento` en el menú compartido;
- contexto explícito de Persona Activa;
- listado cronológico de entradas, más reciente primero;
- creación de entradas por familia/profesionales relacionados y administración;
- tipos de entrada estructurados;
- destino funcional del mensaje;
- visibilidad real separada del destino;
- opción **Otros** en cada catálogo cerrado de clasificación de la V1;
- texto de especificación obligatorio cuando se selecciona `Otros`;
- indicación opcional `Requiere respuesta / seguimiento`;
- una única respuesta estructurada por entrada;
- filtros por texto, tipo, destino y autor;
- autoría y fechas visibles;
- lectura del alumno únicamente cuando la entrada se comparte expresamente con él;
- lectura adulta/profesional según relación activa y visibilidad;
- entradas publicadas inmutables desde la interfaz V1;
- ausencia de eliminación funcional en V1;
- persistencia bajo la Persona Activa mediante el USER físico asociado mientras continúe la arquitectura legacy de subcolecciones.

### 2.2 Fuera de alcance de V1

La Bitácora V1 no incluye:

- chat en tiempo real;
- hilos de respuestas;
- más de una respuesta por entrada;
- menciones `@usuario`;
- notificaciones push;
- envío automático de email;
- adjuntos;
- edición posterior de una entrada publicada;
- eliminación de entradas;
- creación automática de Misiones;
- creación automática de evidencias;
- Recompensas o Reconocimientos derivados de entradas;
- estadísticas sobre profesionales;
- análisis automático del contenido mediante IA;
- diagnósticos;
- inferencias clínicas, psicológicas, logopédicas o pedagógicas;
- mezcla automática de notas humanas con Análisis Educativo;
- destinatarios individuales específicos dentro de un grupo;
- workflow complejo de aprobación.

---

## 👥 3. Actores

### 3.1 Alumno

Puede consultar únicamente las entradas que hayan sido marcadas expresamente como visibles para alumno + familia + profesionales.

En V1 no publica entradas ni respuestas desde su Persona propia.

### 3.2 Familia y profesionales autorizados

Cuando trabajan sobre una Persona relacionada válida como Persona Activa pueden:

- leer entradas compatibles con su visibilidad;
- leer siempre sus propias entradas mientras la relación siga activa;
- publicar entradas propias;
- responder una entrada cuando requiere respuesta, todavía no fue respondida y el usuario actual no es su autor.

La capacidad de publicar en la Bitácora es un **contrato específico del módulo** y no convierte `consulta` en `gestion` general.

### 3.3 Administración

Puede consultar y operar el contrato V1 cuando el contexto de Persona Activa permita resolver la Persona objetivo.

Administración no sustituye la regla de Persona Activa ni crea una identidad paralela.

---

## 🎯 4. Persona Activa

Toda entrada pertenece conceptualmente a:

```text
personaId = Persona Activa
```

La ruta física V1 reutiliza la resolución vigente:

```text
Persona Activa
      ↓
USER físico asociado
      ↓
usuarios/{userId}/bitacoraAcompanamiento/{entradaId}
```

La Bitácora nunca debe decidir su Persona por nombre visible, URL, email o UID codificado.

La cabecera y el contenido deben dejar claro sobre quién se está trabajando, por ejemplo:

```text
🎯 Acompañamiento de: Gloria
```

La navegación interna conserva Persona Activa conforme al modelo transversal.

---

## 🧾 5. Entrada de Bitácora

### 5.1 Campos funcionales

Una entrada V1 contiene como mínimo:

```text
id
personaId
schemaVersion

tipo
tipoOtros

titulo
mensaje

destino
destinoOtros

visibilidad
visibilidadOtros
visibleParaPersonaActiva

requiereRespuesta
estado

autor / createdBy
createdByPersonaId
createdByNombre
createdByRol
createdByRelacion
createdAt
updatedAt
```

Cuando existe respuesta incorpora además:

```text
respuestaTexto
respuestaCreatedAt
respuestaCreatedBy
respuestaCreatedByPersonaId
respuestaCreatedByNombre
respuestaCreatedByRol
```

### 5.2 Longitudes V1

- título: máximo 180 caracteres;
- mensaje: máximo 6000 caracteres;
- detalle de `Otros`: máximo 180 caracteres;
- respuesta: máximo 4000 caracteres.

---

## 🧩 6. Catálogos cerrados y `Otros`

La V1 utiliza catálogos cerrados para facilitar lectura y filtrado, pero ninguno debe forzar al usuario a elegir una categoría incorrecta cuando aparece un caso no previsto.

Por ello, cada catálogo cerrado de clasificación de esta capacidad incluye **`Otros`**.

Cuando se selecciona `Otros`, el usuario debe especificar el significado en un campo de texto.

### 6.1 Tipo

```text
👀 Observación
💡 Recomendación
❓ Duda
🌱 Sugerencia
🤝 Acuerdo
🔄 Seguimiento
💬 Mensaje
⚠️ Asunto a revisar
🧩 Otros
```

### 6.2 Destino

Destino responde:

> **¿A quién va dirigido principalmente este mensaje?**

```text
🌍 Público / general
🎓 Alumno
🏠 Familia / Padres
👥 Profesionales
🤝 Familia + profesionales
🧩 Otros
```

### 6.3 Visibilidad

Visibilidad responde:

> **¿Quién puede leer realmente esta entrada?**

```text
🔒 Solo autor
👥 Familia y profesionales
🌈 Alumno + familia + profesionales
🧩 Otros
```

En V1, `Otros` de visibilidad utiliza por seguridad el comportamiento **Solo autor** aunque el texto describa la intención futura. No se amplía acceso mediante una clasificación que el modelo todavía no representa.

---

## 👁️ 7. Destino y visibilidad son conceptos diferentes

El **destino** expresa intención comunicativa.

La **visibilidad** determina autorización de lectura.

Ejemplo válido:

```text
Dirigido a: Alumno
Visible para: Familia y profesionales
```

Puede representar una recomendación pensada para ayudar al alumno que los adultos desean revisar antes de comunicársela.

Regla:

> **Una entrada dirigida al alumno no se vuelve automáticamente visible al alumno.**

---

## 🔐 8. Acceso, privacidad y seguridad

### 8.1 Alumno / Persona propia

Una Persona que consulta su propia Bitácora solo puede leer documentos con:

```text
visibleParaPersonaActiva = true
```

En V1 no puede crear entradas ni respuestas.

### 8.2 Persona relacionada

Un Usuario con relación activa hacia la Persona Activa y USER_ROLE activo puede consultar:

- entradas con `visibilidad = adultos-profesionales`;
- entradas con `visibilidad = todos-relacionados`;
- sus propias entradas, incluidas `solo-autor` y `otros`.

Puede publicar únicamente entradas cuya autoría técnica corresponda al USER autenticado.

### 8.3 Respuesta

Una respuesta exige simultáneamente:

- relación/autorización vigente o administración;
- `requiereRespuesta = true`;
- ausencia de respuesta anterior;
- autor de respuesta distinto del autor de la entrada;
- una única modificación limitada a campos de respuesta, estado y auditoría.

### 8.4 Entradas privadas

`solo-autor` y `otros` de visibilidad no deben aparecer en consultas generales de otros relacionados.

### 8.5 UI no es frontera de seguridad

Ocultar botones no sustituye las Firestore Rules.

La fuente canónica es:

```text
compartido/firebase/FireStore Rules.txt
```

> **Modificar este archivo en GitHub no despliega automáticamente las reglas en Firebase.** Antes de una prueba funcional remota que escriba/lea esta nueva colección, las Rules vigentes deben estar desplegadas en el proyecto Firebase correspondiente.

---

## 💬 9. Respuesta estructurada, no chat

Cada entrada puede tener:

```text
0 o 1 respuesta
```

Nunca en V1:

```text
entrada
└── respuesta
    └── respuesta
        └── respuesta
```

Si el tema necesita continuidad después de la respuesta, debe registrarse una nueva entrada.

La respuesta existe para cerrar o atender una cuestión concreta sin convertir la Bitácora en mensajería instantánea.

---

## 🔄 10. Estado

V1 utiliza:

```text
abierta
atendida
```

Una entrada nueva comienza `abierta`.

Cuando recibe su única respuesta pasa a `atendida`.

No se implementa todavía un workflow de reapertura, archivo o cierre administrativo.

---

## 🧭 11. Navegación

La Bitácora es un **nodo principal del menú compartido**, no parte de `Mi espacio personal`.

Ubicación conceptual:

```text
Academia
│
├── Mi Universo
├── Mis Cursos
├── 🤝 Bitácora de Acompañamiento
├── Administración
├── Explorar más
└── Descubre la Academia
```

Motivo:

- es un espacio colaborativo multi-actor;
- depende de Persona Activa;
- no es un acceso personal privado del USER autenticado;
- debe estar disponible como capacidad transversal del ecosistema.

La pantalla adopta la cabecera global y el contrato vigente de `Volver`.

---

## 🔎 12. Consulta y filtros

El listado V1:

- ordena por fecha de creación, más reciente primero;
- presenta tipo;
- título;
- extracto del mensaje;
- autor;
- rol/relación cuando existe;
- fecha;
- destino;
- visibilidad;
- estado de respuesta.

Filtros V1:

- búsqueda textual;
- tipo;
- destino;
- autor.

La búsqueda y el filtrado se realizan sobre las entradas que el backend ya autorizó a leer; nunca amplían visibilidad.

---

## ✍️ 13. Inmutabilidad y trazabilidad

Una entrada publicada no se edita ni elimina desde la interfaz V1.

Motivo:

- preservar la autoría original;
- evitar que una observación cambie después de haber sido leída o respondida;
- mantener una bitácora comprensible sin introducir versionado complejo.

Si alguien necesita corregir o ampliar una entrada, crea una nueva aportación.

La trazabilidad mínima conserva:

- UID del autor;
- PERSON del autor;
- nombre visible capturado;
- rol/relación capturados;
- fecha de publicación;
- y, cuando existe, autor y fecha de respuesta.

El nombre/rol capturado facilita lectura histórica; UID/PERSON mantienen la atribución técnica.

---

## 📊 14. Fronteras con otros dominios

### 14.1 Análisis Educativo

Bitácora = aportación humana.

Análisis Educativo = interpretación prudente de evidencias registradas por motores.

No deben mezclarse silenciosamente.

Una presentación futura puede mostrar ambas fuentes en secciones claramente diferenciadas, pero una observación profesional no se convierte automáticamente en dato estadístico.

### 14.2 Misiones

Una entrada puede inspirar una futura decisión familiar, pero V1 no crea ni modifica Misiones.

### 14.3 Evidencias

Una entrada no es evidencia de ejecución de una actividad y no completa objetivos de Misión.

### 14.4 Recompensas

Crear, leer o responder una entrada no genera Reconocimientos, Guacamayas, récords ni constancia.

### 14.5 IA / Lía

V1 no interpreta, resume, clasifica ni decide automáticamente sobre el texto libre de profesionales/familia.

---

## 🧪 15. Criterios de aceptación V1

### 15.1 Caso insignia adulto/profesional

```text
1. Profesional autorizado inicia sesión.
2. Selecciona al alumno como Persona Activa.
3. Abre Bitácora de Acompañamiento.
4. Publica una Recomendación.
5. Destino = Familia / Padres.
6. Visibilidad = Familia y profesionales.
7. Marca Requiere respuesta.
8. Familiar autorizado abre la Bitácora de la misma Persona.
9. Ve la recomendación.
10. Registra la única respuesta.
11. Profesional vuelve a consultar.
12. Ve la respuesta y la entrada aparece atendida.
```

### 15.2 Privacidad respecto al alumno

Con la entrada anterior:

```text
Alumno inicia sesión
→ NO ve la entrada
```

### 15.3 Compartir expresamente con alumno

```text
Profesional/familia publica otra entrada
→ Visibilidad = Alumno + familia + profesionales
→ Alumno inicia sesión
→ SÍ ve la entrada
```

### 15.4 `Otros`

En Tipo, Destino y Visibilidad:

```text
seleccionar Otros
→ aparece campo de especificación
→ campo es obligatorio
```

`Otros` de Visibilidad permanece privado al autor en V1.

### 15.5 No chat

```text
entrada con respuesta
→ no aparece segundo formulario de respuesta
→ para continuar se crea otra entrada
```

---

## ✅ 16. Quality Gate

Antes de declarar la V1 implementada y cerrada:

- [ ] nueva ruta carga sin errores de sintaxis/imports;
- [ ] opción de menú resuelve correctamente la ruta;
- [ ] cabecera global se carga una sola vez;
- [ ] Persona Activa se conserva;
- [ ] filtros no amplían visibilidad;
- [ ] `Otros` funciona en los tres catálogos;
- [ ] profesional con relación `consulta` puede publicar su propia entrada;
- [ ] alumno no puede publicar ni responder en V1;
- [ ] alumno no ve notas adultas;
- [ ] alumno sí ve una entrada expresamente compartida;
- [ ] una entrada privada solo es visible para su autor/admin;
- [ ] una respuesta solo puede registrarse una vez;
- [ ] autor de la entrada no puede auto-responderla;
- [ ] Firestore Rules bloquean edición/eliminación no prevista;
- [ ] fallback legacy no reabre permisos sobre la colección;
- [ ] no se generan Misiones, evidencias ni Recompensas;
- [ ] responsive básico funciona en móvil/tablet/escritorio;
- [ ] Rules canónicas desplegadas antes de validar la persistencia remota;
- [ ] diff final coincide con el alcance aprobado.

---

## 🔮 17. Evolución futura posible

Sin formar parte de V1, el contrato puede evolucionar hacia:

- relación explícita entre entradas;
- enlace con Misión, evidencia, actividad o contenido;
- destinatario profesional específico;
- archivo/reapertura;
- notificaciones proporcionales;
- adjuntos cuando exista necesidad real;
- consulta integrada en reportes con separación clara de fuentes.

Estas extensiones requieren nueva decisión; no se infieren de V1.

---

## 📌 18. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| BIT-001 | La capacidad se denomina `Bitácora de Acompañamiento`. | Aprobada |
| BIT-002 | La Bitácora es opción principal del menú compartido y opera sobre Persona Activa. | Aprobada |
| BIT-003 | Destino y visibilidad son conceptos separados. | Aprobada |
| BIT-004 | Cada entrada admite como máximo una respuesta estructurada; V1 no es chat. | Aprobada |
| BIT-005 | Las entradas publicadas son inmutables y no eliminables desde la interfaz V1. | Aprobada |
| BIT-006 | Familia/profesionales relacionados pueden publicar aportaciones propias sin adquirir capacidad general de `gestion`. | Aprobada |
| BIT-007 | El alumno solo lee entradas expresamente compartidas con él y no publica/responde en V1. | Aprobada |
| BIT-008 | Los catálogos cerrados de V1 incluyen `Otros`; cuando se usa debe especificarse. | Aprobada |
| BIT-009 | `Otros` de visibilidad utiliza un comportamiento conservador privado al autor hasta que exista un modelo explícito para otra audiencia. | Aprobada |
| BIT-010 | Las entradas humanas no se convierten automáticamente en Misiones, evidencias, análisis o Recompensas. | Aprobada |

---

## 🔄 19. Mantenimiento

Actualizar esta especificación cuando cambie el comportamiento funcional de la Bitácora.

No duplicar aquí reglas transversales de identidad, navegación o desarrollo más allá del resumen necesario para comprender el módulo.

Cuando la V1 sea validada y fusionada:

- cambiar estado de candidato a `Activo`;
- asignar versión estable `1.0`;
- sincronizar árbol de navegación, HandOff, Roadmap/Release Notes cuando corresponda;
- registrar el baseline real fusionado.

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Estado funcional** | ✅ Diseño aprobado · implementación V1 en rama · pendiente de prueba del Product Owner |
| **Versión candidata** | 1.0-rc1 |
| **Propietario funcional** | Colaboración y Acompañamiento |
| **Regla central** | Compartir información útil con trazabilidad y visibilidad controlada, sin convertir la Academia en chat ni vigilancia. |
