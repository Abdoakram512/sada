import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { OpeningLoader } from './components/OpeningLoader';
import { Navbar } from './components/Navbar';
import { SoundRibbon } from './components/SoundRibbon';
import { HeroSection } from './components/HeroSection';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { CharactersSection } from './components/CharactersSection';
import { LingSixSection } from './components/LingSixSection';
import { TrainingJourneySection } from './components/TrainingJourneySection';
import { GamesWorldSection } from './components/GamesWorldSection';
import { SadaExperienceSection } from './components/SadaExperienceSection';
import { AppWorkflowSection } from './components/AppWorkflowSection';
import { GuidesSection } from './components/GuidesSection';
import { GoalsSection } from './components/GoalsSection';
import { TeamSection } from './components/TeamSection';
import { FinalCelebrationSection } from './components/FinalCelebrationSection';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeRibbonColor, setActiveRibbonColor] = useState<string>('#7357D9');

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lenis: Lenis | null = null;
    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      lenis.on('scroll', (e: { progress: number }) => {
        setScrollProgress(e.progress);
        ScrollTrigger.update();
      });

      const tickerFn = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }

    // ScrollSpy to highlight active navigation link and update Sound Ribbon accent
    const sections = [
      { id: 'hero', color: '#7357D9' },
      { id: 'about', color: '#159D98' },
      { id: 'characters', color: '#FF886F' },
      { id: 'ling-test', color: '#FFC552' },
      { id: 'training', color: '#8F75EC' },
      { id: 'games', color: '#55D6BE' },
      { id: 'app', color: '#7357D9' },
      { id: 'team', color: '#159D98' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
            const found = sections.find((s) => s.id === entry.target.id);
            if (found) {
              setActiveRibbonColor(found.color);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (lenis) {
        lenis.destroy();
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-sada-cream text-sada-ink font-arabic selection:bg-sada-yellow selection:text-sada-ink">
      {/* Opening Loader */}
      {loading && <OpeningLoader onComplete={() => setLoading(false)} />}

      {/* Persistent Animated Sound Ribbon in Background */}
      <SoundRibbon scrollProgress={scrollProgress} activeColor={activeRibbonColor} />

      {/* Floating Minimal Navigation Bar */}
      <Navbar currentSection={currentSection} />

      {/* Website Chapters */}
      <main className="relative z-10">
        {/* Chapter 02: Cinematic Hero */}
        <HeroSection
          onExploreClick={() => scrollToSection('ling-test')}
          onAboutClick={() => scrollToSection('about')}
        />

        {/* Chapter 03: Why SADA Exists (Problem & Solution) */}
        <ProblemSolutionSection />

        {/* Chapter 04: Meet the 5 Illustrated Mascots */}
        <CharactersSection />

        {/* Chapter 05: Ling Six Sound Test (Educational Demonstration) */}
        <LingSixSection />

        {/* Chapter 06: Auditory Training Journey */}
        <TrainingJourneySection onPlayGame={() => scrollToSection('games')} />

        {/* Chapter 07: SADA Game World (Inspired by Nex Playground) */}
        <GamesWorldSection />

        {/* Chapter 08: The SADA Experience & Ecosystem */}
        <SadaExperienceSection />

        {/* Chapter 09: How the Application Works (6-Stage Workflow & Phone Mockup) */}
        <AppWorkflowSection />

        {/* Chapter 10: Parents & Specialists Guides */}
        <GuidesSection />

        {/* Chapter 11: Real Project Objectives & Target Impact */}
        <GoalsSection />

        {/* Chapter 12: Meet the Graduation Project Team (10 Real Students) */}
        <TeamSection />

        {/* Chapter 13: Final Cinematic Scene & Storytelling Footer */}
        <FinalCelebrationSection onScrollToTop={() => scrollToSection('hero')} />
      </main>
    </div>
  );
};

export default App;
