// Performance optimization utilities

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Image preloader
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Critical resources preloader
export const preloadCriticalResources = async () => {
  // No critical images to preload - using Spline 3D scene
  try {
    // Reserved for future critical resources
  } catch (error) {
    console.warn('Some critical resources failed to preload:', error);
  }
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(null, args);
    }
  };
};

// Check if device prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize bundle size by checking feature support
export const isFeatureSupported = (feature: string): boolean => {
  switch (feature) {
    case 'intersectionObserver':
      return 'IntersectionObserver' in window;
    case 'webp':
      return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    case 'avif':
      return document.createElement('canvas').toDataURL('image/avif').indexOf('data:image/avif') === 0;
    default:
      return false;
  }
};

// Critical Path CSS loader
export const loadCriticalCSS = () => {
  const criticalCSS = `
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .btn-primary { background: hsl(217 91% 60%); color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `;

  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

export default {
  createIntersectionObserver,
  preloadImage,
  preloadCriticalResources,
  debounce,
  throttle,
  prefersReducedMotion,
  isFeatureSupported,
  loadCriticalCSS,
  measurePerformance
};