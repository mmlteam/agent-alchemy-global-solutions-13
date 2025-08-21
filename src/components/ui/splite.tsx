'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'

// Advanced Tech Robot skeleton placeholder
const RobotSkeleton = () => (
  <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
    {/* Floating tech particles */}
    <div className="absolute inset-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>

    {/* Main robot structure */}
    <motion.div 
      className="relative z-10"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Robot head - hexagonal tech design */}
      <div className="relative mx-auto mb-4">
        {/* Main head hexagon */}
        <motion.div 
          className="w-16 h-14 mx-auto relative"
          animate={{ 
            rotateY: [0, 5, 0, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Hexagon border */}
          <div 
            className="w-full h-full border-2 border-primary/70 relative"
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
            }}
          >
            {/* Inner hexagon glow */}
            <motion.div 
              className="absolute inset-1 bg-primary/10"
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
              }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Scanner eyes */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          <motion.div 
            className="w-2 h-1 bg-primary rounded-sm"
            animate={{ 
              scaleX: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="w-2 h-1 bg-primary rounded-sm"
            animate={{ 
              scaleX: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.1, ease: "easeInOut" }}
          />
        </div>

        {/* Head antenna */}
        <motion.div 
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-primary/60"
          animate={{ 
            height: [12, 16, 12],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Neck connector */}
      <div className="w-1 h-3 bg-primary/50 mx-auto relative">
        <motion.div 
          className="absolute inset-0 bg-primary/30"
          animate={{ 
            scaleY: [1, 1.2, 1],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Robot body - tech chassis */}
      <div className="relative mx-auto mb-6">
        {/* Main body frame */}
        <motion.div 
          className="w-20 h-20 mx-auto border-2 border-primary/60 relative"
          style={{
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
          }}
          animate={{ 
            borderColor: [
              "hsl(var(--primary) / 0.6)",
              "hsl(var(--primary) / 0.9)",
              "hsl(var(--primary) / 0.6)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Energy core */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-primary/80 rounded-full flex items-center justify-center"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ 
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "linear" }
            }}
          >
            <motion.div 
              className="w-3 h-3 bg-primary/70 rounded-full"
              animate={{ 
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Circuit patterns */}
          <div className="absolute inset-2">
            {/* Horizontal circuits */}
            <motion.div 
              className="absolute top-2 left-0 right-0 h-0.5 bg-primary/40"
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-2 left-0 right-0 h-0.5 bg-primary/40"
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
            />
            {/* Vertical circuits */}
            <motion.div 
              className="absolute left-2 top-0 bottom-0 w-0.5 bg-primary/40"
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 0.9, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute right-2 top-0 bottom-0 w-0.5 bg-primary/40"
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 1.2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Robot arms - articulated */}
      <div className="flex justify-between items-center w-32 mx-auto -mt-12">
        {/* Left arm */}
        <div className="flex items-center">
          <motion.div 
            className="w-8 h-1 bg-primary/60 rounded-sm"
            animate={{ 
              rotate: [-15, 5, -15],
              scaleX: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="w-2 h-2 bg-primary/70 rounded-full ml-1"
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Right arm */}
        <div className="flex items-center">
          <motion.div 
            className="w-2 h-2 bg-primary/70 rounded-full mr-1"
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.div 
            className="w-8 h-1 bg-primary/60 rounded-sm"
            animate={{ 
              rotate: [15, -5, 15],
              scaleX: [1, 1.1, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
    
    {/* Loading text with tech styling */}
    <motion.div 
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <div className="text-xs text-muted-foreground font-medium tracking-wider">
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          INITIALIZING AI ASSISTANT
        </motion.span>
        <motion.span 
          className="ml-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ●●●
        </motion.span>
      </div>
    </motion.div>
  </div>
)

export function SplineScene({ scene, className }: { scene: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isError, setIsError] = useState(false)

  console.log('SplineScene rendering:', { scene, isLoaded, isReady, isError });

  // Preload the scene URL
  useEffect(() => {
    console.log('Preloading Spline scene:', scene);
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = scene
    link.as = 'fetch'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [scene])

  const handleLoad = () => {
    console.log('Spline scene loaded successfully');
    setIsLoaded(true)
    // Add slight delay for scene to fully initialize
    setTimeout(() => {
      console.log('Spline scene ready');
      setIsReady(true)
    }, 100)
  }

  const handleError = (error: any) => {
    console.error('Spline scene error:', error);
    setIsError(true)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 3D Scene - Always mounted for background loading */}
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
        <Spline 
          scene={scene} 
          className={className}
          onLoad={handleLoad}
          onError={handleError}
        />
      </motion.div>

      {/* Skeleton overlay with smooth crossfade */}
      <AnimatePresence mode="wait">
        {!isReady && !isError && (
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
            <RobotSkeleton />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error fallback */}
      {isError && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center text-muted-foreground">
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-sm">3D Scene Loading...</div>
          </div>
        </motion.div>
      )}
    </div>
  )
}