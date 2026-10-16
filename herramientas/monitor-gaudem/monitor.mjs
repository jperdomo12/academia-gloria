// Fuente compartida de los dos marcadores autónomos. No se carga desde Gaudem.
// El manual es propietario del procedimiento; sus URLs se generan con --manual.
export async function ejecutarMonitor(aceptar = false) {
  const version = '1.7-rc1';
  const titulo = aceptar ? '✅ Aceptar cambios Gaudem' : `🔎 Revisar Gaudem 6.º · ${version}`;
  const K = 'gaudem6_detalle_v2', KR = 'gaudem6_recursos_v3';
  const normalizar = s => (s || '').replace(/\s+/g, ' ').trim();
  const path = s => decodeURIComponent(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const tracked = p => p.includes('/gaudem.es/sexto/areas/') || p.includes('/gaudem.es/sexto/zonas/') || p.includes('/gaudem.es/sexto/english-zones');
  const kind = p => p.includes('/gaudem.es/sexto/zonas/') || p.includes('/gaudem.es/sexto/english-zones') ? 'ZONA' : 'ÁREA';
  const textosSelector = 'h1,h2,h3,h4,h5,h6,p,li,a,[role="heading"]';
  const recursosSelector = 'a[href],iframe[src],embed[src],object[data]';
  const navSelector = 'nav,[role="navigation"]';
  const unicos = a => [...new Set(a)].sort();
  const urlElemento = x => x.getAttribute('href') || x.getAttribute('src') || x.getAttribute('data');
  const canon = (v, b, tag) => {
    try {
      const u = new URL(v, b); u.hash = '';
      if (/^(IFRAME|EMBED|OBJECT)$/.test(tag)) u.search = '';
      else {
        ['authuser', 'usp', 'pli', 'embed_config', 'embedded', 'rm'].forEach(k => u.searchParams.delete(k));
        const p = [...u.searchParams.entries()].sort((a, b) => a[0].localeCompare(b[0]));
        u.search = ''; p.forEach(([k, v]) => u.searchParams.append(k, v));
      }
      return u.href;
    } catch { return ''; }
  };
  const canonDoc = (v, b) => {
    try {
      const u = new URL(v, b); u.hash = '';
      ['authuser', 'usp', 'pli', 'embed_config', 'embedded', 'rm', 'resourcekey', 'ouid', 'rtpof', 'sd', 'widget', 'headers', 'chrome'].forEach(k => u.searchParams.delete(k));
      const p = [...u.searchParams.entries()].sort((a, b) => a[0].localeCompare(b[0]));
      u.search = ''; p.forEach(([k, v]) => u.searchParams.append(k, v));
      return u.href;
    } catch { return ''; }
  };
  const esDoc = v => {
    try {
      const u = new URL(v);
      return /(^|\.)(drive|docs)\.google\.com$/i.test(u.hostname) || /\.(pdf|docx?|pptx?|xlsx?)$/i.test(u.pathname);
    } catch { return false; }
  };
  // Señal documental v1.5 conservada, incluido el HTML serializado y sus parámetros.
  const documentos = (h, d, b) => {
    const a = [...d.querySelectorAll(recursosSelector)].map(urlElemento);
    const s = String(h || '').replace(/\\+u002f/gi, '/').replace(/\\+u003a/gi, ':').replace(/\\+u003d/gi, '=').replace(/\\+u0026/gi, '&').replace(/\\+\//g, '/').replace(/&amp;/gi, '&');
    const r = (s.match(/https?:\/\/[^\s"'<>]+/g) || []).map(v => v.replace(/[),;\]}]+$/g, ''));
    return unicos(a.concat(r).map(v => canonDoc(v, b)).filter(v => v && esDoc(v)));
  };
  const extraer = (d, b) => ({
    t: unicos([...d.querySelectorAll(textosSelector)].map(x => normalizar(x.textContent)).filter(x => x.length >= 3 && x.length <= 300)),
    q: unicos([...d.querySelectorAll(recursosSelector)].map(x => canon(urlElemento(x), b, x.tagName)).filter(x => x && !x.startsWith(location.origin + '/gaudem.es/sexto/')))
  });
  const diferencia = (antes, ahora) => {
    const anterior = Array.isArray(antes) ? antes : [];
    return { agregados: ahora.filter(v => !anterior.includes(v)), retirados: anterior.filter(v => !ahora.includes(v)) };
  };
  try {
    if (!location.href.startsWith('https://sites.google.com/gaudem.es/sexto/')) {
      alert(titulo + '\n\n⚠️ No estás dentro del Site de 6.º de Gaudem.\n\nAbre https://sites.google.com/gaudem.es/sexto/inicio');
      return;
    }
    const oldRaw = localStorage.getItem(K), oldRRaw = localStorage.getItem(KR);
    const old = oldRaw ? JSON.parse(oldRaw) : null, oldR = oldRRaw ? JSON.parse(oldRRaw) : null;
    if (!aceptar && !old?.m) {
      alert(titulo + '\n\n⚠️ No encuentro la línea base histórica en este navegador/perfil.\n\nNo se ha realizado ninguna comparación.');
      return;
    }
    if (aceptar && !confirm('¿Aceptar el estado ACTUAL de Gaudem como nueva línea base?\n\nEsto actualizará ambas líneas base. Hazlo solo después de revisar las novedades y validar el monitor.')) return;
    // Descubrir antes de excluir navegación: las páginas nuevas siguen apareciendo.
    const ms = [...new Map([...document.querySelectorAll('a[href]')].map(a => {
      try {
        const u = new URL(a.href), p = path(u.pathname);
        if (u.origin === location.origin && tracked(p)) return [u.href, { u: u.href, n: normalizar(a.innerText) || decodeURIComponent(u.pathname.split('/').pop()), k: kind(p) }];
      } catch {}
    }).filter(Boolean)).values()];
    if (!ms.length) {
      alert(titulo + '\n\n⚠️ No puedo localizar áreas o zonas académicas. Comprueba Inicio y la sesión de Gaudem.');
      return;
    }
    const nombresCambiados = [];
    for (const m of ms) if (!old?.m?.[m.u] || old.m[m.u].n !== m.n) {
      nombresCambiados.push(m.n, old?.m?.[m.u]?.n || '');
    }
    for (const [u, m] of Object.entries(old?.m || {})) if (!ms.some(x => x.u === u)) nombresCambiados.push(m.n);
    const etiquetas = unicos(nombresCambiados.map(normalizar).filter(Boolean)).sort((a, b) => b.length - a.length);
    const sinEtiquetasCambiadas = valor => normalizar(etiquetas.reduce((texto, etiqueta) => texto.split(etiqueta).join(''), valor));
    const snap = { f: new Date().toLocaleString(), m: {} }, rsnap = { f: new Date().toLocaleString(), m: {} };
    const navegacion = new Map(), sinNavegacion = [];
    for (const m of ms) {
      const r = await fetch(m.u, { credentials: 'include', redirect: 'follow' });
      if (!r.ok) throw new Error('lectura incompleta');
      const fu = new URL(r.url || m.u);
      if (fu.hostname !== 'sites.google.com' || !path(fu.pathname).includes('/gaudem.es/sexto/')) throw new Error('sesión o destino no válido');
      const h = await r.text(), d = new DOMParser().parseFromString(h, 'text/html');
      const rq = documentos(h, d, m.u);
      d.querySelectorAll('script,style,noscript,template,svg').forEach(x => x.remove());
      const historico = extraer(d, m.u), nav = document.createElement('div'), anterior = document.createElement('div');
      const roots = [...d.querySelectorAll(navSelector)].filter(x => !x.parentElement?.closest(navSelector));
      if (!roots.length) sinNavegacion.push(m.n);
      for (const root of roots) {
        nav.append(root.cloneNode(true));
        const copia = root.cloneNode(true);
        // Proyección de la navegación anterior para bases v1.6 sin procedencia.
        // Solo se retiran enlaces de espacios nuevos; nunca texto del contenido.
        if (old?.m) for (const a of copia.querySelectorAll('a[href]')) {
          try {
            const u = new URL(a.getAttribute('href'), m.u);
            if (u.origin === location.origin && tracked(path(u.pathname))) {
              const previo = old.m[u.href];
              if (!previo) a.remove();
              else if (previo.n) a.textContent = previo.n;
            }
          } catch {}
        }
        anterior.append(copia);
        root.remove();
      }
      const actualNav = extraer(nav, m.u), anteriorNav = extraer(anterior, m.u);
      navegacion.set(m.u, { t: unicos(actualNav.t.concat(anteriorNav.t)), q: unicos(actualNav.q.concat(anteriorNav.q)) });
      // t/q conservan compatibilidad; c preserva procedencia al aceptar, en la misma clave.
      snap.m[m.u] = { n: m.n, k: m.k, ...historico, c: extraer(d, m.u) };
      rsnap.m[m.u] = { n: m.n, k: m.k, q: rq };
    }
    // Si Sites dejó de identificar su navegación, no aceptar una captura ambigua.
    if (aceptar && sinNavegacion.length) throw new Error('no se pudo aislar la navegación');
    if (aceptar) {
      try {
        localStorage.setItem(K, JSON.stringify(snap));
        localStorage.setItem(KR, JSON.stringify(rsnap));
      } catch (error) {
        for (const [key, raw] of [[K, oldRaw], [KR, oldRRaw]]) {
          if (raw === null) localStorage.removeItem(key); else localStorage.setItem(key, raw);
        }
        throw error;
      }
      const T = Object.values(snap.m).reduce((a, x) => a + x.t.length, 0);
      const Q = Object.values(snap.m).reduce((a, x) => a + x.q.length, 0);
      const R = Object.values(rsnap.m).reduce((a, x) => a + x.q.length, 0);
      alert('✅ Nueva línea base aceptada · ' + version + '\n\nEspacios: ' + ms.length + '\nFragmentos de texto: ' + T + '\nRecursos históricos: ' + Q + '\nDocumentos monitorizados: ' + R + '\n\nFecha: ' + snap.f);
      return { aceptada: true, espacios: ms.length };
    }
    const out = new Map(), diagnostico = [];
    const flag = (u, x, p = '⚠️') => out.set(u, p + ' ' + (x.k || 'ESPACIO') + ' · ' + x.n);
    for (const [u, x] of Object.entries(snap.m)) {
      const o = old.m[u];
      if (!o) { flag(u, x, '🆕'); continue; }
      const nav = navegacion.get(u);
      // Compatibilidad en memoria: no reescribir ni reinicializar la base heredada.
      const firmasNav = new Set(nav.t.map(sinEtiquetasCambiadas).filter(Boolean));
      const esTextoNav = v => nav.t.includes(v) || etiquetas.includes(v) || (sinEtiquetasCambiadas(v) && firmasNav.has(sinEtiquetasCambiadas(v)));
      const base = o.c || {
        t: (Array.isArray(o.t) ? o.t : []).filter(v => !esTextoNav(v) || x.c.t.includes(v)),
        q: (Array.isArray(o.q) ? o.q : []).filter(v => !nav.q.includes(v) || x.c.q.includes(v))
      };
      const t = diferencia(base.t, x.c.t), q = diferencia(base.q, x.c.q);
      if (t.agregados.length || t.retirados.length || q.agregados.length || q.retirados.length) flag(u, x);
      const ro = oldR?.m?.[u], docs = ro ? diferencia(ro.q, rsnap.m[u].q) : null;
      if (docs && (docs.agregados.length || docs.retirados.length)) flag(u, x);
      diagnostico.push({ espacio: x.n, base: o.c ? 'contenido propio' : 'compatibilidad v1.6', texto: `+${t.agregados.length} -${t.retirados.length}`, recursos: `+${q.agregados.length} -${q.retirados.length}`, docs: docs ? `+${docs.agregados.length} -${docs.retirados.length}` : 'pendiente de inicializar' });
    }
    for (const [u, x] of Object.entries(old.m)) if (!snap.m[u]) out.set(u, '❌ ' + (x.k || 'ESPACIO') + ' · ' + x.n + ' (retirado)');
    const cambios = [...out.values()];
    console.table(diagnostico);
    const aviso = sinNavegacion.length ? '\n\n⚠️ No se identificó navegación en: ' + sinNavegacion.join(', ') + '. No aceptes la línea base; revisa la estructura.' : '';
    alert(titulo + '\n\nEspacios revisados: ' + ms.length + '\nSeguimiento de documentos: ' + (oldRRaw ? 'activo' : 'pendiente de inicializar') + '\n\n' + (cambios.length ? 'Cambios detectados en:\n\n' + cambios.join('\n') : '✅ Sin cambios desde las líneas base disponibles.\n\nLíneas base:\nHistórica: ' + (old.f || 'fecha/hora no disponible') + '\nDocumentos: ' + (oldR ? oldR.f || 'fecha/hora no disponible' : 'pendiente de inicializar')) + aviso + '\n\nRevisión: ' + snap.f);
    return { espacios: ms.length, cambios, diagnostico, sinNavegacion };
  } catch (error) {
    alert(titulo + '\n\n⚠️ No he podido completar la lectura o actualización de Gaudem.\n\nNo se ha aceptado una nueva línea base. Revisa la sesión, la conexión y el almacenamiento.');
    console.warn('[Monitor Gaudem]', error.message);
    return { error: true };
  }
}

export function generarMarcador(aceptar = false) {
  // URL autónoma, una sola línea, sin servidor, eval ni dependencias en el navegador.
  return 'javascript:' + encodeURIComponent(`void (${ejecutarMonitor.toString()})(${aceptar});`);
}

if (typeof process !== 'undefined' && process.argv.includes('--manual')) {
  const { readFileSync, writeFileSync } = await import('node:fs');
  const url = new URL('../../docs/manuales/MANUAL-MONITOR_NOVEDADES_GAUDEM_6TO.md', import.meta.url);
  let index = 0;
  const manual = readFileSync(url, 'utf8').replace(/```javascript\njavascript:[\s\S]*?\n```/g, () => `\`\`\`javascript\n${generarMarcador(index++ === 1)}\n\`\`\``);
  if (index !== 2) throw new Error('Se esperaban exactamente dos marcadores en el manual');
  writeFileSync(url, manual);
}
