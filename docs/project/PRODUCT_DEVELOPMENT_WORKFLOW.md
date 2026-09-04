# 🔄 Product Development Workflow
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` |
| **Versión** | 1.2 |
| **Estado** | Activo |
| **Fecha de origen** | 04/08/2026 |
| **Última actualización** | 04/09/2026 |
| **Propietario** | Gobierno del Desarrollo del Producto |
| **Responsables** | Product Owner + Desarrollo + AI Collaborator |
| **Ámbito** | Ciclo operativo desde una necesidad hasta su integración, validación y cierre en el producto |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Fundamenta:** propósito humano y principios que no deben perderse. |
| `docs/project/ADN_ACADEMIA_GLORIA_VALENTINA.md` | **Fundamenta/complementa:** principios estables de producto. |
| `docs/ai/AI_COLLABORATION_GUIDE.md` | **Gobierna:** colaboración entre Personas, Documentación e IA. |
| `docs/ai/AI_CHAT_BOOTSTRAP.md` | **Complementa:** incorporación rápida de un nuevo chat/IA. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** documentación, estados, trazabilidad y Quality Gate. |
| `docs/DOCUMENTATION_ARCHITECTURE.md` | **Gobierna:** propietarios y ubicación del conocimiento. |
| `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md` | **Gobierna técnicamente:** calidad transversal, reutilización, UX, datos y publicación. |
| `docs/project/PROJECT_ROLES.md` | **Gobierna:** autoridad y responsabilidades del proyecto. |
| `docs/project/RELEASE_NOTES.md` | **Registra:** cambios publicados relevantes. |
| `docs/project/ACADEMIA_GLORIA_HANDOFF_PLANTILLA.md` | **Continúa:** estado operativo entre chats. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.2 | 04/09/2026 | Product Owner + AI Collaborator | P2. Alinea el workflow con la práctica y el estándar vigentes: `main` canónico, rama + PR como flujo normal, Codex opcional, validación proporcional, aprobación única sin confirmaciones redundantes, verificación posterior al merge y separación explícita entre cambio de Firestore Rules en Git y despliegue real. Retira rutas locales nominales, cuota 20–30 % de Codex y bootstrap inexistente. |
| 1.1 | 24/08/2026 | Product Owner + Desarrollo + IA colaboradora | Incorporó Codex opcional y control proporcional mediante flujo corto/controlado. |
| 1.0 | 04/08/2026 | Product Owner + AI Collaborator | Primera versión oficial del flujo de desarrollo. |

---

## 🎯 1. Propósito

Definir cómo una necesidad, corrección o mejora se convierte en un cambio:

- comprendido;
- construido;
- revisado;
- validado;
- aprobado;
- integrado en `main`;
- y verificable en el entorno que corresponda.

Este documento no enseña Git, GitHub, VS Code, Codex o Firebase. Define **cómo debe evolucionar un cambio dentro del producto**.

---

## 📐 2. Alcance

Aplica a:

- HTML, CSS y JavaScript;
- imágenes y assets;
- configuración;
- Firestore Rules;
- documentación;
- contenido;
- modelos/especificaciones;
- y otros recursos del repositorio.

El nivel de validación se adapta al riesgo real.

---

## 🌿 3. Estado operativo del producto

La Academia se encuentra en construcción activa y uso familiar/controlado.

Por ello se prioriza:

> **velocidad de aprendizaje + calidad proporcional + reversibilidad + trazabilidad suficiente**

No se introduce proceso propio de operación masiva mientras no exista esa necesidad.

La evidencia de uso real es valiosa, pero no sustituye pruebas futuras de diversidad, escalabilidad, rendimiento o seguridad cuando el producto crezca.

---

## ✅ 4. Principios del workflow

### 4.1 Comprender antes de modificar

Antes de cambiar:

- localizar el producto real;
- identificar el documento propietario;
- comprender dependencias;
- comprobar qué ya existe;
- definir el resultado esperado.

### 4.2 Reutilizar antes de crear

No crear un segundo servicio, modelo, componente, regla o documento cuando el actual puede evolucionar.

### 4.3 Cambio mínimo suficiente

Preferir cambios acotados y verificables antes que rediseños preventivos.

### 4.4 `main` es la base canónica integrada

`main` representa el producto integrado aprobado.

El trabajo normal se prepara en una rama de alcance claro y llega a `main` mediante Pull Request.

### 4.5 PR no significa aprobación

> **Crear una PR no autoriza el merge.**

La PR es la superficie de revisión del cambio.

### 4.6 Validación proporcional

Un cambio documental no necesita las mismas pruebas que una modificación de autenticación, datos o UI.

### 4.7 Una aprobación, no confirmaciones redundantes

Una vez que el Product Owner aprueba el resultado y el alcance no cambia, se realiza la revisión final y el merge sin volver a pedir la misma decisión.

### 4.8 Codex es opcional

Codex puede ayudar a analizar o implementar cuando aporta valor técnico, pero **no es requisito del workflow**.

La elección depende de complejidad, riesgo y utilidad, no de una cuota porcentual.

---

## 🧭 5. Flujo normal

```text
NECESIDAD / OBSERVACIÓN
        ↓
COMPRENSIÓN DEL ESTADO ACTUAL
        ↓
DOCUMENTO PROPIETARIO + CÓDIGO REAL
        ↓
ALCANCE / CRITERIOS DE ACEPTACIÓN
        ↓
RAMA DE TRABAJO DESDE main
        ↓
IMPLEMENTACIÓN / ACTUALIZACIÓN
        ↓
REVISIÓN INTERNA
        ↓
VALIDACIÓN TÉCNICA PROPORCIONAL
        ↓
PULL REQUEST
        ↓
REVISIÓN DE DIFF / DEPENDENCIAS
        ↓
VALIDACIÓN DEL PRODUCT OWNER CUANDO APLICA
        ↓
APROBACIÓN
        ↓
REVISIÓN FINAL
        ↓
MERGE A main
        ↓
VERIFICACIÓN DE main / DESPLIEGUE APLICABLE
        ↓
CIERRE / DOCUMENTACIÓN / HANDOFF
```

El orden de **PR** y **prueba local** puede ajustarse cuando la prueba necesita una rama o cuando resulta más eficiente validar antes de abrir la PR. Lo obligatorio es que el resultado aprobado y el diff final coincidan antes del merge.

---

## 🧩 6. Fase 1 · Necesidad y comprensión

Un cambio puede originarse por:

- bug;
- observación de uso;
- mejora;
- nueva necesidad;
- deuda técnica;
- decisión de producto;
- revisión documental;
- incidencia operativa.

Primero se describe el **problema**, no solo una solución imaginada.

Antes de construir se conoce, en la medida necesaria:

- objetivo;
- actor principal;
- comportamiento actual;
- resultado esperado;
- documentos propietarios;
- archivos/dependencias;
- riesgo;
- forma de validación.

Cuando el alcance está claro, se construye. No se prolonga el análisis sin información nueva.

---

## 🌿 7. Fase 2 · Rama de trabajo

Regla normal:

```text
main limpio / vigente
        ↓
feature/...  fix/...  docs/...  style/...
```

La rama debe tener un objetivo identificable.

Evitar mezclar:

- cambios no relacionados;
- experimentos ajenos al alcance;
- refactors oportunistas;
- archivos temporales.

Una escritura directa a `main` debe ser excepcional y explícitamente justificada; no es el camino normal del proyecto.

---

## 🛠️ 8. Fase 3 · Construcción

La implementación debe:

- modificar únicamente lo necesario;
- reutilizar componentes/servicios vigentes;
- respetar Persona Activa y permisos cuando aplica;
- conservar navegación compartida;
- evitar inventar datos o sesiones;
- mantener compatibilidad requerida;
- actualizar la documentación propietaria cuando el conocimiento estable cambie.

### IA / Codex / herramientas

Una herramienta puede:

- inspeccionar;
- proponer;
- construir;
- revisar;
- probar;
- preparar una PR.

No sustituye la decisión de producto ni la aprobación humana.

---

## 🧪 9. Fase 4 · Validación interna

Antes de trasladar la detección de defectos obvios al usuario, revisar internamente lo que sea razonablemente verificable.

Según el cambio:

### Código / UI

- carga de HTML/CSS/JS;
- consola;
- rutas y assets;
- flujo principal;
- estados de error;
- responsive/táctil cuando aplica;
- Persona Activa/permisos;
- Live Server y GitHub Pages cuando corresponda.

### Datos / Firestore

- colección/documento correcto;
- propietario correcto;
- compatibilidad;
- operaciones permitidas;
- errores;
- no fabricación de auditoría o evidencia.

### Documentación

- propietario correcto;
- estado/versión;
- referencias;
- presente vs futuro;
- coherencia con producto real;
- diff sin cambios ajenos.

---

## 🔀 10. Fase 5 · Pull Request

La PR debe permitir responder con rapidez:

- ¿qué problema resuelve?;
- ¿qué archivos cambia?;
- ¿qué no cambia?;
- ¿qué se validó?;
- ¿qué riesgo queda?;
- ¿qué necesita probar el Product Owner?

El diff debe coincidir con el alcance.

Si una rama quedó desfasada respecto a `main`, se actualiza de forma segura antes de fusionar.

---

## 👤 11. Fase 6 · Validación y aprobación

El Product Owner valida principalmente aquello que requiere criterio humano/producto:

- experiencia;
- utilidad;
- comprensión;
- comportamiento esperado;
- presentación;
- decisión documental relevante.

El usuario **no debe ser utilizado para descubrir defectos básicos que podían verificarse internamente**.

Cuando la aprobación ya fue otorgada y el diff final no cambia sustancialmente, no se solicita una confirmación redundante.

---

## ✅ 12. Fase 7 · Revisión final y merge

Antes del merge:

- comprobar PR abierta y rama correcta;
- revisar archivos modificados;
- confirmar ausencia de cambios ajenos;
- comprobar que la aprobación corresponde al diff vigente;
- revisar cualquier CI/check disponible;
- confirmar mergeability.

Después:

```text
merge → main
```

El método de merge puede variar; el criterio es conservar historial comprensible y no introducir cambios no aprobados.

---

## 🚀 13. Verificación posterior

El merge no siempre equivale a disponibilidad real.

### GitHub Pages

Cuando la UI publicada depende de Pages:

- verificar que el workflow correspondiente terminó correctamente;
- comprobar que el despliegue corresponde al SHA esperado;
- usar la página pública solo después de considerar caché/propagación.

### Firebase / Firestore Rules

> **Modificar `compartido/firebase/FireStore Rules.txt` en Git no despliega automáticamente las reglas a Firebase.**

Cuando un cambio requiere reglas reales, debe distinguirse:

```text
regla documentada/versionada en Git
≠
regla desplegada en Firebase
```

No declarar desplegado lo que solo fue fusionado al repositorio.

---

## 🧹 14. Cierre

Al cerrar:

- `main` contiene el cambio aprobado;
- se verificó lo aplicable;
- no quedan temporales innecesarios;
- la documentación relevante está sincronizada;
- el HandOff se actualiza si el cambio altera continuidad;
- la rama puede eliminarse cuando ya no sea necesaria.

Git es el historial técnico. No mantener copias `OLD-*` dentro del repositorio como sistema normal de respaldo.

---

## 📋 15. Definición de Terminado

Según el tipo de cambio:

- [ ] el alcance aprobado fue construido;
- [ ] el diff es proporcional y limpio;
- [ ] se reutilizó antes de crear cuando correspondía;
- [ ] la validación interna relevante fue realizada;
- [ ] la PR representa el cambio final;
- [ ] el Product Owner aprobó cuando era necesario;
- [ ] el resultado fue fusionado en `main`;
- [ ] se verificó Pages/Firebase/otro entorno cuando aplicaba;
- [ ] la documentación propietaria quedó actualizada;
- [ ] no quedan temporales ni duplicados introducidos por el trabajo;
- [ ] el siguiente paso está claro.

Un cambio puede estar **técnicamente integrado** y todavía **pendiente de uso real**. Debe indicarse así y no confundir ambos estados.

---

## ⚠️ 16. Antipatrones

Evitar:

- empezar a desarrollar sin revisar el estado actual;
- escribir directo en `main` como práctica normal;
- crear PR y asumir que equivale a aprobación;
- fusionar un diff distinto del aprobado;
- pedir confirmaciones repetidas de la misma decisión;
- crear arquitectura preventiva;
- usar Codex por obligación cuando no aporta valor;
- omitir Codex u otra herramienta cuando sí reduce un riesgo relevante;
- guardar respaldos `OLD-*` en el repositorio;
- usar al Product Owner como sustituto de QA básico;
- modificar documentos por cada ajuste menor;
- declarar desplegadas Firestore Rules solo porque cambiaron en Git;
- afirmar que Pages ya refleja el cambio sin verificar el despliegue correspondiente.

---

## 🔭 17. Evolución del workflow

Revisar este proceso cuando cambie materialmente el contexto, por ejemplo:

- varios desarrolladores trabajando en paralelo;
- más alumnos/usuarios;
- CI obligatorio;
- entornos separados;
- despliegue automatizado adicional;
- rollback formal;
- datos compartidos o mayor criticidad;
- pruebas manuales insuficientes.

La evolución debe responder a una necesidad real, no anticipar burocracia.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | ✅ Activo |
| **Versión activa** | 1.2 |
| **Flujo normal** | Rama → cambio → validación → PR → aprobación → revisión final → merge → verificación |
| **Codex** | Opcional según valor/riesgo |
| **Base canónica** | `main` |
