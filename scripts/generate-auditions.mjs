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
const MAX_AUDITION_BUDGET = 3000;

const CANDIDATES = [
  // OMAR (3)
  {
    id: 'omar_liam_v3',
    characterId: 'omar',
    characterName: 'عمر',
    folder: 'omar',
    voiceName: 'Liam - Energetic, Warm',
    voiceId: 'TX3LPaxmHKxFdv7VOQHJ',
    modelId: 'eleven_v3',
    text: 'أهلاً بيكم في عالم صدى! كل صوت حوالينا وراه حكاية، والنهارده هنعيش الحكاية دي مع بعض. جاهزين؟ يلا بينا!',
    settings: { stability: 0.45, similarity_boost: 0.78, style: 0.35 },
    recommended: true,
    rationale: 'صوت شبابي حيوي ودافئ يناسب دور الراوي المُرَحِّب والمبادر.',
  },
  {
    id: 'omar_charlie_v4',
    characterId: 'omar',
    characterName: 'عمر',
    folder: 'omar',
    voiceName: 'Charlie - Confident, Energetic',
    voiceId: 'IKne3meq5aSn9XLyUdCD',
    modelId: 'eleven_v4',
    text: 'أهلاً بيكم في عالم صدى! كل صوت حوالينا وراه حكاية، والنهارده هنعيش الحكاية دي مع بعض. جاهزين؟ يلا بينا!',
    settings: { stability: 0.45, similarity_boost: 0.78, style: 0.35 },
    recommended: false,
    rationale: 'نبرة واثقة وحماسية لاختبار وضوح العربية على Eleven v4.',
  },
  {
    id: 'omar_chris_v2',
    characterId: 'omar',
    characterName: 'عمر',
    folder: 'omar',
    voiceName: 'Chris - Charming, Casual',
    voiceId: 'iP95p4xoKVk53GoZ742B',
    modelId: 'eleven_multilingual_v2',
    text: 'أهلاً بيكم في عالم صدى! كل صوت حوالينا وراه حكاية، والنهارده هنعيش الحكاية دي مع بعض. جاهزين؟ يلا بينا!',
    settings: { stability: 0.5, similarity_boost: 0.8, style: 0.3 },
    recommended: false,
    rationale: 'نبرة ودودة متزنة للمقارنة مع Multilingual v2.',
  },

  // MARYAM (3)
  {
    id: 'mariam_alice_v3',
    characterId: 'maryam',
    characterName: 'مريم',
    folder: 'mariam',
    voiceName: 'Alice - Clear, Engaging Educator',
    voiceId: 'Xb7hH8MSUJpSbSDYk0k2',
    modelId: 'eleven_v3',
    text: 'مع كل صوت بيسمعه الطفل، خطوة منظمة بتساعدنا نتابع تطوره بهدوء ووضوح، من غير قلق أو ضغط.',
    settings: { stability: 0.65, similarity_boost: 0.82, style: 0.15 },
    recommended: true,
    rationale: 'مخارج واضحة ونبرة تعليمية هادئة ومطمئنة تناسب دور مريم.',
  },
  {
    id: 'mariam_bella_v4',
    characterId: 'maryam',
    characterName: 'مريم',
    folder: 'mariam',
    voiceName: 'Bella - Professional, Bright, Warm',
    voiceId: 'hpp4J3VqNfWAUOO0d1Us',
    modelId: 'eleven_v4',
    text: 'مع كل صوت بيسمعه الطفل، خطوة منظمة بتساعدنا نتابع تطوره بهدوء ووضوح، من غير قلق أو ضغط.',
    settings: { stability: 0.65, similarity_boost: 0.82, style: 0.15 },
    recommended: false,
    rationale: 'صوت تعليمي مشرق ومنظم لاختبار أداء Eleven v4.',
  },
  {
    id: 'mariam_matilda_v2',
    characterId: 'maryam',
    characterName: 'مريم',
    folder: 'mariam',
    voiceName: 'Matilda - Knowledgeable, Professional',
    voiceId: 'XrExE9yKIg1WjnnlVkGX',
    modelId: 'eleven_multilingual_v2',
    text: 'مع كل صوت بيسمعه الطفل، خطوة منظمة بتساعدنا نتابع تطوره بهدوء ووضوح، من غير قلق أو ضغط.',
    settings: { stability: 0.68, similarity_boost: 0.82, style: 0.12 },
    recommended: false,
    rationale: 'طبقة رصينة واضحة على Multilingual v2.',
  },

  // ZAIN (3)
  {
    id: 'zein_will_v3',
    characterId: 'zain',
    characterName: 'زين',
    folder: 'zein',
    voiceName: 'Will - Relaxed Optimist',
    voiceId: 'bIHbv24MWmeRgasZH58o',
    modelId: 'eleven_v3',
    text: 'استنوا لحظة... هو ليه ساعات أصوات الكلام بتحتاج تركيز وتدريب زيادة عشان نفهم معناها؟',
    settings: { stability: 0.45, similarity_boost: 0.78, style: 0.3 },
    recommended: true,
    rationale: 'صوت شبابي خفيف ومتسائل يميّز زين بوضوح عن عمر.',
  },
  {
    id: 'zein_river_v4',
    characterId: 'zain',
    characterName: 'زين',
    folder: 'zein',
    voiceName: 'River - Relaxed, Informative',
    voiceId: 'SAz9YHcvj6GT2YYXdXww',
    modelId: 'eleven_v4',
    text: 'استنوا لحظة... هو ليه ساعات أصوات الكلام بتحتاج تركيز وتدريب زيادة عشان نفهم معناها؟',
    settings: { stability: 0.5, similarity_boost: 0.8, style: 0.25 },
    recommended: false,
    rationale: 'صوت محايد هادئ يعبر عن الفضول التأملي على Eleven v4.',
  },
  {
    id: 'zein_eric_v2',
    characterId: 'zain',
    characterName: 'زين',
    folder: 'zein',
    voiceName: 'Eric - Smooth, Trustworthy',
    voiceId: 'cjVigY5qzO86Huf0OWal',
    modelId: 'eleven_multilingual_v2',
    text: 'استنوا لحظة... هو ليه ساعات أصوات الكلام بتحتاج تركيز وتدريب زيادة عشان نفهم معناها؟',
    settings: { stability: 0.5, similarity_boost: 0.8, style: 0.25 },
    recommended: false,
    rationale: 'طبقة تينور سلسة لاختبار التمييز الصوتي على Multilingual v2.',
  },

  // NOUR (3)
  {
    id: 'nour_sarah_v3',
    characterId: 'nour',
    characterName: 'نور',
    folder: 'nour',
    voiceName: 'Sarah - Reassuring, Warm',
    voiceId: 'EXAVITQu4vr4xnSDxMaL',
    modelId: 'eleven_v3',
    text: 'في البيت الهادئ ومع كل كلمة تشجيع دافية، رحلة الاستماع بتبقى أجمل وأقرب لقلب الطفل.',
    settings: { stability: 0.58, similarity_boost: 0.82, style: 0.2 },
    recommended: true,
    rationale: 'صوت دافئ حنون يعبّر عن الاحتواء الأسري والتفاؤل في شخصية نور.',
  },
  {
    id: 'nour_lily_v4',
    characterId: 'nour',
    characterName: 'نور',
    folder: 'nour',
    voiceName: 'Lily - Velvety, Warm',
    voiceId: 'pFZP5JQG7iQjIQuC4Bku',
    modelId: 'eleven_v4',
    text: 'في البيت الهادئ ومع كل كلمة تشجيع دافية، رحلة الاستماع بتبقى أجمل وأقرب لقلب الطفل.',
    settings: { stability: 0.6, similarity_boost: 0.82, style: 0.2 },
    recommended: false,
    rationale: 'نبرة مخملية دافئة على Eleven v4.',
  },
  {
    id: 'nour_bella_v2',
    characterId: 'nour',
    characterName: 'نور',
    folder: 'nour',
    voiceName: 'Bella - Warm Narrator',
    voiceId: 'hpp4J3VqNfWAUOO0d1Us',
    modelId: 'eleven_multilingual_v2',
    text: 'في البيت الهادئ ومع كل كلمة تشجيع دافية، رحلة الاستماع بتبقى أجمل وأقرب لقلب الطفل.',
    settings: { stability: 0.6, similarity_boost: 0.82, style: 0.18 },
    recommended: false,
    rationale: 'نبرة سردية دافئة لاختبار Multilingual v2.',
  },

  // SARAH (3)
  {
    id: 'sara_jessica_v3',
    characterId: 'sarah',
    characterName: 'سارة',
    folder: 'sara',
    voiceName: 'Jessica - Playful, Bright, Warm',
    voiceId: 'cgSgspJ2msm6clMCkdW9',
    modelId: 'eleven_v3',
    text: 'يا سلام! كل محاولة شاطرة ليها نجمة بتلمع... جاهزين نلعب مع الأصوات ونحتفل؟',
    settings: { stability: 0.38, similarity_boost: 0.78, style: 0.45 },
    recommended: true,
    rationale: 'أكثر الأصوات حيوية وبهجة وملاءمة لطاقة سارة المحبة للألعاب.',
  },
  {
    id: 'sara_laura_v4',
    characterId: 'sarah',
    characterName: 'سارة',
    folder: 'sara',
    voiceName: 'Laura - Enthusiast, Sunny',
    voiceId: 'FGY2WhTYpPnrIDTdsKH5',
    modelId: 'eleven_v4',
    text: 'يا سلام! كل محاولة شاطرة ليها نجمة بتلمع... جاهزين نلعب مع الأصوات ونحتفل؟',
    settings: { stability: 0.4, similarity_boost: 0.78, style: 0.42 },
    recommended: false,
    rationale: 'نبرة مرحة متحمسة على Eleven v4.',
  },
  {
    id: 'sara_jessica_v4',
    characterId: 'sarah',
    characterName: 'سارة',
    folder: 'sara',
    voiceName: 'Jessica - Playful, Bright, Warm',
    voiceId: 'cgSgspJ2msm6clMCkdW9',
    modelId: 'eleven_v4',
    text: 'يا سلام! كل محاولة شاطرة ليها نجمة بتلمع... جاهزين نلعب مع الأصوات ونحتفل؟',
    settings: { stability: 0.38, similarity_boost: 0.78, style: 0.45 },
    recommended: false,
    rationale: 'نفس صوت سارة على Eleven v4 للمقارنة المباشرة بين النموذجين.',
  },
];

const CONVERSATION_TURNS = [
  {
    id: 'conv_01_omar',
    characterId: 'omar',
    characterName: 'عمر',
    voiceName: 'Liam',
    voiceId: 'TX3LPaxmHKxFdv7VOQHJ',
    modelId: 'eleven_v3',
    text: 'أهلاً يا أصحاب! سمعتوا رنة الجرس دي؟',
    settings: { stability: 0.45, similarity_boost: 0.78, style: 0.35 },
  },
  {
    id: 'conv_02_zein',
    characterId: 'zain',
    characterName: 'زين',
    voiceName: 'Will',
    voiceId: 'bIHbv24MWmeRgasZH58o',
    modelId: 'eleven_v3',
    text: 'آه سمعتها! بس قولي يا مريم، هو ليه مهم نميّز بين كل صوت والتاني؟',
    settings: { stability: 0.45, similarity_boost: 0.78, style: 0.3 },
  },
  {
    id: 'conv_03_mariam',
    characterId: 'maryam',
    characterName: 'مريم',
    voiceName: 'Alice',
    voiceId: 'Xb7hH8MSUJpSbSDYk0k2',
    modelId: 'eleven_v3',
    text: 'عشان كل صوت ليه تردد ومعنى، ومع المتابعة المنظمة بنشوف تطور الطفل خطوة بخطوة.',
    settings: { stability: 0.65, similarity_boost: 0.82, style: 0.15 },
  },
  {
    id: 'conv_04_sara',
    characterId: 'sarah',
    characterName: 'سارة',
    voiceName: 'Jessica',
    voiceId: 'cgSgspJ2msm6clMCkdW9',
    modelId: 'eleven_v3',
    text: 'والأحلى إن كل خطوة شاطرة بتجمع لينا نجمة جديدة في صدى!',
    settings: { stability: 0.38, similarity_boost: 0.78, style: 0.45 },
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

async function synthesize(item, outPath) {
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

  const res = await fetch(`${BASE}/v1/text-to-speech/${item.voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`TTS failed (${res.status}) for ${item.id}: ${errText.slice(0, 200)}`);
  }

  const costHeader = res.headers.get('character-cost');
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
  return {
    bytes: buf.length,
    creditsConsumed: costHeader ? Number(costHeader) : item.text.length,
  };
}

// Measure actual audio durations in headless Chromium via <audio> loadedmetadata
async function measureDurationsWithChrome(filePaths) {
  const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const CDP_PORT = 9237;
  const USER_DATA_DIR = `C:/Users/pc/.gemini/antigravity/brain/32ad853c-6cd5-4939-8ab0-3ba13f4ce140/scratch/chrome_aud_${Date.now()}`;
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
  const estTotalChars =
    CANDIDATES.reduce((s, c) => s + c.text.length, 0) +
    CONVERSATION_TURNS.reduce((s, c) => s + c.text.length, 0);

  if (estTotalChars > MAX_AUDITION_BUDGET || estTotalChars > remainingBefore) {
    throw new Error(`Estimated ${estTotalChars} chars exceeds budget (${MAX_AUDITION_BUDGET}) or balance (${remainingBefore})`);
  }

  let existing = { auditions: [], conversation: [] };
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      existing = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    } catch {}
  }
  const existingMap = new Map([...(existing.auditions || []), ...(existing.conversation || [])].map((e) => [e.id, e]));

  let creditsSpentRun = 0;
  const generatedPaths = [];
  const auditionEntries = [];
  const convEntries = [];

  for (const cand of CANDIDATES) {
    const relPath = `/audio/auditions/${cand.folder}/${cand.id}.mp3`;
    const absPath = path.join(OUT_ROOT, cand.folder, `${cand.id}.mp3`);
    const hash = hashItem(cand);
    const prev = existingMap.get(cand.id);

    let bytes = 0;
    let creditsConsumed = 0;
    if (prev && prev.contentHash === hash && fs.existsSync(absPath) && fs.statSync(absPath).size > 1000) {
      bytes = fs.statSync(absPath).size;
    } else {
      const r = await synthesize(cand, absPath);
      bytes = r.bytes;
      creditsConsumed = r.creditsConsumed;
      creditsSpentRun += creditsConsumed;
    }

    generatedPaths.push(absPath);
    auditionEntries.push({
      id: cand.id,
      characterId: cand.characterId,
      characterName: cand.characterName,
      voiceName: cand.voiceName,
      voiceId: cand.voiceId,
      modelId: cand.modelId,
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

  for (const turn of CONVERSATION_TURNS) {
    const relPath = `/audio/auditions/conversations/${turn.id}.mp3`;
    const absPath = path.join(OUT_ROOT, 'conversations', `${turn.id}.mp3`);
    const hash = hashItem(turn);
    const prev = existingMap.get(turn.id);

    let bytes = 0;
    let creditsConsumed = 0;
    if (prev && prev.contentHash === hash && fs.existsSync(absPath) && fs.statSync(absPath).size > 1000) {
      bytes = fs.statSync(absPath).size;
    } else {
      const r = await synthesize(turn, absPath);
      bytes = r.bytes;
      creditsConsumed = r.creditsConsumed;
      creditsSpentRun += creditsConsumed;
    }

    generatedPaths.push(absPath);
    convEntries.push({
      id: turn.id,
      characterId: turn.characterId,
      characterName: turn.characterName,
      voiceName: turn.voiceName,
      voiceId: turn.voiceId,
      modelId: turn.modelId,
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

  const durations = await measureDurationsWithChrome(generatedPaths);
  for (const entry of [...auditionEntries, ...convEntries]) {
    const d = durations[entry._absPath];
    entry.durationSec = d?.ok ? d.duration : 0;
    entry.status = d?.ok && d.duration > 0 ? 'verified' : 'invalid';
    delete entry._absPath;
  }

  const afterSub = await getSub();
  const manifestOut = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    subscriptionTier: afterSub.tier,
    creditsBefore: remainingBefore,
    creditsAfter: afterSub.character_limit - afterSub.character_count,
    creditsUsedThisRun: creditsSpentRun,
    auditionBudgetCap: MAX_AUDITION_BUDGET,
    auditions: auditionEntries,
    conversation: convEntries,
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifestOut, null, 2));
  console.log(JSON.stringify({
    creditsBefore: manifestOut.creditsBefore,
    creditsAfter: manifestOut.creditsAfter,
    creditsUsedThisRun: creditsSpentRun,
    auditionsCount: auditionEntries.length,
    verifiedAuditions: auditionEntries.filter((a) => a.status === 'verified').length,
    conversationCount: convEntries.length,
    verifiedConversation: convEntries.filter((c) => c.status === 'verified').length,
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
