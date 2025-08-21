import { motion } from 'framer-motion';

const HeroAIOverlay = () => {
  // Generate random floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2, // 2-6px
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2, // 2-5s
    x: Math.random() * 100, // 0-100%
    y: Math.random() * 60 + 10, // 10-70% from top
  }));

  return (
    <div className="absolute top-0 left-0 right-0 h-[60%] pointer-events-none overflow-hidden z-5">
      {/* Radial Glow Effect */}
      <motion.div
        className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--accent)) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary Glow Layer */}
      <motion.div
        className="absolute top-[15%] left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--primary)) 60%, transparent 80%)',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/60"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: '0 0 6px hsl(var(--primary)/0.8)',
          }}
          animate={{
            y: [-20, -40, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Additional Blue Particles */}
      {particles.slice(0, 6).map((particle) => (
        <motion.div
          key={`blue-${particle.id}`}
          className="absolute rounded-full"
          style={{
            width: particle.size * 0.7,
            height: particle.size * 0.7,
            left: `${(particle.x + 20) % 100}%`,
            top: `${(particle.y + 15) % 60 + 10}%`,
            background: 'hsl(var(--primary)/0.6)',
            boxShadow: '0 0 8px hsl(var(--primary)/0.9)',
          }}
          animate={{
            y: [-15, -35, -15],
            x: [10, -10, 10],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: particle.duration + 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay + 0.5,
          }}
        />
      ))}

      {/* Ambient Light Rays */}
      <motion.div
        className="absolute top-[25%] left-1/2 transform -translate-x-1/2 w-2 h-32 opacity-20"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, transparent 100%)',
          filter: 'blur(2px)',
        }}
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default HeroAIOverlay;