import React, { useState } from 'react';
import { Sparkles, ArrowUp, FileText, Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audioEngine';

interface FinalCelebrationSectionProps {
  onScrollToTop: () => void;
}

export const FinalCelebrationSection: React.FC<FinalCelebrationSectionProps> = ({
  onScrollToTop
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const triggerCelebration = () => {
    soundEngine.playSuccess();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7357D9', '#159D98', '#FFC552', '#FF886F']
    });
  };

  return (
    <footer className="relative pt-24 pb-12 px-4 md:px-8 bg-gradient-to-b from-[#27213E] via-[#1D1830] to-[#120F20] text-white overflow-hidden">
      {/* Background Starlight & Auroral Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-sada-violet/20 via-sada-teal/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {/* Celebration Headline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sada-yellow text-xs font-bold mb-6 backdrop-blur-md">
          <Sparkles size={16} />
          <span>الختام الاحتفالي · The Sound Odyssey</span>
        </div>

        <h2 className="text-3xl sm:text-6xl font-black tracking-tight leading-tight mb-4">
          «مع كل صوت... <span className="bg-gradient-to-r from-sada-yellow via-sada-coral to-sada-teal-light bg-clip-text text-transparent">تبدأ فرصة جديدة»</span>
        </h2>

        <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed font-medium mb-10">
          صوت الضحكة، نغمة الجرس، وكلمات الحكاية الأولى؛ مع صدى تصبح كل خطوة استماع رحلة تستحق الاحتفال والتوثيق.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={triggerCelebration}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sada-yellow to-amber-500 text-sada-ink font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles size={18} />
            <span>احتفل بنجاح الجلسة</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playPop();
              setModalOpen(true);
            }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 shadow-md hover:scale-102 transition-all"
          >
            <FileText size={18} />
            <span>ملخص بطاقة المشروع</span>
          </button>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/15 text-white/80 font-bold text-sm border border-white/10 transition-all"
          >
            <ArrowUp size={16} />
            <span>العودة للأعلى</span>
          </button>
        </div>

        {/* Celebratory Group Mascot Art */}
        <div className="relative max-w-3xl mx-auto h-[320px] sm:h-[420px] flex items-end justify-center mb-12 select-none">
          <img
            src="/assets/group_celebrating_transparent.png"
            alt="أبطال صدى يحتفلون معاً"
            className="relative z-10 max-h-full w-auto object-contain drop-shadow-[0_20px_40px_rgba(115,87,217,0.4)] hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Storytelling Footer Bottom Info */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">صَـدَى · SADA</span>
            <span>—</span>
            <span>مشروع تخرج نوعي لخدمة الأطفال ضعاف السمع</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              صُنع بكل <Heart size={13} className="text-rose-400 fill-rose-400" /> من أجل كل طفل
            </span>
            <span>•</span>
            <span>جميع الحقوق محفوظة 2026</span>
          </div>
        </div>
      </div>

      {/* Project Summary Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-sada-ink relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 left-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="إغلاق"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-sada-violet text-white flex items-center justify-center font-black text-xl">
                ص
              </div>
              <div>
                <h3 className="text-xl font-black">بطاقة تعريف مشروع صدى (SADA)</h3>
                <span className="text-xs text-sada-teal font-bold">وثيقة المشروع الأكاديمية الرسمية</span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-sada-ink/80 leading-relaxed text-right">
              <p>
                <strong className="text-sada-ink font-bold">طبيعة المشروع:</strong> تطبيق تفاعلي رقمي لتقييم الاستجابة السمعية وتنمية المهارات السمعية لدى الأطفال ضعاف السمع من مستخدمي السماعات الطبية وزراعة القوقعة.
              </p>
              <p>
                <strong className="text-sada-ink font-bold">المكونات الأساسية:</strong>
                <br />
                ١. اختبار أصوات لينج الستة (/m/, /u/, /a/, /i/, /ʃ/, /s/).
                <br />
                ٢. تقييم المهارات السمعية الخمس (إدراك، تمييز، تعرف وربط، فهم، إغلاق).
                <br />
                ٣. وحدة تطبيقية إضافية للاستماع في وجود ضوضاء باشتراطات سلامة معتمدة.
                <br />
                ٤. نظام ألعاب تعزيزية ومكافآت بصرية للطفل.
                <br />
                ٥. أدلة إرشادية مخصصة لكل من ولي الأمر والأخصائي.
              </p>
              <div className="p-4 rounded-2xl bg-sada-surface border border-sada-violet/10 text-xs">
                <strong className="text-sada-violet block mb-1">فريق العمل (10 باحثين):</strong>
                جني محمود عزت رضوان، فهد جلال صلاح، شيرين وليد، رحمة شعبان، جيهان محمد فاروق، همس عبد الله عبد السميع، سلمى احمد رضوان، لمياء محمد ابراهيم، ياسمين ايمن محمد، ماجده نبوي حفني.
              </div>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="w-full mt-6 py-3 rounded-xl bg-sada-violet hover:bg-sada-violet-dark text-white font-bold text-sm shadow-md transition-all"
            >
              إغلاق النافذة
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
