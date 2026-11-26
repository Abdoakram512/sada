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

## Phase 3 — ElevenLabs Paid Egyptian Voice Production & Live Playback Verification (Completed)

### Objectives
- Verify the upgraded paid **ElevenLabs Starter** account, search the paid Voice Library for authentic Egyptian Arabic voices, generate Egyptian auditions for user review, and upon approval produce all 26 production audio files across the 11 scenes while excluding internal audition samples from `dist/`.

### Completed Tasks
- Approved Egyptian Cast (`docs/approved-voices.json`) selected directly by user review:
  - **عمر (`omar`)**: `Mostafa - Bold and Spirited` (`QvNF0qyyt1Tuy1YAmnzH`, `eleven_v4`)
  - **مريم (`maryam`)**: `Alice (EG) - Smooth, Charming and Soft` (`LjKPkQHpXCsWoy7Pjq4U`, `eleven_v3`)
  - **زين (`zain`)**: `Sattar - Warm Egyptian explainer` (`Y65Dz2XsznJl6gZHkXPi`, `eleven_v4`)
  - **نور (`nour`)**: `Nadia - Sweet and Melodic` (`80le32Uz2DfWFo4Foz0p`, `eleven_v3`)
  - **سارة (`sarah`)**: `Farida - Lively and Radiant` (`6aXW46RTUz6Y2lkBGQ1a`, `eleven_v3`)
- Generated and verified all **26 production MP3 clips** (`public/audio/characters/scene-01-omar-01.mp3`–`scene-11-sarah-26.mp3`, `4.00s`–`13.36s`, verified in Chromium `<audio loadedmetadata>`) via `scripts/generate-production-audio.mjs`:
  - Production credits consumed: `968` (well inside `6,000` cap); remaining account balance: `38,607`.
  - Synced `actualDurationSec` and approved character voice metadata into `src/data/storyManifest.ts` and `public/audio/manifest.json`.
  - Fixed active-scene re-entry guard in `src/utils/storyAudioController.ts` so `goToNextScene()` handovers are never interrupted by ScrollSpy debounce.
  - Archived internal audition candidates to `docs/voice-auditions-archive/` and gated `VoiceAuditionModal` toggle behind `import.meta.env.DEV` (`dist/audio/characters` has exact `26` `.mp3` clips; `dist/audio/auditions` excluded).

### Remaining Manual Actions
- None for audio generation. Remaining external action: final publication/deployment approval on Vercel.

---

## Phase 4 — Large Cast Staging, Color Harmony & Bespoke Scene Transitions

### Objectives
- Make the 5 SADA characters prominent, expressive central stars across every scene, establish a unified warm storybook color palette & CSS design tokens, add internal scroll choreography to all 11 scenes, and replace repeated wave dividers with 10 varied scene-to-scene transitions.

### Completed Tasks
- **Character Proportions & Framing**:
  - Audited all character/group `.webp` dimensions & bounding boxes; trimmed 43% excess transparent side padding from `public/assets/char_maryam.webp` (`410×760`, clean `95%` height fill).
  - Enlarged `CharacterStageActor.tsx` across all 11 scenes (Hero cast centered 100% above the fold on `1440×900` at `242–282px` height; secondary storytelling scenes enlarged from `96–112px` to `192–240px+` widths / `242–430px` heights) with `overflow-hidden` `max-h-full` aspect consistency.
  - Added smooth speaker-focus emphasis (`scale-[1.06] -translate-y-1.5` + dual radial halo glow) and listener dim-back (`opacity-75 scale-[0.94]`).
- **Color Harmony & Design Tokens**:
  - Defined centralized CSS tokens (`--sada-brand-*`, `--sada-bg-*`, `--sada-card-*`, `--sada-shadow-soft`) in `src/index.css` linking all 11 emotional atmospheres seamlessly.
- **Bespoke Transitions & Internal Motion**:
  - Built `src/components/SceneTransition.tsx` with 10 distinct narrative transitions (`sound-burst`, `tablet-arch`, `prism-split`, `adventure-ribbon`, `horizon-ripple`, `arcade-curtain`, `starlight-bridge`, `timeline-sweep`, `human-arch`, `curtain-finale`).
  - Upgraded internal scroll-driven GSAP `ScrollTrigger` beats across all 11 scenes, including sticky Scene 05 station progress bar in `TrainingJourneySection.tsx` and entrance choreography in `GuidesSection.tsx` & `FinalCelebrationSection.tsx`.

### Modified Files
- `src/App.tsx`, `src/index.css`, `src/components/SceneTransition.tsx`, `src/components/CharacterStageActor.tsx`, `src/components/HeroSection.tsx`, `src/components/StoryEntryOverlay.tsx`, `src/components/ProblemSolutionSection.tsx`, `src/components/AppWorkflowSection.tsx`, `src/components/LingSixSection.tsx`, `src/components/TrainingJourneySection.tsx`, `src/components/ListeningNoiseSection.tsx`, `src/components/GamesWorldSection.tsx`, `src/components/GuidesSection.tsx`, `src/components/GoalsSection.tsx`, `src/components/TeamSection.tsx`, `src/components/FinalCelebrationSection.tsx`, `src/components/VoiceAuditionModal.tsx`, `src/utils/storyAudioController.ts`, `public/assets/char_maryam.webp`, `scripts/generate-egyptian-auditions.mjs`, `public/audio/audition-manifest.json`, `docs/voice-casting-report.md`.

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
- Verified `oxlint` (`0` warnings, `0` errors) and `tsc -b && vite build` (`0` errors, `3.31s`).
- Ran automated headless Chromium CDP audit (`verify_upgrade.mjs`) across `1440×900` desktop and all 7 viewports (`360px`, `390px`, `430px`, `768px`, `1024px`, `1440px`, `1920px`), real CDP-triggered Story Mode playback (`ابدأ الرحلة بالصوت` → Play/Pause/Resume/Replay/Next Scene handover across `/audio/characters/scene-01-omar-01.mp3` and `scene-02-zain-04.mp3`), production isolation check (`auditionBtnHiddenInProd: true`), and `prefers-reduced-motion`.

### Verified Before vs. After Lab Results (Headless Chromium CDP)
| Metric | Baseline (`80da208`) | Upgraded (Final Production) |
| :--- | :--- | :--- |
| `oxlint` warnings / errors | Not run | `0` warnings / `0` errors |
| Main JS chunk (uncompressed / gzip) | `502.76 kB` / `156.74 kB` | `189.72 kB` / `47.09 kB` |
| Production audio clips verified | `0` | `26 / 26` MP3 (`dist/audio/auditions`: `false`) |
| Live Story Mode playback (`ابدأ الرحلة بالصوت`) | N/A | Verified `readyState: 4`, `duration: 8.4s` & `6.32s`, pause/resume/replay/next-scene clean (`activePlayingElements: 1`) |
| `h1` `letter-spacing` | `-1.8px` | `normal` (`0`) |
| `h1` `line-height` / `font-size` | `72px` / `72px` (`1.00`) | `85.008px` / `61.6px` (`1.38`) |
| Console errors | `0` | `0` |
| Horizontal overflow (`360`–`1920px`) | `false` | `false` across all 7 viewports |
| `prefers-reduced-motion` support | CSS only | Verified JS + CSS (`reducedMotionOk: true`) |
| Lab Scroll FPS (60-step pass, software Chromium) | `116` FPS (static page) | `44` FPS (`droppedFrames: 10` of `59`, software rasterizer in `--headless=new`) |
| Lab FCP / LCP (headless Chromium idle) | `1400 ms` / `1400 ms` | `1636 ms` / `1636 ms` |
| Lab CLS (idle / post-scroll) | `0.084` | `0.0008` idle / `0.0027` after scroll |

### Remaining Limitations & Manual Actions
1. **Physical Devices & Live Audio Listening**: Automated CDP verification confirmed DOM media element playback, network delivery, durations, pause/resume/replay/scene-handover states, and zero overlap; human listening on physical speakers and physical mobile devices is recommended prior to public showcase.
2. **Production Deployment**: No deployment to Vercel was executed (awaiting final publication approval).

---

## Phase 7 — Egyptian Dialect QA, Gulf Voice Removal & Tashkeel Regeneration

### Objectives
- Eliminate the Gulf-sounding voice previously assigned to **مريم (`maryam`)** (`Alice (EG)`, `LjKPkQHpXCsWoy7Pjq4U`).
- Disambiguate Egyptian Arabic pronunciation across all `26` dialogue lines using targeted Tashkeel (`spokenText` only) and clear spoken forms for the Ling Six phonemes.
- Regenerate all `26` production MP3 clips on the Starter plan and re-verify production build & browser playback.

### Completed Tasks & Modified Files
- Replaced `maryam` voice with genuine Cairo voice **`Heba - Soothing and Gracious`** (`JHdGl5PsEzushIzzVSd1`, `eleven_v3`, studio `64cbc624`), and archived alternative Cairo auditions (`Heba v3/v4`, `Seham v3`) inside `docs/voice-auditions-archive/` while deleting `mariam_eg_alice_v3.mp3`.
- Added dev-only audition middleware `serveDevVoiceAuditions()` in `vite.config.ts` so `npm run dev` serves `/audio/audition-manifest.json` & `/audio/auditions/*` without including rejected/archive MP3s in `dist/`.
- Applied Egyptian Tashkeel across all `26` `spokenText` strings in `src/data/storyManifest.ts` (including Ling Six spoken letters `'الميم، والأو، والآ، والإي، والشّين، والسّين'`) while keeping un-diacritized `subtitleText`.
- Fixed dialogue ID regex in `scripts/generate-production-audio.mjs` (`scene-XX-speaker-YY`) and updated `docs/approved-voices.json`, `src/components/VoiceAuditionModal.tsx`, and `docs/voice-casting-report.md`.
- Regenerated and Chromium-verified all `26 / 26` clips (`public/audio/characters/*.mp3`, `totalDur: 213.52s`, `creditsUsedThisRun: 1,089`, `creditsRemaining: 37,347`) and synced verified `actualDurationSec` durations into `src/data/storyManifest.ts` and `public/audio/manifest.json`.

### Verified Final Build & CDP Audit Results
- `oxlint`: `0` warnings, `0` errors (`33` files).
- `tsc -b && vite build`: succeeded in `1.92s` (`DIST_CHAR_CLIPS: 26`, `DIST_AUDITIONS_EXISTS: False`, main chunk `190.33 kB` / `47.81 kB` gzip).
- Headless Chromium CDP (`verify_upgrade.mjs`): `FCP: 1036 ms`, `LCP: 1036 ms`, `CLS: 0` idle / `0.0019` post-scroll, `67 FPS` (`droppedFrames: 5` of `59`), `overflowX: false` across all `7` viewports (`360px`–`1920px`), `consoleErrorsCount: 0`, `auditionBtnHiddenInProd: true`, `reducedMotionOk: true`, and Story Mode audio playback verified (`scene-01-omar-01.mp3` `8.64s`, `scene-02-zain-04.mp3` `6.64s`, Pause/Resume/Replay/Next Scene clean with `activePlayingElements: 1`).
