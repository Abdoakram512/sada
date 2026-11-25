# SADA Audio Production & Caching Plan

## 1. Architecture Principle
- **Build-Time / Pre-Generated Static Assets Only**: ElevenLabs MCP (`https://api.elevenlabs.io/v1/mcp`) is used strictly during production to generate local `.mp3` files under `public/audio/`.
- **Zero Runtime API Calls**: The deployed website loads only static local audio files and never exposes API keys, OAuth tokens, or per-visitor TTS costs.
- **Graceful Fallback**: If an `.mp3` clip is pending generation or fails to load, `StoryAudioController` gracefully displays timed subtitles and visual speaker focus without crashing or playing fake narration.

## 2. Directory Layout
- `public/audio/auditions/` — 5 short character auditions (`audition-omar.mp3`, `audition-maryam.mp3`, `audition-zain.mp3`, `audition-nour.mp3`, `audition-sarah.mp3`)
- `public/audio/characters/` — 26 scene dialogue clips (`scene-01-omar-01.mp3` ... `scene-11-sarah-26.mp3`)
- `public/audio/sfx/` — Subtle licensed/generated sound effects (wave transition, gentle chime, reward sparkle)
- `public/audio/ambient/` — Optional soft ambient bed (ducked during speech)
- `public/audio/manifest.json` — Cache-aware generation tracking (content hash, voice ID, model, duration, status)

## 3. Credit Budget Guardrails
- **Auditions Cap**: Maximum `500` credits across 5 short auditions (~10–12 words each, ~300–400 total characters).
- **Full Production Cap**: Maximum `6,000` credits across 26 dialogue lines (~1,900 total Arabic characters) + optional subtle SFX.
- **Cache-Aware Reuse**: Only regenerate clips whose `textHash` or `voiceId` changes.

## 4. Current Status & Blocking Dependency
- **MCP Connectivity Check**: `list_resources(ServerName="elevenlabs")` returned `Unauthorized` during `initialize`.
- **Next Steps Upon OAuth Re-Authorization**:
  1. List available ElevenLabs voices and verify subscription/credit balance & website commercial/publication licensing rights.
  2. Cast 5 distinct voices and generate the 5 auditions in `public/audio/auditions/`.
  3. Present auditions in the built-in Voice Casting Preview interface for user approval.
  4. Generate the 26 production `.mp3` clips in `public/audio/characters/`, measure actual durations via audio metadata, and update `public/audio/manifest.json` + `src/data/storyManifest.ts`.
