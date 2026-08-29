import type { Variants } from 'framer-motion';

export const petVariants: Variants = {
  idle: {
    y: [0, -6, 0],
    transition: {
      duration: 2.4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
  walking: {
    y: [0, -5, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
  wobble: {
    scaleY: [1, 0.88, 1.06, 1],
    rotate: [0, -4, 4, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  tapSquash: {
    scaleY: [1, 0.94, 1],
    transition: { duration: 0.18 },
  }
};
