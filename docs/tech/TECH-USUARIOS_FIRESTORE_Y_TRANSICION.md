# 👥 Usuarios, Personas y Firestore
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/tech/TECH-USUARIOS_FIRESTORE_Y_TRANSICION.md` |
| **Versión** | 0.4 |
| **Estado** | Activo como referencia técnica de transición |
| **Fecha de origen** | 10/08/2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Implementación técnica de Identidad y Accesos |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Estructura Firestore y transición técnica de PERSON, USER, ROLE, USER_ROLE, PERSON_RELATION, Persona Activa y Gestión de Usuarios |

## 🔗 Documentos relacionados

| Documento / fuente | Relación |
|---|---|
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** reglas funcionales y de acceso vigentes. |
| `docs/models/MODELO_ROLES.md` | **Modela:** actores y relaciones conceptuales sin duplicar permisos normativos. |
| `docs/manuales/MANUAL-GESTION_DE_USUARIOS.md` | **Opera:** procedimiento actual de alta y mantenimiento. |
| `docs/standards/STD-CONVENCIONES_DE_DATOS_Y_ATRIBUTOS.md` | **Gobierna:** nombres, auditoría y evolución de datos. |
| `compartido/js/contexto-usuario.js` | **Implementa:** resolución actual de USER, PERSON, USER_ROLE, ROLE, Persona Activa y nivel efectivo. |
| `administracion/usuarios/` | **Implementa:** Gestión de Usuarios. |
| `compartido/api/academia.js` | **Implementa:** operaciones compartidas y resolución física de datos por Persona Activa. |
| `compartido/firebase/FireStore Rules.txt` | **Implementa/canoniza en repositorio:** reglas Firestore del proyecto; su edición en Git no certifica despliegue en Firebase. |
| `docs/history/TECH-DATOS-BASE-FIRESTORE-FASE1.md` | **Histórico:** fotografía de Fase 1/1.5 ya superada como referencia activa. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 0.4 | 04/09/2026 | Product Owner + AI Collaborator | P2. Sincroniza la referencia técnica con Persona Activa y el estándar vigente, retira la interpretación histórica `alumno = gestion`, actualiza propietarios documentales, formaliza el cálculo de nivel efectivo, la resolución física de datos legacy y la separación entre reglas versionadas y reglas realmente desplegadas. |
| 0.3 | 13/08/2026 | Product Owner + AI Collaborator | Consolidó la implementación Multi-Persona, Gestión de Usuarios y Auditoría Fase A. |
| 0.2 | 12/08/2026 | Product Owner + AI Collaborator | Alineó el documento con la implementación Multi-Persona y Gestión de Usuarios. |
| 0.1 | 10/08/2026 | Product Owner + AI Collaborator | Primera propuesta técnica. |

---

## 🎯 1. Propósito

Describir **cómo está materializado técnicamente** el modelo de identidad y acceso que permite separar:

```text
Usuario autenticado
Persona propia
Rol efectivo
Persona Activa
Relación con otra Persona
Datos físicos todavía alojados bajo usuarios/{uid}
```

Este documento no redefine permisos. Las reglas obligatorias pertenecen a `STD-USUARIOS_ROLES_Y_ACCESOS.md` y a los contratos de cada módulo.

---

## 🧱 2. Estructuras principales

La implementación utiliza actualmente:

```text
personas
usuarios
roles
usuarioRoles
personaRelaciones
accesosLogin
```

Además, varias capacidades educativas continúan almacenándose por compatibilidad bajo:

```text
usuarios/{userId}/...
```

Esto no convierte USER en propietario conceptual de todos esos datos. `ContextoUsuario` resuelve qué `userId` físico corresponde a la Persona Activa cuando un módulo legacy lo necesita.

---

## 👤 3. PERSON · `personas/{personaId}`

`PERSON` representa a la persona real.

Identificador:

```text
personaId
```

Propiedades técnicas relevantes:

- estable e interno;
- independiente de email, nombre y UID de Firebase;
- fuente prioritaria de datos personales y académicos actuales;
- puede incluir auditoría cuando fue creada o modificada bajo el modelo nuevo;
- no requiere inventar auditoría para registros legacy.

Campos habituales, no exhaustivos:

```text
activo
nombre
apellidos
nombreVisible
email
avatar
fechaNacimiento
idioma
zonaHoraria
colegio
curso
cursoEscolar
createdAt / createdBy
updatedAt / updatedBy
```

---

## 🔐 4. USER · `usuarios/{userId}`

La implementación actual utiliza:

```text
userId = UID de Firebase Authentication
```

USER conserva una identidad de acceso deliberadamente pequeña, por ejemplo:

```text
activo
personaId
login
fechaAlta
```

No deben volver a duplicarse aquí datos cuya fuente es PERSON únicamente por comodidad.

`fechaAlta` es un dato propio del alta del USER y no obliga a inventar `createdAt/createdBy` en documentos legacy.

---

## 🎭 5. ROLE y USER_ROLE

Asignación vigente:

```text
usuarioRoles/{userId}
```

La implementación actual espera **un único USER_ROLE efectivo por Usuario**.

El `roleId` referencia:

```text
roles/{roleId}
```

El nivel se obtiene del ROLE almacenado y se normaliza a una de estas formas canónicas:

```text
consulta
gestion
administracion
```

### Regla importante

No se codifica en este documento una equivalencia fija:

```text
alumno = gestion
```

Esa fue una interpretación histórica ya sustituida.

El alumno puede escribir sus propios datos educativos cuando el contrato del módulo lo permite sin recibir por ello capacidad adulta de `gestion`.

El código actual carga `roles/{roleId}.nivelAcceso`; por tanto, el catálogo de ROLE y el estándar vigente gobiernan el significado, no una tabla histórica copiada aquí.

---

## 🔗 6. PERSON_RELATION · `personaRelaciones/{relationId}`

Una Relación conecta Personas, no Usuarios.

Campos conceptuales:

```text
sourcePersonId
targetPersonId
tipoRelacion
nivelAcceso
activo
createdAt / createdBy
updatedAt / updatedBy
```

Para Persona Activa ajena:

```text
nivel efectivo = nivel más restrictivo entre Rol y Relación
```

Una Relación puede limitar, pero no elevar por sí sola, la capacidad general concedida por el Rol.

---

## 🎯 7. Persona Activa

`compartido/js/contexto-usuario.js` mantiene separados:

```text
USER autenticado
PERSON propia
Persona Activa
Relación, si existe
nivelAcceso efectivo
userId físico de la Persona Activa
```

Reglas técnicas actuales:

1. sin selección válida, Persona Activa = Persona propia;
2. una Persona ajena requiere Relación activa válida;
3. si la Persona relacionada no existe o no puede resolverse correctamente, se vuelve a la Persona propia;
4. la selección se conserva actualmente en `sessionStorage`;
5. cambiar Persona Activa no cambia Firebase Authentication ni la autoría real;
6. cuando una subcolección legacy vive bajo `usuarios/{uid}`, debe existir exactamente un USER activo asociado a la Persona Activa; cero o varios detienen la resolución en lugar de elegir arbitrariamente.

---

## 🔑 8. Login funcional · `accesosLogin/{login}`

`accesosLogin` permite resolver el login funcional utilizado por la Academia hacia la identidad técnica necesaria para autenticación.

Puede conservar, según el registro:

```text
userId
authEmail
activo
createdAt / createdBy
updatedAt / updatedBy
```

`authEmail` pertenece al mecanismo de autenticación/login y no debe convertirse en duplicado indiscriminado dentro de USER.

---

## 🛠️ 9. Gestión de Usuarios

En la operación vigente:

1. la identidad de **Firebase Authentication** se crea manualmente;
2. Gestión de Usuarios administra las estructuras Firestore coordinadas;
3. las operaciones sensibles requieren nivel `administracion`;
4. la interfaz no sustituye las Firestore Rules;
5. las actualizaciones deben conservar atributos no gestionados cuando corresponda y no fabricar datos históricos.

La guía operativa vigente es `docs/manuales/MANUAL-GESTION_DE_USUARIOS.md`.

---

## 🧾 10. Auditoría

Las entidades nuevas o intervenidas aplican las convenciones propietarias de datos.

Cuando corresponda:

```text
createdAt
createdBy
updatedAt
updatedBy
```

El actor de auditoría es el **USER autenticado real**, no la Persona Activa.

USER conserva su esquema mínimo histórico mientras no exista una decisión explícita de migración.

---

## 🔒 11. Firestore Rules

Fuente canónica versionada en el repositorio:

```text
compartido/firebase/FireStore Rules.txt
```

Reglas operativas:

- la UI no es frontera de seguridad;
- Persona Activa no concede permisos por sí sola;
- las Rules deben validar identidad/relación/capacidad según el contrato implementado;
- un cambio en GitHub **no demuestra que las reglas estén desplegadas en Firebase**;
- antes de afirmar que una regla está activa en producción debe existir evidencia del despliegue correspondiente.

---

## 🔄 12. Estado de transición

El modelo nuevo de identidad está activo, pero persiste una compatibilidad deliberada:

```text
Identidad y contexto nuevos
+
subcolecciones funcionales históricas bajo usuarios/{uid}
```

La transición no exige una migración física global mientras el resolver compartido mantenga una correspondencia segura y el coste de migrar no aporte valor suficiente.

No crear una segunda estructura de datos solo para eliminar esa compatibilidad visualmente.

---

## ⏸️ 13. Fuera de alcance actual

No se consideran implementados por este documento:

- múltiples Roles simultáneos por USER;
- permisos granulares universales por operación;
- impersonación real;
- migración global de todas las subcolecciones desde `usuarios/{uid}` hacia PERSON;
- historial completo de auditoría;
- administración automática de Firebase Authentication mediante backend/Admin SDK;
- un modelo académico histórico completo.

---

## ✅ 14. Quality Gate

Antes de modificar identidad/acceso verificar:

- [ ] USER autenticado y Persona Activa siguen separados;
- [ ] el propietario de permisos es `STD-USUARIOS_ROLES_Y_ACCESOS.md`;
- [ ] no se reintroduce `alumno = gestion` como regla fija;
- [ ] el nivel relacionado no supera al Rol;
- [ ] autoría usa al USER real;
- [ ] se reutiliza `ContextoUsuario` antes de crear otro resolver;
- [ ] módulos legacy resuelven el `userId` físico de la Persona Activa de forma inequívoca;
- [ ] Firestore Rules versionadas y estado desplegado no se confunden;
- [ ] no se inventa auditoría histórica;
- [ ] no se migra masivamente por estética.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo como referencia técnica de transición |
| **Versión activa** | 0.4 |
| **Fuente normativa** | `STD-USUARIOS_ROLES_Y_ACCESOS.md` |
| **Fuente de modelo** | `MODELO_ROLES.md` |
| **Implementación principal** | `ContextoUsuario` + Gestión de Usuarios + APIs propietarias + Firestore Rules |
| **Migración global de subcolecciones** | No requerida actualmente |
