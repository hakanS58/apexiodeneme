// --- NODAX PLANLARIM MODÜLÜ ---

// Haftanın günleri ve sabit indeksleri
const DAYS_OF_WEEK = [
    { id: 'pazartesi', name: 'Pazartesi' },
    { id: 'sali', name: 'Salı' },
    { id: 'carsamba', name: 'Çarşamba' },
    { id: 'persembe', name: 'Perşembe' },
    { id: 'cuma', name: 'Cuma' },
    { id: 'cumartesi', name: 'Cumartesi' },
    { id: 'pazar', name: 'Pazar' }
];

let nodaxPlans = {};

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', () => {
    initPlansModule();
    setupPlansEventListeners();
});

// Plan modülünü yükle ve verileri kontrol et
function initPlansModule() {
    // LocalStorage'dan planları çek veya boş şablon oluştur
    const savedPlans = localStorage.getItem('nodax_plans_data');
    if (savedPlans) {
        nodaxPlans = JSON.parse(savedPlans);
    } else {
        nodaxPlans = {};
        DAYS_OF_WEEK.forEach(day => {
            nodaxPlans[day.id] = [];
        });
    }

    // Haftalık sıfırlama (tik kaldırma) kontrolü
    checkAndResetWeeklyTicks();

    // Arayüzü çiz
    renderPlansUI();
}

// Olay dinleyicilerini kur
function setupPlansEventListeners() {
    const btnCancel = document.getElementById('btn-cancel-plan');
    const btnSave = document.getElementById('btn-save-plan');
    const overlay = document.getElementById('plan-sheet-overlay');

    if (btnCancel) btnCancel.addEventListener('click', closePlanSheet);
    if (overlay) overlay.addEventListener('click', closePlanSheet);
    if (btnSave) btnSave.addEventListener('click', savePlanItem);
}

// Haftalık kontrol: Cihazın haftasına göre otomatik tik sıfırlama
function checkAndResetWeeklyTicks() {
    const today = new Date();
    
    // Yılın kaçıncı haftasında olduğumuzu bul (ISO standardı)
    const target = new Date(today.valueOf());
    const dayNr = (today.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    const currentWeekNumber = 1 + Math.ceil((firstThursday - target) / 604800000);
    const currentYear = today.getFullYear();
    const weekKey = `${currentYear}-W${currentWeekNumber}`;

    const lastSavedWeek = localStorage.getItem('nodax_plans_last_week');

    // Eğer kaydedilen hafta mevcut haftadan farklıysa, tüm tikleri kaldır
    if (lastSavedWeek !== weekKey) {
        Object.keys(nodaxPlans).forEach(dayId => {
            nodaxPlans[dayId].forEach(plan => {
                plan.completed = false; // Planlar duruyor, sadece tikler sıfırlanıyor
            });
        });
        localStorage.setItem('nodax_plans_data', JSON.stringify(nodaxPlans));
        localStorage.setItem('nodax_plans_last_week', weekKey);
        console.log("Nodax: Yeni bir haftaya geçildi. Tüm plan tikleri sıfırlandı!");
    }
}

// Plan ekranını dinamik olarak çizdirme
function renderPlansUI() {
    const container = document.getElementById('plan-days-container');
    if (!container) return;

    container.innerHTML = '';
    let totalAllPlans = 0;
    let completedAllPlans = 0;

    DAYS_OF_WEEK.forEach(day => {
        const dayPlans = nodaxPlans[day.id] || [];
        const total = dayPlans.length;
        const completed = dayPlans.filter(p => p.completed).length;

        totalAllPlans += total;
        completedAllPlans += completed;

        // Günlük kart şablonu
        const dayCard = document.createElement('div');
        dayCard.className = 'plan-day-card';
        
        let plansListHTML = '';
        if (dayPlans.length === 0) {
            plansListHTML = `<div class="plan-empty-text">Bu gün için henüz bir plan yok.</div>`;
        } else {
            // Planları saate göre sıralı gösterelim (Eğer saat girilmişse)
            const sortedPlans = [...dayPlans].sort((a, b) => {
                if (!a.time) return 1;
                if (!b.time) return -1;
                return a.time.localeCompare(b.time);
            });

            sortedPlans.forEach(plan => {
                plansListHTML += `
                    <div class="plan-item ${plan.completed ? 'checked' : ''}" data-day="${day.id}" data-id="${plan.id}">
                        <div class="plan-item-left">
                            <label class="plan-checkbox-wrapper">
                                <input type="checkbox" ${plan.completed ? 'checked' : ''} onchange="togglePlanStatus('${day.id}', '${plan.id}', this.checked)">
                                <span class="plan-custom-checkbox"></span>
                            </label>
                            <span class="plan-text">
                                ${plan.time ? `<strong style="color: var(--color-purple); margin-right:6px;">${plan.time}</strong>` : ''}${plan.text}
                            </span>
                        </div>
                        <button class="plan-btn-delete" onclick="deletePlanItem('${day.id}', '${plan.id}')" title="Planı Sil">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                `;
            });
        }

        dayCard.innerHTML = `
            <div class="plan-day-header">
                <div class="plan-day-title">
                    <i class="fa-regular fa-calendar"></i> ${day.name}
                    <span class="plan-day-badge">${completed}/${total} Yapıldı</span>
                </div>
                <button class="plan-btn-add" onclick="openPlanSheet('${day.id}')">
                    <i class="fa-solid fa-plus"></i> Ekle
                </button>
            </div>
            <div class="plan-items-list">
                ${plansListHTML}
            </div>
        `;

        container.appendChild(dayCard);
    });

    // Haftalık Genel İlerleme Durumunu Güncelle
    const statusText = document.getElementById('plans-weekly-status');
    if (statusText) {
        const percentage = totalAllPlans > 0 ? Math.round((completedAllPlans / totalAllPlans) * 100) : 0;
        statusText.innerText = `Haftalık İlerleme: %${percentage} (${completedAllPlans}/${totalAllPlans})`;
    }
}

// Plan Ekleme Sheet'ini Aç
function openPlanSheet(dayId) {
    const sheet = document.getElementById('plan-form-wrapper');
    const dayInput = document.getElementById('plan-selected-day');
    const title = document.getElementById('plan-sheet-title');
    const dayName = DAYS_OF_WEEK.find(d => d.id === dayId)?.name || '';

    if (sheet && dayInput) {
        dayInput.value = dayId;
        if (title) title.innerText = `${dayName} Gününe Plan Ekle`;
        sheet.classList.remove('hidden');
        
        // Inputları temizle ve focusla
        document.getElementById('plan-time').value = '';
        const txtInput = document.getElementById('plan-text');
        txtInput.value = '';
        setTimeout(() => txtInput.focus(), 150);
    }
}

// Plan Ekleme Sheet'ini Kapat
function closePlanSheet() {
    const sheet = document.getElementById('plan-form-wrapper');
    if (sheet) {
        sheet.classList.add('hidden');
    }
}

// Planı Kaydet ve LocalStorage'a yaz
function savePlanItem() {
    const dayId = document.getElementById('plan-selected-day').value;
    const timeVal = document.getElementById('plan-time').value;
    const textVal = document.getElementById('plan-text').value.trim();

    if (!textVal) {
        alert("Lütfen plan detayını girin!");
        return;
    }

    const newPlan = {
        id: 'plan_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        time: timeVal || null,
        text: textVal,
        completed: false
    };

    if (!nodaxPlans[dayId]) {
        nodaxPlans[dayId] = [];
    }

    nodaxPlans[dayId].push(newPlan);
    
    // Kaydet ve Arayüzü Yenile
    localStorage.setItem('nodax_plans_data', JSON.stringify(nodaxPlans));
    closePlanSheet();
    renderPlansUI();

    // Firebase entegrasyonu varsa buluta da gönderebilirsin (isteğe bağlı)
    if (typeof firebase !== 'undefined' && firebase.auth().currentUser) {
        savePlansToFirestore();
    }
}

// Planın Tiklenme Durumunu Değiştir (Completed state toggle)
function togglePlanStatus(dayId, planId, isChecked) {
    if (nodaxPlans[dayId]) {
        const plan = nodaxPlans[dayId].find(p => p.id === planId);
        if (plan) {
            plan.completed = isChecked;
            localStorage.setItem('nodax_plans_data', JSON.stringify(nodaxPlans));
            renderPlansUI();

            if (typeof firebase !== 'undefined' && firebase.auth().currentUser) {
                savePlansToFirestore();
            }
        }
    }
}

// Planı Sil
function deletePlanItem(dayId, planId) {
    if (nodaxPlans[dayId]) {
        nodaxPlans[dayId] = nodaxPlans[dayId].filter(p => p.id !== planId);
        localStorage.setItem('nodax_plans_data', JSON.stringify(nodaxPlans));
        renderPlansUI();

        if (typeof firebase !== 'undefined' && firebase.auth().currentUser) {
            savePlansToFirestore();
        }
    }
}

// Bulut Yedekleme (Eğer Firebase oturumu açıksa otomatik eşleşir)
function savePlansToFirestore() {
    const user = firebase.auth().currentUser;
    if (!user) return;

    db.collection("users").doc(user.uid).collection("plans_module").doc("weekly_plans").set({
        plans: nodaxPlans,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Planlar buluta başarıyla yedeklendi!");
    }).catch(err => {
        console.error("Planlar yedeklenirken hata oluştu: ", err);
    });
}