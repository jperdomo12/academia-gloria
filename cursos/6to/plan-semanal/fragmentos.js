import { segmentarLinea } from "./trios.js";

/* Presentador de lectura por fragmentos. Estado solo en memoria; sin evaluación ni guardado.
 * Recibe texto escolar: destaca tríos «base (pasado, participio)» sin normalizarlos. */
export function mostrarFragmentos(contenedor, fragmentos) {
  if (!contenedor || !fragmentos?.length) return;
  const crear = (tipo, clase, texto) => {
    const e = document.createElement(tipo);
    if (clase) e.className = clase;
    if (texto) e.textContent = texto;
    return e;
  };
  let indice = 0;
  let ocultas = false;
  const label = crear('label', 'rap-selector-label', 'Elige un fragmento');
  const selector = crear('select', 'rap-selector');
  selector.id = 'fragmentoActual';
  label.htmlFor = selector.id;
  fragmentos.forEach((f, i) => {
    const op = crear('option', '', `${i + 1} · ${f.titulo}`);
    op.value = String(i); selector.append(op);
  });
  const mandos = crear('div', 'rap-mandos');
  const anterior = crear('button', 'boton-academia', '← Anterior');
  const siguiente = crear('button', 'boton-academia', 'Siguiente →');
  const ocultar = crear('button', 'boton-academia rap-ocultar');
  [anterior, siguiente, ocultar].forEach(b => b.type = 'button');
  ocultar.setAttribute('aria-controls', 'letraFragmento');
  const estado = crear('p', 'rap-posicion'); estado.setAttribute('role', 'status');
  const progreso = crear('progress', 'rap-progreso');
  progreso.max = fragmentos.length; progreso.setAttribute('aria-label', 'Posición del fragmento');
  const letra = crear('div', 'rap-letra'); letra.id = 'letraFragmento'; letra.lang = 'en';
  const ayuda = crear('p', 'plan-procedencia');
  const actualizarFormas = () => {
    letra.querySelectorAll('[data-forma]').forEach(e => {
      e.textContent = ocultas ? '···' : e.dataset.forma;
      if (ocultas) e.setAttribute('aria-label', 'forma oculta'); else e.removeAttribute('aria-label');
    });
    ocultar.textContent = ocultas ? 'Mostrar pasado y participio' : 'Ocultar pasado y participio';
    ocultar.setAttribute('aria-pressed', String(ocultas));
    ayuda.textContent = ocultas ? 'Di las formas que faltan. Después muéstralas para comparar.' : 'Las tres formas están visibles. Puedes ocultar dos para recordarlas.';
  };
  const render = () => {
    selector.value = String(indice);
    estado.textContent = `Fragmento ${indice + 1} de ${fragmentos.length}`;
    progreso.value = indice + 1; anterior.disabled = indice === 0; siguiente.disabled = indice === fragmentos.length - 1;
    letra.replaceChildren();
    fragmentos[indice].lineas.forEach(texto => {
      const linea = crear('p', 'rap-linea');
      for (const parte of segmentarLinea(texto)) {
        if (parte.texto !== undefined) { linea.append(document.createTextNode(parte.texto)); continue; }
        const trio = crear('span', 'rap-trio');
        parte.formas.forEach((valor, i) => {
          if (i > 0) { const flecha = crear('span', 'rap-arrow', '→'); flecha.setAttribute('aria-hidden', 'true'); trio.append(document.createTextNode(" "), flecha, document.createTextNode(" ")); }
          const forma = crear('span', `rap-forma rap-forma--${i + 1}`, valor);
          if (i > 0) forma.dataset.forma = valor;
          trio.append(forma);
        });
        linea.append(trio);
      }
      letra.append(linea);
    });
    actualizarFormas();
  };
  selector.addEventListener('change', () => { indice = Number(selector.value); render(); });
  anterior.addEventListener('click', () => { if (indice > 0) { indice--; render(); } });
  siguiente.addEventListener('click', () => { if (indice < fragmentos.length - 1) { indice++; render(); } });
  ocultar.addEventListener('click', () => { ocultas = !ocultas; actualizarFormas(); });
  mandos.append(anterior, siguiente);
  contenedor.replaceChildren(label, selector, estado, progreso, mandos, ocultar, ayuda, letra);
  render();
}
