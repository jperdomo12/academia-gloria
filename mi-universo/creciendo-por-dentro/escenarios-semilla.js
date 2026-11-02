/* Contenido editorial efectivo. No guarda estado ni cambia el catálogo.
 * Un único resolver para Motor, jardín y revisión de Trabajo realizado. */
export const tieneEscenarios = semilla => Array.isArray(semilla?.escenarios) && semilla.escenarios.length > 0;

export function resolverEscenario(semilla, escenarioId) {
  if (!semilla || !tieneEscenarios(semilla)) return semilla || null;
  const escenario = semilla.escenarios.find(item => item.id === escenarioId);
  if (!escenario) return null;
  return {
    ...semilla,
    escenarioId: escenario.id,
    escenarioTitulo: escenario.titulo,
    tipoSituacion: escenario.tipoSituacion ?? semilla.tipoSituacion,
    situacion: escenario.situacion ?? semilla.situacion,
    pasos: escenario.pasos ?? semilla.pasos,
    recursos: escenario.recursos === null ? {} : { ...semilla.recursos, ...escenario.recursos }
  };
}

export function resolverSemillaSesion(semilla, sesion = {}) {
  if (!semilla || !tieneEscenarios(semilla)) return semilla || null;
  const id = String(sesion.escenarioId || semilla.escenarioPredeterminadoId || '').trim();
  const efectiva = resolverEscenario(semilla, id);
  // Un ID explícito desconocido nunca se interpreta como el escenario por defecto.
  return efectiva || {
    ...semilla, pasos: [], situacion: null, escenarioId: id,
    escenarioTitulo: String(sesion.escenarioTitulo || 'Situación no disponible'), escenarioNoDisponible: true
  };
}
