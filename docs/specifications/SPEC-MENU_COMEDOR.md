# 🍽️ Especificación de Menú del Cole
## 🌈 Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta oficial** | `docs/specifications/SPEC-MENU_COMEDOR.md` |
| **Versión** | 1.0 |
| **Estado** | Activo |
| **Fecha** | 09/09/2026 |
| **Última actualización** | 09/09/2026 |
| **Propietario** | Utilidades escolares cotidianas |
| **Responsables** | Product Owner + AI Collaborator |
| **Ámbito** | Consulta del menú mensual del comedor escolar, su presentación en Academia y el flujo mensual de incorporación de la fuente oficial |

## 🔗 Documentos relacionados

| Documento / fuente | Relación |
|---|---|
| `docs/FOUNDATION.md` | **Fundamenta:** utilidad cotidiana, autonomía y motivación sin convertir la experiencia en recompensa artificial. |
| `docs/product/PRODUCT_EXPERIENCE_ARCHITECTURE.md` | **Gobierna conceptualmente:** integración de utilidades reales dentro de la experiencia de Academia. |
| `docs/standards/STD-USUARIOS_ROLES_Y_ACCESOS.md` | **Gobierna:** perfil, Persona Activa y criterios de rol/colegio utilizados por la presentación selectiva. |
| `docs/project/PRODUCT_DEVELOPMENT_WORKFLOW.md` | **Gobierna:** validación, PR, aprobación y cierre de cambios. |
| `menu-comedor/` | **Implementa:** página, datos mensuales y presentación del Menú del Cole. |
| `menu-comedor/tarjeta-inicio.js` | **Implementa:** tarjeta cotidiana de Inicio y su visibilidad V1. |

## 🕘 Historial de versiones

| Versión | Fecha | Responsables | Cambios |
|---|---:|---|---|
| 1.0 | 09/09/2026 | Product Owner + AI Collaborator | Consolida la V1 ya implementada y validada mediante PR #88–#93: fuente mensual oficial, transformación de la página útil del PDF, vistas Hoy/Mañana/Semana/Mes, tarjeta de Inicio y visibilidad de la tarjeta para alumnado Gaudem. |

---

## 🎯 1. Propósito

**Menú del Cole** transforma el menú mensual oficial del comedor en una consulta cotidiana clara, agradable y rápida dentro de Academia.

La pregunta principal que responde es:

> **¿Qué comemos hoy en el cole?**

La experiencia no pretende replicar el PDF del colegio. Su función es presentar la información diaria con una lectura mucho más directa y convertir una necesidad real del alumno en un motivo natural para abrir Academia.

---

## 📐 2. Alcance V1

### 2.1 Incluido

- una página `menu-comedor/` autenticada;
- datos mensuales estructurados a partir del menú oficial del Colegio Gaudem;
- vista del menú de hoy cuando existe jornada de comedor;
- siguiente menú disponible cuando hoy no existe menú;
- vista de mañana / siguiente jornada cuando corresponde;
- vista de la semana actual;
- vista del mes completo;
- primer plato, segundo plato, acompañamiento/guarnición cuando exista y postre;
- enlace discreto a la fuente oficial cuando esté disponible;
- tarjeta dinámica de Inicio inmediatamente después del hero;
- personalización básica mediante Persona Activa;
- presentación visual propia de Academia;
- actualización mensual mediante un nuevo módulo de datos.

### 2.2 Fuera de alcance V1

No incluye:

- scraping automático del sitio del colegio;
- lectura automática recurrente de PDFs remotos;
- Firestore;
- histórico persistente de menús;
- Misiones;
- Evidencias;
- Recompensas;
- estadísticas de alimentación;
- valoración nutricional automática;
- recomendaciones médicas o dietéticas;
- página 2 u otras páginas genéricas del PDF cuando no contienen el calendario diario del comedor.

---

## 📄 3. Fuente mensual

### 3.1 Fuente prioritaria

La fuente V1 es el **PDF mensual oficial del Colegio Gaudem aportado por el Product Owner**.

Para septiembre de 2026 se validó que:

- la **página 1** contiene el calendario diario útil para Academia;
- la **página 2** contiene información nutricional/marketing genérica y queda fuera de alcance por decisión del Product Owner.

Esta selección no se generaliza ciegamente a todos los meses. Cuando llegue un nuevo PDF debe comprobarse qué página contiene realmente el menú diario antes de estructurar los datos.

### 3.2 Flujo mensual

El procedimiento esperado es:

```text
PDF oficial del nuevo mes
→ revisar la fuente completa en el alcance necesario
→ identificar la página/calendario diario útil
→ extraer los días lectivos y platos
→ validar fidelidad contra el PDF
→ crear/actualizar el módulo mensual de datos
→ comprobar Hoy / siguiente / semana / mes
→ publicar
```

El Product Owner no debe transcribir manualmente el contenido del PDF cuando la AI Collaborator pueda extraerlo de forma fiable.

---

## 🧾 4. Contrato funcional del dato mensual

Cada día de comedor debe poder representar como mínimo:

```text
fecha
primero
segundo
acompanamiento   // opcional
postre
```

Reglas:

- `acompanamiento` se muestra únicamente cuando existe en la fuente;
- no se inventan guarniciones ni platos ausentes;
- se conserva el significado del texto del colegio;
- correcciones editoriales menores pueden aplicarse solo cuando no cambien el contenido;
- la presentación puede abreviar visualmente, pero el dato estructurado conserva suficiente fidelidad para reconstruir el menú diario.

Los datos mensuales actuales viven bajo:

```text
menu-comedor/datos/
```

La V1 utiliza módulos JavaScript simples; no se introduce una base de datos para una necesidad mensual de bajo volumen.

---

## 👤 5. Persona Activa y visibilidad

### 5.1 Tarjeta de Inicio

La tarjeta cotidiana **Hoy en el comedor / Próximo menú** se muestra únicamente cuando el perfil resuelto cumple:

```text
rol = alumno
AND
colegio = Gaudem | Colegio Gaudem
```

Las comparaciones de presentación normalizan mayúsculas/minúsculas y acentos.

Este criterio evita mostrar una utilidad específica del Colegio Gaudem a alumnos de otros centros o a perfiles para los que no aporta valor.

### 5.2 Página directa

En la V1, la regla anterior controla la **visibilidad de la tarjeta de Inicio**.

La página `menu-comedor/` permanece como página autenticada accesible por URL directa. Convertir el criterio `alumno + Gaudem` en una frontera adicional de acceso funcional requeriría una decisión explícita separada.

### 5.3 Seguridad

Menú del Cole no contiene datos privados del alumno ni escribe información de negocio en Firestore.

La visibilidad selectiva es una regla de experiencia, no una Firestore Rule.

---

## 🎨 6. Experiencia de usuario

La experiencia debe ser:

- cotidiana;
- visual;
- rápida de leer;
- cercana;
- ligera;
- útil en móvil y escritorio;
- claramente propia de Academia.

La tarjeta de Inicio no debe convertirse en un bloque grande que compita con el resto de la portada.

Gramática visual actual:

```text
🍽️ función comedor
🍲 primer plato
🍴 segundo plato
🥗 acompañamiento / guarnición
🍎 / 🥛 postre
```

La fecha se integra en el título cotidiano cuando ayuda a evitar repetición visual.

---

## 🗓️ 7. Comportamiento temporal

La lógica de consulta debe contemplar:

- hoy con menú → mostrar el menú de hoy;
- hoy sin menú → mostrar el siguiente menú disponible;
- fines de semana/festivos → no inventar menú;
- mes sin datos posteriores → conservar una entrada útil a la página mensual sin mostrar información ficticia.

La fecha se interpreta en hora local del navegador para la experiencia cotidiana.

---

## ✅ 8. Criterios de aceptación V1

La V1 se considera válida cuando:

1. el PDF oficial mensual puede transformarse sin transcripción manual del Product Owner;
2. los datos visibles coinciden con la fuente validada;
3. se muestran correctamente primer plato, segundo, acompañamiento cuando existe y postre;
4. hoy, siguiente/mañana, semana y mes son legibles;
5. fines de semana o días sin menú no generan datos inventados;
6. la tarjeta de Inicio aparece solo para `alumno + Gaudem`;
7. la tarjeta se integra sin dominar la portada;
8. la página completa conserva navegación estándar;
9. no se introducen Firestore, Misiones, Evidencias ni Recompensas;
10. el siguiente mes puede incorporarse añadiendo/actualizando únicamente sus datos y las referencias necesarias.

---

## 🔄 9. Mantenimiento mensual

Al recibir un nuevo menú:

1. revisar el PDF oficial;
2. identificar la parte que contiene el calendario diario;
3. estructurar el nuevo mes;
4. validar varios días contra la fuente, incluyendo acompañamientos cuando existan;
5. comprobar cambio de mes, fines de semana y siguiente menú;
6. publicar el módulo mensual.

No se requiere modificar esta especificación por cada nuevo mes mientras el contrato V1 no cambie.

---

## ✅ 10. Estado actual

La V1 quedó implementada y validada mediante:

- **PR #88** · Menú del Cole V1;
- **PR #89–#92** · ajustes de navegación, jerarquía visual, iconografía, fecha y acompañamiento;
- **PR #93** · visibilidad de la tarjeta para alumnado Gaudem.

La capacidad se considera **Activa**.

---

## DECISIÓN

| Campo | Valor |
|---|---|
| **Estado** | Activo |
| **Versión activa** | 1.0 |
| **Fuente** | PDF mensual oficial del Colegio Gaudem aportado por el Product Owner. |
| **Dato útil** | Calendario diario del comedor; páginas genéricas sin ese contenido quedan fuera de alcance. |
| **Persistencia** | Módulos mensuales simples en repositorio; sin Firestore V1. |
| **Visibilidad de Inicio** | Solo `alumno + Gaudem`. |
| **Frontera** | La tarjeta selectiva no convierte por sí sola la URL directa en un recurso restringido por colegio. |
| **Principio** | Transformar una necesidad escolar cotidiana en una consulta clara, agradable y útil dentro de Academia. |
