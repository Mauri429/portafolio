import { useEffect, useState } from 'react';
import { assetUrl } from '../../config/profile';
export default function PDFViewer({ path, title }: { path: string; title: string }) {
  const url = assetUrl(path);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    // External hosts may disallow CORS while still supporting embedded viewing.
    if (/^https?:\/\//i.test(path)) { setStatus('ready'); return; }
    fetch(url, { method: 'HEAD', signal: controller.signal }).then(response => {
      setStatus(response.ok && response.headers.get('content-type')?.includes('application/pdf') ? 'ready' : 'error');
    }).catch(error => { if (error.name !== 'AbortError') setStatus('error'); });
    return () => controller.abort();
  }, [path, url]);
  return <div className="pdf-viewer"><div className="action-row"><a className="primary" href={url} target="_blank" rel="noreferrer">Abrir PDF</a><a className="classic" href={url} download>Descargar PDF</a></div><p className="muted">Si tu navegador no muestra el documento, usá «Abrir PDF».</p>
    {status === 'loading' && <p role="status">Cargando documento…</p>}{status === 'error' && <p role="alert">El PDF no está disponible. Podés volver a intentarlo abriéndolo en otra pestaña.</p>}{status === 'ready' && <iframe title={title} src={url} onError={() => setStatus('error')} />}
  </div>;
}
