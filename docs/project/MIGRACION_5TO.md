# 🚀 Migración de 5º de Primaria
## Academia de Gloria Valentina

**Proyecto:** Academia de Gloria Valentina  
**Versión objetivo:** 2.0  
**Estado:** En ejecución  
**Repositorio:** https://github.com/jperdomo12/academia-gloria  
**Última actualización:** Julio 2026

---

# 1. Objetivo

Migrar completamente todo el contenido correspondiente a **5º de Primaria** desde la estructura histórica del proyecto hacia la nueva Arquitectura 2.0.

La migración permitirá:

- mantener una estructura escalable;
- facilitar el crecimiento hacia 6º;
- mejorar la navegación;
- simplificar el mantenimiento;
- preparar la Academia para futuros cursos.

---

# 2. Principios de la migración

La migración seguirá siempre estos principios.

## Seguridad

Nunca eliminar primero.

Siempre:

COPIAR

↓

VALIDAR

↓

PUBLICAR

↓

CERTIFICAR

↓

ELIMINAR

---

## Continuidad

Durante toda la migración la Academia debe continuar funcionando.

Nunca se publicará una versión que rompa enlaces.

---

## Calidad

Cada página deberá quedar mejor que la versión anterior.

No solamente funcionar.

Debe mejorar.

---

## Reutilización

Siempre que sea posible se reutilizarán componentes comunes.

No duplicaremos código innecesariamente.

---

# 3. Arquitectura origen

Actualmente la Academia utiliza esta organización.

```text
mates/

lengua/

sociales/

ciencias/

ingles/
```

Esta estructura seguirá existiendo temporalmente.

---

# 4. Arquitectura destino

Toda la información de 5º deberá quedar organizada en:

```text
cursos/

    5to/

        mates/

        lengua/

        sociales/

        ciencias/

        ingles/
```

---

# 5. Estrategia de migración

Cada tema seguirá exactamente este flujo.

```text
Copiar

↓

Corregir rutas

↓

Probar localmente

↓

Publicar

↓

Validar GitHub Pages

↓

Certificar

↓

Eliminar versión antigua
```

---

# 6. Estados de migración

| Estado | Significado |
|---------|-------------|
| ⬜ Pendiente | Aún no revisado |
| 🟡 En revisión | Se está validando |
| 🔵 Publicado | Publicado en nueva ruta |
| 🟢 Certificado | Validado completamente |
| 🔴 Corregir | Requiere cambios |

---

# 7. Portales principales

| Portal | Estado |
|----------|--------|
| Academia | 🟢 |
| 5º Primaria | 🟢 |
| Matemáticas | 🟡 |
| Lengua | ⬜ |
| Sociales | ⬜ |
| Ciencias | ⬜ |
| Inglés | ⬜ |

---

# 8. Navegación oficial

La navegación estándar será:

```text
Academia

↓

5º Primaria

↓

Asignatura

↓

Tema

↓

Actividad

↓

Juego

↓

Test
```

Todos los botones "Volver" deberán seguir esta jerarquía.

---

# 9. Inventario Matemáticas

| Página | Estado | Observaciones |
|---------|--------|---------------|
| index.html | 🟡 | Revisar enlaces |
| Perímetro y Área | ⬜ | |
| Geometría | ⬜ | |
| Múltiplos | ⬜ | |
| Divisores | ⬜ | |
| Problemas | ⬜ | |

Añadir cualquier nuevo contenido que aparezca.

---

# 10. Inventario Lengua

| Página | Estado | Observaciones |
|---------|--------|---------------|
| index.html | ⬜ | |
| Gramática | ⬜ | |
| Diálogo | ⬜ | |
| Acentuación | ⬜ | |
| Texto comparativo | ⬜ | |
| Comprensión | ⬜ | |

---

# 11. Inventario Sociales

| Página | Estado | Observaciones |
|---------|--------|---------------|
| index.html | ⬜ | |
| Edad Moderna | ⬜ | |
| Esquema Edad Moderna | ⬜ | |
| Edad Media | ⬜ | |
| Relieve | ⬜ | |

---

# 12. Inventario Ciencias

| Página | Estado | Observaciones |
|---------|--------|---------------|
| index.html | ⬜ | |
| Electricidad | ⬜ | |
| Máquinas | ⬜ | |

---

# 13. Inventario Inglés

| Página | Estado | Observaciones |
|---------|--------|---------------|
| index.html | ⬜ | |
| WH Questions | ⬜ | |
| Adjectives | ⬜ | |
| Vocabulary | ⬜ | |

---

# 14. Certificación de una página

Una página solamente podrá marcarse como **CERTIFICADA** cuando cumpla TODOS los puntos.

## Navegación

- [ ] Todos los enlaces funcionan.

- [ ] El botón Volver apunta al lugar correcto.

---

## Recursos

- [ ] Imágenes.

- [ ] Audio.

- [ ] Vídeos.

- [ ] Iconos.

---

## Funcionalidad

- [ ] Juegos.

- [ ] Test.

- [ ] Animaciones.

- [ ] Impresión.

---

## Compatibilidad

- [ ] Portátil.

- [ ] Tablet.

- [ ] Móvil.

---

## Calidad

- [ ] Sigue el ADN de la Academia.

- [ ] Sigue la Guía ULTRA PRO.

- [ ] Diseño visual coherente.

- [ ] Código limpio.

---

# 15. Página certificada

Una vez validada, la página recibirá internamente el estado:

```text
⭐ CERTIFICADA 2.0
```

---

# 16. Commits recomendados

Ejemplos.

```
Crea portal 5º Primaria

Migra portal Matemáticas

Migra Sociales

Corrige rutas relativas

Certifica Matemáticas

Completa migración Lengua

Completa migración Sociales

Completa migración Ciencias

Completa migración Inglés

Finaliza migración 5º Arquitectura 2.0
```

---

# 17. Compatibilidad temporal

Mientras dure la migración coexistirán ambas estructuras.

Antigua:

```text
/mates/

/lengua/

/sociales/

/ciencias/

/ingles/
```

Nueva:

```text
/cursos/5to/mates/

/cursos/5to/lengua/

/cursos/5to/sociales/

/cursos/5to/ciencias/

/cursos/5to/ingles/
```

Las carpetas originales NO se eliminarán hasta finalizar completamente la certificación.

---

# 18. Cierre del proyecto

La migración de 5º se considerará terminada cuando:

- Todos los portales estén certificados.

- Todas las páginas estén certificadas.

- Toda la navegación funcione.

- No existan enlaces rotos.

- El portal principal apunte a la nueva arquitectura.

- GitHub Pages publique correctamente todos los cambios.

- Exista un Release oficial de cierre.

---

# 19. Release

Versión prevista:

```
Academia Gloria

Release 2.1

Migración completa de 5º
```

---

# 20. Lecciones aprendidas

Durante la migración se documentarán:

- mejoras realizadas;
- problemas encontrados;
- decisiones de arquitectura;
- componentes reutilizados;
- ideas para 6º.

Este apartado servirá como referencia para futuras migraciones.

---

# Principio fundamental

> No migramos páginas.

> Migramos experiencias de aprendizaje.

Cada página debe quedar mejor que antes.

Cada mejora debe acercar un poco más a Gloria a aprender con confianza, autonomía y alegría.

🌈
