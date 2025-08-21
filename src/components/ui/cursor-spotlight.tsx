'use client'
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export function CursorSpotlight({ className, size = 250 }: { className?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const x = useSpring(0, { bounce: 0 });
  const y = useSpring(0, { bounce: 0 });
  const left = useTransform(x, v => `${v - size / 2}px`);
  const top = useTransform(y, v => `${v - size / 2}px`);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    parent.style.position = 'relative';
    parent.style.overflow = 'hidden';

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseenter', () => setActive(true));
    parent.addEventListener('mouseleave', () => setActive(false));
    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseenter', () => setActive(true));
      parent.removeEventListener('mouseleave', () => setActive(false));
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-2xl transition-opacity duration-200',
        'from-white/90 via-white to-transparent',
        active ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{ width: size, height: size, left, top }}
    />
  );
}