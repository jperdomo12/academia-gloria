# 🌱 Creciendo por dentro — Piloto

## Instalación

Copiar la carpeta:

```text
creciendo-por-dentro/
```

dentro de:

```text
academia-gloria/mi-universo/
```

Reemplazar:

```text
academia-gloria/compartido/api/academia.js
```

por la versión incluida en esta entrega.

## Prueba libre

```text
http://127.0.0.1:5500/academia-gloria/mi-universo/creciendo-por-dentro/
```

## Prueba desde Misión

```text
.../creciendo-por-dentro/?misionId=ID_DE_LA_MISION
```

La Misión debe tener:

```text
modulo: creciendo-por-dentro
criterioCumplimiento.evidenciaTipo: semilla_completada
```

## Importante

La integración del formulario de creación de Mis Tareas no se incluye porque sus fuentes no formaron parte de los archivos adjuntos.

El motor y la API ya quedan preparados para recibir y ejecutar una Misión creada con esos datos.


## Ajustes v1.1

- Cabecera global oficial alineada.
- Dictado por voz en “También puedo decirlo con mis palabras”.
- Botón para escuchar la transcripción.
- Mensaje que relaciona a la guacamaya con la celebración del brote.
- Corrección del filtro `semillasIds`.
- Herramienta temporal `crear-mision-piloto.html`.

## Crear la misión piloto

Abrir:

```text
http://127.0.0.1:5500/mi-universo/creciendo-por-dentro/crear-mision-piloto.html
```

y pulsar **Crear misión piloto** una sola vez.


## Ajustes v1.2

- Favicon oficial añadido a todas las páginas de esta entrega.
- Dictado corregido para evitar texto repetido.
- Botón **Detener** añadido al dictado de respuestas propias.
- Mi Camino reconoce `creciendo-por-dentro`.
- Cada tarjeta de **Mi aventura de hoy** abre el módulo con:
  - `misionId`;
  - ruta `volver`.
- Se incluye el `index.html` completo de Mi Camino para sustituir.
