/* ==========================================================
   Academia de Gloria Valentina
   Navegación común
   ========================================================== */

window.Academia = window.Academia || {};

Academia.volver = function (rutaAlternativa = "./") {

    if (document.referrer && window.history.length > 1) {
        window.history.back();
        return;
    }

    window.location.href = rutaAlternativa;
};

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("[data-accion-volver]").forEach((boton) => {

        boton.addEventListener("click", () => {

            Academia.volver(
                boton.dataset.rutaAlternativa || "./"
            );

        });

    });

});
