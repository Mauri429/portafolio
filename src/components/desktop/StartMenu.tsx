import { AppIcon } from './AppIcon';
import { motion } from 'framer-motion';
import { FaPowerOff } from 'react-icons/fa';
import { apps } from '../../data/apps';
import { profile } from '../../config/profile';
import type { AppId } from '../../types';
export function StartMenu({ open, shutdown }: { open: (id: AppId) => void; shutdown: () => void }) { return <motion.nav aria-label="Menú Inicio" className="start-menu" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><header><span className="user-tile">MS</span><strong>{profile.name}</strong></header><div className="start-apps">{apps.filter(app => app.start !== false).map(app => <button key={app.id} onClick={() => open(app.id)}><AppIcon app={app} /><span>{app.id === 'documents' ? 'Documentos' : app.label}</span>{app.external && <small>↗</small>}</button>)}</div><footer><span>Portfolio OS</span><button onClick={shutdown}><FaPowerOff /> Apagar</button></footer></motion.nav>; }

