'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'none';
  once?: boolean;
}

export default function MotionWrapper({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
}: MotionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-80px' });

  const initial =
    direction === 'up'
      ? { opacity: 0, y: 28 }
      : direction === 'left'
        ? { opacity: 0, x: -24 }
        : { opacity: 0 };

  const animate = inView
    ? { opacity: 1, y: 0, x: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
