const PREFIX = 'mauricio-games:';
const storageKey = (key: string) => key === 'sclPlatformerCompleted' ? key : PREFIX + key;
export interface AchievementStats { packets: number; totalPackets: number; servers: number; totalServers: number; seconds: number }
export const gameStorage = {
  get<T>(key: string, fallback: T): T { try { const value = localStorage.getItem(storageKey(key)); return value === null ? fallback : JSON.parse(value) as T; } catch { return fallback; } },
  set<T>(key: string, value: T) { try { localStorage.setItem(storageKey(key), JSON.stringify(value)); window.dispatchEvent(new CustomEvent('game-storage', { detail: key })); } catch { /* Games remain playable without persistence. */ } },
  completed() { return this.get('sclPlatformerCompleted', false); },
  completePlatformer(stats: AchievementStats) { this.set('sclPlatformerCompleted', true); this.set('sclPlatformerStats', stats); },
};
