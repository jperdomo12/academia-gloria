import { Academia } from "../../compartido/api/academia.js";

    const KEY="academiaGloriaBooksV1";
    let currentBook=null;

    const $=id=>document.getElementById(id);

    const fields=[
      "title","author","readingStatus","favoriteCharacter",
      "rating","favoritePart","learning","newWords","review"
    ];

    function getBooks(){
      try{
        return JSON.parse(localStorage.getItem(KEY)) || [];
      }catch{
        return [];
      }
    }

    function setBooks(books){
      localStorage.setItem(KEY, JSON.stringify(books));
    }

    function makeId(){
      return Date.now()+"-"+Math.random().toString(16).slice(2);
    }

    function bookData(){
      return{
        id:$("bookId").value||makeId(),
        title:$("title").value.trim(),
        author:$("author").value.trim(),
        readingStatus:$("readingStatus").value,
        favoriteCharacter:$("favoriteCharacter").value.trim(),
        rating:Number($("rating").value)||0,
        favoritePart:$("favoritePart").value.trim(),
        learning:$("learning").value.trim(),
        newWords:$("newWords").value.trim(),
        review:$("review").value.trim(),
        updatedAt:new Date().toISOString()
      };
    }

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

    $("bookForm").onsubmit=event=>{
      event.preventDefault();

      const book=bookData();
      if(!validateBook(book))return;

      const books=getBooks();
      const index=books.findIndex(item=>item.id===book.id);

      if(index>=0){
        book.createdAt=books[index].createdAt;
        books[index]=book;
      }else{
        book.createdAt=book.updatedAt;
        books.unshift(book);
      }

      setBooks(books);
      $("bookId").value=book.id;
      $("statusText").textContent="Guardado ✅";

      renderBooks();
      showBook(book);
      updateCount();

      alert("¡Libro guardado en tu biblioteca! 📚");
    };

    $("newBook").onclick=()=>{
      $("bookForm").reset();
      $("bookId").value="";
      $("rating").value="0";
      updateStars(0);
      $("statusText").textContent="Sin guardar";
      $("title").focus();
    };

    $("previewBook").onclick=()=>{
      const book=bookData();
      if(!validateBook(book))return;
      showBook(book);
      openTab("detail");
    };

    function renderBooks(filter=""){
      const books=getBooks().filter(book=>{
        const text=[
          book.title,book.author,book.favoriteCharacter,book.readingStatus
        ].join(" ").toLowerCase();

        return text.includes(filter.toLowerCase());
      });

      const grid=$("bookGrid");
      grid.innerHTML="";
      $("emptyLibrary").classList.toggle("hidden",books.length>0);

      books.forEach(book=>{
        const article=document.createElement("article");
        article.className="book";

        const badgeClass=
          book.readingStatus==="Terminado"?"status-finished":
          book.readingStatus==="Quiero leer"?"status-wish":"status-reading";

        article.innerHTML=`
          <div class="cover">📘</div>
          <span class="badge ${badgeClass}">${escapeHtml(book.readingStatus)}</span>
          <h3 style="font-size:24px;margin:10px 0 4px">${escapeHtml(book.title)}</h3>
          <p class="help">${escapeHtml(book.author||"Autor no indicado")}</p>
          <div style="font-size:22px;margin:8px 0">${"⭐".repeat(book.rating||0)}</div>
          <div class="actions">
            <button class="btn blue read">Ver</button>
            <button class="btn light edit">Editar</button>
            <button class="btn red delete">Eliminar</button>
          </div>
        `;

        article.querySelector(".read").onclick=()=>{
          showBook(book);
          openTab("detail");
        };

        article.querySelector(".edit").onclick=()=>{
          loadBook(book);
          openTab("new");
        };

        article.querySelector(".delete").onclick=()=>{
          if(!confirm("¿Quieres eliminar este libro?"))return;

          setBooks(getBooks().filter(item=>item.id!==book.id));
          renderBooks($("searchBook").value);
          updateCount();
        };

        grid.appendChild(article);
      });
    }

    function loadBook(book){
      $("bookId").value=book.id;

      fields.forEach(id=>{
        $(id).value=book[id]??"";
      });

      updateStars(book.rating||0);
      $("statusText").textContent="Guardado ✅";
    }

    function showBook(book){
      currentBook=book;

      $("detailEmpty").classList.add("hidden");
      $("detailContent").classList.remove("hidden");

      const badgeClass=
        book.readingStatus==="Terminado"?"status-finished":
        book.readingStatus==="Quiero leer"?"status-wish":"status-reading";

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
    }

    $("searchBook").oninput=event=>{
      renderBooks(event.target.value);
    };

    function updateCount(){
      const count=getBooks().length;
      $("bookCount").textContent=count;

      let message="Tu biblioteca empieza con un libro.";
      if(count>=1)message="¡Ya tienes tu primera lectura guardada! 🌱";
      if(count>=3)message="¡Tu estantería está creciendo! 📚";
      if(count>=5)message="¡Eres una gran exploradora de historias! ✨";
      if(count>=10)message="¡Biblioteca poderosa! 🌟";

      $("readerMessage").textContent=message;
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
        [JSON.stringify(getBooks(),null,2)],
        {type:"application/json"}
      );

      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="biblioteca-gloria.json";
      link.click();
      URL.revokeObjectURL(link.href);
    };

    $("importBooks").onchange=async event=>{
      const file=event.target.files[0];
      if(!file)return;

      try{
        const imported=JSON.parse(await file.text());

        if(!Array.isArray(imported))throw new Error();

        setBooks(imported);
        renderBooks();
        updateCount();

        alert("Biblioteca importada correctamente ✨");
      }catch{
        alert("El archivo no es válido.");
      }

      event.target.value="";
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
