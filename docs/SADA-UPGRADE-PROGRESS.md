# SADA — Cinematic Upgrade Progress Tracker

Last Updated: 2026-11-26  
Repository: `sada-experience` (Baseline preserved at git branch `baseline-pre-upgrade`, commit `80da208`)

---

## Phase 1 — Project Audit, Arabic Typography & Visual Foundation

### Objectives
- Audit entire existing React + TypeScript + Vite codebase, assets, and 16-page project PDF documentation (`docs/pdf_pages/page_01.jpg`–`page_16.jpg`).
- Fix Arabic typography, spacing, RTL layout, and clinical/educational terminology.
- Measure real lab performance baseline before major animation/storytelling upgrades.

### Completed Tasks
- Audited all source components, `src/data/sadaData.ts`, `src/utils/audioEngine.ts`, `src/index.css`, `index.html`, and `tailwind.config.js`.
- Verified all scientific concepts, formulas, team member names/roles, and disclaimers against the 16-page PDF documentation.
- Fixed Arabic typography & layout issues:
  - Enforced `letter-spacing: 0` (`letterSpacing: "normal"`) across all RTL headings and copy (eliminated `tracking-tight` `-1.8px`, `tracking-wide`, `tracking-wider`, `tracking-widest` on Arabic text).
  - Implemented fluid `clamp()` typography tokens (`.sada-hero-title`, `.sada-section-title`, `.sada-card-title`, `.sada-body-copy`) with generous Arabic line-heights (`1.38`–`1.80`, `h1` computed `line-height: 85.008px` at `61.6px` font size).
  - Added `.sada-gradient-text` vertical block padding (`padding-block: 0.14em`) so Arabic ascenders/descenders are never clipped.
  - Added `.dir-ltr` with `unicode-bidi: isolate` for phonetic symbols (`/m/, /u/, /a/, /i/, /ʃ/, /s/`), badges, and numeric ratios.
- Fixed terminology & documentation accuracy in `src/data/sadaData.ts` and components:
  - Replaced `اختبار` with `تقييم` for SADA's assessment features.
  - Removed rigid `المستوى` labels on the five auditory skills to preserve documented independence (`ولا يُشترط ترتيب موحد لانتقال الأطفال بين المهارات`).
  - Fixed typo `«ألن كل استجابة صوتية...»` → `«لأن كل استجابة صوتية تستحق أن تُسمع وتُتابع»`.
  - Removed undocumented `كلية علوم التأهيل والتقنية` claim from Hero badge.
  - Removed unused legacy/artifact files from `public/` (`screenshots/`, `pdf_pages/`, legacy `.jpg`/`.png` duplicates moved to `docs/`).

### Modified Files
- `index.html`, `tailwind.config.js`, `src/index.css`, `src/data/sadaData.ts`.

### Verified Results
- Baseline `h1` computed: `72px`, `letter-spacing: -1.8px`, `line-height: 72px` (`1.0`).
- Upgraded `h1` computed: `61.6px`, `letter-spacing: normal`, `line-height: 85.008px` (`1.38`).

---

## Phase 2 — Storyboard, Character Personalities & Egyptian Arabic Script

### Objectives
- Transform SADA into a continuous 11-scene story: *«صدى — لكل صوت حكاية، ولكل طفل رحلة»*.
- Preserve the 5 original characters (`عمر`, `مريم`, `زين`, `نور`, `سارة`) with distinct personalities, storytelling roles, and natural Egyptian Arabic dialogue (~2.5–3 minutes total narration across 26 short clips).
- Create centralized story manifest and full production documentation.

### Completed Tasks
- Created `docs/storyboard.md`
- Created `docs/story-script-ar.md`
- Created `docs/character-voice-profiles.md`
- Created `docs/audio-production-plan.md`
- Created `src/data/storyManifest.ts` (centralized TypeScript manifest for all 11 scenes, 5 character profiles, 26 dialogue lines, subtitle cues, animation cues, and expected audio paths).

### Modified Files
- `docs/storyboard.md`, `docs/story-script-ar.md`, `docs/character-voice-profiles.md`, `docs/audio-production-plan.md`, `src/data/storyManifest.ts`.

---

## Phase 3 — ElevenLabs Voice Casting & Audition Production (Pending Human Approval)

### Objectives
- Verify the authenticated ElevenLabs CLI integration (`npx -y @elevenlabs/cli@latest onboard check --written --env-path .env`), inspect subscription tier, remaining credits, Arabic models, and available voices.
- Cast distinct voices for the 5 original characters (`عمر`, `مريم`, `زين`, `نور`, `سارة`), generate 15 audition candidates (3 per character) + a 4-turn multi-character conversation demo within the 3,000-credit audition budget, and build a side-by-side comparison modal before generating the 26 production clips.

### Completed Tasks
- Verified ElevenLabs CLI onboarding (API key ending `84a6` in gitignored `.env`, verified via `git check-ignore -v .env`).
- Inspected ElevenLabs subscription & models (`scripts/elevenlabs-inspect.mjs`):
  - Tier: `free` (`character_limit: 10000`, `9,899` before audition batch → `9,503` reported after batch; `1,524` credits billed across 19 generated audio files inside the `3,000` audition limit).
  - Arabic-capable models (`supports_ar: true`): `eleven_v3`, `eleven_v4`, `eleven_v4_turbo`, `eleven_v3_conversational`, `eleven_multilingual_v2`, `eleven_flash_v2_5`, `eleven_turbo_v2_5`.
  - API restriction check: shared Egyptian Arabic library voices return `402 paid_plan_required`, and Voice Design returns `403 feature_not_available`; all 21 `premade` multilingual voices return `200 OK` across `eleven_v3`, `eleven_v4`, and `eleven_multilingual_v2`.
- Generated 15 character auditions (`public/audio/auditions/{omar,mariam,zein,nour,sara}/*.mp3`) and 4 conversation turns (`public/audio/auditions/conversations/*.mp3`), verified non-empty (`40,585`–`154,270` bytes) and playable (`2.48s`–`9.57s`) in `public/audio/audition-manifest.json`.
- Created `docs/voice-casting-report.md` and `scripts/generate-production-audio.mjs` (cache-aware Phase 6 batch script, held at Approval Checkpoint).
- Upgraded `src/components/VoiceAuditionModal.tsx` with multi-character sequential conversation playback, 3-candidate comparison per character, single-audio mutex lock, `localStorage` selection persistence (`sada_approved_voices_v1`), and JSON copy/export (`approved-voices.json`).

### Remaining Manual Actions (Approval Checkpoint)
1. Listen to the 4-turn conversation demo and 15 voice auditions in `VoiceAuditionModal` (**«أصوات الشخصيات»**) to judge Egyptian Arabic naturalness and approve/adjust the 5 final voices.
2. Confirm plan/licensing posture (Free tier vs. paid plan if native Egyptian library voices are desired) before running `scripts/generate-production-audio.mjs` for the 26 production lines.

---

## Phase 4 — Cinematic Scrolling, Scene Transitions & Character Animation

### Objectives
- Coordinate Lenis + GSAP ScrollTrigger on a single clock with zero per-frame React state re-renders.
- Implement continuous Sound Ribbon motif, distinct scene-to-scene transitions across all 11 scenes, and distortion-free living character animations.

### Completed Tasks
- Refactored `src/App.tsx` and `src/components/SoundRibbon.tsx` to drive scroll progress and active accent color via mutable refs (`scrollProgressRef`, `activeColorRef`) instead of React state updates on every scroll frame.
- Configured Lenis for precision desktop pointers and native touch scrolling for mobile/coarse pointers and `prefers-reduced-motion`.
- Built `src/components/SceneTransitionWave.tsx` bridging color shifts across all 11 scenes.
- Built `src/components/CharacterStageActor.tsx` with distortion-free GPU breathing/speaking motion, fixed-height speaking badge reservation (preventing CLS), gender-accurate Arabic labels (`يتحدث` / `تتحدث`), and listening dim-back.
- Integrated all 11 scenes, including dedicated Scene 05 (`TrainingJourneySection.tsx` with 5 distinct themed micro-environments + real app screens `screen_detection.png`–`screen_closure.png`), Scene 06 (`ListeningNoiseSection.tsx` with `screen_noise.png`), Scene 07 (`GamesWorldSection.tsx` with `screen_reward.png` & Nex Playground 3D tilt cards), Scene 08 (`GuidesSection.tsx` with `char_guide.webp`), Scene 09 (`GoalsSection.tsx` with Pre/Follow-up/Post timeline + `screen_dashboard.png` & `screen_timeline.png`), Scene 10 (`TeamSection.tsx`), and Scene 11 (`FinalCelebrationSection.tsx`).

### Modified Files
- `src/App.tsx`, `src/components/SoundRibbon.tsx`, `src/components/SceneTransitionWave.tsx`, `src/components/CharacterStageActor.tsx`, `src/components/Navbar.tsx`, `src/components/HeroSection.tsx`, `src/components/ProblemSolutionSection.tsx`, `src/components/AppWorkflowSection.tsx`, `src/components/LingSixSection.tsx`, `src/components/TrainingJourneySection.tsx`, `src/components/ListeningNoiseSection.tsx`, `src/components/GamesWorldSection.tsx`, `src/components/GuidesSection.tsx`, `src/components/GoalsSection.tsx`, `src/components/TeamSection.tsx`, `src/components/FinalCelebrationSection.tsx`.

---

## Phase 5 — Audio Controller, Story Synchronization & Accessibility

### Objectives
- Build one centralized `StoryAudioController`, non-blocking Story Mode / Free Exploration Mode entry, non-overlapping sequential queue, smart scroll debounce, visibility pause, RTL Arabic subtitles, and accessibility support.

### Completed Tasks
- Built `src/utils/storyAudioController.ts` and `src/hooks/useStoryAudio.ts` (`useStoryAudio` + lightweight `useStorySceneFocus` selector preventing whole-page re-renders on progress ticks).
- Implemented 450ms scene-activation stability debounce, immediate stop on scene exit, completed-scene replay guard on backward scroll, `visibilitychange` auto-pause, localStorage preference persistence, and graceful missing-MP3 fallback to timed visual subtitle & speaker focus (no fake TTS, zero runtime ElevenLabs calls).
- Built `src/components/StoryEntryOverlay.tsx` (inline constant-height bar with `"ابدأ الرحلة بالصوت"` and `"تصفح بدون صوت"`).
- Built `src/components/StoryAudioBar.tsx` (compact floating controller with Play/Pause, Replay, Next Scene, Subtitles Toggle, Mute, Volume slider, Story/Free Mode toggle, Scene Progress, and Live RTL Subtitle Pill).
- Upgraded `src/utils/audioEngine.ts` with safe, volume-capped pink-filtered ambient murmur for Scene 06 and automatic ducking during speech.

---

## Phase 6 — Final Optimization, Browser Testing & Delivery

### Objectives
- Optimize assets and JS bundle chunks, verify across desktop & mobile viewports in real Chromium, compare before/after performance metrics, verify production build, and commit clean milestones.

### Completed Tasks
- Configured Vite `manualChunks` in `vite.config.ts` (`vendor-react`, `vendor-motion`, `vendor-icons`, lazy `VoiceAuditionModal`).
- Converted 12 oversized character & group PNGs (`9,679 KB`) to crisp alpha-transparent `.webp` (`1,038 KB` — ~89% smaller) and archived unused legacy files in `docs/legacy-assets/`.
- Reduced `dist/` bundle weight, self-hosted Alexandria fonts locally (`public/fonts/alexandria-0.woff2`–`3.woff2`, `100,860` B, `src/fonts.css`) eliminating external font layout shifts (`CLS: 0.0022`).
- Replaced `SoundRibbon` `<canvas>` redraws with dual GPU-translated `<svg>` curves (`32ms` throttled tick), removed CSS `blur-2xl`/`backdrop-blur-md`/`drop-shadow` filters on scrolling elements, added `contain: layout style paint` on `.sada-scene`, removed `scale`/`rotate` scrub on heavy shadow containers, fixed Scene 07 `ScrollTrigger` card reveal threshold (`top 98%` + `clearProps`), and added post-LCP idle image pre-decoding (`2600ms`).
- Verified `oxlint` (`0` warnings, `0` errors) and `tsc -b && vite build` (`0` errors).
- Ran automated headless Chromium CDP audit (`verify_upgrade.mjs`) across `1440×900` desktop and all 7 viewports (`360px`, `390px`, `430px`, `768px`, `1024px`, `1440px`, `1920px`), Story Mode interaction, upgraded `VoiceAuditionModal` (conversation demo + 15 candidates), and `prefers-reduced-motion`.

### Verified Before vs. After Lab Results (Headless Chromium CDP)
| Metric | Baseline (`80da208`) | Upgraded (Current) |
| :--- | :--- | :--- |
| `oxlint` warnings / errors | Not run | `0` warnings / `0` errors |
| Main JS chunk (uncompressed / gzip) | `502.76 kB` / `156.74 kB` | `185.63 kB` / `45.78 kB` (`VoiceAuditionModal` `11.91 kB` lazy) |
| `h1` `letter-spacing` | `-1.8px` | `normal` (`0`) |
| `h1` `line-height` / `font-size` | `72px` / `72px` (`1.00`) | `85.008px` / `61.6px` (`1.38`) |
| Console errors | `0` | `0` |
| Horizontal overflow (`360`–`1920px`) | `false` | `false` across all 7 viewports |
| `prefers-reduced-motion` support | CSS only | Verified JS + CSS (`reducedMotionOk: true`) |
| Lab Scroll FPS (60-step pass, software Chromium) | `116` FPS (static page) | `45` FPS (`totalFrames: 59`, software rasterizer in `--headless=new`) |
| Lab FCP / LCP (headless Chromium) | `1400 ms` / `1400 ms` | `1596 ms` / `1596 ms` |
| Lab CLS (with scripted interactions) | `0.084` | `0.0022` |

### Remaining Limitations & Manual Actions
1. **Approval Checkpoint**: Full 26-line production audio (`scripts/generate-production-audio.mjs`) is paused pending user review/approval of the 15 voice auditions and 4-turn conversation demo in `VoiceAuditionModal`. Keep `public/audio/auditions/` available for local preview right now; exclude internal audition files before final Vercel deployment.
2. **Physical Devices & Interactive Chrome**: Responsive checks were performed via headless Chromium viewport emulation (`360px`–`1920px`) without GPU acceleration; physical mobile testing is recommended before final public launch.
3. **Production Deployment**: No deployment to Vercel was executed (awaiting voice approval, Phase 6 audio generation, and publication approval).
