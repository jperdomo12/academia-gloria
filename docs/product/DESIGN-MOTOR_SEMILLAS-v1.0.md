# DISEÑO TÉCNICO — MOTOR DE SEMILLAS

**Versión:** 1.0  
**Estado:** Piloto implementable  
**Módulo:** `mi-universo/creciendo-por-dentro/`

## 1. Objetivo

Implementar el primer Motor de Semillas reutilizando los patrones validados en Detectives y Mi Rincón de Lectura, sin construir todavía un motor universal.

## 2. Decisiones

- Contenido en `semillas.json`.
- Motor en `creciendo-por-dentro.js`.
- Presentación en `index.html` y CSS propio.
- Grabación y transcripción usando el patrón de Lectura.
- Persistencia mediante `Academia.semillas`.
- Evidencia mediante `Academia.evidencias.registrarParaMision`.
- Una Misión mantiene un único módulo y tipo de evidencia.
- `cantidadObjetivo` admite varias Semillas.
- `filtros.semillasIds` limita opcionalmente las Semillas.
- Si no hay IDs, el alumno elige libremente.
- Una misma Semilla no cuenta dos veces para la misma Misión porque la evidencia usa `actividadId` y queda deduplicada.
- DESC no se muestra al alumno en el piloto.

## 3. Flujo

```text
Acceso libre o ?misionId=...
        ↓
Cargar perfil, misión, sesiones y semillas.json
        ↓
Catálogo libre o filtrado
        ↓
Bienvenida
        ↓
Situación
        ↓
Describir
        ↓
Expresar
        ↓
Solicitar
        ↓
Consecuencia
        ↓
Construir frase
        ↓
Grabar / transcribir / repetir
        ↓
Guardar sesión
        ↓
Registrar evidencia
        ↓
Actualizar progreso
        ↓
Historial y cierre
```

## 4. Persistencia

Nueva subcolección:

```text
usuarios/{uid}/sesionesSemillas/{sesionId}
```

Campos principales:

- `semillaId`
- `titulo`
- `familia`
- `tipoSituacion`
- `nivelApoyo`
- `duracion`
- `intentos`
- `respuestaConstruida`
- `audioData`
- `mimeType`
- `duracionAudio`
- `transcripcion`
- `respuestas`
- `analisisEducativo`
- `observacionFamilia`
- `misionId`

## 5. Evidencia

```text
modulo: creciendo-por-dentro
tipo: semilla_completada
actividadId: semillaId
sesionId: sesión guardada
```

## 6. Ajuste compartido

`academia.js` incorpora:

- módulo válido `creciendo-por-dentro`;
- API `Academia.semillas`;
- filtro por arrays;
- filtro especial por `actividadId`.

## 7. Alcance no incluido

- UI de creación de Misiones en Mis Tareas, porque esa carpeta no fue incluida en esta entrega.
- Misiones heterogéneas.
- servicio común extraído de grabación;
- análisis emocional automático;
- Jardín Personal completo;
- recomendaciones automáticas por IA.

## 8. Validación del piloto

El piloto deberá comprobar:

1. acceso libre;
2. acceso con `misionId`;
3. filtrado de Semillas;
4. grabación;
5. transcripción;
6. repetición;
7. guardado;
8. evidencia;
9. progreso;
10. historial;
11. comprensión de Gloria;
12. motivación para regresar.
