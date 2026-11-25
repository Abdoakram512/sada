import React, { useState, useRef } from 'react';
import { X, Play, Square, Mic, AlertCircle, Clock } from 'lucide-react';
import { CHARACTER_VOICE_PROFILES, type CharacterId } from '../data/storyManifest';

interface VoiceAuditionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAuditionModal: React.FC<VoiceAuditionModalProps> = ({ isOpen, onClose }) => {
  const [playingId, setPlayingId] = useState<CharacterId | null>(null);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!isOpen) return null;

  const profiles = Object.values(CHARACTER_VOICE_PROFILES);

  const handlePlayAudition = async (id: CharacterId, path: string) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    setStatusNotice(null);
    try {
      const check = await fetch(path, { method: 'HEAD' });
      const contentType = check.headers.get('content-type') || '';
      if (!check.ok || contentType.includes('text/html')) {
        setStatusNotice(
          'ملفات تجارب الأداء الصوتية لم تُولّد بعد: خادم ElevenLabs MCP يحتاج إلى إعادة توثيق OAuth واعتمادكم للأصوات الخمسة.'
        );
        return;
      }

      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      audioRef.current.src = path;
      audioRef.current.onended = () => setPlayingId(null);
      await audioRef.current.play();
      setPlayingId(id);
    } catch {
      setStatusNotice('تعذر تشغيل ملف العينة الصوتية حالياً.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="معاينة أصوات الشخصيات الخمس"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
    >
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-4xl w-full text-sada-ink relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={() => {
            audioRef.current?.pause();
            setPlayingId(null);
            onClose();
          }}
          aria-label="إغلاق نافذة الأصوات"
          className="absolute top-5 left-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
          <div className="w-11 h-11 rounded-2xl bg-sada-violet text-white flex items-center justify-center">
            <Mic size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black text-sada-ink">لوحة معاينة أصوات شخصيات صدى</h3>
            <p className="text-xs font-semibold text-sada-teal">
              توثيق الأدوار الصوتية والملفات المحلية (ElevenLabs Production Pipeline)
            </p>
          </div>
        </div>

        <div className="mb-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 leading-relaxed">
            <strong className="font-bold block mb-0.5">حالة إنتاج الأصوات عبر ElevenLabs MCP:</strong>
            خادم <span className="dir-ltr font-mono">https://api.elevenlabs.io/v1/mcp</span> أعاد حالة{' '}
            <span className="dir-ltr font-mono font-bold">Unauthorized</span> عند التهيئة. بمجرد إعادة تفعيل OAuth، سيتم توليد 5 عينات قصيرة هنا للمراجعة والاعتماد قبل توليد التسجيلات الكاملة.
          </div>
        </div>

        {statusNotice && (
          <div className="mb-4 p-3 rounded-xl bg-sada-lavender/50 border border-sada-violet/20 text-xs font-bold text-sada-violet">
            {statusNotice}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profiles.map((profile) => {
            const isPlaying = playingId === profile.id;
            return (
              <div
                key={profile.id}
                className="p-4 rounded-2xl bg-sada-surface border border-sada-violet/15 flex items-start gap-4"
              >
                <img
                  src={profile.avatarImage}
                  alt={profile.name}
                  className="w-20 h-24 object-contain flex-shrink-0 rounded-xl bg-white p-1 border border-gray-100"
                />
                <div className="flex-1 min-w-0 text-right">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-base font-black text-sada-ink">{profile.name}</h4>
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: profile.accentColor }}
                    >
                      {profile.voiceModel}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-sada-ink/70 mb-1.5">{profile.roleTitle}</p>
                  <p className="text-xs text-sada-ink/75 leading-relaxed mb-2">{profile.personality}</p>
                  <div className="p-2.5 rounded-xl bg-white border border-gray-100 text-xs font-medium text-sada-ink mb-2.5">
                    «{profile.auditionText}»
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-sada-ink/60">
                    <span>Voice ID: {profile.voiceId || 'Pending Approval'}</span>
                    <button
                      type="button"
                      onClick={() => handlePlayAudition(profile.id, profile.auditionAudioPath)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-white shadow-sm transition-transform hover:scale-105"
                      style={{ backgroundColor: profile.accentColor }}
                    >
                      {isPlaying ? <Square size={12} /> : <Play size={12} />}
                      <span>{isPlaying ? 'إيقاف' : 'تشغيل العينة'}</span>
                    </button>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-sada-ink/50">
                    <Clock size={11} />
                    <span>المدة المتوقعة: ~5–7 ثوانٍ</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
