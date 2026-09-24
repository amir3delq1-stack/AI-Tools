/**
 * ====================================================================
 * AI NEXUS ELITE - AI MASTERY ACADEMY (AIM) APPLICATION LOGIC
 * POWERED BY AMIR ADEL - AI ENGINEER & CREATIVE TECHNOLOGIST
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentTrack = 'all';
  let currentLevel = 'all';
  let searchQuery = '';
  let activeSession = AIMAuth.getActiveSession();

  // عناصر شاشة القفل والتحقق والمحتوى المحمي
  const lockOverlay = document.getElementById('aimLockOverlay');
  const aimProtectedContent = document.getElementById('aimProtectedContent');
  const aimCodeInput = document.getElementById('aimCodeInput');
  const btnVerifyCode = document.getElementById('btnVerifyCode');
  const aimFeedbackBox = document.getElementById('aimFeedbackBox');
  const curDevIdDisplay = document.getElementById('curDevIdDisplay');
  const curDevNameDisplay = document.getElementById('curDevNameDisplay');

  // عناصر الشريط العلوي
  const navActiveCode = document.getElementById('navActiveCode');
  const navActiveStudent = document.getElementById('navActiveStudent');
  const navActiveDeviceId = document.getElementById('navActiveDeviceId');
  const btnNavLogout = document.getElementById('btnNavLogout');
  const btnNavAdmin = document.getElementById('btnNavAdmin');

  // عناصر المحتوى والفلترة
  const tracksContainer = document.getElementById('tracksPillsContainer');
  const conceptsGrid = document.getElementById('conceptsGrid');
  const matSearchInput = document.getElementById('matSearchInput');
  const matSearchClear = document.getElementById('matSearchClear');
  const levelFilterBtns = document.querySelectorAll('.level-filter-btn');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const progressPercent = document.getElementById('progressPercent');
  const btnOpenCert = document.getElementById('btnOpenCert');

  // عناصر الشهادة
  const certModal = document.getElementById('certModal');
  const btnCloseCert = document.getElementById('btnCloseCert');
  const btnPrintCert = document.getElementById('btnPrintCert');
  const btnDownloadCertImage = document.getElementById('btnDownloadCertImage');
  const btnSendCertToHR = document.getElementById('btnSendCertToHR');
  const certDynamicNameInput = document.getElementById('certDynamicNameInput');
  const btnApplyCertName = document.getElementById('btnApplyCertName');
  const certNameErrorMsg = document.getElementById('certNameErrorMsg');
  const certStudentName = document.getElementById('certStudentName');
  const certCode = document.getElementById('certCode');
  const certDeviceId = document.getElementById('certDeviceId');
  const certIssueDate = document.getElementById('certIssueDate');
  const certVerifyHash = document.getElementById('certVerifyHash');

  // عناصر لوحة تحكم م. أمير عادل
  const adminModal = document.getElementById('adminModal');
  const btnCloseAdmin = document.getElementById('btnCloseAdmin');
  const adminCodesTableBody = document.getElementById('adminCodesTableBody');
  const adminTotalCodes = document.getElementById('adminTotalCodes');
  const adminActiveCodes = document.getElementById('adminActiveCodes');
  const adminPendingCodes = document.getElementById('adminPendingCodes');
  const adminBoundCodes = document.getElementById('adminBoundCodes');
  const btnAdminQuickActivate = document.getElementById('btnAdminQuickActivate');
  const adminWhatsappPasteText = document.getElementById('adminWhatsappPasteText');
  const btnAdminExport = document.getElementById('btnAdminExport');

  // تهيئة معلومات الجهاز الحالي
  if (curDevIdDisplay) curDevIdDisplay.textContent = AIMAuth.getDeviceId();
  if (curDevNameDisplay) curDevNameDisplay.textContent = AIMAuth.getDeviceFriendlyName();

  // فحص حالة الجلسة وقفل الجهاز
  function checkAuthStatus() {
    activeSession = AIMAuth.getActiveSession();
    if (!activeSession) {
      if (aimProtectedContent) {
        aimProtectedContent.classList.remove('unlocked');
        aimProtectedContent.style.display = 'none';
      }
      lockOverlay.classList.remove('hidden');
      lockOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (aimCodeInput) setTimeout(() => aimCodeInput.focus(), 300);
    } else {
      lockOverlay.classList.add('hidden');
      lockOverlay.style.display = 'none';
      if (aimProtectedContent) {
        aimProtectedContent.classList.add('unlocked');
        aimProtectedContent.style.display = 'block';
      }
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';

      if (navActiveCode) navActiveCode.textContent = activeSession.code;
      if (navActiveStudent) navActiveStudent.textContent = activeSession.studentName || 'طالب معتمد';
      if (navActiveDeviceId) navActiveDeviceId.textContent = activeSession.deviceId;

      // تحميل وعرض المادة فقط بعد تسجيل الدخول وتأكيد الكود
      renderTracks();
      renderQuiz();
      renderConcepts();
      updateProgressUI();
    }
  }

  let autoDetectedStudentName = '';

  // معالجة لصق رسالة الاستمارة أو كود الحجز تلقائياً
  if (aimCodeInput) {
    aimCodeInput.addEventListener('input', (e) => {
      const val = e.target.value;
      // فحص إذا قام بلصق رسالة واتساب كاملة من الاستمارة
      if (val.includes('تسجيل جديد') || val.includes('كود الحجز:')) {
        const parsed = AIMAuth.parseWhatsAppMessage(val);
        if (parsed) {
          e.target.value = parsed.code;
          if (parsed.name) {
            autoDetectedStudentName = parsed.name;
          }
        }
      }
    });

    aimCodeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleVerification();
    });
  }

  if (btnVerifyCode) {
    btnVerifyCode.addEventListener('click', handleVerification);
  }

  function handleVerification() {
    const rawInput = aimCodeInput.value.trim();

    if (!rawInput) {
      showFeedback('يرجى إدخال كود الحجز الشخصي الخاص بك (الكود الفردي الصادر بعد تسجيل الاستمارة).', 'error');
      return;
    }

    const result = AIMAuth.validateAndBindCode(rawInput, autoDetectedStudentName);

    if (result.success) {
      // إشارة نجاح مباشرة وسريعة على الزر وفتح المادة فوراً
      btnVerifyCode.disabled = true;
      btnVerifyCode.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>تم التحقق بنجاح! جاري فتح المادة...</span>';
      btnVerifyCode.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      btnVerifyCode.style.color = '#fff';

      showFeedback('🎉 تم التحقق بنجاح! تم تسجيل كود الحجز وتأمينه على جهازك. جاري نقلك للمادة...', 'success');

      setTimeout(() => {
        lockOverlay.classList.add('hidden');
        lockOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        checkAuthStatus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 350);
    } else {
      if (result.errorType === 'CODE_BLOCKED') {
        showFeedback(result.message, 'pending', result.whatsappUrl);
      } else {
        showFeedback(result.message, 'error');
      }
    }
  }

  function showSuccessWithHR(msg, hrUrl) {
    aimFeedbackBox.innerHTML = '';
    const p = document.createElement('div');
    p.style.whiteSpace = 'pre-line';
    p.textContent = msg;
    aimFeedbackBox.appendChild(p);

    if (hrUrl) {
      const hrBtn = document.createElement('a');
      hrBtn.href = hrUrl;
      hrBtn.target = '_blank';
      hrBtn.rel = 'noopener noreferrer';
      hrBtn.className = 'aim-btn-hr-confirm';
      hrBtn.innerHTML = '<i class="fa-brands fa-whatsapp fa-lg"></i> <span>تأكيد اعتماد الشهادة مباشرة مع أ. رنا (مسؤولة الـ HR)</span>';
      aimFeedbackBox.appendChild(hrBtn);
    }

    aimFeedbackBox.className = 'aim-feedback-box success';
    aimFeedbackBox.style.display = 'block';
  }

  function showFeedback(msg, type, extraActionUrl = null) {
    aimFeedbackBox.innerHTML = '';
    const p = document.createElement('div');
    p.style.whiteSpace = 'pre-line';
    p.textContent = msg;
    aimFeedbackBox.appendChild(p);

    if (extraActionUrl) {
      const btn = document.createElement('a');
      btn.href = extraActionUrl;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
      btn.className = 'aim-btn-wa-activate';
      btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> <span>إرسال رسالة تفعيل الكود للمهندس أمير عادل (واتساب)</span>';
      aimFeedbackBox.appendChild(btn);
    }

    aimFeedbackBox.className = `aim-feedback-box ${type}`;
    aimFeedbackBox.style.display = 'block';
  }

  // محاكي الجهاز الثاني (Simulate 2nd Device)
  const btnSimulateDevice = document.getElementById('btnSimulateDevice');
  if (btnSimulateDevice) {
    function updateSimBtnText() {
      if (AIMAuth.isSimulatingSecondDevice()) {
        btnSimulateDevice.innerHTML = '<i class="fa-solid fa-rotate-left"></i> <span>إنهاء وضع محاكاة الجهاز الثاني (العودة لجهازك الأصلي)</span>';
        btnSimulateDevice.style.borderColor = '#ef4444';
        btnSimulateDevice.style.color = '#fca5a5';
      } else {
        btnSimulateDevice.innerHTML = '<i class="fa-solid fa-mobile-screen-button"></i> <span>محاكاة جهاز ثانٍ (اختبار قفل الجهاز على مستخدم آخر)</span>';
        btnSimulateDevice.style.borderColor = 'rgba(245, 158, 11, 0.4)';
        btnSimulateDevice.style.color = '#fbbf24';
      }
    }
    updateSimBtnText();

    btnSimulateDevice.addEventListener('click', () => {
      if (AIMAuth.isSimulatingSecondDevice()) {
        AIMAuth.simulateSecondDevice(false);
        alert('تمت العودة لمعرف جهازك الأصلي.');
      } else {
        const fakeId = AIMAuth.simulateSecondDevice(true);
        alert(`تم تفعيل وضع محاكاة جهاز ثانٍ!\nالمعرف المؤقت: ${fakeId}\nالآن جرب إدخال كود مفعل ومربوط بجهازك لمشاهدة رسالة الرفض الأمني!`);
      }
      location.reload();
    });
  }

  // طي وإظهار درج أدوات الاختبار
  const testerToggle = document.getElementById('aimTesterToggle');
  const testerBody = document.getElementById('aimTesterBody');
  if (testerToggle && testerBody) {
    testerToggle.addEventListener('click', () => {
      testerBody.classList.toggle('active');
    });
  }

  // تسجيل الخروج
  if (btnNavLogout) {
    btnNavLogout.addEventListener('click', () => {
      if (confirm('هل أنت متأكد من تسجيل الخروج من هذا الجهاز؟ (سيظل الكود مؤمناً ومقفولاً على هذا الجهاز)')) {
        AIMAuth.logout();
        location.reload();
      }
    });
  }

  // ===================================================
  // رندرة المسارات والمفاهيم
  // ===================================================
  function renderTracks() {
    if (!tracksContainer) return;
    tracksContainer.innerHTML = '';

    AIMaterialData.tracks.forEach(track => {
      const btn = document.createElement('button');
      btn.className = `track-pill-btn ${track.id === currentTrack ? 'active' : ''}`;
      
      const count = track.id === 'all' 
        ? AIMaterialData.concepts.length 
        : AIMaterialData.concepts.filter(c => c.track === track.id).length;

      btn.innerHTML = `
        <i class="${track.icon}"></i>
        <span>${track.name}</span>
        <span class="pill-count">${count}</span>
      `;

      btn.addEventListener('click', () => {
        currentTrack = track.id;
        document.querySelectorAll('.track-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderConcepts();
      });

      tracksContainer.appendChild(btn);
    });
  }

  function getFilteredConcepts() {
    return AIMaterialData.concepts.filter(concept => {
      const matchTrack = (currentTrack === 'all') || (concept.track === currentTrack);
      const matchLevel = (currentLevel === 'all') || (concept.level === currentLevel);

      let matchSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        matchSearch = 
          concept.termEn.toLowerCase().includes(q) ||
          concept.termAr.toLowerCase().includes(q) ||
          concept.acronym.toLowerCase().includes(q) ||
          concept.summary.toLowerCase().includes(q) ||
          concept.meaning.toLowerCase().includes(q) ||
          concept.example.toLowerCase().includes(q) ||
          concept.marketImpact.toLowerCase().includes(q) ||
          concept.relatedTools.some(t => t.toLowerCase().includes(q));
      }

      return matchTrack && matchLevel && matchSearch;
    });
  }

  function renderConcepts() {
    if (!conceptsGrid) return;
    const filtered = getFilteredConcepts();
    const session = AIMAuth.getActiveSession();
    const completedList = session ? AIMAuth.getCompletedTopics(session.code) : [];

    if (filtered.length === 0) {
      conceptsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <i class="fa-solid fa-compass-drafting" style="font-size: 3rem; color: var(--neon-cyan); margin-bottom: 16px;"></i>
          <h3 style="font-size: 1.4rem; color: #fff;">لم يتم العثور على أي مفهوم يطابق بحثك</h3>
          <p style="color: var(--text-muted); margin-top: 8px;">جرب تغيير كلمة البحث أو اختيار مسار آخر لاستعراض المفاهيم.</p>
        </div>
      `;
      return;
    }

    conceptsGrid.innerHTML = '';
    filtered.forEach(concept => {
      const isCompleted = completedList.includes(concept.id);
      const card = document.createElement('div');
      card.className = `concept-card ${isCompleted ? 'is-completed' : ''}`;
      card.id = `concept-${concept.id}`;

      const toolsHtml = concept.relatedTools.map(t => `<span class="tool-chip">${t}</span>`).join('');

      card.innerHTML = `
        <div class="concept-card-top">
          <div class="concept-icon-frame">
            <i class="${concept.categoryIcon || 'fa-solid fa-atom'}"></i>
          </div>
          <div class="concept-badges-row">
            <span class="concept-num-pill">#${concept.number}</span>
            <span class="concept-track-tag">${concept.trackName}</span>
            <span class="concept-level-tag">${concept.level}</span>
          </div>
        </div>

        <div class="concept-titles">
          <div class="concept-title-en">
            ${concept.termEn}
            <span style="font-size: 0.8rem; opacity: 0.6; font-weight: normal;">(${concept.acronym})</span>
          </div>
          <div class="concept-title-ar">${concept.termAr}</div>
        </div>

        <p class="concept-summary-lead">${concept.summary}</p>

        <div class="concept-blocks">
          <div class="c-block">
            <div class="c-block-head meaning-head">
              <i class="fa-solid fa-circle-info"></i>
              <span>المعنى الجوهري والمفهوم التقني:</span>
            </div>
            <div class="c-block-body">${concept.meaning}</div>
          </div>

          <div class="c-block">
            <div class="c-block-head example-head">
              <i class="fa-solid fa-lightbulb"></i>
              <span>مثال تطبيقي من الواقع:</span>
            </div>
            <div class="c-block-body">${concept.example}</div>
          </div>

          <div class="c-block">
            <div class="c-block-head impact-head">
              <i class="fa-solid fa-briefcase"></i>
              <span>أهميته في سوق العمل والشغل العملي:</span>
            </div>
            <div class="c-block-body">${concept.marketImpact}</div>
          </div>
        </div>

        <div class="concept-tools-row">
          <span class="label"><i class="fa-solid fa-toolbox"></i> أدوات مرتبطة:</span>
          ${toolsHtml}
        </div>

        <div class="concept-footer-actions">
          <button class="btn-toggle-complete" data-id="${concept.id}">
            <i class="fa-solid ${isCompleted ? 'fa-circle-check' : 'fa-circle'}"></i>
            <span>${isCompleted ? 'تم الاستيعاب بنجاح ✔' : 'تحديد كمكتمل'}</span>
          </button>
          
          <button class="btn-copy-concept" data-id="${concept.id}" title="نسخ ملخص هذا المفهوم">
            <i class="fa-regular fa-copy"></i>
          </button>
        </div>
      `;

      const btnToggle = card.querySelector('.btn-toggle-complete');
      btnToggle.addEventListener('click', () => {
        if (!activeSession) return;
        AIMAuth.toggleTopicCompleted(activeSession.code, concept.id);
        updateProgressUI();
        renderConcepts();
      });

      const btnCopy = card.querySelector('.btn-copy-concept');
      btnCopy.addEventListener('click', () => {
        const textToCopy = `📌 [${concept.termEn} | ${concept.termAr} (${concept.acronym})]\n\n💡 المفهوم: ${concept.summary}\n\n🔍 الشرح: ${concept.meaning}\n\n🎯 مثال عملي: ${concept.example}\n\n💼 سوق العمل: ${concept.marketImpact}\n\nالمصدر: أكاديمية الذكاء الاصطناعي - المهندس أمير عادل (Amir Adel)`;
        navigator.clipboard.writeText(textToCopy).then(() => {
          btnCopy.innerHTML = '<i class="fa-solid fa-check" style="color: var(--neon-emerald);"></i>';
          setTimeout(() => {
            btnCopy.innerHTML = '<i class="fa-regular fa-copy"></i>';
          }, 1500);
        });
      });

      conceptsGrid.appendChild(card);
    });
  }

  function updateProgressUI() {
    if (!activeSession) return;
    const completedList = AIMAuth.getCompletedTopics(activeSession.code);
    const total = AIMaterialData.concepts.length;
    const count = completedList.length;
    const percent = Math.round((count / total) * 100);

    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressText) progressText.textContent = `${count} من ${total}`;
    if (progressPercent) progressPercent.textContent = `${percent}%`;

    if (btnOpenCert) {
      if (percent >= 100) {
        btnOpenCert.innerHTML = '<i class="fa-solid fa-award"></i> <span>عرض شهادة الإتمام المعتمدة 🎓</span>';
        btnOpenCert.classList.add('pulse-glow');
      } else {
        btnOpenCert.innerHTML = '<i class="fa-solid fa-award"></i> <span>شهادة الإتمام (' + percent + '%)</span>';
      }
    }
  }

  // معالجة البحث
  if (matSearchInput) {
    matSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (matSearchClear) matSearchClear.style.display = searchQuery ? 'block' : 'none';
      renderConcepts();
    });
  }

  if (matSearchClear) {
    matSearchClear.addEventListener('click', () => {
      matSearchInput.value = '';
      searchQuery = '';
      matSearchClear.style.display = 'none';
      renderConcepts();
      matSearchInput.focus();
    });
  }

  // معالجة مستوى المفهوم
  levelFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      levelFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLevel = btn.getAttribute('data-level');
      renderConcepts();
    });
  });

  // ===================================================
  // الاختبار التفاعلي
  // ===================================================
  const quizQuestionsList = document.getElementById('quizQuestionsList');

  function renderQuiz() {
    if (!quizQuestionsList) return;
    quizQuestionsList.innerHTML = '';

    AIMaterialData.quiz.forEach((q, index) => {
      const qCard = document.createElement('div');
      qCard.className = 'quiz-question-card';
      qCard.id = `quiz-q-${index}`;

      const optionsHtml = q.options.map((opt, optIndex) => `
        <button class="quiz-opt-btn" data-q="${index}" data-opt="${optIndex}">
          <span style="font-weight: 700; color: var(--neon-cyan);">${optIndex + 1}.</span>
          <span>${opt}</span>
        </button>
      `).join('');

      qCard.innerHTML = `
        <div class="quiz-q-num">السؤال رقم ${index + 1} من ${AIMaterialData.quiz.length}</div>
        <div class="quiz-q-text">${q.question}</div>
        <div class="quiz-options-list">${optionsHtml}</div>
        <div class="quiz-explanation-box" id="quiz-exp-${index}">
          <strong><i class="fa-solid fa-circle-check" style="color: var(--neon-emerald);"></i> توضيح الإجابة الصحيحة:</strong>
          <p style="margin-top: 4px;">${q.explanation}</p>
        </div>
      `;

      const optButtons = qCard.querySelectorAll('.quiz-opt-btn');
      optButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const selectedIndex = parseInt(btn.getAttribute('data-opt'), 10);
          optButtons.forEach(b => b.disabled = true);

          if (selectedIndex === q.correctIndex) {
            btn.classList.add('correct');
          } else {
            btn.classList.add('wrong');
            optButtons[q.correctIndex].classList.add('correct');
          }

          const expBox = document.getElementById(`quiz-exp-${index}`);
          if (expBox) expBox.classList.add('show');
        });
      });

      quizQuestionsList.appendChild(qCard);
    });
  }

  // ===================================================
  // شهادة الإتمام والاعتماد الرسمية
  // ===================================================
  if (btnOpenCert) btnOpenCert.addEventListener('click', openCertificate);
  if (btnCloseCert) btnCloseCert.addEventListener('click', () => certModal.classList.add('hidden'));

  // التحقق من الاسم وتثبيته على الشهادة (إجباري)
  function validateAndSaveStudentName(showAlert = true) {
    const enteredName = certDynamicNameInput ? certDynamicNameInput.value.trim() : '';

    if (!enteredName || enteredName.length < 3) {
      if (certNameErrorMsg) certNameErrorMsg.classList.add('active');
      if (certDynamicNameInput) {
        certDynamicNameInput.focus();
        certDynamicNameInput.style.borderColor = '#ef4444';
      }
      return false;
    }

    // إخفاء الخطأ وتثبيت الاسم
    if (certNameErrorMsg) certNameErrorMsg.classList.remove('active');
    if (certDynamicNameInput) certDynamicNameInput.style.borderColor = 'var(--neon-emerald)';

    // حفظ الاسم في الجلسة النشطة وقاعدة البيانات
    AIMAuth.updateStudentName(enteredName);
    activeSession = AIMAuth.getActiveSession() || activeSession;
    if (activeSession) activeSession.studentName = enteredName;

    // تحديث عناصر الواجهة
    if (certStudentName) certStudentName.textContent = enteredName;
    if (navActiveStudent) navActiveStudent.textContent = enteredName;

    // تحديث رابط رسالة واتساب لأستاذة رنا مسؤولة الـ HR مباشرة
    if (btnSendCertToHR && activeSession) {
      btnSendCertToHR.href = AIMAuth.getHRWhatsAppUrl(enteredName, activeSession.code, activeSession.deviceId);
    }

    if (showAlert && btnApplyCertName) {
      const origContent = btnApplyCertName.innerHTML;
      btnApplyCertName.innerHTML = '<i class="fa-solid fa-check"></i> <span>تم اعتماد وتثبيت الاسم!</span>';
      btnApplyCertName.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      btnApplyCertName.style.color = '#fff';
      setTimeout(() => {
        btnApplyCertName.innerHTML = origContent;
        btnApplyCertName.style.background = '';
        btnApplyCertName.style.color = '';
      }, 2500);
    }

    return true;
  }

  if (btnApplyCertName) {
    btnApplyCertName.addEventListener('click', () => validateAndSaveStudentName(true));
  }

  if (certDynamicNameInput) {
    certDynamicNameInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val.length >= 3) {
        if (certNameErrorMsg) certNameErrorMsg.classList.remove('active');
        certDynamicNameInput.style.borderColor = 'var(--neon-cyan)';
        if (certStudentName) certStudentName.textContent = val;
      }
    });

    certDynamicNameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        validateAndSaveStudentName(true);
      }
    });
  }

  // تحميل الشهادة كصورة PNG عالية الدقة (html2canvas)
  if (btnDownloadCertImage) {
    btnDownloadCertImage.addEventListener('click', () => {
      if (!validateAndSaveStudentName(false)) {
        if (certNameErrorMsg) certNameErrorMsg.classList.add('active');
        if (certDynamicNameInput) {
          certDynamicNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          certDynamicNameInput.focus();
        }
        return;
      }

      const certEl = document.getElementById('printableCertificate');
      if (!certEl) return;

      if (typeof html2canvas !== 'function') {
        alert('مكتبة تصدير الصور قيد التحميل، يمكنك استخدام زر طباعة / حفظ PDF.');
        window.print();
        return;
      }

      const originalBtnHtml = btnDownloadCertImage.innerHTML;
      btnDownloadCertImage.disabled = true;
      btnDownloadCertImage.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>جاري إنشاء وتحميل الشهادة...</span>';

      html2canvas(certEl, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#090e17',
        logging: false
      }).then(canvas => {
        const link = document.createElement('a');
        const cleanName = ((activeSession && activeSession.studentName) || certStudentName.textContent || 'طالب').trim().replace(/[\s\/\\?%*:|"<>]/g, '_');
        link.download = `شهادة_إتمام_دورة_الذكاء_الاصطناعي_${cleanName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        btnDownloadCertImage.disabled = false;
        btnDownloadCertImage.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>تم تحميل الشهادة بنجاح!</span>';

        setTimeout(() => {
          btnDownloadCertImage.innerHTML = originalBtnHtml;
        }, 3500);
      }).catch(err => {
        console.error('Error generating certificate image:', err);
        btnDownloadCertImage.disabled = false;
        btnDownloadCertImage.innerHTML = originalBtnHtml;
        alert('تعذر تحميل الشهادة كصورة مباشرة على هذا المتصفح. تم تجهيز الشهادة للطباعة أو الحفظ كـ PDF.');
        window.print();
      });
    });
  }

  // طباعة / حفظ PDF
  if (btnPrintCert) {
    btnPrintCert.addEventListener('click', () => {
      if (!validateAndSaveStudentName(false)) {
        if (certNameErrorMsg) certNameErrorMsg.classList.add('active');
        if (certDynamicNameInput) {
          certDynamicNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          certDynamicNameInput.focus();
        }
        return;
      }
      window.print();
    });
  }

  // الضغط على زر التواصل مع مسؤولة الـ HR
  if (btnSendCertToHR) {
    btnSendCertToHR.addEventListener('click', (e) => {
      if (!validateAndSaveStudentName(false)) {
        e.preventDefault();
        if (certNameErrorMsg) certNameErrorMsg.classList.add('active');
        if (certDynamicNameInput) {
          certDynamicNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          certDynamicNameInput.focus();
        }
      }
    });
  }

  function openCertificate() {
    activeSession = AIMAuth.getActiveSession();
    if (!activeSession) return;

    // تهيئة حقل الاسم
    const currentName = (activeSession.studentName && activeSession.studentName !== 'طالب معتمد' && activeSession.studentName !== 'طالب مسجل') 
      ? activeSession.studentName 
      : '';

    if (certDynamicNameInput) {
      certDynamicNameInput.value = currentName;
      if (!currentName) {
        setTimeout(() => certDynamicNameInput.focus(), 300);
      }
    }

    if (certStudentName) {
      certStudentName.textContent = currentName || '...اكتب اسمك أعلاه...';
    }

    if (certCode) certCode.textContent = activeSession.code;
    if (certDeviceId) certDeviceId.textContent = activeSession.deviceId;
    
    // التاريخ المعتمد للشهادة: 25 سبتمبر 2026 (25 / 9 / 2026) طبقاً للطلب
    if (certIssueDate) certIssueDate.textContent = '25 سبتمبر 2026';

    const hash = Math.abs((activeSession.code + activeSession.deviceId).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0)).toString(16).toUpperCase();
    if (certVerifyHash) certVerifyHash.textContent = `VERIFIED-${hash}`;

    // رابط الواتساب المباشر لأستاذة رنا مسؤولة الـ HR (بدون إظهار رقم هاتفها في الواجهة)
    if (btnSendCertToHR) {
      btnSendCertToHR.href = AIMAuth.getHRWhatsAppUrl(currentName || 'طالب مسجل', activeSession.code, activeSession.deviceId);
    }

    certModal.classList.remove('hidden');
  }

  // تسجيل الخروج
  if (btnNavLogout) {
    btnNavLogout.addEventListener('click', () => {
      if (confirm('هل ترغب بالتأكيد في تسجيل الخروج من المادة؟')) {
        AIMAuth.logout();
        checkAuthStatus();
      }
    });
  }

  // ===================================================
  // لوحة تحكم م. أمير عادل (Amir Adel Control Hub)
  // ===================================================
  if (btnNavAdmin) {
    btnNavAdmin.addEventListener('click', () => {
      const pass = prompt('يرجى إدخال كلمة سر الإدارة (المهندس أمير عادل):');
      if (AIMAuth.verifyAdminPasscode(pass)) {
        openAdminModal();
      } else if (pass !== null) {
        alert('كلمة المرور غير صحيحة!');
      }
    });
  }

  if (btnCloseAdmin) {
    btnCloseAdmin.addEventListener('click', () => adminModal.classList.add('hidden'));
  }

  function openAdminModal() {
    renderAdminTable();
    adminModal.classList.remove('hidden');
  }

  function renderAdminTable() {
    const codes = AIMAuth.getCodesDB();
    const total = codes.length;
    const active = codes.filter(c => c.status === 'active').length;
    const pending = codes.filter(c => c.status === 'pending').length;
    const bound = codes.filter(c => c.boundDeviceId).length;

    if (adminTotalCodes) adminTotalCodes.textContent = total;
    if (adminActiveCodes) adminActiveCodes.textContent = active;
    if (adminPendingCodes) adminPendingCodes.textContent = pending;
    if (adminBoundCodes) adminBoundCodes.textContent = bound;

    if (!adminCodesTableBody) return;
    adminCodesTableBody.innerHTML = '';

    codes.forEach(item => {
      const tr = document.createElement('tr');
      const isBound = !!item.boundDeviceId;
      const isActive = item.status === 'active';

      tr.innerHTML = `
        <td style="font-family: monospace; font-weight: 700; color: var(--neon-cyan);">
          ${item.code}
          ${item.phone ? `<br><span style="font-size: 0.72rem; color: var(--text-dim); font-family: sans-serif;"><i class="fa-brands fa-whatsapp"></i> ${item.phone}</span>` : ''}
        </td>
        <td>
          <strong>${item.studentName || 'غير محدد'}</strong>
          ${item.university ? `<br><span style="font-size: 0.72rem; color: var(--text-dim);">${item.university}</span>` : ''}
        </td>
        <td>
          <button class="btn-toggle-status ${isActive ? 'btn-status-active' : 'btn-status-pending'}" data-code="${item.code}" title="اضغط للتبديل بين شغال ومفعل / مش متفعل">
            ${isActive ? '🟢 شغال ومفعل' : '🟡 مش متفعل'}
          </button>
        </td>
        <td style="font-family: monospace; font-size: 0.78rem; color: var(--text-dim);">
          ${isBound ? `<span style="color: #ef4444;"><i class="fa-solid fa-lock"></i> مقفل على:</span><br>${item.boundDeviceName || 'جهاز'} [${item.boundDeviceId}]` : '<span style="color: var(--neon-emerald);"><i class="fa-solid fa-lock-open"></i> متاح لأي جهاز</span>'}
        </td>
        <td>
          ${isBound ? `<button class="btn-unbind-code" data-code="${item.code}" title="فك قفل الجهاز ليتمكن من التسجيل من جهاز جديد"><i class="fa-solid fa-lock-open"></i> فك القفل</button>` : ''}
          <button class="btn-del-code" data-code="${item.code}" title="حذف الكود نهائياً"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;

      // تبديل حالة التفعيل
      const btnStatus = tr.querySelector('.btn-toggle-status');
      btnStatus.addEventListener('click', () => {
        const nextStatus = isActive ? 'pending' : 'active';
        AIMAuth.adminSetCodeStatus(item.code, nextStatus);
        renderAdminTable();
      });

      // فك قفل الجهاز
      const btnUnbind = tr.querySelector('.btn-unbind-code');
      if (btnUnbind) {
        btnUnbind.addEventListener('click', () => {
          if (confirm(`هل أنت متأكد من فك قفل الكود ${item.code}؟`)) {
            AIMAuth.adminUnbindCode(item.code);
            renderAdminTable();
          }
        });
      }

      // حذف الكود
      const btnDel = tr.querySelector('.btn-del-code');
      if (btnDel) {
        btnDel.addEventListener('click', () => {
          if (confirm(`هل أنت متأكد من حذف الكود ${item.code}؟`)) {
            AIMAuth.adminDeleteCode(item.code);
            renderAdminTable();
          }
        });
      }

      adminCodesTableBody.appendChild(tr);
    });
  }

  // التفعيل السريع بلصق رسالة واتساب
  if (btnAdminQuickActivate) {
    btnAdminQuickActivate.addEventListener('click', () => {
      const text = adminWhatsappPasteText ? adminWhatsappPasteText.value.trim() : '';
      if (!text) {
        alert('يرجى لصق نص رسالة الواتساب الواردة من الطالب أولاً.');
        return;
      }

      const res = AIMAuth.adminActivateFromWhatsApp(text);
      if (res.success) {
        alert(`🎉 ${res.message}`);
        if (adminWhatsappPasteText) adminWhatsappPasteText.value = '';
        renderAdminTable();
      } else {
        alert(`❌ ${res.message}\nتأكد أن الرسالة تحتوي على صيغة الكود مثل: #AIM-MUFF2V23`);
      }
    });
  }

  // تصدير الأكواد إلى CSV
  if (btnAdminExport) {
    btnAdminExport.addEventListener('click', () => {
      const codes = AIMAuth.getCodesDB();
      let csvContent = 'data:text/csv;charset=utf-8,Code,StudentName,Phone,University,Status,BoundDeviceId,BoundDeviceName,CreatedAt\n';
      codes.forEach(c => {
        csvContent += `"${c.code}","${c.studentName || ''}","${c.phone || ''}","${c.university || ''}","${c.status || 'active'}","${c.boundDeviceId || ''}","${c.boundDeviceName || ''}","${c.createdAt || ''}"\n`;
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `AIM_Codes_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // بدء تشغيل الصفحة بالتحقق الأمني من كود الحجز أولاً
  checkAuthStatus();
});
