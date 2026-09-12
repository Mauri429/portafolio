import { AppIcon } from '../desktop/AppIcon';
import type { PointerEventHandler } from 'react';
import { FiMinus, FiSquare, FiX, FiCopy } from 'react-icons/fi';
import type { AppDefinition } from '../../types';
interface Props { app: AppDefinition; maximized: boolean; onDrag: PointerEventHandler; onMaximize: () => void; onMinimize: () => void; onClose: () => void }
export function TitleBar({ app, maximized, onDrag, onMaximize, onMinimize, onClose }: Props) {
  return <header className="titlebar" onPointerDown={onDrag} onDoubleClick={onMaximize}><span className="window-title"><AppIcon app={app} />{app.label}</span><div className="window-controls" onPointerDown={e => e.stopPropagation()} onDoubleClick={e => e.stopPropagation()}><button aria-label="Minimizar" onClick={onMinimize}><FiMinus /></button><button className="maximize" aria-label={maximized ? 'Restaurar' : 'Maximizar'} onClick={onMaximize}>{maximized ? <FiCopy /> : <FiSquare />}</button><button className="close" aria-label="Cerrar" onClick={onClose}><FiX /></button></div></header>;
}

