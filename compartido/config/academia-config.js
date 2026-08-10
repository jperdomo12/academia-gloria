/******************************************************************************
 * Academia Gloria Valentina
 * Archivo: compartido/config/academia-config.js
 * Configuración global de la Academia
 * Versión: 1.0
 ******************************************************************************/

export const AcademiaConfig = Object.freeze({
  /**
   * Tiempo máximo global de inactividad de sesión.
   * La implementación efectiva del cierre por inactividad se activará
   * en una fase posterior, una vez integrado ContextoUsuario globalmente.
   */
  sessionTimeoutMinutes: 30
});
