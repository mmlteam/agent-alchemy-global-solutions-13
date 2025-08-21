import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
}

const HeroNeuralNetwork = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 80 + 10, // Keep within top 80% of container
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setParticles(initialParticles);
  }, []);

  // Update particles and connections
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        let newVx = particle.vx;
        let newVy = particle.vy;

        // Bounce off boundaries
        if (newX <= 0 || newX >= 100) newVx *= -1;
        if (newY <= 5 || newY >= 90) newVy *= -1;

        // Keep within bounds
        newX = Math.max(0, Math.min(100, newX));
        newY = Math.max(5, Math.min(90, newY));

        return {
          ...particle,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
        };
      }));

      // Update connections based on proximity
      setConnections(prev => {
        const newConnections: Connection[] = [];
        particles.forEach((p1, i) => {
          particles.forEach((p2, j) => {
            if (i < j) {
              const distance = Math.sqrt(
                Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
              );
              if (distance < 25) { // Connection threshold
                const opacity = Math.max(0, (25 - distance) / 25) * 0.3;
                newConnections.push({
                  from: i,
                  to: j,
                  opacity,
                });
              }
            }
          });
        });
        return newConnections;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [particles]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((connection, index) => {
          const from = particles[connection.from];
          const to = particles[connection.to];
          if (!from || !to) return null;

          return (
            <motion.line
              key={`${connection.from}-${connection.to}-${index}`}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: connection.opacity }}
              transition={{ duration: 0.3 }}
              style={{
                filter: 'blur(0.5px)',
              }}
            />
          );
        })}
      </svg>

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, hsl(var(--primary)/0.8) 0%, hsl(var(--accent)/0.4) 70%, transparent 100%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(var(--primary)/0.6)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity * 0.7, particle.opacity, particle.opacity * 0.7],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Ambient Neural Pulses */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${20 + i * 25}%`,
            top: `${15 + i * 20}%`,
            width: 120 + i * 40,
            height: 120 + i * 40,
            background: `radial-gradient(circle, hsl(var(--primary)/0.1) 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Data Flow Lines */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`flow-${i}`}
          className="absolute opacity-20"
          style={{
            left: `${10 + i * 60}%`,
            top: `${30 + i * 25}%`,
            width: 2,
            height: 100,
            background: `linear-gradient(180deg, hsl(var(--primary)) 0%, transparent 50%, hsl(var(--accent)) 100%)`,
            filter: 'blur(1px)',
          }}
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
};

export default HeroNeuralNetwork;
