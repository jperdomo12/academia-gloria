/* Academia Gloria Valentina · Recompensas A1/A2/B · Mi Camino */

import { Reconocimientos } from "../../compartido/api/reconocimientos.js";
import { Academia } from "../../compartido/api/academia.js";
import { ContextoUsuario } from "../../compartido/js/contexto-usuario.js";
import {
  obtenerHistorialDetectives,
  obtenerSesionesHistoria
} from "../../compartido/js/detectives-progreso.js";

const PASO_HISTORIA = 5;
const DIAS_DESCANSO_REGLA_LIA = 7;
const MAX_RECONOCIMIENTOS_LIA_DIA = 2;
const MILISEGUNDOS_DIA = 24 * 60 * 60 * 1000;
const FECHA_INICIO_REGLA_CONSTANCIA = new Date("2026-09-02T00:00:00");
const ESTADOS_REVISION_CONSTANCIA = new Set([
  "pendiente_validacion",
  "completada_pendiente_validacion"
]);

const REGLAS_LIA_DETECTIVES = Object.freeze({
  ayuda_y_continuo: Object.freeze({
    id: "lia.detectives.ayuda_y_continuo",
    mensaje:
      "Usaste pistas para seguir avanzando y continuaste hasta resolver el caso. " +
      "La ayuda también puede formar parte de aprender."
  }),
  persistencia: Object.freeze({
    id: "lia.detectives.persistencia",
    mensaje:
      "No salió al principio, pero seguiste probando hasta resolver el caso."
  })
});

const REGLA_LIA_CONSTANCIA = Object.freeze({
  id: "lia.constancia.7_dias",
  titulo: "Una semana construyendo tu camino",
  mensaje:
    "Durante 7 días seguidos encontraste un momento para aprender o avanzar. " +
    "Lo importante no es hacerlo perfecto, sino seguir construyendo tu camino."
});

let instalada = false;
let detenerObservacion = null;
let detenerObservacionConstancia = null;
let observadorDomConstancia = null;
let reconocimientosPersistentes = [];
let reconocimientosLiaDetectives = [];
let reconocimientosLiaConstancia = [];
let reconocimientosActuales = [];
let tareasConstancia = [];
let tareasConstanciaCargadas = false;
let cantidadHistoriaVisible = PASO_HISTORIA;
let puedeAbrirFuentesGestion = false;

function texto(valor = "") {
  return String(valor ?? "").replace(/\s+/g, " ").trim();
}

function escapar(valor = "") {
  return String(valor ?? "").replace(/[&<>"']/g, caracter => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[caracter]);
}

function fechaJs(valor) {
  if (!valor) return null;
  if (typeof valor?.toDate === "function") return valor.toDate();
  if (typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    const fechaLocal = new Date(`${valor}T12:00:00`);
    return Number.isNaN(fechaLocal.getTime()) ? null : fechaLocal;
  }
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}

function fechaMs(valor) {
  return fechaJs(valor)?.getTime() || 0;
}

function formatearFecha(valor) {
  const fecha = fechaJs(valor);
  if (!fecha) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(fecha);
}

function formatearFechaHora(valor) {
  if (typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    return formatearFecha(valor);
  }

  const fecha = fechaJs(valor);
  if (!fecha) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(fecha);
}

function formatearFechaReconocimiento(item = {}) {
  return formatearFechaHora(item.fechaReconocimiento);
}

function claveDia(valor) {
  const fecha = fechaJs(valor);
  if (!fecha) return "";
  return [
    fecha.getFullYear(),
    String(fecha.getMonth() + 1).padStart(2, "0"),
    String(fecha.getDate()).padStart(2, "0")
  ].join("-");
}

function cargarEstilos() {
  if (document.querySelector('link[data-reconocimientos-camino-css="true"]')) return;
  const enlace = document.createElement("link");
  enlace.rel = "stylesheet";
  enlace.href = new URL("./reconocimientos-camino.css", import.meta.url).href;
  enlace.dataset.reconocimientosCaminoCss = "true";
  document.head.appendChild(enlace);
}

function localizarCabeceraCrecimiento() {
  const titulo = [...document.querySelectorAll(".seccion-titulo h2")]
    .find(item => texto(item.textContent) === "Así voy creciendo");
  return titulo?.closest(".seccion-titulo") || null;
}

function localizarBloqueCrecimiento() {
  const cabecera = localizarCabeceraCrecimiento();
  if (!cabecera) return null;

  let siguiente = cabecera.nextElementSibling;
  while (siguiente && !siguiente.matches(".crecimiento--arbol")) {
    siguiente = siguiente.nextElementSibling;
  }

  return siguiente || null;
}

function asegurarHost() {
  let host = document.getElementById("recompensasA1Camino");
  if (host) return host;

  const crecimiento = localizarBloqueCrecimiento();
  if (!crecimiento?.parentElement) return null;

  host = document.createElement("section");
  host.id = "recompensasA1Camino";
  host.className = "recompensas-a1";
  host.setAttribute("aria-label", "Reconocimientos de Mi Camino");
  crecimiento.parentElement.insertBefore(host, crecimiento);
  return host;
}

function asegurarGuiaMotivacional() {
  const cabecera = localizarCabeceraCrecimiento();
  if (!cabecera) return null;

  let acceso = cabecera.querySelector("[data-abrir-guia-recompensas]");
  if (!acceso) {
    acceso = document.createElement("button");
    acceso.type = "button";
    acceso.className = "recompensas-guia__acceso";
    acceso.dataset.abrirGuiaRecompensas = "true";
    acceso.textContent = "🌈 ¿Qué cosas celebra la Academia?";
    cabecera.appendChild(acceso);
  }

  let dialogo = document.getElementById("guiaRecompensasCamino");
  if (!dialogo) {
    dialogo = document.createElement("dialog");
    dialogo.id = "guiaRecompensasCamino";
    dialogo.className = "recompensas-guia";
    dialogo.setAttribute("aria-labelledby", "guiaRecompensasTitulo");
    dialogo.innerHTML = `
      <div class="recompensas-guia__contenido">
        <header class="recompensas-guia__cabecera">
          <div>
            <span class="recompensas-guia__eyebrow">🌈 Cómo hago crecer mi camino</span>
            <h2 id="guiaRecompensasTitulo">¿Qué cosas celebra la Academia?</h2>
            <p>
              No tienes que hacerlo perfecto. La Academia se fija en muchas formas de aprender,
              seguir adelante y crecer. Algunas las observa Lía y otras las reconoce tu familia.
            </p>
          </div>
          <button type="button" class="recompensas-guia__cerrar" data-cerrar-guia-recompensas aria-label="Cerrar">×</button>
        </header>

        <div class="recompensas-guia__progreso" data-guia-constancia></div>

        <div class="recompensas-guia__lista">
          <article class="recompensas-guia__item recompensas-guia__item--destacado">
            <span aria-hidden="true">🔥</span>
            <div>
              <strong>Ser constante</strong>
              <p>Cuando completas al menos una Misión real durante 7 días seguidos, Lía celebra esa semana contigo.</p>
            </div>
          </article>

          <article class="recompensas-guia__item">
            <span aria-hidden="true">✨</span>
            <div>
              <strong>Seguir intentando</strong>
              <p>Si un caso de Detectives no sale al principio y sigues probando hasta resolverlo, Lía puede reconocerlo.</p>
            </div>
          </article>

          <article class="recompensas-guia__item">
            <span aria-hidden="true">🤝</span>
            <div>
              <strong>Usar ayuda y continuar</strong>
              <p>Una pista no es perder. Pedir ayuda y después seguir pensando también forma parte de aprender.</p>
            </div>
          </article>

          <article class="recompensas-guia__item">
            <span aria-hidden="true">💛</span>
            <div>
              <strong>Un momento que mi familia quiere recordar</strong>
              <p>Tu familia puede guardar un reconocimiento cuando ve algo importante en una Misión que completaste.</p>
            </div>
          </article>

          <article class="recompensas-guia__item">
            <span aria-hidden="true">🦜</span>
            <div>
              <strong>Vivir algo realmente especial</strong>
              <p>Algunos momentos importantes pueden convertirse en una Guacamaya. No hay una lista de puntos: llegan cuando un hito merece ser recordado.</p>
            </div>
          </article>
        </div>

        <p class="recompensas-guia__nota">
          🌱 Poco a poco aparecerán nuevas maneras de ver cómo creces y cómo te superas a ti misma.
        </p>
      </div>
    `;
    document.body.appendChild(dialogo);

    dialogo.querySelector("[data-cerrar-guia-recompensas]")?.addEventListener("click", () => {
      dialogo.close?.();
    });
    dialogo.addEventListener("click", evento => {
      if (evento.target === dialogo) dialogo.close?.();
    });
  }

  if (!acceso.dataset.guiaInstalada) {
    acceso.dataset.guiaInstalada = "true";
    acceso.addEventListener("click", () => {
      actualizarGuiaMotivacional();
      if (typeof dialogo.showModal === "function") {
        dialogo.showModal();
      } else {
        dialogo.setAttribute("open", "");
      }
    });
  }

  return dialogo;
}

function reconocimientoVisible(item = {}) {
  return item.estado === "activo" && item.visibleAlumno !== false;
}

function origenVisible(item = {}) {
  if (item.tipo === "record_personal") return "🏅 Nueva mejor marca";
  if (item.tipo === "guacamaya") return `🦜 ${texto(item.guacamayaNombre) || "Un hito especial"}`;
  if (item.origen === "humano") return "💛 Mi familia reconoce";
  return "✨ Lía observó";
}

function iconoVisible(item = {}) {
  if (item.tipo === "record_personal") return "🏅";
  if (item.tipo === "guacamaya") return "🦜";
  return item.origen === "humano" ? "💛" : "✨";
}

function metaFuente(item = {}) {
  if (item.fuenteEliminada === true) {
    return texto(item.fuenteSnapshot?.titulo) || texto(item.titulo) || "Momento de mi camino";
  }
  return texto(item.titulo) || "Momento de mi camino";
}

function idVirtualRegla(reglaId, historiaId, sesionId) {
  return ["auto", reglaId, historiaId, sesionId]
    .join("__")
    .replace(/[^a-zA-Z0-9._-]/g, "_");
}

function reglaLiaParaSesion(sesion = {}) {
  const pistas = Number(sesion.pistasUtilizadas || 0);
  const intentosAdicionales = Number(sesion.intentosAdicionales || 0);

  /* Ayuda y continuación tiene prioridad para evitar dos celebraciones
     automáticas sobre una misma resolución. */
  if (pistas >= 1) return REGLAS_LIA_DETECTIVES.ayuda_y_continuo;
  if (intentosAdicionales >= 2) return REGLAS_LIA_DETECTIVES.persistencia;
  return null;
}

function reconocimientoLiaDesdeSesion(historiaId, sesion, regla) {
  const sesionId = texto(sesion.id);
  const misionId = texto(sesion.misionId);
  const fecha = sesion.completadaEn;

  return {
    id: idVirtualRegla(regla.id, historiaId, sesionId),
    schemaVersion: 1,
    tipo: "reconocimiento",
    categoria: "perseverancia",
    titulo: texto(sesion.tituloHistoria) || "Caso de Detectives",
    mensaje: regla.mensaje,
    origen: "observado",
    reglaId: regla.id,
    fuentePrincipal: {
      tipo: "sesion_detectives",
      id: sesionId,
      modulo: "detectives",
      misionId,
      actividadId: historiaId,
      sesionId
    },
    datosSoporte: {
      pistasUtilizadas: Number(sesion.pistasUtilizadas || 0),
      intentosAdicionales: Number(sesion.intentosAdicionales || 0),
      intentosMinimos: Number(sesion.intentosMinimos || 0),
      intentosTotales: Number(sesion.intentosTotales || 0)
    },
    fuenteEliminada: false,
    estado: "activo",
    visibleAlumno: true,
    fechaHecho: fecha,
    fechaReconocimiento: fecha,
    virtual: true
  };
}

async function cargarReconocimientosLiaDetectives() {
  const userId = texto(await ContextoUsuario.obtenerUserIdPersonaActiva());
  if (!userId) return [];

  const historias = await obtenerHistorialDetectives(userId);
  const grupos = await Promise.all(
    historias.map(async item => {
      const historiaId = texto(item.historiaId || item.id);
      if (!historiaId) return [];

      try {
        const sesiones = await obtenerSesionesHistoria(userId, historiaId);
        return sesiones.map(sesion => ({ historiaId, sesion }));
      } catch (error) {
        console.debug(
          `[Recompensas B] No se pudieron leer sesiones de Detectives para ${historiaId}.`,
          error
        );
        return [];
      }
    })
  );

  const sesiones = grupos
    .flat()
    .filter(({ sesion }) =>
      sesion?.recompensasEligibleV1 === true &&
      sesion?.esDatoPrueba !== true &&
      fechaMs(sesion?.completadaEn) > 0
    )
    .sort(
      (a, b) =>
        fechaMs(a.sesion.completadaEn) - fechaMs(b.sesion.completadaEn)
    );

  const ultimaPorRegla = new Map();
  const cantidadPorDia = new Map();
  const resultado = [];

  sesiones.forEach(({ historiaId, sesion }) => {
    const regla = reglaLiaParaSesion(sesion);
    if (!regla) return;

    const momento = fechaMs(sesion.completadaEn);
    const ultima = Number(ultimaPorRegla.get(regla.id) || 0);
    if (
      ultima &&
      momento - ultima < DIAS_DESCANSO_REGLA_LIA * MILISEGUNDOS_DIA
    ) {
      return;
    }

    const dia = claveDia(sesion.completadaEn);
    const cantidad = Number(cantidadPorDia.get(dia) || 0);
    if (cantidad >= MAX_RECONOCIMIENTOS_LIA_DIA) return;

    resultado.push(reconocimientoLiaDesdeSesion(historiaId, sesion, regla));
    ultimaPorRegla.set(regla.id, momento);
    cantidadPorDia.set(dia, cantidad + 1);
  });

  return resultado.sort(
    (a, b) => fechaMs(b.fechaReconocimiento) - fechaMs(a.fechaReconocimiento)
  );
}

function tareaFuenteActual(misionId = "") {
  const id = texto(misionId);
  if (!id) return null;
  return tareasConstancia.find(item => texto(item?.id) === id) || null;
}

function reconocimientoAutomaticoVigente(item = {}) {
  if (item.virtual !== true || item.origen !== "observado") return true;

  const misionId = texto(item.fuentePrincipal?.misionId);
  if (!misionId) return true;

  /* Una sesión ligada a Misión solo puede producir reconocimiento mientras
     esa Misión siga existiendo y siga siendo un dato real. Esto permite usar
     una Misión controlada para validar B1, marcarla después como 🧪 y retirar
     inmediatamente el efecto motivacional antes incluso de eliminarla. */
  if (!tareasConstanciaCargadas) return false;

  const tarea = tareaFuenteActual(misionId);
  return Boolean(tarea) && tarea.esDatoPrueba !== true;
}

function combinarReconocimientos() {
  const porId = new Map();
  [
    ...reconocimientosPersistentes,
    ...reconocimientosLiaDetectives,
    ...reconocimientosLiaConstancia
  ]
    .filter(reconocimientoAutomaticoVigente)
    .forEach(item => {
      const id = texto(item?.id);
      if (id) porId.set(id, item);
    });

  return [...porId.values()].sort(
    (a, b) =>
      fechaMs(b.fechaReconocimiento || b.updatedAt || b.createdAt) -
      fechaMs(a.fechaReconocimiento || a.updatedAt || a.createdAt)
  );
}

function urlFuente(item, fuente) {
  if (!puedeAbrirFuentesGestion || item.fuenteEliminada === true) return "";
  const misionId = texto(item.fuentePrincipal?.misionId);
  if (!misionId) return "";

  const volver = `${window.location.pathname}${window.location.search}`;
  const parametros = new URLSearchParams({
    misionId,
    fuente,
    desde: "reconocimiento",
    volver
  });

  return `../mis-tareas/?${parametros.toString()}`;
}

function accionesFuente(item = {}) {
  const verMision = urlFuente(item, "detalle");
  const verTrabajo = urlFuente(item, "trabajo");
  if (!verMision && !verTrabajo) return "";

  return `
    <div class="recompensas-a1__fuentes">
      ${verMision ? `<a href="${escapar(verMision)}">👁️ Ver misión</a>` : ""}
      ${verTrabajo ? `<a href="${escapar(verTrabajo)}">📖 Ver trabajo realizado</a>` : ""}
    </div>
  `;
}

function renderItemHistoria(item) {
  return `
    <article class="recompensas-a1__item">
      <span class="recompensas-a1__item-icono" aria-hidden="true">${iconoVisible(item)}</span>
      <div>
        <strong>${escapar(metaFuente(item))}</strong>
        <p>${escapar(item.mensaje || "")}</p>
        <small>${escapar(origenVisible(item))} · ${escapar(formatearFechaReconocimiento(item))}</small>
        ${accionesFuente(item)}
      </div>
    </article>
  `;
}

function renderGuacamayas(items = []) {
  const guacamayas = items.filter(item => item.tipo === "guacamaya");

  if (!guacamayas.length) {
    return `
      <section class="recompensas-a2__guacamayas recompensas-a2__guacamayas--vacio">
        <div>
          <span class="recompensas-a2__titulo">🦜 Mis Guacamayas</span>
          <p>Las Guacamayas aparecen en momentos especiales de tu camino. No tienes que buscarlas: llegan cuando algo importante merece ser recordado.</p>
        </div>
      </section>
    `;
  }

  return `
    <section class="recompensas-a2__guacamayas">
      <div class="recompensas-a2__guacamayas-cabecera">
        <span class="recompensas-a2__titulo">🦜 Mis Guacamayas</span>
        <small>Hitos especiales que ya forman parte de tu historia.</small>
      </div>
      <div class="recompensas-a2__guacamayas-lista">
        ${guacamayas.map(item => `
          <article class="recompensas-a2__guacamaya">
            <span class="recompensas-a2__guacamaya-icono" aria-hidden="true">🦜</span>
            <div>
              <strong>${escapar(texto(item.guacamayaNombre) || "Guacamaya")}</strong>
              <p>${escapar(item.mensaje || item.guacamayaDescripcion || "")}</p>
              <small>📅 ${escapar(formatearFechaHora(item.fechaGuacamaya || item.fechaReconocimiento))}</small>
              ${accionesFuente(item)}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function render(items = [], { reiniciarPaginacion = false } = {}) {
  const host = asegurarHost();
  if (!host) return;

  const historiaAbierta = Boolean(
    host.querySelector(".recompensas-a1__historia")?.open
  );

  reconocimientosActuales = items.filter(reconocimientoVisible);
  if (reiniciarPaginacion) cantidadHistoriaVisible = PASO_HISTORIA;

  const ultimo = reconocimientosActuales[0] || null;

  if (!ultimo) {
    host.innerHTML = `
      <div class="recompensas-a1__vacio">
        💛 Mi Camino también guardará momentos que Lía o mi familia quieran reconocer.
        No tienes que conseguir premios: aquí iremos recordando lo importante que vas construyendo.
      </div>
      ${renderGuacamayas([])}
    `;
    return;
  }

  const visiblesHistoria = reconocimientosActuales.slice(0, cantidadHistoriaVisible);
  const restantes = Math.max(0, reconocimientosActuales.length - visiblesHistoria.length);
  const siguientePaso = Math.min(PASO_HISTORIA, restantes);
  const historia = visiblesHistoria.map(renderItemHistoria).join("");

  host.innerHTML = `
    <article class="recompensas-a1__ultimo">
      <div class="recompensas-a1__icono" aria-hidden="true">${iconoVisible(ultimo)}</div>
      <div>
        <span class="recompensas-a1__eyebrow">${escapar(origenVisible(ultimo))}</span>
        <h3>${escapar(metaFuente(ultimo))}</h3>
        <p class="recompensas-a1__mensaje">${escapar(ultimo.mensaje || "")}</p>
        <div class="recompensas-a1__meta">
          <span>📅 ${escapar(formatearFechaReconocimiento(ultimo))}</span>
          ${ultimo.fuenteEliminada ? "<span>🌈 Conservado en mi historia</span>" : ""}
        </div>
        ${accionesFuente(ultimo)}
      </div>
    </article>

    ${renderGuacamayas(reconocimientosActuales)}

    <details class="recompensas-a1__historia" ${historiaAbierta ? "open" : ""}>
      <summary>🌈 Ver mi historia de crecimiento</summary>
      <div class="recompensas-a1__lista">
        ${historia}
        ${restantes > 0 ? `
          <div class="recompensas-a1__mas">
            <button type="button" data-ver-mas-historia>
              Ver ${siguientePaso} más ↓
            </button>
          </div>
        ` : ""}
      </div>
    </details>
  `;

  host.querySelector("[data-ver-mas-historia]")?.addEventListener("click", () => {
    cantidadHistoriaVisible += PASO_HISTORIA;
    render(reconocimientosActuales);
  });
}

function renderCombinado({ reiniciarPaginacion = false } = {}) {
  render(combinarReconocimientos(), { reiniciarPaginacion });
}

function valorFechaConstanciaTarea(tarea = {}) {
  const resultado =
    tarea.resultado && typeof tarea.resultado === "object"
      ? tarea.resultado
      : {};
  const progreso =
    tarea.progreso && typeof tarea.progreso === "object"
      ? tarea.progreso
      : {};
  const tieneEvidencias =
    Array.isArray(progreso.evidenciaIds) && progreso.evidenciaIds.length > 0;

  /* En Misiones respaldadas por evidencias, completadaEn representa el momento
     real en que Gloria alcanzó el objetivo. Una aprobación familiar posterior
     no debe mover ese día en Mi constancia. En Misiones manuales se conserva
     como prioridad la fecha de finalización registrada por la familia. */
  return (
    (tieneEvidencias ? progreso.completadaEn : null) ||
    resultado.fechaFinalizacion ||
    progreso.completadaEn ||
    tarea.fechaFinalizacion ||
    (
      ESTADOS_REVISION_CONSTANCIA.has(tarea.estado)
        ? tarea.statusChangedAt
        : null
    )
  );
}

function fechaConstanciaTarea(tarea = {}) {
  return fechaJs(valorFechaConstanciaTarea(tarea));
}

function tareaCuentaParaConstancia(tarea = {}) {
  return Boolean(
    tarea?.visibleParaAlumno !== false &&
    (
      tarea?.estado === "completada" ||
      ESTADOS_REVISION_CONSTANCIA.has(tarea?.estado)
    ) &&
    tarea?.esDatoPrueba !== true
  );
}

function actividadesConstanciaPorDia() {
  const porDia = new Map();

  tareasConstancia
    .filter(tareaCuentaParaConstancia)
    .forEach(tarea => {
      const valorFecha = valorFechaConstanciaTarea(tarea);
      const fecha = fechaJs(valorFecha);
      const clave = claveDia(fecha);
      if (!clave || !fecha) return;

      const actual = porDia.get(clave);
      if (!actual || fecha.getTime() < actual.fecha.getTime()) {
        porDia.set(clave, {
          clave,
          fecha,
          valorFecha,
          misionId: texto(tarea.id)
        });
      }
    });

  return porDia;
}

function diasConstanciaFiltrados() {
  return new Set(actividadesConstanciaPorDia().keys());
}

function esDiaConsecutivo(anterior, actual) {
  if (!anterior?.fecha || !actual?.fecha) return false;
  const siguiente = new Date(anterior.fecha);
  siguiente.setHours(12, 0, 0, 0);
  siguiente.setDate(siguiente.getDate() + 1);
  return claveDia(siguiente) === actual.clave;
}

function cargarReconocimientosLiaConstancia() {
  const actividades = [...actividadesConstanciaPorDia().values()]
    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
  const resultado = [];
  let racha = [];

  actividades.forEach(actividad => {
    if (!racha.length || esDiaConsecutivo(racha[racha.length - 1], actividad)) {
      racha.push(actividad);
    } else {
      racha = [actividad];
    }

    if (racha.length !== 7) return;

    const hito = racha[6];
    if (hito.fecha.getTime() < FECHA_INICIO_REGLA_CONSTANCIA.getTime()) return;

    resultado.push({
      id: idVirtualRegla(REGLA_LIA_CONSTANCIA.id, "racha", hito.clave),
      schemaVersion: 1,
      tipo: "reconocimiento",
      categoria: "constancia",
      titulo: REGLA_LIA_CONSTANCIA.titulo,
      mensaje: REGLA_LIA_CONSTANCIA.mensaje,
      origen: "observado",
      reglaId: REGLA_LIA_CONSTANCIA.id,
      fuentePrincipal: {
        tipo: "constancia",
        id: hito.clave,
        modulo: "mi-camino"
      },
      datosSoporte: {
        rachaDias: 7,
        desde: racha[0].clave,
        hasta: hito.clave
      },
      fuenteEliminada: false,
      estado: "activo",
      visibleAlumno: true,
      fechaHecho: hito.valorFecha,
      fechaReconocimiento: hito.valorFecha,
      virtual: true
    });
  });

  return resultado.sort(
    (a, b) => fechaMs(b.fechaReconocimiento) - fechaMs(a.fechaReconocimiento)
  );
}

function inicioSemana(fecha = new Date()) {
  const base = new Date(fecha);
  base.setHours(0, 0, 0, 0);
  const dia = base.getDay();
  base.setDate(base.getDate() + (dia === 0 ? -6 : 1 - dia));
  return base;
}

function calcularRachaConstancia(dias) {
  if (!dias.size) return 0;

  const fecha = new Date();
  fecha.setHours(0, 0, 0, 0);

  if (!dias.has(claveDia(fecha))) {
    fecha.setDate(fecha.getDate() - 1);
  }

  let racha = 0;
  while (dias.has(claveDia(fecha))) {
    racha += 1;
    fecha.setDate(fecha.getDate() - 1);
  }
  return racha;
}

function actualizarGuiaMotivacional() {
  const dialogo = asegurarGuiaMotivacional();
  const progreso = dialogo?.querySelector("[data-guia-constancia]");
  if (!progreso) return;

  const racha = calcularRachaConstancia(diasConstanciaFiltrados());
  if (racha >= 7) {
    progreso.innerHTML = `
      <span aria-hidden="true">🔥</span>
      <div><strong>¡Ya llegaste a 7 días seguidos!</strong><small>Ese momento puede formar parte de tu historia de crecimiento.</small></div>
    `;
    return;
  }

  const faltan = 7 - racha;
  progreso.innerHTML = `
    <span aria-hidden="true">🔥</span>
    <div>
      <strong>${racha ? `Llevas ${racha} ${racha === 1 ? "día" : "días"} seguidos` : "Tu próxima semana empieza con un solo día"}</strong>
      <small>${racha ? `Te faltan ${faltan} ${faltan === 1 ? "día" : "días"} para llegar a 7.` : "Cuando hagas una Misión real, ese día empezará a contar."}</small>
    </div>
  `;
}

function aplicarConstanciaFiltrada() {
  const semana = document.getElementById("semanaConstancia");
  const diasVisuales = [...(semana?.querySelectorAll(".dia") || [])];
  if (!semana || diasVisuales.length !== 7) return;

  const dias = diasConstanciaFiltrados();
  const ahora = new Date();
  ahora.setHours(0, 0, 0, 0);
  const inicio = inicioSemana(ahora);
  let diasSemana = 0;

  diasVisuales.forEach((elemento, indice) => {
    const fecha = new Date(inicio);
    fecha.setDate(inicio.getDate() + indice);
    fecha.setHours(0, 0, 0, 0);

    const hecho = dias.has(claveDia(fecha));
    const esHoy = claveDia(fecha) === claveDia(ahora);
    const esFuturo = fecha.getTime() > ahora.getTime();

    elemento.classList.toggle("hecho", hecho);
    elemento.classList.toggle("hoy", esHoy);
    elemento.classList.toggle("futuro", esFuturo);

    const marca = elemento.querySelector(".dia__marca");
    if (marca) marca.textContent = hecho ? "⭐" : esFuturo ? "·" : "○";

    if (hecho && !esFuturo) diasSemana += 1;
  });

  const diasSemanaElemento = document.getElementById("diasSemana");
  const rachaElemento = document.getElementById("rachaDias");
  if (diasSemanaElemento) diasSemanaElemento.textContent = String(diasSemana);
  if (rachaElemento) rachaElemento.textContent = String(calcularRachaConstancia(dias));
  actualizarGuiaMotivacional();
}

function instalarConstanciaSinDatosPrueba() {
  const semana = document.getElementById("semanaConstancia");
  if (semana && !observadorDomConstancia) {
    observadorDomConstancia = new MutationObserver(() => {
      requestAnimationFrame(aplicarConstanciaFiltrada);
    });
    observadorDomConstancia.observe(semana, { childList: true });
  }

  detenerObservacionConstancia = Academia.tareas.observar(
    tareas => {
      tareasConstancia = Array.isArray(tareas) ? tareas : [];
      tareasConstanciaCargadas = true;
      reconocimientosLiaConstancia = cargarReconocimientosLiaConstancia();
      requestAnimationFrame(() => {
        aplicarConstanciaFiltrada();
        renderCombinado();
      });
    },
    error => {
      console.debug("No se pudo aplicar el filtro de datos de prueba a Mi constancia.", error);
    }
  );
}

export async function instalarReconocimientosCamino() {
  if (instalada) return;
  instalada = true;
  cargarEstilos();
  asegurarHost();
  asegurarGuiaMotivacional();

  try {
    puedeAbrirFuentesGestion = await ContextoUsuario.puedeGestionar();
  } catch (error) {
    puedeAbrirFuentesGestion = false;
    console.debug("No se pudo resolver permiso para abrir fuentes de Recompensas.", error);
  }

  instalarConstanciaSinDatosPrueba();

  try {
    reconocimientosLiaDetectives = await cargarReconocimientosLiaDetectives();
  } catch (error) {
    reconocimientosLiaDetectives = [];
    console.debug(
      "No se pudieron derivar los Reconocimientos de Lía desde Detectives.",
      error
    );
  }

  /* Los automáticos de Fase B son derivados: no se escriben desde la cuenta
     del alumno. Así la historia visible depende siempre de la actividad real
     que la sustenta y desaparece si esa fuente deja de formar parte del camino. */
  renderCombinado({ reiniciarPaginacion: true });

  detenerObservacion = Reconocimientos.observar(
    items => {
      reconocimientosPersistentes = items;
      renderCombinado({ reiniciarPaginacion: true });
    },
    error => {
      console.debug("No se pudieron cargar los reconocimientos persistentes de Mi Camino.", error);
      reconocimientosPersistentes = [];
      renderCombinado({ reiniciarPaginacion: true });
    }
  );

  window.addEventListener("beforeunload", () => {
    detenerObservacion?.();
    detenerObservacionConstancia?.();
    observadorDomConstancia?.disconnect();
  }, { once: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", instalarReconocimientosCamino, { once: true });
} else {
  instalarReconocimientosCamino();
}
