/* =========================================================
   APEXIO MOLА SİSTEMİ
========================================================= */

"use strict";


/* =========================================================
   DOM
========================================================= */

const breakPopup = document.getElementById("breakPopup");

const mainPage = document.getElementById("mainPage");

const timerElement = document.getElementById("timer");
const timerProgress = document.getElementById("timerProgress");

const exitBtn = document.getElementById("exitBtn");

const customBtn = document.getElementById("customBtn");
const customArea = document.getElementById("customArea");
const customInput = document.getElementById("customInput");
const customStart = document.getElementById("customStart");
const customError = document.getElementById("customError");


/* Alt sayfalar */

const musicPage = document.getElementById("musicPage");
const gamePage = document.getElementById("gamePage");

const musicOpen = document.getElementById("musicOpen");
const gameOpen = document.getElementById("gameOpen");

const musicBack = document.getElementById("musicBack");
const gameBack = document.getElementById("gameBack");


/* Müzik */

const musicItems = document.querySelectorAll(".music-item");
const stopMusic = document.getElementById("stopMusic");
const musicPlayPause = document.getElementById("musicPlayPause");
const musicSeek = document.getElementById("musicSeek");
const musicCurrentTime = document.getElementById("musicCurrentTime");
const musicDuration = document.getElementById("musicDuration");
const musicDisc = document.getElementById("musicDisc");
const ataturkMessage = document.getElementById("ataturkMessage");
const closeAtaturkMessage = document.getElementById("closeAtaturkMessage");
const nowPlayingName = document.getElementById("nowPlayingName");

const audio = new Audio();
audio.loop = false;
audio.preload = "metadata";


/* Oyun */

const gameLoading = document.getElementById("gameLoading");
const loadingTitle = document.getElementById("loadingTitle");
const loadingText = document.getElementById("loadingText");
const loadingIcon = document.getElementById("loadingIcon");

const balloonGameOpen = document.getElementById("balloonGameOpen");
const memoryGameOpen = document.getElementById("memoryGameOpen");
const balloonStartButton = document.getElementById("balloonStartButton");
const balloonMarketOpen = document.getElementById("balloonMarketOpen");

const balloonMenu = document.getElementById("balloonMenu");
const balloonMenuBack = document.getElementById("balloonMenuBack");
const balloonGame = document.getElementById("balloonGame");
const memoryGame = document.getElementById("memoryGame");
const balloonMarket = document.getElementById("balloonMarket");

const balloonBack = document.getElementById("balloonBack");
const memoryBack = document.getElementById("memoryBack");
const marketBack = document.getElementById("marketBack");


/* Balon */

const balloonArena = document.getElementById("balloonArena");
const balloonScoreElement = document.getElementById("balloonScore");
const balloonTimerElement = document.getElementById("balloonTimer");
const balloonCoinsElement = document.getElementById("balloonCoins");
const balloonBestElement = document.getElementById("balloonBest");

const balloonResult = document.getElementById("balloonResult");

const resultScore = document.getElementById("resultScore");
const resultCoins = document.getElementById("resultCoins");
const resultBest = document.getElementById("resultBest");

const playAgain = document.getElementById("playAgain");
const resultBack = document.getElementById("resultBack");


/* Market */

const shopBalloons = document.getElementById("shopBalloons");
const marketCoins = document.getElementById("marketCoins");


/* Hafıza */

const memoryBoard = document.getElementById("memoryBoard");
const memoryMovesElement = document.getElementById("memoryMoves");
const memoryPairsElement = document.getElementById("memoryPairs");
const memoryTimeElement = document.getElementById("memoryTime");
const memoryMessage = document.getElementById("memoryMessage");

const memoryResult = document.getElementById("memoryResult");
const memoryResultMoves = document.getElementById("memoryResultMoves");
const memoryResultTime = document.getElementById("memoryResultTime");

const memoryAgain = document.getElementById("memoryAgain");
const memoryResultBack = document.getElementById("memoryResultBack");


/* Menü istatistikleri */

const balloonMenuCoins = document.getElementById("balloonMenuCoins");
const balloonMenuScore = document.getElementById("balloonMenuScore");
const balloonMenuHighScore = document.getElementById("balloonMenuHighScore");
const balloonMenuMarketCoins = document.getElementById("balloonMenuMarketCoins");


/* Bildirim */

const breakNotification = document.getElementById("breakNotification");
const notificationTitle = document.getElementById("notificationTitle");
const notificationText = document.getElementById("notificationText");
const notificationSound = document.getElementById("notificationSound");


/* =========================================================
   GLOBAL MOLА SAYACI
========================================================= */

let breakInterval = null;

let breakTotalSeconds = 0;
let breakRemainingSeconds = 0;

let breakStartedAt = 0;

let warningOneMinuteShown = false;
let warningThirtySecondsShown = false;

let notificationTimeout = null;

let breakFinished = false;


/* =========================================================
   SÜRE SEÇİMİ
========================================================= */

document.querySelectorAll(".time-option[data-minutes]").forEach(button => {

    button.addEventListener("click", () => {

        const minutes = Number(button.dataset.minutes);

        if (!minutes) {
            return;
        }

        startBreak(minutes);

    });

});


customBtn.addEventListener("click", () => {

    if (customArea.style.display === "flex") {

        customArea.style.display = "none";

    } else {

        customArea.style.display = "flex";

        setTimeout(() => {
            customInput.focus();
        }, 100);

    }

});


customStart.addEventListener("click", startCustomBreak);


customInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        startCustomBreak();
    }

});


function startCustomBreak() {

    const value = Number(customInput.value);

    if (!Number.isFinite(value) || value < 1 || value > 60) {

        customError.textContent =
            "Lütfen 1 ile 60 dakika arasında bir süre gir.";

        return;
    }

    customError.textContent = "";

    startBreak(value);

}


/* =========================================================
   MOLAYI BAŞLAT
========================================================= */

function startBreak(minutes) {

    breakTotalSeconds = Math.floor(minutes * 60);

    breakRemainingSeconds = breakTotalSeconds;

    breakStartedAt = Date.now();

    warningOneMinuteShown = false;
    warningThirtySecondsShown = false;

    breakFinished = false;

    breakPopup.classList.remove("active");

    updateBreakTimer();

    clearInterval(breakInterval);

    /*
        Date.now() kullanıyoruz.

        Böylece kullanıcı WebView'da başka bir ekrana geçtiğinde,
        timer'ın gerçek zamanı takip etmesi sağlanıyor.
    */

    breakInterval = setInterval(updateBreakTimer, 250);

}


/* =========================================================
   TIMER GÜNCELLE
========================================================= */

function updateBreakTimer() {

    if (breakFinished) {
        return;
    }

    const elapsedSeconds =
        Math.floor((Date.now() - breakStartedAt) / 1000);

    breakRemainingSeconds =
        Math.max(0, breakTotalSeconds - elapsedSeconds);

    renderTimer();

    checkWarnings();

    if (breakRemainingSeconds <= 0) {

        finishBreak();

    }

}


/* =========================================================
   TIMER GÖRÜNÜMÜ
========================================================= */

function renderTimer() {

    const minutes =
        Math.floor(breakRemainingSeconds / 60);

    const seconds =
        breakRemainingSeconds % 60;

    timerElement.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");


    if (breakTotalSeconds > 0) {

        const progress =
            breakRemainingSeconds / breakTotalSeconds;

        timerProgress.style.transform =
            `scaleX(${Math.max(0, progress)})`;

    }

}


/* =========================================================
   SON 1 DK / SON 30 SN UYARILARI
========================================================= */

function checkWarnings() {

    /*
        60 saniyeye geldiğinde bir kez.
    */

    if (
        breakRemainingSeconds <= 60 &&
        breakRemainingSeconds > 30 &&
        !warningOneMinuteShown
    ) {

        warningOneMinuteShown = true;

        showBreakNotification(
            "Mola sürenin bitmesine 1 dakika kaldı!",
            "Molanı tamamlamaya hazırlan."
        );

    }


    /*
        30 saniyeye geldiğinde bir kez.
    */

    if (
        breakRemainingSeconds <= 30 &&
        breakRemainingSeconds > 0 &&
        !warningThirtySecondsShown
    ) {

        warningThirtySecondsShown = true;

        showBreakNotification(
            "Mola sürenin bitmesine son 30 saniye!",
            "Birazdan derslerine geri döneceksin."
        );

    }

}


/* =========================================================
   BİLDİRİM
========================================================= */

function showBreakNotification(title, text) {

    clearTimeout(notificationTimeout);

    notificationTitle.textContent = title;
    notificationText.textContent = text;

    /*
        CSS animasyonunu yeniden başlat.
    */

    breakNotification.classList.remove("show");

    void breakNotification.offsetWidth;

    breakNotification.classList.add("show");


    /*
        Küçük titreşim.

        WebView / cihaz destekliyorsa çalışır.
    */

    if ("vibrate" in navigator) {

        try {

            navigator.vibrate([80, 50, 80]);

        } catch (error) {}

    }


    /*
        Bip sesi.

        Mobil tarayıcı otomatik ses kısıtlamasına takılırsa
        çalışmayabilir. Kullanıcı zaten sayfada etkileşim
        yaptığı için çoğu WebView'da çalışacaktır.
    */

    playNotificationSound();


    /*
        5 saniye sonra kapat.
    */

    notificationTimeout = setTimeout(() => {

        breakNotification.classList.remove("show");

    }, 5000);

}


function playNotificationSound() {

    try {

        notificationSound.currentTime = 0;

        const promise = notificationSound.play();

        if (promise && typeof promise.catch === "function") {

            promise.catch(() => {
                createBeepWithWebAudio();
            });

        }

    } catch (error) {

        createBeepWithWebAudio();

    }

}


/*
    notification.mp3 bulunamazsa basit bir Web Audio bip sesi.
*/

function createBeepWithWebAudio() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {
            return;
        }

        const context = new AudioContext();

        const oscillator =
            context.createOscillator();

        const gain =
            context.createGain();

        oscillator.type = "sine";

        oscillator.frequency.value = 720;

        gain.gain.setValueAtTime(
            0.0001,
            context.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.05,
            context.currentTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            context.currentTime + 0.18
        );

        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.start();

        oscillator.stop(
            context.currentTime + 0.2
        );

    } catch (error) {}

}


/* =========================================================
   MOLA BİTİŞİ
========================================================= */

function finishBreak() {

    if (breakFinished) {
        return;
    }

    breakFinished = true;

    clearInterval(breakInterval);

    breakInterval = null;

    breakRemainingSeconds = 0;

    renderTimer();

    /*
        Açık olan oyunları durdur.
    */

    stopBalloonGame();

    stopMemoryGame();

    /*
        Müziği de kapat.
    */

    try {
        audio.pause();
        audio.currentTime = 0;
        resetMusicUI();
        hideAtaturkMessage();
    } catch (error) {}

    /*
        Bildirim varsa kapat.
    */

    breakNotification.classList.remove("show");

    /*
        Ana sayfaya dön.
    */

    window.location.replace("index.html");

}


/* =========================================================
   ERKEN ÇIKIŞ
========================================================= */

exitBtn.addEventListener("click", () => {

    clearInterval(breakInterval);

    breakInterval = null;

    try {
        audio.pause();
        resetMusicUI();
        hideAtaturkMessage();
    } catch (error) {}

    window.location.replace("index.html");

});


/* =========================================================
   SAYFA GEÇİŞLERİ
========================================================= */

musicOpen.addEventListener("click", () => {

    musicPage.classList.add("show");

});


gameOpen.addEventListener("click", () => {

    updateGameMenu();

    gamePage.classList.add("show");

});


musicBack.addEventListener("click", () => {

    musicPage.classList.remove("show");

});


gameBack.addEventListener("click", () => {

    gamePage.classList.remove("show");

});


/* =========================================================
   MÜZİK
========================================================= */

function formatMusicTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return "00:00";
    }

    const total = Math.floor(seconds);
    const minutes = Math.floor(total / 60);
    const remaining = total % 60;

    return String(minutes).padStart(2, "0") + ":" +
           String(remaining).padStart(2, "0");
}

function updateMusicPlayButton() {
    if (!musicPlayPause) return;

    musicPlayPause.innerHTML = audio.paused
        ? '<i class="fa-solid fa-play"></i>'
        : '<i class="fa-solid fa-pause"></i>';
}

function resetMusicUI() {
    nowPlayingName.textContent = "Müzik seçilmedi";
    musicCurrentTime.textContent = "00:00";
    musicDuration.textContent = "00:00";
    musicSeek.value = 0;
    musicSeek.max = 100;
    musicPlayPause.disabled = true;
    musicSeek.disabled = true;
    musicDisc.classList.remove("playing");
    updateMusicPlayButton();
}

const ataturkQuotes = [
    "Bütün ümidim gençliktedir.",
    "Ey yükselen yeni nesil, istikbal sizindir. Cumhuriyet'i biz kurduk, onu yükseltecek ve yaşatacak sizsiniz.",
    "Muhtaç olduğun kudret damarlarındaki asil kanda mevcuttur.",
    "Küçük hanımlar, küçük beyler! Sizler hepiniz geleceğin bir gülü, yıldızı ve ikbal ışığısınız. Memleketi asıl ışığa boğacak olan sizsiniz.",
    "Gençler, cesaretimizi güçlendiren ve sürdüren sizlersiniz.",
    "Biz her şeyi gençliğe bırakacağız... O gençlik ki hiçbir şeyi unutmayacaktır; geleceğin ışık saçan çiçekleri onlardır."
];

let ataturkQuoteIndex = 0;
let ataturkQuoteTimer = null;

function renderAtaturkQuote(animate = true) {
    const quote = document.getElementById("ataturkQuote");
    const counter = document.getElementById("ataturkQuoteCounter");
    if (!quote) return;

    if (animate) {
        quote.classList.remove("quote-in");
        void quote.offsetWidth;
        quote.classList.add("quote-in");
    }

    quote.textContent = "“" + ataturkQuotes[ataturkQuoteIndex] + "”";

    if (counter) {
        counter.textContent = `${ataturkQuoteIndex + 1} / ${ataturkQuotes.length}`;
    }
}

function startAtaturkQuoteRotation() {
    clearInterval(ataturkQuoteTimer);
    ataturkQuoteIndex = 0;
    renderAtaturkQuote(false);

    ataturkQuoteTimer = setInterval(() => {
        // Müzik duraklatıldıysa söz değişmesin; müzik devam ettiğinde kaldığı yerden sürsün.
        if (audio.paused || !audio.src) return;

        ataturkQuoteIndex = (ataturkQuoteIndex + 1) % ataturkQuotes.length;
        renderAtaturkQuote(true);
    }, 6500);
}

function stopAtaturkQuoteRotation() {
    clearInterval(ataturkQuoteTimer);
    ataturkQuoteTimer = null;
}

function showAtaturkMessage() {
    if (!ataturkMessage) return;

    ataturkMessage.hidden = false;
    startAtaturkQuoteRotation();

    requestAnimationFrame(() => {
        ataturkMessage.classList.add("show");

        // Kullanıcı sayfanın aşağısındaysa Atatürk mesajını otomatik görünür alana getir.
        setTimeout(() => {
            ataturkMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 120);
    });
}

function hideAtaturkMessage() {
    stopAtaturkQuoteRotation();

    if (!ataturkMessage) return;
    ataturkMessage.classList.remove("show");
    setTimeout(() => {
        ataturkMessage.hidden = true;
    }, 220);
}

musicItems.forEach(item => {
    item.addEventListener("click", async () => {
        const source = item.dataset.src;
        const name =
            item.querySelector("strong")?.textContent ||
            "Fon müziği";

        try {
            audio.pause();
            audio.src = source;
            audio.currentTime = 0;

            nowPlayingName.textContent = name;
            musicCurrentTime.textContent = "00:00";
            musicDuration.textContent = "00:00";
            musicSeek.value = 0;
            musicSeek.max = 100;
            musicPlayPause.disabled = true;
            musicSeek.disabled = true;

            if (item.dataset.ataturk === "true") {
                showAtaturkMessage();
            } else {
                hideAtaturkMessage();
            }

            await audio.play();
        } catch (error) {
            nowPlayingName.textContent =
                "Müzik dosyası bulunamadı";
            console.warn("Müzik yüklenemedi:", source, error);
        }
    });
});

audio.addEventListener("loadedmetadata", () => {
    const duration = Number.isFinite(audio.duration) ? audio.duration : 0;

    musicDuration.textContent = formatMusicTime(duration);
    musicCurrentTime.textContent = formatMusicTime(audio.currentTime);
    musicSeek.max = duration || 100;
    musicSeek.value = audio.currentTime;
    musicPlayPause.disabled = false;
    musicSeek.disabled = false;
    updateMusicPlayButton();
});

audio.addEventListener("timeupdate", () => {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;

    musicCurrentTime.textContent = formatMusicTime(audio.currentTime);
    musicDuration.textContent = formatMusicTime(audio.duration);
    musicSeek.max = audio.duration;
    musicSeek.value = audio.currentTime;
});

audio.addEventListener("play", () => {
    musicDisc.classList.add("playing");
    updateMusicPlayButton();
});

audio.addEventListener("pause", () => {
    musicDisc.classList.remove("playing");
    updateMusicPlayButton();
});

audio.addEventListener("ended", () => {
    musicDisc.classList.remove("playing");
    musicCurrentTime.textContent = formatMusicTime(audio.duration);
    musicSeek.value = audio.duration || 0;
    updateMusicPlayButton();
});

musicPlayPause.addEventListener("click", async () => {
    if (!audio.src) return;

    try {
        if (audio.paused) {
            await audio.play();
        } else {
            audio.pause();
        }
    } catch (error) {
        console.warn("Müzik oynatılamadı:", error);
    }
});

musicSeek.addEventListener("input", () => {
    if (!Number.isFinite(audio.duration)) return;
    audio.currentTime = Number(musicSeek.value);
    musicCurrentTime.textContent = formatMusicTime(audio.currentTime);
});

stopMusic.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    hideAtaturkMessage();
    resetMusicUI();
});

if (closeAtaturkMessage) {
    closeAtaturkMessage.addEventListener("click", hideAtaturkMessage);
}

resetMusicUI();

/* =========================================================
   LOCAL STORAGE
========================================================= */

const STORAGE = {

    coins: "apexio_break_coins",

    highScore: "apexio_balloon_highscore",

    ownedBalloons: "apexio_owned_balloons",

    selectedBalloon: "apexio_selected_balloon"

};


function getCoins() {

    return Number(
        localStorage.getItem(STORAGE.coins) || 0
    );

}


function setCoins(value) {

    localStorage.setItem(
        STORAGE.coins,
        String(Math.max(0, value))
    );

}


function getHighScore() {

    return Number(
        localStorage.getItem(STORAGE.highScore) || 0
    );

}


function setHighScore(value) {

    localStorage.setItem(
        STORAGE.highScore,
        String(value)
    );

}


function getOwnedBalloons() {

    try {

        const saved =
            JSON.parse(
                localStorage.getItem(
                    STORAGE.ownedBalloons
                )
            );

        if (Array.isArray(saved) && saved.length) {
            return saved;
        }

    } catch (error) {}

    return ["classic"];

}


function setOwnedBalloons(array) {

    localStorage.setItem(
        STORAGE.ownedBalloons,
        JSON.stringify(array)
    );

}


function getSelectedBalloon() {

    return (
        localStorage.getItem(
            STORAGE.selectedBalloon
        ) || "classic"
    );

}


function setSelectedBalloon(id) {

    localStorage.setItem(
        STORAGE.selectedBalloon,
        id
    );

}


/* =========================================================
   BALON TÜRLERİ
========================================================= */

const balloonTypes = [

    {
        id: "classic",
        name: "Klasik",
        description: "Apexio'nun klasik balonu.",
        price: 0,
        color: "#7c8cff"
    },

    {
        id: "sunset",
        name: "Gün Batımı",
        description: "Sıcak turuncu ve pembe tonlar.",
        price: 30,
        color: "#ff6b8a"
    },

    {
        id: "ocean",
        name: "Okyanus",
        description: "Serin mavi okyanus tonu.",
        price: 50,
        color: "#46c9ff"
    },

    {
        id: "mint",
        name: "Mint",
        description: "Yumuşak ve ferah yeşil.",
        price: 75,
        color: "#55ddb0"
    },

    {
        id: "gold",
        name: "Altın",
        description: "Nadir altın balon.",
        price: 120,
        color: "#ffc857"
    },

    {
        id: "violet",
        name: "Violet",
        description: "Özel mor görünüm.",
        price: 160,
        color: "#b178ff"
    }

];


/* =========================================================
   OYUN MENÜSÜ
========================================================= */

function updateGameMenu() {

    const coins = getCoins();
    const highScore = getHighScore();

    balloonMenuCoins.textContent = coins;
    balloonMenuScore.textContent = highScore;
    balloonMenuHighScore.textContent = highScore;
    balloonMenuMarketCoins.textContent = coins;

    marketCoins.textContent = coins;
    balloonCoinsElement.textContent = coins;
    balloonBestElement.textContent = highScore;

}


/* =========================================================
   OYUN YÜKLEME EKRANI
========================================================= */

function openGameWithLoading(
    title,
    text,
    icon,
    callback
) {

    loadingTitle.textContent = title;

    loadingText.textContent = text;

    loadingIcon.innerHTML =
        `<i class="${icon}"></i>`;

    gameLoading.classList.add("show");

    setTimeout(() => {

        gameLoading.classList.remove("show");

        callback();

    }, 900);

}


/* =========================================================
   BALON OYUNUNU AÇ
========================================================= */

balloonGameOpen.addEventListener("click", () => {

    openGameWithLoading(
        "Balonlar hazırlanıyor",
        "Balon oyunu menüsü açılıyor...",
        "fa-solid fa-circle",
        () => {

            gamePage.classList.remove("show");
            updateGameMenu();
            balloonMenu.classList.add("show");

        }
    );

});


/* =========================================================
   BALON MENÜSÜ -> OYUNU BAŞLAT
========================================================= */

balloonStartButton.addEventListener("click", () => {

    balloonMenu.classList.remove("show");
    balloonGame.classList.add("show");
    startBalloonGame();

});


/* =========================================================
   BALON MENÜSÜ GERİ
========================================================= */

balloonMenuBack.addEventListener("click", () => {

    balloonMenu.classList.remove("show");
    gamePage.classList.add("show");

});


/* =========================================================
   BALON OYUNU DEĞİŞKENLERİ
========================================================= */

let balloonScore = 0;

let balloonGameSeconds = 30;

let balloonGameInterval = null;

let balloonSpawnInterval = null;

let balloonGameRunning = false;


/* =========================================================
   BALON OYUNU BAŞLAT
========================================================= */

function startBalloonGame() {

    stopBalloonGame();

    balloonScore = 0;

    balloonGameSeconds = 30;

    balloonGameRunning = true;

    balloonScoreElement.textContent = "0";

    balloonTimerElement.textContent = "30";

    balloonCoinsElement.textContent = getCoins();

    balloonBestElement.textContent = getHighScore();

    balloonArena.innerHTML = "";

    /*
        İlk balonları üret.
    */

    for (let i = 0; i < 4; i++) {

        setTimeout(() => {

            if (balloonGameRunning) {
                spawnBalloon();
            }

        }, i * 250);

    }


    /*
        Yeni balonlar.
    */

    balloonSpawnInterval =
        setInterval(() => {

            if (balloonGameRunning) {
                spawnBalloon();
            }

        }, 850);


    /*
        Oyun süresi.
    */

    balloonGameInterval =
        setInterval(() => {

            if (!balloonGameRunning) {
                return;
            }

            balloonGameSeconds--;

            balloonTimerElement.textContent =
                balloonGameSeconds;

            if (balloonGameSeconds <= 0) {

                endBalloonGame();

            }

        }, 1000);

}


/* =========================================================
   BALON ÜRET
========================================================= */

function spawnBalloon() {

    if (!balloonGameRunning) {
        return;
    }

    const balloon =
        document.createElement("div");

    balloon.className = "balloon";

    const selectedId =
        getSelectedBalloon();

    const selected =
        balloonTypes.find(
            item => item.id === selectedId
        ) || balloonTypes[0];

    balloon.style.background =
        selected.color;


    /*
        Arena boyutuna göre pozisyon.
    */

    const arenaWidth =
        balloonArena.clientWidth;

    const arenaHeight =
        balloonArena.clientHeight;

    const size = 50;

    const maxX =
        Math.max(5, arenaWidth - size - 5);

    const maxY =
        Math.max(5, arenaHeight - 80);

    balloon.style.left =
        Math.floor(
            Math.random() * maxX
        ) + "px";

    balloon.style.top =
        Math.floor(
            Math.random() * maxY
        ) + "px";


    /*
        Biraz farklı boyut.
    */

    const scale =
        0.75 + Math.random() * 0.55;

    balloon.style.transform =
        `scale(${scale})`;


    const string =
        document.createElement("span");

    string.className = "balloon-string";

    balloon.appendChild(string);


    balloon.addEventListener("pointerdown", event => {

        event.preventDefault();

        if (!balloonGameRunning) {
            return;
        }

        if (balloon.dataset.popped === "1") {
            return;
        }

        balloon.dataset.popped = "1";

        balloonScore++;

        balloonScoreElement.textContent =
            balloonScore;

        balloon.classList.add("pop");

        setTimeout(() => {

            balloon.remove();

        }, 180);

    }, {
        passive: false
    });


    balloonArena.appendChild(balloon);


    /*
        Çok uzun süre dokunulmazsa balonu kaldır.
    */

    setTimeout(() => {

        if (
            balloon.isConnected &&
            balloon.dataset.popped !== "1"
        ) {

            balloon.remove();

        }

    }, 5000);

}


/* =========================================================
   BALON OYUNU BİTİR
========================================================= */

function endBalloonGame() {

    if (!balloonGameRunning) {
        return;
    }

    balloonGameRunning = false;

    clearInterval(balloonGameInterval);
    clearInterval(balloonSpawnInterval);

    balloonGameInterval = null;
    balloonSpawnInterval = null;


    /*
        Skor kadar coin.
    */

    const earnedCoins = balloonScore;

    const oldHighScore = getHighScore();

    let newHighScore = oldHighScore;

    if (balloonScore > oldHighScore) {

        newHighScore = balloonScore;

        setHighScore(balloonScore);

    }


    const newCoins =
        getCoins() + earnedCoins;

    setCoins(newCoins);


    /*
        Sonuç.
    */

    resultScore.textContent =
        balloonScore;

    resultCoins.textContent =
        `+${earnedCoins} Coin`;

    resultBest.textContent =
        `En yüksek: ${newHighScore}`;

    balloonResult.classList.add("show");

    updateGameMenu();

}


/* =========================================================
   BALON OYUNUNU DURDUR
========================================================= */

function stopBalloonGame() {

    balloonGameRunning = false;

    clearInterval(balloonGameInterval);

    clearInterval(balloonSpawnInterval);

    balloonGameInterval = null;

    balloonSpawnInterval = null;

}


/* =========================================================
   BALON TEKRAR OYNA
========================================================= */

playAgain.addEventListener("click", () => {

    balloonResult.classList.remove("show");

    startBalloonGame();

});


/* =========================================================
   BALON SONUÇ -> OYUN MENÜSÜ
========================================================= */

resultBack.addEventListener("click", () => {

    balloonResult.classList.remove("show");

    balloonGame.classList.remove("show");

    updateGameMenu();

    balloonMenu.classList.add("show");

});


/* =========================================================
   BALON GERİ
========================================================= */

balloonBack.addEventListener("click", () => {

    stopBalloonGame();

    balloonGame.classList.remove("show");
    updateGameMenu();
    balloonMenu.classList.add("show");

});


/* =========================================================
   MARKETİ AÇ
========================================================= */

balloonMarketOpen.addEventListener("click", () => {

    openGameWithLoading(
        "Market hazırlanıyor",
        "Balon koleksiyonu açılıyor...",
        "fa-solid fa-store",
        () => {

            balloonMenu.classList.remove("show");

            balloonMarket.classList.add("show");

            renderMarket();

        }
    );

});


/* =========================================================
   MARKETİ RENDER
========================================================= */

function renderMarket() {

    shopBalloons.innerHTML = "";

    const coins = getCoins();

    const owned = getOwnedBalloons();

    const selected = getSelectedBalloon();

    marketCoins.textContent = coins;


    balloonTypes.forEach(balloon => {

        const card =
            document.createElement("div");

        card.className = "shop-card";


        const preview =
            document.createElement("div");

        preview.className = "shop-preview";


        const visual =
            document.createElement("div");

        visual.className = "shop-balloon";

        visual.style.background =
            balloon.color;

        preview.appendChild(visual);


        const title =
            document.createElement("h3");

        title.textContent =
            balloon.name;


        const description =
            document.createElement("p");

        description.textContent =
            balloon.description;


        const button =
            document.createElement("button");

        button.className = "shop-buy";


        const isOwned =
            owned.includes(balloon.id);

        const isSelected =
            selected === balloon.id;


        if (isSelected) {

            button.textContent =
                "Kullanılıyor";

            button.classList.add("selected");

        } else if (isOwned) {

            button.textContent =
                "Kullan";

            button.classList.add("owned");

        } else {

            button.innerHTML =
                `<i class="fa-solid fa-coins"></i>
                 ${balloon.price} Coin`;

        }


        button.addEventListener("click", () => {

            handleBalloonPurchase(balloon);

        });


        card.appendChild(preview);

        card.appendChild(title);

        card.appendChild(description);

        card.appendChild(button);

        shopBalloons.appendChild(card);

    });

}


/* =========================================================
   MARKET SATIN AL / KULLAN
========================================================= */

function handleBalloonPurchase(balloon) {

    const owned =
        getOwnedBalloons();

    /*
        Zaten alınmışsa seç.
    */

    if (owned.includes(balloon.id)) {

        setSelectedBalloon(balloon.id);

        renderMarket();

        return;

    }


    /*
        Coin kontrolü.
    */

    const coins = getCoins();

    if (coins < balloon.price) {

        showBreakNotification(
            "Yeterli coin yok",
            `${balloon.price} coin gerekiyor.`
        );

        return;

    }


    /*
        Satın al.
    */

    setCoins(
        coins - balloon.price
    );

    owned.push(balloon.id);

    setOwnedBalloons(owned);

    setSelectedBalloon(balloon.id);

    renderMarket();

    updateGameMenu();


    /*
        Küçük titreşim.
    */

    if ("vibrate" in navigator) {

        try {
            navigator.vibrate(50);
        } catch (error) {}

    }

}


/* =========================================================
   MARKET GERİ
========================================================= */

marketBack.addEventListener("click", () => {

    balloonMarket.classList.remove("show");

    updateGameMenu();

    balloonMenu.classList.add("show");

});


/* =========================================================
   HAFIZA OYUNU AÇ
========================================================= */

memoryGameOpen.addEventListener("click", () => {

    openGameWithLoading(
        "Hafıza hazırlanıyor",
        "Kartlar karıştırılıyor...",
        "fa-solid fa-brain",
        () => {

            gamePage.classList.remove("show");

            memoryGame.classList.add("show");

            startMemoryGame();

        }
    );

});


/* =========================================================
   HAFIZA VERİLERİ
========================================================= */

const memorySymbols = [

    "fa-solid fa-star",
    "fa-solid fa-heart",
    "fa-solid fa-bolt",
    "fa-solid fa-moon",
    "fa-solid fa-sun",
    "fa-solid fa-cloud",
    "fa-solid fa-gem",
    "fa-solid fa-rocket"

];


let memoryCards = [];

let memoryFirstCard = null;

let memorySecondCard = null;

let memoryLock = false;

let memoryMoves = 0;

let memoryPairs = 0;

let memorySeconds = 0;

let memoryTimerInterval = null;

let memoryGameRunning = false;


/* =========================================================
   HAFIZA BAŞLAT
========================================================= */

function startMemoryGame() {

    stopMemoryGame();

    memoryGameRunning = true;

    memoryFirstCard = null;

    memorySecondCard = null;

    memoryLock = false;

    memoryMoves = 0;

    memoryPairs = 0;

    memorySeconds = 0;

    memoryMovesElement.textContent = "0";

    memoryPairsElement.textContent = "0 / 8";

    memoryTimeElement.textContent = "00:00";

    memoryMessage.textContent =
        "Aynı simgeleri bulmaya çalış!";


    /*
        Her simgeden 2 tane.
    */

    const deck = [
        ...memorySymbols,
        ...memorySymbols
    ];


    /*
        Karıştır.
    */

    shuffleArray(deck);


    memoryCards = deck;

    memoryBoard.innerHTML = "";


    deck.forEach((symbol, index) => {

        const card =
            document.createElement("button");

        card.className = "memory-card";

        card.dataset.index = index;

        card.dataset.symbol = symbol;


        const inner =
            document.createElement("div");

        inner.className =
            "memory-card-inner";


        const icon =
            document.createElement("i");

        icon.className =
            `memory-symbol ${symbol}`;


        inner.appendChild(icon);

        card.appendChild(inner);

        card.addEventListener(
            "click",
            () => handleMemoryCard(card)
        );

        memoryBoard.appendChild(card);

    });


    memoryTimerInterval =
        setInterval(() => {

            if (!memoryGameRunning) {
                return;
            }

            memorySeconds++;

            memoryTimeElement.textContent =
                formatTime(memorySeconds);

        }, 1000);

}


/* =========================================================
   HAFIZA KARTINA BAS
========================================================= */

function handleMemoryCard(card) {

    /*
        Oyun kilitliyse hiçbir şey yapma.

        Bu kontrol 3. kartın aynı anda açılmasını
        engelliyor.
    */

    if (memoryLock) {
        return;
    }


    /*
        Zaten açık veya eşleşmiş kart.
    */

    if (
        card.classList.contains("open") ||
        card.classList.contains("matched")
    ) {
        return;
    }


    /*
        İlk kart.
    */

    if (!memoryFirstCard) {

        memoryFirstCard = card;

        card.classList.add("open");

        return;

    }


    /*
        Aynı karta ikinci kez basma.
    */

    if (memoryFirstCard === card) {
        return;
    }


    /*
        İkinci kart.
    */

    memorySecondCard = card;

    card.classList.add("open");

    memoryMoves++;

    memoryMovesElement.textContent =
        memoryMoves;


    /*
        ARTIK KİLİTLİ.

        Böylece hızlıca 3. karta basılırsa
        3. kart açılmaz.
    */

    memoryLock = true;


    const firstSymbol =
        memoryFirstCard.dataset.symbol;

    const secondSymbol =
        memorySecondCard.dataset.symbol;


    /*
        EŞLEŞME
    */

    if (firstSymbol === secondSymbol) {

        setTimeout(() => {

            memoryFirstCard.classList.remove("open");
            memorySecondCard.classList.remove("open");

            memoryFirstCard.classList.add("matched");
            memorySecondCard.classList.add("matched");

            memoryPairs++;

            memoryPairsElement.textContent =
                `${memoryPairs} / 8`;

            memoryFirstCard = null;

            memorySecondCard = null;

            memoryLock = false;


            /*
                Hepsi tamamlandı.
            */

            if (memoryPairs >= 8) {

                finishMemoryGame();

            }

        }, 350);


        return;

    }


    /*
        EŞLEŞMEDİ
    */

    setTimeout(() => {

        memoryFirstCard.classList.remove("open");

        memorySecondCard.classList.remove("open");

        memoryFirstCard = null;

        memorySecondCard = null;

        memoryLock = false;

    }, 800);

}


/* =========================================================
   HAFIZA BİTİR
========================================================= */

function finishMemoryGame() {

    if (!memoryGameRunning) {
        return;
    }

    memoryGameRunning = false;

    clearInterval(memoryTimerInterval);

    memoryTimerInterval = null;

    memoryResultMoves.textContent =
        memoryMoves;

    memoryResultTime.textContent =
        formatTime(memorySeconds);

    memoryResult.classList.add("show");

}


/* =========================================================
   HAFIZA DURDUR
========================================================= */

function stopMemoryGame() {

    memoryGameRunning = false;

    clearInterval(memoryTimerInterval);

    memoryTimerInterval = null;

}


/* =========================================================
   HAFIZA TEKRAR
========================================================= */

memoryAgain.addEventListener("click", () => {

    memoryResult.classList.remove("show");

    startMemoryGame();

});


/* =========================================================
   HAFIZA SONUÇ -> MENÜ
========================================================= */

memoryResultBack.addEventListener("click", () => {

    memoryResult.classList.remove("show");

    stopMemoryGame();

    memoryGame.classList.remove("show");

    updateGameMenu();

    gamePage.classList.add("show");

});


/* =========================================================
   HAFIZA GERİ
========================================================= */

memoryBack.addEventListener("click", () => {

    stopMemoryGame();

    memoryGame.classList.remove("show");

    gamePage.classList.add("show");

});


/* =========================================================
   ARRAY KARIŞTIR
========================================================= */

function shuffleArray(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }

    return array;

}


/* =========================================================
   ZAMAN FORMAT
========================================================= */

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const remaining =
        seconds % 60;

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remaining).padStart(2, "0")
    );

}


/* =========================================================
   SAYFA GÖRÜNÜR OLDUĞUNDA
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        /*
            Timer zaten Date.now() üzerinden çalışıyor.

            Kullanıcı uygulamayı arka plana alıp geri geldiğinde
            süre kaldığı yerden değil, gerçek geçen zamana göre
            güncellenir.
        */

        if (!document.hidden) {

            if (
                breakStartedAt > 0 &&
                !breakFinished
            ) {

                updateBreakTimer();

            }

        }

    }
);


/* =========================================================
   BAŞLANGIÇ
========================================================= */

updateGameMenu();

