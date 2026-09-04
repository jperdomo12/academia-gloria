# 👥 Project Roles
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/PROJECT_ROLES.md` |
| **Versión** | 1.1 |
| **Estado** | Activo |
| **Fecha de origen** | 04/08/2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Gobierno del Proyecto |
| **Responsables** | Sponsor + Product Owner + Product Architect |
| **Ámbito** | Roles del proyecto, responsabilidades, autoridad, colaboración y asignación vigente; no confundir con Roles de Usuario de la Academia |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Fundamenta:** propósito humano del producto. |
| `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` | **Fundamenta/complementa:** principios estables del producto. |
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** propiedad y ubicación del conocimiento. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** calidad, versionado y trazabilidad documental. |
| `docs/ai/AI_COLLABORATION_GUIDE.md` | **Gobierna:** colaboración Personas + Documentación + IA. |
| `docs/ai/AI_CHAT_BOOTSTRAP.md` | **Implementa:** incorporación rápida de una nueva IA/chat. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Complementa:** ciclo de construcción, aprobación e integración. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Complementa:** actores y experiencia del producto. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Separa:** Roles de Usuario, Relaciones, Persona Activa y permisos del producto; no son roles del proyecto. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.1 | 04/09/2026 | Product Owner + AI Collaborator | P2. Resuelve la contradicción `1.0-rc1`/aprobado, activa formalmente el documento, corrige referencias, separa roles del proyecto de Roles de Usuario, mantiene la asignación vigente y consolida como vigentes las decisiones organizativas ya aprobadas. |
| 1.0 | 04/08/2026 | Product Owner + IA | Definió roles, autoridad, matriz de colaboración, asignación vigente y principios de evolución. |

---

## 🎯 1. Propósito

Definir la estructura organizativa ligera de la Academia mediante:

- roles estables;
- responsabilidades claras;
- autoridad;
- colaboración;
- asignación vigente.

Responde:

1. ¿Qué roles existen en el **proyecto**?
2. ¿Qué responsabilidad tiene cada uno?
3. ¿Cómo colaboran?
4. ¿Quién desempeña actualmente cada rol?

Los roles del proyecto **no son** `ROLE / USER_ROLE` del producto ni determinan permisos de la aplicación.

---

## 📐 2. Alcance

Aplica a:

- gobierno;
- producto;
- arquitectura;
- colaboración con IA;
- desarrollo;
- validación familiar;
- conocimiento especializado;
- auditoría;
- continuidad.

No sustituye workflows, estándares funcionales, Roles de Usuario ni especificaciones.

El modelo debe seguir siendo proporcional al tamaño real del equipo.

---

## 🧭 3. Principios organizativos

### 3.1 Rol ≠ Persona

Un rol define responsabilidad y autoridad estables. La asignación puede cambiar.

### 3.2 Una Persona puede cubrir varios roles

Es válido en el equipo actual siempre que la autoridad siga siendo clara.

### 3.3 Los documentos estructurales referencian roles

Preferir:

```text
Product Owner
Product Architect
AI Collaborator
Family Reviewer
```

Los nombres propios se mantienen únicamente donde la asignación vigente necesita trazabilidad.

### 3.4 Autoridad final humana

La IA puede analizar, proponer, construir, revisar y auditar. La dirección, priorización y aceptación final permanecen bajo autoridad humana.

### 3.5 Organización proporcional

No crear comités, aprobaciones o roles preventivos sin necesidad real.

---

## 🏛️ 4. Áreas actuales

### Gobierno

- Sponsor
- Product Owner

### Construcción

- Product Architect
- AI Collaborator
- Developer

### Validación y aprendizaje

- Primary Learner
- Family Reviewer
- Domain Expert
- Auditor

Las áreas colaboran; no son silos.

---

## 🎭 5. Roles oficiales

### 5.1 Sponsor

**Misión:** sostener la continuidad y viabilidad del proyecto.

Responsabilidades:

- apoyar continuidad;
- facilitar recursos;
- respaldar decisiones estratégicas de alto nivel.

No sustituye al Product Owner en la priorización cotidiana.

### 5.2 Product Owner

**Misión:** mantener visión, prioridad, alcance y aceptación del producto.

Responsabilidades:

- priorizar necesidades;
- decidir alcance;
- aprobar o rechazar propuestas;
- aceptar entregables;
- resolver conflictos;
- decidir cuándo existe suficiente valor/calidad para avanzar.

**Autoridad:** decisión final sobre producto y aceptación, respetando obligaciones legales, de seguridad o profesionales aplicables.

### 5.3 Product Architect

**Misión:** preservar coherencia funcional, técnica, documental y evolutiva.

Responsabilidades:

- identificar dominios y propietarios;
- analizar dependencias;
- favorecer reutilización;
- evitar duplicidad;
- revisar impacto;
- proteger mantenibilidad.

Puede recomendar límites o rechazar técnicamente una solución incoherente; la decisión de producto final corresponde al Product Owner.

### 5.4 AI Collaborator

**Misión:** ampliar la capacidad del equipo durante análisis, diseño, documentación, implementación, revisión y continuidad.

Puede:

- analizar;
- cuestionar;
- proponer;
- diseñar;
- construir;
- revisar;
- auditar;
- recomendar.

Debe:

- trabajar desde fuentes reales;
- distinguir hecho/inferencia/propuesta/decisión;
- reutilizar antes de crear;
- verificar antes de afirmar;
- construir cuando el alcance ya está claro;
- respetar la autoridad del Product Owner.

El rol es **independiente del proveedor, modelo o herramienta** que lo desempeñe.

### 5.5 Developer

**Misión:** materializar decisiones en soluciones ejecutables y mantenibles.

Responsabilidades:

- implementar;
- corregir;
- integrar;
- validar técnicamente;
- respetar estándares y especificaciones;
- actualizar documentación cuando corresponda.

Actualmente puede ser cubierto por AI Collaborator; el rol se mantiene separado conceptualmente para permitir evolución del equipo.

### 5.6 Family Reviewer

**Misión:** aportar la perspectiva de la vida familiar y revisar utilidad, comprensión y sostenibilidad de la experiencia.

Puede observar, señalar problemas, aportar contexto y recomendar cambios. La priorización corresponde al Product Owner.

### 5.7 Primary Learner

**Misión:** utilizar la Academia y aportar evidencia mediante su experiencia real.

No tiene responsabilidades de gestión o desarrollo.

Puede expresar preferencias, incomprensión, rechazo, interés y otras observaciones relevantes. Su experiencia informa el producto sin convertirla en responsabilidad de decisión.

### 5.8 Domain Expert

**Misión:** aportar conocimiento especializado cuando una decisión lo requiere.

Puede intervenir en educación, accesibilidad, privacidad, seguridad, diseño u otros dominios.

Sus recomendaciones deben distinguirse de las preferencias de producto y respetarse especialmente cuando exista obligación profesional, legal o de seguridad.

### 5.9 Auditor

**Misión:** verificar calidad, coherencia, trazabilidad y conformidad.

Puede:

- comparar contra estándares;
- detectar inconsistencias;
- clasificar hallazgos;
- solicitar evidencia;
- recomendar aprobación o ajustes.

No sustituye al Product Owner, salvo que exista un impedimento objetivo que no permita continuar.

---

## 🤝 6. Matriz de colaboración

| Rol | Colabora principalmente con | Propósito |
|---|---|---|
| Sponsor | Product Owner | Continuidad y recursos |
| Product Owner | Todos | Priorizar, decidir y aceptar |
| Product Architect | Product Owner, AI Collaborator, Developer, Auditor | Coherencia |
| AI Collaborator | Product Owner, Product Architect, Developer, Domain Expert, Auditor | Analizar, construir, revisar y continuar |
| Developer | Product Owner, Product Architect, AI Collaborator | Implementar |
| Family Reviewer | Product Owner, Primary Learner | Contexto y validación familiar |
| Primary Learner | Family Reviewer, Product Owner | Evidencia de uso |
| Domain Expert | Product Owner, Product Architect, AI Collaborator | Conocimiento especializado |
| Auditor | Todos | Calidad y conformidad |

Interacciones especialmente frecuentes actualmente:

```text
Product Owner ↔ AI Collaborator
Product Owner ↔ Product Architect
Family Reviewer ↔ Primary Learner
Product Owner ↔ Family Reviewer
Product Owner ↔ Primary Learner
```

---

## 👤 7. Asignación actual

| Rol | Estado | Asignación vigente |
|---|---|---|
| Sponsor | Activo | Juan Perdomo |
| Product Owner | Activo | Juan Perdomo |
| Product Architect | Activo | Juan Perdomo |
| AI Collaborator | Activo | ChatGPT |
| Developer | Cubierto por AI Collaborator | Sin desarrollador humano asignado |
| Family Reviewer | Activo | Anais Pelayo |
| Primary Learner | Activo | Gloria |
| Domain Expert | Según necesidad | Especialistas que colaboren cuando corresponda |
| Auditor | Según alcance | Product Owner + AI Collaborator u otra revisión adecuada |

Los nombres propios se mantienen aquí porque esta sección **sí es propietaria de la asignación vigente**.

---

## ⚖️ 8. Autoridad y decisión

### Dirección y prioridad

Product Owner, con respaldo del Sponsor.

### Arquitectura

Product Architect + AI Collaborator/Developer analizan. Product Owner aprueba cuando la decisión altera producto o contrato.

### Implementación

Developer/AI Collaborator pueden resolver detalles que no cambien contratos, prioridades ni experiencia aprobada.

### Validación familiar

Family Reviewer y Primary Learner aportan evidencia directa; no son una aprobación técnica automática.

### Conocimiento especializado

Domain Expert aporta criterio dentro de su área.

### Auditoría

Auditor evalúa; Product Owner decide salvo impedimento obligatorio.

---

## 🌱 9. Evolución

Crear o separar roles solo cuando exista una responsabilidad estable que lo justifique.

Con crecimiento del producto pueden separarse responsabilidades hoy acumuladas, por ejemplo:

- Product Owner / Product Architect;
- AI Collaborator / Developer;
- constructor / Auditor.

También deberán revisarse segregación, seguridad, soporte y operación cuando aumenten usuarios, colaboradores o criticidad.

---

## 🛠️ 10. Mantenimiento

Revisar cuando:

- cambie una asignación;
- aparezca una responsabilidad estable;
- cambie la autoridad;
- se incorpore un colaborador;
- cambie el modelo de gobierno;
- el equipo crezca materialmente.

Un cambio nominal de asignación puede ser menor. Un cambio de autoridad o misión requiere revisión profunda.

---

## ✅ 11. Decisiones vigentes

| ID | Decisión | Estado |
|---|---|---|
| PR-001 | Separar definición del rol y Persona asignada. | Vigente |
| PR-002 | Permitir que una Persona cubra varios roles en la etapa actual. | Vigente |
| PR-003 | Mantener Sponsor como rol de continuidad. | Vigente |
| PR-004 | AI Collaborator es un rol transversal funcional/técnico. | Vigente |
| PR-005 | Developer permanece como rol aunque hoy pueda ser cubierto por IA. | Vigente |
| PR-006 | Family Reviewer aporta la perspectiva familiar. | Vigente |
| PR-007 | Primary Learner aporta evidencia de uso sin responsabilidad de gestión. | Vigente |
| PR-008 | Domain Expert participa según necesidad. | Vigente |
| PR-009 | Auditor es una responsabilidad transversal de verificación. | Vigente |
| PR-010 | Los nombres propios viven únicamente en la asignación vigente cuando corresponde. | Vigente |

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | 🟢 Activo |
| **Versión activa** | 1.1 |
| **Autoridad final de producto** | Product Owner |
| **Principio organizativo** | Roles estables, asignaciones evolutivas y complejidad proporcional |
