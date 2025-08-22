import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  fallbackTimeout?: number;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    threshold = 0.1, // Reduced from 0.3 for better mobile support
    rootMargin = '100px', // Increased for earlier triggering
    triggerOnce = true,
    fallbackTimeout = 3000 // 3 second fallback
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Fallback timeout - show content after timeout regardless
    timeoutRef.current = setTimeout(() => {
      if (!hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    }, fallbackTimeout);

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      setIsVisible(true);
      setHasTriggered(true);
      return;
    }

    let retryCount = 0;
    const maxRetries = 3;

    const createObserver = () => {
      try {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              setHasTriggered(true);
              
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              
              if (triggerOnce) {
                observer.disconnect();
              }
            } else if (!triggerOnce) {
              setIsVisible(false);
            }
          },
          {
            threshold,
            rootMargin
          }
        );

        observer.observe(element);
        return observer;
      } catch (error) {
        console.warn('Intersection Observer failed, using fallback:', error);
        
        // Retry mechanism
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(createObserver, 100 * retryCount);
        } else {
          // Final fallback - just show the content
          setIsVisible(true);
          setHasTriggered(true);
        }
        return null;
      }
    };

    const observer = createObserver();

    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce, fallbackTimeout, hasTriggered]);

  return { ref: elementRef, isVisible, hasTriggered };
};

export default useIntersectionObserver;