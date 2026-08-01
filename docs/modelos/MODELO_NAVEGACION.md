# MODELO DE NAVEGACIÓN

**Proyecto:** Academia Gloria Valentina  
**Versión:** 1.0  
**Estado:** Activo  
**Fecha:** 01/08/2026

## Propósito

Separar completamente:

1. el árbol de navegación;
2. el componente que lo representa;
3. las páginas que lo cargan.

## Conceptos

### Nodo

Elemento individual del árbol.

```javascript
{
  id,
  titulo,
  icono,
  ruta,
  descripcion,
  hijos
}
```

### Rama

Nodo que contiene hijos.

Una rama puede tener simultáneamente:

- una página principal propia;
- hijos desplegables.

Ejemplos:

- Aventuras Matemáticas;
- 5.º de Primaria;
- futuros cursos o módulos.

### Página

Nodo con una ruta navegable.

### Ruta actual

Ruta de la página abierta. Se utiliza para:

- resaltar la página;
- abrir automáticamente sus ramas superiores;
- informar la ubicación actual.

## Reglas

- El árbol puede contener cualquier cantidad de niveles.
- La interfaz procurará mantener entre dos y cuatro niveles útiles.
- Las páginas no contienen la estructura del menú.
- Un cambio en el árbol no requiere modificar los HTML ya integrados.
- Un nodo con hijos puede ofrecer:
  - botón para ir a su página;
  - control independiente para expandir sus hijos.
- Gestión familiar permanece fuera del menú hasta implementar roles.
