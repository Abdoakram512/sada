import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { SoundRibbon } from './components/SoundRibbon';
import { SceneTransitionWave } from './components/SceneTransitionWave';
import { HeroSection } from './components/HeroSection';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { AppWorkflowSection } from './components/AppWorkflowSection';
import { LingSixSection } from './components/LingSixSection';
import { TrainingJourneySection } from './components/TrainingJourneySection';
import { ListeningNoiseSection } from './components/ListeningNoiseSection';
import { GamesWorldSection } from './components/GamesWorldSection';
import { GuidesSection } from './components/GuidesSection';
import { GoalsSection } from './components/GoalsSection';
import { TeamSection } from './components/TeamSection';
import { FinalCelebrationSection } from './components/FinalCelebrationSection';
import { StoryAudioBar } from './components/StoryAudioBar';
import { STORY_SCENES } from './data/storyManifest';
import { storyAudioController } from './utils/storyAudioController';
import type { AuditorySkill } from './data/sadaData';

const VoiceAuditionModal = lazy(() =>
  import('./components/VoiceAuditionModal').then((m) => ({ default: m.VoiceAuditionModal }))
);

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [currentAnchor, setCurrentAnchor] = useState<string>('hero');
  const [selectedSkillIdForGame, setSelectedSkillIdForGame] = useState<number>(1);
  const [auditionsOpen, setAuditionsOpen] = useState<boolean>(false);

  // Mutable refs for 60 FPS SoundRibbon without React re-render churn on every scroll frame
  const scrollProgressRef = useRef<number>(0);
  const activeColorRef = useRef<string>('#7357D9');
  const lastSceneIdRef = useRef<string>('scene-01-welcome');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;

    // Use Lenis on desktop/precision pointers; let mobile touch use native momentum scrolling
    if (!prefersReducedMotion && !isCoarsePointer) {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      lenis.on('scroll', (e: { progress: number }) => {
        scrollProgressRef.current = e.progress;
        ScrollTrigger.update();
      });

      tickerFn = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    } else {
      const handleNativeScroll = () => {
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        scrollProgressRef.current = Math.min(1, Math.max(0, window.scrollY / max));
      };
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleNativeScroll);
      };
    }

    return () => {
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (lenis) lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Unified Scene Observer across all 11 connected scenes
  useEffect(() => {
    const sceneEls = Array.from(document.querySelectorAll<HTMLElement>('[data-scene-id]'));
    if (sceneEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with highest intersection ratio currently visible
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        }
        if (bestEntry) {
          const el = bestEntry.target as HTMLElement;
          const sceneId = el.dataset.sceneId;
          if (sceneId && sceneId !== lastSceneIdRef.current) {
            const meta = STORY_SCENES.find((s) => s.id === sceneId);
            if (meta) {
              lastSceneIdRef.current = sceneId;
              setCurrentAnchor(meta.anchorId);
              activeColorRef.current = meta.accentColor;
              storyAudioController.notifySceneInView(meta.id);
            }
          }
        }
      },
      {
        rootMargin: '-22% 0px -32% 0px',
        threshold: 0.2,
      }
    );

    sceneEls.forEach((el) => observer.observe(el));

    // Refresh ScrollTrigger once fonts/images settle & pre-decode below-the-fold story images well after LCP
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const assetsToDecode = [
        '/assets/group_reading_transparent.webp',
        '/assets/group_tablet.webp',
        '/assets/group_running_transparent.webp',
        '/assets/group_highfive.webp',
        '/assets/group_celebrating_transparent.webp',
        '/assets/char_guide.webp',
        '/assets/screens/screen_welcome.png',
        '/assets/screens/screen_detection.png',
        '/assets/screens/screen_noise.png',
        '/assets/screens/screen_reward.png',
        '/assets/screens/screen_dashboard.png',
        '/assets/screens/screen_timeline.png',
      ];
      assetsToDecode.forEach((src) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = src;
        if (typeof img.decode === 'function') {
          img.decode().catch(() => {});
        }
      });
    }, 2600);

    return () => {
      observer.disconnect();
      window.clearTimeout(refreshTimer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleJumpToGame = (skill: AuditorySkill) => {
    setSelectedSkillIdForGame(skill.id);
    scrollToSection('games');
  };

  return (
    <div className="relative min-h-screen bg-sada-cream text-sada-ink font-arabic selection:bg-sada-yellow selection:text-sada-ink">
      {/* Persistent Continuous Sound Ribbon */}
      <SoundRibbon scrollProgressRef={scrollProgressRef} activeColorRef={activeColorRef} />

      {/* Header Navigation */}
      <Navbar currentSection={currentAnchor} />

      {/* Main 11-Scene Continuous Story */}
      <main className="relative z-10">
        {/* Scene 01 — Welcome to SADA */}
        <HeroSection
          onExploreClick={() => scrollToSection('ling-test')}
          onAboutClick={() => scrollToSection('about')}
        />

        <SceneTransitionWave fromColor="#FFF8ED" toColor="#FDFBF7" waveColor="#159D98" />

        {/* Scene 02 — Understanding the Challenge */}
        <ProblemSolutionSection />

        <SceneTransitionWave fromColor="#FDFBF7" toColor="#FBF3E4" waveColor="#7357D9" flip />

        {/* Scene 03 — Discovering SADA */}
        <AppWorkflowSection />

        <SceneTransitionWave fromColor="#FBF3E4" toColor="#FFF8ED" waveColor="#FFC552" />

        {/* Scene 04 — Ling Six Sounds */}
        <LingSixSection />

        <SceneTransitionWave fromColor="#FFF8ED" toColor="#FDFBF7" waveColor="#8F75EC" flip />

        {/* Scene 05 — Auditory Skills Adventure (5 Core Skills) */}
        <TrainingJourneySection onPlayGame={handleJumpToGame} />

        <SceneTransitionWave fromColor="#FDFBF7" toColor="#EDF9F8" waveColor="#32B8B3" />

        {/* Scene 06 — Listening in Noise */}
        <ListeningNoiseSection onPlayGame={handleJumpToGame} />

        <SceneTransitionWave fromColor="#FFF8ED" toColor="#27213E" waveColor="#55D6BE" flip />

        {/* Scene 07 — Games & Rewards */}
        <GamesWorldSection
          selectedSkillId={selectedSkillIdForGame}
          onSelectSkillId={setSelectedSkillIdForGame}
        />

        <SceneTransitionWave fromColor="#27213E" toColor="#FFF8ED" waveColor="#159D98" />

        {/* Scene 08 — Parents & Specialists */}
        <GuidesSection />

        <SceneTransitionWave fromColor="#FFF8ED" toColor="#FDFBF7" waveColor="#7357D9" flip />

        {/* Scene 09 — The Progress Journey */}
        <GoalsSection />

        <SceneTransitionWave fromColor="#FDFBF7" toColor="#FFF8ED" waveColor="#159D98" />

        {/* Scene 10 — Meet the Team */}
        <TeamSection />

        <SceneTransitionWave fromColor="#FFF8ED" toColor="#27213E" waveColor="#FFC552" flip />

        {/* Scene 11 — The Ending */}
        <FinalCelebrationSection onScrollToTop={() => scrollToSection('hero')} />
      </main>

      {/* Centralized Audio Controller Dock & Live RTL Subtitles */}
      <StoryAudioBar onOpenAuditions={() => setAuditionsOpen(true)} />

      {/* Voice Casting & Audition Review Modal */}
      <Suspense fallback={null}>
        <VoiceAuditionModal isOpen={auditionsOpen} onClose={() => setAuditionsOpen(false)} />
      </Suspense>
    </div>
  );
};

export default App;
