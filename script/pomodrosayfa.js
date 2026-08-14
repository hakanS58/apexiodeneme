// ==========================================================================
// POMODORO SAYACI MANTIĞI (Gelişmiş Hafıza & Bağımsız Süre Yönetimi)
// ==========================================================================
// Kayıtlı süreleri çek (yoksa varsayılan)
// ==========================================================================
// POMODORO SAYACI MANTIĞI (Dakika & Saniye Ayarlı & Bağımsız Hafızalı)
// ==========================================================================
// Kayıtlı dakika ve saniyeleri çek (Yoksa varsayılan 25:00 ve 05:00)
let customWorkMinutes = parseInt(localStorage.getItem("nodax-work-min")) ?? 25;
let customWorkSeconds = parseInt(localStorage.getItem("nodax-work-sec")) ?? 0;
let customBreakMinutes = parseInt(localStorage.getItem("nodax-break-min")) ?? 5;
let customBreakSeconds = parseInt(localStorage.getItem("nodax-break-sec")) ?? 0;

// Eğer localStorage boşsa (null) gelen NaN durumlarını engellemek için güvenlik kontrolü
if (isNaN(customWorkMinutes)) customWorkMinutes = 25;
if (isNaN(customWorkSeconds)) customWorkSeconds = 0;
if (isNaN(customBreakMinutes)) customBreakMinutes = 5;
if (isNaN(customBreakSeconds)) customBreakSeconds = 0;

let timer;
let isRunning = false;
let currentMode = "work";

// Toplam saniye cinsinden bağımsız çalışma ve mola hafızaları
let workTimeLeft = (customWorkMinutes * 60) + customWorkSeconds;
let breakTimeLeft = (customBreakMinutes * 60) + customBreakSeconds;

const timerDisplay = document.getElementById("timer-display");
const btnStart = document.getElementById("btn-start");
const btnPause = document.getElementById("btn-pause");
const btnReset = document.getElementById("btn-reset");
const modeWork = document.getElementById("mode-work");
const modeBreak = document.getElementById("mode-break");

// Ayar Paneli Elementleri
const btnToggleSettings = document.getElementById("btn-toggle-settings");
const settingsPanel = document.getElementById("pomodoro-settings-panel");
const inputWorkMin = document.getElementById("input-work-min");
const inputWorkSec = document.getElementById("input-work-sec");
const inputBreakMin = document.getElementById("input-break-min");
const inputBreakSec = document.getElementById("input-break-sec");
const btnSaveSettings = document.getElementById("btn-save-settings");

// Açılışta input kutularının içini doldur
if (inputWorkMin && inputWorkSec && inputBreakMin && inputBreakSec) {
    inputWorkMin.value = customWorkMinutes;
    inputWorkSec.value = customWorkSeconds;
    inputBreakMin.value = customBreakMinutes;
    inputBreakSec.value = customBreakSeconds;
}

function getCurrentTimeLeft() {
    return currentMode === "work" ? workTimeLeft : breakTimeLeft;
}

function setCurrentTimeLeft(val) {
    if (currentMode === "work") {
        workTimeLeft = val;
    } else {
        breakTimeLeft = val;
    }
}

function updateDisplay() {
    const timeLeft = getCurrentTimeLeft();
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    if (timerDisplay) {
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}


function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    btnPause.classList.add("hidden");
    btnStart.classList.remove("hidden");
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    
    if (currentMode === "work") {
        workTimeLeft = (customWorkMinutes * 60) + customWorkSeconds;
    } else {
        breakTimeLeft = (customBreakMinutes * 60) + customBreakSeconds;
    }
    
    updateDisplay();
    if (btnPause && btnStart) {
        btnPause.classList.add("hidden");
        btnStart.classList.remove("hidden");
    }
}

if (modeWork && modeBreak) {
    modeWork.addEventListener("click", () => {
        if (currentMode === "work") return;
        if (isRunning) pauseTimer();
        currentMode = "work";
        modeBreak.classList.remove("active");
        modeWork.classList.add("active");
        updateDisplay();
    });

    modeBreak.addEventListener("click", () => {
        if (currentMode === "break") return;
        if (isRunning) pauseTimer();
        currentMode = "break";
        modeWork.classList.remove("active");
        modeBreak.classList.add("active");
        updateDisplay();
    });

    btnStart.addEventListener("click", startTimer);
    btnPause.addEventListener("click", pauseTimer);
    btnReset.addEventListener("click", resetTimer);

    btnToggleSettings.addEventListener("click", () => {
        if (isRunning) {
            showToast("⚠️ Sayaç çalışırken süreleri değiştiremezsiniz.");
            return;
        }
        settingsPanel.classList.toggle("hidden");
    });

    btnSaveSettings.addEventListener("click", () => {
        const wMin = parseInt(inputWorkMin.value) || 0;
        const wSec = parseInt(inputWorkSec.value) || 0;
        const bMin = parseInt(inputBreakMin.value) || 0;
        const bSec = parseInt(inputBreakSec.value) || 0;

        // Geçerlilik kontrolleri
        if (wMin < 0 || wSec < 0 || wSec > 59 || bMin < 0 || bSec < 0 || bSec > 59) {
            showToast("❌ Lütfen geçerli değerler girin (Saniye en fazla 59 olabilir).");
            return;
        }
        if ((wMin === 0 && wSec === 0) || (bMin === 0 && bSec === 0)) {
            showToast("❌ Süreler 00:00 olamaz.");
            return;
        }

        // Güncel değerleri ata ve kaydet
        customWorkMinutes = wMin;
        customWorkSeconds = wSec;
        customBreakMinutes = bMin;
        customBreakSeconds = bSec;

        localStorage.setItem("nodax-work-min", wMin);
        localStorage.setItem("nodax-work-sec", wSec);
        localStorage.setItem("nodax-break-min", bMin);
        localStorage.setItem("nodax-break-sec", bSec);

        // Zamanlayıcıları güncelle
        workTimeLeft = (wMin * 60) + wSec;
        breakTimeLeft = (bMin * 60) + bSec;

        settingsPanel.classList.add("hidden");
        updateDisplay();
        showToast("✅ Ayarlar kaydedildi ve süreler güncellendi.");
    });
}

// İlk açılış görüntüsü
updateDisplay();

// ==========================================================================
// DİJİTAL BİP BİP SES ÜRETECİ (Web Audio API)
// ==========================================================================
// ==========================================================================
// POMODORO ALARM SESİ YÖNETİMİ
// ==========================================================================
const alarmAudio = document.getElementById("pomodoro-alarm");

// Tarayıcıların "Kullanıcı etkileşimi olmadan ses çalamaz Otomatik Oynatma Engeli"ni
// aşmak için kullanıcı "Başlat" butonuna ilk bastığında ses elementini kilitli halden çıkarıyoruz.
function unlockAudio() {
    if (alarmAudio) {
        alarmAudio.play().then(() => {
            alarmAudio.pause();
            alarmAudio.currentTime = 0;
        }).catch(e => console.log("Ses kilidi açılırken tarayıcı engeli:", e));
        
        // Kilidi bir kez açmak yeterli olduğundan dinleyicileri kaldırıyoruz
        btnStart.removeEventListener("click", unlockAudio);
    }
}

function playBipBipSound() {
    if (!alarmAudio) return;
    
    // Eğer default base64 sesini kullanıyorsan ve ses çıkmıyorsa yedek dijital bip üreteci:
    if (alarmAudio.src.includes("data:audio")) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            let delay = 0;
            // 4 defa kısa aralıklarla bip sesi üretir (Bip Bip - Bip Bip)
            [800, 800, 880, 880].forEach((freq, index) => {
                setTimeout(() => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = "sine";
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.2, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.15);
                }, delay);
                delay += (index === 1) ? 400 : 200; // İkili bip arası boşluk
            });
        } catch(e) { console.log(e); }
    } else {
        // Eğer src kısmına kendi .mp3 dosyanı yazdıysan burası çalışır:
        alarmAudio.currentTime = 0;
        alarmAudio.play().catch(e => console.log("Ses oynatılamadı:", e));
    }
}

// DOMContentLoaded İçindeki startTimer yapısını da bu ses mantığına göre senkronize edelim:
// indexscript.js içindeki startTimer fonksiyonunu bul ve komple şu şekilde değiştir:
function startTimer() {
    if (isRunning) return;
    isRunning = true;
    btnStart.classList.add("hidden");
    btnPause.classList.remove("hidden");
    if(settingsPanel) settingsPanel.classList.add("hidden");

    timer = setInterval(() => {
        let timeLeft = getCurrentTimeLeft();
        if (timeLeft > 0) {
            timeLeft--;
            setCurrentTimeLeft(timeLeft);
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            
            // SÜRE BİTTİĞİNDE SESİ ÇAL
            playBipBipSound();
            
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            
            if (currentMode === "work") {

                    const completedMinutes =
        customWorkMinutes + (customWorkSeconds / 60);

    savePomodoroSession(completedMinutes);
                showToast("🔊 Çalışma bitti! Harika iş çıkardın. Mola zamanı.");
            } else {
                showToast("🔊 Mola bitti! Odaklanmaya geri dönelim.");
            }
            resetTimer();
        }
    }, 1000);
}

// Butona ses kilidini açma olayını bağla
if (btnStart) {
    btnStart.addEventListener("click", unlockAudio);
}

// ==========================================================================
// TAM EKRAN (ZEN MODU) MANTIĞI
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const btnZenToggle = document.getElementById("btn-zen-toggle");
    let isZenMode = false;

    if (btnZenToggle) {
        btnZenToggle.addEventListener("click", () => {
            isZenMode = !isZenMode;
            
            if (isZenMode) {
                // Zen modunu aktif et (Header'ı kaydır, alanları gizle)
                document.body.classList.add("zen-mode-active");
                btnZenToggle.innerHTML = '<i class="fa-solid fa-compress"></i>';
                btnZenToggle.style.color = "var(--color-purple)";
                showToast("Nodax Odaklanma Modu Aktif ✨");
            } else {
                // Normal moda geri dön
                document.body.classList.remove("zen-mode-active");
                btnZenToggle.innerHTML = '<i class="fa-solid fa-expand"></i>';
                btnZenToggle.style.color = "var(--text-secondary)";
            }
        });
    }
});


function savePomodoroSession(completedMinutes) {
    const todayStr = new Date().toISOString().split('T')[0];

    let pomoStats = JSON.parse(
        localStorage.getItem("nodax_pomo_stats") || "{}"
    );

    pomoStats[todayStr] = (pomoStats[todayStr] || 0) + completedMinutes;

    localStorage.setItem(
        "nodax_pomo_stats",
        JSON.stringify(pomoStats)
    );

    // Eski anahtarla da senkronize et
    localStorage.setItem(
        "nodax-pomodoro-data",
        JSON.stringify(pomoStats)
    );
}