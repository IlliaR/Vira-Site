'use client';

import { motion } from 'framer-motion';

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
  const initial =
    direction === 'up'
      ? { opacity: 0, y: 28 }
      : direction === 'left'
        ? { opacity: 0, x: -24 }
        : { opacity: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount: 0.1 }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
