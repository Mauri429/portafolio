import { useEffect, useState } from 'react';
export function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const timer = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(timer); }, []);
  const date = time.toLocaleDateString('es-UY', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const hour = time.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit', hour12: false });
  return <time className="tray-clock" dateTime={time.toISOString()} title={time.toLocaleDateString('es-UY', { dateStyle: 'full' })} aria-label={`${date}, ${hour}`}><span className="tray-date">{date}</span><span className="tray-hour">{hour}</span></time>;
}
