# 🗃️ MODELO DE MISIONES DE LECTURA · Histórico
## Academia Gloria Valentina

| Campo | Valor |
|---|---|
| **Ruta histórica** | `docs/history/MODELO_MISIONES_LECTURA.md` |
| **Ruta original** | `docs/models/MODELO_MISIONES_LECTURA.md` |
| **Versión original** | 1.0 |
| **Estado** | Histórico |
| **Fecha de origen** | 01/08/2026 |
| **Fecha de archivo** | 04/09/2026 |
| **Motivo** | El modelo específico quedó absorbido por el modelo conceptual general de Misiones, STD-011/SPEC de Misiones y la implementación propietaria de Mi Rincón de Lectura. Mantenerlo activo crearía una segunda fuente sobre criterios, evidencia y sesiones. |
| **Sucesores** | `docs/models/MODELO_MISIONES.md`, `docs/standards/STD-MIS_TAREAS_Y_MISIONES.md`, `docs/specifications/SPEC-MIS_TAREAS_Y_MISIONES.md` |

> Este documento se conserva únicamente por trazabilidad. No gobierna el comportamiento actual de las Misiones de Lectura.
>
> El contenido original se preserva a continuación sin reinterpretarlo.

---

# MODELO DE MISIONES DE LECTURA

**Proyecto:** Academia Gloria Valentina  
**Versión:** 1.0  
**Estado:** Release Candidate  
**Fecha:** 01/08/2026

## Regla principal

Una lectura cuenta para una misión únicamente cuando el alumno pulsa
`Guardar mi aventura` y la sesión queda almacenada correctamente.

## Relación

```text
Misión
└── Evidencia de aprendizaje
    └── Sesión de lectura guardada
```

La sesión conserva audio, transcripción, respuestas y análisis.
La evidencia solo conecta la sesión con la misión.

## Criterio inicial

- cantidad de lecturas;
- nivel específico o cualquier nivel.

Se deja prevista para una fase posterior la propiedad `actividadIds`,
que permitirá asignar lecturas concretas.
