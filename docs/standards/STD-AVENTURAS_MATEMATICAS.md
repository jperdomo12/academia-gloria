# STD-007 – Aventuras Matemáticas

## Documento de Estándar Funcional

**Código:** STD-007

**Nombre:** Aventuras Matemáticas

**Versión:** 1.0

**Estado:** Aprobado

**Fecha:** Julio 2026

---

# 1. Objetivo

Aventuras Matemáticas constituye el entorno de aprendizaje matemático de la Academia Gloria Valentina.

Su propósito no consiste únicamente en enseñar contenidos curriculares.

Su objetivo principal es desarrollar el razonamiento, la autonomía y la confianza necesarios para resolver situaciones de la vida cotidiana.

---

# 2. Filosofía

Lema oficial:

> 🌈 Aventuras Matemáticas

> Descubrir. Comprender. Resolver.

Todas las actividades seguirán los principios definidos en:

01_PRINCIPIOS_PEDAGOGICOS_v1.0.md

05_MANIFIESTO_DE_AVENTURAS_MATEMATICAS_v1.0.md

---

# 3. Objetivos pedagógicos

El módulo desarrollará principalmente:

• Comprensión.

• Razonamiento.

• Lógica.

• Resolución de problemas.

• Pensamiento matemático.

• Organización.

• Autonomía.

• Confianza.

Las operaciones serán un medio.

Nunca el objetivo principal.

---

# 4. Estructura general

```
Aventuras Matemáticas

│

├── Inicio

├── Detectives de Problemas

├── Mi Tienda

├── Reino de los Números

├── Cálculo a mi ritmo

├── Isla de la Geometría

├── Laboratorio de Lógica

├── Matemáticas de cada día

├── Grandes Aventuras

└── Mi Progreso
```

---

# 5. Pantalla principal

La pantalla inicial seguirá el estándar visual del resto de la Academia.

Deberá incluir:

• Panel Inteligente de Usuario.

• Bienvenida personalizada.

• Mensaje motivador.

• Tarjeta principal.

• Acceso a cada mundo.

• Barra de progreso.

• Logros recientes.

• Botón de continuar aventura.

---

# 6. Orden recomendado de los mundos

## Mundo 1

🧩 Detectives de Problemas

Comprender antes de resolver.

---

## Mundo 2

💶 Mi Tienda

Compras.

Dinero.

Cambio.

Decisiones.

---

## Mundo 3

🔢 Reino de los Números

Comprensión numérica.

---

## Mundo 4

⚡ Cálculo a mi ritmo

Sumas.

Restas.

Multiplicaciones.

Divisiones.

---

## Mundo 5

📐 Isla de la Geometría

Figuras.

Espacio.

Medidas.

---

## Mundo 6

🧠 Laboratorio de Lógica

Series.

Patrones.

Clasificaciones.

Inferencias.

---

## Mundo 7

🕒 Matemáticas de cada día

Tiempo.

Calendarios.

Viajes.

Recetas.

Temperaturas.

Distancias.

---

## Mundo 8

🏆 Grandes Aventuras

Retos que combinan todos los conocimientos anteriores.

---

# 7. Tipos de actividades

Cada mundo podrá utilizar diferentes tipos.

• Arrastrar.

• Seleccionar.

• Ordenar.

• Completar.

• Relacionar.

• Escuchar.

• Leer.

• Resolver.

• Construir.

• Simular.

---

# 8. Detectives de Problemas

Será el primer gran módulo.

Objetivo:

Aprender a identificar:

• Qué ocurre.

• Qué sabemos.

• Qué nos preguntan.

• Qué estrategia utilizar.

Solo después aparecerán las operaciones.

---

# 9. Mi Tienda

Uno de los módulos prioritarios.

Trabajará:

• Monedas.

• Billetes.

• Compras.

• Cambio.

• Comparación de precios.

• Presupuesto.

• Ahorro.

• Decisiones.

Inspirado en situaciones reales.

---

# 10. Sistema de progreso

Cada mundo tendrá:

• Exploración.

• Práctica.

• Dominio.

• Grandes retos.

Nunca existirá el concepto de "suspenso".

El progreso siempre será positivo.

---

# 11. Gamificación

Se utilizarán:

⭐ Estrellas

🌈 Arcoíris

✨ Celebraciones

🎉 Logros

🏆 Insignias

Nunca rankings.

Nunca comparaciones.

---

# 12. Mensajes

Todos los mensajes serán positivos.

Ejemplos:

"Muy buena idea."

"Has encontrado una pista."

"Cada intento cuenta."

"Probemos otro camino."

"Nunca dejamos de aprender."

---

# 13. Panel Inteligente de Usuario

Seguirá exactamente el estándar definido para:

panel-usuario.js

panel-usuario.css

Mostrará:

Nombre.

Avatar.

Saludo.

Acceso al perfil.

Cerrar sesión.

---

# 14. Firebase

Cada usuario almacenará:

```
usuarios

└── uid

        aventurasMatematicas

                progreso

                mundos

                logros

                actividades

                estadisticas
```

---

# 15. Estadísticas

Se almacenarán:

Tiempo total.

Actividades realizadas.

Retos completados.

Mundos desbloqueados.

Última actividad.

No se almacenarán puntuaciones para comparar usuarios.

---

# 16. Diseño visual

Seguirá la línea gráfica de:

Biblioteca.

Lectura.

Escritura.

Predominarán:

Azules.

Morados.

Amarillos.

Verdes.

Fondos claros.

Ilustraciones suaves.

Mucho espacio en blanco.

---

# 17. Sonido

Opcional.

Solo cuando aporte valor.

Nunca obligatorio.

---

# 18. Accesibilidad

Botones grandes.

Texto claro.

Alto contraste.

Lectura por voz cuando sea necesario.

Instrucciones sencillas.

---

# 19. Integración

Compatible con:

Perfil Inteligente.

Memoria Inteligente.

Biblioteca.

Rincón de Lectura.

Rincón de Escritura.

Calendario.

---

# 20. Futuras ampliaciones

Podrán incorporarse:

Fracciones.

Decimales.

Porcentajes.

Estadística.

Probabilidad.

Álgebra.

Programación visual.

Pensamiento computacional.

Economía doméstica.

Planificación financiera.

---

# 21. Criterios de aceptación

El módulo se considerará terminado cuando:

✓ Mantenga la identidad visual de la Academia.

✓ Todas las actividades sean motivadoras.

✓ El aprendizaje esté conectado con la vida cotidiana.

✓ No existan mensajes negativos.

✓ El progreso sea personalizado.

✓ Toda la información se almacene correctamente en Firebase.

✓ La experiencia sea completamente responsive.

✓ El módulo pueda crecer sin modificar la arquitectura.

---

# 22. Roadmap

Versión 1.0

• Arquitectura.

• Pantalla principal.

• Detectives de Problemas.

---

Versión 1.1

• Mi Tienda.

---

Versión 1.2

• Reino de los Números.

---

Versión 1.3

• Cálculo a mi ritmo.

---

Versión 1.4

• Geometría.

---

Versión 1.5

• Lógica.

---

Versión 1.6

• Matemáticas de cada día.

---

Versión 2.0

• Grandes Aventuras.

---

# 23. Observación final

Aventuras Matemáticas no pretende enseñar únicamente contenidos escolares.

Pretende ayudar a Gloria a descubrir que comprender un problema, pensar con calma y encontrar una solución son habilidades que la acompañarán durante toda su vida.

---

> 🌈 Aventuras Matemáticas

> Descubrir. Comprender. Resolver.

> Cada aventura empieza comprendiendo el camino.
