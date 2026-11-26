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

## Phase 3 — ElevenLabs Paid Egyptian Voice Casting & Real Audio Verification (Pending Human Approval)

### Objectives
- Verify the upgraded paid **ElevenLabs Starter** account, search the paid Voice Library for authentic Egyptian Arabic voices, compare TTS models (`eleven_v3`, `eleven_v4`, `eleven_multilingual_v2`), generate 11 improved Egyptian auditions + a 4-turn Egyptian conversation demo within the remaining authorized `3,000`-credit audition budget, preserve previous reference auditions for side-by-side comparison, and verify real `<audio>` playback in Chromium.

### Completed Tasks
- Inspected upgraded ElevenLabs account (`scripts/elevenlabs-inspect.mjs`):
  - **Tier**: `starter` (`status: active`, `40,000` monthly credits, `voice_limit: 10`, `can_use_instant_voice_cloning: true`).
  - **Egyptian Voice Library Discovery**: Queried `language=ar&accent=egyptian`, retrieving **78 verified native Egyptian Arabic voices** (`1 credit/char`).
- Generated & verified (`scripts/generate-egyptian-auditions.mjs`) **11 new native Egyptian auditions** (`omar`: `Mawardy v3`, `Mostafa v4`, `Haytham v2`; `maryam`: `Alice (EG) v3`, `Asmaa v4`; `zain`: `Ziad v3`, `Sattar v4`; `nour`: `Nadia v3`, `Ghozlan v4`; `sarah`: `Farida v3`, `Fatima v2`) + **4 new Egyptian conversation turns** (`conv_eg_01..04`):
  - Credits consumed in Egyptian batch: `434` (`39,663` credits remaining); cumulative audition spend across both rounds: `1,958 / 3,000` (`1,042` remaining inside audition cap).
  - Preserved all 15 earlier reference auditions + 4 reference turns in `public/audio/audition-manifest.json` (`26` total stored auditions + `8` total conversation turns), all verified non-empty and playable in Chromium (`2.48s`–`9.57s`).
- Upgraded `src/components/VoiceAuditionModal.tsx` with side-by-side comparison (`مرشحو المكتبة المصرية الأصيلة` vs. `المرشحون المرجعيون السابقون`), conversation group switcher (`المصري الجديد` vs. `المرجع السابق`), dialect & emotion badges, full model/voice IDs, and `sada_approved_voices_v2` export.
- Refined `src/utils/storyAudioController.ts` (`resume()` volume/mute sync) and verified genuine user-gesture HTML `<audio>` playback via CDP mouse click on `"استمع"` (`readyState: 4`, `duration: 7.44s`, `currentTime: 0.22s`, `paused: false`, `muted: false`, `volume: 1`).
- Updated `docs/voice-casting-report.md` and documented Free-tier vs. Starter-tier publication/licensing boundaries.

### Remaining Manual Actions (Approval Checkpoint)
1. Listen to the Egyptian Conversation Demo and Egyptian vs. Reference candidates inside **«أصوات الشخصيات»** and approve/adjust your 5 chosen voices.
2. Upon your approval, run `scripts/generate-production-audio.mjs` to generate all 26 production dialogue clips (within the 6,000-credit production cap) and verify Story Mode end-to-end with the final files.

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
- Verified `oxlint` (`0` warnings, `0` errors) and `tsc -b && vite build` (`0` errors).
- Ran automated headless Chromium CDP audit (`verify_upgrade.mjs`) across `1440×900` desktop and all 7 viewports (`360px`, `390px`, `430px`, `768px`, `1024px`, `1440px`, `1920px`), Story Mode interaction, upgraded `VoiceAuditionModal` (conversation demo + 15 candidates), and `prefers-reduced-motion`.

### Verified Before vs. After Lab Results (Headless Chromium CDP)
| Metric | Baseline (`80da208`) | Upgraded (Current) |
| :--- | :--- | :--- |
| `oxlint` warnings / errors | Not run | `0` warnings / `0` errors |
| Main JS chunk (uncompressed / gzip) | `502.76 kB` / `156.74 kB` | `189.59 kB` / `46.86 kB` (`VoiceAuditionModal` `14.30 kB` lazy) |
| `h1` `letter-spacing` | `-1.8px` | `normal` (`0`) |
| `h1` `line-height` / `font-size` | `72px` / `72px` (`1.00`) | `85.008px` / `61.6px` (`1.38`) |
| Console errors | `0` | `0` |
| Horizontal overflow (`360`–`1920px`) | `false` | `false` across all 7 viewports |
| `prefers-reduced-motion` support | CSS only | Verified JS + CSS (`reducedMotionOk: true`) |
| Lab Scroll FPS (60-step pass, software Chromium) | `116` FPS (static page) | `41`–`45` FPS (`droppedFrames: 8` of `59`, software rasterizer in `--headless=new`) |
| Lab FCP / LCP (headless Chromium idle) | `1400 ms` / `1400 ms` | `1664 ms` / `1664 ms` |
| Lab CLS (idle / post-scroll) | `0.084` | `0.0008` idle / `0.0011` after scroll |
| Real browser audio verification | Not run | `ok: true` (`readyState: 4`, `duration: 7.44s`, `currentTime: 0.22s`, `paused: false`) |

### Remaining Limitations & Manual Actions
1. **Approval Checkpoint**: Full 26-line production audio (`scripts/generate-production-audio.mjs`) is paused pending user review/approval of the 15 voice auditions and 4-turn conversation demo in `VoiceAuditionModal`. Keep `public/audio/auditions/` available for local preview right now; exclude internal audition files before final Vercel deployment.
2. **Physical Devices & Interactive Chrome**: Responsive checks were performed via headless Chromium viewport emulation (`360px`–`1920px`) without GPU acceleration; physical mobile testing is recommended before final public launch.
3. **Production Deployment**: No deployment to Vercel was executed (awaiting voice approval, Phase 6 audio generation, and publication approval).
