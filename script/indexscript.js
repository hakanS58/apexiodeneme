// ==========================================================================
// NODAX DASHBOARD & İSTATİSTİK YÖNETİCİSİ (ONARILMIŞ SÜRÜM)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    initOnboardingAndGreeting();
    initLoginStreak();
    loadPomodoroData();
    loadTodayPlans();
    loadUpcomingExams();
    initChartSafely();
    initSettingsModal();
});

/* 1. ONBOARDING & İSME GÖRE DİNAMİK SELAMLAMA */
function initOnboardingAndGreeting() {
    const onboardingOverlay = document.getElementById("onboarding-overlay");
    const nameInput = document.getElementById("onboarding-name-input");
    const btnStart = document.getElementById("btn-onboarding-start");
    const btnGuest = document.getElementById("btn-onboarding-guest");

    let savedName = localStorage.getItem("nodax_user_name") || localStorage.getItem("nodax_local_name");

    if (!savedName && savedName !== "Misafir") {
        onboardingOverlay?.classList.remove("hidden");
    } else {
        onboardingOverlay?.classList.add("hidden");
    }

    btnStart?.addEventListener("click", () => {
        const val = nameInput.value.trim();
        if (val) {
            localStorage.setItem("nodax_user_name", val);
            localStorage.setItem("nodax_local_name", val);
            onboardingOverlay?.classList.add("hidden");
            updateGreeting(val);
        }
    });

    btnGuest?.addEventListener("click", () => {
        localStorage.setItem("nodax_user_name", "Misafir");
        onboardingOverlay?.classList.add("hidden");
        updateGreeting("Misafir");
    });

    updateGreeting(savedName || "Öğrenci");
}

function updateGreeting(name) {
    const welcomeGreeting = document.getElementById("welcome-greeting");
    const hour = new Date().getHours();
    let timeText = "İyi Günler";

    if (hour >= 5 && hour < 12) timeText = "Günaydın";
    else if (hour >= 12 && hour < 18) timeText = "İyi Günler";
    else if (hour >= 18 && hour < 23) timeText = "İyi Akşamlar";
    else timeText = "İyi Geceler";

    if (welcomeGreeting) {
        welcomeGreeting.textContent = `${timeText}, ${name}! 👋`;
    }
}

/* 2. GİRİŞ SERİSİ HESAPLAMA (STREAK) */
function initLoginStreak() {
    const todayStr = new Date().toISOString().split('T')[0];
    let streakData = JSON.parse(localStorage.getItem("nodax_streak_data") || '{"lastDate":"","count":0}');
    
    if (streakData.lastDate !== todayStr) {
        const lastDate = streakData.lastDate ? new Date(streakData.lastDate) : null;
        const today = new Date(todayStr);

        if (lastDate) {
            const diffTime = Math.abs(today - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                streakData.count += 1;
            } else if (diffDays > 1) {
                streakData.count = 1; 
            }
        } else {
            streakData.count = 1;
        }

        streakData.lastDate = todayStr;
        localStorage.setItem("nodax_streak_data", JSON.stringify(streakData));
    }

    const streakText = document.getElementById("streak-count-text");
    if (streakText) streakText.textContent = `${streakData.count}. Gün`;

    const streakRow = document.getElementById("streak-days-row");
    if (streakRow) {
        streakRow.innerHTML = "";
        for (let i = 1; i <= Math.max(streakData.count, 7); i++) {
            const isCompleted = i <= streakData.count;
            const dayEl = document.createElement("div");
            dayEl.className = `streak-day-item ${isCompleted ? 'active' : ''}`;
            dayEl.innerHTML = `
                <i class="fa-solid fa-fire"></i>
                <span>${i}.Gün</span>
            `;
            streakRow.appendChild(dayEl);
        }
    }
}


/* 4. GÜNÜN PLANLARI */
function loadTodayPlans() {
    const daysMap = ["pazar", "pazartesi", "sali", "carsamba", "persembe", "cuma", "cumartesi"];
    const daysTurkishNameMap = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    
    const todayIndex = new Date().getDay();
    const todayKey = daysMap[todayIndex];
    const todayName = daysTurkishNameMap[todayIndex];

    const currentDayTag = document.getElementById("dash-current-day-tag");
    if (currentDayTag) currentDayTag.textContent = todayName;

    const allPlans = JSON.parse(localStorage.getItem("nodax_plans_data") || '{}');
    const todayPlans = allPlans[todayKey] || [];

    const planStatus = document.getElementById("dash-plan-status");
    const planDesc = document.getElementById("dash-plan-desc");

    if (todayPlans.length === 0) {
        if (planStatus) planStatus.textContent = "Bugün için planın yok";
        if (planDesc) planDesc.textContent = "Yeni bir haftalık plan eklemek için dokun.";
    } else {
  const completedCount =
todayPlans.filter(
    p => p.completed
).length;

const percentage =
Math.round(
(completedCount / todayPlans.length) * 100
);

/* Yazılar */

if(planStatus){
    planStatus.textContent =
    `${completedCount}/${todayPlans.length} plan tamamlandı`;
}

if(planDesc){
    planDesc.textContent =
    "Planların seni başarıya taşır! ihmal etme 🔥";
}

/* Progress */

const fill =
document.getElementById(
"plan-progress-fill"
);

const text =
document.getElementById(
"plan-progress-text"
);

const percentText =
document.getElementById(
"plan-progress-percent"
);

if(fill){

    fill.style.width =
    percentage + "%";

    fill.classList.remove(
        "progress-low",
        "progress-medium",
        "progress-high"
    );

    if(percentage < 30){

        fill.classList.add(
            "progress-low"
        );

    }
    else if(percentage < 70){

        fill.classList.add(
            "progress-medium"
        );

    }
    else{

        fill.classList.add(
            "progress-high"
        );
    }
}

if(text){
    text.textContent =
    `${completedCount} / ${todayPlans.length} tamamlandı`;
}

if(percentText){
    percentText.textContent =
    "%" + percentage;
}
}
}

/* 5. YAKLAŞAN SINAVLAR (LOCALSTORAGE SENKRONİZASYONU DÜZELTİLDİ) */
function loadUpcomingExams() {
    // Diğer JS dosyasındaki "nodax-exams" anahtarı ile tam senkronizasyon sağlandı
    const exams = JSON.parse(localStorage.getItem("nodax-exams") || '[]');
    const examStatus = document.getElementById("dash-exam-status");
    const examList = document.getElementById("dash-exam-list");

    if (!exams || exams.length === 0) {
        if (examStatus) examStatus.textContent = "Sınav tarihi girmedin";
        if (examList) examList.innerHTML = `<li class="no-exam-item">Sınav takviminizde kayıtlı sınav bulunmuyor.</li>`;
        return;
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const upcoming = [];

    exams.forEach(exam => {
        const examDate = new Date(exam.date);
        examDate.setHours(0, 0, 0, 0);
        
        const diffTime = examDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if(diffDays >= 0 && diffDays <= 30){

    upcoming.push({

        name:exam.name,

        daysLeft:diffDays

    });

}
    });

    upcoming.sort((a, b) => a.daysLeft - b.daysLeft);

    if (upcoming.length === 0) {
        if (examStatus) examStatus.textContent = "Yaklaşan sınavın yok";
        if (examList) examList.innerHTML = `<li class="no-exam-item">Önümüzdeki tarihlerde tanımlanmış bir sınav bulunmuyor.</li>`;
    } else {
        if (examStatus) examStatus.textContent = "";
        if (examList) {
            examList.innerHTML = upcoming
.sort((a,b)=>a.daysLeft-b.daysLeft)
.slice(0,3)
.map(item=>{

    let badge="normal";

    if(item.daysLeft<=3){

        badge="urgent";

    }else if(item.daysLeft<=10){

        badge="soon";

    }

    let text="";

    if(item.daysLeft===0){

        text="Bugün";

    }else if(item.daysLeft===1){

        text="Yarın";

    }else{

        text=item.daysLeft+" Gün";

    }

    return`

    <li class="dash-exam-item">

        <span class="exam-title">

            📘 ${item.name}

        </span>

        <span class="exam-badge ${badge}">

            ${text}

        </span>

    </li>

    `;

}).join("");}}}

/* 6. GRAFİK ÇİZİMİ (CANVAS KİLİTLENMESİ ÇÖZÜLDÜ) */
function initChartSafely() {
    const canvas = document.getElementById('weeklyActivityChart');
    if (!canvas) return;

    if (typeof Chart === 'undefined') {
        console.warn("Chart.js kütüphanesi yüklenmedi.");
        return;
    }

    // Var olan grafiği temizle (Çakışmaları engellemek için)
    let chartStatus = Chart.getChart(canvas);
    if (chartStatus !== undefined) {
        chartStatus.destroy();
    }

    const ctx = canvas.getContext('2d');
    const pomoStats = JSON.parse(localStorage.getItem("nodax_pomo_stats") || '{}');
    
    const labels = [];
    const data = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const dayName = d.toLocaleDateString('tr-TR', { weekday: 'short' });
        
        labels.push(dayName);
        data.push(pomoStats[dateStr] || 0);
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Odaklanma (Dk)',
                data: data,
                backgroundColor: 'rgba(129, 140, 248, 0.85)',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { display: false } },
                x: { grid: { display: false } }
            }
        }
    });
}

function initSettingsModal() {
    const modal = document.getElementById("settings-modal");
    const btnToggle = document.getElementById("btn-settings-toggle");
    const btnClose = document.getElementById("btn-close-settings");

    btnToggle?.addEventListener("click", () => modal?.classList.remove("hidden"));
    btnClose?.addEventListener("click", () => modal?.classList.add("hidden"));
}

    // Global Ekran Değiştirme ve Modül Tetikleyici
window.switchScreen = function (targetScreenId, titleText) {
    const screens = document.querySelectorAll(".app-screen");
    const backBtn = document.getElementById("btn-back");
    const headerTitle = document.getElementById("header-title");

    screens.forEach(screen => {
        if (screen.id === targetScreenId || screen.id === "screen-" + targetScreenId) {
            screen.classList.add("active");
        } else {
            screen.classList.remove("active");
        }
    });

    if (targetScreenId === "screen-dashboard" || targetScreenId === "dashboard") {
        if (backBtn) backBtn.classList.add("hidden");
        if (typeof startQuoteCycle === "function" && headerTitle) startQuoteCycle(headerTitle);
        
        // Dashboard'a dönüldüğünde tüm dynamic bileşenleri yeniden yükle
        if (typeof loadPomodoroData === "function") loadPomodoroData();
        if (typeof loadUpcomingExams === "function") loadUpcomingExams();
        if (typeof initChartSafely === "function") initChartSafely();
    } else {
        if (typeof stopQuoteCycle === "function") stopQuoteCycle();
        if (backBtn) backBtn.classList.remove("hidden");
        if (headerTitle && titleText) headerTitle.textContent = titleText;
    }
};


/* 3. POMODORO SÜRESİ YANSITMA (ÇAKIŞMA GİDERİLDİ) */
function loadPomodoroData(){

    const status =
    document.getElementById(
        "dash-pomodoro-status"
    );

    const fill =
    document.getElementById(
        "pomo-progress-fill"
    );

    const current =
    document.getElementById(
        "pomo-current"
    );

    const goalText =
    document.getElementById(
        "pomo-goal"
    );

    if(!status) return;

    const today =
    new Date().toISOString().split("T")[0];

    const stats =
    JSON.parse(
        localStorage.getItem("nodax_pomo_stats")
        ||
        "{}"
    );

    let minutes =
    Number(stats[today] || 0);

    const goal =
Number(
    localStorage.getItem("dailyPomodoroGoal")
) || 120;

    const percent=
    Math.min(
        (minutes/goal)*100,
        100
    );
if(fill){
    fill.style.width=
    percent+"%";}
if (current){
    current.textContent=
    formatPomodoro(minutes);
}
if(goalText){
    goalText.textContent = goal + " dk";
}

    status.textContent=
    formatPomodoro(minutes);

}
document.addEventListener("DOMContentLoaded",()=>{

    const modal=document.getElementById("goal-modal");

    const input=document.getElementById("goal-input");

    const open=document.getElementById("edit-pomo-goal");

    const save=document.getElementById("goal-save");

    const cancel=document.getElementById("goal-cancel");

    open?.addEventListener("click",()=>{

        input.value=
        localStorage.getItem("dailyPomodoroGoal") || 120;

        modal.classList.remove("hidden");

        input.focus();

    });

    cancel?.addEventListener("click",()=>{

        modal.classList.add("hidden");

    });

    save?.addEventListener("click",()=>{

        const minute=parseInt(input.value);

        if(isNaN(minute) || minute<10 || minute>1440){

            alert("10 ile 1440 dakika arasında değer gir.");

            return;

        }

        localStorage.setItem(
            "dailyPomodoroGoal",
            minute
        );

        modal.classList.add("hidden");

        loadPomodoroData();

    });

});
function formatPomodoro(minutes){

    const totalSeconds =
    Math.round(minutes*60);

    const hours =
    Math.floor(totalSeconds/3600);

    const mins =
    Math.floor(
        (totalSeconds%3600)/60
    );

    const secs =
    totalSeconds%60;

    if(hours>0){

        return `${hours} sa ${mins} dk`;

    }

    if(mins>0){

        return `${mins} dk ${secs} sn`;

    }

    return `${secs} sn`;

}

// updateDashboardPomodoro fonksiyonunu da doğrudan loadPomodoroData'ya yönlendirin:
function updateDashboardPomodoro() {
    loadPomodoroData();
}

document.addEventListener("DOMContentLoaded",()=>{

const logo=document.getElementById("header-title");

if(!logo) return;

const items=[
{
text:"Apexio",
slogan:false
},
{
text:"Zirveye Taşır.",
slogan:true
}
];

let current=0;

setInterval(()=>{

logo.style.transition="all .55s cubic-bezier(.4,0,.2,1)";
logo.style.opacity="0";
logo.style.transform="translateY(-18px) scale(.88) rotateX(90deg)";
logo.style.filter="blur(8px)";

setTimeout(()=>{

current=(current+1)%items.length;

logo.textContent=items[current].text;

logo.classList.toggle("slogan-mode",items[current].slogan);

logo.style.opacity="1";
logo.style.transform="translateY(0) scale(1) rotateX(0deg)";
logo.style.filter="blur(0px)";

},550);

},4500);

});