import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Critical loading component
const CriticalLoader = () => (
  <div className="critical-loading">
    <div className="animate-pulse text-white">Loading...</div>
  </div>
);

// Performance optimizations removed - using Spline 3D scene instead of hero image

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<CriticalLoader />}>
      <App />
    </Suspense>
  </StrictMode>
);
