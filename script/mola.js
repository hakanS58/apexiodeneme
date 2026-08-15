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
const reactionGameOpen = document.getElementById("reactionGameOpen");
const mergeGameOpen = document.getElementById("mergeGameOpen");
const puzzleGameOpen = document.getElementById("puzzleGameOpen");
const balloonStartButton = document.getElementById("balloonStartButton");
const balloonMarketOpen = document.getElementById("balloonMarketOpen");
const memoryStartButton = document.getElementById("memoryStartButton");
const memoryMenu = document.getElementById("memoryMenu");
const memoryMenuBack = document.getElementById("memoryMenuBack");
const memoryMenuBestMoves = document.getElementById("memoryMenuBestMoves");
const memoryMenuBestMovesTop = document.getElementById("memoryMenuBestMovesTop");

const reactionMenu = document.getElementById("reactionMenu");
const reactionMenuBack = document.getElementById("reactionMenuBack");
const reactionStartButton = document.getElementById("reactionStartButton");
const reactionMenuBest = document.getElementById("reactionMenuBest");
const reactionMenuBestCard = document.getElementById("reactionMenuBestCard");
const reactionGame = document.getElementById("reactionGame");
const reactionBack = document.getElementById("reactionBack");
const reactionArena = document.getElementById("reactionArena");
const reactionStatus = document.getElementById("reactionStatus");
const reactionTime = document.getElementById("reactionTime");
const reactionResultTime = document.getElementById("reactionResultTime");
const reactionResultMessage = document.getElementById("reactionResultMessage");
const reactionResult = document.getElementById("reactionResult");
const reactionRetry = document.getElementById("reactionRetry");
const reactionResultBack = document.getElementById("reactionResultBack");
const mergeMenu = document.getElementById("mergeMenu");
const mergeMenuBack = document.getElementById("mergeMenuBack");
const mergeStartButton = document.getElementById("mergeStartButton");
const mergeMenuBest = document.getElementById("mergeMenuBest");
const mergeMenuBestCard = document.getElementById("mergeMenuBestCard");
const mergeGame = document.getElementById("mergeGame");
const mergeBack = document.getElementById("mergeBack");
const mergeStartBoard = document.getElementById("mergeBoard");
const mergeScoreElement = document.getElementById("mergeScore");
const mergeBestElement = document.getElementById("mergeBest");

const puzzleMenu = document.getElementById("puzzleMenu");
const puzzleMenuBack = document.getElementById("puzzleMenuBack");
const puzzleStartButton = document.getElementById("puzzleStartButton");
const puzzleMenuBest = document.getElementById("puzzleMenuBest");
const puzzleMenuBestCard = document.getElementById("puzzleMenuBestCard");
const puzzleGame = document.getElementById("puzzleGame");
const puzzleBack = document.getElementById("puzzleBack");
const puzzleBoard = document.getElementById("puzzleBoard");
const puzzleTarget = document.getElementById("puzzleTarget");
const puzzleMovesElement = document.getElementById("puzzleMoves");
const puzzleMovesInfo = document.getElementById("puzzleMovesInfo");
const puzzleBestInfo = document.getElementById("puzzleBestInfo");
const puzzleMessage = document.getElementById("puzzleMessage");
const puzzleResult = document.getElementById("puzzleResult");
const puzzleResultMoves = document.getElementById("puzzleResultMoves");
const puzzleResultMessage = document.getElementById("puzzleResultMessage");
const puzzleAgain = document.getElementById("puzzleAgain");
const puzzleResultBack = document.getElementById("puzzleResultBack");
const mergeResult = document.getElementById("mergeResult");
const mergeResultScore = document.getElementById("mergeResultScore");
const mergeResultMessage = document.getElementById("mergeResultMessage");
const mergeAgain = document.getElementById("mergeAgain");
const mergeResultBack = document.getElementById("mergeResultBack");

const stackGameOpen = document.getElementById("stackGameOpen");
const stackMenu = document.getElementById("stackMenu");
const stackMenuBack = document.getElementById("stackMenuBack");
const stackStartButton = document.getElementById("stackStartButton");
const stackMenuBest = document.getElementById("stackMenuBest");
const stackMenuBestCard = document.getElementById("stackMenuBestCard");
const stackGame = document.getElementById("stackGame");
const stackBack = document.getElementById("stackBack");
const stackArena = document.getElementById("stackArena");
const stackTower = document.getElementById("stackTower");
const stackMoving = document.getElementById("stackMoving");
const stackScoreElement = document.getElementById("stackScore");
const stackBestElement = document.getElementById("stackBest");
const stackInstruction = document.getElementById("stackInstruction");
const stackResult = document.getElementById("stackResult");
const stackResultScore = document.getElementById("stackResultScore");
const stackResultMessage = document.getElementById("stackResultMessage");
const stackAgain = document.getElementById("stackAgain");
const stackResultBack = document.getElementById("stackResultBack");

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
    "Ey yükselen yeni nesil! Gelecek sizindir.",
    "Gençler, cesaretimizi güçlendiren ve sürdüren sizlersiniz.",
    "Gençliği yetiştiriniz. Onlara ilim ve irfanın müspet fikirlerini veriniz."
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

    selectedBalloon: "apexio_selected_balloon",

    memoryBestMoves: "apexio_memory_best_moves",

    reactionBest: "apexio_reaction_best",

    mergeBest: "apexio_merge_best",

    puzzleBestMoves: "apexio_puzzle_best_moves"

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


function getMemoryBestMoves() {
    const value = Number(localStorage.getItem(STORAGE.memoryBestMoves) || 0);
    return value > 0 ? value : null;
}

function setMemoryBestMoves(value) {
    localStorage.setItem(STORAGE.memoryBestMoves, String(value));
}

function getReactionBest() {
    const value = Number(localStorage.getItem(STORAGE.reactionBest) || 0);
    return value > 0 ? value : null;
}

function setReactionBest(value) {
    localStorage.setItem(STORAGE.reactionBest, String(value));
}

function getMergeBest() {
    return Number(localStorage.getItem(STORAGE.mergeBest) || 0);
}
function setMergeBest(value) {
    localStorage.setItem(STORAGE.mergeBest, String(value));
}
function getPuzzleBestMoves() {
    const value = Number(localStorage.getItem(STORAGE.puzzleBestMoves) || 0);
    return value > 0 ? value : null;
}
function setPuzzleBestMoves(value) {
    localStorage.setItem(STORAGE.puzzleBestMoves, String(value));
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

    const bestMoves = getMemoryBestMoves();
    const bestReaction = getReactionBest();

    if (memoryMenuBestMoves) {
        memoryMenuBestMoves.textContent = bestMoves ? `${bestMoves} Hamle` : "Henüz yok";
    }

    if (memoryMenuBestMovesTop) {
        memoryMenuBestMovesTop.textContent = bestMoves ? bestMoves : "--";
    }

    if (reactionMenuBest) {
        reactionMenuBest.textContent = bestReaction ? `${bestReaction} ms` : "-- ms";
    }

    if (reactionMenuBestCard) {
        reactionMenuBestCard.textContent = bestReaction ? `${bestReaction} ms` : "Henüz yok";
    }

    const bestMerge = getMergeBest();
    if (mergeMenuBest) mergeMenuBest.textContent = bestMerge;
    if (mergeMenuBestCard) mergeMenuBestCard.textContent = bestMerge;

    const bestPuzzle = getPuzzleBestMoves();
    if (puzzleMenuBest) puzzleMenuBest.textContent = bestPuzzle ? bestPuzzle : "0";
    if (puzzleMenuBestCard) puzzleMenuBestCard.textContent = bestPuzzle ? `${bestPuzzle} Puan` : "Henüz yok";

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
let balloonAnimationFrame = null;
let balloonGameStartedAt = 0;


/* =========================================================
   BALON OYUNU BAŞLAT
========================================================= */

function startBalloonGame() {

    stopBalloonGame();

    balloonScore = 0;

    balloonGameSeconds = 30;

    balloonGameRunning = true;
    balloonGameStartedAt = performance.now();
    updateBalloonMotion.lastTime = 0;

    balloonScoreElement.textContent = "0";

    balloonTimerElement.textContent = "30";

    balloonCoinsElement.textContent = getCoins();

    balloonBestElement.textContent = getHighScore();

    balloonArena.innerHTML = "";

    /*
        İlk balonları üret.
    */

    for (let i = 0; i < 5; i++) {

        setTimeout(() => {

            if (balloonGameRunning) {
                spawnBalloon();
            }

        }, i * 170);

    }


    /*
        Yeni balonlar.
    */

    balloonSpawnInterval =
        setInterval(() => {

            if (balloonGameRunning) {
                spawnBalloon();
            }

        }, 350);


    balloonAnimationFrame = requestAnimationFrame(updateBalloonMotion);

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

    if (!balloonGameRunning) return;

    const isBomb = Math.random() < 0.20;
    const item = document.createElement("div");

    item.className = isBomb ? "balloon bomb" : "balloon";
    item.dataset.type = isBomb ? "bomb" : "balloon";
    item.dataset.popped = "0";

    const arenaWidth = balloonArena.clientWidth;
    const size = isBomb ? 52 : 50;
    const maxX = Math.max(5, arenaWidth - size - 5);

    item.style.left = Math.floor(Math.random() * maxX) + "px";
    item.style.bottom = "-90px";

    item.dataset.y = "-90";
    item.dataset.spawnedAt = String(performance.now());

    if (isBomb) {
        item.innerHTML = `<span class="bomb-icon"><i class="fa-solid fa-bomb"></i></span>`;
    } else {
        const selectedId = getSelectedBalloon();
        const selected = balloonTypes.find(x => x.id === selectedId) || balloonTypes[0];
        item.style.background = selected.color;
        item.style.setProperty("--balloon-scale", 0.78 + Math.random() * 0.45);

        const string = document.createElement("span");
        string.className = "balloon-string";
        item.appendChild(string);
    }

    item.addEventListener("pointerdown", event => {
        event.preventDefault();

        if (!balloonGameRunning || item.dataset.popped === "1") return;

        item.dataset.popped = "1";

        if (isBomb) {
            balloonScore = Math.max(0, balloonScore - 1);
            item.classList.add("bomb-hit");
        } else {
            balloonScore++;
            item.classList.add("pop");
        }

        balloonScoreElement.textContent = balloonScore;

        setTimeout(() => item.remove(), 180);
    }, { passive: false });

    balloonArena.appendChild(item);

    // Bombalar dokunulmazsa 5 saniyede kaybolur.
    setTimeout(() => {
        if (item.isConnected && item.dataset.popped !== "1") item.remove();
    }, isBomb ? 5000 : 15000);

}

function getBalloonRiseSpeed() {
    const elapsed = Math.max(0, (performance.now() - balloonGameStartedAt) / 1000);

    // İlk 5 saniye mevcut başlangıç hızı korunur.
    // Sonrasında hız süre azaldıkça belirgin şekilde artar.
    if (elapsed <= 5) return 155;

    const t = Math.min(1, (elapsed - 5) / 25);
    // Yumuşak ama güçlü hızlanma: 155 -> yaklaşık 430 px/sn.
    return 155 + (t * t * 275);
}

function updateBalloonMotion(timestamp) {
    if (!balloonGameRunning) return;
    const delta = Math.min(0.04, ((updateBalloonMotion.lastTime || timestamp) ? (timestamp - (updateBalloonMotion.lastTime || timestamp)) / 1000 : 0));
    updateBalloonMotion.lastTime = timestamp;
    const speed = getBalloonRiseSpeed();
    const arenaHeight = balloonArena.clientHeight;
    balloonArena.querySelectorAll('.balloon').forEach(item => {
        if (item.dataset.popped === '1') return;
        let y = Number(item.dataset.y || -90);
        y += speed * delta;
        item.dataset.y = String(y);
        item.style.bottom = `${y}px`;
        if (y > arenaHeight + 80) item.remove();
    });
    balloonAnimationFrame = requestAnimationFrame(updateBalloonMotion);
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

    if (balloonAnimationFrame) {
        cancelAnimationFrame(balloonAnimationFrame);
        balloonAnimationFrame = null;
    }
    updateBalloonMotion.lastTime = 0;

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
        "Hafıza menüsü açılıyor...",
        "fa-solid fa-brain",
        () => {
            gamePage.classList.remove("show");
            updateGameMenu();
            memoryMenu.classList.add("show");
        }
    );

});

memoryStartButton.addEventListener("click", () => {
    memoryMenu.classList.remove("show");
    memoryGame.classList.add("show");
    startMemoryGame();
});

memoryMenuBack.addEventListener("click", () => {
    memoryMenu.classList.remove("show");
    gamePage.classList.add("show");
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

    const oldBestMoves = getMemoryBestMoves();
    const isNewRecord = !oldBestMoves || memoryMoves < oldBestMoves;

    if (isNewRecord) setMemoryBestMoves(memoryMoves);

    memoryResultMoves.textContent = memoryMoves;
    memoryResultTime.textContent = formatTime(memorySeconds);

    const resultMessage = document.getElementById("memoryResultMessage");
    if (resultMessage) {
        resultMessage.textContent = isNewRecord
            ? `Yeni rekor! Bu oyunu ${memoryMoves} hamlede tamamladın.`
            : `Bu oyunu ${memoryMoves} hamlede tamamladın. Rekorun ${getMemoryBestMoves()} hamle.`;
    }

    updateGameMenu();
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

    memoryMenu.classList.add("show");

});


/* =========================================================
   HAFIZA GERİ
========================================================= */

memoryBack.addEventListener("click", () => {

    stopMemoryGame();

    memoryGame.classList.remove("show");

    updateGameMenu();
    memoryMenu.classList.add("show");

});


/* =========================================================
   REFLEKS TESTİ
========================================================= */

let reactionGameRunning = false;
let reactionWaiting = false;
let reactionReadyAt = 0;
let reactionTimeout = null;

reactionGameOpen.addEventListener("click", () => {
    openGameWithLoading(
        "Refleks hazırlanıyor",
        "Ne kadar hızlı tepki verebildiğini görelim...",
        "fa-solid fa-bolt",
        () => {
            gamePage.classList.remove("show");
            updateGameMenu();
            reactionMenu.classList.add("show");
        }
    );
});

reactionStartButton.addEventListener("click", startReactionGame);
reactionRetry.addEventListener("click", startReactionGame);

reactionMenuBack.addEventListener("click", () => {
    clearReactionTimer();
    reactionMenu.classList.remove("show");
    gamePage.classList.add("show");
});

reactionBack.addEventListener("click", () => {
    clearReactionTimer();
    reactionGameRunning = false;
    reactionGame.classList.remove("show");
    reactionMenu.classList.add("show");
    updateGameMenu();
});

reactionResultBack.addEventListener("click", () => {
    reactionResult.classList.remove("show");
    reactionGameRunning = false;
    reactionGame.classList.remove("show");
    reactionMenu.classList.add("show");
    updateGameMenu();
});

reactionArena.addEventListener("pointerdown", handleReactionTap, { passive: false });

function startReactionGame() {
    clearReactionTimer();
    reactionResult.classList.remove("show");
    reactionGame.classList.add("show");
    reactionGameRunning = true;
    reactionWaiting = true;
    reactionReadyAt = 0;
    reactionArena.className = "reaction-arena reaction-waiting";
    reactionStatus.textContent = "Bekle... Yeşile dönünce dokun!";
    reactionTime.textContent = "-- ms";

    reactionTimeout = setTimeout(() => {
        if (!reactionGameRunning) return;
        reactionWaiting = false;
        reactionReadyAt = performance.now();
        reactionArena.className = "reaction-arena reaction-ready";
        reactionStatus.textContent = "ŞİMDİ!";
    }, 1200 + Math.random() * 2800);
}

function handleReactionTap(event) {
    event.preventDefault();
    if (!reactionGameRunning) return;

    if (reactionWaiting) {
        clearReactionTimer();
        reactionWaiting = false;
        reactionArena.className = "reaction-arena reaction-false";
        reactionStatus.textContent = "Erken bastın! Tekrar dene.";
        setTimeout(() => { if (reactionGameRunning) startReactionGame(); }, 900);
        return;
    }

    const result = Math.max(1, Math.round(performance.now() - reactionReadyAt));
    reactionGameRunning = false;

    const oldBest = getReactionBest();
    const isRecord = !oldBest || result < oldBest;
    if (isRecord) setReactionBest(result);

    reactionTime.textContent = `${result} ms`;
    reactionResultTime.textContent = `${result} ms`;
    reactionResultMessage.textContent = isRecord
        ? "Yeni rekor! Refleksin gerçekten iyi."
        : `Rekorun ${getReactionBest()} ms. Bir tur daha dene!`;
    reactionStatus.textContent = isRecord ? "Yeni rekor!" : "Harika refleks!";
    reactionArena.className = "reaction-arena reaction-result-ready";
    updateGameMenu();

    setTimeout(() => reactionResult.classList.add("show"), 250);
}

function clearReactionTimer() {
    if (reactionTimeout) {
        clearTimeout(reactionTimeout);
        reactionTimeout = null;
    }
}


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



/* =========================================================
   SAYI BİRLEŞTİR (2048)
========================================================= */
let mergeGrid = [];
let mergeScore = 0;
let mergeRunning = false;

function createEmptyMergeGrid(){ return Array.from({length:4},()=>Array(4).fill(0)); }
function addMergeTile(){
    const empty=[];
    mergeGrid.forEach((row,r)=>row.forEach((v,c)=>{if(!v) empty.push([r,c]);}));
    if(!empty.length) return false;
    const [r,c]=empty[Math.floor(Math.random()*empty.length)];
    mergeGrid[r][c]=Math.random()<0.9?2:4; return true;
}
function slideMergeLine(line){
    const arr=line.filter(Boolean), out=[]; let gained=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]===arr[i+1]){ const v=arr[i]*2; out.push(v); gained+=v; i++; }
        else out.push(arr[i]);
    }
    while(out.length<4) out.push(0);
    return {line:out,gained};
}
function moveMerge(dir){
    if(!mergeRunning) return false;
    const before=JSON.stringify(mergeGrid); let gained=0;
    if(dir==='left'||dir==='right'){
        for(let r=0;r<4;r++){ let line=[...mergeGrid[r]]; if(dir==='right') line.reverse(); const res=slideMergeLine(line); if(dir==='right') res.line.reverse(); mergeGrid[r]=res.line; gained+=res.gained; }
    } else {
        for(let c=0;c<4;c++){ let line=[0,1,2,3].map(r=>mergeGrid[r][c]); if(dir==='down') line.reverse(); const res=slideMergeLine(line); if(dir==='down') res.line.reverse(); [0,1,2,3].forEach(r=>mergeGrid[r][c]=res.line[r]); gained+=res.gained; }
    }
    if(JSON.stringify(mergeGrid)===before) return false;
    mergeScore+=gained; mergeScoreElement.textContent=mergeScore;
    if(mergeScore>getMergeBest()) setMergeBest(mergeScore);
    addMergeTile(); renderMerge(); updateGameMenu();
    if(!canMergeMove()) setTimeout(()=>{
        if(!mergeRunning) return;
        mergeRunning=false;
        mergeResultScore.textContent = mergeScore;
        const oldBest = getMergeBest();
        mergeResultMessage.textContent = mergeScore >= oldBest
            ? `Oyun bitti! Skorun ${mergeScore}. Yeni rekorunu zorlamaya devam et.`
            : `Oyun bitti! Skorun ${mergeScore}. Rekorun ${oldBest}.`;
        mergeResult.classList.add('show');
        updateGameMenu();
    },300);
    return true;
}
function canMergeMove(){
    if(mergeGrid.some(r=>r.includes(0))) return true;
    for(let r=0;r<4;r++) for(let c=0;c<4;c++){ if(c<3&&mergeGrid[r][c]===mergeGrid[r][c+1]) return true; if(r<3&&mergeGrid[r][c]===mergeGrid[r+1][c]) return true; }
    return false;
}
function renderMerge(){
    mergeStartBoard.innerHTML='';
    mergeGrid.flat().forEach(v=>{ const t=document.createElement('div'); t.className=`merge-tile ${v?'v'+v:''}`; t.textContent=v||''; mergeStartBoard.appendChild(t); });
}
function startMergeGame(){
    mergeRunning=true; mergeScore=0; mergeGrid=createEmptyMergeGrid(); addMergeTile(); addMergeTile(); mergeScoreElement.textContent='0'; mergeBestElement.textContent=getMergeBest(); renderMerge();
}
function openMergeMenu(){ openGameWithLoading('Sayı oyunu hazırlanıyor','Tahta hazırlanıyor...','fa-solid fa-layer-group',()=>{ gamePage.classList.remove('show'); updateGameMenu(); mergeMenu.classList.add('show'); }); }
mergeGameOpen.addEventListener('click',openMergeMenu);
mergeStartButton.addEventListener('click',()=>{mergeMenu.classList.remove('show'); mergeGame.classList.add('show'); startMergeGame();});
mergeMenuBack.addEventListener('click',()=>{mergeMenu.classList.remove('show');gamePage.classList.add('show');});
mergeBack.addEventListener('click',()=>{mergeRunning=false;mergeGame.classList.remove('show');updateGameMenu();mergeMenu.classList.add('show');});
mergeAgain.addEventListener('click',()=>{mergeResult.classList.remove('show');mergeGame.classList.add('show');startMergeGame();});
mergeResultBack.addEventListener('click',()=>{mergeResult.classList.remove('show');mergeGame.classList.remove('show');updateGameMenu();mergeMenu.classList.add('show');});
window.addEventListener('keydown',e=>{ if(!mergeGame.classList.contains('show')) return; const map={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'}; if(map[e.key]){e.preventDefault();moveMerge(map[e.key]);}});
let mergeTouchStart=null;
mergeStartBoard.addEventListener('touchstart',e=>{const t=e.changedTouches[0];mergeTouchStart=[t.clientX,t.clientY];},{passive:true});
mergeStartBoard.addEventListener('touchend',e=>{if(!mergeTouchStart)return;const t=e.changedTouches[0],dx=t.clientX-mergeTouchStart[0],dy=t.clientY-mergeTouchStart[1];mergeTouchStart=null;if(Math.max(Math.abs(dx),Math.abs(dy))<25)return;moveMerge(Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up'));},{passive:true});

/* =========================================================
   HEDEF AVI
========================================================= */
let puzzleMoves=0;
let puzzleRunning=false;
let puzzleTargetTimer=null;
let puzzleGameTimer=null;
let puzzleEndAt=0;
let puzzleTargetSize=74;
let puzzleTargetX=0;
let puzzleTargetY=0;

function getPuzzleBestMoves(){
    return Number(localStorage.getItem(STORAGE.puzzleBestMoves) || 0);
}
function setPuzzleBestMoves(value){
    localStorage.setItem(STORAGE.puzzleBestMoves, String(value));
}

function renderTargetBest(){
    const best=getPuzzleBestMoves();
    if(puzzleMenuBest) puzzleMenuBest.textContent=best ? best : "0";
    if(puzzleMenuBestCard) puzzleMenuBestCard.textContent=best ? `${best} Puan` : "Henüz yok";
    if(puzzleBestInfo) puzzleBestInfo.textContent=best || "--";
}

function clearTargetTimers(){
    if(puzzleTargetTimer){ clearTimeout(puzzleTargetTimer); puzzleTargetTimer=null; }
    if(puzzleGameTimer){ clearInterval(puzzleGameTimer); puzzleGameTimer=null; }
}

function placeTarget(){
    if(!puzzleRunning) return;

    const rect=puzzleBoard.getBoundingClientRect();
    const size=Math.max(38, 74 - Math.min(28, Math.floor(puzzleMoves/5)*4));
    puzzleTargetSize=size;

    const padding=12;
    const maxX=Math.max(padding, rect.width-size-padding);
    const maxY=Math.max(padding, rect.height-size-padding);

    puzzleTargetX=padding + Math.random()*(maxX-padding);
    puzzleTargetY=padding + Math.random()*(maxY-padding);

    puzzleTarget.style.width=size+"px";
    puzzleTarget.style.height=size+"px";
    puzzleTarget.style.left=puzzleTargetX+"px";
    puzzleTarget.style.top=puzzleTargetY+"px";
    puzzleTarget.classList.remove("target-pop");
    void puzzleTarget.offsetWidth;
    puzzleTarget.classList.add("target-pop");

    const lifespan=Math.max(520, 1250 - puzzleMoves*18);
    puzzleTargetTimer=setTimeout(()=>{
        if(!puzzleRunning) return;
        placeTarget();
    },lifespan);
}

function updateTargetCountdown(){
    if(!puzzleRunning) return;
    const left=Math.max(0,Math.ceil((puzzleEndAt-Date.now())/1000));
    puzzleMovesElement.textContent=left;
    puzzleMessage.textContent=left<=5 ? `ACELE ET! ${left}` : "HEDEFİ YAKALA!";
    if(left<=0) finishPuzzle();
}

function startPuzzleGame(){
    clearTargetTimers();
    puzzleRunning=true;
    puzzleMoves=0;
    puzzleMovesElement.textContent="30";
    puzzleMovesInfo.textContent="0";
    renderTargetBest();
    puzzleMessage.textContent="HEDEFİ YAKALA!";
    puzzleEndAt=Date.now()+30000;
    placeTarget();
    puzzleGameTimer=setInterval(updateTargetCountdown,100);
}

function hitTarget(){
    if(!puzzleRunning) return;
    puzzleMoves++;
    puzzleMovesInfo.textContent=puzzleMoves;
    placeTarget();
}

function finishPuzzle(){
    if(!puzzleRunning) return;
    puzzleRunning=false;
    clearTargetTimers();

    const old=getPuzzleBestMoves();
    const record=puzzleMoves>old;
    if(record) setPuzzleBestMoves(puzzleMoves);

    puzzleMovesElement.textContent="0";
    puzzleResultMoves.textContent=puzzleMoves;
    puzzleResultMessage.textContent=record
        ? `Yeni rekor! ${puzzleMoves} hedef yakaladın.`
        : `${puzzleMoves} hedef yakaladın. Rekorun ${getPuzzleBestMoves()} puan.`;

    renderTargetBest();
    updateGameMenu();
    setTimeout(()=>puzzleResult.classList.add("show"),180);
}

function openPuzzleMenu(){
    openGameWithLoading(
        "Hedef Avı hazırlanıyor",
        "Hedefler yerleştiriliyor...",
        "fa-solid fa-crosshairs",
        ()=>{
            gamePage.classList.remove("show");
            updateGameMenu();
            renderTargetBest();
            puzzleMenu.classList.add("show");
        }
    );
}

puzzleGameOpen.addEventListener("click",openPuzzleMenu);
puzzleStartButton.addEventListener("click",()=>{
    puzzleMenu.classList.remove("show");
    puzzleGame.classList.add("show");
    startPuzzleGame();
});
puzzleMenuBack.addEventListener("click",()=>{
    puzzleMenu.classList.remove("show");
    gamePage.classList.add("show");
});
puzzleBack.addEventListener("click",()=>{
    puzzleRunning=false;
    clearTargetTimers();
    puzzleGame.classList.remove("show");
    renderTargetBest();
    puzzleMenu.classList.add("show");
});
puzzleTarget.addEventListener("pointerdown",e=>{
    e.preventDefault();
    e.stopPropagation();
    hitTarget();
});
puzzleAgain.addEventListener("click",()=>{
    puzzleResult.classList.remove("show");
    puzzleGame.classList.add("show");
    startPuzzleGame();
});
puzzleResultBack.addEventListener("click",()=>{
    puzzleResult.classList.remove("show");
    puzzleRunning=false;
    clearTargetTimers();
    puzzleGame.classList.remove("show");
    renderTargetBest();
    puzzleMenu.classList.add("show");
});
renderTargetBest();

/* =========================================================
   KULE USTASI
========================================================= */
const STACK_STORAGE = "apexio_stack_best";
let stackRunning=false;
let stackScore=0;
let stackBest=Number(localStorage.getItem(STACK_STORAGE)||0);
let stackBlocks=[];
let stackMoveX=0;
let stackDirection=1;
let stackFrame=null;
let stackLastTime=0;
let stackBlockWidth=150;
let stackBlockHeight=30;

function getStackBest(){ return Number(localStorage.getItem(STACK_STORAGE)||0); }
function setStackBest(v){ localStorage.setItem(STACK_STORAGE,String(v)); stackBest=v; }
function updateStackMenu(){
    const best=getStackBest();
    stackMenuBest.textContent=best;
    stackMenuBestCard.textContent=best;
    stackBestElement.textContent=best;
}
function getStackHiddenCount(){
    // 10. kata gelindikten sonra alt katlar kadrajı doldurmaması için
    // en alttan kademeli olarak gizlenir.
    if(stackScore < 10) return 0;
    if(stackScore === 10) return 1;
    if(stackScore === 11) return 2;
    return Math.max(3, stackScore - 10);
}

function renderStackTower(){
    stackTower.innerHTML='';
    const hidden=getStackHiddenCount();
    stackBlocks.forEach((b,i)=>{
        if(i<hidden) return;
        const el=document.createElement('div');
        el.className='stack-block';
        el.style.width=b.width+'px';
        el.style.height=stackBlockHeight+'px';
        el.style.left=b.x+'px';
        el.style.bottom=((i-hidden)*stackBlockHeight)+'px';
        el.textContent=i+1;
        stackTower.appendChild(el);
    });
}
function spawnStackMoving(){
    const arenaW=stackArena.clientWidth;
    const base=stackBlocks[stackBlocks.length-1];
    stackBlockWidth=base ? base.width : Math.min(150,arenaW*0.55);
    stackMoveX=0;
    stackDirection=1;
    stackMoving.style.width=stackBlockWidth+'px';
    stackMoving.style.left='0px';
    const hidden=getStackHiddenCount();
    stackMoving.style.bottom=((stackBlocks.length-hidden)*stackBlockHeight)+'px';
    stackMoving.style.transform='none';
    stackMoving.style.display='block';
}
function updateStackCamera(){
    // Kamera HİÇ hareket etmez. Kule büyüdükçe en alttaki katlar
    // renderStackTower() tarafından gizlenir ve kalan katlar aşağı
    // doğru yeniden yerleştirilir. Böylece kule ekrandan dışarı taşmaz.
    if(!stackArena) return;
    stackTower.style.transform='none';
    stackMoving.style.transform='none';
}

function startStackGame(){
    if(stackFrame) cancelAnimationFrame(stackFrame);
    stackRunning=true; stackScore=0; stackBlocks=[]; stackLastTime=0;
    stackTower.style.transform='translateY(0)';
    stackMoving.style.transform='translateY(0)';
    stackScoreElement.textContent='0'; updateStackMenu();
    stackInstruction.textContent='Doğru anda dokun!';
    stackMoving.style.display='block';
    stackBlocks.push({x:Math.max(0,(stackArena.clientWidth-150)/2),width:Math.min(150,stackArena.clientWidth*0.55)});
    renderStackTower(); spawnStackMoving();
    updateStackCamera();
    stackFrame=requestAnimationFrame(updateStackMoving);
}
function updateStackMoving(timestamp){
    if(!stackRunning) return;
    const dt=stackLastTime ? Math.min(0.04,(timestamp-stackLastTime)/1000) : 0;
    stackLastTime=timestamp;
    const maxX=Math.max(0,stackArena.clientWidth-stackBlockWidth);
    const speed=180 + Math.min(100,stackScore*5);
    stackMoveX += stackDirection*speed*dt;
    if(stackMoveX<=0){stackMoveX=0;stackDirection=1;}
    if(stackMoveX>=maxX){stackMoveX=maxX;stackDirection=-1;}
    stackMoving.style.left=stackMoveX+'px';
    updateStackCamera();
    stackFrame=requestAnimationFrame(updateStackMoving);
}
function placeStackBlock(){
    if(!stackRunning) return;
    const prev=stackBlocks[stackBlocks.length-1];
    const left=Math.max(stackMoveX,prev.x);
    const right=Math.min(stackMoveX+stackBlockWidth,prev.x+prev.width);
    const overlap=right-left;
    if(overlap<=10){ finishStackGame(); return; }
    stackBlocks.push({x:left,width:overlap});
    stackScore=stackBlocks.length-1;
    stackScoreElement.textContent=stackScore;
    if(stackScore>getStackBest()) setStackBest(stackScore);
    renderStackTower();
    spawnStackMoving();
    updateStackCamera();
}
function finishStackGame(){
    if(!stackRunning)return;
    stackRunning=false;
    if(stackFrame) cancelAnimationFrame(stackFrame);
    stackFrame=null;
    stackMoving.style.display='none';
    const old=getStackBest();
    const record=stackScore>old;
    if(record)setStackBest(stackScore);
    stackResultScore.textContent=stackScore;
    stackResultMessage.textContent=record?`Yeni rekor! Kuleni ${stackScore} kat yükselttin.`:`Kuleni ${stackScore} kat yükselttin. Rekorun ${getStackBest()} kat.`;
    updateStackMenu();
    setTimeout(()=>stackResult.classList.add('show'),180);
}
function openStackMenu(){
    openGameWithLoading('Kule hazırlanıyor','Bloklar hazırlanıyor...','fa-solid fa-layer-group',()=>{
        gamePage.classList.remove('show'); updateGameMenu(); updateStackMenu(); stackMenu.classList.add('show');
    });
}
stackGameOpen.addEventListener('click',openStackMenu);
stackStartButton.addEventListener('click',()=>{stackMenu.classList.remove('show');stackGame.classList.add('show');startStackGame();});
stackMenuBack.addEventListener('click',()=>{stackMenu.classList.remove('show');gamePage.classList.add('show');});
stackArena.addEventListener('pointerdown',e=>{e.preventDefault();placeStackBlock();},{passive:false});
stackBack.addEventListener('click',()=>{stackRunning=false;if(stackFrame)cancelAnimationFrame(stackFrame);stackFrame=null;stackGame.classList.remove('show');updateStackMenu();stackMenu.classList.add('show');});
stackAgain.addEventListener('click',()=>{stackResult.classList.remove('show');stackGame.classList.add('show');startStackGame();});
stackResultBack.addEventListener('click',()=>{stackResult.classList.remove('show');stackGame.classList.remove('show');updateStackMenu();stackMenu.classList.add('show');});
updateStackMenu();
