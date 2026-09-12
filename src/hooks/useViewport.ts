import { useEffect, useState } from 'react';
export function useViewport() {
  const read = () => ({ width: window.innerWidth, height: window.innerHeight - 48, mobile: window.innerWidth <= 640 });
  const [size, setSize] = useState(read);
  useEffect(() => { const resize = () => setSize(read()); window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize); }, []);
  return size;
}
