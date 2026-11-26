# SADA Voice Casting Report (Phase 2 & 3)

Generated: 2026-11-26  
Account Tier: **ElevenLabs Free Tier** (`10,000` monthly credits; `9,899` before audition batch → `9,503` reported by subscription endpoint after batch; `1,524` credits billed across 15 auditions + 4 conversation turns via `character-cost` headers, inside the `3,000` audition limit).

---

## 1. Account & Plan Constraints Verified via API
- **API Connectivity**: Verified via `npx -y @elevenlabs/cli@latest onboard check` (key ending `84a6` in gitignored `.env`).
- **Library Voices Restriction**: Shared Egyptian Arabic library voices (e.g. `Farida`, `Nadia`, `Mawardy`, `Haytham`) returned `402 paid_plan_required` (`"Free users cannot use library voices via the API"`).
- **Voice Design Restriction**: `POST /v1/text-to-voice/design` returned `403 feature_not_available` on Free tier.
- **Supported Free-Tier API Voices**: All **21 `premade` multilingual voices** in `my_voices` work via API (`200 OK`, `1` credit/char) across `eleven_v3`, `eleven_v4`, and `eleven_multilingual_v2` (all marked `supports_ar: true`).
- **Licensing / Attribution**: Free tier outputs are subject to ElevenLabs Free plan non-commercial terms and require visible attribution (`Audio powered by ElevenLabs`) if published publicly.

---

## 2. Recommended Voice Cast (Pending Human Listening Approval)

| Character | Personality & Role | Recommended Voice | Voice ID | Model | Rationale & Trade-offs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **عمر (`omar`)** | Welcoming storyteller & active adventurer | **Liam - Energetic, Warm** | `TX3LPaxmHKxFdv7VOQHJ` | `eleven_v3` | Warm youthful energy matching opening host role; compare against Charlie (`IKne3meq5aSn9XLyUdCD`, `eleven_v4`) and Chris (`iP95p4xoKVk53GoZ742B`, `eleven_multilingual_v2`). |
| **مريم (`maryam`)** | Calm educational guide | **Alice - Clear, Engaging Educator** | `Xb7hH8MSUJpSbSDYk0k2` | `eleven_v3` | Steady educational clarity and calm pacing for scientific explanations; compare against Bella (`hpp4J3VqNfWAUOO0d1Us`, `eleven_v4`) and Matilda (`XrExE9yKIg1WjnnlVkGX`, `eleven_multilingual_v2`). |
| **زين (`zain`)** | Curious explorer & puzzle solver | **Will - Relaxed Optimist** | `bIHbv24MWmeRgasZH58o` | `eleven_v3` | Distinct youthful lightness contrasting clearly with Omar; compare against River (`SAz9YHcvj6GT2YYXdXww`, `eleven_v4`) and Eric (`cjVigY5qzO86Huf0OWal`, `eleven_multilingual_v2`). |
| **نور (`nour`)** | Warm, optimistic family companion | **Sarah - Reassuring, Warm** | `EXAVITQu4vr4xnSDxMaL` | `eleven_v3` | Gentle reassuring warmth distinct from Maryam's structured educator tone; compare against Lily (`pFZP5JQG7iQjIQuC4Bku`, `eleven_v4`) and Bella (`eleven_multilingual_v2`). |
| **سارة (`sarah`)** | Energetic & playful game host | **Jessica - Playful, Bright, Warm** | `cgSgspJ2msm6clMCkdW9` | `eleven_v3` | Brightest, most upbeat female tone for Games & Celebration scenes; compare against Laura (`FGY2WhTYpPnrIDTdsKH5`, `eleven_v4`) and Jessica (`eleven_v4`). |

---

## 3. Automated Verification vs. Human Listening Boundary
- **Automated Checks Performed (19/19 Passed)**:
  - All 15 character auditions (`public/audio/auditions/{omar,mariam,zein,nour,sara}/*.mp3`) and 4 conversation turns (`public/audio/auditions/conversations/*.mp3`) exist on disk, are non-empty (`40,585`–`154,270` bytes), and passed Chromium `<audio>` `loadedmetadata` playback validation (`durationSec`: `2.48s`–`9.57s`).
- **Requires Human Listening**:
  - Subjective evaluation of **Egyptian Arabic dialect naturalness** (since Free-tier API limits voices to multilingual premade voices rather than native Egyptian shared library voices) and choosing the final preferred voice/model per character inside `VoiceAuditionModal`.

---

## 4. Next Step (Approval Checkpoint)
1. Open the website preview and click **«أصوات الشخصيات»** in the bottom bar.
2. Play the **Multi-Character Conversation Demo** and compare all 3 candidates per character.
3. Confirm your 5 preferred voices (or upgrade plan if you want native Egyptian library voices like `Farida`, `Nadia`, `Mawardy`, `Will Helmi`, `Ghozlan`), then export `approved-voices.json` or reply with your choices so Phase 6 generates all 26 production lines.
