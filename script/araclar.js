// ==========================================================================
// SHADOW / GLOBAL VARIABLES FOR DIARY APP INTEGRATION
// ==========================================================================
let currentDiaryId = null;
let currentDiaryPageIndex = 0;
let diariesList = [];
const DIARY_CHAR_LIMIT = 380;

let pinDiarySetupValue = "";
let pinDiaryLoginValue = "";
let pinDiaryResetValue = "";
let diaryModalCallback = null;

document.addEventListener("DOMContentLoaded", () => {

    // 1. INSTANT SESSION SYNC RECOVERY (LOCAL STORAGE)
    const localProfileName = localStorage.getItem("nodax_local_name") || "Öğrenci";
    const welcomeGreeting = document.getElementById("welcome-greeting");
    
    if (welcomeGreeting) {
        welcomeGreeting.textContent = `Selam, ${localProfileName}! 👋`;
    }

    // Arayüz element doluluk kontrolü (Profil detayları gösterimi için alternatif)
    const profileDisplayName = document.getElementById("profile-display-name");
    const editUsernameInput = document.getElementById("edit-username");
    
    if (profileDisplayName) {
        profileDisplayName.textContent = localProfileName;
    }
    if (editUsernameInput) {
        editUsernameInput.value = localProfileName;
    }

    // Page Transitions & UI Elements
    const dashCards = document.querySelectorAll(".dash-card");
    const btnBack = document.getElementById("btn-back");
    const btnProfile = document.getElementById("btn-profile-shortcut");
    const headerTitle = document.getElementById("header-title");
    const screens = document.querySelectorAll(".app-screen");

    // Profile Update Details
    const profileUpdateForm = document.getElementById("profile-update-form");
    const editNameInput = document.getElementById("edit-name");
    const btnUpdateProfile = document.getElementById("btn-update-profile");

    // THEME CONTROLLER


    // Navigation Stack
    let screenHistory = ["dashboard"];
    
    function navigateTo(targetScreen) {
        const activeScreen = document.querySelector(".app-screen.active");
        if (activeScreen) activeScreen.classList.remove("active");
        
        const targetElement = document.getElementById("screen-" + targetScreen);
        if (targetElement) targetElement.classList.add("active");

        if (screenHistory[screenHistory.length - 1] !== targetScreen) {
            screenHistory.push(targetScreen);
        }

        if (targetScreen === "dashboard") {
            if (btnBack) btnBack.classList.add("hidden");
            if (btnProfile) btnProfile.classList.remove("hidden");
            if (headerTitle) headerTitle.textContent = "Nodax";
        } else {
            if (btnBack) btnBack.classList.remove("hidden");
            if (btnProfile) btnProfile.classList.add("hidden");
            
            if (headerTitle) {
                if(targetScreen === "pomodoro") headerTitle.textContent = "Pomodoro Odaklanma";
                if(targetScreen === "notes-dashboard" || targetScreen === "notes") headerTitle.textContent = "Ders Notları";
                if(targetScreen === "calendar") headerTitle.textContent = "Sınav Takvimi";
                if(targetScreen === "calc") headerTitle.textContent = "Ortalama Hesapla";
                if(targetScreen === "profile" || targetScreen === "plans") headerTitle.textContent = "Planlarım";
                
                if(targetScreen.startsWith("diary-") || targetScreen.startsWith("screen-diary")) {
                    headerTitle.textContent = "Şifreli Günlüğüm";
                }
            }
        }
    }

    dashCards.forEach(card => {
        card.addEventListener("click", () => {
            if (card.dataset.target) {
                navigateTo(card.dataset.target);
            }
        });
    });

    if (btnProfile) {
        btnProfile.addEventListener("click", () => {
            navigateTo("plans"); // Profil yerine doğrudan planlara veya tercih edilen ekrana yönlendirme
        });
    }

    if (btnBack) {
        btnBack.addEventListener("click", () => {
            if (screenHistory.length > 1) {
                screenHistory.pop();
                const previousScreen = screenHistory[screenHistory.length - 1];
                navigateTo(previousScreen);
            }
        });
    }

    // ==========================================================================
    // LOCAL PROFILE UPDATE ACTIONS
    // ==========================================================================
    if (profileUpdateForm) {
        profileUpdateForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const targetInput = editNameInput || editUsernameInput;
            if (!targetInput) return;

            const newName = targetInput.value.trim();
            if (newName === "") {
                showToast("İsim alanı boş bırakılamaz!");
                return;
            }

            const cleanName = newName.substring(0, 10);
            localStorage.setItem("nodax_local_name", cleanName);
            showToast("Profil başarıyla güncellendi!");
            
            if (welcomeGreeting) {
                welcomeGreeting.textContent = `Selam, ${cleanName}! 👋`;
            }
            if (profileDisplayName) {
                profileDisplayName.textContent = cleanName;
            }
        });
    }

    // Window nesnesine yönlendiriciyi ekle (HTML onclick metotlarının çalışması için)
    window.navigateToDiaryScreen = function(targetScreen) {
        navigateTo(targetScreen);
    }
});

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 50);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ==========================================================================
// DIARY LAUNCHER & PROGRESS ANIMATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const diaryCard = document.getElementById("btn-go-to-diary");
    const loaderScreen = document.getElementById("lock-loader-screen");
    const lockIcon = document.getElementById("anim-lock-icon");
    const progressBar = document.getElementById("lock-progress");

    if (diaryCard && loaderScreen && progressBar) {
        diaryCard.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Yükleme ekranını göster
            loaderScreen.classList.remove("hidden");
            document.body.style.overflow = "hidden"; // Scroll'u engelle
            
            let progress = 0;
            const intervalTime = 30; // ~3 saniyede dolması için
            
            const timer = setInterval(() => {
                progress += 1;
                progressBar.style.width = `${progress}%`;
                
                // %70'e geldiğinde kilit ikonunu kapatıp yeşil yapalım
                if (progress === 70 && lockIcon) {
                    lockIcon.className = "fa-solid fa-lock"; 
                    lockIcon.parentElement.classList.add("locked");
                }
                
                if (progress >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        window.location.href = "sifreligunluk.html";
                    }, 400);
                }
            }, intervalTime);
        });
    }
});

// ==========================================================================
// MOTİVASYON SÖZLERİ & HEADER DÖNGÜSÜ
// ==========================================================================
const MOTIVATION_QUOTES = [
    "İnanmak, başarmanın yarısıdır.",
    "Büyük işler küçük adımlarla başlar.",
    "Bugün ektiğin tohum yarın meyve verir.",
    "Zorluklar, başarının süsüdür.",
    "Disiplin, hedefler ile başarı arasındaki köprüdür.",
    "Asla vazgeçme, mucizeler her gün gerçekleşir.",
    "Gelecek, bugün ne yaptığına bağlıdır.",
    "Odaklan, çalış ve başarını izle.",
    "Hayal et, planla ve harekete geç.",
    "Küçük ilerlemeler de birer ilerlemedir.",
    "Bugün yapacağın bir saatlik çalışma, yarınki kaygını siler.",
    "Başarı, her gün tekrarlanan küçük disiplinlerin toplamıdır.",
    "Zamanını yönetemeyen, geleceğini de inşa edemez.",
    "Yorulunca dinlenmeyi öğren, pes etmeyi değil.",
    "Kendi sınırlarını zorlamadıkça potansiyelini asla göremezsin.",
    "Mükemmel anı bekleme; anı al ve onu mükemmel kıl.",
    "Sadece başlayanlar bitirme gururunu yaşayabilir.",
    "Zihnini neye odaklarsan, hayatında onu büyütürsün.",
    "Dünün hataları, bugünün tecrübeleridir; yola devam et.",
    "Yapabileceğine inandığın an, yolun yarısını geçtin demektir.",
    "Şimdi ektiğin ter, yarın alkış olarak geri döner.",
    "Hedefine odaklan, gürültüyü yok say.",
    "Sıradan bir günü olağanüstü kılmak senin elinde.",
    "Ertelemek, zamanın hırsızıdır; hemen başla.",
    "En büyük rakibin, dünkü sensin.",
    "Küçük detaylar büyük farklar yaratır.",
    "Sabır ve istikrar, en zor kapıları bile açar.",
    "Başarmak isteyen bir yol, istemeyen bir bahane bulur.",
    "Yolun uzun olması, hedefin güzelliğindendir.",
    "Kendine güven, çabana değer ver.",
    "Bir gün değil, o gün bugün olsun.",
    "Odaklandığın şey büyür, enerjini hedefine ver.",
    "Zor yollar genellikle güzel destinasyonlara çıkar.",
    "Gelişim, konfor alanının bittiği yerde başlar.",
    "Aklına koyduğun her şeyi başarabilecek güce sahipsin.",
    "Büyük zihinler fikirleri, küçük zihinler kişileri tartışır.",
    "Her sabah yeni bir başlangıç, her gün yeni bir fırsattır.",
    "İstikrar, yetenekten daha çok kapı açar.",
    "Kendi hikayenin yazarı sensin, güçlü yaz.",
    "Hayallerin, ertelediğin kadar uzaktadır."
];

// ==========================================================================
// MOTİVASYON SÖZLERİ & HEADER DÖNGÜSÜ (GÜNCELLENMİŞ)
// ==========================================================================
let availableQuotes = [];
let currentQuoteIndex = 0;
let quoteInterval = null;

function shuffleQuotes() {
    availableQuotes = [...MOTIVATION_QUOTES];
    for (let i = availableQuotes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableQuotes[i], availableQuotes[j]] = [availableQuotes[j], availableQuotes[i]];
    }
    currentQuoteIndex = 0;
}

function getNextQuote() {
    if (availableQuotes.length === 0 || currentQuoteIndex >= availableQuotes.length) {
        shuffleQuotes();
    }
    const quote = availableQuotes[currentQuoteIndex];
    currentQuoteIndex++;
    return quote;
}

function updateHeaderQuoteAnimated(headerTitleElem) {
    if (!headerTitleElem) return;
    
    headerTitleElem.classList.add("quote-out");
    
    setTimeout(() => {
        headerTitleElem.textContent = getNextQuote();
        headerTitleElem.classList.remove("quote-out");
        headerTitleElem.classList.add("quote-in");
        
        requestAnimationFrame(() => {
            setTimeout(() => {
                headerTitleElem.classList.remove("quote-in");
            }, 30);
        });
    }, 380);
}

// Döngüyü Başlatan Fonksiyon
function startQuoteCycle(headerTitleElem) {
    if (quoteInterval) clearInterval(quoteInterval);
    
    shuffleQuotes();
    headerTitleElem.textContent = getNextQuote();
    
    quoteInterval = setInterval(() => {
        const activeScreen = document.querySelector(".app-screen.active");
        // KESİN KONTROL: Sadece id'si tam olarak "screen-dashboard" ise sözü değiştir
        if (activeScreen && activeScreen.id === "screen-dashboard") {
            updateHeaderQuoteAnimated(headerTitleElem);
        }
    }, 6000);
}

// Döngüyü Durduran Yeni Fonksiyon
function stopQuoteCycle() {
    if (quoteInterval) {
        clearInterval(quoteInterval);
        quoteInterval = null;
    }
}

// ==========================================================================
// SAYFA ARAYÜZÜ VE NAVİGASYON (GÜNCELLENMİŞ)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const btnBack = document.getElementById("btn-back");
    const btnProfile = document.getElementById("btn-profile-shortcut");
    const headerTitle = document.getElementById("header-title");

    let screenHistory = ["dashboard"];
    
    function navigateTo(targetScreen) {
        const activeScreen = document.querySelector(".app-screen.active");
        if (activeScreen) activeScreen.classList.remove("active");
        
        const targetElement = document.getElementById("screen-" + targetScreen);
        if (targetElement) targetElement.classList.add("active");

        if (screenHistory[screenHistory.length - 1] !== targetScreen) {
            screenHistory.push(targetScreen);
        }

        if (targetScreen === "dashboard") {
            // 1. Butonların görünürlüğünü ayarla
            if (btnBack) btnBack.classList.add("hidden");
            if (btnProfile) btnProfile.classList.remove("hidden");
            
            // 2. Ana sayfaya girildiğinde "NODAX" yazısını kaldırıp Motivasyon Döngüsünü BAŞLAT
            if (headerTitle) {
                startQuoteCycle(headerTitle); // Bu fonksiyon ilk sözü hemen yazar ve 6sn'lik zamanlayıcıyı kurar
            }
        } else {
            // Başka bir araca (Pomodoro, Notlar vb.) girildiğinde döngüyü durdur
            stopQuoteCycle();

            if (btnBack) btnBack.classList.remove("hidden");
            if (btnProfile) btnProfile.classList.add("hidden");
            
            if (headerTitle) {
                if(targetScreen === "pomodoro") headerTitle.textContent = "Pomodoro Odaklanma";
                if(targetScreen === "notes-dashboard" || targetScreen === "notes") headerTitle.textContent = "Ders Notları";
                if(targetScreen === "calendar") headerTitle.textContent = "Sınav Takvimi";
                if(targetScreen === "calc") headerTitle.textContent = "Ortalama Hesapla";
                if(targetScreen === "plans") headerTitle.textContent = "Planlarım";
                
                if(targetScreen.startsWith("diary-") || targetScreen.startsWith("screen-diary")) {
                    headerTitle.textContent = "Şifreli Günlüğüm";
                }
            }
        }
    }

    // Geri Butonuna Tıklandığında Çalışacak Mantık
    if (btnBack) {
        btnBack.addEventListener("click", () => {
            if (screenHistory.length > 1) {
                screenHistory.pop(); // Mevcut ekranı geçmişten çıkar
                const previousScreen = screenHistory[screenHistory.length - 1];
                
                // Ana sayfaya geri dönüyorsak:
                if (previousScreen === "dashboard") {
                    navigateTo("dashboard");
                } else {
                    navigateTo(previousScreen);
                }
            } else {
                navigateTo("dashboard");
            }
        });
    }

    // İlk yüklemede ana sayfadaysak döngüyü başlat
    if (headerTitle) {
        startQuoteCycle(headerTitle);
    }


    dashCards.forEach(card => {
        card.addEventListener("click", () => {
            if (card.dataset.target) {
                navigateTo(card.dataset.target);
            }
        });
    });

    if (btnBack) {
        btnBack.addEventListener("click", () => {
            if (screenHistory.length > 1) {
                screenHistory.pop();
                const previousScreen = screenHistory[screenHistory.length - 1];
                navigateTo(previousScreen);
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const screens = document.querySelectorAll(".app-screen");
    const backBtn = document.getElementById("btn-back");
    const headerTitle = document.getElementById("header-title");

    // Ekran Değiştirme Fonksiyonu
    window.switchScreen = function (targetScreenId, titleText) {
        screens.forEach(screen => {
            if (screen.id === targetScreenId) {
                screen.classList.add("active");
            } else {
                screen.classList.remove("active");
            }
        });

        if (targetScreenId === "screen-dashboard") {
            if (backBtn) backBtn.classList.add("hidden");
            if (headerTitle) headerTitle.textContent = "";
        } else {
            if (backBtn) backBtn.classList.remove("hidden");
            if (headerTitle && titleText) headerTitle.textContent = titleText;
        }
    };

    // Kart Tıklama Olayları
    const dashCards = document.querySelectorAll(".dash-card[data-target]");
    dashCards.forEach(card => {
        card.addEventListener("click", function () {
            const target = this.getAttribute("data-target");
            const title = this.querySelector("h3") ? this.querySelector("h3").textContent : "";
            
            if (target === "pomodoro") switchScreen("screen-pomodoro", title);
            else if (target === "notes-dashboard") switchScreen("screen-notes-dashboard", title);
            else if (target === "plans") switchScreen("screen-plans", title);
            else if (target === "calendar") switchScreen("screen-calendar", title);
            else if (target === "calc") switchScreen("screen-calc", title);
        });
    });

    // Geri Butonu Olayı
    if (backBtn) {
        backBtn.addEventListener("click", function () {
            switchScreen("screen-dashboard", "");
        });
    }

    // URL PARAMETRESİ KONTROLÜ (Kısayol Tuşları İçin)
    const urlParams = new URLSearchParams(window.location.search);
    const toolParam = urlParams.get("tool");

    if (toolParam) {
        if (toolParam === "pomodoro") {
            switchScreen("screen-pomodoro", "Pomodoro Odaklanma");
        } else if (toolParam === "notes" || toolParam === "notes-dashboard") {
            switchScreen("screen-notes-dashboard", "Notlarım");
        } else if (toolParam === "plans") {
            switchScreen("screen-plans", "Planlarım");
        } else if (toolParam === "calendar") {
            switchScreen("screen-calendar", "Sınav Takvimi");
        } else if (toolParam === "calc") {
            switchScreen("screen-calc", "Ortalama Hesapla");
        }
    }
});