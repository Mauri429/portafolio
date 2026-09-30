import { assetUrl } from '../../config/profile';
import './OnDayApp.css';

export function OnDayApp() {
  return <section className="onday-app" aria-label="OnDay para Windows">
    <img className="onday-promo" src={assetUrl('onday/features.png')} alt="OnDay: todo lo que necesitás para planificar. Calendario completo, recordatorios, repeticiones y colores personalizados. Tu día, a tu manera." />
    <div className="onday-download-banner">
      <img className="onday-promo" src={assetUrl('onday/download.png')} alt="OnDay para Windows 10 y Windows 11. Español, English y Português." />
      <a className="onday-download" href={assetUrl('downloads/OnDay-Setup.exe')} download="OnDay-Setup.exe" aria-label="Descargar OnDay para Windows (instalador .exe, 2,8 MB)">
        <span className="sr-only">Descargar para Windows</span>
      </a>
    </div>
    <p className="onday-download-help"><a href={assetUrl('downloads/OnDay-Setup.exe')} download="OnDay-Setup.exe">Descargar OnDay-Setup.exe</a> · 2,8 MB</p>
  </section>;
}
