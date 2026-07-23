import { Academia } from "../../compartido/api/academia.js";
import { auth } from "../../compartido/firebase/firebase-config.js";

let books = [];
let currentBook = null;
let detenerObservacion = null;

let mediaRecorder = null;
let audioChunks = [];
let recordedAudioData = "";
let recordedAudioMimeType = "audio/webm";
let recordedAudioDuration = 0;
let recordingStartedAt = 0;
let recordingTimer = null;

const $ = id => document.getElementById(id);

const fields = [
  "title","author","readingStatus","favoriteCharacter",
  "rating","favoritePart","learning","newWords","review","coverImage"
];

function bookData(){
  return {
    id: $("bookId").value,
    title: $("title").value.trim(),
    author: $("author").value.trim(),
    readingStatus: $("readingStatus").value,
    favoriteCharacter: $("favoriteCharacter").value.trim(),
    rating: Number($("rating").value) || 0,
    favoritePart: $("favoritePart").value.trim(),
    learning: $("learning").value.trim(),
    newWords: $("newWords").value.trim(),
    review: $("review").value.trim(),
    coverImage: $("coverImage").value,
    hasAudio: currentBook?.id === $("bookId").value
      ? Boolean(currentBook?.hasAudio)
      : Boolean(recordedAudioData)
  };
}


const COVER_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='210' viewBox='0 0 150 210'%3E%3Crect width='150' height='210' rx='18' fill='%23f5f3ff'/%3E%3Ctext x='75' y='115' text-anchor='middle' font-size='54'%3E%F0%9F%93%96%3C/text%3E%3C/svg%3E";

function mostrarVistaPreviaCaratula(dataUrl = "") {
  const preview = $("coverPreview");
  preview.src = dataUrl || COVER_PLACEHOLDER;
  preview.classList.toggle("empty", !dataUrl);
}

function cargarImagen(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("No se pudo leer la imagen."));
      image.src = reader.result;
    };

    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });
}

async function reducirCaratula(file) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Selecciona un archivo de imagen.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("La imagen supera los 5 MB.");
  }

  const image = await cargarImagen(file);
  const scale = Math.min(1, 420 / image.width, 600 / image.height);

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));

  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL("image/jpeg", 0.76);

  if (dataUrl.length > 700000) {
    throw new Error("La carátula sigue siendo demasiado grande.");
  }

  return dataUrl;
}

$("coverFile").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    $("statusText").textContent = "Preparando carátula...";
    const dataUrl = await reducirCaratula(file);
    $("coverImage").value = dataUrl;
    mostrarVistaPreviaCaratula(dataUrl);
    $("statusText").textContent = "Cambios sin guardar";
  } catch (error) {
    console.error(error);
    event.target.value = "";
    alert(error.message);
    $("statusText").textContent = "Sin guardar";
  }
});

$("removeCover").onclick = () => {
  $("coverFile").value = "";
  $("coverImage").value = "";
  mostrarVistaPreviaCaratula();
  $("statusText").textContent = "Cambios sin guardar";
};


function formatDuration(seconds = 0) {
  const value = Math.max(0, Math.round(seconds));
  const minutes = String(Math.floor(value / 60)).padStart(2, "0");
  const remaining = String(value % 60).padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("No se pudo preparar el audio."));
    reader.readAsDataURL(blob);
  });
}

function actualizarControlesAudio() {
  const hasAudio = Boolean(recordedAudioData);
  $("playRecording").disabled = !hasAudio;
  $("deleteRecording").disabled = !hasAudio;
  $("voicePreview").classList.toggle("hidden", !hasAudio);

  if (hasAudio) {
    $("voicePreview").src = recordedAudioData;
    $("voiceStatus").textContent =
      `Grabación lista · ${formatDuration(recordedAudioDuration)}`;
  } else {
    $("voicePreview").removeAttribute("src");
    $("voiceStatus").textContent = "Sin grabación.";
  }
}

async function cargarAudioLibro(libroId) {
  recordedAudioData = "";
  recordedAudioDuration = 0;
  recordedAudioMimeType = "audio/webm";
  actualizarControlesAudio();

  if (!libroId) return;

  const audio = await Academia.biblioteca.audio.leer(libroId);

  if (!audio) return;

  recordedAudioData = audio.audioData || "";
  recordedAudioDuration = Number(audio.duration || 0);
  recordedAudioMimeType = audio.mimeType || "audio/webm";
  actualizarControlesAudio();
}

async function guardarAudioActual(libroId) {
  if (!recordedAudioData) return;

  await Academia.biblioteca.audio.guardar(libroId, {
    audioData: recordedAudioData,
    mimeType: recordedAudioMimeType,
    duration: recordedAudioDuration
  });

  if (currentBook?.id === libroId) {
    currentBook.hasAudio = true;
  }
}

$("startRecording").onclick = async () => {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    alert("Este navegador no permite grabar audio.");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioChunks = [];
    recordedAudioData = "";
    recordedAudioDuration = 0;
    actualizarControlesAudio();

    const preferredType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? "audio/webm;codecs=opus"
      : "audio/webm";

    mediaRecorder = new MediaRecorder(stream, {
      mimeType: preferredType,
      audioBitsPerSecond: 32000
    });

    recordedAudioMimeType = mediaRecorder.mimeType || preferredType;
    recordingStartedAt = Date.now();

    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      clearTimeout(recordingTimer);
      stream.getTracks().forEach(track => track.stop());

      const blob = new Blob(audioChunks, {
        type: recordedAudioMimeType
      });

      recordedAudioDuration = (Date.now() - recordingStartedAt) / 1000;
      recordedAudioData = await blobToDataUrl(blob);

      $("startRecording").disabled = false;
      $("startRecording").classList.remove("recording");
      $("stopRecording").disabled = true;
      actualizarControlesAudio();
      $("statusText").textContent = "Cambios sin guardar";
    };

    mediaRecorder.start(250);

    $("startRecording").disabled = true;
    $("startRecording").classList.add("recording");
    $("stopRecording").disabled = false;
    $("voiceStatus").textContent = "Grabando... habla con calma 🎙️";

    recordingTimer = setTimeout(() => {
      if (mediaRecorder?.state === "recording") {
        mediaRecorder.stop();
      }
    }, 30000);
  } catch (error) {
    console.error(error);
    alert("No se pudo usar el micrófono. Revisa el permiso del navegador.");
  }
};

$("stopRecording").onclick = () => {
  if (mediaRecorder?.state === "recording") {
    mediaRecorder.stop();
  }
};

$("playRecording").onclick = () => {
  if (!recordedAudioData) return;
  $("voicePreview").play();
};

$("deleteRecording").onclick = async () => {
  if (!recordedAudioData) return;
  if (!confirm("¿Quieres borrar esta grabación?")) return;

  const libroId = $("bookId").value;

  if (libroId) {
    await Academia.biblioteca.audio.eliminar(libroId);
  }

  if (currentBook?.id === libroId) {
    currentBook.hasAudio = false;
  }

  recordedAudioData = "";
  recordedAudioDuration = 0;
  actualizarControlesAudio();
  $("statusText").textContent = "Cambios sin guardar";
};

    function validateBook(book){
      if(!book.title){
        alert("Escribe el título del libro 📖");
        $("title").focus();
        return false;
      }

      return true;
    }

    function openTab(name){
      document.querySelectorAll(".panel").forEach(panel=>panel.classList.add("hidden"));
      $(name).classList.remove("hidden");

      document.querySelectorAll(".tab").forEach(tab=>{
        tab.classList.toggle("active",tab.dataset.tab===name);
      });

      if(name==="library") renderBooks();

      scrollTo({top:0,behavior:"smooth"});
    }

    document.querySelectorAll(".tab").forEach(tab=>{
      tab.onclick=()=>openTab(tab.dataset.tab);
    });

$("addBookFromLibrary").onclick = () => {
  $("newBook").click();
  openTab("new");
};

    document.querySelectorAll(".star").forEach(button=>{
      button.onclick=()=>{
        const value=Number(button.dataset.value);
        $("rating").value=value;
        updateStars(value);
        $("statusText").textContent="Cambios sin guardar";
      };
    });

    function updateStars(value){
      document.querySelectorAll(".star").forEach(button=>{
        button.classList.toggle("active",Number(button.dataset.value)<=value);
      });
    }

    fields.forEach(id=>{
      $(id).addEventListener("input",()=>{
        $("statusText").textContent="Cambios sin guardar";
      });
    });

$("bookForm").onsubmit = async event => {
  event.preventDefault();

  const book = bookData();
  if (!validateBook(book)) return;

  const button = event.submitter;

  try {
    if (button) button.disabled = true;
    $("statusText").textContent = "Guardando...";

    if (book.id) {
      await Academia.biblioteca.actualizar(book.id, book);
    } else {
      const id = await Academia.biblioteca.guardar(book);
      $("bookId").value = id;
      book.id = id;
    }

    await guardarAudioActual(book.id);

    $("statusText").textContent = "Guardado ✅";
    await showBook(book);
    alert("¡Libro guardado en tu biblioteca! 📚");
  } catch (error) {
    console.error(error);
    $("statusText").textContent = "No se pudo guardar";
    alert(`No se pudo guardar el libro.\n${error.message}`);
  } finally {
    if (button) button.disabled = false;
  }
};

    $("newBook").onclick=()=>{
      $("bookForm").reset();
      $("bookId").value="";
      $("rating").value="0";
      $("coverImage").value="";
      $("coverFile").value="";
      mostrarVistaPreviaCaratula();
      recordedAudioData = "";
      recordedAudioDuration = 0;
      actualizarControlesAudio();
      updateStars(0);
      $("statusText").textContent="Sin guardar";
      $("title").focus();
    };

    $("previewBook").onclick=async ()=>{
      const book=bookData();
      if(!validateBook(book))return;
      await showBook(book);
      openTab("detail");
    };

    function renderBooks(filter=""){
      const filteredBooks = books.filter(book=>{
        const text=[
          book.title,book.author,book.favoriteCharacter,book.readingStatus
        ].join(" ").toLowerCase();

        return text.includes(filter.toLowerCase());
      });

      const grid=$("bookGrid");
      grid.innerHTML="";
      $("emptyLibrary").classList.toggle("hidden", filteredBooks.length > 0);

      filteredBooks.forEach(book=>{
        const article=document.createElement("article");
        article.className="book";

        const badgeClass=
          book.readingStatus==="Terminado"?"status-finished":
          book.readingStatus==="Quiero leer"?"status-wish":"status-reading";

        article.innerHTML=`
          ${
            book.coverImage
              ? `<img class="book-cover-image" src="${book.coverImage}" alt="Carátula de ${escapeHtml(book.title)}">`
              : `<div class="cover">📘</div>`
          }
          <div style="display:flex;justify-content:space-between;gap:8px;align-items:center">
            <span class="badge ${badgeClass}">${escapeHtml(book.readingStatus)}</span>
            ${book.hasAudio ? '<span class="badge audio-badge" title="Este libro tiene una grabación">🎙️ Audio</span>' : ''}
          </div>
          <h3 style="font-size:24px;margin:10px 0 4px">${escapeHtml(book.title)}</h3>
          <p class="help">${escapeHtml(book.author||"Autor no indicado")}</p>
          <div style="font-size:22px;margin:8px 0">${"⭐".repeat(book.rating||0)}</div>
          <div class="actions">
            <button class="btn blue read">Ver</button>
            <button class="btn light edit">Editar</button>
            <button class="btn red delete">Eliminar</button>
          </div>
        `;

        article.querySelector(".read").onclick = async () => {
          await showBook(book);
          openTab("detail");
        };

        article.querySelector(".edit").onclick = async () => {
          await loadBook(book);
          openTab("new");
        };

        article.querySelector(".delete").onclick = async () => {
          if (!confirm("¿Quieres eliminar este libro?")) return;

          try {
            await Academia.biblioteca.eliminar(book.id);
          } catch (error) {
            console.error(error);
            alert(`No se pudo eliminar el libro.\n${error.message}`);
          }
        };

        grid.appendChild(article);
      });
    }

    async function loadBook(book){
      currentBook = book;
      $("bookId").value=book.id;

      fields.forEach(id=>{
        $(id).value=book[id]??"";
      });

      $("coverFile").value = "";
      mostrarVistaPreviaCaratula(book.coverImage || "");
      updateStars(book.rating||0);
      await cargarAudioLibro(book.id);
      $("statusText").textContent="Guardado ✅";
    }

    async function showBook(book){
      currentBook=book;

      $("detailEmpty").classList.add("hidden");
      $("detailContent").classList.remove("hidden");

      const badgeClass=
        book.readingStatus==="Terminado"?"status-finished":
        book.readingStatus==="Quiero leer"?"status-wish":"status-reading";

      if (book.coverImage) {
        $("detailCoverImage").src = book.coverImage;
        $("detailCoverImage").classList.remove("hidden");
        $("detailCoverFallback").classList.add("hidden");
      } else {
        $("detailCoverImage").removeAttribute("src");
        $("detailCoverImage").classList.add("hidden");
        $("detailCoverFallback").classList.remove("hidden");
      }

      $("detailStatus").className="badge "+badgeClass;
      $("detailStatus").textContent=book.readingStatus;
      $("detailTitle").textContent=book.title;
      $("detailAuthor").textContent=book.author||"Autor no indicado";
      $("detailStars").textContent="⭐".repeat(book.rating||0) || "Sin valoración todavía";
      $("detailCharacter").textContent=book.favoriteCharacter||"No indicado";
      $("detailFavorite").textContent=book.favoritePart||"No indicado";
      $("detailLearning").textContent=book.learning||"No indicado";
      $("detailWords").textContent=book.newWords||"No hay palabras guardadas";
      $("detailReview").textContent=book.review||"Reseña pendiente";

      try {
        const audio = book.id
          ? await Academia.biblioteca.audio.leer(book.id)
          : null;

        if (audio?.audioData) {
          $("detailVoiceAudio").src = audio.audioData;
          $("detailVoiceDuration").textContent =
            `Duración: ${formatDuration(audio.duration || 0)}`;
          $("detailVoiceSection").classList.remove("hidden");
        } else {
          $("detailVoiceAudio").removeAttribute("src");
          $("detailVoiceDuration").textContent = "";
          $("detailVoiceSection").classList.add("hidden");
        }
      } catch (error) {
        console.error(error);
        $("detailVoiceSection").classList.add("hidden");
      }
    }

    $("searchBook").oninput=event=>{
      renderBooks(event.target.value);
    };

function updateCount(){
  const count = books.length;
  const reading = books.filter(book => book.readingStatus === "Leyendo").length;
  const finished = books.filter(book => book.readingStatus === "Terminado").length;
  const rated = books.filter(book => Number(book.rating) > 0);
  const average = rated.length
    ? rated.reduce((sum, book) => sum + Number(book.rating || 0), 0) / rated.length
    : 0;

  $("bookCount").textContent = count;
  $("statTotal").textContent = count;
  $("statReading").textContent = reading;
  $("statFinished").textContent = finished;
  $("statRating").textContent = average.toFixed(1);

  let message = "Tu biblioteca empieza con un libro.";
  if(count >= 1) message = "¡Ya tienes tu primera lectura guardada! 🌱";
  if(count >= 3) message = "¡Tu estantería está creciendo! 📚";
  if(count >= 5) message = "¡Eres una gran exploradora de historias! ✨";
  if(count >= 10) message = "¡Biblioteca poderosa! 🌟";

  $("readerMessage").textContent = message;
}

    $("speakReview").onclick=()=>{
      if(!currentBook||!("speechSynthesis" in window))return;

      speechSynthesis.cancel();

      const text=[
        currentBook.title,
        currentBook.author ? "Escrito por "+currentBook.author : "",
        currentBook.review,
        currentBook.learning
      ].filter(Boolean).join(". ");

      const utterance=new SpeechSynthesisUtterance(text);
      utterance.lang="es-ES";
      utterance.rate=.9;
      speechSynthesis.speak(utterance);
    };

    $("stopSpeech").onclick=()=>{
      if("speechSynthesis" in window)speechSynthesis.cancel();
    };

    $("exportBooks").onclick=()=>{
      const blob=new Blob(
        [JSON.stringify(books, null, 2)],
        {type:"application/json"}
      );

      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="biblioteca-gloria.json";
      link.click();
      URL.revokeObjectURL(link.href);
    };

$("importBooks").onchange = async event => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const imported = JSON.parse(await file.text());

    if (!Array.isArray(imported)) {
      throw new Error("El archivo no contiene una lista de libros.");
    }

    if (!confirm(`Se importarán ${imported.length} libro(s). ¿Continuar?`)) {
      return;
    }

    for (const book of imported) {
      await Academia.biblioteca.guardar({
        ...book,
        id: undefined
      });
    }

    alert("Biblioteca importada correctamente ✨");
  } catch (error) {
    console.error(error);
    alert(`El archivo no es válido.\n${error.message}`);
  }

  event.target.value = "";
};

    function escapeHtml(value=""){
      return value.replace(/[&<>"']/g,char=>({
        "&":"&amp;",
        "<":"&lt;",
        ">":"&gt;",
        '"':"&quot;",
        "'":"&#039;"
      })[char]);
    }

    renderBooks();
    updateCount();


mostrarVistaPreviaCaratula();
actualizarControlesAudio();

async function iniciarBiblioteca() {
  await auth.authStateReady();

  if (!auth.currentUser) {
    window.location.replace("/academia-gloria/login.html");
    return;
  }

  detenerObservacion = Academia.biblioteca.observar(
    librosFirestore => {
      books = librosFirestore;
      renderBooks($("searchBook").value);
      updateCount();
    },
    error => {
      console.error(error);
      alert(`No se pudo cargar la biblioteca.\n${error.message}`);
    }
  );
}

iniciarBiblioteca();

window.addEventListener("beforeunload", () => {
  if (typeof detenerObservacion === "function") {
    detenerObservacion();
  }
});
