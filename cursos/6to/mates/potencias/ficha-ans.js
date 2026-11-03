import { FICHA_ANS as ficha, potencia, producto, formato } from "./potencias-data.js";

const palabras = ["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve","diez"];
const lectura = (b,e) => `${palabras[b] || b} ${e === 2 ? "al cuadrado" : e === 3 ? "al cubo" : "elevado a " + (palabras[e] || e)}`;
const normalizar = texto => texto.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
const compactar = texto => normalizar(texto).replace(/\s+/g,"");
const numero = (texto,n) => compactar(texto) === String(n) || normalizar(texto) === palabras[n];
const potenciaIgual = (texto,b,e) => [potencia(b,e),`${b}^${e}`].includes(compactar(texto));
const productoIgual = (texto,b,e) => e === 0
  ? /^(1|sin factores|ningun factor|ninguno)$/.test(normalizar(texto))
  : compactar(texto).replace(/[x*·]/g,"×") === compactar(producto(b,e));
function lecturaIgual(texto,b,e) {
  const forma = normalizar(texto).replace(/[.!?]+$/,"").replace(/\s+/g," ");
  return [palabras[b],String(b)].some(base => base && (
    (e === 2 && forma === base + " al cuadrado") ||
    (e === 3 && forma === base + " al cubo") ||
    [palabras[e],String(e)].some(exp => exp && [" elevado a "," elevado al "," a la "].some(giro => forma === base+giro+exp))
  ));
}
const campo = (etiqueta, extra = "") => `<label>${etiqueta}<input type="text" autocomplete="off" maxlength="100" required ${extra}></label>`;
const registro = (enunciado, controles, verificar) => ({enunciado,controles,verificar});
const estado = (ok, bien, pista) => ({ok,texto:ok ? bien : pista});
const abierta = (etiqueta) => `<label>${etiqueta}<textarea required rows="3" maxlength="600"></textarea></label>`;

export function iniciarFichaANS(host) {
  const ejercicios = [
    ["Nombra y explica las partes de una potencia.", "", [
      registro("2⁷", campo("Nombre del 2")+abierta("¿Qué indica el 2?")+campo("Nombre del 7")+abierta("¿Qué indica el 7?"),
        ([base, , exp]) => estado(normalizar(base)==="base" && normalizar(exp)==="exponente",
          "Identificaste las partes. Compara tu explicación: el 2 es la base, el factor que se repite; el 7 es el exponente, indica que hay siete factores iguales.",
          "El número de abajo es la base. El número pequeño de arriba es el exponente. Revisa los nombres y tu explicación."))
    ]],
    ["Define con tus propias palabras qué es una potencia, no olvides poner un ejemplo.", "", [
      registro("Tu definición y tu ejemplo", abierta("Escribe con tus palabras")+campo("Un ejemplo"),
        () => ({ok:null,texto:"Revisa tu idea: ¿explicaste que se repite el mismo factor? ¿En tu ejemplo coinciden la base y el factor, y el exponente y su cantidad? Un modelo es 3² = 3 × 3. Puedes editar tu respuesta."}))
    ]],
    ["Escribe cada potencia como multiplicación y calcula el producto.", "Ejemplo: 3² = 3 × 3 = 9", ficha.expandir.map(([b,e]) =>
      registro(potencia(b,e), campo("Multiplicación")+campo("Resultado",'inputmode="numeric"')+(e===0
        ? '<details class="ayuda-ans"><summary>💡 Ayuda de Academia · Una potencia especial</summary><p>Cuando una base distinta de cero está elevada a 0, su valor es 1. Por eso 7⁰ = 1. En Multiplicación puedes escribir «sin factores» o «1».</p></details>' : ""),
        ([p,n]) => estado(productoIgual(p,b,e) && numero(n,b**e), "La multiplicación y el valor coinciden.",
          e===0 ? "Este caso es especial. Puedes abrir la ayuda de Academia y volver a intentarlo." : "Cuenta los factores iguales y multiplica uno por uno. Puedes usar ×, x o *.")))],
    ["Escribe cada producto como potencia.", "Puedes escribir, por ejemplo, 3^2 o 3².", ficha.convertir.map(([b,e]) =>
      registro(producto(b,e),campo("Potencia"),([p])=>estado(potenciaIgual(p,b,e),"El factor y la cantidad coinciden.","Usa el factor repetido como base. Cuenta cuántas veces aparece y escribe ese exponente.")))],
    ["Escribe cómo se leen las cuatro potencias del ejercicio 4.", "", ficha.convertir.map(([b,e]) =>
      registro(potencia(b,e),campo("Se lee…"),([r])=>estado(lecturaIgual(r,b,e),"La lectura corresponde a esta potencia.","Lee primero la base y luego el exponente: puedes usar «elevado a…», «al cuadrado» o «al cubo» cuando corresponda.")))],
    ["Decide qué expresiones pueden escribirse como potencia e indica cómo.", "", ficha.reconocer.map(([exp,par]) =>
      registro(exp,`<label>¿Puede escribirse como potencia?<select required><option value="">Elige una opción</option><option value="si">Sí</option><option value="no">No</option></select></label><div data-conversion hidden>${campo("¿Qué potencia?","disabled")}</div>`,
        ([op,p])=>estado(par ? op==="si" && potenciaIgual(p,...par) : op==="no",
          par ? "Es una multiplicación del mismo factor." : "Aquí no se multiplican factores iguales.",
          par ? "Es un producto. Busca el factor que se repite y cuéntalo." : "Mira el signo de la operación: aquí hay una suma o una resta.")))],
    ["Relaciona expresiones que indiquen lo mismo.", "En cada expresión de arriba, marca todas las expresiones de abajo que tienen el mismo valor.", ficha.equivalencias.origen.map((exp,i) =>
      registro(exp,`<fieldset><legend>Expresiones de abajo</legend>${ficha.equivalencias.destinos.map((d,j)=>`<label class="opcion-equivalente"><input type="checkbox" value="${j}"> ${d}</label>`).join("")}</fieldset>`,
        elegidas => estado(elegidas.join()===ficha.equivalencias.soluciones[i].join(),"Encontraste todas las equivalencias de esta expresión.","Compara sus valores. Puede haber más de una expresión equivalente; marca todas las que correspondan.")))],
    ["Completa la tabla de potencia, producto y lectura.", "", ficha.tabla.map(([b,e,dada],i) => {
      const tipos = ["potencia","producto","lectura"];
      const valores = [potencia(b,e),producto(b,e),lectura(b,e)];
      const titulos = ["Potencia","Producto","Se lee…"];
      const comprobar = [t=>potenciaIgual(t,b,e),t=>productoIgual(t,b,e),t=>lecturaIgual(t,b,e)];
      return registro("Fila "+(i+1),`<div class="fila-ans">${tipos.map((tipo,j)=> tipo===dada
        ? `<div class="dato-ans"><small>${titulos[j]}</small><b>${valores[j][0].toUpperCase()+valores[j].slice(1)}</b></div>`
        : campo(titulos[j])).join("")}</div>`,
        datos => {let k=0;return estado(tipos.map((tipo,j)=>tipo===dada || comprobar[j](datos[k++])).every(Boolean),
          "Las tres formas representan la misma potencia.","Usa la casilla dada para encontrar la base y el exponente. Comprueba que las tres formas dicen lo mismo.");});
    })],
    ["Calcula cada multiplicación por una potencia de 10.", "Ejemplo: 4 × 10³ = 4 × 1000 = 4000", ficha.diez.map(([b,e]) =>
      registro(`${b} × ${potencia(10,e)}`,campo("Valor de la potencia de 10",'inputmode="numeric"')+campo("Resultado de la multiplicación",'inputmode="numeric"'),
        ([d,n])=>estado(numero(d,10**e) && numero(n,b*10**e),`${b} × ${formato(10**e)} = ${formato(b*10**e)}.`,"Primero escribe cuánto vale la potencia de 10. Luego multiplícala por el número de delante.")))]
  ];

  ejercicios.forEach(([titulo,ejemplo,casos],i) => {
    const bloque = document.createElement("details");
    bloque.className = "ejercicio-ans";
    bloque.name = "ficha-potencias";
    bloque.dataset.ejercicio = i+1;
    bloque.innerHTML = `<summary><span class="numero-ans">${i+1}</span> ${titulo}</summary>${ejemplo ? `<p class="ejemplo-ans">${ejemplo}</p>` : ""}<div class="casos-ans"></div>`;
    const cuerpo = bloque.querySelector(".casos-ans");
    let actual = 0;
    // Los formularios se mantienen en memoria al navegar entre apartados.
    const formularios = casos.map((caso,j) => {
      const form = document.createElement("form");
      form.hidden = j !== 0;
      form.innerHTML = `<p class="eyebrow">Apartado ${j+1} de ${casos.length}</p><h3 tabindex="-1">${caso.enunciado}</h3><div class="entradas-ans">${caso.controles}</div><button class="btn principal" type="submit">${i===1 ? "Revisar mi idea" : "Comprobar"}</button><p role="status" class="mensaje-ans"></p>`;
      const decision = form.querySelector("select");
      decision?.addEventListener("change", () => {
        const conversion = form.querySelector("[data-conversion]");
        conversion.hidden = decision.value !== "si";
        conversion.querySelector("input").disabled = conversion.hidden;
      });
      form.addEventListener("submit", evento => {
        evento.preventDefault();
        const entradas = [...form.querySelectorAll("input:not(:disabled),textarea,select")];
        const datos = entradas.filter(e => e.type !== "checkbox" || e.checked).map(e=>e.value.trim());
        const resultado = datos.length && datos.every(Boolean)
          ? caso.verificar(datos) : estado(false,"","Completa tu respuesta antes de comprobar.");
        const mensaje = form.querySelector("[role=status]");
        if (resultado.ok !== null) mensaje.dataset.correcta = String(resultado.ok);
        mensaje.textContent = resultado.texto;
      });
      form.addEventListener("input", () => {
        const mensaje = form.querySelector("[role=status]");
        mensaje.textContent = "";
        delete mensaje.dataset.correcta;
      });
      cuerpo.append(form);
      return form;
    });
    if (casos.length > 1) {
      const nav = document.createElement("div");
      nav.className = "acciones-ans";
      nav.innerHTML = '<button type="button" class="btn">← Anterior</button><button type="button" class="btn">Siguiente apartado →</button>';
      const [anterior,siguiente] = nav.children;
      function actualizar() {
        formularios.forEach((form,j)=>form.hidden=j!==actual);
        anterior.disabled = actual===0;
        siguiente.disabled = actual===casos.length-1;
      }
      anterior.onclick = () => { actual--; actualizar(); formularios[actual].querySelector("h3").focus(); };
      siguiente.onclick = () => { actual++; actualizar(); formularios[actual].querySelector("h3").focus(); };
      actualizar();
      cuerpo.append(nav);
    }
    host.append(bloque);
  });
}
