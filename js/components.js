/* =========================================================
   GRID STEEL DETAILING
   COMPONENT LOADER
   GitHub Pages Safe / No Duplicate Loading
   Navbar + Footer + Floating Components
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       DUPLICATE LOAD PROTECTION
    ===================================================== */

    if (window.__GRID_COMPONENTS_INITIALIZED__) {
        return;
    }

    window.__GRID_COMPONENTS_INITIALIZED__ = true;


    /* =====================================================
       COMPONENTS
    ===================================================== */

    const components = [
        ["navbar-component", "components/navbar.html"],
        ["footer-component", "components/footer.html"],
        ["floating-component", "components/floating.html"]
    ];


    /* =====================================================
       HTML LOADING STATE
    ===================================================== */

    document.documentElement.classList.add(
        "grid-components-loading"
    );


    /* =====================================================
       LOAD COMPONENT
    ===================================================== */

    async function loadInto(targetId, file) {

        const target =
            document.getElementById(targetId);


        if (!target) {

            console.warn(
                `Grid Detailing: #${targetId} not found.`
            );

            return false;
        }


        try {

            const response =
                await fetch(file, {
                    method: "GET",
                    cache: "default"
                });


            if (!response.ok) {

                throw new Error(
                    `${file}: HTTP ${response.status}`
                );

            }


            const html =
                await response.text();


            /*
             * Inject only after the complete
             * component file has been received.
             */

            target.innerHTML = html;


            target.classList.add(
                "grid-component-loaded"
            );


            return true;


        } catch (error) {

            console.error(
                `Grid Detailing: Could not load ${file}`,
                error
            );


            target.classList.add(
                "grid-component-error"
            );


            return false;

        }

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function setActiveNavigation() {

        let currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        if (!currentPage) {
            currentPage = "index.html";
        }


        /*
         * Remove previous active states
         */

        document
            .querySelectorAll(
                ".nav-item, .nav-dropdown-wrap, .service-menu-card, " +
                ".grid-nav-links a, .grid-quote-btn"
            )
            .forEach(item => {

                item.classList.remove("active");

                item.removeAttribute(
                    "aria-current"
                );

            });


        /* =================================================
           SERVICES
        ================================================= */

        const servicesButton =
            document.querySelector(
                ".nav-dropdown-btn"
            );


        const servicesWrap =
            document.querySelector(
                ".nav-dropdown-wrap"
            );


        if (servicesButton) {

            servicesButton.classList.remove(
                "active"
            );

            servicesButton.setAttribute(
                "aria-expanded",
                "false"
            );

            servicesButton.removeAttribute(
                "aria-current"
            );

        }


        if (servicesWrap) {

            servicesWrap.classList.remove(
                "active"
            );

        }


        /* =================================================
           CONTACT
        ================================================= */

        if (
            currentPage === "contact-us.html" ||
            currentPage === "contact.html"
        ) {

            const contactLink =
                document.querySelector(
                    '[data-page="contact-us.html"], ' +
                    'a[href="contact-us.html"], ' +
                    'a[href*="contact-us.html"]'
                );


            if (contactLink) {

                contactLink.classList.add("active");

                contactLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }

            return;
        }


        /* =================================================
           BLOG
        ================================================= */

        if (currentPage === "blog.html") {

            const blogLink =
                document.querySelector(
                    'a[href="blog.html"]'
                );


            if (blogLink) {

                blogLink.classList.add("active");

                blogLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }

            return;
        }


        /* =================================================
           PROJECTS
        ================================================= */

        if (currentPage === "projects.html") {

            const projectsLink =
                document.querySelector(
                    'a[href="projects.html"]'
                );


            if (projectsLink) {

                projectsLink.classList.add("active");

                projectsLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }

            return;
        }


        /* =================================================
           ABOUT
        ================================================= */

        if (
            currentPage === "about.html" ||
            currentPage === "about-us.html"
        ) {

            const aboutLink =
                document.querySelector(
                    'a[href="about.html"], ' +
                    'a[href="about-us.html"]'
                );


            if (aboutLink) {

                aboutLink.classList.add("active");

                aboutLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }

            return;
        }


        /* =================================================
           STRUCTURAL STEEL DETAILING
        ================================================= */

        if (
            currentPage ===
            "structural-steel-detailing.html"
        ) {

            if (servicesButton) {

                servicesButton.classList.add(
                    "active"
                );

                servicesButton.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            if (servicesWrap) {

                servicesWrap.classList.add(
                    "active"
                );

            }


            const structuralSteelLink =
                document.querySelector(
                    '[data-page="structural-steel-detailing.html"], ' +
                    'a[href="structural-steel-detailing.html"]'
                );


            if (structuralSteelLink) {

                structuralSteelLink.classList.add(
                    "active"
                );

                structuralSteelLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }

            return;
        }


        /* =================================================
           HOME
        ================================================= */

        if (currentPage === "index.html") {

            const homeLink =
                document.querySelector(
                    'a[href="index.html#home"], ' +
                    'a[href="index.html"], ' +
                    'a[href="./index.html#home"], ' +
                    'a[href="./index.html"]'
                );


            if (homeLink) {

                homeLink.classList.add("active");

                homeLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        }

    }


    /* =====================================================
       LOAD MAIN JS
    ===================================================== */

    function loadMainJS() {

        /*
         * Prevent duplicate main.js loading.
         */

        if (
            document.querySelector(
                'script[data-grid-main-js="true"]'
            )
        ) {

            setActiveNavigation();

            return Promise.resolve();

        }


        return new Promise(function (resolve) {

            const script =
                document.createElement("script");


            script.src =
                "js/main.js";


            script.dataset.gridMainJs =
                "true";


            script.onload = function () {

                /*
                 * Give main.js one browser tick
                 * to initialize its event listeners.
                 */

                requestAnimationFrame(function () {

                    setActiveNavigation();

                    resolve();

                });

            };


            script.onerror = function () {

                console.error(
                    "Grid Detailing: js/main.js could not be loaded."
                );

                resolve();

            };


            document.body.appendChild(
                script
            );

        });

    }


    /* =====================================================
       FINISH PAGE
    ===================================================== */

    function finishComponents() {

        /*
         * Active navigation one final time.
         */

        setActiveNavigation();


        /*
         * Components are now available.
         */

        document.documentElement.classList.remove(
            "grid-components-loading"
        );


        document.documentElement.classList.add(
            "grid-components-ready"
        );


        /*
         * Signal to other scripts if needed.
         */

        document.dispatchEvent(
            new CustomEvent(
                "gridComponentsReady"
            )
        );

    }


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    async function initialize() {

        try {

            /*
             * Load navbar, footer and floating
             * components in parallel.
             */

            await Promise.all(
                components.map(function (component) {

                    return loadInto(
                        component[0],
                        component[1]
                    );

                })
            );


            /*
             * Navbar now exists.
             */

            setActiveNavigation();


            /*
             * Load main.js only after
             * components are injected.
             */

            await loadMainJS();


            /*
             * Final active-state pass.
             */

            setActiveNavigation();


        } catch (error) {

            console.error(
                "Grid Detailing component loading error:",
                error
            );

        } finally {

            /*
             * NEVER leave the page stuck
             * in loading state.
             */

            finishComponents();

        }

    }


    /* =====================================================
       START
    ===================================================== */

    initialize();


})();
