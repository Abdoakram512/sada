# SADA Voice Casting Report — Paid Egyptian Upgrade (Priority 1)

Updated: 2026-11-26  
Account Tier: **ElevenLabs Starter (Paid)** (`40,000` monthly credits; `36,486` credits remaining after Cairene cast upgrade & 26-clip regeneration).  
Cumulative Audition & QA Test Budget Tracker: **`1,524`** (Free reference) + **`434`** (Egyptian Library v1) + **`145`** (Maryam v2 test) + **`388`** (11 Cairo female/Zain `v2`/`v4` verification tests) = **`2,491 / 3,000` credits consumed**.  
Final Cairo Production Run (`26` clips on `eleven_v4`): **`994` credits** (`totalDur: 199.28s`, `26/26` Chromium verified).

---

## 1. Account & Egyptian Voice Library Verification
- **Subscription & Capabilities**: `tier: "starter"`, `status: "active"`, `voice_limit: 10`, `can_use_instant_voice_cloning: true`.
- **Voice Library Search (`language=ar&accent=egyptian`)**: Returned **78 verified native Egyptian Arabic voices** (`free_users_allowed` true & paid-only exclusive `professional`/`high_quality` voices), including young storytellers, calm female educators, warm family voices, and upbeat hosts at `1 credit/char`.
- **Licensing & Publication Rights Note**: Audio generated under the current **Starter** plan carries paid-tier commercial/publication rights per ElevenLabs Starter terms (checking individual voice `notice_period`, which is `730`–`4015` days for our selected cast). Previously generated Free-tier reference samples remain archived strictly as comparison candidates (`tier: "premade-reference"`) and do **not** retroactively gain paid commercial rights unless regenerated under the active Starter plan; rejected candidates will be excluded from the final production bundle.

---

## 2. Final Approved Cairo Egyptian Voice Cast

| Character | Storytelling Role | Approved Cairo Voice (Starter) | Voice ID | Model | Rationale & Dialect QA |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **عمر (`omar`)** | Welcoming host & adventurer | **Mostafa - Bold and Spirited** | `QvNF0qyyt1Tuy1YAmnzH` | `eleven_v4` | Natural Cairene youth voice with upbeat clarity. |
| **مريم (`maryam`)** | Calm scientific guide | **Yasmine - Balanced Cairene Guide** | `L10lEremDiJfPicq5CPh` | `eleven_v4` | Authentic Cairene speaker (`7398804d`), replacing `Heba`/`Alice` after accent & pronunciation feedback (`بالتدريج` -> `واحدة واحدة`). |
| **زين (`zain`)** | Curious explorer & puzzle solver | **Ziad - Dynamic Cairene Youth** | `5REPlS2Ja1VZ7zNA0ykn` | `eleven_v4` | Youthful Cairene cadence, replacing Upper-Egyptian-sounding `Sattar` (`Y65Dz2XsznJl6gZHkXPi`). |
| **نور (`nour`)** | Gentle family supporter | **Ghozlan - Soft Clear Conversational** | `xPcC3nehhziQaOrIeAwv` | `eleven_v4` | Soft conversational Cairene voice (`7398804d`), balanced with Yasmine & Fatima with zero MSA stiffness. |
| **سارة (`sarah`)** | Playful games & reward host | **Fatima - Expressive Egyptian** | `I3u6waC588j43py1kDN2` | `eleven_v4` | Lively, balanced Cairene energy (`7398804d`) unifying all three female roles under authentic Cairo Egyptian speakers. |

### Dialect, Pronunciation & Copy Quality Fixes
- **Authentic Cairo Accent (`eleven_v4`)**: Switched all 5 characters onto `eleven_v4` with native Cairo speakers; removed heavy synthetic Tashkeel that previously tripped up pronunciation.
- **Natural Cairene Script (`src/data/storyManifest.ts`)**: Rewrote all 26 lines in grounded Cairene speech, removed exaggerated buzzwords (`بأمان`, `دافي`, `بيئة مشجعة وآمنة`), and replaced `منصة`/`منظومة` with `تطبيق صدى` / `الأبلكيشن`.
- **Ling Six Articulation**: Retained spoken Arabic sound names (`الميم، والأو، والآ، والإي، والشين، والسين`) in `spokenText` and clean phonetic notation in subtitles.

---

## 3. Production & Dev Audition Archive
- **Production Bundle (`public/audio/characters/*.mp3`)**: `26 / 26` Egyptian Arabic MP3 files verified (`totalDur: 213.52s`), tracked in `public/audio/manifest.json` and `src/data/storyManifest.ts`. Rejected auditions are excluded from `public/` and `dist/`.
- **Dev Audition Archive (`docs/voice-auditions-archive/`)**: Served only in `npm run dev` via `serveDevVoiceAuditions()` (`vite.config.ts`) so `VoiceAuditionModal` allows comparing **Heba (`v3`/`v4`)**, **Seham (`v3`)**, and **Asmaa (`v4`)** during local development without inflating production builds (`dist/audio/auditions` does not exist).
