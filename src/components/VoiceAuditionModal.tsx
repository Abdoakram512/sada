import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  Square,
  Mic,
  Check,
  Sparkles,
  Download,
  Copy,
  Users,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { CHARACTER_VOICE_PROFILES, type CharacterId } from '../data/storyManifest';
import { storyAudioController } from '../utils/storyAudioController';

interface AuditionCandidate {
  id: string;
  characterId: CharacterId;
  characterName: string;
  voiceName: string;
  voiceId: string;
  modelId: string;
  tier?: 'egyptian-library' | 'premade-reference';
  accent?: string;
  emotionTag?: string;
  text: string;
  settings: { stability: number; similarity_boost: number; style: number };
  recommended: boolean;
  rationale: string;
  audioPath: string;
  fileSizeBytes: number;
  durationSec: number;
  status: string;
}

interface ConversationTurn {
  id: string;
  characterId: CharacterId;
  characterName: string;
  voiceName: string;
  voiceId: string;
  modelId: string;
  tier?: 'egyptian-library' | 'premade-reference';
  text: string;
  audioPath: string;
  durationSec: number;
}

interface AuditionManifest {
  subscriptionTier: string;
  creditsBefore: number;
  creditsAfter: number;
  creditsUsedThisRun: number;
  totalAuditionCreditsConsumed?: number;
  auditionBudgetCap?: number;
  auditions: AuditionCandidate[];
  conversation: ConversationTurn[];
}

interface VoiceAuditionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const APPROVED_STORAGE_KEY = 'sada_approved_voices_v3';

export const VoiceAuditionModal: React.FC<VoiceAuditionModalProps> = ({ isOpen, onClose }) => {
  const [manifest, setManifest] = useState<AuditionManifest | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [convPlayingIndex, setConvPlayingIndex] = useState<number | null>(null);
  const [convGroup, setConvGroup] = useState<'egyptian' | 'reference'>('egyptian');
  const [copiedMsg, setCopiedMsg] = useState<boolean>(false);

  const [selectedVoices, setSelectedVoices] = useState<Record<CharacterId, string>>(() => {
    try {
      const saved = localStorage.getItem(APPROVED_STORAGE_KEY);
      if (saved) return JSON.parse(saved) as Record<CharacterId, string>;
    } catch {}
    return {
      omar: 'omar_eg_mostafa_v4',
      maryam: 'mariam_eg_heba_v3',
      zain: 'zein_eg_sattar_v4',
      nour: 'nour_eg_nadia_v3',
      sarah: 'sara_eg_farida_v3',
    };
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const convIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/audio/audition-manifest.json')
      .then((res) => {
        if (!res.ok) throw new Error('تعذر تحميل ملف عينات الأصوات');
        return res.json() as Promise<AuditionManifest>;
      })
      .then((data) => {
        setManifest(data);
        setLoadError(null);
      })
      .catch((err) => {
        setLoadError(err instanceof Error ? err.message : 'تعذر تحميل عينات الأصوات');
      });
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  if (!isOpen) return null;

  const stopAll = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingId(null);
    setConvPlayingIndex(null);
    convIndexRef.current = null;
    setAudioProgress(0);
  };

  const ensureAudio = (): HTMLAudioElement => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('timeupdate', () => {
        const el = audioRef.current;
        if (!el || !el.duration || Number.isNaN(el.duration)) return;
        setAudioProgress(el.currentTime / el.duration);
      });
    }
    return audioRef.current;
  };

  const handlePlayCandidate = async (cand: AuditionCandidate) => {
    if (playingId === cand.id) {
      stopAll();
      return;
    }

    // Pause main story controller to guarantee zero audio overlap
    if (storyAudioController.getState().status === 'playing') {
      storyAudioController.pause();
    }

    stopAll();
    const audio = ensureAudio();
    audio.src = cand.audioPath;
    audio.onended = () => {
      setPlayingId(null);
      setAudioProgress(0);
    };
    setPlayingId(cand.id);
    try {
      await audio.play();
    } catch {
      setLoadError('تعذر تشغيل العينة الصوتية؛ تأكد من سماح المتصفح بتشغيل الصوت.');
      setPlayingId(null);
    }
  };

  const playConversationTurn = async (turns: ConversationTurn[], idx: number) => {
    if (idx >= turns.length) {
      stopAll();
      return;
    }
    const turn = turns[idx];
    const audio = ensureAudio();
    convIndexRef.current = idx;
    setConvPlayingIndex(idx);
    setPlayingId(turn.id);
    setAudioProgress(0);
    audio.src = turn.audioPath;
    audio.onended = () => {
      if (convIndexRef.current === idx) {
        void playConversationTurn(turns, idx + 1);
      }
    };
    try {
      await audio.play();
    } catch {
      stopAll();
    }
  };

  const activeConvTurns = (manifest?.conversation || []).filter((t) =>
    convGroup === 'egyptian' ? t.tier === 'egyptian-library' : t.tier !== 'egyptian-library'
  );

  const handleToggleConversation = () => {
    if (!activeConvTurns.length) return;
    if (convPlayingIndex !== null) {
      stopAll();
      return;
    }
    if (storyAudioController.getState().status === 'playing') {
      storyAudioController.pause();
    }
    stopAll();
    void playConversationTurn(activeConvTurns, 0);
  };

  const handleSelectCandidate = (charId: CharacterId, candidateId: string) => {
    const next = { ...selectedVoices, [charId]: candidateId };
    setSelectedVoices(next);
    try {
      localStorage.setItem(APPROVED_STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const buildApprovedPayload = () => {
    const byId = new Map((manifest?.auditions || []).map((a) => [a.id, a]));
    const characters: Record<
      string,
      { voiceId: string; voiceName: string; modelId: string; settings: AuditionCandidate['settings'] }
    > = {};
    (Object.keys(selectedVoices) as CharacterId[]).forEach((charId) => {
      const cand = byId.get(selectedVoices[charId]);
      if (cand) {
        characters[charId] = {
          voiceId: cand.voiceId,
          voiceName: cand.voiceName,
          modelId: cand.modelId,
          settings: cand.settings,
        };
      }
    });
    return { approvedAt: new Date().toISOString(), characters };
  };

  const handleCopyApproved = async () => {
    const payload = JSON.stringify(buildApprovedPayload(), null, 2);
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedMsg(true);
      window.setTimeout(() => setCopiedMsg(false), 2500);
    } catch {}
  };

  const handleDownloadApproved = () => {
    const payload = JSON.stringify(buildApprovedPayload(), null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'approved-voices.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const profiles = Object.values(CHARACTER_VOICE_PROFILES);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="معاينة ومقارنة أصوات شخصيات صدى"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 animate-fade-in"
    >
      <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-5xl w-full text-sada-ink relative shadow-2xl max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={() => {
            stopAll();
            onClose();
          }}
          aria-label="إغلاق نافذة الأصوات"
          className="sticky top-0 float-left p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sada-violet text-white flex items-center justify-center">
              <Mic size={20} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-sada-ink">
                تجارب أداء أصوات شخصيات صدى (Voice Casting)
              </h3>
              <p className="text-xs font-semibold text-sada-teal-dark">
                استمع وقارن 3 مرشحين لكل شخصية قبل اعتماد توليد المقاطع الكاملة (26 جملة)
              </p>
            </div>
          </div>

          {manifest && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyApproved}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sada-lavender text-sada-violet text-xs font-extrabold hover:bg-sada-violet hover:text-white transition-colors"
              >
                {copiedMsg ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedMsg ? 'تم النسخ!' : 'نسخ الاختيارات المعتمدة'}</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadApproved}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sada-teal text-white text-xs font-extrabold hover:bg-sada-teal-dark transition-colors"
              >
                <Download size={14} />
                <span className="dir-ltr">approved-voices.json</span>
              </button>
            </div>
          )}
        </div>

        {/* Subscription & Audition Budget Banner */}
        <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
          <AlertCircle size={18} className="text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-950 leading-relaxed">
            <strong className="font-bold block mb-0.5">
              حالة الحساب المحدّثة: ElevenLabs Starter (مدفوع — {manifest ? `${manifest.creditsAfter.toLocaleString()} كريدت متبقٍ` : '40,000 كريدت'}):
            </strong>
            تم فتح مكتبة الأصوات المصرية الأصلية (<span className="font-bold">78 صوتًا مصريًا</span>)، وتوليد 11 مرشحًا مصريًا جديدًا + حوار مشترك مصري بتكلفة <span className="dir-ltr font-mono">{manifest?.creditsUsedThisRun ?? 434}</span> كريدت (الإجمالي التراكمي للتجارب <span className="dir-ltr font-mono">{manifest?.totalAuditionCreditsConsumed ?? 1958} / {manifest?.auditionBudgetCap ?? 3000}</span>). تم الاحتفاظ بالمرشحين السابقين للمقارنة المباشرة؛ ويُرجى ملاحظة أن تسجيلات المرحلة المجانية السابقة تخضع لشروط الاستخدام غير التجاري وإشارة الإسناد بخلاف الأصوات المولّدة تحت الاشتراك المدفوع.
          </div>
        </div>

        {loadError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
            {loadError}
          </div>
        )}

        {/* Multi-Character Conversation Preview */}
        {manifest?.conversation && manifest.conversation.length > 0 && (
          <div className="mb-6 p-5 rounded-3xl bg-gradient-to-br from-sada-ink to-[#2F274B] text-white shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <Users size={18} className="text-sada-yellow" />
                <div>
                  <h4 className="text-sm sm:text-base font-black">
                    معاينة حوار مشترك بين الشخصيات (4 أدوار متتالية)
                  </h4>
                  <p className="text-[11px] text-white/70">
                    قارن تباين الأصوات وتسليم الحوار المصري الجديد مقابل النسخة المرجعية السابقة
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-xl bg-white/10 p-1 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      stopAll();
                      setConvGroup('egyptian');
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      convGroup === 'egyptian' ? 'bg-sada-teal text-white' : 'text-white/75 hover:text-white'
                    }`}
                  >
                    المصري الجديد (مكتبة مدفوعة)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      stopAll();
                      setConvGroup('reference');
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      convGroup === 'reference' ? 'bg-white/25 text-white' : 'text-white/75 hover:text-white'
                    }`}
                  >
                    المرجع السابق
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleToggleConversation}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sada-yellow text-sada-ink font-black text-xs shadow-md hover:scale-105 transition-transform"
                >
                  {convPlayingIndex !== null ? <Square size={13} /> : <Play size={13} />}
                  <span>{convPlayingIndex !== null ? 'إيقاف الحوار' : 'تشغيل الحوار المشترك'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {activeConvTurns.map((turn, idx) => {
                const isTurnPlaying = convPlayingIndex === idx;
                const prof = CHARACTER_VOICE_PROFILES[turn.characterId];
                return (
                  <div
                    key={turn.id}
                    className={`p-3 rounded-2xl border transition-all text-right ${
                      isTurnPlaying
                        ? 'bg-white/20 border-sada-yellow ring-2 ring-sada-yellow/40'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className="text-[11px] font-black px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: prof.accentColor }}
                      >
                        {turn.characterName} ({turn.voiceName})
                      </span>
                      <span className="dir-ltr text-[10px] text-white/70">{turn.durationSec}s</span>
                    </div>
                    <p className="text-xs text-white/90 leading-relaxed">{turn.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5 Character Casting Cards */}
        <div className="space-y-5">
          {profiles.map((profile) => {
            const allCands = (manifest?.auditions || []).filter((a) => a.characterId === profile.id);
            const egCands = allCands.filter((a) => a.tier === 'egyptian-library');
            const refCands = allCands.filter((a) => a.tier !== 'egyptian-library');
            const selectedId = selectedVoices[profile.id];

            const renderCandidateCard = (cand: AuditionCandidate) => {
              const isPlaying = playingId === cand.id && convPlayingIndex === null;
              const isSelected = selectedId === cand.id;
              const isEg = cand.tier === 'egyptian-library';
              return (
                <div
                  key={cand.id}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between text-right ${
                    isSelected
                      ? 'bg-white border-sada-violet shadow-md ring-2 ring-sada-violet/15'
                      : isEg
                      ? 'bg-white border-emerald-200/80 hover:border-sada-teal'
                      : 'bg-white/75 border-gray-100 hover:border-sada-violet/30'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="dir-ltr text-xs font-black text-sada-ink">
                        {cand.voiceName}
                      </span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {cand.recommended && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                            <Sparkles size={10} />
                            <span>مُرشّح</span>
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isEg ? 'bg-emerald-100 text-emerald-900' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {isEg ? 'مصري أصيل' : 'مرجع سابق'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <span className="dir-ltr text-[10px] font-bold px-2 py-0.5 rounded-md bg-sada-lavender text-sada-violet">
                        {cand.modelId}
                      </span>
                      <span className="dir-ltr text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                        {cand.voiceId.slice(0, 10)}…
                      </span>
                      {cand.emotionTag && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800">
                          {cand.emotionTag}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sada-ink/60">
                        <Clock size={10} />
                        <span className="dir-ltr">{cand.durationSec}s</span>
                      </span>
                    </div>

                    <p className="text-[11px] text-sada-ink/75 leading-relaxed mb-2">
                      {cand.rationale}
                    </p>

                    <p className="text-[11px] text-sada-ink/90 bg-sada-surface p-2 rounded-xl border border-gray-100 leading-relaxed mb-3">
                      «{cand.text}»
                    </p>
                  </div>

                  <div>
                    {isPlaying && (
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2.5">
                        <div
                          className="h-full rounded-full transition-all duration-100"
                          style={{
                            width: `${Math.round(audioProgress * 100)}%`,
                            backgroundColor: profile.accentColor,
                          }}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handlePlayCandidate(cand)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold text-white shadow-xs transition-transform hover:scale-105"
                        style={{ backgroundColor: profile.accentColor }}
                      >
                        {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                        <span>{isPlaying ? 'إيقاف' : 'استمع'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectCandidate(profile.id, cand.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                          isSelected
                            ? 'bg-sada-violet text-white border-sada-violet'
                            : 'bg-white text-sada-ink/75 border-gray-200 hover:border-sada-violet/40'
                        }`}
                      >
                        {isSelected && <Check size={12} />}
                        <span>{isSelected ? 'مختار' : 'اختيار'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            };

            return (
              <section
                key={profile.id}
                className="p-4 sm:p-5 rounded-3xl bg-sada-surface border border-sada-violet/15"
              >
                <div className="flex flex-wrap items-center gap-4 mb-4 pb-3 border-b border-gray-200/70">
                  <img
                    src={profile.avatarImage}
                    alt={profile.name}
                    className="w-20 h-24 object-contain rounded-2xl bg-white p-1 border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-right">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="text-base sm:text-lg font-black text-sada-ink">{profile.name}</h4>
                      <span
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: profile.accentColor }}
                      >
                        {profile.roleTitle}
                      </span>
                    </div>
                    <p className="text-xs text-sada-ink/75 leading-relaxed">{profile.personality}</p>
                  </div>
                </div>

                {allCands.length === 0 ? (
                  <p className="text-xs text-sada-ink/60">جاري تحميل العينات...</p>
                ) : (
                  <div className="space-y-4">
                    {egCands.length > 0 && (
                      <div>
                        <span className="text-[11px] font-black text-sada-teal-dark block mb-2">
                          مرشحو المكتبة المصرية الأصيلة (الجديدة)
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {egCands.map(renderCandidateCard)}
                        </div>
                      </div>
                    )}

                    {refCands.length > 0 && (
                      <div>
                        <span className="text-[11px] font-bold text-sada-ink/55 block mb-2">
                          المرشحون المرجعيون السابقون (للمقارنة)
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {refCands.map(renderCandidateCard)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
