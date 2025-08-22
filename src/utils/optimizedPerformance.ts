// Optimized performance utilities for lightning-fast loading

// Enhanced debounce with immediate option
export const optimizedDebounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  immediate = false
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    
    if (immediate && now - lastCall > delay) {
      func.apply(null, args);
      lastCall = now;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
        lastCall = Date.now();
      }, delay);
    }
  };
};

// Enhanced throttle with trailing call
export const optimizedThrottle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  trailing = true
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    
    if (now - lastCall >= delay) {
      func.apply(null, args);
      lastCall = now;
    } else if (trailing) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
        lastCall = Date.now();
      }, delay - (now - lastCall));
    }
  };
};

// Preload critical resources with priority
export const preloadCriticalResources = async () => {
  const criticalResources = [
    // Add any critical resources here if needed
  ];

  // Preload with high priority
  const preloadPromises = criticalResources.map(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = 'image';
    document.head.appendChild(link);
    return new Promise(resolve => {
      link.onload = resolve;
      link.onerror = resolve; // Don't fail the entire process
    });
  });

  try {
    await Promise.allSettled(preloadPromises);
  } catch (error) {
    console.warn('Some critical resources failed to preload:', error);
  }
};

// Memory-efficient event listener manager
export const createEventManager = () => {
  const listeners = new Map<string, Set<EventListener>>();

  return {
    add: (element: EventTarget, event: string, listener: EventListener, options?: AddEventListenerOptions) => {
      const key = `${event}-${element.constructor.name}`;
      
      if (!listeners.has(key)) {
        listeners.set(key, new Set());
      }
      
      listeners.get(key)!.add(listener);
      element.addEventListener(event, listener, { passive: true, ...options });
    },
    
    remove: (element: EventTarget, event: string, listener: EventListener) => {
      const key = `${event}-${element.constructor.name}`;
      const eventListeners = listeners.get(key);
      
      if (eventListeners) {
        eventListeners.delete(listener);
        if (eventListeners.size === 0) {
          listeners.delete(key);
        }
      }
      
      element.removeEventListener(event, listener);
    },
    
    clear: () => {
      listeners.clear();
    }
  };
};

// Optimized lazy loading with WebP/AVIF support
export const createOptimizedImageLoader = () => {
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  const supportsAVIF = () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  };

  const getOptimalFormat = (src: string): string => {
    if (supportsAVIF() && !src.includes('.svg')) {
      return src.replace(/\.(jpg|jpeg|png)$/i, '.avif');
    }
    if (supportsWebP() && !src.includes('.svg')) {
      return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return src;
  };

  return { getOptimalFormat, supportsWebP, supportsAVIF };
};

// Performance monitoring and analytics
export const performanceMonitor = {
  mark: (name: string) => {
    if ('performance' in window && 'mark' in performance) {
      performance.mark(name);
    }
  },
  
  measure: (name: string, startMark: string, endMark?: string) => {
    if ('performance' in window && 'measure' in performance) {
      try {
        performance.measure(name, startMark, endMark);
        const entries = performance.getEntriesByName(name, 'measure');
        return entries[entries.length - 1]?.duration || 0;
      } catch (error) {
        console.warn('Performance measurement failed:', error);
        return 0;
      }
    }
    return 0;
  },
  
  getMetrics: () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
        loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
      };
    }
    return null;
  }
};

// Bundle size optimization detector
export const bundleOptimizer = {
  detectUnusedFeatures: () => {
    const features = {
      intersectionObserver: 'IntersectionObserver' in window,
      webp: document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0,
      webWorkers: 'Worker' in window,
      serviceWorker: 'serviceWorker' in navigator,
      requestIdleCallback: 'requestIdleCallback' in window
    };
    
    return features;
  },
  
  preconnectToOrigins: (origins: string[]) => {
    origins.forEach(origin => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      document.head.appendChild(link);
    });
  }
};

export default {
  optimizedDebounce,
  optimizedThrottle,
  preloadCriticalResources,
  createEventManager,
  createOptimizedImageLoader,
  performanceMonitor,
  bundleOptimizer
};