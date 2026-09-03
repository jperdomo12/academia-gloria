# 🛠️ Guía de Desarrollo Ultra Pro
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/standards/STD-GUIA_DESARROLLO_ULTRA_PRO.md` |
| **Versión** | 2.2 Cloud |
| **Estado** | Activo |
| **Última actualización** | 03/09/2026 |
| **Propietario** | Calidad de Desarrollo y Experiencia |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Reglas transversales de desarrollo, reutilización, UX, accesibilidad, navegación, datos y calidad antes de publicar |

## 🔗 Documentos relacionados

| Documento | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Gobierna:** propósito humano del producto. |
| `docs/DOCUMENTATION_STANDARD.md` | **Gobierna:** calidad y mantenimiento documental. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Complementa:** flujo de construcción y cierre de producto. |
| `docs/project/PROJECT_MAP.md` | **Orienta:** propietarios y estructura real del repositorio. |
| `docs/product/PRODUCT_IDENTIDAD_VISUAL_Y_PERSONAJES.md` | **Gobierna visualmente:** identidad y personajes. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** Persona Activa, roles y accesos. |
| `docs/standards/STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md` | **Gobierna:** reglas adicionales para Temas Académicos. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 2.2 Cloud | 03/09/2026 | Product Owner + AI Collaborator | Sincroniza la guía con el núcleo real: Persona Activa, navegación/retorno, favicon oficial, reutilización antes de crear, Vista previa sin escritura, histórico de solo lectura, evidencia de nuevos Temas académicos y Quality Gate. Formaliza como referencia general de la Academia la rejilla de tarjetas `3 escritorio → 2 tablet/móvil → 1 solo móvil muy estrecho`, validada inicialmente en los portales de 6.º. |
| 2.1 Cloud | 29/08/2026 | Product Owner + AI Collaborator | Formaliza como regla transversal que los fallos visibles expliquen la causa cuando sea conocida y segura de mostrar, e incorpora la comprobación correspondiente antes de publicar. |
| 2.0 Cloud | — | Equipo del proyecto | Base activa previa de la guía; la fuente original no declaraba fecha concreta. |

---

## 🎯 1. Objetivo

Definir el estándar transversal de calidad para cualquier funcionalidad nueva o modificación relevante de la Academia.

No construimos páginas aisladas.

Construimos experiencias que deben:

- ayudar realmente al alumno o a la familia;
- encajar en una arquitectura compartida;
- ser comprensibles;
- ser mantenibles;
- funcionar en móvil/tablet/escritorio;
- conservar identidad, navegación y permisos;
- y poder evolucionar sin duplicar sistemas.

---

## 💛 2. Preguntas antes de construir

Antes de escribir código:

- ¿Qué problema real resolvemos?
- ¿Quién lo utilizará?
- ¿Qué documento es propietario de este comportamiento?
- ¿Ya existe un componente, servicio, patrón o contrato reutilizable?
- ¿Ayuda realmente a Gloria o a quien la acompaña?
- ¿Reduce carga cognitiva?
- ¿Favorece autonomía?
- ¿Es claro y motivador sin infantilizar?
- ¿Qué datos necesita realmente?
- ¿Qué ocurre en Persona Activa?
- ¿Cómo se vuelve al origen?
- ¿Qué debe ocurrir en Vista previa/histórico?

Si una decisión ya está resuelta por documentación o arquitectura vigente, **no se vuelve a delegar al usuario como pregunta técnica**.

---

## 🔄 3. Flujo de desarrollo

```text
Necesidad clara
→ identificar propietario documental
→ revisar producto/código real
→ reutilizar antes de crear
→ diseñar experiencia
→ implementar cambio mínimo suficiente
→ validar técnicamente
→ auditar diff
→ YA PUEDES PROBAR
→ validación del usuario
→ ajuste opcional
→ aprobación
→ auditoría final
→ documentación aplicable
→ PR
→ revisión remota
→ merge
```

Reglas:

1. No pedir interacciones administrativas innecesarias cuando el alcance está claro.
2. No entregar al usuario defectos básicos detectables internamente.
3. Después de una aprobación funcional, no solicitar confirmaciones redundantes si el alcance no cambia.
4. No mezclar en el mismo diff trabajo ajeno al producto autorizado.

---

## ☁️ 4. Arquitectura Cloud y reutilización

Patrón general:

```text
Interfaz
   ↓
Componentes / servicios reutilizables
   ↓
API Academia / API de dominio
   ↓
Firebase Authentication
   ↓
Cloud Firestore
```

### Obligatorio

- JavaScript modular cuando corresponda;
- reutilizar APIs/servicios compartidos existentes;
- resolver identidad mediante el modelo global;
- mantener compatibilidad con GitHub Pages;
- reutilizar CSS/componentes antes de crear variantes locales;
- conservar contratos de datos compartidos;
- usar la fuente canónica de Firestore Rules.

### Evitar

- UID o credenciales codificados;
- acceso directo nuevo a Firestore desde HTML si existe servicio propietario;
- segunda API para una capacidad ya cubierta;
- colección paralela por comodidad;
- `localStorage` como almacenamiento principal de datos educativos;
- duplicar panel de usuario, navegación o modelos de acceso;
- crear un framework antes de que casos reales lo necesiten.

---

## 👤 5. Persona Activa, permisos y seguridad

Toda funcionalidad educativa o familiar que opere sobre una persona debe revisar el comportamiento con **Persona Activa**.

No asumir:

```text
auth.currentUser.uid == alumno analizado
```

cuando existe contexto relacionado.

Reglas:

- usar `ContextoUsuario` y APIs propietarias;
- respetar el nivel efectivo `consulta / gestion / administracion`;
- ocultar controles no sustituye Firestore Rules;
- la UI no es frontera de seguridad;
- un usuario con `consulta` no obtiene capacidad de gestión por conocer una URL.

---

## 🧭 6. Navegación y retorno

Una nueva experiencia debe:

- utilizar la navegación global vigente;
- preservar Persona Activa en navegación interna;
- respetar el origen contextual cuando existe;
- evitar destinos genéricos que rompan el recorrido;
- funcionar tanto en Live Server/local como en GitHub Pages.

Cuando exista parámetro o contrato de retorno (`volver` o equivalente), debe conservarse.

El comportamiento específico se gobierna en los modelos/servicios de navegación; no se creará un sistema de retorno privado por módulo salvo necesidad excepcional.

---

## 🎨 7. UX y calidad visual

Buscar una experiencia:

- clara;
- limpia;
- respirable;
- visual;
- ordenada;
- luminosa cuando corresponda;
- motivadora;
- apropiada para la edad;
- consistente con la Academia.

### 7.1 Una acción principal clara

En cada estado debe ser evidente qué puede hacer el usuario a continuación.

### 7.2 Jerarquía visible

La estructura debe poder entenderse visualmente sin depender de leer párrafos largos.

Especialmente en portales académicos:

```text
Curso
→ Asignatura
→ Tema
```

debe percibirse por jerarquía, agrupación, posición y navegación.

### 7.3 Estándar de rejilla de tarjetas de la Academia

Para **rejillas de tarjetas de navegación, asignaturas, Temas o catálogos comparables**, utilizar como patrón de referencia:

```text
🖥️ Escritorio             → 3 columnas
📱 Tablet                  → 2 columnas
📱 Móvil normal/ancho      → 2 columnas
📱 Móvil muy estrecho      → 1 columna
```

Este patrón fue validado inicialmente en los portales de 6.º y se adopta como referencia general para evitar verticalidad excesiva y mantener escaneabilidad.

Reglas:

- no forzar una columna en móvil normal si las tarjetas siguen siendo legibles;
- las tarjetas móviles de dos columnas deben ser compactas y conservar objetivos táctiles razonables;
- utilizar una columna únicamente cuando el ancho ya no permita una experiencia clara;
- una excepción es válida cuando la semántica o densidad del contenido requiere otro patrón, pero debe ser deliberada y no accidental;
- no utilizar esta regla para formularios, textos largos o componentes que no sean comparables a tarjetas de catálogo/navegación.

---

## 🧠 8. TEL, lenguaje y carga cognitiva

Siempre que aplique:

- frases breves;
- una idea principal por bloque;
- instrucciones directas;
- vocabulario académico explicado;
- iconos con función real;
- esquemas/apoyos visuales;
- suficiente espacio;
- repetición accesible;
- retroalimentación positiva y específica.

Evitar:

- párrafos densos en interfaz del alumno;
- varias instrucciones simultáneas;
- presión por rapidez sin objetivo académico;
- mensajes negativos o que conviertan el error en fracaso;
- infantilización.

Adaptar no significa bajar automáticamente el nivel académico.

---

## 📊 9. Datos, evidencia y modos de consulta

### 9.1 Datos con propósito

No guardar una métrica solo porque pueda medirse.

Debe existir una utilidad para:

- aprendizaje;
- revisión familiar;
- análisis;
- progreso;
- fortalecimiento;
- auditoría;
- o mejora del producto.

### 9.2 Nuevos Temas de 6.º

Todo nuevo Tema de 6.º debe producir evidencia académica estructurada durante una ejecución normal, conforme a `STD-CONTENIDOS_ACADEMICOS_Y_MATERIAL_ESCOLAR.md`.

La evidencia debe poder reutilizarse por:

- Trabajo realizado;
- Análisis Educativo;
- estadísticas/evolución;
- propuestas de fortalecimiento.

No crear un esquema privado por Tema si el contrato compartido puede representarlo.

### 9.3 Vista previa

> **Vista previa no escribe evidencia, sesión, progreso ni estado.**

### 9.4 Histórico / consulta

> **Abrir trabajo histórico es solo lectura.**

No debe reejecutar la actividad ni alterar estadísticas.

---

## ⚠️ 10. Errores y fallos visibles

Todo fallo visible debe indicar **la causa cuando sea conocida y segura de mostrar**.

Evitar como mensaje final:

```text
Ha ocurrido un error.
```

si existe una explicación útil.

Un mensaje adecuado debe indicar:

1. qué no pudo realizarse;
2. por qué, si se conoce;
3. qué puede hacer el usuario a continuación, si existe una acción razonable.

No mostrar:

- stack traces;
- tokens;
- rutas internas sensibles;
- códigos técnicos sin traducción útil.

Ejemplo:

```text
No pudimos guardar la sesión porque se perdió la conexión.
Revisa tu conexión e inténtalo de nuevo.
```

La información técnica adicional puede quedar en consola/diagnóstico sin sustituir el mensaje humano.

---

## 🧩 11. Calidad del código

El código debe ser:

- modular;
- legible;
- cohesionado;
- reutilizable;
- proporcional;
- sin duplicación evitable;
- comentado cuando el comentario explique una decisión no evidente.

Preferir:

```text
servicio compartido existente
+ extensión mínima
```

antes que:

```text
nuevo subsistema local
```

---

## 🧪 12. Validación proporcional

Antes de pedir prueba al usuario:

- sintaxis/parseo según tecnología;
- rutas y recursos;
- estados vacíos/error;
- móvil y escritorio;
- Persona Activa cuando aplica;
- permisos;
- navegación/Volver;
- Vista previa/histórico cuando aplican;
- no regresión del comportamiento compartido tocado;
- diff limitado al alcance.

El usuario realiza la validación funcional final, pero no sustituye la auditoría interna.

---

## ✅ 13. Quality Gate antes de publicar/cerrar

- [ ] Resuelve una necesidad real.
- [ ] Se revisó documentación propietaria vigente.
- [ ] Se revisó el producto/código real suficiente.
- [ ] Reutiliza antes de crear.
- [ ] Respeta arquitectura Cloud y servicios compartidos.
- [ ] Respeta Persona Activa y permisos.
- [ ] Navegación y `Volver` son correctos.
- [ ] Usa `assets/iconos/icono-principal.png` como favicon en nueva página funcional.
- [ ] Es usable en móvil, tablet y escritorio.
- [ ] Si usa rejilla comparable de tarjetas, sigue `3 → 2 → 2 → 1` salvo excepción justificada.
- [ ] Lenguaje y carga cognitiva son apropiados.
- [ ] Fallos visibles explican causa cuando es conocida y segura.
- [ ] Vista previa no escribe cuando aplica.
- [ ] Histórico es solo lectura cuando aplica.
- [ ] Nuevos Temas de 6.º generan evidencia analizable.
- [ ] No se inventan métricas ni datos.
- [ ] Se validó técnicamente antes de `YA PUEDES PROBAR`.
- [ ] El diff no mezcla trabajo ajeno.
- [ ] Documentación afectada fue actualizada solo cuando corresponde.
- [ ] Tras aprobación, PR/merge siguen el workflow vigente.

---

## 📌 14. Decisiones adoptadas

| ID | Decisión | Estado |
|---|---|---|
| DEV-001 | Reutilizar componentes, servicios y contratos existentes antes de crear otros. | Aprobada |
| DEV-002 | Persona Activa y permisos forman parte del Quality Gate de funcionalidades relacionadas. | Aprobada |
| DEV-003 | Los fallos visibles explican la causa cuando sea conocida y segura. | Aprobada |
| DEV-004 | Vista previa no escribe evidencia/progreso y el histórico es solo lectura. | Aprobada |
| DEV-005 | Nuevos Temas de 6.º producen evidencia reutilizable. | Aprobada |
| DEV-006 | La rejilla de tarjetas `3 escritorio → 2 tablet/móvil → 1 solo muy estrecho` es patrón general de referencia de la Academia para catálogos/navegación comparables. | Aprobada |
| DEV-007 | El usuario valida funcionalmente el producto después de una auditoría interna suficiente. | Aprobada |
| DEV-008 | Una aprobación funcional permite continuar cierre/PR/merge sin confirmaciones redundantes mientras el alcance permanezca estable. | Aprobada |

---

## ✅ DECISIÓN

| Campo | Valor |
|---|---|
| **Regla de oro** | No construimos páginas aisladas; construimos experiencias reutilizables y coherentes con la Academia. |
| **Arquitectura** | Compartida, Cloud y multi-persona. |
| **Visual** | Claridad y jerarquía; tarjetas `3 → 2 → 2 → 1` como patrón de referencia. |
| **Datos** | Solo con propósito; evidencia reusable cuando aplica. |
| **Modos** | Vista previa sin escritura; histórico de solo lectura. |
| **Calidad** | Auditoría interna antes de prueba del usuario y cierre controlado tras aprobación. |
| **Estado** | Activo · v2.2 Cloud · 03/09/2026. |

🌈