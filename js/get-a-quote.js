/* =========================================================
   GRID DETAILING — GET A QUOTE MODAL
   GLOBAL / CURRENT PAGE MODAL
   ========================================================= */

(function () {

    "use strict";


    /* -----------------------------------------------------
       GLOBAL FUNCTIONS
       Navbar.js inhe call karega.
    ----------------------------------------------------- */

    window.openQuoteModal = function () {

        const overlay =
            document.getElementById("quoteOverlay");


        if (!overlay) {

            console.error(
                "GRID DETAILING: #quoteOverlay not found."
            );

            return;

        }


        overlay.classList.remove("closing");

        overlay.classList.add("is-open");

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );


        document.documentElement.classList.add(
            "quote-modal-active"
        );

        document.body.classList.add(
            "quote-modal-open"
        );


        /* ---------------------------------------------
           FOCUS FIRST FIELD
        --------------------------------------------- */

        setTimeout(function () {

            const firstField =
                document.getElementById("fullName");


            if (firstField) {

                firstField.focus();

            }

        }, 250);

    };


    /* -----------------------------------------------------
       CLOSE MODAL
    ----------------------------------------------------- */

    window.closeQuoteModal = function () {

        const overlay =
            document.getElementById("quoteOverlay");


        if (!overlay) return;


        overlay.classList.add("closing");


        setTimeout(function () {

            overlay.classList.remove("is-open");
            overlay.classList.remove("closing");


            overlay.setAttribute(
                "aria-hidden",
                "true"
            );


            document.documentElement.classList.remove(
                "quote-modal-active"
            );

            document.body.classList.remove(
                "quote-modal-open"
            );

        }, 180);

    };


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function initQuoteModal() {

        const overlay =
            document.getElementById("quoteOverlay");

        const modal =
            document.getElementById("quoteModal");

        const closeBtn =
            document.getElementById("quoteClose");

        const form =
            document.getElementById("quoteForm");


        /* -------------------------------------------------
           MODAL NOT PRESENT ON THIS PAGE
        ------------------------------------------------- */

        if (!overlay || !modal) {

            return;

        }


        /* =================================================
           INITIAL STATE
           ================================================= */

        overlay.classList.remove("is-open");
        overlay.classList.remove("closing");

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );


        /* =================================================
           CLOSE BUTTON
           ================================================= */

        if (closeBtn) {

            closeBtn.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    window.closeQuoteModal();

                }
            );

        }


        /* =================================================
           CLICK OUTSIDE MODAL
           ================================================= */

        overlay.addEventListener(
            "click",
            function (event) {

                if (event.target === overlay) {

                    window.closeQuoteModal();

                }

            }
        );


        /* =================================================
           ESC KEY
           ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    overlay.classList.contains("is-open")
                ) {

                    window.closeQuoteModal();

                }

            }
        );


        /* =================================================
           COUNTRY / PHONE
           ================================================= */

        const countrySelect =
            document.getElementById("phoneCountry");

        const phoneInput =
            document.getElementById("phone");


        function updatePhoneFlag() {

            if (!countrySelect) return;


            const selected =
                countrySelect.options[
                    countrySelect.selectedIndex
                ];


            const code =
                selected ?
                selected.dataset.code :
                "";


            const flag =
                document.getElementById("phoneFlag");


            if (
                flag &&
                code
            ) {

                flag.src =
                    "https://flagcdn.com/24x18/" +
                    code +
                    ".png";

                flag.alt =
                    selected.textContent.trim();

            }

        }


        if (countrySelect) {

            countrySelect.addEventListener(
                "change",
                updatePhoneFlag
            );


            updatePhoneFlag();

        }


        /* =================================================
           PHONE INPUT CLEANING
           ================================================= */

        if (phoneInput) {

            phoneInput.addEventListener(
                "input",
                function () {

                    this.value =
                        this.value.replace(
                            /[^0-9+\-\s()]/g,
                            ""
                        );

                }
            );

        }


        /* =================================================
           DELIVERY DATE
           ================================================= */

        const deliveryDate =
            document.getElementById(
                "deliveryDate"
            );


        if (deliveryDate) {

            const today =
                new Date();


            const year =
                today.getFullYear();


            const month =
                String(
                    today.getMonth() + 1
                ).padStart(2, "0");


            const day =
                String(
                    today.getDate()
                ).padStart(2, "0");


            deliveryDate.min =
                `${year}-${month}-${day}`;

        }


        /* =================================================
           FORM VALIDATION
           ================================================= */

        if (form) {

            const fields =
                form.querySelectorAll(
                    "input, select, textarea"
                );


            fields.forEach(function (field) {

                field.addEventListener(
                    "input",
                    function () {

                        this.classList.remove(
                            "field-error"
                        );

                    }
                );


                field.addEventListener(
                    "change",
                    function () {

                        this.classList.remove(
                            "field-error"
                        );

                    }
                );

            });


            /* ---------------------------------------------
               FORM SUBMIT
            --------------------------------------------- */

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    let valid = true;


                    const requiredFields =
                        form.querySelectorAll(
                            "[required]"
                        );


                    requiredFields.forEach(
                        function (field) {

                            let fieldValid =
                                true;


                            if (
                                field.type ===
                                "checkbox"
                            ) {

                                fieldValid =
                                    field.checked;

                            } else {

                                fieldValid =
                                    field.value.trim() !== "";

                            }


                            if (!fieldValid) {

                                field.classList.add(
                                    "field-error"
                                );

                                valid = false;

                            }

                        }
                    );


                    if (!valid) {

                        const firstError =
                            form.querySelector(
                                ".field-error"
                            );


                        if (firstError) {

                            firstError.focus();

                        }


                        return;

                    }


                    /* -------------------------------------
                       SUBMIT BUTTON
                    ------------------------------------- */

                    const submitBtn =
                        form.querySelector(
                            ".quote-submit"
                        );


                    const originalText =
                        submitBtn ?
                        submitBtn.innerHTML :
                        "";


                    if (submitBtn) {

                        submitBtn.disabled = true;

                        submitBtn.innerHTML =
                            "SUBMITTING...";

                    }


                    /* -------------------------------------
                       DEMO SUCCESS
                    ------------------------------------- */

                    setTimeout(
                        function () {

                            if (submitBtn) {

                                submitBtn.disabled =
                                    false;

                                submitBtn.innerHTML =
                                    originalText;

                            }


                            const message =
                                document.getElementById(
                                    "quoteFormMessage"
                                );


                            if (message) {

                                message.textContent =
                                    "Thank you. Your project inquiry has been received.";

                                message.classList.add(
                                    "is-visible"
                                );

                            }


                            form.reset();


                            if (countrySelect) {

                                countrySelect.value =
                                    "ca";

                                updatePhoneFlag();

                            }


                        },
                        1200
                    );

                }
            );

        }


        /* =================================================
           OPTIONAL AUTO OPEN
           
           IMPORTANT:
           Only if current page itself is get-a-quote.html.
           Normal pages do NOT auto-open.
        ================================================= */

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        if (
            currentPage ===
            "get-a-quote.html"
        ) {

            setTimeout(
                function () {

                    window.openQuoteModal();

                },
                100
            );

        }

    }


    /* =====================================================
       START
       ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initQuoteModal
        );

    } else {

        initQuoteModal();

    }

})();