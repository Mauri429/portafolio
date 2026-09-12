import { lazy, Suspense } from 'react';
import { profile } from '../../config/profile';

const PDFViewer = lazy(() => import('./PDFViewer'));

export function CVApp() {
  return <div className="app-padding">
    <Suspense fallback={<p role="status">Preparando CV…</p>}>
      <PDFViewer path={profile.cv} title={`CV de ${profile.fullName}`} />
    </Suspense>
  </div>;
}
