import { crearPartesRap, pistaLineaRap } from "./rap-studio-data.js";
import { segmentarLinea, extraerTrios } from "../trios.js";
import { textoParaEscuchar } from "./rap-apoyos.js?v=4";
import { prepararVozRap } from "./rap-voz.js?v=3";
import { crearBeatRap, TEMPO_ENSAYO } from "./rap-beat.js?v=2";

/* Preparación efímera de una toma externa. La letra y los apoyos siguen perteneciendo
 * a sus fuentes existentes; no se solicitan medios ni se guarda estado. */
export function iniciarRapStudio(host, fragmentos, team) {
  if (!host) return;
  const partes = crearPartesRap(fragmentos),
    trios = extraerTrios(fragmentos);
  const video = document.querySelector('#escucha a[target="_blank"]').href;
  host.innerHTML = `
    <header class="studio-header"><p class="rap-kicker">DEL ENSAYO AL VÍDEO</p><h3 id="studioTitulo" tabindex="-1">🎬 RAP Studio</h3><p>Ensaya tu tramo. Prepara el cambio. Haz una toma de prueba.</p><p class="studio-diferencia">En RAP Team repartís las formas para aprender. Aquí ensayáis las partes reales del vídeo.</p></header>
    <ol class="studio-recorrido" aria-label="Preparar el vídeo"><li><b>1</b> Elige tu parte</li><li><b>2</b> Ensaya y coordina</li><li><b>3</b> Prepara la toma</li></ol>
    <div class="studio-partes" aria-label="Tres partes del RAP"></div>
    <div id="studioEnsayo" hidden>
      <header class="studio-elegida"><div><p class="rap-kicker" id="studioMiParte"></p><h3 id="studioParteTitulo" tabindex="-1"></h3></div><a class="studio-link" id="studioVideo" target="_blank" rel="noopener noreferrer">🎵 Vídeo del cole ↗<span class="rap-sr"> en otra pestaña</span></a></header>
      <p class="studio-nota-video">Se abre el vídeo completo. Busca la frase de inicio de tu parte y ensaya con el ritmo del cole.</p>
      <div class="studio-memoria" role="group" aria-label="Apoyo para memorizar">${[
        ["completo", "👀 Texto completo"],
        ["pistas", "🧩 Con pistas"],
        ["sin", "🙈 Sin letra"],
      ]
        .map(
          ([id, t]) =>
            `<button type="button" data-studio-apoyo="${id}" aria-controls="studioLetra" aria-pressed="false">${t}</button>`,
        )
        .join("")}</div>
      <p id="studioApoyoAyuda" class="studio-ayuda"></p>
      <div class="studio-voz"><p>La voz lee la parte completa, línea a línea; no canta el RAP. Escuchar detiene el beat.</p><div class="studio-controles"><button type="button" id="studioParteAudio" data-studio-parte-audio aria-describedby="studioVozEstado">🔊 Escuchar parte completa</button><button type="button" id="studioVozParar" disabled>■ Detener voz</button></div><p id="studioVozEstado" role="status"></p></div>
      <aside class="studio-beat" aria-labelledby="studioBeatTitulo"><div class="studio-beat-cabecera"><div><h4 id="studioBeatTitulo">🎵 Un pulso para ensayar</h4><p>El beat es para ensayar. El vídeo del cole marca el ritmo final.</p></div><span class="studio-tempo">${TEMPO_ENSAYO} pulsos/min<br>Ensayo · no tempo oficial</span></div>
        <div class="studio-pulsos" aria-label="Cuatro pulsos, con cuenta de entrada">${[1, 2, 3, 4].map((n) => `<span data-studio-pulso="${n}">${n}</span>`).join("")}<b id="studioPulsoTexto" aria-live="off">Parado</b></div>
        <div class="studio-controles"><button type="button" id="studioBeatInicio">▶ Empezar beat</button><button type="button" id="studioBeatParar" disabled>■ Parar</button><label>Volumen del beat<input id="studioVolumen" type="range" min="0" max="100" value="35" step="5"></label></div><p id="studioBeatEstado" class="studio-ayuda" role="status"></p>
      </aside>
      <div id="studioLetra" class="studio-letra"></div>
      <div class="studio-voz"><button type="button" id="studioTeam">Practicar formas, significado y rimas en RAP Team ↑</button></div>
      <details class="studio-detalle" id="studioRelevos"><summary>🔄 Coordinar los relevos</summary><p>Quien termina deja entrar a la siguiente parte. Practicad el cambio con o sin beat.</p><div class="studio-relevos"></div><p class="studio-ayuda">Con el beat activo, la cuenta sigue sus pulsos; sin beat, avanza cada segundo. No se evalúa la coordinación.</p><button type="button" id="studioCuentaParar" disabled>■ Parar cuenta</button></details>
      <details class="studio-detalle" id="studioToma"><summary>🎬 Preparar mi toma</summary><div class="studio-limites"><p><b>Empiezo:</b> <span id="studioInicioToma" lang="en"></span></p><p><b>Termino:</b> <span id="studioFinalToma" lang="en"></span></p></div><ul><li>Cámara estable y voz que se escuche bien.</li><li>El mismo formato y orientación que hayáis acordado.</li><li>Si vais a editar clips, dejad un pequeño margen antes y después.</li><li>Haced una toma de prueba antes de la definitiva.</li></ul><p>Prepara la cámara en otro dispositivo o aplicación. Academia solo da la cuenta; no graba ni accede a cámara o micrófono.</p><div class="studio-controles"><button type="button" id="studioCuentaToma">3 · 2 · 1 · 🎬</button><button type="button" id="studioTomaParar" disabled>■ Parar cuenta</button><strong id="studioTomaEstado" role="status"></strong></div><a class="studio-link" href="#entrega">Ver la entrega del colegio ↓</a></details>
    </div>`;
  const $ = (s) => host.querySelector(s);
  const crear = (tag, clase, texto) => {
    const e = document.createElement(tag);
    if (clase) e.className = clase;
    if (texto) e.textContent = texto;
    return e;
  };
  let seleccion = 0,
    apoyo = "completo",
    cuenta = null,
    temporizador = null;
  let vozEstado = { disponible: false, reproduciendo: false };
  function botonesVoz() {
    host
      .querySelectorAll("[data-studio-audio], [data-studio-parte-audio]")
      .forEach((b) => (b.disabled = !vozEstado.disponible));
    $("#studioVozParar").disabled = !vozEstado.reproduciendo;
    $("#studioVozEstado").textContent = vozEstado.mensaje || "";
  }
  const voz = prepararVozRap((e) => {
    vozEstado = e;
    botonesVoz();
  });
  function pararCuenta() {
    clearTimeout(temporizador);
    temporizador = null;
    cuenta = null;
    $("#studioCuentaParar").disabled = true;
    $("#studioTomaParar").disabled = true;
    host
      .querySelectorAll("[data-studio-cuenta]")
      .forEach((e) => (e.textContent = ""));
    $("#studioTomaEstado").textContent = "";
  }
  function avanzarCuenta() {
    if (!cuenta) return;
    cuenta.restante--;
    cuenta.salida.textContent =
      cuenta.restante > 0 ? String(cuenta.restante) : cuenta.final;
    if (cuenta.restante <= 0) {
      cuenta = null;
      $("#studioCuentaParar").disabled = true;
      $("#studioTomaParar").disabled = true;
      return;
    }
    if (!beat.activo) temporizador = setTimeout(avanzarCuenta, 1000);
  }
  const beat = crearBeatRap({
    antesDeEmpezar() {
      voz.detener();
      team?.detener();
      pararCuenta();
    },
    alPulso(p) {
      host.querySelectorAll("[data-studio-pulso]").forEach((e) => {
        const actual = p?.numero === Number(e.dataset.studioPulso);
        e.classList.toggle("is-active", actual);
        e.setAttribute("aria-current", actual ? "step" : "false");
      });
      $("#studioPulsoTexto").textContent = p
        ? `${p.fase === "entrada" ? "Entrada" : "Pulso"} ${p.numero} de 4`
        : "Parado";
      if (p && cuenta?.conBeat) avanzarCuenta();
    },
    alEstado(e) {
      $("#studioBeatInicio").disabled = e.activo;
      $("#studioBeatParar").disabled = !e.activo;
      $("#studioBeatInicio").textContent = e.soloVisual
        ? "▶ Empezar pulso visual"
        : "▶ Empezar beat";
      $("#studioVolumen").disabled = e.soloVisual;
      $("#studioBeatEstado").textContent = e.mensaje;
      if (!e.activo && cuenta?.conBeat) pararCuenta();
    },
  });
  // El callback inicial del beat se ejecuta antes de asignar la constante; no lee beat.
  function detenerTodo() {
    beat.detener();
    if (vozEstado.reproduciendo) voz.detener();
    pararCuenta();
  }
  function linea(padre, texto, pistas = false) {
    const p = crear("p", "rap-linea");
    p.lang = "en";
    if (pistas) p.textContent = pistaLineaRap(texto);
    else
      for (const s of segmentarLinea(texto)) {
        if (s.texto !== undefined) p.append(document.createTextNode(s.texto));
        else {
          const trio = crear("span", "rap-trio");
          s.formas.forEach((forma, i) => {
            if (i) {
              const flecha = crear("span", "rap-arrow", "→");
              flecha.setAttribute("aria-hidden", "true");
              trio.append(flecha);
            }
            trio.append(
              crear("span", "rap-forma rap-forma--" + (i + 1), forma),
            );
          });
          p.append(trio);
        }
      }
    padre.append(p);
  }
  function pintarLetra() {
    $("#studioLetra").replaceChildren();
    host
      .querySelectorAll("[data-studio-apoyo]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.studioApoyo === apoyo)),
      );
    $("#studioApoyoAyuda").textContent =
      apoyo === "completo"
        ? "Di toda la línea, incluidas las tres formas. Ensaya un bloque cada vez."
        : apoyo === "pistas"
          ? "Recuerda las formas que faltan. Las líneas sin trío conservan solo su primera palabra. Puedes recuperar todo el texto cuando quieras."
          : "Tu turno sin letra. Conserva el inicio y el final como referencia, y recupera el texto cuando quieras.";
    const parte = partes[seleccion];
    if (apoyo === "sin") {
      const silencio = crear("div", "studio-sin-letra");
      silencio.append(
        crear("h4", "", "🙈 Ahora, de memoria"),
        crear("p", "", "Empiezo: " + parte.inicio),
        crear("p", "", "Termino: " + parte.final),
      );
      const recuperar = crear("button", "", "👀 Recuperar texto completo");
      recuperar.type = "button";
      recuperar.addEventListener("click", () => {
        apoyo = "completo";
        pintarLetra();
        $('[data-studio-apoyo="completo"]').focus();
      });
      silencio.append(recuperar);
      $("#studioLetra").append(silencio);
    } else
      parte.bloques.forEach((bloque, i) => {
        const e = crear("article", "studio-bloque");
        e.append(
          crear(
            "h4",
            "",
            `Bloque ${i + 1} · Fragmento ${bloque.fragmento + 1}`,
          ),
        );
        bloque.lineas.forEach((t) => linea(e, t, apoyo === "pistas"));
        const b = crear("button", "", "🔊 Escuchar este bloque completo");
        b.type = "button";
        b.dataset.studioAudio = String(i);
        b.addEventListener("click", () =>
          voz.escuchar(bloque.lineas.map(textoParaEscuchar).join(" ")),
        );
        e.append(b);
        $("#studioLetra").append(e);
      });
    botonesVoz();
  }
  function elegirParte(i) {
    detenerTodo();
    seleccion = i;
    apoyo = "completo";
    $("#studioEnsayo").hidden = false;
    $("#studioMiParte").textContent = "MI PARTE · SOLO DURANTE ESTA SESIÓN";
    const parte = partes[i];
    $("#studioParteTitulo").textContent =
      `Parte ${parte.id} · ${parte.trios[0].formas[0]} → ${parte.trios.at(-1).formas[0]}`;
    $("#studioVideo").href = video;
    $("#studioParteAudio").textContent = `🔊 Escuchar Parte ${parte.id} completa`;
    $("#studioInicioToma").textContent = parte.inicio;
    $("#studioFinalToma").textContent = parte.final;
    host.querySelectorAll("[data-studio-parte]").forEach((b, n) => {
      b.setAttribute("aria-pressed", String(n === i));
      b.textContent = n === i ? "Mi parte · Ensayar ↓" : "Ensayar esta parte ↓";
    });
    $("#studioRelevos").open = false;
    $("#studioToma").open = false;
    pintarLetra();
    $("#studioParteTitulo").focus({ preventScroll: true });
    $("#studioEnsayo").scrollIntoView({ block: "start", behavior: "auto" });
  }
  partes.forEach((parte, i) => {
    const card = crear("article", "studio-parte");
    card.append(
      crear("h4", "", `Parte ${parte.id}`),
      crear("strong", "studio-conteo", `${parte.trios.length} tríos`),
    );
    const inicio = crear("p"),
      final = crear("p");
    inicio.append(crear("b", "", "Inicio"), crear("span", "", parte.inicio));
    final.append(crear("b", "", "Final"), crear("span", "", parte.final));
    inicio.lastChild.lang = final.lastChild.lang = "en";
    const b = crear("button", "", "Ensayar esta parte ↓");
    b.type = "button";
    b.dataset.studioParte = String(i);
    b.setAttribute("aria-pressed", "false");
    b.setAttribute("aria-controls", "studioEnsayo");
    b.addEventListener("click", () => elegirParte(i));
    card.append(inicio, final, b);
    $(".studio-partes").append(card);
  });
  function empezarCuenta(salida, final, conBeat) {
    pararCuenta();
    voz.detener();
    team?.detener();
    cuenta = { salida, final, restante: 3, conBeat };
    salida.textContent = "3";
    if (!conBeat) temporizador = setTimeout(avanzarCuenta, 1000);
  }
  [0, 1].forEach((i) => {
    const e = crear("article", "studio-relevo");
    e.append(crear("h4", "", `Parte ${i + 1} → Parte ${i + 2}`));
    const fin = crear("div", "studio-relevo-fin"),
      entra = crear("div", "studio-relevo-inicio");
    fin.append(crear("b", "", `Termina Parte ${i + 1}`));
    entra.append(crear("b", "", `Entra Parte ${i + 2}`));
    partes[i].lineas.slice(-2).forEach((t) => linea(fin, t));
    partes[i + 1].lineas.slice(0, 2).forEach((t) => linea(entra, t));
    e.append(fin, crear("span", "studio-cambio", "↓ Cambio de voz"), entra);
    const b = crear("button", "", "3 · 2 · 1 · Ensayar entrada");
    b.type = "button";
    b.dataset.studioRelevo = String(i);
    const estado = crear("p", "studio-cuenta");
    estado.dataset.studioCuenta = String(i);
    estado.setAttribute("role", "status");
    b.addEventListener("click", () => {
      empezarCuenta(estado, `¡Entra Parte ${i + 2}!`, beat.activo);
      $("#studioCuentaParar").disabled = false;
    });
    e.append(b, estado);
    $(".studio-relevos").append(e);
  });
  host.querySelectorAll("[data-studio-apoyo]").forEach((b) =>
    b.addEventListener("click", () => {
      voz.detener();
      apoyo = b.dataset.studioApoyo;
      pintarLetra();
    }),
  );
  $("#studioBeatInicio").addEventListener("click", () => beat.iniciar());
  $("#studioBeatParar").addEventListener("click", () => beat.detener());
  $("#studioVolumen").addEventListener("input", (e) =>
    beat.volumen(Number(e.target.value) / 100),
  );
  $("#studioParteAudio").addEventListener("click", () => voz.escucharSecuencia(partes[seleccion].lineas.map(textoParaEscuchar)));
  $("#studioVozParar").addEventListener("click", () => voz.detener());
  $("#studioCuentaParar").addEventListener("click", pararCuenta);
  $("#studioTomaParar").addEventListener("click", pararCuenta);
  $("#studioCuentaToma").addEventListener("click", () => {
    beat.detener();
    empezarCuenta($("#studioTomaEstado"), "🎬 Empieza tu toma externa", false);
    $("#studioTomaParar").disabled = false;
  });
  $("#studioTeam").addEventListener("click", () => {
    detenerTodo();
    team?.practicarTrio(
      trios.findIndex((t) => t.linea === partes[seleccion].inicio),
    );
  });
  document.addEventListener("rap:antes-voz", () => {
    if (beat.activo)
      beat.detener("Beat parado para escuchar la pronunciación.");
    pararCuenta();
  });
  host.querySelectorAll("details").forEach((d) =>
    d.addEventListener("toggle", () => {
      if (!d.open) pararCuenta();
    }),
  );
  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest("a");
      if (
        (a && a.getAttribute("href") !== "#graba") ||
        e.target.closest("#rap-team,#escucha,#practica,#aprende,#entrega")
      )
        detenerTodo();
    },
    true,
  );
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) detenerTodo();
  });
  window.addEventListener("pagehide", detenerTodo);
  if ("IntersectionObserver" in window)
    new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) detenerTodo();
    }).observe(host);
  return { detener: detenerTodo };
}
