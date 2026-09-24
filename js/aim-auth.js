/**
 * ====================================================================
 * AIM AUTH & DEVICE LOCK ENGINE - AI NEXUS ELITE
 * POWERED BY AMIR ADEL (AI ENGINEER & CREATIVE TECHNOLOGIST)
 * 
 * نظام الحماية وتوثيق أكواد الحجز (AIM) وقفل الأجهزة الذكي:
 * 1. دعم وتوافق 100% مع استمارة AI MASTERY الرسمية (Forum-Ai-Mastrey).
 * 2. التحقق من حالة الكود: (شغال / مفعل Active) مقابل (مش متفعل Pending).
 * 3. قفل الكود على جهاز واحد فقط ومنع أي جهاز آخر من التسجيل به.
 * 4. لوحة تحكم وتفعيل سريع لرسائل واتساب للمهندس أمير عادل (01098021457).
 * ====================================================================
 */

const AIMAuth = (() => {
  const STORAGE_KEYS = {
    DEVICE_ID: 'aim_device_fingerprint_id',
    DEVICE_NAME: 'aim_device_friendly_name',
    ACTIVE_SESSION: 'aim_active_session_v1',
    CODES_DB: 'aim_registered_codes_db_v2', // تم التحديث لـ v2 لدعم حالة التفعيل
    COMPLETED_TOPICS: 'aim_completed_topics_v1',
    SIMULATED_DEVICE: 'aim_simulated_device_flag'
  };

  const ADMIN_PASSCODE = 'AMIR2026';
  const ORGANIZER_WHATSAPP = '201098021457';
  // رقم أستاذة رنا مسؤولة الـ HR (بدون إظهار الرقم مباشرة في الواجهة للحفاظ على الخصوصية)
  const HR_WHATSAPP = '20101266128';
  const OFFICIAL_FORM_URL = 'https://amir3delq1-stack.github.io/Forum-Ai-Mastrey/';

  // الأكواد المعتمدة الحقيقية فقط (الخاصة بالطلاب المسجلين بالاستمارة)
  const DEFAULT_INITIAL_CODES = [
    { 
      code: 'AIM-MUFF2V23', 
      studentName: 'Ahmed', 
      phone: '01098021457', 
      university: 'القاهره', 
      goal: 'عشان تعرف تستخدم الذكاء الاصطناعي في مجالك',
      status: 'active', // مفعل ومؤكد
      boundDeviceId: null, 
      boundDeviceName: null, 
      boundAt: null, 
      createdAt: '2026-09-24T13:56:00Z',
      notes: 'كود الاستمارة الرسمي (الطالب Ahmed)' 
    }
  ];

  // توليد بصمة الجهاز الفريدة
  function generateHardwareFingerprint() {
    try {
      const screenInfo = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
      const navInfo = `${navigator.userAgent || ''}-${navigator.language || ''}-${navigator.hardwareConcurrency || 4}-${navigator.platform || ''}`;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      
      let canvasHash = 'cv-none';
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.textBaseline = 'top';
          ctx.font = '14px Arial';
          ctx.fillStyle = '#00e5ff';
          ctx.fillRect(0, 0, 100, 30);
          ctx.fillStyle = '#07090e';
          ctx.fillText('AIM-NEXUS-AMIR-2026', 4, 8);
          canvasHash = canvas.toDataURL().slice(-30);
        }
      } catch (e) {
        canvasHash = 'cv-fallback';
      }

      const seed = `${screenInfo}|${navInfo}|${timezone}|${canvasHash}`;
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
      }
      const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
      return `DEV-HW-${hex.substring(0, 4)}-${hex.substring(4, 8)}`;
    } catch (err) {
      return `DEV-HW-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString(36).toUpperCase().slice(-4)}`;
    }
  }

  // كشف اسم الجهاز ونظام التشغيل
  function detectFriendlyDeviceName() {
    const ua = navigator.userAgent || '';
    let os = 'جهاز غير معروف';
    if (ua.includes('Windows')) os = 'كمبيوتر Windows';
    else if (ua.includes('Macintosh') || ua.includes('Mac OS')) os = 'جهاز Mac';
    else if (ua.includes('iPhone')) os = 'هاتف iPhone';
    else if (ua.includes('iPad')) os = 'جهاز iPad';
    else if (ua.includes('Android')) os = 'هاتف Android';
    else if (ua.includes('Linux')) os = 'جهاز Linux';

    let browser = 'المتصفح';
    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Edg')) browser = 'Edge';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';

    return `${os} (${browser})`;
  }

  function getDeviceId() {
    const simDevice = localStorage.getItem(STORAGE_KEYS.SIMULATED_DEVICE);
    if (simDevice) return simDevice;

    let devId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (!devId) {
      devId = generateHardwareFingerprint();
      localStorage.setItem(STORAGE_KEYS.DEVICE_ID, devId);
    }
    return devId;
  }

  function getDeviceFriendlyName() {
    let name = localStorage.getItem(STORAGE_KEYS.DEVICE_NAME);
    if (!name) {
      name = detectFriendlyDeviceName();
      localStorage.setItem(STORAGE_KEYS.DEVICE_NAME, name);
    }
    if (localStorage.getItem(STORAGE_KEYS.SIMULATED_DEVICE)) {
      return `[محاكاة جهاز ثانٍ] ${name}`;
    }
    return name;
  }

  // قراءة قاعدة بيانات الأكواد
  function getCodesDB() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CODES_DB);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading AIM codes DB:', e);
    }
    saveCodesDB(DEFAULT_INITIAL_CODES);
    return DEFAULT_INITIAL_CODES;
  }

  function saveCodesDB(codesArray) {
    try {
      localStorage.setItem(STORAGE_KEYS.CODES_DB, JSON.stringify(codesArray));
    } catch (e) {
      console.error('Error saving AIM codes DB:', e);
    }
  }

  // تنظيف واستخراج الكود بدقة (يدعم الكود مباشرة أو مع علامة # أو من رسالة كاملة)
  function normalizeCode(raw) {
    if (!raw) return '';
    let text = raw.trim();

    // فحص ما إذا كان المستخدم نسخ رسالة الاستمارة بالكامل
    const msgMatch = text.match(/(?:كود الحجز:\s*#?|#)(AIM-[A-Z0-9-]+)/i);
    if (msgMatch) {
      return msgMatch[1].toUpperCase();
    }

    // تنظيف الحروف العادية وإزالة #
    text = text.replace(/^[#\s]+/, '').replace(/[\s]+$/, '');
    const cleanMatch = text.match(/AIM-[A-Z0-9-]+/i);
    if (cleanMatch) {
      return cleanMatch[0].toUpperCase();
    }

    // إذا كتب الحروف فقط بدون AIM-
    if (!text.toUpperCase().startsWith('AIM-')) {
      text = 'AIM-' + text;
    }
    return text.toUpperCase();
  }

  // فحص خوارزمية كود الاستمارة (Base36 Timestamp Validation)
  // حيث أن الاستمارة تولد: id: 'AIM-' + Date.now().toString(36).toUpperCase()
  function isFormTimestampValid(code) {
    const clean = normalizeCode(code);
    const suffix = clean.replace(/^AIM-/, '');
    
    // الأكواد الناتجة عن Date.now().toString(36) تكون بين 7 و 9 خانات
    if (/^[A-Z0-9]{7,9}$/.test(suffix)) {
      try {
        const timestamp = parseInt(suffix, 36);
        // التحقق أن التوقيت يقع في نطاق حقيقي (بين 2024 و 2030)
        const minTime = new Date('2024-01-01').getTime();
        const maxTime = new Date('2030-01-01').getTime();
        return timestamp >= minTime && timestamp <= maxTime;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  // استخراج بيانات الطالب من نص رسالة الواتساب بالكامل تلقائياً
  function parseWhatsAppMessage(messageText) {
    if (!messageText || typeof messageText !== 'string') return null;

    const codeMatch = messageText.match(/(?:كود الحجز:\s*#?|#)(AIM-[A-Z0-9-]+)/i);
    if (!codeMatch) return null;

    const nameMatch = messageText.match(/(?:الاسم:\s*)([^\n\r]+)/i);
    const phoneMatch = messageText.match(/(?:رقم الواتساب:\s*)([^\n\r]+)/i);
    const univMatch = messageText.match(/(?:الجامعة\s*\/?\s*التخصص:\s*)([^\n\r]+)/i);
    const goalMatch = messageText.match(/(?:الهدف من [^\:]*:\s*)([^\n\r]+)/i);

    return {
      code: codeMatch[1].toUpperCase(),
      name: nameMatch ? nameMatch[1].replace(/[*_]/g, '').trim() : 'طالب مسجل',
      phone: phoneMatch ? phoneMatch[1].replace(/[*_]/g, '').trim() : '',
      university: univMatch ? univMatch[1].replace(/[*_]/g, '').trim() : '',
      goal: goalMatch ? goalMatch[1].replace(/[*_]/g, '').trim() : ''
    };
  }

  // الحصول على الجلسة النشطة الحالية
  function getActiveSession() {
    try {
      const sessionStr = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
      if (!sessionStr) return null;
      const session = JSON.parse(sessionStr);

      const db = getCodesDB();
      const record = db.find(c => c.code === session.code);
      const currentDeviceId = getDeviceId();

      if (!record || record.status !== 'active') {
        logout();
        return null;
      }

      if (record.boundDeviceId && record.boundDeviceId !== currentDeviceId) {
        logout();
        return null;
      }

      return session;
    } catch (e) {
      return null;
    }
  }

  // ===================================================
  // التحقق من كود AIM وقفل الجهاز وحالة التفعيل
  // ===================================================
  function validateAndBindCode(inputRaw, optionalStudentName = '') {
    if (!inputRaw || typeof inputRaw !== 'string') {
      return { success: false, errorType: 'EMPTY', message: 'يرجى إدخال كود الحجز الشخصي الخاص بك (#AIM-XXXXXXXX).' };
    }

    // تنظيف الكود أو استخراجه من الرسالة
    let cleanCode = normalizeCode(inputRaw);

    // التحقق من الصيغة المعتمدة لأكواد الحجز (AIM-)
    if (!cleanCode.startsWith('AIM-') || cleanCode.length < 8) {
      return {
        success: false,
        errorType: 'INVALID_FORMAT',
        message: 'صيغة كود الحجز غير صحيحة! يجب إدخال كود الحجز الخاص بك المبدوء بـ AIM (مثال: #AIM-MUFF2V23) الصادر لحضور السيشن.'
      };
    }

    const currentDeviceId = getDeviceId();
    const currentDeviceName = getDeviceFriendlyName();
    let db = getCodesDB();

    let codeIndex = db.findIndex(c => c.code === cleanCode);

    // إذا كان الكود جديداً بالصيغة المعتمدة للحجز (من الاستمارة أو كود مخصص)
    if (codeIndex === -1) {
      const newRecord = {
        code: cleanCode,
        studentName: optionalStudentName.trim() || 'طالب معتمد',
        status: 'active',
        boundDeviceId: null,
        boundDeviceName: null,
        boundAt: null,
        createdAt: new Date().toISOString(),
        notes: 'كود حجز معتمد تم تسجيله عبر المنصة'
      };
      db.push(newRecord);
      saveCodesDB(db);
      codeIndex = db.length - 1;
    }

    const record = db[codeIndex];

    // فحص ما إذا كان الكود موقوفاً يدوياً من الإدارة
    if (record.status === 'blocked' || record.status === 'inactive') {
      const waText = encodeURIComponent(`مرحباً م. أمير عادل، كود الحجز الخاص بي #${cleanCode} تم إيقافه، أرجو المساعدة في تفعيله.`);
      return {
        success: false,
        errorType: 'CODE_BLOCKED',
        code: cleanCode,
        whatsappUrl: `https://wa.me/${ORGANIZER_WHATSAPP}?text=${waText}`,
        message: `⏳ كود الحجز (${cleanCode}) غير مفعل حالياً!\n\n` +
                 `يرجى التواصل مع المهندس أمير عادل لتأكيد التفعيل.`
      };
    }

    // ==========================================
    // قفل الجهاز: منع أي جهاز ثانٍ من الدخول بنفس الكود
    // ==========================================
    if (record.boundDeviceId && record.boundDeviceId !== currentDeviceId) {
      return {
        success: false,
        errorType: 'LOCKED_TO_OTHER_DEVICE',
        code: cleanCode,
        boundDeviceId: record.boundDeviceId,
        boundDeviceName: record.boundDeviceName || 'جهاز مسجل',
        boundAt: record.boundAt,
        studentName: record.studentName,
        message: `⛔ تنبيه أمني: كود الحجز (${cleanCode}) مسجل ومقفل بالفعل على جهاز آخر!\n` +
                 `الجهاز المقيد عليه: ${record.boundDeviceName || 'جهاز مسجل'} [${record.boundDeviceId}].\n\n` +
                 `نظام الحماية يمنع تسجيل الدخول بنفس الكود من جهاز ثانٍ لحماية خصوصية المحتوى.\n` +
                 `إذا قمت بتغيير جهازك، يرجى التواصل مع المهندس أمير عادل لفك قفل الكود القديم.`
      };
    }

    // ==========================================
    // الكود متاح ومؤكد: قفله على هذا الجهاز وتفعيل الجلسة فوراً
    // ==========================================
    const nowISO = new Date().toISOString();
    const finalStudentName = optionalStudentName.trim() || record.studentName || 'طالب معتمد';

    record.boundDeviceId = currentDeviceId;
    record.boundDeviceName = currentDeviceName;
    record.boundAt = record.boundAt || nowISO;
    record.lastLoginAt = nowISO;
    if (optionalStudentName.trim()) {
      record.studentName = finalStudentName;
    }
    record.status = 'active';

    db[codeIndex] = record;
    saveCodesDB(db);

    const sessionData = {
      code: cleanCode,
      studentName: record.studentName || 'طالب معتمد',
      phone: record.phone || '',
      university: record.university || '',
      deviceId: currentDeviceId,
      deviceName: currentDeviceName,
      boundAt: record.boundAt,
      loginAt: nowISO
    };
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(sessionData));

    const hrUrl = getHRWhatsAppUrl(sessionData.studentName, cleanCode, currentDeviceId);

    return {
      success: true,
      code: cleanCode,
      session: sessionData,
      hrWhatsAppUrl: hrUrl,
      message: `🎉 تم التحقق بنجاح! تم تسجيل كود الحجز (${cleanCode}) وتأمينه وقفله على جهازك الحالي.`
    };
  }

  // تسجيل الخروج
  function logout() {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  }

  // تحديث وتثبيت اسم الطالب في الجلسة النشطة وقاعدة البيانات
  function updateStudentName(newName) {
    if (!newName || typeof newName !== 'string') return false;
    const clean = newName.trim();
    if (clean.length < 3) return false;

    const session = getActiveSession();
    if (!session) return false;

    session.studentName = clean;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));

    const db = getCodesDB();
    const item = db.find(c => c.code === session.code);
    if (item) {
      item.studentName = clean;
      saveCodesDB(db);
    }
    return true;
  }

  // ===================================================
  // عمليات لوحة الإدارة (المهندس أمير عادل)
  // ===================================================

  // تفعيل كود أو تغيير حالته بين (مفعل / غير مفعل)
  function adminSetCodeStatus(code, newStatus = 'active') {
    const db = getCodesDB();
    const clean = normalizeCode(code);
    const item = db.find(c => c.code === clean);
    if (!item) return false;

    item.status = newStatus;
    if (newStatus !== 'active') {
      // إذا تم إيقافه، ينهي الجلسة إن كان نشطاً
      const active = getActiveSession();
      if (active && active.code === clean) logout();
    }
    saveCodesDB(db);
    return true;
  }

  // التفعيل السريع من رسالة واتساب
  function adminActivateFromWhatsApp(messageText) {
    const parsed = parseWhatsAppMessage(messageText);
    if (!parsed) return { success: false, message: 'لم يتم العثور على صيغة كود AIM بالرسالة.' };

    const db = getCodesDB();
    let record = db.find(c => c.code === parsed.code);

    if (record) {
      record.status = 'active';
      record.studentName = parsed.name || record.studentName;
      record.phone = parsed.phone || record.phone;
      record.university = parsed.university || record.university;
      record.notes = 'تم التفعيل عبر لصق رسالة واتساب';
    } else {
      record = {
        code: parsed.code,
        studentName: parsed.name,
        phone: parsed.phone,
        university: parsed.university,
        goal: parsed.goal,
        status: 'active',
        boundDeviceId: null,
        boundDeviceName: null,
        boundAt: null,
        createdAt: new Date().toISOString(),
        notes: 'كود جديد مفعل من رسالة واتساب'
      };
      db.unshift(record);
    }

    saveCodesDB(db);
    return { success: true, record, message: `تم تفعيل كود الطالب (${parsed.name} - ${parsed.code}) بنجاح!` };
  }

  // فك قفل الجهاز لكود معين
  function adminUnbindCode(code) {
    const db = getCodesDB();
    const clean = normalizeCode(code);
    const item = db.find(c => c.code === clean);
    if (!item) return false;

    item.boundDeviceId = null;
    item.boundDeviceName = null;
    item.boundAt = null;
    item.notes = (item.notes || '') + ' [تم فك قفل الجهاز بواسطة الإدارة]';
    saveCodesDB(db);

    const active = getActiveSession();
    if (active && active.code === clean) logout();
    return true;
  }

  // حذف كود
  function adminDeleteCode(code) {
    let db = getCodesDB();
    const clean = normalizeCode(code);
    db = db.filter(c => c.code !== clean);
    saveCodesDB(db);

    const active = getActiveSession();
    if (active && active.code === clean) logout();
    return true;
  }

  // محاكي جهاز ثانٍ للاختبار
  function simulateSecondDevice(enable = true) {
    if (enable) {
      const fakeId = `DEV-SIMULATED-${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.setItem(STORAGE_KEYS.SIMULATED_DEVICE, fakeId);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
      return fakeId;
    } else {
      localStorage.removeItem(STORAGE_KEYS.SIMULATED_DEVICE);
      return null;
    }
  }

  function isSimulatingSecondDevice() {
    return !!localStorage.getItem(STORAGE_KEYS.SIMULATED_DEVICE);
  }

  function verifyAdminPasscode(pass) {
    return pass === ADMIN_PASSCODE;
  }

  function getCompletedTopics(activeCode) {
    if (!activeCode) return [];
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS) || '{}');
      return all[activeCode] || [];
    } catch (e) {
      return [];
    }
  }

  function toggleTopicCompleted(activeCode, topicId) {
    if (!activeCode) return [];
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS) || '{}');
      let userList = all[activeCode] || [];
      if (userList.includes(topicId)) {
        userList = userList.filter(id => id !== topicId);
      } else {
        userList.push(topicId);
      }
      all[activeCode] = userList;
      localStorage.setItem(STORAGE_KEYS.COMPLETED_TOPICS, JSON.stringify(all));
      return userList;
    } catch (e) {
      return [];
    }
  }

  // توليد رابط محادثة واتساب المباشرة مع أستاذة رنا مسؤولة الـ HR (بدون إظهار رقمها نصياً بالصفحة)
  function getHRWhatsAppUrl(studentName, code, deviceId) {
    const student = studentName || 'طالب مسجل';
    const c = code || 'AIM-XXXX';
    const dev = deviceId || getDeviceId();
    const timeStr = new Date().toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' });

    const messageText = 
`🎓 *طلب توثيق واعتماد شهادة حضور AI MASTERY*

مرحباً أستاذة رنا (مسؤولة الـ HR)،
أود تأكيد انضمامي للسيشن واعتماد اسمي لإصدار الشهادة الرسمية المعتمدة:
━━━━━━━━━━━━━━━
👤 *اسم الطالب:* ${student}
🔖 *كود الحجز:* #${c}
🔒 *معرف الجهاز:* ${dev}
🕒 *توقيت التسجيل:* ${timeStr}
━━━━━━━━━━━━━━━
✨ يرجى تأكيد استلام بياناتي واعتماد صدور الشهادة. شكراً لكِ!`;

    return `https://wa.me/${HR_WHATSAPP}?text=${encodeURIComponent(messageText)}`;
  }

  return {
    getDeviceId,
    getDeviceFriendlyName,
    getCodesDB,
    getActiveSession,
    validateAndBindCode,
    normalizeCode,
    parseWhatsAppMessage,
    getHRWhatsAppUrl,
    updateStudentName,
    logout,
    adminSetCodeStatus,
    adminActivateFromWhatsApp,
    adminUnbindCode,
    adminDeleteCode,
    verifyAdminPasscode,
    simulateSecondDevice,
    isSimulatingSecondDevice,
    getCompletedTopics,
    toggleTopicCompleted,
    ORGANIZER_WHATSAPP,
    OFFICIAL_FORM_URL
  };
})();

window.AIMAuth = AIMAuth;
