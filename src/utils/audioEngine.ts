// Web Audio API Engine for Educational Ling Six Demonstrations, Subtle UI Feedback,
// and Safe Low-Volume Ambient Noise Demo.
// Strictly educational illustration — NOT calibrated clinical audio stimuli.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientSource: AudioBufferSourceNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientActive: boolean = false;

  private initCtx(): AudioContext {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted) {
      this.stopAmbient();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Educational approximation of Ling Six phonemes via Web Audio synthesis
  public playLingSound(phoneme: string, duration: number = 0.9): void {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      if (phoneme === '/s/' || phoneme === '/ʃ/') {
        const bufferSize = Math.floor(ctx.sampleRate * duration);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(phoneme === '/s/' ? 5400 : 2700, now);
        filter.Q.setValueAtTime(phoneme === '/s/' ? 2.5 : 2.0, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.16, now + 0.08);
        gain.gain.setValueAtTime(0.14, now + duration - 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(now);
        noise.stop(now + duration);
      } else {
        let f0 = 160;
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

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, now);
        masterGain.gain.linearRampToValueAtTime(0.18, now + 0.08);
        masterGain.gain.setValueAtTime(0.16, now + duration - 0.12);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        masterGain.connect(ctx.destination);

        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f0, now);

        const filter1 = ctx.createBiquadFilter();
        filter1.type = 'bandpass';
        filter1.frequency.setValueAtTime(f1, now);
        filter1.Q.setValueAtTime(4.0, now);

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

  public playBell(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 1.0);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.0);
    } catch (e) {
      console.warn(e);
    }
  }

  public playSuccess(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.14, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.5);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  public playPop(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.07);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {
      console.warn(e);
    }
  }

  // Gentle soft pink-filtered ambient murmur for Listening-in-Noise demonstration (strictly capped volume)
  public startGentleAmbient(ducked: boolean = false): void {
    if (this.isMuted || this.ambientActive) return;
    try {
      const ctx = this.initCtx();
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      let b0 = 0;
      let b1 = 0;
      let b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.099046;
        b1 = 0.963 * b1 + white * 0.2965164;
        b2 = 0.57 * b2 + white * 1.0526913;
        output[i] = (b0 + b1 + b2 + white * 0.1848) * 0.05;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(950, ctx.currentTime);

      const gain = ctx.createGain();
      const targetVol = ducked ? 0.025 : 0.075;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(targetVol, ctx.currentTime + 0.5);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();

      this.ambientSource = source;
      this.ambientGain = gain;
      this.ambientActive = true;
    } catch (e) {
      console.warn(e);
    }
  }

  public setAmbientDucked(ducked: boolean): void {
    if (!this.ctx || !this.ambientGain || !this.ambientActive) return;
    const target = ducked ? 0.02 : 0.075;
    this.ambientGain.gain.linearRampToValueAtTime(target, this.ctx.currentTime + 0.25);
  }

  public stopAmbient(): void {
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
        this.ambientSource.disconnect();
      } catch {}
    }
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
      } catch {}
    }
    this.ambientSource = null;
    this.ambientGain = null;
    this.ambientActive = false;
  }

  public isAmbientPlaying(): boolean {
    return this.ambientActive;
  }
}

export const soundEngine = new SoundEngine();
