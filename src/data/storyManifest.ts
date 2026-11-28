export type CharacterId = 'omar' | 'maryam' | 'zain' | 'nour' | 'jana';

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
  voiceModel: 'eleven_v3' | 'eleven_v4' | 'eleven_multilingual_v2' | 'pending';
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
    name: 'فهد',
    roleTitle: 'الصديق المُرَحِّب والمغامر النشيط',
    personality: 'ودود، واثق، مبادر، يلتقط الأصوات حوله بحماس ويشجع الأطفال.',
    storytellingRole: 'يدعم رحلة جنى، يرحب بالزوار ويشارك في عرض التطبيق ومهارة الإدراك والانتباه وتقديم فريق طلاب وطالبات المشروع.',
    accentColor: '#FF886F',
    avatarImage: '/assets/char_omar.webp',
    auditionAudioPath: '/audio/auditions/audition-omar.mp3',
    auditionText: 'أهلاً بيكم في تطبيق صدى! يلا نبدأ مع بعض خطوة بخطوة!',
    voiceId: 'QvNF0qyyt1Tuy1YAmnzH',
    voiceName: 'Mostafa - Bold and Spirited (EG)',
    voiceModel: 'eleven_v4',
    speakingStyle: 'لهجة قاهرية طبيعية وواضحة بإيقاع حيوي',
    emotionalRange: 'ترحيب، حماس، تشجيع',
    assignedScenes: ['scene-01-welcome', 'scene-03-discovering-sada', 'scene-05-auditory-skills', 'scene-07-games', 'scene-10-team']
  },
  maryam: {
    id: 'maryam',
    name: 'شيرين',
    roleTitle: 'المرشدة الهادئة والمستكشفة المنظمة',
    personality: 'هادئة، دقيقة الملاحظة، منظمة، تشرح المفاهيم العلمية ببساطة.',
    storytellingRole: 'تشرح التحديات السمعية، وأصوات لينج الستة، والربط السمعي، وضوابط الاستماع في الضوضاء، ودليل الأخصائي.',
    accentColor: '#7357D9',
    avatarImage: '/assets/char_maryam.webp',
    auditionAudioPath: '/audio/auditions/audition-maryam.mp3',
    auditionText: 'كل استجابة صغيرة بتفرق فعلاً في متابعة الطفل وتطور سمعه.',
    voiceId: 'L10lEremDiJfPicq5CPh',
    voiceName: 'Yasmine - Balanced Cairene Guide (EG)',
    voiceModel: 'eleven_v4',
    speakingStyle: 'لهجة قاهرية هادئة ومضبوطة المخارج مناسبة للشرح العلمي البسيط',
    emotionalRange: 'هدوء، وضوح، شرح منظم',
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
    auditionText: 'تفتكروا إزاي بنفرق بين الصوت القصير والطويل؟ يلا نكتشف!',
    voiceId: '5REPlS2Ja1VZ7zNA0ykn',
    voiceName: 'Ziad - Dynamic Cairene Youth (EG)',
    voiceModel: 'eleven_v4',
    speakingStyle: 'لهجة قاهرية شبابية طبيعية بنبرة فضولية متسائلة',
    emotionalRange: 'فضول، دهشة، تركيز، تساؤل',
    assignedScenes: ['scene-02-challenge', 'scene-04-ling-six', 'scene-05-auditory-skills', 'scene-06-listening-noise']
  },
  nour: {
    id: 'nour',
    name: 'رحمة',
    roleTitle: 'الصديقة اللطيفة والداعمة المتفائلة',
    personality: 'لطيفة، متعاطفة، متفائلة، تركز على دور الأسرة في البيت.',
    storytellingRole: 'تتحدث عن دعم الأسرة في المنزل، وتقود مهارة الفهم السمعي، وتختم رحلة التطبيق.',
    accentColor: '#8F75EC',
    avatarImage: '/assets/char_nour.webp',
    auditionAudioPath: '/audio/auditions/audition-nour.mp3',
    auditionText: 'في البيت ومع كل تشجيع بسيط، الطفل بيتابع بحماس من غير ضغط.',
    voiceId: 'xPcC3nehhziQaOrIeAwv',
    voiceName: 'Ghozlan - Soft Clear Conversational (EG)',
    voiceModel: 'eleven_v4',
    speakingStyle: 'لهجة قاهرية ناعمة ومريحة ومتزنة',
    emotionalRange: 'تشجيع أسري، هدوء، تفاؤل',
    assignedScenes: ['scene-02-challenge', 'scene-05-auditory-skills', 'scene-08-parents-specialists', 'scene-09-progress', 'scene-12-ending']
  },
  jana: {
    id: 'jana',
    name: 'جنى',
    roleTitle: 'البطلة والراوية الرئيسية لرحلة صَـدَى',
    personality: 'دافئة، مبهجة، واثقة، تقود الحكاية وتحتفل بكل خطوة تقدم يحققها الطفل.',
    storytellingRole: 'البطلة والراوية الرئيسية للقصة؛ تبدأ الرحلة وتشرح التحديات والتطبيق وتقود مهارة الإغلاق السمعي والألعاب وتقدم فريق التطوير وتختم القصة.',
    accentColor: '#FFC552',
    avatarImage: '/assets/char_jana.webp',
    auditionAudioPath: '/audio/auditions/audition-jana.mp3',
    auditionText: 'أهلاً! أنا جنى، والنهارده هاخدكم معايا في رحلة نتعرف فيها على صدى، يلا بينا!',
    voiceId: 'I3u6waC588j43py1kDN2',
    voiceName: 'Fatima - Expressive Egyptian (EG)',
    voiceModel: 'eleven_v4',
    speakingStyle: 'لهجة قاهرية قريبة للقلب، طبيعية ومتزنة وواضحة',
    emotionalRange: 'سرد دافئ، حماس، تشجيع، احتفال',
    assignedScenes: ['scene-01-welcome', 'scene-02-challenge', 'scene-03-discovering-sada', 'scene-05-auditory-skills', 'scene-07-games', 'scene-09-progress', 'scene-11-dev-team', 'scene-12-ending']
  }
};

export const STORY_SCENES: StoryScene[] = [
  {
    id: 'scene-01-welcome',
    anchorId: 'hero',
    order: 1,
    title: 'أهلاً بيكم في تطبيق صدى',
    subtitle: 'المشهد الافتتاحي · لقاء الأبطال الخمسة',
    purpose: 'تقديم تطبيق صدى والشخصيات الخمس وبداية الرحلة السمعية.',
    charactersPresent: ['jana', 'omar', 'maryam', 'zain', 'nour'],
    leadCharacter: 'jana',
    accentColor: '#7357D9',
    entryTransition: 'ستار الموجة الصوتية ينفتح ليكشف عن أبطال صدى الخمسة بقيادة جنى.',
    exitTransition: 'تتمدد موجة الصوت الذهبية نحو الأسفل لتكشف تحديات الأسرة والطفل.',
    dialogue: [
      {
        id: 'scene-01-jana-01',
        sceneId: 'scene-01-welcome',
        speakerId: 'jana',
        speakerName: 'جنى',
        spokenText: 'أهلاً! أنا جنى، والنهارده هاخدكم معايا في رحلة نتعرف فيها على صدى، وهو مشروع من إعداد طلاب وطالبات كلية علوم الإعاقة والتأهيل بجامعة الزقازيق، تحت إشراف الدكتور عطية محمد، علشان نساعد الأطفال الصم وضعاف السمع. يلا نبدأ!',
        subtitleText: 'أهلاً! أنا جنى، والنهارده هاخدكم معايا في رحلة نتعرف فيها على صدى، وهو مشروع من إعداد طلاب وطالبات كلية علوم الإعاقة والتأهيل بجامعة الزقازيق، تحت إشراف الدكتور عطية محمد، علشان نساعد الأطفال الصم وضعاف السمع. يلا نبدأ!',
        emotion: 'ترحيب وسرد رئيسي',
        estimatedDurationSec: 15.5,
        actualDurationSec: 16.32,
        audioPath: '/audio/characters/scene-01-jana-01.mp3',
        animationCue: 'speak-excited',
        sfxCue: '/audio/sfx/welcome-chime.mp3'
      },
      {
        id: 'scene-01-omar-02',
        sceneId: 'scene-01-welcome',
        speakerId: 'omar',
        speakerName: 'فهد',
        spokenText: 'أهلاً بيكم! وأنا فهد، متحمس جداً نبدأ معاكم الرحلة دي ونشوف إزاي كل خطوة بسيطة بتفرق في سمع الطفل!',
        subtitleText: 'أهلاً بيكم! وأنا فهد، متحمس جداً نبدأ معاكم الرحلة دي ونشوف إزاي كل خطوة بسيطة بتفرق في سمع الطفل!',
        emotion: 'بهجة وحماس',
        estimatedDurationSec: 7.2,
        actualDurationSec: 7.68,
        audioPath: '/audio/characters/scene-01-omar-02.mp3',
        animationCue: 'speak-excited'
      },
      {
        id: 'scene-01-maryam-03',
        sceneId: 'scene-01-welcome',
        speakerId: 'maryam',
        speakerName: 'شيرين',
        spokenText: 'تابعوا معانا خطوة بخطوة، وتعالوا نشوف إزاي كل استجابة صغيرة بتفرق فعلاً في متابعة الطفل.',
        subtitleText: 'تابعوا معانا خطوة بخطوة، وتعالوا نشوف إزاي كل استجابة صغيرة بتفرق فعلاً في متابعة الطفل.',
        emotion: 'إرشاد هادئ',
        estimatedDurationSec: 6.2,
        actualDurationSec: 6.48,
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
    charactersPresent: ['zain', 'jana', 'nour'],
    leadCharacter: 'jana',
    accentColor: '#159D98',
    entryTransition: 'تتحول دوائر الموجة الصوتية إلى مشهد قراءة وتأمل هادئ.',
    exitTransition: 'تتجمع خطوط الشرح داخل إطار الجهاز اللوحي لتكشف التطبيق.',
    dialogue: [
      {
        id: 'scene-02-zain-04',
        sceneId: 'scene-02-challenge',
        speakerId: 'zain',
        speakerName: 'زين',
        spokenText: 'استنوا ثواني... هو ليه ساعات أصوات الكلام بتحتاج تركيز وتدريب زيادة عشان الطفل يميزها؟',
        subtitleText: 'استنوا ثواني... هو ليه ساعات أصوات الكلام بتحتاج تركيز وتدريب زيادة عشان الطفل يميزها؟',
        emotion: 'تساؤل وفضول',
        estimatedDurationSec: 6.2,
        actualDurationSec: 6.4,
        audioPath: '/audio/characters/scene-02-zain-04.mp3',
        animationCue: 'speak-curious'
      },
      {
        id: 'scene-02-jana-05',
        sceneId: 'scene-02-challenge',
        speakerId: 'jana',
        speakerName: 'جنى',
        spokenText: 'سؤال مهم يا زين! الأطفال الصم وضعاف السمع بيتعلموا يميزوا كل صوت واحدة واحدة، ومتابعة الورق الكتير زمان كانت بتصعّب متابعة تطورهم.',
        subtitleText: 'سؤال مهم يا زين! الأطفال الصم وضعاف السمع بيتعلموا يميزوا كل صوت واحدة واحدة، ومتابعة الورق الكتير كانت بتصعّب متابعة تطورهم.',
        emotion: 'توضيح دافئ',
        estimatedDurationSec: 9.0,
        actualDurationSec: 10.72,
        audioPath: '/audio/characters/scene-02-jana-05.mp3',
        animationCue: 'speak-calm'
      },
      {
        id: 'scene-02-nour-06',
        sceneId: 'scene-02-challenge',
        speakerId: 'nour',
        speakerName: 'رحمة',
        spokenText: 'وكمان الأهل في البيت كانوا محتاجين طريقة بسيطة ومشجعة يتابعوا بيها ابنهم من غير توتر أو قلق.',
        subtitleText: 'وكمان الأهل في البيت كانوا محتاجين طريقة بسيطة ومشجعة يتابعوا بيها ابنهم من غير توتر أو قلق.',
        emotion: 'دعم وتعاطف',
        estimatedDurationSec: 6.5,
        actualDurationSec: 6.8,
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
    subtitle: 'اكتشاف التطبيق ودورة العمل الستة',
    purpose: 'عرض شاشات التطبيق الحقيقية والربط بين الملف، التقييم، التدريب، والتقارير.',
    charactersPresent: ['jana', 'omar', 'maryam'],
    leadCharacter: 'jana',
    accentColor: '#7357D9',
    entryTransition: 'يبرز الجهاز اللوحي وتنسدل منه شاشة التطبيق التفاعلية.',
    exitTransition: 'تنقسم أيقونة الموجة الصوتية في التطبيق إلى ست كرات تردد مضيئة.',
    dialogue: [
      {
        id: 'scene-03-jana-07',
        sceneId: 'scene-03-discovering-sada',
        speakerId: 'jana',
        speakerName: 'جنى',
        spokenText: 'ومن هنا بدأت فكرة صدى، علشان نستخدم التكنولوجيا في التدريب والتأهيل والمتابعة بطريقة بسيطة وممتعة في تطبيق واحد.',
        subtitleText: 'ومن هنا بدأت فكرة صدى، علشان نستخدم التكنولوجيا في التدريب والتأهيل والمتابعة بطريقة بسيطة وممتعة في تطبيق واحد.',
        emotion: 'حماس وتقديم',
        estimatedDurationSec: 7.5,
        actualDurationSec: 8.72,
        audioPath: '/audio/characters/scene-03-jana-07.mp3',
        animationCue: 'speak-excited'
      },
      {
        id: 'scene-03-maryam-08',
        sceneId: 'scene-03-discovering-sada',
        speakerId: 'maryam',
        speakerName: 'شيرين',
        spokenText: 'من أول ما نعمل ملف للطفل، لحد تقييم الأصوات والمهارات، وحفظ النتايج عشان الأخصائي يتابع التطور مع الوقت.',
        subtitleText: 'من أول ما نعمل ملف للطفل، لحد تقييم الأصوات والمهارات، وحفظ النتايج عشان الأخصائي يتابع التطور مع الوقت.',
        emotion: 'ترتيب ووضوح',
        estimatedDurationSec: 7.2,
        actualDurationSec: 7.52,
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
        speakerName: 'شيرين',
        spokenText: 'دي أصوات لينج الستة: الميم، والأو، والآ، والإي، والشين، والسين. ست أصوات بسيطة بتغطي الترددات الأساسية للكلام.',
        subtitleText: 'دي أصوات لينج الستة: /m/، /u/، /a/، /i/، /ʃ/، و/s/. ست أصوات بتغطي الترددات الأساسية للكلام.',
        emotion: 'شرح تعليمي واضح',
        estimatedDurationSec: 8.5,
        actualDurationSec: 10.64,
        audioPath: '/audio/characters/scene-04-maryam-09.mp3',
        animationCue: 'speak-calm'
      },
      {
        id: 'scene-04-zain-10',
        sceneId: 'scene-04-ling-six',
        speakerId: 'zain',
        speakerName: 'زين',
        spokenText: 'يعني من الصوت التخين الهادي لحد الهمسة الرفيعة! وكل استجابة بتتسجل عشان نعرف الطفل سمع إيه بوضوح.',
        subtitleText: 'يعني من الصوت العميق لحد الهمسة العالية! وكل استجابة بتتسجل عشان نعرف الطفل سمع إيه بوضوح.',
        emotion: 'اكتشاف وإعجاب',
        estimatedDurationSec: 7.0,
        actualDurationSec: 8.16,
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
    charactersPresent: ['omar', 'zain', 'maryam', 'nour', 'jana'],
    leadCharacter: 'omar',
    accentColor: '#8F75EC',
    entryTransition: 'يتحول خط الطيف الصوتي إلى مسار رحلة من خمس محطات متتابعة.',
    exitTransition: 'تتدرج الخلفية نحو طبقات بيئية مألوفة للانتقال لتحدي الضوضاء.',
    dialogue: [
      {
        id: 'scene-05-omar-11',
        sceneId: 'scene-05-auditory-skills',
        speakerId: 'omar',
        speakerName: 'فهد',
        spokenText: 'أول محطة: الإدراك والانتباه السمعي! يعني الطفل ياخد باله إن فيه صوت ظهر وسط الهدوء ويركز معاه.',
        subtitleText: '١. الإدراك والانتباه السمعي: التقاط وجود الصوت وسط السكون وتوجيه الانتباه له.',
        emotion: 'يقظة وتفاعل',
        estimatedDurationSec: 6.2,
        actualDurationSec: 7.6,
        audioPath: '/audio/characters/scene-05-omar-11.mp3',
        animationCue: 'speak-excited'
      },
      {
        id: 'scene-05-zain-12',
        sceneId: 'scene-05-auditory-skills',
        speakerId: 'zain',
        speakerName: 'زين',
        spokenText: 'وتاني محطة: التمييز السمعي! زي البازل بالظبط، الطفل يقدر يعرف الصوتين شبه بعض ولا مختلفين.',
        subtitleText: '٢. التمييز السمعي: إدراك التشابه والاختلاف بين الأصوات والمدد والكلمات المتقاربة.',
        emotion: 'تحليل واكتشاف',
        estimatedDurationSec: 6.2,
        actualDurationSec: 7.68,
        audioPath: '/audio/characters/scene-05-zain-12.mp3',
        animationCue: 'speak-curious'
      },
      {
        id: 'scene-05-maryam-13',
        sceneId: 'scene-05-auditory-skills',
        speakerId: 'maryam',
        speakerName: 'شيرين',
        spokenText: 'في المحطة التالتة، التعرف والربط: الطفل يربط الصوت بصاحبه الحقيقي، زي صوت قطة أو عربية أو جرس، ويوصله بالصورة الصح.',
        subtitleText: '٣. التعرف والربط السمعي: معرفة مصدر الصوت أو الكلمة وربطها بالصورة والمعنى.',
        emotion: 'شرح لطيف',
        estimatedDurationSec: 7.2,
        actualDurationSec: 9.52,
        audioPath: '/audio/characters/scene-05-maryam-13.mp3',
        animationCue: 'speak-calm'
      },
      {
        id: 'scene-05-nour-14',
        sceneId: 'scene-05-auditory-skills',
        speakerId: 'nour',
        speakerName: 'رحمة',
        spokenText: 'بعدها الفهم السمعي! لما الطفل يسمع جملة أو طلب بسيط ويفهم معناه وينفذه لوحده.',
        subtitleText: '٤. الفهم السمعي: فهم التعليمات والجمل والقصص القصيرة والاستجابة لها.',
        emotion: 'تشجيع وهدوء',
        estimatedDurationSec: 6.2,
        actualDurationSec: 6.96,
        audioPath: '/audio/characters/scene-05-nour-14.mp3',
        animationCue: 'speak-warm'
      },
      {
        id: 'scene-05-jana-15',
        sceneId: 'scene-05-auditory-skills',
        speakerId: 'jana',
        speakerName: 'جنى',
        spokenText: 'وخامس محطة هي الإغلاق السمعي! لما كلمة تقع من الجملة، الطفل يكملها لوحده من سياق الكلام!',
        subtitleText: '٥. الإغلاق السمعي: استكمال الجزء الناقص من الكلام بالاعتماد على السياق اللغوي.',
        emotion: 'مرح وابتهاج',
        estimatedDurationSec: 6.2,
        actualDurationSec: 7.28,
        audioPath: '/audio/characters/scene-05-jana-15.mp3',
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
    purpose: 'شرح وحدة الاستماع في وجود ضوضاء كوحدة إضافية تحت إشراف الأخصائي.',
    charactersPresent: ['zain', 'maryam'],
    leadCharacter: 'zain',
    accentColor: '#32B8B3',
    entryTransition: 'تندمج طبقات الصوت الخلفية الهادئة حول شاشة التقييم.',
    exitTransition: 'تتوهج الموجات وتنفجر إلى نجوم ملونة تدخل قسم الألعاب.',
    dialogue: [
      {
        id: 'scene-06-zain-16',
        sceneId: 'scene-06-listening-noise',
        speakerId: 'zain',
        speakerName: 'زين',
        spokenText: 'طب لو إحنا في مكان فيه دوشة خفيفة حوالينا، زي الفصل أو الشارع، نقدر نلقط الكلمة المطلوبة؟',
        subtitleText: 'طب لو كنا في مكان فيه صوت خلفي خفيف، زي الفصل أو الشارع، نقدر نلقط الكلمة المطلوبة؟',
        emotion: 'تساؤل واقعي',
        estimatedDurationSec: 6.5,
        actualDurationSec: 6.24,
        audioPath: '/audio/characters/scene-06-zain-16.mp3',
        animationCue: 'speak-curious'
      },
      {
        id: 'scene-06-maryam-17',
        sceneId: 'scene-06-listening-noise',
        speakerId: 'maryam',
        speakerName: 'شيرين',
        spokenText: 'ده تقييم إضافي في التطبيق، بيتعمل تحت إشراف الأخصائي وبمستوى صوت مضبوط عشان نتأكد إن السمع مريح وواضح.',
        subtitleText: 'هذا تقييم تطبيقي إضافي وليس إلزامياً، يُجرى تحت إشراف الأخصائي وبمستوى صوت مضبوط.',
        emotion: 'وضوح وعناية',
        estimatedDurationSec: 7.4,
        actualDurationSec: 7.84,
        audioPath: '/audio/characters/scene-06-maryam-17.mp3',
        animationCue: 'speak-calm'
      }
    ]
  },
  {
    id: 'scene-07-games',
    anchorId: 'games',
    order: 7,
    title: 'ألعاب صدى والنجوم',
    subtitle: 'نماذج تفاعلية تصورّية للألعاب التعزيزية والمكافآت',
    purpose: 'عرض الألعاب التعزيزية التفاعلية بوضوح أنها عروض توضيحية تعزيزية.',
    charactersPresent: ['jana', 'omar', 'zain'],
    leadCharacter: 'jana',
    accentColor: '#55D6BE',
    entryTransition: 'انتقال لوني جريء من السطح الفاتح إلى مسرح ألعاب ليلي مضيء.',
    exitTransition: 'تصعد نجمة التقدم الذهبية لتصل إلى لوحة متابعة الأسرة والأخصائي.',
    dialogue: [
      {
        id: 'scene-07-jana-18',
        sceneId: 'scene-07-games',
        speakerId: 'jana',
        speakerName: 'جنى',
        spokenText: 'ودلوقتي جه وقت اللعب! مع صدى، كل تدريب بيتحول للعبة ألوان وحركة، وكل محاولة شاطرة بتكسب نجمة تشجع الطفل!',
        subtitleText: 'ودلوقتي جه وقت اللعب! مع صدى، كل نشاط بيتحول للعبة ألوان وحركة، وكل محاولة شاطرة بتكسب نجمة تشجع الطفل!',
        emotion: 'انطلاق وفرح',
        estimatedDurationSec: 7.5,
        actualDurationSec: 9.6,
        audioPath: '/audio/characters/scene-07-jana-18.mp3',
        animationCue: 'speak-celebrate',
        sfxCue: '/audio/sfx/game-sparkle.mp3'
      },
      {
        id: 'scene-07-omar-19',
        sceneId: 'scene-07-games',
        speakerId: 'omar',
        speakerName: 'فهد',
        spokenText: 'يلا جربوا بنفسكم نماذج الألعاب التفاعلية وشوفوا إزاي التشجيع بيخلي الطفل متحمس يكمل التدريب!',
        subtitleText: 'يلا جربوا بنفسكم نماذج الألعاب التفاعلية وشوفوا إزاي التشجيع بيخلي الطفل متحمس يكمل التدريب!',
        emotion: 'دعوة وتفاعل',
        estimatedDurationSec: 6.5,
        actualDurationSec: 7.12,
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
        speakerName: 'رحمة',
        spokenText: 'دور ولي الأمر مهم جداً؛ في البيت بنوفر جو هادي وتشجيع بسيط، والتطبيق بيساعدنا نتابع من غير ما نقلب البيت لعيادة.',
        subtitleText: 'دور ولي الأمر مهم جداً؛ في البيت بنوفر جو هادي وتشجيع بسيط لدعم جلسات المركز.',
        emotion: 'دعم أسري',
        estimatedDurationSec: 8.0,
        actualDurationSec: 9.52,
        audioPath: '/audio/characters/scene-08-nour-20.mp3',
        animationCue: 'speak-warm'
      },
      {
        id: 'scene-08-maryam-21',
        sceneId: 'scene-08-parents-specialists',
        speakerId: 'maryam',
        speakerName: 'شيرين',
        spokenText: 'وفي نفس الوقت، الأخصائي بيشوف تقارير واضحة لكل مهارة لوحدها، عشان يظبط الخطة المناسبة لكل طفل.',
        subtitleText: 'وفي نفس الوقت، يراجع الأخصائي تقارير منظمة لكل مهارة مستقلة لدعم الخطة التأهيلية.',
        emotion: 'دقة وتعاون',
        estimatedDurationSec: 7.0,
        actualDurationSec: 6.8,
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
    charactersPresent: ['jana', 'nour', 'maryam'],
    leadCharacter: 'jana',
    accentColor: '#7357D9',
    entryTransition: 'تُضاء محطات الجدول الزمني تدريجياً مع التمرير.',
    exitTransition: 'يلتف خط الزمن ليُظهر صُنّاع الفكرة الحقيقيين.',
    dialogue: [
      {
        id: 'scene-09-jana-22',
        sceneId: 'scene-09-progress',
        speakerId: 'jana',
        speakerName: 'جنى',
        spokenText: 'ومع التقييم القبلي والمتابعة الدورية والتقييم البعدي، بنقدر نشوف كل خطوة تطور واضحة مع الوقت وبنفس الشروط.',
        subtitleText: 'مع جدول التقييم القبلي والمتابعة الدورية والتقييم البعدي، نتابع الأداء عبر الزمن في ظروف متسقة.',
        emotion: 'ثبات وموضوعية',
        estimatedDurationSec: 7.5,
        actualDurationSec: 8.64,
        audioPath: '/audio/characters/scene-09-jana-22.mp3',
        animationCue: 'speak-calm'
      },
      {
        id: 'scene-09-nour-23',
        sceneId: 'scene-09-progress',
        speakerId: 'nour',
        speakerName: 'رحمة',
        spokenText: 'المهم دايماً هو الاستمرار والمشاركة، عشان كل طفل ليه سرعته وخطواته اللي بنفرح بيها.',
        subtitleText: 'المهم دائماً هو الاستمرار والمشاركة، لأن لكل طفل سرعته وخطواته الخاصة.',
        emotion: 'تفاؤل وإنسانية',
        estimatedDurationSec: 6.5,
        actualDurationSec: 7.2,
        audioPath: '/audio/characters/scene-09-nour-23.mp3',
        animationCue: 'speak-warm'
      }
    ]
  },
  {
    id: 'scene-10-team',
    anchorId: 'team',
    order: 10,
    title: 'فريق صناعة صدى — مشروع التخرج',
    subtitle: 'فريق طلاب وطالبات المشروع وراء المضمون العلمي',
    purpose: 'تقديم فريق مشروع التخرج الحقيقي بأسمائه وأدواره الموثقة بصورة إبداعية.',
    charactersPresent: ['omar', 'nour'],
    leadCharacter: 'omar',
    accentColor: '#159D98',
    entryTransition: 'يتألق فريق طلاب وطالبات المشروع بالتوازي مع موجة الصوت.',
    exitTransition: 'تتجمع خطوط الكوكبة نحو المشهد الختامي الاحتفالي.',
    dialogue: [
      {
        id: 'scene-10-omar-24',
        sceneId: 'scene-10-team',
        speakerId: 'omar',
        speakerName: 'فهد',
        spokenText: 'وورا الأبلكيشن ده فريق من طلاب وطالبات كلية علوم الإعاقة والتأهيل بجامعة الزقازيق، اشتغلنا مع بعض تحت إشراف الدكتور عطية محمد على إعداد المحتوى العلمي والأدلة والألعاب عشان صدى يطلع بالشكل ده.',
        subtitleText: 'وورا الأبلكيشن ده فريق من طلاب وطالبات كلية علوم الإعاقة والتأهيل بجامعة الزقازيق، اشتغلنا مع بعض تحت إشراف الدكتور عطية محمد على إعداد المحتوى العلمي والأدلة والألعاب.',
        emotion: 'تقدير وفخر',
        estimatedDurationSec: 12.8,
        actualDurationSec: 13.44,
        audioPath: '/audio/characters/scene-10-omar-24.mp3',
        animationCue: 'speak-excited'
      }
    ]
  },
  {
    id: 'scene-11-dev-team',
    anchorId: 'developers',
    order: 11,
    title: 'فريق التطوير',
    subtitle: 'مهندسا برمجيات طوّرا تجربة صَـدَى الرقمية',
    purpose: 'تقديم المهندسين اللذين عملا على تطوير تجربة صدى بصورة بسيطة وودودة.',
    charactersPresent: ['jana'],
    leadCharacter: 'jana',
    accentColor: '#159D98',
    entryTransition: 'تنفتح مساحة هادئة ومرتبة لتقديم فريق التطوير.',
    exitTransition: 'تعود جنى إلى المشهد الختامي لتوديع الزوار.',
    dialogue: [
      {
        id: 'scene-11-jana-dev',
        sceneId: 'scene-11-dev-team',
        speakerId: 'jana',
        speakerName: 'جنى',
        spokenText: 'وقبل ما نخلص حكايتنا، حابة أعرفكم على المهندسين اللي اشتغلوا على تطوير صدى، أكرم وأبو الْقَاسِم.',
        subtitleText: 'وقبل ما نخلص حكايتنا، حابة أعرفكم على المهندسين اللي اشتغلوا على تطوير صدى، أكرم وأبو القاسم.',
        emotion: 'تقدير ودود',
        estimatedDurationSec: 6.5,
        actualDurationSec: 6.96,
        audioPath: '/audio/characters/scene-11-jana-dev.mp3',
        animationCue: 'speak-warm'
      }
    ]
  },
  {
    id: 'scene-12-ending',
    anchorId: 'ending',
    order: 12,
    title: 'ولكل طفل رحلة... صدى',
    subtitle: 'المشهد الختامي وتجمع الأبطال الخمسة بقيادة جنى',
    purpose: 'ختام مشجع يجمع الشخصيات الخمس وتختمه جنى بدفء ووضوح.',
    charactersPresent: ['jana', 'omar', 'maryam', 'zain', 'nour'],
    leadCharacter: 'jana',
    accentColor: '#FFC552',
    entryTransition: 'تتجمع الشخصيات الخمس في خلفية مضيئة بالنجوم والموجات.',
    exitTransition: 'زر العودة إلى بداية القصة عبر موجة الصوت.',
    dialogue: [
      {
        id: 'scene-11-nour-25',
        sceneId: 'scene-12-ending',
        speakerId: 'nour',
        speakerName: 'رحمة',
        spokenText: 'رحلتنا مع الصوت مبتخلصش هنا؛ كل محاولة ليها قيمة، وكل خطوة صغيرة بتفرق مع الطفل.',
        subtitleText: 'رحلتنا مع الصوت مبتخلصش هنا؛ كل محاولة ليها قيمة، وكل خطوة صغيرة بتفرق.',
        emotion: 'ختام متفائل',
        estimatedDurationSec: 6.5,
        actualDurationSec: 6.8,
        audioPath: '/audio/characters/scene-11-nour-25.mp3',
        animationCue: 'speak-warm'
      },
      {
        id: 'scene-12-jana-26',
        sceneId: 'scene-12-ending',
        speakerId: 'jana',
        speakerName: 'جنى',
        spokenText: 'ودي كانت حكاية صدى. مشروع بنقدمه لكم بكل فخر من كلية علوم الإعاقة والتأهيل بجامعة الزقازيق، تحت إشراف الدكتور عطية محمد. كل طفل يستحق فرصة يتعلم ويتواصل ويكتشف العالم بطريقته. وأنا جنى، مبسوطة جداً إنكم كنتوا معانا في رحلتنا دي!',
        subtitleText: 'ودي كانت حكاية صدى. مشروع بنقدمه لكم بكل فخر من كلية علوم الإعاقة والتأهيل بجامعة الزقازيق، تحت إشراف الدكتور عطية محمد. كل طفل يستحق فرصة يتعلم ويتواصل ويكتشف العالم بطريقته. وأنا جنى، مبسوطة جداً إنكم كنتوا معانا في رحلتنا دي!',
        emotion: 'ختام دافئ ومبهج',
        estimatedDurationSec: 18.0,
        actualDurationSec: 18.96,
        audioPath: '/audio/characters/scene-12-jana-26.mp3',
        animationCue: 'speak-celebrate',
        sfxCue: '/audio/sfx/finale-reveal.mp3'
      }
    ]
  }
];
