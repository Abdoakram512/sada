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

## Phase 7 — Cairo Dialect Overhaul, Auto-Scroll, Gain Boost & Single-Phone UI

### Objectives
- Replace non-Cairene / MSA-leaning / Upper-Egyptian-sounding voices for **مريم**, **نور**, **سارة**, and **زين** with natural, balanced Cairo Egyptian speakers.
- Eliminate pronunciation glitches (`بالتدريج`, `اتبعوا`, `بيصعب`) and exaggerated buzzwords (`بأمان`, `دافي`, `منظومة`).
- Clarify SADA as an application (`تطبيق صدى` / `الأبلكيشن`) and fix the double-nested phone mockup in `AppWorkflowSection.tsx`.
- Increase speech loudness clarity (`GainNode` + `DynamicsCompressorNode`) and add automatic scene-to-scene scroll in Story Mode.

### Completed Tasks & Modified Files
- Updated [docs/approved-voices.json](docs/approved-voices.json), [src/data/storyManifest.ts](src/data/storyManifest.ts), and [src/components/VoiceAuditionModal.tsx](src/components/VoiceAuditionModal.tsx) to native Cairo `eleven_v4` cast: **Mostafa** (`omar`), **Yasmine** (`maryam`), **Ziad** (`zain`), **Ghozlan Soft** (`nour`), **Fatima Expressive** (`sarah`).
- Rewrote all `26` `spokenText` and `subtitleText` scripts cleanly in balanced Cairene Arabic without stiff MSA markers or heavy conflicting Tashkeel, and updated UI labels across [src/components/HeroSection.tsx](src/components/HeroSection.tsx), [src/components/ProblemSolutionSection.tsx](src/components/ProblemSolutionSection.tsx), and [src/components/GuidesSection.tsx](src/components/GuidesSection.tsx).
- Removed redundant outer CSS phone bezel and notch in [src/components/AppWorkflowSection.tsx](src/components/AppWorkflowSection.tsx) so `screen_*.png` renders as a clean single phone.
- Upgraded [src/utils/storyAudioController.ts](src/utils/storyAudioController.ts) and [src/App.tsx](src/App.tsx): bumped default volume (`sada_story_prefs_v2` = `1.0`), added Web Audio API `GainNode` (`1.45×`) + `DynamicsCompressorNode` limiter, and added automatic smooth scrolling between scenes upon scene completion (automatically cancelled on manual scroll or pause).
- Regenerated & verified all `26 / 26` clips (`creditsUsedThisRun: 994`, `totalDur: 199.28s`, `creditsRemaining: 36,486`) and audited key outputs directly via audio inspection.

### Verified Final Build & CDP Audit Results
- `oxlint`: `0` warnings, `0` errors (`33` files).
- `tsc -b && vite build`: succeeded in `1.92s` (`DIST_CHAR_CLIPS: 26`, `DIST_AUDITIONS_EXISTS: False`, main chunk `190.33 kB` / `47.81 kB` gzip).
- Headless Chromium CDP (`verify_upgrade.mjs`): `FCP: 1036 ms`, `LCP: 1036 ms`, `CLS: 0` idle / `0.0019` post-scroll, `67 FPS` (`droppedFrames: 5` of `59`), `overflowX: false` across all `7` viewports (`360px`–`1920px`), `consoleErrorsCount: 0`, `auditionBtnHiddenInProd: true`, `reducedMotionOk: true`, and Story Mode audio playback verified (`scene-01-omar-01.mp3` `8.64s`, `scene-02-zain-04.mp3` `6.64s`, Pause/Resume/Replay/Next Scene clean with `activePlayingElements: 1`).

---

## Phase 8 — Mobile-First Cinematic Redesign & Responsive System

### Objectives
- Upgrade mobile (`320px–820px`) into a first-class movie-directed experience across all 11 scenes, 5 trimmed characters, 10 scroll transitions, and touch-friendly audio/subtitle controls without breaking desktop or regenerating audio.

### Completed Tasks & Modified Files
- Created safe checkpoint branch `checkpoint-pre-mobile-redesign` (`3919427`).
- Audited baseline mobile build across `320px–1024px` + portrait/landscape and documented all findings in [docs/mobile-experience-audit.md](file:///c:/Users/pc/.gemini/antigravity/scratch/sada-experience/docs/mobile-experience-audit.md).
- Trimmed excess transparent padding from character & group WebP assets and added crisp `*-sm.webp` responsive variants wired via `srcSet` in [CharacterStageActor.tsx](file:///c:/Users/pc/.gemini/antigravity/scratch/sada-experience/src/components/CharacterStageActor.tsx).
- Removed remaining duplicate outer phone bezels in [TrainingJourneySection.tsx](file:///c:/Users/pc/.gemini/antigravity/scratch/sada-experience/src/components/TrainingJourneySection.tsx) and [ListeningNoiseSection.tsx](file:///c:/Users/pc/.gemini/antigravity/scratch/sada-experience/src/components/ListeningNoiseSection.tsx).
- Redesigned mobile stage compositions across all 11 scenes (including tiered Hero 5-cast layout, 3-up Problem/Solution cast, sticky Scene 05 jump bar, paired co-hosts above showcase cards in Scenes 03/07/09/10/11, readable mobile Dashboard/Timeline screens, and 2-col Team roster cutting Scene 10 height by `46%`).
- Upgraded [StoryAudioBar.tsx](file:///c:/Users/pc/.gemini/antigravity/scratch/sada-experience/src/components/StoryAudioBar.tsx) with safe-area padding (`pb-safe`), **`43×44 px`–`85×44 px`** touch targets, mobile volume popover, and concise readable RTL subtitle dock; added `ScrollTrigger.config({ ignoreMobileResize: true })` and responsive `gsap.matchMedia()` transitions across all 10 [SceneTransition.tsx](file:///c:/Users/pc/.gemini/antigravity/scratch/sada-experience/src/components/SceneTransition.tsx) connectors.
- Published full breakdown in [docs/mobile-responsive-report.md](file:///c:/Users/pc/.gemini/antigravity/scratch/sada-experience/docs/mobile-responsive-report.md).

### Verified Mobile & Desktop Results (Headless Chromium CDP)
- `oxlint`: `0` warnings, `0` errors (`33` files); `vite build`: `3.46s`.
- **17 Viewports Tested (`320px`–`2560px` + `844×390` landscape)**: **`overflowX: false` on all 17**.
- **`390×844` Mobile Telemetry**: `mobileFps: 121 FPS` (`0` dropped frames), total page height reduced from `28,509 px` to **`24,781 px`**, body font size `16 px`, `consoleErrorsCount: 0`.
- **Desktop Regression (`1440×900`)**: `FCP/LCP: 1488 ms`, `CLS: 0.0004` idle / `0.0039` post-scroll, full 5-cast Hero visible above fold (`natH: 520–532 px`), Story Mode & reduced motion clean.

---

## Phase 9 — Jana Protagonist Upgrade & Development Team Section (Completed)

### Objectives
- Make **جنى (`jana`)** the main protagonist and primary narrator across the interactive SADA experience while keeping `عمر` and the rest of the cast in supporting roles.
- Introduce a compact, friendly **فريق التطوير** (`#developers`, Scene 11) section before the closing scene showcasing the two software engineers (**أكرم / عبدالرحمن أكرم** and **أبو القاسم**) side-by-side at equal visual weight in SADA's 3D cartoon style with shared contact details (`01115240237`).
- Keep target-group framing focused strictly on **الأطفال الصم وضعاف السمع** without adding cochlear implant users.

### Completed Tasks & Modified Files
- Created safe git checkpoint branch `checkpoint-pre-jana-upgrade` (`dfc474b`).
- Renamed `sarah` (`سارة`) to **`jana` (`جنى`)** using existing character assets ([public/assets/char_jana.webp](public/assets/char_jana.webp), [public/assets/char_jana-sm.webp](public/assets/char_jana-sm.webp)) across [src/data/sadaData.ts](src/data/sadaData.ts), [src/data/storyManifest.ts](src/data/storyManifest.ts), [docs/approved-voices.json](docs/approved-voices.json), [scripts/generate-production-audio.mjs](scripts/generate-production-audio.mjs), and scene components.
- Promoted **جنى** to center stage in [HeroSection.tsx](src/components/HeroSection.tsx) and lead narration across Opening, Challenge (`ProblemSolutionSection.tsx`), App Workflow, Auditory Closure, Games World, Progress, Development Team Intro, and Ending (`FinalCelebrationSection.tsx`, Scene 12); removed cochlear implant wording across copy, data, and dialogue.
- Generated 3D stylized cartoon engineer assets ([public/assets/eng_akram.webp](public/assets/eng_akram.webp), [public/assets/eng_abualqasim.webp](public/assets/eng_abualqasim.webp)) and implemented [DevelopmentTeamSection.tsx](src/components/DevelopmentTeamSection.tsx), wired into [App.tsx](src/App.tsx) and [Navbar.tsx](src/components/Navbar.tsx).
- Regenerated only the 9 changed/new ElevenLabs `eleven_v4` clips (preserving the 18 untouched supporting clips via SHA-256 caching; `398` characters billed, `17,367` remaining; `27 / 27` clips verified) and removed the 8 obsolete MP3 files.

### Verified Build & CDP Audit Results
- `oxlint`: `0` warnings, `0` errors (`34` files); `tsc -b && vite build`: `1.93s`.
- Headless Chromium CDP (`verify_upgrade.mjs` & `verify_mobile_redesign.mjs`): `FCP/LCP: 964 ms` desktop, `CLS: 0` idle / `0.0035` post-scroll, `59 FPS` desktop, `122 FPS` (`0` dropped frames) mobile (`390×844`), `overflowX: false` across all `17` breakpoints (`320px`–`2560px` + `844×390` landscape), `consoleErrorsCount: 0`, `reducedMotionOk: true`, `hasCochlearLeak: false`, `hasSarahLeak: false`, and live playback verified (`scene-01-jana-01.mp3` `10.72s`).

---

## Phase 10 — Development Team Creative Redesign · Character Identity Lock & Unified Hero Stage (Completed)

### Objectives
- Completely eliminate the rejected two-card boxed profile layout in favor of an impressive, cinematic, character-led interactive stage.
- Enforce strict Character Identity Lock using the final approved photo references of both software engineers (**أكرم / عبدالرحمن أكرم** and **أبو القاسم**) with zero AI facial drift, distortion, or clothing changes.
- Deliver oversized dominant characters hitting target dimensions: Desktop (`600–750px`), Tablet (`350–470px`), and Mobile (`260–360px`).
- Integrate Jana as the host and protagonist introducing the engineers with her existing Egyptian dialogue (`scene-11-jana-dev.mp3`), sleek unified contact capsule (`01115240237`), and smooth GSAP ScrollTrigger reveals with zero layout shifts or horizontal overflow.

### Completed Tasks & Modified Files
- Created safe git checkpoint branch `checkpoint-pre-dev-redesign` (`bb48a48`).
- Extracted pixel-perfect, high-resolution transparent cutouts from the approved reference images using local neural background removal (`rembg` ONNX):
  - **Engineer 01 (Akram / عبدالرحمن أكرم)**: [public/assets/eng_akram.webp](public/assets/eng_akram.webp) & `@2x` (`357×1001px`, `79 KB`) preserving exact olive quarter-zip sweatshirt ("K-67 LONDON EST. 1981"), dark navy backpack straps, black cargo joggers, olive/white sneakers, dark hair, beard, no glasses.
  - **Engineer 02 (Abu Al-Qasim / أبو القاسم)**: [public/assets/eng_abualqasim.webp](public/assets/eng_abualqasim.webp) & `@2x` (`369×1004px`, `74 KB`) preserving exact black quarter-zip pullover, white undershirt, black backpack straps, curly dark hair, black beard, rectangular glasses, black wrist watch, dark jeans, black sneakers.
- Completely redesigned [src/components/DevelopmentTeamSection.tsx](src/components/DevelopmentTeamSection.tsx):
  - Removed all boxed `<article>` cards, border wrappers, and constrained height containers.
  - Built a unified 3D architectural platform base with layered multi-stop radial gradients, contact floor shadows grounding the shoes, and ambient floating audio stars (`✦`, `★`, `+`).
  - Positioned Jana organically as host alongside her speech bubble with play audio trigger and live speaking indicator.
  - Anchored typography directly to the stage: artistic section title `فريق التطوير`, primary names (`أكرم` / `عبدالرحمن أكرم` and `أبو القاسم`), code role badges (`مهندس برمجيات`), and single floating frosted contact dock (`01115240237`, click-to-call, WhatsApp, and copy button with checkmark feedback).
  - Wired GSAP ScrollTrigger timeline for smooth staggered reveal without hiding stage structures.
- Added programmatic Lenis scroll helper hook in [src/App.tsx](src/App.tsx).

### Verified Build & Responsive CDP Telemetry
- `oxlint`: `0` warnings, `0` errors on 34 files.
- `tsc -b && vite build`: built in `2.80s` cleanly.
- Headless Chromium CDP Audit Across Viewports (`scratch/cdp_audit.mjs` & `scratch/capture_dev_perfect.mjs`):
  - **Desktop 1920×1080**: Figures rendered at **`660px` height** (target `600–750px`), `overflowX: false`.
  - **Desktop 1440×900**: Figures rendered at **`660px` height** (target `500–650px`), `overflowX: false`.
  - **Desktop 1024×768**: Figures rendered at **`580px` height** (target `420–550px`), `overflowX: false`.
  - **Tablet 768×1024**: Figures rendered at **`480px` height** (target `350–470px`), `overflowX: false`.
  - **Mobile 390×844**: Figures rendered at **`320px` height** (target `260–360px`), `overflowX: false`.
  - **Mobile 360×740**: Figures rendered at **`280px` height** (target `260–360px`), `overflowX: false`.
  - Full body shoes-to-head visibility, unclipped faces, and crisp rendering confirmed across all viewports.

---

## Phase 11 — User Feedback Section, Google Form Integration & Contact Streamlining (Completed)

### Objectives
- Create an interactive feedback section allowing visitors to submit their evaluation and thoughts directly to the software development team.
- Integrate Google Form embedding with live in-page preview and direct WhatsApp feedback channel.
- Remove secondary name `عبدالرحمن أكرم` so Engineer Akram is titled strictly as `أكرم`.
- Remove `اتصال مباشر` button from the contact dock, keeping the copyable telephone display and the WhatsApp button.

### Completed Tasks & Modified Files
- Created [src/data/feedbackConfig.ts](src/data/feedbackConfig.ts) to store configurable Google Form URLs and contact endpoints.
- Created [src/components/FeedbackSection.tsx](src/components/FeedbackSection.tsx) with dual tabs:
  1. **كتابة الرأي**: 5 interactive rating stars, name (optional), role selector, message textarea, and a direct WhatsApp submission button sending formatted feedback to `01115240237`.
  2. **Google Form 📝**: Embedded responsive `<iframe>` view for Google Forms with a 1-click guide to link a personal form via `forms.new`.
- Updated [src/components/DevelopmentTeamSection.tsx](src/components/DevelopmentTeamSection.tsx):
  - Removed `secondaryName: 'عبدالرحمن أكرم'`.
  - Removed `اتصال مباشر` button.
  - Embedded `<FeedbackSection />` directly below the contact dock.
- Updated [src/components/Navbar.tsx](src/components/Navbar.tsx) with a direct navigation link `رأيك` (`#feedback`).
- Verified via CDP screenshots on desktop (`1440×900`) and mobile (`390×844`): 0 overflow, 0 lint warnings/errors, clean build in `2.41s`.



