# Academia Gloria Valentina — Reglas para agentes

## Antes de modificar

- Comprender antes de proponer o modificar; leer `docs/README.md` e identificar el documento propietario del dominio.
- Revisar el código y la configuración realmente vigentes, y distinguir documentación activa de `history/` y `OLD-*`.
- Reutilizar arquitectura, componentes, servicios y modelos existentes.

## Clasificación

- **Hecho:** existe en código, documentación o datos actuales.
- **Inferencia:** conclusión razonable pero no confirmada.
- **Propuesta:** todavía no aprobada.
- **Decisión:** aprobada por Product Owner.
- **Implementado:** existe realmente y ha sido incorporado.

## Reglas

- No crear estructuras paralelas sin necesidad aprobada ni ampliar el alcance de una tarea; preferir cambios localizados a reescrituras.
- Preservar compatibilidad cuando corresponda. No introducir nuevos modelos, colecciones, roles, migraciones o arquitectura significativa sin aprobación.
- No modificar `OLD-*` salvo instrucción explícita ni eliminar o renombrar archivos sin autorización.
- No incluir información personal privada; mantener lenguaje de producto generalizado.
- Usar Vanilla HTML/CSS/JavaScript + Firebase salvo decisión contraria.
- Código y configuración representan implementación; documentación oficial, decisiones y contratos; Git, evolución.
- Los chats no son fuente permanente de verdad: se especializan y la documentación unifica.

## Git / control

- Trabajar desde el baseline indicado; no hacer merge directo a `main`, reescribir historia ni mezclar cambios ajenos al alcance.
- Informar exactamente qué archivos se modificaron.

## Validación

- Ejecutar validaciones proporcionales. Para JS, comprobar sintaxis cuando sea posible; para cambios funcionales, revisar imports, IDs, selectores, rutas y contratos afectados.
- Declarar qué no pudo probarse. Nunca afirmar que algo está implementado o probado si no lo está.

## Documentación

- Actualizar antes que crear y mantener un único propietario para cada verdad importante.
- Respetar el historial: `Versión | Fecha | Responsables | Cambios`.
- Responsables actuales: Product Owner + AI Collaborator.
