import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';

function loadApiKey() {
  const envPath = path.resolve(process.cwd(), '.env');
  const raw = fs.readFileSync(envPath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*ELEVENLABS_API_KEY\s*=\s*(.+?)\s*$/);
    if (m) return m[1].replace(/^["']|["']$/g, '');
  }
  throw new Error('ELEVENLABS_API_KEY not found in .env');
}

const API_KEY = loadApiKey();
const BASE = 'https://api.elevenlabs.io';
const OUT_ROOT = path.resolve(process.cwd(), 'public/audio/auditions');
const MANIFEST_PATH = path.resolve(process.cwd(), 'public/audio/audition-manifest.json');
const TOTAL_AUDITION_BUDGET = 3000;
const PREVIOUS_SPENT_AUDITIONS = 1524;
const REMAINING_AUDITION_BUDGET = TOTAL_AUDITION_BUDGET - PREVIOUS_SPENT_AUDITIONS; // 1476

const EGYPTIAN_CANDIDATES = [
  // OMAR (3 models: v3, v4, multilingual_v2) — welcoming, excited, encouraging
  {
    id: 'omar_eg_mawardy_v3',
    characterId: 'omar',
    characterName: 'عمر',
    folder: 'omar',
    tier: 'egyptian-library',
    accent: 'egyptian',
    voiceName: 'Mawardy - Warm, Natural Egyptian',
    voiceId: 'PmRaqkJ2uk3Y9jrp9UjJ',
    publicOwnerId: '7f327d7004f4b03209c9ab261a20a69012fc9f69de23345452df0d321462d252',
    modelId: 'eleven_v3',
    emotionTag: 'حماس وترحيب',
    text: 'أهلاً بيكم في عالم صدى! كل صوت حوالينا وراه حكاية، جاهزين نبدأ رحلتنا مع بعض؟ يلا بينا!',
    settings: { stability: 0.45, similarity_boost: 0.78, style: 0.32 },
    recommended: true,
    rationale: 'صوت شاب مصري أصيل، دافئ ومُرحّب بإيقاع طبيعي قريب من الأطفال دون مبالغة.',
  },
  {
    id: 'omar_eg_mostafa_v4',
    characterId: 'omar',
    characterName: 'عمر',
    folder: 'omar',
    tier: 'egyptian-library',
    accent: 'egyptian',
    voiceName: 'Mostafa - Bold and Spirited',
    voiceId: 'QvNF0qyyt1Tuy1YAmnzH',
    publicOwnerId: '64cbc624eb5aab4e95a968e1f41d75402277cca6e549036ed17e56ea33bbbc9e',
    modelId: 'eleven_v4',
    emotionTag: 'تشجيع ومغامرة',
    text: 'أهلاً بيكم في عالم صدى! كل صوت حوالينا وراه حكاية، جاهزين نبدأ رحلتنا مع بعض؟ يلا بينا!',
    settings: { stability: 0.45, similarity_boost: 0.78, style: 0.3 },
    recommended: false,
    rationale: 'صوت شاب مصري متحمس وقوي الحضور لاختبار نبرة التشجيع على نموذج Eleven v4.',
  },
  {
    id: 'omar_eg_haytham_v2',
    characterId: 'omar',
    characterName: 'عمر',
    folder: 'omar',
    tier: 'egyptian-library',
    accent: 'egyptian',
    voiceName: 'Haytham - Energetic, Warm and Cheerful',
    voiceId: 'IES4nrmZdUBHByLBde0P',
    publicOwnerId: '3d998c483296bb27f46ec1449845265d57d55797749b21aeae5502741b9b62d0',
    modelId: 'eleven_multilingual_v2',
    emotionTag: 'حوار دافئ',
    text: 'أهلاً بيكم في عالم صدى! كل صوت حوالينا وراه حكاية، جاهزين نبدأ رحلتنا مع بعض؟ يلا بينا!',
    settings: { stability: 0.5, similarity_boost: 0.8, style: 0.25 },
    recommended: false,
    rationale: 'صوت سردي مصري دافئ ومشرق متاح مسبقًا في حسابك لاختبار Multilingual v2.',
  },

  // MARYAM (2 paid-exclusive Egyptian voices: v3, v4) — calm explanation, clear terminology
  {
    id: 'mariam_eg_alice_v3',
    characterId: 'maryam',
    characterName: 'مريم',
    folder: 'mariam',
    tier: 'egyptian-library',
    accent: 'egyptian',
    voiceName: 'Alice (EG) - Smooth, Charming and Soft',
    voiceId: 'LjKPkQHpXCsWoy7Pjq4U',
    publicOwnerId: 'a19cc83fd488e59a4099581e51d919f40652d57c4f902e4917254f2fa22448b8',
    modelId: 'eleven_v3',
    emotionTag: 'شرح هادئ ومطمئن',
    text: 'مع أصوات لينج الستة، كل تقييم منظّم بيساعدنا نتابع تطور سمع الطفل بهدوء ووضوح.',
    settings: { stability: 0.65, similarity_boost: 0.82, style: 0.15 },
    recommended: true,
    rationale: 'صوت مصري نسائي شاب ناعم وواضح المخارج يجمع بين الدفء والدقة العلمية للمصطلحات.',
  },
  {
    id: 'mariam_eg_asmaa_v4',
    characterId: 'maryam',
    characterName: 'مريم',
    folder: 'mariam',
    tier: 'egyptian-library',
    accent: 'egyptian',
    voiceName: 'Asmaa - Natural & Engaging Egyptian',
    voiceId: 'NwMzeQCEU9Ecy3zXYTkV',
    publicOwnerId: '4d597f99335f77ceb96852f4a0b677fc674d277ae0c14a6828ab26e5a1bdad1a',
    modelId: 'eleven_v4',
    emotionTag: 'توضيح علمي',
    text: 'مع أصوات لينج الستة، كل تقييم منظّم بيساعدنا نتابع تطور سمع الطفل بهدوء ووضوح.',
    settings: { stability: 0.65, similarity_boost: 0.82, style: 0.15 },
    recommended: false,
    rationale: 'صوت مصري هادئ وطبيعي (حصري للخطة المدفوعة) لاختبار نطق المصطلحات على Eleven v4.',
  },

  // ZAIN (2 young Egyptian voices: v3, v4) — curiosity, surprise, questioning
  {
    id: 'zein_eg_ziad_v3',
    characterId: 'zain',
    characterName: 'زين',
    folder: 'zein',
    tier: 'egyptian-library',
    accent: 'egyptian',
    voiceName: 'Ziad - Dynamic and Vibrant',
    voiceId: '5REPlS2Ja1VZ7zNA0ykn',
    publicOwnerId: '64cbc624eb5aab4e95a968e1f41d75402277cca6e549036ed17e56ea33bbbc9e',
    modelId: 'eleven_v3',
    emotionTag: 'فضول وتساؤل',
    text: 'استنوا لحظة! هو إزاي بنفرق بين الصوت القصير والطويل لما الكلمات تتشابه؟ يلا نكتشف!',
    settings: { stability: 0.42, similarity_boost: 0.78, style: 0.34 },
    recommended: true,
    rationale: 'صوت شاب مصري حيوي بطبقة أخف وإيقاع فضولي يميّز شخصية زين تمامًا عن عمر.',
  },
  {
    id: 'zein_eg_sattar_v4',
    characterId: 'zain',
    characterName: 'زين',
    folder: 'zein',
    tier: 'egyptian-library',
    accent: 'egyptian',
    voiceName: 'Sattar - Warm Egyptian explainer',
    voiceId: 'Y65Dz2XsznJl6gZHkXPi',
    publicOwnerId: '1702a835ae3f74bfeaed8d6ef8dc3eb8022e3ff85ca6cbfc79ad99a606ee6150',
    modelId: 'eleven_v4',
    emotionTag: 'دهشة واستكشاف',
    text: 'استنوا لحظة! هو إزاي بنفرق بين الصوت القصير والطويل لما الكلمات تتشابه؟ يلا نكتشف!',
    settings: { stability: 0.48, similarity_boost: 0.8, style: 0.28 },
    recommended: false,
    rationale: 'عامية مصرية يومية سريعة وطبيعية بأسلوب صديق يشرح ويسأل بذكاء على Eleven v4.',
  },

  // NOUR (2 soft/melodic Egyptian female voices: v3, v4) — calm family reassurance
  {
    id: 'nour_eg_nadia_v3',
    characterId: 'nour',
    characterName: 'نور',
    folder: 'nour',
    tier: 'egyptian-library',
    accent: 'egyptian',
    voiceName: 'Nadia - Sweet and Melodic',
    voiceId: '80le32Uz2DfWFo4Foz0p',
    publicOwnerId: '64cbc624eb5aab4e95a968e1f41d75402277cca6e549036ed17e56ea33bbbc9e',
    modelId: 'eleven_v3',
    emotionTag: 'طمأنينة ودفء أسري',
    text: 'متابعة البيت الهادية مع طفلكم كل يوم بتفرق كتير، وكل خطوة صغيرة لها قيمة كبيرة.',
    settings: { stability: 0.62, similarity_boost: 0.82, style: 0.2 },
    recommended: true,
    rationale: 'نبرة مصرية ناعمة وعذبة ومليئة بالدفء الأسري، تختلف بوضوح عن نبرة مريم التعليمية.',
  },
  {
    id: 'nour_eg_ghozlan_v4',
    characterId: 'nour',
    characterName: 'نور',
    folder: 'nour',
    tier: 'egyptian-library',
    accent: 'egyptian',
    voiceName: 'Ghozlan - Soft Clear Conversational',
    voiceId: 'xPcC3nehhziQaOrIeAwv',
    publicOwnerId: '7398804d9eaf2f463899a907587c33a390591775784f87857b6d0e1e4e3e66f6',
    modelId: 'eleven_v4',
    emotionTag: 'حوار هادئ',
    text: 'متابعة البيت الهادية مع طفلكم كل يوم بتفرق كتير، وكل خطوة صغيرة لها قيمة كبيرة.',
    settings: { stability: 0.62, similarity_boost: 0.8, style: 0.18 },
    recommended: false,
    rationale: 'أسلوب مصري هادئ ومريح للأذن مناسب لتوجيه الأهل ومشاهد التهدئة على Eleven v4.',
  },

  // SARAH (2 vibrant Egyptian female voices: v3, multilingual_v2) — happiness, games, celebration
  {
    id: 'sara_eg_farida_v3',
    characterId: 'sarah',
    characterName: 'سارة',
    folder: 'sara',
    tier: 'egyptian-library',
    accent: 'egyptian',
    voiceName: 'Farida - Lively and Radiant',
    voiceId: '6aXW46RTUz6Y2lkBGQ1a',
    publicOwnerId: '64cbc624eb5aab4e95a968e1f41d75402277cca6e549036ed17e56ea33bbbc9e',
    modelId: 'eleven_v3',
    emotionTag: 'بهجة واحتفال',
    text: 'يا سلام! دلوقتي جه وقت اللعب؛ كل محاولة شاطرة في صدى بتجمع لنا نجمة جديدة!',
    settings: { stability: 0.38, similarity_boost: 0.78, style: 0.42 },
    recommended: true,
    rationale: 'صوت شاب مشرق ومبهج بطاقة حقيقية تناسب عالم الألعاب والتشجيع دون تصنّع كرتوني.',
  },
  {
    id: 'sara_eg_fatima_v2',
    characterId: 'sarah',
    characterName: 'سارة',
    folder: 'sara',
    tier: 'egyptian-library',
    accent: 'egyptian',
    voiceName: 'Fatima - Expressive Egyptian',
    voiceId: 'I3u6waC588j43py1kDN2',
    publicOwnerId: '7398804d9eaf2f463899a907587c33a390591775784f87857b6d0e1e4e3e66f6',
    modelId: 'eleven_multilingual_v2',
    emotionTag: 'حماس تلقائي',
    text: 'يا سلام! دلوقتي جه وقت اللعب؛ كل محاولة شاطرة في صدى بتجمع لنا نجمة جديدة!',
    settings: { stability: 0.45, similarity_boost: 0.8, style: 0.35 },
    recommended: false,
    rationale: 'تلقائية مصرية دافئة ومعبّرة لاختبار الأداء العاطفي على Multilingual v2.',
  },
];

const EGYPTIAN_CONVERSATION_TURNS = [
  {
    id: 'conv_eg_01_omar',
    characterId: 'omar',
    characterName: 'عمر',
    voiceName: 'Mawardy (EG)',
    voiceId: 'PmRaqkJ2uk3Y9jrp9UjJ',
    publicOwnerId: '7f327d7004f4b03209c9ab261a20a69012fc9f69de23345452df0d321462d252',
    modelId: 'eleven_v3',
    text: 'أهلاً يا أصحاب! سمعتوا رنة الجرس دي؟',
    settings: { stability: 0.45, similarity_boost: 0.78, style: 0.32 },
  },
  {
    id: 'conv_eg_02_zein',
    characterId: 'zain',
    characterName: 'زين',
    voiceName: 'Ziad (EG)',
    voiceId: '5REPlS2Ja1VZ7zNA0ykn',
    publicOwnerId: '64cbc624eb5aab4e95a968e1f41d75402277cca6e549036ed17e56ea33bbbc9e',
    modelId: 'eleven_v3',
    text: 'آه سمعتها! بس قولي يا مريم، هو ليه مهم نميّز كل صوت؟',
    settings: { stability: 0.42, similarity_boost: 0.78, style: 0.34 },
  },
  {
    id: 'conv_eg_03_mariam',
    characterId: 'maryam',
    characterName: 'مريم',
    voiceName: 'Alice (EG)',
    voiceId: 'LjKPkQHpXCsWoy7Pjq4U',
    publicOwnerId: 'a19cc83fd488e59a4099581e51d919f40652d57c4f902e4917254f2fa22448b8',
    modelId: 'eleven_v3',
    text: 'عشان كل صوت له تردد ومعنى، وبالمتابعة بنشوف التطور بوضوح.',
    settings: { stability: 0.65, similarity_boost: 0.82, style: 0.15 },
  },
  {
    id: 'conv_eg_04_sara',
    characterId: 'sarah',
    characterName: 'سارة',
    voiceName: 'Farida (EG)',
    voiceId: '6aXW46RTUz6Y2lkBGQ1a',
    publicOwnerId: '64cbc624eb5aab4e95a968e1f41d75402277cca6e549036ed17e56ea33bbbc9e',
    modelId: 'eleven_v3',
    text: 'والأحلى إن كل خطوة بتجمع لنا نجمة جديدة في صدى!',
    settings: { stability: 0.38, similarity_boost: 0.78, style: 0.42 },
  },
];

function hashItem(item) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify({ voiceId: item.voiceId, modelId: item.modelId, text: item.text, settings: item.settings }))
    .digest('hex')
    .slice(0, 16);
}

async function getSub() {
  const res = await fetch(`${BASE}/v1/user/subscription`, { headers: { 'xi-api-key': API_KEY } });
  if (!res.ok) throw new Error(`Subscription error ${res.status}`);
  return await res.json();
}

async function getMyVoiceIds() {
  const res = await fetch(`${BASE}/v1/voices`, { headers: { 'xi-api-key': API_KEY } });
  if (!res.ok) throw new Error(`Voices error ${res.status}`);
  const data = await res.json();
  return new Set((data.voices || []).map((v) => v.voice_id));
}

async function ensureVoiceInAccount(voiceId, publicOwnerId, name, myVoiceIds) {
  if (myVoiceIds.has(voiceId)) return;
  const res = await fetch(`${BASE}/v1/voices/add/${publicOwnerId}/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ new_name: name.slice(0, 64) }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Adding shared voice ${voiceId} failed (${res.status}): ${errText.slice(0, 200)}`);
  }
  myVoiceIds.add(voiceId);
}

async function synthesize(item, outPath, myVoiceIds) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const body = {
    text: item.text,
    model_id: item.modelId,
    voice_settings: {
      stability: item.settings.stability,
      similarity_boost: item.settings.similarity_boost,
      style: item.settings.style,
      use_speaker_boost: true,
    },
  };

  let res = await fetch(`${BASE}/v1/text-to-speech/${item.voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify(body),
  });

  if (res.status === 404 || res.status === 400) {
    if (item.publicOwnerId) {
      await ensureVoiceInAccount(item.voiceId, item.publicOwnerId, item.voiceName, myVoiceIds);
      res = await fetch(`${BASE}/v1/text-to-speech/${item.voiceId}?output_format=mp3_44100_128`, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify(body),
      });
    }
  }

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`TTS failed (${res.status}) for ${item.id}: ${errText.slice(0, 220)}`);
  }

  const costHeader = res.headers.get('character-cost');
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
  return {
    bytes: buf.length,
    creditsConsumed: costHeader ? Number(costHeader) : item.text.length,
  };
}

async function measureDurationsWithChrome(filePaths) {
  const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const CDP_PORT = 9238;
  const USER_DATA_DIR = `C:/Users/pc/.gemini/antigravity/brain/32ad853c-6cd5-4939-8ab0-3ba13f4ce140/scratch/chrome_aud_eg_${Date.now()}`;
  fs.mkdirSync(USER_DATA_DIR, { recursive: true });

  const chrome = spawn(
    CHROME_PATH,
    ['--headless=new', `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${USER_DATA_DIR}`, '--no-first-run', 'about:blank'],
    { stdio: 'ignore' }
  );

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const results = {};

  try {
    let targets = null;
    for (let i = 0; i < 30; i++) {
      try {
        const r = await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`);
        if (r.ok) {
          targets = await r.json();
          break;
        }
      } catch {}
      await sleep(200);
    }
    const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.addEventListener('open', res, { once: true });
      ws.addEventListener('error', rej, { once: true });
    });

    let msgId = 0;
    const pending = new Map();
    ws.addEventListener('message', (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && pending.has(m.id)) {
        const { resolve, reject } = pending.get(m.id);
        pending.delete(m.id);
        if (m.error) reject(new Error(JSON.stringify(m.error)));
        else resolve(m.result);
      }
    });
    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = ++msgId;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });

    await send('Runtime.enable');

    for (const fp of filePaths) {
      const buf = fs.readFileSync(fp);
      const dataUri = `data:audio/mpeg;base64,${buf.toString('base64')}`;
      const evalRes = await send('Runtime.evaluate', {
        awaitPromise: true,
        returnByValue: true,
        expression: `new Promise((resolve) => {
          const a = new Audio(${JSON.stringify(dataUri)});
          a.addEventListener('loadedmetadata', () => resolve({ ok: true, duration: Number(a.duration.toFixed(2)) }), { once: true });
          a.addEventListener('error', () => resolve({ ok: false, duration: 0 }), { once: true });
        })`,
      });
      results[fp] = evalRes.result.value;
    }

    ws.close();
  } finally {
    try { chrome.kill(); } catch {}
    try { fs.rmSync(USER_DATA_DIR, { recursive: true, force: true }); } catch {}
  }

  return results;
}

async function main() {
  const beforeSub = await getSub();
  const remainingBefore = beforeSub.character_limit - beforeSub.character_count;
  const estChars =
    EGYPTIAN_CANDIDATES.reduce((s, c) => s + c.text.length, 0) +
    EGYPTIAN_CONVERSATION_TURNS.reduce((s, c) => s + c.text.length, 0);

  if (estChars > REMAINING_AUDITION_BUDGET || estChars > remainingBefore) {
    throw new Error(
      `Estimated ${estChars} chars exceeds remaining audition cap (${REMAINING_AUDITION_BUDGET}) or balance (${remainingBefore})`
    );
  }

  const prevManifest = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
    : { auditions: [], conversation: [] };

  const prevAuditionsClean = (prevManifest.auditions || [])
    .filter((a) => !a.id.includes('_eg_'))
    .map((a) => ({
      ...a,
      tier: a.tier || 'premade-reference',
      accent: a.accent || 'multilingual',
      recommended: false,
    }));
  const prevConvClean = (prevManifest.conversation || [])
    .filter((c) => !c.id.startsWith('conv_eg_'))
    .map((c) => ({ ...c, tier: c.tier || 'premade-reference' }));

  const existingById = new Map(
    [...(prevManifest.auditions || []), ...(prevManifest.conversation || [])].map((e) => [e.id, e])
  );

  const myVoiceIds = await getMyVoiceIds();
  let creditsSpentThisRun = 0;
  const pathsToMeasure = [];
  const newAuditionEntries = [];
  const newConvEntries = [];

  for (const cand of EGYPTIAN_CANDIDATES) {
    const relPath = `/audio/auditions/${cand.folder}/${cand.id}.mp3`;
    const absPath = path.join(OUT_ROOT, cand.folder, `${cand.id}.mp3`);
    const hash = hashItem(cand);
    const prev = existingById.get(cand.id);

    let bytes = 0;
    let creditsConsumed = 0;
    if (prev && prev.contentHash === hash && fs.existsSync(absPath) && fs.statSync(absPath).size > 2000) {
      bytes = fs.statSync(absPath).size;
    } else {
      if (creditsSpentThisRun + cand.text.length > REMAINING_AUDITION_BUDGET) {
        throw new Error('Audition remaining budget guard reached!');
      }
      const r = await synthesize(cand, absPath, myVoiceIds);
      bytes = r.bytes;
      creditsConsumed = r.creditsConsumed;
      creditsSpentThisRun += creditsConsumed;
    }

    pathsToMeasure.push(absPath);
    newAuditionEntries.push({
      id: cand.id,
      characterId: cand.characterId,
      characterName: cand.characterName,
      voiceName: cand.voiceName,
      voiceId: cand.voiceId,
      modelId: cand.modelId,
      tier: cand.tier,
      accent: cand.accent,
      emotionTag: cand.emotionTag,
      text: cand.text,
      settings: cand.settings,
      recommended: cand.recommended,
      rationale: cand.rationale,
      audioPath: relPath,
      fileSizeBytes: bytes,
      durationSec: 0,
      contentHash: hash,
      creditsConsumed,
      status: 'generated',
      _absPath: absPath,
    });
  }

  for (const turn of EGYPTIAN_CONVERSATION_TURNS) {
    const relPath = `/audio/auditions/conversations/${turn.id}.mp3`;
    const absPath = path.join(OUT_ROOT, 'conversations', `${turn.id}.mp3`);
    const hash = hashItem(turn);
    const prev = existingById.get(turn.id);

    let bytes = 0;
    let creditsConsumed = 0;
    if (prev && prev.contentHash === hash && fs.existsSync(absPath) && fs.statSync(absPath).size > 2000) {
      bytes = fs.statSync(absPath).size;
    } else {
      if (creditsSpentThisRun + turn.text.length > REMAINING_AUDITION_BUDGET) {
        throw new Error('Audition remaining budget guard reached!');
      }
      const r = await synthesize(turn, absPath, myVoiceIds);
      bytes = r.bytes;
      creditsConsumed = r.creditsConsumed;
      creditsSpentThisRun += creditsConsumed;
    }

    pathsToMeasure.push(absPath);
    newConvEntries.push({
      id: turn.id,
      characterId: turn.characterId,
      characterName: turn.characterName,
      voiceName: turn.voiceName,
      voiceId: turn.voiceId,
      modelId: turn.modelId,
      tier: 'egyptian-library',
      text: turn.text,
      settings: turn.settings,
      audioPath: relPath,
      fileSizeBytes: bytes,
      durationSec: 0,
      contentHash: hash,
      creditsConsumed,
      status: 'generated',
      _absPath: absPath,
    });
  }

  const durations = await measureDurationsWithChrome(pathsToMeasure);
  for (const entry of [...newAuditionEntries, ...newConvEntries]) {
    const d = durations[entry._absPath];
    entry.durationSec = d?.ok ? d.duration : 0;
    entry.status = d?.ok && d.duration > 0 ? 'verified' : 'invalid';
    delete entry._absPath;
  }

  const afterSub = await getSub();
  const totalAuditionCreditsConsumed = PREVIOUS_SPENT_AUDITIONS + creditsSpentThisRun;

  const manifestOut = {
    version: '2.0.0',
    generatedAt: new Date().toISOString(),
    subscriptionTier: afterSub.tier,
    creditsBefore: remainingBefore,
    creditsAfter: afterSub.character_limit - afterSub.character_count,
    previousAuditionCredits: PREVIOUS_SPENT_AUDITIONS,
    creditsUsedThisRun: creditsSpentThisRun,
    totalAuditionCreditsConsumed,
    auditionBudgetCap: TOTAL_AUDITION_BUDGET,
    auditions: [...newAuditionEntries, ...prevAuditionsClean],
    conversation: [...newConvEntries, ...prevConvClean],
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifestOut, null, 2));
  console.log(JSON.stringify({
    tier: afterSub.tier,
    creditsBefore: manifestOut.creditsBefore,
    creditsAfter: manifestOut.creditsAfter,
    creditsUsedThisRun: creditsSpentThisRun,
    totalAuditionCreditsConsumed,
    remainingOf3000Budget: TOTAL_AUDITION_BUDGET - totalAuditionCreditsConsumed,
    newEgyptianAuditions: newAuditionEntries.length,
    verifiedEgyptianAuditions: newAuditionEntries.filter((a) => a.status === 'verified').length,
    totalAuditionsStored: manifestOut.auditions.length,
    newEgyptianConversation: newConvEntries.length,
    verifiedEgyptianConversation: newConvEntries.filter((c) => c.status === 'verified').length,
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
