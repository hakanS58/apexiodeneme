// ---- NODAX MERKEZİ TEMA YÖNETİMİ ----

// 1. ANINDA RENK PARLAMASINI (FLASH OF UNSTYLED CONTENT) ENGELLEME
// Script dosyası yüklenir yüklenmez IIFE ile HTML etiketini ayarlar.
(function syncInitialTheme() {
    try {
        const savedTheme = localStorage.getItem("nodax-theme") || "light";
        const validTheme = savedTheme === "dark" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", validTheme);
    } catch (e) {
        document.documentElement.setAttribute("data-theme", "light");
    }
})();

/**
 * Temayı tüm DOM ve LocalStorage düzeyinde uygular.
 * @param {string} theme - 'light' veya 'dark'
 */
function applyTheme(theme) {
    const activeTheme = (theme === "dark") ? "dark" : "light";

    // HTML ve Body etiketlerine temayı senkron uygula
    document.documentElement.setAttribute("data-theme", activeTheme);
    if (document.body) {
        document.body.setAttribute("data-theme", activeTheme);
    }

    // Hafızaya kaydet
    try {
        localStorage.setItem("nodax-theme", activeTheme);
    } catch (e) {
        console.error("LocalStorage erişim hatası:", e);
    }

    // Arayüz butonlarını güncelle
    updateThemeUI(activeTheme);

    // Aktif Chart.js veya özel performans grafiği varsa renklerini güncelle
    if (window.activityChart && typeof updateChartColors === "function") {
        updateChartColors(activeTheme);
    }
}

/**
 * Sayfadaki tema butonlarının ve ikonlarının durumunu günceller.
 * @param {string} theme 
 */
function updateThemeUI(theme) {
    const btnLight = document.getElementById("btn-theme-light");
    const btnDark = document.getElementById("btn-theme-dark");
    const btnToggle = document.getElementById("btn-theme-toggle");

    // Ayarlar modülündeki ikili buton grubu
    if (btnLight && btnDark) {
        if (theme === "dark") {
            btnDark.style.borderColor = "var(--color-purple)";
            btnLight.style.borderColor = "var(--border-color)";
        } else {
            btnLight.style.borderColor = "var(--color-purple)";
            btnDark.style.borderColor = "var(--border-color)";
        }
    }

    // Tekli Hızlı Değiştirme (Toggle) Butonu
    if (btnToggle) {
        const icon = btnToggle.querySelector("i");
        if (icon) {
            icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }
    }
}

// 2. DOM YÜKLENDİĞİNDE DİĞER ETKİLEŞİMLERİ BAĞLA
document.addEventListener("DOMContentLoaded", () => {
    // Sayfa DOM'u hazır olduğunda UI elemanlarını mevcut tema ile eşitle
    const currentSavedTheme = localStorage.getItem("nodax-theme") || "light";
    applyTheme(currentSavedTheme);

    // Element Seçimleri
    const settingsBtn = document.getElementById("btn-settings-toggle");
    const settingsModal = document.getElementById("settings-modal");
    const closeSettingsBtn = document.getElementById("btn-close-settings");
    const btnLight = document.getElementById("btn-theme-light");
    const btnDark = document.getElementById("btn-theme-dark");
    const btnThemeToggle = document.getElementById("btn-theme-toggle");

    // Ayarlar Modalı Açma/Kapatma Mantığı
    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            settingsModal.classList.remove("hidden");
        });
    }

    if (closeSettingsBtn && settingsModal) {
        closeSettingsBtn.addEventListener("click", () => {
            settingsModal.classList.add("hidden");
        });
    }

    if (settingsModal) {
        settingsModal.addEventListener("click", (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.add("hidden");
            }
        });
    }

    // Tema Değiştirme Buton Dinleyicileri
    if (btnLight) {
        btnLight.addEventListener("click", () => applyTheme("light"));
    }
    
    if (btnDark) {
        btnDark.addEventListener("click", () => applyTheme("dark"));
    }

    if (btnThemeToggle) {
        btnThemeToggle.addEventListener("click", () => {
            const activeTheme = localStorage.getItem("nodax-theme") || "light";
            applyTheme(activeTheme === "dark" ? "light" : "dark");
        });
    }
});