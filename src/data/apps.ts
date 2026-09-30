import { FaUserCircle, FaTerminal, FaGithub, FaLinkedin, FaFolderOpen, FaAddressCard, FaTrashAlt, FaGamepad, FaCog, FaBomb, FaTableTennis, FaThLarge, FaRocket, FaNetworkWired, FaFileCode, FaCalendarAlt } from 'react-icons/fa';
import { profile } from '../config/profile';
import type { AppDefinition } from '../types';
export const apps: AppDefinition[] = [
  { id: 'about', image: 'icons/tango/apps-system-users.png', label: 'Sobre mí', icon: FaUserCircle, color: 'blue' },
  { id: 'cv', label: 'Mi CV', icon: FaTerminal, color: 'terminal' },
  { id: 'onday', image: 'icons/calendar.png', label: 'OnDay', icon: FaCalendarAlt, color: 'paper', start: false, inactive: true },
  { id: 'projects', image: 'icons/tango/places-folder.png', label: 'Proyectos', icon: FaFolderOpen, color: 'yellow' },
  { id: 'github', label: 'GitHub', icon: FaGithub, color: 'ink', external: profile.github },
  { id: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, color: 'blue', external: profile.linkedin },
  { id: 'contact', image: 'icons/tango/actions-contact-new.png', label: 'Contacto', icon: FaAddressCard, color: 'green' },
  { id: 'documents', image: 'icons/tango/places-user-trash.png', label: 'Papelera', icon: FaTrashAlt, color: 'paper' },
  { id: 'games', image: 'icons/tango/categories-applications-games.png', label: 'Juegos', icon: FaGamepad, color: 'purple' },
  { id: 'settings', image: 'icons/tango/categories-preferences-desktop.png', label: 'Propiedades', icon: FaCog, color: 'paper' },
  { id: 'snake', label: 'Snake', icon: FaGamepad, color: 'green', desktop: false, start: false },
  { id: 'minesweeper', label: 'Minesweeper', icon: FaBomb, color: 'ink', desktop: false, start: false },
  { id: 'pong', label: 'Pong', icon: FaTableTennis, color: 'paper', desktop: false, start: false },
  { id: 'breakout', label: 'Breakout', icon: FaThLarge, color: 'yellow', desktop: false, start: false },
  { id: 'asteroids', label: 'Asteroids', icon: FaRocket, color: 'paper', desktop: false, start: false },
  { id: 'platformer', label: 'SCL Network Adventure', icon: FaNetworkWired, color: 'blue', desktop: false, start: false },
  { id: 'achievement', label: 'achievement.txt', icon: FaFileCode, color: 'paper', desktop: false, start: false },
];


