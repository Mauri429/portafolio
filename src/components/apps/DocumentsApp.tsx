import { lazy, Suspense, useState } from 'react';
import { FaArrowLeft, FaFolder, FaFilePdf, FaFilePowerpoint, FaLink } from 'react-icons/fa';
import { documents } from '../../data/documents';
import { assetUrl } from '../../config/profile';
import type { PortfolioDocument } from '../../types';
const PDFViewer = lazy(() => import('./PDFViewer'));
type Folder = 'Todos' | 'Presentaciones' | 'PDF';
export function DocumentsApp() {
  const [folder, setFolder] = useState<Folder>('Todos');
  const [selected, setSelected] = useState<PortfolioDocument | null>(null);
  const [viewing, setViewing] = useState<PortfolioDocument | null>(null);
  const entries = documents.filter(document => folder === 'Todos' || (document.folder ?? (document.type === 'pdf' ? 'PDF' : 'Presentaciones')) === folder);
  const open = (document: PortfolioDocument) => { if (document.type === 'pdf') setViewing(document); else window.open(assetUrl(document.url), '_blank', 'noopener,noreferrer'); };
  if (viewing) return <div className="app-padding"><button className="classic" onClick={() => setViewing(null)}><FaArrowLeft /> Volver al archivo</button><h2>{viewing.name}</h2><Suspense fallback={<p role="status">Preparando visor…</p>}><PDFViewer path={viewing.url} title={viewing.name} /></Suspense></div>;
  return <div className="document-explorer"><div className="explorer-path">Escritorio / Papelera / {folder === 'Todos' ? 'Archivo personal' : folder}</div><nav className="folder-tabs" aria-label="Carpetas">{(['Todos', 'Presentaciones', 'PDF'] as const).map(name => <button className="classic" aria-pressed={folder === name} key={name} onClick={() => { setFolder(name); setSelected(null); }}><FaFolder /> {name}</button>)}</nav><div className="app-padding"><h2>Archivo personal</h2><p className="muted">Presentaciones y documentos que forman parte del camino. Acá no se borra nada.</p>{entries.length === 0 ? <div className="empty-state"><FaFolder /><h3>Esta carpeta está vacía</h3><p>Los documentos publicados aparecerán aquí.</p></div> : <ul className="document-list">{entries.map((document, index) => { const Icon = document.type === 'pdf' ? FaFilePdf : document.type === 'pptx' ? FaFilePowerpoint : FaLink; return <li key={`${document.url}-${index}`}><button className={selected === document ? 'selected-document' : ''} onClick={e => { setSelected(document); if (e.detail === 0 || matchMedia('(pointer: coarse), (max-width: 640px)').matches) open(document); }} onDoubleClick={() => { if (!matchMedia('(pointer: coarse), (max-width: 640px)').matches) open(document); }}><Icon /><span><strong>{document.name}</strong><small>{document.date}{document.size ? ` · ${document.size}` : ''} · {document.type.toUpperCase()}</small></span></button></li>; })}</ul>}{selected && <section className="document-detail"><h3>{selected.name}</h3><p>{selected.description}</p><button className="primary" onClick={() => open(selected)}>{selected.type === 'pdf' ? 'Ver PDF' : 'Abrir archivo'}</button></section>}<p className="muted">{entries.length} elemento{entries.length === 1 ? '' : 's'}</p></div></div>;
}
