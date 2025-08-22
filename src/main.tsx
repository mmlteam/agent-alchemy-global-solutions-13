import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { preloadCriticalResources, performanceMonitor } from './utils/optimizedPerformance';

// Critical loading component
const CriticalLoader = () => (
  <div className="critical-loading">
    <div className="animate-pulse text-white">Loading...</div>
  </div>
);

// Performance optimizations
const initializePerformanceOptimizations = async () => {
  performanceMonitor.mark('app-start');
  
  // Register service worker for caching
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    } catch (error) {
      console.warn('Service worker registration failed:', error);
    }
  }
  
  // Preload critical resources
  await preloadCriticalResources();
  
  // Preconnect to external domains
  const preconnectOrigins = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://prod.spline.design'
  ];
  
  preconnectOrigins.forEach(origin => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    document.head.appendChild(link);
  });
};

// Initialize optimizations
initializePerformanceOptimizations();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<CriticalLoader />}>
      <App />
    </Suspense>
  </StrictMode>
);
