// JavaScript Document
/* =========================================================
   MEGA MESSY TOURNAMENT
   PROFILE.JS

   Used by:

   profile.html?girl=001
   profile.html?girl=002
   ...
   profile.html?girl=040
========================================================= */


/* =========================================================
   GET GIRL ID FROM URL
========================================================= */

const profileParams =
    new URLSearchParams(window.location.search);

const girlID =
    String(
        profileParams.get("girl") || "001"
    ).padStart(3, "0");


/* =========================================================
   GET GIRL FROM DATABASE
========================================================= */

const girl =
    getGirl(girlID);


/* =========================================================
   CAROUSEL
========================================================= */

let currentSlide = 0;

let carouselTimer = null;

const carouselImages = [
    "A.png",
    "B.png",
    "C.png"
];


/* =========================================================
   BUILD PROFILE
========================================================= */

function buildProfile() {

    const profileContent =
        document.getElementById("profileContent");


    if (!profileContent) {

        console.error(
            "ERROR: #profileContent was not found."
        );

        return;
    }


    /* =====================================================
       GIRL NOT FOUND
    ===================================================== */

    if (!girl) {

        profileContent.innerHTML = `

            <div class="profile-error">

                <h2>
                    Girl Not Found
                </h2>

                <p>
                    Girl ${escapeHTML(girlID)}
                    could not be found in the database.
                </p>

                <br>

                <a
                    href="../../index.html"
                    class="vote-button"
                    style="max-width:300px;margin:20px auto 0;"
                >
                    Return Home
                </a>

            </div>

        `;

        return;
    }


    /* =====================================================
       ASSET PATH
    ===================================================== */

    const assetPath =
        `${girl.from}/${girl.id}/${girl.id}`;


    /* =====================================================
       PAGE TITLE
    ===================================================== */

    document.title =
        `${girl.name} | MEGA Messy Tournament`;


    /* =====================================================
       PROFILE HTML
    ===================================================== */

    profileContent.innerHTML = `

        <!-- =================================================
             PROFILE HEADING
        ================================================= -->

        <div class="profile-heading">

            <h1>
                ${escapeHTML(girl.name)}
            </h1>

            <p>
                Girl ${escapeHTML(girl.id)}
                • Qualifying Group ${girl.group}
            </p>

        </div>


        <!-- =================================================
             PROFILE SECTION
        ================================================= -->

        <section class="profile-section">

            <div class="profile-grid">


                <!-- =========================================
                     IMAGE CAROUSEL
                ========================================== -->

                <div class="carousel">

                    <div class="carousel-image-wrapper">


                        <!-- IMAGE 1 -->

                        <img
                            class="carousel-image active"
                            data-slide="0"
                            src="${assetPath} A.png"
                            alt="${escapeHTML(girl.name)} - Image 1"
                        >


                        <!-- IMAGE 2 -->

                        <img
                            class="carousel-image"
                            data-slide="1"
                            src="${assetPath} B.png"
                            alt="${escapeHTML(girl.name)} - Image 2"
                        >


                        <!-- IMAGE 3 -->

                        <img
                            class="carousel-image"
                            data-slide="2"
                            src="${assetPath} C.png"
                            alt="${escapeHTML(girl.name)} - Image 3"
                        >


                        <!-- =================================
                             PREVIOUS
                        ================================== -->

                        <button
                            type="button"
                            class="carousel-arrow prev"
                            id="carouselPrev"
                            aria-label="Previous image"
                        >
                            ❮
                        </button>


                        <!-- =================================
                             NEXT
                        ================================== -->

                        <button
                            type="button"
                            class="carousel-arrow next"
                            id="carouselNext"
                            aria-label="Next image"
                        >
                            ❯
                        </button>


                        <!-- =================================
                             DOTS
                        ================================== -->

                        <div class="carousel-dots">

                            <button
                                type="button"
                                class="carousel-dot active"
                                data-slide="0"
                                aria-label="Show image 1"
                            ></button>

                            <button
                                type="button"
                                class="carousel-dot"
                                data-slide="1"
                                aria-label="Show image 2"
                            ></button>

                            <button
                                type="button"
                                class="carousel-dot"
                                data-slide="2"
                                aria-label="Show image 3"
                            ></button>

                        </div>

                    </div>

                </div>


                <!-- =========================================
                     PROFILE INFORMATION
                ========================================== -->

                <div class="profile-info">


                    <!-- NAME -->

                    <div class="girl-name">

                        ${escapeHTML(girl.name)}

                    </div>


                    <!-- AGE -->

                    <div class="profile-field">

                        <span class="profile-label">
                            Age
                        </span>

                        <div class="profile-value">
                            ${escapeHTML(girl.age)}
                        </div>

                    </div>


                    <!-- BIOGRAPHY -->

                    <div class="profile-field">

                        <span class="profile-label">
                            Biography
                        </span>

                        <div class="profile-value">
                            ${escapeHTML(girl.bio)}
                        </div>

                    </div>


                    <!-- APPEARANCE -->

                    <div class="profile-field">

                        <span class="profile-label">
                            Appearance
                        </span>

                        <div class="profile-value">
                            ${escapeHTML(girl.appearance)}
                        </div>

                    </div>


                    <!-- GROUP -->

                    <div class="profile-field">

                        <span class="profile-label">
                            Qualifying Group
                        </span>

                        <div class="profile-value">
                            Group ${girl.group}
                        </div>

                    </div>


                    <!-- STATUS -->

                    <div class="profile-field">

                        <span class="profile-label">
                            Status
                        </span>

                        <div>

                            <span class="status">
                                ${escapeHTML(girl.status)}
                            </span>

                        </div>

                    </div>


                    <!-- VOTE BUTTON -->

                    <button
                        type="button"
                        class="vote-button"
                        id="voteButton"
                    >
                        🗳️ VOTE FOR HER
                    </button>

                </div>

            </div>

        </section>


        <!-- =================================================
             VIDEO SECTION
        ================================================= -->

        <section class="video-section">


            <!-- =============================================
                 VIDEO HEADING
            ============================================== -->

            <div class="section-heading">

                <h2>
                    Challenge Video
                </h2>

                <p>
                    Watch ${escapeHTML(girl.name)}'s
                    challenge.
                </p>

            </div>


            <!-- =============================================
                 CUSTOM VIDEO PLAYER
            ============================================== -->

            <div class="custom-video-player">

                <div class="video-wrapper">


                    <!-- VIDEO -->

                    <video
                        id="customVideo"
                        class="custom-video"
                        preload="metadata"
                        playsinline
                    >

                        <source
                            src="${assetPath} Video.mp4"
                            type="video/mp4"
                        >

                        Your browser does not support
                        HTML5 video.

                    </video>


                    <!-- =====================================
                         THUMBNAIL
                    ====================================== -->

                    <img
                        id="videoThumbnail"
                        class="video-thumbnail"
                        src="${assetPath} Thumbnail.png"
                        alt="${escapeHTML(girl.name)} challenge video thumbnail"
                    >


                    <!-- =====================================
                         PLAY OVERLAY
                    ====================================== -->

                    <div
                        id="videoPlayOverlay"
                        class="video-play-overlay"
                    >

                        <button
                            type="button"
                            id="largePlayButton"
                            class="large-play-button"
                            aria-label="Play video"
                        >
                            ▶
                        </button>

                    </div>


                    <!-- =====================================
                         VIDEO CONTROLS
                    ====================================== -->

                    <div class="video-controls">


                        <!-- PLAY / PAUSE -->

                        <button
                            type="button"
                            id="playPauseButton"
                            class="control-button"
                            aria-label="Play"
                        >
                            ▶
                        </button>


                        <!-- PROGRESS -->

                        <div
                            id="progressContainer"
                            class="progress-container"
                            role="slider"
                            aria-label="Video progress"
                        >

                            <div
                                id="progressBar"
                                class="progress-bar"
                            ></div>

                        </div>


                        <!-- TIME -->

                        <div
                            id="timeDisplay"
                            class="time-display"
                        >
                            0:00 / 0:00
                        </div>


                        <!-- VOLUME -->

                        <button
                            type="button"
                            id="volumeButton"
                            class="control-button"
                            aria-label="Mute"
                        >
                            🔊
                        </button>


                        <!-- FULLSCREEN -->

                        <button
                            type="button"
                            id="fullscreenButton"
                            class="control-button"
                            aria-label="Fullscreen"
                        >
                            ⛶
                        </button>

                    </div>

                </div>

            </div>

        </section>

    `;


    /* =====================================================
       INITIALISE COMPONENTS
    ===================================================== */

    setupCarousel();

    setupVoteButton();

    setupVideoPlayer();

}


/* =========================================================
   CAROUSEL SETUP
========================================================= */

function setupCarousel() {

    const images =
        document.querySelectorAll(
            ".carousel-image"
        );


    const dots =
        document.querySelectorAll(
            ".carousel-dot"
        );


    const previous =
        document.getElementById(
            "carouselPrev"
        );


    const next =
        document.getElementById(
            "carouselNext"
        );


    if (
        !images.length ||
        !dots.length
    ) {

        return;

    }


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showSlide(index) {

        currentSlide =
            (
                index +
                images.length
            ) %
            images.length;


        images.forEach(
            (image, imageIndex) => {

                image.classList.toggle(
                    "active",
                    imageIndex === currentSlide
                );

            }
        );


        dots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === currentSlide
                );

            }
        );

    }


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    if (previous) {

        previous.addEventListener(
            "click",
            () => {

                showSlide(
                    currentSlide - 1
                );

                restartCarousel();

            }
        );

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    if (next) {

        next.addEventListener(
            "click",
            () => {

                showSlide(
                    currentSlide + 1
                );

                restartCarousel();

            }
        );

    }


    /* =====================================================
       DOT BUTTONS
    ===================================================== */

    dots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    showSlide(index);

                    restartCarousel();

                }
            );

        }
    );


    /* =====================================================
       AUTO ROTATION
    ===================================================== */

    function restartCarousel() {

        clearInterval(
            carouselTimer
        );


        carouselTimer =
            setInterval(
                () => {

                    showSlide(
                        currentSlide + 1
                    );

                },
                5000
            );

    }


    /* =====================================================
       START
    ===================================================== */

    showSlide(0);

    restartCarousel();

}


/* =========================================================
   VOTE BUTTON
========================================================= */

function setupVoteButton() {

    const voteButton =
        document.getElementById(
            "voteButton"
        );


    if (!voteButton) {

        return;

    }


    voteButton.addEventListener(
        "click",
        () => {

            if (!girl.group) {

                alert(
                    "This girl has not been assigned to a group yet."
                );

                return;

            }


            /*
                Send the user to the current
                qualifying group page.
            */

            window.location.href =
                `../../qualifying/groups/group.html?group=${girl.group}`;

        }
    );

}


/* =========================================================
   VIDEO PLAYER
========================================================= */

function setupVideoPlayer() {

    const video =
        document.getElementById(
            "customVideo"
        );


    const thumbnail =
        document.getElementById(
            "videoThumbnail"
        );


    const overlay =
        document.getElementById(
            "videoPlayOverlay"
        );


    const largePlay =
        document.getElementById(
            "largePlayButton"
        );


    const playPause =
        document.getElementById(
            "playPauseButton"
        );


    const progressContainer =
        document.getElementById(
            "progressContainer"
        );


    const progressBar =
        document.getElementById(
            "progressBar"
        );


    const timeDisplay =
        document.getElementById(
            "timeDisplay"
        );


    const volumeButton =
        document.getElementById(
            "volumeButton"
        );


    const fullscreenButton =
        document.getElementById(
            "fullscreenButton"
        );


    if (!video) {

        return;

    }


    /* =====================================================
       FORMAT TIME
    ===================================================== */

    function formatTime(seconds) {

        if (
            !Number.isFinite(seconds) ||
            seconds < 0
        ) {

            return "0:00";

        }


        const minutes =
            Math.floor(
                seconds / 60
            );


        const remainingSeconds =
            Math.floor(
                seconds % 60
            );


        return (
            `${minutes}:` +
            `${String(remainingSeconds).padStart(2, "0")}`
        );

    }


    /* =====================================================
       UPDATE TIME
    ===================================================== */

    function updateTime() {

        const current =
            video.currentTime || 0;


        const duration =
            video.duration || 0;


        if (timeDisplay) {

            timeDisplay.textContent =
                `${formatTime(current)} / ${formatTime(duration)}`;

        }


        if (
            progressBar &&
            duration > 0
        ) {

            const percentage =
                (current / duration) * 100;


            progressBar.style.width =
                `${percentage}%`;

        }

    }


    /* =====================================================
       PLAY VIDEO
    ===================================================== */

    function playVideo() {

        video.play()
            .then(
                () => {

                    if (thumbnail) {

                        thumbnail.classList.add(
                            "hidden"
                        );

                    }


                    if (overlay) {

                        overlay.classList.add(
                            "hidden"
                        );

                    }


                    if (playPause) {

                        playPause.textContent =
                            "❚❚";

                        playPause.setAttribute(
                            "aria-label",
                            "Pause"
                        );

                    }

                }
            )
            .catch(
                error => {

                    console.warn(
                        "Video could not be played:",
                        error
                    );

                }
            );

    }


    /* =====================================================
       PAUSE VIDEO
    ===================================================== */

    function pauseVideo() {

        video.pause();


        if (playPause) {

            playPause.textContent =
                "▶";

            playPause.setAttribute(
                "aria-label",
                "Play"
            );

        }

    }


    /* =====================================================
       TOGGLE PLAY / PAUSE
    ===================================================== */

    function togglePlay() {

        if (video.paused) {

            playVideo();

        } else {

            pauseVideo();

        }

    }


    /* =====================================================
       PLAY BUTTON
    ===================================================== */

    if (largePlay) {

        largePlay.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                playVideo();

            }
        );

    }


    /* =====================================================
       PLAY OVERLAY
    ===================================================== */

    if (overlay) {

        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target === overlay
                ) {

                    playVideo();

                }

            }
        );

    }


    /* =====================================================
       THUMBNAIL CLICK
    ===================================================== */

    if (thumbnail) {

        thumbnail.addEventListener(
            "click",
            () => {

                playVideo();

            }
        );

    }


    /* =====================================================
       PLAY / PAUSE BUTTON
    ===================================================== */

    if (playPause) {

        playPause.addEventListener(
            "click",
            togglePlay
        );

    }


    /* =====================================================
       VIDEO CLICK
    ===================================================== */

    video.addEventListener(
        "click",
        togglePlay
    );


    /* =====================================================
       VIDEO PLAY EVENT
    ===================================================== */

    video.addEventListener(
        "play",
        () => {

            if (thumbnail) {

                thumbnail.classList.add(
                    "hidden"
                );

            }


            if (overlay) {

                overlay.classList.add(
                    "hidden"
                );

            }


            if (playPause) {

                playPause.textContent =
                    "❚❚";

                playPause.setAttribute(
                    "aria-label",
                    "Pause"
                );

            }

        }
    );


    /* =====================================================
       VIDEO PAUSE EVENT
    ===================================================== */

    video.addEventListener(
        "pause",
        () => {

            if (playPause) {

                playPause.textContent =
                    "▶";

                playPause.setAttribute(
                    "aria-label",
                    "Play"
                );

            }

        }
    );


    /* =====================================================
       VIDEO ENDED
    ===================================================== */

    video.addEventListener(
        "ended",
        () => {

            if (thumbnail) {

                thumbnail.classList.remove(
                    "hidden"
                );

            }


            if (overlay) {

                overlay.classList.remove(
                    "hidden"
                );

            }


            if (playPause) {

                playPause.textContent =
                    "▶";

                playPause.setAttribute(
                    "aria-label",
                    "Play"
                );

            }


            video.currentTime =
                0;


            updateTime();

        }
    );


    /* =====================================================
       TIME UPDATE
    ===================================================== */

    video.addEventListener(
        "timeupdate",
        updateTime
    );


    video.addEventListener(
        "loadedmetadata",
        updateTime
    );


    /* =====================================================
       PROGRESS BAR CLICK
    ===================================================== */

    if (progressContainer) {

        progressContainer.addEventListener(
            "click",
            event => {

                const rect =
                    progressContainer.getBoundingClientRect();


                const clickPosition =
                    event.clientX - rect.left;


                const percentage =
                    clickPosition / rect.width;


                if (
                    Number.isFinite(video.duration)
                ) {

                    video.currentTime =
                        percentage *
                        video.duration;

                }

            }
        );

    }


    /* =====================================================
       VOLUME BUTTON
    ===================================================== */

    if (volumeButton) {

        volumeButton.addEventListener(
            "click",
            () => {

                video.muted =
                    !video.muted;


                if (video.muted) {

                    volumeButton.textContent =
                        "🔇";

                    volumeButton.setAttribute(
                        "aria-label",
                        "Unmute"
                    );

                } else {

                    volumeButton.textContent =
                        "🔊";

                    volumeButton.setAttribute(
                        "aria-label",
                        "Mute"
                    );

                }

            }
        );

    }


    /* =====================================================
       FULLSCREEN
    ===================================================== */

    if (fullscreenButton) {

        fullscreenButton.addEventListener(
            "click",
            async () => {

                const player =
                    document.querySelector(
                        ".custom-video-player"
                    );


                try {

                    if (
                        !document.fullscreenElement
                    ) {

                        if (
                            player &&
                            player.requestFullscreen
                        ) {

                            await player.requestFullscreen();

                        }

                    } else {

                        await document.exitFullscreen();

                    }

                } catch (error) {

                    console.warn(
                        "Fullscreen was not available:",
                        error
                    );

                }

            }
        );

    }


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /*
                Don't interfere with typing
                into form fields.
            */

            const tag =
                document.activeElement?.tagName;


            if (
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT"
            ) {

                return;

            }


            /* SPACE = PLAY / PAUSE */

            if (
                event.code === "Space"
            ) {

                event.preventDefault();

                togglePlay();

            }


            /* LEFT ARROW = BACK 5 SECONDS */

            if (
                event.code === "ArrowLeft"
            ) {

                event.preventDefault();

                video.currentTime =
                    Math.max(
                        0,
                        video.currentTime - 5
                    );

            }


            /* RIGHT ARROW = FORWARD 5 SECONDS */

            if (
                event.code === "ArrowRight"
            ) {

                event.preventDefault();

                video.currentTime =
                    Math.min(
                        video.duration || 0,
                        video.currentTime + 5
                    );

            }


            /* M = MUTE */

            if (
                event.key.toLowerCase() === "m"
            ) {

                video.muted =
                    !video.muted;


                if (volumeButton) {

                    volumeButton.textContent =
                        video.muted
                            ? "🔇"
                            : "🔊";

                }

            }

        }
    );


    /* =====================================================
       VIDEO ERROR
    ===================================================== */

    video.addEventListener(
        "error",
        () => {

            console.warn(
                "Could not load video:",
                `${girl.from}/${girl.id}/${girl.id} Video.mp4`
            );

        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateTime();

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    buildProfile
);