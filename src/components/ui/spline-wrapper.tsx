import { Suspense, memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load Spline with error handling
const LazySpline = memo(() => {
  const [SplineComponent, setSplineComponent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadSpline = async () => {
      try {
        // Dynamic import with error handling
        const { default: Spline } = await import('@splinetool/react-spline');
        
        if (mounted) {
          setSplineComponent(() => Spline);
        }
      } catch (err) {
        console.warn('Failed to load Spline component:', err);
        if (mounted) {
          setError('Failed to load 3D scene');
        }
      }
    };

    loadSpline();

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="text-6xl mb-4">🤖</div>
          <div className="text-lg font-medium">AI Assistant</div>
          <div className="text-sm opacity-60">3D visualization loading...</div>
        </div>
      </div>
    );
  }

  if (!SplineComponent) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading 3D Scene...</div>
      </div>
    );
  }

  return SplineComponent;
});

LazySpline.displayName = 'LazySpline';

// Enhanced SplineScene with better error handling
export function SplineScene({ scene, className }: { scene: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);
  const [SplineComponent, setSplineComponent] = useState<any>(null);

  // Load Spline component dynamically
  useEffect(() => {
    let mounted = true;

    const loadSpline = async () => {
      try {
        const { default: Spline } = await import('@splinetool/react-spline');
        
        if (mounted) {
          setSplineComponent(() => Spline);
        }
      } catch (err) {
        console.warn('Failed to load Spline:', err);
        if (mounted) {
          setIsError(true);
        }
      }
    };

    loadSpline();

    return () => {
      mounted = false;
    };
  }, []);

  // Preload the scene URL
  useEffect(() => {
    if (!scene) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = scene;
    link.as = 'fetch';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [scene]);

  const handleLoad = () => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsReady(true);
    }, 100);
  };

  const handleError = (error: any) => {
    console.error('Spline scene error:', error);
    setIsError(true);
  };

  // Fallback component
  const FallbackScene = () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background to-background/80">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-8xl mb-6"
          animate={{ 
            rotateY: [0, 15, 0, -15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          🤖
        </motion.div>
        <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          AI Automation Assistant
        </h3>
        <p className="text-muted-foreground">
          Revolutionizing business processes with intelligent automation
        </p>
      </motion.div>
    </div>
  );

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 3D Scene */}
      {SplineComponent && !isError && (
        <motion.div 
          className="absolute inset-0"
          style={{ 
            willChange: 'opacity, transform',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0,0,0)'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isReady ? 1 : 0,
            scale: isReady ? 1 : 0.9
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: isReady ? 0.2 : 0
          }}
        >
          <Suspense fallback={<FallbackScene />}>
            <SplineComponent 
              scene={scene} 
              className={className}
              onLoad={handleLoad}
              onError={handleError}
            />
          </Suspense>
        </motion.div>
      )}

      {/* Loading/Error Fallback */}
      <AnimatePresence mode="wait">
        {(!isReady || isError) && (
          <motion.div 
            className="absolute inset-0 z-10"
            style={{ 
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0,0,0)'
            }}
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            }}
          >
            <FallbackScene />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}