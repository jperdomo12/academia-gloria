(() => {
  "use strict";

  const steps = [
    {
      key: "sumar",
      symbol: "➕",
      kicker: "Herramienta 1 · Juntar",
      title: "Dos cantidades se encuentran",
      story: "Tienes 8 fichas. Te dan 4 fichas más.",
      visualHint: "Primero había 8. Después llegan 4.",
      visual: { type: "sum", first: 8, second: 4 },
      question: "¿Qué está pasando con las cantidades?",
      options: [
        ["join", "Se juntan dos cantidades."],
        ["remove", "Se quita una parte."],
        ["share", "Se reparte un total."],
        ["repeat", "Se repite un grupo varias veces."]
      ],
      correct: "join",
      hint: "Imagina las 8 fichas delante de ti y después coloca las 4 nuevas al lado.",
      concept: "SUMAR",
      explanation: "Sumar sirve cuando juntamos o añadimos cantidades y queremos conocer cuánto hay ahora en total.",
      equations: ["8 + 4 = 12"],
      feedback: "Exacto. Primero entendiste la acción: llegan más y las cantidades se juntan."
    },
    {
      key: "restar",
      symbol: "➖",
      kicker: "Herramienta 2 · Quitar",
      title: "Una cantidad cambia porque algo se va",
      story: "Tienes 12 fichas. Regalas 4.",
      visualHint: "Las 12 estaban. Cuatro dejan de estar contigo.",
      visual: { type: "subtract", total: 12, removed: 4 },
      question: "¿Qué está pasando ahora?",
      options: [
        ["remove", "Una parte se quita y queremos saber cuánto queda."],
        ["join", "Llegan más fichas y se juntan."],
        ["share", "Todas se reparten en grupos iguales."],
        ["repeat", "La misma cantidad se repite varias veces."]
      ],
      correct: "remove",
      hint: "Mira las fichas más claras: esas ya no forman parte de lo que te queda.",
      concept: "RESTAR",
      explanation: "Restar puede servir para quitar, saber cuánto queda o comparar cuánto separa una cantidad de otra.",
      equations: ["12 − 4 = 8"],
      feedback: "Bien visto. La historia no habla de repartir entre grupos: habla de una cantidad que disminuye."
    },
    {
      key: "multiplicar",
      symbol: "✖️",
      kicker: "Herramienta 3 · Repetir",
      title: "La misma cantidad aparece varias veces",
      story: "Hay 4 mesas. En cada mesa colocan 3 fichas.",
      visualHint: "Observa: 4 mesas y en todas hay 3 fichas.",
      visual: { type: "tables", groups: 4, each: 3 },
      question: "¿Qué idea describe mejor esta historia?",
      options: [
        ["repeat", "La misma cantidad se repite en grupos iguales."],
        ["remove", "Se quitan 3 fichas de un total."],
        ["share", "Un total ya conocido se reparte entre 4."],
        ["join", "Solo se añaden 4 fichas a 3."]
      ],
      correct: "repeat",
      hint: "No mires primero el símbolo ×. Mira las mesas: en cada una aparece el mismo grupo de 3 fichas.",
      concept: "MULTIPLICAR",
      explanation: "Multiplicar ayuda cuando una misma cantidad se repite varias veces en grupos iguales.",
      equations: ["4 × 3 = 12"],
      feedback: "Eso es. Reconociste grupos iguales antes de pensar en la cuenta."
    },
    {
      key: "dividir",
      symbol: "➗",
      kicker: "Herramienta 4 · Repartir",
      title: "Un total se organiza en grupos iguales",
      story: "Tienes 12 fichas y quieres repartirlas por igual entre 4 personas.",
      visualHint: "El total ya existe: ahora buscamos cuánto recibe cada grupo.",
      visual: { type: "groups", groups: 4, each: 3 },
      question: "¿Qué está ocurriendo con las 12 fichas?",
      options: [
        ["share", "Un total se reparte en 4 grupos iguales."],
        ["repeat", "Se crean 12 grupos de 4."],
        ["join", "Se juntan 12 fichas con otras 4."],
        ["remove", "Solo se quitan 4 fichas."]
      ],
      correct: "share",
      hint: "Las 12 fichas ya están. La pregunta es cuánto corresponde a cada una de las 4 personas.",
      concept: "DIVIDIR",
      explanation: "Dividir puede significar repartir un total por igual o averiguar cuántos grupos iguales podemos formar.",
      equations: ["12 ÷ 4 = 3", "4 × 3 = 12"],
      feedback: "Exacto. Y observa la conexión: los mismos grupos de una multiplicación pueden ayudarte a comprobar una división."
    },
    {
      key: "palabras",
      symbol: "🕵️",
      kicker: "Reto final · Las palabras pueden engañar",
      title: "No caces palabras: entiende la historia",
      story: "Tenías 20 galletas y repartiste 5 a tus amigas. ¿Cuántas te quedan?",
      visualHint: "La palabra «repartiste» aparece, pero mira qué cambia en TU cantidad.",
      visual: { type: "subtract", total: 20, removed: 5 },
      question: "¿Qué operación ayuda a responder la pregunta?",
      options: [
        ["subtract", "Restar"],
        ["divide", "Dividir"],
        ["multiply", "Multiplicar"],
        ["add", "Sumar"]
      ],
      correct: "subtract",
      hint: "No preguntan cuánto recibe cada amiga. Preguntan cuántas galletas te quedan después de entregar 5.",
      concept: "PENSAR ANTES DE ELEGIR",
      explanation: "Una palabra puede ser una pista, pero no decide sola. La pregunta y la relación entre las cantidades son las que cuentan.",
      equations: ["20 − 5 = 15"],
      feedback: "¡Eso es pensamiento matemático! «Repartiste» no significaba dividir aquí. Entendiste la historia antes de elegir."
    }
  ];

  const $ = (id) => document.getElementById(id);
  const els = {
    routeStatus: $("routeStatus"), routeFill: $("routeFill"), stageKicker: $("stageKicker"),
    stageTitle: $("stageTitle"), stageSymbol: $("stageSymbol"), storyText: $("storyText"),
    visualHint: $("visualHint"), objectsBoard: $("objectsBoard"), conceptReveal: $("conceptReveal"),
    conceptIcon: $("conceptIcon"), conceptName: $("conceptName"), conceptExplanation: $("conceptExplanation"),
    equationBox: $("equationBox"), questionText: $("questionText"), options: $("options"),
    feedback: $("feedback"), hintButton: $("hintButton"), nextButton: $("nextButton"),
    finishCard: $("finishCard"), restartButton: $("restartButton")
  };

  let currentStep = 0;
  let solved = false;

  function shuffled(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
    }
    return copy;
  }

  function token(number, className = "") {
    const span = document.createElement("span");
    span.className = `token ${className}`.trim();
    span.textContent = String(number);
    span.setAttribute("aria-label", `Ficha ${number}`);
    return span;
  }

  function renderVisual(config) {
    els.objectsBoard.innerHTML = "";
    els.objectsBoard.className = "objects-board";

    if (config.type === "sum") {
      let number = 1;
      for (let i = 0; i < config.first; i += 1) els.objectsBoard.appendChild(token(number++));
      for (let i = 0; i < config.second; i += 1) els.objectsBoard.appendChild(token(number++, "alt"));
      return;
    }

    if (config.type === "subtract") {
      const kept = config.total - config.removed;
      let number = 1;
      for (let i = 0; i < kept; i += 1) els.objectsBoard.appendChild(token(number++));
      for (let i = 0; i < config.removed; i += 1) els.objectsBoard.appendChild(token(number++, "removed"));
      return;
    }

    if (config.type === "tables") {
      els.objectsBoard.classList.add("tables");
      let number = 1;
      for (let groupIndex = 0; groupIndex < config.groups; groupIndex += 1) {
        const table = document.createElement("div");
        table.className = "table-group";
        table.setAttribute("aria-label", `Mesa ${groupIndex + 1} con ${config.each} fichas`);

        const top = document.createElement("div");
        top.className = "table-top";
        for (let itemIndex = 0; itemIndex < config.each; itemIndex += 1) {
          top.appendChild(token(number++));
        }

        const legs = document.createElement("div");
        legs.className = "table-legs";
        legs.setAttribute("aria-hidden", "true");
        legs.innerHTML = "<span></span><span></span>";

        const label = document.createElement("span");
        label.className = "table-label";
        label.textContent = `Mesa ${groupIndex + 1}`;

        table.append(top, legs, label);
        els.objectsBoard.appendChild(table);
      }
      return;
    }

    if (config.type === "groups") {
      els.objectsBoard.classList.add("grouped");
      let number = 1;
      for (let groupIndex = 0; groupIndex < config.groups; groupIndex += 1) {
        const group = document.createElement("div");
        group.className = "group";
        group.setAttribute("aria-label", `Grupo ${groupIndex + 1} con ${config.each} elementos`);
        for (let itemIndex = 0; itemIndex < config.each; itemIndex += 1) {
          group.appendChild(token(number++, groupIndex % 2 ? "alt" : ""));
        }
        const label = document.createElement("span");
        label.className = "group-label";
        label.textContent = `grupo ${groupIndex + 1}`;
        group.appendChild(label);
        els.objectsBoard.appendChild(group);
      }
    }
  }

  function renderRoute() {
    els.routeStatus.textContent = `${currentStep + 1} de ${steps.length}`;
    els.routeFill.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    document.querySelectorAll("[data-route-step]").forEach((node) => {
      const index = Number(node.dataset.routeStep);
      node.classList.toggle("active", index === currentStep);
      node.classList.toggle("done", index < currentStep);
    });
  }

  function revealConcept(step) {
    els.conceptIcon.textContent = step.symbol;
    els.conceptName.textContent = step.concept;
    els.conceptExplanation.textContent = step.explanation;
    els.equationBox.innerHTML = "";
    step.equations.forEach((equation) => {
      const span = document.createElement("span");
      span.className = "equation";
      span.textContent = equation;
      els.equationBox.appendChild(span);
    });
    els.conceptReveal.hidden = false;
  }

  function showFeedback(message, type) {
    els.feedback.textContent = message;
    els.feedback.className = `feedback ${type}`;
    els.feedback.hidden = false;
  }

  function handleChoice(button, optionId) {
    if (solved) return;
    const step = steps[currentStep];

    if (optionId === step.correct) {
      solved = true;
      button.classList.add("correct");
      els.options.querySelectorAll(".option").forEach((option) => { option.disabled = true; });
      revealConcept(step);
      showFeedback(step.feedback, "good");
      els.nextButton.disabled = false;
      els.hintButton.disabled = true;
      return;
    }

    button.classList.add("incorrect");
    button.disabled = true;
    showFeedback("Todavía no. Vuelve a mirar qué cambia en la historia, no una palabra concreta.", "try");
  }

  function renderOptions(step) {
    els.options.innerHTML = "";
    shuffled(step.options).forEach(([id, text]) => {
      const button = document.createElement("button");
      button.className = "option";
      button.type = "button";
      button.textContent = text;
      button.addEventListener("click", () => handleChoice(button, id));
      els.options.appendChild(button);
    });
  }

  function renderStep() {
    const step = steps[currentStep];
    solved = false;
    renderRoute();
    els.stageKicker.textContent = step.kicker;
    els.stageTitle.textContent = step.title;
    els.stageSymbol.textContent = step.symbol;
    els.storyText.textContent = step.story;
    els.visualHint.textContent = step.visualHint;
    els.questionText.textContent = step.question;
    els.conceptReveal.hidden = true;
    els.feedback.hidden = true;
    els.feedback.className = "feedback";
    els.hintButton.disabled = false;
    els.hintButton.textContent = "💡 Ver una pista";
    els.nextButton.disabled = true;
    els.nextButton.textContent = currentStep === steps.length - 1 ? "Terminar ✓" : "Siguiente →";
    renderVisual(step.visual);
    renderOptions(step);
  }

  function finish() {
    document.querySelector(".experience-card").hidden = true;
    document.querySelector(".micro-route").hidden = true;
    els.finishCard.hidden = false;
    els.finishCard.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  els.hintButton.addEventListener("click", () => {
    showFeedback(`💡 PISTA · ${steps[currentStep].hint}`, "hint");
    els.hintButton.textContent = "💡 Pista mostrada";
  });

  els.nextButton.addEventListener("click", () => {
    if (!solved) return;
    if (currentStep >= steps.length - 1) {
      finish();
      return;
    }
    currentStep += 1;
    renderStep();
    document.querySelector(".experience-card").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  els.restartButton.addEventListener("click", () => {
    currentStep = 0;
    els.finishCard.hidden = true;
    document.querySelector(".micro-route").hidden = false;
    document.querySelector(".experience-card").hidden = false;
    renderStep();
    document.querySelector(".micro-route").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  renderStep();
})();
