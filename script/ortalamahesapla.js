document.addEventListener("DOMContentLoaded", () => {
    // Sekme Geçiş Elemanları
    const tabSchool = document.getElementById("calc-tab-school");
    const tabUni = document.getElementById("calc-tab-uni");
    const panelSchool = document.getElementById("panel-school-calc");
    const panelUni = document.getElementById("panel-uni-calc");

    // Kapsayıcılar ve Butonlar
    const schoolContainer = document.getElementById("school-lessons-container");
    const uniContainer = document.getElementById("uni-lessons-container");
    const btnAddSchool = document.getElementById("btn-add-school-lesson");
    const btnAddUni = document.getElementById("btn-add-uni-lesson");

    // Genel Üniversite Girdileri
    const uniPassingGradeInput = document.getElementById("uni-passing-grade");
    const uniFinalLimitInput = document.getElementById("uni-final-limit");

    // Sekme Değiştirme Mantığı
    tabSchool.addEventListener("click", () => {
        tabSchool.classList.add("active");
        tabUni.classList.remove("active");
        panelSchool.classList.remove("hidden");
        panelUni.classList.add("hidden");
    });

    tabUni.addEventListener("click", () => {
        tabUni.classList.add("active");
        tabSchool.classList.remove("active");
        panelUni.classList.remove("hidden");
        panelSchool.classList.add("hidden");
    });

    // 0-100 Arası Güvenli Sayı Girişini Sağlayan Yardımcı Fonksiyon
    function validateInputBounds(input) {
        if (input.value !== "") {
            let val = parseFloat(input.value);
            if (val < 0) input.value = 0;
            if (val > 100) input.value = 100;
        }
    }

    // ==========================================
    // ORTAOKUL / LİSE DERS BAZLI HESAPLAMA SİSTEMİ
    // ==========================================
    const createSchoolLessonRow = () => {
        const card = document.createElement("article");
        card.className = "exam-card";
        card.style.cssText = "flex-direction: column; align-items: stretch; gap: 12px; margin: 0; padding: 14px;";

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <input type="text" placeholder="Ders Adı (Örn: Matematik)" class="lesson-name" style="border: 0; background: transparent; font-weight: 700; color: var(--text-primary); font-size: 15px; padding: 0; outline: none; width: 55%;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="school-row-average-badge" data-avg="0" style="font-size: 13px; font-weight: 700; background: rgba(129,140,248,.13); padding: 4px 10px; border-radius: 8px; color: var(--color-purple); white-space: nowrap;">Ort: -</span>
                    <button class="exam-delete-button btn-delete-row" style="width:30px; height:30px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <div class="school-exams-row" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                    <div>
                        <div style="font-size: 10px; color: var(--text-secondary); text-align: center; margin-bottom: 3px;">1. Sınav</div>
                        <input type="number" placeholder="0-100" class="val-school-grade" min="0" max="100" style="width: 100%; height: 38px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-primary); font-size: 13px; outline: none;">
                    </div>
                    <div>
                        <div style="font-size: 10px; color: var(--text-secondary); text-align: center; margin-bottom: 3px;">2. Sınav</div>
                        <input type="number" placeholder="0-100" class="val-school-grade" min="0" max="100" style="width: 100%; height: 38px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-primary); font-size: 13px; outline: none;">
                    </div>
                </div>

                <div class="school-sozlu-row" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                    <div>
                        <div style="font-size: 10px; color: var(--text-secondary); text-align: center; margin-bottom: 3px;">1. Sözlü</div>
                        <input type="number" placeholder="0-100" class="val-school-grade" min="0" max="100" style="width: 100%; height: 38px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-primary); font-size: 13px; outline: none;">
                    </div>
                    <div>
                        <div style="font-size: 10px; color: var(--text-secondary); text-align: center; margin-bottom: 3px;">2. Sözlü</div>
                        <input type="number" placeholder="0-100" class="val-school-grade" min="0" max="100" style="width: 100%; height: 38px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-primary); font-size: 13px; outline: none;">
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 4px;">
                <button class="btn-add-extra-exam" style="flex: 1; height: 28px; font-size: 11px; border: 1px dashed var(--color-purple); background: transparent; color: var(--color-purple); border-radius: 6px; cursor: pointer;"><i class="fa-solid fa-plus"></i> Sınav Ekle</button>
                <button class="btn-add-extra-sozlu" style="flex: 1; height: 28px; font-size: 11px; border: 1px dashed var(--color-purple); background: transparent; color: var(--color-purple); border-radius: 6px; cursor: pointer;"><i class="fa-solid fa-plus"></i> Sözlü Ekle</button>
            </div>
        `;

        const examsRow = card.querySelector(".school-exams-row");
        const sozluRow = card.querySelector(".school-sozlu-row");
        const btnAddExtraExam = card.querySelector(".btn-add-extra-exam");
        const btnAddExtraSozlu = card.querySelector(".btn-add-extra-sozlu");

        // Dinamik Sınav Ekleme (Max 3)
        btnAddExtraExam.addEventListener("click", () => {
            const currentExams = examsRow.children.length;
            if (currentExams < 3) {
                const newDiv = document.createElement("div");
                newDiv.innerHTML = `
                    <div style="font-size: 10px; color: var(--text-secondary); text-align: center; margin-bottom: 3px;">3. Sınav</div>
                    <input type="number" placeholder="0-100" class="val-school-grade" min="0" max="100" style="width: 100%; height: 38px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-primary); font-size: 13px; outline: none;">
                `;
                newDiv.querySelector("input").addEventListener("input", (e) => {
                    validateInputBounds(e.target);
                    calculateSchoolRowAverage(card);
                    calculateSchoolGlobalTotal();
                });
                examsRow.appendChild(newDiv);
                if (examsRow.children.length >= 3) btnAddExtraExam.style.display = "none";
            }
        });

        // Dinamik Sözlü Ekleme (Max 3)
        btnAddExtraSozlu.addEventListener("click", () => {
            const currentSozlu = sozluRow.children.length;
            if (currentSozlu < 3) {
                const newDiv = document.createElement("div");
                newDiv.innerHTML = `
                    <div style="font-size: 10px; color: var(--text-secondary); text-align: center; margin-bottom: 3px;">3. Sözlü</div>
                    <input type="number" placeholder="0-100" class="val-school-grade" min="0" max="100" style="width: 100%; height: 38px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-primary); font-size: 13px; outline: none;">
                `;
                newDiv.querySelector("input").addEventListener("input", (e) => {
                    validateInputBounds(e.target);
                    calculateSchoolRowAverage(card);
                    calculateSchoolGlobalTotal();
                });
                sozluRow.appendChild(newDiv);
                if (sozluRow.children.length >= 3) btnAddExtraSozlu.style.display = "none";
            }
        });

        // Dinleyiciler
        card.addEventListener("input", (e) => {
            if (e.target.classList.contains("val-school-grade")) {
                validateInputBounds(e.target);
                calculateSchoolRowAverage(card);
                calculateSchoolGlobalTotal();
            }
        });

        card.querySelector(".btn-delete-row").addEventListener("click", () => {
            card.remove();
            calculateSchoolGlobalTotal();
        });

        schoolContainer.appendChild(card);
        calculateSchoolGlobalTotal();
    };

    function calculateSchoolRowAverage(row) {
        const inputs = row.querySelectorAll(".val-school-grade");
        const badge = row.querySelector(".school-row-average-badge");

        let validGrades = [];
        inputs.forEach(input => {
            const val = parseFloat(input.value);
            if (!isNaN(val)) validGrades.push(val);
        });

        if (validGrades.length > 0) {
            const avg = validGrades.reduce((a, b) => a + b, 0) / validGrades.length;
            badge.textContent = `Ort: ${avg.toFixed(1)}`;
            badge.setAttribute("data-avg", avg.toFixed(2));
        } else {
            badge.textContent = "Ort: -";
            badge.setAttribute("data-avg", "0");
        }
    }

    function calculateSchoolGlobalTotal() {
        const rows = schoolContainer.querySelectorAll(".exam-card");
        const totalDisplay = document.getElementById("school-total-result");
        const statusInfo = document.getElementById("school-status-info");

        let activeLessonCount = 0;
        let sumAverages = 0;

        rows.forEach(row => {
            const badge = row.querySelector(".school-row-average-badge");
            const avgVal = parseFloat(badge.getAttribute("data-avg")) || 0;
            
            if (avgVal > 0) {
                sumAverages += avgVal;
                activeLessonCount++;
            }
        });

        if (rows.length >= 2 && activeLessonCount >= 2) {
            const globalAvg = sumAverages / activeLessonCount;
            totalDisplay.textContent = globalAvg.toFixed(2);
            statusInfo.textContent = `Toplam Aktif Ders: ${activeLessonCount}`;
        } else {
            totalDisplay.textContent = "0.00";
            statusInfo.textContent = "En az 2 ders ekleyin";
        }
    }

    // ==========================================
    // ÜNİVERSİTE MOBİL UYUMLU GELİŞMİŞ HESAPLAMA
    // ==========================================
    const createUniLessonRow = () => {
        const card = document.createElement("article");
        card.className = "exam-card";
        card.style.cssText = "flex-direction: column; align-items: stretch; gap: 12px; margin: 0; padding: 16px;";

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed var(--border-color); padding-bottom: 8px; margin-bottom: 4px;">
                <input type="text" placeholder="Ders Adı (Örn: Lojistik)" class="uni-lesson-name" style="border: 0; background: transparent; font-weight: 700; color: var(--text-primary); font-size: 15px; padding: 0; outline: none; width: 55%;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="uni-row-grade-badge" style="font-size: 12px; font-weight: bold; background: rgba(129,140,248,.1); padding: 4px 8px; border-radius: 8px; color: var(--color-purple); white-space: nowrap;">Ort: -</span>
                    <button class="exam-delete-button btn-delete-uni-row" style="width:30px; height:30px; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                    <span style="font-size: 13px; font-weight: 600; color: var(--text-primary); width: 45px;">Vize</span>
                    <div style="display: flex; gap: 6px; flex: 1;">
                        <input type="number" placeholder="Notu" class="uni-vize-grade val-uni-grade" min="0" max="100" style="flex: 1; height: 36px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-primary); font-size: 13px; outline: none;">
                        <input type="number" placeholder="Etki %" class="uni-vize-percent" value="30" min="0" max="100" style="width: 70px; height: 36px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-secondary); font-size: 12px; outline: none;">
                    </div>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                    <span style="font-size: 13px; font-weight: 600; color: var(--text-primary); width: 45px;">Ödev</span>
                    <div style="display: flex; gap: 6px; flex: 1;">
                        <input type="number" placeholder="Notu" class="uni-odev-grade val-uni-grade" min="0" max="100" style="flex: 1; height: 36px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-primary); font-size: 13px; outline: none;">
                        <input type="number" placeholder="Etki %" class="uni-odev-percent" value="20" min="0" max="100" style="width: 70px; height: 36px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-secondary); font-size: 12px; outline: none;">
                    </div>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                    <span style="font-size: 13px; font-weight: 600; color: var(--text-primary); width: 45px;">Final</span>
                    <div style="display: flex; gap: 6px; flex: 1;">
                        <input type="number" placeholder="Notu" class="uni-final-grade val-uni-grade" min="0" max="100" style="flex: 1; height: 36px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-primary); font-size: 13px; outline: none;">
                        <input type="number" placeholder="Etki %" class="uni-final-percent" value="50" min="0" max="100" style="width: 70px; height: 36px; text-align: center; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-secondary); font-size: 12px; outline: none;">
                    </div>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 4px; padding-top: 8px; border-top: 1px solid var(--border-color);">
                    <span style="font-size: 12px; color: var(--text-secondary);"><i class="fa-solid fa-graduation-cap"></i> Dersin Kredisi</span>
                    <input type="number" value="3" min="1" max="10" class="uni-credit" style="width: 70px; height: 32px; text-align: center; border-radius: 8px; border: 1px solid var(--color-purple); background: var(--bg-main); color: var(--text-primary); font-size: 13px; font-weight: bold; outline: none;">
                </div>
            </div>
        `;

        card.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", (e) => {
                if (e.target.classList.contains("val-uni-grade") || e.target.id === "uni-passing-grade" || e.target.id === "uni-final-limit") {
                    validateInputBounds(e.target);
                }
                calculateUniTotal();
            });
        });

        card.querySelector(".btn-delete-uni-row").addEventListener("click", () => {
            card.remove();
            calculateUniTotal();
        });

        uniContainer.appendChild(card);
        calculateUniTotal();
    };

    function convertTo4Scale(grade) {
        if (grade >= 90) return { gpa: 4.0, text: "AA" };
        if (grade >= 85) return { gpa: 3.5, text: "BA" };
        if (grade >= 80) return { gpa: 3.0, text: "BB" };
        if (grade >= 75) return { gpa: 2.5, text: "CB" };
        if (grade >= 70) return { gpa: 2.0, text: "CC" };
        if (grade >= 65) return { gpa: 1.5, text: "DC" };
        if (grade >= 60) return { gpa: 1.0, text: "DD" };
        if (grade >= 50) return { gpa: 0.5, text: "FD" };
        return { gpa: 0.0, text: "FF" };
    }

    function calculateUniTotal() {
        const rows = uniContainer.querySelectorAll(".exam-card");
        const globalPassingGrade = parseFloat(uniPassingGradeInput.value) || 0;
        const globalFinalLimit = parseFloat(uniFinalLimitInput.value) || 0;

        let totalWeightedGpa = 0;
        let totalCredits = 0;

        rows.forEach(row => {
            const vize = parseFloat(row.querySelector(".uni-vize-grade").value) || 0;
            const vizeW = parseFloat(row.querySelector(".uni-vize-percent").value) || 0;
            
            const odev = parseFloat(row.querySelector(".uni-odev-grade").value) || 0;
            const odevW = parseFloat(row.querySelector(".uni-odev-percent").value) || 0;
            
            const final = parseFloat(row.querySelector(".uni-final-grade").value);
            const finalW = parseFloat(row.querySelector(".uni-final-percent").value) || 0;
            
            const credit = parseFloat(row.querySelector(".uni-credit").value) || 0;
            const badge = row.querySelector(".uni-row-grade-badge");

            if (!isNaN(final) && credit > 0) {
                const lessonAverage = ((vize * vizeW) + (odev * odevW) + (final * finalW)) / 100;
                let letterData = convertTo4Scale(lessonAverage);

                if (final < globalFinalLimit || lessonAverage < globalPassingGrade) {
                    letterData = { gpa: 0.0, text: "FF (Kaldı)" };
                }

                badge.textContent = `${lessonAverage.toFixed(1)} - ${letterData.text}`;
                badge.style.color = letterData.gpa > 0 ? "var(--color-green)" : "#ef4444";

                totalWeightedGpa += letterData.gpa * credit;
                totalCredits += credit;
            } else {
                badge.textContent = "Ort: -";
                badge.style.color = "var(--text-secondary)";
            }
        });

        const totalDisplay = document.getElementById("uni-total-result");
        const statusInfo = document.getElementById("uni-status-info");

        if (totalCredits > 0) {
            const finalGano = totalWeightedGpa / totalCredits;
            totalDisplay.textContent = finalGano.toFixed(2);
            statusInfo.textContent = `Toplam Kredi: ${totalCredits}`;
        } else {
            totalDisplay.textContent = "0.00";
            statusInfo.textContent = "Kredi Yükü: 0";
        }
    }

    // Üst Kriter Giriş Sınırlandırmaları
    uniPassingGradeInput.addEventListener("input", (e) => {
        validateInputBounds(e.target);
        calculateUniTotal();
    });
    uniFinalLimitInput.addEventListener("input", (e) => {
        validateInputBounds(e.target);
        calculateUniTotal();
    });

    btnAddSchool.addEventListener("click", createSchoolLessonRow);
    btnAddUni.addEventListener("click", createUniLessonRow);

    // Açılışta varsayılan satırları yükleme
    createSchoolLessonRow();
    createUniLessonRow();
});