# MODELO DE NAVEGACIÓN

**Proyecto:** Academia Gloria Valentina  
**Versión:** 1.1  
**Estado:** Activo  
**Fecha:** 01/08/2026

## Regla de nodos con hijos

Un nodo puede cumplir simultáneamente dos funciones:

1. representar una página navegable;
2. contener páginas hijas.

La interfaz ofrece controles separados:

- el nombre y el contenido principal del nodo navegan a su página;
- la flecha expande o comprime sus hijos.

Este patrón se aplica de forma genérica a cualquier rama:

- Mi Universo;
- Aventuras Matemáticas;
- cursos;
- materias con temas;
- futuros módulos de la Academia.

## Independencia de las páginas

El árbol está centralizado en:

```text
compartido/modelos/navegacion.js
```

Los cambios futuros del árbol no requieren modificar los HTML que ya cargan el componente.
