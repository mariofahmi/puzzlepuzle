/**
 * Web Audio API synthesizer for the Mahasiswa Baru UNIROW Puzzle Game
 * Provides zero-dependency procedural sound effects and delightful ambient campus BGM.
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private isSfxMuted: boolean = false;
  private isBgmMuted: boolean = false;
  private bgmInterval: number | null = null;
  private bgmStep: number = 0;
  private isBgmPlaying: boolean = false;

  constructor() {
    const savedSfx = localStorage.getItem('unirow_puzzle_sfx_muted');
    const savedBgm = localStorage.getItem('unirow_puzzle_bgm_muted');
    // If older key existed
    const legacyMute = localStorage.getItem('unirow_puzzle_muted');

    this.isSfxMuted = savedSfx !== null ? savedSfx === 'true' : legacyMute === 'true';
    this.isBgmMuted = savedBgm !== null ? savedBgm === 'true' : false;
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getSfxMuted(): boolean {
    return this.isSfxMuted;
  }

  public getBgmMuted(): boolean {
    return this.isBgmMuted;
  }

  public getMuted(): boolean {
    return this.isSfxMuted && this.isBgmMuted;
  }

  public setSfxMuted(muted: boolean) {
    this.isSfxMuted = muted;
    localStorage.setItem('unirow_puzzle_sfx_muted', String(muted));
  }

  public setBgmMuted(muted: boolean) {
    this.isBgmMuted = muted;
    localStorage.setItem('unirow_puzzle_bgm_muted', String(muted));
    if (muted) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
  }

  public toggleMute(): boolean {
    const newMute = !this.isSfxMuted;
    this.setSfxMuted(newMute);
    this.setBgmMuted(newMute);
    return newMute;
  }

  public toggleBgm(): boolean {
    this.setBgmMuted(!this.isBgmMuted);
    return this.isBgmMuted;
  }

  public toggleSfx(): boolean {
    this.setSfxMuted(!this.isSfxMuted);
    return this.isSfxMuted;
  }

  /**
   * Cheerful, gentle procedural campus ambient BGM (Marimba-like pentatonic vibes)
   */
  public startBgm() {
    if (this.isBgmMuted || this.isBgmPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    this.isBgmPlaying = true;
    this.bgmStep = 0;

    // Pentatonic scale (C4, D4, E4, G4, A4, C5, D5, E5) in Hz
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    // Gentle cheerful 16-step melody loop
    const pattern = [
      0, 2, 4, 7,  2, 4, 5, 4,
      3, 4, 5, 7,  5, 4, 2, 1
    ];
    const bassPattern = [
      130.81, 130.81, 164.81, 164.81,
      174.61, 174.61, 196.00, 196.00
    ];

    const stepDuration = 320; // ~94 BPM

    this.bgmInterval = window.setInterval(() => {
      if (!this.ctx || this.isBgmMuted) {
        this.stopBgm();
        return;
      }

      const now = this.ctx.currentTime;
      const noteIndex = pattern[this.bgmStep % pattern.length];
      const freq = scale[noteIndex % scale.length];

      // Soft Lead note (sine + triangle chime)
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.3);

        // Subtly play bass on every 2 steps
        if (this.bgmStep % 2 === 0) {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          const bassFreq = bassPattern[(this.bgmStep / 2) % bassPattern.length];

          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(bassFreq, now);

          bassGain.gain.setValueAtTime(0.02, now);
          bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

          bassOsc.connect(bassGain);
          bassGain.connect(this.ctx.destination);

          bassOsc.start(now);
          bassOsc.stop(now + 0.48);
        }
      } catch {
        // Safe fail
      }

      this.bgmStep++;
    }, stepDuration);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  /**
   * Sound when moving or sliding a puzzle tile
   */
  public playTileMove() {
    if (this.isSfxMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignore
    }
  }

  /**
   * Sound when a tile is placed into its exact correct position
   */
  public playTileCorrect() {
    if (this.isSfxMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.12); // G5

      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.24);
    } catch {
      // Ignore
    }
  }

  /**
   * Sound when requesting a hint
   */
  public playHint() {
    if (this.isSfxMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.1); // D6

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // Ignore
    }
  }

  /**
   * Sound when shuffling or restarting the puzzle
   */
  public playShuffle() {
    if (this.isSfxMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [0, 0.05, 0.1, 0.15].forEach((delay, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const baseFreq = 220 + idx * 70;
        osc.frequency.setValueAtTime(baseFreq, now + delay);
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 80, now + delay + 0.04);

        gain.gain.setValueAtTime(0.1, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.05);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Sound when completing a level in campaign mode
   */
  public playLevelUp() {
    if (this.isSfxMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [
        { freq: 392.00, time: 0, dur: 0.1 },   // G4
        { freq: 523.25, time: 0.1, dur: 0.1 }, // C5
        { freq: 659.25, time: 0.2, dur: 0.1 }, // E5
        { freq: 783.99, time: 0.3, dur: 0.25 }, // G5
        { freq: 1046.50, time: 0.45, dur: 0.35 } // C6
      ];

      const now = this.ctx.currentTime;
      notes.forEach(({ freq, time, dur }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + time);

        gain.gain.setValueAtTime(0.18, now + time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur + 0.02);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Triumphant victory fanfare when puzzle is completed
   */
  public playVictory() {
    if (this.isSfxMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [
        { freq: 440.0, time: 0, dur: 0.15 }, // A4
        { freq: 554.37, time: 0.15, dur: 0.15 }, // C#5
        { freq: 659.25, time: 0.3, dur: 0.2 }, // E5
        { freq: 880.0, time: 0.5, dur: 0.45 }, // A5
      ];

      const now = this.ctx.currentTime;
      notes.forEach(({ freq, time, dur }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + time);

        gain.gain.setValueAtTime(0.2, now + time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur + 0.02);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Subtle click for UI buttons
   */
  public playClick() {
    if (this.isSfxMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Ignore
    }
  }
}

export const soundFx = new SoundEffectsManager();

