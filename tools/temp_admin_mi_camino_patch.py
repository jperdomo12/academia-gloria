from pathlib import Path


def replace_once(text, old, new, label):
    if old not in text:
        raise RuntimeError(f"No se encontró ancla: {label}")
    return text.replace(old, new, 1)


# Navegación administrativa
path = Path("compartido/modelos/navegacion.js")
text = path.read_text(encoding="utf-8")
if 'id: "administracion-mi-camino"' not in text:
    target = '''      {
        id: "gestion-usuarios",
        titulo: "Gestión de Usuarios",
        icono: "👥",
        ruta: "administracion/usuarios/",
        nivelMinimo: "administracion"
      }
'''
    replacement = '''      {
        id: "gestion-usuarios",
        titulo: "Gestión de Usuarios",
        icono: "👥",
        ruta: "administracion/usuarios/",
        nivelMinimo: "administracion"
      },
      {
        id: "administracion-mi-camino",
        titulo: "Mi Camino",
        icono: "🌳",
        ruta: "administracion/mi-camino/",
        nivelMinimo: "administracion",
        cabeceraGlobal: true,
        limpiarNavegacionLegada: true
      }
'''
    text = replace_once(text, target, replacement, "Gestión de Usuarios")
path.write_text(text, encoding="utf-8")


# Firestore Rules: configuración global de crecimiento.
path = Path("compartido/firebase/FireStore Rules.txt")
text = path.read_text(encoding="utf-8")
if "match /configuracion/{configId}" not in text:
    anchor = "    // LOGIN FUNCIONAL · Fase 1.6 / 1.8\n"
    block = '''    // CONFIGURACIÓN GLOBAL · MI CAMINO
    //
    // La configuración es legible por cualquier Usuario autenticado porque
    // determina la presentación de crecimiento del alumno. Solo Administración
    // puede modificarla y siempre conserva auditoría transversal.
    function configuracionMiCaminoValida() {
      let datos = request.resource.data;

      return datos.keys().hasOnly([
          "schemaVersion",
          "etapas",
          "reglasPeso",
          "createdAt",
          "createdBy",
          "updatedAt",
          "updatedBy"
        ])
        && datos.schemaVersion == 1
        && datos.etapas is map
        && datos.etapas.keys().hasOnly([
          "semilla",
          "brote",
          "plantita",
          "arbol-joven",
          "arbol",
          "arbol-con-frutos",
          "arbol-lleno-de-frutos"
        ])
        && datos.etapas.semilla is int
        && datos.etapas.semilla == 0
        && datos.etapas.brote is int
        && datos.etapas.plantita is int
        && datos.etapas["arbol-joven"] is int
        && datos.etapas.arbol is int
        && datos.etapas["arbol-con-frutos"] is int
        && datos.etapas["arbol-lleno-de-frutos"] is int
        && datos.etapas.brote > datos.etapas.semilla
        && datos.etapas.plantita > datos.etapas.brote
        && datos.etapas["arbol-joven"] > datos.etapas.plantita
        && datos.etapas.arbol > datos.etapas["arbol-joven"]
        && datos.etapas["arbol-con-frutos"] > datos.etapas.arbol
        && datos.etapas["arbol-lleno-de-frutos"] > datos.etapas["arbol-con-frutos"]
        && datos.reglasPeso is map
        && datos.reglasPeso.keys().hasOnly([
          "cantidadEstandarMin",
          "cantidadAmpliaMin",
          "minutosEstandarMin",
          "minutosAmpliaMin",
          "repasoAcademicoComoEstandar",
          "tareaCombinadaComoAmplia"
        ])
        && datos.reglasPeso.cantidadEstandarMin is int
        && datos.reglasPeso.cantidadEstandarMin >= 1
        && datos.reglasPeso.cantidadAmpliaMin is int
        && datos.reglasPeso.cantidadAmpliaMin > datos.reglasPeso.cantidadEstandarMin
        && datos.reglasPeso.minutosEstandarMin is int
        && datos.reglasPeso.minutosEstandarMin >= 1
        && datos.reglasPeso.minutosAmpliaMin is int
        && datos.reglasPeso.minutosAmpliaMin > datos.reglasPeso.minutosEstandarMin
        && datos.reglasPeso.repasoAcademicoComoEstandar is bool
        && datos.reglasPeso.tareaCombinadaComoAmplia is bool
        && datos.createdAt is timestamp
        && datos.createdBy is string
        && datos.updatedAt is timestamp
        && datos.updatedBy is string;
    }

    match /configuracion/{configId} {
      allow read: if configId == "miCamino" && estaAutenticado();

      allow create: if configId == "miCamino"
        && esAdministrador()
        && configuracionMiCaminoValida()
        && request.resource.data.createdAt == request.time
        && request.resource.data.createdBy == request.auth.uid
        && request.resource.data.updatedAt == request.time
        && request.resource.data.updatedBy == request.auth.uid;

      allow update: if configId == "miCamino"
        && esAdministrador()
        && configuracionMiCaminoValida()
        && request.resource.data.createdAt == resource.data.createdAt
        && request.resource.data.createdBy == resource.data.createdBy
        && request.resource.data.updatedAt == request.time
        && request.resource.data.updatedBy == request.auth.uid;

      allow delete: if false;
    }

'''
    text = replace_once(text, anchor, block + anchor, "LOGIN FUNCIONAL")
path.write_text(text, encoding="utf-8")


# Documento propietario de Motivación/Reconocimiento.
path = Path("docs/product/DESIGN-SISTEMA_MOTIVACION_Y_RECONOCIMIENTO-v1.0.md")
text = path.read_text(encoding="utf-8")
text = text.replace("| **Versión del documento** | 1.1 |", "| **Versión del documento** | 1.2 |", 1)
text = text.replace("| **Última actualización** | 03/09/2026 |", "| **Última actualización** | 12/09/2026 |", 1)
history = "| Versión | Fecha | Responsables | Cambios |\n|---|---:|---|---|\n"
if "| 1.2 | 12/09/2026 |" not in text:
    row = "| 1.2 | 12/09/2026 | Juan Perdomo + AI Collaborator | Activa la mecánica real de crecimiento de Mi Camino con siete etapas, ponderación 1/2/3 basada en alcance observable, exclusión de datos de prueba y Administración → Mi Camino para auditoría, vista previa y configuración global con auditoría. La etapa sigue siendo derivada: no se persiste por Persona. |\n"
    text = replace_once(text, history, history + row, "historial diseño motivacional")
text = text.replace(
    "| E · Mecánica Semilla/Brote/Árbol | ⏳ Diseñada conceptualmente · no implementada |",
    "| E · Crecimiento visual de Mi Camino | ✅ Implementado · 7 etapas · ponderación configurable |",
    1,
)
old_note = "La representación **Semilla → Brote → Árbol** ya puede aparecer como lenguaje visual de crecimiento, pero eso no equivale a disponer de una mecánica automática que cambie etapas."
new_note = """La mecánica de crecimiento visual está implementada y se deriva de Misiones reales completadas, visibles y no marcadas como prueba. Utiliza siete etapas —**Semilla → Brote → Plantita → Árbol joven → Árbol → Árbol con frutos → Árbol lleno de frutos**— y pesos 1/2/3 que representan únicamente alcance observable de la Misión, nunca valor personal, inteligencia o comparación entre alumnos.

La etapa no se guarda como dato de la Persona: se recalcula desde los hechos actuales y la configuración global. `Administración → Mi Camino` permite auditar cada contribución, previsualizar cambios y modificar umbrales/reglas de ponderación. La configuración persiste en `configuracion/miCamino` con `createdAt`, `createdBy`, `updatedAt` y `updatedBy`; los datos de prueba nunca aportan unidades."""
if old_note in text:
    text = text.replace(old_note, new_note, 1)
path.write_text(text, encoding="utf-8")


# Visión de Mi Camino.
path = Path("docs/vision/08_MI_CAMINO.md")
text = path.read_text(encoding="utf-8")
text = text.replace("| **Versión** | 1.1 |", "| **Versión** | 1.2 |", 1)
text = text.replace("| **Última actualización** | 04/09/2026 |", "| **Última actualización** | 12/09/2026 |", 1)
history = "| Versión | Fecha | Responsables | Cambios |\n|---|---:|---|---|\n"
if "| 1.2 | 12/09/2026 |" not in text:
    row = "| 1.2 | 12/09/2026 | Juan Perdomo + AI Collaborator | Sincroniza la visión con el crecimiento visual real de siete etapas derivado de Misiones reales. Mantiene la configuración/auditoría fuera de la experiencia del alumno, bajo Administración, y preserva la prohibición de rankings, economía de puntos o valor personal basado en métricas. |\n"
    text = replace_once(text, history, history + row, "historial visión Mi Camino")
anchor = "La mecánica exacta pertenece al Sistema de Motivación y Reconocimiento.\n"
addition = """La implementación actual puede representar visualmente el crecimiento mediante siete etapas derivadas de actividad real. Las unidades internas son un mecanismo técnico para determinar la ilustración y el tramo actual; **no se presentan como una puntuación de valor personal ni una competición**. Las Misiones de prueba quedan excluidas.

La auditoría y configuración de esta mecánica vive separada en `Administración → Mi Camino`, protegida por nivel `administracion`; no convierte Mi Camino en una consola administrativa.
"""
if addition not in text:
    text = replace_once(text, anchor, anchor + "\n" + addition, "mecánica visión Mi Camino")
text = text.replace(
    "| **Crecimiento visible** | Reconocimientos y Guacamayas mediante sistema propietario |",
    "| **Crecimiento visible** | Reconocimientos/Guacamayas + 7 etapas derivadas de Misiones reales |",
    1,
)
path.write_text(text, encoding="utf-8")
