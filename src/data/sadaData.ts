import type { CharacterId } from './storyManifest';

export interface Character {
  id: CharacterId;
  name: string;
  roleTitle: string;
  accentColor: string;
  bgGradient: string;
  badge: string;
  image: string;
  altImage?: string;
  description: string;
  strengths: string[];
  motto: string;
}

export interface LingSound {
  symbol: string;
  arabicName: string;
  frequencyRange: string;
  category: 'low' | 'mid' | 'high';
  description: string;
  clinicalNote: string;
  color: string;
}

export interface AuditorySkill {
  id: number;
  slug: string;
  title: string;
  englishTitle: string;
  objective: string;
  examples: string[];
  scoringRule: string;
  color: string;
  iconName: string;
  gameTitle: string;
  gameDescription: string;
  screenImage: string;
  guideCharacterId: CharacterId;
  environmentTag: string;
  interactiveDemoType: 'detection' | 'discrimination' | 'association' | 'comprehension' | 'closure' | 'noise';
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  contribution: string;
  color: string;
}

export const CHARACTERS: Character[] = [
  {
    id: 'maryam',
    name: 'شيرين',
    roleTitle: 'المرشدة الهادئة والمستكشفة المنظمة',
    accentColor: '#7357D9',
    bgGradient: 'from-[#7357D9]/20 via-[#E9E2FF]/40 to-transparent',
    badge: 'دقة الملاحظة والتنظيم',
    image: '/assets/char_maryam.webp',
    description: 'تحب شيرين قراءة الكتب وتدوين ملاحظات الأصوات بدقة متناهية، وتقود الأطفال للتعرف على أصوات لينج بأسلوب هادئ ومنهجي.',
    strengths: ['الانتباه الهادئ', 'تدوين الاستجابات', 'التركيز المنظم'],
    motto: '«كل همسة وكل صوت.. وراءه باب جديد للمعرفة»'
  },
  {
    id: 'zain',
    name: 'زين',
    roleTitle: 'المستكشف الفضولي والمبتكر الصغير',
    accentColor: '#159D98',
    bgGradient: 'from-[#159D98]/20 via-[#55D6BE]/30 to-transparent',
    badge: 'بطل التمييز والمنطق',
    image: '/assets/char_zain.webp',
    description: 'يحمل زين قطعة الأحجية الذهبية المضيئة دائماً! شغفه تفكيك الأصوات المركبة ومعرفة الفرق بين النغمات الطويلة والقصيرة.',
    strengths: ['حل الألغاز السمعية', 'التمييز بين الأصوات', 'طرح الأسئلة'],
    motto: '«الصوت مثل قطعة البازل.. لما نركبه تكتمل الصورة!»'
  },
  {
    id: 'omar',
    name: 'فهد',
    roleTitle: 'المُرحِّب النشيط وبطل الانتباه السمعي',
    accentColor: '#FF886F',
    bgGradient: 'from-[#FF886F]/20 via-[#FFE5D9]/40 to-transparent',
    badge: 'سرعة الالتقاط والانتباه',
    image: '/assets/char_omar.webp',
    altImage: '/assets/char_omar_alt.webp',
    description: 'مستعد دائماً بحقيبته الممتلئة بنماذج التقييم السمعي وابتسامته الواثقة؛ يلتقط أول نغمة صوت في البيئة المحيطة ويساعد جنى في شرح الأنشطة.',
    strengths: ['إدراك وجود الصوت', 'التفاعل السريع', 'الشجاعة والمبادرة'],
    motto: '«أسمع، أنتبه، وأرفع إبهامي بكل ثقة!»'
  },
  {
    id: 'nour',
    name: 'رحمة',
    roleTitle: 'الصديقة اللطيفة والداعمة المتفائلة',
    accentColor: '#8F75EC',
    bgGradient: 'from-[#8F75EC]/20 via-[#F4EFFF]/40 to-transparent',
    badge: 'الفهم السمعي والدفء الأسري',
    image: '/assets/char_nour.webp',
    description: 'بزهور سترتها البنفسجية وطوقها المبهج، تصغي رحمة لحكايات الأطفال وتربط بين ما يسمعونه من جمل ومعانٍ في جو أسري هادئ.',
    strengths: ['فهم التعليمات اللفظية', 'ربط الجمل بالمعنى', 'الدعم الأسري'],
    motto: '«بالإصغاء نفهم الكلمات.. ونبني أحلى الصداقات»'
  },
  {
    id: 'jana',
    name: 'جنى',
    roleTitle: 'البطلة الرئيسية والراوية في عالم صدى',
    accentColor: '#FFC552',
    bgGradient: 'from-[#FFC552]/20 via-[#FFF8ED]/60 to-transparent',
    badge: 'الراوية الرئيسية وبطلة صدى',
    image: '/assets/char_jana.webp',
    description: 'جنى هي بطلة الحكاية ودليل الزوار في صدى؛ بأسلوبها المصري الودود والمرح ترافق الأطفال خطوة بخطوة وتحتفي بكل إنجاز.',
    strengths: ['قيادة الحكاية', 'تبسيط الأفكار', 'التشجيع والمكافآت'],
    motto: '«لكل طفل طريقته.. ومع صدى كل خطوة ليها قيمة!»'
  }
];

export const LING_SOUNDS: LingSound[] = [
  {
    symbol: '/m/',
    arabicName: 'صوت الميم (/m/)',
    frequencyRange: 'نطاق منخفض (~250 هرتز)',
    category: 'low',
    description: 'صوت أنفي منخفض التردد يعبّر عن قدرة الطفل على التقاط الترددات الأساسية المنخفضة للكلام.',
    clinicalNote: 'يساعد في متابعة التقاط القناة الصوتية المنخفضة لدى الأطفال الصم وضعاف السمع عبر السماعة الطبية.',
    color: '#7357D9'
  },
  {
    symbol: '/u/',
    arabicName: 'صوت الضمة الممتدة (/u/)',
    frequencyRange: 'نطاق منخفض إلى متوسط (~250 - 500 هرتز)',
    category: 'low',
    description: 'صائت خلفي مستدير يركز على أول قمة رنينية للكلام ويعكس وضوح الاستجابة للأصوات العميقة.',
    clinicalNote: 'يساعد الأخصائي على متابعة الاستجابة للأصوات الرنانة قبل الانتقال للأصوات الأعلى تردداً.',
    color: '#159D98'
  },
  {
    symbol: '/a/',
    arabicName: 'صوت الفتحة الممتدة (/a/)',
    frequencyRange: 'نطاق متوسط (~1000 هرتز)',
    category: 'mid',
    description: 'صائت مفتوح يقع في قلب المنطقة الترددية الحيوية للغة والكلام البشري.',
    clinicalNote: 'يُعد مرجعاً واضحاً لمتابعة استجابة الطفل في النطاق المتوسط للحديث اليومي.',
    color: '#D99200'
  },
  {
    symbol: '/i/',
    arabicName: 'صوت الكسرة الممتدة (/i/)',
    frequencyRange: 'مزدوج التردد (270 و 2300 هرتز)',
    category: 'high',
    description: 'صائت أمامي يتميز بقمة أولى منخفضة وقمة ثانية عالية التردد تعكس دقة الفصل الترددي.',
    clinicalNote: 'يوضح قدرة المعالج الصوتي على نقل النطاقين المنخفض والمرتفع معاً بوضوح.',
    color: '#4D96FF'
  },
  {
    symbol: '/ʃ/',
    arabicName: 'صوت الشين (/ʃ/)',
    frequencyRange: 'نطاق متوسط-مرتفع (~2000 - 3500 هرتز)',
    category: 'high',
    description: 'صوت احتكاكي يتطلب تمييز تيار الهواء والترددات فوق المتوسطة.',
    clinicalNote: 'مهم لمتابعة وضوح مخارج الأصوات الاحتكاكية في الكلام اليومي.',
    color: '#FF886F'
  },
  {
    symbol: '/s/',
    arabicName: 'صوت السين (/s/)',
    frequencyRange: 'نطاق فائق الارتفاع (~4000 - 8000 هرتز)',
    category: 'high',
    description: 'الصوت الأعلى تردداً في تقييم لينج، ويمثل متابعة الترددات العالية جداً.',
    clinicalNote: 'التقاط صوت /s/ مؤشر وظيفي مهم على تغطية الطيف الترددي المرتفع للكلام.',
    color: '#E86B52'
  }
];

export const AUDITORY_SKILLS: AuditorySkill[] = [
  {
    id: 1,
    slug: 'sound-detection',
    title: 'الوعي بوجود الصوت (الكشف السمعي)',
    englishTitle: 'Auditory Detection',
    objective: 'تقييم قدرة الطفل على رصد وجود المثير السمعي والاستجابة عند صدور الصوت مقارنة بفترات الصمت.',
    examples: [
      'الاستجابة الإيجابية عند تقديم صوت واضح.',
      'التمييز السلوكي بين وجود الصوت وحالة الصمت.',
      'التقاط نغمة صوتية مفاجئة وسط بيئة هادئة.'
    ],
    scoringRule: 'تُسجل المحاولة صحيحة عند الاستجابة في النافذة الزمنية المحددة لصدور الصوت دون استجابات عشوائية في الصمت.',
    color: '#FF886F',
    iconName: 'Bell',
    gameTitle: 'رنين الأجراس التفاعلي',
    gameDescription: 'اضغط فور سماع الرنين لتسجيل استجابة فورية ودقيقة!',
    screenImage: '/assets/screens/screen_detection.png',
    guideCharacterId: 'omar',
    environmentTag: 'محطة الكشف والرنين',
    interactiveDemoType: 'detection'
  },
  {
    id: 2,
    slug: 'auditory-attention',
    title: 'الانتباه السمعي',
    englishTitle: 'Auditory Attention',
    objective: 'تقييم قدرة الطفل على توجيه انتباهه للمثير السمعي، والمحافظة على التركيز، ومتابعة النمط الصوتي دون تشتت.',
    examples: [
      'متابعة نغمة صوتية مستمرة وتحديد لحظة توقفها.',
      'توجيه الانتباه لصوت مستهدف متكرر.',
      'المحافظة على التركيز السمعي خلال المهام التقييمية القصيرة.'
    ],
    scoringRule: 'تُحدد استجابة الطفل بمدى تركيزه ومتابعته للمثير الصوتي وتوثيق أي تشتت أو شرود.',
    color: '#8F75EC',
    iconName: 'Sparkles',
    gameTitle: 'متابعة النغم المتصل',
    gameDescription: 'تابع النغمة السمعية واضغط حين تتوقف النغمة تماماً!',
    screenImage: '/assets/screens/screen_comprehension.png',
    guideCharacterId: 'nour',
    environmentTag: 'واحة التركيز والانتباه',
    interactiveDemoType: 'comprehension'
  },
  {
    id: 3,
    slug: 'auditory-discrimination',
    title: 'التمييز السمعي',
    englishTitle: 'Auditory Discrimination',
    objective: 'تقييم قدرة الطفل على إدراك التشابه والاختلاف بين صوتين أو كلمتين من حيث الحدة، المدة، الشدة، أو مخارج الأصوات.',
    examples: [
      'مقارنة صوتين: هل هما متشابهان أم مختلفان؟',
      'التمييز بين مدة صوت قصير وصوت طويل.',
      'التمييز بين نغمتين حادة وغليظة.'
    ],
    scoringRule: 'كل مهمة لها إجابة محددة مسبقاً؛ تقارن استجابة الطفل بها لتسجيل صحيح أو غير صحيح دون تخمين.',
    color: '#159D98',
    iconName: 'Sliders',
    gameTitle: 'مختبر النغمات المتشابهة',
    gameDescription: 'استمع إلى الصوتين وقرر: هل هما متشابهان أم مختلفان؟',
    screenImage: '/assets/screens/screen_discrimination.png',
    guideCharacterId: 'zain',
    environmentTag: 'مختبر البازل والنغمات',
    interactiveDemoType: 'discrimination'
  },
  {
    id: 4,
    slug: 'auditory-identification',
    title: 'التعرف السمعي والربط',
    englishTitle: 'Auditory Identification & Association',
    objective: 'تقييم قدرة الطفل على التعرف على مصدر الصوت أو الكلمة المسموعة واختيار الصورة أو الرمز المطابق من قائمة مغلقة.',
    examples: [
      'سماع صوت بيئي وتحديد صورته المطابقة.',
      'اختيار صورة مرتبطة بكلمة مسموعة من بين خيارات.',
      'ربط المثير السمعي بمدلوله المعرفي المناسب.'
    ],
    scoringRule: 'كل اختيار يطابق الرمز المعتمد للمهمة يُسجّل صحيحاً في سجل التقييم، وإلا يُسجّل غير صحيح.',
    color: '#7357D9',
    iconName: 'Image',
    gameTitle: 'حديقة الأصوات والصور',
    gameDescription: 'ما مصدر الصوت الذي سمعته؟ اختر الصورة المطابقة!',
    screenImage: '/assets/screens/screen_identification.png',
    guideCharacterId: 'maryam',
    environmentTag: 'معرض الأصوات المصورة',
    interactiveDemoType: 'association'
  },
  {
    id: 5,
    slug: 'auditory-comprehension',
    title: 'الفهم السمعي',
    englishTitle: 'Auditory Comprehension',
    objective: 'تقييم قدرة الطفل على معالجة الكلام وفهم التعليمات والمعلومات المسموعة والاستجابة لها لغوياً أو حركياً.',
    examples: [
      'تنفيذ تعليمة مسموعة من خطوة واحدة أو خطوتين (مثال: «اختر الكرة الحمراء»).',
      'الإجابة عن سؤال استيعابي بعد سماع جملة أو موقف قصير.',
      'فهم توجيه لفظي والتفاعل معه دون إشارات بصرية مساعدة.'
    ],
    scoringRule: 'تُحدد الاستجابة الصحيحة قبل عرض النشاط، ثم تُسجل محاولات الطفل ومدى استقلاليته في سجل التقييم.',
    color: '#FFC552',
    iconName: 'BookOpen',
    gameTitle: 'مهمة الأوامر والكرات',
    gameDescription: 'استمع للتعليمة المسموعة واختر العنصر المطلوب بدقة!',
    screenImage: '/assets/screens/screen_closure.png',
    guideCharacterId: 'jana',
    environmentTag: 'مسرح الحكايات والأوامر',
    interactiveDemoType: 'closure'
  },
  {
    id: 6,
    slug: 'listening-in-noise',
    title: 'الاستماع في وجود ضوضاء (وحدة استكشافية تطبيقية)',
    englishTitle: 'Listening in Noise (Applied Module)',
    objective: 'تقييم تطبيقي إضافي تحت إشراف الأخصائي لرصد قدرة الطفل على التقاط الصوت المستهدف في وجود صوت خلفي مضبوط وآمن.',
    examples: [
      'التعرف على كلمة مع وجود صوت خلفي بسيط.',
      'اختيار صورة مرتبطة بكلمة سُمعت في وجود صوت منافس.',
      'ملاحظة ثبات الاستجابة في ظروف سمعية واقعية مع مراعاة أمان الشدة.'
    ],
    scoringRule: 'وحدة استكشافية إضافية وليست مجالاً تقييمياً مستقلاً؛ توثق ظروف الجلسة للمقارنة دون فرض درجات معيارية.',
    color: '#32B8B3',
    iconName: 'Volume2',
    gameTitle: 'التقاط الكلمة وسط الخلفية',
    gameDescription: 'استمع للكلمة المطلوبة مع صوت خلفي مضبوط وآمن واختر الصورة المطابقة!',
    screenImage: '/assets/screens/screen_noise.png',
    guideCharacterId: 'zain',
    environmentTag: 'بيئة سمعية مركبة آمنة',
    interactiveDemoType: 'noise'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'جني محمود عزت رضوان',
    role: 'تقييم الاستجابة لأصوات لينج الستة',
    contribution: 'إعداد المحتوى العلمي لتقييم الاستجابة لأصوات لينج الستة وتحليل تغطية الترددات.',
    color: '#7357D9'
  },
  {
    id: 2,
    name: 'فهد جلال صلاح',
    role: 'دليل استخدام ولي الأمر',
    contribution: 'صياغة إرشادات المتابعة المنزلية الواعية وتهيئة البيئة السمعية الهادئة للطفل.',
    color: '#159D98'
  },
  {
    id: 3,
    name: 'شيرين وليد',
    role: 'دليل استخدام الأخصائي',
    contribution: 'إعداد معايير المتابعة المهنية المنظمة ومراجعة تقارير المهارات المستقلة عبر الزمن.',
    color: '#FF886F'
  },
  {
    id: 4,
    name: 'رحمة شعبان',
    role: 'تقييم إدراك وجود الصوت والانتباه له',
    contribution: 'تصميم مهام قياس الانتباه السمعي الأولي والتمييز بين وجود الصوت والصمت.',
    color: '#D99200'
  },
  {
    id: 5,
    name: 'جيهان محمد فاروق',
    role: 'تقييم التمييز السمعي',
    contribution: 'بناء مهام التشابه والاختلاف النغمي ومدد الأصوات والكلمات المتقاربة.',
    color: '#8F75EC'
  },
  {
    id: 6,
    name: 'همس عبد الله عبد السميع',
    role: 'تقييم التعرف السمعي والربط السمعي',
    contribution: 'إعداد منظومة ربط المثير السمعي بمصدره البيئي والصور المعبرة عنه.',
    color: '#32B8B3'
  },
  {
    id: 7,
    name: 'سلمى احمد رضوان',
    role: 'تقييم الفهم السمعي',
    contribution: 'تصميم أنشطة الاستجابة للتعليمات وفهم الجمل والقصص المصغرة.',
    color: '#4D96FF'
  },
  {
    id: 8,
    name: 'لمياء محمد ابراهيم',
    role: 'تقييم الإغلاق السمعي',
    contribution: 'تطوير مهام استكمال الكلمات والعبارات المفقودة اعتماداً على السياق اللغوي.',
    color: '#E86B52'
  },
  {
    id: 9,
    name: 'ياسمين ايمن محمد',
    role: 'تقييم الاستماع في وجود ضوضاء',
    contribution: 'تحديد اشتراطات السلامة السمعية ومعايير التقييم التطبيقي في بيئة سمعية مركبة.',
    color: '#159D98'
  },
  {
    id: 10,
    name: 'ماجده نبوي حفني',
    role: 'الألعاب التعزيزية للطفل',
    contribution: 'تصميم نظام المكافآت البصرية والشارات والنجوم التحفيزية لرفع دافعية الطفل.',
    color: '#FF886F'
  }
];

export const PROJECT_GOALS = [
  {
    number: '01',
    title: 'متابعة الاستجابة لأصوات لينج الستة',
    description: 'متابعة وظيفية منتظمة لالتقاط الطفل لأصوات الكلام الأساسية عبر الترددات المختلفة.',
    color: '#7357D9'
  },
  {
    number: '02',
    title: 'تسجيل النتائج وتحليلها بشكل منظم',
    description: 'توثيق دقيق لكل محاولة وجلسة مع إمكانية مراجعة نسب الاستجابة والأداء بوضوح.',
    color: '#159D98'
  },
  {
    number: '03',
    title: 'تقييم المهارات السمعية الخمس الأساسية',
    description: 'تقييم نوعي مستقل لكل مهارة من الكشف والانتباه إلى الفهم السمعي دون اشتراط ترتيب موحد.',
    color: '#FF886F'
  },
  {
    number: '04',
    title: 'مقارنة الأداء بين الجلسات عبر الزمن',
    description: 'ربط الجلسات بجدول زمني يوضح التغير بين التقييم القبلي، المتابعة الدورية، والتقييم البعدي.',
    color: '#D99200'
  },
  {
    number: '05',
    title: 'دعم تحديد الجوانب التي تحتاج إلى متابعة',
    description: 'مساعدة الأخصائي على رصد المهارات التي تحتاج دعماً إضافياً وتوثيقها ضمن خطة المتابعة.',
    color: '#8F75EC'
  },
  {
    number: '06',
    title: 'إتاحة مشاركة ولي الأمر في المنزل',
    description: 'تمكين الأسرة من ممارسة أنشطة متابعة منزلية واعية وآمنة تدعم جلسات المركز المتخصص.',
    color: '#32B8B3'
  },
  {
    number: '07',
    title: 'تعزيز دافعية الطفل وتفاعله',
    description: 'تقديم مكافآت بصرية لطيفة ونجوم تشجيعية تجعل المشاركة أكثر حماساً، دون استخدامها كأداة تشخيص.',
    color: '#4D96FF'
  }
];
