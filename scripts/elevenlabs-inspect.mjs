import fs from 'node:fs';
import path from 'node:path';

function loadApiKey() {
  const envPath = path.resolve(process.cwd(), '.env');
  const raw = fs.readFileSync(envPath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*ELEVENLABS_API_KEY\s*=\s*(.+?)\s*$/);
    if (m) {
      return m[1].replace(/^["']|["']$/g, '');
    }
  }
  throw new Error('ELEVENLABS_API_KEY not found in .env');
}

const API_KEY = loadApiKey();
const BASE = 'https://api.elevenlabs.io';

async function getJson(endpoint) {
  const res = await fetch(`${BASE}${endpoint}`, {
    headers: { 'xi-api-key': API_KEY },
  });
  const text = await res.text();
  if (!res.ok) {
    return { ok: false, status: res.status, error: text.slice(0, 300) };
  }
  return { ok: true, data: JSON.parse(text) };
}

async function main() {
  const [sub, models, voices, sharedAr, sharedEg] = await Promise.all([
    getJson('/v1/user/subscription'),
    getJson('/v1/models'),
    getJson('/v1/voices'),
    getJson('/v1/shared-voices?language=ar&page_size=50'),
    getJson('/v1/shared-voices?language=ar&accent=egyptian&page_size=40'),
  ]);

  const summary = {
    subscription: sub.ok
      ? {
          tier: sub.data.tier,
          status: sub.data.status,
          character_count: sub.data.character_count,
          character_limit: sub.data.character_limit,
          remaining_credits: sub.data.character_limit - sub.data.character_count,
          can_extend_character_limit: sub.data.can_extend_character_limit,
          allowed_to_extend_character_limit: sub.data.allowed_to_extend_character_limit,
          next_character_count_reset_unix: sub.data.next_character_count_reset_unix,
          can_use_instant_voice_cloning: sub.data.can_use_instant_voice_cloning,
          can_use_professional_voice_cloning: sub.data.can_use_professional_voice_cloning,
          currency: sub.data.currency,
          billing_period: sub.data.billing_period,
        }
      : sub,
    models: models.ok
      ? models.data
          .filter((m) => m.can_do_text_to_speech)
          .map((m) => ({
            model_id: m.model_id,
            name: m.name,
            token_cost_factor: m.token_cost_factor,
            max_characters_request_free_user: m.max_characters_request_free_user,
            max_characters_request_subscribed_user: m.max_characters_request_subscribed_user,
            supports_ar: (m.languages || []).some((l) => l.language_id === 'ar'),
          }))
      : models,
    my_voices: voices.ok
      ? (voices.data.voices || []).map((v) => ({
          voice_id: v.voice_id,
          name: v.name,
          category: v.category,
          labels: v.labels,
          description: (v.description || '').slice(0, 120),
        }))
      : voices,
    shared_arabic_count: sharedAr.ok ? (sharedAr.data.voices || []).length : sharedAr,
    shared_egyptian: sharedEg.ok
      ? (sharedEg.data.voices || []).map((v) => ({
          voice_id: v.voice_id,
          public_owner_id: v.public_owner_id,
          name: v.name,
          gender: v.gender,
          age: v.age,
          accent: v.accent,
          use_case: v.use_case,
          category: v.category,
          rate: v.rate,
          free_users_allowed: v.free_users_allowed,
          description: (v.description || '').slice(0, 120),
        }))
      : sharedEg,
    shared_arabic_sample: sharedAr.ok
      ? (sharedAr.data.voices || []).map((v) => ({
          voice_id: v.voice_id,
          public_owner_id: v.public_owner_id,
          name: v.name,
          gender: v.gender,
          age: v.age,
          accent: v.accent,
          use_case: v.use_case,
          category: v.category,
          free_users_allowed: v.free_users_allowed,
          description: (v.description || '').slice(0, 120),
        }))
      : sharedAr,
  };

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
