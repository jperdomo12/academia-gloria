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
