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

// Preload critical resources
const preloadCritical = () => {
  // Preload hero image
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = '/src/assets/hero-ai-automation.jpg';
  document.head.appendChild(link);
};

// Initialize performance optimizations
preloadCritical();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<CriticalLoader />}>
      <App />
    </Suspense>
  </StrictMode>
);
