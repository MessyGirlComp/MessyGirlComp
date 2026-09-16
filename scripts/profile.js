// JavaScript Document
document.addEventListener("DOMContentLoaded", () => {

    /* =======================================================
       PROFILE PAGE
       MEGA Messy Tournament
       
       This script does NOT use girls-data.js.
       All contestant information is written directly
       into the individual HTML profile page.
    ======================================================= */


    /* =======================================================
       CAROUSEL
    ======================================================= */

    const carousel = document.getElementById("carousel");
    const carouselTrack = document.getElementById("carouselTrack");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const carouselDots = document.getElementById("carouselDots");

    if (carousel && carouselTrack) {

        const slides = Array.from(
            carouselTrack.querySelectorAll(".slide")
        );

        let currentSlide = 0;
        let autoPlayTimer = null;

        /* -----------------------------------------------
           Create dots
        ------------------------------------------------ */

        if (carouselDots) {

            slides.forEach((slide, index) => {

                const dot = document.createElement("button");

                dot.type = "button";
                dot.className = "carousel-dot";

                dot.setAttribute(
                    "aria-label",
                    `Show image ${index + 1}`
                );

                dot.addEventListener("click", () => {
                    showSlide(index);
                    restartAutoPlay();
                });

                carouselDots.appendChild(dot);

            });

        }


        /* -----------------------------------------------
           Show slide
        ------------------------------------------------ */

        function showSlide(index) {

            if (!slides.length) return;

            if (index < 0) {
                index = slides.length - 1;
            }

            if (index >= slides.length) {
                index = 0;
            }

            currentSlide = index;

            carouselTrack.style.transform =
                `translateX(-${currentSlide * 100}%)`;


            /* Update dots */

            if (carouselDots) {

                const dots =
                    carouselDots.querySelectorAll(".carousel-dot");

                dots.forEach((dot, dotIndex) => {

                    dot.classList.toggle(
                        "active",
                        dotIndex === currentSlide
                    );

                    dot.setAttribute(
                        "aria-current",
                        dotIndex === currentSlide
                            ? "true"
                            : "false"
                    );

                });

            }

        }


        /* -----------------------------------------------
           Previous button
        ------------------------------------------------ */

        if (prevButton) {

            prevButton.addEventListener("click", () => {

                showSlide(currentSlide - 1);
                restartAutoPlay();

            });

        }


        /* -----------------------------------------------
           Next button
        ------------------------------------------------ */

        if (nextButton) {

            nextButton.addEventListener("click", () => {

                showSlide(currentSlide + 1);
                restartAutoPlay();

            });

        }


        /* -----------------------------------------------
           Automatic slideshow
        ------------------------------------------------ */

        function startAutoPlay() {

            if (slides.length <= 1) return;

            autoPlayTimer = setInterval(() => {

                showSlide(currentSlide + 1);

            }, 5000);

        }


        function stopAutoPlay() {

            if (autoPlayTimer) {

                clearInterval(autoPlayTimer);
                autoPlayTimer = null;

            }

        }


        function restartAutoPlay() {

            stopAutoPlay();
            startAutoPlay();

        }


        /* -----------------------------------------------
           Pause when mouse is over carousel
        ------------------------------------------------ */

        carousel.addEventListener("mouseenter", () => {
            stopAutoPlay();
        });


        carousel.addEventListener("mouseleave", () => {
            startAutoPlay();
        });


        /* -----------------------------------------------
           Touch / swipe support
        ------------------------------------------------ */

        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        carousel.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].screenX;

                handleSwipe();

            },
            { passive: true }
        );


        function handleSwipe() {

            const swipeDistance =
                touchEndX - touchStartX;

            const minimumSwipeDistance = 50;

            if (
                Math.abs(swipeDistance) <
                minimumSwipeDistance
            ) {
                return;
            }

            if (swipeDistance < 0) {

                showSlide(currentSlide + 1);

            } else {

                showSlide(currentSlide - 1);

            }

            restartAutoPlay();

        }


        /* -----------------------------------------------
           Keyboard controls
        ------------------------------------------------ */

        carousel.addEventListener("keydown", (event) => {

            if (event.key === "ArrowLeft") {

                showSlide(currentSlide - 1);
                restartAutoPlay();

            }

            if (event.key === "ArrowRight") {

                showSlide(currentSlide + 1);
                restartAutoPlay();

            }

        });


        /* -----------------------------------------------
           Initial slide
        ------------------------------------------------ */

        showSlide(0);
        startAutoPlay();

    }


    /* =======================================================
       DROPDOWN NAVIGATION
    ======================================================= */

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach((navItem) => {

        const button =
            navItem.querySelector(".nav-button");

        const dropdown =
            navItem.querySelector(".dropdown");

        if (!button || !dropdown) return;


        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen =
                navItem.classList.contains("open");


            /* Close all other dropdowns */

            navItems.forEach((item) => {

                item.classList.remove("open");

                const itemButton =
                    item.querySelector(".nav-button");

                if (itemButton) {

                    itemButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });


            /* Toggle current dropdown */

            if (!isOpen) {

                navItem.classList.add("open");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });


    /* Close dropdown when clicking elsewhere */

    document.addEventListener("click", () => {

        navItems.forEach((navItem) => {

            navItem.classList.remove("open");

            const button =
                navItem.querySelector(".nav-button");

            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });


    /* Prevent dropdown clicks from closing it */

    navItems.forEach((navItem) => {

        const dropdown =
            navItem.querySelector(".dropdown");

        if (dropdown) {

            dropdown.addEventListener(
                "click",
                (event) => {
                    event.stopPropagation();
                }
            );

        }

    });


    /* =======================================================
       VOTE BUTTON
       
       The vote link is now written directly into the HTML.
       We intentionally do not generate or modify it here.
    ======================================================= */


    /* =======================================================
       PROFILE STATUS
       
       Status is also controlled directly by the HTML.
       
       Example:
       
       <div class="status active">
           <span class="status-dot"></span>
           Competing
       </div>
       
       For an eliminated contestant:
       
       <div class="status eliminated">
           <span class="status-dot"></span>
           Eliminated
       </div>
    ======================================================= */


    /* =======================================================
       ACCESSIBILITY
    ======================================================= */

    navItems.forEach((navItem) => {

        const button =
            navItem.querySelector(".nav-button");

        if (button) {

            button.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =======================================================
       ESC KEY
       Close open navigation menus.
    ======================================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") return;

        navItems.forEach((navItem) => {

            navItem.classList.remove("open");

            const button =
                navItem.querySelector(".nav-button");

            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });

});