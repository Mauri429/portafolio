import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
export type Background = 'countryside' | 'blue' | 'night';
interface Preferences { background: Background; sounds: boolean; volume: number }
const defaults: Preferences = { background: 'countryside', sounds: false, volume: .2 };
const Context = createContext<{ preferences: Preferences; update: (patch: Partial<Preferences>) => void; play: () => void }>({ preferences: defaults, update: () => {}, play: () => {} });
let audio: AudioContext | undefined;
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    try { const stored = JSON.parse(localStorage.getItem('portfolio-preferences') || '{}');return { background: ['countryside','blue','night'].includes(stored.background) ? stored.background : defaults.background, sounds: stored.sounds === true, volume: typeof stored.volume === 'number' ? Math.max(0,Math.min(1,stored.volume)) : defaults.volume }; } catch { return defaults; }
  });
  useEffect(() => { try { localStorage.setItem('portfolio-preferences', JSON.stringify(preferences)); } catch { /* Preferences still work for the current session. */ } }, [preferences]);
  const play = () => {
    if (!preferences.sounds || preferences.volume === 0) return;
    try { audio ??= new AudioContext();void audio.resume().catch(() => {});const oscillator=audio.createOscillator(),gain=audio.createGain();oscillator.type='sine';oscillator.frequency.setValueAtTime(520,audio.currentTime);oscillator.frequency.exponentialRampToValueAtTime(780,audio.currentTime+.1);gain.gain.setValueAtTime(.0001,audio.currentTime);gain.gain.exponentialRampToValueAtTime(Math.max(.0001,preferences.volume*.15),audio.currentTime+.01);gain.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+.17);oscillator.connect(gain);gain.connect(audio.destination);oscillator.start();oscillator.stop(audio.currentTime+.18);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();}; } catch { /* Audio is optional and may be unavailable. */ }
  };
  return <Context.Provider value={{ preferences, update: patch => setPreferences(old => ({ ...old, ...patch })), play }}>{children}</Context.Provider>;
}
export const usePreferences = () => useContext(Context);
