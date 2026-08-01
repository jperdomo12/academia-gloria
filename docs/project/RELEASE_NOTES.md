# RELEASE NOTES

## Academia Gloria Valentina · v2.2-RC2

**Nombre:** Modelo de Navegación v1.0  
**Fecha:** 01/08/2026  
**Base requerida:** v2.2-RC1

### Arquitectura

- El árbol se separa en `compartido/modelos/navegacion.js`.
- El componente ya no contiene páginas concretas.
- Los HTML de RC1 no necesitan modificarse.
- Futuras altas, bajas o cambios de navegación se realizan en el modelo central.

### Experiencia

- Cualquier nodo puede ser página y grupo desplegable a la vez.
- `5.º de Primaria` aparece comprimido.
- Al expandirlo aparecen sus materias.
- Se puede ir directamente:
  - a 5.º;
  - a Inglés;
  - a cualquier otra materia.
- El mismo patrón se aplica a toda la Academia.
- La rama de la página actual se abre automáticamente.
