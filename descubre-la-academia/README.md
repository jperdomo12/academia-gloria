# 🌈 Descubre la Academia

## Archivos

```text
descubre-la-academia/
├── index.html
├── guia.css
├── guia.js
├── contenido.json
└── README.md
```

## Propósito

Esta guía explica de forma breve, visual y motivadora:

- qué es la Academia;
- cómo está organizada;
- cuál es su filosofía;
- qué roles acompañan el aprendizaje;
- qué representan las guacamayas;
- cómo puede contribuir cualquier familiar o profesional.

No es un manual técnico.

## Cómo invocarla

Desde cualquier página principal:

```html
<a href="/academia-gloria/descubre-la-academia/?volver=/academia-gloria/mi-universo/">
  🌈 Descubre la Academia
</a>
```

El parámetro `volver` es opcional. Cuando existe, la última tarjeta y el botón superior regresan a esa ubicación.

## Personalización

El contenido vive en:

```text
contenido.json
```

Puede modificarse sin tocar el HTML ni el JavaScript.

Cada objeto representa una tarjeta.

## Guías futuras

El motor puede reutilizarse para:

- Descubre el Rincón de Lectura.
- Descubre el Rincón de Escritura.
- Descubre la Biblioteca.
- Descubre Aventuras Matemáticas.
- Descubre Detectives de Problemas.

La recomendación es mantener el mismo diseño y cambiar únicamente el contenido JSON.
