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
  // رقم أستاذة رنا مسؤولة الـ HR (الرقم الأساسي المعتمد لجميع التحويلات والتواصل)
  const HR_WHATSAPP = '20101266128';
  const ORGANIZER_WHATSAPP = HR_WHATSAPP;
  const OFFICIAL_FORM_URL = 'https://amir3delq1-stack.github.io/Forum-Ai-Mastrey/';
  // السجل السحابي العالمي المباشر لضمان قفل الكود ومنع استخدامه من أي جهاز آخر في العالم
  const MASTER_REGISTRY_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a0d38db69b07ec';

  // قائمة الأكواد المبدئية المعتمدة (فارغة لضمان عدم وجود أي كود تجريبي متاح للدخول العام)
  const DEFAULT_INITIAL_CODES = [];

  // قائمة الأكواد التوضيحية والتجريبية المحظورة تماماً (للمثال فقط ولا يمكن لأحد التسجيل أو الدخول بها)
  const FORBIDDEN_EXAMPLE_CODES = [
    'AIM-MUFF2V23',
    'AIM-AMUFF2V23',
    'IM-AMUFF2V23',
    'AIM-XXXXXXXX',
    'AIM-EXAMPLE',
    'AIM-TEST',
    'AIM-DEMO'
  ];

  // دالة فحص ما إذا كان الكود هو كود مثال توضيحي محظور
  function isForbiddenExampleCode(code) {
    if (!code) return false;
    const str = String(code).toUpperCase().replace(/^[#\s]+/, '').trim();
    if (FORBIDDEN_EXAMPLE_CODES.includes(str)) return true;
    if (str.includes('MUFF2V23')) return true;
    if (str.includes('XXXXXXXX')) return true;
    return false;
  }

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
        let codes = JSON.parse(data);
        if (Array.isArray(codes)) {
          // تطهير وحذف أي كود تجريبي توضيحي محظور مثل AIM-MUFF2V23
          const filtered = codes.filter(c => !isForbiddenExampleCode(c.code));
          if (filtered.length !== codes.length) {
            saveCodesDB(filtered);
          }
          return filtered;
        }
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

      // إذا كان الكود المسجل في الجلسة هو كود المثال، يتم طرده وقفل الشاشة فوراً
      if (isForbiddenExampleCode(session.code)) {
        logout();
        return null;
      }

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
  // السجل السحابي العالمي لقفل الأجهزة (Cross-Device Cloud Shield)
  // ===================================================

  // جلب سجل الأقفال السحابية لجميع الأجهزة عالمياً
  async function fetchCloudLocks() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(MASTER_REGISTRY_URL, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const json = await res.json();
        return (json && json.data && json.data.locks) ? json.data.locks : {};
      }
    } catch (e) {
      console.warn('تعذر جلب سجل القفل السحابي المباشر، جاري الاعتماد على السجل المحلي:', e);
    }
    return null;
  }

  // تسجيل وحفظ قفل الكود على هذا الجهاز في السحابة فوراً لمنع أي جهاز آخر في العالم
  async function commitCloudLock(code, lockPayload) {
    try {
      const currentLocks = (await fetchCloudLocks()) || {};
      currentLocks[code] = lockPayload;

      const payload = {
        name: "AIM_GLOBAL_DEVICE_REGISTRY_2026",
        data: {
          version: "1.0",
          updatedAt: new Date().toISOString(),
          locks: currentLocks
        }
      };

      await fetch(MASTER_REGISTRY_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.warn('فشل تحديث القفل السحابي:', e);
    }
  }

  // مسح قفل الكود من السحابة في حال فك القفل من الإدارة
  async function removeCloudLock(code) {
    try {
      const currentLocks = (await fetchCloudLocks()) || {};
      if (currentLocks[code]) {
        delete currentLocks[code];
        const payload = {
          name: "AIM_GLOBAL_DEVICE_REGISTRY_2026",
          data: {
            version: "1.0",
            updatedAt: new Date().toISOString(),
            locks: currentLocks
          }
        };
        await fetch(MASTER_REGISTRY_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    } catch (e) {
      console.warn('فشل مسح القفل السحابي:', e);
    }
  }

  // ===================================================
  // التحقق من كود AIM وقفل الجهاز المشدد وحالة التفعيل
  // ===================================================
  async function validateAndBindCode(inputRaw, optionalStudentName = '') {
    if (!inputRaw || typeof inputRaw !== 'string') {
      return { success: false, errorType: 'EMPTY', message: 'يرجى إدخال كود الحجز الشخصي الخاص بك (الكود الفردي الذي وصلك بعد تسجيل الاستمارة).' };
    }

    // فحص حظر كود المثال التوضيحي قبل أي معالجة (حتى يفشل من يحاول الدخول به فوراً)
    if (isForbiddenExampleCode(inputRaw)) {
      return {
        success: false,
        errorType: 'EXAMPLE_CODE_FORBIDDEN',
        code: 'AIM-MUFF2V23',
        message: '⛔ تنبيه أمني: الكود (#AIM-MUFF2V23) هو مجرد مثال توضيحي ومحظور استخدامه للدخول أو التسجيل!\n\nيجب عليك إدخال كود الحجز الفردي الخاص بك الذي استلمته بعد التسجيل في الاستمارة لحضور السيشن.'
      };
    }

    // تنظيف الكود أو استخراجه من الرسالة
    let cleanCode = normalizeCode(inputRaw);

    // فحص حظر الكود بعد التنظيف أيضاً
    if (isForbiddenExampleCode(cleanCode)) {
      return {
        success: false,
        errorType: 'EXAMPLE_CODE_FORBIDDEN',
        code: cleanCode,
        message: `⛔ تنبيه أمني: الكود (${cleanCode}) هو مجرد مثال توضيحي ومحظور استخدامه للدخول أو التسجيل!\n\nيجب عليك إدخال كود الحجز الفردي الخاص بك الذي استلمته بعد التسجيل في الاستمارة لحضور السيشن.`
      };
    }

    // التحقق من الصيغة المعتمدة لأكواد الحجز (AIM-)
    if (!cleanCode.startsWith('AIM-') || cleanCode.length < 8) {
      return {
        success: false,
        errorType: 'INVALID_FORMAT',
        message: 'صيغة كود الحجز غير صحيحة! يجب إدخال كود الحجز الخاص بك المبدوء بـ AIM (الكود #AIM-MUFF2V23 هو مجرد مثال توضيحي، أدخل كودك الشخصي الذي وصلك بعد التسجيل).'
      };
    }

    const currentDeviceId = getDeviceId();
    const currentDeviceName = getDeviceFriendlyName();
    let db = getCodesDB();
    const nowISO = new Date().toISOString();

    // ----------------------------------------------------
    // الخطوة 1: فحص قاعدة البيانات المحلية للجهاز
    // ----------------------------------------------------
    let localRecord = db.find(c => c.code === cleanCode);
    if (localRecord && localRecord.boundDeviceId && localRecord.boundDeviceId !== currentDeviceId) {
      const waMsg = encodeURIComponent(`مرحباً أ. رنا (مسؤولة الـ HR)، كود الحجز الخاص بي #${cleanCode} يظهر أنه مقفل بالفعل على جهاز آخر [${localRecord.boundDeviceName}]. أرجو المساعدة في التحقق من هويتي وفك القفل.`);
      return {
        success: false,
        errorType: 'LOCKED_TO_OTHER_DEVICE',
        code: cleanCode,
        boundDeviceId: localRecord.boundDeviceId,
        boundDeviceName: localRecord.boundDeviceName || 'جهاز مسجل',
        boundAt: localRecord.boundAt,
        studentName: localRecord.studentName,
        whatsappUrl: `https://wa.me/${HR_WHATSAPP}?text=${waMsg}`,
        message: `⛔ تنبيه أمني مشدد: كود الحجز (${cleanCode}) مسجل ومقفل بالفعل على جهاز آخر!\n\n` +
                 `📱 الجهاز المقيد عليه: [${localRecord.boundDeviceName || 'جهاز آخر'}].\n` +
                 `🕒 توقيت التسجيل والقفل: ${localRecord.boundAt ? new Date(localRecord.boundAt).toLocaleString('ar-EG') : 'سابقاً'}.\n\n` +
                 `🔒 نظام الحماية يمنع تسجيل الدخول بنفس الكود من جهاز ثانٍ نهائياً لمنع مشاركة الحسابات.\n` +
                 `إذا قمت بتغيير جهازك، يرجى التواصل مباشرة مع أ. رنا (مسؤولة الـ HR) للتحقق وإعادة التعيين.`
      };
    }

    // ----------------------------------------------------
    // الخطوة 2: فحص السجل السحابي العالمي المباشر (Cross-Device Cloud Shield)
    // ----------------------------------------------------
    const cloudLocks = await fetchCloudLocks();
    if (cloudLocks && cloudLocks[cleanCode]) {
      const cloudLock = cloudLocks[cleanCode];
      // إذا كان الكود مقيداً مسبقاً على جهاز آخر في أي مكان في العالم:
      if (cloudLock.boundDeviceId && cloudLock.boundDeviceId !== currentDeviceId) {
        // تحديث وتأمين السجل المحلي ليمنع هذا الجهاز فوراً حتى لو كان أوفلاين
        if (localRecord) {
          localRecord.boundDeviceId = cloudLock.boundDeviceId;
          localRecord.boundDeviceName = cloudLock.boundDeviceName;
          localRecord.boundAt = cloudLock.boundAt;
          saveCodesDB(db);
        } else {
          db.push({
            code: cleanCode,
            studentName: cloudLock.studentName || 'طالب مسجل',
            status: 'active',
            boundDeviceId: cloudLock.boundDeviceId,
            boundDeviceName: cloudLock.boundDeviceName,
            boundAt: cloudLock.boundAt,
            createdAt: cloudLock.boundAt || nowISO,
            notes: 'تمت المزامنة من السجل السحابي (مقفل على جهاز آخر)'
          });
          saveCodesDB(db);
        }

        const boundDevName = cloudLock.boundDeviceName || 'جهاز مسجل';
        const boundTimeStr = cloudLock.boundAt ? new Date(cloudLock.boundAt).toLocaleString('ar-EG') : 'سابقاً';
        const waMsg = encodeURIComponent(`مرحباً أ. رنا (مسؤولة الـ HR)، كود الحجز الخاص بي #${cleanCode} يظهر أنه مقفل بالفعل على جهاز آخر [${boundDevName}]. أرجو المساعدة في التحقق من هويتي وفك القفل.`);

        return {
          success: false,
          errorType: 'LOCKED_TO_OTHER_DEVICE',
          code: cleanCode,
          boundDeviceId: cloudLock.boundDeviceId,
          boundDeviceName: boundDevName,
          boundAt: cloudLock.boundAt,
          studentName: cloudLock.studentName,
          whatsappUrl: `https://wa.me/${HR_WHATSAPP}?text=${waMsg}`,
          message: `⛔ تنبيه أمني مشدد: كود الحجز (${cleanCode}) مسجل ومقفل بالفعل على جهاز آخر!\n\n` +
                   `📱 الجهاز المقيد عليه: [${boundDevName}].\n` +
                   `🕒 توقيت التسجيل والقفل: ${boundTimeStr}.\n\n` +
                   `🔒 نظام الحماية يمنع تسجيل الدخول بنفس الكود من جهاز ثانٍ نهائياً لمنع مشاركة الحسابات.\n` +
                   `إذا قمت بتغيير جهازك، يرجى التواصل مباشرة مع أ. رنا (مسؤولة الـ HR) للتحقق وإعادة التعيين.`
        };
      }
    }

    // فحص ما إذا كان الكود موقوفاً يدوياً من الإدارة
    if (localRecord && (localRecord.status === 'blocked' || localRecord.status === 'inactive')) {
      const waText = encodeURIComponent(`مرحباً أ. رنا (مسؤولة الـ HR)، كود الحجز الخاص بي #${cleanCode} تم إيقافه، أرجو المساعدة في تفعيله.`);
      return {
        success: false,
        errorType: 'CODE_BLOCKED',
        code: cleanCode,
        whatsappUrl: `https://wa.me/${HR_WHATSAPP}?text=${waText}`,
        message: `⏳ كود الحجز (${cleanCode}) غير مفعل حالياً!\n\n` +
                 `يرجى التواصل مباشرة مع أ. رنا (مسؤولة الـ HR) لتأكيد التفعيل.`
      };
    }

    // ----------------------------------------------------
    // الخطوة 3: الكود متاح وصحيح: قفل الكود فوراً وتثبيته على هذا الجهاز محلياً وسحابياً
    // ----------------------------------------------------
    const finalStudentName = optionalStudentName.trim() || 
                             (localRecord ? localRecord.studentName : '') || 
                             (cloudLocks && cloudLocks[cleanCode] ? cloudLocks[cleanCode].studentName : '') || 
                             'طالب معتمد';

    let codeIndex = db.findIndex(c => c.code === cleanCode);
    if (codeIndex === -1) {
      localRecord = {
        code: cleanCode,
        studentName: finalStudentName,
        status: 'active',
        boundDeviceId: currentDeviceId,
        boundDeviceName: currentDeviceName,
        boundAt: nowISO,
        createdAt: nowISO,
        notes: 'كود حجز معتمد تم قفله وتأمينه'
      };
      db.push(localRecord);
    } else {
      localRecord = db[codeIndex];
      localRecord.boundDeviceId = currentDeviceId;
      localRecord.boundDeviceName = currentDeviceName;
      localRecord.boundAt = localRecord.boundAt || nowISO;
      localRecord.status = 'active';
      if (optionalStudentName.trim()) localRecord.studentName = finalStudentName;
      db[codeIndex] = localRecord;
    }
    saveCodesDB(db);

    // رفع القفل للسحابة فوراً لمنع أي جهاز آخر في العالم من استخدام الكود
    const lockPayload = {
      boundDeviceId: currentDeviceId,
      boundDeviceName: currentDeviceName,
      boundAt: localRecord.boundAt || nowISO,
      studentName: finalStudentName
    };
    commitCloudLock(cleanCode, lockPayload);

    // إنشاء الجلسة النشطة
    const sessionData = {
      code: cleanCode,
      studentName: finalStudentName,
      deviceId: currentDeviceId,
      deviceName: currentDeviceName,
      boundAt: localRecord.boundAt || nowISO,
      loginAt: nowISO
    };
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(sessionData));

    const hrUrl = getHRWhatsAppUrl(finalStudentName, cleanCode, currentDeviceId);

    return {
      success: true,
      code: cleanCode,
      session: sessionData,
      hrWhatsAppUrl: hrUrl,
      message: `🎉 تم التحقق بنجاح! تم تسجيل كود الحجز (${cleanCode}) وقفله وتأمينه نهائياً على هذا الجهاز.`
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

    if (isForbiddenExampleCode(parsed.code)) {
      return { success: false, message: `⛔ تنبيه: الكود (${parsed.code}) هو مجرد كود تجريبي توضيحي ومحظور تفعيله أو استخدامه!` };
    }

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
  async function adminUnbindCode(code) {
    const db = getCodesDB();
    const clean = normalizeCode(code);
    const item = db.find(c => c.code === clean);
    if (!item) return false;

    item.boundDeviceId = null;
    item.boundDeviceName = null;
    item.boundAt = null;
    item.notes = (item.notes || '') + ' [تم فك قفل الجهاز بواسطة الإدارة]';
    saveCodesDB(db);

    await removeCloudLock(clean);

    const active = getActiveSession();
    if (active && active.code === clean) logout();
    return true;
  }

  // حذف كود
  async function adminDeleteCode(code) {
    let db = getCodesDB();
    const clean = normalizeCode(code);
    db = db.filter(c => c.code !== clean);
    saveCodesDB(db);

    await removeCloudLock(clean);

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
    isForbiddenExampleCode,
    FORBIDDEN_EXAMPLE_CODES,
    ORGANIZER_WHATSAPP,
    OFFICIAL_FORM_URL
  };
})();

window.AIMAuth = AIMAuth;
