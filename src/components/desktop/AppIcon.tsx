import { assetUrl } from '../../config/profile';
import type { AppDefinition } from '../../types';
export function AppIcon({ app }: { app: AppDefinition }) {
  return app.image ? <img className="retro-app-image" src={assetUrl(app.image)} alt="" draggable={false} width="48" height="48" /> : <app.icon aria-hidden="true" />;
}
