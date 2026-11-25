export type CharacterId = 'omar' | 'maryam' | 'zain' | 'nour' | 'sarah';

export interface CharacterVoiceProfile {
  id: CharacterId;
  name: string;
  roleTitle: string;
  personality: string;
  storytellingRole: string;
  accentColor: string;
  avatarImage: string;
  auditionAudioPath: string;
  auditionText: string;
  voiceId: string | null;
  voiceName: string;
  voiceModel: 'eleven_v3' | 'eleven_multilingual_v2' | 'pending';
  speakingStyle: string;
  emotionalRange: string;
  assignedScenes: string[];
}

export interface DialogueLine {
  id: string;
  sceneId: string;
  speakerId: CharacterId;
  speakerName: string;
  spokenText: string;
  subtitleText: string;
  emotion: string;
  estimatedDurationSec: number;
  actualDurationSec?: number;
  audioPath: string;
  animationCue: 'speak-warm' | 'speak-excited' | 'speak-curious' | 'speak-calm' | 'speak-celebrate';
  sfxCue?: string;
}

export interface StoryScene {
  id: string;
  anchorId: string;
  order: number;
  title: string;
  subtitle: string;
  purpose: string;
  charactersPresent: CharacterId[];
  leadCharacter: CharacterId;
  accentColor: string;
  entryTransition: string;
  exitTransition: string;
  dialogue: DialogueLine[];
}

export const CHARACTER_VOICE_PROFILES: Record<CharacterId, CharacterVoiceProfile> = {
  omar: {
    id: 'omar',
    name: 'عمر',
    roleTitle: 'الراوي المُرَحِّب والمغامر النشيط',
    personality: 'ودود، واثق، مبادر، يلتقط الأصوات حوله بحماس ويشجع الأطفال.',
    storytellingRole: 'يستقبل الزوار في البداية، ويقدم تطبيق صدى، ويقود مهارة الإدراك والانتباه، ويقدم فريق العمل.',
    accentColor: '#FF886F',
    avatarImage: '/assets/char_omar.webp',
    auditionAudioPath: '/audio/auditions/audition-omar.mp3',
    auditionText: 'أهلاً بيكم في عالم صدى! كل صوت حوالينا وراه حكاية، يلا نبدأ الرحلة مع بعض!',
    voiceId: null,
    voiceName: 'بانتظار اعتماد الصوت (ElevenLabs OAuth)',
    voiceModel: 'pending',
    speakingStyle: 'إلقاء مصري طبيعي دافئ ومُرحّب بإيقاع حيوي واضح',
    emotionalRange: 'ترحيب، حماس، تشجيع، فخر',
    assignedScenes: ['scene-01-welcome', 'scene-03-discovering-sada', 'scene-05-auditory-skills', 'scene-07-games', 'scene-10-team']
  },
  maryam: {
    id: 'maryam',
    name: 'مريم',
    roleTitle: 'المرشدة الهادئة والمستكشفة المنظمة',
    personality: 'هادئة، دقيقة الملاحظة، منظمة، تشرح المفاهيم العلمية ببساطة وطمأنينة.',
    storytellingRole: 'تشرح التحديات السمعية، وأصوات لينج الستة، والربط السمعي، وضوابط الاستماع في الضوضاء، ودليل الأخصائي.',
    accentColor: '#7357D9',
    avatarImage: '/assets/char_maryam.webp',
    auditionAudioPath: '/audio/auditions/audition-maryam.mp3',
    auditionText: 'مع كل صوت بيسمعه الطفل، خطوة منظمة بتساعدنا نتابع تطوره بهدوء ووضوح.',
    voiceId: null,
    voiceName: 'بانتظار اعتماد الصوت (ElevenLabs OAuth)',
    voiceModel: 'pending',
    speakingStyle: 'نبرة هادئة واضحة المخارج مناسبة للمصطلحات التربوية والسمعية',
    emotionalRange: 'طمأنينة، وضوح علمي، إرشاد منظم',
    assignedScenes: ['scene-01-welcome', 'scene-02-challenge', 'scene-03-discovering-sada', 'scene-04-ling-six', 'scene-05-auditory-skills', 'scene-06-listening-noise', 'scene-08-parents-specialists', 'scene-09-progress']
  },
  zain: {
    id: 'zain',
    name: 'زين',
    roleTitle: 'المستكشف الفضولي والمبتكر الصغير',
    personality: 'فضولي، محب للأسئلة والألغاز، يكتشف الفروق بين النغمات والترددات.',
    storytellingRole: 'يطرح الأسئلة التي تدفع القصة للأمام ويقود تحدي التمييز السمعي والضوضاء.',
    accentColor: '#159D98',
    avatarImage: '/assets/char_zain.webp',
    auditionAudioPath: '/audio/auditions/audition-zain.mp3',
    auditionText: 'تفتكروا إزاي بنفرق بين الصوت القصير والطويل؟ يلا نركّب قطعة البازل ونكتشف!',
    voiceId: null,
    voiceName: 'بانتظار اعتماد الصوت (ElevenLabs OAuth)',
    voiceModel: 'pending',
    speakingStyle: 'صوت شبابي فضولي بنبرة تساؤل واكتشاف',
    emotionalRange: 'فضول، دهشة، تركيز، حماس علمي',
    assignedScenes: ['scene-02-challenge', 'scene-04-ling-six', 'scene-05-auditory-skills', 'scene-06-listening-noise']
  },
  nour: {
    id: 'nour',
    name: 'نور',
    roleTitle: 'الصديقة اللطيفة والداعمة المتفائلة',
    personality: 'حنونة، متعاطفة، متفائلة، تربط الأصوات بالمعاني والدفء الأسري.',
    storytellingRole: 'تتحدث عن دعم الأسرة في المنزل، وتقود مهارة الفهم السمعي، وتلخص رسالة الأمل في الختام.',
    accentColor: '#8F75EC',
    avatarImage: '/assets/char_nour.webp',
    auditionAudioPath: '/audio/auditions/audition-nour.mp3',
    auditionText: 'في البيت الهادئ ومع كل كلمة تشجيع، رحلة الاستماع بتبقى أدفى وأقرب للقلب.',
    voiceId: null,
    voiceName: 'بانتظار اعتماد الصوت (ElevenLabs OAuth)',
    voiceModel: 'pending',
    speakingStyle: 'صوت ناعم دافئ يبعث على الأمل والثقة',
    emotionalRange: 'دفء أسري، تعاطف، تفاؤل، احتواء',
    assignedScenes: ['scene-02-challenge', 'scene-05-auditory-skills', 'scene-08-parents-specialists', 'scene-09-progress', 'scene-11-ending']
  },
  sarah: {
    id: 'sarah',
    name: 'سارة',
    roleTitle: 'البطلة المرحة ومحبّة اللعب',
    personality: 'مرحة، منطلقة، تحتفل بكل نجمة وتحوّل التدريب إلى بهجة ولعب.',
    storytellingRole: 'تضفي طاقة اللعب، تقود مهارة الإغلاق السمعي، وتستضيف عالم الألعاب والمكافآت، وتشارك في الختام.',
    accentColor: '#FFC552',
    avatarImage: '/assets/char_sarah.webp',
    auditionAudioPath: '/audio/auditions/audition-sarah.mp3',
    auditionText: 'يا سلام! كل محاولة شاطرة ليها نجمة بتلمع... جاهزين نلعب مع الأصوات؟',
    voiceId: null,
    voiceName: 'بانتظار اعتماد الصوت (ElevenLabs OAuth)',
    voiceModel: 'pending',
    speakingStyle: 'إلقاء مرح نابض بالحيوية والفرح',
    emotionalRange: 'بهجة، لعب، احتفال، تحفيز',
    assignedScenes: ['scene-01-welcome', 'scene-05-auditory-skills', 'scene-07-games', 'scene-11-ending']
  }
};

export const STORY_SCENES: StoryScene[] = [
  {
    id: 'scene-01-welcome',
    anchorId: 'hero',
    order: 1,
    title: 'أهلاً بيكم في عالم صدى',
    subtitle: 'المشهد الافتتاحي · لقاء الأبطال الخمسة',
    purpose: 'تقديم عالم صدى والشخصيات الخمس وبداية الرحلة السمعية.',
    charactersPresent: ['omar', 'sarah', 'maryam', 'zain', 'nour'],
    leadCharacter: 'omar',
    accentColor: '#7357D9',
    entryTransition: 'ستار الموجة الصوتية ينفتح ليكشف عن أبطال صدى الخمسة.',
    exitTransition: 'تتمدد موجة الصوت الذهبية نحو الأسفل لتكشف عالم الأسرة والطفل.',
    dialogue: [
      {
        id: 'scene-01-omar-01',
        sceneId: 'scene-01-welcome',
        speakerId: 'omar',
        speakerName: 'عمر',
        spokenText: 'أهلاً بيكم في عالم صدى! كل صوت حوالينا وراه حكاية، والنهارده هنعيش الحكاية دي مع بعض. جاهزين؟ يلا بينا!',
        subtitleText: 'أهلاً بيكم في عالم صدى! كل صوت حوالينا وراه حكاية، والنهارده هنعيش الحكاية دي مع بعض. جاهزين؟ يلا بينا!',
        emotion: 'ترحيب وحماس',
        estimatedDurationSec: 7.5,
        audioPath: '/audio/characters/scene-01-omar-01.mp3',
        animationCue: 'speak-excited',
        sfxCue: '/audio/sfx/welcome-chime.mp3'
      },
      {
        id: 'scene-01-sarah-02',
        sceneId: 'scene-01-welcome',
        speakerId: 'sarah',
        speakerName: 'سارة',
        spokenText: 'يلا يا أصحاب! مع كل خطوة هنسمع صوت جديد ونجمع نجمة حلوة!',
        subtitleText: 'يلا يا أصحاب! مع كل خطوة هنسمع صوت جديد ونجمع نجمة حلوة!',
        emotion: 'بهجة ومرح',
        estimatedDurationSec: 4.8,
        audioPath: '/audio/characters/scene-01-sarah-02.mp3',
        animationCue: 'speak-celebrate'
      },
      {
        id: 'scene-01-maryam-03',
        sceneId: 'scene-01-welcome',
        speakerId: 'maryam',
        speakerName: 'مريم',
        spokenText: 'اتبعوا موجة الصوت معانا، وتعالوا نكتشف إزاي كل استجابة صغيرة بتفرق في رحلة الطفل.',
        subtitleText: 'اتبعوا موجة الصوت معانا، وتعالوا نكتشف إزاي كل استجابة صغيرة بتفرق في رحلة الطفل.',
        emotion: 'إرشاد هادئ',
        estimatedDurationSec: 5.8,
        audioPath: '/audio/characters/scene-01-maryam-03.mp3',
        animationCue: 'speak-calm'
      }
    ]
  },
  {
    id: 'scene-02-challenge',
    anchorId: 'about',
    order: 2,
    title: 'لماذا يبدأ كل شيء بالإصغاء؟',
    subtitle: 'فهم التحدي اليومي وترابط الحل',
    purpose: 'توضيح تحديات المتابعة الورقية والحاجة لأنشطة منزلية داعمة دون تهويل طبي.',
    charactersPresent: ['zain', 'maryam', 'nour'],
    leadCharacter: 'zain',
    accentColor: '#159D98',
    entryTransition: 'تتحول دوائر الموجة الصوتية إلى مشهد قراءة وتأمل هادئ.',
    exitTransition: 'تتجمع خطوط الشرح داخل إطار الجهاز اللوحي لتكشف التطبيق.',
    dialogue: [
      {
        id: 'scene-02-zain-04',
        sceneId: 'scene-02-challenge',
        speakerId: 'zain',
        speakerName: 'زين',
        spokenText: 'استنوا لحظة... هو ليه ساعات أصوات الكلام بتحتاج تركيز وتدريب زيادة عشان نوصل لمعناها؟',
        subtitleText: 'استنوا لحظة... هو ليه ساعات أصوات الكلام بتحتاج تركيز وتدريب زيادة عشان نوصل لمعناها؟',
        emotion: 'تساؤل وفضول',
        estimatedDurationSec: 6.0,
        audioPath: '/audio/characters/scene-02-zain-04.mp3',
        animationCue: 'speak-curious'
      },
      {
        id: 'scene-02-maryam-05',
        sceneId: 'scene-02-challenge',
        speakerId: 'maryam',
        speakerName: 'مريم',
        spokenText: 'سؤال مهم يا زين! الأطفال اللي بيستخدموا سماعات طبية أو قوقعة إلكترونية بيتعلموا يميزوا كل صوت بالتدريج، والورق المتفرق كان بيصعّب متابعة تطورهم.',
        subtitleText: 'سؤال مهم يا زين! الأطفال مستخدمو السماعات الطبية أو القوقعة بيتعلموا يميزوا كل صوت بالتدريج، والورق المتفرق كان بيصعّب متابعة تطورهم.',
        emotion: 'توضيح علمي هادئ',
        estimatedDurationSec: 8.5,
        audioPath: '/audio/characters/scene-02-maryam-05.mp3',
        animationCue: 'speak-calm'
      },
      {
        id: 'scene-02-nour-06',
        sceneId: 'scene-02-challenge',
        speakerId: 'nour',
        speakerName: 'نور',
        spokenText: 'والأهل كمان كانوا محتاجين طريقة لطيفة ومشجعة في البيت، تحوّل المتابعة لوقت مشاركة دافي من غير ضغط أو قلق.',
        subtitleText: 'والأهل كمان كانوا محتاجين طريقة لطيفة ومشجعة في البيت، تحوّل المتابعة لوقت مشاركة دافي من غير ضغط أو قلق.',
        emotion: 'دفء وتعاطف',
        estimatedDurationSec: 7.0,
        audioPath: '/audio/characters/scene-02-nour-06.mp3',
        animationCue: 'speak-warm'
      }
    ]
  },
  {
    id: 'scene-03-discovering-sada',
    anchorId: 'app',
    order: 3,
    title: 'رحلة صدى تبدأ هنا',
    subtitle: 'اكتشاف المنظومة ودورة العمل الستة',
    purpose: 'عرض شاشات التطبيق الحقيقية والربط بين الملف، التقييم، التدريب، والتقارير.',
    charactersPresent: ['omar', 'zain', 'maryam'],
    leadCharacter: 'omar',
    accentColor: '#7357D9',
    entryTransition: 'يبرز الجهاز اللوحي وتنسدل منه شاشة الهاتف التفاعلية.',
    exitTransition: 'تنقسم أيقونة الموجة الصوتية في التطبيق إلى ست كرات تردد مضيئة.',
    dialogue: [
      {
        id: 'scene-03-omar-07',
        sceneId: 'scene-03-discovering-sada',
        speakerId: 'omar',
        speakerName: 'عمر',
        spokenText: 'وهنا جه دور صدى! منظومة واحدة بتربط التقييم الوظيفي، بالتدريب التفاعلي، بمتابعة النتايج في ملف واحد لكل طفل.',
        subtitleText: 'وهنا جه دور صدى! منظومة واحدة بتربط التقييم الوظيفي، بالتدريب التفاعلي، بمتابعة النتايج في ملف واحد لكل طفل.',
        emotion: 'حماس وتقديم',
        estimatedDurationSec: 7.2,
        audioPath: '/audio/characters/scene-03-omar-07.mp3',
        animationCue: 'speak-excited'
      },
      {
        id: 'scene-03-maryam-08',
        sceneId: 'scene-03-discovering-sada',
        speakerId: 'maryam',
        speakerName: 'مريم',
        spokenText: 'من أول إنشاء ملف الطفل، لتقييم الأصوات والمهارات، لحد حفظ النتايج ومقارنتها مع الأخصائي عبر الزمن.',
        subtitleText: 'من أول إنشاء ملف الطفل، لتقييم الأصوات والمهارات، لحد حفظ النتايج ومقارنتها مع الأخصائي عبر الزمن.',
        emotion: 'ترتيب ووضوح',
        estimatedDurationSec: 6.8,
        audioPath: '/audio/characters/scene-03-maryam-08.mp3',
        animationCue: 'speak-calm'
      }
    ]
  },
  {
    id: 'scene-04-ling-six',
    anchorId: 'ling-test',
    order: 4,
    title: 'أصوات لينج الستة',
    subtitle: 'Ling Six Sound Check · تقييم التغطية الترددية',
    purpose: 'تقديم أصوات لينج الستة وتغطيتها لطيف الكلام مع تمييز الأمثلة التوضيحية عن الفحص السريري.',
    charactersPresent: ['maryam', 'zain'],
    leadCharacter: 'maryam',
    accentColor: '#FFC552',
    entryTransition: 'تتفتح الست كرات الترددية عبر مسار الطيف الصوتي.',
    exitTransition: 'تتصل كرات التردد لتشكّل طريق المغامرة نحو المهارات الخمس.',
    dialogue: [
      {
        id: 'scene-04-maryam-09',
        sceneId: 'scene-04-ling-six',
        speakerId: 'maryam',
        speakerName: 'مريم',
        spokenText: 'دي أصوات لينج الستة: م، أو، آ، إي، ش، وس. ست أصوات بسيطة لكنها بتغطي نطاقات الترددات الأساسية للكلام.',
        subtitleText: 'دي أصوات لينج الستة: /m/، /u/، /a/، /i/، /ʃ/، و/s/. ست أصوات تغطي نطاقات الترددات الأساسية للكلام.',
        emotion: 'شرح تعليمي واضح',
        estimatedDurationSec: 8.0,
        audioPath: '/audio/characters/scene-04-maryam-09.mp3',
        animationCue: 'speak-calm'
      },
      {
        id: 'scene-04-zain-10',
        sceneId: 'scene-04-ling-six',
        speakerId: 'zain',
        speakerName: 'زين',
        spokenText: 'يعني من الصوت الدافي العميق لحد الهمسة العالية! وكل استجابة بتتسجل عشان نتابع وضوح السمع في الجلسة.',
        subtitleText: 'يعني من الصوت الدافي العميق لحد الهمسة العالية! وكل استجابة بتتسجل عشان نتابع وضوح السمع في الجلسة.',
        emotion: 'اكتشاف وإعجاب',
        estimatedDurationSec: 6.8,
        audioPath: '/audio/characters/scene-04-zain-10.mp3',
        animationCue: 'speak-curious'
      }
    ]
  },
  {
    id: 'scene-05-auditory-skills',
    anchorId: 'training',
    order: 5,
    title: 'مغامرة المهارات السمعية الخمس',
    subtitle: 'خمس محطات مستقلة تتنوع بيئاتها وتجاربها',
    purpose: 'رحلة متصلة عبر المهارات الخمس: الإدراك والانتباه، التمييز، التعرف والربط، الفهم، والإغلاق السمعي.',
    charactersPresent: ['omar', 'zain', 'maryam', 'nour', 'sarah'],
    leadCharacter: 'omar',
    accentColor: '#8F75EC',
    entryTransition: 'يتحول خط الطيف الصوتي إلى مسار رحلة من خمس محطات متتابعة.',
    exitTransition: 'تتدرج الخلفية نحو طبقات بيئية مألوفة للانتقال لتحدي الضوضاء.',
    dialogue: [
      {
        id: 'scene-05-omar-11',
        sceneId: 'scene-05-auditory-skills',
        speakerId: 'omar',
        speakerName: 'عمر',
        spokenText: 'أول محطة: الإدراك والانتباه السمعي! يعني نلقط وجود الصوت وسط السكون وننتبه له بسرعة.',
        subtitleText: '١. الإدراك والانتباه السمعي: التقاط وجود الصوت وسط السكون وتوجيه الانتباه له.',
        emotion: 'يقظة وتفاعل',
        estimatedDurationSec: 6.0,
        audioPath: '/audio/characters/scene-05-omar-11.mp3',
        animationCue: 'speak-excited'
      },
      {
        id: 'scene-05-zain-12',
        sceneId: 'scene-05-auditory-skills',
        speakerId: 'zain',
        speakerName: 'زين',
        spokenText: 'وتاني محطة: التمييز السمعي! زي البازل بالظبط، نعرف هل الصوتين شبه بعض ولا مختلفين.',
        subtitleText: '٢. التمييز السمعي: إدراك التشابه والاختلاف بين الأصوات والمدد والكلمات المتقاربة.',
        emotion: 'تحليل واكتشاف',
        estimatedDurationSec: 6.0,
        audioPath: '/audio/characters/scene-05-zain-12.mp3',
        animationCue: 'speak-curious'
      },
      {
        id: 'scene-05-maryam-13',
        sceneId: 'scene-05-auditory-skills',
        speakerId: 'maryam',
        speakerName: 'مريم',
        spokenText: 'في المحطة التالتة بنربط الصوت بمصدره الحقيقي: صوت قطة، عربية، أو جرس، ونوصّله بالصورة الصح.',
        subtitleText: '٣. التعرف والربط السمعي: معرفة مصدر الصوت أو الكلمة وربطها بالصورة والمعنى.',
        emotion: 'شرح لطيف',
        estimatedDurationSec: 6.2,
        audioPath: '/audio/characters/scene-05-maryam-13.mp3',
        animationCue: 'speak-calm'
      },
      {
        id: 'scene-05-nour-14',
        sceneId: 'scene-05-auditory-skills',
        speakerId: 'nour',
        speakerName: 'نور',
        spokenText: 'بعدها الفهم السمعي! لما الطفل يسمع جملة أو تعليمة بسيطة ويفهم معناها وينفذها بثقة.',
        subtitleText: '٤. الفهم السمعي: فهم التعليمات والجمل والقصص القصيرة والاستجابة لها.',
        emotion: 'دفء وتشجيع',
        estimatedDurationSec: 5.8,
        audioPath: '/audio/characters/scene-05-nour-14.mp3',
        animationCue: 'speak-warm'
      },
      {
        id: 'scene-05-sarah-15',
        sceneId: 'scene-05-auditory-skills',
        speakerId: 'sarah',
        speakerName: 'سارة',
        spokenText: 'وخامس محطة هي الإغلاق السمعي! لما كلمة تضيع من الجملة، نكمّلها من المعنى اللي سمعناه!',
        subtitleText: '٥. الإغلاق السمعي: استكمال الجزء الناقص من الكلام بالاعتماد على السياق اللغوي.',
        emotion: 'مرح وابتهاج',
        estimatedDurationSec: 5.8,
        audioPath: '/audio/characters/scene-05-sarah-15.mp3',
        animationCue: 'speak-celebrate'
      }
    ]
  },
  {
    id: 'scene-06-listening-noise',
    anchorId: 'noise',
    order: 6,
    title: 'الاستماع وسط الضوضاء',
    subtitle: 'التقييم التطبيقي الإضافي وضوابط السلامة السمعية',
    purpose: 'شرح وحدة الاستماع في وجود ضوضاء كوحدة إضافية آمنة تحت إشراف الأخصائي.',
    charactersPresent: ['zain', 'maryam'],
    leadCharacter: 'zain',
    accentColor: '#32B8B3',
    entryTransition: 'تندمج طبقات الصوت الخلفية الهادئة حول شاشة التقييم.',
    exitTransition: 'تتوهج الموجات وتنفجر إلى نجوم ملونة تدخل عالم الألعاب.',
    dialogue: [
      {
        id: 'scene-06-zain-16',
        sceneId: 'scene-06-listening-noise',
        speakerId: 'zain',
        speakerName: 'زين',
        spokenText: 'طيب لو كنا في مكان فيه دوشة خفيفة حوالينا، زي الفصل أو السوق، نقدر نركز في الكلمة المطلوبة؟',
        subtitleText: 'طيب لو كنا في مكان فيه صوت خلفي خفيف، زي الفصل أو السوق، نقدر نركز في الكلمة المطلوبة؟',
        emotion: 'تساؤل واقعي',
        estimatedDurationSec: 6.2,
        audioPath: '/audio/characters/scene-06-zain-16.mp3',
        animationCue: 'speak-curious'
      },
      {
        id: 'scene-06-maryam-17',
        sceneId: 'scene-06-listening-noise',
        speakerId: 'maryam',
        speakerName: 'مريم',
        spokenText: 'ده تقييم تطبيقي إضافي في صدى، بنجربه بأمان وبشروط هادية يحددها الأخصائي عشان نتأكد إن الصوت مريح وواضح.',
        subtitleText: 'هذا تقييم تطبيقي إضافي وليس إلزامياً، يُجرى في ظروف آمنة ومضبوطة يحددها الأخصائي.',
        emotion: 'طمأنينة وعناية',
        estimatedDurationSec: 7.4,
        audioPath: '/audio/characters/scene-06-maryam-17.mp3',
        animationCue: 'speak-calm'
      }
    ]
  },
  {
    id: 'scene-07-games',
    anchorId: 'games',
    order: 7,
    title: 'عالم ألعاب صدى والنجوم',
    subtitle: 'نماذج تفاعلية تصورّية للألعاب التعزيزية والمكافآت',
    purpose: 'عرض الألعاب التعزيزية التفاعلية المستوحاة من Nex Playground بوضوح أنها عروض توضيحية تعزيزية.',
    charactersPresent: ['sarah', 'omar', 'zain'],
    leadCharacter: 'sarah',
    accentColor: '#55D6BE',
    entryTransition: 'انتقال لوني جريء من السطح الفاتح إلى مسرح ألعاب ليلي مضيء.',
    exitTransition: 'تصعد نجمة التقدم الذهبية لتصل إلى لوحة متابعة الأسرة والأخصائي.',
    dialogue: [
      {
        id: 'scene-07-sarah-18',
        sceneId: 'scene-07-games',
        speakerId: 'sarah',
        speakerName: 'سارة',
        spokenText: 'ودلوقتي جه وقت اللعب! في عالم ألعاب صدى كل نشاط بيتحول للعبة ألوان وحركة، وكل محاولة ليها نجمة!',
        subtitleText: 'ودلوقتي جه وقت اللعب! في عالم ألعاب صدى كل نشاط بيتحول للعبة ألوان وحركة، وكل محاولة ليها نجمة!',
        emotion: 'انطلاق وفرح',
        estimatedDurationSec: 7.0,
        audioPath: '/audio/characters/scene-07-sarah-18.mp3',
        animationCue: 'speak-celebrate',
        sfxCue: '/audio/sfx/game-sparkle.mp3'
      },
      {
        id: 'scene-07-omar-19',
        sceneId: 'scene-07-games',
        speakerId: 'omar',
        speakerName: 'عمر',
        spokenText: 'يلا جربوا بنفسكم نماذج الألعاب التفاعلية وشوفوا إزاي التشجيع بيخلي الطفل متحمس للجلسة الجاية!',
        subtitleText: 'يلا جربوا بنفسكم نماذج الألعاب التفاعلية وشوفوا إزاي التشجيع بيخلي الطفل متحمس للجلسة الجاية!',
        emotion: 'دعوة وتفاعل',
        estimatedDurationSec: 6.2,
        audioPath: '/audio/characters/scene-07-omar-19.mp3',
        animationCue: 'speak-excited'
      }
    ]
  },
  {
    id: 'scene-08-parents-specialists',
    anchorId: 'guides',
    order: 8,
    title: 'شراكة الأسرة والأخصائي',
    subtitle: 'تكامل بين البيئة المنزلية والمتابعة المهنية',
    purpose: 'بيان أدوار ولي الأمر والأخصائي مع التأكيد أن صدى أداة مساعدة لا بديلة للتشخيص السريري.',
    charactersPresent: ['nour', 'maryam'],
    leadCharacter: 'nour',
    accentColor: '#159D98',
    entryTransition: 'تستقر نجمة التقدم في جسر التواصل بين المنزل والعيادة.',
    exitTransition: 'يمتد الجسر ليشكّل خط الزمن الطويل للتطور.',
    dialogue: [
      {
        id: 'scene-08-nour-20',
        sceneId: 'scene-08-parents-specialists',
        speakerId: 'nour',
        speakerName: 'نور',
        spokenText: 'دور ولي الأمر مهم جداً؛ في البيت بنوفّر مكان هادي وتشجيع بحب، وصدى بيساعدنا نتابع من غير ما نحول البيت لعيادة.',
        subtitleText: 'دور ولي الأمر مهم جداً؛ في البيت نوفر بيئة هادئة وتشجيعاً بحب لدعم جلسات المركز.',
        emotion: 'احتواء ودعم أسري',
        estimatedDurationSec: 7.5,
        audioPath: '/audio/characters/scene-08-nour-20.mp3',
        animationCue: 'speak-warm'
      },
      {
        id: 'scene-08-maryam-21',
        sceneId: 'scene-08-parents-specialists',
        speakerId: 'maryam',
        speakerName: 'مريم',
        spokenText: 'وفي نفس الوقت، الأخصائي بيشوف تقارير دقيقة لكل مهارة على حدة، عشان يدعم الخطة التأهيلية المناسبة لكل طفل.',
        subtitleText: 'وفي نفس الوقت، يراجع الأخصائي تقارير منظمة لكل مهارة مستقلة لدعم الخطة التأهيلية.',
        emotion: 'دقة وتعاون',
        estimatedDurationSec: 6.8,
        audioPath: '/audio/characters/scene-08-maryam-21.mp3',
        animationCue: 'speak-calm'
      }
    ]
  },
  {
    id: 'scene-09-progress',
    anchorId: 'progress',
    order: 9,
    title: 'رحلة التطور عبر الزمن',
    subtitle: 'التقييم القبلي، المتابعة الدورية، والتقييم البعدي',
    purpose: 'استعراض أهداف المشروع السبعة ومنحنى التطور الزمني بدون وعود طبية قطعية.',
    charactersPresent: ['maryam', 'nour', 'sarah'],
    leadCharacter: 'maryam',
    accentColor: '#7357D9',
    entryTransition: 'تُضاء محطات الجدول الزمني تدريجياً مع التمرير.',
    exitTransition: 'يلتف خط الزمن ليُظهر صُنّاع الفكرة الحقيقيين.',
    dialogue: [
      {
        id: 'scene-09-maryam-22',
        sceneId: 'scene-09-progress',
        speakerId: 'maryam',
        speakerName: 'مريم',
        spokenText: 'ومع جدول التقييم القبلي والمتابعة الدورية والتقييم البعدي، بنشوف الصورة كاملة عبر الوقت في ظروف متسقة.',
        subtitleText: 'مع جدول التقييم القبلي والمتابعة الدورية والتقييم البعدي، نتابع الأداء عبر الزمن في ظروف متسقة.',
        emotion: 'ثبات وموضوعية',
        estimatedDurationSec: 6.8,
        audioPath: '/audio/characters/scene-09-maryam-22.mp3',
        animationCue: 'speak-calm'
      },
      {
        id: 'scene-09-nour-23',
        sceneId: 'scene-09-progress',
        speakerId: 'nour',
        speakerName: 'نور',
        spokenText: 'المهم دايماً هو الاستمرارية والمشاركة؛ لأن كل طفل ليه إيقاعه وخطواته الخاصة اللي بنفرح بيها.',
        subtitleText: 'المهم دائماً هو الاستمرارية والمشاركة؛ لأن لكل طفل إيقاعه وخطواته الخاصة.',
        emotion: 'تفاؤل وإنسانية',
        estimatedDurationSec: 6.0,
        audioPath: '/audio/characters/scene-09-nour-23.mp3',
        animationCue: 'speak-warm'
      }
    ]
  },
  {
    id: 'scene-10-team',
    anchorId: 'team',
    order: 10,
    title: 'أبطال صناعة صدى — فريق التخرج',
    subtitle: 'عشر باحثات وباحثين وراء المضمون العلمي',
    purpose: 'تقديم فريق مشروع التخرج الحقيقي بأسمائه وأدواره الموثقة بصورة إبداعية.',
    charactersPresent: ['omar', 'nour'],
    leadCharacter: 'omar',
    accentColor: '#159D98',
    entryTransition: 'تتشكل كوكبة الباحثين العشرة بالتوازي مع موجة الصوت.',
    exitTransition: 'تتجمع خطوط الكوكبة نحو المشهد الختامي الاحتفالي.',
    dialogue: [
      {
        id: 'scene-10-omar-24',
        sceneId: 'scene-10-team',
        speakerId: 'omar',
        speakerName: 'عمر',
        spokenText: 'وراء العالم ده كله فريق عمل من عشر باحثين وباحثات، صمموا المحتوى العلمي والأدلة والألعاب عشان حكاية صدى تبقى حقيقة.',
        subtitleText: 'وراء هذا العالم فريق عمل من عشر باحثات وباحثين، صمموا المحتوى العلمي والأدلة والألعاب.',
        emotion: 'تقدير وفخر',
        estimatedDurationSec: 7.0,
        audioPath: '/audio/characters/scene-10-omar-24.mp3',
        animationCue: 'speak-excited'
      }
    ]
  },
  {
    id: 'scene-11-ending',
    anchorId: 'ending',
    order: 11,
    title: 'ولكل طفل رحلة... صدى',
    subtitle: 'المشهد الختامي وتجمع الأبطال الخمسة',
    purpose: 'ختام عاطفي ملهم يجمع الشخصيات الخمس ويكشف الهوية النهائية للمشروع.',
    charactersPresent: ['omar', 'maryam', 'zain', 'nour', 'sarah'],
    leadCharacter: 'nour',
    accentColor: '#FFC552',
    entryTransition: 'تتجمع الشخصيات الخمس في سماء مضيئة بالنجوم والموجات.',
    exitTransition: 'زر العودة إلى بداية القصة عبر موجة الصوت.',
    dialogue: [
      {
        id: 'scene-11-nour-25',
        sceneId: 'scene-11-ending',
        speakerId: 'nour',
        speakerName: 'نور',
        spokenText: 'رحلتنا مع الصوت مش بتنتهي هنا... كل محاولة ليها قيمة، وكل خطوة صغيرة بتفرق.',
        subtitleText: 'رحلتنا مع الصوت مش بتنتهي هنا... كل محاولة ليها قيمة، وكل خطوة صغيرة بتفرق.',
        emotion: 'ختام دافئ ومؤثر',
        estimatedDurationSec: 6.0,
        audioPath: '/audio/characters/scene-11-nour-25.mp3',
        animationCue: 'speak-warm'
      },
      {
        id: 'scene-11-sarah-26',
        sceneId: 'scene-11-ending',
        speakerId: 'sarah',
        speakerName: 'سارة',
        spokenText: 'مع صدى، لكل صوت حكاية، ولكل طفل رحلة!',
        subtitleText: 'مع صدى، لكل صوت حكاية، ولكل طفل رحلة!',
        emotion: 'ختام احتفالي مبهج',
        estimatedDurationSec: 4.5,
        audioPath: '/audio/characters/scene-11-sarah-26.mp3',
        animationCue: 'speak-celebrate',
        sfxCue: '/audio/sfx/finale-reveal.mp3'
      }
    ]
  }
];
