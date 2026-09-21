// قاعدة بيانات أدوات الذكاء الاصطناعي الشاملة
// إعداد وتنسيق: المهندس أمير عادل (Amir Adel)

const aiCategories = [
  { id: "all", name: "جميع الأدوات", icon: "fa-solid fa-layer-group", count: 0 },
  { id: "chatbots", name: "المحادثة والمساعدين الأذكياء", icon: "fa-solid fa-brain", count: 0 },
  { id: "image", name: "توليد وتصميم الصور", icon: "fa-solid fa-palette", count: 0 },
  { id: "video", name: "صناعة وتوليد الفيديو", icon: "fa-solid fa-video", count: 0 },
  { id: "audio", name: "الصوت والموسيقى والدبلجة", icon: "fa-solid fa-microphone-lines", count: 0 },
  { id: "coding", name: "البرمجة وتطوير البرمجيات", icon: "fa-solid fa-code", count: 0 },
  { id: "productivity", name: "الإنتاجية والعروض والبحث", icon: "fa-solid fa-chart-pie", count: 0 },
  { id: "3d", name: "التصميم ثلاثي الأبعاد 3D", icon: "fa-solid fa-cube", count: 0 },
  { id: "automation", name: "الأتمتة وصناع المحتوى", icon: "fa-solid fa-bolt", count: 0 }
];

const aiTools = [
  // ================= 1. Chatbots & LLMs =================
  {
    id: "chatgpt",
    name: "ChatGPT",
    creator: "OpenAI",
    category: "chatbots",
    pricing: "Freemium",
    badge: "الأكثر شهرة عالمياً",
    rating: 4.9,
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    url: "https://chatgpt.com",
    tagline: "النموذج اللغوي الرائد عالمياً في التحاور وحل المشكلات",
    description: "أشهر روبوت محادثة ذكي في العالم من تطوير OpenAI، يعتمد على نماذج GPT-4o و GPT-4o-mini و o1 لمعالجة النصوص المعقدة، التحليل المنطقي، البرمجة، والترجمة الفائقة.",
    features: [
      "فهم عميق وتحليل سياقي فائق للنصوص والبيانات",
      "معالجة متقدمة للملفات والصور والرسوم البيانية والملفات الصوتية",
      "أحدث نماذج التفكير والاستدلال المتقدم (OpenAI o1 / o3)",
      "إنشاء GPTs مخصصة واستخدام متصفح الويب المدمج"
    ],
    bestFor: "الكتابة، البرمجة، حل المسائل المعقدة، التعلم، وأتمتة المهام اليومية."
  },
  {
    id: "claude",
    name: "Claude 3.5 Sonnet",
    creator: "Anthropic",
    category: "chatbots",
    pricing: "Freemium",
    badge: "الأقوى برمجياً وفكرياً",
    rating: 4.95,
    icon: "https://cdn.worldvectorlogo.com/logos/claude-ai-icon.svg",
    url: "https://claude.ai",
    tagline: "أذكى نموذج لغوي في البرمجة والتحليل الدقيق والنصوص الطبيعية",
    description: "مطور من شركة Anthropic، يعد أقوى نموذج ذكاء اصطناعي في جودة كتابة الأكواد، الفهم المنطقي للأبحاث الطويلة، وميزة Artifacts التفاعلية لتجربة الأكواد والتصاميم مباشرة.",
    features: [
      "تفوق ساحق في معايير هندسة البرمجيات وكتابة الأكواد النظيفة",
      "نافذة سياق ضخمة تستوعب كتباً ومستندات كاملة (200K Tokens)",
      "ميزة Artifacts التفاعلية لعرض وتعديل الواجهات والأكواد فوراً",
      "أسلوب كتابة إنساني طبيعي خالي من التكلف والجمود"
    ],
    bestFor: "المطورين، الباحثين الأكاديميين، كتابة المقالات الاحترافية، وتحليل العقود والمستندات الضخمة."
  },
  {
    id: "gemini",
    name: "Google Gemini",
    creator: "Google",
    category: "chatbots",
    pricing: "Freemium",
    badge: "الأقوى في الربط والبحث",
    rating: 4.85,
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    url: "https://gemini.google.com",
    tagline: "ذكاء اصطناعي متعدد الوسائط متكامل مع بيئة جوجل العملاقة",
    description: "نموذج جوجل المتطور (Gemini 1.5 Pro و Flash) صاحب أكبر نافذة سياق في العالم (تصل إلى 2 مليون رمز)، مع تكامل فوري مع خدمات Google (Drive, Docs, YouTube, Gmail).",
    features: [
      "نافذة سياق غير مسبوقة تصل إلى 2 مليون Token لتحليل ساعات من الفيديو والكتب",
      "ربط مباشر وسلس مع محرك بحث جوجل وخدمات Workspace",
      "معالجة متزامنة وسريعة للصوت والفيديو والصور والنصوص",
      "سرعة فائقة واستجابة لحظية في نموذج Gemini Flash"
    ],
    bestFor: "تحليل مقاطع الفيديو الطويلة، الربط مع حسابات جوجل، وتلخيص المقررات والكتب الضخمة."
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    creator: "Perplexity Inc.",
    category: "chatbots",
    pricing: "Freemium",
    badge: "محرك البحث الذكي الأول",
    rating: 4.9,
    icon: "https://seeklogo.com/images/P/perplexity-ai-logo-B3A9B2F2A9-seeklogo.com.png",
    url: "https://www.perplexity.ai",
    tagline: "بديل جوجل الأذكى للبحث التفاعلي مع توثيق المصادر المباشرة",
    description: "محرك إجابات ثوري يجمع بين قوة محركات البحث والنماذج اللغوية، يقدم إجابات موثقة بالمصادر والروابط الحية دون إعلانات مع إمكانية التبديل بين محركات مثل Claude و GPT-4o.",
    features: [
      "توثيق دقيق لكل فقرة بمصدرها الأصلي بروابط مباشرة قابلة للنقر",
      "البحث التخصصي المركز (Academic, YouTube, Reddit, Writing)",
      "ميزة Pro Search التي تطرح أسئلة توضيحية لتقديم أفضل نتيجة",
      "إمكانية استخدام نماذج Claude 3.5 و GPT-4o داخل واجهة البحث"
    ],
    bestFor: "الأبحاث العلمية، التحقق من الحقائق، الأخبار اللحظية، والبحث المقارن."
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    creator: "DeepSeek AI",
    category: "chatbots",
    pricing: "Free / Open Source",
    badge: "ثورة الذكاء المفتوح",
    rating: 4.88,
    icon: "https://chat.deepseek.com/favicon.svg",
    url: "https://chat.deepseek.com",
    tagline: "نموذج متقدم في التفكير المنطقي والرياضيات والبرمجة ومفتوح المصدر",
    description: "نموذج ذكاء اصطناعي متميز (DeepSeek-V3 و DeepSeek-R1) ينافس بقوة في التفكير المنطقي والرياضيات والمهام البرمجية المعقدة، ومتاح للاستخدام المباشر ومفتوح المصدر.",
    features: [
      "نموذج DeepSeek-R1 المتخصص في التفكير وحل المعضلات خطوة بخطوة",
      "كفاءة معمارية استثنائية (MoE) تقدم أداءً مذهلاً بتكلفة منخفضة للغاية",
      "قوة فائقة في حل المسائل الرياضية والبرمجية المعقدة",
      "متاح للاستخدام المجاني ومتاح للأوزان مفتوحة المصدر للمطورين"
    ],
    bestFor: "الرياضيات، المنطق المعقد، كتابة الأكواد المتقدمة، والاستخدام مفتوح المصدر."
  },
  {
    id: "copilot",
    name: "Microsoft Copilot",
    creator: "Microsoft",
    category: "chatbots",
    pricing: "Freemium",
    badge: "مدمج مع ويندوز وأوفيس",
    rating: 4.75,
    icon: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Microsoft_Copilot_icon.svg",
    url: "https://copilot.microsoft.com",
    tagline: "رفيقك اليومي للإنتاجية وتصميم الصور والبحث التفاعلي من مايكروسوفت",
    description: "مساعد مايكروسوفت الذكي المدعوم بتقنيات OpenAI و DALL-E 3، مدمج بعمق في نظام ويندوز وحزمة برامج Office مع محرك بحث Bing المباشر.",
    features: [
      "توليد صور فائق الجودة مجاناً عبر محرك Designer المدعوم بـ DALL-E 3",
      "تكامل مباشر مع نظام Windows وتطبيقات Word و Excel و PowerPoint",
      "قراءة وتلخيص صفحات الويب وملفات PDF من داخل متصفح Edge",
      "الوصول المجاني لأحدث نماذج GPT-4"
    ],
    bestFor: "مستخدمي بيئة مايكروسوفت، إنشاء عروض وتصاميم سريعة، والبحث اليومي."
  },

  // ================= 2. Image Generation & Design =================
  {
    id: "midjourney",
    name: "Midjourney",
    creator: "Midjourney Inc.",
    category: "image",
    pricing: "Paid",
    badge: "الأبرز في الفن الرقمي",
    rating: 4.98,
    icon: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png",
    url: "https://www.midjourney.com",
    tagline: "أداة متقدمة لتوليد الصور الفنية والواقعية بجودة وتفاصيل دقيقة",
    description: "الخيار الأبرز للفنانين والمصممين لتوليد صور فوتوغرافية وسينمائية وفنية متميزة بتفاصيل وإضاءة دقيقة.",
    features: [
      "واقعية فوتوغرافية وتفاصيل سينمائية خارقة في إصدار v6 وما بعده",
      "محرر صور متطور يشمل التكبير والتصغير وتعديل أجزاء محددة (Inpainting)",
      "واجهة ويب مخصصة للمصممين إلى جانب سيرفر ديسكورد",
      "تحكم كامل بنسب الأبعاد والإضاءة وزاوية الكاميرا والأسلوب الفني"
    ],
    bestFor: "المصممين، مخرجي الإعلانات، الفنانين الرقميين، وتوليد الصور فائقة الواقعية."
  },
  {
    id: "flux",
    name: "FLUX.1",
    creator: "Black Forest Labs",
    category: "image",
    pricing: "Freemium / Open",
    badge: "الثورة الأحدث في الصور",
    rating: 4.95,
    icon: "https://blackforestlabs.ai/favicon.ico",
    url: "https://blackforestlabs.ai",
    tagline: "أقوى نموذج مفتوح لتوليد الصور بواقعية مذهلة وكتابة نصوص دقيقة داخل الصور",
    description: "نموذج ابتكره الفريق الأصلي لمطوري Stable Diffusion، يتميز بدقة خارقة في رسم الأيدي والملامح البشرية وكتابة النصوص والعبارات الإنجليزية داخل الصورة بدقة مئة بالمئة.",
    features: [
      "كتابة نصوص واضحة ودقيقة جداً داخل الصورة دون أي تشويه",
      "توليد ملامح بشرية طبيعية للغاية وأيدي متقنة تماماً",
      "إصدارات متعددة (FLUX Schnell السريع، FLUX Dev، و FLUX Pro)",
      "سرعة مذهلة في التوليد وجودة ألوان واقعية"
    ],
    bestFor: "تصميم البوسترات، الشعارات، إعلانات المنتجات، والصور ذات التفاصيل البشرية الدقيقة."
  },
  {
    id: "leonardo",
    name: "Leonardo.ai",
    creator: "Canva / Leonardo",
    category: "image",
    pricing: "Freemium",
    badge: "الأشمل والأسهل للمصممين",
    rating: 4.88,
    icon: "https://leonardo.ai/favicon.ico",
    url: "https://leonardo.ai",
    tagline: "استوديو توليد وتعديل الصور الشامل مع رصيد مجاني يومي غني",
    description: "منصة متكاملة لتصميم وتوليد الصور وعناصر الألعاب واللوحات الفنية، تتيح تدريب نماذجك الخاصة وتعديل الصور في لوحة رسم تفاعلية (Canvas).",
    features: [
      "رصيد مجاني يتجدد يومياً لتجربة كل الميزات",
      "نماذج حصرية فائقة الجودة مثل Leonardo Phoenix و Kino XL",
      "لوحة قماشية ذكية لتعديل ومسح وإضافة عناصر للصورة (Canvas Editor)",
      "توليد رسوم متحركة قصيرة من الصور الثابتة بنقرة واحدة"
    ],
    bestFor: "صناع الألعاب، مصممي الجرافيك، أصحاب المتاجر الإلكترونية، والمبتدئين."
  },
  {
    id: "dalle3",
    name: "DALL-E 3",
    creator: "OpenAI",
    category: "image",
    pricing: "Freemium",
    badge: "الفهم الحرفي للبرومبت",
    rating: 4.8,
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    url: "https://chatgpt.com",
    tagline: "محرك OpenAI الذكي الذي يفهم الأوصاف الطويلة بدقة متناهية",
    description: "مدمج مباشرة في ChatGPT، يمتلك قدرة فريدة على تحويل الوصف التفصيلي الدقيق إلى صورة مطابقة للتعليمات دون الحاجة لاحتراف هندسة الأوامر (Prompt Engineering).",
    features: [
      "فهم حرفي وتطابق مذهل مع كل كلمة في الوصف المعقد",
      "إمكانية تعديل أجزاء من الصورة بالحديث المباشر مع شات جي بي تي",
      "مدمج ومتاح مجاناً عبر Microsoft Copilot و ChatGPT Plus",
      "أساليب فنية متنوعة من الكرتون ثلاثي الأبعاد إلى الصور الزيتية"
    ],
    bestFor: "الرسوم التوضيحية للكتب، المنشورات السريعة، وتجسيد الأفكار المجردة."
  },
  {
    id: "ideogram",
    name: "Ideogram 2.0",
    creator: "Ideogram",
    category: "image",
    pricing: "Freemium",
    badge: "أستاذ الخطوط والتايبوجرافي",
    rating: 4.9,
    icon: "https://ideogram.ai/favicon.ico",
    url: "https://ideogram.ai",
    tagline: "المنصة الرائدة في دمج النصوص والشعارات الفاخرة داخل الصور الفنية",
    description: "الخيار الأفضل على الإطلاق لإنشاء تصاميم تيشرتات، لوجوهات، ولافتات إعلانية تتضمن نصوصاً وخطوطاً تايبوجرافية مذهلة دون أي أخطاء إملائية.",
    features: [
      "دقة مطلقة في طباعة وتشكيل النصوص الإنجليزية بأشكال فنية مذهلة",
      "محرك ألوان دقيق وأساليب تصميم جرافيكي متطورة (Graphic Style)",
      "مجتمع إبداعي نشط وملايين التصاميم القابلة لإعادة الاستخدام",
      "خطة مجانية سخية يومياً لتوليد التصاميم"
    ],
    bestFor: "تصميم التيشرتات، أغلفة الكتب والموسيقى، اللوجوهات، وبوسترات السوشيال ميديا."
  },

  // ================= 3. AI Video Generation =================
  {
    id: "runway",
    name: "Runway Gen-3 Alpha",
    creator: "Runway ML",
    category: "video",
    pricing: "Freemium",
    badge: "الرائد في صناعة السينما",
    rating: 4.94,
    icon: "https://runwayml.com/favicon.ico",
    url: "https://runwayml.com",
    tagline: "أداة توليد الفيديو السينمائي الأولى للمخرجين وصناع المحتوى المحترفين",
    description: "طفرة في عالم تحويل النص والصور إلى مقاطع فيديو بدقة 4K مع تحكم كامل في حركة الكاميرا والسرعة وزوايا التصوير وحركات الشخصيات المعقدة.",
    features: [
      "واقعية حركية وفيزيائية سينمائية لا مثيل لها (Gen-3 Alpha)",
      "ميزة Motion Brush للتحكم الدقيق في تحريك أجزاء معينة فقط من الصورة",
      "تحكم متقدم بحركة الكاميرا (Pan, Tilt, Zoom, Orbit)",
      "أدوات مونتاج متكاملة بالذكاء الاصطناعي لحذف الخلفيات وتعديل الألوان"
    ],
    bestFor: "الإعلانات التجارية، المونتاج السينمائي، مقاطع الفيديو الموسيقية، وصناع المحتوى."
  },
  {
    id: "kling",
    name: "Kling AI",
    creator: "Kuaishou",
    category: "video",
    pricing: "Freemium",
    badge: "الأكثر واقعية وفيزيائية",
    rating: 4.92,
    icon: "https://klingai.com/favicon.ico",
    url: "https://klingai.com",
    tagline: "محرك لتوليد الفيديو بمقاطع وحركة سلسة وقوانين فيزيائية واقعية",
    description: "نموذج فيديو متطور يحاكي حركة الأجسام والبيئة الواقعية مثل السوائل وتعبيرات الوجه، مع إمكانية تحويل الصور الثابتة إلى مشاهد متحركة.",
    features: [
      "توليد فيديوهات طويلة بجودة 1080p وحركة فائقة النعومة",
      "محاكاة فيزيائية دقيقة جداً للأجسام والجاذبية وحركة الرياح والماء",
      "إمكانية تحويل الصور الثابتة إلى فيديوهات حركية مذهلة (Image-to-Video)",
      "رصيد يومي مجاني لتجربة وتوليد المقاطع"
    ],
    bestFor: "المشاهد الدرامية، الرسوم المتحركة، والفيديوهات الترويجية المؤثرة."
  },
  {
    id: "luma",
    name: "Luma Dream Machine",
    creator: "Luma AI",
    category: "video",
    pricing: "Freemium",
    badge: "سريع وسلس وسينمائي",
    rating: 4.88,
    icon: "https://lumalabs.ai/favicon.ico",
    url: "https://lumalabs.ai/dream-machine",
    tagline: "منصة توليد الفيديو السريع بجودة عالية وانتقالات كاميرا مذهلة",
    description: "نموذج فيديو قوي وسريع يحول الأفكار والصور إلى لقطات متحركة غنية بالحيوية، مع ميزة التوليد السلس للأكشن والكاميرا ثلاثية الأبعاد.",
    features: [
      "سرعة توليد عالية مقارنة بالنماذج المنافسة",
      "انتقالات كاميرا ثلاثية الأبعاد فائقة النعومة",
      "توليد مجاني متاح عبر الويب مباشرة",
      "دعم تحويل الصور إلى مقاطع فيديو باحترافية"
    ],
    bestFor: "صناع مقاطع تيك توك وريلز، مصممي المنتجات، والإنتاج السريع."
  },
  {
    id: "heygen",
    name: "HeyGen",
    creator: "HeyGen",
    category: "video",
    pricing: "Freemium",
    badge: "المتحدث الرقمي والدبلجة",
    rating: 4.93,
    icon: "https://www.heygen.com/favicon.ico",
    url: "https://www.heygen.com",
    tagline: "صناعة فيديوهات المتحدث الرقمي (Avatar) وترجمة الفيديوهات بمزامنة حركة الشفاه",
    description: "المنصة الأولى عالمياً لإنشاء مذيعين ومقدمي برامج رقميين ناطقين بأي لغة، مع أداة Video Translate الشهيرة لترجمة صوتك وفيديوهاتك مع مزامنة حركة الشفاه بدقة 100%.",
    features: [
      "مزامنة حركة الشفاه التلقائية مع الصوت بأي لغة (Lip-Sync)",
      "إنشاء توأم رقمي لك (Custom Avatar) يتحدث بصوتك الحقيقي",
      "ترجمة الفيديوهات إلى أكثر من 40 لغة مع الحفاظ على نبرة صوتك الأصلية",
      "مئات القوالب الجاهزة للتدريب والتسويق وشروحات المنتجات"
    ],
    bestFor: "صناع المحتوى متعدد اللغات، الدورات التدريبية، إعلانات الشركات، واليوتيوب."
  },
  {
    id: "sora",
    name: "OpenAI Sora",
    creator: "OpenAI",
    category: "video",
    pricing: "Paid / Pro",
    badge: "مستقبل السينما الافتراضية",
    rating: 4.96,
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    url: "https://sora.com",
    tagline: "نموذج OpenAI الثوري لفهم العالم المادي وتوليد مشاهد سينمائية كاملة",
    description: "محرك توليد الفيديو الذي أذهل العالم بقدرته على إنشاء مشاهد سينمائية معقدة بدقة فائقة مع إدراك عميق للبيئة المكانية وتعدد زوايا الكاميرا وتماسك الشخصيات.",
    features: [
      "تماسك بصري خيالي للشخصيات والبيئات عبر اللقطات المتعددة",
      "دقة 1080p وإخراج فوتوغرافي وسينمائي محكم",
      "إمكانية دمج مقاطع متعددة وتعديل الجدول الزمني",
      "محاكاة بصرية معقدة للعالم الحقيقي وحركة الكاميرا الحرة"
    ],
    bestFor: "استوديوهات الإنتاج الفني، الإعلانات الفاخرة، والمشاريع الإبداعية المتقدمة."
  },

  // ================= 4. Audio, Voice & Music =================
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    creator: "ElevenLabs",
    category: "audio",
    pricing: "Freemium",
    badge: "الصوت البشري الأكثر واقعية",
    rating: 4.97,
    icon: "https://elevenlabs.io/favicon.ico",
    url: "https://elevenlabs.io",
    tagline: "المنصة الأولى عالمياً في تحويل النص إلى كلام واستنساخ الأصوات البشرية",
    description: "تقنية صوتية مبهرة تنتج تعليقاً صوتياً بشرياً مليئاً بالمشاعر والضحك والهمس، مع إمكانية استنساخ أي صوت بشري في ثوانٍ بدقة متناهية ودعم كامل للعربية الفصحى واللهجات.",
    features: [
      "نبرات صوتية طبيعية ومشاعر واقعية تحاكي البشر تماماً",
      "استنساخ الصوت البشري (Voice Cloning) من مقطع مدته دقيقة واحدة",
      "دعم نطق ممتاز للغة العربية بمختلف المشاعر والنبرات",
      "توليد المؤثرات الصوتية (Sound Effects) من الأوصاف النصية"
    ],
    bestFor: "التعليق الصوتي (Voiceover)، الكتب المسموعة، البودكاست، والدبلجة السينمائية."
  },
  {
    id: "suno",
    name: "Suno AI",
    creator: "Suno",
    category: "audio",
    pricing: "Freemium",
    badge: "صناعة الأغاني والموسيقى الكاملة",
    rating: 4.95,
    icon: "https://suno.com/favicon.ico",
    url: "https://suno.com",
    tagline: "تأليف وإنتاج أغاني وموسيقى كاملة بالكلمات والألحان في ثوانٍ",
    description: "الأداة الأشهر لتوليد أغانٍ كاملة بكلماتك وألحانك وبأي نوع موسيقي (روك، راب، طرب، جاز، إلكترونيك) متضمنة الغناء البشري والموسيقى التصويرية المتناغمة.",
    features: [
      "تأليف أغانٍ كاملة من سطر وصف واحد فقط مع الغناء والموسيقى",
      "دعم إنتاج أغاني عربية ولهجات مختلفة بدقة مذهلة",
      "إنتاج موسيقى تصويرية بدون غناء (Instrumental)",
      "إمكانية تمديد المقاطع وتعديل الكلمات والفواصل اللحنية"
    ],
    bestFor: "صناع المحتوى، الموسيقيين، الإعلانات الإذاعية، والترفيه الشخصي."
  },
  {
    id: "udio",
    name: "Udio AI",
    creator: "Udio",
    category: "audio",
    pricing: "Freemium",
    badge: "الهندسة الصوتية عالية النقاء",
    rating: 4.9,
    icon: "https://www.udio.com/favicon.ico",
    url: "https://www.udio.com",
    tagline: "توليد موسيقى احترافية بنقاء استوديو وتوزيع موسيقي فائق الدقة",
    description: "منافس قوي أسسه خبراء سابقون في Google DeepMind، يقدم جودة صوتية عالية وتوزيعاً موسيقياً مبهراً للآلات والأصوات الغنائية.",
    features: [
      "وضوح ونقاء استوديو استثنائي في توزيع الترددات والموسيقى",
      "تحكم دقيق في بنية الأغنية (Intro, Verse, Chorus, Outro)",
      "إنتاج أصوات غنائية عالية التعبيرية والاحترافية",
      "دعم واسع لكافة الأنماط والأنواع الموسيقية العالمية"
    ],
    bestFor: "الملحنين، منتجي الموسيقى، والباحثين عن جودة تسجيل نقية."
  },
  {
    id: "descript",
    name: "Descript",
    creator: "Descript Inc.",
    category: "audio",
    pricing: "Freemium",
    badge: "تعديل الصوت مثل مستند Word",
    rating: 4.85,
    icon: "https://www.descript.com/favicon.ico",
    url: "https://www.descript.com",
    tagline: "محرر بودكاست وفيديو يتيح لك تعديل الصوت بحذف وتعديل الكلمات المكتوبة",
    description: "أداة ذكية تحول تسجيلك الصوتي إلى نص مكتوب، وبمجرد مسح كلمة من النص يتم مسحها من الصوت، مع ميزة عزل الضوضاء Studio Sound بضغطة زر واحدة.",
    features: [
      "ميزة Studio Sound لتحويل الصوت العادي إلى صوت استوديو احترافي",
      "حذف الكلمات الزائدة والتردد (Filler words like um, ah) تلقائياً",
      "تعديل الصوت عبر مسح وتعديل النص المكتوب مباشرة",
      "إنشاء نسخة رقمية من صوتك لتعديل الأخطاء دون إعادة التسجيل"
    ],
    bestFor: "صناع البودكاست، محرري اليوتيوب، والمعلمين."
  },

  // ================= 5. Coding & Development =================
  {
    id: "cursor",
    name: "Cursor AI",
    creator: "Anysphere",
    category: "coding",
    pricing: "Freemium",
    badge: "محرر الأكواد الأذكى في العالم",
    rating: 4.99,
    icon: "https://www.cursor.com/favicon.ico",
    url: "https://www.cursor.com",
    tagline: "محرر أكواد مبني على VS Code يعيد تعريف سرعة وإنتاجية المبرمجين",
    description: "المحرر الذي غير قواعد اللعبة البرمجية، يفهم مشروعك البرمجي بالكامل (Codebase)، يكتب دوال كاملة، يصلح الأخطاء، ويتوقع الكود القادم بدقة خارقة عبر نماذج Claude 3.5 و GPT-4o.",
    features: [
      "فهم شامل لمستودع الكود بالكامل عبر الفهرسة الذكية (@codebase)",
      "خاصية Composer لبناء ميزات كاملة عبر ملفات متعددة دفعة واحدة",
      "إكمال تلقائي ذكي جداً للأكواد يسبق تفكيرك بخطوة (Copilot++ / Tab)",
      "توافق بنسبة 100% مع جميع إضافات وثيمات VS Code"
    ],
    bestFor: "مهندسي البرمجيات، مطوري الويب، وفرق التقنية السريعة."
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    creator: "GitHub / Microsoft",
    category: "coding",
    pricing: "Paid",
    badge: "الرفيق البرمجي الأساسي",
    rating: 4.85,
    icon: "https://github.githubassets.com/favicons/favicon.svg",
    url: "https://github.com/features/copilot",
    tagline: "مساعد الذكاء الاصطناعي الأشهر المدمج مباشرة في بيئات التطوير",
    description: "أداة مايكروسوفت وجيتهب الأولى للمبرمجين، تقدم اقتراحات برمجية لحظية أثناء الكتابة، مع إمكانية التحاور وحل المشاكل وشرح الأكواد المعقدة.",
    features: [
      "تكامل فوري مع VS Code و JetBrains و Visual Studio و Neovim",
      "اقتراحات برمجية فورية وسلسة تزيد من سرعة الإنجاز بنسبة 55%",
      "ميزة Copilot Chat لحل المشاكل وكتابة الاختبارات وشرح الأكواد",
      "أمان عالي ومطابقة لمعايير الشركات الكبرى"
    ],
    bestFor: "الشركات البرمجية، المطورين المحترفين، والطلاب."
  },
  {
    id: "v0",
    name: "v0 by Vercel",
    creator: "Vercel",
    category: "coding",
    pricing: "Freemium",
    badge: "بناء واجهات الويب في ثوانٍ",
    rating: 4.94,
    icon: "https://v0.dev/favicon.ico",
    url: "https://v0.dev",
    tagline: "تحويل الأفكار والوصف النصي إلى واجهات React و Tailwind عصرية فوراً",
    description: "أداة Vercel الساحرة، تكتب لها ما تريد من واجهات (داشبورد، متجر، تطبيق، لاندينج بيج) فتقوم ببرمجتها فوراً باستخدام React و Next.js و Tailwind CSS مع كود نظيف وجاهز للنسخ.",
    features: [
      "توليد واجهات مستخدم احترافية بالكامل متجاوبة مع كل الشاشات",
      "كود نظيف تماماً مبني على مكونات shadcn/ui و Tailwind CSS",
      "معاينة تفاعلية فورية للواجهة داخل المتصفح",
      "إمكانية تعديل أجزاء الواجهة بالنقر المباشر أو التحدث مع الذكاء الاصطناعي"
    ],
    bestFor: "مصممي واجهات UI/UX، مطوري الواجهات الأمامية Frontend، ورواد الأعمال."
  },
  {
    id: "bolt",
    name: "Bolt.new",
    creator: "StackBlitz",
    category: "coding",
    pricing: "Freemium",
    badge: "بناء تطبيقات كاملة Full-Stack",
    rating: 4.93,
    icon: "https://bolt.new/favicon.ico",
    url: "https://bolt.new",
    tagline: "أداة تطوير وتجربة ونشر تطبيقات الويب الكاملة مباشرة في متصفحك",
    description: "منصة ذكية تسمح لك ببناء وتثبيت حزم npm وتشغيل تطبيقات Full-Stack كاملة داخل المتصفح بفضل تقنية WebContainers مع نشر فوري بنقرة واحدة.",
    features: [
      "بيئة تشغيل كاملة (Node.js) داخل متصفح الويب دون الحاجة لتثبيت برامج",
      "تثبيت الحزم وإنشاء قواعد البيانات وتشغيل السيرفرات تلقائياً",
      "تصحيح الأخطاء ذاتياً فور ظهورها أثناء التشغيل",
      "نشر فوري للتطبيق على Netlify بنقرة واحدة"
    ],
    bestFor: "بناء النماذج الأولية السريعة (MVPs)، التطبيقات السحابية، والهاكاثونات."
  },

  // ================= 6. Productivity & Research =================
  {
    id: "notion-ai",
    name: "Notion AI",
    creator: "Notion",
    category: "productivity",
    pricing: "Freemium",
    badge: "العقل الثاني للإنتاجية",
    rating: 4.88,
    icon: "https://www.notion.so/front-static/favicon.ico",
    url: "https://www.notion.so/product/ai",
    tagline: "مساعد الذكاء الاصطناعي المدمج في نظام إدارة المهام والملاحظات الأول عالمياً",
    description: "يجعل مساحة عملك في Notion ذكية، حيث يستطيع البحث في كل صفحاتك، تلخيص الاجتماعات، صياغة المقالات، واستخراج بنود المهام بنقرة واحدة.",
    features: [
      "البحث التلقائي والإجابة عن أي سؤال من داخل كافة صفحاتك ومستنداتك",
      "تلخيص صفحات الملاحظات واستخراج قرارات الاجتماعات تلقائياً",
      "تحسين أسلوب الكتابة والترجمة المباشرة داخل الصفحات",
      "توليد جداول وقواعد بيانات منظمة تلقائياً"
    ],
    bestFor: "إدارة المشاريع، رواد الأعمال، كتاب المحتوى، وتنظيم الحياة اليومية."
  },
  {
    id: "gamma",
    name: "Gamma App",
    creator: "Gamma Tech",
    category: "productivity",
    pricing: "Freemium",
    badge: "العروض التقديمية الفاخرة",
    rating: 4.95,
    icon: "https://gamma.app/favicon.ico",
    url: "https://gamma.app",
    tagline: "توليد عروض تقديمية (Presentations) وصفحات ويب تفاعلية في دقيقة",
    description: "بديل PowerPoint الأحدث والأكثر فخامة، تعطيه فكرة الموضوع أو ملف PDF فيقوم بتصميم عرض تقديمي متكامل الشرائح مع نصوص متقنة وصور ورسوم بيانية مبهرة.",
    features: [
      "تصميم عروض تقديمية متكاملة بضغطة زر وتنسيق خيالي",
      "دعم ممتاز للغة العربية وتنسيق اتجاه النصوص من اليمين لليسار",
      "توليد مواقع ويب تفاعلية ومستندات جذابة لنفس الفكرة",
      "تعديل محتوى الشرائح بسهولة عبر محادثة الذكاء الاصطناعي"
    ],
    bestFor: "الطلاب، المحاضرين، أصحاب الشركات، ومقدمي عروض الاستثمار Pitch Decks."
  },
  {
    id: "consensus",
    name: "Consensus",
    creator: "Consensus",
    category: "productivity",
    pricing: "Freemium",
    badge: "البحث العلمي الموثق بالأوراق",
    rating: 4.9,
    icon: "https://consensus.app/favicon.ico",
    url: "https://consensus.app",
    tagline: "محرك بحث أكاديمي يستخرج الإجابات المباشرة من 200 مليون ورقة بحثية محكمة",
    description: "الأداة الأهم للباحثين والطلاب، تسأله أي سؤال علمي فيجيبك بملخص إجماع المجتمع العلمي مع نسب التأييد والمعارضة وروابط الدراسات الموثقة.",
    features: [
      "مقياس إجماع المجتمع العلمي (Consensus Meter) لكل مسألة علمية",
      "البحث في أكثر من 200 مليون ورقة بحثية معتمدة ومحكمة",
      "استخراج ملخصات دقيقة وخالية تماماً من الهلوسة",
      "توثيق أكاديمي وتصدير مباشر للاقتباسات بصيغ APA و Harvard"
    ],
    bestFor: "الباحثين الأكاديميين، طلاب الماجستير والدكتوراه، والأطباء والعلماء."
  },

  // ================= 7. 3D & Architecture =================
  {
    id: "meshy",
    name: "Meshy AI",
    creator: "Meshy",
    category: "3d",
    pricing: "Freemium",
    badge: "توليد المجسمات 3D",
    rating: 4.87,
    icon: "https://www.meshy.ai/favicon.ico",
    url: "https://www.meshy.ai",
    tagline: "تحويل الأوصاف النصية والصور الثابتة إلى مجسمات ثلاثية الأبعاد كاملة",
    description: "أداة ثورية لمصممي الثري دي، تحول النص أو الصور إلى مجسمات 3D جاهزة مع خامات وإكساء (Textures) مع إمكانية تصديرها لصيغ FBX و OBJ و GLB.",
    features: [
      "تحويل النصوص والصور إلى مجسمات 3D جاهزة في دقائق",
      "توليد الخامات والخرائط السطحية (PBR Textures) بجودة فائقة",
      "تصدير سهل ومتوافق مع Blender و Unreal Engine و Unity",
      "رصيد مجاني شهري لتجربة النماذج"
    ],
    bestFor: "مطوري الألعاب، مصممي المنتجات، والطباعة ثلاثية الأبعاد 3D Printing."
  },
  {
    id: "spline",
    name: "Spline AI",
    creator: "Spline",
    category: "3d",
    pricing: "Freemium",
    badge: "تصميم 3D تفاعلي للويب",
    rating: 4.91,
    icon: "https://spline.design/favicon.ico",
    url: "https://spline.design/ai",
    tagline: "تصميم مجسمات وعوالم ثلاثية الأبعاد تفاعلية للويب عبر الأوامر النصية",
    description: "بيئة تصميم 3D ثورية مدمجة مع الذكاء الاصطناعي، تتيح إنشاء مجسمات ثلاثية الأبعاد وتطبيق حركات وتفاعلات فيزيائية عليها وتصديرها ككود ويب تفاعلي.",
    features: [
      "توليد وتحرير المشاهد ثلاثية الأبعاد بالأوامر النصية المباشرة",
      "إضافة تفاعلات مع حركة الماوس واللمس للويب بكل سهولة",
      "تصدير الكود البرمجي لـ React و WebGL بنقرة واحدة",
      "مكتبة ضخمة من المجسمات والمواد التفاعلية الجاهزة"
    ],
    bestFor: "مصممي واجهات المواقع الحديثة، المطورين المبدعين، ورسامي الرسوم التفاعلية."
  },

  // ================= 8. Automation & Content =================
  {
    id: "make",
    name: "Make.com",
    creator: "Make",
    category: "automation",
    pricing: "Freemium",
    badge: "عملاق الأتمتة البصرية",
    rating: 4.96,
    icon: "https://www.make.com/favicon.ico",
    url: "https://www.make.com",
    tagline: "ربط وأتمتة مئات التطبيقات ونماذج الذكاء الاصطناعي بدون كتابة كود",
    description: "المنصة البصرية الأقوى في العالم لربط وتكامل التطبيقات، تمكنك من بناء سيناريوهات عمل مؤتمتة تجمع بين OpenAI و Google Sheets و WhatsApp و CRM لتنفيذ المهام تلقائياً.",
    features: [
      "واجهة بصرية تفاعلية لتصميم تدفقات العمل المتقدمة وسيناريوهات الأتمتة",
      "تكامل مباشر مع OpenAI و Anthropic ونماذج الـ AI لمعالجة البيانات تلقائياً",
      "ربط آلاف التطبيقات الشهيرة (Slack, Gmail, Airtable, Shopify)",
      "خطة مجانية سخية تشمل 1000 عملية شهرياً"
    ],
    bestFor: "الشركات، أتمتة خدمة العملاء، إدارة المبيعات، وصناع المحتوى الرقمي."
  },
  {
    id: "chatbase",
    name: "Chatbase",
    creator: "Chatbase",
    category: "automation",
    pricing: "Freemium",
    badge: "بناء شات بوت مخصص لبياناتك",
    rating: 4.89,
    icon: "https://www.chatbase.co/favicon.ico",
    url: "https://www.chatbase.co",
    tagline: "إنشاء شات بوت ذكي مخصص مدرب على بيانات موقعك ومستنداتك في دقيقتين",
    description: "ارفع ملفات شركتك أو ضع رابط موقعك، وسيقوم Chatbase بإنشاء شات بوت ذكي جداً جاهز للإجابة على كل استفسارات عملائك ودمجه في موقعك كأيقونة محادثة حية.",
    features: [
      "تدريب فوري وسريع على ملفات PDF والمستندات وروابط المواقع",
      "إمكانية تضمين الشات بوت بسهولة في أي موقع عبر كود بسيط (Widget)",
      "التحكم الكامل في شخصية ولغة وأسلوب ردود البوت",
      "تحليلات تفصيلية لكل محادثات العملاء والأسئلة الشائعة"
    ],
    bestFor: "المتاجر الإلكترونية، مواقع الشركات، الدعم الفني، وخدمة العملاء الآلية."
  }
];
