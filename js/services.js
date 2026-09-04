/* =========================================================
   GRID STEEL DETAILING
   SERVICES PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       SERVICE CARD REVEAL
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".services-page .service-card"
        );


    if (cards.length) {

        const revealObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const card = entry.target;

                        const index =
                            Array
                                .from(cards)
                                .indexOf(card);


                        setTimeout(function () {

                            card.classList.add("visible");

                        }, index * 110);


                        observer.unobserve(card);

                    });

                },

                {
                    threshold: 0.12
                }

            );


        cards.forEach(function (card) {

            revealObserver.observe(card);

        });

    }


    /* =====================================================
       SERVICE LINK CLICK PROTECTION
       Prevents accidental double click
    ===================================================== */

    const links =
        document.querySelectorAll(
            ".services-page .service-card, .services-page .cta-button"
        );


    links.forEach(function (link) {

        link.addEventListener("click", function () {

            if (this.dataset.clicked === "true") {
                return;
            }


            this.dataset.clicked = "true";


            setTimeout(function () {

                link.dataset.clicked = "false";

            }, 700);

        });

    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    cards.forEach(function (card) {

        card.addEventListener("keydown", function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                card.click();

            }

        });

    });


});