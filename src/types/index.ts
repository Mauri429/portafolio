import type { IconType } from 'react-icons';
export type GameId = 'snake' | 'minesweeper' | 'pong' | 'breakout' | 'asteroids' | 'platformer';
export type AppId = 'about' | 'cv' | 'projects' | 'contact' | 'documents' | 'games' | 'settings' | 'onday' | 'github' | 'linkedin' | 'achievement' | GameId;
export interface AppDefinition { id: AppId; label: string; icon: IconType; color: string; external?: string; image?: string; desktop?: boolean; start?: boolean; inactive?: boolean }
export interface WindowState { id: AppId; x: number; y: number; width: number; height: number; minimized: boolean; maximized: boolean }
export interface Project { name: string; description: string; stack: string[]; screenshot?: string; status: string; url?: string; repository: string }
export interface PortfolioDocument { name: string; type: 'pdf' | 'pptx' | 'link'; date: string; size?: string; icon?: string; url: string; description: string; folder?: 'Presentaciones' | 'PDF' }
