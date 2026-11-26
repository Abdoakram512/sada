# SADA Voice Casting Report — Paid Egyptian Upgrade (Priority 1)

Updated: 2026-11-26  
Account Tier: **ElevenLabs Starter (Paid)** (`40,000` monthly credits; `37,347` credits remaining after Gulf-replacement auditions + full 26-clip Tashkeel production regeneration).  
Cumulative Audition Budget Tracker: **`1,524`** (Free-tier reference) + **`434`** (Egyptian Library v1) + **`145`** (Maryam Egyptian fix: `Heba v3/v4`, `Seham v3`, conversation turn) = **`2,103 / 3,000` credits consumed**.  
Production Regeneration Run (`26` clips with Cairo `Heba` + full Egyptian Tashkeel): **`1,089` credits** (`totalDur: 213.52s`, `26/26` Chromium verified).

---

## 1. Account & Egyptian Voice Library Verification
- **Subscription & Capabilities**: `tier: "starter"`, `status: "active"`, `voice_limit: 10`, `can_use_instant_voice_cloning: true`.
- **Voice Library Search (`language=ar&accent=egyptian`)**: Returned **78 verified native Egyptian Arabic voices** (`free_users_allowed` true & paid-only exclusive `professional`/`high_quality` voices), including young storytellers, calm female educators, warm family voices, and upbeat hosts at `1 credit/char`.
- **Licensing & Publication Rights Note**: Audio generated under the current **Starter** plan carries paid-tier commercial/publication rights per ElevenLabs Starter terms (checking individual voice `notice_period`, which is `730`–`4015` days for our selected cast). Previously generated Free-tier reference samples remain archived strictly as comparison candidates (`tier: "premade-reference"`) and do **not** retroactively gain paid commercial rights unless regenerated under the active Starter plan; rejected candidates will be excluded from the final production bundle.

---

## 2. Final Approved Egyptian Voice Cast

| Character | Storytelling Role | Approved Egyptian Voice (Starter) | Voice ID | Model | Rationale & Accent QA |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **عمر (`omar`)** | Welcoming host & adventurer | **Mostafa - Bold and Spirited** | `QvNF0qyyt1Tuy1YAmnzH` | `eleven_v4` | Cairo studio youth voice (`64cbc624`), confident energetic warmth for hero & welcoming narration. |
| **مريم (`maryam`)** | Calm scientific guide | **Heba - Soothing and Gracious** | `JHdGl5PsEzushIzzVSd1` | `eleven_v3` | Replaces rejected `Alice (EG)` (`LjKPkQHpXCsWoy7Pjq4U`, creator `a19cc83f`) which had Gulf inflection; `Heba` shares the authentic Cairo studio (`64cbc624`) with Mostafa/Nadia/Farida and delivers calm clarity. |
| **زين (`zain`)** | Curious explorer & puzzle solver | **Sattar - Warm Egyptian explainer** | `Y65Dz2XsznJl6gZHkXPi` | `eleven_v4` | Natural everyday Egyptian inflection with curious, conversational pacing. |
| **نور (`nour`)** | Warm family supporter | **Nadia - Sweet and Melodic** | `80le32Uz2DfWFo4Foz0p` | `eleven_v3` | Soft, warm Egyptian tone (`64cbc624`) suited for family guidance and emotional closure. |
| **سارة (`sarah`)** | Playful games & reward host | **Farida - Lively and Radiant** | `6aXW46RTUz6Y2lkBGQ1a` | `eleven_v3` | Bright, joyful Egyptian youth energy (`64cbc624`) suited for games and celebrations. |

### Pronunciation & Dialect Quality Fixes
- **Gulf Accent Removal**: Eliminated `LjKPkQHpXCsWoy7Pjq4U` (`Alice (EG)`) completely from production audio and dev audition defaults after user accent review.
- **Egyptian Tashkeel (`spokenText` only)**: Added disambiguating Arabic diacritics across all `26` `spokenText` scripts (`src/data/storyManifest.ts`) while keeping clean un-diacritized display subtitles (`subtitleText`).
- **Ling Six Articulation Fix**: Updated `scene-04-maryam-09` from isolated letters (`'م، أو، آ، إي، ش، وس'`) to spoken Arabic sound names (`'الميم، والأو، والآ، والإي، والشّين، والسّين'`) so TTS never reads `"وس"` literally as *"wass"* or *"was"*.

---

## 3. Production & Dev Audition Archive
- **Production Bundle (`public/audio/characters/*.mp3`)**: `26 / 26` Egyptian Arabic MP3 files verified (`totalDur: 213.52s`), tracked in `public/audio/manifest.json` and `src/data/storyManifest.ts`. Rejected auditions are excluded from `public/` and `dist/`.
- **Dev Audition Archive (`docs/voice-auditions-archive/`)**: Served only in `npm run dev` via `serveDevVoiceAuditions()` (`vite.config.ts`) so `VoiceAuditionModal` allows comparing **Heba (`v3`/`v4`)**, **Seham (`v3`)**, and **Asmaa (`v4`)** during local development without inflating production builds (`dist/audio/auditions` does not exist).
