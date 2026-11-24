import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';

interface NavbarProps {
  currentSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSection }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundEngine.playPop();
    }
  };

  const navLinks = [
    { id: 'hero', label: 'الرئيسية' },
    { id: 'about', label: 'عن صدى' },
    { id: 'characters', label: 'الشخصيات' },
    { id: 'ling-test', label: 'أصوات لينج' },
    { id: 'training', label: 'رحلة التدريب' },
    { id: 'games', label: 'عالم الألعاب' },
    { id: 'app', label: 'التطبيق' },
    { id: 'team', label: 'فريق العمل' },
  ];

  const scrollTo = (id: string) => {
    soundEngine.playPop();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3 px-4 md:px-8 ${
        isScrolled
          ? 'bg-sada-cream/85 backdrop-blur-md shadow-sm border-b border-sada-violet/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 text-right group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sada-violet to-sada-teal flex items-center justify-center text-white shadow-md shadow-sada-violet/20 group-hover:scale-105 transition-transform">
            <span className="font-black text-lg">ص</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-sada-ink tracking-tight">صَـدَى</span>
              <span className="text-xs font-bold text-sada-violet bg-sada-lavender px-1.5 py-0.2 rounded">SADA</span>
            </div>
            <span className="text-[10px] text-sada-ink/60 font-medium">مشروع تخرج نوعي</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-sada-violet/15 shadow-sm">
          {navLinks.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
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

        {/* Actions: Audio Toggle & Quick CTA */}
        <div className="flex items-center gap-2">
          {/* Audio toggle button with visual feedback */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'تفعيل الصوت' : 'كتم الصوت'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isMuted
                ? 'bg-gray-100 text-gray-500 border-gray-200'
                : 'bg-sada-lavender text-sada-violet border-sada-violet/30 hover:bg-sada-violet hover:text-white'
            }`}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="animate-pulse" />}
            <span className="hidden sm:inline">{isMuted ? 'صوت مغلق' : 'صوت تفاعلي'}</span>
          </button>

          {/* Quick Discover CTA */}
          <button
            onClick={() => scrollTo('ling-test')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-sada-teal to-sada-violet text-white shadow-md shadow-sada-teal/20 hover:shadow-lg hover:scale-102 transition-all"
          >
            <Sparkles size={14} />
            <span>جرّب الأصوات</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/80 border border-sada-violet/20 text-sada-ink hover:text-sada-violet"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-16 bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-sada-violet/15 flex flex-col gap-2 z-50">
          <div className="text-xs font-bold text-sada-ink/50 px-2 pb-1 border-b border-gray-100 mb-1">
            أقسام رحلة صدى
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`w-full text-right px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                currentSection === link.id
                  ? 'bg-sada-violet text-white'
                  : 'text-sada-ink hover:bg-sada-lavender/50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-sada-ink/60">لكل صوت حكاية.. ولكل طفل رحلة</span>
            <button
              onClick={toggleSound}
              className="flex items-center gap-1 text-xs text-sada-violet font-semibold"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              {isMuted ? 'تفعيل الصوت' : 'كتم'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
