import { gameStorage } from './storage';
let context: AudioContext | undefined;
export const gameAudio = {
  muted: () => gameStorage.get('muted', false),
  setMuted(value: boolean) { gameStorage.set('muted', value); },
  tone(frequency = 440, duration = .08, type: OscillatorType = 'square') {
    if (this.muted()) return;
    try { context ??= new AudioContext(); void context.resume(); const oscillator=context.createOscillator(), gain=context.createGain(); oscillator.type=type;oscillator.frequency.value=frequency;gain.gain.setValueAtTime(.035,context.currentTime);gain.gain.exponentialRampToValueAtTime(.0001,context.currentTime+duration);oscillator.connect(gain);gain.connect(context.destination);oscillator.start();oscillator.stop(context.currentTime+duration); } catch { /* Optional audio. */ }
  },
};
