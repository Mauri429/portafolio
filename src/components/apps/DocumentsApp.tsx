import { lazy, Suspense, useState } from 'react';
import { FaArrowLeft, FaFolder, FaFilePdf, FaFilePowerpoint, FaLink } from 'react-icons/fa';
import { documents } from '../../data/documents';
import { assetUrl } from '../../config/profile';
import type { PortfolioDocument } from '../../types';

const PDFViewer = lazy(() => import('./PDFViewer'));
type Folder = 'Todos' | NonNullable<PortfolioDocument['folder']>;

export function DocumentsApp() {
  const [folder, setFolder] = useState<Folder>('Todos');
  const [selected, setSelected] = useState<PortfolioDocument | null>(null);
  const [viewing, setViewing] = useState<PortfolioDocument | null>(null);
  const onDayCount = documents.filter(document => document.folder === 'OnDay').length;
  const showOnDayFolder = folder === 'Todos' && onDayCount > 0;
  const entries = documents.filter(document => folder === 'Todos'
    ? document.folder !== 'OnDay'
    : (document.folder ?? (document.type === 'pdf' ? 'PDF' : 'Presentaciones')) === folder);
  const count = entries.length + Number(showOnDayFolder);
  const navigate = (name: Folder) => { setFolder(name); setSelected(null); };
  const open = (document: PortfolioDocument) => {
    if (document.type === 'pdf') setViewing(document);
    else window.open(assetUrl(document.url), '_blank', 'noopener,noreferrer');
  };

  if (viewing) return <div className="app-padding">
    <button className="classic" onClick={() => setViewing(null)}><FaArrowLeft /> Volver a {folder === 'Todos' ? 'Archivo personal' : folder}</button>
    <h2>{viewing.name}</h2>
    <Suspense fallback={<p role="status">Preparando visor…</p>}><PDFViewer path={viewing.url} title={viewing.name} /></Suspense>
  </div>;

  return <div className="document-explorer">
    <div className="explorer-path">Escritorio / Papelera / {folder === 'Todos' ? 'Archivo personal' : folder}</div>
    <nav className="folder-tabs" aria-label="Carpetas">
      {(['Todos', 'Presentaciones', 'PDF'] as const).map(name => <button className="classic" aria-pressed={folder === name} key={name} onClick={() => navigate(name)}><FaFolder /> {name}</button>)}
    </nav>
    <div className="app-padding">
      {folder === 'OnDay' && <button className="classic" onClick={() => navigate('Todos')}><FaArrowLeft /> Volver a Papelera</button>}
      <h2>{folder === 'OnDay' ? 'OnDay' : 'Archivo personal'}</h2>
      <p className="muted">{folder === 'OnDay' ? 'Manual de usuario y documentación técnica de OnDay.' : 'Presentaciones y documentos que forman parte del camino. Acá no se borra nada.'}</p>
      {count === 0 ? <div className="empty-state"><FaFolder /><h3>Esta carpeta está vacía</h3><p>Los documentos publicados aparecerán aquí.</p></div> : <ul className="document-list">
        {showOnDayFolder && <li><button onClick={() => navigate('OnDay')}><FaFolder /><span><strong>OnDay</strong><small>Carpeta · {onDayCount} documentos</small></span></button></li>}
        {entries.map(document => {
          const Icon = document.type === 'pdf' ? FaFilePdf : document.type === 'pptx' ? FaFilePowerpoint : FaLink;
          return <li key={document.url}><button className={selected === document ? 'selected-document' : ''}
            onClick={event => { setSelected(document); if (event.detail === 0 || matchMedia('(pointer: coarse), (max-width: 640px)').matches) open(document); }}
            onDoubleClick={() => { if (!matchMedia('(pointer: coarse), (max-width: 640px)').matches) open(document); }}>
            <Icon /><span><strong>{document.name}</strong><small>{document.date}{document.size ? ' · ' + document.size : ''} · {document.type.toUpperCase()}</small></span>
          </button></li>;
        })}
      </ul>}
      {selected && <section className="document-detail"><h3>{selected.name}</h3><p>{selected.description}</p><button className="primary" onClick={() => open(selected)}>{selected.type === 'pdf' ? 'Ver PDF' : 'Abrir archivo'}</button></section>}
      <p className="muted">{count} elemento{count === 1 ? '' : 's'}</p>
    </div>
  </div>;
}
