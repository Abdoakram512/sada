import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';

/**
 * Phase 6 Cache-Aware Production Audio Generator
 * Usage (ONLY after user approves the 5 voices):
 *   node scripts/generate-production-audio.mjs [path/to/approved-voices.json]
 */

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
const MAX_PROD_BUDGET = 6000;
const APPROVED_PATH = path.resolve(process.cwd(), process.argv[2] || 'approved-voices.json');
const MANIFEST_PATH = path.resolve(process.cwd(), 'public/audio/manifest.json');
const STORY_MANIFEST_TS = path.resolve(process.cwd(), 'src/data/storyManifest.ts');

function parseDialogueFromStoryManifest() {
  const src = fs.readFileSync(STORY_MANIFEST_TS, 'utf8');
  const lines = [];
  const blockRegex = /\{\s*id:\s*'([^']+)'[\s\S]*?sceneId:\s*'([^']+)'[\s\S]*?speakerId:\s*'([^']+)'[\s\S]*?spokenText:\s*'([^']+)'[\s\S]*?audioPath:\s*'([^']+)'/g;
  let m;
  while ((m = blockRegex.exec(src)) !== null) {
    lines.push({
      id: m[1],
      sceneId: m[2],
      speakerId: m[3],
      spokenText: m[4],
      audioPath: m[5],
    });
  }
  return lines;
}

function hashClip(voiceId, modelId, text, settings) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify({ voiceId, modelId, text, settings }))
    .digest('hex')
    .slice(0, 16);
}

async function getSub() {
  const res = await fetch(`${BASE}/v1/user/subscription`, { headers: { 'xi-api-key': API_KEY } });
  if (!res.ok) throw new Error(`Subscription error ${res.status}`);
  return await res.json();
}

async function synthesize(voiceId, modelId, text, settings, absPath) {
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  const res = await fetch(`${BASE}/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: { ...settings, use_speaker_boost: true },
    }),
  });
  if (!res.ok) {
    throw new Error(`TTS error ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  const cost = Number(res.headers.get('character-cost') || text.length);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(absPath, buf);
  return { bytes: buf.length, creditsConsumed: cost };
}

async function measureDurations(filePaths) {
  const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const CDP_PORT = 9238;
  const USER_DATA_DIR = `C:/Users/pc/.gemini/antigravity/brain/32ad853c-6cd5-4939-8ab0-3ba13f4ce140/scratch/chrome_prod_${Date.now()}`;
  fs.mkdirSync(USER_DATA_DIR, { recursive: true });
  const chrome = spawn(
    CHROME_PATH,
    ['--headless=new', `--remote-debugging-port=${CDP_PORT}`, `--user-data-dir=${USER_DATA_DIR}`, '--no-first-run', 'about:blank'],
    { stdio: 'ignore' }
  );
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const out = {};
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
    const ws = new WebSocket((targets.find((t) => t.type === 'page') || targets[0]).webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.addEventListener('open', res, { once: true });
      ws.addEventListener('error', rej, { once: true });
    });
    let id = 0;
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
        const mid = ++id;
        pending.set(mid, { resolve, reject });
        ws.send(JSON.stringify({ id: mid, method, params }));
      });
    await send('Runtime.enable');
    for (const fp of filePaths) {
      const dataUri = `data:audio/mpeg;base64,${fs.readFileSync(fp).toString('base64')}`;
      const r = await send('Runtime.evaluate', {
        awaitPromise: true,
        returnByValue: true,
        expression: `new Promise((resolve) => {
          const a = new Audio(${JSON.stringify(dataUri)});
          a.addEventListener('loadedmetadata', () => resolve({ ok: true, duration: Number(a.duration.toFixed(2)) }), { once: true });
          a.addEventListener('error', () => resolve({ ok: false, duration: 0 }), { once: true });
        })`,
      });
      out[fp] = r.result.value;
    }
    ws.close();
  } finally {
    try { chrome.kill(); } catch {}
    try { fs.rmSync(USER_DATA_DIR, { recursive: true, force: true }); } catch {}
  }
  return out;
}

async function main() {
  if (!fs.existsSync(APPROVED_PATH)) {
    throw new Error(`Approved voices file not found at ${APPROVED_PATH}. Export approved-voices.json from VoiceAuditionModal first.`);
  }
  const approved = JSON.parse(fs.readFileSync(APPROVED_PATH, 'utf8'));
  const dialogues = parseDialogueFromStoryManifest();
  const subBefore = await getSub();
  const remaining = subBefore.character_limit - subBefore.character_count;

  const existingManifest = fs.existsSync(MANIFEST_PATH) ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')) : { clips: [] };
  const prevMap = new Map((existingManifest.clips || []).map((c) => [c.dialogueId, c]));

  let estPendingChars = 0;
  for (const d of dialogues) {
    const cfg = approved.characters[d.speakerId];
    if (!cfg) throw new Error(`Missing approved voice for speaker: ${d.speakerId}`);
    const hash = hashClip(cfg.voiceId, cfg.modelId, d.spokenText, cfg.settings);
    const absPath = path.resolve(process.cwd(), 'public', d.audioPath.replace(/^\//, ''));
    const prev = prevMap.get(d.id);
    if (!(prev && prev.contentHash === hash && fs.existsSync(absPath) && fs.statSync(absPath).size > 1000)) {
      estPendingChars += d.spokenText.length;
    }
  }

  if (estPendingChars > MAX_PROD_BUDGET || estPendingChars > remaining) {
    throw new Error(`Pending chars (${estPendingChars}) exceeds budget (${MAX_PROD_BUDGET}) or remaining (${remaining})`);
  }

  let spent = 0;
  const clips = [];
  const absPaths = [];

  for (const d of dialogues) {
    const cfg = approved.characters[d.speakerId];
    const hash = hashClip(cfg.voiceId, cfg.modelId, d.spokenText, cfg.settings);
    const absPath = path.resolve(process.cwd(), 'public', d.audioPath.replace(/^\//, ''));
    const prev = prevMap.get(d.id);
    let bytes = 0;
    let creditsConsumed = 0;

    if (prev && prev.contentHash === hash && fs.existsSync(absPath) && fs.statSync(absPath).size > 1000) {
      bytes = fs.statSync(absPath).size;
    } else {
      const r = await synthesize(cfg.voiceId, cfg.modelId, d.spokenText, cfg.settings, absPath);
      bytes = r.bytes;
      creditsConsumed = r.creditsConsumed;
      spent += creditsConsumed;
    }

    absPaths.push(absPath);
    clips.push({
      dialogueId: d.id,
      sceneId: d.sceneId,
      characterId: d.speakerId,
      voiceId: cfg.voiceId,
      modelId: cfg.modelId,
      contentHash: hash,
      audioPath: d.audioPath,
      fileSizeBytes: bytes,
      durationSec: 0,
      creditsConsumed,
      status: 'generated',
      _absPath: absPath,
    });
  }

  const durations = await measureDurations(absPaths);
  for (const c of clips) {
    const d = durations[c._absPath];
    c.durationSec = d?.ok ? d.duration : 0;
    c.status = d?.ok && d.duration > 0 ? 'verified' : 'invalid';
    delete c._absPath;
  }

  const subAfter = await getSub();
  existingManifest.productionStatus = 'completed';
  existingManifest.creditBudget.productionUsedCredits = spent;
  existingManifest.creditsRemaining = subAfter.character_limit - subAfter.character_count;
  existingManifest.clips = clips;
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(existingManifest, null, 2));

  console.log(JSON.stringify({ totalClips: clips.length, verified: clips.filter((c) => c.status === 'verified').length, creditsUsedThisRun: spent }, null, 2));
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
