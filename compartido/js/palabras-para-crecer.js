/*
 * Academia Gloria Valentina
 * Componente compartido: Palabras para crecer
 * Versión 1.0 · Reutilizable en Mi Rincón de Lectura, Biblioteca y otros módulos.
 */

const DEFAULT_STOPWORDS = Object.freeze({
  es: new Set([
    "a","al","algo","como","con","de","del","el","ella","ellas","ellos","en",
    "era","es","esa","ese","eso","esta","este","esto","fue","ha","había","hacia",
    "hasta","hay","la","las","le","les","lo","los","más","me","mi","mis","muy",
    "no","nos","o","para","pero","por","porque","que","se","sin","su","sus","te",
    "tu","tus","un","una","uno","unos","unas","y","ya"
  ]),
  en: new Set([
    "a","an","and","are","as","at","be","but","by","for","from","had","has",
    "have","he","her","hers","him","his","i","in","is","it","its","me","my",
    "no","not","of","on","or","our","she","so","that","the","their","them",
    "they","this","to","was","we","were","with","you","your"
  ])
});

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function normalizeWord(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}'’-]+/gu, " ")
    .trim();
}

function tokenize(value = "") {
  return normalizeWord(value).split(/\s+/).filter(Boolean);
}

function buildComparison(expectedText = "", heardText = "") {
  const expected = tokenize(expectedText);
  const heard = tokenize(heardText);
  const rows = expected.length + 1;
  const cols = heard.length + 1;
  const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let i = expected.length - 1; i >= 0; i -= 1) {
    for (let j = heard.length - 1; j >= 0; j -= 1) {
      matrix[i][j] = expected[i] === heard[j]
        ? matrix[i + 1][j + 1] + 1
        : Math.max(matrix[i + 1][j], matrix[i][j + 1]);
    }
  }

  const result = [];
  let i = 0;
  let j = 0;

  while (i < expected.length && j < heard.length) {
    if (expected[i] === heard[j]) {
      result.push({ type: "match", expected: expected[i], heard: heard[j] });
      i += 1;
      j += 1;
    } else if (matrix[i + 1][j] >= matrix[i][j + 1]) {
      result.push({ type: "missing", expected: expected[i], heard: "" });
      i += 1;
    } else {
      result.push({ type: "different", expected: "", heard: heard[j] });
      j += 1;
    }
  }

  while (i < expected.length) {
    result.push({ type: "missing", expected: expected[i], heard: "" });
    i += 1;
  }

  while (j < heard.length) {
    result.push({ type: "different", expected: "", heard: heard[j] });
    j += 1;
  }

  return result;
}

function recommendationLimit(score) {
  if (score >= 100) return 0;
  if (score >= 90) return 2;
  if (score >= 80) return 4;
  if (score >= 70) return 6;
  if (score >= 50) return 8;
  return 10;
}

function languageKey(locale = "es-ES") {
  return String(locale).toLowerCase().startsWith("en") ? "en" : "es";
}

function frequencyMap(text = "") {
  return tokenize(text).reduce((map, word) => {
    map.set(word, (map.get(word) || 0) + 1);
    return map;
  }, new Map());
}

export class PalabrasParaCrecer {
  constructor(options = {}) {
    this.root = typeof options.root === "string"
      ? document.querySelector(options.root)
      : options.root;

    if (!this.root) {
      throw new Error("PalabrasParaCrecer requiere un contenedor válido.");
    }

    this.list = this.root.querySelector("[data-palabras-list]") ||
      this.root.querySelector("#pronunciationPracticeList");
    this.count = this.root.querySelector("[data-palabras-count]") ||
      this.root.querySelector("#pronunciationPracticeCount");
    this.intro = this.root.querySelector("[data-palabras-intro]") ||
      this.root.querySelector("#pronunciationPracticeIntro");

    this.maxAttempts = Number(options.maxAttempts || 3);
    this.onChange = typeof options.onChange === "function"
      ? options.onChange
      : () => {};

    this.context = {
      idioma: options.idioma || "es-ES",
      origen: options.origen || {}
    };

    this.words = [];
    this.results = {};
    this.recognition = null;
    this.activeKey = "";
  }

  setContext(context = {}) {
    this.context = {
      ...this.context,
      ...context,
      origen: {
        ...(this.context.origen || {}),
        ...(context.origen || {})
      }
    };
  }

  reset() {
    this.stopRecognition();
    this.words = [];
    this.results = {};
    this.root.open = false;
    this.root.classList.add("hidden");
    if (this.list) this.list.innerHTML = "";
    if (this.count) this.count.textContent = "";
    this.emitChange();
  }

  prepare({ textoObjetivo = "", textoReconocido = "", porcentaje = 0, idioma, origen } = {}) {
    this.setContext({
      idioma: idioma || this.context.idioma,
      origen: origen || this.context.origen
    });

    this.stopRecognition();
    this.words = this.selectWords(textoObjetivo, textoReconocido, porcentaje);
    this.results = {};
    this.root.open = false;
    this.render();
    this.emitChange();
    return this.getData();
  }

  selectWords(expectedText, heardText, score) {
    const limit = recommendationLimit(Number(score || 0));
    if (!limit) return [];

    const comparison = buildComparison(expectedText, heardText);
    const frequencies = frequencyMap(expectedText);
    const lang = languageKey(this.context.idioma);
    const stopwords = DEFAULT_STOPWORDS[lang] || DEFAULT_STOPWORDS.es;
    const candidates = [];
    const seen = new Set();

    for (let index = 0; index < comparison.length; index += 1) {
      const item = comparison[index];
      const word = normalizeWord(item.expected);

      if (
        item.type !== "missing" ||
        !word ||
        word.length < 4 ||
        /^\d+$/.test(word) ||
        stopwords.has(word) ||
        seen.has(word)
      ) {
        continue;
      }

      const next = comparison[index + 1];
      const isSubstitution =
        next?.type === "different" && Boolean(normalizeWord(next.heard));
      const frequency = frequencies.get(word) || 1;
      const lengthScore = Math.min(8, Math.max(0, word.length - 4));
      const typeScore = isSubstitution ? 16 : 11;
      const repeatedScore = Math.min(8, (frequency - 1) * 3);

      seen.add(word);
      candidates.push({
        palabra: item.expected,
        clave: word,
        motivo: isSubstitution ? "sustitucion" : "omision",
        palabraReconocidaInicialmente: isSubstitution ? next.heard : "",
        prioridad: typeScore + lengthScore + repeatedScore
      });
    }

    return candidates
      .sort((a, b) =>
        b.prioridad - a.prioridad ||
        b.clave.length - a.clave.length ||
        a.clave.localeCompare(b.clave)
      )
      .slice(0, limit);
  }

  getResult(word) {
    const key = normalizeWord(word);
    return this.results[key] || {
      intentos: 0,
      estado: "pendiente",
      ultimaPalabraReconocida: ""
    };
  }

  getData() {
    return this.words.map(item => {
      const result = this.getResult(item.palabra);
      return {
        palabra: item.palabra,
        motivo: item.motivo,
        palabraReconocidaInicialmente:
          item.palabraReconocidaInicialmente || "",
        intentos: result.intentos || 0,
        estado: result.estado,
        ultimaPalabraReconocida:
          result.ultimaPalabraReconocida || "",
        idioma: this.context.idioma,
        moduloOrigen: this.context.origen?.modulo || "",
        contenidoId: this.context.origen?.contenidoId || "",
        sesionId: this.context.origen?.sesionId || ""
      };
    });
  }

  emitChange() {
    this.onChange(this.getData(), {
      idioma: this.context.idioma,
      origen: { ...(this.context.origen || {}) }
    });
  }

  message(item, result) {
    if (result.estado === "superada") {
      return `✅ ¡Muy bien! Lía entendió «${item.palabra}».`;
    }

    if (result.estado === "reintentar" && result.intentos < this.maxAttempts) {
      return result.ultimaPalabraReconocida
        ? `🌱 Lía entendió «${result.ultimaPalabraReconocida}». Escucha la palabra y prueba otra vez.`
        : "🎙️ Lía no pudo escucharla con claridad. Prueba otra vez con calma.";
    }

    if (result.estado === "en_practica") {
      return "💛 Esta palabra necesita un poquito más de práctica. Puedes volver a ella más tarde.";
    }

    return item.motivo === "sustitucion" &&
      item.palabraReconocidaInicialmente
      ? `En la lectura, Lía entendió «${item.palabraReconocidaInicialmente}».`
      : "Esta palabra no apareció con claridad en la transcripción.";
  }

  render() {
    const hasWords = this.words.length > 0;
    this.root.classList.toggle("hidden", !hasWords);

    if (!hasWords) {
      if (this.list) this.list.innerHTML = "";
      if (this.count) this.count.textContent = "";
      return;
    }

    if (this.count) {
      this.count.textContent = `${this.words.length} ${
        this.words.length === 1 ? "palabra" : "palabras"
      }`;
    }

    if (this.intro) {
      this.intro.textContent = this.words.length === 1
        ? "Hoy Lía te propone practicar una palabra importante."
        : `Hoy Lía te propone practicar ${this.words.length} palabras importantes.`;
    }

    if (!this.list) return;

    this.list.innerHTML = this.words.map((item, index) => {
      const result = this.getResult(item.palabra);
      const completed = result.estado === "superada";
      const exhausted = result.estado === "en_practica";
      const attempts = Math.min(this.maxAttempts, result.intentos || 0);

      return `
        <article
          class="pronunciation-card ${completed ? "pronunciation-card--success" : ""}"
          data-pronunciation-card="${escapeHtml(item.clave)}"
        >
          <div class="pronunciation-card__number">${index + 1}</div>

          <div class="pronunciation-card__content">
            <strong class="pronunciation-card__word">
              ${escapeHtml(item.palabra)}
            </strong>

            <span class="pronunciation-card__reason">
              ${item.motivo === "sustitucion" &&
                item.palabraReconocidaInicialmente
                ? `Lía entendió «${escapeHtml(item.palabraReconocidaInicialmente)}» durante la lectura.`
                : "No apareció con claridad durante la lectura."}
            </span>

            <div class="pronunciation-card__actions">
              <button
                type="button"
                class="pronunciation-action pronunciation-action--listen"
                data-pronunciation-listen="${escapeHtml(item.clave)}"
              >
                🔊 Escuchar
              </button>

              <button
                type="button"
                class="pronunciation-action pronunciation-action--speak"
                data-pronunciation-speak="${escapeHtml(item.clave)}"
                ${completed || exhausted ? "disabled" : ""}
              >
                🎙️ Decir la palabra
              </button>
            </div>

            <div
              class="pronunciation-card__feedback"
              data-pronunciation-feedback="${escapeHtml(item.clave)}"
              aria-live="polite"
            >
              ${escapeHtml(this.message(item, result))}
            </div>
          </div>

          <span class="pronunciation-card__attempts">
            ${completed
              ? "Superada"
              : exhausted
                ? "Para practicar"
                : `Intentos ${attempts}/${this.maxAttempts}`}
          </span>
        </article>
      `;
    }).join("");

    this.list.querySelectorAll("[data-pronunciation-listen]").forEach(button => {
      button.onclick = () => {
        const item = this.words.find(
          word => word.clave === button.dataset.pronunciationListen
        );
        if (item) this.speak(item.palabra);
      };
    });

    this.list.querySelectorAll("[data-pronunciation-speak]").forEach(button => {
      button.onclick = () => {
        const item = this.words.find(
          word => word.clave === button.dataset.pronunciationSpeak
        );
        if (item) this.startPractice(item, button);
      };
    });
  }

  speak(word) {
    if (!("speechSynthesis" in window)) {
      alert("Este navegador no permite escuchar la palabra automáticamente.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = this.context.idioma || "es-ES";
    utterance.rate = 0.78;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  stopRecognition() {
    if (!this.recognition) return;

    try {
      this.recognition.abort();
    } catch (error) {
      console.warn(error);
    }

    this.recognition = null;
    this.activeKey = "";
  }

  startPractice(item, button) {
    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
      alert("La práctica por voz no está disponible en este navegador.");
      return;
    }

    this.stopRecognition();

    const previous = this.getResult(item.palabra);
    const nextAttempts = Math.min(
      this.maxAttempts,
      (previous.intentos || 0) + 1
    );

    this.results[item.clave] = {
      ...previous,
      intentos: nextAttempts,
      estado: "escuchando",
      ultimaPalabraReconocida: ""
    };

    this.activeKey = item.clave;
    button.disabled = true;
    button.textContent = "🎙️ Escuchando...";

    const feedback = this.list?.querySelector(
      `[data-pronunciation-feedback="${CSS.escape(item.clave)}"]`
    );
    if (feedback) {
      feedback.textContent =
        "🎙️ Di solamente la palabra cuando estés preparada.";
    }

    this.recognition = new Recognition();
    this.recognition.lang = this.context.idioma || "es-ES";
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 3;

    this.recognition.onresult = event => {
      const alternatives = Array.from(event.results?.[0] || [])
        .map(result => String(result.transcript || "").trim())
        .filter(Boolean);

      const success = alternatives.some(transcript => {
        const normalized = normalizeWord(transcript);
        return normalized === item.clave ||
          normalized.split(" ").includes(item.clave);
      });

      this.results[item.clave] = {
        intentos: nextAttempts,
        estado: success
          ? "superada"
          : nextAttempts >= this.maxAttempts
            ? "en_practica"
            : "reintentar",
        ultimaPalabraReconocida: alternatives[0] || ""
      };

      this.emitChange();
      this.render();
    };

    this.recognition.onerror = event => {
      if (event.error === "aborted") return;

      this.results[item.clave] = {
        intentos: nextAttempts,
        estado: nextAttempts >= this.maxAttempts
          ? "en_practica"
          : "reintentar",
        ultimaPalabraReconocida: ""
      };

      this.emitChange();
      this.render();
    };

    this.recognition.onend = () => {
      const result = this.getResult(item.palabra);

      if (this.activeKey === item.clave && result.estado === "escuchando") {
        this.results[item.clave] = {
          intentos: nextAttempts,
          estado: nextAttempts >= this.maxAttempts
            ? "en_practica"
            : "reintentar",
          ultimaPalabraReconocida: ""
        };
        this.emitChange();
        this.render();
      }

      this.recognition = null;
      this.activeKey = "";
    };

    try {
      this.recognition.start();
    } catch (error) {
      console.warn(error);
      this.results[item.clave] = {
        intentos: nextAttempts,
        estado: nextAttempts >= this.maxAttempts
          ? "en_practica"
          : "reintentar",
        ultimaPalabraReconocida: ""
      };
      this.emitChange();
      this.render();
    }
  }
}

export function crearPalabrasParaCrecer(options = {}) {
  return new PalabrasParaCrecer(options);
}
