

(async function () {

    "use strict";


    /* =====================================================
       PREVENT DUPLICATE INITIALIZATION
    ===================================================== */

    if (
        window.__GRID_COMPONENT_LOADER_INITIALIZED__
    ) {

        return;

    }


    window.__GRID_COMPONENT_LOADER_INITIALIZED__ =
        true;


    /* =====================================================
       COMPONENT LIST
    ===================================================== */

    const components = [

        [
            "navbar-component",
            "components/navbar.html"
        ],

        [
            "footer-component",
            "components/footer.html"
        ],

        [
            "floating-component",
            "components/floating.html"
        ]

    ];


    /* =====================================================
       COMPONENT LOADING STATE
       -----------------------------------------------------
       IMPORTANT:
       Body ko hide nahi karna.
       Sirf HTML state maintain karni hai.
    ===================================================== */

    document.documentElement.classList.add(
        "grid-components-loading"
    );


    /* =====================================================
       LOAD CSS ONCE
    ===================================================== */

    function loadCSS(file) {

        return new Promise(
            function (resolve, reject) {

                const existing =
                    document.querySelector(
                        `link[data-grid-component-css="${file}"]`
                    );


                /* =========================================
                   CSS ALREADY EXISTS
                ========================================= */

                if (existing) {

                    /*
                     * Browser may already have loaded it.
                     */

                    if (
                        existing.sheet
                    ) {

                        resolve();

                        return;

                    }


                    existing.addEventListener(
                        "load",
                        function () {

                            resolve();

                        },
                        {
                            once: true
                        }
                    );


                    existing.addEventListener(
                        "error",
                        function () {

                            reject(
                                new Error(
                                    `Could not load ${file}`
                                )
                            );

                        },
                        {
                            once: true
                        }
                    );


                    return;

                }


                /* =========================================
                   CREATE STYLESHEET
                ========================================= */

                const link =
                    document.createElement("link");


                link.rel =
                    "stylesheet";


                link.href =
                    file;


                link.dataset.gridComponentCss =
                    file;


                link.onload =
                    function () {

                        resolve();

                    };


                link.onerror =
                    function () {

                        console.error(
                            `Grid Detailing: Could not load CSS ${file}`
                        );


                        reject(
                            new Error(
                                `Could not load ${file}`
                            )
                        );

                    };


                document.head.appendChild(
                    link
                );

            }
        );

    }


    /* =====================================================
       LOAD JAVASCRIPT ONCE
    ===================================================== */

    function loadJS(file) {

        return new Promise(
            function (resolve, reject) {

                const existing =
                    document.querySelector(
                        `script[data-grid-component-js="${file}"]`
                    );


                /* =========================================
                   SCRIPT ALREADY EXISTS
                ========================================= */

                if (existing) {

                    if (
                        existing.dataset.loaded ===
                        "true"
                    ) {

                        resolve();

                        return;

                    }


                    existing.addEventListener(
                        "load",
                        function () {

                            resolve();

                        },
                        {
                            once: true
                        }
                    );


                    existing.addEventListener(
                        "error",
                        function () {

                            reject(
                                new Error(
                                    `Could not load ${file}`
                                )
                            );

                        },
                        {
                            once: true
                        }
                    );


                    return;

                }


                /* =========================================
                   CREATE SCRIPT
                ========================================= */

                const script =
                    document.createElement("script");


                script.src =
                    file;


                script.dataset.gridComponentJs =
                    file;


                /*
                 * Keep execution order stable.
                 */

                script.async =
                    false;


                script.onload =
                    function () {

                        script.dataset.loaded =
                            "true";


                        resolve();

                    };


                script.onerror =
                    function () {

                        console.error(
                            `Grid Detailing: Could not load JS ${file}`
                        );


                        reject(
                            new Error(
                                `Could not load ${file}`
                            )
                        );

                    };


                document.body.appendChild(
                    script
                );

            }
        );

    }


    /* =====================================================
       LOAD HTML COMPONENT
    ===================================================== */

    async function loadComponent(
        targetId,
        file
    ) {

        const target =
            document.getElementById(
                targetId
            );


        /* =========================================
           TARGET NOT FOUND
        ========================================= */

        if (!target) {

            console.warn(
                `Grid Detailing: #${targetId} not found.`
            );


            return false;

        }


        try {

            const response =
                await fetch(
                    file,
                    {
                        cache: "default"
                    }
                );


            /* =========================================
               HTTP ERROR
            ========================================= */

            if (
                !response.ok
            ) {

                throw new Error(
                    `${file}: ${response.status}`
                );

            }


            const html =
                await response.text();


            /*
             * Inject component.
             */

            target.innerHTML =
                html;


            return true;


        } catch (error) {

            console.error(
                `Grid Detailing: Could not load ${file}`,
                error
            );


            /*
             * Keep page usable even if
             * one optional component fails.
             */

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

            currentPage =
                "index.html";

        }


        /* =================================================
           REMOVE OLD ACTIVE STATES
        ================================================= */

        document
            .querySelectorAll(
                ".grid-nav-item, .grid-service-link"
            )
            .forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );


                    item.removeAttribute(
                        "aria-current"
                    );

                }
            );


        /* =================================================
           CONTACT
        ================================================= */

        if (
            currentPage ===
                "contact-us.html" ||
            currentPage ===
                "contact.html"
        ) {

            const contactLink =
                document.querySelector(
                    'a[data-page="contact-us.html"]'
                );


            /*
             * Check whether the user arrived
             * through GET A QUOTE.
             */

            const source =
                sessionStorage.getItem(
                    "gridNavbarActiveSource"
                );


            if (
                source ===
                "quote"
            ) {

                return;

            }


            if (contactLink) {

                contactLink.classList.add(
                    "active"
                );


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

        if (
            currentPage ===
            "blog.html"
        ) {

            const blogLink =
                document.querySelector(
                    'a[data-page="blog.html"]'
                );


            if (blogLink) {

                blogLink.classList.add(
                    "active"
                );


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

        if (
            currentPage ===
            "projects.html"
        ) {

            const projectsLink =
                document.querySelector(
                    'a[data-page="projects.html"]'
                );


            if (projectsLink) {

                projectsLink.classList.add(
                    "active"
                );


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
            currentPage ===
                "about.html" ||
            currentPage ===
                "about-us.html"
        ) {

            const aboutLink =
                document.querySelector(
                    '[data-page="about.html"]'
                );


            if (aboutLink) {

                aboutLink.classList.add(
                    "active"
                );


                aboutLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            return;

        }


        /* =================================================
           HOW WE WORK
        ================================================= */

        if (
            currentPage ===
            "how-we-work.html"
        ) {

            const howWeWorkLink =
                document.querySelector(
                    'a[data-page="how-we-work.html"]'
                );


            if (howWeWorkLink) {

                howWeWorkLink.classList.add(
                    "active"
                );


                howWeWorkLink.setAttribute(
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

            const servicesButton =
                document.getElementById(
                    "gridServicesBtn"
                );


            const serviceLink =
                document.querySelector(
                    '[data-page="structural-steel-detailing.html"]'
                );


            if (servicesButton) {

                servicesButton.classList.add(
                    "active"
                );

            }


            if (serviceLink) {

                serviceLink.classList.add(
                    "active"
                );


                serviceLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            return;

        }


        /* =================================================
           HOME
        ================================================= */

        if (
            currentPage ===
            "index.html"
        ) {

            const homeLink =
                document.querySelector(
                    'a[data-page="index.html"]'
                );


            if (homeLink) {

                homeLink.classList.add(
                    "active"
                );


                homeLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        }

    }


    /* =====================================================
       MARK COMPONENTS READY
    ===================================================== */

    function componentsReady() {

        document.documentElement.classList.remove(
            "grid-components-loading"
        );


        document.documentElement.classList.add(
            "grid-components-ready"
        );

    }


    /* =====================================================
       MAIN LOADING FLOW
    ===================================================== */

    try {

        /* =================================================
           STEP 1
           LOAD NAVBAR CSS FIRST
        ================================================= */

        await loadCSS(
            "css/navbar.css"
        );


        /* =================================================
           STEP 2
           LOAD HTML COMPONENTS
        ================================================= */

        await Promise.all(

            components.map(
                function ([targetId, file]) {

                    return loadComponent(
                        targetId,
                        file
                    );

                }
            )

        );


        /* =================================================
           STEP 3
           LOAD NAVBAR JS
        ================================================= */

        await loadJS(
            "js/navbar.js"
        );


        /* =================================================
           STEP 4
           ACTIVE NAVIGATION
        ================================================= */

        setActiveNavigation();


        /* =================================================
           STEP 5
           LOAD MAIN JS
        ================================================= */

        await loadJS(
            "js/main.js"
        );


        /* =================================================
           STEP 6
           FINAL ACTIVE NAVIGATION
        ================================================= */

        setActiveNavigation();


        /* =================================================
           STEP 7
           COMPONENTS READY
        ================================================= */

        componentsReady();


    } catch (error) {

        console.error(
            "Grid Detailing component loading error:",
            error
        );


        /*
         * IMPORTANT:
         * Never leave the website in a
         * blocked/hidden state.
         */

        componentsReady();

    }

})();
