import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';
import { storyAudioController } from '../utils/storyAudioController';
import { useStoryAudio } from '../hooks/useStoryAudio';

interface NavbarProps {
  currentSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSection }) => {
  const { isMuted } = useStoryAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'البداية' },
    { id: 'about', label: 'التحدي' },
    { id: 'app', label: 'التطبيق' },
    { id: 'ling-test', label: 'أصوات لينج' },
    { id: 'training', label: 'المهارات' },
    { id: 'noise', label: 'الضوضاء' },
    { id: 'games', label: 'الألعاب' },
    { id: 'guides', label: 'الأدلة' },
    { id: 'team', label: 'الفريق' },
  ];

  const scrollTo = (id: string) => {
    soundEngine.playPop();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 pt-safe-nav pb-2.5 px-3.5 sm:px-4 md:px-8 ${
        isScrolled
          ? 'bg-sada-cream/95 shadow-sm border-b border-sada-violet/10'
          : 'bg-sada-cream/90'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 text-right group focus:outline-none flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sada-violet to-sada-teal flex items-center justify-center text-white shadow-md shadow-sada-violet/20 group-hover:scale-105 transition-transform">
            <span className="font-black text-lg">ص</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-black text-sada-ink">صَـدَى</span>
              <span className="dir-ltr text-[11px] font-bold text-sada-violet bg-sada-lavender px-1.5 py-0.5 rounded">
                SADA
              </span>
            </div>
            <span className="text-[10px] text-sada-ink/65 font-semibold hidden sm:block">
              لكل صوت حكاية، ولكل طفل رحلة
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="فصول القصة"
          className="hidden xl:flex items-center gap-1 bg-white/95 px-2.5 py-1.5 rounded-full border border-sada-violet/15 shadow-sm"
        >
          {navLinks.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-sada-violet text-white shadow-sm'
                    : 'text-sada-ink/80 hover:text-sada-violet hover:bg-sada-lavender/40'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => storyAudioController.toggleMute()}
            aria-label={isMuted ? 'تفعيل الصوت' : 'كتم الصوت'}
            className={`min-h-[44px] min-w-[44px] sm:min-h-[38px] sm:min-w-0 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              isMuted
                ? 'bg-gray-100 text-gray-600 border-gray-200'
                : 'bg-sada-lavender text-sada-violet border-sada-violet/30 hover:bg-sada-violet hover:text-white'
            }`}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span className="hidden sm:inline">{isMuted ? 'صوت مغلق' : 'الصوت مفعّل'}</span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo('ling-test')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-sada-teal to-sada-violet text-white shadow-md shadow-sada-teal/20 hover:shadow-lg transition-all"
          >
            <Sparkles size={14} />
            <span>أصوات لينج</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/90 border border-sada-violet/20 text-sada-ink hover:text-sada-violet active:scale-95 transition-transform"
            aria-label="قائمة فصول القصة"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-4 top-16 bg-white/95 p-5 rounded-3xl shadow-2xl border border-sada-violet/15 flex flex-col gap-1.5 z-50 max-h-[75vh] overflow-y-auto">
          <div className="text-xs font-bold text-sada-ink/55 px-2 pb-2 border-b border-gray-100 mb-1">
            فصول رحلة صدى (11 مشهداً)
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className={`min-h-[44px] flex items-center text-right px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all active:scale-95 ${
                  currentSection === link.id
                    ? 'bg-sada-violet text-white'
                    : 'text-sada-ink bg-sada-surface hover:bg-sada-lavender/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
