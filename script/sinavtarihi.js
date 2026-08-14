document.addEventListener("DOMContentLoaded", () => {
    const storageKey = "nodax-exams";
    const examsList = document.getElementById("exams-list-container");
    const addButton = document.getElementById("btn-add-exam");
    const form = document.getElementById("exam-form-wrapper");
    const saveButton = document.getElementById("btn-save-exam");
    const cancelButton = document.getElementById("btn-cancel-exam");
    const overlay = document.getElementById("sheet-overlay");
    const nameInput = document.getElementById("exam-name");

    // Çark Elemanları
    const pYear = document.getElementById("picker-year");
    const pMonth = document.getElementById("picker-month");
    const pDay = document.getElementById("picker-day");
    const pHour = document.getElementById("picker-hour");
    const pMinute = document.getElementById("picker-minute");

    const getExams = () => {
        try { return JSON.parse(localStorage.getItem(storageKey)) || []; }
        catch { return []; }
    };

    // Dinamik Çark Doldurma ve Geçmiş Zaman Kısıtlaması
    const initPickers = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // 1-12
        const currentDay = now.getDate();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // 1. YIL DOLDURMA (Geçmiş yıl seçilemez, max 5 yıl ileri)
        pYear.innerHTML = "";
        for (let y = currentYear; y <= currentYear + 5; y++) {
            pYear.innerHTML += `<option value="${y}">${y}</option>`;
        }

        // 2. AY DOLDURMA
        const updateMonths = () => {
            const selectedYear = parseInt(pYear.value);
            const startMonth = (selectedYear === currentYear) ? currentMonth : 1;
            const previousSelection = pMonth.value;
            
            pMonth.innerHTML = "";
            const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
            for (let m = startMonth; m <= 12; m++) {
                pMonth.innerHTML += `<option value="${m}">${monthNames[m - 1]}</option>`;
            }
            if (previousSelection && pMonth.querySelector(`option[value="${previousSelection}"]`)) {
                pMonth.value = previousSelection;
            }
            updateDays();
        };

        // 3. GÜN DOLDURMA
        const updateDays = () => {
            const selectedYear = parseInt(pYear.value);
            const selectedMonth = parseInt(pMonth.value);
            const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
            
            let startDay = 1;
            if (selectedYear === currentYear && selectedMonth === currentMonth) {
                startDay = currentDay;
            }
            
            const previousSelection = pDay.value;
            pDay.innerHTML = "";
            for (let d = startDay; d <= daysInMonth; d++) {
                pDay.innerHTML += `<option value="${d}">${d.toString().padStart(2, '0')}</option>`;
            }
            if (previousSelection && pDay.querySelector(`option[value="${previousSelection}"]`)) {
                pDay.value = previousSelection;
            }
            updateHours();
        };

        // 4. SAAT DOLDURMA
        const updateHours = () => {
            const selectedYear = parseInt(pYear.value);
            const selectedMonth = parseInt(pMonth.value);
            const selectedDay = parseInt(pDay.value);
            
            let startHour = 0;
            if (selectedYear === currentYear && selectedMonth === currentMonth && selectedDay === currentDay) {
                startHour = currentHour;
            }

            const previousSelection = pHour.value;
            pHour.innerHTML = "";
            for (let h = startHour; h < 24; h++) {
                pHour.innerHTML += `<option value="${h}">${h.toString().padStart(2, '0')}</option>`;
            }
            if (previousSelection && pHour.querySelector(`option[value="${previousSelection}"]`)) {
                pHour.value = previousSelection;
            }
            updateMinutes();
        };

        // 5. DAKİKA DOLDURMA (Talebin üzerine 1'er 1'er artacak şekilde güncellendi)
        const updateMinutes = () => {
            const selectedYear = parseInt(pYear.value);
            const selectedMonth = parseInt(pMonth.value);
            const selectedDay = parseInt(pDay.value);
            const selectedHour = parseInt(pHour.value);
            
            let startMinute = 0;
            if (selectedYear === currentYear && selectedMonth === currentMonth && selectedDay === currentDay && selectedHour === currentHour) {
                startMinute = currentMinute;
            }

            const previousSelection = pMinute.value;
            pMinute.innerHTML = "";
            for (let min = startMinute; min < 60; min += 1) { 
                pMinute.innerHTML += `<option value="${min}">${min.toString().padStart(2, '0')}</option>`;
            }
            if (previousSelection && pMinute.querySelector(`option[value="${previousSelection}"]`)) {
                pMinute.value = previousSelection;
            }
        };

        // Dinamik tetikleyiciler
        pYear.addEventListener("change", updateMonths);
        pMonth.addEventListener("change", updateDays);
        pDay.addEventListener("change", updateHours);
        pHour.addEventListener("change", updateMinutes);

        // İlk doldurma işlemi
        updateMonths();
    };

    // Kalan Süreyi Hesapla (Gün, Saat, Dakika)
    const formatCountdown = (targetDateString) => {
        const difference = new Date(targetDateString).getTime() - Date.now();
        if (difference <= 0) return { text: "Sınav zamanı geldi!", passed: true };
        
        const totalMinutes = Math.floor(difference / 60000);
        const days = Math.floor(totalMinutes / 1440);
        const hours = Math.floor((totalMinutes % 1440) / 60);
        const minutes = totalMinutes % 60;
        
        return { text: `${days} gün ${hours} saat ${minutes} dk kaldı`, passed: false };
    };

    const formatDateText = (dateStr) => {
        return new Intl.DateTimeFormat("tr-TR", {
            day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
        }).format(new Date(dateStr));
    };

    // Sınavları Listeleme ve Geçmiş Sınavlar Ayrımı
    const renderExams = () => {
        const allExams = getExams();
        
        // Sınavları tarihlerine göre sırala ve orijinal indekslerini koru
        const indexedExams = allExams.map((exam, originalIndex) => ({ ...exam, originalIndex }))
                                     .sort((a, b) => new Date(a.date) - new Date(b.date));

        // Yaklaşan ve Geçmiş sınavları ayır
        const upcomingExams = [];
        const passedExams = [];

        indexedExams.forEach(exam => {
            const countdown = formatCountdown(exam.date);
            if (countdown.passed) {
                passedExams.push({ ...exam, countdown });
            } else {
                upcomingExams.push({ ...exam, countdown });
            }
        });

        let htmlContent = "";

        // 1. YAKLAŞAN SINAVLAR BÖLÜMÜ
        if (upcomingExams.length === 0 && passedExams.length === 0) {
            examsList.innerHTML = `<div class="exams-empty-state"><span><i class="fa-solid fa-calendar-xmark"></i></span><p>Yaklaşan sınavınız bulunmuyor.</p></div>`;
            return;
        }

        if (upcomingExams.length > 0) {
            htmlContent += upcomingExams.map(exam => `
                <article class="exam-card">
                    <div class="exam-card-icon"><i class="fa-solid fa-graduation-cap"></i></div>
                    <div class="exam-card-content">
                        <h3 class="exam-title-placeholder"></h3>
                        <p class="exam-date"><i class="fa-regular fa-clock"></i> ${formatDateText(exam.date)}</p>
                        <p class="countdown-text">${exam.countdown.text}</p>
                    </div>
                    <button class="exam-delete-button" data-index="${exam.originalIndex}"><i class="fa-solid fa-trash-can"></i></button>
                </article>
            `).join("");
        } else if (passedExams.length > 0) {
            htmlContent += `<div class="exams-empty-state"><p>Yaklaşan aktif sınavınız bulunmuyor.</p></div>`;
        }

        // 2. GEÇMİŞ SINAVLAR BÖLÜMÜ (Talebin üzerine eklenen alan)
        if (passedExams.length > 0) {
            htmlContent += `
                <div class="calendar-header" style="margin-top: 25px; padding-bottom: 10px;">
                    <h2 style="font-size: 18px; color: var(--text-secondary);"><i class="fa-solid fa-clock-rotate-left"></i> Geçmiş Sınavlar</h2>
                </div>
            `;
            htmlContent += passedExams.map(exam => `
                <article class="exam-card exam-passed" style="opacity: 0.7;">
                    <div class="exam-card-icon" style="background: rgba(var(--color-orange-rgb, 249, 115, 22), 0.1); color: var(--color-orange);"><i class="fa-solid fa-circle-check"></i></div>
                    <div class="exam-card-content">
                        <h3 class="exam-title-placeholder"></h3>
                        <p class="exam-date"><i class="fa-regular fa-clock"></i> ${formatDateText(exam.date)}</p>
                        <p class="countdown-text">${exam.countdown.text}</p>
                    </div>
                    <button class="exam-delete-button" data-index="${exam.originalIndex}"><i class="fa-solid fa-trash-can"></i></button>
                </article>
            `).join("");
        }

        examsList.innerHTML = htmlContent;

        // XSS Korumalı başlık yazma işlemi (Orijinal sıralamayı bozmadan doğru DOM elementlerine eşleme)
        const allRenderedTitles = examsList.querySelectorAll(".exam-title-placeholder");
        const combinedSortedExams = [...upcomingExams, ...passedExams];
        combinedSortedExams.forEach((exam, idx) => {
            if (allRenderedTitles[idx]) {
                allRenderedTitles[idx].textContent = exam.name;
            }
        });
    };

    // Arayüz Kapatma / Açma
    const closeForm = () => { form.classList.add("hidden"); nameInput.value = ""; };
    addButton.addEventListener("click", () => {
        initPickers(); // Açılırken çarkları bugünün anlık saatine göre kısıtla
        form.classList.remove("hidden");
        nameInput.focus();
    });
    cancelButton.addEventListener("click", closeForm);
    overlay.addEventListener("click", closeForm);

    // Kaydetme İşlemi
    saveButton.addEventListener("click", () => {
        const name = nameInput.value.trim();
        if (!name) {
            if (typeof showToast === "function") showToast("Lütfen sınav adını girin.");
            return;
        }

        // Seçilen çark verilerinden ISO formatlı tarih üretme
        const ISOString = `${pYear.value}-${pMonth.value.padStart(2, '0')}-${pDay.value.padStart(2, '0')}T${pHour.value.padStart(2, '0')}:${pMinute.value.padStart(2, '0')}:00`;
        
        const exams = getExams();
        exams.push({ name, date: ISOString });
        localStorage.setItem(storageKey, JSON.stringify(exams));
        
        closeForm();
        renderExams();
        if (typeof showToast === "function") showToast("💾 Sınav takvime başarıyla eklendi.");
    });

    // Silme İşlemi
    examsList.addEventListener("click", (e) => {
        const btn = e.target.closest(".exam-delete-button");
        if (!btn) return;
        
        const index = Number(btn.dataset.index);
        const exams = getExams();
        exams.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(exams));
        
        renderExams();
        if (typeof showToast === "function") showToast("🗑️ Sınav silindi.");
    });

    // Her dakika canlı güncelle (1'er dakikalık hassasiyet için setInterval süresi güncellendi)
    setInterval(renderExams, 30000);
    renderExams();
});