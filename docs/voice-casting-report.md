# SADA Voice Casting Report — Paid Egyptian Upgrade (Priority 1)

Updated: 2026-11-26  
Account Tier: **ElevenLabs Starter (Paid)** (`40,000` monthly credits; `40,000` before Egyptian audition run → `39,663` immediately reported after run; `434` billed across the 11 new Egyptian auditions + 4 conversation turns via `character-cost` headers).  
Cumulative Audition Budget Tracker: **`1,524`** (earlier Free-tier reference run) + **`434`** (Egyptian Voice Library run) = **`1,958 / 3,000` credits consumed** (`1,042` remaining inside authorized audition cap).

---

## 1. Account & Egyptian Voice Library Verification
- **Subscription & Capabilities**: `tier: "starter"`, `status: "active"`, `voice_limit: 10`, `can_use_instant_voice_cloning: true`.
- **Voice Library Search (`language=ar&accent=egyptian`)**: Returned **78 verified native Egyptian Arabic voices** (`free_users_allowed` true & paid-only exclusive `professional`/`high_quality` voices), including young storytellers, calm female educators, warm family voices, and upbeat hosts at `1 credit/char`.
- **Licensing & Publication Rights Note**: Audio generated under the current **Starter** plan carries paid-tier commercial/publication rights per ElevenLabs Starter terms (checking individual voice `notice_period`, which is `730`–`4015` days for our selected cast). Previously generated Free-tier reference samples remain archived strictly as comparison candidates (`tier: "premade-reference"`) and do **not** retroactively gain paid commercial rights unless regenerated under the active Starter plan; rejected candidates will be excluded from the final production bundle.

---

## 2. Recommended Paid Egyptian Voice Cast vs. Previous Reference Cast

| Character | Storytelling Role | Previous Reference (Free Tier) | New Recommended Egyptian Voice (Starter) | Voice ID | Model | Rationale & Model Evaluation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **عمر (`omar`)** | Welcoming host & adventurer | Liam (`TX3LPaxmHKxFdv7VOQHJ`) | **Mawardy - Warm, Natural Egyptian** | `PmRaqkJ2uk3Y9jrp9UjJ` | `eleven_v3` | Everyday natural Egyptian Arabic (*Masri*), clear youth warmth; compare vs. `Mostafa - Bold` (`QvNF0qyyt1Tuy1YAmnzH`, `eleven_v4`) & `Haytham` (`IES4nrmZdUBHByLBde0P`, `eleven_multilingual_v2`). |
| **مريم (`maryam`)** | Calm scientific guide | Alice (`Xb7hH8MSUJpSbSDYk0k2`) | **Alice (EG) - Smooth, Charming and Soft** | `LjKPkQHpXCsWoy7Pjq4U` | `eleven_v3` | Paid-exclusive young Egyptian woman; smooth articulation for terms like *أصوات لينج الستة* & *تقييم*; compare vs. `Asmaa` (`NwMzeQCEU9Ecy3zXYTkV`, `eleven_v4`). |
| **زين (`zain`)** | Curious explorer & puzzle solver | Will (`bIHbv24MWmeRgasZH58o`) | **Ziad - Dynamic and Vibrant** | `5REPlS2Ja1VZ7zNA0ykn` | `eleven_v3` | Lighter pitch, punchy youthful questioning cadence contrasting distinctly with Omar; compare vs. `Sattar` (`Y65Dz2XsznJl6gZHkXPi`, `eleven_v4`). |
| **نور (`nour`)** | Warm family supporter | Sarah (`EXAVITQu4vr4xnSDxMaL`) | **Nadia - Sweet and Melodic** | `80le32Uz2DfWFo4Foz0p` | `eleven_v3` | Gentle, honeyed Egyptian warmth ideal for Parents guide & Closing reflection; compare vs. `Ghozlan - Soft` (`xPcC3nehhziQaOrIeAwv`, `eleven_v4`). |
| **سارة (`sarah`)** | Playful games & reward host | Jessica (`cgSgspJ2msm6clMCkdW9`) | **Farida - Lively and Radiant** | `6aXW46RTUz6Y2lkBGQ1a` | `eleven_v3` | Bright, radiant upbeat Egyptian energy suited for Games & Celebration; compare vs. `Fatima - Expressive` (`I3u6waC588j43py1kDN2`, `eleven_multilingual_v2`). |

### Model Comparison Notes
- **`eleven_v3`**: Richest emotional expression, natural Egyptian colloquial inflection, and dynamic reactions for interactive dialogue.
- **`eleven_v4`**: Crisp pacing and strong articulation for scientific terms (`Mostafa`, `Asmaa`, `Sattar`, `Ghozlan`) — available as direct alternates in `VoiceAuditionModal`.
- **`eleven_multilingual_v2`**: Steady balanced pacing (`Haytham`, `Fatima`), useful for steady narrative comparison.

---

## 3. Verified Audition & Conversation Files
- **Stored in**: `public/audio/auditions/{omar,mariam,zein,nour,sara}/*_eg_*.mp3` & `public/audio/auditions/conversations/conv_eg_*.mp3` (plus previous 15 reference auditions & 4 reference turns preserved in `public/audio/audition-manifest.json`).
- **Automated Verification**: All **11 new Egyptian auditions** (`95,755`–`129,610` B, `5.92s`–`8.03s`) and **4 Egyptian conversation turns** (`43,510`–`97,009` B, `2.69s`–`6.00s`) passed Chromium `<audio>` `loadedmetadata` playback checks (`26` total stored auditions + `8` total conversation turns).
- **Production Audio Status (`26` lines in `public/audio/characters/`)**: Held at Approval Checkpoint — **not generated yet** until you review and approve the updated 5-character Egyptian voice selections in **«أصوات الشخصيات»**.
