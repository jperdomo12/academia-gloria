import { MENU_COMEDOR_SEPTIEMBRE_2026 } from "./2026-09.js";

export const MENUS_COMEDOR = Object.freeze([
  MENU_COMEDOR_SEPTIEMBRE_2026
]);

const DIAS_MENU = Object.freeze(
  Object.assign({}, ...MENUS_COMEDOR.map(menu => menu.dias))
);

export function formatearClaveFecha(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

export function obtenerMenuPorFecha(fecha) {
  return DIAS_MENU[formatearClaveFecha(fecha)] || null;
}

export function obtenerMenuPorClave(clave) {
  return DIAS_MENU[clave] || null;
}

export function obtenerClavesDisponibles() {
  return Object.keys(DIAS_MENU).sort();
}

export function obtenerSiguienteMenuDesde(fecha, { incluirFecha = false } = {}) {
  const claveReferencia = formatearClaveFecha(fecha);
  const clave = obtenerClavesDisponibles().find(item =>
    incluirFecha ? item >= claveReferencia : item > claveReferencia
  );

  if (!clave) return null;

  return {
    clave,
    menu: DIAS_MENU[clave]
  };
}

export function obtenerMenusEntre(inicio, fin) {
  const claveInicio = formatearClaveFecha(inicio);
  const claveFin = formatearClaveFecha(fin);

  return obtenerClavesDisponibles()
    .filter(clave => clave >= claveInicio && clave <= claveFin)
    .map(clave => ({ clave, menu: DIAS_MENU[clave] }));
}

export function obtenerFuenteParaFecha(fecha) {
  const mes = formatearClaveFecha(fecha).slice(0, 7);
  return MENUS_COMEDOR.find(menu => menu.mes === mes)?.fuente || null;
}
