export interface Character {
  id: string;
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
    name: 'مريم',
    roleTitle: 'المستكشفة الذكية',
    accentColor: '#7357D9',
    bgGradient: 'from-[#7357D9]/20 via-[#E9E2FF]/40 to-transparent',
    badge: 'دقة الملاحظة والتنظيم',
    image: '/assets/char_maryam.png',
    description: 'تحب مريم قراءة الكتب وتدوين ملاحظات الأصوات بدقة متناهية، وتقود الأطفال للتعرف على أصوات لينج بأسلوب هادئ ومنهجي.',
    strengths: ['الانتباه الهادئ', 'تدوين الاستجابات', 'التركيز العالي'],
    motto: '«كل همسة وكل صوت.. وراءه باب جديد للمعرفة»'
  },
  {
    id: 'zain',
    name: 'زين',
    roleTitle: 'المبتكر الصغير',
    accentColor: '#159D98',
    bgGradient: 'from-[#159D98]/20 via-[#55D6BE]/30 to-transparent',
    badge: 'بطل التمييز والمنطق',
    image: '/assets/char_zain.png',
    description: 'يحمل زين قطعة الأحجية الذهبية المضيئة دائماً! شغفه تفكيك الأصوات المركبة ومعرفة الفرق بين النغمات الطويلة والقصيرة.',
    strengths: ['حل الألغاز السمعية', 'التمييز بين الأصوات', 'تحفيز الفضول'],
    motto: '«الصوت مثل قطعة البازل.. لما نركبه تكتمل الصورة!»'
  },
  {
    id: 'omar',
    name: 'عمر',
    roleTitle: 'المغامر النشيط',
    accentColor: '#FF886F',
    bgGradient: 'from-[#FF886F]/20 via-[#FFE5D9]/40 to-transparent',
    badge: 'سرعة الالتقاط والانتباه',
    image: '/assets/char_omar.png',
    altImage: '/assets/char_omar_alt.png',
    description: 'مستعد دائماً بحقيبته الممتلئة بأوراق التدريب وابتسامته الواثقة؛ يلتقط أول نغمة صوت في البيئة المحيطة ويبادر بالتفاعل فوراً.',
    strengths: ['إدراك وجود الصوت', 'التفاعل السريع', 'الشجاعة والمبادرة'],
    motto: '«أسمع، أنتبه، وأرفع إبهامي بكل ثقة!»'
  },
  {
    id: 'nour',
    name: 'نور',
    roleTitle: 'الصديقة اللطيفة',
    accentColor: '#8F75EC',
    bgGradient: 'from-[#8F75EC]/20 via-[#F4EFFF]/40 to-transparent',
    badge: 'الفهم السمعي والقصص',
    image: '/assets/char_nour.png',
    description: 'بزهور سترتها البنفسجية وطوقها المبهج، تصغي نور لحكايات الأطفال وتربط بين ما يسمعونه من جمل ومعاني لتنمية الفهم السمعي.',
    strengths: ['فهم التعليمات اللفظية', 'ربط الجمل بالمعنى', 'الدعم العاطفي'],
    motto: '«بالإصغاء الدافئ نفهم الكلمات.. ونبني أحلى الصداقات»'
  },
  {
    id: 'sarah',
    name: 'سارة',
    roleTitle: 'الطفلة المرحة',
    accentColor: '#FFC552',
    bgGradient: 'from-[#FFC552]/20 via-[#FFF8ED]/60 to-transparent',
    badge: 'التعزيز والمكافآت والبهجة',
    image: '/assets/char_sarah.png',
    description: 'طاقة لا تتوقف من الضحك والمرح! سارة تحتفي بكل نجمة يجمعها الطفل وتحول جلسات التأهيل الصعبة إلى ألعاب تعزيزية مسلية.',
    strengths: ['الألعاب التفاعلية', 'جمع النجوم والشارات', 'رفع الدافعية'],
    motto: '«مع كل استجابة نحتفل.. والنجوم تنتظر شطارتنا!»'
  }
];

export const LING_SOUNDS: LingSound[] = [
  {
    symbol: '/m/',
    arabicName: 'صوت الميم المغلق (الميم الهمسية)',
    frequencyRange: 'نطاق منخفض (~250 هرتز)',
    category: 'low',
    description: 'صوت أنفي اهتزازي منخفض التردد، يعبر عن قدرة الطفل على التقاط الترددات الأساسية المنخفضة للكلام.',
    clinicalNote: 'يساعد في اختبار كفاءة القناة الصوتية المنخفضة ومكبرات السماعات الطبية.',
    color: '#7357D9'
  },
  {
    symbol: '/u/',
    arabicName: 'صوت الضمة الممتدة (أُو)',
    frequencyRange: 'نطاق منخفض إلى متوسط (~250 - 500 هرتز)',
    category: 'low',
    description: 'صائت خلفي مستدير، يركز على أول قمة رنينية للكلام ويعكس جودة الاستجابة للأصوات العميقة.',
    clinicalNote: 'مهم جداً لقياس استجابة الأذن للأصوات الرنانة القوية قبل الانتقال للأصوات الهوائية.',
    color: '#159D98'
  },
  {
    symbol: '/a/',
    arabicName: 'صوت الفتحة الممتدة (آا)',
    frequencyRange: 'نطاق متوسط (~1000 هرتز)',
    category: 'mid',
    description: 'صائت مفتوح يقع في قلب المنطقة الترددية الحيوية للغة والكلام البشري الطبيعي.',
    clinicalNote: 'الصوت الأكثر وضوحاً وطاقة صوتية، ويمثل مرجعاً ممتازاً لسرعة استجابة الطفل.',
    color: '#FFC552'
  },
  {
    symbol: '/i/',
    arabicName: 'صوت الكسرة الممتدة (إِي)',
    frequencyRange: 'مزدوج التردد (270 و 2300 هرتز)',
    category: 'high',
    description: 'صائت أمامي ضيق يتميز بقمة أولى منخفضة وقمة ثانية عالية التردد تعكس دقة الفصل الترددي.',
    clinicalNote: 'يكشف قدرة المعالج الصوتي في القوقعة أو السماعة على نقل النطاقات المزدوجة بوضوح.',
    color: '#4D96FF'
  },
  {
    symbol: '/ʃ/',
    arabicName: 'صوت الشين (شْشْ)',
    frequencyRange: 'نطاق متوسط-مرتفع (~2000 - 3500 هرتز)',
    category: 'high',
    description: 'صوت احتكاكي لثوي غاري يتطلب تمييز تيار الهواء المضطرب والترددات فوق المتوسطة.',
    clinicalNote: 'أساسي لتقييم وضوح مخارج الحروف الاحتكاكية التي تتأثر عادة بضعف السمع الحسي العصبي.',
    color: '#FF886F'
  },
  {
    symbol: '/s/',
    arabicName: 'صوت السين الصفيري (سْسْ)',
    frequencyRange: 'نطاق فائق الارتفاع (~4000 - 8000 هرتز)',
    category: 'high',
    description: 'الصوت الأعلى تردداً في اختبار لينج، يمثل الاختبار الأدق للترددات العالية جداً.',
    clinicalNote: 'إذا تمكن الطفل من التقاط صوت /s/، فهذا مؤشر قوي على تغطية كامل الطيف الترددي للكلام.',
    color: '#E86B52'
  }
];

export const AUDITORY_SKILLS: AuditorySkill[] = [
  {
    id: 1,
    slug: 'sound-detection',
    title: 'إدراك وجود الصوت والانتباه له',
    englishTitle: 'Sound Detection & Auditory Attention',
    objective: 'متابعة قدرة الطفل على إدراك وجود الصوت، وتوجيه الانتباه إلى المثير السمعي، والمحافظة على الانتباه في مهام ملائمة.',
    examples: [
      'الاستجابة الحركية فور تقديم صوت واضح (رفع اليد أو النظر).',
      'التمييز بين وجود الصوت والصمت المطبق في البيئة.',
      'متابعة صوت مستهدف مع وجود خلفية صوتية مناسبة.'
    ],
    scoringRule: 'تحدد الاستجابة المتوقعة لكل محاولة؛ وتسجل «صحيح» عند مطابقتها، و«غير صحيح» في خلاف ذلك.',
    color: '#7357D9',
    iconName: 'Bell',
    gameTitle: 'رنين الأجراس السحرية',
    gameDescription: 'اضغط على الجرس فور سماع الرنين واجمع النجوم قبل اختفاء الصدى!',
    interactiveDemoType: 'detection'
  },
  {
    id: 2,
    slug: 'auditory-discrimination',
    title: 'التمييز السمعي',
    englishTitle: 'Auditory Discrimination',
    objective: 'تقييم قدرة الطفل على إدراك التشابه والاختلاف بين الأصوات أو الكلمات المتقاربة وفقاً لقدراته السمعية.',
    examples: [
      'مقارنة صوتين متتاليين: هل هما متشابهان أم مختلفان؟',
      'التمييز بين صوت نغمي قصير وصوت ممتد طويل.',
      'التمييز السمعي بين كلمات متقاربة في الوزن أو الأصوات (مثل: باب / تاب).'
    ],
    scoringRule: 'كل مهمة لها إجابة محددة مسبقاً؛ تقارن استجابة الطفل بها لتسجيل صحيح أو غير صحيح.',
    color: '#159D98',
    iconName: 'Sliders',
    gameTitle: 'مختبر الصدى والنغمات',
    gameDescription: 'استمع إلى الصوتين وقرر: هل هما توأمان أم نغمتان مختلفتان؟',
    interactiveDemoType: 'discrimination'
  },
  {
    id: 3,
    slug: 'auditory-identification',
    title: 'التعرف والربط السمعي',
    englishTitle: 'Auditory Identification & Association',
    objective: 'تقييم قدرة الطفل على معرفة مصدر الصوت أو الكلمة المسموعة وربطها بالصورة أو المعنى المناسب.',
    examples: [
      'سماع صوت كائن أو وسيلة نقل واختيار صورته الصحيحة (قطة، سيارة، جرس).',
      'اختيار الصورة المطابقة للكلمة المنطوقة من بين خيارات مرئية.',
      'ربط أصوات البيئة المألوفة بمصادرها ووظائفها اليومية.'
    ],
    scoringRule: 'كل اختيار يطابق الإجابة المعتمدة للمهمة يسجل صحيحاً، وإلا يسجل غير صحيح.',
    color: '#FF886F',
    iconName: 'Image',
    gameTitle: 'حديقة الأصوات المصورة',
    gameDescription: 'من صاحب هذا الصوت؟ اضغط على البطاقة المطابقة للحيوان أو الوسيلة!',
    interactiveDemoType: 'association'
  },
  {
    id: 4,
    slug: 'auditory-comprehension',
    title: 'الفهم السمعي',
    englishTitle: 'Auditory Comprehension',
    objective: 'متابعة قدرة الطفل على فهم التعليمات والمعلومات المسموعة والاستجابة للمحتوى اللغوي بصورة مناسبة.',
    examples: [
      'تنفيذ تعليمة مركبة من خطوة واحدة أو خطوتين (مثال: «اختر الكرة الحمراء ثم ضعها في الصندوق»).',
      'الإجابة عن سؤال بسيط ومباشر بعد سماع جملة وصفية قصيرة.',
      'فهم أحداث قصة قصيرة مسموعة وتحديد الإجابة الملائمة لسؤال الفهم.'
    ],
    scoringRule: 'تحدد الاستجابة الصحيحة قبل عرض النشاط، ثم تسجل محاولات الطفل في سجل التقييم.',
    color: '#8F75EC',
    iconName: 'BookOpen',
    gameTitle: 'مهمة الكرات والأوامر الذكية',
    gameDescription: 'استمع بدقة للأمر اللفظي ونفّذ المطلوب بلمسة سريعة على الشاشة!',
    interactiveDemoType: 'comprehension'
  },
  {
    id: 5,
    slug: 'auditory-closure',
    title: 'الإغلاق السمعي',
    englishTitle: 'Auditory Closure',
    objective: 'تقييم قدرة الطفل على استكمال الجزء الناقص من المعلومات المسموعة مستعيناً بالسياق اللغوي وما سمعه من الكلام.',
    examples: [
      'اختيار كلمة تكمل عبارة مألوفة وشائعة في الحياة اليومية.',
      'استكمال كلمة مفقودة داخل جملة قصيرة (مثال: «الطفل يشرب ... ماء»).',
      'استخدام سياق موقف حواري لاختيار التكملة المنطقية للجملة الناقصة.'
    ],
    scoringRule: 'عند تطابق الاستكمال مع الإجابة المحددة مسبقاً تسجل المحاولة صحيحة، وإلا غير صحيحة.',
    color: '#FFC552',
    iconName: 'Puzzle',
    gameTitle: 'لغز الكلمة المفقودة',
    gameDescription: 'الجملة ضاعت منها كلمة! استمع للسياق واكمل المعنى الصحيح.',
    interactiveDemoType: 'closure'
  },
  {
    id: 6,
    slug: 'listening-in-noise',
    title: 'الاستماع في وجود ضوضاء (تطبيقي إضافي)',
    englishTitle: 'Listening in Noise (Applied Module)',
    objective: 'متابعة قدرة الطفل على التقاط الصوت المستهدف والتعرف عليه وفهمه عند وجود صوت منافس مناسب بالخلفية.',
    examples: [
      'التعرف على كلمة واضحة مع وجود صوت خلفي خفيف (همهمة أو صوت بيئة هادئ).',
      'اختيار صورة مرتبطة بكلمة سمعت في وجود صوت منافس مضبوط الشدة.',
      'فهم تعليمات قصيرة وسط أصوات حيوية مع اشتراط أمان شدة الصوت.'
    ],
    scoringRule: 'تقييم تطبيقي إضافي وليس مستوى إلزامياً؛ يوثق مع ثبات ظروف الجلسة للمقارنة الدورية.',
    color: '#55D6BE',
    iconName: 'Volume2',
    gameTitle: 'تحدي البطل في السوق الهادئ',
    gameDescription: 'التقط الكلمة المطلوبة وسط الأصوات اللطيفة وكن فائز الجولة!',
    interactiveDemoType: 'noise'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'جني محمود عزت رضوان',
    role: 'مسؤولة وحدة اختبار أصوات لينج',
    contribution: 'إعداد المحتوى العلمي لتقييم الاستجابة لأصوات لينج الستة وتحليل ترددات الكلام.',
    color: '#7357D9'
  },
  {
    id: 2,
    name: 'فهد جلال صلاح',
    role: 'مسؤول دليل استخدام ولي الأمر',
    contribution: 'صياغة إرشادات المتابعة المنزلية الواعية وتهيئة البيئة السمعية الهادئة للطفل.',
    color: '#159D98'
  },
  {
    id: 3,
    name: 'شيرين وليد',
    role: 'مسؤولة دليل استخدام الأخصائي',
    contribution: 'تطوير معايير المتابعة المهنية المنظمة ومراجعة تقارير المهارات المستقلة عبر الزمن.',
    color: '#FF886F'
  },
  {
    id: 4,
    name: 'رحمة شعبان',
    role: 'مسؤولة تقييم إدراك وجود الصوت والانتباه',
    contribution: 'تصميم مهام قياس الانتباه السمعي الأولي والتفريق بين الصوت والصمت.',
    color: '#FFC552'
  },
  {
    id: 5,
    name: 'جيهان محمد فاروق',
    role: 'مسؤولة تقييم التمييز السمعي',
    contribution: 'بناء اختبارات التشابه والاختلاف النغمي ومدد الأصوات والكلمات المتقاربة.',
    color: '#8F75EC'
  },
  {
    id: 6,
    name: 'همس عبد الله عبد السميع',
    role: 'مسؤولة التعرف والربط السمعي',
    contribution: 'إعداد منظومة ربط المثير السمعي بمصدره البيئي والصور المعبرة عنه.',
    color: '#55D6BE'
  },
  {
    id: 7,
    name: 'سلمى احمد رضوان',
    role: 'مسؤولة تقييم الفهم السمعي',
    contribution: 'تصميم أنشطة الاستجابة للأوامر متعددة الخطوات وفهم الجمل والقصص المصغرة.',
    color: '#4D96FF'
  },
  {
    id: 8,
    name: 'لمياء محمد ابراهيم',
    role: 'مسؤولة تقييم الإغلاق السمعي',
    contribution: 'تطوير مهام استكمال الكلمات والعبارات المفقودة اعتماداً على السياق اللغوي.',
    color: '#E86B52'
  },
  {
    id: 9,
    name: 'ياسمين ايمن محمد',
    role: 'مسؤولة تقييم الاستماع في الضوضاء',
    contribution: 'تحديد اشتراطات السلامة السمعية ومعايير التقييم التطبيقي في بيئة سمعية مركبة.',
    color: '#32B8B3'
  },
  {
    id: 10,
    name: 'ماجده نبوي حفني',
    role: 'مسؤولة الألعاب التعزيزية للطفل',
    contribution: 'تصميم نظام المكافآت البصرية والشارات والنجوم التحفيزية لرفع دافعية الطفل.',
    color: '#FF886F'
  }
];

export const PROJECT_GOALS = [
  {
    number: '01',
    title: 'متابعة أصوات لينج الستة',
    description: 'متابعة وظيفية منتظمة ومستمرة لمدى تغطية المعالج الصوتي لكامل ترددات أصوات الكلام.',
    color: '#7357D9'
  },
  {
    number: '02',
    title: 'تسجيل وتحليل منظم',
    description: 'توثيق دقيق لكل محاولة وجلسة مع إمكانية مقارنة منحنيات الأداء بنقرة زر واحدة.',
    color: '#159D98'
  },
  {
    number: '03',
    title: 'تقييم المهارات السمعية الخمس',
    description: 'قياس نوعي مستقل لكل مهارة من الإدراك إلى الإغلاق السمعي دون فرض ترتيب مقيّد.',
    color: '#FF886F'
  },
  {
    number: '04',
    title: 'مقارنة الأداء عبر الزمن',
    description: 'ربط الجلسات بجدول زمني يوضح التطور بين التقييم القبلي، المتابعة، والتقييم البعدي.',
    color: '#FFC552'
  },
  {
    number: '05',
    title: 'تحديد جوانب الدعم والمتابعة',
    description: 'مساعدة الأخصائي في رصد المهارات التي تحتاج إلى تعزيز إضافي في الخطة التأهيلية.',
    color: '#8F75EC'
  },
  {
    number: '06',
    title: 'إشراك ولي الأمر في المنزل',
    description: 'تمكين الأسرة من ممارسة أنشطة تفاعلية واعية وآمنة تدعم جلسات المركز المتخصص.',
    color: '#55D6BE'
  },
  {
    number: '07',
    title: 'تعزيز دافعية وتفاعل الطفل',
    description: 'تحويل التقييمات المرهقة إلى رحلة ألعاب ممتعة مليئة بالمكافآت والشارات اللطيفة.',
    color: '#4D96FF'
  }
];
