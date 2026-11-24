// Web Audio API Engine for Educational Ling Six Sounds & UI Feedback
// Designed strictly for educational demonstration with visual feedback

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Play Ling 6 Phoneme approximation using formant synthesis & filtered noise
  public playLingSound(phoneme: string, duration: number = 0.9) {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      if (phoneme === '/s/' || phoneme === '/ʃ/') {
        // Turbulent noise for fricatives
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        // Bandpass filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        if (phoneme === '/s/') {
          filter.frequency.setValueAtTime(5500, now); // High frequency > 4000Hz
          filter.Q.setValueAtTime(2.5, now);
        } else {
          filter.frequency.setValueAtTime(2800, now); // Mid-high frequency ~2000-3500Hz
          filter.Q.setValueAtTime(2.0, now);
        }

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.08);
        gain.gain.setValueAtTime(0.18, now + duration - 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(now);
        noise.stop(now + duration);
      } else {
        // Vowels and Nasal: Formant-based synthesis
        let f0 = 160; // Voice fundamental
        let f1 = 300;
        let f2 = 800;

        if (phoneme === '/m/') {
          f0 = 140;
          f1 = 250;
          f2 = 1000;
        } else if (phoneme === '/u/') {
          f0 = 150;
          f1 = 300;
          f2 = 850;
        } else if (phoneme === '/a/' || phoneme === '/ɑ/') {
          f0 = 160;
          f1 = 750;
          f2 = 1250;
        } else if (phoneme === '/i/') {
          f0 = 170;
          f1 = 280;
          f2 = 2300;
        }

        // Master gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, now);
        masterGain.gain.linearRampToValueAtTime(0.22, now + 0.08);
        masterGain.gain.setValueAtTime(0.2, now + duration - 0.12);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        masterGain.connect(ctx.destination);

        // Vocal chord oscillator (sawtooth with rich harmonics)
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f0, now);

        // Formant 1 filter
        const filter1 = ctx.createBiquadFilter();
        filter1.type = 'bandpass';
        filter1.frequency.setValueAtTime(f1, now);
        filter1.Q.setValueAtTime(4.0, now);

        // Formant 2 filter
        const filter2 = ctx.createBiquadFilter();
        filter2.type = 'bandpass';
        filter2.frequency.setValueAtTime(f2, now);
        filter2.Q.setValueAtTime(5.0, now);

        osc.connect(filter1);
        osc.connect(filter2);
        filter1.connect(masterGain);
        filter2.connect(masterGain);

        osc.start(now);
        osc.stop(now + duration);
      }
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }

  // Play gentle bell sound (for Sound Detection test demo)
  public playBell() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 1.2);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch (e) {
      console.warn(e);
    }
  }

  // Play celebration / success chime
  public playSuccess() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.6);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  // Soft click / pop for interactive buttons
  public playPop() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn(e);
    }
  }
}

export const soundEngine = new SoundEngine();
