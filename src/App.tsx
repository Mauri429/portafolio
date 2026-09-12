import { MotionConfig } from 'framer-motion';
import { Desktop } from './components/desktop/Desktop';
import { PreferencesProvider } from './store/preferences';
export default function App() { return <MotionConfig reducedMotion="user"><PreferencesProvider><Desktop /></PreferencesProvider></MotionConfig>; }
